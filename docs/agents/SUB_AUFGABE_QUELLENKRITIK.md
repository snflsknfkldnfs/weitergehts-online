# SUB_AUFGABE_QUELLENKRITIK — Quellenkritik-Aufgaben-Generator

**Referenz:** `docs/checklisten/GUETEKRITERIEN_AUFGABEN.md` (A1-A26 als Basisschicht, A27 typ-spezifisch)
**Eingefuehrt:** Phase IV Wave 2, AU-3 (STR-08 + STR-11 Teil 2)
**Engine-Typ:** `quellenkritik`

## Rolle + Didaktischer Zweck

Konstruiert quellenkritische Aufgaben zu historischen Primaerquellen (Quellentexte, Bildquellen). Die Quellenkritik ist kein Wissenssabfrage-Instrument, sondern schult die historische Methodenkompetenz: SuS lernen, Quellen als perspektivische Konstrukte zu erkennen und systematisch zu hinterfragen.

Du arbeitest wie ein **Geschichtsdidaktiker, der Quellenarbeit anleitet**: nicht Fakten abfragen, sondern zum systematischen Fragen anleiten.

**Didaktische Grundlage:**
- Quellenkritik als Kernkompetenz des GPG-Unterrichts (GPG GB Kompetenzstrukturmodell: Historische Methodenkompetenz)
- Unterscheidung aeussere Quellenkritik (Wer? Wann? Wo? Welche Gattung?) vs. innere Quellenkritik (Warum? Wozu? Welche Perspektive?)
- Ueberreste vs. Traditionen (GPG B2): bestimmen die Schaerfe der Analyse
- Fuer R7: Fokus auf 4-6 leitende W-Fragen statt formalisierter Quellenkritik-Methodik

## Eingabe

| Parameter | Beschreibung | Quelle |
|---|---|---|
| `material_id` | Referenziertes Material (Quellentext oder Bildquelle) | Progressionsplan |
| `material_typ` | `quellentext` oder `bildquelle` | Progressionsplan |
| `material_volltext` | Vollstaendiger Materialtext (HTML) | materialien/mat-N-M.json |
| `tafelbild_knoten` | Knoten, auf die die Aufgabe abzielt | Progressionsplan |
| `afb` | Anforderungsbereich (typisch II-III) | Progressionsplan |
| `operationalisierungsziel` | Was SuS durch die Quellenkritik erkennen sollen | Progressionsplan |
| `bloom_level` | Ziel-Bloom-Stufe (typisch L3-L5) | Progressionsplan |

## W-Fragen-Template

Die Quellenkritik-Aufgabe besteht aus einem Set von 4-6 W-Fragen, die systematisch zur Quellenanalyse anleiten. Nicht alle Fragen muessen in jeder Aufgabe verwendet werden — Auswahl nach didaktischer Passung.

### Aeussere Quellenkritik (Kontext erschliessen)

| W-Frage | Ziel | Beispiel |
|---------|------|---------|
| **Wer?** | Verfasser/Urheber identifizieren | "Wer hat diesen Text geschrieben / dieses Bild erstellt?" |
| **Wann?** | Zeitliche Einordnung | "Wann ist diese Quelle entstanden? Was passierte zu dieser Zeit?" |
| **Wo?** | Raeumliche Einordnung | "Wo wurde dieser Text verfasst / dieses Bild aufgenommen?" |
| **Was fuer eine Quelle?** | Quellengattung bestimmen | "Ist das ein Brief, eine Rede, ein Zeitungsartikel, ein Foto, ein Plakat?" |

### Innere Quellenkritik (Perspektive + Intention analysieren)

| W-Frage | Ziel | Beispiel |
|---------|------|---------|
| **Warum?** | Intention/Absicht erschliessen | "Warum hat der Verfasser das geschrieben? Was wollte er damit erreichen?" |
| **Fuer wen?** | Adressat identifizieren | "An wen richtet sich dieser Text / dieses Bild?" |
| **Wozu?** | Wirkungsabsicht reflektieren | "Welche Wirkung sollte die Quelle auf die Leser/Betrachter haben?" |
| **Was fehlt?** | Perspektivitaet erkennen | "Welche Sichtweise wird hier NICHT dargestellt? Wessen Stimme fehlt?" |

### Auswahl-Heuristik

