# Q-Gate-Log: Französische Revolution 1789

**Game-ID:** `franzoesische-revolution-1789`
**Erstellt:** 2026-05-01
**Format:** Q-GATE-MECHANIK §8 (kanonisch)

---

## Phase 0.1 — agent-didaktik (Didaktischer Rahmen)

**Datum:** 2026-05-01
**Agent:** agent-didaktik (im Rahmen Cowork-Pipeline v0.5.x)
**Eingaben:** thema = „Französische Revolution 1789", jahrgangsstufe = R7 Mittelschule Bayern (7c), schwierigkeit = Basis, mappen_anzahl = 4 (User-Override), vorgaenger_game = keiner.
**Pflicht-Lektüre durchgeführt:**
- VERTRAG_PHASE_0-1_DIDAKTIK.md v1.2
- agents/AGENT_DIDAKTIK.md (eigene Spec)
- Fachlehrplan_GPG_R7.md (Lehrplanprofil Mittelschule_Jg7_GPG)
- Fachprofil_GPG_R7.md (Kompetenzstrukturmodell, Gegenstandsbereiche)
- Jahrgangsstufenprofil_GPG_R7.md (grundlegende Kompetenzen J7)

**Output-Artefakte (3 Stück):**
1. `DIDAKTIK_RAHMEN.md` — kanonisches Markdown-Artefakt
2. `didaktisches_konzept.json` — strukturierter Phase-0.1-Output (Lehrplan-Anker, KE, Lernziele, Ethik, Strukturvorgaben)
3. `mappen_aufteilung.json` — strukturierte Mappen-Grobstruktur (4 Mappen, KE-Matrix, Sandwich-Übergänge)

---

### Q-Gate-Self-Check (Phase 0.1)

| ID | Kriterium | Severity | Ergebnis | Evidenz |
|---|---|---|---|---|
| QD1 | Lehrplan-Abdeckung: Jede genannte KE im Fachlehrplan verifizierbar | BLOCKER | **PASS** | GPG7_LB2_K_01, GPG7_LB2_K_02 wörtlich aus Fachlehrplan_GPG_R7.md übernommen. GPG_J7_K_05, GPG_J7_K_07 aus Jahrgangsstufenprofil. Keine erfundenen IDs. |
| QD2 | KE-Vollständigkeit: Themenrelevante KEs berücksichtigt + Scope-Abgrenzung | HIGH | **PASS** | 4 KEs aufgenommen (2 LB2-K + 2 J7-K). Industrialisierung/Reichsgründung/WK1-KEs explizit als Folge-Game-Reserve dokumentiert. |
| QD3 | Teilziel-Qualität: AFB + Erkennbarkeitskriterium pro TZ | HIGH | **PASS** | TZ1–TZ4 alle im Format „Die SuS [Op]…, indem…, was daran erkennbar wird, dass…" mit AFB-Angabe. |
| QD4 | KE-Matrix-Konsistenz: Jede KE ≥1 Haupt, jede Mappe ≥1 KE | BLOCKER | **PASS** | Matrix in `mappen_aufteilung.json` geprüft: GPG7_LB2_K_01 → M1+M4 Haupt; K_02 → M2+M3 Haupt; J7_K_05 → M3 Haupt; J7_K_07 → M4 Haupt. Alle Mappen haben ≥1 Haupt-KE. |
| QD5 | Mappen-Balance: Keine Mappe leer/überladen, Zentrale Erkenntnis = 1 Satz | HIGH | **PASS** | Stoffdichte: M1=4, M2=5, M3=5, M4=4 (Ratio 1.25, im Zielbereich 3–5 H7). Zentrale Erkenntnis je Mappe = 1 Satz. |
| QD6 | AFB-Progression: Monoton steigend oder begründet | MEDIUM | **PASS** | Kurve: I–II → II → II–III → II–III. Monoton. M1 startet bei AFB I–II (Spec-konform). |
| QD7 | Ethik-Abdeckung: Multiperspektivität + Überwältigungsverbot | HIGH | **PASS** | Sektion „Ethische Hinweise": 5 Perspektiven (Adel/Klerus/3.Stand-Bürgerlich/3.Stand-Einfach/Frauen + Kolonien-Hinweis). Beutelsbacher Konsens explizit benannt. Sensibilitäts-Hinweis für Mappe 3 (Gewaltdarstellung). 3 Kontroversen formuliert. Aktualitätsbezug zum GG. |
| QD8 | Strukturvorgaben: Artikulation + Narrativ + Differenzierung | MEDIUM | **PASS** | Artikulationstabelle (Einstieg/Erarbeitung/Sicherung) vorhanden. Narrativ-Rahmen „Geheim-Akte 1789 — Archiv der Republik" mit Begründung der Altersangemessenheit. 3-Stufen-Tipp-System mit konkretem M2-Beispiel (Reihenfolge-Aufgabe). |
| QD9 | Sequenzierbarkeit der Mappen: 3–5 Materialien pro Mappe ableitbar | HIGH | **PASS** | Pro Mappe ist klar erkennbar, dass 3–5 Materialien (Bildquelle, Textquelle, Karte/Statistik, Aufgabe) ableitbar sind. Keine Ordnungsdimensionsverschränkung (jede Mappe behandelt 1 Phase). |
| QD10 | STRUKTUR-FREEZE-Tauglichkeit (Tafelbild ableitbar) | HIGH | **PASS** | Pro Mappe: Thematischer Schwerpunkt + Zentrale Erkenntnis hinreichend präzise. Schlüsselbegriffe (STÄNDE / RECHTE / TERROR / WERTE) als Tafelbild-Anker formulierbar. |
| QD-TITEL | R-TITEL-3 Multiperspektiv-Neutralität pro Mappen-Titel (F-PB-29) | HIGH | **PASS** pro Mappe | M1 deskriptiv („Drei Stände, ein König"), M2 deskriptiv (Datums-Anker + Verlauf), M3 fragend-aphoristisch (Vergniaud-Zitat öffnet Multiperspektive), M4 fragend („Was bleibt?"). Keine wertenden Adjektive, keine Konfliktseiten-Privilegierung. |
| QD-SCHULART | Schulart-Lehrplan-Konsistenz (F-PB-45) | BLOCKER | **PASS** | Header-Schulart „Mittelschule Bayern" matched lehrplan_anker[0].lehrplan_quelle_url_or_path = `Fachlehrplan_GPG_R7.md` mit Profil-Token `Mittelschule_Jg7_GPG`. Match. |

