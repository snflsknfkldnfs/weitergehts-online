# BEFUND — Run-4 Didaktische Strukturqualität (Problemorientierung + Multi-Kausalität)

**Datum:** 2026-04-27
**Source:** User-Pädagogen-Feedback (post-Pilot-Walk-Through Mappe 1) + Sandbox-Empirie data.json.mappen[].sicherung.hefteintrag
**Scope:** Strukturelle Mängel im didaktischen Aufbau jenseits Frage-/Lösungs-Qualität. Fokus: Problemorientierung, Multi-Kausalität, Stundenfrage-Progression, Hefteintrag-Strukturqualität.

**Aggregat:** **1 HIGH (Plugin-Validator-Pflicht-Patch) + 2 MED (didaktische Optimierungen)** — eingearbeitet in v0.5.1-Backlog.

---

## 1. User-Pädagogen-Befund (verbatim)

> "Grundlegender Eindruck: die Problemorientierung des Mappenverlaufs ist zu schwach. Das Narrativ muss stärker problemorientiert aufbauen und die Stundenfrage schrittweise beantworten. [...]"
>
> "Insgesamt bei Mappe 1: ich habe das Gefühl die Verbindung zwischen Kolonialismus/Imperialismus und Spannungen zwischen Bündnissen wurde eher nebeneinander gestellt bzw. nicht genügend geschärft problemorientiert in eine zusammenhängende Struktur gebracht (siehe Struktur des Hefteintrags)."

---

## 2. Empirische Verifikation (Hefteintrag-Strukturanalyse)

### 2.1 Pflicht-Felder pro Mappe

| Mappe | knoten | **verbindungen** | **voraussetzungen** | **ordnungsmuster** | **transfer.frage** |
|---|---|---|---|---|---|
| **M1** | 5 | **0** ❌ | **0** ❌ | **leer** ❌ | **leer** ❌ |
| M2 | 5 | 5 ✓ | 0 ❌ | `zeitstrahl_mit_begriffsbox` ✓ | ✓ |
| M3 | 6 | 7 ✓ | 2 ✓ | `kategorial-kontrastiv` ✓ | ✓ |
| M4 | 5 | 5 ✓ | 3 ✓ | `chronologisch-kausal` ✓ | ✓ |

**M1 ist die Anomalie:** 4 von 4 Pflicht-Strukturfeldern leer/0. Die anderen Mappen haben strukturierte Knoten-Kanten-Graphen, ordnungsmuster, voraussetzungen, transfer.

### 2.2 SCPL-Komplikationen pro Mappe

| Mappe | scpl.complication-Anzahl | Verschränkungs-Indikator |
|---|---|---|
| **M1** | 3 (C1 Bündnis + C2 Flotte + C3 Kolonien) | **PARALLEL** — keine Wirkungs-Pfeile zwischen C1/C2/C3 dokumentiert |
| M2 | 5 (Auslöser/Sarajevo/Blanko/Ultimatum/Bündnis-Domino) | sequenziell-kausal über knoten.verbindungen abgebildet |
| M3 | 2 | kontrastiv |
| M4 | 2 | chronologisch-kausal |

**M1-spezifisch:** SCPL-Struktur listet C1/C2/C3 als 3 parallele Komplikationen. Es wird NICHT expliziert wie sie sich gegenseitig verstärken.

---

## 3. Didaktischer Strukturmangel M1 konkret

### 3.1 Was fehlt

**Multi-Kausal-Verschränkung Kolonialismus ↔ Bündnis-Spannungen:**
1. **Kolonialismus → Imperialismus → Flotten-Wettrüsten:** Tirpitz-Plan (1898) brauchte Marine-Macht für Weltpolitik + Kolonien → Großbritannien-Konflikt
2. **Imperialismus-Konflikte → Bündnis-Verfestigung:** 1. Marokko-Krise 1905 + 2. Marokko-Krise 1911 brachten Frankreich + Großbritannien zusammen → Entente Cordiale 1904 → Triple Entente 1907
3. **Bündnis-System → Imperialismus-Konflikte werden gefährlich:** Was bilateral wäre, wird durch Bündnisse zu Block-Konflikt

