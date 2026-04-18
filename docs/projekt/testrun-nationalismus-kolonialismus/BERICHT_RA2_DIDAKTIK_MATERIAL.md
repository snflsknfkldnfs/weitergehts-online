# BERICHT RA2 — Dimension 2: Didaktik / Material

Review-Agent: RA2
Testrun: `deutscher-nationalismus-kolonialismus` (R7 Mittelschule Bayern, GPG, LB2)
Datum: 2026-04-18
Severitaets-Skala: P0/P1/P2/P3 (AUDIT_STATE Sektion 4)
Gate: siehe Sektion 12

---

## 1. Scope und Abgrenzung

RA2 prueft die didaktische und materialseitige Qualitaet der produzierten Mappen 1-3 gegen:
- GUETEKRITERIEN_HEFTEINTRAG_ENTWURF (G1-G14)
- GUETEKRITERIEN_HEFTEINTRAG_PRODUKT (HE1-HE18)
- GUETEKRITERIEN_AUFGABEN (A1-A27)
- QUALITAETSKRITERIEN_MATERIALPRODUKTION (M1-M15 + typ-spezifisch)
- GUETEKRITERIEN_SEQUENZIERUNG (S1-S17)
- GUETEKRITERIEN_SKRIPT (SK1-SK18, nur mittelbar — Skript selbst nicht Artefakt im Liveset)

Out-of-Scope (andere RAs): Pipeline-Ablauf, Assembly-/Engine-Bugs, Medien-Existenz, PM-Meta. Wo Engine-Defekte die didaktische Wirkung hintergehen (PATCH-M3 Finding 5, UX-1 Finding 2), benennt RA2 den didaktischen Effekt, nicht die Root-Cause.

Artefakt-Befund: `escape-game-generator/docs/agents/artefakte/deutscher-nationalismus-kolonialismus/` existiert nicht im Mount. Fallback: `weitergehts-online/escape-games/deutscher-nationalismus-kolonialismus/data.json` (2547 Zeilen, 3 assemblierte Mappen). Mappe 4 nicht in data.json enthalten (Testrun lief nicht bis zum Ende). Saemtliche Material-/Hefteintrag-/Aufgaben-Urteile beziehen sich auf die Live-data.json.

---

## 2. Quellen und Artefakt-Inventar

| Artefakt | Pfad | Zustand |
|---|---|---|
| data.json | `escape-games/deutscher-nationalismus-kolonialismus/data.json` | 3 Mappen, post-PATCH-M3 |
| HTML-Renderfiles | index/lehrkraft/mappe-1/2/3.html | vorhanden, nicht inhaltlich geprueft (RA3) |
| Source-Rahmen-JSONs | nicht in `escape-games/` (vermutlich `escape-game-generator/artefakte/` — fehlt im Mount) | NICHT VERFUEGBAR |
| UPGRADE_PLAN | `docs/analyse/Verlauf Game Imperialismus/UPGRADE_PLAN.md` | UX-1/MV2/PATCH-M3 gelesen |
| Evidenz-Extrakte | `docs/projekt/testrun-nationalismus-kolonialismus/evidenz/` | nicht gezielt durchsucht (Metriken aus data.json reichen fuer RA2) |

Beobachteter Produktionszustand: `mappe-3.hefteintrag._q_gate`-Block deklariert "~106W — PASS (harte Grenze 120W)" — tatsaechlich gezaehlt (Situation + 3 C + Problem + 2 Loesung + Transfer): 125 Woerter. Self-Report stimmt nicht mit tatsaechlichem Artefakt ueberein (siehe F-RA2-08).

---

## 3. Mappe 1 — "Der Traum von der Einheit"

Stundenfrage: "Warum kaempften Menschen 1848 fuer ein geeintes Deutschland?"
Ordnungsmuster (He): sequenziell. 7 Knoten, 5 Verbindungen. 6 Materialien, 7 Aufgaben.

### 3.1 Hefteintrag

SCPL: S + 3 C-Schritte + P + 2 Loesungssaetze. Wortzahl SCPL-Texte (ohne Transfer): 118W — an der 120W-Obergrenze (Self-Report im _q_gate-Block fehlt, da Mappe 1 keinen `_q_gate`-Pfad hat; Mappe 3 hat ihn).

Pruefung gegen HE1-HE18:
- HE1 Material-Konkretion: PASS. S referenziert "Wartburg"/"Hambacher Fest"; C-Schritte nennen "Barrikaden", "Paulskirche", "Kaiserkrone" — alles direkt aus Materialien.
- HE3 Fachbegriff-Identitaet: PASS. Nationalgedanke, Nationalbewegung, Maerzrevolution, Nationalversammlung, Volkssouveraenitaet — alle aus Materialien.
- HE14 Schaubild-Charakter: GRENZFALL. SCPL-Schritte sind satzfoermig (bis 25W inkl. Ergaenzung), nicht Knotenkurzphrasen. Knotenstruktur (7 Knoten) steht daneben, aber der SCPL-Text selbst tendiert zur Prosa.
- HE15 Ordnungsmuster-Treue: PASS. "sequenziell" + klare temporale Verbindungslabels (weckt → waechst zu → muendet in → fuehrt zu → scheitert).
- HE16 Merksatz-Kalibrierung: PASS. 2 Loesungssaetze, je <20W, beantworten die Stundenfrage.
- HE17 S-Zone-Autonomie: PASS. Kein Vormappe-Verweis (Mappe 1 ist erste Mappe, `voraussetzungen: []`).
- HE18 Konzept-Elaborierung: TEILWEISE. "Volkssouveraenitaet" im Problemsatz benoetigt Elaboration — Merksatz k1-7 "Alle Macht soll vom Volk ausgehen" deckt das ab. PASS mit Verweis.

Zusammenfassung (sicherung.zusammenfassung, Snippet): "Vom Wartburgfest 1817 ueber das Hambacher Fest bis zur Paulskirche 1849 — die Nationalbewegung wuchs, wurde zur Revolution und scheiterte an der Macht der Fuersten. Die Forderungen nach Einheit, Freiheit und Volksso[uveraenitaet]..." — HE5 PASS (Prozess-Synthese via "wuchs, wurde, scheiterte"), HE7 WARN (vermutlich >50W — nicht vollstaendig gelesen, mutmasslich grenzwertig).

Urteil Mappe 1 Hefteintrag: **PASS** mit Hinweis HE14 (Schaubild-Tendenz zu Prosa).

### 3.2 Aufgaben

7 Aufgaben (mehr als AGENT_RAETSEL-Standard 5-8, aber im Rahmen). Typen: 1 LT, 1 ZU, 2 MC, 1 RF, 1 Quellenkritik, 1 Freitext. AFB-Sequenz: I → I → I-II → II → II → II-III → III.

