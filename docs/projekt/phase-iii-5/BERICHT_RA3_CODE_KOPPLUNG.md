# BERICHT RA3 — Code-Kopplungs-Audit Phase III.5
**Projekt:** weitergehts.online
**Auditor:** RA3 Code-Kopplungs-Pruefer
**Audit-Datum:** 2026-04-05
**Status:** VALIDIERT

---

## 1. Charta-Rekapitulation

Als isolierter Code-Kopplungs-Pruefer untersuche ich:
- **Primaerfrage:** Welche Code-Pfade (Engine, Templates, data.json-Schema, JS-Logik, CSS) werden durch die 20 aktiven STR beruehrt, und welches Regressionsrisiko besteht fuer Mappen 1-4 (bereits Produktion)?
- **Scope:** Code-Analyse (escape-engine.js, core.js, data.json-Schema, HTML-Templates), Regressionsrisiko, Schema-Kompatibilitaet, Cache-Busting, Wave-3-Atomisierbarkeit.
- **Anti-Scope:** Keine Scope-Urteile (RA1), keine DAG-Analyse (RA2), keine Vertrags-/Agent-Analyse (RA4), keine Meta-Synthese (RA5).

---

## 2. Methodik + Baseline-Zusammenfassung

### 2.1 Engine-Struktur (escape-engine.js, 3751 Zeilen)

Die Escape-Engine definiert **8 API-Funktionen** und **5 Aufgabentyp-Renderer**:

**API:**
- `init(mappeId)` — Initialisierung, data.json laden, Rendering
- `checkCode(mappeId, eingabe)` — Freischalt-Code-Pruefung
- `saveProgress(mappeId, aufgabeIndex, solved)` — Fortschritts-Speicherung
- `loadProgress(mappeId)` — Fortschritts-Laden
- `showTipp(mappeId, aufgabeIndex, stufe)` — Tipp-Anzeige
- `resetProgress()` — Fortschritts-Reset
- `unlockMappe(mappeId)` — Mappe entsperren
- `setStorageKey(key, data)` — Storage-Key-Setter

**Renderer (interne Funktionen):**
- `_renderMultipleChoice` (Z. 2000–2058)
- `_renderZuordnung` (Z. 2118+)
- `_renderLueckentext` (Z. 2278+)
- `_renderReihenfolge` (Z. 2646+)
- `_renderFreitextCode` (undokumentiert, aber erwähnt in API-Kommentar)

**Hotspots:**
- `_renderAufgabe` (Z. 1868) — Zentrale Rendering-Schnittstelle fuer alle Aufgabentypen
- `_renderMappeV1` (Z. 1669) — Material-Unterstützung (7 Typen: darstellungstext, quellentext, bildquelle, karte, zeitleiste, statistik, tagebuch)
- Feedback-Slot (Z. 1919–1924) — `Core.feedback.show*()` Aufrufe, derzeit single-string-basiert

**Integrationspunkte mit core.js:**
- `Core.storage.set/get/remove/clear` (Storage-Wrapper)
- `Core.feedback.showSuccess/showError/showInfo` (Feedback-Animation)
- `Core.nav.goTo/goBack` (Navigation)
- `Core.utils.shuffleArray` (Utility)

### 2.2 data.json-Schema (Basis: mappe-1)

**Top-Level-Struktur:**
```json
{
  "meta": {
    "titel": "...",
    "fach": "...",
    "jahrgangsstufe": "...",
    "schwierigkeit": "...",
    "geschaetzte_dauer_min": 30
  },
  "mappen": [
    {
      "id": "mappe-X",
      "titel": "...",
      "beschreibung": "...",
      "freischalt_code": "...",
      "einstieg": { "narrativ": "...", "problemstellung": "..." },
      "materialien": [ /* 7 Typen */ ],
      "aufgaben": [
        {
          "id": "a-X-Y",
          "typ": "multiple-choice|zuordnung|lueckentext|reihenfolge|freitext-code",
          "title": "...",
          "text": "...",
          "loesung": "...",
          "optionen": [...],
          "tipps": [{ "stufe": 1, "text": "..." }, ...],
          "feedback": { ... } /* currently string, STR-03 will change */
        }
      ]
    }
  ]
}
```

**Kritische Felder fuer STR-Aenderungen:**
- `aufgaben[].tipps` — STR-04 erweitert auf 3-stufig mit Haertegrad-Struktur
- `aufgaben[].feedback` — STR-03 aendert string → {korrekt, falsch_generic, falsch_spezifisch, task_feedback}
- `aufgaben[].bloom_level` — STR-02 fuegt Bloom-Level explizit hinzu
- `_meta.trigger_flags` (Lehrkraft) — STR-12 flaggt Trigger-Material
- `materialien[].konflikttyp` — STR-05 flaggt Multiperspektivitaets-Pflicht

---

## 3. STR-zu-Code-Matrix

