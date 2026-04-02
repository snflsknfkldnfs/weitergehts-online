# Upgrade-Plan v2.1 → v3: Tafelbild-Professionalisierung

**Datum:** 2026-03-26 (aktualisiert: Architektur-Revision — TB nach SKRIPT)
**Status:** Phase v3-3 abgeschlossen (WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR angepasst). Phase v3-4 (Engine-Erweiterung) bereit.
**Kern-These:** Das Tafelbild ist die Quintessenz des Lernzuwachses pro Mappe. Es verdient einen eigenen Agenten, ein eigenes Guete-Framework und eine Doppel-Repraesentation (digital + analog).
**Empirische Basis:** DG B2 Tafelbild.pdf (10 Grundsaetze), 8 Excalidraw-TBs + 8 Verlaufsplaene aus Silas' 1.WK-Sequenz (exakt unser Thema). Synthese in `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md`.

---

## 1. Diagnose: Tafelbild in v2.1

### Ist-Zustand

| Aspekt | v2.1 | Problem |
|---|---|---|
| Entstehungsort | AGENT_SKRIPT (Nebenprodukt, Aufgabe 5) | Kein eigenstaendiger Qualitaetsfokus |
| Detaillierung | AGENT_MATERIAL Phase 1 (Spalte in Tabelle) | Rein additive Ergaenzung, keine Gesamtpruefung |
| Guetekriterien | Keine eigenen — nur "3-8 Knoten, Typen zuweisen" | Keine didaktischen Qualitaetsmasstaebe |
| Output-Format | JSON: knoten[] + verbindungen[] | Nur maschinell — kein Hefteintrag, keine Anschlussfaehigkeit |
| Funktion im Workflow | Abfallprodukt → Engine rendert SVG | Keine Steuerungsfunktion fuer nachfolgende Agenten |
| Bezug zu KE | Implizit ueber Skript-Passagen | Kein expliziter Nachweis KE → Tafelbild-Element |

### Kernproblem

Das Tafelbild bildet die **Struktur** des Inhalts ab (Knoten + Kanten), nicht die **Quintessenz des Lernzuwachses**. Ein Hefteintrag muss beides leisten: visuell-strukturierte Kernerkenntnisse UND sprachlich ausformulierte Merksaetze, die analoge Anschlussfaehigkeit gewaehrleisten.

---

## 2. Zielbild v3

### Tafelbild = Sicherungsinstrument mit Doppel-Repraesentation

| Eigenschaft | Beschreibung |
|---|---|
| **Digital** | JSON-Struktur (knoten[], verbindungen[]) fuer Engine-Rendering als interaktives SVG |
| **Analog** | Halbseitiger Hefteintrag (~DIN-A5-Haelfte): Strukturskizze + Kernerkenntnisse als Merksaetze |
| **Funktion im Workflow** | Synthese-Extrakt aus SKRIPT — wird zur Zielstruktur fuer MATERIAL (was muss erarbeitbar sein?) |
| **Guetekriterien** | Empirisch fundiert aus DG B2 Tafelbild.pdf + 190 Hefteintrag-Beispielen im Repository |
| **QM** | Eigenes Q-Gate mit didaktisch begruendeten Pruefpunkten |

### Neue Agenten-Sequenz (v3)

```
Phase 0: INHALTSGERUEST
━━━━━━━━━━━━━━━━━━━━━━━
0.1  AGENT_DIDAKTIK     → KE-Matrix, Mappen-Struktur, Schwierigkeitskurve
0.2a AGENT_INHALT       → Wikipedia-Sachanalyse, INHALTSBASIS
0.2b AGENT_ARTEFAKT     → Artikelbasierte Artefakt-Sichtung, ARTEFAKT_INVENTAR
0.3  AGENT_SKRIPT       → Lineares Skript (erweitert: 600-900 W/Chunk)
     User-Validierung: PFLICHT
0.4  AGENT_HEFTEINTRAG    → Tafelbild pro Mappe (JSON + Hefteintrag)        ← NEU
```

**Architektur-Begruendung fuer TB nach SKRIPT:**
Das Tafelbild ist die Quintessenz des didaktisierten Narrativs. Es extrahiert aus dem SKRIPT, was Schueler:innen als Kernerkenntnisse mitnehmen sollen. Erarbeitbarkeit ist natuerlich gegeben, weil der narrative Pfad (SKRIPT) bereits existiert. MATERIAL stellt dann sicher, dass jeder TB-Knoten durch konkretes Material erarbeitbar wird.

