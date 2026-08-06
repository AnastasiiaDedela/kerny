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
      void queryClient.invalidateQueries({ queryKey: billingKeys.all });
    },
  });
}

export function useCreatePaymentMethodSetup() {
  return useMutation({
    mutationFn: async (body?: CreatePaymentMethodSetupDto) =>
      unwrap(
        await apiClient.POST('/api/billing/payment-method-setup', {
          params: { header: idempotencyHeaders() },
          body: body ?? {},
        })
      ),
  });
}

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
