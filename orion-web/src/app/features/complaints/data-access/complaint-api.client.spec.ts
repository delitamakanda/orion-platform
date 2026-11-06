import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_CONFIG_TOKEN } from '@app/core/config/injection-token';
import { ComplaintApiClient } from './complaint-api.client';

describe('ComplaintApiClient', () => {
  let client: ComplaintApiClient;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG_TOKEN, useValue: { backendUrl: '/api/v1' } },
      ],
    });
    client = TestBed.inject(ComplaintApiClient);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends page and page_size and maps the response to { results, count }', () => {
    let result: unknown;
    client.findAll({ reference: 'A' }, { page: 2, page_size: 10 }).subscribe((value) => (result = value));

    const req = http.expectOne((r) => r.url === '/api/v1/complaints/');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('page_size')).toBe('10');
    expect(req.request.params.get('reference')).toBe('A');
    req.flush({ data: { count: 42, next: null, previous: null, results: [{ id: 1 }] } });

    expect(result).toEqual({ results: [{ id: 1 }], count: 42 });
  });

  it('uses the default pagination when none is given', () => {
    client.findAll().subscribe();
    const req = http.expectOne((r) => r.url === '/api/v1/complaints/');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('page_size')).toBe('25');
    req.flush({ data: { count: 0, next: null, previous: null, results: [] } });
  });
});
