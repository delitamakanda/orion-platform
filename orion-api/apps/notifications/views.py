from apps.notifications.serializers import NotificationSerializer
from apps.notifications.models import Notification
from apps.notifications.selectors.notification_selectors import NotificationSelectors
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class GetNotificationsAPIView(APIView):
    def get(self, request):
        user = request.user
        notifications = NotificationSelectors.get_notifications_for_user(user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MarkNotificationAsReadAPIView(APIView):
    def post(self, request, notification_id):
        user = request.user
        try:
            notification = Notification.objects.get(id=notification_id, recipient=user)
            NotificationSelectors.mark_notification_as_read(notification)
            return Response({'detail': 'Notification marked as read.'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)
        

class MarkAllNotificationsAsReadAPIView(APIView):
    def post(self, request):
        user = request.user
        NotificationSelectors.mark_all_notifications_as_read_for_user(user)
        return Response({'detail': 'All notifications marked as read.'}, status=status.HTTP_200_OK)
    
class UnreadNotificationsCountAPIView(APIView):
    def get(self, request):
        user = request.user
        count = NotificationSelectors.get_unread_notifications_count_for_user(user)
        return Response({'unread_count': count}, status=status.HTTP_200_OK)
    

class GetUnreadNotificationsAPIView(APIView):
    def get(self, request):
        user = request.user
        notifications = NotificationSelectors.get_unread_notifications_for_user(user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)