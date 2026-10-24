import villaHero from "@/assets/images/villa-hero.jpg";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner({
  title = "Meet the agent your home deserves.",
  body = "Share a few details and a licensed concierge will introduce you to top local agents — usually within minutes. There is no cost and no obligation.",
  href = "/get-started",
  cta = "Arrange an introduction",
}: {
  title?: string;
  body?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="grid border-t border-ink/10 bg-stone lg:grid-cols-2">
      <div className="container-x flex items-center py-24 md:py-32 lg:mr-0 lg:max-w-[45rem] lg:pr-16">
        <div className="max-w-xl">
          <p className="eyebrow text-forest">Begin with a conversation</p>
          <SplitHeading id="cta-title" className="font-display text-display mt-8">
            {title}
          </SplitHeading>
          <Reveal>
            <p className="text-lede mt-8 text-ink-soft">{body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={href}>{cta}</Button>
              <a href={site.phoneHref} className="eyebrow link-line pb-1 text-ink">
                Or call {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <ParallaxImage
        src={villaHero}
        alt="A contemporary white and timber villa against a soft evening sky"
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[4/5] lg:aspect-auto lg:min-h-[52rem]"
        imageClassName="object-[50%_42%]"
        reveal
      />
    </section>
  );
}
