import type { Mode } from "@/lib/savings";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SavingsCalculator } from "@/components/savings/SavingsCalculator";

export function SavingsSection({
  index = "04",
  mode = "sell",
  title = "What you keep, at a glance.",
  lede = "Move the slider to your home’s value. The difference remains yours at closing.",
  className = "bg-stone",
}: {
  index?: string;
  mode?: Mode;
  title?: string;
  lede?: string;
  className?: string;
}) {
  return (
    <section id="calculator" aria-labelledby="calculator-title" className={`section-y scroll-mt-20 ${className}`}>
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index={index}>Savings estimate</SectionLabel>
            <SplitHeading id="calculator-title" className="font-display text-display mt-8 max-w-[13ch]">
              {title}
            </SplitHeading>
          </div>
          <p className="text-lede text-ink-soft md:col-span-4 md:col-start-9">{lede}</p>
        </div>
        <Reveal className="mt-16 md:mt-20">
          <SavingsCalculator initialMode={mode} />
        </Reveal>
      </div>
    </section>
  );
}
