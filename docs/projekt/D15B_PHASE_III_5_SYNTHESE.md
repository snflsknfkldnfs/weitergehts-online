# D15b Phase III.5e — Synthese aller Risiko-Audits

**Datum:** 2026-04-05
**Status:** IN_PROGRESS (Synthese geschrieben, Zweitmeinung full-review + STR_MUTATIONS_BESCHLUSS ausstehend)
**Grundlage:** RA1/2/3/4/5/6/7 + Verifikations-Gate 5d + RA7-Nachkalibrierung
**Autoritative RA7-Fassung:** `phase-iii-5/RA7_NACHKALIBRIERUNG.md` (nicht Original-Bericht)

---

## 1. Portfolio-Ueberblick

### 1.1 Aktive Risiko-Auditoren

| RA | Scope | Bericht | Gate-Urteil Einzel |
|---|---|---|---|
| RA1 | Scope-Drift / Vision-Ausrichtung | 492 Z, 9 Findings | GELB |
| RA2 | Dependencies / Build-Graph | 533 Z, 7 Findings | GELB (nach F-RA2-03 Downgrade) |
| RA3 | Code-Kopplung / Coupling | 636 Z, 11 Findings | GELB |
| RA4 | Pipeline / Atomaritaet | 818 Z, 12 Findings (1 P0) | GELB (ATOM-UNIT-Framework Pflicht) |
| RA5 | Meta / Konvergenz | 384 Z, 6 Meta-Findings | KOORDINIERT |
| RA6 | Kontext / Zielgruppe | 452 Z, 8 Findings | GELB |
| RA7 | Datenschutz (nachkalibriert) | 876 Z Original, Nachkalibrierung separat | **GELB mit Auflagen** |

### 1.2 Severitaets-Bilanz nach Nachkalibrierung

| Severitaet | RA1 | RA2 | RA3 | RA4 | RA5 | RA6 | RA7* | Gesamt |
|---|---|---|---|---|---|---|---|---|
| P0 CRITICAL | 0 | 0 | 0 | 1 | 0 | 0 | **0** | **1** |
| P1 HIGH | 3 | 2 | 4 | 4 | 2 | 3 | 5 | 23 |
| P2 MEDIUM | 4 | 3 | 4 | 5 | 3 | 3 | 3 | 25 |
| P3 LOW | 2 | 2 | 3 | 2 | 1 | 2 | 2 | 14 |
| **Summe** | 9 | 7 | 11 | 12 | 6 | 8 | 10 | **63** |

\* RA7 nach Nachkalibrierung (von 13 Original auf 10 substantielle Findings reduziert).

**Portfoliowide P0: 1** (nur F-RA4-02 Aufgabentyp-Renderer Lock-in). Alle ehemaligen RA7 P0 sind in P1/P2 verschoben durch iPad-Nutzungsvereinbarung.

## 2. Konvergenz-Matrix Top-8 (aktualisiert)

Erweiterung der 5d Top-6 um 2 neue Datenschutz-Cluster aus RA7:

| # | Cluster | Betroffene RAs | Verdikt |
|---|---|---|---|
| 1 | STR-04 Aufgabentypologie / ATOM-Risiko | RA1, RA3, RA4 | ACCEPT+PATCH (V4 ATOM-Framework) |
| 2 | STR-05 Session-Split ORCHESTRATOR | RA1, RA4, RA6 | MODIFY-SCOPE (V1 BLOCKING Vertrags-Patch) |
| 3 | STR-12 Trigger-Warnungen Sichtbarkeit | RA3, RA6, **RA7** | ACCEPT+PATCH+SICHERHEITS-REVIEW (K2 Katalog + technischer Sichtbarkeits-Enforcement) |
| 4 | STR-03 Feedback-Schema `{typ,text,ebene}` | RA1, RA3, RA4 | ACCEPT+BLOCKING-PATCH (V2 Vertrag + E2 Legacy-Fallback) |
| 5 | STR-08 Quellenkritik / Bloom-Progression | RA1, RA4, RA6 | ACCEPT+PATCH (V3 Bloom-Validation) |
| 6 | STR-11 neue Aufgabentypen | RA3, RA4 | ACCEPT+BLOCKING-PATCH (E1 Renderer BLOCKING) |
| 7 | **STR-13 Reflexions-Zone Freitext** (NEU durch RA7) | RA6, **RA7** | ACCEPT+DESIGN-CHANGE (ohne Persistenz ODER In-App-Notice) |
| 8 | **Drittanbieter-Requests** (NEU durch RA7) | **RA7** | ACCEPT+BLOCKING-PATCH (Wikimedia lokalisieren, GitHub AVV pruefen) |

