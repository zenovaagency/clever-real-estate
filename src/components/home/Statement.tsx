import livingCurtains from "@/assets/images/living-curtains.jpg";
import detailMarble from "@/assets/images/detail-marble.jpg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ArrowLink } from "@/components/ui/Button";

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="section-y">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionLabel index="01">Our proposition</SectionLabel>
          <SplitHeading id="statement-title" mode="scrub" className="font-display text-headline mt-10 max-w-[22ch] text-pretty">
            Great agents rarely discount. We give them a steady flow of serious buyers and sellers — and in return, they
            represent you for half the usual fee.
          </SplitHeading>
          <div className="mt-12 grid max-w-xl gap-8 sm:grid-cols-2">
            <p className="leading-relaxed text-ink-soft">
              Every partner agent is full-service, drawn from brokerages like Keller Williams, RE/MAX and eXp Realty,
              and kept in the network only while their client reviews stay strong.
            </p>
            <p className="leading-relaxed text-ink-soft">
              Using Clever costs you nothing. Agents pay a share of their commission only when your sale closes — and
              you are never obliged to continue.
            </p>
          </div>
          <ArrowLink href="/agents" className="mt-10">
            How we select agents
          </ArrowLink>
        </div>

        <div className="relative lg:col-span-5">
          <ParallaxImage
            src={livingCurtains}
            alt="A serene double-height living room with sheer floor-to-ceiling curtains"
            sizes="(min-width: 1024px) 36vw, 92vw"
            className="aspect-[4/5] w-full lg:w-[86%]"
            reveal
          />
          <ParallaxImage
            src={detailMarble}
            alt="Veined marble splashback with a brushed brass tap"
            sizes="(min-width: 1024px) 18vw, 45vw"
            className="mt-6 ml-auto aspect-[3/4] w-[52%] lg:absolute lg:right-0 lg:-bottom-24 lg:mt-0 lg:w-[44%]"
            speed={16}
            reveal
          />
        </div>
      </div>
    </section>
  );
}
