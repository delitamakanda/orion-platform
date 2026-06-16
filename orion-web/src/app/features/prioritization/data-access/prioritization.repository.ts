import { inject, resource, Service, signal } from '@angular/core';
import { PrioritizationApiClient } from './prioritization-api.client';
import { firstValueFrom } from 'rxjs';
import { ComplaintStore } from '@app/features/complaints/data-access/complaint.store';

@Service()
export class PrioritizationRepository {
  private readonly api = inject(PrioritizationApiClient);
  private readonly store = inject(ComplaintStore);

  readonly assessmentCreated = signal<Record<string, unknown> | null>(null);

  readonly assessmentByComplaintId = resource({
    params: () => ({
      complaintId: this.store.selectedComplaintId(),
    }),
    loader: ({ params }) => firstValueFrom(this.api.findByComplaintId(params.complaintId)),
  });

  readonly assessments = resource({
    loader: () => firstValueFrom(this.api.findAll()),
  });

  readonly createAssessment = resource({
    params: () => ({
      assessment: this.assessmentCreated(),
    }), // todo: remove this when we have a proper assessment model
    loader: ({ params }: { params: { assessment: Record<string, unknown> | null } }) =>
      firstValueFrom(this.api.createAssessment(params.assessment!)),
  });

  readonly reviewDecisionCreated = signal<Record<string, unknown> | null>(null);

  readonly createReviewDecision = resource({
    params: () => ({
      reviewDecision: this.reviewDecisionCreated(),
    }), // todo: remove this when we have a proper review decision model
    loader: ({ params }: { params: { reviewDecision: Record<string, unknown> | null } }) =>
      firstValueFrom(this.api.createReviewDecision(params.reviewDecision!)),
  });
}
