# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-25 14:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0016_auto_20170525_1438'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localuser',
            name='userType',
            field=models.CharField(choices=[('Manger', 'Manger'), ('Saler', 'Saler'), ('Stockman', 'Stockman')], default='Manger', max_length=30),
        ),
    ]
