# Qualitaetsbefunde: gpg-erster-weltkrieg-ursachen — Mappe 2

**Datum:** 2026-04-02
**Quelle:** Browser-Audit (Chrome, Live-Site) + User-Review
**Mappe:** Mappe 2 "Das Attentat von Sarajevo"
**Commit:** 0c0e1ee
**Pattern:** Post-Produktions-Qualitaetsreview (Skill v4)

---

## Befundtabelle

| ID | Schwere | Kategorie | Betroffenes Artefakt | Kurzbeschreibung |
|---|---|---|---|---|
| Q-M2-01 | HIGH | Engine-Bug | aufgabe-2-3 (reihenfolge) | Reihenfolge-Aufgabe rendert keine Items |
| Q-M2-02 | HIGH | Engine-Bug | aufgabe-2-5 (freitext-code) | Freitext akzeptiert nur exakten Loesungsstring |
| Q-M2-03 | HIGH | Produktions-Fehler | Alle Materialueberleitungen | Ueberleitungen zeigen nur IDs ("mat-2-1") statt inhaltlichem Text |
| Q-M2-04 | HIGH | Produktions-Fehler | Alle Aufgaben-Fragestellungen | Materialreferenzen direkt in Fragestellung statt in Tipp 1 |
| Q-M2-05 | HIGH | Didaktik-Qualitaet | sicherung.json (Hefteintrag) | Hefteintrag didaktisch unzureichend: zu viele Fachbegriffe, mangelnde Verknuepfung, disparater Merksatz |
| Q-M2-06 | MEDIUM | Produktions-Fehler | mat-2-6.json | Tagebuch als "quellentext" statt "tagebuch" getyped |
| Q-M2-07 | MEDIUM | Produktions-Fehler | sicherung.json | Reflexionsimpuls doppelt (im Merkbox-Bereich UND als Transfer-Element) |
| Q-M2-08 | MEDIUM | Produktions-Fehler | mat-2-1.json | Quellenangabe enthaelt internen Term "INHALTSBASIS" |
| Q-M2-09 | MEDIUM | Rendering-Artefakt | mat-2-6.json | Quellenangabe im Body des Materials sichtbar statt nur im Quellen-Overlay |
| Q-M2-10 | LOW | Rendering-Artefakt | mat-2-4.json | Quellenangabe doppelt gerendert (quellenangabe + quellenangabe_anzeige) |

---

## Detailbefunde

### Q-M2-01 | HIGH | Reihenfolge-Aufgabe rendert keine Items

**Soll:** 5 sortierbare Stationen der Julikrise, per Hoch/Runter-Buttons verschiebbar.
**Ist:** Leerer Container (`<div class="aufgabe__reihenfolge" id="aufgabe-2-3-reihenfolge"></div>`), 0 Kinder, 0 Hoehe. Aufgabe unbenutzbar.

**Ursache (Engine):** `escape-engine.js` Zeile 2388 liest `aufgabe.optionen`. data.json liefert das Feld als `elemente_ungeordnet`. `aufgabe.optionen` ist `undefined`, Fallback `||[]` produziert leeres Array.

**Fix-Typ:** Engine-Fix ODER Assembly-Fix.
- **Engine-Fix:** Zeile 2388 aendern: `aufgabe.elemente_ungeordnet || aufgabe.optionen || []`
- **Assembly-Fix:** Assembly-Skript mappt `elemente_ungeordnet` auf `optionen` beim data.json-Build.

**Prozess-Ursache:** Kein Schnittstellen-Vertrag zwischen Produktions-JSON-Schema und Engine-API. Der SUB_AUFGABE_RF-Subagent produziert `elemente_ungeordnet` (semantisch korrekt), die Engine erwartet `optionen` (generischer Feldname aus Mappe 1). Weder der Vertrag VERTRAG_PHASE_2-2b noch das Q-Gate pruefen Engine-Feldkompatibilitaet.

**Generativer Prozess-Fix:**
1. VERTRAG_PHASE_2-2b: Engine-Feldnamen als Pflichtfelder definieren (nicht Subagenten-interne Namen)
2. SUB_AUFGABE_RF.md: Output-Schema muss Engine-kompatible Feldnamen verwenden (`optionen` statt `elemente_ungeordnet`)
3. Q-Gate Stufe 1: Pruefkriterium "Alle JSON-Keys sind Engine-kompatibel" ergaenzen
4. ALTERNATIV: Assembly-Skript als Normalisierungsschicht (mappt Subagenten-Output auf Engine-Schema)

