"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { type Product } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/store/StarRating";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  style?: React.CSSProperties;
}

export function ProductCard({ product, onSelect, style }: ProductCardProps) {
  const isLowStock = product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <article
      className="group bg-white rounded-3xl overflow-hidden border border-[#e8d5c0] shadow-sm hover:shadow-xl hover:shadow-[#2c1810]/10 hover:-translate-y-1 cursor-pointer opacity-0 animate-fade-in-up"
      style={style}
      onClick={() => !isOutOfStock && onSelect(product)}
    >
      {/* Image wrapper with zoom */}
      <div className="product-image-wrapper relative h-52 w-full bg-[#f2e8da]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#2c1810]/0 group-hover:bg-[#2c1810]/10 transition-all duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <Badge variant="gold">⭐ Favorito</Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge variant="rose">🔥 Últimas unidades</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="chocolate">Agotado</Badge>
          )}
        </div>

        {/* Quick buy button on hover */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {!isOutOfStock && (
            <Button
              size="sm"
              className="w-full bg-white text-[#2c1810] hover:bg-[#faf6f0] shadow-lg border border-[#e8d5c0]"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Ver detalle
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-[10px] font-medium text-[#b07880] uppercase tracking-wider mb-1">
            {product.category === "cookies" && "Cookies & Alfajores"}
            {product.category === "pies" && "Tartas & Pies"}
            {product.category === "cakes" && "Pasteles"}
            {product.category === "pastries" && "Facturas"}
            {product.category === "chocolates" && "Chocolates"}
          </p>
          <h3 className="font-display text-lg font-semibold text-[#2c1810] leading-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#8b5e4a] mt-0.5 line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between pt-1">
          <div>
            <p className={cn(
              "font-display text-2xl font-semibold",
              isOutOfStock ? "text-[#b07880]" : "text-[#c4883a]"
            )}>
              ${product.price.toLocaleString("es-AR")}
            </p>
            <p className="text-[10px] text-[#8b5e4a]">{product.stock} disponibles</p>
          </div>
          <Button
            size="sm"
            disabled={isOutOfStock}
            variant={isOutOfStock ? "ghost" : "default"}
            className={cn(
              "rounded-xl text-xs",
              !isOutOfStock && "shadow-sm shadow-[#2c1810]/20 group-hover:shadow-md"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
          >
            {isOutOfStock ? "Agotado" : "Comprar"}
          </Button>
        </div>
      </div>
    </article>
  );
}
