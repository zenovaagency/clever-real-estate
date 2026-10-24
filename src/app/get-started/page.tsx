import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import livingCurtains from "@/assets/images/living-curtains.jpg";
import { rating } from "@/data/content";
import { site } from "@/data/site";
import { pad } from "@/lib/format";
import { MatchFlow } from "@/components/match/MatchFlow";
import { MatchFromParams } from "@/components/match/MatchFromParams";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Stars";

export const metadata: Metadata = {
  title: "Request an introduction to top local agents",
  description: "Answer a few short questions and be introduced to top local agents. No cost, no obligation.",
  alternates: { canonical: "/get-started" },
};

const next = [
  { title: "A concierge calls within minutes", body: "A licensed advisor confirms your details and answers any questions." },
  { title: "You meet your introductions", body: "Interview top local agents and compare their plans for your move." },
  { title: "You choose — or decline", body: "Select the agent you prefer. There is never any obligation." },
];

export default function GetStartedPage() {
  return (
    <section aria-labelledby="start-title" className="pt-36 pb-28 md:pt-44 md:pb-36">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="rise">
            <SectionLabel>Request an introduction</SectionLabel>
          </div>
          <h1 id="start-title" className="rise font-display text-display mt-8 text-balance">
            Meet the finest agents near you. <em className="text-forest">Complimentary.</em>
          </h1>
          <p className="rise-2 text-lede mt-8 max-w-md text-ink-soft">
            Five short questions, about a minute. Then a member of our concierge team takes it from there.
          </p>

          <ol className="rise-3 mt-12 hidden border-t border-ink/12 lg:block">
            {next.map((n, i) => (
              <li key={n.title} className="flex gap-6 border-b border-ink/12 py-6">
                <span className="font-display text-2xl text-bronze">{pad(i + 1)}</span>
                <div>
                  <p className="font-display text-xl">{n.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{n.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rise-3 mt-10 hidden items-center gap-6 lg:flex">
            <div className="relative size-24 shrink-0 overflow-hidden bg-stone">
              <Image src={livingCurtains} alt="" fill sizes="96px" placeholder="blur" className="object-cover" />
            </div>
            <div>
              <p className="flex items-center gap-3 text-[0.875rem] text-ink-soft">
                <Stars /> {rating.label} · {rating.reviews} reviews
              </p>
              <a href={site.phoneHref} className="eyebrow link-line mt-3 inline-block pb-1">
                Prefer to talk? {site.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="rise-2 lg:col-span-7">
          <Suspense fallback={<MatchFlow />}>
            <MatchFromParams />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
