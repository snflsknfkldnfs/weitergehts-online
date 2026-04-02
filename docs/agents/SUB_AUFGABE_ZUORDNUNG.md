# SUB_AUFGABE_ZUORDNUNG — Zuordnungsaufgaben-Konstrukteur

## Rolle + Didaktischer Zweck

Konstruiert Zuordnungsaufgaben: SuS ordnen Begriffe (linke Spalte) den korrekten Kategorien/Definitionen/Partnern zu (rechte Spalte, Dropdown-Auswahl). Primaerer Einsatz bei AFB I (Kategorisierung, Begriffspaare) und AFB II (Zusammenhaenge erkennen, Vergleiche strukturieren).

**Wann wird dieser Typ eingesetzt?**
- Pruefen, ob SuS Begriffe korrekt kategorisieren koennen (AFB I)
- Pruefen, ob SuS Zusammenhaenge zwischen Konzepten erkennen (AFB II: Vergleichsfrage)
- Mittlere Positionen in der Mappe (Position 2-3), die Faktenwissen in Beziehungen uebersetzen

**Wie ueberbrueckt der Typ Material → Kompetenzerwerb?**
Zuordnungsaufgaben operationalisieren das Kategorisieren und Verknuepfen. Sie pruefen, ob SuS nicht nur einzelne Fakten erinnern, sondern deren Relationen zueinander verstanden haben. Das erfordert Reorganisation des Gelernten — ein kognitiver Schritt ueber reines Erinnern hinaus.

**AFB-Differenzierung innerhalb Zuordnung:**

| Variante | AFB | Kognitive Leistung | Zuordnungsstruktur |
|----------|-----|--------------------|---------------------|
| Kategorisierung | I | Begriffe vorgegebenen Kategorien zuordnen | Links: Begriffe. Rechts: Oberkategorien (z.B. "Dreibund"/"Entente") |
| Begriffspaare | I | Definitionen/Erklaerungen den passenden Fachbegriffen zuordnen | Links: Fachbegriffe. Rechts: Definitionen |
| Zusammenhaenge | II | Ursache-Wirkung, Akteur-Handlung, Konzept-Beispiel | Links: Konzepte/Ursachen. Rechts: Wirkungen/Beispiele |

---

## Eingabe: Konstruktionskontext

Vom Orchestrator (AGENT_RAETSEL) pro Aufgabe:

| Feld | Beschreibung |
|------|-------------|
| Aufgaben-Position | N von 5 |
| AFB-Stufe | I oder II |
| Ziel-Material | mat-ID + Titel + Volltext (100-150 Worte) |
| Material-Zusammenfassungen | Alle anderen Materialien als 1-Satz-Zusammenfassung |
| Material-Position in Sequenz | N von M (didaktische Funktion) |
| TB-Knoten | Knoten-ID + Merksatz |
| Operationalisierungsziel | `[AFB-Operator] + [TB-Knoten-Merksatz als Frageform]` |
| Bereits getestete Inhalte | Liste vorheriger Aufgaben |
| Noch nicht getestete TB-Knoten | Verbleibende Knoten |

---

## Konstruktionsheuristiken

### 1. Zuordnungsstruktur waehlen

Die Struktur haengt vom AFB und Operationalisierungsziel ab:

| AFB | Operator | Geeignete Struktur | Beispiel |
|-----|----------|-------------------|----------|
| I | benenne, ordne zu | Kategorisierung | Laender → Buendnis (Dreibund/Entente) |
| I | beschreibe, definiere | Begriffspaare | Fachbegriff → Definition |
| II | vergleiche, gegenueberstelle | Zusammenhaenge | Grossmacht → Kerninteresse |
| II | erklaere, ordne ein | Zusammenhaenge | Ursache → Wirkung |

### 2. Pole definieren (linke + rechte Spalte)

**Kernprinzip: Disjunkte Kategorien.** Jede Zuordnung muss eindeutig sein — kein Element darf zu mehreren Zielen passen.

**Linke Spalte (Begriffe/Elemente):**
- 4-6 Elemente (weniger als 4 = trivial, mehr als 6 = ueberfordernd in Dropdown-UI)
- Aus dem Ziel-Material ableitbar
- Trennschaerfe: Jedes Element muss klar von den anderen unterscheidbar sein

**Rechte Spalte (Zuordnungsziele):**
- Exakt so viele Ziele wie Elemente (1:1-Zuordnung) ODER weniger Ziele als Elemente (n:1, z.B. 6 Laender → 2 Buendnisse)
- Keine unbenutzten Ziele (kein "Uebrigbleiben" als impliziter Hinweis)
- Bei n:1: Gruppengroesse nicht gleichmaessig verteilen (z.B. 3:3 vermeiden → lieber 4:2, um Raten zu erschweren)

### 3. Trennschaerfe sicherstellen

**Methode:** Pro Zuordnungspaar pruefen: "Koennte ein Schueler, der das Material gelesen hat, dieses Element BEGRUENDET auch einem anderen Ziel zuordnen?"

- Wenn ja → Zuordnung ist nicht disjunkt → umstrukturieren
- Wenn nein → Zuordnung ist valide

