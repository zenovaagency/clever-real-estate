"use client";

import { useSearchParams } from "next/navigation";
import { intents, type Intent } from "@/lib/lead-options";
import { MatchFlow } from "./MatchFlow";

/** Match flow that pre-selects intent and ZIP from `?intent=sell&zip=63101`. */
export function MatchFromParams() {
  const params = useSearchParams();
  const raw = params.get("intent") ?? "";
  const intent = (intents as readonly string[]).includes(raw) ? (raw as Intent) : undefined;
  const zip = params.get("zip") ?? undefined;
  return <MatchFlow key={`${intent ?? "none"}-${zip ?? ""}`} initialIntent={intent} initialZip={zip} />;
}
