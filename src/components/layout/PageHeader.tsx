import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  image: StaticImageData;
  alt: string;
  aside?: ReactNode;
  /** CSS object-position for the photograph, e.g. "50% 30%". */
  position?: string;
  imageClassName?: string;
};

/** Inner-page masthead: editorial type over a wide unveiled photograph. */
export function PageHeader({ label, title, lede, actions, image, alt, aside, position, imageClassName }: PageHeaderProps) {
  return (
    <header className="pt-36 md:pt-44">
      <div className="container-x">
        <div className="rise">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          {/* CSS-driven reveal: starts at first paint, so the masthead never waits on JavaScript (LCP). */}
          <h1 className="rise font-display text-display text-balance lg:col-span-7">{title}</h1>
          <div className="rise-2 lg:col-span-4 lg:col-start-9 lg:pb-2">
            {lede && <p className="text-lede text-ink-soft">{lede}</p>}
            {actions && <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>}
          </div>
        </div>
      </div>
      <div className="container-x mt-14 md:mt-20">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image src={image} alt={alt} fill preload sizes="(min-width: 1440px) 1300px, 92vw" placeholder="blur" className={cn("settle object-cover", imageClassName)} style={position ? { objectPosition: position } : undefined} />
            <span aria-hidden className="curtain" />
          {aside && <div className="absolute bottom-0 left-0 hidden sm:block">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
