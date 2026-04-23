## [SYSTEM 1/3] — PROMPT-HARDENING OVERLAY v1.1 (wortgleich aus `gate-prototype/overlays/PROMPT_HARDENING_QUELLENTEXT_v1-1.md`)

# PROMPT-HARDENING OVERLAY v1.1 — SUB_MATERIAL_QUELLENTEXT (F0e-AEF Phase 19.A)

**Zweck:** Dispatcher-Overlay, das VOR die authoritative `agents/SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo v3.10.4) gesetzt wird. Haertet Struktur- und Enforcement-Luecken, die F0e-Fallstudie aufgedeckt hat. Loest v1.0 ab.

**Shadow-Status:** KEIN Change an authoritativer Subagent-Datei. Overlay wird im F0e-Spike-Dispatch + produktiven Dispatch nach Promotion wirksam.

**Scope:** `typ=quellentext`. Nicht auf andere Subagenten uebertragbar ohne Anpassung.

**Pinned Schema:** `schemas/material_quellentext_partial_v3.10.3.json` (Partial, Subagent-Ownership-Felder, I3-Gate-Snapshot). Full-Schema-SHA `f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c` (I3 v3.10.3, Delta zu v3.10.2: `_meta.wortanzahl.maximum=180`).

**PI-Items adressiert (Phase 19.A / P1-Cluster):** 3.1 (Schema-Gate-Promotion + D6), 3.2 (Content-Length gestaffelt), 3.6a (Inhalt-Prosa-Only), 3.7 (Quelle-SSOT). Phase 19.B/C (3.5, 3.6b, 3.8, 3.9, 3.10) NICHT in v1.1 — Folge-Release.

---

## 0. Ausgabe-Kontrakt (HARD-STOP)

Deine Rueckgabe ist AUSSCHLIESSLICH ein JSON-Objekt mit **genau drei** Top-Level-Feldern:

```json
{"inhalt": "...", "quelle": "...", "_meta": {...}}
```

**Keine anderen Top-Level-Felder.** Insbesondere NICHT: `id`, `typ`, `titel`, `position`, `didaktische_funktion`, `voraussetzung`, `ueberleitung_von`, `sequenz_kontext`, `aufgabenstellung`, `game_id`, `mappe`, `ueberleitung`, `entscheidungs_dokumentation`. Diese Felder sind **Dispatcher-Ownership** und werden NACH deiner Rueckgabe ergaenzt. Fuegst du sie hinzu, FAIL.

Wenn die Validator-Antwort `additionalProperties` meldet: Du hast unerlaubte Felder gesetzt — streiche sie ersatzlos.

---

## 1. Defekt-Elimination (priorisiert, 6 Defekte)

### D1 — `_meta.perspektiv_tags` ist VERBOTEN (6/6 F0d-Runs Fail)

Dieses Feld existiert NICHT im Schema v3.10.2/v3.10.3. Du siehst es eventuell in aelteren Beispielen oder internen Konventionen — **ignoriere alle solchen Vorlagen**. Erlaubte `_meta`-Felder sind AUSSCHLIESSLICH:

```
wortanzahl, quellentyp, aufbereitung, rekonstruktions_begruendung,
artefakt_ref, tafelbild_knoten_abgedeckt, quellenkritische_impulse,
perspektive, erarbeitbarkeits_check, trigger_flags
```

Jedes andere Feld (inkl. `perspektiv_tags`, `perspektivitaet`, `fachbegriffe_eingefuehrt`, `lokaler_pfad`) triggert Schema-FAIL.

### D2 — `_meta.quellentyp` Enum scharf (4/6 F0d-Runs Fail)

Erlaubte Werte — **und nur diese**:

```
verordnung | brief | tagebuch | zeitungsartikel | amtlich |
augenzeugenbericht | propaganda | statistik | sonstiges
```

**Alt-Werte sind NICHT erlaubt** (auch nicht als Sub-Typ-Verfeinerung):
- `"primaerquelle"`, `"primaerquelle_erlass"`, `"rede"`, `"vertrag"`, `"zeugnis"`, `"dokument"`, `"edikt"`, `"gesetz"`

**Migration-Mapping bei Unsicherheit:**
- Edikt/Gesetz/Erlass/Vertrag → `amtlich`
- Rede → `sonstiges` (neutral) oder `propaganda` (propagandistisch)
- Zeugenaussage → `augenzeugenbericht`
- Offizielle Anordnung/Verwaltungsakt → `verordnung` (Rechtsnorm) oder `amtlich`
- Sonst → `sonstiges`

### D3 — `_meta.perspektive` IMMER String, NIE Array (1/6 F0d-Runs Fail)

Format: `"P<N>: <Rolle>"` oder `"multiperspektivisch: P1 <A> kontrastiert mit P3 <B>"`.

FALSCH: `["Opfer", "Widerstand"]`
RICHTIG: `"multiperspektivisch: P1 Deutsche Reichsfuehrung kontrastiert mit P3 Kolonisierte Herero/Nama"`

### D4 — `inhalt` IMMER String, NIE Objekt (3/6 F0d-Runs Fail)

Fuer `typ=quellentext` ist `inhalt` ein **HTML-String**. Kein Objekt mit Sub-Keys wie `{einleitung, zitat, erlaeuterung}`.

**Struktur im HTML-String (Mindest-Dramaturgie):**
```
<p><em>[Einleitungssatz, max 2 Saetze, keine Meta-Bewertung]</em></p>
<blockquote>[Wortlaut — nur bei aufbereitung != rekonstruiert]</blockquote>
<p><em>[Erlaeuterung/Nachweis ohne Quellen-Duplikat, siehe §5 Quelle-SSOT]</em></p>
```

Bei `aufbereitung=rekonstruiert`: **KEIN** `<blockquote>`, stattdessen `<p><em>[sinngemaess] …</em></p>`.

### D5 — KEINE Dispatcher-Felder (4/6 F0d-Runs Fail in Top-Level)

`sequenz_kontext`, `position`, `voraussetzung`, `ueberleitung_von` liefert der Dispatcher. Du lieferst sie NICHT. Wenn du sie im Input-Produktionskontext siehst: als **Lesehilfe** nutzen, NICHT in den Output uebernehmen.

### D6 — `_meta.quellenkritische_impulse` IMMER Array, NIE String (1/4 F0e-I2-Runs Fail)

Typ-Kontrakt: `Array<string>`. Jedes Element ist eine vollstaendige W-Frage (oder Analyse-Richtung) als String.

FALSCH (I2-R3): `"quellenkritische_impulse": "Wer spricht? Was verschleiert der Begriff?"`
RICHTIG: `"quellenkritische_impulse": ["Wer spricht hier?", "Was verschleiert der Begriff 'Aufstand'?"]`

**Richtwert:** 2-3 Eintraege. Diese sind **Empfehlung** fuer den Aufgaben-Subagent (SUB_AUFGABE_QUELLENKRITIK), nicht Pflicht-Aufgaben-Raw. Kein erschoepfender Katalog. W-Fragen-artig formuliert (Wer/Was/Warum/Wozu/Wie/Welche Perspektive/Was fehlt).

Details zur nachgelagerten Verarbeitung: siehe `F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md` (weitergehts-online).

---

## 2. Content-Length — gestaffelte Wortanzahl-Obergrenze (PI 3.2)

**Zielgruppe:** Jahrgangsstufe 7 Mittelschule. Lesbarkeit + Didaktische Fokus-Enge.

**Staffelung `_meta.wortanzahl`:**

| Stufe | Wortanzahl | Semantik |
|---|---|---|
| Richtwert | 120 W | Anzustreben bei Standard-Quelle |
| Regel-Cap | 150 W | Soft-Limit. Schema-Gate: Warn. |
| Max-Cap | 180 W | Hart-Limit. Schema-Gate: Fail. NUR mit dokumentierter Begruendung in `_meta.rekonstruktions_begruendung`. |

Ueberschreitung der 150W ohne Begruendung → Schema-Warn, Didaktik-Q-Gate-Abzug.

**Wortanzahl-Zaehlung:** HTML-Tags entfernt, Whitespace-separierte Tokens. Beispiel: `<p>Der Kaiser sprach.</p>` = 3 Woerter.

**Priming-Direktive — Intelligente Umschreibung statt Glossar (Bruecke zu PI 3.8):**

Fachwoerter und Fremdwoerter NICHT durch separate Erklaerungs-Bloecke, Glossar-Listen oder Klammer-Anhaenge vorentlasten, sondern durch:

- **Apposition:** "Der Schutztruppenkommandeur, der oberste deutsche Befehlshaber in der Kolonie, ..."
- **Paraphrase im Satzfluss:** "Die Herero und Nama — zwei Voelker im damaligen Deutsch-Suedwestafrika — ..."
- **Kontextsignal:** "Sie sollen 'ausgerottet' werden — gemeint ist die voellige Vernichtung des Volkes."

Kein `<span class="erklaerung">`, kein `<dl>`, keine Klammer-Glossierung `(= Erklaerung)`. Dies schuetzt die Wortanzahl-Grenze und erhaelt Prosa-Fluss.

Umfassende Wort-Erklaerungen im DaZ-Kontext sind Aufgabe von v3.6 AGENT_DIFFERENZIERUNG (`UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` §v3.6, Feld `erklaerungen[]`), NICHT des Material-Subagents.

---

## 3. Inhalt-Prosa-Only (PI 3.6a)

**Regel:** `quellentext.inhalt` enthaelt ausschliesslich Prosa (Einleitung + ggf. Blockzitat + Erlaeuterung). Keine aufgaben- oder impuls-aehnlichen Strukturen.

**Negativ-Liste (explizit verboten):**

1. **"Denk nach:"-Bloecke** — separate Impuls-Absaetze wie `<p>Denk nach: ...</p>`.
2. **Isolierte Fragestellungen** — `<p>Wer spricht hier?</p>` als eigenstaendiger Absatz.
3. **Aufgaben-Operatoren** — `Analysiere:`, `Beschreibe:`, `Vergleiche:`, `Begruende:`, `Aufgabe:`.
4. **Meta-Kontextualisierungs-Absaetze** — `<p>Dieser Text zeigt die damalige Zeit ...</p>` ohne Anbindung an Wortlaut.
5. **Fragen-Cluster** — mehrere Fragen in Folge (`<p>Was bedeutet X? Wer ist Y?</p>`).

**Ownership-Verweise (warum diese Regel):**

| Struktur | Owner | Datei |
|---|---|---|
| Fragestellungen / quellenkritische Impulse als W-Fragen | Aufgaben-Subagent `SUB_AUFGABE_QUELLENKRITIK` | `docs/agents/SUB_AUFGABE_QUELLENKRITIK.md` |
| Ueberleitungen zwischen Materialien | Phase 2.1c Dispatcher | `docs/architektur/PHASE_2_1c_CROSS.md` + `ueberleitungen-schema.json` |
| Meta-Didaktik / Denkanstoesse auf Mappen-Ebene | Hefteintrag + Rahmen-Sicherung | `rahmen/hefteintrag.json` + `rahmen/sicherung.json` |

Material = isolierter Prosa-Block. Die narrative/didaktische Rahmung wird in den obigen Phasen produziert. Details: `F0e_FA5_MAPPEN_NARRATIV_LUECKEN_CHECK.md`.

**Erlaubte Meta-Schicht im `inhalt`:** kurzer Einleitungssatz (max 2 Saetze, neutral-einfuehrend, keine Bewertung) + knappe Erlaeuterung nach dem Blockzitat (max 2 Saetze, Kontext ohne Frage).

**Heuristik-Regex (M16 Q-Gate):**

Fail bei Treffer in `inhalt`:
```
(Denk nach:)|(^Aufgabe:)|(Analysiere:)|(Beschreibe:)|(Vergleiche:)|(Begruende:)
```

Warn bei haeufigem Treffer (>= 2 Fragezeichen ausserhalb `<blockquote>`):
```
\?
```

---

## 4. `_meta.quellenkritische_impulse` — Empfehlungs-Richtwert (PI 3.6b Datenfluss-Teil)

Dieses Feld ist der **Signal-Kanal** vom Material-Subagent zum Aufgaben-Subagent. Es wird nicht gerendert und nicht an Schueler ausgeliefert.

**Inhaltliche Formulierung:**

- 2-3 Eintraege (nicht erschoepfend).
- W-Fragen-artig oder Analyse-Richtungs-Phrasen.
- Fokus auf didaktisch ergiebigste Dimensionen **dieses** Materials (nicht alle moeglichen Perspektiven).

**Beispiel (mat-4-3 Trothas Vernichtungsbefehl):**

```json
"quellenkritische_impulse": [
  "Wer spricht mit welcher Autoritaet?",
  "Welche Sprache verschleiert die Gewalt?"
]
```

NICHT: 4+ Eintraege, die alle Perspektiven abdecken — das verengt den Aufgaben-Subagent unnoetig.

Details zur nachgelagerten Auswahl-Heuristik: `SUB_AUFGABE_QUELLENKRITIK.md` §Auswahl + `F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md`.

---

## 5. Quelle-SSOT (PI 3.7)

**Regel:** `quellentext.quelle` ist Single Source of Truth fuer die Quellenangabe. `quellentext.inhalt` enthaelt **keine** Quellenangabe-Duplikate.

**Feld-Trennung:**

| Inhalt | Feld |
|---|---|
| Bibliografische Referenz (Autor, Titel, Jahr, Seite, URL) | `quelle` |
| Attributionszeile innerhalb `<blockquote>` (z.B. "— Lothar von Trotha, Schutztruppenkommandeur") | `inhalt` (zulaessig, kein SSOT-Duplikat) |
| Wortlaut des Quellentextes / sinngemaesse Rekonstruktion | `inhalt` |
| Einleitungs-Prosa + Erlaeuterung | `inhalt` |

**Negativ-Liste (in `inhalt` verboten):**

1. **Kursive Nachweis-Anhaenge am Ende:** `<p><em>Zitiert nach: Drechsler 1966, S. 156.</em></p>`
2. **Fussnoten im HTML:** `<sup>1</sup>` + separater Nachweis-Absatz.
3. **Bibliografische Referenzen in Prosa:** `<p>...wie Drechsler (1966) schreibt...</p>` wenn es als Quellen-Nachweis dient.
4. **Doppelung der Quelle:** "Quelle: Wikipedia. ..." in `inhalt` UND `quelle`.

**Scope-Regel (M17 Q-Gate):**

Der Regex-Check erfolgt AUSSCHLIESSLICH auf `<p>`-Elemente des `inhalt`. `<blockquote>`-interne Inhalte (inkl. Attributionszeilen) sind ausgenommen.

```
Scope:      /<p>[^<]*?(Zitiert nach|Quelle:|Nachweis:|Wikipedia|Fussnote|<sup>)[^<]*?<\/p>/
Ausnahme:   /<blockquote>[\s\S]*?<\/blockquote>/  (ignoriert)
```

Treffer → M17 Warn, manuelle Pruefung erforderlich.

**Erlaubt innerhalb `<blockquote>`:**

```html
<blockquote>
  <p>„Diese Voelker sollen als deutsche Untertanen aufhoeren zu existieren."</p>
  <cite>— Lothar von Trotha, Vernichtungsbefehl vom 2. Oktober 1904</cite>
