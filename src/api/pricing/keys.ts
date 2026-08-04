import type { QuoteItem } from '@/api/pricing/types';

export const pricingKeys = {
  all: ['pricing'] as const,
  catalog: () => [...pricingKeys.all, 'catalog'] as const,
  /** The quote is derived entirely from its inputs, so the items are the cache key. */
  quote: (items: QuoteItem[]) => [...pricingKeys.all, 'quote', items] as const,
};
