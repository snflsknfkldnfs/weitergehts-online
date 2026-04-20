# F0f — FELD-EVIDENZ-PLAN

**Datei:** `docs/projekt/F0f_FELD_EVIDENZ_PLAN.md`
**Status:** AKTIV (geplant)
**Erstellt:** 2026-04-20
**Modus:** Erhebung + Mapping (strukturierte Auswertung der Unterrichts-Beobachtung)
**Owner:** Paul (Erhebung) + Cowork-PM (Mapping)
**Bezug:** PRE_PILOT_TRIAGE_MATRIX_v2 §6.1/§6.2, UPGRADE_PLAN_v3-12 §20.2 PI-FELDEVIDENZ-1, F0b (9/9 PQI-1)

---

## 1. Anlass

Paul beobachtet im Unterricht (Jgst 7-9 Mittelschule), dass die generierten Mappen **zu schwer** bzw. **zu wenig didaktisch praezise** sind. F0b deckt zwar 9/9 PQI-1, aber nicht den gesamten 21er-A-CODE-Katalog und nicht die 6 A-PROZ-Items. Bevor ein E2E-Pilot sinnvoll ist, muss die Feld-Evidenz systematisch erhoben und auf die Matrix v2.1 abgebildet werden.

## 2. Ziel

- Strukturierte Erhebung konkreter Schwierigkeits- und Didaktisierungs-Luecken in den bereits generierten Mappen.
- Mapping der Beobachtungen auf Matrix v2.1 (21 A-CODE + 6 A-PROZ).
- Gap-Report: Was deckt F0b ab, was nicht, was fehlt ganz.
- Input fuer UPGRADE_PLAN v1.4 PI-FELDEVIDENZ-1 (Coverage-Gap-Schliessung).

## 3. Erhebungsbogen

**Artefakt:** `docs/projekt/testrun-feld-evidenz/ERHEBUNG_<datum>_<klasse>.md`

Pro Beobachtung ein Eintrag:

```markdown
### Beobachtung <laufende-nr>

- **Datum:** YYYY-MM-DD
- **Klasse/Gruppe:** (z.B. GPG 7b, M7c)
- **Mappe-ID:** (z.B. mappe-nationalismus-kolonialismus-2026-04-15)
- **Material-Ref:** (Dateipfad oder URL im Generator-Repo)
- **Aufgabe-ID:** (z.B. A-07 innerhalb der Mappe)
- **Beobachtung (faktisch):** Was geschah im Klassenraum? (keine Interpretation)
- **Schueler-Reaktion-Evidenz:** (Zitat, Fehlermuster, Abbruch, Frage)
- **Lehrer-Intervention:** (was musste Paul live kompensieren?)
- **Vermuteter Mechanismus:** (warum schwer/unpraezise? Hypothese)
- **Matrix-Kandidat:** A-CODE-IDs und/oder A-PROZ-IDs die adressiert werden
- **F0b-Coverage:** abgedeckt / teilweise / nicht abgedeckt
- **Neue-PI-Kandidat:** ja/nein (+ Kurzbegruendung)
```

## 4. Mapping-Workflow

Pro Erhebungseintrag:

1. **Matrix-Lookup:** Passenden A-CODE/A-PROZ-Eintrag in `PRE_PILOT_TRIAGE_MATRIX_v2.md §6.1/§6.2` identifizieren.
2. **F0b-Coverage-Check:** Ist die entsprechende PQI-1/PQI-2 im F0b-Bundle bereits adressiert? (Cross-Check gegen `docs/architektur/UPGRADE_PLAN_v3-12` §19.2 PI-Items.)
3. **Klassifikation:**
   - **C1 (abgedeckt):** F0b adressiert, aber die Umsetzung greift nicht → Qualitaets-Drift-Audit (bestehender Task #40) oder Nachbesserung.
   - **C2 (teilweise):** F0b adressiert formal, didaktische Tiefe fehlt → Neuer PI-Vorschlag in UPGRADE_PLAN v1.4.
   - **C3 (nicht abgedeckt):** Kein F0b-Bezug → Neuer PI-Vorschlag (meist A-PROZ oder A-CODE ausserhalb der 9/9 PQI-1).
4. **Notation:** Eintrag im Gap-Report mit Klassifikation.

## 5. Gap-Report-Template

**Artefakt:** `docs/projekt/FELD_EVIDENZ_REGISTER.md`

```markdown
# FELD-EVIDENZ-REGISTER

## §1 Erhebungs-Uebersicht

| Erhebungs-Datum | Klasse | Mappe-ID | Beobachtungs-Anzahl |
|---|---|---|---|
| ... | ... | ... | ... |

## §2 Matrix-Mapping

| Beobachtungs-ID | A-CODE/A-PROZ | F0b-Coverage | Klassifikation | Neu-PI |
|---|---|---|---|---|
| ... | ... | ... | C1/C2/C3 | ... |

## §3 Coverage-Gaps (C2 + C3)

### §3.1 Teilabgedeckte (C2)
- ...

### §3.2 Nicht abgedeckte (C3)
- ...

## §4 PI-Vorschlaege fuer UPGRADE_PLAN v1.4

| Neu-PI-ID | Kurztitel | Matrix-Bezug | Dringlichkeit | Cluster |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## §5 F0b-Qualitaets-Drift-Signale

Beobachtungen vom Typ C1 (abgedeckt aber greift nicht) werden an Task #40 F0b.3b Qualitaets-Drift-Audit uebergeben.

## §6 Empfehlung

- Pilot-Re-Gating-Kriterien: ...
- Neue PI-Items in UPGRADE_PLAN §20.2 ergaenzen: ...
```

## 6. Scope (Minimum fuer F0f)

- **Mindestens 3 Mappen** aus aktueller Unterrichts-Praxis auswerten (z.B. Nationalismus-Kolonialismus, Industrialisierung, Absolutismus).
- **Mindestens 8 Beobachtungen** insgesamt (fokussiert auf Schwere/Didaktisierung, nicht Technik-Bugs).
- **Coverage-Check gegen alle 21 A-CODE + 6 A-PROZ.**

## 7. Ablaufplan (0.5 Arbeitstag)

| Block | Dauer | Schritt |
|---|---|---|
| P1 | 20 min | Erhebungsbogen instantiieren fuer 3 letzte Unterrichts-Einsaetze |
| P2 | 45 min | Beobachtungen retrospektiv erfassen (Paul: Notizen + Gedaechtnisprotokoll) |
| P3 | 60 min | Matrix-Mapping (Cowork-PM: pro Beobachtung Matrix-Lookup + Klassifikation) |
| P4 | 45 min | Gap-Report schreiben, PI-Vorschlaege formulieren |
| P5 | 20 min | UPGRADE_PLAN §20.2 PI-FELDEVIDENZ-1 mit Inhalt fuellen |
| P6 | 10 min | STATUS + CHANGELOG Update + TaskUpdate |

## 8. Deliverables

- `docs/projekt/testrun-feld-evidenz/ERHEBUNG_<datum>_<klasse>.md` — mind. 1 Erhebungsbogen pro ausgewerteter Mappe
- `docs/projekt/FELD_EVIDENZ_REGISTER.md` — Gap-Report (SSOT)
- PI-Vorschlaege in UPGRADE_PLAN §20.2 integriert
- Task #47 → completed

## 9. Abgrenzung

- **Nicht Teil von F0f:** Neue UE-Generierung, Didaktisierungs-Algorithmik-Aenderung, Rubrik-Aenderung. F0f ist reine Erhebung + Mapping.
- **Uebergabe an:** F0d (wenn PI-Cluster Dispatch-relevant) + F0b.3b (Qualitaets-Drift) + UPGRADE_PLAN §20.

## 10. Pilot-Re-Gating

Feld-Evidenz-Gap-Report ist **Pflicht-Input** fuer die Pilot-Entscheidung (Task #39 F0b.3). Pilot-Start ist erst wieder zulaessig, wenn:

- alle C3-Gaps entweder geschlossen oder explizit als **pilot-unkritisch** markiert sind,
- alle C2-Gaps entweder gefixt oder im Pilot als kontrolliert zu beobachten deklariert sind,
- F0d PASS/FAIL entschieden ist (entkoppelt, parallel, aber PM-seitig bekannt).

---

**Status:** v1.0, 2026-04-20
