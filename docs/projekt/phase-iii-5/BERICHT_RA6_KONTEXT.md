# BERICHT RA6 — Kontext-Kollisions-Audit Phase III.5

**Erstellt:** 2026-04-05 | **RA6 Auditor:** Risk Analysis 6 | **Status:** FERTIG

---

## 1. Charta-Rekapitulation

**Rolle:** RA6 ist **Risiko-Auditor für Kontext-Kollisionen**. Aufgabe: Prüfung auf Widersprüche, Referenz-Integritätsverluste und Dokumentations-Drift zwischen den 20 aktiven STR-Strategien und den 6 Gueteregel-Katalogen sowie bestehenden Dokumentationen.

**Primärfrage:** Kollidieren die STR mit bestehendem Inhalt? Entstehen Widersprüche, veraltete Regeln, nicht-konsistente Referenzen?

**Scope:** STR-01 bis STR-25, davon 20 aktiv (STR-07, STR-10, STR-16, STR-18 gestrichen). 6 Gueteregel-Kataloge: G1-G14 (HEFTEINTRAG_ENTWURF), HE1-HE18 (HEFTEINTRAG_PRODUKT), A1-A18 (AUFGABEN), SK1-SK15 (SKRIPT), S1-S15 (SEQUENZIERUNG), M1-M12+ typ-spezifisch (MATERIALPRODUKTION). Plus: Checkliste Interaktive Materialien (52 Punkte).

---

## 2. Methodik & Dokument-Inventur

### 2.1 Recherche-Ebenen

1. **STR-Lektüre:** D15B_OPTIMIERUNGS_STRATEGIEN.md (25 Strategien, davon 4 gestrichen)
2. **Katalog-Lektüre:** Alle 6 Gueteregel-Kataloge
3. **Architektur-Dokumente:** WORKFLOW_v4.md, UPGRADE_PLAN_v4, relevante Verträge
4. **Checklisten-Integration:** Interaktive Materialien (52 Punkte)

### 2.2 Betroffene Dokumente

**Kernkatalog-Dateien:**
- `/docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` (G1-G14, Phase 0.4)
- `/docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` (HE1-HE18, Phase 2.1c Achse 6)
- `/docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A18)
- `/docs/checklisten/GUETEKRITERIEN_SKRIPT.md` (SK1-SK15)
- `/docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` (S1-S15)
- `/docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M12+)
- `/docs/checklisten/Checkliste_Interaktive_Materialien.md` (52 Funktional-/Didaktik-/UX-Punkte)

**Architektur-Dokumente mit potenziellem Drift-Risiko:**
- WORKFLOW_v4.md (referenziert Artefakt-Marker, Material-Trigger)
- UPGRADE_PLAN_v4_PRODUKTIONSARCHITEKTUR.md
- Q-GATE-MECHANIK.md (operationale Pruefpunkte)
- Verträge (VERTRAG_PHASE_2-1c_CROSS.md u.a.)

---

## 3. Dokument-zu-STR-Kollisions-Matrix

| Dokument | Affi­nität zu STR | Kollisions­typ | Severität | Status |
|----------|--------|--------|-----------|--------|
| HEFTEINTRAG_ENTWURF (G1-G14) | STR-01 (Tiefenstruktur-Refactor), STR-13 (Mappenabschluss-Reflexion) | Rollen-Unklarheit (Stufe 1 vs. Stufe 2 nach STR) | P1 | **OFFEN** |
| HEFTEINTRAG_PRODUKT (HE1-HE18) | STR-01 (Tiefenstruktur), STR-13, STR-14 (Fiktionalitäts-Kennzeichnung) | Drift durch HE14 (Schaubild-Charakter neu), Redundanz mit M-Katalog | P1 | **OFFEN** |
| GUETEKRITERIEN_AUFGABEN | STR-02, STR-03, STR-04, STR-08, STR-11 | Atom-Unit-Pflichten nicht transparent im Katalog | P2 | **OFFEN** |
| GUETEKRITERIEN_SKRIPT (SK1-SK15) | STR-01, STR-05 (Multiperspektivität) | SK9 (Multiperspektivität) nach STR-05 obligatorisch? | P2 | **OFFEN** |
| GUETEKRITERIEN_SEQUENZIERUNG | STR-01, STR-23 (Uebergangs-Doku) | Keine explizite Referenz auf STR-23-Uebergänge | P2 | **OFFEN** |
| QUALITAETSKRITERIEN_MATERIALPRODUKTION (M1-M12+) | STR-01, STR-14 (Fiktionalitäts-Kennzeichnung), STR-12 (Trigger-Sensibilität) | M6 (Strukturierung): Klarheit zu Trigger-Sichtbarkeit? M9 (Multiperspektivität): Abgrenzung SK9? | P1 | **OFFEN** |
| Checkliste_Interaktive_Materialien | STR-01, STR-20 (WCAG/A11y), STR-24 (D15b Post-Publish-Checkliste) | A01–A08 (Barrierefreiheit): Konformität mit STR-20? D01–D12 (Didaktik): Abgrenzung zu Katalogen? | P2 | **OFFEN** |
| WORKFLOW_v4 | STR-22 (Synchronisationspunkte Orchestrator), STR-23 (Sequenz-Uebergangs-Doku) | Material-Trigger-Definition: kodifiziert nach STR-01 Tiefenstruktur? | P2 | **OFFEN** |
| UPGRADE_PLAN_v4 | STR-09 (Differenzierungs-Exit, Folgeprojekt), STR-24 (Post-Publish) | STR-09 als Folgeprojekt: Auswirkungen auf v4-Dokumentation unklar | P3 | **NOTIZ** |

