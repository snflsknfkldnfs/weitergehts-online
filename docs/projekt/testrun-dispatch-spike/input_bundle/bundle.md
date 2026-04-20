# F0d Dispatch-Spike v2.0 — Input-Bundle (identisch fuer Arm A + Arm B)

**Kennung:** `F0d-INPUT-BUNDLE-v2.0`
**Fall:** `deutscher-nationalismus-kolonialismus / Mappe 4 / mat-4-3` (Vernichtungsbefehl — was "Schutzgebiet" wirklich bedeutete)
**Erstellt:** 2026-04-20 (P0-Block gem. F0d_DISPATCH_SPIKE_PLAN §4.1 + §8 P0)
**Persistierung:** read-only fuer 6 Runs (A_1..3, B_1..3). Hash in `bundle_hash.txt`.
**Fehler-Injektions-Variante:** `bundle_injected.md` (mono-perspektivischer `perspektiven_policy`-String) — fuer M3 Fail-Detection.

---

## 0. Lese-Orientierung fuer den Material-Subagenten

Dieses Bundle enthaelt die 11 Input-Artefakte (§4.1 des F0d-Plans) in Reihenfolge der 8-Step-Read-Protokoll-Schritte aus `VERTRAG_PHASE_2-1_MATERIAL`:

| # | Bundle-Abschnitt | Read-Step | Quelle (produktiv) |
|---|---|---|---|
| 1 | MATERIAL_GERUEST-Row mat-4-3 | 1 | Synthese aus `mat-4-3.json` + SKRIPT §4/§5 |
| 2 | SEQUENZKONTEXT | 2 | abgeleitet aus mat-4-2 + mat-4-4 |
| 3 | hefteintrag.json-Slice | 3 | `mappe-4/rahmen/hefteintrag.json` |
| 4 | SUB_MATERIAL_QUELLENTEXT.md | n/a (Systemprompt) | `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` |
| 5 | F0B_PRIMING_INCLUDE §1+§2+§3 | n/a (Priming-Include) | `escape-game-generator/agents/_includes/F0B_PRIMING_INCLUDE.md` |
| 6 | SKRIPT-Chunk Mappe 4 §4+§5 | 5 | `SKRIPT_deutscher-nationalismus-kolonialismus.md` |
| 7 | INHALTSBASIS Zitate/Akteure/Fachbegriffe | 6 | `INHALTSBASIS_deutscher-nationalismus-kolonialismus.md` |
| 8 | einstieg.json-Slice (Problemstellung) | 4 | `mappe-4/rahmen/einstieg.json` |
| 9 | ARTEFAKT_INVENTAR pq-4-1 | 7 | INHALTSBASIS §Primaerquellen |
| 10 | DIDAKTIK_RAHMEN-Ausschnitt (Jgst/R7/Trigger/Ethik) | ergaenzend | `DIDAKTIK_RAHMEN_deutscher-nationalismus-kolonialismus.md` |
| 11 | perspektiven_policy-String (STR-05) | Context-Parameter | aus MATERIAL_GERUEST (konflikttyp=true) |

Read-Step 8 (KERNERKENNTNISSE) entfaellt: `didaktische_funktion=erarbeitung`.

Trigger-Kategorien aktiv: `Kolonisierung`, `Gewalt`, `Macht-Asymmetrie`, `Unterdrueckung` → MATERIAL-PERSPEKTIV-01 (M4) + TERMINOLOGIE-01 (M6) Pflicht.

---

## 1. MATERIAL_GERUEST-Row mat-4-3 (synthetisiert)

```yaml
id: mat-4-3
game_id: deutscher-nationalismus-kolonialismus
mappe: 4
position: 3
typ: quellentext
titel: "Vernichtungsbefehl — was 'Schutzgebiet' wirklich bedeutete"
didaktische_funktion: erarbeitung
voraussetzung: [mat-4-2]
skript_chunk: "Chunk 4, §4 + §5"
tafelbild_knoten_abgedeckt: [k4-3]
artefakt_ref: [pq-4-1]
trigger_categories: [Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung]
konflikttyp: true
ueberleitung_von_kontext: "Der Wettlauf um Kolonien verschaerfte die Rivalitaet zwischen den Grossmaechten. Doch was bedeutete er fuer die Menschen in den Kolonien?"
```

