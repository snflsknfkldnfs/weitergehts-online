# Handoff · MP_05-Skript-Redesign · V2 Werkbank

**Adressat:** Claude Code (oder menschlicher Implementierer mit Repo-Zugriff).
**Auftraggeber:** Paul Cebulla · weitergehts.online · 2. Staatsexamen MS Bayern.
**Auftrag in einem Satz:** Setze die in der Referenz `reference-mock/` gezeigte Skript-Ansicht (Variante **V2 Werkbank**) auf den realen mkdocs-Bestand unter `_mkdocs/docs/mp05/` um, nach dem Patch-Plan in `02-backend-patch-plan.md`.

---

## Inhalt dieses Pakets

| Pfad | Rolle |
|---|---|
| `00-README.md` | Diese Datei |
| `01-evaluation.md` | Was am Ist-Zustand der mkdocs-Skripte lernpsychologisch nicht funktioniert (12 Schwachstellen, 9 Optimierungen, Wirkungs-Ranking). |
| `02-backend-patch-plan.md` | **Verbindliche Implementierungs-Spec.** Konkrete Diffs gegen `mkdocs.yml`, `hooks.py`, `lernraum-override.css`, `lernraum.js`, `mp05/index.md`. Plus Rollout-Reihenfolge in 7 Schritten. |
| `03-offene-fragen.md` | 5 Klärungspunkte, die vor Code-Beginn beantwortet sein müssen. |
| `reference-mock/` | Lauffähiger React-Prototyp der Ziel-Optik (V2). Öffne `index.html` im Browser, scrolle durch alle Sektionen, klick auf Norm-Tags (öffnet Slideover), klick auf Reveal-Karten, klick auf Falle-Akkordeon-Zeilen. **Diese Datei zeigt die Ziel-UX 1:1.** |

---

## Verbindliche Reihenfolge

1. **Lies** `01-evaluation.md` komplett (15 Min).
2. **Öffne** `reference-mock/index.html` im Browser. Interagiere durch jeden Bereich:
   - Header mit ZALGM + Status-Dot + Lerndeck-Box (rechts oben).
   - **In aller Kürze** — 4 Sätze ohne Inline-Normen.
   - **Norm-Kartografie** — 5-zeilige Liste statt Mermaid; jeder Tag öffnet Slideover.
   - **Werkbank** (Hauptlayout):
     - Links: Vertiefung A.1–A.4 mit echtem Stoff (Trias-Bullets, Verfahrensrechte-Tabelle, Notenauskunft-Schema, Spezielle-Verbote-Tabelle, 6 SMV-Rechte, Wahl-Modus, Schülerzeitung-Modi, ⚠ Falle-Admonitions).
     - Rechts (sticky): Aktiv-Abruf-Spalte mit Pflichtwissen (8 Reveal-Karten) · Falle-Atlas (10 Akkordeon-Zeilen) · Fallbeispiele (10 Cards mit verdeckter Lösung).
3. **Lies** `02-backend-patch-plan.md` vollständig (30 Min). Insbesondere §1 (mkdocs.yml-Diff), §2 (3 hooks.py-Rewrites), §3 (CSS-Pattern), §4 (3 JS-Handler).
4. **Stelle** die 5 Fragen aus `03-offene-fragen.md` an Paul und warte auf Antwort, bevor du Code anfasst.
5. **Pilot** auf `_mkdocs/docs/mp05/index.md`. Hol dir Pauls Abnahme.
6. **Roll out** auf MP_01..09, sobald MP_05 freigegeben.

---

## Was bleibt **unverändert**

- **Markdown-Inhalt** der MP_xx-Skripte — Wortlaut-Anker, Falle-Atlas, Reviewer-D-Pflichtfragen, Master-Fehlerliste. Der USP gegen jedes Verlags-Skript.
- **Glossar-Quelle** `includes/normen-glossar.md` im jetzigen `*[KEY]: title — definition`-Pattern. Wird parallel von `hooks.py` und `tools/lernraum/build_glossare.py` konsumiert.
- **Plugin-Inventar** in `mkdocs.yml` (kein neues Plugin, kein `theme.custom_dir`).
- **Lernraum-Tokens** in `lernraum-override.css` (sie sind ja bereits an die L1–L3-Disziplin angeglichen).

## Was sich **ändert**

