# Bericht RA-B: Operationalisierbarkeit (Welle-1-Patches)

**Datum:** 2026-04-07
**Scope:** Neue Kriterien aus Welle-1 (SK18, Complication.typ, Eskalationspfade, H1/H5, QI-RC1)
**Agent:** RA-B (Review-Agent Operationalisierbarkeit)
**Audit-Status:** ABGESCHLOSSEN

---

## 1. Executive Summary

Die Welle-1-Patches fuehren neue Qualitaetskriterien ein, die teils **binaer pruefbar** sind (SK18, Complication.typ), teils aber **erhebliche subjektive Urteilsräume offenlassen** (H1 "Natuerliche Ordnungsschnitte", H5 "Konkreter Anker", "Erarbeitbarkeit DIRECT/ARTIFACT/INFERENTIAL"). Ohne zusätzliche Operationalisierungs-Richtlinien wird es zu Inkonsistenzen zwischen Agenten und zu Audit-Streitigkeiten kommen.

**Gate-Urteil:** GELB (mit kritischen Empfehlungen)

---

## 2. Findings

| ID | Severity | Kriterium | Status | Beschreibung | Empfehlung |
|---|---|---|---|---|---|
| RA-B-F01 | CRITICAL | SK18 Quellenorientierung: "Min. 1 Quellenbezug pro Chunk" | PARTIELL | Zaelbar aber unterdefniert. "Quellenbezug" kann narrativ verdichtet sein ("Historiker fanden...") oder als explizite Quellenanalyse. AGENT_SKRIPT prueft dies als Binaer (PASS/FAIL), aber es fehlt eine Operationalisierungs-Leitlinie fuer "explizit genug". Gefahr: Agent markiert Chunks mit implizitem Quellenbezug als PASS, Reviewer als FAIL. | Schreibe Operationalisierungs-Anleitung fuer SK18: Mindestanforderungen an Explizitheit (z.B. "Quellentyp muendlich erkennbar sein", "Entweder Quellenname ODER Quellentyp + Kontext nennen"). **Severity reduzieren auf HIGH.** |
| RA-B-F02 | CRITICAL | Complication[].typ Zuordnung (narrativ/konzeptuell/kontrastiv/kausal) | UNTERDEF | Schema schreibt enum vor, aber keine Zuweisungsanleitung. Grenzfaelle: Kann eine Complication zugleich "narrativ" (Wendepunkt) UND "kausal" (Ursache-Analyse) sein? Beispiel: "Die Arbeiter konnten sich nicht wehren (narrativer Wendepunkt) — weil die Arbeiterbewegung noch nicht organisiert war (kausal)." — Ist das narrativ oder kausal? Agent muss subjektiv waehlen. | Schreibe Typ-Zuweisungsmatrix in separates Dokument: Entscheidungsbaum ("Ist die Complication eine Szenen-Wendung? → narrativ. Antwortet sie auf eine Warum-Frage? → konzeptuell/kausal..."). Mit **mind. 5 Fallbeispielen pro Typ**. Severity: HIGH. |
| RA-B-F03 | CRITICAL | Eskalationspfade E-D1 bis E-D5: "Nach 1 Iteration nicht loesbar" (ausloeser fuer E-D3+) | VAGE | Wann genau ist "nicht loesbar"? Agent fuellt Luecke nach eigenem Ermessen. E-D3 beispiel: "Progressions-Anpassung — QD6 FAIL nicht-monoton". Wer entscheidet, ob Fallback legitim ist? Wie oft darf Agent iterieren? | Definiere in VERTRAG_PHASE_0-1 ausfuehrlich: "Nach Iteration nicht loesbar" = Agent hat 1 Verbesserungsversuch gemacht, Kriterium bleibt FAIL, Fallback ist einzige Optionen ohne Content-Reduktion. Nenne Maximal-Iterationen pro Gate (z.B. "E-D1 maximal 1x, dann User-Entscheidung"). Severity: HIGH. |
| RA-B-F04 | CRITICAL | "Didaktische Implikations-Pruefung" (Eskalation §4a) | UNTERSPEC | Was genau ist "Implikations-Pruefung"? Lesen: "Agent prueft: Veraendert der Fallback die Lernziele? Wenn ja: explizit dokumentieren." — zu vage fuer LLM. Beispiel: E-D1 Mappen-Rebalance verschiebt KE GPG_LB3_K_04 von M3 nach M4. Ist das eine "Lernziel-Aenderung"? Nur wenn M3-Teilziel sich aendert? Agent-Interpretationen werden divergieren. | Schreibe Pruef-Leitlinie mit Konkretisierung: "Implikations-Pruefung = Vergleich des DIDAKTIK_RAHMEN vor/nach Fallback auf: (1) Aenderung in Teilziel-Wortlaut? (2) Aenderung in KE-Hauptzuordnung? (3) Aenderung in Mappen-Titel?" Mit Fallbeispielen. Severity: CRITICAL. |
| RA-B-F05 | HIGH | Eskalationspfade E-H1 bis E-H3: Trigger praezise? | PARTIELL | E-H1 "SCPL-Zonen nicht aus SKRIPT ableitbar" — was ist "ableitbar"? Kann Agent nur wortgetreue Uebernahmen, oder auch Synthese? E-H2 "Kernerkenntnisse nicht im SKRIPT auffindbar" — wo sucht Agent? Nur im aktuellen Chunk oder global? Kontext-Toleranz-Schwelle nicht definiert. | Schreibe Operationalisierungs-Guide fuer SKRIPT-Auffindbarkeit: "DIRECT-Auffindbarkeit = Konzept wortgetreu oder paraphrasiert in max. 1 Absatz vorhanden. Ohne paraphrasierte Version = NICHT auffindbar." Mit Beispiel-Snippets. Severity: HIGH. |
| RA-B-F06 | HIGH | H1 "Natuerliche Ordnungsschnitte": Bei kategorialen Themen unklar | UNTERDEF | H1 sagt: "Bei chronologischen: zeitliche Zaesuren. Bei kategorialen: thematische Cluster." — Was ist ein "natuerlicher Schnitt" bei kategorialen Themen (z.B. Berufe, Schichten, Raumdimensionen)? Beispiel: Thema "Industrialisierung" (kategorial). Natuerliche Schnitte: Industrien (Textil, Kohle, Stahl)? Schichten (Unternehmertum, Arbeiter, Handwerk)? Raumdimensionen (Stadt, Land)? Agent fehlt Leitlinie. | Ergaenzen H1 mit Fallbeispielen fuer kategoriale Themen. Zeige fuer jeweils min. 3 kategoriale Kontexte, welche Schnitte "natuerlich" sind + warum. Severity: HIGH. |
| RA-B-F07 | CRITICAL | H5 "Konkreter Anker": Zu vage fuer operative Pruefung | UNTERSPEC | H5: "Jede Mappe sollte mindestens einen konkreten Ankerpunkt enthalten... Rein abstrakte Mappen ohne konkreten Anker sind zu abstrakt." — Was ist "konkret genug"? Reicht "Die Zeit der Aufklaerung"? Oder muss es "Kant veroeffentlicht 1781 die Kritik der reinen Vernunft"? Wer entscheidet die Grenze? Reviewer werden divergieren. | Schreibe Konkretierungs-Leitlinie mit Fallbeispielen: Nenne fuer konzeptuelle Themen (Recht, Ethik, Wissenschaft, Kultur) je 1 "FAIL-Beispiel zu abstrakt" + 1 "PASS-Beispiel konkret". Definiere: "Konkret = Namennenung (Person/Ort/Datum) ODER exemplarisches Fallbeispiel mit Min. 1 dieser Marker." Severity: CRITICAL. |
| RA-B-F08 | HIGH | QI-RC1 "Phase-2.0-Kompatibilitaet": Was ist "1:1 uebernehmbar"? | PARTIELL | Schema definiert Felder, aber "1:1 Uebernahme" heisst nicht automatisch "wird verstanden". Phase 2.0 liest JSON und interpretiert scpl.loesung[] als Merkbox-Inhalt. Aber wie? Mit welcher Granularitaet? Puffer fuer Formulierungs-Aenderungen? | Schreibe Phase-2.0-Kompatibilitaets-Vertrag: Nenne praezise, welche Teile des JSON literal uebernommen werden (scpl.loesung[]: wortgetreu?) vs. welche Teile Anker sind (scpl.situation: nur Struktur). Severity: MEDIUM. |
| RA-B-F09 | MEDIUM | Erarbeitbarkeits-Kategorisierung (DIRECT/ARTIFACT/INFERENTIAL) | SUBJEKTIV | QH5 fordert min. 70% DIRECT+ARTIFACT. Aber Kategorisierung ist stark subjektiv: Ist "Quellentextanalyse" DIRECT oder ARTIFACT? Haengt von Material-Design ab, das noch nicht definiert ist. Agent prueft Phase 0.4 ohne Phase-1-Material-Wissen. | Schreibe Kategorisierungs-Anleitung mit Phase-1-Anbindung: "DIRECT = Durch Text/Bilder/Quellen im Dossier unmittelbar erschliessbar. ARTIFACT = Durch Material-Manipulation (Vergleich, Analyse, Zuordnung) erschliessbar. INFERENTIAL = Nur durch Lehrerimpuls oder Diskussion erreichbar." Mit Beispiel-Szenarien (Quellenanalyse, Karte-Interpretation, Statistik-Auswertung). Severity: MEDIUM. |
| RA-B-F10 | MEDIUM | Eskalations-Log Dokumentation: Format undetailliert | PARTIELL | VERTRAG_PHASE_0-4 zeigt 1 Beispiel-Eintrag, aber: Wie ausfuehrlich muss "Massnahme" sein? Nur Kurzbeschreibung oder Begr"uendung notwendig? Wer prueft die Begruendung auf Stichhaltigkeit? | Standardisiere Eskalations-Log-Format in Sektion "Konventionen": "Mappe [N] → Massnahme [Kurzbeschreibung max. 1 Satz] | Q-Gate-Ergebnis [bestanden JA/NEIN]". Separator zwischen Log und Output klar kennzeichnen. Severity: LOW-MEDIUM. |
| RA-B-F11 | CRITICAL | QI-RC2 "Phase-1-Erarbeitbarkeit": Kann Agent fuer jede SCPL-Fase "mindestens ein Materialtyp" designen? | UNTERSPEC | QH5 sagt Erarbeitbarkeit muss <= 70% sein. QI-RC2 sagt "fuer jeden SCPL-Schritt ist mindestens ein Materialtyp denkbar". Aber "denkbar" ist ein Urteil ohne Operationalisierung. Agent im Gefuehl gut intuitiv, kann aber ohne Phase-1-Material-Katalog nicht zwingend garantieren, dass Designbarkeit gegeben ist. | Schreibe Material-Designbarkeits-Leitlinie: Nenne fuer alle 9 Ordnungsmuster x 4 Complication-Typen typische Materialtypen (Query, Bildanalyse, Quellenvergleich, Statistik-Auswertung etc.), die eine SCPL-Zone erschliessen koennten. Mit Fallbeispielen. Severity: CRITICAL. |
| RA-B-F12 | MEDIUM | H1/H5 Anwendung auf Grenzthemen (z.B. "reine Begriffsgeschichte") | GRENZFALL | Themen wie "Verfassungsrecht", "Wissenschaftsgeschichte", "Sprachgeschichte" sind weder rein chronologisch noch rein kategorial. H1-Heuristik sagt: "Bei kategorialen: Cluster". Aber Fallbeispiele in AGENT_DIDAKTIK.md zeigen nur Ereignis- und Strukturgeschichte. Neu: Wie wenden Agenten H1/H5 auf begriffsgeschichtliche Themen an? | Ergaenzen AGENT_DIDAKTIK.md (H1/H5) mit jeweils 1-2 Fallbeispielen aus "schwierig zu kategorisierender" Themen (z.B. "Geschichte der Kindheit", "Rechtsbegriff Eigentum"). Zeige, wie Agent die richtige Ordnungsdimension waehlt. Severity: MEDIUM. |

