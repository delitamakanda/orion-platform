import { computed, inject, Service } from '@angular/core';
import { NotificationRepository } from './notification.repository';

@Service()
export class NotificationStore {
  private readonly repository = inject(NotificationRepository);

  readonly notifications = computed(() => this.repository.notifications);
  readonly unreadNotifications = computed(() => this.repository.unreadNotifications);
  readonly unreadCount = computed(() => this.repository.unreadCount);
  readonly isLoading = computed(() => this.repository.isLoading);
  readonly error = computed(() => this.repository.error);

  updateUnreadCount() {
    this.repository.unreadCountResource.reload();
  }

  updateNotifications() {
    this.repository.notificationsResource.reload();
  }

  markAsRead(notificationId: string) {
    return this.repository.markAsRead(notificationId);
  }

  markAllAsRead() {
    return this.repository.markAllAsRead();
  }
}
