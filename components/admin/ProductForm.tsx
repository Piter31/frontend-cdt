"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save, PlusCircle, AlertCircle, CheckCircle2 } from "lucide-react";

import { Product } from "@/lib/product";
import { createProduct, updateProduct } from "@/app/services/products.service";

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

// const EMPTY_FORM = {
//   name: "",
//   description: "",
//   shortDescription: "",
//   price: "",
//   costPrice: "",
//   stock: "",
//   category: "cookies" as Product["category"],
//   imageUrl: "",
// };


export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product?.name ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    costPrice: product?.costPrice?.toString() ?? "",
    stock: product?.stock?.toString() ?? "",
    category: product?.category ?? ("cookies" as Product["category"]),
    imageUrl: product?.imageUrl ?? "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Requerido";
    if (!form.price || Number(form.price) <= 0) e.price = "Precio inválido";
    if (!form.costPrice || Number(form.costPrice) <= 0) e.costPrice = "Costo inválido";
    if (!form.stock || Number(form.stock) < 0) e.stock = "Stock inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  //ENVIA Y VERIFICA LOS DATOS DEL FORMULARIO 
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const productData = {
        name: form.name.trim(),
        shortDescription: form.shortDescription.trim() || form.name,
        description: form.description.trim() || form.shortDescription,
        price: Number(form.price),
        costPrice: Number(form.costPrice),
        stock: Number(form.stock),
        category: form.category,
        imageUrl:
          form.imageUrl.trim() ||
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
        rating: product?.rating ?? 5.0,
        reviewCount: product?.reviewCount ?? 0,
        sold: product?.sold ?? 0,
        tags: product?.tags ?? [],
        featured: product?.featured ?? false,
        ingredients: product?.ingredients ?? [],
        allergens: product?.allergens ?? [],
      };

      let result;
      if (product?.id) {
        // Actualizar producto existente
        result = await updateProduct(product.id, productData);
      } else {
        // Crear nuevo producto
        result = await createProduct(productData);
      }
      
      setFeedback({
        type: 'success',
        message: product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente'
      });
      
      // Llamar callback y limpiar después de 1.5s
      setTimeout(() => {
        onSave(result);
        onCancel();
      }, 1500);
    }catch (error: any) {
      console.error('Error al guardar producto:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error al guardar el producto';
      setFeedback({
        type: 'error',
        message: errorMessage
      });
    }finally {
      setLoading(false);
    }
  }


  // function handleSubmit() {
  //   if (!validate()) return;
  //   onSave({
  //     id: product?.id ?? String(Date.now()),
  //     name: form.name.trim(),
  //     shortDescription: form.shortDescription.trim() || form.name,
  //     description: form.description.trim() || form.shortDescription,
  //     price: Number(form.price),
  //     costPrice: Number(form.costPrice),
  //     stock: Number(form.stock),
  //     category: form.category,
  //     imageUrl:
  //       form.imageUrl.trim() ||
  //       "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  //     rating: product?.rating ?? 5.0,
  //     reviewCount: product?.reviewCount ?? 0,
  //     sold: product?.sold ?? 0,
  //     tags: [],
  //     featured: false,
  //     ingredients: [],
  //     allergens: [],
  //   });
  // }

  const margin =
    form.price && form.costPrice
      ? Math.round(
          ((Number(form.price) - Number(form.costPrice)) /
            Number(form.price)) *
            100
        ): null;

  return (
    <div className="bg-white rounded-2xl border border-[#e8d5c0] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-[#2c1810]">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h3>
          <p className="text-sm text-[#8b5e4a] mt-0.5">
            {product ? `Editando: ${product.name}` : "Completá los campos para agregar"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <Label htmlFor="name" className="mb-1.5 block">Nombre del Producto *</Label>
          <Input
            id="name"
            placeholder="Ej: Cookies de Chocolate"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={errors.name ? "ring-2 ring-red-400 border-transparent" : ""}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Short description */}
        <div className="sm:col-span-2">
          <Label htmlFor="short-desc" className="mb-1.5 block">Descripción Corta</Label>
          <Input
            id="short-desc"
            placeholder="Tagline del producto"
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price" className="mb-1.5 block">Precio de Venta (ARS) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            placeholder="3500"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={errors.price ? "ring-2 ring-red-400 border-transparent" : ""}
          />
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
        </div>

        {/* Cost */}
        <div>
          <Label htmlFor="cost" className="mb-1.5 block">Precio de Costo (ARS) *</Label>
          <Input
            id="cost"
            type="number"
            min="0"
            placeholder="1500"
            value={form.costPrice}
            onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
            className={errors.costPrice ? "ring-2 ring-red-400 border-transparent" : ""}
          />
          {errors.costPrice && <p className="text-xs text-red-500 mt-1">{errors.costPrice}</p>}
        </div>

        {/* Stock */}
        <div>
          <Label htmlFor="stock" className="mb-1.5 block">Cantidad Disponible *</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            placeholder="20"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={errors.stock ? "ring-2 ring-red-400 border-transparent" : ""}
          />
          {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category" className="mb-1.5 block">Categoría</Label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
            className="flex h-10 w-full rounded-xl border border-[#e8d5c0] bg-white px-4 py-2 text-sm text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#d4a0a7]"
          >
            <option value="cookies">Cookies & Alfajores</option>
            <option value="pies">Tartas</option>
            <option value="chocolates">Chocolates</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="sm:col-span-2">
          <Label htmlFor="image" className="mb-1.5 block">URL de Imagen</Label>
          <Input
            id="image"
            placeholder="https://images.unsplash.com/..."
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        {/* Margin indicator */}
        {margin !== null && (
          <div className="sm:col-span-2 bg-[#f2e8da] rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-[#6b3d2a]">Margen de ganancia estimado</span>
            <span className={`font-display text-xl font-semibold ${margin >= 40 ? "text-green-700" : margin >= 20 ? "text-amber-700" : "text-red-600"}`}>
              {margin}%
            </span>
          </div>
        )}
      </div>

      {/* Feedback message */}
      {feedback && (
        <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
          feedback.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <p className={`text-sm ${
            feedback.type === 'success'
              ? 'text-green-700'
              : 'text-red-700'
          }`}>
            {feedback.message}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6 pt-5 border-t border-[#e8d5c0]">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className="flex-1"
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1 shadow-sm"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {product ? 'Guardando...' : 'Creando...'}
            </>
          ) : product ? (
            <><Save className="w-4 h-4" /> Guardar Cambios</>
          ) : (
            <><PlusCircle className="w-4 h-4" /> Agregar Producto</>
          )}
        </Button>
      </div>
    </div>
  );
}
