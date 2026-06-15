
export function isExpired(createdAt: string, ttl: number): boolean {
  const expiry = new Date(createdAt);
  expiry.setMinutes(expiry.getMinutes() + ttl);
  return Date.now() > expiry.getTime();
}


export function formatDateForFilter(date: Date | string | null): string {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
}