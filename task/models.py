from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

TASK_STATUSES = getattr(settings, "TASK_STATUSES")

class Task(models.Model):         
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    assigned_on = models.DateTimeField(blank=True, null=True)
    completed_on = models.DateTimeField(blank=True, null=True)
    target_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20,choices=TASK_STATUSES,default='CREATED')
    completed_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    
    class Meta:
        unique_together = ("title", "created_by")
        ordering = ['-created']
    
    def __unicode__(self):
        return self.title

    """ def expired_until(self):
        a = self.created
        b = self.target_date
        diff = relativedelta(a, b)
        return "The difference is %d year %d month %d days %d hours %d minutes" % (diff.years, diff.months, diff.days, diff.hours, diff.minutes) """