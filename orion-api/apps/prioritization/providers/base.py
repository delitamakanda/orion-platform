from typing import Protocol

class PrioritizationProvider(Protocol):

    def analyze(self, complaint) -> dict:
        """Analyze a complaint and return a priority assessment."""
        pass