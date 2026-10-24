import { cn } from "@/lib/cn";

/** Numbered editorial section marker, e.g. "(02) — How it works". */
export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tone === "light" ? "text-paper/80" : "text-forest", className)}>
      {index && <span className="tabular-nums">({index})</span>}
      <span aria-hidden className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
