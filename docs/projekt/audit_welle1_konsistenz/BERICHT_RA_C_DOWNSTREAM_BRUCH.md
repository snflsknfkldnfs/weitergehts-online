# Bericht RA-C: Downstream-Bruch (Welle-1-Patches)

**Datum:** 2026-04-07
**Scope:** Welle-1-Patches vs. Phase 1/2 Vertraege + bestehende Game-1 Artefakte
**Agent:** RA-C (Review-Agent für Downstream-Bruch-Prüfung)
**Audit-Basis:** Vergleich SCHEMA_HEFTEINTRAG_JSON.md (neu, v1.0) gegen Game-1 hefteintrag.json (produktiv, game gpg-erster-weltkrieg-ursachen Mappe 2-4)

---

## Findings

| ID | Severity | Betroffene Phase/Datei | Beschreibung | Empfehlung |
|---|---|---|---|---|
| RA-C-F01 | BLOCKER | Phase 0.4 + Game-1 Artefakte | **JSON-Schema-Inkompatibilität: Fehlendes `complication[].typ`-Feld.** Das neue Schema (SCHEMA_HEFTEINTRAG_JSON.md v1.0, Zeile 51-55) verlangt für jeden complication[]-Eintrag ein erforderliches Feld `"typ": "narrativ\|konzeptuell\|kontrastiv\|kausal"`. Bestehende Game-1 hefteintrag.json-Dateien (Mappe 2-4, gpg-erster-weltkrieg-ursachen) enthalten dieses Feld **nicht**. Stattdessen haben sie `fachbegriff` und `darstellung` Felder. Die Struktur ist orthogonal. | Alle bestehenden Game-1 hefteintrag.json-Dateien sind retroaktiv **schema-inkonform**. Migration erforderlich: Pro Mappe 2-4 muss jeder complication[i]-Eintrag nachträglich um `"typ"` ergänzt werden. Automatisiertes Patch-Skript schreiben (Heuristik: basierend auf Schritt-Bedeutung und Ordnungsmuster klassifizieren). |
| RA-C-F02 | HIGH | Phase 0.4 Vertragstext | **additionalProperties: false blockiert Phase-2.1c-Felder.** SCHEMA_HEFTEINTRAG_JSON.md, Zeile 135: `"additionalProperties": false`. Das neue Schema verbietet ausdrücklich zusätzliche Felder. Phase 2.1c soll aber `zusammenfassung` und `ueberleitung` ergänzen (VERTRAG_PHASE_2-0_RAHMEN.md, Zeilen 70-71: als Placeholder `"[REVISION IN 2.1c]"`). Diese Felder sind **nicht** im Phase-0.4-Schema enthalten. Wenn Phase 2.0 diese Felder hinzufügt (selbst mit Placeholder), validiert das Ergebnis nicht gegen das Schema. | Entscheidung erforderlich: (1) Entweder Phase-0.4-Schema `additionalProperties` auf `true` setzen → akzeptiert Placeholder-Felder von Phase 2.0. (2) Oder Phase-0.4 und Phase-2.1c Schema vollständig trennen: Phase-2.0 schreibt ein `rahmen-v2.0-hefteintrag.json` (v1.0-Schema), Phase-2.1c schreibt `rahmen-v2.1c-hefteintrag.json` (separates Schema mit zusammenfassung/ueberleitung). Konsens mit Phase-2.0/2.1c-Agenten erforderlich. |
| RA-C-F03 | HIGH | Phase 0.3 (SK18 Quellenorientierung) | **SK18 ist jetzt MUSS, nicht SOLL.** VERTRAG_PHASE_0-3_SKRIPT.md, Zeile 121: "SK1-SK7, SK18 (... Quellenorientierung) ... BLOCKER". Das neue Requirement macht Quellenorientierung (mindestens 1 Quellenbeleg pro Chunk) zur Phase-0.3-Pflicht. Bestehende SKRIPT-Artefakte (gpg-erster-weltkrieg-ursachen game) **müssen überprüft werden** ob sie diese Anforderung bereits erfüllen oder nicht. Wenn nicht: Retroaktive Compliance-Frage. | Prüfung durchführen: SKRIPT_gpg-erster-weltkrieg-ursachen.md (alle Chunks) auf SK18-Erfüllung scannen. Falls nicht erfüllt: (1) AGENT_SKRIPT retrofitting erlauben? (2) Oder bestehende SKRIPTs als "legacy, pre-SK18" markieren + nur ab neuem Patch SK18 durchsetzen? Granularität: pro Chunk dokumentieren welche Quellentypen (Artefakt, Zitat, Karte, Dokument) als SK18-Erfüllung zählen. |
| RA-C-F04 | HIGH | Phase 0.4 Vertrag + Phase 2.0 Rahmen | **TAFELBILD-JSON-Struktur-Divergenz: Knoten/Verbindungen leere Arrays vs. im Game-1 gefüllt.** VERTRAG_PHASE_0-4_HEFTEINTRAG.md, Zeilen 84-85: `"knoten": [], "verbindungen": []` als "Legacy-Felder, leere Arrays in v4". Aber: SCHEMA_HEFTEINTRAG_JSON.md, Zeilen 105-113 definiert Schema für `knoten` und `verbindungen` als `"items": { "type": "object" }` — komplett offen, kein Required-Feld. Bestehende Game-1 hefteintrag.json Mappe 2 **hat gefüllte knoten und verbindungen Arrays** (knoten: 6 Einträge, verbindungen: 6 Einträge, siehe Mappe-2-Datei Zeilen 56-71). VERTRAG_PHASE_2-0_RAHMEN.md, Zeile 41-43: verlangt auch Schaubild-Integrität Prüfung (knoten ist PFLICHT + nicht leer, Verbindungen PFLICHT + nicht leer). Game-1 erfüllt das. Das neue v4-Vertragsmodell sagt aber "leere Arrays". | Klärung erforderlich: (1) Sind Tafelbilder in Phase 2.0/2.1c jetzt **ohne** Schaubild-Darstellung (leere knoten/verbindungen)? (2) Oder ist das Schaubild noch ein **optionaler** Bestandteil? Falls ja: Schema muss minItems constraint klarer machen. Falls nein: Vertrag muss ändern dass knoten[] und verbindungen[] NICHT leer sein dürfen. Auswirkung auf Phase-2.0-Rendering unklar. |
| RA-C-F05 | HIGH | Game-1 Artefakte vs. Phase 2.0/2.1 Erwartung | **kernerkenntnisse[] Feld-Dopplung.** Game-1 hefteintrag.json Mappe 2 hat ZWEI Stellen mit Kernerkenntnissen: (1) `scpl.loesung[]` (als Array von Strings, Zeile 41-44), (2) `kernerkenntnisse[]` (als separates Array, Zeile 51-54), **identisch dupliziert**. VERTRAG_PHASE_2-0_RAHMEN.md, Zeile 72: "KEIN kernerkenntnisse[]-Feld — Kernerkenntnisse leben ausschliesslich in hefteintrag.scpl.loesung[] (M8)". Das neue Vertrag-Verbot wird von Game-1 verletzt. Phase-2.0-Rendering erwartet kernerkenntnisse nur über hefteintrag.scpl.loesung[] (M3b: "M3b: hefteintrag.scpl.loesung[] enthaelt die Kernerkenntnisse", Zeile 92). | Game-1 hefteintrag.json Dateien müssen bereinigt werden: Das `kernerkenntnisse[]` Feld entfernen. Nur `scpl.loesung[]` führt. Schema-Update: `kernerkenntnisse[]` Feld in Phase-0.4-Schema ausnahmslos verbieten (nicht optional). Prüfung: Alle Game-1 hefteintrag.json durchsuchen (sind alle 6 Mappen betroffen?). Migration: kernerkenntnisse[] → entfernen, scpl.loesung[] validieren dass es identisch ist. |
| RA-C-F06 | MEDIUM | Phase 0.2 Quellenorientierung + Downstream | **QI-RC1 (SKRIPT-Tauglichkeit) erweitert.** VERTRAG_PHASE_0-2_INHALT.md, Zeile 108-109: Neue Downstream-Kontingenz "Pro Mappe mindestens 1 **Quellenbezug dokumentiert** (Dokument, Brief, Karte, Bericht, Fotografie), der im SKRIPT als Quellenorientierung (SK18) verwendbar ist." Das ist eine **neue Anforderung an Phase 0.2 Inhaltsbasis**. Bestehende INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md muss überprüft werden ob Quellentypen-Diversität garantiert ist. | Prüfung durchführen: INHALTSBASIS pro Mappe auf Quellentiefe (nicht nur Fakt-Abstraktion). Falls dünn: Nachbesserung AGENT_INHALT Phase 0.2, oder: bestehende Dateien als "partial-compliance" deklarieren + nur neue Games unter QI-RC1 durchsetzen. Auswirkung auf laufende Produktion (Phase 2.0-2.3) marginal wenn Quellenangaben schon in SKRIPT markiert. |
| RA-C-F07 | MEDIUM | Phase 2.1c Eskalationspfad | **Eskalationspfad-Dokumentation fehlt.** VERTRAG_PHASE_0-4_HEFTEINTRAG.md, Zeilen 117-162: Detaillierte Eskalationspfade E-H1 bis E-H3 definiert (SCPL-Restrukturierung, Kernerkenntnis-Anpassung, Ruecklauf zu SKRIPT). VERTRAG_PHASE_2-1c_CROSS.md schweigt zu Eskalationspfaden für Material-Cross-Konsistenz. Wird ein Material produziert das einen TB-Knoten nicht abdeckbar macht (Achse 4: TB-Knoten-Gesamtabdeckung FAIL)? Gibt es Ruecklauf-Szenarios zu Phase 0.4/2.1 oder User-Entscheidung? | Eskalationspfade für Phase 2.1c dokumentieren: E-C1 (Material ist nicht erarbeitbar → revidiere AGENT_SKRIPT-Chunk oder Material-Typ), E-C2 (TB-Knoten wird nicht abgedeckt → User-Entscheidung: Knoten-Entfernung oder Material-Zusatz). Klären wer entscheidet wenn User nicht verfügbar. Integration mit Phase-0.4-Fallback-Logik (FALLBACK: E-H1 vs. E-C1). |

