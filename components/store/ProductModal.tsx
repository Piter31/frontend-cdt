"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/store/StarRating";
import { type Product } from "@/constants/data";
import {
  Minus,
  Plus,
  ShoppingBag,
  QrCode,
  Package,
  ChefHat,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "detail" | "payment" | "confirmed";

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<CheckoutStep>("detail");

  if (!product) return null;

  const isLowStock = product.stock <= 5;
  const total = product.price * quantity;

  function handleClose(val: boolean) {
    if (!val) {
      setTimeout(() => {
        setStep("detail");
        setQuantity(1);
      }, 300);
    }
    onOpenChange(val);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {step === "detail" && (
          <>
            {/* Product image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">⭐ Destacado</Badge>
                </div>
              )}
            </div>

            <DialogHeader className="px-6 pt-5 pb-0">
              <div className="flex items-start justify-between gap-4 pr-8">
                <div>
                  <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                  <DialogDescription className="mt-1">
                    {product.shortDescription}
                  </DialogDescription>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-2xl font-semibold text-gold">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-xs text-truffle">por unidad</p>
                </div>
              </div>
              <div className="mt-2">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              </div>
            </DialogHeader>

            <div className="px-6 py-4 space-y-5">
              {/* Description */}
              <p className="text-sm text-chocolate-mid leading-relaxed">{product.description}</p>

              {/* Stock */}
              <div className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-3",
                isLowStock ? "bg-amber-50 border border-amber-200" : "bg-cream-dark"
              )}>
                {isLowStock ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <Package className="w-4 h-4 text-truffle shrink-0" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  isLowStock ? "text-amber-700" : "text-chocolate-mid"
                )}>
                  {isLowStock
                    ? `¡Solo quedan ${product.stock} unidades!`
                    : `${product.stock} unidades disponibles`}
                </span>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="w-4 h-4 text-truffle" />
                  <span className="text-xs font-semibold text-chocolate-mid uppercase tracking-wider">Ingredientes</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing) => (
                    <Badge key={ing} variant="outline" className="text-xs">{ing}</Badge>
                  ))}
                </div>
              </div>

              {/* Allergens */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-truffle font-medium">Alérgenos:</span>
                {product.allergens.map((al) => (
                  <Badge key={al} variant="rose" className="text-xs">{al}</Badge>
                ))}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="px-6 pb-6 border-t border-cream-deeper pt-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-9 w-9 rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-display text-xl font-semibold text-chocolate">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="h-9 w-9 rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="flex-1 w-full sm:w-auto shadow-lg shadow-chocolate/20 hover:-translate-y-0.5"
                size="lg"
                onClick={() => setStep("payment")}
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar · ${total.toLocaleString("es-AR")}
              </Button>
            </div>
          </>
        )}

        {step === "payment" && (
          <div className="p-8 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-cream-deeper flex items-center justify-center">
              <QrCode className="w-8 h-8 text-chocolate" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-chocolate">Método de Pago</h2>
              <p className="text-truffle mt-1 text-sm">
                {quantity}x {product.name} · Total:{" "}
                <strong className="text-gold">${total.toLocaleString("es-AR")}</strong>
              </p>
            </div>

            {/* Fake QR code */}
            <div className="relative border-4 border-chocolate rounded-2xl p-3 bg-white">
              <div className="w-40 h-40 grid grid-cols-7 gap-0.5">
                {Array.from({ length: 49 }).map((_, i) => {
                  const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48];
                  const center = [24];
                  const isCorner = corners.includes(i);
                  const isCenter = center.includes(i);
                  const isRandom = Math.sin(i * 7 + 3) > 0.2;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-sm",
                        (isCorner || isCenter || isRandom) ? "bg-chocolate" : "bg-white"
                      )}
                    />
                  );
                })}
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-cream px-2">
                <span className="text-xs text-truffle font-mono">CDT-{product.id}{quantity}0{Math.floor(Math.random()*9)}</span>
              </div>
            </div>

            <p className="text-xs text-truffle max-w-xs">
              Escaneá el código con MercadoPago, Uala o tu app bancaria para completar el pago.
            </p>

            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setStep("detail")}>
                Volver
              </Button>
              <Button className="flex-1" onClick={() => setStep("confirmed")}>
                Simulé el pago ✓
              </Button>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <div className="p-10 flex flex-col items-center text-center gap-5">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-chocolate">¡Pedido Confirmado!</h2>
              <p className="text-truffle mt-2 leading-relaxed">
                Gracias por tu compra. Te contactaremos por WhatsApp en los próximos minutos
                para coordinar la entrega de tu{" "}
                <strong className="text-chocolate">{product.name}</strong>.
              </p>
            </div>
            <div className="bg-cream-dark rounded-2xl p-4 w-full text-sm text-chocolate-mid">
              <p>🍫 Pedido: {quantity}x {product.name}</p>
              <p className="mt-1">💰 Total abonado: <strong>${total.toLocaleString("es-AR")}</strong></p>
            </div>
            <Button className="w-full" onClick={() => handleClose(false)}>
              Volver al catálogo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
