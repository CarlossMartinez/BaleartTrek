// ============================================================
// src/App.jsx
//
// Componente raíz de la aplicación.
// Aquí definimos todas las rutas con React Router DOM.
//
// Estructura de rutas:
//   /             → Home (carrusel de treks destacados)
//   /treks        → Listado de todos los treks con filtros
//   /treks/:id    → Detalle de un trek (con sus meetings)
//   /meetings/:id → Detalle de un meeting (con inscripción y comentarios)
//   /about        → About Us
//   /faq          → FAQ
//   /login        → Login + Registro (misma página, dos pestañas)
//
// Rutas protegidas (solo si estás logueado):
//   /perfil       → Mi Perfil
//   /mis-meetings → Mis Meetings
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexto de autenticación (envuelve toda la app)
import { AuthProvider } from "./context/AuthContext";

// Layout general (Navbar + Footer)
import Layout from "./components/layout/Layout";

// Componente para proteger rutas privadas
import RutaProtegida from "./components/ui/RutaProtegida";

// Páginas
import Home from "./pages/Home";
import Treks from "./pages/Treks";
import DetalleTrek from "./pages/DetalleTrek";
import DetalleMeeting from "./pages/DetalleMeeting";
import Login from "./pages/Login";
import MisMeetings from "./pages/MisMeetings";
import Perfil from "./pages/Perfil";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    // BrowserRouter activa el sistema de rutas en toda la app
    <BrowserRouter>
      {/* AuthProvider hace que el usuario logueado esté disponible en todos los componentes */}
      <AuthProvider>
        <Routes>

          {/* ================================================== */}
          {/* RUTAS PÚBLICAS */}
          {/* Envueltas en Layout para tener Navbar y Footer */}
          {/* ================================================== */}
          <Route element={<Layout />}>

            {/* Página principal */}
            <Route path="/" element={<Home />} />

            {/* Listado de treks */}
            <Route path="/treks" element={<Treks />} />

            {/* Detalle de un trek concreto */}
            {/* :id es el parámetro dinámico — se accede con useParams() */}
            <Route path="/treks/:id" element={<DetalleTrek />} />

            {/* Detalle de un meeting concreto */}
            <Route path="/meetings/:id" element={<DetalleMeeting />} />

            {/* About Us */}
            <Route path="/about" element={<AboutUs />} />

            {/* FAQ */}
            <Route path="/faq" element={<FAQ />} />

            {/* Login y Registro (misma página) */}
            <Route path="/login" element={<Login />} />

            {/* ================================================ */}
            {/* RUTAS PRIVADAS (necesitan login) */}
            {/* RutaProtegida comprueba si el usuario está logueado */}
            {/* Si no, redirige a /login automáticamente */}
            {/* ================================================ */}
            <Route element={<RutaProtegida />}>
              {/* Mis meetings (inscripciones del usuario) */}
              <Route path="/mis-meetings" element={<MisMeetings />} />

              {/* Perfil del usuario */}
              <Route path="/perfil" element={<Perfil />} />
            </Route>

            {/* Ruta 404 — si el usuario pone una URL que no existe */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                  <p className="text-8xl mb-6">🏔️</p>
                  <h1 className="text-4xl font-bold text-white mb-3">404</h1>
                  <p className="text-stone-400 text-lg mb-6">Esta página no existe.</p>
                  <a
                    href="/"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Volver al inicio
                  </a>
                </div>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
