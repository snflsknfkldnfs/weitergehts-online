# Uebergabe-Prompt: Runde 4b — Engine-Patches + Mappe-2 Data-Fixes

**Erstellt:** 2026-04-02 (Cowork Runde 4)
**Quelle:** QUALITAETSBEFUNDE_gpg-erster-weltkrieg-ursachen_Mappe2.md
**Ausfuehrender:** Claude Code (Phase 3 — Assembly/Engine)
**Kontext:** Post-Produktions-Qualitaetsreview Mappe 2 ergab 10 Findings (5 HIGH, 4 MEDIUM, 1 LOW). Dieser Prompt behandelt die 5 Sofort-Patches, die Engine- und data.json-Aenderungen erfordern.

---

## Pre-Flight

```
1. git pull origin main (aktuellen Stand holen)
2. git checkout -b fix/mappe2-quality-patches
3. Alle genannten Dateien existieren? Pruefen:
   - assets/js/escape-engine.js
   - escape-games/gpg-erster-weltkrieg-ursachen/data.json
```

---

## Patch 1: Reihenfolge-Aufgabe — Feldname-Kompatibilitaet (Q-M2-01, HIGH)

**Datei:** `assets/js/escape-engine.js`
**Zeile ~2388** (Funktion `_renderReihenfolge`):

**IST:**
```js
items = Core.utils.shuffleArray(aufgabe.optionen || []);
```

**SOLL:**
```js
items = Core.utils.shuffleArray(aufgabe.optionen || aufgabe.elemente_ungeordnet || []);
```

**Begruendung:** SUB_AUFGABE_RF produzierte bisher `elemente_ungeordnet`. Ab sofort produziert er `optionen` (Subagent-Prompt ist bereits geaendert). Der Fallback `aufgabe.elemente_ungeordnet` sichert Rueckwaertskompatibilitaet fuer bereits generierte Mappen.

**Pruefe auch** Zeile ~2488-2510 (`_checkReihenfolge`): Dort muss ebenfalls `aufgabe.optionen || aufgabe.elemente_ungeordnet` verwendet werden, falls der Check auf die Optionen zugreift.

---

## Patch 2: Freitext-Code — Keyword-Array-Matching (Q-M2-02, HIGH)

**Datei:** `assets/js/escape-engine.js`
**Zeilen ~2568-2602** (Funktion `_checkFreitextCode`):

**IST:** Die Funktion behandelt `aufgabe.loesung` als Einzelstring und prueft via `fuzzyMatch(eingabe, loesung)` + `indexOf`-Fallback.

**SOLL:** Wenn `aufgabe.loesung` ein Array ist, Keyword-Modus aktivieren:

```js
// Pseudocode — bitte in bestehende Funktion integrieren:
if (Array.isArray(aufgabe.loesung)) {
    // Keyword-Modus: ALLE Keywords muessen im Eingabetext vorkommen
    const eingabeNorm = eingabe.trim().toLowerCase();
    const allMatch = aufgabe.loesung.every(keyword => {
        const kwNorm = keyword.trim().toLowerCase();
        // fuzzyMatch oder indexOf pro Keyword
        return eingabeNorm.includes(kwNorm) || fuzzyMatch(eingabeNorm, kwNorm);
    });
    return allMatch;
} else {
    // Bisheriges Verhalten fuer String-Loesung (Rueckwaertskompatibilitaet)
    // ... bestehender Code ...
}
```

**Begruendung:** SUB_AUFGABE_FT produziert ab sofort `loesung` als Array (z.B. `["Ausloeser", "Ursache", "Kettenreaktion"]`). Die Engine muss jedes Keyword einzeln im Schueler-Text finden (case-insensitive). Der String-Fallback bleibt fuer alte Daten.

**Umlaut-Normalisierung:** Stelle sicher, dass die fuzzyMatch-Funktion Umlaute korrekt vergleicht (ae/ä, oe/ö, ue/ü). Falls nicht: Umlaut-Normalisierung VOR dem Vergleich.

---

## Patch 3: data.json — mat-2-6 Typ korrigieren (Q-M2-06, MEDIUM)

**Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

In der Materialien-Sektion, Material mit `"id": "mat-2-6"`:

**IST:** `"typ": "quellentext"`
**SOLL:** `"typ": "tagebuch"`

---

## Patch 4: data.json — mat-2-1 Quellenangabe bereinigen (Q-M2-08, MEDIUM)

**Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

In Material `"id": "mat-2-1"`: Das Feld `quellenangabe` (und/oder `quellenangabe_anzeige`) enthaelt den String "INHALTSBASIS".

**SOLL:** Ersetze jede Quellenangabe, die "INHALTSBASIS" enthaelt, durch:
`"Eigene Darstellung auf Basis der Sachanalyse"`

Pruefe auch alle anderen Materialien der Mappe auf "INHALTSBASIS", "SKRIPT", "TAFELBILD", "MATERIAL_GERUEST" in quellenangabe-Feldern.

---

## Patch 5: data.json — Reflexionsimpuls-Duplikat entfernen (Q-M2-07, MEDIUM)

**Datei:** `escape-games/gpg-erster-weltkrieg-ursachen/data.json`

In der Sicherung-Sektion (`sicherung` oder `rahmen.sicherung`):
- `kernerkenntnisse[]` enthaelt einen Eintrag, der identisch oder nahezu identisch mit `reflexionsimpuls` ist.
- Der Reflexionsimpuls-Text lautet sinngemäß: "Kennst du einen heutigen Konflikt, bei dem Auslöser und Ursache verwechselt werden?"

**SOLL:** Diesen Eintrag aus `kernerkenntnisse[]` entfernen. Er gehoert NUR in `reflexionsimpuls`.

---

## Post-Flight

```
1. npm test (falls vorhanden) ODER manueller Funktionstest:
   - Mappe 2 im Browser oeffnen
   - Aufgabe 3 (Reihenfolge): Items muessen sichtbar sein
   - Aufgabe 5 (Freitext): Keyword-Eingabe muss akzeptiert werden
   - M6: Tagebuch-Styling (handschriftlich)
   - M1: Quellenangabe ohne "INHALTSBASIS"
   - Sicherung: Reflexionsimpuls nur einmal
2. git add assets/js/escape-engine.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
3. git commit -m "fix: Mappe 2 quality patches (Q-M2-01..10)

   - Engine: Reihenfolge-Aufgabe liest optionen || elemente_ungeordnet
   - Engine: Freitext-Code Keyword-Array-Matching
   - data.json: mat-2-6 typ quellentext → tagebuch
   - data.json: Quellenangabe-Hygiene (INHALTSBASIS entfernt)
   - data.json: Reflexionsimpuls-Duplikat aus kernerkenntnisse entfernt

   Ref: QUALITAETSBEFUNDE_gpg-erster-weltkrieg-ursachen_Mappe2.md"
4. git push origin fix/mappe2-quality-patches
```

---

## NICHT in diesem Prompt enthalten

Die folgenden Findings erfordern umfangreichere Aenderungen und werden separat behandelt:
- Q-M2-03 (Ueberleitungen): Neuer Dispatch/Phase noetig — architektonische Entscheidung
- Q-M2-04 (Material-Referenzen in Fragen): Bereits in Subagenten-Prompts gefixt (Cowork Runde 4)
- Q-M2-05 (Hefteintrag-Qualitaet): Erfordert Phase-Verschiebung oder Zweitpass
- Q-M2-09/10 (Quellenangabe-Duplikation): Engine-Rendering-Entscheidung (welches Feld rendern?)
