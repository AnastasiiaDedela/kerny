import { PaymentConfirmation } from '@/components/workspace/PaymentConfirmation';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function PaymentConfirmationPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Same 30px under the nav card as the other workspace pages: 20px gap plus this 10px. */}
      <WorkspaceMobileNav className="mb-2.5 lg:hidden" />
      <PaymentConfirmation />
    </div>
  );
}
