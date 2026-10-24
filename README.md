# Clever Real Estate — concept demo

A light, editorial-luxury concept redesign for [Clever Real Estate](https://listwithclever.com), the St. Louis agent-matching service that pairs home buyers and sellers with top local agents for a 1.5% listing fee and buyer cash back. Warm paper and stone, a high-contrast Bodoni serif, hairline rules, a single deep evergreen accent and bright architectural photography; Clever’s own logo is kept and recoloured to suit. Built by ZENOVA with **Next.js 16 (App Router, Cache Components)**, **TypeScript**, **Tailwind CSS v4**, **GSAP** (ScrollTrigger + SplitText), **Lenis**, **Motion**, **zod** and **Lucide**.

> Not affiliated with or endorsed by Clever Real Estate. Fees, stats and cash-back terms come from listwithclever.com (October 2026). Agent profiles and reviews are illustrative placeholders.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/ (+ segment-file fix for static hosts)
npm start        # serves out/ locally
```

## Deployment

Live at **https://clever.zenova.agency**, served by GitHub Pages from `zenovaagency/clever-real-estate`. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static export and publishes `out/`. `public/CNAME` carries the custom domain; DNS is a Cloudflare CNAME `clever` → `zenovaagency.github.io` (DNS only).

Static hosting shapes a few choices: `output: "export"` (so no Cache Components, route handlers or headers), `images.unoptimized` with photos pre-compressed by `npm run optimize-images`, and a static `opengraph-image.jpg`. `NEXT_PUBLIC_SITE_URL` defaults to the live domain.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Split hero (serif headline, intent + ZIP quick-start, tall photograph with fee card), stats band, scroll-scrub proposition, "The Clever standard", how it works, savings estimate, comparison table, selling & buying panels, testimonial carousel, questions, split CTA |
| `/sell` | Masthead with fee card, savings estimate, numbered list of what 1.5% includes, process timeline, seller questions |
| `/buy` | Buyer masthead, Clever Cash Back ($250 / $500, 41 states), buyer's-agent story, timeline, buy-and-sell calculator, buyer FAQ |
| `/agents` | Vetting criteria, sample agent profiles, partner brokerages |
| `/get-started` | Five-step match flow (intent → location → price → timeline → contact) with animated steps, then a short "preparing your introductions" sequence, three recommended agents and a concierge countdown. `?intent=sell&zip=63101` pre-fills it |

## Savings maths

`src/lib/savings.ts` is pure and documented. Assumptions shown beside the calculator:

- Traditional listing fee 3%; Clever 1.5% with a $3,000 minimum (not guaranteed under $200K)
- Buyer's agent commission 3% in both scenarios when the buyer has an agent
- Cash back: $250 buying, $500 buying and selling

At $300K that's $13,500 vs $18,000 — **$4,500 saved**. Clever's own calculator uses state-level averages, so its figures differ slightly.

## Demo mode

There is no backend. The match flow validates fully with the shared zod schema and shows a success state labelled **Demo mode**; nothing is sent or stored. To go live, POST the validated payload from `submit()` in `src/components/match/MatchFlow.tsx` to the CRM / concierge queue.

## Project structure

```
src/
  app/            routes, metadata (sitemap, robots, OG image, Clever icons)
  components/
    layout/       navbar, mobile menu, footer, page transition, masthead
    motion/       Lenis, reveals, split headings, parallax, magnetic, count-up, marquee
    home/         home-page sections (hero, proof bar, how it works, tabs, reviews…)
    sections/     shared sections: savings, FAQ, timeline, concierge CTA
    savings/      savings calculator
    match/        multi-step match flow and results
    agents/       agent profile card
    ui/           button, fields, section label, stars, demo badge
  data/           site config, copy, sample agents
  lib/            savings maths, lead options + zod schema, JSON-LD, GSAP setup, formatting
```

## Design system

Light editorial luxury, deliberately unlike Clever’s current site:

- **Palette:** paper `#FAF8F4`, stone `#F1EDE6`, ink `#15140F`, evergreen `#1F3B32` for actions and emphasis, sage `#E3E9E4` for highlighted panels, bronze `#8C6D46` for large numerals only.
- **Type:** Bodoni Moda (optical sizes, with italics for emphasis) for display; Hanken Grotesk for text; tracked uppercase eyebrows.
- **Logo:** Clever’s own pin-and-house mark and wordmark (`src/components/layout/Logo.tsx`), recoloured — mark in evergreen, wordmark in ink. Also used for the favicon, OG image and the oversized footer watermark.
- **Detail:** square-cornered buttons with a rising fill, hairline dividers, numbered section labels, grayscale agent portraits that warm to colour on hover.

## Motion & accessibility notes

- One shared GSAP ticker drives Lenis and ScrollTrigger. All motion is turned off under `prefers-reduced-motion`: no smooth scroll or parallax, content shown immediately.
- Section headings rise line by line out of masks; the proposition text brightens word by word as you scroll; photographs drift with parallax. Mastheads use CSS-only animations and a lifting curtain (not a clip-path) so the largest paint is never held back.
- The match flow moves focus to each new question, validates per step and returns you to the first step with a problem.
- Keyboard support: skip link, focus-trapped mobile menu (Esc closes), arrow-key tabs, accessible accordion, labelled form errors.

## Credits

Photography from Pexels — see [CREDITS.md](./CREDITS.md). Logo artwork belongs to Clever Real Estate.
