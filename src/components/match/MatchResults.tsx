"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { agents } from "@/data/agents";
import { site } from "@/data/site";
import type { Intent } from "@/lib/lead-options";
import { cn } from "@/lib/cn";
import { revealElement } from "@/lib/motion-store";
import { DemoBadge } from "@/components/ui/DemoBadge";

type Props = {
  name: string;
  zip: string;
  intent: Intent;
  phase: "matching" | "done";
  onMatched: () => void;
  onRestart: () => void;
};

const checks = (zip: string) => [
  "Reviewing 14,000+ partner agents",
  `Filtering by recent sales near ${zip}`,
  "Comparing client reviews and rates",
];

const COUNTDOWN = 5 * 60;

function useCountdown(active: boolean) {
  const [left, setLeft] = useState(COUNTDOWN);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [active]);
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
}

export function MatchResults({ name, zip, intent, phase, onMatched, onRestart }: Props) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const clock = useCountdown(phase === "done");
  const list = checks(zip);

  // Tick through the checklist, then reveal the introductions.
  useEffect(() => {
    if (phase !== "matching") return;
    const step = reduce ? 150 : 850;
    const timers = list.map((_, i) => setTimeout(() => setDone(i + 1), step * (i + 1)));
    timers.push(setTimeout(onMatched, step * (list.length + 1)));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    revealElement(heading.current?.closest<HTMLElement>("[data-match-card]") ?? null);
  }, [phase]);

  if (phase === "matching") {
    return (
      <div data-match-card className="border border-ink/12 bg-paper px-6 py-14 sm:px-12 sm:py-16" aria-busy="true">
        <p className="eyebrow text-forest">One moment</p>
        <h2 ref={heading} tabIndex={-1} className="font-display mt-6 text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] outline-none">
          Preparing your introductions…
        </h2>
        <ul className="mt-10 border-t border-ink/12" aria-live="polite">
          {list.map((c, i) => (
            <li
              key={c}
              className={cn(
                "flex items-center justify-between gap-6 border-b border-ink/12 py-5 transition-opacity duration-700",
                i <= done ? "opacity-100" : "opacity-35",
              )}
            >
              <span>{c}</span>
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border transition-colors duration-500",
                  i < done ? "border-forest bg-forest text-paper" : "border-ink/20 text-transparent",
                )}
              >
                <Check aria-hidden className="size-3.5" strokeWidth={2} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const matches = intent === "buy" ? [agents[3], agents[1], agents[4]] : agents.slice(0, 3);

  return (
    <div data-match-card role="status" className="border border-ink/12 bg-paper">
      <div className="border-b border-ink/12 px-6 py-10 sm:px-12 sm:py-12">
        <p className="eyebrow text-forest">Your introductions</p>
        <h2 ref={heading} tabIndex={-1} className="font-display mt-6 text-[clamp(2.2rem,3.6vw,3.25rem)] leading-[1.02] outline-none">
          Thank you{name ? `, ${name}` : ""}. <em className="text-forest">Three agents</em> are ready to meet you.
        </h2>
        <p className="mt-5 max-w-md text-ink-soft">
          Each sells regularly near {zip}. Your concierge will call to make the introductions.
        </p>
        <p className="mt-8 inline-flex items-center gap-4 border border-forest/30 bg-sage px-4 py-3">
          <span className="eyebrow text-forest">Concierge call in</span>
          <span className="font-display text-2xl text-forest tabular-nums">{clock}</span>
        </p>
      </div>

      <ul className="px-6 sm:px-12">
        {matches.map((a, i) => (
          <motion.li
            key={a.name}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5 border-b border-ink/12 py-6"
          >
            <div className="relative size-16 shrink-0 overflow-hidden bg-stone sm:size-20">
              <Image src={a.photo} alt="" fill sizes="80px" className="object-cover object-[50%_20%] grayscale" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.5rem] leading-tight">
                {a.name}
                {i === 0 && <span className="eyebrow ml-3 align-middle text-forest">Recommended</span>}
              </p>
              <p className="mt-1 truncate text-[0.875rem] text-ink-soft">
                {a.years} years · {a.sales} sales last year · {a.specialty}
              </p>
            </div>
            <span className="font-display text-xl text-forest">{a.rating.toFixed(1)}</span>
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <DemoBadge>Demo mode — nothing was sent or stored</DemoBadge>
        <div className="flex flex-wrap items-center gap-6">
          <a href={site.phoneHref} className="eyebrow link-line pb-1">
            {site.phone}
          </a>
          <button type="button" onClick={onRestart} className="eyebrow inline-flex items-center gap-2 text-ink-soft hover:text-ink">
            <RotateCcw aria-hidden className="size-4" strokeWidth={1.25} /> Start over
          </button>
        </div>
      </div>
    </div>
  );
}
