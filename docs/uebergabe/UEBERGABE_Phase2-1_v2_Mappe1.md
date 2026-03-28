# Uebergabe: Phase 2.1 v2 — Mappe 1 mit Artefakt-Pipeline + Self-Hosting

**Erstellt:** 2026-03-25
**Ersetzt:** UEBERGABE_Phase2-1_PROTOTYP_Mappe1.md (veraltet — kein Self-Hosting, nur 2 Bilder)
**Zweck:** Claude Code produziert Mappe 1 mit erweitertem Artefakt-Bestand (5 statt 2 Bilder), Self-Hosting aller Bilder, und deployt den aktualisierten Prototyp.

---

## Kontext

- **Game-ID:** gpg-erster-weltkrieg-ursachen
- **Mappe:** 1 ("Pulverfass Europa")
- **Was ist neu gegenueber v1:**
  - ARTEFAKT_INVENTAR mit 5 qualifizierten + 2 Reserve-Bildern (statt 2)
  - Bild-Download + Self-Hosting unter `assets/img/` (loest 429-Problem)
  - 3 neue Materialien: Bismarck-Kartenvergleich, Rhodes-Karikatur, Schlachtgeschwader
  - 9 Materialien statt 6
  - Aufgaben praeziser auf Materialien abgestimmt

## Eingabe-Dokumente

| Dokument | Pfad (relativ zu docs/) | Rolle |
|---|---|---|
| ARTEFAKT_INVENTAR | `agents/artefakte/ARTEFAKT_INVENTAR_gpg-erster-weltkrieg-ursachen.md` | **NEU** — Qualifizierte Bilder mit Download-URLs + Self-Hosting-Pfade |
| MATERIAL_GERUEST Mappe 1 | `agents/artefakte/MATERIAL_GERUEST_gpg-erster-weltkrieg-ursachen_Mappe1.md` | Materialtyp-Zuordnung (erweitert um mat-1-7 bis mat-1-9) |
| SKRIPT Chunk 1 | `agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` | Textgrundlage |
| INHALTSBASIS | `agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` | Fakten, Zitate, Rollenprofile |
| DIDAKTIK_RAHMEN | `agents/artefakte/DIDAKTIK_RAHMEN_gpg-erster-weltkrieg-ursachen.md` | Zielgruppe, KE-Matrix |

## Subagenten-Prompts (unter docs/agents/)

| Subagent | Prompt-Datei | Fuer mat-IDs |
|---|---|---|
| SUB_DARSTELLUNGSTEXT | `AGENT_SUB_DARSTELLUNGSTEXT.md` | mat-1-1 |
| SUB_BILDQUELLE | `AGENT_SUB_BILDQUELLE.md` | mat-1-2, mat-1-5, mat-1-7, mat-1-8, mat-1-9 |
| SUB_ZEITLEISTE | `AGENT_SUB_ZEITLEISTE.md` | mat-1-3 |
| SUB_QUELLENTEXT | `AGENT_SUB_QUELLENTEXT.md` | mat-1-4 |
| SUB_TAGEBUCH | `AGENT_SUB_TAGEBUCH.md` | mat-1-6 |

---

## Schritt 0: Bilder herunterladen (Self-Hosting)

**ZUERST** alle 5 Bilder herunterladen und lokal speichern. Das muss VOR der Material-Produktion passieren, damit SUB_BILDQUELLE die lokalen Pfade verwenden kann.

```bash
# Verzeichnis erstellen
mkdir -p assets/img/gpg-erster-weltkrieg-ursachen

# 5 qualifizierte Bilder herunterladen
curl -L -o assets/img/gpg-erster-weltkrieg-ursachen/img-1-1.png \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Map_Europe_alliances_1914-en.svg/800px-Map_Europe_alliances_1914-en.svg.png"

curl -L -o assets/img/gpg-erster-weltkrieg-ursachen/img-1-2.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kaiser_Wilhelm_II_of_Germany_-_1902.jpg/440px-Kaiser_Wilhelm_II_of_Germany_-_1902.jpg"

curl -L -o assets/img/gpg-erster-weltkrieg-ursachen/img-1-3.png \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Map_of_Bismarcks_alliances-en.svg/800px-Map_of_Bismarcks_alliances-en.svg.png"

curl -L -o assets/img/gpg-erster-weltkrieg-ursachen/img-1-4.png \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Punch_Rhodes_Colossus.png/440px-Punch_Rhodes_Colossus.png"

curl -L -o assets/img/gpg-erster-weltkrieg-ursachen/img-1-5.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/2nd_Battle_Squadron.jpg/640px-2nd_Battle_Squadron.jpg"
```