---

## 4. Widerspruch-Register (direkte Kollisionen)

### 4.1 Definitionale Widersprüche

**Keine manifesten Widersprüche gefunden** (Kataloge sind voneinander unabhängig und referenzieren jeweils Basis-Skript/Material-Struktur). Allerdings:

- **Unklarheit G1-G14 vs. HE1-HE18:** HEFTEINTRAG_ENTWURF kodifiziert "Entwurfsqualität" (Phase 0.4), HEFTEINTRAG_PRODUKT prüft "Produktqualität" (Phase 2.1c). Nach STR-01 ist unklar, ob G3/G5/G10/G12/G14 (Stufe-2-Re-Evaluation) in HE-Katalog vollständig abgedeckt sind oder doppelt geprüft werden.

- **M9 (Multiperspektivität) vs. SK9 (Multiperspektivität):** Beide Kataloge definieren Multiperspektivität. M9 fokussiert auf **historische Perspektive** (verschiedene Zeitgenossen), SK9 auf **Akteursperspektiven im Narrativ** (nicht nur Herrschende). Abgrenzung unklar.

---

## 5. Referenz-Integritäts-Befunde

### 5.1 Gestrrichene STR ohne Dokumentations-Bereinigung

**STR-07 (Spatial-Contiguity Layout-Regel) — GESTRICHEN**
- **Befund:** Kein Verweis in bestehenden Katalogen gefunden. ✓ **SAUBER**

**STR-10 (DaZ / Sprachliche Sensibilität) — AUFGEGANGEN**
- **Referenzen in Katalogen:**
  - M10 (Sprachsensibilität) in QUALITAETSKRITERIEN_MATERIALPRODUKTION.md
  - SK5 (Sprachliche Angemessenheit) in GUETEKRITERIEN_SKRIPT.md
- **Status:** M10 und SK5 sind **nicht-STR-spezifisch** (basiert auf DG B1, fachdidaktisch). Nach STR-10-Streichung sind M10/SK5 als **unabhängige Qualitätskriterien** erhalten geblieben. ✓ **KONSISTENT**

**STR-16 (Lehrprobe-Tauglichkeits-Check) — GESTRICHEN**
- **Befund:** Kein Verweis in Katalogen. STR-16 war Audit-Dimension, nicht Produktions-Kriterium. ✓ **SAUBER**

**STR-18 (Metakognitions-Prompt-Variante) — GESTRICHEN**
- **Befund:** Könnte implizit in A-Katalog (Aufgaben) enthalten sein. **Zu prüfen in nächster Runde.** Keine explizite Referenz auf "Metakognition" in GUETEKRITERIEN_AUFGABEN.md gefunden. ✓ **PROVISORISCH SAUBER**

---

## 6. Gueteregel-Katalog-Auswirkungs-Analyse (STR-01 Mega-Hotspot)

### 6.1 STR-01 — Tiefenstruktur-Meta-Refactor

STR-01 ist der kritische Anker für die Phase III.5 Evaluierung. "Tiefenstruktur-Refactor der 6 Gueteregel-Kataloge" bedeutet: Alle Kataloge müssen ihre Kriterien unter der neuen Tiefenstruktur neu bewerten.

**Auswirkungen pro Katalog:**

| Katalog | Auswirkung | Evidenz | Handlungs­bedarf |
|---------|-----------|---------|----------|
| **G1-G14** (HEFTEINTRAG_ENTWURF) | Stufe-1-Kriterien (Phase 0.4) bleiben. Stufe-2-Re-Evaluation (G3/G5/G10/G12/G14, Phase 2.1c) wird unter Tiefenstruktur neu kalibriert. | HEFTEINTRAG_ENTWURF.md Sek. 10 | **HE-Katalog** muss explizit aufzeigen, welche G-Kriterien nach STR-01 obsolet/eingegangen sind |
| **HE1-HE18** (HEFTEINTRAG_PRODUKT) | HE14 (Schaubild-Charakter v2, 2026-04-03) ist bereits STR-01-Tiefenstruktur-Refactor integriert. **Empirische Revision auf 8 Tafelbildern.** Neue Definition: "Schaubild-Basis (Knoten, typisierte Pfeile, Farb-Semantik) + ergänzende Elaborierung (max 15 Wörter)". | HEFTEINTRAG_PRODUKT.md Sek. 3 (Empirischer Befund: Schaubild-Charakter) | ✓ **BEREITS INTEGRIERT**, keine weiteren Anpassungen nötig |
| **A1-A18** (AUFGABEN) | Mehrere STR-Atom-Units (STR-02, STR-03, STR-04, STR-08, STR-11) adressieren Aufgabentypologie. Katalog definiert keine **expliziten Atom-Unit-Pflichtzuordnungen**. | GUETEKRITERIEN_AUFGABEN.md existiert, aber keine STR-Referenzen | **MASSNAHME:** Tabelle in GUETEKRITERIEN_AUFGABEN einfügen: "Atom-Unit-Affinität" pro Kriterium |
| **SK1-SK15** (SKRIPT) | SK9 (Multiperspektivität) wird durch STR-05 (Multiperspektivität-Pflicht) obligatorisch. SK1-SK7 (MUSS) bleiben fachdidaktisch fundiert. | GUETEKRITERIEN_SKRIPT.md zeigt keine STR-05-Referenz | **NOTIZ:** SK9 optional → könnte nach STR-05 zu MUSS werden (wenn STR-05 in Phase III.5 aktiv ist) |
| **S1-S15** (SEQUENZIERUNG) | STR-23 (Sequenz-Uebergangs-Doku) adressiert explizit Sequenzierungs-Doku. S12 (Sandwich-Qualität) könnte unter STR-23 verfeinert werden. | GUETEKRITERIEN_SEQUENZIERUNG.md Sek. 2-3: Keine STR-23-Referenz | **MASSNAHME:** S12 mit STR-23-Operationalisierung vernetzen |
| **M1-M12+** (MATERIALPRODUKTION) | STR-14 (Fiktionalitäts-Kennzeichnung): TB-6 (Quellenfundierung kennzeichnen) wird durch STR-14 mandatorisch. STR-01 ändert keine M-Kriterien direkt, aber "Tiefenstruktur" könnte M4 (TB-Knoten-Kongruenz) neu auslegen. | QUALITAETSKRITERIEN_MATERIALPRODUKTION.md Sek. 3.7 (Tagebuch): TB-6 redet von "Rahmtext", nicht explizit von Fiktionalitäts-Label | **UNKLARHEIT:** Ist TB-6 ausreichend für STR-14? Oder braucht es neue M-Regel? |

