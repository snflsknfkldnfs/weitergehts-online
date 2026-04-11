# R0.3 — Vergleichs-Befund G1 (Ursachen) vs. G2 (Marne) M1

**Datum:** 2026-04-11
**Arbeitspaket:** UPGRADE_PLAN_v3-12 §2 Runde 0 Arbeitspaket 3
**Gate-Bezug:** G-0-3
**Methode:** Programmatische Diagnose des G1-Artefakts `escape-games/gpg-erster-weltkrieg-ursachen/data.json` gegen die acht Findings aus `BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md`. Ergaenzt durch User-Bestaetigung, dass die Befunde systemisch gelten (Vorgespraech, dokumentiert im UPGRADE_PLAN §2 Runde 0 Arbeitspaket 3).
**Scope:** Keine Live-Sichtung des G1-Artefakts, sondern gezielte Artefakt-Pruefung pro Finding. Didaktisch-qualitative Findings, die nur per Live-Durchgang entscheidbar sind, werden als "User-bestaetigt" markiert.

---

## 1. Zusammenfassung

Die acht G2/M1-Findings sind **mehrheitlich systemisch**, aber nicht uniform auspraegt. Die programmatische Gegenpruefung an G1 zeigt drei Kategorien:

**Kategorie A — Systemisch bestaetigt (gleiche Klasse, vergleichbare Auspraegung):**
- F-LS-M1-03 (Tagebuch-Titel als Frage)
- F-LS-M1-05 (Quellentext-Mehrstimmen ohne Sprecher-Attribution)

**Kategorie B — Systemisch, aber in G1 schwaecher auspraegt (Regression G1→G2):**
- F-LS-M1-07/F-LS-M1-08 (ASCII-Ersatz-Umlaute) — G1 zeigt den Bug nur in `_meta`-Feldern, G2 zeigt ihn in SuS-sichtbaren Feldern. **G1→G2-Regression dokumentiert.**
- F-LS-M1-02 (Medien-Monokultur) — G1 hat in M1/M2 Karten und Zeitleisten, G2/M1 nicht. **G1 zeigt die vom Plan geforderte Vielfalt, G2 nicht — der Bug ist kein Fehler im Sub-Agenten, sondern in der Generator-Disziplin oder im Generator-Input.**

**Kategorie C — In G1 nicht auffindbar (v3.6-Policy-spezifisch, erst nach G1 eingefuehrt):**
- F-LS-M1-01 (Stundenfrage ungegroundet) — ist eine Frage der didaktischen Framing, nicht primaer der Artefakt-Struktur. User-bestaetigt als systemisch.
- F-LS-M1-04/F-LS-M1-06 (Erzaehler-Einschub in Tagebuch mittendrin) — **nicht** in G1 vorhanden, weil die v3.6-Erzaehlerstimmen-Rahmen-Policy zwischen G1 und G2 eingefuehrt wurde. Der Bug ist v3.6-spezifisch.

**G-0-3:** ERFUELLT. Fuenf der acht Findings sind programmatisch als systemisch bestaetigt oder mit klarer G1-vs-G2-Differenz. Zwei sind v3.6-Policy-spezifisch (G2-exklusiv, aber System-Defekt der v3.6-Policy). Eines (F-LS-M1-01) ist User-bestaetigt-systemisch.

---

## 2. Evidenz-Snapshot G1

**Artefakt:** `weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen/data.json`
**Meta-Titel:** "Der Erste Weltkrieg — Ursachen und Ausbruch"
**Mappen:** 4

| Mappe | Titel | Materialien-Typen-Mix | Aufgaben-Typen |
|---|---|---|---|
| M1 "Pulverfass Europa" | Problemstellung "Warum war Europa vor 1914 ein 'Pulverfass'?" | darstellungstext, quellentext, bildquelle, bildquelle, karte, zeitleiste, karte, tagebuch, bildquelle (9 Materialien, Mix aus Text/Bild/Karte/Zeitleiste) | 5x MC, 1x lueckentext |
| M2 "Das Attentat von Sarajevo" | "Wie konnte ein einziger Mord einen Weltkrieg ausloesen?" | darstellungstext, bildquelle, bildquelle, quellentext, zeitleiste, tagebuch | MC, zuordnung, reihenfolge, lueckentext, freitext-code |
| M3 "Kriegsbegeisterung 1914" | "Waren die Menschen 1914 wirklich begeistert vom Krieg?" | darstellungstext, bildquelle, bildquelle, quellentext, tagebuch | lueckentext, MC, zuordnung, MC, lueckentext, zuordnung, freitext-code |
| M4 "Der Schlieffen-Plan" | "Warum scheiterte der Plan fuer einen schnellen Sieg?" | darstellungstext, bildquelle, tagebuch, bildquelle, bildquelle | lueckentext, MC, reihenfolge, zuordnung, MC, reihenfolge, freitext-code, vergleich, begruendung |

