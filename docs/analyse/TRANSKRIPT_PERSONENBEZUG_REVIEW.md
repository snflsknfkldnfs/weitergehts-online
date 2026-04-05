# Transkript-Personenbezug-Review (DOK1)

**Status:** FINAL (Phase IV Wave 0, DOK1)
**Datum:** 2026-04-05
**Herkunft:** RA7 Nachkalibrierung Finding F-RA7-05 (P1), DOK1 Wave 0 Paket
**Zweck:** Pruefen, ob in `docs/analyse/` und `docs/projekt/` abgelegte Transkripte, Audit-Logs oder Evaluation-Artefakte personenbezogene Daten von Dritten (insbesondere Schuelerinnen) enthalten, die nicht durch die iPad-Nutzungsvereinbarung abgedeckt sind.

---

## 0. Methoden-Einschraenkung

Dieses Review ist **Grep-basiert, kein Volltext-Review**. Gesucht wurde mit folgendem Regex-Pattern:

```
paul|cebulla|paulad|@gmx|@gmail|schueler[a-z]*name|klarname|echtname
```

**Was das Pattern erfasst:** Direkte Erwaehnungen des R3-Autors, generische Email-Domains, explizite Schueler-Namensfelder.

**Was das Pattern NICHT erfasst:**
- Initialen ohne Kontext (z.B. "P.C." allein)
- Selten verwendete Spitznamen
- Klassen-Codes ohne Schlagwort (z.B. "die 7b" in Fliesstext)
- Handschriftlich transkribierte Inhalte mit abgekuerzten Namen
- Fiktive Personas, die zufaellig mit realen Namen uebereinstimmen

**Reichweite des Urteils:** Die Aussage "Kein R1-Personenbezug vorhanden" gilt im Rahmen der Grep-Stichprobe. Ein vollstaendiger Personenbezugs-Ausschluss wuerde einen Volltext-Review aller 6 Session-Transkripte plus aller Audit-Reports erfordern. Dieser Aufwand wurde als nicht verhaeltnismaessig eingestuft, weil (a) alle Transkripte aus Eigen-Tests des Projekteigentuemers stammen, (b) keine Klassen-Nutzung vor 2026-04-05 stattgefunden hat, (c) der Grep-Treffer-Set ausschliesslich R3-Autor-Referenzen enthaelt.

**Verschaerfung bei Bedarf:** Sollte eine juristische oder schul-interne Pruefung einen strengeren Nachweis erfordern, ist ein Volltext-Review der Transkripte nachzuholen. Das Ergebnis dieses Grep-Reviews steht dem nicht entgegen, bietet aber keine Voll-Absicherung.

---

## 1. Scope

Gereviewed wurden folgende Artefakt-Klassen:

1. `docs/analyse/Evaluiation Testrun Mappe 4/` — 6 Cowork-Transkripte der Mappe-4-Produktion (Session 1-6, jeweils jsonl + metadata.json)
2. `docs/analyse/Browser review Mappe 3.md` — Browser-Test-Protokoll
3. `docs/analyse/Ablauf Phase3b.md` — Prozess-Transkript
4. Audit-Reports in `docs/analyse/Audit Report *.md` und `docs/analyse/D15b_*.md`
5. `docs/projekt/phase-iii-5/` — Alle Audit-Berichte RA1-RA7 plus Synthesen
6. `docs/projekt/CHANGELOG.md`, `STATUS.md`

## 2. Gefundene Personenbezuege

### 2.1 R3-Autor (projektverantwortliche Lehrkraft)

In allen Transkripten und Audit-Artefakten kommen Referenzen auf die projektverantwortliche Lehrkraft vor — als Nutzerkennung in Cowork-Metadaten, als Git-Commit-Autor, als Absender in Briefings.

**Bewertung:** Unkritisch. Der R3-Autor ist der Projekteigentuemer und hat in die Verwendung eingewilligt, indem er die Artefakte selbst erzeugt und in das Git-Repo eingecheckt hat. DSGVO Art. 6 Abs. 1 lit. a (Einwilligung) und lit. f (berechtigtes Interesse an Projektdokumentation) greifen.

### 2.2 R2-Lehrkraefte (auditierende Fach-Kolleginnen)

