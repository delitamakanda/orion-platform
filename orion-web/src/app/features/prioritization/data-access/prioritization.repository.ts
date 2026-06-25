import { inject, Service, signal } from '@angular/core';
import { PrioritizationApiClient } from './prioritization-api.client';
import { rxResource } from '@angular/core/rxjs-interop';
import { PriorityAssessment } from '../models/ai-analysis.model';

@Service()
export class PrioritizationRepository {
  private readonly api = inject(PrioritizationApiClient);

  readonly assessmentCreated = signal<Record<string, unknown> | null>(null);

  readonly assessmentsResource = rxResource<PriorityAssessment[], void>({
    stream: () => this.api.findAll(),
  });

  get assessments() {
    return this.assessmentsResource.value() ?? [];
  }

  get loading() {
    return this.assessmentsResource.isLoading();
  }

  get error() {
    return this.assessmentsResource.error();
  }

  assessmentByComplaintId(complaintId: number) {
    return this.api.findByComplaintId(complaintId);
  }

  createAssessment(complaintId: number) {
    return this.api.createAssessment(complaintId);
  }

  createReviewDecision(reviewDecision: Record<string, unknown>) {
    return this.api.createReviewDecision(reviewDecision);
  }
}
