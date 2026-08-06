'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowData,
} from '@tanstack/react-table';

export interface HistoryEntry {
  id: string;
  action: string;
  time: string;
  amount: string;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    stackedLabel: string;
  }
}

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

export function ServerHistory({ data }: { data: HistoryEntry[] }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const [headerGroup] = table.getHeaderGroups();

  return (
    <div className="@container mt-5">
      <div className="hidden h-[46px] items-center justify-between gap-2.5 rounded-[10px] bg-[#0F0F0F] px-4 @min-[480px]:flex">
        {headerGroup.headers.map((header) => (
          <span
            key={header.id}
            className="text-sm leading-[17px] font-medium whitespace-nowrap text-white/50"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        ))}
      </div>

      <div className="scrollbar-hairline mt-2.5 -mr-[7px] flex h-[664px] flex-col gap-2 overflow-y-auto pr-1.5">
        {table.getRowModel().rows.map((row) => {
          const [action, time, amount] = row.getVisibleCells();

          return (
            <div key={row.id} className="shrink-0">
              <div className="flex flex-col gap-4 rounded-[10px] bg-[#0F0F0F] p-4 @min-[480px]:hidden">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="flex flex-col gap-1">
                    <span className="text-sm leading-[17px] whitespace-nowrap text-white/50">
                      {cell.column.columnDef.meta?.stackedLabel}
                    </span>
                    <span className="text-base leading-[19px] font-medium whitespace-nowrap text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden h-[46px] grid-cols-[296fr_306fr_68fr] items-center rounded-[10px] bg-[#0F0F0F] px-4 text-sm leading-[17px] font-medium whitespace-nowrap text-white @min-[480px]:grid">
                <span>{flexRender(action.column.columnDef.cell, action.getContext())}</span>
                <span>{flexRender(time.column.columnDef.cell, time.getContext())}</span>
                <span>{flexRender(amount.column.columnDef.cell, amount.getContext())}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