**Verifikation:** Jede Datei muss > 10 KB sein. Falls eine 0 Bytes oder eine HTML-Fehlerseite ist → Fehler dokumentieren, RESERVE-Bild versuchen.

---

## Schritt 1: Subagenten-Prompts lesen

Lies ZUERST alle 5 Subagenten-Prompts (AGENT_SUB_*.md). Dann ARTEFAKT_INVENTAR + MATERIAL_GERUEST + SKRIPT Chunk 1 + INHALTSBASIS.

## Schritt 2: Material-Produktion (9 Materialien)

### mat-1-1: Darstellungstext → SUB_DARSTELLUNGSTEXT

```
mat_id: mat-1-1
titel: "Pulverfass Europa — Spannungen vor 1914"
skript_chunk: SKRIPT Chunk 1, §1-§2
tafelbild_knoten: k1-1 (Pulverfass Europa), k1-2 (Imperialismus), k1-3 (Nationalismus)
artefakt_ref: —
jahrgangsstufe: R7 Mittelschule Bayern
fach: GPG
vorgaenger_mappe: keine
```

### mat-1-2: Bildquelle (Karte Buendnisse 1914) → SUB_BILDQUELLE

```
mat_id: mat-1-2
titel: "Europakarte 1914: Buendnisse"
artefakt_ref: img-1-1
lokaler_pfad: ../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-1.png
lizenz: CC-BY-SA 2.5
urheber: historicair / Fluteflute & Bibi Saint-Pol
beschreibung: Karte der europaeischen Militaerbuendnisse 1914 (Dreibund gruen, Triple Entente rot)
skript_chunk: SKRIPT Chunk 1, §3-§4
tafelbild_knoten: k1-4 (Dreibund), k1-5 (Triple Entente)
```

### mat-1-3: Zeitleiste → SUB_ZEITLEISTE

```
mat_id: mat-1-3
titel: [Subagent formuliert als Leitfrage]
skript_chunk: SKRIPT Chunk 1, §3-§4
inhaltsbasis_chronologie: INHALTSBASIS Mappe 1, Zahlen/Daten
tafelbild_knoten: k1-4, k1-5
zeitspanne: 1879-1907
```

### mat-1-4: Quellentext (Buelow-Rede) → SUB_QUELLENTEXT

```
mat_id: mat-1-4
titel: "Platz an der Sonne — Deutschlands Anspruch"
artefakt_ref: zit-1-1
zitat_daten: Sprecher: Bernhard von Buelow, Reichstagsrede 1897
skript_chunk: SKRIPT Chunk 1, §2
tafelbild_knoten: k1-2 (Imperialismus)
```

### mat-1-5: Bildquelle (Wilhelm II.) → SUB_BILDQUELLE

```
mat_id: mat-1-5
titel: "Kaiser Wilhelm II."
artefakt_ref: img-1-2
lokaler_pfad: ../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-2.jpg
lizenz: Public Domain
urheber: Studio of Thomas Heinrich Voigt
beschreibung: Portraet Kaiser Wilhelm II. in Uniform, 1902
skript_chunk: SKRIPT Chunk 1, §5
tafelbild_knoten: k1-6 (Wettruestung)
```

### mat-1-6: Tagebuch (Diplomat) → SUB_TAGEBUCH

```
mat_id: mat-1-6
titel: "Tagebuch eines Diplomaten"
artefakt_ref: rolle-1-1
rollenprofil: Diplomat im Auswaertigen Amt, Buendnisverhandlungen, Einkreisungsangst
skript_chunk: SKRIPT Chunk 1, §3-§5
tafelbild_knoten: k1-7 (Kettenreaktion)
mappe_titel: "Pulverfass Europa"
```

### mat-1-7: Bildquelle (Bismarck-Karte — Kartenvergleich) → SUB_BILDQUELLE ← NEU

```
mat_id: mat-1-7
titel: "Bismarcks Buendnissystem — Europakarte vor 1914"
artefakt_ref: img-1-3
lokaler_pfad: ../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-3.png
lizenz: CC-BY-SA 4.0
urheber: DutchTreat
beschreibung: Karte von Bismarcks Buendnispolitik (Gleichgewichtssystem)
skript_chunk: SKRIPT Chunk 1, §3 (Buendnisbildung)
tafelbild_knoten: k1-4 (Dreibund), k1-7 (Kettenreaktion)
didaktischer_hinweis: Kartenvergleich mit mat-1-2 (Buendnisse 1914). SuS beschreiben Wandel.
```

