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
    href: '/workspace/notifications',
    icon: '/images/servers/notification.svg',
    width: 12,
    height: 14,
    gap: 'gap-3',
  },
  {
    label: 'Documentations',
    href: '/workspace/documentations',
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

/* The mobile nav tints the active item's icon primary, which <Image> can't do — the fill is
   baked into the SVG — so the icon is painted as a mask of a background colour instead. */
function NavIcon({ item, className }: { item: (typeof navItems)[number]; className?: string }) {
  const url = `url("${encodeURI(item.icon)}")`;

  return (
    <span
      aria-hidden
      style={{ width: item.width, height: item.height, maskImage: url, WebkitMaskImage: url }}
      className={cn(
        'shrink-0 [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]',
        className
      )}
    />
  );
}

/** Mobile counterpart of the sidebar: the same nav as full-width cards above the page content. */
export function WorkspaceMobileNav({ className }: { className?: string }) {
  const activeHref = useActiveNavHref();

  return (
    <nav className={cn('flex flex-col gap-1.5 rounded-[15px] bg-white/[0.04] p-5', className)}>
      {navItems.map((item) => {
        const active = item.href === activeHref;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'group flex h-[50px] items-center justify-center rounded-[8px] text-sm leading-[17px] transition-colors',
              item.gap,
              active
                ? 'border-primary bg-primary/10 border font-medium text-white'
                : 'bg-white/[0.04] font-normal text-white/50 hover:text-white'
            )}
          >
            <NavIcon
              item={item}
              className={active ? 'bg-primary' : 'bg-white/50 group-hover:bg-white'}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
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
