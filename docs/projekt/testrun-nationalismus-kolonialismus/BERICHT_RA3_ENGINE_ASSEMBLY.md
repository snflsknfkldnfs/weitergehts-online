# BERICHT RA3 — Engine / Assembly

**Review-Agent:** RA3
**Dimension:** 3 — Engine / Assembly (technische Produkt-Schicht)
**Testrun:** `deutscher-nationalismus-kolonialismus`
**Berichtsdatum:** 2026-04-18
**Autor:** Review-Agent RA3 (Claude Opus 4.7)
**Status:** ABGESCHLOSSEN

---

## 1. Executive Summary

Die technische Produkt-Schicht des Testrun-Deploys ist im End-Zustand (Cache-Bust `v=3.13`/`v=4.5`) weitgehend live-fähig, weist aber **drei Kern-Defekte** auf, die entweder im Produkt persistieren oder im Engine-Code als latente Regressionen lauern:

1. **F-RA3-01 (P0 Live-Blocker):** Der Lückentext-Reset-Pfad `_checkLueckentext` (escape-engine.js Z. 2804-2833) enthält eine **falsche Bedingung** in Z. 2814: Pool-Wörter werden nach einem fehlerhaften Submit nur zurückgegeben, wenn der Pool-Button `disabled=true` ist — dieser Zustand wird aber im `allCorrect=false`-Pfad nie gesetzt. Ergebnis: fehlerhafte Lücken werden zwar visuell geleert, aber die zugehörigen Begriffe bleiben in der Pool-Anzeige als `--used` markiert und sind nicht erneut zieh-/klickbar. Der Lerner muss die Seite neuladen — exakt die User-Meldung UX-1 Finding 2.
2. **F-RA3-02 (P2):** Vier HTML-Entities (`&bdquo;`, `&ldquo;`) persistieren in Mappe 3 data.json (Z. 1909, 1940, 1966, 1994, 2051) trotz Live-Patch-Behauptung. Sie werden zwar via `innerHTML` korrekt dekodiert (kein Render-Defekt), sind aber ein Hygiene- und Source-Drift-Fehler und Beleg, dass der 2026-04-16T18:44Z-Patch unvollständig war.
3. **F-RA3-03 (P1 Data-Integrity):** `mappen[N].hefteintrag` ist **vollständig dupliziert** unter `mappen[N].sicherung.hefteintrag` (V13-Pattern). Beide enthalten identische SCPL-Payload (Komplettstruktur). Der Engine-Renderer liest nur aus `sicherung.hefteintrag` (Z. 1258); der Top-Level-Zweig wird ignoriert. Dies ist Drift-Risiko bei künftigen Edits und verdoppelt die Payload.

Weitere Findings (F-RA3-04 bis F-RA3-09) betreffen persistentes Re-Check-Feedback, fehlende `--correct`-Sperre bei Lückentext, Caption-Mischsyntax (UTF-8 + Entity), Validator-Lücken in der Assembly und Cache-Bust-Hygiene.

**Gate-Urteil Sektion 12:** AMBER — eine P0-Engine-Bug-Fix notwendig vor R7-Pilot; die übrigen Findings sind Regressionsbereinigung und Vertrags-Ergänzungen.

**Finding-Count:** 9 (1x P0, 2x P1, 4x P2, 2x P3).

---

## 2. Scope & Methodik

### Scope

RA3 beurteilt ausschliesslich die technische Produkt-Schicht:
- Engine-Code `assets/js/escape-engine.js` (4432 Zeilen), `assets/js/core.js` (269 Zeilen)
- Theme `assets/css/themes/theme-gpg.css`
- Produkt-Assembly `escape-games/deutscher-nationalismus-kolonialismus/data.json` (2547 Zeilen)
- HTML-Shells (`mappe-{1,2,3}.html`, `index.html`, `lehrkraft.html`) bzgl. Cache-Bust
- Vertrags-Referenzen VERTRAG_PHASE_3_ASSEMBLY (V13), VERTRAG_PHASE_3-1_DEPLOY (DEPLOY-06)

Explizit **out of scope:**
- Pipeline-Reihenfolge / Q-Gate-Auslastung (RA1)
- Didaktik-Inhalt / SCPL-Qualität / R7-Sprachniveau (RA2)
- Medien-/Wikimedia-Lookup / Lizenz (RA4) — ausser Bildpfad-Referenzen in data.json
- PM-Meta / Kompaktion / Handoffs (RA5)

### Methodik

1. Engine-Code direkt gelesen. Ziel-Regionen per Grep lokalisiert (`_checkLueckentext`, `_renderLueckentext`, `_renderSicherung`, `_renderHefteintragSCPL`, Hefteintrag-Routing).
2. data.json stichprobenweise gelesen: Header, Mappe-1 Material 1-2, Mappe-3 Material 1-6, Mappe-3 Aufgaben 1-4, Mappe-3 Hefteintrag Top-Level + sicherung.hefteintrag.
3. Entity-Sweep via Grep `&bdquo;|&ldquo;|…` über die gesamte data.json.
4. Cache-Bust-Sweep über alle fünf HTML-Shells.
5. Bildpfad-Ist/Soll-Vergleich: data.json-`inhalt`-Refs gegen realen Dateibestand `assets/img/deutscher-nationalismus-kolonialismus/`.
6. Typ-Registry + Renderer-Existenz verifiziert.
7. Event-Flow des Lückentext-Reset-Bugs rekonstruiert (Pool-Fall und Text-Input-Fall).

