// Datos iniciales. Solo se usan la primera vez: después manda localStorage.
const img = (n) => `./assets/img/${n}.png`;
const snd = (n) => `./assets/sound/${n}.ogg`;

export const POKEMONES_INICIALES = [
  {
    id: 1, nombre: "Bulbasaur", tipo: ["Planta", "Veneno"],
    descripcion: "Bulbasaur es un Pokémon de tipo Planta y Veneno. Es conocido por la semilla que lleva en su espalda, la cual crece a medida que evoluciona.",
    altura: 0.7, peso: 6.9, generacion: 1,
    hp: 45, ataque: 49, velocidad: 45, defensa: 49,
    habilidad: "Espesura", tieneEvolucion: true, evolucion: "Ivysaur", nivelEvolucion: 16,
    rareza: "Común", imagen: img("bulbasaur"), sonido: snd("bulbasaur"),
    shiny: true, imagenShiny: img("bulbasaur-shiny"),
  },
  {
    id: 4, nombre: "Charmander", tipo: ["Fuego"],
    descripcion: "Charmander es un Pokémon de tipo Fuego. La llama de su cola indica su salud y su estado de ánimo.",
    altura: 0.6, peso: 8.5, generacion: 1,
    hp: 39, ataque: 52, velocidad: 65, defensa: 43,
    habilidad: "Mar Llamas", tieneEvolucion: true, evolucion: "Charmeleon", nivelEvolucion: 16,
    rareza: "Común", imagen: img("charmander"), sonido: snd("charmander"),
    shiny: true, imagenShiny: img("charmander-shiny"),
  },
  {
    id: 7, nombre: "Squirtle", tipo: ["Agua"],
    descripcion: "Squirtle es un Pokémon de tipo Agua. Se protege dentro de su caparazón y ataca con potentes chorros de agua.",
    altura: 0.5, peso: 9.0, generacion: 1,
    hp: 44, ataque: 48, velocidad: 43, defensa: 65,
    habilidad: "Torrente", tieneEvolucion: true, evolucion: "Wartortle", nivelEvolucion: 16,
    rareza: "Común", imagen: img("squirtle"), sonido: snd("squirtle"),
    shiny: true, imagenShiny: img("squirtle-shiny"),
  },
  {
    id: 25, nombre: "Pikachu", tipo: ["Eléctrico"],
    descripcion: "Pikachu es un Pokémon de tipo Eléctrico. Acumula electricidad en las bolsas de sus mejillas y la libera en combate.",
    altura: 0.4, peso: 6.0, generacion: 1,
    hp: 35, ataque: 55, velocidad: 90, defensa: 40,
    habilidad: "Elec. Estática", tieneEvolucion: true, evolucion: "Raichu", nivelEvolucion: 0,
    rareza: "Poco común", imagen: img("pikachu"), sonido: snd("pikachu"),
    shiny: true, imagenShiny: img("pikachu-shiny"),
  },
  {
    id: 133, nombre: "Eevee", tipo: ["Normal"],
    descripcion: "Eevee es un Pokémon de tipo Normal. Su estructura genética inestable le permite evolucionar de muchas formas distintas.",
    altura: 0.3, peso: 6.5, generacion: 1,
    hp: 55, ataque: 55, velocidad: 55, defensa: 50,
    habilidad: "Adaptable", tieneEvolucion: true, evolucion: "Vaporeon, Jolteon o Flareon", nivelEvolucion: 0,
    rareza: "Raro", imagen: img("eevee"), sonido: snd("eevee"),
    shiny: true, imagenShiny: img("eevee-shiny"),
  },
];

export const USUARIOS_INICIALES = [
  { id: 1, nombre: "Administrador", email: "admin@pokeapp.com", username: "admin", password: "admin123", avatar: "./assets/avatar/1.svg", admin: true },
  { id: 2, nombre: "Ash", email: "ash@pokeapp.com", username: "ash", password: "pikachu", avatar: "./assets/avatar/2.svg", admin: false },
];
