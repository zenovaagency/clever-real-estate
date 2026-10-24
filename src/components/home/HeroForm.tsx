"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ZIP_PATTERN } from "@/lib/lead-options";
import { requestTransition } from "@/lib/motion-store";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const options = [
  { value: "sell", label: "I’m selling" },
  { value: "buy", label: "I’m buying" },
] as const;

/** Quick-start: intent + ZIP, handed to the full match flow via the URL. */
export function HeroForm() {
  const id = useId();
  const router = useRouter();
  const [intent, setIntent] = useState<"sell" | "buy">("sell");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const zip = String(new FormData(e.currentTarget).get("zip") ?? "").trim();
    if (zip && !ZIP_PATTERN.test(zip)) {
      setError("Please enter a 5-digit ZIP code.");
      return;
    }
    setError("");
    const params = new URLSearchParams({ intent });
    if (zip) params.set("zip", zip);
    const href = `/get-started?${params}`;
    if (prefersReducedMotion() || !requestTransition(href)) router.push(href);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div role="group" aria-label="What are you planning?" className="flex gap-8">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={intent === o.value}
            onClick={() => setIntent(o.value)}
            className={cn(
              "eyebrow relative pb-3 transition-colors duration-500",
              intent === o.value ? "text-ink" : "text-ink-soft hover:text-ink",
            )}
          >
            {o.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 h-px origin-left bg-forest transition-transform duration-700 ease-[var(--ease-expo)]",
                intent === o.value ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={`${id}-zip`} className="sr-only">
            {intent === "sell" ? "ZIP code of the home you’re selling" : "ZIP code where you want to buy"}
          </label>
          <input
            id={`${id}-zip`}
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder={intent === "sell" ? "ZIP code of your home" : "ZIP code you’re considering"}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-zip-error`}
            className={cn(
              "h-14 w-full rounded-none border-0 border-b bg-transparent px-0 text-lg text-ink placeholder:text-ink-soft/70 focus:ring-0 focus:outline-none",
              error ? "border-danger" : "border-ink/30 focus:border-forest",
            )}
          />
        </div>
        <Button type="submit">Find my agent</Button>
      </div>
      <p id={`${id}-zip-error`} role={error ? "alert" : undefined} className={cn("text-[0.8125rem] text-danger", error && "pt-3")}>
        {error}
      </p>
    </form>
  );
}
