from django.urls import path
from apps.dashboards.views import KpiListAPIView, DashboardListAPIView, TopPriorityComplaintsAPIView

urlpatterns = [
    path('kpis/', KpiListAPIView.as_view(), name='kpi-list'),
    path('', DashboardListAPIView.as_view(), name='dashboard-list'),
    path('top-priority-complaints/', TopPriorityComplaintsAPIView.as_view(), name='top-priority-complaints'),
]