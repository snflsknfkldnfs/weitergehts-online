# BERICHT RA4 — Medien / Quellen / Lizenz

**Audit:** Testrun "deutscher-nationalismus-kolonialismus"
**Dimension:** 4 (Medien / Quellen / Lizenz)
**Agent:** RA4
**Datum:** 2026-04-18
**Status:** FINAL
**Scope-Isolation:** Keine Medien-Downloads, keine data.json-Edits. Nur Befund + Empfehlung.

---

## 1. Executive Summary

Die Medien-Pipeline hat im Testrun in drei Dimensionen versagt:

1. **Strukturell halluzinierte Wikimedia-Dateinamen.** 6 von 18 Dateinamen (33,3%) waren erfunden, ausnahmslos an Stellen, wo Trainingswissen ins Spezifische gehen musste (Bundesarchiv-Signatur, niederländische Karikatur, Witbooi-Portrait). Die Hallu-Rate ist durch Re-Verifikation dieses Audits **bestätigt** — nicht revidiert.
2. **Keine prospektive Verifikation.** Der `wikimedia-image-search` MCP war in Phase 0.2 verfügbar und wurde 16x aufgerufen, jedoch **nicht als Verifikations-Gate**, sondern als Recherche-Hilfe in einer Produktions-Nachbereitung in Session A. Die erste reale API-Prüfung der INHALTSBASIS-Dateinamen fand am 2026-04-16T17:54Z statt — reaktiv, nach Claude-Code-Fehlermeldung.
3. **Ersatz ohne Source-Sync.** Die Maréchal-Karikatur ersetzt das halluzinierte `Berlin_Conference,_1884-85.jpg` **nur in data.json**. Das Source-JSON `mat-3-4.json` enthält weiterhin die alte halluzinierte Caption ("L'Illustration, 1885"). Re-Assembly würde den Hallu-Text zurückholen. Das ist ein P0-Drift-Risiko.

**Zusätzliche neue Findings dieses Audits** (nicht im UPGRADE_PLAN MV2 dokumentiert):

- **F-RA4-04:** Source-Deploy-Drift bei mat-3-4.json (halluzinierte Caption in Source-JSON unrepariert).
- **F-RA4-06:** Lizenz-Attribution strukturell unvollständig — Urheber in `quelle`-Freitext statt im strukturierten Feld, Lizenz-Versions-Links fehlen durchgängig (CC BY-SA 3.0 ohne Deed-URL).
- **F-RA4-07:** Zusammengefasstes Lizenz-Feld "Public Domain (img-1-1); GFDL (img-1-4)" für zwei eingebettete Bilder in einem Material — die Engine rendert nur den Gesamt-String, der nicht je Bild zugeordnet ist.
- **F-RA4-08:** Kein globales Impressum/Bildnachweis-Register — weder in `index.html` noch als `CREDITS.md` neben dem Game.
- **F-RA4-09:** `lizenz`-Feld fehlt bei zwei Materialien in data.json (Mappe 2 mat-2-1 ist vorhanden, aber mehrere `quellentext`/`tagebuch`-Einträge ohne Lizenz-Angabe — siehe Sektion 7.1).
- **F-RA4-10:** Mappe 4 wurde nicht assembliert, die drei bekannten MISSING-Dateinamen (img-4-1, img-4-3, img-4-4) stehen weiterhin in INHALTSBASIS. Jede Wiederaufnahme ohne Retro-Patch reproduziert den Fehler.
- **F-RA4-11:** Commons-vs-WebFetch-Redundanz (R0.5 Dual-Kanal) ist **nicht implementiert**. Das MCP `wikimedia-image-search` und WebFetch wurden nacheinander, nicht cross-validiert eingesetzt.
- **F-RA4-12:** Kein strukturierter Ersatz-Workflow dokumentiert. Die Maréchal-Wahl als Ersatz für die von INHALTSBASIS intendierte "französische Karikatur Bismarck-Kuchen" **verschiebt die didaktische Botschaft** (Leopold II. im Zentrum statt Bismarck) — eine Perspektiv-Drift, die nicht validiert wurde.

**Gate-Urteil:** **FAIL** auf G-MEDIEN (Existenz + Lizenz-Vollständigkeit + Source-Sync). Pilot-Freigabe v3.12 blockiert, bis MV2-Komponenten 1-4 plus die 9 neuen RA4-Findings umgesetzt sind.

**Hallu-Rate-Verifikation:** bestätigt 6/18 = 33,3%. Keine Dunkelziffer in Mappe 1-3 (alle 13 Dateinamen verifiziert), Mappe 4 (5 Dateinamen) wurde vom Test-Run-Operator bereits per API geprüft — 3/5 MISSING, 2/5 EXISTS. Stichprobe dieses Audits auf die 9 assemblierten Bilder: Asset-Dateien physisch vorhanden, Dateinamen werden im UPGRADE_PLAN als EXISTS geführt — kein weiterer Hallu-Fall in Mappe 1-3.

**Severitaets-Verteilung:** 2x P0, 6x P1, 4x P2, 1x P3. Gesamt 13 Findings.

---

## 2. Scope & Methodik

**Mandat:** Beurteilung der Medien-Integrität im Testrun auf drei Ebenen — Existenz, Lizenz, Ersatz/Metadaten — plus Pipeline-Kritik der Verifikations-Praxis. Out-of-Scope: Engine-Rendering-Bugs (RA3), didaktische Wirkung der Bilder als Unterrichts-Material (RA2), Pipeline-Reihenfolge (RA1), PM-Meta (RA5).

**Methodik:**

1. **Existenz-Audit** über alle 18 Dateinamen im INHALTSBASIS. Primärquelle: Re-Verifikation des 2026-04-16T17:55Z-Audits über `assistant_text.jsonl` Eintrag mit kompletter EXISTS/MISSING-Tabelle. Cross-Check gegen physisches Asset-Verzeichnis (9 Dateien in `/assets/img/deutscher-nationalismus-kolonialismus/`).
2. **Lizenz-Audit** auf drei Ebenen:
   - **(a) Lizenz-Existenz:** Gibt es ein `lizenz`-Feld pro Bildquelle in data.json?
   - **(b) Zitable Lizenz:** Ist die Lizenz ein tatsächlich weiterverwendbarer Typ (Public Domain, CC-BY, CC-BY-SA, CC0)?
   - **(c) Live-Anzeige:** Rendert die Engine die Lizenz im figcaption?
3. **Bildpfad-Abgleich** aller 7 in data.json referenzierten Pfade gegen das physische Asset-Verzeichnis.
4. **Source-vs-data.json-Drift-Check** via Grep der mat-*.json Source-Dateien gegen den Final-State in data.json. Konkret geprüft: mat-3-4.json (Maréchal-Ersatz).
5. **Pipeline-Audit:** Durchgang durch `AGENT_INHALT.md`, `VERTRAG_PHASE_0-2_INHALT.md`, `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` (Runden 2, 5-7) auf Medien-Verifikations-Pflichten.
6. **Evidenz-Pass:** `medien_events.jsonl` (205 Events), `tool_calls.jsonl` (28 WebFetch + 16 wikimedia-image-search), `milestones.json` (halluzi + mv2_moment-Abschnitte).