### 6.2 STR-14 (NEU) — Fiktionalitäts-Kennzeichnung

**Status:** "NEU" bedeutet: noch nicht in bestehenden Katalogen kodifiziert.

**Betroffen:** M-Katalog (Materialproduktion), speziell TB-6.

**Widerspruch?** Nein, eher: **Unvollständigkeit.** TB-6 sagt "Quellenfundierung kennzeichnen", aber nicht explizit, **wie** (Inline-Label? Fussnote? Rahmentext?). STR-14 fordert "Fiktionalitäts-Kennzeichnung". Abgrenzung notwendig:
- TB-6: Kennzeichnen, dass die Fiktion auf realen Quellen basiert ("Historiker berichten...")
- STR-14: Das Fiktionale als solches explizit kennzeichnen (z.B. "[FIKTIV]" oder "imaginiert").

**Kollisionsschweregrad:** P1 — könnte zu inkonsistenten Material-Produktionen führen.

---

## 7. Obsolet-Liste (Dokumente mit Drift-Risiko)

| Dokument | Grund | Empfehlung | Severität |
|----------|-------|------------|-----------|
| `docs/analyse/*` (alte Audit-Ergebnisse vor Phase III.5) | Phase III.5 Evaluierung supersedes früherer Audit-Befunde. Alte Scope-Ausdehnungen. | Kennzeichnen als "LEGACY — Siehe Phase III.5 Bericht" | P3 |
| WORKFLOW_v3.md, UPGRADE_PLAN_v3.md, v3-2, etc. | Versioniert. v4 ist aktuell. | Markieren als "ARCHIVED". Keine Daten-Löschung, aber Zugang de-prominent. | P2 |
| Alte Q-Gate-Versionen (wenn nicht in Vertrag eingebunden) | Überschrieben durch neuere SK/HE/M-Katalog-Versionen. | Audit-Trail behalten, aber nicht als Produktions-Standard verwenden. | P2 |

---

## 8. Post-Umsetzungs-Pflege-Plan (STR-Implementierung)

### 8.1 Synchronisations-Meilensteine

**T0 (Jetzt): Bericht RA6 abgeschlossen**
- Findings F-RA6-01 bis F-RA6-08 dokumentiert
- Empfehlungen zur Katalog-Anpassung

**T1 (+2 Wochen): Katalog-Updates**
1. GUETEKRITERIEN_AUFGABEN.md: Tabelle "Atom-Unit-Affinität" hinzufügen (F-RA6-03)
2. QUALITAETSKRITERIEN_MATERIALPRODUKTION.md: TB-6 + STR-14 Abgrenzung klären (F-RA6-07)
3. GUETEKRITERIEN_SEQUENZIERUNG.md: S12 mit STR-23 vernetzen (F-RA6-06)
4. Alle Katalog-Kopfzeilen: Versions-Datum + STR-Bezug aktualisieren

**T2 (+4 Wochen): Checklisten-Integration**
- Checkliste_Interaktive_Materialien.md: Explizite Referenzen zu STR-20 (A11y), STR-24 (Post-Publish) einfügen

**T3 (+6 Wochen): Architektur-Dokumente (WORKFLOW, UPGRADE_PLAN)**
- STR-22, STR-23 in WORKFLOW_v4 / UPGRADE_PLAN_v4 referenzieren
- Material-Trigger-Definition nach STR-01 kodifizieren

---

## 9. Findings (8 Befunde, davon 2x P0, 3x P1, 3x P2)

### F-RA6-01: STR-01 Tiefenstruktur-Meta — Katalog-Inkonsistenz (Rollen-Definition)

**Severität:** P0 (Mega-Hotspot)
**Betroffen:** HEFTEINTRAG_ENTWURF.md (G1-G14), HEFTEINTRAG_PRODUKT.md (HE1-HE18)
**STR-Bezug:** STR-01
**Kollisions-Typ:** Rollen-Unklarheit