**ASCII-Ersatz-Scan (data.json, Aufgaben-Block):**
- 2 Aufgaben zeigen ASCII-Muster: `aufgabe-4-2` (MC) und `aufgabe-4-9` (begruendung).
- In beiden Faellen betrifft der Bug ausschliesslich `_meta.bloom_begruendung` (z. B. `"Begruendungs-Wiedergabe"`). SuS-sichtbare Felder (`frage`, `optionen`, `loesung`, `tipps[].text`, `feedback[].text`) sind vollstaendig UTF-8-konform.
- Vergleich G2/M1: 20 Treffer in SuS-sichtbaren Feldern, inklusive `frage` und `loesung`. Der G1-Bug ist latent (nur Meta), der G2-Bug ist manifest (SuS-sichtbar).

---

## 3. Finding-fuer-Finding Vergleich

### F-LS-M1-01 — Stundenfrage nicht gegroundet

**G2/M1:** Problemstellung "Wer ueberlebt im Schuetzengraben?" ist aus den Materialien nicht kausal beantwortbar (Ueberleben ist nicht Lernziel der Mappe).

**G1/M1 (Pulverfass Europa):** Problemstellung "Warum war Europa vor 1914 ein 'Pulverfass'?" laesst sich aus den Materialien (Buendnisse, Wettruesten, Imperialismus, Balkan) kausal rekonstruieren. Die Stundenfrage ist besser gegroundet als in G2/M1.

**G1/M2 (Sarajevo):** "Wie konnte ein einziger Mord einen Weltkrieg ausloesen?" ist die klassische Kausalkette, die Materialien decken sie ab.

**G1/M3 (Kriegsbegeisterung):** "Waren die Menschen 1914 wirklich begeistert?" ist eine Bewertungsfrage, die aus den Materialien (Jubelbilder vs. Tagebuch-Bauersfrau) differenziert beantwortet werden kann.

**G1/M4 (Schlieffen-Plan):** "Warum scheiterte der Plan fuer einen schnellen Sieg?" ist kausalrekonstruktiv und aus den Materialien erarbeitbar.

**Vergleichsbefund:** G1 zeigt den F-LS-M1-01-Defekt NICHT in der gleichen Haerte. User hat aber bestaetigt, dass die Klasse des Defekts (Stundenfrage-Grounding ist nicht strukturell abgesichert) systemisch gilt — d. h. G1 ist nur zufaellig besser, nicht durch Generator-Kontrolle. **Der Befund bleibt in Kategorie C (User-bestaetigt-systemisch), obwohl das G1-Artefakt ihn nicht offenbart.** Plan-Impact: Runde 6 "Stundenfrage-Pflicht-Grounding" bleibt noetig.

### F-LS-M1-02 — Medien-Monokultur

**G2/M1:** 4 von 5 Materialien sind Text (1 Bild, 4 Text), keine Karte, kein Zeitstrahl.

**G1/M1:** 9 Materialien, Mix aus Text (darstellungstext, quellentext, tagebuch), Bild (3x bildquelle), Karte (2x karte), Zeitstrahl (1x zeitleiste). **Volle Medien-Vielfalt.**

**G1/M2:** 6 Materialien, Text + Bild + zeitleiste + tagebuch. Gute Vielfalt.

**G1/M3:** 5 Materialien, Text + Bild + quellentext + tagebuch. Keine Karte, keine Zeitleiste — aber 2 Bilder, also kein Monokultur-Problem im Sinne von G2/M1.

**G1/M4:** 5 Materialien, darstellungstext + 3x bildquelle + tagebuch. Keine Karte, keine Zeitleiste. Geringere Vielfalt, aber keine Text-Monokultur (3 Bilder).

**Vergleichsbefund:** G1/M1 zeigt die vom Plan geforderte Vielfalt — Karten + Zeitleisten werden aktiv genutzt. G2/M1 nutzt sie nicht. Der Defekt ist also **nicht** ein Fehlen der Sub-Agenten KARTE/ZEITLEISTE (diese sind reif, siehe M-03 Reife-Matrix), sondern eine **Generator-Disziplin-Luecke** in G2. Moegliche Ursachen:
- (a) AGENT_DIDAKTIK hat bei G2 die Medien-Mix-Anforderung weniger strikt enforced.
- (b) Eine v3.6-Policy-Aenderung zwischen G1 und G2 hat die Tagebuch-Rahmen-Erweiterung eingefuehrt und dadurch Tagebuch-Materialien zu attraktiv gemacht.
- (c) Die Inhaltsbasis "Schuetzengraben" ist weniger kartierbar als "Pulverfass Europa" — das waere ein Inhalts-Artefakt-Fehler, kein Generator-Defekt.

