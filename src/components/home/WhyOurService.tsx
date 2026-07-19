import Image from 'next/image';

const description =
  'Lorem ipsum dolor sit amet consectetur. Fringilla eu ultrices netus viverra id mauris. Maecenas justo varius turpis lectus ultricies. Donec ullamcorper libero consectetur';

const rowDescription =
  'Lorem ipsum dolor sit amet consectetur. Adipiscing orci in sagittis dui. Aliquam quis volutpat dolor id enim. Magna lectus nulla sollicitudin eu aliquam laoreet cursus vel elementum. Risus risus tincidunt justo amet tristique duis. Lacus volutpat lacinia sed posuere fringilla a vestibulum';

type Illustration = { src: string; alt: string; width: number; height: number };

function TallCard({ title, image }: { title: string; image: Illustration }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[15px] bg-[#161616] p-6 ring-1 ring-white/5">
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-7">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="relative h-37.5 w-auto object-contain"
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
    <div className="flex min-h-0 flex-1 flex-col items-center gap-4 rounded-[15px] bg-[#161616] p-6 ring-1 ring-white/5 md:flex-row md:gap-[23px] md:pl-9.5">
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
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="mx-auto text-left md:text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Why Our Service?</h2>
        <p className="text-foreground mt-5 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
          sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
          maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
          penatibus malesuada sagittis luctus id
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[1fr_2fr_1fr]">
        <TallCard
          title="DDos Protection"
          image={{ src: '/images/why-ddos.png', alt: 'Shield', width: 210, height: 300 }}
        />

        <div className="flex h-full flex-col gap-6">
          <RowCard
            title="Premium Equipment"
            image={{
              src: '/images/why-equipment.png',
              alt: 'Server equipment',
              width: 152,
              height: 230,
            }}
          />
          <RowCard
            title="Round-The-Clock Support"
            image={{
              src: '/images/why-support.png',
              alt: 'Support team',
              width: 232,
              height: 230,
            }}
          />
        </div>

        <TallCard
          title="Great Diversity Region"
          image={{ src: '/images/why-globe.png', alt: 'Globe', width: 300, height: 300 }}
        />
      </div>
    </section>
  );
}
