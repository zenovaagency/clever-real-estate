import { stats } from "@/data/content";
import { brokerages } from "@/data/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

export function StatsBand() {
  return (
    <section aria-label="Clever in numbers" className="border-y border-ink/10">
      <div className="container-x">
        <Reveal as="dl" stagger={0.1} className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end gap-3 py-10 md:py-14 ${i % 2 ? "pl-6 md:pl-10" : "pr-6"} ${i > 0 ? "lg:border-l lg:border-ink/10 lg:pl-10" : ""} ${i % 2 ? "border-l border-ink/10 lg:border-l" : ""} ${i > 1 ? "border-t border-ink/10 lg:border-t-0" : ""}`}
            >
              <dt className="max-w-[16rem] text-[0.9375rem] leading-snug text-ink-soft">{s.label}</dt>
              <dd className="font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-none">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
      <div className="border-t border-ink/10">
        <p className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-7 text-center">
          <span className="eyebrow text-ink-soft">Partner agents from</span>
          {brokerages.map((b) => (
            <span key={b} className="font-display text-xl text-ink/80 italic md:text-2xl">
              {b}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
