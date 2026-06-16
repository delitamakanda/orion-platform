import { inject, resource, Service } from '@angular/core';
import { DashboardApiClient } from './dashboard-api.client';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Service()
export class DashboardRepository {
    private readonly api = inject(DashboardApiClient);

    readonly dashboardResource = resource({
        loader: async () => {
            return await firstValueFrom(this.api.findAll());
        }
    });

    readonly kpisResource = resource({
        loader: async () => {
            return await firstValueFrom(this.api.findAllKpis());
        }
    });

    readonly latestResource = resource({
        loader: async () => {
            return await firstValueFrom(this.api.findLatest());
        }
    });

    get dashboards() {
        return this.dashboardResource.value() ?? null;
    }

    get kpis() {
        return this.kpisResource.value() ?? null;
    }
    
    get latest() {
        return this.latestResource.value() ?? [];
    }

    get isLoading() {
        return this.dashboardResource.isLoading() || this.kpisResource.isLoading() || this.latestResource.isLoading();
    }

    get error() {
        return this.dashboardResource.error() || this.kpisResource.error() || this.latestResource.error();
    }
}
