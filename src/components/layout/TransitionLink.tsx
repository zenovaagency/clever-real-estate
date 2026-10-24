"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { requestTransition } from "@/lib/motion-store";

type TransitionLinkProps = ComponentProps<typeof Link> & { href: string };

/**
 * A `next/link` that plays the curtain page transition before navigating.
 * Modified clicks (new tab, etc.), hash links, same-page links and reduced
 * motion all fall through to default link behaviour.
 */
export function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (props.target && props.target !== "_self") return;
    if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"))
      return;
    const targetPath = href.split(/[?#]/)[0] || "/";
    if (targetPath === pathname || prefersReducedMotion()) return;
    if (requestTransition(href)) e.preventDefault();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
