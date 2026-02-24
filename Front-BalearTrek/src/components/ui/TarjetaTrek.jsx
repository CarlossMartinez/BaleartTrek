// ============================================================
// src/components/ui/TarjetaTrek.jsx
//
// Tarjeta que muestra la info básica de un trek.
// La usamos en la página de listado de Treks y en el Home.
//
// Props que recibe (del backend, tabla treks + relaciones):
//   - trek.id
//   - trek.name
//   - trek.regNumber
//   - trek.municipality.name  (relación con municipalities)
//   - trek.municipality.island.name  (relación anidada)
//   - trek.meetings_count  (número de meetings disponibles)
//   - trek.inscritos_count  (total de inscritos, calculado en backend)
//   - trek.imagen  (URL de la imagen, si la tienes)
//   - trek.totalScore / trek.countScore  (para las estrellas)
// ============================================================

import { Link } from "react-router-dom";
import Estrellas from "./Estrellas";

export default function TarjetaTrek({ trek }) {
  return (
    <div className="bg-stone-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all duration-300 border border-stone-700">

      {/* Imagen del trek */}
      <div className="h-48 bg-stone-700 relative overflow-hidden">
        {trek.imagen ? (
          <img
            src={trek.imagen}
            alt={trek.name}
            className="w-full h-full object-cover"
          />
        ) : (
          // Si no hay imagen, mostramos un placeholder con gradiente
          <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-stone-800 flex items-center justify-center">
            <span className="text-emerald-400 text-4xl">🏔️</span>
          </div>
        )}

        {/* Badge con la isla donde está el trek */}
        {trek.municipality?.island?.name && (
          <span className="absolute top-3 right-3 bg-stone-900/80 text-emerald-400 text-xs font-medium px-2 py-1 rounded-full">
            {trek.municipality.island.name}
          </span>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Nombre del trek */}
        <h3 className="text-white font-bold text-lg mb-1 truncate">{trek.name}</h3>

        {/* Municipio */}
        {trek.municipality?.name && (
          <p className="text-stone-400 text-sm mb-3 flex items-center gap-1">
            <span>📍</span>
            {trek.municipality.name}
          </p>
        )}

        {/* Estrellas de valoración */}
        {/* Calculadas a partir de los meetings de este trek */}
        <div className="mb-3">
          <Estrellas
            totalScore={trek.totalScore ?? 0}
            countScore={trek.countScore ?? 0}
          />
        </div>

        {/* Info de inscritos */}
        <p className="text-stone-400 text-sm mb-4">
          <span className="text-emerald-400 font-semibold">{trek.inscritos_count ?? 0}</span>
          {" "}inscritos
        </p>

        {/* Botón para ver más detalles */}
        <Link
          to={`/treks/${trek.id}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
