# Material-Geruest: Mappe 1 — Pulverfass Europa

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Erstellt:** 2026-03-23 (Phase 1, AGENT_MATERIAL Design-Modus)
**Ueberarbeitet:** 2026-03-24 (Artefakt-Kette, Aufgaben entfernt, Rollenkorrektur)
**Validierungsstatus:** Offen (ueberarbeitet)
**Eingabe:** SKRIPT Chunk 1 (§1-§5, mit Artefakt-Zuordnungen), DIDAKTIK_RAHMEN

---

## Tafelbild (Detail)

Basis: Tafelbild-Entwurf aus SKRIPT Chunk 1. MATERIAL detailliert und verifiziert:

### Knoten

| ID | Text | Typ | Skript-Ref | Hinzugefuegt? |
|---|---|---|---|---|
| k1-1 | Pulverfass Europa | kernbegriff | §5 | nein (aus SKRIPT) |
| k1-2 | Imperialismus | ursache | §2 | nein (aus SKRIPT) |
| k1-3 | Nationalismus | ursache | §2 | nein (aus SKRIPT) |
| k1-4 | Dreibund (DE, OeU, IT) | kategorie | §3 | nein (aus SKRIPT) |
| k1-5 | Triple Entente (FR, GB, RU) | kategorie | §4 | nein (aus SKRIPT) |
| k1-6 | Wettruestung | ursache | §5 | nein (aus SKRIPT) |
| k1-7 | Kettenreaktion | wirkung | §5 | nein (aus SKRIPT) |

### Verbindungen

| Von → Nach | Label | Belegt in |
|---|---|---|
| k1-2 → k1-1 | verschaerft Spannungen | SKRIPT §2 + mat-1-1 |
| k1-3 → k1-1 | verschaerft Spannungen | SKRIPT §2 + mat-1-1 |
| k1-4 → k1-7 | Buendnispflicht erzwingt | SKRIPT §3/§5 + mat-1-3 |
| k1-5 → k1-7 | Buendnispflicht erzwingt | SKRIPT §4/§5 + mat-1-3 |
| k1-6 → k1-1 | erhoeht Misstrauen | SKRIPT §5 + mat-1-4 |
| k1-1 → k1-7 | ein Funke genuegt | SKRIPT §5 + mat-1-1 |
| k1-2 ↔ k1-6 | treibt Aufruestung an | INHALTSBASIS: Kolonialkonflikte → Flottenruestung |

**Voraussetzungen aus vorherigen Mappen:** keine (erste Mappe)

### Tafelbild-Verifizierung

- **Vollstaendigkeit:** Alle 5 Kernaussagen aus Themen-Briefing Mappe 1 abgebildet (Spannungen, Dreibund, Triple Entente, Imperialismus/Nationalismus, Kettenreaktion). 7 Knoten im Limit (3-8).
- **Verbindungs-Verifizierung:** 7 Verbindungen, davon 1 bidirektional (k1-2 ↔ k1-6). Keine isolierten Knoten. Richtungen geprueft: Imperialismus und Nationalismus sind Ursachen (→ Pulverfass), nicht umgekehrt.
- **Label-Praezision:** Keine generischen Labels ("beeinflusst", "haengt zusammen"). Alle Labels spezifisch.
- **Komplexitaets-Check:** 7 Knoten, 7 Verbindungen, 1 bidirektionale Beziehung. PASS.

---

## Material-Entwurf

| ID      | Typ              | Titel                                                             | Skript-Absatz | Tafelbild-Knoten | Artefakt-Ref | Quelle/Erstellung                                                    | W-Ref |
| ------- | ---------------- | ----------------------------------------------------------------- | ------------- | ---------------- | ------------ | -------------------------------------------------------------------- | ----- |
| mat-1-1 | darstellungstext | Imperialismus und Nationalismus — zwei Kraefte zerreissen Europa  | §1-§2         | k1-2, k1-3, k1-1 | —            | AGENT schreibt (aus SKRIPT §1-§2)                                    | W-1   |
| mat-1-2 | karte            | Europas Buendnisse vor 1914                                       | §3-§4         | k1-4, k1-5       | img-1-1      | wikimedia: File:Map_Europe_alliances_1914-en.svg                     | W-4   |
| mat-1-3 | zeitleiste       | Chronologie der Buendnisse 1879–1907                              | §3-§4         | k1-4, k1-5, k1-7 | —            | Mermaid/QuickChart (Daten aus SKRIPT §3-§4)                          | W-5   |
| mat-1-4 | quellentext      | "Platz an der Sonne" — Deutschlands Anspruch                      | §2            | k1-2, k1-6       | zit-1-1      | INHALTSBASIS: Buelow-Rede 1897                                       | W-2   |
| mat-1-5 | bildquelle       | Kaiser Wilhelm II. — Gesicht des Grossmachtanspruchs              | §5            | k1-6, k1-1       | img-1-2      | wikimedia: File:Kaiser_Wilhelm_II_of_Germany_-_1902.jpg              | W-3   |
| mat-1-6 | tagebuch         | Ein Diplomat im Auswaertigen Amt erlebt die Buendnisverhandlungen | §3            | k1-4, k1-5, k1-1 | rolle-1-1    | AGENT schreibt (historisch plausibel, Rollenprofil aus INHALTSBASIS) | W-7   |

