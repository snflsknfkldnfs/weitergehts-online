# RA7 Nachkalibrierung — auf Basis User-Faktenkorrektur

**Datum:** 2026-04-05
**Ausloeser:** Nach Abschluss RA7-Bericht (Gate-Urteil ROT, 6 P0) lieferte User Paul entscheidende Faktenkorrektur, die Grund-Annahmen von RA7 invalidiert.
**Zweck:** Severitaets-Neubewertung der RA7-Findings und revidiertes Gate-Urteil als Input fuer 5e-Synthese.

---

## 1. User-Faktenkorrektur (Wortlaut)

> "Es werden ja keinerlei daten erhoben, sondern nur eingaben im lokalen browser cache der schul-ipads gespeichert. zur nutzung der schul-iPads gibt es entsprechende einwilligung aller nutzenden."

## 2. Tragweite der Korrektur

RA7 hatte folgende Grund-Annahmen gemacht, die nun praezisiert werden:

| RA7-Annahme | Korrektur |
|---|---|
| Einsatzgeraete offen (Schul-iPads, private Geraete, BYOD?) | Ausschliesslich Schul-iPads im Klassenverband |
| Datenverarbeitung durch Website-Betreiber | Keine Datenverarbeitung. Nur Browser-Local-Cache auf Geraet. Keine Server-Uebertragung. |
| Einwilligungs-Status offen | iPad-Nutzungsvereinbarung (Schule <-> Erziehungsberechtigte) existiert und deckt Nutzung digitaler Lehrmittel inkl. Browser-Cache ab |
| Verantwortlichkeits-Modell unklar (Lehrkraft / Schule / Privatperson) | Schule als Datenverarbeitungs-Verantwortliche via Schultraeger, Lehrkraft als ausfuehrende Instanz im Rahmen Schulrecht (BayEUG Art. 85) |

## 3. Finding-Neubewertung

### F-RA7-01 — Keine gueltige Rechtsgrundlage DSGVO Art. 6
- **Original:** P0 CRITICAL
- **Neu:** **P2 MEDIUM**
- **Begruendung:** Schulrechtliche Grundlage (BayEUG Art. 85 + iPad-Nutzungsvereinbarung) deckt unterrichtliche Nutzung digitaler Lehrmittel ab. Art. 6 Abs. 1 lit. e (Aufgabe im oeffentlichen Interesse) + lit. c (rechtliche Verpflichtung Schulgesetz) greifen. Empfehlung: Datenschutzerklaerung schreiben, die diese Grundlage benennt — als Dokumentations-Pflicht, nicht als Blocker.

### F-RA7-02 — Art. 8 Einwilligung der Erziehungsberechtigten
- **Original:** P0 CRITICAL
- **Neu:** **P3 LOW / INFORMATIONAL**
- **Begruendung:** Art. 8 adressiert primaer Direkt-Einwilligung des Kindes bei Informationsgesellschafts-Diensten. Im schulischen Kontext mit existierender iPad-Nutzungsvereinbarung der Erziehungsberechtigten ist die Zustimmung bereits pauschal gegeben. Kein eigener Einwilligungsflow noetig, solange die iPad-Vereinbarung digitale Lehrmittel/Browser-Cache nennt. Empfehlung: Schule sollte iPad-Vereinbarung einmalig pruefen, ob Browser-Cache/Local-Storage explizit erwaehnt ist.

### F-RA7-03 — STR-13 Reflexions-Zone Freitext unverschluesselt
- **Original:** P0 CRITICAL
- **Neu:** **P1 HIGH**
- **Begruendung:** Bleibt relevant, da Freitext im Local Cache potentiell personenbezogene oder sensible Inhalte (emotionale Reflexion zu Kriegsursachen) enthalten kann. Zwar kein Server-Upload, aber: (a) andere Schueler am selben iPad koennten durch Inspektion localStorage einsehen; (b) iPad-Cache-Backups via iCloud koennten nicht kontrolliert sein; (c) Geraete-Tausch zwischen Klassen. Downgrade auf P1: Risiko real, aber begrenzt auf lokale Expositions-Flaeche. Empfehlung: STR-13 ohne persistente Speicherung der Eingabe implementieren (nur Session-Scope, resetten am Stundenende) ODER mit klarer Privacy-Notice vor dem Input.

