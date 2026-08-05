'use client';

import { useState } from 'react';

import { formError } from '@/api/auth';
import { useCreateDeposit, type DepositAction } from '@/api/billing';
import { FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

/**
 * What to tell the user when the deposit cannot simply be handed over to the provider's
 * page. `redirect` never lands here — the browser leaves for the provider instead.
 */
function actionNotice(action: DepositAction): string | null {
  switch (action.kind) {
    case 'redirect':
      return null;
    case 'hosted_session':
      return 'Your payment is ready. Finish it in the checkout window from your payment provider.';
    case 'pending':
      return action.instructions;
  }
}

/**
 * Top-up dialog. The API only starts the payment — it answers with an action envelope,
 * and the balance moves later, when the provider's webhook confirms it.
 */
export function DepositModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const deposit = useCreateDeposit();

  const close = () => {
    setAmount('');
    setNotice(null);
    deposit.reset();
    onOpenChange(false);
  };

  const submit = () => {
    // `provider` is left off so the API routes to whichever provider it has enabled.
    deposit.mutate(
      { amount: amount.trim(), currency: 'COIN' },
      {
        onSuccess: ({ action }) => {
          if (action.kind === 'redirect') {
            // A full navigation, not the router: the provider is off-app.
            window.location.assign(action.redirectUrl);
            return;
          }
          setNotice(actionNotice(action));
        },
      }
    );
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Deposit">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-5 lg:mt-4"
      >
        <ModalField
          id="depositAmount"
          label="Amount"
          placeholder="100.00"
          value={amount}
          onValueChange={(value) => {
            setNotice(null);
            setAmount(value);
          }}
          inputMode="numeric"
        />

        {notice && (
          <p className="mt-3 text-sm leading-[17px] font-normal text-white/80">{notice}</p>
        )}

        <FormError>{formError(deposit.error)}</FormError>

        <ModalActions submitLabel="Deposit" onCancel={close} pending={deposit.isPending} />
      </form>
    </ModalShell>
  );
}
