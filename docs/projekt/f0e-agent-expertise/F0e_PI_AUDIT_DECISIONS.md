---
datum: 2026-04-23
status: ENTSCHEIDUNGEN_PERSISTIERT
vorgaenger: F0e_PI_AUDIT_REPORT.md
nachfolger: (PI-Revisions-Einarbeitung, §19-Entwurf)
entscheider: Paul
scope: F-A1 bis F-A4 (offene Audit-Fragen) + 7.2 (PI-FACHWORT-ERKLAERUNG-01)
---

# F0e PI-Audit — Entscheidungs-Protokoll

Paul-Entscheidungen zu den vom Audit offen gelassenen Fragen. Dokumentiert, bevor Revisions-Einarbeitung in PI-Items erfolgt.

## 1. Kontext

Audit-Report (`F0e_PI_AUDIT_REPORT.md`, 2026-04-21) schloss mit ACCEPT_WITH_REVISIONS und 4 offenen Folgeprüfungen F-A1 bis F-A4 + Nachfragen zur Revisions-Form von 3.8 (PI-FACHWORT-ERKLAERUNG-01). Pauls Entscheidungen unten präjudizieren die konkrete Revisions-Formulierung.

**Querbezug:** `UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` §v3.6 AGENT_DIFFERENZIERUNG (aufgeschoben hinter v3.8 Material-Qualitaet) definiert Differenzierungs-Layer mit `erklaerungen[]`, `tipps[]`, `ki_prompts`, `aufgabenstellung_daz`. Dieser Layer ist die Ziel-Heimat langfristiger sprachlicher Differenzierung — F0e-PI-Items dürfen diesen Layer nicht duplizieren.

## 2. Entscheidung 7.2 — PI-FACHWORT-ERKLAERUNG-01

**Paul-Direktive:** "Inline-Glossar minimieren/vorentlasten durch präzise Didaktisierung bei Texterstellung. Geplante Differenzierungs-Funktion (v3.6 AGENT_DIFFERENZIERUNG) übernimmt Funktionalität langfristig."

**Konsequenz für PI-FACHWORT-ERKLAERUNG-01:**

- Primärer Mechanismus: **Priming-/Didaktisierungs-Regel** im Subagent-Dispatch (sprachsensible Formulierung statt nachträglicher Glossierung).
- Sekundärer Mechanismus: Minimale Inline-Erklärung (Apposition/Relativsatz) nur wo Didaktisierung nicht trägt (z.B. Eigennamen wie "Herero", "Omaheke").
- Kein eigenständiger Glossar-Block/-Apparat im Material.
- Langfrist-Pfad: `erklaerungen[]` aus v3.6 AGENT_DIFFERENZIERUNG übernimmt ausführliche Wort-Erklärungen. PI-FACHWORT-ERKLAERUNG-01 ist Brücke bis v3.6.

**Revisions-Form:**
```
Titel: PI-SPRACHLICHE_VORENTLASTUNG-01 (umbenannt)
Inhalt: Priming-Regel + Minimal-Inline-Fallback; kein Glossar-Block
Wirkung: reduziert DaZ-Barrieren ohne Materialinflation
Verweis: dediziert gelöst in v3.6 AGENT_DIFFERENZIERUNG (erklaerungen[])
```

**Auflösung Audit-Major "Spannung 3.2 ↔ 3.8":** entschärft, da Priming keine Wort-Aufblähung verursacht.

## 3. Entscheidung F-A1 — Denkanstoß/Impuls-Platzierung

**Paul-Direktive:** "Denkanstoß explizit in Aufgabe UND/ODER in Materialüberleitungen (außerhalb der Materialien, an anderer Stelle im Prozess generiert). Sinn der Mappenstruktur: Materialien als Blöcke/Artefakte, die in narrative/didaktische Rahmung eingebettet werden — wie in einem optimalen Unterrichtsverlauf."

**Konsequenz:** Material-Artefakt = reine Prosa + formale Metadaten. Impulse, Denkanstöße, Leit-Fragen gehören in:
- **Aufgaben-Layer** (quellenkritische_impulse → Aufgaben-Subagent, vgl. F-A3) **und/oder**
- **Überleitungs-Layer** (Material-Einbettungs-Prosa, die Mappen-Narrativ trägt — separater Generierungs-Schritt, nicht Teil des Material-Subagents).

**Konsequenz für PI-Struktur:**

- Bestätigt Split von PI-PHASEN-TRENNUNG-01 in zwei Komponenten:
  1. `PI-INHALT-PROSA-ONLY-01` (Overlay-Regel, P1): Material = nur Prosa, keine Denk-nach-Blöcke, keine Fragestellungen im `inhalt`.
  2. `PI-DATENFLUSS-IMPULSE-AUFGABE-01` (Vertrags-Regel, P2): `_meta.quellenkritische_impulse` dient als Eingabe für Aufgaben-Subagent (vgl. F-A3), nicht als Inhalts-Rendering.

