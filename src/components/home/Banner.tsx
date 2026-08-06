import Image from 'next/image';
import { GetStartedButton } from '@/components/common/GetStartedButton';
import { HeroServerScene } from '@/components/home/HeroServerScene';
import { CountUp } from '@/components/home/CountUp';

const chips = ['#Reability', '#DDoS Protection', '#Performance'];

export function Banner() {
  return (
    <section className="mx-auto w-full max-w-340 px-[10px] pb-10 md:px-5">
      <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(149.71deg,#434CF7_0%,#262C8D_100%)] lg:rounded-[50px] lg:bg-[linear-gradient(102.39deg,#434CF7_0%,#262C8D_100%)]">
        <div className="flex flex-col items-center gap-8 px-5 py-[30px] md:flex-row md:gap-6 md:px-12 md:py-14 lg:px-20 lg:py-[50px]">
          <div className="flex-1 text-white lg:w-[549px] lg:max-w-full lg:flex-none">
            <div className="banner-chips flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-[8px] bg-white/8 px-2.5 py-[7.5px] text-xs leading-[15px] font-medium text-white/50"
                >
                  {chip}
                </span>
              ))}
            </div>

            <h1 className="banner-heading mt-4 text-[36px] leading-[44px] font-bold tracking-normal md:mt-6 md:text-5xl md:leading-[1.1] md:font-extrabold md:tracking-tight lg:mt-2 lg:text-[56px] lg:leading-[64px] lg:font-bold lg:tracking-normal">
              Vps Service —<br /> MVP That Actually <br /> Works
            </h1>

            <p className="banner-text mt-4 text-sm leading-[17px] text-white md:mt-5 md:leading-relaxed md:text-white/80 lg:mt-3 lg:leading-[17px] lg:text-white">
              Lorem ipsum dolor sit amet consectetur. Quam purus proin diam nunc. Sed auctor in
              pellentesque augue volutpat mauris in facilisis. Feugiat a amet commodo commodo magna
              morbi vitae enim. Rutrum fermentum ac interdum faucibus cras. Non vel placerat rutrum
              non cras.
            </p>

            <div className="banner-actions mt-5 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4 lg:mt-[30px] lg:gap-3">
              <GetStartedButton
                variant="hero"
                size="lg"
                className="w-[200px] text-sm font-semibold md:w-auto md:text-base md:font-medium lg:w-[160px] lg:text-sm lg:font-semibold"
              >
                Get Started
              </GetStartedButton>
              <div className="banner-servers flex h-[50px] w-[200px] items-center gap-2.5 rounded-[10px] bg-white/6 py-2 pr-12.75 pl-3.5 md:h-auto md:w-auto md:rounded-md lg:h-[50px] lg:w-[183px] lg:rounded-[10px]">
                <span className="flex items-center justify-center">
                  <Image src="/icons/server-rack.svg" alt="" width={28} height={28} />
                </span>
                <span className="leading-tight">
                  <CountUp
                    value={15465}
                    className="block text-sm leading-[17px] font-bold text-white"
                  />
                  <span className="block text-xs leading-[15px] text-white/50">active servers</span>
                </span>
              </div>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center min-[1005px]:flex">
            <HeroServerScene className="w-full max-w-[420px] md:max-w-[528px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
