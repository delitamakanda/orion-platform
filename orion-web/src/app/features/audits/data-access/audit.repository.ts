import { inject, Service, resource, signal } from '@angular/core';
import { AuditApiClient } from './audit-api.client';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthStore } from '@app/features/auth/data-access/auth.store';

@Service()
export class AuditRepository {
  private readonly api = inject(AuditApiClient);
  private readonly store = inject(AuthStore);

  readonly auditsResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.findAll());
    },
  });

  readonly latestResource = resource({
    loader: async () => {
      return await firstValueFrom(this.api.findLatest());
    },
  });

  readonly filter = signal<{ username: string }>({ username: this.store.user()?.username ?? '' });

  readonly userAuditsResource = rxResource({
    params: () => this.filter(),
    stream: ({ params: { username } }) => this.api.findOne(username),
  });

  get audits() {
    return this.auditsResource.value() ?? [];
  }

  get latest() {
    return this.latestResource.value() ?? [];
  }

  get userAudits() {
    return this.userAuditsResource.value() ?? [];
  }

  get isLoading() {
    return this.auditsResource.isLoading() || this.latestResource.isLoading() || this.userAuditsResource.isLoading();
  }

  get error() {
    return this.auditsResource.error() || this.latestResource.error() || this.userAuditsResource.error();
  }
}