---

## Severity-Verteilung

| Level | Count | Kritikalität |
|-------|-------|-----------|
| **BLOCKER** | 1 (RA-C-F01) | Produktionsblockade: Kein Game-1 hefteintrag.json validiert gegen Phase-0.4-Schema |
| **HIGH** | 5 (F02, F03, F04, F05, F06) | Downstream-Konsistenz gefährdet: Phase 2.0-2.3 erwartet Felder/Struktur die nicht konsistent produziert werden |
| **MEDIUM** | 1 (F07) | Prozessprozess-Risiko: Eskalation unklar wenn Materialien nicht erarbeitbar sind |

---

## Gate-Urteil

**ROT mit kritischen Blocker-Befunden.**

### Begründung

1. **RA-C-F01 (BLOCKER):** Das neue `SCHEMA_HEFTEINTRAG_JSON.md` ist produktiv nicht nutzbar solange es gegen alle bestehenden Game-1 Artefakte schlägt. Die Anforderung `"typ"` in `complication[]` ist ein **Hard-Break** für bestehende Daten. Eine Migration oder Schema-Korrektur ist **vor Phase-2.0-Produktion** erforderlich.

2. **RA-C-F02 (HIGH):** `additionalProperties: false` blockiert das Phase-2.0-Output-Format selbst. Phase 2.0 soll Placeholder-Felder hinzufügen (VERTRAG_PHASE_2-0_RAHMEN.md, Zeile 70-71). Diese Felder validieren nicht. Das ist ein **Schnittstellen-Unfall** zwischen v4-Schema und v4-Vertrag.

