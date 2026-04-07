# Operationalisierung: Eskalationspfade (E-D + E-H)

**Version:** v1.0
**Datum:** 2026-04-07
**Adressiert:** RA-B-F03 (CRITICAL — "nach 1 Iteration nicht loesbar" vage), RA-B-F04 (CRITICAL — Implikationspruefung underspecified)
**Gilt fuer:** VERTRAG_PHASE_0-1_DIDAKTIK §4a (E-D1 bis E-D5), VERTRAG_PHASE_0-4_HEFTEINTRAG §6 (E-H1 bis E-H3)
**Zielgruppe:** AGENT_DIDAKTIK, AGENT_HEFTEINTRAG, Reviewer

---

## 1. Iterationslimits

### Grundregel

Jedes Q-Gate erlaubt **maximal 1 Nachbesserungsversuch** (= 1 Iteration). Danach gilt:

| Ergebnis nach Iteration | Agent-Aktion |
|---|---|
| Kriterium PASS | Weiter |
| Kriterium WARN (nicht-blockierend) | Weiter, WARN dokumentieren |
| Kriterium FAIL (BLOCKER/HIGH) | Fallback-Typ waehlen ODER User-Eskalation |

**"Nicht loesbar" = nach 1 Iteration ist das Kriterium weiterhin FAIL mit Severity BLOCKER oder HIGH.** Der Agent darf NICHT eine zweite freie Iteration starten. Die einzigen Optionen sind: (a) definierter Fallback aus dem Eskalationspfad oder (b) User-Entscheidung.

### Iterationslimit pro Eskalationstyp

| Typ | Max Fallback-Versuche | Danach |
|---|---|---|
| E-D1 Mappen-Rebalance | 1 (= 1 Rebalance-Versuch) | E-D4 Thema-Einschraenkung oder User |
| E-D2 KE-Scope-Reduktion | 1 | User-Entscheidung PFLICHT |
| E-D3 Progressions-Anpassung | 1 (Begruendung schreiben) | PASS mit Begruendung oder User |
| E-D4 Thema-Einschraenkung | 1 | E-D5 Abbruch-Empfehlung |
| E-D5 Abbruch-Empfehlung | 0 (= sofort User) | User entscheidet |
| E-H1 SCPL-Restrukturierung | 1 (alternatives Ordnungsmuster) | E-H3 Ruecklauf |
| E-H2 Kernerkenntnis-Anpassung | 0 (= sofort dokumentieren) | E-H3 Ruecklauf |
| E-H3 Ruecklauf zu SKRIPT | 1 (praezises Finding) | User-Entscheidung |

**Gesamtlimit pro Mappe:** Max. 2 Fallbacks kumuliert (z.B. E-D1 + E-D3). Bei >2 Fallbacks auf derselben Mappe: User-Eskalation.

---

## 2. Schwellenwerte fuer Q-Gate-Kriterien

### QD5 Mappen-Balance — Wann ist eine Mappe "ueberladen"?

**Quantitativer Schwellenwert:**
- Stoffdichte-Differenz zwischen groesster und kleinster Mappe: **max. Faktor 2**
- Gemessen in: Anzahl distinkter Ereignisse/Konzepte (= Stoffdichte-Schaetzung aus Aufgabe 2c)
- Beispiel: Mappe 1 hat 3 Konzepte, Mappe 3 hat 7 → Faktor 2.3 → QD5 FAIL

**Qualitativer Schwellenwert (ergaenzend):**
- Zentrale Erkenntnis ist NICHT in 1 Satz formulierbar → Mappe hat >1 Kernidee → QD5 FAIL (H2-Verletzung)
- Stoffdichte-Schaetzung >6 distinkte Eintraege → QD5 WARN (H7-Schwelle)

### QD6 AFB-Progression — Wann ist "nicht-monoton" akzeptabel?

**FAIL-Bedingung:** Progression faellt um >1 AFB-Stufe (z.B. Mappe 2 = AFB II-III, Mappe 3 = AFB I).

**WARN-Bedingung:** Progression stagniert ueber >2 aufeinanderfolgende Mappen auf derselben Stufe.

**Begruendete Ausnahme (E-D3):** Agent darf nicht-monotone Progression begruenden, wenn: (a) didaktischer Spannungsbogen dies erfordert (z.B. Mappe 3 = Vertiefung vor Synthese in Mappe 4), UND (b) die Begruendung in max. 2 Saetzen formulierbar ist. Begruendung wird im Eskalations-Log dokumentiert.