**Haeufige Trennschaerfe-Probleme:**

| Problem | Beispiel | Korrektur |
|---------|----------|-----------|
| Kategorien ueberlappen | "Wirtschaft" und "Politik" (Merkantilismus ist beides) | Schaerfere Kategorien waehlen ("Innenpolitik"/"Aussenpolitik") |
| Zuordnung kontextabhaengig | "Frankreich" kann Dreibund ODER Entente sein (historisch gewechselt) | Zeitlichen Kontext im Fragestamm praezisieren ("ab 1907") |
| Zu viele Elemente pro Kategorie | 5 von 6 Elementen fallen in eine Kategorie | Elemente gleichmaessiger verteilen oder Kategorien aendern |

### 4. Fragestamm formulieren

- Muss die Zuordnungslogik klar benennen: WAS soll WOHIN zugeordnet werden?
- Operator verwenden: "Ordne zu", "Verbinde", "Weise ... zu"
- Beispiel: "Ordne jede europaeische Grossmacht dem Buendnis zu, dem sie ab 1907 angehoerte."

### 5. Tipps formulieren (Zuordnung-spezifisch)

| Stufe | Inhalt | Zuordnung-spezifische Strategie |
|-------|--------|--------------------------------|
| 1 (Hinweis) | Richtung | Verweis auf Materialabschnitt, der die Zuordnungslogik enthaelt |
| 2 (Teilantwort) | Einschraenkung | 1-2 korrekte Zuordnungen verraten: "[X] gehoert zu [Y]." |
| 3 (Loesung) | Aufloesung | Alle Zuordnungen + erklaerende Logik |

### 6. Anti-Patterns

| Anti-Pattern | Problem | Korrektur |
|-------------|---------|-----------|
| Nicht-disjunkte Kategorien | Mehrere korrekte Zuordnungen moeglich | Kategorien schaerfen oder Kontext praezisieren |
| Trivia-Zuordnung | Zuordnung ist ohne Materialkenntnis durch Allgemeinwissen loesbar | Material-spezifische Begriffe verwenden |
| Identische Spaltenlaengen | Bei n:1 verraten gleiche Gruppengroessen die Verteilung | Ungleiche Verteilung waehlen |
| Zu wenige Elemente (< 4) | Zuordnung ist trivial, Rate-Chance zu hoch | Mindestens 4 Zuordnungspaare |
| Begriffe nicht im Material | Verletzt A3 | Jedes Element muss im Ziel-Material vorkommen |

---

## Qualitaetskriterien (inline, typ-spezifisch)

Referenz: `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md`

| Kriterium | Pruefung durch SUB_ZUORDNUNG | Methode |
|-----------|------------------------------|---------|
| A1 AFB-Kongruenz | Stimmt AFB mit Zuordnungsstruktur ueberein? | Kategorisierung = AFB I, Zusammenhaenge = AFB II |
| A2 Fragestaemme-Klarheit | Zuordnungslogik klar benannt? | Fragestamm beschreibt WAS → WOHIN |
| A3 Material-Kongruenz | Alle Elemente und Ziele im Material? | Jedes Zuordnungspaar gegen Material pruefen |
| **A4-ZU Trennschaerfe** | **Typ-spezifisch.** Sind Kategorien disjunkt? | Pro Paar: "Koennte begruendet auch anders zugeordnet werden?" |
| A6 Tipp-Progression | Stufen eingehalten? | Stufe 2 verrät max. 2 Paare |
| A7 Operator-Praezision | "Ordne zu", "Verbinde", "Weise zu" | Operationalisiertes Verb |
| **MQ3 Material-Referenz-Verbot in frage (Q-M2-04)** | **Fragestamm enthaelt KEINE `[[mat-id\|...]]`-Links und KEINE (M[position])-Verweise.** Fragestellung ist rein inhaltlich formuliert. Material-Referenzen gehoeren AUSSCHLIESSLICH in Tipp Stufe 1. | Pruefung: `frage` enthaelt keinen `[[`-String und kein `(M` |
| MQ3b Display-Referenzen in Tipps | Tipp 1 MUSS `[[mat-id\|Anzeigetext]]`-Inline-Link + (M[position]) enthalten (Material-Zuweisung). Tipp 2-3 duerfen Links enthalten. | Muster: `[[mat-1-2\|Europakarte von 1914]] (M7)` |

---

## Rendering-Kontrakt

### data.json Schema (aufgabe-Objekt)