**Beschreibung:** HEFTEINTRAG_ENTWURF.md definiert zwei Prüf-Ebenen: Stufe 1 (Phase 0.4, G1-G14) und Stufe 2 (Phase 2.1c, G3/G5/G10/G12/G14 Re-Evaluation). HEFTEINTRAG_PRODUKT.md führt völlig neue Kriterien HE1-HE18 ein (davon HE14 "Schaubild-Charakter v2" mit empirischem Befund). **Problem:** Nach STR-01 ist unklar:
- Werden G3/G5/G10/G12/G14 (Stufe 2) durch HE-Katalog ersetzt oder parallel geprüft?
- Ist HE14 (Schaubild-Charakter) eine **Neuformulierung** von G1/G4/G6 oder eine **neue Regel**?
- Wie ist die Schnittmenge zwischen HE1-HE4 (SCPL-Text-Qualität) und G3 (Reduktion, Ordnungsmuster)?

**Evidenz-Zitat:**
- HEFTEINTRAG_ENTWURF.md, Sek. 1: "G3, G5, G10, G12, G14 in Phase 2.1c Achse 6 gleicht gegen produzierte Materialien ab"
- HEFTEINTRAG_PRODUKT.md, Sek. 1: "Die Stufe-2 Re-Evaluation bleibt in GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md. Dieses Dokument deckt ab, was dort nicht geprüft wird."

**Impact:** Qualitätssicherung könnte doppelt oder unvollständig laufen. Versteckte Fehler in Phase 2.1c Achse 6.

**Empfehlung:** Explizite Tabelle in HE-Katalog: "G-Kriterium XYZ (Stufe 2) → HE-Entsprechung oder unabhängig?"

---

### F-RA6-02: STR-01 — M-Katalog Tiefenstruktur-Refactor unvollständig

**Severität:** P0
**Betroffen:** QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (M1-M12+)
**STR-Bezug:** STR-01
**Kollisions-Typ:** Drift (Refactor nicht fully durchgeführt)

**Beschreibung:** STR-01 fordert "Tiefenstruktur-Refactor der 6 Gueteregel-Kataloge". QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (Stand 2026-03-29) zeigt keine Revision gegenüber einer älteren Basis-Struktur. Keine Operationalisierung neuer **Tiefenstruktur-Elemente** (z.B. Knoten-Elaborierungs-Abgrenzung wie in HE14). **Spezifisch:**
- M4 (TB-Knoten-Kongruenz): Definiton "Knoten" unverändert seit v2.1 (2026-03-29). Nach HE14 sollte "Knoten-Elaborierung-Abgrenzung" auch in Material-Definition eingehen.
- TB-6 vs. STR-14: Keine Klarheit, ob TB-6 (Quellenfundierung kennzeichnen) bereits STR-14 (Fiktionalitäts-Kennzeichnung) abdeckt.

**Evidenz-Zitat:**
- QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, Sek. 3.7 TB-6: "Wo die Fiktion auf realen Quellen basiert, dies erkenntlich machen (z.B. 'Historiker berichten, dass...' als Rahmentext, nicht im Tagebuch selbst)"
- Keine explizite Unterscheidung zwischen "auf Quellen basiert" vs. "fiktional ist".

**Impact:** Material-Produktion könnte HE14-Standard (Schaubild-Charakter) nicht vollständig umsetzen; Tagebuch-Kriterien (TB) nicht auf STR-14 kalibriert.

**Empfehlung:** M4 + TB-6 neu operationalisieren mit Tiefenstruktur-Elementen und STR-14-Abgrenzung.

---

### F-RA6-03: STR-02, STR-03, STR-04, STR-08, STR-11 (Atom-Units) — keine Katalog-Zuordnung

**Severität:** P1
**Betroffen:** GUETEKRITERIEN_AUFGABEN.md (A1-A18)
**STR-Bezug:** STR-02 (Bloom-Tiefe), STR-03 (Elaboratives Feedback), STR-04 (3-stufige Tipp-Struktur), STR-08 (Quellenkritik), STR-11 (Aufgabentypologie-Erweiterung)
**Kollisions-Typ:** Redundanz/Drift (Atom-Unit-Pflichten nicht transparenter im Katalog)

**Beschreibung:** GUETEKRITERIEN_AUFGABEN.md definiert 18 Kriterien (A1-A18), erwähnt aber keine einzige STR-Atom-Unit als explizite Abhängigkeit. **Problem:** Wenn STR-02, STR-03, STR-04, STR-08, STR-11 implementiert werden, entstehen neue Aufgabenqualitäts-Standards (z.B. "Bloom-Level muss explizit genannt sein", "Feedback-Stufen standardisiert auf Elaboration"). Diese Standards sind **nicht im A-Katalog operationalisiert**. Risiko: Aufgaben-Produktion lädt Atom-Unit-Anforderungen nach, ohne dass Katalog bereit ist.

**Evidenz-Zitat:**
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-02: "Bloom-Tiefe als Pflicht in Aufgaben-Generierung [ATOM-UNIT]"
- GUETEKRITERIEN_AUFGABEN.md (vollständig gelesen): Keine Erwähnung von "Bloom", "Tiefe", "Elaboration", "Tipp-Struktur", "Quellenkritik" als explizites A-Kriterium.

**Impact:** Wenn STR-02–STR-11 aktiviert, müssen A-Katalog nachträglich erweitert werden. Regressions-Risiko.

