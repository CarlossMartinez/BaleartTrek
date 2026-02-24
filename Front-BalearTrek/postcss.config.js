// ============================================================
// postcss.config.js
//
// PostCSS procesa el CSS y le pasa los plugins.
// Tailwind CSS lo necesita para funcionar.
// ============================================================

export default {
  plugins: {
    tailwindcss: {},   // Plugin de Tailwind
    autoprefixer: {},  // Añade prefijos de navegador automáticamente (webkit, moz...)
  },
};
