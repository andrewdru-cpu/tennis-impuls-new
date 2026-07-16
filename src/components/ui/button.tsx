import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,box-shadow,border-color,color,opacity] duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] active:duration-150 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-terracotta to-terracotta-500 text-white shadow-terracotta hover:from-terracotta-500 hover:to-terracotta-600 hover:shadow-glow hover:-translate-y-px",
        dark: "bg-forest-900 text-white shadow-soft hover:bg-forest-800 hover:shadow-elevated hover:-translate-y-px",
        outline:
          "border-2 border-forest-900/12 bg-white/80 text-[#1F2E2A] shadow-soft hover:border-terracotta/40 hover:bg-white hover:text-[#1F2E2A] hover:shadow-card hover:-translate-y-px",
        ghost: "bg-transparent text-[#1F2E2A] hover:bg-forest-900/5",
        glass:
          "glass border border-white/25 text-white shadow-soft hover:border-sand/40 hover:bg-white/15 hover:-translate-y-px",
        link: "rounded-none text-terracotta underline-offset-4 hover:underline hover:text-terracotta-600 active:scale-100",
      },
      size: {
        sm: "h-11 min-h-11 px-4 text-xs",
        default: "h-11 min-h-11 px-6",
        lg: "h-14 min-h-[3.25rem] px-8 text-base",
        icon: "h-11 min-h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
