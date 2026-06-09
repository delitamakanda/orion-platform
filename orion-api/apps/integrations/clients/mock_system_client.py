import requests
from django.conf import settings

from apps.integrations.clients.exceptions import ExternalSystemError

class ExternalComplaintService:
    def __init__(self):
        self.api_url = settings.EXTERNAL_COMPLAINTS_SYSTEM_API['BASE_URL']
        self.timeout = settings.EXTERNAL_COMPLAINTS_SYSTEM_API['TIMEOUT']
    
    def fetch_complaints(self):
        try:
            response = requests.get(f'{self.api_url}/complaints', timeout=self.timeout, headers={'Authorization': f'Bearer {settings.EXTERNAL_COMPLAINTS_SYSTEM_API["API_KEY"]}', 'Content-Type': 'application/json'})
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise ExternalSystemError(f"Error fetching complaints: {e}") from e
    
    def fetch_complaint_detail(self, external_id):
        try:
            response = requests.get(f'{self.api_url}/complaints/{external_id}', timeout=self.timeout, headers={'Authorization': f'Bearer {settings.EXTERNAL_COMPLAINTS_SYSTEM_API["API_KEY"]}', 'Content-Type': 'application/json'})
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise ExternalSystemError(f"Error fetching complaint detail for ID {external_id}: {e}") from e