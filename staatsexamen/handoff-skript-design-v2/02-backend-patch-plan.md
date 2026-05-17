# Skript-Ebene · Backend-Patch-Plan

**Bezug:** `handoff/06-skript-evaluation.md` (was) → `mp05-skript-mocks.html` (wie sehen) → dieses Dokument (was im Repo geändert wird).
**Stack-Kontext:** mkdocs-material default · `pymdownx.details` · `attr_list` · `md_in_html` · `pymdownx.superfences` · `mermaid2` · `hooks.py` (Norm-Auto-Link) · `lernraum-override.css` + `lernraum.js`.
**Stand:** Mai 2026

---

## 0 · Headline

Alle Mechaniken aus der Evaluation lassen sich umsetzen, **ohne neue Plugins** und **mit minimalen Markdown-Eingriffen**. Die vorhandenen Primitive reichen:

| Mechanik | Primitive vorhanden? | Pfad |
|---|---|---|
| Reveal-Karten (Top-8 + Falle-Atlas) | `md_in_html` + `attr_list` | CSS + JS auf bestehende `<div class="falle-card">`-Konvention erweitern |
| Click-to-Reveal Fallbeispiele | `pymdownx.details` (`??? example`) | bereits aktiv — nur Styling angleichen |
| Norm-Slideover | `hooks.py` + `lernraum.js` | bereits aktiv — Wortlaut aus `abbr`-title in Sheet ziehen statt Tooltip |
| Status-Dots pro Sub-Block | `attr_list` + JS | neuer `data-status-key`-Stamp in `hooks.py` |
| Section-Reordering | CSS `order` | section-kind-Marker in `hooks.py` |
| Mermaid neutralisieren | `mermaid2.theme`-Override | ein Config-Eintrag in `mkdocs.yml` |
| Print-Pfad | `@media print` | nur CSS |

**Keine neuen Plugins. Kein `theme.custom_dir`. Glossar-Format bleibt.**

---

## 1 · `mkdocs.yml` — Diff

Nur eine Erweiterung: Mermaid-Theme auf Token-Palette zwingen.

```yaml
plugins:
  - search:
      lang: de
  - mermaid2:
      version: 10.9.1
      arguments:                       # ← NEU
        theme: base
        themeVariables:
          fontFamily: "'Inter Tight', sans-serif"
          primaryColor: "#ffffff"
          primaryTextColor: "#0c0c0a"
          primaryBorderColor: "#4a5d3b"
          lineColor: "#6b685f"
          secondaryColor: "#fafaf6"
          tertiaryColor: "#ffffff"
          background: "#fafaf6"
```

→ Setzt alle Mermaid-Diagramme auf das Olive-Mono-Token-System. Die `classDef`-Pastell-Klassen in den `.md`-Quellen werden dadurch nicht mehr durchgereicht (Mermaid theme:base ignoriert classDef-Farben standardmäßig, oder du strippst sie in `hooks.py` — siehe §5).

**Keine** weiteren `markdown_extensions` nötig. `pymdownx.details` reicht für Reveal; `attr_list` reicht für Status-Stamps; `md_in_html` reicht für Falle-Cards.

---

## 2 · `hooks.py` — drei Rewrites

`hooks.py` macht bereits Markdown-Pre-Processing für Norm-Auto-Link. Drei zusätzliche Passes (alle in **`on_page_markdown`** vor dem Render-Step):

### 2.1 Section-Kind-Stamp (für CSS-Reorder)

```python
import re

SECTION_KINDS = {
    'In aller Kürze':       'kurz',
    'Norm-Kartografie':     'karto',
    'Teil A — Stoff':       'stoff',
    'Teil B':               'pflicht',
    'Teil C':               'fallen',
    'Teil D':               'faelle',
    'Querverweise':         'meta',
    'Quellen':              'meta',
}

def stamp_section_kinds(markdown: str) -> str:
    """Tagged jede H1/H2 mit {.section-kind-X} attr_list.
    Damit kann CSS via `section:has(>h2.section-kind-pflicht)` reordern."""
    def repl(m):
        level, title = m.group(1), m.group(2).strip()
        kind = next((v for k, v in SECTION_KINDS.items() if title.startswith(k)), None)
        if not kind:
            return m.group(0)
        return f"{level} {title} {{.section-kind-{kind}}}"
    return re.sub(r'^(#{1,2})\s+(.+)$', repl, markdown, flags=re.M)
```

