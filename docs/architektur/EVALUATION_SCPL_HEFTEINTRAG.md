# Evaluation: SCPL-Framework fuer AGENT_TAFELBILD

**Datum:** 2026-03-28
**Status:** Entwurf — wartet auf User-Entscheidung
**Bezug:** DESIGNENTSCHEIDUNG_v3-1_HEFTEINTRAG.md, GUETEKRITERIEN_TAFELBILD.md

---

## 1. Was ist SCPL?

Situation – Complication – Problem – Loesung. Urspruenglich ein Framework fuer Problemdarstellung in der Beratungskommunikation (McKinsey Pyramid Principle, Barbara Minto). Kernidee: Jede Argumentation laesst sich als Kette strukturieren, in der ein Kontext (S) durch eine Zuspitzung (C) zu einem Problem (P) fuehrt, das eine Loesung (L) erfordert.

---

## 2. Passung zum Hefteintrag

### 2.1 SCPL-Zonen → Hefteintrag-Layout

| SCPL-Zone | Hefteintrag-Element | Didaktische Funktion |
|-----------|-------------------|---------------------|
| **S** (Situation) | Ausgangslage oben | Vorwissen aktivieren, historischen Kontext setzen, Fachbegriffe einfuehren |
| **C** (Complication) | Argumentationsfluss Mitte | Spannung aufbauen, Zuspitzung zeigen, Struktur sichtbar machen |
| **P** (Problem) | Letzter Argumentationsschritt vor Merkbox | Kernproblem benennen, zentralen Fachbegriff verankern |
| **L** (Loesung) | Merkbox | Qualifizierte Antwort auf die Stundenfrage, Wissen verdichten |

### 2.2 Stundenfrage als Klammer

Die problemorientierte Stundenfrage (Mod 1) bildet die natuerliche Bruecke: Sie stellt das Problem implizit. Der Hefteintrag baut dann die Argumentation auf (S→C→P), bis die Merkbox als Loesung die Frage beantwortet.

Damit entsteht ein geschlossener Bogen:
```
FRAGE ──→ S → C → P ──→ ANTWORT (Merkbox) ──→ TRANSFER (naechste Frage)
```

### 2.3 Vergleich mit empirischen Tafelbildern (GUETEKRITERIEN_TAFELBILD.md)

Die 8 Excalidraw-TBs der 1.WK-Sequenz zeigen bereits implizite SCPL-Muster:

| TB | Ordnungsmuster | SCPL-Mapping |
|----|---------------|-------------|
| TB-1 Buendnisse | Kategorial (2 Lager) | S=Europa 1870, C=Buendnisbildung, P=2 Bloecke, L=Pulverfass |
| TB-2 Attentat | Chronologisch | S=Sarajevo, C=Attentat, P=Ultimatum, L=Kettenreaktion |
| TB-3 Kriegsverlauf | Chronologisch | S=Westfront, C=Stellungskrieg, P=Materialschlacht, L=Erschoepfung |
| TB-4 Waffen | Kategorial | S=Vorkriegswaffen, C=neue Technologie, P=Massenvernichtung, L=Merksatz |

Empirisches Ergebnis: 7 von 8 TBs lassen sich problemlos in SCPL mappen. Das Framework bildet keine kuenstliche Zwangsstruktur, sondern beschreibt ein Muster, das guter Geschichtsunterricht ohnehin zeigt.

---

## 3. Tauglichkeit als generisches Muster

### 3.1 Staerken

**Universalitaet:** SCPL funktioniert fuer alle drei GPG-Ordnungsmuster:
- **Kausal:** S=Ausgangslage, C=Kausalkette, P=Konsequenz, L=Merksatz
- **Kategorial:** S=Ueberblick, C=Kategorien im Detail, P=zentrale Einsicht, L=Merksatz
- **Chronologisch:** S=Startzeitpunkt, C=Ereigniskette, P=Wendepunkt, L=Merksatz

**Fachuebergreifend:** Auch fuer WiB und Mathematik anwendbar:
- WiB: S=Alltagssituation, C=Problem im Berufsleben, P=konkretes Dilemma, L=Handlungsstrategie
- Mathe: S=bekanntes Verfahren, C=neue Aufgabe passt nicht, P=warum nicht?, L=neues Verfahren

**Operationalisierbar:** Jede Zone hat klar definierte Outputs, die ein Agent erzeugen kann. Kein Interpretationsspielraum bei der Zuordnung.

