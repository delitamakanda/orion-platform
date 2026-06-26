import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { PrioritizationStore } from '../../data-access/prioritization.store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { MatBadgeModule } from '@angular/material/badge';
import { PriorityAssessment } from '../../models/ai-analysis.model';
import { ComplaintStatus } from '@app/features/complaints/components/complaint-status/complaint-status';
import { PriorityBadge } from '@app/shared/ui/components.module';
import { PriorityScoreCard } from '../../components/priority-score-card/priority-score-card';
import { PrioritizationFilter } from '../../components/prioritization-filter/prioritization-filter';
import { AssessmentFilter } from '../../models/assessment-filter.model';

@Component({
  selector: 'app-prioritization-page',
  imports: [
    ScrollingModule,
    DatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterLink,
    MatBadgeModule,
    A11yModule,
    ComplaintStatus,
    PriorityBadge,
    PriorityScoreCard,
    PrioritizationFilter,
  ],
  templateUrl: './prioritization-page.html',
  styleUrls: ['./prioritization-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrioritizationPage {
  readonly store = inject(PrioritizationStore);

  displayedColumns = [
    'complaint_reference',
    'complaint_location',
    'complaint_status',
    'complaint_declared_urgency',
    'complaint_incident_date',
    'level',
    'score',
  ];

  dataSource = new MatTableDataSource<PriorityAssessment>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.assessments();
    });
  }

  setFilter(filter: Partial<AssessmentFilter>) {
    this.store.setFilter(filter);
  }
}
