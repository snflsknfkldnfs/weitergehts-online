# AUDITBERICHT RA4 — Fachdidaktische Schärfe

**Agent-ID:** RA4 (Review-Agent 4 — Fachdidaktische Schaerfe)  
**Dimension:** Fachdidaktische Qualitaet der Phase-0-Vertraege  
**Audit-Datum:** 2026-04-06  
**Basis-Dokumente:**
- VERTRAG_PHASE_0-1_DIDAKTIK.md v1.1
- VERTRAG_PHASE_0-2_INHALT.md v1.1
- VERTRAG_PHASE_0-3_SKRIPT.md v1.1
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md v1.0
- GUETEKRITERIEN_SKRIPT.md v1
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md v1 (Auszug)
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md v1 (Vorgaenger-Konsolidierung)

---

## Zusammenfassung

Die Phase-0-Vertraege sind fachdidaktisch fundiert auf Roth (FD-Q2), bieten aber kritische Blindstellen fuer die GPG-Kompetenzstruktur des Lehrplan PLUS (R7). Insbesondere:

1. **Quellenorientierung ist nicht operationalisiert:** FD-Q2 fordert Quellenarbeit (Analyse, Einordnung, Kritik) als didaktisches Kernprinzip, aber die Vertraege kennen Quellen nur als Artefakt-Typ, nicht als Handlungsweise. SK-Kriterien regeln „Personifizierung", nicht „Quellenanalyse".

2. **SCPL-Struktur ist zu starr fuer kategoriale Themen:** 9 Ordnungsmuster in HEFTEINTRAG §3.3, aber SCPL-JSON erzwingt immer S-C-P-L, auch wenn „Complication" semantisch nicht passt (z.B. bei „Vergleich Staende: Klerus vs. Adel vs. Bauern").

3. **Differenzierung ist ein Phasen-Durcheinander:** DIDAKTIK-Vertrag fordert „3-Stufen-Tipp-System" in Phase 0 (QD8), aber Tipp-Mechanismen gehoeren zu Phase 2. Phase-0-Differenzierung muss auf Struktur-Ebene (Kern vs. Vertiefung pro Mappe) ansetzen.

4. **Motivierung bleibt quantitativ:** SK10 fordert „mindestens 1 pro Chunk", aber ohne Qualitaetskriterien (themenimmanent vs. generisch). Ein generischer Einstieg erfuellt das Kriterium formal.

5. **Narrativitaet und Kontroversitaet sind unterspezifiziert:** Q9 (Personifizierung) und SK15 (Kontroversitaet) sind binaer. Kein Unterschied zwischen „ein Name erwaehnt" und „konsistente Perspektivfigur ueber Chunk". SK15 als KANN widerspricht Beutelsbacher Konsens fuer viele GPG-Themen.

6. **Hefteintrag-Erarbeitbarkeit ist ungeprüft gegen SuS-Realität:** QH5 markiert DIRECT/ARTIFACT/INFERENTIAL abstrakt, aber validiert nicht gegen konkrete Materialien, ob ein R7-Schueler:in den Hefteintrag tatsaechlich selbst strukturieren kann.

7. **Mappen-Aufteilung nicht an didaktische Artikulationsmodelle rueckgebunden:** H1-H7 sind pragmatisch, aber nicht abgesichert an RITA oder Roth-Artikulationsschema. Mappen-Aufteilung kann zufaellig didaktisch sinnvoll oder unsinnvoll sein.

