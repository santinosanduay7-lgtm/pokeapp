// Cada vista recibe el elemento principal (app) y un contexto { navegar, id, sesion }.
import { getPokemones, savePokemones, getUsuarios, saveUsuarios, setSesion } from "./storage.js";
import { nuevaBatalla, ESCENAS, elegir } from "./battle.js";

// ---------- Utilidades ----------
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const claseTipo = (t) => "t-" + t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const badges = (tipos) => tipos.map((t) => `<span class="badge ${claseTipo(t)}">${esc(t)}</span>`).join("");
const pad = (n) => String(n).padStart(3, "0");

function tarjeta(p) {
  return `<article class="card">
    <span class="card__num">#${pad(p.id)}</span>
    <img src="${esc(p.imagen)}" alt="${esc(p.nombre)}">
    <h3>${esc(p.nombre)}</h3>
    <div>${badges(p.tipo)}</div>
    <p class="rareza">${esc(p.rareza)}</p>
    <button class="btn" data-vista="detalle" data-id="${p.id}">Ver detalle</button>
  </article>`;
}

// ---------- Landing ----------
export function landing(app, { sesion }) {
  app.innerHTML = `<section class="hero">
    <h1>PokeApp</h1>
    <p>Tu Pokédex interactiva${sesion ? `, ${esc(sesion.nombre)}` : ""}.</p>
    <div class="acciones">
      <button class="btn" data-vista="pokedex">Abrir Pokédex</button>
      <button class="btn btn--azul" data-vista="batalla">¡A batallar!</button>
    </div>
  </section>`;
}

// ---------- Pokédex ----------
export function pokedex(app) {
  app.innerHTML = `<h2>Pokédex</h2>
    <input id="buscar" class="input" placeholder="Buscar por nombre...">
    <div class="grid" id="grid"></div>`;
  const grid = app.querySelector("#grid");
  const pintar = (texto = "") => {
    const lista = getPokemones().filter((p) => p.nombre.toLowerCase().includes(texto.toLowerCase()));
    grid.innerHTML = lista.length ? lista.map(tarjeta).join("") : "<p>No se encontraron Pokémon.</p>";
  };
  pintar();
  app.querySelector("#buscar").addEventListener("input", (e) => pintar(e.target.value));
}

// ---------- Detalle ----------
export function detalle(app, { id }) {
  const p = getPokemones().find((x) => x.id === id);
  if (!p) {
    app.innerHTML = `<p>Pokémon no encontrado.</p><button class="btn" data-vista="pokedex">Volver</button>`;
    return;
  }
  const stats = [["HP", p.hp], ["Ataque", p.ataque], ["Defensa", p.defensa], ["Velocidad", p.velocidad]];
  const evo = p.tieneEvolucion ? `Evoluciona a ${esc(p.evolucion)}${p.nivelEvolucion ? ` (nivel ${p.nivelEvolucion})` : ""}` : "No evoluciona";
  app.innerHTML = `<section class="detalle">
    <div class="detalle__img">
      <img id="foto" src="${esc(p.imagen)}" alt="${esc(p.nombre)}">
      <div class="acciones">
        ${p.shiny ? `<button class="btn btn--azul" id="btn-shiny">✨ Ver shiny</button>` : ""}
        <button class="btn btn--amarillo" id="btn-sonido">🔊 Sonido</button>
      </div>
    </div>
    <div class="detalle__info">
      <h2>#${pad(p.id)} ${esc(p.nombre)}</h2>
      <div>${badges(p.tipo)}</div>
      <p>${esc(p.descripcion)}</p>
      <ul class="datos">
        <li><b>Altura:</b> ${p.altura} m</li><li><b>Peso:</b> ${p.peso} kg</li>
        <li><b>Generación:</b> ${p.generacion}</li><li><b>Habilidad:</b> ${esc(p.habilidad)}</li>
        <li><b>Rareza:</b> ${esc(p.rareza)}</li><li><b>Evolución:</b> ${evo}</li>
      </ul>
      ${stats.map(([n, v]) => `<div class="stat"><span>${n} ${v}</span><div class="barra"><span style="width:${Math.min(100, v / 1.5)}%"></span></div></div>`).join("")}
      <button class="btn" data-vista="pokedex">← Volver a la Pokédex</button>
    </div>
  </section>`;

  const foto = app.querySelector("#foto");
  let verShiny = false;
  const btnShiny = app.querySelector("#btn-shiny");
  if (btnShiny) {
    btnShiny.addEventListener("click", () => {
      verShiny = !verShiny;
      foto.src = verShiny ? p.imagenShiny : p.imagen;
      btnShiny.textContent = verShiny ? "Ver normal" : "✨ Ver shiny";
    });
  }
  app.querySelector("#btn-sonido").addEventListener("click", () => new Audio(p.sonido).play().catch(() => {}));
}

// ---------- Login ----------
export function login(app, { navegar }) {
  app.innerHTML = `<h2>Iniciar sesión</h2>
    <form id="form" class="form">
      <label>Usuario<input name="username" required></label>
      <label>Contraseña<input name="password" type="password" required></label>
      <p class="msg" id="msg"></p>
      <button class="btn">Entrar</button>
    </form>
    <p>¿No tenés cuenta? <button class="link" data-vista="registro">Registrate</button></p>`;
  app.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const u = getUsuarios().find((x) => x.username === d.username && x.password === d.password);
    if (!u) {
      app.querySelector("#msg").textContent = "Usuario o contraseña incorrectos.";
      return;
    }
    const { password, ...usuarioSeguro } = u; // la sesión no guarda la contraseña
    setSesion(usuarioSeguro);
    navegar("landing");
  });
}

