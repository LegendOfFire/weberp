# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-12 12:56
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0005_auto_20170412_1423'),
    ]

    operations = [
        migrations.AddField(
            model_name='rawmatorder',
            name='act_date',
            field=models.DateTimeField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='rawmatorder',
            name='comment',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='rawmatorder',
            name='name',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='rawmatorder',
            name='status',
            field=models.CharField(default='INIT', max_length=50),
        ),
        migrations.AlterField(
            model_name='salesitem',
            name='comment',
            field=models.CharField(default='', max_length=200),
        ),
    ]
