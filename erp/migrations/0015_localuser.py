# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-25 14:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0014_rawmatorderitem_reg_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='LocalUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userType', models.CharField(choices=[('MR', 'Manger'), ('SR', 'Saler'), ('SK', 'Stockman')], default='MR', max_length=2)),
                ('name', models.CharField(default='', max_length=200)),
                ('password', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