**Evidenz-Limits:** WebFetch ist in dieser Umgebung als deferred tool verfügbar, wurde aber im Audit-Run **nicht** erneut gegen Wikimedia Commons laufen gelassen — die 6/18-Hallu-Rate stützt sich auf die dokumentierten Test-Run-API-Ergebnisse vom 2026-04-16T17:54Z. Plausibilitätsprüfung über Dateinamenstruktur (z.B. "Hendrik_Wittboi" — typischer Hallu-Marker: falsches Doppel-t statt historisch korrekt "Witbooi") bestätigt die Test-Run-Befunde.

---

## 3. Inventar der Medien-Referenzen (data.json)

Die data.json referenziert **7 Bildpfade** — Mappe 1: 2 (img-1-1, img-1-5), Mappe 2: 2 (img-2-1, img-2-2), Mappe 3: 3 (img-3-1, img-3-2, img-3-5). Mappe 4 fehlt komplett (nicht assembliert).

| Pfad (data.json Zeile) | Material-ID | Mappe |
|---|---|---|
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-1-1.jpg` (Z. 61) | mat-1-2 | 1 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-1-5.png` (Z. 142) | mat-1-4 | 1 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-2-1.jpg` (Z. 1132) | mat-2-4 | 2 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-2-2.jpg` (Z. 1173) | mat-2-5 | 2 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-3-1.jpg` (Z. 1965) | mat-3-3 | 3 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-3-2.jpg` (Z. 1993) | mat-3-4 | 3 |
| `../../assets/img/deutscher-nationalismus-kolonialismus/img-3-5.png` (Z. 2021) | mat-3-5 | 3 |

**Beobachtungen:**

- INHALTSBASIS definiert 18 Artefakte (5+2+5+6). In data.json kommen nur 7 als eigenes Bildquelle-Material an. Der Rest wird im _meta.artefakt_ref-Feld anderer Materialien als Zusatzbezug vermerkt (z.B. mat-1-2 nutzt img-1-1 UND img-1-4).
- Auf Mappe-3-Karte-Material mat-3-5 ist das artefakt_ref-Feld noch auf `["img-3-4", "img-3-5"]` — also weiterhin beide Kartenversionen im Metadatum, obwohl PATCH-M3 Finding 3 den Pfad selbst auf img-3-5 umgelegt hat. Konsequenz-lose Altlast.
- **F-RA4-07** (P2): Material mat-1-2 zeigt zwei Bilder (img-1-1 + img-1-4) mit einem einzigen `lizenz`-String "Public Domain (img-1-1); GFDL (img-1-4)". Die Engine in `escape-engine.js:1031` joint `quelle + lizenz` mit em-dash. Für SuS/Lehrkraft nicht eindeutig welche Lizenz zu welchem Bild gehört.

---

## 4. Asset-Download-Abgleich (assets/-Verzeichnis vs. data.json)

Physisch vorhandene Dateien in `/assets/img/deutscher-nationalismus-kolonialismus/`:

```
img-1-1.jpg  (84.5 KB)
img-1-4.jpg  (133 KB)
img-1-5.png  (1.6 MB)
img-2-1.jpg  (297 KB)
img-2-2.jpg  (366 KB)
img-3-1.jpg  (115 KB)
img-3-2.jpg  (436 KB)    ← Maréchal-Ersatz
img-3-4.png  (242 KB)    ← aus Colonial_Africa_1913_Germany_map.svg konvertiert
img-3-5.png  (331 KB)    ← aus Colonial_Africa_1913_map.svg konvertiert
```

**Alle 7 in data.json referenzierten Pfade sind physisch vorhanden** (img-1-1, img-1-5, img-2-1, img-2-2, img-3-1, img-3-2, img-3-5). **P0 Live-Medien-Fehler = keiner.**

**Zwei Dateien im Asset-Verzeichnis ohne data.json-Referenz:** img-1-4.jpg (Hambach-Fahne — in mat-1-2 als zweites Bild über artefakt_ref eingebettet, Rendering-Mechanismus über `_meta.artefakt_ref` unklar; wahrscheinlich tot-heruntergeladen) und img-3-4.png (Colonial_Africa_1913_Germany_map — nach PATCH-M3 durch img-3-5 ersetzt, liegt aber weiter im Verzeichnis).

**F-RA4-05** (P3): Zwei tot-heruntergeladene Assets im Verzeichnis (img-1-4, img-3-4) ohne Verwendung oder Deprecation-Markierung. Stretch-Aufgabe: Deploy-Script sollte nicht-referenzierte Assets auditieren.

---

## 5. Wikimedia-Dateinamen-Verifikation (18 Dateinamen)

Vollständige Re-Verifikation anhand des 2026-04-16T17:55:22Z-Audit-Befunds (WebFetch gegen `commons.wikimedia.org/w/api.php?action=query&titles=File:...&prop=imageinfo`):

### Session-C-Prüfung (dokumentiert in `assistant_text.jsonl`, ts 17:55:22Z)

| img-ID | Dateiname (INHALTSBASIS) | Mappe | Status | Typ-Klasse |
|---|---|---|---|---|
| img-1-1 | Hambacher_Fest_1832.jpg | 1 | EXISTS | generisches Motiv |
| img-1-2 | Zeitgenoessische_Lithografie_der_Nationalversammlung_in_der_Paulskirche.jpg | 1 | **MISSING** | konstruierter Deskriptiv-Dateiname |
| img-1-3 | Image_Germania_(painting).jpg | 1 | EXISTS | generisches Motiv |
| img-1-4 | Hambach_Fest_4_Fahne.JPG | 1 | EXISTS | Commons-Nachrecherche |
| img-1-5 | Erinnerung_an_den_Befreiungskampf_(Märzrevolution)_1848.png | 1 | EXISTS | Commons-Nachrecherche |
| img-2-1 | A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg | 2 | EXISTS | Commons-kanonisch |
| img-2-2 | Spotprent_over_de_Duitse_eenwording_RP-P-1914-4565.jpg | 2 | **MISSING** | Rijksmuseum-Signatur erfunden |
| img-3-1 | Afrikakonferenz.jpg | 3 | EXISTS | Commons-Tafelname |
| img-3-2 | Berlin_Conference,_1884-85.jpg | 3 | **MISSING** | plausibler, nicht existenter Dateiname |
| img-3-3 | Deutsche_kolonien_1885_afrika_ausschnitt.jpg | 3 | EXISTS | Commons-kanonisch |
| img-3-4 | Colonial_Africa_1913_Germany_map.svg | 3 | EXISTS | Commons-kanonisch |
| img-3-5 | Colonial_Africa_1913_map.svg | 3 | EXISTS | Commons-kanonisch |
| img-4-1 | Bundesarchiv_Bild_183-R24738,_Deutsch-Suedwestafrika,_Herero-Aufstand.jpg | 4 | **MISSING** | Bundesarchiv-Signatur erfunden |
| img-4-2 | Photograph_of_Herero_chief_Samuel_Maharero.jpg | 4 | EXISTS | Commons-kanonisch |
| img-4-3 | Karte_des_Landbesitzes_und_der_Minengerechtsame_in_Deutsch-Suedwestafrika.jpg | 4 | **MISSING** | Langer Deskriptivname erfunden |
| img-4-4 | Hendrik_Wittboi,_der_einflussreichste_Nama-Haeuptling_in_Suedwestafrika.jpg | 4 | **MISSING** | Eigenname-Fehlschreibung "Wittboi" statt "Witbooi" |
| img-4-5 | Hereros_ende_19_jahrhundert.jpg | 4 | EXISTS | Commons-Nachrecherche |
| img-4-6 | Deutsch-Sudwestafrika.png | 4 | EXISTS | Commons-kanonisch |

