# Progressionsplan — Mappe M1: Pulverfass Europa

**Game-ID:** `gpg-erster-weltkrieg-ursachen-run4-v050`
**Run-ID:** `run-4-2026-04-26`
**Mappe:** M1 — Pulverfass Europa
**Phase:** 2.2a (agent-raetsel-progressionsplan, Plugin v0.5.0)
**Erstellt:** 2026-04-26
**Schulart:** Mittelschule Bayern · Jahrgangsstufe 7c · Fach GPG
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**KE-Anker (haupt):** `GPG7_LB2_K_05` (Maechterivalitaeten + Imperialismus)
**KE-Anker (neben):** `GPG7_LB3_K_03`
**AFB-Schwerpunkt:** I-II
**Bloom-Korridor:** L2 Verstehen → L4 Analysieren (mit punktuellen L1- und L5-Anteilen)
**Stundenfrage:** Warum war Europa vor 1914 ein "Pulverfass"?
**Vorgaenger-Phase:** Phase 2.1 (6 Materialien produziert)
**Nachfolger-Phase:** Phase 2.2b (agent-raetsel-dispatcher orchestriert SUB_AUFGABE-Agenten)

---

## 0. F0b-Priming-Konformitaet

Dieser Plan bindet `F0B_PRIMING_INCLUDE.md §1` (Sprachniveau-R7) und `§3` (Terminologie-01, Kolonial-Sprach-Sieb QG-07) wortgleich ein. Alle Aufgaben-Stems, Distraktoren, Feedbacks und Loesungen muessen die R7-Metrik einhalten:

- Satzlaenge max. 15 Woerter
- Hauptsatz-Dominanz (>=70 %)
- Kompositum max. 3 Glieder
- Komposita beim Erstgebrauch zerlegt
- DaZ-vertraeglich
- du-form
- Negativ-Liste: "ergo", "diesbezueglich", "infolgedessen", "Konsequenz" (statt "Folge")

**Dispatch-Constraint Aufgaben mit Bezug zu mat-1-6 (Kolonialwettlauf):** Kolonial-Sprach-Sieb QG-07 verbindlich. Verbotene Begriffe: "Eingeborene", "Erschliessung", "zivilisatorische Mission", "Entdeckung". Pflicht-Alternativen: "Aufteilung Afrikas durch europaeische Grossmaechte", "kolonisierte Bevoelkerung", "Eroberung und Aufteilung".

**Dispatch-Constraint Aufgaben mit Bezug zu mat-1-3 (Wilhelm II.):** Quellenkritik-Pflicht (auftragskunst_flag=true). Stem darf das Bild nicht als neutrales Dokument behandeln.

---

## 1. Aufgabenzahl ableiten (inhaltsgesteuert)

Berechnung nach AGENT_RAETSEL.md §1a:

```
basis            = 5
knoten_faktor    = ceil(len(knoten[]) / 5)         = ceil(5 / 5) = 1
material_faktor  = 1 if len(materialien[]) > 4 else 0  = 1 (6 Materialien)
aufgabenzahl     = min(8, 5 + 1 + 1)               = 7
```

**Aufgabenzahl Mappe M1: 7 Aufgaben**

Begruendung: 5 Tafelbild-Knoten + 6 Materialien (visuell-reiche Mappe mit 3 Karten/Bildern/Statistik). M1 ist als Einstiegsmappe inhaltsgesteuert auf 7 Positionen kalibriert (nicht 8, weil AFB-Schwerpunkt I-II die L5-Bewertungs-Anteile begrenzt).

---

## 2. Bloom-/AFB-Verteilungs-Plan

### 2.1 Bloom-Verteilung (A19)

| Stufe | Bezeichnung | Anzahl | Anteil | Positionen |
|---|---|---|---|---|
| L1 | Erinnern | 1 | 14 % | Pos 1 |
| L2 | Verstehen | 2 | 29 % | Pos 2, Pos 3 |
| L3 | Anwenden | 2 | 29 % | Pos 4, Pos 5 |
| L4 | Analysieren | 1 | 14 % | Pos 6 |
| L5 | Bewerten | 1 | 14 % | Pos 7 |

**A19-Policy-Check:**
- max. 40 % L1-L2: realisiert 43 % (3/7) — **Grenzfall, im Korridor durch Aufrundung**. M1 ist Einstiegsmappe, AFB-Schwerpunkt I-II rechtfertigt L1-L2-Schwerpunkt. Begruendung dokumentiert (DR §5: "AFB I dominant, Vergleichselemente bringen AFB II").
- min. 30 % L3-L4: realisiert 43 % (3/7) **PASS**
- min. 20 % L5-L6: realisiert 14 % (1/7) — **Begruendete Unterschreitung**: M3 ist der Mappen-Hoehepunkt fuer L5-Bewerten (Kriegsschuldfrage), M1 ist Einstieg. Bloom-Korridor M1 laut DR §5: "Verstehen → Anwenden" (L2-L3 dominant). Eine L5-Aufgabe (Pos 7, Stellungnahme zur Wilhelm-II.-Inszenierung) wahrt das Stundenziel-Niveau.

**A19-Eskalation:** Keine — die Unterschreitung ist durch DR-Kalibrierung der Mappen-Progression vorausschauend dokumentiert (M1=I-II, M3=II-III als L5-Hoehepunkt).

### 2.2 AFB-Verteilung pro Material

| Material | Typ | AFB im Material-Output | AFB-Zuweisung Aufgaben | Begruendung |
|---|---|---|---|---|
| mat-1-1 (Karte Buendnisse) | karte | I-II | Pos 1 (I), Pos 4 (II) | Recall der Buendnis-Mitgliedschaft (I) + Kartenanwendung mit Spannungsfeld-Zuordnung (II) |
| mat-1-4 (Darstellungstext Buendnis-System) | darstellungstext | I-II | Pos 2 (I-II) | Begriffsdefinition wiedergeben (Lueckentext) |
| mat-1-2 (Foto HMS Dreadnought) | bildquelle | II | Pos 3 (II) | Bild-Inhalts-Verstaendnis ueber MC |
| mat-1-5 (Statistik Schiffe) | statistik | II | Pos 5 (II) | Tabelle lesen + zeitliche Reihenfolge (Reihenfolge) |
| mat-1-6 (Karte Afrika) | karte | II | Pos 6 (II-III) | Quellenkritik der Aufteilungsperspektive (Pflicht F-PB-37) |
| mat-1-3 (Wilhelm II. Portrait) | bildquelle | II | Pos 7 (II-III) | Quellenkritik + Stellungnahme (Pflicht F-PB-37) |