// ---------- Registro ----------
export function registro(app, { navegar }) {
  app.innerHTML = `<h2>Registrarse</h2>
    <form id="form" class="form">
      <label>Nombre<input name="nombre" required></label>
      <label>Email<input name="email" type="email" required></label>
      <label>Usuario<input name="username" required></label>
      <label>Contraseña<input name="password" type="password" minlength="4" required></label>
      <p class="msg" id="msg"></p>
      <button class="btn">Crear cuenta</button>
    </form>`;
  app.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const usuarios = getUsuarios();
    if (usuarios.some((u) => u.username === d.username)) {
      app.querySelector("#msg").textContent = "Ese nombre de usuario ya existe.";
      return;
    }
    const id = Math.max(0, ...usuarios.map((u) => u.id)) + 1;
    usuarios.push({ id, nombre: d.nombre.trim(), email: d.email.trim(), username: d.username.trim(), password: d.password, avatar: `./assets/avatar/${2 + (id % 2)}.svg`, admin: false });
    saveUsuarios(usuarios);
    navegar("login");
  });
}

// ---------- Carga de Pokémon (solo admin) ----------
// [nombre del campo, etiqueta, tipo de input, valor por defecto]
const CAMPOS = [
  ["nombre", "Nombre", "text", ""], ["tipo", "Tipos (separados por coma)", "text", "Normal"],
  ["descripcion", "Descripción", "textarea", ""], ["altura", "Altura (m)", "number", ""],
  ["peso", "Peso (kg)", "number", ""], ["generacion", "Generación", "number", 1],
  ["hp", "HP", "number", ""], ["ataque", "Ataque", "number", ""],
  ["velocidad", "Velocidad", "number", ""], ["defensa", "Defensa", "number", ""],
  ["habilidad", "Habilidad", "text", ""], ["tieneEvolucion", "¿Tiene evolución?", "checkbox", false],
  ["evolucion", "Evolución", "text", ""], ["nivelEvolucion", "Nivel de evolución", "number", 0],
  ["rareza", "Rareza", "select", ["Común", "Poco común", "Raro", "Legendario"]],
  ["imagen", "Ruta de imagen", "text", "./assets/img/placeholder.svg"],
  ["sonido", "Ruta de sonido", "text", "./assets/sound/placeholder.wav"],
  ["shiny", "¿Tiene versión shiny?", "checkbox", false],
  ["imagenShiny", "Ruta de imagen shiny", "text", "./assets/img/placeholder-shiny.svg"],
];

function campoHTML([n, etiqueta, t, d]) {
  if (t === "textarea") return `<label>${etiqueta}<textarea name="${n}" required></textarea></label>`;
  if (t === "select") return `<label>${etiqueta}<select name="${n}">${d.map((o) => `<option>${o}</option>`).join("")}</select></label>`;
  if (t === "checkbox") return `<label class="check"><input type="checkbox" name="${n}"> ${etiqueta}</label>`;
  const extra = t === "number" ? 'step="any" min="0"' : "";
  return `<label>${etiqueta}<input name="${n}" type="${t}" ${extra} value="${esc(d)}" ${n === "evolucion" ? "" : "required"}></label>`;
}

export function carga(app, { sesion, navegar }) {
  if (!sesion || !sesion.admin) {
    app.innerHTML = `<h2>Acceso restringido</h2><p>Solo los administradores pueden cargar Pokémon.</p>
      <button class="btn" data-vista="login">Iniciar sesión</button>`;
    return;
  }
  app.innerHTML = `<h2>Cargar nuevo Pokémon</h2>
    <form id="form" class="form form--grid">${CAMPOS.map(campoHTML).join("")}<button class="btn">Guardar Pokémon</button></form>`;

  app.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const lista = getPokemones();
    const nuevo = { id: Math.max(0, ...lista.map((p) => p.id)) + 1 };
    for (const [n, , t] of CAMPOS) {
      const campo = e.target.elements[n];
      if (t === "checkbox") nuevo[n] = campo.checked;
      else if (t === "number") nuevo[n] = Number(campo.value); // número, no texto
      else if (n === "tipo") nuevo[n] = campo.value.split(",").map((x) => x.trim()).filter(Boolean);
      else nuevo[n] = campo.value.trim();
    }
    lista.push(nuevo);
    savePokemones(lista);
    navegar("pokedex");
  });
}

// ---------- Batalla ----------
export function batalla(app) {
  const estado = nuevaBatalla(getPokemones());
  const lado = (p, hp) => `<div class="lado"><img src="${esc(p.imagen)}" alt=""><strong>${esc(p.nombre)}</strong>
    <div class="barra barra--hp"><span style="width:${hp}%"></span></div><small>${hp} / 100</small></div>`;

  const pintar = () => {
    const escena = ESCENAS[estado.escena];
    app.innerHTML = `<section class="batalla">
      <div class="combatientes">${lado(estado.rival, estado.hpRival)}${lado(estado.yo, estado.hpYo)}</div>
      <div class="dialogo">
        ${escena.titulo ? `<h3>${escena.titulo}</h3>` : ""}
        ${estado.log ? `<p class="log">${esc(estado.log)}</p>` : ""}
        <p>${esc(escena.texto(estado))}</p>
        <div class="acciones">${escena.opciones.map((o, i) => `<button class="btn" data-op="${i}">${o.t}</button>`).join("")}</div>
      </div></section>`;
    app.querySelectorAll("[data-op]").forEach((b) =>
      b.addEventListener("click", () => {
        const opcion = escena.opciones[b.dataset.op];
        if (opcion.reiniciar) Object.assign(estado, nuevaBatalla(getPokemones()));
        else elegir(estado, opcion);
        pintar();
      })
    );
  };
  pintar();
}
