from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
 
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
