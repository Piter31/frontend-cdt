"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#faf6f0]">
      {/* Background decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#e8c8cc]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#e8d5c0]/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#faf6f0] border border-[#e8d5c0]/30 pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-[8%] animate-float" style={{ animationDelay: "0s" }}>
        <div className="w-14 h-14 rounded-full bg-white border border-[#e8d5c0] shadow-sm flex items-center justify-center text-2xl">🍫</div>
      </div>
      <div className="absolute top-48 right-[10%] animate-float" style={{ animationDelay: "1.2s" }}>
        <div className="w-12 h-12 rounded-full bg-white border border-[#e8d5c0] shadow-sm flex items-center justify-center text-xl">🍋</div>
      </div>
      <div className="absolute bottom-40 right-[14%] animate-float" style={{ animationDelay: "0.6s" }}>
        <div className="w-16 h-16 rounded-full bg-white border border-[#e8d5c0] shadow-sm flex items-center justify-center text-2xl">🍰</div>
      </div>
      <div className="absolute bottom-52 left-[12%] animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-10 h-10 rounded-full bg-white border border-[#e8d5c0] shadow-sm flex items-center justify-center text-lg">✨</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white border border-[#e8d5c0] rounded-full px-4 py-2 mb-8 shadow-sm opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c4883a]" />
          <span className="text-xs font-medium text-[#6b3d2a] tracking-wider uppercase">
            Repostería Artesanal · Buenos Aires
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-light text-[#2c1810] leading-[1.05] mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          Corazón
          <br />
          <span className="italic text-[#c4883a]">de Trufa</span>
        </h1>

        {/* Decorative divider */}
        <div
          className="flex items-center justify-center gap-3 my-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a0a7]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4a0a7]" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a0a7]" />
        </div>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-[#8b5e4a] font-light max-w-xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          Cada pieza, una obra de arte. Elaborada con ingredientes premium
          y el amor de la tradición pastelera francesa en cada bocado.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-[#2c1810]/20 hover:shadow-xl hover:shadow-[#2c1810]/25 hover:-translate-y-0.5"
            onClick={() =>
              document
                .getElementById("catalogo")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver el Catálogo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto hover:-translate-y-0.5"
            onClick={() =>
              document
                .getElementById("nosotros")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Nuestra Historia
          </Button>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-8 mt-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
        >
          {[
            { value: "100%", label: "Artesanal" },
            { value: "8+", label: "Variedades" },
            { value: "500+", label: "Clientes felices" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-semibold text-[#2c1810]">
                {stat.value}
              </p>
              <p className="text-xs text-[#8b5e4a] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#8b5e4a] hover:text-[#2c1810] transition-colors group"
        onClick={() =>
          document
            .getElementById("catalogo")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <div className="w-8 h-8 rounded-full border border-[#d4a0a7] flex items-center justify-center group-hover:bg-[#e8d5c0] transition-colors">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </button>
    </section>
  );
}