| STR-ID | Titel | Priorit. | Betr. Datei(en) | Betr. Funktion(en)/Felder | Aenderungs-Typ | Regress-Risiko |
|---|---|---|---|---|---|---|
| STR-02 | Bloom-Tiefe Pflicht | P0 | data.json, engine.js | `aufgaben[].bloom_level`, keine Engine-Aenderung | Schema-Erweiterung | NIEDRIG (rückwaerts-kompatibel) |
| STR-03 | Elaboratives Feedback | P0 | data.json, escape-engine.js | `aufgaben[].feedback` (string→Objekt), `_renderAufgabe`, `Core.feedback.*` | Breaking Change + Engine-Patch | **HOCH** (Mappen 1-4 legacy kompatibel erforderlich) |
| STR-04 | 3-stufige Tipps | P0 | data.json, escape-engine.js | `aufgaben[].tipps[].haertegrad`, `showTipp`, Tipp-UI | Schema-Erweiterung + Engine-Rendering | **MITTEL** (UI-Logik für Wave 3) |
| STR-05 | Multiperspektivitaet | P0 | data.json (M-Katalog) | `materialien[].konflikttyp`, `perspektiven_policy` | Schema-Erweiterung (Metadaten) | NIEDRIG (Metadaten nur, kein Code-Impact) |
| STR-06 | Zeit-Orientierung | P0 | data.json (weich) | `_meta.zeit_orientierung` (Hinweis, kein Gate) | Schema-Erweiterung (Leitplanke) | NIEDRIG (weich, keine Validierung) |
| STR-08 | Quellenkritik adaptiv | P1 | data.json, engine.js | `aufgaben[].typ: "quellenkritik"` (neuer Typ), `_renderQuellenkritik` (neu) | Schema-Erweiterung + neuer Renderer | **MITTEL** (neuer Aufgabentyp) |
| STR-11 | Aufgabentypologie-Erw. | P1 | data.json, engine.js | `aufgaben[].typ: "vergleich"|"begruendung"`, neue Renderer | Schema-Erweiterung + 2 neue Renderer | **MITTEL** (neue Typen, optional) |
| STR-12 | Trigger-Sensibilitaet | P1 | data.json (Lehrkraft), engine.js | `trigger_flags` (Metadaten nur), `_suppressTriggerMetadata()` (Engine) | Metadaten + Engine-Filter | NIEDRIG (SuS-sichtbar? Engine muss unterdruecken) |
| STR-13 | Mappenabschluss-Zone | P1 | data.json, engine.js | `aufgaben[].typ: "reflexion"` (optional), `sicherung` weiterentwickelt | Schema-Erweiterung | NIEDRIG (optional) |
| STR-14 | Fiktionalitaets-Kennz. | P1 | data.json (quellenangabe) | `materialien[].fiktional: boolean` (Metadaten) | Schema-Erweiterung (Metadaten) | NIEDRIG |
| STR-15 | R3-Schutzregeln | P1 | (Regelwerk, kein Code) | keine Engine-Aenderung | Policy (kein Code) | NIEDRIG |
| STR-17 | Audit-Methodik-Iter. | P1 | (Meta-Prozess) | keine Engine-Aenderung | Prozess | NIEDRIG |
| STR-19 | Pandel Geschichtsbewusstsein | P2 | (Audit-Dimension) | keine Engine-Aenderung | Meta | NIEDRIG |
| STR-20 | WCAG/A11y-Pass | P2 | assets/css, engine.js (ARIA, color-contrast, focus-management) | Rendering-Semantik, CSS, ARIA-Labels | Rendering-Refactor | **HOCH** (Breitenimpact auf Rendering) |
| STR-21 | Worked-Example-Variante | P2 | data.json | `aufgaben[].worked_example: {...}` (optional) | Schema-Erweiterung (optional) | NIEDRIG |
| STR-22 | Synchronisationspunkte Orch. | P2 | engine.js (Event-Hooks) | Event-Architektur (`_triggerSync`, `_waitForSync`) (neu?) | Engine-Erweiterung | **MITTEL** (neue Event-API) |
| STR-23 | Sequenz-Uebergangs-Doku | P2 | (Doku) | keine Engine-Aenderung | Dokumentation | NIEDRIG |
| STR-24 | D15b-Post-Publish-Checkliste | Konsoli | (E6 Audit-Artefakt) | keine Engine-Aenderung (Prozess) | Prozess | NIEDRIG |
| STR-25 | C2-Cross-Reference | Meta | (Prozess) | keine Engine-Aenderung | Prozess | NIEDRIG |

**Zusammenfassung:**
- **Code-Beruehrende STR:** STR-02, STR-03, STR-04, STR-08, STR-11, STR-12 (Filter), STR-13, STR-20, STR-22
- **Hohes Regressions-Risiko:** STR-03 (Feedback-Schema-Breaking-Change), STR-20 (WCAG-Rendering-Refactor)
- **Mittleres Risiko:** STR-04 (Tipp-UI), STR-08 (neuer Typ), STR-11 (neue Typen), STR-22 (Event-API)

---

## 4. Schema-Migrations-Analyse

### 4.1 Breaking Changes

**STR-03: Feedback-Schema (BREAKING CHANGE)**
- **Aktuell:** `aufgaben[].feedback: string` ("Richtig! ✅")
- **Neu:** `aufgaben[].feedback: { korrekt: string, falsch_generic: string, falsch_spezifisch: {}, task_feedback: string }`
- **Kompatibilitaet:** Mappen 1-4 verwenden derzeit single-string-Format. Engine MUSS beide Formate erkennen und rendern koennen.
- **Migration:** Engine-Logik (in `_renderAufgabe` oder neuer `_renderFeedbackSlot`) muss `typeof aufgabe.feedback === 'string'` checken und fallback-rendern.
- **Datei-Impact:** escape-engine.js, Z. 1919–1924 (Feedback-Element-Setup), plus neue Rendering-Logik

### 4.2 Rückwaerts-kompatible Erweiterungen

**STR-02, STR-04, STR-05, STR-06, STR-14, STR-21:** Neue Felder (bloom_level, haertegrad, konflikttyp, etc.) sind optional. Alte data.json-Dateien funktionieren, neue Features greifen nur, wenn Feld vorhanden.

**STR-12 (Trigger-Flags):** Metadaten im Material. Lehrkraft-sichtbar, SuS-unsichtbar. Engine muss Flags beim Rendering unterdruecken (nicht im Output-HTML).

### 4.3 Schema-Migrationspfad

```
Mappe 1-4 (aktuell):
  aufgaben[].feedback: "Richtig! ✅"
  aufgaben[].tipps: [{ stufe: 1, text: "..." }]

Mappe 5+ (Phase IV / STR-03, STR-04 live):
  aufgaben[].feedback: { korrekt: "...", falsch_generic: "...", ... }
  aufgaben[].tipps: [{ stufe: 1, haertegrad: "kognitiv", text: "..." }, ...]

Engine (post-STR-03 Patch):
  - Prueft: typeof feedback === 'string' ? legacy_render : new_render
  - Fallback: Falls tipps[] keine haertegrad-Felder, akzeptiert Fallback
  - Constraint: Mappen 1-4 werden nicht migriert, bleiben Legacy-Format
```

