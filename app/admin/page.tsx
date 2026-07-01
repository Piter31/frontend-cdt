"use client";

// import React from 'react';
import { useState, useEffect } from "react";
// import { PRODUCTS, type Product } from "@/constants/data";
import { MetricsCards } from "@/components/admin/MetricsCards";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, RefreshCw } from "lucide-react";

import { Product } from "@/lib/product";
import { getProducts } from "../services/products.service";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  // Cargar productos desde la base de datos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const dataProduct = await getProducts();
        // Asegurar que data es un array
        // const productsArray = Array.isArray(data) ? data : (data?.items || data?.data || []);
        setProducts(dataProduct);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al cargar productos';
        setError(errorMsg);
        console.error('Error fetching products:', err);
        showNotif(`⚠️ Error: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    // Actualizar fecha y hora en el cliente
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDateStr(
        now.toLocaleDateString("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      );
    };

    updateDateTime();
    fetchProducts();
  }, []);


  function showNotif(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  async function handleSave(data: Partial<Product>) {
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

  // Editar producto: abre el formulario con los datos del producto seleccionado
  function handleEdit(product: Product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  // Eliminar producto: actualiza el estado (la API ya fue llamada desde ProductTable)
  function handleDelete(id: string) {
    const product = (products || []).find((p) => p.id === id);
    setProducts((prev) => [...(prev || []).filter((p) => p.id !== id)]);
    showNotif(`"${product?.name}" eliminado del inventario`);
  }

  // Alternar estado de producto
  function handleToggle(product: Product) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, active: product.active } : p
      )
    );
    const status = product.active ? "activado" : "desactivado";
    showNotif(`"${product.name}" ${status} correctamente`);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProduct(null);
  }

  // Función para refrescar los productos desde el backend
  async function handleRefresh() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
      showNotif(`✓ Datos actualizados (${data.length} productos)`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al refrescar';
      setError(errorMsg);
      showNotif(`⚠️ Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  }

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

        {/* Form Modal */}
        <ProductFormModal
          isOpen={showForm}
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />

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
              value: Object.values(products).filter((p) => p.stock <= 5).length,
              icon: "⚠️",
            },
            {
              label: "Más vendido",
              value:
                products.length > 0 
                  ? products.sort((a, b) => b.sold - a.sold)[0]?.name.split(" ").slice(0, 2).join(" ") ?? "—"
                  : "—",
              icon: "🏆",
              isText: true,
            },
            {
              label: "Categorías",
              value: new Set(Object.values(products).map((p) => p.category)).size,
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
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-[#8b5e4a] hover:text-[#2c1810] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Cargando...' : 'Refrescar datos'}
            </button>
          </div>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Error: {error}
            </div>
          )}
          {!loading && products.length === 0 && !error && (
            <div className="text-center py-8 text-[#8b5e4a]">
              <p>No hay productos. Crea uno nuevo o verifica tu conexión al backend.</p>
            </div>
          )}
          {products.length > 0 && (
            <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
            // key={Product.id}
            />
          )}
          {/* {products.map((product) => (
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
              key={product.id}
            />
          ))} */}
        </div>

        {/* Mini chart: top sellers */}
        <div className="bg-white rounded-2xl border border-[#e8d5c0] p-5 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-[#2c1810] mb-4">
            Productos más vendidos
          </h3>
          <div className="space-y-3">
            {products.length > 0 ? (
              products
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 6)
                .map((product, i) => {
                  const max = Math.max(...products.map((p) => p.sold), 1);
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
                })
            ) : (
              <p className="text-center text-[#8b5e4a] text-sm py-4">
                Sin datos de ventas disponibles
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
