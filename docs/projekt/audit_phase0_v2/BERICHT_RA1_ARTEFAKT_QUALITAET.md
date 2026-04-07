# AUDIT PHASE 0 — RA1: Artefakt-Qualitaet (v2)

**Agent:** RA1 (Review-Agent 1)
**Dimension:** Artefakt-Qualitaete
**Audit-Datum:** 2026-04-06
**Basis-Dokumente:**
- VERTRAG_PHASE_0-1_DIDAKTIK.md (v1.1)
- VERTRAG_PHASE_0-2_INHALT.md (v1.1)
- VERTRAG_PHASE_0-3_SKRIPT.md (v1.1)
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md (v1.0)
- GUETEKRITERIEN_SKRIPT.md (v1)
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (v3.1)
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md (Vorgaenger RA1-5, v1)
- WORKFLOW_v4.1

**Vorgaenger-Audit:** BEFUND_PHASE_0_QUALITAETS_AUDIT.md (v1, 2026-04-06)
**Status:** v2 — Vertiefter RA1-Fokus auf Operationalisierung, Toleranzen, Propagation

---

## 1. Zusammenfassung

Die Phase-0-Vertraege bilden eine logisch konsistente Artefakt-Kette (DIDAKTIK_RAHMEN → INHALTSBASIS → SKRIPT → TAFELBILD), jedoch mit kritischen **Operationalisierungs-Luecken**, die eine standardisierte Qualitaetsprüfung erschweren. Hauptbefunde:

1. **Schwellenwerte sind teils vage formuliert:** "≥8 Fakten pro Mappe", "600-900 W pro Chunk" haben toleranzen, aber keine zweistufige WARN/FAIL-Abstufung bei Grenzfaellen. Ein Chunk mit 550 W liegt im gleichen FAIL-Raum wie ein Chunk mit 350 W.

2. **SCPL-Ableitbarkeit nicht operationalisiert:** QS8 (TAFELBILD-Ableitbarkeit) und QH-RC2 (Erarbeitbarkeits-Nachweis) pruefen abstrakt gegen Marker, nicht gegen konkrete Semantik der Skript-Tafelbilder.

3. **Phase-2.0-JSON-Kompatibilitaet unvalidiert:** TAFELBILD-JSON (Phase 0.4) soll 1:1 als hefteintrag.json (Phase 2.0) übernommen werden, aber es gibt kein formales Schema und keine Validierungsprüfung fuer Konsistenz und Feldvollstaendigkeit.

4. **Artefakt-ID-Propagation nicht vertraglich verankert:** img-X-Y, zit-X-Y, rolle-X-Y IDs werden definiert (Phase 0.2), referenziert (Phase 0.3), aber die Pflicht-Ueberfuehrung in Phase-1-Formate ist nicht spezifiziert.

5. **Output-Vollstaendigkeit mit Luecken:** Pflicht-Sektionen sind definiert, aber Minimalvorgaben fuer konkrete Feldvollstaendigkeit (z.B. "jedes Tafelbild hat 1-3 Kernerkenntnisse") sind teil-quantifiziert, teil-qualitativ.

6. **Messbarkeit: Binaere vs. semantische Kriterien:** 60% der Q-Gate-Kriterien sind binaer pruefbar (QI1 Vollstaendigkeit Struktur, QH1 Header), 40% erfordern semantische Interpretation (QI4 DIDAKTIK_RAHMEN-Abdeckung: "Jede KE hat 3 stuetzende Fakten" — wie definiert man "Stuetzung"?).

**Delta zu v1 (Vorgaenger-Audit):** Diese Befunde bauen auf K1-K4 und QA-C1/C2/H1-H10 auf, operationalisieren sie aber konkreter fuer RA1-Dimension. Vorgaenger identifizierte Gaps, RA1-v2 quantifiziert und priorisiert.

---

## 2. Findings

### [RA1-F01] Schwellenwerte nicht zweistufig toleriert

**Severity:** HIGH
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-3_SKRIPT
**Beschreibung:** 
Schwellenwerte (≥8 Fakten pro Mappe, 600-900 W pro Chunk, ≥3 Artefakt-Marker pro Chunk) sind als Punkt-Spezifikation oder mit einleitiger Toleranz (+10%) formuliert. Es gibt kein zweistufiges System fuer Grenzfaelle: WARN-Zone (Gelb, noch akzeptabel mit Hinweis) vs. FAIL-Zone (Rot, nicht akzeptabel, Nachbesserung erforderlich). Konsistenz ist nicht gegeben — manche Kriterien haben Toleranzen (QS3 ±10%), andere nicht (QI3 "≥8 Fakten", kein Minusband).

**Evidenz:**
- INHALTSBASIS-Vertrag (QI3): "Mindestens 8 Fakten pro Mappe" — keine Toleranz genannt. Ein Chunk mit 7 Fakten ist FAIL ohne Graustufung.
- SKRIPT-Vertrag (QS3): "Chunk-Laenge 600-900 W (±10% Toleranz)" — explizit, aber ±10% = 540-990 W. Kein WARN bei 550 W?
- Keine Konsistenz ueber alle Vertraege: Schwellenwerte werden teils mit Toleranz (SKRIPT), teils ohne Toleranz (INHALTSBASIS, HEFTEINTRAG-Marker) definiert.

**Impact:**
- Agenten haben keine eindeutige Eskalations-Leitlinie bei Grenzfaellen. Muss ich nachbessern (1 Fakt zu wenig) oder eskalieren (Mappe-Merge)?
- Self-Check wird inkonsistent: AGENT_INHALT kann 7 Fakten mit Nachbesserung akzeptieren, AGENT_SKRIPT ist klarer strukturiert.
- User-Validierung erhaelt uneinheitliche Befunde ohne klare Severity-Abstufung.

**Recommended Fix:**

Zweistufiges Toleranz-Modell in alle Schwellenwert-Kriterien einfuehren:

