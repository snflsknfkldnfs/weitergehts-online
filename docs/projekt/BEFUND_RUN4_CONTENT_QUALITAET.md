# BEFUND — Run-4 Content-Qualität (User-Visual-Audit Mappe 1)

**Datum:** 2026-04-27
**Source:** User-Screenshots (Scrolling-Capture Mappe 1, Materialien-Spalte links + Arbeitsblatt-Spalte rechts)
**Methodik:** Sandbox-Verifikation jedes Screenshot-Befundes via data.json + escape-engine.js Code-Inspektion. Root-Cause-Identifikation pro Defekt.
**Aggregat:** 4 Befunde gemeldet. **3 EMPIRISCH BESTÄTIGT (CRITICAL/HIGH)** + **1 als FALSE-POSITIVE-Artefakt korrigiert** (Sticky-Layout-Scrolling-Screenshot-Effekt).

**KRITISCHE KONSEQUENZ:** Run-4-Game ist trotz Cowork-Hotfix + F-PB-68 Fix **NICHT pilot-einsetzbar** — fundamentale Engine-vs-Plugin-Schema-Drifts beim Material-Render + Lückentext-Render + Umlaut-Encoding.

---

## 1. Befund-Liste mit Severity + Root-Cause

### B1 — Bilder zeigen `[?]`-Placeholder statt geladene Bilder (CRITICAL)

**Symptom (User-Screenshot):** M1 (Karte Europa 1914), M3 (HMS Dreadnought), M5 (Karte Afrika), M6 (Kaiser Wilhelm) zeigen alle ein `[?]`-Box statt der geladenen Bilder. Nur die Bildunterschrift erscheint korrekt.

**Empirische Verifikation:**
- HTTP-Status alle 12 Bilder: 200 (Sandbox-Test, Live-Asset-Verzeichnis funktional)
- Bilder physisch verfügbar unter `https://weitergehts.online/assets/img/{game-id}/img-mN-0n.{ext}`

**Root-Cause:** **Plugin-vs-Engine Schema-Drift bei `mat.inhalt`**.

Plugin produziert in data.json:
```json
"mat-1-2": {
  "typ": "bildquelle",
  "inhalt": "<img src=\"../../assets/img/.../img-m1-01.jpg\" alt=\"Schwarz-Weiss-Foto der HMS Dreadnought...\"/>"
}
```

Engine erwartet (escape-engine.js Zeile 1044-1049):
```js
function _renderMaterialBild(mat) {
  var img = document.createElement('img');
  img.src = mat.inhalt || '';   // <-- Plugin-HTML-Tag-String wird als URL gesetzt
  img.alt = mat.titel || '';
  ...
}
```

**Wirkung:** `img.src = '<img src="..." alt="..."/>'` → ungültige URL → Browser zeigt `[?]`-Placeholder.

**Betroffene Materialien:** Alle `bildquelle`-Typen (9 Materialien) + `karte`-Typen wo `mat.inhalt` HTML-`<img>`-Tag statt URL/SVG enthält (3 Materialien). **Total: 9-12 von 22 Materialien broken.**

**v0.5.1-Backlog:** **F-PB-77-NEU CRITICAL** — Plugin-Output-Vertrag für `mat.inhalt`: URL-only ODER inline `<svg>`. KEIN HTML-Wrapper.

---

### B2 — Umlaut-Drift game-weit (HIGH)

**Symptom (User-Screenshot):** Sämtliche deutschen Texte zeigen `ae/ue/oe/ss` statt `ä/ü/ö/ß`:
- "oeffnest" statt "öffnest"
- "weisst" statt "weißt"
- "ueberhaupt" statt "überhaupt"
- "Buendnis", "Maechte", "Grossmaechte", "europaeische", "fuenf", "Loesung" usw.

**Empirische Verifikation (Sandbox-Grep auf data.json):**

| Pseudo-ASCII | Korrekt | Anzahl in data.json |
|---|---|---|
| `Buendnis` | Bündnis | **92x** |
| `Loesung` | Lösung | **72x** |
| `Maechte` | Mächte | **30x** |
| `fuenf` | fünf | **26x** |
| `europaeische` | europäische | **19x** |
| `Grossmaechte` | Großmächte | **10x** |
| `oeffn*` | öffn* | 8x |
| `Saetzen` | Sätzen | 7x |
| `Laender` | Länder | 6x |
| `Ergaenze` | Ergänze | 5x |
| `naechsten` | nächsten | 5x |
| `Wettruesten` | Wettrüsten | 4x |
| `gefaehrlich` | gefährlich | 3x |
| `weisst` | weißt | 3x |
| 5 weitere Wörter | — | 1-2x je |

**Echte Umlaute zum Kontrast:** ä=12 + ö=3 + ü=13 + ß=4 = **32 echte Umlaute** vs. **300+ Pseudo-ASCII-Drift-Wörter**.

