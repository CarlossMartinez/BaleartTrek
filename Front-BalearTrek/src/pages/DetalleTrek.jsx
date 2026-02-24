// ============================================================
// src/pages/DetalleTrek.jsx
//
// Página que muestra los detalles de un Trek concreto.
// Muestra:
//   - Nombre del trek, municipio, isla
//   - Sus Interesting Places (puntos de interés), ordenados por 'order'
//   - La lista de Meetings disponibles con paginación
// ============================================================

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { treksService, meetingsService } from "../services/services";
import Paginacion from "../components/ui/Paginacion";
import Estrellas from "../components/ui/Estrellas";

export default function DetalleTrek() {
  // useParams nos da el ID del trek de la URL (/treks/:id)
  const { id } = useParams();

  // Datos del trek
  const [trek, setTrek] = useState(null);

  // Lista de meetings de este trek
  const [meetings, setMeetings] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Estados de carga y error
  const [cargandoTrek, setCargandoTrek] = useState(true);
  const [cargandoMeetings, setCargandoMeetings] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // Cargar los datos del trek al montar el componente
  // -------------------------------------------------------
  useEffect(() => {
    const cargarTrek = async () => {
      try {
        const res = await treksService.getById(id);
        // El backend devuelve el trek con sus interesting_places cargadas
        // (relación many-to-many a través de interesting_place_trek, ordenadas por 'order')
        setTrek(res.data.data ?? res.data);
      } catch (err) {
        console.error("Error al cargar el trek:", err);
        setError("No se pudo cargar este trek.");
      } finally {
        setCargandoTrek(false);
      }
    };

    cargarTrek();
  }, [id]);

  // -------------------------------------------------------
  // Cargar los meetings cuando cambia la página
  // -------------------------------------------------------
  useEffect(() => {
    const cargarMeetings = async () => {
      setCargandoMeetings(true);
      try {
        const res = await meetingsService.getByTrek(id, { page: paginaActual });
        setMeetings(res.data.data ?? res.data);
        setTotalPaginas(res.data.last_page ?? 1);
      } catch (err) {
        console.error("Error al cargar meetings:", err);
      } finally {
        setCargandoMeetings(false);
      }
    };

    cargarMeetings();
  }, [id, paginaActual]);

  // -------------------------------------------------------
  // Estado de carga general
  // -------------------------------------------------------
  if (cargandoTrek) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">{error}</p>
        <Link to="/treks" className="text-emerald-400 hover:underline mt-4 block">
          ← Volver a Treks
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Breadcrumb de navegación */}
      <nav className="text-stone-500 text-sm mb-6">
        <Link to="/treks" className="hover:text-emerald-400 transition-colors">Treks</Link>
        <span className="mx-2">›</span>
        <span className="text-stone-300">{trek?.name}</span>
      </nav>

      {/* ================================================== */}
      {/* CABECERA DEL TREK */}
      {/* ================================================== */}
      <div className="bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 mb-8">
        {/* Imagen del trek */}
        <div className="h-64 bg-gradient-to-br from-emerald-900 to-stone-800 flex items-center justify-center">
          {trek?.imagen ? (
            <img src={trek.imagen} alt={trek.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl">🏔️</span>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-white text-3xl font-bold mb-2">{trek?.name}</h1>

          {/* Ubicación: municipio → zona → isla */}
          <p className="text-stone-400 mb-4 flex items-center gap-2">
            <span>📍</span>
            <span>
              {trek?.municipality?.name}
              {trek?.municipality?.zone?.name && ` · ${trek.municipality.zone.name}`}
              {trek?.municipality?.island?.name && ` · ${trek.municipality.island.name}`}
            </span>
          </p>

          {/* Número de registro (regNumber de la tabla treks) */}
          <p className="text-stone-500 text-xs">
            Nº de registro: {trek?.regNumber}
          </p>
        </div>
      </div>

      {/* ================================================== */}
      {/* PUNTOS DE INTERÉS DEL TREK */}
      {/* (tabla interesting_place_trek ordenada por 'order') */}
      {/* ================================================== */}
      {trek?.interesting_places?.length > 0 && (
        <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 mb-8">
          <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            <span>🗺️</span> Puntos de Interés
          </h2>
          <ol className="space-y-2">
            {trek.interesting_places.map((lugar, index) => (
              <li key={lugar.id} className="flex items-center gap-3 text-stone-300">
                {/* Número de orden */}
                <span className="w-7 h-7 bg-emerald-900 text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium">{lugar.name}</span>
                  {/* Tipo de lugar (playa, montaña, pueblo...) */}
                  {lugar.place_type?.name && (
                    <span className="text-stone-500 text-xs ml-2">
                      · {lugar.place_type.name}
                    </span>
                  )}
                  {/* Coordenadas GPS */}
                  {lugar.gps && (
                    <span className="text-stone-600 text-xs ml-2">📌 {lugar.gps}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ================================================== */}
      {/* MEETINGS DISPONIBLES */}
      {/* ================================================== */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-6">Meetings Disponibles</h2>

        {/* Cargando meetings */}
        {cargandoMeetings && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
          </div>
        )}

        {/* Sin meetings */}
        {!cargandoMeetings && meetings.length === 0 && (
          <div className="text-center py-12 bg-stone-800 rounded-xl border border-stone-700">
            <p className="text-stone-400">No hay meetings disponibles para este trek.</p>
          </div>
        )}

        {/* Lista de meetings */}
        {!cargandoMeetings && meetings.length > 0 && (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <TarjetaMeeting key={meeting.id} meeting={meeting} />
            ))}
          </div>
        )}

        {/* Paginación de meetings */}
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={setPaginaActual}
        />
      </div>
    </div>
  );
}

// ============================================================
// Componente interno: Tarjeta de un Meeting
// Lo ponemos aquí porque solo se usa en esta página
// ============================================================
function TarjetaMeeting({ meeting }) {
  // Calculamos si el periodo de inscripción está abierto
  const hoy = new Date();
  const fechaIni = new Date(meeting.appDateIni);
  const fechaFin = new Date(meeting.appDateEnd);
  const inscripcionAbierta = hoy >= fechaIni && hoy <= fechaFin;

  return (
    <div className="bg-stone-800 rounded-xl p-5 border border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        {/* Fecha del meeting (campo 'day' de la tabla meetings) */}
        <p className="text-white font-semibold text-lg">
          📅 {new Date(meeting.day).toLocaleDateString("es-ES", {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
          })}
        </p>

        {/* Hora de salida (campo 'time') */}
        <p className="text-stone-400 text-sm mt-1">🕐 {meeting.time}</p>

        {/* Badge de estado de inscripción */}
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
          inscripcionAbierta
            ? "bg-emerald-900 text-emerald-400"
            : "bg-stone-700 text-stone-400"
        }`}>
          {inscripcionAbierta ? "Inscripciones abiertas" : "Inscripciones cerradas"}
        </span>

        {/* Valoración (totalScore / countScore de meetings) */}
        <div className="mt-2">
          <Estrellas totalScore={meeting.totalScore} countScore={meeting.countScore} tamaño="sm" />
        </div>
      </div>

      {/* Botón para ver el detalle del meeting */}
      <Link
        to={`/meetings/${meeting.id}`}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap text-center"
      >
        Ver más
      </Link>
    </div>
  );
}
