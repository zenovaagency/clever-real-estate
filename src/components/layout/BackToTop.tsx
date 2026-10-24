"use client";

import { ArrowUp } from "lucide-react";
import { getLenis } from "@/lib/motion-store";
import { prefersReducedMotion } from "@/lib/gsap";

export function BackToTop() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button type="button" onClick={toTop} className="group eyebrow inline-flex items-center gap-3 text-ink/75 transition-colors hover:text-ink">
      Back to top
      <span className="flex size-10 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
        <ArrowUp aria-hidden strokeWidth={1.25} className="size-4" />
      </span>
    </button>
  );
}
