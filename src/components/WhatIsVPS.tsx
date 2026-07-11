"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WhatIsVPS() {
  const faqs = [
    {
      id: "what-1",
      question: "What is VPS?",
      answer: "A Virtual Private Server is a powerful hosting solution that gives you dedicated resources on a shared physical server."
    },
    {
      id: "what-2",
      question: "Why choose VPS?",
      answer: "VPS provides better performance, security, and control compared to shared hosting solutions."
    },
    {
      id: "what-3",
      question: "What are the benefits?",
      answer: "Lorem ipsum dolor sit amet consectetur. Etiam nisl sed sapien dignissim consectetur lorem diam vitae nec. Tempor."
    }
  ];

  return (
    <section className="w-full bg-gray-950 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What is VPS?</h2>
        
        <Accordion className="bg-gray-900 rounded-xl border border-gray-800 p-8">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id}
              value={faq.id}
              className="border-gray-700"
            >
              <AccordionTrigger className="text-lg font-semibold text-left hover:text-blue-500 transition">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-3">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
