from django.db import models


class ExpenseModel(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()


class IncomeModel(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
