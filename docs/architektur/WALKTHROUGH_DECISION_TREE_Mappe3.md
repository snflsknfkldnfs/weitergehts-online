# Walkthrough: Decision-Tree auf Mappe 3

**Datum:** 2026-04-02
**Zweck:** Verifikation C+ Schritt 3 — Produziert der Decision-Tree fuer jedes Material eine eindeutige Read-Sequenz?
**Testfaelle:** mat-3-1 (DT), mat-3-2 (BQ), mat-3-5 (TB) — 3 unterschiedliche Typen, verschiedene Bedingungen

---

## mat-3-1 (darstellungstext, Position 1, einstieg)

### Read-Step 1: MATERIAL_GERUEST
```
Zeile:          mat-3-1 | darstellungstext | "Begeisterung und Angst — August 1914" | §1-§2 | k3-1, k3-2, k3-3, k3-4 | — | einstieg
→ TYP           = darstellungstext
→ TITEL         = "Begeisterung und Angst — August 1914"
→ CHUNKS[]      = ["§1", "§2"]
→ TB_KNOTEN[]   = ["k3-1", "k3-2", "k3-3", "k3-4"]
→ ARTEFAKT_REFS = []   (kein artefakt_ref)
→ DIDAKT_FN     = "einstieg"
```

### Read-Step 1b: SEQUENZKONTEXT
```
Position: 1 von 5 → VORHERIGES = null
NAECHSTES = {id: "mat-3-2", typ: "bildquelle", Kerninhalt: "Jubel vor dem Berliner Stadtschloss"}
VORAUSGESETZTES_WISSEN = [] (erstes Material)
NOCH_NICHT_EINGEFUEHRT = [k3-5 (Gegenstimmen), k3-6 (Burgfrieden)]
→ Eindeutig. ✓
```

### Read-Step 2: HEFTEINTRAG
```
TB_KNOTEN[] = [k3-1, k3-2, k3-3, k3-4]
SCPL-Zone-Mapping:
  k3-1 → complication[0]
  k3-2 → complication[1]
  k3-3 → complication[1]
  k3-4 → complication[1]
→ Lese: stundenfrage + knoten k3-1..k3-4 + scpl.complication[0] + scpl.complication[1]
→ NICHT lesen: scpl.situation, scpl.complication[2], scpl.problem, scpl.loesung
→ Eindeutig. ✓
```

### Read-Step 3: SUB_MATERIAL_DARSTELLUNGSTEXT.md
```
TYP = darstellungstext → SUB_MATERIAL_DARSTELLUNGSTEXT.md
→ Vollstaendig lesen. ✓
```

### Read-Step 4: SKRIPT
```
CHUNKS[] = ["§1", "§2"]
→ Lese §1 und §2 aus SKRIPT_gpg-erster-weltkrieg-ursachen.md
→ Eindeutig. ✓
```

### Read-Step 5: INHALTSBASIS
```
→ Mappe 3 Sektion
→ Eindeutig. ✓
```

### Read-Step 6: EINSTIEG
```
→ problemstellung lesen
→ Eindeutig. ✓
```

### Read-Step 7: ARTEFAKT_INVENTAR
```
Bedingung: ARTEFAKT_REFS[] ist leer
→ UEBERSPRINGEN. ✓
```

### Read-Step 8: KERNERKENNTNISSE
```
Bedingung: DIDAKT_FN = "einstieg" ∉ {"sicherung", "transfer"}
→ UEBERSPRINGEN. ✓
```

**Ergebnis mat-3-1:** 6 aktive Reads (1, 1b, 2, 3, 4, 5, 6). 2 uebersprungen (7, 8). Jeder Schritt eindeutig. ✓

---

## mat-3-2 (bildquelle, Position 2, erarbeitung)

### Read-Step 1: MATERIAL_GERUEST
```
Zeile:          mat-3-2 | bildquelle | "Jubel vor dem Berliner Stadtschloss" | §1 | k3-1 | img-3-1 | erarbeitung
→ TYP           = bildquelle
→ CHUNKS[]      = ["§1"]
→ TB_KNOTEN[]   = ["k3-1"]
→ ARTEFAKT_REFS = ["img-3-1"]
→ DIDAKT_FN     = "erarbeitung"
```

### Read-Step 1b: SEQUENZKONTEXT
```
Position: 2 von 5
VORHERIGES = {id: "mat-3-1", typ: "darstellungstext", Kerninhalt: "Begeisterung und Angst — August 1914"}
NAECHSTES  = {id: "mat-3-3", typ: "bildquelle", Kerninhalt: "Truppentransport per Bahn, August 1914"}
VORAUSGESETZTES_WISSEN = [k3-1 (Kriegsbegeisterung), k3-2 (Patriotismus), k3-3 (Propaganda), k3-4 (Druck)] — aus mat-3-1
NOCH_NICHT_EINGEFUEHRT = [k3-5 (Gegenstimmen), k3-6 (Burgfrieden)]
→ Eindeutig. ✓
```

### Read-Step 2: HEFTEINTRAG
```
TB_KNOTEN[] = [k3-1]
SCPL-Zone-Mapping: k3-1 → complication[0]
→ Lese: stundenfrage + knoten k3-1 + scpl.complication[0]
→ NICHT lesen: complication[1], complication[2], problem, loesung, situation
→ Eindeutig. ✓
```

### Read-Step 3: SUB_MATERIAL_BILDQUELLE.md
```
→ Vollstaendig lesen. ✓
```

### Read-Step 4: SKRIPT
```
CHUNKS[] = ["§1"]
→ Lese §1
→ Eindeutig. ✓
```

