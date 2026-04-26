# GAME_PARAMETERS — weimarer-republik-anfangsphase (Run-2 Post-MCP)

**Phase 0.1 Pre-Condition** (gemaess `agents/phase_transitions.json` Z.10: ONBOARDING -> 0.1 verlangt `file_exists: GAME_PARAMETERS.md`).

## Pflicht-Felder

| Feld | Wert |
|---|---|
| game_id | game-weimarer-republik-anfangsphase |
| artefakte_verzeichnis | weimarer-republik-anfangsphase |
| thema | weimarer-republik-anfangsphase |
| jgst | 7c |
| mappen_anzahl | 4 |
| schultyp | Mittelschule R7 (Bayern) |
| lehrplan_anker_pfad | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` |
| run_id | run-2-post-mcp-20260426 |
| pilot_kontext | Pilot-Re-Run-2 nach MCP-Setup-Closure (Plugin v0.4.1 + wikipedia-MCP via stdio) |

## Re-Run-Kontext

- **Vorgaenger-Run-1** (gleiche Game-Parameter, Pre-MCP): archiviert unter `docs/agents/artefakte/weimarer-republik-anfangsphase-run1-pre-mcp-20260426/`. Phase 0.1 PASS (DIDAKTIK_RAHMEN), Phase 0.2 abgebrochen wegen MCP-Gap (kein wikipedia-MCP).
- **Re-Run-2-Ziel:** Vergleichs-Empirie zwischen Pre-MCP-Run-1 und Post-MCP-Run-2. Identische Game-Parameter (weimarer-republik-anfangsphase, 7c, 4 Mappen). Aber: Phase 0.1+0.2 werden frisch gestartet, KEIN Recycling der Run-1-Artefakte (saubere Empirie).
- **MCP-Stand bei Run-2-Start:** wikipedia-MCP verbunden + `mcp__wikipedia__test_wikipedia_connectivity` PASS. wikimedia-commons-MCP optional (Fallback WebFetch). MCP-Pflicht-Check `tools/check_mcp_availability.py` zeigt Parsing-Glitch bei MCP-Listing-Output (siehe BEFUND_PHASE_B), aber wikipedia-Tools sind funktional.

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
- **Identifikationsfiguren:** offen — Pilot bewusst figuren-frei zur Drift-Vermeidung (analog game-weimar-pilot-20260425).

## Output-Verzeichnis

`{TARGET_PATH}/docs/agents/artefakte/weimarer-republik-anfangsphase/`

## Erwartete Phase-0-Outputs

- Phase 0.1 -> `DIDAKTIK_RAHMEN.md` + `didaktisches_konzept.json` + `mappen_aufteilung.json`
- Phase 0.2 -> `INHALTSBASIS.md` + `inhalts_briefing.json`
- Phase 0.2.M -> `MEDIEN_INVENTAR.md` + `medien_katalog_game.json`
- Phase 0.3 -> `SKRIPT.md` + Artefakt-Inventar
- Phase 0.4 -> `TAFELBILD_Mappe1.md` ... `TAFELBILD_Mappe4.md`

## Q-Gate-Log-Pfad

`Q-GATE-LOG.md` (im selben Verzeichnis, initialisiert leer durch TARGET-Init).