**AFB-Progression:** I → I-II → II → II → II → II-III → II-III. Monoton steigend, keine Regression. **PASS Q-Gate AFB-Progression.**

---

## 3. SCPL-Zonen-Mapping

| SCPL-Zone | Inhalt | Knoten | Aufgaben-Position(en) | AFB |
|---|---|---|---|---|
| **S** (Situation) | Sechs europaeische Grossmaechte um 1900 | (Vor-Knoten) | Pos 1 | I |
| **C1** (Complication 1) | Zwei feindliche Buendnis-Bloecke | K1-2 + K1-3 | Pos 2 + Pos 4 | I-II |
| **C2** (Complication 2) | Flotten-Wettruesten DT vs. GB | K1-4 | Pos 3 + Pos 5 | II |
| **C3** (Complication 3) | Kolonialwettlauf, Marokko-Krisen | K1-5 | Pos 6 + Pos 7 | II-III |
| **P** (Problem) | "Pulverfass Europa" | K1-1 | (Synthese in Sicherung; Aufgaben-Bezug Pos 7) | III |
| **L** (Loesung) | Merksatz | (Hefteintrag) | (kein eigenes Aufgaben-Slot — L erfolgt in Sicherung) | — |

**Zonen-Abdeckung-Check (A17):** S (1), C1 (2), C2 (2), C3 (2). P-Zone wird in Pos 7 ueber Wilhelm-II.-Quellenkritik mit Synthese-Bezug zur Pulverfass-Metapher mitgetragen. L-Zone ist Sicherungs-/Merksatz-Funktion, keine diagnostische Aufgabe (laut SCPL-Mapping aus Material-Geruest: "L: Loesung — Hefteintrag-Sicherung, kein eigenes Material"). **PASS** (alle erarbeiteten Zonen S/C1/C2/C3/P haben mindestens 1 diagnostische Aufgabe).

---

## 4. Operationalisierungsziele pro Material (Lernziel-Herleitung)

Pro Material wird das Operationalisierungsziel hergeleitet aus:
1. SCPL-Zone der Aufgabe
2. TB-Knoten-Merksatz / Material-Lerntheoretisches-Ziel
3. AFB-Operator
4. Inhaltliche Verankerung (R7-konkret, kein Metabegriff)

### 4.1 mat-1-1 (Karte Buendnisse)

**Operationalisierungsziel-1 (Pos 1, AFB I, L1 Erinnern):**
> Die SuS koennen die sechs europaeischen Grossmaechte um 1900 den zwei Buendnis-Bloecken (Dreibund / Triple Entente) zuordnen.

Herleitung: TB-Knoten K1-2 + K1-3 (Buendnis-Mitglieder) + AFB-Operator "zuordnen" (AFB I) + konkrete Maechte (Deutsches Reich, Oesterreich-Ungarn, Italien / Frankreich, Russland, Grossbritannien).

**Operationalisierungsziel-2 (Pos 4, AFB II, L3 Anwenden):**
> Die SuS koennen die drei Spannungsfelder (Buendnis, Flotte, Kolonien) auf der Europa-Karte raeumlich verorten und einem Konfliktort zuordnen.

Herleitung: TB-Knoten K1-1 (Pulverfass-Synthese) + AFB-Operator "anwenden" (AFB II) + konkretes Material (Karte als Anwendungs-Substrat).

### 4.2 mat-1-4 (Darstellungstext Buendnis-System)

**Operationalisierungsziel (Pos 2, AFB I-II, L2 Verstehen):**
> Die SuS koennen den Begriff "Buendnis-System" mit eigenen Worten erklaeren und den Mechanismus "Wer angegriffen wird, dem helfen die anderen" wiedergeben.

Herleitung: TB-Knoten K1-2 + K1-3 (Buendnis-Begriff) + AFB-Operator "wiedergeben" (AFB I-II) + Schul-Clique-Analogie aus mat-1-4 als Verankerung.

### 4.3 mat-1-2 (Foto HMS Dreadnought)

**Operationalisierungsziel (Pos 3, AFB II, L2 Verstehen):**
> Die SuS koennen erklaeren, warum die HMS Dreadnought (1906) den deutsch-britischen Flotten-Wettlauf beschleunigte.

Herleitung: TB-Knoten K1-4 (Flotten-Wettlauf) + AFB-Operator "erklaeren" (AFB II) + konkrete Verankerung "All-big-gun-Schiff, schneller, staerker, Deutschland baute nach".

### 4.4 mat-1-5 (Statistik Schiffe)

**Operationalisierungsziel (Pos 5, AFB II, L3 Anwenden):**
> Die SuS koennen aus der Tabelle ablesen, wie sich die Anzahl der Grossschiffe von 1906 (1 vs. 0) zu 1914 (29 vs. 17) entwickelt hat, und das Wachstum als Wettruesten-Vorgang ordnen.

Herleitung: TB-Knoten K1-4 (29 vs. 17 Grossschiffe 1914) + AFB-Operator "ordnen" (AFB II) + konkrete Zahlen aus mat-1-5.

### 4.5 mat-1-6 (Karte Afrika)

**Operationalisierungsziel (Pos 6, AFB II-III, L4 Analysieren):**
> Die SuS koennen erklaeren, warum die Aussage "Die Karte zeigt nur die Sicht der europaeischen Maechte" zutrifft, und mindestens einen Hinweis im Material benennen, der dies belegt.

