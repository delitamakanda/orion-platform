export interface Export {
  id: number;
  client_id: number;
  period_start: string;
  period_end: string;
  status: 'SUCCESS' | 'FAILURE';
  created_at: string;
  created_by: string;
  total: number;
}
