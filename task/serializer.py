from rest_framework import serializers
from .models import Task
import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone
import pytz


class TaskSerializer(serializers.ModelSerializer):
    #created = serializers.DateTimeField(format='%b %d, %Y %I:%M %p', read_only=True)
    #updated = serializers.DateTimeField(format='%b %d, %Y %I:%M %p', read_only=True)
    #assigned_on = serializers.DateTimeField(format='%b %d, %Y %I:%M %p', read_only=True)
    #completed_on = serializers.DateTimeField(format='%b %d, %Y %I:%M %p', read_only=True)

    created_user = serializers.CharField(source='created_by.username', read_only=True)
    assigned_user = serializers.CharField(source='assigned_to.username', read_only=True)
    completed_user = serializers.CharField(source='completed_by.username', read_only=True)

    expired_until = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()

    def get_expired_until(self, task):
        a = timezone.now()
        b = task.target_date
        diff = relativedelta(b, a)
        
        expired_text = ""
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
            return "Target date missed!"
        return expired_text + str("to target date!")


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
        fields = ('id', 'title', 'description', 'created', 'updated', 'status', 'created_by', 'created_user', 'assigned_to', 'assigned_user', 'assigned_on', 'completed_on', 'completed_by', 'completed_user', 'target_date', 'expired_until', 'is_expired')