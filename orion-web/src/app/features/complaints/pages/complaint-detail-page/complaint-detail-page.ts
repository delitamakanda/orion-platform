import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintStore } from '../../data-access/complaint.store';
import { map } from 'rxjs';
import { PrioritizationStore } from '@app/features/prioritization/data-access/prioritization.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { ComplaintCard } from '../../components/complaint-card/complaint-card';
import { ComplaintTimeline } from '../../components/complaint-timeline/complaint-timeline';
import { ComplaintTimelineEvent } from '../../components/complaint-timeline/complaint-timeline-event.model';
import { MatButtonModule } from '@angular/material/button';
import { RbacService } from '@app/core/services/rbac.service';

@Component({
  selector: 'app-complaint-detail-page',
  imports: [ComplaintCard, ComplaintTimeline, MatButtonModule],
  templateUrl: './complaint-detail-page.html',
  styleUrls: ['./complaint-detail-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(SnackbarService);
  readonly store = inject(ComplaintStore);
  readonly storePrioritization = inject(PrioritizationStore);
  readonly roleService = inject(RbacService);

  readonly timelineEvents = computed<ComplaintTimelineEvent[]>(() => {
    const assessment = this.storePrioritization.selectedAssessment();
    if (!assessment) return [];
    return [
      {
        id: assessment.id,
        type: 'assessed',
        title: 'AI Analysis completed',
        description: assessment.summary,
        timestamp: this.store.selectedComplaint()?.updated_at ?? new Date().toISOString(),
        metadata: {
          level: assessment.level,
          score: assessment.score,
          confidence_score: assessment.confidence_score,
          model: assessment.model_name,
        },
      },
    ];
  });

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data['complaintData']),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((complaint) => {
        this.store.selectComplaint(complaint);
      });
  }

  analyzeComplaint(): void {
    const selectedComplaint = this.store.selectedComplaint();
    if (selectedComplaint) {
      this.storePrioritization
        .createAssessment(selectedComplaint.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (assessment) => {
            this.service.showSuccessSnackbar(`Assessment created successfully for ${assessment.complaint.title}`);
          },
          error: (error) => {
            this.service.showErrorSnackbar(`Failed to create assessment: ${error.message}`);
          },
        });
    }
  }
}
