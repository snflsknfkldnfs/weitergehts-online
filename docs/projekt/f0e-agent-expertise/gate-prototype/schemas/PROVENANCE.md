# Schema-Pinning für F0e-Spike

## Quelle
- **Authoritative Repo:** `escape-game-generator/architektur/schemata/material-output-schema.json`
- **Ausgangs-Version:** v3.10.2 (strict `_meta` required, `additionalProperties:false`)
- **Kopiert am:** 2026-04-21

## Pinned Hashes

### v3.10.2 (I1 + I2 Baseline)
- `material_quellentext_v3.10.2.json` SHA-256: `632d7b4771bf19f007f66fb5442d1f6678cff50b6cade3fac7819c3522a41ffa`
- `material_quellentext_partial_v3.10.2.json` SHA-256: `568c0622f51edd23646eb823cd9aa7b70aa531a68aa20c464fbc850948a7390b`

### v3.10.3 (I3 — F0e-AEF §19.A PI-CONTENT-LENGTH-01)
- `material_quellentext_v3.10.3.json` SHA-256: `f08df7ee4c81ae3f21ec90381de0a7fc9a1dffe160d686247ba228757196244c`
- `material_quellentext_partial_v3.10.3.json` SHA-256: `0f3fe48e113de3f937e7f5997082069ac4525ff166307b282247501a9bdc6e38`
- **Delta zu v3.10.2:** nur `_meta.wortanzahl.maximum=180` ergaenzt + $id/description. Keine strukturellen Aenderungen.
- **Pin-Wechsel im Validator:** `scripts/validate_material_output.py` PINNED_SCHEMA_HASH auf v3.10.3.
- **Abwaerts-Kompatibilitaet:** `--schema material_quellentext_v3.10.2.json` funktioniert, `pinned_match: False`.
- **Smoke-Verifikation:** baseline_fixture PASS (Wortanzahl 145), synthetic_bad (wortanzahl=190 + impulse=String) FAIL mit CONSTRAINT_VIOLATION + WRONG_TYPE.

## Zweck
Deterministische Validierungs-Basis für F0e-Spike. Falls Authoritative-Schema während des Spikes geändert wird, gilt der Pinned-Snapshot — Abweichung wird im Report dokumentiert, nicht auto-übernommen.

## Scope
Gilt fuer `typ=quellentext`. Vollschema deckt alle Material-Typen ab; für F0e-Spike relevante `allOf`-Branch: `typ == "quellentext"` (Zeilen 291-305 im Schema).

## Re-Sync-Protokoll
Wenn Authoritative-Schema geändert: neuen Hash berechnen, neuen Snapshot als `material_quellentext_v3.10.3.json` (o.ä.) ablegen, PROVENANCE erweitern. Alt-Snapshot nicht überschreiben.
