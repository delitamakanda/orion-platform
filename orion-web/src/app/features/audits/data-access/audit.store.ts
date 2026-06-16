import { computed, inject, Service } from '@angular/core';
import { AuditRepository } from './audit.repository';

@Service()
export class AuditStore {
    private readonly repository = inject(AuditRepository);

    readonly audits = computed(() => this.repository.audits);
    readonly latest = computed(() => this.repository.latest);
    readonly userAudits = computed(() => this.repository.userAudits);
    readonly isLoading = computed(() => this.repository.isLoading);
    readonly error = computed(() => this.repository.error);

    selectedUsername = computed(() => this.repository.filter().username);

    updateSelectedUsername(username: string) {
        this.repository.filter.update(current => ({ ...current, username }));
    }
}
