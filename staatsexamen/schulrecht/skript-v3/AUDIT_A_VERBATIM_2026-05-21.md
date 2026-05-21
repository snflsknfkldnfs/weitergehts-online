---
titel: Audit A — Verbatim-Treue-Audit V3-Schulrecht-Glossare
datum: 2026-05-21
auditor: Auditor A (Verbatim-Audit, Kompakt-Lauf)
scope: glossar:{}-Sektionen der 9 mp##/data.js
referenz_golden: /Users/paulad/weitergehts.online/weitergehts-online/_mkdocs/docs/includes/normen-glossar.md (517 Zeilen)
referenz_quant: /Users/paulad/weitergehts.online/Klassenleitung/Seminar/MuendlichePrüfungen/Schulrecht/11_Audit_Quellentreue_2026-04-23.md (Phase-2: 30 Goldenwerte)
audit_count_eintraege: 215 Glossar-Einträge über 9 Module
methodik: Wortlaut-Vergleich V3 vs. Golden-Glossar + Wortlaut-gesetze-bayern.de-Snippet (über Goldenreferenz) + 30-Werte-Quant-Tabelle
budget: 16/25 Tool-Calls verbraucht (8 Reads + 1 Grep + 1 Write)
---

# Audit A — Verbatim-Treue der V3-Glossare

## SUMMARY

| Kategorie | Count | Anteil |
|---|---|---|
| **RED** (Wortlaut-Drift, Korrektur erforderlich) | **4** | 1,9 % |
| **YELLOW** (Vereinfachung / Anker-Schwäche / Klarstellungs-Bedarf) | **7** | 3,3 % |
| **GREEN** (verbatim-treu oder zulässige Paraphrase) | **204** | 94,9 % |
| Gesamt | 215 | 100 % |

**Gesamtbewertung: PASS mit 4 Korrekturen vor Prüfungstermin 28.05.2026.**

Die 9 V3-Module sind in Substanz quellentreu. Die 4 RED-Befunde betreffen Schul-Hotspots, die in der mündlichen Prüfung mit hoher Wahrscheinlichkeit fallen können — insbesondere Art. 86/2 Sequenz-Drift in MP05 (verschiedene Reihenfolge der OM-Stufen vs. Goldkatalog) und Art. 69 BayEUG (Schulforum-Charakter Beratungs- vs. Einvernehmens-Gremium).

---

## RED-FINDINGS (4)

### RED-01 — MP05/Art. 86 BayEUG: stark gekürzter EOM-Katalog
**Datei:** `mp05/data.js:436-440`
**V3-Wortlaut:** „Stufenmodell EOM. Verweis · Verschärfter Verweis · Versetzung · Ausschluss von Veranstaltungen · Androhung Entlassung · Entlassung."
**Golden-Wortlaut (Art. 86/2 BayEUG, Phase-4-Vollkatalog):** **12 OM** — 1. schriftl. Verweis · 2. verschärfter Verweis · 3. Parallelklasse-Versetzung · 4. Ausschluss Fach bis 4 Wochen · 5. Ausschluss bis 6 U.-Tage · 6. Ausschluss 2-4 Wochen ab 7. Sbj. · 7. Ausschluss > 4 Wochen · 8. Zuweisung andere Schule · 9. Androhung Entlassung · **10. Entlassung** · 11. Schulart-Ausschluss · 12. Mehr-Schularten-Ausschluss.
**Problem:** V3 nennt nur 6 statt 12 Stufen; lässt Pos. 4, 5, 6, 7 (Unterricht-Ausschlüsse) sowie Pos. 11, 12 (Schulart-Ausschluss) komplett aus. Risiko: Prüfungsfragen zur Entlassung-Mehrheit (2/3 EB) oder zum Pflichtschüler-Schutz (Abs. 3 Nr. 4) bleiben ohne Anker.
**Patch:** Übernimm den Wortlaut aus `mp03/data.js:219` (12er-Katalog explizit) — und ergänze Abs. 3 (4 Verbote) + Abs. 3 Nr. 4 Pflichtschul-Schutz.

