import axios from "axios";

const API_URL = "http://baleartrek.test/api"; //Aquó esta la url de la api

// Creo la instancia de axios par no tener q repetirla
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json", // Le decimos que mandamos datos en JSON
    Accept: "application/json",         // Le decimos que queremos recibir JSON
  },
});

// -------------------------------------------------------
// INTERCEPTOR DE REQUEST (antes de mandar la petición)
// -------------------------------------------------------
// Cada vez que vamos a mandar una petición al servidor,
// este código se ejecuta primero. Si el usuario está logueado,
// añadimos su token al header "Authorization".
// Laravel Sanctum lo usa para saber quién somos.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Buscamos el token guardado al hacer login

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Así lo espera Laravel Sanctum
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------------------------------------
// INTERCEPTOR DE RESPONSE (cuando recibimos la respuesta)
// -------------------------------------------------------
// Si el servidor nos devuelve 401 (no autenticado),
// borramos el token y mandamos al usuario al login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
