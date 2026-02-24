// ============================================================
// src/pages/AboutUs.jsx
//
// Página "Sobre nosotros" con info de la empresa,
// número de personas registradas y datos de contacto.
// ============================================================

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Cabecera */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Sobre Nosotros</h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Somos un grupo de apasionados del senderismo y la naturaleza de las Islas Baleares.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

        {/* Imagen / ilustración */}
        <div className="bg-gradient-to-br from-emerald-900 to-stone-800 rounded-2xl h-64 flex items-center justify-center border border-emerald-800">
          <span className="text-6xl">🏝️</span>
        </div>

        {/* Texto descriptivo */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white text-2xl font-bold mb-4">¿Quiénes somos?</h2>
          <p className="text-stone-400 leading-relaxed mb-4">
            BalearTrek nació con la misión de conectar a personas que aman la naturaleza
            y el senderismo. Organizamos excursiones guiadas por los parajes más bonitos
            de Mallorca, Menorca, Ibiza y Formentera.
          </p>
          <p className="text-stone-400 leading-relaxed">
            Cada trek está diseñado para que puedas disfrutar del paisaje, conocer gente
            nueva y descubrir rincones que no encontrarás en ninguna guía turística.
          </p>
        </div>
      </div>

      {/* Datos de contacto */}
      <div className="bg-stone-800 rounded-2xl border border-stone-700 p-8">
        <h2 className="text-white text-xl font-bold mb-6 text-center">
          Contacta con nosotros mediante:
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <a
            href="mailto:baleartrek@baleartrek.com"
            className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="text-2xl">✉️</span>
            <span>baleartrek@baleartrek.com</span>
          </a>
          <a
            href="tel:+34123456789"
            className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <span>+34 123 45 67 89</span>
          </a>
        </div>
      </div>
    </div>
  );
}
