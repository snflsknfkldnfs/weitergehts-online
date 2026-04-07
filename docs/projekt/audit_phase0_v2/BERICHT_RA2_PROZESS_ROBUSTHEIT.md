# BERICHT RA2 — Prozess-Robustheit (Phase-0-Audit v2)

**Agent:** RA2 (Review-Agent 2)
**Dimension:** Prozess-Robustheit
**Audit-Datum:** 2026-04-06
**Basis-Dokumente:**
- VERTRAG_PHASE_0-1_DIDAKTIK.md (v1.1)
- VERTRAG_PHASE_0-2_INHALT.md (v1.1)
- VERTRAG_PHASE_0-3_SKRIPT.md (v1.1)
- VERTRAG_PHASE_0-4_HEFTEINTRAG.md (v1.0)
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md (v1, als Vorgänger-Befund)

---

## Zusammenfassung

Die Phase-0-Prozesskette hat formale Q-Gate-Strukturen, aber nur teilweise definierte Eskalationspfade bei Scheitern. Heuristiken H1-H7 für die Mappen-Aufteilung sind stark auf chronologische, ereignisgeschichtliche Themen optimiert und funktionieren nicht robust für abstrakte Konzepte (Feudalismus, Staendeordnung). Fallback-Szenarien (dünne Quellenlage, nicht-teilbare Themen, Themen ohne Akteure) sind unterspecifiziert. Die Messbarkeit von Q-Kriterien ist uneven: operative Checks sind Binär-prüfbar, fachdidaktische Kriterien (SK1-SK17, G1-G14) erfordern erhebliches menschliches Urteil. Rücklauf-Pfade (z.B. SKRIPT → DIDAKTIK bei Scheitern) sind genannt aber nicht mit Exit-Bedingungen operationalisiert. Deadlock-Risiken existieren zwischen DIDAKTIK und SKRIPT, wenn H1-H7 keine sinnvolle Mappen-Aufteilung hervorbringen.

---

## Findings

### [RA2-F01] Keine Eskalationspfade bei Q-Gate-Scheitern (DIDAKTIK)

**Severity:** CRITICAL
**Betroffene Verträge:** VERTRAG_PHASE_0-1_DIDAKTIK
**Beschreibung:** AGENT_DIDAKTIK hat ein Q-Gate mit 10 Kriterien (QD1-QD10), von denen 4 BLOCKER und 4 HIGH sind. Das Gate-Urteil ist "PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung." — aber es gibt keine Definition von "Nachbesserung": Welche Kriterien sind prioritär zu beheben? Darf AGENT_DIDAKTIK selbst iterieren, oder muss der User eingreifen? Wenn User eingreift, wie lange darf die Iteration dauern?

**Evidenz:** 
- VERTRAG_PHASE_0-1_DIDAKTIK, §4, Z. 71: "Gate-Urteil: PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung."
- Keine Definition von Nachbesserungspfad, Iterations-Limit, oder Eskalations-Trigger.
- Vergleich mit Phase 0.3: VERTRAG_PHASE_0-3_SKRIPT hat einen Rücklauf-Szenario-Absatz (Z. 142), aber ohne konkrete Abbruchbedingung ("Max. 1 Iteration pro Chunk. Wenn nach Iteration nicht lösbar: Finding dokumentieren + User-Entscheidung").

**Massnahme:** 
Eskalationspfad in DIDAKTIK-Vertrag ergänzen (neuer Absatz nach §4):
```
**Eskalationspfad bei Q-Gate-Scheitern:**
- BLOCKER-Fehler: Agent versucht 1x selbst zu iterieren (max. 2h). 
  - Bei Erfolg: Gate erneut prüfen.
  - Bei Scheitern: [BLOCKER-FINDING] dokumentieren → Halt + User-Entscheidung erforderlich.
    Mögliche Entscheidungen: (1) Thema-Scope reduzieren, (2) mappen_anzahl anpassen, (3) Thema ablehnen.
- HIGH-Fehler (>1): Agent iteriert selbst (max. 1 Iteration). Ergebnis-Status (PASS/FAIL) dokumentieren.
  - Bei FAIL: [HIGH-WARN] dokumentieren + trotzdem zu Phase 0.2 weiterleiten (mit Hinweis).
```

**Delta zu v1:** NEU

---

### [RA2-F02] Heuristiken H1-H7 nicht robust gegen nicht-chronologische Themen

**Severity:** CRITICAL
**Betroffene Verträge:** VERTRAG_PHASE_0-1_DIDAKTIK
**Beschreibung:** Die 7 Heuristiken zur Mappen-Aufteilung (H1: Chronologische Schnitte, H2: Gleichgewicht, H3: Akteurzentriertheit, H4: Perspektivwechsel, H5: Schlüsselevent-Anker, H6: Identitätsfrage, H7: Problem-Eskalation) sind implizit auf Ereignisgeschichte kalibriert. Für abstrakte Themen wie "Feudalismus", "Staendeordnung", "Antike Demokratie", "Industrialisierung als Strukturwandel" funktionieren sie nicht:
- H1 (Chronologie) setzt eine Zeitachse voraus; Konzeptgeschichte hat keine eindeutige Chronologie.
- H5 (Schlüsselevent) funktioniert nur für Ereignisse, nicht für Strukturen.
- H3 (Akteure) voraus; reine Konzepte haben keine handelnden Personen.
Resultat: Agent kann keine sinnvolle Aufteilung hervorbringen oder erzeugt künstliche Trennungen.

