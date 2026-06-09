from apps.complaints.models import Complaint
from rest_framework import serializers

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = (
            'id',
            'source_system',
            'reference',
            'original_external_id',
            'category',
            'location',
            'incident_date',
            'vulnerability_victim',
            'raw_payload',
            'received_at',
            'imported_at',
            'declared_urgency',
            'title',
            'description',
            'status',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at', 'imported_at', 'id')

        def create(self, validated_data):
            complaint = Complaint.objects.create(**validated_data)
            return complaint
        
        def update(self, instance, validated_data):
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            return instance
