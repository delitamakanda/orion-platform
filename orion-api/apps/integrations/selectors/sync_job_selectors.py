from apps.integrations.models import SyncJob

class SyncJobSelectors:
    @staticmethod
    def get_sync_job_by_id(sync_job_id: int) -> SyncJob:
        return SyncJob.objects.get(id=sync_job_id)
    
    @staticmethod
    def get_latest_sync_job() -> SyncJob:
        return SyncJob.objects.order_by('-created_at').first()
    
    @staticmethod
    def list_sync_jobs() -> list[SyncJob]:
        return SyncJob.objects.all()