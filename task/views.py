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
 
# Create your views here.

class HomePageView(TemplateView):
    @method_decorator(login_required(login_url='/login/'))
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


class LinksPageView(TemplateView):
    @method_decorator(login_required(login_url='/login/'))
    def get(self, request, **kwargs):
        return render(request, 'links.html', context=None)

class Customers(TemplateView):
    def getCust(request,format=None):
        name='liran'
        return HttpResponse('{ "name":"' + name + '", "age":31, "city":"New York" }')

    def getUser(request,format=None):
        current_user = request.user
        if current_user.is_authenticated is False:
            current_user = User.objects.get(id=1)
        userdata = {
                'id': current_user.id,
                'name': current_user.username,
                'email': current_user.email
            }
        return HttpResponse(json.dumps(userdata))

    
    def getTasks(request):
        tasks = Task.objects.all()
        #response = serializers.serialize("json", tasks)
        serializer=TaskSerializer(tasks,many=True)
        json = JSONRenderer().render(serializer.data)
        return HttpResponse(json, content_type='application/json')

    def addTask(request):
        if request.method=="POST":
            title = request.POST.get("title")
            description = request.POST.get("description")
            target_date = request.POST.get("target_date")
        
        tasks = Task.objects.all()
        #response = serializers.serialize("json", tasks)
        serializer=TaskSerializer(tasks,many=True)
        json = JSONRenderer().render(serializer.data)
        return HttpResponse(json, content_type='application/json')


