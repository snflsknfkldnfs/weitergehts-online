# VERTRAG Phase 0.2 — AGENT_INHALT (Inhaltsbasis + Artefakt-Sichtung)

**Version:** v1.2 (Welle-1-Patches: Quellenorientierung-Downstream)
**Datum:** 2026-04-06 (v1.0), 2026-04-06 (v1.1 — AGENT_ARTEFAKT-Integration konsistent mit WORKFLOW_v4.1)
**Extrahiert aus:** ORCHESTRATOR.md §0.2, WORKFLOW_v4.md §5 Schritt 0.2 (v4.1), Game-1 INHALTSBASIS (Ist-Format)
**Kanonisch fuer:** Phase 0.2 jedes neuen Escape-Games

---

## 1. Rolle

AGENT_INHALT recherchiert die faktische Grundlage fuer ein Escape-Game auf Basis von Wikipedia-Artikeln. Das Artefakt ist die **Sachanalyse** — es liefert pro Mappe: Fakten, Chronologie, Akteure, Fachbegriffe, Zahlen, Zitate, Rollenprofile und Artefakte (Wikimedia-Bilder, Karten).

**Abgrenzung:** AGENT_INHALT entscheidet ueber Faktenauswahl und Quellenzuordnung. Er entscheidet NICHT ueber Mappen-Struktur (→ AGENT_DIDAKTIK, Phase 0.1), Narrativ/Chunking (→ AGENT_SKRIPT, Phase 0.3) oder konkrete Aufgabenformate (→ AGENT_RAETSEL, Phase 2.2).

**Artefakt-Sichtung (ehemals AGENT_ARTEFAKT, Phase 0.2b):** Ist integraler Bestandteil dieser Phase (v4.1). Wikimedia-Artefakte werden waehrend der Recherche pro Mappe identifiziert, lizenzgeprueft, didaktisch qualifiziert (QUALIFIZIERT / RESERVE / VERWORFEN) und direkt in die INHALTSBASIS aufgenommen. Kein separater Dispatch. Downstream-Agenten (AGENT_SKRIPT, AGENT_HEFTEINTRAG) erhalten die vollstaendige Artefakt-Inventar-Tabelle aus der INHALTSBASIS und verwenden ausschliesslich Artefakte mit Status QUALIFIZIERT.

---

## 2. Input

| Parameter | Quelle | Pflicht |
|---|---|---|
| DIDAKTIK_RAHMEN_[game-id].md | Phase 0.1 (AGENT_DIDAKTIK) | Ja |
| thema | User (via ORCHESTRATOR) | Ja |
| vorgaenger_game_inhaltsbasis | PM (falls Sequenz) | Nein |

**Wenn `vorgaenger_game_inhaltsbasis` vorhanden:** Lesen. Fakten-Ueberschneidungen pruefen: Bereits dokumentierte Fakten nicht duplizieren, sondern referenzieren. Anschluss-Chronologie sicherstellen (letztes Datum Vorgaenger → erstes Datum neues Game).

**Pflicht-Lektuere vor Recherche-Beginn:**
- DIDAKTIK_RAHMEN: Mappen-Grobstruktur, KE-Schwerpunkte, Gegenstandsbereiche
- Mappen-Anzahl und thematische Schwerpunkte bestimmen den Recherche-Scope

---

## 3. Recherche-Protokoll

### 3.1 Wikipedia-Recherche (MCP-gestuetzt)

**Werkzeuge:** wikipedia MCP (get_article, get_sections, get_links, get_summary, extract_key_facts, search_wikipedia)

**Ablauf pro Game:**

1. **Hauptartikel identifizieren:** 1 uebergreifender Wikipedia-Artikel zum Gesamtthema
2. **Vertiefungsartikel pro Mappe:** Mindestens 2 Vertiefungsartikel pro Mappe (aus Links des Hauptartikels oder gezielter Suche)
3. **Mindest-Coverage:** Gesamt mindestens `mappen_anzahl × 2 + 1` Artikel (Hauptartikel + 2 pro Mappe)
4. **Quellen-Diversitaet:** Nicht alle Fakten einer Mappe aus demselben Artikel. Mindestens 2 verschiedene Artikel pro Mappe muessen Fakten beitragen.
5. **Fakten-Extraktion:** Pro Artikel: Key Facts extrahieren, Mappe zuordnen, Wikipedia-Quellenangabe (Artikel + Sektion) dokumentieren

