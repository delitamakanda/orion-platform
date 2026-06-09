from django.db import transaction
from apps.complaints.models import Complaint
from apps.integrations.services.complaint_mapping_service import ComplaintMappingService

class ComplaintImportService:
    def __init__(self, client, mapper=None):
        self.client = client
        self.mapper = mapper or ComplaintMappingService()

    @transaction.atomic
    def import_complaint(self) -> Complaint:
        imported = 0
        updated = 0
        skipped = 0

        external_complaints = self.client.fetch_complaints()
        for payload in external_complaints:
            data = self.mapper.map_external_to_internal(payload)
            complaint, created = Complaint.objects.update_or_create(
                external_id=data['original_external_id'],
                defaults=data,
                source_system=data['source_system'],
            )
            if created:
                imported += 1
            else:
                updated += 1
            
            return {
                'imported_count': imported,
                'updated_count': updated,
                'skipped_count': skipped,
            }