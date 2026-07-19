// components/layout/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const services = ['Server Rental', 'Monitoring', 'Backups', 'Policies'];
const company = ['Home', 'About Us', 'Services', 'Pricing', 'Contact Us'];

export function Footer() {
  return (
    <footer className="text-foreground">
      <div className="mx-auto max-w-340 px-5 py-10">
        <div className="flex flex-col justify-between gap-10 pb-6 md:flex-row md:items-start">
          <div className="flex flex-col gap-3">
            <span className="text-base font-bold">Kerny</span>
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
          </div>

          {/* Right — nav columns */}
          <div className="flex gap-16">
            <div>
              <p className="mb-3 text-right text-sm font-semibold">Services</p>
              <ul className="space-y-2 text-right">
                {services.map((item) => (
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
            <div>
              <p className="mb-3 text-right text-sm font-semibold">Company</p>
              <ul className="space-y-2 text-right">
                {company.map((item) => (
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
          </div>
        </div>

        <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-xs">© Kerny 2026. All Right Reserved</p>
          <div className="flex gap-12.5">
            {['Acceptable Use Policy', 'Refund Policy', 'Consumer Resolution & Complaints'].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