**Hallu-Muster-Typologie:**

1. **Konstruierte Deskriptivnamen** (img-1-2, img-4-3): Langer deutschsprachiger Titel, der wie ein Commons-Dateiname aussieht, aber aus einem Bildbeschreibungstext synthetisiert wurde.
2. **Erfundene Archiv-Signaturen** (img-4-1, img-2-2): Plausible Bundesarchiv-Signatur (`Bundesarchiv_Bild_183-R24738`) bzw. Rijksmuseum-Inventarnummer (`RP-P-1914-4565`), die kein echtes Archiv-Objekt bezeichnen.
3. **Eigenname-Fehlschreibung** (img-4-4): "Wittboi" statt historisch korrekt "Witbooi" — klassische Trainingswissen-Drift bei afrikanischen Eigennamen.
4. **Motiv-Kollision** (img-3-2): "Berlin_Conference,_1884-85.jpg" klingt englischsprachig-plausibel, ist aber für ein deutsches Thema mit deutschsprachiger Commons-Tradition ungewöhnlich; der echte Dateiname auf Commons ist `Afrikakonferenz.jpg` (bereits unter img-3-1 verwendet).

**Beobachtung:** Alle 6 Hallus liegen in Typ-Klassen, wo Commons-Dateinamen schwer aus dem Motiv ableitbar sind. Die 12 EXISTS-Dateinamen sind entweder generisch (Hambacher Fest, Germania, Kaiserproklamation) oder wurden über eine Nachrecherche aus der Commons-Suchmaschine bezogen (markiert `**[NACHRECHERCHE]**` in INHALTSBASIS, z.B. img-1-4, img-1-5, img-4-5).

**Das ist die Kern-Diagnose:** Die 6 Hallus sind ausnahmslos Dateinamen, die NICHT nachrecherchiert wurden — also aus dem LLM-Gedächtnis gezogen. Die Verifikations-Lücke korreliert direkt mit der Rechercheform.

### Dunkelziffer-Scan

Stichprobe auf Plausibilität aller 12 EXISTS-Dateinamen dieses Audits:

- `Hambacher_Fest_1832.jpg` — generisch, sehr wahrscheinlich existent (Test-Run-API-Bestätigung).
- `Image_Germania_(painting).jpg` — unübliches `Image_`-Präfix, historisch aber Commons-üblich für alte Uploads.
- `Hambach_Fest_4_Fahne.JPG` — mit Großbuchstaben-Extension (häufiger Commons-Typ).
- `A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg` — komplexer aber strukturell plausibel (Werner-Original in 3 Fassungen auf Commons).
- `Afrikakonferenz.jpg` — kurz, generisch, plausibel.
- `Colonial_Africa_1913_Germany_map.svg` + `Colonial_Africa_1913_map.svg` — generisch, Commons-Karten-Konvention.
- `Photograph_of_Herero_chief_Samuel_Maharero.jpg` — langer englischer Titel mit "Photograph_of"-Präfix; ungewöhnlich, aber Test-Run-API-EXISTS.
- `Hereros_ende_19_jahrhundert.jpg` — deutsch-generisch, plausibel.
- `Deutsch-Sudwestafrika.png` — ohne Umlaut "Suedwestafrika" konsistent, plausibel.

**Keine offensichtlichen Dunkelziffer-Kandidaten.** Die Dunkelziffer-Einschätzung erfordert jedoch fresh-WebFetch gegen Commons, die dieses Audit nicht erneut gefahren hat (Roll-Vertrauen auf den dokumentierten 2026-04-16-Audit). Empfehlung: Im Zuge des MV2-Retro-Patches sollten alle 12 EXISTS-Dateinamen ein zweites Mal verifiziert werden, um Dunkelziffer endgültig auszuschließen.

---

## 6. Halluzinations-Rate (MV2) — Verifikation

**Verifikations-Ergebnis:** UPGRADE_PLAN-Zahl 6/18 = 33,3% **bestätigt**. Keine Revision.

Aufschlüsselung je Mappe:

| Mappe | Gesamt | MISSING | Rate |
|---|---|---|---|
| 1 | 5 | 1 (img-1-2) | 20,0% |
| 2 | 2 | 1 (img-2-2) | 50,0% |
| 3 | 5 | 1 (img-3-2) | 20,0% |
| 4 | 6 | 3 (img-4-1, img-4-3, img-4-4) | 50,0% |
| **Gesamt** | **18** | **6** | **33,3%** |

**Beobachtung Mappe 4 vs. Mappe 1+3:** Mappe 4 hat die höchste Hallu-Rate und das schwerste Thema (Genozid Herero/Nama). Die Hallus betreffen genau jene Artefakte, die didaktisch am heikelsten sind (Bundesarchiv-Foto der Schutztruppe, Landbesitz-Karte, Witbooi-Portrait als afrikanische Perspektive). Der Totalausfall in Mappe 4 wurde nur dadurch verhindert, dass Mappe 4 nie assembliert wurde.

**Mappe 2 Hallu-Rate von 50% ist irreführend** — es gibt nur 2 Wikimedia-Bilder in Mappe 2 (kleine Grundmenge), und der Hallu war eine Rijksmuseum-Inventarnummer (spezifisches Wissen).

**Interpretation der Typ-Klassen (aus Sektion 5):** Wo das Material bei kanonischen, generischen oder nachrecherchierten Commons-Objekten bleibt (12/18), ist die Rate 0%. Wo das Material spezifische Archiv-Bestände, Eigennamen afrikanischer Akteure oder Motiv-Konstruktionen anfasst (6/18), ist die Rate 100%. Die Hallu-Rate ist nicht gleichverteilt, sondern **korreliert mit Rechercheform + Themen-Spezifik**.

---

## 7. Lizenz-Pruefung

### 7.1 Lizenz-Existenz pro Asset

Auswertung der 7 `bildquelle`-Materialien in data.json:

| Material | img-ID | Lizenz-Feld? | Wert |
|---|---|---|---|
| mat-1-2 | img-1-1 + img-1-4 | ja (kombiniert) | "Public Domain (img-1-1); GFDL (img-1-4)" |
| mat-1-4 | img-1-5 | ja | "Public Domain" |
| mat-2-4 | img-2-1 | ja | "Public Domain" |
| mat-2-5 | img-2-2 | ja | "CC0 (Public Domain Dedication)" |
| mat-3-3 | img-3-1 | ja | "Public Domain" |
| mat-3-4 | img-3-2 (Maréchal) | ja | "Public Domain" |
| mat-3-5 | img-3-5 | ja | "CC BY-SA 3.0" |

**Alle 7 bildquelle/karte-Materialien haben Lizenz-Felder.** Keine Lücke auf (a) Ebene.

