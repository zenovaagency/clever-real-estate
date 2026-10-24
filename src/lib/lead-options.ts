/** Match-flow options — kept free of zod so they can ship with the page. */
export const intents = ["sell", "buy", "both"] as const;
export type Intent = (typeof intents)[number];

export const intentLabels: Record<Intent, { title: string; body: string }> = {
  sell: { title: "Selling", body: "List with a top agent for 1.5%" },
  buy: { title: "Buying", body: "Get a great agent and cash back" },
  both: { title: "Buying & selling", body: "Save on both sides, $500 back" },
};

export const priceRanges = [
  "Under $200K",
  "$200K – $350K",
  "$350K – $500K",
  "$500K – $750K",
  "$750K – $1M",
  "$1M +",
] as const;

export const timelines = ["As soon as possible", "1 – 3 months", "3 – 6 months", "6 months +", "Just exploring"] as const;

export const states = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

export const stateCodes = states.map(([code]) => code) as [string, ...string[]];

export type LeadField = "intent" | "zip" | "state" | "price" | "timeline" | "name" | "email" | "phone" | "consent";
export type LeadErrors = Partial<Record<LeadField, string>>;

export const ZIP_PATTERN = /^\d{5}$/;
