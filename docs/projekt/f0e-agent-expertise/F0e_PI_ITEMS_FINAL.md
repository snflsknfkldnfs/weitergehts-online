---
status: FINAL
datum: 2026-04-23
scope: Finalisierte PI-Items fuer §19-Integration in UPGRADE_PLAN v3-12
vorgaenger: F0e_PI_AUDIT_INPUT.md, F0e_PI_AUDIT_REPORT.md, F0e_PI_AUDIT_DECISIONS.md, F0e_PI_IMPULSE_OWNERSHIP_IMPL_CHECK.md, F0e_FA2_TRIGGER_FLAGS_KONSUMENTEN_SCAN.md, F0e_FA5_MAPPEN_NARRATIV_LUECKEN_CHECK.md
paradigma: Enforcement-Luecke statt Regel-Luecke (nach F-A2 + F-A5 Befund)
---

# F0e PI-Items FINAL

## Paradigmen-Wechsel (kritisch)

F-A2 + F-A5 zeigen: Die F0e-Fallstudie-Abweichungen sind ueberwiegend **Enforcement-Luecken** zwischen bestehenden authoritative Regeln (Phase 2.1c, ENUM_TRIGGER_FLAGS, SUB_AUFGABE_QUELLENKRITIK W-Fragen) und dem Material-Subagent-Overlay v1.0. Die PI-Items werden dementsprechend neu formuliert:

- Kategorie A — Enforcement-Haertung (Overlay-Verweise auf existierende SSOT): 3.4, 3.6a, 3.7
- Kategorie B — Datenfluss-Kodifikation (Vertrags-Erweiterung bestehender Phasen): 3.6b
- Kategorie C — Neue Regel (noch nicht im System): 3.2, 3.5, 3.8, 3.9, 3.10
- Kategorie D — Streichung: 3.3
- Kategorie E — Bestaetigung bestehender Regel ohne Aenderung: 3.1 (Schema-Strict fuer D6 ist eine Schema-Gate-Erweiterung, aber Schema-Gate existiert bereits im Spike)

## PI-Liste (final)

### 3.1 PI-SCHEMA-STRICT-01 (+D6)

**Kategorie:** A (Enforcement) + E (Schema-Erweiterung fuer D6)
**Prio:** P1
**Status:** OK (Audit) — keine Audit-Revision, F-A2 bestaetigt.

**Inhalt:** Promote Shadow-Schema-Gate (Pinned SHA `632d7b4...`) in Produktions-Chain. Erweitern um D6-Typ-Hinweis (Array-vs-String): `quellenkritische_impulse: Array<string>`, nicht String.

**Mechanismus:**
- Schema-Gate Partial + Full mit Pinned-SHA.
- Typ-Pruefung explizit: `quellenkritische_impulse` → `type: array`, `items.type: string`.

**Aenderungs-Scope:**
- Generator-Repo: Promote `gate-prototype/` nach `tools/schema-gate/`.
- Pinned-Schema-Datei mit SHA-Hash ausliefern.
- Overlay v1.1: D6-Hinweis ergaenzen.

### 3.2 PI-CONTENT-LENGTH-01

**Kategorie:** C (neue Regel)
**Prio:** P1
**Status:** REVISED (Audit Major) — gestaffelt statt Hart-Cap.

**Inhalt:** Wortanzahl-Obergrenze fuer `quellentext.inhalt` auf Jahrgangsstufe 7 MS kalibriert. Gestaffelt:
- Richtwert: 120 Wörter.
- Regel-Cap: 150 Wörter.
- Max-Cap mit Ausnahme-Klausel: 180 Wörter (nur bei dokumentierter Kontextnotwendigkeit, Begruendung in `_meta.rekonstruktions_begruendung`).

**Zusatz-Direktive:** "Intelligente Umschreibung statt Wort-Glossierung" (F-A4-Konsequenz). Fachwoerter durch Apposition/Paraphrase im Prosa-Fluss vorentlasten, nicht durch separate Glossar-Bloecke.

**Mechanismus:**
- Schema-Gate: `_meta.wortanzahl` <= 150 (Warn), <= 180 (Fail).
- Overlay v1.1: Staffel-Cap-Regel + Priming "Umschreibung".

