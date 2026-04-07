# VERTRAG Phase 0.4 — AGENT_HEFTEINTRAG (Tafelbild / Hefteintrag-Entwurf)

**Version:** v1.1 (Welle-1-Patches: Complication-Erweiterung, Eskalationspfade)
**Datum:** 2026-04-06
**Extrahiert aus:** WORKFLOW_v4.md §5 Schritt 0.4, ORCHESTRATOR.md [0.4], GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14), Game-1 TAFELBILD-Artefakte (Ist-Format)
**Kanonisch fuer:** Phase 0.4 jedes neuen Escape-Games
**Begruendung:** BEFUND_PHASE_0_ARCHITEKTUR_EVALUATION.md Finding F-A2 (HIGH) — fehlender Vertrag fuer STRUKTUR-FREEZE-Garant

---

## 1. Rolle

AGENT_HEFTEINTRAG synthetisiert aus dem validierten SKRIPT die Quintessenz des Lernzuwachses pro Mappe als **strukturiertes Tafelbild + Hefteintrag**. Das Artefakt definiert die Zielstruktur, auf die alle nachfolgenden Materialien hinarbeiten (P3: "Sicherung steuert vom Ende her").

**Kritische Funktion:** AGENT_HEFTEINTRAG ist der STRUKTUR-FREEZE-Garant. Nach Q-Gate PASS sind SCPL-Zonen, Kernerkenntnisse, Fachbegriffe, Ordnungsmuster und Stundenfrage fuer den Rest der Pipeline unveraenderlich. Defizite propagieren sich durch Phase 1, 1.5, 2.0-2.3.

**Abgrenzung:** AGENT_HEFTEINTRAG extrahiert und strukturiert — er erfindet keine neuen Inhalte. Alle Kernerkenntnisse muessen im SKRIPT auffindbar sein. Mappen-Struktur (→ AGENT_DIDAKTIK, Phase 0.1) und Narrativ (→ AGENT_SKRIPT, Phase 0.3) werden nicht veraendert. Reflexionsfragen und Ueberleitungen gehoeren NICHT in den Hefteintrag (→ Mappenabschluss-Zone, Phase 2.0).

---

## 2. Input

| Parameter | Quelle | Pflicht | Gelesene Felder |
|---|---|---|---|
| SKRIPT_[game-id].md | Phase 0.3 (validiert) | Ja | Chunk pro Mappe: Volltext, Artefakt-Marker, Fachbegriffe |
| DIDAKTIK_RAHMEN_[game-id].md | Phase 0.1 | Ja | KE-Matrix, Sicherungsziele, Mappen-Grobstruktur (Titel, Schwerpunkt) |
| INHALTSBASIS_[game-id].md | Phase 0.2 | Ja | Artefakt-Inventar (qualifizierte Artefakte pro Mappe — fuer G5 Artefakt-Integration) |
| GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md | docs/checklisten/ | Ja | G1-G14 vollstaendig |
| Vorheriges TAFELBILD_Mappe[N-1].md | Phase 0.4 (ab Mappe 2) | Bedingt | Ordnungsmuster, Sprachregister, Komplexitaetsniveau (fuer G9 Progression) |

**Verarbeitungsreihenfolge:** Mappe 1 → Mappe 2 → ... → Mappe N (sequentiell, weil G9 Progression gegen Vorgaenger-TB prueft).

---

## 3. Aufgabe (SCPL-Struktur)

Pro Mappe:

