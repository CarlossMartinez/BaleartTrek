// ============================================================
// src/pages/FAQ.jsx
//
// Página de Preguntas Frecuentes (Frequently Asked Questions).
// Las preguntas se muestran en un acordeón: al hacer click
// en una pregunta, se despliega la respuesta.
// ============================================================

import { useState } from "react";

// Lista de preguntas y respuestas
// Cuando tengas el backend listo, podrías cargar esto desde una API
// pero por ahora lo dejamos estático aquí en el frontend
const PREGUNTAS = [
  {
    id: 1,
    pregunta: "¿Cómo me inscribo a un trek?",
    respuesta:
      "Primero tienes que crear una cuenta o iniciar sesión. Después, entra en el trek que te interese, elige el meeting (fecha de salida) y haz click en 'Inscribirme'. Las inscripciones solo están disponibles durante el período indicado (fecha de inicio y fin de inscripciones).",
  },
  {
    id: 2,
    pregunta: "¿Puedo cancelar mi inscripción?",
    respuesta:
      "Sí, puedes cancelarla desde la página del meeting o desde 'Mis Meetings' en tu perfil. Recuerda que solo puedes cancelar mientras el período de inscripciones esté abierto.",
  },
  {
    id: 3,
    pregunta: "¿Qué nivel de condición física necesito?",
    respuesta:
      "Cada trek tiene su propia dificultad. En la ficha de cada trek puedes ver información sobre el nivel requerido, la distancia y el desnivel acumulado. Si tienes dudas, contáctanos y te asesoraremos.",
  },
  {
    id: 4,
    pregunta: "¿Cómo puedo dejar una valoración?",
    respuesta:
      "Una vez hayas completado un meeting, podrás dejar tu comentario y puntuación (de 1 a 5 estrellas) desde la página del meeting. Los comentarios son revisados por nuestro equipo antes de publicarse.",
  },
  {
    id: 5,
    pregunta: "¿Puedo cambiar mis datos personales?",
    respuesta:
      "Sí. Entra en 'Mi Perfil' y haz click en 'Editar'. Puedes cambiar tu nombre, apellido y teléfono. El DNI y el email no se pueden modificar por razones de seguridad. Si necesitas cambiarlo, contacta con nosotros.",
  },
];

export default function FAQ() {
  // Guardamos el ID de la pregunta abierta (null = ninguna)
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  // Abrimos/cerramos la pregunta al hacer click
  const togglePregunta = (id) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Cabecera */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">FAQ</h1>
        <p className="text-stone-400">Preguntas frecuentes sobre BalearTrek</p>
      </div>

      {/* Acordeón de preguntas */}
      <div className="space-y-3">
        {PREGUNTAS.map((item) => (
          <div
            key={item.id}
            className="bg-stone-800 rounded-xl border border-stone-700 overflow-hidden"
          >
            {/* Cabecera de la pregunta (clicable) */}
            <button
              onClick={() => togglePregunta(item.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-750 transition-colors"
            >
              <span className="text-white font-medium pr-4">{item.pregunta}</span>
              {/* Flecha que rota cuando la pregunta está abierta */}
              <svg
                className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-200 ${
                  preguntaAbierta === item.id ? "rotate-180" : ""
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Respuesta (se muestra/oculta con el acordeón) */}
            {preguntaAbierta === item.id && (
              <div className="px-5 pb-5 border-t border-stone-700">
                <p className="text-stone-300 leading-relaxed pt-4">{item.respuesta}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sección de contacto al final */}
      <div className="mt-10 text-center bg-stone-800 rounded-xl border border-stone-700 p-6">
        <p className="text-stone-400 mb-3">¿No encuentras lo que buscas?</p>
        <a
          href="mailto:baleartrek@baleartrek.com"
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          Escríbenos a baleartrek@baleartrek.com
        </a>
      </div>
    </div>
  );
}