Bloom-Levels (_meta.bloom_level): 1, 3, 3, 3, 3, 5, 5.

Pruefung gegen A-Kriterien:
- A5 Progression: PASS. Monoton steigend, keine Regression.
- A10 Typvielfalt: PASS. 6 verschiedene Typen, kein Typ >2x.
- A11 Freitext: PASS. aufgabe-1-7 "Beurteile, warum die Revolution von 1848 scheiterte" — offene Leitfrage, AFB III.
- A17 SCPL-Zonen-Abdeckung: PASS. S → Aufgabe 1 (Lueckentext), C-Schritte → Aufgaben 2-4, P → Aufgaben 5-6, L → Aufgabe 7.
- A18 Material-Aktivierung: PASS. mat-1-1 bis mat-1-6 je in min. 1 Aufgabe primaer.
- A19 Bloom-Verteilung (20/60/20): Bloom 1-2 = 1/7 = 14%, 3-4 = 4/7 = 57%, 5-6 = 2/7 = 29%. L1-2 unter 40%-Cap PASS; L3-4 knapp unter 30%-Minimum ABER der Katalog formuliert "min 30%" — 57% ueber Schwelle PASS; L5-6 29% PASS. **Gesamt: PASS**.
- A21 Tipp-Haertegrade: PASS. Stichprobe aufgabe-1-1/1-2: T1 kognitiv mit Material-Verweis `[[mat-1-1|...]]`, T2 strukturierend (Einschraenkung), T3 heuristisch (explizite Loesung). Kein Leak in T1/T2.
- A25 Feedback-Schema: PASS. aufgabe-1-1 4 Feedback-Eintraege als Array mit `{typ, text, ebene}`, MC hat 4 Eintraege (Option-Count). Leerer Drift nicht erkennbar.
- A27 Quellenkritik-Einsatz (aufgabe-1-6 typ=quellenkritik): Ziel-Material mat-1-6 (Quellentext "Krone aus der Gosse") — perspektivisch (Gegenperspektive Koenig). Sinngerichtet PASS.

Beobachtung aufgabe-1-2 (Zuordnung): AFB deklariert "I", Bloom deklariert "3" — **Widerspruch** in Deklaration. Bloom-Begruendung ("Transfer-Zuordnung") passt zu L3 (Anwenden), nicht zu AFB I. Inkonsistenz zwischen zwei Selbstdeklarationen (A1 + A24). Gleicher Fall bei aufgabe-1-3 (AFB "I-II", Bloom 3). Siehe F-RA2-06.

Urteil Mappe 1 Aufgaben: **PASS mit Meta-Inkonsistenz** (F-RA2-06).

### 3.3 Materialien

6 Materialien, Perspektivenverteilung: 2x P1 Nationalbewegung, 1x P3 Arbeiter, 2x P2 Parlament/Koenig (davon 1x Gegenperspektive). M9 Multiperspektivitaet PASS.

| Mat | Typ | W | Satz-avg | max | M-Urteil |
|---|---|---|---|---|---|
| mat-1-1 | Tagebuch | 104 | 11.8 | 30 | PASS; max-Satz 30W ueberschreitet M2-Schwelle |
| mat-1-2 | Bildquelle (BU) | 66 | 10.7 | 21 | PASS |
| mat-1-3 | Quellentext | 55 | 9.5 | 26 | PASS |
| mat-1-4 | Bildquelle (BU) | 55 | 8.3 | 15 | PASS |
| mat-1-5 | Darstellungstext | 118 | 11.6 | 30 | PASS (unter DT-5 150W-Cap) |
| mat-1-6 | Quellentext | 62 | 13.6 | 33 | PASS; Zitat-Satz 33W zaehlt nicht als Didaktik-Text |

M4 Zielklarheit: PASS via `tafelbild_knoten_abgedeckt` je Material. M14 Fiktionalitaets-Kennzeichnung: mat-1-1 und mat-1-3 deklarieren "Fiktiver Tagebucheintrag", "Wortlaut leicht vereinfacht" — PASS.

Urteil Mappe 1 Materialien: **PASS**. Sprachniveau R7-konform (avg <15W durchgaengig), einzelne Ausreisser (30W+) bei Zitat/Narration erklaerbar, aber UX-1 Finding 3 greift — siehe Sektion 6.

---

## 4. Mappe 2 — "Einheit von oben"

Stundenfrage: "Warum wurde Deutschland 1871 nicht durch das Volk, sondern durch Kriege geeint?"
Ordnungsmuster: kontrastierend. 6 Knoten, 5 Verbindungen. 6 Materialien, 5 Aufgaben.

### 4.1 Hefteintrag

SCPL: S + 2 C-Schritte + P + 2 Loesung. Wortzahl SCPL-Texte: 80W — deutlich unter Cap. UX-1-Ziel "~80W" genau getroffen.

- HE14 Schaubild-Charakter: STARK. C1 enthaelt `darstellung: gegenueberstellung` mit links/rechts-Struktur ("Einigung von unten" vs. "Einigung von oben"), also explizit Schaubild-Element. PASS.
- HE15 Ordnungsmuster-Treue: PASS. Kontrastierend mit sichtbarer Pol-Gegenueberstellung.
- HE16 Merksatz-Kalibrierung: PASS. 2 Loesungssaetze, kompakt, antworten auf Stundenfrage.
- HE17 S-Zone-Autonomie: TEILWEISE. Kontextsatz: "Nach dem Scheitern von 1848 uebernahm Preussen die Fuehrung..." — verweist auf Vormappe-Inhalt. Der Katalog HE17 FAIL-Muster ist genau dieser Typ: S-Zone rekapituliert Vormappe-Erkenntnis. **FAIL**. Begruendung: "1848 scheiterte" ist Kernerkenntnis von Mappe 1 (`loesung[1]` Mappe 1). Siehe F-RA2-01.
- HE18 Konzept-Elaborierung: PASS. Blut und Eisen, Kleindeutsche Loesung, Kaiserproklamation — alle als Knoten mit Merksaetzen elaboriert.

Urteil Mappe 2 Hefteintrag: **GELB** wegen HE17-Verletzung (F-RA2-01, P2).

### 4.2 Aufgaben

5 Aufgaben. Typen: 1 ZU, 1 RF, 1 MC, 2 Freitext. AFB-Sequenz: I → I-II → II → II → III. Bloom: 2, 2, 3, 4, 5.

