import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Os = { name: string; src: string; width: number; height: number };

const systems: Os[] = [
  { name: 'Alma Linux', src: '/images/systems-img/alma.png', width: 160, height: 156 },
  { name: 'Alpine Linux', src: '/images/systems-img/alpine.png', width: 180, height: 156 },
  { name: 'Arch Linux', src: '/images/systems-img/arch.png', width: 156, height: 156 },
  { name: 'CentOS', src: '/images/systems-img/centos.png', width: 158, height: 158 },
  { name: 'Debian', src: '/images/systems-img/debian.png', width: 124, height: 156 },
  { name: 'Fedora', src: '/images/systems-img/fedora.png', width: 156, height: 156 },
  { name: 'Fedora CoreOS', src: '/images/systems-img/fedora-coreos.png', width: 156, height: 156 },
  { name: 'FreeBSD', src: '/images/systems-img/freebsd.png', width: 160, height: 156 },
  { name: 'OpenBSD', src: '/images/systems-img/openbsd.png', width: 180, height: 156 },
];

function OsCard({ name, src, width, height }: Os) {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[15px] bg-[#161616] ring-1 ring-white/5 md:aspect-auto md:size-[152px] md:gap-3">
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        className="max-h-12 w-auto md:max-h-19.5"
      />
      <span className="text-center text-xs font-medium">{name}</span>
    </div>
  );
}

export function OperationSystems() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
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
          <div className="mt-8 hidden md:block">
            <Button size="lg">Get Started</Button>
          </div>
        </div>

        {/* Right — OS grid */}
        <div className="shrink-0">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-[repeat(3,152px)] md:justify-end md:gap-5">
            {systems.map((os) => (
              <OsCard key={os.name} {...os} />
            ))}
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
