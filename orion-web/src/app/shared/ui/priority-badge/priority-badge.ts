import { TitleCasePipe } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PriorityLevel } from '@app/features/prioritization/models/priority-level.model';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'app-priority-badge',
  imports: [MatChipsModule, TitleCasePipe, MatTreeModule],
  templateUrl: './priority-badge.html',
  styleUrls: ['./priority-badge.css'],
})
export class PriorityBadge {
  priority = input<PriorityLevel>();

  readonly badgeColor = computed(() => {
    switch (this.priority()) {
      case 'low':
        return 'primary';
      case 'medium':
        return 'accent';
      case 'high':
        return 'warn';
      default:
        return 'danger';
    }
  });

  readonly badgeText = computed(() => {
    switch (this.priority()) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Élevée';
      default:
        return 'Critique';
    }
  });
}
