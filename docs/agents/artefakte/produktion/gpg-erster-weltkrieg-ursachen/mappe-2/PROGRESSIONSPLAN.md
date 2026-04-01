# PROGRESSIONSPLAN — Mappe 2: Das Attentat von Sarajevo

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Mappe:** 2
**Stundenfrage:** Wie konnte ein einziger Mord einen Weltkrieg ausloesen?
**AFB-Schwerpunkt Mappe 2:** II (Erkenntnisse gewinnen und anwenden)
**Freischalt-Code:** FUNKE (bestaetigt aus meta.json)

---

## TB-Knoten dieser Mappe

| ID | Text | Typ |
|----|------|-----|
| k2-1 | Attentat von Sarajevo (28.6.1914) | ereignis |
| k2-2 | Ursache vs. Ausloeser | kernbegriff |
| k2-3 | Julikrise | ereignis |
| k2-4 | Blankoscheck (DE → Oe-U) | ereignis |
| k2-5 | Kettenreaktion der Kriegserklaerungen | wirkung |
| k2-6 | Balkankrise (Vorgeschichte) | ursache |

## Materialien-Uebersicht (Metadaten)

| ID | Display-ID | Typ | Titel | TB-Knoten abgedeckt | Didaktische Funktion |
|----|-----------|-----|-------|---------------------|---------------------|
| mat-2-1 | M1 | darstellungstext | Warum schwelte es auf dem Balkan? | k2-6, k2-1, k2-2 | Erklaert Balkankrise als Vorgeschichte, Attentat als Ereignis, fuehrt Ursache-vs.-Ausloeser-Unterscheidung ein |
| mat-2-2 | M2 | bildquelle | Wie stellte man sich das Attentat vor? | k2-1 | Zeitgenoessische Illustration (Beltrame) — Dramatik, historische Authentizitaet |
| mat-2-3 | M3 | bildquelle | Die letzten Minuten vor dem Attentat | k2-1 | Foto Franz Ferdinand und Sophie — emotionaler Zugang, "letzte Momente" |
| mat-2-4 | M4 | quellentext | Was forderte Oesterreich-Ungarn von Serbien? | k2-3, k2-4 | Historisches Dokument: Ultimatum — Eskalationslogik der Diplomatie |
| mat-2-5 | M5 | zeitleiste | Wie wurde aus einem Mord in 37 Tagen ein Weltkrieg? | k2-3, k2-4, k2-5 | Chronologische Visualisierung: Attentat → Blankoscheck → Ultimatum → Kettenreaktion |
| mat-2-6 | M6 | quellentext | Wie erlebte ein Bewohner Sarajevos den 28. Juni 1914? | k2-6, k2-1 | Personifizierte Perspektive — emotionaler Zugang zu Schock und Angst |

---

## Progressionsplan (5 Positionen)

| Pos | AFB | Typ | Ziel-Material | TB-Knoten | Subagent |
|-----|-----|-----|---------------|-----------|----------|
| 1 | I | multiple-choice | mat-2-2 (M2) + mat-2-3 (M3) | k2-1 | SUB_AUFGABE_MC |
| 2 | I | zuordnung | mat-2-1 (M1) | k2-2, k2-6 | SUB_AUFGABE_ZUORDNUNG |
| 3 | II | reihenfolge | mat-2-5 (M5) | k2-3, k2-4, k2-5 | SUB_AUFGABE_REIHENFOLGE |
| 4 | II | lueckentext | mat-2-4 (M4) | k2-3, k2-4 | SUB_AUFGABE_LUECKENTEXT |
| 5 | III | freitext-code | mat-2-6 (M6) | k2-2, k2-5 | SUB_AUFGABE_FREITEXT |

**Typvielfalt:** 5 verschiedene Typen (MC, Zuordnung, Reihenfolge, Lueckentext, Freitext). Kein Typ > 1x. Freitext genau 1x (Pos. 5). PASS.
**AFB-Progression:** I → I → II → II → III. Monoton steigend. PASS.
**Material-Vollstaendigkeit:** Alle 6 Materialien in mindestens 1 Aufgabe referenziert. PASS.
**TB-Abdeckung:** Alle 6 Knoten (k2-1 bis k2-6) in mindestens 1 Aufgabe abgedeckt. PASS.

---

## Konstruktionskontexte

