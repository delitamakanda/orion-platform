export interface Log {
  id: number;
  user_id: number;
  action: 'CREATE_EXPORT' | 'UPDATE_EXPORT' | 'DELETE_EXPORT';
  entity_id: number;
  timestamp: string;
}
