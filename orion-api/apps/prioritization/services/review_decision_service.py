from apps.prioritization.models import ReviewDecision

class ReviewDecisionService:
    def create_review_decision(self, assessment, reviewer, final_level, comment):
        return ReviewDecision.objects.create(
            assessment=assessment,
            reviewer=reviewer,
            final_level=final_level,
            comment=comment,
            is_override=(
                assessment.level != final_level
            )
        )