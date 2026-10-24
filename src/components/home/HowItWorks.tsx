import consultCouple from "@/assets/images/consult-couple.jpg";
import { steps } from "@/data/content";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { pad } from "@/lib/format";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y scroll-mt-20">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="03">How it works</SectionLabel>
            <SplitHeading id="how-title" className="font-display text-display mt-8 max-w-[11ch]">
              Introduced in minutes, <em>represented</em> for months.
            </SplitHeading>
            <ParallaxImage
              src={consultCouple}
              alt="A couple reviewing documents with their agent in a bright, modern room"
              sizes="(min-width: 1024px) 34vw, 92vw"
              className="mt-12 hidden aspect-[4/5] w-[78%] lg:block"
              reveal
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <Reveal as="ol" stagger={0.12} className="border-t border-ink/15">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ink/15 py-10 md:grid-cols-[6rem_1fr] md:py-14">
                <span className="font-display text-5xl leading-none text-bronze md:text-6xl">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-title">{s.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-14 bg-forest p-8 text-paper md:p-12">
            <p className="eyebrow text-paper/70">At every step</p>
            <p className="font-display text-title mt-4 max-w-md">
              A licensed concierge, available {site.hours.split(" · ")[0].toLowerCase()}, {site.hours.split(" · ")[1]}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/get-started" variant="light">
                Begin
              </Button>
              <a href={site.phoneHref} className="eyebrow link-line pb-1 text-paper">
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
