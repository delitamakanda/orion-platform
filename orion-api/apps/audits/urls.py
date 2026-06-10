from rest_framework import routers
from django.urls import path
from apps.audits.views import AuditLogViewSet, LatestAuditLogAPIView, UserAuditLogsAPIView, ListAuditLogsAPIView


router = routers.DefaultRouter()


router.register(r'', AuditLogViewSet)


urlpatterns = router.urls

urlpatterns += [
    path('latest/', LatestAuditLogAPIView.as_view(), name='latest-audit-log'),
    path('user/<str:username>/', UserAuditLogsAPIView.as_view(), name='user-audit-logs'),
    path('', ListAuditLogsAPIView.as_view(), name='list-audit-logs'),
]
