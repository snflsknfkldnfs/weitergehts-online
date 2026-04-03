# Ausfuehrungsplan: Infrastruktur-Revision vor Mappe 4

**Erstellt:** 2026-04-03
**Grundlage:** GRUNDSATZENTSCHEIDUNG_REBUILD_VS_ITERATE.md §10 (Post-Mappe-3 Empirische Ergebnisse)
**Ausloeser:** User-Browser-Review Mappe 3: 11 Findings (2 BLOCKER, 3 HIGH, 4 MEDIUM, 2 LOW), davon 7 wiederkehrend aus Mappe 2.
**Ziel:** Alle 7 wiederkehrenden Infrastruktur-Maengel beheben + 2 Architektur-Revisionen (Hefteintrag, AGENT_RAETSEL Typauswahl) durchfuehren, BEVOR Mappe 4 in Produktion geht.
**Geschaetzter Gesamtaufwand:** 10-16h ueber 3-5 Sessions
**Erfolgskriterium:** Mappe 4 Browser-Review zeigt 0 wiederkehrende Findings aus B1-B10 und max 2 neue mappe-spezifische Findings.
**Abbruchkriterium:** Falls Mappe 4 nach dieser Revision erneut BLOCKERs oder >3 wiederkehrende Findings zeigt → Eskalation zu Option A (Full Rebuild).

---

## Phasenstruktur

### Phase A: Prompt/Vertrags-Patches (7 Findings)

Gezielte Patches in Vertraegen, Subagenten-Prompts und Q-Gate-Kriterien. Keine Architektur-Aenderung. Jeder Patch ist isoliert testbar.

### Phase B: Architektur-Revision (2 Findings)

Teil-Rebuilds zweier Subsysteme: Hefteintrag-Pipeline und AGENT_RAETSEL Typauswahl. Erfordern Neukonstruktion, nicht nur Patching.

### Phase C: Validierung + Mappe-3-Daten-Patch

Mappe-3-Daten retroaktiv patchen (10 Daten-Patches). Mappe 4 als Validierung der Revision.

---

## Phase A: Prompt/Vertrags-Patches (4-6h, 1-2 Sessions)

### A1: Encoding-Regel erweitern (B1 BLOCKER + B2 MEDIUM)

**Problem:** VERTRAG_PHASE_2-0 (Rahmen) hat keine Encoding-Regel. Die bestehende Encoding-Regel v3.2 in Phase 2.1 deckt nur UTF-8-Umlaute ab, nicht typographische Zeichen (Gedankenstriche, Anfuehrungszeichen).

**Betroffene Dokumente:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Encoding-Regel hinzufuegen
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` — Encoding-Regel erweitern
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` — Encoding-Regel hinzufuegen (Ueberleitungen)
- Alle 7 `SUB_MATERIAL_*.md` — Encoding-Regel auf typographische Zeichen erweitern
- Alle 5 `SUB_AUFGABE_*.md` — Encoding-Regel ergaenzen

