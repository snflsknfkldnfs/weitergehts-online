# RA3-Audit: Downstream-Kompatibilität Phase 0 → Phase 1/1.5/2.0

**Agent-ID:** RA3 (Review-Agent 3 — Downstream-Kompatibilität)  
**Audit-Dimension:** Downstream-Kompatibilität (JSON-Schema, Artefakt-Propagation, STRUKTUR-FREEZE, Phase-1-Anforderungen, Sequenzierbarkeit, Rollenprofile/Zitate-Propagation)  
**Datum:** 2026-04-06  
**Basis-Dokumente:**
- VERTRAG_PHASE_0-1_DIDAKTIK.md (v1.1)
- VERTRAG_PHASE_0-2_INHALT.md (v1.1)
- VERTRAG_PHASE_0-3_SKRIPT.md (v1.1)
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md (v1.0)
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md (Basis v1)
- WORKFLOW_v4.md (v4.1)

---

## Zusammenfassung

Phase-0-Vertraege definieren eine **gut strukturierte, aber asymmetrisch dokumentierte Artefakt-Propagationskette**. Die JSON-Schema-Definition fuer TAFELBILD (Phase 0.4) ist vollstaendig und Phase-2.0-kompatibel, aber fehlende formale Validierung und Placeholder-Konventionen fuer "FORMULIERUNGS-OFFEN"-Felder schaffen Ambiguitaeten. Artefakt-IDs (img-X-Y, zit-X-Y, rolle-X-Y) werden konsistent durch INHALTSBASIS → SKRIPT propagiert, aber der Weg von SKRIPT-Markern zu Phase-1-Materialien und Phase-2-data.json ist vertraglich nicht spezifiziert. Die STRUKTUR-FREEZE-Definition ist in Phase-0-4-Vertrag präzise (5 eingefroren, 3 formulierungsoffen, 2 nicht-produziert), wird aber in WORKFLOW_v4.1 nicht kanonisch referenziert — Downstream-Agenten koennten abweichende Annahmen treffen. Phase-1-AGENT_MATERIAL erhaelt konsistente Eingaben (SKRIPT + TAFELBILD mit Artefakt-Markern), aber die Sequenzierbarkeit von Chunks (Phase 1.5) ist im SKRIPT-Vertrag (QS7) formal definiert, ohne dass konkrete Trennbarkeitskriterien operationalisiert sind. Rollenprofile und Zitate werden bis TAFELBILD erfasst, aber ab Phase-1-Material gibt es keine explizite Spezifikation für deren Nutzung.

**Gesamterteil:** YELLOW (funktionsfaehig fuer Phase 1/1.5/2.0, aber 3 HIGH-Findings auf Downstream-Kompatibilität erfordern Klärung).

---

## Findings

### [RA3-F01] JSON-Schema-Inkompatibilität: Placeholder-Konvention nicht maschinell pruefbar

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG.md §4 (Output-Struktur), WORKFLOW_v4.md §7 (Phase 2.0 Rahmen-Produktion)  
**Beschreibung:** Der TAFELBILD-JSON (Phase 0.4) definiert Placeholder-Werte `"[REVISION IN 2.1c]"` fuer zwei Felder in der sicherung.json-äquivalenz (zusammenfassung und ueberleitung). Diese Felder werden in Phase 2.0 als "NICHT PRODUZIERT" gekennzeichnet, aber in Phase 2.1c Achse 6 revidiert. Das HEFTEINTRAG-Vertrag §4 zeigt die JSON-Struktur mit Platzhalter-Hinweis, aber: (1) kein JSON-Schema (.json.schema) validiert diese Struktur maschinell, (2) Phase-2.0-Agenten (Rahmen-Produktion) haben keine formal spezifizierte Aktion beim Lesen dieser Placeholders, (3) Wenn zusammenfassung und ueberleitung in sicherung.json mit Wert "[REVISION IN 2.1c]" erscheinen, ist unklar, ob diese als "noch nicht produziert" oder als "fehlerhafte Produktion" zu interpretieren sind.

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md §4: "Placeholder '[REVISION IN 2.1c]' bis Achse 6" — nur Konvention, keine Schema-Validierung
- WORKFLOW_v4.md §7 Zeile 489: "zusammenfassung := '[REVISION IN 2.1c]'" — instruktiv, aber nicht prozessual abgesichert
- Kein JSON-Schema-Dokument referenziert. Phase-2.0-Agent muss diese Regel durch Textlesung verstehen