## 3. Konsolidierte BLOCKING-Liste fuer Phase IV Go

### 3.1 Vertrags-Patches (Orchestrator/Engine/Konventionen)
- **V1 ORCHESTRATOR Session-Split** (BLOCKING) — aus 5d
- **V2 Feedback-Schema `{typ,text,ebene}`** (BLOCKING) — aus 5d
- **V3 Bloom-Validation** (NICHT BLOCKING, Soft-Gate) — aus 5d
- **V4 ATOM-UNIT Framework** (BLOCKING fuer Multi-STR-Commits) — aus 5d

### 3.2 Katalog-Patches
- **K1 STR-01 Rollen-Definition** P0 Katalog-Luecke (BLOCKING) — aus 5d
- **K2 STR-12 Trigger-Sichtbarkeit technisch erzwingen** (BLOCKING) — aus 5d + RA7
- **K3 Drift-Check gegen Vision-Dokument** (Soft-Gate) — aus 5d

### 3.3 Engine-Patches
- **E1 Aufgabentyp-Renderer Generalisierung** (BLOCKING) — F-RA4-02 P0
- **E2 Legacy-Feedback-Fallback** (BLOCKING) — aus 5d
- **E3 Cache-Busting-Automation** (Soft-Gate)
- **E4-E6** Engine-Refactors (NICHT BLOCKING)

### 3.4 Datenschutz-Patches (neu, reduziert auf 3 Punkte)
- **D1 Wikimedia-Bilder lokal ins Repo ziehen** (BLOCKING) — Schrems-II + IP-Disclosure
- **D2 STR-13 ohne Persistenz ODER In-App-Notice** (BLOCKING) — Freitext-Risiko Local Cache
- **D3 datenschutz.html Minimal-Erklaerung** (SOFT-GATE, 2 Wochen nach Live) — Art. 13 Doku

### 3.5 Dokumentations-Patches
- **DOK1 Evaluations-Transkripte Personenbezugs-Pruefung** (BLOCKING falls Personenbezug)
- **DOK2 GitHub AVV Schultraeger-Klaerung** (dokumentations-pflichtig, nicht BLOCKING)

## 4. Phase-IV Gate-Matrix (8 Gates, aktualisiert)

| Gate | Titel | BLOCKING? | Aus |
|---|---|---|---|
| G-1 | Vertrags-Patches V1+V2+V4 merged | JA | 5d |
| G-2 | Katalog-Patch K1 STR-01 Rollen | JA | 5d |
| G-3 | Engine-Patch E1 Renderer-Generalisierung | JA | 5d |
| G-4 | Engine-Patch E2 Legacy-Fallback | JA | 5d |
| G-5 | Katalog-Patch K2 STR-12 Sichtbarkeit | JA | 5d + RA7 |
| G-6 | ATOM-UNIT Pre-Commit-Gate aktiv | JA | 5d |
| G-7 | **Datenschutz-BLOCKING D1+D2** (reduziert) | JA | RA7 Nachkalibrierung |
| G-8 | Evaluations-Transkripte gepruefte Fassung | JA (falls Personenbezug) | RA7 |

**Startbedingung Phase IV:** Alle 8 Gates grün + Dokumentations-Pflichten (DOK2, D3) gestartet.

## 5. STR-Verdikte — Vorschau auf STR_MUTATIONS_BESCHLUSS

20 aktive STR (nach 5d-Entscheidung: keine Streichungen):

