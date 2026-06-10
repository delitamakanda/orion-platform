from django.db.models import Q
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from apps.audits.models import Audit
from apps.audits.serializers import AuditSerializer
from apps.audits.selectors.audit_log_selectors import AuditLogSelectors
from apps.common.responses import GenericResponse
from rest_framework import status
from rest_framework.response import Response

class AuditLogViewSet(viewsets.ModelViewSet):
    queryset = Audit.objects.all()
    serializer_class = AuditSerializer
    filterset_fields = ['created_at', 'user__username', 'status']
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get']

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user

        if user.is_superuser:
            return queryset

        return queryset.filter(Q(user=user) | Q(user__isnull=True))

class LatestAuditLogAPIView(APIView):
    def get(self, request):
        latest_audit_log = AuditLogSelectors.get_latest_audit_log()
        serializer = AuditSerializer(latest_audit_log)
        return GenericResponse(data=serializer.data, status=status.HTTP_200_OK)
    
class UserAuditLogsAPIView(APIView):
    def get(self, request):
        user = request.user
        audit_logs = AuditLogSelectors.get_audit_logs_by_user(user.id)
        serializer = AuditSerializer(audit_logs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class ListAuditLogsAPIView(APIView):
    def get(self, request):
        audit_logs = AuditLogSelectors.get_audit_logs()
        serializer = AuditSerializer(audit_logs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
