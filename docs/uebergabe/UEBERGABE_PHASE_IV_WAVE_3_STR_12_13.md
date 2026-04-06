# Uebergabe Phase IV Wave 3 — STR-12 + STR-13 Code-Strang

**Datum:** 2026-04-06
**Von:** Cowork-PM (Session 13)
**An:** Claude-Code (Engine + Assembly)
**Typ:** Cold-Handoff

---

## Pre-Flight-Checks

- [ ] `git pull` + `git status` sauber
- [ ] Lese diese Uebergabe vollstaendig vor Beginn
- [ ] Keine Aenderungen an docs/ (File-Ownership: Cowork-PM)

---

## Auftrag 1: STR-12 Engine-Unterdrueckung trigger_flags

**Kontext:** SUB_MATERIAL_*-Agenten setzen ab Wave 3 ein `_meta.trigger_flags`-Array in Material-Outputs. Dieses Feld ist ausschliesslich Lehrkraft-Metadatum. Die POLICY_TRIGGER_SICHTBARKEIT.md (§4.2) definiert den Assembly-Split.

**Aufgabe:**
1. Verifiziere, dass die Schueler-Assembly `_meta` vollstaendig aus dem finalen `data.json` entfernt (bestehendes Verhalten).
2. Falls `_meta` derzeit im Schueler-JSON verbleibt: Loesch-Schritt hinzufuegen.
3. Optional: `lehrkraft_meta`-Feld-Mapping implementieren (trigger_flags → lehrkraft_meta.trigger_warnung). Kann auch spaeter erfolgen.
4. Validator-Schritt aus POLICY_TRIGGER_SICHTBARKEIT.md §4.3 implementieren (grep auf `trigger_warnung` / `lehrkraft_meta` in Schueler-HTML).

**Dateien (Lese-Pflicht):**
- `docs/agents/POLICY_TRIGGER_SICHTBARKEIT.md` (§4.1-4.4)
- `assets/js/escape-engine.js` (Material-Rendering pruefen)

**Output:** Engine rendert keinerlei _meta/trigger_flags im SuS-DOM.

---

## Auftrag 2: STR-13 Mappenabschluss-Zone Rendering

**Kontext:** Neue `mappenabschluss_zone.json` mit `{reflexion_fragen[], ueberleitungssatz, _variante}` wird ab Wave 3 produziert. Die Zone wird unterhalb des Hefteintrags gerendert.

**Aufgabe:**
1. Engine erweitern: Neuen Rendering-Block fuer `mappenabschluss_zone` nach dem Hefteintrag-Bereich einfuegen.
2. Rendering-Logik:
   - `reflexion_fragen[]` als nummerierte Liste oder einfache `<p>`-Bloecke rendern
   - `ueberleitungssatz` als abgesetzten Absatz mit visueller Hervorhebung (z.B. kursiv oder eigene CSS-Klasse)
   - Bei Variante B (letzte Mappe): Kein Ueberleitungssatz rendern
3. Styling: Konsistent mit bestehendem Sicherungszonen-Design. Eigene CSS-Klasse `mappenabschluss-zone`.

**Dateien (Lese-Pflicht):**
- `docs/agents/SUB_TEMPLATE_MAPPENABSCHLUSS.md` (Struktur + Varianten)
- `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` (§Mappenabschluss-Zone)
- `assets/js/escape-engine.js` (Sicherungszonen-Rendering als Referenz)
- `assets/css/escape-game.css`

**Output:** Neue Zone im Browser sichtbar unterhalb des Hefteintrags.

---

## Auftrag 3: Mappe-4-Cleanup (STR-13)

**Kontext:** Der Mappenabschlussbereich in Mappe 4 (Erster Weltkrieg) enthaelt Relikte aus frueheren Architektur-Iterationen. Aufraeum-Auftrag gemaess STR-13.

**Aufgabe:**
1. `escape-games/gpg-erster-weltkrieg-ursachen/data.json` Mappe 4 inspizieren
2. Veraltete Reflexions-/Uebergangselemente identifizieren und entfernen
3. Neues `mappenabschluss_zone`-Format einsetzen (Variante B, da letzte Mappe)
4. Testen: Mappe 4 laeuft korrekt im Browser

**Dateien:**
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json`
- `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html`

---

## Cache-Busting

Bei CSS/JS-Aenderungen: ?v= in allen HTML-Referenzen hochzaehlen (aktuell v=4.4 → v=4.5).

## Commit-Hinweis

Einen Commit pro Auftrag. Kein `docs/`-Aenderungen (File-Ownership Cowork-PM).