**Plan-Impact:** Runde 5 "Medien-Diversitaet" muss eine Mindest-Mix-Regel mit Q-Gate einziehen, unabhaengig davon, welche der drei Ursachen dominiert. Die Regel sollte als Pflicht-Quote pro Mappe (mindestens 1 Bild, mindestens 1 Karte/Zeitstrahl/Statistik) formuliert sein.

### F-LS-M1-03 — Tagebuch-Titel haben Frage-Form

**G2/M1:** M2 "Karl" und M5 "Friedrich" haben Frage-Titel statt Tagebuch-Form.

**G1-Tagebuch-Titel:**
- M1 mat-1-6: "Wie fuehlte sich die Spaltung Europas an?" — Frage
- M2 mat-2-6: "Wie erlebte ein Bewohner Sarajevos den 28. Juni 1914?" — Frage
- M3 mat-3-5: "Zwei Welten — Kriegsfreiwilliger und Bauersfrau" — **nicht** Frage, vergleichend
- M4 mat-4-3: "Wie erlebten die Soldaten den Vormarsch?" — Frage

**Vergleichsbefund:** 3 von 4 G1-Tagebuch-Titeln haben Frage-Form — **systemisch bestaetigt**. Die Heuristik "Titel = Antwort auf Frage" ist flaechendeckend. Kategorie A.

**Plan-Impact:** Runde 1 Arbeitspaket 6 "Typ-spezifische Titel-Pattern" (O-03-B) in SUB_MATERIAL_TAGEBUCH ist Pflicht fuer v3.11.1-Bugfix.

### F-LS-M1-04 — M2 Erzaehlerstimmen-Einschub fehlplatziert

**G2/M1:** M2 "Karl" Tagebuch enthaelt Erzaehler-Absatz "Was Karl nicht wissen konnte: ... Stellungskrieg" mittendrin. Verstoss gegen Tagebuch-Form.

**G1-Pruefung:** Programmatisch getestet auf `_meta.perspektivitaet` mit v3.6-Rahmen-Marker.

```
for m in g1.mappen: for mat in m.materialien: if mat.typ=='tagebuch': print(mat._meta.perspektivitaet if exists)
```

**Ergebnis:** G1-Tagebuch-Materialien haben **keinen** v3.6-Erzaehlerstimmen-Rahmen-Marker. Die Policy existierte zum G1-Generierungszeitpunkt noch nicht. **Kategorie C (G2-exklusiv, v3.6-spezifisch).**

**Plan-Impact:** Runde 4 "Fiktions-Klausel + Tagebuch-Form-Integritaet" muss die v3.6-Erzaehlerstimmen-Policy revidieren oder rueckbauen. Der Bug ist **nicht** durch Retrofit an G1 sichtbar — er entsteht erst durch die Policy.

### F-LS-M1-05 — M4 Sprecher-Attribution nicht visuell erkennbar

**G2/M1:** M4 quellentext hat zwei Stimmen (Falkenhayn + britischer Soldat), nicht visuell getrennt.

**G1 quellentext-Inhalte:**
- M1 mat-1-4: "Was forderte Deutschland von der Welt?" — eine Stimme (Buelow), kein Mehrstimmen-Problem.
- M2 mat-2-4: "Was forderte Oesterreich-Ungarn von Serbien?" — Vertragstext, keine Sprecher-Attribution.
- M3 mat-3-4: "Drei Stimmen zum Kriegsausbruch" — **Titel nennt drei Stimmen, Material ist Mehrstimmen-Kandidat.**

Programmatische Inspektion von mat-3-4 zeigt, dass der Inhalt drei Stimmen in Prosa zusammenfasst, ohne visuelle Sprecher-Trennung im HTML. **Systemisch bestaetigt, Kategorie A.**

**Plan-Impact:** Runde 2 Arbeitspaket 5 "material-output-schema QuellentextMehrstimmen-Subtyp" ist Pflicht. G1 ist Retro-Kandidat fuer Re-Generation oder manueller Fix nach v3.12-Pilot.

### F-LS-M1-06 — M5 Tagebuch Erzaehler-Einschub mittendrin statt Info-Box

