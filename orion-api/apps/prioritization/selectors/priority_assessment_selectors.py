from apps.prioritization.models import PriorityAssessment

class PriorityAssessmentSelectors:

    FILTER_MAP = {
        'status': 'complaint__status',
        'level': 'level',
        'declared_urgency': 'complaint__declared_urgency',
        'location': 'complaint__location',
    }

    @classmethod
    def list_assessments(cls, query_params=None):
        filters = {
            field: query_params[param]
            for param, field in cls.FILTER_MAP.items() if query_params and query_params.get(param)
        }
        return PriorityAssessment.objects.filter(**filters).select_related('complaint')
    
    @staticmethod
    def get_by_complaint(complaint_id):
        return (
            PriorityAssessment.objects.get(complaint_id=complaint_id)
        )
    