**Impact:**  
Wenn Phase-2.1-Agenten die sicherung.json lesen und auf "[REVISION IN 2.1c]"-Strings treffen, koennten sie (a) dies korrekt als Placeholder interpretieren und ignorieren, oder (b) dies als Fehler betrachten und zu ueberarbeiten versuchen, oder (c) dies direkt an Phase-2.1c weitergeben. Ohne Schema-Validierung ist die Interpretation prozessual ambiguitaet. Erhoehtes Fehlerrisiko bei automatisierter Verarbeitung oder mehrsprachiger Dokumentation.

**Recommended Fix:**  
1. Formales JSON-Schema (.json.schema) erstellen mit: (a) Enums fuer erlaubte Placeholder-Werte, (b) Conditional-Regeln ("Wenn zusammenfassung='[REVISION IN 2.1c]', dann…"), (c) Metadaten-Feld `_produced_in_phase` fuer jedes Feld (z.B. `"_produced_in_phase": "0.4|2.1c"`).  
2. WORKFLOW_v4.md §7 um Read-Schritt erweitern: "Vor Phase-2.1: Pruefung fuer Placeholder-Werte in sicherung.json. Wenn vorhanden → Placeholder-Status dokumentieren, nicht ueberarbeiten."  
3. Phase-2.1c-Vertrag (wenn geschrieben) explizite Conditional aufnehmen: "Wenn zusammenfassung/ueberleitung=Placeholder, dann als PFLICHT-Produktion in dieser Phase eintragen."

**Delta zu v1:** NEU

---

### [RA3-F02] STRUKTUR-FREEZE-Definition nicht als kanonische Referenz in WORKFLOW_v4 verankert

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5, WORKFLOW_v4.md (kein expliziter §STRUKTUR-FREEZE)  
**Beschreibung:** Die vollstaendige STRUKTUR-FREEZE-Definition steht nur in HEFTEINTRAG-Vertrag §5 (Tabelle mit 9 Elementen: 5 EINGEFROREN, 3 FORMULIERUNGS-OFFEN, 2 NICHT PRODUZIERT). WORKFLOW_v4.md erwähnt STRUKTUR-FREEZE in mehreren Kontexten (v4 Aenderungen Zeile 8, §3 Differenzierter FREEZE Zeile 384-388, §5 Schritt 0.4 Zeile 205-211), aber referenziert nicht die komplette Definitionstabelle aus §5 des HEFTEINTRAG-Vertrags. Downstream-Agenten (AGENT_MATERIAL Phase 1, AGENT_RAHMEN Phase 2.0, AGENT_MATERIAL-Subagenten Phase 2.1) SOLLEN diese Definition beachten, müssen aber den HEFTEINTRAG-Vertrag separat lesen, um die genaue Grenzziehung zu verstehen. Kein Agent kann bei Dispatch-Lektüre eine kanonische Referenz zur STRUKTUR-FREEZE-Definition finden.

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5 "STRUKTUR-FREEZE-Definition": Tabelle mit präziser Spezifikation. Ist die verbindliche Referenz.
- WORKFLOW_v4.md §3 Zeile 385-388: Kurze Zusammenfassung (STRUKTUR-FREEZE vs. FORMULIERUNGS-OFFEN vs. NICHT PRODUZIERT), aber keine Verweis auf vollständige Tabelle. Nur für Kontextorientierung.
- Keine @ref oder Link-Konvention, die WORKFLOW-Leser auf §5 des HEFTEINTRAG-Vertrags hinweist.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md befund QA-H8: "STRUKTUR-FREEZE-Definition uneinheitlich" — mit Massnahme M-QA10: "kanonisch in WORKFLOW_v4.1 verankern"