---

## 2. SEQUENZKONTEXT (Mappe 4, abgeleitet)

```yaml
vorher:
  id: mat-4-2
  typ: darstellungstext
  titel: "Weltpolitik und Marokkokrisen — Deutschland provoziert Europa"
  kerninhalt: "Weltpolitik Wilhelms II., Tanger-Krise 1905, Panthersprung 1911, wachsende Rivalitaet"
  tafelbild_knoten_abgedeckt: [k4-1, k4-2, k4-4]

nachher:
  id: mat-4-4
  typ: bildquelle
  titel: "Gefangene Herero nach der Niederschlagung des Aufstands"
  kerninhalt: "Historisches Foto aus Deutsch-Suedwestafrika 1904 — visualisiert koloniale Gewalt (k4-3)"
  tafelbild_knoten_abgedeckt: [k4-3]

VORAUSGESETZTES_WISSEN:
  knoten_eingefuehrt: [k4-1 Weltpolitik, k4-2 Marokkokrisen, k4-4 Rivalitaet der Grossmaechte]
  mappen_vorher: [mappe-3 Wettlauf um Afrika, Berliner Konferenz 1884/85]

NOCH_NICHT_EINGEFUEHRT:
  - k4-3 (koloniale Ausbeutung und Gewalt) — **Ziel-Knoten dieses Materials**
  - nachfolgende Materialien mat-4-4 (Bild), mat-4-5 (Tagebuch Herero-Hirte)
```

---

## 3. hefteintrag.json-Slice (k4-3-relevant)

Stundenfrage Mappe 4: **"Welche Folgen hatte der Wettlauf um Kolonien?"**

SCPL-Zone fuer `didaktische_funktion=erarbeitung` → **COMPLICATION** (Schritt 3 — Kolonialgewalt in den Kolonien).

Relevanter complication-Schritt fuer dieses Material:

```json
{
  "schritt": "In den Kolonien bedeutete der Wettlauf Landraub und Unterdrueckung — Widerstand wurde brutal niedergeschlagen.",
  "typ": "kausal",
  "fachbegriff": "",
  "erarbeitbarkeit": "DIRECT"
}
```

Ziel-Knoten:

```json
{
  "id": "k4-3",
  "text": "Koloniale Ausbeutung und Gewalt",
  "typ": "wirkung",
  "merksatz": "Kolonialmaechte nahmen Land, erzwangen Arbeit und bestraften Widerstand brutal"
}
```

Voraussetzungen (bereits eingefuehrt): `k3-6` (Wettlauf um Afrika, Berliner Konferenz).

---

## 4. SUB_MATERIAL_QUELLENTEXT.md (Systemprompt — vollstaendig einbinden)

**Einbindungs-Anweisung (Arm B):** Der Inhalt der Datei `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` wird **wortgleich** als Systemprompt des Generator-Agents verwendet. Der Assembly-Validator prueft Hash-Identitaet (vgl. V16).

**Kernpunkte (Referenz, nicht Ersatz):**
- Dreischritt-Aufbereitung **A** (Einleitung, R7-konform) / **B** (Wortlaut — `aufbereitung` aus ENUM `echt|rekonstruiert|uebersetzt|vereinfacht|gemischt`) / **C** (quellenkritische Impulse).
- Bei konflikttyp=true: Multiperspektivitaets-Policy STR-05 (P1/P2/P3).
- `_meta` strikt: `wortanzahl`, `quellentyp` ENUM, `aufbereitung` ENUM, `artefakt_ref`, `tafelbild_knoten_abgedeckt`, `perspektive`, `trigger_flags` — alles Pflicht. Bei `aufbereitung != "echt"` zusaetzlich `rekonstruktions_begruendung` Pflicht (MQ2).
- MQ2 Rekonstruktions-Vorrangregel: pq-4-1 echte Primaerquelle → gekuerzter Original-Wortlaut = `aufbereitung: "gemischt"`, Begruendung erforderlich.
- Q1-Q10 Self-Check des Sub-Agents, Ambiguitaets-Sperre im Titel.

---

