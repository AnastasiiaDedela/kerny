import { PricingBanner } from '@/components/pricing/PricingBanner';
import { CloudServerBuilder } from '@/components/pricing/CloudServerBuilder';
import { Faq } from '@/components/home/Faq';

export default function PricingPage() {
  return (
    <>
      <PricingBanner />
      <CloudServerBuilder />
      <Faq />
    </>
  );
}
