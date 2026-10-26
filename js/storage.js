// Persistencia: objetos JS -> JSON (texto) -> localStorage, y viceversa.
import { POKEMONES_INICIALES, USUARIOS_INICIALES } from "./data.js";

const CLAVES = { pokemones: "pokeapp_pokemones", usuarios: "pokeapp_usuarios", sesion: "pokeapp_sesion" };

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

// Si no hay nada guardado, usa los datos iniciales y los guarda.
function leer(clave, porDefecto) {
  const texto = localStorage.getItem(clave);
  if (texto === null) {
    guardar(clave, porDefecto);
    return structuredClone(porDefecto);
  }
  try {
    return JSON.parse(texto);
  } catch {
    return structuredClone(porDefecto);
  }
}

export const getPokemones = () => leer(CLAVES.pokemones, POKEMONES_INICIALES);
export const savePokemones = (lista) => guardar(CLAVES.pokemones, lista);
export const getUsuarios = () => leer(CLAVES.usuarios, USUARIOS_INICIALES);
export const saveUsuarios = (lista) => guardar(CLAVES.usuarios, lista);

export function getSesion() {
  const texto = localStorage.getItem(CLAVES.sesion);
  return texto ? JSON.parse(texto) : null;
}

export function setSesion(usuario) {
  if (usuario) guardar(CLAVES.sesion, usuario);
  else localStorage.removeItem(CLAVES.sesion);
}
