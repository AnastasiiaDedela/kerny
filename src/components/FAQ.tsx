"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const faqs = [
    {
      id: "item-1",
      question: "How quickly can a VPS be provisioned?",
      answer: "Most servers are ready within a few minutes after payment."
    },
    {
      id: "item-2",
      question: "Can I change my server plan later?",
      answer: "Plan changes will be handled from the workspace after launch."
    }
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Questions, answers</h2>
          <p className="text-gray-400">
            Find clear answers to common questions about our VPS service, setup process, features, and usage to get started faster.
          </p>
        </div>
        
        <Accordion className="space-y-4 mb-8">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id}
              value={faq.id}
              className="bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition px-6 py-4"
            >
              <AccordionTrigger className="text-base font-semibold text-left hover:text-blue-500 transition">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base font-semibold">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