## 5. F0B_PRIMING_INCLUDE §1 + §2 + §3 (wortgleich zwischen [F0B_PRIMING_v1 BEGIN] und [F0B_PRIMING_v1 END])

```
[F0B_PRIMING_v1 BEGIN — aus agents/_includes/F0B_PRIMING_INCLUDE.md]

## 1. SPRACHNIVEAU-R7 — Priming-Kernblock (M8')

Geltung: Alle SuS-sichtbaren Textausgaben dieses Sub-Agents (HTML-Inhalt, Aufgabenstellung, Dialog, Hefteintrag-Text, Synthese-Absatz).

SSoT: `architektur/vertraege/VERTRAG_SPRACHNIVEAU_R7.md`.

Harte Grenzen (Runtime-Gate QG-08 Teil a):
- Durchschnittliche Satzlaenge <= 15 Woerter.
- Max. Satzlaenge <= 25 Woerter (kein einzelner Satz ueber Schwelle).
- Fachwort-Dichte <= 12 % (Fachbegriffe / Gesamtwoerter).
- Kompositum-Morpheme <= 4 (keine laengeren Komposita ohne Aufloesung).
- Nominalstil-Quote <= 20 % (Verben statt Nominalphrasen bevorzugen).
- Konjunktiv-Dichte <= 5 % (Indikativ bevorzugen, Konjunktiv nur wo epistemisch notwendig).

Formungs-Direktiven:
- Satzbau: Hauptsatz-dominant, aktiv, max. 1 Relativsatz pro Satz.
- Wortwahl: konkret vor abstrakt; Fachwort bei Erstverwendung kurz erklaeren (max. 12 Woerter).
- Komposita aufloesen, wenn > 4 Morpheme.
- Pronominalisierung: klare Bezuege; kein "es", "dieser", "jener" ohne eindeutigen Antezedens im gleichen Satz.
- Operatoren aus LP-QM §6.X.4 OH verwenden (beschreiben / erklaeren / begruenden / vergleichen / beurteilen / einordnen).

DaZ-Regeln:
- Keine Umgangssprache, keine Jugendsprache, keine regionale Einfaerbung.
- Tempus-Konsistenz pro Abschnitt (historische Darstellung = Praeteritum; Reflexions-/Transferfragen = Praesens).
- Genitiv sparsam; bei komplexen Besitzverhaeltnissen Praepositional-Ersatz.
- Konjunktiv sparsam; wo noetig eindeutig markieren.
- Scaffold-Saetze: jede neue Informationseinheit beginnt mit Subjekt-Verb-Kopf; keine Vorfeld-Verschachtelung ueber 2 Glieder.

Primaerquellen-Ausnahme: Historische Zitate werden wortgetreu wiedergegeben (Quellentreue > Metrik). Der Sub-Agent fuegt unmittelbar davor/danach einen R7-konformen Kontextualisierungs-Satz ein.

## 2. MATERIAL-PERSPEKTIV-01 (M4) — Multiperspektiv-Verteilung

Geltung: Nur wenn `context.trigger_categories` mind. eine der Kategorien enthaelt: `Konflikt`, `Macht-Asymmetrie`, `Unterdrueckung`, `Gewalt`, `Kolonisierung`, `Revolution`.

Invariante: Ueber alle Materialien einer Mappe hinweg muessen mindestens zwei nicht-dominante Perspektiv-Tags erreicht werden.
- Dominant-Pool (zaehlen nicht): `dominant`, `Macht-Ausuebung`, `Aussen`.
- Nicht-Dominant-Pool (zaehlen): `nicht-dominant`, `Opfer`, `Widerstand`, `Alltag`, `Kritik`, `Macht-Betroffen`, `Innen`.

Pflichtfeld im Material-Output: `perspektiv_tags[]` (Array, min. 1 Eintrag, Enum-Constraint, Schema-Validation QG-09).

Verteilungs-Strategie: Der Material-Sub-Agent plant bei der ersten Dispatch-Vorbereitung einer Mappe die Perspektiv-Verteilung so, dass die Coverage ueber die geplante Material-Sequenz erreichbar ist.

## 3. TERMINOLOGIE-01 (M6) — Kolonialterminologie-Screen

Geltung: Nur wenn `context.trigger_categories` die Kategorie `Kolonisierung` enthaelt.

Verbotene Muster (ausserhalb von Primaerquellen):
- "Entdecker" synonym fuer "Eroberer".
- "Eingeborene" statt "Einwohner:innen" / "indigene Bevoelkerung".
- "Kolonialherren" als neutrale Benennung.
- "friedliche Kolonisierung" / "Zivilisierungsmission" affirmativ.
- "Schutzgebiet" ohne Anfuehrungszeichen oder Kontextualisierung.
- Pauschale Passiv-Formulierungen, die Handelnde (Taeter) tilgen ("Afrika wurde aufgeteilt").

Alternativliste (R7-konform): Eroberung / Kolonialreich / Kolonisiertes Gebiet / indigene Bevoelkerung / Unterwerfung / Ausbeutung / "sogenanntes Schutzgebiet" (mit Anfuehrungszeichen).

Primaerquellen-Ausnahme: Wortgetreue Quellenuebernahme ist zulaessig. Pflicht: Sub-Agent fuegt unmittelbar davor/danach einen Kontextualisierungs-Satz ein, der die Begriffe als Quellensprache markiert.

Enforcement-Kette:
1. Priming: dieser Abschnitt im Systemprompt.
2. Post-Gen-Scan: `scripts/terminologie-scanner.sh` in Phase 2.1 + 3.
3. Gate: QG-07 (Blocker bei aktiver Kategorie).

[F0B_PRIMING_v1 END]
```

