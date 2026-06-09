import random

class MockPrioritizationProvider:
    def analyze(self, complaint):

        score = random.randint(20, 98)
        if score >= 80:
            level = 'CRITICAL'
        elif score >= 60:
            level = 'HIGH'
        elif score >= 40:
            level = 'MEDIUM'
        else:
            level = 'LOW'

        return {
            'score': score,
            'level': level,
            'confidence_score': random.uniform(0.7, 1.0),
            'summary': 'Generated summary based on random analysis',
            'recommendations' : [
                {
                    'label': 'Violence',
                    'weight': random.randint(1, 10),
                    'description': 'mot clé détecté'
                }
            ]
        }