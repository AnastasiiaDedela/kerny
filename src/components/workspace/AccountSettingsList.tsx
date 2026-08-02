import { cn } from '@/lib/utils';

export type AccountSetting = {
  title: string;
  description: string;
  action: string;
  /** Renders the action in the red "danger" treatment. */
  destructive?: boolean;
};

export function AccountSettingsList({ items }: { items: AccountSetting[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-36',
            // Rows are separated by a hairline with 16px of air on either side.
            i > 0 && 'mt-4 border-t border-white/10 pt-4'
          )}
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-base leading-[19px] font-semibold text-white">{item.title}</p>
            <p className="text-sm leading-[17px] text-white/50">{item.description}</p>
          </div>

          <button
            type="button"
            className={cn(
              'flex h-10 w-35 shrink-0 items-center justify-center rounded-[8px] text-sm leading-[17px] font-medium transition-colors',
              item.destructive
                ? 'bg-[#FF0027]/20 text-[#FF0027] hover:bg-[#FF0027]/30'
                : 'bg-white/[0.06] text-white hover:bg-white/10'
            )}
          >
            {item.action}
          </button>
        </div>
      ))}
    </div>
  );
}
