# Uebergabe-Prompt: Phase 0.2 — AGENT_INHALT fuer Game 1

**Ausfuehrungsort:** Claude Code
**Datum:** 2026-03-22
**Vorgaenger:** Phase 0.1 (AGENT_DIDAKTIK) — PASS

---

## Kontext

Du fuehrst Phase 0.2 des v2-Workflows aus: Wikipedia-basierte Sachanalyse fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch" (Game-ID: `gpg-erster-weltkrieg-ursachen`).

Phase 0.1 (DIDAKTIK_RAHMEN) ist abgeschlossen und validiert. Der DIDAKTIK_RAHMEN definiert 4 Mappen mit KE-Zuordnungen:

| Mappe | Titel | KE-Schwerpunkt | Thematischer Schwerpunkt |
|---|---|---|---|
| 1 | Pulverfass Europa | KE-A (Maechterivalitaeten, Imperialismus) | Imperialismus, Nationalismus, Buendnispolitik (Dreibund vs. Triple Entente) |
| 2 | Das Attentat von Sarajevo | KE-B (Attentat, Ursache vs. Ausloeser) | Attentat als Ausloeser, Julikrise, Kettenreaktion |
| 3 | Kriegsbegeisterung 1914 | KE-D (Ursachen erlaeutern) | Patriotismus, Propaganda, Gegenstimmen |
| 4 | Der Schlieffen-Plan | KE-C (Verlauf fuer Menschen) | Zweifrontenkrieg, Scheitern an der Marne, Stellungskrieg |

Zielgruppe: R7 Mittelschule Bayern, GPG.

---

## Aufgabe

Erstelle die Datei `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` mit einer strukturierten Sachanalyse auf Basis von Wikipedia-Artikeln.

### Schritt-fuer-Schritt

1. **Wikipedia-Hauptartikel abrufen:**
   - `wikipedia: get_article` fuer "Erster Weltkrieg"
   - `wikipedia: get_sections` fuer Artikelstruktur
   - `wikipedia: get_links` fuer Vertiefungsartikel

2. **Vertiefungsartikel identifizieren und abrufen** (mindestens):
   - "Julikrise" (Mappe 2 — Inhaltsluecke aus Themen-Briefing)
   - "Attentat von Sarajevo" (Mappe 2)
   - "Schlieffen-Plan" (Mappe 4)
   - "Imperialismus" (Mappe 1)
   - "Buendnispolitik vor dem Ersten Weltkrieg" oder "Dreibund" / "Triple Entente" (Mappe 1)
   - "Augusterlebnis" oder "Kriegsbegeisterung" (Mappe 3)
   - "Schlacht an der Marne" (Mappe 4 — Inhaltsluecke)
   - "Balkankrise" oder "Bosnische Annexionskrise" (Mappe 2 — Inhaltsluecke)

   Pro Artikel: `get_summary` fuer Kurzfassung, dann relevante Sektionen mit `get_article` lesen.

3. **Quellen-Ergiebigkeit pruefen:**
   - Wenn ein Hauptartikel < 5 Absaetze → Fallback Stufe 1: verwandte Artikel ueber `get_links` + `get_summary`
   - Wenn auch verwandte Artikel duenn → Fallback Stufe 2: WebSearch + `markdownify: webpage-to-markdown`
   - Wenn auch WebSearch ergiebislos → Fallback Stufe 3: Im Output dokumentieren als duenne Quellenlage

4. **Pro Mappe extrahieren:**
   - Fakten und Chronologie (mit Quellenangabe: Wikipedia-Artikel + Sektion)
   - Akteure (Name, Rolle, Relevanz)
   - Fachbegriffe (Begriff, Definition, Kontext)
   - Zahlen/Daten (fuer Statistik-Material in Phase 1)
   - Verfuegbare Bilder im Wikipedia-Artikel (Beschreibung, Wikimedia-URL, Lizenz)
   - Recherche-Hinweise (Quellenqualitaet, gute/duenne Quellenlage, ergiebige Artikel)

5. **Inhaltsluecken aus Themen-Briefing gezielt schliessen:**
   - **Julikrise 1914**: Praezise Chronologie (Ultimatum 23.7., Kriegserklaerung OeU→Serbien 28.7., russ. Mobilmachung 30.7., dt. Kriegserklaerung an Russland 1.8., an Frankreich 3.8., Einmarsch Belgien 4.8., brit. Kriegserklaerung 4.8.)
   - **Balkankrise**: Bosnien-Annexion 1908, Balkankriege 1912/13 als Kontext fuer Attentat
   - **Schlacht an der Marne**: Ablauf (franzoes. Gegenangriff, "Taxis von Paris", deutscher Rueckzug, Beginn Stellungskrieg)
   - **Quellenverifikation**: Jahreszahlen und Fakten auf Schulbuch-Niveau pruefen

