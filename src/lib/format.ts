const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** $13,500 */
export function formatUSD(value: number) {
  return usd.format(Math.round(value));
}

/** $350K · $1.2M */
export function formatUSDShort(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${Number.isInteger(m) ? m : m.toFixed(m >= 10 ? 1 : 2).replace(/0$/, "")}M`;
  }
  return `$${Math.round(value / 1000)}K`;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
