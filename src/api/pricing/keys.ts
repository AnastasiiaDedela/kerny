import type { QuoteItem } from '@/api/pricing/types';

export const pricingKeys = {
  all: ['pricing'] as const,
  catalog: () => [...pricingKeys.all, 'catalog'] as const,
  quote: (items: QuoteItem[]) => [...pricingKeys.all, 'quote', items] as const,
};
