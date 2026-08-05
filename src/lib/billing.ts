import type { LedgerEntry, PaymentMethod } from '@/api/billing';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';

/**
 * Money arrives as a decimal string and must not be parsed as a float. Balances read
 * as whole amounts in the design (`999 €`), so the empty cents are dropped.
 */
export function formatBalance(amount: string): string {
  return `${amount.endsWith('.00') ? amount.slice(0, -3) : amount} €`;
}

/** Ledger amounts keep their cents and their sign (`€ -999.00`). */
export function formatLedgerAmount(amount: string): string {
  return `€ ${amount}`;
}

/** `'SERVER_CHARGE'` → `'Server charge'`; the ledger type is the only label the API gives. */
export function formatLedgerType(type: string): string {
  const words = type.toLowerCase().replace(/_/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** `03.02.2026 00:30:55`, in the reader's own timezone. */
export function formatLedgerTime(createdAt: string): string {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

/** Ledger entries in the shape the shared history table renders. */
export function toHistoryEntry(entry: LedgerEntry): HistoryEntry {
  return {
    id: entry.id,
    action: formatLedgerType(entry.type),
    time: formatLedgerTime(entry.createdAt),
    amount: formatLedgerAmount(entry.amount),
  };
}

/** `Visa •••• 4242`, degrading gracefully while the provider has yet to report either. */
export function formatPaymentMethod(method: PaymentMethod): string {
  const brand = method.brand ?? 'Card';
  return method.last4 ? `${brand} •••• ${method.last4}` : brand;
}

/** `'12/28'` from the expiry the provider reports, or an empty string when it has none. */
export function formatExpiry(method: PaymentMethod): string {
  if (!method.expirationMonth || !method.expirationYear) return '';
  return `${String(method.expirationMonth).padStart(2, '0')}/${String(method.expirationYear).slice(-2)}`;
}

/**
 * Splits the `MM/YY` the card form collects into the numbers the API expects. Returns
 * `null` for anything that isn't a complete month/year pair, so the caller can leave
 * the fields off the request rather than sending a half-parsed date.
 */
export function parseExpiry(value: string): { month: number; year: number } | null {
  const match = /^(\d{2})\s*\/?\s*(\d{2}|\d{4})$/.exec(value.trim());
  if (!match) return null;

  const month = Number(match[1]);
  if (month < 1 || month > 12) return null;

  const year = Number(match[2]);
  return { month, year: year < 100 ? 2000 + year : year };
}
