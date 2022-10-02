import json

from django.http import HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login


@csrf_exempt
def index(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        try:
            User.objects.get(username=request_data['content']['username'])
        except ObjectDoesNotExist:
            data = {
                'result': 'error',
                'reason': 'WrongUser',
            }
            return JsonResponse(data)
        user = authenticate(
            request,
            username=request_data['content']['username'],
            password=request_data['content']['password']
        )
        if user is not None:
            login(request, user)
            data = {
                'result': 'success',
            }
        else:
            data = {
                'result': 'error',
                'reason': 'WrongPassword',
            }
        return JsonResponse(data)
    else:
        return HttpResponseForbidden()
