from django.shortcuts import render
from .forms import RegistationForm
from django.http import HttpResponseRedirect
# Create your views here.

def index(request):
    return render(request, 'pages/home.html')

def register(request):
    form = RegistationForm()
    if request.method == 'POST':
        form = RegistationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/')
    return render(request, 'pages/register.html', {'form': form})
    