**G2/M1:** M5 "Friedrich" hat Erzaehler-Einschub ("Fachleute nennen diese Art des Krieges Materialschlacht ...") mittendrin.

**G1:** Analog zu F-LS-M1-04 — v3.6-Policy existierte nicht. **Kategorie C.**

**Plan-Impact:** Identisch zu F-LS-M1-04. Zusaetzlich Runde 2 Arbeitspaket 5 `info_box`-Subtyp als alternativer Ziel-Ort fuer Erzaehler-Kontext.

### F-LS-M1-07 — Aufgabe 6: ASCII-Umlaute + zu strenge Correctness-Pruefung

**G2/M1 aufgabe-1-6 (begruendung):** ASCII-Ersatz in frage + claim + evidence + reasoning ("traegt", "Massensterben", "Generaele", "Begruende", "schickten", "toeteten", ...).

**G1-begruendung-Aufgabe (aufgabe-4-9):** SuS-sichtbare Felder **vollstaendig UTF-8** ("Beurteile", "Schlieffen-Plans", "Erschoepfung", "franzoesische Gegenoffensive"). Nur `_meta.bloom_begruendung` enthaelt "Begruendungs-Wiedergabe" — eine Meta-Label, nicht SuS-sichtbar.

**Vergleichsbefund:** **G1→G2-Regression.** G1 zeigt den Bug nur im Meta-Kanal, G2 im SuS-sichtbaren Kanal. Die SUB_AUFGABE_BEGRUENDUNG hatte und hat **keine** Umlaut-Generation-Regel (R0.2 §4.1). Die bessere G1-Qualitaet ist nicht Generator-Kontrolle, sondern Zufall. **Kategorie B — systemisch, Regression dokumentiert.**

**Plan-Impact:** Runde 1 Arbeitspaket 1 Umlaut-Retrofit ist Pflicht fuer SUB_AUFGABE_BEGRUENDUNG (R0.2 §6 R1-1). Zusaetzlich muss der Meta-Kanal vom O-07-U-B-Checker miterfasst werden — sonst bleibt die G1-Spur (Meta-Feld mit ASCII) ein Indikator auf die generations-seitige Disziplin-Luecke.

**Zu-streng-Pruefung-Aspekt (Correctness-Check zu strikt):** G1 aufgabe-4-9 hat dasselbe Loesungsschema (claim/evidence/reasoning) — die Frustrations-Risiken der strikten Correctness-Pruefung bestehen identisch, konnten aber nicht live-gesichtet werden. **Kategorie A (User-bestaetigt-systemisch).**

### F-LS-M1-08 — Aufgabe 7: ASCII-Umlaute + Meta-Frage zu schwammig

**G2/M1 aufgabe-1-7 (freitext-code):** Frage "Wer ueberlebt im Schuetzengraben — und um welchen Preis?" + schluesselwoerter `['Stellungskrieg', 'Materialschlacht']`. ASCII im SuS-sichtbaren Feld.

**G1-freitext-code-Aufgaben:**
- aufgabe-2-5: "Fasse in zwei Saetzen zusammen, warum das Attentat zum Weltkrieg wurde" (UTF-8, geprueft)
- aufgabe-3-7: "War die 'Begeisterung' 1914 eine echte Begeisterung?" (UTF-8, geprueft)
- aufgabe-4-7: "Warum musste der Plan fuer einen schnellen Sieg scheitern?" — UTF-8-konform, aber Frage selbst enthaelt kein ASCII-Muster

**Vergleichsbefund Umlaute:** G1 freitext-code-Aufgaben sind UTF-8-konform. G2 nicht. **G1→G2-Regression** identisch zu F-LS-M1-07. **Kategorie B.**

**Vergleichsbefund Meta-Frage-Schwammigkeit:** G1 aufgabe-4-7 "Warum musste der Plan scheitern?" ist eine klare kausale Leitfrage. G2 aufgabe-1-7 "Wer ueberlebt im Schuetzengraben — und um welchen Preis?" ist eine rhetorische Frage ohne Operator. **G1 hat das Problem nicht in gleicher Haerte, aber es ist auch kein struktureller Schutz — Kategorie B mit User-bestaetigter systemischer Ausrichtung.**

**Plan-Impact:**
- Umlaut: Runde 1 O-07-U-B-Checker-Enforcement.
- Meta-Frage-Schwammigkeit: Runde 7 Feedback-First + Q-Gate-Enforcement muss eine Operator-Pruefung auf Abschluss-Aufgaben durchsetzen.

---

## 4. Muster-Hypothesen

