"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll } from "@/lib/motion-store";
import { pad } from "@/lib/format";
import { TransitionLink } from "./TransitionLink";

const links = [{ label: "Home", href: "/" }, ...site.nav, { label: "Get matched", href: "/get-started" }];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(root.current, { visibility: "visible" })
        .fromTo(root.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 })
        .fromTo("[data-menu-link]", { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "expo.out" }, 0.35)
        .fromTo("[data-menu-foot]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" }, 0.6);
    },
    { scope: root },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (open) {
      lockScroll(true);
      if (prefersReducedMotion()) timeline.progress(1);
      else timeline.timeScale(1).play();
      const first = root.current?.querySelector<HTMLElement>("a");
      setTimeout(() => first?.focus({ preventScroll: true }), 300);
    } else {
      lockScroll(false);
      if (prefersReducedMotion()) timeline.progress(0);
      else timeline.timeScale(1.6).reverse();
    }
  }, [open]);

  // Keyboard: Esc closes, Tab is trapped between the menu and its toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]')?.focus();
        return;
      }
      if (e.key !== "Tab" || !root.current) return;
      const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
      const focusables = [
        ...(toggle ? [toggle] : []),
        ...root.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Desktop resize closes the menu.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && onClose();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className="fixed inset-0 z-40 flex flex-col bg-paper text-ink lg:hidden"
      style={{ visibility: "hidden" }}
    >
      <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-24">
        <ul className="flex flex-col">
          {links.map((link, i) => {
            const active = link.href === "/" ? pathname === "/" : !link.href.includes("#") && pathname.startsWith(link.href);
            return (
              <li key={link.href} className="overflow-hidden border-b border-ink/10">
                <TransitionLink
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  data-menu-link
                  className="group flex items-baseline gap-5 py-4"
                >
                  <span className="eyebrow w-6 text-forest tabular-nums">{pad(i + 1)}</span>
                  <span
                    className={`font-display text-[clamp(2.4rem,10vw,4rem)] leading-[1] transition-colors ${active ? "text-forest italic" : "group-hover:text-forest"}`}
                  >
                    {link.label}
                  </span>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div data-menu-foot className="container-x grid gap-2 py-8">
        <p className="eyebrow text-ink-soft">Concierge · {site.hours}</p>
        <a href={site.phoneHref} className="font-display text-2xl">
          {site.phone}
        </a>
      </div>
    </div>
  );
}
