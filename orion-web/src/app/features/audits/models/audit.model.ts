export type AuditAction = 'complaint_imported' | 'complaint_viewed' | 'priority_assessed' | 'priority_confirmed' | 'priority_overridden' | 'sync_started' | 'sync_failed' | 'user_logged_in' | 'user_logged_out';

export interface Audit {
    id: string;
    action: AuditAction;
    target_id: string;
    target_type: string;
    metadata: Record<string, unknown>;
    timestamp: string;
    ip_address: string;
    user_agent: string;
}