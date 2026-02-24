// ============================================================
// src/components/ui/RutaProtegida.jsx
//
// Este componente protege las rutas que solo pueden ver
// los usuarios que han iniciado sesión.
//
// Si el usuario NO está logueado y intenta ir a /perfil
// o /mis-meetings, lo redirigimos al login automáticamente.
//
// Lo usamos en App.jsx así:
//   <Route element={<RutaProtegida />}>
//     <Route path="/perfil" element={<Perfil />} />
//   </Route>
// ============================================================

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RutaProtegida() {
  const { estaLogueado, cargando } = useAuth();

  // Si todavía estamos comprobando si el token es válido,
  // mostramos un spinner de carga para no redirigir por error
  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Si está logueado, mostramos la página que pedía (<Outlet />)
  // Si NO está logueado, lo mandamos al login
  return estaLogueado ? <Outlet /> : <Navigate to="/login" replace />;
}
