from rest_framework import serializers
from apps.integrations.models import SyncJob

class SyncJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyncJob
        fields = [
            'id',
            'source_system',
            'status',
            'imported_count',
            'updated_count',
            'skipped_count',
            'error_message',
            'started_at',
            'completed_at',
            'created_at',
        ]
        read_only_fields = ['created_at', 'id']