```json
{
  "id": "aufgabe-1-2",
  "typ": "zuordnung",
  "frage": "Ordne jede europaeische Grossmacht dem Buendnis zu, dem sie ab 1907 angehoerte.",
  "material_referenz": ["mat-1-2"],
  "elemente": [
    { "begriff": "Deutsches Reich", "zuordnung": "Dreibund" },
    { "begriff": "Oesterreich-Ungarn", "zuordnung": "Dreibund" },
    { "begriff": "Italien", "zuordnung": "Dreibund" },
    { "begriff": "Frankreich", "zuordnung": "Entente" },
    { "begriff": "Russland", "zuordnung": "Entente" },
    { "begriff": "Grossbritannien", "zuordnung": "Entente" }
  ],
  "loesung": {
    "Deutsches Reich": "Dreibund",
    "Oesterreich-Ungarn": "Dreibund",
    "Italien": "Dreibund",
    "Frankreich": "Entente",
    "Russland": "Entente",
    "Grossbritannien": "Entente"
  },
  "tipps": [
    { "stufe": 1, "text": "Schau dir die Karte (M2) genau an — welche Laender liegen geografisch beieinander?" },
    { "stufe": 2, "text": "Frankreich und Russland gehoeren beide zur Entente." },
    { "stufe": 3, "text": "Dreibund: Deutsches Reich, Oesterreich-Ungarn, Italien (Mitteleuropa). Entente: Frankreich, Russland, Grossbritannien (umschliessen den Dreibund). Das erklaert das Gefuehl der 'Einkreisung' im Deutschen Reich." }
  ],
  "punkte": 10
}
```

**Feld-Constraints:**
- `typ`: Immer `"zuordnung"`
- `frage`: String, UTF-8, Zuordnungslogik klar benannt
- `elemente`: Array von Objekten mit `begriff` (String) und `zuordnung` (String). Reihenfolge = Anzeigereihenfolge der linken Spalte
- `loesung`: Object `{ "Begriff": "Zuordnung", ... }`. Muss exakt `elemente` widerspiegeln
- `material_referenz`: Array mit mindestens 1 mat-ID
- `tipps`: Array mit exakt 3 Objekten
- `punkte`: Integer, Standardwert 10

### BEM-Klassen (HTML-Struktur)

```html
<section class="aufgabe aufgabe--zuordnung">
  <h3 class="aufgabe__titel">[frage]</h3>
  <div class="aufgabe__zuordnung">
    <div class="zuordnung__zeile" data-begriff="[begriff]">
      <span class="zuordnung__begriff">[begriff]</span>
      <select class="zuordnung__dropdown">
        <option value="">-- Waehle --</option>
        <option value="[zuordnung1]">[zuordnung1]</option>
        <option value="[zuordnung2]">[zuordnung2]</option>
      </select>
    </div>
    <!-- ... pro Element ... -->
  </div>
</section>
```

### JS-Verhalten (Validierung)

- Vergleich: Pro Zeile `selectedValue === elemente[i].zuordnung`
- Alle Zeilen muessen korrekt sein fuer PASS
- Bei Fehler: Falsche Zeilen markieren (nicht die korrekte Zuordnung zeigen)
- Dropdown-Optionen: Alle unique Zuordnungswerte aus `elemente` (dedupliziert bei n:1)
- State-Persistenz: `{ mappings: { "Begriff1": "gewaehlte Zuordnung", ... } }`

---

## Beispiel

**Konstruktionskontext (Input):**

| Feld | Wert |
|------|------|
| Aufgaben-Position | 2 von 5 |
| AFB-Stufe | I |
| Ziel-Material | mat-1-2 (Karte: Buendnissysteme geografisch) — "Die Karte zeigt Europa um 1907. Zwei Buendnisbloecke stehen sich gegenueber: Der Dreibund (Deutsches Reich, Oesterreich-Ungarn, Italien) in Mitteleuropa und die Triple Entente (Frankreich, Russland, Grossbritannien) an den Raendern. Das Deutsche Reich fuehlte sich 'eingekreist' — ein Gefuehl, das die Aufruestung beschleunigte." |
| TB-Knoten | k1-2 (Buendnissysteme) — "Europa war in zwei Buendnissysteme geteilt: Dreibund und Entente" |
| Operationalisierungsziel | Ordne die Grossmaechte dem jeweiligen Buendnis zu |

**Output:** (siehe Rendering-Kontrakt-Beispiel oben)

**Q-Gate Log:**
```
A1 AFB-Kongruenz: PASS — Zuordnung/AFB I: Kategorisierung (Laender → Buendnisse), reine Wiedergabe aus Material
A2 Fragestaemme-Klarheit: PASS — Eine Anforderung (zuordnen), Zuordnungslogik klar (Grossmacht → Buendnis, Zeitpunkt praezisiert)
A3 Material-Kongruenz: PASS — Alle 6 Laender und beide Buendnisse im Material namentlich genannt
A4-ZU Trennschaerfe: PASS — Jedes Land ist im Material eindeutig einem Buendnis zugeordnet. Keine Doppelzugehoerigkeit im angegebenen Zeitraum
A6 Tipp-Progression: PASS — Stufe 1: Geografischer Hinweis, Stufe 2: 2 korrekte Paare, Stufe 3: Vollstaendige Loesung + Einkreisungs-Erklaerung
A7 Operator-Praezision: PASS — "Ordne ... zu" = operationalisiert
```

---

## Ausgabe

1. **aufgabe JSON-Objekt** gemaess Rendering-Kontrakt
2. **Q-Gate Log** pro geprueftem A-Kriterium
3. Bei FAIL: Konkreter Mangel + Korrekturvorschlag
