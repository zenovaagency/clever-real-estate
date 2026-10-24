export const site = {
  name: "Clever Real Estate",
  shortName: "Clever",
  tagline: "The finest local agents. Half the commission.",
  description:
    "Clever matches home buyers and sellers with top local agents from trusted brands. Sell for a 1.5% listing fee, get cash back when you buy — free, with no obligation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clever.zenova.agency",
  phone: "833-2-CLEVER",
  phoneDigits: "(833) 225-3837",
  phoneHref: "tel:+18332253837",
  hours: "7 days a week · 8am – 8pm ET",
  hq: "St. Louis, Missouri",
  founded: 2017,
  copyrightYear: 2026,
  nav: [
    { label: "Sell", href: "/sell" },
    { label: "Buy", href: "/buy" },
    { label: "Our agents", href: "/agents" },
    { label: "How it works", href: "/#how-it-works" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

/** Partner brands named on listwithclever.com, shown as text — not reproduced logos. */
export const brokerages = ["Keller Williams", "RE/MAX", "eXp Realty", "Century 21"];

/** Clever operates in all 50 states — a sample of markets for the marquee. */
export const markets = [
  "Denver", "Charlotte", "Phoenix", "Austin", "Tampa", "Columbus", "Nashville", "Atlanta",
  "Raleigh", "St. Louis", "Minneapolis", "Las Vegas", "San Diego", "Dallas", "Orlando", "Seattle",
];
