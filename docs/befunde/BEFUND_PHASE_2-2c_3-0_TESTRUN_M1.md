# BEFUND: Phase 2.2c Cross-Konsistenz + Phase 3.0 Assembly — Testrun Mappe 1

**Datum:** 2026-04-09
**Session:** 28
**Scope:** Phase 2.2c Aufgaben-Cross-Konsistenz + Phase 3.0 Assembly (Game 1, Mappe 1)
**Pruefgrundlage:** VERTRAG_PHASE_2-2c_CROSS.md (10 Kriterien), VERTRAG_PHASE_3_ASSEMBLY.md (V1-V12)
**Gesamturteil:** PASS (0H / 2M / 1L)

---

## 1. Phase 2.2c — Aufgaben-Cross-Konsistenz

### Prozesstreue

Agent hat alle 10 Kriterien aus VERTRAG_PHASE_2-2c_CROSS.md systematisch abgearbeitet. Q-GATE-LOG dokumentiert jedes Kriterium mit Ergebnis und Begruendung. Keine Kriterien uebersprungen, keine erfunden.

### Ergebnisse (10/10 PASS)

| Kriterium | Gegenstand | Ergebnis |
|---|---|---|
| A1 | AFB-Kongruenz ueber alle 7 Aufgaben | PASS — AFB I(x2), II(x3), III(x2), monoton steigend |
| A3 | Material-Referenz-Konsistenz | PASS — alle mat-IDs existieren, keine Waisen |
| A5 | Aufgabentyp-Diversitaet | PASS — 6 verschiedene Typen bei 7 Aufgaben |
| A8 | Bloom-Progression | PASS — L1→L2→L3→L3→L3→L5→L6, kein Rueckfall |
| A9 | Bloom-Verteilung A19 | PASS — L1-2: 29%, L3-4: 43%, L5-6: 29% |
| A10 | TB-Knoten-Abdeckung | PASS — 7/7 Knoten durch Aufgaben adressiert |
| A12 | Freischalt-Code konsistent | PASS — GRABEN in data.json + sicherung.json |
| A16 | Tipp-Schema-Konsistenz | PASS — alle 21 Tipps (7x3) Schema-konform |
| A17 | Feedback-Schema-Konsistenz | PASS — alle Feedback-Eintraege {typ, text, ebene} |
| A18 | Keine Duplikat-Aufgaben | PASS — keine inhaltlichen Ueberschneidungen |

### Bewertung

Sauberer Durchlauf. Keine Findings. Prozess ist vertragskonform und effizient.

---

## 2. Phase 3.0 — Assembly

### Prozesstreue

Agent hat alle Produktionsartefakte (5 Materialien, 7 Aufgaben, Hefteintrag, Sicherung, Tafelbild) zu einem validen data.json assembliert. V1-V12 Validierungskriterien dokumentiert im Q-GATE-LOG. HTML-Templates (index.html, lehrkraft.html, mappe-1.html) generiert. Bild-Download von Wikimedia durchgefuehrt (img-1-1.jpg, 122 KB, Public Domain).

### Validierung V1-V12

| Kriterium | Gegenstand | Ergebnis |
|---|---|---|
| V1 | JSON-Syntax | PASS — 45.239 Bytes, valides JSON |
| V2 | Mappe-Struktur | PASS — 1 Mappe, Pflichtfelder vollstaendig |
| V3 | Materialien-Integritaet | PASS — 5/5 Materialien, IDs korrekt |
| V4 | Aufgaben-Integritaet | PASS — 7/7 Aufgaben, Schema-konform |
| V5 | Hefteintrag-Integritaet | PASS — knoten, verbindungen, stundenfrage |
| V6 | Sicherung-Integritaet | PASS — hefteintrag, reflexionsimpuls, zusammenfassung, ueberleitung |
| V7 | Tafelbild-Rendering | PASS — TB-Referenzen konsistent |
| V8 | Aufgaben-Material-Referenzen | PASS — alle mat-IDs aufloesbar |
| V9 | Freischalt-Code | PASS — GRABEN |
| V10 | HTML-Templates | PASS — 3 Dateien generiert |
| V11 | Mappenuebergang | N/A — erste Mappe |
| V12 | Bild-Assets | PASS — img-1-1.jpg vorhanden, Public Domain |

### Findings

**M1 — sicherung.zitat fehlt in data.json (Contract Omission)**