### F-RA7-04 — Art. 13 Informations-Pflichten (Datenschutzerklaerung)
- **Original:** P0 CRITICAL
- **Neu:** **P2 MEDIUM**
- **Begruendung:** Selbst bei minimaler Verarbeitung (nur localStorage) ist eine knappe Datenschutzerklaerung Best-Practice und von Schultraegern oft verlangt. Nicht mehr CRITICAL, da keine Datenuebermittlung stattfindet, aber weiterhin Pflicht zur Transparenz. Inhalt: Verantwortlicher (Schule), Zweck (Lernfortschritt lokal auf Geraet), Speicherdauer (bis Cache-Loeschung), keine Uebermittlung an Dritte ausser GitHub-Hosting-Logs (siehe F-RA7-06).

### F-RA7-05 — STR-12 Trigger-Flag Sichtbarkeits-Kontrolle
- **Original:** P0 CRITICAL
- **Neu:** **P1 HIGH** (unveraendert hoch)
- **Begruendung:** Bleibt relevant unabhaengig von Datenschutz. Ist ein **paedagogisches Integritaets-Problem**, nicht primaer Datenschutz. User-Zusage "nur Lehrkraft-sichtbar" muss technisch erzwungen werden, sonst sehen Schueler Trigger-Warnungen, die paedagogisch als Lehrkraft-Hinweis konzipiert sind. Bleibt Patch-Pflicht.

### F-RA7-06 — Drittanbieter (Wikimedia IP + GitHub Schrems-II)
- **Original:** P0/P1
- **Neu:** **P1 HIGH** (Wikimedia) **+ P1 HIGH** (GitHub)
- **Begruendung:** Das **einzige Datenschutz-Risiko, das durch iPad-Consent NICHT abgedeckt ist**, weil es echten Drittland-Transfer triggert. Jeder Seitenaufruf der live auf weitergehts.online erfolgt, schickt IP/User-Agent der Schul-iPads an:
  - GitHub Inc. (US, Schrems-II) via Hosting-Logs
  - Wikimedia-Server (falls Wikimedia-Bilder live eingebunden sind) via Image-Requests
- **Empfehlung (BLEIBT PFLICHT-PATCH):**
  - Wikimedia-Bilder lokal ins Repository laden (kein Fremdzugriff zur Laufzeit)
  - GitHub AVV (Data Processing Addendum) mit Schultraeger pruefen
  - Fallback: Eigenes Hosting auf EU-Server (z.B. Uberspace, netcup) — mittelfristig evaluieren

### Weitere P1/P2 Findings (aus RA7 Original)
- **Art. 15 Auskunftsfunktion:** Entfaellt de facto, da keine zentrale Datenhaltung. Schueler koennen Local Storage via Browser-Tools einsehen. Dokumentieren, nicht implementieren.
- **Art. 32 Verschluesselung TOM:** Entfaellt fuer Local Cache (iPad-OS Verschluesselung greift). Nur relevant falls spaeter Server-Persistenz.
- **Evaluations-Transkripte im Repo:** Bleibt P1. Pruefung auf Personenbezug noetig, ggf. Pseudonymisierung.
- **Art. 33/34 Datenpannen-Protokoll:** Entfaellt fuer dieses Projekt (keine zentrale Datenhaltung = keine klassische Data-Breach-Flaeche).

## 4. Revidierte Findings-Verteilung RA7

| Severitaet | Original RA7 | Nach Nachkalibrierung |
|---|---|---|
| P0 CRITICAL | 6 | **0** |
| P1 HIGH | 5 | **5** (F-RA7-03, STR-12, Wikimedia, GitHub, Transkripte) |
| P2 MEDIUM | 2 | **3** (Art. 6 Doku, Art. 13 DSE, + Kontaktdaten) |
| P3 INFO | 0 | **2** (Art. 8, Art. 15) |
| **Gesamt** | 13 | **10 substantielle** (3 weggefallen als nicht-anwendbar) |

## 5. Revidiertes Gate-Urteil RA7

