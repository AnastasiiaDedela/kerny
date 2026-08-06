import { Download } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const orderNumber = '#103-62567-3299874';

const senderLines = [
  '1111 Something Ave.',
  'City, State 98102',
  'Order placed: March 10, 2025',
  'www.kerny.com',
];

const items = [
  {
    name: 'Name of Item',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    price: '$ 999 999',
  },
  {
    name: 'Name of Item',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    price: '$ 999 999',
  },
  {
    name: 'Name of Item',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    price: '$ 999 999',
  },
  {
    name: 'Name of Item',
    description: 'Lorem ipsum dolor sit amet consectetur.',
    price: '$ 999 999',
  },
];

const subtotals = [
  { label: 'Items Subtotal', value: '$ 546.56' },
  { label: 'Shipping & Handling', value: '$ 546.56' },
  { label: 'Subtotal', value: '$ 546.56' },
];

const total = { label: 'Total', value: '$ 5460.56' };

const paymentDetails = [
  { label: 'Payment Method:', value: 'Visa ****1234' },
  { label: 'Authorization Code:', value: '621345' },
  { label: 'Transaction Type:', value: 'Purchase' },
];

const support = { email: 'support@kerny.com', phone: '1-800-111-11111' };

/** The receipt's hairline rules — 1px at 6% white, the same stroke as the item row borders. */
function Rule({ className }: React.ComponentProps<'div'>) {
  return <div className={cn('h-px bg-white/[0.06]', className)} />;
}

export function PaymentConfirmation() {
  return (
    <section className="bg-background mx-auto w-full max-w-[800px] rounded-[10px] p-5 lg:p-[30px]">
      {/* Sender block and order/thank-you block are both 117px tall in the design, so they
          bottom-align on desktop; below lg they stack in reading order. */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div>
          <p className="font-logo text-primary text-2xl leading-[29px]">Kerny</p>
          <div className="mt-2 space-y-1 text-sm leading-[17px] text-white/80">
            {senderLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="lg:text-right">
          <p className="text-base leading-[19px] font-medium text-white">{orderNumber}</p>
          {/* Broken where the design breaks it. Its 207px box is exactly the width of
              "your Purchase!", so a max-width can't hold the two lines reliably. */}
          <p className="text-primary mt-[30px] text-[28px] leading-[34px] font-bold">
            Thank you for
            <br />
            your Purchase!
          </p>
        </div>
      </div>

      <Rule className="mt-5" />

      <h1 className="mt-5 text-lg leading-[22px] font-semibold text-white">Order Summary</h1>

      {/* Item rows and their rules are inset a further 30px from the card padding. */}
      <ul className="mt-4 lg:pl-[30px]">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-5 border-b border-white/[0.06] py-4 first:pt-0"
          >
            <div className="flex min-w-0 flex-col gap-1 lg:w-[266px]">
              <p className="text-base leading-[19px] font-semibold text-white">{item.name}</p>
              <p className="text-sm leading-[17px] text-white/50">{item.description}</p>
            </div>
            <p className="shrink-0 text-base leading-[19px] font-semibold text-white">
              {item.price}
            </p>
          </li>
        ))}
      </ul>

      <Rule className="mt-5" />

      <div className="mt-5 space-y-5">
        {subtotals.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-5">
            <p className="text-base leading-[19px] font-medium text-white">{row.label}</p>
            <p className="text-base leading-[19px] font-medium text-white">{row.value}</p>
          </div>
        ))}
        <div className="flex items-center justify-between gap-5">
          <p className="text-lg leading-[22px] font-semibold text-white">{total.label}</p>
          <p className="text-primary text-lg leading-[22px] font-semibold">{total.value}</p>
        </div>
      </div>

      <Rule className="mt-5" />

      <h2 className="mt-5 text-lg leading-[22px] font-semibold text-white">Payment Information</h2>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:justify-between">
        {paymentDetails.map((detail) => (
          <div key={detail.label}>
            <p className="text-base leading-[19px] text-white/50">{detail.label}</p>
            <p className="mt-2 text-base leading-[19px] font-semibold text-white">{detail.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[10px] bg-white/[0.04] p-6">
        <p className="text-lg leading-[22px] font-semibold text-white">Have you got a Questions?</p>
        <p className="mt-3 text-base leading-[19px] text-white">{support.email}</p>
        <p className="mt-2 text-base leading-[19px] text-white">{support.phone}</p>
      </div>

      <p className="mt-5 text-center text-base leading-[19px] text-white/50">
        No refunds after 14 days. See our{' '}
        <Link href="#" className="underline transition-colors hover:text-white">
          Return Policy
        </Link>
      </p>

      {/* Copyright sits left of the button on desktop; on mobile the action comes first. */}
      <div className="mt-5 flex flex-col-reverse gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-base leading-[19px] text-white/50 lg:w-[138px] lg:shrink-0">
          © Kerny 2026. All Right Reserved
        </p>
        <Button className="h-[50px] w-full shrink-0 font-medium lg:w-[200px]">
          <Download />
          Download PDF
        </Button>
      </div>
    </section>
  );
}
