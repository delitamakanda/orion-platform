import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { map } from 'rxjs';
import { Complaint } from '../models/complaint.model';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';

@Service()
export class ComplaintApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll(filter?: ComplaintFilter) {
    const params = { ...filter };
    return this.http
      .get<{ data: { results: Complaint[] } }>(`${this.config.backendUrl}/complaints/`, { params })
      .pipe(map((response) => response.data.results || []));
  }

  findOne(id: number) {
    return this.http
      .get<{ data: Complaint }>(`${this.config.backendUrl}/complaints/${id}/`)
      .pipe(map((complaint) => complaint['data'] || complaint));
  }
}
