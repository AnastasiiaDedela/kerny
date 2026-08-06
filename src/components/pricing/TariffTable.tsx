'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { PricingTariff } from '@/api/pricing';
import {
  formatAmount,
  formatBandwidth,
  formatCpu,
  formatDisk,
  formatRam,
  tariffMonthlyPrice,
} from '@/lib/pricing';
import { cn } from '@/lib/utils';

export interface TariffRow {
  id: string;
  cpu: string;
  ram: string;
  nvme: string;
  channel: string;
  costPerMonth: string;
}

export function toTariffRow(tariff: PricingTariff, regionId: string | undefined): TariffRow {
  return {
    id: tariff.id,
    cpu: formatCpu(tariff.cpuCount),
    ram: formatRam(tariff.ramMb),
    nvme: formatDisk(tariff.diskGb),
    channel: formatBandwidth(tariff.bandwidthGb),
    costPerMonth: formatAmount(tariffMonthlyPrice(tariff, regionId)),
  };
}

interface TariffTableProps {
  data: TariffRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
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

const GRID = 'grid grid-cols-[163fr_164fr_174fr_141fr_minmax(90px,1fr)] items-center px-5';

const HOURLY_CELL = 'shrink-0 whitespace-nowrap text-sm';

const CELL =
  'flex h-9 items-center justify-between gap-2.5 rounded-[5px] border-[0.5px] border-white/30 px-3';
const CELL_LABEL = 'text-sm leading-[17px] font-normal text-white/50';
const CELL_VALUE = 'text-right text-sm leading-[17px] font-medium text-white';

export function TariffTable({ data, selectedId, onSelect, showHourly = false }: TariffTableProps) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <>
      <div
        className={cn(
          'rounded-[8px] bg-[#0F0F0F] p-4',
          showHourly ? 'min-[1380px]:hidden' : 'lg:hidden'
        )}
      >
        <div className="scrollbar-hairline -mr-[7px] flex max-h-[624px] flex-col gap-3 overflow-y-auto pr-1.5">
          {data.map((row) => {
            const selected = row.id === selectedId;
            return (
              <div
                key={row.id}
                onClick={() => onSelect(row.id)}
                style={selected ? { backgroundColor: 'rgba(67, 76, 247, 0.1)' } : undefined}
                className={cn(
                  'flex shrink-0 cursor-pointer flex-col gap-2 rounded-[8px] p-4 transition-colors',
                  selected
                    ? 'ring-primary ring-1 ring-inset'
                    : 'bg-white/[0.04] hover:bg-white/[0.06]'
                )}
              >
                <div className={CELL}>
                  <span className={CELL_LABEL}>CPU</span>
                  <span className={CELL_VALUE}>{row.cpu}</span>
                </div>
                <div className="flex gap-[9px]">
                  <div className={cn(CELL, 'flex-1')}>
                    <span className={CELL_LABEL}>RAM</span>
                    <span className={CELL_VALUE}>{row.ram}</span>
                  </div>
                  <div className={cn(CELL, 'flex-1')}>
                    <span className={CELL_LABEL}>NVME</span>
                    <span className={CELL_VALUE}>{row.nvme}</span>
                  </div>
                </div>
                <div className={CELL}>
                  <span className={CELL_LABEL}>Channel</span>
                  <span className={CELL_VALUE}>{row.channel}</span>
                </div>
                <div className={CELL}>
                  <span className={CELL_LABEL}>Cost</span>
                  <span className={CELL_VALUE}>
                    {row.costPerMonth} € <span className="font-normal text-white/50">/ month</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showHourly ? (
        <div className="hidden overflow-x-auto min-[1380px]:block">
          <div className="min-w-[700px]">
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
                        — <span className="text-white/50">/ hour</span>
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
