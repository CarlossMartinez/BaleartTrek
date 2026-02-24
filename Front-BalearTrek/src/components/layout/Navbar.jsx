// ============================================================
// src/components/layout/Navbar.jsx
//
// La barra de navegación superior que aparece en todas las páginas.
// Tiene: el logo de BalearTrek, los enlaces de navegación
// y el botón de Login / menú de usuario.
// ============================================================

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  // Sacamos los datos del usuario y la función de logout del contexto
  const { usuario, estaLogueado, logout } = useAuth();

  // Estado para mostrar/ocultar el menú desplegable del usuario
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estado para el menú hamburguesa en móvil
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // useNavigate nos permite redirigir al usuario a otra página
  const navigate = useNavigate();

  // -------------------------------------------------------
  // Función para cerrar sesión
  // -------------------------------------------------------
  const handleLogout = async () => {
    await logout();         // Llamamos al logout del contexto
    setMenuAbierto(false);  // Cerramos el menú
    navigate("/");          // Redirigimos al home
  };

  // Las clases de Tailwind para los enlaces activos/inactivos del nav
  const claseEnlace = ({ isActive }) =>
    isActive
      ? "text-emerald-400 font-semibold border-b-2 border-emerald-400 pb-1"
      : "text-stone-200 hover:text-emerald-300 transition-colors duration-200";

  return (
    <nav className="bg-stone-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ------------------------------------------------ */}
          {/* LOGO */}
          {/* ------------------------------------------------ */}
          <Link to="/" className="flex items-center gap-3">
            {/* Placeholder del logo — sustituye el div por un <img> con tu logo */}
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-white font-bold text-xl tracking-wide">
              BalearTrek
            </span>
          </Link>

          {/* ------------------------------------------------ */}
          {/* ENLACES DE NAVEGACIÓN (escritorio) */}
          {/* ------------------------------------------------ */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/treks" className={claseEnlace}>
              Treks
            </NavLink>
            <NavLink to="/about" className={claseEnlace}>
              About Us
            </NavLink>
            <NavLink to="/faq" className={claseEnlace}>
              FAQ
            </NavLink>
            {/* "Mis Meetings" solo aparece si el usuario está logueado */}
            {estaLogueado && (
              <NavLink to="/mis-meetings" className={claseEnlace}>
                Mis Meetings
              </NavLink>
            )}
          </div>

          {/* ------------------------------------------------ */}
          {/* BOTÓN LOGIN / MENÚ DE USUARIO */}
          {/* ------------------------------------------------ */}
          <div className="hidden md:block relative">
            {estaLogueado ? (
              // Si está logueado, mostramos su nombre con un menú desplegable
              <div>
                <button
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
                >
                  {/* Icono de usuario (un círculo con la inicial) */}
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {usuario?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{usuario?.name}</span>
                  {/* Flechita que rota cuando el menú está abierto */}
                  <svg
                    className={`w-4 h-4 transition-transform ${menuAbierto ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menú desplegable del usuario */}
                {menuAbierto && (
                  <div className="absolute right-0 mt-2 w-48 bg-stone-800 rounded-lg shadow-xl border border-stone-700 overflow-hidden">
                    <Link
                      to="/perfil"
                      onClick={() => setMenuAbierto(false)}
                      className="block px-4 py-3 text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/mis-meetings"
                      onClick={() => setMenuAbierto(false)}
                      className="block px-4 py-3 text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
                    >
                      Mis Meetings
                    </Link>
                    {/* Línea separadora */}
                    <div className="border-t border-stone-700" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-stone-700 hover:text-red-300 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Si NO está logueado, mostramos el botón de Login
              <Link
                to="/login"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* ------------------------------------------------ */}
          {/* BOTÓN HAMBURGUESA (solo en móvil) */}
          {/* ------------------------------------------------ */}
          <button
            className="md:hidden text-stone-300 hover:text-white"
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuMovilAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* MENÚ MÓVIL (se despliega cuando se abre la hamburguesa) */}
      {/* ------------------------------------------------ */}
      {menuMovilAbierto && (
        <div className="md:hidden bg-stone-800 border-t border-stone-700 px-4 py-4 flex flex-col gap-4">
          <NavLink to="/treks" className={claseEnlace} onClick={() => setMenuMovilAbierto(false)}>Treks</NavLink>
          <NavLink to="/about" className={claseEnlace} onClick={() => setMenuMovilAbierto(false)}>About Us</NavLink>
          <NavLink to="/faq" className={claseEnlace} onClick={() => setMenuMovilAbierto(false)}>FAQ</NavLink>
          {estaLogueado && (
            <>
              <NavLink to="/mis-meetings" className={claseEnlace} onClick={() => setMenuMovilAbierto(false)}>Mis Meetings</NavLink>
              <NavLink to="/perfil" className={claseEnlace} onClick={() => setMenuMovilAbierto(false)}>Mi Perfil</NavLink>
              <button onClick={handleLogout} className="text-red-400 text-left hover:text-red-300">
                Cerrar sesión
              </button>
            </>
          )}
          {!estaLogueado && (
            <Link to="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setMenuMovilAbierto(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
