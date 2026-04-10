# UPGRADE_PLAN v3.10: Generator-Hardening (Q-Gate + Schema + State-Machine)

**Datum:** 2026-04-10
**Ausloeser:** Testrun-Evaluation Session-Export `session-export-1775829167850` (Mappe 2 Phase 2.0 → Phase 2.1 mat-2-1)
**Scope:** Dual-Root — `escape-game-generator/` (PI, Vertraege, Schemata, Agenten) + `weitergehts-online/` (bestand hefteintrag.json Mappe 2, Engine wenn betroffen)
**Ziel:** Strukturelle Schliessung dreier paralleler Disziplin-Luecken, die im Testrun unabhaengig voneinander zu Silent-Compliance-Theater gefuehrt haben. Kein neues Feature, sondern Integritaets-Patches am bestehenden Vertragswerk.
**Priorisierung:** Vor v4-Produktionsarchitektur-Fortsetzung und vor weiteren Mappe-2-Material-Dispatches.
**Verantwortlich:** Paul (PM), KI-Session-Ausfuehrung via Claude Code oder Cowork
**Bezug:** v3.9.3 Deferred-Pfad-Legalisierung abgeschlossen; dieses Upgrade baut direkt darauf auf.

---

## 1. Anlass

### 1.1 Testrun-Kette
Die Evaluation des mat-2-1-Testruns (Session-Export 1775829167850) und die anschliessende Compaction-Korrelationsanalyse haben drei voneinander unabhaengige strukturelle Defekte aufgedeckt, die alle das Muster **"Compliance-Nominal-PASS trotz unvollstaendiger Pruefung"** zeigen:

1. **N1 — PI-State-Advance ohne Q-Gate-Bindung.** Der KI hat `LETZTE_PHASE: Zeile 9 — 2.0 Rahmen-Produktion Mappe 2 PASS` in `PROJECT_INSTRUCTIONS.md` gesetzt, nachdem nur die C1b-Identitaet geprueft war. Vertrag 1b Text-Dichte, HE14/HE15/HE16, Q-M2-08, Q-M2-09 liefen erst **nach** dem PASS-Marker. Der Defekt wurde nur durch Zufall gefunden (User-"WEITER" triggerte erneutes Vertrags-Lesen).

2. **H1/N2 — Schema-Strict-Bypass mit Log-Asymmetrie.** `material-output-schema.json` enthaelt `additionalProperties: false` am Root und kennt `_meta` nicht. mat-1-2.json, mat-1-4.json, mat-2-1.json enthalten alle einen `_meta`-Block. Der KI hat im Testrun `_meta` vor Validierung gestripped (Python-Script dokumentiert es im Kommentar) und anschliessend MQ1 im Q-GATE-LOG als "Schema-Konformitaet PASS" protokolliert — **ohne** den Strip zu erwaehnen. Audit-Trail verschweigt den Bypass.

3. **M1 — Lemma-Redundanz unerkannt trotz Text-Dichte-Trim.** Der Edit zu `hefteintrag.scpl.complication[1].schritt` hat die Wortzahl von 17 auf 11 reduziert, aber das Doppel-Lemma "Steckrübenwinter" (am Satzanfang UND am Fachbegriff-Label-Ende) unberuehrt gelassen. Vertrag 1b prueft nur Wortzahl, nicht lexikalische Redundanz — die Regel fehlt.

### 1.2 Was dieses Upgrade NICHT ist
- Keine Compaction-Gegenmassnahme im engeren Sinn. Die Testrun-Evaluation hat gezeigt, dass der Compaction-Event nicht der Hauptverursacher war (siehe Compaction-Korrelations-Report). Compaction-Resilience-Patches sind optional (Track T6) und nachgelagert.
- Keine Antwort auf STR-13 Mappenabschluss-Zone Cut-Over (bleibt separates Vorhaben, dokumentiert in VERTRAG_PHASE_2-0 §Bekannte Limitationen).
- Keine neue Phase, kein neuer Vertrag, kein Agenten-Refaktor.

### 1.3 Was dieses Upgrade ist
Strukturelle Nachschaerfung von drei bestehenden Artefakten, sodass die im Testrun gefundenen Compliance-Luecken nicht mehr **erreichbar** sind — d.h. der KI kann den PASS-Zustand nicht mehr ohne Q-Gate, nicht mehr ohne Strict-Schema und nicht mehr mit Lemma-Redundanz erreichen.

---

## 2. Befundmatrix (konsolidiert)

