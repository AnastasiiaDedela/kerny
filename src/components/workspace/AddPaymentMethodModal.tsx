'use client';

import { useState } from 'react';

import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

const emptyCard = { cardNumber: '', expiry: '', cvv: '', cardholder: '' };

export function AddPaymentMethodModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState(emptyCard);

  const close = () => {
    setValues(emptyCard);
    onOpenChange(false);
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Add Payment Method">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
        className="mt-4"
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

        <ModalActions submitLabel="Save Payment Method" onCancel={close} />
      </form>
    </ModalShell>
  );
}
