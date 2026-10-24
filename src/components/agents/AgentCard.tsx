import Image from "next/image";
import type { Agent } from "@/data/agents";

export function AgentCard({ agent }: { agent: Agent; index?: number }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Image
          src={agent.photo}
          alt={`Portrait of ${agent.name}`}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
          placeholder="blur"
          className="object-cover object-[50%_20%] grayscale transition-[filter,scale] duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        <span className="eyebrow absolute top-4 left-4 bg-paper/90 px-2.5 py-1.5 text-ink-soft">Sample profile</span>
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
        <h3 className="font-display text-title">{agent.name}</h3>
        <span className="eyebrow text-forest">{agent.rating.toFixed(1)} ★</span>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-4 text-[0.875rem]">
        <div>
          <dt className="eyebrow text-ink-soft">Market</dt>
          <dd className="mt-1.5">{agent.market}</dd>
        </div>
        <div>
          <dt className="eyebrow text-ink-soft">Experience</dt>
          <dd className="mt-1.5">{agent.years} years</dd>
        </div>
        <div>
          <dt className="eyebrow text-ink-soft">Sales, 12 mo</dt>
          <dd className="mt-1.5">{agent.sales}</dd>
        </div>
      </dl>
      <p className="mt-4 text-[0.875rem] text-ink-soft italic">{agent.specialty}</p>
    </article>
  );
}
