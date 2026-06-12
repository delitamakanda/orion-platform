import { computed, inject, Service } from '@angular/core';
import { SyncRepository } from './sync.repository';

@Service()
export class SyncStore {
    private readonly repository = inject(SyncRepository);

    readonly syncJobs = computed(() => this.repository.syncJobs);
    readonly isLoading = computed(() => this.repository.isLoading);
    readonly error = computed(() => this.repository.error);

}