- **Neue Audit-Folge F-A5:** Überleitungs-Layer/Mappen-Narrativ ist im aktuellen WORKFLOW nicht als eigener Subagent-Schritt erkennbar. Prüfung nötig: Existiert ein Phase-Schritt "Mappen-Narrativ/Überleitungen"? Falls nein → Lücke dokumentieren (nicht Teil F0e-PI, sondern separate Upgrade-Plan-Anforderung).

## 4. Entscheidung F-A2 — Trigger-Flag-Normalisierung

**Paul-Direktive:** "So normalisierung, dass maximal funktional in Prozessstruktur."

**Konsequenz:** Trigger-Flag-Enum ist aus Downstream-Konsumenten abzuleiten, nicht frei definiert. Konkret:

- Welche Flags steuern das Überwältigungsverbot-Handling?
- Welche Flags triggern bildunterschriften-/warn-Layer?
- Welche Flags routen Material in sensibilitäts-spezifische Didaktisierungs-Pfade?

**Konsequenz für PI-TRIGGERFLAG-ENUM-01 (3.4):**

- Enum-Katalog wird **erst nach Scan der Downstream-Konsumenten** (Aufgaben-Subagent, Orchestrator-Routing, v3.6 Differenzierungs-Dispatch) finalisiert.
- Normalisierungs-Form: `lower_snake_case`, prozess-funktionale Bezeichner (z.B. `ueberwaeltigungsverbot_sensibel`, `gewalt`, `macht_asymmetrie`, `kolonialisierung`, `rassismus`).
- Keine Duplikate durch Case-Varianten (`Gewalt` vs. `gewalt`) oder Synonyme (`Unterdrueckung` vs. `macht_asymmetrie`) zulassen — Schema-Gate mit `enum` + `uniqueItems: true`.

**Revisions-Form:** PI-TRIGGERFLAG-ENUM-01 bleibt P3 (deferred), aber Implementierungs-Voraussetzung ist Downstream-Konsumenten-Scan. Dieser Scan wird als Voraussetzungs-Task in §19 markiert.

## 5. Entscheidung F-A3 — Impulse-Ownership

**Paul-Direktive:** "Tendenz zu Aufgabe-Subagent. Sollte ggf. noch weiter präzise auf die Implikationen evaluiert werden."

**Konsequenz:** Grundsatz-Entscheidung = Aufgaben-Subagent erzeugt quellenkritische Impulse. Material-Subagent liefert höchstens `_meta.quellenkritische_impulse` als Vorschlag/Hinweis für den Aufgaben-Subagent, aber nicht als final gerenderten Inhalt.

**Implikations-Check (zu evaluieren vor Implementierung):**

(I1) Kennt der Aufgaben-Subagent den Material-Wortlaut vollständig? → Ja, laut `VERTRAG_PHASE_2-2b_AUFGABE.md` erhält er Material-Kontext.

(I2) Wird `_meta.quellenkritische_impulse` als vorgeschlagenes Aufgaben-Raw oder als neutrale Metadaten-Empfehlung betrachtet? → Entscheidung nötig: reine Empfehlung (Aufgaben-Subagent frei, eigene zu formulieren) vs. vorgegebene Pflicht-Impulse (Aufgaben-Subagent muss abdecken). **Vorschlag:** Empfehlung — sichert Qualität ohne Material-Subagent in Aufgaben-Rolle zu drängen.

(I3) Bedeutet die Entscheidung, dass `_meta.quellenkritische_impulse` im Material-Schema schrumpfen kann (2-3 statt 4+)? → Ja. Revision für Schema-Guideline: Richtwert 2-3 Empfehlungs-Impulse, nicht erschöpfende Liste.

(I4) Muss Aufgaben-Subagent auch auf Triggerflags zugreifen? → Ja, für Sensitivitäts-Formulierung. Konsistent mit F-A2-Scan.

(I5) Affektiert die Entscheidung bestehende Aufgaben-Typ-Konformität (SUB_AUFGABE_QUELLENKRITIK mit W-Fragen-Schema)? → Prüfen, ob W-Fragen-Schema mit `_meta.quellenkritische_impulse`-Vorschlägen kompatibel ist oder sie überschreibt.

**Implikations-Check-Output:** `F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md` (Folge-Artefakt, vor §19-Eintragung).

## 6. Entscheidung F-A4 — Cap vs. Fachwort-Erklärung

