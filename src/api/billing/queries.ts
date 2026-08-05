import { useQuery } from '@tanstack/react-query';

import { billingKeys } from '@/api/billing/keys';
import type {
  ActiveCheckout,
  BillingSummaryResponse,
  LedgerEntry,
  LedgerEntryListResponse,
  PaymentMethod,
} from '@/api/billing/types';
import { apiClient, unwrap } from '@/api/client';

/**
 * GET /api/billing/summary — balance, invoice profile, saved cards, unfinished
 * checkouts and the last few ledger entries in one call, so the Balance & Payments
 * screen paints from a single request.
 *
 * 401s when signed out, and the shared retry predicate gives up on 4xx.
 */
export function useBillingSummary() {
  return useQuery({
    queryKey: billingKeys.summary(),
    queryFn: async (): Promise<BillingSummaryResponse> =>
      unwrap(await apiClient.GET('/api/billing/summary')),
  });
}

/**
 * GET /api/billing/transactions — the full ledger, where the summary only carries the
 * most recent entries. Takes no paging parameters; the API decides the window.
 */
export function useBillingTransactions() {
  return useQuery({
    queryKey: billingKeys.transactions(),
    queryFn: async (): Promise<LedgerEntryListResponse> =>
      unwrap(await apiClient.GET('/api/billing/transactions')),
  });
}

/** Convenience wrapper for the balance screen, which reads every part of the summary. */
export function useBillingOverview() {
  const { data, isPending, isError } = useBillingSummary();

  return {
    balance: data?.balance ?? null,
    depositConversion: data?.depositConversion ?? null,
    profile: data?.profile ?? null,
    // Inactive cards stay in the payload; only active ones can be charged.
    paymentMethods: data?.paymentMethods.filter((method) => method.active) ?? EMPTY_METHODS,
    activeCheckouts: data?.activeCheckouts ?? EMPTY_CHECKOUTS,
    recentTransactions: data?.recentTransactions ?? EMPTY_ENTRIES,
    isPending,
    isError,
  };
}

/**
 * The card to show as "the" payment method: the default one when the API marks it,
 * otherwise the first active card.
 */
export function useDefaultPaymentMethod() {
  const { paymentMethods, isPending, isError } = useBillingOverview();

  return {
    paymentMethod: paymentMethods.find((method) => method.default) ?? paymentMethods[0] ?? null,
    isPending,
    isError,
  };
}

/** Stable identities so a pending render doesn't hand consumers a fresh array each time. */
const EMPTY_METHODS: PaymentMethod[] = [];
const EMPTY_CHECKOUTS: ActiveCheckout[] = [];
const EMPTY_ENTRIES: LedgerEntry[] = [];
