import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { PriorityLevel } from '@app/features/prioritization/models/priority-level.model';

@Component({
  selector: 'app-priority-badge',
  imports: [TitleCasePipe],
  templateUrl: './priority-badge.html',
  styleUrls: ['./priority-badge.css'],
})
export class PriorityBadge {
  readonly priority = input<PriorityLevel>();
}
