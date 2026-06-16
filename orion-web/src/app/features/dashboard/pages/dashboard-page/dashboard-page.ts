import { Component, inject } from '@angular/core';
import { DashboardStore } from '../../data-access/dashboard.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    JsonPipe,
  ],
  providers: [
    DashboardStore,
  ],
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
})
export class DashboardPage {
  readonly store = inject(DashboardStore);
}