---

## 6. SKRIPT-Chunk Mappe 4 §4 + §5 (Wortlaut)

**§4** Das Deutsche Reich antwortete mit aeusserster Gewalt. Es schickte etwa 15.000 Soldaten unter dem Befehl von Generalleutnant Lothar von Trotha. Bis August 1904 hatte Trotha den Aufstand militaerisch niedergeworfen. Doch was dann geschah, ging weit ueber eine Kriegshandlung hinaus. Der groesste Teil der Herero floh in das fast wasserlose Omaheke-Sandfeld. Trotha liess die Wasserstellen abriegeln. Tausende Herero — Maenner, Frauen und Kinder — verdursteten mit ihren Rinderherden in der Wueste. [ARTEFAKT: img-4-1 | bildquelle | Bundesarchiv-Foto: Deutsche Kamelreiterkompanie waehrend des Herero-Aufstands]

**§5** In einem Befehl, der heute als "Vernichtungsbefehl" bekannt ist, ordnete Trotha an: "Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf." Er erklaerte ausdruecklich: "Ich glaube, dass die Nation als solche vernichtet werden muss." Wissenschaftler bezeichnen dieses Vorgehen als den ersten Voelkermord — die vorsaetzliche, systematische Zerstoerung einer ethnischen Gruppe — des 20. Jahrhunderts. Von etwa 80.000 Herero ueberlebten nach verschiedenen Schaetzungen nur 15.000 bis 20.000. Auch die Nama, die sich unter Hendrik Witbooi 1904 dem Aufstand anschlossen, verloren etwa die Haelfte ihres Volkes. [ARTEFAKT: zit-4-1 | quellentext | Trotha: "Ich glaube, dass die Nation als solche vernichtet werden muss."] [ARTEFAKT: zit-4-2 | quellentext | Vernichtungsbefehl: "Innerhalb der Deutschen Grenze wird jeder Herero [...] erschossen."] [ARTEFAKT: pq-4-1 | quellentext | Vernichtungsbefehl — Quellenarbeit] [ARTEFAKT: pq-4-2 | quellentext | Trothas Erklaerung — Analyse der voelkermoerderischen Absicht] [ARTEFAKT: rolle-4-2 | tagebuch | Herero-Frau auf der Flucht 1904 — Opferperspektive]

---

## 7. INHALTSBASIS — Zitate / Akteure / Fachbegriffe (relevant fuer mat-4-3)

### 7.1 Fakten F4-4 bis F4-9 (relevant fuer §4 + §5)

