# El Pollo Loco

A 2D jump-and-run set in a Mexican desert adventure. Pepe collects coins and
salsa bottles, defeats crazy chickens and finally faces the end boss. The game is
built with plain HTML, CSS and object-oriented JavaScript (Canvas) – without any
frameworks.

## Play

1. Clone or download the repository.
2. Open `index.html` in your browser (or start a local server).
3. Click **Start game**.

## Controls

| Key          | Action                         |
| ------------ | ------------------------------ |
| ◀ / ▶        | Move Pepe left / right         |
| Space        | Jump                           |
| D            | Throw salsa bottle             |

On tablets and smartphones, extra touch buttons appear in landscape mode.

## Features

- Object-oriented architecture with a dedicated class per game object
- Parallax background, smooth sprite animations
- Coins, bottles and four status bars (health, coins, bottles, end boss)
- Background music and sound effects, mute state stored in Local Storage
- End screen with restart (without page reload) and return to the start screen
- Responsive layout including a "rotate your device" hint in portrait mode

## Project structure

```
index.html          Start page
impressum.html      Legal notice
style.css           Styles & responsiveness
fonts/              Locally embedded font (Boogaloo)
js/
  game.js           Game flow (start, restart, fullscreen)
  controls.js       Keyboard and touch controls
  audio.js          Sound and mute logic
  helpers.js        Helper functions
  level1.js         Level setup
  classes/          All game classes (class.js)
img/ · audio/       Graphics and sounds
```
