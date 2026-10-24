"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Building2, Check, Home, KeyRound, LoaderCircle, MapPin } from "lucide-react";
import {
  intentLabels,
  intents,
  priceRanges,
  states,
  timelines,
  ZIP_PATTERN,
  type Intent,
  type LeadErrors,
} from "@/lib/lead-options";
import { cn } from "@/lib/cn";
import { revealElement } from "@/lib/motion-store";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { FieldShell, inputClass, SelectChevron } from "@/components/ui/Field";
import { MatchResults } from "./MatchResults";

type Data = {
  intent: Intent | "";
  zip: string;
  state: string;
  price: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

type Status = "form" | "submitting" | "matching" | "done" | "error";

const STEP_COUNT = 5;
const intentIcons: Record<Intent, typeof Home> = { sell: Home, buy: KeyRound, both: Building2 };

function OptionButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-5 border p-5 text-left transition-[background-color,border-color] duration-500 ease-[var(--ease-expo)] md:p-6",
        selected ? "border-forest bg-sage" : "border-ink/15 bg-paper hover:border-ink/40",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "ml-auto flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
          selected ? "border-forest bg-forest text-paper" : "border-ink/25 text-transparent",
        )}
      >
        <Check className="size-3.5" strokeWidth={2} />
      </span>
    </button>
  );
}