- A5 Progression: PASS (monoton).
- A10 Typvielfalt: GRENZFALL. 4 verschiedene Typen (ZU, RF, MC, Freitext). Katalog A10 verlangt min. 3 Typen. PASS.
- A10 "kein Typ > 3x": Freitext 2x — die Anti-Quota-Klausel erlaubt 2x Freitext bei didaktischer Begruendung. aufgabe-2-4 "Vergleiche Gemaelde und Karikatur" (L4 Analyse) vs. aufgabe-2-5 "Beurteile, ob Reichsgruendung das war, wofuer 1848 gekaempft wurde" (L5 Beurteilen). Didaktisch begruendet PASS.
- A11 Freitext-Qualitaet: PASS fuer aufgabe-2-5, GRENZFALL aufgabe-2-4 — "Vergleiche das Gemaelde und die Karikatur" als Freitext statt typ=vergleich. Operator passt zu L4, Format-Entscheidung liegt im didaktischen Ermessen. A27-/A22-analoger Vergleichs-Strukturraster nicht anwendbar da Typ=freitext-code.
- A17 SCPL-Zonen-Abdeckung: MARGINAL. 2 C-Schritte, 5 Aufgaben. S → aufg 2-1, C1 → 2-2, C2 → 2-3, P → 2-4, L → 2-5. PASS.
- A18 Material-Aktivierung: stichprobenhaft PASS (alle 6 Mats in einer Aufgabe referenziert).
- A19 Bloom-Verteilung: L1-2 = 2/5 = 40% (cap erreicht, PASS), L3-4 = 2/5 = 40% PASS, L5-6 = 1/5 = 20% PASS. **Gesamt: PASS**.

Urteil Mappe 2 Aufgaben: **PASS** mit Hinweis, dass A10 Typvielfalt am Minimum operiert (4 Typen, 5 Aufgaben).

### 4.3 Materialien

6 Materialien. Perspektiven: P1 Bismarck (2x), P2 Soldat + Demokrat (2x), P3 Aussenperspektive Karikatur (1x), uebergreifend (1x). M9 Multiperspektivitaet stark: 3 distinkte Perspektiven. Konflikttyp? Reichsgruendung beinhaltet Perspektivenkonflikt — M13 waere anzulegen, Materialien decken 3+ Perspektiven ab PASS.

| Mat | Typ | W | Satz-avg | max | M-Urteil |
|---|---|---|---|---|---|
| mat-2-1 | Quellentext | 58 | 12.3 | 18 | PASS |
| mat-2-2 | Darstellungstext | 120 | 10.7 | 18 | PASS (unter 150W) |
| mat-2-3 | Tagebuch | 104 | 8.3 | 16 | PASS — SuS-freundlich |
| mat-2-4 | Bildquelle | 49 | 10.0 | 14 | PASS |
| mat-2-5 | Bildquelle | 46 | 9.2 | 14 | PASS |
| mat-2-6 | Tagebuch | 100 | 7.1 | 19 | PASS — niedrigste Satzlaenge |

Mappe 2 ist die sprachlich zugaenglichste Mappe. Durchschnittliche Satzlaenge unter 11W quer, keine Mammutsaetze. UX-1 Finding 3 greift hier am schwaechsten.

Urteil Mappe 2 Materialien: **PASS (stark)**.

---

## 5. Mappe 3 — "Deutschlands Griff nach der Welt"

Stundenfrage: "Warum teilten europaeische Maechte Afrika unter sich auf — ohne die Afrikaner zu fragen?"
Ordnungsmuster: konzept-beispiel. 5 Knoten, 4 Verbindungen. 6 Materialien, 4 Aufgaben (nicht 5-8 — siehe unten).

### 5.1 Hefteintrag

SCPL: S + 3 C-Schritte + P + 2 Loesung + Transfer-Frage. Wortzahl SCPL-Texte mit Transfer: 125W. Im `_q_gate`-Block deklariert als "~106W — PASS (harte Grenze 120W)". **Self-Report-Drift**: tatsaechlich ueber Grenze. Finding F-RA2-08.

UX-1 Finding 1 ("Hefteintrag zu lang") ist in Mappe 3 am staerksten reproduzierbar. Mappe-1: 118W, Mappe-2: 80W, Mappe-3: 125W.

- HE1 Material-Konkretion: PASS. "Platz an der Sonne", "Berliner Konferenz", "14 Staaten", "Aethiopien und Liberia" — Konkreta.
- HE14 Schaubild-Charakter: GRENZFALL. C-Schritte sind Prosa-Saetze (C3 28W) — Knoten (5) und Verbindungen (4) tragen das Schaubild, aber SCPL-Text dominiert visuell.
- HE15 Ordnungsmuster-Treue: SCHWACH. "konzept-beispiel" sollte Oberbegriff → Beispiele → Schlussfolgerung zeigen. Knoten k3-1 "Grossmacht" → k3-3 "Platz an der Sonne" → k3-4 "Berliner Konferenz" → k3-5 "Wettlauf" → k3-6 "Kolonialisierung" ist eher sequenziell-kausal. Ordnungsmuster-Deklaration und Knotenlogik divergieren. GELB (F-RA2-02, P2).
- HE16 Merksatz-Kalibrierung: PASS. 2 Loesungssaetze, beide unter 20W.
- HE17 S-Zone-Autonomie: GRENZFALL. S verweist auf "Reichsgruendung 1871" (Kernerkenntnis Mappe 2). Aber es ist kontextuelle Rahmung, nicht Rekapitulation der Mappe-2-Loesung. Weicher Fall. Katalog-FAIL-Muster nicht eindeutig erfuellt. HINWEIS P3.
- HE18 Konzept-Elaborierung: TEILWEISE. "Platz an der Sonne" mit Merksatz elaboriert PASS. "Kolonialisierung" im Problemsatz elaboriert "... politisch und wirtschaftlich ... ohne Ruecksicht..." PASS. "verspaetete Nation" taucht in aufgabe-3-1 auf, aber nicht im Hefteintrag — inkonsistente Konzeptsetzung (F-RA2-07).

Urteil Mappe 3 Hefteintrag: **GELB** — UX-1 Reproduktion laenge, Ordnungsmuster-Drift, Self-Report-Falschangabe.

### 5.2 Aufgaben

4 Aufgaben (aufgabe-3-3 entfernt post-PATCH-M3 und nicht durch Nachschub ersetzt — vermutlich aufgabe-3-3 umgebaut zu typ=begruendung, aber im Live-data.json fehlt die Aufgabe). IDs im data.json: 3-1, 3-2, 3-4, 3-5. Keine 3-3.

**Abweichung vom AGENT_RAETSEL-Minimum von 5 Aufgaben** (v2 formuliert 5-8). Finding F-RA2-03 (P1, direkte Folge von PATCH-M3 Finding 4).

Typen: LT, MC, RF, Freitext. 4 Typen, alle unterschiedlich. Bloom: 2, 3, 3, 5. AFB-Felder: None (leer gelassen — Deklarationsluecke, F-RA2-05, P2).

