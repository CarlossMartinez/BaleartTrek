
import { useState } from "react";

// he hecho yo lo que seria un JSON para no tener que escribir a mano tanto DIV
const preg = [
   {
    id: 1,
    pregunta: "¿Cuándo se abren y cierran las inscripciones?",
    respuesta: "Las inscripciones a un meeting se abren 1 mes antes de la fecha de salida y se cierran 1 semana antes. Por ejemplo, si el meeting es el 15 de marzo, las inscripciones estarán disponibles desde el 15 de febrero hasta el 8 de marzo. Pasada esa fecha no se puede inscribir ni cancelar la inscripción.",
    importante: true,
  },
  {
    id: 2,
    pregunta: "¿Qué significa la puntuación de 0 a 5?",
    respuesta: "La puntuación refleja la valoración de los usuarios que han participado en el meeting:\n⭐ 1 — Muy malo\n⭐⭐ 2 — Malo\n⭐⭐⭐ 3 — Regular\n⭐⭐⭐⭐ 4 — Bueno\n⭐⭐⭐⭐⭐ 5 — Excelente\n\nLa puntuación media que ves en cada trek se calcula a partir de todos los comentarios validados de sus meetings.",
    importante: true,
  },
  {
    id: 3,
    pregunta: "¿Cómo me inscribo a un trek?",
    respuesta:
      "Primero tienes que crear una cuenta o iniciar sesión. Después, entra en el trek que te interese, elige el meeting (fecha de salida) y haz click en 'Inscribirme'. Las inscripciones solo están disponibles durante el período indicado (fecha de inicio y fin de inscripciones).",
  },
  {
    id: 4,
    pregunta: "¿Puedo cancelar mi inscripción?",
    respuesta:
      "Sí, puedes cancelarla desde la página del meeting o desde 'Mis Meetings' en tu perfil. Recuerda que solo puedes cancelar mientras el período de inscripciones esté abierto.",
  },
  {
    id: 5,
    pregunta: "¿Qué nivel de condición física necesito?",
    respuesta:
      "Cada trek tiene su propia dificultad. En la ficha de cada trek puedes ver información sobre el nivel requerido, la distancia y el desnivel acumulado. Si tienes dudas, contáctanos y te asesoraremos.",
  },
  {
    id: 6,
    pregunta: "¿Cómo puedo dejar una valoración?",
    respuesta:
      "Una vez hayas completado un meeting, podrás dejar tu comentario y puntuación (de 1 a 5 estrellas) desde la página del meeting. Los comentarios son revisados por nuestro equipo antes de publicarse.",
  },
  {
    id: 7,
    pregunta: "¿Puedo cambiar mis datos personales?",
    respuesta:
      "Sí. Entra en 'Mi Perfil' y haz click en 'Editar'. Puedes cambiar tu nombre, apellido y teléfono. El DNI y el email no se pueden modificar por razones de seguridad. Si necesitas cambiarlo, contacta con nosotros.",
  },
];

export default function FAQ() {
  // Guardo el ID de la pregunta abierta (null = ninguna)
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  // abro o cierro la pregunta
  const togglePregunta = (id) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">FAQ</h1>
        <p className="text-stone-400">preg frecuentes sobre BalearTrek</p>
      </div>

      <div className="space-y-3">
        {preg.map((item) => (
          <div
            key={item.id}
            className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden"
          >
            {/* la pregunta (clickeable) */}
            <button
              onClick={() => togglePregunta(item.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-750 transition-colors"
            >
              <span className="text-white font-medium pr-4">{item.pregunta}</span>
              {/* Flecha que rota cuando la pregunta está abierta */}
              <svg
                className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-200`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* la respuesta que se muestra/oculta */}
            {preguntaAbierta === item.id && (
              <div className="px-5 pb-5 border-t border-stone-700">
                <p className="text-stone-300 leading-relaxed pt-4">{item.respuesta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
