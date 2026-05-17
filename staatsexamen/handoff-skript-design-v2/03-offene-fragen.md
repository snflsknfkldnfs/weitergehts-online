# Offene Fragen · vor Code-Beginn klären

Bitte **alle fünf Punkte** vor dem ersten Commit beantworten. Sie betreffen Architektur-Entscheidungen, die später teuer zu drehen sind.

---

## 1 · Section-Reordering — Heuristik vs. Frontmatter

Das Test-Effekt-Reordering (Kürze → Kartografie → Pflichtwissen → Fallen → Fälle → Vertiefung) braucht ein Klassen-Stamp pro `## H2`. Zwei Wege:

**Option A · Heuristik (null-touch für .md)**
`hooks.py` matched H2-Titel gegen eine Tabelle (`'Teil A — Stoff' → 'stoff'`, `'Teil B' → 'pflicht'` …). Kein Eingriff in den 526-Zeilen-Markdown.
Risiko: zerbricht, wenn jemand „Teil B" zu „Top-8" umtitelt.

**Option B · Frontmatter pro .md**

```yaml
---
section_order: [kurz, karto, pflicht, fallen, faelle, stoff, meta]
---
```

`hooks.py` liest das. Robust, aber neue YAML-Pflicht für 9 Markdown-Dateien.

**Frage an Paul:** A oder B?

---

## 2 · Falle-Atlas — Quelle der 10 Reveal-Cards

Aktuell sind in `mp05/index.md` zwei Repräsentationen:
- Tabelle mit allen 10 Fallen (Antworten **offen** sichtbar).
- 4 von 10 zusätzlich als `<div class="falle-card">` (Click-to-Reveal).

Zielzustand: **alle 10 als Reveal-Cards**, keine spoilernde Tabelle mehr.

**Option A · Markdown manuell auf 10 Reveal-Cards erweitern**
6 zusätzliche `<div class="falle-card">`-Blöcke per Hand. Klar, mehr Markdown, Doppelpflege bei Inhaltsänderung.

**Option B · Tabelle behalten, hooks.py generiert die Cards**
`hooks.py` parsed die Falle-Tabelle, baut daraus 10 `<div class="falle-card">`, blendet die Original-Tabelle aus. Single source of truth in der Markdown-Tabelle.

**Frage an Paul:** A oder B?
(Empfehlung B — eine Stelle pflegen, automatisch Reveal-Karten.)

---

## 3 · Mermaid — neutralisieren oder strippen

Auf MP_05 sind drei Mermaid-Diagramme (Norm-Kartografie, Rechte-Trias, SMV-Organe). Pastell-`classDef`s widersprechen der Olive-Mono-Disziplin.

**Option A · Theme:base + classDef-Strip**
`mkdocs.yml` setzt `mermaid2.arguments.theme: base`. `hooks.py` strippt zusätzlich die `classDef`-Zeilen aus den Mermaid-Blöcken. Diagramme bleiben, sehen einheitlich aus.

**Option B · Komplett strippen**
`hooks.py` entfernt die ```mermaid```-Blöcke ganz. Die Tabellen direkt darunter (Norm-Kartografie 5 Ebenen, 6 SMV-Rechte, …) tragen die Info bereits.

**Frage an Paul:** A (Diagramme behalten) oder B (Tabellen reichen)?

---

## 4 · Status-Dots — Anki-Sync oder rein lokal

Lernstand-Dots (offen · in Arbeit · wiederholt · sitzt) pro Sub-Block, pro Top-Karte, pro Falle.

**Phase 1 (sicher):** rein lokal in `localStorage`. Funktioniert offline, kein Server.

**Phase 2 (optional):** lese pro Karte den Anki-Reife-Status aus einem gemeinsamen JSON, das ein lokaler Cron-Job aus deiner Anki-Statistik exportiert. Vorteil: Lernstand im Skript spiegelt automatisch deinen Anki-Stand wider.

**Frage an Paul:** Phase 1 reicht erstmal? Oder Phase 2 von Anfang an mitdenken?

---

## 5 · Glossar-Slideover — Wortlaut-Quelle

`hooks.py` injiziert bei Norm-Vorkommen `<a class="norm-link"><abbr title="WORTLAUT">REF</abbr></a>`. Der Slideover braucht denselben Wortlaut, aber tiefer (Abs.-Struktur, Beispiele).

**Option A · Title-String wiederverwenden**
`lernraum.js` liest den `<abbr title>` aus und zeigt ihn im Slideover. Eine Quelle, sofort live. Wortlaut bleibt auf 250 Zeichen begrenzt (mkdocs-Material rendert title als kompakten Tooltip).

**Option B · Slideover aus `assets/data/glossar-norm.json` ziehen**
Tieferer Inhalt möglich (Wortlaut komplett, plus Reviewer-D-Notiz, plus verwandte Fallen, plus Karten-IDs). `lernraum.js` lädt das JSON beim Page-Load.

**Frage an Paul:** A reicht oder B von Anfang an?
(Empfehlung B — mehr Tiefe im Slideover lohnt sich, JSON ist eh schon Build-Artefakt.)

---

## Bonus · 4 nice-to-have-Punkte, die ich allein entscheide

Wenn ihr nichts dazu sagt, gehe ich so vor:

1. **Sticky Mini-TOC rechts** auf Desktop, **ausgeblendet** auf < 1024 px.
2. **Reveal-Karten-Animation:** `transition: opacity .2s`, kein Layout-Shift, keine Flip-Animation (zu spielerisch).
3. **Status-Dot-Position auf Top-Karten:** rechts oben in der Karte, nicht links neben dem Titel (sonst kollidiert mit der Mono-ID).
4. **Drucken-Knopf** im Header rechts, neben der Lerndeck-Box. Kein Hauptmenü-Item.
