# Audit-Briefing: Sicherungskette — Tafelbild / Hefteintrag / Sicherung

**Datum:** 2026-04-02
**Auftraggeber:** Paul (Lehrkraft, Projektleitung)
**Ausloeser:** Q-M2-05 (Hefteintrag didaktisch unzureichend) + Verdacht auf strukturelle Prozess-Inkohaerenz
**Ziel:** Externe Evaluation der bestehenden Prozesskette gegen die didaktische Idealstruktur. Optimierungsstellen und alternative Prozessstrukturen identifizieren.

---

## 1. Pruefauftrag

Der Auditor soll evaluieren:

1. **Passung:** Bildet die aktuelle Prozesskette die didaktische Idealstruktur (Abschnitt 3) korrekt ab? Wo weicht sie ab?
2. **Begriffliche Kohaerenz:** Sind "Tafelbild", "Hefteintrag" und "Sicherung" im Prozess sauber getrennt? Wo kommt es zu Vermischungen?
3. **Timing:** Werden Artefakte zum richtigen Zeitpunkt im Prozess produziert? Haben alle Produzenten die Inputs, die sie brauchen?
4. **Steuerungswirkung:** Steuert der Hefteintrag tatsaechlich die Material-Produktion "vom Ende her"? Oder ist die Steuerungsrichtung de facto umgekehrt oder unterbrochen?
5. **Optimierungsvorschlaege:** Konkrete Prozess-Umstrukturierungen mit Begruendung. Kosten-Nutzen-Abwaegung (Token-Budget, Dispatch-Anzahl, Komplexitaet).

---

## 2. Pflichtlektuere fuer den Auditor

In dieser Reihenfolge lesen:

### 2.1 Didaktische Grundlagen (Kontext)

| # | Datei | Relevante Sektionen | Zweck |
|---|---|---|---|
| L1 | `docs/checklisten/GUETEKRITERIEN_TAFELBILD.md` | Sektion 1-3 (Leitsatz, Synthese-Extraktion, Empirische Muster) | Didaktische Theorie des Tafelbilds/Hefteintrags |
| L2 | `docs/architektur/DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md` | Sektion 1-2 (Problemdiagnose, Optionen-Bewertung) | Warum CSS-Hefteintrag statt SVG-Tafelbild |
| L3 | `docs/architektur/EVALUATION_SCPL_HEFTEINTRAG.md` | Vollstaendig | SCPL-Framework-Evaluation (Situation-Complication-Problem-Loesung) |

### 2.2 Aktuelle Prozess-Implementierung

| # | Datei | Relevante Sektionen | Zweck |
|---|---|---|---|
| L4 | `docs/agents/AGENT_TAFELBILD.md` | Vollstaendig | Aktueller Produzent des SCPL-Hefteintrags (Phase 0.4) |
| L5 | `docs/agents/AGENT_MATERIAL.md` | Sektion 1.1-1.10 (Design-Modus) + Sektion 2.3 (Sicherungs-Felder) | Wie Material-Design auf TB aufbaut + Sicherungs-Feld-Semantik |
| L6 | `docs/architektur/vertraege/VERTRAG_PHASE_2-0_RAHMEN.md` | Vollstaendig | Rahmen-Produktion: wo sicherung.json entsteht |
| L7 | `docs/architektur/vertraege/VERTRAG_PHASE_2-1_MATERIAL.md` | Vollstaendig | Material-Produktion: welche TB-Felder gelesen werden |
| L8 | `docs/architektur/vertraege/VERTRAG_PHASE_2-1c_CROSS.md` | Vollstaendig | Cross-Konsistenz: wo Ueberleitungen produziert werden |
| L9 | `docs/agents/ORCHESTRATOR.md` | Phasendiagramm (Phase 0-3) | Gesamtablauf |

### 2.3 Qualitaetsbefund (Anlass)

| # | Datei | Relevante Sektionen | Zweck |
|---|---|---|---|
| L10 | `docs/analyse/QUALITAETSBEFUNDE_gpg-erster-weltkrieg-ursachen_Mappe2.md` | Q-M2-05, S3, S5 | Konkreter Befund: Hefteintrag didaktisch unzureichend |

### 2.4 Produktionsartefakte (Beispiel Mappe 2)

| # | Datei | Zweck |
|---|---|---|
| L11 | `docs/agents/artefakte/TAFELBILD_gpg-erster-weltkrieg-ursachen_Mappe2.md` | Konkretes TB-Artefakt (Phase 0.4 Output) |
| L12 | `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/rahmen/sicherung.json` | Konkretes Sicherungs-Artefakt (Phase 2.0 Output) |
| L13 | `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/rahmen/tafelbild.json` | Konkretes TB-JSON (Phase 2.0, 1:1 Kopie von L11) |

