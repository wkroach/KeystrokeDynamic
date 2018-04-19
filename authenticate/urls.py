from django.urls import path

from . import views
from .models import User, Keystroke

app_name = 'authenticate'
urlpatterns = [
    path('', views.index, name='index'),
    path('test_list/', views.test_list, name='test_list'),
    path('<str:user_name>/test_user/', views.test_user, name='test_user'),
    path('create_account/', views.create_account, name='create_account'),
    path('add_account/', views.add_account, name='add_account'),
    path('<str:username>/success/', views.success, name='success'),
    path('login/', views.login, name='login'),
    path('authenticate/', views.authenticate, name='authenticate'),
    path('get_keystroke/', views.get_keystroke, name="get_keystroke"),
    path('train_keystroke/', views.train_keystroke, name='train_keystroke')
]