In den D15b-Audit-Artefakten werden fiktive Lehrkraft-Personas referenziert (Stadt-LK, Land-LK, Seminarleiter etc.), die der Projekteigentuemer als Audit-Rollen erstellt hat. Keine realen Kolleginnen-Namen in den Reports.

**Bewertung:** Unkritisch. Fiktive Personas sind keine personenbezogenen Daten im Sinne der DSGVO.

### 2.3 R1-Schuelerinnen

Zum Zeitpunkt des Reviews (2026-04-05) sind die Escape-Games noch nicht mit einer echten Schulklasse durchgefuehrt worden. Kein Transkript in `docs/analyse/` enthaelt Schueler-Antworten, Klar-Namen, Geburtsdaten oder Klassen-Rosters. Die Browser-Reviews sind Eigen-Tests des Projekteigentuemers.

**Bewertung:** Unkritisch im aktuellen Zustand. Kein Schueler-Personenbezug vorhanden.

### 2.4 Historische Personen im Inhalt

Die Mappen-Inhalte (Erster Weltkrieg) nennen historische Personen (Wilhelm II., Franz Ferdinand, Princip etc.). Diese sind seit ueber 70 Jahren verstorben, DSGVO nicht anwendbar.

## 3. Risikomatrix

| Quelle | R1 (SuS) | R2 (LK-Dritte) | R3 (Autor) | Historisch |
|---|---|---|---|---|
| Cowork-Transkripte Mappe 4 | nicht vorhanden | nicht vorhanden | vorhanden, Einwilligung | — |
| Browser-Review Mappe 3 | nicht vorhanden | nicht vorhanden | vorhanden, Einwilligung | — |
| Audit-Reports D15b | nicht vorhanden | nur fiktive Personas | vorhanden, Einwilligung | — |
| Phase-III.5 Reports | nicht vorhanden | nicht vorhanden | vorhanden, Einwilligung | — |
| Mappen-Inhalt (escape-games/) | nicht vorhanden | nicht vorhanden | nicht vorhanden | vorhanden, unkritisch |

## 4. Massnahmen

**Keine Pseudonymisierungs-Pflicht zum jetzigen Zeitpunkt.** Der einzige identifizierbare Personenbezug ist der R3-Autor, der das Repo selbst verwaltet und die Verwendung einwilligt.

**Vorwaerts wirksame Regel (ab heute):**
1. **Kein Einchecken von Schueler-Transkripten.** Falls in Zukunft Browser-Sessions mit echten Schuelerklassen aufgezeichnet werden, duerfen die Cowork-Transkripte, Screenshots oder Logs mit Schueler-Interaktionen **nicht** ins `docs/analyse/` comitted werden. Solche Evaluations-Daten bleiben lokal oder werden vor dem Commit pseudonymisiert.
2. **Kein Einchecken von Namenslisten oder Klassen-Rosters.**
3. **Kein Einchecken von Foto-Material aus Schul-Einsaetzen.**
4. **Pre-Commit-Grep (empfohlen, nicht hart erzwungen):** `docs/analyse/` und `docs/projekt/` werden bei jedem Commit stichprobenartig auf Muster wie `schueler*name`, `klasse 7[a-z]`, Email-Muster `.*@schule.*` gegrep't.

**Bestehende Transkripte:** Bleiben unveraendert im Repo. Keine Nachbearbeitung notwendig.

## 5. Verknuepfung zu RA7

Dieses Dokument schliesst Finding **F-RA7-05 Transkripte in docs/analyse** (nachkalibriert auf P1) als **ERLEDIGT** ab. Die P1-Markierung war eine Absicherungs-Pflicht, um den Ist-Zustand sauber zu dokumentieren — nicht, weil ein konkreter Verstoss vorlag.

## 6. Geltungsbereich

Wirksam ab Commit des Phase-IV-Wave-0-Bundles. Review wird bei jedem wesentlichen Schuleinsatz der Escape-Games (erster echter Klassen-Einsatz) wiederholt.

---

**Querverweise:** `docs/projekt/phase-iii-5/RA7_NACHKALIBRIERUNG.md`, `POLICY_TRIGGER_SICHTBARKEIT.md`, iPad-Nutzungsvereinbarung (schulintern, nicht im Repo).
