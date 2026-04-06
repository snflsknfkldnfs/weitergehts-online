# Dispatch: Feedback-Schema-Backfill Mappen 1-4 (AU-2a)

**Datum:** 2026-04-06
**AU:** AU-2a (Phase IV Wave 1)
**Scope:** 26 Aufgaben in escape-games/gpg-erster-weltkrieg-ursachen/data.json (Mappen 1-4, inkl. AU-1 Neue)
**Pattern:** Analog BLOOM_KLASSIFIKATION_MAPPEN_1_4.md (Option C Hybrid Auto-Generator)
**Zweck:** Fertige Feedback-Objekte, die Claude-Code 1:1 ins feedback-Feld der jeweiligen Aufgabe schreibt.

---

## Regeln

**Schema-Treue (VERTRAG_FEEDBACK_SCHEMA.md §2):**
- Jedes Feedback-Objekt hat exakt drei Felder: `typ`, `text`, `ebene`.
- `typ` ∈ {bestaetigung, korrektur, hinweis, verknuepfung}
- `text`: direkte Anrede "du", 1–3 Sätze, max 400 Zeichen, keine Emojis, kein Lehrer-Meta.
- `ebene` ∈ {wissen, verstaendnis, anwendung, analyse}

**Multi-Option-Typen (MC, Zuordnung, Reihenfolge):**
- Feedback ist ein Array mit **genau so vielen Einträgen wie Optionen/Positionen**.
- Reihenfolge entspricht der Optionen/Lösungs-Reihenfolge.
- Pro Eintrag: `typ = "bestaetigung"` (richtig) oder `typ = "korrektur"` (falsch).

**Single-Output-Typen (Freitext, Lueckentext, Vergleich, Begruendung):**
- Array mit 2–3 Einträgen.
- Mindestens 1× `bestaetigung`.
- Optional: 1× `korrektur` (häufigstes Fehlmuster) + 1× `verknuepfung` (Material-ID/Aufgaben-ID).

**Bloom-Projektion (VERTRAG_FEEDBACK_SCHEMA.md §9.3):**
| bloom_level | ebene |
|---|---|
| 1–2 | wissen |
| 3 | verstaendnis |
| 4 | anwendung |
| 5–6 | analyse |

**Didaktik (A26, GUETEKRITERIEN_AUFGABEN.md §3.1b):**
- Bestätigungen: Lernziel kurz benennen, nicht nur "Richtig!".
- Korrektionen: Fehler konkret, Material-ID, Re-Try-Impuls.
- Verknüpfungen: Material/Aufgaben-ID explizit.
- Keine normativen Antworten bei offenen Aufgaben; mehrere Positionen anerkennen.

**Review-Block (A26-Gatekeeper):**
Jede Aufgabe erhält am Ende `REVIEW: [ ] Autor-Review pending`.
Der Aufgaben-Autor (User) muss alle 26 Feedbacks gegen A26 prüfen und abhaken, bevor Claude-Code die Patches in data.json übernimmt.

---

## Mappe 1 — Pulverfass Europa

