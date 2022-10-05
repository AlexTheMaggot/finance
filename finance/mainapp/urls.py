from django.urls import path
from . import views

app_name = 'mainapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('expenses/create/', views.index, name='expenses_create'),
    path('expenses/list/', views.index, name='expenses_list'),
    path('incomes/create/', views.index, name='incomes_create'),
    path('incomes/list/', views.index, name='incomes_list'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]
