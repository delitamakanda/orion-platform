import { Component, input, computed } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-complaint-status',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './complaint-status.html',
  styleUrl: './complaint-status.css',
})
export class ComplaintStatus {
  readonly status = input.required<string>();

  readonly iconStatus = computed(() => {
    switch (this.status()) {
      case 'imported':
        return 'cloud_download';
      case 'analyzed':
        return 'analytics';
      case 'reviewed':
        return 'check_circle';
      case 'closed':
        return 'done_all';
      default:
        return 'help_outline';
    }
  });

  readonly colorStatus = computed(() => {
    switch (this.status()) {
      case 'imported':
        return 'primary';
      case 'analyzed':
        return 'accent';
      case 'reviewed':
        return 'warn';
      case 'closed':
        return 'accent';
      default:
        return '';
    }
  });
}
