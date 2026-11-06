import { inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ComplaintApiClient } from './complaint-api.client';
import { ComplaintPage, ComplaintPagination, DEFAULT_PAGINATION } from '../models/complaint-page.model';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';

@Service()
export class ComplaintRepository {
  private readonly api = inject(ComplaintApiClient);

  readonly filters = signal<ComplaintFilter>({
    reference: '',
    vulnerability_victim: true,
    incident_date_lte: '',
    incident_date_gte: '',
    created_at_lte: '',
    created_at_gte: '',
  });

  readonly pagination = signal<ComplaintPagination>({ ...DEFAULT_PAGINATION });

  readonly complaintsResource = rxResource<
    ComplaintPage,
    { filters: ComplaintFilter; pagination: ComplaintPagination }
  >({
    params: () => ({ filters: this.filters(), pagination: this.pagination() }),
    stream: ({ params }) => this.api.findAll(params.filters, params.pagination),
  });

  get complaints() {
    return this.complaintsResource.value()?.results ?? [];
  }

  get total() {
    return this.complaintsResource.value()?.count ?? 0;
  }

  get isLoading() {
    return this.complaintsResource.isLoading();
  }

  get error() {
    return this.complaintsResource.error();
  }

  findComplaintById(id: number) {
    return this.api.findOne(id);
  }
}