### 2.2 Sub-Block-Status-Stamp (für JS-Persistenz)

```python
def stamp_subblock_status(markdown: str, slug: str) -> str:
    """Hängt an jede H3 ein `{data-status-key="<slug>.<subblock>"}` attr_list.
    lernraum.js liest das aus und rendert den Status-Dot."""
    def repl(m):
        title = m.group(1).strip()
        sb_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        return f"### {title} {{data-status-key=\"{slug}.{sb_slug}\"}}"
    return re.sub(r'^###\s+(.+)$', repl, markdown, flags=re.M)
```

→ MP_05 bekommt automatisch `data-status-key="mp05.rechts-trias"`, `data-status-key="mp05.spezielle-verbote"` etc. Persistenz dann via `localStorage` (`wg.lernraum.status.<key>`) in `lernraum.js`.

### 2.3 Top-8 → Reveal-Karten

Die `<div class="grid cards">`-Blöcke in Teil B sollen Reveal-Verhalten bekommen. Statt Markdown zu ändern, wrappt `hooks.py` jeden Listenpunkt:

```python
def wrap_top8_reveal(html: str) -> str:
    """Im 'pflicht'-Bereich jede grid-cards-Karte mit data-reveal stempeln.
    Aufruf in on_page_content nach Markdown→HTML."""
    if 'section-kind-pflicht' not in html:
        return html
    return re.sub(
        r'(<div class="grid cards"[^>]*>)([\s\S]*?)(</div>\s*<p>🃏)',
        lambda m: m.group(1) + _wrap_li(m.group(2)) + m.group(3),
        html, count=1,
    )

def _wrap_li(inner: str) -> str:
    return re.sub(
        r'<li>([\s\S]*?)</li>',
        lambda m: f'<li class="reveal-card" data-reveal="closed">{m.group(1)}</li>',
        inner,
    )
```

→ Keine `.md`-Änderung in MP_01..09. Die Reveal-Mechanik schaltet sich nur in Teil B ein.

### 2.4 Hook-Registrierung

```python
def on_page_markdown(markdown, page, config, files):
    markdown = stamp_section_kinds(markdown)
    markdown = stamp_subblock_status(markdown, page.url.strip('/').split('/')[-1] or 'index')
    # ...vorhandene Norm-Auto-Link-Logik...
    return markdown

def on_page_content(html, page, config, files):
    html = wrap_top8_reveal(html)
    return html
```

---

## 3 · `lernraum-override.css` — drei Pattern

### 3.1 Section-Reordering

```css
/* Reorder via flex-order, ohne DOM-Umbau */
.md-content__inner {
  display: flex;
  flex-direction: column;
}
.md-content__inner > h1                       { order: 0; }
.md-content__inner > h2.section-kind-kurz,
.md-content__inner > h2.section-kind-kurz ~ * { order: 1; }
.md-content__inner > h2.section-kind-karto,
.md-content__inner > h2.section-kind-karto ~ *{ order: 2; }
.md-content__inner > h2.section-kind-pflicht,
.md-content__inner > h2.section-kind-pflicht ~*{ order: 3; }
.md-content__inner > h2.section-kind-fallen,
.md-content__inner > h2.section-kind-fallen ~*{ order: 4; }
.md-content__inner > h2.section-kind-faelle,
.md-content__inner > h2.section-kind-faelle ~*{ order: 5; }
.md-content__inner > h2.section-kind-stoff,
.md-content__inner > h2.section-kind-stoff ~ *{ order: 6; }
.md-content__inner > h2.section-kind-meta,
.md-content__inner > h2.section-kind-meta ~ * { order: 7; }
```