**Evidenz:**
- VERTRAG_PHASE_0-1_DIDAKTIK, §3, Z. 37-41 (Heuristiken H1-H7). Alle Beispiele sind chronologisch-narrativ (keine "Feudalismus" als Konzept erwähnt).
- Kein Thementyp-Check vor Heuristik-Anwendung. Input-Tabelle (Z. 20-27) hat keinen Parameter `thementyp`.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, K1, bestätigt: "Pipeline ist implizit auf Ereignisgeschichte (WK1) kalibriert."

**Massnahme:**
Thementyp-Klassifikation als Pflicht-Schritt vor Heuristik-Anwendung einführen:
```
**Schritt 0 (neu): Thementyp-Klassifikation**
Input `thema` klassifizieren:
- **Ereignisgeschichte:** Thema hat klare zeitliche Sequenz, benannte Akteure, kausale Verlaufslogik (z.B. Erste Weltkrieg, Französische Revolution).
  → Heuristiken H1-H7 anwenden (aktuell).
- **Konzeptgeschichte:** Thema ist ein Konzept/Struktur, das sich über Zeit hinweg entwickelt oder manifestiert (z.B. Feudalismus, Kapitalismus, Staendeordnung).
  → Adaptive Heuristiken: Nicht H1 (Chronologie), sondern H1' (Begriffliche Differenzierung: Ebenen, Dimensionen, Ausprägungen).
- **Kulturgeschichte:** Thema betrifft Lebenswelt, Mentalität, Alltag (z.B. Mittelalterliche Ikonographie, Antike Sklaverei).
  → Adaptive Heuristiken: H2-H4 unverändert; H5 durch kulturelle Praktiken ersetzen.

Ausgabe: `thementyp`, erkennet.
```

**Delta zu v1:** NEU (adressiert K1 aus Vorgänger-Befund)

---

### [RA2-F03] Fallback-Szenario für dünne Quellenlage (QI2) unterspecifiziert

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-2_INHALT
**Beschreibung:** QI2 (Quellen-Diversität) fordert "mindestens 2 verschiedene Artikel pro Mappe" — aber wenn für eine Mappe nur 1 Wikipedia-Artikel mit relevanten Fakten existiert (z.B. sehr spezialisierte Themen), gibt es keinen definierten Fallback. AGENT_INHALT kann die Mappe nicht bestanden, kann aber auch nicht iterieren (keine Alternative).

**Evidenz:**
- VERTRAG_PHASE_0-2_INHALT, §5, Z. 98: "QI2: Mindestens 2 verschiedene Artikel pro Mappe."
- Kein Fallback-Absatz bei QI2-Scheitern.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-C2, nennt das Problem: "Agent bleibt in Endlosschleife oder liefert FAIL ohne Handlungsanweisung."

**Massnahme:**
Fallback in VERTRAG_PHASE_0-2_INHALT §5 (Q-Gate-Absatz) ergänzen:
```
**Fallback bei QI2-Scheitern (Dünne Quellenlage):**
Wenn für eine Mappe N nach systematischer Wikipedia-Recherche maximal 1 Artikel mit relevanten Fakten vorhanden ist:
1. AGENT_INHALT dokumentiert die Situation: "QI2-WARNUNG: Mappe N hat nur 1 Quellen-Artikel. QI2 nicht erfüllbar."
2. Vorschlag an User: Mappe N mit Mappe N+1 oder N-1 zusammenlegen (Merge) → reduzierte mappen_anzahl.
3. Bedingte Progression: Mit User-OK zum Merge kann Phase 0.3 starten mit reduzierter mappen_anzahl.
4. Max. 1 Merge pro Game. Falls >1 Mappe betroffen: Thema-Ablehnung (zu dünn besetzt).
```

**Delta zu v1:** NEU (adressiert QA-C2 aus Vorgänger-Befund)

---

### [RA2-F04] Messbarkeit von QI3 (Fakten-Vollständigkeit) unzureichend

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-2_INHALT
**Beschreibung:** QI3 fordert "≥8 Fakten pro Mappe, ≥2 Akteure, ≥4 Fachbegriffe, ≥1 Zitat, ≥1 Rollenprofil" — aber besonders für "Akteure" und "Zitate" ist nicht klar, was gilt als Akteur/Zitat. Bei abstrakten Themen (Feudalismus) gibt es keine oder wenige "benannte Personen", sondern Gruppen/Institutionen. Ein Agent kann hier falsch positiv markieren ("König als Akteur" → aber nur generisch erwähnt, nicht mit Biografie).

