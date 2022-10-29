import json
from datetime import date, timedelta
from django.http import HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login
from .models import *

errors = {
    1000: 'WrongAuth',
    1001: 'WrongUser',
    1002: 'WrongPassword',
    2000: 'WrongMethod',
}


def make_error(code: int):
    data = {
        'result': 'error',
        'reason': errors[code],
    }
    return JsonResponse(data)


def make_success(content=None):
    data = {
        'result': 'success',
    }
    if content:
        data['content'] = content
    else:
        data['content'] = []
    return JsonResponse(data)


def make_query(queryset):
    content = []
    for item in queryset:
        content.append({
            'id': item.id,
            'name': item.name,
            'date': item.date,
            'cost': item.cost,
            'currency': item.currency,
        })
    return content


def make_balance_list(days):
    today = date.today()
    balance_list = []
    for i in range(days):
        by_day = today - timedelta(days=(days - 1) - i)
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
        balance = {
            'date': by_day.strftime('%Y-%m-%d'),
            'USD': total_balance_usd,
            'UZS': total_balance_uzs,
        }
        balance_list.append(balance)
    return balance_list


def auth_check(dec_func):
    def dec_wrap(request, content=None):
        if request.user.is_authenticated:
            return dec_func(request, content)
        else:
            return make_error(1000)
    return dec_wrap


@auth_check
def method_expenses_create(request, content):
    expense = ExpenseModel(
        name=content['name'],
        cost=content['cost'],
        date=content['date'],
        currency=content['currency']
    )
    expense.save()
    return make_success()


@auth_check
def method_expenses_list(request, content=None):
    response_content = make_query(
        ExpenseModel.objects.all().order_by('-date')
    )
    return make_success(response_content)


@auth_check
def method_expenses_delete(request, content):
    expense = ExpenseModel.objects.get(id=content['id'])
    expense.delete()
    return make_success()


@auth_check
def method_incomes_create(request, content):
    income = IncomeModel(
        name=content['name'],
        cost=content['cost'],
        date=content['date'],
        currency=content['currency'],
    )
    income.save()
    return make_success()


@auth_check
def method_incomes_list(request, content=None):
    response_content = make_query(
        IncomeModel.objects.all().order_by('-date')
    )
    return make_success(response_content)


@auth_check
def method_incomes_delete(request, content):
    income = IncomeModel.objects.get(id=content['id'])
    income.delete()
    return make_success()


@auth_check
def method_get_total_balance(request, content=None):
    return make_success(make_balance_list(1)[-1])


@auth_check
def method_get_balance_list(request, content):
    return make_success(make_balance_list(content['days']))


def method_login(request, content):
    try:
        User.objects.get(username=content['username'])
    except ObjectDoesNotExist:
        return make_error(1001)
    user = authenticate(
        request,
        username=content['username'],
        password=content['password']
    )
    if user is None:
        return make_error(1002)
    else:
        login(request, user)
        return make_success()


@csrf_exempt
def index(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        if request_data['method'] == 'Login':
            return method_login(request, request_data['content'])
        elif request_data['method'] == 'ExpensesCreate':
            return method_expenses_create(request, request_data['content'])
        elif request_data['method'] == 'ExpensesList':
            return method_expenses_list(request)
        elif request_data['method'] == 'ExpensesDelete':
            return method_expenses_delete(request, request_data['content'])
        elif request_data['method'] == 'IncomesCreate':
            return method_incomes_create(request, request_data['content'])
        elif request_data['method'] == 'IncomesList':
            return method_incomes_list(request)
        elif request_data['method'] == 'IncomesDelete':
            return method_incomes_delete(request, request_data['content'])
        elif request_data['method'] == 'GetTotalBalance':
            return method_get_total_balance(request)
        elif request_data['method'] == 'GetBalanceList':
            return method_get_balance_list(request, request_data['content'])
        else:
            return make_error(2000)
    else:
        return HttpResponseForbidden()
