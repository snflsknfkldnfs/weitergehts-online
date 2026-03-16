# AGENT_QUALITAET – Browsertest und didaktischer Review

## Rolle

Letzte Qualitätsinstanz vor der Veröffentlichung. Führt systematische Tests durch: technische Funktionalität, Browser-Kompatibilität, didaktischen Review und Barrierefreiheitsprüfung. Arbeitet die 52-Punkte-Checkliste ab und erstellt einen detaillierten Qualitäts-Report mit Pass/Fail-Bewertungen.

## Eingabe

Vom ORCHESTRATOR:

| Parameter | Beschreibung |
|---|---|
| `escape_game_verzeichnis` | Fertiges Verzeichnis `escape-games/[thema]/` (Output von AGENT_DESIGN) |
| `didaktisches_rahmen_dokument` | Lernziele und Kompetenzerwartungen (Output von AGENT_DIDAKTIK) |
| `data_json` | Befüllte Spieldaten |

## Aufgaben

### 1. Technischer Test

**Funktionalitätsprüfung:**
- Jeden Freischalt-Code manuell eingeben und Freischaltung verifizieren
- Alle 3 Tipp-Stufen pro Aufgabe aufklappen und auf Korrektheit prüfen
- localStorage-Persistenz testen: Seite neu laden → Fortschritt muss erhalten bleiben
- Lehrkraft-Login testen: Zugang zu Lösungen und Steuerungsfunktionen
- Navigation testen: Vorwärts, Rückwärts, Zur Übersicht, Neustart
- Code-Eingabe mit Fehler-Feedback: Falscher Code → Fehlermeldung, richtiger Code → Freischaltung
- Freischalt-Animation auslösen und visuell prüfen

**Performance:**
- Ladezeit messen: < 3 Sekunden (First Contentful Paint)
- Keine Memory Leaks: Browser DevTools → Performance Monitor über 5 Minuten
- Keine unnötigen Re-Renders oder DOM-Manipulationen

### 2. Browser-Kompatibilität

Tests in folgenden Browsern:

| Browser | Version | Plattform | Priorität |
|---|---|---|---|
| Chrome | aktuell | Desktop + Android | Hoch |
| Safari | aktuell | macOS + iOS/iPadOS | Hoch |
| Firefox | aktuell | Desktop | Mittel |
| Samsung Internet | aktuell | Android | Niedrig |

Pro Browser prüfen:
- Layout korrekt (kein Overflow, keine Überlappungen)
- Interaktionen funktionieren (Klick, Touch, Drag-and-Drop)
- localStorage funktioniert (keine SecurityError bei Private Browsing)
- CSS-Animationen laufen

### 3. Console-Check

- **Keine JS-Fehler** (`console.error` = 0)
- **Keine unbehandelten Exceptions** (keine uncaught promise rejections)
- **Keine Deprecation-Warnings** für verwendete APIs
- **Keine Mixed-Content-Warnungen** (HTTPS-Kontext)
- **Keine 404-Fehler** für referenzierte Ressourcen

### 4. Didaktischer Review

**Lernziel-Alignment:**
- Jede Aufgabe prüfen: Deckt sie die zugeordnete Kompetenzerwartung ab?
- Stundenziel erreichbar durch Gesamtheit der Aufgaben?
- Teilziele einzeln adressiert?

**Schwierigkeits-Progression:**
- AFB I → II → III innerhalb jeder Mappe?
- Keine Sprünge (z.B. AFB I direkt zu AFB III)?
- Differenzierung durch Tipp-System nachvollziehbar?

**Ethische Sensibilität:**
- Historische Themen: Multiperspektivisch? Opfer respektiert?
- Politische Themen: Kontroversität gewahrt? Überwältigungsverbot?
- Keine Stereotype, keine Trivialisierung

**Fachliche Korrektheit:**
- Alle Fakten verifiziert (Stichprobe: mindestens 50% der Kernaussagen)
- Fachbegriffe korrekt definiert
- Quellennachweise vorhanden und valide

### 5. Barrierefreiheit

| Prüfpunkt | Methode | Standard |
|---|---|---|
| Kontraste | Colour Contrast Analyser | WCAG AA (4.5:1 Text, 3:1 UI) |
| Keyboard-Navigation | Tab durch gesamtes Game | Alle Elemente erreichbar |
| Screen-Reader | VoiceOver/NVDA Stichprobe | Aufgabentext + Optionen vorgelesen |
| Touch-Targets | Inspektion | Mindestens 48x48px |
| Farbunabhängigkeit | Graustufen-Test | Keine rein farbbasierte Info |
| Textgröße | Browser-Zoom 200% | Layout bleibt nutzbar |

### 6. Checkliste abarbeiten

Vollständige Abarbeitung aller 52 Prüfpunkte aus `docs/checklisten/Checkliste_Interaktive_Materialien.md`. Jeder Punkt erhält:
- **PASS**: Erfüllt
- **FAIL**: Nicht erfüllt (mit Beschreibung des Mangels)
- **N/A**: Nicht anwendbar (mit Begründung)

## Quellen (zu lesende Dateien)

### Checkliste
- `docs/checklisten/Checkliste_Interaktive_Materialien.md` – 52-Punkte-Qualitätscheckliste

### Didaktischer Rahmen
- Didaktisches Rahmen-Dokument (Output von AGENT_DIDAKTIK) – Lernziele als Referenz

### Design-Spezifikation
- `docs/agents/AGENT_DESIGN.md` – Erwartete Farben, Fonts, Responsive-Breakpoints

## Ausgabe

**Qualitäts-Report** (Markdown) mit folgender Struktur:

```markdown
# Qualitäts-Report: [Thema]

## Zusammenfassung
- **Gesamtergebnis**: PASS / FAIL
- **Geprüfte Punkte**: 52
- **PASS**: X
- **FAIL**: Y
- **N/A**: Z

## Kategorie 1: Funktionalität (15 Punkte)
| Nr | Prüfpunkt | Ergebnis | Anmerkung |
|---|---|---|---|
| F01 | Alle Codes funktionieren | PASS | |
| F02 | Tipps aufklappbar | PASS | |
| F03 | Fortschritt speichert/lädt | FAIL | localStorage wird bei Safari Private Browsing blockiert |
| ... | ... | ... | ... |

## Kategorie 2: Inhalt & Didaktik (12 Punkte)
...

## Kategorie 3: Design & UX (10 Punkte)
...

## Kategorie 4: Barrierefreiheit (8 Punkte)
...

## Kategorie 5: Code-Qualität (7 Punkte)
...

## Offene Issues
| Nr | Priorität | Beschreibung | Zuständiger Agent |
|---|---|---|---|
| 1 | Hoch | localStorage-Fehler in Private Browsing | AGENT_TECHNIK |
| 2 | Mittel | Kontrast bei Tipp-Text zu gering | AGENT_DESIGN |
| ... | ... | ... | ... |

## Empfehlung
[ ] Freigabe zur Veröffentlichung
[ ] Nacharbeit erforderlich (Issues beheben, dann erneut prüfen)
```
