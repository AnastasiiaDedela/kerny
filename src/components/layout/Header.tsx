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
        <Link href="/" className="text-foreground text-lg font-bold">
          Kerny
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground text-sm leading-none transition-colors hover:text-[#454CEE]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            size="default"
            className="bg-background text-foreground hover:bg-muted"
          >
            Log In
          </Button>
          <Button>Sign Up</Button>
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
              className="text-foreground text-lg font-bold"
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

          <nav className="mt-10 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-border text-foreground flex h-14 items-center justify-center rounded-2xl border text-base transition-colors hover:bg-[#1a1a1a]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-border my-6 border-t" />

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="bg-background text-foreground hover:bg-muted h-14 w-full rounded-2xl text-base"
            >
              Log In
            </Button>
            <Button className="h-14 w-full rounded-2xl text-base">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
