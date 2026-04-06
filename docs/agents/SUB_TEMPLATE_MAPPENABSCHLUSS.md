# SUB_TEMPLATE_MAPPENABSCHLUSS — Mappenabschluss-Zone (STR-13)

**Status:** v1.0 (Phase IV Wave 3, STR-13)
**Zweck:** Standardisiertes Template fuer die Mappenabschluss-Zone, die unterhalb des Hefteintrags gerendert wird.
**Architektur-Prinzip:** Hefteintrag = Wissenssicherung. Reflexion = eigene Zone.

---

## 1. Struktur

```json
{
  "reflexion_fragen": [
    "...",
    "..."
  ],
  "ueberleitungssatz": "...",
  "_variante": "A"
}
```

## 2. Variante A (nicht-letzte Mappen)

**reflexion_fragen (1-2 Stueck):**
- Transfer-Frage ODER Bewertungs-Frage ODER Metakognitions-Frage
- Bezug zur Stundenfrage der aktuellen Mappe
- NICHT die Stundenfrage selbst wiederholen
- NICHT Fakten abfragen (das ist Hefteintrag-Aufgabe)

**ueberleitungssatz (1 Satz):**
- Baut Bruecke zur naechsten Mappe
- Erzeugt Neugier / offene Frage
- Max 20 Woerter

### Reflexionsfragen-Bank (Musterformulierungen)

| Typ | Muster | Beispiel |
|---|---|---|
| Transfer | "Was wuerde passieren, wenn [Variable] anders gewesen waere?" | "Was waere passiert, wenn Oesterreich-Ungarn kein Ultimatum gestellt haette?" |
| Bewertung | "Welche Entscheidung findest du am folgenreichsten — und warum?" | "Welche Entscheidung der Grossmaechte findest du am folgenreichsten?" |
| Metakognition | "Was hat dich am meisten ueberrascht — und warum?" | "Welcher Zusammenhang hat dich am meisten ueberrascht?" |
| Perspektivwechsel | "Wie haettest du an Stelle von [Akteur] entschieden?" | "Wie haettest du als Diplomat 1914 entschieden?" |
| Gegenwartsbezug | "Gibt es heute aehnliche Situationen? Was ist anders?" | "Gibt es heute aehnliche Buendnissysteme?" |

## 3. Variante B (letzte Mappe)

**reflexion_fragen (1-2 Stueck):**
- Uebergreifend ueber alle Mappen der Sequenz
- Abschliessende Bewertung / Synthese
- Bezug zum Rahmenthema des gesamten Games

**ueberleitungssatz:** Leer oder nicht vorhanden.

## 4. Befuellung

Die Mappenabschluss-Zone wird im **Assembly-Schritt** erzeugt:
1. Lese Stundenfrage aus hefteintrag.json
2. Lese Mappenposition (letzte Mappe? → Variante B)
3. Waehle 1-2 Reflexionsfragen aus Bank oder generiere situativ
4. Schreibe Ueberleitungssatz (wenn Variante A)

## 5. Q-Gate

| # | Pruefpunkt | Kriterium |
|---|---|---|
| MZ1 | Variante korrekt | A bei nicht-letzter Mappe, B bei letzter |
| MZ2 | Reflexionsfragen disjunkt zu Hefteintrag | Keine Frage darf identisch mit scpl.loesung[] sein |
| MZ3 | Keine Faktenabfrage | Reflexion = Weiterdenken, nicht Wissenstest |
| MZ4 | Ueberleitungssatz (nur Var. A) | Vorhanden, max 20 Woerter, erzeugt Neugier |
| MZ5 | Sprachregister R7 | Verstaendlich fuer 12-13-Jaehrige |

## 6. Abgrenzung

| Element | Gehoert zu |
|---|---|
| Stundenfrage + SCPL + Schaubild + Merksaetze | hefteintrag.json |
| Reflexionsimpuls (kurzer Denkimpuls) | sicherung.json |
| Reflexionsfragen (Transfer/Bewertung) | mappenabschluss_zone.json (dieses Template) |
| Ueberleitung zur naechsten Mappe | mappenabschluss_zone.json (dieses Template) |
| Zusammenfassung | sicherung.json (Placeholder bis Phase 2.1c) |
