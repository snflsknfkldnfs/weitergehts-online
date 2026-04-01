# Uebergabe-Prompt: v3.8 Audit-Fixes (F-03, F-06, F-08)

**Datum:** 2026-03-30
**Von:** Cowork (Audit-Behebung)
**An:** Claude Code (Implementierung)
**Vorgaenger:** Commits fd883dc, 2a192e5, 9d184ee, c3ee2f3

---

## Pre-Flight

- [ ] `git status` — Working Tree sauber
- [ ] `git pull` — Aktuell mit origin/main
- [ ] `escape-games/gpg-erster-weltkrieg-ursachen/data.json` lesen
- [ ] `escape-games/template/data.json` lesen

Falls Pre-Flight fehlschlaegt: STOPP.

---

## Fix F-03: Template data.json aktualisieren

### Problem

`escape-games/template/data.json` fehlen v3.3+-Felder in materialien[] und v3.1+-Felder in sicherung.tafelbild. Das Template ist die deklarierte Schema-Referenz fuer neue Games.

### Loesung

Template-data.json auf die Struktur der Goldstandard-data.json (`escape-games/gpg-erster-weltkrieg-ursachen/data.json`) bringen. Konkret:

**materialien[] — fehlende Felder hinzufuegen (mit Platzhaltern):**
- `position` (number)
- `didaktische_funktion` (string: "einstieg" | "erarbeitung" | "vertiefung" | "sicherung")
- `bildunterschrift` (string, leer)
- `voraussetzung` (array, leer)
- `ueberleitung_von` (string, leer)
- `sequenz_kontext` (object: `{ "vorher": null, "nachher": null }`)

**einstieg — Struktur anpassen:**
- Felder: `narrativ` (HTML-String), `problemstellung` (String)
- Alte Felder (`typ`, `text`, `tafelbild_voraussetzungen`) entfernen falls vorhanden

**sicherung.tafelbild — SCPL-Format hinzufuegen:**
- `stundenfrage` (string)
- `ordnungsmuster` (string)
- `scpl` (object mit situation, complication, problem, loesung)
- `transfer` (object mit frage)
- Legacy-Felder `knoten[]`, `verbindungen[]` als leere Arrays belassen

**sicherung — fehlende Felder:**
- `kernerkenntnisse` (array)
- `zusammenfassung` (string)
- `ueberleitung` (string)
- `hefteintrag_verweis` (string)
- `reflexionsimpuls` (string)

**meta — fehlende Felder:**
- `narrativ` (string) falls nicht vorhanden

Orientierung: Strukturell identisch mit der Goldstandard-data.json, aber mit leeren Platzhaltern statt echtem Inhalt.

---

## Fix F-06: Inline-Links in aufgabe-1-4 nachruesten

### Problem

aufgabe-1-4 hat `material_referenz: ["mat-1-8"]` (Karikatur, Position 3, M3), aber Tipp 1 enthaelt keinen `[[...]]`-Inline-Link.

### Loesung

**aufgabe-1-4, tipps[0].text:**
Alt: `"Beschreibe genau, was du siehst: Wo steht der Mann? Was hat er in der Hand? Wo setzt er seine Füße auf?"`
Neu: `"Beschreibe genau, was du auf der [[mat-1-8|Karikatur von Cecil Rhodes]] (M3) siehst: Wo steht der Mann? Was hat er in der Hand? Wo setzt er seine Füße auf?"`

**aufgabe-1-5:** Keine Aenderung. Die Tipps sind bewusst metaphorisch und verweisen nicht auf spezifisches Quellenmaterial. Dokumentierte Ausnahme.

---

## Fix F-08: Feld-Semantik in Mappe-1-Sicherung korrigieren

### Problem

Drei Felder tragen alle Ueberleitungs-Charakter statt ihrer jeweiligen Funktion:
- `transfer.frage`: "Weiter zur nächsten Mappe: Der Funke fällt in Sarajevo." — soll Transferfrage sein
- `reflexionsimpuls`: "Das Pulverfass war gefüllt — der Funke kam..." — soll Reflexionsfrage sein
- `ueberleitung`: OK (C5 Variante A)

### Loesung

**sicherung.tafelbild.transfer.frage:**
Alt: `"Weiter zur nächsten Mappe: Der Funke fällt in Sarajevo."`
Neu: `"Gibt es heute Situationen, in denen ein kleiner Anlass einen großen Konflikt auslösen könnte?"`

**sicherung.reflexionsimpuls:**
Alt: `"Das Pulverfass war gefüllt — der Funke kam am 28. Juni 1914 in Sarajevo. Weiter in der nächsten Mappe."`
Neu: `"Was hat sich an deinem Bild von Europa vor 1914 verändert?"`

**sicherung.ueberleitung:** Bleibt unveraendert (korrekte C5 Variante A).

---

## Merge-Schutz

**Aendern:**
- `escape-games/template/data.json` (Schema-Update)
- `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (F-06 + F-08)

**NICHT aendern:** `docs/**`, Engine-JS, CSS, HTML-Templates.

---

## Verifikations-Checkliste

1. [ ] Template data.json hat `position`, `didaktische_funktion`, `bildunterschrift` in materialien[]
2. [ ] Template data.json hat `stundenfrage`, `scpl{}`, `transfer{}` in sicherung.tafelbild
3. [ ] Template data.json hat `ueberleitung`, `reflexionsimpuls`, `hefteintrag_verweis` in sicherung
4. [ ] aufgabe-1-4 Tipp 1 enthaelt `[[mat-1-8|Karikatur von Cecil Rhodes]]`
5. [ ] aufgabe-1-5 Tipps sind UNVERAENDERT
6. [ ] sicherung.tafelbild.transfer.frage ist echte Transferfrage (endet mit "?")
7. [ ] sicherung.reflexionsimpuls ist echte Reflexionsfrage (endet mit "?")
8. [ ] sicherung.ueberleitung ist unveraendert
9. [ ] Beide JSON-Dateien valide
10. [ ] Website im Browser laden: Tipp 1 von Aufgabe 4 zeigt klickbaren Link

---

## Commit-Konvention

```
v3.8: Audit-Fixes — Template aktualisiert, Inline-Link aufgabe-1-4, Feld-Semantik Sicherung
```
