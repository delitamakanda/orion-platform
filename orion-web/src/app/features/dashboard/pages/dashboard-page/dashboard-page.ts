import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../data-access/dashboard.store';
import { DatePipe } from '@angular/common';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-dashboard-page',
  imports: [...SHARED_UI_COMPONENTS, ...MATERIAL_IMPORTS, DatePipe],
  providers: [DashboardStore],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly store = inject(DashboardStore);

  readonly data = computed(() => this.store.kpis() ?? this.store.dashboards());
}
