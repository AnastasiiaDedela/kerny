'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { HistoryEntry } from '@/components/workspace/ServerHistory';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<HistoryEntry>();

const columns = [
  columnHelper.accessor('action', {
    header: 'History of actions',
    cell: (info) => info.getValue(),
    meta: { stackedLabel: 'History of Actions:' },
  }),
  columnHelper.accessor('time', {
    header: 'Time',
    cell: (info) => info.getValue(),
    meta: { stackedLabel: 'Time:' },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
    meta: { stackedLabel: 'Amount:' },
  }),
];

export function BalanceHistoryTable({ data }: { data: HistoryEntry[] }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const [headerGroup] = table.getHeaderGroups();

  return (
    <div className="@container">
      {/* Narrow cards carry their own labels, so the header row only exists from 480px up.
          The 188/144/168 track list is what centres the Time value under the Time header
          and keeps Amount flush right, so the header and the rows share it. */}
      <div className="hidden h-[50px] grid-cols-[188fr_144fr_168fr] items-center rounded-[10px] bg-[#0F0F0F] px-4 @min-[480px]:grid">
        {headerGroup.headers.map((header, i) => (
          <span
            key={header.id}
            className={cn(
              'text-sm leading-[17px] font-medium whitespace-nowrap text-white/50',
              i === 1 && 'text-center',
              i === 2 && 'text-right'
            )}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        ))}
      </div>

      {/* The list scrolls inside the fixed-height card; the hairline thumb sits 6px to the
          right of the rows, hence the padding + pulled-out margin. Stacked cards are far
          taller than 218px, so below 480px the list flows instead of scrolling — and with
          no header above it, it sits flush against the top of its grid cell. */}
      <div className="scrollbar-hairline flex flex-col gap-3 @min-[480px]:mt-2.5 @min-[480px]:-mr-[7px] @min-[480px]:h-[218px] @min-[480px]:gap-1.5 @min-[480px]:overflow-y-auto @min-[480px]:pr-1.5">
        {table.getRowModel().rows.map((row) => {
          const [action, time, amount] = row.getVisibleCells();

          return (
            <div key={row.id} className="shrink-0">
              {/* Narrow: every value gets its own label, stacked. */}
              <div className="flex flex-col gap-3 rounded-[10px] bg-[#0F0F0F] p-5 @min-[480px]:hidden">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="flex flex-col gap-1.5">
                    <span className="text-sm leading-[17px] whitespace-nowrap text-white/50">
                      {cell.column.columnDef.meta?.stackedLabel}
                    </span>
                    <span className="text-sm leading-[17px] font-medium whitespace-nowrap text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                ))}
              </div>

              {/* Wide: one row under the shared header. */}
              <div className="hidden h-[50px] grid-cols-[188fr_144fr_168fr] items-center rounded-[10px] bg-[#0F0F0F] px-4 text-sm leading-[17px] font-medium whitespace-nowrap text-white @min-[480px]:grid">
                <span>{flexRender(action.column.columnDef.cell, action.getContext())}</span>
                <span className="text-center">
                  {flexRender(time.column.columnDef.cell, time.getContext())}
                </span>
                <span className="text-right">
                  {flexRender(amount.column.columnDef.cell, amount.getContext())}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