---

## 3. Severity-Verteilung

| Severity | Anzahl | Gewichtung |
|---|---|---|
| CRITICAL | 4 (F01, F04, F07, F11) | **40%** |
| HIGH | 4 (F02, F03, F05, F06) | **40%** |
| MEDIUM | 3 (F08, F09, F10) | **20%** |
| LOW | 0 | 0% |

**Gesamt-Risk:** Wenn kein Handeln: Zu viele offene Urteilsraeume → Agenten divergieren → Audit-Streitigkeiten → Qualitatsvarianz zwischen Games.

---

## 4. Detailanalyse nach Pruef-Dimensionen

### 4.1 SK18 Quellenorientierung

**Criterion:** "Pro Chunk mindestens 1 expliziter Quellenbezug"

**Operationalisierbarkeit: PARTIELL (YELLOW)**

- **Zaelbar?** JA — Word-Count auf "Quellen-Signale" pro Chunk ist technisch machbar.
- **PASS/FAIL-Patterns definiert?** UNZUREICHEND — Was zählt als "explizit"?
  - Tight: "Historiker fanden heraus, dass..." (nennt Quellenkategorie, aber nicht Quelle)
  - Loose: "Der Brief zeigt..." (nennt Quellentyp explizit)
  - Pattern-Variation führt zu Agent-Divergenz