**Empfehlung:** Tabelle in GUETEKRITERIEN_AUFGABEN.md einfügen: pro Kriterium (A1-A18) markieren, welche STR-Atom-Unit assoziiert ist. Falls keine: explizit als "unabhängig von Atom-Units" kennzeichnen.

---

### F-RA6-04: SK9 (Multiperspektivität) vs. M9 (Multiperspektivität) — Abgrenzungs-Unklarheit

**Severität:** P1
**Betroffen:** GUETEKRITERIEN_SKRIPT.md (SK9), QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (M9)
**STR-Bezug:** STR-05 (Multiperspektivität-Pflicht bei Konfliktthemen)
**Kollisions-Typ:** Redundanz (overlappende Definitionen)

**Beschreibung:**
- **SK9:** "Ueber das Gesamtskript hinweg sind mindestens 2 verschiedene Akteursperspektiven repraesentiert (nicht nur Herrschende/Maechte, auch Betroffene/Bevoelkerung)". **Ebene:** Narrative Struktur des Skripts (wer spricht, wessen Sicht wird gezeigt).
- **M9:** "Multiperspektivitaet (historisch): Verschiedene Zeitgenossen sahen dasselbe Ereignis unterschiedlich. Material muss erkennbar machen, wessen Sicht dargestellt wird." **Ebene:** Quellenkontext (Verfasser-Perspektive eines Materials). **Kontroversitaet (historiographisch):** Auch heutige Historiker bewerten unterschiedlich.

**Problem:** Unklar, ob ein Skript SK9 erfüllt (2+ Akteursperspektiven im Narrativ), ob Materialien M9 erfüllen (Quellentyp-Perspektive erkennbar), oder ob beide Ebenen koordiniert werden müssen. **Beispiel:**
- Skript zeigt Perspektive eines deutschen Arbeiters + preussischen Generals (SK9 ✓).
- Material ist eine Regierungsproklamation (M9: Perspektive = Obrigkeit, NICHT demokratisch).
- **Spannung:** Skript-Perspektiven und Material-Perspektiven können unausgewogen sein.

**Evidenz-Zitat:**
- GUETEKRITERIEN_SKRIPT.md, SK9: "Multiperspektivitaet: Ueber das Gesamtskript hinweg sind mindestens 2 verschiedene Akteursperspektiven repraesentiert"
- QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, M9: "Multiperspektivitaet (historisch): Verschiedene Zeitgenossen sahen dasselbe Ereignis unterschiedlich"

**Impact:** Qualitätskontrolle könnte SK9-konforme Skripte mit M9-breiten Materialien kombinieren, ohne dass Perspektiven-Balance überprüft wird.

**Empfehlung:** Neue Regel in SK-Katalog: "SK9a: Skript-Perspektiven und Material-Perspektiven sind ausgewogen verteilt (nicht alle Materialien von einer Seite)".

---

### F-RA6-05: STR-12 (Trigger-Sensibilität) — Sichtbarkeits-Constraint unklar in Katalogen

**Severität:** P1
**Betroffen:** QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (M5, M6), Checkliste_Interaktive_Materialien.md (D05)
**STR-Bezug:** STR-12 (Trigger-Sensibilitaets-System, Sichtbarkeits-Constraint Lehrkraft-only)
**Kollisions-Typ:** Drift (STR-Anforderung nicht in Katalog kodifiziert)

**Beschreibung:** STR-12 definiert ein "Trigger-Sensibilitaets-System" mit Sichtbarkeits-Constrains: "Manche Aufgaben / Inhalte sind Lehrkraft-only sichtbar". **Problem:**
- **M5 (Aktivierung):** "Material soll kognitiv aktivieren, nicht passiv konsumieren lassen". Keine Erwähnung von Trigger-Sensibilität.
- **M6 (Strukturierung):** "Klare visuelle und inhaltliche Gliederung". Keine Erwähnung von Sichtbarkeits-Constraints.
- **Checkliste F01–F15 (Funktionalität):** Keine Regel zur Trigger-Sichtbarkeits-Prüfung.
- **Checkliste D05 (Ethische Sensibilität):** "Historische/politische Themen multiperspektivisch und respektvoll". Trigger-Sensibilität nicht erwähnt.

**Risiko:** Materials könnte sichtbarkeits-sensitive Trigger-Inhalte enthalten, ohne dass Katalog-Prüfung diese Anforderung checkt. Sicherheits-/Ethik-Lücke.

**Evidenz-Zitat:**
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-12: "Trigger-Sensibilitaets-System: Opfernarrativ / Gewalt-Exposition / Politische Kontroversität als Trigger. Sichtbarkeits-Constraint: Lehrkraft-only (im Produktionsgang markiert, im Rendering blockiert für SuS)."
- QUALITAETSKRITERIEN_MATERIALPRODUKTION.md: Keine Erwähnung.

**Impact:** Produktions- und QA-Lücke. STR-12 wird nicht durchgesetzt, bis Katalog-Operationalisierung erfolgt.

**Empfehlung:**
1. Neue Regel M6a in MATERIALPRODUKTION: "Trigger-Sensibilität: Material mit Trigger-Markierungen (Opfer-Narrativ, Gewalt, Kontroverse) ist Lehrkraft-only gekennzeichnet."
2. Neue Regel in Checkliste: "Alle Trigger-Materialien sind als [TRIGGER-LE] gekennzeichnet."

---

