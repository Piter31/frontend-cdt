import { Heart } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#2c1810] text-[#faf6f0]">
      {/* Nosotros section */}
      <div id="nosotros" className="border-b border-white/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium text-[#d4a0a7] uppercase tracking-widest mb-4">
            Nuestra Historia
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-6">
            Hechos con <span className="italic text-[#c4883a]">pasión</span>
          </h2>
          <p className="text-[#e8d5c0]/80 leading-relaxed text-lg max-w-2xl mx-auto">
            Corazón de Trufa nació del amor por la repostería y la
            tradición pastelera argentina. Cada pieza que elaboramos lleva
            ingredientes de primera calidad, técnica y, sobre todo, el cariño
            de quienes la hacen.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#c4883a] flex items-center justify-center">
              <span className="text-white text-xs font-display font-bold">CT</span>
            </div>
            <span className="font-display text-lg text-white">Corazón de Trufa</span>
          </div>
          <p className="text-sm text-[#e8d5c0]/70 leading-relaxed">
            Repostería artesanal.<br />Ushuaia · Tierra del Fuego, Argentina.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
            Menú
          </h4>
          <ul className="space-y-2 text-sm text-[#e8d5c0]/70">
            <li><a href="#catalogo" className="hover:text-[#d4a0a7] transition-colors">Catálogo</a></li>
            <li><a href="#nosotros" className="hover:text-[#d4a0a7] transition-colors">Nosotros</a></li>
            {/* <li><a href="/admin" className="hover:text-[#d4a0a7] transition-colors">Administración</a></li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
            Contacto
          </h4>
          <div className="space-y-3">
            <a
              href="https://wa.me/5491100000000"
              className="flex items-center gap-2.5 text-sm text-[#e8d5c0]/70 hover:text-[#d4a0a7] transition-colors"
            >
              <FaWhatsapp className="w-4 h-4 shrink-0" />
              WhatsApp: +54 9 11 0000-0000
            </a>
            <a
              href="https://www.instagram.com/corazonde.trufa/"
              className="flex items-center gap-2.5 text-sm text-[#e8d5c0]/70 hover:text-[#d4a0a7] transition-colors"
            >
              <FaInstagram className="w-4 h-4 shrink-0"/>
              @corazonde.trufa
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <p className="text-center text-xs text-[#e8d5c0]/40 flex items-center justify-center gap-1.5">
          © 2026 · Corazón de Trufa <Heart className="w-3 h-3 text-[#c4883a]"/>· Version Beta 0.1
        </p>
      </div>
    </footer>
  );
}
