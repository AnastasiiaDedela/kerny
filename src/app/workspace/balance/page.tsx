import { BalanceOverview } from '@/components/workspace/BalanceOverview';
import { PaymentMethodForm } from '@/components/workspace/PaymentMethodForm';
import { WorkspaceMobileNav } from '@/components/workspace/WorkspaceSidebar';

export default function BalancePage() {
  return (
    <div className="flex flex-col gap-5">
      {/* The design leaves 30px under the nav card — the column's 20px gap plus this 10px. */}
      <WorkspaceMobileNav className="mb-2.5 lg:hidden" />
      <BalanceOverview />
      <PaymentMethodForm />
    </div>
  );
}
