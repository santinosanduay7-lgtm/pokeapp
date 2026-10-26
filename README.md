# PokeApp

WebApp de Pokédex hecha con HTML5 + CSS3 + JavaScript (módulos ES6), sin frameworks.

## Cómo ejecutarla
Los módulos (`import/export`) NO funcionan abriendo el archivo con doble clic.
En VS Code: instalar la extensión **Live Server**, clic derecho en `index.html` > **Open with Live Server**.

## Usuarios de prueba
- Administrador: `admin` / `admin123`
- Usuario común: `ash` / `pikachu`

## Estructura
- `index.html` – contenedor principal (`#app`) y navegación
- `css/style.css` – estilos
- `js/data.js` – datos iniciales (5 Pokémon y 2 usuarios)
- `js/storage.js` – JSON + localStorage
- `js/battle.js` – escenas y decisiones de la batalla
- `js/views.js` – vistas (landing, pokédex, detalle, login, registro, carga, batalla)
- `js/main.js` – navegación y eventos
- `assets/` – imágenes, sonidos y avatares

## Flujo
datos -> JavaScript -> formularios -> eventos -> DOM -> interacción -> JSON -> localStorage -> aplicación

Para reiniciar los datos: F12 > Application > Local Storage > Clear.
