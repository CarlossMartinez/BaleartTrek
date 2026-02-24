// ============================================================
// src/pages/Treks.jsx
//
// Página con el listado de todos los treks disponibles.
// Tiene filtros por:
//   - island_id (isla)
//   - zone_id (zona)
//   - orderBy (popular = ordenar por más inscritos)
// Y paginación.
// ============================================================

import { useState, useEffect } from "react";
import { treksService } from "../services/services";
import TarjetaTrek from "../components/ui/TarjetaTrek";
import Paginacion from "../components/ui/Paginacion";

export default function Treks() {
  // Lista de treks que nos devuelve el backend
  const [treks, setTreks] = useState([]);

  // Listas para los dropdowns de filtros
  const [islas, setIslas] = useState([]);
  const [zonas, setZonas] = useState([]);

  // Estado de los filtros seleccionados
  const [filtros, setFiltros] = useState({
    island_id: "",  // ID de la isla seleccionada (vacío = todas)
    zone_id: "",    // ID de la zona seleccionada (vacío = todas)
    orderBy: "",    // "popular" para ordenar por inscritos
  });

  // Página actual de la paginación
  const [paginaActual, setPaginaActual] = useState(1);

  // Total de páginas (lo devuelve Laravel en la respuesta)
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Estados de carga y error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // Cargar las opciones de los filtros (islas y zonas)
  // Solo se hace una vez al montar el componente
  // -------------------------------------------------------
  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        // Hacemos las dos peticiones al mismo tiempo con Promise.all
        const [resIslas, resZonas] = await Promise.all([
          treksService.getIslands(),
          treksService.getZones(),
        ]);
        setIslas(resIslas.data.data ?? resIslas.data);
        setZonas(resZonas.data.data ?? resZonas.data);
      } catch (err) {
        console.error("Error al cargar filtros:", err);
      }
    };

    cargarFiltros();
  }, []);

  // -------------------------------------------------------
  // Cargar los treks cuando cambian los filtros o la página
  // -------------------------------------------------------
  useEffect(() => {
    const cargarTreks = async () => {
      setCargando(true);
      setError(null);

      try {
        // Construimos los parámetros de la petición
        // Solo enviamos los filtros que tienen valor (no los vacíos)
        const params = { page: paginaActual };
        if (filtros.island_id) params.island_id = filtros.island_id;
        if (filtros.zone_id) params.zone_id = filtros.zone_id;
        if (filtros.orderBy) params.orderBy = filtros.orderBy;

        const res = await treksService.getAll(params);

        // Laravel devuelve los datos paginados así:
        // { data: [...treks], current_page: 1, last_page: 5, total: 50 }
        setTreks(res.data.data ?? res.data);
        setTotalPaginas(res.data.last_page ?? 1);
      } catch (err) {
        console.error("Error al cargar treks:", err);
        setError("No se pudieron cargar los treks. Inténtalo de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    cargarTreks();
  }, [filtros, paginaActual]); // Se ejecuta cuando cambian los filtros o la página

  // -------------------------------------------------------
  // Función para manejar el cambio de filtros
  // Cuando se cambia un filtro, volvemos a la página 1
  // -------------------------------------------------------
  const handleFiltro = (nombre, valor) => {
    setFiltros((anterior) => ({ ...anterior, [nombre]: valor }));
    setPaginaActual(1); // Volvemos al inicio al filtrar
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Título de la página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Treks</h1>
        <p className="text-stone-400">Descubre todas nuestras rutas disponibles</p>
      </div>

      {/* FILTROS */}
      <div className="bg-stone-800 rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-end border border-stone-700">

        {/* Filtro por isla */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-stone-400 text-sm font-medium">Isla</label>
          <select
            value={filtros.island_id}
            onChange={(e) => handleFiltro("island_id", e.target.value)}
            className="bg-stone-900 text-white border border-stone-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Todas las islas</option>
            {islas.map((isla) => (
              <option key={isla.id} value={isla.id}>
                {isla.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por zona */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-stone-400 text-sm font-medium">Zona</label>
          <select
            value={filtros.zone_id}
            onChange={(e) => handleFiltro("zone_id", e.target.value)}
            className="bg-stone-900 text-white border border-stone-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Todas las zonas</option>
            {zonas.map((zona) => (
              <option key={zona.id} value={zona.id}>
                {zona.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de ordenación */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-stone-400 text-sm font-medium">Ordenar por</label>
          <select
            value={filtros.orderBy}
            onChange={(e) => handleFiltro("orderBy", e.target.value)}
            className="bg-stone-900 text-white border border-stone-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Por defecto</option>
            {/* "popular" → el backend ordena por número de inscritos */}
            <option value="popular">Más populares</option>
          </select>
        </div>

        {/* Botón para limpiar todos los filtros */}
        {(filtros.island_id || filtros.zone_id || filtros.orderBy) && (
          <button
            onClick={() => {
              setFiltros({ island_id: "", zone_id: "", orderBy: "" });
              setPaginaActual(1);
            }}
            className="text-stone-400 hover:text-white text-sm underline transition-colors self-end pb-2"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* ================================================== */}
      {/* LISTADO DE TREKS */}
      {/* ================================================== */}

      {/* Estado de carga */}
      {cargando && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
        </div>
      )}

      {/* Estado de error */}
      {error && !cargando && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => setFiltros({ ...filtros })} // Forzamos recarga
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Sin resultados */}
      {!cargando && !error && treks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-400 text-lg">No se encontraron treks con esos filtros.</p>
        </div>
      )}

      {/* Grid de tarjetas de treks */}
      {!cargando && !error && treks.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treks.map((trek) => (
              <TarjetaTrek key={trek.id} trek={trek} />
            ))}
          </div>

          {/* Paginación */}
          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={setPaginaActual}
          />
        </>
      )}
    </div>
  );
}
