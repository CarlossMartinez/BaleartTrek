// ============================================================
// src/main.jsx
//
// Punto de entrada de la aplicación React.
// Aquí "montamos" la app en el div#root del index.html
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importamos los estilos de Tailwind CSS
import "./index.css";

import App from "./App.jsx";

// Buscamos el div con id="root" en el index.html y montamos la app ahí
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