Finding-IDs `F-RA3-NN`, Severität nach AUDIT_STATE Definition (P0 Live-Blocker … P3 kosmetisch).

---

## 3. data.json-Assembly — Struktur und Vollständigkeit

### 3.1 Makro-Struktur

Die data.json hat 2547 Zeilen, 3 Mappen (EINHEIT, MACHT, WELT). Jede Mappe liefert `einstieg`, `materialien`, `aufgaben`, **sowohl** `hefteintrag` (Top-Level) **als auch** `sicherung.hefteintrag` (verschachtelt), sowie `mappenabschluss_zone`. Beide Hefteintrag-Zweige enthalten die gleiche SCPL-Payload.

### 3.2 Hefteintrag-Dualstruktur (Finding F-RA3-03)

Beispielhaft für Mappe 3 nachgewiesen:
- data.json Z. 2317-2423: `mappen[2].hefteintrag` — Top-Level, vollständige SCPL inkl. `knoten[]`, `verbindungen[]`, `_q_gate`.
- data.json Z. 2424-2536: `mappen[2].sicherung` mit enthaltenem `sicherung.hefteintrag` (Z. 2434-2535) — **identische SCPL-Payload** minus `_q_gate`.

Der Engine-Renderer liest ausschliesslich aus `sicherung.hefteintrag` (escape-engine.js Z. 1258-1332). Der Top-Level-Zweig `mappen[N].hefteintrag` ist im Produkt-Rendering **inaktiv** — er dient offensichtlich dem V13-Zwischenschritt und/oder dem Lehrkraft-Export. Dennoch landet er live in der ausgelieferten data.json.

**Bewertung:** Die Verschachtelung war der V13-Fix zum Mappe-1-Hefteintrag-Rendering-Defekt vom 2026-04-12T16:38Z. V13 schreibt offenbar die Sicherungs-Variante korrekt, behielt aber die Top-Level-Variante als Rueckwaerts-/Quell-Referenz bei. Folge ist Drift-Risiko bei zukuenftigen Edits (einer der beiden Zweige wird aktualisiert, der andere nicht).

### 3.3 Typ-Registry und Renderer-Abdeckung

escape-engine.js Z. 148-159 definiert die Aufgabentyp-Registry:

```
'multiple-choice' → _renderMultipleChoice
'zuordnung'       → _renderZuordnung
'lueckentext'     → _renderLueckentext
'reihenfolge'     → _renderReihenfolge
'freitext-code'   → _renderFreitextCode
'vergleich'       → _renderVergleich       (STR-11 Wave 1 AU-1)
'begruendung'     → _renderBegruendung     (STR-11 Wave 1 AU-1)
'quellenkritik'   → _renderQuellenkritik   (STR-08 Wave 2 AU-3)
```

Die in data.json verwendeten Aufgaben-Typen sind: `lueckentext`, `zuordnung`, `multiple-choice`, `reihenfolge`, `quellenkritik`, `freitext-code` (gesampelt aus Grep-Histogramm). Alle sind durch Renderer abgedeckt. Weder `vergleich` noch `begruendung` treten in der finalen data.json auf.

**PATCH-M3 Finding 4 ("Aufgabe 3 Vergleich-Typ zu komplex"):** Die finale data.json enthält keinen `vergleich`-Typ mehr — Mappe 3 Aufgabe 4 ist `freitext-code` (Z. 2268). Der Patch wurde durchgesetzt. Kein Engine-Problem, sondern ein ehemaliges Didaktik-Problem, das assembly-seitig durch Typ-Umstellung geloest wurde.

### 3.4 Vollständigkeits-Audit

| Mappe | einstieg | materialien | aufgaben | hefteintrag(SCPL) | sicherung.hefteintrag | abschluss |
|---|---|---|---|---|---|---|
| 1 | ok | 5 | 6 | ok | ok | ok |
| 2 | ok | 6 | 5 | ok | ok | ok |
| 3 | ok | 6 | 4 | ok | ok | ok |

SCPL-Struktur vorhanden: `situation.kontextsatz`, `complication[].schritt`, `problem.satz`, `loesung[]`, `transfer.frage`, `knoten[]`, `verbindungen[]`, optional `_q_gate`. Alle drei Mappen sind Assembly-vollstaendig.

---

## 4. Material-Referenzen und Bildpfade

### 4.1 Bildpfad-Ist/Soll

data.json referenziert 9 Bildpfade (Grep Z. 61, 142, 1132, 1173, 1965, 1993, 2021 plus 2 Lizenz-/artefakt_ref-Erwähnungen):