### aufgabe-1-1
- **typ:** multiple-choice
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fakt-Wiedererkennung: Welche Länder bildeten den Dreibund?
- **optionen:** 4 Optionen: (1) richtig, (2)–(4) Distraktoren
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Du erkennst die Mitgliedstaaten des Dreibunds korrekt: Deutschland, Österreich-Ungarn und Italien bildeten das Bündnis gegen die Entente.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist die Entente — Frankreich, Großbritannien und Russland. Der Dreibund bestand aus Deutschland, Österreich-Ungarn und Italien. Schau nochmal in mat-1-2.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Diese Kombination gab es nicht. Der Dreibund war Deutschland, Österreich-Ungarn und Italien — schau in mat-1-2 nach.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist eine andere Konstellation. Der Dreibund war Deutschland, Österreich-Ungarn und Italien.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-1-2
- **typ:** lueckentext
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fachbegriffs-Recall aus Bülow-Zitat.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — Bülow forderte Deutschlands 'Platz an der Sonne'. Das war ein Symbol für Deutschlands imperialistischen Anspruch auf Kolonien und Macht.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das Wort 'Sonne' ist im Zitat richtig — 'Platz an der Sonne'. Das bedeutete Kolonien und Großmachtstatus. Schau in mat-1-4 nach.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht das Zitat aus mat-1-4. Der richtige Begriff ist 'Sonne' — 'Platz an der Sonne'.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-1-3
- **typ:** multiple-choice
- **bloom_level:** 3 → **ebene:** verstaendnis
- **kurz-zusammenfassung:** Vergleich zweier Europakarten (Bismarck vs. 1914) — Veränderungen erkennen.
- **optionen:** 4 Optionen: (1) richtig, (2)–(4) Distraktoren
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — unter Bismarck gab es ein Gleichgewichtssystem aus vielen locker verbundenen Mächten. 1914 hatten sich zwei fest zusammengewachsene, einander feindselige Blöcke gebildet. Das ist der entscheidende Unterschied zwischen den Karten.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — Deutschland hatte 1914 weniger verlässliche Verbündete. Der Fehler: Die Blockkonstellation vergleichen! Schau in mat-1-7 und mat-1-2 nach, wie die Blöcke sich verfestigt haben.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist falsch — Russland gehörte zur Entente, nicht zum Dreibund. Der richtige Vergleich: Bismarcks lockeres System → zwei feste, feindselige Blöcke 1914.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht korrekt — Großbritannien war unter Bismarck eher isoliert. Erst später verbündete es sich mit Frankreich und Russland. Vergleiche die Kartenstände in mat-1-2 und mat-1-7.", "ebene": "verstaendnis"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-1-4
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Bild-Interpretation Karikatur 'Der Koloss von Rhodos' — Imperialismus-Bedeutung.
- **optionen:** 4 Optionen: (1) richtig, (2)–(4) Distraktoren
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — die Karikatur zeigt, wie europäische Mächte ganze Kontinente unter ihre Kontrolle bringen wollten. Der Riesenkoloss steht für den maßlosen imperialistischen Anspruch auf Afrika und darüber hinaus.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch — es geht nicht um Sport. Die Karikatur zeigt europäischen Imperialismus: Eine Macht streckt die Beine über einen ganzen Kontinent. Schau mat-1-8 nochmal an.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist das Gegenteil der Aussage — die Karikatur zeigt, dass die Aufteilung NICHT friedlich war, sondern brutal und gierig. Sieh dir mat-1-8 erneut an.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht die Aussage der Karikatur — sie zeigt Gewalt und Herrschsucht, nicht Versöhnung.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-1-5
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Metaphern-Verständnis: 'Pulverfass Europa' — Bedeutung.
- **optionen:** 4 Optionen: (1) richtig, (2)–(4) Distraktoren
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — die Metapher 'Pulverfass' beschreibt einen Zustand der Anspannung und Gefahr: Ein kleiner Funken (das Attentat) kann eine riesige Explosion (Krieg) auslösen. Europa war angespannt und bereit zu explodieren.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — es geht nicht um echte physische Munition, sondern um eine Metapher für Spannung und Kriegsgefahr. Schau in mat-1-1 nach.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist zu einfach — während Waffen produziert wurden, meint 'Pulverfass' vor allem die politische Spannung und das Krisenrisiko, nicht nur die Waffenproduktion.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch — Europa war nicht durch Naturkatastrophen bedroht, sondern durch politische und militärische Spannungen.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

---

## Mappe 2 — Das Attentat von Sarajevo

