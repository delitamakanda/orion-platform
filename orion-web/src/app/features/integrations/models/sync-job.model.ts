export type SyncJobStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface SyncJob {
  id: string;
  source_system: string;
  status: SyncJobStatus;
  imported_count: number;
  updated_count: number;
  skipped_count: number;
  error_message: string;
  started_at: string;
  completed_at: string;
}