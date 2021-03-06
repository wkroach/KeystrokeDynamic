from django.urls import path

from . import views
from .models import User, Keystroke

app_name = 'authenticate'
urlpatterns = [
    # django templete front end
    path('', views.index, name='index'),
    path('test_list/', views.test_list, name='test_list'),
    path('<str:user_name>/test_user/', views.test_user, name='test_user'),
    path('add_account/', views.add_account, name='add_account'),
    path('<str:username>/success/', views.success, name='success'),
    path('login/', views.login, name='login'),
    path('authenticate/', views.login_authenticate, name='login_authenticate'),
    path('get_keystroke/', views.get_keystroke, name="get_keystroke"),
    path('train_keystroke/', views.train_keystroke, name='train_keystroke'),
    # react frontend
    path('test_is_login/', views.test_is_login, name="test_is_login"),
    path('test_frontend_login/', views.test_frontend_login, name="test_frontend_login"),
    path('test_frontend_add_account/', views.test_frontend_add_account, name="test_frontend_add_account"),
    path('react_login/', views.react_login, name="react_login"),
    path('react_add_account/', views.react_add_account, name="react_add_account")

]