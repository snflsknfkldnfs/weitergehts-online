---
status: FINAL
datum: 2026-04-23
scope: Mechanischer Konsumenten-Scan nach Paul-Direktive F-A2
ziel: Formale Enum-Katalog-Ableitung fuer `_meta.trigger_flags`
autor: Explore-Agent (Auftrag Cowork)
---

# F0e F-A2 — Trigger-Flags Konsumenten-Scan

## 1. Produzenten-Map

### 1.1 Primäre Produzenten

**Alle 7 SUB_MATERIAL_*-Agenten** (identische Spezifikation):

- `SUB_MATERIAL_QUELLENTEXT.md` (Zeilen 194–220)
- `SUB_MATERIAL_BILDQUELLE.md` (Zeilen 196–220)
- `SUB_MATERIAL_DARSTELLUNGSTEXT.md` (Zeilen 196–220)
- `SUB_MATERIAL_KARTE.md` (Zeilen 196–220)
- `SUB_MATERIAL_ZEITLEISTE.md` (Zeilen 196–220)
- `SUB_MATERIAL_STATISTIK.md` (Zeilen 196–220)
- `SUB_MATERIAL_TAGEBUCH.md` (Zeilen 196–220)

**Produktions-Output-Struktur:**

```json
{
  "_meta": {
    "trigger_flags": []
  }
}
```

### 1.2 Deklarierte Pflicht

Alle 7 Agenten fuehren identische Regel: "Pflicht bei JEDEM Material". Kein Fallback auf leeres Array zulaessig bei inhaltlicher Relevanz.

## 2. Konsumenten-Map

### 2.1 Primärer Consumer: Assembly-Pipeline

**Datei:** `POLICY_TRIGGER_SICHTBARKEIT.md`, Abschnitt 4.5
**Funktion:** Transformation bei Produktions-Zeit

Ablauf:

1. **Read-Phase:** Assembly laedt vollstaendige Produktions-JSON mit `_meta.trigger_flags`.
2. **Enrichment-Phase:** Flags werden in `lehrkraft_meta.trigger_warnung` konvertiert mit `schweregrad`, `kategorie`, `hinweis`, `alternative`.
3. **Schueler-Split:** `lehrkraft_meta` UND `_meta` werden aus Schueler-JSON geloescht (§4.2 Assembly-Split).
4. **Lehrkraft-Split:** Volle Metadaten in `lehrkraft.html` und `lehrkraft-data.json`.

**Sichtbarkeits-Enforcement:** Validator nach Schueler-Assembly (Zeilen 69-74) prueft, dass `lehrkraft_meta` NICHT in Schueler-Output existiert.

### 2.2 Sekundärer Consumer: Quality Gate M15

**Datei:** `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`
**Funktion:** Validierung bei Produktions-Abnahme

M15 prueft Praesenz, Ueber-Flagging-Schwelle, Conformance mit erlaubter Liste.

## 3. Existierende Enum-Definitionen

### 3.1 Formale Enum-Quelle (Authoritative)

**Datei:** `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md`, Zeile 122
**Status:** FINAL, Phase IV Wave 0

**Erlaubte Werte:**

```
gewalt
tod
krieg
diskriminierung
trauma
sexualisierte_gewalt
```

### 3.2 Konsistenz-Bestätigung

| Quelle | Definition | Konsistenz |
|---|---|---|
| QUALITAETSKRITERIEN M15 | 6 Werte | Authoritative |
| POLICY_TRIGGER_SICHTBARKEIT.md 4.5 | 6 Werte (identisch) | Referenz-konform |
| SUB_MATERIAL_QUELLENTEXT.md | 6 Werte (identisch) | Producer-konform |
| Alle 6 weiteren SUB_MATERIAL_* | 6 Werte (identisch) | Producer-konform |

**Naming-Standard:** Durchgehend `lowercase_with_underscores`, keine Varianten wie `Gewalt`, `GEWALT`.

### 3.3 Abdeckung nach Material-Typ

Alle 7 Material-Typen verwenden identische Enum — keine typ-spezifischen Varianten.

## 4. Normalisierungs-Empfehlung (F-A2 Konformität)

### 4.1 Status Quo

Enum ist **bereits funktional normalisiert** in drei Consumption-Ebenen:

- Producer-Spezifikation (7 Agenten)
- Consumer-Policy (STR-12)
- Quality-Gate (M15)

### 4.2 Formale Kodifikation

Ort: `docs/agents/ENUM_TRIGGER_FLAGS.md` (neu) — authoritative Konstante ausgliedern:

```yaml
TRIGGER_FLAGS:
  - gewalt
  - tod
  - krieg
  - diskriminierung
  - trauma
  - sexualisierte_gewalt

Constraints:
  Format: lowercase_with_underscores
  Type: Array<string>
  Mandatory: At least one value if material contains relevant content
  No custom extensions: enum is closed
```

### 4.3 Integration in Produktions-Chain

- Material-Agenten referenzieren ENUM_TRIGGER_FLAGS.md direkt (Single Source of Truth).
- Assembly-Validator: Enum-Check gegen ENUM_TRIGGER_FLAGS.md (statt Hard-Coded-Liste).
- Q-Gate M15: Referenziert ENUM_TRIGGER_FLAGS.md (aktuell: Hard-Coded in QUALITAETSKRITERIEN).

## 5. F0e-Fallstudie-Befund (kritisch!)

Die 4 F0e-Runs verletzten den existierenden Enum systematisch:

| Run | Beobachtete Flags | Enum-Konformitaet |
|---|---|---|
| I1 | gewalt, tod, krieg, diskriminierung | OK (4/6 aus Enum) |
| I2-R1 | Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung | FAIL (Case-Verletzung + nicht-Enum-Werte) |
| I2-R2 | Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung, Ueberwaeltigungsverbot_sensibel | FAIL (idem + zusaetzlicher nicht-Enum-Wert) |
| I2-R3 | (siehe raw) | FAIL (vermutlich) |

**Interpretation:** Das Problem ist NICHT ein fehlender Enum. Das Problem ist, dass Overlay v1.0 + Subagent-Priming den existierenden Enum ignorieren.

**Konsequenz fuer PI-TRIGGERFLAG-ENUM-01:** Von "Enum etablieren" zu "Enum-Compliance durchsetzen". Schema-Gate muss `enum` + `uniqueItems: true` gegen ENUM_TRIGGER_FLAGS-Liste pruefen. Overlay v1.1 muss expliziten Verweis auf existierenden Enum enthalten.

## 6. Offene Fragen

1. Schweregrad-Mapping: existiert formale Mapping-Tabelle Flag → Schweregrad?
2. Alternative-Material-Katalog: existiert Katalog erlaubter Alternativen pro Flag-Kategorie?
3. Over-Flagging-Schwelle: ist diese als Formel formalisiert?
4. Lehrkraft-HTML-Anreicherung: Spezifikation fuer HTML-Template-Rendering?
5. Versionierung: Enum versioniert? Neue Flags hinzufuegbar ohne Breaking Change?

## Quellenverzeichnis

- `QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M15)
- `POLICY_TRIGGER_SICHTBARKEIT.md` (STR-12)
- `SUB_MATERIAL_QUELLENTEXT.md` bis `SUB_MATERIAL_TAGEBUCH.md`
- `VERTRAG_PHASE_2-1_MATERIAL.md`
- `MATERIAL_PIPELINE.md`

**Fazit:** Keine Enum-Fragmentierung gefunden. Enum ist authoritative und funktional in drei Consumption-Ebenen konsistent. Fallstudie-Abweichungen sind Enforcement-Luecken, kein Enum-Design-Problem.
