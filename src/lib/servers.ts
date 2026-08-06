import type { ServerStatus } from '@/api/servers';

export function isServerActive(status: ServerStatus): boolean {
  return status === 'active';
}

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

export function formatServerDate(iso: string | null): string {
  if (!iso) return '—';

  const { day, month, year, hours, minutes } = parts(iso);
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

export function formatServerTimestamp(iso: string): string {
  const { day, month, year, hours, minutes, seconds } = parts(iso);
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