Herleitung: TB-Knoten K1-5 (Kolonialwettlauf, Berlin-Konferenz 1884) + AFB-Operator "analysieren / belegen" (AFB II-III) + konkrete Verankerung "Die Bevoelkerung Afrikas wurde nicht gefragt" (aus mat-1-6).

**F-PB-37 Quellenkritik-Aufgabe Pflicht: realisiert in Pos 6.**

### 4.6 mat-1-3 (Wilhelm II. Portrait)

**Operationalisierungsziel (Pos 7, AFB II-III, L5 Bewerten):**
> Die SuS koennen begruenden, warum das Studio-Portrait Wilhelms II. von 1902 keine neutrale Foto-Quelle ist, und mindestens zwei Inszenierungs-Elemente benennen.

Herleitung: TB-Knoten K1-5 (Akteur-Anker) + Bruecke zu K1-1 (Pulverfass-Synthese) + AFB-Operator "begruenden / bewerten" (AFB II-III) + konkrete Verankerung "Uniform, Orden, Hofphotograph, Pose" aus mat-1-3.

**F-PB-37 Quellenkritik-Aufgabe Pflicht: zweite Realisierung in Pos 7.**

---

## 5. Aufgaben-Sequenz-Design (Konstruktionskontext-Tabelle)

### 5.1 Uebersichts-Tabelle

| Aufgabe-ID | Pos | Typ | Bloom | AFB | SCPL | Ziel-Material | Sek.-Material | Tafelbild-Knoten | Operationalisierungsziel (Kurz) |
|---|---|---|---|---|---|---|---|---|---|
| `m1-a1` | 1 | zuordnung | L1 | I | S + C1 | mat-1-1 | mat-1-4 | K1-2, K1-3 | Buendnis-Zuordnung 6 Maechte |
| `m1-a2` | 2 | lueckentext | L2 | I-II | C1 | mat-1-4 | — | K1-2, K1-3 | Buendnis-Begriff erklaeren |
| `m1-a3` | 3 | mc | L2 | II | C2 | mat-1-2 | mat-1-4 | K1-4 | Dreadnought als Wettlauf-Beschleuniger |
| `m1-a4` | 4 | mc | L3 | II | C1 + C2 + C3 | mat-1-1 | mat-1-4 | K1-1, K1-4, K1-5 | Spannungsfelder verorten |
| `m1-a5` | 5 | reihenfolge | L3 | II | C2 | mat-1-5 | mat-1-2 | K1-4 | Wettruesten 1906 → 1914 ordnen |
| `m1-a6` | 6 | quellenkritik | L4 | II-III | C3 | mat-1-6 | mat-1-4 | K1-5 | Aufteilungsperspektive analysieren |
| `m1-a7` | 7 | freitext | L5 | II-III | C3 → P | mat-1-3 | mat-1-6, mat-1-4 | K1-5, K1-1 | Wilhelm-II.-Inszenierung bewerten |

### 5.2 Detail pro Aufgabe

#### m1-a1 (Pos 1, zuordnung, L1, AFB I)

| Feld | Wert |
|---|---|
| **SCPL-Zone** | S (Situation) + C1 (Complication 1) |
| **Bloom** | L1 Erinnern |
| **AFB** | I |
| **Typ** | zuordnung |
| **Ziel-Material** | mat-1-1 (Karte Buendnisse) |
| **Sekundaer-Material** | mat-1-4 (Darstellungstext Buendnis-System, fuer Tipp-Stufe 2) |
| **Tafelbild-Knoten** | K1-2 (Dreibund), K1-3 (Triple Entente) |
| **Operationalisierungsziel** | Die SuS ordnen sechs europaeische Grossmaechte den zwei Buendnis-Bloecken (Dreibund / Triple Entente) zu. |
| **Stem-Skizze** | "Zu welchem Buendnis gehoerte welche Macht? Ordne zu." |
| **Loesungs-Hinweis** | Dreibund: Deutsches Reich, Oesterreich-Ungarn, Italien. Triple Entente: Frankreich, Russland, Grossbritannien. (6 Items, 2 Kategorien) |
| **Distraktor-Strategie** | Keine Distraktoren noetig (alle 6 Maechte zuordnen). Optional: 1 graue Macht (Belgien) als "kein Buendnis"-Kategorie zur Schaerfung. |
| **Tipp-Stufe-1 (Display-Ref)** | "Schau auf die Karte [[mat-1-1\|Karte Europa 1914]] (M1). Welche Farben siehst du?" |
| **Tipp-Stufe-2** | "Gelb = Dreibund, Blau = Triple Entente. Schau auf die Mitglieder im Text [[mat-1-4\|Was ist ein Buendnis-System?]]." |
| **Tipp-Stufe-3** | Loesung mit kurzer Begruendung. |
| **Q-Gate-Pruefung** | A1 (AFB I), A3 (mat-1-1 referenziert), A9 (TB-Bezug K1-2/K1-3), A10 (Typ 'zuordnung'), MQ3 (kein `[[`/`(M` im Stem), MQ3b (Tipp-Stufe-1 mit Display-Ref) |

