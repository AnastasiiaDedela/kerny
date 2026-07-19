import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function WhatIsVps() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="flex items-center gap-x-12">
        {/* Left — illustration on blue platform */}
        <div className="flex w-full max-w-[514px] flex-1 items-center justify-center">
          <div className="relative mx-auto w-full">
            {/* Blue gradient platform in the bottom half — Figma: 514×215, radius 20,
                180deg linear gradient #434CF7 (transparent 0% → 16% opacity) */}
            <div className="absolute bottom-0 left-0 aspect-[514/215] w-full translate-y-[76px] rounded-[20px] bg-[linear-gradient(180deg,rgba(67,76,247,0)_0%,rgba(67,76,247,0.16)_100%)]" />
            <Image
              src="/images/what-is-vps.png"
              alt="Isometric illustration of a VPS server node"
              width={716}
              height={552}
              className="relative z-10 mx-auto block h-auto w-full max-w-[358px]"
            />
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex-1 md:text-right">
          <h2 className="text-4xl leading-14.5 font-bold md:text-5xl">What Is A VPS?</h2>
          <p className="text-foreground mt-6 text-sm leading-6 font-normal">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
            maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
            penatibus malesuada sagittis luctus id. Viverra faucibus neque a nisi sed cursus.
            Viverra quisque sagittis sed urna sed cursus id. Purus morbi ridiculus quam sed
            elementum. Maecenas sem arcu purus ipsum accumsan sit.
          </p>
          <p className="text-foreground mt-4 text-sm leading-6 font-normal">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
            maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
            penatibus malesuada sagittis luctus id. Viverra faucibus neque a nisi sed cursus.
            Viverra quisque sagittis sed urna sed cursus id. Purus morbi ridiculus quam sed
            elementum. Maecenas sem arcu purus ipsum accumsan sit.
          </p>
          <div className="mt-8 md:flex md:justify-end">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
