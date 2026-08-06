'use client';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFaqItems } from '@/api/content';
import { useContactModal } from '@/components/layout/ContactModalProvider';
import { Reveal } from '@/components/common/Reveal';

export function Faq() {
  const openContactModal = useContactModal();
  const { items } = useFaqItems();

  return (
    <section className="mx-auto w-full max-w-340 px-5 py-10">
      <Reveal className="flex flex-col gap-10 min-[1121px]:flex-row min-[1121px]:justify-between min-[1121px]:gap-[125px]">
        <div className="max-w-[495px] min-[1121px]:w-2/5">
          <h2 className="text-4xl font-bold min-[1121px]:text-5xl min-[1121px]:leading-[58px]">
            Questions,
            <br className="hidden min-[1121px]:block" /> answers
          </h2>
          <p className="text-foreground mt-6 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Pellentesque malesuada gravida eget amet cursus
            sagittis. In orci tortor ut tincidunt consectetur
          </p>
          <div className="mt-8 hidden min-[1121px]:block">
            <Button size="lg" onClick={openContactModal}>
              Contact Us
            </Button>
          </div>
        </div>

        <div className="flex flex-col align-bottom">
          <Accordion
            defaultValue={[1]}
            className="flex w-full flex-col gap-0.5 overflow-hidden rounded-[15px] min-[1121px]:w-175"
          >
            {items.map((item, i) => (
              <AccordionItem key={item.id} value={i} className="bg-white/[0.04] px-6">
                <AccordionTrigger className="py-6 text-lg font-normal hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-tight font-normal text-white/50">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 min-[1121px]:hidden">
            <Button
              size="lg"
              className="h-14 w-full max-w-88 md:max-w-none"
              onClick={openContactModal}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
