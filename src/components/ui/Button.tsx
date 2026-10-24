import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";

type Variant = "forest" | "ink" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  forest: "bg-forest text-paper before:bg-forest-deep",
  ink: "bg-ink text-paper before:bg-forest",
  outline: "border border-ink/25 text-ink before:bg-ink hover:text-paper hover:border-ink",
  light: "bg-paper text-ink before:bg-stone",
  "outline-light": "border border-paper/50 text-paper before:bg-paper hover:text-ink hover:border-paper",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  icon?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-describedby"?: string;
};

function Label({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <span className="relative z-10 flex items-center gap-3">
      {children}
      {icon && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.25}
          className="size-4 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1"
        />
      )}
    </span>
  );
}

/** Square-cornered button; a fill rises from below on hover. */
export function Button({
  children,
  variant = "forest",
  href,
  icon = true,
  className,
  type = "button",
  disabled,
  onClick,
  ...aria
}: ButtonProps) {
  const classes = cn(
    "group relative isolate inline-flex h-14 items-center justify-center overflow-hidden px-8 text-[0.75rem] font-semibold tracking-[0.18em] uppercase whitespace-nowrap",
    "transition-[color,border-color] duration-500 ease-[var(--ease-expo)] disabled:pointer-events-none disabled:opacity-60",
    "before:absolute before:inset-0 before:-z-0 before:translate-y-full before:transition-transform before:duration-700 before:ease-[var(--ease-expo)] hover:before:translate-y-0",
    variants[variant],
    className,
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a href={href} className={classes} {...aria}>
          <Label icon={icon}>{children}</Label>
        </a>
      );
    }
    return (
      <TransitionLink href={href} className={classes} {...aria}>
        <Label icon={icon}>{children}</Label>
      </TransitionLink>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...aria}>
      <Label icon={icon}>{children}</Label>
    </button>
  );
}

/** Quiet text link with an arrow and a drawing underline. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <TransitionLink href={href} className={cn("group eyebrow inline-flex items-center gap-3 text-ink", className)}>
      <span className="link-line pb-1">{children}</span>
      <ArrowRight aria-hidden strokeWidth={1.25} className="size-4 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-1" />
    </TransitionLink>
  );
}
