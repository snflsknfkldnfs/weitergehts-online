# Uebergabe-Prompt: Phase 0.2 Nachbesserung — INHALTSBASIS erweitern

**Ausfuehrungsort:** Claude Code
**Datum:** 2026-03-24
**Vorgaenger:** Phase 0.2 (INHALTSBASIS erstellt), Phase 0.3 (SKRIPT erstellt, PASS), Workflow-Optimierung (Artefakt-Kette eingefuehrt)

---

## Kontext

Die INHALTSBASIS fuer Game 1 "Erster Weltkrieg — Ursachen und Ausbruch" (Game-ID: `gpg-erster-weltkrieg-ursachen`) wurde in Phase 0.2 erstellt und enthaelt 12 Wikipedia-Artikel mit Fakten, Akteuren, Fachbegriffen, Zahlen und Recherche-Hinweisen fuer 4 Mappen.

Nach dem ersten Phase-1-Durchlauf wurde der Workflow optimiert: Eine Artefakt-Kette INHALTSBASIS → SKRIPT → MATERIAL_GERUEST wurde eingefuehrt. Die INHALTSBASIS muss dafuer um drei neue Sektionen pro Mappe erweitert werden, die in der bestehenden Datei fehlen:

1. **Wikimedia-Artefakte (funktional)** — Bilder, Karten, Illustrationen mit Dateiname, Lizenz, Einbettungsvorschlag (ersetzt die bisherige Sektion "Verfuegbare Bilder")
2. **Zitate** — Historische Originalzitate aus Wikipedia-Artikeln mit Sprecher, Wortlaut, Kontext, Eignung
3. **Rollenprofile** — Historisch belegte Personengruppen fuer Tagebuch-Material (keine fiktiven Rollen)

---

## Aufgabe

Die Datei `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` ueberarbeiten. Die bestehenden Sektionen (Fakten, Akteure, Fachbegriffe, Zahlen, Recherche-Hinweise) bleiben unveraendert. Pro Mappe (1-4) werden drei Sektionen hinzugefuegt/ersetzt.

### Schritt-fuer-Schritt

**1. Wikimedia-Artefakte recherchieren und dokumentieren (alle 4 Mappen)**

Pro Mappe die bestehende Sektion "Verfuegbare Bilder (im Wikipedia-Artikel)" ersetzen durch:

```markdown
#### Wikimedia-Artefakte (funktional)

| ID | Typ | Beschreibung | Wikimedia-Dateiname | Lizenz | Einbettungsvorschlag |
|---|---|---|---|---|---|
| img-[N]-1 | karte/foto/illustration | [Was zeigt das Bild?] | File:[exakter Dateiname] | [CC-BY-SA/PD/...] | [Welcher Materialtyp? Welcher Skript-Absatz?] |
```

**Recherche-Vorgehen:**
- `wikimedia_search_images` mit gezielten Suchbegriffen pro Mappe
- Wikipedia-Artikel erneut lesen (`wikipedia: get_article`) und im Artikeltext referenzierte Bilder identifizieren
- Nur Bilder mit eindeutiger Lizenz (CC-BY-SA 3.0/4.0, Public Domain) dokumentieren
- Mindestens 2-3 Artefakte pro Mappe anstreben
- Einbettungsvorschlag: Welcher Materialtyp (karte, bildquelle, illustration) und welcher ungefaehre Skript-Absatz?

**Suchbegriffe pro Mappe:**
- Mappe 1: "European alliances 1914 map", "Triple Alliance Triple Entente", "arms race pre-war", "imperialism Europe map", "Kaiser Wilhelm II"
- Mappe 2: "Assassination Archduke Franz Ferdinand", "Gavrilo Princip", "July Crisis 1914", "Bosnian crisis 1908", "Balkan Wars map"
- Mappe 3: "Spirit of 1914", "Augusterlebnis", "war enthusiasm 1914", "mobilization 1914", "anti-war protest 1914"
- Mappe 4: "Schlieffen Plan map", "Western Front 1914", "First Battle of the Marne", "trench warfare", "two-front war map"

**2. Zitate extrahieren (alle 4 Mappen)**

Pro Mappe eine neue Sektion einfuegen (nach Wikimedia-Artefakte, vor Recherche-Hinweise):

```markdown
#### Zitate (aus Wikipedia extrahiert)

| ID | Sprecher | Wortlaut | Kontext | Wikipedia-Quelle (Artikel + Sektion) | Eignung |
|---|---|---|---|---|---|
| zit-[N]-1 | [Name, Rolle] | "[Originalwortlaut oder altersgerechte Paraphrase]" | [Historischer Kontext, 1 Satz] | [Artikel, Sektion] | [quellentext / einstieg / sicherung] |
```

**Recherche-Vorgehen:**
- Bereits gelesene Wikipedia-Artikel erneut durchsuchen nach direkten Zitaten (erkennbar an Anfuehrungszeichen oder `<blockquote>`)
- Relevante Sektionen gezielt mit `wikipedia: get_article` lesen
- Mindestens 1-2 Zitate pro Mappe anstreben
- Eignung einschaetzen: "quellentext" (als eigenstaendiges Material), "einstieg" (Mappe eroeffnen), "sicherung" (Erkenntnis zusammenfassen)

