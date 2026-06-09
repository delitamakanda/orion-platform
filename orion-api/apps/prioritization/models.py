from django.db import models
from apps.common.mixins.timestamped_model import TimestampedModel
from apps.common.mixins.uuid_model import UUIDModel
from apps.accounts.models import CustomUser

from apps.complaints.models import Complaint

class PriorityLevel(models.TextChoices):
    LOW = 'low', 'Low'
    MEDIUM = 'medium', 'Medium'
    HIGH = 'high', 'High'
    CRITICAL = 'critical', 'Critical'

class PriorityAssessment(UUIDModel, TimestampedModel):
    complaint = models.OneToOneField(Complaint, on_delete=models.CASCADE, related_name='priority_assessment')
    score = models.IntegerField()
    level = models.CharField(max_length=20, choices=PriorityLevel.choices)
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2)
    summary = models.TextField()
    explanation = models.JSONField(
        default=dict,
    )
    model_name = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)

    def __str__(self):
        return f'Priority Assessment for {self.complaint.id}'


class PriorityRecommendation(UUIDModel, TimestampedModel):
    assessment = models.ForeignKey(PriorityAssessment, on_delete=models.CASCADE, related_name='recommendations')
    label = models.CharField(max_length=255)
    weight = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return f'{self.label} (+{self.weight})'


class ReviewDecision(UUIDModel, TimestampedModel):
    assessment = models.ForeignKey(PriorityAssessment, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    previous_level = models.CharField(max_length=20, choices=PriorityLevel.choices)
    final_level = models.CharField(max_length=20, choices=PriorityLevel.choices)
    comment = models.TextField()
    is_override = models.BooleanField(default=False)

    def __str__(self):
        return f'Review Decision for {self.assessment.id} by {self.reviewer.username}'