from rest_framework.views import APIView
from rest_framework import status
from apps.common.responses import GenericResponse
from apps.integrations.serializers import SyncJobSerializer
from apps.integrations.services.sync_job_service import SyncJobService
from apps.integrations.selectors.sync_job_selectors import SyncJobSelectors

class SyncJobListAPIView(APIView):
    def get(self, request):
        sync_jobs = SyncJobSelectors.list_sync_jobs()
        serializer = SyncJobSerializer(sync_jobs, many=True)
        return GenericResponse(data=serializer.data)
    
class SyncComplainsAPIView(APIView):
    def post(self, request):
        sync_job = SyncJobService.run_sync()
        serializer = SyncJobSerializer(sync_job)
        return GenericResponse(data=serializer.data, status=status.HTTP_201_CREATED)
    
class LastedSyncJobAPIView(APIView):
    def get(self, request):
        sync_job = SyncJobSelectors.get_latest_sync_job()
        if not sync_job:
            return GenericResponse(data=None, status=status.HTTP_404_NOT_FOUND)
        serializer = SyncJobSerializer(sync_job)
        return GenericResponse(data=serializer.data)