---

### Q-M2-02 | HIGH | Freitext akzeptiert nur exakten Loesungsstring

**Soll:** Schueler schreibt natuerlichen Satz, der die Begriffe "Ausloeser", "Ursache", "Kettenreaktion" enthaelt. Engine erkennt die Keywords.
**Ist:** Loesung = `"Auslöser Ursache Kettenreaktion"` (ein String). Engine prueft fuzzyMatch auf Gesamtstring (Zeile 2578), dann indexOf-Fallback (Zeile 2581). Ein natuerlicher Satz wie "Das Attentat war der Auslöser, aber die Ursache lag in den Bündnissen. Die Kettenreaktion war unvermeidlich." scheitert, weil die drei Keywords nicht als zusammenhaengender Substring vorkommen.

**Ursache (Engine + Datenformat):** Engine behandelt `loesung` bei freitext-code als Einzelstring. Kein Keyword-Splitting implementiert. Der Subagent SUB_AUFGABE_FT definiert `loesung` als "Keyword 3-5 Woerter" (korrekt laut Strategie-Audit E3), aber die Engine kann diese Konvention nicht interpretieren.

**Fix-Typ:** Engine-Fix (primaer) + ggf. Datenformat-Anpassung.
- **Engine-Fix:** Wenn `loesung` Leerzeichen enthaelt: als Keyword-Liste splitten. Pruefen ob ALLE Keywords (case-insensitive, Umlaut-normalisiert) im Eingabetext vorkommen. fuzzyMatch pro Keyword.
- **Datenformat-Alternative:** `loesung` als Array statt String: `["Auslöser", "Ursache", "Kettenreaktion"]`. Engine erkennt Array → Keyword-Modus.

**Prozess-Ursache:** Fehlende Engine-Spezifikation fuer freitext-code Matching-Logik. SUB_AUFGABE_FT.md definiert `loesung` als Keywords, aber niemand hat die Engine-seitige Matching-Strategie daran angepasst. Der WORKFLOW_v4 dokumentiert das Keyword-Format, die Engine implementiert es nicht.

**Generativer Prozess-Fix:**
1. Engine-Patch: Keyword-Splitting fuer freitext-code
2. SUB_AUFGABE_FT.md: Output-Format auf Array aendern (expliziter als Space-separierter String)
3. VERTRAG_PHASE_2-2b: freitext-code loesung = Array von Keywords (nicht String)
4. Q-Gate: "Freitext-Loesung ist Array" als Pruefkriterium

---

### Q-M2-03 | HIGH | Ueberleitungen zeigen nur Material-IDs

**Soll:** Zwischen Materialien stehen inhaltliche Ueberleitungssaetze, die den Gedankengang fuehren (z.B. "Du hast gesehen, wie die Situation auf dem Balkan eskalierte. Doch wie sah das Attentat eigentlich aus?").
**Ist:** Ueberleitungen rendern als "mat-2-1", "mat-2-2", etc. — die technischen IDs aus dem JSON. Keine inhaltlichen Texte.

**Befund im DOM:**
```
<div class="material-ueberleitung">
  <span class="material-ueberleitung__text">mat-2-1</span>
</div>
```

**Ursache (Produktions-JSON):** Die Materialien-JSONs enthalten entweder keine `ueberleitung`-Felder oder die Ueberleitung wird falsch befuellt (mit der ID statt mit Text). Die Engine rendert den Wert aus dem JSON — wenn dort "mat-2-1" steht, zeigt sie "mat-2-1".

**Prozess-Ursache:**
1. SUB_MATERIAL_*.md-Subagenten produzieren isolierte Materialien (P4) ohne Ueberleitung. Das ist architekturkonform — Ueberleitungen erfordern Kontext zum Vorgaenger-Material.
2. Die Phase 2.1c (Material-Cross-Konsistenz) prueft Sequenz-Kohaerenz, aber generiert keine Ueberleitungen.
3. Es gibt keinen dedizierten Schritt, der Ueberleitungen ZWISCHEN Materialien produziert.
4. Das Feld wird vermutlich vom Assembly-Skript oder der Engine als Material-ID defaulted.

