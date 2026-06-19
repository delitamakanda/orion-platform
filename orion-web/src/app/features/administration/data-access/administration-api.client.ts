import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';

@Service()
export class AdministrationApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  fetchAll() {
    return this.http.get(`${this.config.backendUrl}/accounts/admin/users/`);
  }
}
