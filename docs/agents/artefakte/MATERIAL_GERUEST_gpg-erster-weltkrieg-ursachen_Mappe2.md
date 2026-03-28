# Material-Geruest: Mappe 2 — Das Attentat von Sarajevo

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Erstellt:** 2026-03-24 (Phase 1, AGENT_MATERIAL Design-Modus)
**Validierungsstatus:** Offen
**Eingabe:** SKRIPT Chunk 2 (§1-§5, mit Artefakt-Zuordnungen), DIDAKTIK_RAHMEN

---

## Tafelbild (Detail)

Basis: Tafelbild-Entwurf aus SKRIPT Chunk 2. MATERIAL detailliert und verifiziert:

### Knoten

| ID | Text | Typ | Skript-Ref | Hinzugefuegt? |
|---|---|---|---|---|
| k2-1 | Attentat von Sarajevo (28.6.1914) | ereignis | §2 | nein (aus SKRIPT) |
| k2-2 | Ursache vs. Ausloeser | kernbegriff | §3 | nein (aus SKRIPT) |
| k2-3 | Julikrise | ereignis | §4-§5 | nein (aus SKRIPT) |
| k2-4 | Blankoscheck (DE → OeU) | ereignis | §4 | nein (aus SKRIPT) |
| k2-5 | Kettenreaktion der Kriegserklaerungen | wirkung | §4-§5 | nein (aus SKRIPT) |
| k2-6 | Balkankrise (Vorgeschichte) | ursache | §1 | nein (aus SKRIPT) |

### Verbindungen

| Von → Nach | Label | Belegt in |
|---|---|---|
| k2-6 → k2-1 | Spannungen fuehren zu | SKRIPT §1 + mat-2-1 |
| k2-1 → k2-3 | loest aus | SKRIPT §2/§4 + mat-2-2/mat-2-3 |
| k2-4 → k2-5 | ermutigt Eskalation | SKRIPT §4 + mat-2-4 |
| k2-3 → k2-5 | muendet in | SKRIPT §4-§5 + mat-2-5 |
| k2-2 → k2-1 | erklaert: Ausloeser | SKRIPT §3 + mat-2-1 |
| k2-2 → k1-1 | erklaert: Ursache (Pulverfass) | SKRIPT §3 (Rueckbezug Chunk 1) |

**Voraussetzungen aus Mappe 1:** k1-1 (Pulverfass Europa), k1-4 (Dreibund), k1-5 (Triple Entente), k1-7 (Kettenreaktion)

### Tafelbild-Verifizierung

- **Vollstaendigkeit:** Alle 5 Kernaussagen aus SKRIPT Chunk 2 abgebildet (Balkankrise, Attentat, Ursache-Ausloeser-Unterscheidung, Julikrise, Kettenreaktion). 6 Knoten im Limit (3-8). Verbindung k2-2 → k1-1 stellt Rueckbezug zu Mappe 1 her.
- **Verbindungs-Verifizierung:** 6 Verbindungen. Keine isolierten Knoten. Richtungen geprueft: Balkankrise → Attentat (nicht umgekehrt), Julikrise → Kettenreaktion (nicht umgekehrt).
- **Label-Praezision:** Keine generischen Labels. "ermutigt Eskalation" statt "beeinflusst"; "Spannungen fuehren zu" statt "haengt zusammen mit".
- **Komplexitaets-Check:** 6 Knoten, 6 Verbindungen, 1 Cross-Chunk-Verbindung (k2-2 → k1-1). PASS.

---

## Material-Entwurf

| ID | Typ | Titel | Skript-Absatz | Tafelbild-Knoten | Artefakt-Ref | Quelle/Erstellung | W-Ref |
|---|---|---|---|---|---|---|---|
| mat-2-1 | darstellungstext | Vom Balkan-Pulverfass zum Attentat | §1-§3 | k2-6, k2-1, k2-2 | — | AGENT schreibt (aus SKRIPT §1-§3) | W-1 |
| mat-2-2 | bildquelle | Illustration des Attentats (Beltrame) | §2 | k2-1 | img-2-1 | wikimedia: File:DC-1914-27-d-Sarajevo-cropped.jpg | W-3 |
| mat-2-3 | bildquelle | Franz Ferdinand und Sophie — letzte Minuten | §2 | k2-1 | img-2-2 | wikimedia: File:Postcard_for_the_assassination_of_Archduke_Franz_Ferdinand_in_Sarajevo.jpg | W-3 |
| mat-2-4 | quellentext | Das Ultimatum an Serbien | §4 | k2-3, k2-4 | zit-2-2 | INHALTSBASIS: Ultimatum-Paraphrase | W-2 |
| mat-2-5 | zeitleiste | Julikrise — Vom Attentat zum Weltkrieg | §4-§5 | k2-3, k2-4, k2-5 | — | Mermaid/QuickChart (Daten aus SKRIPT §4-§5) | W-5 |
| mat-2-6 | tagebuch | Ein:e Bewohner:in von Sarajevo erlebt den 28. Juni 1914 | §1/§2 | k2-6, k2-1 | rolle-2-1 | AGENT schreibt (historisch plausibel, Rollenprofil aus INHALTSBASIS) | W-7 |

