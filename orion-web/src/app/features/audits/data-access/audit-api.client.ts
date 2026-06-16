import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { map } from 'rxjs';
import { Audit } from '../models/audit.model';

@Service()
export class AuditApiClient {
    private readonly http = inject(HttpClient);
    private readonly config = inject(API_CONFIG_TOKEN);

    findAll() {
        return this.http.get<{ data: { results: Audit[] } }>(`${this.config.backendUrl}/audits/`).pipe(
            map(response => response.data.results)
        );
    }

    findOne(username: string) {
        return this.http.get<{ data: Audit }>(`${this.config.backendUrl}/audits/${username}/`).pipe(
            map(response => response.data)
        );
    }

    findLatest() {
        return this.http.get<{ data: Audit }>(`${this.config.backendUrl}/audits/latest/`);
    }
}
