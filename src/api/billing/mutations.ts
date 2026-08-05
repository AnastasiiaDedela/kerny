import { useMutation, useQueryClient } from '@tanstack/react-query';

import { accountKeys } from '@/api/account';
import { billingKeys } from '@/api/billing/keys';
import type {
  ActivatePromocodeDto,
  BillingProfileDto,
  CreateDepositDto,
  CreatePaymentMethodDto,
  CreatePaymentMethodSetupDto,
} from '@/api/billing/types';
import { apiClient, idempotencyHeaders, unwrap } from '@/api/client';

/**
 * PATCH /api/billing/profile — the invoice details (name, e-mail, address, tax id).
 * Every field is optional, so a partial patch leaves the rest alone. The response
 * carries the saved profile, which is seeded straight into the summary cache.
 */
export function useUpdateBillingProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: BillingProfileDto) =>
      unwrap(await apiClient.PATCH('/api/billing/profile', { body })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: billingKeys.summary() });
    },
  });
}

/**
 * POST /api/billing/deposits — starts a provider-backed top-up and returns an action
 * envelope (`redirect`, `hosted_session` or `pending`); no money has moved yet, the
 * provider's webhook credits the balance later. `provider` is optional — the API picks
 * its default when it is left out.
 *
 * A fresh `Idempotency-Key` per attempt: replaying one returns the original deposit
 * rather than charging twice, and reusing it with a different amount is rejected.
 */
export function useCreateDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateDepositDto) =>
      unwrap(
        await apiClient.POST('/api/billing/deposits', {
          params: { header: idempotencyHeaders() },
          body,
        })
      ),
    onSuccess: () => {
      // The deposit shows up under `activeCheckouts` until the provider settles it.
      void queryClient.invalidateQueries({ queryKey: billingKeys.all });
    },
  });
}

/**
 * POST /api/billing/payment-method-setup — step 1 of saving a card. The card itself is
 * collected by the provider, so this returns either a `redirect` to their page or a
 * `hosted_session` token; the method only exists once the setup is confirmed.
 */
export function useCreatePaymentMethodSetup() {
  return useMutation({
    // Optional body: the API picks its default provider when none is named.
    mutationFn: async (body?: CreatePaymentMethodSetupDto) =>
      unwrap(
        await apiClient.POST('/api/billing/payment-method-setup', {
          params: { header: idempotencyHeaders() },
          body: body ?? {},
        })
      ),
  });
}

/**
 * POST /api/billing/payment-methods — step 2, persisting the token the setup produced.
 * `providerToken` is required and comes from the setup's hosted session; Stripe cards
 * are never saved this way (`stripe_direct_save_unsupported`) — they arrive by webhook.
 */
export function useCreatePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreatePaymentMethodDto) =>
      unwrap(await apiClient.POST('/api/billing/payment-methods', { body })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: billingKeys.summary() });
    },
  });
}

/**
 * POST /api/billing/promocodes/activate — credits the balance immediately and returns
 * the new balance with the ledger entry behind it. The header balance comes from
 * `/api/me`, so refresh the account cache too.
 */
export function useActivatePromocode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ActivatePromocodeDto) =>
      unwrap(await apiClient.POST('/api/billing/promocodes/activate', { body })),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: billingKeys.all });
      void queryClient.invalidateQueries({ queryKey: accountKeys.me() });
    },
  });
}
