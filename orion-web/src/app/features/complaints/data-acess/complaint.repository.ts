import { inject, resource, Service, signal } from '@angular/core';
import { ComplaintApiClient } from './complaint-api.client';
import { ComplaintFilter } from '../models/complaint.model';
import { firstValueFrom } from 'rxjs';

@Service()
export class ComplaintRepository {
    private readonly api = inject(ComplaintApiClient);

    readonly filters = signal<ComplaintFilter>({
        source_system: '',
        reference: '',
        category: '',
        location: '',
        status: '',
        vulnerability_victim: true,
        incident_date_lte: '',
        incident_date_gte: '',
        created_at_lte: '',
        created_at_gte: '',
    });

    readonly complaintsResource = resource({
        loader: async () => {
            const filter = this.filters();
            return await firstValueFrom(this.api.findAll(filter));
        }
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
}
