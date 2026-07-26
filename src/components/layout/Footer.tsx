// components/layout/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const services = ['Server Rental', 'Monitoring', 'Backups', 'Policies'];
const company = ['Home', 'About Us', 'Services', 'Pricing', 'Contact Us'];

const policies = {
  legal: ['Acceptable Use Policy', 'Refund Policy', 'Consumer Resolution & Complaints'],
  brand: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
};

const brandSummary =
  'Lorem ipsum dolor sit amet consectetur. Etiam mattis sed morbi sed eget dui. Purus lacus tincidunt tellus mauris lorem aliquet non.';

type FooterVariant = keyof typeof policies;

function NavColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 text-left text-base leading-[19px] font-semibold md:text-right">{title}</p>
      <ul className="space-y-2.5 text-left md:text-right">
        {items.map((item) => (
          <li key={item} className="leading-[17px]">
            <Link
              href="#"
              className="text-foreground hover:text-foreground text-sm leading-[17px] transition-colors"
            >
              {item}
            </Link>
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

export function Footer({ variant = 'legal' }: { variant?: FooterVariant }) {
  return (
    <footer className="border-border text-foreground border-t">
      <div className="mx-auto max-w-340 px-5 py-10">
        <div className="flex flex-col justify-between gap-10 pb-6 md:flex-row md:items-start">
          <div className="flex flex-col gap-2.5">
            <span className="text-lg leading-[22px] font-bold">Kerny</span>
            {variant === 'legal' ? (
              <LegalDetails />
            ) : (
              <p className="text-muted-foreground max-w-[310px] text-sm leading-[17px]">
                {brandSummary}
              </p>
            )}
          </div>

          {/* Right — nav columns */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-12.5">
            <NavColumn title="Services" items={services} />
            <NavColumn title="Company" items={company} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t-[0.5px] border-white/16 pt-6 md:flex-row">
          <p className="text-muted-foreground text-sm">© Kerny 2026. All Right Reserved</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-12.5">
            {policies[variant].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
