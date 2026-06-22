import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrioritizationStore } from '../../data-access/prioritization.store';
import { SHARED_UI_COMPONENTS } from '@app/shared/ui/components.module';
import { ReviewDecisionForm } from '../../components/review-decision-form/review-decision-form';
import { PriorityFactorList } from '../../components/priority-factor-list/priority-factor-list';

@Component({
  selector: 'app-priority-detail-page',
  imports: [SHARED_UI_COMPONENTS, ReviewDecisionForm, PriorityFactorList],
  templateUrl: './priority-detail-page.html',
  styleUrls: ['./priority-detail-page.css'],
})
export class PriorityDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(PrioritizationStore);

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const assessment = data['prioritizationData'];
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
    };
    this.store.createReviewDecision(reviewDecision).subscribe({
      next: (response) => {
        console.log('Review decision submitted successfully:', response);
      },
      error: (error) => {
        console.error('Error submitting review decision:', error);
      },
    });
  }
}
