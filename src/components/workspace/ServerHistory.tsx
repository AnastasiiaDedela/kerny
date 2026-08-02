'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface HistoryEntry {
  id: string;
  action: string;
  time: string;
  amount: string;
}

const columnHelper = createColumnHelper<HistoryEntry>();

const columns = [
  columnHelper.accessor('action', {
    header: 'History of actions',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('time', {
    header: 'Time',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
];

export function ServerHistory({ data }: { data: HistoryEntry[] }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const [headerGroup] = table.getHeaderGroups();

  return (
    <div className="@container mt-5">
      <div className="flex h-[46px] items-center justify-between gap-2.5 rounded-[10px] bg-[#0F0F0F] px-4">
        {headerGroup.headers.map((header) => (
          <span
            key={header.id}
            className="text-sm leading-[17px] font-medium whitespace-nowrap text-white/50"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        ))}
      </div>

      {/* The list scrolls inside the fixed-height card on desktop; the hairline thumb
          sits 6px to the right of the rows, hence the padding + pulled-out margin. */}
      <div className="scrollbar-hairline mt-2.5 flex flex-col gap-2 lg:-mr-[7px] lg:h-[664px] lg:overflow-y-auto lg:pr-1.5">
        {table.getRowModel().rows.map((row) => {
          const [action, time, amount] = row.getVisibleCells();

          return (
            <div
              key={row.id}
              className="grid shrink-0 grid-cols-2 items-center gap-x-2.5 gap-y-1 rounded-[10px] bg-[#0F0F0F] px-4 py-[13px] text-sm leading-[17px] font-medium whitespace-nowrap text-white @min-[480px]:h-[46px] @min-[480px]:grid-cols-[296fr_306fr_68fr] @min-[480px]:gap-x-0 @min-[480px]:py-0"
            >
              <span className="col-span-2 @min-[480px]:col-span-1">
                {flexRender(action.column.columnDef.cell, action.getContext())}
              </span>
              <span>{flexRender(time.column.columnDef.cell, time.getContext())}</span>
              <span className="justify-self-end @min-[480px]:justify-self-start">
                {flexRender(amount.column.columnDef.cell, amount.getContext())}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
