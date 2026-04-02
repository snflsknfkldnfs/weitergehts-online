# Material-Geruest: Mappe 3 — Kriegsbegeisterung 1914

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Erstellt:** 2026-04-02 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** Offen
**Eingabe:** SKRIPT Chunk 3 (§1-§5, mit Artefakt-Zuordnungen), TAFELBILD Mappe 3, INHALTSBASIS Mappe 3, DIDAKTIK_RAHMEN

---

## Tafelbild (Detail)

Basis: Tafelbild-Entwurf aus SKRIPT Chunk 3, formalisiert in TAFELBILD_Mappe3.md.

### Knoten

| ID | Text | Typ | Skript-Ref | Hinzugefuegt? |
|---|---|---|---|---|
| k3-1 | Kriegsbegeisterung (Augusterlebnis) | kernbegriff | §1 | nein (aus SKRIPT) |
| k3-2 | Patriotismus / Nationalismus | ursache | §2 | nein (aus SKRIPT) |
| k3-3 | Propaganda ("Verteidigungskrieg") | ursache | §2 | nein (aus SKRIPT) |
| k3-4 | Gesellschaftlicher Druck | ursache | §2, §4 | nein (aus SKRIPT) |
| k3-5 | Gegenstimmen (Arbeiter, Bauern, Demos) | kategorie | §3-§4 | nein (aus SKRIPT) |
| k3-6 | Burgfrieden (SPD stimmt zu) | wirkung | §5 | nein (aus SKRIPT) |

### Verbindungen

| Von → Nach | Label | Belegt in |
|---|---|---|
| k3-2 → k3-1 | erzeugt | SKRIPT §2 + mat-3-1 |
| k3-3 → k3-1 | verstaerkt | SKRIPT §2 + mat-3-1 |
| k3-4 → k3-1 | erzwingt Zustimmung | SKRIPT §2/§4 + mat-3-1/mat-3-5 |
| k3-5 → k3-1 | widerspricht (nicht alle begeistert) | SKRIPT §3-§4 + mat-3-4/mat-3-5 |
| k3-1 → k3-6 | ermoeglicht | SKRIPT §5 + mat-3-4 |

**Voraussetzungen aus Mappe 2:** k2-5 (Kettenreaktion der Kriegserklaerungen)

### Tafelbild-Verifizierung

- **Vollstaendigkeit:** Alle Kernaussagen aus SKRIPT Chunk 3 abgebildet (Augusterlebnis, 4 Gruende, Gegenstimmen, Burgfrieden). 6 Knoten im Limit (3-8). Voraussetzung k2-5 stellt Rueckbezug zu Mappe 2 her.
- **Verbindungs-Verifizierung:** 5 Verbindungen. Keine isolierten Knoten. k3-5 hat Gegenrichtung (widerspricht) — multiperspektivisches Ordnungsmuster.
- **Label-Praezision:** "erzwingt Zustimmung" (nicht generisch "beeinflusst"); "widerspricht" explizit gegenlaeufig.
- **Komplexitaets-Check:** 6 Knoten, 5 Verbindungen, 1 Cross-Chunk-Voraussetzung (k2-5). PASS.

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | Tafelbild-Knoten | Artefakt-Ref | Quelle/Erstellung | didaktische_funktion |
|---|---|---|---|---|---|---|---|
| mat-3-1 | darstellungstext | Begeisterung und Angst — August 1914 | §1-§2 | k3-1, k3-2, k3-3, k3-4 | — | AGENT schreibt (aus SKRIPT §1-§2) | einstieg |
| mat-3-2 | bildquelle | Jubel vor dem Berliner Stadtschloss | §1 | k3-1 | img-3-1 | wikimedia: File:Crowd_cheers_the_Kaiser_at_the_Berliner_Stadtschloss,_1914.jpg | erarbeitung |
| mat-3-3 | bildquelle | Truppentransport per Bahn, August 1914 | §1/§4 | k3-1, k3-4 | img-3-2 | wikimedia: File:Bundesarchiv_Bild_146-1994-022-19A,_Mobilmachung,_Truppentransport_mit_der_Bahn.jpg | erarbeitung |
| mat-3-4 | quellentext | Drei Stimmen zum Kriegsausbruch | §4-§5 | k3-5, k3-6 | zit-3-1, zit-3-2, zit-3-3 | INHALTSBASIS: Zweig, SPD Bremen, Haase | erarbeitung |
| mat-3-5 | tagebuch | Zwei Welten — Kriegsfreiwilliger und Bauersfrau | §1/§4 | k3-1, k3-4, k3-5 | rolle-3-1, rolle-3-2 | AGENT schreibt (historisch plausibel, Rollenprofile aus INHALTSBASIS) | sicherung |