Fruehere Architektur (TB vor SKRIPT, Backward Design) wurde verworfen, weil: (1) Erarbeitbarkeits-Pruefung gegen INHALTSBASIS (Roh-Fakten) spekulativ bleibt — Material basiert auf SKRIPT, nicht auf INHALTSBASIS direkt. (2) SKRIPT muss sich an eine Knoten-Struktur halten, die ohne narrativen Kontext entstanden ist. (3) Im realen Unterricht entsteht das TB aus der didaktisierten Stunde, nicht umgekehrt.

### Aenderung gegenueber v2.1

| Aspekt | v2.1 | v3 |
|---|---|---|
| Tafelbild-Entstehung | AGENT_SKRIPT (Nebenprodukt) | AGENT_HEFTEINTRAG (eigenstaendig, Phase 0.4) |
| Tafelbild-Position | Im Skript (Aufgabe 5) | Nach Skript — extrahiert Quintessenz aus didaktisiertem Text |
| Tafelbild-Format | Nur JSON (knoten/verbindungen) | JSON + Hefteintrag-Text (dual) |
| AGENT_SKRIPT | Erstellt Tafelbild-Entwurf | Aufgabe 5 entfaellt — SKRIPT wird ausfuehrlicher (600-900 W/Chunk) |
| AGENT_HEFTEINTRAG | Nicht vorhanden | Synthese-Extrakt aus SKRIPT — wird Zielstruktur fuer MATERIAL |
| AGENT_MATERIAL | Detailliert Tafelbild | Verifiziert TB-Abdeckung — Tafelbild ist kanonisch |
| Guetekriterien | Implizit (3-8 Knoten) | Explizit, empirisch fundiert (G1-G13) |
| Rueckkopplung | Keine | Skript → Tafelbild → Material → Aufgaben (durchgehende Traceability) |

---

## 3. AGENT_HEFTEINTRAG: Grobentwurf

### Rolle

Erstellt pro Mappe ein Tafelbild als Sicherungsinstrument, das die Quintessenz des Lernzuwachses in einer dual verwendbaren Form (digital + analog) abbildet. Arbeitet nach empirisch fundierten Guetekriterien fuer Tafelbilder/Hefteintraege.

### Eingabe

| Parameter | Quelle |
|---|---|
| SKRIPT_[game-id].md | Phase 0.3 (didaktisiertes Narrativ, 600-900 W/Chunk, Artefakt-Zuordnungen) |
| DIDAKTIK_RAHMEN | Phase 0.1 (KE-Matrix, Mappen-Struktur, Sicherungsziel pro Mappe) |
| ARTEFAKT_INVENTAR | Phase 0.2b (qualifizierte Artefakte mit Knoten-Zuordnung) |
| GUETEKRITERIEN_HEFTEINTRAG_ENTWURF | Kanonische Referenz (aus Artefakt-Auswertung, siehe Phase v3-0) |
| Vorheriges Tafelbild | (Ab Mappe 2) JSON des vorherigen Tafelbilds — fuer Progression (G9) |

### Output (Dual)

**A. JSON-Repraesentation** (fuer Engine):
```json
{
  "knoten": [
    { "id": "k1-1", "text": "...", "typ": "kernbegriff", "merksatz": "..." }
  ],
  "verbindungen": [
    { "von": "k1-1", "nach": "k1-2", "label": "..." }
  ],
  "voraussetzungen": ["kN-M"],
  "kernerkenntnisse": [
    "Merksatz 1 als ganzer Satz.",
    "Merksatz 2 als ganzer Satz."
  ]
}
```

Neu: `merksatz` pro Knoten und `kernerkenntnisse[]` als Array ausformulierter Saetze.

**B. Hefteintrag-Repraesentation** (fuer Analogtransfer):
```markdown
### Hefteintrag: [Mappe-Titel]

[Strukturskizze als Textbeschreibung — beschreibt das Tafelbild in Worten,
sodass SuS es ins Heft uebertragen koennen]

**Merke:**
- [Kernerkenntnis 1 als ganzer Satz]
- [Kernerkenntnis 2 als ganzer Satz]

Umfang: max. halbe DIN-A5-Seite (~80-120 Woerter)
```

