# Material-Geruest: Mappe 1 — Wer ueberlebt im Schuetzengraben?

**Game-ID:** verlauf-erster-weltkrieg-marne-ende
**Erstellt:** 2026-04-09 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** ENTWURF (User-Validierung ausstehend)
**Eingabe:** SKRIPT Chunk 1, TAFELBILD Mappe 1 (SCPL, STRUKTUR-FREEZE), DIDAKTIK_RAHMEN

**Konflikttyp:** true
**Perspektiven-Policy:** P1: Deutsche Soldaten (Gefreiter, Oberleutnant) | P2: Britische/Franzoesische Soldaten | P3: Militaerfuehrung (Falkenhayn)

---

## SCPL-Abdeckung (aus TAFELBILD, fixiert)

| SCPL-Zone | Kurztext | Fachbegriffe | Material-Abdeckung |
|---|---|---|---|
| S | Ab Herbst 1914 graben sich die Armeen auf 700 km ein — Bewegungskrieg wird zum Stellungskrieg | Stellungskrieg | mat-1-1 (BQ: Grabenfoto aktiviert), mat-1-2 (TB: fuehrt Begriff ein) |
| C1 | Soldaten leben in Schuetzengraeben voller Wasser, Ratten und Leichen | Schuetzengraben | mat-1-2 (TB: Gefreiter beschreibt Alltag) |
| C2 | 1915 setzen die Deutschen bei Ypern erstmals Chlorgas ein — 90.000 Tote | Giftgas | mat-1-3 (DT: erklaert Giftgas-Einsatz und Folgen) |
| C3 | Bei Verdun 1916 sterben 600.000 Soldaten fuer wenige Kilometer Boden | Ausblutungsschlacht | mat-1-4 (QT: Stimmen von Verdun und Somme) |
| P | Die Technologie der Abwehr ist staerker als der Angriff — Materialschlacht | Materialschlacht | mat-1-5 (TB: Oberleutnant erlebt Hoffnungslosigkeit) |
| L1 | Der Stellungskrieg zwang Soldaten jahrelang in Schuetzengraeben unter unmenschlichen Bedingungen | — | Synthese aus mat-1-1, mat-1-2 |
| L2 | Neue Waffen wie Giftgas machten jeden Angriff zur Todesfalle | — | Synthese aus mat-1-3 |
| L3 | Bei Verdun und der Somme 1916 starben Hunderttausende — die Front verschob sich kaum | — | Synthese aus mat-1-4 |

**DIRECT-Check:** 100% (5/5 Zonen DIRECT). Schwelle 70% erreicht: JA.

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget |
|---|---|---|---|---|---|---|---|
| ID | Typ | Titel | Skript-Absatz | SCPL-Zone | Artefakt-Ref | Quelle/Erstellung | W-Budget | sensibilitaets_markierung |
|---|---|---|---|---|---|---|---|---|
| mat-1-1 | bildquelle | Wie sah der Krieg im Graben wirklich aus? | §1 | S | img-1-1 | Wikimedia: Cheshire Regiment trench 1915 | ~40W | keine |
| mat-1-2 | tagebuch | Was erlebte ein Soldat Tag fuer Tag im Schuetzengraben? | §1–§2 | C1 | rolle-1-1 | AGENT schreibt: Gefreiter aus Schlesien, November 1914 | ~120W | keine |
| mat-1-3 | darstellungstext | Warum wurde Gas zur Waffe? | §3 | C2 | — | AGENT schreibt auf Basis INHALTSBASIS (Ypern 1915, Chlorgas, 90.000 Tote) | ~130W | gewalt_altersfilter |
| mat-1-4 | quellentext (rekonstruiert) | Wofuer starben Hunderttausende bei Verdun und der Somme? | §4–§5 | C3 | zit-1-1, zit-1-2 | Falkenhayn-Paraphrase + Britischer Infanterist-Paraphrase | ~100W | keine |
| mat-1-5 | tagebuch | Was machte der Krieg mit den Soldaten? | §6 | P | rolle-1-2 | AGENT schreibt: Oberleutnant aus Berlin, 1916–1917 | ~110W | keine |