8. **Quellentypen und -arbeit nicht systematisch verortet:** INHALTSBASIS behandelt Quellen (zit-X-Y) als Artefakte, SKRIPT referenziert sie per Marker, aber kein Vertrag regelt, wie aus Quellentext → Quellenanalyse (nicht nur „lesen") wird.

Die Pipeline ist funktionsfaehig fuer Ereignisgeschichte (WK1-Prototyp). Fuer vollstaendige GPG-Didaktik sind 8 Findings notwendig.

---

## Findings

### [RA4-F01] Quellenorientierung nicht als didaktisches Handlungsprinzip operationalisiert

**Severity:** CRITICAL  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT, GUETEKRITERIEN_SKRIPT.md  
**Beschreibung:**  
FD-Q2 und FD-Q1 fordern Quellenarbeit (Analyse, Einordnung, Kritik) als Kernfachprinzip. GUETEKRITERIEN_SKRIPT.md enthält SK-Kriterien SK1-SK17, aber keines adressiert explizit, dass SuS eine historische Quelle ANALYSIEREN (nicht nur lesen). SK8 nennt „Wechsel der Darstellungsformen" (Beschreibung, Dialog, innerer Monolog, Kommentar) — das ist Vergegenwärtigung, nicht Quellenarbeit.

**Evidenz:**  
- GUETEKRITERIEN_SKRIPT.md §3: SK1-SK15 (+ SK17). SK-Kriterien fokussieren auf Narrativ-Qualitaeten (Vergegenwärtigung, Elementarisierung, Personifizierung, Strukturiertheit), nicht auf Quellenorientierung als Handlung.
- VERTRAG_PHASE_0-3_SKRIPT.md §5.2: SK8-SK12 sind SOLL-Kriterien, SK15 „Kontroversitaet" ist KANN. Nirgends: „Jeder Chunk muss eine Quelle so einbetten, dass SuS sie analysieren koennen."
- INHALTSBASIS behandelt Zitate als Artefakte (zit-X-Y ID), SKRIPT referenziert sie per [ARTEFAKT: zit-X-Y]-Marker, aber der Uebergang zu „Quellenanalyse" (nicht nur Zitat-Einbindung) ist ungeregelt.

**Impact:**  
Phase-0-Skripte erfuellen FD-Q2 nicht vollstaendig. SuS arbeiten mit Quellen als Text-Bausteine des Narrativs, nicht als historische Primaerquellen zur Analyse. Dies widerspricht dem Lehrplan R7 GPG (Quellenarbeit in Lernbereich Zeitperspektive, Lernbereich 1: Analyse historischer Quellen).

**Recommended Fix:**  
1. Neue MUSS-Kriterium SK18 in GUETEKRITERIEN_SKRIPT.md ergaenzen:  
   **SK18 „Quellenorientierung als Analysehandlung":** Mindestens 1 Chunk pro Game muss eine historische Primaerquelle (Dokument, Tagebuch-Auszug, Rede, Bild, Statistik) so kontextualisieren und einbetten, dass SuS folgende Operationen ermoeglicht werden: (1) Quellentyp bestimmen, (2) Autor/Perspektive identifizieren, (3) Intention/Tendenz erkennen, (4) zeitliche/raeumliche Einordnung vornehmen. (Kalibrierung auf R7-Niveau: nicht Quellenkriitk im Sinne Meinecke, sondern angemessener Quellenzugang.)

2. VERTRAG_PHASE_0-3_SKRIPT.md §5.2 erwaentern: Unter SOLL-Kriterien explizit SK18 (neu) aufnehmen mit Severity HIGH.

3. SKRIPT-Self-Check (§5.1 Q-Gate) ergaenzen: Neue Operationale Pruefung:  
   **Q14 „Quellenanalyse-Potential":** Irgendein Chunk enthaelt eine historische Quelle, die fuer SuS analysierbar ist (nicht nur rezeptiv gelesen). Binaer PASS/FAIL.

**Delta zu v1:** NEU

---

### [RA4-F02] SCPL-Struktur zu starr fuer kategorial-vergleichende Themen

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG.md, GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md  
**Beschreibung:**  
HEFTEINTRAG §3.3 definiert 9 Ordnungsmuster (kausal, chronologisch, kategorial, parallel-kausal, kontrastierend, sequenziell, metaphorisch, relational, konzept-beispiel). Aber das JSON-Schema (§4, auch in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md) erzwingt immer:
```
scpl: {
  situation: { kontextsatz, fachbegriffe },
  complication: [{ schritt, fachbegriff, darstellung? }],  // min. 1
  problem: { satz, fachbegriff },
  loesung: [...]
}
```

Fuer kategorial-vergleichende Themen (z.B. „Staende im Mittelalter: Klerus, Adel, Bauern — welche Rolle hatte jeder?") passt „Complication" nicht semantisch. Es gibt keine „Problemkomplizierung", sondern eine Struktur von Vergleichskategorien. Das SCPL-Schema zwingt zu kuenstlichen Complication-Konstruktionen.

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md §3 Aufgabe 4: „SCPL-Struktur aufbauen: Situation, Complication[], Problem, Loesung[]." Als einziges Containerformat.
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md §5 G4: Ordnungsmuster definiert (parallel-kausal, sequenziell, kontrastierend, metaphorisch, relational, konzept-beispiel), aber nicht, wie z.B. „kontrastierend" in SCPL-JSON abgebildet wird. G15 (neu, v3.1) versucht, dies zu regeln: „Bei ‚kontrastierend': Mindestens 1 Complication-Schritt als Pol-Gegenueberstellung." Aber Pol-Gegenueberstellung ist keine „Complication" im narrativen Sinne — es ist eine kategoriale Parallelisierung.
- Beispiel Kategorial: „Vergleich Staende" hatte SCPL-Schema: Situation = „Mittelalter existiert Staendeordnung." Complication = [„Klerus hatte Macht in Kirche", „Adel hatte Macht im Militaer", „Bauern hatten keine Macht"] — das ist kein „Complication" (Problemversaerfung), sondern enumeration kategorischer Unterschiede.

**Impact:**  
Nicht-narrative Ordnungsmuster werden in ein Narrativ-Schema gepresst. Dies fuehrt zu zweierlei: (1) SCPL-Struktur wirkt kuenstlich fuer kategoriale Themen, (2) Downstream-Material-Generierung (Phase 1) erbt diese Struktur und versucht, sie in Aufgaben zu uebersetzen, was zu didaktisch ungelenken Fragestellungen fuehrt.

**Recommended Fix:**  
1. HEFTEINTRAG §4 JSON-Schema flexibilisieren: Complication[] als optional (min. 0 statt min. 1) fuer Ordnungsmuster, die keine natuerliche Komplikation haben.

2. Ordnungsmuster-spezifische Minimal-Schemata definieren. Beispiel:  
   - **kausal / parallel-kausal / sequenziell:** Require complication[] (min. 1). Standard SCPL.
   - **kategorial / kontrastierend / relational:** Complication[] optional. Stattdessen freie Struktur erlaubt: complication[] ODER categories[] (mit subkategorien). Loesung[] bleibt.
   - **konzept-beispiel:** Require complication[] optional. Stattdessen: concept (Begriff), examples[] (min. 2 Beispiele).

3. GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md G14 ueberarbeiten: G14 „SCPL-Kohaerenz" ist nur fuer narrative Ordnungsmuster anwendbar. Neue Regel hinzufuegen:  
   **G16 „Ordnungsmuster-Schema-Konsistenz":** Die JSON-Struktur MUSS zum gewaehlten Ordnungsmuster passen. Wenn ordnungsmuster=\"kategorial\", darf das JSON eine categories[]-Struktur verwenden oder complication[] leer lassen. JSON-Schema sollte NICHT erzwingen, dass narrative Felder befuellt werden.

**Delta zu v1:** NEU

---

### [RA4-F03] Differenzierung in Phase 0 ist konzeptuell verloren

**Severity:** HIGH  
**Betroffene Vertraege:** VERTRAG_PHASE_0-1_DIDAKTIK.md  
**Beschreibung:**  
QD8 fordert: „Artikulationsstruktur (Einstieg/Erarbeitung/Sicherung), Narrativ-Rahmen, Differenzierungshinweise (3-Stufen-Tipp-System)."

Das 3-Stufen-Tipp-System ist ein **Phase-2-Mechanismus** (Aufgaben mit 3 Hilfe-Stufen). Es gehoert nicht in Phase 0, wo noch keine Aufgaben existieren. Phase-0-Differenzierung muss auf **Struktur-Ebene** ansetzen:
- Kernfakten / Kernerkenntnisse (Pflicht fuer alle SuS)
- Vertiefungsartefakte / Vertiefungsfakten (optional, fuer leistungsstark)
- Vereinfachungsoptionen (fuer Foerderbedarfe)

**Evidenz:**  
- DIDAKTIK-Vertrag §3.1 Output-Sektion QD8: „Differenzierungshinweise (3-Stufen-Tipp-System)" ist explizit genannt.
- Aber: AGENT_DIDAKTIK soll in Phase 0.1 noch nicht wissen, wie die Aufgaben strukturiert sind (das ist Phase 2.2). Tipp-Ebenen-Bestimmung erfordert konkrete Aufgabenkonstruktion.
- Korrekt: INHALTSBASIS (Phase 0.2) koennte pro Artefakt/Fakt markieren: Typ „Kern" vs. Typ „Vertiefung" (im Feld „status" oder „differenzierungstyp"). Aber dieser Mechanismus ist nicht geregelt.

**Impact:**  
Differenzierung wird informell. Phase-1/2-Agenten erhalten keine strukturelle Vorgabe, welche Artefakte / Fakten obligatorisch vs. optional sind. Sie muessen ad-hoc entscheiden, was schwaecher/staerker Schueler:innen kriegen.

**Recommended Fix:**  
1. QD8 in DIDAKTIK-Vertrag umformulieren:  
   Ersetze: „Differenzierungshinweise (3-Stufen-Tipp-System)"  
   Durch: „Differenzierungshinweise auf Struktur-Ebene: Pro Mappe Angabe, welche Artefakte/Fakten als Kern (Pflicht) vs. Vertiefung (optional) eingestuft werden. Tipp-System bleibt Phase-2-Aufgabe."

2. INHALTSBASIS-Vertrag (Phase 0.2) ergaenzen: In der Artefakt-Inventar-Tabelle (Wikimedia-Artefakte, Zitate, Rollenprofile) neue optionale Spalte:  
   `Differenzierungstyp: Kern | Vertiefung | Optional`
   
   Heuristik:
   - Kern: Notwendig zur Stundenfrage / KE-Abdeckung
   - Vertiefung: Vertieft oder exemplifiziert Kernverstehen, erfordert aber Zeit
   - Optional: Interessant, aber entbehrlich ohne Wissensverlust

3. In Phase-1-Vertrag (wenn geschrieben): Explizit vorgeben, dass Kern-Artefakte in alle Materialvarianten eingehen, Vertiefung optional ist.

**Delta zu v1:** NEU

---

### [RA4-F04] Sachbezogene Motivierung (SK10) nur quantitativ definiert

**Severity:** MEDIUM  
**Betroffene Vertraege:** GUETEKRITERIEN_SKRIPT.md  
**Beschreibung:**  
SK10 „Sachbezogene Motivierung": „Jeder Chunk-Einstieg motiviert aus dem Sachverhalt selbst heraus (Widerspruch, ueberraschendes Faktum, offene Frage), nicht durch sachfremde Mittel" (GUETEKRITERIEN_SKRIPT.md §3.2, Zeile 110).

Aber die Operationalisierung (§6 ist nicht vorhanden). SK10 bleibt kategorial, nicht messbar. Was unterscheidet einen sachbezogenen Einstieg von einem generischen? Ein generischer Einstieg (z.B. „Stellt euch vor, ihr livebt 1914...") erfuellt formal die Pflicht „einen Einstieg haben", ohne dass die Sachbezogenheit gemaess Schroeder/Brunnhuber erfuellt ist.

**Evidenz:**  
- GUETEKRITERIEN_SKRIPT.md §3.2 SK10: Definition vorhanden, Operationalisierung nicht.
- §6 „Operationalisierung" (Zeilen 181-234): Methoden fuer SK1-SK8, SK15, aber SK10 ist uebersprungen.
- Beispiel Grenzfall: Chunk-Einstieg: „1914 war das Jahr, das alles veraenderte. Aber warum?" vs. „Stellt euch vor, ihr seid im Sommer 1914 unterwegs." — Erste ist sachbezogen (offene Frage), zweite ist fiktiv-einfuehlend, nicht sachbezogen.

**Impact:**  
Self-Check in AGENT_SKRIPT kann SK10 nicht operativ pruefen. Hinweise zu SK10-Defiziten bleiben vage. User-Review muss SK10 manuell interpretieren.

**Recommended Fix:**  
SK10-Operationalisierung in GUETEKRITERIEN_SKRIPT.md §6 ergaenzen:

```
### 6.10 SK10 Sachbezogene Motivierung — Einstieg pruefen

**Methode:** Chunk-Einstieg klassifizieren nach Motivierungs-Typ:
- Sachbezogen: basiert auf Widerspruch, ueberraschendes Faktum, oder offener Sachfrage
- Generisch-fiktiv: „Stellt euch vor...", „Du bist...", ohne Sachbezug
- Affektiv: emotionaler Appeal, Leid, Spannung ohne Sachverstrickung
- Lebenswelt-Bezug: Parallelisierung zur SuS-Erfahrung (kann sachbezogen sein, wenn geerdet)

**PASS-Muster (sachbezogen):**
- "1914: Warum brach der Krieg aus, obwohl Diplomaten monatelang verhandelten?"
- "Die Marokkokrise von 1905 — ein Konflikt, der eigentlich Paris betraf, aber Berlin erschuetterte."
- "Stellungskrieg: Soldaten gruben sich ein. Warum konnten Generaele nicht mehr angreifen?"

**FAIL-Muster (generisch):**
- "Stellt euch vor, ihr seid im Sommer 1914..."
- "Der Erste Weltkrieg war schrecklich. Aber warum?"
- "Alle aendert sich. Was geschah damals?"

**Schwellenwert:** Chunk-Einstieg muss sachbezogen sein (Typ 1). Lebenswelt-Bezug (Typ 4) ist akzeptabel nur dann, wenn er direkt in eine Sachfrage ueberleitet.
```

**Delta zu v1:** NEU

---

### [RA4-F05] Narrativitaet (Q9) und Kontroversitaet (SK15) sind binaer, nicht gestaffelt

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-3_SKRIPT.md, GUETEKRITERIEN_SKRIPT.md  
**Beschreibung:**  
Q9 „Personifizierung": „mindestens 1 Person/Chunk" (SKRIPT-Vertrag §5.1). Binaer: PASS wenn 1+ Person genannt, FAIL wenn 0.
SK15 „Kontroversitaet": Aufgelistet als KANN-Kriterium (§3.3), nicht SOLL oder MUSS.

Beides ist zu unrefiniert:
- **Q9:** Unterschied zwischen „ein Name erwaehnt" (z.B. „Kaiser Wilhelm II.") vs. „konsistente Perspektivfigur ueber mehrere Saetze" ist nicht erfasst. Ein generischer Name-Drop erfuellt Q9, waehrend eine durchgehaeltene Perspektive didaktisch plauzibel ist.
- **SK15:** Fuer viele GPG-Themen ist Kontroversitaet (Beutelsbacher Konsens) zentral: Kolonialisierung, Revolutionen, Kriegsdarstellung, Industrialisierung. SK15 als KANN suggeriert Optionalitaet, widerspricht aber explizit FD-Q1 Fachprinzip „Kontroversitaet".

**Evidenz:**  
- VERTRAG_PHASE_0-3_SKRIPT.md §5.1 Q9: „Personifizierung (mindestens 1 Person/Chunk)". Keine Abstufung.
- GUETEKRITERIEN_SKRIPT.md §3.1 Q9: „1 Person/Chunk" (Zeile 140) — dargestellt als „Minimum, nicht Qualitaetsmass".
- GUETEKRITERIEN_SKRIPT.md §3.3 SK15: „KANN-Kriterium" (Zeile 115-121). Aber diese Einstufung ist themenabhaengig. Kontroversitaet bei „Staende" ist vielleicht optional (Darstellung kann neutral sein). Bei „Reformation" ist Kontroversitaet zentral (Pro/Contra).

**Impact:**  
Q9: Weak personification wird als erfuellt gezaehlt. Downstream-SCPL (HEFTEINTRAG) kann nicht auf echte Perspektivfiguren bauen.
SK15: Kontroverse Themen ohne explizite Adressierung von Deutungsvielfalt erstuellen das Q-Gate trotzdem. Dies verletzt Beutelsbacher Konsens fuer diese Themen.

**Recommended Fix:**  
1. Q9 erweitern auf 3-Stufen-Bewertung (intern, nicht veraendert PASS/FAIL):
   - **Minimal:** Name genannt, aber keine weitere Charakterisierung
   - **Standard:** Person mit Handlung/Motive beschrieben (1-2 Saetze)
   - **Exzellent:** Perspektivfigur ueber mehrere Saetze / mehrere Chunks konsistent (z.B. Tagebuch-Stimme, Feldpost-Schreiber)
   
   Alle 3 Stufen = PASS. Aber Quality-Remark: „[SK-HINWEIS: Personifizierung auf Stufe X]" (nur wenn explizit angefordert).

2. SK15 in GUETEKRITERIEN_SKRIPT.md ueberarbeiten:
   - Nur als KANN fuer explizit nicht-kontroverse Themen (z.B. reine Naturkatastrophen-Darstellung).
   - Fuer Konflikt-Themen (als Metadatum `konflikttyp: true`): SK15 zur MUSS hochgestuft.
   - Beispiele konfliktreich: Krieg, Revolution, Industrialisierung (Kapital vs. Arbeiter), Kolonialisierung, Staendeordnung.

3. SKRIPT-Vertrag §5.2 ergaenzen: Neue Regel unter Stufe 2 Fachdidaktische Pruefung:
   ```
   SK15-Kontextual: Wenn Input `konflikttyp: true` → SK15 ist SOLL/MUSS.
   Wenn `konflikttyp: false` → SK15 ist KANN. Pruefergebnis dokumentiert aber Quality-Level (minimal/komplett/absent).
   ```

**Delta zu v1:** NEU

---

### [RA4-F06] SK15 Kontroversitaet widerspricht implizit Beutelsbacher Konsens

**Severity:** MEDIUM  
**Betroffene Vertraege:** GUETEKRITERIEN_SKRIPT.md, VERTRAG_PHASE_0-1_DIDAKTIK.md  
**Beschreibung:**  
SK15 ist als KANN-Kriterium aufgelistet (GUETEKRITERIEN_SKRIPT.md §3.3). Das bedeutet, Skripte koennen valide sein, ohne Kontroversitaet zu adressieren.

Aber FD-Q1 (Fachprinzipien) nennt Kontroversitaet explizit, und Beutelsbacher Konsens (Sozialwissenschaften R7) fordert: Bei historisch umstrittenen Themen MUESSEN unterschiedliche Deutungen vermittelt werden — nicht als fakultative Erweiterung, sondern als Kernprinzip.

Beispiele GPG R7, wo Kontroversitaet zentral ist:
- Napoleonische Kriege: Befreiung vs. Unterdrueckung
- Industrialisierung: Fortschritt vs. Ausbeutung
- Weimarer Republik: Rettungsversuch vs. Schwaeche
- Kolonialismus: Zivilisierungsmission vs. Imperialismus

QD7 in DIDAKTIK-Vertrag (Phase 0.1) fordert: „Ethische Hinweise: Multiperspektivitaet, Kontroversitaet, Ueberwaetigungsverbot, Sensibilitaet, Aktualitaetsbezug (je nach Thema)". Das ist vage und delegiert Entscheidung an „je nach Thema".

**Evidenz:**  
- GUETEKRITERIEN_SKRIPT.md §3.3 SK15: KANN-Kriterium. Interpretierbar als: Kontroversitaet ist Optimierungspotenzial, nicht Pflicht.
- VERTRAG_PHASE_0-1_DIDAKTIK.md QD7: „Ethische Hinweise — Kontroversitaet" — vage, keine Entscheidungsregel, wann MUSS vs. KANN.
- Gegenbefund: GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md G13 scheint zu implizieren, dass Kontroversitaet in Stundenfrage-Architektur eingebaut sein sollte (\"Stundenfrage als problemorientierte, schuelernahe Frage\") — Problematisierung deutet auf Kontroversitaet hin.

**Impact:**  
Skripte zu kontroversen Themen koennen SK15 nicht erfuellen und trotzdem PASS gehen. Dies verletzt Beutelsbacher Konsens und FD-Q1 Fachprinzipien. Fuer R7-Lehrkraefte ist unklar, ob sie verpflichtet sind, die Phase-0-Artefakte nachzubessern (Kontroversitaet einfuegen) oder ob sie so verwendet werden duerfen.

**Recommended Fix:**  
1. Neue Metadaten fuer jeden Theme bei Audit-Eingang (ORCHESTRATOR oder AGENT_DIDAKTIK Phase 0.1):  
   `konflikttyp: true | false`
   
   Heuristik (nicht exhaustiv):
   - `true`: Thema hat inhaerent widersprechende Deutungen oder betroffene Akteure mit gegensaetzlichen Zielen
   - `false`: Thema ist Faktenwissen oder Naturereignis ohne Wertungskontroverse

2. GUETEKRITERIEN_SKRIPT.md ueberarbeiten:  
   SK15 nicht als KANN, sondern:
   - Wenn `konflikttyp: true` → SK15 ist **SOLL** (HINWEIS bei Verletzung).
   - Wenn `konflikttyp: false` → SK15 ist **KANN**.

3. VERTRAG_PHASE_0-1_DIDAKTIK.md QD7 praezisieren:
   ```
   QD7 Ethik-Abdeckung:
   - Wenn konflikttyp=true: Multiperspektivitaet UND Kontroversitaet BEIDE adressiert. Ueberwaetigungsverbot beachtet. (Pruefung: Gibt es min. 2 Deutungen benannt? Ist Ueberwaetigungsgebot eingehalten, d.h. keine Einseitigkeit?)
   - Wenn konflikttyp=false: Multiperspektivitaet + Ueberwaetigungsverbot genuegt.
   ```

**Delta zu v1:** NEU

---

### [RA4-F07] Hefteintrag-Erarbeitbarkeit nicht gegen SuS-Realitaet validiert

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-4_HEFTEINTRAG.md  
**Beschreibung:**  
QH5 fordert: „Pro SCPL-Schritt markiert: DIRECT / ARTIFACT / INFERENTIAL. Mindestens 70% DIRECT + ARTIFACT."

Aber diese Markierung ist **abstrakt gegen das SKRIPT**, nicht konkret gegen geplante Materialien. Ein SCPL-Schritt kann theoretisch als DIRECT markiert werden, aber dann fehlt in Phase 1 tatsaechlich das Material, das es erarbeitbar macht.

Beispiel: SCPL.complication[0] = "Die Marokkokrise verschaerften die Spannungen zwischen Frankreich und Deutschland." Markierung: DIRECT (durch Quellentext?). Aber wenn Phase 1 keinen Quellentext zum Marokko-Konflikt produziert, ist DIRECT nicht erarbeitbar.

**Evidenz:**  
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md §3 Aufgabe 5: „Erarbeitbarkeits-Pruefung: Pro SCPL-Schritt markieren: DIRECT / ARTIFACT / INFERENTIAL. Mindestens 70% DIRECT + ARTIFACT."
- QH5 (Severity HIGH): „Pro SCPL-Schritt markiert. Mindestens 70% DIRECT + ARTIFACT. Kein SCPL-Schritt ohne Nachweis."
- Aber: Das Nachweis ist ein Marker im TAFELBILD-JSON, nicht eine Validierung gegen konkrete Phase-1-Materialplanungen.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md M-QA17 erkennt dies: „In Phase-1/1.5-Vertrag verankern: Jeder SCPL-Schritt muss durch mindestens 1 Material + 1 Aufgabe erarbeitbar sein." — Das ist jedoch noch nicht implementiert (deferred bis Phase-1-Vertrag).

**Impact:**  
QH5 wird formal erledigt (Markierungen existieren), aber die Markierungen sind unvalidiert. Phase 1 erbt ein TAFELBILD mit DIRECT-Markierungen, die sich bei konkreter Materialplanung als unrealistisch erweisen. Dann muss entweder Phase 0 (HEFTEINTRAG) ueberarbeitet werden (STRUKTUR-FREEZE-Bruch) oder Phase 1 improvisiert Ersatz-Materialien (Qualitaetsdefizit).

**Recommended Fix:**  
1. QH5 umformulieren: QH5 bleibt abstrakte Phase-0-Pruefung (Markierung DIRECT/ARTIFACT/INFERENTIAL basierend auf SKRIPT-Verstaendnis). Sorgfalt und Plausibilitaet erhoehen.

2. Neue Downstream-Kontingenz-Regel (QH-RC4) hinzufuegen:  
   **QH-RC4 „Phase-1-Validierung der Erarbeitbarkeit":** In Phase 1 (Materialplanung) muss jeder SCPL-Schritt, der als DIRECT markiert ist, durch min. 1 tatsaechlich geplantes Material abgedeckt sein. Wenn Phase 1 feststellt, dass ein SCPL-Schritt nicht erarbeitbar ist → Eskalation zu User mit Frage: SCPL umformulieren oder Material einplanen? (Dies ist ein TB-REVISION-Trigger gemäß §5 Eskalationspfad, aber nicht eigenmaechtig durch Phase 1 zu aendern.)

3. In Phase-1-Vertrag (zukuenftig) explizit regeln: Materialliste gegen TAFELBILD-JSON validieren. Mismatch → Escalation Log generieren.

**Delta zu v1:** NEU

---

### [RA4-F08] Mappen-Aufteilung nicht an didaktische Artikulationsmodelle zurueckgebunden

**Severity:** MEDIUM  
**Betroffene Vertraege:** VERTRAG_PHASE_0-1_DIDAKTIK.md  
**Beschreibung:**  
H1-H7 (Mappen-Aufteilungs-Heuristiken) sind pragmatisch, aber nicht an fachdidaktische Artikulationsmodelle (z.B. RITA, Roth, Schroeder) zurueckgebunden. H1-H7:
- H1: Chronologische Schnitte
- H2: Zentrales Thema teilen
- H3: Konflikt/Spannungsschaerfung
- H4: Rueckwaerts-Perspektive
- H5: Schluesselereignis
- H6: Thematischer Fokus
- H7: Erkenntnis-Progression

Diese sind Zerlegungsheuristiken, aber sie begruenden nicht, warum diese Aufteilung **didaktisch** sinnvoll ist. Eine Mappen-Aufteilung nach H1-H7 koennte:
- Zufaellig mit einem klassischen Stunden-Aufbau (Einstieg-Erarbeitung-Sicherung) korrespondieren.
- Oder nicht: Wenn Mappe 1 "Einstiegsfrage", Mappe 2 "Erarbeitungs-Material", Mappe 3 "Sicherung" ist, passt das zu RITA. Wenn aber Mappe 1-2 beide Erarbeitungs-Content sind und nur Mappe 3 Sicherung, dann fehlt eine Struktur.

**Evidenz:**  
- VERTRAG_PHASE_0-1_DIDAKTIK.md §3 (keine Aufgaben-Reihe, nur Input/Output), dann §5 Konventionen — H1-H7 stehen nicht in diesem Vertrag als explizite Heuristiken.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md M-QA19 erkennt dies: „Mappen-Aufteilung nicht gegen Unterrichtsprinzipien fundiert. H1-H7 sind pragmatische Heuristiken, aber nicht an didaktische Artikulationsmodelle (z.B. RITA, Roth) zurueckgebunden."
- Artikel-Schema RITA = Realbegegnung-Interpretation-Test-Anwendung. Klassisches Modell fuer Stunden. Roth-Phasen = Motivation-Vergegenwaertigung-Besinnung-Bewaeltigung. Beide definieren, welche Funktion jede Stunde/Mappe hat.

**Impact:**  
Lehrkraeft und PM wissen nicht, ob eine vorgeschlagene Mappen-Aufteilung didaktisch verankert ist oder zufaellig passt. Transparenz fehlt. In Phase 2 (Rahmen-Produktion) koennten Mappen-Funktionen implizit angenommen werden, die nicht begruendet waren.

**Recommended Fix:**  
1. AGENT_DIDAKTIK-Aufgabe 2 (Mappen-Aufteilung) um einen **Plausibilitaets-Check** ergaenzen:

   Nach der Aufteilung (H1-H7): Jede Mappe einem didaktischen Artikulationsschritt zuordnen. Keine Pflicht-1:1-Zuordnung, aber Reflexion:
   - Ist Mappe 1 ein „Einstieg" im Sinne Roth (Motivation)?
   - Haben Mappen 2-N die Funktion „Vergegenwaertigung"?
   - Welche Mappe adressiert „Besinnung" (Schlussfolgerungen, Ursachen-Analyse)?
   - Wo findet „Bewaeltigung" statt (Transfer, Anwendung)?

   Self-Check: Alle 4 Roth-Phasen sollten ueber die Mappen-Sequenz implizit abgebildet sein.

2. DIDAKTIK-Rahmen-Output um neue **optionale** Sektion ergaenzen:  
   **Mappen-Artikulations-Funktionen:**
   ```
   | Mappe | Funktion (nach Roth) | Begruendung |
   |-------|----------------------|-------------|
   | 1 | Motivation + Vergegenwaertigung | Niedrigschwelliger Einstieg mit Leitfrage |
   | 2 | Vergegenwaertigung | Konflikt verschaerft sich |
   | ... |
   ```

   Dies ist transparent dokumentiert, nicht prescriptive — User koennte widersprechen.

3. Im Q-Gate QD8 explizit machen: Mappen-Grobstruktur ist „didaktisch plausiibel", nicht nur „chronologisch teilbar".

**Delta zu v1:** NEU

---

### [RA4-F09] Quellentypen und -arbeit nicht systematisch verortet

**Severity:** LOW  
**Betroffene Vertraege:** VERTRAG_PHASE_0-2_INHALT.md, VERTRAG_PHASE_0-3_SKRIPT.md  
**Beschreibung:**  
INHALTSBASIS produziert Quellen-Artefakte (zit-X-Y = Zitate, rolle-X-Y = Rollenprofile). SKRIPT referenziert sie per [ARTEFAKT]-Marker. Aber die Vertraege unterscheiden nicht zwischen:

1. **Quellentext als Erzaehl-Baustoff** (wird in SKRIPT eingewoben, bleibt passiv)
2. **Quellentext als Analyseobjekt** (SuS untersuchen: Autor, Tendenz, Kontext, Absicht)

**Evidenz:**  
- INHALTSBASIS-Vertrag §4 (Output) nennt **Zitate** (zit-X-Y) als Artefakt-Typ, aber mit Status QUALIFIZIERT/RESERVE/VERWORFEN. Keine Differenzierung nach Quellentyp oder -nutzungsintention.
- SKRIPT-Vertrag §3.3 [ARTEFAKT]-Marker erlaubt Typ `quellentext` neben `tagebuch`, `bildquelle`, `karte`, `statistik`, `zeitleiste`, `darstellungstext`. Die Marker sagen nicht, ob die Quelle rezeptiv gelesen wird (als Erzaehl-Element) oder aktiv analysiert wird (als Lerngegenstand).
- Artefakt-Marker-Syntax: `[ARTEFAKT: {id} | {typ} | {beschreibung}]` — keine Nutzungsintention gekennzeichnet.

**Impact:**  
Phase 1 erbt eine Artefakt-Liste ohne klare Handlungsvorgaben fuer Quellen. Werden Quellen in Material-Aufgaben zum Analysieren gegeben (Quellenanalyse-Aufgabe) oder nur zum Lesen eingegeben (Darstellungstext-Aufgabe)? Unklar.

**Recommended Fix:**  
1. In INHALTSBASIS-Vertrag (Phase 0.2) Zitate-Tabelle erweitern:  
   Neue Spalte `Quellennutzungsintention: Rezeptiv-narrativ | Aktiv-analytisch | Hybrid`
   
   - Rezeptiv-narrativ: Quelle wird in SKRIPT als Fliesstext eingewoben (bleibt Teil der Erzaehlung)
   - Aktiv-analytisch: Quelle wird als Primaermaterial-Aufgabe aufbereitet (SuS analysieren)
   - Hybrid: Quelle hat beide Funktionen

2. SKRIPT-Marker-Syntax erweitern (optional, aber hilfreich):  
   `[ARTEFAKT: {id} | {typ} | {beschreibung} | Nutzung: {rezeptiv|aktiv|hybrid}]`

3. In Phase-1-Vertrag (zukuenftig) explizit regeln: Artefakte mit `Nutzung: aktiv-analytisch` werden in Quellenanalyse-Aufgaben umgesetzt (mit Guidefragen zur Quellenerschliessung). Artefakte mit `Nutzung: rezeptiv-narrativ` erhalten Darstellungstext-Aufgaben oder Leseverstehens-Aufgaben.

**Delta zu v1:** NEU

---

## Severity-Verteilung

| Severity | Count |
|----------|-------|
| CRITICAL | 1 |
| HIGH | 2 |
| MEDIUM | 5 |
| LOW | 1 |
| **Total** | **9** |

---

## Top-3-Empfehlungen

### 1. **SK18 Quellenorientierung einfuehren (CRITICAL)**

**Grund:** FD-Q2 und Lehrplan R7 fordern Quellenarbeit als didaktisches Kernprinzip. Derzeitige Vertraege kennen nur Quellentypen, nicht Quellenhandlungen (Analyse, Einordnung, Kritik). Priorisierung maximal, weil dies Grundmission der Escape-Game-Pipeline (GPG-Unterricht fuer R7) adressiert.

**Umsetzung:**
- Neue MUSS-Kriterium SK18 in GUETEKRITERIEN_SKRIPT.md
- Neuer Self-Check Q14 in AGENT_SKRIPT-Vertrag
- Mindestens 1 Chunk pro Game muss Quellenanalyse-Potential haben

**Aufwand:** S (Regelwerk-Update)

---

### 2. **SCPL-JSON flexibilisieren fuer kategoriale Themen (HIGH)**

**Grund:** 9 Ordnungsmuster definiert, aber JSON erzwingt immer S-C-P-L. Kategorial-vergleichende Themen sind ab R7 GPG relevant (Staende, Herrschaftsformen, Kulturareaele). Ohne Flexibilisierung sind diese Themen nur mit kuenstlichen Complication-Konstruktionen darstellbar.

**Umsetzung:**
- Complication[] optional (min. 0) fuer nicht-narrative Muster
- Ordnungsmuster-spezifische Minimal-Schemata (kategorisch → categories[], metaphorisch → metaphor + komponenten)
- G16 neue Guete-Kriterium in HEFTEINTRAG-Checkliste

**Aufwand:** M (Schema-Erweiterung + Downstream-Testing)

---

### 3. **Quellennutzungsintention systematisch verorten (MEDIUM+HIGH-Synergy)**

**Grund:** Verbindet F01 (Quellenorientierung-Mangel) und F09 (Quellentypen unklar). Gibt Phase 1 klare Vorgabe, wie Quellen-Artefakte in Aufgaben umgesetzt werden sollen.

**Umsetzung:**
- INHALTSBASIS-Zitate-Tabelle: neue Spalte `Quellennutzungsintention`
- SKRIPT-Marker optional erweitern
- Phase-1-Anleitung vorbereiten: Quellennutzungsintention → Aufgabentyp-Mapping

**Aufwand:** S (Daten-Struktur-Update)

---

## Schlusswort

Die Phase-0-Vertraege bieten solide architektonische Fundamente (Rueckwaerts-Kontingenz, STRUKTUR-FREEZE, Artefakt-Kette). Fachdidaktisch sind aber 8 Blindstellen zu adressieren, damit die Pipeline FD-Q2 (Vergegenwärtigung) UND FD-Q1 (Quellenarbeit, Kontroversitaet, Multiperspektivitaet) vollstaendig erfuellt. Top-Prioritaet: Quellenorientierung operationalisieren + SCPL flexibilisieren. Mit Welle-1-Massnahmen (F01 + F02) ist die Pipeline fuer die naechste Generation nicht-ereignisgeschichtlicher Themen (Konzeptgeschichte, Kulturgeschichte) genuetzt.

---

**Verfasser:** RA4 (Review-Agent 4)  
**Audit-Zeitstempel:** 2026-04-06  
**Koerzensur-Referenz:** BEFUND_PHASE_0_QUALITAETS_AUDIT.md (Konsolidierung 5 RAs)