**Skalierbar:** Einfache Themen haben eine flache S→C→P→L-Kette. Komplexe Themen koennen mehrere C-Schritte oder parallele P-Straenge haben, ohne das Framework zu sprengen.

### 3.2 Grenzen

**Nicht alle Themen sind problemorientiert:** Rein deskriptive Inhalte (z.B. "Die Bundeslaender Deutschlands") haben keine natuerliche Complication. Workaround: S=Ueberblick, C=Ordnungskriterium, P="Wie unterscheiden sich...", L=Kategorisierung. Funktioniert, aber etwas forciert.

**Kein Ersatz fuer Ordnungsmuster:** SCPL bestimmt die vertikale Reihenfolge (was kommt wann). Das Ordnungsmuster bestimmt die visuelle Darstellungsform innerhalb jeder Zone (Tabelle, Pfeile, Zeitleiste). Beide Dimensionen muessen zusammenspielen.

**Gefahr der Schematisierung:** Wenn jeder Hefteintrag mechanisch S-C-P-L abarbeitet, entsteht Monotonie. Gegenmaßnahme: Die Complication-Zone ist bewusst flexibel gestaltet (Gegenueberstellung, Kausalkette, Zeitleiste, Stichpunkte) — nur die Grundstruktur ist fix, nicht die Auspraegung.

### 3.3 Bewertung

| Kriterium | Bewertung |
|-----------|----------|
| Funktioniert fuer GPG? | Ja, sehr gut (empirisch belegt durch TB-Analyse) |
| Funktioniert fuer andere Faecher? | Ja, mit Anpassung der Zonen-Inhalte |
| Fuer Agent operationalisierbar? | Ja — jede Zone wird zu einem generierbaren Output-Block |
| Verhindert beliebige Qualitaet? | Ja — erzwingt logische Kohaerenz (jede Zone baut auf der vorherigen auf) |
| Flexibel genug? | Ja — C-Zone erlaubt alle Ordnungsmuster, P kann unterschiedlich komplex sein |
| Zu rigide? | Nein, wenn C-Zone als "variabel" markiert wird |

---

## 4. Verankerung in AGENT_TAFELBILD

### 4.1 Neues Output-Schema

```json
{
  "stundenfrage": "Warum wurde Europa vor 1914 zum Pulverfass?",
  "ordnungsmuster": "kausal",
  "scpl": {
    "situation": {
      "kontextsatz": "Um 1900 wollen alle europaeischen Grossmaechte Kolonien, Rohstoffe und Einfluss.",
      "fachbegriffe": ["Imperialismus", "Nationalismus"]
    },
    "complication": [
      {
        "schritt": "Die Staaten ruesten massiv auf — besonders zur See.",
        "fachbegriff": "Wettruestung",
        "darstellung": null
      },
      {
        "schritt": null,
        "fachbegriff": "Buendnissystem",
        "darstellung": {
          "typ": "gegenueberstellung",
          "links": { "titel": "Dreibund (1882)", "punkte": ["Deutschland", "Oesterreich-Ungarn", "Italien"] },
          "rechts": { "titel": "Triple Entente", "punkte": ["Frankreich", "Grossbritannien", "Russland"] }
        }
      }
    ],
    "problem": {
      "satz": "Ein lokaler Konflikt zieht automatisch alle Grossmaechte in den Krieg.",
      "fachbegriff": "Kettenreaktion"
    },
    "loesung": [
      "Europa war vor 1914 ein Pulverfass: Imperialismus, Nationalismus und Wettruestung spalteten den Kontinent in zwei feindliche Buendnisbloecke. Die Buendnispflichten machten aus jedem lokalen Konflikt eine europaweite Kettenreaktion — ein Funke genuegt."
    ]
  },
  "transfer": {
    "frage": "Doch wo ist der Funke? Was loest die Kettenreaktion tatsaechlich aus?",
    "vorschau": "Das Attentat von Sarajevo (28. Juni 1914)"
  }
}
```

### 4.2 Aenderungen an AGENT_TAFELBILD.md

| Bereich | Aenderung |
|---------|----------|
| Output-Schema | Neues `scpl`-Objekt statt flacher `knoten[]`+`verbindungen[]` |
| Stundenfrage | Pflichtfeld, ersetzt `titel` als Hefteintrag-Ueberschrift |
| Q-Gate | Neues Kriterium G14: "SCPL-Kohaerenz — baut jede Zone logisch auf der vorherigen auf?" |
| Ordnungsmuster | Bleibt als eigenstaendiges Feld, bestimmt Darstellungstyp in C-Zone |
| Transfer | Neues Pflichtfeld mit Frage + Vorschau auf naechste UE |
| Kompatibilitaet | `knoten[]`+`verbindungen[]` bleiben als Legacy-Felder erhalten, Engine rendert bevorzugt aus `scpl` |

