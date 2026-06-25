import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Complaint } from '../../models/complaint.model';
import { DatePipe } from '@angular/common';
import { ComplaintStore } from '../../data-access/complaint.store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ComplaintStatus } from '../complaint-status/complaint-status';
import { CategoryBadge } from '@app/shared/ui/category-badge/category-badge';

@Component({
  selector: 'app-complaint-card',
  imports: [MatCardModule, CategoryBadge, ComplaintStatus, MatIconModule, MatListModule, MatButtonModule, DatePipe],
  templateUrl: './complaint-card.html',
  styleUrls: ['./complaint-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintCard {
  readonly complaint = input.required<Complaint>();
  readonly store = inject(ComplaintStore);
}
