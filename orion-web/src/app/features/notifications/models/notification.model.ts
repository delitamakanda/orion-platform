export type NOTIFICATION_TYPE = 'critical_complaint' | 'priority_review_required' | 'sync_completed' | 'sync_failed';

export interface Notification {
    id: string;
    title: string;
    type: NOTIFICATION_TYPE;
    message: string;
    priority: 'normal' | 'high' | 'critical';
    related_object_id: string;
    related_object_type: string;
    read_at: string;
    is_read: boolean;
    created_at: string;
}