### Q-Gate

Kanonische Referenz: `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` — 13 Kriterien (G1-G13), empirisch fundiert in Phase v3-0.

| Prio | Kriterien | Zusammenfassung |
|---|---|---|
| **MUSS** | G1-G6 | Lernziel-Kongruenz, Reduktion (max. 10 Knoten/3 Kernerkenntnisse), Erarbeitbarkeit, Strukturklarheit, Sprachliches Niveau, Hefteintrag-Transfer |
| **SOLL** | G7-G10 | Merksatz-Abschluss, Anschaulichkeit, Progression, Rekapitulierbarkeit |
| **KANN** | G11-G13 | Vermutungs-Sektion, Sprachregister-Passung, Stundenfrage als Titel |

Maschinelle Prueflogik pro Kriterium: siehe Abschnitt 8 in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md.

**Begriffsklaerung `kernerkenntnisse` vs. `merksatz`:**
- `kernerkenntnisse[]` = Array auf Tafelbild-Ebene: 1-3 uebergreifende Saetze, die die Quintessenz der ganzen Mappe zusammenfassen (erscheinen im "Merke:"-Block des Hefteintrags)
- `merksatz` = Feld pro Knoten: 1 Satz, der die spezifische Erkenntnis dieses einen Knotens formuliert (erscheint als Tooltip/Detail im Engine-Rendering)

---

## 4. Auswirkungen auf bestehende Agenten

### AGENT_SKRIPT (mittlere Aenderung)

| Aspekt | v2.1 | v3 |
|---|---|---|
| Aufgabe 5 (Tafelbild-Entwurf) | Eigenstaendig erstellen | **ENTFAELLT** — Tafelbild wird von AGENT_HEFTEINTRAG aus dem SKRIPT extrahiert |
| Wortbudget | 400-600 Woerter pro Chunk | **600-900 Woerter pro Chunk** — mehr Substanz fuer TB-Extraktion und Material-Ableitung |
| Neue Eingabe | — | Keine neue Eingabe — SKRIPT arbeitet weiterhin auf INHALTSBASIS + DIDAKTIK_RAHMEN |
| Ausgabe-Template | Enthaelt Tafelbild-Entwurf-Sektion | Tafelbild-Entwurf-Sektion **entfaellt** |
| Q-Gate | Q6 "Tafelbild-Entwurf vorhanden" | Q6 **entfaellt** (TB-Qualitaet wird von AGENT_HEFTEINTRAG geprueft) |

### AGENT_MATERIAL (mittlere Aenderung)

| Aspekt | v2.1 | v3 |
|---|---|---|
| Aufgabe 4 (Tafelbild detaillieren) | Knoten hinzufuegen erlaubt | **Tafelbild ist fixiert** — nur Erarbeitbarkeits-Nachweis |
| Erarbeitbarkeits-Nachweis | Tafelbild-Knoten ↔ Material | Unveraendert, aber strenger (Tafelbild ist kanonisch) |
| Einstieg/Sicherung | Sicherung frei formuliert | Sicherung = Verweis auf Hefteintrag + Reflexionsimpuls |

### AGENT_DIDAKTIK (geringe Aenderung)

Keine strukturelle Aenderung. Aber: DIDAKTIK_RAHMEN sollte pro Mappe ein **Sicherungsziel** explizit benennen (1 Satz: "SuS sollen nach dieser Mappe ..."), das AGENT_HEFTEINTRAG als Leitplanke erhaelt.

### Materialtyp-Subagenten (keine Aenderung)

Subagenten bleiben unveraendert. Ihre `tafelbild_knoten_abgedeckt`-Zuordnung referenziert weiterhin die gleiche Knoten-ID-Struktur.

### Engine (Erweiterung)

| Aspekt | v2.1 | v3 |
|---|---|---|
| Tafelbild-Rendering | SVG aus knoten[] + verbindungen[] | Zusaetzlich: Merksaetze unter SVG rendern |
| Hefteintrag | Nicht vorhanden | Optional: "Ins Heft uebernehmen"-Ansicht (Print-CSS) |
| Kernerkenntnisse | Nicht vorhanden | `kernerkenntnisse[]` als Text unter Tafelbild-SVG |

