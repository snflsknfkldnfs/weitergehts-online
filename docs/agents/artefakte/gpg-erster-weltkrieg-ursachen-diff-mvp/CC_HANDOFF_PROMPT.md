# CC-HANDOFF — STR-09-NEU MVP-Differenzierung GPG Erster Weltkrieg

**Erzeugt:** 2026-05-07
**Ziel-Run:** Engine + CSS + data.json-Merge für Differenzierungs-MVP
**Modus:** headless via osascript (User-Constraint: kein Live-Monitor)
**Hard-Deadline:** morgen Unterricht (Lehrkraft-Test)

---

## 0. Pre-Flight (PFLICHT vor Run)

CC darf erst starten, wenn:
1. `tools/cc-launch.sh` existiert (verifiziert) und Pre-Flight Auth-Check gegen Max-Subscription PASS.
2. Folgende Cowork-Artefakte existieren und gültig sind:
   - `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SCHEMA_SPEC_v1.md`
   - `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/KI_PROMPT_TEMPLATE.md`
   - `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/inhalte/mappe-1_diff.json`
   - `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/inhalte/mappe-2_diff.json`
   - `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/inhalte/mappe-3_diff.json`
3. User hat den Handoff-Plan in einem osascript-Vorschau-Schritt freigegeben.

---

## 1. Start-Befehl (osascript via Host-MCP)

```bash
cd /Users/paulad/weitergehts.online/weitergehts-online && \
./tools/cc-launch.sh -p --dangerously-skip-permissions \
  --output-format stream-json --verbose \
  --add-dir /Users/paulad/weitergehts.online/weitergehts-online \
  "$(cat docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/CC_HANDOFF_PROMPT.md)" \
  > docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/cc_run_log.jsonl 2>&1
```

---

## 2. Kontext-Block (für CC)

Du bist Claude Code im headless-Modus. Du arbeitest für eine Lehrkraft (User Paul), die morgen ein Escape-Game zum Ersten Weltkrieg im GPG-Unterricht (Klasse 7 Mittelschule Bayern) testet. Das Game läuft live unter `weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/`. Du sollst eine MVP-Differenzierungs-Erweiterung einbauen.

**Source-of-Truth-Dokumente (LIES VOR JEDEM SCHRITT):**
- `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SCHEMA_SPEC_v1.md` — Schema, Engine-Verhalten, CSS, Tests
- `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/KI_PROMPT_TEMPLATE.md` — KI-Prompt-Master-Template
- `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/inhalte/mappe-1_diff.json`, `mappe-2_diff.json`, `mappe-3_diff.json` — vorgenerierte Inhalte (Glossar, Übersetzungen, KI-Prompts)

**Kanonische Project-Anleitung:**
- `docs/projekt/COWORK_PROJECT_ANLEITUNG.md` — File-Ownership: assets/, escape-games/ = deine Domäne
- `docs/projekt/CC_COWORK_INTEROP_LEARNINGS.md` — §4 Handoff-Template, §7 Recovery

**Nicht-Ziele (DO NOT TOUCH):**
- Mappe 4 bleibt vanilla. Keine Differenzierung.
- Bestehende Materialien, Aufgaben, Tipps, Quellen, Bilder NICHT verändern.
- `escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/` (anderer Game-Ordner) NICHT anfassen.
- Andere Games (deutscher-nationalismus-kolonialismus, franzoesische-revolution-1789, verlauf-erster-weltkrieg-marne-ende) NICHT anfassen.

---

## 3. Task-Block — sequenziell

### T1 — Pre-Flight-Verifikation

