import { Component, inject } from '@angular/core';
import { NotificationStore } from '../../data-access/notification.store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications-page',
  imports: [DatePipe],
  providers: [NotificationStore],
  templateUrl: './notifications-page.html',
  styleUrls: ['./notifications-page.css'],
})
export class NotificationsPage {
  readonly store = inject(NotificationStore);

  markAsRead(notificationId: string) {
    this.store.markAsRead(notificationId).subscribe({
      next: () => {
        console.log(`Notification ${notificationId} marked as read.`);
      },
      error: (error) => {
        console.error(`Error marking notification ${notificationId} as read:`, error);
      },
    });
  }

  markAllAsRead() {
    this.store.markAllAsRead().subscribe({
      next: () => {
        console.log('All notifications marked as read.');
      },
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      },
    });
  }
}
