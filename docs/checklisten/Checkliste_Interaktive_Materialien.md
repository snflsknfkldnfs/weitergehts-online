# Checkliste: Interaktive Materialien (Escape-Games)

> 52 Prüfpunkte in 5 Kategorien. Verwendet von AGENT_QUALITAET zur systematischen Qualitätssicherung.

---

## Kategorie 1: Funktionalität (15 Punkte)

| Nr | Prüfpunkt | Pass | Fail | N/A |
|---|---|---|---|---|
| F01 | Alle Freischalt-Codes funktionieren korrekt | [ ] | [ ] | [ ] |
| F02 | Alle Tipps sind aufklappbar (3 Stufen pro Aufgabe) | [ ] | [ ] | [ ] |
| F03 | Fortschritt wird korrekt in localStorage gespeichert | [ ] | [ ] | [ ] |
| F04 | Fortschritt wird nach Seitenneuladung korrekt geladen | [ ] | [ ] | [ ] |
| F05 | Lehrkraft-Zugang funktioniert (Lösungen sichtbar, Steuerung möglich) | [ ] | [ ] | [ ] |
| F06 | Navigation zwischen Mappen funktioniert (vorwärts/rückwärts) | [ ] | [ ] | [ ] |
| F07 | Zurück-Button auf allen Unterseiten vorhanden und funktional | [ ] | [ ] | [ ] |
| F08 | Neustart-Option setzt Fortschritt vollständig zurück | [ ] | [ ] | [ ] |
| F09 | Code-Eingabe zeigt Fehler-Feedback bei falschem Code | [ ] | [ ] | [ ] |
| F10 | Freischalt-Animation wird bei korrektem Code ausgelöst | [ ] | [ ] | [ ] |
| F11 | Keine JavaScript-Console-Fehler (console.error = 0) | [ ] | [ ] | [ ] |
| F12 | Keine toten Links (alle href/src-Verweise auflösbar) | [ ] | [ ] | [ ] |
| F13 | Offline-Funktionalität nach Erstladung (alle Assets lokal) | [ ] | [ ] | [ ] |
| F14 | Performance: Ladezeit < 3 Sekunden (First Contentful Paint) | [ ] | [ ] | [ ] |
| F15 | Keine Memory Leaks (stabile Speichernutzung über 5 Minuten) | [ ] | [ ] | [ ] |

---

## Kategorie 2: Inhalt & Didaktik (12 Punkte)

| Nr | Prüfpunkt | Pass | Fail | N/A |
|---|---|---|---|---|
| D01 | Lehrplankonformität: Alle Kompetenzerwartungen aus dem Didaktischen Rahmen sind abgedeckt | [ ] | [ ] | [ ] |
| D02 | Lernziel-Alignment: Jede Aufgabe adressiert mindestens ein Teilziel | [ ] | [ ] | [ ] |
| D03 | Fachliche Korrektheit: Alle Fakten und Daten sind verifiziert | [ ] | [ ] | [ ] |
| D04 | Altersangemessene Sprache: Verständlich für R7-Mittelschüler:innen | [ ] | [ ] | [ ] |
| D05 | Ethische Sensibilität: Historische/politische Themen multiperspektivisch und respektvoll | [ ] | [ ] | [ ] |
| D06 | Schwierigkeits-Progression: AFB I → II → III innerhalb jeder Mappe | [ ] | [ ] | [ ] |
| D07 | Aufgabenvielfalt: Mindestens 3 verschiedene Aufgabentypen pro Mappe | [ ] | [ ] | [ ] |
| D08 | Tipp-Qualität: Stufe 1 verrät nicht die Lösung, Stufe 3 erklärt zusätzlich | [ ] | [ ] | [ ] |
| D09 | Quellennachweise: Alle verwendeten Inhalte sind nachgewiesen | [ ] | [ ] | [ ] |
| D10 | Narrativer roter Faden: Rahmengeschichte verbindet alle Mappen sinnvoll | [ ] | [ ] | [ ] |
| D11 | Korrekte Rechtschreibung und Grammatik in allen Texten | [ ] | [ ] | [ ] |
| D12 | Begriffserklärungen: Alle Fachbegriffe sind beim ersten Auftreten definiert | [ ] | [ ] | [ ] |

---

## Kategorie 3: Design & UX (10 Punkte)