**Patch-Inhalt:**
- Encoding-Regel v3.3: "Alle Textfelder in UTF-8. Umlaute als Klartext (ae→ä, oe→ö, ue→ü, ss→ß). Typographische Zeichen: Gedankenstrich als `—` (nicht `--`), Anfuehrungszeichen als `„..."` (deutsch) oder `»...«`. Keine ASCII-Ersatzzeichen."
- In VERTRAG_PHASE_2-0: Als Pflicht-Regel in Output-Spezifikation aufnehmen.

**Akzeptanzkriterium:** Kein `--`, kein `ae/oe/ue/ss` in produzierten JSONs.

---

### A2: Quellenangaben-Feld klaren (B3 MEDIUM)

**Problem:** SUB_MATERIAL-Prompts schreiben Quellenangaben sowohl in den `inhalt`-Body (als cite-Tags oder Nachweis-Zeilen) als auch ins dedizierte `quelle`-Feld. Die Engine rendert beide — Doppelung im Browser.

**Betroffene Dokumente:**
- `docs/agents/SUB_MATERIAL_QUELLENTEXT.md` — Anweisung: Quellenangaben NUR in `quellenangaben[]`, NICHT in `inhalt`
- `docs/agents/SUB_MATERIAL_TAGEBUCH.md` — Gleiche Anweisung
- `docs/agents/SUB_MATERIAL_BILDQUELLE.md` — Pruefen ob betroffen
- `docs/agents/SUB_MATERIAL_DARSTELLUNGSTEXT.md` — Pruefen ob betroffen

**Patch-Inhalt:**
- Explizite Trennregel: "`inhalt` enthaelt den reinen Materialtext. Quellenangaben (Autor, Titel, Jahr, Fundstelle) gehoeren ausschliesslich in das `quellenangaben`-Array. Im `inhalt`-Feld duerfen Sprecher-/Rollennamen erscheinen (z.B. 'Stefan Zweig:'), aber NICHT bibliographische Angaben."

**Akzeptanzkriterium:** `grep` auf produzierte JSONs: Kein bibliographischer Nachweis in `inhalt`-Feldern.

---

### A3: Sprachregister fuer Ueberleitungen (B5 MEDIUM)

**Problem:** VERTRAG_PHASE_2-1c (Cross-Validierung) definiert 6 Achsen fuer Ueberleitungen, aber keine Sprachregister-Vorgabe. Resultat: Ueberleitungen klingen nach didaktischem Kommentar statt nach schuelergerechtem Text.

**Betroffene Dokumente:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` — Achse 5 um Sprachregister ergaenzen

**Patch-Inhalt:**
- Achse 5 (Ueberleitungen): Ergaenzen: "Sprachregister R7 (wie Materialien). Zielgruppe: 7. Klasse Mittelschule. Maximal 2 Saetze. Keine didaktischen Metakommentare ('macht die Perspektiven erlebbar'). Stattdessen: direkte Ankuendigung ('Wie hat sich das angefuehlt? Zwei Menschen erzaehlen.')."
- Beispiel fuer gute vs. schlechte Ueberleitung aufnehmen.

**Akzeptanzkriterium:** Ueberleitungen lesen sich wie Moderationstexte, nicht wie Lehrerhandreichungen.

---

### A4: Fragestamm-Kurzregel (B6 HIGH)

**Problem:** Subagenten uebernehmen Operator und Kontext woertlich in Fragestellungen. Resultat: sperrige, ueberladene Aufgabenstellungen ("Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen Kriegsbegeisterung und gesellschaftlichem Druck im August 1914 darzustellen").

**Betroffene Dokumente:**
- `docs/agents/AGENT_RAETSEL.md` — Konstruktionskontext: Fragestamm-Kurzregel hinzufuegen
- Alle 5 `SUB_AUFGABE_*.md` — Fragestellungs-Sektion verschaerfen

**Patch-Inhalt:**
- Regel: "Fragestellung = Handlungsimpuls. Max 1 Satz, max 12 Woerter. Operator NICHT woertlich benennen. Kontext (Zeit, Ort, Material-Bezug) nur wenn nicht aus Setting ableitbar. Der Quellenbezug gehoert in Tipp 1, nicht in die Fragestellung."
- Negativbeispiel: "Ergaenze die fehlenden Fachbegriffe im folgenden Lueckentext, um den Zusammenhang zwischen..."
- Positivbeispiel: "Ergaenze die fehlenden Fachbegriffe."

**Akzeptanzkriterium:** Keine Fragestellung > 15 Woerter in produzierten Aufgaben.

---

### A5: Tipp-2 Wortpool bei Lueckentexten (B7 MEDIUM)

**Problem:** SUB_AUFGABE_LUECKENTEXT generiert als Tipp 2 eine Paraphrase/Erklaerung, die bei Lueckentexten kontraproduktiv ist. Sinnvoller waere ein randomisierter Wortpool (alle oder Teilmenge der einzusetzenden Begriffe).

**Betroffene Dokumente:**
- `docs/agents/SUB_AUFGABE_LUECKENTEXT.md` — Tipp-2-Schema aendern

**Patch-Inhalt:**
- Tipp 2 bei Lueckentext: "Antwortpool: Liste aller einzusetzenden Begriffe in randomisierter Reihenfolge. Format: 'Diese Begriffe gehoeren in die Luecken: [Begriff1], [Begriff2], [Begriff3], ...' Optional: 1-2 Distraktoren beimischen."

