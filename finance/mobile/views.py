from django.shortcuts import render


def index(request):
    template = 'mobile/index.html'
    return render(request, template)
