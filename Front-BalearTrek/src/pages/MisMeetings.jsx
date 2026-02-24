// ============================================================
// src/pages/MisMeetings.jsx
//
// Página que muestra los meetings a los que se ha inscrito
// el usuario que está logueado.
// Solo accesible si estás logueado (protegida en App.jsx).
//
// Usa la tabla pivot 'meeting_user' para obtener las inscripciones.
// ============================================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { meetingsService } from "../services/services";
import Estrellas from "../components/ui/Estrellas";

export default function MisMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // Cargamos los meetings del usuario al entrar en la página
  // -------------------------------------------------------
  useEffect(() => {
    const cargarMisMeetings = async () => {
      try {
        // GET /api/user/meetings — el backend sabe quién somos por el token
        const res = await meetingsService.getMisMeetings();
        setMeetings(res.data.data ?? res.data);
      } catch (err) {
        console.error("Error al cargar mis meetings:", err);
        setError("No se pudieron cargar tus meetings.");
      } finally {
        setCargando(false);
      }
    };

    cargarMisMeetings();
  }, []);

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Mis Meetings</h1>
      <p className="text-stone-400 mb-8">Meetings en los que estás inscrito/a</p>

      {/* Estado de carga */}
      {cargando && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500"></div>
        </div>
      )}

      {/* Error */}
      {error && !cargando && (
        <div className="text-center py-20 bg-stone-800 rounded-xl border border-stone-700">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Sin meetings */}
      {!cargando && !error && meetings.length === 0 && (
        <div className="text-center py-20 bg-stone-800 rounded-xl border border-stone-700">
          <p className="text-stone-400 text-lg mb-4">No estás inscrito a ningún meeting todavía.</p>
          <Link
            to="/treks"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Explorar Treks
          </Link>
        </div>
      )}

      {/* Lista de meetings */}
      {!cargando && !error && meetings.length > 0 && (
        <div className="space-y-4">
          {meetings.map((meeting) => {
            // Comprobamos si el meeting ya ha pasado
            const haTerminado = new Date(meeting.day) < new Date();

            return (
              <div
                key={meeting.id}
                className="bg-stone-800 rounded-xl p-5 border border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  {/* Nombre del trek del meeting */}
                  <h3 className="text-white font-semibold text-lg">
                    {meeting.trek?.name}
                  </h3>

                  {/* Fecha del meeting */}
                  <p className="text-stone-400 text-sm mt-1">
                    📅 {new Date(meeting.day).toLocaleDateString("es-ES", {
                      weekday: "long", year: "numeric", month: "long", day: "numeric"
                    })}
                    {" · "}🕐 {meeting.time}
                  </p>

                  {/* Valoración si el meeting ya pasó */}
                  {haTerminado && (
                    <div className="mt-2">
                      <Estrellas
                        totalScore={meeting.totalScore}
                        countScore={meeting.countScore}
                        tamaño="sm"
                      />
                    </div>
                  )}

                  {/* Badge de estado */}
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
                    haTerminado
                      ? "bg-stone-700 text-stone-400"
                      : "bg-emerald-900 text-emerald-400"
                  }`}>
                    {haTerminado ? "Finalizado" : "Próximamente"}
                  </span>
                </div>

                {/* Botón ver detalle */}
                <Link
                  to={`/meetings/${meeting.id}`}
                  className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Ver información
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