| Ref in data.json | Existiert physisch |
|---|---|
| `img-1-1.jpg` | ja |
| `img-1-5.png` | ja |
| `img-2-1.jpg` | ja |
| `img-2-2.jpg` | ja |
| `img-3-1.jpg` | ja |
| `img-3-2.jpg` | ja |
| `img-3-5.png` | ja |
| `img-1-4.jpg` (nur in Lizenz-String Z. 63) | ja |
| `img-3-4.png` (nur in artefakt_ref Z. 2029) | ja |

**Kein Broken-Link.** `img-1-2`, `img-1-3`, `img-2-3`, `img-4-1`, `img-4-3`, `img-4-4` aus dem MV2-Hallu-Audit tauchen in der finalen data.json **nicht mehr** als Ressourcen-Pfade auf — die sechs halluzinierten Wikimedia-Dateien sind aus den `inhalt`-Feldern entfernt oder durch verifizierte Ersatzbilder (`img-3-4.png` Marechal-Karikatur, `img-3-5.png` Afrika-1913-Karte) ersetzt worden. RA4 bewertet die Medienqualität inhaltlich.

**PATCH-M3 Finding 3 ("M5 falsche Karte img-3-4 vs. img-3-5"):** data.json Z. 2015-2030 zeigt, dass M5 (id `mat-3-5`, typ `karte`) jetzt auf `img-3-5.png` verweist (die korrekte Afrika-1913-Karte), während `img-3-4` nur als artefakt_ref zu M4 (Marechal-Karikatur) erscheint. Fix durchgesetzt.

### 4.2 Relative Pfad-Syntax

Alle Bildrefs nutzen `../../assets/img/<slug>/…` (2 Ebenen hoch relativ zur HTML-Shell im Games-Verzeichnis). Korrekt für den Deploy-Layout.

---

## 5. Typ-Registry und Renderer-Abdeckung

Siehe 3.3. Ergaenzend:

- `_renderLueckentext` (escape-engine.js Z. 2475-2575): Unterstützt Pool-Modus (v3.6b) und klassischen Text-Input-Modus (Fallback). Pool-Modus erkennt `aufgabe.antwortpool != null`.
- `_renderHefteintragSCPL` (Z. 1406-1572): CSS-basiertes Rendering aus `sicherung.hefteintrag.scpl`. Hefteintrag-Box mit Datum, Stundenfrage, Situation, Complication-Steps (optional `gegenueberstellung`), Problem, Merkbox (Loesung), Transfer. Colorklassen `hefteintrag__fachbegriff--rot/blau/gruen`. Abhaengt von theme-gpg.css fuer Layout.
- `_renderTafelbild` (Z. 1587 ff.): Legacy-SVG-Tafelbild, wird nur noch gerendert, wenn `sicherung.hefteintrag.scpl` fehlt aber `knoten.length > 0` gilt. In dieser data.json nicht ausgeloest (alle drei Mappen haben scpl).

**Vertrags-Konformitaet VERTRAG_PHASE_3_ASSEMBLY (V13):** Sicherungs-Routing (Z. 1258-1262) prueft in der Reihenfolge `scpl → knoten → leer`. V13-Pattern umgesetzt. Keine Mappe faellt in den Legacy-Pfad.

---

## 6. Lückentext-Reset-Bug — Root-Cause-Analyse (F-RA3-01 P0)

### 6.1 User-Meldung und Verlauf

- **2026-04-16T15:43Z** (Session C, nach Mappe 1+2 Nutzung): "Bei fehlerhaftem lückentext werden die fehlerhaften lücken nicht wieder geleert, man muss die seite neu laden".
- **2026-04-17T10:33Z** (Ende-Testrun): UX-1 Finding 2 erneut in Upgrade-Plan notiert.

### 6.2 Event-Flow

Der Lückentext läuft im **Pool-Modus**, weil `aufgabe-3-1` und die anderen Lückentexte jeweils `antwortpool[]` enthalten (data.json Z. 2087-2093). Der Flow:

1. `_renderLueckentext` (Z. 2475) erzeugt `<span class="aufgabe__luecke aufgabe__luecke--pool">` als Drop-Targets und einen Submit-Button.
2. User zieht Pool-Wort in Luecke → `_fillLuecke` (Z. 2587): Luecke bekommt `data-wort`, Klasse `--filled`; Pool-Button bekommt Klasse `--used` und `draggable=false`. **`disabled` wird nicht gesetzt.**
3. Submit-Button-Click → `_checkLueckentext` (Z. 2760).
4. Für jede Luecke wird `userValue` aus `data-wort` gelesen, per `_fuzzyMatch` gegen `loesungen[i]` geprueft.
5. Bei korrekter Luecke: `--correct` setzen, `--incorrect` entfernen.
6. Bei falscher Luecke: `--incorrect` setzen, `--correct` entfernen. `allCorrect=false`.

### 6.3 Bug-Stelle (exakt)

