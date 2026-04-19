"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gold" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default:
        "bg-[#2c1810] text-[#faf6f0] hover:bg-[#4a2c1e] active:scale-95 shadow-sm",
      outline:
        "border border-[#2c1810] text-[#2c1810] hover:bg-[#2c1810] hover:text-[#faf6f0] active:scale-95",
      ghost:
        "text-[#2c1810] hover:bg-[#e8d5c0] active:scale-95",
      gold:
        "bg-[#c4883a] text-white hover:bg-[#b07530] active:scale-95 shadow-sm",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:scale-95",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 h-8",
      md: "text-sm px-5 py-2.5 h-10",
      lg: "text-base px-7 py-3 h-12",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