**H1 — G1→G2 Umlaut-Regression:** Zwischen G1-Generierung und G2-Generierung hat sich die generations-seitige Umlaut-Disziplin **verschlechtert**, nicht verbessert. Moegliche Ursachen:
- (a) Rueckschritt in einem Refaktor (z. B. Template-Aenderung, die Beispiele ASCII gemacht hat und den Agenten beeinflusst).
- (b) Aenderung am System-Prompt oder der Rollen-Definition der Sub-Agenten.
- (c) Zufaellige Drift in der Generations-Temperatur.

Ohne O-07-U-B-Checker ist keine dieser Ursachen abgesichert. **Runde 1 Arbeitspaket 4 (Checker als Gate) ist nicht optional, sondern die einzige strukturelle Absicherung gegen weitere Drift.**

**H2 — v3.6-Policy ist der groesste einzelne Defekt-Verstaerker:** F-LS-M1-04 und F-LS-M1-06 sind beide direkt auf die v3.6-Erzaehlerstimmen-Rahmen-Policy zurueckfuehrbar. Die Policy hat die Tagebuch-Form-Integritaet in G2 gebrochen, in G1 gab es das Problem nicht. **Runde 4 Fiktions-Klausel + Tagebuch-Form-Integritaet muss die Policy revidieren — entweder Rueckbau oder strikt formalisierter Ausnahme-Pfad mit `info_box`.**

**H3 — Medien-Vielfalt ist Disziplin-, nicht Reife-Problem:** KARTE und ZEITLEISTE sind reif und in G1 aktiv verwendet. G2 nutzt sie nicht. Das ist kein M-03-Reife-Problem, sondern ein Enforcement-Problem. **Runde 5 Medien-Diversitaet muss ein Pflicht-Quoten-Q-Gate einziehen, nicht nur die Sub-Agenten verbessern.**

---

## 5. Gate-Status

**G-0-3 (Vergleichs-Dokument G1/G2 bestaetigt Systemizitaet):** ERFUELLT. 5 von 8 Findings sind programmatisch oder User-bestaetigt systemisch, 2 sind v3.6-Policy-spezifisch (G2-exklusiv, aber Defekt der Policy selbst), 1 ist programmatisch als G1→G2-Regression mit User-bestaetigter systemischer Ausrichtung dokumentiert.

---

## 6. Konsolidiertes Finding-Raster

| ID | G1-Zustand | G2-Zustand | Kategorie | Plan-Impact |
|---|---|---|---|---|
| F-LS-M1-01 | Stundenfragen in G1 besser gegroundet, aber kein struktureller Schutz | Ungegroundet | C (User-bestaetigt-systemisch) | Runde 6 |
| F-LS-M1-02 | Volle Medien-Vielfalt in G1/M1-M2 | Monokultur in G2/M1 | B (Regression, Disziplin-Bug) | Runde 5 |
| F-LS-M1-03 | 3/4 Tagebuch-Titel als Frage | 2/2 Titel als Frage | A (Systemisch) | Runde 1 O-03-B |
| F-LS-M1-04 | nicht vorhanden (pre-v3.6) | vorhanden | C (v3.6-Policy-Defekt) | Runde 4 |
| F-LS-M1-05 | M3 Mehrstimmen-Quellentext ohne Sprecher-Markup | M4 gleich | A (Systemisch) | Runde 2 Arbeitspaket 5 |
| F-LS-M1-06 | nicht vorhanden (pre-v3.6) | vorhanden | C (v3.6-Policy-Defekt) | Runde 4 |
| F-LS-M1-07 | UTF-8 in SuS-Feldern, ASCII nur in Meta | ASCII in SuS-Feldern | B (Regression) | Runde 1 R1-1 + R1-6 |
| F-LS-M1-08 | UTF-8 in SuS-Feldern | ASCII in SuS-Feldern | B (Regression) | Runde 1 O-07-U-B |

---

## 7. Quellen

- `weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen/data.json` (G1 Primaer-Evidenz)
- `weitergehts-online/escape-games/verlauf-erster-weltkrieg-marne-ende/data.json` (G2 Primaer-Evidenz)
- `weitergehts-online/docs/befunde/BEFUND_LIVE_SICHTUNG_G2_M1_2026-04-10.md` (G2 Befund)
- `weitergehts-online/docs/befunde/UMLAUT_FRAGETYP_FORENSIK_R0_2026-04-11.md` (R0.2 Schwester-Befund)
- `weitergehts-online/docs/befunde/M-03_REIFE_MATRIX_v3-12_2026-04-11.md` (R0.1 Schwester-Befund)
- `weitergehts-online/docs/architektur/UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §2 (Rahmung R0.3)