---

## 5. Umsetzungsplan (Phasen)

### Phase v3-0: Artefakt-Auswertung (Guetekriterien) ✅ ABGESCHLOSSEN

**Ziel:** Empirisch fundierte Guetekriterien fuer Tafelbilder/Hefteintraege aus vorhandenen Primaerquellen extrahieren.

**Ausgewertete Artefakte:**
1. `DG B2 Tafelbild.pdf` — 10 Grundsaetze der Tafelbildgestaltung (Bauer/Hartmann)
2. 8 Excalidraw-Tafelbilder aus Silas' 1.WK-Sequenz (exakt unser Thema: Pulverfass Europa → Kriegsende)
3. 8 Verlaufsplaene derselben Sequenz (Erarbeitungswege: wie TB im Unterricht entsteht)

**Kern-Erkenntnisse:**
- Durchschnitt 9,25 Elemente pro TB (7-14 Spannweite) → Limit 10
- 60% ganze Saetze / 40% Schlagwoerter — Merksaetze in 6/8 TBs
- 3 Ordnungsmuster: kausal (50%), kategorial (37,5%), chronologisch (12,5%)
- TB entsteht im realen Unterricht NACH Erarbeitung (Sicherungsphase, 7-12 min)
- Material-Kategorien spiegeln sich 1:1 in TB-Struktur (empirisch belegt an allen 8 UEs)
- **Design-Inversion revidiert:** Backward Design gilt auf Ebene der KE-Definition (DIDAKTIK_RAHMEN), nicht auf Ebene der TB-Erstellung. TB entsteht nach SKRIPT als Synthese-Extrakt (vgl. E5)
- Leitsatz DG B2: "Tafelbild + Hefteintrag = bleibende Lernessenz einer UE"

**Output:** `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` — 13 gewichtete Kriterien (6 MUSS, 4 SOLL, 3 KANN), Q-Gate-Protokoll, Output-Format (JSON + Hefteintrag), Referenz-TB Mappe 1

### Phase v3-1: AGENT_HEFTEINTRAG erstellen ✅ ABGESCHLOSSEN

**Abhaengigkeit:** Phase v3-0 abgeschlossen (Guetekriterien liegen vor)

**Vorgehen:**
1. `docs/agents/AGENT_HEFTEINTRAG.md` geschrieben (Rolle, Eingabe, Aufgaben, Output dual, Q-Gate aus GUETEKRITERIEN)
2. Output-Template definiert: `TAFELBILD_[game-id]_Mappe[N].md`

**Output:** `docs/agents/AGENT_HEFTEINTRAG.md`

### Phase v3-2: AGENT_SKRIPT anpassen ✅ ABGESCHLOSSEN

**Abhaengigkeit:** Phase v3-1 abgeschlossen

**Vorgehen:**
1. Aufgabe 5 (Tafelbild-Entwurf) komplett entfernt
2. Wortbudget erhoeht: 400-600 → 600-900 Woerter pro Chunk
3. Ausgabe-Template: Tafelbild-Entwurf-Sektion entfernt
4. Q-Gate: Q6 ("Tafelbild-Entwurf vorhanden") entfernt
5. Keine neue Eingabe — SKRIPT arbeitet weiterhin frei auf INHALTSBASIS + DIDAKTIK_RAHMEN

**Output:** `docs/agents/AGENT_SKRIPT.md` (aktualisiert)

### Phase v3-3: WORKFLOW + AGENT_MATERIAL + ORCHESTRATOR anpassen ✅ ABGESCHLOSSEN

**Abhaengigkeit:** Phase v3-2 abgeschlossen

**Vorgehen:**
1. WORKFLOW_v2.md → v3: Phase 0.4 AGENT_HEFTEINTRAG eingefuegt, Phase 0.3 SKRIPT aktualisiert (kein TB-Entwurf, 600-900 W), Phase 1 MATERIAL aktualisiert (TB fixiert)
2. AGENT_MATERIAL.md: Aufgabe 1.1 (Tafelbild detaillieren) → Tafelbild-Abdeckung verifizieren (TB-FREEZE). Aufgabe 1.5 → Erarbeitbarkeits-Dokumentation (TB-Abdeckungs-Nachweis). Sicherung → Hefteintrag-Verweis + Reflexionsimpuls. Produktions-Modus 2.2 → TB uebernehmen statt produzieren.
3. ORCHESTRATOR.md: Agenten-Sequenz auf 8 Agenten aktualisiert, Phase 0.4 eingefuegt, Ausfuehrungsorte + Ruecklauf-Zuordnung + Referenz-Dokumente ergaenzt
4. DIDAKTIK_RAHMEN-Template: Sicherungsziel pro Mappe — wird bei Erstdurchlauf ergaenzt (kein separater Template-Fix noetig)

