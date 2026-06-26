import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { map } from 'rxjs/operators';
import { PriorityAssessment } from '../models/ai-analysis.model';
import { ReviewDecision } from '../models/review-decision.model';
import { SKIP_LOADING_INTERCEPTOR } from '@app/core/api/loading.interceptor';

@Service()
export class PrioritizationApiClient {
  private readonly api = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll() {
    return this.api
      .get<{ data: PriorityAssessment[] }>(`${this.config.backendUrl}/prioritization/assessments/list/`)
      .pipe(map((response) => response.data || []));
  }

  findByComplaintId(complaintId: number) {
    return this.api
      .get<{ data: PriorityAssessment }>(`${this.config.backendUrl}/prioritization/assessments/${complaintId}/`)
      .pipe(map(({ data }) => data || null));
  }

  createAssessment(complaintId: number) {
    return this.api
      .post<{
        data: PriorityAssessment;
      }>(
        `${this.config.backendUrl}/prioritization/assessments/`,
        { complaint_id: complaintId },
        {
          context: new HttpContext().set(SKIP_LOADING_INTERCEPTOR, true),
        },
      )
      .pipe(map(({ data }) => data));
  }

  createReviewDecision(reviewDecision: Record<string, unknown>) {
    return this.api
      .post<{ data: ReviewDecision }>(`${this.config.backendUrl}/prioritization/reviews/`, reviewDecision, {
        context: new HttpContext().set(SKIP_LOADING_INTERCEPTOR, true),
      })
      .pipe(map(({ data }) => data));
  }
}