**Generativer Prozess-Fix:**
1. Neuen Dispatch einfuehren: Nach Phase 2.1c (Cross) → Phase 2.1d Ueberleitungen generieren. Input: alle mat-JSONs in Reihenfolge. Output: ueberleitung-Texte pro Material-Uebergang.
2. ALTERNATIV: In Phase 2.1c die Ueberleitungen als Nebenprodukt der Cross-Konsistenz-Pruefung generieren (gleicher Kontext bereits geladen).
3. VERTRAG_PHASE_2-1c oder neuer VERTRAG_PHASE_2-1d: Ueberleitung-Felder als Pflicht-Output definieren.
4. Assembly: Ueberleitungen aus dediziertem Artefakt in data.json einfuegen.
5. Fallback: Wenn keine Ueberleitung vorhanden, Engine rendert NICHTS (nicht die ID).

---

### Q-M2-04 | HIGH | Materialreferenzen in Fragestellungen statt in Tipp 1

**Soll:** Die Aufgabenstellung nennt NICHT, welches Material zu verwenden ist. Das gehoert zum Tipp-System: Tipp 1 verweist auf das relevante Material. So wird selbstaendiges Denken gefoerdert — die Schueler muessen selbst herausfinden, welches Material relevant ist.
**Ist:** Jede Aufgabenstellung enthaelt einen direkten Link zum Material:
- A1: "Schau dir die Illustration von Beltrame (M2) und das Foto vom 28. Juni 1914 (M3) genau an."
- A2: "Lies den Text über das Pulverfass auf dem Balkan (M1) aufmerksam."
- A3: "Schau dir die Zeitleiste der Julikrise (M5) genau an."
- A4: "Lies den Quellentext zum Ultimatum (M4) aufmerksam."
- A5: "Der Erzähler im Tagebuch aus Sarajevo (M6) fragt sich..."

**Ursache (Subagenten-Prompts):** Die SUB_AUFGABE_*.md-Subagenten sind angewiesen, `material_referenz` in der `frage` zu verwenden. Die Fragestellung enthaelt `[[mat-ID|Linktext]]`-Syntax, die die Engine als Klicklinks rendert.

**Prozess-Ursache:** Didaktische Fehlentscheidung in den Subagenten-Prompts. Die Prompts priorisieren Benutzerfreundlichkeit (direkter Link) ueber didaktische Qualitaet (selbstaendiges Zuordnen). Das Tipp-System wird dadurch entwertet.

**Generativer Prozess-Fix:**
1. ALLE SUB_AUFGABE_*.md: Anweisung aendern — `frage` darf KEINE `material_referenz`-Verweise enthalten. Fragestellung muss inhaltlich formuliert sein, ohne Materialverweis.
2. `material_referenz` wird NUR in Tipp Stufe 1 verwendet: "Schau dir [[mat-X|...]] an."
3. VERTRAG_PHASE_2-2b: Pflichtpruefung "frage enthaelt keine [[mat-*]] Links"
4. Q-Gate Stufe 1: "Fragestellung ist material-referenz-frei" als Kriterium
5. Tipp-Stufe-1-Template ueberarbeiten: IMMER mit Materialverweis beginnen

---

### Q-M2-05 | HIGH | Hefteintrag didaktisch unzureichend

**Soll:** Ein kohaerenter, schuelernah formulierter Hefteintrag, der die Kernerkenntnisse der Stunde verknuepft und als eigenstaendiger Lerntext funktioniert. Merksatz als praegnante Synthese.
**Ist:**
- Fuenf Inhaltsbloecke, die je einen Aspekt benennen, aber nicht miteinander verknuepft sind (Reihenfolge statt Argumentation).
- Drei Fachbegriffe (Attentat, Blankoscheck, Kettenreaktion) ohne Einbettung in erklaerenden Kontext.
- Merksatz besteht aus drei disparaten Einzelsaetzen:
  1. "Das Attentat von Sarajevo war der Auslöser des Ersten Weltkriegs, nicht seine Ursache."
  2. "Der Blankoscheck und das Ultimatum trieben die Julikrise zur Eskalation."
  3. "Die Bündnispflichten machten aus einem Mord eine Kettenreaktion der Kriegserklärungen."
  Diese drei Saetze stehen nebeneinander, ohne Kohaerenz. Kein "weil", kein "deshalb", keine kausale Verknuepfung. Ein Merksatz sollte EINE synthetische Aussage sein, nicht drei Einzelbehauptungen.