> Caveat: `~ *` wirkt auf alle Folgegeschwister bis zum Ende — funktioniert nur, weil eine spätere Section-Klasse dieselben Elemente erneut anspricht und gewinnt (höhere `order`). In der Praxis sauber via flat children unter `.md-content__inner`.

### 3.2 Vertiefung (Teil A) collapsed-by-default

```css
/* Wrap Teil A in <details> via JS (siehe §4) ODER mit pures CSS: */
.md-content__inner > h2.section-kind-stoff {
  cursor: pointer;
  position: relative; padding-right: 120px;
}
.md-content__inner > h2.section-kind-stoff::after {
  content: '+ aufklappen';
  position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  font-family: var(--mono); font-size: 10px; letter-spacing: 1.5px;
  color: var(--muted); text-transform: uppercase;
}
.md-content__inner > h2.section-kind-stoff.is-open::after { content: '— zuklappen'; }
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ h3,
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ p,
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ ul,
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ table,
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ .admonition,
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ .mermaid {
  display: none;
}
.md-content__inner > h2.section-kind-stoff:not(.is-open) ~ h2 ~ * {
  display: revert;
}
```

### 3.3 Reveal-Karte (Top-8 + Falle-Atlas)

```css
.reveal-card {
  border: 1px solid var(--hairline);
  background: var(--paper);
  padding: 18px 20px;
  cursor: pointer;
  position: relative;
  list-style: none;
}
.reveal-card[data-reveal="closed"] > *:not(.reveal-card__front) {
  display: none;
}
.reveal-card::after {
  content: 'Tippen · Lösung';
  position: absolute; bottom: 10px; right: 12px;
  font-family: var(--mono); font-size: 9.5px;
  letter-spacing: 1.2px; color: var(--mute2);
  text-transform: uppercase;
}
.reveal-card[data-reveal="open"]::after { content: 'Tippen · zu'; }
```

### 3.4 Mermaid-classDef-Pastell unterdrücken

Falls Phase 1 ohne `hooks.py`-Strip auskommen soll:

```css
.mermaid g.node[class*="bv"] rect,
.mermaid g.node[class*="bay"] rect,
.mermaid g.node[class*="vo"] rect,
.mermaid g.node[class*="km"] rect,
.mermaid g.node[class*="bund"] rect,
.mermaid g.node[class*="root"] rect,
.mermaid g.node[class*="info"] rect,
.mermaid g.node[class*="bet"] rect,
.mermaid g.node[class*="bes"] rect,
.mermaid g.node[class*="stage1"] rect,
.mermaid g.node[class*="stage2"] rect,
.mermaid g.node[class*="stage3"] rect,
.mermaid g.node[class*="stage4"] rect,
.mermaid g.node[class*="stage5"] rect {
  fill: var(--paper) !important;
  stroke: var(--hairline) !important;
}
.mermaid g.node[class*="bay"] rect { stroke: var(--accent) !important; }
```

### 3.5 Print-Pfad

```css
@media print {
  .md-header, .md-sidebar, .md-footer,
  .md-content__inner > h2.section-kind-stoff,
  .md-content__inner > h2.section-kind-stoff ~ *:not(h2):not(.section-kind-meta) {
    display: none !important;
  }
  .reveal-card[data-reveal="closed"] > * { display: revert !important; }
  details.example, details.example > *  { display: revert !important; }
  .mermaid { display: none !important; }
}
```

Resultat: 1–2 A4 Spickzettel mit Header · Kürze · Kartografie · Top-8 (aufgedeckt) · Falle-Atlas (aufgedeckt). Vertiefung + Mermaid raus.

---

## 4 · `lernraum.js` — drei kleine Handler

### 4.1 Vertiefung-Toggle

```js
// Klick auf H2.section-kind-stoff → open/close
document.querySelectorAll('h2.section-kind-stoff').forEach(h => {
  h.addEventListener('click', () => h.classList.toggle('is-open'));
});
```

### 4.2 Reveal-Karten-Toggle

```js
document.addEventListener('click', e => {
  const card = e.target.closest('.reveal-card');
  if (!card) return;
  card.dataset.reveal = card.dataset.reveal === 'open' ? 'closed' : 'open';
});
```