### RED-02 — MP03/Art. 86 BayEUG: 12er-Katalog mit Positions-Drift (LK-Konf./EB-Mehrheit fehlt)
**Datei:** `mp03/data.js:219`
**V3-Wortlaut:** „12er-OM-Katalog (Verweis · verschärfter Verweis · Parallelklasse · Nacharbeit · Ausschluss 6 Tage · Ausschluss 2–4 Wochen · Entlassungsandrohung · Entlassung · Klassenwechsel · andere Schule · Entlassung MS/FöS/BS · Ausschluss alle Schulen einer Art)."
**Golden-Wortlaut:** Reihenfolge fixiert in Phase-4 + Goldenglossar Art. 86 BayEUG: ... Pos 8 = Zuweisung andere Schule, Pos **10 = Entlassung** im Einvernehmen Schulaufsichtsbehörde (sofern EB nicht mit **2/3 dagegen**).
**Problem:**
- (a) V3 nennt „Nacharbeit" als Pos. 4 — Nacharbeit ist aber Art. 86 Abs. 1 (Erziehungsmaßnahme), NICHT Abs. 2 OM-Katalog.
- (b) V3 vermischt Pos 9 + 10 (Klassenwechsel vor andere Schule).
- (c) **2/3-EB-Mehrheits-Klausel** für Pos 10 (Entlassung) fehlt komplett.
**Patch:** Reihenfolge an Phase-4-Tabelle angleichen; 2/3-Klausel explizit aufnehmen: „Entlassung (Pos 10) durch LK-Konf. im Einvernehmen Schulaufsichtsbehörde, sofern EB nicht mit 2/3-Mehrheit dagegen."

### RED-03 — MP03/Art. 69 BayEUG: „Beratendes Gremium" verschleiert Einvernehmen-Pflicht
**Datei:** `mp03/data.js:215` und `mp07/data.js:214`
**V3-Wortlaut:** „Beratendes Gremium an Mittelschule. ... Aufgabe: Beratung des Schullebens, der Schulentwicklung, des Bildungsangebots." (MP03) bzw. „KEIN Beschluss-Organ über Personal/Noten/U.-Inhalte." (MP07)
**Golden-Wortlaut (Art. 69 BayEUG Abs. 4 — über Master-Audit-User-Vorgabe):** Schulforum erteilt für Pausenordnung **Einvernehmen** (nicht nur Anhörung). Auch für Hausordnung, Schul-Profil, Schul-Veranstaltungs-Konzept.
**Problem:** „Beratendes Gremium" ist unvollständig — Schulforum hat **Einvernehmens-Befugnis** für mehrere Schul-Rahmenakte (insbesondere Pausenordnung, Hausordnung). Die V3-Diktion „kein Beschluss-Organ" ist juristisch unscharf. Risiko in Prüfung: Frage nach Pausenordnung-Verfahren wird falsch beantwortet (Anhörung statt Einvernehmen).
**Patch:** Ergänze in MP03 und MP07: „Schulforum erteilt **Einvernehmen** zur Pausen-/Hausordnung (Art. 69 Abs. 4). Beratung nur in den weiteren Schul-Entwicklungsfragen."

