import { Button } from '@/components/ui/button';
import { ActivatePromocodeButton } from '@/components/workspace/ActivatePromocodeModal';
import { BalanceHistoryTable } from '@/components/workspace/BalanceHistoryTable';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';

export function BalanceOverview({
  balance,
  history,
}: {
  balance: string;
  history: HistoryEntry[];
}) {
  return (
    <section className="rounded-[10px] bg-white/[0.04] p-5 lg:p-6">
      <h1 className="text-xl leading-6 font-semibold text-white">Balance &amp; Payments</h1>

      {/* 450 / 532 with a 20px gutter is the 1002px content width of the card. */}
      <div className="mt-4 grid gap-5 lg:grid-cols-[450fr_532fr]">
        <div>
          <div className="flex h-40 flex-col items-center justify-center rounded-[8px] bg-[#0F0F0F] text-center">
            <p className="text-5xl leading-[58px] font-semibold text-white">{balance}</p>
            <p className="text-sm leading-[17px] font-medium text-white/50">Your Balance</p>
          </div>

          <Button className="mt-4 h-[46px] w-full text-sm leading-[17px] font-medium">
            Deposit
          </Button>

          <ActivatePromocodeButton />
        </div>

        <BalanceHistoryTable data={history} />
      </div>
    </section>
  );
}