```
**QI3-Revised (Fakten-Vollstaendigkeit):**
- GRUEN: ≥8 Fakten pro Mappe → PASS
- GELB (WARN): 6-7 Fakten pro Mappe → WARN, Nachbesserung empfohlen
- ROT (FAIL): <6 Fakten pro Mappe → FAIL, Mappe-Merge oder Lücken-Schließung erforderlich

**QS3-Revised (Chunk-Wortanzahl):**
- GRUEN: 600-900 W → PASS
- GELB (WARN): 540-600 W ODER 900-990 W → WARN, Kuerzung/Ergaenzung empfohlen
- ROT (FAIL): <540 W ODER >990 W → FAIL, Ueberarbeitung erforderlich

Analog fuer QS4 (≥3 Artefakt-Marker), QH2 (Stundenfrage ≤12 W), QH4 (Kernerkenntnisse ≤15 W/Satz).
```

**Delta zu v1:** NEU (Vorgaenger QA-M6 identifiziert Schwellenwert-Problematik, RA1-F01 operationalisiert konkrete Zwei-Stufen-Losung)

---

### [RA1-F02] SCPL-Ableitbarkeit nicht operationalisiert

**Severity:** HIGH
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT (QS8), VERTRAG_PHASE_0-4_HEFTEINTRAG (§2-3, QH5)
**Beschreibung:**
Vertrag QS8 fordert "Tafelbild-Entwurf muss als Grundlage fuer AGENT_HEFTEINTRAG dienen" — aber es gibt kein formales Mapping-Protokoll, wie ein Skript-Tafelbild-Entwurf (§3.2: "Knoten + Verbindungen + Voraussetzungen") zu einer SCPL-JSON-Struktur (HEFTEINTRAG §4) wird. QS8 nennt nur qualitativ: "(1) mindestens 1 Kernbegriff [...] spaeter als SCPL-Loesung erscheint, (2) Ordnungsmuster-Hinweis, (3) mindestens 1 kausale Verbindung".

Das Problem: Ein Skript mit korrektem Tafelbild-Entwurf (4 Knoten, 3 Verbindungen, 1 Ordnungsmuster-Hinweis) kann trotzdem nicht in ein SCPL mit semantisch validen Complication-Schritten umgewandelt werden, wenn die Verbindungen nicht semantisch analysiert werden.

**Evidenz:**
- SKRIPT-Vertrag §3.2: "Tafelbild-Entwurf: Knoten (ID, Text, Typ, Skript-Ref) + Verbindungen (Von→Nach, Label)". Keine Semantik-Konvention. Label könnte sein: "chronologisch", "kausal", "kategorial" — aber keine Vorgabe.
- QS8: "Kernbegriff, Ordnungsmuster-Hinweis, Verbindungsstruktur muessen erkennbar sein" — "erkennbar" ist nicht operationalisiert. Erkennbar fuer wen? Ist "Kaiser Wilhelm II. (Knoten) → erklaert Machtverhältnisse → Dreibund (Knoten)" eine kausalhafte oder kategoriale Verbindung?
- HEFTEINTRAG §2, Aufgabe 3: "Ordnungsmuster waehlen" — aber es gibt keine Pruefung, ob das gewaehte Ordnungsmuster zu den Tafelbild-Verbindungen passt.

**Impact:**
- AGENT_HEFTEINTRAG muss den Tafelbild-Entwurf ohnehin neu strukturieren (nicht erwaehnt, aber praktisch). Wenn Semantik nicht klar ist, wird das zur raterei.
- QS8-Pruefung ist nicht reliabel: Ein Agent koennte "PASS" pruefen, obwohl der Entwurf sich schlecht zu SCPL mapping.
- Downstream-Risk: Wenn AGENT_HEFTEINTRAG ein "FAIL"-Urteil faellt (SCPL nicht ableitbar), gibt es keinen klaren Feedback-Loop zur Revision des SKRIPT-Tafelbilds (nur: "Ruecklauf mit praezisem Finding", SKRIPT-Vertrag §5 letzte Zeile).

**Recommended Fix:**

Semantisches Mapping-Protokoll in SKRIPT-Vertrag einfuehren:

```
**QS8-Revised (SCPL-Ableitbarkeit):**

Pruefprotokoll fuer Tafelbild-Entwurf:
1. Pro Verbindung: Label klassifizieren in Typ:
   - K (kausal): "A fuehrt zu B", "A causa B"
   - Z (zeitlich): "A -> B (nachher)", Pfeile folgen Chronologie
   - R (relational): "A gehoert zu B", "A ist Art von B"
   - K (kontrastierend): "A vs. B" (explizit Gegenueberstellung)
   - P (parallel): "A und B sind beide X" (parallele Aehnlichkeit)

2. Ordnungsmuster-Mapping:
   - Wenn Entwurf Typ K (kausal) und K (kontrastierend) mischt → Ordnungsmuster = "parallel-kausal"
   - Wenn Entwurf nur Typ Z → Ordnungsmuster = "sequenziell"
   - Wenn Entwurf nur Typ R → Ordnungsmuster = "konzept-beispiel"
   - etc.

3. Minimalvorgaben fuer SCPL-Strukturierbarkeit:
   - Mindestkomplexitaet: ≥2 K-Verbindungen ODER ≥3 Knoten mit Z-Sequenzialisierbarkeit (fuer Complication[])
   - Kernerkenntnisse: ≥1 Knoten als "Loesung-Kandidat" erkennbar (wird spaeter zu scpl.loesung[])
   - Kontextsatz: Mindestens 1 Knoten als "Situation-Anker" erkennbar (z.B. "Kaiser Wilhelm II. 1888")

FAIL wenn: Entwurf kann nicht in diese 3 Punkte gemappt werden.
WARN wenn: Mapping ist technisch moeglich, aber Semantik ist ambig (z.B. Knoten "Weltkrieg" koennter Situation oder Loesung sein).
```

