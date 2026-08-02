'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export interface ServerRow {
  id: number;
  name: string;
  os: string;
  ip: string;
  region: string;
  status: 'Active' | 'Inactive';
}

interface ServerTableProps {
  data: ServerRow[];
}

function IpValue({ ip }: { ip: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span className="flex items-center gap-2 text-base leading-[19px] font-medium text-white">
      {revealed ? ip : '***********'}
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-label={revealed ? 'Hide IP' : 'Show IP'}
        className="text-white/30 hover:text-white/60"
      >
        {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </button>
    </span>
  );
}

function TextValue({ value }: { value: string }) {
  return <span className="text-base leading-[19px] font-medium text-white">{value}</span>;
}

function StatusValue({ status }: { status: ServerRow['status'] }) {
  return (
    <span className="flex items-center gap-1.5 text-base leading-[19px] font-medium text-white">
      <span
        className={cn(
          'size-1 rounded-full',
          status === 'Active' ? 'bg-[#00F651]' : 'bg-destructive'
        )}
      />
      {status}
    </span>
  );
}

const columnHelper = createColumnHelper<ServerRow>();

const columns = [
  columnHelper.accessor('os', {
    header: 'OS:',
    cell: (info) => <TextValue value={info.getValue()} />,
  }),
  columnHelper.accessor('ip', {
    header: 'Main IP:',
    cell: (info) => <IpValue ip={info.getValue()} />,
  }),
  columnHelper.accessor('region', {
    header: 'Region:',
    cell: (info) => <TextValue value={info.getValue()} />,
  }),
  columnHelper.accessor('status', {
    header: 'Status:',
    cell: (info) => <StatusValue status={info.getValue()} />,
  }),
];

export function ServerTable({ data }: ServerTableProps) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="flex flex-col gap-2.5">
      {table.getRowModel().rows.map((row) => (
        <div key={row.id}>
          {/* Mobile/tablet: stacked card */}
          <div className="flex flex-col gap-4 rounded-[10px] bg-white/[0.04] p-4 min-[1240px]:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src="/images/servers/server-name.svg" alt="" width={46} height={46} />
                <span className="text-base leading-[19px] font-medium text-white">
                  {row.original.name}
                </span>
              </div>
              <Link
                href={`/workspace/servers/${row.original.id}`}
                aria-label="View server"
                className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-white/[0.06] hover:bg-white/[0.1]"
              >
                <ChevronRight className="size-3.5 text-white/30" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-4 md:grid-cols-4">
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className={cn(
                    'flex flex-col gap-1',
                    (cell.column.id === 'os' || cell.column.id === 'status') &&
                      'col-span-2 md:col-span-1'
                  )}
                >
                  <span className="text-sm leading-[17px] whitespace-nowrap text-white/50">
                    {cell.column.columnDef.header as string}
                  </span>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: full row */}
          <div className="hidden h-[86px] items-center justify-between rounded-[10px] bg-white/[0.04] pr-[23px] pl-5 min-[1240px]:flex">
            <div className="flex w-[162px] shrink-0 items-center gap-4">
              <Image src="/images/servers/server-name.svg" alt="" width={46} height={46} />
              <span className="text-base leading-[19px] font-medium text-white">
                {row.original.name}
              </span>
            </div>

            <div className="flex items-center">
              {row.getVisibleCells().map((cell, i) => (
                <div
                  key={cell.id}
                  className={cn(
                    'flex flex-col justify-center gap-1 px-[30px]',
                    i === 0 && 'pl-0',
                    i > 0 && 'border-l border-white/10'
                  )}
                >
                  <span className="text-sm leading-[17px] whitespace-nowrap text-white/50">
                    {cell.column.columnDef.header as string}
                  </span>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>

            <Link
              href={`/workspace/servers/${row.original.id}`}
              aria-label="View server"
              className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-white/[0.06] hover:bg-white/[0.1]"
            >
              <ChevronRight className="size-3.5 text-white/30" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
