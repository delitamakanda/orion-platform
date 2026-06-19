import { inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ComplaintApiClient } from './complaint-api.client';
import { Complaint } from '../models/complaint.model';
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

  readonly complaintsResource = rxResource<Complaint[], ComplaintFilter>({
    params: () => this.filters(),
    stream: ({ params: filter }) => this.api.findAll(filter),
  });

  get complaints() {
    return this.complaintsResource.value() ?? [];
  }

  get isLoading() {
    return this.complaintsResource.isLoading();
  }

  get error() {
    return this.complaintsResource.error();
  }

  findComplaintById(id: string) {
    return this.api.findOne(id);
  }
}