Bei `allCorrect=false` (Z. 2804-2830):

```
2808  if (hasPool) {
2809    // Wort zurueck in Pool
2810    var falschesWort = inputs[j].getAttribute('data-wort');
2811    if (falschesWort) {
2812      var allBtns = section.querySelectorAll('.aufgabe__pool-wort');
2813      for (var m = 0; m < allBtns.length; m++) {
2814        if (allBtns[m].getAttribute('data-wort') === falschesWort && allBtns[m].disabled) {
2815          allBtns[m].classList.remove('aufgabe__pool-wort--used');
2816          allBtns[m].disabled = false;
2817          break;
2818        }
2819      }
2820    }
2821    inputs[j].textContent = '';
2822    inputs[j].setAttribute('data-wort', '');
2823    inputs[j].classList.remove('aufgabe__luecke--filled');
2824    inputs[j].classList.remove('aufgabe__luecke--incorrect');
2825  }
```

**Der Fehler:** Zeile 2814 verlangt `&& allBtns[m].disabled`. Der Pool-Button wird aber nur `disabled=true` gesetzt, wenn `allCorrect=true` (Z. 2800-2803). Im Fehler-Pfad sind die Pool-Buttons weiterhin nicht `disabled`, sondern tragen nur die CSS-Klasse `aufgabe__pool-wort--used` (gesetzt in `_fillLuecke` Z. 2593).

**Konsequenz:** Die `if`-Bedingung wird **nie erfuellt**, der Pool-Button bleibt als `--used` markiert (ausgegraut, nicht draggable, `draggable=false`). Die Luecke selbst wird zwar textlich geleert (Z. 2821-2823), aber das Wort ist aus dem Pool visuell "verbraucht" und **der User kann es nicht erneut einsetzen**. Das matcht exakt die Meldung "lücken nicht wieder geleert" — aus Nutzersicht ist der Effekt "ich kann das Wort nicht mehr einsetzen, Seite muss neugeladen werden".

**Test-Reproduktion:** jede Lückentext-Aufgabe mit Pool-Modus → drei Lücken füllen, dabei eine falsch → Submit klicken → falsche Lücke ist leer, aber der falsch gezogene Pool-Begriff bleibt ausgegraut/ungreifbar. Submit erneut drücken ohne Reload: nichts funktioniert, weil die Luecke leer ist und das Wort nicht mehr aus dem Pool gezogen werden kann.

### 6.4 Fix-Vorschlag

In Z. 2814 die `disabled`-Bedingung durch die tatsächlich gesetzte CSS-Klasse ersetzen:

```
if (allBtns[m].getAttribute('data-wort') === falschesWort &&
    allBtns[m].classList.contains('aufgabe__pool-wort--used')) {
  allBtns[m].classList.remove('aufgabe__pool-wort--used');
  allBtns[m].setAttribute('draggable', 'true');
  break;
}
```

Zusätzlich (konsistent mit `_clearLuecke` Z. 2612-2613): `draggable='true'` statt `disabled=false` — der Drag-Drop-Pfad von `_initPoolDragDrop` nutzt `draggable` als Source-Marker, nicht `disabled`.

**Alternativ eleganter:** Im `allCorrect=false`-Pfad die existierende `_clearLuecke`-Hilfsfunktion (Z. 2598-2606) per geeigneter Exposition wiederverwenden — sie macht das bereits korrekt.

### 6.5 Text-Input-Fallback

Der Nicht-Pool-Modus (Aufgaben ohne `antwortpool`) greift Z. 2825-2828: `inputs[j].value = ''; inputs[j].classList.remove('--incorrect');`. Dies ist **funktional korrekt** — der User kann den Input neu beschreiben. In der vorliegenden data.json sind aber ALLE Lückentexte Pool-basiert; der Bug trifft zu 100 % die reale Nutzung.

### 6.6 Nebenwirkungen

- `aufgabe__luecke--correct` wird bei korrekten Lücken nicht entfernt und die Lücke nicht `disabled`. Beim erneuten Submit kann der User versehentlich eine bereits grün markierte Lücke ueberschreiben (seltener Edge-Case, aber unsauberes State-Modell). **F-RA3-05 P2.**
- Bei mehreren falschen Lücken wird Z. 2812 der Pool-Button-Querysselector in der inneren Schleife `j` jedes Mal neu abgefragt — O(n²). Nicht perf-kritisch bei R7-Aufgaben (max 4-5 Lücken), aber ein Code-Smell.

---

## 7. Hefteintrag-Routing (V13-Patch, Finding F-RA3-03)

### 7.1 Routing-Code

escape-engine.js Z. 1257-1332:

```
if (sicherung.hefteintrag) {
  if (sicherung.hefteintrag.scpl) {
    _renderHefteintragSCPL(sicherung, container);        // Pfad A
  } else if (sicherung.hefteintrag.knoten && sicherung.hefteintrag.knoten.length > 0) {
    // Pfad B: Legacy-SVG-Tafelbild + Merksätze + Kernerkenntnisse + Verweis
  }
}
```

