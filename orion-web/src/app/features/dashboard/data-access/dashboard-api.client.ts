import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { Kpi } from '../models/kpi.model';

@Service()
export class DashboardApiClient {
    private readonly http = inject(HttpClient);
    private readonly config = inject(API_CONFIG_TOKEN);

    findAll() {
        return this.http.get<Kpi>(`${this.config.backendUrl}/dashboards/`);
    }

    findAllKpis() {
        return this.http.get<Kpi>(`${this.config.backendUrl}/dashboards/kpis/`);
    }

    findLatest() {
        return this.http.get<Record<string, string>[]>(`${this.config.backendUrl}/dashboards/top-priority-complaints/`);
    }
}
