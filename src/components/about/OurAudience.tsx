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
    <div className="flex items-center justify-between gap-11 rounded-[15px] bg-[#161616] py-6 pr-8.25 pl-6 ring-1 ring-white/5">
      <div>
        <h3 className="text-base leading-[22px] font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2 text-left text-sm leading-tight font-normal">
          {description}
        </p>
      </div>
      <div className="flex w-24 shrink-0 items-center justify-center">
        <Image
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
          className="h-auto w-full max-w-16 object-contain md:max-w-20"
        />
      </div>
    </div>
  );
}

export function OurAudience() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 pb-10">
      <div className="mx-auto text-left md:text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Our Audience</h1>
        <p className="text-foreground mx-auto mt-5 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
          sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor
          maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget
          penatibus malesuada sagittis luctus id.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {audiences.map((audience) => (
          <AudienceCard key={audience.title} {...audience} />
        ))}
      </div>
    </section>
  );
}
