import { inject, Service, signal } from '@angular/core';
import { PrioritizationApiClient } from './prioritization-api.client';
import { rxResource } from '@angular/core/rxjs-interop';
import { PriorityAssessment } from '../models/ai-analysis.model';
import { AssessmentFilter } from '../models/assessment-filter.model';

@Service()
export class PrioritizationRepository {
  private readonly api = inject(PrioritizationApiClient);

  readonly assessmentCreated = signal<Record<string, unknown> | null>(null);

  readonly filters = signal<Partial<AssessmentFilter>>({
    status: '',
    urgency: '',
    level: '',
    location: '',
  });

  readonly assessmentsResource = rxResource<PriorityAssessment[], Partial<AssessmentFilter>>({
    params: () => this.filters(),
    stream: ({ params: filter }) => this.api.findAll(filter),
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
