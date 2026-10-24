import Image from "next/image";
import detailStair from "@/assets/images/detail-stair.jpg";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="pt-36 pb-28 md:pt-44">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-forest">Error 404</p>
          <h1 className="font-display text-display mt-8 max-w-[12ch]">
            This address is <em className="text-forest">not listed.</em>
          </h1>
          <p className="text-lede mt-8 max-w-md text-ink-soft">
            The page you were looking for has moved or never existed. Allow us to guide you somewhere useful.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/">Return home</Button>
            <Button href="/get-started" variant="outline">
              Request an introduction
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-stone lg:col-span-4 lg:col-start-9">
          <Image src={detailStair} alt="" fill sizes="(min-width: 1024px) 30vw, 92vw" placeholder="blur" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
