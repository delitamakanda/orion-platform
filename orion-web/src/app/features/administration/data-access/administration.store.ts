import { computed, inject, Service, signal } from '@angular/core';
import { AdministrationRepository } from './administration.repository';

@Service()
export class AdministrationStore {
  private readonly repository = inject(AdministrationRepository);

  readonly users = computed(() => this.repository.users);
  readonly isLoading = computed(() => this.repository.isLoading);
  readonly error = computed(() => this.repository.error);

  readonly selectedUsername = signal<string>('');

  selectUser(username: string) {
    this.selectedUsername.set(username);
  }
}
