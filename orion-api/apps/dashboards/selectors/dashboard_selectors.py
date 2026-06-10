from apps.dashboards.services.dashboard_service import DashboardService


class DashboardSelectors:
    @staticmethod
    def get_overview_data():
        service = DashboardService()
        return service.get_overview_data()
    
    @staticmethod
    def get_top_priority_categories():
        service = DashboardService()
        return service.get_top_prioritized_complaints()