---

## Quelldateien (im Repo)

### Pflicht lesen

| Datei | Funktion |
|---|---|
| `docs/agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` | Validierter Didaktischer Rahmen (4 KEs, 4 Mappen, Lernziele) |
| `docs/briefings/THEMEN_BRIEFING_ErsterWeltkrieg_Game1.md` | 20 Kernaussagen, 4 Mappen-Struktur, Inhaltsluecken, Quelldateien |
| `docs/architektur/WORKFLOW_v2.md` (Abschnitt 4, Schritt 0.2) | Output-Format INHALTSBASIS |
| `docs/agents/AGENT_INHALT.md` | Agenten-Rolle und Aufgaben |

### Optional lesen (bestehende TUVs als Referenz fuer Inhaltstiefe)

Die TUV-Pfade im Themen-Briefing verweisen auf Unterrichtsplanungen eines Kollegen. Falls im Repo vorhanden, koennen sie als Referenz fuer das erwartete Inhaltsniveau dienen. Priorisiere aber Wikipedia als Primaerquelle (v2-Prinzip).

---

## Output-Format

Datei: `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md`

```markdown
# Inhaltsbasis: Der Erste Weltkrieg – Ursachen und Ausbruch

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Erstellt:** [Datum] (Phase 0.2, AGENT_INHALT)
**Validierungsstatus:** Offen

## Wikipedia-Quellen
- Hauptartikel: [URL]
- Vertiefungsartikel: [URLs mit Zuordnung zu Mappen]

---

## Mappe 1: Pulverfass Europa

### Fakten und Chronologie
- [Fakt mit Quellenangabe (Wikipedia-Artikel, Sektion)]
- [...]

### Akteure
- [Name: Rolle, Relevanz fuer Mappe]

### Fachbegriffe
| Begriff | Definition | Kontext |
|---|---|---|

### Zahlen/Daten
- [Datensatz mit Quelle]

### Verfuegbare Bilder (im Wikipedia-Artikel)
- [Bild: Beschreibung, Wikimedia-URL falls erkennbar, Lizenz]

### Recherche-Hinweise
- Quellenqualitaet: [Wikipedia-gestuetzt | WebSearch-gestuetzt | manuell ergaenzt]
- Gute Quellenlage fuer: [...]
- Duenne Quellenlage fuer: [...]
- Besonders ergiebige Wikipedia-Artikel: [...]

---

## Mappe 2: Das Attentat von Sarajevo
[gleiche Struktur]

## Mappe 3: Kriegsbegeisterung 1914
[gleiche Struktur]

## Mappe 4: Der Schlieffen-Plan
[gleiche Struktur]
```

---

## Erfolgskriterium

Die INHALTSBASIS ist vollstaendig, wenn:

1. **Alle 4 Mappen** haben Fakten, Akteure, Fachbegriffe, Zahlen/Daten, Bilder-Hinweise, Recherche-Hinweise
2. **Alle 4 Inhaltsluecken** aus dem Themen-Briefing sind geschlossen (Julikrise-Chronologie, Balkankrise, Marne-Schlacht, Quellenverifikation)
3. **Mindestens 8 Wikipedia-Artikel** wurden ausgewertet (Hauptartikel + 7 Vertiefungsartikel)
4. **Quellenangaben** sind praezise (Wikipedia-Artikel + Sektion, nicht nur "Wikipedia")
5. **Recherche-Hinweise** pro Mappe dokumentieren Quellenqualitaet transparent
6. **Bilder/Karten** aus Wikipedia-Artikeln sind notiert (Grundlage fuer spaetere wikimedia-Suche)
7. Fakten sind auf **R7-Mittelschule-Niveau** reduziert (keine Universitaets-Detailtiefe)

---

## Nach Abschluss

Melde den Abschluss in Cowork mit:
"Update: Phase 0.2 (AGENT_INHALT) erledigt. Ergebnis: INHALTSBASIS erstellt mit [X] Wikipedia-Artikeln, [Y] Fakten pro Mappe, alle Inhaltsluecken geschlossen / [offene Luecken benennen]."