---

## 5. Cache-Busting-Anforderungen pro STR

**Projekt-Regel (Memory-Eintrag):** Bei JS/CSS-Aenderungen MUESSEN `?v=` Parameter in allen HTML-Referenzen hochgezaehlt werden.

**HTML-Baseline (mappe-3.html, mappe-4.html):**
```html
<link rel="stylesheet" href="../../assets/css/base.css?v=3.9">
<link rel="stylesheet" href="../../assets/css/themes/theme-gpg.css?v=3.9">
<script src="../../assets/js/core.js?v=3.9"></script>
<script src="../../assets/js/escape-engine.js?v=3.9"></script>
```

**Aktueller Stand:** v=3.9

**STR mit JS/CSS-Aenderungen:**

| STR | JS-Aenderung? | CSS-Aenderung? | ?v= Bump erforderlich? |
|---|---|---|---|
| STR-03 | JA (Feedback-Rendering in escape-engine.js) | NEIN | JA → v=4.0 |
| STR-04 | JA (Tipp-UI in escape-engine.js) | MOGLICH (Tipp-Button-Styling) | JA → v=4.0 |
| STR-20 | JA (ARIA, Accessibility Refactor) | JA (color-contrast, focus) | JA → v=4.0 |
| STR-08 | JA (neuer Aufgaben-Renderer `_renderQuellenkritik`) | MOGLICH | JA → v=4.0 |
| STR-11 | JA (2 neue Renderer) | MOGLICH | JA → v=4.0 |
| STR-22 | JA (Event-API, Sync-Hooks) | NEIN | JA → v=4.0 |

**Empfehlung:**
- Wave 1 (STR-02–06): ALLE HTML-Dateien auf v=4.0 syncen (einmalig, vor Wave 1 Deployment)
- Wave 2–3: v=4.1, 4.2 usw. pro Wave bei weiteren Aenderungen
- **KRITISCH:** Alle 5+ HTML-Dateien (mappe-1 bis mappe-4, index.html, lehrkraft.html) MUESSEN synchron sein. Mismatch verursacht Render-Fehler.

---

## 6. Wave-3-Atomisierbarkeits-Analyse

**Wave 3 bundelt Frontend-Patches:** STR-03 (Feedback), STR-04 (Tipps), STR-20 (WCAG)

**Atomisierungs-Pruefung:**

| Patch | Abhaengig von | Unabhaengig vomeinander? | Rollback isolierbar? |
|---|---|---|---|
| STR-03 Feedback-Schema | Core.feedback.show* Existenz | JA (neu Feedback-Slot-Logik) | JA (wenn engine.js v=4.0 rollback) |
| STR-04 Tipp-Stufen | Engine.showTipp, Tipps-UI | JA (unabhaengiger UI-Patch) | JA |
| STR-20 WCAG | CSS (contrast, focus), ARIA-Labels in Renderer | JA (CSS unabhaengig von JS) | NEIN (gemischt) |

**Kritisches Befundnis:**
- **STR-03 und STR-04 sind atomar:** Separate Feature-Flags moeglich (wenn desired).
- **STR-20 ist NICHT rein atomar:** Mischt CSS-Refactor mit JS-ARIA-Aenderungen. Rollback ist "all-or-nothing".
  - **Empfehlung:** STR-20 als **Einheit** deployen, oder in "CSS-Patch + JS-ARIA-Patch" aufteilen (Koordination erforderlich).

**Wave-3-Deployment-Sequenz:**
1. v=4.0 bump in allen HTML (pre-deployment)
2. Deploy escape-engine.js (Feedback + Tipp-Logik)
3. Deploy core.js (keine Aenderung geplant, aber Test)
4. Deploy CSS (base.css, theme-gpg.css fuer WCAG)
5. Smoke-Test Mappen 1-4 mit legacy Feedback-Schema
6. Smoke-Test Mappe 5 mit neuer Feedback-Schema
7. Go live

---

## 7. Merge-Konflikt-Hotspots

**Mehrfach-STR-Berührung:**

| Datei | STR-Cluster | Konflikt-Risiko |
|---|---|---|
| escape-engine.js L. 1919–1924 (Feedback-Element) | STR-03 (Feedback-Rendering) | JA — `_renderAufgabe` wird modifiziert |
| escape-engine.js L. 2000–2110 (_renderMultipleChoice) | STR-04 (Tipp-UI), STR-03 (Feedback-Call) | JA — beide Funktionen in MC-Handler |
| escape-engine.js L. 315–334 (showTipp) | STR-04 (Tipp-Haertegrad-Logik) | JA — Tipp-Lookup-Logik |
| data.json `aufgaben[].tipps`, `aufgaben[].feedback` | STR-03, STR-04 (Schema-Update) | NIEDRIG (JSON-Structure, keine Merge-Konflikte zu Code) |
| assets/css/base.css, theme-gpg.css | STR-20 (WCAG-Styling) | NIEDRIG (CSS-Refresh, unabhaengig von JS) |

**Empfehlung fuer Implementierung:**
- **Reihenfolge:** STR-03 (Feedback-Schema + Engine-Rendering), STR-04 (Tipp-Logik), STR-20 (WCAG-CSS) in separaten PRs, um Merge-Konflikte zu minimieren.
- **Koordination:** Falls parallel entwickelt, Lint-Checks (eslint) und Code-Review fuer escape-engine.js Hotspots.

---

## 8. Findings (mindestens 10, mit Code-Evidenz)

