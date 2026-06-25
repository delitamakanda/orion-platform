export interface ComplaintTimelineEvent {
  type: 'imported' | 'assessed' | 'review_required' | 'reviewed' | 'overriden' | 'notified' | 'updated' | 'synced';
  id: string;
  title: string;
  description: string;
  timestamp: string;
  author?: string;
  metadata?: Record<string, unknown>;
}
