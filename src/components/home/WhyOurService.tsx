import Image from 'next/image';
import { Reveal } from '@/components/common/Reveal';

const description =
  'Lorem ipsum dolor sit amet consectetur. Fringilla eu ultrices netus viverra id mauris. Maecenas justo varius turpis lectus ultricies. Donec ullamcorper libero consectetur';

const rowDescription =
  'Lorem ipsum dolor sit amet consectetur. Adipiscing orci in sagittis dui. Aliquam quis volutpat dolor id enim. Magna lectus nulla sollicitudin eu aliquam laoreet cursus vel elementum. Risus risus tincidunt justo amet tristique duis. Lacus volutpat lacinia sed posuere fringilla a vestibulum';

type Illustration = { src: string; alt: string; width: number; height: number };

function TallCard({ title, image }: { title: string; image: Illustration }) {
  return (
    <div className="flex h-full w-full flex-row items-center gap-4 rounded-[15px] bg-[#161616] p-6 ring-1 ring-white/5 lg:flex-col lg:items-stretch">
      <div className="relative flex h-[115px] w-[120px] shrink-0 items-center justify-center lg:min-h-0 lg:h-auto lg:w-auto lg:flex-1 lg:p-7">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="relative h-[115px] w-auto max-w-full object-contain lg:h-37.5"
        />
      </div>
      <div>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-muted-foreground mt-3 text-left text-sm leading-tight font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

function RowCard({ title, image }: { title: string; image: Illustration }) {
  return (
    <div className="flex min-h-0 flex-1 flex-row items-center gap-4 rounded-[15px] bg-[#161616] p-6 ring-1 ring-white/5 md:gap-[23px] md:pl-9.5">
      <div className="relative flex h-[115px] w-[120px] shrink-0 items-center justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="relative h-[115px] w-auto max-w-full object-contain"
        />
      </div>
      <div className="w-full md:w-auto">
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2 text-left text-sm leading-tight font-normal">
          {rowDescription}
        </p>
      </div>
    </div>
  );
}

export function WhyOurService() {
  return (
    /* overflow-hidden prevents the horizontal reveals from producing a scrollbar
       while their transforms are still mid-transition. */
    <section className="mx-auto w-full max-w-340 overflow-hidden px-5 py-10">
      <Reveal>
        <div className="mx-auto text-left md:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Why Our Service?</h2>
          <p className="text-foreground mt-5 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
            maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
            penatibus malesuada sagittis luctus id
          </p>
        </div>
      </Reveal>

<<<<<<< HEAD
      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_2fr_1fr]">
=======
      <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[1fr_2fr_1fr]">
>>>>>>> main
        {/* Left column — enters from the left on desktop. */}
        <Reveal direction="left" className="h-full">
          <TallCard
            title="DDos Protection"
            image={{ src: '/images/why-ddos.png', alt: 'Shield', width: 210, height: 300 }}
          />
        </Reveal>

        {/* Middle column — top row card drops in, bottom row card rises up.
            The Reveals themselves take the flex-1 share of the column so the
            two cards keep splitting the height evenly (RowCard's own flex-1
            would be inert inside a block wrapper). */}
        <div className="flex h-full flex-col gap-6">
          <Reveal direction="down" className="flex min-h-0 flex-1">
            <RowCard
              title="Premium Equipment"
              image={{
                src: '/images/why-equipment.png',
                alt: 'Server equipment',
                width: 152,
                height: 230,
              }}
            />
          </Reveal>
          <Reveal direction="up" className="flex min-h-0 flex-1">
            <RowCard
              title="Round-The-Clock Support"
              image={{
                src: '/images/why-support.png',
                alt: 'Support team',
                width: 232,
                height: 230,
              }}
            />
          </Reveal>
        </div>

        {/* Right column — enters from the right on desktop. */}
        <Reveal direction="right" className="h-full">
          <TallCard
            title="Great Diversity Region"
            image={{ src: '/images/why-globe.png', alt: 'Globe', width: 300, height: 300 }}
          />
        </Reveal>
      </div>
    </section>
  );
}
