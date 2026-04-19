# Progressionsplan: Mappe 4 — Wettlauf um die Welt

**Game-ID:** `deutscher-nationalismus-kolonialismus`
**Mappe:** 4 / 4
**Erstellt:** 2026-04-19 (Phase 2.2a, AGENT_RAETSEL)
**Freischalt-Code:** AFRIKA (meta.json fixiert)
**Aufgabenzahl:** 6

---

## Aufgabenzahl-Herleitung

```
basis           = 5
knoten          = 4 (k4-1..k4-4)
materialien     = 5 (mat-4-1..mat-4-5)
knoten_faktor   = ceil(4/5) = 1
material_faktor = 1 (5 > 4)
formel          = min(8, 5 + 1 + 1) = 7
```

**Abweichung auf 6 (begruendet):** Freischalt-Code `AFRIKA` (6 Buchstaben) ist in meta.json (Phase 2.0) fixiert; Engine koppelt Aufgabenzahl = Buchstabenzahl (Mappe 1 EINHEIT=7 Aufgaben, Mappe 2 EISEN=5, Mappe 3 SONNE=5). Sechs Positionen decken die didaktischen Andockpunkte der Mappe vollstaendig ab: 4 TB-Knoten (k4-1 Weltpolitik, k4-2 Marokkokrisen, k4-3 Koloniale Gewalt, k4-4 Rivalitaet) + 3 SCPL-Complication-Schritte + P/L-Synthese. Pos 4 + Pos 5 teilen sich k4-3 (Koloniale Gewalt) aus zwei unterschiedlichen kognitiven Zugaengen (Quellenkritik Taeter-Befehl vs. Vergleich Foto/Tagebuch), weil die Schluessel-Erkenntnis der Mappe (Voelkermord als extremste Konsequenz) eine doppelte diagnostische Absicherung verlangt.

---

## Bloom-Verteilung (Ziel)

```json
{
  "_meta": {
    "bloom_verteilung_ziel": {
      "L1_L2": "17% (1/6 — Pos 1)",
      "L3_L4": "50% (3/6 — Pos 2, 3, 5)",
      "L5_L6": "33% (2/6 — Pos 4, 6)",
      "policy_A19_check": "PASS (max 40% L1-L2: 17% ✓ | min 30% L3-L4: 50% ✓ | min 20% L5-L6: 33% ✓)"
    }
  }
}
```

**DIDAKTIK_RAHMEN-Konformitaet:** Mappe-4-AFB-Schwerpunkt II-III (hoechster im Game, Beurteilen+Bewerten). Die Bloom-Verteilung spiegelt das: L5-L6-Anteil auf 33 % gehoben (Mappe 3: 20 %), L1-L2-Anteil minimiert auf 17 % (nur Fachbegriff-Recall an Pos 1 als Einstiegs-Absicherung).

---

## Progressionstabelle

| Pos | SCPL-Zone | AFB | Bloom | Typ | Ziel-Material | Display-ID | TB-Knoten | Subagent |
|-----|-----------|-----|-------|-----|---------------|------------|-----------|----------|
| 1 | S/C1 | I | L2 | lueckentext | mat-4-2 | M2 | k4-1, k4-2 | SUB_AUFGABE_LUECKENTEXT |
| 2 | C1 | II | L3 | multiple-choice | mat-4-1 | M1 | k4-1 | SUB_AUFGABE_MC |
| 3 | C2 | II | L3 | reihenfolge | mat-4-2 | M2 | k4-2 | SUB_AUFGABE_REIHENFOLGE |
| 4 | C3 | II-III | L4-L5 | quellenkritik | mat-4-3 | M3 | k4-3 | SUB_AUFGABE_QUELLENKRITIK |
| 5 | C3 | II-III | L4 | vergleich | mat-4-4 + mat-4-5 | M4, M5 | k4-3 | SUB_AUFGABE_VERGLEICH |
| 6 | P/L | III | L5-L6 | freitext-code | mat-4-5 (primary) + Rueckbezug mat-4-2, mat-4-3, mat-4-4 | M5 | k4-3, k4-4 | SUB_AUFGABE_FREITEXT |

---

## Typauswahl-Begruendung