3. **RA-C-F03 (HIGH — Policy-Impact):** SK18 (Quellenorientierung) wurde von SOLL zu MUSS erhöht. Das trifft Phase 0.3, 0.2, und alle Downstream-Agenten. Keine Clarification ob bestehende SKRIPTs bereits konform sind oder nicht.

4. **RA-C-F04 & F05:** Struktur-Inkompatibilität bei Schaubild-Darstellung und kernerkenntnisse[]. Das verursacht Silent Data Divergence zwischen Phase 0.4 (Produktion) und Phase 2.0 (Verbrauch).

### Konsequenz

**Freigabe der Welle-1-Patches NICHT empfohlen.** Stattdessen:

1. **Sofort (heute):** SCHEMA_HEFTEINTRAG_JSON.md Revision:
   - Entscheiden: `"typ"` in complication[] als optionales Fallback-Feld? Oder Heuristik-Migration?
   - `additionalProperties` auf `true` setzen ODER Phase-2.0 Output-Schema separieren.
   - `kernerkenntnisse[]` Feld ausnahmslos verbieten (entfernen).

2. **Heute (Parallel):** Alle Game-1 hefteintrag.json gegen finales Schema testen. Mindestens Mappe 2-4 (6 Dateien) dokumentieren.

3. **Vor Freigabe Phase 2.0:** SK18-Compliance klären (Game-1 SKRIPTs überprüfen, oder: Anforderung nur für neue Games ab Welle 2).

