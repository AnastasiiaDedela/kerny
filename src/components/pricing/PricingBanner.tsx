import Image from 'next/image';
import { GetStartedButton } from '@/components/common/GetStartedButton';

export function PricingBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-[10px] pt-5 pb-10 lg:px-5">
      <div className="relative min-h-[594px] overflow-hidden rounded-[30px] bg-[linear-gradient(149.71deg,#434CF7_0%,#262C8D_100%)] xl:min-h-[433px] xl:rounded-[50px] xl:bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)]">
        <div className="relative z-10 w-full px-5 pt-[30px] xl:w-[709px] xl:max-w-[calc(100%-535px)] xl:px-20 xl:pt-20">
          <h1 className="text-[36px] leading-[44px] font-bold text-white xl:text-[56px] xl:leading-[68px]">
            VPS Cloud Cost
            <br />
            Calculator
          </h1>
          <p className="mt-[10px] text-sm leading-[17px] font-normal text-white xl:mt-[6px]">
            Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
            pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
            morbi vitae enim
            <span className="xl:hidden">
              . Rutrum fermentum in interdum faucibus cras. Non vel placerat rutrum non cras.
            </span>
          </p>
          <div className="mt-5 xl:mt-[30px]">
            <GetStartedButton
              variant="hero"
              size="lg"
              href="/workspace/new-server"
              className="h-[50px] text-sm leading-[17px] font-semibold text-[#3940D3] max-xl:w-[200px] xl:w-[160px]"
            >
              Start Calculation
            </GetStartedButton>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-[76px] -bottom-[11px] h-[282px] w-[429px] xl:right-0 xl:bottom-0 xl:h-[404px] xl:w-[615px]">
          <Image
            src="/images/cloud.png"
            alt=""
            fill
            sizes="615px"
            priority
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
}
