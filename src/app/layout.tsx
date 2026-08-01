import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthModalProvider } from '@/components/layout/AuthModalProvider';
import { ContactModalProvider } from '@/components/layout/ContactModalProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Kerny — VPS Service That Actually Works',
  description:
    'Kerny VPS hosting with DDoS protection, premium equipment, round-the-clock support and 32 cloud data center regions worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ContactModalProvider>
          <AuthModalProvider>{children}</AuthModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
