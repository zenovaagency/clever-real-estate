import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Seamless, decorative CSS marquee — content is rendered twice and translated by -50%. */
export function Marquee({
  children,
  duration = 60,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("flex overflow-hidden select-none", className)}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