**Impact:**  
Wenn ein Downstream-Agent (z.B. Phase-2.0-Rahmen-Produktion oder Phase-2.1-Subagent) nachschlagen möchte, welche Felder in STRUKTUR-FREEZE liegen und welche FORMULIERUNGS-OFFEN sind, muss er wissen, dass VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5 die Quelle ist. Die WORKFLOW-Dokumentation allein reicht nicht. Risk: Subagenten koennten unvollständige oder falsche Annahmen treffen (z.B. fälschlicherweise situation.kontextsatz als EINGEFROREN behandeln statt FORMULIERUNGS-OFFEN).

**Recommended Fix:**  
1. WORKFLOW_v4.md neue Zeile nach §3 einfügen: "**Kanonische Referenz STRUKTUR-FREEZE:** Siehe VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5 für vollständige Definition (5 eingefroren, 3 formulierungsoffen, 2 nicht-produziert). Diese Definitionen binden alle Downstream-Phasen (1, 1.5, 2.0, 2.1, 2.1c, 2.2)."
2. In §5 Schritt 0.4 ein Referenz-Link einfügen: "Vertragsreferenz: VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5 STRUKTUR-FREEZE-Definition."
3. Phase-1-Vertrag (wenn geschrieben) und Phase-2-Vertraege (wenn geschrieben) müssen direkt in ihrer Einleitung referenzieren: "STRUKTUR-FREEZE als definiert in WORKFLOW_v4.md via VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5 muss beachtet werden."

**Delta zu v1:** BESTAETIGT (QA-H8 und M-QA10 aus Befund v1)

---

### [RA3-F03] Artefakt-Propagation von SKRIPT zu Phase-1-Material nicht vertraglich spezifiziert

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT.md §3.3 (Artefakt-Marker-Syntax), WORKFLOW_v4.md §5 Schritt 0.3 und Schritt 0.4 (Phase-1-Input), VERTRAG_PHASE_0-2_INHALT.md (Artefakt-IDs definiert)  
**Beschreibung:** Die INHALTSBASIS (Phase 0.2) definiert Artefakt-IDs konsistent: `img-[mappe]-[laufnummer]`, `zit-[mappe]-[laufnummer]`, `rolle-[mappe]-[laufnummer]` (VERTRAG_PHASE_0-2_INHALT.md §4 ID-Konventionen). AGENT_SKRIPT positioniert diese Artefakte per Inline-Marker `[ARTEFAKT: {id} | {typ} | {beschreibung}]` (VERTRAG_PHASE_0-3_SKRIPT.md §3.3, QS4). WORKFLOW_v4.md §5 Schritt 0.1 (Phase 1 AGENT_MATERIAL) sagt: "Artefakt-Marker aus SKRIPT auswerten (img-IDs, zit-IDs, rolle-IDs → Materialtyp)". ABER: (1) Kein formaler Propagations-Vertrag definiert, wie die IDs von [ARTEFAKT]-Markern in SKRIPT zu data.json-Objekten in Phase 2 (Materialien, aufgaben) werden. (2) Kein Konsistenz-Gate definiert, um zu prüfen, dass alle img-X-Y aus INHALTSBASIS auch in SKRIPT referenziert sind und in Phase-2-Materialien landen. (3) Wenn in Phase 1 ein Artefakt-Marker übersehen wird oder eine ID falsch transkribiert wird, gibt es keinen formalen Checkpoint vor Phase 2.0+.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT.md §4: "Artefakt-IDs: `img-[mappe]-[laufnummer]` (z.B. `img-2-3`)", `zit-[mappe]-[laufnummer]`, `rolle-[mappe]-[laufnummer]`  
- VERTRAG_PHASE_0-3_SKRIPT.md §3.3: "[ARTEFAKT: {id} | {typ} | {beschreibung}]" — syntax definiert, aber kein Mapping-Vertrag zu Downstream  
- VERTRAG_PHASE_0-3_SKRIPT.md §5.1 QS4: "Jedes Artefakt aus INHALTSBASIS (img, zit, rolle) ist mindestens einmal im Skript referenziert." — Vollstaendigkeit-Check, aber keine Downstream-Propagation  
- WORKFLOW_v4.md §5 Schritt 0.1 (Phase 1): "Artefakt-Marker aus SKRIPT auswerten" — vage, keine Struktur-Vorgaben  
- Kein Phase-1-Vertrag existiert mit Spezifikation, wie [ARTEFAKT]-Marker zu material.medien[] oder material.quellen.referenzen[] in Phase 2 werden

