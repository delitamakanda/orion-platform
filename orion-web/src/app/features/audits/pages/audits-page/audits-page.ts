import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { AuditStore } from '../../data-access/audit.store';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { A11yModule } from '@angular/cdk/a11y';
import { Audit } from '../../models/audit.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-audits-page',
  templateUrl: './audits-page.html',
  imports: [
    ScrollingModule,
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    A11yModule,
    MatTooltipModule,
  ],
  styleUrls: ['./audits-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditsPage {
  readonly store = inject(AuditStore);

  displayedColumns: string[] = ['id', 'user_username', 'ip_address', 'action', 'timestamp', 'action_details'];

  dataSource = new MatTableDataSource<Audit>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.audits();
    });
  }
}