---

### Gesamturteil

**GATE-URTEIL Phase 0.1: PASS**

Alle BLOCKER-Kriterien (QD1, QD4, QD-SCHULART) bestanden. Alle HIGH-Kriterien bestanden. Alle MEDIUM-Kriterien bestanden. Keine WARN-Befunde.

**Eskalationen:** Keine.
**Iterationen:** 1 (kein Nachbessern erforderlich).
**Validator (Foundation A4) noch nicht ausgeführt** — empfohlen vor Phase 0.2 zur algorithmischen Doppelung.

---

### F-PB-78 Compliance (UTF-8 Umlaute)

Geprüft: Alle Output-Dateien verwenden UTF-8-Umlaute (ä, ö, ü, ß). Stichprobe:
- `Ständen`, `Bürgerrechte`, `Beweggründe`, `Ständen`, `gegenüber`, `Erläuterung` ✓
- Keine Pseudo-ASCII-Schreibungen (`ae`, `ue`, `oe`, `ss`) im Inhalts-Korpus.

**Hinweis:** Die VERTRAG-Konvention §5 nennt zwar „ae/oe/ue (Dateikompatibilität)", wird aber durch F-PB-78 (jüngere SSoT, didaktisch begründet wegen DaZ) explizit überstimmt. Outputs folgen F-PB-78.

---

### User-Validierung (PFLICHT)

**Status:** AUSSTEHEND.

Lehrkraft prüft folgende kritische Punkte:

1. **Mappen-Aufteilung (4 Mappen):** Plausibel? Oder lieber 3 (M3+M4 zusammenfassen) bzw. 5 (M3 splitten in „Republik" + „Terror")?
2. **KE-Matrix-Gewichtung:** Stimmen die Hauptzuordnungen mit Ihrer Unterrichtspriorität überein?
3. **AFB-Progression I–II → II → II–III → II–III:** R7-angemessen, oder zu steil bzw. zu flach?
4. **Narrativ-Rahmen „Archiv-Ermittler 2026":** Trägt die Klasse 7c diesen Rahmen über alle 4 Mappen? Alternative Vorschläge möglich.
5. **M3-Titel „Wenn die Revolution ihre Kinder verschlingt":** Sprachlich (R7-angemessen?) und ethisch (Sensibilität bei Gewalt) — Alternative: „1792–1794 — Republik im Terror" (deskriptiv, neutraler).
6. **Sklaverei in Kolonien (Mappe 3 Hinweis-Ebene):** ausreichend, oder eigene Vertiefung wünschenswert?

---

### Empfehlung Nächste Aktion

**NAECHSTE_AKTION:** Phase 0.2 — agent-inhalt (Inhaltliche Recherche / Quellen- und Faktenkatalog).

**Voraussetzungen für Phase 0.2:**
- DIDAKTIK_RAHMEN.md liegt vor ✓
- didaktisches_konzept.json liegt vor ✓
- mappen_aufteilung.json liegt vor ✓
- Q-Gate Phase 0.1 PASS ✓
- User-Validierung Phase 0.1 (PFLICHT vor Phase 0.2) — AUSSTEHEND

**Optional vor Phase 0.2:**
- `tools/validate_didaktik_rahmen.py` (Foundation A4) algorithmisch ausführen — Doppelung des Self-Checks.
- Schulart-Konsistenz-Validator (F-PB-45) als Bash-Probe.
