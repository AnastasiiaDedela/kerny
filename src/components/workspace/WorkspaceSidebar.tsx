'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const navItems = [
  {
    label: 'Cloud Servers',
    href: '/workspace',
    icon: '/images/servers/claud server.svg',
    width: 20,
    height: 14,
    gap: 'gap-2',
  },
  {
    label: 'Balance & Payments',
    href: '/workspace/balance',
    icon: '/images/user-img/balance.svg',
    width: 14,
    height: 16,
    gap: 'gap-[11px]',
  },
  {
    label: 'Notifications',
    href: '#',
    icon: '/images/servers/notification.svg',
    width: 12,
    height: 14,
    gap: 'gap-3',
  },
  {
    label: 'Documentations',
    href: '#',
    icon: '/images/servers/document.svg',
    width: 12,
    height: 14,
    gap: 'gap-3',
  },
];

/** Longest matching href wins, so /workspace/balance doesn't also light up /workspace. */
export function useActiveNavHref() {
  const pathname = usePathname();

  return navItems
    .map((item) => item.href)
    .filter((href) => href !== '#' && (pathname === href || pathname.startsWith(`${href}/`)))
    .sort((a, b) => b.length - a.length)[0];
}

export function WorkspaceSidebar() {
  const activeHref = useActiveNavHref();

  return (
    <aside className="hidden w-[246px] shrink-0 self-start rounded-[15px] bg-white/[0.04] p-6 lg:block">
      <nav className="flex flex-col gap-5">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center text-sm leading-[17px] transition-colors',
              item.gap,
              item.href === activeHref
                ? 'font-medium text-white'
                : 'font-normal text-white/50 hover:text-white'
            )}
          >
            <Image src={item.icon} alt="" width={item.width} height={item.height} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