**Akzeptanzkriterium:** Tipp 2 bei Lueckentexten ist immer ein Wortpool, nie eine Paraphrase.

---

### A6: Freitext-Bewertungskonzept (B9 HIGH)

**Problem:** Freitext-Aufgaben (Typ "freitext") verwenden kategoriale Keywords als Loesung. Bei persoenlichen Meinungsaeusserungen ist automatisierte kategoriale Bewertung grundsaetzlich unscharf — "richtige" Keywords koennen das Verfehlen des Kerns maskieren.

**Betroffene Dokumente:**
- `docs/agents/SUB_AUFGABE_FREITEXT.md` — Bewertungslogik differenzieren
- `docs/agents/AGENT_RAETSEL.md` — Konstruktionskontext: Freitext nur fuer geeignete Aufgabentypen

**Patch-Inhalt:**
- Freitext-Aufgaben duerfen NUR eingesetzt werden, wenn die erwartete Antwort objektivierbare Inhaltselemente enthaelt (Fachbegriffe, konkrete Fakten, benennbare Zusammenhaenge).
- Bei persoenlicher Meinungsaeusserung/Beurteilung: Operator aus Fragestellung entfernen, Bewertung auf "Abgegeben/Nicht abgegeben" reduzieren (kein kategoriales Scoring), stattdessen Musterloesung als Vergleichstext anzeigen.
- AGENT_RAETSEL: Bei Aufgaben mit AFB III (Beurteilen, Bewerten) → Freitext nur mit reduzierter Bewertungslogik dispatchen.

**Akzeptanzkriterium:** Keine Freitext-Aufgabe mit Beurteilungs-Operator UND kategorialem Keyword-Scoring.

---

### A7: Q-Gate-Erweiterung (praeventiv)

**Problem (aus §10.6):** Q-Gates pruefen nicht auf Sprachregister, Typographie, Formatierungs-Usability, Hefteintrag-Qualitaet.

**Betroffene Dokumente:**
- `docs/architektur/Q-GATE-MECHANIK.md` — Neue Kriterien ergaenzen

**Patch-Inhalt:**
- Neues Kriterium TYP-01: Typographische Korrektheit (keine ASCII-Ersatzzeichen).
- Neues Kriterium REG-01: Sprachregister R7 (alle schuelergerichteten Texte: Ueberleitungen, Einstieg, Sicherung).
- Phase-2.0-Q-Gate: HE1-HE13 als Pflichtpruefung fuer Hefteintrag.

**Akzeptanzkriterium:** Q-Gate-Mechanik deckt alle 7 wiederkehrenden Befund-Typen ab.

---

## Phase B: Architektur-Revision (6-10h, 2-3 Sessions)

### B1: Hefteintrag-Pipeline Neukonstruktion (B10 BLOCKER)

**Problem:** Die aktuelle Pipeline produziert Hefteintraege als zusammenhaengende Fliesstext-Absaetze. Der User erwartet ein visuelles Denkprotokoll: Fachbegriffe als Knoten, Stichpunkte statt Prosa, Pfeilstrukturen, kompakter Merksatz als qualifizierte Antwort auf die Stundenfrage. Die GUETEKRITERIEN_HEFTEINTRAG_PRODUKT (HE1-HE13) wurden beim Generierungsprozess nicht wirksam angewendet — moegliche Ursache: zu starke Zergliederung im Generierungsprozess zerreisst die Gesamtgestalt.

**Betroffene Dokumente:**
- `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` — Hefteintrag-Generierung ueberarbeiten
- `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` — Ggf. verschaerfen
- `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-3/sicherung/hefteintrag.json` — Referenz-Analyse