### 4.3 Status-Dot-Persistenz

```js
const STATUS_CYCLE = ['open', 'work', 'repeat', 'sit'];

document.querySelectorAll('[data-status-key]').forEach(h => {
  const key = `wg.lernraum.status.${h.dataset.statusKey}`;
  const cur = localStorage.getItem(key) || 'open';
  h.insertAdjacentHTML('afterbegin',
    `<span class="status-dot status-dot--${cur}" data-key="${key}"></span>`);
});

// Klick auf Dot zyklt durch die Stände
document.addEventListener('click', e => {
  const dot = e.target.closest('.status-dot[data-key]');
  if (!dot) return;
  const cur = localStorage.getItem(dot.dataset.key) || 'open';
  const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur) + 1) % STATUS_CYCLE.length];
  localStorage.setItem(dot.dataset.key, next);
  dot.className = `status-dot status-dot--${next}`;
});
```

→ Status pro Sub-Block, ohne Server, ohne Anki-Kopplung. Bei Bedarf später um Anki-Sync erweiterbar.

---

## 5 · `_mkdocs/docs/mp05/index.md` — Beispiel-Patch (klein)

Markdown-Quelle bleibt im Großen unverändert. Drei kleine Änderungen, alle optional (alles andere macht `hooks.py`):

### 5.1 Falle-Atlas — alle 10 als `<div class="falle-card">`

Aktuell sind 4 von 10 als interaktiv markiert (FA02/07/08/09). Konsequenz: top-Tabelle löschen, alle 10 als Falle-Card.

```diff
-| ID | Falle | Korrekte Auflösung |
-|---|---|---|
-| FA01 | Rechte überwiegen formal — Pflichten-Katalog ignorieren? | NEIN — … |
-| FA02 | Handy in Schule generell verboten? | NEIN — … |
-... (10 Zeilen)
-
-**Interaktiv-Modus** (Click-to-Reveal — zum Selbst-Abprüfen):
-
-<div class="falle-card" markdown>
-<span class="falle-frage">FA02 · Ist das Handy-Verbot in der Schule absolut?</span>
-...
-</div>
-... (nur 4 cards)
+<div class="falle-card" markdown>
+<span class="falle-frage">FA01 · Rechte überwiegen formal — Pflichten-Katalog ignorieren?</span>
+<div class="falle-antwort" markdown>
+NEIN — Pflichten-Katalog Art. 56/4 ist **explizit**, KMK-1973-Hintergrund.
+</div>
+</div>
+
+<div class="falle-card" markdown>
+<span class="falle-frage">FA02 · Ist das Handy-Verbot in der Schule absolut?</span>
+...
+</div>
+(insgesamt 10 cards)
```

Alternative: Tabelle behalten, `hooks.py` generiert daraus die 10 `falle-card`-Blöcke automatisch (Reverse-Pipeline). Cleaner, aber etwas mehr Logik.

### 5.2 Norm-Kartografie — Mermaid raus, Tabelle bleibt

```diff
-```mermaid
-flowchart TB
- BV["**BV** · Bayerische Verfassung..."]:::bv
- ...
-```
-
-| Ebene | Schwerpunkt-Normen |
+| Ebene | Schwerpunkt-Normen |
```

Spart 30+ Zeilen Mermaid pro MP-Seite. Inhaltlich kein Verlust (Tabelle deckt es ab).

### 5.3 Frontmatter für Section-Kind (optional)

Wenn der Heuristik-Match in `hooks.py` zu schwach ist, ein YAML-Frontmatter pro `.md`:

```diff
+---
+section_order: [kurz, karto, pflicht, fallen, faelle, stoff, meta]
+---
+
 # MP_05 — Rechte und Pflichten der Schüler:innen
```

`hooks.py` liest das und steuert die `section-kind-*`-Klassen daraus.

---

## 6 · Rollout-Reihenfolge

