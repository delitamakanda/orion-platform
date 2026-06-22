import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../data-access/dashboard.store';
import { DatePipe } from '@angular/common';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { formatHours } from '@app/shared/utils/hours.utils';
@Component({
  selector: 'app-dashboard-page',
  imports: [...SHARED_UI_COMPONENTS, ...MATERIAL_IMPORTS, DatePipe],
  providers: [DashboardStore],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly formatHours = formatHours;
  readonly store = inject(DashboardStore);

  readonly kpis = computed(() => this.store.kpis() ?? null);
  readonly dashboards = computed(() => this.store.dashboards() ?? null);
}