Mit dieser Vorgabe koennte QS8 maschinenguelt geprueft werden — Agent muesste das Mapping explizit dokumentieren, bevor HEFTEINTRAG-Agent arbeitet.

**Delta zu v1:** BESTAETIGT (Vorgaenger QA-H7 identifiziert Luecke, RA1-F02 bietet operationalisiertes Mapping-Protokoll)

---

### [RA1-F03] Phase-2.0-JSON-Kompatibilitaet nicht validiert

**Severity:** HIGH
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG, WORKFLOW_v4.1
**Beschreibung:**
HEFTEINTRAG-Vertrag §4 definiert ein JSON-Ausgangsformat (scpl, stundenfrage, ordnungsmuster, fachbegriffe, knoten, verbindungen, transfer, voraussetzungen). Dieser JSON soll in Phase 2.0 "1:1 als `rahmen/hefteintrag.json` übernommen" werden (Klausel: "Phase-2.0-Kompatibilitaetsklausel"). 

Aber:
- Es gibt kein formales JSON-Schema (.json-schema Datei), gegen das der Output validiert wird.
- Feldnamen sind de facto nicht kanonisiert (ist es "scpl" oder "scpl_struktur"? ist es "loesung" oder "kernerkenntnisse"? beide werden im Beispiel benutzt).
- Placeholder-Konvention "[REVISION IN 2.1c]" ist nicht maschinell pruefbar (String-Matching moglich, aber keine semantische Validierung).
- QH-RC1 fordert "JSON-Struktur valide", aber das ist nicht gegen ein Schema pruefbar.

**Evidenz:**
- HEFTEINTRAG §4, JSON-Beispiel (Zeilen 68-89): Struktur wird exemplarisch gezeigt, aber keine JSON-Schema XSD oder JSON-Linting-Regel existiert.
- Zeilen 92-95: "Dieser JSON wird in Phase 2.0 [...] uebernommen" + "[REVISION IN 2.1c]" als Placeholder fuer Felder, die erst in Phase 2.1c gefuellt werden. Keine Regel, wie Agent pruefen soll, ob [REVISION]-Marker korrekt gesetzt sind.
- WORKFLOW_v4.1: Keine Referenz auf JSON-Schema. Phase-2-Vertraege (noch nicht geschrieben) koennten andere Feldnamen erwarten.

**Impact:**
- Downstream-Integration ist fehlerhaft: Wenn Phase 2.0 ein anderes Schema erwartet, propagieren sich Fehler zur Laufzeit, nicht zur Review-Zeit.
- Q-Gate QH-RC1 ("Phase-2.0-Kompatibilitaet") ist nicht reproduzierbar. Verschiedene Reviewer koennten zu unterschiedlichen Ergebnissen kommen.
- Manuelle Uebergangskonvertierung (Phase 0.4 → Phase 2.0) erfordert heuristisches Mapping, nicht deterministische Transformation.

**Recommended Fix:**

1. **Formales JSON-Schema schreiben:**
```json
// docs/schemas/hefteintrag.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Hefteintrag-Struktur (Phase 0.4 / Phase 2.0)",
  "type": "object",
  "required": ["stundenfrage", "scpl", "ordnungsmuster", "fachbegriffe"],
  "properties": {
    "stundenfrage": {
      "type": "string",
      "maxLength": 120,
      "pattern": ".*\\?" // Muss Fragenzeichen enthalten
    },
    "scpl": {
      "type": "object",
      "required": ["situation", "complication", "problem", "loesung"],
      "properties": {
        "situation": {
          "type": "object",
          "required": ["kontextsatz"],
          "properties": {
            "kontextsatz": {"type": "string", "maxLength": 300}
          }
        },
        "complication": {
          "type": "array",
          "minItems": 1,
          "items": {"type": "object", "required": ["schritt"]}
        },
        "problem": {
          "type": "object",
          "required": ["satz"],
          "properties": {
            "satz": {"type": "string", "maxLength": 200}
          }
        },
        "loesung": {
          "type": "array",
          "minItems": 1,
          "maxItems": 3,
          "items": {"type": "string", "maxLength": 200}
        }
      }
    },
    "ordnungsmuster": {
      "type": "string",
      "enum": ["kausal", "chronologisch", "kategorial", "parallel-kausal", "kontrastierend", "sequenziell", "metaphorisch", "relational", "konzept-beispiel"]
    },
    "fachbegriffe": {
      "type": "array",
      "items": {"type": "string"}
    },
    "knoten": {"type": "array"},
    "verbindungen": {"type": "array"}
  }
}
```

2. **QH-RC1 mit Validierungs-Schritt ausstatten:**
```
QH-RC1-Revised (Phase-2.0-Kompatibilitaet):
- JSON-Output gegen hefteintrag.schema.json validieren (automatisch)
- Keine [REVISION]-Platzhalter in "zusammenfassung" oder "ueberleitung" (sind nicht Pflicht in Phase 0.4)
- Alle Felder, die Phase 2.0 erwartet, sind vorhanden oder explizit als Phase-2.1c-Placeholder markiert
```

**Delta zu v1:** BESTAETIGT (Vorgaenger K3 identifiziert Luecke, RA1-F03 gibt konkrete JSON-Schema-Loesung)

---

### [RA1-F04] Artefakt-ID-Propagation nicht vertraglich verankert

**Severity:** HIGH
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT, VERTRAG_PHASE_0-3_SKRIPT, VERTRAG_PHASE_0-4_HEFTEINTRAG
**Beschreibung:**
INHALTSBASIS definiert Artefakt-IDs (img-2-3, zit-1-1, rolle-3-2). SKRIPT referenziert sie per [ARTEFAKT]-Marker. HEFTEINTRAG soll "Artefakte integrieren" (G5). Aber es gibt keine vertraglich definierte Ueberfuehrung in Phase-1-Formate:
- Wo landen diese IDs nach Phase 0? In welche Phase-1-Datenstruktur?
- Welche ID-Formate erwartet MATERIAL_GERUEST oder ARTEFAKT_INVENTAR (Phase 1)?
- Sind die IDs unveraenderlich, oder duerfen sie in Phase 1 renummeriert werden?

