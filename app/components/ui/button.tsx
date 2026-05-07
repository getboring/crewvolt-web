import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-body font-semibold transition-colors duration-[var(--cv-motion-normal)] ease-[var(--cv-ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-copper focus-visible:ring-offset-2 focus-visible:ring-offset-cv-parchment disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-cv-navy text-white hover:bg-cv-copper active:bg-cv-copper-dark",
        secondary:
          "border border-cv-navy bg-transparent text-cv-navy hover:border-cv-copper hover:text-cv-copper active:border-cv-copper-dark active:bg-cv-parchment active:text-cv-copper-dark",
        accent: "bg-cv-copper text-white hover:bg-cv-copper-dark",
        ghost: "bg-transparent text-cv-steel hover:bg-cv-cream hover:text-cv-navy",
        link: "bg-transparent text-cv-copper underline-offset-4 hover:text-cv-copper-dark hover:underline",
        destructive: "bg-cv-danger text-white hover:opacity-90",
      },
      size: {
        default: "h-11 px-7 py-3 text-[15px]",
        sm: "h-10 px-5 py-2 text-sm",
        lg: "h-12 px-8 py-3.5 text-base",
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
