/**
 * Copy for the demo. Fees, stats, steps and cash-back terms come from
 * listwithclever.com (October 2026). Reviews are illustrative placeholders
 * written for the demo — not real customers.
 */

export const stats = [
  { value: 23000, decimals: 0, prefix: "", suffix: "+", label: "People have bought or sold with Clever" },
  { value: 150, decimals: 0, prefix: "$", suffix: "M+", label: "Saved in real estate fees" },
  { value: 14000, decimals: 0, prefix: "", suffix: "+", label: "Vetted partner agents nationwide" },
  { value: 7000, decimals: 0, prefix: "$", suffix: "", label: "Average saved per transaction" },
];

export const rating = { label: "Excellent", reviews: "3,500+", score: 5 };

export type ValueProp = { title: string; body: string; icon: "agents" | "rates" | "free" };

export const valueProps: ValueProp[] = [
  {
    icon: "agents",
    title: "Better agents",
    body: "A network of 14,000+ full-service agents from brands like Keller Williams, RE/MAX and eXp. Agents only stay in the network by keeping their reviews strong.",
  },
  {
    icon: "rates",
    title: "Best rates",
    body: "Partner agents list your home for 1.5% ($3,000 minimum) — about half the typical fee. Clever sellers save around $7,000 on average.",
  },
  {
    icon: "free",
    title: "Free, no obligation",
    body: "Compare your matches, ask for more, or walk away at any time. Agents pay Clever a share of their commission only when your sale closes.",
  },
];

export type Step = { title: string; body: string };

export const steps: Step[] = [
  {
    title: "Tell us about your move",
    body: "Share a few details in under a minute. A licensed Concierge Team member reaches out within five minutes.",
  },
  {
    title: "We negotiate the rate",
    body: "Partner agents get a steady stream of clients from Clever. In return, they lower their fees for you.",
  },
  {
    title: "Choose your agent",
    body: "Interview your matches and pick the one you click with. Want more options? Just ask — or walk away.",
  },
];

export type ComparisonRow = { label: string; clever: string | boolean; diy: string | boolean };

export const comparison: ComparisonRow[] = [
  { label: "Listing fee", clever: "1.5% ($3,000 min)", diy: "Around 3%" },
  { label: "Full-service agent", clever: true, diy: true },
  { label: "Agents vetted on sales & reviews", clever: true, diy: false },
  { label: "Compare several top agents", clever: true, diy: false },
  { label: "Licensed concierge, 7 days a week", clever: true, diy: false },
  { label: "Cash back when you buy", clever: "$250 – $500", diy: false },
  { label: "Cost to use the service", clever: "Free", diy: "—" },
];

export type Review = { quote: string; name: string; place: string; saved: number; kind: "Sold" | "Bought" | "Bought & sold" };

export const reviews: Review[] = [
  {
    quote:
      "Our agent priced it perfectly and we had three offers in the first weekend. Same service our neighbours got — we just paid half the fee.",
    name: "Dana R.",
    place: "Aurora, CO",
    saved: 9120,
    kind: "Sold",
  },
  {
    quote:
      "The concierge called while I was still on the website. By the next morning I had two great agents to interview.",
    name: "Marcus T.",
    place: "Raleigh, NC",
    saved: 6480,
    kind: "Sold",
  },
  {
    quote:
      "We sold our condo and bought a house in the same month. One team handled both, and the cash back covered our movers.",
    name: "Priya & Sam K.",
    place: "Tampa, FL",
    saved: 8950,
    kind: "Bought & sold",
  },
  {
    quote:
      "I was nervous a discount meant a worse agent. It was the opposite — ours had closed 40 homes in our zip last year.",
    name: "Elena V.",
    place: "Columbus, OH",
    saved: 5310,
    kind: "Sold",
  },
  {
    quote: "First-time buyers, lots of questions. Our agent never rushed us, and we got a check after closing.",
    name: "Jordan & Lee M.",
    place: "Mesa, AZ",
    saved: 250,
    kind: "Bought",
  },
  {
    quote:
      "Interviewed two agents, went with the second. No pressure, no fine print, and the savings were exactly what the calculator said.",
    name: "Robert P.",
    place: "Nashville, TN",
    saved: 7740,
    kind: "Sold",
  },
];

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Is Clever really free?",
    a: "Yes. There’s no cost to use Clever and no obligation to work with any agent we introduce. Partner agents pay Clever a portion of their commission only after a sale closes.",
  },
  {
    q: "How can agents afford to charge 1.5%?",
    a: "Finding clients is one of an agent’s biggest costs. Clever sends partner agents a steady stream of motivated buyers and sellers, so they pass part of that saving on to you.",
  },
  {
    q: "Will I get less service for a lower fee?",
    a: "No. Partner agents are full-service: pricing strategy, professional photography, MLS listing, showings, negotiation and closing coordination are all included.",
  },
  {
    q: "Is Clever available in my area?",
    a: "Clever works in all 50 states and Washington, D.C. Cash back for buyers is available in 41 states where rebates are allowed.",
  },
  {
    q: "What if I don’t like my matches?",
    a: "Ask your concierge for more options or simply walk away. You’re never locked in until you sign with an agent you’ve chosen.",
  },
];

export const sellerFaqs: Faq[] = [
  {
    q: "What does the 1.5% listing fee include?",
    a: "Everything a traditional listing includes: a pricing analysis, professional photos, MLS and portal syndication, showings and open houses, offer negotiation and closing coordination.",
  },
  {
    q: "Do I still pay a buyer’s agent?",
    a: "Buyer’s agent commission, typically 2.5–3%, is negotiated separately and may still apply. If the buyer has no agent, there’s no extra buyer-agent commission to pay.",
  },
  {
    q: "Is there a minimum fee?",
    a: "Yes, $3,000. For homes under $200,000 the 1.5% rate isn’t guaranteed — your concierge will confirm the rate for your home before you sign anything.",
  },
  {
    q: "How fast will I hear back?",
    a: "A Concierge Team member typically calls within five minutes during business hours, and you can be interviewing agents the same day.",
  },
];

export const buyerFaqs: Faq[] = [
  {
    q: "How much cash back can I get?",
    a: "$250 when you buy with a Clever partner agent, or $500 when you buy and sell with Clever. It’s paid after closing.",
  },
  {
    q: "Is cash back available in my state?",
    a: "Cash back is available in 41 of 50 states. A handful of states don’t allow buyer rebates — your concierge will confirm eligibility on your first call.",
  },
  {
    q: "Does buying with Clever cost anything?",
    a: "No. Using Clever is free for buyers and there’s no obligation to continue with any agent.",
  },
  {
    q: "Can I use Clever if I’m already pre-approved?",
    a: "Absolutely. Your agent will work with your lender, or Clever can introduce you to lenders if you haven’t started yet.",
  },
];

export const sellFeatures = [
  "Pricing analysis built on local comps",
  "Professional photography & listing copy",
  "MLS, Zillow & portal syndication",
  "Showings, open houses & feedback",
  "Offer review & negotiation",
  "Closing coordination to keys",
];

export const vetting = [
  { title: "Proven sellers", body: "Partner agents are top performers in their markets, measured on recent closed sales and volume." },
  { title: "Reviews that hold up", body: "Agents have to keep their client reviews strong to stay in the network, long after they join." },
  { title: "Trusted brands", body: "Agents come from brokerages you know, including Keller Williams, RE/MAX, eXp Realty and Century 21." },
  { title: "Full service, always", body: "No limited-service listings. The lower rate covers the same work you’d expect at full price." },
];