- **mkdocs.yml** — eine Stelle: `mermaid2.arguments.theme: base` + Token-Variables.
- **hooks.py** — drei zusätzliche Markdown-Pre-Processing-Passes: Section-Kind-Stamp, Sub-Block-Status-Stamp, Top-8-Reveal-Wrap. Code im Patch-Plan.
- **lernraum-override.css** — vier neue Pattern: Section-Reorder via `order`, Vertiefung-Toggle, Reveal-Karten, Print-Stylesheet.
- **lernraum.js** — drei kleine Handler: Vertiefung-Toggle, Reveal-Toggle, Status-Dot-Persistenz.
- **mp05/index.md** — kleine Eingriffe: 10 statt 4 Falle-Cards · Mermaid raus (Tabelle deckt es ab). Alles andere macht hooks.py.

---

## Definition of Done

Alle Punkte auf MP_05 (Pilot) erfüllt:

- [ ] Reihenfolge der Sektionen entspricht V2 (Kürze → Kartografie → Pflichtwissen → Fallen → Fälle → Vertiefung).
- [ ] **Vertiefung Teil A** ist nicht mehr Lese-Default. Per Klick öffnenbar pro Sub-Block.
- [ ] **Top-8** sind Reveal-Karten (Frage vorne, Auflösung beim Klick).
- [ ] **Falle-Atlas** zeigt alle 10 als Click-to-Reveal — keine Tabelle mit offenen Antworten mehr.
- [ ] **Fallbeispiele** sind via `??? example` collapsed-by-default (ist es schon).
- [ ] **Status-Dots** an jedem Sub-Block (H3), an jeder Top-8-Karte, an jeder Falle. Klick zyklt durch offen → in Arbeit → wiederholt → sitzt. Persistenz via localStorage `wg.lernraum.status.<key>`.
- [ ] **Norm-Tags** öffnen Glossar-Slideover (statt mkdocs-Material-Tooltip). Slideover trägt Wortlaut + zugehörige Karten-IDs.
- [ ] **Mermaid** ist visuell beruhigt (Token-Farben) oder entfernt.
- [ ] **Print-Pfad**: 1–2 A4 Spickzettel mit Header · Kürze · Kartografie · Top-8 (aufgedeckt) · Falle-Atlas (aufgedeckt). Vertiefung + Mermaid raus.
- [ ] **Mobile** (< 768 px): zweite Spalte wandert unter die erste; Reveal-Karten 1-spaltig; alle Tap-Targets ≥ 44 px.
- [ ] Lighthouse: Accessibility ≥ 95.

---

## Kontext-Referenz (nicht in diesem Zip — im Repo)

| Pfad im Repo | Rolle |
|---|---|
| `_mkdocs/mkdocs.yml` | Build-Config |
| `_mkdocs/hooks.py` | Norm-Auto-Link-Generator · Eintrittspunkt für die drei neuen Rewrites |
| `_mkdocs/docs/mp05/index.md` | Pilot-Markdown (526 Zeilen) |
| `_mkdocs/docs/includes/normen-glossar.md` | Glossar-Source-of-Truth |
| `_mkdocs/docs/stylesheets/lernraum-override.css` | CSS-Override (Eintrittspunkt für die vier neuen Pattern) |
| `_mkdocs/docs/javascripts/lernraum.js` | JS-Wiring (Eintrittspunkt für die drei neuen Handler) |
| `lerndecks/handoff-redesign/01-spec/RESTYLING.md` | L1–L3 Token-Spec (Skript-Ebene erbt davon) |

---

## Tech-Annahmen

- **Build-Step:** mkdocs-Bereich `_mkdocs/docs/` wird gebaut nach `staatsexamen/schulrecht/skripts/`. Die handgeschriebenen L1/L2/L3-Pages (außerhalb `_mkdocs/`) bleiben unberührt.
- **JS-Stack:** Vanilla JS (`lernraum.js`) — kein React, kein Babel. Der React-Mock in `reference-mock/` ist nur Spec-Spiegel.
- **Browser:** moderne Evergreens. CSS Grid, `:has()`, `aspect-ratio` erlaubt.

---

## Frag-mich-Pakete

Vor Code-Beginn: Punkte aus `03-offene-fragen.md` klären. Nach Schritt 2 (Section-Reorder live): Pilot-Abnahme. Nach Schritt 5 (Vertiefung collapsed): zweite Abnahme. Vor MP_01..09-Rollout: dritte Abnahme.
