"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Vertical drift as a percentage of the frame height. 0 disables parallax. */
  speed?: number;
  /** Curtain-style clip reveal when the frame enters the viewport. */
  reveal?: boolean | "left" | "bottom";
  preload?: boolean;
  /** Slow zoom when an ancestor with the `group` class is hovered. */
  hoverZoom?: boolean;
  quality?: number;
};

/**
 * An image inside a fixed frame that drifts slower than the page and, on
 * first view, is unveiled by a clip-path curtain while settling from a
 * slight zoom.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  speed = 10,
  reveal = false,
  preload = false,
  hoverZoom = false,
  quality = 75,
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!frame.current || !inner.current || prefersReducedMotion()) return;

      if (speed) {
        gsap.fromTo(
          inner.current,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      if (reveal) {
        const from = reveal === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame.current, start: "top 85%", once: true } });
        tl.fromTo(
          frame.current,
          { clipPath: from },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
        ).fromTo(
          inner.current.querySelector("img"),
          { scale: 1.3 },
          { scale: 1, duration: 2.2, ease: "expo.out" },
          0.1,
        );
      }
    },
    { scope: frame, dependencies: [speed, reveal] },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden bg-stone", className)}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${speed / 2}%`, bottom: `-${speed / 2}%` }}
      >
        <div
          className={cn(
            "absolute inset-0",
            hoverZoom && "transition-[scale] duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]",
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            preload={preload}
            placeholder="blur"
            className={cn("object-cover", imageClassName)}
          />
        </div>
      </div>
    </div>
  );
}
