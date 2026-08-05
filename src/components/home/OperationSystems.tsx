import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Os = { name: string; src: string; width: number; height: number };

/* Left and right columns scroll in opposite directions and never share a card;
   the middle column is static. */
const leftColumn: Os[] = [
  { name: 'Alma Linux', src: '/images/systems-img/alma.png', width: 160, height: 156 },
  { name: 'CentOS', src: '/images/systems-img/centos.png', width: 158, height: 158 },
  { name: 'Fedora CoreOS', src: '/images/systems-img/fedora-coreos.png', width: 156, height: 156 },
  { name: 'Rocky Linux', src: '/images/systems-img/rocky.png', width: 156, height: 156 },
  { name: 'Ubuntu', src: '/images/systems-img/ubuntu.png', width: 156, height: 156 },
  { name: 'Flatcar', src: '/images/systems-img/flatcar.png', width: 186, height: 115 },
];

const centerColumn: Os[] = [
  { name: 'Alpine Linux', src: '/images/systems-img/alpine.png', width: 180, height: 156 },
  { name: 'Debian', src: '/images/systems-img/debian.png', width: 124, height: 156 },
  { name: 'FreeBSD', src: '/images/systems-img/freebsd.png', width: 160, height: 156 },
];

const rightColumn: Os[] = [
  { name: 'Arch Linux', src: '/images/systems-img/arch.png', width: 156, height: 156 },
  { name: 'Fedora', src: '/images/systems-img/fedora.png', width: 156, height: 156 },
  { name: 'OpenBSD', src: '/images/systems-img/openbsd.png', width: 180, height: 156 },
  { name: 'openSUSE', src: '/images/systems-img/opensuse.png', width: 156, height: 156 },
  { name: 'Windows', src: '/images/systems-img/windows.png', width: 156, height: 156 },
  { name: 'PowerShell', src: '/images/systems-img/powershell.png', width: 180, height: 136 },
];

function OsCard({ name, src, width, height }: Os) {
  return (
    /* Bottom padding stands in for the column gap so the track height stays an
       exact multiple of card+gap — see the marquee keyframes in globals.css. */
    <div className="pb-(--os-gap)">
      <div className="flex size-(--os-card) flex-col items-center rounded-[15px] bg-white/[0.04] pt-(--os-inset)">
        <Image
          src={src}
          alt={name}
          width={width}
          height={height}
          className="h-(--os-logo) w-auto max-w-full object-contain"
        />
        <span className="wide:text-xs mt-(--os-label-gap) px-1 text-center text-[11px] leading-[15px] font-normal">
          {name}
        </span>
      </div>
    </div>
  );
}

function MarqueeColumn({
  items,
  direction,
  className,
}: {
  items: Os[];
  direction: 'up' | 'down';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-[calc(3*var(--os-card)+3*var(--os-gap))] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,#000_var(--os-fade),#000_calc(100%-var(--os-fade)),transparent_100%)]',
        className
      )}
    >
      <div className={direction === 'up' ? 'os-marquee-up' : 'os-marquee-down'}>
        {[...items, ...items].map((os, i) => (
          <OsCard key={`${os.name}-${i}`} {...os} />
        ))}
      </div>
    </div>
  );
}

export function OperationSystems() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="wide:flex-row wide:items-center wide:gap-16 flex flex-col gap-10">
        {/* Left — copy */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold md:text-5xl md:leading-[58px]">
            Easy Operation Systems
          </h2>
          <p className="text-foreground mt-5 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
            maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
            penatibus malesuada sagittis luctus id. Viverra faucibus neque a nisi sed cursus.
            Viverra quisque sagittis sed urna sed cursus id. Purus morbi ridiculus quam sed
            elementum. Maecenas sem arcu purus ipsum accumsan sit.
          </p>
          <div className="wide:block mt-8 hidden">
            <Button size="lg">Get Started</Button>
          </div>
        </div>

        {/* Right — OS columns */}
        <div className="os-systems shrink-0">
          <div className="os-marquee wide:justify-end flex justify-center gap-(--os-gap)">
            <MarqueeColumn items={leftColumn} direction="up" className="[--os-duration:26s]" />
            <div>
              {centerColumn.map((os) => (
                <OsCard key={os.name} {...os} />
              ))}
            </div>
            <MarqueeColumn items={rightColumn} direction="down" className="[--os-duration:32s]" />
          </div>
          <div className="wide:hidden mt-8 flex justify-center">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