**Mindest-Materialien-Check:**
- 1 Darstellungstext: mat-2-1 ✓
- 1 Quellentext ODER Bildquelle: mat-2-2 (bildquelle) + mat-2-3 (bildquelle) + mat-2-4 (quellentext) ✓
- 1 personifiziertes Material: mat-2-6 (tagebuch, Bewohner:in) ✓
- 1 visuelles Material: mat-2-5 (zeitleiste) ✓
- Gesamt: 6 Materialien (im Bereich 4-6) ✓

**Nicht verwendete Artefakte aus SKRIPT Chunk 2:**
- img-2-3 (Franz Ferdinand im Auto, Alternative) → Im SKRIPT als [NICHT PLATZIERT] markiert. Kann img-2-2 ersetzen falls Lizenzprobleme auftreten.
- zit-2-1 (Julikrise-Zusammenfassung: "side-note") → Eignung: sicherung. Wird in Sicherungstext eingebaut, nicht als eigenstaendiges Material.
- rolle-2-2 (Soldat bei Mobilmachung) → Alternative zu rolle-2-1. Bei Bedarf als zweites Tagebuch ergaenzen — passt thematisch zu §4/§5 (Kettenreaktion, Mobilmachung).

### Zielklarheit-Pruefung

| Material | Funktion (Zweck-Satz) | Tafelbild-Knoten | Artefakt-Ref |
|---|---|---|---|
| mat-2-1 | Erklaert k2-6 (Balkankrise) als Vorgeschichte, k2-1 (Attentat) als konkretes Ereignis und fuehrt k2-2 (Ursache vs. Ausloeser) als Kernunterscheidung ein | k2-6, k2-1, k2-2 | — (AGENT schreibt) |
| mat-2-2 | Zeigt das Attentat als konkretes Bild: zeitgenoessische Illustration vermittelt Dramatik und historische Authentizitaet | k2-1 | img-2-1 |
| mat-2-3 | Zeigt Franz Ferdinand und Sophie Minuten vor dem Attentat — emotionaler Zugang, "letzte Momente"-Perspektive | k2-1 | img-2-2 |
| mat-2-4 | Liefert historisches Dokument zu k2-3 (Julikrise) und k2-4 (Blankoscheck/Ultimatum) — Eskalationslogik der Diplomatie | k2-3, k2-4 | zit-2-2 |
| mat-2-5 | Visualisiert k2-3 (Julikrise) als chronologische Abfolge: Attentat → Blankoscheck → Ultimatum → Kettenreaktion. Macht Geschwindigkeit der Eskalation sichtbar | k2-3, k2-4, k2-5 | — (AGENT erstellt) |
| mat-2-6 | Personifiziert k2-6 (Balkankrise) und k2-1 (Attentat) durch die Perspektive einer Person, die in Sarajevo lebt — emotionaler Zugang zu Schock und Angst | k2-6, k2-1 | rolle-2-1 |

**Aufgaben-Skizze:** Entfaellt in Phase 1 (v2). Aufgaben werden nach Phase 2 (Material final produziert) entwickelt.

---

## Erarbeitbarkeits-Nachweis