1. **Stundenfrage formulieren:** Problemorientiert, max. 12 Woerter. Muss durch Materialarbeit beantwortbar sein.
2. **Kernerkenntnisse extrahieren:** Max. 3 pro Mappe, je max. 15 Woerter. Muessen im SKRIPT-Chunk auffindbar sein (Synthese, nicht Erfindung).
3. **Ordnungsmuster waehlen:** kausal | chronologisch | kategorial | parallel-kausal | kontrastierend | sequenziell | metaphorisch | relational | konzept-beispiel. Wahl muss zum Chunk-Inhalt passen.
4. **SCPL-Struktur aufbauen:**
   - Situation: Kontextsatz (Ausgangslage)
   - Complication[]: Didaktische Problematisierungen aus Schuelerperspektive (min. 1, max. 4). Eine Complication ist NICHT auf narrative Wendepunkte beschraenkt — sie erfasst jede Form der Problematisierung: "Warum war das ein Problem?", "Was machte die Situation schwierig?", "Welcher Widerspruch entsteht?", "Was wussten die Menschen damals (noch) nicht?". Auch kategoriale oder konzeptuelle Themen haben eine Problematisierungsdimension (z.B. "Warum konnten sich die Menschen nicht einfach wehren?").
   - Problem: Zentrale Problemstellung (korrespondiert mit Stundenfrage)
   - Loesung[]: Kernerkenntnisse als Merksaetze (= scpl.loesung[], wird zu Merkbox-Inhalt)
5. **Erarbeitbarkeits-Pruefung:** Pro SCPL-Schritt markieren: DIRECT (durch Materialarbeit direkt erschliessbar) / ARTIFACT (durch Artefakt-Analyse) / INFERENTIAL (durch Schlussfolgerung aus Material). Mindestens 70% DIRECT + ARTIFACT.
6. **Stilregeln einhalten:** Fachbegriffe per Doppelpunkt oder Gedankenstrich erklaert (nie Klammern). Pfeile nur als Symbol (→, ←, ↔). Keine Reflexionsfragen im Hefteintrag.

---

## 4. Output: TAFELBILD_[game-id]_Mappe[N].md

### Pflicht-Sektionen

| Sektion | Inhalt | Pruefung |
|---|---|---|
| **Header** | Game-ID, Mappe-Nr, Erstellungsdatum, Phase, Validierungsstatus | QH1 |
| **Stundenfrage** | Problemorientierte Frage (max. 12 W) | QH2, G1 |
| **SCPL-JSON** | `scpl`-Objekt mit situation, complication[], problem, loesung[] | QH3, G14 |
| **Knoten und Verbindungen** | `knoten[]` und `verbindungen[]` (Legacy-Felder, leere Arrays in v4) | QH3 |
| **Erarbeitbarkeits-Nachweis** | Pro SCPL-Schritt: DIRECT / ARTIFACT / INFERENTIAL | QH5 |
| **Merksaetze** | 1-3 Saetze als Antwort auf Stundenfrage (= scpl.loesung[]) | QH4, G6 |
| **Transfer-Frage** | Offene Weiterdenk-Frage (ausserhalb Hefteintrag, fuer Mappenabschluss-Zone) | QH6 |
| **Fachbegriffe** | Liste der im Hefteintrag verwendeten Fachbegriffe mit Erklaerung | QH7 |

### JSON-Struktur (Phase-2.0-kompatibel)

```json
{
  "stundenfrage": "...",
  "scpl": {
    "situation": { "kontextsatz": "..." },
    "complication": [
      { "schritt": "...", "typ": "narrativ|konzeptuell|kontrastiv|kausal", "erarbeitbarkeit": "DIRECT|ARTIFACT|INFERENTIAL" }
    ],
    "problem": { "satz": "..." },
    "loesung": [
      { "kernerkenntnis": "...", "erarbeitbarkeit": "DIRECT|ARTIFACT|INFERENTIAL" }
    ]
  },
  "ordnungsmuster": "kausal|chronologisch|kategorial|...",
  "fachbegriffe": ["..."],
  "knoten": [],
  "verbindungen": [],
  "transfer": { "frage": "..." },
  "voraussetzungen": { "vorgaenger_mappe": null | "Mappe N-1 Kernerkenntnisse" }
}
```

**Kanonisches Schema:** `docs/architektur/SCHEMA_HEFTEINTRAG_JSON.md` — formale JSON-Schema-Definition mit Validierungsregeln und Phase-2.0-Uebernahme-Protokoll.

