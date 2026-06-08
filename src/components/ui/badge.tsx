import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        lime: "bg-lime/15 text-forest-700 ring-1 ring-lime/40",
        dark: "bg-forest-900/5 text-forest-800 ring-1 ring-forest-900/10",
        glass: "glass text-white ring-1 ring-white/25",
        outline: "border border-white/30 text-white",
      },
    },
    defaultVariants: {
      variant: "lime",
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
