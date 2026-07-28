import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const title = 'Title of Advantage';
const content =
  'Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor maecenas consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget penatibus malesuada sagittis luctus id.';

export function OurAdvantages() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <h2 className="text-4xl font-bold md:text-5xl md:leading-[58px]">Our Advantages</h2>
      <p className="text-foreground mt-2.5 text-sm leading-6">
        Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
        sagittis. In orci tortor ut tincidunt consectetur
        {/* Figma trims the intro copy to three lines on mobile */}
        <span className="max-md:hidden">
          {' '}
          elementum suspendisse sed. Auctor maecenas consectetur pharetra ut dui morbi. Elementum
          amet dignissim diam dui sed. Eget penatibus malesuada sagittis luctus id.
        </span>
      </p>

      <div className="mt-7.5 grid items-center gap-10 md:grid-cols-[minmax(0,680fr)_minmax(0,610fr)] md:gap-7.5">
        <Accordion defaultValue={[0]} className="order-2 flex w-full flex-col gap-3 md:order-1">
          {[0, 1, 2, 3, 4].map((item) => (
            <AccordionItem
              key={item}
              value={item}
              className="data-open:border-l-primary transition-all data-open:border-l-2 data-open:pl-4.5"
            >
              <AccordionTrigger className="py-2 text-lg leading-[22px] font-medium hover:no-underline aria-expanded:font-semibold **:data-[slot=accordion-trigger-icon]:hidden">
                {title}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-[17px] font-normal text-white/80">
                {content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="relative order-1 aspect-[353/260] w-full max-w-[610px] justify-self-center rounded-[30px] bg-[radial-gradient(44.19%_58.93%_at_23.5%_34%,#2D2381_0%,#1A0C5F_100%)] md:order-2 md:aspect-[610/364] md:justify-self-end">
          {/* Figma insets the artwork 10.82% horizontally and ~4% vertically */}
          <Image
            src="/images/about-us-img/advantages-laptops.png"
            alt="Laptops connected to a cloud network"
            width={956}
            height={670}
            quality={100}
            className="absolute top-1/2 left-1/2 w-[78.36%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
}
