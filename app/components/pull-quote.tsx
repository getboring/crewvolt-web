import { cn } from "~/lib/utils";

type PullQuoteProps = {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
};

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "relative mx-auto max-w-4xl border-l-2 border-cv-copper py-2 pl-6 md:pl-8",
        className,
      )}
    >
      <blockquote className="font-headline text-[clamp(1.5rem,3vw,2.25rem)] italic leading-[1.2] font-medium text-cv-navy">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-[11px] uppercase tracking-[1.5px] text-cv-steel">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
