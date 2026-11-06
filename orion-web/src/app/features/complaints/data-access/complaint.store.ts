import { computed, inject, Service, signal } from '@angular/core';
import { ComplaintRepository } from './complaint.repository';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';
import { Complaint } from '../models/complaint.model';
import { ComplaintPagination } from '../models/complaint-page.model';
@Service()
export class ComplaintStore {
  private readonly repository = inject(ComplaintRepository);

  private readonly _loading = signal<boolean>(false);
  private readonly _selectedComplaint = signal<Complaint>(null as unknown as Complaint);

  readonly complaints = computed(() => this.repository.complaints);
  readonly total = computed(() => this.repository.total);
  readonly page = computed(() => this.repository.pagination().page);
  readonly pageSize = computed(() => this.repository.pagination().page_size);
  readonly isLoading = computed(() => this.repository.isLoading);
  readonly error = computed(() => this.repository.error);
  readonly loading = this._loading.asReadonly();

  readonly selectedComplaint = this._selectedComplaint.asReadonly();

  updateFilters(filter: Partial<ComplaintFilter>) {
    this.repository.filters.update((current) => ({ ...current, ...filter }));
    this.repository.pagination.update((current) => ({ ...current, page: 1 }));
  }

  setPagination(pagination: ComplaintPagination) {
    this.repository.pagination.set(pagination);
  }

  setPage(page: number) {
    this.repository.pagination.update((current) => ({ ...current, page }));
  }

  /** Changing the page size goes back to the first page to keep the offset consistent. */
  setPageSize(pageSize: number) {
    this.repository.pagination.set({ page: 1, page_size: pageSize });
  }

  selectComplaint(complaint: Complaint) {
    this._selectedComplaint.set(complaint);
  }

  findComplaintById(id: number) {
    return this.repository.findComplaintById(id);
  }
}
