---
status: FINAL
datum: 2026-04-23
scope: Workflow-Scan Mappen-Narrativ / Ueberleitungs-Ebene
ziel: Paul-Direktive F-A1 Enforceability-Pruefung
autor: Explore-Agent (Auftrag Cowork)
---

# F0e F-A5 — Mappen-Narrativ-Luecken-Check

## 1. Befund — Existiert eine dedizierte Mappen-Narrativ-Phase?

**JA, mit kleiner struktureller Verfeinerungs-Option.**

Die Phase 2.1c (`Material-Cross-Konsistenz + Ueberleitung-Produktion + Hefteintrag-Revision`, WORKFLOW_v4.md ll. 577-620 und VERTRAG_PHASE_2-1c_CROSS.md) existiert **vollstaendig dokumentiert**:

- Produziert Uebergaenge zwischen Materialien auf Mappen-Ebene (Achse 6: "Ueberleitung-Produktion", Q-M2-03).
- Folgt **Zwei-Vektoren-Bruecke-Modell** (rueckwaerts: was gelernt; vorwaerts: warum naechstes Material relevant?).
- Nutzt explizites Schema: `ueberleitungen-schema.json`.
- PFLICHT-Phase nach Material-Isolat-Produktion.

**Einschränkung:** Phase 2.1c ist als **Dispatcher-Verantwortung** verankert, nicht als dedizierter Subagent (AGENT_UEBERLEITUNG existiert nicht). In v4 wurde sie zu eigenstaendiger Phase gehievt, aber ohne Subagent-Rolle.

## 2. Verortungs-Map

| Ebene | Produzent | Phase | Artefakt | Rolle |
|---|---|---|---|---|
| Material (Isolation) | SUB_MATERIAL_* | 2.1 | `materialien/mat-N-*.json` | `ueberleitung_von`: Placeholder (wird ueberschrieben) |
| Material-Sequenz-Design | AGENT_MATERIAL | 1.9-1.10 | MATERIAL_GERUEST + `intentionsskizze` | Designabsicht (`rueckbezug_inhalt_ref`, `vorausblick_frage`) |
| Material-Uebergang (Mappen-Ebene) | Dispatcher in 2.1c | 2.1c Achse 6 | `ueberleitungen.json` | Finale Zwei-Vektoren-Bruecke (20-300 Zeichen) |
| Hefteintrag + Mappe-zu-Mappe | 2.1c Achse 7 | 2.1c | `rahmen/hefteintrag.json` + `rahmen/sicherung.json` | `zusammenfassung`, `ueberleitung` (Mappe-zu-Mappe) |
| Rahmen-Einstieg/Sicherung | AGENT_MATERIAL + 2.0 | 1.6, 2.0 | `rahmen/einstieg.json`, `rahmen/sicherung.json` (Basis) | `problemstellung`, `reflexionsimpuls` (Basis in 2.0, Revision in 2.1c) |

**Kritisches Muster:** Phase 2.1c ist der natuerliche Ort, weil dort alle Materialien + MATERIAL_GERUEST + Hefteintrag gleichzeitig vorliegen.

## 3. Lücken — F-A1 Umsetzungs-Status

F-A1: Material = Prosa-Block; Impulse/Denkanstoesse = separate narrative/didaktische Rahmung ausserhalb der Materialien.

Aktueller Stand:

- ✅ Material-Isolation korrekt — Materialien enthalten keine Uebergangstexte, nur `ueberleitung_von: null` (wird in 2.1c gefuellt).
- ✅ Uebergaenge ausserhalb produziert — Phase 2.1c ist dedizierte Produktionsphase.
- ✅ Schema existiert — `ueberleitungen-schema.json`.
- ✅ Zwei-Vektoren-Modell existiert — UE-1 bis UE-5 Q-Gates dokumentiert.

**Teilluecken:**

1. Keine isolierte Subagenten-Rolle: Phase 2.1c ist Dispatcher-Aufgabe in v4, nicht spezialisierter Agent.

2. Mappe-zu-Mappe-Ebene unterspezifiziert: F-A1 spricht von "Ueberleitungen zwischen Materialien"; Mappe-zu-Mappe-Uebergaenge (Mappe 1 → Mappe 2) werden in 2.1c Achse 7 produziert, aber ohne eigenes Sequenz-Schema (vgl. ueberleitungen-schema.json fuer Materialien).