**Problem-Synthese:** Pulverfass = Bündnis-System × Imperialismus-Konflikte (multiplikativ, nicht additiv). Knoten K1-1 "Pulverfass Europa" muss Verbindungs-Sterne zu K1-2 (Dreibund), K1-3 (Triple Entente), K1-4 (Flotte), K1-5 (Kolonien) haben — UND zwischen K1-4 und K1-3 (Flotte verstärkt britische Hinwendung zu FR/RU) + zwischen K1-5 und K1-3 (Marokko-Krisen verfestigten Triple Entente).

### 3.2 Was M1-Hefteintrag aktuell zeigt

```
K1-1 (Zentrum: "Pulverfass Europa")
  K1-2 (links-oben: "Dreibund 1882")
  K1-3 (rechts-oben: "Triple Entente 1907")
  K1-4 (rechts-unten: "Flotten-Wettlauf")
  K1-5 (links-unten: "Wettlauf um Afrika / Marokko-Krisen")

verbindungen: []   ← LEER
```

→ 5 Knoten in Sterne-Position um K1-1, **aber keine Kanten gezeichnet**. Visuelles Bild: lose Sammlung, nicht Wirkungsgefüge.

### 3.3 Wie M2-Hefteintrag es richtig macht (zum Kontrast)

```
K2-2 ──löst aus──> K2-3 ──ermoeglicht──> K2-4 ──löst Bündnisfall aus──> K2-5
```

Klare Kausalkette mit beschrifteten Pfeilen. Schüler sieht: Schuss → Blanko-Scheck → Ultimatum → Bündnis-Domino.

---

## 4. Stundenfrage-Progression-Mangel (game-weit)

### 4.1 Stundenfrage M1: "Warum war Europa vor 1914 ein 'Pulverfass'?"

**Aktuelle Aufgaben-Sequenz beantwortet schrittweise:**
- a-1-1 (Bündnisse zuordnen) → "Es gibt 2 Blöcke"
- a-1-2 (Bündnis-Begriffe) → "Bündnis = Versprechen"
- a-1-3 (HMS Dreadnought) → "Flotten-Wettlauf"
- a-1-4 (Spannungen) → "Multi-Front-Konflikte"
- a-1-5 (Reihenfolge Flotte) → "Chronologie 1898-1914"
- a-1-6 (Karte Afrika W-Fragen) → "Kolonialwettlauf europäisch"
- a-1-7 (Kaiser-Foto) → "Welt-Politik = Selbstdarstellung"

**Problem:** Aufgaben 1-7 liefern Bausteine, aber **explizite Synthese-Aufgabe fehlt**, die die Multi-Kausalität herausarbeitet ("Wie verstärkt Imperialismus die Bündnis-Spannungen?"). Die Stundenfrage wird nicht abschließend beantwortet — der Schüler hat 7 Bausteine, aber keine **explizite Verschränkungs-Erkenntnis**.

**Vergleich M3:** a-3-7 ("Beantworte die Stundenfrage in 3-5 Sätzen") referenziert ALLE 5 M3-Materialien als explizite Synthese-Aufgabe. M1 hat keine vergleichbare Synthese-Aufgabe — a-1-7 fragt nur nach **einer** Material-Quelle (Kaiser-Foto).

### 4.2 Game-weit: Schrittweise-Beantwortung-Heuristik

