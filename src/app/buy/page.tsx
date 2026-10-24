import type { Metadata } from "next";
import housePool from "@/assets/images/house-pool.jpg";
import consultPlans from "@/assets/images/consult-plans.jpg";
import { buyerFaqs } from "@/data/content";
import { CASH_BACK } from "@/lib/savings";
import { formatUSD } from "@/lib/format";
import { faqJsonLd, jsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowLink, Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { SavingsSection } from "@/components/sections/SavingsSection";
import { Timeline } from "@/components/sections/Timeline";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Buy a home with a top agent — and receive cash back",
  description:
    "Get matched with a top local buyer’s agent at no cost, and receive up to $500 Clever Cash Back after closing in 41 states.",
  alternates: { canonical: "/buy" },
};

const buySteps = [
  { title: "An introduction", body: "Tell us where and when you hope to buy. We introduce agents who know those streets.", meta: "Minutes" },
  { title: "The search", body: "Your agent arranges viewings, flags issues early and shares local insight you won’t find online.", meta: "Weeks" },
  { title: "The offer", body: "Pricing strategy, negotiation and inspections, with an agent who closes often nearby.", meta: "Days" },
  { title: "The keys", body: "Close on your new home, then receive your Clever Cash Back.", meta: "At closing" },
];

const cashBack = [
  { value: formatUSD(CASH_BACK.buy), title: "When you buy with Clever", body: "Paid after closing when you purchase with a Clever partner agent." },
  { value: formatUSD(CASH_BACK.both), title: "When you buy and sell", body: "Move with Clever on both sides: save on your listing and double your cash back." },
  { value: "41", title: "States with cash back", body: "A few states prohibit buyer rebates. Your concierge confirms eligibility on your first call." },
];

export default function BuyPage() {
  return (
    <>
      <PageHeader
        label="Buying with Clever"
        title={
          <>
            An expert buyer’s agent, <em className="text-forest">and cash back.</em>
          </>
        }
        lede="Be introduced to a top local buyer’s agent at no cost and with no obligation — then receive up to $500 after you close."
        actions={
          <>
            <Button href="/get-started?intent=buy">Find my agent</Button>
            <ArrowLink href="#cash-back">How cash back works</ArrowLink>
          </>
        }
        image={housePool}
        alt="A contemporary home with a pool beyond a broad, manicured lawn"
        imageClassName="saturate-[.78]"
      />

      <section id="cash-back" aria-labelledby="cashback-title" className="section-y scroll-mt-20">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel index="01">Clever Cash Back</SectionLabel>
              <SplitHeading id="cashback-title" className="font-display text-display mt-8 max-w-[13ch]">
                A thank-you, <em>after closing.</em>
              </SplitHeading>
            </div>
            <p className="text-lede text-ink-soft md:col-span-4 md:col-start-9">
              Partner agents share part of the savings Clever brings them — with you.
            </p>
          </div>
          <Reveal as="dl" stagger={0.12} className="mt-16 grid border-t border-ink/15 md:mt-20 md:grid-cols-3">
            {cashBack.map((c, i) => (
              <div
                key={c.title}
                className={`flex flex-col-reverse justify-end gap-6 border-b border-ink/15 py-12 md:border-b-0 md:py-14 ${i > 0 ? "md:border-l md:border-ink/15 md:pl-10" : "md:pr-10"} ${i === 1 ? "md:pr-10" : ""}`}
              >
                <dt>
                  <span className="font-display text-title block">{c.title}</span>
                  <span className="mt-3 block leading-relaxed text-ink-soft">{c.body}</span>
                </dt>
                <dd className={`font-display text-[clamp(3.4rem,6vw,5.5rem)] leading-none ${i === 1 ? "text-forest" : ""}`}>{c.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="agent-title" className="section-y bg-stone">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <ParallaxImage
            src={consultPlans}
            alt="An agent talking a client through floor plans in a bright interior"
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="aspect-[4/5] lg:col-span-5"
            reveal
          />
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="02">Your buyer’s agent</SectionLabel>
            <SplitHeading id="agent-title" className="font-display text-display mt-8 max-w-[13ch]">
              Someone who knows the street, <em>not just the listing.</em>
            </SplitHeading>
            <p className="text-lede mt-8 max-w-lg text-ink-soft">
              Clever partner agents close homes in your chosen neighbourhoods every month. They know what sells
              quickly, what lingers, and how to write an offer that is accepted.
            </p>
            <ArrowLink href="/agents" className="mt-10">
              How we select agents
            </ArrowLink>
          </div>
        </div>
      </section>

      <Timeline index="03" label="Buying with Clever" title="From first viewing to front door." steps={buySteps} />
      <SavingsSection
        index="04"
        mode="both"
        title="Selling as well? Save on both sides."
        lede="Pair a 1.5% listing with $500 cash back on your next home."
      />
      <Faq index="05" items={buyerFaqs} title="Buyer questions, answered." />
      <CtaBanner title="Begin your search with an expert." href="/get-started?intent=buy" cta="Find my buyer’s agent" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(buyerFaqs))} />
    </>
  );
}
