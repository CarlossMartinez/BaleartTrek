// ============================================================
// src/services/services.js
//
// Aquí están todas las funciones que hacen peticiones a la API.
// Las organizamos por "recurso" (treks, meetings, usuarios...).
// Así cuando necesitamos hacer un fetch, sabemos exactamente
// dónde buscarlo.
//
// CAMPOS DE LA BASE DE DATOS (para recordar):
// - users:          id, name, lastname, dni, email, phone, password, role_id
// - treks:          id, regNumber, name, status, municipality_id
// - meetings:       id, user_id, trek_id, day, time, totalScore, countScore, appDateIni, appDateEnd
// - meeting_user:   id, meeting_id, user_id  (tabla pivot de inscripciones)
// - interesting_places: id, name, gps, place_type_id
// - comments:       id, comment, score, status, user_id, meeting_id
// - images:         id, url, comment_id
// - municipalities: id, name, island_id, zone_id
// - islands:        id, name
// - zones:          id, name
// ============================================================

import api from "./api";

// ============================================================
// AUTENTICACIÓN
// ============================================================
export const authService = {
  // POST /api/login
  // Le mandamos email y password, el servidor nos devuelve el token
  login: (credentials) => api.post("/login", credentials),

  // POST /api/register
  // Mandamos los datos del nuevo usuario (name, lastname, dni, email, phone, password)
  register: (userData) => api.post("/register", userData),

  // POST /api/logout
  // Le decimos al servidor que borre nuestro token
  logout: () => api.post("/logout"),

  // GET /api/user
  // Obtenemos los datos del usuario que está logueado ahora mismo
  getMe: () => api.get("/user"),

  // PUT /api/user
  // Actualizamos los datos del perfil (name, lastname, phone...)
  updateProfile: (userData) => api.put("/user", userData),

  // PUT /api/user/password
  // Cambiamos la contraseña (hay que mandar la contraseña actual por seguridad)
  updatePassword: (data) => api.put("/user/password", data),
};

// ============================================================
// TREKS
// ============================================================
export const treksService = {
  // GET /api/treks
  // Obtiene todos los treks activos (status = 'y').
  // Podemos pasarle parámetros de filtro: ?island_id=1&zone_id=2&orderBy=popular
  getAll: (params) => api.get("/treks", { params }),

  // GET /api/treks/destacados
  // Obtiene los treks destacados para el carrusel del Home
  getDestacados: () => api.get("/treks/destacados"),

  // GET /api/treks/:id
  // Obtiene un trek concreto con sus interesting_places (ordenados por 'order')
  // y sus meetings disponibles
  getById: (id) => api.get(`/treks/${id}`),

  // GET /api/islands
  // Lista de islas para el filtro desplegable (Mallorca, Menorca, Ibiza...)
  getIslands: () => api.get("/islands"),

  // GET /api/zones
  // Lista de zonas para el filtro desplegable (Serra de Tramuntana...)
  getZones: () => api.get("/zones"),
};

// ============================================================
// MEETINGS (salidas/quedadas de cada trek)
// ============================================================
export const meetingsService = {
  // GET /api/treks/:trekId/meetings
  // Obtiene todos los meetings de un trek concreto
  // Con paginación: ?page=1
  getByTrek: (trekId, params) => api.get(`/treks/${trekId}/meetings`, { params }),

  // GET /api/meetings/:id
  // Obtiene un meeting concreto con:
  //   - sus interesting_places
  //   - el número de inscritos (meeting_user)
  //   - sus comentarios aprobados (status = 'y') con imágenes
  getById: (id) => api.get(`/meetings/${id}`),

  // POST /api/meetings/:id/inscribirse
  // Inscribe al usuario logueado en este meeting
  // El backend mira quién somos por el token, no hace falta mandar user_id
  inscribirse: (meetingId) => api.post(`/meetings/${meetingId}/inscribirse`),

  // DELETE /api/meetings/:id/desinscribirse
  // El usuario cancela su inscripción
  desinscribirse: (meetingId) => api.delete(`/meetings/${meetingId}/desinscribirse`),

  // GET /api/user/meetings
  // Obtiene los meetings en los que está inscrito el usuario logueado
  getMisMeetings: () => api.get("/user/meetings"),

  // POST /api/meetings/:id/comentarios
  // El usuario deja un comentario y puntuación en un meeting al que asistió
  // Manda: { comment: "...", score: 4 }
  // El score va de 1 a 5 (las estrellas)
  addComment: (meetingId, data) => api.post(`/meetings/${meetingId}/comentarios`, data),
};