| Schritt | Datei(en) | Risiko | Wirkung |
|---|---|---|---|
| 1 · Mermaid theme:base | `mkdocs.yml` | minimal | sofortige Farb-Beruhigung aller Diagramme |
| 2 · Section-Kind-Stamp + CSS-Reorder | `hooks.py` + `lernraum-override.css` | klein (CSS-`order` ist robust) | **kerneffekt** — Test-Effekt-First |
| 3 · Reveal-Klassen + JS-Handler | `hooks.py` + `lernraum.js` + `.css` | klein | Top-8 wird aktivierbar |
| 4 · Falle-Atlas Konsolidierung (10 statt 4) | `mp05/index.md` (+ später MP_01..09) | klein | Lückenschluss zur Spec |
| 5 · Vertiefung-collapsed | `lernraum.js` + `.css` | klein | Stoff wird Referenz, kein Lese-Default |
| 6 · Status-Stamp + Persistenz | `hooks.py` + `lernraum.js` | mittel (UX-Detail) | Selbst-Diagnose pro Sub-Block |
| 7 · Print-CSS | `.css` | minimal | 1-A4-Spickzettel |

Jeder Schritt isoliert deploybar — `mkdocs serve` zwischen jedem Schritt erlaubt sofortige Inspektion auf MP_05 als Pilot, ohne MP_01..09 anzufassen.

---

## 7 · Offene Punkte zur Klärung mit dir

1. **Section-Reordering Heuristik vs. Frontmatter.** Heuristik (H2-Titel-Match) ist null-touch für die `.md`-Quellen, aber zerbricht, wenn jemand „Teil B" zu „Top-8" umtitelt. Frontmatter ist robust, aber bricht den jetzigen 100 %-Markdown-Workflow. Tendenz?
2. **Falle-Atlas Markdown-Quelle.** Möchtest du:
   - (a) Tabelle behalten + `hooks.py` generiert die 10 Reveal-Cards daraus (kein Doppelpflege),
   - (b) Tabelle löschen + 10 Reveal-Cards manuell (mehr Markdown, klarer)?
3. **Mermaid komplett raus oder neutralisiert?** Theme:base macht sie ruhig, aber sie bleiben als visuelles Element. Alternative: `hooks.py` strippt sie auf MP_05..09, weil die Tabellen direkt darunter dieselbe Info tragen.
4. **Status-Sync mit Anki.** Phase 1: rein lokal. Phase 2: optional einlesen aus Anki-Statistik-Export. Pflichtig oder optional?
5. **Glossar-Slideover Wortlaut-Quelle.** `hooks.py` injiziert aktuell `<abbr title="...">`. Soll der `lernraum.js` denselben Title-String für den Slideover ziehen, oder direkt aus `glossar-norm.json` lesen (mehr Wortlaut-Tiefe möglich)?

---

## 8 · Was *nicht* in die Patch-Liste gehört

- **Theme custom_dir** — nicht nötig. Alles geht via `extra_css` + `extra_javascript` + `hooks.py`.
- **Neue Plugins** — `pymdownx.details` reicht für Fallbeispiele, `md_in_html` für Falle-Cards.
- **Glossar-Schema-Wechsel** — Markdown bleibt Source-of-Truth, `build_glossare.py` bleibt parallel-Konsument.
- **mkdocs-material-Overrides** — alle gewünschten Effekte sind via Klassen-Stamping + CSS erreichbar.

---

## 9 · Stichprobe — Was MP_05 nach Schritt 1+2 visuell ändert

- Reihenfolge: Kürze → Kartografie → **Top-8 (passiv, weil JS noch fehlt)** → Falle-Atlas → Fallbeispiele → Teil A.
- Mermaid: alle drei Diagramme einheitlich olive/papier, statt rot/gelb/grün/blau Pastell.
- Norm-Tags: unverändert (bleiben mkdocs-Tooltip, bis Schritt 6 sie auf Slideover dreht).
- Vertiefung: unverändert offen (bis Schritt 5).

Schon nach Schritt 1+2 ist die wichtigste Lernbarkeits-Verbesserung sichtbar (Test-Effekt-Reordering). Schritt 3–7 erweitern die Mechaniken.