### 4.3 Complication-Darstellungstypen

Die C-Zone ist der variable Kern. AGENT_TAFELBILD waehlt pro Schritt:

| darstellung.typ | Wann | Visuelles Mittel |
|----------------|------|-----------------|
| `null` (Default) | Einfacher Sachverhalt | Text + horizontaler Fachbegriff-Verweis |
| `gegenueberstellung` | Zwei Seiten, Gegensaetze | Zweispaltige Tabelle mit vs. |
| `zeitleiste` | Chronologischer Ablauf | Vertikale Datumsleiste |
| `tabelle` | Kategoriale Vergleiche | n×m Tabelle |
| `kausalkette` | Mehrstufige Ursache-Wirkung | Verschachtelte Pfeile |

---

## 5. Abwaertskompatibilitaet

Das alte Schema (`knoten[]`, `verbindungen[]`, `kernerkenntnisse[]`) bleibt im JSON erhalten. Die Engine prueft:

```
if (sicherung.tafelbild.scpl) → _renderHefteintragSCPL()
else if (sicherung.tafelbild.knoten) → _renderHefteintragLegacy()
else → _renderHefteintragFallback()
```

Bestehende Mappe 1 wird bei der v3.1-Engine-Integration auf das neue Schema migriert.

---

## 6. Empfehlung

**SCPL als Leitstruktur fuer AGENT_TAFELBILD uebernehmen.** Gruende:

1. Empirisch bestaetigt durch 7/8 bestehende TBs
2. Deckt alle drei Ordnungsmuster ab
3. Operationalisierbar als JSON-Schema mit klaren Zonen
4. Erzwingt logische Kohaerenz ohne visuelle Monotonie (C-Zone ist variabel)
5. Stundenfrage + Merkbox bilden natuerlichen Spannungsbogen
6. Transfer-Feld schliesst den didaktischen Bogen und verknuepft Mappen

**Umsetzungsreihenfolge:**
1. Prototyp rev3 validieren (User-Review)
2. JSON-Schema finalisieren (scpl-Objekt)
3. AGENT_TAFELBILD.md aktualisieren
4. Engine-Renderer implementieren (Uebergabe-Prompt)
5. Mappe 1 migrieren und testen

---

## 7. Stilregel: Fachbegriff-Einfuehrung

AGENT_TAFELBILD muss Fachbegriffe per Doppelpunkt oder Gedankenstrich in den Satzfluss integrieren. Klammern sind verboten.

| Falsch | Richtig |
|--------|---------|
| der Wettlauf um Kolonien (Imperialismus) | der Wettlauf um Kolonien — Imperialismus |
| uebersteigerte nationale Ueberzeugungen (Nationalismus) | uebersteigerte nationale Ueberzeugungen: Nationalismus |
| ein lokaler Konflikt zieht alle in den Krieg (Kettenreaktion) | ...alle in den Krieg: Kettenreaktion. |

**Begruendung:** Klammern signalisieren "optional/ergaenzend". Fachbegriffe sind das Gegenteil — sie verdichten den Sachverhalt auf einen Begriff. Doppelpunkte und Gedankenstriche setzen den Begriff als Pointe an das Satzende und geben ihm Gewicht.

**Regeln fuer AGENT_TAFELBILD:**
1. Fachbegriff steht am Satzende, nach Doppelpunkt oder Gedankenstrich
2. Maximal ein Fachbegriff pro Satz
3. Kein Fachbegriff in Klammern — niemals
4. Wenn zwei Begriffe eingefuehrt werden: zwei Saetze oder Aufzaehlung mit Gedankenstrich

---

## 8. Transferfrage

Die Transferfrage/Ueberleitung zur naechsten UE gehoert **nicht** in den Hefteintrag. Sie wird ausserhalb der Hefteintrag-Box gerendert (im Engine-Output unterhalb des Kastens, in der Escape-Game-Sicherungsansicht).

Begruendung: Im gedruckten Sicherungsheft ergibt eine Transferfrage keinen Sinn — sie ist ein muendlicher Unterrichtsimpuls, kein verschriftlichter Inhalt.
