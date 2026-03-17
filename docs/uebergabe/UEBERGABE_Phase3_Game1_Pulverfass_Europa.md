# Übergabe-Prompt: Phase 3 – Game 1 "Pulverfass Europa"

## Kontext

Projekt: weitergehts.online – Interaktive Unterrichtsmaterialien als statische Website (GitHub Pages).
Repository: `weitergehts-online` (lokal + Remote: github.com/snflsknfkldnfs/weitergehts-online)
Phase: 3 (Pilot). Phase 2 (Template-Engine) ist abgeschlossen und auditiert (Commit ddd0ab3).
Template-Dateien unter `escape-games/template/` sind die Basis.

**Game-ID:** `gpg-erster-weltkrieg-ursachen`
**Zielverzeichnis:** `escape-games/gpg-erster-weltkrieg-ursachen/`
**Mappen:** 4 (Pulverfass Europa, Attentat Sarajevo, Kriegsbegeisterung 1914, Schlieffen-Plan)

## Aufgabe

Produziere ein vollständiges, spielbares Escape-Game durch sequenzielle Abarbeitung des 6-Agenten-Workflows. Alle Agenten-Spezifikationen liegen unter `docs/agents/`. Das Themen-Briefing liegt unter `docs/briefings/THEMEN_BRIEFING_ErsterWeltkrieg_Game1.md`.

### Schritt-für-Schritt-Workflow

Lies vor JEDEM Schritt die genannte Agenten-Datei vollständig ein.

---

### Schritt 1: AGENT_DIDAKTIK (`docs/agents/AGENT_DIDAKTIK.md`)

**Eingabe:** Themen-Briefing Game 1, `Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md`

**Aufgabe:**
- Lernziele pro Mappe formulieren (operationalisiert, beobachtbar)
- Kompetenzerwartungen (KE1, KE2, KE3 aus Briefing) den Mappen zuordnen
- Schwierigkeitsprofil erstellen (Basis, R7 Mittelschule)
- Ethische Leitlinien für WWI-Darstellung: kein Verherrlichen, Opferperspektive beachten, Begriffe wie "Heldentod" kontextualisieren

**Ausgabe:** Datei `escape-games/gpg-erster-weltkrieg-ursachen/didaktischer-rahmen.md`

---

### Schritt 2: AGENT_INHALT (`docs/agents/AGENT_INHALT.md`)

**Eingabe:** Didaktischer Rahmen + Themen-Briefing + alle 8 Quelldateien aus dem Briefing

**Aufgabe:**
1. Quelldatei-Preprocessing: Alle 8 Dateien aus dem Briefing einlesen (Pfade sind relativ zum Workspace-Root, unter `Unterricht/GPG/GPG7c/Silas/GPG7/04_TUV_GPG7/04_der_erste_Weltkrieg/`)
2. TUV-Auswertung nach Schema in AGENT_INHALT.md: Stundenverlauf → Phasenzuordnung, Medien/Material → Quellen, Lernziele → Kernaussagen validieren, Tafelbild → Schlüsselbegriffe
3. Kernaussagen aus Briefing validieren und bei Bedarf korrigieren (5 pro Mappe)
4. Fachbegriffe auf Korrektheit und Altersangemessenheit prüfen
5. Inhaltsluecken schließen (4 Stück aus Briefing: Julikrise-Chronologie, Balkankrise-Kontext, Marne-Details, Quellenverifikation)
6. Pro Mappe ein strukturiertes Inhalts-MD erstellen

**Ausgabe:** 4 Dateien: `escape-games/gpg-erster-weltkrieg-ursachen/inhalt-mappe-1.md` bis `inhalt-mappe-4.md`

---

### Schritt 3: AGENT_RAETSEL (`docs/agents/AGENT_RAETSEL.md`)

**Eingabe:** 4 Inhalts-MDs + Didaktischer Rahmen + Themen-Briefing (Hinweise für AGENT_RAETSEL)

