"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  cartCount?: number;
}

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#e8d5c0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#2c1810] flex items-center justify-center group-hover:bg-[#c4883a] transition-colors">
              <span className="text-[#faf6f0] text-xs font-display font-bold">CT</span>
            </div>
            <span className="font-display text-xl font-semibold text-[#2c1810] hidden sm:block">
              Corazón de Trufa
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#catalogo" className="text-sm text-[#6b3d2a] hover:text-[#2c1810] font-medium transition-colors">
              Catálogo
            </Link>
            <Link href="/#nosotros" className="text-sm text-[#6b3d2a] hover:text-[#2c1810] font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="/#contacto" className="text-sm text-[#6b3d2a] hover:text-[#2c1810] font-medium transition-colors">
              Contacto
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-[#e8d5c0] transition-colors">
              <ShoppingBag className="w-5 h-5 text-[#2c1810]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c4883a] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#e8d5c0] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5 text-[#2c1810]" /> : <Menu className="w-5 h-5 text-[#2c1810]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-48 border-t border-[#e8d5c0]" : "max-h-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4 bg-[#faf6f0]">
          <Link href="/#catalogo" className="text-sm font-medium text-[#6b3d2a]" onClick={() => setMenuOpen(false)}>
            Catálogo
          </Link>
          <Link href="/#nosotros" className="text-sm font-medium text-[#6b3d2a]" onClick={() => setMenuOpen(false)}>
            Nosotros
          </Link>
          <Link href="/#contacto" className="text-sm font-medium text-[#6b3d2a]" onClick={() => setMenuOpen(false)}>
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
