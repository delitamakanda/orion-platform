import { inject, resource, Service, signal } from '@angular/core';
import { PrioritizationApiClient } from './prioritization-api.client';
import { firstValueFrom } from 'rxjs';
import { ComplaintStore } from '@app/features/complaints/data-access/complaint.store';

@Service()
export class PrioritizationRepository {
    private readonly api = inject(PrioritizationApiClient);
    private readonly store = inject(ComplaintStore);

    readonly assessmentCreated = signal<Record<string, any> | null>(null);

    readonly assessmentByComplaintId = resource({
        params: () => ({
            complaintId: this.store.selectedComplaintId(),
        }),
        loader: ({ params }) => firstValueFrom(this.api.findByComplaintId(params.complaintId)),
    })

    readonly assessments = resource({
        loader: () => firstValueFrom(this.api.findAll()),
    })

    readonly createAssessment = resource({
        params: () => ({
            assessment: this.assessmentCreated(),
        }),
        loader: ({ params }) => firstValueFrom(this.api.createAssessment(params.assessment)),
    })

    readonly reviewDecisionCreated = signal<Record<string, any> | null>(null);

    readonly createReviewDecision = resource({
        params: () => ({
            reviewDecision: this.reviewDecisionCreated(),
        }),
        loader: ({ params }) => firstValueFrom(this.api.createReviewDecision(params.reviewDecision)),
    });



}
