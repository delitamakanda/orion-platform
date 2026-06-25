import { inject, resource, Service } from '@angular/core';
import { NotificationApiClient } from './notification-api.client';
import { firstValueFrom } from 'rxjs';

@Service()
export class NotificationRepository {
  private readonly api = inject(NotificationApiClient);

  readonly notificationsResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.findAll());
    },
  });

  readonly unreadNotificationsResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.findUnreadNotifications());
    },
  });

  readonly unreadCountResource = resource({
    loader: async () => {
      const { unread_count } = await firstValueFrom(this.api.findUnreadCount());
      return unread_count ?? 0;
    },
  });

  get unreadCount() {
    return this.unreadCountResource.value() ?? 0;
  }

  get notifications() {
    return this.notificationsResource.value() ?? [];
  }

  get unreadNotifications() {
    return this.unreadNotificationsResource.value() ?? [];
  }

  get isLoading() {
    return (
      this.notificationsResource.isLoading() ||
      this.unreadCountResource.isLoading() ||
      this.unreadNotificationsResource.isLoading()
    );
  }

  get error() {
    return (
      this.notificationsResource.error() || this.unreadCountResource.error() || this.unreadNotificationsResource.error()
    );
  }

  markAsRead(notificationId: string) {
    return this.api.markAsRead(notificationId);
  }

  markAllAsRead() {
    return this.api.markAllAsRead();
  }
}