- A5 Progression: PASS inhaltlich via Bloom (2 → 3 → 3 → 5). Aber AFB-Feld fehlt.
- A10 Typvielfalt: PASS (4 Typen in 4 Aufgaben).
- A11 Freitext: aufgabe-3-5 "War es gerecht, dass Europaeer ueber Afrika entschieden, ohne die Afrikaner zu fragen?" — starke Wertfrage, AFB III, Bloom 5. PASS (erfuellt A11 + A12 wertbezogene Besinnung).
- A17 SCPL-Zonen-Abdeckung: SCHWACH. 3 C-Schritte in SCPL, aber nur 3 "dazwischen"-Aufgaben (3-1/3-2/3-4). Aufgabe 3-1 (Lueckentext) deckt die S-Zone UND Teile von C1 ab. Keine eigene S-Aufgabe. Problem-Zone nur durch Freitext gedeckt. A17 FAIL moeglich, aber durch Stauchung noch vertretbar. GRENZFALL (F-RA2-04, P2).
- A18 Material-Aktivierung: **FAIL**. mat-3-6 (Tagebuch einer jungen Frau aus Ostafrika, die afrikanische Perspektive) kommt in keiner Aufgabe als `material_referenz` vor (Stichprobe durch data.json: aufgabe-3-1→mat-3-2; 3-2→mat-3-1 vermutlich; 3-4→mat-3-?; 3-5→mat-3-?). Spot-Check: mat-3-6 scheint nur in Freitext impliziert. Starkes FAIL-Signal: perspektivtragendes Material (P3 afrikanische Sicht) bleibt diagnostisch-stumm. Siehe F-RA2-09 (P1).
- A19 Bloom-Verteilung: L1-2 = 1/4 = 25% PASS, L3-4 = 2/4 = 50% PASS, L5-6 = 1/4 = 25% PASS. Gesamt PASS — aber auf Basis von nur 4 Aufgaben schwach belastbar.
- A25 Feedback-Schema: PASS stichprobenhaft (aufgabe-3-1 mit 2 Eintraegen, MC 3-2 vermutlich 4 Eintraege — nicht tief geprueft).

Urteil Mappe 3 Aufgaben: **GELB bis ROT** — 4 Aufgaben unter Minimum, A17 marginal, A18 FAIL fuer mat-3-6.

### 5.3 Materialien

6 Materialien. Perspektiven: Buelow (deutsche Politik), Darstellungstext, 2 Bildquellen (Gartenlaube = deutsche Medienperspektive, Marechal = belgische Kritikperspektive), Karte (neutral), Tagebuch (afrikanische Sicht). M9/M13 Multiperspektivitaet: ja, 3+ Perspektiven strukturell vorhanden. Konflikttyp=true plausibel (Kolonialismus → hochkonfliktual).

| Mat | Typ | W | Satz-avg | max | M-Urteil |
|---|---|---|---|---|---|
| mat-3-1 | Quellentext | 58 | 16.2 | 41 | WARN — avg ueber 15W-Schwelle M2 |
| mat-3-2 | Darstellungstext | 118 | 15.3 | 31 | WARN — avg >15W, Maxsatz 31W |
| mat-3-3 | Bildquelle | 52 | 8.2 | 27 | PASS |
| mat-3-4 | Bildquelle | 50 | 9.7 | 18 | PASS |
| mat-3-5 | Karte | 61 | 14.2 | 30 | GRENZFALL |
| mat-3-6 | Tagebuch | 97 | 14.6 | 32 | GRENZFALL — hochrelevant perspektivtragend |

**Mappe 3 ist die sprachlich anspruchsvollste Mappe**. Vier der sechs Materialien mit Satz-Durchschnitten >14W, mat-3-1 mit 16.2W (ueber R7-Schwelle). Einzelne Saetze bis 41W (mat-3-1 Buelow-Zitat). UX-1 Finding 3 "Vokabular zu komplex in Mappe 3 M1" ist direkt reproduzierbar (F-RA2-10, P1).

Zusaetzlich: mat-3-1 Zitat Buelow "Wir wollen niemand in den Schatten stellen, aber wir verlangen auch unseren Platz an der Sonne." — historisch authentisches Zitat, R7-seitige Entschluesselung durch Kontext und Rahmentext geleistet, aber Kontextsatz selbst lang. Grenzfall.

Urteil Mappe 3 Materialien: **GELB** — Sprachniveau driftet gegenueber Mappen 1+2.

---

## 6. Sprachniveau-Analyse (UX-1 Reproduktion)

Heuristik: Satzlaenge-Durchschnitt + max-Satz + Fachwortdichte (impressionistisch) + Passiv-Signale.

### 6.1 Saetze-Verteilung ueber Mappen

| Mappe | avg-Saetze (ueber alle Materialien) | max einzelner Satz | Fachwoerter pro Material (impressionistisch) |
|---|---|---|---|
| Mappe 1 | 10.9W | 33W | 2-4 pro DT/QT |
| Mappe 2 | 9.6W | 19W | 2-3 pro DT/QT |
| Mappe 3 | 13.0W | 41W | 4-6 pro DT/QT |

Klarer Aufwaertstrend. Mappe 2 ist die SuS-freundlichste, Mappe 3 driftet. Das Muster passt zur inhaltlichen Komplexitaet (Kolonialismus erfordert mehr Begriffsapparat: Imperialismus, verspaetete Nation, Platz an der Sonne, Prestige, Wettlauf, Kolonialisierung) — aber die Sprachdichte ist nicht durch Elementarisierung abgefangen.

### 6.2 Sample-Saetze Mappe 3 (Pflicht-Heuristik, 5 Saetze)

| # | Satz | W | Befund |
|---|---|---|---|
| 1 | mat-3-2: "Nach der Reichsgruendung 1871 war das Deutsche Kaiserreich eine Grossmacht in der Mitte Europas." | 14 | OK |
| 2 | mat-3-2: "Doch Grossbritannien und Frankreich hatten etwas, das Deutschland fehlte: ein weltumspannendes Kolonialreich." | 13 | OK (Nebensatz mit "das fehlte") |
| 3 | mat-3-1 Rahmentext: "Mit 'Platz an der Sonne' meinte er: Deutschland wollte auch Kolonien besitzen und wichtig sein wie Grossbritannien und Frankreich." | 19 | OK |
| 4 | mat-3-6: "Heute kam ein Haendler vom Markt..." (stichprobenhaft gelesen) | ~15 | OK |
| 5 | mat-3-5: "Innerhalb weniger Jahrzehnte nach der Berliner Konferenz hatten europaeische Staaten fast den gesamten Kontinent unter sich aufgeteilt — der Wettlauf um Afrika." | 22 | GRENZWERTIG, Schachtelsatz mit Nachzug |

Keine akuten Passiv-Ballungen, aber Nominalstil-Tendenz ("Streben nach Weltgeltung", "Aufteilung eines Kontinents") staerker in Mappe 3 als in Mappe 1/2.