**Evidenz:**
- VERTRAG_PHASE_0-2_INHALT, §5, Z. 99: "QI3: ...≥2 Akteure [mit Kurzbiographie und Wikipedia-Beleg]."
- "Kurzbiographie" ist nicht formal definiert (Mindest-Wortanzahl? Handlungs-Details?).
- Keine Unterscheidung zwischen "benannter Akteur" vs. "Gruppe/Institution" vs. "abstrakte Rolle".
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-H2, adressiert ähnliches: "≥2 Akteure...sind für konzeptuelle Themen schwer bis unmöglich aus Wikipedia zu extrahieren."

**Massnahme:**
QI3 in VERTRAG_PHASE_0-2_INHALT §5 präzisieren:
```
**QI3-Spezifikation (überarbeitete Version):**
- **Akteure:** Thementyp-abhängig (s. DIDAKTIK §0, Thementyp-Klassifikation):
  - Ereignisgeschichte: ≥2 benannte Personen mit Handlung im Thema + Wikipedia-Artikel.
  - Konzeptgeschichte: ≥1 benannte Person ODER ≥1 Institution/Gruppe mit Rolle (z.B. "Der Papst als geistliche Autorität"). Definition: Perspektivträger — wer verkörpert oder repräsentiert das Konzept?
  - Kulturgeschichte: ≥2 Perspektivträger (Person, Gruppe, oder Artefakt-Träger, z.B. eine Handwerks-Zunft).
- **Kurzbiographie:** Mindestens 1-2 Sätze mit Relevanz zum Thema + Wikipedia-Quelle.
- **Zitate:** Thementyp-abhängig:
  - Ereignisgeschichte: ≥1 Originalzitat (Quelle, Redner, Kontext, Wikipedia-Beleg).
  - Konzeptgeschichte: Optional (ersetzen durch Fachbegriff-Definition, wenn keine aussagekräftigen Zitate).
  - Kulturgeschichte: ≥1 Zitat (primär oder sekundär, Wikipedia-belegt).
```

**Delta zu v1:** VERSCHÄRFT (adressiert QA-H2)

---

### [RA2-F05] QI4 (DIDAKTIK-Rahmen-Abdeckung) nicht operationalisiert

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-2_INHALT
**Beschreibung:** QI4 fordert "jede KE aus der KE-Matrix des DIDAKTIK_RAHMEN hat mindestens 3 stützende Fakten" — aber die Zuordnung einer Fakt zu einer KE ist semantisch und nicht maschinell objektiv prüfbar. Ein Agent kann hier über- oder unterschätzen.

**Evidenz:**
- VERTRAG_PHASE_0-2_INHALT, §5, Z. 100: "QI4: Jede KE...hat mindestens 3 stützende Fakten in der INHALTSBASIS."
- Darunter steht zwar "Pflicht-Output pro Mappe: Eine KE-Abdeckungszeile: `KE-Abdeckung: [KE-ID] gestützt durch [Fakt-1, Fakt-2, Fakt-3+]`" — aber dieses Format ist nur im Vertragstext erwähnt, nicht operationalisiert (wann wird diese Zeile erzeugt? nur im Output oder auch als Checkpoint?).
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-H6, bestätigt: "Agent-Self-Check ist unzuverlässig bei Grenzfällen."

**Massnahme:**
QI4-Prüfung als expliziter Iterationsschritt in AGENT_INHALT ergänzen:
```
**QI4-Checkpoint (neu): KE-Abdeckungs-Nachweis**
Nach Faktenensammlung pro Mappe:
1. Für jede KE aus dem Mappen-Schwerpunkt (laut DIDAKTIK_RAHMEN):
   - Manuell 3+ Fakten aus der INHALTSBASIS zuordnen (oder neu recherchieren).
   - Output-Zeile erzeugen: `KE-[ID]: [Wortlaut aus DIDAKTIK] | Gestützt durch [Fakt-X], [Fakt-Y], [Fakt-Z]`.
2. Resultat: KE-Abdeckungs-Tabelle pro Mappe (Sektion: "KE-Abdeckung").
3. Q-Gate QI4: Tabelle ist Prüfkriterium (alle KEs vertreten oder explizit als "reserviert für Folge-Game" markiert).
```

**Delta zu v1:** BESTÄNDIGT (wurde in v1.1 teilweise erwähnt, aber nicht operationalisiert als iterativer Checkpoint)

---

### [RA2-F06] Fallback-Szenario für nicht-teilbare Themen unterspecifiziert

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-1_DIDAKTIK
**Beschreibung:** User gibt `mappen_anzahl` vor (3-6). AGENT_DIDAKTIK wendet H1-H7 an. Aber manche Themen (z.B. "Die Pest", "Pompeji", "Die Französische Revolution 1789") haben eine Kern-Narration, die sich nicht sinnvoll in 4+ Mappen auteilen lässt, ohne Redundanz oder künstliche Trennung. Kein Fallback, um `mappen_anzahl` zu reduzieren.

**Evidenz:**
- VERTRAG_PHASE_0-1_DIDAKTIK, §2, Z. 24: `mappen_anzahl: User (3-6)` — User gibt vor.
- H1-H7 sind Heuristiken, die versuchen, diese Zahl zu realisieren, aber es gibt keine Regel "Wenn H1-H7 keine sinnvolle Aufteilung bei gegebener mappen_anzahl ergeben → Fallback."
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-H5, nennt das: "Kein Fallback für mappen_anzahl-Reduktion durch Agent."

