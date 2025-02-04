export function tsToLocaleDate(ts: number, withTime: boolean = false): string {
  const data = new Date(ts);
  return withTime ? data.toLocaleString() : data.toLocaleDateString();
}
