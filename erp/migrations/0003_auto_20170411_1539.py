# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-11 07:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0002_remove_salesorder_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='salesorder',
            name='mfr_status',
            field=models.CharField(default='INIT', max_length=50),
        ),
        migrations.AddField(
            model_name='salesorder',
            name='raw_mat_status',
            field=models.CharField(default='INIT', max_length=50),
        ),
    ]