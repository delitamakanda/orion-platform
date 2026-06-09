import django_filters
from apps.complaints.models import Complaint

class ComplaintFilter(django_filters.FilterSet):
    created_at_lte = django_filters.DateTimeFilter(field_name='created_at', lookup_expr='lte')
    created_at_gte = django_filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    incident_date_lte = django_filters.DateTimeFilter(field_name='incident_date', lookup_expr='lte')
    incident_date_gte = django_filters.DateTimeFilter(field_name='incident_date', lookup_expr='gte')

    class Meta:
        model = Complaint
        fields = {
            'source_system': ['exact', 'icontains'],
            'reference': ['exact', 'icontains'],
            'category': ['exact', 'icontains'],
            'location': ['exact', 'icontains'],
            'vulnerability_victim': ['exact'],
            'status': ['exact'],
        }