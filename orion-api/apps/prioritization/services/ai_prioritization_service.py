from django.conf import settings
from apps.prioritization.providers.mock_providers import MockPrioritizationProvider
from apps.prioritization.providers.mistral_provider import MistralProvider

class AIPrioritizationService:
    def __init__(self):
        self.provider = self._get_provider()

    def _get_provider(self):
        provider = settings.PRIORITIZATION_PROVIDER.lower()
        if provider == "mistral":
            return MistralProvider()
        elif provider == "mock":
            return MockPrioritizationProvider()
        
    def analyze(self, complaint):
        return self.provider.analyze(complaint)