import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../data-access/dashboard.store';
import { DatePipe, JsonPipe } from '@angular/common';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';

@Component({
  selector: 'app-dashboard-page',
  imports: [JsonPipe, ...SHARED_UI_COMPONENTS, ...MATERIAL_IMPORTS, DatePipe],
  providers: [DashboardStore],
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
})
export class DashboardPage {
  readonly store = inject(DashboardStore);
}
