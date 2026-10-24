import { z } from "zod";

import { intents, priceRanges, stateCodes, timelines, ZIP_PATTERN, type LeadErrors } from "./lead-options";

export type { LeadErrors };

export const leadSchema = z.object({
  intent: z.enum(intents, "Tell us whether you’re buying or selling."),
  zip: z.string().trim().regex(ZIP_PATTERN, "Enter a 5-digit ZIP code."),
  state: z.enum(stateCodes, "Choose your state."),
  price: z.enum(priceRanges, "Pick a price range."),
  timeline: z.enum(timelines, "Pick a timeline."),
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s.-]{10,20}$/, "Enter a phone number so your concierge can call."),
  consent: z.literal(true, "Please agree so we can contact you."),
});

export type Lead = z.infer<typeof leadSchema>;

export function flattenErrors(error: z.ZodError): LeadErrors {
  const out: LeadErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof Lead | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
