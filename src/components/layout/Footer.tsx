// components/layout/Footer.tsx
import Link from 'next/link';

const services = ['Server Rental', 'Monitoring', 'Backups', 'Policies'];
const company = ['Home', 'About Us', 'Services', 'Pricing', 'Contact Us'];

export function Footer() {
  return (
    <footer className="text-foreground">
      <div className="mx-auto max-w-330 px-5 py-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-3">
            <span className="text-base font-bold">Kerny</span>
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>Name: Subra Max Kft.</p>
              <p>Country: Hungary</p>
              <p>Registration Nr: 01-09-434489</p>
              <p>Address: 1068 Budapest, Kiraly utca 80. Fsz. 11. ajto</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <img src="/icons/visa.svg" alt="Visa" className="h-6" />
              <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/icons/3d-secure.svg" alt="3D Secure" className="h-6" />
            </div>
          </div>

          {/* Right — nav columns */}
          <div className="flex gap-16">
            <div>
              <p className="mb-4 text-right text-sm font-semibold">Services</p>
              <ul className="space-y-2 text-right">
                {services.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-right text-sm font-semibold">Company</p>
              <ul className="space-y-2 text-right">
                {company.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-border mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-xs">© Kerny 2026. All Right Reserved</p>
          <div className="flex gap-6">
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
