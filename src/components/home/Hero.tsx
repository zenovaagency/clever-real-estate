import Image from "next/image";
import houseWhite from "@/assets/images/house-white.jpg";
import { rating } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Stars";
import { HeroForm } from "./HeroForm";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
          <div className="rise">
            <SectionLabel>Top local agents · 1.5% listing fee</SectionLabel>
          </div>

          {/* CSS-driven reveal so the headline paints immediately (LCP). */}
          <h1 id="hero-title" className="rise font-display text-hero mt-8 text-balance">
            The finest local agents. <em className="text-forest">Half</em> the commission.
          </h1>

          <p className="rise-2 text-lede mt-8 max-w-xl text-ink-soft">
            Clever introduces you to top-performing agents from the most respected brokerages — and negotiates their
            listing fee to 1.5%. The same expertise, the same full service, thousands more at closing.
          </p>

          <div className="rise-3 mt-11 max-w-xl">
            <HeroForm />
          </div>

          <p className="rise-3 mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.875rem] text-ink-soft">
            <Stars className="text-[0.95rem]" />
            <span>
              Rated <span className="text-ink">{rating.label}</span> across {rating.reviews} reviews
            </span>
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:aspect-auto lg:h-full lg:min-h-[44rem]">
            <Image
              src={houseWhite}
              alt="A white contemporary residence behind a mature tree under a soft summer sky"
              fill
              preload
              sizes="(min-width: 1024px) 46vw, 92vw"
              placeholder="blur"
              quality={85}
              className="settle object-cover object-[50%_60%]"
            />
            <span aria-hidden className="curtain" />
          </div>

          <div className="rise-3 absolute bottom-0 left-0 w-[min(20rem,80%)] bg-paper p-6 sm:p-7 lg:-left-16">
            <p className="eyebrow text-ink-soft">Listing fee</p>
            <div className="mt-3 flex items-baseline gap-4">
              <span className="font-display text-6xl leading-none text-forest">1.5%</span>
              <span className="font-display text-2xl text-ink-soft line-through decoration-1">3%</span>
            </div>
            <div className="hairline mt-5" />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-soft">
              Pre-negotiated with partner agents. A $3,000 minimum applies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