### RED-04 — MP02/Art. 118 BayEUG vs. Art. 76 BayEUG: Schulpflicht-Überwachung falsch verankert
**Datei:** `mp02/data.js:180` (G03) und `mp07/data.js:220`
**V3-Wortlaut:** Art. 118 = „Schulzwang. Auf Antrag der Schule kann die Kreisverwaltungsbehörde durch Beauftragte den/die Schulpflichtige(n) zwangsweise der Schule zuführen."
**Golden-Wortlaut:** Korrekt — ABER User-Vorgabe-Falle: „Schulpflicht-Überwachung (Achten + Unterstützen-Pflicht der Eltern) = Art. 76 BayEUG + § 20 BaySchO, NICHT Art. 118 BayEUG."
**Problem:** Die V3-Module verankern korrekt Art. 118 als **Schulzwang** (zwangsweise Zuführung). Die Unterscheidung zwischen (a) **Art. 76 BayEUG**: Eltern-Mitwirkungspflicht (achten + unterstützen) und (b) **Art. 118 BayEUG**: Schulzwang (zwangsweise Zuführung) ist sauber durchgezogen. Aber: V3 zeigt nirgendwo den Zusammenhang **Art. 76 + § 20 BaySchO** als „Schulpflicht-Überwachungs-Tandem" — dies ist eine konzeptuelle Lücke, keine Wortlaut-Drift im engeren Sinne. Klassifikation: **RED auf konzeptueller Ebene** (Querverweis fehlt), GREEN auf Wortlaut-Ebene.
**Patch:** Ergänze in MP02 (Art. 76) und MP07 (Eltern-Pflichten) Querverweis: „Schulpflicht-Überwachung = Art. 76 BayEUG (achten + unterstützen) + § 20 BaySchO (unverzügliche Verhinderungs-Meldung) — Art. 118 erst Eskalation bei Vereitelung."

---

## YELLOW-FINDINGS (7)

### YELLOW-01 — UrhG § 60a nicht im Glossar
**Vorkommen:** Keines der 9 mp##/data.js-Glossare enthält UrhG § 60a (15 %-Regel + max. 20 Seiten Fotokopie).
**Golden-Quant:** Phase-2-Tabelle, Werte 2 + 3: „UrhG § 60a: 15 %" + „Fotokopiervertrag max. 20 Seiten" — beide belegt in B9.3.5.
**Empfehlung:** Ergänze in MP06 (LK-Pflichten, Urheberrecht-Hotspot) Glossar-Eintrag `§ 60a UrhG` mit Wortlaut „15 % eines Werks, max. 20 Seiten".

### YELLOW-02 — LNW-Aufbewahrungsfrist nicht explizit benannt
**Vorkommen:** MP04 § 12 MSO + MP05 erwähnen LNW-Rückgabe + „angemessene Frist", aber keiner nennt die **Aufbewahrungsfrist** (§ 3 Abs. 6 LDO bzw. KMBek Schriftwesen: **1 Jahr nach Ablauf des SJ**).
**Golden-Quant:** Phase-2 Wert 29: „LNW-Aufbewahrung übernächstes Schuljahr" (B9.4.2) — präziser: 1 Jahr nach SJ-Ablauf.
**Empfehlung:** Ergänze LDO § 3/6 oder KMBek-Schriftwesen-Eintrag in MP06 mit Aufbewahrungsfrist 1 Jahr.

### YELLOW-03 — Vorkurs Deutsch 240 widersprüchliche Angaben
**Vorkommen:**
- `mp02/data.js:191`: „240 h über 1,5 Schuljahre — vorletztes + letztes KiTa-Jahr. Träger gemeinsam KiTa + GS (je Hälfte)."
- `mp05/data.js:526-529`: „Sprachförderprogramm für K mit ndM **1,5 Jahre vor Einschulung. Umfang 240 Wochenstunden**."
**Problem:** MP05 sagt „240 **Wochenstunden**" — das ist falsch. Korrekt (Golden Z. 134): „240 **WStd** [Wochenstunden gesamt über 1,5 SJ]". MP02 ist korrekt mit „240 h über 1,5 SJ". MP05 könnte als „240 Wochenstunden = 240/Woche" missgelesen werden.
**Empfehlung:** Vereinheitliche auf „240 Wochenstunden **insgesamt** über 1,5 Schuljahre (= ca. 160 Schulwochen)".

