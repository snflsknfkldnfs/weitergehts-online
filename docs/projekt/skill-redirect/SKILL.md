---
name: projekt-website
description: >
  Redirect-Skill fuer weitergehts.online Escape-Game-Infrastruktur. Laedt die kanonische Projektanleitung aus dem Repo. IMMER triggern bei: Website-Projekt, Escape-Game, GitHub Pages, Projektfortschritt, 'wo stehen wir', 'naechster Schritt', 'weitergehts.online', UPGRADE_PLAN, Cowork-Runde, Vertrag, Dispatch, Q-Gate, Mappe, Assembly, Qualitaetsbefund, Subagent, Uebergabe-Prompt, Operationalisierung, GUETEKRITERIEN, Phase IV, D15b, Wave, Audit, Checkpoint, SKRIPT, ORCHESTRATOR. Auch bei loser Erwaehnung von Website-Entwicklung oder interaktiven Lernformaten. NICHT triggern bei TUV/Schriftwesen oder Stundenplanung ohne Website-Bezug.
---

# Projekt-Website: Redirect auf kanonische Anleitung

**Dieser Skill enthaelt KEINE eigene Logik.**

Er existiert ausschliesslich als Trigger-Netz. Alle Projektsteuerungs-Regeln stehen in einer einzigen kanonischen Datei im Repo.

## PFLICHT bei Aktivierung

Lies sofort die folgende Datei und befolge ihre Anweisungen:

```
docs/projekt/COWORK_PROJECT_ANLEITUNG.md
```

Das ist die Single Source of Truth fuer:
- Pflicht-Lektuere bei Session-Start
- Modus-Bestimmung (STATUS / EXECUTE / AUDIT / HANDOFF / ONBOARDING)
- Ebenen-Trennung (PM vs. Produkt)
- Dokumentations-Regeln (STATUS.md, CHANGELOG.md, Git-Workflow)
- File-Ownership (docs/ = Cowork, Code = Claude Code)

## Warum dieser Redirect existiert

Fruehere Skill-Versionen (v1 bis v4-2) enthielten jeweils eine vollstaendige Kopie der Projektsteuerungs-Logik. Bei Weiterentwicklung drifteten Skill und Repo-Dokumentation auseinander. Dieser Redirect eliminiert das Drift-Problem: Die Anleitung wird im Repo versioniert, der Skill ist zeitlos.

## Was dieser Skill NICHT tut

- Keine eigene Modus-Logik
- Keine eigene Pflicht-Lektuere-Liste
- Keine eigene Verzeichnisstruktur-Dokumentation
- Keine Duplikation von Inhalten aus COWORK_PROJECT_ANLEITUNG.md

Wenn du diesen Skill liest und COWORK_PROJECT_ANLEITUNG.md nicht findest: melde dem User, dass die kanonische Datei fehlt.
