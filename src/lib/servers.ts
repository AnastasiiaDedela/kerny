import type { ServerStatus } from '@/api/servers';

/**
 * The design shows a single green/red dot, but the API has eleven states. Only `active`
 * earns the green dot; everything else — transitional or terminal — reads as not running.
 */
export function isServerActive(status: ServerStatus): boolean {
  return status === 'active';
}

/** `powering_on` → `Powering on`. Keeps the real state visible instead of collapsing it. */
export function serverStatusLabel(status: ServerStatus): string {
  const words = status.replace(/_/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function parts(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');

  return {
    day: pad(date.getDate()),
    month: pad(date.getMonth() + 1),
    year: date.getFullYear(),
    hours: pad(date.getHours()),
    minutes: pad(date.getMinutes()),
    seconds: pad(date.getSeconds()),
  };
}

/** `03.03.2026, 00:07` — the "Valid until" format. */
export function formatServerDate(iso: string | null): string {
  if (!iso) return '—';

  const { day, month, year, hours, minutes } = parts(iso);
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

/** `03.02.2026 00:30:55` — the history table's timestamp format. */
export function formatServerTimestamp(iso: string): string {
  const { day, month, year, hours, minutes, seconds } = parts(iso);
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
