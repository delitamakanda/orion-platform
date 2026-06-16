import { computed, inject, Service } from '@angular/core';
import { DashboardRepository } from './dashboard.repository';

@Service()
export class DashboardStore {
    private readonly repository = inject(DashboardRepository);

    readonly dashboards = computed(() => this.repository.dashboards);
    readonly kpis = computed(() => this.repository.kpis);
    readonly latest = computed(() => this.repository.latest);
    readonly isLoading = computed(() => this.repository.isLoading);
    readonly error = computed(() => this.repository.error);
}
