// ============================================================
// src/context/AuthContext.jsx
//
// El "contexto" de autenticación.
// Sirve para guardar los datos del usuario logueado y que
// cualquier componente de la app pueda acceder a ellos
// sin tener que estar pasando props de padre a hijo todo el rato.
//
// Si no sabes qué es un Context, básicamente es como una
// "variable global" de React que todos los componentes pueden leer.
// ============================================================

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/services";

// Creamos el contexto vacío
const AuthContext = createContext(null);

// AuthProvider es el componente que "envuelve" toda la app
// y hace que el contexto esté disponible en todas partes
export function AuthProvider({ children }) {
  // Estado del usuario actual. Intentamos cargarlo del localStorage
  // para que si el usuario recarga la página, siga logueado.
  const [usuario, setUsuario] = useState(() => {
    const userGuardado = localStorage.getItem("user");
    return userGuardado ? JSON.parse(userGuardado) : null;
  });

  // Estado para saber si estamos comprobando la sesión al inicio
  const [cargando, setCargando] = useState(true);

  // Al montar el componente, comprobamos si el token sigue siendo válido
  // preguntándole al backend quién somos
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Si hay token, le preguntamos al backend nuestros datos actuales
      authService
        .getMe()
        .then((res) => {
          // Actualizamos el usuario con los datos frescos del servidor
          setUsuario(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => {
          // Si el token no es válido, limpiamos todo
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUsuario(null);
        })
        .finally(() => {
          setCargando(false); // Ya terminamos de comprobar
        });
    } else {
      setCargando(false); // No hay token, no hay que comprobar nada
    }
  }, []);

  // -------------------------------------------------------
  // Función de LOGIN
  // -------------------------------------------------------
  const login = async (email, password) => {
    // Llamamos al backend con las credenciales
    const res = await authService.login({ email, password });

    // El backend nos devuelve el token y los datos del usuario
    const { token, user } = res.data;

    // Guardamos el token en localStorage para futuras peticiones
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Actualizamos el estado global
    setUsuario(user);

    return user;
  };

  // -------------------------------------------------------
  // Función de REGISTRO
  // -------------------------------------------------------
  const register = async (datos) => {
    // datos = { name, lastname, dni, email, phone, password, password_confirmation }
    const res = await authService.register(datos);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUsuario(user);

    return user;
  };

  // -------------------------------------------------------
  // Función de LOGOUT
  // -------------------------------------------------------
  const logout = async () => {
    try {
      await authService.logout(); // Le avisamos al servidor para que borre el token
    } catch (e) {
      // Si falla la petición de logout, no pasa nada, limpiamos igualmente
    }

    // Limpiamos todo del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Vaciamos el estado global
    setUsuario(null);
  };

  // -------------------------------------------------------
  // Función para actualizar el usuario en el estado
  // (la usamos después de editar el perfil)
  // -------------------------------------------------------
  const actualizarUsuario = (nuevosDatos) => {
    const usuarioActualizado = { ...usuario, ...nuevosDatos };
    setUsuario(usuarioActualizado);
    localStorage.setItem("user", JSON.stringify(usuarioActualizado));
  };

  // Lo que exportamos al resto de la app
  const valor = {
    usuario,          // Los datos del usuario (null si no está logueado)
    estaLogueado: !!usuario, // true/false → si hay usuario, está logueado
    cargando,         // true mientras comprobamos la sesión al inicio
    login,
    register,
    logout,
    actualizarUsuario,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto fácilmente en cualquier componente
// En vez de escribir useContext(AuthContext), escribimos useAuth()
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    // Si intentamos usar useAuth() fuera del AuthProvider, lanzamos un error
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}
