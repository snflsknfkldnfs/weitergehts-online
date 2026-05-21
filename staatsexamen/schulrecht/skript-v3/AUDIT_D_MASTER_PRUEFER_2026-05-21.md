---
titel: Audit D — Master-Fehler-Wiederholung + Prüferperspektive (V3-Restrukturierung)
auditor: D (kompakt, max 25 Tool-Calls)
datum: 2026-05-21
basis_alt: 17_Audit_Master_Fehlerliste_ABCD.md (15 KRITISCH-Fehler aus mkdocs-Version)
basis_neu: staatsexamen/schulrecht/skript-v3/mp01..mp09/{data,vertiefung-content}.js
status: FINAL
---

# Audit D — Master-Fehler-Wiederholung + Prüferperspektive

## Methodik
Für jeden der 15 KRITISCH-Fehler des Master-Audits (mkdocs-Quelle) wurde per Grep gegen die 9 V3-Module geprüft, ob der Fehler in der frischen Restrukturierung
1. **WIEDERHOLT (RED)** — gleicher Fehler erscheint wieder
2. **KORRIGIERT (GREEN)** — Norm/Zahl jetzt richtig
3. **NICHT_RELEVANT (n/a)** — Thema in V3 (noch) nicht abgedeckt → eigene Coverage-Lücke

## SUMMARY

| Kategorie | Count | K-Nummern |
|---|---|---|
| **KORRIGIERT (GREEN)** | 7 | K02, K06, K07*, K08, K11, K13, K14 |
| **WIEDERHOLT (RED)** | 1 (+1 strittig) | K10 (strittig: 5+2 vs. 8) |
| **NICHT_RELEVANT / COVERAGE-LÜCKE** | 7 | K01, K03, K04, K05, K09, K12, K15 |

*K07: thematisch korrigiert, aber andere Strukturierung (Nr. 6/9/11 statt 6-10).

**Befund:** Die V3-Restrukturierung hat die alten Norm-/Zitat-Driften der mkdocs-Quelle **nicht 1:1 wiederholt**. Die kritischen Korrekturen (Art. 76+§20 BaySchO für Schulpflicht-Überwachung, Vorkurs 1,5 J., Disambiguierung Art. 87 BayEUG vs. § 23 BaySchO) sind sauber umgesetzt. Aber: V3 hat **eigene Lücken** — 7 KRITISCH-Themen sind in V3 schlicht nicht behandelt und müssen vor 26.05. ergänzt werden.

---

## KORRIGIERT-Liste (GREEN — Positiv-Belege)

### K02 — Schulpflicht-Überwachung Art. 76 + § 20 BaySchO (nicht Art. 118)
- **GREEN**: `mp02/data.js:44` formuliert verbatim: *„Schulpflicht = Grundpflicht (Art. 35 + Art. 76 + § 20 BaySchO). Schulzwang = Sanktion (Art. 118 …). KEIN Synonym!"*
- `mp07/data.js:67` zitiert Art. 76 wortlautgetreu mit beiden Pflichten („achten" + „unterstützen"). Eskalations-Kette Art. 76 → § 20 → Art. 119 → Art. 118 sauber gestuft.

### K06 — Vorkurs Deutsch 240: 1,5 Schuljahre (nicht 2)
- **GREEN**: `mp02/data.js:52` + `mp02/data.js:75` + `mp02/data.js:191` + `mp02/vertiefung-content.js:113` + `mp05/vertiefung-content.js:130` + `mp05/data.js:528` — alle nennen **240 h über 1,5 Schuljahre** mit explizitem NICHT-1J./NICHT-2J.-Warnhinweis. Master-Falle entschärft.

### K07 — LK-Konferenz OM-Zuständigkeit (Nrn. 6 + 9 + 11)
- **GREEN (modifiziert)**: V3 strukturiert anders als Master-Vorschlag „Nrn. 6-10". `mp03/data.js:50` listet konkret **„Nr. 6 (Ausschluss 2-4 Wochen) + Nr. 9 (Klassenwechsel) + Nr. 11 (Entlassung)"** als LK-Konferenz-Zuständigkeiten. Das ist die korrekte rechtliche Aufteilung — Master-Audit-Empfehlung „Nrn. 6-10" war pauschalisierender als die normative Realität.
- **Hinweis Prüfer**: Wenn ein Prüfer „Nr. 10" (Entlassung MS/FöS/BS) abfragt, sollte das in `Art. 86 BayEUG`-Wortlaut-Eintrag bereits genannt sein (ist es: `mp03/data.js:219` listet alle 12 OM).