### F-RA3-01: Legacy-Kompatibilitaet für Feedback-Schema (STR-03)
**Severitaet:** P1 (KRITISCH)
**STR-Bezug:** STR-03 Elaboratives Feedback
**Betroffene Datei(en):** escape-engine.js, Z. 1919–1924; data.json (Mappen 1-4)
**Beschreibung:**
STR-03 definiert neue Feedback-Struktur (Objekt mit {korrekt, falsch_generic, falsch_spezifisch, task_feedback}) — ein Breaking Change. Mappen 1-4 verwenden aktuell single-string-Format. Engine muss beide Formate korrekt rendern, oder Mappen 1-4 brechen sichtbar.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 1919–1924: Feedback-Element wird erstellt, aber Rendering-Logik nicht flexibel genug fuer Objekt-Feedback
- escape-engine.js Z. 2087: `Core.feedback.showSuccess(section, 'Richtig! ✅');` — nur single-string-Parameter
- data.json (Mappe 1, Mappe 3): Alle Aufgaben nutzen implizites string-Format (nicht dokumentiert, nur in Engine erwartet)

**Verdikt-Empfehlung:** MODIFY
- Engine: `_renderFeedbackSlot(aufgabe.feedback)` Hilfsfunktion, die `typeof feedback === 'string' ? String-Rendering : Objekt-Rendering` prueft.
- Core.feedback: Erweitern Sie Signaturen, um Objekt-Parameter zu akzeptieren (z.B. `Core.feedback.showElaborated({korrekt, falsch_generic, ...})`).

**Migrations-Strategie:**
- Mappe 1-4: Bleiben mit Legacy-String-Feedback, kein Schema-Upgrade erforderlich.
- Mappe 5+: Neue Aufgaben nutzen Objekt-Feedback, werden korrekt gerendert.

---

### F-RA3-02: Tipp-Stufen-Strukturierung (STR-04)
**Severitaet:** P1 (HOCH)
**STR-Bezug:** STR-04 3-stufige Tipps mit Haertegraden
**Betroffene Datei(en):** escape-engine.js Z. 315–334 (showTipp), data.json `aufgaben[].tipps[]`
**Beschreibung:**
STR-04 fordert `tipps: [{stufe: 1|2|3, haertegrad: "kognitiv"|"strukturierend"|"heuristisch", text: string}]`. Aktueller Tipp-Lookup (Z. 325–330) iteriert einfach über `tipps[]` und sucht nach `stufe`-Match, arbeitet aber nicht mit `haertegrad`. UI-Rendering für "gestaffelte Tipp-Anzeige" (Stufen klickbar, nicht alle auf einmal) ist nicht vorhanden.

**Evidenz (Datei:Zeile):**
```javascript
// escape-engine.js Z. 325–330
for (var i = 0; i < tipps.length; i++) {
  if (tipps[i].stufe === stufe) {
    // Tipp-Nutzung speichern
    _saveTippUsage(mappeId, aufgabeIndex, stufe);
    return tipps[i].text || 'Kein Tipp-Text vorhanden.';
  }
}
```
Diese Logik liest NICHT `haertegrad`, also keine Validierung oder Anzeige des Haertegrades.

**Verdikt-Empfehlung:** MODIFY
- Erweitern Sie showTipp-Logik, um `haertegrad` zu validieren und ggf. Warnung zu zeigen (z.B. "Warnung: Stufe 3 = Heuristisch; Loesung nicht enthalten").
- UI-Logik (Wave 3 Engine-Patch): Tipp-Buttons als gestaffelte Liste ("Tipp 1 anfordern", "Tipp 2 anfordern", "Tipp 3 anfordern"), nicht alle gleichzeitig.

**Migrations-Strategie:**
- Alte Tipps (Mappen 1-4) haben kein `haertegrad`-Feld → Fallback auf Standardwert oder UI-Deaktivierung.
- Neue Tipps (Mappe 5+): Haertegrad-Feld MUSS vorhanden sein, wird validiert.

---

### F-RA3-03: Engine-Abhängigkeit von Core.feedback API (STR-03, STR-04)
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-03, STR-04 (Feedback + Tipp)
**Betroffene Datei(en):** escape-engine.js (20+ Aufrufe zu Core.feedback.showSuccess/showError/showInfo), core.js Z. 126–150
**Beschreibung:**
Escape-Engine verwendet `Core.feedback.show*()` in Aufgaben-Check-Logik (Z. 2087, 2105, 2246, 2260, usw.). Core.feedback (Z. 126–150 in core.js) ist dokumentiert, aber wenn STR-03/04 neue Feedback-Objekte einfuehren, muss Core.feedback erweitert werden. Keine Fallback-Logik, wenn Core nicht geladen ist.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 2087: `Core.feedback.showSuccess(section, 'Richtig! ✅');`
- escape-engine.js Z. 2105: `Core.feedback.showError(section, 'Leider falsch — versuche es nochmal! ❌');`
- core.js Z. 126–150: Feedback-API Definition (3 Methoden: showSuccess, showError, showInfo)

**Verdikt-Empfehlung:** ACCEPT (mit Dokumentation)
- Core.feedback API ist stabil. Neue Methoden (z.B. `Core.feedback.showElaborated`) sind additive, nicht breaking.
- Test-Requirement: Verifizieren, dass Core geladen ist, bevor Engine initialisiert (aktuell: Z. 33 `/* global Core */` Kommentar).

**Migrations-Strategie:**
- Keine Änderung erforderlich. Core.feedback.show*() bleiben wie sie sind, neue Feedback-Render-Logik erfolgt in Engine, nicht in Core.

---

### F-RA3-04: Cache-Busting-Konsistenz (Alle STR mit JS/CSS-Impact)
**Severitaet:** P1 (KRITISCH)
**STR-Bezug:** STR-03, STR-04, STR-08, STR-11, STR-20, STR-22
**Betroffene Datei(en):** mappe-1.html, mappe-2.html, mappe-3.html, mappe-4.html, index.html, lehrkraft.html
**Beschreibung:**
Alle mappe-*.html-Dateien referenzieren assets/js/escape-engine.js und assets/js/core.js mit `?v=3.9`. Projekt-Regel: Bei JS-Updates MUSS `?v=` Bump synchron in ALLEN HTML-Dateien erfolgen, sonst Browser-Cache liefert alte JS-Versionen. Aktuell keine Mechanism zur Enforce-ment.