---

## 3. Didaktische Idealstruktur (Referenzmodell des Auftraggebers)

Der Auftraggeber formuliert folgende didaktische Kette als Soll-Zustand:

### 3.1 Kette: Vom Lernziel zum Erarbeitungsprozess

```
Lernziele (KE-Matrix, DIDAKTIK_RAHMEN)
    ↓
Skript (didaktisiertes Narrativ pro Mappe)
    ↓
Sicherungsinhalte in didaktisierter Grobstruktur
(= Was sollen SuS am Ende der Mappe wissen/koennen?)
    ↓ pro Mappe
Merksatz formulieren
(= Synthese = Antwort auf Stundenfrage/Mappenfrage)
    ↓
Hefteintrag aufbauen, VOM MERKSATZ AUS gedacht
(= Jeder Inhaltsbaustein des Hefteintrags muss zum Merksatz hinfuehren)
    ↓
Materialgeruest ableiten, VOM HEFTEINTRAG AUS gedacht
(= Jedes Element des Hefteintrags muss durch Material erarbeitbar sein)
    ↓
Materialien produzieren
    ↓
Aufgaben produzieren (pruefen Verstaendnis der Hefteintrag-Inhalte)
    ↓
Sprachliche Verfeinerung des Hefteintrags
(= Formulierungen auf konkrete Material-Erfahrung zuschneiden)
```

### 3.2 Kernprinzip: "Vom Ende denken" (Backward Design)

Der Merksatz ist die didaktische Zielmarke. Alles — Hefteintrag-Struktur, Materialauswahl, Aufgabenstellung — leitet sich davon ab. Die User-Journey der SuS durch die Mappe fuehrt Schritt fuer Schritt zum Merksatz hin. Jedes Material erarbeitet einen Baustein, der im Hefteintrag seinen Platz hat.

### 3.3 Zwei Funktionen des Hefteintrags

1. **Steuerungsfunktion (vor Materialproduktion):** Der Hefteintrag definiert, WAS erarbeitet werden muss. Er ist die Zielstruktur fuer das Materialgeruest.
2. **Synthese-Funktion (nach Materialproduktion):** Die Formulierungen des Hefteintrags spiegeln die konkrete Material-Erfahrung der SuS wider. Der Hefteintrag liest sich wie eine Zusammenfassung des eigenen Erarbeitungsprozesses.

---

## 4. Ist-Zustand: Aktuelle Prozesskette (Bestandsaufnahme)

### 4.1 Prozessschritt-Tabelle

| Phase | Agent/Vertrag | Input | Output (Sicherungs-relevant) | Timing-Problem? |
|---|---|---|---|---|
| 0.3 | AGENT_SKRIPT | DIDAKTIK_RAHMEN + INHALTSBASIS | SKRIPT mit Chunk-Ueberschriften (= Stundenfragen) | Nein |
| 0.4 | AGENT_TAFELBILD | SKRIPT + DIDAKTIK_RAHMEN + ARTEFAKT_INVENTAR | TAFELBILD_*.md: SCPL-Struktur, Kernerkenntnisse, Merksaetze, Stundenfrage, Transferfrage. Q-Gate G1-G14. **TB-FREEZE.** | Nein — aber Namensgebung ("Tafelbild") ist irrefuehrend, da Output primaer ein Hefteintrag ist |
| 1.1 | AGENT_MATERIAL (Design) | SKRIPT + TAFELBILD (frozen) | MATERIAL_GERUEST: Blueprint, Sequenzplan, TB-Abdeckungsnachweis, Erarbeitbarkeits-Nachweis, Ueberleitung-Intentionen, Sicherungs-Entwurf | Nein — MATERIAL nutzt SCPL-Schritte als Zielstruktur |
| 2.0 | VERTRAG_PHASE_2-0 | TAFELBILD + MATERIAL_GERUEST | **rahmen/sicherung.json:** kernerkenntnisse[] (= tafelbild.scpl.loesung[], M3b), zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis. **rahmen/tafelbild.json:** 1:1-Kopie des TB. **rahmen/einstieg.json:** narrativ, problemstellung (C1b = stundenfrage) | **JA — Kernproblem:** Sicherung wird hier TEXT-formuliert, obwohl Materialien noch nicht existieren |
| 2.1 | SUB_MATERIAL_* | MATERIAL_GERUEST + SKRIPT + TAFELBILD + ... | Einzelne mat-*.json (isoliert, P4) | Nein |
| 2.1c | VERTRAG_PHASE_2-1c | Alle mat-*.json + TAFELBILD + GERUEST + einstieg.json | Cross-Konsistenz (Achsen 1-4) + **ueberleitungen.json** (Achse 5, NEU) | Hier waere Hefteintrag-Revision moeglich (alle Materialien im Kontext) |
| 2.2 | SUB_AUFGABE_* | Materialien + PROGRESSIONSPLAN + ... | Einzelne aufgabe-*.json | Nein |
| 3 | Claude Code (Assembly) | Alle JSONs | data.json (Mappe-Objekt) | Rein mechanisch |

