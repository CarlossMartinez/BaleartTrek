// ============================================================
// src/pages/Login.jsx
//
// Página de inicio de sesión y registro.
// Tiene dos pestañas: "Iniciar sesión" y "Registrarse".
//
// Formulario de Login:
//   - email
//   - password
//
// Formulario de Registro:
//   - name, lastname (campos de la tabla users)
//   - dni (campo único en la tabla users)
//   - email, phone
//   - password, password_confirmation
// ============================================================

import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Pestaña activa: "login" o "registro"
  const [pestañaActiva, setPestañaActiva] = useState("login");

  const { login, register, estaLogueado } = useAuth();
  const navigate = useNavigate();

  // Si ya está logueado, lo mandamos al home directamente
  if (estaLogueado) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-stone-950">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
            B
          </div>
          <h1 className="text-white text-2xl font-bold">BalearTrek</h1>
        </div>

        {/* Tarjeta del formulario */}
        <div className="bg-stone-800 rounded-2xl border border-stone-700 overflow-hidden">

          {/* Pestañas */}
          <div className="flex border-b border-stone-700">
            <button
              onClick={() => setPestañaActiva("login")}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                pestañaActiva === "login"
                  ? "text-white bg-stone-900 border-b-2 border-emerald-500"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setPestañaActiva("registro")}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                pestañaActiva === "registro"
                  ? "text-white bg-stone-900 border-b-2 border-emerald-500"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="p-6">
            {pestañaActiva === "login" ? (
              <FormularioLogin onLogin={login} onExito={() => navigate("/")} />
            ) : (
              <FormularioRegistro onRegister={register} onExito={() => navigate("/")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Formulario de LOGIN

function FormularioLogin({ onLogin, onExito }) {
  // Estado de los campos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Actualizamos el estado cuando el usuario escribe
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviamos el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos que la página recargue
    setError("");
    setCargando(true);

    try {
      await onLogin(formData.email, formData.password);
      onExito(); // Redirigimos al home si todo fue bien
    } catch (err) {
      // El backend de Laravel devuelve el error en err.response.data.message
      setError(
        err.response?.data?.message ?? "Email o contraseña incorrectos."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Campo Email */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

// ============================================================
// Formulario de REGISTRO
// ============================================================
function FormularioRegistro({ onRegister, onExito }) {
  // Campos que hay en la tabla 'users' de Laravel
  const [formData, setFormData] = useState({
    name: "",            // Nombre
    lastname: "",        // Apellido
    dni: "",             // DNI (único en la tabla users)
    email: "",           // Email (único en la tabla users)
    phone: "",           // Teléfono (nullable)
    password: "",
    password_confirmation: "", // Laravel necesita esto para validar
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiamos el error del campo cuando el usuario empieza a escribir
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    setCargando(true);

    try {
      await onRegister(formData);
      onExito();
    } catch (err) {
      // Laravel devuelve los errores de validación en err.response.data.errors
      // Por ejemplo: { email: ["El email ya está en uso."], dni: ["El DNI ya existe."] }
      if (err.response?.data?.errors) {
        setErrores(err.response.data.errors);
      } else {
        setErrores({ general: err.response?.data?.message ?? "Error al registrarse." });
      }
    } finally {
      setCargando(false);
    }
  };

  // Componente pequeño para mostrar el error de cada campo
  const CampoError = ({ campo }) =>
    errores[campo] ? (
      <p className="text-red-400 text-xs mt-1">{errores[campo][0]}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error general */}
      {errores.general && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg p-3 text-sm">
          {errores.general}
        </div>
      )}

      {/* Nombre y Apellido en la misma fila */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-stone-300 text-sm font-medium block mb-1">Nombre</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange}
            required placeholder="Juan"
            className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
          />
          <CampoError campo="name" />
        </div>
        <div>
          <label className="text-stone-300 text-sm font-medium block mb-1">Apellido</label>
          <input
            type="text" name="lastname" value={formData.lastname} onChange={handleChange}
            required placeholder="García"
            className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
          />
          <CampoError campo="lastname" />
        </div>
      </div>

      {/* DNI */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">DNI</label>
        <input
          type="text" name="dni" value={formData.dni} onChange={handleChange}
          required placeholder="12345678A"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
        <CampoError campo="dni" />
      </div>

      {/* Email */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">Correo electrónico</label>
        <input
          type="email" name="email" value={formData.email} onChange={handleChange}
          required placeholder="tu@email.com"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
        <CampoError campo="email" />
      </div>

      {/* Teléfono (opcional, nullable en la BBDD) */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">
          Teléfono <span className="text-stone-500">(opcional)</span>
        </label>
        <input
          type="tel" name="phone" value={formData.phone} onChange={handleChange}
          placeholder="+34 600 000 000"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
        <CampoError campo="phone" />
      </div>

      {/* Contraseña */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">Contraseña</label>
        <input
          type="password" name="password" value={formData.password} onChange={handleChange}
          required placeholder="Mínimo 8 caracteres"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
        <CampoError campo="password" />
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label className="text-stone-300 text-sm font-medium block mb-1">Confirmar contraseña</label>
        <input
          type="password" name="password_confirmation" value={formData.password_confirmation}
          onChange={handleChange} required placeholder="Repite la contraseña"
          className="w-full bg-stone-900 border border-stone-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 placeholder-stone-600"
        />
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 mt-2"
      >
        {cargando ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
