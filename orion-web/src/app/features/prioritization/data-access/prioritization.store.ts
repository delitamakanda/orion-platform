import { computed, inject, Service, signal } from '@angular/core';
import { PrioritizationRepository } from './prioritization.repository';
import { ComplaintStore } from '@app/features/complaints/data-access/complaint.store';
import { PriorityAssessment } from '../models/ai-analysis.model';

@Service()
export class PrioritizationStore {
  private readonly repository = inject(PrioritizationRepository);
  private readonly store = inject(ComplaintStore);

  readonly selectedComplaintId = computed(() => this.store.selectedComplaint()?.id);

  readonly assessments = computed(() => this.repository.assessments.value());

  readonly _selectedAssessment = signal<PriorityAssessment | null>(null);

  readonly selectedAssessment = this._selectedAssessment.asReadonly();

  selectAssessment(assessment: PriorityAssessment) {
    this._selectedAssessment.set(assessment);
  }

  createAssessment(complaintId: number) {
    return this.repository.createAssessment(complaintId);
  }

  // todo: remove this when we have a proper review decision model
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReviewDecision(reviewDecision: Record<string, any>) {
    return this.repository.createReviewDecision(reviewDecision);
  }

  assessmentByComplaintId(complaintId: number) {
    return this.repository.assessmentByComplaintId(complaintId);
  }
}