**Root-Cause:** Plugin-Subagenten (agent-skript, agent-material, agent-aufgaben, agent-hefteintrag) wurden offensichtlich angewiesen, Pseudo-ASCII zu schreiben (vermutlich als historisches JSON-Encoding-Defensiv-Pattern). Für deutsche Schul-Materialien KATASTROPHAL — nicht akzeptabel im Schul-Frontend.

**Betroffene Bereiche:** GAME-WEIT — ca. 300+ Vorkommen in data.json + identische Drift in artefakte/ Source-Files.

**v0.5.1-Backlog:** **F-PB-78-NEU HIGH** — Plugin-Subagenten Frontmatter-Pflicht: deutsche Umlaute IMMER als ä/ö/ü/ß schreiben (JSON unterstützt UTF-8 nativ, kein Escape nötig). Plus: Migration-Skript für Run-4-data.json (~300 Replacements).

---

### B3 — Lückentext-Marker `{{N}}` sichtbar im Frontend (HIGH)

**Symptom (User-Screenshot):** aufgabe-1-2 (lueckentext) zeigt:
> "Ein Buendnis ist ein **{{1}}** zwischen Laendern. Wer **{{2}}** wird, dem helfen die anderen. Vor 1914 gab es zwei grosse Buendnisse: den **{{3}}** (1882) und die **{{4}}** (1907). Mehrere Buendnisse zusammen nennt man ein **{{5}}**."

`{{1}}`-`{{5}}` sind als raw Template-Marker sichtbar statt als Input-Fields gerendert.

**Empirische Verifikation (Sandbox-Grep auf 5 lueckentext-Aufgaben):**

| Aufgabe | Mappe | text_mit_luecken-Marker | Anzahl Lücken |
|---|---|---|---|
| aufgabe-1-2 | M1 | `{{1}}-{{5}}` | 5 |
| aufgabe-2-5 | M2 | `{{1}}-{{5}}` | 5 |
| aufgabe-3-1 | M3 | `{{1}}-{{2}}` | 2 |
| aufgabe-4-3 | M4 | `{{1}}-{{4}}` | 4 |
| aufgabe-4-6 | M4 | `{{1}}-{{2}}` (vermutlich) | 2 |

**Root-Cause:** **Plugin-vs-Engine Schema-Drift bei `text_mit_luecken`-Marker-Format**.

Plugin produziert: `text_mit_luecken: "...ein {{1}} zwischen Laendern. Wer {{2}} wird..."`

Engine erwartet (escape-engine.js Zeile 2515-2526):
```js
var text = aufgabe.text_mit_luecken || aufgabe.frage || '';
var parts = text.split('___');   // <-- Engine splittet an 3x Unterstrich, nicht {{N}}
```

**Wirkung:** `text.split('___')` findet keine Trennung → entire text als EIN TextNode gerendert → `{{1}}`-`{{N}}` erscheinen als raw Text im Frontend statt als `<input>` oder `<span>`-Drop-Targets.

**Betroffene Aufgaben:** **5 von 28 Aufgaben (17.9%) komplett broken** — keine Lückentext-Eingabe möglich, Aufgabe nicht lösbar.

**v0.5.1-Backlog:** **F-PB-79-NEU HIGH** — Plugin-Output-Vertrag für `text_mit_luecken`: Lücken-Marker = `___` (3x Unterstrich, Engine-Konvention) statt `{{N}}` (Plugin-Konvention). DEDUPT mit existierendem F-PB-66 (das war Field-Name-Drift; F-PB-79 ist Marker-Format-Drift).

---

### B4 — Zuordnung-Aufgabe-1-1 angeblich 18+ Dropdowns statt 6 (FALSE-POSITIVE)

**Symptom (User-Screenshot):** Im Scrolling-Capture sieht es aus, als würde aufgabe-1-1 (Zuordnung) ~18 Dropdowns rendern (Russland 4×, Österreich-Ungarn 4×, etc.).

**Empirische Verifikation:**
- data.json `aufgabe-1-1.loesung` hat 6 Keys (Deutsches Reich, Österreich-Ungarn, Italien, Frankreich, Russland, Großbritannien)
- escape-engine.js `_renderZuordnung` (Zeile 2367, 2377): iteriert exakt `Object.keys(aufgabe.loesung).length` mal → **6 Iterationen → 6 Dropdowns**

**Root-Cause:** **Sticky-Layout-Scrolling-Screenshot-Artefakt.** Die rechte Arbeitsblatt-Spalte hat `position: sticky`. Im Scrolling-Capture wird die rechte Spalte mehrfach abgebildet, weil sie mit dem Scroll-Viewport mitwandert. Die linke Materialien-Spalte ist lang (6 Materialien × ~400px), die rechte Arbeitsblatt-Spalte rendert nur einmal aber wird im Scrolling-Capture mehrfach festgehalten.