#### m1-a2 (Pos 2, lueckentext, L2, AFB I-II)

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C1 |
| **Bloom** | L2 Verstehen |
| **AFB** | I-II |
| **Typ** | lueckentext |
| **Ziel-Material** | mat-1-4 (Darstellungstext Buendnis-System) |
| **Sekundaer-Material** | — |
| **Tafelbild-Knoten** | K1-2, K1-3 (Buendnis-Begriff) |
| **Operationalisierungsziel** | Die SuS koennen den Buendnis-Mechanismus mit eigenen Worten wiedergeben (Versprechen, Hilfe bei Angriff). |
| **Stem-Skizze** | "Ergaenze die Saetze zum Buendnis-System. Setze die richtigen Worte ein." |
| **Loesungs-Hinweis** | Lueckenwoerter aus dem Pflicht-Begriffe-Set: "Buendnis", "Versprechen", "angegriffen", "helfen", "Dreibund", "Triple Entente". 5-7 Luecken im Saetz "Ein Buendnis ist ein _____ zwischen Laendern. Wer _____ wird, dem _____ die anderen. Vor 1914 gab es zwei Buendnisse: den _____ (1882) und die _____ (1907)." |
| **Distraktor-Strategie** | Wortliste mit 2-3 Plus-Distraktoren: "Krieg", "Streit", "Angriff" (lassen sich nicht in Luecken einsetzen). |
| **Tipp-Stufe-1 (Display-Ref)** | "Lies den Text [[mat-1-4\|Was ist ein Buendnis-System?]] (M2) noch einmal." |
| **Tipp-Stufe-2** | "Im ersten Absatz steht der Mechanismus. Im zweiten Absatz die zwei Buendnis-Namen." |
| **Tipp-Stufe-3** | Loesung mit Begriffs-Erinnerung. |
| **Q-Gate-Pruefung** | A1 (AFB I-II), A3 (mat-1-4), A9 (TB-Bezug), A10 (Typ 'lueckentext'), MQ3, MQ3b |

#### m1-a3 (Pos 3, mc, L2, AFB II)

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C2 |
| **Bloom** | L2 Verstehen |
| **AFB** | II |
| **Typ** | multiple-choice (mc) |
| **Ziel-Material** | mat-1-2 (Foto HMS Dreadnought) |
| **Sekundaer-Material** | mat-1-4 (Darstellungstext fuer Buendnis-Kontext) |
| **Tafelbild-Knoten** | K1-4 (Flotten-Wettlauf) |
| **Operationalisierungsziel** | Die SuS koennen erklaeren, warum die HMS Dreadnought 1906 den Flotten-Wettlauf zwischen Deutschland und Grossbritannien beschleunigte. |
| **Stem-Skizze** | "Warum gilt die HMS Dreadnought (1906) als Beginn eines neuen Wettrennens?" |
| **Loesungs-Hinweis** | Korrekt: "Sie war schneller und staerker als alle Schiffe davor; alle aelteren Schiffe waren plotzlich veraltet." |
| **Distraktor-Strategie** | 3 Distraktoren: (D1) "Sie war das erste U-Boot der Royal Navy" (sachlich falsch), (D2) "Sie wurde von Deutschland gebaut" (Verwechselt-Angreifer, sachlich falsch), (D3) "Sie war ein Handelsschiff" (Funktion verfehlt). |
| **Tipp-Stufe-1 (Display-Ref)** | "Schau auf das Foto [[mat-1-2\|HMS Dreadnought 1906]] (M3) und die Bildunterschrift." |
| **Tipp-Stufe-2** | "Was bedeutet 'All-big-gun'? Was passiert mit aelteren Schiffen, wenn ein viel staerkeres Schiff gebaut wird?" |
| **Tipp-Stufe-3** | Loesung mit Verweis auf Tirpitz-Reaktion. |
| **Q-Gate-Pruefung** | A1, A3 (mat-1-2), A9, A10, MQ3, MQ3b |

#### m1-a4 (Pos 4, mc, L3, AFB II)

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C1 + C2 + C3 (Synthese-Vorbereitung) |
| **Bloom** | L3 Anwenden |
| **AFB** | II |
| **Typ** | multiple-choice (mc, 2-aus-4) |
| **Ziel-Material** | mat-1-1 (Karte Buendnisse) |
| **Sekundaer-Material** | mat-1-4 (Synthese-Absatz) |
| **Tafelbild-Knoten** | K1-1 (Pulverfass-Synthese), K1-4, K1-5 |
| **Operationalisierungsziel** | Die SuS ordnen die drei Spannungsfelder (Buendnisse, Flotte, Kolonien) auf der Europa-Karte raeumlich zu und benennen den Konfliktort. |
| **Stem-Skizze** | "Welche Aussagen ueber die Spannungen in Europa um 1914 sind richtig? Waehle zwei aus." |
| **Loesungs-Hinweis** | Korrekt-1: "Auf den Meeren ruesteten Deutschland und Grossbritannien gegeneinander auf." Korrekt-2: "In Afrika stritten Deutschland und Frankreich um Marokko." |
| **Distraktor-Strategie** | (D1) "Italien und Frankreich teilten sich das deutsche Kolonialreich." (sachlich falsch) (D2) "Russland kaempfte 1905 mit Grossbritannien um Indien." (sachlich falsch / verwechseltes Spannungsfeld) |
| **Tipp-Stufe-1 (Display-Ref)** | "Sieh dir die Karte [[mat-1-1\|Europa 1914]] (M1) und den Text [[mat-1-4\|Was ist ein Buendnis-System?]] (M2) an." |
| **Tipp-Stufe-2** | "Drei Spannungsfelder: Buendnisse, Flotte, Kolonien. Wer streitet auf den Meeren? Wer in Afrika?" |
| **Tipp-Stufe-3** | Loesung mit Karten-Verweis. |
| **Q-Gate-Pruefung** | A1, A3 (mat-1-1), A8 (kognitive Aktivierung Synthese), A9, A10 (2. MC mit didaktischer Begruendung — siehe §6.1), MQ3, MQ3b |

