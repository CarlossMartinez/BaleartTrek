// ============================================================
// src/components/ui/Paginacion.jsx
//
// Componente de paginación reutilizable.
// Lo usamos en la lista de Treks y en el detalle del Trek
// para paginar los meetings.
//
// Laravel devuelve la paginación así:
// {
//   data: [...],
//   current_page: 1,
//   last_page: 6,
//   total: 60
// }
//
// Props:
//   - paginaActual: número de página actual
//   - totalPaginas: número total de páginas (last_page de Laravel)
//   - onCambiarPagina: función que se llama cuando se hace click en una página
// ============================================================

export default function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  // Si solo hay una página, no mostramos la paginación
  if (totalPaginas <= 1) return null;

  // Generamos el array de páginas a mostrar
  // Mostramos siempre la primera, la última, la actual y sus vecinas
  const generarPaginas = () => {
    const paginas = [];

    // Siempre añadimos la primera página
    paginas.push(1);

    // Si la página actual no está cerca del inicio, añadimos "..."
    if (paginaActual > 3) {
      paginas.push("...");
    }

    // Páginas alrededor de la actual
    for (let i = Math.max(2, paginaActual - 1); i <= Math.min(totalPaginas - 1, paginaActual + 1); i++) {
      paginas.push(i);
    }

    // Si la página actual no está cerca del final, añadimos "..."
    if (paginaActual < totalPaginas - 2) {
      paginas.push("...");
    }

    // Siempre añadimos la última página (si hay más de una)
    if (totalPaginas > 1) {
      paginas.push(totalPaginas);
    }

    return paginas;
  };

  const paginas = generarPaginas();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Botón "Anterior" */}
      <button
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-3 py-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ←
      </button>

      {/* Números de página */}
      {paginas.map((pagina, index) =>
        pagina === "..." ? (
          // Puntos suspensivos (no son clicables)
          <span key={`dots-${index}`} className="text-stone-500 px-2">
            ...
          </span>
        ) : (
          // Número de página clicable
          <button
            key={pagina}
            onClick={() => onCambiarPagina(pagina)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              pagina === paginaActual
                ? "bg-emerald-600 text-white" // Página activa → verde
                : "bg-stone-800 text-stone-300 hover:bg-stone-700" // Resto → gris
            }`}
          >
            {pagina}
          </button>
        )
      )}

      {/* Botón "Siguiente" */}
      <button
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
    </div>
  );
}