**Aenderungs-Scope:**
- `SUB_MATERIAL_QUELLENTEXT.md`: Staffel-Cap-Regel + Priming-Block.
- Overlay v1.1.

### 3.3 PI-MULTIPERSPEKTIVE-INHALT-01

**Kategorie:** D (Streichung)
**Prio:** —
**Status:** STREICHEN (Audit Minor) — redundant mit MATERIAL-PERSPEKTIV-01 im Overlay.

### 3.4 PI-TRIGGERFLAG-ENUM-01

**Kategorie:** A (Enforcement)
**Prio:** P3 (deferred)
**Status:** REVISED — von "Enum etablieren" zu "ENUM_TRIGGER_FLAGS-Compliance durchsetzen" (F-A2).

**Inhalt:** ENUM_TRIGGER_FLAGS (6 Werte, `lowercase_with_underscores`) existiert bereits in `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` M15 + `POLICY_TRIGGER_SICHTBARKEIT.md` 4.5 + 7× `SUB_MATERIAL_*`. F0e-Runs verletzten ihn systematisch.

**Mechanismus:**
- Schema-Gate: `trigger_flags` → `type: array`, `items.enum: [gewalt, tod, krieg, diskriminierung, trauma, sexualisierte_gewalt]`, `uniqueItems: true`.
- Overlay v1.1: expliziter Verweis auf `ENUM_TRIGGER_FLAGS` + Case-Sensitivity-Hinweis.
- Ausgliederung: `docs/agents/ENUM_TRIGGER_FLAGS.md` als zentrale Konstante (Single Source of Truth).

**Aenderungs-Scope:**
- `docs/agents/ENUM_TRIGGER_FLAGS.md` (neu).
- 7× `SUB_MATERIAL_*.md`: Referenz auf ENUM-Datei statt Hard-Code.
- Schema-Gate-Spezifikation aktualisieren.
- Overlay v1.1.

### 3.5 PI-ZIELGRUPPE-PROFIL-01

**Kategorie:** C (neue Regel)
**Prio:** P2
**Status:** OK (Audit) — keine Revision.

**Inhalt:** Lerngruppen-Profil als Priming-Block im Subagent-Dispatch. Enthaelt: Jahrgangsstufe, Schulart, DaZ-Anteil, Lerngruppen-Heterogenitaet, Sprach-Niveau-Richtwert.

**Mechanismus:**
- Overlay v1.1: Zielgruppen-Profil-Block vor Aufgaben-Teil.
- Dispatcher: Zielgruppen-Profil aus Projekt-Metadaten (projekt.json) ableiten.

**Aenderungs-Scope:**
- Overlay v1.1.
- Dispatcher-Eingabe-Flow erweitern.

### 3.6a PI-INHALT-PROSA-ONLY-01 (Split 3.6)

**Kategorie:** A (Enforcement)
**Prio:** P1
**Status:** SPLIT aus 3.6 (Audit Blocker) — F-A1 + F-A5 bestaetigen Enforcement-Charakter.

**Inhalt:** `quellentext.inhalt` = ausschliesslich Prosa + ggf. Blockzitat. Keine "Denk nach:"-Bloecke, keine Fragestellungen, keine Meta-Kontextualisierungs-Absaetze.

**Mechanismus:**
- Overlay v1.1: explizite Negativ-Liste + Verweis auf Phase 2.1c `ueberleitungen.json` als Eigentuemer fuer Ueberleitungen + Verweis auf Aufgaben-Layer fuer Fragestellungen.
- Schema-Gate (stylistisch, kein harter Fail): Heuristik "Denk nach", "?", "Was ist/Wer/Warum", "Aufgabe:".
- Q-Gate M16 (neu): Pruefung auf Prosa-Only.

**Aenderungs-Scope:**
- Overlay v1.1.
- `SUB_MATERIAL_QUELLENTEXT.md`: Negativ-Liste.
- `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`: M16 Prosa-Only.

### 3.6b PI-DATENFLUSS-IMPULSE-AUFGABE-01 (Split 3.6)

