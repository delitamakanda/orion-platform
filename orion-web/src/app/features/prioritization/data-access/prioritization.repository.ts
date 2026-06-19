import { inject, resource, Service, signal } from '@angular/core';
import { PrioritizationApiClient } from './prioritization-api.client';
import { firstValueFrom } from 'rxjs';
import { ComplaintStore } from '@app/features/complaints/data-access/complaint.store';

@Service()
export class PrioritizationRepository {
  private readonly api = inject(PrioritizationApiClient);
  private readonly store = inject(ComplaintStore);

  readonly assessmentCreated = signal<Record<string, unknown> | null>(null);

  readonly assessments = resource({
    loader: () => firstValueFrom(this.api.findAll()),
  });

  assessmentByComplaintId(complaintId: string) {
    return this.api.findByComplaintId(complaintId);
  }

  createAssessment(complaintId: number) {
    return this.api.createAssessment(complaintId);
  }

  createReviewDecision(reviewDecision: Record<string, unknown>) {
    return this.api.createReviewDecision(reviewDecision);
  }
}