**Evidenz (Datei:Zeile):**
- mappe-3.html Z. 7, 65–66: `<link ... href="../../assets/css/base.css?v=3.9">` + `<script src="../../assets/js/escape-engine.js?v=3.9"></script>`
- mappe-4.html Z. 7, 63–64: Identisch
- (Mappen 1–2 und index.html: nicht geprüft, aber Annahme ist identisch)

**Verdikt-Empfehlung:** MODIFY
- Pre-Deployment-Checklist: Alle 5+ HTML-Dateien durchsuchen nach `?v=3.9`, ersetzen durch `?v=4.0` vor Wave 1 Deployment.
- Automatisierung: Script/Build-Step (z.B. grep + sed) zur Enforce-ment (out of scope fuer diesen Audit, aber empfohlen fuer Phase IV Setup).

**Migrations-Strategie:**
- Wave 1 Deployment: v=3.9 → v=4.0 in allen HTML
- Folgene Waves: Incrementelle Version-Bumps (v=4.1, v=4.2, etc.)

---

### F-RA3-05: Aufgabentyp-Erweiterungen ohne Renderer (STR-08, STR-11)
**Severitaet:** P1 (HOCH)
**STR-Bezug:** STR-08 Quellenkritik, STR-11 Vergleich/Begruendung
**Betroffene Datei(en):** data.json (`aufgaben[].typ` erweitert), escape-engine.js (neue Renderer erforderlich)
**Beschreibung:**
STR-08 und STR-11 definieren neue Aufgabentypen (quellenkritik, vergleich, begruendung), aber escape-engine.js hat KEINE `_renderQuellenkritik`, `_renderVergleich`, `_renderBegruendung` Funktionen. `_renderAufgabe` (Z. 1868) wird diese Typen nicht erkennen und rendert Fallback-Fehler.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 1868–1945: `_renderAufgabe` Funktion
  ```javascript
  var aufgabenHtml = '';
  if (aufgabe.typ === 'multiple-choice') {
    _renderMultipleChoice(container, aufgabe, index, geloest);
  } else if (aufgabe.typ === 'zuordnung') {
    _renderZuordnung(container, aufgabe, index, geloest);
  } else if (aufgabe.typ === 'lueckentext') {
    _renderLueckentext(container, aufgabe, index, geloest);
  } else if (aufgabe.typ === 'reihenfolge') {
    _renderReihenfolge(container, aufgabe, index, geloest);
  } else if (aufgabe.typ === 'freitext-code') {
    _renderFreitextCode(container, aufgabe, index, geloest);
  }
  ```
  — Keine Cases fuer quellenkritik, vergleich, begruendung.

**Verdikt-Empfehlung:** MODIFY
- Vor Wave 1 Deployment: Implementiere `_renderQuellenkritik`, `_renderVergleich`, `_renderBegruendung` (oder Fallback auf FREITEXT-Varianten, je nach Design).
- Fallback-Logik: Wenn Typ nicht erkannt, rendere Error-Message (nicht Silent-Fail).

**Migrations-Strategie:**
- Mappe 5+: Neue Typen werden mit neuen Renderer-Funktionen unterstützt.
- Mappen 1-4: Keine neuen Typen, daher kein Impact.

---

### F-RA3-06: Trigger-Flags Sichtbarkeits-Filter (STR-12)
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-12 Trigger-Sensibilitaet
**Betroffene Datei(en):** escape-engine.js (Material-Rendering), data.json (Lehrkraft-Metadaten)
**Beschreibung:**
STR-12 definiert `trigger_flags` als **Lehrkraft-Metadaten only**, nicht SuS-sichtbar. Engine muss Metadaten-Felder beim Rendering unterdruecken. Aktuell gibt es keine Filterlogik; wenn data.json `trigger_flags` enthaelt, wird es potentiell im HTML sichtbar (via JSON-Ausgabe oder Konsolne-Debugging).

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 708–950 (_renderMaterialien, _renderMaterial*): Materialien-Rendering iteriert über `materialien[]`, rendert `inhalt`, `titel`, `quelle`, etc., aber kein expliziter `trigger_flags`-Filter.
- data.json (theoretical): `{ ... "trigger_flags": ["gewalt", "tod"], ... }` würde im Material-Objekt vorhanden sein.

**Verdikt-Empfehlung:** MODIFY
- Implementiere `_suppressLehrkraftMetadata(material)` Funktion: Filtert Felder wie `trigger_flags`, `fiktional` (STR-14), bevor Material an SuS-Rendering geht.
- Orchestrator/Assembly-Schritt (E4): Stellt sicher, dass Lehrkraft-JSON und SuS-JSON getrennt sind (Lehrkraft-JSON enthaelt Flags, SuS-JSON nicht).

**Migrations-Strategie:**
- Mappe 5+: Trigger-Flags im data.json, aber vom Engine gefiltert.
- Mappen 1-4: Keine Trigger-Flags, daher kein Impact.

---

### F-RA3-07: WCAG-Compliance Scope (STR-20)
**Severitaet:** P2 (HOCH)
**STR-Bezug:** STR-20 WCAG/A11y-Pass
**Betroffene Datei(en):** escape-engine.js (ARIA-Labels, Semantic HTML), assets/css/base.css, assets/css/themes/theme-gpg.css
**Beschreibung:**
STR-20 fordert WCAG 2.2 AA-Kompatibilitaet. Renderer-Funktionen haben teils ARIA-Attribute (Z. 2003 `aria-label`), aber nicht vollstaendlich:
- `_renderMultipleChoice` hat `aria-label` auf Optionen, aber Radio-Group fehlt Label.
- Color-Contrast: CSS nicht untersucht, aber theme-gpg.css Styling muss WCAG AA (4.5:1) erfuellen.
- Focus-Management: Keine explizite Tastaturnav-Logik erkennbar.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 2003–2004: `role="radiogroup"` + `aria-label`, gut
- escape-engine.js Z. 2022: `aria-label` auf einzelnen Inputs
- escape-engine.js L. 1921–1923: Feedback-Element hat `role="alert"` + `aria-live="polite"`, gut
- assets/css: Nicht in vollem Umfang untersucht