- **LLM-Reliabilität?** MEDIUM — LLM kann Quellensignale erkennen, aber Explizitäts-Grenze ist subjektiv.

**Empfehlung:**
- Schreibe Operationalisierungs-Anhang: "SK18-PRUEFLEITLINIE_Quellenbezug.md"
- Nenne 5 Kategorien valider Quellenbezüge mit Minimalbeispiel + Maximalbeispiel pro Kategorie
- Severity für SK18 in dieser Form: **HIGH** (nicht CRITICAL, weil Struktur grundsätzlich prüfbar)

---

### 4.2 Complication[].typ Zuordnung

**Criterion:** "typ: narrativ | konzeptuell | kontrastiv | kausal"

**Operationalisierbarkeit: UNTERSPEC (RED)**

- **Zaelbar?** NEIN — Typzuordnung ist Klassifikationaufgabe, nicht Zählung
- **Grenzfälle evident?** JA — viele Complications erfüllen ≥2 Typen gleichzeitig
  - Beispiel: "Die Arbeiter verarmten, konnten sich aber nicht wehren" — narrativ (Wendepunkt: Verarmung + Ohnmacht) + konzeptuell (Warum war Wehrlosigkeit strukturell?)
  - Agent muss einen typ wählen → subjektive Priorisierung
