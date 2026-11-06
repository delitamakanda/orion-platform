import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { map } from 'rxjs';
import { Complaint } from '../models/complaint.model';
import { ComplaintPage, ComplaintPagination, DEFAULT_PAGINATION } from '../models/complaint-page.model';
import { ComplaintFilter } from '@app/features/complaints/models/complaint-filters.model';
import { SKIP_LOADING_INTERCEPTOR } from '@app/core/api/loading.interceptor';

@Service()
export class ComplaintApiClient {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll(filter?: ComplaintFilter, pagination: ComplaintPagination = DEFAULT_PAGINATION) {
    const params = { ...filter, page: pagination.page, page_size: pagination.page_size };
    return this.http
      .get<{
        data: { results: Complaint[]; count: number; next: string | null; previous: string | null };
      }>(`${this.config.backendUrl}/complaints/`, {
        params,
        context: new HttpContext().set(SKIP_LOADING_INTERCEPTOR, true),
      })
      .pipe(
        map(
          (response): ComplaintPage => ({
            results: response.data.results || [],
            count: response.data.count ?? 0,
          }),
        ),
      );
  }

  findOne(id: number) {
    return this.http
      .get<{
        data: Complaint;
      }>(`${this.config.backendUrl}/complaints/${id}/`, {
        context: new HttpContext().set(SKIP_LOADING_INTERCEPTOR, true),
      })
      .pipe(map((complaint) => complaint['data'] || complaint));
  }
}
