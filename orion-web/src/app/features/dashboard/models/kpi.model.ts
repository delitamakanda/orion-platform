interface KpiComplaint {
  total: number;
  new: number;
}

interface KpiPriority {
  critical: number;
  urgent: number;
  standard: number;
  low: number;
}

interface KpiReview {
  pending: number;
  completed: number;
  overrides: number;
}

interface KpiIntegration {
  last_sync_status: string;
  last_sync_at: string;
}

export interface DashboardKpi {
  complaints: KpiComplaint;
  reviews: KpiReview;
  integrations: KpiIntegration;
}

export interface Kpi {
  priorities: KpiPriority;
  mean_time_to_review: number | null;
}