### Aufgabe 1 (Position 1 von 5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 1 von 5 |
| AFB-Stufe | I |
| Aufgabentyp | multiple-choice |
| Ziel-Material | mat-2-2 (M2, bildquelle: Wie stellte man sich das Attentat vor?) + mat-2-3 (M3, bildquelle: Die letzten Minuten vor dem Attentat) — Subagent erhaelt Volltext BEIDER Materialien |
| Material-Display-IDs | mat-2-2 → M2, mat-2-3 → M3 |
| Material-Zusammenfassungen | mat-2-1 (M1): Darstellungstext ueber Balkankrise, Attentat und Ursache-vs.-Ausloeser-Unterscheidung. mat-2-4 (M4): Quellentext zum Ultimatum Oesterreich-Ungarns an Serbien. mat-2-5 (M5): Zeitleiste der Julikrise vom Attentat bis zum Weltkrieg. mat-2-6 (M6): Quellentext — Bewohner Sarajevos erlebt den 28. Juni 1914. |
| TB-Knoten | k2-1 (Attentat von Sarajevo, 28.6.1914) — Aufgabe muss pruefen, ob dieser Knoten verstanden wurde |
| Operationalisierungsziel | Benenne die zentralen Akteure und Umstaende des Attentats von Sarajevo anhand der Bildquellen (Herleitung: AFB-I-Operator "benenne" + TB-Knoten-Merksatz k2-1 "Attentat von Sarajevo 28.6.1914") |
| Gegenpruefung | mat-2-2 zeigt Illustration des Attentats mit Akteuren, mat-2-3 zeigt Franz Ferdinand und Sophie → Akteure und Umstaende ableitbar. PASS |
| Bereits getestete Inhalte | — (erste Aufgabe) |
| Noch nicht getestete TB-Knoten | k2-2, k2-3, k2-4, k2-5, k2-6 |

**Dispatch:** `SUB_AUFGABE_MC.md` lesen, dann aufgabe-2-1.json produzieren.

---

### Aufgabe 2 (Position 2 von 5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 5 |
| AFB-Stufe | I |
| Aufgabentyp | zuordnung |
| Ziel-Material | mat-2-1 (M1, darstellungstext: Warum schwelte es auf dem Balkan?) — Subagent erhaelt Volltext |
| Material-Display-ID | mat-2-1 → M1 |
| Material-Zusammenfassungen | mat-2-2 (M2): Illustration des Attentats (Beltrame). mat-2-3 (M3): Foto — letzte Minuten vor dem Attentat. mat-2-4 (M4): Quellentext zum Ultimatum. mat-2-5 (M5): Zeitleiste Julikrise. mat-2-6 (M6): Bewohner-Perspektive Sarajevo. |
| TB-Knoten | k2-2 (Ursache vs. Ausloeser) + k2-6 (Balkankrise) — Aufgabe muss pruefen, ob SuS zwischen langfristigen Ursachen und konkretem Ausloeser unterscheiden koennen |
| Operationalisierungsziel | Ordne historische Sachverhalte den Kategorien "langfristige Ursache" und "konkreter Ausloeser" zu (Herleitung: AFB-I-Operator "ordne zu" + TB-Knoten k2-2 "Ursache vs. Ausloeser" + k2-6 "Balkankrise als Vorgeschichte") |
| Gegenpruefung | mat-2-1 erklaert explizit die Unterscheidung Ursache/Ausloeser und die Balkankrise als Vorgeschichte → Zuordnung ableitbar. PASS |
| Bereits getestete Inhalte | Aufgabe 1 (MC, AFB I): Akteure und Umstaende des Attentats |
| Noch nicht getestete TB-Knoten | k2-3, k2-4, k2-5 |

**Dispatch:** `SUB_AUFGABE_ZUORDNUNG.md` lesen, dann aufgabe-2-2.json produzieren.

---

### Aufgabe 3 (Position 3 von 5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 3 von 5 |
| AFB-Stufe | II |
| Aufgabentyp | reihenfolge |
| Ziel-Material | mat-2-5 (M5, zeitleiste: Wie wurde aus einem Mord in 37 Tagen ein Weltkrieg?) — Subagent erhaelt Volltext |
| Material-Display-ID | mat-2-5 → M5 |
| Material-Zusammenfassungen | mat-2-1 (M1): Darstellungstext Balkankrise/Attentat/Ursache-Ausloeser. mat-2-2 (M2): Illustration Attentat. mat-2-3 (M3): Foto letzte Minuten. mat-2-4 (M4): Quellentext Ultimatum. mat-2-6 (M6): Bewohner-Perspektive Sarajevo. |
| TB-Knoten | k2-3 (Julikrise) + k2-4 (Blankoscheck) + k2-5 (Kettenreaktion der Kriegserklaerungen) — Aufgabe muss pruefen, ob SuS die chronologische Eskalationslogik der Julikrise verstanden haben |
| Operationalisierungsziel | Ordne die Stationen der Julikrise chronologisch und erklaere, wie eine Eskalationsstufe zur naechsten fuehrte (Herleitung: AFB-II-Operator "ordne und erklaere" + TB-Knoten k2-3 "Julikrise" + k2-4 "Blankoscheck" + k2-5 "Kettenreaktion") |
| Gegenpruefung | mat-2-5 enthaelt exakte Chronologie mit 7 Stationen (28.06. bis 04.08.) → Reihenfolge und Eskalationslogik ableitbar. PASS |
| Bereits getestete Inhalte | Aufgabe 1 (MC, AFB I): Attentat-Akteure. Aufgabe 2 (Zuordnung, AFB I): Ursache vs. Ausloeser |
| Noch nicht getestete TB-Knoten | (alle k2-3/k2-4/k2-5 werden hier erstmals getestet) |

