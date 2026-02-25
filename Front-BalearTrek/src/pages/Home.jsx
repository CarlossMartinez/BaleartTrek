import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { treksService } from "../services/services";

export default function Home() {
  // aquí guardo los treks que me devuelve el back
  const [treksDestacados, setTreksDestacados] = useState([]);
  const [slideActual, setSlideActual] = useState(0);
  // para saber si está cargando o si no
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  //cargo los destacados del back
  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        const res = await treksService.getDestacados();

        // Mi back me devuelve en los json  data: [...treks] 
        setTreksDestacados(res.data.data ?? res.data);
        

      } catch (err) {
        console.error("Error al cargar treks destacados:", err);
        setError("No se pudieron cargar los treks destacados.");
      } finally {
        setCargando(false);
      }
    };

    cargarDestacados();
  }, []); 

  // autoplay del carrusel cada 4 segundos
  useEffect(() => {
    // Si no hay treks, no hago nada
    if (treksDestacados.length === 0) return;

    const intervalo = setInterval(() => {
      // cambio al siguiente o vuelvo al primero si estoy en el último
      setSlideActual((anterior) =>
        anterior === treksDestacados.length - 1 ? 0 : anterior + 1
      );
    }, 4000); // cada 4 segundos
    return () => clearInterval(intervalo);
  }, [treksDestacados.length]);


  return (
    <div className="bg-stone-950 text-white">

      {/* Carousel */}
      <section className="relative h-[70vh] min-h-[400px] overflow-hidden">

        {/* Sopinner tipico que hemos hecho en clase solo que verde para que quede con la paleta de colores */}
        {cargando && (
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
          </div>
        )}

        {/* si hay error */}
        {error && (
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <p className="text-stone-400">{error}</p>
          </div>
        )}

        {/* cada slide es un trek */}
        {!cargando && treksDestacados.map((trek, index) => (
          <div
            key={trek.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === slideActual ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* la imágene de fondo (si tuviese) */}
            <div
              className="w-full h-full bg-cover bg-center bg-stone-800"
              style={{
                backgroundImage: `url(/public/assets/istockphoto-960868048-612x612.jpg)`,
              }}
            >
              {/* oscurecer para que se vea el texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
            </div>

            {/* el contenido encima */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-2">
                Trek Destacado
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {trek.name}
              </h1>
              <p className="text-stone-300 text-lg mb-6">
                {trek.municipality.name}, {trek.municipality.island?.name}
              </p>
              <Link
                to={`/treks/${trek.id}`}
                className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Ver este Trek →
              </Link>
            </div>
          </div>
        ))}

        {/*los puntitos del sldie*/}
        {treksDestacados.length > 1 && (
          <div className="absolute bottom-4 right-8 flex gap-2">
            {treksDestacados.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === slideActual
                    ? "bg-emerald-400 w-6"  // el activo es más ancho
                    : "bg-stone-500 w-1.5"  // los otros más pequeñitos
                }`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explora las Baleares como nunca antes
        </h2>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto mb-8">
          Únete a nosotros y descubre rutas increíbles
          por Mallorca
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