- Lies `SCHEMA_SPEC_v1.md` vollständig.
- Lies `KI_PROMPT_TEMPLATE.md`.
- Lies alle drei `inhalte/mappe-N_diff.json` Files.
- Lies `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (vor-Stand).
- Lies `assets/js/escape-engine.js` (vor-Stand, 4490 Zeilen).
- Lies `assets/css/themes/theme-gpg.css` (vor-Stand).
- Logge Inventur in `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/CC_RUN_LOG.md` mit Zeit-Stempel + Datei-Größen.
- BREAK BEDINGUNG: wenn Files fehlen oder Schema-Feld widerspricht — STOP und schreibe Findings statt zu raten.

### T2 — data.json-Merge (Mappen 1–3)

- Lade `escape-games/gpg-erster-weltkrieg-ursachen/data.json`.
- Backup: `data.json.pre-diff-mvp.bak` schreiben.
- Merge-Logik:
  - Auf Root-Ebene: setze `meta.differenzierung_aktiv = true` und `meta.differenzierung_version = "mvp-v1-2026-05-07"`.
  - Pro Mappe (1, 2, 3): `verfuegbare_sprachen` ergänzen.
  - Pro Material in Mappe 1, 2, 3: `glossar` und `ki_prompt` aus `mappe-N_diff.json` übernehmen, falls dort vorhanden.
  - Pro Aufgabe in Mappe 1, 2, 3: `frage_uebersetzung` und `optionen_uebersetzung` (falls vorhanden) übernehmen.
  - Mappe 4 unberührt.
- Validiere: alle bestehenden Felder unverändert (diff-Audit), neue Felder syntaktisch valides JSON.
- Commit-Bereit-Stand verifizieren: `python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))"` muss durchlaufen.

### T3 — Engine-Patch `assets/js/escape-engine.js`

Drei neue Module — minimal-invasiv, am Ende der bestehenden Datei (oder als IIFE-Blöcke):

#### T3.1 — Sprach-Modul

```js
// === Sprach-Modul (Differenzierungs-MVP v1) ===
const SPRACHE_KEY = 'escape_sprache';
function getCurrentSprache() {
  return localStorage.getItem(SPRACHE_KEY) || 'de';
}
function setSprache(lang) {
  localStorage.setItem(SPRACHE_KEY, lang);
  document.documentElement.dataset.sprache = lang;
  // Trigger re-render der Aufgabenstellungs-, Glossar- und KI-Prompt-Anzeige
  document.dispatchEvent(new CustomEvent('sprache:changed', { detail: { lang } }));
}
function renderSprachbutton(verfuegbareSprachen, container) { /* … */ }
```

- Sprach-Toggle-Button im Header. Position: rechts neben Mappen-Navigations-Bereich (wenn vorhanden).
- Verfügbare Sprachen aus `mappe.verfuegbare_sprachen`, Default `["de"]`.
- Bei Wechsel: alle DOM-Knoten mit `data-i18n-key` neu rendern. Alternative: einzelne Selektoren explizit ansprechen (Aufgabenstellung, MC-Optionen, Glossar-Tooltips, KI-Prompt-Buttons).
- AR-Wechsel: setze `dir="rtl"` auf Aufgabenstellungs-Container, nicht auf Material-Container. Material-Container bleibt `dir="ltr"`.

#### T3.2 — Glossar-Inline-Tooltip

```js
// === Glossar-Modul ===
function annotiereGlossar(materialEl, glossarArr, lang) {
  // DOM-Walker (nicht Regex auf String!) — wandert Text-Knoten ab,
  // bei Wort-Match wird Text-Knoten gesplittet und Match in <button> gewrappt.
  // Nur erste Treffer-Position pro Begriff.
  // Kein Wrapping innerhalb von <a>, <button>, bereits-gewrappten Begriffen.
}
function showGlossarTooltip(triggerEl, erklaerung) {
  // Popover-Element, position: absolute, ARIA-described-by, Esc-zum-Schließen
}
function bindGlossarTrigger(triggerEl, erklaerung) {
  // Tap UND Hover. Tap toggelt. Tap außerhalb schließt.
  triggerEl.addEventListener('click', e => { /* toggle */ });
  triggerEl.addEventListener('mouseenter', e => { /* show */ });
  triggerEl.addEventListener('mouseleave', e => { /* hide nach delay, außer Tap-state */ });
}
```

- DOM-Walker-Algorithmus PFLICHT (kein Regex auf innerHTML — Bug-Risiko mit `<strong>`-Tags).
- Touch-Tauglichkeit T4 muss PASSEN: Tap auf iPad öffnet Tooltip, zweiter Tap oder Tap-außerhalb schließt.
- Aria: `aria-describedby` zwischen Trigger und Tooltip-ID. Tooltip-Element `role="tooltip"`.
- Esc-Key schließt aktiven Tooltip.
- Bei Sprach-Wechsel: bestehende Triggers behalten, aber `erklaerung` aus `glossar[].erklaerung[currentLang]` neu binden.

