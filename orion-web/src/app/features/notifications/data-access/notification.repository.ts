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

  readonly unreadCountResource = resource({
    loader: async () => {
      const response = await firstValueFrom(this.api.findUnreadCount());
      return response.unread_count;
    },
  });

  get unreadCount() {
    return this.unreadCountResource.value() ?? 0;
  }

  get notifications() {
    return this.notificationsResource.value() ?? [];
  }

  get isLoading() {
    return this.notificationsResource.isLoading() || this.unreadCountResource.isLoading();
  }

  get error() {
    return this.notificationsResource.error() || this.unreadCountResource.error();
  }

  markAsRead(notificationId: string) {
    return this.api.markAsRead(notificationId);
  }

  markAllAsRead() {
    return this.api.markAllAsRead();
  }
}