| Pos | Typ | Begruendung (Bloom-Stufe + Material-Struktur) |
|-----|-----|-----------------------------------------------|
| 1 | lueckentext | mat-4-2 (Darstellungstext) definiert Weltpolitik und Marokkokrisen inline als Fachbegriffe und benennt zentrale Akteure (Wilhelm II., Frankreich, Grossmaechte). Lueckentext testet kontextgetriebenen Fachbegriffs-Einsatz: SuS platzieren mindestens vier sinntragende Begriffe (Weltpolitik, Marokkokrisen, Rivalen, Grossmaechte) an praezis definierten Positionen. Bloom L2: begriffliches Recall + Kontextverstaendnis. Einstiegs-Absicherung fuer k4-1/k4-2, bevor Bildquellen und Primaerquellen analytisch befragt werden. |
| 2 | multiple-choice | mat-4-1 (Karikatur „Der Lotse geht von Bord") ist eine Sinn-Quelle: die Aussage (Bismarcks Entlassung markiert Kurswechsel zu Weltpolitik) muss interpretiert werden, nicht bloss abgelesen. Transfer-MC: richtige Option erfordert Kombination aus Bildelementen (Bismarck-Figur, verlassenes Schiff, Wilhelm II.) + k4-1-Merksatz. Distraktoren plausibel aus Bildinhalt ableitbar, aber eindeutig falsch. Bloom L3: Sinnverstaendnis einer visuellen Quelle. |
| 3 | reihenfolge | mat-4-2 enthaelt eine kausal-chronologische Ereigniskette (Wilhelm-II.-Machtuebernahme/Weltpolitik-Programm → Tanger-Krise 1905 → Panthersprung/Agadir-Krise 1911 → Folge: wachsende Rivalitaet). Vier bis fuenf Elemente in eindeutiger Reihenfolge aus dem Material ableitbar. Bloom L3: Ursache-Wirkung-Ordnung. Testet, ob SuS die beiden Marokkokrisen als Eskalationsstufen einordnen koennen — kein reines Datums-Recall, sondern Prozess-Verstaendnis. |
| 4 | quellenkritik | mat-4-3 (Trothas Vernichtungsbefehl) ist Primaerquelle mit erkennbarer Taeter-Perspektive (P1) und klarer Intention (Vernichtung). W-Fragen-Analyse (Wer — Trotha als Generalleutnant / Wann — 2. Oktober 1904 / Wo — Deutsch-Suedwestafrika / An wen — Herero / Warum — Niederschlagung / Mit welcher Absicht — Vernichtung unter dem Deckwort „Schutzgebiet") erschliesst systematisch den Widerspruch zwischen amtlicher Terminologie und realer Gewalt. Perspektivitaets-Reflexion (Impuls 2: „Wie haetten Herero-Frauen und -Kinder ihre Lage beschrieben?") ergaenzt Gegen-Perspektive P3. Bloom L4-L5: Analyse + Bewertung der Glaubwuerdigkeit/Intention. AU-3 §STR-08 erfuellt: Primaerquelle mit erkennbarer Perspektive + didaktisches Ziel der Mappe beinhaltet Quellen-Reflexion + Bloom-Ziel L3-L5. Max 1 Quellenkritik pro Mappe — mat-4-3 ist didaktisch ertragreichste Wahl (Voelkermord-Kontext + amtliche Quelle). **FINDING-1-Scaffolding (PFLICHT in 2.2b):** Tipp Stufe 1 enthaelt Glossar fuer Archaismen („wiederkehrende" → „die zurueckkehren", „erschossen werden" → „werden getoetet") + Paraphrase-Impuls („Schreibe Trothas Befehl in eigenen Worten") VOR der Kernfrage. |
| 5 | vergleich | mat-4-4 (Foto „Gefangene Herero") und mat-4-5 (Tagebuch Kavezeri) sind zwei Material-Objekte derselben Kategorienebene (Zeugnisse zur kolonialen Gewalt in Deutsch-Suedwestafrika) mit mindestens drei trennscharfen Dimensionen: (D1) Medium (Foto vs. Tagebuch), (D2) Urheber-Perspektive (Taeter-Fotograf / P1 vs. Opfer-Erzaehler / P3), (D3) Zeitpunkt relativ zum Aufstand (nach Niederschlagung 1904/05 vs. vor Aufstand 1903), (D4) sichtbare Realitaet (Niederlage und Gewahrsam vs. Landraub und Alltagsangst). Bloom L4: Analyse entlang Dimensionen. AFB II-III gemaess DIDAKTIK_RAHMEN. Der Vergleich vertieft k4-3 systematisch, indem er die doppelte Zeugnisstruktur (aussen/innen, spaeter/frueher) sichtbar macht — notwendig fuer Pos 6 als Beurteilungsgrundlage. |
| 6 | freitext-code | Konvention: letzte Position = freitext-code, AFB III. Operationalisiert die Stundenfrage „Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa?" als Synthese-Beurteilung. mat-4-5 (Tagebuch) dient als zentrale Erzaehl-Verdichtung (Opfer-Perspektive), mat-4-2/mat-4-3/mat-4-4 als Rueckbezugsmaterialien fuer die beiden Folgen-Straenge (Europa: Rivalitaet der Grossmaechte — k4-4; Afrika: Landraub, Gewalt, Voelkermord — k4-3). Erwartete Antwort enthaelt objektivierbare Inhaltselemente: Landraub + Zwangsarbeit + Aufstandsniederschlagung als Afrika-Folge; Marokkokrisen + Misstrauen + Rivalitaet als Europa-Folge. Bloom L5-L6: Synthese ueber mehrere Materialien + Stellungnahme. |

**Quellenkritik-Entscheidung:** mat-4-3 eingesetzt (s.o.). mat-4-1 (Karikatur) und mat-4-4 (Foto) haetten ebenfalls Quellenkritik-Potenzial, aber max 1 Quellenkritik pro Mappe (Monotonie-Vermeidung). mat-4-1 wird ueber mc (Sinnverstaendnis) erschlossen — die Perspektivitaet der Karikatur ist implizit im Distraktor-Design verankert. mat-4-4 wird im Vergleich (Pos 5) quellenkritisch mitbedacht (Dimension D2: Taeter-Perspektive des Fotografen) — kein eigener Quellenkritik-Slot noetig.

**Vergleich-Entscheidung:** Pos 5 als vergleich (L4). Alternativen geprueft und verworfen:
- zuordnung (L2-L3): unterschreitet Bloom-Ziel der Mappe (AFB II-III).
- freitext fuer Foto-Analyse: kein strukturierter Dimensionen-Rahmen, schwaechere Diagnostik.

**Begruendung-Entscheidung:** nicht eingesetzt. Stundenfrage „Welche Folgen?" ist Analyse/Synthese-Frage, keine Streitfrage mit zwei gleich vertretbaren Positionen. freitext-code (Pos 6) als Stellungnahme-Variante (L5 ohne CER-Pflicht) ist didaktisch praeziser. Die Transfer-Frage des Hefteintrags („Warum hoerten die Grossmaechte nicht auf?") liesse CER zu, ist aber nicht Aufgaben-Gegenstand — sie bleibt als offener Impuls im Tafelbild/Sicherung erhalten.

---

## Validierungs-Checks

### Typvielfalt
6 verschiedene Typen: lueckentext, multiple-choice, reihenfolge, quellenkritik, vergleich, freitext-code. Min. 3 ✓ | kein Typ > 3x ✓ | keine Wiederholung → keine Begruendung noetig.

### TB-Knoten-Abdeckung
| Knoten | Aufgabe(n) |
|--------|-----------|
| k4-1 (Weltpolitik Wilhelms II.) | Pos 1, Pos 2 ✓ |
| k4-2 (Marokkokrisen 1905/1911) | Pos 1, Pos 3 ✓ |
| k4-3 (Koloniale Ausbeutung und Gewalt) | Pos 4, Pos 5, Pos 6 ✓ |
| k4-4 (Rivalitaet der Grossmaechte) | Pos 6 ✓ |

**Abdeckung:** 4/4 Knoten ✓

### Material-Aktivierung (A18)
| Material | Aufgabe (Primaerquelle) |
|----------|------------------------|
| mat-4-1 (Karikatur) | Pos 2 ✓ |
| mat-4-2 (Darstellungstext) | Pos 1, Pos 3 ✓ |
| mat-4-3 (Vernichtungsbefehl) | Pos 4 ✓ |
| mat-4-4 (Foto) | Pos 5 ✓ |
| mat-4-5 (Tagebuch) | Pos 5, Pos 6 ✓ |

**Aktivierung:** 5/5 Materialien ✓ — keine Bildquelle/Primaerquelle nur im Tipp.

### SCPL-Zonen-Abdeckung (A17)
| Zone | Aufgabe(n) |
|------|-----------|
| S (Situation) | Pos 1 (Einstieg ueber Fachbegriffe, impliziter Kontext Kaiser-Wechsel) ✓ |
| C1 (Weltpolitik) | Pos 1, Pos 2 ✓ |
| C2 (Marokkokrisen) | Pos 1, Pos 3 ✓ |
| C3 (Koloniale Gewalt) | Pos 4, Pos 5 ✓ |
| P (Problem) | Pos 6 ✓ |
| L (Loesung) | Pos 6 ✓ |

**Abdeckung:** 6/6 Zonen ✓

### AFB-Progression (A5)
Pos 1 (I) → Pos 2 (II) → Pos 3 (II) → Pos 4 (II-III) → Pos 5 (II-III) → Pos 6 (III) — monoton steigend ✓

### Sachbezogen → Wertbezogen (A12)
Pos 1-3 (S/C1-C2, sachbezogen: Fachbegriffe, Karikatur-Sinn, Marokkokrisen-Chronologie) → Pos 4-5 (C3, analytisch-quellenkritisch: Vernichtungsbefehl, Foto/Tagebuch-Vergleich) → Pos 6 (P/L, wertbezogen: Beurteilung der Folgen) ✓

### Bloom-Policy A19
max 40 % L1-L2 = 40 % → 17 % ✓ | min 30 % L3-L4 = 30 % → 50 % ✓ | min 20 % L5-L6 = 20 % → 33 % ✓

### Perspektiven-Abdeckung (konflikttyp=true)
| Perspektive | Aufgabe(n) |
|-------------|-----------|
| P1 (Deutsche Reichsfuehrung: Wilhelm II., Trotha) | Pos 1 (Weltpolitik), Pos 2 (Karikatur), Pos 4 (Trotha-Befehl) |
| P2 (Frankreich als Gegenspieler) | Pos 3 (Marokkokrisen — implizit via mat-4-2) |
| P3 (Kolonisierte Bevoelkerung — Herero) | Pos 4 (quellenkritischer Impuls 2), Pos 5 (Foto+Tagebuch), Pos 6 (Synthese aus Opfer-Sicht) |

Alle drei Perspektiven in Aufgabensequenz diagnostisch abgedeckt ✓

---

## Konstruktionskontexte

### Konstruktionskontext 1 — Lueckentext (Pos 1/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 1 von 6 |
| AFB-Stufe | I |
| Ziel-Material | mat-4-2 (Darstellungstext: „Weltpolitik und Marokkokrisen — Deutschland provoziert Europa") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-4-1 (M1): Karikatur „Der Lotse geht von Bord", Bismarcks Entlassung und Kurswechsel Wilhelms II. mat-4-3 (M3): Trothas Vernichtungsbefehl 2. Oktober 1904, Kerndokument zur Voelkermord-Phase. mat-4-4 (M4): Foto gefangener Herero nach Niederschlagung des Aufstands. mat-4-5 (M5): Tagebuch eines Herero-Hirten (Kavezeri, Okahandja 1903) zu Landraub und Zwangsarbeit. |
| Material-Position in Sequenz | 2 von 5 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k4-1 (Weltpolitik — Merksatz: „Deutschland wollte Weltmacht werden und forderte ueberall Kolonien"), k4-2 (Marokkokrisen 1905/1911) |
| Operationalisierungsziel | Ergaenze die fehlenden Fachbegriffe. (Herleitung: AFB-I-Operator „ergaenze" + k4-1-Merksatz + k4-2 + mat-4-2 liefert Fachbegriffe Weltpolitik, Marokkokrisen, Rivalen, Grossmaechte inline definiert.) |
| Erarbeitbarkeits-Check | lueckentext auf mat-4-2 — PASS. Material definiert Weltpolitik und Marokkokrisen inline, benennt Akteure (Wilhelm II., Frankreich) und Folge (Rivalitaet). Min. vier sinntragende Luecken aus Material ableitbar. Luecken kontextgesteuert, nicht beliebig austauschbar. |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k4-3, k4-4 |

---

### Konstruktionskontext 2 — Multiple Choice (Pos 2/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 6 |
| AFB-Stufe | II |
| Ziel-Material | mat-4-1 (Bildquelle: Karikatur „Der Lotse geht von Bord", Punch 1890) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M1 |
| Material-Zusammenfassungen | mat-4-2 (M2): Darstellungstext Weltpolitik und Marokkokrisen, Deutschland provoziert Europa. mat-4-3 (M3): Trothas Vernichtungsbefehl. mat-4-4 (M4): Foto gefangener Herero. mat-4-5 (M5): Tagebuch Herero-Hirte Kavezeri. |
| Material-Position in Sequenz | 1 von 5 (didaktische Funktion: einstieg) |
| TB-Knoten | k4-1 (Weltpolitik — Merksatz: „Deutschland wollte Weltmacht werden und forderte ueberall Kolonien") |
| Operationalisierungsziel | Was zeigt die Karikatur ueber Deutschlands neuen Kurs? (Herleitung: AFB-II-Operator „erklaere/was zeigt" + k4-1-Merksatz + Karikatur als Sinn-Quelle mit interpretationsbeduerftigen Bildelementen.) |
| Erarbeitbarkeits-Check | multiple-choice auf mat-4-1 — PASS. Karikatur zeigt Bismarck als Lotsen, der das Schiff verlaesst, waehrend Wilhelm II. zuschaut — eindeutige Metapher fuer Machtwechsel und Kurswechsel zu Weltpolitik. Richtige Antwort aus Bildinhalt + Bildunterschrift + k4-1-Kontext eindeutig begruendbar. Distraktoren plausibel (Flottenaufbau, Seekriegsgefahr, britische Dominanz — alles themenverwandt, aber nicht die Karikaturen-Kernaussage). |
| Bereits getestete Inhalte | Pos 1 (Lueckentext, AFB I): Fachbegriffe k4-1, k4-2 |
| Noch nicht getestete TB-Knoten | k4-3, k4-4 |

---

### Konstruktionskontext 3 — Reihenfolge (Pos 3/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 6 |
| AFB-Stufe | II |
| Ziel-Material | mat-4-2 (Darstellungstext: Weltpolitik und Marokkokrisen) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M2 |
| Material-Zusammenfassungen | mat-4-1 (M1): Karikatur Lotse geht von Bord. mat-4-3 (M3): Trothas Vernichtungsbefehl. mat-4-4 (M4): Foto gefangener Herero. mat-4-5 (M5): Tagebuch Herero-Hirte. |
| Material-Position in Sequenz | 2 von 5 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k4-2 (Marokkokrisen 1905/1911) |
| Operationalisierungsziel | Ordne die Schritte der Marokkokrisen in die richtige Reihenfolge. (Herleitung: AFB-II-Operator „ordne" + k4-2 + mat-4-2 enthaelt kausal-chronologische Ereigniskette Weltpolitik-Programm → Tanger-Krise 1905 → Panthersprung 1911 → Rivalitaets-Folge.) |
| Erarbeitbarkeits-Check | reihenfolge auf mat-4-2 — PASS. Material enthaelt vier bis fuenf Elemente in eindeutiger chronologisch-kausaler Sequenz: (1) Wilhelm II. verfolgt Weltpolitik-Programm (Absatz 1), (2) Tanger-Krise 1905 (Wilhelm landet in Tanger, provoziert Frankreich), (3) Panthersprung/Agadir-Krise 1911 (Kanonenboot Panther nach Agadir), (4) Vertrag und Folge: wachsende Rivalitaet Frankreich-Deutschland. Eindeutige Reihenfolge aus Material ableitbar, keine beliebige Umstellbarkeit. |
| Bereits getestete Inhalte | Pos 1 (Lueckentext, AFB I): Fachbegriffe k4-1/k4-2. Pos 2 (MC, AFB II): Karikatur-Sinn k4-1. |
| Noch nicht getestete TB-Knoten | k4-3, k4-4 |

**Abgrenzung zu Pos 1:** Pos 1 testet Fachbegriffs-Recall (Weltpolitik, Marokkokrisen als Wort im Kontext). Pos 3 testet Prozess-Verstaendnis der beiden Krisen (Was passierte wann in welcher Reihenfolge?). Unterschiedlicher kognitiver Zugang — keine Redundanz.

---

### Konstruktionskontext 4 — Quellenkritik (Pos 4/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 4 von 6 |
| AFB-Stufe | II-III (Bloom-Ziel: L4-L5 — Analyse + Bewertung) |
| Ziel-Material | mat-4-3 (Quellentext: Trothas Vernichtungsbefehl 2. Oktober 1904) — Volltext wird in Phase 2.2b gelesen |
| Material-Display-ID | M3 |
| Material-Zusammenfassungen | mat-4-1 (M1): Karikatur Lotse geht von Bord. mat-4-2 (M2): Darstellungstext Weltpolitik und Marokkokrisen. mat-4-4 (M4): Foto gefangener Herero (visueller Bezug zu Trothas Befehl). mat-4-5 (M5): Tagebuch Herero-Hirte (Opferperspektive vor Aufstand). |
| Material-Position in Sequenz | 3 von 5 (didaktische Funktion: erarbeitung) |
| TB-Knoten | k4-3 (Koloniale Ausbeutung und Gewalt — Merksatz: „Kolonialmaechte nahmen Land, erzwangen Arbeit und bestraften Widerstand brutal") |
| Operationalisierungsziel | Wer hat den Vernichtungsbefehl geschrieben — und was wollte er damit erreichen? (Herleitung: AFB-II-III-Operator „untersuche/beurteile" + k4-3-Merksatz + mat-4-3 als Primaerquelle mit erkennbarer Taeter-Perspektive und Intention. W-Fragen-Rahmen: Wer/Wann/Wo/An wen/Warum/Mit welcher Absicht.) |
| Erarbeitbarkeits-Check | quellenkritik auf mat-4-3 — PASS. Primaerquelle mit erkennbarer Perspektive (Trotha = Taeter, P1) und klarer Intention (Vernichtung unter dem Deckwort „Schutzgebiet"). W-Fragen aus Quelle und Einordnung direkt ableitbar: Wer (Generalleutnant von Trotha), Wann (2. Oktober 1904), Wo (Deutsch-Suedwestafrika), An wen (Herero), Warum (Niederschlagung des Aufstands), Mit welcher Absicht (Vernichtung, nicht Schutz — Widerspruch zwischen amtlicher Terminologie und realer Gewalt). Perspektivitaets-Reflexion via Impuls 2 (mat-4-3 `_meta.quellenkritische_impulse[1]`: „Wie haetten Herero-Frauen und -Kinder ihre Lage 1904 wohl selbst beschrieben?") foerdert Gegen-Perspektive P3. |
| FINDING-1-Scaffolding (PFLICHT in 2.2b) | Trotha-Zitat enthaelt Archaismen und historische Terminologie, die fuer R7 nicht selbsterklaerend sind („wiederkehrende", „erschossen werden", „Schutzgebiet" als Deckwort). Tipp Stufe 1 MUSS ein Glossar enthalten: „wiederkehrende" = „die zurueckkehren", „erschossen werden" = „werden getoetet", „Schutzgebiet" = „amtliche Bezeichnung fuer die deutsche Kolonie, die in Wahrheit keinen Schutz fuer die Herero bedeutete". Zusaetzlich Paraphrase-Impuls VOR der W-Fragen-Kernfrage: „Schreibe den Befehl in eigenen Worten, bevor du die W-Fragen beantwortest." Ziel: Sprach-Verstaendnis-Huerde abbauen, bevor die quellenkritische Analyse beginnt. |
| Trigger-Flag-Hinweis | mat-4-3 fuehrt `trigger_flags: [gewalt, tod]`. SUB_AUFGABE_QUELLENKRITIK muss die Fragestellung sachlich halten (kein „Stell dir vor, du waerst ein Herero-Kind"), SuS-Formulierungen nicht sensationalisieren. Ueberwaetigungsverbot (DIDAKTIK_RAHMEN §Ethische Hinweise) streng einhalten. |
| Bereits getestete Inhalte | Pos 1 (Lueckentext, AFB I): Fachbegriffe k4-1/k4-2. Pos 2 (MC, AFB II): Karikatur-Sinn k4-1. Pos 3 (Reihenfolge, AFB II): Marokkokrisen-Chronologie k4-2. |
| Noch nicht getestete TB-Knoten | k4-4 |

---

### Konstruktionskontext 5 — Vergleich (Pos 5/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 5 von 6 |
| AFB-Stufe | II-III (Bloom-Ziel: L4 — Analyse entlang Dimensionen) |
| Ziel-Material | mat-4-4 (Bildquelle: Foto „Gefangene Herero nach der Niederschlagung") + mat-4-5 (Tagebuch: „Mein Land wird fremd — ein Herero-Hirte vor dem Aufstand") — Volltext wird in Phase 2.2b gelesen |
| Material-Display-IDs | M4 (Foto), M5 (Tagebuch) |
| Material-Zusammenfassungen | mat-4-1 (M1): Karikatur Lotse geht von Bord. mat-4-2 (M2): Darstellungstext Weltpolitik/Marokkokrisen. mat-4-3 (M3): Trothas Vernichtungsbefehl (Taeter-Primaerquelle, Kontext fuer Foto). |
| Material-Positionen in Sequenz | 4 und 5 von 5 (didaktische Funktion: vertiefung + sicherung) |
| TB-Knoten | k4-3 (Koloniale Ausbeutung und Gewalt) |
| Operationalisierungsziel | Vergleiche, was das Foto und das Tagebuch ueber die Lage der Herero zeigen. (Herleitung: AFB-II-III-Operator „vergleiche" + k4-3 + zwei Objekte derselben Kategorienebene (Zeugnisse zur kolonialen Gewalt) + min. drei trennscharfe Dimensionen.) |
| Vergleichs-Dimensionen (Vorschlag) | D1: Medium (Foto = visuelles Dokument, einmaliger Moment / Tagebuch = geschriebene Erzaehlung ueber Wochen). D2: Urheber-Perspektive (Foto: deutscher Fotograf = Taeter-Blick P1 / Tagebuch: Herero-Hirte Kavezeri = Opfer-Perspektive P3). D3: Zeitpunkt (Foto: nach Niederschlagung 1904/05 / Tagebuch: vor Aufstand 1903). D4: Sichtbare Realitaet (Foto: Niederlage + Gewahrsam / Tagebuch: Landraub + Zwangsarbeit + Ahnung des Widerstands). |
| Erarbeitbarkeits-Check | vergleich auf mat-4-4 + mat-4-5 — PASS. Zwei Objekte derselben Kategorienebene (Zeugnisse zur kolonialen Gewalt in Deutsch-Suedwestafrika). Min. drei, eher vier trennscharfe Dimensionen ableitbar (s.o.). Bloom-Ziel L4 durch DIDAKTIK_RAHMEN (AFB II-III + Perspektivwechsel als Mappen-Kernkompetenz) gefordert. Kein Pseudo-Vergleich: Dimensionen sind aus Material-Inhalt rekonstruierbar, nicht frei gesetzt. |
| Trigger-Flag-Hinweis | mat-4-4 (`gewalt`) und mat-4-5 (`diskriminierung`, `gewalt`). SUB_AUFGABE_VERGLEICH: Fragestellung sachlich, Vergleichs-Raster strukturiert, keine Gefuehls-Heuristik („Welches Material bewegt dich mehr?" → VERBOTEN). Ueberwaeltigungsverbot einhalten. |
| Bereits getestete Inhalte | Pos 1-3: k4-1, k4-2 abgedeckt. Pos 4 (Quellenkritik, AFB II-III): Trothas Taeter-Befehl (k4-3 aus Taeter-Perspektive P1 + Gegen-Perspektiv-Impuls P3). |
| Noch nicht getestete TB-Knoten | k4-4 |

**Abgrenzung zu Pos 4:** Pos 4 testet quellenkritische Analyse einer einzelnen Primaerquelle (Trothas Befehl — Taeter-Sicht auf k4-3). Pos 5 testet vergleichende Analyse zweier Zeugnisse (Foto + Tagebuch — Taeter-vs-Opfer-Perspektive auf k4-3). Unterschiedlicher kognitiver Zugang: Quellenkritik (W-Fragen, Intention) vs. Vergleich (Dimensionen-Analyse). Keine Redundanz — gemeinsames TB-Knoten-Ziel k4-3 ist didaktisch intendiert (doppelte diagnostische Absicherung der Mappen-Kern-Erkenntnis).

---

### Konstruktionskontext 6 — Freitext (Pos 6/6)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 6 von 6 |
| AFB-Stufe | III |
| Ziel-Material | mat-4-5 (Tagebuch: „Mein Land wird fremd") — primary. Rueckbezug-Materialien: mat-4-2 (Rivalitaet-Folge / Europa-Seite), mat-4-3 (Vernichtungsbefehl), mat-4-4 (Foto). Volltext wird in Phase 2.2b gelesen. |
| Material-Display-ID | M5 (primary) — Rueckbezug-Verweise auf M2, M3, M4 in Fragestamm/Tipps |
| Material-Zusammenfassungen | mat-4-1 (M1): Karikatur Lotse geht von Bord. mat-4-2 (M2): Darstellungstext Weltpolitik/Marokkokrisen. mat-4-3 (M3): Trothas Vernichtungsbefehl. mat-4-4 (M4): Foto gefangener Herero. |
| Material-Position in Sequenz | 5 von 5 (didaktische Funktion: sicherung) |
| TB-Knoten | k4-3 (Koloniale Gewalt — Afrika-Folge), k4-4 (Rivalitaet — Europa-Folge, Merksatz: „Kolonialstreit machte aus Partnern Rivalen") |
| Operationalisierungsziel | Beurteile die Folgen des Wettlaufs — fuer die Kolonisierten und fuer Europa. (Herleitung: AFB-III-Operator „beurteile" + k4-3 + k4-4 + Stundenfrage des Hefteintrags „Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa?" + mat-4-5 als Opfer-Perspektive als Hauptanker + Rueckbezug auf mat-4-2/mat-4-3/mat-4-4 fuer die beiden Folgen-Straenge.) |
| Erarbeitbarkeits-Check | freitext-code auf mat-4-5 + Rueckbezug — PASS. Erwartete Antwort enthaelt objektivierbare Inhaltselemente: Afrika-Folge aus mat-4-5 (Landraub, Zwangsarbeit) + mat-4-3 (Vernichtungsbefehl, Voelkermord) + mat-4-4 (Niederlage der Herero); Europa-Folge aus mat-4-2 (Marokkokrisen als Symptom, Rivalitaet der Grossmaechte, wachsendes Misstrauen). Stellungnahme-Variante (L5-L6 ohne CER-Pflicht). Keyword-Loesung objektivierbar (z.B. „Landraub Gewalt Rivalitaet" oder „Voelkermord Marokkokrisen Misstrauen" — 3-5 Woerter, siehe data.json-Schema freitext-code-Format). |
| Trigger-Flag-Hinweis | Rueckbezug auf mat-4-3/-4/-5 (trigger_flags gewalt, tod, diskriminierung). Fragestellung sachlich, Beurteilungs-Rahmen strukturiert — kein emotionalisierender Stellungnahme-Impuls („Was findest du schlimmer — die Gewalt in Afrika oder den Krieg in Europa?"). Formulierung zielt auf analytische Synthese. |
| Bereits getestete Inhalte | Pos 1-5: k4-1, k4-2, k4-3 abgedeckt. Keine Vorfestlegung auf Europa-Seite (k4-4) — Pos 6 aktiviert sie als Transfer. |
| Noch nicht getestete TB-Knoten | — (alle abgedeckt nach Pos 6) |

**Ueberleitungs-Hinweis:** Die Stundenfrage des Hefteintrags ist in ueberleitungen.json via UE-5 (Pos 5→Loesungswort/Sicherung) bzw. UE-R1 (Rahmen-Abschluss nach Mappe 4) verankert. Pos 6 operationalisiert den Schluss-Bogen der gesamten Sequenz: vom Nationalismus (Mappe 1) ueber Reichsgruendung (Mappe 2) und Imperialismus (Mappe 3) zum Wettlauf (Mappe 4) und seinen beiden Folgen. In 2.2b: SUB_AUFGABE_FREITEXT muss das im Fragestamm-Kontext nicht explizit benennen (Kurzregel 3c), aber im Tipp Stufe 1 als Orientierungs-Hilfe verfuegbar halten.

---

## Dispatch-Anweisungen (Phase 2.2b)

Fuer jeden Konstruktionskontext 1-6:

1. `PROGRESSIONSPLAN.md` lesen — NUR den jeweiligen Konstruktionskontext
2. Ziel-Material(ien) lesen — Volltext aus `materialien/mat-4-*.json`
3. `MATERIAL_GERUEST_*_Mappe4.md` lesen — NUR titel + didaktische_funktion der anderen mat-IDs
4. Passenden `SUB_AUFGABE_[TYP].md` lesen
5. Aufgabe produzieren → `aufgaben/aufgabe-4-[pos].json` (ueberschreibt existierende Pre-GERUEST-Drafts)
6. Q-Gate durchlaufen (A1-A3, A4-*, A6-A7, A11-FT)

**Dispatch-Reihenfolge:** Pos 1 → Pos 2 → Pos 3 → Pos 4 → Pos 5 → Pos 6 (sequentiell, P4 Dispatch-Isolation)

**Pre-GERUEST-Hinweis:** Im Aufgaben-Verzeichnis existieren bereits fuenf Draft-Dateien (aufgabe-4-1…4-5.json) aus Pre-GERUEST-Session. Diese werden in 2.2b vollstaendig ueberschrieben — keine Uebernahme von Fragestamm/Distraktoren/Tipps. Die Progressionstabelle dieses Plans ist SSoT; existierende Drafts haben KEINEN Vorrang. Pos 6 ist neu (existierte nicht in Pre-GERUEST-State, da dort nur 5 Aufgaben).

---

## Freischalt-Code

| Feld | Wert |
|------|------|
| freischalt_code | AFRIKA |
| Laenge | 6 Buchstaben |
| Thematischer Bezug | Kontinent, der im „Wettlauf" aufgeteilt, kolonisiert und zum Schauplatz der Kern-Erkenntnisse dieser Mappe (Landraub, Voelkermord) wird. Verdichtet die Mappen-Perspektive in einem Wort. |
| Validierung | A-Z ✓, keine Sonderzeichen ✓, 4-8 Zeichen ✓, thematisch passend ✓ |
| Konsistenz | Bereits in meta.json fixiert (Phase 2.0) ✓ — Aufgabenzahl 6 an Buchstabenzahl gekoppelt |