**Prozess-Ursache:** Die sicherung.json wird in Phase 2.0 (Rahmen) produziert — also VOR den Materialien und Aufgaben. Der Agent hat zu diesem Zeitpunkt nur TAFELBILD und SKRIPT als Input, keine konkreten Material-Inhalte. Dadurch:
1. Der Hefteintrag kann nicht auf die konkreten Materialien Bezug nehmen (die existieren noch nicht).
2. Die Formulierung bleibt abstrakt und aufzaehlend statt narrativ und verknuepfend.
3. Fachbegriffe werden eingefuehrt, aber nicht didaktisch aufgebaut (Definition → Beispiel → Einordnung).

**Generativer Prozess-Fix:**
1. Hefteintrag-Produktion von Phase 2.0 (Rahmen) nach Phase 2.2c (nach Aufgaben-Cross) verschieben. Dann stehen alle Materialien und Aufgaben als Kontext zur Verfuegung.
2. ALTERNATIV: Hefteintrag zweistufig — Entwurf in 2.0, Revision in 2.2c mit Material-Kontext.
3. Q-Gate fuer sicherung.json: Pruefkriterien fuer didaktische Qualitaet:
   - "Inhaltsbloecke sind kausal verknuepft (nicht nur aufgezaehlt)"
   - "Fachbegriffe werden erklaert, nicht nur benannt"
   - "Merksatz ist EINE synthetische Aussage (max. 2 Saetze)"
   - "Sprachniveau: 7. Klasse Mittelschule"
4. GUETEKRITERIEN fuer Hefteintrag erstellen (analog zu GUETEKRITERIEN_AUFGABEN.md).

---

### Q-M2-06 | MEDIUM | Tagebuch als "quellentext" getyped

**Soll:** mat-2-6 hat `"typ": "tagebuch"`. Engine rendert als `material--tagebuch` mit Tagebuch-spezifischem CSS (handschriftliche Optik, Datum-Header).
**Ist:** `"typ": "quellentext"`. Engine rendert als `material--quelle` — normales Quellen-Layout ohne Tagebuch-Styling.

**Ursache (Produktions-JSON):** mat-2-6.json wurde mit falschem Typ produziert. Der SUB_MATERIAL_TAGEBUCH-Subagent wurde korrekt dispatched (Dispatch D07 in RUNDE_3b_ERGEBNIS), aber das Assembly-Skript oder die JSON-Datei enthaelt den falschen Typ.

**Prozess-Ursache:** Q-Gate prueft Inhalt, nicht Engine-Typ-Mapping. Kein Pruefkriterium "typ in JSON === erwarteter Engine-Typ".

**Generativer Prozess-Fix:**
1. Q-Gate Stufe 1: Pruefkriterium "JSON-Feld `typ` stimmt mit dispatched Subagent ueberein" (SUB_MATERIAL_TB → typ: tagebuch)
2. Assembly-Skript: Validierung — `typ` gegen erlaubte Werte pruefen
3. mat-2-6.json manuell korrigieren (sofort)

---

### Q-M2-07 | MEDIUM | Reflexionsimpuls doppelt

**Soll:** Reflexionsimpuls "Kennst du einen heutigen Konflikt, bei dem Auslöser und Ursache verwechselt werden?" erscheint einmal — als Transfer-Element am Ende des Hefteintrags.
**Ist:** Erscheint zweimal auf der Seite — einmal als `hefteintrag__transfer` und einmal im Fliesstext der Sicherung (als `kernerkenntnis`).

**Ursache:** sicherung.json enthaelt den Satz sowohl in `reflexionsimpuls` als auch in `kernerkenntnisse` (dort als letzter Merksatz-Eintrag). Die Engine rendert beides.