| Mappe | Stundenfrage | Synthese-Aufgabe? | Multi-Kausalität expliziert? |
|---|---|---|---|
| M1 | Warum war Europa Pulverfass? | **a-1-7 (Kaiser-Foto fokussiert)** ❌ keine echte Synthese | **NEIN** (parallele Bausteine) |
| M2 | Wie wurde aus Schuss in 5 Wochen Weltkrieg? | a-2-7 (Ursache vs. Auslöser) ✓ | ✓ via knoten.verbindungen |
| M3 | Wer ist schuld? Wer jubelte? | a-3-7 (Synthese 5 Materialien) ✓ | ✓ via Beutelsbach-Kontroversität |
| M4 | Wie wurde aus 6 Wochen 4 Jahre? | a-4-7 (Game-Abschluss-Code) ✓ | ✓ via knoten.verbindungen |

**M1 ist die Anomalie game-weit** in: (a) fehlende echte Synthese-Aufgabe, (b) fehlende Knoten-Verbindungen, (c) fehlende Wirkungs-Pfeile zwischen SCPL-Komplikationen.

---

## 5. v0.5.1-Backlog-Erweiterung

### 5.1 Neue Items

| ID | Severity | Beschreibung | Source |
|---|---|---|---|
| **F-PB-84-NEU** | **HIGH** | Plugin-Validator post-phase-0.4: Hefteintrag-Pflicht-Felder nicht-leer (knoten ≥3, verbindungen ≥2 ab M2, voraussetzungen ≥1 ab M2, ordnungsmuster NotEmpty, transfer.frage NotEmpty). Empirie: M1 4 von 4 Strukturfeldern leer. | User-Pädagogen-Befund + M1-Empirie |
| **F-PB-85-NEU** | **HIGH** M1-spezifisch | M1 SCPL-Struktur muss Multi-Kausalität explizit machen: Kolonialismus → Imperialismus-Konflikte (Marokko 1905+1911) → Bündnis-Verfestigung (Entente Cordiale 1904 + Triple Entente 1907). Knoten-Verbindungen zwischen K1-4/K1-5 und K1-3 (Flotte+Kolonien verstärken Triple Entente). | User-Pädagogen-Befund |
| **F-PB-86-NEU** | MED | Plugin-Validator agent-skript+agent-hefteintrag: SCPL.complication darf nicht nur parallele Liste sein. Bei ≥3 Komplikationen MUSS Wirkungs-Pfeile (`zwischen_komplikationen: [{von, nach, label}]`) ODER explizite Verschränkungs-Begründung im problem-Satz enthalten. | M1-Empirie 3 parallele Komplikationen ohne Verschränkung |
| **F-PB-87-NEU** | MED | agent-aufgaben Frontmatter: pro Mappe MUSS letzte Aufgabe Synthese-Aufgabe sein (referenziert ≥3 Materialien + adressiert Stundenfrage explizit + AFB-III). Empirie: a-1-7 referenziert nur 1 fokales Material (Kaiser-Foto), ist keine echte Synthese. | M1-a-1-7-Befund |

### 5.2 Backlog-Stand-Update

**v0.5.1-Backlog wächst von 33 auf 37 Items** (4 NEU). Davon **2 NEU HIGH** (F-PB-84 + F-PB-85) → Phase A wächst von 9 auf **11 HIGH-Items**.

**Aufwand-Update:** +3-4 PT (Plugin-Validator + 2 Frontmatter-Patches + agent-skript-Vertrag-Patch) → **17-24 PT total v0.5.1**.

---

## 6. Verifikations-Pflicht (geeignete Stelle)

User-Anfrage: "an geeigneter Stelle überprüfen/optimieren".

### 6.1 Überprüfungs-Punkt 1: v0.5.1-Phase-A-Implementation (Generator-Repo)

Nach Implementation F-PB-84 (Plugin-Validator) wird auf Run-4-Output gerunscht:
- Erwartung: M1 4 Strukturfeld-Errors melden + M2-M4 PASS

### 6.2 Überprüfungs-Punkt 2: Run-5 Pristine-Test

