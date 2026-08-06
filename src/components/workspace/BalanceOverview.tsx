'use client';

import { useState } from 'react';

import { useBillingOverview, useBillingTransactions } from '@/api/billing';
import { Button } from '@/components/ui/button';
import { ActivatePromocodeButton } from '@/components/workspace/ActivatePromocodeModal';
import { BalanceHistoryTable } from '@/components/workspace/BalanceHistoryTable';
import { DepositModal } from '@/components/workspace/DepositModal';
import { formatBalance, toHistoryEntry } from '@/lib/billing';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';

const LOADING_BALANCE = '—';

export function BalanceOverview() {
  const [depositOpen, setDepositOpen] = useState(false);

  const { balance } = useBillingOverview();
  const { data, isPending, isError } = useBillingTransactions();
  const history: HistoryEntry[] = data?.items.map(toHistoryEntry) ?? EMPTY_HISTORY;

  const emptyLabel = isPending
    ? null
    : isError
      ? 'Transactions unavailable'
      : 'No transactions yet';

  return (
    <section className="rounded-[10px] bg-white/[0.04] p-5 lg:p-6">
      <h1 className="text-xl leading-6 font-semibold text-white">Balance &amp; Payments</h1>

      <div className="mt-4 grid gap-5 lg:grid-cols-[450fr_532fr]">
        <div>
          <div className="flex h-40 flex-col items-center justify-center rounded-[8px] bg-[#0F0F0F] text-center">
            <p className="text-5xl leading-[58px] font-semibold text-white">
              {balance ? formatBalance(balance.amount) : LOADING_BALANCE}
            </p>
            <p className="text-sm leading-[17px] font-medium text-white/50">Your Balance</p>
          </div>

          <Button
            onClick={() => setDepositOpen(true)}
            className="mt-4 h-[46px] w-full text-sm leading-[17px] font-medium"
          >
            Deposit
          </Button>

          <ActivatePromocodeButton />
        </div>

        <BalanceHistoryTable data={history} emptyLabel={emptyLabel} />
      </div>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </section>
  );
}

const EMPTY_HISTORY: HistoryEntry[] = [];
