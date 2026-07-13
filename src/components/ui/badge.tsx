import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em] transition-[background-color,color,box-shadow] duration-400 ease-premium sm:px-4 sm:text-xs sm:tracking-[0.18em]",
  {
    variants: {
      variant: {
        lime: "bg-lime/22 text-forest-900 ring-1 ring-lime/45 shadow-lime",
        terracotta:
          "bg-terracotta/14 text-terracotta-700 ring-1 ring-terracotta/35 shadow-[0_2px_12px_-4px_rgba(206,88,56,0.35)]",
        sand: "bg-sand/25 text-forest-800 ring-1 ring-sand/45",
        dark: "bg-forest-900/5 text-forest-800 ring-1 ring-forest-900/10",
        glass:
          "glass text-white ring-1 ring-terracotta/45 shadow-[0_2px_16px_-4px_rgba(206,88,56,0.5)]",
        outline: "border border-terracotta/45 text-white",
      },
    },
    defaultVariants: {
      variant: "terracotta",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
