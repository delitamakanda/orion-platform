from rest_framework import viewsets
from apps.complaints.filters import ComplaintFilter
from apps.common.responses import GenericResponse
from apps.complaints.models import Complaint
from apps.complaints.serializers import ComplaintSerializer
from rest_framework import status
from apps.accounts.permissions import IsAgentOrHigher, IsMagistratOrHigher, IsAdministrateur

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    filterset_class = ComplaintFilter
    http_method_names = ['get', 'post', 'put']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAgentOrHigher]
        if self.action in ['create', 'update', 'partial_update']:
            permission_classes = [IsMagistratOrHigher]
        if self.action in ['destroy']:
            permission_classes = [IsAdministrateur]
        return [permission() for permission in permission_classes]

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
        return GenericResponse(data=serializer.data, status=status.HTTP_200_OK)
