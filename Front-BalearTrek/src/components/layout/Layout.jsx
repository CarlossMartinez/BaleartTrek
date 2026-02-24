// ============================================================
// src/components/layout/Layout.jsx
//
// El "esqueleto" de todas las páginas.
// Incluye el Navbar arriba, el contenido en el medio
// y el Footer abajo.
//
// Lo usamos en App.jsx para envolver todas las rutas.
// ============================================================

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    // min-h-screen hace que la página ocupe mínimo toda la pantalla
    // flex flex-col hace que el footer siempre quede abajo
    <div className="min-h-screen flex flex-col bg-stone-950">
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Aquí se renderiza la página actual (Home, Treks, etc.) */}
      {/* <Outlet /> es de React Router, pone el contenido de la ruta activa */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