| Tafelbild-Element | Material | Erarbeitungsweg |
|---|---|---|
| k2-1: Attentat von Sarajevo | mat-2-1 (Abs. Attentat) + mat-2-2 (Illustration) + mat-2-3 (Foto) + mat-2-6 (Tagebuch) | SuS lesen Sachtext zum Attentat, betrachten Illustration und Foto, erleben Schock durch Tagebuchperspektive |
| k2-2: Ursache vs. Ausloeser | mat-2-1 (Abs. Ursache/Ausloeser) | SuS lesen Erklaerung im Sachtext, uebertragen auf Pulverfass-Metapher aus Mappe 1 |
| k2-3: Julikrise | mat-2-4 (Ultimatum-Quelle) + mat-2-5 (Zeitleiste) | SuS lesen Ultimatum-Text, ordnen in Zeitleiste ein, erkennen Eskalationsmuster |
| k2-4: Blankoscheck | mat-2-1 (Abs. Julikrise) + mat-2-5 (Zeitleiste: 5.7.) | SuS identifizieren Blankoscheck in Zeitleiste und Sachtext als Eskalationsfaktor |
| k2-5: Kettenreaktion | mat-2-5 (Zeitleiste: 28.7.–4.8.) + mat-2-1 (Abs. Kriegserklaerungen) | SuS verfolgen in Zeitleiste die schnelle Abfolge der Kriegserklaerungen und erkennen Kettenlogik |
| k2-6: Balkankrise | mat-2-1 (Abs. Balkan) + mat-2-6 (Tagebuch: Spannungen in Sarajevo) | SuS lesen ueber Annexion und Balkankriege, erleben Spannungen durch Tagebuchperspektive |
| k2-6 → k2-1 (Spannungen fuehren zu) | mat-2-1 + mat-2-6 | Sachtext benennt Balkankrise als Vorgeschichte; Tagebuch schildert Alltag unter Spannung |
| k2-1 → k2-3 (loest aus) | mat-2-2/mat-2-3 + mat-2-5 | Bilder zeigen konkretes Ereignis; Zeitleiste zeigt unmittelbare Folge |
| k2-4 → k2-5 (ermutigt Eskalation) | mat-2-4 + mat-2-5 | Quellentext belegt Ultimatum; Zeitleiste zeigt Beschleunigung danach |
| k2-3 → k2-5 (muendet in) | mat-2-5 | Zeitleiste macht den Uebergang Julikrise → Kriegserklaerungen sichtbar |
| k2-2 → k2-1 (erklaert: Ausloeser) | mat-2-1 | Sachtext definiert Attentat als Ausloeser (nicht Ursache) |
| k2-2 → k1-1 (erklaert: Ursache) | mat-2-1 (Rueckbezug Pulverfass) | Sachtext verweist auf Buendnisse/Rivalitaeten als eigentliche Ursachen (Mappe 1) |

**Abdeckungs-Check:**
- Jeder Tafelbild-Knoten (6/6) hat mindestens 1 Material-Zuordnung ✓
- Jede Verbindung (6/6) hat mindestens 1 Material-Zuordnung ✓
- Jedes Material hat Artefakt-Ref oder explizite Begruendung (6/6) ✓
- Kein Knoten erfordert Vorwissen, das nicht in Material oder Mappe 1 gesichert ist ✓ (Voraussetzungen: k1-1, k1-4, k1-5, k1-7 aus Mappe 1)

---

## Einstieg und Sicherung

### Einstieg

**Typ:** rueckblick

**Text:** "Europa ist ein Pulverfass — zwei Buendnisbloecke stehen sich gegenueber, bewaffnet und misstrauisch. Doch noch herrscht Frieden. Dann, am 28. Juni 1914, fallen in Sarajevo Schuesse. Was genau passiert dort? Und wie kann ein einziger Mord einen Weltkrieg ausloesen?"

**Tafelbild-Voraussetzungen:** k1-1 (Pulverfass Europa), k1-4 (Dreibund), k1-5 (Triple Entente)

### Sicherung

**Typ:** reflexion

**Text:** "Das Attentat von Sarajevo war der Ausloeser, aber nicht die Ursache des Krieges. Die Ursachen — Buendnisse, Rivalitaeten, Misstrauen — lagen schon vorher bereit. Die Julikrise zeigt, wie schnell aus einem Mord ein Weltkrieg werden kann, wenn ein System aus Buendnispflichten und Blankoschecks die Eskalation antreibt."

**Zitat (zit-2-1):** "The ostensible reason for armed conflict — the assassination of an archduke — had already become a side-note to a larger European war." (Einbindung als Schlusszitat: Der Anlass wurde zur Nebensache.)

**Ueberleitung:** "Millionen Soldaten stehen nun bereit. Doch wie reagieren die Menschen auf den Kriegsausbruch? Ziehen sie mit Angst oder mit Begeisterung in den Krieg?"
