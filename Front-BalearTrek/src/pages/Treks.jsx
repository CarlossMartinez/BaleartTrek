import { useState, useEffect } from "react";
import { treksService } from "../services/services";
import TarjetaTrek from "../components/ui/TarjetaTrek";
import Paginacion from "../components/ui/Paginacion";

export default function Treks() {
  // los treks que saco del back
  const [treks, setTreks] = useState([]);
  // las opciones para filtrar (islas y zonas)
  const [islas, setIslas] = useState([]);
  const [zonas, setZonas] = useState([]);
  // filtros  seleccionados
  const [filtros, setFiltros] = useState({
    island_id: "",  // vacio = todas las islas
    zone_id: "",    // vacio = todas las zonas
    orderBy: "",    // "popular" = ordenar por inscritos
  });

  // Página actual de la paginación
  const [paginaActual, setPaginaActual] = useState(1);

  // Total de páginas me lo da laravel
  const [totalPaginas, setTotalPaginas] = useState(1);
  // para el spinner de carga
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // cargo las islas y zonas para los desplegables
  useEffect(() => {
    const cargarFiltros = async () => {
      try {
        // hago las dos peticiones a la vez, para esto el promise.all 
        // si no se cumplen ambas no no hago nada
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

  // cargo los treks cuando cambio filtros o página
  useEffect(() => {
    const cargarTreks = async () => {
      setCargando(true);
      setError(null);

      try {
        // filtramos
        const params = { page: paginaActual };
        if (filtros.island_id) params.island_id = filtros.island_id;
        if (filtros.zone_id) params.zone_id = filtros.zone_id;  
        if (filtros.orderBy) params.orderBy = filtros.orderBy;

        const res = await treksService.getAll(params);
        // el back devuelve data y los objetos, por eso es data.data
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
  }, [filtros, paginaActual]); // cuando cambie algo cargo todo

  // para cambiar los filtros
  const handleFiltro = (nombre, valor) => {
    setFiltros((anterior) => ({ ...anterior, [nombre]: valor }));
    setPaginaActual(1); // vuelvo a pagina 1 siempre
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* titulo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Treks</h1>
        <p className="text-stone-400">Descubre todas nuestras rutas disponibles</p>
      </div>

      {/* flitros */}
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

        {/* Filtro de orden */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-stone-400 text-sm font-medium">Ordenar por</label>
          <select
            value={filtros.orderBy}
            onChange={(e) => handleFiltro("orderBy", e.target.value)}
            className="bg-stone-900 text-white border border-stone-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Por defecto</option>
            {/* ordena por inscritos */}
            <option value="popular">Más populares</option>
          </select>
        </div>

        {/* borra todos los filtros */}
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

      {/* la lista de treks */}
      {/* cargando spinner */}
      {cargando && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
        </div>
      )}

      {/* si hay error */}
      {error && !cargando && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => setFiltros({ ...filtros })} // recargo 
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Si no devuelve nada */}
      {!cargando && !error && treks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-400 text-lg">No se encontraron treks con esos filtros.</p>
        </div>
      )}

      {/* Grid de treks */}
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