### Read-Step 5: INHALTSBASIS → Mappe 3 Sektion ✓

### Read-Step 6: EINSTIEG → problemstellung ✓

### Read-Step 7: ARTEFAKT_INVENTAR
```
Bedingung: ARTEFAKT_REFS = ["img-3-1"] → NICHT leer
→ AKTIV: Lese Eintrag "img-3-1" aus ARTEFAKT_INVENTAR
→ Liefert: Dateiname, Lizenz (Wikimedia Commons), Beschreibung
→ Eindeutig. ✓
```

### Read-Step 8: KERNERKENNTNISSE
```
Bedingung: DIDAKT_FN = "erarbeitung" ∉ {"sicherung", "transfer"}
→ UEBERSPRINGEN. ✓
```

**Ergebnis mat-3-2:** 7 aktive Reads (1, 1b, 2, 3, 4, 5, 6, 7). 1 uebersprungen (8). Jeder Schritt eindeutig. ✓

---

## mat-3-5 (tagebuch, Position 5, sicherung)

### Read-Step 1: MATERIAL_GERUEST
```
Zeile:          mat-3-5 | tagebuch | "Zwei Welten — Kriegsfreiwilliger und Bauersfrau" | §1/§4 | k3-1, k3-4, k3-5 | rolle-3-1, rolle-3-2 | sicherung
→ TYP           = tagebuch
→ CHUNKS[]      = ["§1", "§4"]
→ TB_KNOTEN[]   = ["k3-1", "k3-4", "k3-5"]
→ ARTEFAKT_REFS = ["rolle-3-1", "rolle-3-2"]
→ DIDAKT_FN     = "sicherung"
```

### Read-Step 1b: SEQUENZKONTEXT
```
Position: 5 von 5 (letztes Material)
VORHERIGES = {id: "mat-3-4", typ: "quellentext", Kerninhalt: "Drei Stimmen zum Kriegsausbruch"}
NAECHSTES  = null
VORAUSGESETZTES_WISSEN = [k3-1, k3-2, k3-3, k3-4, k3-5, k3-6] — alle Knoten aus mat-3-1 bis mat-3-4
NOCH_NICHT_EINGEFUEHRT = [] (letztes Material, alle Begriffe eingefuehrt)
→ Eindeutig. ✓
```

### Read-Step 2: HEFTEINTRAG
```
TB_KNOTEN[] = [k3-1, k3-4, k3-5]
SCPL-Zone-Mapping:
  k3-1 → complication[0]
  k3-4 → complication[1]
  k3-5 → complication[2]
→ Lese: stundenfrage + knoten k3-1, k3-4, k3-5 + scpl.complication[0] + scpl.complication[1] + scpl.complication[2]
→ NICHT lesen: scpl.situation, scpl.problem, scpl.loesung (loesung kommt in Step 8)
→ Eindeutig. ✓
```

### Read-Step 3: SUB_MATERIAL_TAGEBUCH.md ✓
### Read-Step 4: SKRIPT → §1, §4 ✓
### Read-Step 5: INHALTSBASIS → Mappe 3 Sektion ✓
### Read-Step 6: EINSTIEG → problemstellung ✓

### Read-Step 7: ARTEFAKT_INVENTAR
```
Bedingung: ARTEFAKT_REFS = ["rolle-3-1", "rolle-3-2"] → NICHT leer
→ AKTIV: Lese Eintraege "rolle-3-1" und "rolle-3-2"
→ Liefert: Rollenprofile (Name, Alter, Beruf, Perspektive)
→ Eindeutig. ✓
```

### Read-Step 8: KERNERKENNTNISSE
```
Bedingung: DIDAKT_FN = "sicherung" ∈ {"sicherung", "transfer"}
→ AKTIV: Lese scpl.loesung[] aus hefteintrag.json
→ Liefert: 3 Kernerkenntnisse (Begeisterung Mittel-/Oberschicht, 4 Gruende, Burgfrieden truegerisch)
→ Zweck: Tagebuch muss auf Kernerkenntnisse hinarbeiten (M3c "vom Ende her")
→ Eindeutig. ✓
```

**Ergebnis mat-3-5:** 8 aktive Reads (1, 1b, 2, 3, 4, 5, 6, 7, 8). 0 uebersprungen. Jeder Schritt eindeutig. ✓

---

## Walkthrough-Fazit

| Material | Typ | Aktive Reads | Uebersprungen | Ambiguitaeten |
|---|---|---|---|---|
| mat-3-1 | DT (einstieg) | 6 | 2 (7, 8) | 0 |
| mat-3-2 | BQ (erarbeitung) | 7 | 1 (8) | 0 |
| mat-3-5 | TB (sicherung) | 8 | 0 | 0 |

1. **Alle 3 Testfaelle: 0 Ambiguitaeten.** Jeder Read-Step produziert ein eindeutiges Ergebnis.
2. **Read-Step 1b (NEU) funktioniert:** Sequenzkontext korrekt abgeleitet aus MATERIAL_GERUEST fuer alle 3 Positionen (erste, mittlere, letzte).
3. **SCPL-Zone-Mapping funktioniert:** Alle TB-Knoten eindeutig einer SCPL-Zone zugeordnet. Kein Knoten ohne Match.
4. **Konditionale Steps (7, 8) korrekt:** Step 7 aktiv bei BQ+TB (ARTEFAKT_REFS gesetzt), inaktiv bei DT. Step 8 aktiv bei TB/sicherung, inaktiv bei DT/einstieg und BQ/erarbeitung.
5. **Keine Endlosschleifen, keine zirkulaeren Abhaengigkeiten.** Schritte 1→1b→2→3→4→5→6→7→8 sind streng sequentiell.