| ID | Fakt | Quelle |
|---|---|---|
| F4-4 | Da die "Schutztruppe" der Kolonie dem Aufstand anfangs nicht gewachsen war, entsandte das Deutsche Reich ca. 15.000 Soldaten unter dem Befehl von Generalleutnant Lothar von Trotha nach Deutsch-Suedwestafrika. | Wikipedia DE: Voelkermord an den Herero und Nama |
| F4-5 | Bis August 1904 wurde der Aufstand der Herero militaerisch niedergeworfen. Der groesste Teil der Herero floh in das fast wasserlose Omaheke-Sandfeld. Trotha liess dieses abriegeln und Fluchtlinge von den wenigen Wasserstellen verjagen — Tausende Herero verdursteten mit ihren Familien und Rinderherden. | Wikipedia DE |
| F4-6 | Trothas sogenannter "Vernichtungsbefehl" lautete: "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen." | Wikipedia DE |
| F4-7 | Trotha erklaerte ausdruecklich: "Ich glaube, dass die Nation als solche vernichtet werden muss." Seine Kriegsfuehrung zielte auf die vollstaendige Vernichtung der Herero ab. Sein Vorgehen gilt in der Wissenschaft als erster Voelkermord des 20. Jahrhunderts. | Wikipedia DE |
| F4-8 | In den deutschen Kolonien wurden Konzentrationslager eingerichtet, in denen Gefangene unter unmenschlichen Bedingungen Zwangsarbeit leisten mussten. Tausende starben an Hunger, Krankheit und Erschoepfung. | Wikipedia DE |
| F4-9 | Im Mai 2021 erkannte Deutschland das an den Herero und Nama veruebte Unrecht offiziell als Voelkermord an. Ein Abkommen mit Namibia wurde geschlossen — die Verhandlungen und die Hoehe der Entschaedigung blieben jedoch umstritten. | Wikipedia DE |

### 7.2 Akteure A4-1 bis A4-3

| ID | Akteur | Beschreibung |
|---|---|---|
| A4-1 | Samuel Maharero | (* 1856, + 1923) Anfuehrer der Herero. Fuehrte den Aufstand im Januar 1904. Floh nach der Niederlage ins heutige Botswana, wo er 1923 starb. |
| A4-2 | Lothar von Trotha | (1848-1920) Preussischer General, uebernahm 1904 Oberbefehl in Deutsch-Suedwestafrika. Erliess den Vernichtungsbefehl. Verantwortlich fuer den Voelkermord. |
| A4-3 | Hendrik Witbooi | Einflussreichster Nama-Haeuptling. Zunaechst Verbuendeter der Deutschen, schloss sich 1904 dem Aufstand an, fiel 1905 im Kampf. |

### 7.3 Fachbegriffe

| Begriff | Definition | Mappen-Bezug |
|---|---|---|
| Voelkermord (Genozid) | Die vorsaetzliche, systematische Zerstoerung einer ethnischen, religioesen oder nationalen Gruppe. Der Voelkermord an den Herero und Nama gilt als erster Voelkermord des 20. Jahrhunderts. | Mappe 4: Zentraler historischer Bewertungsbegriff |
| "Schutzgebiet" | Offizielle deutsche Bezeichnung fuer Kolonien — ein zynischer Euphemismus. In Wahrheit Unterwerfung, Landraub und Ausbeutung. | Mappe 4: Kritische Begriffsanalyse (Ethik-Hinweis DIDAKTIK_RAHMEN) |
| Vernichtungsbefehl | Trothas Befehl vom Oktober 1904, der die Erschiessung aller Herero innerhalb der Koloniegrenzen anordnete — Maenner, Frauen und Kinder. | Mappe 4: Eskalation zur systematischen Vernichtung |
| Landraub / Landenteignung | Die systematische Aneignung des Landes der einheimischen Bevoelkerung. | Mappe 4: Ursache des Aufstands |

### 7.4 Zahlen / Daten

- Januar 1904 — Beginn des Herero-Aufstands unter Samuel Maharero
- ca. 15.000 — deutsche Soldaten unter Trotha
- 1904-1908 — Zeitraum des Voelkermords
- ca. 65.000-80.000 — geschaetzte Opferzahl Herero; nur 15.000-20.000 Ueberlebende
- ca. 10.000 — geschaetzte Opferzahl Nama
- Mai 2021 — Offizielle Anerkennung des Voelkermords durch Deutschland