- **Leitlinie vorhanden?** NEIN — Schema hat enum, keine Zuweisungsanleitung

**Empfehlung:**
- **Schreibe separate Datei: "GUETEKRITERIEN_HEFTEINTRAG_COMPLICATION_TYPEN.md"**
- Struktur:
  ```
  # Typ-Zuweisungsanleitung für Complication.typ

  ## narrativ
  - Defn: Complication ist Wendepunkt/Zäsur in der Ereignisfolge
  - Erkennungszeichen: Temporale/narrative Übergänge ("plötzlich", "damals", "später"), Konflikt-Zuspitzung
  - Fallbeispiel 1: "...und dann starb der König" → narrativ
  - Fallbeispiel 2: "...aber damit war der Konflikt nicht gelöst" → narrativ (Wendepunkt: Problem sichtbar wird)

  ## konzeptuell
  - Defn: Complication antwortet auf Warum-Frage zu Konzepten/Strukturen
  - Erkennungszeichen: Abstraktion, kategorialer Bruch, konzeptuelle Paradoxie
  - Fallbeispiel: "Aber wie konnte sich eine Bewegung ohne Organisation koordinieren?" → konzeptuell

  [... kontrastiv, kausal analog ...]

  ## Entscheidungsbaum bei Ambiguität
  - Ist die Complication PRIMÄR ein Szenen-Wendepunkt? → narrativ
  - Ist sie PRIMÄR eine Erklärung von Strukturen/Konzepten? → konzeptuell/kausal
  [...]
  ```
- Severity für complication.typ-Zuweisung: **CRITICAL** bis Guide existiert

---

### 4.3 Eskalationspfade E-D1 bis E-D5