**Dispatch:** `SUB_AUFGABE_REIHENFOLGE.md` lesen, dann aufgabe-2-3.json produzieren.

---

### Aufgabe 4 (Position 4 von 5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 4 von 5 |
| AFB-Stufe | II |
| Aufgabentyp | lueckentext |
| Ziel-Material | mat-2-4 (M4, quellentext: Was forderte Oesterreich-Ungarn von Serbien?) — Subagent erhaelt Volltext |
| Material-Display-ID | mat-2-4 → M4 |
| Material-Zusammenfassungen | mat-2-1 (M1): Darstellungstext Balkankrise/Attentat/Ursache-Ausloeser. mat-2-2 (M2): Illustration Attentat. mat-2-3 (M3): Foto letzte Minuten. mat-2-5 (M5): Zeitleiste Julikrise. mat-2-6 (M6): Bewohner-Perspektive Sarajevo. |
| TB-Knoten | k2-3 (Julikrise) + k2-4 (Blankoscheck) — Aufgabe muss pruefen, ob SuS die Begriffe "Blankoscheck" und "Ultimatum" im Kontext der diplomatischen Eskalation erklaeren koennen |
| Operationalisierungsziel | Erklaere die Rolle des Blankoschecks und des Ultimatums als Eskalationsschritte der Julikrise (Herleitung: AFB-II-Operator "erklaere" + TB-Knoten k2-4 "Blankoscheck DE → Oe-U" + k2-3 "Julikrise") |
| Gegenpruefung | mat-2-4 enthaelt Originalquelle des Ultimatums + Kontext Blankoscheck → Fachbegriffe und Zusammenhaenge ableitbar. PASS |
| Bereits getestete Inhalte | Aufgabe 1: Attentat-Akteure. Aufgabe 2: Ursache vs. Ausloeser. Aufgabe 3: Julikrise-Chronologie |
| Noch nicht getestete TB-Knoten | (k2-3/k2-4 vertieft, k2-5 bereits in Aufgabe 3 angetestet) |

**Hinweis fuer Subagent:** Die Luecken sollen Fachbegriffe testen (Blankoscheck, Ultimatum, Annexion), NICHT Jahreszahlen oder Eigennamen. Luecken muessen aus mat-2-4 eindeutig fuellbar sein.

**Dispatch:** `SUB_AUFGABE_LUECKENTEXT.md` lesen, dann aufgabe-2-4.json produzieren.

---

### Aufgabe 5 (Position 5 von 5)

| Feld | Wert |
|------|------|
| Aufgaben-Position | 5 von 5 |
| AFB-Stufe | III |
| Aufgabentyp | freitext-code |
| Ziel-Material | mat-2-6 (M6, quellentext: Wie erlebte ein Bewohner Sarajevos den 28. Juni 1914?) — Subagent erhaelt Volltext |
| Material-Display-ID | mat-2-6 → M6 |
| Material-Zusammenfassungen | mat-2-1 (M1): Darstellungstext Balkankrise/Attentat/Ursache-Ausloeser. mat-2-2 (M2): Illustration Attentat. mat-2-3 (M3): Foto letzte Minuten. mat-2-4 (M4): Quellentext Ultimatum. mat-2-5 (M5): Zeitleiste Julikrise. |
| TB-Knoten | k2-2 (Ursache vs. Ausloeser) + k2-5 (Kettenreaktion) — Aufgabe muss pruefen, ob SuS ein eigenstaendiges Sachurteil zur Frage "Attentat = alleinige Kriegsursache?" formulieren koennen |
| Operationalisierungsziel | Beurteile, ob das Attentat von Sarajevo allein fuer den Ausbruch des Ersten Weltkriegs verantwortlich war, und begruende dein Urteil mit Belegen aus den Materialien (Herleitung: AFB-III-Operator "beurteile" + TB-Knoten k2-2 "Ursache vs. Ausloeser" + k2-5 "Kettenreaktion" + Stundenfrage "Wie konnte ein einziger Mord einen Weltkrieg ausloesen?") |
| Gegenpruefung | mat-2-6 liefert Einzelperspektive als Ausgangspunkt; SuS muessen Transfer zu den Strukturursachen (Buendnisse, Rivalitaeten aus Mappe 1) und zum Mechanismus der Kettenreaktion leisten → AFB-III-Anforderung. Alle bisherigen Materialien liefern Belege. PASS |
| Bereits getestete Inhalte | Aufgabe 1: Attentat-Akteure. Aufgabe 2: Ursache vs. Ausloeser (Zuordnung). Aufgabe 3: Julikrise-Chronologie. Aufgabe 4: Blankoscheck/Ultimatum |
| Noch nicht getestete TB-Knoten | — (alle abgedeckt) |

