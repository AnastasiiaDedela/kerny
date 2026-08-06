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

const PRICING_STALE_TIME = 60 * 60 * 1000;

export function usePricingCatalog() {
  return useQuery({
    queryKey: pricingKeys.catalog(),
    queryFn: async (): Promise<PricingCatalogResponse> =>
      unwrap(await apiClient.GET('/api/public/pricing/catalog')),
    staleTime: PRICING_STALE_TIME,
  });
}

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
    staleTime: 5 * 60 * 1000,
  });
}

export function useQuoteTotals(items: QuoteItem[]) {
  const { data, isPending, isError } = useQuote(items);
  const quote = data?.quote;

  return {
    quoteId: quote?.id ?? null,
    subtotal: quote?.subtotal ?? null,
    vatAmount: quote?.vatAmount ?? null,
    total: quote?.total ?? null,
    lineItems: quote?.lineItems ?? EMPTY_LINE_ITEMS,
    isPending,
    isError,
  };
}

const EMPTY_TARIFFS: PricingTariff[] = [];
const EMPTY_ADDONS: PricingAddon[] = [];
const EMPTY_PERIODS: PricingBillingPeriod[] = [];
const EMPTY_LINE_ITEMS: QuoteResponse['quote']['lineItems'] = [];
