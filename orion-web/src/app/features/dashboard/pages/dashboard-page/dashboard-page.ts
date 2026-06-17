import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../data-access/dashboard.store';
import { JsonPipe } from '@angular/common';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';

@Component({
  selector: 'app-dashboard-page',
  imports: [JsonPipe, ...SHARED_UI_COMPONENTS],
  providers: [DashboardStore],
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
})
export class DashboardPage {
  readonly store = inject(DashboardStore);
}
