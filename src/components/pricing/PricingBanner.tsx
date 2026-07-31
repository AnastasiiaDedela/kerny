import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function PricingBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pt-5 pb-10">
      <div className="relative min-h-[594px] overflow-hidden rounded-[30px] bg-[linear-gradient(149.71deg,#434CF7_0%,#262C8D_100%)] md:h-[433px] md:min-h-0 md:rounded-[50px]">
        <div className="relative z-10 flex h-full flex-col px-6 py-[30px] md:px-20 md:py-20">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-[56px] md:leading-[68px]">
            VPS Cloud Cost
            <br />
            Calculator
          </h1>
          <p className="mt-[6px] max-w-[549px] text-sm leading-[17px] text-white">
            Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
            pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
            morbi vitae enim. Rutrum fermentum in interdum faucibus cras. Non vel placerat rutrum non cras.
          </p>
          <div className="mt-[30px]">
            <Button variant="hero" size="lg" className="w-[200px] md:w-auto">
              Start Calculation
            </Button>
          </div>
        </div>

        {/* Desktop: top-right decorative image */}
        <div className="pointer-events-none absolute top-[29px] right-[-48px] hidden md:block">
          <Image
            src="/images/cloud.png"
            alt=""
            width={663}
            height={510}
            priority
          />
        </div>

        {/* Mobile: bottom decorative image */}
        <div className="pointer-events-none absolute bottom-0 left-[20px] md:hidden">
          <Image
            src="/images/cloud.png"
            alt=""
            width={462}
            height={356}
            priority
          />
        </div>
      </div>
    </section>
  );
}
