# Generated by Django 4.0.4 on 2022-10-03 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expensemodel',
            name='cost',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='incomemodel',
            name='cost',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
