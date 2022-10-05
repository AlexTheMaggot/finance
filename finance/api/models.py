from django.db import models


class ExpenseModel(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    cost = models.IntegerField()
    currency = models.CharField(max_length=200)


class IncomeModel(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    cost = models.IntegerField()
    currency = models.CharField(max_length=200)