### K08 — „Sicherungsmaßnahme"-Homonym Art. 87 PERSON ≠ § 23 BaySchO GEGENSTAND
- **GREEN**: explizite Disambiguierung in `mp03/data.js:68` *(„Verwechslung = Examens-Hauptfalle")* + `mp03/data.js:93` Falschaussagen-Karte + `mp03/data.js:220` + `mp03/data.js:229` doppelt. Die Master-Forderung „Disambiguierungskasten in 5.3" ist konzeptionell umgesetzt.

### K11 — Block 2 Schulpflicht-Synthese (Antwort-Choreografie)
- **GREEN (teilweise)**: `mp02/data.js:98` liefert die geforderte Synthese-Eskalationskette: *„Art. 76 (Eltern-Mitwirkung) → § 20 BaySchO (Meldepflicht) → Art. 119 (OWi + Geldbuße) → Art. 118 Schulzwang … → Art. 120"*. `mp07/data.js:126` ergänzt einen zweiten Antwortketten-Pfad (KL-Brief → SL-Brief → OWi → Schulzwang). Eine separate „2.0 Synthese"-Sektion gibt es nicht, aber die Choreografie ist in `antwortkette`-Feldern abrufbar.

### K13 — Notenauskunft-Fall (DSGVO Art. 15 + 4-Stufen-Prüfung)
- **GREEN**: `mp05/data.js:168` „Hannah — Notenauskunft + Vergleichsverbot" + `mp06/data.js:93` „Notenauskunft an EB mit Vergleich" + DSGVO-Art-15-Anker (`mp05/data.js:448`) + Drittauskunfts-Verbot § 14 LDO (`mp06/data.js:171`). Cross-Refs zwischen mp05 ↔ mp06 vorhanden.

### K14 — Passive Verweigerung + ne bis in idem
- **GREEN**: `mp05/data.js:86` Fall „Passive Verweigerung" + `mp05/data.js:89` Doppelsanktions-Prüfschema 3-Stufen + `mp05/data.js:157` FA07 + `mp05/data.js:442` Art. 103/3 GG verbatim + `mp05/vertiefung-content.js:89` Prüfschema vollständig. Master-Forderung erfüllt.

---

## WIEDERHOLT-Liste (RED — mit Patch-Empfehlung)

### K10 — BayDG-Disziplinarmaßnahmen: 5+2 vs. 8 Stufen
- **RED (strittig)**: `mp06/data.js:18` schreibt *„Disziplinar BayDG 5+2 Stufen"*. `mp06/data.js:173` listet konkret 5 Lebenszeit + 2 Ruhestand = 7 Maßnahmen. `mp09/data.js:224` identisch. Master-Audit fordert „8 Stufen inkl. Zurückstufung".
- **Faktencheck**: Art. 6 Abs. 1 BayDG enthält für Lebenszeitbeamte **5 Maßnahmen**: Verweis · Geldbuße · Kürzung der Dienstbezüge · Zurückstufung · Entfernung aus dem Beamtenverhältnis. Abs. 2 für Ruhestand: 2 Maßnahmen (Kürzung Ruhegehalt · Aberkennung Ruhegehalt). Summe = **7**, NICHT 8. **V3 ist normativ korrekt**, der Master-Vorwurf „8 Stufen" geht auf eine fehlerhafte Zählung der alten mkdocs-Version zurück (möglicherweise wurde dort eine 6. Maßnahme „Aberkennung Lehramt" o.ä. hineingezählt).
- **Patch-Empfehlung**: Keine Korrektur in V3 nötig. Stattdessen: **17_Master-Audit nachträglich validieren** — die behauptete „8-Stufen"-Liste in Z. 1609-1616 prüfen, ob sie real existiert. Wahrscheinlich ist der Master-Befund hier selbst fehlerhaft.

---

## NICHT_RELEVANT / COVERAGE-LÜCKE (V3 deckt Thema nicht ab)

