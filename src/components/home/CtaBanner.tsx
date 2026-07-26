import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="relative overflow-hidden rounded-[50px] bg-[#434CF7] bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)] px-8 py-10 md:p-15">
        {/* Dotted world map decoration */}
        <Image
          src="/images/world-dots.png"
          alt=""
          width={1830}
          height={500}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 [mask-image:linear-gradient(to_right,transparent,black_40%)] object-cover object-left opacity-50 mix-blend-screen"
        />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-2.5">
            <h2 className="max-w-md text-4xl font-semibold text-white md:text-5xl md:leading-[58px]">
              Join the Future Of
            </h2>
            <h2 className="max-w-md text-4xl font-semibold text-white md:text-5xl md:leading-[58px]">
              VPS Today!
            </h2>
          </div>

          <Button
            variant="default"
            size="lg"
            className="min-w-[150px] shrink-0 text-sm font-medium"
          >
            Get Started <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
