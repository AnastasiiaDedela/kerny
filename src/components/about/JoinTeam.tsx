import Image from 'next/image';
import { Button } from '@/components/ui/button';

const headlineClasses =
  // Below md the headline is locked to two lines, so it scales with the viewport
  // (30px at the 393px design frame) instead of clipping on narrower phones.
  'text-[clamp(1.875rem,5.21vw,100px)] leading-[1.21] font-extrabold uppercase max-md:text-[min(30px,7.63vw)] max-md:leading-[1.2] max-md:whitespace-nowrap';

function Headline() {
  return (
    <>
      Join the Kerny Team?
      <br />
      We are waiting!
    </>
  );
}

// Two squares skewed by matrix(0.87, ±0.48, ∓0.83, 0.56) so their corners point at
// each other. Figma reports each layer's *visual* bounding box, while the transform
// runs from the untransformed origin, so the offsets below are pre-corrected by the
// bbox delta (0.48 * side vertically for the left wedge, 0.83 * side horizontally
// for the right one).

// Desktop: sizes and offsets are ratios of the side length, so the pair keeps the
// design proportions at any width; it is exact at the 1920px design frame.
const WEDGE = 'clamp(280px, 34.98vw, 671.68px)';

function DesktopWedges() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 max-md:hidden">
      <div
        className="absolute"
        style={{
          width: WEDGE,
          height: WEDGE,
          borderRadius: `calc(${WEDGE} * 0.0893)`,
          left: `calc(50% - ${WEDGE} * 2.3033)`,
          top: `calc(50% - ${WEDGE} * 0.04)`,
          transformOrigin: '0 0',
          transform: 'matrix(0.87, -0.48, 0.83, 0.56, 0, 0)',
          backgroundImage: 'linear-gradient(165.94deg, #434CF7 -1.77%, #262C8D 100.21%)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: WEDGE,
          height: WEDGE,
          borderRadius: `calc(${WEDGE} * 0.0893)`,
          left: `calc(50% + ${WEDGE} * 1.4331)`,
          top: `calc(50% - ${WEDGE} * 0.52)`,
          transformOrigin: '0 0',
          transform: 'matrix(0.87, 0.48, -0.83, 0.56, 0, 0)',
          backgroundImage: 'linear-gradient(217.21deg, #434CF7 6.3%, #262C8D 98.58%)',
        }}
      />
    </div>
  );
}

// Mobile: 254.28px squares placed so their visual boxes land at Figma's
// (-307, 0) and (277, 97) within the 362px block of the 393px frame.
const WEDGE_SM = '254.28px';

function MobileWedges() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 md:hidden">
      <div
        className="absolute"
        style={{
          width: WEDGE_SM,
          height: WEDGE_SM,
          borderRadius: '50px',
          left: 'calc(50% - 503.5px)',
          top: '122.05px',
          transformOrigin: '0 0',
          transform: 'matrix(0.87, -0.48, 0.83, 0.56, 0, 0)',
          backgroundImage: 'linear-gradient(165.94deg, #434CF7 -1.77%, #262C8D 100.21%)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: WEDGE_SM,
          height: WEDGE_SM,
          borderRadius: '60px',
          left: 'calc(50% + 291.55px)',
          top: '97px',
          transformOrigin: '0 0',
          transform: 'matrix(0.87, 0.48, -0.83, 0.56, 0, 0)',
          backgroundImage: 'linear-gradient(217.21deg, #434CF7 6.3%, #262C8D 98.58%)',
        }}
      />
    </div>
  );
}

export function JoinTeam() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      {/* Mobile drops the gutter so the 363px headline can sit centred in the 393px frame */}
      <div className="relative mx-auto flex h-[362px] w-full max-w-340 flex-col items-center justify-center px-5 max-md:justify-start max-md:px-0 max-md:pt-[145px] md:h-[560px] lg:h-[702px]">
        <DesktopWedges />
        <MobileWedges />

        {/* Server rack — above the solid headline, below the outlined copy */}
        <Image
          src="/images/about-us-img/team-server.png"
          alt=""
          aria-hidden
          width={812}
          height={1364}
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[302px] w-auto -translate-x-1/2 -translate-y-1/2 md:h-[544px] lg:h-[682px]"
        />

        <div className="relative text-center">
          <h2 className={`${headlineClasses} text-white`}>
            <Headline />
          </h2>
          {/* Outlined duplicate rendered over the server image */}
          <div
            aria-hidden
            className={`${headlineClasses} absolute inset-0 z-20 text-transparent [-webkit-text-stroke:1px_#ffffff]`}
          >
            <Headline />
          </div>
        </div>

        <Button
          variant="hero"
          size="lg"
          className="z-30 mt-6 h-[60px] w-[200px] text-base font-semibold text-[#3940D3] max-md:mt-[31px] max-md:h-[50px] lg:mt-[30px]"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
