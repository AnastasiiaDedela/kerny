'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthModal } from '@/components/layout/AuthModalProvider';
import { useContactModal } from '@/components/layout/ContactModalProvider';

const profileLinks = [
  {
    label: 'Control Panel',
    href: '/workspace',
    icon: '/images/user-img/table.svg',
    width: 14,
    height: 12,
  },
  {
    label: 'Balance & Payments',
    href: '/workspace/balance',
    icon: '/images/user-img/balance.svg',
    width: 14,
    height: 16,
  },
  { label: 'Settings', href: '#', icon: '/images/user-img/settings.svg', width: 14, height: 14 },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const openContactModal = useContactModal();
  const { openSignUp, openLogIn, isLoggedIn, logOut } = useAuthModal();

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
          <button
            type="button"
            onClick={openContactModal}
            className="text-foreground hover:text-primary text-sm leading-none transition-colors"
          >
            Contact Us
          </button>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center md:flex">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <Image src="/images/user-img/user-icon.svg" alt="" width={42} height={42} />
                <span className="flex size-5 items-center justify-center rounded-full bg-white/[0.04]">
                  <ChevronDown className="size-3 text-white/30" />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-47.5 rounded-[10px] border-0 bg-[#181818] p-4 shadow-[0px_91px_36px_rgba(0,0,0,0.02),0px_51px_31px_rgba(0,0,0,0.08),0px_23px_23px_rgba(0,0,0,0.13),0px_6px_12px_rgba(0,0,0,0.15)] ring-0"
              >
                <div className="flex flex-col gap-3">
                  {profileLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.label}
                      className="text-foreground gap-2 p-0 text-sm leading-[17px] focus:bg-transparent focus:text-inherit"
                      render={<Link href={link.href} />}
                    >
                      <Image src={link.icon} alt="" width={link.width} height={link.height} />
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-3 bg-white/[0.16]" />
                <DropdownMenuItem
                  onClick={logOut}
                  className="text-foreground/30 hover:text-foreground/60 gap-2 p-0 text-sm leading-[17px] focus:bg-transparent focus:text-inherit"
                >
                  <Image src="/images/user-img/log-out.svg" alt="" width={14} height={14} />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                size="default"
                onClick={openLogIn}
                className="bg-background text-foreground hover:bg-muted border-[0.5px] border-white/20 font-medium"
              >
                Log In
              </Button>
              <Button onClick={openSignUp} className="font-medium">
                Sign Up
              </Button>
            </div>
          )}
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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openContactModal();
              }}
              className="text-foreground flex h-[50px] items-center justify-center rounded-[10px] border-[0.5px] border-white/20 text-base transition-colors hover:bg-[#1a1a1a]"
            >
              Contact Us
            </button>
          </nav>

          <div className="border-border my-5 border-t" />

          {isLoggedIn ? (
            <div className="flex flex-col gap-2.5">
              <span className="text-foreground text-base">Profile</span>
              {profileLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground flex h-[50px] items-center justify-center gap-2 rounded-[10px] border-[0.5px] border-white/20 text-base transition-colors hover:bg-[#1a1a1a]"
                >
                  <Image src={link.icon} alt="" width={link.width} height={link.height} />
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logOut();
                }}
                className="text-foreground/30 flex h-[50px] items-center justify-center gap-2 rounded-[10px] border-[0.5px] border-white/20 text-base transition-colors hover:bg-[#1a1a1a]"
              >
                <Image src="/images/user-img/log-out.svg" alt="" width={14} height={14} />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  openLogIn();
                }}
                className="bg-background text-foreground hover:bg-muted h-[50px] w-full rounded-[10px] border-[0.5px] border-white/20 text-base dark:border-white/20 dark:bg-transparent"
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  openSignUp();
                }}
                className="h-[50px] w-full rounded-[10px] text-base"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