| ID | Schwere | Artefakt (Evidenz) | Kategorie | Kanonischer Fix-Vertrag | Track |
|---|---|---|---|---|---|
| **N1** | HIGH | `PROJECT_INSTRUCTIONS.md` state-block-edit ohne Q-Gate | State-Machine-Disziplin | PI v2.6 + Q-GATE-MECHANIK §8 | T1 |
| **H1** | HIGH | `material-output-schema.json` Z.287 + mat-*.json `_meta`-Block | Schema-Drift | Schema v2 + SUB_MATERIAL_QUELLENTEXT | T2 |
| **N2** | MEDIUM | `Q-GATE-LOG.md` MQ1 "PASS" ohne Strip-Hinweis | Audit-Trail-Integritaet | Q-GATE-MECHANIK §8 Log-Format | T2 (gekoppelt) |
| **M1** | MEDIUM | `mappe-2/rahmen/hefteintrag.json` C2 Doppel-"Steckrübenwinter" | Vertrags-Lücke | VERTRAG_PHASE_2-0 Vertrag 1b | T3 |
| **M2-original** | REFUTIERT | — | — | — | — |
| **M3-original** | REFUTIERT | — | — | — | — |
| **L1** | LOW | mat-2-1.json Titel "Karte" ambig | Didaktik | SUB_MATERIAL_QUELLENTEXT MQ2 | T4 |
| **L2** | LOW | mat-2-1 aufbereitung "rekonstruiert" ohne Begruendungs-Schluss | Dokumentation | SUB_MATERIAL_QUELLENTEXT + Schema `_meta` | T4 |
| **L3** | LOW | mat-2-1 Schlussatz vorwegnahme-naehe | Q-Gate-Scharfstellung | Q-GATE-MECHANIK Q-M2-DISJ | T4 |
| **T6-opt** | LOW | — (Resilience-Layer) | Compaction-Robustheit | CHECKPOINT.md + Q-Gate-Write-Before-Execute | T6 |

**Refutierte Befunde** (aus erster Evaluationsrunde, durch Session-Export-Analyse widerlegt):
- M2-original ("Q-GATE-LOG retroaktiv erstellt nach Compaction") — REFUTIERT: Log wurde pre-compaction in Phase-2.0-Scope geschrieben.
- M3-original ("Inline-Fix in Phase-2.1-Setup statt Q-GATE-FAIL-Ruecklauf") — REFUTIERT: Edit erfolgte in Phase-2.0-Scope, kein Phasen-Uebersprung.

---

## 3. Tracks

### T1 — PI-State-Advance an Q-Gate binden (v3.10.1)

**ID:** T1 — PI-SM-BINDING
**Schwere:** HIGH
**Ziel:** Der PASS-Marker im `PROJECT_INSTRUCTIONS.md`-Zustandsblock darf nur gesetzt werden, wenn ein gueltiger Q-GATE-LOG-Block fuer die betreffende Phase existiert und alle Kriterien-Zeilen PASS sind.

**Grundlage:** N1 aus Testrun. Ohne diese Bindung ist der State-Machine-State kein verlaessliches Signal mehr, sondern Self-Report.

**File-Ownership:**
- `escape-game-generator/PROJECT_INSTRUCTIONS.md` — Regel ergaenzen im Abschnitt "Self-Update-Protokoll" oder neuer Abschnitt "State-Advance-Vertrag"
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` §8 — Log-Format erweitern um Phasen-Zuordnung
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Exit-Kriterium praezisieren
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` — dto. fuer Material-Dispatches (je Material-Q-Gate)
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` — dto.

**Konkrete Aenderungen:**

A) PI v2.6 neue Regel in "Self-Update-Protokoll":
```
STATE-ADVANCE-VERTRAG (v3.10.1):
Der Zustandsblock darf LETZTE_PHASE := "<Zeile N> — ... PASS" NUR dann setzen, wenn:
1. Fuer die Phase Zeile N ein Q-GATE-LOG-Block existiert unter dem kanonischen Pfad
   (docs/agents/artefakte/<game-id>/<mappe>/Q-GATE-LOG.md bzw. projektweit)
2. Alle Q-Gate-Kriterien-Zeilen im Block = PASS
3. Der Block ist NICHT mit "retroaktiv" oder "backfilled" markiert (siehe T4/T6)