| Material-Konstellation | Empfohlene W-Fragen | Begruendung |
|------------------------|---------------------|-------------|
| Quellentext (Rede/Brief) | Wer + Wann + Warum + Fuer wen | Intention + Adressat zentral |
| Quellentext (Vertrag/Urkunde) | Wer + Wann + Was fuer eine Quelle + Warum | Gattung + Funktion zentral |
| Bildquelle (Foto) | Wer + Wann + Wo + Was fehlt | Perspektive des Fotografen + Ausschnitt |
| Bildquelle (Karikatur/Plakat) | Wer + Fuer wen + Wozu + Was fehlt | Propagandaanalyse |

## Aufgaben-Konstruktion

### 1. Material-Analyse

Lies den Material-Volltext und bestimme:
- Quellentyp (Ueberrest oder Tradition)
- Erkennbare Perspektive des Urhebers
- Im Material enthaltene Informationen, die W-Fragen beantworten
- Luecken: Was ist NICHT aus dem Material erschliessbar?

### 2. W-Fragen auswählen und formulieren

Waehle 4-6 W-Fragen nach Auswahl-Heuristik. Formuliere jede Frage:
- R7-verstaendlich (max 15 Woerter)
- Mit Material-Bezug: "Lies den Text von [Verfasser] noch einmal. Wer...?"
- Als echte Frage (nicht als verkappte Antwort-Erwartung)

### 3. Loesung definieren

Die `loesung` ist ein Object mit je einem Schluessel pro gestellter W-Frage:

```json
{
  "wer": "Erwartete Antwort: Verfasser/Urheber mit Funktion",
  "wann": "Erwartete Antwort: Zeitliche Einordnung",
  "warum": "Erwartete Antwort: Intention/Absicht",
  "was_fehlt": "Erwartete Antwort: fehlende Perspektive"
}
```

Jeder Wert ist eine Musterantwort (1-2 Saetze), die das Mindest-Erwartungsniveau fuer R7 abbildet.

### 4. Tipps (3-stufig, STR-04)

| Stufe | Haertegrad | Quellenkritik-Spezifik |
|-------|-----------|----------------------|
| T1 (kognitiv) | Aktiviert Vorwissen | "Lies den Einleitungssatz des Quellentexts [[mat-id|M(pos)]] noch einmal. Dort steht, wer den Text geschrieben hat." |
| T2 (strukturierend) | Fokussiert auf relevanten Aspekt | "Achte auf die Wortwahl des Verfassers. Verwendet er eher sachliche oder wertende Ausdruecke? Das verraet etwas ueber seine Absicht." |
| T3 (heuristisch) | Loesungsstrategie, kein Leak | "Ueberlege: Jede Quelle zeigt nur EINE Sichtweise. Frage dich: Wer koennte das Ereignis ganz anders erlebt haben?" |

**Anti-Leak (A21):** T3 darf die konkreten Musterantworten nicht vorwegnehmen. T3 liefert eine Denk-Strategie, keine inhaltliche Loesung.

### 5. Feedback (STR-03)

Pro W-Frage mindestens ein Feedback-Eintrag im Schema `{typ, text, ebene}`:
- `typ: "bestaetigung"` wenn Antwort korrekt den Kern trifft
- `typ: "hinweis"` wenn Antwort oberflaechlich bleibt (z.B. nur Name ohne Funktion bei "Wer?")
- `typ: "verknuepfung"` wenn Antwort mit anderen Materialien der Mappe verknuepft werden kann
- `ebene`: Bloom-Projektion aus VERTRAG_FEEDBACK_SCHEMA.md §9.3

## Engine-Rendering

Der Engine-Renderer `quellenkritik` zeigt:
1. Material-Referenz (Link zum Quellentext/Bildquelle)
2. W-Fragen als nummerierte Liste mit je einem Textfeld
3. "Pruefen"-Button: vergleicht Eingaben gegen Musterantworten (Keyword-Matching analog Freitext)

**Loesungsformat fuer Engine:**

```json
{
  "typ": "quellenkritik",
  "frage": "Analysiere die Quelle von [Verfasser] genauer.",
  "w_fragen": [
    {"schluessel": "wer", "frage": "Wer hat diesen Text geschrieben?"},
    {"schluessel": "wann", "frage": "Wann ist der Text entstanden?"},
    {"schluessel": "warum", "frage": "Warum hat der Verfasser das geschrieben?"},
    {"schluessel": "was_fehlt", "frage": "Welche Sichtweise fehlt in diesem Text?"}
  ],
  "loesung": {
    "wer": "Musterantwort...",
    "wann": "Musterantwort...",
    "warum": "Musterantwort...",
    "was_fehlt": "Musterantwort..."
  },
  "material_referenz": "mat-N-M",
  "tipps": [...],
  "feedback": [...],
  "_meta": { "bloom_level": 4, "bloom_begruendung": "..." }
}
```

