'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export interface IpAddress {
  id: string;
  subnet: string;
  mask: string;
  gateway: string;
  ptr: string;
  /** Only the IPv4 pool carries a type; its presence adds the Type column. */
  type?: string;
  active: boolean;
}

export interface IpAddressGroup {
  title: string;
  rows: IpAddress[];
}

const columnHelper = createColumnHelper<IpAddress>();

const subnet = columnHelper.accessor('subnet', {
  header: 'Subnet',
  cell: (info) => (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          info.row.original.active ? 'bg-[#00F551]' : 'bg-destructive'
        )}
      />
      {info.getValue()}
    </span>
  ),
});

const mask = columnHelper.accessor('mask', { header: 'Mask', cell: (info) => info.getValue() });

const gateway = columnHelper.accessor('gateway', {
  header: 'Gateway',
  cell: (info) => info.getValue(),
});

const ptr = columnHelper.accessor('ptr', { header: 'PTR', cell: (info) => info.getValue() });

const type = columnHelper.accessor('type', { header: 'Type', cell: (info) => info.getValue() });

/* `size` is the column's share of the 638px row content box, taken from the Figma
   x-offsets, so the grid keeps the design proportions at any card width. */
const columnsWithoutType = [
  { ...subnet, size: 218 },
  { ...mask, size: 124 },
  { ...gateway, size: 272 },
  { ...ptr, size: 24 },
];

const columnsWithType = [
  { ...subnet, size: 218 },
  { ...mask, size: 134 },
  { ...gateway, size: 82 },
  { ...ptr, size: 24 },
  { ...type, size: 180 },
];

const rightAligned = new Set(['ptr', 'type']);

/* Narrow layout stacks one field per line, except PTR and Type, which share the last line. */
const inlineIds = new Set(['ptr', 'type']);

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[10px] bg-[#0F0F0F] p-5">
      <h2 className="text-sm leading-[17px] font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2 text-xs leading-[15px] font-medium', className)}>
      <span className="text-white/30">{label}</span>
      <span className="text-white">{children}</span>
    </div>
  );
}

function IpTable({ title, rows }: IpAddressGroup) {
  const columns = rows.some((row) => row.type !== undefined) ? columnsWithType : columnsWithoutType;
  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });
  const [headerGroup] = table.getHeaderGroups();

  const gridTemplateColumns = table
    .getVisibleLeafColumns()
    .map((column) => `${column.getSize()}fr`)
    .join(' ');

  /* The stacked layout has no header row, so each field repeats its column header as its label. */
  const labels = new Map(
    headerGroup.headers.map((header) => [
      header.column.id,
      flexRender(header.column.columnDef.header, header.getContext()),
    ])
  );

  const rowClass =
    'grid h-9 items-center rounded-[5px] border-[0.5px] border-white/12 px-3 text-xs leading-[15px] font-medium whitespace-nowrap';

  return (
    <Card title={title}>
      {/* Wide: rows keep the design's 662px width, which needs a 702px card. */}
      <div className="mt-2.5 hidden overflow-x-auto @min-[702px]:block">
        <div className="flex min-w-[662px] flex-col gap-2.5">
          <div className={cn(rowClass, 'text-white/30')} style={{ gridTemplateColumns }}>
            {headerGroup.headers.map((header) => (
              <span
                key={header.id}
                className={cn(rightAligned.has(header.column.id) && 'text-right')}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </span>
            ))}
          </div>

          {table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className={cn(rowClass, 'text-white')}
              style={{ gridTemplateColumns }}
            >
              {row.getVisibleCells().map((cell) => (
                <span
                  key={cell.id}
                  className={cn(rightAligned.has(cell.column.id) && 'text-right')}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Narrow: the row's cells stack as labelled fields inside one bordered box. */}
      <div className="mt-3 flex flex-col gap-3 @min-[702px]:hidden">
        {table.getRowModel().rows.map((row) => {
          const cells = row.getVisibleCells();
          const stacked = cells.filter((cell) => !inlineIds.has(cell.column.id));
          const inline = cells.filter((cell) => inlineIds.has(cell.column.id));

          return (
            <div
              key={row.id}
              className="flex flex-col gap-3 rounded-[5px] border-[0.5px] border-white/12 p-4"
            >
              {stacked.map((cell) => (
                <Field key={cell.id} label={labels.get(cell.column.id)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Field>
              ))}

              <div className="flex gap-3">
                {inline.map((cell, index) => (
                  <Field
                    key={cell.id}
                    label={labels.get(cell.column.id)}
                    /* PTR keeps its 24px design column so Type starts at a fixed offset. */
                    className={cn(index < inline.length - 1 && 'w-6 shrink-0')}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Field>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function ServerIpAddresses({
  groups,
  instruction,
}: {
  groups: IpAddressGroup[];
  instruction: string[];
}) {
  // Keyed to the card, not the viewport — the lg two-column layout squeezes it below 702px too.
  return (
    <div className="@container mt-5 flex flex-col gap-3">
      {groups.map((group) => (
        <IpTable key={group.title} {...group} />
      ))}

      <Card title="Instruction">
        <div className="mt-3 flex flex-col gap-3">
          {instruction.map((paragraph, index) => (
            <p key={index} className="text-xs leading-[15px] text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}
