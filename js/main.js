import { getSesion, setSesion } from "./storage.js";
import { landing, pokedex, detalle, login, registro, carga, batalla } from "./views.js";

const app = document.getElementById("app");
const nav = document.getElementById("nav");

const vistas = { landing, pokedex, detalle, login, registro, carga, batalla };

function renderNav(sesion) {
  nav.innerHTML = `
    <button class="nav__btn" data-vista="landing">Inicio</button>
    <button class="nav__btn" data-vista="pokedex">Pokédex</button>
    <button class="nav__btn" data-vista="batalla">Batalla</button>
    ${sesion && sesion.admin ? `<button class="nav__btn" data-vista="carga">Cargar Pokémon</button>` : ""}
    ${sesion
      ? `<span class="nav__user"><img src="${sesion.avatar}" alt="">${sesion.nombre}${sesion.admin ? " (admin)" : ""}</span>
         <button class="nav__btn" data-accion="salir">Salir</button>`
      : `<button class="nav__btn" data-vista="login">Iniciar sesión</button>
         <button class="nav__btn" data-vista="registro">Registrarse</button>`}`;
}

function navegar(vista, id = null) {
  const sesion = getSesion();
  renderNav(sesion);
  (vistas[vista] || landing)(app, { navegar, id: id ? Number(id) : null, sesion });
  window.scrollTo(0, 0);
}

// Un solo listener para todos los botones con data-vista / data-accion
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-vista], [data-accion]");
  if (!el) return;
  if (el.dataset.accion === "salir") {
    setSesion(null);
    navegar("landing");
  } else {
    navegar(el.dataset.vista, el.dataset.id);
  }
});

navegar("landing");
