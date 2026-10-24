import { Check, Minus } from "lucide-react";
import { comparison } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (value === true) return <Check aria-label="Included" strokeWidth={1.5} className={`mx-auto size-5 ${highlight ? "text-forest" : "text-ink-soft"}`} />;
  if (value === false) return <Minus aria-label="Not included" strokeWidth={1.25} className="mx-auto size-5 text-ink/30" />;
  return <span className={highlight ? "font-display text-lg text-forest" : "text-ink-soft"}>{value}</span>;
}

export function Comparison() {
  return (
    <section aria-labelledby="compare-title" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index="05">A comparison</SectionLabel>
          <SplitHeading id="compare-title" className="font-display text-headline mt-8 max-w-[12ch]">
            The same service. A <em>different</em> invoice.
          </SplitHeading>
        </div>

        <Reveal className="lg:col-span-8">
          <table className="w-full text-left text-[0.9375rem] md:text-base">
            <caption className="sr-only">Selling with Clever compared with hiring an agent on your own</caption>
            <thead>
              <tr className="border-b border-ink/20">
                <th scope="col" className="w-[46%] pb-5 font-normal">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="eyebrow bg-sage px-4 pt-6 pb-5 text-center font-semibold text-forest">
                  With Clever
                </th>
                <th scope="col" className="eyebrow px-4 pt-6 pb-5 text-center font-semibold text-ink-soft">
                  On your own
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-ink/10">
                  <th scope="row" className="py-5 pr-4 font-normal md:py-6">
                    {row.label}
                  </th>
                  <td className="bg-sage px-4 py-5 text-center md:py-6">
                    <Cell value={row.clever} highlight />
                  </td>
                  <td className="px-4 py-5 text-center md:py-6">
                    <Cell value={row.diy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
