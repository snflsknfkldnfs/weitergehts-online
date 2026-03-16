# Pfad-Manifest – Verifizierte Quellpfade

> Zentrales Verzeichnis aller referenzierten Pfade.
> Aktualisiert am 2026-03-16 nach Konsolidierung der Verzeichnisstruktur.

## Hinweise

- **Externe Quellpfade**: Relativ zu `~/weitergehts.online/` (lokales Arbeitsverzeichnis der Lehrkraft)
- **Repo-interne Pfade**: Relativ zum Repo-Root `weitergehts-online/`
- **Bekannter Typo**: Das Verzeichnis auf der Festplatte heißt tatsächlich `Repsitory Unterrichtsmaterial` (statt "Repository"). Die Pfade spiegeln die echte Schreibweise wider.
- **Konsolidierung 2026-03-16**: Alle Projektdokumentation liegt jetzt unter `docs/` im Repo. Das fruehere externe Verzeichnis `Projekt_Website/` ist archiviert.

---

## Repo-interne Dokumentationsstruktur

```
docs/
  agents/          Agenten-Docs + Orchestrator + dieses Manifest
  projekt/         STATUS.md, CHANGELOG.md, Projektplan
  architektur/     WORKFLOW_v1.md, ARCHITEKTUR_v1.md, MATERIAL_PIPELINE.md
  uebergabe/       UEBERGABE_*.md (Handoff-Prompts fuer Claude Code)
  analyse/         ANALYSE_*, AUDIT_*, FIXES_*, Bugs
  briefings/       THEMEN_BRIEFING_*.md
  checklisten/     Checkliste_Interaktive_Materialien.md, MCP_TOOLS.md
  testdaten/       test-data-v1.json
  assets/          PDFs (DNS-Config, Archiv-Artikel)
```

---

## Externe Quellpfade (Didaktische Ressourcen)

### Lehrplan GPG R7

| Agent | Pfad | Verifiziert |
|---|---|---|
| DIDAKTIK, INHALT | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` | ja |
| DIDAKTIK, INHALT | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachprofil_GPG_R7.md` | ja |
| DIDAKTIK | `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Jahrgangsstufenprofil_GPG_R7.md` | ja |

### Didaktik-Anleitungen

| Agent | Pfad | Verifiziert |
|---|---|---|
| DIDAKTIK | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geschichte/` | ja |
| DIDAKTIK | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Geo/Geographiedidaktik/` | ja |
| DIDAKTIK | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Didaktik/Politische Bildung/` | ja |
| DIDAKTIK | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Lernziele formulieren/` | ja |
| DIDAKTIK, INHALT | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Sequenzplanung/` | ja |

### LehrplanPLUS-Aufbereitung

| Agent | Pfad | Verifiziert |
|---|---|---|
| INHALT | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/LehrplanPLUS/GPG7/` | ja |
| INHALT | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/LehrplanPLUS/Fachprofil GPG/` | ja |

### Methoden und Unterrichtseinheiten

| Agent | Pfad | Verifiziert |
|---|---|---|
| RAETSEL | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Methoden/` | ja |
| RAETSEL | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Anleitungen/Unterrichtseinheiten/` | ja |

### Didaktik-Theorie

| Agent | Pfad | Verifiziert |
|---|---|---|
| DIDAKTIK | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Seminarbuch/` | ja |
| DIDAKTIK, RAETSEL | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_Didaktik/Theorie/` | ja |

### Bestehende Unterrichtseinheiten (Referenz)

| Agent | Pfad | Verifiziert |
|---|---|---|
| INHALT | `Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/GPG_UE/GPG7/Silas/GPG7/04_TUV_GPG7/02_LB2-LB3_Industrialisierung/` | ja |

---

## Repo-interne Pfade

### Templates

| Agent | Pfad | Verifiziert |
|---|---|---|
| TECHNIK, RAETSEL, ORCHESTRATOR | `escape-games/template/data.json` | ja |
| TECHNIK | `escape-games/template/index.html` | ja |
| TECHNIK | `escape-games/template/mappe-template.html` | ja |
| TECHNIK | `escape-games/template/lehrkraft.html` | ja |

### Shared Assets

| Agent | Pfad | Verifiziert |
|---|---|---|
| TECHNIK, DESIGN | `assets/js/escape-engine.js` | ja |
| TECHNIK | `assets/js/core.js` | ja |
| TECHNIK, DESIGN | `assets/css/base.css` | ja |
| DESIGN | `assets/css/themes/` (Verzeichnis) | ja |
| DESIGN | `assets/css/themes/theme-gpg.css` | ja |

### Audio (Post-MVP)

| Agent | Pfad | Verifiziert |
|---|---|---|
| DESIGN | `assets/audio/success.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/error.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/unlock.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/complete.mp3` (wird erstellt) | n/a |

### Dokumentation (nach Konsolidierung 2026-03-16)

| Agent | Pfad (neu) | Pfad (alt) |
|---|---|---|
| QUALITAET, ORCHESTRATOR | `docs/checklisten/Checkliste_Interaktive_Materialien.md` | `docs/Checkliste_Interaktive_Materialien.md` |
| QUALITAET | `docs/agents/AGENT_DESIGN.md` | `docs/AGENT_DESIGN.md` |
| ORCHESTRATOR | `docs/agents/AGENT_DIDAKTIK.md` | `docs/AGENT_DIDAKTIK.md` |
| ORCHESTRATOR | `docs/agents/AGENT_INHALT.md` | `docs/AGENT_INHALT.md` |
| ORCHESTRATOR | `docs/agents/AGENT_MATERIAL.md` | `docs/AGENT_MATERIAL.md` |
| ORCHESTRATOR | `docs/agents/AGENT_RAETSEL.md` | `docs/AGENT_RAETSEL.md` |
| ORCHESTRATOR | `docs/agents/AGENT_TECHNIK.md` | `docs/AGENT_TECHNIK.md` |
| ORCHESTRATOR | `docs/agents/AGENT_QUALITAET.md` | `docs/AGENT_QUALITAET.md` |
| ORCHESTRATOR | `docs/agents/ORCHESTRATOR.md` | `docs/ORCHESTRATOR.md` |
| — | `docs/architektur/WORKFLOW_v1.md` | `Projekt_Website/WORKFLOW_v1.md` |
| — | `docs/architektur/ARCHITEKTUR_v1.md` | `Projekt_Website/ARCHITEKTUR_v1.md` |
| — | `docs/projekt/STATUS.md` | `Projekt_Website/STATUS.md` |
| — | `docs/projekt/CHANGELOG.md` | `Projekt_Website/CHANGELOG.md` |

---

## Ergebnis

- **Gepruefte Pfade**: 38
- **Verifiziert (existiert)**: 34
- **Noch zu erstellen (n/a)**: 4 (3 Audio-Dateien, Post-MVP)
- **Fehlende Pfade**: 0
- **Pfade mit Typo im Verzeichnisnamen**: 12 (alle enthalten `Repsitory` – entspricht tatsaechlicher Schreibweise auf Festplatte)
