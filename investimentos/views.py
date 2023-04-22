from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return HttpResponse("<h1>Hello world this is test file changed push git hub</h1>")

def home(request):
    content = { 
        'name':'rafael'
    }
    return render(request, 'index.html', content)