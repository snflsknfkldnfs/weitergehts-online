# Skript-Ebene — Evaluation & Optimierungs-Plan

**Bezug:** `staatsexamen/schulrecht/skripts/mp05/` (mkdocs-material Build) · Referenz für alle MP_xx-Skripte.
**Bezug-Spec:** `handoff/01-spec/RESTYLING.md` (L1–L3 Disziplin liegt fest — Skript-Ebene fehlt noch).
**Stand:** Mai 2026

---

## 0 · Verortung

Die Redesign-Spec adressiert **drei Ebenen** (L1 Hub · L2 Bereichsindex · L3 Themenfeld-Detail). Die **Skript-Ebene (L4)** — die eigentliche Lese- und Abruf-Oberfläche — ist bislang ungeregelt und wird vom mkdocs-Material-Default gerendert. Dieses Dokument ergänzt die fehlende L4-Disziplin.

---

## 1 · Befund

Inhaltlich ausgezeichnet (Wortlaut-Anker · Falle-Atlas · Reviewer-D-Pflichtfragen · Master-Fehlerliste · Karten-IDs zum Lerndeck). **Die Lese-Oberfläche bekämpft den eigenen Inhalt:** die Default-Rendering-Pipeline behandelt MP_05 als Referenztext, während das Material in Wahrheit ein aktives-Abruf-Werkzeug ist.

Symptomatisch:
- Die wertvollsten Lern-Assets (Top-8 · Falle-Atlas · Fallbeispiele) liegen unter ~1.500 Wörtern Vertiefungs-Stoff.
- Inline-Glossar-Expansion (`SuS (Schülerinnen und Schüler)`) erscheint 50+ Mal pro Seite.
- Norm-Tooltips tragen 250+ Zeichen Wortlaut im DOM — ein Argument zu folgen wird zur Mikro-Lektüre.
- Drei Mermaid-Diagramme mit Pastell-Palette brechen die Olive-Mono-Disziplin aus Spec §1/§2.
- Status/Lernstand existiert auf L1–L3, **nicht** auf der Ebene, wo der Lernakt stattfindet.

---

## 2 · 12 konkrete Schwachstellen

