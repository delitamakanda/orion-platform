from apps.integrations.services.sync_job_service import SyncJobService
def run_sync_jobs():
    sync_job = SyncJobService().run_sync_jobs()
    return str(sync_job.id)