**Dispatch-Constraints aus Inhaltsaudit (BEFUND_PHASE_1_INHALTSAUDIT):**
- **mat-1-3 (gewalt_altersfilter):** `altersfilter_hinweis`: Giftgas-Beschreibung altersgerecht filtern — Wirkung benennen, aber keine explizite Leidensdarstellung. Fokus auf Faktum + Konsequenz, nicht auf Sterbevorgang.
- **mat-1-3 (M1-A2, HIGH):** Dispatch-Constraint: Der DT MUSS die KAUSALE Frage erarbeitbar machen "Warum Gas?" — die Fakten liefern, aus denen SuS die Kausalkette Stellungskrieg festgefahren → Generaele suchten technologischen Ausweg → Giftgas als Eskalation SELBST ableiten koennen. Nicht nur WAS (Chlorgas, Ypern), sondern die Voraussetzungen fuer das WARUM. (v3.6: "erarbeitbar machen" statt "beantworten" — kognitive Eigenleistung erhalten)
- **mat-1-4 (UE-001, HIGH):** Typ geaendert zu `quellentext (rekonstruiert)`. Dispatch-Constraint: Fussnote MUSS "Rekonstruierter Text auf Basis historischer Quellen" enthalten. `_meta.aufbereitung: "rekonstruiert"`.

**Wortbudget gesamt:** ~500W (Ziel: max. 500W)

**Mindest-Check:** 1 darstellungstext (mat-1-3) ✓ | 1 quelle/bild (mat-1-1 BQ, mat-1-4 QT) ✓ | 1 personifiziert (mat-1-2, mat-1-5) ✓ | 1 visuell (mat-1-1 BQ) ✓ | gesamt 5 ≥ 4 ✓

**Perspektiven-Abdeckung (Konflikttyp=true):**
- P1 Deutsche Soldaten: mat-1-2 (Gefreiter), mat-1-5 (Oberleutnant) ✓
- P2 Britische/Franzoesische Soldaten: mat-1-4 zit-1-2 (Britischer Infanterist) ✓
- P3 Militaerfuehrung: mat-1-4 zit-1-1 (General Falkenhayn) ✓
- 3/3 Perspektiven repraesentiert ✓

---

## Zielklarheit-Pruefung

| Material | Funktion (1-Satz) | SCPL-Zone | Artefakt-Ref |
|---|---|---|---|
| mat-1-1 | Dieses Material zeigt den Schuetzengraben als konkreten Ort und aktiviert die Frage, wie das Leben dort war. | S | img-1-1 |
| mat-1-2 | Dieses Material laesst SuS den Alltag im Graben durch die Augen eines Soldaten miterleben — Naesse, Angst, Hunger. | C1 | rolle-1-1 |
| mat-1-3 | Dieses Material erklaert, warum Giftgas 1915 eingesetzt wurde und welche Folgen es hatte. | C2 | — |
| mat-1-4 | Dieses Material zeigt durch Stimmen von beiden Seiten, wie Verdun und die Somme zum sinnlosen Massensterben wurden. | C3 | zit-1-1, zit-1-2 |
| mat-1-5 | Dieses Material macht die psychologische Wirkung der Materialschlacht greifbar — von Hoffnung zu Hoffnungslosigkeit. | P | rolle-1-2 |

---

## Nicht verwendete Artefakte

- **img-1-2** (Deutsche Gasmaske 1915) — Reserve fuer mat-1-3 (konnte als ergaenzende BQ in Phase 2 integriert werden, aber 500W-Budget begrenzt 6. Material). Eignung: Vertiefung C2 als separates BQ-Material.
- **img-1-3** (Verlassener Schuetzengraben mit Stacheldraht 1917) — Reserve. Nicht im SKRIPT-Text direkt referenziert. Eignung: Sicherungs-Illustration oder Mappe-2-Uebergang.
- **pq-1-1** (Feldpostbrief Infanterist Mai 1915: "Drei Kameraden gestorben") — Reserve. Inhaltlich redundant mit rolle-1-1 (beide C1-Zone). Eignung: Ergaenzende Multiperspektivitaet oder Aufgaben-Material in Phase 2.
- **pq-1-2** (Falkenhayn-Befehl Verdun, Paraphrase) — Inhaltlich in zit-1-1 abgedeckt. Reserve.
- **rolle-1-3** (Krankenschwester an der Front: Verwundete 1916) — Reserve. Wuerde weibliche Perspektive an der Front bringen (Multiperspektivitaet). Budget-Limit verhindert 6. Material. Eignung: Hoch — bei Budget-Erweiterung als mat-1-6 (vertiefung, P/C3).

