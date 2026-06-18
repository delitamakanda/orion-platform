from django.utils import timezone

from django.db import models
from apps.accounts.models import CustomUser
from apps.common.mixins.timestamped_model import TimestampedModel
from apps.common.mixins.uuid_model import UUIDModel

class NotificationType(models.TextChoices):
    CRITICAL_COMPLAINT = 'CRITICAL_COMPLAINT'
    PRIORITY_REVIEW_REQUIRED = 'PRIORITY_REVIEW_REQUIRED'
    SYNC_COMPLETED = 'SYNC_COMPLETED'
    SYNC_FAILED = 'SYNC_FAILED'

class Notification(TimestampedModel, UUIDModel):
    recipient = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='notifications')
    title = models.CharField(max_length=100)
    message = models.TextField()
    type = models.CharField(max_length=50, choices=NotificationType.choices, default=NotificationType.CRITICAL_COMPLAINT)
    priority = models.CharField(max_length=20, default='normal')
    related_object_id = models.CharField(max_length=100, null=True, blank=True)
    related_object_type = models.CharField(max_length=100, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        recipient = self.recipient.username if self.recipient else 'System'
        return f'Notification: {self.title} - {recipient}'
    
    def mark_as_read(self):
        self.is_read = True
        self.read_at = timezone.now()
        self.save()
