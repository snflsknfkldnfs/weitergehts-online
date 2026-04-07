# JSON-Schema: Hefteintrag (Phase-0.4 → Phase-2.0)

**Version:** v1.1
**Datum:** 2026-04-07
**Anlass:** Welle-1-Patch RA1-F03 (Phase-2.0-JSON unvalidiert), RA3-F01 (JSON-Schema-Inkompatibilitaet Placeholders). v1.1: Audit-Patches RA-C-F01 (typ optional), RA-C-F02 (additionalProperties entfernt).
**Kanonisch fuer:** Output von AGENT_HEFTEINTRAG (Phase 0.4), Input von Phase-2.0-Rahmen-Produktion

---

## 1. Schema-Definition

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Hefteintrag-Tafelbild",
  "description": "SCPL-basiertes Tafelbild/Hefteintrag-Artefakt. Produziert in Phase 0.4 (AGENT_HEFTEINTRAG), konsumiert in Phase 2.0 (Rahmen-Produktion) als rahmen/hefteintrag.json.",
  "type": "object",
  "required": ["stundenfrage", "scpl", "ordnungsmuster", "fachbegriffe", "knoten", "verbindungen", "transfer"],
  "properties": {
    "stundenfrage": {
      "type": "string",
      "description": "Problemorientierte Frage, max. 12 Woerter",
      "maxLength": 120
    },
    "scpl": {
      "type": "object",
      "required": ["situation", "complication", "problem", "loesung"],
      "properties": {
        "situation": {
          "type": "object",
          "required": ["kontextsatz"],
          "properties": {
            "kontextsatz": {
              "type": "string",
              "description": "Ausgangslage in 1-2 Saetzen"
            }
          }
        },
        "complication": {
          "type": "array",
          "minItems": 1,
          "maxItems": 4,
          "items": {
            "type": "object",
            "required": ["schritt", "erarbeitbarkeit"],
            "properties": {
              "schritt": {
                "type": "string",
                "description": "Didaktische Problematisierung aus Schuelerperspektive"
              },
              "typ": {
                "type": "string",
                "enum": ["narrativ", "konzeptuell", "kontrastiv", "kausal"],
                "description": "Art der Problematisierung: narrativ (Wendepunkt), konzeptuell (Warum war das ein Problem?), kontrastiv (Widerspruch), kausal (Ursache-Wirkung). EMPFOHLEN ab v1.1, PFLICHT ab naechstem Game. Legacy-Dateien ohne typ bleiben valide."
              },
              "erarbeitbarkeit": {
                "type": "string",
                "enum": ["DIRECT", "ARTIFACT", "INFERENTIAL"]
              }
            }
          }
        },
        "problem": {
          "type": "object",
          "required": ["satz"],
          "properties": {
            "satz": {
              "type": "string",
              "description": "Zentrale Problemstellung, korrespondiert mit Stundenfrage"
            }
          }
        },
        "loesung": {
          "type": "array",
          "minItems": 1,
          "maxItems": 3,
          "items": {
            "type": "object",
            "required": ["kernerkenntnis", "erarbeitbarkeit"],
            "properties": {
              "kernerkenntnis": {
                "type": "string",
                "description": "Max. 15 Woerter. Muss im SKRIPT-Chunk auffindbar sein",
                "maxLength": 120
              },
              "erarbeitbarkeit": {
                "type": "string",
                "enum": ["DIRECT", "ARTIFACT", "INFERENTIAL"]
              }
            }
          }
        }
      }
    },
    "ordnungsmuster": {
      "type": "string",
      "enum": ["kausal", "chronologisch", "kategorial", "parallel-kausal", "kontrastierend", "sequenziell", "metaphorisch", "relational", "konzept-beispiel"],
      "description": "Gewaehltes Ordnungsmuster fuer das Tafelbild"
    },
    "fachbegriffe": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Im Hefteintrag verwendete Fachbegriffe"
    },
    "knoten": {
      "type": "array",
      "items": { "type": "object" },
      "description": "Legacy-Feld. In v4 leeres Array []"
    },
    "verbindungen": {
      "type": "array",
      "items": { "type": "object" },
      "description": "Legacy-Feld. In v4 leeres Array []"
    },
    "transfer": {
      "type": "object",
      "required": ["frage"],
      "properties": {
        "frage": {
          "type": "string",
          "description": "Offene Weiterdenk-Frage (ausserhalb Hefteintrag, fuer Mappenabschluss-Zone)"
        }
      }
    },
    "voraussetzungen": {
      "type": "object",
      "properties": {
        "vorgaenger_mappe": {
          "type": ["string", "null"],
          "description": "Kernerkenntnisse der Vorgaenger-Mappe (null bei Mappe 1)"
        }
      }
    }
  },
  "additionalProperties": true
}
```

---

## 2. Validierungsregeln (ueber Schema hinaus)

| Regel | Pruefung | Referenz |
|---|---|---|
| Stundenfrage max. 12 Woerter | Word-Count auf `stundenfrage` | QH2 |
| Kernerkenntnis max. 15 Woerter | Word-Count auf jedes `scpl.loesung[].kernerkenntnis` | QH4 |
| Erarbeitbarkeit ≥70% DIRECT+ARTIFACT | Zaehlen ueber alle SCPL-Schritte (complication + loesung) | QH5 |
| Keine Placeholder-Strings | Kein Feld darf "[REVISION IN ...]" oder "[PLACEHOLDER]" enthalten | RA3-F01 |
| Felder die erst in Phase 2.1c produziert werden | `zusammenfassung` und `ueberleitung` sind NICHT im Schema — sie werden erst in Phase 2.1c ergaenzt und gehoeren in ein separates Schema | RA1-F03 |

---

## 3. Phase-2.0-Uebernahme

Phase 2.0 (Rahmen-Produktion) uebernimmt dieses JSON als `rahmen/hefteintrag.json` mit folgenden Ergaenzungen:

| Feld | Quelle | Zeitpunkt |
|---|---|---|
| `zusammenfassung` | Phase 2.1c (Achse 6) | Spaeter |
| `ueberleitung` | Phase 2.1c (Achse 6) | Spaeter |
| Formulierungs-Updates zu `situation.kontextsatz`, `complication[].schritt`, `problem.satz` | Phase 2.1c (Achse 6) | Spaeter |

Diese Felder werden NICHT im Phase-0.4-Schema produziert. Phase 2.0 legt sie als leere Felder an oder ueberspringt sie.

---

## 4. Aenderungsprotokoll

| Version | Datum | Aenderung |
|---|---|---|
| v1.0 | 2026-04-07 | Initiale Schema-Definition. Complication[].typ ergaenzt (M-QA3). Placeholder-Verbot (RA3-F01). |
| v1.1 | 2026-04-07 | Audit-Patches: complication[].typ von required→empfohlen (Legacy-Kompatibilitaet, RA-C-F01). additionalProperties true (Phase-2.0/2.1c darf Felder ergaenzen, RA-C-F02). |