Routing ist korrekt. Pfad A wird für alle drei Mappen des Testruns getriggert (alle haben `scpl`).

### 7.2 V13-Patch-Regression (negativer Befund)

Laut EVIDENZ_BUNDLE wurde V13 am 2026-04-12T16:43Z in VERTRAG_PHASE_3_ASSEMBLY eingeführt. Am 2026-04-16T18:14Z berichtete der User eine identische Symptomatik in Mappe 3 (PATCH-M3 Finding 5: "Hefteintrag-Verschachtelung in data.json fehlt"). Nach Live-Patch 2026-04-16T18:44Z: kein erneuter Verschachtelungs-Fehler mehr.

**Ursachen-Hypothese:** V13 wurde nicht retroaktiv auf Mappe 3 angewandt oder der Assembly-Agent hat den Vertrags-Paragraphen in einer Kompaktion (vgl. 12 Auto-Kompaktions-Ereignisse aus EVIDENZ_BUNDLE Abschn. 5, davon 5 am 2026-04-16) verloren und neu assembliert ohne Verschachtelung. Beides weist auf eine strukturelle Schwäche hin: der Vertrag enforced die Struktur nicht per Assembly-Validator, sondern nur per Spec-Text. Kompaktions-Drift ist möglich.

### 7.3 Hefteintrag-Dualstruktur (Data-Duplication)

Wie in 3.2 beschrieben: `mappen[N].hefteintrag` **und** `mappen[N].sicherung.hefteintrag` sind in der finalen data.json beide enthalten und inhaltsgleich. Die Engine rendert nur aus `sicherung.hefteintrag`.

**Bewertung P1:** Drift-Risiko bei zukünftigen Patches, unnötige Payload-Verdopplung. VERTRAG_PHASE_3_ASSEMBLY sollte in einer V14 entscheiden: entweder Top-Level als SSOT und `sicherung.hefteintrag` als `{"$ref": "../hefteintrag"}` (oder einfach nur die Verschachtelung, Top-Level weglassen).

---

## 8. Theme/CSS — Sicherung und Lückentext

### 8.1 Theme-Pfad

Alle fünf HTML-Shells referenzieren `../../assets/css/themes/theme-gpg.css?v=3.13`. Datei existiert unter `mnt/weitergehts-online/assets/css/themes/theme-gpg.css` — Pfad korrekt, keine 404.

### 8.2 Sicherung-Styles

Nicht tief inspiziert (Charta priorisiert Engine). Relevante Klassen aus _renderHefteintragSCPL (Z. 1406-1572): `hefteintrag`, `hefteintrag__datum`, `hefteintrag__stundenfrage`, `hefteintrag__inhalt`, `hefteintrag__pfeil`, `hefteintrag__gegenueber`, `hefteintrag__gegenueber-col`, `hefteintrag__gegenueber-vs`, `hefteintrag__spacer`, `hefteintrag__merkbox`, `hefteintrag__merkbox-text`, `hefteintrag__spacer-half`, `hefteintrag__transfer`, `hefteintrag__fachbegriff--rot/--blau/--gruen`. Diese Klassen sind seit v3.1 (SCPL-Einführung) etabliert. Keine Rendering-Beschwerde des Users zum Hefteintrag-Visual nach dem 2026-04-16T18:44Z-Patch gemeldet.

### 8.3 Lückentext-Styles

Klassen aus `_renderLueckentext` und `_initPoolDragDrop`: `aufgabe__lueckentext`, `aufgabe__luecke`, `aufgabe__luecke--pool`, `aufgabe__luecke--filled`, `aufgabe__luecke--correct`, `aufgabe__luecke--incorrect`, `aufgabe__luecke--dragover`, `aufgabe__luecke--dragging`, `aufgabe__antwortpool`, `aufgabe__pool-wort`, `aufgabe__pool-wort--used`, `aufgabe__pool-wort--selected`, `aufgabe__pool-wort--dragging`, `aufgabe__submit`. Die Reset-Logik in `_checkLueckentext` entfernt `--filled` und `--incorrect`, liesse `--correct` bei korrekten Lücken stehen. CSS-seitig ausreichend, JS-seitig siehe F-RA3-05.

---

## 9. localStorage / Cache / Persistenz

### 9.1 Storage-Wrapper

core.js Z. 20-93: `Core.storage.{get,set,remove,clear}` mit try/catch und JSON-Serialisierung. Key-Namespace `escape-<slug>` (clear() iteriert nur `escape-`-Prefixe). Robust implementiert.

### 9.2 Antwort-State und Fortschritt

escape-engine.js nutzt `_saveAntwortState(mappeId, aufgabeIndex, state)` für Lückentext-Restore (Z. 2516-2525): `state.filled[lueckenIndex]` wird bei Geloest-Reload wieder in die Luecke eingesetzt. Für Pool-Modus: `data-wort`-Setzen + Klasse `--filled` + `--correct`. Für Text-Input: `value`-Setzen + `--correct`.

