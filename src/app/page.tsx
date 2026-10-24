import { homeFaqs } from "@/data/content";
import { faqJsonLd, jsonLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { StatsBand } from "@/components/home/StatsBand";
import { Statement } from "@/components/home/Statement";
import { Standard } from "@/components/home/Standard";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Comparison } from "@/components/home/Comparison";
import { SellBuy } from "@/components/home/SellBuy";
import { Testimonials } from "@/components/home/Testimonials";
import { SavingsSection } from "@/components/sections/SavingsSection";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Statement />
      <Standard />
      <HowItWorks />
      <SavingsSection />
      <Comparison />
      <SellBuy />
      <Testimonials />
      <Faq items={homeFaqs} className="border-t border-ink/10" />
      <CtaBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(homeFaqs))} />
    </>
  );
}