**Evidenz:**
- INHALTSBASIS §4: "ID-Konventionen: img-[mappe]-[laufnummer]" — klar definiert.
- SKRIPT §3.3: "[ARTEFAKT: {id} | {typ} | {beschreibung}]" — Marker-Syntax klar.
- HEFTEINTRAG §3, Aufgabe 5: "Erarbeitbarkeits-Pruefung: Pro SCPL-Schritt [...] DIRECT / ARTIFACT / INFERENTIAL" — aber wie wird "ARTIFACT" konkret gegen eine img-X-Y-ID geprueft?
- HEFTEINTRAG §4: Keine "artefakt_references" im JSON-Output! Kernerkenntnisse (scpl.loesung[]) enthalten keine Verweise auf Quell-Artefakte.
- QH-RC2 (Phase-1-Erarbeitbarkeit): "fuer jeden SCPL-Schritt ist mindestens ein Materialtyp denkbar" — aber keine Referenz zu INHALTSBASIS-Artefakten.

**Impact:**
- Phase-1-Agenten bekommen HEFTEINTRAG-JSON ohne Artefakt-Referenzen. Sie muessen per Rueckwaerts-Matching (HEFTEINTRAG-Text → SKRIPT-Marker → INHALTSBASIS-ID) rekonstruieren, welche Artefakte relevant sind.
- Keine Sicherheit, dass alle INHALTSBASIS-Artefakte tatsaechlich in Phase-1-Materialien landen. Ein Artefakt koennten vergessen werden.
- Q-Gate QI4 ("Artefakt-Qualitaet") prueft nicht, dass jedes Artefakt mindestens einmal in HEFTEINTRAG referenziert ist.

**Recommended Fix:**

1. **HEFTEINTRAG-JSON um "artefakt_referenzen" ergaenzen:**
```json
{
  "stundenfrage": "...",
  "scpl": {...},
  "artefakt_referenzen": [
    {
      "id": "img-2-3",
      "typ": "bildquelle",
      "beschreibung": "Kriegsfotografie aus Verdun",
      "verarbeitungsort": ["scpl.complication[0].schritt", "scpl.loesung[0]"],
      "erarbeitbarkeit": "ARTIFACT"
    },
    {
      "id": "zit-1-2",
      "typ": "quellentext",
      "beschreibung": "Feldpostbrief",
      "verarbeitungsort": ["scpl.situation.kontextsatz"],
      "erarbeitbarkeit": "DIRECT"
    }
  ]
}
```

2. **QI-RC1 (Rueckwaerts-Kontingenz) in INHALTSBASIS definieren:**
```
QI-RC1-Revised (Artefakt-Durchgaengigkeit):
Jedes Artefakt aus INHALTSBASIS (img-X-Y, zit-X-Y, rolle-X-Y) muss:
a) Mindestens 1x im SKRIPT referenziert sein (via [ARTEFAKT]-Marker)
b) Im HEFTEINTRAG JSON aufgelistet sein (in "artefakt_referenzen[]")
c) Mit konkreter "verarbeitungsort" (SCPL-Pfad) gekennzeichnet sein
FAIL wenn: Artefakt definiert, aber nicht referenziert; oder referenziert, aber keine Verarbeitungsort.
```

3. **HEFTEINTRAG §3, Aufgabe 5 (Erarbeitbarkeits-Pruefung) konkretisieren:**
```
Erarbeitbarkeits-Nachweis: Pro SCPL-Schritt:
- DIRECT: Text kann direkt aus Materialanalyse abgeleitet werden (z.B. Faktenlesen)
- ARTIFACT: Text erfordert Artefakt-Analyse (Quellentext interpretieren, Bild analysieren). 
  → Muss artefakt_referenzen[] enthalten mit konkreter img/zit/rolle ID
- INFERENTIAL: Text erfordert Schlussfolgerung aus Material (z.B. Vergleich zweier Quellen)
  → Sollte mindestens 2 Artefakt-Referenzen enthalten
```

**Delta zu v1:** BESTAETIGT (Vorgaenger QA-L1 und K4 identifizieren Luecke, RA1-F04 operationalisiert JSON-Integration)

---

### [RA1-F05] Output-Vollstaendigkeit mit Grenzfaellen

**Severity:** MEDIUM
**Betroffene Vertraege:** Alle 4 Phase-0-Vertraege
**Beschreibung:**
Pflicht-Sektionen sind in allen Vertraegen definiert (z.B. DIDAKTIK §3: 8 Pflicht-Sektionen). Aber es gibt keine explizite Pflicht-Minimalvorgabe fuer manche Felder:
- DIDAKTIK QD2 "KE-Vollstaendigkeit": "Alle themenrelevanten KE des Lernbereichs sind beruecksichtigt" — aber wer definiert "themenrelevant"? Ist eine Sekundarverwendung von KE noch "themenrelevant"?
- INHALTSBASIS QI3 "Fakten-Vollstaendigkeit": "Mindestens 8 Fakten pro Mappe" — aber wie wird unterschieden zwischen Kernfakten, Nebenfakten und Kontextfakten?
- HEFTEINTRAG G1 "Lernziel-Kongruenz": "Jede relevante KE [...] hat min. 1 Element" — "relevant" ist nicht operationalisiert. Wenn KE-Matrix 7 KEs hat, muessen alle 7 im Tafelbild sein, oder nur die 5 "Haupt-KEs"?

