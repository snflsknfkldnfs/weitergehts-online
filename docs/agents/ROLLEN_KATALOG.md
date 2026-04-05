# Rollen-Katalog (STR-01)

**Status:** FINAL (Phase IV Wave 0, K1 BLOCKING Katalog-Patch)
**Herkunft:** D15b STR-01 Optimierung + RA1 Scope-Audit (P0-Katalog-Luecke Rollen-Definition)
**Zweck:** Autoritative Definition aller Rollen im Escape-Game-System mit Rechten, Sichtbarkeiten und Pflichten.

---

## 1. Warum dieser Katalog

RA1 hat in Phase III.5 eine P0-Luecke festgestellt: STR-01 Rollen-System war in D15B_OPTIMIERUNGS_STRATEGIEN.md nur lose beschrieben, ohne formale Definition von Rechten, Sichtbarkeiten und Pflichten. Ohne diese Definition koennen Subagenten (insbesondere SUB_AUFGABE_*) nicht sauber entscheiden, welche Inhalte fuer welche Rolle gerendert werden — insbesondere bei sensiblen Konstrukten wie STR-12 Trigger-Warnungen (Lehrkraft-Metadaten).

Der Katalog schliesst die Luecke, indem er drei Rollen formal definiert.

## 2. Rollen

### R1 — Schuelerin / Schueler (SuS)

**Primaere Zielgruppe des Escape-Games.** Arbeitet an Mappen im Unterricht oder selbstaendig.

**Rechte:**
- Lesen aller Mappen-Inhalte (Hefteintrag, Einstieg, Materialien, Aufgaben, Sicherung).
- Eingabe von Antworten und Freitexten (z.B. STR-13 Reflexions-Zone).
- Lesen von Schueler-Feedback (Schema `{typ, text, ebene}`, wobei `ebene` nicht angezeigt wird).
- Lesen der Quellenangaben und Lizenzhinweise.

**Sichtbarkeiten (was R1 NICHT sieht):**
- Lehrkraft-Metadaten jeder Aufgabe (didaktische Begruendungen, Progressions-Hinweise).
- Trigger-Warnungen (STR-12): Hinweise auf potentiell belastende Inhalte sind ausschliesslich Lehrkraft-Metadaten.
- Bloom-`ebene`-Kennung im Feedback-Schema.
- Loesungen ander Mappen, die noch nicht freigegeben sind.
- Aufgaben-Varianten, die fuer Differenzierung anderer Niveaus bestimmt sind (soweit implementiert via STR-09-NEU).

**Pflichten:** keine formalen Pflichten im technischen Sinn.

### R2 — Lehrkraft (LK)

**Verantwortliche Durchfuehrende und Qualitaets-Hueter.** Nutzt eigene Lehrkraft-Seite (`lehrkraft.html`) plus Dashboard.

**Rechte:**
- Alle Rechte von R1.
- Lesen aller Lehrkraft-Metadaten: Trigger-Warnungen, didaktische Begruendungen, Progressions-Hinweise, Bloom-Ebenen.
- Lesen aller Loesungen vor Freigabe.
- (Geplant ab STR-21) Lesen eines Dashboards mit Mappen-Fortschritt und Lehrkraft-relevanten Entscheidungspunkten.
- (Geplant ab STR-22) Export-Funktion fuer Ergebnisse und Auswertungen.

**Sichtbarkeiten:**
- Volle Sicht auf alle Mappen-Artefakte, inkl. Lehrkraft-Metadaten.
- Zugriff auf Rollen-Kontext ueber separate HTML-Route `lehrkraft.html` ODER via speziell markierten DOM-Abschnitt mit `data-role="lehrkraft"`, der in der Schueler-View NICHT existiert (nicht nur CSS-ausgeblendet — siehe STR-12 Policy).

**Pflichten:**
- Vor dem Einsatz einer Mappe im Unterricht: Lehrkraft-Metadaten lesen, insbesondere Trigger-Warnungen.
- Entscheidung ueber Differenzierungs-Varianten und Kooperations-Modi (sobald STR-15/STR-19 aktiv).
- Nachbereitung: Ergebnisse sichten (STR-25).

### R3 — Autorin / Autor (AUT)

**Erstellt Escape-Game-Inhalte.** Nicht im Deploy-Modell der Live-Seite praesent — R3 ist die Rolle, die **im Produktions-Workflow** (Cowork-Produktionssessions + Claude-Code-Assembly) taetig ist.

**Rechte:**
- Schreiben und Editieren aller docs/-Artefakte und aller Produktions-JSONs.
- Aufruf der Subagenten-Prompts (SUB_AUFGABE_*, SUB_MATERIAL_*).
- Freigabe von Mappen fuer den Live-Deploy (Commit + Push).

