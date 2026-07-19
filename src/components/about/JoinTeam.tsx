import Image from 'next/image';
import { Button } from '@/components/ui/button';

const headlineClasses =
  'text-[40px] leading-[1.15] font-extrabold tracking-tight uppercase md:text-7xl lg:text-[88px]';

function Headline() {
  return (
    <>
      Join the Kerny Team?
      <br />
      We are waiting!
    </>
  );
}

export function JoinTeam() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      {/* Blue side triangles */}
      <div
        aria-hidden
        className="absolute top-0 left-0 h-full w-[38%] bg-[linear-gradient(90deg,#434CF7_0%,#262C8D_100%)] [clip-path:polygon(0_0,100%_50%,0_100%)] md:w-[30%]"
      />
      <div
        aria-hidden
        className="absolute top-0 right-0 h-full w-[38%] bg-[linear-gradient(270deg,#434CF7_0%,#262C8D_100%)] [clip-path:polygon(100%_0,0_50%,100%_100%)] md:w-[30%]"
      />

      <div className="relative mx-auto w-full max-w-340 px-5">
        <div className="relative flex min-h-[440px] flex-col items-center justify-center md:min-h-[820px]">
          {/* Server rack — above the solid headline, below the outlined copy */}
          <Image
            src="/images/about-us-img/team-server.png"
            alt=""
            aria-hidden
            width={812}
            height={1364}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[440px] w-auto -translate-x-1/2 -translate-y-1/2 md:h-[820px]"
          />

          <div className="relative text-center">
            <h2 className={`${headlineClasses} text-white`}>
              <Headline />
            </h2>
            {/* Outlined duplicate rendered over the server image */}
            <div
              aria-hidden
              className={`${headlineClasses} absolute inset-0 z-20 text-transparent [-webkit-text-stroke:2px_#ffffff]`}
            >
              <Headline />
            </div>
          </div>

          <Button variant="hero" size="lg" className="z-30 mt-8 md:mt-12">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