---

## Erarbeitbarkeits-Nachweis

| SCPL-Zone | Material | Erarbeitungsweg |
|---|---|---|
| S: Stellungskrieg ab Herbst 1914 | mat-1-1 (BQ: Grabenfoto, BU benennt 700 km Front) + mat-1-2 (TB: Gefreiter erlebt Stellungskrieg) | SuS sehen den Graben (mat-1-1), dann lesen sie, wie ein Soldat ihn erlebte (mat-1-2). Die Situation — Krieg erstarrt in Graeben — wird visuell und narrativ greifbar. |
| S→C1 (Uebergang) | mat-1-1 → mat-1-2 | Das Foto zeigt den Ort, das Tagebuch zeigt das Erleben. SuS schliessen: So sah es aus — und so fuehlte es sich an. | kausal_mechanismus: Visueller Eindruck (Graben) → Frage nach Erleben → persoenlicher Bericht beantwortet sie. |
| C1: Schuetzengraben-Alltag | mat-1-2 (TB: Gefreiter beschreibt Naesse, Kaelte, Angst, Artillerie) | SuS erschliessen Lebensbedingungen direkt aus dem persoenlichen Bericht: Wasser, Ratten, Artillerie, Schlaflosigkeit. |
| C1→C2 (Uebergang) | mat-1-2 → mat-1-3 | Vom alltaeglichen Elend zur technologischen Eskalation: Der Graben war schon schlimm — dann kam Gas. | kausal_mechanismus: Stellungskrieg festgefahren → Generaele suchen technologischen Ausweg → Giftgas als Eskalationsversuch (M1-A2 Finding: muss im DT explizit werden). |
| C2: Giftgas bei Ypern 1915 | mat-1-3 (DT: Chlorgas-Einsatz, Wirkung, 90.000 Tote) | SuS lesen, was am 22. April 1915 passierte: gruener Nebel, Erstickung, Langzeitfolgen. Der Darstellungstext erklaert Ursache und Wirkung. |
| C2→C3 (Uebergang) | mat-1-3 → mat-1-4 | Von der Waffe zum strategischen Kalkuel: Gas war brutal — aber die Generaele planten noch Schlimmeres. | kausal_mechanismus: Technologische Eskalation (Gas) loest Militaerstrategie nicht → Generaele setzen auf Massensterben als Zermürbungsstrategie (Verdun "ausbluten"). |
| C3: Verdun 1916 Ausblutungsschlacht | mat-1-4 (QT: Falkenhayn "ausbluten" + brit. Infanterist "Wie Kaninchen") | SuS hoeren zwei Stimmen: den General, der das Sterben plant, und den Soldaten, der es erleidet. Beide belegen: 600.000 Tote bei Verdun, 1 Mio. an der Somme. |
| C3→P (Uebergang) | mat-1-4 → mat-1-5 | Vom strategischen Massensterben zur persoenlichen Konsequenz: Was tat das mit den Menschen, die ueberlebten? | kausal_mechanismus: Massensterben bei Verdun/Somme → individuelle Hoffnungslosigkeit → Erkenntnis, dass Abwehr staerker als Angriff = Materialschlacht ohne Aussicht. |
| P: Materialschlacht — Abwehr staerker als Angriff | mat-1-5 (TB: Oberleutnant beschreibt Wandel von Hoffnung zu Hoffnungslosigkeit) | SuS erleben, wie ein Offizier erkennt: Maschinengewehre und Stacheldraht machen jeden Angriff aussichtslos. Die Technologie des Todes hat gewonnen. |