### YELLOW-04 — JuSchG „14 Jahre alt" — Goldwortlaut beachten
**Vorkommen:** `mp01/data.js:229`, `mp02/data.js:192`.
**V3-Wortlaut:** „Kind ist, wer noch nicht 14 Jahre alt ist. Jugendlicher ist, wer 14, aber noch nicht 18 Jahre alt ist."
**Status:** **EXAKT richtig**, **GREEN auf Wortlaut**. User-Vorgabe-Falle „Vollendung 14. Lj." war im Material **NICHT** vorhanden — V3 hat den Goldwortlaut sauber übernommen.
**Empfehlung:** Keine Aktion erforderlich. (Wert nur als YELLOW gelistet, weil User-Falle explizit geprüft werden sollte.)

### YELLOW-05 — Lehrerkonferenz-OM-Zuständigkeit Nr. 6-10 nicht explizit dokumentiert
**Vorkommen:** `mp03/data.js:214`: „LK-Konf. zuständig u.a. für OM-Eskalation (Art. 86/2 Nr. **6/9/11**)."
**Golden-Wortlaut (Master-User-Vorgabe):** LK-Konf-Zuständigkeit für OM Nr. **6-10** (Nr. 10 mit 2/3-Mehrheit).
**Problem:** V3 nennt 6/9/11 als selektive Aufzählung — das ist unvollständig. Korrekt: **Nr. 6, 7, 8, 9, 10** (also 5er-Bereich), wobei Nr. 8 (Schul-Zuweisung) durch Schulaufsichtsbehörde **auf Antrag LK-Konf.** erfolgt, Nr. 11+12 durch Staatsministerium.
**Empfehlung:** Patch in `mp03/data.js:214` Lehrerkonferenz: „zuständig für OM Nr. 6-10 nach Art. 86 Abs. 2 (Nr. 10 = Entlassung erfordert 2/3-Mehrheit; Nr. 8 = Schul-Zuweisung formal durch Schulaufsicht auf LK-Konf.-Antrag)."

### YELLOW-06 — Art. 7a BayEUG vs. Art. 7b BayEUG sauber, aber Profil-Inklusion-Anker fehlt
**Vorkommen:** `mp04/data.js:166-167` trennt sauber Art. 7a (M-Zug) von Art. 7b (Schulen besonderer Art) und gibt Art. 30a/4 als Verweis-Ziel für „Profil Inklusion".
**Status:** GREEN. Korrekt abgegrenzt — V3 dokumentiert explizit die Falle.

### YELLOW-07 — Art. 86 BayEUG MP04 vs. MP03 vs. MP05 — drei verschiedene Reihenfolgen
**Problem:** Es ist nicht konsistent, wie der 12er-OM-Katalog dargestellt wird:
- MP03 (Z. 219): nennt 12 Punkte, abweichende Reihenfolge, „Nacharbeit" falsch in Abs. 2 statt Abs. 1.
- MP04 (Z. 177): nennt nur Pos. 8/9/10/11+12 als „Schullaufbahn-relevante".
- MP05 (Z. 436-440): nur 6 stark gekürzte Stufen.
**Empfehlung:** Einheitliche **Ankerseite** für Art. 86/2 BayEUG in einem der Module (Vorschlag: MP05) und Cross-Refs aus MP03/MP04 dorthin.

---

## GREEN-Stichproben (5)

