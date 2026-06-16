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

    createAssessment(assessment: Record<string, any>) {
        return this.repository.assessmentCreated.set(assessment);
    }

    createReviewDecision(reviewDecision: Record<string, any>) {
        return this.repository.reviewDecisionCreated.set(reviewDecision);
    }
}
