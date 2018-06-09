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
from rest_framework import generics, mixins
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin

from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
 
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

class TaskList(CsrfExemptMixin,generics.ListCreateAPIView, mixins.UpdateModelMixin):
    authentication_classes = []
    queryset = Task.objects.all()
    lookup_field = 'id'
    serializer_class = TaskSerializer

    def delete(self, request, id, format=None):
        task = Task.objects.get(id=id)
        task.delete()
        return JsonResponse({}, safe=False)

    def patch(self, request, *args, **kwargs):
        return self.update_partial(request, *args, **kwargs)

    def update_partial(self, request, *args, **kwargs):
        try:
            self.object = self.get_object()
            created = False
        except Http404:
            self.object = None
            created = True

        serializer = self.get_serializer(self.object, data=request.data, partial=True)

        if serializer.is_valid():
            self.object = serializer.save()
            status_code = created and status.HTTP_201_CREATED or status.HTTP_200_OK
            return Response(serializer.data, status=status_code)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


