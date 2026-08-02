import { BalanceOverview } from '@/components/workspace/BalanceOverview';
import { PaymentMethodForm } from '@/components/workspace/PaymentMethodForm';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';

const history: HistoryEntry[] = Array.from({ length: 9 }, (_, i) => ({
  id: `entry-${i}`,
  action: 'Service extension #151',
  time: '03.02.2026 00:30:55',
  amount: '€ -999.00',
}));

export default function BalancePage() {
  return (
    <div className="flex flex-col gap-5">
      <BalanceOverview balance="999 €" history={history} />
      <PaymentMethodForm />
    </div>
  );
}
