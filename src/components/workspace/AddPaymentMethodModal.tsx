'use client';

import { useState } from 'react';

import { fieldError, formError } from '@/api/auth';
import { useCreatePaymentMethod, useCreatePaymentMethodSetup } from '@/api/billing';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';
import { parseExpiry } from '@/lib/billing';

const emptyCard = { cardNumber: '', expiry: '', cvv: '', cardholder: '' };

/**
 * The card dialog opens straight from "Add Method"; the provider handshake happens on
 * submit, so a provider that refuses the setup fails here rather than on the page.
 *
 * Saving is two calls: `payment-method-setup` opens a session — a redirect to the
 * provider's own page, or a hosted session whose `clientToken` is the token the card is
 * then saved against. The API keeps only the safe metadata, never the number.
 */
export function AddPaymentMethodModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState(emptyCard);

  const createSetup = useCreatePaymentMethodSetup();
  const createMethod = useCreatePaymentMethod();

  const close = () => {
    setValues(emptyCard);
    createSetup.reset();
    createMethod.reset();
    onOpenChange(false);
  };

  const submit = () => {
    createSetup.mutate(undefined, {
      onSuccess: ({ setup, action }) => {
        if (action.kind === 'redirect') {
          // The provider collects the card itself; a full navigation, not the router.
          window.location.assign(action.redirectUrl);
          return;
        }

        const cardNumber = values.cardNumber.replace(/\s/g, '');
        // A half-typed MM/YY is left off rather than sent as a broken date.
        const expiry = parseExpiry(values.expiry);

        createMethod.mutate(
          {
            provider: setup.provider,
            providerToken: action.clientToken,
            cardNumber,
            cvv: values.cvv,
            last4: cardNumber.slice(-4),
            expirationMonth: expiry?.month,
            expirationYear: expiry?.year,
            default: true,
          },
          { onSuccess: close }
        );
      },
    });
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Add Payment Method">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-5 lg:mt-4"
      >
        <div className="flex flex-col gap-4">
          <ModalField
            id="cardNumber"
            label="Card Number"
            placeholder="0000 0000 0000 0000"
            value={values.cardNumber}
            onValueChange={(cardNumber) => setValues((v) => ({ ...v, cardNumber }))}
            inputMode="numeric"
          />
          <FieldError>{fieldError(createMethod.error, 'cardNumber')}</FieldError>

          {/* 192 / 192 with a 16px gutter fills the 400px content column. */}
          <div className="grid grid-cols-2 gap-4">
            <ModalField
              id="expiry"
              label="Expiry Date"
              placeholder="MM/YY"
              value={values.expiry}
              onValueChange={(expiry) => setValues((v) => ({ ...v, expiry }))}
              inputMode="numeric"
              maxLength={5}
            />
            <ModalField
              id="cvv"
              label="CVV"
              placeholder="000"
              value={values.cvv}
              onValueChange={(cvv) => setValues((v) => ({ ...v, cvv }))}
              inputMode="numeric"
              maxLength={4}
            />
          </div>

          <ModalField
            id="cardholder"
            label="Cardholder Name"
            placeholder="Name Surname"
            value={values.cardholder}
            onValueChange={(cardholder) => setValues((v) => ({ ...v, cardholder }))}
          />
        </div>

        <FormError>{formError(createSetup.error ?? createMethod.error)}</FormError>

        <ModalActions
          submitLabel="Save Payment Method"
          onCancel={close}
          pending={createSetup.isPending || createMethod.isPending}
        />
      </form>
    </ModalShell>
  );
}
