"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin#inventario", label: "Inventario", icon: Package },
  { href: "/admin#ventas", label: "Ventas", icon: ShoppingCart },
  { href: "/admin#reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin#ajustes", label: "Ajustes", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#2c1810] flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#c4883a] flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-display font-bold">CT</span>
          </div>
          <div>
            <p className="text-white font-display text-sm font-semibold leading-tight">
              Corazón de Trufa
            </p>
            <p className="text-[#d4a0a7] text-[10px] font-medium uppercase tracking-wider">
              Panel Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-[#c4883a] text-white shadow-md"
                  : "text-[#e8d5c0]/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#d4a0a7]/30 flex items-center justify-center">
            <span className="text-[#d4a0a7] text-sm font-medium">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Administrador</p>
            <p className="text-[#d4a0a7]/60 text-[10px] truncate">admin@corazon.com</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#e8d5c0]/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          Ir a la tienda
        </Link>
      </div>
    </aside>
  );
}