Run-5 mit neuem Game (Vorschlag: Weimarer-Republik-Anfangsphase oder NS-Diktatur-Anfang) prüft:
- Alle 4 Mappen haben ≥2 verbindungen + ≥1 voraussetzungen ab M2 + ordnungsmuster NotEmpty + transfer.frage NotEmpty
- Keine SCPL-Mappe mit ≥3 parallelen Komplikationen ohne Verschränkungs-Pfeile
- Letzte Aufgabe pro Mappe ist Synthese-Aufgabe (≥3 Materialien + AFB-III)

### 6.3 Überprüfungs-Punkt 3: Run-4-Cowork-Optimierungs-Sprint (optional vor Pilot)

Falls User Run-4 als Pilot-Game nutzen will, kann M1-Hefteintrag Cowork-side erweitert werden:
- M1.knoten[].verbindungen explizit ergänzen (4-6 Kanten)
- M1.voraussetzungen ergänzen (z.B. "Vorwissen 4. Klasse: Kontinent Europa")
- M1.ordnungsmuster setzen (z.B. `multi_kausal_verschraenkt`)
- M1.transfer.frage setzen (z.B. "Wenn Bündnisse + Kolonien + Flotten Spannungen erzeugen — was bringt das Pulverfass dann zur Explosion?")
- a-1-7 umstrukturieren als Synthese-Aufgabe (alle 6 Materialien referenzieren, Frage = Multi-Kausal-Synthese)

**Aufwand:** ~30 Min Cowork-Edit. Optional, weil F-PB-84/85 Plugin-Side strukturell adressiert.

---

## 7. Bilanz

**User-Pädagogen-Befund 100% empirisch belegt:**
- M1 ist game-weit Anomalie in 4 von 4 Hefteintrag-Strukturfeldern
- SCPL-Multi-Kausalität fehlt M1-spezifisch
- Stundenfrage-Synthese-Aufgabe fehlt M1 (a-1-7 fokussiert nur Kaiser-Foto)

**Plugin-strukturell:** 4 NEUE Backlog-Items (2 HIGH + 2 MED), eingearbeitet in v0.5.1-Hardening-Spec.

**Verifikations-Stelle:** v0.5.1-Phase-A-Implementation + Run-5-Pristine-Test. Plus optional: Cowork-Optimierungs-Sprint M1-Hefteintrag (~30 Min) falls Run-4 als Pilot-Game eingesetzt wird.

**Methodisch wertvoll:** User-Pädagogen-Feedback liefert eine Dimension die durch automatische Validatoren (Sandbox + Subagent-Reviews) nicht detektiert wurde — **didaktische Strukturqualität jenseits Frage-/Material-/Aufgaben-Ebene**. Das motiviert F-PB-NEU im v0.5.1-Backlog: User-Pädagogen-Feedback als Pflicht-Audit-Dimension neben Sandbox+Subagent.

---

**Befund abgeschlossen 2026-04-27.** Methodik: User-Pädagogen-Befund + Sandbox-Empirie auf hefteintrag-Strukturfeldern. 4 NEUE Backlog-Items. Verifikations-Pfad definiert für v0.5.1 Phase-A + Run-5.

---

## 8. NACHTRAG (2026-04-27 Abend) — User-Pädagogen-Befund 2 + 3: Doppelfragen + Überleitungs-Qualität

**User-Befund 2 (verbatim):**
> "Die doppelfragen-formulierungen mit gedankenstrich dazwischen sind problematisch, verwirren die lesende und überlasten cognitive load. die fragen müssen möglichst linear in der bearbeitung problemorientiert aufeinander folgen."

**User-Befund 3 (verbatim):**
> "Die überleitungs-struktur muss noch qualitativ präzisiert und verbessert werden. sie ist ein riesiger hebel für die gesamte qualität des games/der mappen. überleitungen wie 'Du weißt jetzt: zwei feindliche Bündnisse stehen sich misstrauisch gegenueber. Aber war das alles? Was war noch los — auf den Meeren?' sind zu allgemein, werden ihrer funktion nicht gerecht"

### 8.1 Empirie Doppelfragen (11 game-weit)

**Pattern:** "Frage A — und Frage B?" / "Aussage X — und was Y?" / "Was A — Held oder B?"

