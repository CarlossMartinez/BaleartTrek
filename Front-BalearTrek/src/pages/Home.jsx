// ============================================================
// src/pages/Home.jsx
//
// Página principal de BalearTrek.
// Tiene un carrusel automático con los treks destacados.
// Sin controles manuales, solo pasa solo (autoplay).
// ============================================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { treksService } from "../services/services";

export default function Home() {
  // Estado para guardar los treks destacados que vengan del backend
  const [treksDestacados, setTreksDestacados] = useState([]);

  // Estado para saber qué slide del carrusel estamos viendo ahora
  const [slideActual, setSlideActual] = useState(0);

  // Estado de carga y error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------------------------------
  // Cargar los treks destacados al montar el componente
  // -------------------------------------------------------
  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const res = await treksService.getDestacados();
        // El backend devuelve: { data: [...treks] }
        setTreksDestacados(res.data.data ?? res.data);
      } catch (err) {
        console.error("Error al cargar treks destacados:", err);
        setError("No se pudieron cargar los treks destacados.");
      } finally {
        setCargando(false);
      }
    };

    cargarDestacados();
  }, []); // [] = solo se ejecuta una vez al montar el componente

  // -------------------------------------------------------
  // Autoplay del carrusel: cambia de slide cada 4 segundos
  // -------------------------------------------------------
  useEffect(() => {
    // Si no hay treks, no arrancamos el carrusel
    if (treksDestacados.length === 0) return;

    const intervalo = setInterval(() => {
      // Pasamos al siguiente slide, y si llegamos al final volvemos al primero
      setSlideActual((anterior) =>
        anterior === treksDestacados.length - 1 ? 0 : anterior + 1
      );
    }, 4000); // 4000ms = 4 segundos

    // Limpiamos el intervalo cuando el componente se desmonte
    // (para evitar memory leaks)
    return () => clearInterval(intervalo);
  }, [treksDestacados.length]);

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div className="bg-stone-950 text-white">

      {/* ================================================== */}
      {/* SECCIÓN HERO — Carrusel de treks destacados */}
      {/* ================================================== */}
      <section className="relative h-[70vh] min-h-[400px] overflow-hidden">

        {/* Estado de carga */}
        {cargando && (
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <p className="text-stone-400">{error}</p>
          </div>
        )}

        {/* Los slides del carrusel */}
        {!cargando && treksDestacados.map((trek, index) => (
          <div
            key={trek.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === slideActual ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Imagen de fondo del trek */}
            <div
              className="w-full h-full bg-cover bg-center bg-stone-800"
              style={{
                backgroundImage: trek.imagen ? `url(${trek.imagen})` : undefined,
              }}
            >
              {/* Overlay oscuro para que el texto se lea bien */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
            </div>

            {/* Texto encima de la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-2">
                Trek Destacado
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {trek.name}
              </h1>
              {trek.municipality?.name && (
                <p className="text-stone-300 text-lg mb-6">
                  📍 {trek.municipality.name}, {trek.municipality.island?.name}
                </p>
              )}
              <Link
                to={`/treks/${trek.id}`}
                className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Ver este Trek →
              </Link>
            </div>
          </div>
        ))}

        {/* Indicadores de posición del carrusel (puntitos) */}
        {treksDestacados.length > 1 && (
          <div className="absolute bottom-4 right-8 flex gap-2">
            {treksDestacados.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === slideActual
                    ? "bg-emerald-400 w-6"  // Punto activo → más ancho
                    : "bg-stone-500 w-1.5"  // Punto inactivo → redondo
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* SECCIÓN CTA — Llamada a la acción */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explora las Baleares como nunca antes
        </h2>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto mb-8">
          Únete a nuestra comunidad de trekkers y descubre rutas increíbles
          por Mallorca, Menorca, Ibiza y Formentera.
        </p>
        <Link
          to="/treks"
          className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200"
        >
          Ver todos los Treks
        </Link>
      </section>
    </div>
  );
}
