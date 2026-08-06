import type { LedgerEntry, PaymentMethod } from '@/api/billing';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';

export function formatBalance(amount: string): string {
  return `${amount.endsWith('.00') ? amount.slice(0, -3) : amount} €`;
}

export function formatLedgerAmount(amount: string): string {
  return `€ ${amount}`;
}

export function formatLedgerType(type: string): string {
  const words = type.toLowerCase().replace(/_/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function formatLedgerTime(createdAt: string): string {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

export function toHistoryEntry(entry: LedgerEntry): HistoryEntry {
  return {
    id: entry.id,
    action: formatLedgerType(entry.type),
    time: formatLedgerTime(entry.createdAt),
    amount: formatLedgerAmount(entry.amount),
  };
}

export function formatPaymentMethod(method: PaymentMethod): string {
  const brand = method.brand ?? 'Card';
  return method.last4 ? `${brand} •••• ${method.last4}` : brand;
}

export function formatExpiry(method: PaymentMethod): string {
  if (!method.expirationMonth || !method.expirationYear) return '';
  return `${String(method.expirationMonth).padStart(2, '0')}/${String(method.expirationYear).slice(-2)}`;
}

export function parseExpiry(value: string): { month: number; year: number } | null {
  const match = /^(\d{2})\s*\/?\s*(\d{2}|\d{4})$/.exec(value.trim());
  if (!match) return null;

  const month = Number(match[1]);
  if (month < 1 || month > 12) return null;

  const year = Number(match[2]);
  return { month, year: year < 100 ? 2000 + year : year };
}
