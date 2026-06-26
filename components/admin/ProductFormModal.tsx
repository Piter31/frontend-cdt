"use client";

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Product } from "@/lib/product";

interface ProductFormModalProps {
  isOpen: boolean;
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

export function ProductFormModal({
  isOpen,
  product,
  onSave,
  onCancel,
}: ProductFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onCancel();
    }}>
      <DialogPortal>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para {product ? "editar un" : "crear un nuevo"} producto
          </DialogDescription>
          <div className="p-3">
            <ProductForm
              product={product}
              // key={product?.id}
              onSave={onSave}
              onCancel={onCancel}
              />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
