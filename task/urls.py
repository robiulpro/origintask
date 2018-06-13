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