**Sichtbarkeiten:**
- Alle Rechte von R2.
- Zusaetzlich: Subagenten-Prompts, Vertraege, Q-Gate-Logs, Audit-Artefakte.

**Pflichten:**
- Einhaltung aller Vertraege (VERTRAG_PHASE_*, VERTRAG_FEEDBACK_SCHEMA, VERTRAG_ATOM_UNITS).
- Einhaltung der Q-Gate-Pflicht vor jedem Commit.
- Einhaltung der File-Ownership-Regeln aus `COWORK_PROJECT_ANLEITUNG.md` und dem projekt-website-v4-2 Skill.
- Keine direkten Aenderungen in Claude-Code-Domaene ohne Uebergabe-Prompt.

## 3. Rollen-Matrix (Rechte im Code)

| Asset-Typ | R1 SuS | R2 LK | R3 AUT |
|---|---|---|---|
| Mappen-Inhalt lesen | J | J | J |
| Mappen-Inhalt schreiben | N | N | J |
| Lehrkraft-Metadaten lesen | **N** | J | J |
| Lehrkraft-Metadaten schreiben | N | N | J |
| Trigger-Warnungen lesen | **N** | J | J |
| Freitext-Eingabe | J | J | J |
| Eigenen Fortschritt speichern (localStorage) | J | J | J |
| Anderer Schueler Fortschritt lesen | **N** | (nur ueber Dashboard aggregiert) | — |
| Loesungen vor Freigabe lesen | **N** | J | J |
| Subagenten-Prompts lesen | **N** | N | J |
| Verträge editieren | N | N | J |
| Commits pushen | N | N | J |

**N** (besonders hervorgehoben) = Technische Sichtbarkeits-Grenze. Diese Felder MUESSEN im Code so implementiert sein, dass R1 die Information nicht im DOM, nicht in JavaScript-Globals und nicht in Network-Responses sieht. CSS-Ausblendung ist NICHT ausreichend.

## 4. Implementierung

### 4.1 Sichtbarkeits-Enforcement

Die harten R1-Ausschluesse werden technisch durch Build-Time-Separation erzwungen:
- Schueler-Mappen-HTML (`escape-games/*/mappe-*.html`) wird aus den Produktions-JSONs ohne Lehrkraft-Metadaten-Felder assemblyiert.
- Lehrkraft-HTML (`lehrkraft.html` plus optionale Zusatz-Seiten) wird aus einer separaten Assembly-Route mit vollstaendigen Daten erzeugt.

Die konkrete Umsetzung fuer STR-12 Trigger-Warnungen ist in `POLICY_TRIGGER_SICHTBARKEIT.md` (K2 Policy) beschrieben.

### 4.2 Rollen-Wechsel

Es existiert **kein Runtime-Rollenwechsel** in der Live-Seite. R1 und R2 greifen auf verschiedene Einstiegs-URLs zu (`/` bzw. `/lehrkraft.html`). Eine Authentifizierung ist nicht implementiert; die Trennung basiert auf der Annahme, dass Schuelerinnen die Lehrkraft-URL nicht ansurfen (soziale Schutzschicht) und — wichtiger — darauf, dass die Schueler-HTML die sensiblen Daten gar nicht erst enthaelt (technische Schutzschicht).

## 5. Beziehungen zu anderen STR

- **STR-09-NEU** Differenzierungs-Exit: Rollen-Katalog enthaelt keine Differenzierungs-Stufen auf Schueler-Ebene. Das ist Aufgabe eines Folgeprojekts.
- **STR-12** Trigger-Warnungen: Implementiert die harte R1-Ausblendung, siehe `POLICY_TRIGGER_SICHTBARKEIT.md`.
- **STR-13** Reflexions-Zone: R1-Eingabe; nach D2-Design-Change ohne Persistenz, kein localStorage-Eintrag.
- **STR-15** Kooperations-Modus: R2 entscheidet ueber Aktivierung.
- **STR-21** Lehrkraft-Dashboard: R2-exklusiv, greift auf aggregierte localStorage-Daten zu (soweit vorhanden).
- **STR-22** Export: R2-exklusiv.
- **STR-25** Auswertungs-Modus: R2-exklusiv.

## 6. Aenderungs-Disziplin

Aenderungen an diesem Katalog sind AU-pflichtig (neue ATOM-UNIT + UPGRADE_PLAN). Keine informellen Rechte-Erweiterungen.

---

**Querverweise:** `VERTRAG_ATOM_UNITS.md`, `POLICY_TRIGGER_SICHTBARKEIT.md`, `D15B_OPTIMIERUNGS_STRATEGIEN.md` (STR-01).