**Paul-Direktive:** "Fachwort erklären eventuell intelligent durch Umschreibung im Text (Didaktisierung, Qualität des Skripts, sprachsensibles Priming des Subagents beim Dispatch) vorentlasten; dedizierte Differenzierungs-Prozesse/Funktionalitäten (gemäß Skizze in altem Upgrade-Plan) zu gegebener Zeit implementieren."

**Konsequenz:** Spannung zwischen PI-CONTENT-LENGTH-01 (Cap) und PI-FACHWORT-ERKLAERUNG-01 (3.8) ist durch 7.2-Revision (Entscheidung 2 oben) aufgelöst:

- Priming + intelligente Umschreibung + Skript-Qualität bläht Text nicht systematisch auf (vs. separate Glossar-Blöcke).
- Cap 120/150/180 W (aus Audit-Revision 3.2) bleibt tragfähig, weil Erklärungen in Prosa-Umschreibung aufgehen.
- Langfrist-Entlastung durch v3.6 AGENT_DIFFERENZIERUNG sichert, dass DaZ-Funktionalität nicht dauerhaft im Material-Subagent verbleibt.

**Revisions-Form 3.2 (PI-CONTENT-LENGTH-01):** gestaffelter Cap bleibt, ergänzt um explizite Priming-Direktive "intelligente Umschreibung statt Wort-Glossierung" — konsistent mit F-A4.

## 7. Gesamt-Auswirkung auf PI-Items (Revidierte Liste)

Nach Paul-Entscheidungen:

| PI-Item | Status nach Entscheidungen | Revisions-Form |
|---|---|---|
| 3.1 PI-SCHEMA-STRICT-01+D6 | OK (unverändert) | — |
| 3.2 PI-CONTENT-LENGTH-01 | REVISED | gestaffelter Cap 120/150/180 W + Priming "Umschreibung statt Glossar" |
| 3.3 PI-MULTIPERSPEKTIVE-INHALT-01 | STREICHEN | redundant (Audit-Minor) |
| 3.4 PI-TRIGGERFLAG-ENUM-01 | REVISED (deferred) | Voraussetzung = Downstream-Konsumenten-Scan; snake_case-Normalisierung |
| 3.5 PI-ZIELGRUPPE-PROFIL-01 | OK (unverändert) | — |
| 3.6 PI-PHASEN-TRENNUNG-01 | SPLIT + REVISED | → 3.6a PI-INHALT-PROSA-ONLY-01 (Overlay, P1) + 3.6b PI-DATENFLUSS-IMPULSE-AUFGABE-01 (Vertrag, P2); Ownership Aufgaben-Subagent mit Implikations-Check |
| 3.7 PI-QUELLE-SSOT-01 | REVISED | Regex-Scope auf `<p>` + Fußnoten-Verbot |
| 3.8 PI-FACHWORT-ERKLAERUNG-01 | RENAMED + REVISED | → PI-SPRACHLICHE_VORENTLASTUNG-01: Priming-Primär + Minimal-Inline-Fallback + v3.6-Verweis |
| 3.9 PI-NACHWEIS-DRAMATURGIE-01 | OK (unverändert) | — |
| 3.10 PI-META-BEZEICHNUNG-01 | REVISED | Positiv-Beispiel-Bibliothek ergänzen |

**Neue PI-Items (aus Entscheidungen abgeleitet):** keine — alle Paul-Entscheidungen verfeinern bestehende oder splitten 3.6.

**Neue offene Folge F-A5 (aus Entscheidung F-A1):** Überleitungs-Layer/Mappen-Narrativ-Phase im Workflow prüfen; ggf. separater Upgrade-Plan-Task außerhalb F0e-PI-Scope.

## 8. Nächste Schritte

1. **Implikations-Check F-A3** — `F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md` erstellen (I1-I5 durchprüfen).
2. **Downstream-Konsumenten-Scan F-A2** — welche Subagenten/Phasen lesen `trigger_flags`? Enum daraus ableiten.
3. **F-A5-Lücken-Check** — Workflow auf Mappen-Narrativ-Phase prüfen; Befund dokumentieren.
4. **PI-Items finalisieren** — Revidierte Liste in §19-Entwurf überführen.
5. **§19-Eintrag** — `UPGRADE_PLAN_v3-12_ESCAPE_GAME_QUALITAET.md` §19 ergänzen (Generator-Worktree).
6. **Overlay v1.1** — D6-Typ-Hinweis + Paul-Direktiven aus 3.6a/3.8 Priming einarbeiten; Generator-Repo-Sync PI-SCHEMA-STRICT-01-Promotion.

## 9. Sign-Off

Paul — 2026-04-23 (Chat-Entscheidungen qualifiziert persistiert).
