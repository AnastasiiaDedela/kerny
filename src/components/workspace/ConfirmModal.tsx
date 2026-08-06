'use client';

import { formError } from '@/api/auth';
import { FormError } from '@/components/layout/auth/shared';
import { ModalActions, ModalShell } from '@/components/workspace/modal-parts';

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  destructive,
  onConfirm,
  pending,
  error,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  destructive?: boolean;
  onConfirm: () => void;
  pending?: boolean;
  error?: unknown;
}) {
  const close = () => onOpenChange(false);

  return (
    <ModalShell open={open} onOpenChange={onOpenChange} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
        className="mt-3 lg:mt-4"
      >
        <p className="text-sm leading-[17px] font-normal text-white/80">{description}</p>

        <FormError>{formError(error)}</FormError>

        <ModalActions
          submitLabel="Confirm"
          onCancel={close}
          destructive={destructive}
          pending={pending}
        />
      </form>
    </ModalShell>
  );
}
