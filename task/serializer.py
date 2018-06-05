from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)


    """ def validate_target_date(self, value):
        return value """

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'created', 'updated', 'status', 'created_by', 'assigned_to', 'assigned_on', 'completed_on', 'target_date')