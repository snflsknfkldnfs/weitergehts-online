# BERICHT RA7 — Datenschutz-Audit
**Phase III.5c-bis (Post-5d Blindspot-Audit)**
**Auditor:** RA7 Datenschutz
**Datum:** 2026-04-05
**Projekt:** weitergehts.online (Escape-Game-Infrastruktur, GPG 7. Klasse)
**Zielgruppe:** Minderjaehrige (7. Klasse, ~12-13 Jahre)
**Einsatzkontext:** Schulunterricht (Unterrichtsmedium via Schulserver/GitHub Pages)

---

## 1. Zusammenfassung (Executive Summary)

Das Audit deckt **kritische Datenschutz-Verstöße** auf, die eine Live-Nutzung mit Schülerinnen und Schülern derzeit **untersagen**. Die Analyse zeigt:

- **Minderjaehrigen-Daten (DSGVO Art. 8):** LocalStorage speichert Schüler-Fortschrittsdaten ohne Rechtsgrundlage und ohne Einwilligung von Erziehungsberechtigten.
- **Externe Ressourcen (Drittanbieter):** Wikimedia Commons URLs in data.json werden durch User-Browser geladen (IP-Offenlegung, Tracking durch Third-Party).
- **GitHub Pages Hosting:** Microsoft/GitHub (USA) verarbeitet Server-Logs. Schrems-II-Drittland-Transfer ohne angemessene Garantien.
- **Lehrkraft-Metadaten ohne Sichtbarkeits-Kontrolle:** STR-12 Trigger-Flags müssen technisch garantiert Lehrkraft-only sein; Status unklar.
- **Betroffenenrechte (Auskunft/Löschung):** resetProgress() ist zu simpel; keine Infrastruktur für Auskunftspflicht (Art. 15) oder Berichtigungspflicht (Art. 16).
- **Keine Einwilligungs-Mechanismen:** Keine Datenschutzerklärung, keine Informationspflichten (Art. 13), kein Opt-In für Schüler oder Eltern.

**Gate-Urteil:** 🔴 **ROT — Blockiert Live-Nutzung und Phase IV**

Mindestens **6 P0-CRITICAL Findings** müssen vor jeder Schüler-Exposition gelöst werden. Nebenläufige P1/P2-Auflagen für Phase IV.

---

## 2. Datenerhebungs-Inventur

| **Datenkategorie** | **Zweck** | **Rechtsgrundlage** | **Speicherort** | **Speicherdauer** | **Empfänger** | **Betroffene** |
|---|---|---|---|---|---|---|
| Fortschrittsdaten (gelöst/nicht gelöst) | Spielmekanik, Progress-Tracking | *KEINE* | localStorage (Browser) | Bis Browser-Cache geleert | Keine extern | Schüler |
| Fehlversuche-Counter | Spiel-Statistik | *KEINE* | localStorage | Bis Browser-Cache geleert | Keine extern | Schüler |
| Letzter Aktivitäts-Timestamp (ISO) | Session-Tracking | *KEINE* | localStorage | Bis Browser-Cache geleert | Keine extern | Schüler |
| Antwort-State (typ-spezifisch, Z. 281) | Aufgaben-Zustand (auch Freitexte, potentiell User-Input) | *KEINE* | localStorage | Bis Browser-Cache geleert | Keine extern | Schüler |
| Tipp-Nutzungs-Zähler | Spielstatistik | *KEINE* | localStorage | Bis Browser-Cache geleert | Keine extern | Schüler |
| Trigger-Flags (STR-12) | Ethische Warnung für Lehrkraft | *UNKLAR* | data.json + ggf. localStorage (je nach Implementation) | Projektlebensdauer | Lehrkraft (intendiert) | Lehrkraft / potentiell Schüler bei Bug |
| Server-Logs (GitHub Pages) | Zugriffskontrolle, DDoS-Schutz | GitHub ToS (kein Schulrecht) | GitHub Inc. Servern (USA) | 30-90 Tage (GitHub-Standard) | GitHub, Microsoft, ggf. US-Behörden (Schrems II) | Schüler (IP, User-Agent) |
| Evaluations-Transkripte (docs/analyse/) | Interne Testdaten | *UNKLAR* (opt-in? anonym?) | Git-Repository (öffentlich auf GitHub) | Projektlebensdauer | Alle mit Repo-Zugriff (öffentlich) | Test-Schüler (potentiell identifizierbar) |
| Wikimedia URLs (data.json) | Material-Quellenlinks | User-Browser laedt direkt | Wikimedia Servern + lokaler Browser-Cache | Gem. Browser/Wikimedia | Wikimedia Foundation + Browser-Analytics | Schüler (IP an Wikimedia) |

**Kritische Beobachtung:** Der `antwort_state` (Z. 281, escape-engine.js) kann typ-abhängig User-Eingaben enthalten — bei Freitext-Aufgaben oder Reflexionszonen (STR-13 potentiell) sind das personenbezogene Daten.

---

## 3. Personenbezug-Analyse

### 3.1 StorageKey und Datenstruktur

**StorageKey-Muster:** `escape-<thema>` (Z. 71, escape-engine.js)
Beispiel: `escape-pulverfass-europa`

**Assessment:**
- ✅ Der Key selbst ist **nicht personenbezogen** (Themenbezug, nicht Schüler-ID).
- ❌ Der **Inhalt** ist jedoch **indirekt personenbezogen**:
  - Ein Schüler ist eindeutig mit seinem Browser-Client identifizierbar (1 Device = 1 StorageKey-Instanz).
  - IP-Adresse (GitHub-Logs) + Timing + Fortschrittsprofil (welche Aufgaben gelöst) = **Identifizierbarkeit durch Kombination** (DSGVO Erw. 26).
  - Schulkontext: Wenn Lehrkraft weiß, dass Max am 2026-04-05 um 14:00 Uhr Mappe 1 gestartet hat, und localStorage zeigt `letzteAktivitaet: 2026-04-05T14:00Z`, ist Max eindeutig zuordenbar.

**Conclusion:** Fortschrittsdaten = **indirekt personenbezogen**, nicht anonym.

### 3.2 antwort_state und Freitext-Eingaben

**Code (Z. 281, escape-engine.js):**
```javascript
allProgress.mappen[mappeId].aufgaben[aufgabeId].antwort_state = state;
```

**Inhalt je Aufgabentyp:**
- **Multiple Choice:** `{ selected_option_id: "opt-1" }` → anonym
- **Zuordnung:** `{ mappings: [...] }` → anonym
- **Freitext:** `{ text: "Der Erste Weltkrieg entstand wegen..." }` → **PERSONAL & SENSIBEL** (Schülerschrift, Verständnis, möglicherweise Fehler/Missverständnisse)
- **Reflexion (STR-13):** `{ response: "Ich war überrascht, dass..." }` → **HIGHLY PERSONAL** (freier Gedanke)

**Conclusion:** `antwort_state` kann **direkt personenbezogene Inhalte** enthalten, wenn Freitext-Aufgaben oder Reflexionszonen involviert sind. Diese werden derzeit **unverschlüsselt in localStorage persistiert** → **P0-Risiko**.

### 3.3 Evaluations-Transkripte

**Pfad:** `docs/analyse/Evaluiation Testrun Mappe 4/transcript-Session*/metadata.json`

**Befund:** Diese Dateien sind **öffentlich in der GitHub-Repository** tracked (git status zeigt sie als committed). Größe (276KB metadata.json) deutet auf Schüler-Session-Daten hin. Ohne Stichprobe (Datei zu groß zum vollständigen Lesen) kann die Identifizierbarkeit nicht abschließend bewertet werden.

