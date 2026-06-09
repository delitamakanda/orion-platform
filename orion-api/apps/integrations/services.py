import requests
from django.conf import settings

class ExternalComplaintService:
    def __init__(self):
        self.api_url = settings.EXTERNAL_COMPLAINTS_SYSTEM_API['BASE_URL']
        self.timeout = settings.EXTERNAL_COMPLAINTS_SYSTEM_API['TIMEOUT']
    
    def fetch_complaints(self):
        response = requests.get(f'{self.api_url}/complaints', timeout=self.timeout, headers={'Authorization': f'Bearer {settings.EXTERNAL_COMPLAINTS_SYSTEM_API["API_KEY"]}', 'Content-Type': 'application/json'})
        response.raise_for_status()
        return response.json()
    
    def fetch_complaint_detail(self, external_id):
        response = requests.get(f'{self.api_url}/complaints/{external_id}', timeout=self.timeout, headers={'Authorization': f'Bearer {settings.EXTERNAL_COMPLAINTS_SYSTEM_API["API_KEY"]}', 'Content-Type': 'application/json'})
        response.raise_for_status()
        return response.json()