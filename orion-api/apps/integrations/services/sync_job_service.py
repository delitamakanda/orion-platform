from django.utils import timezone
from apps.integrations.models import SyncJob, SyncJobStatus
from apps.integrations.services.complaint_import_service import ComplaintImportService
from apps.integrations.clients.mock_system_client import ExternalComplaintService
from apps.audits.services.audit_log_service import AuditLogService

class SyncJobService:
    def run_sync_jobs(self) -> SyncJob:
        AuditLogService.record(
            user=None,
            action='SYNC_STARTED',
            target_id='',
            target_type='SyncJob',
            metadata={'message': 'Sync job started.'},
        )
        sync_job = SyncJob.objects.create(
            status=SyncJobStatus.IN_PROGRESS,
            started_at=timezone.now()
        )

        try:
            client = ExternalComplaintService()
            import_service = ComplaintImportService(client=client)
            result = import_service.import_complaint()

            sync_job.imported_count = result['imported_count']
            sync_job.updated_count = result['updated_count']
            sync_job.skipped_count = result['skipped_count']
            sync_job.status = SyncJobStatus.COMPLETED
        except Exception as e:
            sync_job.status = SyncJobStatus.FAILED
            sync_job.error_message = str(e)
            AuditLogService.record(
                user=None,
                action='SYNC_FAILED',
                target_id='',
                target_type='SyncJob',
                metadata={'error_message': str(e)},
            )
        finally:
            sync_job.completed_at = timezone.now()
            sync_job.save()

        return sync_job