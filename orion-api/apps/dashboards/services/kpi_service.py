from apps.prioritization.models import ReviewDecision, PriorityAssessment
from django.db.models import Avg, ExpressionWrapper, DurationField, F


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
        result = ReviewDecision.objects.annotate(
            time_to_review=ExpressionWrapper(
                F('created_at') - F('assessment__complaint__imported_at'),
                output_field=DurationField()
            )
        ).aggregate(mean=Avg('time_to_review'))

        mean = result['mean']
        if mean is None:
            return None
        return mean.total_seconds() / 3600