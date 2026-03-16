# Audit-Verifizierung: Phase 2 – Template-Engine

Datum: 2026-03-13
Grundlage: `docs/AUDIT_Phase2_Template_Engine.md`
Methode: Code-Inspektion aller 8 Dateien gegen die im Briefing dokumentierten Befunde, plus Suche nach übersehenen Problemen.

---

## 1. Verifizierung der dokumentierten Befunde

### Kritische Probleme (B1–B4)

| ID | Befund | Status | Evidenz |
|---|---|---|---|
| B1 | Hardcoded "5" in escape-engine.js:437 | **BESTÄTIGT** | `'Aufgabe ' + (index + 1) + ' von 5'` – Zahl muss dynamisch sein |
| B2 | Freitext-Validierung zu simpel (indexOf) | **BESTÄTIGT** | Zeile 1000: `userText.indexOf(expected) !== -1` – jeder Superstring matcht |
| B3 | Lehrkraft-Seite: Storage ohne init() | **BESTÄTIGT** | `EscapeEngine.init()` wird nirgends in lehrkraft.html aufgerufen. `unlockMappe()` schreibt unter `null`-Key |
| B4 | Navigation nimmt `mappe-N`-Pattern an | **BESTÄTIGT** | index.html:125 und mappe-template.html:111 konstruieren IDs aus Zahlen |

### Moderate Probleme (C1–C4)

| ID | Befund | Status | Anmerkung |
|---|---|---|---|
| C1 | CSS-Duplikation base.css/theme-gpg.css | **BESTÄTIGT** | Identische `:root`-Werte in beiden Dateien |
| C2 | Tipp-Schema konsistent | **BESTÄTIGT** | Kein Issue – Objekt-Format überall korrekt |
| C3 | localStorage-Quota kein Feedback | **BESTÄTIGT** | `Core.storage.set()` gibt `false` zurück, kein Caller prüft es |
| C4 | Klartext-Passwort | **BESTÄTIGT** | Zeile 97: `var PASSWORT = 'lehrkraft'` |

### Kleinere Issues (D1–D5)

| ID | Befund | Status | Anmerkung |
|---|---|---|---|
| D1 | Tippfehler "zunachest" | **BESTÄTIGT** | Zeile 473 |
| D2 | Hardcoded "0 von 5" in Template | **BESTÄTIGT** | mappe-template.html:23 |
| D3 | Inline-Styles mit CSS-Variablen | **BESTÄTIGT, SCHWERER ALS DOKUMENTIERT** | Siehe Abschnitt 2.1 |
| D4 | Fehlende meta description | **BESTÄTIGT** | Kein `<meta name="description">` in allen 3 HTML-Dateien |
| D5 | Mappe-Kopier-Mechanismus undokumentiert | **BESTÄTIGT** | index.html erwartet `mappe-1.html`, nur `mappe-template.html` existiert |

**Ergebnis: Alle 13 Befunde des Audits korrekt identifiziert.**

---

## 2. Übersehene Probleme (blinde Flecken des Audits)

### 2.1 D3 ist gravierender als dokumentiert (HOCHSTUFUNG → C-Level)

Das Audit dokumentiert nur `lehrkraft.html` Zeile 241. Tatsächlich gibt es **8 Inline-Style-Zuweisungen** in lehrkraft.html (Zeilen 132, 133, 227, 228, 241, 242, 243, 270, 271) und **3 weitere in escape-engine.js** (Zeilen 704, 706, 1145).

Besonders problematisch: `escape-engine.js:704/706` setzt `borderColor` per `.style` direkt im Aufgabentyp-Renderer `_checkZuordnung`. Das bedeutet, der Feedback-Mechanismus für Zuordnungs-Aufgaben umgeht das Theming-System komplett. Bei einem Theme mit anderem Farbschema stimmen die Farben nicht.

Die `bar.style.width` (Zeile 1145) ist funktional unvermeidlich (dynamischer Prozentwert), kein Verstoß.

**Empfehlung**: Für lehrkraft.html CSS-Klassen definieren (z.B. `.lehrkraft__aufgabe-detail`, `.lehrkraft__tipp-liste`). Für escape-engine.js:704/706 CSS-Klassen `aufgabe__zuordnung-zeile--correct` / `--incorrect` analog zu den existierenden `.aufgabe__option--correct`/`--incorrect` verwenden.

### 2.2 NEU: Kein DOMContentLoaded-Guard

