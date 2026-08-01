'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthModal } from '@/components/layout/AuthModalProvider';

const profileLinks = [
  { label: 'Control Panel', href: '#', icon: '/images/user-img/table.svg', width: 14, height: 12 },
  {
    label: 'Balance & Payments',
    href: '#',
    icon: '/images/user-img/balance.svg',
    width: 14,
    height: 16,
  },
  { label: 'Settings', href: '#', icon: '/images/user-img/settings.svg', width: 14, height: 14 },
];

export function WorkspaceHeader() {
  const { logOut } = useAuthModal();

  return (
    <header className="bg-background pt-7.5 pb-5">
      <div className="mx-auto flex w-full max-w-340 items-center justify-between px-5">
        <Link
          href="/"
          className="text-foreground font-logo flex items-center gap-2 text-lg font-extrabold"
        >
          Kerny <span className="text-primary">»</span> <span className="font-sans">Workspace</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm leading-[17px] text-white/50">Your Balance</p>
            <p className="text-base leading-[19px] font-medium text-white">999 €</p>
          </div>

          <Button size="default" className="min-w-0 px-4">
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
      </div>
    </header>
  );
}