---

## 8. einstieg.json-Slice (Mappe 4, Problemstellung)

```json
{
  "problemstellung": "Welche Folgen hatte der Wettlauf um Kolonien — fuer Afrika und fuer Europa?"
}
```

C1b-Check: Die Problemstellung adressiert **beide Seiten** der Folgen — europaeische Rivalitaet (Mappe 3, bereits eingefuehrt) und Kolonialgewalt in Afrika (k4-3, Ziel-Knoten dieses Materials). `mat-4-3` arbeitet die afrikanische Seite ab.

---

## 9. ARTEFAKT_INVENTAR — pq-4-1 (Read-Step 7, ARTEFAKT_REFS aktiv)

```yaml
id: pq-4-1
typ: erlass
wortlaut: |
  Trothas Vernichtungsbefehl (Oktober 1904): "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen."
herkunft: Wikipedia DE — Voelkermord an den Herero und Nama, Einleitung
mappe_eignung: Mappe 4 — Kernquelle fuer den Voelkermord
phase_1_hinweis: |
  Bietet sich an fuer quellenorientierte Aufgabe: Was befiehlt Trotha? Gegen wen richtet sich der Befehl? Was sagt der Befehl ueber die Absicht der Kolonialmacht?
  ACHTUNG: Sensible Quelle — Ueberwaetigungsverbot beachten, sachliche Einordnung erforderlich.
```

---

## 10. DIDAKTIK_RAHMEN-Ausschnitt

```yaml
game_id: deutscher-nationalismus-kolonialismus
jahrgangsstufe: 7 (Mittelschule R7)
sprachniveau: R7 (gem. VERTRAG_SPRACHNIVEAU_R7)
lernbereich_primaer: LB2 Zeit und Wandel
ke_primaer: GPG7_LB2_K_05 (Imperialismus + Kolonialisierung am Beispiel Afrikas)
afb_mappe_4: II-III (Beurteilen und Bewerten)
stoffdichte_mappe_4: 5
zentrale_erkenntnis_mappe_4: |
  Der Aufstand der Herero und Nama 1904 war Widerstand gegen Landraub und Unterdrueckung — die deutsche Kolonialmacht antwortete mit einem Voelkermord, dessen Folgen bis heute nachwirken.

ethische_hinweise:
  multiperspektivitaet: |
    Zwingend Perspektive der kolonisierten Bevoelkerung. Die europaeisch-deutsche Perspektive darf nicht als einzige oder als "normal" dargestellt werden. Widerstand der Kolonisierten als berechtigte Selbstverteidigung.
  ueberwaeltigungsverbot: |
    Voelkermord sachlich, nicht reisserisch. Keine Schockbilder. Fakten statt Emotionalisierung. SuS zur eigenen Urteilsbildung fuehren.
  sensibilitaet: |
    Rassistische Terminologie der Kolonialzeit ("Schutzgebiet", "Eingeborene") MUSS als historische Quelle erkennbar und eingeordnet sein — nicht als neutraler Sprachgebrauch uebernommen. Kontextualisierung durch Anfuehrungszeichen oder Hinweise.

trigger_categories_abgeleitet: [Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung]
```

---

## 11. perspektiven_policy-String (STR-05, konflikttyp=true)

```
P1: Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung) | P2: Frankreich (Kolonialkonkurrenz, Kontext Mappe 3) | P3: Kolonisierte (Herero/Nama als Opfer und als Traeger des Widerstands)
```

---

## 12. Erwarteter Output (schema-strikt — Referenz, NICHT Teil der Generator-Eingabe)

Der Generator erzeugt ein JSON-Objekt konform `material-output-schema.json` (Draft7, `additionalProperties: false`, `_meta` required, `wortanzahl`/`perspektive`/`artefakt_ref`/`tafelbild_knoten_abgedeckt`/`trigger_flags` required; bei `aufbereitung != "echt"` zusaetzlich `rekonstruktions_begruendung` required). Siehe F0d_DISPATCH_SPIKE_PLAN §4.3 fuer Ziel-Struktur und §4.4 fuer das zugehoerige QG-06-Return.

---

**Ende Bundle v2.0.** Hash siehe `bundle_hash.txt`.