**Generativer Prozess-Fix:**
1. Phase 2.0 Q-Gate: "Kein Text darf in reflexionsimpuls UND kernerkenntnisse gleichzeitig vorkommen"
2. VERTRAG_PHASE_2-0: `reflexionsimpuls` und `kernerkenntnisse` als disjunkte Felder definieren

---

### Q-M2-08 | MEDIUM | Quellenangabe enthaelt internen Term "INHALTSBASIS"

**Soll:** Quellenangabe zeigt eine fuer Schueler verstaendliche Herkunftsangabe (z.B. "Eigene Darstellung").
**Ist:** M1 zeigt "Eigene Darstellung auf Basis der Sachanalyse (INHALTSBASIS)". "INHALTSBASIS" ist ein internes Artefakt-Kuerzel aus dem Produktionsprozess.

**Prozess-Ursache:** SUB_MATERIAL_DT generiert die Quellenangabe mit Bezug auf das Input-Artefakt. Der Artefaktname wird nicht in eine schuelergerechte Formulierung transformiert.

**Generativer Prozess-Fix:**
1. ALLE SUB_MATERIAL_*.md: Anweisung "Quellenangabe darf KEINE internen Artefakt-Namen enthalten (INHALTSBASIS, SKRIPT, TAFELBILD, MATERIAL_GERUEST, etc.)"
2. Q-Gate: "Quellenangabe ist schuelertauglich formuliert (keine Prozess-Interna)"

---

### Q-M2-09 | MEDIUM | Quellenangabe im Material-Body sichtbar

**Soll:** Quellenangaben erscheinen entweder als dezente Fusszeile ODER nur im Quellen-Overlay (Button "Quellen anzeigen"). Nicht im Fliesstext des Materials.
**Ist:** Bei M6 (Tagebuch/quellentext) sind zwei Quellenangabe-Zeilen direkt im Body sichtbar — identischer Text, einmal gross, einmal klein (siehe Screenshot). Bei anderen Materialien (M4, M5) ebenfalls sichtbar.

**Ursache:** Materialien-JSONs enthalten `quellenangabe` UND `quellenangabe_anzeige`. Die Engine rendert beide Felder. Zusaetzlich enthaelt der Material-Body bei quellentext-Typ die Quellenangabe als Teil des `inhalt`-Felds.

**Generativer Prozess-Fix:**
1. Engine: Quellenangabe-Rendering vereinheitlichen — nur EIN Feld rendern, das andere nur im Overlay
2. SUB_MATERIAL_*.md: Quellenangabe NICHT im `inhalt`-Feld wiederholen, nur in `quellenangabe`
3. Assembly: Deduplizierung von Quellenangabe-Feldern

---

### Q-M2-10 | LOW | Quellenangabe M4 doppelt gerendert

**Soll:** Eine Quellenangabe pro Material.
**Ist:** M4 zeigt zwei Zeilen:
1. "Vereinfacht nach: Ultimatum Österreich-Ungarns, 23. Juli 1914. Vgl. Wikipedia, July Crisis, Summary"
2. "Vereinfacht nach: Ultimatum Österreich-Ungarns, 23. Juli 1914. Vgl. Wikipedia, July Crisis"

**Ursache:** Wie Q-M2-09 — doppeltes Feld (`quellenangabe` + `quellenangabe_anzeige`).

---

## Zusammenfassung: Prozess-Schwachstellen

### S1: Engine-Feld-Inkompatibilitaet (Q-M2-01, Q-M2-02, Q-M2-06)

Die Produktions-Subagenten verwenden semantisch korrekte Feldnamen, die Engine erwartet andere. Kein Schnittstellen-Vertrag zwischen Subagenten-Output und Engine-Input.

**Massnahme:** Engine-kompatibles JSON-Schema als Normreferenz. Entweder Subagenten anpassen ODER Assembly als Normalisierungsschicht.

### S2: Fehlende Cross-Material-Artefakte (Q-M2-03)

Ueberleitungen erfordern Kontext ueber Material-Grenzen hinweg. Kein Dispatch produziert sie.

**Massnahme:** Ueberleitung-Produktion als eigenen Dispatch oder Teil der Cross-Konsistenz verankern.

### S3: Didaktische Entscheidungen in Subagenten-Defaults (Q-M2-04, Q-M2-05)