export function MatchFlow({ initialIntent, initialZip }: { initialIntent?: Intent; initialZip?: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(initialIntent ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<Status>("form");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [data, setData] = useState<Data>({
    intent: initialIntent ?? "",
    zip: initialZip && ZIP_PATTERN.test(initialZip) ? initialZip : "",
    state: "",
    price: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    consent: false,
  });

  // Move focus to the new question so screen readers announce it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    revealElement(cardRef.current);
  }, [step]);

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const choose = <K extends "intent" | "price" | "timeline">(key: K, value: Data[K]) => {
    set(key, value);
    // A short beat so the selection registers before the next question slides in.
    setTimeout(() => go(step + 1), reduce ? 0 : 260);
  };

  const validateLocation = () => {
    const next: LeadErrors = {};
    if (!ZIP_PATTERN.test(data.zip.trim())) next.zip = "Enter a 5-digit ZIP code.";
    if (!data.state) next.state = "Choose your state.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    const { leadSchema, flattenErrors } = await import("@/lib/schema");
    const result = leadSchema.safeParse(data);
    if (!result.success) {
      const flat = flattenErrors(result.error);
      setErrors(flat);
      // Send the visitor back to the first step with a problem.
      const order: (keyof LeadErrors)[] = ["intent", "zip", "state", "price", "timeline"];
      const stepFor = { intent: 0, zip: 1, state: 1, price: 2, timeline: 3 } as const;
      const early = order.find((k) => flat[k]);
      if (early) go(stepFor[early as keyof typeof stepFor]);
      else document.querySelector<HTMLElement>(`#${CSS.escape(id)}-form [aria-invalid='true']`)?.focus();
      return;
    }
    // Demo mode on static hosting: the validated lead goes nowhere. To go live,
    // POST `result.data` to the CRM / concierge queue here.
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("matching");
  };

  const restart = () => {
    setData({ intent: "", zip: "", state: "", price: "", timeline: "", name: "", email: "", phone: "", consent: false });
    setErrors({});
    setStatus("form");
    setDirection(-1);
    setStep(0);
  };

  if (status === "matching" || status === "done") {
    return (
      <MatchResults
        name={data.name.trim().split(" ")[0]}
        zip={data.zip}
        intent={data.intent || "sell"}
        phase={status}
        onMatched={() => setStatus("done")}
        onRestart={restart}
      />
    );
  }

  const field = (name: keyof LeadErrors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": `${id}-${name}-error`,
  });

  const priceLabel = data.intent === "buy" ? "What’s your price range?" : "What’s your home worth, roughly?";

  const screens: { title: string; hint?: string; body: ReactNode }[] = [
    {
      title: "What can we help you with?",
      hint: "Clever is free either way.",
      body: (
        <div className="grid gap-3">
          {intents.map((key) => {
            const Icon = intentIcons[key];
            return (
              <OptionButton key={key} selected={data.intent === key} onClick={() => choose("intent", key)}>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-forest transition-colors duration-500 group-aria-pressed:border-forest group-aria-pressed:bg-forest group-aria-pressed:text-paper">
                  <Icon aria-hidden strokeWidth={1.25} className="size-5" />
                </span>
                <span>
                  <span className="font-display block text-[1.5rem] leading-tight">{intentLabels[key].title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-soft">{intentLabels[key].body}</span>
                </span>
              </OptionButton>
            );
          })}
          {errors.intent && <p role="alert" className="text-[0.8125rem] text-danger">{errors.intent}</p>}
        </div>
      ),
    },
    {
      title: data.intent === "buy" ? "Where are you looking to buy?" : "Where is your home?",
      hint: "We’ll match you with agents who sell there every month.",
      body: (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (validateLocation()) go(2);
          }}
        >
          <div className="grid gap-x-4 sm:grid-cols-2">
            <FieldShell id={`${id}-zip`} label="ZIP code" error={errors.zip}>
              <div className="relative">
                <MapPin aria-hidden strokeWidth={1.25} className="pointer-events-none absolute top-1/2 left-0 size-5 -translate-y-1/2 text-forest" />
                <input
                  {...field("zip")}
                  value={data.zip}
                  onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="e.g. 63101"
                  className={cn(inputClass(errors.zip), "pl-8")}
                />
              </div>
            </FieldShell>
            <FieldShell id={`${id}-state`} label="State" error={errors.state}>
              <div className="relative">
                <select
                  {...field("state")}
                  value={data.state}
                  onChange={(e) => set("state", e.target.value)}
                  className={cn(inputClass(errors.state), "pr-8")}
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {states.map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </FieldShell>
          </div>
          <Button type="submit" className="mt-4 w-full sm:w-auto">
            Continue
          </Button>
        </form>
      ),
    },
    {
      title: priceLabel,
      hint: "A ballpark is fine — your agent will refine it.",
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {priceRanges.map((p) => (
            <OptionButton key={p} selected={data.price === p} onClick={() => choose("price", p)}>
              <span className="font-display text-[1.3rem]">{p}</span>
            </OptionButton>
          ))}
          {errors.price && <p role="alert" className="text-[0.8125rem] text-danger sm:col-span-2">{errors.price}</p>}
        </div>
      ),
    },
    {
      title: data.intent === "buy" ? "When do you hope to buy?" : "When are you hoping to sell?",
      hint: "No pressure — plenty of people start early.",
      body: (
        <div className="grid gap-3">
          {timelines.map((t) => (
            <OptionButton key={t} selected={data.timeline === t} onClick={() => choose("timeline", t)} className="py-3.5 md:py-4">
              <span className="font-display text-[1.3rem]">{t}</span>
            </OptionButton>
          ))}
          {errors.timeline && <p role="alert" className="text-[0.8125rem] text-danger">{errors.timeline}</p>}
        </div>
      ),
    },
    {
      title: "Where should we send your matches?",
      hint: "A concierge will call to introduce your agents. No spam, ever.",
      body: (
        <form
          id={`${id}-form`}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-x-4 sm:grid-cols-2">
            <FieldShell id={`${id}-name`} label="Full name" error={errors.name} className="sm:col-span-2">
              <input
                {...field("name")}
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
                className={inputClass(errors.name)}
              />
            </FieldShell>
            <FieldShell id={`${id}-email`} label="Email" error={errors.email}>
              <input
                {...field("email")}
                type="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                className={inputClass(errors.email)}
              />
            </FieldShell>
            <FieldShell id={`${id}-phone`} label="Phone" error={errors.phone}>
              <input
                {...field("phone")}
                type="tel"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                className={inputClass(errors.phone)}
              />
            </FieldShell>
          </div>
          <label className="mt-2 flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
            <input
              type="checkbox"
              {...field("consent")}
              checked={data.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-forest"
            />
            <span>
              I agree that Clever and its partner agents may contact me by phone, text or email about my move. Consent
              isn’t a condition of using the service.
            </span>
          </label>
          <p id={`${id}-consent-error`} role={errors.consent ? "alert" : undefined} className="mt-1.5 min-h-[1.25rem] text-[0.8125rem] text-danger">
            {errors.consent}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={status === "submitting"} icon={status !== "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle aria-hidden className="size-4 animate-spin" />
                  Sending…
                </span>
              ) : (
                "Match me with agents"
              )}
            </Button>
            <p aria-live="polite" className="text-[0.875rem] text-danger">
              {status === "error" && "Something went wrong — please check your details and try again."}
            </p>
          </div>
        </form>
      ),
    },
  ];

  const screen = screens[step];
  const progress = ((step + 1) / STEP_COUNT) * 100;

  return (
    <div ref={cardRef} className="border border-ink/12 bg-paper">
      <div className="border-b border-ink/12 px-6 pt-6 pb-6 sm:px-10 sm:pt-8">
        <div className="flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="inline-flex h-9 items-center gap-2 eyebrow text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft aria-hidden strokeWidth={1.25} className="size-4" /> Back
            </button>
          ) : (
            <DemoBadge id={`${id}-demo`}>Demo mode — nothing is sent</DemoBadge>
          )}
          <p className="eyebrow text-ink-soft tabular-nums">
            Step {step + 1} of {STEP_COUNT}
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Progress"
          aria-valuemin={1}
          aria-valuemax={STEP_COUNT}
          aria-valuenow={step + 1}
          className="relative mt-6 h-px bg-ink/15"
        >
          <div
            className="h-px bg-forest transition-[width] duration-1000 ease-[var(--ease-expo)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -48 }}
            transition={{ duration: reduce ? 0.01 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.05] outline-none">
              {screen.title}
            </h2>
            {screen.hint && <p className="mt-3 text-ink-soft">{screen.hint}</p>}
            <div className="mt-10">{screen.body}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