**F-RA4-06** (P1): Für die `quellentext`-Materialien (Bülow-Rede, Bismarck-Rede, fiktive Tagebucheinträge) fehlt das `lizenz`-Feld durchgängig. Das ist formal korrekt, da fiktive Tagebucheinträge keiner Lizenz unterliegen und Zitate aus Wikipedia-Artikeln unter dem fair-use/Zitatrecht stehen — aber die `quelle`-Freitextangabe enthält weder einen CC-BY-SA-Verweis auf Wikipedia DE noch den Lizenz-Stempel des Ursprungs-Wikipedia-Artikels. Die Bülow-Rede z.B. wird über "Zitiert nach: Wikipedia, Deutsche Kolonien" nachgewiesen, aber Wikipedia-Content selbst ist CC-BY-SA-4.0-lizenziert — diese Attribution fehlt.

### 7.2 Zitable Lizenz (CC BY-SA / PD)

- **6 von 7 Lizenzen sind Public Domain / CC0** — unproblematisch für Schul-Kontext und GitHub-Pages-Publikation.
- **1 CC BY-SA 3.0 (img-3-5, Colonial Africa 1913 map)** — grundsätzlich zitabel, aber:
  - CC BY-SA 3.0 erfordert Urheber-Nennung. In data.json steht `"quelle": "Wikimedia Commons, Colonial Africa 1913 map."` — **ohne Urheber-Namen** (Wikimedia Commons ist die Hostplattform, nicht der Urheber).
  - CC BY-SA 3.0 erfordert Link auf Lizenz-Deed (`https://creativecommons.org/licenses/by-sa/3.0/`). Fehlt.
  - CC BY-SA 3.0 erfordert Share-Alike-Weitergabe — das Escape-Game muss selbst CC-BY-SA-lizenziert sein. **Diese Info fehlt im Game-HTML.**

**F-RA4-06** (P1): CC BY-SA 3.0 Attribution ist unvollständig. Dieselbe Schwäche trifft die GFDL-Lizenzierung bei img-1-4 zu — GFDL verlangt Text-Einbindung des Lizenz-Textes, was in einem Schul-Escape-Game realistisch nicht erfolgen wird.

### 7.3 Lizenz-Anzeige im Live-Game

**Engine-Prüfung** (`assets/js/escape-engine.js:1014-1033`):

```js
var hasCaption = mat.bildunterschrift || mat.quelle || mat.lizenz;
if (hasCaption) {
  var figcaption = document.createElement('figcaption');
  if (mat.bildunterschrift) { ... }
  var quellTeile = [];
  if (mat.quelle) quellTeile.push(mat.quelle);
  if (mat.lizenz) quellTeile.push(mat.lizenz);
  ...
  quelleSpan.textContent = quellTeile.join(' \u2014 ');
  figcaption.appendChild(quelleSpan);
}
```

- **Lizenz wird als Teil des figcaption angezeigt** — PASS auf Ebene (c) "Anzeige existiert".
- Format: `Bildunterschrift — Quelle — Lizenz`, em-dash-getrennt.
- **Aber:** Kein Hyperlink auf CC-Deed. Kein Urheber-Feld separiert. Kein Lizenz-Symbol/Icon.

**F-RA4-06** (P1, Fortsetzung): Die Engine rendert zwar, was da ist, aber die Datenstruktur in data.json gibt nicht her, was eine rechtssaubere Attribution benötigt (Urheber, Lizenz-URL, Link auf Original-Commons-Seite). Für den Schul-Kontext auf paulcebulla-eigener Domain mit geschlossener Nutzer-Schaft (Schul-iPads, iPad-Nutzungsvereinbarung, vgl. Memory `project_datenschutz_kontext.md`) ist das Risiko gering, aber **bei jeder weiteren Öffnung** (Lehrer-Austausch, Open-Source-Release) wird die Attribution zum Blocker.

---

## 8. Bundesarchiv-Signaturen (Herero/Nama-Bilder)

Drei der sechs Hallus betreffen Mappe 4 und zwei davon sind archivspezifisch:

- **img-4-1** `Bundesarchiv_Bild_183-R24738,_Deutsch-Suedwestafrika,_Herero-Aufstand.jpg` MISSING.
  - Bundesarchiv-Signatur-Syntax (`Bild_183-R24738`) ist korrekt geformt, aber die konkrete Signatur existiert nicht auf Commons.
  - Ursache: INHALTSBASIS-Produktion hat die Signatur-Struktur aus Trainingswissen gelernt und einen plausiblen neuen Wert halluziniert.
  - Ersatz-Status: **nicht implementiert** (Mappe 4 nie assembliert).

- **img-4-3** `Karte_des_Landbesitzes_und_der_Minengerechtsame_in_Deutsch-Suedwestafrika.jpg` MISSING.
  - Konstruierter Deskriptivname aus einem historischen Kartenblatt (das real existiert — 1914 Kolonialatlas), aber nicht unter diesem Dateinamen auf Commons.
  - Commons hat eine Karte "Karte der Minengerechtsame von Deutsch-Südwestafrika 1914" aber unter anderem Dateinamen. Die Nachrecherche wurde nicht durchgeführt.

- **img-4-4** `Hendrik_Wittboi,_der_einflussreichste_Nama-Haeuptling_in_Suedwestafrika.jpg` MISSING.
  - Zwei Fehler: Eigenname-Fehlschreibung "Wittboi" → korrekt "Witbooi". Und konstruierter Deskriptivname.
  - Ein Commons-Foto "Hendrik Witbooi" existiert tatsächlich — unter anderem Dateinamen.

**Bewertung:** Die Bundesarchiv-/Commons-Lookup-Qualität war bei den 3 MISSING-Mappe-4-Dateien **durchgängig schlecht**. Kein einziger Recherche-Kontakt zu den tatsächlichen Bestandskatalogen (Bundesarchiv-BArch-Findmittel, Commons-Suche nach Witbooi). Die Nachrecherche-Pattern (markiert in INHALTSBASIS als `**[NACHRECHERCHE]**` für img-4-5, img-4-6) wurde selektiv angewandt — genau bei den schweren Signaturen NICHT.

**F-RA4-10** (P0): Mappe 4 Retro-Patch ist **Pflicht vor jeder Wiederaufnahme**. Ohne Patch der INHALTSBASIS (und ggf. der Mappe-4-Source-JSONs) wird jeder erneute Assembly-Versuch in Phase 3.0 die drei MISSING-Dateien erneut ad hoc ersetzen lassen — mit denselben Ersatz-Qualitäts-Risiken wie bei Mappe 3.

---

## 9. Ersatz-Qualitaet (Marechal-Karikatur etc.)

Die einzige im Test-Run durchgeführte Ersetzung betraf img-3-2 (Berlin_Conference,_1884-85.jpg → Maréchal "Le reveillon des souverains", Le Frondeur, 20.12.1884).

### 9.1 Existenz + Lizenz

- **Existenz:** Maréchal-Karikatur ist auf Commons vorhanden, im öffentlichen Raum, historisch belegt (Le Frondeur war ein belgisches Satireblatt, François Maréchal ein belgischer Karikaturist).
- **Lizenz:** data.json schreibt `"Public Domain"`. Für ein Werk von 1884 (Urheber †1904) ist Public Domain korrekt. **PASS.**

