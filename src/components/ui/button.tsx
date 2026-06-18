import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-forest-900 shadow-soft hover:bg-lime-300 hover:shadow-glow hover:-translate-y-0.5",
        dark: "bg-forest-900 text-white shadow-soft hover:bg-forest-800 hover:-translate-y-0.5",
        outline:
          "border border-forest-900/20 bg-transparent text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-white hover:-translate-y-0.5",
        ghost: "bg-transparent text-forest-900 hover:bg-forest-900/5",
        glass:
          "glass border border-white/20 text-white hover:border-lime/30 hover:bg-white/15 hover:-translate-y-0.5",
        link: "rounded-none text-forest-900 underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        sm: "h-10 min-h-10 px-4 text-xs",
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
