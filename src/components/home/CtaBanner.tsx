import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GetStartedButton } from '@/components/common/GetStartedButton';
import { Reveal } from '@/components/common/Reveal';

export function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="relative overflow-hidden rounded-[20px] bg-[#434CF7] bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)] p-6 md:rounded-[50px] md:p-15">
        {/* Dotted world map decoration */}
        <Image
          src="/images/world-dots.png"
          alt=""
          width={1830}
          height={500}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 [mask-image:linear-gradient(to_right,transparent,black_40%)] object-cover object-left opacity-50 mix-blend-screen"
        />
        <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-8">
          {/* Headline enters from the left; button enters from the right. The
              button wrapper carries md:shrink-0 so it keeps the original flex
              behavior now that the button isn't the direct flex child. */}
          <Reveal direction="left">
            <div className="flex flex-col gap-1 md:gap-2.5">
              <h2 className="max-w-md text-[32px] leading-[39px] font-semibold text-white md:text-5xl md:leading-[58px]">
                Join the Future Of
              </h2>
              <h2 className="max-w-md text-[32px] leading-[39px] font-semibold text-white md:text-5xl md:leading-[58px]">
                VPS Today!
              </h2>
            </div>
          </Reveal>

          <Reveal direction="right" className="md:shrink-0">
            <GetStartedButton
              variant="default"
              size="lg"
              className="min-w-[150px] shrink-0 text-sm font-medium max-md:w-[200px]"
            >
              Get Started <ArrowRight className="size-4" />
            </GetStartedButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
