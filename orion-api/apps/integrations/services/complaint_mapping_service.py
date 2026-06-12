from apps.complaints.models import Complaint

class ComplaintMappingService:
    def map_external_to_internal(self, payload) -> dict:
        facts = payload.get("facts", {})
        location = payload.get("location", {})
        complainant = payload.get("complainant", {})


        return {
            "original_external_id": payload["id"],
            "reference": payload["reference"],
            "title": facts.get("title", ""),
            "description": facts.get("description", ""),
            "status": Complaint.Status.IMPORTED,
            "source_system": payload["source_system"],
            "category": payload["category"],
            "location": f"{location.get('city', '')}, {location.get('country', '')}",
            "incident_date": payload["incident_date"],
            "declared_urgency": payload["declared_urgency"],
            "vulnerability_victim": complainant.get("is_vulnerable"),
            "raw_payload": payload,
            "received_at": payload["received_at"],
        }