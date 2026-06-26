"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/store/StarRating";
import { Product } from "@/lib/product";
import {
  Minus,
  Plus,
  ShoppingBag,
  QrCode,
  Package,
  ChefHat,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  Smartphone,
  Monitor,
  AlertCircle,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { WHATSAPP_NUMBER } from "@/lib/config";
import QRCode from "qrcode";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "detail" | "payment" | "confirmed" | "error";
type PaymentMethod = "QR" | "LINK";

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<CheckoutStep>("detail");
  const [clienteName, setClienteName] = useState("");
  const [clientePhone, setClientePhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("QR");
  const [errorMessage, setErrorMessage] = useState("");
  const [saleId, setSaleId] = useState<string | null>(null);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setPaymentMethod(window.innerWidth < 768 ? "LINK" : "QR");
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!product) return null;

  const isLowStock = product.stock <= 5;
  const total = product.price * quantity;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=Hola%20quiero%20comprar%20${quantity}x%20${product.name}%20(%24${total.toLocaleString("es-AR")})`;

  function handleClose(val: boolean) {
    if (!val) {
      setTimeout(() => {
        setStep("detail");
        setQuantity(1);
        setClienteName("");
        setClientePhone("");
        setNotes("");
        setQrCode(null);
        setSaleId(null);
        setErrorMessage("");
      }, 300);
    }
    onOpenChange(val);
  }

  async function handleCreateSale() {
    if (!clienteName.trim()) {
      setErrorMessage("Por favor, ingresa tu nombre");
      return;
    }
    if (!clientePhone.trim()) {
      setErrorMessage("Por favor, ingresa tu teléfono");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/sales", {
        metodoPago: paymentMethod,
        items: [
          {
            productId: product.id,
            cantidad: quantity,
          },
        ],
        clienteNombre: clienteName,
        clienteTelefono: clientePhone,
        notas: notes || undefined,
      });

      setSaleId(response.data.id);

      // Generar código QR si es escritorio
      if (paymentMethod === "QR") {
        const qrData = response.data.id;
        const qrDataUrl = await QRCode.toDataURL(qrData, {
          width: 250,
          margin: 2,
          color: { dark: "#2c1810", light: "#faf6f0" },
        });
        setQrCode(qrDataUrl);
      }

      setStep("confirmed");
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error al procesar la orden";
      setErrorMessage(errorMsg);
      setStep("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {step === "detail" && (
          <div className="space-y-5">
            {/* Product image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl || "/placeholder-product.svg"}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">⭐ Destacado</Badge>
                </div>
              )}
            </div>

            <DialogHeader className="px-5 pt-0 pb-1 pr-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                  <DialogDescription className="mt-1">
                    {product.shortDescription}
                  </DialogDescription>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-2xl font-semibold text-[#c4883a]">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-xs text-[#8b5e4a]">por unidad</p>
                </div>
              </div>
              <div className="mt-2">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              </div>
            </DialogHeader>

            {/* Description */}
            <p className="px-5 text-sm text-chocolate-mid leading-relaxed">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={loading}
                className="h-9 w-9 rounded-xl"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-display text-xl font-semibold text-[#2c1810]">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={loading}
                className="h-9 w-9 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="px-5 pb-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleClose(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => setStep("payment")}
                disabled={loading}
              >
                <ShoppingBag className="w-4 h-4" />
                Comprar · ${total.toLocaleString("es-AR")}
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="w-16 h-16 rounded-full bg-[#e8d5c0] flex items-center justify-center">
              {isMobile ? (
                <MessageCircle className="w-8 h-8 text-[#2c1810]" />
              ) : (
                <QrCode className="w-8 h-8 text-[#2c1810]" />
              )}
            </div>

            <div className="text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2c1810]">
                Método de Pago
              </h2>
              <p className="text-[#8b5e4a] mt-1 text-sm">
                {quantity}x {product.name} · Total:{" "}
                <strong className="text-[#c4883a]">${total.toLocaleString("es-AR")}</strong>
              </p>
            </div>

            {/* Client info section */}
            <div className="w-full space-y-4 bg-[#f2e8da] rounded-2xl p-4">
              <div>
                <label className="block text-sm font-semibold text-[#2c1810] mb-1">
                  Tu nombre
                </label>
                <Input
                  placeholder="Ej: Juan García"
                  value={clienteName}
                  onChange={(e) => setClienteName(e.target.value)}
                  disabled={loading}
                  className="bg-white border-[#d4b5a0] focus:border-[#c4883a]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2c1810] mb-1">
                  Tu teléfono (con WhatsApp)
                </label>
                <Input
                  placeholder="Ej: +54 9 11 0000-0000"
                  value={clientePhone}
                  onChange={(e) => setClientePhone(e.target.value)}
                  disabled={loading}
                  className="bg-white border-[#d4b5a0] focus:border-[#c4883a]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2c1810] mb-1">
                  Notas (opcional)
                </label>
                <Input
                  placeholder="Ej: Sin TACC, extra chocolate..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={loading}
                  className="bg-white border-[#d4b5a0] focus:border-[#c4883a]"
                />
              </div>
            </div>

            {/* Payment method indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#8b5e4a]">
              {isMobile ? (
                <>
                  <Smartphone className="w-4 h-4" />
                  Recibirás un link de WhatsApp
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4" />
                  Escanea el código QR para pagar
                </>
              )}
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep("detail")}
                disabled={loading}
              >
                Volver
              </Button>
              <Button
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleCreateSale}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : isMobile ? (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Continuar por WhatsApp
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    Generar QR
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="p-6 sm:p-10 flex flex-col items-center text-center gap-5">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2c1810]">
                Error al procesar el pedido
              </h2>
              <p className="text-[#8b5e4a] mt-2 text-sm sm:text-base">{errorMessage}</p>
            </div>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setErrorMessage("");
                  setStep("detail");
                }}
              >
                Volver
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setErrorMessage("");
                  setStep("detail");
                }}
              >
                Intentar de nuevo
              </Button>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <div className="p-6 sm:p-10 flex flex-col items-center text-center gap-5">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2c1810]">
                ¡Pedido Confirmado!
              </h2>
              <p className="text-[#8b5e4a] mt-2 leading-relaxed text-sm sm:text-base">
                {isMobile ? (
                  <>
                    Se abrirá WhatsApp para que completes el pago. Te contactaremos para
                    coordinar la entrega de tu{" "}
                    <strong className="text-[#2c1810]">{product.name}</strong>.
                  </>
                ) : (
                  <>
                    Escanea el código QR con tu teléfono para completar el pago. Nos
                    contactaremos para coordinar la entrega.
                  </>
                )}
              </p>
            </div>

            {/* QR Code en escritorio */}
            {!isMobile && qrCode && (
              <div className="bg-white rounded-2xl p-4 border-4 border-[#2c1810]">
                <Image
                  src={qrCode}
                  alt="QR Code"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
                <p className="text-xs text-[#8b5e4a] mt-2">ID Pedido: {saleId}</p>
              </div>
            )}

            {/* WhatsApp Link en móvil */}
            {isMobile && (
              <Button
                className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
                size="lg"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                <MessageCircle className="w-5 h-5" />
                Abrir WhatsApp
              </Button>
            )}

            <div className="bg-[#f2e8da] rounded-2xl p-4 w-full text-sm text-[#6b3d2a]">
              <p className="font-semibold">📦 Tu Pedido:</p>
              <p className="mt-1">{quantity}x {product.name}</p>
              <p className="mt-2 font-semibold">💰 Total: ${total.toLocaleString("es-AR")}</p>
              <p className="text-xs mt-2">📱 {clientePhone}</p>
            </div>

            <Button className="w-full" onClick={() => handleClose(false)}>
              Volver al catálogo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}