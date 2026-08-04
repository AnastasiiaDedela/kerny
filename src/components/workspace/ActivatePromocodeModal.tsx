'use client';

import { useState } from 'react';

import { fieldError, formError } from '@/api/auth';
import { useActivatePromocode } from '@/api/billing';
import { FieldError, FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalField, ModalShell } from '@/components/workspace/modal-parts';

function ActivatePromocodeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [promocode, setPromocode] = useState('');

  const activate = useActivatePromocode();

  const close = () => {
    setPromocode('');
    activate.reset();
    onOpenChange(false);
  };

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title="Activate Promocode">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // The credit lands on the balance immediately; the hook refreshes it.
          activate.mutate({ code: promocode.trim() }, { onSuccess: close });
        }}
        className="mt-5 lg:mt-4"
      >
        <ModalField
          id="promocode"
          label="Promocode"
          placeholder="K-123456790"
          value={promocode}
          onValueChange={setPromocode}
        />
        <FieldError>{fieldError(activate.error, 'code')}</FieldError>

        <FormError>{formError(activate.error)}</FormError>

        <ModalActions submitLabel="Activate" onCancel={close} pending={activate.isPending} />
      </form>
    </ModalShell>
  );
}

/** Trigger + dialog in one client island, so the button keeps its place in the layout. */
export function ActivatePromocodeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2.5 h-[46px] w-full rounded-[10px] bg-white/[0.06] text-sm leading-[17px] font-medium text-white/50 transition-colors hover:text-white"
      >
        Activate Promocode
      </button>
      <ActivatePromocodeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
