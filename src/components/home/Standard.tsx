import livingNeutral from "@/assets/images/living-neutral.jpg";
import kitchenBeige from "@/assets/images/kitchen-beige.jpg";
import detailStair from "@/assets/images/detail-stair.jpg";
import { valueProps } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";

const images = [
  { src: livingNeutral, alt: "A tall, light-filled living room in soft neutral tones" },
  { src: kitchenBeige, alt: "A calm beige kitchen with a marble table and sculptural pendant" },
  { src: detailStair, alt: "A white exterior staircase climbing beside lush planting" },
];
const numerals = ["I", "II", "III"];

export function Standard() {
  return (
    <section aria-labelledby="standard-title" className="section-y bg-stone">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="02">The Clever standard</SectionLabel>
            <SplitHeading id="standard-title" className="font-display text-display mt-8 max-w-[14ch]">
              Exceptional representation, <em>fairly priced.</em>
            </SplitHeading>
          </div>
          <p className="text-lede text-ink-soft md:col-span-4 md:col-start-9">
            Three promises behind every introduction we make.
          </p>
        </div>

        <Reveal as="ol" stagger={0.12} className="mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-12">
          {valueProps.map((v, i) => (
            <li key={v.title} className="group">
              <ParallaxImage src={images[i].src} alt={images[i].alt} sizes="(min-width: 768px) 30vw, 92vw" className="aspect-[4/5]" speed={8} hoverZoom />
              <div className="mt-8 flex items-baseline gap-5 border-t border-ink/15 pt-6">
                <span className="font-display text-2xl text-bronze italic">{numerals[i]}</span>
                <div>
                  <h3 className="font-display text-title">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