| Nr | Prüfpunkt | Pass | Fail | N/A |
|---|---|---|---|---|
| U01 | Responsive Design: Korrekte Darstellung auf Mobile (< 640px) | [ ] | [ ] | [ ] |
| U02 | Responsive Design: Korrekte Darstellung auf Tablet (640–1024px) | [ ] | [ ] | [ ] |
| U03 | Responsive Design: Korrekte Darstellung auf Desktop (> 1024px) | [ ] | [ ] | [ ] |
| U04 | Konsistentes visuelles Theme über alle Seiten und Mappen | [ ] | [ ] | [ ] |
| U05 | Lesbare Schriftgrößen: Mindestens 16px Fließtext, skalierbar | [ ] | [ ] | [ ] |
| U06 | WCAG AA Kontraste: Text 4.5:1, UI-Elemente 3:1 | [ ] | [ ] | [ ] |
| U07 | Intuitive Navigation: Benutzer:innen finden ohne Anleitung durch das Game | [ ] | [ ] | [ ] |
| U08 | Visuelles Feedback bei allen Aktionen (Klick, Eingabe, Code-Check) | [ ] | [ ] | [ ] |
| U09 | Fortschrittsanzeige: Benutzer:innen wissen jederzeit, wo sie stehen | [ ] | [ ] | [ ] |
| U10 | Kein visuelles Overload: Aufgeräumtes Layout, klare Hierarchie | [ ] | [ ] | [ ] |

---

## Kategorie 4: Barrierefreiheit (8 Punkte)

| Nr | Prüfpunkt | Pass | Fail | N/A |
|---|---|---|---|---|
| A01 | ARIA-Labels: Alle interaktiven Elemente haben aussagekräftige Labels | [ ] | [ ] | [ ] |
| A02 | Keyboard-Navigation: Alle Funktionen ohne Maus erreichbar | [ ] | [ ] | [ ] |
| A03 | Fokus-Management: Sichtbarer Fokusring, logische Tab-Reihenfolge | [ ] | [ ] | [ ] |
| A04 | Screen-Reader-kompatibel: Aufgabentexte und Optionen werden korrekt vorgelesen | [ ] | [ ] | [ ] |
| A05 | Keine rein farbbasierte Information: Symbole/Text ergänzen Farbcodes | [ ] | [ ] | [ ] |
| A06 | Alt-Texte: Alle Bilder haben beschreibende Alternativtexte | [ ] | [ ] | [ ] |
| A07 | Touch-Targets: Alle klickbaren Elemente mindestens 48x48px | [ ] | [ ] | [ ] |
| A08 | Textgröße skalierbar: Layout funktioniert bei 200% Browser-Zoom | [ ] | [ ] | [ ] |

---

## Kategorie 5: Code-Qualität (7 Punkte)

| Nr | Prüfpunkt | Pass | Fail | N/A |
|---|---|---|---|---|
| C01 | Keine externen Abhängigkeiten: Kein CDN, npm, Framework | [ ] | [ ] | [ ] |
| C02 | Saubere Dateistruktur: Logische Ordnerstruktur gemäß Repo-Konvention | [ ] | [ ] | [ ] |
| C03 | Kommentierter Code: Komplexe Logik ist verständlich kommentiert | [ ] | [ ] | [ ] |
| C04 | Konsistente Namenskonventionen: camelCase für JS, kebab-case für CSS/Dateien | [ ] | [ ] | [ ] |
| C05 | Keine hardcodierten Inhalte: Alle Texte/Daten aus data.json | [ ] | [ ] | [ ] |
| C06 | Valides HTML5: Besteht W3C-Validierung ohne Fehler | [ ] | [ ] | [ ] |
| C07 | Kein deprecated JavaScript: Kein document.write, eval, with | [ ] | [ ] | [ ] |

---

## Auswertung

| Kategorie | Punkte | PASS | FAIL | N/A | Quote |
|---|---|---|---|---|---|
| Funktionalität | 15 | | | | |
| Inhalt & Didaktik | 12 | | | | |
| Design & UX | 10 | | | | |
| Barrierefreiheit | 8 | | | | |
| Code-Qualität | 7 | | | | |
| **Gesamt** | **52** | | | | |

### Freigabe-Kriterien

- **Freigabe**: Alle PASS oder maximal 3 FAIL (nur Priorität "Niedrig")
- **Nacharbeit**: Mehr als 3 FAIL oder mindestens 1 FAIL mit Priorität "Hoch"
- **Blockiert**: Jeder FAIL in Kategorie "Funktionalität" (F01–F15) blockiert die Freigabe
