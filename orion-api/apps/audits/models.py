from django.db import models
from apps.accounts.models import CustomUser

class AuditAction(models.TextChoices):
    COMPLAINT_IMPORTED = 'COMPLAINT_IMPORTED'
    COMPLAINT_VIEWED = 'COMPLAINT_VIEWED'
    PRIORITY_ASSESSED = 'PRIORITY_ASSESSED'
    PRIORITY_CONFIRMED = 'PRIORITY_CONFIRMED'
    PRIORITY_OVERRIDDEN = 'PRIORITY_OVERRIDDEN'
    SYNC_STARTED = 'SYNC_STARTED'
    SYNC_FAILED = 'SYNC_FAILED'
    USER_LOGGED_IN = 'USER_LOGGED_IN'
    USER_LOGGED_OUT = 'USER_LOGGED_OUT'


class Audit(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(choices=AuditAction.choices, max_length=255)
    target_id = models.CharField(max_length=255, null=True, blank=True)
    target_type = models.CharField(max_length=255)
    metadata = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'Audit: {self.action} on {self.target_type} ({self.target_id}) by {self.user.username if self.user else "Unknown"} at {self.timestamp}'