**Vorgehen:**
1. **Analyse:** Mappe-2- und Mappe-3-Hefteintrag gegen HE1-HE13 bewerten. Systematische Ausfallmuster identifizieren: Welche HE-Kriterien fallen konsistent durch?
2. **Gegenmodell:** Manuell einen Referenz-Hefteintrag fuer Mappe 3 entwerfen (User-Input noetig). Daraus Strukturregeln ableiten: Knoten-Dichte, Stichpunkt-Laenge, Merksatz-Schema, Pfeil-Konventionen.
3. **Vertrag redesignen:** VERTRAG_PHASE_2-0 Hefteintrag-Sektion ersetzen. Neuer Generierungs-Ansatz: Nicht "Schreibe einen Hefteintrag" sondern "Erzeuge ein visuelles Tafelbild-Mapping". Input: TAFELBILD-Knoten → Output: Stichpunktartige Knoten-Beschreibungen + Pfeil-Relationen + 1 kompakter Merksatz (Antwort auf Stundenfrage, max 2 Saetze).
4. **Transferfrage streichen:** User-Feedback B10 — Transferfrage unter Hefteintrag fehlplatziert. Aus Hefteintrag-Schema entfernen.
5. **Test:** Hefteintrag fuer Mappe 3 mit neuem Vertrag regenerieren, gegen HE1-HE13 pruefen.

**Akzeptanzkriterien:**
- HE4 (Sprachliche Geschlossenheit) PASS
- HE12 (Lernbarkeit) PASS
- Kein Fliesstext-Absatz > 15 Woerter
- Merksatz = 1-2 Saetze, direkte Antwort auf Stundenfrage
- Keine Transferfrage im Hefteintrag

**Aufwand:** 4-6h (Analyse 1h, User-Referenz 1h, Vertrag redesignen 1-2h, Test 1-2h)

---

### B2: AGENT_RAETSEL Typauswahl-Gegenpruefung (B8 HIGH)

**Problem:** AGENT_RAETSEL waehlt Aufgabentypen basierend auf Progressionsplan und Typvielfalt, aber ohne systematische Gegenpruefung, ob der gewaehlte Typ zum konkreten Lerninhalt passt. Beispiel B8: Reihenfolge-Typ fuer Inhalte, deren chronologische Reihenfolge im Material nicht erarbeitbar ist.

**Betroffene Dokumente:**
- `docs/agents/AGENT_RAETSEL.md` — Konstruktionskontext (Sektion 3) + Operationalisierungsziel (Sektion 4) verschaerfen

**Vorgehen:**
1. **Analyse:** AGENT_RAETSEL Sektion 3 (Konstruktionskontext) reviewen. Welche Felder sind definiert, welche werden in der Praxis angewendet?
2. **Gegenpruefungs-Regel:** Neue Pflicht-Pruefung nach Typauswahl: "Ist die Aufgabe mit dem gewaehlten Typ aus dem Material heraus loesbar? Sind alle benoetigten Informationen (Reihenfolge, Zuordnungen, Luecken-Begriffe) im Material explizit vorhanden?"
3. **Erarbeitbarkeits-Gate:** Typ-spezifische Erarbeitbarkeits-Checks:
   - Reihenfolge: Sind die Elemente im Material in einer eindeutigen Sequenz dargestellt?
   - Zuordnung: Sind die Paare im Material klar voneinander abgrenzbar?
   - Lueckentext: Sind die Lueckenbegriffe Fachbegriffe, die im Material definiert werden?
   - MC: Sind Distraktoren plausibel aber eindeutig falsch?
   - Freitext: Enthaelt die erwartete Antwort objektivierbare Inhaltselemente?
4. **AGENT_RAETSEL aktualisieren:** Gegenpruefung als Pflicht-Schritt zwischen Progressionsplan (Schritt 1) und Dispatch (Schritt 5) einfuegen.

**Akzeptanzkriterien:**
- Kein Aufgabentyp wird dispatcht ohne dokumentierte Erarbeitbarkeits-Begruendung.
- Reihenfolge-Aufgaben nur wenn Material eine explizite Sequenz enthaelt.

**Aufwand:** 2-4h (Analyse 0.5h, Regel-Design 1h, AGENT_RAETSEL Update 1h, Test 0.5-1.5h)

---

## Phase C: Validierung + Daten-Patch (2-4h, 1 Session)

### C1: Mappe-3-Daten-Patch (10 Patches)

