import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stars({ score = 5, className }: { score?: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-bronze", className)} role="img" aria-label={`Rated ${score} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden strokeWidth={0} className={cn("size-[1em]", i < Math.round(score) ? "fill-current" : "fill-sand")} />
      ))}
    </span>
  );
}
