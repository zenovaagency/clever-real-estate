"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { TransitionLink } from "./TransitionLink";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const [scrolled, setScrolled] = useState(false);
  // Hidden state is tagged with the route it was set on, so every new route
  // starts with the bar visible.
  const [hide, setHide] = useState({ path: pathname, value: false });
  const hidden = hide.path === pathname && hide.value;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHide({ path: pathRef.current, value: y > last && y > 400 });
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);
  const navLink =
    "eyebrow link-line pb-1 text-ink/80 transition-colors duration-500 hover:text-ink aria-[current=page]:text-ink";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-expo)]",
          scrolled && !menuOpen ? "border-ink/10 bg-paper/88 backdrop-blur-xl" : "border-transparent bg-transparent",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "container-x grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-700 ease-[var(--ease-expo)]",
            scrolled ? "h-[4.5rem]" : "h-20 md:h-24",
          )}
        >
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navLink}>
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:hidden" />

          <TransitionLink href="/" className="relative z-10 justify-self-center" aria-label="Clever Real Estate — home">
            <Logo className="h-7 md:h-8" />
          </TransitionLink>

          <div className="flex items-center justify-end gap-7">
            <a href={site.phoneHref} className="eyebrow hidden text-ink/80 transition-colors hover:text-ink xl:block">
              {site.phone}
            </a>
            <TransitionLink
              href="/get-started"
              className="eyebrow hidden h-11 items-center border border-ink/25 px-5 text-ink transition-colors duration-500 hover:border-forest hover:bg-forest hover:text-paper md:inline-flex"
            >
              Get matched
            </TransitionLink>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-11 items-center gap-3 lg:hidden"
            >
              <span className="eyebrow">{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[var(--ease-expo)]",
                    menuOpen ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-expo)]",
                    menuOpen ? "top-1/2 w-full -rotate-45" : "top-full w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
