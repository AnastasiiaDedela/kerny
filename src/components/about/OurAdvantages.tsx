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
              className="data-open:border-l-primary border-0 transition-all data-open:border-l-3 data-open:pl-4"
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

        <div className="flex aspect-[610/364] w-full max-w-[610px] items-center justify-center justify-self-center rounded-[20px] bg-[radial-gradient(ellipse_at_center,#2B237C_0%,#180D5B_100%)] p-6 md:justify-self-end">
          <Image
            src="/images/about-us-img/advantages-laptops.png"
            alt="Laptops connected to a cloud network"
            width={956}
            height={670}
            className="h-full w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