**Abdeckungs-Check:** Jede Zone ≥1 Material ✓ | Jeder Uebergang belegt ✓ | Artefakt-Refs vollstaendig (mat-1-3 ohne Artefakt-Ref begruendet: AGENT schreibt DT auf Basis INHALTSBASIS) ✓

---

## Sequenzplan

| # | Material-ID | Typ | Didaktische Funktion | SCPL-Zone | material_charakter | bildfunktion | analyseauftrag | personalisiert | primary_scpl_zone | aktivierungscharakter | fachbegriffe_eingefuehrt | fachbegriffe_referenziert | Voraussetzung | Kerninhalt (1 Satz) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mat-1-1 | bildquelle | einstieg | S | vergegenwaertigung | illustrativ | false | false | S | bild | [] | [] | — | Ein Foto des Cheshire Regiments zeigt den Schuetzengraben als realen Ort des Krieges. |
| 2 | mat-1-2 | tagebuch | erarbeitung | C1 | vergegenwaertigung | n/a | false | true | C1 | — | [Stellungskrieg, Schuetzengraben] | [] | mat-1-1 | Ein Gefreiter aus Schlesien beschreibt Naesse, Kaelte, Ratten und die staendige Angst vor Artillerie. |
| 3 | mat-1-3 | darstellungstext | erarbeitung | C2 | vergegenwaertigung | n/a | false | false | C2 | — | [Giftgas] | [Stellungskrieg] | mat-1-2 | Am 22. April 1915 setzten die Deutschen bei Ypern erstmals Chlorgas ein — 90.000 Soldaten starben im Krieg durch diese Waffe. |
| 4 | mat-1-4 | quellentext | erarbeitung | C3 | vergegenwaertigung | n/a | false | false | C3 | — | [Ausblutungsschlacht] | [Stellungskrieg] | mat-1-3 | General Falkenhayn wollte Frankreich bei Verdun "ausbluten" — ein britischer Soldat an der Somme nannte es "wie Kaninchen im Gewehrfeuer". |
| 5 | mat-1-5 | tagebuch | vertiefung | P | vergegenwaertigung | n/a | false | true | P | — | [Materialschlacht] | [Stellungskrieg, Schuetzengraben, Ausblutungsschlacht] | mat-1-4 | Ein Oberleutnant beschreibt, wie seine Hoffnung auf Sieg in den Jahren 1916–1917 in Hoffnungslosigkeit umschlug. |

### Uebergangsobjekte

| Von → Nach        | rueckbezug_inhalt_ref                                                                                                | vorausblick_frage                                                                   | kausalitaets_typ | intentionsskizze                                                                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mat-1-1 → mat-1-2 | Das Foto zeigte den Schuetzengraben als engen, nassen Ort — Soldaten zusammengedraengt im Schlamm.                   | Wie erlebten die Soldaten ihren Alltag in diesen Graeben wirklich — Tag fuer Tag?   | vertiefend       | Das Foto hat einen visuellen Eindruck gegeben. Jetzt sollen die SuS durch einen persoenlichen Tagebucheintrag erfahren, wie sich das Leben im Graben angefuehlt hat — der Wechsel vom Sehen zum Miterleben.             |
| mat-1-2 → mat-1-3 | Der Tagebucheintrag zeigte den taeglichen Kampf ums Ueberleben — Naesse, Ratten, Artillerie, Schlaflosigkeit.        | Welche neue Waffe machte den Stellungskrieg ab 1915 noch schrecklicher?             | temporal         | Vom persoenlichen Alltag im Graben wird der Blick auf eine technologische Eskalation gelenkt: Giftgas. Die SuS verstehen, dass der Krieg nicht statisch blieb, sondern sich verschaerfte.                               |
| mat-1-3 → mat-1-4 | Giftgas bei Ypern 1915 zeigte eine neue Dimension der Brutalitaet — 90.000 Tote durch chemische Waffen.              | Was passierte, als Generaele Hunderttausende in aussichtslose Schlachten schickten? | kausal           | Von der Waffentechnik zum strategischen Kalkuel: Verdun und die Somme sind das Ergebnis einer Kriegsfuehrung, die menschliches Leid bewusst einkalkuliert. Die Quellen lassen die SuS Stimmen von beiden Seiten hoeren. |
| mat-1-4 → mat-1-5 | Bei Verdun starben 600.000 Soldaten fuer wenige Kilometer — an der Somme fielen 57.000 Briten an einem einzigen Tag. | Was machte diese Erfahrung mit den Menschen, die sie durchleben mussten?            | kausal           | Von der strategischen Ebene zurueck zur persoenlichen: Ein Oberleutnant beschreibt, wie die Hoffnung starb. Die SuS sollen die psychologische Dimension der Materialschlacht erfassen — Krieg als Zustand ohne Ende.    |