**Output:** WORKFLOW_v2.md (v3), AGENT_MATERIAL.md, ORCHESTRATOR.md (alle aktualisiert)

### Phase v3-4: Engine-Erweiterung (Claude Code) — ✅ UEBERGABE-PROMPT ERSTELLT

**Abhaengigkeit:** Phase v3-3 abgeschlossen

**Vorgehen:**
1. `escape-engine.js`: Merksaetze unter SVG-Tafelbild rendern
2. `theme-gpg.css`: Hefteintrag-Print-Styles (Bildschirm + Print)
3. `data.json`-Schema: `merksatz` in Knoten, `kernerkenntnisse[]` in Tafelbild, `hefteintrag_verweis` + `reflexionsimpuls` in Sicherung
4. Testdaten (`gpg-erster-weltkrieg-ursachen/data.json`): Mappe 1 mit v3-Feldern erweitern

**Output:** `docs/uebergabe/UEBERGABE_v3-4_ENGINE_ERWEITERUNG.md` (2026-03-28)

**Status:** Uebergabe-Prompt formuliert. Implementierung in Claude Code ausstehend.

### Phase v3-5: Validierung an Mappe 1

**Abhaengigkeit:** Phase v3-4 abgeschlossen

**Vorgehen:**
1. AGENT_HEFTEINTRAG auf Mappe 1 laufen lassen (Retrospektiv-Test)
2. Ergebnis vergleichen: v2.1-Tafelbild (6 Knoten, kein Hefteintrag) vs. v3-Tafelbild
3. Pruefen: Ist der Hefteintrag in ≤5 min ins Heft uebertragbar? Deckt er die KE ab?
4. Learnings dokumentieren

**Output:** Validierungsbericht, ggf. Nachjustierung

---

## 6. Risiken und Entscheidungen

| Risiko | Massnahme |
|---|---|
| SKRIPT zu duenn fuer TB-Extraktion | Wortbudget auf 600-900 W/Chunk erhoeht — mehr Ankerpunkte fuer TB und Material |
| TB-Extraktion verfehlt didaktische Intention | DIDAKTIK_RAHMEN (KE-Matrix + Sicherungsziel) als Leitplanke fuer TB — nicht nur SKRIPT |
| Guetekriterien zu akademisch | **MITIGIERT** durch 8 Praxis-TBs + 8 Verlaufsplaene aus exakt unserem Thema |
| Engine-Erweiterung blockiert v3-Rollout | Engine-Erweiterung ist optional fuer v3-Kern — Hefteintrag funktioniert auch als Markdown im Uebergabe-Prompt |

### Tafelbild-Revisions-Governance

Das Tafelbild ist nach Q-Gate PASS **eingefroren**. Folgende Regel gilt fuer AGENT_MATERIAL und alle nachfolgenden Agenten:

| Regel | Beschreibung |
|---|---|
| **TB-FREEZE** | Nach Q-Gate PASS in AGENT_HEFTEINTRAG darf AGENT_MATERIAL keine Knoten hinzufuegen, entfernen oder inhaltlich aendern |
| **Erlaubte Aenderung** | AGENT_HEFTEINTRAG setzt `skript_referenz` direkt bei Erstellung (da SKRIPT bereits vorliegt) |
| **Eskalationspfad** | Wenn AGENT_MATERIAL feststellt, dass ein Tafelbild-Knoten nicht durch Material erarbeitbar ist: `[TB-REVISION NOETIG: kN-M — Grund: ...]` markieren → User-Entscheidung erforderlich |
| **Keine stille Aenderung** | Kein Agent darf das Tafelbild-JSON ohne explizite User-Validierung modifizieren |

### Offene Entscheidungen