**Impact:**  
Wenn Phase-1-AGENT_MATERIAL oder Phase-2-Subagenten die SKRIPT lesen und auf [ARTEFAKT]-Marker stossen, müssen sie selbst herausfinden, wie diese zu materialien/mat-N-M.json-Objekten oder aufgaben/aufgabe-N-K.json-Objekten mapping sollen. Keine standardisierte Propagation definiert. Risk: (a) Artefakt-IDs könnten in Phase 2.0/2.1 verloren gehen (Materialen ohne Bild-Referenzen), (b) Falsche Bilder koennten referenziert werden (ID-Fehler), (c) Keine Audit-Spur von INHALTSBASIS → SKRIPT → Material.

**Recommended Fix:**  
1. Phase-1-Vertrag (AGENT_MATERIAL) schreiben mit Sektion "Artefakt-Propagation": (a) Pro Mappe: Check SKRIPT auf [ARTEFAKT]-Marker. (b) Jeder Marker → Material-Typ-Kandidat (zit → quellentext, img → bildquelle, rolle → tagebuch). (c) Pro Material: Sektion "artefakt_referenzen" mit id, typ, quelle (INHALTSBASIS-Referenz).  
2. In WORKFLOW_v4.md §5 Schritt 0.1 konkrete Aufgabe aufnehmen: "Mapping-Tabelle: [ARTEFAKT]-ID → Materialtyp-Kandidat → Output-Feld in Phase-2-JSON."  
3. Phase-2.0 (Rahmen) oder Phase-2.1 (Material-Produktion) ein Propagations-Gate einfügen: "Alle img-X-Y aus INHALTSBASIS müssen in Phase-2-materialien/*.json als `medien[]`-Eintraege oder `quellen.referenzen[]` auffindbar sein. Q-Gate: 100% Propagation."

**Delta zu v1:** NEU (Erweiterung von QA-L1 "LOW" aus Befund v1, hochgestuft zu HIGH)

---

### [RA3-F04] Phase-1-Inputanforderungen (AGENT_MATERIAL) und SKRIPT-Output-Qualitaet ungenau abgestimmt

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT.md (Output-Definition), WORKFLOW_v4.md §5 Schritt 0.1 (Phase 1 Input)  
**Beschreibung:** WORKFLOW_v4.md §5 Schritt 0.1 (AGENT_MATERIAL) sagt: "**Eingabe:** Validiertes SKRIPT (gechunkt, mit Artefakt-Zuordnungen) + TAFELBILD pro Mappe (STRUKTUR-FREEZE)". Das ist vage. Was genau braucht AGENT_MATERIAL vom SKRIPT? Der SKRIPT-Vertrag definiert Outputs (Einstieg-Kontext, Skript-Text §-Absaetze, Artefakt-Zuordnung-Tabelle, Tafelbild-Entwurf, Sandwich-Uebergang), aber nicht explizit, welche Felder AGENT_MATERIAL als Pflicht-Inputs liest. QS4 fordert, dass Artefakt-Marker im Skript vollstaendig sind, aber kein Konsistenz-Gate definiert, ob die Artefakt-Marker-Tabelle (VERTRAG_PHASE_0-3_SKRIPT.md §3.2) hinreichend strukturiert ist für Phase-1-Parsing. Wenn AGENT_MATERIAL z.B. nur auf inline-Marker statt auf die Artefakt-Zuordnung-Tabelle zugreift, könnte Inkonsistenz entstehen.