### aufgabe-2-1
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Bild-Interpretation: Was zeigt die Illustration und das Foto vom Attentat?
- **optionen:** 4 Optionen: (1) richtig, (2)–(4) Distraktoren
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — die Quellen zeigen: Gavrilo Princip schoss Erzherzog Franz Ferdinand und seine Frau Sophie am 28. Juni 1914 in Sarajevo. Das ist die zentrale Fakten-Aussage beider Quellen in mat-2-2 und mat-2-3.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — der Attentäter war Gavrilo Princip, ein Serbe, kein Franzose. Und das Opfer war der Erzherzog von Österreich-Ungarn, nicht der Kaiser. Schau mat-2-2 und mat-2-3 erneut an.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch — das Attentat war am 28. Juni 1914 in Sarajevo, nicht im Januar und nicht im Wiener Parlament. Vergleich mit mat-2-3.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht korrekt — Franz Ferdinand starb unmittelbar an den Schussverletzungen, nicht erst Wochen später. Schau mat-2-2 und mat-2-3 an.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-2-2
- **typ:** zuordnung
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Text-Kategorisierung: Langfristige Ursachen vs. konkreter Auslöser des Krieges.
- **loesung:** {"Annexion Bosnien-Herzegowinas durch Österreich-Ungarn (1908)": "Langfristige Ursache", "Bündnissysteme zwischen den Großmächten (Dreibund und Entente)": "Langfristige Ursache", "Erschießung von Franz Ferdinand und Sophie in Sarajevo": "Konkreter Auslöser", "Balkankriege (1912/1913)": "Langfristige Ursache", "Rivalitäten und Misstrauen der europäischen Großmächte": "Langfristige Ursache"}
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Korrekt — du unterscheidest zwischen langfristigen, tiefgreifenden Ursachen (Imperialismus, Bündnissysteme, Rivalitäten) und dem konkreten Auslöser (Attentat). Das ist das Kernverständnis aus mat-2-1: Ein Funke (Attentat) zündet, aber nur, weil das 'Pulverfass' (Langzeitkonflikte) schon geladen ist.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht vollständig korrekt — schau genauer hin: Das Attentat ist der konkrete Auslöser, die meisten anderen Faktoren sind langfristige Ursachen. mat-2-1 hilft dir, diese Unterscheidung zu treffen.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-2-3
- **typ:** reihenfolge
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Zeitleiste der Julikrise: Chronologische Ordnung der Ereignisse.
- **loesung:** ["Gavrilo Princip erschießt Franz Ferdinand und Sophie in Sarajevo", "Deutschland sichert Österreich-Ungarn bedingungslose Unterstützung zu (Blankoscheck)", "Österreich-Ungarn stellt Serbien ein Ultimatum mit unerfüllbaren Forderungen", "Österreich-Ungarn erklärt Serbien den Krieg", "Großbritannien erklärt Deutschland den Krieg — fast alle Großmächte sind im Krieg"]
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — du kennst die Abfolge der Julikrise: Attentat → Blankoscheck → Ultimatum → Kriegserklärung Österreichs → Dominoeffekt in die Weltkriegszusammenhang. Die Zeitleiste in mat-2-5 zeigt dies präzise.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch geordnet — schau dir mat-2-5 nochmal an und ordne nach den tatsächlichen Daten: Attentat zuerst, dann Blankoscheck, dann Ultimatum, dann Kriegserklärungen.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-2-4
- **typ:** lueckentext
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fachbegriffs-Recall: Blankoscheck, Ultimatum, Ermittlungen, 48 Stunden.
- **loesung:** ["Blankoscheck", "Ultimatum", "Ermittlungen", "48"]
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Perfekt — du kennst die Schlüsselbegriffe der diplomatischen Krise: Deutschland gab einen Blankoscheck, Österreich stellte ein Ultimatum mit extremen Forderungen (Ermittlungen), das nur 48 Stunden gültig war. Das zeigt die Eskalation.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Nicht ganz richtig — überprüf deine Antworten. Die richtigen Begriffe aus dem Quellentext mat-2-4 sind: Blankoscheck, Ultimatum, Ermittlungen, 48. Liest du nochmal den Text aufmerksam?", "ebene": "wissen"},
  {"typ": "hinweis", "text": "Das ist eine Fakten-Aufgabe — es gibt nur eine richtige Antwort pro Lücke. Schau in mat-2-4 nach und versuche es erneut.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-2-5
- **typ:** freitext-code
- **bloom_level:** 5 → **ebene:** analyse
- **kurz-zusammenfassung:** Beurteilung: War das Attentat allein Grund für den Krieg, oder brauchte es Ursachen?
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Gut erkannt — das Attentat war der Auslöser, aber nicht die Ursache allein. Ohne Bündnissysteme, Imperialismus und gegenseitiges Misstrauen (mat-2-1) hätte ein Attentat nicht zu einem Weltkrieg geführt. Du erkennst die Kettenreaktion richtig.", "ebene": "analyse"},
  {"typ": "korrektur", "text": "Das ist zu einfach — ein Attentat allein führt nicht zu einem Weltkrieg. Schau mat-2-1 und mat-2-5 erneut an: Ohne die langfristigen Spannungen (Imperialismus, Bündnisse) wäre das Attentat ein lokales Ereignis geblieben.", "ebene": "analyse"},
  {"typ": "verknuepfung", "text": "Deine Antwort zeigt die Dynamik der Aufgaben 2-1 bis 2-4: Das Attentat ist ein Funke, aber das Pulverfass war schon geladen (mat-2-1: Imperialismus, Rivalitäten). Die Julikrise (mat-2-5: Kettenreaktion) zeigt, wie die Ursachen den Weg zum Krieg pflastern.", "ebene": "analyse"}
]
```
- **REVIEW:** [ ] Autor-Review pending

---

## Mappe 3 — Kriegsbegeisterung 1914

### aufgabe-3-1
- **typ:** lueckentext
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fachbegriffs-Recall: Kriegsbegeisterung, Augustusrausch, Nationalismus, Propaganda.
- **loesung:** ["Kriegsbegeisterung", "Augustusrausch", "Nationalismus", "Propaganda"]
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — du kennst die Begriffe für 1914: Kriegsbegeisterung und ihr Phänomen Augustusrausch beschreiben die Euphorie. Nationalismus war der emotionale Grund, Propaganda das Werkzeug der Regierung. Das alles steht in mat-3-1.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht ganz richtig — überprüf deine Begriffe. Schau in mat-3-1 nach: Es geht um Kriegsbegeisterung, Augustusrausch, Nationalismus und Propaganda (nicht Patriotismus oder Militarismus allein).", "ebene": "wissen"},
  {"typ": "hinweis", "text": "Eine oder mehr Lücken stimmen nicht. Lies mat-3-1 nochmal gründlich durch.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-2
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Bild-Interpretation: Was zeigt das Foto vor dem Stadtschloss?
- **optionen:** 4 Optionen (1 richtig, 3 Distraktoren)
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — das Foto zeigt die Menschenmenge vor dem Stadtschloss, die Kriegsbegeisterung und Jubel ausdrückt. Das ist die visuelle Darstellung der Augustusrausch-Stimmung, die mat-3-2 dokumentiert.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch — das Foto zeigt Jubel und Begeisterung, nicht Trauer oder Widerstand. Schau mat-3-2 erneut an.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — es war nicht ein gezielter Propaganda-Auftritt, sondern eine spontane (oder zumindest dokumentierte) Menschenmenge in Kriegsbegeisterung.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht korrekt — das Foto zeigt Menschen, die den Krieg unterstützen, nicht dagegen protestieren.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-3
- **typ:** zuordnung
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Ursachen-Beschreibungen kategorisieren (z.B. Imperialismus, Nationalismus, etc.)
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — du ordnest die Ursachen der Kriegsbegeisterung korrekt zu. Das zeigt, dass du verstehst, wie Imperialismus, Nationalismus und Propaganda zusammenhängend eine ganze Gesellschaft zur Kriegsunterstützung führten.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das stimmt nicht ganz — lies mat-3-1 nochmal und überprüfe deine Zuordnung der Ursachen.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-4
- **typ:** multiple-choice
- **bloom_level:** 3 → **ebene:** verstaendnis
- **kurz-zusammenfassung:** Quellenkritik: Warum Foto Jubel zeigt, aber Quellen Angst erwähnen?
- **optionen:** 4 Optionen (1 richtig, 3 Distraktoren)
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — du erkennst das Quellenkritik-Problem: Das Foto zeigt öffentlichen Jubel, aber private Quellen (mat-3-3, mat-3-4) offenbaren Angst und Zweifel dahinter. Das ist typisch für Propaganda: Die Öffentlichkeit wird gezeigt, um Unterstützung zu erzeugen, aber Menschen haben private Sorgen.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — die Frage zielt auf Quellenkritik: Ein Foto zeigt public Jubel, aber Quellentexte offenbaren private Gefühle (Angst, Skepsis). Das ist der Unterschied. Schau mat-3-3 und mat-3-4 an.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist zu einfach — es geht nicht nur um unterschiedliche Zeitpunkte, sondern um unterschiedliche Quellentypen: öffentliche Inszenierung vs. private Gedanken.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist falsch — es gab sehr wohl Angst und Zweifel (mat-3-4). Die Propaganda versuchte, diese zu verbergen.", "ebene": "verstaendnis"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-5
- **typ:** lueckentext
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fachbegriffs-Recall: Burgfrieden.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — der Burgfrieden war die politische Einigung: Alle Parteien stellen innere Konflikte zurück und unterstützen den Krieg gemeinsam. Das zeigt mat-3-4.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — Burgfrieden bedeutet nicht eine zeitliche Pause, sondern eine politische Einigung: Innere Konflikte werden zurückgestellt für Kriegseinheit.", "ebene": "wissen"},
  {"typ": "hinweis", "text": "Das ist eine Fakten-Aufgabe. Schau in mat-3-4 nach, was 'Burgfrieden' bedeutet.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-6
- **typ:** zuordnung
- **bloom_level:** 3 → **ebene:** verstaendnis
- **kurz-zusammenfassung:** Zitate → Haltungen: Begeisterung, Angst, Pflichtgefühl.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Gut gemacht — du erkennst, dass hinter der Kriegsbegeisterung unterschiedliche Gefühle und Motive stecken: echte Begeisterung, unterdrückte Angst und Pflichtdruck. Das ist Quellenkritik: Ein Zitat allein verrät nicht die ganze Wahrheit.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht ganz richtig — überprüf deine Kategorisierung mit mat-3-4 und mat-3-5. Unterscheide zwischen echtem Enthusiasmus, versteckter Angst und Pflichtgefühl.", "ebene": "verstaendnis"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-3-7
- **typ:** freitext-code
- **bloom_level:** 5 → **ebene:** analyse
- **kurz-zusammenfassung:** Beurteilung: Bringt gesellschaftlicher Druck heute Menschen zum Schweigen?
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Stark analysiert — du erkennst die Kontinuität: 1914 führte sozialer Druck zum Schweigen von Kritik, und heute ähnliche Muster. Das ist historische Lernfähigkeit: Verstehen, dass Propaganda und Gruppendruck zeitlos sind.", "ebene": "analyse"},
  {"typ": "korrektur", "text": "Das ist nicht ausreichend begründet — verbinde 1914 und Gegenwart klarer. Wie wirkt Druck zu Schweigen 1914 vs. heute? Schau mat-3-5 und mat-3-4 nochmal an.", "ebene": "analyse"},
  {"typ": "verknuepfung", "text": "Deine Antwort zeigt den Zusammenhang: Aufgabe 3-4 zeigt, wie Propaganda und Druck Angst verbergen. Aufgabe 3-6 zeigt unterschiedliche Haltungen. Aufgabe 3-7 überträgt das auf heute. Das ist historische Perspektivnahme.", "ebene": "analyse"}
]
```
- **REVIEW:** [ ] Autor-Review pending

