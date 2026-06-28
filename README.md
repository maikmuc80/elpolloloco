# El Pollo Loco

Ein 2D Jump-and-Run im Stil eines mexikanischen Wüsten-Abenteuers. Pepe sammelt
Münzen und Salsa-Flaschen, besiegt verrückte Hühner und stellt sich am Ende dem
Endboss. Das Spiel ist mit reinem HTML, CSS und objektorientiertem JavaScript
(Canvas) umgesetzt – ohne Frameworks.

## Spielen

1. Repository klonen oder herunterladen.
2. `index.html` im Browser öffnen (oder einen lokalen Server starten).
3. Auf **Spiel starten** klicken.

## Steuerung

| Taste        | Aktion                         |
| ------------ | ------------------------------ |
| ◀ / ▶        | Pepe nach links / rechts       |
| Leertaste    | Springen                       |
| D            | Salsa-Flasche werfen           |

Auf Tablet und Smartphone erscheinen im Querformat zusätzliche Touch-Buttons.

## Features

- Objektorientierte Architektur mit eigener Klasse je Spielobjekt
- Parallax-Hintergrund, flüssige Sprite-Animationen
- Münzen, Flaschen und vier Statusbars (Leben, Coins, Flaschen, Endboss)
- Hintergrundmusik und Soundeffekte, Mute-Status im Local Storage
- Endscreen mit Neustart (ohne Seiten-Reload) und Rückkehr zum Startbildschirm
- Responsives Layout inkl. „Gerät drehen"-Hinweis im Hochformat

## Projektstruktur

```
index.html          Startseite
impressum.html      Impressum
style.css           Styles & Responsiveness
fonts/              Lokal eingebundene Schriftart (Boogaloo)
js/
  game.js           Spielablauf (Start, Restart, Fullscreen)
  controls.js       Tastatur- und Touch-Steuerung
  audio.js          Sound- und Mute-Logik
  helpers.js        Hilfsfunktionen
  level1.js         Level-Aufbau
  classes/          Alle Spielklassen (class.js)
img/ · audio/       Grafiken und Sounds
```
