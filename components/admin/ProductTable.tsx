"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  TrendingUp,
  LucideTrash2,
  ToggleLeft,
  ToggleRight,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Product } from "@/lib/product";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { deleteProduct, toggleProductStatus } from "@/app/services/products.service";
// import { getProducts } from "@/app/services/products.service";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggle?: (product: Product) => void;
}

type SortField = "name" | "price" | "costPrice"| "stock" | "sold" | "margin";
type SortDir = "asc" | "desc";

export function ProductTable({ products, onEdit, onDelete, onToggle }: ProductTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductForDelete, setSelectedProductForDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingProduct, setIsTogglingProduct] = useState<string | null>(null);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  // Abrir modal de confirmación de eliminación
  function handleDeleteClick(product: Product) {
    setSelectedProductForDelete(product);
    setDeleteModalOpen(true);
  }

  // Confirmar eliminación
  function handleConfirmDelete() {
    if (!selectedProductForDelete) return;

    // El DeleteConfirmationModal ya realizó la eliminación permanente
    // Solo actualizamos la UI
    onDelete(selectedProductForDelete.id);
    setDeleteModalOpen(false);
    setSelectedProductForDelete(null);
  }

  // Cancelar eliminación
  function handleCancelDelete() {
    setDeleteModalOpen(false);
    setSelectedProductForDelete(null);
  }

  // Alternar activación/desactivación de producto (soft delete)
  async function handleToggleProduct(product: Product) {
    setIsTogglingProduct(product.id);
    try {
      const newActiveState = !product.active;
      await toggleProductStatus(product.id, newActiveState);
      if (onToggle) {
        onToggle({ ...product, active: newActiveState });
      }
    } catch (error: any) {
      console.error("Error al alternar producto:", error);
      alert("Error al cambiar el estado del producto. Intenta nuevamente.");
    } finally {
      setIsTogglingProduct(null);
    }
  }

  const filtered = products
    .filter((p) =>
      (p.name || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let valA: string | number = a.name || '';
      let valB: string | number = b.name || '';

      if (sortField === "price") { valA = a.price || 0; valB = b.price || 0; }
      else if (sortField === "stock") { valA = a.stock || 0; valB = b.stock || 0; }
      else if (sortField === "sold") { valA = a.sold || 0; valB = b.sold || 0; }
      else if (sortField === "margin") {
        const priceA = a.price || 0;
        const costA = a.costPrice || 0;
        const priceB = b.price || 0;
        const costB = b.costPrice || 0;
        valA = priceA > 0 ? ((priceA - costA) / priceA) * 100 : 0;
        valB = priceB > 0 ? ((priceB - costB) / priceB) * 100 : 0;
      }

      if (typeof valA === "string") {
        return sortDir === "asc" ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
      }
      return sortDir === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field)
      return <span className="w-3 h-3 opacity-20"><ChevronUp className="w-3 h-3" /></span>;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-[#c4883a]" />
    ) : (
      <ChevronDown className="w-3 h-3 text-[#c4883a]" />
    );
  }

  function SortableHeader({ field, label }: { field: SortField; label: string }) {
    return (
      <button
        onClick={() => toggleSort(field)}
        className="flex items-center gap-1 hover:text-[#2c1810] transition-colors"
      >
        {label}
        <SortIcon field={field} />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8d5c0] overflow-hidden shadow-sm">
      {/* Table header */}
      <div className="px-5 py-4 border-b border-[#e8d5c0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#2c1810]">
            Inventario
          </h3>
          <p className="text-xs text-[#8b5e4a]">{filtered.length} productos</p>
        </div>
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b07880]" />
          <Input
            placeholder="Buscar producto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-xs"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8d5c0] bg-[#faf6f0]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                Producto
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] 
              uppercase tracking-wider">
                <SortableHeader field="price" label="P. Venta" />
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                <SortableHeader field="costPrice" label="P. Costo" />
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                <SortableHeader field="margin" label="Margen" />
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                <SortableHeader field="stock" label="Stock" />
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                <SortableHeader field="sold" label="Vendidos" />
              </th>
              
              <th className="text-right px-4 py-3 text-xs font-semibold text-[#8b5e4a] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => {
              const margin = Math.round(
                ((product.price - product.costPrice) / product.price) * 100
              );
              const isLowStock = product.stock <= 5;
              return (
                <tr
                  key={product.id}
                  className={cn(
                    "border-b border-[#f2e8da] hover:bg-[#faf6f0] transition-colors",
                    i === filtered.length - 1 && "border-b-0"
                  )}
                >
                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 relative">
                        <Image
                          src={product.imageUrl || "/placeholder-product.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#2c1810] leading-tight">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#8b5e4a]">{product.shortDescription}</p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-right font-medium text-[#2c1810]">
                    ${product.price.toLocaleString("es-AR")}
                  </td>

                  {/* Cost */}
                  <td className="px-4 py-3 text-right text-[#8b5e4a]">
                    ${product.costPrice.toLocaleString("es-AR")}
                  </td>

                  {/* Margin */}
                  <td className="px-4 py-3 text-right">
                    <span className={cn(
                      "font-semibold",
                      margin >= 50 ? "text-green-700" : margin >= 35 ? "text-amber-700" : "text-red-600"
                    )}>
                      {margin}%
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {isLowStock && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span className={cn(
                        "font-medium",
                        isLowStock ? "text-amber-600" : "text-[#2c1810]"
                      )}>
                        {product.stock}
                      </span>
                    </div>
                  </td>

                  {/* Sold */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#c4883a]" />
                      <span className="font-medium text-[#2c1810]">{product.sold}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Activa y desactiva un producto */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-lg ${
                          product.active 
                            ? "hover:bg-blue-50 hover:text-blue-600" 
                            : "hover:bg-gray-100 hover:text-gray-600 text-gray-400"
                        }`}
                        onClick={() => handleToggleProduct(product)}
                        disabled={isTogglingProduct === product.id}
                        title={product.active ? "Desactivar producto" : "Activar producto"}
                      >
                        {isTogglingProduct === product.id ? (
                          <ToggleRight className="w-8 h-5 animate-pulse" />
                        ) : product.active ? (
                          <ToggleRight className="w-8 h-5" />
                        ) : (
                          <ToggleLeft className="w-8 h-5" />
                        )}
                      </Button>
                      {/* Editar producto */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => onEdit(product)}
                      >
                        <Pencil className="w-5 h-3.5" />
                      </Button>
                      {/* Eliminar producto */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-[#f2e8da]">
        {filtered.map((product) => {
          const margin = Math.round(
            ((product.price - product.costPrice) / product.price) * 100
          );
          return (
            <div key={product.id} className="p-4 flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 relative">
                <Image src={product.imageUrl || "/placeholder-product.svg"} alt={product.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#2c1810] text-sm leading-tight">{product.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#8b5e4a]">
                  <span>Venta: <strong className="text-[#c4883a]">${product.price.toLocaleString("es-AR")}</strong></span>
                  <span>Margen: <strong className="text-green-700">{margin}%</strong></span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-[#8b5e4a]">
                  <span>Stock: <strong className={product.stock <= 5 ? "text-amber-600" : "text-[#2c1810]"}>{product.stock}</strong></span>
                  <span>Vendidos: <strong>{product.sold}</strong></span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-lg ${
                    product.active 
                      ? "" 
                      : "text-gray-400"
                  }`}
                  onClick={() => handleToggleProduct(product)}
                  disabled={isTogglingProduct === product.id}
                  title={product.active ? "Desactivar producto" : "Activar producto"}
                >
                  {isTogglingProduct === product.id ? (
                    <ToggleRight className="w-5 h-5 animate-pulse" />
                  ) : product.active ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => onEdit(product)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:text-red-500"
                  onClick={() => handleDeleteClick(product)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#8b5e4a]">
          <p className="text-3xl mb-2">📦</p>
          <p className="text-sm">No se encontraron productos</p>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        product={selectedProductForDelete!}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
