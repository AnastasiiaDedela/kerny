import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
];

export function Header() {
  return (
    <header className="bg-background py-7.5">
      <div className="mx-auto flex w-full max-w-330 items-center justify-between px-5">
        <Link href="/" className="text-foreground text-lg font-bold">
          Kerny
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground text-sm leading-none transition-colors hover:text-[#454CEE]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className="bg-background text-foreground hover:bg-muted"
          >
            Log In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