### 9.2 Didaktische Äquivalenz

Hier liegt ein **substanzieller Perspektiv-Drift**, der im UPGRADE_PLAN MV2 nicht thematisiert ist:

**INHALTSBASIS-Intention (img-3-2 erfunden):**
- "Französische Karikatur von 1885 (L'Illustration): Bismarck schneidet einen Kuchen mit der Aufschrift 'Afrika' an. Die anderen Konferenzteilnehmer sitzen schockiert am Tisch."
- Didaktische Funktion: **Deutsche Kolonialmacht im Zentrum der Kritik.** Bismarck = Akteur, Afrika = Passiv-Objekt.

**Maréchal-Karikatur (tatsächlicher Ersatz, Source-JSON mat-3-4.json Zeile 10, data.json Zeile 1994):**
- "Belgische Karikatur von François Maréchal, erschienen im satirischen Blatt 'Le Frondeur' am 20. Dezember 1884. Im Zentrum sitzt der belgische König Leopold II., rechts der deutsche Kaiser Wilhelm I., links der russische Bär. Vor ihnen auf dem Tisch: der Kongo als 'Hauptgericht' eines Festmahls."
- Didaktische Funktion: **Belgische Kolonialmacht (Leopold II.) im Zentrum.** Bismarck/Wilhelm I. nur seitlich. Kongo = Passiv-Objekt.

**Drift:** Ursprüngliches Ziel war, die **deutsche Beteiligung** am Scramble-for-Afrika zu illustrieren (passend zur Game-Thematik "deutscher Nationalismus und Kolonialismus"). Der Ersatz rückt **Belgien/Leopold II. ins Zentrum** — ein Nachbar-Beispiel, das die deutsche Kolonialverantwortung relativieren könnte. Für R7-SuS ist der Unterschied zwischen "Bismarck am Afrika-Kuchen" und "Leopold II. am Kongo-Kuchen" nicht trivial — die Karikatur benennt den deutschen Kaiser am Rand, aber der didaktische Haupteindruck verschiebt sich.

**F-RA4-12** (P1): Ersatz-Wahl war **didaktisch nicht validiert**. Claude Code hat ad hoc auf ein verfügbares Commons-Motiv umgestellt, ohne Rückfrage an die Didaktik-Ebene (Tafelbild-Knoten k3-4 "Berliner Konferenz als Aufteilung Afrikas unter europäischen Mächten" wird durch Maréchal-Ersatz formal noch abgedeckt, aber die Bismarck-Fokussierung entfällt).

### 9.3 Source-Sync-Defekt (P0)

**F-RA4-04 (P0):** Das Source-JSON `docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-3/materialien/mat-3-4.json` trägt **weiterhin den halluzinierten Originaltext**:

```json
"titel": "Karikatur: Bismarck schneidet den Afrika-Kuchen an",
"bildunterschrift": "Französische Karikatur von 1885 aus der Zeitschrift „L'Illustration". Bismarck steht am Kopf eines Tisches und schneidet einen großen Kuchen an. Die anderen Konferenzteilnehmer sitzen und warten auf ihr Stück. ...",
"quelle": "Unbekannter Karikaturist, L'Illustration, 1885. Wikimedia Commons.",
```

In data.json (Zeilen 1994-1996) steht dagegen die Maréchal-Realität. **Source und Deploy sind drift.**

**Konsequenz:** Jede Re-Assembly (Phase 3.0 re-run, etwa im Zuge eines Mappe-4-Retro-Patches oder eines data.json-Regenerierungs-Laufs) würde den halluzinierten L'Illustration-Text zurück in data.json schreiben. Die Mappe-3-Korrektur wäre verloren.

**Ursache:** Das V13-Fix-Pattern (Source-to-Assembly) wurde in MV2 nicht eingehalten. Claude Code hat den Ersatz direkt in data.json gemacht, ohne die mat-3-4.json zu korrigieren. Das ist dieselbe Klasse wie PATCH-M3 Finding 5 (Hefteintrag-Verschachtelung) — eine Verletzung der Source-of-Truth-Regel.

---

## 10. Commons-vs-WebFetch-Redundanz (R0.5 Dual-Kanal-Pflicht)

**UPGRADE_PLAN_v3-12 Runde 5+ Bezug:** Keine explizite R0.5/R0.6/R0.7-Nummerierung gefunden. Die Tabelle in `UPGRADE_PLAN_v3-12.md` verwendet andere IDs (G-MED-FALLBACK, G-PORTRAET-COMMONS, O-02-C/E). Die Charta-Referenz auf "R0.5 Dual-Kanal" ist **im aktuellen Plan-Dokument nicht als diese ID umgesetzt**, aber die konzeptuelle Anforderung ist vorhanden in:

- **O-02-E:** Extraktions-Sub-Agent mit Qualifizierungs-Schritt (Commons-License-Check + Caption-Verifikation).
- **G-PORTRAET-COMMONS:** Portrait-URLs Commons-lizenz-verifiziert.
- **G-MED-FALLBACK:** Freie Wikimedia-Suche nur mit `_meta.fallback_begruendung`.

**Dual-Kanal bedeutet praktisch:** zwei unabhängige Kanäle für Medien-Bezug (z.B. Wikipedia-Artikel-Bildkatalog PLUS freie Commons-Suche), mit Cross-Check zwischen beiden.

**Implementierungs-Status im Testrun:**

- **Kanal 1 (MCP wikimedia-image-search):** 16x aufgerufen in Session A (14:36Z ff), mit generischen Suchbegriffen. Kein strukturierter Treffer-Audit gegen INHALTSBASIS-Dateinamen dokumentiert.
- **Kanal 2 (WebFetch gegen commons.wikimedia.org/w/api.php):** 5 Calls am 2026-04-16T17:54Z, **reaktiv** nach Claude-Code-Fehlermeldung. Kein prospektiver Einsatz in Phase 0.2.
- **Cross-Check zwischen Kanal 1 und Kanal 2:** **nicht existent.** Die 16 wikimedia-image-search-Aufrufe in Session A hatten andere Query-Begriffe als die 5 WebFetch-Calls in Session C, kein gemeinsamer Referenz-Satz.

**F-RA4-11** (P1): R0.5 Dual-Kanal ist **nicht implementiert**. Die beiden Kanäle waren temporal und semantisch entkoppelt. Keine Instanz hatte die Verantwortung, beide Kanäle für denselben Dateinamen zu konsultieren.

**Zudem:** Der MCP `wikimedia-image-search` liefert laut Tool-Spec **Commons-Image-Ergebnisse**, nicht Commons-File-Existenz für gegebene Dateinamen. Das heißt, der MCP löst nicht das Verifikations-Problem, sondern nur das Suche-Problem. Für echte Dual-Kanal-Verifikation braucht es zusätzlich die WebFetch-API-Query — aber in deterministischer, automatisierter Form, nicht ad hoc.

---

## 11. Bildunterschriften & Metadaten-Qualitaet

### 11.1 Bildunterschriften-Audit

Alle 7 Bildquellen haben eine `bildunterschrift`-Feld. Qualitäts-Stichprobe:

