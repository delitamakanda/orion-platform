from rest_framework import serializers

from apps.audits.models import Audit
from apps.accounts.serializers import CustomUserSerializer


class AuditSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Audit
        fields = [
            'id',
            'user',
            'action',
            'target_id',
            'target_type',
            'metadata',
            'ip_address',
            'user_agent',
            'timestamp',
        ]
        read_only_fields = ['id', 'timestamp']