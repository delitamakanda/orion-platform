import { inject, resource, Service, signal } from '@angular/core';
import { SyncApiClient } from './sync-api.client';
import { firstValueFrom } from 'rxjs';

@Service()
export class SyncRepository {
  private readonly api = inject(SyncApiClient);

  readonly filters = signal<(obj: Record<string, unknown>) => boolean>(() => true);

  readonly syncResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.findAll());
    },
  });

  get syncJobs() {
    return this.syncResource.value() ?? [];
  }

  get isLoading() {
    return this.syncResource.isLoading();
  }

  get error() {
    return this.syncResource.error();
  }
}