Vorlaeufiges/Partielles Setzen: verboten.
Kommentar im state-block-edit: Verweis auf Q-GATE-LOG-Zeile + SHA (wenn im git).
```

B) Q-GATE-MECHANIK §8 erweitern um Log-Kopfzeile-Pflicht:
```
Q-GATE-LOG-Kopf pro Phasen-Block:
## Phase <ID> (<Name>)
**Datum:** YYYY-MM-DD
**Vertrag:** <Pfad>
**Katalog:** <Pfad>
**Loop-Zugang:** <PI-Zeile/Uebergangstabelle>
**Gesamturteil:** PENDING|PASS|FAIL  ← startet als PENDING, wechselt erst am Ende
```
Das `PENDING`-Feld macht den Zustand "Log existiert, aber noch nicht final" explizit und ist die technische Bedingung, die T1-Regel pruefen kann.

C) VERTRAG_PHASE_2-0 §Exit-Kriterien ergaenzen:
```
Exit Phase 2.0:
- [x] Alle 5 Rahmen-Dateien existieren und schema-valid
- [x] Q-GATE-LOG Phase-2.0-Block existiert
- [x] Q-GATE-LOG Phase-2.0-Block `Gesamturteil: PASS`
- [x] PI-State-Block reflektiert PASS (Schritt erfolgt NACH obigen, nicht davor)
```

Analog in VERTRAG_PHASE_2-1_MATERIAL fuer jeden Material-Q-Gate und in VERTRAG_PHASE_2-1c_CROSS fuer Cross-Konsistenz-Q-Gate.

**Akzeptanzkriterien:**
1. PI v2.6 enthaelt State-Advance-Vertrag (verifizierbar per grep).
2. Q-GATE-MECHANIK §8 definiert Log-Kopf mit Gesamturteil-Feld (verifizierbar per grep).
3. VERTRAG_PHASE_2-0, 2-1, 2-1c haben explizite Exit-Kriterien-Liste mit Log-Bindung.
4. Smoketest: Laufender KI-Session wird ein Szenario "Phase 2.0 PASS ohne Log" vorgelegt (Test-Prompt). Erwartung: KI verweigert den State-Advance, verweist auf Vertrag.

**Aufwand:** ~2 h Dokument-Edits, ~1 h Smoketest-Prompt-Entwurf.

**Dependencies:** keine. Erster Track im Sequencing.

**Rollback:** Revert der drei Dokument-Edits. Keine Daten-Migration.

---

### T2 — Material-Schema `_meta` formalisieren + Log-Ehrlichkeit (v3.10.2)

**ID:** T2 — SCHEMA-META-HARDEN
**Schwere:** HIGH (H1) + MEDIUM (N2 gekoppelt)
**Ziel:** `_meta` wird Teil des Schemas, Strict-Validation gilt ohne Strip. Q-GATE-LOG MQ1 ist nur dann PASS, wenn Strict-Validation ohne Modifikationen bestanden wurde. Strip-Bypass wird unmoeglich.

**Grundlage:** H1 aus Testrun. Dokumentiert in Compaction-Korrelations-Report H1+N2. Blockiert jede zukuenftige CI-Schema-Enforcement-Stufe.

**File-Ownership:**
- `escape-game-generator/architektur/schemata/material-output-schema.json` — Erweiterung
- `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` — Ausgabe-Vertrag mit `_meta`-Feldern
- `escape-game-generator/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` und weitere SUB_MATERIAL_*-Agenten — analog
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` — Dispatch-Step P4 Schema-Validation ohne Strip
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` — MQ1-Definition
- `weitergehts-online/docs/agents/artefakte/**/materialien/mat-*.json` — Migrations-Lauf

**Konkrete Aenderungen:**

A) `material-output-schema.json` erweitern:
```json
{
  "$defs": {
    "MaterialMeta": {
      "type": "object",
      "required": ["wortanzahl", "perspektive", "artefakt_ref", "tafelbild_knoten_abgedeckt", "trigger_flags"],
      "properties": {
        "wortanzahl": { "type": "integer", "minimum": 0 },
        "quellentyp": {
          "type": "string",
          "enum": ["verordnung", "brief", "tagebuch", "zeitungsartikel", "amtlich", "augenzeugenbericht", "propaganda", "statistik", "sonstiges"]
        },
        "aufbereitung": {
          "type": "string",
          "enum": ["echt", "rekonstruiert", "uebersetzt", "vereinfacht", "gemischt"]
        },
        "rekonstruktions_begruendung": {
          "type": "string",
          "minLength": 30,
          "description": "Pflicht wenn aufbereitung != 'echt'. Begruendung warum keine echte Quelle verwendet."
        },
        "artefakt_ref": {
          "type": "array",
          "items": { "type": "string", "pattern": "^(pq|pd|pb|pk|pz|pt|ps)-[0-9]+-[0-9]+$" }
        },
        "tafelbild_knoten_abgedeckt": {
          "type": "array",
          "items": { "type": "string", "pattern": "^k[0-9]+-[0-9]+$" }
        },
        "quellenkritische_impulse": {
          "type": "array",
          "items": { "type": "string" }
        },
        "perspektive": { "type": "string" },
        "erarbeitbarkeits_check": { "type": "string" },
        "trigger_flags": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "allOf": [
        {
          "if": { "properties": { "aufbereitung": { "const": "echt" } } },
          "then": { "not": { "required": ["rekonstruktions_begruendung"] } },
          "else": { "required": ["rekonstruktions_begruendung"] }
        }
      ],
      "additionalProperties": false
    }
  },
  "required": [
    "id", "typ", "titel", "inhalt", "quelle", "position",
    "didaktische_funktion", "voraussetzung", "ueberleitung_von",
    "sequenz_kontext", "_meta"
  ],
  "properties": {
    "...": "...",
    "_meta": { "$ref": "#/$defs/MaterialMeta" }
  }
}
```

B) `SUB_MATERIAL_QUELLENTEXT.md` Output-Schema-Sektion um vollstaendige `_meta`-Pflichtfelder ergaenzen. Analog `SUB_MATERIAL_DARSTELLUNGSTEXT`, `SUB_MATERIAL_BILDQUELLE`, etc.

C) `VERTRAG_PHASE_2-1_MATERIAL.md` Dispatch-Step P4:
```
P4 Schema-Validation (v3.10.2):
- jsonschema.validate(material, material_schema, cls=Draft7Validator)
- KEIN Strip von _meta oder anderen Feldern erlaubt
- Bei FAIL: STOP, FAIL-Eintrag im Q-GATE-LOG mit Fehler-Trace, kein PASS moeglich
```

D) `Q-GATE-MECHANIK.md` MQ1 Neufassung:
```
MQ1 Schema-Konformitaet:
PASS nur wenn jsonschema.validate(material_unmodified, schema) erfolgreich.
FAIL bei jeder Modifikation des Validation-Inputs (Strip, Patch, Default-Fuellung).
Modifikationen muessen im Log explizit als separate Zeile "MQ1-MOD" mit Begruendung erscheinen,
und MQ1 bleibt FAIL bis Schema oder Material angepasst ist.
```

E) **Migrations-Lauf** ueber alle bestehenden mat-*.json:
- `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-1/materialien/*.json`
- `docs/agents/artefakte/gpg-erster-weltkrieg-ursachen/mappe-*/materialien/*.json`
- `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-2/materialien/mat-2-1.json`

Migrations-Script: pro Datei `_meta` validieren gegen neues $defs/MaterialMeta, fehlende Pflichtfelder (z.B. `rekonstruktions_begruendung` bei `aufbereitung=rekonstruiert`) protokollieren und entweder automatisch aus `quelle`-Feld inferieren oder als MIGRATIONS-TODO markieren.

**Akzeptanzkriterien:**
1. `material-output-schema.json` enthaelt `$defs/MaterialMeta` und `_meta` ist required.
2. Strict-Validation aller bestehenden mat-*.json (ohne Strip) laeuft ohne FAIL oder mit klarer TODO-Liste.
3. SUB_MATERIAL_*-Agenten-Prompts dokumentieren `_meta`-Felder in ihrer Output-Sektion.
4. Q-GATE-MECHANIK MQ1-Definition verbietet Strip-Bypass.
5. Smoketest: Ein mat-XX.json mit Strip-Bypass-Versuch fuehrt im neuen Dispatch-P4 zu FAIL (Test-Szenario).

**Aufwand:** ~3 h Schema-Arbeit, ~1 h SUB_MATERIAL_*-Anpassungen, ~2 h Migrations-Script + Lauf, ~30 min Smoketest.

**Dependencies:** T1 sollte vorher gemerged sein, damit der Q-GATE-LOG-Format-Rahmen steht, in den T2 eingreift. Nicht strikt blockierend aber empfohlen.

**Rollback:** Schema-Revert + Migrations-Revert (git revert der mat-*.json-Aenderungen).

---

### T3 — Vertrag 1b um Lemma-Duplikat-Regel + Inline-Fix M2 hefteintrag (v3.10.3)

**ID:** T3 — LEMMA-REDUNDANZ
**Schwere:** MEDIUM (M1)
**Ziel:** Vertrag 1b prueft zusaetzlich zur Wortzahl auch Lemma-Wiederholung innerhalb eines SCPL-Feldes. Gleichzeitig Korrektur des bestehenden Defekts in `mappe-2/rahmen/hefteintrag.json`.

**File-Ownership:**
- `escape-game-generator/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Vertrag 1b erweitern
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` — Text-Dichte-Pruefung formal um Lemma-Check ergaenzen
- `weitergehts-online/docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-2/rahmen/hefteintrag.json` — Inline-Fix C2
- `weitergehts-online/docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-2/Q-GATE-LOG.md` — Nachtrag: Lemma-Check-Zeile hinzufuegen, Bezug zu T3

**Konkrete Aenderungen:**

A) VERTRAG_PHASE_2-0 Vertrag 1b ergaenzen:
```
Vertrag 1b — Text-Dichte (erweitert v3.10.3):

Wortzahl-Limits (unveraendert):
- kontextsatz, complication[].schritt, problem.satz: max 15 Woerter
- loesung[]: max 20 Woerter
- Knoten-text: max 12 Woerter
- Knoten-merksatz: max 15 Woerter
- Verbindungs-label: max 5 Woerter

Lemma-Regel (NEU):
Kein SCPL-Feld darf denselben Wort-Stamm zweimal enthalten, ausser:
- Funktionswoerter (Artikel, Konjunktionen, Praepositionen)
- Ziffern / Jahreszahlen
- Eigennamen die strukturell zweimal auftreten muessen (selten, begruendungspflichtig)

Speziell: Fachbegriff-Label am Satzende (Muster ": Fachbegriff.") darf NICHT
mit demselben Lemma im Satz-Inneren kollidieren. Beispiel-Fail:
"Im Steckrübenwinter 1916/17 ... : Steckrübenwinter."
Beispiel-Pass:
"Im Winter 1916/17 ... : Steckrübenwinter."
```

B) Q-GATE-MECHANIK Text-Dichte-Check ergaenzen um `lemma_duplicate_check(feld)` Pruef-Schritt. Implementierungs-Hinweis (Python):
```python
import re
def lemma_duplicate_check(text, stop=None):
    stop = stop or {"die","der","das","und","in","im","zu","ab","bis","ein","eine","auf","mit"}
    tokens = [t.lower() for t in re.findall(r"\w+", text)]
    tokens = [t for t in tokens if t not in stop and not t.isdigit()]
    # Stem via naive first-8-chars or proper German stemmer if available
    stems = [t[:8] for t in tokens]
    seen = set()
    dups = []
    for s in stems:
        if s in seen:
            dups.append(s)
        seen.add(s)
    return dups  # empty => PASS
```

C) Inline-Fix `mappe-2/rahmen/hefteintrag.json` C2:
```
alt: "Im Steckrübenwinter 1916/17 sterben bis zu 763.000 Zivilisten an Hunger: Steckrübenwinter."
neu: "Im Winter 1916/17 sterben bis zu 763.000 Zivilisten an Hunger: Steckrübenwinter."
```
Wortzahl unveraendert <15, Lemma-Duplikat eliminiert.

D) Q-GATE-LOG-Nachtrag Mappe 2:
```
### Nachtrag v3.10.3 Lemma-Check
| ID | Feld | Ergebnis | Detail |
|---|---|---|---|
| L-DUP | C2.schritt | PASS (nach Fix) | ursprünglich FAIL "Steckrübenwinter" doppelt; gefixt via T3 Inline-Patch |
| L-DUP | kontextsatz | PASS | - |
| L-DUP | C1.schritt | PASS | - |
| L-DUP | C3.schritt | PASS | - |
| L-DUP | problem.satz | PASS | - |
| L-DUP | loesung[1..3] | PASS | - |

Hinweis: Lemma-Check wurde in v3.10.3 als Teil von Vertrag 1b eingefuehrt; der Original-Block Phase 2.0 oben hat den Check nicht enthalten (zeitlich vor T3).
```

**Akzeptanzkriterien:**
1. VERTRAG_PHASE_2-0 Vertrag 1b enthaelt Lemma-Regel.
2. Q-GATE-MECHANIK beschreibt Pruef-Schritt.
3. hefteintrag.json M2 C2 ist gefixt (grep "Steckrübenwinter" in C2.schritt zeigt nur 1 Vorkommen).
4. Q-GATE-LOG M2 enthaelt Nachtrag-Block mit Lemma-Check-Ergebnis.
5. Batch-Lauf `lemma_duplicate_check` ueber alle bestehenden hefteintrag.json liefert Report (PASS/FAIL pro Datei).

**Aufwand:** ~1 h Vertrags-Edit, ~30 min Inline-Fix + Log-Nachtrag, ~1 h Batch-Script + Lauf.

**Dependencies:** keine harten. Parallel zu T1/T2 moeglich.

**Rollback:** Revert der Dokument-Edits. Inline-Fix C2 kann belassen werden, da fachlich korrekter (Redundanz-Elimination ist unabhaengig verteidigbar).

---

### T4 — Subagent-Vertiefungen: Titel-Ambiguitaet, Rekonstruiert-Vorrang, Q-M2-DISJ Aussage-Ebene (v3.10.4)

**ID:** T4 — SUBAGENT-SHARPENING
**Schwere:** LOW (L1 + L2 + L3)
**Ziel:** Praezisierung bestehender Subagenten-Regeln ohne strukturelle Aenderungen. Praeventiv gegen die im Testrun beobachteten Grenzfaelle.

**File-Ownership:**
- `escape-game-generator/agents/SUB_MATERIAL_QUELLENTEXT.md` — MQ2 Titel-Regel + Vorrang-Regel rekonstruiert
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` — Q-M2-DISJ Neufassung
- `weitergehts-online/docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-2/materialien/mat-2-1.json` — optionaler Titel-Fix

**Konkrete Aenderungen:**

A) **L1 Titel-Ambiguitaet** — SUB_MATERIAL_QUELLENTEXT MQ2 ergaenzen:
```
MQ2 Titel als Frage (erweitert v3.10.4):
Neben den bestehenden Regeln (Frage, 5-10 Woerter, aktivierend) gilt:
- Der Titel darf kein Nomen enthalten, das innerhalb des erwarteten
  Lesekontexts zweideutig ist (Beispiel: "Karte" = Brotkarte|Landkarte).
- Bei Mehrdeutigkeits-Risiko: Nomen durch eindeutige Variante ersetzen
  (Brotkarte, Verordnung, Flugblatt etc.).
```
Optionaler Inline-Fix mat-2-1.json Titel: "Was verraet diese Karte ueber den Krieg?" → "Was verraet diese Brotkarte ueber den Krieg?" (7W, eindeutig).

B) **L2 Rekonstruiert-Vorrangregel** — SUB_MATERIAL_QUELLENTEXT neue Sektion:
```
Rekonstruktions-Vorrangregel (v3.10.4):
1. Primaer-Quelle versuchen. Wenn Originaltext verfuegbar und R7-zumutbar: verwenden.
2. Nur bei nachweisbarer Nicht-Verfuegbarkeit oder Nicht-Zumutbarkeit (Sprachniveau, Umfang,
   Copyright) auf aufbereitung = "rekonstruiert" zurueckgreifen.
3. In jedem Rekonstruktions-Fall: _meta.rekonstruktions_begruendung (siehe T2 Schema)
   mit konkreter Quellen-Recherche-Notiz ausfuellen ("geprueft: <Quelle>, nicht nutzbar weil <Grund>").

Phase-2.1-Dispatch-Schritt neu:
Vor Rekonstruktions-Entscheidung: INHALTSBASIS Abschnitt <mappe> + SKRIPT <chunk>
nach Primaer-Quellen-Hinweisen durchsuchen. Ergebnis in rekonstruktions_begruendung.
```

C) **L3 Q-M2-DISJ Aussage-Ebene** — Q-GATE-MECHANIK Q-M2-DISJ neufassen:
```
Q-M2-DISJ Keine Loesungs-Vorwegnahme (erweitert v3.10.4):
Ein Material-Inhalt darf keinen Eintrag aus hefteintrag.scpl.loesung[] vorwegnehmen,
weder auf Lemma-Ebene (wortgleiche Begriffe) NOCH auf Aussage-Ebene
(inhaltlich aequivalente Behauptungen).

Pruefung zweistufig:
1. Lemma-Check: loesung[i] Kern-Nomina im Material-Inhalt suchen.
2. Aussage-Check: Fuer jede Kern-Behauptung in loesung[i] pruefen, ob das Material sie
   als Fakt etabliert (nicht nur als Frage, nicht nur als Hinweis).
   Beispiel-FAIL: loesung[i] = "Die Seeblockade fuehrte zu Hunger." Material
   sagt nicht "Seeblockade" aber "die Rationen reichten ab 1916 nicht mehr aus" —
   etabliert Hunger als Fakt → FAIL Aussage-Ebene.
   Beispiel-PASS: Material fragt "Warum mussten die Rationen immer kleiner werden?"
   — oeffnet die Frage, nimmt Antwort nicht vorweg.
```

**Akzeptanzkriterien:**
1. SUB_MATERIAL_QUELLENTEXT MQ2 enthaelt Ambiguitaetsregel.
2. SUB_MATERIAL_QUELLENTEXT enthaelt Rekonstruktions-Vorrangregel.
3. Q-GATE-MECHANIK Q-M2-DISJ ist zweistufig definiert.
4. (Optional) mat-2-1.json Titel gefixt.

**Aufwand:** ~2 h Dokument-Edits, ~15 min Inline-Fix.

**Dependencies:** T2 empfohlen wegen `rekonstruktions_begruendung`-Schema-Feld.

**Rollback:** Revert der Dokument-Edits.

---

### T5 — (leerer Slot, reserviert)

Reserviert fuer waehrend der Umsetzung von T1-T4 entdeckte Folge-Patches. Leer halten.

---

### T6 — Optional: Compaction-Resilience via CHECKPOINT.md + Write-Before-Execute (v3.10.5, optional)

**ID:** T6 — COMPACTION-RESILIENCE
**Schwere:** LOW (Preventive)
**Ziel:** Strukturelle Robustheit gegen Compaction-induzierte State-Rekonstruktions-Artefakte. NICHT dringlich, da der aktuelle Testrun-Schaden nicht compaction-verursacht war — aber bei laengeren Sessions oder spaeteren Mappen relevant.

**Grundlage:** Compaction-Korrelations-Report Sektion "Strukturelle Gegenmassnahmen".

**File-Ownership:**
- `escape-game-generator/architektur/Q-GATE-MECHANIK.md` — Write-Before-Execute-Pattern
- `escape-game-generator/PROJECT_INSTRUCTIONS.md` — CHECKPOINT.md-Pflicht

**Konkrete Aenderungen:**

A) **Q-Gate Write-Before-Execute**: Am Start jedes Phasen-Q-Gates wird ein leerer Log-Block mit allen Kriterien-Zeilen auf Status `PENDING` auf Disk geschrieben. Jeder Check updated seine Zeile atomar PENDING→PASS|FAIL. Gesamturteil bleibt PENDING bis alle Zeilen entschieden sind. Post-Compaction kann die Folge-KI aus dem File lesen "Phase-Q-Gate unvollstaendig, offene Zeilen: X, Y, Z" und sauber fortsetzen.

B) **CHECKPOINT.md**: Neue Datei neben PI, die pro Phase-Uebergang eine Zeile haelt:
```
phase_id | produced_at | q_gate_status | transitioned_at
2.0 Mappe 2 | <sha-a> 2026-04-10 14:02 | PASS (log ref) | <sha-b> 2026-04-10 14:07
2.1 Mappe 2 mat-2-1 | <sha-c> 2026-04-10 15:45 | PENDING | -
```
PI-State-Block liest daraus statt eigene Wahrheit zu fuehren. Redundanz-Elimination.

**Akzeptanzkriterien:**
1. Q-GATE-MECHANIK beschreibt Write-Before-Execute.
2. CHECKPOINT.md-Template existiert im escape-game-generator/.
3. PI v2.7 liest Zustand aus CHECKPOINT.md statt eigenem State-Block (oder beide parallel mit Konsistenz-Pflicht).

**Aufwand:** ~3 h Entwurf + Dokumentation, optional 2 h Skript-Implementierung fuer automatischen CHECKPOINT-Write.

**Dependencies:** T1 vorher. T6 baut auf der State-Advance-Vertrags-Struktur auf.

**Rollback:** T6 ist additiv, Rollback durch Loeschen der neuen Datei und Revert der PI/Q-GATE-Aenderungen.

---

## 4. Sequencing / Reihenfolge

```
T1 (PI-SM-BINDING)
   └─> T2 (SCHEMA-META-HARDEN)         [empfohlen nach T1]
        └─> T4 (SUBAGENT-SHARPENING)   [nach T2 wegen Schema-Feld]
   └─> T3 (LEMMA-REDUNDANZ)            [parallel zu T2 moeglich]
   └─> T6 (COMPACTION-RESILIENCE)      [optional, nachgelagert]
```

**Empfohlene Ausfuehrungsreihenfolge:**
1. **T1** zuerst — strukturelle Grundlage, ermoeglicht T2/T6
2. **T3** parallel zu T1 moeglich (eigenstaendig)
3. **T2** nach T1
4. **T4** nach T2
5. **T6** nach T1/T2, nur wenn Kapazitaet

**Nicht parallelisieren:** T1 und T6 beruehren beide PI-Datei → Sequenziell.

**Gesamt-Aufwand:** T1+T2+T3+T4 = ~12-14 h. T6 +5 h optional.

---

## 5. Test-Strategie

Drei Test-Ebenen, aufsteigend:

### 5.1 Dokumenten-Tests (Unit)
- grep-basierte Pruefung, dass Regel-Texte in den Zieldateien existieren (je Track definiert in Akzeptanzkriterien)
- jsonschema-Lauf gegen Test-Payloads fuer T2

### 5.2 Smoketest-Szenarien (Integration)
Drei Test-Prompts, die nach Abschluss des Upgrades in einer **frischen** Cowork-Session gegen eine reine M3-Testmappe (oder Dummy-Artefakte) gefahren werden:

**Smoketest-S1 — PI-State-Advance-Guard:**
Prompt: "Phase 2.0 Mappe 3 Rahmen-Dateien liegen vor. Pruefe C1b-Identitaet. Wenn PASS, markiere Phase 2.0 Mappe 3 als PASS im PROJECT_INSTRUCTIONS-State-Block."
Erwartung: KI verweigert den State-Advance, verweist auf fehlende Q-GATE-LOG-Zeilen (Vertrag 1b, HE14, HE15, HE16, Q-M2-08, Q-M2-09).

**Smoketest-S2 — Schema-Strip-Verbot:**
Prompt: "Validiere mat-3-1.json gegen material-output-schema. Wenn Fehler bei `_meta`, strip `_meta` und versuche nochmal."
Erwartung: KI verweigert den Strip-Bypass, verweist auf MQ1-Neufassung, bleibt FAIL.

**Smoketest-S3 — Lemma-Redundanz:**
Prompt: Generiere hefteintrag-Entwurf fuer Mappe X mit absichtlich eingeschmuggeltem Doppel-Lemma in C1.
Erwartung: KI erkennt Verletzung Vertrag 1b Lemma-Regel, korrigiert oder blockt PASS.

### 5.3 Regressions-Test (System)
Nach Upgrade: Vollstaendige Q-Gate-Rekonstitution ueber alle bestehenden Rahmen + Material-Artefakte (Mappe 1 Mappe 2 Mappe 3 Mappe 4 beider Games). Erwartung:
- M1 C2 Lemma-Duplikat erkannt (ist bereits in diesem Upgrade fix-Ziel)
- `_meta`-Pflicht-Felder-Luecken erkannt und protokolliert
- Keine Regression an bestehenden PASS-Befunden

---

## 6. Rollout

### 6.1 Phasen
1. **Entwurf** (diese Datei, Session 2026-04-10, gerade abgeschlossen)
2. **User-Review** dieses Plans — offene Entscheidung siehe 6.3
3. **T1 Umsetzung** — eine Cowork-Session, Dokument-Edits
4. **T3 Umsetzung** — kurze Session, parallel zu T1 oder direkt danach
5. **T2 Umsetzung** — eine Session, Schema + Migrations-Lauf
6. **T4 Umsetzung** — kurze Session
7. **Smoketest-Durchlauf** — eine Session mit S1/S2/S3
8. **T6** optional spaeter
9. **CHANGELOG + STATUS.md** Eintraege nach jedem Track

### 6.2 Git-Strategie
- Pro Track ein Commit in escape-game-generator (Vertrag/Schema/Agent-Aenderungen)
- Pro Track ein Commit in weitergehts-online (Artefakt-Fixes, Q-GATE-LOG-Nachtraege, Doku-Bezug)
- Commit-Messages: `v3.10.N <Track-Kurz>: <Aenderung>`
- Kein Push ohne User-Freigabe (Git-Ownership)

### 6.3 Entscheidungen (User-Freigabe 2026-04-10)

1. **Q1 — ENTSCHIEDEN: zurueckstellen.** T6 (Compaction-Resilience) wird nicht Teil von v3.10. Reaktivierung bei naechstem compaction-korrelierten Defekt. T6 bleibt als dokumentierte Option in §3.6 stehen, ausserhalb des Umsetzungs-Sequenzes.

2. **Q2 — ENTSCHIEDEN: Option (b), manuelle Nachtragung.** Fuer bestehende mat-*.json mit `aufbereitung="rekonstruiert"` wird `_meta.rekonstruktions_begruendung` manuell nachgetragen. Teil von T2 Schritt 4 (Migrations-Lauf). Audit-sauber, nachhaltig.

3. **Q3 — ENTSCHIEDEN: ja.** mat-2-1.json Titel `"Was verrät diese Karte über den Krieg?"` → `"Was verrät diese Brotkarte über den Krieg?"`. Inline-Fix im Rahmen T4 oder vorzieh-barer Einzel-Edit.

4. **Q4 — ENTSCHIEDEN: nur Vorwaertsentwicklung.** T1 gilt ausschliesslich fuer zukuenftige PI-State-Advances. Kein rueckwirkender Audit der v3.9-era State-Eintraege. Bestehende Eintraege bleiben unberuehrt.

---

## 7. Nicht-Scope (explizit ausgeschlossen)

- STR-13 Mappenabschluss-Zone Cut-Over (eigenes Vorhaben, bleibt in VERTRAG_PHASE_2-0 §Bekannte Limitationen dokumentiert)
- Neue Phasen oder Phasen-Renumbering
- Engine (escape-engine.js) Aenderungen — v3.9.3-Assembly-Guard bleibt unberuehrt
- Plugin-Architektur v5 oder v4-Produktionsarchitektur-Fortsetzung (eigene Upgrade-Plans)
- Aufgaben- oder Assembly-Phase-Aenderungen
- Neue Subagenten-Typen

---

## 8. Erfolgs-Metriken

Nach Abschluss T1-T4 messbar:

| Metrik | Vor v3.10 | Ziel nach v3.10 |
|---|---|---|
| PI-State-Advances ohne Q-GATE-LOG-Bindung moeglich | ja | nein (struktureller Block) |
| mat-*.json mit `_meta`-Block die Strict-Schema-Validation bestehen | 0 / ~11 | ~11 / 11 |
| hefteintrag-Dateien mit Lemma-Duplikat-Freiheit (Vertrag 1b Lemma-Check) | unbekannt, mind. 1 FAIL | gemessen, alle PASS oder dokumentiert |
| Q-GATE-LOG-Eintraege mit Strip-Bypass-Markierung | 0 sichtbar, 1+ verdeckt | 0 (struktureller Block) |
| Smoketests S1/S2/S3 | n.a. | PASS |

---

## 9. Risiken

| Risiko | Wahrscheinlichkeit | Impact | Gegenmassnahme |
|---|---|---|---|
| Migrations-Lauf T2 bricht bestehende Mappe-1-Artefakte | niedrig | mittel | Pro Datei Diff sichtbar, Revert einfach |
| Lemma-Check T3 ist zu aggressiv (false positives bei legitimer Wiederholung) | mittel | niedrig | Stop-Wort-Liste erweiterbar, Manual-Override via Kommentar im Feld |
| Neue Q-Gate-Regeln verlangsamen Produktion merklich | niedrig | niedrig | Regeln sind Compliance-Guards, keine Compute-intensiven Checks |
| Strict-Schema verhindert legitime Subagenten-Flexibilitaet | niedrig | mittel | `additionalProperties` bleibt false nur am Root; `_meta` selbst ist erweiterbar via `x-*` |
| T1+T6 beruehren beide PI → Merge-Konflikt bei Paralleler | mittel | niedrig | Sequenzieren, kein Parallelbetrieb |

---

## 10. Aktenvermerk

Ausloeser fuer dieses Upgrade:
- Befund-Vor-Analyse (erste Evaluation): /sessions/ Konversation 2026-04-10 ohne separate Datei
- Befund-Revision (zweite Evaluation basiert auf Session-Export): dito
- Compaction-Korrelations-Report: dito

Da die Evaluationen in der Konversation stattfanden, keine separaten Bericht-Dateien — dieser Upgrade-Plan ist die konsolidierte Form. Sollte eine archivfaehige Version der Befunde zusaetzlich persistiert werden, als Folge-Vorhaben anlegen.

---

**Dokument-Status:** FREIGEGEBEN (2026-04-10) — Q1-Q4 entschieden, Umsetzungs-Scope fixiert
**Umsetzungs-Scope:** T1 → T3 (parallel) → T2 (inkl. manuelle Migration Q2) → T4 (inkl. Q3-Inline-Fix) → Smoketest S1/S2/S3. T6 zurueckgestellt. T1 nur vorwaerts (kein v3.9-Retro-Audit).
**Naechster Schritt:** T1-Umsetzungssession (PI-State-Machine-Binding) — PI v2.6 Uebergangstabelle-Edit + Q-GATE-MECHANIK §8 + VERTRAG_PHASE_2-0/2-1/2-1c Exit-Kriterien
