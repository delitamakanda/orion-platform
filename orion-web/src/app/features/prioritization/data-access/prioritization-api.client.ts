import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';

@Service()
export class PrioritizationApiClient {
  private readonly api = inject(HttpClient);
  private readonly config = inject(API_CONFIG_TOKEN);

  findAll() {
    return this.api.get(`${this.config.backendUrl}/prioritization/assessments/list/`);
  }

  findByComplaintId(complaintId: string) {
    return this.api.get(`${this.config.backendUrl}/prioritization/assessments/${complaintId}/`);
  }

  createAssessment(complaintId: number) {
    return this.api.post(`${this.config.backendUrl}/prioritization/assessments/`, { complaint_id: complaintId });
  }

  createReviewDecision(reviewDecision: Record<string, unknown>) {
    return this.api.post(`${this.config.backendUrl}/prioritization/reviews/`, reviewDecision);
  }
}
