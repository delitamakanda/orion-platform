from django.db import models
from apps.common.mixins.timestamped_model import TimestampedModel
from apps.common.mixins.uuid_model import UUIDModel

class SyncJobStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    COMPLETED = 'COMPLETED', 'Completed'
    FAILED = 'FAILED', 'Failed'

class SyncJob(TimestampedModel, UUIDModel):
    source_system = models.CharField(max_length=100, default='SI_COMPLAINTS')
    status = models.CharField(max_length=20, choices=SyncJobStatus.choices, default=SyncJobStatus.PENDING)
    imported_count = models.IntegerField(default=0)
    updated_count = models.IntegerField(default=0)
    skipped_count = models.IntegerField(default=0)
    error_message = models.TextField(blank=True, null=True)
    started_at = models.DateTimeField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f'Sync Job ({self.source_system}) - Status: {self.status}'