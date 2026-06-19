from apps.integrations.models import SyncJob
from apps.complaints.models import Complaint
from apps.prioritization.models import ReviewDecision, PriorityAssessment

class DashboardService:
    def get_overview_data(self):
        latest_sync_job = SyncJob.objects.order_by('-created_at').first()
        return {
            'complaints': {
                'total': Complaint.objects.count(),
                'new': Complaint.objects.filter(status='imported').count(),
            },
            'priorities': {
                'critical': PriorityAssessment.objects.filter(level='critical').count(),
                'urgent': PriorityAssessment.objects.filter(level='high').count(),
                'standard': PriorityAssessment.objects.filter(level='medium').count(),
                'low': PriorityAssessment.objects.filter(level='low').count()
            },
            'reviews': {
                'pending': PriorityAssessment.objects.filter(reviews__isnull=True).count(),
                'completed': ReviewDecision.objects.count(),
                'overrides': ReviewDecision.objects.filter(is_override=True).count()
            },
            'integrations': {
                'last_sync_status': latest_sync_job.status if latest_sync_job else 'No sync jobs',
                'last_sync_at': latest_sync_job.completed_at if latest_sync_job else None,
            }
        }
    
    def get_top_prioritized_complaints(self, limit=5):
        return PriorityAssessment.objects.filter(level='high', complaint__isnull=False)[:limit]