"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type SplitHeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * `scroll` — lines rise out of their masks when the heading enters the viewport.
   * `load`   — lines rise as soon as the page hydrates.
   * `scrub`  — words brighten progressively as the reader scrolls through.
   */
  mode?: "scroll" | "load" | "scrub";
  delay?: number;
};

/** Editorial headline reveal: each line rises out of its own mask. */
export function SplitHeading({ as: Tag = "h2", children, className, id, mode = "scroll", delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }

      const split = SplitText.create(el, {
        type: mode === "scrub" ? "words" : "lines",
        mask: mode === "scrub" ? undefined : "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self: SplitText) {
          self.masks?.forEach((m) => m.classList.add("split-mask"));
          gsap.set(el, { visibility: "visible" });

          if (mode === "scrub") {
            return gsap.fromTo(
              self.words,
              // Start at 0.5 so dimmed words keep a 3:1 contrast for large text.
              { opacity: 0.5 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 0.6 },
              },
            );
          }

          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.1,
            ease: "expo.out",
            delay,
            scrollTrigger: mode === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [mode, delay] },
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
