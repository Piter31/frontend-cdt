import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "rose" | "gold" | "chocolate" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#e8d5c0] text-[#2c1810]",
    rose: "bg-[#e8c8cc] text-[#7a3a3a]",
    gold: "bg-amber-100 text-amber-800",
    chocolate: "bg-[#2c1810] text-[#faf6f0]",
    outline: "border border-[#d4a0a7] text-[#8b5e4a] bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
