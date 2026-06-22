import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { map } from 'rxjs/operators';
import { PriorityAssessment } from '../models/ai-analysis.model';

@Service()
export class PrioritizationApiClient {
  private readonly api = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll() {
    return this.api
      .get<{ data: PriorityAssessment[] }>(`${this.config.backendUrl}/prioritization/assessments/list/`)
      .pipe(map((response) => response.data));
  }

  findByComplaintId(complaintId: number) {
    return this.api
      .get<{ data: PriorityAssessment }>(`${this.config.backendUrl}/prioritization/assessments/${complaintId}/`)
      .pipe(map((response) => response.data));
  }

  createAssessment(complaintId: number) {
    return this.api.post(`${this.config.backendUrl}/prioritization/assessments/`, { complaint_id: complaintId });
  }

  createReviewDecision(reviewDecision: Record<string, unknown>) {
    return this.api.post(`${this.config.backendUrl}/prioritization/reviews/`, reviewDecision);
  }
}
