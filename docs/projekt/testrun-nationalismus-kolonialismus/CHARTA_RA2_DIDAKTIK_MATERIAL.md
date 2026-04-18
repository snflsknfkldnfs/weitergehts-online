# CHARTA RA2 — Didaktik / Material

**Ziel:** Beurteilung der didaktischen und materialseitigen Qualitaet der produzierten Mappen 1-3 (und Rahmen Mappe 4 falls vorhanden) im Testrun: Zielgruppen-Passung R7 Mittelschule Bayern, SCPL-Hefteintrag-Qualitaet, Bloom-Verteilung, Aufgaben-Typen-Mix, Sprachniveau, Material-Vielfalt.

---

## 1. Mandat

RA2 beantwortet: **Hat die produzierte didaktische Substanz die Qualitaetskriterien erfuellt und ist sie altersadaequat?**

Unterfragen:
- Hefteintrag-SCPL-Strukturkonformitaet pro Mappe (VERTRAG_PHASE_2-0 + GUETEKRITERIEN_HEFTEINTRAG_ENTWURF)
- Bloom-Verteilung je Aufgaben-Set (A19: 20/60/20 Reproduktion/Anwendung/Transfer)
- Aufgaben-Typen-Mix vs. Engine-Registry (8 Typen): wurde Diversitaet erzielt oder Ueber-Praeferenz fuer Lueckentext / Multiple-Choice?
- Sprachniveau: Satzlaenge, Fachwortdichte, Passiv-Rate, Flesch-aehnliche Heuristik fuer Deutsch R7
- Ist UX-1 "Vokabular zu komplex" in den Quell-JSONs tatsaechlich nachweisbar? Samples?
- Hefteintrag-Laenge vs. GUETEKRITERIEN (aktuell 120W) — welche Mappe ueberschritt, welche unterschritt?
- Materialvielfalt pro Mappe (M1-M5): Quellentext / Bildquelle / Karte / Zeitleiste / Statistik / Freitext — Abdeckung?
- Mappe-3-Aufgabe-3-Umbau (vergleich → begruendung) als Signal fuer Typ-Komplexitaets-Mismatch bei R7
- Bildunterschriften-Laenge und -Komplexitaet (UX-1 Finding 3.3)

---

## 2. Pflicht-Lektuere

1. `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md`
2. `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md`
3. Qualitaetskataloge:
   - `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md` (G1-G14)
   - `docs/checklisten/GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md` (HE1-HE13+)
   - `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A27)
   - `docs/checklisten/GUETEKRITERIEN_SKRIPT.md` (SK1-SK18)
   - `docs/checklisten/QUALITAETSKRITERIEN_MATERIALPRODUKTION.md` (M1-M13+)
   - `docs/checklisten/GUETEKRITERIEN_SEQUENZIERUNG.md` (S1-S17)
4. Produktions-Artefakte (suchen unter):
   - `escape-game-generator/docs/agents/artefakte/deutscher-nationalismus-kolonialismus/` (sofern vorhanden)
   - `weitergehts-online/escape-games/deutscher-nationalismus-kolonialismus/` (Live-Daten: data.json, materialien, rahmen)
5. Evidenz-Extrakte: `evidenz/assistant_text.jsonl` (Quell-Fragmente Hefteintrag / Aufgaben), `evidenz/user_messages.jsonl` (alle Korrektur-Momente), `evidenz/milestones.json` (Schluessel `sprache_zu_komplex`, `hefteintrag`)

---

## 3. Severitaets-Skala

- **P0:** Didaktischer Fehler mit direkter Zielgruppen-Fehlpassung (z.B. Lueckentext mit Fachterminus ohne Erklaerung). Setzt Lernerfolg aus.
- **P1:** Qualitaetskriterium-Verstoss in mehreren Mappen (z.B. Bloom-Unbalance systematisch, SCPL unvollstaendig in 2+ Mappen).
- **P2:** Einzelner Kriterium-Verstoss / suboptimale Formulierung.
- **P3:** Feinschliff / Konsistenz / Formatierung.

---

## 4. Pflicht-Sektionen im Bericht `BERICHT_RA2_DIDAKTIK_MATERIAL.md`

1. Zusammenfassung + Gate-Urteil (GRUEN/GELB/ROT fuer Zielgruppen-Tauglichkeit R7)
2. Methodologie (Stichproben-Strategie, welche Artefakte gelesen)
3. Hefteintrag-Analyse pro Mappe (SCPL-Struktur, Wortzahl, Komplexitaets-Heuristik)
4. Aufgaben-Analyse pro Mappe (Typ-Mix, Bloom-Verteilung, Feedback-Schema-Vollstaendigkeit, Tipp-Haertegrade)
5. Material-Analyse pro Mappe (M1-M5 Typ-Mix, Diversitaet, Bildunterschriften-Qualitaet)
6. Sprachniveau-Heuristik (Satzlaenge-Verteilung, Fachwort-Dichte, Passiv-Rate, Beispielsaetze pro Mappe)
7. UX-1 Vollstaendigkeits-Check (sind User-Beobachtungen reproduzierbar? Welche M fehlen?)
8. Mappe-3-Aufgabe-3 Signal-Analyse (warum war vergleich-Matrix ueberfordernd, was heisst das fuer Typ-Selektions-Heuristik?)
9. Findings (F-RA2-NN mit Severitaet)
10. Konvergenz / Divergenz mit UPGRADE_PLAN (UX-1 Findings 1-3 bestaetigen/erweitern)
11. Empfehlungen: welche Agenten/Vertraege/Kataloge brauchen Patches?
12. Gate-Urteil + Begruendung
13. Anhang: Text-Proben aus den produzierten Mappen mit Schwierigkeits-Annotation

---

## 5. Methodologie

- 3 Mappen systematisch durchgehen (Mappe 4 nur falls Produktions-Artefakte existieren).
- Je Mappe: 1 Hefteintrag + alle Aufgaben + alle Materialien.
- Sprachniveau: stichprobenhaft 5 Saetze pro Mappe mit Satzlaenge zaehlen, Fachwoerter markieren. Keine rigorosen NLP-Tools noetig — impressionistische Heuristik analog zum Lehrer-Urteil reicht.
- Bei Fehlen der Quell-Artefakte: data.json als Fallback (unter `weitergehts-online/escape-games/deutscher-nationalismus-kolonialismus/data.json`).
- Finding-IDs: F-RA2-01 ff.

---

## 6. Deliverable

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA2_DIDAKTIK_MATERIAL.md`
**Format:** Markdown, Pflicht-Sektionen 1-13.
**Umfang-Richtwert:** 500-900 Zeilen.
**Persistenz-Pflicht:** wie RA1.

---

## 7. Out-of-Scope

- Engine-/Rendering-Fehler (RA3)
- Medien-Existenz, Lizenz (RA4)
- Pipeline-Reihenfolge (RA1)
- PM-Meta (RA5)

---

## 8. Rollen-Isolation

Keine Material-Patches schreiben. Nur Befund + Empfehlung.