### 3.2 Artefakt-Sichtung (integriert)

**Werkzeuge:** wikimedia_search_images MCP

**Ablauf pro Mappe:**
1. Mindestens 2 Wikimedia-Artefakte pro Mappe identifizieren
2. Pro Artefakt dokumentieren: Typ, Beschreibung, Wikimedia-Dateiname, Lizenz, Einbettungsvorschlag
3. Lizenz-Pruefung: Nur Artefakte mit CC-kompatiblen Lizenzen (Public Domain, CC-BY, CC-BY-SA) aufnehmen. CC-BY-NC, CC-BY-ND: AUSSCHLUSS (nicht GitHub-Pages-kompatibel).

---

## 4. Output: INHALTSBASIS_[game-id].md

### Pflicht-Sektionen (Dokument-Ebene)

| Sektion | Inhalt | Pruefung |
|---|---|---|
| **Header** | Game-ID, Erstellungsdatum, Phase, Validierungsstatus | QI1 |
| **Wikipedia-Quellen** | Hauptartikel + Vertiefungsartikel mit Mappe-Zuordnung, Gesamt-Artikelzahl | QI2 |
| **Quellen-Gesamtuebersicht** | Tabelle: Artikel × Mappe-Zuordnung × Ergiebigkeit | QI2 |
| **Inhaltsluecken-Status** | Tabelle: Identifizierte Luecken + Status (offen/geschlossen) + Quelle | QI6 |

### Pflicht-Sektionen (pro Mappe)

| Sektion | Inhalt | Pruefung |
|---|---|---|
| **Fakten und Chronologie** | Chronologisch geordnete Fakten mit Wikipedia-Quellenangabe (Artikel + Sektion). Mindestens 8 Fakten pro Mappe. | QI3 |
| **Akteure** | Historische Personen/Gruppen mit Kurzbiographie und Wikipedia-Beleg. Mindestens 2 pro Mappe. | QI3 |
| **Fachbegriffe** | Tabelle: Begriff, Definition, Kontext. Mindestens 4 pro Mappe. Alle im Lehrplan genannten Begriffe muessen abgedeckt sein. | QI3, QI4 |
| **Zahlen/Daten** | Chronologische Daten und quantitative Angaben (Jahreszahlen, Mengen, Distanzen). | QI3 |
| **Wikimedia-Artefakte** | Tabelle: ID, Typ (foto/karte/illustration), Beschreibung, Wikimedia-Dateiname, Lizenz, Einbettungsvorschlag. Mindestens 2 pro Mappe. | QI5 |
| **Zitate** | Tabelle: ID, Sprecher, Wortlaut, Kontext, Wikipedia-Quelle, Eignung. Mindestens 1 pro Mappe. | QI3 |
| **Rollenprofile** | Tabelle: ID, Rolle, Historische Basis, Typische Erfahrung, Wikipedia-Beleg, Mappe-Eignung. Mindestens 1 pro Mappe. | QI3 |
| **Recherche-Hinweise** | Quellenqualitaet, gute/duenne Quellenlage, ergiebigste Artikel, Ethik-Hinweise (falls relevant) | QI6 |

### ID-Konventionen

- Artefakt-IDs: `img-[mappe]-[laufnummer]` (z.B. `img-2-3`)
- Zitat-IDs: `zit-[mappe]-[laufnummer]`
- Rollenprofil-IDs: `rolle-[mappe]-[laufnummer]`

---