**Konsistenz:** Nur bei `allCorrect=true` wird `_saveAntwortState` aufgerufen (Z. 2798). Fehlerhafte Zustände werden nicht persistiert — sauber.

### 9.3 Datenschutz-Kontext

Memory `project_datenschutz_kontext`: localStorage-only auf Schul-iPads, iPad-Nutzungsvereinbarung deckt DSGVO Art. 6/8. Der Engine-Code ist mit diesem Modell kompatibel (keine Remote-Persistenz, kein Fingerprinting, keine PII-Speicherung).

---

## 10. Cache-Busting und Deploy-Kohärenz

### 10.1 Audit

Alle fünf HTML-Shells (mappe-1, mappe-2, mappe-3, index, lehrkraft) referenzieren:
- `base.css?v=4.5`
- `themes/theme-gpg.css?v=3.13`
- `core.js?v=4.5`
- `escape-engine.js?v=3.13`

**Konsistent, keine Drift zwischen den Shells.** Memory `feedback_cache_busting` ("bei JS/CSS-Updates IMMER ?v= hochzaehlen") eingehalten.

### 10.2 data.json-Cache-Bust

`_loadData` (Z. 528) nutzt `fetch('data.json?_=' + Date.now())` — Timestamp-basiertes Cache-Bust, umgeht iPad-Safari-Aggressivcaching. Korrekt.

### 10.3 Finding F-RA3-06 P3 — v-Nummern-Divergenz zwischen base/core (4.5) und theme-gpg/escape-engine (3.13)

Zwei unterschiedliche Versions-Achsen. Das ist akzeptabel wenn `base.css`/`core.js` einen separaten Release-Zyklus haben, aber kann bei späteren Edits zu Verwirrung führen. Ergänzungs-Empfehlung: einheitliche Semver pro Release-Bundle oder zumindest ein `/docs/CHANGELOG.md`-Eintrag pro `?v=`-Bump.

---

## 11. Findings (konsolidiert)

### F-RA3-01 Lückentext-Pool-Reset-Bug — P0 Live-Blocker

**Datei:** `assets/js/escape-engine.js` Z. 2814
**Symptom:** Nach fehlerhaftem Submit bleiben Pool-Wörter als `--used` markiert und nicht-ziehbar; Lücken leer; kein erneuter Einsatz möglich ohne Seiten-Reload.
**Root Cause:** Bedingung `allBtns[m].disabled` ist im Fehler-Pfad nie wahr; korrekt wäre `allBtns[m].classList.contains('aufgabe__pool-wort--used')`.
**Fix:** Siehe Sektion 6.4. Single-line-Change in escape-engine.js.
**Severitaet:** P0 — blockiert R7-Pilot, reproduziert sich bei jedem fehlerhaften Lückentext-Submit.
**User-Quelle:** UX-1 Finding 2 (2026-04-16T15:43Z, 2026-04-17T10:33Z).

### F-RA3-02 Persistente HTML-Entities Mappe 3 — P2

**Datei:** `escape-games/deutscher-nationalismus-kolonialismus/data.json` Z. 1909, 1940, 1966, 1994, 2051
**Symptom:** `&bdquo;`/`&ldquo;` statt UTF-8 „"` in Mappe-3-Bildunterschriften (M3, M4) und mat-3-6-Tagebuch.
**Visueller Impact:** Keiner — `innerHTML`-Rendering dekodiert korrekt.
**Hygiene-Impact:** Source-Drift: Mappe 1+2 nutzen UTF-8 direkt, Mappe 3 teilweise Entities. Bei `textContent`-Rendering (nicht aktuell verwendet) würden Entities roh angezeigt.
**Root Cause:** Maréchal-Karikatur-Ersatz (2026-04-16T17:53Z) hat Text-Content mit HTML-Entities aus einer Ersatzquelle übernommen ohne Konversion. Post-Patch-Entity-Scan fehlt in der Assembly-Pipeline.
**Fix:** data.json-seitiger `sed`-Replace `&bdquo;` → `„`, `&ldquo;` → `"` bzw. entsprechende UTF-8-Zeichen.
**Severitaet:** P2 — funktional korrekt, Hygienebruch, belegt unvollständigen Live-Patch.

### F-RA3-03 Hefteintrag-Dualstruktur in data.json — P1 Data-Integrity

**Datei:** `data.json` (alle drei Mappen)
**Symptom:** `mappen[N].hefteintrag` (Top-Level) und `mappen[N].sicherung.hefteintrag` sind inhaltsgleich dupliziert (~100 Zeilen pro Mappe). Die Engine liest nur aus sicherung.hefteintrag.
**Drift-Risiko:** Hoch — Patches, die nur einen Zweig aktualisieren, erzeugen Inkonsistenz ohne Rendering-Fehler (Top-Level wird ja ignoriert).
**Fix-Optionen:**
1. V14-Vertrags-Update: Top-Level-Hefteintrag entfernen (SSOT = `sicherung.hefteintrag`).
2. Assembly-Validator einführen, der Dual-Struktur erzwingt und auf Inhaltsgleichheit prüft.
**Severitaet:** P1 — kein akuter Blocker, aber nächster Edit der Mappe erzeugt Drift-Kandidat.

