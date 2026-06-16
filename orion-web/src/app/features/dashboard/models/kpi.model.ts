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


export interface Kpi {
    complaints: KpiComplaint;
    priorities: KpiPriority;
    reviews: KpiReview;
    integrations: KpiIntegration;
}
