# PROMPT-HARDENING OVERLAY v1.1 — SUB_MATERIAL_QUELLENTEXT (F0e-AEF Phase 19.A)

**Zweck:** Dispatcher-Overlay, das VOR die authoritative `agents/SUB_MATERIAL_QUELLENTEXT.md` (Generator-Repo v3.10.4) gesetzt wird. Haertet Struktur- und Enforcement-Luecken, die F0e-Fallstudie aufgedeckt hat. Loest v1.0 ab.

**Shadow-Status:** KEIN Change an authoritativer Subagent-Datei. Overlay wird im F0e-Spike-Dispatch + produktiven Dispatch nach Promotion wirksam.

**Scope:** `typ=quellentext`. Nicht auf andere Subagenten uebertragbar ohne Anpassung.

**Pinned Schema:** `schemas/material_quellentext_partial_v3.10.2.json` (Partial, Subagent-Ownership-Felder). Full-Schema-SHA `632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa` (unveraendert gegenueber v1.0).

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

Dieses Feld existiert NICHT im Schema v3.10.2. Du siehst es eventuell in aelteren Beispielen oder internen Konventionen — **ignoriere alle solchen Vorlagen**. Erlaubte `_meta`-Felder sind AUSSCHLIESSLICH:

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

## 6. Schema-Excerpt (Quelle der Wahrheit — unveraendert aus v1.0 + D6-Typ-Haertung)

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
        "quellenkritische_impulse": {"type": "array", "items": {"type": "string", "minLength": 5}, "minItems": 2, "maxItems": 4},
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
- `_meta.wortanzahl.maximum: 180` — gestaffelter Max-Cap.
- `_meta.quellenkritische_impulse` explizit typisiert: `array<string>`, 2-4 Items. D6-Haertung.

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

## 9. Versionierung + Changelog

- **Overlay-Version:** v1.1 (2026-04-23, F0e-AEF Phase 19.A Start).
- **Vorgaenger:** v1.0 (2026-04-21).
- **Pinned Partial-Schema:** `material_quellentext_partial_v3.10.2.json` (unveraendert).
- **Full-Schema-Referenz:** `material_quellentext_v3.10.2.json` SHA-256 `632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa` (unveraendert).
- **Derived-from:** `agents/SUB_MATERIAL_QUELLENTEXT.md` Generator-Repo v3.10.4 (unveraendert).

### Changelog v1.0 → v1.1

- **§0** unveraendert.
- **§1 D6 NEU:** `quellenkritische_impulse` Array-vs-String Typ-Haertung (PI 3.1).
- **§2 NEU:** Content-Length gestaffelt 120/150/180W + Priming "Intelligente Umschreibung" (PI 3.2).
- **§3 NEU:** Inhalt-Prosa-Only mit Negativ-Liste + Ownership-Verweisen auf Phase 2.1c + SUB_AUFGABE_QUELLENKRITIK (PI 3.6a).
- **§4 NEU:** Empfehlungs-Richtwert 2-3 Impulse, W-Fragen-artig (PI 3.6b Datenfluss-Teil, Owner-Schnittstelle).
- **§5 NEU:** Quelle-SSOT mit `<p>`-Scope-Begrenzung, `<blockquote>`-Attributionen erlaubt (PI 3.7).
- **§6 (ex §2) erweitert:** `wortanzahl.maximum: 180`, `quellenkritische_impulse` typisiert als Array 2-4 Items.
- **§7 (ex §3) erweitert:** 5-Punkte-Checkliste → 9-Punkte-Checkliste.
- **§8 (ex §4) unveraendert.**
- **§9 (ex §5) NEU:** Changelog-Block.

### Nicht in v1.1 (geplant Phase 19.B/C)

- PI 3.5 Zielgruppen-Profil-Priming.
- PI 3.6b Vertrags-Update (VERTRAG_PHASE_2-2b + SUB_AUFGABE_QUELLENKRITIK).
- PI 3.8 Sprachliche Vorentlastung Priming-Block (v1.1 enthaelt nur Umschreibung-Direktive in §2).
- PI 3.4 ENUM_TRIGGER_FLAGS Enum-Enforcement.
- PI 3.9 Nachweis-Dramaturgie.
- PI 3.10 Titel-Funktion + Positiv-Beispiel-Bibliothek.

Siehe `F0e_PI_ITEMS_FINAL.md` + `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §19.5.

---

## 10. Re-Run-Erwartung (Akzeptanzkriterium §19.7)

Overlay v1.1 bei Re-Run der 4 F0e-Fallstudien-Subjekte (I1, I2-R1, I2-R2, I2-R3) muss:

- D1-D6 Schema-Compliance 4/4.
- M16 Prosa-Only 4/4 (keine "Denk nach:"-Bloecke, keine Aufgaben-Operatoren in `inhalt`).
- M17 Quelle-SSOT 4/4 (keine kursiven Nachweis-Anhaenge in `<p>`).
- `_meta.wortanzahl` ≤ 150 bei 3/4 (ohne Begruendung), ≤ 180 bei 4/4 (mit Begruendung akzeptiert).
- Didaktik-Review >= 4.0 Mittelwert, Min 3.8 akzeptabel bei dokumentierter Begruendung.

Gate-Chain dokumentation: `runs/iteration-3/*` (F0e Overlay-v1.1-Re-Run, separater Spike-Lauf).
