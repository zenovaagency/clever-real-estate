import type { Metadata } from "next";
import houseMinimal from "@/assets/images/house-minimal.jpg";
import livingStair from "@/assets/images/living-stair.jpg";
import { sellerFaqs, sellFeatures } from "@/data/content";
import { site } from "@/data/site";
import { faqJsonLd, jsonLd } from "@/lib/seo";
import { pad } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { SavingsSection } from "@/components/sections/SavingsSection";
import { Timeline } from "@/components/sections/Timeline";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Sell your home for a 1.5% listing fee",
  description:
    "Sell with a top local agent for 1.5% ($3,000 minimum) — about half the typical fee. Full service, free to use and no obligation.",
  alternates: { canonical: "/sell" },
};

const sellSteps = [
  { title: "An introduction", body: "Share your address and timeline. Your concierge introduces top agents who sell nearby.", meta: "Minutes" },
  { title: "The interviews", body: "Meet your matches, compare their pricing strategy and choose the one you trust.", meta: "1–2 days" },
  { title: "To market", body: "Pricing, photography, MLS and showings — handled by your full-service agent.", meta: "1–2 weeks" },
  { title: "To closing", body: "Your agent negotiates and steers you to closing, at a 1.5% listing fee.", meta: "At closing" },
];

export default function SellPage() {
  return (
    <>
      <PageHeader
        label="Selling with Clever"
        title={
          <>
            Sell with a top agent, <em className="text-forest">for 1.5%.</em>
          </>
        }
        lede="Agents from the most respected brokerages, pre-negotiated to represent your home for about half the usual fee — with no change to the service you receive."
        actions={
          <>
            <Button href="/get-started?intent=sell">Request an introduction</Button>
            <a href={site.phoneHref} className="eyebrow link-line pb-1">
              {site.phone}
            </a>
          </>
        }
        image={houseMinimal}
        alt="A white Mediterranean house with a sunlit lawn beneath a clear blue sky"
        position="50% 45%"
        aside={
          <div className="bg-paper p-6 sm:p-8">
            <p className="eyebrow text-ink-soft">Listing fee on a $450,000 home</p>
            <p className="mt-3 flex items-baseline gap-4">
              <span className="font-display text-5xl text-forest">$6,750</span>
              <span className="font-display text-xl text-ink-soft line-through decoration-1">$13,500</span>
            </p>
          </div>
        }
      />

      <SavingsSection
        index="01"
        mode="sell"
        title="What would you keep at 1.5%?"
        lede="Adjust the value to match your home. Clever sellers keep around $7,000 more at closing, on average."
        className="mt-24 bg-stone md:mt-32"
      />

      <section aria-labelledby="service-title" className="section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionLabel index="02">Full service</SectionLabel>
            <SplitHeading id="service-title" className="font-display text-display mt-8 max-w-[11ch]">
              Half the fee. <em>None</em> of the shortcuts.
            </SplitHeading>
            <p className="text-lede mt-8 max-w-md text-ink-soft">
              Clever partner agents are not a discount brokerage. Everything a 3% agent would do is included.
            </p>
            <ParallaxImage
              src={livingStair}
              alt="A bright open-plan living and dining space with a floating timber staircase"
              sizes="(min-width: 1024px) 36vw, 92vw"
              className="mt-12 aspect-[4/3]"
              reveal
            />
          </div>
          <Reveal as="ol" stagger={0.07} className="self-end border-t border-ink/15 lg:col-span-6 lg:col-start-7">
            {sellFeatures.map((f, i) => (
              <li key={f} className="flex items-baseline gap-8 border-b border-ink/15 py-7">
                <span className="eyebrow w-6 text-bronze tabular-nums">{pad(i + 1)}</span>
                <span className="font-display flex-1 text-[clamp(1.35rem,2vw,1.75rem)]">{f}</span>
                <span className="eyebrow text-forest">Included</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Timeline index="03" label="The process" title="From first call to closing day." steps={sellSteps} className="bg-stone" />
      <Faq index="04" items={sellerFaqs} title="Seller questions, answered." />
      <CtaBanner title="Discover what your home could keep." href="/get-started?intent=sell" cta="Request an introduction" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(sellerFaqs))} />
    </>
  );
}
