# SMOKE_TEST_LOG — Diff-MVP

**Datum:** 2026-05-07
**Run:** CC-Headless-Run nach CC_HANDOFF_PROMPT.md

---

## 0. Pre-Tests (CC-automatisch)

| Check | Status | Notiz |
|---|---|---|
| `node --check assets/js/escape-engine.js` | PASS | Syntax OK, 5095 Zeilen |
| `python3 -c json.load(data.json)` | PASS | Valides JSON |
| CSS Brace-Balance | PASS | 415 open / 415 close |
| Diff-Audit data.json (alle bestehenden Felder unveraendert in Mappe 1–3) | PASS | Strukturvergleich gegen .pre-diff-mvp.bak |
| Mappe 4 unveraendert | PASS | Identitaet zu Backup |
| Loesungen + DE-Optionen aller Aufgaben unveraendert | PASS | Lösungs-Anker bleibt DE-Originaltext |
| Glossar-Sprachen vollstaendig | PASS | mat-1-1: alle 4 Begriffe haben DE/RU/AR |
| Optionen-Uebersetzungen anzahlsgleich | PASS | aufgabe-1-1: 4=4=4 |
| Mappe 4 ohne diff-Felder | PASS | keine glossar / ki_prompt / verfuegbare_sprachen / *_uebersetzung |

## 1. Spec-Tests T1–T9 (aus SCHEMA_SPEC_v1.md §6)

| Test | Modus | Status | Notiz |
|---|---|---|---|
| **T1** Sprachbutton DE→RU: Aufgabenstellung wechselt, Material bleibt DE | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: `applyToAllAufgaben(lang='ru')` ersetzt `frage` aus `frage_uebersetzung.ru`, Material-Container ist explizit von RTL/Font-Override ausgeschlossen (`.material { direction: ltr; font-family: inherit; }`). |
| **T2** Sprachbutton DE→AR: Aufgabenstellungs-Container RTL, Material LTR-DE | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: `aufgabe--rtl`-Klasse + `dir="rtl"` auf Frage/Optionen, Material-Container bleibt LTR. |
| **T3** Hover Desktop: Glossar-Tooltip oeffnet bei mouseenter | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: `mouseenter`-Listener mit 80ms-Delay → `showGlossarTooltip(triggerEl, /*tap*/false)`. |
| **T4** Tap iPad: Tooltip oeffnet bei Tap, schliesst bei Tap-aussen | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: `click`-Listener mit Toggle, plus document-level Click-Handler fuer Tap-aussen. `_activeTooltip.dataset.openMode = 'tap'` verhindert Mouse-Leave-Schliessen waehrend Tap-Mode. |
| **T5** Copy KI-Prompt: Clipboard enthaelt Volltext mit korrekter Sprache | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: `navigator.clipboard.writeText(material.ki_prompt[currentLang])` mit Fallback ueber hidden textarea + execCommand(copy). |
| **T6** Sprache RU+AR + Copy: Clipboard ist in RU bzw. AR | manuell (Lehrkraft) | PFLICHT vor Unterricht | Engine: Button speichert Prompts pro Sprache in dataset, liest aktuelle Sprache zur Klick-Zeit. |
| **T7** Mappe 4: keine Differenzierungs-UI sichtbar | PASS (statisch verifiziert) | data.json: Mappe 4 hat keine `verfuegbare_sprachen`, `glossar`, `ki_prompt` → Engine-Guard `if (!_currentMappe.verfuegbare_sprachen) return;` greift. |
| **T8** Selbstreport: erscheint nach Mappe 3, Daten in localStorage | manuell (Lehrkraft) | NICHT IM CC-RUN-SCOPE | Selbstreport-Bogen ist Cowork-Owner (siehe SCHEMA_SPEC_v1.md §9). Aktuelle CC-Patches enthalten keinen Selbstreport-Trigger. |
| **T9** Fallback Uebersetzung fehlt: DE-Original mit Markierung "(nur DE)" | PASS (Code-Inspektion) | Engine: in `_translateAufgabe`: wenn `frage_uebersetzung[lang]` nicht vorhanden → DE-Original + `<span class="aufgabe__nur-de-hinweis">(nur DE verfügbar)</span>`. CSS-Klasse vorhanden. |

## 2. Bekannte Limits / Mini-Risiken

- **Sprachbutton-Position:** wird per JS in `<header>` rechts injiziert; bei sehr schmalen Screens kann er unter den Titel rutschen. Akzeptabel im MVP.
- **Glossar-Wrapping** verarbeitet nur die erste Treffer-Position pro Begriff (Spec §7).
- **Webfont AR** wird via Google-Fonts-CDN geladen. Bei Offline/blocked CDN: Fallback `Tahoma, system-ui` greift, lesbar aber nicht optimal.
- **Native-Speaker-Review RU/AR** nicht erfolgt (Spec-Risiko, dokumentiert in §8). Lehrkraft-Spotcheck post-Unterricht.

## 3. Gesamtbewertung

CC-automatisierte Smoke-Tests: **PASS** (alle T7+T9 + Pre-Tests).
Manuelle Tests T1–T6 + T8: vor Unterricht durch Lehrkraft im Browser zu pruefen.