**Aufgabe:**
1. Pro Mappe 5 Aufgaben erstellen (= 20 Aufgaben gesamt)
2. Aufgabentypen variieren — jeder der 5 Typen muss im Gesamtgame mindestens 2x vorkommen:
   - `multiple-choice`: 4 Optionen (A/B/C/D), genau 1 richtig
   - `zuordnung`: Begriffe → Kategorien (mind. 4 Paare)
   - `lueckentext`: Zusammenhängender Text mit ___ Lücken (mind. 3)
   - `reihenfolge`: Elemente chronologisch/logisch ordnen (mind. 4)
   - `freitext-code`: Offene Frage mit Schlüsselwort als Antwort
3. Pro Mappe einen 4-stelligen Freischaltcode generieren (alphanumerisch)
4. Pro Aufgabe 3 Tipps (Stufe 1: Denkanstoß, Stufe 2: Richtungshinweis, Stufe 3: Erklärung mit Lösung)
5. Narrativ ausformulieren: Zeitungsreporter-Rahmen (aus Briefing)
6. `data.json` vollständig befüllen

**KRITISCH – Lösungsformat pro Aufgabentyp (FIX-01 aus Phase 2):**

```
multiple-choice:  "loesung": "B"                              (String: Optionsbuchstabe)
zuordnung:        "loesung": {"Dreibund": "Deutschland, .."}   (Object: Begriff→Zuordnung)
lueckentext:      "loesung": ["Wort1", "Wort2", "Wort3"]      (Array: Lückenwörter in Reihenfolge)
reihenfolge:      "loesung": ["Schritt1", "Schritt2", ...]     (Array: Korrekte Reihenfolge)
freitext-code:    "loesung": "belgien"                         (String: Schlüsselwort, lowercase)
```

Jeder andere Lösungstyp bricht die Engine. Prüfe nach dem Befüllen der data.json, dass JEDE Aufgabe den korrekten Lösungstyp hat.

**Hinweise aus Briefing nutzen:**
- Mappe 1: Zuordnung Bündnisse→Länder, Chronologie Bündnisbildung (reihenfolge)
- Mappe 2: Ursache/Auslöser (MC), Kettenreaktion Kriegserklärungen (reihenfolge), Pulverfass-Metapher (Lückentext)
- Mappe 3: 4 Gründe Kriegsbegeisterung (zuordnung), Propaganda (Lückentext), "Weihnachten" (freitext-code)
- Mappe 4: Schlieffen-Plan-Schritte (reihenfolge), Zweifrontenkrieg (MC), Scheitern-Gründe (zuordnung), "Belgien"/"Marne" (freitext-code)

**Ausgabe:**
- 4 Dateien: `escape-games/gpg-erster-weltkrieg-ursachen/raetsel-mappe-1.md` bis `raetsel-mappe-4.md`
- 1 Datei: `escape-games/gpg-erster-weltkrieg-ursachen/data.json` (vollständig befüllt)

---

### Schritt 4: AGENT_TECHNIK (`docs/agents/AGENT_TECHNIK.md`)

**Eingabe:** `data.json` + Rätsel-MDs + Template-Verzeichnis (`escape-games/template/`)

**Aufgabe:**
1. Template-Verzeichnis nach `escape-games/gpg-erster-weltkrieg-ursachen/` kopieren
2. `index.html` anpassen: Titel, Narrativ-Einführung (Zeitungsreporter-Rahmen), Mappen-Übersicht (4 Mappen)
3. `mappe-template.html` → 4 Kopien erstellen: `mappe-1.html` bis `mappe-4.html`
4. Jede `mappe-X.html` befüllen: Titel, Beschreibung, Navigation (zurück/weiter/index)
5. `lehrkraft.html` anpassen: Alle Codes, Lösungen und Tipps anzeigen
6. `data.json` ist bereits befüllt — nur Pfad-Referenzen in HTML prüfen
7. Alle JS-Pfade (`../../assets/js/core.js`, `../../assets/js/escape-engine.js`) und CSS-Pfade (`../../assets/css/base.css`, `../../assets/css/themes/theme-gpg.css`) verifizieren
8. BEM-Klassennamen gemäß AGENT_TECHNIK.md verwenden

**Prüfung nach Implementierung:**
- `data.json` ist valides JSON (kein Trailing Comma, kein Kommentar)
- Alle relativen Pfade zu assets/ stimmen (2 Ebenen: `../../assets/`)
- Alle 4 mappe-X.html referenzieren dieselbe data.json
- Navigation: index → mappe-1 → mappe-2 → ... → mappe-4 → index

