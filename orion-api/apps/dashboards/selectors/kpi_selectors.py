from apps.dashboards.services.kpi_service import KpiService

class KpiSelectors:
    @staticmethod
    def get_overview_kpi():
        service = KpiService()
        return service.get_kpi_data()
