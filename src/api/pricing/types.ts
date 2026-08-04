import type { components } from '@/types/api';

export type PricingCatalogResponse = components['schemas']['PricingCatalogResponse'];

/** `{ billingPeriods, tariffs, addons, currency, vat, syncedAt }` — the envelope's body. */
export type PricingCatalog = PricingCatalogResponse['catalog'];

/**
 * A plan. `monthlyPrice` is the base; `regionPrices` overrides it per region and does
 * vary, so price a tariff through `tariffMonthlyPrice()` in `@/lib/pricing` rather than
 * reading `monthlyPrice` directly. All money is a decimal string (`'30.00'`), not a
 * number — never parse it for display.
 */
export type PricingTariff = components['schemas']['PricingTariff'];
export type PricingRegionPrice = components['schemas']['PricingRegionPrice'];

/** An optional extra (backups, DDoS, IPv6). The live catalog returns none today. */
export type PricingAddon = components['schemas']['PricingAddon'];

/** `MONTHLY | QUARTERLY | SEMIANNUAL | ANNUAL` — there is no hourly or daily period. */
export type BillingPeriod = components['schemas']['BillingPeriod'];

/** `{ id, label, months }` — the periods the cost toggles render. */
export type PricingBillingPeriod = PricingCatalog['billingPeriods'][number];

export type QuoteItem = components['schemas']['QuoteItemDto'];
export type CreateQuoteDto = components['schemas']['CreateQuoteDto'];
export type QuoteResponse = components['schemas']['QuoteResponse'];

/** `{ subtotal, vatAmount, total, expiresAt, lineItems }` — all amounts decimal strings. */
export type Quote = QuoteResponse['quote'];
export type QuoteLineItem = components['schemas']['QuoteLineItem'];
