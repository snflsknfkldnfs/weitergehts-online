# Uebergabe-Prompt: v3.3b Nachmigration — SCPL-Umordnung Material-Reihenfolge

**Datum:** 2026-03-28
**Ziel:** Material-Reihenfolge in Mappe 1 (`gpg-erster-weltkrieg-ursachen/data.json`) nach SCPL-Aufbau des Tafelbilds umordnen.
**Hintergrund:** v3.3 (Commit f87dd8b) hat position-Felder eingefuehrt, aber die Reihenfolge folgt nicht konsequent der SCPL-Sinnstruktur. Neue MUSS-Kriterien S14 (SCPL-Korrespondenz) und S15 (Skript-Kongruenz) in `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` v1.1 verlangen, dass die Materialreihenfolge grob dem SCPL-Aufbau des Tafelbilds entspricht.

---

## Pre-Flight

Vor der Arbeit sicherstellen:
- [ ] `git status` — Working Tree sauber (keine uncommitted changes)
- [ ] `git pull` — Lokaler Branch ist aktuell mit origin/main
- [ ] Aktuelle Version von `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen (NICHT aus diesem Prompt uebernehmen)

Falls Pre-Flight fehlschlaegt: STOPP. Nicht mit Stash/Force-Operationen improvisieren. Stattdessen Problem melden.

---

## Aufgabe

### SCPL-Zuordnung der Tafelbild-Knoten

Das Tafelbild (in `sicherung.tafelbild.knoten`) hat 7 Knoten. Deren SCPL-Phasenzuordnung:

| SCPL-Phase | Knoten | Thema |
|---|---|---|
| **S** (Situation) | k1-2, k1-3 | Imperialismus, Nationalismus — die Ursachen/Ausgangslage |
| **C** (Complication) | k1-4, k1-5, k1-6 | Dreibund, Triple Entente, Wetruestung — die Verschaerfung |
| **P** (Problem) | k1-7 | Kettenreaktion — die Zuspitzung |
| **L** (Loesung/Synthese) | k1-1 | Pulverfass Europa — die Gesamterkenntnis |

### Neue Material-Reihenfolge

Ordne die 9 existierenden Materialien so um, dass sie der SCPL-Phasenfolge entsprechen (S-Materialien → C-Materialien → P-Materialien → L-Materialien). Innerhalb jeder Phase: vom Konkreten zum Abstrakten, Erarbeitung vor Vertiefung.

**Ziel-Reihenfolge:**

| Neue pos | Aktueller Titel | Typ | SCPL-Phase | didaktische_funktion | Begruendung |
|---|---|---|---|---|---|
| 1 | Pulverfass Europa — Spannungen vor 1914 | darstellungstext | Einstieg (uebergreifend) | einstieg | Eroeffnet Gesamtthema, Vorbereitung auf alle SCPL-Phasen |
| 2 | Platz an der Sonne — Deutschlands Anspruch | quellentext | S (Imperialismus) | erarbeitung | Primaerquelle zu Imperialismus (k1-2), erarbeitet S-Phase |
| 3 | Der Koloss von Rhodos — Karikatur zum Imperialismus | bildquelle | S (Imperialismus) | vertiefung | Vertieft Imperialismus-Verstaendnis (k1-2) |
| 4 | Kaiser Wilhelm II. | bildquelle | S (Imperialismus/Nationalismus) | vertiefung | Personifiziert S-Phase (k1-2/k1-3), Uebergang S→C |
| 5 | Bismarcks Buendnissystem — Europakarte vor 1890 | karte | C (Buendnisse, Vorgeschichte) | erarbeitung | Zeigt Ausgangslage der Buendnisse (vor Dreibund/Entente) |
| 6 | Wie spaltete sich Europa in zwei Lager? | zeitleiste | C (Buendnisse) | erarbeitung | Chronologische Entwicklung Dreibund→Entente (k1-4, k1-5) |
| 7 | Europakarte 1914: Buendnisse | karte | C (Buendnisse, Ergebnis) | erarbeitung | Ergebnis der Buendnisbildung — Karte zeigt Endstand (k1-4, k1-5) |
| 8 | Tagebuch eines Diplomaten | tagebuch | C/P (Buendnisse → Kettenreaktion) | vertiefung | Perspektivenwechsel: Binnensicht auf Buendnisdynamik und Eskalation |
| 9 | Britisches Schlachtgeschwader (ca. 1914) | bildquelle | C/P (Wetruestung) | sicherung | Visualisiert Wetruestung (k1-6), schliesst C/P-Phase ab |

### Umsetzung

1. **position-Felder aendern:** Setze die `position`-Werte der 9 Materialien auf die neue Reihenfolge (siehe Tabelle oben). Identifiziere Materialien anhand ihres `titel`-Feldes.

2. **didaktische_funktion pruefen:** Vergleiche mit der Tabelle. Aendere nur, wenn der aktuelle Wert von der Tabelle abweicht.

3. **ueberleitung_von aktualisieren:** Die `ueberleitung_von`-Felder muessen der neuen Reihenfolge folgen. Jedes Material (ausser pos 1) erhaelt `ueberleitung_von` = ID des vorangehenden Materials. Pruefe und korrigiere die Ueberleitungstexte, damit sie inhaltlich zum neuen Vorgaenger passen. Bei Bedarf Ueberleitungstexte umformulieren.

4. **sequenz_kontext aktualisieren:** Die `sequenz_kontext`-Texte muessen zur neuen Position passen. Aktualisiere insbesondere Angaben wie "erstes Material", "nach der Karte", etc.

5. **materialien-Array umordnen:** Sortiere das `materialien`-Array physisch nach den neuen position-Werten (die Engine sortiert zwar nach position, aber die JSON-Reihenfolge sollte konsistent sein).

---

## Dateien

| Datei | Aenderung |
|---|---|
| `escape-games/gpg-erster-weltkrieg-ursachen/data.json` | ERWEITERN — position-Werte, ueberleitung_von, sequenz_kontext aendern. Keine Materialien hinzufuegen/entfernen. Bestehende Inhalte (texte, aufgaben, tafelbild, sicherung) unveraendert |

---

## Merge-Schutz

Wenn bei `git pull` oder `git push` Konflikte auftreten:
1. NICHT automatisch aufloesen (kein --theirs, kein --ours)
2. Konflikt-Dateien auflisten und dem User melden
3. Warten auf User-Entscheidung

---

## Erfolgskriterium

- 9 Materialien mit position 1-9 in der neuen Reihenfolge
- SCPL-Monotonie: S-Materialien (pos 2-4) vor C-Materialien (pos 5-7) vor C/P-Materialien (pos 8-9)
- Einstieg (pos 1) steht vor allen SCPL-Phasen
- ueberleitung_von-Ketten sind konsistent (jedes Material verweist auf seinen tatsaechlichen Vorgaenger)
- JSON valide, Freischaltcode PULVER intakt, 9 Materialien, 5 Aufgaben, 5 Bilder intakt

---

## Verifikation

- [ ] `python3 -c "import json; d=json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json')); mats=d['mappen'][0]['materialien']; print([m['position'] for m in mats])"` → `[1, 2, 3, 4, 5, 6, 7, 8, 9]`
- [ ] `python3 -c "import json; d=json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json')); mats=d['mappen'][0]['materialien']; [print(f'{m[\"position\"]}: {m[\"typ\"]} — {m[\"titel\"][:50]}') for m in mats]"` → Reihenfolge entspricht obiger Tabelle
- [ ] Freischaltcode PULVER in data.json unveraendert
- [ ] 9 Materialien, 5 Aufgaben, Tafelbild (7 Knoten, 6 Verbindungen) intakt
- [ ] Keine `console.error` beim Laden der Website
- [ ] Materialien werden im Browser in der neuen Reihenfolge angezeigt

---

## Nach Abschluss

Melde den Abschluss in Cowork mit: "Update: v3.3b Nachmigration SCPL-Umordnung erledigt. Commit: [hash]"
