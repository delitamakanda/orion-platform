from apps.complaints.models import Complaint

class ComplaintMappingService:
    def map_external_to_internal(self, payload) -> dict:
        facts = payload.get("facts", {})
        location = facts.get("location", {})

        return {
            "original_external_id": payload["id"],
            "reference": payload["reference"],
            "title": payload["title"],
            "description": payload["description"],
            "status": Complaint.Status.IMPORTED,
            "category": facts.get("category"),
            "location": f"{location.get('city', '')}, {location.get('country', '')}",
            "incident_date": payload["incident_date"],
            "declared_urgency": payload["declared_urgency"],
            "vulnerability_victim": facts.get("vulnerability_victim"),
            "raw_payload": payload,
            "received_at": payload["received_at"],
        }