**Hinweis fuer Subagent:** Freitext-Leitfrage soll zur Stundenfrage hinleiten. Erwarteter Code-Kern: 3-5 Schluesselwoerter, die das Sachurteil auf den Punkt bringen (z.B. "Ausloeser Buendnisse Kettenreaktion"). Scaffolding ueber 3 Tipp-Stufen: (1) Denkansatz: "Attentat war der Funke — was war das Pulverfass?", (2) Teilantwort: Buendnispflichten + Rivalitaeten, (3) Musterantwort.

**Dispatch:** `SUB_AUFGABE_FREITEXT.md` lesen, dann aufgabe-2-5.json produzieren.

---

## Freischalt-Code

**Code:** FUNKE
**Laenge:** 5 Buchstaben
**Thematischer Bezug:** "Der Funke, der das Pulverfass entzuendete" — Standardmetapher fuer das Attentat als Ausloeser
**Validierung:** A-Z, keine Umlaute/Sonderzeichen, 4-8 Zeichen. PASS.
**Quelle:** Bereits in rahmen/meta.json gesetzt (Phase 2.0). Keine Aenderung noetig.

---

## Dispatch-Sequenz (Phase 2.2b)

```
2.2b-1: SUB_AUFGABE_MC       → aufgabe-2-1.json  (Pos 1, AFB I)
2.2b-2: SUB_AUFGABE_ZUORDNUNG → aufgabe-2-2.json  (Pos 2, AFB I)
2.2b-3: SUB_AUFGABE_REIHENFOLGE → aufgabe-2-3.json (Pos 3, AFB II)
2.2b-4: SUB_AUFGABE_LUECKENTEXT → aufgabe-2-4.json (Pos 4, AFB II)
2.2b-5: SUB_AUFGABE_FREITEXT → aufgabe-2-5.json   (Pos 5, AFB III)
```

**DISPATCH-ISOLATION (P4):** Jede Aufgabe als EIGENE Nachricht. NICHT parallel. Sequentiell 1 → 2 → 3 → 4 → 5.

**Pro Dispatch liest der Subagent:**
1. PROGRESSIONSPLAN.md — NUR seinen eigenen Konstruktionskontext
2. Ziel-Material(ien) — Volltext
3. MATERIAL_GERUEST — NUR titel + didaktische_funktion der anderen Materialien
4. Seinen SUB_AUFGABE_[TYP].md — vollstaendig

---

## Validierung (Pre-Dispatch-Check)

| Kriterium | Status | Nachweis |
|-----------|--------|----------|
| A5 AFB-Progression | PASS | I → I → II → II → III (monoton steigend) |
| A9 TB-Abdeckung | PASS | k2-1 (Pos 1), k2-2 (Pos 2+5), k2-3 (Pos 3+4), k2-4 (Pos 3+4), k2-5 (Pos 3+5), k2-6 (Pos 2) |
| A10 Typvielfalt | PASS | 5 Typen (MC, Zuordnung, Reihenfolge, Lueckentext, Freitext), kein Typ > 1x, Freitext genau 1x (Pos 5) |
| A3 Material-Vollstaendigkeit | PASS | mat-2-1 (Pos 2), mat-2-2 (Pos 1), mat-2-3 (Pos 1), mat-2-4 (Pos 4), mat-2-5 (Pos 3), mat-2-6 (Pos 5) |
| A12 Sachbezogen → Wertbezogen | PASS | Fakten (Pos 1-2) → Transfer/Analyse (Pos 3-4) → Stellungnahme/Beurteilung (Pos 5) |
| Freischalt-Code | PASS | FUNKE (5 Zeichen, A-Z, thematisch passend, in meta.json) |
