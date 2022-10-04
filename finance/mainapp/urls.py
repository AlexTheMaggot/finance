from django.urls import path
from . import views

app_name = 'mainapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('expends/create/', views.index, name='expends_create'),
    path('expends/list/', views.index, name='expends_list'),
    path('incomes/create/', views.index, name='incomes_create'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]