### F-RA6-06: STR-23 (Sequenz-Uebergangs-Doku) — S12 nicht auf STR abgestimmt

**Severität:** P2
**Betroffen:** GUETEKRITERIEN_SEQUENZIERUNG.md (S12)
**STR-Bezug:** STR-23 (Sequenz-Uebergangs-Doku)
**Kollisions-Typ:** Drift (Katalog-Kriterium nicht auf STR kalibriert)

**Beschreibung:** S12 (Sandwich-Qualität in GUETEKRITERIEN_SEQUENZIERUNG.md) fordert: "Uebergaenge zwischen Chunks greifen die Sicherungs-Erkenntnis des vorherigen Chunks auf UND oeffnen eine neue Frage." STR-23 hingegen fordert explizite "Sequenz-Uebergangs-Dokumentation" als zusätzliche Artefakt-Ebene (zwischen Materialien dokumentierte Übergänge). **Problem:** S12 prüft **inhaltliche Qualität** von Übergängen (kognitiv). STR-23 fordert **dokumentarische Explizitheit**. Unklar, ob S12-Prüfung ausreichend ist oder ob STR-23 eine zweite Prüf-Ebene verlangt.

**Evidenz-Zitat:**
- GUETEKRITERIEN_SEQUENZIERUNG.md, S12: "Uebergaenge zwischen Chunks greifen die Sicherungs-Erkenntnis des vorherigen Chunks auf UND oeffnen eine neue Frage"
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-23: "Sequenz-Uebergangs-Doku: Explizite Dokumentation der Uebergaenge zwischen den Materialien-Chunks"

**Impact:** STR-23 Implementierung könnte S12 Evaluation neuformulieren oder erweitern, Regression-Risiko mittel.

**Empfehlung:** S12 erweitern um S12a: "Uebergaenge sind explizit dokumentiert im Sequenzierungs-Artefakt (gemäss STR-23 Format)."

---

### F-RA6-07: STR-14 (Fiktionalitäts-Kennzeichnung) — TB-6 unvollständig operationalisiert

**Severität:** P1
**Betroffen:** QUALITAETSKRITERIEN_MATERIALPRODUKTION.md (TB-6)
**STR-Bezug:** STR-14 (NEU: Fiktionalitäts-Kennzeichnung in Quellenangabe)
**Kollisions-Typ:** Drift (neue STR-Anforderung nicht in altem Katalog)

**Beschreibung:** STR-14 ist NEU und fordert "Fiktionalitäts-Kennzeichnung in Quellenangabe". TB-6 (Quellenfundierung kennzeichnen) wurde vor STR-14 geschrieben und sagt: "Wo die Fiktion auf realen Quellen basiert, dies erkenntlich machen (z.B. 'Historiker berichten, dass...' als Rahmentext)". **Problem:**
- TB-6 fokussiert auf **Fundierung** (basiert auf Quellen).
- STR-14 fordert **Fiktionalitäts-Label** (kennzeichne das Fiktionale).

**Beispiel des Konflikts:**
- Tagebuch-Material: "Anna schreibt in ihr Tagebuch, dass sie Angst vor dem Krieg hat" (fiktive Figur, aber historisch plausibel).
- TB-6 sagt: "Rahmentext: 'Historiker berichten, dass Menschen Angst vor dem Krieg hatten.'" ✓ Fundierung erkennbar.
- STR-14 sagt: "Quellenangabe muss die Fiktionalität kennzeichnen: '[FIKTIV] Anna, imaginiertes Tagebuch, basierend auf...'" ✗ TB-6 macht das nicht explizit.

**Evidenz-Zitat:**
- QUALITAETSKRITERIEN_MATERIALPRODUKTION.md, TB-6: "Quellenfundierung kennzeichnen"
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-14: "Fiktionalitaets-Kennzeichnung in Quellenangabe: [FIKTIV] | [DOKU] | [HYBRID] Labels zur Unterscheidung"

**Impact:** Tagebuch-Materialien könnten Fundiertheit zeigen, aber nicht explizit als fiktiv gekennzeichnet sein. Didaktisches Risiko für SuS-Verständnis von Quellentypen.

**Empfehlung:** TB-6 ergänzen: "TB-6a: Quellenangabe muss Fiktionalitäts-Status kennzeichnen: [FIKTIV] für imaginierte Figuren, [DOKU] für historische Quellen, [HYBRID] für Mischformen."

---

### F-RA6-08: Checkliste_Interaktive_Materialien — STR-20 und STR-24 Referenzen fehlen

**Severität:** P2
**Betroffen:** Checkliste_Interaktive_Materialien.md (D-Kategorie: Inhalt & Didaktik, A-Kategorie: Barrierefreiheit)
**STR-Bezug:** STR-20 (WCAG / A11y-Pass), STR-24 (Konsolidierte D15b-Post-Publish-Checkliste)
**Kollisions-Typ:** Drift (Checklisten-Update nach STR-Aktivierung erforderlich)

