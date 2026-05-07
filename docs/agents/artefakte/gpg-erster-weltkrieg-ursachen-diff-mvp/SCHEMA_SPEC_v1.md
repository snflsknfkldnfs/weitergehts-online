# SCHEMA_SPEC v1 — Differenzierungs-Erweiterung MVP

**Game:** `escape-games/gpg-erster-weltkrieg-ursachen/`
**Backlog-Anker:** STR-09-NEU (Folgeprojekt aus `STR_MUTATIONS_BESCHLUSS.md`), Detail-Spec `UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` Phase v3.5 (Z. 340–388).
**Scope MVP:** Mappen 1–3 (Fokus 2+3), Sprachen DE+RU+AR, KI-Prompt 1 pro Material.
**Ziel:** Unterrichtstest morgen — Hypothese: Sprach- und Verstehens-Differenzierung beschleunigt Erarbeitung und reduziert Frage-Quote an Lehrkraft.

---

## 1. Designentscheidungen (locked)

| Code | Entscheidung | Quelle |
|---|---|---|
| E1 | Material-Volltext bleibt DE. Sprachbutton schaltet **Aufgabenstellungen + Glossar-Erklärungen + KI-Prompt-Sprache**. Bildunterschriften DE. | User-Bestätigung 2026-05-07, didaktisch begründet (Cummins CALP, García Translanguaging) |
| E2 | Glossar inline. Engine wrappt Begriffe automatisch beim Render in `<span class="glossar" data-term="…">`. Touch-tauglich (Tap-Toggle PFLICHT, nicht nur Hover). | User-Bestätigung 2026-05-07 |
| E3 | KI-Prompt-Template mit vollständigem Setting (Lerngruppe, Mappensetting, fachlicher Kontext, Lehrplanziel, sokratische Methode, Reverse Prompting, Antwortverhalten, Sprache). | User-Spec 2026-05-07, ausgelagert in `KI_PROMPT_TEMPLATE.md` |
| E4 | Sprachen MVP: DE (default), RU, AR. UK + TR aufgeschoben. | User-Cut 2026-05-07 |
| E5 | Mappen MVP: 1–3 ausgestattet, Mappe 4 vanilla. Fokus-Mappen für Test: 2+3. | User-Cut 2026-05-07 |
| E6 | Test-Design: Vollausstattung + SuS-Selbstreport am Ende. | User-Bestätigung 2026-05-07 |

---

## 2. Daten-Schema (Erweiterung von `data.json`)

### 2.1 Pro Material — neue Felder

```jsonc
{
  "id": "mat-2-1",
  "...bestehende Felder unverändert...": "...",

  "glossar": [
    {
      "begriff": "Pulverfass",                 // Such-Anker im Material-HTML (case-insensitive, Wort-Boundary)
      "erklaerung": {
        "de": "Ein Fass voll Schießpulver. Wenn ein Funke kommt, explodiert es. Hier: Europa war so gefährlich gespannt, dass schon eine Kleinigkeit Krieg auslösen konnte.",
        "ru": "...",
        "ar": "..."
      }
    }
  ],

  "ki_prompt": {                                // 1 Prompt pro Material, kontext-vollständig (siehe KI_PROMPT_TEMPLATE.md)
    "de": "Du bist Lernbegleiter für eine 7. Klasse Mittelschule Bayern… [Volltext]",
    "ru": "...",
    "ar": "..."
  }
}
```

### 2.2 Pro Aufgabe — neue Felder

```jsonc
{
  "id": "aufgabe-2-1",
  "...bestehende Felder unverändert...": "...",

  "frage_uebersetzung": {                       // Aufgabenstellung übersetzt
    "ru": "...",
    "ar": "..."
  },
  "optionen_uebersetzung": {                    // optional, MC-Optionen übersetzt (kann später ergänzt werden)
    "ru": ["...", "..."],
    "ar": ["...", "..."]
  }
}
```

**Fallback-Verhalten Engine:** Wenn Übersetzung fehlt → deutsche Original-Anzeige + dezente Hinweis-Markierung "(nur DE verfügbar)".

### 2.3 Pro Mappe — neue Felder

```jsonc
{
  "id": "mappe-2",
  "...bestehende Felder unverändert...": "...",

  "verfuegbare_sprachen": ["de", "ru", "ar"]   // steuert Sprachbutton-Sichtbarkeit
}
```

### 2.4 Auf Root-Ebene — neues Feld

```jsonc
{
  "meta": {
    "...bestehende Felder unverändert...": "...",
    "differenzierung_aktiv": true,
    "differenzierung_version": "mvp-v1-2026-05-07"
  }
}
```

---

## 3. Engine-Verhalten (neu)