### 4.2 Identifizierte Strukturprobleme

**SP-1: Begriffsvermischung "Tafelbild" vs. "Hefteintrag"**
AGENT_TAFELBILD heisst "Sicherungsarchitekt und Hefteintrag-Designer". Sein Output ist ein SCPL-basierter Hefteintrag — kein visuelles Tafelbild. Der Name "Tafelbild" ist historisch (v1/v2 produzierten einen SVG-Graphen). Seit v3.1 (CSS-Hefteintrag) ist der Output ein strukturierter Text. Die Benennung fuehrt zu konzeptueller Unklarheit.

**SP-2: Sicherung als Sammel-Artefakt**
`rahmen/sicherung.json` enthaelt heterogene Felder:
- `kernerkenntnisse[]` — gehoert zum Hefteintrag (M3b: identisch mit Merkbox)
- `zusammenfassung` — eigenstaendiger Text, gehoert NICHT in den Hefteintrag
- `ueberleitung` — Mappe-zu-Mappe-Bruecke, gehoert NICHT in den Hefteintrag
- `reflexionsimpuls` — muendlicher Unterrichtsimpuls, gehoert NICHT in den Hefteintrag
- `hefteintrag_verweis` — Anweisung an SuS, gehoert NICHT in den Hefteintrag

Diese Felder haben unterschiedliche Produzenten-Anforderungen und unterschiedliches Timing. Ihre Zusammenfassung in einem Artefakt erzwingt, dass alle gleichzeitig produziert werden — obwohl manche frueher und manche spaeter fertig sein koennten.

**SP-3: Timing-Inversion bei Hefteintrag-Formulierung**
Die SCPL-Struktur (welche Schritte, welche Kernerkenntnisse) wird korrekt VOR den Materialien definiert (Phase 0.4) — das ist "vom Ende denken". Aber die sprachliche Ausgestaltung (die konkreten Saetze, die SuS im Heft lesen) wird ebenfalls VOR den Materialien festgelegt (Phase 0.4 + 2.0). Nach Material-Produktion erfolgt KEINE Revision.

Konsequenz: Der Hefteintrag-Text kann nicht auf die Material-Erfahrung der SuS Bezug nehmen. Er bleibt abstrakt.

**SP-4: TB-FREEZE blockiert sprachliche Revision**
TB-FREEZE schuetzt die SCPL-Struktur (korrekt). Aber es blockiert auch jede sprachliche Ueberarbeitung der SCPL-Texte (uebermaessig restriktiv). Die Unterscheidung "Struktur eingefroren, Formulierung offen" existiert nicht.

**SP-5: Doppelte Kernerkenntnisse-Speicherung**
`kernerkenntnisse[]` existiert sowohl in `tafelbild.json` (als `scpl.loesung[]`) als auch in `sicherung.json`. M3b erzwingt Identitaet. Das ist eine Normalisierungs-Anomalie — die Information existiert doppelt, die Synchronisierung ist eine Fehlerquelle.

**SP-6: Steuerungsrichtung unklar**
AGENT_TAFELBILD produziert den Hefteintrag AUS dem SKRIPT (Extraktion). AGENT_MATERIAL baut das Materialgeruest MIT dem Hefteintrag als Zielstruktur (Steuerung). Die Steuerungsrichtung ist also: SKRIPT → Hefteintrag → Materialgeruest. Das ist korrekt. Aber die Materialien werden anschliessend OHNE Rueckwirkung auf den Hefteintrag produziert — der Hefteintrag steuert nur den Plan, nicht die Ausfuehrung. Wenn ein Material inhaltlich vom Plan abweicht (weil die Quelle das nahelegt), passt sich der Hefteintrag NICHT an.

---

## 5. Prueffragen fuer den Auditor

### 5.1 Zur Idealstruktur (Abschnitt 3)

| # | Prueffrage |
|---|---|
| PF-1 | Ist die Idealstruktur des Auftraggebers (Abschnitt 3.1) didaktisch konsistent? Gibt es Spannungen oder Luecken? |
| PF-2 | Ist "vom Ende denken" (Backward Design) auf SCPL-Ebene korrekt umgesetzt (Phase 0.4 → 1.1)? Oder muesste der Merksatz noch frueher stehen? |
| PF-3 | Muessen Sicherungsinhalte game-weit (alle Mappen) oder pro Mappe definiert werden? Die aktuelle Architektur arbeitet pro Mappe (Phase 0.4 produziert pro Chunk). |

