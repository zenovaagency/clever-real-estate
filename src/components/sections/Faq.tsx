"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Faq({
  items,
  index = "08",
  title = "Questions, answered plainly.",
  className = "",
}: {
  items: FaqItem[];
  index?: string;
  title?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="faq" aria-labelledby={`${id}-title`} className={`section-y scroll-mt-20 ${className}`}>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index={index}>Questions</SectionLabel>
          <SplitHeading id={`${id}-title`} className="font-display text-headline mt-8 max-w-[11ch]">
            {title}
          </SplitHeading>
        </div>
        <Reveal as="ul" stagger={0.06} className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {items.map((f, i) => {
            const expanded = open === i;
            return (
              <li key={f.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q-${i}`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-a-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group flex w-full items-center justify-between gap-8 py-7 text-left md:py-8"
                  >
                    <span
                      className={cn(
                        "font-display text-[clamp(1.3rem,2vw,1.75rem)] leading-snug transition-colors duration-500",
                        expanded ? "text-forest" : "group-hover:text-forest",
                      )}
                    >
                      {f.q}
                    </span>
                    <Plus
                      aria-hidden
                      strokeWidth={1.25}
                      className={cn(
                        "size-6 shrink-0 transition-transform duration-700 ease-[var(--ease-expo)]",
                        expanded ? "rotate-45 text-forest" : "text-ink-soft",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  aria-hidden={!expanded}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden" inert={!expanded}>
                    <p className="max-w-2xl pb-8 leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