**Evidenz:**
- DIDAKTIK-Vertrag §4, Sektion "Lernziele" (Zeile 40): keine Quantifizierung von Teilzielen (ist 1 pro Mappe Minimum? Maximum?).
- INHALTSBASIS-Vertrag §5, QI3: "Mindestens 1 Zitat pro Mappe" — aber ist ein Zitat-Duplikat aus Wikipedia (z.B. zwei Briefe desselben Autors) 2 Zitate oder 1?
- HEFTEINTRAG-Vertrag §3, Aufgabe 2: "Max. 3 pro Mappe, je max. 15 Woerter" — aber was zaehlt als "Kernerkenntnis"? Ist "Der Weltkrieg hatte 3 Hauptursachen" 1 oder 3 Kernerkenntnisse?

**Impact:**
- Q-Gate ist nicht streng pruefbar. Reviewer koennen bei "relevanten KEs" oder "Kernfakten" unterschiedliche Auffassungen haben.
- Agenten haben keine deterministischen Anweisungen fuer Grenzfaelle (z.B.: "Wenn KE-Matrix 5 Haupt-KEs + 2 Sekundaer-KEs hat: muessen alle 7 abgedeckt sein, oder reichen 5?").

**Recommended Fix:**

Quantifizierung und Definitionen praeziieren (Minimalversion):

```
DIDAKTIK-Vertrag, Aufgabe 1-Revised:
- Pflicht-Teilziele pro Mappe: genau 1
  Definition: Jedes Teilziel ist eine konkrete Handlung (Operator + Objekt), 
  z.B. "Die SuS erklaeren, warum die Allianz zwischen Frankreich und Russland 
  entstanden ist", nicht "verstehen die Ursachen des Weltkriegs".

INHALTSBASIS-Vertrag, QI3-Revised:
- Fakten: numeriert F1, F2, ... pro Mappe. Definition: Aussage, die mit Wikipedia-Quellenangabe belegt ist.
- Kernfakten: F1-F3 (erste 3 Fakten pro Mappe)
- Nebenfakten: F4+ (Vertiefung). Minimalpflicht: Alle Kernfakten muessen Nebenfakten haben.
- Zitate, Akteure, Rollenprofile: analog numerieren.

HEFTEINTRAG-Vertrag, Aufgabe 2-Revised:
- Kernerkenntnisse = SCPL.loesung[]
- Definition: 1 Satz = 1 Kernerkenntnis. Ein Satz beantwortet eine Teilfrage der Stundenfrage.
  z.B. Stundenfrage: "Warum begann der Weltkrieg?" → Kernerkenntnis: "Mehrere Buendnisse schlugen Grenzen auf dem Balkan fest."
- Minimum: 1 pro Mappe, Maximum: 3 pro Mappe.
```

**Delta zu v1:** NEU (Vorgaenger behandelt Schwellenwerte, RA1-F05 fokussiert auf Definitionsklaerung)

---

### [RA1-F06] Messbarkeit: 40% der Q-Kriterien nicht binaer pruefbar

**Severity:** MEDIUM
**Betroffene Vertraege:** Alle 4 Phase-0-Vertraege
**Beschreibung:**
Q-Gate-Kriterien sind als BLOCKER, HIGH, MEDIUM klassifiziert, aber die *Messbarkeit* der einzelnen Kriterien ist nicht klassifiziert. Etwa 40% der Q-Kriterien erfordern semantische Interpretation:

- **Binaer pruefbar (60%):** QI1 (Struktur vollstaendig?), QH1 (Header vorhanden?), QS1 (Dokument-Vollstaendigkeit?), QD1 (KE-IDs aus Fachlehrplan?), Q1 (Fliesstext?).
- **Semantisch (40%):** QI4 ("Jede KE hat 3 stuetzende Fakten" — was ist Stuetzung?), QS8 ("Tafelbild dient als Grundlage" — wie messe ich "Grundlage-Tauglichkeit"?), SK1 ("50% Handlungspassagen" — wie zaehle ich Handlungsverben?), G3 ("jedes TB-Element erarbeitbar" — wie pruefte ich Erarbeitbarkeit abstrakt?).

**Evidenz:**
- INHALTSBASIS QI4: "Jede KE hat mindestens 3 stuetzende Fakten". Im Vorgaenger-Audit (QA-H6) wurde bemerkt: "nicht automatisch pruefbar". Vorgaenger empfahl Pflicht-Output "KE-Abdeckung: [KE-ID] gestuetzt durch [Fakt-1, Fakt-2, Fakt-3+]", aber diese Loesung ist im Vertrag noch nicht integriert.
- SKRIPT QS8: "Kernbegriff, Ordnungsmuster, Verbindungsstruktur muessen erkennbar sein". Keine Operationalisierung fuer "erkennbar fuer wen" oder "wie prueft man".
- HEFTEINTRAG QH-RC2: "fuer jeden SCPL-Schritt ist mindestens ein Materialtyp denkbar, der die Erarbeitung ermoeglichet". Abstrakt — wie unterscheide ich "erarbeitbar" von "nicht erarbeitbar"?
- GUETEKRITERIEN_SKRIPT SK1: "Mindestens 50% Handlungspassagen". Wie zaehle ich? Nach Saetzen? Nach Woertern? Ist "Die Schlacht tobte" ein Handlungssatz? (Nein, Nominalisierung.)

**Impact:**
- Q-Gate-Entscheidungen sind nicht reproduzierbar. Zwei Reviewer koennten bei gleichem Output zu unterschiedlichen Urteilen kommen.
- Self-Check durch Agenten ist unsicher. Agent muss heuristisch entscheiden, ob "3 Fakten fuer KE" erfuellt ist.
- Nachbesserung wird unbegrendet: Wenn "Tafelbild-Ableitbarkeit" nicht klar definiert ist, kann HEFTEINTRAG-Agent nicht sicher feststellen, wann Nachbesserung endet.

**Recommended Fix:**

Alle semantischen Kriterien mit Operationalisierungs-Protokoll ausstatten. Beispiel fuer 3 kritische Kriterien:

