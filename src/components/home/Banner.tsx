import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroServerScene } from '@/components/home/HeroServerScene';

const chips = ['#Reliability', '#DDoS Protection', '#Performance'];

export function Banner() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-[#454CEE] bg-gradient-to-br from-[#454cee] to-[#272b88]">
        <div className="flex flex-col items-center gap-8 px-6 py-8 md:flex-row md:gap-6 md:px-12 md:py-14">
          {/* Left — copy */}
          <div className="flex-1 text-white">
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-[8px] bg-white/10 px-2.5 py-[7.5px] text-xs font-medium text-white/50"
                >
                  {chip}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-tight md:text-5xl">
              Vps Service —<br className="hidden md:block" /> MVP That Actually Works
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80">
              Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
              pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
              morbi vitae enim. Rutrum fermentum ac interdum faucibus cras. Non vel placerat rutrum
              non cras.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="hero" size="lg">
                Get Started
              </Button>
              <div className="flex items-center gap-2.5 rounded-md bg-white/10 py-2 pr-12.75 pl-3.5">
                <span className="flex items-center justify-center">
                  <Image
                    src="/icons/server-rack.svg"
                    alt=""
                    width={28}
                    height={28}
                    // className="size-5"
                  />
                </span>
                <span className="leading-tight">
                  <span className="text-md block font-bold text-white">15 465</span>
                  <span className="block text-xs text-white/70">active servers</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <HeroServerScene className="w-full max-w-[420px] md:max-w-[528px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
