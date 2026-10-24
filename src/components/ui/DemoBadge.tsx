import { cn } from "@/lib/cn";

export function DemoBadge({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <p id={id} className={cn("eyebrow inline-flex items-center gap-2 border border-bronze/40 px-3 py-2 text-bronze", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </p>
  );
}
