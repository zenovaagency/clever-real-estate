import villaDusk from "@/assets/images/villa-dusk.jpg";
import housePool from "@/assets/images/house-pool.jpg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { TransitionLink } from "@/components/layout/TransitionLink";

const panels = [
  {
    kicker: "Selling",
    title: "List with a top agent for 1.5%.",
    body: "Pricing strategy, photography, marketing, negotiation and closing — the full service, for about half the usual fee.",
    href: "/sell",
    link: "Selling with Clever",
    image: villaDusk,
    alt: "A white villa framed by tall trees in the evening light",
  },
  {
    kicker: "Buying",
    title: "An expert buyer’s agent, and cash back.",
    body: "Work with an agent who closes in your chosen neighbourhood, then receive up to $500 after closing in 41 states.",
    href: "/buy",
    link: "Buying with Clever",
    image: housePool,
    alt: "A contemporary home with a pool beyond a broad, manicured lawn",
  },
];

export function SellBuy() {
  return (
    <section aria-labelledby="sellbuy-title" className="section-y bg-stone">
      <div className="container-x">
        <SectionLabel index="06">Selling & buying</SectionLabel>
        <SplitHeading id="sellbuy-title" className="font-display text-display mt-8 max-w-[16ch]">
          Whichever side of the table you sit.
        </SplitHeading>

        <Reveal stagger={0.15} className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10 lg:gap-16">
          {panels.map((p, i) => (
            <article key={p.href} className={`group ${i === 1 ? "md:mt-28" : ""}`}>
              <TransitionLink href={p.href} aria-label={p.link} className="block" tabIndex={-1}>
                <ParallaxImage src={p.image} alt={p.alt} sizes="(min-width: 768px) 44vw, 92vw" className="aspect-[4/5]" imageClassName="saturate-[.8]" speed={10} hoverZoom />
              </TransitionLink>
              <p className="eyebrow mt-8 text-forest">{p.kicker}</p>
              <h3 className="font-display text-headline mt-4 max-w-[16ch]">{p.title}</h3>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">{p.body}</p>
              <ArrowLink href={p.href} className="mt-8">
                {p.link}
              </ArrowLink>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
