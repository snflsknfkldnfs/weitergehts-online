# VERTRAG Phase 0.1 — AGENT_DIDAKTIK (Didaktischer Rahmen)

**Version:** v1.2 (Welle-1-Patches: Eskalationspfade, Ordnungsheuristiken)
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
| QD9 | Sequenzierbarkeit der Mappen | Jede Mappe hat einen thematisch abgeschlossenen Schwerpunkt, der intern in mehrere Materialien zerlegbar ist (Phase-1.5-Kompatibilitaet). Kein Ordnungs-Verschraenkungsproblem: Wenn eine Mappe Teile zweier Ordnungsdimensionen enthaelt (z.B. zwei Zeitstraenge, zwei Raumebenen, zwei Kategorie-Cluster), muessen diese trennbar sein. | HIGH |
| QD10 | STRUKTUR-FREEZE-Tauglichkeit | Jede Mappe-Grobstruktur muss hinreichend praezise sein, um als Grundlage fuer ein TAFELBILD (Phase 0.4) zu dienen, das als STRUKTUR-FREEZE die gesamte nachfolgende Produktion steuert. "Thematischer Schwerpunkt" und "Zentrale Erkenntnis" muessen so formuliert sein, dass ein Hefteintrag daraus ableitbar ist. | HIGH |

**Gate-Urteil:** PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung (max. 1 Iteration). Wenn nach Iteration nicht loesbar: Eskalationspfad (siehe §4a).

**User-Validierung:** PFLICHT nach Q-Gate. Lehrkraft prueft: Mappen-Aufteilung, KE-Matrix, Progression, Narrativ.

---

## 4a. Eskalationspfade

### Grundsatz

AGENT_DIDAKTIK darf bei BLOCKER- oder HIGH-Scheitern nach 1 Nachbesserungsversuch autonom einen Fallback waehlen. Jeder Fallback MUSS:
1. Im Output als `[FALLBACK: Typ — Begruendung]` markiert sein (Audit-Spur)
2. Das nachgelagerte Q-Gate erneut durchlaufen (kein stiller Fallback)
3. In der Sektion "Eskalations-Log" des DIDAKTIK_RAHMEN dokumentiert werden

### Eskalationstypen

| Typ | Ausloeser | Agent-Aktion | Q-Gate-Konsequenz |
|---|---|---|---|
| **E-D1 Mappen-Rebalance** | QD5 FAIL (Mappen-Balance) nach 1 Iteration | Agent verschiebt KE/Schwerpunkte zwischen Mappen. Dokumentiert Begruendung. | Volles Q-Gate auf betroffene Mappen (QD4, QD5, QD9, QD10) |
| **E-D2 KE-Scope-Reduktion** | QD2 FAIL (KE-Vollstaendigkeit) — nicht alle KE integrierbar | Agent dokumentiert welche KE als "Folge-Game-Reserve" markiert werden und warum. | QD2 mit angepasstem Scope neu pruefen. User-Validierung PFLICHT fuer Scope-Reduktion |
| **E-D3 Progressions-Anpassung** | QD6 FAIL (AFB-Progression nicht monoton) | Agent begrendet nicht-monotone Progression (z.B. didaktischer Spannungsbogen). Dokumentiert als bewusste Designentscheidung. | QD6 mit Begruendungs-Nachweis PASS |
| **E-D4 Thema-Einschraenkung** | Mehrere BLOCKER nach Iteration — Thema zu breit/komplex fuer gegebene mappen_anzahl | Agent schlaegt reduzierten Scope vor (z.B. statt "Erster Weltkrieg" nur "Weg in den Krieg 1914"). Dokumentiert was ausgeklammert wird. | Volles Q-Gate mit neuem Scope. User-Validierung PFLICHT |
| **E-D5 Abbruch-Empfehlung** | Alle Fallbacks gescheitert ODER Thema fundamental ungeeignet fuer Escape-Game-Format | Agent dokumentiert Begruendung + alternative Vorschlaege (anderes Thema, anderes Format). **Kein autonomer Abbruch — immer User-Entscheidung.** | Kein Q-Gate. User entscheidet. |

### Didaktische Implikations-Pruefung

Bei jedem Fallback mit didaktischer Auswirkung (E-D1, E-D2, E-D4) gilt:
- Agent prueft: Veraendert der Fallback die Lernziele? Wenn ja: explizit dokumentieren welche Teilziele betroffen sind.
- Agent prueft: Bleibt die KE-Matrix konsistent? Wenn Verschiebung/Reduktion: Matrix aktualisieren.
- Q-Gate-Reprüfung schliesst QD3 (Teilziel-Qualitaet) und QD4 (KE-Matrix-Konsistenz) ein.

### Eskalations-Log (Pflicht-Sektion im DIDAKTIK_RAHMEN)

Wenn mindestens 1 Fallback ausgeloest wurde, enthaelt der DIDAKTIK_RAHMEN eine Sektion "Eskalations-Log":

```
## Eskalations-Log

| # | Typ | Ausloeser | Massnahme | Q-Gate-Ergebnis |
|---|---|---|---|---|
| 1 | E-D1 | QD5 FAIL Mappe 3 ueberladen | KE GPG7_LB3_K_04 von M3 nach M4 verschoben | QD4 PASS, QD5 PASS |
```

---

## 5. Konventionen

- **Sprache:** Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)
- **KE-IDs:** Format `GPG[Jg]_LB[N]_K_[NN]` (aus Fachlehrplan)
- **Teilziel-Format:** "Die SuS [Operator] [Inhalt], indem sie [Handlung], was daran erkennbar wird, dass [Beobachtbares]."
- **Game-ID:** Kebab-case, max 40 Zeichen, z.B. `gpg-erster-weltkrieg-ende`
- **Dateiname:** `DIDAKTIK_RAHMEN_[game-id].md`
- **Ablageort:** `docs/agents/artefakte/`
