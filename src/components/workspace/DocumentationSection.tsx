export interface DocumentationSectionItem {
  id: string;
  title: string;
  paragraphs: string[];
}

/* The section title only appears on desktop — the mobile screen leads straight from the page
   heading into the copy. */
export function DocumentationSection({ title, paragraphs }: Omit<DocumentationSectionItem, 'id'>) {
  return (
    <section>
      <h2 className="hidden text-lg leading-[22px] font-semibold text-white lg:block">{title}</h2>

      <div className="flex flex-col gap-2.5 lg:mt-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-base leading-6 font-medium text-white/80">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
