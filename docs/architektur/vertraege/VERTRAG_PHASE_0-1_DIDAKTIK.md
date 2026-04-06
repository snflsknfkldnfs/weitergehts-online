# VERTRAG Phase 0.1 — AGENT_DIDAKTIK (Didaktischer Rahmen)

**Version:** v1.1 (Phase IV Architektur-Evaluation)
**Datum:** 2026-04-06
**Extrahiert aus:** ORCHESTRATOR.md §0.1, WORKFLOW_v4.md §3/§4, Game-1 DIDAKTIK_RAHMEN (Ist-Format)
**Kanonisch fuer:** Phase 0.1 jedes neuen Escape-Games

---

## 1. Rolle

AGENT_DIDAKTIK erzeugt den didaktischen Rahmen fuer ein Escape-Game. Das Artefakt ist die **inhaltliche Blaupause** — es definiert, WAS gelernt wird (KE, Teilziele), WIE die Inhalte auf Mappen verteilt werden (Grobstruktur, Progression), und WELCHE didaktischen Prinzipien gelten (Ethik, Differenzierung, Narrativ).

**Abgrenzung:** AGENT_DIDAKTIK entscheidet ueber Lernziele und Struktur. Er entscheidet NICHT ueber konkrete Materialtypen (→ AGENT_MATERIAL, Phase 1), konkrete Fakten/Quellen (→ AGENT_INHALT, Phase 0.2) oder konkrete Aufgaben (→ AGENT_RAETSEL, Phase 2.2).

---

## 2. Input

| Parameter | Quelle | Pflicht |
|---|---|---|
| thema | User | Ja |
| lehrplanbezug | User (LehrplanPLUS-Referenz) | Ja |
| jahrgangsstufe | User | Ja |
| mappen_anzahl | User (3-6) | Ja |
| schwierigkeit | User (optional, Default: "Basis") | Nein |
| vorgaenger_game | PM (falls Sequenz, z.B. Game 1 → Game 2) | Nein |

**Wenn `vorgaenger_game` vorhanden:** DIDAKTIK_RAHMEN des Vorgaengers lesen. Inhaltliche Anschlussfaehigkeit pruefen: Mappen-1-Einstieg soll an letzte Mappe des Vorgaengers anknuepfen. KE-Ueberschneidungen dokumentieren (nicht duplizieren).

---

## 3. Output: DIDAKTIK_RAHMEN_[game-id].md

### Pflicht-Sektionen

| Sektion | Inhalt | Pruefung |
|---|---|---|
| **Lehrplanbezug** | Primaer-/Sekundaer-Lernbereiche, KE-Tabelle (ID, Wortlaut, AFB), Inhalte zu den Kompetenzen, Gegenstandsbereiche | QD1, QD2 |
| **Lernziele** | Stundenziel (1 Satz, AFB II-III), Teilziele (1 pro Mappe, mit AFB, Erkennbarkeitskriterium) | QD3 |
| **KE-Matrix** | Mappe × KE Zuordnung (Hauptzuordnung ■, Nebenzuordnung ■), Legende | QD4 |
| **Mappen-Grobstruktur** | Pro Mappe: Thematischer Schwerpunkt, Zentrale Erkenntnis, KE-Schwerpunkt, Gegenstandsbereich | QD5 |
| **Schwierigkeitskurve** | Pro Mappe: AFB-Schwerpunkt, Prozessbezogene Kompetenz, Begruendung | QD6 |
| **Ethische Hinweise** | Multiperspektivitaet, Kontroversitaet, Ueberwaetigungsverbot, Sensibilitaet, Aktualitaetsbezug (je nach Thema) | QD7 |
| **Didaktische Strukturvorgaben** | Artikulationsstruktur (Einstieg/Erarbeitung/Sicherung), Narrativ-Rahmen, Differenzierungshinweise (3-Stufen-Tipp-System) | QD8 |

### Optionale Sektionen

