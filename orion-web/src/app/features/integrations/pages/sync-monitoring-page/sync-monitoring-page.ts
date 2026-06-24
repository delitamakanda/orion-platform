import { Component, effect, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SyncStore } from '../../data-access/sync.store';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { MatTableDataSource } from '@angular/material/table';
import { SyncJob } from '../../models/sync-job.model';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sync-monitoring-page',
  imports: [MATERIAL_IMPORTS, DatePipe],
  providers: [SyncStore],
  templateUrl: './sync-monitoring-page.html',
  styleUrls: ['./sync-monitoring-page.css'],
})
export class SyncMonitoringPage implements OnInit, OnDestroy {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  readonly store = inject(SyncStore);
  readonly displayedColumns: string[] = [
    'id',
    'source_system',
    'status',
    'imported_count',
    'updated_count',
    'skipped_count',
    'started_at',
    'completed_at',
  ];
  dataSource = new MatTableDataSource<SyncJob>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    effect(() => {
      const syncJobs = this.store.syncJobs();

      this.timeoutId = setTimeout(() => {
        this.dataSource.data = syncJobs;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }, 0);
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
