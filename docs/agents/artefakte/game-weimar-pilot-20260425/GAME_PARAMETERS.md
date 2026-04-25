# GAME_PARAMETERS — game-weimar-pilot-20260425

**Phase 0.1 Pre-Condition** (gemaess `agents/phase_transitions.json` Z.10: ONBOARDING → 0.1 verlangt `file_exists: GAME_PARAMETERS.md`).

## Pflicht-Felder

| Feld | Wert |
|---|---|
| game_id | game-weimar-pilot-20260425 |
| thema | weimarer-republik-anfangsphase |
| jgst | 7c |
| mappen_anzahl | 4 |
| schultyp | Mittelschule R7 (Bayern) |
| lehrplan_anker_pfad | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` |

## Pilot-Kontext

- **Test-Modus:** Erster echter Plugin-Production-Run via Code-Mode-CLI nach Track P.2 Phase A+B Closure (inkl. B.7b-Hook-Pattern-Patch, Commits `80e03f6` Generator + `86f282f` weitergehts-online).
- **Klassen-Identitaet:** Inhaltlich fuer 7b und 7c gleichwertig nutzbar. Technisch jgst=7c, da Lehrplan-Anker nur unter `Unterrichtseinwicklung/7c/...` deponiert ist (nicht `7/` oder `7b/`).
- **Vorerfahrung:** KEINE — saubere Test-Umgebung. Kein bestehender Sequenz-Plan / TUV / Material zu Weimarer Republik im UEW-Repo (per User-Bestaetigung 2026-04-25).
- **Datum-Suffix `-20260425`:** Pfad-Isolation gegen spaetere Live-Games (`game-weimar-...-2026-XX` etc.).

## Thematischer Scope

- **Weimarer Republik Anfangsphase** = November 1918 (Doppelte Ausrufung der Republik) bis Ende 1923 (Stabilisierung nach Hyperinflation und Ruhrkrise).
- Lehrplan-Anker konkret zu identifizieren in Phase 0.1 durch agent-didaktik (R7-Fachlehrplan-Sektion).
- Mappen-Strukturierung offen — agent-didaktik schlaegt SCPL-Sequenz auf Basis Lehrplan-Kompetenzerwartungen vor.

## Didaktische Eingangs-Hinweise (advisory, nicht-verbindlich fuer agent-didaktik)

- **Anker-Ereignisse 1918-1923:** Ausrufung Republik (9. November 1918, Doppelausrufung Scheidemann/Liebknecht), Versailler Vertrag (1919), Weimarer Reichsverfassung (1919), Kapp-Putsch (1920), Hyperinflation (1923), Hitler-Putsch (November 1923).
- **Konflikt-Achsen:** Demokratie vs. autoritaere Stroemungen (links + rechts), Versailler-Vertrag-Belastung, Wirtschaftskrise.
- **Schueler-Anschluss-Punkte:** Demokratie als Errungenschaft + Bedrohung, Krisenresilienz von Verfassungsordnungen, mediale Polarisierung als historische Konstante.

## Rahmenhandlung-Hinweise (advisory, fuer agent-skript)

- **Setting-Optionen:** Berliner Zeitungsredaktion 1923 / Reichstag-Abgeordneten-Buero / Familien-Esstisch in Krisenjahren / Polizei-Akte zu politischer Gewalt.
- **Identifikationsfiguren:** offen (anders als Industrialisierung-Sequenz mit Johann/Anna/Peter — Pilot bewusst figuren-frei zur Drift-Vermeidung).

## Output-Verzeichnis

`{TARGET_PATH}/docs/agents/artefakte/game-weimar-pilot-20260425/`

## Erwartete Phase-0-Outputs

- Phase 0.1 → `DIDAKTIK_RAHMEN.md`
- Phase 0.2 → `INHALTSBASIS.md`
- Phase 0.2.M → `MEDIEN_INVENTAR.md`
- Phase 0.3 → `SKRIPT.md`
- Phase 0.4 → `TAFELBILD_Mappe1.md` ... `TAFELBILD_Mappe4.md`

## Q-Gate-Log-Pfad

`Q-GATE-LOG.md` (im selben Verzeichnis, initialisiert leer durch TARGET-Init).