**Evidenz:**  
- VERTRAG_PHASE_0-3_SKRIPT.md §3.2 Tabelle "Artefakt-Zuordnung": "Tabelle: ID, Typ-Kandidat, Skript-Ref (§), Beschreibung" — strukturiert  
- Dasselbe Material auch inline per [ARTEFAKT]-Marker im Skript-Text. Doppelte Quelle.  
- WORKFLOW_v4.md §5 Schritt 0.1: "Pro Mappe-Chunk: ... Artefakt-Marker aus SKRIPT auswerten..." — nicht spezifiziert, ob Tabelle oder inline gemeint  
- VERTRAG_PHASE_0-3_SKRIPT.md QS4: "≥3 Artefakt-Marker pro Chunk" — nur Quantität, nicht Struktur-Qualitaet

**Impact:**  
Wenn AGENT_MATERIAL beide Quellen (inline-Marker + Tabelle) verarbeitet und diese inkonsistent sind (z.B. Tabelle nennt 5 Artefakte, inline-Marker nennt nur 3), ist unklar, welche Quelle authoritative ist. Phase-1-Material könnte Artefakte übersehen oder duplizieren.

**Recommended Fix:**  
1. WORKFLOW_v4.md §5 Schritt 0.1 präzisieren: "Input-Spezifikation: (a) SKRIPT Volltext mit inline [ARTEFAKT]-Markern lesen. (b) Pro Chunk: Artefakt-Zuordnung-Tabelle (falls vorhanden) lesen als Konsistenz-Check. Authoritative Quelle: inline-Marker (da inline-Position für Materialplatzierung relevant)."  
2. SKRIPT-Vertrag QS4 ergänzen: "Inline-Marker + Tabelle müssen identisch sein (mengenmäßig). Bei Abweichung: FAIL."  
3. Phase-1-Vertrag (wenn geschrieben): "Input-Anforderung: SKRIPT muss pro Chunk mindestens 3 Artefakt-Marker inline enthalten, alle in Artefakt-Zuordnung-Tabelle gelistet und mit ID-Konsistenz validiert sein."

**Delta zu v1:** NEU

---

### [RA3-F05] Phase-1.5-Sequenzierbarkeit von Chunks nicht konkret operationalisiert

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT.md §5.3 QS7, WORKFLOW_v4.md §6.5 (Phase 1.5)  
**Beschreibung:** QS7 "Interne Sequenzierbarkeit (F-A3)" fordert: "Jeder Chunk enthaelt thematisch trennbare Einheiten, die in Phase 1.5 in verschiedene Materialreihenfolgen gebracht werden koennen. Kein Chunk, in dem alle Informationen chronologisch so verzahnt sind, dass nur eine einzige Material-Reihenfolge moeglich waere." Das ist das Kriterium für Phase-1.5-Sequenzplanung (Position, didaktische_funktion, voraussetzung). ABER: Was sind konkrete "thematisch trennbare Einheiten"? Sind das Paragraphen (§1, §2, ...)? Sind das Artefakt-Gruppen? Sind das Sätze? Keine Operationalisierung. SKRIPT-Vertrag gibt nur Struktur-Vorgaben (≥4 Knoten, ≥3 Verbindungen im Tafelbild-Entwurf), aber kein Syntax für "Trennbarkeitsmerkmal".

**Evidenz:**  
- VERTRAG_PHASE_0-3_SKRIPT.md §5.3 QS7: "thematisch trennbare Einheiten" — Begriff nicht definiert  
- Keine Markup-Syntax in SKRIPT-Output für Trennungspunkte oder Chunk-Unterteile  
- WORKFLOW_v4.md §6.5 (Phase 1.5): "Materialien in didaktisch sinnvolle Reihenfolge bringen" — was bedeutet "sinnvoll", wenn Sequenzierbarkeit nicht messbar ist?  
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md hat QS7 unter BLOCKER-Status, aber QA-H7 ist nur als "Ableitbarkeit operationalisieren" erwähnt, nicht Sequenzierbarkeit

