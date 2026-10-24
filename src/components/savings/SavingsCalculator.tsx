"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CASH_BACK,
  LOW_PRICE_CAVEAT,
  PRICE,
  clampPrice,
  sellerEstimate,
  totalBenefit,
  type Mode,
} from "@/lib/savings";
import { formatUSD } from "@/lib/format";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const modes: { value: Mode; label: string }[] = [
  { value: "sell", label: "Selling" },
  { value: "buy", label: "Buying" },
  { value: "both", label: "Buying & selling" },
];

/** Number that tweens to each new value. Server renders the final figure. */
function TweenNumber({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      current.current = value;
      el.textContent = formatUSD(value);
      return;
    }
    const state = { n: current.current };
    const tween = gsap.to(state, {
      n: value,
      duration: 0.9,
      ease: "expo.out",
      onUpdate: () => {
        current.current = state.n;
        el.textContent = formatUSD(state.n);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatUSD(value)}
    </span>
  );
}

function Row({ label, value, max, accent }: { label: string; value: number; max: number; accent?: boolean }) {
  return (
    <div className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[0.9375rem] text-ink-soft">{label}</span>
        <TweenNumber value={value} className={cn("font-display text-2xl", accent && "text-forest")} />
      </div>
      <div className="mt-3 h-px bg-ink/12">
        <div
          className={cn("h-px transition-[width] duration-1000 ease-[var(--ease-expo)]", accent ? "bg-forest" : "bg-ink/45")}
          style={{ width: `${max ? (value / max) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

export function SavingsCalculator({ initialMode = "sell" }: { initialMode?: Mode }) {
  const id = useId();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [price, setPrice] = useState<number>(PRICE.initial);
  const [draft, setDraft] = useState<string>(String(PRICE.initial));
  const [buyerHasAgent, setBuyerHasAgent] = useState(true);

  const estimate = sellerEstimate(price, buyerHasAgent);
  const benefit = totalBenefit(mode, price, buyerHasAgent);
  const fill = ((price - PRICE.min) / (PRICE.max - PRICE.min)) * 100;
  const selling = mode !== "buy";

  const commit = (value: number) => {
    const next = clampPrice(value);
    setPrice(next);
    setDraft(String(next));
  };

  return (
    <div className="grid border border-ink/12 bg-paper lg:grid-cols-[1.1fr_1fr]">
      {/* Inputs */}
      <div className="p-7 sm:p-10 lg:p-14">
        <div role="group" aria-label="I am" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-ink/12">
          {modes.map((m) => (
            <button
              key={m.value}
              type="button"
              aria-pressed={mode === m.value}
              onClick={() => setMode(m.value)}
              className={cn(
                "eyebrow relative -mb-px pb-4 transition-colors duration-500",
                mode === m.value ? "text-ink" : "text-ink-soft hover:text-ink",
              )}
            >
              {m.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-left bg-forest transition-transform duration-700 ease-[var(--ease-expo)]",
                  mode === m.value ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <div className="mt-12">
          <label htmlFor={`${id}-price`} className="eyebrow text-ink-soft">
            {mode === "buy" ? "Purchase price" : "Estimated home value"}
          </label>
          <div className="mt-4 flex items-baseline">
            <span aria-hidden className="font-display text-[clamp(2.4rem,4.4vw,3.75rem)] leading-none">
              $
            </span>
            <input
              aria-label="Home price in dollars"
              inputMode="numeric"
              value={Number(draft).toLocaleString("en-US")}
              onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, "") || "0")}
              onBlur={() => commit(Number(draft))}
              onKeyDown={(e) => e.key === "Enter" && commit(Number(draft))}
              className="font-display w-full min-w-0 border-0 bg-transparent p-0 text-[clamp(2.4rem,4.4vw,3.75rem)] leading-none tabular-nums focus:ring-0 focus:outline-none"
            />
          </div>
          <input
            id={`${id}-price`}
            type="range"
            min={PRICE.min}
            max={PRICE.max}
            step={PRICE.step}
            value={price}
            onChange={(e) => commit(Number(e.target.value))}
            aria-valuetext={formatUSD(price)}
            className="range mt-8"
            style={{ "--fill": `${fill}%` } as React.CSSProperties}
          />
          <div className="eyebrow mt-4 flex justify-between text-ink-soft">
            <span>{formatUSD(PRICE.min)}</span>
            <span>{formatUSD(PRICE.max)}+</span>
          </div>
        </div>

        {selling && (
          <label className="mt-12 flex cursor-pointer items-center justify-between gap-6 border-t border-ink/12 pt-8">
            <span>
              <span className="block">The buyer is represented by an agent</span>
              <span className="mt-1 block text-[0.875rem] text-ink-soft">Includes a typical 3% buyer’s agent commission</span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={buyerHasAgent}
              onChange={(e) => setBuyerHasAgent(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="relative h-6 w-11 shrink-0 rounded-full border border-ink/30 transition-colors duration-500 peer-checked:border-forest peer-checked:bg-forest peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-4 peer-focus-visible:outline-forest after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-full after:bg-ink/40 after:transition-[translate,background-color] after:duration-500 after:ease-[var(--ease-expo)] peer-checked:after:translate-x-5 peer-checked:after:bg-paper"
            />
          </label>
        )}

        <p className="mt-10 text-[0.8125rem] leading-relaxed text-ink-soft">
          Estimate only. Assumes a typical 3% listing fee against Clever’s 1.5% ($3,000 minimum)
          {price < LOW_PRICE_CAVEAT && selling ? "; for homes under $200,000 the 1.5% rate is not guaranteed" : ""}. Cash back
          is available in 41 states.
        </p>
      </div>

      {/* Results */}
      <div className="flex flex-col border-t border-ink/12 bg-sage p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-14">
        <p className="eyebrow text-forest">
          {mode === "buy" ? "Clever Cash Back" : mode === "both" ? "Saved, plus cash back" : "Estimated savings"}
        </p>
        <p className="font-display mt-5 text-[clamp(3.4rem,6.4vw,6rem)] leading-[0.9] tracking-[-0.03em] text-forest">
          <TweenNumber value={benefit} />
        </p>
        <p className="sr-only" aria-live="polite">
          Estimated benefit {formatUSD(benefit)}
        </p>

        {selling ? (
          <div className="mt-10 border-t border-forest/20">
            <Row label="Typical commission" value={estimate.traditionalTotal} max={estimate.traditionalTotal} />
            <Row label="With Clever" value={estimate.cleverTotal} max={estimate.traditionalTotal} accent />
            <div className="grid grid-cols-2 gap-6 border-t border-forest/20 pt-5">
              <div>
                <p className="text-[0.8125rem] text-ink-soft">Clever listing fee</p>
                <p className="font-display mt-1 text-xl">{formatUSD(estimate.cleverListing)}</p>
              </div>
              <div>
                <p className="text-[0.8125rem] text-ink-soft">Typical 3% fee</p>
                <p className="font-display mt-1 text-xl">{formatUSD(estimate.traditionalListing)}</p>
              </div>
            </div>
            {mode === "both" && (
              <p className="mt-6 border-t border-forest/20 pt-5 text-[0.9375rem] text-ink-soft">
                Includes {formatUSD(CASH_BACK.both)} Clever Cash Back on your purchase.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-10 border-t border-forest/20 pt-6">
            <p className="max-w-sm leading-relaxed text-ink-soft">
              Buy with a Clever partner agent and receive {formatUSD(CASH_BACK.buy)} after closing — or{" "}
              {formatUSD(CASH_BACK.both)} when you also sell with Clever.
            </p>
            <button type="button" onClick={() => setMode("both")} className="eyebrow link-line mt-6 pb-1 text-forest">
              See buying &amp; selling
            </button>
          </div>
        )}

        <div className="mt-auto pt-12">
          <Button href={`/get-started?intent=${mode}`} className="w-full sm:w-auto">
            {mode === "buy" ? "Find a buyer’s agent" : "Begin my introduction"}
          </Button>
        </div>
      </div>
    </div>
  );
}
