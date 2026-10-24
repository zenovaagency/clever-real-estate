import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pad } from "@/lib/format";

export type TimelineStep = { title: string; body: string; meta: string };

export function Timeline({
  index,
  label,
  title,
  steps,
  className = "",
}: {
  index?: string;
  label: string;
  title: string;
  steps: TimelineStep[];
  className?: string;
}) {
  return (
    <section aria-labelledby="timeline-title" className={`section-y ${className}`}>
      <div className="container-x">
        <SectionLabel index={index}>{label}</SectionLabel>
        <SplitHeading id="timeline-title" className="font-display text-display mt-8 max-w-[14ch]">
          {title}
        </SplitHeading>
        <Reveal as="ol" stagger={0.1} className="mt-16 grid border-t border-ink/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`flex flex-col border-b border-ink/15 py-10 sm:pr-8 lg:border-b-0 lg:py-12 ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:border-ink/15 sm:pl-8 lg:pl-8" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-5xl leading-none text-bronze">{pad(i + 1)}</span>
                <span className="eyebrow text-ink-soft">{s.meta}</span>
              </div>
              <h3 className="font-display text-title mt-10">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