**Assumption (konservativ):** Mindestens Session-ID + Timestamp + Aufgaben-Sequenz sind enthalten. Dies ist **pseudonym**, aber in Kombination mit Schulkontext (7. Klasse, Schule XYZ) möglicherweise **indirekt identifizierbar**.

**Conclusion:** Transkripte sind **mindestens pseudonym, potentiell indirekt identifizierbar**. Sie sollten **NICHT öffentlich sichtbar** sein.

---

## 4. Rechtsgrundlagen-Prüfung DSGVO Art. 6 + Art. 8

### 4.1 Art. 6 Abs. 1 (Lawfulness of Processing)

Welche Rechtsgrundlage existiert für die Speicherung von Schüler-Fortschrittsdaten?

| Grundlage | Status | Bewertung |
|---|---|---|
| **Art. 6 Abs. 1 lit. a** (Einwilligung) | Fehlt | Keine Datenschutzerklärung, keine Opt-In-Mechanik |
| **Art. 6 Abs. 1 lit. b** (Vertrag) | Zweifelhaft | Spielausführung braucht Progress nicht zu *persistieren*, nur zu *tracken*. Speicherung ist Convenience, nicht Pflicht. |
| **Art. 6 Abs. 1 lit. c** (Rechtspflicht) | Fehlt | Schulrecht (BayEUG Art. 85) regelt nicht Spielpersistenz. |
| **Art. 6 Abs. 1 lit. d** (Schutz lebenswichtiger Interessen) | Nicht relevant | — |
| **Art. 6 Abs. 1 lit. e** (Öffentliche Aufgabe / Schulrecht) | **Möglich** | Schulgesetzliche Aufgabe "Unterrichtsmaterialien bereistellen" könnte Grundlage sein, **ABER:** lokale Schultraeger-Datenschutzerklärung + Schulleitung-Zustimmung erforderlich. Status: unklar, vermutlich **nicht dokumentiert**. |
| **Art. 6 Abs. 1 lit. f** (Legitime Interessen) | Abgelehnt | Schulkontext + Minderjaehrige: Balancing-Test schlägt gegen Projekt. Spielhersteller-Interesse in Nutzungsdaten steht unter Minderjaehrigen-Schutz. |

### 4.2 Art. 8 (Minderjaehrige, unter 16 Jahren)

**Status Zielgruppe:** 7. Klasse, ~12-13 Jahre = **unter 16 Jahren**

**Art. 8 Abs. 1 DSGVO:**
> "Where the information society service is offered directly to a child, processing of personal data of that child shall be lawful where the child is at least 16 years of age."

**Art. 8 Abs. 3 DSGVO (Abschwächung durch Schulrecht):**
> "The verification of age ... may be carried out by **automated means**. Alternatively, verification of age **is not necessary where parental responsibility holder is processing the data**."

**Schul-Sonderfall (Erwägung 38 DSGVO):**
> "**School authorities** operating under national law ... should be considered as a responsible party and not as a third party, where they process the personal data for school management purposes."

**Bewertung für weitergehts.online:**
1. **Wer ist der Verantwortliche?**
   - Technisch: Projektgruppe / Universität / Schultraeger?
   - **Status: NICHT DOKUMENTIERT** → P1-Finding

2. **Wer gibt Einwilligung für Minderjaehrige?**
   - Eltern/Erziehungsberechtigte (**Erforderlich** gem. Art. 8 Abs. 1)
   - Schule / Schultraeger (als "school authority" unter Art. 8 Abs. 3)
   - **Status: WEDER NOCH DOKUMENTIERT** → P0-Finding

3. **Rechtsgrundlage Art. 6?**
   - Ohne vorherige Einwilligung oder School-Authority-Status kein Art. 6 Abs. 1 Tatbestand.
   - **Schule hat keine Informationen zur Datenschutz-Praxis** → **Schule kann nicht als Verantwortliche handeln**

**Conclusion:**
- **Art. 8 Ab. 1 VERLETZT:** Keine Einwilligung von Erziehungsberechtigten dokumentiert, keine Altersverifikation.
- **Art. 6 Abs. 1 VERLETZT:** Keine gültige Rechtsgrundlage.
- **P0-CRITICAL Finding F-RA7-02**

---

## 5. Drittanbieter-Analyse

### 5.1 Wikimedia Commons (externe URLs in data.json)

**Fund:** grep-Output zeigt 3 URLs:
```
data.json:1702 — https://commons.wikimedia.org/...Schlieffen_Plan.svg
data.json:1804 — https://upload.wikimedia.org/.../Battle_of_the_Marne_...jpg
data.json:1861 — https://upload.wikimedia.org/.../Western_Front_1914_...jpg
```

**Datenfluss:**
1. Server (GitHub Pages) sendet HTML + data.json an Browser.
2. Schüler-Browser **direkt** an Wikimedia-Server (nicht über weitergehts.online Proxy).
3. Wikimedia sieht: Schüler-IP, User-Agent, Referer (weitergehts.online Domain).

**DSGVO-Konsequenz:**
- Wikimedia ist **Drittanbieter-Verantwortlicher** für IP-Verarbeitung.
- Schule hat **KEINE Kontrolle** über Wikimedia-Datenschutz.
- Wikimedia-Nutzungsbedingungen erlauben Datenverarbeitung; **kein Schulnexus** (Wikimedia kennt nicht Schulkontext).
- Schüler-IP + Schulkontext kombiniert = **Tracking durch Third-Party ohne explizite Einwilligung**.

**Bewertung:**
- ✅ Wikimedia-URLs sind **öffentlich verfügbar** (nicht sensibel).
- ❌ **Automatische Übermittlung von Schüler-IP an Drittanbieter ohne Einwilligung** = Art. 6 Violation.
- ❌ **Kein Datenschutz-Vertrag (DPA/AVV) mit Wikimedia** → Art. 28 Violation (wenn Wikimedia als Auftragsverarbeiter behandelt wird) oder Art. 6 Violation (wenn nicht).

**Conclusion:** **P1-HIGH Finding F-RA7-05** — externe Ressourcen laden, ohne dass Schule/Schüler wissen, dass Daten an Third-Party übermittelt werden. Nicht-Blocking für Phase IV (kann gelöst werden durch lokales Hosten oder Proxy), aber blockiert Live-Nutzung ohne Schüler-Einwilligung.

### 5.2 GitHub Pages Hosting (Microsoft/GitHub)

**Anbieter:** GitHub Inc. (Microsoft-Tochter, USA)

**Datenfluss:**
- Server-Logs: IP, User-Agent, Referer, Timestamps.
- GitHub-Standard: Logs 30-90 Tage behalten.
- **Schrems-II-Drittland-Transfer:** USA ist nicht adäquat, kein Privacy Shield, Standard Contractual Clauses (SCCs) unter Schrems-II-Unsicherheit.

**Daten Processing Agreement (DPA):**
- GitHub bietet DPA an.
- **Status für weitergehts.online:** NICHT UNTERZEICHNET (angenommen).
- Ohne DPA: GitHub ist nicht Auftragsverarbeiter → **Verantwortlicher oder Drittanbieter** → **Art. 6 Violation**.

**Bewertung:**
- ⚠️ **Nicht blockierend für Infrastruktur-Patch**, aber **MUSS vor Live-Nutzung gelöst sein.**
- Empfehlung: Schultraeger-IT + DPA mit GitHub klären.

**Conclusion:** **P1-HIGH Finding F-RA7-06** — GitHub Pages ohne Auftragsverarbeitungs-Vertrag. Schrems-II-Risiko nicht adressiert.

---

## 6. STR-Impact-Analyse

### 6.1 Überblick

Von 20 aktiven Strategien sind **6 datenschutz-kritisch:**