**Beleg:** Zweiter Screenshot (235x2600 — schmale Arbeitsblatt-Spalte allein) zeigt Aufgaben sauber nicht-dupliziert, mit klarer 1-7 Sequenz.

**Status:** **KEIN Engine-Bug, KEIN Plugin-Bug.** Reines Visualisierungs-Artefakt des Scrolling-Screenshot-Tools.

**v0.5.1-Backlog:** Kein Eintrag.

---

## 2. Severity-Aggregat

| Severity | Anzahl | Items |
|---|---|---|
| **CRITICAL (blockiert Game-Funktionalität)** | 2 | B1 (Bilder broken) + B3 (Lückentext broken) |
| **HIGH (UX/didaktisch nicht akzeptabel)** | 1 | B2 (Umlaut-Drift) |
| **FALSE-POSITIVE** | 1 | B4 (Sticky-Layout-Artefakt) |
| **TOTAL Real-Defekte** | 3 (alle CRITICAL/HIGH) | F-PB-77, F-PB-78, F-PB-79 |

---

## 3. Pilot-Einsatz-Konsequenz

**Run-4 ist trotz Cowork-Hotfix + F-PB-68 lehrkraft.html-Fix NICHT PILOT-EINSETZBAR:**

- 9-12 von 22 Materialien zeigen broken `[?]`-Bilder → **Schüler sehen kein Material**
- 5 von 28 Aufgaben sind nicht lösbar (Lückentext-Marker sichtbar) → **Mappe-Code nicht erreichbar ohne Lehrer-Skip**
- 300+ Umlaut-Drift-Wörter → **didaktisch nicht akzeptabel für Schul-Material** (DaZ-Schüler verstehen "ue/ae/oe" nicht als deutsche Schreibung)

**Pilot-Empfehlung REVIDIERT:**
- **Pilot-Track BLOCKIERT** bis F-PB-77 + F-PB-78 + F-PB-79 gefixt sind
- F-PB-77 + F-PB-79 sind Plugin-Generator-Bugs UND Cowork-fixbar (data.json patchen)
- F-PB-78 ist Plugin-Subagent-Frontmatter-Issue UND Cowork-fixbar (300+ String-Replacements in data.json)

**Cowork-Hotfix-Optionen:**

| Option | Aufwand | Wirkung |
|---|---|---|
| **Hotfix-A** Bilder fixen (`mat.inhalt` URL extrahieren statt HTML-Tag) | ~30 Min Cowork | Alle 12 Bilder korrekt geladen |
| **Hotfix-B** Lückentext-Marker `{{N}}` → `___` ersetzen | ~15 Min Cowork | 5 Aufgaben spielbar |
| **Hotfix-C** Umlaut-Bulk-Rename (300+ Replacements) | ~30 Min Cowork | Schul-akzeptable deutsche Schreibung |
| **Total Cowork-Hotfix vor Pilot:** | ~75 Min | **Run-4 pilot-einsetzbar** |

**Plus engine-Side:** F-PB-77/78/79 als Plugin-v0.5.1-Backlog für künftige Games.

---

## 4. v0.5.1-Backlog-Update

**3 NEU-Items**, alle CRITICAL/HIGH (Backlog wächst von 27 auf **30 Items**, ~17-23 PT):

| ID | Severity | Beschreibung | Cowork-Fix | Plugin-Fix |
|---|---|---|---|---|
| **F-PB-77** | CRITICAL | Plugin-vs-Engine Schema-Drift `mat.inhalt`: HTML-Tag statt URL/SVG | data.json patchen: `<img src="X"/>` → `X` | agent-material Frontmatter: `mat.inhalt = URL` ODER `<svg>...</svg>` |
| **F-PB-78** | HIGH | Umlaut-Drift Plugin-Output (300+ ae/ue/oe statt ä/ü/ö) | data.json Bulk-Replace ~300 Wörter | agent-skript + agent-material + agent-aufgaben Frontmatter: deutsche Umlaute Pflicht |
| **F-PB-79** | HIGH | Lückentext-Marker `{{N}}` statt `___` (Engine-Konvention) | data.json patchen: 5 Aufgaben Marker-Replace | sub-aufgabe-lueckentext Frontmatter: `___`-Marker Pflicht |

**Cross-Reference zu existierendem Backlog:**
- F-PB-79 DEDUPT teilweise mit F-PB-66 (das war `lueckentext` → `text_mit_luecken` Field-Name-Drift; F-PB-79 ist Marker-Format-Drift INNERHALB des korrekten Field-Names)

**v0.5.1-Phase-A-Update:** F-PB-77 + F-PB-78 + F-PB-79 sind **PFLICHT vor Pilot** (zusätzlich zu bisherigen 6 HIGH-Items). Phase A wächst von 6 auf **9 HIGH-Items**, Aufwand ~6-8 PT (statt 5-7).

