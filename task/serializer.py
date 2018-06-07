from rest_framework import serializers
from .models import Task
import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone


class TaskSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    expired_until = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()

    def get_expired_until(self, task):
        a = timezone.now()
        b = task.target_date
        diff = relativedelta(b, a)
        return "Expired until %d year %d month %d days %d hours %d minutes" % (diff.years, diff.months, diff.days, diff.hours, diff.minutes)


    def get_is_expired(self, task):
        if timezone.now() > task.target_date:
            return True
        else:
            return False

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'created', 'updated', 'status', 'created_by', 'assigned_to', 'assigned_on', 'completed_on', 'target_date', 'expired_until', 'is_expired')