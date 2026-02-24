// ============================================================
// src/components/layout/Footer.jsx
//
// El pie de página que aparece en todas las páginas.
// Tiene el logo, los enlaces y la info de contacto.
// ============================================================

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Columna 1: Logo y descripción */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="text-white font-bold text-lg">BalearTrek</span>
            </div>
            <p className="text-sm leading-relaxed">
              Descubre los mejores treks de las Islas Baleares. Naturaleza, aventura y comunidad.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/treks" className="hover:text-emerald-400 transition-colors">Treks</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:baleartrek@baleartrek.com" className="hover:text-emerald-400 transition-colors">
                  baleartrek@baleartrek.com
                </a>
              </li>
              <li>
                <a href="tel:+34123456789" className="hover:text-emerald-400 transition-colors">
                  +34 123 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea separadora y copyright */}
        <div className="border-t border-stone-800 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} BalearTrek. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