---

## Mappe 4 — Der Schlieffen-Plan

### aufgabe-4-1
- **typ:** lueckentext
- **bloom_level:** 1 → **ebene:** wissen
- **kurz-zusammenfassung:** Fachbegriffs-Recall: Begriffe zum Schlieffen-Plan.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — du kennst die Fachbegriffe rund um Schliffens Strategie. Das sind die Bausteine zum Verständnis, wie Deutschlands Plan funktionieren sollte.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht ganz richtig — überprüf deine Begriffe mit mat-4-1. Die richtigen Fachbegriffe sind dort definiert.", "ebene": "wissen"},
  {"typ": "hinweis", "text": "Schau in mat-4-1 nach und versuche es erneut.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-2
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Warum plante Deutschland einen Angriff über Belgien?
- **optionen:** 4 Optionen (1 richtig, 3 Distraktoren)
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Genau — Deutschlands Strategie war: über Belgien angreifen, um Frankreich schnell zu überrennen, bevor Russland im Osten angreifen konnte. Das ist die Logik des Schlieffen-Plans aus mat-4-2.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — schau mat-4-2 an. Der Plan war nicht defensiv, sondern ein schneller, massiver Überfall über Belgien.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das stimmt nicht — Deutschland griff an, nicht um Belgien zu schützen. Schau mat-4-2.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht der Grund — die Strategie war Tempo und Überraschung, nicht geografische Nähe allein.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-3
- **typ:** reihenfolge
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Chronologische Ordnung: Friedrichs Erlebnisse.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Korrekt — du erkennst die Abfolge von Friedrichs Erlebnissen als Zeuge des Krieges. Das hilft dir, den Schlieffen-Plan nicht nur als strategische Abstraktion, sondern als Erlebnis real lebender Menschen zu verstehen.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht in der richtigen Reihenfolge — schau mat-4-3 nochmal an und ordne nach den Daten.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-4
- **typ:** zuordnung
- **bloom_level:** 3 → **ebene:** verstaendnis
- **kurz-zusammenfassung:** Geplant vs. wirklich an der Marne — Gegenüberstellung Plan/Realität.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Gut erkannt — du vergleichst Plan und Wirklichkeit: Schlieffen plante einen schnellen, umfassenden Sieg. Die Schlacht an der Marne zeigte das Scheitern: Deutschland konnte nicht schnell genug siegen, geriet in Stellungskrieg. Das ist Anwendung eines Vergleichsschemas.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht ganz richtig — überprüf, welche Aussagen zum Plan gehören und welche zur Realität der Schlacht an der Marne. mat-4-4 hilft.", "ebene": "verstaendnis"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-5
- **typ:** multiple-choice
- **bloom_level:** 2 → **ebene:** wissen
- **kurz-zusammenfassung:** Bild-Interpretation: Was zeigt Foto über Scheitern des Plans?
- **optionen:** 4 Optionen (1 richtig, 3 Distraktoren)
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Richtig — das Foto zeigt visuell das Scheitern: Schlamm, Gräben, Soldaten ohne Bewegung. Das ist der Gegensatz zum Schlieffen-Plan (schnell, mobil). Der Stellungskrieg war sein Alptraum.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist falsch — das Foto zeigt das Gegenteil der Plan-Vision: nicht schnelle Bewegung, sondern Stillstand im Schlamm. Das ist Stillstand, nicht Sieg.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht richtig — Schlieffen wollte schnellen Bewegungskrieg, nicht Stellungskrieg. Das Foto zeigt das Gegenteil.", "ebene": "wissen"},
  {"typ": "korrektur", "text": "Das ist nicht korrekt — Technologie allein konnte nicht retten, was die Strategie verfehlte.", "ebene": "wissen"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-6
- **typ:** reihenfolge
- **bloom_level:** 3 → **ebene:** verstaendnis
- **kurz-zusammenfassung:** Ereigniskette: Weg vom Schlieffen-Plan zum Stellungskrieg.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Gut gemacht — du erkennst die Ursache-Wirkung-Kette: Der Plan scheitert (Marne), Deutschlands Hoffnung auf schnellen Sieg zerbricht, und der Stellungskrieg entsteht. Das ist strategisches Verständnis.", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "Das ist nicht ganz richtig — überprüf die logische Abfolge. Schau in mat-4-1 bis mat-4-5, wie der Plan zerbricht und zum Stellungskrieg führt.", "ebene": "verstaendnis"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-7
- **typ:** freitext-code
- **bloom_level:** 4 → **ebene:** anwendung
- **kurz-zusammenfassung:** Analytische Frage: Warum musste der Plan scheitern?
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Sehr gut — du analysierst die Scheiterungsursachen des Plans: logistische Grenzen, französischer Widerstand, russische Mobilisierung. Das zeigt, dass du verstehst, wie strategische Pläne an Realität scheitern.", "ebene": "anwendung"},
  {"typ": "korrektur", "text": "Das ist zu oberflächlich — gib konkrete Gründe: Was war das Problem? Timing? Kräfte? Gegenwehr? Schau mat-4-1 bis mat-4-5 an und benennen die Scheiterungsursachen präzise.", "ebene": "anwendung"},
  {"typ": "verknuepfung", "text": "Deine Analyse zeigt die Verkettung: Aufgabe 4-4 (Soll vs. Ist), Aufgabe 4-6 (Kettenreaction zum Stellungskrieg), Aufgabe 4-7 (Warumfrage). Das ist historisches Denken: Verstehen, dass Pläne an Wirklichkeit brechen.", "ebene": "anwendung"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-8
- **typ:** vergleich
- **bloom_level:** 4 → **ebene:** anwendung
- **kurz-zusammenfassung:** Strukturraster: Schlieffen-Plan vs. wirkliche Kriegsereignisse an der Marne.
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Excellent — du erkennst, wie ein Vergleichsraster Unterschiede und Ähnlichkeiten sichtbar macht: Schnelligkeit (Plan vs. Langsamkeit Wirklich), Umfassung (Plan) vs. Frontalhalt (Wirklich), deutsche Überlegenheit (geplant) vs. französischer/britischer Widerstand (wirklich). Das ist analytisches Arbeiten mit Strukturen.", "ebene": "anwendung"},
  {"typ": "korrektur", "text": "Das ist nicht vollständig — überprüfe, dass jede Dimension des Plans auch gegen die Wirklichkeit gemessen wird. Ein Vergleichsraster sollte keine leeren Zellen haben.", "ebene": "anwendung"}
]
```
- **REVIEW:** [ ] Autor-Review pending

### aufgabe-4-9
- **typ:** begruendung
- **bloom_level:** 5 → **ebene:** analyse
- **kurz-zusammenfassung:** CER-These mit Evidence und Reasoning: Warum war der Plan zum Scheitern verurteilt?
- **feedback:**
```json
[
  {"typ": "bestaetigung", "text": "Stark argumentiert — du stellst eine These auf, belegst sie mit historischen Beispielen (Marne, Verluste, Logistik) und erklärst, warum diese Beweise deine These stützen. Das ist wissenschaftliche Argumentation (Claim-Evidence-Reasoning).", "ebene": "analyse"},
  {"typ": "korrektur", "text": "Das ist unvollständig — eine gute Begruendung braucht (1) eine klare These (Claim), (2) konkrete Belege aus Materialien (Evidence), (3) eine Erklärung, warum Belege die These stützen (Reasoning). Schau mat-4-1 bis mat-4-5 an und versuche es nochmal.", "ebene": "analyse"},
  {"typ": "verknuepfung", "text": "Deine Analyse zeigt die Tiefe der Mappe: Von Faktenerinnerung (Aufgabe 4-1) über Vergleiche (4-4, 4-8) zur analytischen Beurteilung (4-9). Du beweist, dass du den Schlieffen-Plan als historisches Phänomen beherrschst — nicht nur als abstrakte Strategie, sondern als gescheiterte Hoffnung.", "ebene": "analyse"}
]
```
- **REVIEW:** [ ] Autor-Review pending

---

## Zusammenfassung

- **Total:** 26 Aufgaben
- **Davon neu-gebackfillt:** 24 (Mappen 1–4, alles mit feedback=null)
- **Davon SKIP (bereits Schema-konform):** 2 (aufgabe-4-8, aufgabe-4-9 aus AU-1 haben selbst feedback=null, aber werden hier gleich mitbackgefüllt, da noch keine Feedbacks vorhanden)
- **Tatsächlich:** Alle 26 erhalten Feedback, da alle feedback=null hatten.
- **Cache-Bust nach data.json-Patch:** v=4.0 → v=4.1 in allen HTMLs der Unterseite `escape-games/gpg-erster-weltkrieg-ursachen/`

---

## Verweise

- VERTRAG_FEEDBACK_SCHEMA.md §2 (Feld-Regeln), §9 (Backfill-Generator-Spec)
- VERTRAG_PHASE_2-2b_AUFGABE.md Sektion "Feedback-Schema-Pflichtfeld"
- GUETEKRITERIEN_AUFGABEN.md §3.1b (A25 Schema-Vollstaendigkeit, A26 Didaktische Feedback-Validitaet)
- BLOOM_KLASSIFIKATION_MAPPEN_1_4.md (Bloom-Level-Zuweisungen für alle 26 Aufgaben)
- escape-games/gpg-erster-weltkrieg-ursachen/data.json (Quell-Dateiatei)

**Uebergabe Claude-Code:** Diese Dispatch wird in AU-2a Schritt 15 als Eingabe für Patch-Generator verwendet. Der Code-Strang liest diese Datei, extrahiert für jede aufgabe-N-M die Feedback-Objekte und schreibt sie in das data.json-Feld `aufgaben[].feedback` der jeweiligen Aufgabe.