**Criterion:** "Nach 1 Iteration nicht lösbar" + "Didaktische Implikations-Prüfung"

**Operationalisierbarkeit: VAGE (RED)**

**Probleme:**
1. "Nach 1 Iteration nicht lösbar" — keine Metrik für Lösbarkeit
   - Beispiel: QD5 FAIL "Mappe 3 überladen". Agent versucht Rebalance (E-D1). Neuer Versuch: Mappe 3 leicht kleiner, aber QD5 sagt immer noch "an der Grenze". Ist das "nicht lösbar"?
   - Fehler: keine Schwellenwert-Definition für "überladen"

2. "Didaktische Implikations-Prüfung" — zu vage
   - Text sagt: "Agent prueft: Veraendert der Fallback die Lernziele?"
   - Praktik: Was ist ein Lernziel-Wechsel? Ist Verschiebung einer KE ein Lernziel-Wechsel?
   - Beispiel: E-D1 verschiebt KE_Militarismus von M2 nach M3. M2-Teilziel war "...Krisenmanagement verstehen". Ist das ein Lernziel-Wechsel? Oder einfach eine KE-Reallokation?

3. **Maximal-Iterationen:** NICHT DEFINIERT
   - Wie oft darf Agent iterieren vor User-Eskalation?
   - Current: "max. 1 Iteration" ist im Gate-Urteil (§4, letzte Zeile) erwähnt, aber nicht für Fallbacks

**Empfehlung:**
- **Schreibe "OPERATIONALISIERUNG_ESKALATIONSPFADE.md"** mit:
  - Prüfmatrix: QD-Schwellenwerte konkretisieren (z.B. "QD5 FAIL = Mappen-Saldo-Diff > 30% zwischen größter/kleinster Mappe")
  - Iterationslimit definieren: "Nach max. 1 Verbesserungsversuch pro Gate: Fallback oder User-Entscheidung"
  - Implikations-Prüfung: Checkboxen-Format
    ```
    E-D1 Mappen-Rebalance:
    [✓] Werden KE-Hauptzuordnungen verschoben?
    [✗] Ändert sich Mappe-N-Titel?
    [✗] Ändert sich Teilziel-Wortlaut?
    → Lernziel-Folgen: KEINE
    ```
- Severity: **CRITICAL**

---

### 4.4 Eskalationspfade E-H1 bis E-H3

**Criterion:** "SCPL-Zonen nicht aus SKRIPT ableitbar"

**Operationalisierbarkeit: PARTIELL (YELLOW)**

- **E-H1 "nicht ableitbar":** Was zählt als "ableitbar"?
  - Wortgetreue Uebernahme? Paraphrase? Logische Schlussfolgerung?
  - Beispiel: SKRIPT sagt "Kaiser Wilhelm forderte Mitsprache in Marokko". SCPL braucht Complication "Warum war Mitsprache ein Problem?" — ist das aus SKRIPT "ableitbar"? (Nicht wortgetreu, aber impliziert)

- **Vorschlag:** "DIRECT-Ableitbarkeit" definieren (wie auch in QI-RC2 nötig):
  - DIRECT = Konzept findet sich paraphrasiert in max. 1 Absatz des SKRIPT-Chunks (Synthese-Extraktion, nicht Erfindung)
  - INFERENTIAL = Bedarf logische Schlussfolgerung über Chunk-Grenzen

- **E-H2/E-H3:** "Ruecklauf an AGENT_SKRIPT" — gut definiert, aber keine Rück-Verweis-Leitlinie.

**Empfehlung:**
- Definiere "Ableitbarkeit" analog zu **QI-RC2** mit Fallbeispielen
- Severity: **HIGH**

---

### 4.5 H1 "Natuerliche Ordnungsschnitte"

**Criterion:** "Bei chronologischen: zeitliche Zaesuren. Bei kategorialen: thematische Cluster"

**Operationalisierbarkeit: PARTIELL (YELLOW)**

**Stärke:**
- Chronologische Schnitte sind meist objektiv (Verträge, Kriege, Wahlen)