**Phase-2.0-Kompatibilitaetsklausel:** Dieses JSON wird in Phase 2.0 (Rahmen-Produktion) 1:1 als `rahmen/hefteintrag.json` uebernommen. Das Format MUSS daher:
- Alle Felder enthalten, die Phase 2.0 erwartet (scpl, stundenfrage, ordnungsmuster, fachbegriffe)
- `scpl.loesung[]` als Kernerkenntnisse/Merkbox-Inhalt interpretierbar sein (M3b-Konsistenz)
- Keine Felder enthalten, die erst in Phase 2.1c produziert werden (zusammenfassung, ueberleitung → Placeholder "[REVISION IN 2.1c]")

---

## 5. STRUKTUR-FREEZE-Definition

Nach Q-Gate PASS gilt:

| Element | Status | Aenderbar bis |
|---|---|---|
| SCPL-Zonen (Anzahl, Reihenfolge, Typ) | **EINGEFROREN** | Nie (nur via User-Entscheidung nach Eskalation) |
| Kernerkenntnisse / scpl.loesung[] | **EINGEFROREN** | Nie |
| Fachbegriffe | **EINGEFROREN** | Nie |
| Ordnungsmuster | **EINGEFROREN** | Nie |
| Stundenfrage | **EINGEFROREN** | Nie |
| situation.kontextsatz | FORMULIERUNGS-OFFEN | Phase 2.1c Achse 6 |
| complication[].schritt | FORMULIERUNGS-OFFEN | Phase 2.1c Achse 6 |
| problem.satz | FORMULIERUNGS-OFFEN | Phase 2.1c Achse 6 |
| zusammenfassung | NICHT PRODUZIERT | Erst Phase 2.1c |
| ueberleitung | NICHT PRODUZIERT | Erst Phase 2.1c |

**Eskalationspfad:** Wenn AGENT_MATERIAL (Phase 1/2) feststellt, dass ein SCPL-Schritt nicht erarbeitbar ist: `[TB-REVISION NOETIG — Grund]` → User-Entscheidung. Kein Agent darf STRUKTUR-FREEZE-Elemente eigenmaechtg aendern.

---

## 6. Q-Gate

### Stufe 1: Operative Kriterien (QH1-QH7)

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QH1 | Vollstaendigkeit Dokument-Struktur | Alle Pflicht-Sektionen vorhanden. Header mit Game-ID, Mappe-Nr, Validierungsstatus. | BLOCKER |
| QH2 | Stundenfrage-Qualitaet | Problemorientiert, max. 12 W, durch Materialarbeit beantwortbar, nicht trivial (Ja/Nein). | HIGH |
| QH3 | SCPL-Struktur vollstaendig | Alle 4 Zonen (S, C[], P, L[]) vorhanden. Min. 1 Complication (als didaktische Problematisierung — narrativ, konzeptuell, kontrastiv oder kausal). Min. 1 Loesung. Jede Complication hat `typ`-Feld. JSON-Schema valide. Knoten/Verbindungen als leere Arrays. | BLOCKER |
| QH4 | Kernerkenntnisse-Qualitaet | Max. 3 pro Mappe. Je max. 15 W. Im SKRIPT-Chunk auffindbar (Synthese-Extraktion, nicht Erfindung). Beantwortet Stundenfrage. | HIGH |
| QH5 | Erarbeitbarkeits-Nachweis | Pro SCPL-Schritt markiert. Mindestens 70% DIRECT + ARTIFACT. Kein SCPL-Schritt ohne Nachweis. | HIGH |
| QH6 | Transfer-Frage vorhanden | Offene Frage, ausserhalb Hefteintrag. Weist ueber Mappe hinaus. | MEDIUM |
| QH7 | Fachbegriffe dokumentiert | Alle im Hefteintrag verwendeten Fachbegriffe gelistet. Uebereinstimmung mit DIDAKTIK_RAHMEN und SKRIPT. | MEDIUM |

### Stufe 2: Guetekriterien G1-G14

Kanonische Referenz: `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md`