Diese Themen waren in der mkdocs-Quelle vorhanden (und teils falsch). In V3 fehlen sie komplett — das ist **eigene Coverage-Lücke**, kein Wiederholungsfehler, aber prüfungsrelevant.

| K# | Thema | V3-Vorkommen | Empfehlung |
|---|---|---|---|
| **K01** | Schulforum + Pausenordnung Einvernehmen (Art. 69/4 BayEUG) | Schulforum mehrfach (mp03/mp07/mp09), aber **Pausenordnung-Einvernehmen** nicht erwähnt | In `mp03` Block A.4 oder `mp07` Schulforum-Karte einen Satz ergänzen: *„Art. 69 Abs. 4: Einvernehmen mit Schulforum bei Hausordnung/Pausenordnung."* |
| **K03** | BayBG Art. 7 Abs. 1 Beschwerderecht | Nur Erwähnung BayBG generell (mp09/mp06), Art. 7 BayBG **nicht referenziert** | In `mp06` LK-Pflichten-Block einen Satz zu Beschwerderecht ergänzen (oder im A1-Block der LK-Pflichten) |
| **K04** | LNW-Aufbewahrungsfrist 1 Jahr (§ 3 Abs. 6 LDO) | `§ 12/3 MSO` ausführlich behandelt (Rückgabe-Direktionalitäten), aber **§ 3 LDO Aufbewahrungsfrist 1 Jahr** fehlt komplett | In `mp04` neben § 12/3 MSO einen Patch ergänzen: *„§ 3 Abs. 6 LDO: schriftliche LNW 1 Jahr nach Ablauf des Schuljahres aufbewahren."* Sehr prüferbeliebt. |
| **K05** | UrhG § 60a Kopieranteil 15 % max. 20 Seiten | **Komplett abwesend** in V3 (kein Treffer für UrhG, § 60a, „Kopier", „Fotokopie") | Neue Karte in `mp06` (Verschwiegenheit/Schriftwesen) oder `mp08` (Schulleben): „§ 60a UrhG + Fotokopiervertrag 2018: 15 % bis max. 20 Seiten je Werk pro Klasse/Schuljahr." Klassische Falle. |
| **K09** | EB-Größe 1 pro 15 (GS/MS/FöS) | `mp07/data.js:211` sagt nur *„Zahl der Mitglieder nach Schulgröße"* — kein konkreter Schlüssel | In `mp07` Art. 65 BayEUG-Block die schulart-spezifischen Schlüssel ergänzen: GS/MS/FöS = 1 EB-Mitglied pro 15 SuS-Eltern; RS/Gym = 1 pro 50. |
| **K12** | Messer-Fall (StGB §§ 241/224, 3-Phasen-Eskalation) | **Komplett abwesend** in V3 (kein Treffer für „Messer", § 241, § 224) | In `mp03` 5.3-Bereich oder `mp05` Verbote-Block einen Präzedenz-Fall ergänzen (3-Phasen: Sofortmaßnahme Art. 87 → OM-Verfahren → StGB-Anzeige durch SL). Quelle: `Fallanalyse_Messer_im_Unterricht.md`. |
| **K15** | Vertretungsunterricht + BeamtStG §§ 34/35 | `mp06/data.js:169` § 9a/3 LDO „Vertretung in zumutbarem Umfang" erwähnt, **aber BeamtStG §§ 34/35 explizit nicht** verlinkt | In `mp06` A.1 LK-Pflichten oder neuem 6.4a-Block einen Satz: *„Vertretungsbereitschaft folgt aus §§ 34/35 BeamtStG (Dienstleistung + Weisungsbindung) i.V.m. § 9a/3 LDO."* |

---

## Prüferperspektive — 5 simulierte Fragen

### F1: „Welche Mehrheit braucht die Lehrerkonferenz für die Entlassung nach Art. 86/2 Nr. 11 — und was unterscheidet das von einem Ausschluss durch die SL?"
- **Verfügbarkeit V3**: STARK. `mp03/data.js:50` + `mp03/data.js:92` (FA01) + `mp03/vertiefung-content.js:78` + `mp03/data.js:97` (Mehrheitsbeschluss § 12 LDO). Antwort: Mehrheitsbeschluss LK-Konf (Stichentscheid SL) vs. SL-Alleinentscheidung nur bis Nr. 5 (6 U.-Tage).
- **Gap**: 2/3-Mehrheit für Nr. 11 nicht explizit als „qualifizierte Mehrheit" markiert.

### F2: „Eine Mutter verlangt Auskunft über die Note ihres Sohnes Tim UND einen Vergleich mit der Tochter Lara aus derselben Klasse. Wie reagieren Sie?"
- **Verfügbarkeit V3**: SEHR STARK. `mp06/data.js:93` + `mp06/data.js:101` (antwortkette) + `mp05/data.js:168` Hannah-Fall. Antwort: Tim-Auskunft regulär (Art. 56/2 + § 41 BaySchO + DSGVO 15), Lara-Vergleich ablehnen (§ 14 LDO Drittauskunfts-Verbot + DSGVO 6/1 fehlende Rechtsgrundlage).

### F3: „Schüler bringt ein Messer mit in den Unterricht. Sofortmaßnahme + Folgeverfahren?"
- **Verfügbarkeit V3**: SCHWACH. `mp03` hat Art. 87 PERSON-Sicherung + § 23 BaySchO Wegnahme abstrakt, aber **keinen Messer-Fall mit 3-Phasen-Eskalation**. Prüfer würde StGB-§ 224/241-Querverweis erwarten.
- **Gap**: K12 dringend einbauen.

### F4: „Wie lange müssen Sie schriftliche Probearbeiten aufbewahren — und welche Norm regelt das?"
- **Verfügbarkeit V3**: NICHT VORHANDEN. § 12/3 MSO regelt nur Rückgabe (1 Woche), nicht Schulseite-Aufbewahrung. § 3 Abs. 6 LDO (1 Jahr) fehlt.
- **Gap**: K04 dringend einbauen — klassische Schulrat-Falle.

### F5: „Beamtenrecht: Welche Disziplinarmaßnahmen sind nach BayDG möglich?"
- **Verfügbarkeit V3**: STARK. `mp06/data.js:173` 5+2-Liste verbatim + `mp09/data.js:224` Cross-Ref + `mp06/vertiefung-content.js:95` Doppelstruktur-Tabelle. **V3 ist hier normativ präziser als der Master-Audit-Vorwurf** (siehe K10-Diskussion).

---

## Empfehlung zur Umsetzung vor 26.05.2026 (Priorisierung)

**MUST (Schulrats-Lieblings-Fallen):**
1. **K04** § 3 Abs. 6 LDO Aufbewahrungsfrist 1 Jahr → `mp04`
2. **K05** § 60a UrhG 15 %/20 S. → `mp06`
3. **K12** Messer-Fall 3-Phasen → `mp03` oder `mp05`
4. **K09** EB-Schlüssel GS/MS = 1:15 → `mp07`

**SHOULD:**
5. **K01** Pausenordnung-Einvernehmen Art. 69/4 → `mp03`/`mp07`
6. **K15** BeamtStG §§ 34/35 Vertretungspflicht → `mp06`
7. **K03** BayBG Art. 7 Abs. 1 Beschwerderecht → `mp06`

**KANN (Validierung im 17_Master):**
8. **K10** BayDG „5+2 oder 8" — Master-Audit-Eintrag selbst verifizieren; V3 wahrscheinlich korrekt.

---

## Schlussbefund
Die V3-Restrukturierung ist **nicht in die alten Driften zurückgefallen**. Die 7 wichtigsten normativen Korrekturen aus dem Master-Audit sind sauber umgesetzt (insbesondere die Art-76-/§-20-Verortung der Schulpflicht-Überwachung, der Vorkurs-Wert, die Art-87-/§-23-Disambiguierung). Die verbleibenden Risiken sind **Coverage-Lücken** (K01, K03, K04, K05, K09, K12, K15), die in der mkdocs-Quelle zwar vorhanden (und teils falsch) waren, jetzt aber gar nicht mehr in V3 stehen. Diese 7 Themen müssen vor 26.05.2026 punktuell nachgezogen werden — am dringendsten **K04 (LNW-Aufbewahrung 1 J. § 3/6 LDO)**, **K05 (UrhG 15 %)** und **K12 (Messer-Fall)**, weil das klassische mündliche Prüferfallen sind.