**Massnahme:**
Fallback-Klausel in VERTRAG_PHASE_0-1_DIDAKTIK §3 ergänzen:
```
**Fallback bei nicht-teilbaren Themen:**
Wenn nach Anwendung von H1-H7 AGENT_DIDAKTIK erkennt, dass keine sinnvolle, nicht-redundante Aufteilung in die User-geforderte `mappen_anzahl` möglich ist:
1. AGENT_DIDAKTIK dokumentiert: "[TEILUNGS-VORSCHLAG] Thema [Name] lässt sich sinnvoll nur in N < mappen_anzahl Mappen auteilen, weil [Begründung]."
   Beispiel: "Pompeji: Zentrale Narration (Vulkanausbruch + Konsequenzen) + Archäologie als Meta-Ebene = 2 natürliche Einheiten. mappen_anzahl=4 würde zu Redundanz führen."
2. Vorschlag an User: (a) mappen_anzahl anpassen, (b) Thema akzeptieren wie angeboten, (c) Thema ablehnen.
3. Mit User-OK: Zu Phase 0.2 mit angepasster oder bestätigter mappen_anzahl.
```

**Delta zu v1:** NEU (adressiert QA-H5)

---

### [RA2-F07] Messbarkeit von SK1 (Vergegenwaertigung) für abstrakte Themen unzureichend

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-3_SKRIPT
**Beschreibung:** GUETEKRITERIEN_SKRIPT.md definiert SK1 (Vergegenwaertigung) als "Rückversetzung in die historische Situation" — das ist ein fachdidaktisches Kriterium, das für Ereignisgeschichte funktioniert, aber nicht für Konzeptgeschichte (z.B. "Feudalismus", "Kapitalismus"). Bei abstrakten Konzepten gibt es keine "Situation" zu vergegenwärtigen. Ein Agent wird hier automatisch FAIL vergeben, obwohl das Skript fachdidaktisch hochwertig sein kann.

**Evidenz:**
- VERTRAG_PHASE_0-3_SKRIPT, §5.2, Z. 121: "SK1-SK7 (Vergegenwärtigung, Elementarisierung, Anschaulichkeit, Strukturiertheit, Sprachliche Angemessenheit, Phasenfolge, Multikausalität) | BLOCKER".
- Kein Verweis auf GUETEKRITERIEN_SKRIPT.md, das SK1 definiert — aber diese Definition ist thementyp-invariant.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-H3: "SK1 fordert...bei abstrakten Konzepten gibt es keine situative Verankerung."

**Massnahme:**
Thementyp-abhängige Interpretation von SK1 in GUETEKRITERIEN_SKRIPT.md (falls nicht bereits dort) oder in SKRIPT-Vertrag §5.2 ergänzen:
```
**SK1 thementyp-bedingt interpretieren:**
- Ereignisgeschichte: Klassische Vergegenwärtigung (Rollenperspektive, situative Einfühlung).
- Konzeptgeschichte: Vergegenwärtigung = Konkretisierung an historischem Fallbeispiel. 
  Prüfkriterium: Der Text zeigt das Konzept an mindestens einem konkreten historischen Beispiel, nicht abstrakt.
- Kulturgeschichte: Vergegenwärtigung = Lebenswelt-Rekonstruktion (wie war der Alltag? Was waren die Praktiken?).

Bei Bewertung: Prüfen, ob der entsprechende Modus erfüllt ist.
```

**Delta zu v1:** VERSCHÄRFT (adressiert QA-H3)

---

### [RA2-F08] Rücklauf-Pfade ohne Abbruchbedingungen

**Severity:** HIGH
**Betroffene Verträge:** VERTRAG_PHASE_0-3_SKRIPT
**Beschreibung:** SKRIPT-Vertrag, Z. 142, definiert ein "Rücklauf-Szenario": "Wenn User-Validierung oder AGENT_HEFTEINTRAG ein strukturelles Problem im SKRIPT aufdeckt... → Rücklauf zu AGENT_SKRIPT." Es gibt zwar eine Limitation ("Max. 1 Iteration pro Chunk"), aber keine Exit-Bedingung ("Wenn nach 1 Iteration nicht lösbar → Eskalation zu...?"). Resultat: Prozess könnte in einer Rücklauf-Schleife stecken bleiben.

**Evidenz:**
- VERTRAG_PHASE_0-3_SKRIPT, §5.2, Z. 142: "Max. 1 Iteration pro Chunk. Wenn nach Iteration nicht lösbar: Finding dokumentieren + User-Entscheidung (ggf. Rücklauf bis AGENT_DIDAKTIK, wenn das Mappen-Zuschnitt-Problem ist)."
- "ggf." und "wenn" sind konditional, nicht operationalisiert (wer entscheidet? User oder Agent?).
- Kein Timeout oder Iteration-Counter in diesem Absatz.