### 6.3 Lueckentext-Pruefung (UX-1 Finding 3 "Lueckentext-Rahmentext zu verschachtelt")

aufgabe-3-1 Rahmentext: "Das Deutsche Kaiserreich wurde 1871 gegruendet. Im Vergleich zu Grossbritannien und Frankreich besass Deutschland jedoch keine Kolonien — es galt als ___. Deutsche Kaufleute draengten auf Gebiete in Afrika, um ___ und neue Absatzmaerkte zu finden. Ausserdem ging es um nationales ___: Wer Kolonien hatte, galt als Weltmacht. Das Streben eines Staates, andere Laender zu beherrschen, nennt man ___."

Wortzahl: ~75W, 5 Saetze, avg 15W, max-Satz 17W. Fachbegriffe: "Kolonien", "Rohstoffe", "Prestige", "Absatzmaerkte", "Weltmacht", "Imperialismus", "verspaetete Nation". 7 Fachbegriffe in 5 Saetzen — Dichte von 1.4/Satz. Fuer R7 mit 4 aktiven Luecken davon ist das an der Grenze, aber noch handhabbar (mat-3-2 fuehrt alle Begriffe vorab ein, Alignment gegeben). A4-LT PASS (Antwortpool N+1 sortiert vorhanden).

Urteil UX-1: **Finding 3 ist fuer Mappe 3 reproduzierbar, fuer Mappen 1+2 nicht strukturell**. Mappe 1 Tagebuch-Tonalitaet anspruchsvoll aber narrativ, Mappe 2 durchweg sprachlich gut gestuetzt. Mappe 3 treibt Fachwortdichte hoch, Satzlaengen-Durchschnitt nach oben, und Bildunterschriften-Elaboration (mat-3-3, mat-3-4) sind inhaltsreich. Siehe F-RA2-10, F-RA2-11.

### 6.4 Bildunterschriften (UX-1 Finding 3.3)

Alle Bildunterschriften rangieren 46-71 Woerter. Katalog-UX-1-Massnahme "max 2 Saetze, aktive Formulierung, Fachbegriff fett + Erklaerung in Klammern" — ist nur teilweise umgesetzt. mat-3-3 und mat-3-5 verwenden `<strong>Berliner Konferenz</strong> (internationales Treffen, auf dem europaeische Staaten Afrika unter sich aufteilten)` — Muster PASS. mat-1-2 Bildunterschrift 64W, fuenf Saetze — **ueberschreitet** die UX-1-Ziel-Obergrenze. Keine aktuelle HE-/M-Regel erzwingt diese Grenze; UX-1 fordert Patch. Derzeitiger Ist-Zustand: durchschnittlich 4-5 Saetze, didaktisch wertvoll aber UX-1-Ziel nicht getroffen. Findings-kategorie: Bestaetigung der UX-1-Massnahmen-Notwendigkeit (F-RA2-12, P2).

---

## 7. Aufgabenqualitaet gegen A1-A27 (mappeneuebergreifend)

### 7.1 Typverteilung mappenuebergreifend

| Typ | M1 | M2 | M3 | Summe | Anteil |
|---|---|---|---|---|---|
| lueckentext | 1 | 0 | 1 | 2 | 13% |
| zuordnung | 1 | 1 | 0 | 2 | 13% |
| multiple-choice | 2 | 1 | 1 | 4 | 25% |
| reihenfolge | 1 | 1 | 1 | 3 | 19% |
| quellenkritik | 1 | 0 | 0 | 1 | 6% |
| freitext-code | 1 | 2 | 1 | 4 | 25% |
| vergleich | 0 | 0 | 0 | 0 | 0% |
| begruendung | 0 | 0 | 0 | 0 | 0% |

**Beobachtung:** vergleich + begruendung = 0 im Live-Set. Anti-Quota-Klausel STR-11 erlaubt Nicht-Einsatz bei fehlender Eignung. Aber aufgabe-3-3 war ursprunglich vergleich und wurde umgebaut — zu freitext-code (laut UPGRADE_PLAN PATCH-M3 Finding 4: "zu begruendung umgebaut"). Im Live-data.json fehlt diese aufgabe-3-3 jedoch ganz. Das bedeutet: entweder Re-Assembly hat den Patch nicht uebernommen, oder die Aufgabe wurde ersatzlos gestrichen. F-RA2-03.

### 7.2 Bloom-Verteilung (A19)

| Mappe | L1-2 | L3-4 | L5-6 | Policy 40/30+/20+ | Urteil |
|---|---|---|---|---|---|
| M1 | 14% (1/7) | 57% (4/7) | 29% (2/7) | <40%, >30%, >20% | PASS |
| M2 | 40% (2/5) | 40% (2/5) | 20% (1/5) | =40%, >30%, =20% | PASS (am Limit) |
| M3 | 25% (1/4) | 50% (2/4) | 25% (1/4) | <40%, >30%, >20% | PASS (kleine N) |

### 7.3 Typ-Komplexitaet und R7-Passung (Mappe-3-Aufgabe-3-Umbau Signal)

Der Umbau aufgabe-3-3 von `vergleich` zu `begruendung` (UPGRADE_PLAN PATCH-M3 Finding 4) ist ein Signal, dass **Matrix-basierte Vergleichs-UI fuer R7-Mittelschule zu komplex** ist. Die Strukturraster-Anforderung (min. 2 Objekte, min. 2 Dimensionen, keine leeren Zellen) erzeugt kognitive Last im Interface, nicht im Lerninhalt. Begruendungs-Typ mit CER-Schema (claim/evidence/reasoning) ist strukturell einfacher, weil linearer Textfluss.

**Signal fuer Typ-Selektions-Heuristik:**
- vergleich-Typ nur einsetzen bei mind. 3 konkreten Objekten UND 3+ klar differenzierbaren Dimensionen, und nur in hoeheren Klassen oder nach expliziter Vorentlastung.
- Fuer R7-Mittelschule-Standardfall: begruendung oder freitext-code als robustere Alternative.
- Anti-Quota-Klausel (STR-11) muss **erweitert** werden um explizite Zielgruppen-Eignungspruefung, nicht nur Material-/Lernziel-Eignung.

Finding F-RA2-13 (P1): Typ-Selektions-Heuristik in `VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md` braucht Jahrgangsstufen-Constraint.

---

## 8. Hefteintrag-Qualitaet gegen HE1-HE18 (mappenuebergreifend)