**Mindest-Materialien-Check:**
- 1 Darstellungstext: mat-3-1 ✓
- 1 Quellentext ODER Bildquelle: mat-3-2 (bildquelle) + mat-3-3 (bildquelle) + mat-3-4 (quellentext) ✓
- 1 personifiziertes Material: mat-3-5 (tagebuch, 2 Perspektiven) ✓
- 1 visuelles Material: mat-3-2 + mat-3-3 (bildquellen) ✓
- Gesamt: 5 Materialien (im Bereich 4-6) ✓

**Nicht verwendete Artefakte aus SKRIPT Chunk 3:**
- img-3-3 (Mobilmachung Luebeck, Alternative) → Im SKRIPT als [NICHT PLATZIERT] markiert. Kann img-3-2 ersetzen falls Lizenzprobleme auftreten.

### Zielklarheit-Pruefung

| Material | Funktion (Zweck-Satz) | Tafelbild-Knoten | Artefakt-Ref |
|---|---|---|---|
| mat-3-1 | Fuehrt k3-1 (Augusterlebnis) als Phaenomen ein und erklaert die vier Gruende (k3-2, k3-3, k3-4). SuS verstehen, warum viele Menschen begeistert waren. | k3-1, k3-2, k3-3, k3-4 | — |
| mat-3-2 | Zeigt die Kriegsbegeisterung als konkretes Bild: Jubelnde Menge vor dem Stadtschloss. SuS sehen, wie Begeisterung aussah. | k3-1 | img-3-1 |
| mat-3-3 | Zeigt Truppentransport — Soldaten in Zuegen. Eroeffnet Frage: Aufbruchstimmung oder erzwungener Abschied? | k3-1, k3-4 | img-3-2 |
| mat-3-4 | Liefert drei Originalstimmen mit kontraeren Perspektiven: Zweig (Begeisterung), SPD Bremen (Angst), Haase (Pflicht). SuS erkennen, dass die Gesellschaft gespalten war. | k3-5, k3-6 | zit-3-1, zit-3-2, zit-3-3 |
| mat-3-5 | Personifiziert k3-1 (Begeisterung) und k3-5 (Gegenstimmen) durch zwei Perspektiven: Freiwilliger vs. Bauersfrau. SuS erleben den Kontrast Stadt/Land, Begeisterung/Angst. | k3-1, k3-4, k3-5 | rolle-3-1, rolle-3-2 |

---

## Erarbeitbarkeits-Nachweis

