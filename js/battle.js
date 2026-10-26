// Batalla guionada: cada escena tiene texto y opciones; cada opción lleva a otra escena.
const limitar = (n) => Math.max(0, Math.min(100, n));

export function nuevaBatalla(lista) {
  return {
    yo: lista[0],
    rival: lista[lista.length > 3 ? 3 : lista.length - 1],
    hpYo: 100,
    hpRival: 100,
    escena: "inicio",
    log: "",
  };
}

const REINICIAR = [{ t: "Volver a jugar", reiniciar: true }];

export const ESCENAS = {
  inicio: {
    texto: (s) => `¡Un ${s.rival.nombre} salvaje apareció! Vos elegís a ${s.yo.nombre}.`,
    opciones: [{ t: "Comenzar", ir: "turno1" }],
  },
  turno1: {
    titulo: "Turno 1",
    texto: () => "¿Qué querés hacer?",
    opciones: [
      { t: "ATACAR", ir: "turno2", efecto: { rival: -35, yo: -15 }, msg: "¡Golpe certero! Pero recibís un contraataque." },
      { t: "USAR POCIÓN", ir: "turno2", efecto: { yo: -15 }, msg: "Tu vida ya estaba completa: ¡perdiste el turno!" },
    ],
  },
  turno2: {
    titulo: "Turno 2",
    texto: () => "El rival sigue en pie. ¿Qué hacés?",
    opciones: [
      { t: "ATACAR", ir: "turno3", efecto: { rival: -35, yo: -20 }, msg: "Atacás con fuerza, pero el rival responde." },
      { t: "USAR POCIÓN", ir: "turno3", efecto: { yo: 10 }, msg: "Te curás 25 de vida, pero el rival te daña 15." },
      { t: "HUIR", ir: "huida", msg: "Saliste corriendo..." },
    ],
  },
  turno3: {
    titulo: "Turno 3 - ¡Último turno!",
    texto: () => "Todo se define ahora. Gana quien tenga más vida.",
    opciones: [
      { t: "ATAQUE FINAL", ir: "final", efecto: { rival: -45, yo: -15 }, msg: "¡Lo das todo en un último ataque!" },
      { t: "DEFENDER", ir: "final", efecto: { rival: -10, yo: -5 }, msg: "Te cubrís y devolvés un golpe leve." },
    ],
  },
  victoria: { titulo: "¡VICTORIA!", texto: (s) => `${s.rival.nombre} se debilitó. ¡Ganaste la batalla!`, opciones: REINICIAR },
  derrota: { titulo: "DERROTA", texto: (s) => `${s.yo.nombre} no pudo ganar esta vez. ¡Entrená e intentá de nuevo!`, opciones: REINICIAR },
  huida: { titulo: "HUISTE", texto: () => "Escapaste de la batalla sano y salvo.", opciones: REINICIAR },
};

// Aplica la opción elegida y decide la próxima escena.
export function elegir(s, opcion) {
  const ef = opcion.efecto || {};
  s.hpYo = limitar(s.hpYo + (ef.yo || 0));
  s.hpRival = limitar(s.hpRival + (ef.rival || 0));
  s.log = opcion.msg || "";

  if (s.hpRival <= 0) s.escena = "victoria";
  else if (s.hpYo <= 0) s.escena = "derrota";
  else if (opcion.ir === "final") s.escena = s.hpYo > s.hpRival ? "victoria" : "derrota";
  else s.escena = opcion.ir;
}
