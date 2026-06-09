from typing import Protocol

class ExternalComplaintClient(Protocol):
    def create_complaint(self, complaint_data: dict) -> dict:
        """Create a complaint in the external system."""
        ...
    
    def fetch_complaints(self) -> list[dict]:
        """Fetch a list of complaints from the external system."""
        ...
    
    def fetch_complaint_detail(self, external_id: str) -> dict:
        """Fetch detailed information about a specific complaint from the external system."""
        ...
        