**Impact:**  
Wenn AGENT_SKRIPT keinen expliziten Hinweis gibt, welche Teile eines Chunks sequ enz ierbar sind (z.B. "§1-§2 können vertauscht werden, §2-§3 nicht"), muss AGENT_MATERIAL (Phase 1.5) das selbst aus dem Skript-Text herleiten. Fehlerhafte Sequenzplanung ist möglich. Z.B. könnte ein chronologisch notwendiger Ablauf (Ursache → Wirkung) falsch sequenziert werden.

**Recommended Fix:**  
1. SKRIPT-Vertrag §3.4 "Absatz-Regeln" um Regel ergänzen: "Pro Chunk: Markiere sequenzier-kritische Verbindungen im Tafelbild-Entwurf durch "sequenz-invariant: Ja/Nein" bei jeder Verbindung. Ja = kann umdefiniert werden (in Phase 1.5), Nein = chronologisch-logisch bindend (muss behalten bleiben)."  
2. Tafelbild-Entwurf-Syntax erweitern: `Verbindungen: [{von, nach, label, sequenz_invariant}]`  
3. WORKFLOW_v4.md §6.5: "Phase 1.5 nutzt sequenz_invariant-Flag: Nur wenn ==Ja, kann Material-Reihenfolge veraendert werden."

**Delta zu v1:** NEU

---

### [RA3-F06] Rollenprofile und Zitate-Propagation ab Phase-1-Material nicht explizit geregelt

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT.md (Rollenprofile-Definition), VERTRAG_PHASE_0-3_SKRIPT.md (Artefakt-Marker), WORKFLOW_v4.md (Phase 1/2 Spezifikation fehlt)  
**Beschreibung:** INHALTSBASIS definiert Rollenprofile (rolle-X-Y) mit Struktur: ID, Rolle, Historische Basis, Typische Erfahrung, Wikipedia-Beleg, Mappe-Eignung. SKRIPT positioniert diese per [ARTEFAKT: rolle-X-Y | ...]-Marker. TAFELBILD-Hefteintrag endet aber — Rollenprofile sind nicht Teil der SCPL-Struktur oder hefteintrag.json. Nun: Was geschieht mit Rollenprofilen in Phase 1 und Phase 2? (a) Sollen sie zu Tagebuch-Material werden? (b) Sollen sie als historischer Kontext in Quellentext einfliessen? (c) Sollen sie in Aufgaben (z.B. Rollenspiels) genutzt werden?

Ähnlich Zitate: zit-X-Y werden in INHALTSBASIS mit Kontext und Quelle definiert, im SKRIPT eingebettet, aber in Phase 2 ist unklar, ob Zitate als "Quellentext-Material" oder als "Merksatz in hefteintrag.json" oder als "Aufgaben-Element" fungieren.

**Evidenz:**  
- VERTRAG_PHASE_0-2_INHALT.md §4 ID-Konventionen: `rolle-[mappe]-[laufnummer]`, Rollenprofil-Tabelle mit 6 Feldern (Rolle, Historische Basis, Typische Erfahrung, ...)  
- VERTRAG_PHASE_0-3_SKRIPT.md §3.3: [ARTEFAKT: rolle-X-Y | tagebuch | ...] als erlaubter Typ  
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md: Rollenprofile nicht erwähnt. Hefteintrag = SCPL-Struktur, keine Rollenprofile-Sektionen  
- WORKFLOW_v4.md §7 Phase 2.1: "SUB_TAGEBUCH" als Subagent erwähnt, aber keine Spezifikation, dass rolle-X-Y als Input fungiert  
- BEFUND QA-H9: "Rollenprofile-Informationsbruch" mit Massnahme M-QA11: "In Phase-1-Vertrag regeln: Rollenprofile fliessen als Quellenmaterial fuer perspektivische Darstellungstexte und Rollenspiel-Aufgaben ein"

**Impact:**  
Wenn keine Phase-1/2-Vertrag existiert, der Rollenprofile und Zitate explizit als Material-Input regelt, können diese Artefakte verloren gehen oder falsch genutzt werden. Z.B. könnte ein Rollenprofil als inline-Text in einem Quellentext landen (falsch), statt als Basis für ein separates Tagebuch-Material (richtig). Zitate könnten dupliziert werden (einmal als Artefakt-Marker im SKRIPT, einmal als Zitat im Material), statt konsistent genutzt zu werden.

