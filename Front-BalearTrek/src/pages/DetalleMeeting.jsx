// ============================================================
// src/pages/DetalleMeeting.jsx
//
// Página que muestra los detalles de un Meeting concreto.
// Muestra:
//   - Fecha, hora y periodo de inscripción
//   - Puntos de interés del trek asociado (interesting_places)
//   - Formulario de inscripción (si el usuario está logueado)
//   - Comentarios aprobados (status = 'y') con sus imágenes
// ============================================================

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { meetingsService } from "../services/services";
import { useAuth } from "../context/AuthContext";
import Estrellas from "../components/ui/Estrellas";

export default function DetalleMeeting() {
  const { id } = useParams(); // ID del meeting de la URL
  const { estaLogueado, usuario } = useAuth();
  const navigate = useNavigate();

  // Datos del meeting
  const [meeting, setMeeting] = useState(null);

  // Estado para saber si el usuario YA está inscrito
  const [yaInscrito, setYaInscrito] = useState(false);

  // Estados de carga/error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [inscribiendose, setInscribiendose] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // -------------------------------------------------------
  // Cargar el meeting al entrar en la página
  // -------------------------------------------------------
  useEffect(() => {
    const cargarMeeting = async () => {
      try {
        const res = await meetingsService.getById(id);
        const datos = res.data.data ?? res.data;
        setMeeting(datos);

        // Comprobamos si el usuario actual ya está inscrito
        // El backend debería devolver esto en la respuesta
        // Por ejemplo: meeting.esta_inscrito = true/false
        setYaInscrito(datos.esta_inscrito ?? false);
      } catch (err) {
        console.error("Error al cargar el meeting:", err);
        setError("No se pudo cargar este meeting.");
      } finally {
        setCargando(false);
      }
    };

    cargarMeeting();
  }, [id]);

  // -------------------------------------------------------
  // Función para inscribirse al meeting
  // -------------------------------------------------------
  const handleInscribirse = async () => {
    // Si no está logueado, mandamos al login
    if (!estaLogueado) {
      navigate("/login");
      return;
    }

    setInscribiendose(true);
    setMensajeError("");
    setMensajeExito("");

    try {
      // POST /api/meetings/:id/inscribirse
      // El backend sabe quién somos por el token
      await meetingsService.inscribirse(id);

      setYaInscrito(true);
      setMensajeExito("¡Te has inscrito correctamente! 🎉");

      // Actualizamos el contador de inscritos en la UI
      setMeeting((anterior) => ({
        ...anterior,
        inscritos_count: (anterior.inscritos_count ?? 0) + 1,
      }));
    } catch (err) {
      console.error("Error al inscribirse:", err);
      // El backend puede devolver mensajes de error concretos
      setMensajeError(
        err.response?.data?.message ?? "No se pudo completar la inscripción."
      );
    } finally {
      setInscribiendose(false);
    }
  };

  // -------------------------------------------------------
  // Función para desinscribirse del meeting
  // -------------------------------------------------------
  const handleDesinscribirse = async () => {
    setInscribiendose(true);
    setMensajeError("");
    setMensajeExito("");

    try {
      await meetingsService.desinscribirse(id);
      setYaInscrito(false);
      setMensajeExito("Has cancelado tu inscripción.");
      setMeeting((anterior) => ({
        ...anterior,
        inscritos_count: Math.max((anterior.inscritos_count ?? 1) - 1, 0),
      }));
    } catch (err) {
      setMensajeError(
        err.response?.data?.message ?? "No se pudo cancelar la inscripción."
      );
    } finally {
      setInscribiendose(false);
    }
  };

  // -------------------------------------------------------
  // Comprobamos si el periodo de inscripción está abierto
  // -------------------------------------------------------
  const inscripcionAbierta = meeting
    ? new Date() >= new Date(meeting.appDateIni) &&
      new Date() <= new Date(meeting.appDateEnd)
    : false;

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="text-emerald-400 hover:underline">
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="text-stone-500 text-sm mb-6">
        <Link to="/treks" className="hover:text-emerald-400">Treks</Link>
        <span className="mx-2">›</span>
        <Link to={`/treks/${meeting?.trek?.id}`} className="hover:text-emerald-400">
          {meeting?.trek?.name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-stone-300">Meeting</span>
      </nav>

      {/* ================================================== */}
      {/* CABECERA DEL MEETING */}
      {/* ================================================== */}
      <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">{meeting?.trek?.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Fecha del meeting (campo 'day') */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
              📅
            </div>
            <div>
              <p className="text-stone-500 text-xs">Fecha de inicio</p>
              <p className="text-white font-medium">
                {new Date(meeting?.day).toLocaleDateString("es-ES", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric"
                })}
              </p>
            </div>
          </div>

          {/* Hora (campo 'time') */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
              🕐
            </div>
            <div>
              <p className="text-stone-500 text-xs">Hora de salida</p>
              <p className="text-white font-medium">{meeting?.time}</p>
            </div>
          </div>

          {/* Periodo de inscripción (appDateIni → appDateEnd) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
              📝
            </div>
            <div>
              <p className="text-stone-500 text-xs">Inscripciones</p>
              <p className="text-white font-medium text-sm">
                {new Date(meeting?.appDateIni).toLocaleDateString("es-ES")} →{" "}
                {new Date(meeting?.appDateEnd).toLocaleDateString("es-ES")}
              </p>
            </div>
          </div>

          {/* Número de inscritos */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
              👥
            </div>
            <div>
              <p className="text-stone-500 text-xs">Inscritos</p>
              <p className="text-white font-medium">{meeting?.inscritos_count ?? 0} personas</p>
            </div>
          </div>
        </div>

        {/* Valoración del meeting */}
        <div className="mt-4 pt-4 border-t border-stone-700">
          <Estrellas totalScore={meeting?.totalScore} countScore={meeting?.countScore} tamaño="lg" />
        </div>
      </div>

      {/* ================================================== */}
      {/* PUNTOS DE INTERÉS */}
      {/* (interesting_places del trek, ordenadas por 'order') */}
      {/* ================================================== */}
      {meeting?.trek?.interesting_places?.length > 0 && (
        <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 mb-6">
          <h2 className="text-white text-xl font-bold mb-4">🗺️ Puntos de Interés</h2>
          <ul className="space-y-2">
            {meeting.trek.interesting_places.map((lugar, index) => (
              <li key={lugar.id} className="flex items-center gap-3 text-stone-300">
                <span className="w-6 h-6 bg-emerald-900 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                {lugar.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================================================== */}
      {/* SECCIÓN DE INSCRIPCIÓN */}
      {/* ================================================== */}
      <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 mb-6">
        <h2 className="text-white text-xl font-bold mb-4">Inscripción</h2>

        {/* Mensajes de éxito/error */}
        {mensajeExito && (
          <div className="bg-emerald-900/50 border border-emerald-700 text-emerald-300 rounded-lg p-3 mb-4">
            {mensajeExito}
          </div>
        )}
        {mensajeError && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-3 mb-4">
            {mensajeError}
          </div>
        )}

        {/* Si el usuario NO está logueado */}
        {!estaLogueado && (
          <div className="text-center">
            <p className="text-stone-400 mb-4">
              Debes iniciar sesión para inscribirte a este meeting.
            </p>
            <Link
              to="/login"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        )}

        {/* Si está logueado y el periodo de inscripción está abierto */}
        {estaLogueado && inscripcionAbierta && (
          <div>
            {/* Info del usuario que se va a inscribir */}
            <div className="bg-stone-900 rounded-lg p-4 mb-4">
              <p className="text-stone-400 text-sm mb-1">Nombre</p>
              <p className="text-white">{usuario?.name} {usuario?.lastname}</p>
              <p className="text-stone-400 text-sm mt-2 mb-1">DNI</p>
              <p className="text-white">{usuario?.dni}</p>
              <p className="text-stone-400 text-sm mt-2 mb-1">Email</p>
              <p className="text-white">{usuario?.email}</p>
            </div>

            {/* Botón de inscribirse / desinscribirse */}
            {!yaInscrito ? (
              <button
                onClick={handleInscribirse}
                disabled={inscribiendose}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {inscribiendose ? "Procesando..." : "Inscribirme"}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-3 text-center text-emerald-400 font-medium">
                  ✅ Ya estás inscrito a este meeting
                </div>
                <button
                  onClick={handleDesinscribirse}
                  disabled={inscribiendose}
                  className="w-full bg-stone-700 hover:bg-red-900 text-stone-300 hover:text-red-300 py-2 rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {inscribiendose ? "Procesando..." : "Cancelar inscripción"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Si el periodo de inscripción ha cerrado */}
        {estaLogueado && !inscripcionAbierta && (
          <div className="text-center">
            <span className="inline-block bg-stone-700 text-stone-400 px-4 py-2 rounded-lg">
              El periodo de inscripción está cerrado
            </span>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* COMENTARIOS Y VALORACIONES */}
      {/* (tabla comments con status = 'y', incluye images) */}
      {/* ================================================== */}
      {meeting?.comments?.length > 0 && (
        <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
          <h2 className="text-white text-xl font-bold mb-6">
            💬 Comentarios ({meeting.comments.length})
          </h2>

          <div className="space-y-4">
            {meeting.comments.map((comentario) => (
              <div key={comentario.id} className="border-b border-stone-700 pb-4 last:border-0 last:pb-0">
                {/* Cabecera del comentario */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {/* Avatar del usuario */}
                    <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center text-emerald-300 text-sm font-bold">
                      {comentario.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-stone-300 font-medium">
                      {comentario.user?.name} {comentario.user?.lastname}
                    </span>
                  </div>
                  {/* Score del comentario (1-5 estrellas) */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={n <= comentario.score ? "text-amber-400" : "text-stone-600"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Texto del comentario (campo 'comment') */}
                <p className="text-stone-300 text-sm leading-relaxed">{comentario.comment}</p>

                {/* Imágenes del comentario (tabla images, campo 'url') */}
                {comentario.images?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {comentario.images.map((img) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt="Foto del comentario"
                        className="h-20 w-20 object-cover rounded-lg border border-stone-600"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