| Kategorie | Kriterien | Severity |
|---|---|---|
| MUSS | G1 (Reduktion ≤10 Elemente), G3 (Erarbeitbarkeit), G6 (Merksatz als Stundenfragen-Antwort), G8 (Sprachregister R7), G11 (Keine Ueberladung — max. 120 W), G14 (SCPL-Kohaerenz) | BLOCKER (G1, G14), HIGH (G3, G6, G8, G11) |
| SOLL | G2 (Strukturiertheit), G5 (Artefakt-Integration), G9 (Progression gegen Vorgaenger), G10 (Fachbegriffe korrekt verortet) | MEDIUM |
| KANN | G4 (Visualisierbarkeit), G7 (Aesthetik-Potential), G12 (Lehrplan-Referenzierbarkeit), G13 (Multiperspektivitaet-Ansatz) | LOW |

### Stufe 3: Rueckwaerts-Kontingenz (Downstream-Kompatibilitaet)

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QH-RC1 | Phase-2.0-Kompatibilitaet | JSON-Struktur 1:1 als hefteintrag.json uebernehmbar. Alle Phase-2.0-Pflichtfelder vorhanden. | HIGH |
| QH-RC2 | Phase-1-Erarbeitbarkeit | Fuer jeden SCPL-Schritt ist mindestens ein Materialtyp denkbar, der die Erarbeitung ermoeglicht. Kein SCPL-Schritt, der nur durch Lehrervortrag erarbeitbar waere. | HIGH |
| QH-RC3 | Kernerkenntnisse-Konsistenz (M3b) | scpl.loesung[] korrespondiert mit den KE aus DIDAKTIK_RAHMEN fuer diese Mappe. Kein Widerspruch zwischen Kernerkenntnis und KE-Schwerpunkt. | HIGH |

**Gate-Urteil:** PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung (max. 1 Iteration). Wenn nach Iteration nicht loesbar:

| Eskalationstyp | Ausloeser | Agent-Aktion |
|---|---|---|
| **E-H1 SCPL-Restrukturierung** | QH3 FAIL — SCPL-Zonen nicht aus SKRIPT ableitbar | Agent waehlt alternatives Ordnungsmuster, dokumentiert als `[FALLBACK: E-H1]`. Volles Q-Gate. |
| **E-H2 Kernerkenntnis-Anpassung** | QH4 FAIL — Kernerkenntnisse nicht im SKRIPT auffindbar | Agent dokumentiert Synthese-Luecke + Ruecklauf-Empfehlung an AGENT_SKRIPT. |
| **E-H3 Ruecklauf zu SKRIPT** | Strukturelles Problem im SKRIPT (nicht nur Formulierung) | Praezises Finding an AGENT_SKRIPT (Phase 0.3 Ruecklauf-Szenario). Max. 1 Iteration. |

Jeder Fallback MUSS: (1) als `[FALLBACK: Typ — Begruendung]` im Output markiert sein, (2) Q-Gate erneut durchlaufen, (3) im "Eskalations-Log" des Tafelbilds dokumentiert werden.

**User-Validierung:** PFLICHT (im Verbund mit SKRIPT-Validierung). Lehrkraft prueft: Stundenfrage-Eignung, Kernerkenntnisse-Passung, SCPL-Nachvollziehbarkeit, Erarbeitbarkeits-Plausibilitaet.

---

## 7. Konventionen

- **Sprache:** Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)
- **Game-ID:** Uebernommen aus DIDAKTIK_RAHMEN
- **Dateiname:** `TAFELBILD_[game-id]_Mappe[N].md` (N = Mappe-Nummer, 1-basiert)
- **Ablageort:** `docs/agents/artefakte/`
- **Ort der Ausfuehrung:** Cowork
- **Prompt-Datei:** `docs/agents/AGENT_HEFTEINTRAG.md` (zu schreiben — F-A5)
- **Verarbeitungsreihenfolge:** Sequentiell Mappe 1 → N (G9 Progression erfordert Vorgaenger-Zugriff)