**Zitat-Kandidaten (Hinweise, nicht abschliessend):**
- Mappe 1: Buelow "Platz an der Sonne" (1897), Bethmann Hollweg ueber Einkreisung, Grey ueber "Lichter gehen aus"
- Mappe 2: Reaktionen auf das Attentat, Ultimatum-Passagen, Blankoscheck-Formulierung
- Mappe 3: Zeitgenoessische Stimmen zum Augusterlebnis, Kriegsgegner (Liebknecht, Luxemburg)
- Mappe 4: Moltke ueber den Schlieffen-Plan, Joffre ueber die Marne, Berichte von der Front

**3. Rollenprofile recherchieren (alle 4 Mappen)**

Pro Mappe eine neue Sektion einfuegen (nach Zitate, vor Recherche-Hinweise):

```markdown
#### Rollenprofile (fuer Tagebuch-Material)

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung |
|---|---|---|---|---|---|
| rolle-[N]-1 | [z.B. Bauersfrau, Diplomat, Soldat] | [Belegstelle in Wikipedia] | [Was erlebt diese Person im Kontext der Mappe?] | [Artikel, Sektion] | [Mappe N] |
```

**Recherche-Vorgehen:**
- Aus Wikipedia-Artikeln historisch belegte Personengruppen identifizieren, deren Perspektive fuer Tagebuch-Material taugt
- KEINE fiktiven Rollen (z.B. "Zeitungsreporter") — stattdessen: Soldat, Bauersfrau, Fabrikarbeiter, Diplomat, Schuelerin etc.
- Mindestens 1 Rollenprofil pro Mappe
- Typische Erfahrung: Was erlebt diese Person konkret im Kontext der Mappe? (1-2 Saetze)

**Rollenprofil-Kandidaten (Hinweise):**
- Mappe 1: Diplomat im Auswärtigen Amt (erlebt Buendnisverhandlungen), Matrose der Kaiserlichen Marine (erlebt Wettruestung)
- Mappe 2: Bewohner:in von Sarajevo (erlebt Attentat), Soldat bei Mobilmachung (erlebt Julikrise)
- Mappe 3: Jugendlicher Freiwilliger (erlebt Kriegsbegeisterung), Sozialistin (erlebt Gegenstimmen)
- Mappe 4: Infanterist (erlebt Schlieffen-Plan und Stellungskrieg), Krankenschwester (erlebt Verwundete)

### Output-Anforderungen

- Bestehende Datei ueberarbeiten, nicht neu erstellen
- Pro Mappe: "Verfuegbare Bilder" ersetzen durch "Wikimedia-Artefakte (funktional)", "Zitate" und "Rollenprofile" als neue Sektionen hinzufuegen
- Sektions-Reihenfolge pro Mappe: Fakten → Akteure → Fachbegriffe → Zahlen → **Wikimedia-Artefakte** → **Zitate** → **Rollenprofile** → Recherche-Hinweise
- IDs fortlaufend nummerieren: img-[Mappe]-[Nr], zit-[Mappe]-[Nr], rolle-[Mappe]-[Nr]
- Validierungsstatus auf "Nachbesserung (2026-03-24, Artefakt-Kette)" setzen

### MCP-Tools

- `wikimedia_search_images` — Bilder suchen (primaer fuer Wikimedia-Artefakte)
- `wikipedia: get_article` — Artikeltext lesen (fuer Zitate und Rollenprofile)
- `wikipedia: get_sections` — Artikelstruktur (gezielt Sektionen identifizieren)
- `wikipedia: get_summary` — Kurzfassungen fuer neue Vertiefungsartikel

### Qualitaets-Pruefung vor Abgabe

- [ ] Alle 4 Mappen haben Wikimedia-Artefakte (funktional) mit mindestens 2 Eintraegen?
- [ ] Alle Wikimedia-Dateinamen sind exakt (File:[Name] muss auf Wikimedia Commons existieren)?
- [ ] Alle Lizenzen sind dokumentiert?
- [ ] Alle 4 Mappen haben mindestens 1 Zitat mit Quellenangabe?
- [ ] Alle 4 Mappen haben mindestens 1 Rollenprofil mit Wikipedia-Beleg?
- [ ] Keine fiktiven Reporter/Redakteur-Rollen verwendet?
- [ ] Bestehende Sektionen (Fakten, Akteure, Fachbegriffe, Zahlen, Recherche-Hinweise) unveraendert?
- [ ] IDs konsistent: img-[N]-[Nr], zit-[N]-[Nr], rolle-[N]-[Nr]?

---

## Referenz-Dokumente

| Dokument | Zweck |
|---|---|
| `docs/agents/artefakte/INHALTSBASIS_gpg-erster-weltkrieg-ursachen.md` | Zu ueberarbeitende Datei |
| `docs/architektur/WORKFLOW_v2.md` (Abschnitt 4, Schritt 0.2) | Kanonisches Template fuer INHALTSBASIS |
| `docs/agents/artefakte/SKRIPT_gpg-erster-weltkrieg-ursachen.md` | Kontext: Welche Skript-Stellen brauchen Artefakte |
