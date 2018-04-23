from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import authenticate
from .models import User
from .data_center import *
from .algorithm import *

import json
from .data_center import *


def index(request):
    return render(request, 'authenticate/index.html')


def test_list(request):
    test_list = [i for i in range(10)]
    context = {
        'test_list': test_list,
    }
    return render(request, 'authenticate/index.html', context)


def test_user(request, user_name):
    user = get_object_or_404(User, username=user_name)
    return render(request, 'authenticate/user.html', {'user':user})


@csrf_exempt
def test_frontend_login(request):
    data = json.loads(request.body)
    return JsonResponse(data)


@csrf_exempt
def test_frontend_add_account(request):
    data = json.loads(request.body)
    return JsonResponse(data)


@csrf_exempt
def add_account(request):
    username = request.POST["username"]
    password = request.POST["password"]
    try:
        user = User.objects.create_user(username=username, password=password)
        return render(request, 'authenticate/train.html', {"user": user, "count": settings.HMM_TRAIN_TIMES})
    except Exception as e:
        return render(request, 'authenticate/login.html', {"error_message": e})


def login(request):
    return render(request, "authenticate/login.html")


def login_authenticate(request):
    try:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is None:
            raise Exception("username and password doesn't match")
        if user.keystroke_set.count() < settings.HMM_TRAIN_TIMES:
            return render(request, 'authenticate/train.html', {"user": user, "count": 15-user.keystroke_set.count()})
    except Exception as e:
        return render(request, 'authenticate/login.html', {"error_message": e})
    else:
        return HttpResponseRedirect(reverse('authenticate:success', args=(user.username,)))


def judge(username, password):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        raise Exception("username doesn't exist")
    if user.password != password:
        raise Exception("password is wrong")
    return user

@csrf_exempt
def train_keystroke(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    mp = data['mp']

    response = {}
    keystroke_str, time_vector_str = DataCenter.frontend_map_2_keystroke_str_timevector_str(mp)
    user = User.objects.get(username=username)
    if user.keystroke_set.count() != 0 and\
            user.keystroke_set.filter(keystroke=keystroke_str).count() == 0:
        response['retry_message'] = "keystroke length is different with existed keystroke, please reinput password"
        return response
    print(keystroke_str, time_vector_str)
    user.keystroke_set.create(keystroke=keystroke_str, time_vector=time_vector_str)
    response['success'] = 1
    return JsonResponse(response)

@csrf_exempt
def get_keystroke(request):
    data = json.loads(request.body)
    return JsonResponse(keystroke2timevector(data))


def keystroke2timevector(data):
    mp = data['mp']
    username = data['username']
    password = data['password']

    response = {}

    user = authenticate(username=username, password=password)
    if user is None:
        response["error_message"] = "username and password doesn't match"
        return response

    if user.keystroke_set.count() < settings.HMM_TRAIN_TIMES:
        response['train_message'] = "your keystroke data base is not enough, please input for at least %s times" %\
                                    settings.HMM_TRAIN_TIMES
        return response

    keystroke, time_vector = generate_keystroke(mp)
    if user.keystroke_set.count() != 0 and\
            user.keystroke_set.filter(keystroke=keystroke).count() == 0:
        response['retry_message'] = "keystroke length is different with existed keystroke, please retry password"
        return response

    # test
    try:
        keystroke_tmp, time_vector_tmp = DataCenter.frontend_map_2_keystroke_str_timevector_str(mp)
        # debug
        model = HmmAlgorithm()
        ans = model.predict(user, time_vector_tmp)
        if ans:
            response['answer'] = "1"
        else:
            response['answer'] = "0"
        return response
    except Exception as e:
        response['error_message'] = str(e)
        return response


def success(request, username):
    return render(request, "authenticate/success.html", {"username":username})