### mat-1-8: Bildquelle (Rhodes Colossus — Karikatur) → SUB_BILDQUELLE ← NEU

```
mat_id: mat-1-8
titel: "Der Koloss von Rhodos — Karikatur zum Imperialismus"
artefakt_ref: img-1-4
lokaler_pfad: ../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-4.png
lizenz: Public Domain
urheber: Edward Linley Sambourne
beschreibung: Karikatur aus Punch, 1892: Cecil Rhodes als Koloss ueber Afrika (Cape-to-Cairo)
skript_chunk: SKRIPT Chunk 1, §2 (Imperialismus)
tafelbild_knoten: k1-2 (Imperialismus)
didaktischer_hinweis: Karikatur-Analyse (AFB II-III). SuS beschreiben Koerpersprache, Symbolik, Aussage des Zeichners.
```

### mat-1-9: Bildquelle (Schlachtgeschwader) → SUB_BILDQUELLE ← NEU

```
mat_id: mat-1-9
titel: "Britisches Schlachtgeschwader (ca. 1914)"
artefakt_ref: img-1-5
lokaler_pfad: ../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-5.jpg
lizenz: Public Domain
urheber: Unbekannt (aus "The Nations at War", 1917)
beschreibung: Schiffe des 2. Schlachtgeschwaders der Royal Navy Grand Fleet
skript_chunk: SKRIPT Chunk 1, §5 (Flottenrivalitaet)
tafelbild_knoten: k1-6 (Wettruestung)
didaktischer_hinweis: Visualisierung der Flottenrivalitaet. Dimension der Ruestung (4 Schlachtschiffe). Bezug zu Tirpitz-Plan.
```

## Schritt 3: Qualitaets-Gate pro Material

Nach jeder Produktion: Q-Gate aus Subagent-Prompt. Ergebnis dokumentieren.

## Schritt 4: Aufgaben (Phase 2.2)

5 Aufgaben (erweitert von 3 auf 5 wegen 3 neuer Materialien):

```
aufgabe-1-1: multiple-choice
  Frage: "Welche Laender bildeten den Dreibund?"
  Optionen: ["Deutschland, Oesterreich-Ungarn, Italien", "Frankreich, Grossbritannien, Russland", "Deutschland, Frankreich, Italien", "Grossbritannien, Oesterreich-Ungarn, Russland"]
  Loesung: "Deutschland, Oesterreich-Ungarn, Italien"
  material_referenz: ["mat-1-2"]
  Tipps: [{"stufe": 1, "text": "Schau dir die Europakarte genau an."}, {"stufe": 2, "text": "Die gruen markierten Laender bilden den Dreibund."}, {"stufe": 3, "text": "Es sind drei Laender in Mittel- und Suedeuropa."}]
  Punkte: 10

aufgabe-1-2: lueckentext
  Frage: "Bernhard von Buelow forderte fuer Deutschland einen 'Platz an der ___'."
  Loesung: "Sonne"
  material_referenz: ["mat-1-4"]
  Tipps: [{"stufe": 1, "text": "Lies den Quellentext von Buelow genau."}, {"stufe": 2, "text": "Es geht um Kolonialpolitik."}, {"stufe": 3, "text": "Das Wort reimt sich auf Wonne."}]
  Punkte: 10

aufgabe-1-3: multiple-choice
  Frage: "Vergleiche die beiden Europakarten. Was hat sich zwischen Bismarcks Zeit und 1914 veraendert?"
  Optionen: ["Aus Bismarcks Gleichgewichtssystem wurden zwei feindliche Bloecke", "Deutschland hatte 1914 mehr Verbuendete als unter Bismarck", "Russland gehoerte 1914 zum Dreibund", "Grossbritannien war schon unter Bismarck mit Frankreich verbuendet"]
  Loesung: "Aus Bismarcks Gleichgewichtssystem wurden zwei feindliche Bloecke"
  material_referenz: ["mat-1-7", "mat-1-2"]
  Tipps: [{"stufe": 1, "text": "Schau dir beide Karten nacheinander an: Welche Farben gibt es?"}, {"stufe": 2, "text": "Unter Bismarck gab es ein komplexes Netz — 1914 nur noch zwei Bloecke."}, {"stufe": 3, "text": "Bismarcks System hielt das Gleichgewicht. Nach ihm wurde es zur Konfrontation."}]
  Punkte: 15

aufgabe-1-4: multiple-choice
  Frage: "Was zeigt die Karikatur 'Der Koloss von Rhodos'?"
  Optionen: ["Einen Mann, der ganz Afrika beherrschen will", "Einen Sportler beim Weitsprung", "Einen Reisenden in der Wueste", "Einen Brueckenbauer in Europa"]
  Loesung: "Einen Mann, der ganz Afrika beherrschen will"
  material_referenz: ["mat-1-8"]
  Tipps: [{"stufe": 1, "text": "Beschreibe genau, was du siehst: Wo steht der Mann? Was hat er in der Hand?"}, {"stufe": 2, "text": "Cecil Rhodes plante eine Eisenbahn von Kairo bis Kapstadt — quer durch ganz Afrika."}, {"stufe": 3, "text": "Die Karikatur zeigt Imperialismus: Europaeische Maechte wollten Afrika unter sich aufteilen."}]
  Punkte: 10

aufgabe-1-5: multiple-choice
  Frage: "Was bedeutet die Metapher 'Pulverfass Europa'?"
  Optionen: ["Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt", "Europa hatte zu viel Schiesspulver gelagert", "Die Fabriken in Europa produzierten Waffen", "Europa war von Vulkanen bedroht"]
  Loesung: "Europa war bereit fuer einen Krieg — ein kleiner Anlass genuegt"
  material_referenz: ["mat-1-1"]
  Tipps: [{"stufe": 1, "text": "Denk an ein Fass voller Schiesspulver. Was passiert, wenn ein Funke hineinfaellt?"}, {"stufe": 2, "text": "Die Buendnisse und Rivalitaeten machten Europa explosiv."}, {"stufe": 3, "text": "Ein einziger Konflikt konnte eine Kettenreaktion ausloesen."}]
  Punkte: 10
```

