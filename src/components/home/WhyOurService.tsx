import Image from 'next/image';
import { Reveal } from '@/components/common/Reveal';
import { cn } from '@/lib/utils';

const description =
  'Lorem ipsum dolor sit amet consectetur. Fringilla eu ultrices netus viverra id mauris. Maecenas justo varius turpis lectus ultricies. Donec ullamcorper libero consectetur';

const rowDescription =
  'Lorem ipsum dolor sit amet consectetur. Adipiscing orci in sagittis dui. Aliquam quis volutpat dolor id enim. Magna nulla nulla sollicitudin eu aliquam laoreet cursus vel elementum. Risus risus tincidunt justo amet tristique duis. Lacus volutpat lacinia sed posuere fringilla a vestibulum';

const bodyCopy =
  'text-muted-foreground mt-2 text-left text-[14px] leading-[17px] font-normal md:mt-3 md:text-sm md:leading-tight';

type Illustration = { src: string; alt: string; width: number; height: number };

function CardBody({
  title,
  image,
  desktopDescription,
  mediaClassName,
  imageClassName,
}: {
  title: string;
  image: Illustration;
  desktopDescription?: string;
  mediaClassName?: string;
  imageClassName?: string;
}) {
  return (
    <>
      <div
        className={cn(
          'flex h-[164px] shrink-0 items-center justify-center md:h-[115px] md:w-[120px] md:flex-none',
          mediaClassName
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={cn('h-[164px] w-auto max-w-full object-contain md:h-[115px]', imageClassName)}
        />
      </div>
      <div className="mt-[30px] md:mt-0">
        <h3 className="text-[18px] leading-[22px] font-semibold md:text-base md:leading-normal md:font-bold">
          {title}
        </h3>
        <p className={cn(bodyCopy, desktopDescription && 'lg:hidden')}>{description}</p>
        {desktopDescription && (
          <p className={cn(bodyCopy, 'hidden lg:block')}>{desktopDescription}</p>
        )}
      </div>
    </>
  );
}

function TallCard(props: { title: string; image: Illustration }) {
  return (
    <div className="flex h-[346px] w-full flex-col rounded-[15px] bg-white/[0.04] px-6 pt-[30px] pb-6 md:h-full md:flex-row md:items-center md:gap-[31px] md:bg-[#161616] md:p-6 md:ring-1 md:ring-white/5 lg:flex-col lg:items-stretch lg:gap-4">
      <CardBody
        {...props}
        mediaClassName="md:p-0 lg:h-auto lg:w-auto lg:flex-1 lg:p-7"
        imageClassName="lg:h-37.5"
      />
    </div>
  );
}

function RowCard(props: { title: string; image: Illustration }) {
  return (
    <div className="flex h-[346px] w-full flex-col rounded-[15px] bg-white/[0.04] px-6 pt-[30px] pb-6 md:h-auto md:min-h-0 md:w-auto md:flex-1 md:flex-row md:items-center md:gap-[31px] md:bg-[#161616] md:p-6 md:ring-1 md:ring-white/5">
      <CardBody {...props} desktopDescription={rowDescription} />
    </div>
  );
}

export function WhyOurService() {
  return (
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

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_2fr_1fr]">
        <Reveal direction="left" className="h-full">
          <TallCard
            title="DDos Protection"
            image={{ src: '/images/why-ddos.png', alt: 'Shield', width: 210, height: 300 }}
          />
        </Reveal>

        <div className="flex h-full flex-col gap-5 md:gap-6">
          <Reveal direction="down" className="md:flex md:min-h-0 md:flex-1">
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
          <Reveal direction="up" className="md:flex md:min-h-0 md:flex-1">
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
