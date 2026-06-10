from apps.notifications.models import Notification
from django.utils import timezone

class NotificationService:
    @staticmethod
    def notify_user(
        *,
        recipient,
        title,
        message,
        type,
        priority='NORMAL',
        related_object_id="",
        related_object_type="",
    ):
        notification = Notification.objects.create(
            recipient=recipient,
            title=title,
            message=message,
            type=type,
            priority=priority,
            related_object_id=related_object_id,
            related_object_type=related_object_type,
        )
        return notification
    
    @staticmethod
    def mark_as_read(notification):
        return notification.mark_as_read()
