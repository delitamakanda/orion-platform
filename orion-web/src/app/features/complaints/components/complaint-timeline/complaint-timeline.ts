import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { ComplaintTimelineEvent } from './complaint-timeline-event.model';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-complaint-timeline',
  imports: [DatePipe, MatIconModule, MatTooltipModule, MatCardModule],
  templateUrl: './complaint-timeline.html',
  styleUrls: ['./complaint-timeline.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintTimeline {
  readonly events = input.required<ComplaintTimelineEvent[]>();

  readonly typeToIconMap = computed(() => {
    return {
      imported: 'cloud_download',
      assessed: 'assessment',
      review_required: 'report_problem',
      reviewed: 'check_circle',
      overriden: 'edit',
      notified: 'notifications',
      updated: 'update',
      synced: 'sync',
    };
  });

  readonly typeToColorMap = computed(() => {
    return {
      imported: 'primary',
      assessed: 'accent',
      review_required: 'warn',
      reviewed: 'primary',
      overriden: 'accent',
      notified: 'primary',
      updated: 'accent',
      synced: 'primary',
    };
  });
}
