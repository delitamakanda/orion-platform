import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NotificationStore } from '../../data-access/notification.store';
import { DatePipe } from '@angular/common';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { NOTIFICATION_TYPE } from '../../models/notification.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-notifications-page',
  imports: [DatePipe, MATERIAL_IMPORTS],
  providers: [NotificationStore],
  templateUrl: './notifications-page.html',
  styleUrls: ['./notifications-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPage {
  private readonly snackbarService = inject(SnackbarService);
  private readonly destroyRef = inject(DestroyRef);
  readonly store = inject(NotificationStore);

  getTypeIcon(type: NOTIFICATION_TYPE): string {
    const icons: Record<NOTIFICATION_TYPE, string> = {
      critical_complaint: 'report_problem',
      priority_review_required: 'assignment_late',
      sync_completed: 'cloud_done',
      sync_failed: 'cloud_off',
    };
    return icons[type] ?? 'notifications';
  }

  markAsRead(notificationId: string) {
    this.store
      .markAsRead(notificationId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackbarService.showSuccessSnackbar(`Notification ${notificationId} marked as read.`);
          this.store.updateUnreadCount();
          this.store.updateNotifications();
        },
        error: (error) => {
          this.snackbarService.showErrorSnackbar(`Error marking notification ${notificationId} as read: ${error}`);
        },
      });
  }

  markAllAsRead() {
    this.store
      .markAllAsRead()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackbarService.showSuccessSnackbar('All notifications marked as read.');
          this.store.updateUnreadCount();
          this.store.updateNotifications();
        },
        error: (error) => {
          this.snackbarService.showErrorSnackbar(`Error marking all notifications as read: ${error}`);
        },
      });
  }
}
