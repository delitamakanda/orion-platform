from django.utils import timedelta

from apps.complaints.models import Complaint

class RuleBasedPrioritizationService:
    
    def apply_rules(self, complaint: Complaint) -> int:
        # Apply rules to determine the priority of the complaint
        # Example:
        # - Check if the complaint has been resolved within the last 24 hours
        # - Check if the complaint has been assigned to a specific department
        # - Check if the complaint has been marked as urgent
        # - Calculate the total number of comments and attachments
        # - Apply weightage factors to each rule
        # - Return the priority based on the weighted scores
        score = 0

        if complaint.vulnerability_victim:
            score += 30
        if "menace" in complaint.description.lower():
            score += 20
        if "arme" in complaint.description.lower():
            score += 40
        if complaint.status == Complaint.Status.CLOSED:
            score -= 50
        if complaint.declared_urgency:
            score += complaint.declared_urgency * 10
        if complaint.received_at.date() > complaint.incident_date.date() + timedelta(days=1):
            score -= 20

        return score
