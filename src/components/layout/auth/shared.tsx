import { X } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type AuthStep = 'sign-up' | 'log-in' | 'reset-password' | 'new-password' | 'success';

export const description =
  'Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus sagittis';

export const fieldClassName =
  'h-[46px] w-full rounded-[8px] border-0 bg-white/[0.04] px-4 text-sm text-foreground placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary/50';

export function AuthModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between">
      <h2 className="text-foreground text-2xl leading-[29px] font-semibold">{title}</h2>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="text-foreground/50 hover:text-foreground flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-white/[0.04] transition-colors"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

export function AuthModalDescription({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground mt-1.5 text-sm leading-[17px]">{children}</p>;
}

export function SecondaryButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'hover:text-foreground flex h-10 w-full items-center justify-center rounded-[8px] bg-white/[0.04] px-4 py-[7px] text-sm leading-[17px] text-white/50 transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-px flex-1 bg-white/[0.16]" />
      <span className="text-xs leading-[15px] font-medium text-white/30">OR</span>
      <div className="h-px flex-1 bg-white/[0.16]" />
    </div>
  );
}

export function GoogleButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="hover:text-foreground flex h-10 w-full items-center justify-center gap-2.5 rounded-[8px] bg-white/[0.04] px-4 py-[7px] text-sm leading-[17px] text-white/50 transition-colors disabled:opacity-50"
    >
      <Image src="/google.svg" alt="" width={16} height={16} />
      {children}
    </button>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  if (!children) return null;

  return (
    <p role="alert" className="text-destructive mt-3 text-xs leading-[15px]">
      {children}
    </p>
  );
}

export function FieldError({ children }: { children: ReactNode }) {
  if (!children) return null;

  return <p className="text-destructive px-1 text-xs leading-[15px]">{children}</p>;
}
