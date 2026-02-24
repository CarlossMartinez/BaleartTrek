// ============================================================
// vite.config.js
//
// Configuración del servidor de desarrollo Vite.
// Vite es la herramienta que usamos para desarrollar y
// compilar el proyecto React.
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Plugin para que Vite entienda JSX y React

  server: {
    port: 3000, // El proyecto se abre en http://localhost:3000

    // Proxy para que las peticiones a /api las mande a Laravel
    // Así evitamos problemas de CORS en desarrollo
    proxy: {
      "/api": {
        target: "http://baleartrek.test", // Cambia esto si tu Laravel está en otro puerto
        changeOrigin: true,
      },
    },
  },
});
