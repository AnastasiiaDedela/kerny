import type { components } from '@/types/api';

export type BillingSummaryResponse = components['schemas']['BillingSummaryResponse'];

export type BillingProfile = components['schemas']['BillingProfile'];
export type BillingProfileResponse = components['schemas']['BillingProfileResponse'];

export type PaymentMethod = components['schemas']['PaymentMethod'];

export type LedgerEntry = components['schemas']['LedgerEntry'];
export type LedgerEntryListResponse = components['schemas']['LedgerEntryListResponse'];

export type DepositConversion = components['schemas']['DepositConversion'];

export type ActiveCheckout = components['schemas']['ActiveCheckout'];

export type Payment = components['schemas']['Payment'];

export type DepositAction = components['schemas']['DepositAction'];
export type DepositResponse = components['schemas']['DepositResponse'];

export type PaymentMethodSetupAction = components['schemas']['PaymentMethodSetupAction'];
export type PaymentMethodSetupResponse = components['schemas']['PaymentMethodSetupResponse'];

export type PaymentMethodResponse = components['schemas']['PaymentMethodResponse'];

export type PromocodeResponse = components['schemas']['PromocodeResponse'];

export type BillingProfileDto = components['schemas']['BillingProfileDto'];
export type CreateDepositDto = components['schemas']['CreateDepositDto'];
export type CreatePaymentMethodSetupDto = components['schemas']['CreatePaymentMethodSetupDto'];
export type CreatePaymentMethodDto = components['schemas']['CreatePaymentMethodDto'];
export type ActivatePromocodeDto = components['schemas']['ActivatePromocodeDto'];

export type PaymentProvider = NonNullable<CreateDepositDto['provider']>;
