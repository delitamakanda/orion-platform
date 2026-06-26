import { Component, input, computed } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-priority-score-card',
  imports: [MatChipsModule, MatIconModule, MatTooltipModule],
  templateUrl: './priority-score-card.html',
  styleUrl: './priority-score-card.css',
})
export class PriorityScoreCard {
  readonly score = input.required<number>();

  readonly scoreColor = computed(() => {
    if (this.score() >= 80) {
      return 'primary';
    } else if (this.score() >= 50) {
      return 'accent';
    } else {
      return 'warn';
    }
  });
}