```
**QI4-Operationalisierung (KE-Abdeckung):**
Methode: KE-Abdeckungs-Tabelle pro Mappe
- Spalte 1: KE-ID (aus DIDAKTIK_RAHMEN)
- Spalte 2: Fakten aus INHALTSBASIS, die diese KE stuetzen
  Definition "Stuetzung": Fakt hat direkten inhaltlichen Bezug zu KE.
  z.B. KE "GPG7_LB2_K_05 Ursachen des Weltkriegs" wird gestuetzt durch:
    - F1: "Buendnisse schuerzen Konflikt" → Ursachen-Kategorie "Buendnisse"
    - F2: "Imperialismus um Kolonien" → Ursachen-Kategorie "Imperialismus"
    - F3: "Balkan-Instabilitaet" → Ursachen-Kategorie "Balkan"
- FAIL wenn: KE hat <3 stuetzende Fakten, oder Fakten haben keinen KE-Bezug (z.B. "Wetter am 28. Juni 1914")

**SK1-Operationalisierung (Vergegenwärtigung 50%):**
Methode: Saetzaehlung mit Klassifizierung
- Pro Chunk §-Absaetze durchgehen
- Jeden Satz klassifizieren:
  Handlung (H): Verben = Handlungsverben (schaffen, brechen, marschieren, toeten); Subjekt = Person/Gruppe; Objekt = konkret
  Abstraktion (A): Nominalisierungen, Passiv, bewertende Adjektive ohne Handlung
  Beispiele:
    H: "Kaiser Wilhelm II. befahl die Invasion." → H (Handlungsverb, Person, Objekt)
    H: "Die Armeen stiessen aufeinander." → H (konkrete Aktion)
    A: "Der Imperialismus fuehrte zu Konflikten." → A (Nominalisierung des Handelnden)
    A: "Die Spannung war enorm." → A (Zustandsbeschreibung)
- Zaehle: H / (H + A) ≥ 0.5 = PASS; <0.5 = FAIL
- WARN wenn: 0.4-0.5 (Grenzfall)

**QS8/QH-RC2-Operationalisierung (Erarbeitbarkeit):**
Methode: Material-Typ-Plausibilitaets-Check
- Pro SCPL-Schritt pruefen: Welcher Material-Typ (Quellentext, Bild, Tagebuch, Statistik, Karte) koennnte diesen Schritt erarbeiten?
- DIRECT-Kriterium: Material-Typ ist "Quellentext analysieren" oder "Daten lesen" (passive Informationsaufnahme)
- ARTIFACT-Kriterium: Material-Typ ist "Quellentext interpretieren", "Bild analysieren", "Karte verorten" (aktive Dekodierung)
- INFERENTIAL-Kriterium: Material-Typ erfordert "Vergleich zweier Quellen" oder "Reihenfolge ordnen" (logische Synthese)
- FAIL wenn: Kein Material-Typ koennte den Schritt stuetzen (z.B. "Der Kaiser dachte, dass..." → nur durch Lehrvortrag)
- WARN wenn: Nur 1 Material-Typ moeglich (wenig Flexibilitaet fuer Phase 1)
```

Diese Operationalisierungen machen Q-Gate-Pruefungen reproduzierbar und ermoglichen automatisierte oder halbautomatisierte Checks.

**Delta zu v1:** BESTAETIGT (Vorgaenger QA-H6 identifiziert Messbarkeits-Problem, RA1-F06 bietet Operationalisierungs-Protokolle)

---

### [RA1-F07] HAFTEINTRAG-JSON-Struktur inkonsistent mit Docstring-Beispiel

**Severity:** MEDIUM
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG (§4)
**Beschreibung:**
JSON-Beispiel (Zeilen 69-89) zeigt `scpl.loesung[]` als Array von Strings: `"loesung": ["Merksatz 1", "Merksatz 2"]`. Aber in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (§6, Zeilen 192-195) ist `loesung` auch String-Array, aber die Output-Tabelle (§3.2 des Kriteriums-Docs) nennt `kernerkenntnisse: ["..."]` separat. Gleichzeitig werden in Output-Format mehrere Namen benutzt: `loesung`, `merksaetze`, `kernerkenntnisse`.

**Evidenz:**
- HEFTEINTRAG §4, Zeile 78: `"loesung": [ { "kernerkenntnis": "...", "erarbeitbarkeit": "DIRECT|ARTIFACT|INFERENTIAL" } ]` — Objekt mit "kernerkenntnis"-Feld
- Zeile 193-195 (im Beispiel oben): `"loesung": [ "Merksatz 1", "Merksatz 2" ]` — reiner String
- GUETEKRITERIEN Zeile 199-200: `"kernerkenntnisse": [ "Merksatz 1", "Merksatz 2" ]` — drittes Feld-Name

Welches ist kanonisch? Ist loesung[].kernerkenntnis oder loesung[] ein String?

**Impact:**
- Phase 2.0-JSON wird nicht konsistent geniert. Agent koennten unterschiedliche Feldstrukturen produzieren.
- Automatisierte Validierung gegen Schema wird faelsch negativ treffen.

**Recommended Fix:**
```
HEFTEINTRAG §4, JSON-Struktur vereinheitlichen:

Option A (einfach): 
{
  "stundenfrage": "...",
  "ordnungsmuster": "...",
  "kernerkenntnisse": ["Satz 1", "Satz 2"],  // direkt, max. 3
  "scpl": {
    "situation": { "kontextsatz": "..." },
    "complication": [...],
    "problem": { "satz": "..." },
    "loesung": ["Satz 1", "Satz 2"]  // identisch mit kernerkenntnisse
  }
}

Option B (komplex, mit Metadaten):
{
  "stundenfrage": "...",
  "ordnungsmuster": "...",
  "scpl": {
    "situation": { "kontextsatz": "..." },
    "complication": [
      { "schritt": "...", "fachbegriff": "...", "erarbeitbarkeit": "DIRECT|ARTIFACT|INFERENTIAL" }
    ],
    "problem": { "satz": "..." },
    "loesung": [
      { "kernerkenntnis": "...", "erarbeitbarkeit": "DIRECT|ARTIFACT|INFERENTIAL", "artefakt_id": "img-X-Y" }
    ]
  }
}

Empfehlung: Option B, weil Erarbeitbarkeit und Artefakt-Referenzen fuer Phase 1 noetig sind (vgl. RA1-F04).
Dann: kernerkenntnisse [] als Convenience-Feld (Strings extrahiert aus scpl.loesung[].kernerkenntnis).
```

