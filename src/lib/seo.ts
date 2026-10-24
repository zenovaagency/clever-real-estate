import type { Faq } from "@/data/content";
import { site } from "@/data/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneDigits,
    foundingDate: String(site.founded),
    areaServed: { "@type": "Country", name: "United States" },
    address: { "@type": "PostalAddress", addressLocality: "St. Louis", addressRegion: "MO", addressCountry: "US" },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
