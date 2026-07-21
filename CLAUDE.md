# El Pollo Loco

2D-Jump-and-Run (Canvas, objektorientiertes JavaScript, ohne Frameworks).
Ausbildungsprojekt der Developer Akademie.

## Commits

**Keine Co-Author-Trailer.** Commit-Messages dürfen unter keinen Umständen
`Co-Authored-By:`-Zeilen enthalten — insbesondere nicht für Claude oder andere
KI-Tools.

Grund: GitHub wertet diese Trailer aus und listet die genannten Accounts als
Contributor in der Repo-Sidebar. Genau deshalb musste dieses Repo am 21.07.2026
gelöscht und neu aufgesetzt werden — ein Force-Push allein reichte nicht, weil
die alten Commits als unerreichbare Objekte auf GitHub weiterlebten und der
Contributor-Cache sie weiter zählte.

Als Autor tritt ausschließlich `Maik Radke <maikmuc80@gmail.com>` auf.

## Push

Remote läuft über SSH (`git@github.com:maikmuc80/elpolloloco.git`). Die
Bild- und Audio-Assets machen das Repo ~52 MB groß; Pushes über HTTPS oder
über einen VPN-Tunnel brechen zuverlässig mit HTTP 408 bzw. Broken Pipe ab.

## Struktur

```
index.html          Startseite
impressum.html      Impressum
style.css           Styles & Responsiveness
fonts/              Lokal eingebundene Schrift (Boogaloo)
js/
  game.js           Spielablauf (Start, Restart, Fullscreen)
  controls.js       Tastatur- und Touch-Steuerung
  audio.js          Sound- und Mute-Logik
  helpers.js        Hilfsfunktionen
  level1.js         Level-Aufbau
  classes/          Alle Spielklassen (class.js)
img/ · audio/       Grafiken und Sounds
```
