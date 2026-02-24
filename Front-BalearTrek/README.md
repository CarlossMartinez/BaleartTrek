# BalearTrek — Frontend React

Frontend de BalearTrek hecho con **React + Vite + Tailwind CSS**.
Se conecta con el backend de **Laravel** mediante **Axios**.

---

## 🚀 Instalación y arranque

```bash
# 1. Entra en la carpeta del proyecto
cd baleartrek

# 2. Instala las dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

La app se abre en **http://localhost:3000**

> ⚠️ Asegúrate de que tu servidor Laravel esté corriendo en `http://localhost:8000`

---

## 📁 Estructura de archivos

```
baleartrek/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx        → Esqueleto con Navbar + Footer
│   │   │   ├── Navbar.jsx        → Barra de navegación superior
│   │   │   └── Footer.jsx        → Pie de página
│   │   └── ui/
│   │       ├── RutaProtegida.jsx → Redirige al login si no estás logueado
│   │       ├── TarjetaTrek.jsx   → Tarjeta de un trek (usada en el listado)
│   │       ├── Estrellas.jsx     → Componente de valoración con estrellas
│   │       └── Paginacion.jsx    → Paginación reutilizable
│   ├── context/
│   │   └── AuthContext.jsx       → Estado global del usuario logueado
│   ├── pages/
│   │   ├── Home.jsx              → Carrusel de treks destacados
│   │   ├── Treks.jsx             → Listado con filtros por isla/zona
│   │   ├── DetalleTrek.jsx       → Info del trek + lista de meetings
│   │   ├── DetalleMeeting.jsx    → Info del meeting + inscripción + comentarios
│   │   ├── Login.jsx             → Login + Registro (dos pestañas)
│   │   ├── MisMeetings.jsx       → Meetings del usuario logueado
│   │   ├── Perfil.jsx            → Editar perfil + cambiar contraseña
│   │   ├── AboutUs.jsx           → Página "Sobre nosotros"
│   │   └── FAQ.jsx               → Preguntas frecuentes
│   ├── services/
│   │   ├── api.js                → Configuración base de Axios + interceptores
│   │   └── services.js           → Funciones de fetch para cada recurso
│   ├── App.jsx                   → Rutas con React Router DOM
│   ├── main.jsx                  → Punto de entrada
│   └── index.css                 → Tailwind CSS
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🗄️ Modelo de base de datos (migraciones Laravel)

| Tabla | Campos clave |
|-------|-------------|
| `users` | id, name, lastname, dni, email, phone, password, role_id |
| `treks` | id, regNumber, name, status, municipality_id |
| `meetings` | id, user_id, trek_id, day, time, totalScore, countScore, appDateIni, appDateEnd |
| `meeting_user` | meeting_id, user_id *(pivot de inscripciones)* |
| `interesting_places` | id, name, gps, place_type_id |
| `interesting_place_trek` | interesting_place_id, trek_id, order |
| `comments` | id, comment, score, status, user_id, meeting_id |
| `images` | id, url, comment_id |
| `municipalities` | id, name, island_id, zone_id |
| `islands` | id, name |
| `zones` | id, name |

---

## 🔌 Endpoints que necesitas en Laravel

```
POST   /api/login
POST   /api/register
POST   /api/logout
GET    /api/user
PUT    /api/user
PUT    /api/user/password
GET    /api/user/meetings

GET    /api/treks              ?island_id=&zone_id=&orderBy=popular&page=
GET    /api/treks/destacados
GET    /api/treks/:id
GET    /api/treks/:id/meetings ?page=

GET    /api/meetings/:id
POST   /api/meetings/:id/inscribirse
DELETE /api/meetings/:id/desinscribirse
POST   /api/meetings/:id/comentarios

GET    /api/islands
GET    /api/zones
```

---

## 🛠️ Dependencias principales

- **React 18** — Librería de UI
- **React Router DOM v6** — Navegación entre páginas
- **Axios** — Peticiones HTTP al backend Laravel
- **Tailwind CSS v3** — Estilos
- **Vite** — Servidor de desarrollo y bundler
