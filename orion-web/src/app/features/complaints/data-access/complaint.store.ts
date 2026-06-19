import { computed, inject, Service, signal } from '@angular/core';
import { ComplaintRepository } from './complaint.repository';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';
import { Complaint } from '../models/complaint.model';
@Service()
export class ComplaintStore {
  private readonly repository = inject(ComplaintRepository);

  private readonly _loading = signal<boolean>(false);
  private readonly _selectedComplaint = signal<Complaint | null>(null);

  readonly complaints = computed(() => this.repository.complaints);
  readonly isLoading = computed(() => this.repository.isLoading);
  readonly error = computed(() => this.repository.error);
  readonly loading = this._loading.asReadonly();

  readonly selectedComplaint = this._selectedComplaint.asReadonly();

  updateFilters(filter: Partial<ComplaintFilter>) {
    this.repository.filters.update((current) => ({ ...current, ...filter }));
  }

  selectComplaint(complaint: Complaint) {
    this._selectedComplaint.set(complaint);
  }

  findComplaintById(id: number) {
    return this.repository.findComplaintById(id);
  }
}