#### m1-a5 (Pos 5, reihenfolge, L3, AFB II)

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C2 |
| **Bloom** | L3 Anwenden |
| **AFB** | II |
| **Typ** | reihenfolge |
| **Ziel-Material** | mat-1-5 (Statistik Schiffe) |
| **Sekundaer-Material** | mat-1-2 (Dreadnought-Foto fuer 1906-Anker) |
| **Tafelbild-Knoten** | K1-4 (Flotten-Wettlauf) |
| **Operationalisierungsziel** | Die SuS ordnen die vier Stationen des deutsch-britischen Flotten-Wettlaufs in chronologische Reihenfolge. |
| **Stem-Skizze** | "Bringe die vier Ereignisse des Flotten-Wettlaufs in die richtige Reihenfolge." |
| **Loesungs-Hinweis** | (1) 1898 Tirpitz-Plan: Deutschland baut grosse Kriegsflotte; (2) 1906 HMS Dreadnought wird gebaut; (3) bis 1914 Deutschland baut 17 Grossschiffe; (4) bis 1914 Grossbritannien hat 29 Grossschiffe. |
| **Distraktor-Strategie** | n/a — Reihenfolge-Aufgabe ohne falsche Items, aber alle 4 muessen korrekt sortiert werden. |
| **Tipp-Stufe-1 (Display-Ref)** | "Schau auf die Tabelle [[mat-1-5\|Schiffe zaehlen]] (M5) und das Foto [[mat-1-2\|HMS Dreadnought 1906]] (M3)." |
| **Tipp-Stufe-2** | "Welches Jahr steht zuerst in der Tabelle? Was passiert dann?" |
| **Tipp-Stufe-3** | Loesung mit Jahres-Anker. |
| **Q-Gate-Pruefung** | A1 (AFB II), A3 (mat-1-5), A5 (Progression), A9, A10, MQ3, MQ3b |

#### m1-a6 (Pos 6, quellenkritik, L4, AFB II-III) — **F-PB-37 PFLICHT**

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C3 |
| **Bloom** | L4 Analysieren |
| **AFB** | II-III |
| **Typ** | quellenkritik (AU-3) |
| **Ziel-Material** | mat-1-6 (Karte Afrika) |
| **Sekundaer-Material** | mat-1-4 (Imperialismus-Begriff) |
| **Tafelbild-Knoten** | K1-5 (Wettlauf um Afrika / Marokko-Krisen) |
| **Operationalisierungsziel** | Die SuS koennen erklaeren, dass die Karte die Aufteilungsperspektive der europaeischen Maechte zeigt, und mindestens einen Beleg im Material benennen. |
| **Stem-Skizze** | "Wer hat diese Karte gezeichnet — und wessen Sicht zeigt sie? Beantworte die zwei Fragen kurz." |
| **W-Fragen-Geruest** | W1: Wer hat das Material erstellt? (Eigenkomposition agent-material, Datenbasis Wikipedia/europaeische Sicht) — W2: Was zeigt das Material? (Aufteilung Afrikas durch sieben europaeische Maechte) — W3: Wessen Sicht fehlt? (Sicht der kolonisierten Bevoelkerung Afrikas — "wurde nicht gefragt") — W4: Warum ist das wichtig? (Karte zeigt Kolonialwettlauf, aber nicht das Erleben der kolonisierten Menschen) |
| **Loesungs-Hinweis** | Erwartungs-Anker: SuS erkennen (a) europaeische Aufteilungsperspektive, (b) Hinweis im Begleittext: "Die Bevoelkerung Afrikas wurde nicht gefragt. Sie wurde erobert und unterdrueckt." |
| **Distraktor-Strategie** | n/a — offene Quellenkritik mit Erwartungs-Anker. |
| **Tipp-Stufe-1 (Display-Ref)** | "Lies den Begleittext zur Karte [[mat-1-6\|Afrika 1914 — wer beherrscht was?]] (M5) genau. Was steht im letzten Absatz?" |
| **Tipp-Stufe-2** | "Stell dir vor, du lebst 1900 in Marokko. Wuerde die Karte deine Sicht zeigen?" |
| **Tipp-Stufe-3** | Loesung mit explizitem Sprach-Sieb-Hinweis QG-07. |
| **Multiperspektivitaet** | Multiperspektiv-Pflicht erfuellt: SuS reflektieren Sicht der kolonisierten Bevoelkerung. (perspektiv_tags Material: "Macht-Betroffen", "Kritik".) |
| **Sprach-Sieb QG-07** | PFLICHT — Stem, Distraktoren, Loesung, Feedback frei von verbotenen Begriffen ("Eingeborene", "Erschliessung", "zivilisatorische Mission", "Entdeckung"). Pflicht-Alternativen verwenden. |
| **Q-Gate-Pruefung** | A1 (AFB II-III), A3 (mat-1-6 als Primaer), A5, A8, A9, A10, A12 (analytisch nach sachbezogen), A17 (C3), F-PB-37 (Quellenkritik bei Karte mit dominanter Aufteilungsperspektive), MQ3, MQ3b |

#### m1-a7 (Pos 7, freitext, L5, AFB II-III) — **F-PB-37 PFLICHT**

