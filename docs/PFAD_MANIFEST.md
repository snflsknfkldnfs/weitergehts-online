# Pfad-Manifest – Verifizierte Quellpfade

> Zentrales Verzeichnis aller in den Agenten-MDs referenzierten Pfade.
> Verifiziert gegen das Filesystem am 2026-03-12.

## Hinweise

- **Externe Quellpfade**: Relativ zu `~/weitergehts.online/` (lokales Arbeitsverzeichnis der Lehrkraft)
- **Repo-interne Pfade**: Relativ zum Repo-Root `weitergehts-online/`
- **Bekannter Typo**: Das Verzeichnis auf der Festplatte heißt tatsächlich `Repsitory Unterrichtsmaterial` (statt "Repository"). Die Pfade in den Agenten-MDs spiegeln die echte Schreibweise wider.

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
| DESIGN | `assets/css/themes/theme-gpg.css` (wird erstellt) | n/a |

### Audio (Post-MVP)

| Agent | Pfad | Verifiziert |
|---|---|---|
| DESIGN | `assets/audio/success.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/error.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/unlock.mp3` (wird erstellt) | n/a |
| DESIGN | `assets/audio/complete.mp3` (wird erstellt) | n/a |

### Dokumentation

| Agent | Pfad | Verifiziert |
|---|---|---|
| QUALITAET, ORCHESTRATOR | `docs/Checkliste_Interaktive_Materialien.md` | ja |
| QUALITAET | `docs/AGENT_DESIGN.md` | ja |
| ORCHESTRATOR | `docs/AGENT_DIDAKTIK.md` | ja |
| ORCHESTRATOR | `docs/AGENT_INHALT.md` | ja |
| ORCHESTRATOR | `docs/AGENT_RAETSEL.md` | ja |
| ORCHESTRATOR | `docs/AGENT_TECHNIK.md` | ja |
| ORCHESTRATOR | `docs/AGENT_QUALITAET.md` | ja |

---

## Ergebnis

- **Geprüfte Pfade**: 30
- **Verifiziert (existiert)**: 26
- **Noch zu erstellen (n/a)**: 4 (theme-gpg.css + 3 Audio-Dateien, Post-MVP)
- **Fehlende Pfade**: 0
- **Pfade mit Typo im Verzeichnisnamen**: 12 (alle enthalten `Repsitory` – entspricht tatsächlicher Schreibweise auf Festplatte)
