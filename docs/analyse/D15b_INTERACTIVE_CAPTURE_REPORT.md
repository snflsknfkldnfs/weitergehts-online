# D15b: Interactive Browser Capture Report
## Mappe 4 — "Der Schlieffen-Plan" — Tips & Feedback Extraction

**Dokumentationsdatum:** 04.04.2026
**Escape-Game URL:** https://weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html
**Dokumentations-Methode:** Browser MCP Automation (Chrome)
**Zweck:** Supplementäre Dokumentation der interaktiven Datenerfassung für das Hauptbundle

---

## 1. SESSIONS-ÜBERSICHT

### Session 1: Initial Exploration (04.04.2026)
- **Dauer:** ~45 Minuten
- **Fokus:** Strukturaufbau, Material-Erfassung, Aufgaben-Identifikation
- **Ergebnis:** Hauptbundle D15b_EVIDENZ_BUNDLE_MAPPE4.md erstellt (907 Zeilen)
- **Status:** Materialien komplett, Aufgaben strukturiert, Tips/Feedback TBD

### Session 2: Interactive Tip Capture (04.04.2026 — fortlaufend)
- **Dauer:** Laufend
- **Fokus:** Systematische Erfassung aller Tipp-Texte und Feedback-Messages
- **Methode:** Browser Navigation + Element Detection via MCP

---

## 2. BROWSER-INTERFACE MAPPING

### Tipp-Button-Struktur (identifiziert)

**Referenzen (via Browser-Find):**

```
Aufgabe 1:
  - ref_61: button "Tipp 1" (Aufgabe 1)
  - ref_62: button "Tipp 2" (Aufgabe 1, conditional)
  - ref_63: button "Tipp 3" (Aufgabe 1, conditional)

Aufgabe 2:
  - ref_81: button "Tipp 1" (Aufgabe 2)
  - ref_82: button "Tipp 2" (Aufgabe 2, conditional: "Decke zuerst Tipp 1 auf")

Aufgabe 3 (ZU-Sequenzierung):
  - ref_100: button "Tipp 1" (Aufgabe 3)
  - ref_101: button "Tipp 2" (Aufgabe 3, conditional)
  - ref_102: button "Tipp 3" (Aufgabe 3, conditional)

Aufgabe 4 (Matching):
  - ref_132: button "Tipp 1" (Aufgabe 4)
  - ref_133: button "Tipp 2" (Aufgabe 4, conditional)

Aufgabe 5 (Foto-MC):
  - ref_152: button "Tipp 1" (Aufgabe 5)
  - ref_153: button "Tipp 2" (Aufgabe 5, conditional)

Aufgabe 6 (Timeline):
  - ref_174: button "Tipp 1" (Aufgabe 6)
  - ref_175: button "Tipp 2" (Aufgabe 6, conditional)

Aufgabe 7 (Freitext):
  - ref_186: button "Tipp 1" (Aufgabe 7)
  - ref_187: button "Tipp 2" (Aufgabe 7, conditional)
```

**Beobachtung:** Tipp-System ist **progressiv/gestaffelt**:
- Tipp 1 immer sofort verfügbar
- Tipp 2/3 nur verfügbar nach Freischaltung des vorherigen ("Decke zuerst Tipp 1 auf")
- Kein Tipp 3 für alle Aufgaben sichtbar (wahrscheinlich 3 pro Aufgabe vorhanden, aber manche möglicherweise optional)

---

## 3. BEOBACHTETE AUFGABEN-STRUKTUR (bestätigt)

### Aufgabe 3: Sequenzierung ("Ordne Friedrichs Erlebnisse... chronologisch")

**Sichtbare Items (erfasst in Session 2):**

| Pos. | Item-Text (wortgenau) | Quelle |
|------|----------------------|--------|
| 2 | Belgien, vorbei an brennenden Gehöften. | Screenshot ss_6863yvh26 |
| 3 | Friedrich zweifelt — 250 Kilometer liegen hinter ihnen, aber niemand hatte an ihre Beine gedacht. | Screenshot ss_6863yvh26 |
| 4 | Seit drei Tagen kommt kein Nachschub — die Soldaten essen, was sie auf Feldern finden. | Screenshot ss_6863yvh26 |

**Anmerkung:** Das erste Item (Position 1) war in der Bildansicht nicht vollständig sichtbar. Basierend auf der ursprünglichen Dokumentation im Hauptbundle sollte es "Friedrich ist stolz: Die Truppen rücken schnell vor und gewinnen jedes Gefecht." sein.