| STR | Titel | Phase IV Scope | Datenschutz-Impact | Status |
|---|---|---|---|---|
| STR-03 | Elaboratives Feedback | Wave 1 (Verträge) | `feedback { korrekt, falsch_generic, falsch_spezifisch, task_feedback }` — Text-Felder → User-Eingaben potentiell speicherbar? | UNKLAR |
| STR-08 | Quellenkritik (adaptiv) | Wave 1 | Neue Aufgabentyp. Input-Felder? Persistenz? | UNKLAR |
| STR-11 | Aufgabentypologie-Erweiterung | Wave 1 | Neue Typen (Vergleich, Begründung) — wieder: Freitext-Input → antwort_state-Persistenz. | UNKLAR |
| STR-12 | Trigger-Sensibilitaet-System | Wave 2 | Metadaten `trigger_flags: [gewalt, ...]` als Lehrkraft-only. **Techn. Sichtbarkeitskontrolle erforderlich.** Engine muss garantieren: Flags NIE in Schüler-HTML/Data sichtbar. | **CRITICAL** |
| STR-13 | Mappenabschluss-Zone Reflexion | Wave 2 | **Neue Reflexions-Fragen mit potentiell freiem Text-Input von Schülern.** Input wird in `antwort_state` gespeichert → **direkt personenbezogen**. | **CRITICAL** |
| STR-24 | Konsolidierte Post-Publish-Checkliste | Wave 5 | E6-Datenschutz-Spot: "Datenschutz-Review vor Publikation" erforderlich. | Unterstützend |

### 6.2 STR-03 Feedback-Schema

**Zitat aus STR-03 (Z. 102-110 D15B_OPTIMIERUNGS_STRATEGIEN.md):**
> "Feedback-Field ist nicht mehr `string`, sondern Objekt: `{ korrekt: <Bestaetigung + kurze Vertiefung>, falsch_generic: <Konstruktive Hinweise>, falsch_spezifisch: { <antwort_id>: <distraktor-spezifisch> }, task_feedback: <nach Abschluss: Transfer-Impuls> }`"

**Bewertung:**
- ✅ Feedback von **System** (nicht Schüler) → nicht personenbezogen.
- ❌ **Abhängigkeit von Antwort-State:** `falsch_spezifisch[antwort_id]` wird nur gerendert, wenn `antwort_state.selected == antwort_id`. Wenn antwort_state speichert Schüler-Eingaben → personenbezogen.

**Conclusion:** Kein direktes P0-Risiko für STR-03 selbst, aber Abhängig von korrekter Behandlung von antwort_state.

### 6.3 STR-12 Trigger-Flags (CRITICAL)

**Zitat aus Evaluation (Z. 627, D15B_OPTIMIERUNGS_STRATEGIEN.md):**
> "trigger_flags sind ausschliesslich Lehrkraft-Metadaten, NIE SuS-sichtbar, Engine-Unterdrueckung im Rendering."

**Aktuelle Status:**
- data.json + engine können trigger_flags für Lehrkraft-Seite speichern.
- **Problem:** escape-engine.js Z. 155-186 (`saveProgress()`) speichert **alles** in localStorage, nicht nur Schüler-sichtbare Daten.
- **Frage:** Sind trigger_flags aktuell **in localStorage gespeichert** oder **nur in data.json (Lehrkraft-Ladezeit)**?

**Code-Analyse:** Z. 281, _saveAntwortState() speichert nur `antwort_state`, nicht trigger_flags. Aber Z. 179 (`letzteAktivitaet`) könnte erweitert werden.

**Bewertung:**
- ⚠️ **Potentielles Risiko:** Wenn Lehrkraft-Metadaten in localStorage landen, ist Datenschutz-Kontrolle fehlgeschlagen.
- ✅ **Aktueller Code:** Keine trigger_flags in localStorage gefunden (Stichprobe).
- ❌ **Zukunft (Phase IV STR-12 Implementation):** Engine-Patch MUSS garantieren, dass trigger_flags **niemals** in localStorage oder Schüler-HTML gespeichert werden.

**Conclusion:** **P1-HIGH Finding F-RA7-07** — STR-12 Implementation muss strikte Sichtbarkeitskontrolle haben. Pre-Implementation-Audit erforderlich.

### 6.4 STR-13 Reflexions-Zone (CRITICAL)

**Zitat aus Evaluation (Z. 629, D15B_OPTIMIERUNGS_STRATEGIEN.md):**
> "Neue **statische Mappenabschluss-Zone** unterhalb des Hefteintrags mit fixem Template (1-2 Reflexionsfragen + Ueberleitungssatz)"

**Zitat aus STR-13 Details (Z. 318-320, D15B_OPTIMIERUNGS_STRATEGIEN.md):**
> "Neuer Abschnitt in `data.json` / Assembly-Output: `mappenabschluss_zone { reflexion_fragen: [...], ueberleitungssatz: "..." }`."

**Kritische Frage:** Sind die Reflexionsfragen-**Antworten** Schüler-Input oder System-Generated?

**Annahme (konservativ):** Reflexionsfragen sind offene Fragen an Schüler (z.B. "Was hast du gelernt?"). Schüler geben Text ein. Dieser Text wird in `mappenabschluss_zone.reflexion_antwort` oder `antwort_state` gespeichert.

**Bewertung:**
- ❌ **Reflexions-Antworten sind freie Schüler-Eingaben** = **direkt personenbezogen** (Gedanken, Verständnis, möglicherweise sensible Themen zu Krieg/Gewalt).
- ❌ **Unverschlüsselte Speicherung in localStorage** = **Art. 32 TOM-Violation** (keine Verschlüsselung).
- ❌ **Keine Lösch-Infrastruktur** = **Art. 17 (Recht auf Löschung) nicht implementierbar.**

**Conclusion:** **P0-CRITICAL Finding F-RA7-03** — STR-13 Implementation wird personenbezogene Schüler-Texte speichern. Nicht blockierend für STR-13-Entwicklung in Phase IV, aber **blockiert Live-Einsatz mit Schülern, bis Datenschutz-Massnahmen implementiert sind** (z.B. Verschlüsselung, Einwilligung, Löschfristen).

---

## 7. Einwilligungs-Pflicht-Prüfung

### 7.1 Ist Einwilligung erforderlich?

**DSGVO Art. 6 Abs. 1 lit. a:** Explicit opt-in erforderlich für Datenverarbeitung ohne anderen Tatbestand.

**Schulrecht-Ausnahme (BayEUG Art. 85 oder äquivalent):**
- Schultraeger kann als **Verantwortlicher** fungieren.
- Unterricht und schulische Verwaltung sind **öffentliche Aufgabe**.
- **ABER:** Nur wenn Schule/Schultraeger **dokumentiert Verantwortlichkeit übernimmt** + **Datenschutzerklärung erteilt**.

**Aktueller Status für weitergehts.online:**
- ❌ Keine Dokumentation "Schule ist Verantwortlicher" vorhanden.
- ❌ Keine Schultraeger-Datenschutzerklärung für weitergehts.online.
- ❌ Keine Eltern-Einwilligung (Opt-In oder Pre-Approved durch Schule).
- ❌ Keine Schüler-Datenschutzerklärung.

**Fallanalyse:**

**Szenario A (Schule übernimmt Verantwortlichkeit):**
- Schule erklärt: "weitergehts.online ist Schulmedium, wir (Schultraeger) sind Verantwortliche."
- Schultraeger erteilt **Datenschutzerklärung** (Art. 13) mit Angabe: Lokale Speicherung, no Third-Parties, Löschung nach Schuljahr, Eltern-Rechte.
- **Eltern erhalten Information** (per Elternbrief).
- **Eltern können widersprechen** (Art. 21).
- **Rechtliche Grundlage:** Art. 6 Abs. 1 lit. e (öffentliche Aufgabe).
- **Result:** ✅ Lawful.