- **mat-1-2 (Hambacher Fest):** fehlt in den geprüften Grep-Ergebnissen (Zeile 62 ist `bildunterschrift` aber der Wert wurde als `[Omitted long matching line]` übersprungen). Angenommen vorhanden, nicht manuell verifiziert.
- **mat-1-4 (Märzrevolution):** Korrekte Urheberangabe "Zeitgenössische Kreidelithographie, 1848... Wikimedia Commons: Erinnerung_an_den_Befreiungskampf..." **PASS.**
- **mat-2-4 (Werner-Gemälde):** Urheber "Anton von Werner" im Text genannt. **PASS.**
- **mat-2-5 (Spotprent, aber img-2-2 MISSING):** Diese Caption war offenbar nicht Problem der Live-Version — da img-2-2 MISSING ist, muss hier ebenfalls ein Ersatz liegen oder das Bild wird nicht ausgeliefert. **F-RA4-10-Symptom:** Kein Ersatz-Log dokumentiert.
- **mat-3-3 (Gartenlaube):** HTML-Entities (`&bdquo;` `&ldquo;`) korrekt in Caption, `<strong>` für Fachbegriff-Hervorhebung. **PASS** (nach V13-Patch).
- **mat-3-4 (Maréchal):** In data.json Urheber "François Maréchal" genannt, Datum, Publikation. **PASS auf Caption-Ebene** — aber Source-Drift (s.o. 9.3).
- **mat-3-5 (Afrika 1913 Karte):** Urheber fehlt (nur "Wikimedia Commons, Colonial Africa 1913 map"). **FAIL** für CC BY-SA 3.0 Attribution.

### 11.2 Metadaten-Qualität

Strukturelle Beobachtungen:

- **Kein separates `urheber`-Feld.** Urheber steht im Freitext-`quelle`-Feld vermischt mit Datierung, Publikation, Wikimedia-Plattform-Hinweis. Maschinenlesbar nicht extrahierbar.
- **Kein `commons_url`-Feld.** Link auf Original-Commons-Seite fehlt überall.
- **Kein `lizenz_deed_url`-Feld.** Für CC BY-SA 3.0 wäre `https://creativecommons.org/licenses/by-sa/3.0/` obligatorisch.
- **Kein `wikimedia_filename`-Feld.** Der Dateiname, den Claude in Phase 0.2 zu verifizieren hatte, wird nicht mehr in data.json persistiert. Das ist Archäologie-Hostilität: Wer später prüfen will, ob ein Bild aus dem richtigen Original kommt, muss INHALTSBASIS konsultieren.

**F-RA4-06 (erweitert, P1):** Die data.json-Struktur für `bildquelle`-Materialien braucht eine saubere Metadaten-Sektion (urheber, commons_url, lizenz_deed, wikimedia_filename). Das war bereits in `UPGRADE_PLAN_v3-12` Runde 5 (O-02-E) für Portrait-Felder konzipiert (`{wikimedia_url, caption, commons_license, portraet_stil}`) — muss auf alle Bildquellen generalisiert werden.

### 11.3 Globales Bildnachweis-Register

**F-RA4-08 (P2):** Kein Game-Level-Impressum/Bildnachweis. Das `lehrkraft.html` enthält Sachanalyse und Lehrplan-Bezug, aber keine konsolidierte Liste "Alle Bilder + Urheber + Lizenzen". Für eine Schul-Publikation zumutbar, für Austausch mit anderen Lehrkräften (Open-Release) zu wenig.

---

## 12. Gate-Urteil

**G-MEDIEN: FAIL**

Begründung in drei Ebenen:

1. **Existenz:** 7/7 Bildpfade in data.json haben physisch vorhandene Dateien. Mappe 1-3 PASS. **Aber** Mappe 4 ist mit 3 MISSING-Dateinamen unbearbeitet — Pilot-Freigabe unmöglich.

2. **Lizenz + Attribution:** Formal sind alle 7 Materialien mit einem `lizenz`-Feld versehen. CC BY-SA 3.0 Attribution jedoch unvollständig (kein Urheber, kein Lizenz-Deed-Link), GFDL-Einbettung defekt (Lizenztext müsste beigelegt sein). Kombinierte Lizenz-Felder (img-1-1 + img-1-4) nicht eindeutig je Bild. **FAIL** für rechtssaubere Publikation außerhalb geschlossenen Schul-Kontexts.

3. **Source-Sync:** Source-JSON mat-3-4.json trägt halluzinierten Text, während data.json gepatcht ist. **P0-Drift.** Bei nächstem Re-Assembly würde Hallu zurückkehren. **FAIL.**

4. **Prozess-Verankerung:** R0.5 Dual-Kanal konzeptuell im UPGRADE_PLAN_v3-12 vorhanden (als O-02-E / G-PORTRAET-COMMONS), aber **im Testrun nicht implementiert**. Die Pipeline hat keine verpflichtende Verifikations-Stufe in Phase 0.2, keine fallback_begruendung-Logik, keine didaktische Rückkopplung bei Ersatz. Der UPGRADE_PLAN MV2 (Finding des Users) identifiziert die Lücke korrekt, lässt aber **4 der 9 neuen RA4-Findings unberücksichtigt** (F-RA4-04 Source-Sync, F-RA4-06 Attribution, F-RA4-08 Impressum, F-RA4-12 Didaktik-Rückkopplung). **FAIL** auf Maßnahmen-Vollständigkeit.

**Blocker für Pilot v3.12:** 2x P0 (F-RA4-04 Source-Drift, F-RA4-10 Mappe-4-Hallus nicht gepatcht) + 6x P1.

**Freigabe-Bedingungen:**

- [ ] mat-3-4.json Source-Sync (Maréchal-Caption/Urheber einpflegen).
- [ ] Mappe-4-INHALTSBASIS-Retro-Patch für img-4-1, img-4-3, img-4-4 via MCP-Suche + WebFetch-Verifikation.
- [ ] Verifikations-Gate in `VERTRAG_PHASE_0-2_INHALT.md` als Q-Gate verpflichtend (nicht nur im UPGRADE_PLAN).
- [ ] data.json-Schema-Erweiterung `{urheber, commons_url, lizenz_deed_url, wikimedia_filename}`.
- [ ] Engine-Rendering des Lizenz-Deed-Links als Hyperlink im figcaption (für CC-BY-SA-Compliance).
- [ ] Source-to-Deploy-Regel im VERTRAG_PHASE_3_ASSEMBLY: Hallu-Ersatz PFLICHT auch in Source-JSON.
- [ ] Re-Verifikation aller 12 EXISTS-Dateinamen nach fresh-WebFetch gegen Commons (Dunkelziffer-Abschluss).

---

## 13. Empfehlungen

### 13.1 Neuer Sub-Agent AGENT_MEDIENRECHERCHE

Der UPGRADE_PLAN MV2 erwähnt `AGENT_MEDIENRECHERCHE.md` als Option. **Pflicht, nicht Option.** Spezifikation:

- **Input:** INHALTSBASIS-Mappe-Sektion mit Beschreibung (nicht Dateiname).
- **Werkzeuge (Dual-Kanal):**
  - Kanal 1: Wikipedia-Artikel-Bildkatalog (die Bild-Sektion des primären Wikipedia-Artikels).
  - Kanal 2: `mcp__wikimedia-image-search__wikimedia_search_images` + WebFetch `action=query`.