### 5.2 Zur Begriffstrennung

| # | Prueffrage |
|---|---|
| PF-4 | Sollte "Tafelbild" als Begriff abgeschafft und durch "Hefteintrag" ersetzt werden? Was waeren die Kosten (Refactoring) und der Nutzen (konzeptuelle Klarheit)? |
| PF-5 | Sollte `rahmen/sicherung.json` in mehrere Artefakte aufgespalten werden (z.B. `hefteintrag.json` + `sicherung_rahmen.json`)? Was waere gewonnen, was verloren? |
| PF-6 | Gehoert die Transferfrage (`transfer.frage`) zum Hefteintrag-Artefakt oder zum Sicherungs-Rahmen? Aktuell liegt sie im Tafelbild-JSON. |

### 5.3 Zum Timing

| # | Prueffrage |
|---|---|
| PF-7 | Ist eine Zwei-Stufen-Architektur fuer den Hefteintrag sinnvoll? Stufe 1: Struktur + Kernerkenntnisse (Phase 0.4, vor Materialien). Stufe 2: Sprachliche Revision (Phase 2.1c, nach Materialien). |
| PF-8 | Was genau darf in Stufe 2 geaendert werden, ohne die didaktische Steuerungswirkung von Stufe 1 zu untergraben? Wo ist die Grenze zwischen "sprachlicher Verfeinerung" und "struktureller Aenderung"? |
| PF-9 | Sollte TB-FREEZE differenziert werden? Z.B.: Struktur-FREEZE (SCPL-Schritte, Kernerkenntnisse-Anzahl, Ordnungsmuster) vs. Formulierungs-OFFEN (konkrete Saetze)? |
| PF-10 | Sollte die `zusammenfassung` in sicherung.json erst nach Material-Produktion formuliert werden (aktuell: Phase 2.0, VOR Materialien)? |

### 5.4 Zur Steuerungswirkung

| # | Prueffrage |
|---|---|
| PF-11 | Steuert der Hefteintrag tatsaechlich die Material-Produktion? Oder ist die Steuerung nur indirekt (MATERIAL liest TB-Knoten, nicht Hefteintrag-Saetze)? |
| PF-12 | Sollte jeder SUB_MATERIAL_*-Dispatch den zugehoerigen SCPL-Schritt als expliziten Input erhalten (nicht nur den TB-Knoten-Verweis)? |
| PF-13 | Prueft das Material-Q-Gate aktuell, ob das produzierte Material den Hefteintrag-Baustein tatsaechlich erarbeitbar macht? Oder prueft es nur TB-Knoten-Abdeckung (binaer)? |

### 5.5 Zur Gesamtarchitektur

| # | Prueffrage |
|---|---|
| PF-14 | Waere eine alternative Phasenstruktur besser? Z.B.: Phase 0.4 produziert NUR Kernerkenntnisse + Merksaetze (kein SCPL-Volltext) → Phase 1.1 nutzt diese als Zielstruktur → Phase 2.1c produziert den vollstaendigen SCPL-Hefteintrag MIT Material-Kontext? |
| PF-15 | Welche der 6 Strukturprobleme (SP-1 bis SP-6) sind kritisch und welche sind akzeptable Kompromisse? |
| PF-16 | Gibt es eine Prozessstruktur, die ALLE folgenden Anforderungen gleichzeitig erfuellt? (a) Backward Design ab Merksatz, (b) Material-aware Formulierungen, (c) TB-FREEZE fuer Struktur, (d) Minimale Dispatch-Anzahl, (e) Keine zirkulaeren Abhaengigkeiten |

---

## 6. Bewertungsformat

Der Auditor soll pro Prueffrage antworten:

```
PF-[N]:
  Befund: [Was die Analyse ergibt]
  Empfehlung: [Konkrete Aenderung oder "Status quo beibehalten"]
  Begruendung: [Warum]
  Aufwand: [Gering / Mittel / Hoch]
  Risiko bei Nicht-Umsetzung: [Was passiert, wenn nichts geaendert wird]
```

Am Ende: Konsolidierte Empfehlung mit priorisierter Massnahmen-Liste.

---

## 7. Nicht im Scope

- Engine-Code (escape-engine.js) — rein technisch, nicht didaktisch
- Phase 3 Assembly — rein mechanisch
- Aufgaben-Produktion (Phase 2.2) — wird durch Hefteintrag-Aenderungen nicht direkt betroffen
- Ueberleitungen (Q-M2-03) — bereits separat adressiert
