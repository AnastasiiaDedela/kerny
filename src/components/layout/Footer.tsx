'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContactModal } from '@/components/layout/ContactModalProvider';
import { useCookieConsent } from '@/components/layout/CookieConsentProvider';

const services = [
  { label: 'Server Rental', href: '/pricing' },
  { label: 'Monitoring', href: '#' },
  { label: 'Backups', href: '#' },
  { label: 'Policies', href: '#' },
];

const company = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '#' },
];

const policies = {
  legal: [
    { label: 'Acceptable Use Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
    { label: 'Consumer Resolution & Complaints', href: '#' },
  ],
  brand: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const brandSummary =
  'Lorem ipsum dolor sit amet consectetur. Etiam mattis sed morbi sed eget dui. Purus lacus tincidunt tellus mauris lorem aliquet non.';

type FooterVariant = keyof typeof policies;

function NavColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const openContactModal = useContactModal();
  const linkClassName =
    'text-foreground hover:text-foreground text-sm leading-[17px] transition-colors';

  return (
    <div>
      <p className="mb-3 text-left text-base leading-[19px] font-semibold md:text-right">{title}</p>
      <ul className="space-y-2.5 text-left md:text-right">
        {items.map(({ label, href }) => (
          <li key={label} className="leading-[17px]">
            {label === 'Contact Us' ? (
              <button type="button" onClick={openContactModal} className={linkClassName}>
                {label}
              </button>
            ) : (
              <Link href={href} className={linkClassName}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LegalDetails() {
  return (
    <>
      <div className="text-muted-foreground gap-2.5 space-y-1 text-sm">
        <p>Name: Subra Max Kft.</p>
        <p>Country: Hungary</p>
        <p>Registration Nr: 01-09-434489</p>
        <p>Address: 1068 Budapest, Kiraly utca 80. Fsz. 11. ajto</p>
      </div>
      <div className="flex items-center gap-3">
        <Image src="/icons/visa.svg" alt="Visa" width={48} height={14} />
        <Image src="/icons/mastercard.svg" alt="Mastercard" width={34} height={21} />
        <Image src="/icons/3d-secure.svg" alt="3D Secure" width={20} height={21} />
      </div>
    </>
  );
}

const policyLinkClassName = 'text-muted-foreground hover:text-foreground text-sm transition-colors';

export function Footer({ variant = 'legal' }: { variant?: FooterVariant }) {
  const { openCookieSettings } = useCookieConsent();

  return (
    <footer className="border-border text-foreground border-t">
      <div className="mx-auto max-w-340 px-5 py-10">
        <div className="flex flex-col justify-between gap-7.5 pb-7.5 md:flex-row md:items-start md:gap-10 md:pb-6">
          <div className="flex flex-col gap-2.5">
            <Image src="/logo.svg" alt="Kerny" width={49} height={16} />
            {variant === 'legal' ? (
              <LegalDetails />
            ) : (
              <p className="text-muted-foreground max-w-[310px] text-sm leading-[17px]">
                {brandSummary}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-7.5 md:flex-row md:gap-12.5">
            <NavColumn title="Services" items={services} />
            <NavColumn title="Company" items={company} />
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t-[0.5px] border-white/16 pt-6 md:flex-row md:items-center md:gap-4">
          <p className="text-muted-foreground text-sm">© Kerny 2026. All Right Reserved</p>
          <div className="flex w-full flex-wrap justify-between gap-x-6 gap-y-2 md:w-auto md:justify-center md:gap-12.5">
            {policies[variant].map(({ label, href }) =>
              label === 'Cookie Policy' ? (
                <button
                  key={label}
                  type="button"
                  onClick={openCookieSettings}
                  className={policyLinkClassName}
                >
                  {label}
                </button>
              ) : (
                <Link key={label} href={href} className={policyLinkClassName}>
                  {label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
