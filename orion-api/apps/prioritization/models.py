from django.db import models
from apps.complaints.models import Complaint

class PriorityAssessment(models.Model):
    class Level(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'
        CRITICAL = 'critical', 'Critical'
    complaint = models.OneToOneField(Complaint, on_delete=models.CASCADE)
    score = models.IntegerField()
    assessed_at = models.DateTimeField(auto_now_add=True)
    level = models.CharField(max_length=20, choices=Level.choices)
    confidence_score = models.FloatField()
    summary = models.TextField()
    explanation = models.JSONField(
        default=dict,
    )
    recommended_actions = models.JSONField(
        default=list,
    )
    detected_risks = models.JSONField(
        default=list,
    )
