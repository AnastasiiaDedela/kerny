import type { components } from '@/types/api';

export type PricingCatalogResponse = components['schemas']['PricingCatalogResponse'];

export type PricingCatalog = PricingCatalogResponse['catalog'];

export type PricingTariff = components['schemas']['PricingTariff'];
export type PricingRegionPrice = components['schemas']['PricingRegionPrice'];

export type PricingAddon = components['schemas']['PricingAddon'];

export type BillingPeriod = components['schemas']['BillingPeriod'];

export type PricingBillingPeriod = PricingCatalog['billingPeriods'][number];

export type QuoteItem = components['schemas']['QuoteItemDto'];
export type CreateQuoteDto = components['schemas']['CreateQuoteDto'];
export type QuoteResponse = components['schemas']['QuoteResponse'];

export type Quote = QuoteResponse['quote'];
export type QuoteLineItem = components['schemas']['QuoteLineItem'];
