import type { components } from '@/types/api';

/** `{ balance, depositConversion, profile, paymentMethods, activeCheckouts, recentTransactions }`
    — everything the Balance & Payments screen paints, in one call. */
export type BillingSummaryResponse = components['schemas']['BillingSummaryResponse'];

/** Invoice details. Every field is nullable: the profile starts out empty. */
export type BillingProfile = components['schemas']['BillingProfile'];
export type BillingProfileResponse = components['schemas']['BillingProfileResponse'];

/** A saved card. `brand`/`last4`/expiry are null until the provider reports them. */
export type PaymentMethod = components['schemas']['PaymentMethod'];

/** One line of the balance history. `amount` is a signed decimal string (`'-999.00'`). */
export type LedgerEntry = components['schemas']['LedgerEntry'];
export type LedgerEntryListResponse = components['schemas']['LedgerEntryListResponse'];

/** How local COIN maps onto the money the provider actually charges. */
export type DepositConversion = components['schemas']['DepositConversion'];

/** A deposit left in `REQUIRES_ACTION` — the user still has to finish it at the provider. */
export type ActiveCheckout = components['schemas']['ActiveCheckout'];

export type Payment = components['schemas']['Payment'];

/**
 * What to do next after starting a deposit: `redirect` to the provider, hand a
 * `hosted_session` token to its widget, or wait (`pending`, with instructions).
 */
export type DepositAction = components['schemas']['DepositAction'];
export type DepositResponse = components['schemas']['DepositResponse'];

/** Same envelope for card setup, minus the `pending` case. */
export type PaymentMethodSetupAction = components['schemas']['PaymentMethodSetupAction'];
export type PaymentMethodSetupResponse = components['schemas']['PaymentMethodSetupResponse'];

export type PaymentMethodResponse = components['schemas']['PaymentMethodResponse'];

/** `{ balance, transaction }` — the credited balance plus the ledger entry that moved it. */
export type PromocodeResponse = components['schemas']['PromocodeResponse'];

export type BillingProfileDto = components['schemas']['BillingProfileDto'];
export type CreateDepositDto = components['schemas']['CreateDepositDto'];
export type CreatePaymentMethodSetupDto = components['schemas']['CreatePaymentMethodSetupDto'];
export type CreatePaymentMethodDto = components['schemas']['CreatePaymentMethodDto'];
export type ActivatePromocodeDto = components['schemas']['ActivatePromocodeDto'];

/** The two providers the API can route a payment through. */
export type PaymentProvider = NonNullable<CreateDepositDto['provider']>;
