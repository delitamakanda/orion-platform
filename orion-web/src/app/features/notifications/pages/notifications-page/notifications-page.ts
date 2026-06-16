import { Component, inject } from '@angular/core';
import { NotificationStore } from '../../data-access/notification.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications-page',
  imports: [DatePipe],
  providers: [
    NotificationStore,
  ],
  templateUrl: './notifications-page.html',
  styleUrls: ['./notifications-page.css'],
})
export class NotificationsPage {
  readonly store = inject(NotificationStore);
}
