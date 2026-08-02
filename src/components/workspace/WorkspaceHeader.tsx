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
import { navItems, useActiveNavHref } from '@/components/workspace/WorkspaceSidebar';
import { cn } from '@/lib/utils';

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

export function WorkspaceHeader() {
  const [open, setOpen] = useState(false);
  const { logOut } = useAuthModal();
  const activeHref = useActiveNavHref();

  return (
    <header className="bg-background pt-7.5 pb-5">
      <div className="mx-auto flex w-full max-w-340 items-center justify-between px-5">
        <Link
          href="/"
          className="text-foreground font-logo flex items-center gap-2 text-lg font-extrabold"
        >
          Kerny
          <span className="text-primary hidden lg:inline">»</span>
          <span className="hidden font-sans lg:inline">Workspace</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="text-right">
            <p className="text-sm leading-[17px] text-white/50">Your Balance</p>
            <p className="text-base leading-[19px] font-medium text-white">999 €</p>
          </div>

          <Button className="h-6 min-h-0 w-16 min-w-0 rounded-[500px] px-2.5 py-0 text-xs leading-[15px] font-normal">
            Deposit
          </Button>

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
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-foreground lg:hidden"
        >
          <Menu className="size-7" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="bg-background fixed inset-0 z-50 flex flex-col overflow-y-auto px-5 py-7.5 lg:hidden">
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

          <nav className="mt-6 flex flex-col gap-2.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex h-[50px] items-center gap-3 rounded-[10px] border-[0.5px] border-white/20 px-4 text-base transition-colors hover:bg-[#1a1a1a]',
                  item.href === activeHref ? 'text-foreground font-medium' : 'text-foreground/50'
                )}
              >
                <Image src={item.icon} alt="" width={item.width} height={item.height} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-border my-5 border-t" />

          <div className="flex items-center justify-between rounded-[10px] border-[0.5px] border-white/20 px-4 py-3">
            <div>
              <p className="text-sm leading-[17px] text-white/50">Your Balance</p>
              <p className="text-base leading-[19px] font-medium text-white">999 €</p>
            </div>
            <Button size="default" className="min-w-0 px-4">
              Deposit
            </Button>
          </div>

          <div className="border-border my-5 border-t" />

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
        </div>
      )}
    </header>
  );
}
