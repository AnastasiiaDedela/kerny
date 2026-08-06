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

export function useBillingSummary() {
  return useQuery({
    queryKey: billingKeys.summary(),
    queryFn: async (): Promise<BillingSummaryResponse> =>
      unwrap(await apiClient.GET('/api/billing/summary')),
  });
}

export function useBillingTransactions() {
  return useQuery({
    queryKey: billingKeys.transactions(),
    queryFn: async (): Promise<LedgerEntryListResponse> =>
      unwrap(await apiClient.GET('/api/billing/transactions')),
  });
}

export function useBillingOverview() {
  const { data, isPending, isError } = useBillingSummary();

  return {
    balance: data?.balance ?? null,
    depositConversion: data?.depositConversion ?? null,
    profile: data?.profile ?? null,
    paymentMethods: data?.paymentMethods.filter((method) => method.active) ?? EMPTY_METHODS,
    activeCheckouts: data?.activeCheckouts ?? EMPTY_CHECKOUTS,
    recentTransactions: data?.recentTransactions ?? EMPTY_ENTRIES,
    isPending,
    isError,
  };
}

export function useDefaultPaymentMethod() {
  const { paymentMethods, isPending, isError } = useBillingOverview();

  return {
    paymentMethod: paymentMethods.find((method) => method.default) ?? paymentMethods[0] ?? null,
    isPending,
    isError,
  };
}

const EMPTY_METHODS: PaymentMethod[] = [];
const EMPTY_CHECKOUTS: ActiveCheckout[] = [];
const EMPTY_ENTRIES: LedgerEntry[] = [];
