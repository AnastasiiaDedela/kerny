import Image from 'next/image';

const description =
  'Lorem ipsum dolor sit amet consectetur. At diam sed aliquet porta odio volutpat urna malesuada. Iaculis cursus aliquet justo ultrices fringilla rhoncus commodo. Eleifend lacus lacinia quis ridiculus diam aenean mi. Suspendisse eget';

type Audience = {
  title: string;
  icon: { src: string; alt: string; width: number; height: number };
};

const audiences: Audience[] = [
  {
    title: 'Freelancers',
    icon: {
      src: '/images/about-us-img/audience-freelancers.png',
      alt: 'Laptop',
      width: 160,
      height: 124,
    },
  },
  {
    title: 'Gamers',
    icon: {
      src: '/images/about-us-img/audience-gamers.png',
      alt: 'Gamepad',
      width: 160,
      height: 160,
    },
  },
  {
    title: 'Content Creators',
    icon: {
      src: '/images/about-us-img/audience-creators.png',
      alt: 'Media content',
      width: 160,
      height: 160,
    },
  },
  {
    title: 'Developers',
    icon: {
      src: '/images/about-us-img/audience-developers.png',
      alt: 'Code brackets',
      width: 160,
      height: 160,
    },
  },
];

function AudienceCard({ title, icon }: Audience) {
  return (
    <div className="flex flex-col gap-6 rounded-[15px] bg-white/4 p-6 md:flex-row md:items-center md:justify-between md:gap-14 md:py-6 md:pr-8.25 md:pl-6">
      <div className="order-2 w-full md:order-1 md:w-auto">
        <h3 className="text-lg leading-[22px] font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2 text-left text-sm leading-[17px] font-normal">
          {description}
        </p>
      </div>
      <div className="order-1 flex w-full shrink-0 items-center justify-center md:order-2 md:w-20">
        <Image
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
          className="h-27 w-auto object-contain md:h-auto md:w-full md:max-w-20"
        />
      </div>
    </div>
  );
}

export function OurAudience() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pb-10">
      <div className="mx-auto text-left md:text-center">
        <h1 className="text-4xl font-bold md:text-5xl md:leading-[58px]">Our Audience</h1>
        <p className="text-foreground mx-auto mt-2.5 text-sm leading-6">
          Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
          sagittis. In orci tortor ut tincidunt consectetur
          <span className="max-md:hidden">
            {' '}
            elementum suspendisse sed. Auctor maecenas consectetur pharetra ut dui morbi. Elementum
            amet dignissim diam dui sed. Eget penatibus malesuada sagittis luctus id.
          </span>
        </p>
      </div>

      <div className="mt-7.5 grid gap-x-5 gap-y-6 md:grid-cols-2">
        {audiences.map((audience) => (
          <AudienceCard key={audience.title} {...audience} />
        ))}
      </div>
    </section>
  );
}