### Sequenzkontext-Objekte

| Material-ID | vorher (ID, Typ, Kerninhalt) | nachher (ID, Typ, Kerninhalt) |
|---|---|---|
| mat-1-1 | — | mat-1-2, tagebuch, Ein Gefreiter beschreibt seinen Alltag im Schuetzengraben. |
| mat-1-2 | mat-1-1, bildquelle, Foto zeigt Soldaten im Schuetzengraben 1915. | mat-1-3, darstellungstext, Giftgas-Einsatz bei Ypern 1915 und seine Folgen. |
| mat-1-3 | mat-1-2, tagebuch, Persoenlicher Bericht ueber den Graben-Alltag. | mat-1-4, quellentext, Stimmen zu Verdun und der Somme 1916. |
| mat-1-4 | mat-1-3, darstellungstext, Giftgas als neue Waffe im Stellungskrieg. | mat-1-5, tagebuch, Ein Offizier beschreibt den Wandel von Hoffnung zu Hoffnungslosigkeit. |
| mat-1-5 | mat-1-4, quellentext, Verdun und Somme als industrielles Massensterben. | — |

---

## Einstieg und Sicherung

### Einstieg
**Typ:** narrativ (Zeitungsreporter-Rahmen, Anschluss Vorgaenger-Game)
**Text:** "Euer Frontbericht beginnt. Der Schlieffen-Plan ist gescheitert — statt eines schnellen Sieges sitzen Millionen Soldaten in Graeben fest. Eure Aufgabe als Kriegskorrespondenten: Findet heraus, was der Stellungskrieg fuer die Menschen wirklich bedeutete."
**Problemstellung:** Wer ueberlebt im Schuetzengraben?
**Tafelbild-Voraussetzung:** Vorgaenger-Game Chunk 4: Schlieffen-Plan gescheitert, Stellungskrieg beginnt

### Sicherung
**Typ:** reflexion
**Hefteintrag-Verweis:** TAFELBILD_verlauf-erster-weltkrieg-marne-ende_Mappe1.md (SCPL: S→C1→C2→C3→P→L, 5 Fachbegriffe, 3 Kernerkenntnisse)
**Reflexionsimpuls:** "Was hat sich an deinem Bild vom Ersten Weltkrieg veraendert?"
**Ueberleitung:** "Die Soldaten im Schuetzengraben erleben jahrelanges Leiden und Hoffnungslosigkeit. Doch was passiert gleichzeitig zuhause — wo Frauen in Fabriken arbeiten und Kinder hungern?"

---

## Perspektiven-Abdeckungsmatrix

| Perspektive | mat-1-1 | mat-1-2 | mat-1-3 | mat-1-4 | mat-1-5 | Abdeckung |
|---|---|---|---|---|---|---|
| P1: Deutsche Soldaten | | X | | | X | 2/5 |
| P2: Brit./Franz. Soldaten | | | | X (zit-1-2) | | 1/5 |
| P3: Militaerfuehrung | | | | X (zit-1-1) | | 1/5 |
| Weibliche Perspektive | | | | | | 0/5 |

**Fehlende Perspektiven:** Weibliche Perspektive komplett abwesend (M1-C1 MEDIUM). Reserve rolle-1-3 (Krankenschwester) waere geeignet — Budget-Limit verhindert Integration. Kompensation: M2 hat weibliche Leitperspektive (Fabrikarbeiterin). Akzeptabel auf Sequenzebene, NICHT auf Einzelmappe-Ebene.

---

## Q-Gate Self-Check

