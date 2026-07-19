import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const title = 'What is this VPS?';
const content =
  'Lorem ipsum dolor sit amet consectetur. Etiam mattis sed morbi sed eget dui. Purus lacus tincidunt tellus mauris lorem aliquet non. Pretium ligula interdum egestas integer. Sagittis ornare dignissim diam magna sed id sagittis. Rutrum mauris in mauris at magna.';

export function Faq() {
  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <div className="flex justify-between gap-[125px]">
        {/* Left — copy */}
        <div className="max-w-[495px] md:w-2/5">
          <h2 className="text-4xl font-bold md:text-5xl md:leading-[58px]">
            Questions,
            <br className="hidden md:block" /> answers
          </h2>
          <p className="text-foreground mt-6 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur
          </p>
          <div className="mt-8">
            <Button size="lg">Contact Us</Button>
          </div>
        </div>

        {/* Right — accordion */}
        <div className="flex align-bottom">
          <Accordion
            defaultValue={[1]}
            className="flex w-175 flex-col gap-0.5 overflow-hidden rounded-[15px]"
          >
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <AccordionItem
                key={i}
                value={i}
                className="bg-white/[0.04] px-6 not-last:border-white/[0]"
              >
                <AccordionTrigger className="py-6 text-lg font-normal hover:no-underline">
                  {title}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-tight font-normal text-white/50">
                  {content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
