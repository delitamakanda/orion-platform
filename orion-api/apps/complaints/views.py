from rest_framework import viewsets
from apps.complaints.filters import ComplaintFilter
from apps.common.responses import GenericResponse
from apps.complaints.models import Complaint
from apps.complaints.serializers import ComplaintSerializer
from rest_framework import status
from apps.accounts.permissions import IsAgentOrHigher, IsMagistratOrHigher, IsAdministrateur
from apps.audits.services.audit_log_service import AuditLogService

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('-created_at')
    serializer_class = ComplaintSerializer
    filterset_class = ComplaintFilter
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAgentOrHigher()]
        if self.action in ['create', 'update', 'partial_update']:
            return [IsMagistratOrHigher()]
        if self.action == 'destroy':
            return [IsAdministrateur()]
        return [IsAdministrateur()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return GenericResponse(data=serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return GenericResponse(data=serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        AuditLogService.record(
            user=request.user,
            action='COMPLAINT_VIEWED',
            target_id=str(instance.id),
            target_type='Complaint',
            metadata={'complaint_id': str(instance.id)},
            request=request
        )
        return GenericResponse(data=serializer.data, status=status.HTTP_200_OK)
    
