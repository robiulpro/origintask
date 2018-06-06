from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import json
from django.contrib.auth.models import User
from django.core import serializers
from .models import Task
from django.http import JsonResponse
from .serializer import TaskSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
 
# Create your views here.

class HomePageView(TemplateView):
    @method_decorator(login_required(login_url='/login/'))
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class UserData(TemplateView):
    """ def getLoginUser(request,format=None):
        current_user = request.user
        if current_user.is_authenticated is False:
            current_user = User.objects.get(id=1)
        userdata = {
                'id': current_user.id,
                'name': current_user.username,
                'email': current_user.email
            }
        return HttpResponse(json.dumps(userdata)) """

    def getUsersInfo(request,format=None):
        current_user = request.user
        if current_user.is_authenticated is False:
            current_user = User.objects.get(id=1)
        logged_in_user = {
                'id': current_user.id,
                'username': current_user.username,
                'email': current_user.email
            }
        users = User.objects.all().values('id', 'username', 'email')
        users_list = list(users)
        user_data = {
            'logged_in_user': logged_in_user,
            'users': users_list
        }
        return JsonResponse(user_data, safe=False)

#@csrf_exempt
class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


