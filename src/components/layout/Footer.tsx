import { site } from "@/data/site";
import { TransitionLink } from "./TransitionLink";
import { BackToTop } from "./BackToTop";
import { Logo, LOGO_WORDMARK } from "./Logo";

const columns = [
  {
    title: "Sellers",
    links: [
      { label: "Sell with Clever", href: "/sell" },
      { label: "Savings calculator", href: "/sell#calculator" },
      { label: "Seller questions", href: "/sell#faq" },
    ],
  },
  {
    title: "Buyers",
    links: [
      { label: "Buy with Clever", href: "/buy" },
      { label: "Clever Cash Back", href: "/buy#cash-back" },
      { label: "Buyer questions", href: "/buy#faq" },
    ],
  },
  {
    title: "Clever",
    links: [
      { label: "Our agents", href: "/agents" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Get matched", href: "/get-started" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-stone text-ink">
      <div className="container-x pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 text-forest">The concierge</p>
            <p className="font-display text-headline max-w-md text-balance">
              A licensed advisor, <em>seven days</em> a week.
            </p>
            <a href={site.phoneHref} className="font-display link-line mt-8 inline-block text-3xl">
              {site.phone}
            </a>
            <p className="mt-3 text-[0.9375rem] text-ink-soft">{site.hours}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-6 text-ink-soft">{col.title}</p>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <TransitionLink href={l.href} className="link-line inline-block py-1 text-[0.9375rem] text-ink/85 hover:text-ink">
                        {l.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
          <Logo className="h-8" />
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="eyebrow link-line text-ink/75 hover:text-ink">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <BackToTop />
        </div>
      </div>

      {/* Clever's own wordmark, oversized and faint. */}
      <svg aria-hidden viewBox="34 4.5 73.5 19.2" className="pointer-events-none mx-auto mt-12 -mb-[1.2vw] block w-[92%] fill-ink/[0.05]">
        {LOGO_WORDMARK.map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </svg>

      <div className="relative border-t border-ink/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.75rem] leading-relaxed text-ink-soft md:flex-row md:justify-between md:gap-10">
          <p className="max-w-3xl">
            Concept demo by ZENOVA. Not affiliated with or endorsed by Clever Real Estate. Fees and figures are taken
            from listwithclever.com (October 2026); agent profiles and reviews are illustrative.
          </p>
          <p className="shrink-0">Photography: Pexels contributors</p>
        </div>
      </div>
    </footer>
  );
}