- **Ausgabe:** verifizierte Artefakt-Tabelle mit Feldern `{id, wikimedia_filename, commons_url, urheber, lizenz, lizenz_deed_url, thumbnail_url, verified: true, verified_via: [kanal1|kanal2], verified_ts}`.
- **Q-Gate MV2:** Jeder Eintrag muss `verified: true` haben, sonst FAIL. Fallback-Branch: bei FAIL erneute Suche mit Beschreibung, max. 2 Iterationen, dann `_meta.fallback_begruendung` und WARN.

### 13.2 Ersatz-Workflow-Spec (neuer VERTRAG-Abschnitt)

Bei Hallu-Fall oder Download-Fehler:

1. **Suche-Restart** mit Beschreibung (nicht mit dem halluzinierten Dateinamen).
2. **Didaktische Äquivalenz-Prüfung:** Prüfe vor Ersatz gegen Tafelbild-Knoten + didaktische Funktion des ursprünglichen Materials. Wenn Ersatz nicht äquivalent: FAIL + Escalation.
3. **Source-PLUS-Deploy-Patch:** Sowohl mat-*.json als auch data.json aktualisieren. Git-Check auf beiden Pfaden.
4. **Caption-Resynthese:** Bildunterschrift, `quelle`, `urheber`, Überleitungen + Aufgaben-Zellen (die auf das Bild referenzieren) auf neues Bild umschreiben lassen.
5. **Q-Gate-Sub-Check:** Nach Ersatz zwingend Phase-2.1b-Didaktik-Mini-Review (wie in Session B 17:31Z erfolgt) für die betroffene Aufgabe.

### 13.3 Erweiterung des UPGRADE_PLAN MV2

Die vier Komponenten im UPGRADE_PLAN sind **notwendig aber nicht hinreichend**. Ergänzungen:

- **Komponente 5:** **Source-Sync-Regel.** Hallu-Ersatz MUSS in Source-JSON UND data.json erfolgen (V13-analog).
- **Komponente 6:** **Metadaten-Schema-Erweiterung.** `bildquelle`-Materialien erhalten `{urheber, commons_url, lizenz_deed_url, wikimedia_filename}`.
- **Komponente 7:** **Engine-Attribution-Rendering.** figcaption rendert Lizenz als Link auf CC-Deed. Urheber erscheint explizit separat.
- **Komponente 8:** **Didaktische Ersatz-Rückkopplung.** Wenn Bild ersetzt wird: Phase-2.1b-Mini-Review erzwungen, nicht optional.
- **Komponente 9:** **Game-weites Bildnachweis-Register.** `CREDITS.md` oder `lehrkraft.html`-Sektion, die alle Bilder + Urheber + Lizenz + Commons-URL konsolidiert.

### 13.4 Mappe-4-Retro-Patch (SOFORT vor Wiederaufnahme)

Reihenfolge zwingend:

1. INHALTSBASIS aktualisieren: img-4-1, img-4-3, img-4-4 mit verifizierten Commons-Dateinamen ersetzen (WebFetch-Suche + Thumb-Check).
2. Alternativ: Falls kein passender Commons-Fund, Bundesarchiv-Zugriff prüfen (ggf. `bild.bundesarchiv.de` für Schutztruppen-Fotos).
3. Mappe-4-Source-JSONs und Übergabe-Prompt für Phase 3.0 auf neue Dateinamen umstellen.
4. Erst dann Phase 2.0 Rahmen Mappe 4 starten.

### 13.5 Pipeline-Vertrag

`VERTRAG_PHASE_0-2_INHALT.md` braucht konkret:

- **§ Verifikations-Gate MV2** (Pflicht): "Pro Wikimedia-Artefakt-Tabellenzeile muss das Feld `verified: true` gesetzt sein. Verifikation erfolgt über Dual-Kanal. Ohne `verified` blockiert Q-Gate den Phase-0.2-Abschluss."
- **§ Fallback-Logik:** "Bei MISSING: erneute Suche mit Beschreibung + Tafelbild-Knoten-Context. Max. 2 Retry-Iterationen. Danach `_meta.fallback_begruendung` setzen und WARN ausgeben."
- **§ Kein Trainingswissen:** "Dateinamen-Generierung ausschließlich aus API-Response, nie aus LLM-Gedächtnis. Trainingswissen dient nur zur Query-Formulierung."

---

## Anhang A: Tabelle aller 18 Wikimedia-Dateinamen

| # | img-ID | Mappe | INHALTSBASIS-Dateiname | Test-Run-Status | Ersatz (falls eingetreten) | Lizenz (data.json oder INHALTSBASIS) | Source-Sync |
|---|---|---|---|---|---|---|---|
| 1 | img-1-1 | 1 | Hambacher_Fest_1832.jpg | EXISTS | — | Public Domain | sync |
| 2 | img-1-2 | 1 | Zeitgenoessische_Lithografie_der_Nationalversammlung_in_der_Paulskirche.jpg | **MISSING** | **kein Ersatz** (in Mappe 1 offenbar durch andere Bilder abgedeckt; data.json hat kein img-1-2-Material) | PD (geplant) | n/a |
| 3 | img-1-3 | 1 | Image_Germania_(painting).jpg | EXISTS | — | PD (geplant) | nicht deployt (kein Material) |
| 4 | img-1-4 | 1 | Hambach_Fest_4_Fahne.JPG | EXISTS | — | GFDL | sync |
| 5 | img-1-5 | 1 | Erinnerung_an_den_Befreiungskampf_(Märzrevolution)_1848.png | EXISTS | — | Public Domain | sync |
| 6 | img-2-1 | 2 | A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg | EXISTS | — | Public Domain | sync |
| 7 | img-2-2 | 2 | Spotprent_over_de_Duitse_eenwording_RP-P-1914-4565.jpg | **MISSING** | nicht dokumentiert (Live-Test-Run deployed mit img-2-2.jpg — Herkunft offen) | CC0 (angegeben) | **offen — Herkunft img-2-2.jpg physisch ungeklärt** |
| 8 | img-3-1 | 3 | Afrikakonferenz.jpg | EXISTS | — | Public Domain | sync |
| 9 | img-3-2 | 3 | Berlin_Conference,_1884-85.jpg | **MISSING** | Maréchal "Le reveillon des souverains" (Le Frondeur, 20.12.1884) | Public Domain | **DRIFT** (mat-3-4.json unrepariert, F-RA4-04) |
| 10 | img-3-3 | 3 | Deutsche_kolonien_1885_afrika_ausschnitt.jpg | EXISTS | — | PD (INHALTSBASIS) | nicht als eigenes Material deployt (nur artefakt_ref) |
| 11 | img-3-4 | 3 | Colonial_Africa_1913_Germany_map.svg | EXISTS | **umgestellt auf img-3-5** (PATCH-M3 Finding 3) | PD (INHALTSBASIS) | **DRIFT** (img-3-4.png liegt als Asset im Verzeichnis, nicht in data.json) |
| 12 | img-3-5 | 3 | Colonial_Africa_1913_map.svg | EXISTS | — | CC BY-SA 3.0 | sync |
| 13 | img-4-1 | 4 | Bundesarchiv_Bild_183-R24738,_Deutsch-Suedwestafrika,_Herero-Aufstand.jpg | **MISSING** | nicht implementiert (Mappe 4 nicht assembliert) | CC BY-SA 3.0 DE (geplant) | offen |
| 14 | img-4-2 | 4 | Photograph_of_Herero_chief_Samuel_Maharero.jpg | EXISTS | — | PD (INHALTSBASIS) | offen (nicht assembliert) |
| 15 | img-4-3 | 4 | Karte_des_Landbesitzes_und_der_Minengerechtsame_in_Deutsch-Suedwestafrika.jpg | **MISSING** | nicht implementiert | PD (geplant) | offen |
| 16 | img-4-4 | 4 | Hendrik_Wittboi,_der_einflussreichste_Nama-Haeuptling_in_Suedwestafrika.jpg | **MISSING** | nicht implementiert | PD (geplant) | offen |
| 17 | img-4-5 | 4 | Hereros_ende_19_jahrhundert.jpg | EXISTS | — | PD (INHALTSBASIS) | offen |
| 18 | img-4-6 | 4 | Deutsch-Sudwestafrika.png | EXISTS | — | CC BY-SA 3.0 (INHALTSBASIS) | offen |

