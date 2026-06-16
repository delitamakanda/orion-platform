import { computed, inject, Service } from '@angular/core';
import { PrioritizationRepository } from './prioritization.repository';
import { ComplaintStore } from '@app/features/complaints/data-access/complaint.store';

@Service()
export class PrioritizationStore {
  private readonly repository = inject(PrioritizationRepository);
  private readonly store = inject(ComplaintStore);

  readonly selectedComplaintId = computed(() => this.store.selectedComplaintId());

  readonly assessmentByComplaintId = computed(() => this.repository.assessmentByComplaintId.value());

  readonly assessments = computed(() => this.repository.assessments.value());

  // todo: remove this when we have a proper assessment model
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createAssessment(assessment: Record<string, any>) {
    return this.repository.assessmentCreated.set(assessment);
  }

  // todo: remove this when we have a proper review decision model
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReviewDecision(reviewDecision: Record<string, any>) {
    return this.repository.reviewDecisionCreated.set(reviewDecision);
  }
}
