// ============================================================
// src/components/ui/Estrellas.jsx
//
// Componente reutilizable para mostrar la valoración con estrellas.
// Lo usamos en las tarjetas de treks/meetings.
//
// El rating lo calculamos dividiendo totalScore / countScore
// de la tabla meetings.
//
// Props:
//   - totalScore: suma de todos los scores (número)
//   - countScore: cantidad de comentarios valorados (número)
//   - tamaño: "sm" | "md" | "lg" (opcional, por defecto "md")
// ============================================================

export default function Estrellas({ totalScore = 0, countScore = 0, tamaño = "md" }) {
  // Calculamos la media. Si no hay comentarios, la media es 0
  const media = countScore > 0 ? totalScore / countScore : 0;

  // Redondeamos a medio punto para mostrar estrellas más precisas
  const mediaRedondeada = Math.round(media * 2) / 2;

  // Tamaños de las estrellas según el prop "tamaño"
  const clasesTamaño = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className="flex items-center gap-1">
      {/* Generamos 5 estrellas */}
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span
          key={estrella}
          className={`${clasesTamaño[tamaño]} ${
            estrella <= mediaRedondeada
              ? "text-amber-400" // Estrella llena → amarilla
              : "text-stone-600"  // Estrella vacía → gris
          }`}
        >
          ★
        </span>
      ))}

      {/* Mostramos el número de valoraciones si hay alguna */}
      {countScore > 0 && (
        <span className="text-stone-400 text-xs ml-1">
          ({media.toFixed(1)})
        </span>
      )}
    </div>
  );
}