#### T3.3 — KI-Prompt-Copy-Button

```js
// === KI-Hilfe-Modul ===
function rendereKIHilfeBox(materialEl, kiPrompt, lang) {
  // Box "KI-Hilfe holen" am Ende des Material-Blocks.
  // Button "Prompt für KI-Hilfe kopieren" (Sprach-abhängiger Label-Text).
  // Beim Klick: navigator.clipboard.writeText(kiPrompt[lang]).
  // Visuelles Feedback: Label wechselt 2s auf "Kopiert ✓".
  // Fallback: Textarea mit selektiertem Inhalt anzeigen, falls clipboard-API blockiert.
}
```

- Label-Sprachen:
  - DE: "Prompt für KI-Hilfe kopieren" / nach Klick: "Kopiert ✓"
  - RU: "Скопировать промпт для AI-помощника" / "Скопировано ✓"
  - AR: "نسخ موجّه المساعد الذكي" / "تم النسخ ✓"
- Begleittext (Sprach-abhängig):
  - DE: "Füge den Prompt in eine KI deiner Wahl ein und stelle deine Frage."
  - RU: "Вставь промпт в AI и задай свой вопрос."
  - AR: "الصق الموجّه في مساعد ذكي واطرح سؤالك."

#### T3.4 — Initialisierung

- Im bestehenden Material-Render-Hook (suche im Code: Funktion, die ein Material in den DOM setzt) füge nach Render auf:
  1. `annotiereGlossar(...)` falls `material.glossar` vorhanden und Sprache aktiv.
  2. `rendereKIHilfeBox(...)` falls `material.ki_prompt` vorhanden.
- Im Aufgaben-Render-Hook: bei Sprache !== 'de' und Aufgabe hat `frage_uebersetzung[currentLang]` → ersetze Frage-Anzeige; analog `optionen_uebersetzung`.
- Sprachbutton einmalig im App-Init rendern.
- `meta.differenzierung_aktiv === true` ist Master-Switch. Wenn false → komplett klassisches Verhalten (Mappe 4 oder zukünftige Games).

### T4 — CSS-Patch `assets/css/themes/theme-gpg.css`

Neue Regeln am Ende der Datei:

```css
/* === Differenzierungs-MVP v1 — STR-09-NEU === */

.glossar-trigger {
  border-bottom: 1px dashed currentColor;
  cursor: help;
  background: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  padding: 0;
  font: inherit;
  color: inherit;
}
.glossar-trigger:focus-visible {
  outline: 2px solid var(--color-accent, #ff9800);
  outline-offset: 2px;
}

.glossar-tooltip {
  position: absolute;
  max-width: 280px;
  padding: 0.75rem 1rem;
  background: var(--color-bg-elev, #fff);
  color: var(--color-text, #222);
  border: 1px solid var(--color-border, #ccc);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  font-size: 0.92rem;
  line-height: 1.4;
  z-index: 100;
}

.ki-hilfe-box {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: var(--color-bg-soft, #f3f6fa);
  border-left: 4px solid var(--color-accent, #ff9800);
  border-radius: 4px;
}
.ki-hilfe-box__btn {
  /* nimmt bestehenden Button-Stil aus Theme-Theme */
}
.ki-hilfe-box__hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-muted, #666);
}

.sprachbutton {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid var(--color-border, #ccc);
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
}
.sprachbutton__menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background: var(--color-bg-elev, #fff);
  border: 1px solid var(--color-border, #ccc);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 50;
}

[dir="rtl"] {
  text-align: right;
}
[dir="rtl"] .aufgabe__frage,
[dir="rtl"] .aufgabe__option,
[dir="rtl"] .glossar-tooltip,
[dir="rtl"] .ki-hilfe-box {
  text-align: right;
}

/* Webfont AR */
:root {
  --font-arabic: 'Noto Sans Arabic', 'Tahoma', system-ui, sans-serif;
}
[dir="rtl"], [lang="ar"] {
  font-family: var(--font-arabic);
}
```

