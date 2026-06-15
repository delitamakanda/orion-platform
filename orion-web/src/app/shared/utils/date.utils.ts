
export function isExpired(createdAt: string, ttl: number): boolean {
  const expiry = new Date(createdAt);
  expiry.setMinutes(expiry.getMinutes() + ttl);
  return Date.now() > expiry.getTime();
}
