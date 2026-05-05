"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Product } from "@/constants/data";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filtered = PRODUCTS
    .filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // featured: featured first then by sold
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.sold - a.sold;
    });

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  return (
    <section id="catalogo" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-xs font-medium text-[#b07880] uppercase tracking-widest mb-3">
          Nuestras Creaciones
        </p>
        <h2 className="font-display text-5xl sm:text-6xl font-light text-[#2c1810]">
          El Catálogo
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a0a7]" />
          <div className="w-1 h-1 rounded-full bg-[#d4a0a7]" />
          <p className="text-sm text-[#8b5e4a] font-light italic">
            elaborado con amor
          </p>
          <div className="w-1 h-1 rounded-full bg-[#d4a0a7]" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a0a7]" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b07880]" />
          <Input
            placeholder="Buscar productos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#8b5e4a] shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-[#e8d5c0] rounded-xl px-3 py-2 bg-white text-[#2c1810] focus:outline-none focus:ring-2 focus:ring-[#d4a0a7]"
          >
            <option value="featured">Destacados</option>
            <option value="rating">Mejor calificados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all",
              activeCategory === cat.value
                ? "bg-[#2c1810] text-[#faf6f0] border-[#2c1810] shadow-sm"
                : "bg-white text-[#6b3d2a] border-[#e8d5c0] hover:border-[#d4a0a7] hover:bg-[#f2e8da]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-[#8b5e4a] mb-6">
        {filtered.length === 0
          ? "No se encontraron productos"
          : `${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleSelectProduct}
              style={{ animationDelay: `${index * 0.07}s`, animationFillMode: "forwards" }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-4xl text-[#e8d5c0]">🍰</p>
          <p className="mt-4 text-[#8b5e4a]">No encontramos lo que buscas</p>
          <button
            className="mt-3 text-sm text-[#c4883a] hover:underline"
            onClick={() => { setSearch(""); setActiveCategory("all"); }}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
