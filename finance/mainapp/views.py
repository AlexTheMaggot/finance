from django.shortcuts import render, redirect
from django.contrib.auth import logout as logout_view
from mobile.views import index as mobile_index


def index(request):
    if 'Mobile' in request.headers['User-Agent']:
        print('***MOBILE***')
        return mobile_index(request)
    else:
        print('***DESKTOP***')
    if request.user.is_authenticated or '/login/' in request.path:
        template = 'mainapp/index.html'
        return render(request, template)
    else:
        return redirect('mainapp:login')


def login(request):
    template = 'mainapp/auth.html'
    return render(request, template)


def logout(requset):
    logout_view(requset)
    return redirect('mainapp:login')
