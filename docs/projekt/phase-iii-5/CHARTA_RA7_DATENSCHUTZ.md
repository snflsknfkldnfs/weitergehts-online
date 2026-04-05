# CHARTA RA7 — Datenschutz-Auditor

**Rolle:** RA7 Datenschutz
**Phase:** III.5c-bis (nachtraegliche Sub-Phase, eingeschoben zwischen 5d und 5e)
**Grund:** 5d Blindspot B1 (Datenschutz CRITICAL) — von allen 6 bisherigen RAs nicht abgedeckt. Nutzergruppe: Minderjaehrige an Schule. Juristische und reputationelle Pflicht.

---

## 1. Auftrag

RA7 prueft das Projekt "weitergehts.online" (Escape-Game-Infrastruktur + geplante 20 STR der Phase IV) auf Datenschutz-Konformitaet unter DSGVO und bayerischem/deutschem Schulrecht. Ziel ist eine vollstaendige Inventur personenbezogener Datenverarbeitung, Identifikation von Compliance-Luecken und priorisierte Patch-Liste als Input fuer 5e und Phase IV.

## 2. Scope (In-Scope)

- **LocalStorage-Inhalte** (core.js Z. 20-86, escape-engine.js Z. 46, 155-302, 432-495): Fortschritts-Daten, Antwort-States, Fehlversuche, Tipp-Nutzung.
- **Personenbezug:** Ist der storageKey oder Inhalt geeignet, einen Nutzer (direkt oder indirekt) zu identifizieren? (Name, Schueler-ID, Klasse, device fingerprint).
- **Einwilligungs-Mechanismen** (derzeit keine vorhanden — Pruefung ob erforderlich).
- **Drittanbieter / Third-Party-Requests:** Welche externen Ressourcen laedt die Seite? (Fonts, CDN, Analytics). Evidenz: in production escape-games/ keine externen CDNs/Fonts gefunden. PROTOTYP_v3-5_LAYOUT.html (docs/analyse) nutzt Google Fonts — nur Prototyp, nicht live-relevant.
- **GitHub Pages Hosting** (weitergehts.online): Server-Logs, IP-Adressen, Referrer durch GitHub. DSGVO-Verantwortlichkeit.
- **STR-Auswirkungen:** Erweitern neue STR die Datenerhebung? Insbesondere:
  - STR-12 Trigger-Warnungen (sichtbar? gespeichert?)
  - STR-03 Feedback-Schema `{typ, text, ebene}` — enthaelt Text vom Nutzer?
  - STR-13 Reflexions-Zone (Template) — potentiell freier Text-Input von Schuelerinnen und Schuelern?
  - STR-24 Mappen-Q-Gate (Admin-Checklist) — gespeichert? wo?
  - STR-08/11 Aufgabentyp-Erweiterungen — neue User-Input-Felder?
- **Minderjaehrigen-Schutz:** DSGVO Art. 8 Einwilligungs-Regeln unter 16 Jahren. Pflicht-Informationen in "einfacher Sprache" Art. 12 Abs. 1.
- **Trigger-Warnungen (STR-12) ethische Dimension:** Sichtbarkeit nur Lehrkraft vs. Schuelerinnen und Schueler.
- **Zugriffslogik Lehrkraft-Seite** (escape-games/template/lehrkraft.html + gpg-erster-weltkrieg-ursachen/lehrkraft.html): Enthaelt sie Metadaten, die personenbezogen oder paedagogisch-sensibel sind?
- **Screenshots / Bildmaterial** in docs/analyse: Sind Schuelerinnen und Schueler auf Bildern erkennbar? (Fotografische Daten = besondere Kategorie).
- **Evaluations-Transkripte** (docs/analyse/Evaluiation Testrun Mappe 4/transcript-Session*): Enthalten sie personenbezogene Daten? Metadata.json Pruefung.

## 3. Out-of-Scope

- Einzelne Engine-Rendering-Bugs (abgedeckt RA3).
- Allgemeine Content-Qualitaet (abgedeckt RA1/RA6).
- Performance/Accessibility (ausser wenn sie Datenschutz tangieren).
- Hosting-Anbieter-Wechsel (nur Empfehlung, keine Umsetzung).
- Rechtliche Verbindlichkeit — RA7 liefert Einschaetzung, KEINE Rechtsberatung. Finale Entscheidung beim User/Schulleitung/Datenschutzbeauftragten.

## 4. Pflicht-Sektionen im Bericht

