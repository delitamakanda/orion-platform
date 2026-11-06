import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ComplaintListPage } from './complaint-list-page';
import { ComplaintStore } from '../../data-access/complaint.store';
import { ComplaintPagination } from '../../models/complaint-page.model';
import { parsePagination } from '../../models/complaint-page.model';

describe('ComplaintListPage', () => {
  const pagination = signal<ComplaintPagination>({ page: 1, page_size: 25 });
  const total = signal(60);
  const complaints = signal<unknown[]>([]);
  const error = signal<unknown>(null);
  const queryParamMap$ = new BehaviorSubject(convertToParamMap({}));

  const storeMock = {
    total,
    complaints,
    error,
    isLoading: signal(false),
    page: () => pagination().page,
    pageSize: () => pagination().page_size,
    setPagination: (value: ComplaintPagination) => pagination.set(value),
    updateFilters: vi.fn(),
    selectComplaint: vi.fn(),
  };

  function create() {
    const fixture = TestBed.createComponent(ComplaintListPage);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() => {
    pagination.set({ page: 1, page_size: 25 });
    total.set(60);
    complaints.set([]);
    error.set(null);
    queryParamMap$.next(convertToParamMap({}));
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideNativeDateAdapter(),
        { provide: ComplaintStore, useValue: storeMock },
        { provide: ActivatedRoute, useValue: { queryParamMap: queryParamMap$ } },
      ],
    });
  });

  it('renders the paginator with the total as length', () => {
    const paginator = create().debugElement.query(By.directive(MatPaginator)).componentInstance as MatPaginator;
    expect(paginator.length).toBe(60);
    expect(paginator.pageSize).toBe(25);
    expect(paginator.pageIndex).toBe(0);
  });

  it('hides the paginator and shows the empty message when there is no complaint', () => {
    total.set(0);
    const fixture = create();
    expect(fixture.debugElement.query(By.directive(MatPaginator))).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Aucune plainte trouvée.');
  });

  it('shows an alert on error', () => {
    error.set('boom');
    total.set(0);
    expect(create().nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('initializes the store from the query params', () => {
    queryParamMap$.next(convertToParamMap({ page: '2', page_size: '10' }));
    create();
    expect(pagination()).toEqual({ page: 2, page_size: 10 });
  });

  it('falls back to defaults on invalid query params', () => {
    expect(parsePagination('abc', '7')).toEqual({ page: 1, page_size: 25 });
    expect(parsePagination('0', null)).toEqual({ page: 1, page_size: 25 });
  });

  it('writes the page change to the URL', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = create();
    fixture.componentInstance.onPage({ pageIndex: 2, pageSize: 25, length: 60, previousPageIndex: 1 });
    expect(navigate.mock.calls[0][1]?.queryParams).toEqual({ page: 3, page_size: 25 });
  });

  it('goes back to page 1 when the page size changes', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = create();
    fixture.componentInstance.onPage({ pageIndex: 2, pageSize: 50, length: 60, previousPageIndex: 1 });
    expect(navigate.mock.calls[0][1]?.queryParams).toEqual({ page: 1, page_size: 50 });
  });
});
