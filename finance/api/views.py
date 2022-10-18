import json
from datetime import date, timedelta
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
        elif request_data['method'] == 'ExpensesCreate':
            expense = ExpenseModel(
                name=request_data['content']['name'],
                cost=request_data['content']['cost'],
                date=request_data['content']['date'],
                currency=request_data['content']['currency'],
            )
            expense.save()
            data = {
                'result': 'success',
            }
            return JsonResponse(data)
        elif request_data['method'] == 'ExpensesList':
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
                    'currency': expense.currency,
                })
            return JsonResponse(data)
        elif request_data['method'] == 'ExpensesDelete':
            expense = ExpenseModel.objects.get(id=request_data['content']['id'])
            expense.delete()
            data = {
                'result': 'success',
            }
            return JsonResponse(data)
        elif request_data['method'] == 'IncomesCreate':
            expense = IncomeModel(
                name=request_data['content']['name'],
                cost=request_data['content']['cost'],
                date=request_data['content']['date'],
                currency=request_data['content']['currency'],
            )
            expense.save()
            data = {
                'result': 'success',
            }
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
                    'currency': income.currency,
                })
            return JsonResponse(data)
        elif request_data['method'] == 'IncomesDelete':
            income = IncomeModel.objects.get(id=request_data['content']['id'])
            income.delete()
            data = {
                'result': 'success',
            }
            return JsonResponse(data)
        elif request_data['method'] == 'GetTotalBalance':
            incomes = IncomeModel.objects.all()
            expenses = ExpenseModel.objects.all()
            total_incomes_uzs = 0
            total_incomes_usd = 0
            total_expenses_uzs = 0
            total_expenses_usd = 0
            for item in incomes:
                if item.currency == 'UZS':
                    total_incomes_uzs += item.cost
                else:
                    total_incomes_usd += item.cost
            for item in expenses:
                if item.currency == 'UZS':
                    total_expenses_uzs += item.cost
                else:
                    total_expenses_usd += item.cost
            total_balance_uzs = total_incomes_uzs - total_expenses_uzs
            total_balance_usd = total_incomes_usd - total_expenses_usd
            data = {
                'result': 'success',
                'content': {
                    'total_balance_uzs': total_balance_uzs,
                    'total_balance_usd': total_balance_usd,
                }
            }
            return JsonResponse(data)
        elif request_data['method'] == 'GetTenDaysBalace':
            today = date.today()
            data = {
                'result': 'success',
                'content': [],
            }
            for i in range(10):
                by_day = today - timedelta(days=9 - i)
                expenses = ExpenseModel.objects.filter(date__lte=by_day)
                incomes = IncomeModel.objects.filter(date__lte=by_day)
                total_incomes_uzs = 0
                total_incomes_usd = 0
                total_expenses_uzs = 0
                total_expenses_usd = 0
                for item in incomes:
                    if item.currency == 'UZS':
                        total_incomes_uzs += item.cost
                    else:
                        total_incomes_usd += item.cost
                for item in expenses:
                    if item.currency == 'UZS':
                        total_expenses_uzs += item.cost
                    else:
                        total_expenses_usd += item.cost
                total_balance_uzs = total_incomes_uzs - total_expenses_uzs
                total_balance_usd = total_incomes_usd - total_expenses_usd
                response = {
                    'date': by_day.strftime('%Y-%m-%d'),
                    'USD': total_balance_usd,
                    'UZS': total_balance_uzs,
                }
                data['content'].append(response)
            return JsonResponse(data)
        else:
            data = {
                'result': 'error',
                'reason': 'WrongMethod',
            }
            return JsonResponse(data)
    else:
        return HttpResponseForbidden()