**Massnahme:**
Rücklauf-Pfad mit Exit-Bedingungen operationalisieren:
```
**Rücklauf-Szenario mit Abbruchbedingungen (überarbeitete §5.2-Ergänzung):**

Wenn User-Validierung oder AGENT_HEFTEINTRAG (Phase 0.4) ein strukturelles Problem aufdeckt:

1. **Fehler-Typ identifizieren:**
   - **Chunk-Struktur:** Chunk lässt sich nicht sequenzieren (QS7-Fehler) oder SCPL-Ableitbarkeit fehlbar (QS8-Fehler).
     → Rücklauf zu AGENT_SKRIPT mit Hinweis: "[TB-REVISION NOETIG] Chunk N nicht sequenzierbar, weil [Grund]."
   - **Inhaltliche Lücke:** Nicht alle INHALTSBASIS-Artefakte sind prozessiert.
     → Rücklauf zu AGENT_INHALT.
   - **Mappen-Zuschnitt:** Chunk ist thematisch unvollständig oder zwei Mappen gehören zusammen.
     → Eskalation zu AGENT_DIDAKTIK (nicht Rücklauf zu SKRIPT).

2. **Iteration durchführen:**
   - Agent macht 1 Überarbeitung (max. 2h).
   - Prüfung gegen originales Problem (ist es gelöst?).

3. **Abbruch & Eskalation:**
   - **Wenn gelöst nach 1 Iteration:** Gate erneut prüfen, zu nächster Phase.
   - **Wenn nicht gelöst nach 1 Iteration:** [STRUCTURE-REVISION REQUIRED] dokumentieren.
     Eskalation an User + Lehrkraft: "Chunk N konnte nicht repariert werden. Optionen: (1) Mappen-Merge, (2) mappen_anzahl reduzieren, (3) Thema anpassen."
     Prozess stoppt bis User-Entscheidung.

4. **Max. Iterationen pro Phase:**
   - AGENT_SKRIPT: Max. 1 Iteration pro Phase 0.3 über alle Chunks.
   - AGENT_HEFTEINTRAG: Max. 1 Iteration pro Mappe.
   - Wenn Summe > 2 Iterationen über alle Phasen 0-1-2: Eskalation zu PM.
```

**Delta zu v1:** VERSCHÄRFT (konkretisiert nur Absatz-Hinweis aus v1.1)

---

### [RA2-F09] QS8 (SCPL-Ableitbarkeit) nicht operationalisiert

**Severity:** MEDIUM
**Betroffene Verträge:** VERTRAG_PHASE_0-3_SKRIPT
**Beschreibung:** QS8 fordert, dass "Tafelbild-Entwurf pro Chunk... als Grundlage für Phase-0.4-AGENT_HEFTEINTRAG dienen [kann]" — aber was genau muss der Tafelbild-Entwurf enthalten, damit AGENT_HEFTEINTRAG einen SCPL daraus ableiten kann? "Kernbegriffe, Ordnungsmuster-Hinweis, Verbindungsstruktur" sind erwähnt, aber nicht präzise.

**Evidenz:**
- VERTRAG_PHASE_0-3_SKRIPT, §5.3, Z. 136: "QS8: Tafelbild-Entwurf pro Chunk muss... Kernbegriffe, Ordnungsmuster-Hinweis und Verbindungsstruktur muessen erkennbar sein."
- VERTRAG_PHASE_0-3_SKRIPT, §3.2, Z. 55: "Tafelbild-Entwurf: Knoten (ID, Text, Typ, Skript-Ref) + Verbindungen (Von→Nach, Label) + Voraussetzungen."
- Aber kein Mapping "Knoten → SCPL-Zone" oder "Verbindung → Complication".
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-H7, nennt das: "Kein formales Mapping SKRIPT-Tafelbild → HEFTEINTRAG-SCPL."

**Massnahme:**
QS8 präzisieren mit konkreten Ableitungs-Kriterien:
```
**QS8 (überarbeitete Spezifikation):**
Der Tafelbild-Entwurf pro Chunk muss folgende Elemente enthalten, um eine SCPL-Struktur ableitbar zu machen:

1. **Mindestens 1 Knoten = Kernbegriff:** Ein Konzept/Ereignis, das als zentrale Lösungsidee (scpl.loesung) dienen kann.
   - Format: Knoten mit Type="Concept" oder "Event", erkennbar als Kernaussage.

2. **Ordnungsmuster-Hinweis:** Explizit benannt oder implizit in der Verbindungsstruktur erkennbar.
   - z.B. "Ordnungsmuster: kausal" → Verbindungen sind Ursache-Folge-Pfeile.
   - z.B. "Ordnungsmuster: chronologisch" → Verbindungen sind zeitliche Sequenzen.

3. **Mindestens 1 kausale/chronologische/kategoriale Verbindung:** Die später als Complication-Schritt fungiert.
   - Format: Verbindung mit Label (z.B. "führt zu", "folgt aus", "Aspekt von").

4. **Optional: Problemformulierung:** Ein Knoten oder eine Verbindung, die die zentrale Frage/das Dilemma andeutet.
   - z.B. Knoten "Konflikt: Krone vs. Adel" → wird zu Complication[0].

Prüfkriterium: AGENT_HEFTEINTRAG kann von diesem Entwurf einen SCPL mit ≥1 Situation, ≥1 Complication, ≥1 Loesung ableiten.
```

