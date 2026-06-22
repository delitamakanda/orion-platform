from apps.complaints.models import Complaint
from apps.prioritization.models import ReviewDecision, PriorityAssessment
from django.db.models import Avg


class KpiService:
    def get_kpi_data(self):
        return {
            'priorities': {
                'critical': PriorityAssessment.objects.filter(level='critical').count(),
                'urgent': PriorityAssessment.objects.filter(level='high').count(),
                'standard': PriorityAssessment.objects.filter(level='medium').count(),
                'low': PriorityAssessment.objects.filter(level='low').count()
            },
            'mean_time_to_review': self.get_mean_time_to_review(),
        }
    
    def get_mean_time_to_review(self):
        # Calculate the mean time to review for all complaints that have been reviewed
        reviewed_complaints = Complaint.objects.filter(status=Complaint.Status.REVIEWED)
        if not reviewed_complaints.exists():
            return None
        
        total_time = 0
        count = 0
        
        for complaint in reviewed_complaints:
            review_decision = ReviewDecision.objects.filter(assessment__complaint=complaint).first()
            if review_decision:
                time_to_review = (review_decision.created_at - complaint.imported_at).total_seconds()
                total_time += time_to_review
                count += 1
        
        if count == 0:
            return None
        
        mean_time_seconds = total_time / count
        return mean_time_seconds / 3600  # Return mean time in hours