**Mindest-Materialien-Check:**
- 1 Darstellungstext: mat-1-1 ✓
- 1 Quellentext ODER Bildquelle: mat-1-4 (quellentext) + mat-1-5 (bildquelle) ✓
- 1 personifiziertes Material: mat-1-6 (tagebuch, Diplomat) ✓
- 1 visuelles Material: mat-1-2 (karte) + mat-1-3 (zeitleiste) ✓
- Gesamt: 6 Materialien (im Bereich 4-6) ✓

**Nicht verwendete Artefakte aus SKRIPT Chunk 1:**
- zit-1-2 (Grey: "The lamps are going out") → Eignung: sicherung. Wird in Sicherungstext eingebaut, nicht als eigenstaendiges Material.
- rolle-1-2 (Matrose der Kaiserlichen Marine) → Alternative zu rolle-1-1. Bei Bedarf als zweites Tagebuch ergaenzen (Token-Budget beachten).

### Zielklarheit-Pruefung

| Material | Funktion (Zweck-Satz) | Tafelbild-Knoten | Artefakt-Ref |
|---|---|---|---|
| mat-1-1 | Erklaert k1-2 (Imperialismus) und k1-3 (Nationalismus) als Spannungsursachen und fuehrt die Pulverfass-Metapher (k1-1) ein | k1-2, k1-3, k1-1 | — (AGENT schreibt) |
| mat-1-2 | Visualisiert k1-4 (Dreibund) und k1-5 (Triple Entente) als raeumliche Bloecke auf der Europakarte | k1-4, k1-5 | img-1-1 |
| mat-1-3 | Zeigt die zeitliche Abfolge der Buendnisbildung und macht die Kettenlogik (k1-7) sichtbar | k1-4, k1-5, k1-7 | — (AGENT erstellt) |
| mat-1-4 | Liefert historische Stimme zu k1-2 (Imperialismus) und k1-6 (Wettruestung) — Deutschlands Grossmachtanspruch | k1-2, k1-6 | zit-1-1 |
| mat-1-5 | Zeigt Kaiser Wilhelm II. als Gesicht des Grossmachtanspruchs und der Wettruestung | k1-6, k1-1 | img-1-2 |
| mat-1-6 | Personifiziert k1-4/k1-5 (Buendnisse) und k1-1 (Pulverfass) — emotionaler Zugang zur Diplomatie durch Diplomatenperspektive | k1-4, k1-5, k1-1 | rolle-1-1 |

**Aufgaben-Skizze:** Entfaellt in Phase 1 (v2). Aufgaben werden nach Phase 2 (Material final produziert) entwickelt.

---

## Erarbeitbarkeits-Nachweis