**Kategorie:** B (Datenfluss-Kodifikation)
**Prio:** P2
**Status:** SPLIT aus 3.6. I1-I5-Check: kein Blocker.

**Inhalt:** `_meta.quellenkritische_impulse` dient als Empfehlung fuer Aufgaben-Subagent `SUB_AUFGABE_QUELLENKRITIK`, nicht als Rendered-Inhalt. Richtwert 2-3 Impulse, W-Fragen-artig formuliert, nicht-erschoepfend.

**Mechanismus:**
- `VERTRAG_PHASE_2-2b_AUFGABE.md` Z. 30: Eingabe-Definition "Volltext" = gesamtes Material-JSON inkl. `_meta.trigger_flags` + `_meta.quellenkritische_impulse`.
- `SUB_AUFGABE_QUELLENKRITIK.md`: Auswahl-Heuristik erweitern um Nutzung von `_meta.quellenkritische_impulse` als Vorschlag-Input.
- `SUB_MATERIAL_QUELLENTEXT.md`: `_meta.quellenkritische_impulse`-Spezifikation: "2-3 empfohlene Analyse-Richtungen (W-Fragen-artig, nicht erschoepfend)".
- Aufgaben-Subagent-Trigger-Flag-Priming bei sensitiven Materialien.

**Aenderungs-Scope:**
- 3 Dateien (Vertrag + 2 Subagent-Specs).

### 3.7 PI-QUELLE-SSOT-01

**Kategorie:** A (Enforcement) + C (SSOT-Regel neu)
**Prio:** P1
**Status:** REVISED (Audit Major) — Regex-Scope eingegrenzt.

**Inhalt:** `quellentext.quelle` ist Single Source of Truth fuer Quellenangabe. `quellentext.inhalt` enthaelt keine Quellenangabe-Duplikate, keine kursiven Nachweis-Anhaenge, keine Fussnoten.

**Mechanismus:**
- Overlay v1.1: SSOT-Regel + Negativ-Liste.
- Schema-Gate (Heuristik, auf `<p>`-Elemente beschraenkt, nicht auf `<blockquote>`-Attributionen): Regex `Zitiert nach:|Quelle:|Nachweis:|Wikipedia|Fußnote|<sup>`.
- Q-Gate M17 (neu): Quelle-SSOT-Pruefung.

**Aenderungs-Scope:**
- Overlay v1.1.
- `SUB_MATERIAL_QUELLENTEXT.md`: SSOT-Direktive.
- Schema-Gate: Regex mit Scope-Begrenzung auf `<p>`.
- `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`: M17.

### 3.8 PI-SPRACHLICHE_VORENTLASTUNG-01 (umbenannt, vorher PI-FACHWORT-ERKLAERUNG-01)

**Kategorie:** C (neue Regel)
**Prio:** P2
**Status:** RENAMED + REVISED (Paul-Direktive 7.2) — Priming-Primaer, Minimal-Inline-Fallback.

**Inhalt:** Sprachliche Vorentlastung primaer durch Didaktisierung im Prosa-Fluss (Umschreibung, Apposition, Paraphrase). Inline-Erklaerung nur minimal als Fallback fuer Eigennamen/Termini, die nicht umschreibbar sind. Kein separater Glossar-Block.

**Langfrist-Pfad:** v3.6 AGENT_DIFFERENZIERUNG (`UPGRADE_PLAN_v3-2_INFRASTRUKTUR.md` §v3.6) uebernimmt umfassende Wort-Erklaerungen via `erklaerungen[]`. PI-SPRACHLICHE_VORENTLASTUNG-01 ist Bruecke bis v3.6.

**Mechanismus:**
- Overlay v1.1: Priming-Direktive + Minimal-Inline-Regel + v3.6-Verweis.
- Q-Gate M18 (neu, weich): Priming-Compliance-Check.

**Aenderungs-Scope:**
- Overlay v1.1.
- `SUB_MATERIAL_QUELLENTEXT.md`: Priming-Block.
- `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`: M18.

### 3.9 PI-NACHWEIS-DRAMATURGIE-01

**Kategorie:** C (neue Regel)
**Prio:** P3
**Status:** OK (Audit) — keine Revision.