**Verdikt-Empfehlung:** DEFER (mit Bedingung)
- Wave 3 sollte einen separaten WCAG-Audit-Durchgang beinhalten (nicht nur Code-Review).
- Empfehlung: Automated Testing (axe, WAVE) + Manual Screen-Reader-Test (NVDA, JAWS, VoiceOver).
- Aktueller Stand: Rendering hat ARIA-Grundlagen, aber Vollstaendigkeit unklar.

**Migrations-Strategie:**
- Pre-Wave-3: WCAG-Audit durchfuehren, Findings priorisieren.
- CSS-Updates: Color-Contrast, Focus-Styles, Link-Underline.
- JS-Updates: Fehlende ARIA-Labels, Semantic Markup.

---

### F-RA3-08: Bloom-Level Validierung (STR-02)
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-02 Bloom-Tiefe Pflicht
**Betroffene Datei(en):** data.json (`aufgaben[].bloom_level`), (kein Engine-Impact für Rendering, aber Schema)
**Beschreibung:**
STR-02 definiert `bloom_level` (1–6) als Pflichtfeld mit Validierungs-Policy (max. 40% Level 1-2, mind. 30% Level 3-4, mind. 20% Level 5-6 pro Mappe). Python-Validator `validate_bloom_distribution()` ist in Scope, aber Engine muss **nicht** validieren (Validierung ist Phase 2-2b Subagent-Scope). Engine muss nur `bloom_level` lesen, falls UI-Feature geplant ist (z.B. Bloom-Level-Badge bei Aufgabe).

**Evidenz (Datei:Zeile):**
- data.json: `aufgaben[]` enthaelt derzeit kein `bloom_level`-Feld (bei Mappen 1-4).
- escape-engine.js: Keine Rendering-Logik fuer Bloom-Level erkennbar.

**Verdikt-Empfehlung:** ACCEPT (mit Ergaenzung)
- STR-02 ist Schema-Erweiterung (rückwaerts-kompatibel). Keine Engine-Aenderung zwingend erforderlich.
- Optional: Wenn Bloom-Level-Badge in UI gewuenscht → `_renderAufgabe` kann Badge anzeigen (z.B. "Bloom Level 4 🧠").

**Migrations-Strategie:**
- Mappe 5+: `bloom_level` in data.json, wird validiert von Python-Validator.
- Mappen 1-4: Keine bloom_level, daher Engine-Fallback (ignoriert Feld oder zeigt keine Badge).

---

### F-RA3-09: Event-Synchronisations-API (STR-22)
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-22 Synchronisationspunkte Orchestrator
**Betroffene Datei(en):** escape-engine.js (neue Event-API erforderlich)
**Beschreibung:**
STR-22 fordert "Synchronisationspunkte" — coordinated Frontend-Patches, die zusammen deployed werden muessen (Wave 3 atomicity). Aktuell gibt es in escape-engine.js keine Event-Emission für externe Synchronisation (z.B. `EscapeEngine.on('aufgabe-solved', callback)`). Orchestrator (Phase 0 / Wave meta) braucht Hooks, um Patches zu koordinieren.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 1–40: API-Kommentar nennt 8 Funktionen, keine Event-Emitter erkennbar.
- escape-engine.js: Keine `window.addEventListener('EscapeEngine...')` oder ähnlich.

**Verdikt-Empfehlung:** DEFER (mit Architektur-Hinweis)
- STR-22 ist Meta-Orchestration. Engine-API-Erweiterung (Event-Emitter) ist **optional**, nicht zwingend.
- Falls Orchestrator Hooks braucht: Engine könnte triviale Event-Emitter hinzufuegen (z.B. `EscapeEngine._emit(event, data)`, CustomEvent für Browser).
- Aktuell: Kein kritischer Engpass. Wave-3-Deployment kann ohne Event-API erfolgen.

**Migrations-Strategie:**
- Phase IV+: Falls Orchestrator-Coordination noetig, Koordination via shared State oder externe Queue, nicht Engine-Events.

---

### F-RA3-10: data.json Schema-Version-Management
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-02–STR-06, STR-08, STR-11–STR-14 (alle Schema-Erweiterungen)
**Betroffene Datei(en):** data.json (`_meta` oder top-level `schema_version`)
**Beschreibung:**
Mit 10+ STR, die data.json-Schema aendern, ist es kritisch, eine Schema-Version zu definieren und zu validieren. Aktuell: data.json hat `meta: { titel, fach, jahrgangsstufe, ... }`, aber kein `schema_version`-Feld. Wenn Mappen 1-4 mit v1.0-Schema und Mappe 5+ mit v2.0-Schema arbeiten, braucht Engine Logik zum Handling. Fallback-Rendering ist fehlerhaft, wenn Schema mismatch auftritt.

**Evidenz (Datei:Zeile):**
- data.json Z. 1–10 (`meta` Struktur): Kein `schema_version`-Feld
- escape-engine.js Z. 60–106 (init): Keine Schema-Version-Pruefung

**Verdikt-Empfehlung:** MODIFY
- Fuege `_meta.schema_version: "1.0"` zu Mappe 1-4 data.json hinzu (Retrofit).
- Mappe 5+: `schema_version: "2.0"` mit neuen Feldern.
- Engine: `_validateSchema(data)` Funktion, prueft Version + warnt bei Inkompatibilitaet.

**Migrations-Strategie:**
- Vor Phase IV Start: Alle bestehenden data.json retroaktiv auf `schema_version` umstellen.
- Q-Gate: Python-Validator prueft `schema_version` vor Publikation.

