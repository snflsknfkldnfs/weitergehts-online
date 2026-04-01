# Übergabe-Prompt: Fix data.json-Regression (v3-4 Merge-Fehler)

**Datum:** 2026-03-28
**Von:** Cowork (Fehleranalyse)
**An:** Claude Code (Fix)
**Priorität:** BLOCKER — Website zeigt falsche Inhalte

---

## Problem

Commit `a3ea44b` ("v3-4 Engine-Erweiterung") hat die `data.json` von Game 1 durch eine ältere Version überschrieben. Ursache: Beim Stash-Pop + Merge wurde der Konflikt in `data.json` mit `--theirs` gelöst — aber "theirs" war die veraltete Cowork-Kopie statt der aktuellen Claude-Code-Version.

### Ist-Zustand (HEAD, falsch)
- Titel: "Sonderausgabe 1: Pulverfass Europa"
- Freischaltcode: `BUND`
- 7 Materialien (weniger, andere Inhalte)
- 0 lokale Bilder (Wikimedia-URLs)
- 4 Mappen (3 davon Stubs)
- Tagebuch: "junger Soldat"
- v3-Felder vorhanden (merksatz, kernerkenntnisse etc.)

### Soll-Zustand (Commit `5153466`, korrekt)
- Titel: "Pulverfass Europa"
- Freischaltcode: `PULVER`
- 9 Materialien (inkl. Bismarck-Karte, Rhodes-Karikatur, Schlachtgeschwader)
- 5 lokal gehostete Bilder unter `assets/img/gpg-erster-weltkrieg-ursachen/`
- 1 Mappe (nur Mappe 1 aktiv)
- Tagebuch: "Diplomat"
- v3-Felder FEHLEN (müssen ergänzt werden)

---

## Aufgabe

### Schritt 1: Basis wiederherstellen

```bash
git show 5153466:escape-games/gpg-erster-weltkrieg-ursachen/data.json > escape-games/gpg-erster-weltkrieg-ursachen/data.json
```

### Schritt 2: v3-Felder in die wiederhergestellte data.json einarbeiten

Die wiederhergestellte Version hat 7 Tafelbild-Knoten und 6 Verbindungen, aber keine v3-Felder. Folgende Felder müssen ergänzt werden:

#### 2a: `merksatz` pro Knoten

Jeder der 7 Knoten braucht ein `merksatz`-Feld. Die Merksätze müssen zum Knoten-Text und zum Inhalt der 9 Materialien passen (nicht zur alten 7-Materialien-Version). Ableitung:

| Knoten-ID | text | Merksatz (inhaltlich passend zur 9-Mat-Version) |
|-----------|------|------------------------------------------------|
| k1-1 | Pulverfass Europa | Europa war vor 1914 durch Buendnisse, Nationalismus und Imperialismus ein Pulverfass — ein Funke genuegt. |
| k1-2 | Imperialismus | Der Wettlauf um Kolonien und den "Platz an der Sonne" verschaerfte die Rivalitaet zwischen den Grossmaechten. |
| k1-3 | Nationalismus | Uebersteigerte nationale Ueberzeugungen machten Kompromisse unmoeglich und schueriten Feindbilder. |
| k1-4 | Dreibund (DE, OeU, IT) | Deutschland, Oesterreich-Ungarn und Italien verbanden sich 1882 im Dreibund zu gegenseitigem Beistand. |
| k1-5 | Triple Entente (FR, GB, RU) | Frankreich, Grossbritannien und Russland naeherten sich schrittweise (1894-1907) in der Triple Entente an. |
| k1-6 | Wettruestung | Die Grossmaechte ruesteten um die Wette auf — besonders zur See zwischen Deutschland und Grossbritannien. |
| k1-7 | Kettenreaktion | Durch die Buendnispflichten zog ein lokaler Konflikt automatisch alle Grossmaechte in den Krieg. |

#### 2b: `kernerkenntnisse[]` auf Sicherungs-Ebene

```json
"kernerkenntnisse": [
  "Europa war in zwei feindliche Buendnisbloecke gespalten: Dreibund und Triple Entente.",
  "Imperialismus, Nationalismus und Wettruestung trieben die Spannungen an.",
  "Das Buendnissystem machte aus jedem lokalen Konflikt eine europaweite Kettenreaktion."
]
```