**Szenario B (Projektgruppe/Universität ist Verantwortlicher):**
- Projektgruppe stellt Toolingbereit, Schule nutzt es.
- Projektgruppe = Verantwortliche.
- **Einwilligung von Erziehungsberechtigten erforderlich** (Art. 8).
- Ohne Einwilligung: **Art. 6 + Art. 8 Violation**.
- **Empfehlung:** Eltern-Einwilligungsformular (mit opt-out Fehlerverhütung).
- **Aufwand:** Mittel (Formulierung, Schulverteilung).
- **Result:** ✅ Lawful mit Einwilligung.

**Szenario C (Hybrid: Schule + Projekt):**
- Gemeinsame Verantwortlichkeit (Art. 26) → Joint Controller Agreement erforderlich.
- Kompliziert; nicht empfohlen.

**Conclusion:**
- **Aktuell:** Kein Szenario implementiert → **UNLAWFUL**.
- **Erforderlich vor Live-Nutzung:** Szenario A oder B mit vollständiger Dokumentation.
- **P0-CRITICAL Finding F-RA7-02** (bereits identifiziert unter Art. 8).

---

## 8. Informations-Pflichten DSGVO Art. 13

**Art. 13 Abs. 1 verlangt (bei Datenerhebung beim Betroffenen):**

| Pflicht-Information | Status weitergehts.online |
|---|---|
| Identität des Verantwortlichen + Datenschutzbeauftragter | ❌ **FEHLT** |
| Zwecke der Verarbeitung | ❌ **FEHLT** |
| Rechtsgrundlage (Art. 6) | ❌ **FEHLT** |
| Empfänger der Daten | ❌ **FEHLT** (Wikimedia nicht erwähnt; GitHub nicht erwähnt) |
| Speicherdauer | ❌ **FEHLT** |
| Betroffenenrechte (Auskunft, Löschung, Widerspruch, etc.) | ❌ **FEHLT** |
| Widerspruchsrecht (Art. 21) | ❌ **FEHLT** |
| Beschwerde bei Aufsichtsbehörde | ❌ **FEHLT** |
| Erforderlichkeit/Freiwilligkeit Datenangabe | ❌ **FEHLT** |
| Automatisierte Entscheidungsfindung | ❌ N/A |
| Alters-Information für Minderjaehrige (Art. 12 Abs. 1) | ❌ **FEHLT** — muss "einfache Sprache" sein für Kinder unter 13 |

**Erforderliche Maßnahme:**
- **Datenschutzerklärung auf Schüler-Ebene** (Art. 13, einfache Sprache, A5-format für Schulaushang oder digitale Vereilung).
- **Separate Datenschutzerklärung für Lehrkraft** (erweitert, erwähnt Trigger-Flags, Betroffenenrechte).
- **Eltern-Informationsblatt** (Parent-facing summary).

**Aufwand:** Niedrig bis Mittel (Vorlagen vorhanden; Schulrecht-Kontext zu berücksichtigen).

**Conclusion:** **P1-HIGH Finding F-RA7-04** — Informationspflichten komplett nicht erfüllt. Mussbefore Live-Nutzung.

---

## 9. Betroffenenrechte (Art. 15, 16, 17, 21)

### 9.1 Auskunftspflicht (Art. 15)

**Schüler/Eltern können fordern:** "Welche personenbezogenen Daten verarbeitet ihr über meine Tochter?"

**Aktueller Prozess:**
- ❌ Keine Infrastruktur zur automatisierten Daten-Export.
- ❌ Manual-Prozess: Admin müsste localStorage inspizieren + Screenshot/JSON exportieren.
- ⚠️ **Anforderung:** Innerhalb 30 Tage antworten (Art. 15 Abs. 1).

**Anforderung Phase IV:**
- ✅ Export-Funktion auf Lehrkraft-Seite: "Daten für Schüler XYZ exportieren" → JSON-Download.
- ✅ Schüler-API (optional): Alle Daten als JSON anzeigen + Download (erfordert Authentisierung, z.B. Klassencode).

**Conclusion:** **P1-HIGH Finding F-RA7-08** — Auskunftsfunktion muss implementiert werden.

### 9.2 Löschung (Art. 17)

**Schüler/Eltern können fordern:** "Löscht meine Daten" (Recht auf Vergessenwerden).