**Delta zu v1:** NEU (Strukturkonsistenz-Problem)

---

### [RA1-F08] TAFELBILD-Entwurf im SKRIPT hat minimale Strukturvorgaben

**Severity:** MEDIUM
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT (§3.2)
**Beschreibung:**
SKRIPT-Vertrag §3.2 definiert Tafelbild-Entwurf nur als "Tabelle: ID, Typ-Kandidat, Skript-Ref, Beschreibung" + "Knoten (ID, Text, Typ, Skript-Ref) + Verbindungen (Von→Nach, Label)". Aber es gibt keine Vorgabe fuer minimale Knoten-Semantik oder Verbindungs-Typisierung. 

Das bedeutet: Ein Agent koennter Knoten-Texte produzieren, die viel zu abstrakt sind ("Der Erste Weltkrieg") oder zu konkret ("Kaiser Wilhelm II. am 5. Juli 1914"). Es gibt keine Leitlinie.

**Evidenz:**
- SKRIPT §3.2: "Knoten (ID, Text, Typ, Skript-Ref)" — was ist ein guter "Text" fuer einen Knoten? Max-Wortanzahl? Abstraktionsniveau?
- QS5 (Tafelbild-Plausibilitaet): "≥4 Knoten, ≥3 Verbindungen. Kernbegriff der Mappe ist als Knoten vorhanden." — "Kernbegriff" ist nicht definiert.
- Keine Vorgabe fuer Verbindungs-Typisierung (Label): Sind "chronologisch", "kausal", "assoziativ" die erlaubten Label? Oder beliebig?

**Impact:**
- HEFTEINTRAG-Agent muss Tafelbild-Entwuerfe neu interpretieren/strukturieren. Der Entwurf ist weniger eine "Grundlage" und mehr eine "Inspiration".
- QS5/QS8 sind nicht streng pruefbar ohne Semantik-Definition.

**Recommended Fix:**

Knoten- und Verbindungs-Semantik definieren:

```
SKRIPT §3.2-Revised (Tafelbild-Entwurf):

Knoten-Typen:
- KONZEPT: Abstraktum/Fachbegriff (z.B. "Imperialismus", "Buendnis")
- EREIGNIS: Datierte Begebenheit (z.B. "Attenttat in Sarajewo, 28.6.1914")
- AKTEUR: Person oder Gruppe (z.B. "Kaiser Wilhelm II.", "Deutsche Armeen")
- ZUSTAND: Beschaffenheit ohne Ereignis (z.B. "Spannungen zwischen Grossmaechten")

Knoten-Vorgaben:
- Text: 2-8 Woerter (kurz, praegnant)
- Typ aus der Liste oben waehlen
- Referenz zu Skript-Stelle (z.B. "§2, Zeile 3")
- Semantisches Typ-Minimalanforderung: ≥1 KONZEPT, ≥1 EREIGNIS oder AKTEUR

Verbindungs-Label (standardisiert):
- KAUSAL ("weil", "fuehrt zu")
- CHRONOLOGISCH ("dann", "nachher")
- KATEGORIAL ("ist Art von", "Beispiel fuer")
- KONTRASTIEREND ("vs.", "hingegen")
- PARALLEL ("und", "beide...")
- HIERARCHISCH ("Teil von", "besteht aus")

Verbindungs-Minimalanforderung: ≥3 Verbindungen (mindestens 1 KAUSAL oder CHRONOLOGISCH fuer Narrativ-Struktur)
```

**Delta zu v1:** NEU (Strukturierungs-Luecke im SKRIPT-Tafelbild)

---

## 3. Severity-Verteilung

| Severity | Anzahl | Betroffene Finding-IDs |
|---|---|---|
| CRITICAL | 0 | — |
| HIGH | 4 | RA1-F01, RA1-F02, RA1-F03, RA1-F04 |
| MEDIUM | 4 | RA1-F05, RA1-F06, RA1-F07, RA1-F08 |
| LOW | 0 | — |

**Gesamtzahl Findings:** 8
**Durchschnittliche Severity:** HIGH (4/8 = 50%)
**Status:** 0 CRITICAL, keine Blockerfor Pipeline-Ausfuehrung fuer WK1-artige Themen. HIGH-Findings blockieren Generalisierung auf nicht-Ereignisgeschichte (siehe Vorgaenger K1).

---

## 4. Top-3-Empfehlungen (Priorisiert nach Impact)

### Empfehlung 1 (HOCHSTE PRIORITAET): Zwei-Stufen-Toleranz-Modell implementieren

**Betrifft:** RA1-F01
**Aufwand:** S (Small — wenige Zeilen pro Vertrag)
**Blocker:** Nein, aber essential fuer Q-Gate-Reproduzierbarkeit

```
Massnahme: 
- INHALTSBASIS: QI3-Schwellenwerte (Fakten, Akteure, Zitate, Rollenprofile) 
  mit GELB/ROT-Zonen ausstatten
- SKRIPT: QS3/QS4 (Wortanzahl, Artefakt-Marker) 
  zweistufig definieren
- HEFTEINTRAG: QH2/QH4 (Stundenfrage, Kernerkenntnisse-Laenge) 
  zweistufig definieren
- Analog fuer alle quantitativen Schwellenwerte in allen 4 Vertraegen

Ergebnis: Agenten und Reviewer haben klare WARN vs. FAIL-Leitlinien.
```