**Inhalt:** Nachweis-Dramaturgie trennt Quelle (Feld `quelle`) von Einleitung (Feld `inhalt`, Prosa-Voreinfuehrung) und Zitat (blockquote im `inhalt`). Kein "Historiker sehen darin ...", keine Meta-Bewertung in Einleitungs-Prosa.

**Mechanismus:**
- Overlay v1.1: Dramaturgie-Regel.

**Aenderungs-Scope:**
- Overlay v1.1.
- `SUB_MATERIAL_QUELLENTEXT.md`: Dramaturgie-Direktive.

### 3.10 PI-META-BEZEICHNUNG-01

**Kategorie:** C (neue Regel)
**Prio:** P3
**Status:** REVISED (Audit Minor) — Positiv-Beispiel-Bibliothek ergaenzen.

**Inhalt:** `quellentext.titel` traegt didaktische Orientierungsfunktion, keine inhaltsleere Meta-Formulierung. Positiv-Beispiel-Bibliothek (3-5 Beispiele) in der Spezifikation hinterlegen.

**Mechanismus:**
- Overlay v1.1: Titel-Direktive + Positiv-Beispiele.

**Aenderungs-Scope:**
- Overlay v1.1.
- `SUB_MATERIAL_QUELLENTEXT.md`: Titel-Regel + Bibliothek.

## Priorisierungs-Matrix (final)

| Prio | PI-Items | Kategorie-Mix |
|---|---|---|
| **P1** | 3.1, 3.2, 3.6a, 3.7 | Schema-Gate + Overlay-Enforcement + Struktur-Hart |
| **P2** | 3.5, 3.6b, 3.8 | Priming + Datenfluss-Kodifikation |
| **P3** | 3.4 (deferred), 3.9, 3.10 | Enum-Enforcement deferred + Stil-Regeln |
| **Streichen** | 3.3 | Redundant |

## Dependency-Graph

```
P1:
  3.1 (Schema-Gate-Promotion) ──► 3.4 (Enum-Enforcement braucht Schema-Gate)
  3.6a (Prosa-Only) ──► 3.6b (Datenfluss setzt Prosa-Only voraus)
  3.7 (Quelle-SSOT) unabhaengig
  3.2 (Cap) unabhaengig

P2:
  3.5 (Zielgruppe) unabhaengig
  3.6b (Datenfluss) blockiert von 3.6a
  3.8 (Vorentlastung) abhaengig von 3.5 (Priming baut auf Zielgruppen-Profil auf)

P3:
  3.4 (Enum) blockiert von 3.1
  3.9 (Dramaturgie) unabhaengig
  3.10 (Titel) unabhaengig
```

## Umsetzungs-Phasen

**Phase 1 (P1-Cluster):** 3.1 + 3.2 + 3.6a + 3.7 — Schema-Gate + Overlay v1.1 Core-Regeln. Ein Overlay-Release.

**Phase 2 (P2-Cluster):** 3.5 + 3.6b + 3.8 — Zielgruppen-Priming + Datenfluss-Vertrags-Erweiterung + Vorentlastung. Vertrags-Revision + Overlay-Ergaenzung.

**Phase 3 (P3-Cluster):** 3.4 + 3.9 + 3.10 — Enum-Enforcement-Aktivierung (nachdem Schema-Gate aus Phase 1 produktiv) + Stil-Regeln. Kann parallel zu Phase 2 laufen.

## Out-of-Scope (separat)

- **AGENT_UEBERLEITUNG** (F-A5 Szenario B): optional, v4.1 oder v3.6-Kontext. Nicht F0e-PI.
- **v3.6 AGENT_DIFFERENZIERUNG**: Langfrist-Heimat fuer DaZ-erklaerungen[]. Referenz in PI-SPRACHLICHE_VORENTLASTUNG-01, nicht F0e-PI.
- **Schweregrad-Mapping / Alternative-Material-Katalog / Over-Flagging-Schwelle** (F-A2 offene Fragen): separater Task ausserhalb F0e-PI.

## Sign-Off

Paul — zu bestaetigen vor §19-Einarbeitung.
