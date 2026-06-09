from apps.prioritization.models import PriorityAssessment, PriorityRecommendation
from apps.prioritization.services.ai_prioritization_service import AIPrioritizationService
from apps.complaints.models import Complaint

class PrioritizationService:
    def prioritize(self, complaint: Complaint) -> PriorityAssessment:
        response = AIPrioritizationService().analyze(complaint)

        assessment = PriorityAssessment.objects.create(
            complaint=complaint,
            score=response['score'],
            level=response['level'],
            confidence_score=response['confidence_score'],
            summary=response['summary'],
            explanation=response['explanation'],
            model_name=response['model_name'],
            provider=response['provider'],
        )

        for action in response['recommended_actions']:
            PriorityRecommendation.objects.create(
                assessment=assessment,
                label=action['label'],
                weight=action['weight'],
                description=action['description']
            )
        return assessment