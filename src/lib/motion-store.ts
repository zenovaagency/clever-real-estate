"use client";

import type Lenis from "lenis";

/**
 * Tiny module-level stores shared by the motion system. They live outside
 * React so that GSAP callbacks, Lenis and components can coordinate without
 * re-rendering the tree.
 */

/* ── Lenis instance ─────────────────────────────────────────── */
let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

/* ── Page transitions ──────────────────────────────────────── */
type TransitionHandler = (href: string) => void;
let transitionHandler: TransitionHandler | null = null;

export const registerTransition = (fn: TransitionHandler | null) => {
  transitionHandler = fn;
};

/** Returns true if the transition layer took over the navigation. */
export function requestTransition(href: string) {
  if (!transitionHandler) return false;
  transitionHandler(href);
  return true;
}

/** Scrolls so `el` sits just below the navbar, unless it is already comfortably in view. */
export function revealElement(el: HTMLElement | null, offset = 112) {
  if (!el) return;
  const top = el.getBoundingClientRect().top;
  if (top >= offset - 8 && top < window.innerHeight * 0.5) return;
  const y = window.scrollY + top - offset;
  if (lenis) lenis.scrollTo(y, { duration: 0.9 });
  else window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