**Delta zu v1:** VERSCHÄRFT (konkretisiert nur QS8-Hinweis aus v1.1)

---

### [RA2-F10] HEFTEINTRAG-Messbarkeit: G1-G14 erfordern starkes menschliches Urteil

**Severity:** MEDIUM
**Betroffene Verträge:** VERTRAG_PHASE_0-4_HEFTEINTRAG
**Beschreibung:** HEFTEINTRAG-Vertrag referenziert GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md (G1-G14) als SOLL/KANN-Kriterien. Viele dieser Kriterien sind nicht binär prüfbar: G2 (Strukturiertheit), G4 (Visualisierbarkeit), G7 (Ästhetik-Potential), G13 (Multiperspektivität-Ansatz). Ein Agent wird hier verlässlich FAIL geben, auch wenn Lehrkraft PASS sagt. Oder umgekehrt.

**Evidenz:**
- VERTRAG_PHASE_0-4_HEFTEINTRAG, §6, Z. 138-141: Kategorisierung in MUSS/SOLL/KANN.
- MUSS-Kriterien sind teils operationalisiert (G1 "Reduktion ≤10 Elemente"), teils nicht (G14 "SCPL-Kohärenz" — wie misst man das?).
- Kein Verweis auf ein Scoring-System oder Rubrik.
- BEFUND_PHASE_0_QUALITAETS_AUDIT.md, QA-M3, ähnlich: "[Qualitätsunterschiede sind nicht erfasst]."

**Massnahme:**
In HEFTEINTRAG-Vertrag §6 Clarity-Sektion ergänzen:
```
**Messbarkeit von G1-G14:**

| Kriterium | Messbar | Methode |
|-----------|---------|---------|
| G1 (Reduktion) | ✓ Binär | Zählen der SCPL-Elemente: max. 10 |
| G2 (Strukturiertheit) | ✗ Urteil | User-Validierung erforderlich |
| G3 (Erarbeitbarkeit) | ~ Hybrid | Agent prüft DIRECT/ARTIFACT/INFERENTIAL; User validiert in Phase 1.5 gegen echte Materialien |
| G4 (Visualisierbarkeit) | ✗ Urteil | User-Validierung erforderlich |
| G5 (Artefakt-Integration) | ~ Hybrid | Agent zählt referenzierte Artefakte; User validiert didaktische Passung |
| G6 (Merksatz) | ✓ Binär | Enthalten und < 15 W pro Satz |
| G7 (Ästhetik) | ✗ Urteil | User-Validierung erforderlich |
| G8 (Sprachregister R7) | ~ Hybrid | Agent prüft Satzlänge, Fachbegriffe; User validiert Register |
| G9 (Progression) | ~ Hybrid | Agent prüft gegen Vorgänger-TAFELBILD; User validiert Lernprogression |
| G10 (Fachbegriffe) | ✓ Binär | Alle im Hefteintrag verwendeten Begriffe sind gelistet und erklärt |
| G11 (Keine Überladung) | ✓ Binär | SCPL-Text ≤ 120 W |
| G12 (Lehrplan-Referenzierbarkeit) | ~ Hybrid | Agent prüft Konsistenz mit DIDAKTIK_RAHMEN; User validiert Lehrplanbezug |
| G13 (Multiperspektivität) | ✗ Urteil | User-Validierung erforderlich |
| G14 (SCPL-Kohärenz) | ~ Hybrid | Agent prüft Schema-Validität; User validiert inhaltliche Kohärenz |

**Gate-Praxis:** Agent prüft alle ✓-Kriterien binär. Bei ~ -Kriterien: Agent gibt GRÜN/GELB/ROT, User entscheidet. Bei ✗-Kriterien: Agent skipped, User-Input erforderlich.
```

**Delta zu v1:** NEU (Clarity für automatische vs. manuelle Prüfung)

---

### [RA2-F11] Sequenzielle Abhängigkeiten und Deadlock-Risiken

**Severity:** MEDIUM
**Betroffene Verträge:** Alle 4 Verträge (Querschnitt)
**Beschreibung:** Die Phase-0-Kette ist sequenziell: DIDAKTIK (0.1) → INHALT (0.2) → SKRIPT (0.3) → HEFTEINTRAG (0.4). Wenn DIDAKTIK scheitert (z.B. H1-H7 können keine sinnvolle Aufteilung erzeugen), können die nachfolgenden Phasen nicht starten. Es gibt zwar Rücklauf-Pfade (0.4 → 0.3 → 0.1), aber diese sind nicht mit Timeout oder Eskalations-Bedingungen versehen. Prozess könnte in einer Endlosschleife stecken bleiben, wenn User nicht explizit eingreift.

**Evidenz:**
- VERTRAG_PHASE_0-1_DIDAKTIK, §4: "Gate-Urteil: ...Sonst: Nachbesserung." — keine Definition, wer entscheidet, wenn Nachbesserung nicht möglich ist.
- VERTRAG_PHASE_0-3_SKRIPT, §5.2, Z. 142: "Wenn nach Iteration nicht lösbar: Finding dokumentieren + User-Entscheidung" — aber "User-Entscheidung" ist nicht operationalisiert (User antwortet wann? wie?).
- Kein globales Timeout oder Iteration-Counter über alle Phasen.