- **Schweregrad:** MEDIUM
- **Befund:** Produktions-Artefakt `sicherung.json` enthaelt ein `zitat`-Objekt: `{text: "Wir fielen wie Kaninchen im Gewehrfeuer.", urheber: "Britischer Infanterist, Schlacht an der Somme 1916 [sinngemäß]"}`. Dieses Feld wurde bei der Assembly NICHT in `data.json → mappe.sicherung` uebernommen.
- **Root Cause:** VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 (Zeilen 131-138) definiert das sicherung-Template mit 5 Feldern: hefteintrag, hefteintrag_verweis, reflexionsimpuls, zusammenfassung, ueberleitung. Das Feld `zitat` ist im Template nicht vorgesehen. Der Agent hat vertragskonform gehandelt — das ist eine Vertrags-Luecke, kein Agenten-Fehler.
- **Impact:** Engine rendert kein Abschluss-Zitat. Didaktischer Qualitaetsverlust: Zitat wuerde als affektiver Anker die Sicherungsphase abrunden.
- **Empfohlener Patch:** VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 um `zitat: {text, urheber}` erweitern (optional, da nicht jede Mappe ein Zitat hat). Engine-Renderer muss zitat-Feld ebenfalls unterstuetzen (P1-Scope, Code-Strang).

**M2 — merksaetze[]-Referenz in Vertraegen inkonsistent mit tatsaechlichem Schema**

- **Schweregrad:** MEDIUM
- **Befund:** Mehrere Vertraege (VERTRAG_PHASE_2-2a, VERTRAG_PHASE_2-2c_CROSS, WORKFLOW_v4) referenzieren `hefteintrag.merksaetze[]` als Top-Level-Array. Das tatsaechliche Schema verwendet `knoten[].merksatz` — Merksaetze sind in die jeweiligen Tafelbild-Knoten eingebettet. Die Engine (escape-engine.js Zeile 1217-1218) liest korrekt aus `knoten[].merksatz`.
- **Root Cause:** Dokumentations-Drift. Vertraege wurden zu einem Zeitpunkt geschrieben, als das Schema noch nicht finalisiert war, und nicht nachgezogen.
- **Impact:** Kein funktionaler Impact (Engine arbeitet korrekt). Risiko: Kuenftige Agenten koennten ein Top-Level `merksaetze[]`-Array erzeugen, das die Engine ignoriert.
- **Empfohlener Patch:** In VERTRAG_PHASE_2-2a, VERTRAG_PHASE_2-2c_CROSS und WORKFLOW_v4 die Referenz `merksaetze[]` durch `knoten[].merksatz` ersetzen. Niedrige Dringlichkeit — bei naechstem Vertrags-Review mitkorrigieren.

**L1 — Assembly-Vertrag nicht im vertraege/-Verzeichnis**

- **Schweregrad:** LOW
- **Befund:** VERTRAG_PHASE_3_ASSEMBLY.md liegt unter `agents/` statt unter `architektur/vertraege/` wie alle anderen Vertraege.
- **Impact:** Kosmetisch. Kein funktionaler Effekt, aber Konsistenz-Verletzung.
- **Empfohlener Patch:** Verschieben nach `architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` und Referenzen aktualisieren.

---

## 3. Gesamtbewertung

| Dimension | Phase 2.2c | Phase 3.0 |
|---|---|---|
| Prozesstreue | Vollstaendig | Vollstaendig |
| Vertragskonformitaet | 10/10 | V1-V12 PASS |
| Findings | 0 | 2M + 1L |
| Gesamturteil | PASS | PASS mit Findings |

**Mappe 1 ist produktionsreif.** Die 2 Medium-Findings betreffen Infrastruktur-Luecken (Vertrags-Template, Dokumentations-Drift), nicht die Qualitaet der produzierten Artefakte. Patches sollten vor Mappe 2 eingespielt werden.

---

## 4. Empfohlene Patches (Priorisiert)

| # | Patch | Ziel-Datei | Dringlichkeit |
|---|---|---|---|
| P1 | zitat-Feld in Assembly-Template ergaenzen | VERTRAG_PHASE_3_ASSEMBLY.md §3.2.3 | Vor Mappe 2 |
| P2 | merksaetze[]→knoten[].merksatz in 3 Vertraegen | VERTRAG_2-2a, 2-2c, WORKFLOW_v4 | Naechster Vertrags-Review |
| P3 | Assembly-Vertrag in vertraege/ verschieben | agents/→architektur/vertraege/ | Naechster Vertrags-Review |
| P4 | Engine: zitat-Rendering in Sicherungsphase | escape-engine.js | P1-Scope Code-Strang |
