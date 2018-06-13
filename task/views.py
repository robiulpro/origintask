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
from django.db.models import Q
from datetime import datetime
 

class HomePageView(TemplateView):
    @method_decorator(login_required(login_url='/login/'))
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class UserData(TemplateView):

    def getUsersInfo(request,format=None):
        current_user = request.user

        """ For node development server (react frontend) we need to get the dummy 
        user (user id 1 here) as the authentication is session based """
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
    lookup_field = 'id'
    serializer_class = TaskSerializer

    def get_loggedin_user_id(self):
        user = self.request.user
        """ For node development server (react frontend) we need to get the dummy 
        user (user id 1 here) as the authentication is session based """
        if user.is_authenticated is True:
            user_id = user.id
        else:
            user_id = 1
        return user_id


    def get_queryset(self):
        queryset = Task.objects.all()
        
        hideCompleted = self.request.query_params.get('hideCompleted', None)
        if hideCompleted is not None:
            hideCompleted = json.loads(hideCompleted.lower())
            if hideCompleted is True:
                queryset = queryset.filter().exclude(status='COMPLETED')
        
        filter = self.request.query_params.get('filter', None)
        if filter is not None:
            if filter == 'assigned':
                print('assigned')
                queryset = queryset.filter(~Q(assigned_to__isnull=True))
            elif filter == 'un-assigned':
                queryset = queryset.filter(~Q(assigned_to__isnull=False))
            elif filter == 'assigned-to-me':
                queryset = queryset.filter(assigned_to=self.get_loggedin_user_id())
            elif filter == 'created-by-me':
                queryset = queryset.filter(created_by=self.get_loggedin_user_id())
            elif filter == 'missed-target':
                queryset = queryset.filter(target_date__lt=datetime.now())

        return queryset

    def delete(self, request, id, format=None):
        task = Task.objects.get(id=id)
        print(self.get_loggedin_user_id())
        print(task.created_by.id)
        if(self.get_loggedin_user_id() != task.created_by.id):
            return JsonResponse({}, safe=False, status=401)
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


