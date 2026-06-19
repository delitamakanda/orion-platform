import { inject, resource, Service } from '@angular/core';
import { AdministrationApiClient } from './administration-api.client';
import { firstValueFrom } from 'rxjs';

@Service()
export class AdministrationRepository {
  private readonly api = inject(AdministrationApiClient);

  readonly usersResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.fetchAll());
    },
  });

  get users() {
    return this.usersResource.value() ?? [];
  }

  get isLoading() {
    return this.usersResource.isLoading();
  }

  get error() {
    return this.usersResource.error();
  }
}