### 3.1 Sprachbutton

- Position: Header-Leiste rechts, Globe-Icon + aktueller Sprachcode.
- Klick → Dropdown DE/RU/AR.
- Auswahl persistiert in `localStorage.escape_sprache` (pro Game-Origin).
- Wirkung beim Wechsel:
  - Aufgabenstellungen + MC-Optionen → übersetzte Variante anzeigen.
  - Glossar-Tooltip-Texte → übersetzte Erklärung.
  - KI-Prompt-Copy-Button → übersetzten Prompt in Clipboard.
  - **Material-HTML-Volltext bleibt unverändert deutsch** (didaktische Vorgabe, siehe E1).
  - Bei AR: Aufgabenstellungs-Block + Glossar-Tooltip + KI-Prompt-Anzeige in `dir="rtl"` rendern, deutsche Materialien bleiben `dir="ltr"`.

### 3.2 Glossar-Tooltip (Inline)

- Beim Render eines Materials: Engine durchsucht den HTML-Inhalt des Materials nach den `glossar[].begriff`-Einträgen (Wort-Boundary, case-insensitive, erste Vorkommnis pro Begriff). Treffer wird in `<button class="glossar-trigger" data-term="…">…</button>` umgewandelt.
- **Touch + Hover:** Trigger reagiert auf `click`/`tap` UND `mouseenter` (Desktop). Mobile/Tablet PFLICHT-Verhalten:
  - Tap auf Trigger → Tooltip öffnet als Popover unter dem Begriff.
  - Tap außerhalb / zweiter Tap auf Trigger → Tooltip schließt.
  - Kein Hover-only-Pfad (iPad-Constraint).
- A11y: Trigger ist `<button>`, nicht `<span>`. `aria-describedby` verbindet Trigger und Popover. Tooltip per `Esc` schließbar. Fokus-Ring sichtbar.
- Visualisierung des Triggers: dezenter unterstrichener Stil (z. B. `border-bottom: 1px dashed`), erkennbar als interaktiv ohne den Lesefluss zu zerschneiden.

### 3.3 KI-Prompt-Copy-Button

- Position: Pro Material, am Ende des Material-Blocks, eigene Box „KI-Hilfe holen".
- Button: „Prompt für KI-Hilfe kopieren" (Sprache folgt Sprachbutton).
- Funktion: `navigator.clipboard.writeText(material.ki_prompt[currentLang])`.
- Visuelles Feedback: Button-Text wechselt 2 s auf „Kopiert ✓", dann zurück.
- Begleittext unter Button (kurz, 1 Satz): „Füge den Prompt in eine KI deiner Wahl ein und stelle deine Frage."
- Fallback: wenn `clipboard`-API nicht verfügbar → Prompt in `<textarea readonly>` ausgewählt, SuS kopiert manuell.

### 3.4 SuS-Selbstreport-Trigger

- Nach Abschluss von Mappe 3 (oder am Ende des Games) → Aufruf einer Selbstreport-Seite (1 Seite, 5–6 kurze Items, anonym, Daten lokal in localStorage + Lehrkraft kann am Ende sammeln).
- Genaues Format: separate Spec `SELBSTREPORT_BOGEN.md`.

---

## 4. CSS-Anforderungen (Theme `theme-gpg.css`)

| Element | Spec |
|---|---|
| `.glossar-trigger` | `border-bottom: 1px dashed currentColor; cursor: help; background: none; padding: 0; font: inherit;` (Button-Reset) |
| `.glossar-tooltip` (Popover) | Card-Stil passend zum Theme, `max-width: 280px`, `position: absolute`, Pfeil zum Trigger |
| `.ki-hilfe-box` | Eigener Block mit dezentem Akzent (Theme-Sekundärfarbe), klar abgesetzt vom Material |
| `.sprachbutton` | Header-rechts, Globe-Icon (SVG inline) + Code-Label |
| `[dir="rtl"] .aufgabe__frage` | Korrekte RTL-Spiegelung für AR-Aufgabenstellungen |
| Webfont AR | Arabisch lesbar — Fallback-Stack `'Noto Sans Arabic', 'Tahoma', system-ui, sans-serif`. Empfehlung: Noto Sans Arabic via Google Fonts oder lokale Datei. |

---

## 5. Migrations-Plan `data.json`

CC-Aufgabe: pro Mappe 1–3 das bestehende `data.json` erweitern um die in §2 definierten Felder. **Vorhandene Felder NICHT verändern** (keine Frage-Reformulierungen, keine Material-Edits). Cowork liefert die Inhalte als JSON-Patches in `inhalte/mappe-N_diff.json`. CC merged.

Patch-Format (Beispiel):

