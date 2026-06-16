from rest_framework import serializers
from apps.complaints.serializers import ComplaintSerializer
from apps.prioritization.models import PriorityAssessment, ReviewDecision


class CreatePriorityAssessmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = PriorityAssessment
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


class PriorityAssessmentSerializer(serializers.ModelSerializer):
    complaint = ComplaintSerializer()

    class Meta:
        model = PriorityAssessment
        fields = [
            'id',
            'complaint',
            'score',
            'level',
            'confidence_score',
            'summary',
            'explanation',
            'model_name',
            'provider',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'id']