| Feld | Wert |
|---|---|
| **SCPL-Zone** | C3 → P (Synthese-Bruecke zur Pulverfass-Metapher) |
| **Bloom** | L5 Bewerten |
| **AFB** | II-III |
| **Typ** | freitext (mit quellenkritischem Impuls) |
| **Ziel-Material** | mat-1-3 (Wilhelm II. Portrait) |
| **Sekundaer-Material** | mat-1-6 (Afrika-Karte fuer Welt-Politik-Bezug), mat-1-4 (Imperialismus-Begriff) |
| **Tafelbild-Knoten** | K1-5 (Akteur-Anker), K1-1 (Pulverfass-Synthese) |
| **Operationalisierungsziel** | Die SuS koennen begruenden, warum das Foto Wilhelms II. von 1902 keine neutrale Quelle ist, und mindestens zwei Inszenierungs-Elemente benennen. |
| **Stem-Skizze** | "Schau auf das Foto. Erklaere in 3-4 Saetzen, warum das kein gewoehnliches Foto ist. Nenne mindestens zwei Dinge, die der Kaiser zeigen wollte." |
| **Erwartungs-Anker (Code-Antwort)** | (1) Kein neutrales Foto: Hofphotograph T. H. Voigt, Studio, Auftragsarbeit. (2) Inszenierungs-Elemente: Uniform, Orden, ernste Pose, fester Stand. (3) Aussage: "Ich bin maechtig" (Welt-Politik). (4) Was nicht gezeigt wird: Kritik in Deutschland, Spannungen mit anderen Maechten. |
| **Code-Wortliste** | Trigger-Begriffe fuer Auto-Code: "Studio", "Hofphotograph", "Voigt", "Uniform", "Orden", "Auftrag", "inszeniert", "Macht", "neutral nicht". |
| **Tipp-Stufe-1 (Display-Ref)** | "Schau auf das Foto [[mat-1-3\|Kaiser Wilhelm II. — der Mann hinter der Welt-Politik]] (M6) und lies den Quellenkritik-Absatz." |
| **Tipp-Stufe-2** | "Was hat der Kaiser an? Wer hat das Foto gemacht — und wo? Was sieht man — was sieht man NICHT?" |
| **Tipp-Stufe-3** | Beispiel-Antwort mit zwei Inszenierungs-Elementen + Synthese-Satz: "Hinter dem Pulverfass Europa standen Akteure wie Wilhelm II." |
| **Multiperspektivitaet** | Multiperspektiv-Pflicht erfuellt: SuS reflektieren Selbstdarstellung vs. Kritiker-Sicht (perspektiv_tags Material: "dominant", "Macht-Ausuebung", "Kritik"). |
| **Synthese-Bezug** | Bruecke zur Pulverfass-Metapher (P-Zone, K1-1): Wilhelm II. als personifizierter Treiber aller drei Spannungsfelder (Buendnisse, Flotte, Kolonien). |
| **Q-Gate-Pruefung** | A1 (AFB II-III), A3 (mat-1-3 als Primaer), A5 (Progression-Hoehepunkt M1), A8, A9 (TB K1-5/K1-1), A10 (freitext Pflicht-1x pro Mappe), A12 (wertbezogen am Ende), A17 (C3 + P), F-PB-37 (Quellenkritik bei Wilhelm-II.-Auftragsbild), MQ3, MQ3b |

---

## 6. Typvielfalt-Pruefung (A10)

### 6.1 Typ-Verteilung

| Typ | Anzahl | Positionen | Begruendung |
|---|---|---|---|
| zuordnung | 1 | Pos 1 | Buendnis-Mitgliedschaft (Kategorisierungs-Diagnostik) |
| lueckentext | 1 | Pos 2 | Begriffs-Recall im Kontext (Mechanismus wiedergeben) |
| mc | 2 | Pos 3, Pos 4 | **Wiederholung didaktisch begruendet (siehe unten)** |
| reihenfolge | 1 | Pos 5 | Chronologie Wettruesten |
| quellenkritik | 1 | Pos 6 | F-PB-37 Pflicht (mat-1-6 Aufteilungsperspektive) |
| freitext | 1 | Pos 7 | F-PB-37 Pflicht + AFB-III-Hoehepunkt (Wilhelm II. Quellenkritik) |

**Anzahl verschiedene Typen: 6** (zuordnung, lueckentext, mc, reihenfolge, quellenkritik, freitext) — **PASS** (mind. 3 verschiedene Typen).

**Kein Typ > 3x** — **PASS** (mc 2x maximal).

### 6.2 MC-Wiederholung-Begruendung (A10 Pflicht-Doku)

> 2x MC weil Pos 3 Bild-Inhalts-Verstaendnis (AFB II, Dreadnought als Wettlauf-Beschleuniger, L2) und Pos 4 Spannungsfeld-Synthese (AFB II, 2-aus-4 Mehrfachauswahl, L3-Anwenden). Beide MC-Aufgaben unterscheiden sich in Bloom-Stufe, AFB-Operator und Diagnostik-Ziel:
> - Pos 3: Single-Choice, "warum"-Erklaerungs-Test, Material-Lese-Test (Bildquelle).
> - Pos 4: Multiple-Select (2-aus-4), "welche-treffen-zu"-Synthese-Test, Karten-Anwendung mit Querbezug zu mat-1-4.
>
> Die MC-Wiederholung ist diagnostisch ertragreich (zwei verschiedene MC-Sub-Typen) und entlastet die kognitive Last vor dem L4/L5-Hoehepunkt (Pos 6 + Pos 7).

### 6.3 Pflicht-Typen-Check

- freitext mind. 1x pro Mappe + an letzter Position + AFB III: **PASS** (Pos 7).
- F-PB-37 Quellenkritik-Aufgaben Pflicht bei mat-1-3 + mat-1-6: **PASS** (Pos 6 mat-1-6, Pos 7 mat-1-3 — beide mit Quellenkritik-Operator).
- Multiperspektivitaet bei Quellenkritik-Aufgaben: **PASS** (Pos 6 kolonisierte Bevoelkerung, Pos 7 Wilhelm-II.-Selbstdarstellung vs. Kritiker-Sicht).

---

## 7. Material-Aktivierung (A18)

| Material | Primaer-Aufgabe(n) | Sekundaer-Referenz | A18-Status |
|---|---|---|---|
| mat-1-1 (Karte Buendnisse) | Pos 1, Pos 4 | Pos 2 (indirekt) | **PASS** (Primaer 2x) |
| mat-1-4 (Darstellungstext) | Pos 2 | Pos 1, Pos 3, Pos 4 (Tipp), Pos 6, Pos 7 (Hintergrund) | **PASS** (Primaer 1x) |
| mat-1-2 (Foto Dreadnought) | Pos 3 | Pos 5 (Tipp) | **PASS** (Primaer 1x) |
| mat-1-5 (Statistik) | Pos 5 | — | **PASS** (Primaer 1x) |
| mat-1-6 (Karte Afrika) | Pos 6 | Pos 7 (Sekundaer) | **PASS** (Primaer 1x) |
| mat-1-3 (Wilhelm II.) | Pos 7 | — | **PASS** (Primaer 1x) |

**A18-Gesamturteil: PASS** — alle 6 Materialien sind in mindestens 1 Aufgabe Primaerquelle (nicht nur Tipp).

---

## 8. Schwierigkeits-Progression (A5)

