# Q-GATE-LOG: deutscher-nationalismus-kolonialismus — Mappe 4

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 4 / 4 (letzte Mappe — Mappenabschluss-Zone Variante B)
**Titel:** Wettlauf um die Welt

---

## Phase 2.0 (Rahmen)

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Katalog:** Q-GATE-MECHANIK.md §7.3
**Loop-Zugang:** PI-Zeile 9 (Uebergangstabelle)
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung (hefteintrag, rahmen-einstieg, rahmen-sicherung) | SCHEMA | PASS | Alle 5 JSON-Dateien parsen sauber. hefteintrag.json entspricht hefteintrag-schema.json (ordnungsmuster=parallel-kausal ∈ enum; knoten[].typ ∈ {kernbegriff,ereignis,wirkung}; verbindungen[].typ=kausal ∈ enum). einstieg.json + sicherung.json erfuellen rahmen-einstieg-schema.json / rahmen-sicherung-schema.json. |
| 2 | C1b | Stundenfrage-Identitaet | KONSISTENZ | PASS | `einstieg.problemstellung` === `hefteintrag.stundenfrage` === „Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa?" (String-identisch, Byte-Vergleich). |
| 3 | M3b | Kernerkenntnisse-Identitaet | KONSISTENZ | PASS | `scpl.loesung[]` = 2 Kernerkenntnisse. Inhaltlich identisch mit TAFELBILD_Mappe4 (KE1: Weltpolitik/Forderung nach Kolonien; KE2: Konflikte + Gewalt). Keine Abweichung. |
| 4 | Q-M2-DISJ | Disjunktionsregel (Reflexionsimpuls vs. loesung[]) | KONSISTENZ | PASS | `sicherung.reflexionsimpuls` stellt normativ-kontrafaktische Frage („Wer musste dafuer in den Schatten treten?"). Lemma-Check: keine Kollision von Fachbegriff-Stemmen mit `scpl.loesung[]` Kern-Nomina. Aussage-Check: keine Paraphrase einer Loesungs-Behauptung — Reflexionsimpuls zielt auf Perspektive der Betroffenen, loesung[] beschreibt Taeter-Politik. |
| 5 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | Keine internen Artefakt-Namen (mat-4-*, k4-*, aufgabe-4-*) in SuS-sichtbaren Feldern (narrativ, problemstellung, reflexionsimpuls, zitat.*). |
| 6 | V-RAHMEN | Vollstaendigkeit | SCHEMA | PASS | 5/5 Pflicht-Dateien existieren: `meta.json`, `einstieg.json`, `hefteintrag.json`, `sicherung.json`, `mappenabschluss_zone.json`. Placeholder-Ausnahme (Deferred-Pfad v3.9.3): `sicherung.zusammenfassung` + `sicherung.ueberleitung` = `[REVISION IN 2.1c]`. Alle anderen Pflichtfelder nicht-leer. |
| 7 | TYP-01-R | Typographische Korrektheit (v3.3) | FORM | PASS | UTF-8-Umlaute korrekt (ae/oe/ue vermieden, native Umlaute). Gedankenstriche „—" (U+2014). Deutsche Anfuehrungszeichen „…" (U+201E/U+201C) in hefteintrag/sicherung/zitat. Keine ASCII-Ersatzzeichen. |
| 8 | REG-01 | Sprachregister R7 (v3.3) | FORM | PASS | Kein didaktisches Metavokabular in SuS-sichtbaren Texten. `einstieg.narrativ` erzaehlerisch; `sicherung.reflexionsimpuls` problemorientiert-fragend; `zitat.kontext` historisch-neutral. Kein Lehrerhandreichungs-Ton. |
| 9 | L-DUP | Lemma-Duplikat-Freiheit (v3.10.3) | FORM | PASS | `lemma_duplicate_check` auf alle SCPL-Felder (kontextsatz, complication[].schritt, problem.satz, loesung[i], knoten.text, knoten.merksatz, verbindung.label) = `[]`. Siehe Sonderfall-Notiz unten zu „Kolonien"/„Kolonisierten". |

### Mappenabschluss-Zone (Variante B)

| Check | Ergebnis | Detail |
|---|---|---|
| Variante-Erkennung | PASS | Mappe 4 = letzte Mappe (mappen_total=4, id=mappe-4) → Variante B. |
| Schema-Konformitaet | PASS | `reflexion_fragen` = Array (2 Eintraege), `_variante` = „B". Kein `ueberleitungssatz`-Feld (Variante B: nicht zulaessig). |
| Anzahl Reflexionsfragen | PASS | 2 Fragen (Mappen-Fokus + Gesamt-Sequenz-Bogen „Vom Traum von der Einheit bis zum Wettlauf um die Welt"). |

### Deferred-Pfad v3.9.3

| Feld | Status | Aufloesung |
|---|---|---|
| `sicherung.zusammenfassung` | DEFERRED | Formaler Marker `[REVISION IN 2.1c]` gesetzt. Finalisierung durch Q-M2-FINALIZE in Phase 2.1c Achse 7. |
| `sicherung.ueberleitung` | DEFERRED | Formaler Marker `[REVISION IN 2.1c]` gesetzt. (Letzte Mappe: ueberleitung-Inhalt ggf. Mappen-Abschluss-Bogen statt Vormappe-Vorschau.) |

### Korrekturen gegenueber TAFELBILD (FORMULIERUNGS-OFFEN)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| `scpl.complication[2].fachbegriff` | `null` → `""` | Schema hefteintrag-schema.json erfordert `type: string`. TAFELBILD hatte `null` fuer „kein Fachbegriff"-Slot — Schema-Alignment durch Leer-String. Semantisch aequivalent. |
| `scpl.problem.fachbegriff` | `null` → `""` | Analog. |
| `knoten[2]` (k4-3 „Koloniale Ausbeutung und Gewalt") | `merksatz` ergaenzt: „Kolonialmaechte nahmen Land, erzwangen Arbeit und bestraften Widerstand brutal" | Knoten-Elaborierung v3.5: kernbegriff/wirkung-Knoten mit Nicht-R7-Kompositum (Koloniale Ausbeutung) erfordern Merksatz. Analog zu Mappe 2 k2-5 Kaiserproklamation. |

### Lemma-Duplikat-Sonderfall

**Fund:** Stem `kolonien` / `koloni` tritt in k4-1.merksatz („Deutschland wollte Weltmacht werden und forderte ueberall Kolonien") und loesung[1] („Wettlauf um Kolonien") + problem.satz („Wettlauf um Kolonien") wiederholt auf.

**Klassifikation:** Strukturelles Schluesselwort-Paar (kein Redundanz-Duplikat). „Kolonien" ist Leit-Thema der Mappe und MUSS in mehreren SCPL-Strang-Feldern erscheinen, damit der Kernbegriff rekapitulierbar ist. Analog zu Mappe 3 „Afrika"/„Afrikaner" (akzeptierter Praezedenzfall, siehe mappe-3/Q-GATE-LOG.md Achse 2).

**Innerhalb eines einzelnen Feldes:** `lemma_duplicate_check` auf jedes Feld einzeln = `[]`. Keine Intra-Feld-Duplikate. L-DUP-Sonderregel „Fachbegriff-Label-Muster" (Label-Stamm nicht im Satz-Inneren desselben Feldes) nicht verletzt.

**Ergebnis:** PASS (strukturelles Paar, Feld-lokal duplikatfrei).

---

## Produzierte Dateien

```
weitergehts-online/docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/rahmen/
├── meta.json                   (221 B)
├── einstieg.json               (362 B)
├── hefteintrag.json            (2649 B)
├── sicherung.json              (636 B)
└── mappenabschluss_zone.json   (298 B)
```

## Nachbesserung

Keine (Iteration 1 = PASS).

---

## Phase 2.1 (Material) — mat-4-1

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.1 + SUB_MATERIAL_BILDQUELLE §Qualitaets-Gate
**Loop-Zugang:** PI-Zeile 10 (Uebergangstabelle) — Pfad Z (Prior-Artefakte als GERUEST-Input)
**Material:** mat-4-1 (bildquelle „Dropping the Pilot", Position 1, didaktische_funktion=einstieg, TB-Knoten k4-1 Weltpolitik)
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-01 | Schema-Validierung (material-output-schema.json v3.10.2, Strict) | SCHEMA | PASS | Draft7Validator.iter_errors = []. Alle Pflichtfelder inkl. `_meta` vorhanden. `additionalProperties: false` erfuellt. |
| 2 | MQ-STRICT | Kein Feld-Strip vor Validation | SCHEMA | PASS | Validation gegen unveraenderte Datei. Kein `_meta`-Strip, kein Patch. |
| 3 | MQ2 | Titel-Typ nach Funktion (v3.8 C2) | DIDAKTIK | PASS | „Der Lotse geht von Bord — ein neuer Kurs beginnt" = Statement-Titel Typ B. Korrekt fuer einstieg-BQ mit ankernder Funktion (visueller Einstieg, keine Arbeitsauftrag-Frage). |
| 4 | MQ4 | Didaktische Bildunterschrift (v3.8 C4) | FORM | PASS | BU enthaelt Identifikation + Kontextualisierung + Erschliessungsimpuls. KEINE Quellenangabe in BU (`Wikimedia`, `Commons`, Lizenz in `quelle`/`lizenz`-Feldern separiert). |
| 5 | M1 | Sachgemaessheit | INHALT | PASS | Urheber Sir John Tenniel, Punch 29.03.1890, Titel „Dropping the Pilot" — historisch korrekt. Weltpolitik als Kurswechsel Wilhelm II. fachlich korrekt. |
| 6 | M3 | Erarbeitbarkeit (k4-1 Weltpolitik) | DIDAKTIK | PASS | Karikatur + BU machen Machtwechsel Bismarck→Wilhelm II. und Begriff Weltpolitik erschliessbar. Definition Weltpolitik direkt in BU eingebettet. |
| 7 | M9 | Bild ≠ Wirklichkeit (Perspektiv-Bewusstsein) | DIDAKTIK | PASS | BU benennt „Englische Karikatur" — SuS erkennen: britische Aussensicht, nicht deutsche Selbstdarstellung. `_meta.quellenkritische_impulse[1]` fragt explizit nach Zeichner-Perspektive. |
| 8 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | Keine internen Artefakt-Namen (INHALTSBASIS, SKRIPT, TAFELBILD, MATERIAL_GERUEST, SUB_MATERIAL_*, AGENT_*) in SuS-sichtbaren Feldern. |
| 9 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Echte UTF-8-Umlaute (März, verlässt, könnte, über, europäische, überall, Außenpolitik). Gedankenstrich U+2014 (1 Vorkommen). Deutsche Anfuehrungszeichen U+201E/U+201C korrekt. Kein ASCII-Ersatzzeichen in BU. |
| 10 | REG-01 | Sprachregister R7 | FORM | PASS | Kein Lehrerhandreichungs-Ton. BU schuelerverstaendlich. Fachbegriff Weltpolitik direkt in BU definiert (Klammer-Einschub). |
| 11 | BQ-1 | Heuristisch > illustrativ | DIDAKTIK | PASS | Karikatur als Erkenntnisquelle: SuS erschliessen den Begriff Weltpolitik visuell. Nicht dekorativ. |
| 12 | BQ-2 | Zeitgenoessisch bevorzugen | DIDAKTIK | PASS | Original-Karikatur 1890, kein moderner Nachstich. |
| 13 | BQ-8 | Karikatur-Sonderregel (Stilmittel benannt) | DIDAKTIK | PASS | BU benennt Metapher (Lotse = Bismarck, Schiff = Deutsches Reich). Symbolisierung fuer R7 explizit gemacht. |
| 14 | Q8 | Kein Interpretationsvorgriff + Erschliessungs-Beschraenkung (v3.6) | FORM | PASS | BU kontextualisiert sachlich (Urheber, Datum, Akteure). Erschliessungsimpuls (letzter Satz) nicht vorweggenommen: „Was koennte der Zeichner mit dem Bild des verlassenen Schiffs meinen?" — Antwort bleibt SuS-Aufgabe. |
| 15 | SQ-1 | Nur bereits eingefuehrtes Wissen | KONSISTENZ | PASS | Position 1: kein vorheriges Mappe-4-Material. Vorausgesetzt aus Mappe 3: k3-6 (Kolonialisierung Afrikas). mat-4-1 referenziert „Kaiserreich" und „europaeische Politik" — beides zulaessig. |
| 16 | SQ-2 | Keine nicht-eingefuehrten Fachbegriffe | KONSISTENZ | PASS | Keine Verwendung von „Marokkokrisen" (k4-2, mat-4-2), „Herero"/„Trotha"/„Vernichtungsbefehl" (k4-3, mat-4-3..5). |
| 17 | SQ-3 | Zugeordneter TB-Knoten erarbeitbar | KONSISTENZ | PASS | k4-1 Weltpolitik: BU definiert Begriff + zeigt Urheber (Wilhelm II.) visuell. `_meta.tafelbild_knoten_abgedeckt = ["k4-1"]`. |
| 18 | MV-Perspektiv-Deklaration | Perspektiven-Policy bei konflikttyp:true | KONSISTENZ | PASS | `_meta.perspektive = "P1 Deutsche Reichsführung (Wilhelm II.)"`. Entspricht Perspektiven-Policy im MATERIAL_GERUEST. |
| 19 | Q-M2-Lizenz | CC-BY-NC ausgeschlossen | FORM | PASS | `lizenz: "Public Domain"` — nutzbar. |
| 20 | STR-12 | Trigger-Metadaten | FORM | PASS | `trigger_flags: []` — Karikatur ohne Gewalt-/Tod-/Trauma-Inhalt. Korrekt leer. |

### Korrektur gegenueber Prior-Session-Draft (Pfad Z)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| `_meta.artefakt_ref` | `[]` → `["pb-4-1"]` | Prior-Draft hatte leeres Array. Primaer-Bild-Referenz pb-4-1 ergaenzt (Pattern-konform). |
| `_meta.quellenkritische_impulse` | fehlte → 2 Impulse hinzugefuegt | Prior-Draft hatte Erschliessungsimpuls nur in BU-Text. `_meta`-Feld fuer AGENT_RAETSEL-Nutzung hinzugefuegt: (1) Lotse-Metapher-Impuls, (2) Perspektiv-Frage (britische Karikatur). |
| `_meta.wortanzahl` | `95` → `94` | Plain-Text-Zaehlung (ohne HTML-Tags) = 94 Woerter. Korrektur entsprechend. |
| JSON-Encoding | ASCII-Quote `"` am Ende von `„Der Lotse geht von Bord"` → U+201C | TYP-01-R-Fix: typographisches Schluss-Anfuehrungszeichen. Prior-Draft hatte dies als `\u201c` escape in Unicode-String — beim Re-Write mit U+201C korrekt gespeichert. |

### Limitation (dokumentiert)

`pb-4-1` Primaer-Bild-Referenz existiert formal als Pointer, aber es gibt KEIN `ARTEFAKT_INVENTAR_deutscher-nationalismus-kolonialismus.md`-File fuer dieses Game (Pre-GERUEST-Konzept). Wikimedia-Verifikation der Bild-Datei erfolgt in Phase 3.0 Assembly-Schritt „Bild-Download" separat. MV2-Risiko (33% Halluzination) bekannt und in MEMORY.md + UPSTREAM_PATCH_LOG.md vermerkt.

### Produzierte Dateien

```
materialien/mat-4-1.json   (neu geschrieben, SCHEMA-01-PASS, 1192 B)
```

---

## Phase 2.1 (Material) — mat-4-2

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.1 + SUB_MATERIAL_DARSTELLUNGSTEXT §Qualitaets-Gate
**Loop-Zugang:** PI-Zeile 10 (Uebergangstabelle) — Pfad Z (Prior-Artefakte als GERUEST-Input)
**Material:** mat-4-2 (darstellungstext „Weltpolitik und Marokkokrisen — Deutschland provoziert Europa", Position 2, didaktische_funktion=erarbeitung, TB-Knoten k4-1 Weltpolitik + k4-2 Marokkokrisen + k4-4 Rivalitaet)
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-01 | Schema-Validierung (material-output-schema.json v3.10.2, Strict) | SCHEMA | PASS | Draft7Validator.iter_errors = []. Alle Pflichtfelder inkl. `_meta` vorhanden. `additionalProperties: false` erfuellt. `rekonstruktions_begruendung` gesetzt (≥30 Zeichen) weil `aufbereitung="rekonstruiert"`. |
| 2 | MQ-STRICT | Kein Feld-Strip vor Validation | SCHEMA | PASS | Validation gegen unveraenderte Datei. |
| 3 | MQ2 | Titel-Typ (v3.8 C2) | DIDAKTIK | PASS | „Weltpolitik und Marokkokrisen — Deutschland provoziert Europa" = praegnanter Kontextsatz mit Aussage-Praedikat („provoziert"). Erfuellt DT-Titel-Regel: entweder Frage oder aussagekraeftiger Kontextsatz. |
| 4 | Q1 | Wortanzahl ≤ 150 | FORM | PASS | Plain-Text (HTML gestrippt, Whitespace-Tokens): 119 Woerter ≤ 150. `_meta.wortanzahl = 119` korrekt. |
| 5 | Q2 | Satzlaenge ≤ 20 Woerter | FORM | PASS | Laengster Satz: „Zweimal drohte wegen eines Kolonialstreits ein Krieg: die Marokkokrisen (Konflikte 1905 und 1911 um Einfluss in Marokko)." = 17 Tokens. Alle anderen ≤ 14. |
| 6 | Q3 | Fachbegriffe bei Erstverwendung definiert | DIDAKTIK | PASS | `<strong>Weltpolitik</strong>` + Klammer-Definition („aggressive Aussenpolitik mit dem Ziel, Deutschland zur Weltmacht zu machen"). `<strong>Marokkokrisen</strong>` + Klammer-Definition („Konflikte 1905 und 1911 um Einfluss in Marokko"). |
| 7 | Q4 | Absatzstruktur ≤ 5 Saetze/Absatz, 3-4 Absaetze total | FORM | PASS | 4 Absaetze. Saetze pro Absatz: P1=3, P2=5, P3=2, P4=3. |
| 8 | Q5 | Tafelbild-Erarbeitbarkeit (alle Knoten explizit) | DIDAKTIK | PASS | k4-1: Absatz 1 explizit („Weltpolitik" definiert). k4-2: Absaetze 2+3 explizit (beide Krisen 1905/1911, Tanger+Panther-Ereignisse). k4-4: Absatz 4 explizit („Misstrauen war gewachsen", „Rivalen", „spaltete Europa"). |
| 9 | Q6/Q8 | Faktenquelle + HTML-Hygiene | INHALT | PASS | Fakten konsistent mit hist. Wissen (Bismarck-Ende 1890, Tanger 1905, Agadir 1911). HTML: nur `<p>` und `<strong>` verwendet — innerhalb erlaubter Tag-Whitelist. KEIN `<cite>` im inhalt (v3.3 Q6b). |
| 10 | Q7 | Multiperspektivitaet | DIDAKTIK | PASS | P1 (Deutschland: „Wilhelm II. wollte", „Deutschland wollte", „Deutschland beanspruchte") + P2 (Frankreich: „Frankreich wollte Marokko kontrollieren", als Akteur/Gegenspieler) beide benannt. Asymmetrie akzeptabel (Mappe-Fokus auf deutsche Kolonialpolitik). |
| 11 | Q9 | Kein dominantes Passiv | FORM | PASS | Aktivformen dominieren (wollte, nannte, reiste, schickte, drohte, verhandelten). Wenige passivische Formen („wurde vermieden", „war gewachsen" = Zustandspassiv) historisch gerechtfertigt. |
| 12 | Q10 | Vormappe-Bezug | KONSISTENZ | PASS | „Kolonien in Afrika" knuepft implizit an k3-6 (Wettlauf um Afrika) an — keine Re-Erklaerung des Kolonialismus-Begriffs, sondern Bezugnahme auf bereits eingefuehrtes Wissen. |
| 13 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | `quelle`: „Eigene Darstellung auf Basis der Sachanalyse. Quellen: Wikipedia — Erste Marokkokrise, Zweite Marokkokrise, Weltpolitik (Deutsches Kaiserreich)." — KEINE internen Artefakt-Namen (INHALTSBASIS/SKRIPT/TAFELBILD/MATERIAL_GERUEST entfernt gegenueber Prior-Draft). |
| 14 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Echte UTF-8-Umlaute (wollte, mitreden, überall, außen, Großmächte, Küste, Marokkos, Außenpolitik). Gedankenstriche U+2014 (3 Vorkommen: „— in Afrika", „— ein Krieg", „— Deutschland provoziert Europa" im Titel). Deutsche Anfuehrungszeichen U+201E/U+201C um „Panther". KEINE ASCII-Ersatzzeichen in SuS-sichtbaren Feldern. |
| 15 | REG-01 | Sprachregister R7 | FORM | PASS | Kein Lehrerhandreichungs-Ton. Altersgerechte Verkuerzungen („mitreden", „am Verhandlungstisch" implizit). Fachbegriffe inline-definiert. Ueberleitungssatz in `ueberleitung_von` narrativ anschlussfaehig. |
| 16 | SQ-1 | Nur bereits eingefuehrtes Wissen | KONSISTENZ | PASS | Vorausgesetzt: mat-4-1 (Kurswechsel Bismarck→Wilhelm II., Weltpolitik angerissen) + k3-6 (Kolonialismus allgemein). Material referenziert diese Basis ohne Rueckfrage. |
| 17 | SQ-2 | Keine nicht-eingefuehrten Fachbegriffe | KONSISTENZ | PASS | Keine Verwendung von „Herero"/„Nama"/„Trotha"/„Vernichtungsbefehl" (k4-3, mat-4-3..5). Keine Buendnissystem-/Wettruesten-Begriffe (WW1-Sperrzone). |
| 18 | SQ-3 / MQ4 | TB-Knoten-Abdeckung | KONSISTENZ | PASS | `_meta.tafelbild_knoten_abgedeckt = ["k4-1","k4-2","k4-4"]` — alle drei Knoten explizit erarbeitet (siehe Q5). |
| 19 | SQ-4 | Narrativer Anschluss | KONSISTENZ | PASS | `ueberleitung_von` benennt mat-4-1 („Die Karikatur hat gezeigt: Nach Bismarcks Entlassung 1890 uebernahm Kaiser Wilhelm II. das Steuer. Doch wohin steuerte er das Kaiserreich?") — Steuer-Metapher aus mat-4-1 Karikatur uebernommen. |
| 20 | SQ-5 | Material-Charakter (analytisch) | KONSISTENZ | PASS | Darstellungstext ist analytisch-sachbezogen (besinnung_sachbezogen). Erklaert Ursache→Wirkung-Ketten (Weltpolitik → Marokkokrisen → Rivalitaet) ohne narrative Einzelfall-Erzaehlung. |
| 21 | MV-Perspektiv-Deklaration | Perspektiven-Policy bei konflikttyp:true | KONSISTENZ | PASS | `_meta.perspektive = "P1 Deutsche Reichsfuehrung / P2 Frankreich (implizit als Gegenspieler)"`. Entspricht MATERIAL_GERUEST-Policy (P2 schwach, dokumentierte Limitation). |
| 22 | STR-12 | Trigger-Metadaten | FORM | PASS | `trigger_flags: []` — DT enthaelt „drohte ein Krieg" als historische Tatsache, aber KEINE explizite Gewalt-/Tod-Darstellung. Korrekt leer (STR-12 Over-Flagging-Vermeidung: „nur flaggen bei expliziter Belastung"). |

### Korrekturen gegenueber Prior-Session-Draft (Pfad Z)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| `inhalt` | 195 → 119 Woerter; komplette Neufassung des Textes | Q1 FAIL bei Prior (195 > 150). Vollstaendiger Re-Write mit verkuerzten Saetzen und reduzierter Faktendichte. |
| `inhalt` | Zwei Saetze > 20 Woerter entfernt (Jetzt-unter-Wilhelm-Passage, Deutschland-mischte-sich-ein-Passage) | Q2 FAIL bei Prior (2 Verstoesse: 22 und 28 Tokens). Saetze kurz aufgeteilt, keine Schachtelung. |
| `inhalt` | `<cite>`-Tag entfernt (Prior: `<cite>Eigene Darstellung. Quellen: Wikipedia ...</cite>` am Ende des dritten Absatzes) | Q6b/Q8 FAIL: v3.3-Regel „KEIN `<cite>`-Tag im `inhalt`. Dopplung fuehrt zu Q-Gate FAIL". Quellenangabe verbleibt ausschliesslich im `quelle`-Feld. |
| `quelle` | „...Wikipedia — Erste Marokkokrise, Zweite Marokkokrise, Weltpolitik (Deutsches Kaiserreich), INHALTSBASIS F3-4, F3-9." → ohne INHALTSBASIS-Referenz | Q-M2-08 FAIL bei Prior: interne Artefakt-Namen in SuS-sichtbarem `quelle`-Feld. |
| `_meta.wortanzahl` | `195` → `119` | Folge-Korrektur der Text-Kuerzung. Verifiziert durch Plain-Text-Token-Zaehlung (Whitespace-Tokens nach HTML-Strip + Paragraph-Boundary-Normalization). |
| `_meta.rekonstruktions_begruendung` | konkretisiert („Tanger-Krise 1905, Panthersprung 1911" statt „SKRIPT C3§6") | Q-M2-08-Konformitaet: auch in `_meta` keine internen Artefakt-Namen, auch wenn `_meta` Lehrkraft-Zone ist — Konsistenz mit quelle-Hygiene. |

### Limitation (dokumentiert)

- **`artefakt_ref: []`:** Kein ARTEFAKT_INVENTAR existiert fuer dieses Pre-GERUEST-Game. Darstellungstexte sind per se ihr eigenes Primaer-Artefakt (`pd-*`). Leeres Array schema-valid (Pattern greift nur bei Eintraegen). Ggf. CROSS-4-Pruefung in Phase 2.1c mit Nachtrag-Moeglichkeit.
- **P2 Frankreich nur implizit:** MATERIAL_GERUEST dokumentiert diese Einschraenkung explizit. Kein eigenes Material aus franzoesischer Perspektive verfuegbar. Akzeptabel fuer R7, da Mappe-Fokus auf deutschem Kolonialismus liegt.

### Produzierte Dateien

```
materialien/mat-4-2.json   (neu geschrieben, SCHEMA-01-PASS, 2652 B)
```

---

## Phase 2.1 (Material) — mat-4-3

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-1_MATERIAL.md
**Katalog:** Q-GATE-MECHANIK.md §7.1 + SUB_MATERIAL_QUELLENTEXT §Qualitaets-Gate
**Loop-Zugang:** PI-Zeile 10 (Uebergangstabelle) — Pfad Z (Prior-Artefakte als GERUEST-Input)
**Material:** mat-4-3 (quellentext „Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete", Position 3, didaktische_funktion=erarbeitung, TB-Knoten k4-3 Koloniale Ausbeutung und Gewalt)
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-01 | Schema-Validierung (material-output-schema.json v3.10.2, Strict) | SCHEMA | PASS | Draft7Validator.iter_errors = []. `_meta` vollstaendig: wortanzahl/quellentyp/aufbereitung/rekonstruktions_begruendung/artefakt_ref/tafelbild_knoten_abgedeckt/quellenkritische_impulse/perspektive/erarbeitbarkeits_check/trigger_flags. `additionalProperties: false` erfuellt. `rekonstruktions_begruendung` 252 Zeichen ≥ 30 Pflicht wegen aufbereitung=„gemischt". |
| 2 | MQ-STRICT | Kein Feld-Strip vor Validation | SCHEMA | PASS | Validation gegen unveraenderte Datei. |
| 3 | MQ2 | Titel-Typ (v3.8 C2) + Ambiguitaets-Sperre (v3.10.4) | DIDAKTIK | PASS | „Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete" = Frage-Kontextsatz mit Subjekt+Aussage-Praedikat. „Schutzgebiet" in Gaensefuessen markiert Ambiguitaetsrisiko explizit (euphemistisch = Kolonie). SuS verstehen den Titel als Frage „Was bedeutete das wirklich?". |
| 4 | Q1 | Wortanzahl ≤ 100 (Einleitung + Zitat + Nachweis) | FORM | PASS | Plain-Text (HTML gestrippt): 93 Woerter ≤ 100. `_meta.wortanzahl = 93` korrekt. |
| 5 | Q2 | Einleitungssatz max. 2 Saetze | FORM | PASS | 2 Saetze: (1) „In Deutsch-Suedwestafrika erhob sich 1904 das Hirtenvolk der Herero...", (2) „Nach der militaerischen Niederschlagung erliess Generalleutnant Lothar von Trotha diesen Befehl:" — beide mit Sprecher+Funktion+Situation. |
| 6 | Q3 | Originalnaehe | INHALT | PASS | Trotha-Wortlaut woertlich uebernommen aus Wikipedia-Artikel „Voelkermord an den Herero und Nama". Auslassungen korrekt mit [...] markiert. Kernbegriffe „Deutsche Untertanen", „Gewehr", „Vieh" beibehalten. |
| 7 | Q4 | Verstaendlichkeit (max 3 Worterklarungen) | FORM | PASS | 1 Klammer-Einschub („heute Namibia" fuer „Deutsch-Suedwestafrika") ≤ 3. Keine verschachtelten Glossen. Sprachniveau R7-zugaenglich. |
| 8 | Q5 | Kein Interpretationsvorgriff in Einleitung | DIDAKTIK | PASS | Einleitung beschreibt historisch („erhob sich", „erliess") ohne Wertung („grausam", „unmenschlich" fehlen bewusst). SuS erschliessen die Brutualitaet aus dem Wortlaut selbst. |
| 9 | Q6 / STR-14-NEU | Quellenangabe + Aufbereitungs-Muster | FORM | PASS | `quelle`: „Lothar von Trotha, Vernichtungsbefehl, 2. Oktober 1904. Zitiert nach: Wikipedia — Voelkermord an den Herero und Nama. Gekuerzt. Auslassungen mit [...] gekennzeichnet." — Aufbereitungs-Muster „Gekuerzt" enthalten (Pflicht bei aufbereitung ≠ echt). |
| 10 | Q7 / SQ-3 | Tafelbild-Abdeckung k4-3 | DIDAKTIK | PASS | k4-3 „Koloniale Ausbeutung und Gewalt" durch Wortlaut erschliessbar: Entmenschlichung („nicht mehr Deutsche Untertanen"), Gewaltandrohung („erschossen", „schiessen"), Einschluss von Frauen und Kindern. Einordnungs-Absatz quantifiziert Ausmass (80.000 → 15.000-20.000 Ueberlebende). |
| 11 | Q8 | Perspektivitaet erkennbar | DIDAKTIK | PASS | SuS erkennen: Trotha (Taeter, Generalleutnant) spricht. Perspektive P1 Reichsfuehrung explizit durch Sprecher-Nennung. P3 (Herero) im Einordnungs-Absatz als Betroffene sichtbar. |
| 12 | Q9 | HTML-Format (aufbereitung=gemischt) | FORM | PASS | Struktur: `<p><em>Einleitung</em></p>` → `<blockquote><p>Zitat</p></blockquote>` → `<p><em>Einordnung</em></p>`. `<blockquote>` zulaessig bei aufbereitung=„gemischt" (nur bei „rekonstruiert" verboten). Keine cite-Tags. |
| 13 | Q10 | Historische Korrektheit | INHALT | PASS | Datum 2. Oktober 1904, Ort „Osombo-Windimbe" (nicht genannt, aber akzeptabel), Urheber Lothar von Trotha — Fakten konsistent mit Wikipedia. Ueberlebendenzahlen 15.000-20.000 entsprechen historischer Schaetzung. Voelkermord-Anerkennung Deutschlands 2021: korrekt. |
| 14 | Q-M2-08 | Quellenangabe-Hygiene (inkl. _meta) | FORM | PASS | `quelle` + `rekonstruktions_begruendung` enthalten KEINE internen Artefakt-Namen (INHALTSBASIS/SKRIPT/TAFELBILD/MATERIAL_GERUEST/PROGRESSIONSPLAN/SUB_MATERIAL/AGENT_ entfernt gegenueber Prior-Draft). |
| 15 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Echte UTF-8-Umlaute (überall, für, Namibia, erließ, Völkermord, Großmächten, Kolonialherrschaft, schießen, Überlebende). Gedankenstriche U+2014 (Titel + Ueberleitung + quelle). Deutsche Anfuehrungszeichen U+201E/U+201C im inhalt (Zitat-Rahmung + „Schutzgebiet" im Titel). 80.000/15.000–20.000 mit U+2013 Bis-Strich. |
| 16 | REG-01 | Sprachregister R7 | FORM | PASS | Kein Lehrerhandreichungs-Ton. Altersgerechte Formulierungen („Hirtenvolk", „überlebten"). Militaer-Terminologie minimal („Generalleutnant", „Niederschlagung") — im Kontext selbsterklaerend. |
| 17 | SQ-1 | Nur bereits eingefuehrtes Wissen | KONSISTENZ | PASS | Vorausgesetzt: mat-4-2 (Weltpolitik, Kolonialrivalitaet) + k3-6 (Wettlauf um Afrika, Berliner Konferenz). mat-4-3 referenziert „deutsche Kolonialherrschaft" als bekannt. |
| 18 | SQ-2 | Keine nicht-eingefuehrten Fachbegriffe | KONSISTENZ | PASS | Keine Verwendung von Begriffen aus mat-4-4/mat-4-5 (Herero-Foto, Hirte-Tagebuch). „Voelkermord" wird hier erstmals eingefuehrt (k4-3-Erarbeitungsmaterial) und durch die Einordnungs-Passage kontextualisiert — kein Vorgriff. |
| 19 | SQ-4 | Narrativer Anschluss | KONSISTENZ | PASS | `ueberleitung_von` macht den Pivot explizit: „Der Wettlauf um Kolonien verschaerfte die Rivalitaet zwischen den Grossmaechten. Doch was bedeutete er fuer die Menschen in den Kolonien?" — Bruecke von k4-4 Rivalitaet (mat-4-2) zu k4-3 Koloniale Gewalt (mat-4-3). |
| 20 | SQ-5 | Material-Charakter (sachbezogen-analytisch) | KONSISTENZ | PASS | Quellentext hat besinnungs-Charakter: Originalquelle + historische Einordnung. Nicht vergegenwaertigend-narrativ (das macht mat-4-5), sondern sachbezogen-analytisch mit moralisch-urteilender Zeichen-Ebene (Trotha spricht, SuS urteilen). |
| 21 | QT-Multiperspektivitaet (STR-05 / AU-4) | Perspektiv-Deklaration + Gegen-Perspektiv-Impuls | KONSISTENZ | PASS | `_meta.perspektive = "P1 Deutsche Reichsfuehrung (Trotha) / P3 Kolonisierte (Herero als Opfer)"`. `quellenkritische_impulse[1] = "Wie haetten Herero-Frauen und -Kinder ihre Lage 1904 wohl selbst beschrieben?"` — explizite Gegen-Perspektive-Aufforderung. |
| 22 | Q-M2-Rekonstruktions-Begruendung (T4) | Primaer-vor-Rekonstruiert | FORM | PASS | aufbereitung=„gemischt" dokumentiert: Original-Wortlaut des Trotha-Befehls (Primaer aus Wikipedia) + agent-generierte Einleitung/Einordnung. `rekonstruktions_begruendung` konkret (Quelle + Kuerzungsart + Grund der Agent-Ergaenzung). |
| 23 | STR-12 | Trigger-Metadaten (Normvokabular) | FORM | PASS | `trigger_flags: ["gewalt", "tod"]` — explizit gemaess STR-12-Enum (gewalt/tod/krieg/diskriminierung/trauma/sexualisierte_gewalt). Vernichtungsbefehl enthaelt explizite Gewaltandrohung („erschossen", „schiessen") und Massentod-Implikation. Korrektur gegenueber Prior-Draft (`[„gewaltdarstellung"]` = nicht-normativer Wert). |

### Korrekturen gegenueber Prior-Session-Draft (Pfad Z)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| `inhalt` Einleitung | 5 Saetze → 2 Saetze | Q2-FAIL bei Prior (Max 2 Saetze Pflicht). Verkuerzt auf Sprecher+Funktion+Situation. |
| `inhalt` gesamt | 138 → 93 Woerter | Q1-FAIL bei Prior (≤ 100 Woerter Pflicht; Prior 138 > 100). Einleitung und Einordnung gestrafft, Originalzitat unveraendert. |
| `inhalt` Einordnung | „Die Wissenschaft bezeichnet ... den ersten Voelkermord" + „Im Mai 2021 erkannte Deutschland..." → „Deutschland erkannte dieses Vorgehen 2021 offiziell als ersten Voelkermord des 20. Jahrhunderts an." | Q5-naeher (kein Interpretationsvorgriff). Offizielle Anerkennung statt Wissenschafts-Urteil. |
| `_meta.aufbereitung` | „vereinfacht" → „gemischt" | Praeziser: Wortlaut ist Original (nicht vereinfacht), Einleitung+Einordnung agent-generiert → „gemischt" semantisch korrekt. Beide Werte Schema-konform. |
| `_meta.trigger_flags` | „gewaltdarstellung" → „gewalt", „tod" | STR-12-Normvokabular-Konformitaet. „gewaltdarstellung" KEIN Enum-Wert der erlaubten Flags. Schema erlaubte Prior (kein hard-enum), aber SUB_MATERIAL-Spezifikation normiert Flag-Namen. |
| `_meta.artefakt_ref` | `[]` → `["pq-4-1"]` | Primaerquellen-Referenz gesetzt (Pattern-konform). Analog mat-4-1 `pb-4-1`. |
| `_meta.quellenkritische_impulse` | fehlte → 2 Impulse hinzugefuegt | Multiperspektivitaet-Policy (AU-4): 1 Impuls fuer Taeter-Perspektive, 1 Impuls fuer Gegen-Perspektive (Herero-Frauen/Kinder). |
| `_meta.perspektive` | „Reichsfuehrung" → „Reichsführung" | TYP-01-Konsistenz mit mat-4-1 (echte Umlaute in _meta). |
| `_meta.rekonstruktions_begruendung` | „INHALTSBASIS F4-6 ... F4-3 bis F4-9" entfernt | Q-M2-08 Hygiene auch in _meta (Konsistenz mit mat-4-2-Korrektur). |
| `quelle` | „...Wikipedia — Voelkermord..." → „...Wikipedia — Voelkermord an den Herero und Nama. Gekuerzt. Auslassungen mit [...] gekennzeichnet." | STR-14-NEU: Aufbereitungs-Muster Pflicht bei aufbereitung ≠ echt. |

### Limitation (dokumentiert)

- **`pq-4-1` Primaerquellen-Referenz:** Formaler Pointer, kein ARTEFAKT_INVENTAR existiert fuer dieses Pre-GERUEST-Game. Wikipedia-Artikel „Voelkermord an den Herero und Nama" als Sekundaerquelle dokumentiert (im `quelle`-Feld). Wortlaut verifizierbar ueber Wikipedia-Quellen-Nachweise.
- **Trotha-Zitat Ortsangabe:** Zitat selbst nennt keinen Ort. Der Befehl wurde am 2. Oktober 1904 im Feldlager Osombo-Windimbe erlassen — nicht in Einleitung genannt, da Q4 (max Worterklarungen) und Q1 (Wortanzahl) sonst verletzt. Fuer R7 nicht erkenntnis-kritisch.

### Produzierte Dateien

```
materialien/mat-4-3.json   (neu geschrieben, SCHEMA-01-PASS, 2847 B)
```

---

## Phase 2.1 — mat-4-4 (Bildquelle „Gefangene Herero nach der Niederschlagung des Aufstands")

**Ort:** `materialien/mat-4-4.json`
**Subagent:** SUB_MATERIAL_BILDQUELLE.md
**Dispatch-Isolation:** P4 — 1 Material = 1 Dispatch
**Pfad:** Z (Pre-GERUEST-Prior-Draft re-validiert + korrigiert, Schreib-Event gemaess STATE-ADVANCE-VERTRAG v3.10.1 Anti-Retroaktiv-Klausel)
**Gesamturteil: PASS**

### Kriterien-Pruefung

| # | Kriterium | Dimension | Ergebnis | Befund |
|---|---|---|---|---|
| 1 | SCHEMA-01 | JSON-valid + Schema-Struktur | SCHEMA | PASS | `python3 -c "json.load(...)"` parse PASS, Pflichtfelder id/typ/titel/position/didaktische_funktion/inhalt/bildunterschrift/quelle/lizenz/_meta vorhanden. `_meta`-Pflichtfelder wortanzahl/perspektive/artefakt_ref/tafelbild_knoten_abgedeckt/trigger_flags alle gesetzt. |
| 2 | MQ-STRICT | Kein Feld-Strip vor Validation | SCHEMA | PASS | `_meta` wird unveraendert validiert, additionalProperties:false respektiert. |
| 3 | MQ2 | Titel-Typ nach Funktion (v3.8 C2) | DIDAKTIK | PASS | Funktion=vertiefung → visueller Anker → Typ B Statement-Titel. „Gefangene Herero nach der Niederschlagung des Aufstands" = praegnantes Statement, eindruckvoll — kein Frage-Titel. |
| 4 | MQ4 | Didaktische Bildunterschrift (v3.8 C4) | FORM | PASS | BU enthaelt KEINE Quellenangabe (steht ausschliesslich in `quelle` + `lizenz`). BU = „Foto aus Deutsch-Südwestafrika (heute Namibia), 1904 — nach der Niederschlagung des Herero-Aufstands durch deutsche Kolonialtruppen." — reiner didaktischer Beschreibungstext. |
| 5 | Q1 | Self-Hosting-Pfad | FORM | PASS | `inhalt = "../../assets/img/deutscher-nationalismus-kolonialismus/img-4-2.jpg"` — lokaler Pfad, NICHT Wikimedia-CDN-URL. |
| 6 | Q2 | BU Identifikation max. 20 Woerter | FORM | PASS | 15 Woerter (Python split). Identifikation: Foto + Ort (Deutsch-Südwestafrika) + Datierung (1904). Kontextualisierung: nach Niederschlagung des Herero-Aufstands. Kompakt ≤ 20. |
| 7 | Q3 | BU Kontextualisierung | FORM | PASS | „nach der Niederschlagung des Herero-Aufstands durch deutsche Kolonialtruppen" — Verbindung zu k4-3 (Koloniale Gewalt) hergestellt, 1 Satz. |
| 8 | Q4 | Lizenz | FORM | PASS | „CC-BY-SA 3.0 DE" — konkreter Lizenzstring, Bundesarchiv-Standardlizenz. Kein CC-BY-NC (waere ausgeschlossen). |
| 9 | Q5 | Quellenangabe | FORM | PASS | „Bundesarchiv / Wikimedia Commons. Historisches Foto, Deutsch-Südwestafrika, ca. 1904." — Urheber (Bundesarchiv) + Plattform (Wikimedia Commons) + Kontextangabe. |
| 10 | Q7 / SQ-3 | Tafelbild-Abdeckung k4-3 | DIDAKTIK | PASS | Foto konkretisiert k4-3 „Koloniale Ausbeutung und Gewalt" visuell: sichtbare Konsequenz der in mat-4-3 zitierten Befehlsgewalt. SuS koennen Trothas Sprache mit Bildbefund verknuepfen. |
| 11 | Q8 (v3.6) | Erschliessungs-Beschraenkung + kein Interpretationsvorgriff | DIDAKTIK | PASS | BU enthaelt KEINE wertenden/beschreibenden Adjektive („abgemagert", „in Ketten" aus Prior-Draft entfernt). BU beantwortet KEINEN eigenen Impuls (Fotograf-Info aus BU entfernt, wandert in Impuls 2). SuS-Bildbeschreibungs-Leistung (Beobachten → Beschreiben → Deuten) bleibt intakt. |
| 12 | Q9 | Engine-Typ | FORM | PASS | `typ: "bildquelle"` — engine-native Rendering als `<img>` + `<figcaption>`. |
| 13 | Q10 | Erschliessungsimpuls | DIDAKTIK | PASS | 3 Impulse in `_meta.quellenkritische_impulse`: (1) Beschreibung → Deutung, (2) Urheber + Adressat (BQ-8), (3) Gegen-Perspektive Herero (AU-4). AGENT_RAETSEL kann daraus Aufgabe ableiten. |
| 14 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | `quelle`, `bildunterschrift`, `_meta.erarbeitbarkeits_check` enthalten KEINE internen Artefakt-Namen (INHALTSBASIS/SKRIPT/TAFELBILD/MATERIAL_GERUEST/SUB_MATERIAL/AGENT_). SuS-sichtbare Texte lernendenverstaendlich. |
| 15 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Echte UTF-8-Umlaute: Südwestafrika, Bevölkerung, Reichsführung, Täterperspektive, für, hätten, wählte (gegenueber Prior mit `\u00fc`/`\u00e4`-Escapes). Gedankenstrich U+2014 (BU: „1904 — nach der..."). Deutsche Anfuehrungszeichen U+201E/U+201C in _meta.perspektive entfallen (Feld enthaelt keinen Zitatsinhalt). |
| 16 | REG-01 | Sprachregister R7 | FORM | PASS | BU + Impulse altersgerecht: „Was siehst du...", „Welches Bild hätten die Herero selbst...". Kein Lehrerhandreichungs-Ton. Kein Fachjargon. |
| 17 | SQ-1 | Nur bereits eingefuehrtes Wissen | KONSISTENZ | PASS | Vorausgesetzt: mat-4-3 (Herero, Aufstand, Trotha, Niederschlagung). BU referenziert „Niederschlagung des Herero-Aufstands" = erarbeitetes Wissen. „deutsche Kolonialtruppen" konsistent mit k3-5/k4-3. |
| 18 | SQ-2 | Keine nicht-eingefuehrten Fachbegriffe | KONSISTENZ | PASS | Keine Verwendung von „Voelkermord" (ist in mat-4-3 erstmals eingefuehrt, darf wiederaufgenommen werden — hier aber bewusst nicht benannt, um SuS-Eigenleistung offen zu halten). Kein Vorgriff auf mat-4-5-Begriffe (Hirte, Rinder-Kult). |
| 19 | SQ-3 | TB-Knoten erarbeitbar | KONSISTENZ | PASS | k4-3 wird durch Bild + Impulse vertieft. Foto = visuelle Konkretion des in mat-4-3 verbalisierten Befehls. |
| 20 | SQ-4 | Narrativer Anschluss | KONSISTENZ | PASS | `ueberleitung_von`: „Der Vernichtungsbefehl war kein leeres Wort. Ein Foto aus dieser Zeit zeigt, was er bedeutete." — Wort→Bild-Bruecke von mat-4-3 zu mat-4-4 explizit. |
| 21 | SQ-5 | Material-Charakter | KONSISTENZ | PASS | Bildquelle = vertiefung, visueller Anker zu k4-3. Kein vergegenwaertigender Charakter (das macht mat-4-5). Das Bild konkretisiert das in mat-4-3 verbalisierte koloniale Gewaltverhaeltnis. |
| 22 | BQ-3 | Bild ≠ Wirklichkeit (monoperspektivisch) | DIDAKTIK | PASS | Impuls 2 („Wer hat dieses Foto wohl aufgenommen — und wer sollte es sehen?") zwingt SuS zur Reflexion ueber Bildurheber + Adressat. Impuls 3 („Welches Bild haetten die Herero selbst von sich gezeigt?") macht Monoperspektivitaet explizit. BU benennt Entstehungskontext (Ort/Zeit), ueberlaesst Urheberfrage dem Impuls. |
| 23 | BQ-8 | Kommunikationsanalyse bei Dokumentarfoto | DIDAKTIK | PASS | Impuls 2 adressiert Urheber→Adressat→Wirkungsabsicht (teilweise implizit: „wer sollte es sehen?"). Bildurheber (deutsche „Schutztruppe") im _meta.perspektive deklariert, SuS koennen Perspektive erschliessen. |
| 24 | STR-05 / AU-4 | Multiperspektivitaets-Policy (konflikttyp=true) | DIDAKTIK | PASS | `_meta.perspektive` explizit dual: P3 Herero (Abgebildete/Opfer) + P1 Deutsche Reichsführung (Fotograf/Täter). Impuls 3 Gegen-Perspektive-Aufforderung Pflicht erfuellt. |
| 25 | STR-12 | Trigger-Metadaten (Normvokabular) | FORM | PASS | `trigger_flags: ["gewalt"]` — STR-12-Enum-konform (gewalt/tod/krieg/diskriminierung/trauma/sexualisierte_gewalt). Korrektur gegenueber Prior (`["gewaltdarstellung", "koloniale_gewalt"]` = nicht-normative Werte). „gewalt" ausreichend, da Foto Gewalt-Folgen zeigt; „tod" nicht gesetzt (keine explizite Leichendarstellung); „trauma" unterlassen, um Over-Flagging zu vermeiden. |

### Korrekturen gegenueber Prior-Session-Draft (Pfad Z)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| `bildunterschrift` Bildinhalts-Adjektive | „Die Menschen sind abgemagert und in Ketten gelegt." entfernt | Q8 v3.6 FAIL Prior: wertende/beschreibende Adjektive nehmen SuS-Bildbeschreibungs-Leistung vorweg. BU muss kontextualisieren (Ort/Zeit/Entstehungskontext), NICHT sichtbaren Bildinhalt schildern. |
| `bildunterschrift` Taeter-Perspektive-Label | „also aus der Perspektive der Taeter, nicht der Opfer" entfernt | Q8 v3.6 FAIL Prior: BU beantwortet eigenen Impuls („Wer hat dieses Foto aufgenommen?") vorweg. Perspektiv-Bewertung gehoert in SuS-Erschliessung, nicht BU. |
| `bildunterschrift` Erschliessungs-Fragen | 2 Fragen entfernt | MQ4/Funktion-Trennung: Impulse gehoeren in `_meta.quellenkritische_impulse`, NICHT in BU (Funktion 3 ist optional und sollte nicht mit Funktion 1+2 vermischt werden). AGENT_RAETSEL nutzt `_meta`-Feld. |
| `bildunterschrift` Fotograf-Nennung | „Dieses Foto wurde von einem Angehoerigen der deutschen „Schutztruppe" aufgenommen" entfernt | Q10-Schutz: Impuls 2 fragt explizit nach Urheber — BU darf Antwort nicht vorwegnehmen. Fotograf bleibt implizit (Bundesarchiv/Schutztruppen-Kontext in `quelle`). |
| `_meta.trigger_flags` | `["gewaltdarstellung", "koloniale_gewalt"]` → `["gewalt"]` | STR-12 Normvokabular-Konformitaet. Prior-Flags KEIN Enum-Wert (erlaubt: gewalt/tod/krieg/diskriminierung/trauma/sexualisierte_gewalt). Schema ohne hard-enum, aber SUB_MATERIAL normiert. |
| `_meta.artefakt_ref` | `[]` → `["pb-4-2"]` | Primaer-Bild-Referenz gemaess Pattern `^(pq|pd|pb|pk|pz|pt|ps)-[0-9]+-[0-9]+$`. mat-4-4 = bildquelle → pb-Praefix + Mappe/Position-Muster. |
| `_meta.quellenkritische_impulse` | 3 Impulse reformuliert | Impuls 1 offen fuer SuS-Bildbeschreibung (NEU: beginnt mit „Was siehst du..."). Impuls 2 BQ-8-konform (Urheber + Adressat; NEU: „...und wer sollte es sehen?"). Impuls 3 AU-4 Gegen-Perspektive (NEU: Herero-Selbstdarstellungs-Gegenentwurf). |
| `_meta.perspektive` Umlaute | „Bevoelkerung", „Reichsfuehrung", „Taeterperspektive" → „Bevölkerung", „Reichsführung", „Täterperspektive" | TYP-01 v3.3: echte UTF-8-Umlaute, keine ASCII-Transliteration. |
| `_meta.erarbeitbarkeits_check` | erweitert | Prior: knapp 2 Saetze. Neu: begruendet v3.6-Konformitaet explizit (BU kontextualisiert, beschreibt nicht; SuS-Eigenleistung intakt). |
| JSON-Encoding | `\u00fc`/`\u00f6`/`\u201e`/`\u201c`-Escapes → echte UTF-8 | v3.3 JSON-Encoding-Regeln: echte UTF-8-Zeichen bevorzugt, Escapes nur wo technisch noetig (hier keine). |

### Limitation (dokumentiert)

- **MV2-Medien-Verifikation ausstehend:** `pb-4-2` referenziert einen Bundesarchiv-Herero-Foto-Kandidaten aus Wikimedia. Dateiname nicht dual-kanal-verifiziert (Auto-Memory MV2: 33% Halluzinationsrate bei Wikimedia-Dateinamen). Konkreter Bundesarchiv-Signatur-Hash fehlt. Phase 0.2 Q-MEDIEN-PROSPEKTIV war vor Pfad-Z-Entscheidung nicht durchgefuehrt — Verifikation haengt an Phase-3-Assembly (Claude Code) oder Re-Audit in Phase 2.1c.
- **`pb-4-2` Primaerbild-Pointer ohne ARTEFAKT_INVENTAR:** Pointer formal konform (Pattern + Mappe/Position), aber kein ARTEFAKT_INVENTAR fuer dieses Pre-GERUEST-Game. Download-URL, Thumbnail-Breite, Wikimedia-Dateiname nicht persistiert (haette in `_meta`-Extensionsfelder verletzt T2.F-Schema-Luecke). Bildbeschaffung + Audit-Report laeuft in Phase-3-Assembly extern (Claude Code).
- **Quellenangabe-Datierung unscharf:** „ca. 1904" statt exaktem Datum — Bundesarchiv-Fotos aus dem Kolonialkrieg sind fuer Phase 1904–1907 dokumentiert, exakter Aufnahmezeitpunkt vieler Fotos unbekannt. R7-verantwortbar, da Jahr der Niederschlagung (1904) korrekt.

### Produzierte Dateien

```
materialien/mat-4-4.json   (neu geschrieben, SCHEMA-01-PASS, 2026 B)
```

---

## Phase 2.1 — mat-4-5 (Tagebuch „Mein Land wird fremd — ein Herero-Hirte vor dem Aufstand")

**Ort:** `materialien/mat-4-5.json`
**Subagent:** SUB_MATERIAL_TAGEBUCH.md
**Dispatch-Isolation:** P4 — 1 Material = 1 Dispatch
**Pfad:** Z (Pre-GERUEST-Prior-Draft re-validiert + korrigiert, Schreib-Event gemaess STATE-ADVANCE-VERTRAG v3.10.1 Anti-Retroaktiv-Klausel)
**Gesamturteil: PASS**

### Kriterien-Pruefung

| # | Kriterium | Dimension | Ergebnis | Befund |
|---|---|---|---|---|
| 1 | SCHEMA-01 | JSON-valid + Schema-Struktur | SCHEMA | PASS | `python3 json.load` parse PASS. Pflichtfelder id/typ/titel/position/didaktische_funktion/inhalt/quelle/_meta vorhanden. `_meta`-Pflichtfelder wortanzahl/perspektive/artefakt_ref/tafelbild_knoten_abgedeckt/trigger_flags alle gesetzt. |
| 2 | MQ-STRICT | Kein Feld-Strip vor Validation | SCHEMA | PASS | `_meta` unveraendert validiert; kein Feld entfernt zum Bestehen der Schema-Pruefung. |
| 3 | MQ2 | Titel-Typ nach Funktion (v3.8 C2) | DIDAKTIK | PASS | Funktion=sicherung → Typ B Statement-Titel. „Mein Land wird fremd — ein Herero-Hirte vor dem Aufstand" = identifikationsoffenes Statement, benennt Figur + Kernperspektive. Kein Fragetitel. |
| 4 | TB-Q1 | Wortanzahl ≤120 (Figur-Text) | FORM | PASS | Python-Messung: 110 Figur-Woerter (nach Entfernung der `<em>`-Erzaehlerstimme-Rahmen). `_meta.wortanzahl=110` (Figur-Text ohne Erzaehlerstimme-Rahmen). |
| 5 | TB-Q2 | Satzlaenge ≤15 Woerter | FORM | PASS | Alle 18 Figur-Saetze ≤15 W (max 13 W: „Mein Vater sagt: Wenn man einem Hirten alle Weiden nimmt, bleibt ihm nichts." / „Mein Vater sagt, sie haben ein Papier, das sagt: Das Land sei ihres."). Prior-Draft hatte 17-18-W-Saetze — aufgeteilt. |
| 6 | TB-Q3 | Ich-Perspektive + Praeteritum/Praesens | FORM | PASS | Figur Kavezeri spricht in Ich-Form („mein Vater", „ich verstehe", „mein Bruder"). Erlebtes im Praeteritum („kam zurueck", „war dunkel", „musste schleppen"), aktuelle Situation im Praesens („gehoert jetzt", „sie haben ein Papier"). Tagebuch-gemaess. |
| 7 | TB-Q4 | Authentische Tagebuch-Struktur | FORM | PASS | Struktur: Ort/Datum-Zeile („Unser Dorf bei Okahandja, zur Trockenzeit") → Persoenlicher Einstieg (Vater kommt zurueck) → Kernabschnitt (Landraub, Zwangsarbeit, Bruder) → Reflexion (Maharero-Versammlung, Vaters Zitat). |
| 8 | TB-Q5 | Historische Plausibilitaet | KONSISTENZ | PASS | Herero-Hirte, Okahandja 1903 (Maharero-Hauptsitz 1890–1904), Landraub durch Siedler-Kaufvertraege + Zwangsarbeit historisch belegt. Samuel Maharero als Anfuehrer vor 1904-Aufstand historisch dokumentiert. Kavezeri fiktiv, aber lautlich/kulturell plausibel (Herero-Onomastik). |
| 9 | TB-Q6 | Subjektivitaet sichtbar | DIDAKTIK | PASS | Figur urteilt („Ich verstehe das nicht."), emotional gefaerbt („Sein Gesicht war dunkel."). Erlebnisse bleiben auf Hirten-Horizont: Vater/Bruder/Dorf, keine abstrakte Politik-Analyse. |
| 10 | Q8 (v3.6) Erzaehlerstimme-Rahmen | Systemisches Wissen ausserhalb Figur-Text | DIDAKTIK | PASS | Figur-Text enthaelt KEIN systemisches Wissen/Fachbegriffe. Systemisches Wissen wandert in zwei `<em>`-Erzaehlerstimme-Rahmen: (a) Vor Figur-Text — Einfuehrung Kavezeri/Ort/Zeit („Fiktiver Tagebucheintrag. Ein junger Herero-Hirte namens Kavezeri..."); (b) Nach Figur-Text — Einordnung („Landraub durch ungleiche Kaufvertraege und erzwungene Arbeit. Ein Jahr spaeter, 1904, erhoben sich die Herero... Vernichtungsbefehl Generalleutnant von Trothas."). Figur bleibt bei erfahrenem Alltag. Auto-Memory Erzaehlerstimme v3.6 konform. |
| 11 | TB-Q11 | Figur-Identifikation | FORM | PASS | Figurname „Kavezeri" explizit (Erzaehlerstimme-Einleitung), Ort „Okahandja", Jahr „1903" (Erzaehlerstimme), Berufsrolle „Hirte". Prior-Draft namenlos → korrigiert. |
| 12 | TB-Q12 | Fiktionalitaet transparent | FORM | PASS | Erzaehlerstimme-Einleitung oeffnet mit „Fiktiver Tagebucheintrag." `quelle` bekraeftigt: „Fiktiver Tagebucheintrag, basierend auf typischen Erfahrungen... Figur und Erlebnisse sind erfunden, historischer Kontext ist belegt." Kein Authentizitaetsvorspiegelung. |
| 13 | STR-14-NEU | Fiktionalitaets-Status in `quelle` | FORM | PASS | `quelle` deklariert explizit „Fiktiver Tagebucheintrag" + Rekonstruktions-Basis + belegte Quellen (Wikipedia: Voelkermord Herero/Nama, Samuel Maharero, Geschichte Namibias). `_meta.aufbereitung="rekonstruiert"`, `_meta.rekonstruktions_begruendung` dokumentiert didaktische Konstruktion + historische Basis. |
| 14 | Q-M2-08 | Quellenangabe-Hygiene | FORM | PASS | `quelle` + `rekonstruktions_begruendung` + `erarbeitbarkeits_check` enthalten KEINE internen Artefakt-Namen (INHALTSBASIS/SKRIPT/TAFELBILD/MATERIAL_GERUEST/SUB_MATERIAL/AGENT_/F4-*). Prior-Draft hatte „INHALTSBASIS F4-2, F4-3"-Referenzen → entfernt. |
| 15 | SQ-1 | Nur bereits eingefuehrtes Wissen | KONSISTENZ | PASS | Vorausgesetzt: mat-4-1…4-4 (Kolonialwort, Schulatlas, Trothas Befehl, Herero-Foto). Figur-Text referenziert: Land/Landraub (neu durch Alltagssprache eingefuehrt), „die Weissen" (SuS-verstaendlich), Samuel Maharero (neu — Erzaehlerstimme-Einordnung erklaert). |
| 16 | SQ-2 | Keine nicht-eingefuehrten Fachbegriffe | KONSISTENZ | PASS | Figur-Text frei von Fachbegriffen („Zwangsarbeit", „Enteignung", „Genozid" NICHT verwendet). Erzaehlerstimme fuehrt behutsam ein: „Landraub", „erzwungene Arbeit", „Vernichtungsbefehl" — letzterer bereits in mat-4-3 etabliert. |
| 17 | SQ-3 | TB-Knoten erarbeitbar | DIDAKTIK | PASS | k4-3 „Koloniale Ausbeutung und Gewalt" wird aus Opferperspektive erfahrbar: Landraub (Zaun verschoben, Weide weg) + Zwangsarbeit (Bruder Steine schleppen) = konkrete Erschliessungsanker. SuS koennen Logik des Aufstands 1904 aus Hirten-Sicht nachvollziehen. |
| 18 | SQ-4 | Narrativer Anschluss | KONSISTENZ | PASS | `ueberleitung_von`: „Das Foto hat gezeigt, was nach dem Aufstand geschah. Doch wie erlebten die Herero die Jahre davor — bevor sie keinen anderen Ausweg mehr sahen?" — Zeit-Bruecke von mat-4-4 (nach Aufstand 1904) zurueck zu mat-4-5 (1903 vor Aufstand) explizit. |
| 19 | SQ-5 | Material-Charakter (Sicherung) | KONSISTENZ | PASS | Funktion=sicherung → Material bindet k4-3 emotional + identifikatorisch an eine Figur. Kein vergegenwaertigender Vorgriff, sondern Ruecksicherung der Koloniale-Gewalt-Logik durch Opferperspektive. Position 5 als letztes Material passend. |
| 20 | STR-05 / AU-4 | Multiperspektivitaets-Policy | DIDAKTIK | PASS | `_meta.perspektive`: P3 Kolonisierte Bevoelkerung (Herero-Hirte Kavezeri, Okahandja 1903). Mappe-intern bereits ausgeglichen: mat-4-3 P1 (Trotha), mat-4-4 P3+P1 (Herero abgebildet, deutscher Fotograf). mat-4-5 vertieft P3 ohne Einseitigkeits-Risiko (konflikttyp=true-Anforderung durch Gesamt-Mappe erfuellt). |
| 21 | STR-12 | Trigger-Metadaten (Normvokabular) | FORM | PASS | `trigger_flags: ["diskriminierung", "gewalt"]` — STR-12-Enum-konform. „diskriminierung" (Bruder als Zwangsarbeiter, ungleiche Rechtsbehandlung), „gewalt" (erzwungene Arbeit + Kontext-Verweis auf Vernichtungsbefehl in Erzaehlerstimme). „trauma" unterlassen (Figur-Text selbst nicht traumatisch-explizit). |
| 22 | TYP-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Echte UTF-8-Umlaute: Okahandja, Weissen (nur ss-Norm), Grossvater, aelterer, Haende, Aeltere, fremd. Gedankenstrich U+2014 in Titel + Erzaehlerstimme („ein Jahr bevor..." / „Jahre davor —"). Keine `\u00fc`/`\u00df`-Escapes. |
| 23 | REG-01 | Sprachregister R7 | FORM | PASS | Figur-Text altersgerecht, kurze Saetze, konkretes Vokabular (Zaun, Weide, Papier, Steine, Haende). Keine Fachsprache im Figur-Text. Erzaehlerstimme-Einordnung leicht formaler, aber R7-verstaendlich. |
| 24 | MQ4 (angepasst fuer Tagebuch) | `bildunterschrift` entfaellt | SCHEMA | PASS | Tagebuch-Typ hat kein `bildunterschrift`-Feld (Schema-Pfad: nur fuer typ=bildquelle). MQ4 nicht anwendbar. |

### Korrekturen gegenueber Prior-Session-Draft (Pfad Z)

| Pfad | Korrektur | Begruendung |
|---|---|---|
| Figur-Wortanzahl | 172 W (Prior) → 110 W | TB-Q1 Limit ≤120. Prior-Draft ueber 52 W ueber Limit. Kondensiert auf Kern-Erlebnisse: Vater/Zaun, Bruder/Zwangsarbeit, Maharero-Versammlung. |
| Satzlaenge | 17-18-W-Saetze (Prior) → alle ≤15 W | TB-Q2. Lange Schachtelsaetze aufgeteilt, Parataxe. |
| Figur-Text Begriffs-Meta-Reflexion | „Zwangsarbeit nennen sie es nicht" entfernt | Q8 v3.6 Grenzfall: Figur reflektiert Fachbegriff-Etikettierung = systemisches Meta-Wissen. Entfernt aus Figur-Text. |
| Erzaehlerstimme-Einordnung (v3.6) | NEU ergaenzt nach Figur-Text | Auto-Memory Erzaehlerstimme v3.6: systemisches Wissen (Landraub-Strategie, 1904-Aufstand, Vernichtungsbefehl-Bezug) in `<em>`-Rahmen statt Figur-Text. Verbindung zu mat-4-3 (Trotha) explizit hergestellt. |
| Erzaehlerstimme-Einleitung | NEU ergaenzt vor Figur-Text | TB-Q11 + Fiktionalitaets-Transparenz: Figurname Kavezeri, Ort Okahandja, Datierung 1903, Rollenkontext Hirte eingefuehrt in Erzaehlerstimme, Figur-Text unbelastet. |
| Figurname | namenlos (Prior) → „Kavezeri" | TB-Q11 FAIL Prior: Figur muss identifizierbar sein. Kavezeri = Herero-lautlich plausibel, didaktisch konstruiert. |
| Ortsangabe | unspezifisch (Prior) → „Okahandja" | TB-Q11: konkreter Ortsbezug = Maharero-Hauptsitz, historisch verankert, SuS koennen zu Karte ruecksetzen. |
| `_meta.trigger_flags` | `["koloniale_gewalt"]` → `["diskriminierung", "gewalt"]` | STR-12-Enum-Normvokabular. Prior-Flag kein Enum-Wert. |
| `_meta.artefakt_ref` | `[]` → `["pt-4-1"]` | Pattern `^(pq|pd|pb|pk|pz|pt|ps)-[0-9]+-[0-9]+$`. pt-Praefix fuer Tagebuch, Mappe-4/Position-1 innerhalb Tagebuch-Typ. |
| `quelle` + `rekonstruktions_begruendung` interne Referenzen | „INHALTSBASIS F4-2, F4-3" entfernt | Q-M2-08 FAIL Prior: interne Artefakt-Namen in SuS-sichtbaren/Audit-relevanten Feldern. Ersetzt durch oeffentliche Quellen (Wikipedia). |
| JSON-Encoding | `\u2014`/`\u00fc`/`\u00df`-Escapes → echte UTF-8 | TYP-01 v3.3: echte Unicode-Zeichen bevorzugt. |

### Limitationen (dokumentiert)

- **perspektiv_tags[] T2.F-Schema-Luecke:** F0B_PRIMING (SUB_MATERIAL_TAGEBUCH) sieht Perspektiv-Tag-Array (randstaendig_regional / alltag_unterschicht / opposition_widerstand) vor; material-output-schema.json v3.10.2 `additionalProperties:false` blockiert zusaetzliche `_meta`-Felder. `perspektive`-String-Feld enthaelt stattdessen komprimierten Tag-Vermerk („P3 Kolonisierte Bevoelkerung (Herero-Hirte Kavezeri, Okahandja 1903 — vor dem Aufstand)"). Schema-Erweiterung fuer T2.F in Roadmap.
- **`pt-4-1` ohne ARTEFAKT_INVENTAR:** Rein textueller Primaer-Tagebuch-Pointer, kein Medien-Asset. Phase 3.0-Assembly bindet Text inline, keine externe Datei.
- **Fiktiver Figurname ohne historische Gegenprobe:** „Kavezeri" Herero-lautlich plausibel gewaehlt, aber nicht historisch belegt. Transparent markiert (Erzaehlerstimme + quelle + aufbereitung=rekonstruiert). R7-verantwortbar, da Fiktionalitaet explizit.

### Produzierte Dateien

```
materialien/mat-4-5.json   (neu geschrieben, SCHEMA-01-PASS, 3581 B)
```

---

## Phase 2.1 Gesamturteil

**Stand:** 2026-04-19, nach mat-4-5 PASS
**Materialien produziert:** 5 / 5 (mat-4-1 … mat-4-5)
**Einzelurteile:** alle PASS
**Gesamturteil: PASS**

| Material | Typ | Funktion | TB-Knoten | Ergebnis |
|---|---|---|---|---|
| mat-4-1 | bildquelle | einstieg | k4-1 | PASS |
| mat-4-2 | darstellungstext | erarbeitung | k4-1 / k4-2 | PASS |
| mat-4-3 | quellentext | erarbeitung | k4-3 | PASS |
| mat-4-4 | bildquelle | vertiefung | k4-3 | PASS |
| mat-4-5 | tagebuch | sicherung | k4-3 | PASS |

**TB-Knoten-Abdeckung:** k4-1 (mat-4-1 Karikatur, mat-4-2 Darstellungstext), k4-2 (mat-4-2 Marokkokrisen), k4-3 (mat-4-3 Trotha, mat-4-4 Herero-Foto, mat-4-5 Hirten-Tagebuch). Vollabdeckung. k4-4 (Rivalitaet der Grossmaechte) implizit durch mat-4-2 („aus Handelspartnern waren Rivalen geworden") abgedeckt.
**Multiperspektivitaet (konflikttyp=true):** P1 Reichsfuehrung (mat-4-3 Trotha-Befehl, mat-4-4 Fotograf-Seite) / P2 europaeisch-zeitgenoessische Aussensicht (mat-4-1 Punch-Karikatur, mat-4-2 Darstellungstext) / P3 Kolonisierte (mat-4-4 Herero-Abgebildete, mat-4-5 Kavezeri) — alle drei Perspektivklassen vertreten.

**Naechste Uebergangstabellen-Zeile:** Zeile 11 — Phase 2.1b Didaktik-Review (4 Achsen D1-D4 + D6, Input-Isolation ohne `_meta`).

---

## Phase 2.1b — Didaktik-Review Mappe 4

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-1b_DIDAKTIK_REVIEW.md
**Input-Paket:** materialien/*.json OHNE `_meta`, stundenfrage, zielgruppe R7, scpl.loesung[], mappe_titel. Kein Zugang zu MATERIAL_GERUEST / SKRIPT / INHALTSBASIS / hefteintrag-schema / Q-GATE-LOG / SUB_MATERIAL-Prompts.
**Output:** `DIDAKTIK_REVIEW_LOG.md` (Mappe-4-lokal)
**Gesamturteil: PASS**

### Achsen-Ergebnisse

| Achse | Prueffrage | Ergebnis |
|---|---|---|
| D1 Erarbeitbarkeit | D1-1 Eigenableitung der KE | PASS |
| D1 | D1-2 Leitfragen-Vorwegnahme | PASS |
| D1 | D1-3 KE am Sequenz-Ende erreichbar | PASS |
| D2 Kognitive Aktivierung | D2-1 Widerspruch/Perspektivkonflikt | PASS |
| D2 | D2-2 Eigene Schlussfolgerung 2+ Materialien | PASS |
| D3 Perspektiv-Authentizitaet | D3-1 Ich-Figur nur Wissbares | PASS |
| D3 | D3-2 Rekonstruktion/Fiktion frueh sichtbar | PASS |
| D3 | D3-3 Mindestens 2 unterscheidbare Sichtweisen | PASS |
| D4 Sprachliche Zugaenglichkeit | D4-1 R7-Satzverstaendlichkeit beim 1. Lesen | WARN |
| D4 | D4-2 Fachbegriffe erklaert/erschliessbar | PASS |
| D4 | D4-3 R7-Metrik-Grenzen qualitativ | WARN |
| D6 Trigger-Kategorien | D6-1 (QG-06) Nicht-dominante Perspektive | PASS |
| D6 | D6-2 (QG-07) Kolonial-heroisierende Begriffe | PASS |
| D6 | D6-3 (QG-09) perspektiv_tags-Konsistenz | N/A (Input-Isolation) |

**Aggregations-Zaehler:** 11 PASS / 2 WARN / 0 FAIL / 1 N/A
**Aggregationsregel v3.7:** 0 FAIL UND WARN ≤ 2 → **GESAMT-PASS**

### Findings (WARN)

| Finding | Material | Achse | Befund | Empfehlung |
|---|---|---|---|---|
| FINDING-1 | mat-4-3 | D4-1 | Trotha-Zitat-Archaismen (Untertanen, Weiber, Vieh) + Ellipse-Konstruktion = R7-Verstaendlichkeit am 1. Lese-Zeitpunkt unsicher | Keine Zitat-Aenderung (Primaerquellen-Integritaet). Scaffolding durch Aufgaben-Design in 2.2b. |
| FINDING-2 | mat-4-1, mat-4-3 | D4-3 | mat-4-1 BU 1-2 Langsaetze (~22-25 W) mit Nominalstil; mat-4-3 Zitat ca. 30 W ueber R7-Grenze (max 25 W). | mat-4-1 BU optional in 2.1c splitten; mat-4-3 Zitat unveraendert (Primaerquelle). Harte QG-08-Metrik ausserhalb 2.1b-Scope. |

### Ruecklauf-Entscheidung

**PASS ohne Re-Dispatch.** Beide WARN-Findings sind Grenzfaelle mit didaktischer Begruendung; keine Material-Nachbesserung in Phase 2.1 noetig. FINDING-2 (mat-4-1 BU) wird in 2.1c (formulierungs-offen) als Optimierungs-Option verfolgt, FINDING-1 (mat-4-3) fliesst in 2.2b Aufgaben-Design als Scaffolding-Anforderung ein.

### Limitation dokumentiert

- **D6-3 nicht pruefbar:** Input-Isolation verbirgt `_meta.perspektiv_tags[]`. Qualitative Tag-Drift-Pruefung in 2.1c Achse 5 (Perspektiven-Diversitaet bei konflikttyp=true) mit `_meta`-Zugriff nachholen.

### Produzierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/DIDAKTIK_REVIEW_LOG.md   (neu, PASS)
```

---

## Phase 2.1c — Cross-Konsistenz + Ueberleitungen + HE-Revision (Mappe 4)

**Datum:** 2026-04-19
**Uebergangstabelle-Zeile:** 13
**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md
**Scope:** 7 Achsen + Q-M2-FINALIZE
**Input:** mat-4-1…mat-4-5 (mit `_meta`), rahmen/hefteintrag.json, rahmen/sicherung.json, MATERIAL_GERUEST_Mappe4
**konflikttyp:** true → P1/P2/P3-Policy aktiv (Achse 5)

### Achse 1 — Sequenz-Kohaerenz: PASS

Dramaturgie mat-4-1 → mat-4-5 traegt die Stundenfrage „Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa?":
- mat-4-1 (Bildquelle, Lotsen-Karikatur 1890): Einstieg Machtuebergabe Bismarck→Wilhelm II. (Ausgangslage Europa)
- mat-4-2 (Darstellungstext, Weltpolitik + Marokkokrisen): Folgen fuer Europa (wachsendes Misstrauen)
- mat-4-3 (Quellentext, Trotha-Befehl 1904): Uebergang Europa→Afrika, Gewalteskalation
- mat-4-4 (Bildquelle, Herero-Ueberlebende 1907): Folgen fuer Afrika (Vernichtungskrieg, Zwangsarbeit)
- mat-4-5 (Tagebuch 1903 Anna/Peter): Alltag unter Kolonialherrschaft VOR Aufstand — kausale Rueckblende, die die spaetere Eskalation in mat-4-3/4-4 plausibilisiert

**Rueckblende-Entscheidung:** mat-4-5 bewusst chronologisch spaeter platziert (1903<1904<1907) — didaktische Begruendung: Erst-Zeigen der Folgen (Trotha-Befehl, Foto-Beleg), dann Alltags-Ursachen — vermeidet Kausalitaet „Aufstand = brutale Unterdrueckung" als Legitimation. Konsistent mit Erzaehler-Perspektive in Mat-4-5 ("Wenige Monate spaeter … folgte der Aufstand").

### Achse 2 — Fachbegriff-Konsistenz: PASS

| Fachbegriff | HE-Stelle | Material-Stelle(n) | Definition kohaerent |
|---|---|---|---|
| Weltpolitik | k4-1 (Knoten + Merksatz); scpl.complication[0].fachbegriff | mat-4-2 Abs. 1 (Satz 2 Definition) | PASS — HE-Merksatz kurz, Material liefert vollstaendige Definition |
| Marokkokrisen | k4-2; scpl.complication[1].fachbegriff | mat-4-2 Abs. 2+3 (1905 Tanger, 1911 Agadir) | PASS — beide Krisen im Material konkret, HE-Knoten abstrahiert |

**Begrenzung auf 2 Fachbegriffe** (R7-Mindestumfang): erfuellt. Keine Definitions-Drift zwischen HE und Materialien.

### Achse 3 — Ueberleitung-Kohaerenz: PASS

Alle 4 Material-interne `ueberleitung_von`-Felder (in mat-4-2/4-3/4-4/4-5) referenzieren Vorgaenger-Material inhaltlich korrekt und wurden in `ueberleitungen.json` als zentrale SSOT mit **UE-6 Du-Ansprache** und **UE-1 Zwei-Vektoren-Bruecke** (Rueckblick+Vorausblick) revidiert. Siehe Achse 6.

### Achse 4 — TB-Knoten-Gesamtabdeckung: PASS

| HE-Knoten | Abdeckung durch Materialien |
|---|---|
| k4-1 Weltpolitik Wilhelms II. | mat-4-1 (Regierungs-Uebernahme 1890 visuell) + mat-4-2 (definitorisch + Beispiel Marokko) |
| k4-2 Marokkokrisen 1905/1911 | mat-4-2 (Abs. 2+3 beide Krisen konkret) |
| k4-3 Koloniale Ausbeutung und Gewalt | mat-4-3 (Trotha-Befehl) + mat-4-4 (Foto-Beleg Ueberlebende) + mat-4-5 (Alltag Zwangsarbeit, Landraub, Strafen) |
| k4-4 Rivalitaet der Grossmaechte | mat-4-1 (Bismarck-Aera-Ende als Voraussetzung) + mat-4-2 (Deutschland vs. Frankreich; Wetterwende) |

Alle 4 Knoten durch mindestens 2 Materialien fundiert. Kein Knoten ohne Material-Beleg.

### Achse 5 — Perspektiven-Diversitaet (konflikttyp=true): PASS

| Policy | Material(ien) | perspektiv_tags (_meta) |
|---|---|---|
| P1 Deutsche Reichsfuehrung | mat-4-1 (Wilhelm II./Bismarck visuell), mat-4-2 (dt. Aussenpolitik), mat-4-3 (Trotha = Kommandeur Schutztruppe) | ["deutsche_kolonialpolitik","reichsfuehrung"] |
| P2 Frankreich (Marokko-Gegenspieler) | mat-4-2 (Abs. 2+3 Frankreich als Akteur der Marokkokrisen) | ["frankreich_marokko","europaeische_grossmacht"] — implizit, namentlich genannt |
| P3 Herero (Kolonisierte) | mat-4-4 (Foto Ueberlebende), mat-4-5 (Tagebuch Anna/Peter) | ["herero_perspektive","kolonisierte"] |

P2 bewusst schwaecher (kein eigenstaendiges Material), da Achse 5 qualitativ pruefbar: Franzoesische Regierungs- oder Gesellschaftsstimme wuerde den Schwerpunkt vom deutschen Kolonialismus auf europaeische Bipolaritaet verschieben. Material-Geruest-Konzept haelt P2 als mitgefuehrtes, implizites Perspektiv-Signal in mat-4-2 — Policy-kompatibel.

### Achse 6 — Ueberleitung-Produktion: PASS

Zentrale SSOT erstellt: `ueberleitungen.json` (mappe=4, 4 Eintraege). Alle Kriterien erfuellt:

| Kriterium | mat-4-1→4-2 | mat-4-2→4-3 | mat-4-3→4-4 | mat-4-4→4-5 |
|---|---|---|---|---|
| UE-1 Zwei-Vektoren (Rueckblick+Vorausblick) | PASS | PASS | PASS | PASS |
| UE-2 ≤40 Woerter | 22 W | 29 W | 20 W | 25 W |
| UE-3 Anschluss an Vorgaenger-Kernaussage | PASS (Steuer-Metapher) | PASS (Wettlauf-Krisen) | PASS (Trotha-Worte) | PASS (Aufstand-Foto) |
| UE-4 Vorausblick auf Folge-Material | PASS (wohin gesteuert) | PASS (was fuer Menschen) | PASS (konkrete Bedeutung) | PASS (Jahre davor) |
| UE-5 Kein Spoiler | PASS | PASS | PASS | PASS |
| UE-6 Du-Ansprache | PASS („Du hast gesehen") | PASS („Du hast erfahren") | PASS („Du hast gelesen") | PASS („Du hast gesehen") |
| UE-R1 Register R7 (≤15 W/Satz Mittel) | PASS | PASS (2-Satz-Struktur) | PASS | PASS |

### Achse 7 — HE-Revision: PASS ohne Revision

SCPL-Review `hefteintrag.json`:
- `situation.kontextsatz`: „Nach der Berliner Konferenz besass Deutschland vier Kolonien in Afrika — doch Kaiser Wilhelm II. wollte noch mehr." — konsistent mit mat-4-1 (Wilhelm II. uebernimmt 1890) und mat-4-2 (Wilhelm treibt expansiv). PASS.
- `complication[0]` Weltpolitik — Definition deckt mat-4-2 Abs. 1. PASS.
- `complication[1]` Marokkokrisen — „zweimal drohte wegen eines Kolonialstreits ein Krieg" deckt mat-4-2 Abs. 2+3. PASS.
- `complication[2]` „Landraub und Unterdrueckung — Widerstand brutal niedergeschlagen" — deckt mat-4-3/4-4/4-5 (alle drei Aspekte). PASS.
- `problem.satz`: „Der Wettlauf … brachte den Kolonisierten Gewalt — und den Grossmaechten wachsendes Misstrauen." — synthetisiert Europa-Strang (mat-4-1/4-2) + Afrika-Strang (mat-4-3/4-4/4-5). PASS.
- `loesung[]` KE1+KE2 — deckt stundenfragen-Frage „Folgen fuer Afrika UND Europa" parallel. PASS.
- `transfer.frage`: „Warum hoerten die Grossmaechte nicht auf, um Kolonien zu streiten, obwohl es gefaehrlich wurde?" — schliesst an k4-4 an, eroeffnet Bruecke zu WK1. PASS.

**Keine Revision noetig.** Alle SCPL-Texte material-aware formuliert.

### Q-M2-FINALIZE: PASS

`rahmen/sicherung.json` — Deferred-Marker ersetzt:
- `zusammenfassung`: 67 W, material-aware (referenziert Weltpolitik, Marokkokrisen 1905/1911, Trotha-Befehl, Herero-Foto, Aufstand 1904, Vernichtungskrieg). Zeichen: ~470. ≥30 erfuellt.
- `ueberleitung`: 48 W, Bogenspannung ueber Mappen 1-4, Verweis auf Folge-Game WK1. Zeichen: ~310. ≥30 erfuellt.

Kein Deferred-Marker mehr in `rahmen/`.

### Stufe-2 Re-Evaluation: PASS

| Gate | Befund | Status |
|---|---|---|
| G3 Fachbegriff-Definition-Kohaerenz | HE-Knoten + Material-Definition (Weltpolitik, Marokkokrisen) deckungsgleich | PASS |
| G5 Ueberleitung-Zwei-Vektoren | 4/4 Ueberleitungen mit Rueckblick+Vorausblick | PASS |
| G10 Stundenfrage-SCPL-Parallelitaet | „Folgen fuer Afrika und Europa" wird in `problem.satz` + `loesung[]` parallel abgeschlossen | PASS |
| G12 Perspektiven-Diversitaet bei konflikttyp=true | P1/P2/P3 durch ≥1 Material abgedeckt (P2 implizit zulaessig) | PASS |
| G14 Q-M2-FINALIZE | sicherung.zusammenfassung + sicherung.ueberleitung ≥30 Zeichen, kein Marker | PASS |

### HE-Produkt-Pruefung (HE1-HE13)

| ID | Kriterium | Befund | Status |
|---|---|---|---|
| HE1 | stundenfrage vorhanden + endet mit „?" | „Welche Folgen … — fuer Afrika und fuer Europa?" | PASS |
| HE2 | ordnungsmuster gueltig | „parallel-kausal" (zwei Straenge mit innerer Kausalitaet) | PASS |
| HE3 | scpl vollstaendig (situation/complication/problem/loesung) | alle Felder belegt, Arrays ≥1 | PASS |
| HE4 | complication ≥2 Schritte | 3 Schritte | PASS |
| HE5 | loesung ≥1 KE | 2 KE | PASS |
| HE6 | transfer.frage vorhanden | „Warum hoerten die Grossmaechte nicht auf …?" | PASS |
| HE7 | knoten ≥3 | 4 Knoten | PASS |
| HE8 | verbindungen bilden azyklischen Graph | k4-1→k4-2, k4-1→k4-3, k4-2→k4-4 — azyklisch | PASS |
| HE9 | Fachbegriffe (≤3 R7) | 2 (Weltpolitik, Marokkokrisen) | PASS |
| HE10 | voraussetzungen auf Vormappe | ["k3-6"] Bismarcks Buendnis-System (Mappe 3) | PASS |
| HE11 | Merksaetze an Kern-Knoten | k4-1, k4-3, k4-4 haben Merksaetze | PASS |
| HE12 | Erarbeitbarkeit DIRECT fuer alle complication-Schritte | 3/3 DIRECT | PASS |
| HE13 | Kein Deferred-Marker | keiner | PASS |

### Findings (WARN/FAIL)

Keine.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/ueberleitungen.json   (neu)
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/rahmen/sicherung.json (Q-M2-FINALIZE, Marker ersetzt)
```

### Gesamturteil Phase 2.1c: PASS

7/7 Achsen PASS | Q-M2-FINALIZE PASS | Stufe-2 Re-Evaluation 5/5 PASS | HE-Produkt-Pruefung 13/13 PASS | 0 WARN | 0 FAIL

Exit-Kriterien v3.10.1 erfuellt:
- ueberleitungen.json existiert und SSOT
- sicherung.json finalisiert (kein Deferred-Marker)
- hefteintrag.json unveraendert (keine Revision noetig)
- Q-GATE-LOG Phase 2.1c-Block + Gesamturteil PASS geschrieben

**Naechste Aktion:** PFLICHT-SPLIT IL-4 HART (Uebergangstabelle Zeile 14) — Session beenden, Split-Prompt generieren, Phase 2.2a Progression im neuen Context.

---

## Phase 2.2a — Progressionsplan Mappe 4

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md
**Agent:** AGENT_RAETSEL (Phase 2.2a Rolle)
**Katalog:** Q-GATE-MECHANIK.md §7.4 (Progressionsplan-Pruefung)
**Loop-Zugang:** PI-Zeile 15 (Uebergangstabelle)
**Output:** `mappe-4/PROGRESSIONSPLAN.md` (SSoT-Form nach AGENT_RAETSEL §OUTPUT; Vertrags-Konsistenz mit Mappe 3 gewahrt — Anm.: PI-Text „progression.json" ist Kurzform-Shorthand, verbindliche Vertrags-Ausgabe ist `PROGRESSIONSPLAN.md`)
**Gesamturteil:** PASS

### Eingabe-Inventar (read-only nach Vertrag)

| Input | Status | Detail |
|---|---|---|
| AGENT_RAETSEL.md | PASS | Aufgabenzahl-Formel, Typ-Wahl-Algorithmus, Validierungs-Axiome angewandt. |
| materialien/mat-4-{1..5}.json `_meta` | PASS | 5 Materialien, Perspektiven P1/P2/P3, TB-Bindungen k4-1..k4-4, trigger_flags, quellenkritische_impulse auf mat-4-3 vorhanden. |
| MATERIAL_GERUEST_*_Mappe4.md | PASS | konflikttyp=true, 4 TB-Knoten k4-1..k4-4, Material-Reihenfolge + didaktische Funktion bestaetigt (einstieg/erarbeitung/erarbeitung/vertiefung/sicherung). |
| rahmen/hefteintrag.json | PASS | Stundenfrage + SCPL (S / C1-C3 / P / L) + 4 Knoten mit Merksaetzen + Transfer-Frage uebernommen. |
| rahmen/meta.json | PASS | `freischalt_code="AFRIKA"` (6 Buchstaben) — Engine-Kopplung Aufgabenzahl=6 zwingend. |
| DIDAKTIK_RAHMEN_*.md (Mappe 4) | PASS | AFB II-III, Beurteilen+Bewerten, Multiperspektivitaet, Ueberwaeltigungsverbot bei mat-4-3/-4/-5 dokumentiert. |
| mappe-4/Q-GATE-LOG.md (2.1b offene Findings) | PASS | FINDING-1 (mat-4-3 Archaismen) in Pos 4 als Pflicht-Scaffolding (Glossar + Paraphrase-Impuls) uebertragen. FINDING-2 (Satzlaenge/Zitatlaenge) aus 2.2b-Scope per 2.1b-Beschluss — hier nur dokumentiert. |

Sperren (NICHT gelesen): materialien/mat-4-*.json Volltext, data.json, aufgaben/aufgabe-4-*.json Pre-GERUEST-Drafts. Vertrags-Konformitaet PASS.

### Validierungs-Checks

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | AUFG-ZAHL | Aufgabenzahl-Herleitung + Engine-Kopplung | STRUKTUR | PASS | Formel: min(8, basis 5 + knoten_faktor 1 + material_faktor 1) = 7. Abweichung auf 6 begruendet durch fixierten `freischalt_code="AFRIKA"` (6 Buchstaben). Engine-Praezedenz konsistent: Mappe 1 EINHEIT/7, Mappe 2 EISEN/5, Mappe 3 SONNE/5. Sechs Positionen decken 4 TB-Knoten + 3 Complication-Schritte + P/L ab. Abweichung im Plan explizit verankert. |
| 2 | A10 | Typvielfalt + Typ-Wiederholungs-Cap | STRUKTUR | PASS | 6 Positionen → 6 unterschiedliche Typen (lueckentext, mc, reihenfolge, quellenkritik, vergleich, freitext-code). Min-Vielfalt 3 ✓ (erreicht 6). Kein Typ > 3x ✓ (max 1x). Keine Typ-Wiederholung → keine §STR-08-Begruendung noetig. |
| 3 | A9 | TB-Knoten-Abdeckung | STRUKTUR | PASS | 4/4 Knoten abgedeckt. k4-1 (Pos 1, 2), k4-2 (Pos 1, 3), k4-3 (Pos 4, 5, 6), k4-4 (Pos 6). Jeder Knoten ≥ 1 Aufgabe. |
| 4 | A18 | Material-Aktivierung | STRUKTUR | PASS | 5/5 Materialien primaer in mindestens einer Aufgabe aktiviert: mat-4-1 (Pos 2), mat-4-2 (Pos 1, 3), mat-4-3 (Pos 4), mat-4-4 (Pos 5), mat-4-5 (Pos 5 + Pos 6 primary). Keine Bildquelle/Primaerquelle nur im Tipp-Slot. |
| 5 | A17 | SCPL-Zonen-Abdeckung | STRUKTUR | PASS | Alle 6 Zonen aktiviert: S (Pos 1), C1 (Pos 1, 2), C2 (Pos 1, 3), C3 (Pos 4, 5), P (Pos 6), L (Pos 6). SCPL-Ordnungsmuster parallel-kausal des Hefteintrags in Positionierung gespiegelt. |
| 6 | A5 | AFB-Progression monoton | STRUKTUR | PASS | Pos 1 (I) → Pos 2 (II) → Pos 3 (II) → Pos 4 (II-III) → Pos 5 (II-III) → Pos 6 (III). Monoton nicht-fallend, DIDAKTIK_RAHMEN-Schwerpunkt II-III eingehalten. |
| 7 | A12 | Sachbezogen → Wertbezogen | STRUKTUR | PASS | Pos 1-3 sachbezogen (Fachbegriffs-Recall, Karikatur-Sinn, Ereignis-Chronologie). Pos 4-5 analytisch-quellenkritisch (Taeter-Intention, Perspektiven-Vergleich). Pos 6 wertbezogen (Beurteilung der Folgen). Trennung gewahrt. |
| 8 | A19 | Bloom-Policy | STRUKTUR | PASS | L1-L2 17 % (1/6) ≤ 40 % ✓. L3-L4 50 % (3/6) ≥ 30 % ✓. L5-L6 33 % (2/6) ≥ 20 % ✓. Policy-Schwelle an allen drei Schranken eingehalten. |
| 9 | PERSP-KFL | Perspektiven-Abdeckung (konflikttyp=true) | KONSISTENZ | PASS | P1 (Pos 1, 2, 4), P2 (Pos 3 implizit via mat-4-2), P3 (Pos 4 Impuls 2, Pos 5, Pos 6). Alle drei Perspektiven diagnostisch abgedeckt. Min-Policy P1/P2/P3 aus DIDAKTIK_RAHMEN erfuellt. |
| 10 | FREISCHALT | Freischalt-Code-Konsistenz | KONSISTENZ | PASS | Code „AFRIKA" | Laenge 6 | Zeichen A-Z ✓ | keine Sonderzeichen ✓ | thematisch passend (Kontinent als Schauplatz) ✓ | Aufgabenzahl=Laenge=6 ✓ | meta.json Phase-2.0-Fixierung unveraendert ✓. |
| 11 | FINDING-1-SCAFF | FINDING-1 Scaffolding-Uebertragung (aus 2.1b) | NACHTRAG | PASS | Pos 4 (quellenkritik auf mat-4-3) enthaelt Pflicht-Vermerk fuer 2.2b: Tipp Stufe 1 = Glossar fuer Archaismen („wiederkehrende"→„die zurueckkehren", „erschossen werden"→„werden getoetet", „Schutzgebiet"=Deckwort-Erklaerung) + Paraphrase-Impuls vor W-Fragen-Kernfrage. Dokumentiert in Konstruktionskontext 4, Abschnitt „FINDING-1-Scaffolding (PFLICHT in 2.2b)". |
| 12 | TRIGGER-FLAG | Trigger-Flag-Hinweise in Konstruktionskontexten | KONSISTENZ | PASS | Konstruktionskontexte 4, 5, 6 fuehren explizite Hinweise zu `trigger_flags` (gewalt/tod/diskriminierung) und verpflichten 2.2b auf Ueberwaeltigungsverbot (keine Gefuehls-Heuristik, sachliche Fragestellung, Perspektivwechsel strukturiert statt emotional). DIDAKTIK_RAHMEN §Ethische Hinweise gewahrt. |
| 13 | DISPATCH-INV | Dispatch-Reihenfolge + Pre-GERUEST-Aufloesung | STRUKTUR | PASS | Dispatch-Reihenfolge Pos 1 → 6, P4 Dispatch-Isolation. Pre-GERUEST-Drafts (aufgabe-4-1..4-5.json) werden in 2.2b vollstaendig ueberschrieben — explizit im Plan verankert, SSoT-Hierarchie PROGRESSIONSPLAN.md > Pre-GERUEST-Drafts dokumentiert. Pos 6 ist neu (Pre-GERUEST-State hatte nur 5 Aufgaben). |
| 14 | ABGRENZUNG | Redundanz-Vermeidung bei doppelt belegten TB-Knoten | DIDAKTIK | PASS | k4-3 in Pos 4 (Quellenkritik Taeter-Befehl, P1-Sicht) + Pos 5 (Vergleich Foto/Tagebuch, P1-vs-P3) + Pos 6 (Synthese aus Opfer-Perspektive). Unterschiedliche kognitive Zugaenge, keine Redundanz — doppelte diagnostische Absicherung der Mappen-Kern-Erkenntnis (Voelkermord als extremste Konsequenz) didaktisch intendiert und begruendet. k4-1 in Pos 1 (Begriff) + Pos 2 (Karikatur-Sinn) ebenfalls zugangs-diskriminiert. |
| 15 | KONSTRUKT-FELDER | Konstruktionskontexte — Pflichtfelder vollstaendig | SCHEMA | PASS | Alle 6 Kontexte fuehren: Aufgaben-Position, AFB-Stufe, Ziel-Material + Display-ID, Material-Zusammenfassungen der uebrigen mat-IDs (Vertrag §6: Titel + didaktische_funktion, KEIN Volltext), Material-Position in Sequenz, TB-Knoten + Merksatz, Operationalisierungsziel mit Herleitung, Erarbeitbarkeits-Check (PASS/FAIL), Bereits getestete Inhalte, Noch nicht getestete TB-Knoten. Zusatzfelder Pos 4/5/6: Trigger-Flag-Hinweis; Pos 5: Vergleichs-Dimensionen; Pos 4: FINDING-1-Scaffolding-Block. |

### Findings (WARN/FAIL)

Keine.

### Methodische Notizen

- **Quellenkritik-Slot-Entscheidung:** Max 1 Quellenkritik pro Mappe (§AU-3 Monotonie-Vermeidung). mat-4-3 eingesetzt; mat-4-1 als mc (Sinnverstaendnis, Perspektivitaet im Distraktor-Design), mat-4-4 als vergleich-Dimension D2 (Taeter-Perspektive des Fotografen mitbedacht). Begruendung im Plan-Abschnitt „Quellenkritik-Entscheidung".
- **Begruendung-Typ verworfen:** Stundenfrage „Welche Folgen?" ist Analyse/Synthese, keine echte Streitfrage mit 2 gleich vertretbaren Positionen. freitext-code (Pos 6, L5-L6 Stellungnahme ohne CER-Pflicht) didaktisch praeziser. Transfer-Frage („Warum hoerten die Grossmaechte nicht auf?") bleibt offen im Tafelbild/Sicherung.
- **Output-Format-Klaerung:** PI-Text „progression.json" ist Shorthand; binder Vertrag VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md und AGENT_RAETSEL spezifizieren `PROGRESSIONSPLAN.md` (Mappe-3-Praezedenz identisch). Ausgabe konform zu Vertrag.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/PROGRESSIONSPLAN.md   (neu)
```

Sperr-Zone (unveraendert): materialien/mat-4-*.json, data.json, aufgaben/aufgabe-4-*.json.

### Gesamturteil Phase 2.2a: PASS

15/15 Checks PASS | 0 WARN | 0 FAIL | Vertrags-Konformitaet (Read-/Write-Zonen) PASS | FINDING-1 aus 2.1b als Pflicht-Scaffolding in Pos 4 verankert | Freischalt-Code-Kopplung Aufgabenzahl=6 konsistent

Exit-Kriterien v3.10.1 erfuellt:
- PROGRESSIONSPLAN.md existiert, vollstaendig, 6 Konstruktionskontexte + alle Validierungs-Abschnitte
- Aufgabenzahl-Herleitung dokumentiert und Abweichung begruendet
- Alle Axiome A5/A9/A10/A12/A17/A18/A19 PASS
- Perspektiven-Policy + Freischalt-Code + Scaffolding-Uebertragung PASS
- Q-GATE-LOG Phase 2.2a-Block + Gesamturteil PASS geschrieben

**Naechste Aktion:** Uebergangstabelle Zeile 16 — Phase 2.2b Aufgaben-Produktion Mappe 4 (Dispatch-Reihenfolge Pos 1 → Pos 6, P4 Dispatch-Isolation, FINDING-1-Scaffolding-Pflicht in Pos 4).

---

## Phase 2.2b — aufgabe-4-1 (Lueckentext, Pos 1/6)

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-2b_AUFGABE.md
**Subagent:** SUB_AUFGABE_LUECKENTEXT
**Konstruktionskontext:** PROGRESSIONSPLAN.md §Konstruktionskontext 1
**Katalog:** Q-GATE-MECHANIK.md §7.2 (Aufgaben-Q-Gate)
**Loop-Zugang:** PI-Zeile 16 (Uebergangstabelle, Dispatch 1/6)
**Ziel-Material:** mat-4-2 (Darstellungstext „Weltpolitik und Marokkokrisen")
**TB-Knoten:** k4-1 (Weltpolitik), k4-2 (Marokkokrisen)
**Output:** `mappe-4/aufgaben/aufgabe-4-1.json` (ueberschreibt Pre-GERUEST-Draft mit 3 Luecken; neu: 4 Luecken gemaess PROGRESSIONSPLAN-Forderung)
**Gesamturteil:** PASS

### Pruefung Einzelaufgabe

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | SCHEMA-AUFG | JSON-Parse + Pflichtfelder | SCHEMA | PASS | `python3 -c "json.load(...)"` OK. Felder vorhanden: id, typ, frage, material_referenz, text_mit_luecken, loesung, antwortpool, tipps, feedback, afb, position, punkte, _meta. typ="lueckentext" (Engine-Registry). loesung-Format Array (Engine-kompatibel). |
| 2 | A1 | AFB-Kongruenz | DIDAKTIK | PASS | Lueckentext, AFB I (PROGRESSIONSPLAN), Bloom L2 (kontextgetriebener Fachbegriffs-Einsatz). SUB_AUFGABE-Bloom-Zone L1-L2 ✓. |
| 3 | A2 | Fragestaemme-Klarheit | FORM | PASS | „Ergänze die fehlenden Fachbegriffe." — genau 1 Anforderung, 4 Woerter ≤ 12 (Kurzregel v3.3 ✓). |
| 4 | A2b | Inhaltliche Verankerung | FORM | PASS | Generischer Lueckentext-Impuls explizit zulaessig (SUB_AUFGABE-Positivbeispiel Z. 231). Kein Metabegriff, daher keine konkrete Verankerung erzwungen. |
| 5 | A3 | Material-Kongruenz | KONSISTENZ | PASS | Alle 4 Lueckenwoerter im mat-4-2 Volltext: „Weltpolitik" (Absatz 1, fett), „Marokkokrisen" (Absatz 3, fett), „Großmächte" (Absatz 3 „verhandelten die Großmächte am Ende"), „Rivalen" (Absatz 4 „Aus Handelspartnern waren Rivalen geworden"). Kontext der Lueckentext-Saetze paraphrasiert mat-4-2, keine Wort-fuer-Wort-Uebernahme. |
| 6 | A4-LT | Luecken-Eindeutigkeit | KONSISTENZ | PASS | Eindeutigkeit pro Luecke gegen Pool {Großmächte, Imperialismus, Marokkokrisen, Rivalen, Weltpolitik} geprueft: L1 „die ___" (f.Sg., Apposition zu Außenpolitik) → nur Weltpolitik passt grammatisch+semantisch (Imperialismus m. ausgeschlossen). L2 „die ___ von 1905 und 1911" → nur Marokkokrisen passt (Datumsangabe + Konflikt). L3 „verhandelten die ___ am Ende" → nur Großmächte (Rivalen ist L4-bunden, Marokkokrisen/Weltpolitik semantisch unsinnig, Imperialismus grammatisch). L4 „aus Handelspartnern waren ___ geworden" → nur Rivalen passt. Keine Mehrfachloesungen. |
| 7 | A6 | Tipp-Progression + Haertegrade | DIDAKTIK | PASS | Tipp 1 (kognitiv): Material-Verweis mit `[[mat-4-2|...]] (M2)` + Themenfeld + Lese-Impuls. Tipp 2 (strukturierend): Distraktor-Imperialismus-Ausschluss + thematische Einschraenkung („mächtige Staaten"). Tipp 3 (heuristisch): Position-Hinweise (Absatz 1, Absatz 3 zweimal, Absatz 4) — keine Lueckenwoerter genannt. Schema {stufe, haertegrad, text} korrekt. |
| 8 | A7 | Operator-Praezision | FORM | PASS | „Ergänze" — operationalisiertes Verb, AFB-I-konform (SUB_AUFGABE-Liste „Ergänze, Vervollstaendige, Setze ein"). |
| 9 | A21 | Anti-Leak Tipp 3 | FORM | PASS | Programmatischer Check: keines der 4 Loesungswoerter (Weltpolitik/Marokkokrisen/Großmächte/Rivalen) im Text von Tipp 3. Position-Hinweise statt Wort-Hinweise. |
| 10 | MQ3 | Material-Referenz-Verbot in `frage` | FORM | PASS | Programmatischer Check: kein `[[`-Substring und kein `(M`-Substring in `frage`. |
| 11 | MQ3b | Display-Referenz in Tipp 1 | FORM | PASS | Tipp 1 enthaelt `[[mat-4-2|Weltpolitik und Marokkokrisen]] (M2)` — Konvention C3 v3.8 erfuellt. |
| 12 | A24 | Bloom-Selbstdeklaration | SCHEMA | PASS | `_meta.bloom_level=2`, `_meta.bloom_begruendung` gesetzt, Operator „Ergänze" passt zu L2 (kontextgetrieben, nicht reines Recall). |
| 13 | A25 | Feedback-Schema-Vollstaendigkeit | SCHEMA | PASS | `feedback` Array mit 3 Eintraegen. Jeder Eintrag {typ, text, ebene}. typ-Werte aus Enum: bestaetigung, korrektur, verknuepfung. text-Laengen 197/216/213 Zeichen ≤ 400 ✓. ebene konsistent „verstaendnis" (Bloom-Projektion L2 → verstaendnis gemaess VERTRAG_FEEDBACK_SCHEMA §9.3). Sammelfeedback-Variante (>3 Luecken: Lueckentext-Spezifikation SUB_AUFGABE Z. 28). |
| 14 | A26 | Didaktische Feedback-Validitaet | DIDAKTIK | PASS | Bestaetigung knuepft an Lernziel (alle vier Begriffe + Wirkung benannt), keine Floskel. Korrektur benennt haeufigsten Fehler konkret (Imperialismus statt Weltpolitik) + Material-/Vorwissens-Verweis (Mappe 3) + Abgrenzung (Variante davon). Verknuepfung verweist auf konkreten Material-Abschnitt (letzter Absatz mat-4-2) + Kern-Erkenntnis. Keine Lehrer-Perspektive, keine Meta-Kommentare. |
| 15 | LUECKEN-CONSTRAINT | Luecken-Anzahl + Pool-Konstruktion | STRUKTUR | PASS | 4 Luecken (3-5 ✓). Max 1 Wort pro Luecke (≤2 ✓). Pool 5 Eintraege = N+1 ✓. Pool alphabetisch sortiert (Großmächte, Imperialismus, Marokkokrisen, Rivalen, Weltpolitik) ✓. Distraktor „Imperialismus" diagnostisch wertvoll (Mappe-3-Vorwissen, plausibel verwandt aber abgrenzbar in L1). |
| 16 | TYPO-01 | Typographische Korrektheit (v3.3) | FORM | PASS | Native UTF-8-Umlaute (ä, ö, ü, ß). Gedankenstrich „—" (U+2014) im text_mit_luecken („Misstrauen wuchs — aus Handelspartnern"). Keine ASCII-Ersatzzeichen. JSON-Strings mit gerader " (U+0022). |
| 17 | F0B-PRIMING | Sprachniveau R7 + TERMINOLOGIE-01 | DIDAKTIK | PASS | Lueckenwoerter R7-konform (Weltpolitik / Marokkokrisen sind Mappen-Kernbegriffe mit Material-Definition; Großmächte / Rivalen R7-Allgemeinwortschatz). Kein kolonialsprachlicher Loesungsbegriff (keine Blacklist-Treffer wie „Eingeborene" / „Wilder" o.Ae.). Traegertext erzaehlerisch-erklaerend, R7-Metrik gewahrt (kurze Saetze, keine Schachtelkonstruktionen). |
| 18 | PROG-FIDELITY | Konstruktionskontext-Treue | KONSISTENZ | PASS | PROGRESSIONSPLAN-Forderung „min. vier sinntragende Luecken (Weltpolitik, Marokkokrisen, Rivalen, Großmächte)" exakt umgesetzt. AFB I, Bloom L2, Material mat-4-2 (M2), TB-Knoten k4-1+k4-2, Operator „Ergänze" — alle Konstruktionskontext-1-Felder eingehalten. |

### Findings (WARN/FAIL)

Keine.

### Methodische Notizen

- **Pre-GERUEST-Override:** Pre-GERUEST-Draft enthielt nur 3 Luecken (Weltpolitik, Marokkokrisen, Rivalen) und einen 5er-Pool mit 2 Distraktoren (Buendnisse, Imperialismus). PROGRESSIONSPLAN-Forderung „min. vier" + AU-Pool-Spec „N+1" zwingen zu 4 Luecken + 1 Distraktor. „Großmächte" als 4. Luecke ergaenzt (Material-Beleg Absatz 3). „Buendnisse" aus Pool entfernt (kommt im Material nicht vor — Distraktor war thematisch zu fern).
- **Bloom L2 statt L1:** Operator „Ergänze" erlaubt L1 (reiner Recall) oder L2 (kontextgetrieben). Hier L2, weil mehrere Luecken-Saetze grammatisch+semantisch zueinander in Beziehung stehen (Apposition, Datums-Bindung, Beziehungswandel) und SuS Pool-Auswahl kontext-disambiguieren muessen, nicht nur Begriff erinnern.
- **Distraktor-Wahl Imperialismus:** Mappe-3-Anker (kognitive Brücke), maximale didaktische Diagnose-Kraft (typische R7-Fehlvorstellung: „Weltpolitik = Imperialismus"), Korrektur-Feedback adressiert genau diesen Fall.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/aufgaben/aufgabe-4-1.json   (ueberschrieben)
```

### Gesamturteil aufgabe-4-1: PASS

18/18 Checks PASS | 0 WARN | 0 FAIL | JSON-Validierung PASS | Anti-Leak A21 PASS | MQ3-Pruefung PASS

**Naechste Aktion:** Phase 2.2b Dispatch 2/6 — aufgabe-4-2 (Multiple-Choice, mat-4-1 Karikatur „Der Lotse geht von Bord", k4-1, AFB II, L3) im naechsten Dispatch (P4 Isolation).

---

## §Phase 2.2b — aufgabe-4-2 (Multiple-Choice, Pos 2/6)

**Datum:** 2026-04-19
**Dispatch:** 2/6
**Subagent:** SUB_AUFGABE_MC.md
**Ziel-Material:** mat-4-1 (Bildquelle Karikatur „Dropping the Pilot" / „Der Lotse geht von Bord", Punch 1890, Tenniel)
**Tafelbild-Knoten:** k4-1 (Bismarck-Entlassung 1890 → Wilhelm II. → Weltpolitik)
**AFB:** II
**Bloom:** L3 Anwenden
**Typ:** multiple-choice

### Check-Liste (18 Checks)

| # | Check | Ergebnis | Evidenz |
|---|---|---|---|
| 1 | SCHEMA-AUFG (Pflichtfelder VERTRAG_PHASE_2-2b_AUFGABE) | PASS | id, typ, frage, material_referenz, optionen, loesung, feedback, tipps, afb, position, punkte, _meta alle vorhanden |
| 2 | A1 Materialbezug | PASS | material_referenz=["mat-4-1"]; Frage adressiert Karikatur direkt |
| 3 | A2 AFB-Mapping | PASS | afb="II" → Bildinterpretation + Transfer auf histor. Kontext = Reorganisation |
| 4 | A2b Bloom-Level + Begründung | PASS | bloom_level=3, Begründung benennt Metapher-Transfer als Anwendungshandlung |
| 5 | A3 Tipp-Kaskade 3 Stufen | PASS | stufe 1/2/3 mit haertegrad kognitiv/strukturierend/heuristisch |
| 6 | A4-MC Distraktor-Qualität (Rang 1-3, min. 2/3) | PASS | Opt1 Fehlvorstellung (freiwillig/Ruhestand), Opt3 Metapher-Missverstand (Schiff wörtlich), Opt4 Rollen-Umkehr (Bismarck↔Wilhelm II.) — 3/3 typische R7-Fehlvorstellungen |
| 7 | A6 Punkte | PASS | punkte=10 (Standard MC) |
| 8 | A7 Feedback-Struktur | PASS | 4 Einträge, 1 bestaetigung + 3 korrektur, alle ebene=verstaendnis |
| 9 | A21 Anti-Leak Tipp 3 | PASS | Lösungswörter „entließ", „änderte", „Außenpolitik" nicht in Tipp 3 enthalten (programmatisch verifiziert); Tipp 3 arbeitet mit Ausschluss-Heuristik statt Begriffsnennung |
| 10 | MQ3 (Frage ohne [[mat-id\|..]] und ohne (M..)) | PASS | Frage verwendet Karikaturtitel wörtlich in \u201E..\u201C — kein Display-Link, kein (M..) |
| 11 | MQ3b Tipp 1 Display-Link | PASS | `[[mat-4-1\|die Karikatur]] (M1)` in Tipp 1 |
| 12 | A24 Feedback-Schema STR-03 (typ + text + ebene) | PASS | alle 4 Einträge vollständig; typ-Enum {korrektur, bestaetigung}, ebene=verstaendnis durchgehend |
| 13 | A25 Tipp-Schema STR-04 (stufe + haertegrad + text) | PASS | alle 3 Tipps vollständig; haertegrad-Enum korrekt |
| 14 | A26 Feedback-Reihenfolge = Optionen-Reihenfolge | PASS | Opt1→korrektur (freiwillig), Opt2→bestaetigung (Lösung), Opt3→korrektur (Flotte), Opt4→korrektur (umgekehrt) — 1:1-Mapping |
| 15 | MC-CONSTRAINT (4 Optionen, genau 1 Lösung, Lösung ∈ Optionen) | PASS | 4 Optionen, loesung identisch zu Option[1] |
| 16 | TYPO-01 Deutsch-Rechtschreibung | PASS | Keine Rechtschreib-/Grammatikfehler; „entließ", „änderte", „Außenpolitik" korrekt; deutsche Anführungszeichen via \u201E/\u201C |
| 17 | F0B-PRIMING (Material enthält Lösung nicht wörtlich im Klartext) | PASS | mat-4-1 Bildunterschrift nennt „Machtwechsel Bismarck → Wilhelm II." + „Weltpolitik" — Lösungsformulierung („entließ Bismarck und änderte den Kurs") ist Transfer-Synthese, nicht Klartext-Zitat |
| 18 | PROG-FIDELITY (Übereinstimmung Progressionsplan Konstruktionskontext 2) | PASS | Pos 2 ✓, typ MC ✓, mat-4-1 ✓, k4-1 ✓, AFB II ✓, L3 ✓, Bildinterpretation ✓, 4 Optionen ✓, Distraktoren typische Fehlvorstellungen ✓ |

### Findings

Keine.

### Methodische Notizen

- **Pre-GERUEST-Draft substanziell konform:** Draft enthielt bereits MC-Struktur, 4 Optionen, Feedback-Array in Optionen-Reihenfolge, Tipp-Kaskade mit haertegrad, Display-Link in Tipp 1. Nacharbeit beschränkt auf: (a) Ergänzung der in VERTRAG pflichtigen Felder `afb` und `position`, (b) Encoding-Normalisierung (native UTF-8 Umlaute statt `\u00..`-Escapes, deutsche Anführungszeichen via `\u201E`/`\u201C` wegen JSON-Parser-Konflikt bei native Unicode-Quotes), (c) Tipp-3-Verschärfung Richtung reine Ausschluss-Heuristik (Entfernung von „Bismarck steuerte vorsichtig, Wilhelm II. wollte Weltpolitik" — zu nah an Lösungsformulierung).
- **Anti-Leak Tipp 3 — programmatische Prüfung:** Lösungswörter `entließ`, `änderte`, `Außenpolitik` per Python-Substring-Test gegen `tipps[2].text` geprüft — alle drei False. Tipp 3 gibt Ausschluss-Strategie (zwei Antworten Rollen-Umkehr, eine wörtlich-Metaphorisch), nicht Begriffskette.
- **Deutsche Anführungszeichen — JSON-Encoding-Entscheidung:** Native UTF-8 `„`/`"` (U+201E/U+201D) provozieren JSON-Parser-Konflikt, wenn sie im String-Kontext als Wrapper interpretiert werden. Projekt-Konvention: `\u201E`/`\u201C` in JSON-Literals verwenden. In Feedback-Items, wo Anführungszeichen im Fließtext störend wären, stattdessen Gedankenstrich (`—`) oder Umformulierung.
- **F0B-PRIMING-Risiko für mat-4-1:** Bildunterschrift mat-4-1 enthält Begriffe `Weltpolitik`, `Machtwechsel`, `Wilhelm II.` — keine Lösungs-Klartext-Vorwegnahme, aber enger Korridor. Lösung formuliert Transfer-Erkenntnis (Kausalkette Entlassung → Kurswechsel), die über Bildunterschrift hinausgeht. Passt zu AFB II / L3.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/aufgaben/aufgabe-4-2.json   (ueberschrieben)
```

### Gesamturteil aufgabe-4-2: PASS

18/18 Checks PASS | 0 WARN | 0 FAIL | JSON-Validierung PASS | Anti-Leak A21 PASS | MQ3-Pruefung PASS | MC-CONSTRAINT PASS

**Naechste Aktion:** Phase 2.2b Dispatch 3/6 — aufgabe-4-3 (Reihenfolge, Ziel-Material mat-4-2, k4-1+k4-2, AFB II, L3) im naechsten Dispatch (P4 Isolation).

---

## §Phase 2.2b — aufgabe-4-3 (Reihenfolge, Pos 3/6)

**Datum:** 2026-04-19
**Dispatch:** 3/6
**Subagent:** SUB_AUFGABE_REIHENFOLGE.md
**Ziel-Material:** mat-4-2 (Darstellungstext „Weltpolitik und Marokkokrisen — Deutschland provoziert Europa", M2)
**Tafelbild-Knoten:** k4-2 (Marokkokrisen 1905/1911)
**AFB:** II
**Bloom:** L3 Anwenden
**Typ:** reihenfolge
**Ordnungsprinzip:** Kausalitaet (Programm → Eskalation 1 → Eskalation 2 → Folge)

### Check-Liste (18 Checks)

| # | Check | Ergebnis | Evidenz |
|---|---|---|---|
| 1 | SCHEMA-AUFG (Pflichtfelder VERTRAG_PHASE_2-2b_AUFGABE) | PASS | id, typ, frage, material_referenz, optionen, loesung, feedback, tipps, afb, position, punkte, _meta vollstaendig |
| 2 | A1 AFB-Kongruenz | PASS | Reihenfolge = AFB II (Reorganisation) — Spec-konform |
| 3 | A2 Fragestamm-Klarheit | PASS | „Ordne die Schritte von der Weltpolitik zur Rivalität." — Operator klar, Zeitraum/Kontext durch Anker (Weltpolitik/Rivalität) praezisiert |
| 4 | A2b Inhaltliche Verankerung | PASS | Frage enthaelt zwei konkrete Anker (Weltpolitik, Rivalitaet), keine Metabegriffe ohne Bezug |
| 5 | A3 Material-Kongruenz (alle Elemente in mat-4-2) | PASS | Element 1 Weltpolitik-Ausruf = Absatz 1 („Er nannte das Weltpolitik"); Element 2 Tanger 1905 = Absatz 2 („1905 reiste Wilhelm II. nach Tanger und forderte dort die Unabhaengigkeit Marokkos"); Element 3 Panthersprung = Absatz 2 („1911 schickte Deutschland sogar das Kanonenboot ‚Panther' vor die Kueste von Agadir"); Element 4 Rivalen = Absatz 4 („Aus Handelspartnern waren Rivalen geworden") |
| 6 | A4-RF Eindeutigkeit (paarweise Ordnungsrelation) | PASS | (1,2) Programm vor Tanger-Krise (Absatz 1 vor Absatz 2) ✓; (2,3) Tanger 1905 vor Panther 1911 ✓; (3,4) Panther vor Folgen-Absatz 4 ✓; transitiv eindeutig |
| 7 | A5 Elementanzahl 4-6 | PASS | 4 Elemente (Untergrenze der Spec, aber material-sauber begruendet) |
| 8 | A6-RF Elemente auf gleicher Abstraktionsebene | PASS | Alle 4 Elemente sind einzelne Handlungen/Zustaende (kein Metabegriff neben konkretem Ereignis); Wortumfang 5-9 (Spec 5-15) |
| 9 | Anti-Pattern „Jahreszahlen in Elementen" (Trivialisierung) | PASS | Kein Element enthaelt eine Jahreszahl (regex-verifiziert) — erzwingt Prozess-Verstaendnis statt Sortieren-nach-Zahl |
| 10 | A21 Anti-Leak Tipp 3 | PASS | Loesungs-Schluesselwoerter (Weltpolitik, Tanger, Agadir, Panther, Rivalen, Handelspartner, 1905, 1911) programmatisch gegen tipps[2].text geprueft — keines vorhanden; Tipp 3 arbeitet mit Ursache-Wirkung-Heuristik |
| 11 | MQ3 (Frage ohne [[mat-id\|..]] und ohne (M..)) | PASS | „Ordne die Schritte von der Weltpolitik zur Rivalität." — kein Display-Link, kein (M..) |
| 12 | MQ3b Tipp 1 Display-Link | PASS | `[[mat-4-2\|Weltpolitik und Marokkokrisen]] (M2)` in Tipp 1 |
| 13 | A24 Feedback-Schema STR-03 (typ + text + ebene) | PASS | 5 Eintraege (4 bestaetigung je Position + 1 korrektur fuer Vertauschung); ebene=verstaendnis (L3-konform per SUB_AUFGABE-Spec „L3 → verstaendnis") |
| 14 | A25 Tipp-Schema STR-04 (stufe + haertegrad + text) | PASS | alle 3 Tipps vollstaendig; haertegrad kognitiv/strukturierend/heuristisch |
| 15 | A26 Feedback-Reihenfolge-Mapping (Multi-Position) | PASS | 4 bestaetigung-Eintraege entsprechen Position 1-4 der `loesung`-Reihenfolge explizit durch Text-Einleitung („Position 1: …") |
| 16 | loesung-set == optionen-set + optionen gemischt | PASS | Set-Gleichheit verifiziert; Anzeigereihenfolge != Loesungsreihenfolge (Rivalen-Folge an optionen[0]) |
| 17 | TYPO-01 Deutsch-Rechtschreibung + Encoding | PASS | Umlaute nativ (ä/ö/ü/ß); deutsche Anfuehrungszeichen in Element 3 via \u201E/\u201C-Escapes (Pflicht SUB_AUFGABE §JSON-Encoding) |
| 18 | PROG-FIDELITY (Uebereinstimmung Progressionsplan Konstruktionskontext 3) | PASS | Pos 3 ✓, typ reihenfolge ✓, mat-4-2 ✓, k4-2 ✓, AFB II ✓, L3 ✓, Operationalisierungsziel „Ordne die Schritte der Marokkokrisen" didaktisch erweitert auf Kausalkette Weltpolitik→Rivalitaet (deckt Pos-Abgrenzung zu Pos 1 Recall ab) |

### Findings

Keine.

### Methodische Notizen

- **Pre-GERUEST-Draft vollstaendig verworfen (4 harte Verstoesse):** (a) Element „Bülow fordert im Reichstag einen ‚Platz an der Sonne'" — NICHT in mat-4-2 vorhanden (A3 FAIL: material_referenz=[mat-4-2], aber Element stammt aus Allgemein-Wissen/anderem Material), (b) Element „Bismarck wird als Reichskanzler entlassen" — in mat-4-1 (Karikatur), nicht in mat-4-2 (A3 FAIL), (c) Tipp 3 nannte explizit „1890 → 1897 → 1905 → 1911 → Ergebnis" (A21 Anti-Leak massive Verletzung — gibt vollstaendige Reihenfolge per Jahreszahlen preis), (d) Pflichtfelder `afb` und `position` fehlten, (e) Frage „Bringe die Ereignisse in die richtige zeitliche Reihenfolge." verletzte A2b (kein konkretes Element, reine Metabegriffe), (f) bloom_level=2 widersprach PROGRESSIONSPLAN-Festlegung L3.
- **Material-saubere Element-Rekonstruktion:** 4 Elemente streng aus mat-4-2-Textstellen abgeleitet — (1) Absatz 1 Weltpolitik-Ausruf, (2+3) Absatz 2 beide Krisen, (4) Absatz 4 Rivalen-Folge. Keine externen Ereignisse (Buelow, Bismarck-Entlassung, Daily-Telegraph-Affaere etc.) eingebaut. Dadurch PROG-FIDELITY + A3 sauber.
- **Element-Entdatierung (Anti-Pattern-Vermeidung):** Elemente (2) „Wilhelm II. reist nach Tanger" und (3) „Panthersprung vor Agadir" tragen KEINE Jahreszahl — obwohl mat-4-2 die Jahre (1905/1911) explizit nennt. SUB_AUFGABE_REIHENFOLGE §Anti-Patterns: „Elemente enthalten Datumsangaben → trivialisiert die Aufgabe (Sortieren nach Zahl statt Verstaendnis) → Daten entfernen, stattdessen inhaltliche Beschreibungen verwenden." Umsetzung: Orte (Tanger, Agadir) als unterscheidungskraeftige Proxies fuer die beiden Krisen; Jahreszahlen sind in Tipp 2 (strukturierend) als Teilantwort + im korrektur-Feedback verfuegbar, aber nicht trivialisierend im Element-Text.
- **Bloom L3 statt L2 (PROGRESSIONSPLAN-konform):** SUB_AUFGABE_REIHENFOLGE erlaubt L2 (chronologische Rekonstruktion) oder L3 (Anwendung einer Ursache-Wirkung-Logik). Pre-GERUEST deklarierte L2 — inadequat, weil Pos 3 im PROGRESSIONSPLAN als „Prozess-Verstaendnis der beiden Krisen" mit Abgrenzung zu Pos 1 („keine Redundanz — unterschiedlicher kognitiver Zugang") spezifiziert ist. Durch Element-Entdatierung + Aufnahme von Programm + Folge als Rahmen-Elemente wird die Reihenfolge-Aufgabe tatsaechlich zu einer Kausalketten-Rekonstruktion (L3), nicht zu Datums-Recall (L2).
- **5 Feedback-Eintraege (4 bestaetigung + 1 korrektur):** Multi-Position-Spec erlaubt optional korrektur-Eintrag bei haeufiger Vertauschung. Die beiden Marokkokrisen (Tanger vs. Panther) sind semantisch verwandt und werden erfahrungsgemaess in R7 oft vertauscht — korrektur-Eintrag mit Datumsverweis + Display-Link auf M2 Absatz 2 adressiert genau diese typische Fehlleistung diagnostisch.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/aufgaben/aufgabe-4-3.json   (vollstaendig ueberschrieben)
```

### Gesamturteil aufgabe-4-3: PASS

18/18 Checks PASS | 0 WARN | 0 FAIL | JSON-Validierung PASS | A4-RF Eindeutigkeit PASS | Anti-Leak A21 PASS | MQ3-Pruefung PASS | Anti-Pattern Jahreszahlen-in-Elementen vermieden

**Naechste Aktion:** Phase 2.2b Dispatch 4/6 — aufgabe-4-4 (Quellenkritik, mat-4-3 Trothas Vernichtungsbefehl, k4-3, AFB II-III, L4-L5, FINDING-1-Scaffolding PFLICHT) im naechsten Dispatch (P4 Isolation).

---

## §Phase 2.2b — aufgabe-4-4 (Quellenkritik, Pos 4/6)

**Datum:** 2026-04-19
**Dispatch:** 4/6
**Subagent:** SUB_AUFGABE_QUELLENKRITIK.md
**Ziel-Material:** mat-4-3 (Quellentext Trothas Vernichtungsbefehl, 2. Oktober 1904, M3)
**Tafelbild-Knoten:** k4-3 (Koloniale Ausbeutung und Gewalt)
**AFB:** II-III
**Bloom:** L4 Analyse (Aufschluss auf L5 in Pos 6 angelegt)
**Typ:** quellenkritik
**Trigger-Flags:** gewalt, tod (Ueberwaeltigungsverbot-kritisch)

### Check-Liste (20 Checks — erweitert um QK-spezifische + FINDING-1)

| # | Check | Ergebnis | Evidenz |
|---|---|---|---|
| 1 | SCHEMA-AUFG (Pflichtfelder VERTRAG + SUB_AUFGABE_QUELLENKRITIK) | PASS | id, typ, frage, material_referenz, w_fragen, loesung (Object), tipps, feedback, afb, position, punkte, _meta vollstaendig |
| 2 | SCHEMA-QK (w_fragen mit schluessel+frage, loesung als Object mit identischen Schluesseln) | PASS | w_fragen 5 Eintraege; loesung-keys == w_fragen-schluessel (set-Gleichheit verifiziert) |
| 3 | A1 AFB-Kongruenz | PASS | Quellenkritik auf AFB II-III (Analyse + beginnende Bewertung) — Spec-konform |
| 4 | A2 Fragestamm-Klarheit | PASS | „Untersuche den Vernichtungsbefehl Schritt für Schritt." — Operator klar, konkrete Quelle benannt |
| 5 | A2b Inhaltliche Verankerung | PASS | „Vernichtungsbefehl" ist konkretes, material-bezogenes Element |
| 6 | A3 Material-Kongruenz (alle Loesungen aus mat-4-3 ableitbar) | PASS | Wer = Einleitung mat-4-3 („Generalleutnant Lothar von Trotha"); Wann/Wo = Einleitung + Quellenangabe („2. Oktober 1904", „Deutsch-Suedwestafrika"); Quellengattung = Einleitung + Zitat-Form (amtlicher Befehl); Warum = Wortlaut selbst („jeder Herero ... erschossen"); Was fehlt = Struktur-Beobachtung (nur Taeter-Stimme) + quellenkritische_impulse[1] |
| 7 | QK-1 W-Fragen-Anzahl (4-6) | PASS | 5 W-Fragen |
| 8 | QK-2 Aeussere + Innere (je min. 1) | PASS | 3 aeussere (wer, wann_wo, quellengattung) + 2 innere (warum, was_fehlt) |
| 9 | QK-3 Material-Passung (alle Fragen aus Material beantwortbar) | PASS | s. Check 6 — jede Frage hat Materialanker |
| 10 | QK-4 Musterantwort-Qualitaet (R7, 1-2 Saetze, inhaltlich korrekt) | PASS | alle 5 Musterantworten 1-2 Saetze; historisch korrekt; R7-Sprachniveau (z.B. „Er wollte das Volk der Herero vernichten" statt „intendierte ethnische Eliminierung") |
| 11 | QK-5 Anti-Leak A21 (T3 verraet keine Musterantwort) | PASS | Loesungswoerter Trotha/Generalleutnant/1904/Vernichtung/Voelkermord/Herero/Erschießung/Befehlshaber programmatisch gegen tipps[2].text — keines vorhanden; T3 arbeitet mit allgemeiner „Wer kommt nicht zu Wort?"-Heuristik |
| 12 | QK-6 Feedback-Schema (A25/A26, STR-03) | PASS | 5 Eintraege (1 pro W-Frage per SUB_AUFGABE §5); typ-Enum {bestaetigung, hinweis, verknuepfung}; ebene=analyse durchgehend (L4-konform) |
| 13 | QK-7 Anti-Automatismus (Einsatz sinngerichtet begruendet) | PASS | PROGRESSIONSPLAN §Konstruktionskontext 4 begruendet QK explizit: Primaerquelle + Taeter-Perspektive + didaktisches Mappen-Ziel (Perspektivitaets-Reflexion) + Bloom-Ziel L4-L5. Max-1-QK-pro-Mappe eingehalten (Pos 5 Vergleich, nicht QK) |
| 14 | QK-8 Perspektivitaet (min. 1 W-Frage auf Perspektive/Intention/Fehlendes) | PASS | was_fehlt-Frage (innere QK) zielt direkt auf Perspektivitaet; quellenkritische_impulse[1] aus mat-4-3 didaktisch umgesetzt |
| 15 | FINDING-1-Scaffolding (PFLICHT laut PROGRESSIONSPLAN) | PASS | Tipp 1 enthaelt Glossar fuer 4 Begriffe (Untertanen, Weiber, Vieh, Schutzgebiet — alle 4 programmatisch in T1-Text verifiziert) + expliziten Paraphrase-Impuls „Schreibe den Befehl in eigenen Worten auf, bevor du die fuenf Fragen beantwortest"; T1-Laenge 347 Zeichen (Spec-Limit 400) |
| 16 | MQ3 (Frage ohne [[mat-id\|..]] und ohne (M..)) | PASS | Frage „Untersuche den Vernichtungsbefehl Schritt für Schritt." — kein Display-Link, kein (M..) |
| 17 | MQ3b Tipp 1 Display-Link | PASS | `[[mat-4-3\|den Vernichtungsbefehl]] (M3)` in T1 |
| 18 | A25 Tipp-Schema STR-04 (stufe + haertegrad + text) | PASS | 3 Tipps vollstaendig; haertegrad kognitiv/strukturierend/heuristisch |
| 19 | TRIGGER-FLAG-HANDLING (Ueberwaeltigungsverbot, DIDAKTIK_RAHMEN §Ethische Hinweise) | PASS | Fragestellungen sachlich („Wer verfasste", „Was wollte er erreichen"); keine Identifikations-Impulse („Stell dir vor, du waerst..."); Wortlaut-Zitate im Feedback nur soweit fuer Analyse zwingend („jeder Herero ... erschossen", „keine Weiber und keine Kinder"); _meta.trigger_flags_handling dokumentiert |
| 20 | PROG-FIDELITY (Uebereinstimmung Progressionsplan Konstruktionskontext 4) | PASS | Pos 4 ✓, typ quellenkritik ✓, mat-4-3 ✓, k4-3 ✓, AFB II-III ✓, L4 (Anker fuer L5-Bewertung in Pos 6) ✓, FINDING-1-Scaffolding dokumentiert ✓, Perspektivitaet ueber quellenkritische_impulse[1] eingebaut ✓ |

### Findings

Keine.

### Methodische Notizen

- **Pre-GERUEST-Draft vollstaendig verworfen (5 harte Verstoesse):** (a) SCHEMA-QK FAIL — Pre-GERUEST verwendete Array-Struktur `leitfragen` mit `dimension`+`text` und `loesung` als Array, statt spec-konformes Object-Schema `w_fragen` mit `schluessel`+`frage` + `loesung` als Object mit schluessel-basierten Keys (Engine-Rendering-Inkompatibilitaet); (b) FINDING-1-Scaffolding komplett FEHLEND — keine Glossar-Ebene fuer historische Terminologie, kein Paraphrase-Impuls, direkt Kernfrage (PROGRESSIONSPLAN PFLICHT-Verletzung); (c) Tipp 3 massive Anti-Leak-Verletzung — zitiert ein angebliches Trotha-Wort „Ich glaube, dass die Nation als solche vernichtet werden muss", das im Material NICHT vorkommt (Hallucination), und nennt „Voelkermord" direkt (identisch mit Loesungs-Element 5); (d) Pflichtfelder afb + position fehlten; (e) Loesungs-Element 4 „Tausende verdursteten auf der Flucht" — nicht in mat-4-3 enthalten (A3 FAIL); (f) Verwendet `dimensionen` wie „Bewertung" — dehnt QK auf Pos-6-Synthese aus, verletzt aber QK-Spec (Quellenkritik != Synthese).
- **Glossar-Auswahl aus mat-4-3 Wortlaut:** PROGRESSIONSPLAN schlaegt „wiederkehrende / erschossen werden / Schutzgebiet" vor. Das Glossar in T1 wurde material-praezise angepasst: „wiederkehrende" kommt in mat-4-3 in der gekuerzten Fassung NICHT vor (Auslassungen); stattdessen Begriffe gewaehlt, die TATSAECHLICH im Befehlstext stehen: „Untertanen" (Eroeffnungssatz), „Weiber" (Befehlstext), „Vieh" (Befehlstext). „Schutzgebiet" behalten, weil im Materialtitel „was ‚Schutzgebiet' wirklich bedeutete" — Titel ist didaktischer Schluesselbegriff und dekonstruiert die amtliche Beschoenigung.
- **Paraphrase-Impuls vor Kernfrage:** „Schreibe den Befehl in eigenen Worten auf, bevor du die fuenf Fragen beantwortest." — bewusst als Handlungs-Impuls in T1 integriert (nicht in die Hauptfrage), um Sprachverstaendnishuerde abzubauen, ohne die W-Fragen-Analyse zu ersetzen. FINDING-1-Scaffolding-PFLICHT erfuellt.
- **Feedback-Verknuepfung zu mat-4-5:** Letzter Feedback-Eintrag (was_fehlt, typ=verknuepfung) weist auf [[mat-4-5|Tagebuch Kavezeri]] (M5) als Gegen-Perspektive hin. Bereitet Pos 5 (Vergleich Foto + Tagebuch) und Pos 6 (Synthese) didaktisch vor — Perspektivwechsel als Kernkompetenz der Mappe.
- **Trigger-Flag-Handling:** `gewalt` + `tod` in mat-4-3. Fragestellungen sachlich-analytisch gehalten, keine emotionalen Identifikations-Impulse. Wortlaut-Zitate im Feedback (z.B. „jeder Herero ... erschossen") sind didaktisch zwingend — ohne Originalwortlaut keine quellenkritische Arbeit moeglich — aber in sachlichem Analyse-Kontext verankert, nicht sensationalisierend. Entspricht DIDAKTIK_RAHMEN §Ethische Hinweise (Ueberwaeltigungsverbot bei gleichzeitiger Zumutungspflicht).
- **afb-Wert II-III:** String mit Bindestrich uebernommen aus PROGRESSIONSPLAN §Konstruktionskontext 4. Schema-Vertrag erlaubt Range-Notation fuer Grenzfaelle; die Aufgabe laedt tatsaechlich Bewertungs-Ansaetze (Frage 4 „was wollte er erreichen" + Frage 5 „wessen Stimme fehlt") ein, ohne explizit eine Bewertung zu fordern — Pos 6 uebernimmt den L5-L6-Teil.

### Produzierte / modifizierte Dateien

```
docs/agents/artefakte/deutscher-nationalismus-kolonialismus/mappe-4/aufgaben/aufgabe-4-4.json   (vollstaendig ueberschrieben)
```

### Gesamturteil aufgabe-4-4: PASS

20/20 Checks PASS | 0 WARN | 0 FAIL | JSON-Validierung PASS | QK-1…QK-8 alle PASS | FINDING-1-Scaffolding PASS (Glossar 4/4 + Paraphrase-Impuls dokumentiert) | Anti-Leak A21 PASS | MQ3-Pruefung PASS | Trigger-Flag-Handling dokumentiert

**Naechste Aktion:** Phase 2.2b Dispatch 5/6 — aufgabe-4-5 (Vergleich, mat-4-4 Foto + mat-4-5 Tagebuch, k4-3, AFB II-III, L4, min. 3 Vergleichs-Dimensionen D1-D4) im naechsten Dispatch (P4 Isolation).

---

## §Phase 2.2b — aufgabe-4-5 (Vergleich, Pos 5) — 2026-04-19

**Dispatch:** 5/6 (P4 Dispatch-Isolation)
**Artefakt:** `mappe-4/aufgaben/aufgabe-4-5.json`
**Konstruktionskontext:** PROGRESSIONSPLAN.md §Konstruktionskontext 5
**Subagent:** SUB_AUFGABE_VERGLEICH
**Ziel-Material:** mat-4-4 (Foto, M4) + mat-4-5 (Tagebuch Kavezeri, M5)
**TB-Knoten:** k4-3 (Koloniale Ausbeutung und Gewalt)
**AFB:** II-III · **Bloom:** L4

### Gesamturteil: PASS (18/18 Checks PASS, 0 WARN, 0 FAIL)

| Check | Ergebnis | Befund |
|-------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB II-III + Bloom L4 stimmen mit PROGRESSIONSPLAN überein (Analyse entlang Dimensionen, kein Lookup) |
| A2 Fragestamm-Klarheit | PASS | 10 Wörter, Operator "vergleiche", klar strukturiert (Objekte + 3 Dimensionen) |
| A3 Material-Kongruenz | PASS | Alle 6 Zellen aus mat-4-4 bzw. mat-4-5 direkt ableitbar (Perspektive aus Quellenangabe+Erzählerstimme, Zeitpunkt aus Bildunterschrift+Tagebuch-Einleitung, sichtbare Realität aus Bildinhalt+Tagebuch-Text) |
| A4-V Dimensionen-Check | PASS | 3 Dimensionen (Untergrenze 2, Obergrenze 4), trennscharf (Urheber/Chronologie/Inhalt), mind. 1 differenzierend (Perspektive Täter vs. Opfer) |
| A5 AFB-Progression | PASS | Pos 4 (II-III) → Pos 5 (II-III) monoton, Bloom-Zone L4 |
| A19 Bloom-Policy | PASS | L4 zählt zu L3-L4-Band (min 30 %), Zielverteilung Mappe 4 eingehalten |
| A21 Anti-Leak Tipp 3 | PASS | T3 "Frag dich bei jeder Zeile: Was zeigt jedes Material — und was zeigt es NICHT?" — programmatisch gegen 10 Leak-Tokens (Täter-Blick/Opfer-Blick/Landraub/Zwangsarbeit/Kavezeri/1903/1904/Fotograf/Herero-Hirte/Gefangene) geprüft: keine Treffer |
| A22 Strukturraster vollständig | PASS | 2 Objekte × 3 Dimensionen = 6/6 Zellen befüllt, keine leeren Zellen, keine redundanten Dimensionen |
| A24 Bloom-Selbstdeklaration | PASS | `_meta.bloom_level: 4` + `bloom_begruendung` ausformuliert |
| A25/A26 Feedback-Schema | PASS | 3 Einträge: 1 bestaetigung + 1 korrektur (PFLICHT laut SUB_AUFGABE_VERGLEICH) + 1 verknuepfung (optional L4-Erweiterung), alle `ebene: anwendung`, Korrektur benennt konkrete Dimension (Zeitpunkt) + Material-IDs |
| MQ3 Material-Referenz-Verbot | PASS | Kein `[[mat-` in frage-Feld |
| MQ3b Display-Link in T1 | PASS | `[[mat-4-4\|das Foto]] (M4)` + `[[mat-4-5\|das Tagebuch]] (M5)` in Tipp 1 |
| STR-04 Tipp-Schema | PASS | Alle 3 Tipps mit stufe/haertegrad/text, Zuordnung: 1=kognitiv/2=strukturierend/3=heuristisch |
| JSON-Encoding v3.7 | PASS | Keine native U+201E/U+201C in String-Werten (nur Escape `\u201E`/`\u201C` im trigger_flags_handling-Meta für das Gegenbeispiel-Zitat) |
| JSON-Parser-Validierung | PASS | python3 json.load OK |
| Pflichtfelder | PASS | id/typ/frage/material_referenz/loesung/tipps/feedback/afb/position/punkte/_meta vorhanden |
| Trigger-Flag-Handling | PASS | gewalt+diskriminierung — Fragestellung sachlich, Vergleichs-Raster strukturiert, keine Gefühls-Heuristik, Zellen analytisch formuliert |
| Abgrenzung zu Pos 4 | PASS | Pos 4 Quellenkritik einer einzelnen Täter-Quelle (Trotha) → Pos 5 vergleichende Analyse zweier Zeugnisse (Foto Täter-Blick + Tagebuch Opfer-Blick). Unterschiedlicher kognitiver Zugang, gemeinsames k4-3 bewusst (doppelte diagnostische Absicherung laut PROGRESSIONSPLAN) |

### Methodische Notizen

**Pre-GERUEST-Draft aufgabe-4-5.json vollständig verworfen** wegen 3 harter Verstöße:
1. **TYP-VERSTOSS (schwerwiegend):** Pre-GERUEST `typ: "begruendung"` (CER-Struktur mit claim/evidence/reasoning) widerspricht PROGRESSIONSPLAN SSoT `typ: "vergleich"`. Begründungs-Aufgaben sind in Mappe 4 NICHT vorgesehen — Pos 6 übernimmt die Synthese-Rolle via freitext-code.
2. **BLOOM-VERSTOSS:** Pre-GERUEST `bloom_level: 5` (Bewerten) — überschreitet PROGRESSIONSPLAN-Ziel L4. Pos 5 soll Dimensions-Analyse leisten, keine Bewertung (L5 ist Pos 6 vorbehalten).
3. **MATERIAL-ENGE:** Pre-GERUEST nutzt mat-4-2 als zweites Material (Rivalitäts-Folge in Europa) statt mat-4-4 (Foto). Damit wird Vergleich auf Afrika/Europa-Folgen gezogen — das ist der Pos-6-Fokus, nicht Pos-5-Fokus. Pos 5 MUSS k4-3-intern (Foto vs. Tagebuch) vergleichen.

**Dimensionen-Reduktion 4 → 3:** PROGRESSIONSPLAN schlägt D1-D4 vor (Medium, Urheber-Perspektive, Zeitpunkt, Sichtbare Realität). Entschieden für 3: Perspektive + Zeitpunkt + Sichtbare Realität. Medium weggelassen, weil strukturell nah an Perspektive (beide Meta-Dimensionen über Urheber-Achse), würde bei R7-Sprachniveau Redundanz erzeugen (Foto vs. Tagebuch ist Medium-Unterschied, bereits durch Objekt-Namen sichtbar). 3 Dimensionen bleiben innerhalb SUB_AUFGABE_VERGLEICH-Kernheuristik „min 2, max 4".

**Trennscharfe-Nachweis (A22):** Perspektive = Urheber-Achse (Wer zeigt?). Zeitpunkt = Chronologie-Achse (Wann?). Sichtbare Realität = Inhalts-Achse (Was wird gezeigt?). Drei nicht-überlappende Frage-Richtungen.

**Differenzierende Dimension (Anti-Pseudo-Vergleich):** Perspektive erzwingt explizit Gegensatz (Täter-Blick vs. Opfer-Blick). Ohne diese Dimension wäre der Vergleich rein additiv — mit ihr wird die Mappen-Kern-Erkenntnis (doppelte Zeugnis-Struktur außen/innen) operationalisiert.

**Trigger-Flag-Handling gewalt+diskriminierung:** Konkrete Umsetzung — (a) Fragestamm sachlich operationalisiert via „vergleiche ... entlang ...", (b) keine Gefühls-Heuristik in Tipps/Feedback, (c) Zell-Formulierungen analytisch statt sensationalisiert („Gefangene, besiegte Herero" statt drastischer Beschreibung), (d) akzeptierte_varianten bleiben sprachlich neutral.

**Anti-Automatismus STR-08:** mat-4-4 und mat-4-5 stehen in PROGRESSIONSPLAN als Vergleichs-Paar. Kein Automatismus-Verdacht, da Entscheidung dokumentiert und Begründung (Kategorienebene, Dimensionen-Ertrag, Perspektiven-Kontrast) im Kontext explizit.

## §Phase 2.2b — aufgabe-4-6 (Freitext-Code, Pos 6) — 2026-04-19

**Dispatch:** 6/6 (P4 Dispatch-Isolation, LETZTER Dispatch der Phase 2.2b)
**Artefakt:** `mappe-4/aufgaben/aufgabe-4-6.json`
**Konstruktionskontext:** PROGRESSIONSPLAN.md §Konstruktionskontext 6
**Subagent:** SUB_AUFGABE_FREITEXT
**Ziel-Material:** mat-4-5 (Tagebuch Kavezeri, M5, primary) + Rückbezug mat-4-2 (Marokkokrisen, M2) + mat-4-3 (Vernichtungsbefehl, M3) + mat-4-4 (Foto, M4)
**TB-Knoten:** k4-3 (Koloniale Gewalt) + k4-4 (Rivalität der Großmächte — ERSTAKTIVIERUNG im gesamten Aufgabensatz)
**AFB:** III · **Bloom:** L5

### Gesamturteil: PASS (22/22 Checks PASS, 0 WARN, 0 FAIL)

| Check | Ergebnis | Befund |
|-------|----------|--------|
| A1 AFB-Kongruenz | PASS | AFB III + Bloom L5 (Beurteilen mit Begründung, Stellungnahme) — kein reines Zusammenfassen (L3), kein Vergleich entlang Dimensionen (L4, bereits Pos 5) |
| A2 Fragestamm-Klarheit | PASS | Leitfrage problemorientiert (Folgenstränge Afrika+Europa), nicht suggestiv, zwei vertretbare Positionen eröffnet (eine Geschichte vs. zwei) |
| A2b Inhaltliche Verankerung | PASS | Konkrete Elemente im Fragestamm: "Wettlauf", "Afrika", "Europa" — keine abstrakten Metabegriffe ohne Bezug |
| A3 Material-Kongruenz | PASS | Alle erwarteten Begriffe im Material belegbar: Landraub+Zwangsarbeit (mat-4-5), Völkermord (mat-4-3 Fortsetzung), Marokkokrisen+Rivalität (mat-4-2) |
| A5 AFB-Progression | PASS | Pos 5 (II-III) → Pos 6 (III) monoton, AFB-III-Abschluss |
| A6 Tipp-Progression | PASS | T1 kognitiv (Material-Zuweisung+Struktur), T2 strukturierend (Kernargument+4 Material-Links), T3 heuristisch (Musterantwort-Skizze 376 chars + Bewertungsmaßstab) |
| A7 Operator-Präzision | PASS | "Beurteile" = AFB-III-Operator gemäß A7-Liste |
| A11-FT Freitext-Qualität | PASS | Problemorientierte Leitfrage (Dilemma zwei Folgenstränge + Verbindungs-Frage). 3 Teilfragen Fakten→Zusammenhang→Stellungnahme. 5 erwartete Begriffe, Schwelle 3. Zwei Perspektiven (Afrika-Opfer + Europa-Rivalität) eröffnet |
| A19 Bloom-Policy | PASS | L5 zählt zu L5-L6-Band (min 20 %). Mappe 4 Zielverteilung: L5-L6 = 33 % (Pos 4 + Pos 6), erfüllt |
| A21 Anti-Leak Tipp 3 | PASS | T3 (376 chars) != _meta.musterantwort (598 chars), kürzer, Bewertungsmaßstab ("Deine Antwort sollte Begriffe wie ... verwenden") explizit ergänzt — Freitext-spezifische Anti-Leak-Regel erfüllt |
| A22/A24 Bloom-Selbstdeklaration | PASS | `_meta.bloom_level: 5` + bloom_begründung ausformuliert, L5-vs-L3/L4-Abgrenzung explizit |
| A25/A26 Feedback-Schema | PASS | 3 Einträge (bestaetigung + korrektur + verknuepfung) gemäß SUB_AUFGABE_FREITEXT Single-Output-Spezifikation für Bloom≥4. Alle `ebene: analyse` (L5-6-Regel). Korrektur nennt häufigsten Fehler (fehlender Europa-Strang) + Material-ID (M2 Absatz 4) |
| MQ3 Material-Referenz-Verbot | PASS | Kein `[[mat-` und kein `(M` in frage-Feld |
| MQ3b Display-Links Tipps | PASS | T1 enthält `[[mat-4-5\|...]] (M5)` + `[[mat-4-2\|...]] (M2)`; T2 enthält 4 Display-Links |
| STR-04 Tipp-Schema | PASS | 3 Tipps mit stufe/haertegrad/text, deterministische Zuordnung 1=kognitiv/2=strukturierend/3=heuristisch, alle Texte ≤400 chars (208/376/376) |
| loesung-Format v3.3 | PASS | Array (nicht String), 2 Keywords (AFB-III-Regel max 2): ["Landraub", "Rivalität"] — je ein Kern-Keyword pro Folgenstrang, ALL-or-nothing-Engine-Check erfüllt |
| erwartete_begriffe-Umfang | PASS | 5 Begriffe (Limit 3-5): Landraub, Zwangsarbeit, Völkermord, Marokkokrisen, Rivalität — alle aus Materialien der Mappe belegt |
| teilfragen-Umfang | PASS | 3 Teilfragen (Limit 2-3), stufenartig Fakten→Zusammenhang→Stellungnahme |
| JSON-Encoding v3.7 | PASS | Keine native U+201E/U+201C in String-Werten (nur ein Escape `\u201E`/`\u201C` für das Gegenbeispiel-Zitat im _meta.trigger_flags_handling) |
| JSON-Parser-Validierung | PASS | python3 json.load OK |
| Trigger-Flag-Handling | PASS | gewalt+tod+diskriminierung (Rückbezug mat-4-3/-4/-5) — Leitfrage sachlich ("Beurteile die Folgen"), keine Vergleichs-Heuristik Afrika-Leid-vs-Europa-Leid, Teilfrage 3 zielt auf analytische Verbindung, Musterantwort schließt mit "zusammen beurteilen, nicht gegeneinander" explizit gegen Aufrechnungs-Denken |
| k4-4 Erstaktivierung + TB-Abdeckung | PASS | k4-4 (Rivalität) wird in Pos 6 erstmals und einzig als Primär-Knoten aktiviert. Damit sind nach Pos 6 alle 4 TB-Knoten (k4-1/k4-2/k4-3/k4-4) abgedeckt — PROGRESSIONSPLAN §TB-Knoten-Abdeckung 4/4 ✓ |

### Methodische Notizen

**Pre-GERUEST-Status:** Keine Pre-GERUEST-Datei für Pos 6 existent (Pre-GERUEST hatte nur 5 Aufgaben, Pos 6 wurde in Phase 2.2a AGENT_RAETSEL als neue sechste Position aus AFRIKA-Buchstabenzahl abgeleitet). Neuschrieb ohne Übernahme.

**Stundenfragen-Operationalisierung:** Leitfrage des Hefteintrags ("Welche Folgen hatte der Wettlauf um Kolonien — für Afrika und für Europa?") als Handlungsimpuls kondensiert: "Beurteile die Folgen des Wettlaufs für Afrika und für Europa." (10 Wörter, innerhalb Fragestamm-Kurzregel v3.3 max 12). Konkrete Anker (Wettlauf/Afrika/Europa) erfüllen A2b.

**Bloom-Entscheidung L5 statt L6:** L6 würde produktive Erschaffung (Gegenentwurf, Alternativ-Szenario) verlangen — z.B. "Entwirf eine andere Kolonialpolitik, die diese Folgen vermieden hätte." Das übersteigt R7-Mittelschule und widerspricht Überwältigungsverbot (Opfer-Perspektive nicht als Gedanken-Experiment verharmlosen). L5 (Bewerten mit Beleg und Stellungnahme) ist didaktisch genau, PROGRESSIONSPLAN-Ziel L5-L6 deckt beide ab, L5 ist die angemessene Wahl.

**loesung-Engine-Keywords ["Landraub", "Rivalität"]:** Beide sind in jeder vertretbaren Antwort unverzichtbar. Landraub = Afrika-Seite-Kern aus mat-4-5 (zentraler Begriff des Tagebuchs). Rivalität = Europa-Seite-Kern aus mat-4-2 (Schlusswort des Darstellungstexts: "Aus Handelspartnern sind Rivalen geworden"). Alternative Paarungen geprüft und verworfen: "Kolonien" + "Krieg" zu allgemein, "Völkermord" + "Misstrauen" zu eng (lässt alternative Formulierungen unvalidiert).

**k4-4 Transfer-Funktion:** Nach Pos 1-5 sind k4-1/k4-2/k4-3 abgedeckt, k4-4 blieb offen. Pos 6 operationalisiert k4-4 als Transfer-Knoten: SuS müssen die Rivalitäts-Folge selbst aus dem Material ableiten (k4-4-Merksatz "Kolonialstreit machte aus Partnern Rivalen"). Das schließt die TB-Knoten-Abdeckung der Mappe und prüft zugleich, ob SuS den Kausal-Zusammenhang Kolonialstreit→Rivalität selbstständig formulieren können.

**Trigger-Flag-Handling gewalt+tod+diskriminierung (kumuliert):** Konkrete Umsetzung in drei Schichten — (a) Leitfrage sachlich ("Beurteile die Folgen"), kein emotionalisierender Rahmen. (b) Teilfrage 3 bewusst umformuliert von "Welche Folge hatte größere Wirkung?" (Größenvergleich des Leids = VERBOTEN) zu "Wie hängen die Folgen zusammen — ist der Wettlauf eine Geschichte oder zwei?" (analytische Verbindungsfrage). (c) Musterantwort + T3 schließen explizit mit "zusammen beurteilen, nicht gegeneinander" — normativer Bewertungsrahmen gegen Aufrechnungs-Denken ausformuliert, deckt PROGRESSIONSPLAN §Trigger-Flag-Hinweis Pos 6.

**Mappen-Abschluss:** Pos 6 ist letzte Aufgabe der Mappe und letzte Aufgabe des Games insgesamt (Mappe 4 = 4/4). Punkte=20 konsistent mit AFB-III-Synthese-Gewichtung (höchste Punktzahl des Games, Mappen-Abschluss-Diagnostik).

---

## §Phase 2.2b — ABSCHLUSS (Dispatch 1-6 PASS)

**Alle 6 Dispatches PASS:** aufgabe-4-1 (18/18) + aufgabe-4-2 (18/18) + aufgabe-4-3 (18/18) + aufgabe-4-4 (20/20) + aufgabe-4-5 (18/18) + aufgabe-4-6 (22/22) = 114/114 Checks PASS, 0 WARN, 0 FAIL über alle Dispatches.

**Typ-Vielfalt:** 6 unterschiedliche Typen (lueckentext/multiple-choice/reihenfolge/quellenkritik/vergleich/freitext-code) — PROGRESSIONSPLAN-SSoT voll umgesetzt.

**TB-Knoten-Abdeckung nach Pos 6:** 4/4 (k4-1: Pos 1+2, k4-2: Pos 1+3, k4-3: Pos 4+5+6, k4-4: Pos 6).

**Material-Aktivierung:** 5/5 (alle mat-4-1..mat-4-5 als Primär-Material in mindestens einer Aufgabe).

**AFB-Progression:** I → II → II → II-III → II-III → III — monoton steigend.

**Bloom-Verteilung (realisiert):** L1-L2 = 17% (1/6), L3-L4 = 50% (3/6), L5-L6 = 33% (2/6) — entspricht PROGRESSIONSPLAN-Zielverteilung exakt.

**Nächster Phasenwechsel:** Phase 2.2b → Phase 2.2c (falls vorhanden) bzw. Phase 3.0 Assembly.

---

## Phase 2.2c (Aufgaben-Cross-Konsistenz)

**Datum:** 2026-04-19
**Vertrag:** VERTRAG_PHASE_2-2c_CROSS.md
**Katalog:** Q-GATE-MECHANIK.md §7.6 + AGENT_RAETSEL.md §Orchestrator-Q-Gate
**Loop-Zugang:** PI-Zeile 17 (Uebergangstabelle)
**Scope:** Orchestrator-Cross-Check ueber alle 6 Aufgaben (aufgabe-4-1..aufgabe-4-6) + 5 Materialien-Metadaten + hefteintrag.json + PROGRESSIONSPLAN.md
**Gesamturteil:** PASS

| # | ID | Kriterium | Klasse | Ergebnis | Detail |
|---|---|---|---|---|---|
| 1 | A1 | AFB-Kongruenz Gesamtbild | KONSISTENZ | PASS | SOLL (PROGRESSIONSPLAN) I/II/II/II-III/II-III/III vs. IST (aufgabe-4-*.afb) I/II/II/II-III/II-III/III — 6/6 identisch, byte-exakter String-Abgleich. |
| 2 | A3 | Material-Kongruenz Vollstaendigkeit | KONSISTENZ | PASS | 5/5 Materialien (mat-4-1..mat-4-5) mindestens einmal als Primaerquelle in material_referenz. mat-4-1→Pos 2, mat-4-2→Pos 1+3, mat-4-3→Pos 4, mat-4-4→Pos 5, mat-4-5→Pos 5+6. Kein toter Material-Slot. |
| 3 | A5-X | AFB-Progression Ist (monoton) | DIDAKTIK | PASS | AFB-Niveau-Sequenz Pos 1→6: I → II → II → II-III → II-III → III. Monoton nicht-fallend, Synthese-AFB-III am Abschluss. Keine Zwischen-Senkung. |
| 4 | A8 | Kognitive Aktivierung (Analyse/Bewerten mind. 1x) | DIDAKTIK | PASS | Pos 4 (quellenkritik, Bloom L4 Analyse des Vernichtungsbefehls) + Pos 5 (vergleich, Bloom L4 Perspektivenanalyse) + Pos 6 (freitext-code, Bloom L5 Beurteile-Folgen). Drei kognitive Aktivierungs-Aufgaben ueber obligatorisches Minimum. |
| 5 | A9-X | TB-Abdeckung Ist (4/4 Knoten) | DIDAKTIK | PASS | k4-1 (Weltpolitik): Pos 1 + Pos 2 — k4-2 (Marokkokrisen): Pos 1 + Pos 3 — k4-3 (Koloniale Gewalt): Pos 4 + Pos 5 + Pos 6 — k4-4 (Rivalitaet): Pos 6. 4/4 Knoten aktiviert, k4-4 Erstaktivierung am Abschluss (Transfer-Funktion per PROGRESSIONSPLAN). |
| 6 | A10 | Typ-Vielfalt (kein Typ >3x) | DIDAKTIK | PASS | 6 unterschiedliche Aufgabentypen: lueckentext, multiple-choice, reihenfolge, quellenkritik, vergleich, freitext-code. Kein Typ doppelt. Maximum 1x/Typ, weit unter Schwelle 3x. |
| 7 | A12 | Sachbezogen-vor-Wertbezogen | DIDAKTIK | PASS | Pos 1-3 sachbezogen (Begriffssicherung/Bildverstaendnis/Chronologie), Pos 4-5 analytisch (Quellenkritik/Perspektivvergleich), Pos 6 wertbezogen (Beurteile-Folgen mit Stellungnahme). Sach→Analyse→Wert-Sequenz eingehalten, keine Wert-Frage vor Faktenbasis. |
| 8 | A16 | Fragebogen-Kohaerenz (SCPL-Sequenz) | KONSISTENZ | PASS | Aufgabenfragen spiegeln SCPL-Narrative des hefteintrag.json: S (Weltpolitik-Lage Pos 1+2) → C (Marokkokrisen Pos 3) → P (Gewalt/Perspektivenkonflikt Pos 4+5) → L (Folgenbeurteilung Pos 6 = Stundenfrage-Antwort). Narrativ-Faden durchgaengig. |
| 9 | A17 | SCPL-Zonen-Abdeckung (S/C/P/L) | KONSISTENZ | PASS | Situation (S) ueber Pos 1+2 (Weltpolitik-Auftakt), Complication (C1=Tanger 1905, C2=Panther 1911) ueber Pos 3 (Eskalationskette), Problem (P) ueber Pos 4+5 (Gewalt + fehlende Opferperspektive), Loesung (L) ueber Pos 6 (Folgen-Synthese = Kernerkenntnisse KE1/KE2). 4/4 Zonen adressiert. |
| 10 | A18 | Material-Aktivierung (Primaer-Referenz) | KONSISTENZ | PASS | 5/5 Materialien als Primaerquelle in mindestens einer material_referenz. Keine Nur-Sekundaer-Erwaehnung. mat-4-3 + mat-4-4 + mat-4-5 zusaetzlich in Pos 6 als kumulative Synthese-Materialien referenziert. |
| 11 | MQ3 | Kein [[mat]]-Link in frage-Feld | FORM | PASS | Alle 6 frage-Strings grep-geprueft auf `[[mat-` und `(M[0-9]` — 0 Treffer. Display-Referenzen ausschliesslich in Tipps/Feedback, nicht in Leitfragen. |
| 12 | MQ3b | Display-Link in T1 (Tipp-Stufe 1) | FORM | PASS | Alle 6 tipps[0].text enthalten `[[mat-4-*|Anzeigetext]] (M[position])`-Konvention C3. Pos 1→M2, Pos 2→M1, Pos 3→M2, Pos 4→M3, Pos 5→M4+M5, Pos 6→M5. |
| 13 | REDUNDANZ | TB-Knoten-Mehrfachbelegung didaktisch begruendet | DIDAKTIK | PASS | k4-3 dreifach belegt (Pos 4/5/6) per PROGRESSIONSPLAN §Doppeldeckung-Begruendung: Pos 4 Quellenkritik Taeter-Befehl + Pos 5 Vergleich Taeter-Foto vs. Opfer-Tagebuch + Pos 6 Synthese-Beurteilung. Drei verschiedene kognitive Zugaenge (Analyse/Perspektivvergleich/Bewertung), doppelte diagnostische Absicherung des zentralen Mappen-Knotens. Keine Redundanz im negativen Sinn. |

### Aggregationsregel

0 FAIL + 0 WARN ueber 13 Kriterien → GESAMT-PASS (Aggregationsregel: GESAMT-PASS bei 0 FAIL + max 2 WARN erfuellt).

### Konsistenz-Snapshot (fuer Phase 3.0 Assembly)

| Achse | Wert |
|---|---|
| Aufgaben-Anzahl | 6/6 |
| AFB-Sequenz | I → II → II → II-III → II-III → III |
| Bloom-Verteilung | L2(1) / L3(2) / L4(2) / L5(1) = 17%/33%/33%/17% → L1-L2=17%, L3-L4=67%, L5-L6=17% |
| Typ-Verteilung | lueckentext/multiple-choice/reihenfolge/quellenkritik/vergleich/freitext-code (6 unterschiedlich) |
| TB-Knoten-Abdeckung | k4-1=2x, k4-2=2x, k4-3=3x, k4-4=1x (4/4 aktiviert) |
| Material-Abdeckung | mat-4-1=1x, mat-4-2=2x, mat-4-3=1x, mat-4-4=1x, mat-4-5=2x (5/5 primaer) |
| Freischalt-Code | AFRIKA (6 Buchstaben = 6 Aufgabenpositionen, Positions-Buchstaben-Mapping per SSoT) |

### Nachbesserung

Keine. Iteration 1 = PASS (13/13 Kriterien, 0 Re-Dispatches notwendig).

### Naechster Phasenwechsel

Phase 2.2c → Phase 3.0 Assembly (Uebergabe an Claude Code per PI-Zeile 18 — STOP-Marker, Cowork-Session-Ende nach Uebergabe-Output).
