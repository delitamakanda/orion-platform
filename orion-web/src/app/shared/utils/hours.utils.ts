export function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const hoursStr = `${h}h ${m}m`;
  // return in days if hours are 24 or more
  if (h >= 24) {
    const d = Math.floor(h / 24);
    const remainingHours = h % 24;
    return `${d}j ${remainingHours}h ${m}m`;
  }
  return hoursStr;
}