| Tafelbild-Element | Material | Erarbeitungsweg |
|---|---|---|
| k3-1: Kriegsbegeisterung | mat-3-1 (§1-§2) + mat-3-2 (Bild) + mat-3-5 (Tagebuch Freiwilliger) | SuS lesen Sachtext zum Augusterlebnis, sehen Jubel-Foto, erleben Begeisterung durch Tagebuch |
| k3-2: Patriotismus | mat-3-1 (§2, Grund 1) | SuS lesen Erklaerung im Sachtext |
| k3-3: Propaganda | mat-3-1 (§2, Grund 4) | SuS lesen, wie Regierung Krieg als Verteidigung darstellt |
| k3-4: Gesellschaftlicher Druck | mat-3-1 (§2, Grund 3) + mat-3-3 (Bild) + mat-3-5 (Tagebuch) | SuS lesen ueber Ehrgefuehl, sehen Truppentransport, erleben Druck durch Tagebuch-Perspektive |
| k3-5: Gegenstimmen | mat-3-4 (Zitat SPD Bremen) + mat-3-5 (Tagebuch Bauersfrau) | SuS lesen Angst-Zitat, erleben laendliche Perspektive durch Tagebuch |
| k3-6: Burgfrieden | mat-3-4 (Zitat Haase + Zweig) + mat-3-1 (ggf. Schlussabsatz) | SuS lesen SPD-Zustimmung und Zweigs Beschreibung truegerischer Einheit |
| k3-2 → k3-1 (erzeugt) | mat-3-1 | Sachtext benennt Patriotismus als Grund fuer Begeisterung |
| k3-3 → k3-1 (verstaerkt) | mat-3-1 | Sachtext erklaert Propaganda-Wirkung |
| k3-4 → k3-1 (erzwingt) | mat-3-1 + mat-3-5 | Sachtext + Tagebuch zeigen Druck-Mechanismus |
| k3-5 → k3-1 (widerspricht) | mat-3-4 + mat-3-5 | Quellen + Tagebuch liefern Gegenperspektive |
| k3-1 → k3-6 (ermoeglicht) | mat-3-4 | Quellentext zeigt, wie Begeisterung+Druck zum Burgfrieden fuehren |

**Abdeckungs-Check:**
- Jeder Tafelbild-Knoten (6/6) hat mindestens 1 Material-Zuordnung ✓
- Jede Verbindung (5/5) hat mindestens 1 Material-Zuordnung ✓
- Jedes Material hat Artefakt-Ref oder explizite Begruendung (5/5) ✓
- Kein Knoten erfordert Vorwissen, das nicht in Material oder Mappe 2 gesichert ist ✓ (Voraussetzung: k2-5 aus Mappe 2)

---

## Einstieg und Sicherung

### Einstieg

**Typ:** perspektivwechsel

**Text:** "Die Buendnisse haben aus einem Mord einen Weltkrieg gemacht. Millionen Soldaten werden mobilisiert. Doch wie reagieren die Menschen auf den Kriegsausbruch? Ziehen sie mit Angst oder mit Begeisterung in den Krieg? Waren die Menschen 1914 wirklich begeistert vom Krieg?"

**Tafelbild-Voraussetzungen:** k2-5 (Kettenreaktion der Kriegserklaerungen)

### Sicherung

**Typ:** reflexion

**Text:** "Die Kriegsbegeisterung war kein allgemeines Phaenomen. In den Staedten gab es Jubel — angetrieben durch Patriotismus, Propaganda, Abenteuerlust und Druck. Auf dem Land herrschte Angst. Arbeiter protestierten zu Hunderttausenden. Doch am Ende stimmte selbst die SPD fuer den Krieg. Der Burgfrieden verbarg die tiefen Risse in der Gesellschaft."

**Ueberleitung:** "Die Soldaten glauben an einen schnellen Sieg und erwarten, bis Weihnachten wieder zu Hause zu sein. Doch worauf stuetzt sich dieser Glaube? Die deutschen Generaele haben einen Plan — den Schlieffen-Plan."

### Ueberleitungen (Intention — finale Formulierung in Phase 2.1c Achse 5)

| Von → Nach | Rueckwaerts-Vektor (Intention) | Vorwaerts-Vektor (Intention) |
|---|---|---|
| einstieg → mat-3-1 | Stundenfrage aufgegriffen | Sachtext liefert erste Antwort |
| mat-3-1 → mat-3-2 | Sachtext beschrieb Begeisterung in Worten | Bild zeigt, wie Begeisterung konkret aussah |
| mat-3-2 → mat-3-3 | Jubel-Bild zeigte eine Seite | Truppentransport-Bild eroeffnet Frage: auch Abschied? |
| mat-3-3 → mat-3-4 | Bilder zeigten Oberflaeche | Originalstimmen zeigen verschiedene Perspektiven |
| mat-3-4 → mat-3-5 | Quellen lieferten Fakten und Zitate | Tagebuecher machen die Perspektiven persoenlich erlebbar |
