"use client";

import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Animate direct children one after another instead of the element itself. */
  stagger?: number;
  delay?: number;
  y?: number;
  /** Viewport position (ScrollTrigger `start`) at which the reveal fires. */
  start?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Fades and lifts content into view as it enters the viewport. */
export function Reveal<T extends ElementType = "div">({
  as,
  stagger,
  delay = 0,
  y = 36,
  start = "top 88%",
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : [el];
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal={stagger ? "stagger" : ""} {...rest}>
      {children}
    </Tag>
  );
}
