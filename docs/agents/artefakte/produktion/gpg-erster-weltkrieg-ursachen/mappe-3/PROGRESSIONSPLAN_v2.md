# Progressionsplan Mappe 3 — v2 (inhaltsgesteuert)

**Datum:** 2026-04-03
**Hefteintrag-Version:** hefteintrag_B1_TEST.json (v2, kontrastierend, 6 Knoten, 5 Verbindungen)
**Stundenfrage:** Waren die Menschen 1914 wirklich begeistert vom Krieg?

## Aufgabenzahl-Ableitung

```
basis          = 5
knoten_faktor  = 1   (6 Knoten > 5)
material_faktor = 1  (5 Materialien > 4)
aufgabenzahl   = min(8, 5+1+1) = 7
```

## SCPL-Zonen-Mapping

| Pos | SCPL-Zone | AFB | TB-Knoten | Typ | Material (Primaer) | Operationalisierungsziel |
|---|---|---|---|---|---|---|
| 1 | S (Situation) | I | k3-1 | lueckentext | mat-3-1 (DT) | Nenne die Fachbegriffe zur Kriegsstimmung 1914 |
| 2 | C1 (Augusterlebnis) | I | k3-1 | multiple-choice | mat-3-2 (BQ) | Beschreibe, was das Foto vor dem Berliner Stadtschloss zeigt |
| 3 | C2 (Vier Ursachen) | I-II | k3-2, k3-3, k3-4 | zuordnung | mat-3-1 (DT) | Ordne die vier Ursachen der Kriegsbegeisterung ihren Beschreibungen zu |
| 4 | C3 (Gegenstimmen) | II | k3-5 | multiple-choice | mat-3-3 (BQ), mat-3-4 (QT) | Erklaere, warum das Bild der einheitlichen Kriegsbegeisterung nicht stimmt |
| 5 | P (Burgfrieden) | II | k3-6 | lueckentext | mat-3-4 (QT) | Erklaere den Zusammenhang zwischen Kriegskrediten und Burgfrieden |
| 6 | L (Synthese) | II | k3-1, k3-5, k3-6 | zuordnung | mat-3-4 (QT), mat-3-5 (TB) | Unterscheide die Perspektiven Begeisterung, Angst und Pflicht |
| 7 | L (Transfer) | III | k3-4 | freitext-code | mat-3-5 (TB) | Beurteile, ob gesellschaftlicher Druck heute noch Menschen zum Schweigen bringt |

## Typ-Wiederholungs-Begruendungen

| Typ | Vorkommen | Begruendung |
|---|---|---|
| multiple-choice | 2x (Pos 2, 4) | Pos 2: AFB I Bilderkennung (was zeigt das Foto?). Pos 4: AFB II Transfer-Kontrast (warum stimmt das Bild nicht mit den Quellen ueberein?). Unterschiedliche kognitive Anforderung. |
| lueckentext | 2x (Pos 1, 5) | Pos 1: AFB I Fachbegriff-Recall (Definitionen aus DT). Pos 5: AFB II Zusammenhangs-Luecken (Kausalkette Burgfrieden aus QT). Unterschiedlicher Schwierigkeitsgrad + Materialtyp. |
| zuordnung | 2x (Pos 3, 6) | Pos 3: AFB I-II Fakten-Zuordnung (4 Ursachen → Beschreibungen). Pos 6: AFB II Perspektiven-Differenzierung (Aussagen → Begeisterung/Angst/Pflicht). Unterschiedliche Kategorisierungsebene. |

## Material-Aktivierung (A18)

| Material | Typ | Als Primaerquelle in Aufgabe(n) | Status |
|---|---|---|---|
| mat-3-1 | DT | Pos 1, 3 | PASS |
| mat-3-2 | BQ | Pos 2 | PASS (alt: nur in Tipps → FAIL) |
| mat-3-3 | BQ | Pos 4 | PASS (alt: nur in Tipps → FAIL) |
| mat-3-4 | QT | Pos 4, 5, 6 | PASS |
| mat-3-5 | TB | Pos 6, 7 | PASS |

## Erarbeitbarkeits-Gegenpruefung

| Pos | Typ | Material | Check | Ergebnis |
|---|---|---|---|---|
| 1 | LT | mat-3-1 | Fachbegriffe im Material definiert? | PASS — Kriegsbegeisterung, Augusterlebnis, Patriotismus, Propaganda explizit eingefuehrt |
| 2 | MC | mat-3-2 | Distraktoren plausibel, richtige Antwort aus Material begruendbar? | PASS — Foto zeigt eindeutig jubelnde Menge, Distraktoren: andere historische Situationen |
| 3 | ZU | mat-3-1 | Zuordnungspaare disjunkt, Kategorien trennscharf? | PASS — 4 Ursachen klar abgegrenzt (Patriotismus vs. Propaganda vs. Druck vs. Abenteuerlust) |
| 4 | MC | mat-3-3+3-4 | Transfer-Leistung aus Material belegbar? | PASS — Foto suggeriert Einheit, Quellen zeigen Widerspruch (Zweig vs. Bremen) |
| 5 | LT | mat-3-4 | Fachbegriffe im Material definiert? | PASS — Kriegskredite, Burgfrieden in Haase-Quelle + Einleitung |
| 6 | ZU | mat-3-4+3-5 | Kategorien disjunkt? | PASS — Begeisterung (Zweig/Freiwilliger), Angst (Bremen/Bauersfrau), Pflicht (Haase/SPD) |
| 7 | FT | mat-3-5 | Erwartete Antwort objektivierbar? | PASS — Bauersfrau-Zitat als Beleg, Transfer auf Gegenwart mit Scaffolding |