### Empfehlung 2: Operationalisierungs-Protokolle fuer semantische Q-Kriterien schreiben

**Betrifft:** RA1-F02, RA1-F06
**Aufwand:** M (Medium — 2-4h Schreib- und Test-Arbeit pro Kriterium)
**Blocker:** Nein, aber essential fuer Q-Gate-Reproduzierbarkeit und Self-Check-Zuverlaessigkeit

```
Massnahme:
- QI4 (KE-Abdeckung): Pflicht-Output-Zeile "KE-Abdeckung: [KE-ID] gestuetzt durch [Fakt1, Fakt2, Fakt3]"
  [Anmerkung: Vorgaenger QA-H6 empfahl dies bereits. Pruefen, ob bereits in v1.1 implementiert.]
- SK1 (Vergegenwärtigung): Saetzaehlung mit H/A-Klassifizierung (50% Handlungspassagen)
- QS8 (SCPL-Ableitbarkeit): Semantisches Mapping-Protokoll (Verbindungs-Typisierung → Ordnungsmuster)
- QH-RC2 (Erarbeitbarkeit): Material-Typ-Plausibilitaets-Check pro SCPL-Schritt

Ergebnis: Q-Gate-Kriterien sind reproduzierbar pruefbar, ohne heuristische Interpretation.
```

### Empfehlung 3: JSON-Schema formal validieren und Feldstruktur vereinheitlichen

**Betrifft:** RA1-F03, RA1-F07
**Aufwand:** M (Medium — JSON-Schema schreiben, Test-Validierung einbauen)
**Blocker:** HIGH fuer Phase-2.0-Integration

```
Massnahme:
- JSON-Schema (hefteintrag.schema.json) schreiben und in docs/schemas/ ablegen
- HEFTEINTRAG §4 Feldstruktur vereinheitlichen: scpl.loesung[] als Objekt-Array mit Erarbeitbarkeit und Artefakt-Referenzen
- QH-RC1 um Validierungs-Schritt ergaenzen (JSON gegen Schema laufen lassen, automatisierbar)
- Phase-2.0-Vertraege (wenn geschrieben) muessen gegen dasselbe Schema validieren

Ergebnis: Phase-0 → Phase-2.0 Uebergabe ist maschinell pruefen (deterministische Transformation).
```

---

## 5. Empfohlene Umsetzungs-Reihenfolge

1. **Sofort (vor naechstem Game):** M1 (Toleranzen), M2 (Operationalisierung QI4, SK1), M3 (JSON-Schema)
2. **Danach:** Remaining QI-Q-Kriterien operationalisieren (QS8, QH-RC2)
3. **Iterativ:** RA1-F05 (Definitionen praezisieren) beim naechsten Audit revidieren

---

## 6. Abgrenzung zu Vorgaenger-Audit (v1)

| Kategorie | Vorgaenger | RA1-v2 | Status |
|---|---|---|---|
| Thementyp-Klassifikation fehlt | K1 (CRITICAL) | Nicht RA1-Fokus (RA5-Dimension) | Deferred |
| SCPL-Rigidität | K2 (HIGH) | Nicht RA1-Fokus (RA4-Dimension) | Deferred |
| Phase-2.0-JSON-Konsistenz | K3 (HIGH) | **RA1-F03** operationalisiert | EXPANDED |
| Artefakt-Propagation | K4 (HIGH) | **RA1-F04** konkretisiert JSON-Integration | EXPANDED |
| Schwellenwerte (QA-M6) | MEDIUM | **RA1-F01** zwei-stufiges Modell | OPERATIONALISIERT |
| QI4 Messbarkeit (QA-H6) | HIGH | **RA1-F06** gibt Protokoll; **RA1-F02** fuer SCPL | OPERATIONALISIERT |
| QS8 Ableitbarkeit (QA-H7) | HIGH | **RA1-F02** Mapping-Protokoll | OPERATIONALISIERT |
| Differenzierung / Motivierung / Narrativität | MEDIUM | **RA1-F05/F06** betreffen Definitions-Luecken | PARTIAL |

**Zusammenfassung Vorgaenger → RA1-v2:** Vorgaenger identifizierte systemische Gaps (K1-K4, QA-C/H), RA1-v2 konzentriert sich auf **Operationalisierung und Validierbarkeit** der Vertragsbestimmungen. 4 Findings (F01-F04) sind HIGH, weil sie Reproduzierbarkeit des Q-Gates gefaehrden. 4 Findings (F05-F08) sind MEDIUM, weil sie Grenzfaelle und Konsistenz betreffen, blockieren aber nicht den Produktionsfluss fuer WK1-aehnliche Themen.

---

## 7. Verbindungen zu anderen RA-Dimensionen

- **RA2 (Prozess-Robustheit):** RA1-F01/F02/F06 impactieren Q-Gate-Roburstheit. RA1-Empfehlungen muessen mit RA2-Findings synchronisiert werden.
- **RA3 (Downstream-Kompatibilitaet):** RA1-F03/F04 sind zentral fuer Phase-2.0-Integration. RA1-Operationalisierungen (JSON-Schema, Artefakt-Referenzen) sind Eingabe fuer RA3-Audit.
- **RA4 (Fachdidaktische Schaerfe):** RA1-F06 (SK1-Operationalisierung) tangiert SK-Kriterien. Feinabstimmung mit RA4-Audit noetig.
- **RA5 (Generalisierbarkeit):** RA1-Operationalisierungen (z.B. Ordnungsmuster-Enum fuer Tafelbild) sind Grundlage fuer thementyp-adaptive Heuristiken (M-QA1).

---

**Bericht abgeschlossen. Status: Zur Konsolidierung mit RA2-RA5 bereit.**
