'use client';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

/** 448px card, 24px inset all round — shared by every workspace dialog. */
export function ModalShell({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-w-[min(448px,calc(100%-40px))] flex-col gap-0 rounded-[20px] border-0 bg-[#121212] p-6 ring-0 sm:max-w-[min(448px,calc(100%-40px))]"
      >
        <h2 className="text-xl leading-6 font-semibold text-white">{title}</h2>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ModalField({
  id,
  label,
  placeholder,
  value,
  onValueChange,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  inputMode?: 'numeric';
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base leading-[19px] font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete="off"
        className="h-[46px] w-full rounded-[8px] bg-white/[0.04] px-4 py-[7px] text-sm leading-[17px] font-normal text-white outline-none placeholder:text-white/30"
      />
    </div>
  );
}

/** 195 / 195 with a 10px gutter — the two halves of the 400px content column. Grid rather than
    flex, because the button's own padding otherwise skews an equal `flex-1` split. */
export function ModalActions({
  submitLabel,
  onCancel,
}: {
  submitLabel: string;
  onCancel: () => void;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      <Button type="submit" className="h-[46px] min-w-0 text-sm leading-[17px] font-medium">
        {submitLabel}
      </Button>
      <button
        type="button"
        onClick={onCancel}
        className="h-[46px] rounded-[8px] bg-white/[0.06] text-sm leading-[17px] font-medium text-white/50 transition-colors hover:text-white"
      >
        Cancel
      </button>
    </div>
  );
}