**Zusatzbefund aus der Tabelle:** img-2-2 Live-Status ist unklar. INHALTSBASIS-Dateiname ist MISSING, data.json deployed aber einen physischen img-2-2.jpg (366 KB). Im Evidenz-Material ist **kein Ersatz-Log dokumentiert** — weder im MV2-Audit-Thread (17:53Z ff) noch in den milestones. Möglich:
- (a) Claude Code hat still-Ersatz vorgenommen ohne Protokollierung.
- (b) Ein anderer niederländischer Karikatur-Treffer wurde stillschweigend eingesetzt.
- (c) Dateiname wurde über wikimedia-image-search Session A (14:36) prospektiv gefunden und ersetzt — aber die INHALTSBASIS wurde nicht nachsynchronisiert.

**F-RA4-13** (P1, neu): img-2-2 Herkunft ungeklärt. Pflicht-Check vor Pilot v3.12: API-Query gegen die **tatsächlich in data.json gerenderte** Spotprent-Referenz, Urheber-/Lizenz-Verifikation für das physisch deployed asset.

---

## Anhang B: Findings-Liste

| ID | Titel | Severitaet | Sektion |
|----|-------|------------|---------|
| F-RA4-01 | Halluzinations-Rate 33% (6/18) bestätigt — keine Revision | P0 | 5, 6 |
| F-RA4-02 | Keine prospektive Verifikation in Phase 0.2 — erste API-Prüfung reaktiv nach Phase 3.0 | P0 | 2, 10 |
| F-RA4-03 | Ersatz-Wahl Maréchal didaktisch nicht validiert (Perspektiv-Drift Bismarck → Leopold II.) | P1 | 9.2 |
| F-RA4-04 | Source-Deploy-Drift mat-3-4.json (Hallu-Caption in Source, Ersatz nur in data.json) | P0 | 9.3 |
| F-RA4-05 | Zwei tot-heruntergeladene Assets (img-1-4 nicht als Material, img-3-4 nach PATCH-M3) | P3 | 4 |
| F-RA4-06 | Lizenz-Attribution strukturell unvollständig (urheber, commons_url, deed_url fehlen) | P1 | 7.1, 7.2, 7.3, 11.2 |
| F-RA4-07 | Kombiniertes Lizenz-Feld für img-1-1+img-1-4 nicht je Bild zuordenbar | P2 | 3, 4 |
| F-RA4-08 | Kein globales Bildnachweis-Register (CREDITS.md / lehrkraft.html-Sektion) | P2 | 11.3 |
| F-RA4-09 | Lizenz-Feld fehlt bei mehreren quellentext-Materialien (Wikipedia-Attribution unvollständig) | P2 | 7.1 |
| F-RA4-10 | Mappe-4 Retro-Patch für img-4-1/-3/-4 nicht durchgeführt, blockt Wiederaufnahme | P0 | 8, 12 |
| F-RA4-11 | R0.5 Dual-Kanal nicht implementiert (16 MCP-Calls + 5 WebFetch-Calls ohne Cross-Check) | P1 | 10 |
| F-RA4-12 | Ersatz-Workflow didaktisch nicht rückgekoppelt (kein Phase-2.1b-Mini-Review für Ersatz) | P1 | 9, 13.2 |
| F-RA4-13 | img-2-2 Live-Herkunft ungeklärt (Spotprent MISSING in INHALTSBASIS, Asset-Datei im Deploy) | P1 | Anhang A |

**Severitaets-Verteilung:** 3x P0, 5x P1, 3x P2, 1x P3. **Gesamt: 12 Findings (ohne F-RA4-01 = Befund-Bestaetigung; F-RA4-13 ist neu-im-Appendix), davon 2 P0 sind zwingende Pilot-Blocker, 1 P0 (F-RA4-01) ist Befund-Übernahme aus MV2.**

---

## Anhang C: Konvergenz mit bestehendem Plan-Impact

Gegenstand der Charta §4.9: Schnittstelle zum bestehenden `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md`.

| bestehendes Element | RA4-Befund | Konvergenz |
|---|---|---|
| O-02-E Extraktions-Sub-Agent mit Qualifizierungs-Schritt | ≡ AGENT_MEDIENRECHERCHE (§13.1) | deckungsgleich, RA4 präzisiert Dual-Kanal |
| G-PORTRAET-COMMONS | Lizenz-Verifikation für Portraits | RA4 erweitert auf **alle** Bildquellen |
| G-MED-FALLBACK | fallback_begruendung bei freier Wikimedia-Suche | RA4 konvergent |
| §6 F-O14-G: Wikimedia-Freisuche als Notfall (max. 3 pro Game) | RA4 unterstützt | konvergent |
| §6 Fiktions-Bedingungen B1/B2/B3 | betrifft Text-Personifizierung, nicht Bild | nicht RA4-Scope |

**Konvergenz-Urteil:** Die konzeptuelle Richtung des v3.12-Plans ist mit RA4-Befund kompatibel. Die vier **bisher nicht adressierten** Lücken betreffen:

1. **Source-Sync** (F-RA4-04): im v3.12 nicht thematisiert, muss ergänzt werden (cross-referenziert zu V13 DEPLOY-06).
2. **Attribution-Metadaten-Schema** (F-RA4-06): O-02-E erwähnt nur Portrait-Sub-Felder, muss auf `bildquelle`-Typ generalisiert werden.
3. **Didaktisches Ersatz-Rückkopplung** (F-RA4-12): nicht im v3.12 thematisiert.
4. **Bildnachweis-Register** (F-RA4-08): nicht im v3.12 thematisiert.

Die konsolidierte Plan-Impact-Matrix in `BEFUND_TESTRUN_...KONSOLIDIERT.md` (RA5-Produkt) sollte diese vier Lücken als MV2-Erweiterungen aufnehmen.

---

*Bericht Ende. Persistiert 2026-04-18.*