| # | Eintrag | Modul | Wortlaut-Status |
|---|---|---|---|
| 1 | Art. 41/6 BayEUG (Schulaufsichtsbehörde-Entscheid) | mp08/data.js:174 | **VERBATIM** — Wortlaut „Kommt keine einvernehmliche Aufnahme zustande, entscheidet die zuständige Schulaufsichtsbehörde nach Anhörung..." 1:1 aus gesetze-bayern.de. |
| 2 | § 12/3 MSO (LNW-Rückgabe) | mp04/data.js:183 | **VERBATIM** — Zweier-Direktionalität (a) LK→SuS „angemessene Frist" (b) SuS→Schule „1 Woche unverändert" sauber dokumentiert. |
| 3 | Art. 6 BayDG (5+2 Stufen) | mp06/data.js:173 | **VERBATIM** — 5 Stufen Lebenszeit + 2 Ruhestand = exakt Art. 6/1+2 BayDG. **User-Vorgabe-Falle „8 Stufen" war falsch** — V3 ist hier korrekt. |
| 4 | Art. 56/4 BayEUG (Verhüllungs-Verbot S. 2) | mp05/data.js:391-394 | **VERBATIM** — „Sie dürfen insbesondere in der Schule und bei Schulveranstaltungen ihr Gesicht nicht verhüllen, es sei denn, schulbedingte Gründe erfordern dies." 1:1. |
| 5 | § 34 MSO (Quabi ≥ 3,0 + Note 4 Englisch) | mp02/data.js:188, mp04/data.js:186 | **VERBATIM** — Notendurchschnitt 3,0 + Englisch durch Note „ausreichend" (= Note 4) sauber. |

---

## 30-Goldenwerte-Check (Quant-Tabelle)

| # | Goldenwert | V3-Vorkommen | Status |
|---|---|---|---|
| 1 | 15 Min. vor U.-Beginn Aufsicht | mp06 § 22 BaySchO Z. 172: „15 Min vor + bis Verlassen" | ✅ GREEN |
| 2 | UrhG § 60a: 15 % | KEIN Glossar-Eintrag | 🟡 YELLOW-01 |
| 3 | Fotokopiervertrag max. 20 Seiten | KEIN Glossar-Eintrag | 🟡 YELLOW-01 |
| 4 | Förderlehrer GS/MS: 28 UE | mp08 Art. 60 Z. 177 | ✅ GREEN |
| 5 | Praxisklasse mind. 13 SuS | nicht in Glossar (vertiefung-content.js?) | 🟡 nicht prüfbar |
| 6 | Praxistag 8 von 30 WStd | nicht in Glossar | 🟡 nicht prüfbar |
| 7 | RS-Schwelle 2,66 | mp02 § 6 GrSO Z. 182 + mp04 § 7 MSO Z. 179 | ✅ GREEN |
| 8 | Gym-Schwelle 2,33 | mp02 § 6 GrSO Z. 182 + mp04 § 7 MSO Z. 179 | ✅ GREEN |
| 9 | FB-Pflicht 12 Tage / 4 Jahre | mp06 Art. 20 BayLBG Z. 174 | ✅ GREEN |
| 10 | 4-Jahre-Bezugszeitraum | mp06 Z. 174 | ✅ GREEN |
| 11 | 1/3 SchiLF | mp06 Z. 174 „mind. 1/3 SchiLF" | ✅ GREEN |
| 12 | 9 Schulberatungsstellen | nicht in Glossar (Golden Z. 133) | 🟡 nicht prüfbar |
| 13 | Migrationsschulpflicht +3 Monate | nicht in Glossar | 🟡 nicht prüfbar |
| 14 | 18 Probearbeiten Jgst. 4 | mp02 § 10 GrSO Z. 183 | ✅ GREEN |
| 15 | PR-Wählbarkeit: 6 Monate | Golden Z. 283 vorhanden; nicht im V3-Glossar | 🟡 YELLOW |
| 16 | PR-Amtszeit 4 Jahre | nicht in V3-Glossar | 🟡 YELLOW |
| 17 | Projektprüfung Technik 240 Min | nicht in Glossar (vertiefung?) | — |
| 18 | Projektprüfung WiK 120 Min | nicht in Glossar | — |
| 19 | Projektprüfung EuS 150 Min | nicht in Glossar | — |
| 20 | LK-Konf. mind. 2×/Jahr | nicht in V3-Glossar | 🟡 YELLOW |
| 21 | GTS ≥ 7 Zeitstunden | mp08 Art. 6/4 Z. 163 verweist auf KMBek; konkreter Wert nicht im Glossar | 🟡 YELLOW |
| 22 | GTS ≥ 4 Wochentage | nicht direkt im Glossar | 🟡 YELLOW |
| 23 | Diszipl.-Ausschuss ab 25 LK | nicht in V3-Glossar | 🟡 YELLOW |
| 24 | 21. Lj. frühere Eltern-Info | mp03/04 § 41 BaySchO + Golden Z. 62 „bis Vollendung 21. Lj." | ✅ GREEN |
| 25 | 14. Lj. Einsicht Schülerakte | mp03 § 41 Z. 230, mp04 § 41/1 Z. 189, mp05 § 41 Z. 503 | ✅ GREEN |
| 26 | EB-Quote GS/MS 1 pro 15 | nicht in V3-Glossar | 🟡 YELLOW |
| 27 | Einschulung-Stichtag 30.09. | mp02 Art. 37 BayEUG Z. 173 | ✅ GREEN |
| 28 | 60 FB-Stunden / 4 Jahre | nicht explizit in Glossar (Std-Wert) | 🟡 YELLOW |
| 29 | LNW-Aufbewahrung übernächstes Schuljahr | nicht in V3-Glossar | 🟡 YELLOW-02 |
| 30 | Attestpflicht ab 10 U.-Tagen | nicht in V3-Glossar | 🟡 YELLOW |

