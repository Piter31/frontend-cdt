import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
          return (
            <Star
              key={star}
              className={cn(
                starSize,
                filled || partial
                  ? "text-[#c4883a] fill-[#c4883a]"
                  : "text-[#e8d5c0] fill-[#e8d5c0]"
              )}
            />
          );
        })}
      </div>
      <span className={cn("text-[#8b5e4a]", size === "sm" ? "text-xs" : "text-sm")}>
        <span className="font-medium text-[#2c1810]">{rating.toFixed(1)}</span>
        {reviewCount !== undefined && (
          <span className="ml-1">({reviewCount})</span>
        )}
      </span>
    </div>
  );
}