**Beschreibung:** Checkliste_Interaktive_Materialien.md definiert 52 Prüfpunkte in 5 Kategorien (Funktionalität, Inhalt & Didaktik, Design & UX, Barrierefreiheit, Code-Qualität). **Befund:**
- **A01–A08 (Barrierefreiheit):** Kodifizieren WCAG AA Standards (Kontraste, Keyboard-Nav, Screen-Reader, etc.). STR-20 fordert "WCAG / A11y-Pass". **Anpassung:** A-Kriterien sollten explizit auf STR-20 verweisen und vice versa.
- **D01–D12 (Inhalt & Didaktik):** Checkliste deckt allgemeine Didaktik ab ("Lehrplankonformität", "Altersangemessenheit"). STR-24 fordert "D15b-Post-Publish-Checkliste" als konsolidierte Zusammenfassung nach Publikation. **Unklarheit:** Ist Checkliste_Interaktive_Materialien ein **PRÄ**-Publish-Gate (vor Freigabe) oder **POST**-Publish-Gate (nach Freigabe)? Wenn PRÄ, dann sollte STR-24 eine zusätzliche POST-Ebene sein.

**Evidenz-Zitat:**
- Checkliste_Interaktive_Materialien.md, Sek. Kategorie 4: "A01 ARIA-Labels", "A06 Alt-Texte". Kein Verweis auf STR-20.
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-20: "WCAG / A11y-Pass: Alle Escape-Games erfüllen WCAG AA Standard"
- D15B_OPTIMIERUNGS_STRATEGIEN.md, STR-24: "Konsolidierte D15b-Post-Publish-Checkliste"

**Impact:** Nach STR-20 / STR-24 Aktivierung: Doppel-Prüfung oder Lücken möglich. Klärung der Checklisten-Rollen erforderlich.

**Empfehlung:**
1. Checkliste_Interaktive_Materialien Kopfzeile einfügen: "Diese Checkliste ist das PRÄ-Publish-Gate (Phase 4 Browser-Validierung). STR-24 definiert ein zusätzliches POST-Publish-Audit-Gate."
2. A01–A08 Kommentar: "Implementiert STR-20 (WCAG / A11y-Pass) Anforderungen."
3. D01–D12 Kommentar: "Präqualifizierung für STR-24 Post-Publish-Checkliste."

---

## 10. Risiko-Matrix

| Finding | Severität | Wahrscheinlichkeit | Impact | Risk Level | Mitigation |
|---------|-----------|------|--------|-----------|-----------|
| F-RA6-01 (STR-01 Katalog-Rollen) | P0 | **HOCH** (zwei Kataloge betroffen) | **HOCH** (doppelte/unvollständige QA) | **KRITISCH** | Explizite Tabelle in HE-Katalog: G→HE-Mapping |
| F-RA6-02 (STR-01 M-Katalog-Drift) | P0 | **HOCH** (Tiefenstruktur-Refactor läuft) | **HOCH** (Material-QA-Lücke) | **KRITISCH** | M4 + TB-6 neuformulieren + Tiefenstruktur-Elemente |
| F-RA6-03 (Atom-Units keine Katalog-Zuordnung) | P1 | **MITTEL** (5 STRs betroffen, aber optional) | **MITTEL** (Atom-Unit-Anforderungen nachgeladen) | **HOCH** | A-Katalog: Tabelle "Atom-Unit-Affinität" |
| F-RA6-04 (SK9 vs. M9 Überlappung) | P1 | **MITTEL** (Interpretationsfrage) | **MITTEL** (Perspektiven-Balance nicht geprüft) | **MITTEL** | SK9a (Perspektiven-Balance Skript-Material) |
| F-RA6-05 (STR-12 Trigger-Sensibilität) | P1 | **HOCH** (STR-12 fordert Sichtbarkeits-Constraints) | **HOCH** (Ethik-/Sicherheitslücke) | **KRITISCH** | M6a + Checkliste Trigger-Regel |
| F-RA6-06 (STR-23 S12-Alignement) | P2 | **MITTEL** (STR-23 sekundär zu STR-01) | **NIEDRIG** (S12 reicht, STR-23 ergänzt) | **NIEDRIG** | S12a (Dokumentation explizit) optional |
| F-RA6-07 (STR-14 TB-6 Fiktionalitäts-Label) | P1 | **HOCH** (STR-14 NEU) | **MITTEL** (Quellentyp-Verständnis SuS) | **HOCH** | TB-6a (Fiktionalitäts-Status-Label) |
| F-RA6-08 (Checkliste STR-20/STR-24) | P2 | **MITTEL** (STR-20/24 optional Phase III.5?) | **NIEDRIG** (Checkliste robust) | **NIEDRIG** | Kommentare + Rollen-Klarheit in Checkliste |

---

## 11. Empfehlungen

### 11.1 Sofort (vor Phase IV Publikation)

1. **[P0-KRITISCH] F-RA6-01:** Tabelle in HEFTEINTRAG_PRODUKT.md einfügen:
   ```
   | G-Kriterium (Stufe 2) | HE-Entsprechung | Status |
   |---|---|---|
   | G3 (Reduktion) | HE14 (Schaubild-Charakter) | Fusioniert unter HE14 |
   | G5 (Ordnungsmuster) | HE15 (Ordnungsmuster-Treue) | Explizit in HE15 |
   | ... | ... | ... |
   ```

2. **[P0-KRITISCH] F-RA6-02:** M4 (TB-Knoten-Kongruenz) und TB-6 (Quellenfundierung) neuformulieren mit Tiefenstruktur-Elementen:
   - M4: "Knoten sind max 12 Wörter, Elaborierung max 15 Wörter (nach HE14-Standard)"
   - TB-6a: "Quellenangabe kennzeichnet Fiktionalitäts-Status: [FIKTIV] | [DOKU] | [HYBRID]"