| Tafelbild-Element | Material | Erarbeitungsweg |
|---|---|---|
| k1-1: Pulverfass Europa | mat-1-1 (Abs. Pulverfass) + mat-1-6 (Diplomat erlebt Spannungen) | SuS lesen Darstellungstext, der die Metapher einfuehrt, und erleben die Spannungslage durch Tagebucheintrag des Diplomaten |
| k1-2: Imperialismus | mat-1-1 (Abs. 1: Definition + Kolonienwettlauf) + mat-1-4 ("Platz an der Sonne") | SuS lesen Definition im Sachtext und erkennen Deutschlands Anspruch in der Quelle |
| k1-3: Nationalismus | mat-1-1 (Abs. 1: Definition + Verbindung zu Rivalitaeten) | SuS lesen Definition im Sachtext, grenzen Nationalismus von Imperialismus ab |
| k1-4: Dreibund | mat-1-2 (Karte: raeumliche Lage) + mat-1-3 (Zeitleiste: Gruendung 1882) + mat-1-6 (Diplomat erlebt Verhandlungen) | SuS identifizieren Dreibund-Laender auf Karte, ordnen Gruendungsdatum ein, erleben Verhandlungen durch Diplomatenperspektive |
| k1-5: Triple Entente | mat-1-2 (Karte: raeumliche Lage) + mat-1-3 (Zeitleiste: 1894-1907) | SuS identifizieren Entente-Laender auf Karte, erkennen schrittweise Entstehung in Zeitleiste |
| k1-6: Wettruestung | mat-1-4 ("Platz an der Sonne") + mat-1-5 (Wilhelm II. als Akteur) | SuS erschliessen Zusammenhang Imperialismus → Flottenruestung aus Quelle und Bild |
| k1-7: Kettenreaktion | mat-1-3 (Zeitleiste: Buendniskette sichtbar) + mat-1-1 (ein Funke genuegt) | SuS erkennen in Zeitleiste die Verkettung und uebertragen auf Pulverfass-Logik |
| k1-2 → k1-1 (verschaerft Spannungen) | mat-1-1 + mat-1-4 | Darstellungstext benennt Imperialismus als Spannungsursache; Quelle belegt deutschen Anspruch |
| k1-3 → k1-1 (verschaerft Spannungen) | mat-1-1 | Darstellungstext benennt Nationalismus als Spannungsursache |
| k1-4 → k1-7 (Buendnispflicht erzwingt) | mat-1-3 + mat-1-1 | Zeitleiste zeigt Buendniskette; Sachtext erklaert Beistandsversprechen |
| k1-5 → k1-7 (Buendnispflicht erzwingt) | mat-1-3 + mat-1-1 | Wie k1-4 → k1-7, symmetrisch fuer Entente-Seite |
| k1-6 → k1-1 (erhoeht Misstrauen) | mat-1-4 + mat-1-5 | Quellentext belegt Grossmachtanspruch; Bild zeigt Akteur der Wettruestung |
| k1-1 → k1-7 (ein Funke genuegt) | mat-1-1 | Darstellungstext schliesst mit Pulverfass-Metapher |
| k1-2 ↔ k1-6 (treibt Aufruestung an) | mat-1-1 + mat-1-4 | Sachtext verbindet Kolonienwettlauf mit Flottenruestung; Quelle belegt "Platz an der Sonne" |

**Abdeckungs-Check:**
- Jeder Tafelbild-Knoten (7/7) hat mindestens 1 Material-Zuordnung ✓
- Jede Verbindung (7/7) hat mindestens 1 Material-Zuordnung ✓
- Jedes Material hat Artefakt-Ref oder explizite Begruendung (6/6) ✓
- Kein Knoten erfordert Vorwissen, das nicht in Material gesichert ist ✓ (erste Mappe, keine Voraussetzungen)

---

## Einstieg und Sicherung

### Einstieg

**Typ:** szenario

**Text:** "Sommer 1914. In den Hauptstaedten Europas sitzen Diplomaten ueber Geheimvertraegen. Generaele planen Aufmaersche. Fabrikarbeiter bauen Kriegsschiffe. Sechs Grossmaechte belauern sich — aufgeteilt in zwei Buendnisbloecke. Alle wissen: Ein Funke genügt. Doch warum sprechen alle von einem 'Pulverfass'?"

**Tafelbild-Voraussetzungen:** keine

### Sicherung

**Typ:** zusammenfassung

**Text:** "Europa ist vor 1914 in zwei Buendnisbloecke gespalten: den Dreibund und die Triple Entente. Imperialismus, Nationalismus und Wettruestung haben das Misstrauen zwischen den Grossmaechten auf die Spitze getrieben. Ein kleiner Konflikt kann durch die Buendnisverpflichtungen eine Kettenreaktion ausloesen. Europa ist ein Pulverfass — es fehlt nur noch der Funke."

**Grey-Zitat (zit-1-2):** "The lamps are going out all over Europe, we shall not see them lit again in our lifetime." — Edward Grey, britischer Aussenminister, 3. August 1914. (Einbindung in Sicherungstext oder als eigenstaendiges Schlusszitat.)

**Ueberleitung:** "Doch wo ist der Funke? Am 28. Juni 1914 faellt in Sarajevo ein Schuss, der die Welt veraendert."
