import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrioritizationStore } from '../../data-access/prioritization.store';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';
import { ReviewDecisionForm } from '../../components/review-decision-form/review-decision-form';
import { PriorityFactorList } from '../../components/priority-factor-list/priority-factor-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { AiAssessementPanel } from '../../components/ai-assessement-panel/ai-assessement-panel';

@Component({
  selector: 'app-priority-detail-page',
  imports: [SHARED_UI_COMPONENTS, ReviewDecisionForm, PriorityFactorList, AiAssessementPanel],
  templateUrl: './priority-detail-page.html',
  styleUrls: ['./priority-detail-page.css'],
})
export class PriorityDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly store = inject(PrioritizationStore);

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data['prioritizationData']),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((assessment) => {
        this.store.selectAssessment(assessment);
      });
  }

  handleSubmitDecision(event: {
    assessment: string;
    previous_level: string;
    final_level: string;
    comment: string;
    reviewer: number;
  }) {
    const reviewDecision = {
      assessment: event.assessment,
      previous_level: event.previous_level,
      final_level: event.final_level,
      comment: event.comment,
      reviewer: event.reviewer,
      is_override: event.previous_level !== event.final_level,
    };
    this.store
      .createReviewDecision(reviewDecision)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('Review decision submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting review decision:', error);
        },
      });
  }
}
