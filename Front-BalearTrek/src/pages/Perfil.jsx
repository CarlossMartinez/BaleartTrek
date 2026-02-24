// ============================================================
// src/pages/Perfil.jsx
//
// Página del perfil del usuario.
// Muestra sus datos y permite editarlos.
// También permite cambiar la contraseña (pide la actual por seguridad).
//
// Campos editables (tabla users):
//   - name, lastname, phone
//   - password (en un formulario separado con la contraseña actual)
// ============================================================

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/services";

export default function Perfil() {
  const { usuario, actualizarUsuario } = useAuth();

  // -------------------------------------------------------
  // Estado para editar los datos del perfil
  // -------------------------------------------------------
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosPerfil, setDatosPerfil] = useState({
    name: usuario?.name ?? "",
    lastname: usuario?.lastname ?? "",
    phone: usuario?.phone ?? "",
  });
  const [cargandoPerfil, setCargandoPerfil] = useState(false);
  const [exitoPerfil, setExitoPerfil] = useState("");
  const [errorPerfil, setErrorPerfil] = useState("");

  // -------------------------------------------------------
  // Estado para cambiar la contraseña
  // -------------------------------------------------------
  const [datosPassword, setDatosPassword] = useState({
    current_password: "",      // Contraseña actual (por seguridad)
    password: "",              // Nueva contraseña
    password_confirmation: "", // Confirmación de la nueva contraseña
  });
  const [cargandoPassword, setCargandoPassword] = useState(false);
  const [exitoPassword, setExitoPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // -------------------------------------------------------
  // Guardar cambios del perfil
  // -------------------------------------------------------
  const handleGuardarPerfil = async (e) => {
    e.preventDefault();
    setCargandoPerfil(true);
    setErrorPerfil("");
    setExitoPerfil("");

    try {
      // PUT /api/user — actualizamos name, lastname, phone
      const res = await authService.updateProfile(datosPerfil);
      actualizarUsuario(res.data.data ?? res.data); // Actualizamos el contexto
      setExitoPerfil("¡Datos actualizados correctamente!");
      setModoEdicion(false);
    } catch (err) {
      setErrorPerfil(
        err.response?.data?.message ?? "No se pudieron guardar los cambios."
      );
    } finally {
      setCargandoPerfil(false);
    }
  };

  // -------------------------------------------------------
  // Cambiar la contraseña
  // -------------------------------------------------------
  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    setCargandoPassword(true);
    setErrorPassword("");
    setExitoPassword("");

    try {
      // PUT /api/user/password
      await authService.updatePassword(datosPassword);
      setExitoPassword("¡Contraseña cambiada correctamente!");
      // Limpiamos los campos del formulario
      setDatosPassword({ current_password: "", password: "", password_confirmation: "" });
    } catch (err) {
      setErrorPassword(
        err.response?.data?.message ?? "No se pudo cambiar la contraseña."
      );
    } finally {
      setCargandoPassword(false);
    }
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Mi Perfil</h1>

      {/* ================================================== */}
      {/* SECCIÓN: MIS DATOS */}
      {/* ================================================== */}
      <div className="bg-stone-800 rounded-2xl border border-stone-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">Mis datos</h2>
          {/* Botón para activar el modo edición */}
          {!modoEdicion && (
            <button
              onClick={() => setModoEdicion(true)}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {/* Mensajes de éxito/error del perfil */}
        {exitoPerfil && (
          <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-300 rounded-lg p-3 mb-4 text-sm">
            {exitoPerfil}
          </div>
        )}
        {errorPerfil && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg p-3 mb-4 text-sm">
            {errorPerfil}
          </div>
        )}

        {!modoEdicion ? (
          // MODO LECTURA: mostramos los datos del usuario
          <div className="space-y-4">
            <CampoLectura label="Nombre" valor={usuario?.name} />
            <CampoLectura label="Apellido" valor={usuario?.lastname} />
            {/* DNI no se puede editar (es el identificador único del usuario) */}
            <CampoLectura label="DNI" valor={usuario?.dni} />
            <CampoLectura label="Email" valor={usuario?.email} />
            <CampoLectura label="Teléfono" valor={usuario?.phone ?? "No especificado"} />
          </div>
        ) : (
          // MODO EDICIÓN: formulario para cambiar los datos
          <form onSubmit={handleGuardarPerfil} className="space-y-4">
            <div>
              <label className="text-stone-400 text-sm block mb-1">Nombre</label>
              <input
                type="text" value={datosPerfil.name}
                onChange={(e) => setDatosPerfil({ ...datosPerfil, name: e.target.value })}
                className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm block mb-1">Apellido</label>
              <input
                type="text" value={datosPerfil.lastname}
                onChange={(e) => setDatosPerfil({ ...datosPerfil, lastname: e.target.value })}
                className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500"
              />
            </div>
            {/* DNI y Email son de solo lectura: no se editan */}
            <div>
              <label className="text-stone-400 text-sm block mb-1">DNI <span className="text-stone-600">(no editable)</span></label>
              <input
                type="text" value={usuario?.dni} disabled
                className="w-full bg-stone-900/50 border border-stone-700 text-stone-500 rounded-lg px-4 py-2.5 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm block mb-1">Email <span className="text-stone-600">(no editable)</span></label>
              <input
                type="email" value={usuario?.email} disabled
                className="w-full bg-stone-900/50 border border-stone-700 text-stone-500 rounded-lg px-4 py-2.5 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-stone-400 text-sm block mb-1">Teléfono</label>
              <input
                type="tel" value={datosPerfil.phone}
                onChange={(e) => setDatosPerfil({ ...datosPerfil, phone: e.target.value })}
                placeholder="+34 600 000 000"
                className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
              />
            </div>

            {/* Botones del formulario de edición */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={cargandoPerfil}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {cargandoPerfil ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={() => { setModoEdicion(false); setErrorPerfil(""); }}
                className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 py-2.5 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ================================================== */}
      {/* SECCIÓN: CAMBIAR CONTRASEÑA */}
      {/* ================================================== */}
      <div className="bg-stone-800 rounded-2xl border border-stone-700 p-6">
        <h2 className="text-white text-xl font-semibold mb-6">Cambiar contraseña</h2>

        {/* Mensajes de éxito/error de la contraseña */}
        {exitoPassword && (
          <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-300 rounded-lg p-3 mb-4 text-sm">
            {exitoPassword}
          </div>
        )}
        {errorPassword && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg p-3 mb-4 text-sm">
            {errorPassword}
          </div>
        )}

        <form onSubmit={handleCambiarPassword} className="space-y-4">
          {/* Contraseña actual (por seguridad) */}
          <div>
            <label className="text-stone-400 text-sm block mb-1">
              Introduce tu contraseña actual (por seguridad)
            </label>
            <input
              type="password"
              value={datosPassword.current_password}
              onChange={(e) => setDatosPassword({ ...datosPassword, current_password: e.target.value })}
              required
              placeholder="••••••••"
              className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
            />
          </div>

          {/* Nueva contraseña */}
          <div>
            <label className="text-stone-400 text-sm block mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={datosPassword.password}
              onChange={(e) => setDatosPassword({ ...datosPassword, password: e.target.value })}
              required
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
            />
          </div>

          {/* Confirmar nueva contraseña */}
          <div>
            <label className="text-stone-400 text-sm block mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={datosPassword.password_confirmation}
              onChange={(e) => setDatosPassword({ ...datosPassword, password_confirmation: e.target.value })}
              required
              placeholder="Repite la nueva contraseña"
              className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
            />
          </div>

          <button
            type="submit"
            disabled={cargandoPassword}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
          >
            {cargandoPassword ? "Cambiando..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Componente pequeño para mostrar un campo en modo lectura
// -------------------------------------------------------
function CampoLectura({ label, valor }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-stone-500 text-sm w-28 flex-shrink-0">{label}</span>
      <span className="text-white">{valor}</span>
    </div>
  );
}
