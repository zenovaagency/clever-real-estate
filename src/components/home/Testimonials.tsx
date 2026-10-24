"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { rating, reviews } from "@/data/content";
import { formatUSD, pad } from "@/lib/format";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Stars";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const DURATION = 8000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLElement>(null);
  const count = reviews.length;
  const autoplay = !reduce && !paused && !interacted && inView;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % count), DURATION);
    return () => clearTimeout(t);
  }, [autoplay, active, count]);

  const go = (delta: number) => {
    setInteracted(true);
    setActive((i) => (i + delta + count) % count);
  };

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-labelledby="testimonials-title"
      className="section-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SectionLabel index="07">
            <span id="testimonials-title">Client words</span>
          </SectionLabel>
          <p className="flex items-center gap-3 text-[0.875rem] text-ink-soft">
            <Stars /> {rating.label} · {rating.reviews} reviews
          </p>
        </div>

        <div className="relative mt-16 grid md:mt-24" aria-live={interacted ? "polite" : "off"}>
          {reviews.map((r, i) => (
            <div
              key={r.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== active}
              className={cn(
                "col-start-1 row-start-1 grid gap-10 transition-[opacity,translate,filter] duration-[1100ms] ease-[var(--ease-expo)] lg:grid-cols-12",
                i === active ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-5 opacity-0 blur-sm",
              )}
            >
              <figure className="contents">
              <blockquote className="font-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.12] tracking-[-0.02em] text-pretty lg:col-span-9">
                <span aria-hidden className="text-bronze">“</span>
                {r.quote}
                <span aria-hidden className="text-bronze">”</span>
              </blockquote>
              <figcaption className="flex flex-col gap-2 self-end border-t border-ink/15 pt-6 lg:col-span-3">
                <span className="eyebrow">{r.name}</span>
                <span className="text-[0.9375rem] text-ink-soft">
                  {r.kind} · {r.place}
                </span>
                <span className="font-display text-2xl text-forest">
                  {r.kind === "Bought" ? `${formatUSD(r.saved)} cash back` : `${formatUSD(r.saved)} saved`}
                </span>
              </figcaption>
              </figure>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-6 md:mt-20">
          <div className="flex gap-3">
            {([-1, 1] as const).map((d) => {
              const Icon = d === -1 ? ArrowLeft : ArrowRight;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(d)}
                  aria-label={d === -1 ? "Previous testimonial" : "Next testimonial"}
                  className="flex size-14 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 hover:border-forest hover:bg-forest hover:text-paper"
                >
                  <Icon aria-hidden strokeWidth={1.25} className="size-5" />
                </button>
              );
            })}
          </div>
          <span className="eyebrow text-ink-soft tabular-nums">
            {pad(active + 1)} / {pad(count)}
          </span>
          <div className="flex flex-1 gap-2" aria-hidden>
            {reviews.map((r, i) => (
              <span key={r.name} className="relative h-px flex-1 overflow-hidden bg-ink/15">
                <span
                  key={`${active}-${autoplay}`}
                  className="absolute inset-0 origin-left bg-forest"
                  style={{
                    transform: i < active || (i === active && !autoplay) ? "scaleX(1)" : "scaleX(0)",
                    animation: i === active && autoplay ? `progress ${DURATION}ms linear forwards` : undefined,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-8 text-[0.75rem] text-ink-soft">Illustrative testimonials written for this concept demo.</p>
      </div>
    </section>
  );
}