Materialreferenzen in Fragestellungen und abstrakter Hefteintrag sind Folge von Prompt-Defaults, die Benutzerfreundlichkeit ueber didaktische Qualitaet priorisieren.

**Massnahme:** Didaktische Guetekriterien in Subagenten-Prompts und Q-Gates verschaerfen.

### S4: Quellenangabe-Hygiene (Q-M2-08, Q-M2-09, Q-M2-10)

Interne Artefakt-Namen in Schueler-sichtbaren Texten, doppelte Quellenangaben.

**Massnahme:** Quellenangabe-Pruefkriterium in Q-Gates + Engine-Vereinheitlichung.

### S5: Phase-2.0-Timing des Hefteintrags (Q-M2-05)

Hefteintrag wird vor Materialien produziert, kann daher nicht material-bezogen argumentieren.

**Massnahme:** Hefteintrag-Produktion verschieben oder zweistufig machen.

---

## Priorisierte Massnahmen

### Sofort (Mappe-2-Patch)

1. **Engine-Patch:** `elemente_ungeordnet || optionen` in Reihenfolge-Renderer (B-01 / Q-M2-01) — **UEBERGABE an Claude Code: UEBERGABE_RUNDE4b_ENGINE_PATCHES.md**
2. **Engine-Patch:** Keyword-Splitting fuer freitext-code (B-02 / Q-M2-02) — **UEBERGABE an Claude Code: UEBERGABE_RUNDE4b_ENGINE_PATCHES.md**
3. **data.json-Fix:** mat-2-6 typ "quellentext" → "tagebuch" (Q-M2-06) — **UEBERGABE an Claude Code: UEBERGABE_RUNDE4b_ENGINE_PATCHES.md**
4. **data.json-Fix:** mat-2-1 quellenangabe "INHALTSBASIS" entfernen (Q-M2-08) — **UEBERGABE an Claude Code: UEBERGABE_RUNDE4b_ENGINE_PATCHES.md**
5. **data.json-Fix:** Reflexionsimpuls-Duplikat in sicherung entfernen (Q-M2-07) — **UEBERGABE an Claude Code: UEBERGABE_RUNDE4b_ENGINE_PATCHES.md**

### Vor Mappe 3 (Prozess-Fixes)

6. SUB_AUFGABE_*.md: Materialreferenzen aus `frage` entfernen, nur in Tipp 1 (Q-M2-04) — **ERLEDIGT** (MQ3/MQ3b in alle 5 SUB_AUFGABE_*.md + AGENT_RAETSEL.md)
7. SUB_MATERIAL_*.md: Quellenangabe-Hygiene — keine internen Artefaktnamen, kein Duplikat (Q-M2-08, Q-M2-09, Q-M2-10) — **ERLEDIGT** (Q-M2-08-Regel in alle 7 SUB_MATERIAL_*.md)
8. VERTRAG_PHASE_2-2b: Engine-Feldnamen als Pflicht (Q-M2-01) — **ERLEDIGT** (Engine-Feld-Kompatibilitaet als Q-Gate-Kriterium)
9. VERTRAG_PHASE_2-2b: freitext-code loesung als Array (Q-M2-02) — **ERLEDIGT** (Loesungsformate-Tabelle + SUB_AUFGABE_FT.md)
10. VERTRAG_PHASE_2-0: reflexionsimpuls/kernerkenntnisse Disjunktionsregel (Q-M2-07) — **ERLEDIGT** (Q-M2-09 als Q-Gate-Kriterium)
11. Phase 2.1c/2.1d: Ueberleitungen als Pflicht-Output (Q-M2-03) — OFFEN (architektonische Entscheidung)
12. Hefteintrag: Produktion verschieben oder Q-Gate verschaerfen (Q-M2-05) — OFFEN (Phase-Verschiebung)
13. GUETEKRITERIEN_HEFTEINTRAG.md erstellen — OFFEN

### Langfristig (Engine-Verbesserungen)

13. Engine: Quellenangabe-Rendering vereinheitlichen (Q-M2-09, Q-M2-10)
14. Engine: Fallback fuer fehlende Ueberleitungen — nichts rendern statt ID (Q-M2-03)
15. Assembly-Skript: JSON-Schema-Validierung gegen Engine-Erwartungen