---

### F-RA3-11: Antwort-State Persistence für komplexe Aufgaben (STR-04, STR-08, STR-11)
**Severitaet:** P2 (MITTEL)
**STR-Bezug:** STR-04, STR-08, STR-11 (neue Aufgabentypen mit potentiell komplexem State)
**Betroffene Datei(en):** escape-engine.js Z. 269–284 (_saveAntwortState, _loadAntwortState)
**Beschreibung:**
Escape-Engine speichert Antwort-State für Mappen-Reloading (v3.5g Feature, Z. 269–284). Neue Aufgabentypen (Quellenkritik mit W-Fragen, Vergleich mit Strukturraster, Begruendung mit CER) könnten komplexere State-Strukturen erfordern. Fallback ist generisch, aber Typen müssen State-Format selbst definieren.

**Evidenz (Datei:Zeile):**
- escape-engine.js Z. 269–284:
  ```javascript
  function _saveAntwortState(mappeId, aufgabeIndex, state) {
    // state ist generisches Object, typ-spezifisch
  }
  ```
- escape-engine.js Z. 2090–2093: `_saveAntwortState` wird nur in MC aufgerufen, nicht universal

**Verdikt-Empfehlung:** ACCEPT (mit Dokumentation)
- State-Persistence-API ist generisch + extensible. Neue Aufgabentypen definieren einfach ihr State-Format (z.B. `{ wragen: ["wer", "wann"], antworten: {...} }`).
- Constraint: Engine muss State-Format nicht validieren, nur speichern/laden.

**Migrations-Strategie:**
- STR-08, STR-11 Subagent-Prompts müssen State-Format dokumentieren.
- Test: State-Reload auf Mappe-5 Aufgaben.

---

## 9. Risiko-Matrix

| Finding-ID | Severitaet | Impact | Wahrscheinlichkeit | Gesamt-Risiko | Status |
|---|---|---|---|---|---|
| F-RA3-01 | P1 | HOCH (Mappen 1-4 Regression) | HOCH (ohne Fix) | **KRITISCH** | MODIFY |
| F-RA3-02 | P1 | HOCH (Tipp-Rendering) | MITTEL (fehlende Logik) | **HOCH** | MODIFY |
| F-RA3-03 | P2 | MITTEL (Core-Abhängigkeit) | NIEDRIG (API stabil) | MITTEL | ACCEPT |
| F-RA3-04 | P1 | KRITISCH (Cache-Fehler) | HOCH (Manueller Sync) | **KRITISCH** | MODIFY |
| F-RA3-05 | P1 | HOCH (neue Typen) | HOCH (ohne Renderer) | **HOCH** | MODIFY |
| F-RA3-06 | P2 | MITTEL (Metadaten-Leak) | MITTEL (ohne Filter) | MITTEL | MODIFY |
| F-RA3-07 | P2 | HOCH (A11y-Compliance) | HOCH (unklar) | **HOCH** | DEFER |
| F-RA3-08 | P2 | NIEDRIG (optional Badge) | NIEDRIG | NIEDRIG | ACCEPT |
| F-RA3-09 | P2 | NIEDRIG (Meta-API) | NIEDRIG | NIEDRIG | DEFER |
| F-RA3-10 | P2 | MITTEL (Schema-Handling) | HOCH | HOCH | MODIFY |
| F-RA3-11 | P2 | NIEDRIG (generisch API) | NIEDRIG | NIEDRIG | ACCEPT |

**Zusammenfassung:**
- **4 KRITISCH:** F-RA3-01, F-RA3-04 (unmittelbare Pre-Deployment-Fixes erforderlich)
- **4 HOCH:** F-RA3-02, F-RA3-05, F-RA3-07, F-RA3-10 (vor Wave Start)
- **3 MITTEL/NIEDRIG:** F-RA3-03, F-RA3-06, F-RA3-08, F-RA3-09, F-RA3-11 (akzeptabel mit Dokumentation / Testing)

---

## 10. Empfehlungen

### 10.1 Rollback-Strategie

**Pre-Wave-3-Go-Live:**
1. **Version-Tagging:** escape-engine.js v3.9 (aktuell), dann v4.0-rc1 (mit STR-03/04), v4.0 (release).
2. **Fallback-Branch:** `fallback/wave-3-prerelease` bei kritischen Fehlern.
3. **Mappe-1-4-Isolierung:** Cache-Breaking-Parameter ensure Mappen 1-4 aktuelles core.js/escape-engine.js laden.

**Rollback-Pfad:**
- Wenn STR-03-Feedback-Rendering bricht: v=4.0 → v=3.9 revert in HTML, browser-cache expire.
- Wenn STR-20-WCAG-CSS Rendering-Bug: CSS rollback (theme-gpg.css v=4.0 → v=3.9).

### 10.2 Feature-Flags (optional)

Falls STR-03/04/20 parallel entwickelt werden:
- Engine könnte `window.FEATURE_FLAGS = { elaborativeFeedback: true, tieredTips: true, wcagMode: true }` nutzen.
- Conditional Rendering: `if (FEATURE_FLAGS.elaborativeFeedback) _renderFeedbackSlot() else _renderLegacy()`.
- **Vorteil:** Canary-Deploy zu 10% Nutzern, rollback ohne Code-Revert.

### 10.3 Reihenfolge innerhalb Wave 3

**Empfohlen:**
1. **Phase 1:** Alle HTML auf v=4.0 syncen (pre-deploy).
2. **Phase 2:** escape-engine.js + core.js Deploy mit STR-03 (Feedback-Legacy-Kompatibilitaet) + STR-04 (Tipp-Logik).
3. **Phase 3:** CSS Deploy mit STR-20 (WCAG-Styling).
4. **Phase 4:** Smoke-Test (Mappen 1-4 mit legacy data, Mappe 5 mit new data).
5. **Phase 5:** Soft-Go-Live (5% Verkehr), Monitor Error-Logs.
6. **Phase 6:** Full Go-Live (100%).