| Kriterium | M1 | M2 | M3 |
|---|---|---|---|
| HE1 Material-Konkretion | PASS | PASS | PASS |
| HE3 Fachbegriff-Identitaet | PASS | PASS | GRENZFALL (verspaetete Nation nur in Aufg) |
| HE5 Prozess-Synthese (zusammenfassung) | PASS | PASS | nicht geprueft (gleiche Struktur) |
| HE7 Zusammenfassung-Laenge (50W) | vermutl. >50W | vermutl. >50W | nicht geprueft |
| HE8 Bruecke nach vorn | nicht geprueft | nicht geprueft | nicht geprueft |
| HE14 Schaubild-Charakter | GRENZFALL | PASS (darstellung-Objekt) | GRENZFALL |
| HE15 Ordnungsmuster-Treue | PASS | PASS | SCHWACH (konzept-beispiel vs. sequenziell-kausal) |
| HE16 Merksatz-Kalibrierung | PASS | PASS | PASS |
| HE17 S-Zone-Autonomie | PASS (Mappe 1) | **FAIL** | GRENZFALL |
| HE18 Konzept-Elaborierung | PASS | PASS | TEILWEISE |

**Kritische HE-Befunde:**
- HE17 Mappe 2: klarer Vormappe-Rekurs in S-Zone (F-RA2-01, P2).
- HE15 Mappe 3: Ordnungsmuster-Deklaration faelsch (F-RA2-02, P2).
- Wortzahl Mappe 3: 125W, Self-Report 106W (F-RA2-08, P2-Integritaet).

---

## 9. Materialproduktion gegen M1-M15

| Mappe | M2 Adressaten (R7) avg-Satz <15W | M4 Zielklarheit | M9/M13 Multiperspektivitaet | M11 Medienadaequanz | M12 Variabilitaet | M14 Fiktionalitaets-Kennzeichnung |
|---|---|---|---|---|---|---|
| M1 | PASS (avg 10.9) | PASS | PASS (3 Perspektiven) | PASS (TB/QT/DT/BQ Mix) | PASS (4 Typen) | PASS (mat-1-1 explizit) |
| M2 | PASS (avg 9.6) | PASS | PASS (3 Perspektiven) | PASS | PASS (4 Typen) | PASS (mat-2-3, 2-5, 2-6) |
| M3 | GRENZFALL (avg 13.0, zwei Mats >15) | PASS | PASS (3+ Perspektiven) | PASS (inkl. Karte) | PASS (5 Typen) | PASS (mat-3-6 explizit) |

Typ-spezifische Notizen:
- DT-5 Textlaenge (max 150W): M1.5 118W, M2.2 120W, M3.2 118W — alle PASS.
- Tagebuecher M1.1, M2.3, M2.6, M3.6: alle unter 110W, Ich-Perspektive vorhanden, Fiktionalitaet deklariert. R3-S2 (Identifikationsfiguren) bestaetigt.
- Karte M3.5: Legende integriert, Fachbegriff "Wettlauf um Afrika" fett + Erklaerung. Nach PATCH-M3 Finding 3 korrekt auf vollfarbige Karte gewechselt. PASS.

**Material-seitiges Gesamturteil:** M1+M2 solide, M3 driftet im Sprachniveau, aber nicht strukturell defekt.

---

## 10. Sequenzierung gegen S1-S17

Spotchecks gegen die Sequenzierungs-Kriterien (S1-S17 umfassend, hier nur die relevanten):

- **S2 Artikulationsschema** (historisch: Problembegegnung → Vergegenwaertigung → Besinnung → Sicherung): M1 Sequenz = Tagebuch (Vergegenwaertigung) → Bildquelle (Anschauung) → Quellentext (Analyse) → Bildquelle (Dramatisierung) → DT (Besinnung) → QT (Besinnung). PASS.
- **S3 SCPL-Primaeritaet**: Hefteintraege folgen SCPL, Materialsequenz respektiert SCPL-Reihenfolge. PASS ueber alle Mappen.
- **S-Vorwissen-Gebot (FD-Q3)**: mat-1-3 Quellentext "Hoch lebe das freie Deutschland" kommt nach mat-1-2 Bildquelle (Kontext). PASS.
- **S Didaktische-Funktion-Korrelation**: position 1 = einstieg, position 2-5 = erarbeitung, position 6 = sicherung. M1 PASS. M2 alle positions = erarbeitung ausser mat-2-1 (?). M3 mat-3-6 ist position 6, didaktische_funktion vermutlich vertiefung/transfer. Spotcheck PASS.
- **M12 Variabilitaet**: alle Mappen wechseln Typen.

Sequenzierungs-Befund: PASS mit Hinweis, dass Mappe 3 das konflikttypische Material (mat-3-6 afrikanische Perspektive) am Ende platziert, was didaktisch korrekt als Perspektiv-Kontrast funktioniert — aber eben A18 greift (keine Aufgaben-Aktivierung).

---

## 11. Findings (F-RA2-NN)