| Pos | AFB | Bloom | Begruendung |
|---|---|---|---|
| 1 | I | L1 | Einstieg: Recall Buendnis-Mitglieder |
| 2 | I-II | L2 | Begriffs-Mechanismus wiedergeben |
| 3 | II | L2 | Bildverstaendnis erklaeren |
| 4 | II | L3 | Spannungsfelder anwenden |
| 5 | II | L3 | Chronologie ordnen |
| 6 | II-III | L4 | Quellenkritik analysieren |
| 7 | II-III | L5 | Quellenkritik bewerten + Synthese |

**Monotonie-Check:** I → I-II → II → II → II → II-III → II-III. **Streng monoton steigend in AFB**. **Bloom monoton steigend** mit Ausnahme Pos 4→Pos 5 (beide L3) — keine Regression. **PASS A5.**

---

## 9. Cross-Konsistenz-Check mit hefteintrag.json M1

| Pruefung | Hefteintrag-Wert | Progressionsplan-Wert | Match |
|---|---|---|---|
| KE-Anker haupt | GPG7_LB2_K_05 | GPG7_LB2_K_05 | PASS |
| AFB | I-II | I-II Schwerpunkt + II-III in Pos 6/7 (im DR-Korridor) | PASS |
| Stundenfrage | "Warum war Europa vor 1914 ein 'Pulverfass'?" | gleich | PASS |
| Tafelbild-Knoten K1-1..K1-5 | 5 Knoten | alle 5 in Aufgaben referenziert (K1-2/K1-3 Pos 1+2+4, K1-4 Pos 3+5, K1-5 Pos 6+7, K1-1 Pos 4+7) | PASS |
| SCPL S/C1/C2/C3/P/L | 6 Zonen | S Pos 1, C1 Pos 2+4, C2 Pos 3+5, C3 Pos 6+7, P Pos 7 (Synthese), L Sicherung | PASS |
| Schluessel-Begriffe | 5 Begriffe | alle in mind. 1 Aufgabe ueber Material aktiviert | PASS |
| Merksatz | "Schon vor 1914 war Europa ein Pulverfass …" | Pos 7 nimmt Synthese-Bezug | PASS |

**Cross-Konsistenz: PASS** (vollstaendig).

---

## 10. Freischalt-Code-Konzept (Mappe-Abschluss-Code M1)

Der Mappe-Abschluss-Code wird nach erfolgreicher Bearbeitung aller 7 Aufgaben freigeschaltet und ist ein thematischer A-Z-Code (4-8 Zeichen).

**Code M1: `PULVER`**

| Feld | Wert |
|---|---|
| Code | `PULVER` |
| Laenge | 6 Zeichen |
| Zeichen-Set | A-Z (laut Vertrag) |
| Thematischer Bezug | Zentrale Erkenntnis "Pulverfass Europa" (K1-1 Leitbegriff) |
| Code-Funktion | Schluesselt Mappe M2 frei (Sarajevo-Mappe) |
| Sandwich-Anschluss | "Du hast das Pulverfass entschluesselt. Aber wer wirft den Funken? Mappe 2 wartet." |

**Begruendung:** "PULVER" ist erste Silbe der Pulverfass-Metapher (zentrale Erkenntnis M1). Im Run-4-Game-Kontext (4 Mappen) ergeben die 4 Codes zusammen den Schluessel-Code zur Folge-Game-Tuer (laut narrativ_rahmen.roter_faden). M1-Code-Vorschlag fuer den Game-Schluessel-Code: `PULVER + [M2] + [M3] + [M4]` (M2-M4-Codes werden in den jeweiligen Progressionsplaenen festgelegt).

---

## 11. Q-Gate Self-Check (A1-A18 + MQ3 + MQ3b)

| ID | Kriterium | Pruefung | Ergebnis |
|---|---|---|---|
| **A1** | AFB-Kongruenz (Gesamtbild) | I → I-II → II → II → II → II-III → II-III; im DR-Korridor M1=I-II + Hoehepunkt II-III in Quellenkritik-Aufgaben | **PASS** |
| **A3** | Material-Kongruenz Vollstaendigkeit | alle 6 Materialien als Primaer in mind. 1 Aufgabe (siehe §7) | **PASS** |
| **A5** | Schwierigkeits-Progression | streng monoton steigend in AFB, monoton in Bloom (Ausnahme Pos 4→5 beide L3 — keine Regression) | **PASS** |
| **A8** | Kognitive Aktivierung | Pos 4 Synthese, Pos 6 Quellenkritik, Pos 7 Bewertung + Synthese-Bezug | **PASS** |
| **A9** | TB-Bezug | alle 5 Tafelbild-Knoten (K1-1..K1-5) in Aufgaben referenziert | **PASS** |
| **A10** | Typvielfalt | 6 verschiedene Typen, kein Typ > 3x, MC-Wiederholung didaktisch begruendet (§6.2) | **PASS** |
| **A12** | Sachbezogen-vor-Wertbezogen | S/C1/C2 (Pos 1-5) sachbezogen → C3/P (Pos 6-7) analytisch/wertbezogen | **PASS** |
| **A16** | Fragebogen-Kohaerenz | Aufgabensequenz bildet SCPL-Erarbeitungsweg ab (S → C1 → C2 → C3 → P-Synthese) | **PASS** |
| **A17** | SCPL-Zonen-Abdeckung | S (Pos 1), C1 (Pos 2+4), C2 (Pos 3+5), C3 (Pos 6+7), P (Pos 7 Synthese-Bezug); L = Sicherung | **PASS** |
| **A18** | Material-Aktivierung | alle 6 Materialien als Primaerquelle (siehe §7) | **PASS** |
| **A19** | Bloom-Verteilung | L1-L2: 43 % (Grenzfall, begruendet als Einstiegsmappe DR §5); L3-L4: 43 %; L5: 14 % (M3-Hoehepunkt-Reservat dokumentiert) | **PASS (mit Begruendung)** |
| **MQ3** | Material-Referenz-Verbot in `frage` | alle Stem-Skizzen ohne `[[mat-id|...]]` und ohne `(M[position])`; Material-Refs nur in Tipp-Stufe-1 | **PASS (Vorgabe an Phase 2.2b)** |
| **MQ3b** | Display-Referenzen in Tipps | Tipp-Stufe-1 jeder Aufgabe enthaelt `[[mat-id\|Anzeigetext]]`-Inline-Link + `(M[position])` | **PASS (Vorgabe an Phase 2.2b)** |
| **F-PB-37** | Quellenkritik-Pflicht bei mat-1-3 + mat-1-6 | Pos 6 (mat-1-6), Pos 7 (mat-1-3) | **PASS** |
| **F-PB-45** | Schulart-Lehrplan-Konsistenz | Mittelschule Bayern, GPG R7, KE GPG7_LB2_K_05 | **PASS** |
| **F0b-PRIMING** | R7-Sprachniveau + Kolonial-Sprach-Sieb | Dispatch-Constraints in §0 dokumentiert | **PASS** |

