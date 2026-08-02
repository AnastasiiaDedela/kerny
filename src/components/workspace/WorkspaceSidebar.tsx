import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const navItems = [
  {
    label: 'Cloud Servers',
    href: '/workspace',
    icon: '/images/servers/claud server.svg',
    width: 20,
    height: 14,
    gap: 'gap-2',
    active: true,
  },
  {
    label: 'Balance & Payments',
    href: '#',
    icon: '/images/user-img/balance.svg',
    width: 14,
    height: 16,
    gap: 'gap-[11px]',
    active: false,
  },
  {
    label: 'Notifications',
    href: '#',
    icon: '/images/servers/notification.svg',
    width: 12,
    height: 14,
    gap: 'gap-3',
    active: false,
  },
  {
    label: 'Documentations',
    href: '#',
    icon: '/images/servers/document.svg',
    width: 12,
    height: 14,
    gap: 'gap-3',
    active: false,
  },
];

export function WorkspaceSidebar() {
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
              item.active ? 'font-medium text-white' : 'font-normal text-white/50 hover:text-white'
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
