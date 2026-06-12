import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { SyncJob } from '@app/features/integrations/models/sync-job.model';
import { map } from 'rxjs';

@Service()
export class SyncApiClient {
    private readonly http = inject(HttpClient);
    private readonly config = inject(API_CONFIG_TOKEN);

    findAll() {
        return this.http.get<{ data: SyncJob[] }>(`${this.config.backendUrl}/integrations/sync-jobs/`).pipe(
            map(jobs => jobs['data'] || jobs)
        );
    }

    findOne() {
        return this.http.get<{ data: SyncJob }>(`${this.config.backendUrl}/integrations/latest-sync-job/`).pipe(
            map(job => job['data'] || job)
        );
    }

    sync() {
        return this.http.post(`${this.config.backendUrl}/integrations/sync-complains/`, {});
    }
}