**Massnahme:**
Workflow-Kontrollfluss als Ergänzung zum ORCHESTRATOR.md definieren (nicht nur in Einzelverträgen):
```
**Deadlock-Prevention-Rules (neu in WORKFLOW_v4.1 oder separates Dokument):**

1. **Timeout pro Phase:**
   - Phase 0.1 (DIDAKTIK): 3h Standard-Arbeit + 2h User-Konsultation. Wenn danach nicht PASS: Eskalation.
   - Phase 0.2 (INHALT): 4h Recherche. Wenn QI2/QI3 nicht erfüllbar: Fallback-Aktivierung (siehe F03, F04).
   - Phase 0.3 (SKRIPT): 4h Skript-Produktion + 1h User-Review. Max. 1 Iteration (2h). Danach: Eskalation.
   - Phase 0.4 (HEFTEINTRAG): 2h HEFTEINTRAG-Produktion. Max. 1 Iteration (2h). Danach: Eskalation.
   
   **Gesamtbudget: Max. 16h vom Thema-Input bis PASS.**

2. **Eskalation-Trigger:**
   - DIDAKTIK: Nach 5h ohne PASS → User-Entscheidung: (1) mappen_anzahl anpassen, (2) Thema-Scope reduzieren, (3) Thema ablehnen.
   - INHALT: QI2/QI3-Fehler nach 1 Iteration → Fallback (Mappe-Merge).
   - SKRIPT: Nach Iteration + User-Review nicht PASS → "STRUKTUR-REVISION NOETIG" dokumentieren + Eskalation zu DIDAKTIK oder PM.
   - HEFTEINTRAG: Nach Iteration nicht PASS → User-Entscheidung + PM-Benachrichtigung.

3. **Rücklauf-Limits:**
   - 0.4 → 0.3: Max. 1 Rücklauf pro Phase 0.3-Iteration.
   - 0.3 → 0.2: Max. 1 Rücklauf pro Phase 0.2-Iteration.
   - 0.2 → 0.1 oder 0.1 → User: Eskalation (nicht Rücklauf).
   - Summe Rückläufe über alle Phasen: Max. 2.

4. **Erfolgs-Kriterium für Weiterleitung:**
   - 0.1 → 0.2: DIDAKTIK PASS (alle BLOCKER, ≤1 HIGH).
   - 0.2 → 0.3: INHALT PASS (alle BLOCKER, ≤1 HIGH), oder INHALT mit [QI2-WARNUNG] + Fallback aktiv.
   - 0.3 → 0.4: SKRIPT PASS (alle BLOCKER).
   - 0.4 → Phase 1: HEFTEINTRAG PASS (alle BLOCKER).
```

**Delta zu v1:** NEU (konzeptionelle Ergänzung, nicht nur in einzelnen Verträgen)

---

### [RA2-F12] Nachgelagerte Artefakt-Propagation nicht vertraglich abgesichert

**Severity:** MEDIUM
**Betroffene Verträge:** Alle 4 Verträge (Querschnitt)
**Beschreibung:** Phase-0-Artefakte (DIDAKTIK_RAHMEN, INHALTSBASIS, SKRIPT, TAFELBILD) definieren IDs für Unterobjekte (Zitate zit-X-Y, Rollenprofile rolle-X-Y, Artefakte img-X-Y). Diese werden im SKRIPT durch [ARTEFAKT]-Marker referenziert. Aber der Weg von SKRIPT-Marker → Phase-1-MATERIAL → Phase-2-data.json ist nicht vertraglich spezifiziert. Fehlerquelle: Ein Rollenprofil rolle-2-3 wird im SKRIPT referenziert, aber Phase 1 ignoriert es oder referenziert es falsch.

**Evidenz:**
- VERTRAG_PHASE_0-2_INHALT, §3.3, Z. 87-89: "ID-Konventionen: Artefakt-IDs: `img-[mappe]-[laufnummer]` ... Rollenprofil-IDs: `rolle-[mappe]-[laufnummer]`".
- VERTRAG_PHASE_0-3_SKRIPT, §3.3, Z. 60-67: Artefakt-Marker-Syntax und Pflicht "Jedes Artefakt aus der INHALTSBASIS (img, zit, rolle) muss mindestens einmal referenziert werden."
- Aber kein Vertrag für Phase 1 oder Phase 2 definiert, wie diese IDs weiterverarbeitet werden. (Phase-1-Verträge fehlen noch.)

