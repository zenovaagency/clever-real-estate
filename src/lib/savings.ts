/**
 * Commission maths for the savings calculator. Pure and dependency-free so it
 * can run on the server, in the client and in a plain Node check.
 *
 * Assumptions (shown next to the calculator):
 * - Traditional listing fee: 3% of the sale price.
 * - Clever listing fee: 1.5%, with a $3,000 minimum.
 * - Buyer's agent commission: 3%, paid in both scenarios when the buyer has an agent.
 * - Clever Cash Back: $250 for buying, $500 for buying and selling with Clever.
 */

export const RATES = {
  traditionalListing: 0.03,
  cleverListing: 0.015,
  cleverMinimum: 3000,
  buyerAgent: 0.03,
} as const;

export const CASH_BACK = { buy: 250, both: 500 } as const;

export const PRICE = { min: 100_000, max: 2_000_000, step: 5_000, initial: 400_000 } as const;

/** Below this price the 1.5% rate is not guaranteed. */
export const LOW_PRICE_CAVEAT = 200_000;

export type SellerEstimate = {
  cleverListing: number;
  traditionalListing: number;
  buyerAgent: number;
  cleverTotal: number;
  traditionalTotal: number;
  savings: number;
};

export function cleverListingFee(price: number) {
  return Math.max(price * RATES.cleverListing, RATES.cleverMinimum);
}

export function sellerEstimate(price: number, buyerHasAgent = true): SellerEstimate {
  const cleverListing = cleverListingFee(price);
  const traditionalListing = price * RATES.traditionalListing;
  const buyerAgent = buyerHasAgent ? price * RATES.buyerAgent : 0;
  const cleverTotal = cleverListing + buyerAgent;
  const traditionalTotal = traditionalListing + buyerAgent;
  return {
    cleverListing,
    traditionalListing,
    buyerAgent,
    cleverTotal,
    traditionalTotal,
    savings: Math.max(0, traditionalTotal - cleverTotal),
  };
}

export type Mode = "sell" | "buy" | "both";

/** Headline number for a mode: commission saved plus any cash back. */
export function totalBenefit(mode: Mode, price: number, buyerHasAgent = true) {
  if (mode === "buy") return CASH_BACK.buy;
  const { savings } = sellerEstimate(price, buyerHasAgent);
  return mode === "both" ? savings + CASH_BACK.both : savings;
}

export function clampPrice(value: number) {
  if (!Number.isFinite(value)) return PRICE.initial;
  return Math.min(PRICE.max, Math.max(PRICE.min, Math.round(value / 1000) * 1000));
}