```jsonc
// inhalte/mappe-2_diff.json
{
  "verfuegbare_sprachen": ["de", "ru", "ar"],
  "materialien": {
    "mat-2-1": {
      "glossar": [ /* … */ ],
      "ki_prompt": { /* … */ }
    }
  },
  "aufgaben": {
    "aufgabe-2-1": {
      "frage_uebersetzung": { /* … */ },
      "optionen_uebersetzung": { /* … */ }
    }
  }
}
```

CC-Merge-Logik: tiefes Merge auf Material-/Aufgaben-IDs.

---

## 6. Pflicht-Tests vor Unterricht

| Test | Erwartetes Verhalten |
|---|---|
| T1 Sprachbutton DE→RU | Aufgabenstellung wechselt, Material bleibt DE |
| T2 Sprachbutton DE→AR | Aufgabenstellungen-Container wird RTL, Material bleibt LTR-DE |
| T3 Hover Desktop | Glossar-Tooltip öffnet bei Mouseenter |
| T4 Tap iPad | Glossar-Tooltip öffnet bei Tap, schließt bei Tap außerhalb |
| T5 Copy KI-Prompt | Clipboard enthält Volltext mit korrekter Sprache |
| T6 Sprache RU+AR + Copy | Clipboard-Inhalt ist in RU bzw. AR |
| T7 Mappe 4 | Keine Differenzierungs-UI sichtbar (vanilla bleibt) |
| T8 Selbstreport | Erscheint nach Mappe 3, Daten landen in localStorage |
| T9 Fallback-Übersetzung fehlt | DE-Original wird mit dezenter Markierung "nur DE" gezeigt, kein Crash |

---

## 7. Out-of-Scope MVP (deferred)

- UK + TR Sprachen
- Mappe 4 Differenzierung
- Tipp-Struktur (B aus Backlog) — bestehende `tipps[]` reichen für MVP
- Persistenz-Backend für Selbstreport (lokal-only reicht)
- Native-Speaker-Review der RU+AR-Übersetzungen (Spotcheck durch Lehrkraft, dokumentiert als Test-Limit)
- Glossar-Mehrfachvorkommen pro Material (MVP: nur erste Treffer-Position)
- A11y-Vollaudit (MVP: minimal aria + keyboard)

---

## 8. Risiken + Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|---|---|---|
| LLM-Übersetzungsfehler RU/AR | hoch | KI-Prompt-Box + Materialien-DE bleiben primär. SuS sieht im Test, dass Übersetzung Hilfe ist, nicht Wahrheit. Selbstreport-Item: „Stimmt die Übersetzung?" |
| RTL-Layout-Bugs | mittel | T2 + T6 in CC-Smoke. CSS-Test: `dir="rtl"` nur für Aufgabenstellungs-Container, nicht für Material-Wrapper |
| Glossar-Wrapping zerstört HTML-Inline-Tags (`<strong>`, `<em>`) | mittel | Engine darf nur Text-Knoten wrappen (DOM-Walker statt Regex auf String). CC-Pflicht. |
| iPad-Tap-Toggle bricht | mittel | T4 explizit. Engine: kein `pointer-events: none`, kein hover-only |
| CC-Run überzieht Zeitfenster | mittel | Cuts: AR weglassen → DE+RU only. Mappe 1 weglassen → nur 2+3. Test trotzdem aussagekräftig. |

---

## 9. Owner-Verteilung

| Artefakt | Owner | Pfad |
|---|---|---|
| Schema-Spec (dieses Dokument) | Cowork | `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SCHEMA_SPEC_v1.md` |
| KI-Prompt-Template | Cowork | `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/KI_PROMPT_TEMPLATE.md` |
| Inhalts-Patches Mappe 1–3 | Cowork (LLM-assistiert, Lehrkraft-Spotcheck) | `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/inhalte/mappe-{1,2,3}_diff.json` |
| Selbstreport-Bogen | Cowork | `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SELBSTREPORT_BOGEN.md` |
| CC-Handoff-Prompt | Cowork | `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/CC_HANDOFF_PROMPT.md` |
| Engine-Patch + CSS-Patch + data.json-Merge | CC (via osascript headless cc-launch.sh) | `assets/js/escape-engine.js`, `assets/css/themes/theme-gpg.css`, `escape-games/gpg-erster-weltkrieg-ursachen/data.json` |
| Smoke-Tests T1–T9 | CC im Run, Lehrkraft Re-Verify | Ergebnis in `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-diff-mvp/SMOKE_TEST_LOG.md` |

---

**Status:** v1 LOCKED 2026-05-07. Änderungen nach diesem Punkt erfordern Cuts (Spec freezen, sonst Deadline gefährdet).
