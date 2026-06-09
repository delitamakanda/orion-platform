from rest_framework import serializers
from apps.complaints.serializers import ComplaintSerializer
from apps.prioritization.models import PriorityAssessment, ReviewDecision


class CreatePriorityAssessmentSerializer(serializers.Serializer):

    class Meta:
        fields = [
            'complaint',
            'level',
            'confidence_score',
            'summary',
            'explanation',
            'model_name',
            'provider'
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']


class CreateReviewDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDecision
        fields = [
            'assessment',
            'reviewer',
            'previous_level',
            'final_level',
            'comment',
            'is_override'
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']