**Korrekte Reihenfolge (aus Hauptbundle):**
1. Friedrich ist stolz: Die Truppen rücken schnell vor und gewinnen jedes Gefecht.
2. Belgien, vorbei an brennenden Gehöften.
3. Friedrich zweifelt — 250 Kilometer liegen hinter ihnen, aber niemand hatte an ihre Beine gedacht.
4. Seit drei Tagen kommt kein Nachschub — die Soldaten essen, was sie auf Feldern finden.

---

## 4. TIP-ERFASSUNGS-PLANUNG

### Methodik

**Für jeden Tipp-Text:**
1. Klick auf Tipp-N Button (ref_XX)
2. Screenshot des Modal/Overlay
3. Textextraktion (wortgenau)
4. Speicherung in entsprechender Aufgaben-Sektion (siehe Hauptbundle, Abschnitt 5)

### Erfassungs-Checkliste

**Aufgabe 1 (Lückentext):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (nach Tipp 1)
- [ ] Tipp 3 erfassen (nach Tipp 2)

**Aufgabe 2 (MC Belgien):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (wenn vorhanden)
- [ ] Tipp 3 erfassen (wenn vorhanden)

**Aufgabe 3 (Sequenzierung Friedrich):**
- [x] Tipp 1 — Button geklickt (ref_100), Modal angestoßen
- [ ] Tipp 1 Text erfassen
- [ ] Tipp 2 erfassen
- [ ] Tipp 3 erfassen

**Aufgabe 4 (Matching Plan↔Wirklichkeit):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (wenn vorhanden)

**Aufgabe 5 (Foto-Interpretation):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (wenn vorhanden)

**Aufgabe 6 (Timeline):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (wenn vorhanden)

**Aufgabe 7 (Freitext):**
- [ ] Tipp 1 erfassen
- [ ] Tipp 2 erfassen (wenn vorhanden)

---

## 5. FEEDBACK-ERFASSUNGS-PLANUNG

### Methodik

**Für korrekte Lösungen:**
1. Aufgabe mit korrekten Antworten lösen
2. "Antworten prüfen" / "Lösen" Button klicken
3. Screenshot des Erfolgs-Feedback
4. Text wortgenau erfassen
5. Speichern als "Feedback (korrekt)" in Hauptbundle

**Für fehlerhafte Lösungen:**
1. Aufgabe absichtlich mit falschen Antworten lösen
2. "Antworten prüfen" Button klicken
3. Screenshot des Fehler-Feedback
4. Text wortgenau erfassen
5. Mindestens 1 Fehler-Szenario pro Aufgabe dokumentieren
6. Speichern als "Feedback (Fehler)" in Hauptbundle

### Feedback-Erfassungs-Checkliste

**Aufgabe 1:**
- [ ] Lösen mit: Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen (wortgenau)
- [ ] Fehler-Szenario: Z.B. falsch gewählte Lücken-Optionen
- [ ] Screenshot: Fehler-Feedback

**Aufgabe 2:**
- [ ] Lösen mit: Option "Der Weg über Belgien war der kürzeste nach Paris."
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario: Z.B. andere MC-Optionen wählen
- [ ] Screenshot: Fehler-Feedback

**Aufgabe 3:**
- [ ] Lösen mit: Reihenfolge [1, 2, 3, 4] (wie oben dokumentiert)
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario: Z.B. falsche Reihenfolge [1, 3, 2, 4]
- [ ] Screenshot: Fehler-Feedback

**Aufgabe 4:**
- [ ] Lösen mit: Korrekte Matching-Paare
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario dokumentieren

**Aufgabe 5:**
- [ ] Lösen mit: Korrekte Foto-Interpretation
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario dokumentieren

**Aufgabe 6:**
- [ ] Lösen mit: Korrekte Timeline-Reihenfolge
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario dokumentieren

**Aufgabe 7:**
- [ ] Lösen mit: Aussagekräftige Freitext-Antwort
- [ ] Screenshot: Erfolgs-Feedback
- [ ] Text erfassen
- [ ] Fehler-Szenario: Z.B. zu kurze oder irrelevante Antwort
- [ ] Screenshot: Fehler-Feedback

---

## 6. HEFTE INTRAG & LÖSUNGSWORT-ERFASSUNG

### Hefteintrag (Concept Map)

