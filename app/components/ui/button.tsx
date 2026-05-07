import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono uppercase tracking-[0.18em] font-semibold transition-[background-color,color,border-color,transform] duration-[var(--cv-motion-normal)] ease-[var(--cv-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper focus-visible:ring-offset-2 focus-visible:ring-offset-cv-vellum disabled:pointer-events-none disabled:opacity-60 rounded-none",
  {
    variants: {
      variant: {
        default:
          "bg-cv-pencil text-cv-vellum border border-cv-pencil hover:bg-cv-copper hover:border-cv-copper active:bg-cv-copper-dark",
        accent:
          "bg-cv-copper text-cv-vellum border border-cv-copper hover:bg-cv-copper-dark hover:border-cv-copper-dark",
        secondary:
          "bg-transparent text-cv-pencil border border-cv-pencil hover:bg-cv-pencil hover:text-cv-vellum",
        outline:
          "bg-transparent text-cv-vellum border border-cv-vellum hover:bg-cv-vellum hover:text-cv-pencil",
        ghost:
          "bg-transparent text-cv-graphite border border-transparent hover:text-cv-pencil hover:bg-cv-vellum-dark",
        link:
          "bg-transparent text-cv-copper border border-transparent hover:text-cv-copper-dark underline-offset-4 hover:underline",
        destructive:
          "bg-cv-revision-red text-cv-vellum border border-cv-revision-red hover:opacity-90",
      },
      size: {
        default: "h-12 px-6 text-[11px]",
        sm: "h-10 px-4 text-[10px]",
        lg: "h-14 px-8 text-[12px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
