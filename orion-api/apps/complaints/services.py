from apps.complaints.models import Complaint
from django.utils import timezone
from apps.integrations.services import ExternalComplaintService

class ComplaintImportService:
    def __init__(self, client=None):
        self.client = client or ExternalComplaintService()
        
        def synchronize_complaints(self):
            external_complaints = self.client.fetch_complaints()

            for item in external_complaints:
                Complaint.objects.update_or_create(
                    source_system=item['source_system'],
                    reference=item['reference'],
                    defaults={
                        'original_external_id': item['original_external_id'],
                        'title': item['title'],
                        'description': item['description'],
                        'category': item['category'],
                        'location': item['location'],
                        'incident_date': item['incident_date'],
                        'declared_urgency': item['declared_urgency'],
                        'vulnerability_victim': item['vulnerability_victim'],
                        'status': Complaint.Status.IMPORTED,
                        'received_at': timezone.now(),
                        'imported_at': timezone.now(),
                        'raw_payload': item,
                    }
                )
                        