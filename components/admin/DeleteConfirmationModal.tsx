"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Product } from "@/lib/product";
import { hardDeleteProduct } from "@/app/services/products.service";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  product,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await hardDeleteProduct(product.id);
      // Ejecutar el callback para notificar al componente padre
      onConfirm();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert(`Error al eliminar el producto "${product.name}".`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-[#2c1810] text-lg">
              Eliminar producto
            </h2>
            <p className="text-sm text-[#8b5e4a] mt-1">
              Esta acción no se puede deshacer
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-[#6b3d2a] mb-6">
          ¿Estás seguro de que deseas eliminar{" "}
          <span className="font-semibold">"{product.name}"</span>?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
