import { useQuery } from '@tanstack/react-query';

import { apiClient, unwrap } from '@/api/client';
import { pricingKeys } from '@/api/pricing/keys';
import type {
  PricingAddon,
  PricingBillingPeriod,
  PricingCatalogResponse,
  PricingTariff,
  QuoteItem,
  QuoteResponse,
} from '@/api/pricing/types';

/** Prices move on a provider sync, not per session. */
const PRICING_STALE_TIME = 60 * 60 * 1000;

/**
 * GET /api/public/pricing/catalog — every plan, add-on and billing period in one call,
 * plus the VAT rate and when the provider was last synced. Unauthenticated.
 */
export function usePricingCatalog() {
  return useQuery({
    queryKey: pricingKeys.catalog(),
    queryFn: async (): Promise<PricingCatalogResponse> =>
      unwrap(await apiClient.GET('/api/public/pricing/catalog')),
    staleTime: PRICING_STALE_TIME,
  });
}

/**
 * The catalog split into the pieces the builders render. Tariffs are narrowed to
 * `publicVisible` and add-ons to `active`; everything else is passed through.
 */
export function usePricing() {
  const { data, isPending, isError } = usePricingCatalog();
  const catalog = data?.catalog;

  return {
    tariffs: catalog?.tariffs.filter((tariff) => tariff.publicVisible) ?? EMPTY_TARIFFS,
    addons: catalog?.addons.filter((addon) => addon.active) ?? EMPTY_ADDONS,
    billingPeriods: catalog?.billingPeriods ?? EMPTY_PERIODS,
    vat: catalog?.vat ?? null,
    syncedAt: catalog?.syncedAt ?? null,
    isPending,
    isError,
  };
}

/**
 * POST /api/public/pricing/quote — the authoritative total for a basket.
 *
 * Modelled as a query, not a mutation: the call has no side effect the UI cares about,
 * it is a pure function of `items`, and the cost panels need it to re-run whenever a
 * selection changes. Caching by items also stops repeated clicks re-quoting the same
 * basket. Skipped until every item is fully specified, since the API rejects partials.
 */
export function useQuote(items: QuoteItem[]) {
  const complete =
    items.length > 0 &&
    items.every(
      (item) => item.operatingSystemId && item.regionId && item.planId && item.quantity > 0
    );

  return useQuery({
    queryKey: pricingKeys.quote(items),
    queryFn: async (): Promise<QuoteResponse> =>
      unwrap(await apiClient.POST('/api/public/pricing/quote', { body: { items } })),
    enabled: complete,
    // Quotes carry an `expiresAt`; re-quote rather than show a stale total indefinitely.
    staleTime: 5 * 60 * 1000,
  });
}

/** Convenience wrapper for the cost panels, which only need the amounts. */
export function useQuoteTotals(items: QuoteItem[]) {
  const { data, isPending, isError } = useQuote(items);
  const quote = data?.quote;

  return {
    /** `POST /api/servers` takes this id, not the basket — provisioning re-prices from it. */
    quoteId: quote?.id ?? null,
    subtotal: quote?.subtotal ?? null,
    vatAmount: quote?.vatAmount ?? null,
    total: quote?.total ?? null,
    lineItems: quote?.lineItems ?? EMPTY_LINE_ITEMS,
    isPending,
    isError,
  };
}

/** Stable identities so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_TARIFFS: PricingTariff[] = [];
const EMPTY_ADDONS: PricingAddon[] = [];
const EMPTY_PERIODS: PricingBillingPeriod[] = [];
const EMPTY_LINE_ITEMS: QuoteResponse['quote']['lineItems'] = [];