| Sektion | Wann |
|---|---|
| Vorgaenger-Anschluss | Wenn `vorgaenger_game` vorhanden |
| Fach-spezifische Prinzipien | Wenn das Thema besondere didaktische Anforderungen hat (z.B. Quellenarbeit bei Geschichtsthemen) |

---

## 4. Q-Gate

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QD1 | Lehrplan-Abdeckung | Jede genannte KE ist im Fachlehrplan verifizierbar. Keine erfundenen KE-IDs. | BLOCKER |
| QD2 | KE-Vollstaendigkeit | Alle themenrelevanten KE des Lernbereichs sind beruecksichtigt (nicht nur die offensichtlichen). Bei themenuebergreifenden Lernbereichen: explizit dokumentieren, welche KEs fuer Folge-Games reserviert werden (Sektion "Scope-Abgrenzung"). | HIGH |
| QD3 | Teilziel-Qualitaet | Jedes Teilziel hat AFB-Angabe + Erkennbarkeitskriterium ("was daran erkennbar wird, dass..."). Kein Teilziel ist reine Inhaltsangabe. | HIGH |
| QD4 | KE-Matrix-Konsistenz | Jede KE hat mindestens eine Hauptzuordnung (■). Keine Mappe ohne KE-Zuordnung. Keine KE ohne Mappe. | BLOCKER |
| QD5 | Mappen-Balance | Keine Mappe ist thematisch leer oder ueberladung. Zentrale Erkenntnis ist ein Satz, kein Absatz. Gegenstandsbereich zugeordnet. | HIGH |
| QD6 | AFB-Progression | Schwierigkeitskurve steigt monoton oder ist begruendet nicht-monoton. Mappe 1 beginnt maximal bei AFB II. | MEDIUM |
| QD7 | Ethik-Abdeckung | Mindestens Multiperspektivitaet + Ueberwaetigungsverbot sind adressiert. Kein Thema ohne ethische Reflexion. | HIGH |
| QD8 | Strukturvorgaben vollstaendig | Artikulationsstruktur, Narrativ-Rahmen und Differenzierungshinweise sind vorhanden. Narrativ-Rahmen ist altersgerecht und nicht trivial. | MEDIUM |
| QD9 | Sequenzierbarkeit der Mappen | Jede Mappe hat einen thematisch abgeschlossenen Schwerpunkt, der intern in mehrere Materialien zerlegbar ist (Phase-1.5-Kompatibilitaet). Kein chronologisch-thematisches Verschraenkungsproblem: Wenn eine Mappe Teile zweier Chronologien enthaelt, muessen diese trennbar sein. | HIGH |
| QD10 | STRUKTUR-FREEZE-Tauglichkeit | Jede Mappe-Grobstruktur muss hinreichend praezise sein, um als Grundlage fuer ein TAFELBILD (Phase 0.4) zu dienen, das als STRUKTUR-FREEZE die gesamte nachfolgende Produktion steuert. "Thematischer Schwerpunkt" und "Zentrale Erkenntnis" muessen so formuliert sein, dass ein Hefteintrag daraus ableitbar ist. | HIGH |

**Gate-Urteil:** PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung.

**User-Validierung:** PFLICHT nach Q-Gate. Lehrkraft prueft: Mappen-Aufteilung, KE-Matrix, Progression, Narrativ.

---

## 5. Konventionen

- **Sprache:** Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)
- **KE-IDs:** Format `GPG[Jg]_LB[N]_K_[NN]` (aus Fachlehrplan)
- **Teilziel-Format:** "Die SuS [Operator] [Inhalt], indem sie [Handlung], was daran erkennbar wird, dass [Beobachtbares]."
- **Game-ID:** Kebab-case, max 40 Zeichen, z.B. `gpg-erster-weltkrieg-ende`
- **Dateiname:** `DIDAKTIK_RAHMEN_[game-id].md`
- **Ablageort:** `docs/agents/artefakte/`