**Schwäche:** Kategoriale Themen:
- Was ist ein "thematisches Cluster" bei Thema "Industrialisierung"?
  - Industrien (Textil, Kohle, Stahl)?
  - Raumdimensionen (Stadt, Land, Fabrik)?
  - Schichten (Unternehmertum, Arbeiter, Mittelstand)?
  - Aspekte (Technologie, Gesellschaft, Umwelt)?
- Fallbeispiele in H1 sind zu knapp.

**Empfehlung:**
- Ergänzen H1 mit 3-5 kategorialen Fallbeispielen, die zeigen, WIE Agent die "natürliche" Clusterdimension auswählt
- Severity: **HIGH**

---

### 4.6 H5 "Konkreter Anker"

**Criterion:** "Jede Mappe sollte mindestens einen konkreten Ankerpunkt enthalten"

**Operationalisierbarkeit: UNTERSPEC (RED)**

- **"Konkret"** ist relativ:
  - "Die Zeit der Aufklaerung" — zu abstrakt?
  - "Das 18. Jahrhundert in Frankreich" — konkret genug?
  - "Kant in den 1770er Jahren" — konkret
  - "Der Streit um Empirismus vs. Rationalismus" — abstrakt oder konzeptuell konkret?

- **Fallbeispiele nur aus Ereignisgeschichte** (Datum, Person). Konzeptuelle/Begriffsgeschichte nicht abgedeckt.

- **H5-Text:** "Rein abstrakte Mappen ohne konkreten Anker sind zu abstrakt" — ist normativ, aber nicht operationalisierbar ohne Grenzwert.

**Empfehlung:**
- **Schreibe "KONKRETISIERUNGS_LEITLINIE_H5.md"** mit:
  - Vier-Quadranten-Matrix: Ereignis/Konzept × Raum/Zeit
    | | Raum | Zeit |
    |---|---|---|
    | **Ereignis** | Ort (Berlin 1848) | Datum (1789) |
    | **Konzept** | Fallbeispiel (Fabrik-Alltag) | Historisches Moment (Kant 1770er) |
  - Für jede Zelle: FAIL-Beispiel "zu abstrakt" + PASS-Beispiel "konkret genug"
  - Severity: **CRITICAL** (bis Definition existiert)

---

### 4.7 QI-RC1 "Phase-2.0-Kompatibilitaet"

**Criterion:** "JSON-Struktur 1:1 als hefteintrag.json uebernehmbar"

**Operationalisierbarkeit: PARTIELL (YELLOW)**

- **Positiv:** Schema ist formal definiert (SCHEMA_HEFTEINTRAG_JSON.md)
- **Problematisch:** "1:1 Übernahme" ist unklar:
  - Werden Formulierungen wortgetreu übernommen? (Wenn ja: Schrift-Qualität stark abhängig von Phase-0.4-Präzision)
  - Oder nur Struktur/Werte übernommen, Formulierungen in Phase 2.1c revidiert?
  - Puffer für scpl.situation-Formulierungen nicht definiert

**Empfehlung:**
- Schreibe Phase-2.0-Kompatibilitäts-Vertrag:
  - Felder LITERAL (wortgetreu): scpl.loesung[].kernerkenntnis
  - Felder STRUKTURELL (Wert, aber nicht Formulierung): scpl.complication[].typ, ordnungsmuster
  - Felder REVISIONSOFFENE (Ankerpunkte, später überarbeitet): scpl.situation.kontextsatz
- Severity: **MEDIUM**

---

### 4.8 Erarbeitbarkeits-Kategorisierung (DIRECT/ARTIFACT/INFERENTIAL)

**Criterion:** "Min. 70% DIRECT + ARTIFACT"

**Operationalisierbarkeit: SUBJEKTIV (YELLOW)**

**Problem:** Kategorisierung hängt vom Phase-1-Design ab, das noch nicht definiert ist.
- Beispiel: "Quellenanalyse" — Ist das DIRECT (Text wird gelesen) oder ARTIFACT (Quellentext wird analysiert)?
  - DIRECT-Ansicht: Text → Schüler liest → Bedeutung erschliessbar
  - ARTIFACT-Ansicht: Quellentext ist Material/Artefakt → wird analysiert/verglichen

