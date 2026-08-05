import { Button } from '@/components/ui/button';
import { VpsServerScene } from '@/components/home/VpsServerScene';

export function WhatIsVps() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-x-12">
        <div className="order-2 mx-auto flex w-full max-w-[514px] flex-1 items-center justify-center pb-19 md:order-1 md:mx-0 md:pb-0">
          <div className="relative mx-auto w-full">
            <div className="absolute bottom-0 left-0 aspect-[514/215] w-full translate-y-[76px] rounded-[20px] bg-[linear-gradient(180deg,rgba(67,76,247,0)_0%,rgba(67,76,247,0.16)_100%)]" />
            <VpsServerScene className="relative z-10 mx-auto w-full max-w-[358px]" />
          </div>
        </div>

        {/* Right — copy */}
        <div className="order-1 flex-1 md:order-2 md:text-right">
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
