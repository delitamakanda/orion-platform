from apps.notifications.views import (
    GetNotificationsAPIView,
    MarkNotificationAsReadAPIView,
    MarkAllNotificationsAsReadAPIView,
    UnreadNotificationsCountAPIView,
)
from django.urls import path

urlpatterns = [
    path('', GetNotificationsAPIView.as_view(), name='get-notifications'),
    path('mark-as-read/<int:notification_id>/', MarkNotificationAsReadAPIView.as_view(), name='mark-notification-as-read'),
    path('mark-all-as-read/', MarkAllNotificationsAsReadAPIView.as_view(), name='mark-all-notifications-as-read'),
    path('unread-count/', UnreadNotificationsCountAPIView.as_view(), name='unread-notifications-count'),
]