3. `sequenz_kontext` im Material ist Konsumenten-Format (Subagenten-Eingabe), nicht Produzenten-Format fuer Ueberleitungen.

4. Q-Gate fuer Uebergaenge in Phase 2.1c gebunden — kein separates M-/A-Pendant (UE-1 bis UE-5 sind eingebettet, nicht eigenstaendige Q-Gate-Familie auf gleicher Ebene wie M1-M12).

## 4. Implikationen

**Szenario A (Minimal-Retrofit v4):** Phase 2.1c bleibt wie dokumentiert. Dispatcher fuehrt Uebergaenge aus. Vorteil: schnell, weniger Architektur-Overhead. Nachteil: Uebergaenge implizit, schwer testbar.

**Szenario B (Spezialisierung v3.6+):** AGENT_UEBERLEITUNG wird geplant. Im `UPGRADE_PLAN_v3-2` (Audit M-06) ist Hinweis auf AGENT_DIFFERENZIERUNG-Kontext (Phase 2.3) bereits vermerkt. Uebergaenge implizit Teil didaktischer Rahmung.

**Bewertung:** AGENT_UEBERLEITUNG NICHT zwingend. SOLLTE geplant werden, wenn Mappe-zu-Mappe-Narrative spezialisierte Heuristik brauchen, typ-spezifische Qualitaet erforderlich ist, oder Fehlerrate bei Uebergaengen steigt.

## 5. Empfehlung — Scope fuer separaten Upgrade-Plan-Task

| Task | Scope | Owner | Sprint |
|---|---|---|---|
| F0e-PI (aktuell) | Phase 2.1c Uebergaenge: Tester-Dokumentation + F0e-Test-Szenarien fuer UE-1 bis UE-5 | Cowork | 2026-05-15 |
| v4.1-v4.2 | AGENT_UEBERLEITUNG.md Scoping-Analyse (Phase 2.1c ausreichend oder Sub-Agent noetig?) | Cowork | 2026-06-01 |
| v3.6 (OFFEN) | AGENT_UEBERLEITUNG MVP (optional, falls Mappe-zu-Mappe-Narrativ Spezialisierung braucht) | Cowork | 2026-07-01 |

**F-A1 Compliance-Checklist:**

- [x] Materialien enthalten keine Uebergaenge (Isolation korrekt)
- [x] Uebergaenge werden ausserhalb in dedizierter Phase produziert (2.1c)
- [x] Schema fuer Uebergaenge existiert (ueberleitungen-schema.json)
- [x] Qualitaetskriterien fuer Uebergaenge dokumentiert (UE-1 bis UE-5)
- [ ] Eigenstaendiger Subagent fuer Uebergaenge (OPTIONAL, im Dispatcher enthalten)
- [ ] Mappen-Sequenz-Narrativ auf gleichem Niveau wie Material-Uebergaenge (TEILWEISE, nur in 2.1c Achse 7)

## 6. F0e-Fallstudie-Befund (kritisch!)

Die 4 F0e-Runs enthielten im Material-`inhalt` "Denk nach:"-Bloecke (I1), Meta-Kontextualisierungs-Absaetze (I2-R2), Fragen-Cluster (I2-R3). Das verletzt F-A1 + Phase 2.1c-Architektur (Uebergaenge gehoeren in ueberleitungen.json, nicht in Material-`inhalt`).

**Interpretation:** Das Problem ist NICHT fehlende Ueberleitungs-Phase. Die Phase existiert und ist vollstaendig spezifiziert. Das Problem ist, dass Overlay v1.0 + Subagent-Priming den existierenden Datenfluss ignorieren.

**Konsequenz fuer PI-INHALT-PROSA-ONLY-01 (3.6a):** Von "neue Regel aufstellen" zu "existierenden Datenfluss im Overlay verankern". Overlay v1.1 muss expliziten Verweis auf Phase 2.1c + `ueberleitungen.json`-Ownership enthalten.

## 7. Fazit

Paul-Direktive F-A1 ist **strukturell in v4 bereits erfuellt**. Phase 2.1c + `ueberleitungen-schema.json` + UE-1 bis UE-5 decken die Ueberleitungs-Ebene ab. AGENT_UEBERLEITUNG ist optional (Deferral in v3.6/v4.1+).

**F-A5 ist geklaert:** Kein separater F0e-PI-Item noetig. Enforcement-Luecke liegt im Material-Subagent-Overlay, nicht in der Workflow-Struktur.
