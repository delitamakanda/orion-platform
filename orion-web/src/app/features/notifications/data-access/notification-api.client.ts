import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { Notification } from '../models/notification.model';

@Service()
export class NotificationApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll() {
    return this.http.get<Notification[]>(`${this.config.backendUrl}/notifications/`);
  }

  markAsRead(notificationId: string) {
    return this.http.post(`${this.config.backendUrl}/notifications/mark-as-read/${notificationId}/`, {});
  }

  markAllAsRead() {
    return this.http.post(`${this.config.backendUrl}/notifications/mark-all-as-read/`, {});
  }

  findUnreadCount() {
    return this.http.get<{ unread_count: number }>(`${this.config.backendUrl}/notifications/unread-count/`);
  }
}