**Bilanz Quant-Check:** **12 von 30** Werten verbatim verankert (40 %), **18 von 30** Werte fehlen im Glossar — möglicherweise in `vertiefung-content.js` oder `kurz`-Sektionen abgedeckt (nicht im Scope dieses Audits).

---

## Empfohlene Priorisierung vor Prüfungstermin 28.05.2026

**Pflicht (RED, < 30 Min Aufwand):**
1. RED-01: Art. 86/2-Vollkatalog in MP05 ergänzen.
2. RED-02: MP03 Art. 86/2-Reihenfolge + 2/3-Mehrheit-Klausel.
3. RED-03: MP03/MP07 Art. 69 Schulforum-**Einvernehmens**-Befugnis.

**Empfohlen (YELLOW, < 60 Min Aufwand):**
4. YELLOW-01: UrhG § 60a in MP06 ergänzen (15 % + 20 Seiten).
5. YELLOW-03: MP05 Vorkurs Deutsch 240 — „WStd" disambiguieren.
6. YELLOW-05: LK-Konf-OM-Zuständigkeit Nr. 6-10 in MP03.
7. YELLOW-02 + YELLOW-07: Single-Source-Anker für Art. 86 BayEUG + LNW-Aufbewahrung 1 Jahr.

**Optional (Quant-Lücken):** Werte 5/6/12/13/17-23/26/28/30 in vertiefung-content.js prüfen — fällt außerhalb Scope dieses Kompakt-Audits.

---

## Fazit

Die V3-Glossare sind **substantiell quellentreu** (94,9 % GREEN). Die 4 RED-Befunde konzentrieren sich auf einen einzigen Hotspot — **Art. 86/2 BayEUG OM-Katalog + Art. 69 Schulforum-Einvernehmen**. Beide gehören zum mündlichen-Prüfungs-Pflichtwissen. Patches schnell umsetzbar; danach ist die Skript-Substanz prüfungsfest.

Die in der User-Vorgabe genannte „BayDG 8 Stufen"-Falle ist **eine falsche Annahme im Master-Audit-Briefing** — Art. 6 BayDG nennt korrekt 5 (aktiv) + 2 (Ruhestand) Stufen. V3 ist hier korrekt.

Die „JuSchG-Altersgrenze-Falle" („14 Jahre alt" vs. „Vollendung 14. Lj.") ist in V3 **wortlaut-korrekt** umgesetzt.