**Recommended Fix:**  
1. Phase-1-Vertrag (AGENT_MATERIAL) schreiben mit Sektion "Rollenprofile und Zitate-Nutzung": (a) Pro rolle-X-Y im SKRIPT: 1 Tagebuch-Material als Kandidat. (b) Pro zit-X-Y im SKRIPT: Einteilung in "Quellentext" vs. "Aufgaben-Zitat" vs. "Hefteintrag-Merkzitat". (c) Tabelle: rolle/zit-ID → Material-Typ → Position im MATERIAL_GERUEST.  
2. WORKFLOW_v4.md Phase 2.1 "SUB_TAGEBUCH" Spezifikation: "Input: rolle-X-Y aus INHALTSBASIS (via Artefakt-Propagation aus SKRIPT). Struktur: Ich-Perspektive, historischer Kontext (aus Rollenprofil Historische Basis + Typische Erfahrung), ein konkretes Ereignis aus dem Chunk-Skript nacherleben."  
3. Aufgaben-Vertrag (Phase 2.2): Zitate können in Aufgaben-Fragen als Analysematerial einfliessen (falls in INHALTSBASIS "Eignung: Aufgabe-Material" gekennzeichnet).

**Delta zu v1:** BESTAETIGT (QA-H9 aus Befund v1, mit M-QA11 deferred bis Phase-1-Vertrag)

---

## Severity-Verteilung

| Severity | Anzahl | IDs |
|----------|--------|-----|
| CRITICAL | 0 | — |
| HIGH | 3 | RA3-F01, RA3-F02, RA3-F03 |
| MEDIUM | 3 | RA3-F04, RA3-F05, RA3-F06 |
| LOW | 0 | — |
| **TOTAL** | **6** | |

---

## Top-3-Empfehlungen (Priorisiert)

### 1. [PRIORITÄT CRITICAL-Äquivalent] RA3-F02: STRUKTUR-FREEZE kanonisch in WORKFLOW_v4 verankern

**Warum:**  
STRUKTUR-FREEZE ist der Garant für Produktions-Sicherheit ab Phase 1. Wenn Downstream-Agenten keine kanonische Referenz haben, können sie abweichende Annahmen treffen (z.B. situation.kontextsatz falsch als EINGEFROREN behandeln). Dies führt zu Fehler-Propagation durch alle Phasen 1, 1.5, 2.0, 2.1.

**Aktion:**  
WORKFLOW_v4.md §3 nach Differenzierter FREEZE eine kanonische Referenz-Sektion einfügen. VERTRAG_PHASE_0-4_HEFTEINTRAG.md §5-Tabelle als Link zur Referenz. Alle Downstream-Vertraege (Phase 1, 2.0, 2.1, 2.1c, 2.2) müssen diese Referenz in ihrer Einleitung zitieren: "@ref WORKFLOW_v4.md STRUKTUR-FREEZE-Definition".

**Aufwand:** S (kleine Dokumentations-Änderung)

---

### 2. [PRIORITÄT HIGH] RA3-F03: Artefakt-Propagation von SKRIPT zu Phase-1 vertraglich spezifizieren

**Warum:**  
Artefakte (img-X-Y, zit-X-Y, rolle-X-Y) sind inhaltlicher Rückgrat der Materialien. Wenn Propagation nicht vertraglich abgesichert ist, entstehen Lücken oder Fehler. Phase-1-Vertrag (AGENT_MATERIAL) ist Vorbedingung für sichere Produktion.

**Aktion:**  
Phase-1-Vertrag schreiben (AGENT_MATERIAL.md Anpassung) mit:
- Sektion "Artefakt-Propagation": Mapping von [ARTEFAKT]-Markern im SKRIPT zu Material-Typen.
- Input-Spezifikation: INHALTSBASIS + SKRIPT + TAFELBILD (Artefakt-Referenzen explizit durchgängig).
- Q-Gate: "Alle img-X-Y, zit-X-Y, rolle-X-Y aus INHALTSBASIS sind im SKRIPT mindestens 1x referenziert und in Phase-1-MATERIAL_GERUEST zugeordnet. Propagation 100%."

