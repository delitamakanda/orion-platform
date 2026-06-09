from apps.prioritization.models import PriorityAssessment

class PriorityAssessmentSelectors:

    @staticmethod
    def list_assessments():
        return PriorityAssessment.objects.all().select_related('complaint')
    
    @staticmethod
    def get_by_complaint(complaint_id):
        return (
            PriorityAssessment.objects.get(complaint_id=complaint_id)
        )
    