### F-RA3-04 V13-Patch-Regression-Anfälligkeit — P1 Prozess-Contract

**Datei:** `docs/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` (Vertragsebene)
**Symptom:** V13 wurde 2026-04-12 für Mappe 1 implementiert, bei Mappe 3 Assembly am 2026-04-16 trotzdem nicht angewandt (PATCH-M3 Finding 5).
**Root Cause:** Vertragstext hat keinen Assembly-Validator — Claude Code kann V13 in Kompaktion "vergessen" und Default-Assembly schreiben.
**Fix:** Pre-Deploy-Check (DEPLOY-06 erweitern): `node scripts/validate-data-json.js` der prüft `mappen[N].sicherung.hefteintrag.scpl` existiert für jede Mappe.
**Severitaet:** P1 — strukturelle Prozess-Luecke, betrifft nicht nur Hefteintrag sondern jede V-Patch-Konvention.

### F-RA3-05 Lückentext `--correct`-Persistenz ohne Sperre — P2

**Datei:** `assets/js/escape-engine.js` Z. 2772-2803
**Symptom:** Bei `allCorrect=true` werden Lücken zwar `aria-disabled`/`disabled`+`pointerEvents=none` gesetzt. Bei `allCorrect=false` mit einzelnen korrekten Lücken bleibt `--correct` visuell, aber die Lücke ist weiterhin klickbar/editierbar (kein disabled).
**Impact:** User kann eine gruen markierte Luecke im Re-Submit-Zyklus versehentlich leeren und dadurch einen gerade gelösten Teil wieder verlieren.
**Fix:** Im `allCorrect=false`-Pfad korrekte Lücken temporär sperren (Klasse `--locked` + `draggable=false`, `pointer-events:none` via CSS). Beim naechsten Submit entsperren — oder dauerhaft locken, da korrekt = gelöst.
**Severitaet:** P2 — UX-Papercut, kein Block.

### F-RA3-06 Cache-Bust-Versions-Divergenz — P3 Cosmetic

**Datei:** HTML-Shells (base/core v4.5, theme/engine v3.13)
**Symptom:** Zwei Versionsachsen — nachvollziehbar (unterschiedliche Release-Zyklen), aber kein Changelog, der die Relation klärt.
**Fix:** `docs/CHANGELOG.md` pro Asset oder einheitliches Bundle-Versioning.
**Severitaet:** P3.

### F-RA3-07 Data-Validator fehlt zwischen Assembly und Deploy — P1 Prozess

**Symptom:** Kein maschineller Validator prüft nach Assembly (Phase 3) die Struktur der data.json gegen ein Schema. Regressionen (F-RA3-03, F-RA3-04, PATCH-M3) bleiben unentdeckt bis zum User-Test.
**Fix:** JSON-Schema für data.json in `docs/architektur/schemas/data.schema.json`, CI-/Pre-Deploy-Hook (Memory `reference_generator_repo` — GitHub CLI verfügbar).
**Minimum-Schema-Felder:** `mappen[].sicherung.hefteintrag.scpl.{situation,complication,problem,loesung}`, `mappen[].materialien[].{id,typ,inhalt}`, `mappen[].aufgaben[].{id,typ,frage}`, Pool-Lückentexte: `loesung.length == text_mit_luecken.count('___')`.
**Severitaet:** P1.

### F-RA3-08 Entity-Scan fehlt in Post-Assembly — P2

**Symptom:** F-RA3-02 hätte ein Entity-Scan an der Assembly-Grenze gefangen.
**Fix:** Assembly-Tail-Step: `grep -P '&[a-zA-Z]+;'` über data.json → CI-Fehler.
**Severitaet:** P2.

### F-RA3-09 Pool-Reset-Perf-Smell — P3

**Symptom:** Nested Loop in `_checkLueckentext` Z. 2806-2820: pro falscher Lücke eine volle Pool-Query. Bei R7-Aufgaben vernachlässigbar, aber Anti-Pattern.
**Fix:** Pool-Buttons einmal vor der Schleife holen und in Map nach `data-wort` indizieren.
**Severitaet:** P3.

---

## 12. Gate-Urteil

**Urteil: AMBER — Bedingt produktionsfähig.**

| Bedingung | Status | Begründung |
|---|---|---|
| Engine rendert alle Mappen ohne Hard-Error | PASS | Alle Typen in Registry abgedeckt, alle Bildpfade existent, Hefteintrag-SCPL korrekt geroutet. |
| Keine P0 Live-Blocker | FAIL | F-RA3-01 Lückentext-Pool-Reset-Bug ist P0, reproduzierbar. |
| Keine P1 Data-Integrity-Defekte | BEDINGT | F-RA3-03 (Hefteintrag-Dualstruktur) + F-RA3-04 (V13-Prozess-Lücke) + F-RA3-07 (Schema-Validator fehlt) sind P1, aber nicht Live-Blocker. |
| Cache-Bust-Hygiene | PASS | Alle Shells konsistent, Timestamp-Bust auf data.json. |
| Post-Patch-Source-Hygiene | FAIL | F-RA3-02 Entities persistieren in Mappe 3. |