| STR | Kurzform | Verdikt 5e-Vorschlag |
|---|---|---|
| STR-01 | Rollen-System | ACCEPT + K1 Katalog-Patch |
| STR-02 | Spuren-Mechanik | ACCEPT |
| STR-03 | Feedback-Schema | ACCEPT + V2/E2 |
| STR-04 | Aufgabentypologie | ACCEPT + V4 ATOM |
| STR-05 | Session-Split | MODIFY-SCOPE + V1 |
| STR-06 | Rueckblende | ACCEPT |
| STR-08 | Quellenkritik | ACCEPT + V3 Bloom |
| STR-09-NEU | Kontextfenster-Gate | ACCEPT |
| STR-11 | neue Aufgabentypen | ACCEPT + E1 BLOCKING |
| STR-12 | Trigger-Warnungen | ACCEPT + K2 BLOCKING (Sichtbarkeit enforcen) |
| STR-13 | Reflexions-Zone | ACCEPT + **D2 Design-Change** (Persistenz-Frage) |
| STR-14-NEU | Paedagogischer Pakt | ACCEPT |
| STR-15 | Kooperations-Modus | ACCEPT |
| STR-17 | Geraete-Rotation | ACCEPT |
| STR-19 | Difficulty-Paths | ACCEPT |
| STR-20 | Meta-Reflexion | ACCEPT |
| STR-21 | Lehrkraft-Dashboard | ACCEPT |
| STR-22 | Export-Funktion | ACCEPT |
| STR-23 | Quellen-Zitation | ACCEPT |
| STR-24 | Mappen-Q-Gate | ACCEPT |
| STR-25 | Auswertungs-Modus | ACCEPT |

Keine Streichungen. 1 MODIFY-SCOPE (STR-05). 1 Design-Change (STR-13). Alle anderen ACCEPT ggf. mit Patch.

## 6. Phase-IV Go/No-Go-Empfehlung

**Empfehlung: BEDINGTES GO.**

**Bedingungen:**
1. Alle 8 Gates G-1 bis G-8 gruen VOR Phase-IV-Start.
2. DOK1 Evaluations-Transkripte gepruefte Fassung (BLOCKING falls Personenbezug gefunden).
3. Soft-Gates D3 (datenschutz.html) + DOK2 (GitHub AVV) innerhalb 2 Wochen nach Phase-IV-Start parallel bearbeiten.
4. Erster Phase-IV-Commit MUSS Vertrags-Patches V1+V2+V4 + K1 + E1+E2 atomar enthalten (nicht in separaten PRs drueberziehen).

**Begruendung:**
- Portfoliowide nur noch 1 P0 (F-RA4-02) und dieses ist durch E1 BLOCKING-Patch adressiert.
- Datenschutz-Risiko durch User-Faktenkorrektur substanziell entschaerft. Verbleibende 3 D-Patches sind umsetzbar innerhalb Wave 0.
- ATOM-UNIT-Framework verhindert Teil-Merges und damit die Haupt-Gefahr aus RA4.
- STR-Portfolio unveraendert 20, keine Content-Verluste.

## 7. Dissens-Register (Stand 5e)

Aus RA5 Meta + 5d Gate waren 0 ungeloeste Dissense dokumentiert. Nach RA7-Nachkalibrierung:

- **Neuer Dissens:** RA7-Original (ROT, 6 P0) vs. RA7-Nachkalibrierung (GELB, 0 P0). **Aufgeloest** durch User-Faktenkorrektur — Nachkalibrierung ist autoritativ.

## 8. Offene Punkte fuer 5e-Abschluss

1. `comprehensive-review:full-review` als Tool-Zweitmeinung auf die 7 RA-Berichte ausfuehren.
2. `ZWEITMEINUNG_VERGLEICH.md` manuell vs. Tool-Audit.
3. `STR_MUTATIONS_BESCHLUSS.md` mit finalen Verdikten aller 20 STR (siehe Sektion 5 als Vorschlag-Fassung).
4. `UEBERGABE_PHASE_III_5_5e.md` Cold-Session-Wiederaufnahme.
5. State-File + STATUS + CHANGELOG aktualisieren, committen, pushen.

---

**Status Synthese-Dokument:** Fertig. Erwartet Zweitmeinung + finale STR-Beschluss-Datei vor 5e-Commit.
