/** @type {import('tailwindcss').Config} */
// ============================================================
// tailwind.config.js
//
// Configuración de Tailwind CSS.
// En "content" le decimos a Tailwind qué archivos tiene que
// escanear para saber qué clases estamos usando.
// Así solo incluye en el CSS final las clases que usamos
// (y no todas las miles de clases que tiene Tailwind).
// ============================================================

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Todos los archivos de la carpeta src
  ],
  theme: {
    extend: {
      // Aquí podemos añadir colores, fuentes o tamaños personalizados
      // Por ahora usamos los colores de Tailwind por defecto (stone, emerald, amber...)
    },
  },
  plugins: [],
};