| # | Beobachtung | Kognitive Kosten |
|---|---|---|
| 1 | Inline-Expansion bei jedem Vorkommen („SuS (Schülerinnen und Schüler)") | Reading-Flow zerschossen; WM durch Re-Parsing belastet |
| 2 | Norm-Tooltips mit Volltext-Wortlaut im DOM, 8× pro Norm | Reader zu Mikro-Lektüre gezwungen statt Argument-Folgen |
| 3 | Mermaid-Pastell-Palette bricht Token-System | Zweite parallele Farb-Hierarchie ohne Bedeutung |
| 4 | Norm-Kartografie doppelt (Mermaid + Tabelle) | Attention-Split, doppelter Scroll, kein Informations-Gewinn |
| 5 | „In aller Kürze" = 11 Zeilen mit 14 Norm-Tags | Kein 5-Sek-Wiedereinstieg möglich |
| 6 | Reihenfolge A→B→C→D ist akademisch, nicht prüfungsdidaktisch | Test-Effekt-Material ist am Seitenende |
| 7 | Nur 4 von 10 Fallen sind Click-to-Reveal | Lese-Illusion statt Retrieval-Praxis |
| 8 | Kein Status pro Sub-Block / Karte / Falle | Keine Lern-Selbst-Diagnose im Detail |
| 9 | Norm-Interaktion: mkdocs-Tooltip (Skript) vs. Slideover (L3) | Zwei Interaktionsmodelle für gleiche Daten |
| 10 | TOC rechts nur 2 Punkte tief, kein Scroll-Spy | Keine Orientierung; Falle-Atlas unsichtbar |
| 11 | Kein Print-Pfad → 12 A4 statt 1 A4 | Lernende kopieren manuell zusammen |
| 12 | Karten-IDs als Plain-Text-Links | Kontext-Wechsel Skript ↔ Lerndeck |

---

## 3 · 9 Optimierungen — nach Hebel sortiert

### P0 — Sofort-Wirkung, niedriger Aufwand

**1. Inline-Expansion abschalten, Glossar zentralisieren.**
Erste Nennung ausgeschrieben. Danach Kurzform mit 1 px gestricheltem Underline. Hover/Tap öffnet denselben **Glossar-Slideover** wie in L3 (Spec §4). Single Source of Truth: `normen-glossar.md`.

**2. Norm-Tooltips abschalten, Norm-Tag stilisieren.**
Wortlaut nicht inline im DOM. Wortlaut wandert in den Slideover (Tab „Wortlaut"). Norm-Tag wie Spec §4 (Mono 10.5 px · 1 px-Border · kein Background).

**3. Mermaid neutralisieren oder ersetzen.**
Drei Diagramme auf MP_05 (Norm-Kartografie · Rechte-Trias · SMV-Organe) in HTML-Layout mit Token-System nachbauen. Norm-Kartografie nur einmal — Tabelle behalten, Mermaid streichen. ~80 kB JS raus.

### P1 — Information Architecture

**4. Reihenfolge umkehren zu Test-Effekt-First.**

```
Header
  └─ In aller Kürze (3 Sätze, KEINE Inline-Normen)
  └─ Norm-Kartografie (5-zeilige Liste, klickbar)
  └─ Pflichtwissen (Top-8 als 4×2-Karten, Tap-to-Reveal)
  └─ Falle-Atlas (ALLE 10 als Click-to-Reveal)
  └─ Fallbeispiele (Sachverhalt offen, Knackpunkte + Lösung collapsed)
  └─ Vertiefung (was jetzt „Teil A" ist — collapsed-by-default)
```

Begründung: 7-Tage-Endspurt-Sitzungen leben von B/C/D. Wer A braucht, klappt es auf.

**5. „In aller Kürze" auf 4 Sätze, 0 Inline-Normen.**
Aktuell ~280 Wörter / 14 Norm-Tags. Ziel: 60–80 Wörter / 0 Tags. Funktion: Wiedereinstieg < 10 Sek.

### P2 — Lerngerüst sichtbar machen

**6. Status-Dots pro Sub-Block + pro Karte + pro Falle.**
LocalStorage `wg.skript.<mp>.<id>` mit den vier Stati aus Spec §3:
- Sub-Block-Header (A.1/A.2/A.3/A.4): Dot + Mono-Cap-Status.
- Jede Top-8-Karte: Dot rechts oben.
- Jede Falle: Dot ganz links.
- Tastatur: `J` sitzt · `K` wiederholt · `L` in Arbeit · `H` offen.
- Aggregation in Sticky Mini-TOC: „A.1 · 3/5 sitzen · 1 wackelt".

**7. Sticky Mini-TOC rechts mit Scroll-Spy + Status-Aggregat.**
mkdocs-Material-Default-TOC erweitern: aktiver Block highlighted · Stacked-Status-Bar (6 px, Spec §3) pro Section · Sprung-Anker zu Top-8/Falle-Atlas/Fälle prominent.

### P3 — Aktiver Abruf integrieren

**8. Top-8 + Falle-Atlas + Fallbeispiele als Reveal-Komponenten.**

| Block | Aktuell | Neu |
|---|---|---|
| Top-8 K07–K33 | Stichpunkt-Liste, alles offen | Flip-Karte: Frage vorne, Auflösung hinten |
| Falle-Atlas | Tabelle aller 10 offen | Alle 10 als „Frage·Antwort"-Akkordeon |
| Fallbeispiele | Sachverhalt + Knackpunkte + Antwortkette offen | Sachverhalt offen · Knackpunkte hidden · Antwortkette hidden |

Karten-Preview im Slideover: Klick auf `K07` öffnet Anki-Karten-Vorderseite im selben Sheet wie das Glossar.

### P4 — Form/Funktion-Hygiene

**9. `@media print` für 1-A4-Spickzettel.**
Drucken-Knopf im Header → Print-CSS blendet Vertiefung aus, behält: Header · In aller Kürze · Norm-Kartografie · Top-8 · Falle-Atlas. Löst die offene Frage aus Spec §9.

---

## 4 · Was *nicht* anfassen

- **Inhalt** (Wortlaut-Anker, Reviewer-D-Pflichtfragen, Master-Fehlerliste, Cross-Refs) — der USP gegen jedes Verlags-Skript.
- **ZALGM-Header + Schwerpunkt-Marker** oben (5.1 · 5.4 ndM · 5.6 SMV) — präzise Orientierung.
- **Falle-Atlas als Konzept** — perfekt prüfungsorientiert, nur Interaktion fehlt.
- **„Direkt zur Karte im Lerndeck"-Ankerleiste** unten — gute Anki-Brücke.

---

## 5 · Wirkungs-Erwartung

| Hebel | ROI |
|---|---|
| P0 #1 Glossar zentralisieren | Hoch — jede Lese-Minute betroffen |
| P0 #3 Mermaid raus | Mittel — visuelle Disziplin |
| P1 #4 Reordering | **Sehr hoch** — Top-8/Fallen/Fälle vor Vertiefung verändert 90 % aller Sitzungen |
| P2 #6 Status pro Sub-Block | **Sehr hoch** — Selbst-Diagnose ist der größte Effekt-Multiplikator |
| P3 #8 Reveal statt offen | Hoch — Test-Effekt direkt im Lese-Werkzeug |

---

## 6 · Migration

1. **Token-Stylesheet** für `staatsexamen/schulrecht/skripts/` (mkdocs Custom-CSS, override Material-Defaults).
2. **Inline-Glossar-Expansion** im Markdown-Pre-Processor abschalten (`mkdocs-glossary` o.ä.) — erstes Vorkommen behalten, danach abkürzen + auf zentrales Glossar verlinken.
3. **Norm-Tag-Komponente** (kleine JS-Klasse, dieselbe wie in L3) — ersetzt mkdocs-Material-Tooltips.
4. **MP_05 als Pilot** umsetzen (größtes Skript, validiert alle Mechanismen). Abnahme.
5. **Reihenfolge-Umstellung + Reveal-Komponenten** in `overrides/main.html` mkdocs-Template, gespeist aus structured-data-Frontmatter.
6. **Status-LocalStorage-Adapter** — derselbe wie L1–L3, gemeinsame Persistenz-Schicht.
7. **Restliche MP_01–MP_09** sukzessive.

---

## 7 · Offene Fragen

- **Lerndeck-Synchron**: soll Status pro Karte (K07) im Skript automatisch aus Anki-Reviews gezogen werden, oder bleibt es eigenständige Selbst-Markierung?
- **Pre-Processor-Hoheit**: Markdown-Source umstellen (sauber, aber invasiv) oder Render-Pipeline patchen (defensiver)?
- **Top-8 / Falle-Atlas — gleiche Quelle wie Anki-Deck?** Falls ja, wären die Karten generiert, nicht manuell gepflegt → Konsistenz garantiert.