## 5. Q-Gate

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QI1 | Vollstaendigkeit Dokument-Struktur | Alle Pflicht-Sektionen (Dokument-Ebene + pro Mappe) vorhanden. Header mit Game-ID und Validierungsstatus. | BLOCKER |
| QI2 | Quellen-Diversitaet | Mindestens `mappen_anzahl × 2 + 1` Wikipedia-Artikel. Mindestens 2 verschiedene Artikel pro Mappe. Quellen-Gesamtuebersicht vollstaendig. | HIGH |
| QI3 | Fakten-Vollstaendigkeit | Jede Mappe hat: ≥8 Fakten, ≥2 Akteure, ≥4 Fachbegriffe, ≥1 Zitat, ≥1 Rollenprofil. Jeder Fakt hat Wikipedia-Quellenangabe (Artikel + Sektion). | BLOCKER |
| QI4 | DIDAKTIK_RAHMEN-Abdeckung | Jede KE aus der KE-Matrix des DIDAKTIK_RAHMEN hat mindestens 3 stuetzende Fakten in der INHALTSBASIS. Jeder Gegenstandsbereich ist mit Fachbegriffen abgedeckt. Keine Mappe hat Fakten, die nicht zum thematischen Schwerpunkt (laut DIDAKTIK_RAHMEN) passen. **Pflicht-Output pro Mappe:** Eine KE-Abdeckungszeile: `KE-Abdeckung: [KE-ID] gestuetzt durch [Fakt-1, Fakt-2, Fakt-3+]`. | HIGH |
| QI5 | Artefakt-Qualitaet | ≥2 Wikimedia-Artefakte pro Mappe. Alle Lizenzen CC-kompatibel (PD, CC-BY, CC-BY-SA). Kein Artefakt ohne Einbettungsvorschlag. Typ-Diversitaet: nicht alle Artefakte eines Typs pro Mappe (Ausnahme: nur 2 verfuegbar). | MEDIUM |
| QI6 | Inhaltsluecken-Transparenz | Identifizierte Luecken sind dokumentiert mit Status. Keine Mappe hat offene Luecken in Kernbereichen (Chronologie, Akteure). Duenne Quellenlage ist explizit benannt. | HIGH |

### Rueckwaerts-Kontingenz (Downstream-Kompatibilitaet)

| ID | Kriterium | Pruefung | Severity |
|---|---|---|---|
| QI-RC1 | SKRIPT-Tauglichkeit | Pro Mappe genuegend Fakten + Akteure + Artefakte, um einen 600-900W Skript-Chunk zu stuetzen. Keine Mappe mit weniger als 8 Fakten + 2 Akteure + 2 Artefakte. Pro Mappe mindestens 1 Quellenbezug dokumentiert (Dokument, Brief, Karte, Bericht, Fotografie), der im SKRIPT als Quellenorientierung (SK18) verwendbar ist. | HIGH |
| QI-RC2 | TAFELBILD-Tauglichkeit | Pro Mappe genuegend strukturiertes Material (Kausalitaeten, Chronologien, Begriffshierarchien), um ein SCPL-Tafelbild ableiten zu koennen. Kein reines Faktenaggregat ohne innere Struktur. | MEDIUM |
| QI-RC3 | Material-Tauglichkeit | Pro Mappe mindestens 2 verschiedene Artefakt-Typen (foto + karte, zitat + rollenprofil, etc.), damit Phase-1 Materialtyp-Diversitaet moeglich ist. | MEDIUM |

**Gate-Urteil:** PASS wenn alle BLOCKER bestanden + max 1 HIGH als WARN. Sonst: Nachbesserung.

**User-Validierung:** EMPFOHLEN nach Q-Gate. Lehrkraft prueft: Faktenauswahl, Akteurs-Balance (nicht nur "grosse Maenner"), Artefakt-Eignung, Rollenprofile-Plausibilitaet.

---

## 6. Konventionen

- **Sprache:** Deutsch, Umlaute als ae/oe/ue (Dateikompatibilitaet)
- **Quellenangaben:** Format `(Wikipedia: [Artikelname], [Sektion])` inline nach jedem Fakt
- **Game-ID:** Uebernommen aus DIDAKTIK_RAHMEN
- **Dateiname:** `INHALTSBASIS_[game-id].md`
- **Ablageort:** `docs/agents/artefakte/`
- **Ort der Ausfuehrung:** Claude Code (Token-intensive Wikipedia-Recherche via MCP)
- **Fakten-Redundanz:** Dasselbe Faktum darf in maximal 2 Mappen erscheinen. Wenn ein Fakt mappenuebergreifend relevant ist: Hauptzuordnung in einer Mappe, Kurzreferenz in der anderen.
