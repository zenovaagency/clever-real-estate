import type { Metadata } from "next";
import consultCouple from "@/assets/images/consult-couple.jpg";
import { agents } from "@/data/agents";
import { vetting } from "@/data/content";
import { brokerages } from "@/data/site";
import { pad } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AgentCard } from "@/components/agents/AgentCard";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Our partner agents",
  description:
    "Clever partners with 14,000+ top-performing, full-service agents from Keller Williams, RE/MAX, eXp Realty, Century 21 and more.",
  alternates: { canonical: "/agents" },
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        label="Our agents"
        title={
          <>
            Only the agents we would <em className="text-forest">hire ourselves.</em>
          </>
        }
        lede="A network of 14,000+ partner agents, chosen on track record and reviews — and held to that standard long after they join."
        actions={<Button href="/get-started">Meet agents near me</Button>}
        image={consultCouple}
        alt="A couple reviewing documents with their agent in a bright, modern room"
        position="50% 30%"
      />

      <section aria-labelledby="vetting-title" className="section-y">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel index="01">Our selection</SectionLabel>
              <SplitHeading id="vetting-title" className="font-display text-display mt-8 max-w-[14ch]">
                Four standards, before any introduction.
              </SplitHeading>
            </div>
          </div>
          <Reveal as="ol" stagger={0.1} className="mt-16 grid border-t border-ink/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {vetting.map((v, i) => (
              <li
                key={v.title}
                className={`border-b border-ink/15 py-10 sm:pr-8 lg:border-b-0 lg:py-12 ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:border-ink/15 sm:pl-8" : ""}`}
              >
                <span className="font-display text-5xl leading-none text-bronze">{pad(i + 1)}</span>
                <h3 className="font-display text-title mt-10">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{v.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="profiles-title" className="section-y bg-stone">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel index="02">The network</SectionLabel>
              <SplitHeading id="profiles-title" className="font-display text-display mt-8 max-w-[14ch]">
                The calibre of agent you will meet.
              </SplitHeading>
            </div>
            <p className="text-ink-soft md:col-span-4 md:col-start-9">
              Sample profiles for this concept demo. Your introductions depend on your location, price point and
              timeline.
            </p>
          </div>
          <Reveal stagger={0.08} className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
            {agents.map((a) => (
              <AgentCard key={a.name} agent={a} />
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-label="Partner brokerages" className="border-y border-ink/10 py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-8 text-center">
          <p className="eyebrow text-ink-soft">Partner agents from</p>
          <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4 md:gap-x-20">
            {brokerages.map((b) => (
              <li key={b} className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] italic">
                {b}
              </li>
            ))}
          </ul>
          <p className="text-ink-soft">…and leading independent brokerages nationwide.</p>
        </div>
      </section>

      <CtaBanner title="Meet your introductions today." />
    </>
  );
}
