from apps.notifications.models import Notification
from rest_framework import serializers


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = [
            'id',
            'title',
            'message',
            'type',
            'priority',
            'related_object_id',
            'related_object_type',
            'is_read',
            'read_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']