**Massnahme:**
In WORKFLOW_v4.1 oder separatem Propagations-Dokument definieren:
```
**Artefakt-Propagations-Pflicht (zu schreiben: PHASE_1_MATERIAL_ARTEFAKT_INTERFACE.md):**

Schnittstelle zwischen Phase 0 (Artefakt-Definition) und Phase 1+ (Artefakt-Verwendung):

1. **Artefakt-Manifest generieren (Phase 0.4-Output):**
   - Pro Game: Datei `ARTEFAKT_INVENTAR_[game-id].json` generieren.
   - Struktur:
     ```json
     {
       "img": [
         {"id": "img-1-1", "mappe": 1, "typ": "foto", "quelle": "...", "status": "QUALIFIZIERT"},
         ...
       ],
       "zit": [
         {"id": "zit-2-1", "mappe": 2, "sprecher": "...", "status": "QUALIFIZIERT"},
         ...
       ],
       "rolle": [
         {"id": "rolle-1-2", "mappe": 1, "name": "...", "status": "QUALIFIZIERT"},
         ...
       ]
     }
     ```

2. **Phase-1 Constraint:** Alle Materialien müssen ausschließlich Artefakte mit status="QUALIFIZIERT" verwenden. ID muss aus diesem Manifest stammen.

3. **Phase-2 Mapping:** Jeder SCPL-Schritt (Situation, Complication, Loesung) wird in Phase 2 auf ein oder mehrere Materialien gemappt. Für jeden Schritt: Welche Artefakte helfen bei der Erarbeitung? Referenz via img/zit/rolle-ID.

4. **Validierungsprüfung:** Phase 2 muss prüfen: "Alle Artefakte im ARTEFAKT_INVENTAR sind in Phase-1-Materialien verwendet oder explizit als 'Reserve' markiert."
```

**Delta zu v1:** NEU (prozessuale Absicherung der Propagation)

---

## Severity-Verteilung

| Severity | Anzahl | Beispiele |
|----------|--------|----------|
| CRITICAL | 2 | RA2-F01 (Keine Eskalationspfade bei DIDAKTIK-Scheitern), RA2-F02 (H1-H7 nicht robust) |
| HIGH | 6 | RA2-F03 bis F09 |
| MEDIUM | 4 | RA2-F10, F11, F12 + weitere (kombiniert) |
| **GESAMT** | **12** | |

---

## Top-3-Empfehlungen (Priorisiert)

### 1. Thementyp-Klassifikation als Pflicht-Schritt (RA2-F02)
**Grund:** Heuristiken H1-H7 sind fundamental auf Ereignisgeschichte optimiert. Ohne Thementyp-Check funktionieren sie für ~30-40% der möglichen GPG-Themen nicht (Konzeptgeschichte, Kulturgeschichte). Dies ist das Dach-Problem für F03, F04, F07 und blockiert Generalisierung der Pipeline.

**Aktion:** 
- AGENT_DIDAKTIK §0 (Neuer Schritt vor §2 Input): "Klassifiziere `thema` als Ereignisgeschichte | Konzeptgeschichte | Kulturgeschichte."
- Heuristiken H1-H7 um Thementyp-Varianten erweitern (H1 → H1/H1', etc.).
- Schwellenwerte in INHALT und SKRIPT thementyp-adaptiv machen.

**Aufwand:** Mittel (ca. 2-3h Redesign)

---

### 2. Eskalationspfade mit Abbruchbedingungen (RA2-F01, F08)
**Grund:** Prozess kann in Endlosschleife oder Wartezustand stecken bleiben, wenn kein klarer Exit-Pfad existiert. Dies ist nicht technisch blockierend (Pipeline läuft weiter), aber operativ chaotisch.

**Aktion:**
- Jeden Q-Gate-Fehler in Verträgen mit konkretem Fallback/Eskalations-Pfad versehen.
- Globales Timeout-Budget (16h vom Input bis Phase-0-PASS) in WORKFLOW_v4.1 einführen.
- Rücklauf-Limits und Iteration-Counter definieren.

**Aufwand:** Klein (ca. 1h pro Vertrag, Scoping + Dokumentation)

---

### 3. Messbarkeit-Rubrik für G1-G14 und SK1-SK17 (RA2-F10, RA2-F07)
**Grund:** Qualitätskriterien sind literarisch formuliert, aber nicht klar, ob Agent oder User prüft, und wie Grenzfälle gehandhabt werden. Dies führt zu Inkonsistenzen in der Q-Gate-Anwendung.

**Aktion:**
- Tabelle pro Kriterium: Messbar (Binär/Hybrid/Urteil) + Methode (Agent/User/Hybrid).
- Thementyp-abhängige Interpretation (SK1 für Konzeptgeschichte ≠ Ereignisgeschichte).
- [WARN]-Zone vs. [FAIL]-Zone definieren (z.B. 540-600W Chunk = WARN, <540W = FAIL).

**Aufwand:** Mittel (ca. 3-4h für Rubrik + Integration in Guetekriterien)

---

## Fazit

Die Phase-0-Verträge haben solide Struktur und Q-Gate-Konzept, aber signifikante Robustheit-Lücken:
1. **Heuristiken sind nicht adaptiv** → Thementyp-Klassifikation ergänzen.
2. **Eskalationspfade sind implizit** → Explizit operationalisieren mit Timeouts + Exit-Bedingungen.
3. **Fallback-Szenarien sind unterspecifiziert** → Konkrete Fallbacks (Mappe-Merge, mappen_anzahl-Reduktion, Thema-Ablehnung).
4. **Messbarkeit ist uneven** → Rubrik einführen (Agent vs. User vs. Hybrid).

**Blockierend für Generalisierung:** RA2-F02 (Thementyp-Klassifikation). Alle anderen sind Optimierungen, die iterativ adressierbar sind.

