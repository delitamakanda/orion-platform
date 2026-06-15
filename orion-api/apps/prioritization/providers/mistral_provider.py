import json
from django.conf import settings
from mistralai.client import Mistral

from apps.complaints.models import Complaint

class MistralProvider:
    def __init__(self):
        self.client = Mistral(api_key=settings.MISTRAL_API_KEY)
        self.model_name = settings.MISTRAL_MODEL_NAME

    def analyze(self, complaint):
        prompt = self._build_prompt(complaint)
        response = self.client.chat.complete(
            model=self.model_name,
            messages=[
                {
                    "role": "system",
                    "content": "Tu es un assistant d'aide à la priorisation des plaintes pour le compte du ministère de la justice. Tu ne prends jamais de décision judiciaire. Tu fournis une recommendation explicite explicable, structurée et prudente."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "json_object" },
            temperature=0.2,
        )

        # return respons as object
        content = response.choices[0].message.content
        return json.loads(content)
    
    def _build_prompt(self, complaint: Complaint) -> str:
        return f"""

        Analyse cette plainte et retourne un JSON valide.

        Plainte:
        - Référence: {complaint.reference}
        - Catégorie: {complaint.category}
        - Description: {complaint.description}
        - Date des faits: {complaint.incident_date.isoformat() if complaint.incident_date else 'N/A'}
        - Date de dépôt: {complaint.received_at.isoformat() if complaint.received_at else 'N/A'}
        - Localisation: {complaint.location if complaint.location else 'N/A'}

        Format attendu:
        {{
        "confidence_score": 0,
        "level": "low|medium|high|critical",
        "score": 0,
        "summary": "<string>",
        "model_name": "{self.model_name}",
        "provider": "mistral",
        "recommended_actions": [
            {{
                "label": "Facteur déterminant",
                "weight": 10,
                "description": "Limite de l'analyse ou facteur de risque identifié"
            }}
        ],
        "explanation": {{
            "reasoning": "Explication synthétique",
            "human_review_required": "Indique si une revue humaine est nécessaire (true/false)",
            "limitations": "Limites de l'analyse ou incertitudes identifiées"
            }},
        }}
        """