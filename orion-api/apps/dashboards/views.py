from rest_framework import generics
from apps.dashboards.selectors.kpi_selectors import KpiSelectors
from apps.dashboards.selectors.dashboard_selectors import DashboardSelectors
from rest_framework.response import Response

class KpiListAPIView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        kpi_data = KpiSelectors.get_overview_kpi()
        return Response(kpi_data)
    


class DashboardListAPIView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        dashboard_data = DashboardSelectors.get_overview_data()
        return Response(dashboard_data)
    

class TopPriorityComplaintsAPIView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        top_complaints = DashboardSelectors.get_top_priority_categories()
        data = [{'id': c.id, 'title': c.title} for c in top_complaints]
        return Response(data)
    