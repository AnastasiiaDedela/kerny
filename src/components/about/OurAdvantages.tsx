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
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Our Advantages</h2>
      <p className="text-foreground mt-5 text-sm leading-relaxed">
        Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
        sagittis. In orci tortor ut tincidunt consectetur elementum suspendisse sed. Auctor maecenas
        consectetur pharetra ut dui morbi. Elementum amet dignissim diam dui sed. Eget penatibus
        malesuada sagittis luctus id.
      </p>

      <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Accordion defaultValue={[0]} className="flex w-full flex-col gap-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <AccordionItem
              key={item}
              value={item}
              className="data-open:border-l-primary transition-all data-open:border-l-3 data-open:pl-4"
            >
              <AccordionTrigger className="py-2 text-lg font-normal hover:no-underline aria-expanded:font-bold **:data-[slot=accordion-trigger-icon]:hidden">
                {title}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed font-normal text-white/70">
                {content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="relative aspect-[610/364] w-full max-w-[610px] justify-self-center rounded-[30px] bg-[radial-gradient(44.19%_58.93%_at_23.5%_34%,#2D2381_0%,#1A0C5F_100%)] md:justify-self-end">
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
