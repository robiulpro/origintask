# Generated by Django 2.0.5 on 2018-06-12 11:53

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('task', '0002_auto_20180511_2100'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ['-created']},
        ),
        migrations.AlterUniqueTogether(
            name='task',
            unique_together={('title', 'created_by')},
        ),
    ]
