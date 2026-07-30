import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function PricingBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pt-5 pb-10">
      <div className="relative min-h-[300px] overflow-hidden rounded-[20px] bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)] md:h-[433px] md:rounded-[50px]">
        <div className="relative z-10 flex h-full flex-col px-6 py-10 md:px-20 md:py-20">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-[56px] md:leading-[68px]">
            VPS Cloud Cost
            <br />
            Calculator
          </h1>
          <p className="mt-[6px] max-w-[549px] text-sm leading-[17px] text-white">
            Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
            pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
            morbi vitae enim
          </p>
          <div className="mt-[30px]">
            <Button variant="hero" size="lg">
              Start Calculation
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute top-[29px] right-[-48px] hidden md:block">
          <Image
            src="/images/cloud.png"
            alt=""
            width={663}
            height={510}
            priority
          />
        </div>
      </div>
    </section>
  );
}
