import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function PricingBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pt-5 pb-10">
      <div className="relative min-h-[594px] overflow-hidden rounded-[30px] bg-[linear-gradient(149.71deg,#434CF7_0%,#262C8D_100%)] lg:flex lg:h-[433px] lg:min-h-0 lg:flex-row lg:rounded-[50px]">

        {/* Left section */}
        <div className="relative z-10 flex flex-col px-6 py-[30px] lg:w-[53%] lg:flex-none lg:px-20 lg:py-20">
          <h1 className="text-4xl leading-tight font-bold text-white lg:text-[56px] lg:leading-[68px]">
            VPS Cloud Cost
            <br />
            Calculator
          </h1>
          <p className="mt-[6px] text-sm leading-[17px] text-white lg:max-w-[549px] lg:text-base lg:leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
            pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
            morbi vitae enim. Rutrum fermentum in interdum faucibus cras. Non vel placerat rutrum
            non cras.
          </p>
          <div className="mt-[30px]">
            <Button variant="hero" size="lg" className="w-[200px] lg:w-auto">
              Start Calculation
            </Button>
          </div>
        </div>

        {/* Right section: desktop cloud image */}
        <div className="pointer-events-none relative hidden flex-1 lg:block">
          <div className="absolute top-[29px] -right-12">
            <Image src="/images/cloud.png" alt="" width={663} height={510} priority />
          </div>
        </div>

        {/* Mobile: bottom decorative image */}
        <div className="pointer-events-none absolute right-0 bottom-0 lg:hidden">
          <Image src="/images/cloud.png" alt="" width={462} height={356} priority />
        </div>
      </div>
    </section>
  );
}
