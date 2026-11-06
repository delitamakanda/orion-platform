import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ComplaintStore } from './complaint.store';
import { ComplaintRepository } from './complaint.repository';
import { ComplaintFilter } from '../models/complaint-filters.model';
import { ComplaintPagination } from '../models/complaint-page.model';

describe('ComplaintStore pagination', () => {
  let store: ComplaintStore;
  let pagination: ReturnType<typeof signal<ComplaintPagination>>;

  beforeEach(() => {
    pagination = signal<ComplaintPagination>({ page: 1, page_size: 25 });
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ComplaintRepository,
          useValue: {
            filters: signal<ComplaintFilter>({}),
            pagination,
            complaints: [],
            total: 60,
            isLoading: false,
            error: null,
          },
        },
      ],
    });
    store = TestBed.inject(ComplaintStore);
  });

  it('exposes total, page and pageSize', () => {
    expect(store.total()).toBe(60);
    expect(store.page()).toBe(1);
    expect(store.pageSize()).toBe(25);
  });

  it('setPage changes the page only', () => {
    store.setPage(3);
    expect(pagination()).toEqual({ page: 3, page_size: 25 });
  });

  it('setPageSize goes back to page 1', () => {
    store.setPage(3);
    store.setPageSize(50);
    expect(pagination()).toEqual({ page: 1, page_size: 50 });
  });

  it('updateFilters resets the page to 1', () => {
    store.setPage(3);
    store.updateFilters({ reference: 'X' });
    expect(store.page()).toBe(1);
  });
});