| # | Kriterium | Prio | Ergebnis | Detail |
|---|---|---|---|---|
| S1 | Artikulationsschema-Konformitaet | MUSS | PASS | Historische Perspektive: Problembegegnung (mat-1-1) → Vergegenwaertigung (mat-1-2 bis mat-1-5). Alle Materialien vergegenwaertigung. Phasenfolge eingehalten. |
| S2 | Vorwissen-Progression | MUSS | PASS | mat-1-1: [] → []. mat-1-2: einfuehrt [Stellungskrieg, Schuetzengraben] → ref []. mat-1-3: einfuehrt [Giftgas] → ref [Stellungskrieg] (mat-1-2). mat-1-4: einfuehrt [Ausblutungsschlacht] → ref [Stellungskrieg] (mat-1-2). mat-1-5: einfuehrt [Materialschlacht] → ref [Stellungskrieg, Schuetzengraben, Ausblutungsschlacht] (alle eingefuehrt). Keine Vorwissensluecke. |
| S3 | TB-Knoten-Abdeckung | MUSS | PASS | S→mat-1-1/mat-1-2. C1→mat-1-2. C2→mat-1-3. C3→mat-1-4. P→mat-1-5. Alle 5 SCPL-Zonen abgedeckt. |
| S4 | Didaktische-Funktion-Sequenzlogik | MUSS | PASS | einstieg → erarbeitung → erarbeitung → erarbeitung → vertiefung. Gueltige Reihenfolge. Kein sicherung vor letztem erarbeitung. |
| S5 | Vergegenwaertigung vor Besinnung | MUSS | PASS | Alle 5 Materialien material_charakter = vergegenwaertigung. Keine besinnung vorhanden — trivial erfuellt. |
| S14 | SCPL-Korrespondenz | MUSS | PASS | S(1) → C1(2) → C2(3) → C3(4) → P(5). Perfekte SCPL-Aufbaureihenfolge. |
| S15 | Skript-Kongruenz | MUSS | PASS | §1(1) → §1–§2(2) → §3(3) → §4–§5(4) → §6(5). Folgt SKRIPT-Absatzreihenfolge. |
| S7 | Anschaulich → Abstrakt | SOLL | PASS | Alle Materialien vergegenwaertigend und narrativ. Leichte Progression: Bild → persoenlich → erklaerend → Quellen → persoenlich-reflektierend. |
| S8 | Kontextgebot Quellenarbeit | SOLL | PASS | Quellentext mat-1-4 steht an Position 4. Drei Kontextmaterialien (mat-1-1, mat-1-2, mat-1-3) gehen voraus. |
| S9 | Uebergangs-Kohaerenz | SOLL | PASS | Alle 4 Uebergaenge mit rueckbezug ≥8W, vorausblick ≥8W, validem kausalitaets_typ und intentionsskizze. |
| S10 | Aktivierung am Sequenzbeginn | SOLL | PASS | mat-1-1: einstieg, aktivierungscharakter = bild, fachbegriffe_eingefuehrt = []. |
| S11 | Materialtyp-Vielfalt | KANN | PASS | 4 verschiedene Typen: bildquelle, tagebuch, darstellungstext, quellentext. |
| S13 | Personalisierung in Fruehphase | KANN | PASS | mat-1-2 (Position 2, erste Haelfte) hat personalisiert = true. |
| S16 | Zonen-Last-Limit | SOLL | PASS | Kein Material deckt >2 Zonen ab. Max: mat-1-1 (S), mat-1-2 (C1) — jeweils 1 Zone. |
| S17 | Materialtyp-SCPL-Kongruenz | SOLL | PASS | Kein Typ-SCPL-Mismatch. BQ (illustrativ) fuer S-Einstieg kongruent. DT fuer kausal (C2) kongruent. |
| S6 | Sequenzkontext-Vollstaendigkeit (Pre-Check) | — | PASS | Alle 5 Materialien haben vollstaendige sequenz_kontext-Objekte. vorher(N) = nachher(N-1) konsistent. |

**Gate-Urteil:** PASS (alle MUSS + SOLL erfuellt, alle KANN erfuellt, S16/S17 PASS)