**Ausgabe:** Vollständiges Verzeichnis `escape-games/gpg-erster-weltkrieg-ursachen/` mit 7 Dateien:
```
index.html
mappe-1.html
mappe-2.html
mappe-3.html
mappe-4.html
lehrkraft.html
data.json
```

---

### Schritt 5: AGENT_DESIGN (`docs/agents/AGENT_DESIGN.md`)

**Eingabe:** Generierte HTML-Dateien

**Aufgabe:**
1. Prüfen, dass `base.css` und `theme-gpg.css` korrekt eingebunden sind
2. KEINE HTML-Änderungen, KEIN JavaScript — nur CSS
3. Falls nötig: CSS Custom Properties in `theme-gpg.css` für dieses Game anpassen (z.B. Mappe-Akzentfarben)
4. Responsive-Check: Sicherstellen, dass alle BEM-Klassen aus AGENT_TECHNIK in CSS gestylt sind
5. Barrierefreiheit: Kontraste prüfen (WCAG AA), Touch-Targets ≥ 48px
6. MVP-Medienregel: Keine externen Bilder oder Audio, reine CSS-Gestaltung

**Ausgabe:** Ggf. aktualisierte CSS-Dateien. In den meisten Fällen reichen die bestehenden Styles.

---

### Schritt 6: AGENT_QUALITAET (`docs/agents/AGENT_QUALITAET.md` + `docs/checklisten/Checkliste_Interaktive_Materialien.md`)

**Eingabe:** Fertiges Game-Verzeichnis

**Aufgabe:**
1. Checkliste abarbeiten (52 Prüfpunkte in 5 Kategorien)
2. `data.json` validieren:
   - JSON-Syntax korrekt?
   - Jede Aufgabe hat `id`, `typ`, `frage`, `optionen`, `loesung`, `tipps`, `punkte`?
   - Lösungstypen stimmen mit Aufgabentypen überein (FIX-01-Prüfung)?
   - Alle 5 Aufgabentypen mindestens 2x vertreten?
   - Freischaltcodes sind 4-stellig und eindeutig?
3. Fachliche Prüfung: Alle historischen Fakten und Jahreszahlen korrekt?
4. Didaktische Prüfung: Lernziele erreichbar? Schwierigkeit angemessen R7?
5. Technische Prüfung: Alle Links/Pfade funktionieren? JS-Referenzen korrekt?

**Ausgabe:** `escape-games/gpg-erster-weltkrieg-ursachen/qualitaets-report.md` mit Pass/Fail pro Prüfpunkt

---

### Schritt 7: Iteration (falls nötig)

Falls AGENT_QUALITAET Mängel findet:
1. Mängel dem zuständigen Agenten zuordnen
2. Agenten-Schritt wiederholen (nur den betroffenen)
3. Erneute Qualitätsprüfung
4. Max. 3 Iterationen pro Agent

### Schritt 8: Commit + Push

Wenn Qualitäts-Gate bestanden:
```
git add escape-games/gpg-erster-weltkrieg-ursachen/
git commit -m "Phase 3: Game 1 'Pulverfass Europa' - Erster Weltkrieg Ursachen (4 Mappen, 20 Aufgaben)"
git push origin main
```

## Erfolgskriterium

1. `escape-games/gpg-erster-weltkrieg-ursachen/` enthält 7 Dateien (index, 4 Mappen, lehrkraft, data.json)
2. `data.json` ist valides JSON mit 4 Mappen à 5 Aufgaben = 20 Aufgaben
3. Jeder der 5 Aufgabentypen kommt mindestens 2x vor
4. Lösungsformate stimmen exakt mit FIX-01-Schema überein
5. Alle Pfade zu `../../assets/` sind korrekt
6. Historische Fakten und Jahreszahlen sind korrekt
7. Narrativ (Zeitungsreporter) ist konsistent durch alle Mappen
8. Qualitäts-Report zeigt keine offenen Blocker

## Nach Abschluss

Melde den Abschluss in Cowork mit:
"Update: Game 1 'Pulverfass Europa' produziert. [Anzahl] Aufgaben, [Commit-Hash] auf main."
