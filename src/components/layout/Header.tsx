'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background py-7.5">
      <div className="mx-auto flex w-full max-w-340 items-center justify-between px-5">
        <Link
          href="/"
          className="text-foreground font-logo text-lg font-extrabold max-md:text-xl max-md:leading-6"
        >
          Kerny
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-12.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary text-sm leading-none transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Button
            variant="outline"
            size="default"
            className="bg-background text-foreground hover:bg-muted border-[0.5px] border-white/20 font-medium"
          >
            Log In
          </Button>
          <Button className="font-medium">Sign Up</Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-foreground md:hidden"
        >
          <Menu className="size-7" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col px-5 py-7.5 md:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-foreground font-logo text-xl leading-6 font-extrabold"
            >
              Kerny
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-foreground"
            >
              <X className="size-7" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-foreground flex h-[50px] items-center justify-center rounded-[10px] border-[0.5px] border-white/20 text-base transition-colors hover:bg-[#1a1a1a]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-border my-5 border-t" />

          <div className="flex flex-col gap-2.5">
            <Button
              variant="outline"
              className="bg-background text-foreground hover:bg-muted h-[50px] w-full rounded-[10px] border-[0.5px] border-white/20 text-base dark:border-white/20 dark:bg-transparent"
            >
              Log In
            </Button>
            <Button className="h-[50px] w-full rounded-[10px] text-base">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
