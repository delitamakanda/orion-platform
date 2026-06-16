import { computed, inject, Service, signal } from '@angular/core';
import { ComplaintRepository } from './complaint.repository';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';
@Service()
export class ComplaintStore {
  private readonly repository = inject(ComplaintRepository);

  readonly complaints = computed(() => this.repository.complaints);
  readonly isLoading = computed(() => this.repository.isLoading);
  readonly error = computed(() => this.repository.error);

  readonly selectedComplaintId = signal<string>('');

  updateFilters(filter: Partial<ComplaintFilter>) {
    this.repository.filters.update((current) => ({ ...current, ...filter }));
  }

  selectComplaint(id: string) {
    this.selectedComplaintId.set(id);
  }
}
