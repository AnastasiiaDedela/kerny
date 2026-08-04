import type { PricingTariff } from '@/api/pricing';

/**
 * The price to charge for a tariff in a region. `regionPrices` overrides the base
 * `monthlyPrice` and genuinely differs for most plans, so always price through here.
 * Falls back to the base when the region isn't listed.
 */
export function tariffMonthlyPrice(tariff: PricingTariff, regionId: string | undefined): string {
  const override = regionId
    ? tariff.regionPrices.find((price) => price.regionId === regionId)
    : undefined;

  return override?.monthlyPrice ?? tariff.monthlyPrice;
}

/**
 * Money arrives as a decimal string (`'30.00'`) and must not be parsed as a float for
 * display. Whole amounts drop the empty cents; everything else is left untouched.
 */
export function formatAmount(amount: string): string {
  return amount.endsWith('.00') ? amount.slice(0, -3) : amount;
}

/** The catalog reports a core count only — it carries no clock speed. */
export function formatCpu(cpuCount: number): string {
  return `${cpuCount} vCPU`;
}

/** Sub-gigabyte plans exist (512 MB), so don't force everything into GB. */
export function formatRam(ramMb: number): string {
  if (ramMb < 1024) return `${ramMb} MB`;

  const gb = ramMb / 1024;
  return `${Number.isInteger(gb) ? gb : gb.toFixed(1)} GB`;
}

export function formatDisk(diskGb: number): string {
  return `${diskGb} GB`;
}

/**
 * All catalog and quote amounts are `COIN`, the API's own unit — not euros. Cents are
 * kept, unlike the balance in the header.
 */
export function formatCoin(amount: string): string {
  return `${amount} COIN`;
}

/** The transfer allowance spelled out, as the cost summary shows it. */
export function formatTransfer(bandwidthGb: number): string {
  return `${bandwidthGb} GB / mo`;
}

/** `bandwidthGb` is the monthly transfer allowance, not a link speed. */
export function formatBandwidth(bandwidthGb: number): string {
  if (bandwidthGb < 1024) return `${bandwidthGb} GB`;

  const tb = bandwidthGb / 1024;
  return `${Number.isInteger(tb) ? tb : tb.toFixed(1)} TB`;
}
