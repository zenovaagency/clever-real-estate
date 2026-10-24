"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { registerTransition, scrollToTop } from "@/lib/motion-store";
import { Logo } from "./Logo";

/**
 * Curtain transition between routes: a forest band, then the paper panel. `TransitionLink` asks this layer to
 * cover the screen; once covered we navigate, and when the new pathname
 * commits the curtain lifts to reveal the incoming page.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const revealRef = useRef<(() => void) | null>(null);

  useGSAP(
    (_, contextSafe) => {
      let busy = false;
      let fallback: ReturnType<typeof setTimeout> | undefined;

      const reveal = contextSafe!(() => {
        clearTimeout(fallback);
        pending.current = null;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            gsap
              .timeline({
                onComplete: () => {
                  gsap.set(root.current, { visibility: "hidden" });
                  busy = false;
                },
              })
              .to("[data-pt-mark]", { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" })
              .to("[data-pt-panel]", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, 0.1)
              .to("[data-pt-accent]", { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, 0.2);
          }),
        );
      });

      const cover = contextSafe!((href: string) => {
        if (busy) return;
        busy = true;
        const target = href.split(/[?#]/)[0] || "/";
        gsap.set(root.current, { visibility: "visible" });
        gsap
          .timeline({
            onComplete: () => {
              scrollToTop();
              pending.current = target;
              router.push(href, { scroll: true });
              // Never leave the curtain down if navigation stalls.
              fallback = setTimeout(reveal, 3500);
            },
          })
          .fromTo("[data-pt-accent]", { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" })
          .fromTo("[data-pt-panel]", { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" }, 0.08)
          .fromTo("[data-pt-mark]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);
      });

      revealRef.current = reveal;
      registerTransition(cover);
      return () => {
        clearTimeout(fallback);
        registerTransition(null);
        revealRef.current = null;
      };
    },
    { scope: root, dependencies: [router] },
  );

  useEffect(() => {
    if (pending.current && pending.current === pathname) revealRef.current?.();
  }, [pathname]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ visibility: "hidden" }}>
      <div data-pt-accent className="absolute inset-0 bg-forest" />
      <div data-pt-panel className="absolute inset-0 flex items-center justify-center bg-paper">
        <div data-pt-mark className="opacity-0">
          <Logo className="h-12 md:h-14" />
        </div>
      </div>
    </div>
  );
}
