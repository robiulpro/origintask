"""helloapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name="home"),
    url('api/userinfo',views.UserData.getUsersInfo),
    path('api/task/', views.TaskList.as_view()),
    url('api/task/delete/(?P<id>\d+)', views.TaskList.as_view(), name='delete_task'),
    url(r'^api/task/(?P<id>\d+)$', views.TaskList.as_view(), name='update_task'),
]