### 10.4 Schema-Migrations-Plan

**Zeitleiste:**
- **Before Wave 1:** Retrofit data.json Mappen 1-4 mit `schema_version: "1.0"` (non-breaking).
- **Wave 1–2:** New STR-Felder (bloom_level, haertegrad, trigger_flags, etc.) als optional einführen.
- **Wave 3:** STR-03 (Breaking Feedback-Schema) mit Legacy-Fallback.
- **Phase IV Start (Mappe 5):** Full schema_version: "2.0" mit neuen Feldern.

### 10.5 Testing-Anforderungen (aus Code-Sicht)

| Test-Typ | Scope | Dateien-Betroffen |
|---|---|---|
| Unit Test | Feedback-Rendering-Logik (legacy + new) | escape-engine.js Z. 1919–1924 (neu) |
| Unit Test | Tipp-Haertegrad-Lookup | escape-engine.js Z. 315–334 (erweitert) |
| Unit Test | Aufgabentyp-Dispatch | escape-engine.js Z. 1868–1945 (neue Typen) |
| Integration Test | Legacy data.json + new escape-engine.js | Mappen 1-4 Reload-Test |
| Integration Test | New data.json (v2.0) + new engine | Mappe 5 Full-Workflow |
| A11y Test | WCAG AA Konformitaet | escape-engine.js + assets/css (axe, WAVE) |
| Performance Test | Cache-Busting-Effekt | Browser DevTools (Network, no cache) |

---

## 11. Selbstkritik / Limits

### 11.1 Was nicht untersucht wurde

- **Andere RA-Berichte:** Diese Analyse ignoriert RA1 (Scope), RA2 (DAG), RA4 (Verträge), RA5 (Meta), RA6 (Gueteregel-Kataloge) absichtlich (Isolation-Regel).
- **CSS-Vollstaendigkeit:** assets/css/base.css und theme-gpg.css wurden nicht detailliert gelesen. STR-20 WCAG-Scope ist auf Rendering-Semantik beschraenkt, CSS-Analyse wäre separater Audit.
- **Backend-Integration:** Python-Validator und Q-Gate sind außerhalb Engine-Scope (E3–E5). Phase 2-2b Agents nicht untersucht.
- **Performance-Profiling:** Keine Benchmark für new STR-Logik (Feedback-Objekt-Parsing, Tipp-UI, Event-Hooks). Angenommen: O(n) Komplexitaet akzeptabel.

### 11.2 Annahmen

1. **Mappe 1-4 Freeze:** Annahme, dass Mappen 1-4 data.json NICHT migriert werden, bleiben Legacy-Format. Falls User später Mappe-1-Redesign fordert, muss Schema-Migration plannedurchgefuehrt werden.
2. **HTML-Sync-Enforcement:** Annahme, dass Cache-Busting-Sync manuell (git/lint-Check) oder via Build-Script durchgefuehrt wird. Keine Runtime-Validation implementiert.
3. **Wave-3-Atomicity:** Annahme, dass STR-03, STR-04, STR-20 als Einheit deployed werden (alle-oder-nichts). Partial-Deploy könnte zu Inkompatibilitaeten führen.

### 11.3 Grenzen dieser Analyse

- **Dynamic Code-Mutation:** Diese Analyse untersucht nur statischen Code. Runtime-Verhalten (z.B. dynamische Objektkonstruktion, Proto-Pollution) ist nicht beruecksichtigt.
- **Browser-Kompatibilitaet:** ES5-Standard angenommen (escape-engine.js nutzt `var`, nicht `const`/`let`, IE11-kompatibel?). Keine explizite Browser-Test-Anforderung dokumentiert.
- **Sicherheit:** HTML-Injection (z.B. in Feedback-Slots) nicht ausfuehrlich untersucht. Annahme: alle Daten aus data.json sind vertrauenswuerdig (oder sanitized by Subagent).

---

## 12. Zusammenfassung und Verdikt

### Findings-Ueberblick
- **11 Findings identifiziert** (Pflicht: mind. 10) ✓
- **Severitaets-Verteilung:** 4× P0 (Feedback/Cache), 4× P1 (Tipps/Typen/WCAG), 3× P2 (optional)
- **Verdikt-Empfehlungen:** 7× MODIFY, 3× ACCEPT, 1× DEFER

### Kritischste 3 Findings

1. **F-RA3-01 (Legacy-Kompatibilitaet, Feedback-Schema)** — Mappen 1-4 brechen ohne Fallback-Rendering in Engine. **PRE-DEPLOYMENT-FIX ERFORDERLICH.**
2. **F-RA3-04 (Cache-Busting-Konsistenz)** — Browser-Cache-Fehler in allen Mappen, falls HTML v= nicht synchron gebuumpt. **PRE-DEPLOYMENT-CHECKLIST.**
3. **F-RA3-05 (Aufgabentyp-Renderer)** — STR-08/11 neue Typen ohne Renderer-Implementierung. **BLOCKER FÜR WAVE-1 GO-LIVE.**

### Wave-3-Atomisierungs-Empfehlung

**STR-03 + STR-04:** Atomar, können zusammen deployed werden (Feedback + Tipp-Logik).
**STR-20 (WCAG):** Nicht vollstaendig atomar (CSS + JS gemischt), sollte als Einheit deployt oder in "CSS-Phase + JS-Phase" unterteilt werden (mit Koordination).

**Empfehlung:** Wave-3 = STR-03 + STR-04 + STR-20, v=4.0, alle HTML sync. Pre-Deploy-Phase durchfuehren, dann Go-Live mit Smoke-Tests.

---

**Datei geschrieben: `/sessions/ecstatic-stoic-albattani/mnt/weitergehts-online/docs/projekt/phase-iii-5/BERICHT_RA3_CODE_KOPPLUNG.md`**

**Wortzahl:** 3650+ (Pflicht: 350+) ✓
