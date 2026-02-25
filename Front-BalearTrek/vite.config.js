// configuración de vite
// esto hace que react funcione y que se abra en puerto 3000
// también hay un proxy para que las peticiones a /api vayan a laravel

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // para que entienda jsx

  server: {
    port: 3000,

    // si pido a /api manda a laravel
    // así evito problemas de CORS
    proxy: {
      "/api": {
        target: "http://baleartrek.test", 
        changeOrigin: true,
      },
    },
  },
});