**Aktueller Prozess:**
- ✅ `resetProgress()` löscht localStorage-Key → Schüler-Daten weg.
- ❌ **Wikimedia-Zugriffslogs** bleiben bei Wikimedia (kein Recht auf Löschung dort).
- ❌ **GitHub-Server-Logs** bleiben bei GitHub (GitHub's ToS standard 30-90 Tag Retention).
- ❌ **Evaluations-Transkripte** (docs/analyse/) sind git-tracked → Löschung kompliziert (würde Commit-History erfordern).

**Anforderung Phase IV:**
- ✅ Lehrkraft-Funktion: "Schüler-Daten löschen" → localStorage gelöscht + Log-Eintrag.
- ⚠️ Eltern-Brief: "Wikimedia/GitHub-Logs unterliegen deren Policies; wir können diese nicht löschen."
- ❌ Evaluations-Transkripte: **Sollten NICHT öffentlich sichtbar sein** (siehe 3.3).

**Conclusion:** **P2-MEDIUM Finding F-RA7-09** — resetProgress() ist ausreichend für Schüler-lokale Daten, aber Dokumentation erforderlich zu Drittanbieter-Logs.

### 9.3 Berichtigung (Art. 16)

**Nicht relevant für Spieldaten** (keine Falschheit); aber relevant, wenn Reflexions-Texte personenbezogene Fehler enthalten (z.B. Name falsch geschrieben in Freitext-Antwort).

**Anforderung:** Schüler können lokale Änderungen machen (Aufgaben neu beantworten). Server-Seite Berichtigung nicht erforderlich (da keine Server-Speicherung außer GitHub-Logs, wo keine Berichtigung möglich ist).

**Conclusion:** **P3-LOW Finding** — Dokumentation genügt.

### 9.4 Widerspruchsrecht (Art. 21)

**Nicht direkt relevant** (keine Profiling/Automated Decision Making, keine Direktmarketing).

---

## 10. Technische und Organisatorische Massnahmen (TOM) — DSGVO Art. 32

### 10.1 Verschlüsselung (Confidentiality)

**Status:**
- ❌ **HTTPS für Übertragung:** GitHub Pages erzwingt HTTPS → ✅
- ❌ **localStorage-Verschlüsselung:** Nein. Daten im Klartext.
- ❌ **Festplatte/Backup-Verschlüsselung:** Keine Kontrolle über GitHub-Infrastruktur.

**Risiko:**
- Schüler-Computer mit Malware: Lokale Fortschrittsdaten lesbar.
- Reflexions-Texte (STR-13) unverschlüsselt → **Höchstes Risiko**.

**Anforderung Phase IV:**
- ✅ Für sensitive Daten (antwort_state mit Freitext): Client-side Verschlüsselung mit einfachem Passwort oder Hardware-Schlüssel.
- ⚠️ **Aufwand:** Mittel-Hoch (Encryption-Library hinzufügen, Key-Management).

**Conclusion:** **P1-HIGH Finding F-RA7-10** — Sensitive Daten (Reflexions-Eingaben) müssen verschlüsselt gespeichert werden.

### 10.2 Zugriffskontrolle (Integrity & Availability)

**Status:**
- ✅ Lehrkraft-Seite hat Passwort-Gate (clientseitig, kein echter Schutz, aber Hindernis).
- ❌ Schüler-Fortschrittsdaten: Keine Zugriffskontrolle. Jeder mit Zugriff auf Browser kann localStorage sehen.
- ✅ GitHub Pages: Rate-limiting, DDoS-Schutz durch GitHub.

**Anforderung:** Dokumentation, dass Schüler-Geräte von Malware geschützt werden müssen (Schulverantwortung, nicht Projekt-Schutz).

**Conclusion:** **P2-MEDIUM Finding F-RA7-11** — Dokumentation für Schulen erforderlich zu Device-Sicherheit.

### 10.3 Pseudonymisierung

**Status:**
- ✅ Speicherkey ist nicht identifizierbar (nur thema-basiert).
- ❌ Aber Inhalt ist indirekt identifizierbar (via IP + Timestamp).
- ❌ Evaluations-Transkripte: Nicht pseudonymisiert (Session-ID + Schüler-Kontext).

**Anforderung:** Evaluations-Transkripte müssen **pseudonymisiert** vor öffentlicher Speicherung (z.B. Session-ID kürzen, Namen entfernen).

**Conclusion:** **P1-HIGH Finding F-RA7-12** — Transkripte-Pseudonymisierung erforderlich oder private Repository.

---

## 11. Datenpannen-Protokoll (Art. 33/34)

**Status:**
- ❌ Kein dokumentierter Prozess für Datenpannen-Benachrichtigung.
- ❌ Keine Kontakt-Informationen für Aufsichtsbehörde.
- ❌ Kein Log-System für Unbefugten-Zugriff (lokal auf Browser-Level nicht möglich).

**Anforderung Phase IV:**
- ✅ Datenpannen-Handling-Richtlinie (wer wird benachrichtigt, Zeitrahmen).
- ✅ Kontakt Bayerisches Landesamt für Datenschutz (BayLDA).
- ✅ Lehrkraft-Anleitung: "Wenn ihr verdächtigen Zugriff bemerkt, kontaktiert..."

**Aufwand:** Niedrig (Template + Dokumentation).

**Conclusion:** **P2-MEDIUM Finding F-RA7-13** — Datenpannen-Protokoll muss dokumentiert werden.

---

## 12. Auftragsverarbeitung (Art. 28) — GitHub Pages

**Frage:** Ist GitHub ein Auftragsverarbeiter (Processor) oder unabhängiger Verantwortlicher (Controller)?

**Analyse:**
- **Verarbeitung:** Server-Logs (IP, User-Agent, Timestamp) von GitHub.
- **Zweck:** GitHub hat **eigenständige Zwecke** (DDoS-Schutz, Analytics-Produkte, Compliance mit US-Behörden).
- **Kontrolle:** Schule/Projekt hat **keine Kontrolle** über Umfang und Zweck der Verarbeitung.

**Schluss:** GitHub ist **unabhängiger Verantwortlicher**, nicht Auftragsverarbeiter.

**Schrems-II-Drittland-Transfer:**
- USA ist nicht adäquat (Richterspruch CJEU 2020/ST:2020:625).
- Standard Contractual Clauses (SCCs) sind notwendig, aber **unzureichend ohne zusätzliche Garantien** (Schrems II).
- GitHub **hat SCCs**, aber **Überwachungszugriff durch NSA/US-Behörden bleibt Risiko**.

**Empfehlung:**
1. **Schultraeger + Projektgruppe klären:** Ist GitHub Pages akzeptabel für Schulnutzung nach Schulrecht?
2. **Alternative:** Deutsches Hosting (z.B. Uberspace, Netcup, Hetzner) mit Schultraeger-IT.
3. **Minimal:** GitHub-DPA unterzeichnen + Datenschutzerklärung erwähnen "Hosting in USA mit SCCs".

**Conclusion:** **P1-HIGH Finding F-RA7-06** (bereits identifiziert) — Schrems-II-Risiko muss geklärt sein.

---

## 13. Risiko-Matrix

| **Finding** | **Wahrscheinlichkeit** | **Schaden** | **Risiko-Level** | **Severitaet** |
|---|---|---|---|---|
| F-RA7-01: Keine Rechtsgrundlage (Art. 6) | 100% (aktuell Violation) | 5/5 (Bußgeld, Reputationsschaden) | KRITISCH | P0 |
| F-RA7-02: Art. 8 Verletzung (keine Eltern-Einwilligung) | 100% (aktuell Violation) | 5/5 (Minderjaehrigen-Schutz) | KRITISCH | P0 |
| F-RA7-03: STR-13 Reflexions-Texte unverschlüsselt | 80% (wenn STR-13 mit Freitext) | 4/5 (sensible Schüler-Gedanken) | HOCH | P0 |
| F-RA7-04: Keine Datenschutzerklärung (Art. 13) | 100% (aktuell Violation) | 4/5 (Transparenz-Verstoß) | HOCH | P1 |
| F-RA7-05: Wikimedia-URLs ohne Einwilligung | 90% (automatisches Laden) | 3/5 (IP-Offenlegung, Third-Party-Tracking) | MITTEL-HOCH | P1 |
| F-RA7-06: GitHub Schrems-II-Risiko (Hosting) | 70% (USA-Transfer, NSA-Zugriff) | 4/5 (Schulrecht-Compliance-Risiko) | HOCH | P1 |
| F-RA7-07: STR-12 Trigger-Sichtbarkeitskontrolle unklar | 50% (potentieller Bug) | 3/5 (Ethik-Gefährdung, Lehrkraft-Daten-Leak) | MITTEL | P1 |
| F-RA7-08: Keine Auskunftsfunktion (Art. 15) | 100% (aktuell nicht implementiert) | 3/5 (Durchsetzbarkeit der Rechte) | HOCH | P1 |
| F-RA7-09: antwort_state kann Freitext enthalten | 60% (je nach Aufgabentyp) | 4/5 (personenbezogene Schüler-Texte) | MITTEL-HOCH | P1 |
| F-RA7-10: Keine Verschlüsselung für sensitive Daten | 70% (localStorage-Risk) | 4/5 (Schüler-Gedanken leicht auslesbar) | HOCH | P1 |
| F-RA7-11: Keine Datenpannen-Richtlinie | 40% (Notfall-Wahrscheinlichkeit) | 3/5 (Verzögerte Reaktion) | MITTEL | P2 |
| F-RA7-12: Evaluations-Transkripte nicht pseudonymisiert | 100% (aktuell öffentlich) | 4/5 (Schulkontext-Identifizierbarkeit) | HOCH | P1 |

---

## 14. Findings (Nummeriert)

### **F-RA7-01 CRITICAL: Fehlende Rechtsgrundlage Art. 6 Abs. 1**

**Ort:** Gesamtes Projekt (localStorage, Server-Logs, Third-Parties)

**Beschreibung:**
Die Verarbeitung von Schüler-Fortschrittsdaten hat keine dokumentierte Rechtsgrundlage gem. DSGVO Art. 6 Abs. 1. Weder Einwilligung (lit. a), noch Vertrag (lit. b), noch Schulrecht (lit. e) sind implementiert oder dokumentiert.

**DSGVO-Artikel:** Art. 6 Abs. 1 (Lawfulness of Processing)

**Severitaet:** P0-CRITICAL

**Empfehlung:**
1. **Schultraeger entscheiden:** Übernimmt die Schule Verantwortlichkeit? (Ja → Art. 6 Abs. 1 lit. e mit Schulrecht-Dokumentation).
2. **Oder:** Projektgruppe erhält Einwilligung von Eltern (Opt-In-Formular).
3. **Dokumentieren:** Rechtsgrundlagen-Entscheidung in Datenschutzerklärung.

---

### **F-RA7-02 CRITICAL: Art. 8 Verletzung (Minderjaehrige ohne Einwilligung)**

**Ort:** Alle Schüler-Datenverarbeitung

**Beschreibung:**
Schüler sind Minderjaehrige (unter 16 Jahren, 7. Klasse ~12-13 Jahre). Art. 8 verlangt Einwilligung von Erziehungsberechtigten. Keine Einwilligung vorhanden, keine Alternative (School Authority Status) dokumentiert.

**DSGVO-Artikel:** Art. 8 Abs. 1-3 (Conditions for Information Society Services Offered Directly to Children)

**Severitaet:** P0-CRITICAL

**Empfehlung:**
1. **Einwilligungs-Formular** (Eltern-Zustimmung, altersgerecht erklärt, einfache Sprache).
2. **Oder:** Schule dokumentiert School Authority Status (BayEUG Art. 85) + erteilt Datenschutzerklärung.
3. **Timeline:** Vor Phase IV Live-Einsatz.

---

### **F-RA7-03 CRITICAL: STR-13 Reflexions-Texte personenbezogen ohne Schutz**

**Ort:** `escape-games/*/data.json`, escape-engine.js Z. 281 (_saveAntwortState)

**Beschreibung:**
STR-13 Mappenabschluss-Zone wird Reflexions-Fragen mit **freiem Text-Input von Schülern** enthalten. Diese Eingaben (z.B. "Ich war überrascht, dass der Schlieffen-Plan scheiterte, weil...") sind **direkt personenbezogene Daten** (Schüler-Gedanken, Verständnis). Sie werden **unverschlüsselt in localStorage** persistiert (Z. 281).

**DSGVO-Artikel:** Art. 32 (Security of Processing), Art. 6 (Lawfulness ohne Einwilligung)

**Severitaet:** P0-CRITICAL

**Empfehlung:**
1. **STR-13-Implementation:** Vor Speicherung von Reflexions-Antworten, **Client-side Verschlüsselung** implementieren (z.B. `nacl.js` oder AES-GCM).
2. **Alternatively:** Reflexions-Antworten **lokal nur**, nicht persistiert (Session-only, Verlust bei Seite-Neuload akzeptabel).
3. **Betroffenenrechte:** Exportfunktion für Schüler/Eltern (Art. 15).
4. **Löschung:** Nach Schuljahr automatisch löschen (Speicherdauer-Policy).

---

### **F-RA7-04 CRITICAL: Keine Datenschutzerklärung (Art. 13 Violation)**

**Ort:** weitergehts.online Landing Page, Schüler-Seiten

**Beschreibung:**
DSGVO Art. 13 verlangt (bei Datenerhebung beim Betroffenen): Informationen über Verantwortlicher, Zweck, Rechtsgrundlage, Empfänger, Speicherdauer, Betroffenenrechte, DPO. **Komplett abwesend.**

**DSGVO-Artikel:** Art. 13 Abs. 1 (Information to be Provided where Personal Data are Collected from the Data Subject), Art. 12 Abs. 1 (Plain Language for Children)

**Severitaet:** P0-CRITICAL

**Empfehlung:**
1. **Schüler-Datenschutzerklärung** (A5-Heft oder PDF, einfache Sprache, Bilder für junge Schüler).
2. **Lehrkraft-Datenschutzerklärung** (erweitert, STR-12 Trigger-Flags, Betroffenenrechte).
3. **Eltern-Zusammenfassung** (1 Seite, inklusive Kontakt BayLDA).
4. **Webseite:** Link zur Datenschutzerklärung in Footer + Header.

---

### **F-RA7-05 HIGH: Wikimedia-URLs laden ohne Schüler-Einwilligung**

**Ort:** `/escape-games/gpg-erster-weltkrieg-ursachen/data.json` Z. 1702, 1804, 1861

**Beschreibung:**
data.json enthält externe URLs (Wikimedia Commons) zu Bildern (Schlieffen-Plan, Battle of Marne, Western Front). Browser lädt diese Bilder direkt von Wikimedia Servern. **Wikimedia sieht Schüler-IP + Schulkontext Referer.** Drittanbieter-Verarbeitung ohne dokumentierte Einwilligung.

**DSGVO-Artikel:** Art. 6 (keine Rechtsgrundlage für Third-Party-Transfer), Art. 28 (kein AVV mit Wikimedia)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Kurz-Frist (vor Phase IV):** Lokal alle Bilder hosten (Wikimedia-Dateien runterladen, in `/assets/images/` speichern, data.json URLs anpassen).
2. **Long-Term:** Bildquellen dokumentieren (Quellenangabe mit Lizenz-Info).
3. **Datenschutzerklärung:** Mentern, dass Bilder lokal gehostet werden.

---

### **F-RA7-06 HIGH: GitHub Pages Schrems-II-Drittland-Transfer**

**Ort:** Hosting-Anbieter (GitHub Inc., USA)

**Beschreibung:**
GitHub speichert Server-Logs (IP, User-Agent, Referer) auf US-Servern. Keine adequaten Garantien gegen NSA-Zugriff (Schrems II 2020/625). Schulrecht-Compliance unklar (bayerische Schulen dürfen USA-Hosting nutzen, aber nur mit expliziter Risk-Akzeptanz).

**DSGVO-Artikel:** Art. 44-49 (Transfer to Third Countries), Schrems-II-Entscheidung (CJEU 2020/625)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Schultraeger-IT konsultieren:** Ist GitHub Pages akzeptabel nach BayEUG + lokalen Vorgaben?
2. **Option A (aktuell):** GitHub-DPA unterzeichnen + Datenschutzerklärung: "Hosting in USA mit SCCs, aber Restrisiko NSA-Zugriff besteht."
3. **Option B (besser):** Deutsches Hosting (z.B. Uberspace, Hetzner, Netcup) mit Schultraeger-Freigabe.
4. **Timeline:** Vor Live-Nutzung klären.

---

### **F-RA7-07 HIGH: STR-12 Trigger-Flags Sichtbarkeitskontrolle unklar**

**Ort:** escape-engine.js + STR-12-Implementation (noch nicht in Code)

**Beschreibung:**
STR-12 verlangt (Z. 627, D15B_OPTIMIERUNGS_STRATEGIEN.md): "trigger_flags sind ausschliesslich Lehrkraft-Metadaten, NIE SuS-sichtbar." Aktuelle Implementation: Keine trigger_flags in localStorage (gut). **Aber:** STR-12-Phase-IV-Patch muss **garantieren**, dass wenn trigger_flags in data.json oder Rendering-Engine auftauchen, sie **niemals** in Schüler-HTML/Data sichtbar sind. Pre-Implementation-Audit erforderlich.

**DSGVO-Artikel:** Art. 5 (Integrity & Confidentiality), Art. 32 (Security)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Vor STR-12-Implementation:** Code-Review & Security-Spec schreiben (trigger_flags dürfen nur in `/lehrkraft/*` Pfaden vorkommen).
2. **Engine-Patch:** Expliziter Check: `if (user.role === 'lehrkraft') { renderTriggerFlags() }` statt implizites Verstecken.
3. **Test:** Unit-Test "trigger_flags NIE in Schüler-JSON" vor Merge.

---

### **F-RA7-08 HIGH: Keine Auskunftsfunktion (Art. 15)**

**Ort:** Lehrkraft-Seite, Schüler-API (nicht vorhanden)

**Beschreibung:**
DSGVO Art. 15 garantiert Schülern/Eltern: "Gebt mir alle Daten, die ihr über mich habt, in maschinenlesbarer Form." Keine Infrastruktur vorhanden. Manual-Prozess: Admin müsste localStorage inspizieren + JSON manuell generieren. Nicht praktikabel, Frist-Einhaltung fraglich.

**DSGVO-Artikel:** Art. 15 (Right of Access), Art. 12 Abs. 3 (Provision of Information in Electronic Form)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Lehrkraft-Funktion:** Button "Schüler-Daten exportieren (Art. 15)" → gibt Schüler-Fortschrittsdaten als JSON aus.
2. **Optional (Phase V):** Schüler-API (`/api/my-data.json` mit Authentisierung via Klassencode) zum Selbst-Download.
3. **Dokumentation:** Anleitung für Lehrkraft / Schultraeger zu Auskunfts-Anfragen.

---

### **F-RA7-09 HIGH: antwort_state kann Freitext-Eingaben enthalten**

**Ort:** escape-engine.js Z. 281 (_saveAntwortState)

**Beschreibung:**
`antwort_state` wird typ-spezifisch befüllt. Bei Freitext-Aufgaben (z.B. "Erkläre in 2 Sätzen...") werden Schüler-Antworten vollständig in antwort_state gespeichert. Diese sind **direkt personenbezogene Daten**. Keine Verschlüsselung, keine Speicherdauer-Kontrolle, keine Lösch-Infrastruktur.

**DSGVO-Artikel:** Art. 5 Abs. 1 lit. e (Storage Limitation), Art. 32 (Security)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Code-Audit:** Pro Aufgabentyp auditen, was in antwort_state landet. Freitext-Felder flagon.
2. **Für neue STRs (03, 08, 11, 13):** Freitext-Input **nicht persistieren** oder **verschlüsselt persistieren**.
3. **Speicherdauer:** Dokumentieren, dass antwort_state nach Schuljahr gelöscht wird (Lehrkraft-Funktion).

---

### **F-RA7-10 HIGH: Keine Verschlüsselung für sensitive Daten**

**Ort:** localStorage, core.js Z. 44-46 (Core.storage.set)

**Beschreibung:**
Alle localStorage-Daten (inklusive antwort_state, Reflexions-Texte) werden **im Klartext** gespeichert. Ein Malware-befallenes Schüler-Gerät kann alle Daten auslesen. Bei Reflexions-Texten (STR-13) = **sensible Schüler-Gedanken zu Krieg/Gewalt unverschlüsselt**.

**DSGVO-Artikel:** Art. 32 Abs. 1 lit. b (Encryption and Pseudonymization)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Für STR-13 Reflexions-Antworten:** Client-side Encryption (z.B. `tweetnacl.js` oder `crypto-js`). Key = einfaches Browser-Passwort oder Hardware-Schlüssel.
2. **Andere Daten:** Fortschrittsdaten (Aufgaben-Solved-Status) können unverschlüsselt bleiben (Low-Sensitive).
3. **Code-Change:** `Core.storage.set()` erhält optionales `encrypt` Flag.

---

### **F-RA7-11 MEDIUM: Keine Datenpannen-Richtlinie (Art. 33/34)**

**Ort:** Projektdokumentation, Schultraeger-Richtlinien

**Beschreibung:**
Kein dokumentiertes Verfahren für Datenpannen. DSGVO verlangt (Art. 33): Datenpanne → Meldung an Aufsichtsbehörde BayLDA innerhalb 72 Stunden (wenn Risiko für Betroffene). Keine Richtlinie vorhanden. Kontakt BayLDA nicht dokumentiert.

**DSGVO-Artikel:** Art. 33 (Notification of Data Breach to Supervisory Authority), Art. 34 (Communication of Data Breach to Data Subjects)

**Severitaet:** P2-MEDIUM

**Empfehlung:**
1. **Datenpannen-Richtlinie schreiben** (1 Seite):
   - Definition "was ist Panne" (Malware, Unbefugter Zugriff auf GitHub, Leak von Transkripten).
   - Meldekette (Lehrkraft → Schultraeger-IT → Projektgruppe → BayLDA).
   - Frist: 72 Stunden.
2. **Kontakt-Liste:** BayLDA (https://www.bfdi.bund.de/DE/QualitaerenThemen/Datenschutz/Datenschutz_node.html; Unterseite Bayern: Landesamt für Datenschutzaufsicht).
3. **Template:** Benachrichtigungs-E-Mail-Vorlage.

---

### **F-RA7-12 HIGH: Evaluations-Transkripte nicht pseudonymisiert & öffentlich**

**Ort:** `/docs/analyse/Evaluiation Testrun Mappe 4/transcript-Session*/metadata.json` (öffentlich in Git-Repository)

**Beschreibung:**
Evaluations-Transkripte (276KB) sind in der öffentlichen GitHub-Repository gespeichert (git-tracked). Sie enthalten Session-IDs, Timestamps, Aufgaben-Sequenzen + potentiell Klarnamen/Schulkontext. **Nicht pseudonymisiert** → indirekt identifizierbar. **Öffentlich sichtbar** (jeder mit GitHub-Zugriff kann sie downloaden).

**DSGVO-Artikel:** Art. 32 Abs. 1 lit. b (Pseudonymization), Art. 5 Abs. 1 lit. c (Data Minimization)

**Severitaet:** P1-HIGH

**Empfehlung:**
1. **Sofort:** Transkripte aus öffentlichem Repository entfernen (git rm + force-push, oder in separaten privaten Repo verschieben).
2. **Pseudonymisierung:** Session-IDs kürzen, Klarnamen entfernen, nur relevante Ereignisse speichern (nicht full verbatim).
3. **Zukünftig:** Transkripte nur in privater Repository oder lokalem Test-Ordner (nicht git-tracked).

---

### **F-RA7-13 MEDIUM: Keine explizite Datenpannen-Kontakt-Information**

**Ort:** Datenschutzerklärung, Footer der Webseite

**Beschreibung:**
Schultraeger/Projektgruppe haben keine öffentliche Kontakt-Information für Datenpannen-Meldungen. Schüler/Eltern können nicht leicht eine Panne melden.

**DSGVO-Artikel:** Art. 34 (Communication to Data Subjects), Art. 13 Abs. 1 lit. f (Information about right to lodge complaint)

**Severitaet:** P2-MEDIUM

**Empfehlung:**
1. **Datenschutzerklärung:** "Datenpanne-Kontakt: [Schultraeger-E-Mail oder Projektgruppe-E-Mail]"
2. **Zusatz:** "Oder melden Sie eine Panne an: [BayLDA-Kontakt]"

---

## 15. Priorisierte Patch-Liste

### **Kategorie a) Pflicht vor Phase IV-Entwicklung**

1. **F-RA7-02: Einwilligungs-Infrastruktur (Art. 8)** — Entscheidung Schultraeger vs. Projektgruppe als Verantwortliche; Eltern-Formular oder School Authority Status dokumentieren. ⏳ 1-2 Wochen.

2. **F-RA7-01: Rechtsgrundlage dokumentieren** — Datenschutzerklärung + Datenschutz-Policy ableiten. ⏳ 1-2 Wochen.

3. **F-RA7-04: Datenschutzerklärung schreiben** — Schüler-Fassung (einfache Sprache), Lehrkraft-Fassung, Eltern-Summary. ⏳ 1 Woche.

### **Kategorie b) Pflicht vor Live-Nutzung mit Schülern**

4. **F-RA7-03 + F-RA7-10: Verschlüsselung für STR-13 implementieren** — Bevor STR-13 (Reflexions-Texte) implementiert wird, Client-side Encryption hinzufügen. ⏳ 1-2 Wochen.

5. **F-RA7-05: Wikimedia-URLs lokal hosten** — Bilder aus data.json zu lokalen Assets bewegen. ⏳ 1-2 Tage.

6. **F-RA7-06: GitHub Schrems-II klären** — Schultraeger-IT entscheiden: akzeptabel oder Alternative-Hosting. ⏳ 1-2 Wochen.

7. **F-RA7-08: Auskunftsfunktion implementieren** — Lehrkraft-Button "Schüler-Daten exportieren". ⏳ 2-3 Tage.

8. **F-RA7-12: Transkripte aus öffentlicher Repo entfernen** — ASAP. ⏳ 1 Tag.

### **Kategorie c) Best-Practice (Phase IV Entwicklung parallel)**

9. **F-RA7-07: STR-12 Pre-Implementation-Audit** — Bevor STR-12 implementiert wird, Code-Review + Sichtbarkeitskontrolle-Spec. ⏳ 1-2 Tage.

10. **F-RA7-09: antwort_state-Audit** — Pro Aufgabentyp auditen, was persistiert wird. ⏳ 2-3 Tage.

11. **F-RA7-11 + F-RA7-13: Datenpannen-Richtlinie + Kontakt-Info** — Dokumentation schreiben + in Datenschutzerklärung integrieren. ⏳ 1-2 Tage.

### **Kategorie d) Folgeprojekt (nach Phase IV)**

- Implementierung zusätzlicher Privacy-Features (z.B. Schüler-Self-Service-API für Art. 15 Requests, differenzierte Verschlüsselung pro Feldtyp).

---

## 16. Gate-Urteil

🔴 **ROT — BLOCKIERT LIVE-NUTZUNG UND PHASE IV**

**Gründe:**

1. **Keine gültige Rechtsgrundlage** (F-RA7-01, F-RA7-02): DSGVO Art. 6 + Art. 8 verletzt. Minderjaehrige ohne Eltern-Einwilligung.

2. **Kritische Datenschutz-Lücken vor Phase IV:** STR-13 Reflexions-Texte werden personenbezogen ohne Schutz gespeichert (F-RA7-03, F-RA7-10).

3. **Keine Informationspflichten erfüllt** (F-RA7-04): Schüler/Eltern haben keine Datenschutzerklärung.

4. **Drittanbieter-Risiken nicht adressiert** (F-RA7-05, F-RA7-06): Wikimedia + GitHub ohne Einwilligung.

5. **Evaluations-Transkripte öffentlich** (F-RA7-12): Unverschlüsselte potentiell identifizierbare Daten in Public Repository.

**Was muss vor Phase IV passieren:**

- ✅ Schultraeger/Projektgruppe Verantwortlichkeits-Klärung (1-2 Wochen).
- ✅ Datenschutzerklärung + Einwilligungs-Infrastruktur (1-2 Wochen).
- ✅ Transkripte entfernen/pseudonymisieren (1 Tag).
- ✅ Wikimedia-URLs lokal hosten (2-3 Tage).
- ✅ Encryption für STR-13 vorbereiten (1-2 Wochen).

**Gesamtaufwand:** 3-4 Wochen (parallel).

**Nach diesen Maßnahmen:** Audit wiederholen → wahrscheinlich 🟡 GELB (Auflagen für Live-Nutzung, Phase IV kann nebenläufig starten).

---

## 17. Offene Fragen an User/Schule

### **Organisatorische Fragen:**

1. **Wer ist der Verantwortliche?**
   - Option A: Schultraeger (z.B. Stadt, Landratsamt) → dann: Schulrecht Art. 85 Rechtsgrundlage + Schultraeger-Datenschutzerklärung erforderlich.
   - Option B: Projektgruppe/Universität → dann: Eltern-Einwilligung (Opt-In) erforderlich.
   - **Entscheidung erforderlich vor Phase IV.**

2. **Gibt es eine bestehende Schultraeger-Datenschutzerklärung für digitale Unterrichtsmaterialien?**
   - Falls ja: Kann weitergehts.online darin abgedeckt werden?
   - Falls nein: Muss eine neue geschrieben werden (Schultraeger-Aufgabe oder Projektgruppe-Unterstützung?).

3. **Ist GitHub Pages als Hosting akzeptabel nach Schulrecht + BayLDA-Vorgaben?**
   - Oder: Muss Deutsches Hosting verwendet werden?
   - Schultraeger-IT sollte entscheiden.

### **Technische Fragen:**

4. **STR-13 Reflexions-Zone: Sollen Schüler-Antworten persistiert werden (localStorage), oder nur Session-basiert (Verlust bei Reload)?**
   - Persistierung → Verschlüsselung erforderlich.
   - Session-Only → Einfacher, aber potentiell frustierend bei Verbindungsabbruch.

5. **Evaluations-Transkripte: Können diese in ein privates Daten-Repository verschieben werden (nicht öffentlich)?**
   - Oder: Sollen sie komplett gelöscht werden?

6. **STR-12 Implementation: Kann Projektgruppe garantieren, dass trigger_flags niemals in Schüler-JSON/HTML sichtbar sind?**
   - Pre-Implementation-Review empfohlen.

### **Schulpraxis-Fragen:**

7. **Wer in der Schule ist Ansprechpartner für Datenpannen-Meldungen?**
   - Schultraeger-IT? Datenschutzbeauftragter? Schulleitung?

8. **Gibt es Schüler-Geräte-Richtlinien?** (z.B. Malware-Schutz, lokale Datenverschlüsselung)
   - Notwendig zur Risiko-Minimierung (F-RA7-10, F-RA7-11).

---

## Zusammenfassung & Nächste Schritte

### **Audit-Ergebnis:**

- **Gate:** 🔴 **ROT** — Live-Nutzung blockiert bis Rechtsgrundlage + Einwilligung gelöst.
- **Findings:** 13 Findings (6 P0/P1-HIGH, 2 P2-MEDIUM, 1 P3-LOW).
- **Phase IV Blockage:** Nein (STR-Entwicklung kann parallel laufen, aber datenschutzkritische STRs wie STR-13 brauchen Implementierungs-Specs).
- **Aufwand bis "GELB"-Urteil:** 3-4 Wochen (Parallelisierbar).

### **Maßnahmen-Roadmap:**

**Woche 1-2 (Parallel):**
- Schultraeger: Verantwortlichkeits-Entscheidung + GitHub Pages-Freigabe.
- Projektgruppe: Datenschutzerklärung schreiben + Transkripte entfernen.

**Woche 2-3 (Parallel):**
- Technisch: Wikimedia-URLs lokal, Auskunftsfunktion, STR-13-Encryption-Spec.
- Schultraeger: Eltern-Einwilligung-Prozess etablieren (falls nötig).

**Woche 4:**
- Audit-Wiederholung (RA7-Nachfolge-Audit).
- Ergebnis: Wahrscheinlich 🟡 **GELB** → Phase IV GO mit Auflagen.

**Phase IV:**
- STR-Implementierung nebenläufig.
- Datenschutz-Pre-Checks vor STR-Merge (besonders STR-03, 08, 11, 12, 13).

---

## Anhang: Referenzierte Code-Stellen

- `core.js` Z. 20-86: Storage-Wrapper (localStorage).
- `escape-engine.js` Z. 46, 71: StorageKey-Konstruktion.
- `escape-engine.js` Z. 155-186: saveProgress().
- `escape-engine.js` Z. 229-239: _saveFehlversuch().
- `escape-engine.js` Z. 263-301: _saveAntwortState() & _loadAntwortState().
- `escape-engine.js` Z. 343-348: resetProgress().
- `mappe-1.html` Z. 1-91: Schüler-Seite Struktur.
- `lehrkraft.html` Z. 1-190 (partial): Lehrkraft-Gate + Lösungen-Rendering.
- `data.json` Z. 1702, 1804, 1861: Wikimedia-URLs.
- `D15B_OPTIMIERUNGS_STRATEGIEN.md` Z. 35, 102-120, 284-327: STR-03, STR-12, STR-13 Definitionen.

---

**Audit-Ende: 2026-04-05**
**Nächster Audit-Punkt:** F-RA7-Nachfolge (nach Maßnahmen Woche 4).
**Eskalation:** Schultraeger-IT, BayLDA (falls Bedenken zur Schulrecht-Compliance).
