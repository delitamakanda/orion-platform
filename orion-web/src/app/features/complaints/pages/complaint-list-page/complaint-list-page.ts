import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComplaintStore } from '../../data-access/complaint.store';
import { ComplaintFilters } from '../../components/complaint-filters/complaint-filters';
import { ComplaintFilter } from '../../models/complaint-filters.model';
import { Complaint } from '../../models/complaint.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaint-list-page',
  imports: [
    ComplaintFilters,
    ScrollingModule,
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    A11yModule,
    RouterLink,
  ],
  templateUrl: './complaint-list-page.html',
  styleUrls: ['./complaint-list-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintListPage {
  readonly store = inject(ComplaintStore);

  displayedColumns: string[] = [
    'id',
    'reference',
    'title',
    'status',
    'category',
    'location',
    'incident_date',
    'vulnerability_victim',
  ];
  dataSource = new MatTableDataSource<Complaint>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.complaints();
    });
  }

  updateFilters(filter: Partial<ComplaintFilter>): void {
    this.store.updateFilters(filter);
  }
}