### QD9 Sequenzierbarkeit — Wann liegt ein Ordnungs-Verschraenkungsproblem vor?

**FAIL-Bedingung:** Eine Mappe enthaelt Teile aus >1 Ordnungsdimension (z.B. zwei Zeitstraenge), die sich NICHT in separate Materialien zerlegen lassen.

**Test:** Agent fragt: "Kann ich diese Mappe in 3-5 Materialien zerlegen, wobei jedes Material einer einzigen Ordnungsdimension folgt?" Wenn Nein → QD9 FAIL.

### QH3 SCPL-Struktur (Phase 0.4) — Wann ist SCPL "nicht aus SKRIPT ableitbar"?

**Ableitbarkeits-Definition:**
- **DIREKT ableitbar:** Konzept findet sich woertlich oder paraphrasiert in max. 1 Absatz des SKRIPT-Chunks der jeweiligen Mappe
- **INFERENTIELL ableitbar:** Konzept ergibt sich als logische Schlussfolgerung aus dem Chunk, ist aber nicht explizit formuliert
- **NICHT ableitbar:** Konzept ist weder direkt noch inferentiell im Chunk auffindbar — Agent muesste neuen Inhalt erfinden

**Schwellenwert fuer E-H1:** Wenn ≥2 SCPL-Zonen NICHT ableitbar sind → E-H1 (SCPL-Restrukturierung). Wenn 1 SCPL-Zone nicht ableitbar, aber die anderen konsistent → Agent versucht alternatives Ordnungsmuster (1 Iteration).

### QH4 Kernerkenntnisse (Phase 0.4) — Wann "nicht im SKRIPT auffindbar"?

**Suchbereich:** Nur der SKRIPT-Chunk der aktuellen Mappe (nicht game-global).

**Auffindbarkeits-Test:** Agent sucht fuer jede Kernerkenntnis die Belegstelle im Chunk. Wenn die Kernerkenntnis sich nur durch Kombination von Informationen aus ≥3 verschiedenen Absaetzen ergibt UND nicht als Synthese formulierbar ist → NICHT auffindbar → E-H2.

---

## 3. Didaktische Implikations-Pruefung (Checklisten-Format)

### Pruefung bei E-D1 (Mappen-Rebalance)

```
Implikations-Pruefung E-D1:
[ ] Werden KE-Hauptzuordnungen zwischen Mappen verschoben?
    → Wenn JA: Welche KE? Von Mappe ___ nach Mappe ___
[ ] Aendert sich ein Mappen-Titel?
    → Wenn JA: Alt ___ → Neu ___
[ ] Aendert sich der Wortlaut eines Teilziels?
    → Wenn JA: TZ ___ betroffen. Neuer Wortlaut: ___
[ ] Bleibt die AFB-Progression konsistent?
    → Wenn NEIN: Zusaetzlich E-D3 ausloesen

Didaktische Folgen: [KEINE | GERING | ERHEBLICH]
- KEINE: Nur KE-Nebenzuordnungen verschoben, kein Titel/TZ betroffen
- GERING: KE-Hauptzuordnung verschoben, aber TZ-Wortlaut unveraendert
- ERHEBLICH: TZ-Wortlaut aendert sich → User-Validierung PFLICHT
```

### Pruefung bei E-D2 (KE-Scope-Reduktion)

```
Implikations-Pruefung E-D2:
[ ] Welche KE werden als "Folge-Game-Reserve" markiert?
    → KE-IDs: ___
[ ] Aendert sich das Stundenziel?
    → Wenn JA: Neuer Wortlaut: ___
[ ] Werden Gegenstandsbereiche nicht mehr abgedeckt?
    → Wenn JA: Welche? ___
[ ] Sind die reduzierten KE fuer das Thema zentral oder peripher?
    → ZENTRAL: User-Entscheidung ZWINGEND
    → PERIPHER: User-Validierung empfohlen

Didaktische Folgen: Immer ERHEBLICH → User-Validierung PFLICHT
```

### Pruefung bei E-D4 (Thema-Einschraenkung)