**Aufgaben mit Doppelfrage (3):**
- M1 a-1-6: "Wer hat diese Karte gezeichnet — und wessen Sicht zeigt sie?"
- M3 a-3-6: "Welche Position findest du überzeugender — und warum?"
- M4 a-4-1: "Was sah der Schlieffen-Plan vor — und durch welches Land führte der Bogen?"

**Material-Titel mit Doppelfrage (8):**
- M1 mat-1-5: "Schiffe zählen — wer hatte mehr?"
- M1 mat-1-6: "Afrika 1914 — wer beherrscht was?"
- M2 mat-2-4: "Wer war Princip — Held oder Terrorist?"
- M3 mat-3-2: "Eine Frau gibt Blumen — wirklich oder gestellt?"
- M4 mat-4-1: "Welcher Weg war geplant — und warum durch Belgien?"
- M4 mat-4-3: "Was zeigt das Foto wirklich — und was nicht?"
- M4 mat-4-5: "Wenn die Bilder nicht zeigen, was passiert — was zeigen die Zahlen?"
- M4 mat-4-6: "Aus sechs Wochen wurden vier Jahre — was ist ein Stellungskrieg?"

**Didaktischer Mangel:** Doppelfragen kombinieren 2 kognitive Anforderungen in einer Frage. Schüler muss BEIDE simultan halten + beantworten. Cognitive Load-Überlast besonders bei R7 Mittelschule + DaZ-SuS. Korrekt: 2 sequenzielle Fragen mit klarer Bearbeitungs-Reihenfolge.

**Gegenmuster (gut):**
- M2 a-2-1: "An welchem Datum erschoss Princip in Sarajevo den Thronfolger Franz Ferdinand?" (1 klare Frage)
- M3 a-3-4: "Welche Aussage über Artikel 231 stimmt?" (1 klare Frage)

### 8.2 Empirie Überleitungs-Qualität (7 von 16 Floskel-Pattern)

**Floskel-Pattern identifiziert (7 von 16 Überleitungen):**

| Material | Überleitung | Problem |
|---|---|---|
| **M1 mat-1-2** | "Du weißt jetzt: zwei feindliche Bündnisse stehen sich misstrauisch gegenüber. **Aber war das alles?** Was war noch los — auf den Meeren?" | rhetorische Floskel + räumlicher Wechsel ohne kausale Brücke (User-Beispiel) |
| **M1 mat-1-6** | "Beide Seiten haben gebaut — der britische Vorsprung blieb, die Spannung wuchs. **Aber das Wettrüsten zur See war nicht der einzige Streit.** Wo noch?" | "Wo noch?" generisch, kein Erklärungs-Bedarf |
| M2 mat-2-3 | "Du kennst den Tatort. **Aber wer war das Opfer?** Das Hofportrait zeigt dir, wie sich der Habsburger Hof selbst inszenierte." | OK — explizit kausal, knüpft an Tatort an |
| M3 mat-3-4 | "Die Sieger schrieben 1919 die Schuld auf. **Aber Geschichte wird neu geschrieben.** Heute sagt der Forscher Christopher Clark etwas anderes." | OK — kontrastiv-explizit (Versailles vs. Clark) |
| M3 mat-3-5 | "Bilder zeigen, was vor der Kamera stand. **Aber Tagebücher zeigen, was Menschen wirklich dachten.** Lies jetzt eine Stimme, die in keinem Foto vorkam." | OK — kontrastiv-explizit (Bild vs. Text-Quelle) |
| M4 mat-4-2 | "Die Karte hat dir die Idee gezeigt: ein großer Bogen durch Belgien in sechs Wochen. **Aber hat dieser Plan in der Wirklichkeit auch funktioniert?** Lies an den Daten ab." | OK — Plan-vs-Realität kontrastiv |
| M4 mat-4-3 | "Die Zeitleiste hat dich vom Ultimatum am 2. August bis zur Marne-Schlacht im September geführt. **Aber wie sahen die Soldaten an der Front aus, die diesen Plan zu Ende bringen sollten?** Schau das Foto an." | OK — vom Datum zur Person-Perspektive |