- Webfont Noto Sans Arabic: prüfe ob bereits geladen. Falls nicht: füge in `assets/index.html` oder Game-Root-HTML einen `<link>` zu Google Fonts hinzu (oder lokale Font-Datei kopieren). Akzeptanzkriterium: AR-Text in Aufgabenstellung lesbar, keine Kästchen.

### T5 — Smoke-Tests (T1–T9 aus SCHEMA_SPEC_v1.md §6)

- Schreibe ein Test-Script `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/smoke_test.html` ODER führe manuelle Pseudo-Tests via `node` + `jsdom` durch.
- Mindest-Verifikation:
  - JSON-Validität data.json (T7 implizit).
  - Engine-JS ohne Syntax-Fehler: `node --check assets/js/escape-engine.js`.
  - CSS-Datei ohne Syntax-Fehler: prüfen via `npx stylelint` falls verfügbar, sonst manuell parsbar.
- Ergebnis-Protokoll in `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SMOKE_TEST_LOG.md`:
  - Pro Test (T1–T9 aus Spec): Status PASS / FAIL / N/A (manuell durch Lehrkraft) + Notiz.
  - T3, T4, T8 sind manuell durch Lehrkraft → markiere als „manueller Test PFLICHT vor Unterricht".

### T6 — Self-Report

Schreibe `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/CC_RUN_SELFREPORT.md` mit:

```markdown
# CC Run Self-Report — Diff-MVP

**Run-Start:** {{ISO-Timestamp}}
**Run-Ende:** {{ISO-Timestamp}}
**Status:** SUCCESS | PARTIAL | FAILED

## Geänderte Dateien
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (Backup: data.json.pre-diff-mvp.bak)
- assets/js/escape-engine.js (Backup: escape-engine.js.pre-diff-mvp.bak)
- assets/css/themes/theme-gpg.css (Backup: theme-gpg.css.pre-diff-mvp.bak)
- (Optional) Game-HTML für Webfont-Link

## Smoke-Test-Status
T1–T9 aus SMOKE_TEST_LOG.md

## Bekannte Limits / Manuelle Restarbeiten
- T3, T4, T8 manuell durch Lehrkraft

## Nächste-Schritt-Empfehlung
{{Bei PARTIAL: was noch fehlt}}
```

---

## 4. Recovery-Protokoll (LEARNINGS §7)

Falls Run abbricht (Auth-Fehler, Token-Limit, Crash):
- Schreibe Stand in `CC_RUN_SELFREPORT.md` als PARTIAL.
- Liste klar: was committet, was unfertig.
- Wenn `data.json` verändert aber Engine nicht: Backup zurückspielen (`data.json.pre-diff-mvp.bak`) — sonst Game crasht.
- KEINE selbstständigen Re-Runs. User entscheidet.

---

## 5. Rückmelde-Protokoll (User-sichtbar)

Nach Run-Ende (ob success oder partial) schreibt CC die Rückmelde-Zusammenfassung **JSON-kompatibel** als letzten Eintrag in `cc_run_log.jsonl`:

```json
{"type":"final_report","status":"success","files_changed":["…","…"],"smoke_pass":["T7","T9"],"smoke_manual_pending":["T1","T2","T3","T4","T5","T6","T8"],"limits":[],"next_step":"Lehrkraft Smoke T1–T8 manuell"}
```

User (Cowork) liest dieses File nach Run-Ende und entscheidet weiter.

---

## 6. Nicht-Ziele

- KEIN Refactor bestehender Engine-Module.
- KEIN A11y-Vollaudit (MVP-minimal: aria + keyboard, Vollaudit deferred).
- KEIN Native-Speaker-Review der RU/AR-Übersetzungen (Lehrkraft-Spotcheck post-Run).
- KEINE neuen Aufgaben-Typen.
- KEINE Material-Edit.
- KEINE Generator-Repo-Änderungen.
- KEIN Commit/Push (Cowork entscheidet via Host-MCP-Git-Workflow).

---

**Ende Handoff-Prompt.**
