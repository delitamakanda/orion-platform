
from django.db import models
from apps.accounts.models import CustomUser
class Complaint(models.Model):
    class Status(models.TextChoices):
        IMPORTED = 'imported', 'Imported'
        ANALYZED = 'analyzed', 'Analyzed'
        REVIEWED = 'reviewed', 'Reviewed'
        CLOSED = 'closed', 'Closed'
    source_system = models.CharField(max_length=100)
    reference = models.CharField(max_length=100, unique=True)
    original_external_id = models.CharField(max_length=100, db_index=True)

    title = models.CharField(max_length=200)
    description = models.TextField()

    category = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    incident_date = models.DateTimeField()
    declared_urgency = models.IntegerField()
    vulnerability_victim = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    raw_payload = models.JSONField(default=dict)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.IMPORTED)

    received_at = models.DateTimeField()
    imported_at = models.DateTimeField(auto_now_add=True)

    def assigned_to(self):
        # assigned to random user with role magistrat or procureur
        magistrat_or_procureur_users = CustomUser.objects.filter(role__in=['magistrat', 'procureur'])
        return magistrat_or_procureur_users.order_by('?').first() if magistrat_or_procureur_users.exists() else None
