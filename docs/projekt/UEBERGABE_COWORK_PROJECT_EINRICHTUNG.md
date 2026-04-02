# Uebergabe: Erste Session im Cowork-Project — Orientierung + Infrastruktur-Einrichtung

**Ziel:** Die frische PM-Session orientiert sich im Projektstand, identifiziert offene Infrastruktur-Luecken, und bereitet die Entwicklungsumgebung fuer die naechste Produktionsphase vor.

---

## Prompt (zum Einfuegen in die erste Nachricht der neuen Session):

```
Erste Session in diesem Cowork-Project. Lies zuerst docs/projekt/COWORK_PROJECT_ANLEITUNG.md und befolge alle dort definierten Regeln.

Dann fuehre folgende Schritte aus:

SCHRITT 1: ORIENTIERUNG
Lies die Pflicht-Lektuere (STATUS.md, CHANGELOG.md letzte 5 Eintraege, UPGRADE_PLAN_v4 Sektion 4).
Erstelle einen komprimierten Lagebericht:
- Aktuelle Phase + letzter abgeschlossener Meilenstein
- Offene Blocker
- Uncommitted Artefakte (falls vorhanden)
- Naechster PM-Schritt

SCHRITT 2: REPO-INTEGRITAET PRUEFEN
Pruefe die Verzeichnisstruktur:
- docs/architektur/vertraege/ — alle 6 Vertraege vorhanden?
- docs/agents/ — ORCHESTRATOR.md + alle AGENT_*.md + SUB_MATERIAL_*.md + SUB_AUFGABE_*.md vorhanden?
- docs/checklisten/ — alle GUETEKRITERIEN_*.md vorhanden?
- docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/ — Welche Mappen existieren? Welche Dateien liegen in den jeweiligen rahmen/materialien/aufgaben/?
- escape-games/gpg-erster-weltkrieg-ursachen/data.json — existiert? Wie viele Mappen enthaelt sie?
Melde Abweichungen vom erwarteten Zustand.

SCHRITT 3: UNCOMMITTED CHANGES
Lass den User `git status` im Terminal ausfuehren.
Falls uncommitted Artefakte existieren (z.B. Mappe 3 Phase-0/1-Artefakte, UPGRADE_PLAN_v5):
- Liste die Dateien auf
- Generiere einen git add/commit/push Block
- Warte auf User-Bestaetigung vor dem naechsten Schritt

SCHRITT 4: ARCHITEKTUR-ENTSCHEIDUNGEN KLAEREN
Lies docs/architektur/UPGRADE_PLAN_v5_PLUGIN_ARCHITEKTUR.md Sektion 6 (Architektur-Entscheidungen E1-E5).
Diese Entscheidungen sind OFFEN und muessen vor der naechsten Produktionsphase getroffen werden.
Stelle dem User die 5 Entscheidungen komprimiert dar (je 1-2 Saetze pro Option, Empfehlung des Plans).
Dokumentiere die Entscheidungen des Users in STATUS.md.

SCHRITT 5: NAECHSTE SCHRITTE PRIORISIEREN
Basierend auf Orientierung + Architektur-Entscheidungen:
Erstelle eine priorisierte Liste der naechsten 3-5 konkreten Arbeitsschritte.
Unterscheide zwischen:
- PM-Aufgaben (in diesem Project loesbar)
- Produktions-Aufgaben (separate Session noetig)
- Claude-Code-Aufgaben (Uebergabe-Prompt noetig)
Aktualisiere STATUS.md + CHANGELOG.md.
```