| # | Frage | Optionen | Entscheidung |
|---|---|---|---|
| E1 | Soll AGENT_HEFTEINTRAG ein eigenstaendiger Agent (eigene MD-Datei) oder ein Subagent (SUB_TAFELBILD) sein? | Agent: eigenstaendig, eigenes Q-Gate. Subagent: Teil von AGENT_SKRIPT oder AGENT_MATERIAL. | **ENTSCHIEDEN: Eigenstaendiger Agent** — Phase 0.4, nach SKRIPT. Begruendung: Eigenes Q-Gate (G1-G13), dualer Output, steuert MATERIAL. |
| E2 | Sollen Kernerkenntnisse/Merksaetze vom AGENT_HEFTEINTRAG oder vom AGENT_SKRIPT formuliert werden? | TAFELBILD: mit narrativem Kontext (SKRIPT liegt vor). SKRIPT: muesste Sicherungsziele antizipieren. | **ENTSCHIEDEN: TAFELBILD** — Empirisch belegt: 6/8 Praxis-TBs haben Merksaetze. TB hat jetzt vollen narrativen Kontext aus SKRIPT. |
| E5 | Soll TB vor oder nach SKRIPT stehen? | Vor SKRIPT: Backward Design, TB als Zielstruktur. Nach SKRIPT: TB als Synthese-Extrakt, Erarbeitbarkeit natuerlich gegeben. | **ENTSCHIEDEN: Nach SKRIPT (Phase 0.4)** — Erarbeitbarkeit gegen SKRIPT statt gegen INHALTSBASIS pruefen. SKRIPT schreibt frei, TB extrahiert. Material basiert auf SKRIPT, nicht auf INHALTSBASIS. |
| E3 | Welche Artefakte soll der User fuer Phase v3-0 bereitstellen? | DG B2 liegt vor. User hat weitere angekuendigt. | **ERLEDIGT** — DG B2 + 8 Excalidraw-TBs + 8 Verlaufsplaene aus Silas' 1.WK-Sequenz ausgewertet. User kann weitere nachliefern, Basis genuegt fuer v3-1. |
| E4 | Soll die Engine das Tafelbild als druckbaren Hefteintrag rendern (Print-CSS)? | Ja (voller Analogtransfer). Nein (Hefteintrag nur im Prompt/Markdown). | **Offen — Scope-Entscheidung. Empfehlung: Ja, aber als Phase v3-4 (nicht blockierend fuer v3-1 bis v3-3)** |

---

## 7. Zusammenfassung der Datei-Aenderungen

| Datei | Aenderung | Phase |
|---|---|---|
| `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` | NEU — Empirische Guetekriterien | v3-0 |
| `docs/checklisten/GUETEKRITERIEN_SKRIPT.md` | NEU — Fachdidaktische Guetekriterien SK1-SK15 (Vergegenwärtigung, Elementarisierung, Gestaltungsprinzipien) | v3-0+ |
| `docs/agents/AGENT_HEFTEINTRAG.md` | NEU — Eigenstaendiger Agent | v3-1 |
| `docs/agents/AGENT_SKRIPT.md` | AENDERN — Aufgabe 5 entfernen, Wortbudget 600-900, Q6 entfernen, Stufe-2-Q-Gate (SK1-SK15) | v3-2 |
| `docs/architektur/WORKFLOW_v2.md` (v3) | IN-PLACE aktualisiert — Phase 0.4 eingefuegt, SKRIPT/MATERIAL aktualisiert | v3-3 |
| `docs/agents/AGENT_MATERIAL.md` | AENDERN — Tafelbild fixiert, nur Verifizierung | v3-3 |
| `docs/agents/ORCHESTRATOR.md` | AENDERN — Agenten-Sequenz | v3-3 |
| `escape-engine.js` | ERWEITERN — Merksaetze + Print-CSS | v3-4 |
| `theme-gpg.css` | ERWEITERN — Hefteintrag-Styles | v3-4 |

---

## 8. Naechster Schritt

**Phase v3-4: Engine-Erweiterung (Claude Code)** — `escape-engine.js`: Merksaetze unter SVG-Tafelbild rendern. `theme-gpg.css`: Hefteintrag-Print-Styles. `data.json`-Schema: `merksatz` in Knoten, `kernerkenntnisse[]` in sicherung. Uebergabe-Prompt fuer Claude Code formulieren.