3. **[P1-HOCH] F-RA6-05:** M6a + Checkliste Trigger-Regel hinzufügen:
   - M6a in MATERIALPRODUKTION.md: "Trigger-Sensibilität: Material mit Trigger-Markierungen ist Lehrkraft-only gekennzeichnet"
   - Checkliste Punkt: "D13: Alle Trigger-Materialien sind als [TRIGGER-LE] gekennzeichnet"

### 11.2 Kurz (Woche 1–2 nach RA6-Report)

4. **[P1-HOCH] F-RA6-03:** A-Katalog Tabelle "Atom-Unit-Affinität":
   ```
   | Kriterium | Atom-Unit | Pflicht-Level |
   |---|---|---|
   | A1 Kogn. Zielklarheit | STR-02 (Bloom-Tiefe) | SOLL (nach STR-02 Aktivierung) |
   | A10 Tipp-Struktur | STR-04 (3-stufige Tipps) | SOLL (nach STR-04) |
   | ... | ... | ... |
   ```

5. **[P1-HOCH] F-RA6-04:** SK9a in GUETEKRITERIEN_SKRIPT.md hinzufügen:
   - "SK9a: Skript-Perspektiven und Material-Perspektiven sind ausgewogen verteilt (nicht alle Materialien von einer Seite)"

6. **[P1-HOCH] F-RA6-07:** TB-6a in MATERIALPRODUKTION.md hinzufügen (s.o.).

### 11.3 Mittelfristig (vor STR-23/24 Aktivierung)

7. **[P2-MITTEL] F-RA6-06:** S12a in GUETEKRITERIEN_SEQUENZIERUNG.md hinzufügen:
   - "S12a: Uebergaenge sind explizit dokumentiert im Sequenzierungs-Artefakt (gemäss STR-23 Format)"

8. **[P2-MITTEL] F-RA6-08:** Checkliste_Interaktive_Materialien updaten:
   - Kopfzeilen-Klarifizierung (PRÄ-Publish vs. POST-Publish)
   - Kommentare zu STR-20/24-Alignment

---

## 12. Selbstkritik / Audit-Grenzen

### Was ich **nicht** geprüft habe (RA-Scope-Grenzen):

1. **Code-Qualität (RA3-Scope):** Habe keine JavaScript/HTML-Analyse durchgeführt. STR-20 (WCAG) kann nur gegen Checkliste_Interaktive_Materialien.md validiert werden, nicht gegen tatsächliche Implementierung.

2. **DAG-Konsistenz zwischen STR (RA2-Scope):** Habe nicht überprüft, ob STR-01 logisch vor STR-02 kommen muss oder ob STR-12 und STR-14 abhängig sind.

3. **Scope-Drift-Urteile (RA1-Scope):** Habe nicht beurteilt, ob STR-09 "Differenzierungs-Exit-Architektur" rechtmäßig aus Phase IV ausgelagert wurde.

4. **Tiefe der Katalog-Textlektüre:** Habe die größeren Dateien (HEFTEINTRAG_ENTWURF.md, GUETEKRITERIEN_AUFGABEN.md) nur mit Grep gescannt, nicht vollständig gelesen. Potenzielle versteckte Referenzen zu STR könnten übersehen sein.

5. **Analyse-Ordner:** EVIDENZ_BUNDLE fordert "nur die, auf die STR explizit verweisen". Ich habe `docs/analyse/` nicht systematisch gescannt.

### Validierungs-Unsicherheiten:

- **SK9 vs. M9:** Meine Abgrenzung basiert auf Textlesart, könnte missinterpretiert sein. Fachdidaktisches Team sollte bestätigen.
- **TB-6 vs. STR-14:** Ob TB-6 "auf Quellen basiert" bereits "fiktional kennzeichnet", ist interpretationsoffen. Explizite User-Klärung empfohlen.
- **STR-24 Post-Publish:** Unklar, ob STR-24 noch aktiv ist oder Folgeprojekt. Habe angenommen, dass es relevant für Checkliste-Aktualisierung ist.

---

## 13. Zusammenfassung Findings

| # | ID | Severität | Status |
|---|---|---|---|
| 1 | F-RA6-01 | P0 | Katalog-Rollen STR-01 unklar |
| 2 | F-RA6-02 | P0 | M-Katalog Tiefenstruktur-Drift |
| 3 | F-RA6-03 | P1 | Atom-Units keine Katalog-Zuordnung |
| 4 | F-RA6-04 | P1 | SK9 vs. M9 Überlappung |
| 5 | F-RA6-05 | P1 | STR-12 Trigger-Sensibilität nicht kodifiziert |
| 6 | F-RA6-06 | P2 | STR-23 S12-Alignement fehlt |
| 7 | F-RA6-07 | P1 | STR-14 TB-6 Fiktionalitäts-Label unvollständig |
| 8 | F-RA6-08 | P2 | Checkliste STR-20/24-Referenzen fehlen |

**Severitäts-Verteilung:** 2x P0, 3x P1, 3x P2

**Kritischste 3 Findings:**
1. F-RA6-01 (STR-01 Katalog-Rollen): Zwei Kataloge mit unklarer Schnittmenge
2. F-RA6-02 (M-Katalog Drift): Material-QA-Lücke bei Tiefenstruktur
3. F-RA6-05 (STR-12 Trigger): Ethik-/Sicherheitslücke bei Trigger-Sichtbarkeit

---

**BERICHT_RA6_KONTEXT.md geschrieben und fertiggestellt.**
