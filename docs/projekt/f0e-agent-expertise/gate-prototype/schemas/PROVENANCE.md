# Schema-Pinning für F0e-Spike

## Quelle
- **Authoritative Repo:** `escape-game-generator/architektur/schemata/material-output-schema.json`
- **Version:** v3.10.2 (strict `_meta` required, `additionalProperties:false`)
- **Kopiert am:** 2026-04-21

## Pinned Hash (Snapshot zum Spike-Start)
- `material_quellentext_v3.10.2.json` SHA-256: `632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa`

## Zweck
Deterministische Validierungs-Basis für F0e-Spike. Falls Authoritative-Schema während des Spikes geändert wird, gilt der Pinned-Snapshot — Abweichung wird im Report dokumentiert, nicht auto-übernommen.

## Scope
Gilt fuer `typ=quellentext`. Vollschema deckt alle Material-Typen ab; für F0e-Spike relevante `allOf`-Branch: `typ == "quellentext"` (Zeilen 291-305 im Schema).

## Re-Sync-Protokoll
Wenn Authoritative-Schema geändert: neuen Hash berechnen, neuen Snapshot als `material_quellentext_v3.10.3.json` (o.ä.) ablegen, PROVENANCE erweitern. Alt-Snapshot nicht überschreiben.