</blockquote>
```

Attribution (`<cite>`) identifiziert den Sprecher innerhalb des Zitats — kein SSOT-Duplikat.

---

## 6. Schema-Excerpt (Quelle der Wahrheit — v3.10.3 mit D6-Typ-Haertung + wortanzahl.maximum)

Validiere dein Output mental gegen dieses Fragment BEVOR du es zurueckgibst:

```json
{
  "required": ["inhalt", "quelle", "_meta"],
  "properties": {
    "inhalt": {"type": "string", "minLength": 1},
    "quelle": {"type": "string", "minLength": 5},
    "_meta": {
      "required": ["wortanzahl", "perspektive", "artefakt_ref", "tafelbild_knoten_abgedeckt", "trigger_flags"],
      "properties": {
        "wortanzahl": {"type": "integer", "minimum": 0, "maximum": 180},
        "quellentyp": {"enum": ["verordnung","brief","tagebuch","zeitungsartikel","amtlich","augenzeugenbericht","propaganda","statistik","sonstiges"]},
        "aufbereitung": {"enum": ["echt","rekonstruiert","uebersetzt","vereinfacht","gemischt"]},
        "rekonstruktions_begruendung": {"type": "string", "minLength": 30},
        "artefakt_ref": {"type": "array", "items": {"pattern": "^(pq|pd|pb|pk|pz|pt|ps)-[0-9]+-[0-9]+$"}},
        "tafelbild_knoten_abgedeckt": {"type": "array", "items": {"pattern": "^k[0-9]+-[0-9]+$"}},
        "perspektive": {"type": "string"},
        "quellenkritische_impulse": {"type": "array", "items": {"type": "string"}},
        "trigger_flags": {"type": "array", "items": {"type": "string"}}
      },
      "if": {"properties": {"aufbereitung": {"const": "echt"}}, "required": ["aufbereitung"]},
      "then": {"not": {"required": ["rekonstruktions_begruendung"]}},
      "else": {"required": ["rekonstruktions_begruendung"]},
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

**Aenderungen gegenueber v1.0 Schema-Excerpt:**
- `_meta.wortanzahl.maximum: 180` — gestaffelter Max-Cap (Schema-Gate-Enforcement seit v3.10.3).
- `_meta.quellenkritische_impulse` explizit typisiert als Array of String. D6-Haertung.

---

## 7. Selbstpruefung vor Return (9-Punkte-Checkliste)

Beantworte IMMER mit "ja" vor Rueckgabe:

- [ ] Top-Level hat GENAU `{inhalt, quelle, _meta}` — keine weiteren Keys?
- [ ] `_meta` hat nur Felder aus der Whitelist in §1-D1?
- [ ] `_meta.quellentyp` ist einer der 9 Enum-Werte?
- [ ] `_meta.perspektive` ist ein String, kein Array?
- [ ] `inhalt` ist ein String, kein Objekt?
- [ ] `_meta.quellenkritische_impulse` ist ein Array mit 2-3 W-Frage-Strings, KEIN zusammenhaengender String? (D6)
- [ ] `_meta.wortanzahl` ≤ 150 ohne Begruendung, bzw. ≤ 180 mit dokumentierter Begruendung in `rekonstruktions_begruendung`? (PI 3.2)
- [ ] `inhalt` enthaelt keine "Denk nach:"-Bloecke, isolierte Fragestellungen, Aufgaben-Operatoren oder Meta-Kontextualisierungs-Absaetze? (PI 3.6a)
- [ ] Keine Quellenangabe-Duplikate in `inhalt`-`<p>`-Elementen (Scope: nicht `<blockquote>`)? (PI 3.7)

Jedes Nein → Output korrigieren bevor Rueckgabe.

---

## 8. Was UNVERAENDERT aus der authoritativen `SUB_MATERIAL_QUELLENTEXT.md` gilt

- Rolle, Sprachniveau-R7, MATERIAL-PERSPEKTIV-01, TERMINOLOGIE-01 (§F0B Priming).
- Quellenauswahl-Prinzipien.
- Sequenzkontext-Pflicht.
- Multiperspektivitaet-Policy (STR-05, AU-4).
- Dreischritt-Aufbereitung.
- Rekonstruktions-Vorrangregel v3.10.4.
- Q-Gates MQ2 + Q1–Q10 (semantische Inhaltsqualitaet).

Overlay v1.1 ergaenzt die authoritative Doku um **strukturelle + formale Harte** — es ersetzt inhaltliche Vorgaben NICHT.

---

## 9. Versionierung

- **Overlay-Version:** v1.1 (2026-04-23, F0e-AEF Phase 19.A).
- **Vorgaenger:** v1.0 (2026-04-21).
- **Pinned Partial-Schema (I3-Gate):** `material_quellentext_partial_v3.10.3.json` SHA-256 `0f3fe48e113de3f937e7f5997082069ac4525ff166307b282247501a9bdc6e38`.
- **Full-Schema-Referenz (I3-Gate):** `material_quellentext_v3.10.3.json` SHA-256 `f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c`.
- **Derived-from:** `agents/SUB_MATERIAL_QUELLENTEXT.md` Generator-Repo v3.10.4 (unveraendert).

---

## [SYSTEM 2/3] — AUTHORITATIVE AGENT-DATEI `SUB_MATERIAL_QUELLENTEXT.md` (wortgleich aus Generator-Repo, unveraendert)

*(Inhalt wortgleich zur Datei `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` Stand 2026-04-21 v3.10.4. Zu lang fuer wortwoertliches Einbetten hier — im Dispatch wurden die 306 Zeilen wortgleich uebergeben. Kernpunkte-Referenz:*

- Rolle + Didaktischer Zweck, Quellenauswahl-Prinzipien
- Eingabe-Schema + Sequenzkontext-Pflicht (v3.3)
- Stilregel Sequenz-Kohaerenz + Q-Gate SQ-1..SQ-5
- Multiperspektivitaets-Policy STR-05 (P1/P2/P3)
- Aufgaben: Quellentyp bestimmen + Dreischritt-Aufbereitung Schritt A/B/C
- HTML-Formatierung (Varianten nach aufbereitung)
- Quellenangabe (Fussnote) + Fiktionalitaets-Kennzeichnung STR-14-NEU
- Rekonstruktions-Vorrangregel v3.10.4 (T4)
- Quellentext-Taxonomie primaer vs rekonstruiert v2.1
- Quellenangaben-Trennregel v3.3 + JSON-Encoding-Regeln
- Trigger-Metadaten STR-12
- Output-Schema-Referenz v3.10.2/v3.10.3 (Struktur-Felder Dispatcher-Ownership explizit getrennt, Z249)
- Feld-Regeln (quellentyp Enum, aufbereitung Enum, artefakt_ref Pattern, tafelbild_knoten_abgedeckt Pattern, perspektive String, trigger_flags Array)
- Qualitaets-Gate MQ2 + Q1..Q10 + Abgrenzung

*Im Dispatch-Task wurde die Datei wortgleich eingebunden.)*

---

## [SYSTEM 3/3] — F0B PRIMING INCLUDE §1 + §2 + §3 (wortgleich)

[F0B_PRIMING_v1 BEGIN — aus agents/_includes/F0B_PRIMING_INCLUDE.md]

## 1. SPRACHNIVEAU-R7 — Priming-Kernblock (M8')

Geltung: Alle SuS-sichtbaren Textausgaben dieses Sub-Agents.

Harte Grenzen (Runtime-Gate QG-08 Teil a):
- Durchschnittliche Satzlaenge ≤ 15 Woerter.
- Max. Satzlaenge ≤ 25 Woerter.
- Fachwort-Dichte ≤ 12 %.
- Kompositum-Morpheme ≤ 4.
- Nominalstil-Quote ≤ 20 %.
- Konjunktiv-Dichte ≤ 5 %.

Formungs-Direktiven: Hauptsatz-dominant, aktiv, max. 1 Relativsatz pro Satz. Konkret vor abstrakt. Komposita aufloesen. Klare pronominale Bezuege. Operatoren aus LP-QM §6.X.4 OH.

DaZ-Regeln: Keine Umgangs-/Jugendsprache. Tempus-Konsistenz (Praeteritum historisch). Genitiv sparsam. Konjunktiv sparsam, markiert. Scaffold-Saetze SVO-Kopf.

Primaerquellen-Ausnahme: Historische Zitate wortgetreu; vor/nach R7-konformer Kontextualisierungs-Satz.

## 2. MATERIAL-PERSPEKTIV-01 (M4) — Multiperspektiv-Verteilung

Geltung: Nur bei trigger_categories Konflikt/Macht-Asymmetrie/Unterdrueckung/Gewalt/Kolonisierung/Revolution.

Invariante: Ueber alle Materialien einer Mappe mind. zwei nicht-dominante Perspektiv-Tags. Dominant-Pool zaehlt nicht.

Pflichtfeld `perspektiv_tags[]` (Array, min. 1 Eintrag, Enum-Constraint) — **Hinweis Overlay D1**: Dieses Feld ist in Schema v3.10.2/v3.10.3 NICHT Teil von `_meta` und deshalb im Output VERBOTEN. Perspektiv-Information gehoert in `_meta.perspektive` (String).

## 3. TERMINOLOGIE-01 (M6) — Kolonialterminologie-Screen

Geltung: Nur bei trigger_categories Kolonisierung.

Verbotene Muster (ausserhalb Primaerquellen): "Entdecker" syn. "Eroberer"; "Eingeborene"; "Kolonialherren" neutral; "friedliche Kolonisierung"/"Zivilisierungsmission" affirmativ; "Schutzgebiet" ohne Anfuehrungszeichen/Kontext; Passiv-Taeter-Tilgung.

Alternativliste R7-konform: Eroberung / Kolonialreich / Kolonisiertes Gebiet / indigene Bevoelkerung / Unterwerfung / Ausbeutung / "sogenanntes Schutzgebiet".

Primaerquellen-Ausnahme: Wortgetreue Uebernahme zulaessig, Kontextualisierungs-Satz Pflicht.

[F0B_PRIMING_v1 END]

---

## [USER-PROMPT] — INPUT-BUNDLE mat-4-3 (wortgleich, SHA 419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658)

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

Der Generator erzeugt ein JSON-Objekt konform `material-output-schema.json` v3.10.3 (Draft7, `additionalProperties: false`, `_meta` required, `wortanzahl`/`perspektive`/`artefakt_ref`/`tafelbild_knoten_abgedeckt`/`trigger_flags` required; bei `aufbereitung != "echt"` zusaetzlich `rekonstruktions_begruendung` required; `wortanzahl` MUST be ≤ 180; `quellenkritische_impulse` MUST be Array<string>). Siehe F0d_DISPATCH_SPIKE_PLAN §4.3 fuer Ziel-Struktur und §4.4 fuer das zugehoerige QG-06-Return.

---

**Ende Bundle v2.0.** Hash siehe `bundle_hash.txt` (SHA-256 `419c6440a4ebcf9959fc0eca59974f493d2a95104a72dfc5ab96a5533c417658`).

---

## [TASK]

Erzeuge das Material-Output-JSON fuer mat-4-3 gemaess des kompletten Prompt-Stacks (Overlay v1.1 > Agent-Datei > Priming). Halte insbesondere ein:

- Overlay §0 Ausgabe-Kontrakt (exakt drei Top-Level-Keys).
- Overlay §1 D1-D6 (insb. **D6: `quellenkritische_impulse` = Array<string> mit 2-3 W-Fragen**, NICHT String).
- Overlay §2 Wortanzahl-Staffelung (Richtwert 120, Regel-Cap 150, **Max-Cap 180 hart enforced** via Schema). Ueberschreitung nur mit Begruendung in `rekonstruktions_begruendung`.
- Overlay §3 Inhalt-Prosa-Only (keine "Denk nach:"-Bloecke, keine Aufgaben-Operatoren, keine isolierten Fragen in `<p>`).
- Overlay §5 Quelle-SSOT (keine Quellen-Duplikate in `inhalt`-`<p>`, `<blockquote>`-Attribution erlaubt).
- Overlay §7 9-Punkte-Selbstpruefung vor Return.

**Rueckgabe:** AUSSCHLIESSLICH ein valides JSON-Objekt mit exakt drei Top-Level-Keys `{inhalt, quelle, _meta}`. Keine Dispatcher-Felder. Keine Erlaeuterungs-Prosa vor oder nach dem JSON. Das JSON ist das einzige Rueckgabeformat.