```
Implikations-Pruefung E-D4:
[ ] Neuer Scope-Vorschlag: ___
[ ] Was wird ausgeklammert? ___
[ ] Aendert sich das Stundenziel? → ___
[ ] Aendern sich Teilziele? → Welche: ___
[ ] Bleibt die KE-Matrix konsistent? → ___
[ ] Ist der reduzierte Scope noch lehrplankonform? → ___

Didaktische Folgen: Immer ERHEBLICH → User-Validierung PFLICHT
```

### Pruefung bei E-H1 (SCPL-Restrukturierung)

```
Implikations-Pruefung E-H1:
[ ] Welches Ordnungsmuster wird gewechselt?
    → Alt: ___ → Neu: ___
[ ] Aendern sich die SCPL-Zonen (Anzahl, Reihenfolge)?
    → Wenn JA: Beschreibung: ___
[ ] Bleiben die Kernerkenntnisse identisch?
    → Wenn NEIN: E-H2 zusaetzlich ausloesen
[ ] Bleibt die Stundenfrage gueltig?
    → Wenn NEIN: Neue Stundenfrage: ___

Didaktische Folgen: [GERING | ERHEBLICH]
- GERING: Nur Ordnungsmuster gewechselt, SCPL-Inhalt identisch
- ERHEBLICH: SCPL-Zonen oder Stundenfrage betroffen → volles Q-Gate
```

---

## 4. Eskalations-Log: Erweitertes Format

Das bisherige Eskalations-Log-Format wird um die Implikations-Pruefung erweitert:

```
## Eskalations-Log

| # | Typ | Ausloeser (QD/QH + Evidenz) | Massnahme | Implikation | Q-Gate |
|---|---|---|---|---|---|
| 1 | E-D1 | QD5 FAIL: M3 hat 8 Konzepte (Faktor 2.7 vs. M1) | KE GPG7_LB3_K_04 von M3→M4. M3-Titel unveraendert. | GERING (KE-Haupt verschoben, TZ unveraendert) | QD4 PASS, QD5 PASS |
```

**Pflichtfelder im Ausloeser:** QD/QH-ID + konkrete Evidenz (Zahlen, Zitate, Diff).
**Pflichtfelder in Implikation:** Ergebnis der Checkliste (KEINE/GERING/ERHEBLICH) + 1-Satz-Begruendung.

---

## 5. Fallbeispiel: Vollstaendiger Eskalationsdurchlauf

**Szenario:** AGENT_DIDAKTIK erstellt DIDAKTIK_RAHMEN fuer Game 2 "Industrialisierung". 4 Mappen. Q-Gate-Ergebnis nach Erstdurchlauf:

| Kriterium | Ergebnis | Detail |
|---|---|---|
| QD5 | FAIL | Mappe 2 hat 8 distinkte Konzepte, Mappe 4 hat 3. Faktor 2.7. |
| QD6 | WARN | M2=AFB II, M3=AFB II (Stagnation) |
| Rest | PASS | — |

**Iteration 1 (Nachbesserung):** Agent versucht Mappe 2 zu entlasten. Verschiebt "Arbeiterbewegung" nach Mappe 3. Ergebnis: QD5 PASS (Faktor 1.6), aber QD9 FAIL — Mappe 3 hat jetzt zwei Ordnungsdimensionen (Gesellschaft + Politik).

**→ QD9 FAIL nach Iteration = "nicht loesbar". Agent waehlt E-D1 Mappen-Rebalance.**

**Fallback E-D1:** Agent verschiebt stattdessen "Umweltfolgen" von Mappe 2 nach Mappe 4. Implikations-Pruefung:
- KE-Hauptzuordnung verschoben: GPG7_LB2_K_03 von M2 nach M4
- Mappen-Titel unveraendert
- TZ-Wortlaut unveraendert (Umwelt war Nebenaspekt in M2-TZ)
- Implikation: GERING

**Q-Gate nach Fallback:** QD4 PASS, QD5 PASS (Faktor 1.4), QD9 PASS, QD6 WARN (bleibt — Agent darf E-D3 waehlen oder User fragen).

**Ergebnis:** PASS mit 1 WARN. Eskalations-Log enthaelt 1 Eintrag (E-D1).

---

## 6. Aenderungsprotokoll

| Version | Datum | Aenderung |
|---|---|---|
| v1.0 | 2026-04-07 | Initial: Adressiert RA-B-F03/F04 CRITICAL. Iterationslimits, 5 Schwellenwerte, 4 Implikations-Checklisten, erweitertes Log-Format, 1 Durchlauf-Fallbeispiel. |