Keine der drei HTML-Dateien und keines der beiden JS-Dateien verwendet `DOMContentLoaded` oder ein äquivalentes Pattern. Die `<script>`-Tags stehen am Ende von `<body>`, was in der Praxis funktioniert – aber es ist fragil. Wenn jemand ein Script in den `<head>` verschiebt oder `defer`/`async` hinzufügt, bricht das DOM-Binding.

**Risiko**: Niedrig für den MVP (Scripts stehen korrekt am Ende). Aber AGENT_TECHNIK sollte das Pattern als Konvention dokumentieren.

### 2.3 NEU: innerHTML-Nutzung in lehrkraft.html ohne Sanitization

lehrkraft.html Zeilen 214, 246, 253, 266 setzen `innerHTML` mit `<strong>`-Tags. Zwar werden `aufgabe.typ` und `aufgabe.frage` via `Core.utils.sanitizeHTML()` behandelt (Zeilen 248–249), aber die Struktur-Strings selbst werden als HTML injiziert. Das ist akzeptabel, da die Datenquelle die eigene `data.json` ist – kein User-Input. Aber: Wenn die data.json jemals von extern kommt (z.B. Upload durch Lehrkraft), wäre das ein XSS-Vektor.

**Risiko**: Für MVP irrelevant. Für zukünftige User-Upload-Szenarien relevant.

### 2.4 NEU: Event-Listener-Cleanup fehlt

`escape-engine.js` registriert 9+ Event-Listener via `addEventListener` (Zeilen 543, 637, 768, 839, 875, 884, 978, 1051, 1093). Keiner wird jemals entfernt. `_renderMappe` setzt `container.innerHTML = ''` (Zeile 404), was DOM-Elemente zerstört – aber die Closures und Listener bleiben im Speicher.

Bei Single-Page-Nutzung (einmal laden, eine Mappe durchspielen) irrelevant. Bei Navigation zwischen Mappen ohne Page-Reload (was derzeit nicht passiert, da jede Mappe eine eigene HTML-Datei hat) wäre es ein Memory-Leak.

**Risiko**: Kein Risiko beim aktuellen Architekturmodell (separate HTML-Dateien pro Mappe). Wird nur relevant, falls jemand auf SPA umstellt.

### 2.5 NEU: Fehlende Fehlerbehandlung bei fetch in index.html

index.html Zeile 50–65: `fetch('data.json')` hat einen Catch-Block, aber dieser setzt nur den Text eines Elements. Wenn die data.json nicht existiert (z.B. bei erstmaliger Template-Nutzung ohne befüllte Daten), sieht der User "Die Spieldaten konnten nicht geladen werden" ohne Kontext. Das ist besonders bei Phase 3 (Pilot) relevant, da die Agenten erst die data.json befüllen müssen.

**Empfehlung**: Spezifischere Fehlermeldung: "Keine data.json gefunden. Dieses Template muss erst durch den AGENT_RAETSEL mit Inhalten befüllt werden."

---

## 3. Bewertung der Priorisierung

Die Priorisierung im Audit-Briefing ist korrekt. Die Hochstufung von D3 ändert nichts an der Reihenfolge – die Fixes fallen in dieselbe Kategorie.

Ergänzung zur Prioritätsliste:

**Muss vor Phase 3:**
1. B1 fixen (Hardcoded "5")
2. B3 fixen (Lehrkraft Storage)
3. D3/2.1 fixen (Inline-Styles → CSS-Klassen, inkl. escape-engine.js:704/706)
4. D5 dokumentieren (Mappe-Kopier-Mechanismus)

**Sollte vor Phase 3:**
5. 2.5: Bessere Fehlermeldung bei fehlender data.json (verhindert Verwirrung im Pilot)

**Kann parallel:**
6–9. wie im Briefing dokumentiert

---

## 4. Gesamturteil

Das Audit-Briefing ist präzise und vollständig für die offensichtlichen Probleme. Es fehlen vier zusätzliche Befunde (2.1–2.4), von denen zwei (2.1 Inline-Styles-Umfang, 2.5 Fehlermeldung) vor Phase 3 relevant sind. Die Architektur-Bewertung (Abschnitt A) ist korrekt – die Grundstruktur trägt.

Die Template-Engine ist pilotbereit nach Behebung der 5 Muss-Fixes (B1, B3, D3 erweitert, D5, 2.5).