1. **Zusammenfassung (Executive Summary)** — 5-10 Zeilen, Gate-Urteil (GRUEN/GELB/ROT).
2. **Datenerhebungs-Inventur** — Tabelle: Datenkategorie, Zweck, Rechtsgrundlage DSGVO Art. 6, Speicherort, Speicherdauer, Empfaenger, Betroffene.
3. **Personenbezug-Analyse** — Pro LocalStorage-Schluessel: ist der Inhalt personenbezogen? (direkt/indirekt/pseudonym/anonym). Begruendung.
4. **Rechtsgrundlagen-Pruefung** — DSGVO Art. 6 Abs. 1 lit. a-f durchgehen. Bei Minderjaehrigen Art. 8.
5. **Drittanbieter-Analyse** — Alle externen Ressourcen (Fonts, CDN, Analytics). GitHub Pages Hosting (Microsoft/GitHub US-Firma, Schrems-II-relevant).
6. **STR-Impact-Analyse** — Pro der 20 aktiven STR: Erweitert es Datenerhebung? Pflicht-Check fuer STR-12/03/13/08/11/24.
7. **Einwilligungs-Pflicht-Pruefung** — Ist Einwilligung noetig? Von wem (Schueler/Erziehungsberechtigte/Schule)? Alternativen (Rechtsgrundlage Schulrecht Art. 85 BayEUG oder vergleichbar).
8. **Informations-Pflichten DSGVO Art. 13** — Welche Pflicht-Angaben fehlen? (Verantwortlicher, DPO, Zwecke, Speicherdauer, Rechte).
9. **Betroffenenrechte** — Auskunft, Loeschung, Berichtigung, Widerspruch. Ist resetProgress() ausreichend? Wie wird Auskunft erteilt?
10. **Technische und organisatorische Massnahmen (TOM)** — Verschluesselung (keine, localStorage plaintext), Zugriffsschutz, Pseudonymisierung. DSGVO Art. 32.
11. **Datenpannen-Protokoll** — Gibt es Prozess fuer Art. 33/34? (vermutlich nein).
12. **Auftragsverarbeitung** — GitHub Pages als Auftragsverarbeiter? AVV notwendig?
13. **Risiko-Matrix** — Finding × Wahrscheinlichkeit × Schaden.
14. **Findings** — Nummeriert F-RA7-01..N. Jedes Finding: Ort, Beschreibung, DSGVO-Artikel, Severitaet (P0/P1/P2/P3), Empfehlung.
15. **Priorisierte Patch-Liste** — Kategorien: (a) Pflicht vor Phase IV, (b) Pflicht vor Live-Nutzung mit Schuelerinnen und Schuelern, (c) Best-Practice, (d) Folgeprojekt.
16. **Gate-Urteil** — GRUEN (keine Blocker) / GELB (Auflagen) / ROT (Blocker vor jeder Nutzung).
17. **Offene Fragen an User/Schule** — Welche Informationen muessen vom User bereitgestellt werden (z.B. Schultraeger-Datenschutzerklaerung, bestehende Einwilligungs-Praxis)?

## 5. Severitaets-Definitionen (adaptiert fuer Datenschutz)

- **P0 CRITICAL:** DSGVO-Verstoss mit Bussgeld-Risiko oder Gefaehrdung von Minderjaehrigen. Blockiert Live-Nutzung UND Phase IV.
- **P1 HIGH:** Compliance-Luecke, die vor Live-Nutzung geschlossen werden muss, Phase-IV-Entwicklung aber nicht blockiert.
- **P2 MEDIUM:** Best-Practice-Abweichung, keine Rechtsverletzung, Empfehlung zur Behebung.
- **P3 LOW:** Dokumentations-/Transparenz-Verbesserung.

## 6. Evidenz-Zugriff

- `docs/projekt/phase-iii-5/EVIDENZ_BUNDLE_RA7.md` (Datei-Liste)
- `assets/js/core.js` (Storage-Wrapper)
- `assets/js/escape-engine.js` (Progress/State-Logik, ~4000 Zeilen)
- `escape-games/gpg-erster-weltkrieg-ursachen/*.html` (produktive Mappen)
- `escape-games/template/*.html` (Template)
- `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` (20 aktive STR, Scope)
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (Kontext)
- `docs/projekt/phase-iii-5/VERIFIKATION_III_5d.md` (Blindspot-Entscheidung B1, Konsolidierte Verdikte)

## 7. Rollen-Isolation

RA7 arbeitet STRIKT im Datenschutz-Scope. KEINE Befunde zu:
- Engine-Bugs (→ RA3)
- Scope-Drift im didaktischen Sinn (→ RA1)
- Dependencies (→ RA2)
- Vertraege (→ RA4)
- Konvergenz (→ RA5)
- Katalog-Kollision (→ RA6)

Falls RA7 Auffaelligkeiten in anderen Bereichen findet, notiert RA7 diese in Sektion "Offene Fragen" als Hinweis an RA5 Meta, ohne Verdikt zu setzen.

## 8. Output-Pfad

`docs/projekt/phase-iii-5/BERICHT_RA7_DATENSCHUTZ.md`

## 9. Mindest-Umfang

400-700 Zeilen. 17 Pflicht-Sektionen vollstaendig. Mindestens 6 Findings. Risiko-Matrix zwingend. Gate-Urteil zwingend.
