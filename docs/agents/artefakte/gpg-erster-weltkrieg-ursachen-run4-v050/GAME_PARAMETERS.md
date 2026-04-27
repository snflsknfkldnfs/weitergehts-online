# GAME_PARAMETERS — gpg-erster-weltkrieg-ursachen-run4-v050

**Game-Id:** gpg-erster-weltkrieg-ursachen-run4-v050
**Run-Id:** run-4-2026-04-26-v050-pristine
**Erstellt:** 2026-04-26 (Pre-Run-4-Setup, post-v0.5.0-Release)
**Vertrag:** VERTRAG_PHASE_0-1_DIDAKTIK v1.2 (post-v0.5.0-Hardening)

---

## Game-Parameter

| Parameter | Wert |
|---|---|
| thema | gpg-erster-weltkrieg-ursachen-run4-v050 |
| thema_klartext | Erster Weltkrieg — Ursachen + Ausbruch + Marne 1914 |
| jahrgangsstufe | 7c |
| schulart | Mittelschule Bayern |
| fach | GPG (Geschichte / Politik / Geographie) |
| schwierigkeit | Basis |
| mappen_anzahl | 4 |
| game_id | gpg-erster-weltkrieg-ursachen-run4-v050 |
| vorgaenger_game | (keiner — Run-4 als unabhaengiger Empirie-Run, ALTES Game `gpg-erster-weltkrieg-ursachen` (2026-03-22) liegt parallel als Vergleichs-Anker, wird NICHT als vorgaenger_game-Eingabe an Plugin gegeben) |

---

## Run-4-Kontext + Vergleichs-Anker

**Plugin-Version:** v0.5.0 (Hardening Release, Tag 2026-04-26)

**Vergleichs-Anker:** `gpg-erster-weltkrieg-ursachen` (altes Game, manuell + Pre-Plugin-Infrastructure, erstellt 2026-03-22, PASS-validiert nach Phase 0.1).

**Empirie-Ziel:** Plugin-v0.5.0-generiertes Game vergleichen mit manuellem Pre-Plugin-Game (Goldstandard). Vergleichs-Methodik: Quality pro Phase + F-PB-36..49-Coverage + Run-3-Empirie als Cross-Reference.

**Verstecken-Strategie:** Variante A (Game-ID-Suffix). Altes Game bleibt unter Original-Pfad unangetastet. Plugin sieht nur dieses Verzeichnis (per Game-ID-Konvention).

---

## Lehrplan-Anker (Phase 0.1 ermittelt erst durch Run-4)

- Lehrplan-Quelle (Pflicht-Input): `/Users/paulad/weitergehts.online/Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md`
- Plugin v0.5.0 Foundation A4 Validator `validate_didaktik_rahmen.py` prueft QD-SCHULART-Konsistenz (Schulart 'Mittelschule Bayern' matched mit Lehrplan-Pfad).

**Erwartete KE-Anker (zur Information, Run-4-Plugin entscheidet selbstaendig):**
- KE-A: GPG7_LB2_K_05 (Maechterivalitaeten + Imperialismus → Erster Weltkrieg)
- KE-B: GPG7_LB2_K_06 (Sarajevo + Ursache-Ausloeser-Diskussion)
- KE-C: GPG7_LB3_K_03 (Ursachen + Kriegsschuldfrage)

---

## Mappen-Sequenz (Run-4-Plugin entscheidet, Vergleichs-Anker zur Information)

Altes Game (`gpg-erster-weltkrieg-ursachen` 2026-03-22):

| # | Mappe | Titel (alt) |
|---|---|---|
| M1 | Pulverfass Europa | Buendnissysteme + Imperialismus |
| M2 | Sarajevo + Julikrise | Attentat 28.6.1914 + Krisendynamik |
| M3 | Kriegsbegeisterung | Augustfieber 1914 + Propaganda |
| M4 | Schlieffen-Plan + Marne | Strategie + Scheitern Sept 1914 |

**Run-4-Plan:** Plugin-v0.5.0 generiert eigene Mappen-Aufteilung in Phase 0.1. Vergleich post-Run-4 mit obigem Vorbild.

---

## Pfade (Triple-Root, absolut)

| Root | Pfad |
|---|---|
| GENERATOR_PATH | /Users/paulad/escape-game-generator |
| TARGET_PATH | /Users/paulad/weitergehts.online/weitergehts-online |
| UEW_PATH (Read-Only) | /Users/paulad/weitergehts.online/Unterrichtseinwicklung |
| Output-Verzeichnis | /Users/paulad/weitergehts.online/weitergehts-online/docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/ |
| Lehrplan-Anker | /Users/paulad/weitergehts.online/Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md |

---

## Q-Gate-Status (initial)

- Phase: ONBOARDING
- User-Validierung: AUSSTEHEND
- Naechste Aktion: Code-Mode-Start `/escape-game-generator:generate-game gpg-erster-weltkrieg-ursachen-run4-v050 7c 4`

---

## Run-4-spezifische Pflicht-Vorgaben (post-v0.5.0)

- **Pristine Plugin-v0.5.0-Install** (Plugin-Cache von v0.4.3 muss vor Run-4 ersetzt werden)
- **KEIN ESC waehrend Subagent-Streaming** (Run-3-Lehre)
- **MCP-Pflicht-Connectoren aktiv:** wikipedia + ggf. wikimedia-image-search
- **Run-4-Akzeptanzkriterien:** Hardening-Spec §7 (14 testbare F-PB-Items)

---

## Vergleichs-Eval-Methodik (post-Run-4)

| Phase | altes Game (Goldstandard) | Run-4 v0.5.0 | Eval-Kriterium |
|---|---|---|---|
| 0.1 DIDAKTIK_RAHMEN | manuelle Lehrplan-Anker, ~Q-Gates | Plugin-Output mit QD1-QD10+QD-TITEL+QD-SCHULART | Q-Gate-Coverage + Schulart-Konsistenz-Check (F-PB-45) |
| 0.2 INHALT | Sachanalyse aus 2026-03 | Plugin-Output mit MCP-wiki + event_date Pflicht | Quellen-Hash + event_date-Coverage (F-PB-38) |
| 0.2.M Medien | (im alten Game keine prospektive Verifikation) | dual-kanal verifiziert + quellenkritik-Block (F-PB-37) | Run-4-only-Block, Vergleich vs Run-3 |
| 0.3 SKRIPT | Narrativtext (Pre-Plugin) | Plugin-Output mit SK-Validator-Run | SK1-SK18-Empirie-Vergleich + 600-900W-Korridor (F-PB-47) |
| 0.3 ARTEFAKT_INVENTAR | (im alten Game als 4 MATERIAL_GERUESTE strukturiert) | artefakt_inventar.json mit Pflicht-Felder (F-PB-42) | Schema-Coverage |

Plus: Plugin-v0.5.0-Validatoren auf altem Game laufen lassen (Empirie wieviel Goldstandard den v0.5.0-Hardening-Standards entspricht — Strict-Test).
