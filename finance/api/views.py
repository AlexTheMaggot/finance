import json
from django.http import HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from .models import *


@csrf_exempt
def index(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        if request_data['method'] == 'Login':
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
        elif request_data['method'] == 'expensesCreate':
            expense = ExpenseModel(
                name=request_data['content']['name'],
                cost=request_data['content']['cost'],
                date=request_data['content']['date'],
            )
            expense.save()
            data = {
                'result': 'success',
            }
            return JsonResponse(data)
        elif request_data['method'] == 'IncomesCreate':
            expense = IncomeModel(
                name=request_data['content']['name'],
                cost=request_data['content']['cost'],
                date=request_data['content']['date'],
            )
            expense.save()
            data = {
                'result': 'success',
            }
            return JsonResponse(data)
        elif request_data['method'] == 'expensesList':
            expenses = ExpenseModel.objects.all().order_by('-date')
            data = {
                'result': 'success',
                'content': []
            }
            for expense in expenses:
                data['content'].append({
                    'id': expense.id,
                    'name': expense.name,
                    'date': expense.date,
                    'cost': expense.cost,
                })
            return JsonResponse(data)
        elif request_data['method'] == 'IncomesList':
            incomes = IncomeModel.objects.all().order_by('-date')
            data = {
                'result': 'success',
                'content': []
            }
            for income in incomes:
                data['content'].append({
                    'id': income.id,
                    'name': income.name,
                    'date': income.date,
                    'cost': income.cost,
                })
            return JsonResponse(data)
        else:
            data = {
                'result': 'error',
                'reason': 'WrongMethod',
            }
            return JsonResponse(data)
    else:
        return HttpResponseForbidden()