4. **Vor Phase 2.1c:** Eskalationspfade dokumentieren (E-C1, E-C2).

---

## Top-3 Empfehlungen

1. **Schema-Revision (Priority 1, Blocking):** SCHEMA_HEFTEINTRAG_JSON.md v1.1 produzieren:
   - `complication[].typ` als **optional** (wenn nicht gesetzt: infer aus Ordnungsmuster + Schritt-Semantik, oder: Accept null).
   - `additionalProperties: true` setzen (erlaubt Phase-2.0/2.1c Zusatz-Felder).
   - `kernerkenntnisse[]` komplett aus Schema entfernen, nur `scpl.loesung[]` als autoritativ.
   - Validierung bestehender Game-1 Dateien mit v1.1. Migration-Skript schreiben für `complication[].typ`-Befüllung (Heuristik).

2. **SK18-Klarstellung (Priority 2, Policy):** MEMO schreiben:
   - Gelten SK18-Anforderungen nur für neue Welle-2-Games?
   - Oder: Game-1 SKRIPT retroaktiv überprüfen und ggf. ergänzen?
   - Definitionen pro Quellentyp (was zählt als "Quellenorientierung"?).
   - Integration mit INHALTSBASIS Phase 0.2 QI-RC1 klären.

3. **Eskalationspfad-Dokumentation (Priority 3, Process):** VERTRAG_PHASE_2-1c_CROSS.md Erweiterung:
   - E-C1: Material nicht erarbeitbar → Fallback-Pfad definieren.
   - E-C2: TB-Knoten-Abdeckung schlägt fehl → User-Entscheidung oder Automation?
   - Linking zu Phase-0.4-Eskalationspfaden (E-H1-E-H3) etablieren.
   - Verantwortung definieren wenn User nicht verfügbar.

---

## Anhang: Schema-Diff (F01)

### Erwartet (SCHEMA_HEFTEINTRAG_JSON.md v1.0, Zeile 51-55)
```json
"complication": {
  "type": "array",
  "items": {
    "required": ["schritt", "typ", "erarbeitbarkeit"],
    "properties": {
      "typ": {
        "enum": ["narrativ", "konzeptuell", "kontrastiv", "kausal"]
      }
    }
  }
}
```

### Vorhanden (Game-1 hefteintrag.json Mappe 2, Zeile 10-35)
```json
"complication": [
  {
    "schritt": "...",
    "fachbegriff": "...",
    "darstellung": null
  }
  // kein "typ" Feld
]
```

**Konsequenz:** `scpl.complication[0]` validates NICHT gegen Schema.

---

**Bericht RA-C abgeschlossen. Freigabe-Status: ROT — Blockiert durch RA-C-F01 bis Migration/Schema-Revision.**