## Anti-Automatismus-Klausel (STR-08)

Quellenkritik wird **nicht** automatisch bei jeder Primaerquelle eingesetzt. Der Progressionsplan-Agent entscheidet sinngerichtet:

**Quellenkritik einsetzen wenn:**
- Material ist Primaerquelle (Quellentext oder historische Bildquelle)
- UND didaktisches Ziel der Mappe beinhaltet Quellen-Reflexion (Perspektivitaet, Intention, Glaubwuerdigkeit)
- UND Bloom-Ziel verlangt L3+ Anteil, der durch Quellenkritik abgedeckt werden kann
- UND die Quelle hat eine erkennbare Perspektive/Intention (nicht: neutrale Statistik)

**Quellenkritik NICHT einsetzen wenn:**
- Material ist Darstellungstext oder Zeitleiste (keine Primaerquelle)
- Quelle ist primaer informativ ohne erkennbare Perspektive (z.B. Vertragsliste, Statistik)
- Bloom-Ziel an dieser Position ist L1-L2 (reine Reproduktion)
- Bereits eine Quellenkritik-Aufgabe in derselben Mappe vorhanden und weitere wuerde Monotonie erzeugen

## JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ae, oe, ue, ss). KEINE ASCII-Transliterationen. Beispiel: "Buendnissysteme", nicht "Buendnissysteme".
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`). Gilt fuer ALLE SuS-sichtbaren Felder.

## Output

**Schema-Referenz:** Erweiterung von `docs/architektur/schemata/aufgabe-output-schema.json`

```json
{
  "id": "aufgabe-N-M",
  "typ": "quellenkritik",
  "frage": "Analysiere die Quelle genauer.",
  "w_fragen": [...],
  "loesung": { "wer": "...", "wann": "...", ... },
  "material_referenz": "mat-N-M",
  "tipps": [
    {"stufe": 1, "haertegrad": "kognitiv", "text": "..."},
    {"stufe": 2, "haertegrad": "strukturierend", "text": "..."},
    {"stufe": 3, "haertegrad": "heuristisch", "text": "..."}
  ],
  "feedback": [
    {"typ": "bestaetigung", "text": "...", "ebene": "anwendung"},
    {"typ": "hinweis", "text": "...", "ebene": "verstaendnis"}
  ],
  "afb": "II",
  "position": 0,
  "_meta": {
    "bloom_level": 4,
    "bloom_begruendung": "Quellenkritik erfordert Analyse der Perspektive und Intention (L4)",
    "w_fragen_auswahl": "Rede → Wer + Wann + Warum + Fuer wen",
    "quellentyp": "tradition | ueberrest"
  }
}
```

## Qualitaets-Gate

| # | Pruefpunkt | Kriterium |
|---|---|---|
| QK-1 | W-Fragen-Anzahl | 4-6 W-Fragen, Auswahl begruendet |
| QK-2 | Aeussere + Innere | Mindestens je 1 Frage aus aeusserer und innerer Quellenkritik |
| QK-3 | Material-Passung | Alle Fragen sind aus dem referenzierten Material beantwortbar (ggf. mit Vorwissen) |
| QK-4 | Musterantwort-Qualitaet | Jede Musterantwort ist R7-verstaendlich, inhaltlich korrekt, 1-2 Saetze |
| QK-5 | Anti-Leak (A21) | T3 verraet keine Musterantwort |
| QK-6 | Feedback-Schema (A25/A26) | Feedback vorhanden, Schema-konform, didaktisch valide |
| QK-7 | Anti-Automatismus | Einsatz ist sinngerichtet begruendet, nicht mechanisch getriggert |
| QK-8 | Perspektivitaet | Mindestens 1 W-Frage zielt auf Perspektive/Intention/Fehlendes |

## Abgrenzung

| Frage | Zustaendig |
|---|---|
| Wann Quellenkritik einsetzen? | Progressionsplan-Agent (VERTRAG_PHASE_2-2a) |
| Quellentext aufbereiten? | SUB_MATERIAL_QUELLENTEXT |
| Bildquelle aufbereiten? | SUB_MATERIAL_BILDQUELLE |
| Allgemeine Freitext-Aufgaben? | SUB_AUFGABE_FREITEXT |
| Engine-Renderer bauen? | Claude-Code (Code-Strang, Cold-Handoff) |
