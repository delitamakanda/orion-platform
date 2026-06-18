from rest_framework import routers
from django.urls import path
from apps.audits.views import AuditLogViewSet, LatestAuditLogAPIView, UserAuditLogsAPIView


router = routers.DefaultRouter()


router.register(r'', AuditLogViewSet)

urlpatterns = [
    path('latest/', LatestAuditLogAPIView.as_view(), name='latest-audit-log'),
    path('user/<str:username>/', UserAuditLogsAPIView.as_view(), name='user-audit-logs'),
]

urlpatterns += router.urls