---

## 5. Methodik-Lessons

### 5.1 Audit-Lücke: Live-Sandbox-Audit vs. User-Visual-Audit

**Live-Audit (Sandbox-Fetch):** Befand `12/12 Bilder HTTP 200 + alle Engine-Bindings PASS` (BEFUND_RUN4_LIVE_CONTENT_INVENTAR).

**User-Visual-Audit (Browser-Screenshot):** Befindet `9-12 Bilder broken + Lückentext broken + Umlaut-Drift game-weit`.

**Lücke:** Live-Audit hat NUR HTTP-Status + JSON-Validität geprüft, NICHT Engine-Render-Ergebnis. Der Plugin-vs-Engine Schema-Drift bei `mat.inhalt` ist NICHT durch Sandbox-Fetch erkennbar — nur durch Browser-Render mit JS-Execution.

**Konsequenz:** **F-PB-58 post-assembly-verify Pflicht-Hook** (v0.5.1-Backlog) MUSS Browser-Smoke-Test inkludieren (headless Chrome/Playwright), nicht nur Static-File-Check. Andernfalls wird F-PB-77/79-Klasse von Bugs nicht detektiert.

### 5.2 Chrome-MCP-Permission-Block-Konsequenz

Chrome MCP Permission-Block (15+ Versuche, 4× Reset/Reinstall) verhinderte automatisierten Visual-Audit. User musste manuell Screenshots erstellen → ~6h verzögerter Befund.

**v0.5.1-Empfehlung:** Browser-Smoke-Test mit headless Playwright als Sandbox-Tool — keine Chrome-MCP-Dependency.

### 5.3 Multi-Track-Coordination zwischen 4 BEFUNDen

**Verfügbare BEFUND-Sources zum Zeitpunkt der User-Visual-Audit-Lieferung:**
1. BEFUND_RUN4_AUDIT.md — keine Bild-Render-Verifikation
2. BEFUND_RUN4_TIEFEN_EVAL.md — keine Bild-Render-Verifikation
3. BEFUND_RUN4_GENERIERUNGS_TRACE.md — keine Bild-Render-Verifikation
4. BEFUND_RUN4_LIVE_CONTENT_INVENTAR.md — Sandbox-HTTP-Check, keine Engine-Render-Verifikation
5. EVALUATION_RUN4_LESSONS_LEARNED.md — CLI-Self-Eval, keine Browser-Render-Verifikation

**Befund:** Alle 5 BEFUNDe + qualitaets_protokoll.md (CLI) konnten F-PB-77/79 NICHT detektieren, weil keiner JS-Render im Browser ausgeführt hat.

**v0.5.1-Methodik-Pflicht:** **End-to-End Browser-Render-Test mit DevTools-Console-Capture** als Pflicht-Audit-Stufe für jeden Run.

---

## 6. Naechste Schritte

### 6.1 Sofort (Cowork, ~75 Min)

1. **Hotfix-A** F-PB-77 Bilder: `mat.inhalt` URL extrahieren in data.json
2. **Hotfix-B** F-PB-79 Lückentext: `{{N}}` → `___` Bulk-Replace in 5 Aufgaben
3. **Hotfix-C** F-PB-78 Umlaut-Bulk-Replace ~300 Wörter
4. **Browser-Smoke-Re-Test** mit User (Visual-Verifikation post-Hotfix)
5. Commit + Push

### 6.2 Mittel (Cowork + Generator-Repo, ~1-2 PT)

6. v0.5.1-Backlog erweitern um F-PB-77/78/79
7. PLUGIN_v0_5_1_HARDENING_SPEC.md aktualisieren
8. PILOT_WALK_THROUGH_M2_M3_M4.md erweitern um "post-Hotfix-Re-Verifikation Pflicht"

### 6.3 Lang (Plugin v0.5.1, ~3-4 Wochen)

9. F-PB-77 strukturell: agent-material-Vertrag patchen
10. F-PB-78 strukturell: 24 Subagent-Frontmatter um Umlaut-Pflicht erweitern
11. F-PB-79 strukturell: sub-aufgabe-lueckentext Marker-Konvention dokumentieren
12. **F-PB-58 erweitern**: post-assembly-verify-Hook MUSS Browser-Smoke-Test inkludieren (headless Playwright)

---

**Content-Qualitäts-Eval abgeschlossen 2026-04-27.** Aggregat: 3 echte CRITICAL/HIGH-Defekte + 1 FALSE-POSITIVE-Korrektur. **Run-4 ist NICHT pilot-einsetzbar bis Cowork-Hotfix (~75 Min) durchgeführt ist.** v0.5.1-Backlog wächst auf 30 Items.
