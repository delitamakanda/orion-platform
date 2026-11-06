import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryBadge } from '@app/shared/ui/components.module';
import { ComplaintStore } from '../../data-access/complaint.store';
import { ComplaintFilters } from '../../components/complaint-filters/complaint-filters';
import { ComplaintStatus } from '../../components/complaint-status/complaint-status';
import { frenchPaginatorIntl } from '../../components/complaint-paginator-intl';
import { ComplaintFilter } from '../../models/complaint-filters.model';
import { PAGE_SIZE_OPTIONS, parsePagination } from '../../models/complaint-page.model';

@Component({
  selector: 'app-complaint-list-page',
  imports: [
    ComplaintFilters,
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    A11yModule,
    RouterLink,
    CategoryBadge,
    ComplaintStatus,
  ],
  providers: [{ provide: MatPaginatorIntl, useFactory: frenchPaginatorIntl }],
  templateUrl: './complaint-list-page.html',
  styleUrls: ['./complaint-list-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintListPage {
  readonly store = inject(ComplaintStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly queryParams = toSignal(this.route.queryParamMap, { requireSync: true });

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  readonly displayedColumns: string[] = [
    'id',
    'reference',
    'title',
    'status',
    'category',
    'location',
    'incident_date',
    'vulnerability_victim',
  ];

  /** Zero-based page index expected by mat-paginator. */
  readonly pageIndex = computed(() => this.store.page() - 1);
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.store.total() / this.store.pageSize())));
  readonly pageAnnouncement = computed(() => `Page ${this.store.page()} sur ${this.pageCount()}`);

  constructor() {
    // The URL is the source of truth: query params (or defaults) feed the store.
    effect(() => {
      const params = this.queryParams();
      this.store.setPagination(parsePagination(params.get('page'), params.get('page_size')));
    });
  }

  updateFilters(filter: Partial<ComplaintFilter>): void {
    this.store.updateFilters(filter);
    this.navigate(1, this.store.pageSize());
  }

  onPage(event: PageEvent): void {
    const pageSizeChanged = event.pageSize !== this.store.pageSize();
    this.navigate(pageSizeChanged ? 1 : event.pageIndex + 1, event.pageSize);
  }

  openComplaint(event: Event): void {
    // Keyboard activation of a focusable row (Enter / Space) follows its link.
    (event.currentTarget as HTMLElement).click();
  }

  private navigate(page: number, pageSize: number): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page, page_size: pageSize },
      queryParamsHandling: 'merge',
    });
  }
}
