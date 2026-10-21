# Plan — Materialseiten-Design „Blatt"

> Spec: `specs/2026-10-21-material-design-design.md` · Branch `feat/material-design` · Stand 2026-10-21

1. **Vorher-Bilder:** `tools/smoke/material_shots.py shoot vorher` (alle Seiten unter `quellen/`, `ordnen/`,
   `datenspuren/`; Tablet quer 1180 × 820 + Handy 390 × 844; `Math.random` fest gesetzt, damit Anordnen-Karten
   gleich gemischt sind).
2. **`unterricht/assets/css/material.css`** anlegen (Tokens + Bausteine), sofort in `assets/versions.json`.
3. **Quellen:** `quellen.css` auf `--m-*` umschreiben (Entwurf A als Grundlage); `quellen.js`: „ERKLÄRT:"-Marke
   nicht mehr erzeugen, KI-Knopf „Mit KI verstehen", `✨` in Texten übersetzen.
4. **Anordnen:** `ordnen.css` auf `--m-*`; Karten als Blätter, Fix-Karte mit gestricheltem Rahmen, Leiste unten
   im Knopf-Stil; `ordnen.js`: KI-Knopf als Wort, `✨` übersetzen.
5. **Datenspuren:** `datenspuren.css` auf `--m-*`; dunkler Kopf → Blatt-Kopf, Akte als Blatt, Tabelle mit Haarlinien.
6. **Hüllen:** `material.css`-Link in alle `index.html` der drei Werkzeuge + `tools/datenspuren/seite_vorlage.html`;
   `make bump` für quellen/ordnen/datenspuren (CSS + JS) und Sync.
7. **Nachher-Bilder** + Sichtung je Seite; Funktionsproben im Browser; DOM-Probe (kein „ERKLÄRT:", kein `✨`).
8. `make check` + `make smoke`; Doku: `SITE_MAP.md` (geteilte Assets), `VEROEFFENTLICHEN.md` (Hülle kopieren,
   KI-Hinweis-Wortlaut), `PROZESS.md`; Commit; Push nach Pauls Freigabe.