**Aufwand:** M (erfordert Phase-1-Vertrag-Schreiben)

---

### 3. [PRIORITÄT HIGH] RA3-F01: JSON-Schema formalisieren mit Placeholder-Handling

**Warum:**  
Ohne formales JSON-Schema können Phase-2-Agenten die Struktur nicht maschinell validieren. Placeholder "[REVISION IN 2.1c]" ist konventionell, aber nicht robust. Fehleranfälligkeit bei Automatisierung oder Mehrsprachigkeit.

**Aktion:**  
1. `.json.schema` für hefteintrag.json und sicherung.json erstellen (JSON-Schema Standard).
2. Conditional-Rules für Placeholder-Werte definieren (z.B. "Wenn zusammenfassung=Placeholder, darf Phase-2.1 sie nicht ignorieren").
3. WORKFLOW_v4.md Phase-2.0-Dispatch (Zeile 484-498) um Schema-Validierungs-Schritt ergänzen: "Vor Persistierung: JSON gegen Schema validieren. Bei Fehler: Findings dokumentieren."

**Aufwand:** M (Schema-Design, Integration in Phase-2-Prozess)

---

## Konvergenz mit Befund v1

| RA3-Finding | Befund-v1-Verweis | Vergleich |
|---|---|---|
| RA3-F01 (JSON-Schema-Inkompatibilität) | K3 (Phase-2.0-JSON-Schema-Konsistenz) | **BESTAETIGT + VERSCHAERFT**: Finding detailliert Placeholder-Inkompatibilität |
| RA3-F02 (STRUKTUR-FREEZE nicht kanonisch) | QA-H8, M-QA10 | **BESTAETIGT + OPERATIONALISIERT**: Konkrete Fix-Aktion (WORKFLOW-Update + Referenz-Links) |
| RA3-F03 (Artefakt-Propagation keine Vertrag) | K4 (Artefakt-Propagation hat Luecken), QA-L1 | **BESTAETIGT + HOCHGESTUFT**: War LOW (QA-L1) in Befund, jetzt HIGH in RA3 (benötigt Phase-1-Vertrag) |
| RA3-F04 (Phase-1-Input ungenau) | — | **NEU** |
| RA3-F05 (Phase-1.5-Sequenzierbarkeit nicht operationalisiert) | QS7 erwähnt in Befund, aber nicht als eigenständig gefunden | **NEU (Erweiterung von QS7-Struktur)** |
| RA3-F06 (Rollenprofile/Zitate-Propagation) | QA-H9, M-QA11 | **BESTAETIGT (deferred bis Phase-1-Vertrag)** |

---

## Fazit für RA3

Die Phase-0-Vertraege bilden eine **funktionsfähige, aber asymmetrisch dokumentierte Downstream-Schnittstelle**. JSON-Schema ist inhaltlich vollständig (TAFELBILD-JSON Phase-0.4 → hefteintrag.json Phase-2.0), aber formal nicht maschinell validierbar. STRUKTUR-FREEZE-Definition ist präzise, wird aber nicht kanonisch referenziert. Artefakt-Propagationskette ist intent-getreu definiert, aber vertraglich nicht durchgängig abgesichert bis Phase 2.

**Empfohlene Nächste Schritte (Welle 1):**
1. M-QA10 (STRUKTUR-FREEZE kanonisch): WORKFLOW_v4.md Update, Tag: (tag.workflow-strukt-freeze)
2. Phase-1-Vertrag schreiben: Mit Artefakt-Propagation + Rollenprofile-Spezifikation (RA3-F03, RA3-F06)
3. JSON-Schema formalisieren: hefteintrag.json + sicherung.json (RA3-F01)

**Gate-Urteil:** **YELLOW** — Pipeline ist produktionsreif für Phase 1/1.5/2.0 mit Befundkenntnissen. HIGH-Findings erfordern Dokumentations-/Prozess-Klarung vor komplexen Multi-Game-Produktionen.