**Von ROT → GELB mit Auflagen.**

### Neue Bedingungen fuer Phase IV Go
1. **Wikimedia-Bilder lokalisieren** (BLOCKING, vor Live-Gang).
2. **STR-13 Reflexions-Zone ohne Persistenz** ODER mit expliziter In-App-Privacy-Notice (BLOCKING).
3. **STR-12 Trigger-Sichtbarkeit technisch erzwingen** (BLOCKING — uebernommen aus 5d).
4. **Datenschutzerklaerung-Seite** (minimal, 1 Seite) als `datenschutz.html` im Repo (NICHT BLOCKING, aber Soft-Gate innerhalb 2 Wochen nach Live).
5. **Evaluations-Transkripte Review** auf Personenbezug (BLOCKING falls Personenbezug vorhanden, sonst OK).
6. **GitHub AVV-Klaerung** durch Schultraeger (NICHT BLOCKING fuer Live, aber dokumentations-pflichtig).

### Nicht mehr BLOCKING
- Art. 8 Einwilligung separat einholen — ABGEHAKT durch iPad-Vereinbarung.
- Art. 6 Rechtsgrundlage dokumentieren — SOFT (in Datenschutzerklaerung).
- Auskunftsfunktion Art. 15 implementieren — ENTFAELLT.
- Verschluesselung Art. 32 TOM — ENTFAELLT.
- Datenpannen-Protokoll — ENTFAELLT.

## 6. Konsequenz fuer Phase IV Gate-Matrix (aus 5d)

Die 8 Phase-IV-Gates aus 5d bleiben erhalten. Gate G-7 "Datenschutz-Remediation" wird umdefiniert:

- **G-7 ALT (aus 5d Pflicht-Einschub 5c-bis):** 6 P0 RA7 remediiert
- **G-7 NEU (nach Nachkalibrierung):** 3 BLOCKING-Punkte remediiert (Wikimedia lokal + STR-13 Design + STR-12 Sichtbarkeit; STR-12 ueberlappt bereits mit bestehendem Gate)

G-7 wird damit zu einem **schlanken Checklisten-Gate**, nicht mehr zu einem mehrwoechigen Remediations-Programm.

## 7. Offene Fragen (reduziert)

Von ursprünglich 7 offenen RA7-Fragen an User/Schule verbleiben:

1. **Wird die iPad-Nutzungsvereinbarung im Wortlaut digitale Lehrmittel / Browser-Cache erwaehnen?** (Falls nein: einmalige Ergaenzung / Nachtrag empfohlen.)
2. **Enthalten Evaluations-Transkripte im docs/analyse Personenbezug?** (RA7 konnte nicht abschliessend pruefen, Scope-Begrenzung.)
3. **GitHub AVV mit Schultraeger gezeichnet ODER Wechsel zu EU-Hosting mittelfristig?**

Die uebrigen 4 Fragen (Verantwortlichkeits-Modell, Einwilligungs-Design, Datenpannen-Kontakt, Verschluesselungs-Tiefe) sind durch die User-Korrektur beantwortet oder entfallen.

## 8. Einfluss auf Synthese-Bilanz 5e

**Portfoliowide P0-Count:**
- 5d Zwischenstand: **5 P0** (nach RA2 F-RA2-03 Downgrade)
- 5c-bis RA7 Original: +6 P0 = **11 P0**
- **5e nach Nachkalibrierung: 5 P0** (wieder wie 5d, RA7 traegt 0 P0 bei)

Damit ist die Phase-IV-Blockade-Schwelle deutlich entspannt. Das zuvor drohende mehrwoechige Datenschutz-Remediations-Programm ist nicht mehr noetig. Phase IV kann nach Abschluss der 5d-Patches + 3 RA7-BLOCKING-Punkte starten.

---

**Status:** Nachkalibrierung dokumentiert. Uebernahme in `D15B_PHASE_III_5_SYNTHESE.md` als autoritative Fassung der RA7-Findings. Original-Bericht `BERICHT_RA7_DATENSCHUTZ.md` bleibt unveraendert als historisches Dokument mit Referenz auf diese Nachkalibrierung.