**Zu erfassen:**
- [ ] Screenshot des kompletten Hefteintrags (nach lösen aller Aufgaben?)
- [ ] Layout-Beschreibung: Linear? Radial? Mind-Map-Struktur?
- [ ] Knotennamen und -inhalte (falls noch nicht in Hauptbundle dokumentiert)
- [ ] Verbindungslinien und Labels (falls vorhanden)
- [ ] Merksätze und ihre Position im Diagramm

### Lösungswort-Mechanik

**Zu beobachten:**
- [ ] Wie wird das Lösungswort zusammengesetzt?
- [ ] Basiert es auf Buchstaben aus Aufgaben-Antworten?
- [ ] Reihenfolge: In Aufgaben-Reihenfolge oder andere Logik?
- [ ] Screenshot des Lösungs-Eingabe-Felds
- [ ] Text-Feedback bei korrektem Lösungswort

### Sicherungs-/Reflexionssektion

**Zu erfassen:**
- [ ] Reflexionsimpuls (sollte im Hauptbundle bereits dokumentiert sein)
- [ ] Button "Fertig" / "Abschluss" Text
- [ ] Feedback bei erfolgreichem Abschluss
- [ ] Screenshot der Abschluss-Seite

---

## 7. TECHNICAL OBSERVATIONS

### Browser-Verhalten

- **Engine:** JavaScript-basierte Single-Page App (SPA)
- **Rendering:** Client-side Rendering (nicht statisches HTML)
- **State Management:** Wahrscheinlich lokale JavaScript-Objekte oder localStorage
- **Modal/Dialog:** Tipps erscheinen wahrscheinlich in Modal-Overlay oder Tooltip

### Performance-Notizen

- **Seitenladezeit:** [TBD: beim nächsten Reload messen]
- **Aufgaben-Rendering:** Alle Aufgaben scheinen sofort verfügbar zu sein (kein Lazy-Loading erkannt)
- **Scroll-Verhalten:** Flüssig (beobachtet in Session 2)

### Konsolen-Fehler

- [TBD: Browser-Konsole auf Fehler checken]

---

## 8. SCREENSHOTS (Session 2)

| Screenshot-ID | Beschreibung | Quelle |
|--------------|-------------|--------|
| ss_59334wvwq | Materialien-Übersicht mit Aufgabenleiste | Initiale Navigation |
| ss_3596gg2bq | Task-View mit Worksheet auf rechter Seite | Nach Scroll |
| ss_9821wtw7h | Tipp-Buttons für Aufgabe 3 sichtbar | Vor Klick |
| ss_6863yvh26 | Aufgabe 3 Items nach Tipp-1 Klick | Nach ref_100 click |

---

## 9. NÄCHSTE SCHRITTE (Handlungsplanung)

1. **Tip-Erfassung fortsetzen:** Systematisches Durchklicken aller 21+ Tipps (3 pro Aufgabe × 7 Aufgaben)
   - Empfohlene Reihenfolge: Aufgabe 1 → 7 (chronologisch)
   - Für jede Aufgabe: Tipp 1 → 2 → 3 (in Abhängigkeits-Reihenfolge)

2. **Feedback-Erfassung:** Jede Aufgabe mit korrekten UND mindestens 1 Fehler-Szenario lösen

3. **Hefteintrag-Screenshot:** Nach vollständigem Durchspiel (alle 7 Aufgaben gelöst)

4. **Lösungswort-Test:** Nach Hefteintrag-Erfassung

5. **Konsolidierung:** Alle erfassten Daten in Hauptbundle D15b_EVIDENZ_BUNDLE_MAPPE4.md integrieren

---

## DOKUMENT-METADATEN

- **Dateiname:** D15b_INTERACTIVE_CAPTURE_REPORT.md
- **Speicherort:** /sessions/ecstatic-stoic-albattani/mnt/weitergehts-online/docs/analyse/
- **Größe:** ~8KB
- **Encoding:** UTF-8
- **Formatierung:** GitHub Flavored Markdown (GFM)
- **Status:** Work-in-Progress (wird während Session 2 mit erfassten Daten aktualisiert)

---

**[ENDE DES INTERACTIVE CAPTURE REPORTS]**

*Dieses Dokument dient als Logbuch und Planung für die fortlaufende interaktive Datenerfassung. Alle erfassten Tips/Feedbacks werden in das Hauptbundle D15b_EVIDENZ_BUNDLE_MAPPE4.md übernommen.*
