import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function FieldShell({ id, label, optional, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow mb-1 flex justify-between text-ink-soft">
        <span>{label}</span>
        {optional && <span className="tracking-[0.16em] normal-case">Optional</span>}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-2 min-h-[1.25rem] text-[0.8125rem] text-danger">
        {error}
      </p>
    </div>
  );
}

export function inputClass(error?: string) {
  return cn(
    "h-13 w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 text-[1.0625rem] text-ink placeholder:text-ink-soft/60",
    "transition-colors duration-500 focus:ring-0 focus:outline-none",
    error ? "border-danger" : "border-ink/25 focus:border-forest",
  );
}

export function SelectChevron() {
  return (
    <ChevronDown aria-hidden strokeWidth={1.5} className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-ink-soft" />
  );
}
