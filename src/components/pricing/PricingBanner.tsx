import Image from 'next/image';
import { Button } from '@/components/ui/button';

/* The Figma banner is 1320×433 with the cloud group at left 705 / top 29, sized
   662.6×509.32 — so it bleeds 47.6px past the right edge and 105.32px past the
   bottom. `cloud.png` is already that visible crop (615×404 @2x), which is why
   the desktop placement is a plain bottom-right anchor at 615×404.

   Mobile scales the same artwork by 462.25/662.6 = 0.6977 → 429×282, placed at
   left 20 / top 323 in the 373×594 banner, i.e. 76px past the right edge and
   11px past the bottom. Both tiers stay anchored to the bottom-right so the
   image keeps touching those two borders at any width.

   The row layout needs 80 (padding) + 549 (paragraph) + 615 (cloud) = 1244px of
   banner to keep the Figma gap from collapsing, so it only turns on at `xl`;
   below that the section stacks and the paragraph stretches full width. */

export function PricingBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-[10px] pt-5 pb-10 lg:px-5">
      <div className="relative min-h-[594px] overflow-hidden rounded-[30px] bg-[linear-gradient(149.71deg,#434CF7_0%,#262C8D_100%)] xl:min-h-[433px] xl:rounded-[50px] xl:bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)]">
        {/* 709 = 80 padding + the 549 paragraph + 80 padding. Between `xl` and the
            1320 banner the cap keeps the text clear of the 615-wide cloud (615 less
            the block's own 80 right padding) instead of running under it. */}
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
          {/* Both button widths sit behind a variant: plain `w-[200px]` and
              `xl:w-[160px]` sort unreliably against each other. */}
          <div className="mt-5 xl:mt-[30px]">
            <Button
              variant="hero"
              size="lg"
              className="h-[50px] text-sm leading-[17px] font-semibold text-[#3940D3] max-xl:w-[200px] xl:w-[160px]"
            >
              Start Calculation
            </Button>
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
