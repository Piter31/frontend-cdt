"use client";

import { useState } from "react";
import { PRODUCTS, type Product } from "@/constants/data";
import { MetricsCards } from "@/components/admin/MetricsCards";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, RefreshCw } from "lucide-react";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  function showNotif(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSave(data: Partial<Product>) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? ({ ...p, ...data } as Product) : p
        )
      );
      showNotif(`✓ "${data.name}" actualizado correctamente`);
    } else {
      setProducts((prev) => [...prev, data as Product]);
      showNotif(`✓ "${data.name}" agregado al inventario`);
    }
    setShowForm(false);
    setEditingProduct(null);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    const product = products.find((p) => p.id === id);
    if (window.confirm(`¿Eliminar "${product?.name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotif(`"${product?.name}" eliminado del inventario`);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProduct(null);
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-[#e8d5c0] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#2c1810]">
            Dashboard
          </h1>
          <p className="text-xs text-[#8b5e4a] capitalize">
            {dateStr} · {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-[#f2e8da] transition-colors">
            <Bell className="w-4 h-4 text-[#8b5e4a]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c4883a] rounded-full" />
          </button>
          <Button
            size="sm"
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </Button>
        </div>
      </header>

      {/* Notification toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-[#2c1810] text-white text-sm px-4 py-3 rounded-2xl shadow-xl animate-fade-in-up flex items-center gap-2">
          <span>{notification}</span>
        </div>
      )}

      <main className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
        {/* Metrics */}
        <MetricsCards />

        {/* Form */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {/* Quick stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total productos",
              value: products.length,
              icon: "📦",
            },
            {
              label: "En stock crítico",
              value: products.filter((p) => p.stock <= 5).length,
              icon: "⚠️",
            },
            {
              label: "Más vendido",
              value:
                products.sort((a, b) => b.sold - a.sold)[0]?.name.split(" ").slice(0, 2).join(" ") ?? "—",
              icon: "🏆",
              isText: true,
            },
            {
              label: "Categorías",
              value: new Set(products.map((p) => p.category)).size,
              icon: "🗂️",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-[#e8d5c0] px-4 py-3 flex items-center gap-3"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-[10px] font-medium text-[#8b5e4a] uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="font-display text-lg font-semibold text-[#2c1810] leading-tight">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory table */}
        <div id="inventario">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-semibold text-[#2c1810]">
              Gestión de Inventario
            </h2>
            <button
              onClick={() => setProducts(PRODUCTS)}
              className="flex items-center gap-1.5 text-xs text-[#8b5e4a] hover:text-[#2c1810] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resetear datos
            </button>
          </div>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Mini chart: top sellers */}
        <div className="bg-white rounded-2xl border border-[#e8d5c0] p-5 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-[#2c1810] mb-4">
            Productos más vendidos
          </h3>
          <div className="space-y-3">
            {[...products]
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 5)
              .map((product, i) => {
                const max = Math.max(...products.map((p) => p.sold));
                const pct = (product.sold / max) * 100;
                return (
                  <div key={product.id} className="flex items-center gap-3">
                    <span className="text-xs text-[#8b5e4a] w-4 text-right font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-[#2c1810] truncate max-w-[160px]">
                          {product.name}
                        </span>
                        <span className="text-sm font-semibold text-[#c4883a]">
                          {product.sold}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#f2e8da] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#c4883a] to-[#e0a84e] transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