**Didaktische Funktion einer Überleitung:**
1. **Bilanz-Anker:** "Du hast jetzt X erfahren..."
2. **Erklärungs-Bedarfs-Anker:** "Aber daraus folgt die Frage: Y?"
3. **Material-Verweis:** "Das nächste Material zeigt Z..."
4. **Kausale Brücke:** explizit kausal "Wenn X, dann braucht es Y" (NICHT räumlich/zeitlich/rhetorisch)

**Anti-Pattern Beispiel M1 mat-1-2:**
- ✓ Bilanz-Anker: "Du weißt jetzt: zwei feindliche Bündnisse..."
- ✗ Erklärungs-Bedarfs-Anker: "Aber war das alles?" → rhetorisch, kein Erklärungs-Bedarf
- ✗ Material-Verweis: "auf den Meeren" → vage räumliche Andeutung
- ✗ Kausale Brücke: fehlt komplett

**Verbessert (Beispiel-Vorschlag):**
> "Du weißt jetzt: zwei feindliche Bündnisse stehen sich misstrauisch gegenüber. **Daraus folgt die Frage: Wenn man dem anderen Block nicht traut — wie sichert man sich ab?** Eine Antwort lag im Aufbau einer riesigen Kriegsflotte. Schau dir das nächste Material an."

**Was die verbesserte Form leistet:**
- Bilanz-Anker bleibt
- "Daraus folgt die Frage" macht Erklärungs-Bedarf explizit (statt rhetorisch)
- Kausale Brücke "Wenn X — dann braucht es Y" verbindet kognitiv
- Material-Verweis konkret ("Aufbau einer Kriegsflotte")

### 8.3 v0.5.1-Backlog-Erweiterung (2 NEUE Items)

| ID | Severity | Beschreibung |
|---|---|---|
| **F-PB-88-NEU** | **HIGH** | Doppelfragen-Verbot in Aufgaben + Material-Titeln. Pattern-Detection: `frage` enthält `[—–-]` + zweite Fragestruktur ("und warum" / "Held oder" / "wirklich oder" / "und was"). Vertrag-Patch: agent-aufgaben + agent-material Frontmatter — bei Doppel-Anforderung MUSS in 2 sequenzielle Fragen splitten. Tool: `tools/check_doppelfragen.py`. |
| **F-PB-89-NEU** | **HIGH** | Überleitungs-Qualitäts-Pflicht: Pattern-Detection für Floskel ("Aber war das alles", "Was war noch los", standalone "Aber" am Anfang ohne kontrastiv-explizite Fortsetzung). Vertrag-Patch: agent-material Frontmatter — Überleitung MUSS 4 Komponenten enthalten (Bilanz-Anker + Erklärungs-Bedarfs-Anker + Material-Verweis + kausale Brücke). Tool: `tools/check_ueberleitung_qualitaet.py`. |

**v0.5.1-Backlog-Stand:** 37 → **39 Items** (2 NEU). Phase A wächst auf **13 HIGH-Items**. Aufwand 17-24 PT → **19-26 PT**.

### 8.4 Cowork-Beispiel-Patch (zur Demonstration der Verbesserung)

Falls User wünscht, kann M1 mat-1-2 Überleitung als Beispiel-Patch Cowork-side umgesetzt werden — zeigt wie eine korrekte problemorientierte Überleitung aussieht. Aufwand ~5 Min.

---

**Nachtrag abgeschlossen 2026-04-27 Abend.** Methodik: User-Pädagogen-Befund 2+3 + Sandbox-Empirie auf 28 Aufgaben + 22 Materialien + 16 Überleitungen. 2 NEUE Backlog-Items (F-PB-88+89). Total v0.5.1-Backlog: 39 Items.
