import type { PricingTariff } from '@/api/pricing';

export function tariffMonthlyPrice(tariff: PricingTariff, regionId: string | undefined): string {
  const override = regionId
    ? tariff.regionPrices.find((price) => price.regionId === regionId)
    : undefined;

  return override?.monthlyPrice ?? tariff.monthlyPrice;
}

export function formatAmount(amount: string): string {
  return amount.endsWith('.00') ? amount.slice(0, -3) : amount;
}

export function formatCpu(cpuCount: number): string {
  return `${cpuCount} vCPU`;
}

export function formatRam(ramMb: number): string {
  if (ramMb < 1024) return `${ramMb} MB`;

  const gb = ramMb / 1024;
  return `${Number.isInteger(gb) ? gb : gb.toFixed(1)} GB`;
}

export function formatDisk(diskGb: number): string {
  return `${diskGb} GB`;
}

export function formatCoin(amount: string): string {
  return `${amount} COIN`;
}

export function formatTransfer(bandwidthGb: number): string {
  return `${bandwidthGb} GB / mo`;
}

export function formatBandwidth(bandwidthGb: number): string {
  if (bandwidthGb < 1024) return `${bandwidthGb} GB`;

  const tb = bandwidthGb / 1024;
  return `${Number.isInteger(tb) ? tb : tb.toFixed(1)} TB`;
}
