# Transkript-Personenbezug-Review (DOK1)

**Status:** TEILWEISE — Nachtrag-Sektion 7 korrigiert Sektion 2.3/5 (2026-04-05)
**Datum:** 2026-04-05 (urspruengliche Fassung) + 2026-04-05 Nachtrag
**Herkunft:** RA7 Nachkalibrierung Finding F-RA7-12 (P1), DOK1 Wave 0 Paket
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

**Korrektur 2026-04-05 Nachtrag:** Dieses Dokument bezog sich in seiner urspruenglichen Fassung auf Finding "F-RA7-05". Das war eine Nummerierungs-Verwechslung. Die korrekte Finding-Nummer fuer den Transkript-Befund ist **F-RA7-12 "Evaluations-Transkripte nicht pseudonymisiert"** (siehe `docs/projekt/phase-iii-5/BERICHT_RA7_DATENSCHUTZ.md` Zeile 480, Severitaet P1 HIGH). Die urspruenglich referenzierte Nummer F-RA7-05 bezeichnet den **Wikimedia-URL-Befund**, der durch D1 in Phase IV Wave 0 (Lokalisierung der Bilder in `assets/img/gpg-erster-weltkrieg-ursachen/` mit `BILDLIZENZEN.md`) erledigt wurde.

Der urspruengliche Status "ERLEDIGT" fuer den Transkript-Befund wird durch Sektion 7 zurueckgezogen. **F-RA7-12 bleibt OFFEN** bis physische Verlagerung oder Loeschung der JSONL-Session-Dumps bestaetigt ist.

## 6. Geltungsbereich

Wirksam ab Commit des Phase-IV-Wave-0-Bundles. Review wird bei jedem wesentlichen Schuleinsatz der Escape-Games (erster echter Klassen-Einsatz) wiederholt.

---

**Querverweise:** `docs/projekt/phase-iii-5/RA7_NACHKALIBRIERUNG.md`, `POLICY_TRIGGER_SICHTBARKEIT.md`, iPad-Nutzungsvereinbarung (schulintern, nicht im Repo).

---

## 7. Nachtrag 2026-04-05 — Grep-Methoden-Luecke und Korrektur F-RA7-12

**Anlass:** Vor Commit der Untracked-Dateien in Session 12 wurde ein erweiterter Grep auf `docs/analyse/Evaluiation Testrun Mappe 4/` mit identischem Pattern (`paul|cebulla|paulad|@gmx|@gmail`) ausgefuehrt. Ergebnis: **291 Treffer**, darunter:

- Vollstaendige Dateisystem-Pfade `/Users/paulad/weitergehts.online/weitergehts-online` in jeder Session-Metadaten-Zeile
- Vollstaendige Cowork-System-Prompts in jeder Nachricht (Autor-Session-Kontext)
- JSONL-Format pro Session-Ordner (`transcript-Session1..6`) mit jeweils `<session-id>.jsonl` und `metadata.json`

**Methoden-Luecke:** Die urspruengliche Sektion 2 zaehlte "Cowork-Transkripte Mappe 4" zwar in der Risikomatrix (Zeile "vorhanden, Einwilligung" fuer R3), quantifizierte aber nicht die Menge und Art der R3-Referenzen. Die pauschale Einstufung "unkritisch, da Einwilligung" uebersah, dass das Repo ein **PUBLIC GitHub Pages** Repo ist. Ein Commit der 6 Session-Ordner haette den vollstaendigen Datei-Pfad des Autors, alle durchgefuehrten Cowork-Aufrufe und interne System-Prompts oeffentlich einsehbar gemacht. Das ist kein DSGVO-Verstoss im strengen Sinne (da R3 einwilligungsfaehig), wohl aber eine unbeabsichtigte operative Exposition, die eine zumutbare Einwilligung nicht deckt.

**Massnahmen (durchgefuehrt in Session 12 Commit-Runde):**
1. `.gitignore`-Eintrag `docs/analyse/Evaluiation Testrun Mappe 4/` ergaenzt (Commit `chore(datenschutz): gitignore fuer Evaluiation-Testrun-Transkripte`).
2. Physische Verlagerung der Transkripte ausserhalb des Repos ist offene User-Aufgabe (Ziel: `~/weitergehts.online/_private_archive/` oder vergleichbar).
3. Dieser Nachtrag in DOK1.
4. `D15B_BEFUND_REGISTER` F-RA7-12 Status von "ERLEDIGT" zurueck auf "TEILWEISE / Nachtrag offen".

**Korrigierter Befund F-RA7-12:**
- Sektion 2.3 (Schueler) bleibt gueltig: Keine R1-PII.
- Sektion 2.1 (R3) wird praezisiert: R3-Referenzen in `Evaluiation Testrun Mappe 4/` gehen ueber normale Git-Commit-Autor-Metadaten hinaus (vollstaendige Pfade + System-Prompts + Session-Metadaten). Diese Klasse von Artefakten ist **NICHT fuer ein Public-Repo geeignet**, auch wenn der R3 einwilligungsfaehig ist.
- Sektion 5 Urteil "ERLEDIGT" wird aufgehoben. F-RA7-12 bleibt offen, bis physische Verlagerung oder Loeschung der Transkripte bestaetigt ist.

**Haerteregel vorwaerts:**
- Keine `.jsonl`-Dateien aus Cowork- oder Claude-Code-Session-Dumps im Repo, unabhaengig vom Ordner.
- Pre-Commit-Grep auf `/Users/` und `systemPrompt` in allen `docs/analyse/`-Neuzugaengen vor jedem Commit.
- `.gitignore` haelt diese Regel technisch durch.

**Querverweis:** `docs/projekt/D15B_BEFUND_REGISTER.md` Status-Rueckaenderung F-RA7-12, Commit-Serie Session 12.