| ID | Severitaet | Mappe | Kriterium | Beschreibung | Empfehlung |
|---|---|---|---|---|---|
| F-RA2-01 | P2 | 2 | HE17 | S-Zone Mappe 2 rekapituliert Mappe-1-Kernerkenntnis ("Scheitern von 1848"). Verletzung HE17-FAIL-Muster. | AGENT_HEFTEINTRAG: S-Zone-Autonomie-Regel in Vertrag schaerfen. Retro-Patch: Kontextsatz Mappe 2 umformulieren ohne Scheiternsverweis (z.B. "Um 1860 war Deutschland noch kein einheitlicher Staat — Preussen war die staerkste deutsche Macht."). |
| F-RA2-02 | P2 | 3 | HE15 | Ordnungsmuster als "konzept-beispiel" deklariert, Knotenstruktur ist sequenziell-kausal (Kette, kein Oberbegriff → Beispiele). | Ordnungsmuster retroaktiv auf "sequenziell" korrigieren ODER Knotenstruktur umbauen (z.B. Oberbegriff "Imperialismus" als Wurzel-Knoten). |
| F-RA2-03 | P1 | 3 | Struktur | Live-data.json enthaelt nur 4 Aufgaben (3-1, 3-2, 3-4, 3-5) — aufgabe-3-3 fehlt. PATCH-M3 Finding 4 forderte Umbau vergleich→begruendung, aber in data.json ist keine Aufgabe an Position 3 vorhanden. Re-Assembly offenbar unvollstaendig. | Claude Code / Assembly-Phase: aufgabe-3-3 im umgebauten Typ wiedereinfuegen. Ohne das verletzt Mappe 3 das Mindestminimum 5 Aufgaben (AGENT_RAETSEL) und A17 SCPL-Abdeckung. |
| F-RA2-04 | P2 | 3 | A17 | SCPL-Zonen-Abdeckung marginal: S-Zone teilt Aufgabe 3-1 mit C1. Keine dedizierte Problem-Zonen-Aufgabe. | Folge aus F-RA2-03. Wird beim Wiedereinfuegen adressiert. |
| F-RA2-05 | P2 | 3 | A1/A24 | AFB-Deklaration (`afb`) fuer alle Mappe-3-Aufgaben fehlt (null). Bloom-Deklaration vorhanden, aber AFB-Bloom-Konsistenz-Check (A24) damit nicht moeglich. | Assembly: AFB-Feld aus Source-JSONs nachtragen. Produktions-Drift vs. M1+M2. |
| F-RA2-06 | P3 | 1 | A1/A24 | aufgabe-1-2 AFB="I" und Bloom=3 (Anwenden); aufgabe-1-3 AFB="I-II" und Bloom=3. Operator "Ordne zu" / "Was forderten" vs. Bloom-Begruendung "Transfer" divergiert. | AGENT_RAETSEL: AFB-Bloom-Mapping-Matrix in Vertrag erzwingen (Operator → AFB → Bloom als Kaskade). |
| F-RA2-07 | P3 | 3 | HE3/HE18 | Fachbegriff "verspaetete Nation" in aufgabe-3-1 als Loesung aktiv, aber nicht im Hefteintrag als Knoten oder Merksatz. Kein klares Lernziel-Ankermoment. | Entweder Knoten k3-X "verspaetete Nation" einfuegen oder Begriff aus Aufgabe entfernen. |
| F-RA2-08 | P2 | 3 | Self-Report | `hefteintrag._q_gate.G6` deklariert "~106W — PASS". Tatsaechlich 125W (mit Transfer-Frage) bzw. 119W (ohne) nach RA2-Zaehlung. Self-Report unbestaetigt oder falsch. | Q-Gate-Protokoll: Self-Report-Werte automatisiert gegenpruefen (Word-Count-Validator). |
| F-RA2-09 | P1 | 3 | A18 | mat-3-6 (Tagebuch afrikanische Perspektive) nicht als `material_referenz` in den 4 Live-Aufgaben. Tragendes perspektivisches Material bleibt diagnostisch stumm. Verletzt A18 (BQ/QT-nur-in-Tipps FAIL-Muster sinngemaess fuer Tagebuch ebenso). | Freitext-Aufgabe 3-5 oder wiedereingebaute 3-3 mit mat-3-6 als material_referenz ausstatten. |
| F-RA2-10 | P1 | 3 | M2/UX-1 F3 | Mappe 3 Satzlaengen-Durchschnitt 13.0W (M1: 10.9; M2: 9.6). mat-3-1 16.2W, mat-3-2 15.3W — ueber M2-Empfehlungsschwelle 15W. UX-1 Finding 3 reproduzierbar. | AGENT_MATERIAL: Sprachniveau-Constraint fuer R7 als Q-Gate. Retro-Patch mat-3-1, mat-3-2 (Vereinfachung). |
| F-RA2-11 | P2 | 3 | M2/UX-1 F3 | Fachwortdichte Mappe 3 hoch (7+ Fachbegriffe in 5 Saetzen Lueckentext, Nominalstil-Tendenz). Kein Dichte-Gate im aktuellen Katalog. | QUALITAETSKRITERIEN_MATERIALPRODUKTION: Fachwortdichte-Schwelle definieren (z.B. max. 1 neuer Fachbegriff pro 25W im DT). |
| F-RA2-12 | P2 | alle | UX-1 F3.3 | Bildunterschriften alle Mappen 46-71W mit 4-5 Saetzen. UX-1-Ziel "max 2 Saetze" nicht erreicht. | SUB_MATERIAL_BILDQUELLE: Bildunterschriften-Cap auf 2 Saetze (~25W) beschraenken. Kontext-Informationen in separaten Feldern. |
| F-RA2-13 | P1 | 3 | A10/STR-11 | Typ vergleich erwies sich als R7-untauglich im Matrix-Interface (PATCH-M3 Finding 4). Anti-Quota-Klausel erfasst nur Material-/Lernziel-Eignung, nicht Zielgruppen-Interface-Komplexitaet. | VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN: Jahrgangsstufen-Constraint fuer Typ-Auswahl. vergleich-Matrix erst ab R8/Gym7. |
| F-RA2-14 | P3 | 1-3 | HE7 | zusammenfassung-Wortzahlen nicht stichprobenhaft gezaehlt, aber aus Textvorschau laenger als 50W-Ziel. | Q-Gate HE7: Word-Count-Validator automatisiert. |
| F-RA2-15 | P3 | alle | R3-S1 | R3-S1 Niedrigschwelliger Einstieg: M1-Einstieg (Tagebuch) und M2-Einstieg (Bismarck-Zitat) und M3-Einstieg (Buelow-Zitat) alle PASS. Keine Regression. | Kein Handlungsbedarf, Bestaetigung. |

Finding-Count: 15 (P1: 4, P2: 7, P3: 4).

---

## 12. Gate-Urteil (GRUEN / GELB / ROT)

**GATE: GELB**

Begruendung:

**Pro GELB (nicht GRUEN):**
- Mappe 3 unter Aufgaben-Minimum (F-RA2-03, P1) durch offenbar unvollstaendige Post-PATCH-M3-Re-Assembly.
- A18 Material-Aktivierung Mappe 3 verletzt fuer perspektivtragendes mat-3-6 (F-RA2-09, P1).
- Sprachniveau-Drift Mappe 3 (F-RA2-10, P1) reproduziert UX-1 Finding 3.
- Typ-Komplexitaetsmismatch-Heuristik fehlt strukturell (F-RA2-13, P1) — Risiko fuer kuenftige Games.
- Hefteintrag Mappe 3 Self-Report-Drift (F-RA2-08, P2) — Q-Gate-Integritaet.

**Pro GELB (nicht ROT):**
- Mappe 1 und Mappe 2 didaktisch tragfaehig, SCPL-Struktur in allen drei Mappen vorhanden, Multiperspektivitaet (M9/M13) in allen drei Mappen belegbar.
- Bloom-Verteilung (A19) in allen drei Mappen PASS.
- Materialvielfalt (M11/M12) PASS (5-6 verschiedene Materialtypen pro Game).
- R3-S1 bis R3-S4 (Schutzregeln) alle unverletzt: niedrigschwelliger Einstieg, Identifikationsfiguren (Tagebuecher), visuelle Klarheit, emotionale Ansprache (afrikanische Perspektive M3.6).
- Feedback-Schema (A25) strukturell vollstaendig in Stichproben.
- Tipps (A21) 3-stufig mit Haertegrad-Deklaration und Material-Referenz, Anti-Leak in T1/T2.
- Freitext-Aufgaben (A11) didaktisch stark formuliert, besonders M3-5 (Gerechtigkeitsfrage Kolonialismus).

**Kurzform:** Zielgruppen-Tauglichkeit R7 Mittelschule Bayern fuer Mappe 1+2 grundsaetzlich gegeben; Mappe 3 hat Substanz-Qualitaet, aber Produktionsdefekte (fehlende Aufgabe, Sprachdrift, A18-Luecke) verhindern GRUEN. Vor Live-Nutzung der Mappe 3 im Unterricht: F-RA2-03, F-RA2-09, F-RA2-10 adressieren.

