from rest_framework import serializers
from .models import Task
import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone
import pytz


class TaskSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    expired_until = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()

    def get_expired_until(self, task):
        a = timezone.now()
        b = task.target_date
        diff = relativedelta(b, a)
        
        expired_text = "Expired until "
        if diff.years > 0:
            expired_text += str(diff.years) + " year "
        if diff.months > 0:
            expired_text += str(diff.months) + " month "
        if diff.days > 0:            
            expired_text += str(diff.days) + " days "
        if diff.hours > 0:
            expired_text += str(diff.hours) + " hours "
        if diff.minutes > 0:
            expired_text += str(diff.minutes) + " minutes "
        else:
            return "Expired"
        return expired_text


    def get_is_expired(self, task):
        if task.target_date is None:
            return False
        now = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)
        target_date = task.target_date.replace(tzinfo=pytz.UTC)
        if now > target_date:
            return True
        else:
            return False
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'created', 'updated', 'status', 'created_by', 'assigned_to', 'assigned_on', 'completed_on', 'target_date', 'expired_until', 'is_expired')