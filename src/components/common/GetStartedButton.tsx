'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAuthModal } from '@/components/layout/AuthModalProvider';

type Props = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: ReactNode;
  href?: string;
};

export function GetStartedButton({
  variant,
  size,
  className,
  children,
  href = '/workspace',
}: Props) {
  const { isLoggedIn, openLogIn } = useAuthModal();

  if (isLoggedIn) {
    return (
      <Button variant={variant} size={size} className={className} render={<Link href={href} />}>
        {children}
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={openLogIn}>
      {children}
    </Button>
  );
}