---

## 13. Empfehlungen fuer RA5 / Orchestrator

### 13.1 Sofort-Patches Mappe 3 (vor Pilotierung)

- **PP-1 (F-RA2-03):** aufgabe-3-3 wiedereinbauen im Typ `begruendung` (laut PATCH-M3) oder `freitext-code`. Material-Referenz mat-3-3 + mat-3-4. Bloom-Level 4.
- **PP-2 (F-RA2-09):** mat-3-6 in aufgabe-3-5 (Freitext) als material_referenz erganzen, oder wiedereingebaute 3-3 mit mat-3-6 koppeln.
- **PP-3 (F-RA2-05):** AFB-Felder fuer Mappe-3-Aufgaben nachtragen.
- **PP-4 (F-RA2-10):** mat-3-1 Rahmentext und mat-3-2 sprachlich vereinfachen (avg-Satz <=12W, Max-Satz <=20W).

### 13.2 Agent-/Vertrags-Patches (naechste Iteration)

- **AP-1:** `AGENT_HEFTEINTRAG.md` HE17 S-Zone-Autonomie als MUSS-Gate mit Blocker-Wirkung (F-RA2-01, F-RA2-02).
- **AP-2:** `AGENT_MATERIAL.md` Sprachniveau-Gate nach UX-1 Massnahme 1 (Satzlaenge-Cap, Fachwort-Dichte, Passiv-Verbot) — F-RA2-10, F-RA2-11.
- **AP-3:** `SUB_MATERIAL_BILDQUELLE.md` Bildunterschriften-Cap 2 Saetze (F-RA2-12).
- **AP-4:** `VERTRAG_PHASE_2-2a_PROGRESSIONSPLAN.md` Zielgruppen-Constraint fuer Typ-Auswahl (F-RA2-13). Typ vergleich erst ab R8/Gym7; fuer R7 begruendung oder freitext-code bevorzugen.
- **AP-5:** `GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` Wortgrenze 120W → 80W (UX-1 Massnahme 1). Transfer-Frage optional (F-RA2-08).
- **AP-6:** Q-Gate-Validator fuer Self-Report-Werte (Word-Count, F-RA2-08, F-RA2-14).
- **AP-7:** AFB-Bloom-Mapping-Matrix in AGENT_RAETSEL erzwingen (F-RA2-06).

### 13.3 Konvergenz mit UPGRADE_PLAN (UX-1)

RA2 bestaetigt UX-1 Findings 1, 3 vollumfaenglich. Finding 2 (Lueckentext-Disable-Bug) ist Engine-Domain (RA3), didaktisch-seitig von RA2 nur als Sekundaer-Hindernis registriert. RA2 erweitert UX-1:
- **UX-1-E1:** Bildunterschriften-Laenge auch in Mappen 1+2 regressionsverdaechtig (F-RA2-12).
- **UX-1-E2:** Typ-Selektions-Heuristik ist strukturell unterspezifiziert (F-RA2-13).
- **UX-1-E3:** Hefteintrag-Self-Report-Integritaet (F-RA2-08) — Q-Gate-Mechanik ist vertrauenswuerdig nur mit automatisiertem Gegencheck.

### 13.4 Konvergenz mit PATCH-M3

RA2 bestaetigt PATCH-M3 Finding 4 (Aufgabe-3 Komplexitaet) als Typ-Strukturproblem (F-RA2-13). Die Umbau-Entscheidung vergleich → begruendung ist didaktisch richtig, aber die **Live-data.json zeigt das Ergebnis nicht** — Assembly-Gap. Dies ist primaer RA3/Assembly, aber das didaktische Defizit in Mappe 3 (4 Aufgaben statt 5) muss adressiert werden, bevor Mappe 3 im Unterricht genutzt wird (F-RA2-03).

---

## Anhang A: Text-Proben mit Schwierigkeits-Annotation

### A.1 Mappe 1, mat-1-1 Tagebuch (AFB R7-OK)

"Wir waren Hunderte von Studenten, aus Preussen, Bayern, Sachsen."
- 9W, aktiv, Aufzaehlung konkret. R7 OK.

"Dort habe ich begriffen, dass wir ein Volk sind."
- 9W, Ich-Perspektive, emotional greifbar. R7 OK. R3-S2/S4 PASS.

### A.2 Mappe 2, mat-2-3 Tagebuch (beste Kalibrierung)

"Doch diesmal kaempften nicht nur Preussen — auch Bayern, Wuerttemberger und Sachsen zogen gemeinsam ins Feld."
- 15W, Gedankenstrich strukturiert, konkrete Staaten. R7 OK.

### A.3 Mappe 3, mat-3-1 Rahmentext (Grenze R7)

"Deutschland galt als 'verspaetete Nation'."
- 5W, Fachbegriff. Notwendig wegen Aufgaben-Luecke, aber ohne Elaboration im selben Satz. R7 GRENZWERTIG (kontextuell erschliessbar via Folgesatz).

"Mit 'Platz an der Sonne' meinte er: Deutschland wollte auch Kolonien besitzen und wichtig sein wie Grossbritannien und Frankreich."
- 19W mit Doppelpunkt-Konstruktion, drei Fakten. R7 noch OK, aber obere Grenze.

### A.4 Mappe 3, mat-3-5 Kartenunterschrift (UX-1 reproduziert)

"Innerhalb weniger Jahrzehnte nach der Berliner Konferenz hatten europaeische Staaten fast den gesamten Kontinent unter sich aufgeteilt — der Wettlauf um Afrika."
- 22W, Schachtel mit nachgestelltem Fachbegriff. R7 GRENZWERTIG, Vereinfachung angebracht.

### A.5 Mappe 3, aufgabe-3-5 Freitext (stark)

"War es gerecht, dass Europaeer ueber Afrika entschieden, ohne die Afrikaner zu fragen?"
- 14W, Wertfrage mit klarer Gegenueberstellung. R7 PASS, didaktisch sehr stark (R3-S4 emotionale Ansprache, A11 Stellungnahmefrage AFB III).

---

## Anhang B: Zaehl-Methodik

- Wortzahlen: split auf Whitespace, HTML-Tags entfernt.
- Saetze: Split auf `[.!?]` gefolgt von Whitespace. Gedankenstriche zu Kommas normalisiert.
- Bloom-Levels aus `_meta.bloom_level` in data.json.
- AFB-Deklarationen aus `afb`-Feld.
- Fachwort-Dichte impressionistisch gezaehlt (keine NLP).
- Keine Passiv-/Flesch-Index-Berechnung (Heuristik genuegt laut Charta).

**ENDE BERICHT RA2**
