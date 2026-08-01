'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export interface TariffRow {
  id: number;
  cpu: string;
  ram: string;
  nvme: string;
  channel: string;
  costPerMonth: number;
}

interface TariffTableProps {
  data: TariffRow[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  /** Also show an equivalent "€ / hour" price next to "€ / month". */
  showHourly?: boolean;
}

const columnHelper = createColumnHelper<TariffRow>();

const columns = [
  columnHelper.accessor('cpu', { header: 'CPU' }),
  columnHelper.accessor('ram', { header: 'RAM' }),
  columnHelper.accessor('nvme', { header: 'NVME' }),
  columnHelper.accessor('channel', { header: 'Channel' }),
  columnHelper.accessor('costPerMonth', {
    header: 'Cost',
    cell: (info) => (
      <span>
        {info.getValue()} € <span className="text-white/50">/ month</span>
      </span>
    ),
  }),
];

// Column widths mirror the markup (163 / 164 / 174 / 141 / 78 across the 720px
// usable row width). Cost (last column) is right-aligned.
const GRID = 'grid grid-cols-[163fr_164fr_174fr_141fr_minmax(90px,1fr)] items-center px-5';

// Fixed column widths + gaps for the "hourly" desktop row: 20px padding, CPU
// (40) RAM (40) NVME (40) Channel (100) Cost/month (70) Cost/hour, 20px
// padding — matches the markup's exact spacing rather than proportional (fr)
// columns, since the month/hour gap isn't uniform with the others.
const HOURLY_CELL = 'shrink-0 whitespace-nowrap text-sm';

export function TariffTable({ data, selectedId, onSelect, showHourly = false }: TariffTableProps) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <>
      {/* Mobile/tablet: stacked cards */}
      <div className="flex flex-col gap-3 rounded-[8px] bg-[#0F0F0F] p-4 lg:hidden">
        {data.map((row) => {
          const selected = row.id === selectedId;
          return (
            <div
              key={row.id}
              onClick={() => onSelect(row.id)}
              style={selected ? { backgroundColor: 'rgba(67, 76, 247, 0.1)' } : undefined}
              className={cn(
                'flex cursor-pointer flex-col gap-2 rounded-[8px] p-4 transition-colors',
                selected
                  ? 'ring-primary ring-1 ring-inset'
                  : 'bg-white/[0.04] hover:bg-white/[0.06]'
              )}
            >
              {/* CPU */}
              <div className="flex items-center justify-between rounded-[5px] border-[0.5px] border-white/30 px-3 py-2.5">
                <span className="text-sm text-white/50">CPU</span>
                <span className="text-sm font-medium text-white">{row.cpu}</span>
              </div>
              {/* RAM + NVME */}
              <div className="flex gap-[9px]">
                <div className="flex flex-1 items-center justify-between rounded-[5px] border-[0.5px] border-white/30 px-3 py-2.5">
                  <span className="text-sm text-white/50">RAM</span>
                  <span className="text-sm font-medium text-white">{row.ram}</span>
                </div>
                <div className="flex flex-1 items-center justify-between rounded-[5px] border-[0.5px] border-white/30 px-3 py-2.5">
                  <span className="text-sm text-white/50">NVME</span>
                  <span className="text-sm font-medium text-white">{row.nvme}</span>
                </div>
              </div>
              {/* Channel */}
              <div className="flex items-center justify-between rounded-[5px] border-[0.5px] border-white/30 px-3 py-2.5">
                <span className="text-sm text-white/50">Channel</span>
                <span className="text-sm font-medium text-white">{row.channel}</span>
              </div>
              {/* Cost */}
              <div className="flex items-center justify-between rounded-[5px] border-[0.5px] border-white/30 px-3 py-2.5">
                <span className="text-sm text-white/50">Cost</span>
                <span className="flex items-center gap-3 text-sm font-medium text-white">
                  <span>
                    {row.costPerMonth} € <span className="text-white/50">/ month</span>
                  </span>
                  {showHourly && (
                    <span>
                      {row.costPerMonth} € <span className="text-white/50">/ hour</span>
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: horizontal table */}
      {showHourly ? (
        <div className="hidden overflow-x-auto lg:block">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="flex h-[50px] items-center rounded-[8px] bg-white/[0.04] px-5">
              <span className={cn(HOURLY_CELL, 'w-[77px] text-white/50')}>CPU</span>
              <span className={cn(HOURLY_CELL, 'ml-10 w-[30px] text-white/50')}>RAM</span>
              <span className={cn(HOURLY_CELL, 'ml-10 w-[39px] text-white/50')}>NVME</span>
              <span className={cn(HOURLY_CELL, 'ml-10 w-[76px] text-white/50')}>Channel</span>
              <div className="ml-auto flex items-center gap-[70px]">
                <span className={cn(HOURLY_CELL, 'w-[78px] text-white/50')}>Cost</span>
                <span className="w-[68px]" aria-hidden="true" />
              </div>
            </div>

            {/* Rows */}
            <div className="mt-2.5 flex flex-col gap-2">
              {data.map((row) => {
                const selected = row.id === selectedId;
                return (
                  <div
                    key={row.id}
                    onClick={() => onSelect(row.id)}
                    style={selected ? { backgroundColor: 'rgba(67, 76, 247, 0.1)' } : undefined}
                    className={cn(
                      'flex h-[50px] cursor-pointer items-center rounded-[8px] px-5 transition-colors',
                      selected
                        ? 'ring-primary ring-1 ring-inset'
                        : 'bg-white/[0.04] hover:bg-white/[0.06]'
                    )}
                  >
                    <span className={cn(HOURLY_CELL, 'w-[77px] text-white')}>{row.cpu}</span>
                    <span className={cn(HOURLY_CELL, 'ml-10 w-[30px] text-white')}>{row.ram}</span>
                    <span className={cn(HOURLY_CELL, 'ml-10 w-[39px] text-white')}>{row.nvme}</span>
                    <span className={cn(HOURLY_CELL, 'ml-10 w-[76px] text-white')}>
                      {row.channel}
                    </span>
                    <div className="ml-auto flex items-center gap-[70px]">
                      <span className={cn(HOURLY_CELL, 'w-[78px] text-white')}>
                        {row.costPerMonth} € <span className="text-white/50">/ month</span>
                      </span>
                      <span className={cn(HOURLY_CELL, 'w-[68px] text-right text-white')}>
                        {row.costPerMonth} € <span className="text-white/50">/ hour</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden overflow-x-auto rounded-[8px] bg-[#0F0F0F] lg:block">
          <div className="min-w-[560px] p-5">
            {/* Header */}
            <div className={cn(GRID, 'h-[50px] rounded-[8px] bg-white/[0.04]')}>
              {table.getHeaderGroups()[0]?.headers.map((header, i) => (
                <div
                  key={header.id}
                  className={cn('text-sm text-white/50', i === 4 && 'text-right')}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="mt-2.5 flex flex-col gap-2">
              {table.getRowModel().rows.map((row) => {
                const selected = row.original.id === selectedId;
                return (
                  <div
                    key={row.id}
                    onClick={() => onSelect(row.original.id)}
                    style={selected ? { backgroundColor: 'rgba(67, 76, 247, 0.1)' } : undefined}
                    className={cn(
                      GRID,
                      'h-[50px] cursor-pointer rounded-[8px] transition-colors',
                      selected
                        ? 'ring-primary ring-1 ring-inset'
                        : 'bg-white/[0.04] hover:bg-white/[0.06]'
                    )}
                  >
                    {row.getVisibleCells().map((cell, i) => (
                      <div
                        key={cell.id}
                        className={cn(
                          'text-sm font-normal whitespace-nowrap text-white',
                          i === 4 && 'text-right'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