**Release-Empfehlung:**
- **Vor R7-Pilot:** F-RA3-01 fixen (single-line change). Ohne diesen Fix ist jede Lückentext-Aufgabe im Realbetrieb ein Support-Vorfall.
- **Vor v3.12-Release:** F-RA3-02 (Entity-Cleanup), F-RA3-03 (Dualstruktur-Entscheidung), F-RA3-07 (Schema-Validator).
- **Stretch:** F-RA3-04, F-RA3-05, F-RA3-06, F-RA3-08, F-RA3-09.

**Konvergenz mit UPGRADE_PLAN:**
- UX-1 Finding 2 (Lückentext-Bug) → F-RA3-01 — **bestaetigt und lokalisiert**.
- PATCH-M3 Finding 1 (Umlaute Rahmen-JSONs) → Nicht isoliert geprüft; in finaler data.json alle Mappen UTF-8-korrekt ausser Entities in Mappe 3 (F-RA3-02).
- PATCH-M3 Finding 2 (HTML-Entities) → F-RA3-02 — **nur teilweise gefixt**.
- PATCH-M3 Finding 3 (Bildpfad M5) → Gefixt (Sektion 4.1).
- PATCH-M3 Finding 4 (vergleich-Typ) → Gefixt (Sektion 3.3).
- PATCH-M3 Finding 5 (Hefteintrag-Verschachtelung) → Gefixt im Rendering, aber F-RA3-03 Dualstruktur als Nachfolge-Defekt.

---

## 13. Anhang — Referenzen

### 13.1 Code-Zeilen-Referenzen escape-engine.js

| Region | Zeilen | Inhalt |
|---|---|---|
| AufgabentypRegistry | 146-159 | Typ → Renderer-Mapping |
| `_loadData` | 525-535 | data.json fetch mit `?_=` Cache-Bust |
| `_renderSicherung` | 1248-1394 | Sicherungs-Routing, liest `sicherung.hefteintrag` |
| `_renderHefteintragSCPL` | 1406-1572 | SCPL-Hefteintrag-Renderer |
| `_renderLueckentext` | 2475-2575 | Luecken-Rendering, Pool-Modus und Text-Input |
| `_initPoolDragDrop` | 2583-2754 | DnD + Klick-Fallback |
| `_checkLueckentext` | 2760-2836 | Submit-Handler, **F-RA3-01 in Z. 2814** |

### 13.2 data.json Referenzen

| Region | Zeilen | Inhalt |
|---|---|---|
| Meta | 1-10 | Titel, Fach, Lehrplanbezug |
| Mappe 3 Einstieg | (nicht expliziert gelesen) | |
| Mappe 3 Materialien mit Entities | 1909, 1940, 1966, 1994, 2051 | **F-RA3-02** |
| Mappe 3 Bildpfad M5 | 2015-2041 | img-3-5.png, korrekt |
| Mappe 3 Lueckentext (Aufgabe 3-1) | 2075-2128 | Pool-Modus, 4 Luecken |
| Mappe 3 Aufgabe 3-4 freitext-code | 2268-2315 | vergleich-Typ entfernt |
| Mappe 3 hefteintrag Top-Level | 2317-2423 | **F-RA3-03 duplikat** |
| Mappe 3 sicherung.hefteintrag | 2434-2535 | **F-RA3-03 duplikat** |

### 13.3 Vertrags-Referenzen

- `docs/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` (V13) — Hefteintrag-Verschachtelung unter `sicherung.hefteintrag` erzwungen. Fehlt: Assembly-Validator.
- `docs/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` (DEPLOY-06) — Cache-Bust-Pflicht. Fehlt: Schema-Validator.

### 13.4 Evidenz-Extrakte

- `evidenz/milestones.json` Keys: `assembly_bug`, `hefteintrag`.
- `evidenz/tool_errors.jsonl`: 6x Virtiofs-Unlink-Errors (Memory `feedback_virtiofs_git_lock`) — kein Einfluss auf Assembly-Korrektheit, nur auf Commit-Latenz.
- `evidenz/assistant_text.jsonl` Fenster 2026-04-12T16:38Z-16:45Z (V13-Implementation) + 2026-04-16T18:14Z-19:22Z (PATCH-M3-Zyklus).

### 13.5 UPGRADE_PLAN-Bezüge

- UPGRADE_PLAN.md UX-1 Finding 2 → F-RA3-01 mit Fix-Snippet.
- UPGRADE_PLAN.md PATCH-M3 Finding 5 → F-RA3-03 + F-RA3-04 als Nachfolge-Konsolidierung.

---

**Ende BERICHT_RA3_ENGINE_ASSEMBLY.**
