from apps.notifications.models import Notification
from apps.notifications.services.notification_service import NotificationService

class NotificationSelectors:

    @staticmethod
    def get_notifications_for_user(user):
        return Notification.objects.filter(recipient=user).order_by('-created_at')
    
    @staticmethod
    def mark_notification_as_read(notification):
        return NotificationService.mark_as_read(notification)
    
    @staticmethod
    def get_unread_notifications_count_for_user(user):
        return Notification.objects.filter(recipient=user, is_read=False).order_by('-created_at').count()
    
    @staticmethod
    def mark_all_notifications_as_read_for_user(user):
        notifications = Notification.objects.filter(recipient=user, is_read=False)
        for notification in notifications:
            NotificationService.mark_as_read(notification)
        return notifications.count()
    
    @staticmethod
    def get_unread_notifications_for_user(user):
        return Notification.objects.filter(recipient=user, is_read=False).order_by('-created_at')