Retroaktive Korrektur der Mappe-3-Daten gemaess Patch-Tabelle in Q-GATE-LOG.md (Phase 4.3, "Mappe-spezifische Fixes"). Betrifft:

| # | Befund | Betroffene Daten | Patch |
|---|---|---|---|
| 1 | B1 | einstieg.json, sicherung.json | Umlaute korrigieren |
| 2 | B2 | mat-3-5 titel, Ueberleitungen, Bildunterschriften | `--` → `—` |
| 3 | B3 | mat-3-4 inhalt, mat-3-5 inhalt | Quellenangaben aus inhalt entfernen |
| 4 | B4 | mat-3-4 inhalt | Kuerzere Einleitungen, Name+Rolle statt voller Nachweis |
| 5 | B6 | aufgabe-3-1 bis aufgabe-3-5 frage-Felder | Kuerzen/vereinfachen |
| 6 | B7 | aufgabe-3-1 tipps[1] | Wortpool statt Paraphrase |
| 7 | B8 | aufgabe-3-4 | Typ ersetzen oder Elemente schaerfen |
| 8 | B9 | aufgabe-3-5 loesung | Spezifischere Keywords oder reduzierte Bewertungslogik |
| 9 | B10 | sicherung.hefteintrag (komplett) | Neugeneration mit revidiertem Vertrag |
| 10 | B11 | sicherung.ueberleitung | Stilistisch glaetten |

**Ausfuehrung:** Claude-Code-Session mit Uebergabe-Prompt. File-Ownership: escape-games/ ist Claude-Code-Domaene.

### C2: Mappe 4 als Validierung

Mappe 4 Vollproduktion (Phase 2.0→4) mit allen Patches und Architektur-Revisionen aktiv. Browser-Review als empirische Pruefung der Revision.

**Erfolgskriterien:** Siehe Kopf dieses Dokuments.

---

## Reihenfolge und Abhaengigkeiten

```
Phase A (parallel ausfuehrbar):
  A1 (Encoding) ──┐
  A2 (Quellen)  ──┤
  A3 (Sprache)  ──┤── Alle unabhaengig, parallel moeglich
  A4 (Fragestamm)─┤
  A5 (Tipp-2)  ──┤
  A6 (Freitext) ──┤
  A7 (Q-Gate)   ──┘

Phase B (nach Phase A empfohlen, aber nicht blockiert):
  B1 (Hefteintrag) ── Benoetigt User-Input fuer Referenz-Hefteintrag
  B2 (Typauswahl)  ── Unabhaengig von B1

Phase C (nach A+B):
  C1 (Daten-Patch) ── Benoetigt A+B fuer informierte Patches
  C2 (Mappe 4)     ── Benoetigt A+B+C1
```

---

## Zeitplan

| Session | Schritte | Meilenstein | Aufwand |
|---|---|---|---|
| 1 | A1-A7 (alle Patches) | Alle Vertraege + Subagenten gepatcht | 4-6h |
| 2 | B1 (Hefteintrag Analyse + Gegenmodell) | Referenz-Hefteintrag steht | 3-4h |
| 3 | B1 (Vertrag) + B2 (Typauswahl) | Architektur-Revisionen abgeschlossen | 3-4h |
| 4 | C1 (Daten-Patch Mappe 3) | Mappe 3 retroaktiv korrigiert | 2-3h |
| 5+ | C2 (Mappe 4 Produktion) | Validierung der Revision | 12-16h |

**Kritischer Pfad:** A* → B1 → C1 → C2. B2 ist parallel zu B1 ausfuehrbar.

---

## Governance

- Jeder Patch-Schritt (A1-A7) endet mit Commit. Patch-Inhalt im Commit-Message referenzieren (z.B. "A1: Encoding-Regel v3.3 in 15 Dokumenten").
- Phase B Zwischenergebnisse (Analyse, Gegenmodell) als eigenstaendige Dokumente ablegen.
- CHANGELOG.md pro Session aktualisieren.
- STATUS.md Frontmatter nach jedem Meilenstein aktualisieren.
- Eskalation zu Option A nur bei empirischem Befund nach Mappe 4, nicht praeventiv.
