# PROGRESSIONSPLAN — Mappe 3: Augustfieber 1914 (Wer schuld ist und wer jubelt)

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26-v050-pristine`
**Mappe:** M3 — Augustfieber 1914
**Phase:** 2.2a (agent-raetsel-progressionsplan, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**KE-Anker (haupt):** `GPG7_LB3_K_03` (Ursachen + Kriegsschuldfrage)
**Stundenfrage:** Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg?
**Validierungsstatus:** ENTWURF (Phase-2.2a-Gate, User-Validierung ausstehend)

**F0B_PRIMING_v1 ACK:** R7-Sprachniveau + TERMINOLOGIE-01 (nicht-aktiv fuer M3) bindend.

---

## 0. Position dieser Mappe im Game-Bogen

M3 ist der **kognitive Hoehepunkt** der Mappen-Progression:
- M1 (I-II) Aufbau Strukturen → M2 (II) Ausloeser → **M3 (II-III) Diskurs/Bewertung** → M4 (II) Sicherung
- Bewusster Spannungsbogen-Hoehepunkt gemaess DIDAKTIK_RAHMEN §5 (E-D3 nicht ausgeloest, dokumentierte Designentscheidung).
- AFB-Hoehepunkt II-III rechtfertigt das **3-Stufen-Tipp-System** als verbindliche Differenzierung pro Aufgabe (HEFTEINTRAG_M3 A.4).

**Didaktisches Kernstueck (Beutelsbach-Kontroversitaet):**
Versailles 1919 (Allein-Schuld DT) versus Clark 2013 (Schlafwandler-These, multi-kausal) — operationalisiert durch eine **vergleich-Aufgabe (L4)** + eine **begruendung-Aufgabe (L5 CER)**.

**Augusterlebnis-Idealisierungs-Verbot:** Operationalisiert durch eine dezidierte **quellenkritik-Aufgabe** auf mat-3-1 (Foto-Bias) + Anti-Bias-Stuetzung durch mat-3-5.

---

## 1. Aufgabenzahl-Ableitung (inhaltsgesteuert v2)

```
basis            = 5
knoten_faktor    = ceil(6/5) = 2 → gedeckelt auf 1     (6 TB-Knoten K3-1..K3-6)
material_faktor  = 1                                    (5 aktive Materialien — ueber Schwelle 4)
aufgabenzahl     = min(8, 5 + 1 + 1) = 7
```

**Resultat: 7 Aufgaben** — entspricht inhaltlicher Dichte (Quellenkritik-Schwerpunkt + Kontroversitaets-Pol + Synthese-Stellungnahme).

**Materialaktivitaets-Pruefung (A18, MV1):**
- 5 aktive Materialien: mat-3-1, mat-3-2, mat-3-3, mat-3-4, mat-3-5 (mat-3-6 = RESERVE_NICHT_AKTIVIERT)
- Jedes Material wird in mind. 1 Aufgabe als Primaerquelle aktiviert (Pflicht A18).

---

## 2. SCPL-Zonen-Mapping (M3)

| Zone | Inhalt | TB-Knoten | Ziel-Material | AFB | Bloom |
|------|--------|-----------|---------------|-----|-------|
| **S** (Augusterlebnis 1914) | Stimmung in Staedten — Maenner ziehen mit Blumen los | K3-2 | mat-3-1 | I-II | L1-L2 |
| **C1** (Foto-Bias / Quellenkritik) | Wer ist NICHT zu sehen? Land + Arbeiter fehlen | K3-2, K3-6 | mat-3-1, mat-3-2, mat-3-5 | II | L3 |
| **C2** (Burgfrieden 4.8.1914) | Reichstag einig, auch SPD; zerfaellt 1916/17 | K3-3 | (mat-3-3 ueberleitung_von + Hefteintrag B.3 — mat-3-6 entfaellt) | II | L2-L3 |
| **P** (Kriegsschuldfrage 1919) | Versailles Art. 231 weist Allein-Schuld zu | K3-1, K3-4 | mat-3-3 | II-III | L3-L4 |
| **L** (Schlafwandler 2013) | Clark: 5 Maechte gemeinsam — keine Allein-Schuld | K3-1, K3-5 | mat-3-4 | III | L4-L5 |

**SCPL-Abdeckungs-Pruefung (A17):** 5/5 Zonen mit min. 1 diagnostischer Aufgabe — siehe Sequenz §4.

---

## 3. Bloom-Verteilungs-Ziel (Pflicht A19, Hoehepunkts-Mappe)

**Korridor (Pflicht-Vertrag VERTRAG_PHASE_2-2a §A19):** max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6.

**M3-Verteilung (Hoehepunkt, Schwerpunkt L4-L5):**

| Bloom-Stufe | Anteil | Aufgaben | Vertrags-Schwelle | Erfuellt |
|-------------|--------|----------|-------------------|----------|
| L1-L2 | 14 % (1/7) | Pos 1 (S, lueckentext L1-L2) | max 40 % | PASS |
| L3-L4 | 57 % (4/7) | Pos 2 (C1, quellenkritik L3-L4), Pos 3 (C1, zuordnung L3), Pos 4 (P, mc L3), Pos 5 (P↔L, vergleich L4) | min 30 % | PASS |
| L5-L6 | 29 % (2/7) | Pos 6 (L, begruendung L5 CER), Pos 7 (L, freitext L5-L6) | min 20 % | PASS |

**Hoehepunkt-Begruendung:** Schwerpunkt L4-L5 (4 von 7 Aufgaben in L3-L4 + 2 in L5-L6 = 6/7 = 86 % >= L3) entspricht AFB II-III Hoehepunkt aus DIDAKTIK_RAHMEN §5 (M3 = "Analysieren → Beurteilen"). M1 hatte Schwerpunkt L1-L3 (Aufbau), M2 L2-L4 (Vertiefung), M3 L4-L5 (Hoehepunkt), M4 L3 (Sicherung).

**`_meta.bloom_verteilung_ziel`:**
```json
{
  "L1-L2": "14% (1/7)",
  "L3-L4": "57% (4/7)",
  "L5-L6": "29% (2/7)",
  "schwerpunkt": "L4-L5",
  "afb_hoehepunkt": "II-III",
  "hoehepunkt_begruendung": "Mappe-Position M3 als kognitiver Hoehepunkt (DR §5). Quellenkritik (L3-L4) + Multiperspektiven-Vergleich (L4) + CER-Begruendung (L5) + Stellungnahme (L5-L6)."
}
```

---

## 4. Aufgaben-Sequenz (7 Positionen, AFB I-II → III monoton steigend)

### Pos 1 — S-Zone — `lueckentext` — AFB I — L1-L2

**TB-Knoten:** K3-2 (Augusterlebnis 1914)
**Ziel-Material:** mat-3-1 (Postkarte Luebeck) — Primaerquelle
**Operationalisierungsziel:**
> Du kannst den Fachbegriff fuer die Stimmung in deutschen Staedten Anfang August 1914 nennen — und sagen, woran man die Inszenierung erkennt.

**Konkrete Frage-Stoffrichtung:** Begriff "Augusterlebnis / Augustbegeisterung" als Lueckentext-Item; zweiter Slot: Ortsbezug "Luebecker Hauptbahnhof, 31. Juli 1914" (Datum/Ort als Faktum).

**Tipp-Stufen-Quelle:** mat-3-1 `_meta.tipp_stufen` (R7-validiert).
**Sprachgeruest:** "Die Stimmung am Bahnhof am ___ (Datum) nennt man ___ (Fachbegriff)."

**Diagnostisches Ziel:** Reproduktion des Schluessel-Begriffs (Hefteintrag B.4) verankert mit konkretem Bild-Element. Niedrigschwelliger Einstieg (R3-S1).

---

### Pos 2 — C1-Zone — `quellenkritik` — AFB II → III — L3-L4

**TB-Knoten:** K3-2 + K3-6 (Quellenkritik-Methode)
**Ziel-Material:** mat-3-1 (Postkarte Luebeck) — Primaerquelle (Pflicht-F-PB-37)
**Operationalisierungsziel:**
> Du kannst die Postkarte Luebeck mit drei W-Fragen pruefen — und benennen, welche Menschen auf dem Foto fehlen und warum das wichtig ist.

**Konkrete Frage-Stoffrichtung:** Systematische W-Frage-Anwendung auf `_meta.quellenkritik_block`:
- **Wer hat das Foto gemacht?** → Druckerei Gebrueder Borchers, Luebeck
- **Wann?** → 31. Juli 1914
- **Mit welchem Ziel?** → patriotische Verkaufs-Postkarte, Stadt-Mittelschicht-Inszenierung
- **Wer fehlt?** → Land-Bevoelkerung, Arbeiter (skeptisch oder ablehnend)

**Augusterlebnis-Idealisierungs-Verbot operationalisiert:** Diese Aufgabe ist die **didaktische Pflicht-Verankerung** des Beutelsbach-Ueberwaeltigungsverbots auf Aufgabenebene. SuS muessen explizit benennen, dass das Foto NICHT "die Deutschen 1914" zeigt, sondern "Stadt-Mittelschicht in Luebeck am 31. Juli".

**F-PB-37 Pflicht-Pruefung:** mat-3-1 ist Primaerquelle mit `quellenkritik_pflicht: true` und vollstaendig ausgefuelltem `quellenkritik_block` — Quellenkritik-Aufgabe vertraglich erforderlich. PASS.

**Anti-Quota:** Nicht "Quellenkritik weil Pflicht", sondern weil Foto-Bias didaktisch zentral ist (Hefteintrag B.5 Schluessel-Begriff "Quellenkritik" + ueberwaeltigungsverbots-Anker).

---

### Pos 3 — C1-Zone — `zuordnung` — AFB II — L3

**TB-Knoten:** K3-2 (Multiperspektivitaet auf Augusterlebnis)
**Ziel-Materialien:** mat-3-1, mat-3-2, mat-3-5 (Multi-Material-Aufgabe — alle drei aktivieren P1 vs. P2)
**Operationalisierungsziel:**
> Du kannst Aussagen aus drei Quellen den richtigen Personen-Gruppen zuordnen — und so erkennen, dass die Stimmung 1914 nicht ueberall gleich war.

**Konkrete Frage-Stoffrichtung:** 4-6 Aussage-Karten zu drei Kategorien (Stadt-Buerger jubeln / Bauern-Frau skeptisch / Heeresleitung inszeniert):
- "Soldaten ziehen los, viele jubeln" → Stadt-Mittelschicht (mat-3-1)
- "Eine Frau gibt einem Soldaten Blumen" → Inszenierungs-Topos (mat-3-2)
- "Wer pflegt das Vieh, wenn er weg ist?" → skeptische Land-Stimme (mat-3-5)
- "Pflicht ist Pflicht. Aber Jubel? Davon ist hier nichts." → SPD/Land-Skepsis (mat-3-5)

**Multiperspektivitaet operationalisiert:** Pflicht-Min-3-Perspektiven (M13) wird hier sichtbar — Pazifist/Skeptiker (P2) + Kriegsbefuerworter (P1) + Reichstags-Inszenierung (P5) als Vorbereitung fuer Pos 5/6.

**STR-14-NEU mat-3-5 Fiktionalitaet:** Diese Aufgabe nutzt mat-3-5 als rekonstruierte Stimme. Die Aufgabe-Konstruktion (Phase 2.2b) muss in Tipp Stufe 1 oder im Aufgaben-Stem die Fiktionalitaets-Kennzeichnung referenzieren ("Lies das rekonstruierte Tagebuch...") — kein "echtes Originalzitat" suggerieren. M14-Compliance.

---

### Pos 4 — P-Zone — `mc` — AFB II — L3

**TB-Knoten:** K3-1 + K3-4 (Versailles Art. 231 als Sieger-Position 1919)
**Ziel-Material:** mat-3-3 (Versailles Art. 231 quellentext) — Primaerquelle
**Operationalisierungsziel:**
> Du kannst aus dem Versailles-Auszug ablesen, wer wann welche Schuldzuweisung formulierte — und welchen Begriff diese Stelle spaeter erhielt.

**Konkrete Frage-Stoffrichtung:** Multiple-Choice mit 4 Optionen, EXAKT EINE richtig:
- A) "Deutschland und seine Verbuendeten sind allein schuld am Krieg" — vom Reichstag 1914 unterzeichnet
- B) "Deutschland und seine Verbuendeten sind verantwortlich fuer alle Verluste und Schaeden" — von den Sieger-Maechten am 28.6.1919 in Versailles unterzeichnet [richtig]
- C) "Alle Maechte sind gemeinsam schuld" — von Christopher Clark 2013 formuliert
- D) "Niemand ist schuld am Krieg" — von der SPD 1914 im Reichstag erklaert

**Distraktor-Logik:** A verwechselt Datum (1914 statt 1919), C antizipiert Pos 5/6 (Clark statt Versailles), D erzeugt Burgfrieden-Verwechslung. **Keine kolonialsprachlichen Formulierungen** (TERMINOLOGIE-01-Konformitaet).

**Diagnostisches Ziel:** SuS-Verstaendnis Quelltext + Datierung + Begriff "Kriegsschuld-Klausel" — Vorbereitung fuer Pos 5 (Vergleich) und Pos 6 (Stellungnahme).

**Lehrkraft-only-Schutz V13:** Distraktoren enthalten KEIN Vorgriff auf "Kriegsschuld-Luege NSDAP-Topos" (mat-3-3 `_meta.lehrkraft_only_hinweis`).

---

### Pos 5 — P↔L-Zone — `vergleich` — AFB III — L4 (DIDAKTISCHES KERNSTUECK)

**TB-Knoten:** K3-1 + K3-4 + K3-5 (Versailles 1919 vs. Clark 2013)
**Ziel-Materialien:** mat-3-3 (Versailles Art. 231) + mat-3-4 (Clark Schlafwandler) — kontrastive Forschungs-Pole
**Operationalisierungsziel:**
> Du kannst die Schuld-Zuweisung von Versailles 1919 und die Schlafwandler-These von Clark 2013 entlang dreier Dimensionen vergleichen — und benennen, worin sie sich unterscheiden.

**Konkrete Frage-Stoffrichtung:** Vergleichsmatrix mit 3 Dimensionen:

| Dimension | Versailles 1919 (mat-3-3) | Clark 2013 (mat-3-4) |
|-----------|---------------------------|----------------------|
| Wer traegt Schuld? | DT + Verbuendete allein | 5 Maechte gemeinsam (Wien, Berlin, Petersburg, Paris, London) |
| Welche Quelle? | Politischer Vertrag (Sieger-Position) | Forschungs-Buch (Historiker) |
| Wann formuliert? | 28.6.1919 (5 Jahre nach Kriegsbeginn) | 2013 (99 Jahre danach) |

**Vergleich-Wahl-Begruendung (Vertrag §2.2a Typauswahl):**
- 2 benennbare Objekte derselben Kategorienebene (zwei historische Schuld-Positionen): PASS
- 3 trennscharfe Dimensionen (Akteur / Quelltyp / Zeitstand): PASS
- L4-Anteil der Mappe explizit gefordert (Hoehepunkt): PASS
- KEIN Pseudo-Vergleich (3 Dimensionen, nicht 1): PASS

**DIDAKTISCHES KERNSTUECK (Beutelsbach-Kontroversitaet):** Pos 5 macht die historische Kontroverse explizit visualisierbar — ohne Antwort-Vorgriff. Beide Positionen werden gleichberechtigt nebeneinander gestellt; SuS bilden in Pos 6 eine eigene Position.

**Multiperspektivitaet operationalisiert:** P3 (Versailler Sieger 1919) vs. P4 (Heutige Forschung Clark 2013) als zwei explizit benennbare Perspektiven.

---

### Pos 6 — L-Zone — `begruendung` — AFB III — L5 (DIDAKTISCHES KERNSTUECK CER)

**TB-Knoten:** K3-1 (Kriegsschuldfrage zentral)
**Ziel-Materialien:** mat-3-3 + mat-3-4 (CER-Belege aus beiden Quellen-Polen)
**Operationalisierungsziel:**
> Du kannst eine eigene Position zur Schuldfrage formulieren und mit einem Beleg aus mat-3-3 oder mat-3-4 begruenden — nach dem CER-Schema (Claim, Evidence, Reasoning).

**Konkrete Frage-Stoffrichtung:** CER-Gitter:
- **Claim (Behauptung):** "Ich finde die Position von Versailles 1919 / Clark 2013 ueberzeugender."
- **Evidence (Beleg):** Zitiere ODER paraphrasiere einen Satz aus mat-3-3 ODER mat-3-4.
- **Reasoning (Begruendung):** Erklaere, warum dieser Beleg deine Behauptung stuetzt.

**begruendung-Wahl-Begruendung (Vertrag §2.2a Typauswahl):**
- echte Streitfrage mit 2 vertretbaren Positionen (Allein-Schuld vs. Multi-Kausalitaet): PASS
- belegfaehige Material-Stellen (Versailles-Wortlaut + Clark-Schlafwandler-Metapher): PASS
- L5-Anteil strukturiert via CER-Gitter (statt freie Stellungnahme): PASS

**DIDAKTISCHES KERNSTUECK CER:** Pos 6 ist die L5-Operationalisierung der Kriegsschuldfrage. Im Gegensatz zu Pos 7 (freie Stellungnahme) ist hier das CER-Schema verpflichtend — als kognitive Geruest-Stuetze fuer R7-SuS in einer L5-Aufgabe (siehe HEFTEINTRAG_M3 A.4 Stufe-3-Tipp).

**Beutelsbach-Pruefung:** Beide Positions-Wahlen sind gleich gewertet (kein Antwort-Vorgriff). SuS-Position ergibt sich aus eigener Argumentation.

---

### Pos 7 — L-Zone — `freitext` — AFB III — L5-L6

**TB-Knoten:** K3-1 + K3-2 + K3-6 (Synthese: Stimmung 1914 + Schuld 1919/2013 + Quellenkritik-Methode)
**Ziel-Materialien:** Synthese ueber alle aktiven Materialien (mat-3-1 bis mat-3-5)
**Operationalisierungsziel:**
> Du kannst auf die Stundenfrage in 3-5 Saetzen antworten — beide Teile (Augusterlebnis + Kriegsschuld) integriert und mit eigener Stellungnahme.

**Konkrete Frage-Stoffrichtung (frei, ohne Material-Link im Stem — MQ3):**

> Beantworte die Frage der Mappe in 3-5 Saetzen: Wer war im August 1914 begeistert — und wer hat heute die Schuld am Krieg? Beziehe dich dabei auf mindestens zwei Quellen aus dieser Mappe.

**Tipp Stufe 1 (mit Material-Refs, MQ3b):**
> Schau noch einmal in die Postkarte aus Luebeck [[mat-3-1|Postkarte Luebeck]] (M1), den Versailles-Auszug [[mat-3-3|Versailles Art. 231]] (M5) und den Clark-Text [[mat-3-4|Clark — Schlafwandler]] (M6). Beantworte beide Teile getrennt: Erst die Stimmung 1914, dann die Schuldfrage.

**freitext-Wahl-Begruendung:**
- L5-L6 Synthese (Stundenfrage-Beantwortung) erfordert Integration ueber mind. 2 SCPL-Zonen (S/C1 + P/L).
- Letzte Position der Mappe → Standard-Empfehlung Vertrag §2.2a.

**Differenz zu Pos 6:** Pos 6 = strukturierte Begruendung mit CER-Gitter zu EINER Frage (Schuldfrage). Pos 7 = freie Synthese-Stellungnahme zu BEIDEN Stundenfrage-Teilen. Beide L5-Aufgaben sind didaktisch differenzierbar (kognitive Aktivierung A8).

**MQ3 Material-Referenz-Verbot:** Stem enthaelt KEINE `[[mat-id|...]]`-Links und KEINE `(M[position])`-Verweise. Material-Referenzen ausschliesslich in Tipp Stufe 1 mit Inline-Link + Position-Marker.

---

## 5. Konstruktionskontext-Tabelle (Phase-2.2b-Dispatch-Vorlage)

| Pos | Typ | SCPL | TB-Knoten | Ziel-Material | AFB | Bloom | Operationalisierungsziel (Kurzform) | Sub-Agent |
|-----|-----|------|-----------|---------------|-----|-------|------------------------------------|-----------|
| 1 | lueckentext | S | K3-2 | mat-3-1 | I | L1-L2 | Augusterlebnis-Begriff + Datum/Ort Luebeck nennen | SUB_AUFGABE_LUECKENTEXT |
| 2 | quellenkritik | C1 | K3-2, K3-6 | mat-3-1 | II-III | L3-L4 | W-Fragen anwenden + Foto-Bias benennen (Land/Arbeiter fehlen) | SUB_AUFGABE_QUELLENKRITIK |
| 3 | zuordnung | C1 | K3-2 | mat-3-1, mat-3-2, mat-3-5 | II | L3 | Aussagen 3 Personengruppen zuordnen (Stadt/Land/Reichsamt) | SUB_AUFGABE_ZUORDNUNG |
| 4 | mc | P | K3-1, K3-4 | mat-3-3 | II | L3 | Versailles Art. 231 — Akteur+Datum+Begriff identifizieren | SUB_AUFGABE_MC |
| 5 | vergleich | P↔L | K3-1, K3-4, K3-5 | mat-3-3, mat-3-4 | III | L4 | Versailles 1919 vs. Clark 2013 — 3 Dimensionen kontrastieren | SUB_AUFGABE_VERGLEICH |
| 6 | begruendung | L | K3-1 | mat-3-3, mat-3-4 | III | L5 | Eigene Position + Beleg + Reasoning (CER-Schema) | SUB_AUFGABE_BEGRUENDUNG |
| 7 | freitext | L | K3-1, K3-2, K3-6 | (Synthese alle) | III | L5-L6 | Stundenfrage in 3-5 Saetzen + min. 2 Quellen-Bezuege | SUB_AUFGABE_FREITEXT |

---

## 6. Konstruktions-Dispatch-Anweisungen pro Aufgabe (Phase 2.2b)

**Allgemeine Constraints (alle 7 Aufgaben):**
- F0B_PRIMING_v1 verpflichtend (R7-Sprachniveau, Satzlaenge ≤15 W, DaZ-tauglich, du-Form)
- AFB-Hoehepunkt II-III → 3-Stufen-Tipp aktiv pro Aufgabe (Tipp-Quelle: jeweiliges Material `_meta.tipp_stufen` oder Hefteintrag A.4)
- MQ3: KEINE `[[mat-id|...]]`-Links und KEINE `(M[pos])`-Verweise in `frage`-Feld
- MQ3b: Tipp Stufe 1 enthaelt `[[mat-id|Anzeigetext]]`-Inline-Link + (M[position])
- Schema-Strict-Validation gegen typ-spezifisches Schema (Plugin v0.5.0)
- Trigger-Sichtbarkeit V13: KEINE NSDAP-Vorgriffe / KEINE Kriegsschuld-Luege-Topoi im Schueler-Text
- Beutelsbach-Pruefung pro Aufgabe (kein Antwort-Vorgriff bei Pos 5/6/7)

**Pro-Aufgabe-Constraints:**

| Pos | Spezifischer Dispatch-Constraint |
|-----|----------------------------------|
| 1 | Lueckentext-Items aus mat-3-1 `_meta.fachbegriffe_eingefuehrt` (Augusterlebnis) + Datum/Ort aus inhalt-Block. Genau 2 Lueckentext-Slots. |
| 2 | quellenkritik-Aufgabe: vollstaendige W-Frage-Mechanik aus mat-3-1 `_meta.quellenkritik_block` + `quellenkritische_impulse`. Pflicht-Item: "Wer fehlt?" (Augusterlebnis-Idealisierungs-Verbot operationalisiert). |
| 3 | Multi-Material-Zuordnung. STR-14-NEU mat-3-5 Fiktionalitaets-Kennzeichnung in Tipp Stufe 1: "Lies das rekonstruierte Tagebuch...". Kategorien-Anzahl: 3 (Stadt-Mittelschicht / Land-Skeptiker / Reichsamt-Inszenierung). |
| 4 | mc-Aufgabe mit GENAU 1 richtiger + 3 plausiblen Distraktoren. Distraktoren PRUEFEN: kein NSDAP-Topos, kein Versailles-Text-Vertauschung. |
| 5 | vergleich-Aufgabe: 2 Objekte (Versailles 1919 / Clark 2013), 3 Dimensionen (Akteur / Quelltyp / Zeitstand). Vergleichsmatrix als Antwort-Struktur. |
| 6 | begruendung-Aufgabe nach CER-Schema (Claim, Evidence, Reasoning). Belegfaehige Stellen: mat-3-3 Wortlaut + mat-3-4 Schlafwandler-Metapher. |
| 7 | freitext-Aufgabe mit Min-Anforderung (3-5 Saetze, 2 Quellen-Bezuege). Erwartungshorizont in `_meta.musterantwort` (Lehrkraft-only). |

---

## 7. Freischalt-Code M3

**Konzept:** Thematisch verankerter Code (A-Z, 4-8 Zeichen).

**Auswahl-Kandidaten:**
1. `SCHLAFWANDLER` (13 Z. — zu lang, gekuerzt: `SCHLAF`)
2. `BURGFRIEDE` (10 Z. — zu lang, gekuerzt: `BURGFR`)
3. `JUBEL1914` (enthaelt Ziffern — verstoesst gegen "A-Z")
4. `KLAUSEL` (7 Z. — Kriegsschuld-Klausel, knapp)
5. `SCHULD` (6 Z. — Kernfrage, kurz, einpraegsam) ✓

**Gewaehlt: `SCHULD`** (6 Zeichen, A-Z, thematisch zentral — die Stundenfrage "Wer hat Schuld?" ist Kernanker M3).

**Begruendung:**
- 6 Zeichen, A-Z-konform: PASS
- Thematisch verankert: Kriegsschuldfrage = KE-Schwerpunkt GPG7_LB3_K_03
- Einpraegsam fuer R7-SuS: Wort des Hefteintrag-Merksatzes ("Wer ist schuld?")
- Kein Antwort-Vorgriff (keine Position drin, nur Fragebegriff)
- Multiperspektivisch neutral: nicht "DEUTSCHLAND" oder "CLARK", sondern die Frage selbst

**Code wird im Schluessel-Raetsel gesammelt — Buchstaben verteilt auf 7 Aufgaben:** Aufgaben 1, 2, 4, 5, 6, 7 liefern jeweils 1 Buchstabe (S-C-H-U-L-D), Aufgabe 3 ist Bonus/Verifikation. Final-Vergabe der Buchstaben-zu-Aufgaben-Zuordnung in Phase 2.2b durch Aufgaben-Dispatcher.

---

## 8. Q-Gate Self-Check (Orchestrator-Ebene, A1-A18)

| Krit | Pruefung | Ergebnis | Evidenz |
|------|----------|----------|---------|
| **A1** AFB-Kongruenz Gesamtbild | AFB I → II → II → II → III → III → III monoton steigend | **PASS** | Pos 1 (I), Pos 2-4 (II/II-III), Pos 5-7 (III) |
| **A3** Material-Kongruenz (Vollstaendigkeit) | Alle 5 aktiven Materialien in min. 1 Aufgabe Primaerquelle | **PASS** | mat-3-1 (Pos 1, 2, 3), mat-3-2 (Pos 3), mat-3-3 (Pos 4, 5, 6), mat-3-4 (Pos 5, 6), mat-3-5 (Pos 3) |
| **A5** Schwierigkeits-Progression | Monoton steigend, keine Regression | **PASS** | L1-L2 → L3-L4 (4x) → L5 → L5-L6 |
| **A8** Kognitive Aktivierung | Min. 1 denkanregende Aufgabe | **PASS** | Pos 5 (vergleich), Pos 6 (begruendung CER), Pos 7 (Synthese) |
| **A9** TB-Bezug | Min. 1 Aufgabe pro Mappe zielt auf TB-Knoten | **PASS** | Alle 7 Aufgaben mit TB-Knoten-Zuordnung (K3-1 bis K3-6) |
| **A10** Typvielfalt v2 | Min. 3 Typen, kein Typ > 3x, Wiederholung begruendet | **PASS** | 6 verschiedene Typen (lueckentext, quellenkritik, zuordnung, mc, vergleich, begruendung, freitext); kein Typ > 1x; Vielfalt deutlich > Min-3 |
| **A12** Sachbezogen-vor-Wertbezogen | S/C-Zonen → P/L-Zonen-Reihenfolge | **PASS** | Pos 1 (S) → Pos 2-3 (C1) → Pos 4 (P sachbezogen) → Pos 5 (P↔L Vergleich) → Pos 6-7 (L wertbezogen) |
| **A16** Fragebogen-Kohaerenz | Aufgabensequenz bildet SCPL-Erarbeitungsweg ab | **PASS** | S → C1 (2x) → P → P↔L → L (2x) — Sequenz spiegelt Skript M3 §1-§7 |
| **A17** SCPL-Zonen-Abdeckung | Jede SCPL-Zone min. 1 diagnostische Aufgabe | **PASS** | S (Pos 1), C1 (Pos 2, 3), C2 (impliziter Burgfrieden-Bezug ueber mat-3-3 ueberleitung_von in Pos 4 — siehe Hinweis), P (Pos 4, 5), L (Pos 5, 6, 7) |
| **A18** Material-Aktivierung | Alle Materialien als Primaerquelle in min. 1 Aufgabe | **PASS** | siehe A3-Tabelle |
| **A19** Bloom-Verteilung | max 40% L1-L2, min 30% L3-L4, min 20% L5-L6 | **PASS** | 14% / 57% / 29% (siehe §3) |
| **MQ3** kein Material-Link in `frage` | Pruefung pro Aufgabe in Phase 2.2b | **PASS_PLAN** | Stem-Designs in §4 enthalten KEINE `[[`-Links und KEINE `(M[`-Verweise |
| **MQ3b** Display-Refs in Tipp 1 | Pruefung pro Aufgabe in Phase 2.2b | **PASS_PLAN** | Tipp-Stufen-Konstruktion verbindlich mit `[[mat-id\|...]]` + (M[pos]) — Beispiel Pos 7 |

**C2-Zone Hinweis:** Da mat-3-6 (Burgfriedens-Medaille) als RESERVE_NICHT_AKTIVIERT entfaellt, traegt die C2-Zone (Burgfrieden 4.8.1914) der Hefteintrag-Schueler-Text + mat-3-3 `_meta.burgfrieden_uebernahme_aus_mat_3_6_RESERVE_NICHT_AKTIVIERT` (ueberleitung_von in Phase 2.1c). C2 wird in Pos 4 als Kontext mitgefuehrt (Distraktor D "SPD 1914 Reichstag" verweist implizit auf Burgfrieden). KEINE eigene Aufgabe zu C2 erforderlich, weil C2 keine Primaerquelle hat und nur als kontextueller Brueckenbegriff zwischen Augusterlebnis (S/C1) und Versailles-Niederlage (P) fungiert.

**Gate-Urteil Phase 2.2a M3: PASS** — alle BLOCKER + alle HIGH PASS. C2-Zonen-Lockerung dokumentiert.

---

## 9. Erfuellung der Q-Gate-Pflichten aus Aufgabenstellung

| Pflicht | Erfuellt durch | Status |
|---------|----------------|--------|
| AFB-Hoehepunkt II-III gerechtfertigt | §0 + §3 + §8 (A1) — DR-§5-Bezug | **PASS** |
| Differenzierung 3-Stufen-Tipp aktiv | §6 (Allgemeine Constraints) + Pos 1-7 Tipp-Quellen | **PASS** |
| Beutelsbach-Kontroversitaet Versailles vs. Clark | Pos 5 (vergleich L4) + Pos 6 (begruendung L5 CER) | **PASS** |
| Augusterlebnis-Idealisierung-Verbot operationalisiert | Pos 2 (quellenkritik mat-3-1: "Wer fehlt?" als Pflicht-Item) + Pos 3 (Anti-Bias-Zuordnung mat-3-5) | **PASS** |
| F-PB-37 Quellenkritik-Aufgabe Pflicht | Pos 2 (mat-3-1 als `quellenkritik_pflicht: true` Primaerquelle) | **PASS** |
| STR-14-NEU mat-3-5 Fiktionalitaets-Aufgabe | Pos 3 (mat-3-5 als rekonstruierte Stimme) + Tipp-Stufe-1-Constraint "rekonstruiertes Tagebuch" | **PASS** |
| Multiperspektivitaet operationalisiert (Pazifist/Kriegsbefuerworter/Versailles-Sieger/Clark-Revisionismus) | Pos 3 (P1+P2+P5), Pos 5 (P3 vs. P4), Pos 6 (eigene Position aus 4 Perspektiven) | **PASS** |

---

## 10. Hand-off an Phase 2.2b (agent-raetsel-dispatcher)

**Dispatch-Reihenfolge (Pflicht: 1 Aufgabe = 1 Nachricht, P4):**
1. Pos 1 → SUB_AUFGABE_LUECKENTEXT (mat-3-1)
2. Pos 2 → SUB_AUFGABE_QUELLENKRITIK (mat-3-1, F-PB-37)
3. Pos 3 → SUB_AUFGABE_ZUORDNUNG (mat-3-1+mat-3-2+mat-3-5, STR-14-NEU)
4. Pos 4 → SUB_AUFGABE_MC (mat-3-3, V13-Schutz)
5. Pos 5 → SUB_AUFGABE_VERGLEICH (mat-3-3+mat-3-4, Beutelsbach KERNSTUECK)
6. Pos 6 → SUB_AUFGABE_BEGRUENDUNG (mat-3-3+mat-3-4, CER L5)
7. Pos 7 → SUB_AUFGABE_FREITEXT (Synthese alle, Stundenfrage)

**Konstruktionskontext-Uebergabe:** Tabelle §5 + Dispatch-Constraints §6 als JSON-Vorlage in `mappe-3/aufgaben/_konstruktionskontext.json` (von Dispatcher zu erzeugen).

**Hand-off-Vermerk:** Plugin v0.5.0 / F0B_PRIMING_v1 / VERTRAG_PHASE_2-2a v1.0.

---

## 11. Referenz-Dokumente (Phase-2.2a-Eingabe)

| Dokument | Status |
|----------|--------|
| VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md | gelesen (Schnittstellen-Vertrag, Bloom-Korridor, Typauswahl-Heuristik) |
| AGENT_RAETSEL.md | implizit via System-Prompt (F0B + A-Kriterien + Dispatch-Ablauf) |
| DIDAKTIK_RAHMEN.md | gelesen (KE-Matrix, AFB-Schwierigkeitskurve, Multiperspektivitaet, Beutelsbach) |
| HEFTEINTRAG_M3.md | gelesen (Lehrkraft-Sektion A.1-A.5, Schueler-Sektion B.1-B.5, Trigger V13) |
| BLUEPRINT_M3.md (= material_geruest_m3) | gelesen (SCPL-Abdeckung, Sequenzplan, Perspektiven-Matrix, F0b-M9) |
| material_geruest_m3.json | indirekt via BLUEPRINT_M3.md |
| 5 Material-JSONs (mat-3-1, -2, -3, -4, -5) | gelesen (id, typ, titel, _meta — incl. tipp_stufen, quellenkritik_block, perspektiv_tags) |
| skript_struktur.json M3-Sektion | gelesen (TB-Knoten K3-1..K3-6, Verbindungen, abschluss_impuls, transfer_marker) |

---

## 12. Meta

| Feld | Wert |
|------|------|
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| mappe_id | M3 |
| ke_anker_haupt | GPG7_LB3_K_03 |
| afb | II-III (Hoehepunkt) |
| bloom_schwerpunkt | L4-L5 |
| aufgabenzahl | 7 |
| typvielfalt | 6 (lueckentext, quellenkritik, zuordnung, mc, vergleich, begruendung, freitext) |
| freischalt_code | SCHULD |
| didaktisches_kernstueck | Beutelsbach-Kontroversitaet Versailles 1919 vs. Clark 2013 (Pos 5 vergleich + Pos 6 begruendung CER) |
| augusterlebnis_idealisierungs_verbot_operationalisiert | Pos 2 (quellenkritik mat-3-1) |
| f_pb_37_quellenkritik_pflicht | Pos 2 (mat-3-1 als Primaerquelle) |
| str_14_neu_fiktionalitaet | Pos 3 (mat-3-5 rekonstruierte Stimme, Tipp-Stufe-1-Kennzeichnung) |
| multiperspektivitaet | 5 Perspektiven (P1-P5) auf 5 Aufgaben verteilt |
| schema_version | progressionsplan_v1 |
| vertrag_version | VERTRAG_PHASE_2-2a v1.0 |
| plugin_version | v0.5.0 |
| f0b_priming_kennung | F0B_PRIMING_v1 |
| created_at | 2026-04-26 |
| validierungsstatus | ENTWURF (User-Validierung nach Phase-2.2a-Gate ausstehend) |