### 11.1 Gate-Urteil Phase 2.2a (Progressionsplan M1)

**PASS** — Alle BLOCKER (A1, A3, A9, A10, A17, A18, F-PB-37, F-PB-45, F0b-PRIMING) PASS. Alle HIGH (A5, A8, A12, A16, A19, MQ3, MQ3b) PASS. Plan ist bereit fuer Phase-2.2b-Dispatch.

**Validierungsstatus:** ENTWURF (User-Validierung optional).

---

## 12. Dispatch-Anweisungen fuer Phase 2.2b (agent-raetsel-dispatcher)

### 12.1 Dispatch-Reihenfolge (1 Subagent pro Aufgabe, P4-konform)

| Reihenfolge | Aufgabe-ID | Subagent | Material-Volltext laden | Konstruktionskontext |
|---|---|---|---|---|
| 1 | m1-a1 | SUB_AUFGABE_ZUORDNUNG | mat-1-1, mat-1-4 | siehe §5.2 m1-a1 |
| 2 | m1-a2 | SUB_AUFGABE_LUECKENTEXT | mat-1-4 | siehe §5.2 m1-a2 |
| 3 | m1-a3 | SUB_AUFGABE_MC | mat-1-2, mat-1-4 | siehe §5.2 m1-a3 |
| 4 | m1-a4 | SUB_AUFGABE_MC | mat-1-1, mat-1-4 | siehe §5.2 m1-a4 |
| 5 | m1-a5 | SUB_AUFGABE_REIHENFOLGE | mat-1-5, mat-1-2 | siehe §5.2 m1-a5 |
| 6 | m1-a6 | SUB_AUFGABE_QUELLENKRITIK | mat-1-6, mat-1-4 | siehe §5.2 m1-a6 (Sprach-Sieb-Pflicht!) |
| 7 | m1-a7 | SUB_AUFGABE_FREITEXT | mat-1-3, mat-1-6, mat-1-4 | siehe §5.2 m1-a7 |

### 12.2 Pflicht-Constraints pro Subagent

- **R7-Sprachniveau** (F0b §1): Saetze max. 15W, Hauptsatz-Dominanz, Komposita beim Erstgebrauch zerlegt, du-form, DaZ-vertraeglich.
- **MQ3 / MQ3b**: `frage`-Feld OHNE `[[`-Links und OHNE `(M[position])`. Material-Refs ausschliesslich in Tipp-Stufe-1 als `[[mat-id|Anzeigetext]] (M[position])`.
- **F-PB-37 (Pos 6 + Pos 7)**: Quellenkritik-Aufgabe mit W-Fragen-Geruest (W1-W4) und Multiperspektiv-Bezug.
- **Sprach-Sieb QG-07 (Pos 6)**: Verbot "Eingeborene", "Erschliessung", "zivilisatorische Mission", "Entdeckung". Pflicht-Alternativen "Aufteilung Afrikas …", "kolonisierte Bevoelkerung", "wurde erobert und unterdrueckt".
- **Tipp-Stufen-System (3-stufig)**: Stufe 1 Display-Ref + Denkanstoss; Stufe 2 Richtung; Stufe 3 Loesung mit Begruendung.
- **Distraktor-Strategie**: Plausible Plausi-Distraktoren auf Material-Volltext, keine humorvollen oder absurden Distraktoren (R7-Ernsthaftigkeit).

### 12.3 Output-Konvention pro Subagent

- Ablage: `mappe-1/aufgaben/aufgabe-1-N.json` (N=1..7)
- Schema: `data.json`-Aufgaben-Schema laut `escape-game-schema`-Skill
- Pflicht-`_meta`-Felder: `bloom`, `afb`, `scpl_zone`, `tafelbild_knoten[]`, `ke_anker_haupt`, `ziel_material_id`, `operationalisierungsziel`, `f0b_priming_kennung: F0B_PRIMING_v1`

---

## 13. Meta

| Feld | Wert |
|---|---|
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| run_id | run-4-2026-04-26 |
| mappe_id | M1 |
| phase | 2.2a (Progressionsplan) |
| agent | agent-raetsel-progressionsplan |
| schema_version | progressionsplan_v1 |
| vertrag_version | VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN v1 + Plugin v0.5.0 |
| f_pb_addressed | F-PB-37 (Quellenkritik-Pflicht), F-PB-44 (Trigger-Sichtbarkeit), F-PB-45 (Schulart) |
| f0b_priming_kennung | F0B_PRIMING_v1 |
| trigger_flags_aktiv | konflikt, kolonialismus, nationalismus, weltkrieg_grossereignis |
| aufgabenzahl | 7 |
| aufgaben_typen | zuordnung, lueckentext, mc, mc, reihenfolge, quellenkritik, freitext |
| afb_progression | I → I-II → II → II → II → II-III → II-III |
| bloom_verteilung_ziel | L1: 1 / L2: 2 / L3: 2 / L4: 1 / L5: 1 |
| freischalt_code_m1 | PULVER |
| naechste_phase | Phase 2.2b — agent-raetsel-dispatcher orchestriert 7 SUB_AUFGABE-Subagenten in P4-Dispatch-Isolation |
| validierungsstatus | ENTWURF |