## Schritt 5: Assembly (data.json)

Wie in v1, aber mit 9 Materialien, 5 Aufgaben, und **lokalen Bild-Pfaden** statt Wikimedia-URLs.

**KRITISCH:** Im `inhalt`-Feld aller bildquelle-Materialien den **lokalen Pfad** verwenden:
```json
"inhalt": "../../assets/img/gpg-erster-weltkrieg-ursachen/img-1-1.png"
```
**NICHT** die Wikimedia-CDN-URL.

Einstieg, Sicherung, Tafelbild: wie in v1 UEBERGABE (dort bereits definiert).

Freischalt-Code: **PULVER**

## Schritt 6: Engine-Kompatibilitaet + HTML

Wie in v1 UEBERGABE Schritt 6-7.

## Schritt 7: Git Commit + Push

```bash
git add assets/img/gpg-erster-weltkrieg-ursachen/
git add escape-games/gpg-erster-weltkrieg-ursachen/data.json
git add escape-games/gpg-erster-weltkrieg-ursachen/index.html
git add escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html
git commit -m "Mappe 1 v2: 9 Materialien, Self-Hosting Bilder, Artefakt-Pipeline"
git push origin main
```

---

## Erfolgskriterium

1. 5 Bilder unter `assets/img/gpg-erster-weltkrieg-ursachen/` (alle > 10 KB)
2. Alle `bildquelle`-Materialien in data.json referenzieren lokale Pfade
3. 9 Materialien korrekt gerendert (inkl. 3 neue Bildquellen)
4. 5 Aufgaben beantwortbar (inkl. Kartenvergleich-Aufgabe und Karikatur-Aufgabe)
5. Keine 429-Fehler beim Laden der Seite
6. Tafelbild nach Aufgaben-Loesung angezeigt
7. Freischalt-Code PULVER funktioniert
8. Keine JavaScript-Konsolenfehler
9. Jedes Material hat Subagenten-Q-Gate bestanden

## Nach Abschluss

Melde in Cowork:
```
Update: Phase 2.1 v2 Mappe 1 deployed.
- Bilder: [5/5 heruntergeladen, Dateigroessen]
- Materialien: [PASS/FAIL pro mat-ID]
- Aufgaben: [5 Aufgaben funktionsfaehig]
- Self-Hosting: [alle Bilder laden von lokalen Pfaden]
- URL: weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/
```
