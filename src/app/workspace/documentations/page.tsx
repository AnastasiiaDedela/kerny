import {
  DocumentationSection,
  type DocumentationSectionItem,
} from '@/components/workspace/DocumentationSection';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

const paragraph =
  'Lorem ipsum dolor sit amet consectetur. Nec in in accumsan gravida vitae auctor malesuada integer. Turpis id arcu in quisque vitae. Leo proin volutpat varius consequat turpis sed. Malesuada odio integer ipsum aliquet. Adipiscing magnis sapien non et velit a est habitasse pellentesque. Purus id non congue elementum in lectus. Nunc eget mattis morbi fames amet justo. Amet at massa quis risus maecenas laoreet. Ornare imperdiet interdum quisque bibendum est. Nunc cursus sem iaculis elit malesuada id. Pellentesque lobortis tortor feugiat blandit vulputate. Feugiat libero aliquam in vulputate ipsum. Platea consequat nunc nisi velit mauris pellentesque adipiscing. Dui sit cras eu cras morbi.';

const sections: DocumentationSectionItem[] = [
  {
    id: 'title-of-text',
    title: 'Title of Text',
    paragraphs: Array.from({ length: 4 }, () => paragraph),
  },
];

export default function DocumentationsPage() {
  return (
    <div>
      {/* Same 30px under the nav card as the other workspace pages. */}
      <WorkspaceMobileNav className="mb-[30px] lg:hidden" />

      <h1 className="text-xl leading-6 font-semibold text-white">Documentations</h1>

      <div className="mt-4 flex flex-col gap-6 lg:mt-6">
        {sections.map((section) => (
          <DocumentationSection
            key={section.id}
            title={section.title}
            paragraphs={section.paragraphs}
          />
        ))}
      </div>
    </div>
  );
}