**Lösungsansatz:** QH5-Definition erweitern mit Material-Szenarien:
```
DIRECT: Durch Lesen/Ansehen von Material unmittelbar erfassbar
- Textpassage: Satz wird gelesen, Bedeutung ist direkt greifbar
- Bild: Bilddetail ist sichtbar, Bedeutung relativ direkt
- Statistik: Zahl wird abgelesen

ARTIFACT: Durch Material-Manipulation erfassbar
- Quellenvergleich: Zwei Quellen werden gegenübergestellt → Unterschied erkannt
- Bildanalyse: Details werden gesammelt, interpretiert → Sinn ergibt sich
- Kartentransformation: Karte wird beschriftet/ergänzt → Struktur sichtbar

INFERENTIAL: Nur durch Lehrerimpuls erreichbar
- Stille Voraussetzung: Schüler müssen Lehrerinput oder Peers-Diskussion nutzen
```

**Empfehlung:**
- Schreibe Kategorisierungs-Leitlinie mit Phase-1-Material-Szenarien
- Severity: **MEDIUM**

---

## 5. Fazit pro Welle-1-Patche

| Patch | Neu | Operationalisierbar? | Bestand |
|---|---|---|---|
| SK18 Quellenorientierung | JA | GELB (mit Guide) | Retention mit Operationalisierungs-Anhang |
| Complication.typ Zuordnung | JA | ROT (keine Anleitung) | BLOCKER bis Typ-Guide existiert |
| Eskalationspfade E-D1 bis E-D5 | ERWEITERT | ROT (Trigger vage) | BLOCKER bis Iterations-/Schwellenwert-Definition |
| Didaktische Implikations-Prüfung | ERWEITERT | ROT (vage) | BLOCKER bis Checkboxen-Format definiert |
| E-H1 bis E-H3 | ERWEITERT | GELB (partiell) | Retention mit "Ableitbarkeits"-Definition |
| H1 Natuerliche Ordnungsschnitte | EXISTIERT | GELB (Kategoriale schwach) | Ergänzung mit kategorialen Fallbeispielen nötig |
| H5 Konkreter Anker | EXISTIERT | ROT (vage) | BLOCKER bis Konkretisierungs-Matrix definiert |
| QI-RC1 Phase-2.0-Kompatibilitaet | JA | GELB (formal OK, semantisch unklar) | Clarification im Phase-2.0-Vertrag nötig |

---

## 6. Gate-Urteil

**GELB mit kritischen Bedingungen**

**Begruendung:**

1. **Architektur ist grundsätzlich sinnvoll** (Eskalationspfade, SCPL-Typ-Klassifikation, Quellenorientierung)
2. **Aber: 4 Kriterien (F01, F04, F07, F11) sind in aktueller Form NICHT operationalisierbar** ohne zusätzliche Definitionen
3. **Wenn nicht behoben: Zu hohe Divergenz zwischen Agenten** → Audit-Streitigkeiten → Qualitätsvarianz

**Genehmigung unter Bedingung:**
- Welle-1-Patches dürfen nicht produktiv gehen, bis alle CRITICAL-Findings (F01, F04, F07, F11) durch Operationalisierungs-Richtlinien behoben sind
- HIGH-Findings (F02, F03, F05, F06) sollten vor Produktionsstart behoben sein; wenn nicht, müssen explizit in "bekannte Risiken" dokumentiert werden

---

## 7. Top-5 Empfehlungen (Priorisiert nach Impact)

### 1. CRITICAL: Schreibe OPERATIONALISIERUNGS-MATRIX fuer Complication.typ (F02)

**Was:** Entscheidungsbaum mit Fallbeispielen für narrativ | konzeptuell | kontrastiv | kausal

**Warum:** Ohne Leitlinie → Agenten klassifizieren Ambiguitäten unterschiedlich → JSON-Validierung später inkonsistent

**Datei:** `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_COMPLICATION_TYPEN.md`

**Umfang:** 3-4 Seiten, min. 3 Fallbeispiele pro Typ

**Zielgruppe:** AGENT_HEFTEINTRAG (Producers), RA-C (Code-Reviewer)

**Severity:** BLOCKER für Produktionsfreigabe

---

### 2. CRITICAL: Schreibe KONKRETISIERUNGS-MATRIX fuer H5 "Konkreter Anker" (F07)