#### 2c: `hefteintrag_verweis` auf Sicherungs-Ebene

```json
"hefteintrag_verweis": "Uebertrage das Tafelbild und die Merksaetze in dein Heft. Achte auf die Verbindungspfeile zwischen den Begriffen."
```

#### 2d: `reflexionsimpuls` auf Sicherungs-Ebene

```json
"reflexionsimpuls": "Warum konnte ein einzelner Schuss einen ganzen Kontinent in den Krieg stuerzen?"
```

### Schritt 3: Sicherung-Objekt Ziel-Struktur

Die fertige `sicherung` in Mappe 1 muss so aussehen:

```json
"sicherung": {
  "tafelbild": {
    "knoten": [
      {"id": "k1-1", "text": "Pulverfass Europa", "typ": "kernbegriff", "merksatz": "..."},
      {"id": "k1-2", "text": "Imperialismus", "typ": "ursache", "merksatz": "..."},
      {"id": "k1-3", "text": "Nationalismus", "typ": "ursache", "merksatz": "..."},
      {"id": "k1-4", "text": "Dreibund (DE, OeU, IT)", "typ": "kategorie", "merksatz": "..."},
      {"id": "k1-5", "text": "Triple Entente (FR, GB, RU)", "typ": "kategorie", "merksatz": "..."},
      {"id": "k1-6", "text": "Wettruestung", "typ": "ursache", "merksatz": "..."},
      {"id": "k1-7", "text": "Kettenreaktion", "typ": "wirkung", "merksatz": "..."}
    ],
    "verbindungen": [ ... 6 bestehende Verbindungen unverändert ... ],
    "voraussetzungen": []
  },
  "kernerkenntnisse": [ ... 3 Einträge ... ],
  "hefteintrag_verweis": "...",
  "reflexionsimpuls": "...",
  "zusammenfassung": "... bestehend aus 5153466 ...",
  "ueberleitung": "... bestehend aus 5153466 ..."
}
```

### Schritt 4: Verifizierung

1. `python3 -c "import json; json.load(open('escape-games/gpg-erster-weltkrieg-ursachen/data.json'))"` — kein Fehler
2. Prüfe: `freischalt_code` == `"PULVER"`
3. Prüfe: 9 Materialien, 5 Aufgaben
4. Prüfe: Alle 5 Bild-Pfade zeigen auf `../../assets/img/gpg-erster-weltkrieg-ursachen/`
5. Prüfe: Alle 7 Knoten haben `merksatz`-Feld
6. Prüfe: `kernerkenntnisse`, `hefteintrag_verweis`, `reflexionsimpuls` vorhanden
7. `assets/img/gpg-erster-weltkrieg-ursachen/` enthält 5 Bilddateien (img-1-1.png bis img-1-5.jpg)

### Schritt 5: Commit + Push

```
fix: data.json Mappe 1 aus 5153466 wiederhergestellt + v3-Felder ergaenzt

Revert des versehentlichen Ueberschreibens durch v3-4 Merge-Konflikt.
Basis: Commit 5153466 (9 Materialien, lokale Bilder, Freischaltcode PULVER).
Neu: v3-Sicherungsfelder (merksatz pro Knoten, kernerkenntnisse,
hefteintrag_verweis, reflexionsimpuls) hinzugefuegt.
```

---

## Dateien

```
escape-games/gpg-erster-weltkrieg-ursachen/data.json  ← Einzige Änderung
```

## Erfolgskriterium

Nach Deploy auf GitHub Pages: `weitergehts.online/escape-games/gpg-erster-weltkrieg-ursachen/mappe-1.html` zeigt 9 Materialien mit geladenen Bildern, Freischaltcode "PULVER" funktioniert, Sicherung zeigt Tafelbild + Merksätze + Kernerkenntnisse + Hefteintrag.

## Nach Abschluss

Melde in Cowork: `Update: data.json-Fix erledigt. Commit: [hash]. Website verifiziert: [ja/nein]`
