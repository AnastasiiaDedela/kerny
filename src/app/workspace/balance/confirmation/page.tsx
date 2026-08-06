import { PaymentConfirmation } from '@/components/workspace/PaymentConfirmation';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function PaymentConfirmationPage() {
  return (
    <div className="flex flex-col gap-5">
      <WorkspaceMobileNav className="mb-2.5 lg:hidden" />
      <PaymentConfirmation />
    </div>
  );
}
