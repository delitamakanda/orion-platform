import { Complaint } from './complaint.model';

export interface ComplaintPage {
  results: Complaint[];
  count: number;
}

export interface ComplaintPagination {
  page: number;
  page_size: number;
}

export const PAGE_SIZE_OPTIONS = [10, 25, 50];
export const DEFAULT_PAGINATION: ComplaintPagination = { page: 1, page_size: 25 };

/** Parses raw query params, falling back to defaults on invalid values. */
export function parsePagination(page: string | null, pageSize: string | null): ComplaintPagination {
  const parsedPage = Number(page);
  const parsedSize = Number(pageSize);
  return {
    page: Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : DEFAULT_PAGINATION.page,
    page_size: PAGE_SIZE_OPTIONS.includes(parsedSize) ? parsedSize : DEFAULT_PAGINATION.page_size,
  };
}