**Was:** Vier-Quadranten-Matrix (Ereignis/Konzept × Raum/Zeit) mit FAIL/PASS-Fallbeispielen pro Zelle

**Warum:** H5 ist derzeit normativ ("sollte haben"), nicht operativ (Prüfbar)

**Datei:** `docs/agents/artefakte/KONKRETISIERUNGS_LEITLINIE_H5.md`

**Umfang:** 2-3 Seiten, visuell clear, mit historischen Kontexten

**Zielgruppe:** AGENT_DIDAKTIK (Phase 0.1), RA-B (Review)

**Severity:** BLOCKER für Phase-0.1-Validierung

---

### 3. CRITICAL: Schreibe ESKALATIONS-OPERATIONALISIERUNG (F03 + F04)

**Was:** Schwellenwert-Definitionen + Iterationslimits + Implikations-Prüf-Checkboxen

**Warum:** "Nach 1 Iteration nicht lösbar" ist subjektiv ohne Schwellenwerte

**Datei:** `docs/architektur/OPERATIONALISIERUNG_ESKALATIONSPFADE_DIDAKTIK.md`

**Umfang:** 4-5 Seiten mit Tabellen und Fallbeispielen (QD-Metriken)

**Zielgruppe:** AGENT_DIDAKTIK (Phase 0.1), AGENT_HEFTEINTRAG (Phase 0.4)

**Severity:** BLOCKER für Eskalationspfad-Aktivierung

---

### 4. HIGH: Schreibe SK18-PRUEFLEITLINIE Quellenorientierung (F01)

**Was:** Fünf Kategorien gültiger Quellenbezüge mit Min/Max-Beispielen pro Kategorie

**Warum:** "Expliziter Quellenbezug" ist unterdefniert → Agent-Divergenz bei grenzwertigen Chunks

**Datei:** `docs/checklisten/SK18_QUELLENORIENTIERUNG_LEITLINIE.md`

**Umfang:** 2 Seiten, Kategorien: Dokument | Artefakt | Augenzeugentext | Forschungsstand | chronikale Quellen

**Zielgruppe:** AGENT_SKRIPT (Phase 0.3, Review-Gate)

**Severity:** Upgrade SK18 von CRITICAL auf HIGH (mit Guide)

---

### 5. HIGH: Ergaenzen H1/H5 mit kategorialen Fallbeispielen (F06 + F12)

**Was:** Fuer "Natuerliche Ordnungsschnitte" bei kategorialen Themen: 3-4 historische Kontexte zeigen, welche Cluster-Dimension Agent waehlt

**Warum:** Aktuelle H1 deckt nur Chronologie gut ab; kategoriale Themen unterrepräsentiert

**Datei:** Ergänzung in `docs/agents/AGENT_DIDAKTIK.md` Abschnitt H1 + H5 (oder separate Datei)

**Umfang:** 1 Seite pro Heuristik, mit je 2-3 Fallbeispielen

**Zielgruppe:** AGENT_DIDAKTIK (Phase 0.1)

**Severity:** HIGH (nicht BLOCKER, weil Basis-Heuristiken funktionieren)

---

## 8. Audit-Empfehlungen fuer RA-C/D (Nachgelagert)

- **RA-C (Code-Review):** Prüfe nach Implementierung, dass alle Operationalisierungs-Dateien tatsächlich in Agents-Prompts integriert sind
- **RA-D (Produkt-Audit):** Nach 3-5 Spielen: Divergenz-Analyse über Complication-Typen und H5-Anwendungen — rückwirken in Guides basierend auf realen Fehlmustern
- **QA:** Implementiere "Operationalisierungs-Violation"-Flaggen in Validierungs-Checklisten (z.B. "F07-H5-FEHLEND" wenn Mappe keinen Anker hat und H5-Guide nicht angewendet wurde)

---

## 9. Aenderungsprotokoll

| Version | Datum | Aenderung |
|---|---|---|
| v1.0 | 2026-04-07 | Initiales Audit RA-B: 12 Findings, 4 CRITICAL, 4 HIGH, 3 MEDIUM. Gate: GELB. |
