# Q-Gate-Log: Mappe 4 — gpg-erster-weltkrieg-ursachen

---

## D0: Rahmen-Produktion (Phase 2.0)

**Datum:** 2026-04-03
**Artefakte:** hefteintrag.json, einstieg.json, sicherung.json, meta.json

```json
{
  "artefakt_id": "rahmen-mappe-4",
  "artefakt_typ": "rahmen",
  "phase": "2.0",
  "datum": "2026-04-03",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-03",
      "name": "Schema-Validierung (3 Rahmen-Schemata)",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "hefteintrag-schema.json: 0 Fehler. rahmen-einstieg-schema.json: 0 Fehler. rahmen-sicherung-schema.json: 0 Fehler. meta.json: 4/4 Pflichtfelder."
    },
    {
      "id": "C1b",
      "name": "Stundenfrage-Identitaet",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "einstieg.problemstellung === hefteintrag.stundenfrage === 'Warum scheiterte der Plan fuer einen schnellen Sieg?'"
    },
    {
      "id": "M3b",
      "name": "Kernerkenntnisse-Identitaet",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "scpl.loesung[] identisch mit TAFELBILD-Kernerkenntnissen (3/3 Saetze)."
    },
    {
      "id": "Q-M2-09",
      "name": "Disjunktionsregel",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "reflexionsimpuls (Metakognition: 'Warum gehen Plaene manchmal schief...') inhaltlich disjunkt zu scpl.loesung[] (Fakten: Schlieffen-Plan, Marne, Stellungskrieg)."
    },
    {
      "id": "Q-M2-08",
      "name": "Quellenangabe-Hygiene",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Keine internen Artefakt-Namen in SuS-sichtbaren Texten."
    },
    {
      "id": "V-RAHMEN",
      "name": "Vollstaendigkeit",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder vorhanden. zusammenfassung + ueberleitung als '[REVISION IN 2.1c]' (Placeholder korrekt). zitat: null (kein historisches Schlusszitat in Read-Steps identifiziert)."
    },
    {
      "id": "TYP-01-R",
      "name": "Typographische Korrektheit Rahmen (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute korrekt. Gedankenstriche als U+2014. Keine ASCII-Ersatzzeichen."
    },
    {
      "id": "REG-01",
      "name": "Sprachregister R7 Rahmentexte (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "einstieg.narrativ in schuelernaher Sprache. Keine didaktischen Metakommentare. hefteintrag_verweis sachlich-instruktiv."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**Zusaetzliche Pre-Checks (GUETEKRITERIEN_HEFTEINTRAG_PRODUKT):**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| HE14 | Schaubild-Charakter | PASS | 6 Knoten (3-14), 5 Verbindungen (>0). knoten[].text max 6 Woerter. verbindungen[].label max 2 Woerter. |
| HE15 | Ordnungsmuster-Treue | PASS | sequenziell: Complication-Schritte chronologisch (Plan → Vormarsch → Marne). Verbindungen temporal/kausal. |
| HE16 | Merksatz-Kalibrierung | PASS | 3 Merksaetze fuer kernbegriff/wirkung mit Fachbegriffen ausserhalb R7 (Schlieffen-Plan, Zweifrontenkrieg, Stellungskrieg). Alle ≤15 Woerter. k4-3 (ursache) + k4-4/k4-5 (ereignis) ohne merksatz — korrekt (nur kernbegriff/wirkung pruefpflichtig). |

**Anmerkungen:**
- SCPL-Texte C1, C3, P aus TAFELBILD gekuerzt (FORMULIERUNGS-OFFEN): C1 16→10 W, C3 17→13 W, P 18→11 W. Kompakt-Stil gemaess Vertrag 1b.
- C2 fachbegriff = "" (kein neuer Fachbegriff in diesem Schritt). Schema-konform (type: string, kein minLength).
- Mappe 4 = letzte Mappe. sicherung.ueberleitung wird in 2.1c als C5 Variante B (Reflexion statt Bruecke) produziert.

---

## D1: Material 1 — mat-4-1 darstellungstext (Phase 2.1)

**Datum:** 2026-04-03
**Artefakt:** materialien/mat-4-1.json

```json
{
  "artefakt_id": "mat-4-1",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-03",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung (material-output-schema.json)",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder vorhanden. id-Pattern, typ-Enum, didaktische_funktion-Enum korrekt. sequenz_kontext vollstaendig."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Material erklaert den Schlieffen-Plan als Antwort auf den Zweifrontenkrieg — direkter Beitrag zur Stundenfrage 'Warum scheiterte der Plan fuer einen schnellen Sieg?'"
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A: Frage)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel: 'Wie wollte Deutschland den Krieg an zwei Fronten gewinnen?' — aktivierend, R7-zugaenglich."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Fakten korrekt: Schlieffen als Namensgeber, 40-Tage-Kalkuel, Angriff durch Belgien, Zeitluecke wegen russischer Mobilmachung. Alle belegbar in SKRIPT §1-§3 und INHALTSBASIS Mappe 4."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "150 Woerter. Max Satzlaenge 18 Woerter. 3 neue Fachbegriffe (Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung) — alle erklaert."
    },
    {
      "id": "M3",
      "name": "Elementarisierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Fokus auf 3 TB-Knoten (k4-2, k4-1, k4-3). Keine Nebenstraenge. Moltke-Modifikation bewusst ausgelassen (nicht TB-relevant)."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k4-2: Zweifrontenkrieg als Problem explizit. k4-1: Schlieffen-Plan als Strategie mit Details. k4-3: Zeitluecke durch Mobilmachungs-Asymmetrie. Alle 3 Merksaetze nach Lektuere formulierbar."
    },
    {
      "id": "M5",
      "name": "Aktivierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Frage-Titel aktivierend. Dramatisierung: 'In nur 40 Tagen soll Frankreich fallen.' Schlieffen-Zitat als Personifizierung."
    },
    {
      "id": "C6/MQ6",
      "name": "Erarbeitbarkeits-Plausibilitaet",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Alle 3 SCPL-Schritte (S: Zweifrontenkrieg, C1: Plan + Zeitluecke) durch Lektuere erarbeitbar. Fachbegriffe nicht nur erwaehnt, sondern entwickelt."
    },
    {
      "id": "M8",
      "name": "Quellenorientierung",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Quellenangabe vorhanden. Schlieffen-Zitat (zit-4-1) eingebettet. cite-Tag am Ende."
    },
    {
      "id": "M10",
      "name": "Sprachsensibilitaet",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Keine Propagandabegriffe. 'neutrales Belgien' korrekt kontextualisiert."
    },
    {
      "id": "TYP-01",
      "name": "Typographische Korrektheit (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute. Gedankenstriche als U+2014. Deutsche Anfuehrungszeichen als HTML-Entities (bdquo/ldquo). Kein ASCII-Ersatz."
    }
  ],
  "nachbesserung": {
    "iteration": 1,
    "korrigierte_kriterien": ["Q1"],
    "detail": "Erstversion 153 Woerter. Gekuerzt: 'General Alfred von' → 'General', 'viel laenger' → 'laenger'. Neues Ergebnis: 150 Woerter.",
    "neues_gesamt": "PASS"
  },
  "finding": null
}
```

**DT-spezifische Kriterien:**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| DT-1 | Vergegenwaertigung | PASS | Detaillieren (40 km, 40 Tage), Personifizieren (Schlieffen), Lokalisieren (Belgien, Frankreich, Russland). |
| DT-2 | Textstruktur | PASS | 3 Absaetze: Einfuehrung (Zweifrontenkrieg) → Hauptteil (Plan) → Schluss (Zeitluecke + Ausblick). |
| DT-3 | Kausalitaetstyp | PASS | Abs 1-2: dynamisch (Problem → Plan → Loesung). Abs 3: strukturell (Annahme: Zeitluecke). Konsistent pro Absatz. |
| DT-4 | Sprachregister | PASS | Aktiv-dominiert. Kein Passiv. Kein Schachtelsatz. Laengster Satz 18 W. |
| DT-5 | Wortanzahl | PASS | 150/150 (nach Nachbesserung). |

**Sequenz-Kohaerenz:**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| SQ-1 | Nur erarbeitetes Wissen | PASS | Position 1 — kein Vorwissen noetig. |
| SQ-2 | Keine gesperrten Begriffe | PASS | Kein Stellungskrieg, keine Marne, kein Einmarsch (als Ereignis). Belgien nur als Planelement. |
| SQ-3 | TB-Knoten erarbeitbar | PASS | k4-1, k4-2, k4-3 alle explizit. |
| SQ-4 | Narrativer Anschluss | PASS | Position 1 — kein Vorgaenger. Schlusssatz als Bruecke zu mat-4-2 (Karte). |

---

## D2: Material 2 — mat-4-2 karte (Phase 2.1)

**Datum:** 2026-04-03
**Artefakt:** materialien/mat-4-2.json

```json
{
  "artefakt_id": "mat-4-2",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-03",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder inkl. bildunterschrift + lizenz. typ=bildquelle (karte→bildquelle Mapping korrekt)."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Karte visualisiert den Schlieffen-Plan — zeigt den geplanten Angriffsweg, dessen Scheitern die Stundenfrage beantwortet."
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A: Frage)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel: 'Welchen Weg plante die deutsche Armee durch Europa?'"
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Historische Karte (Schlieffen_Plan.svg) aus Wikimedia Commons. Zeigt Angriffspfeile durch Belgien."
    },
    {
      "id": "M4",
      "name": "Zielklarheit",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k4-1 (Schlieffen-Plan als Strategie) und k4-4 (Einmarsch ueber Belgien) aus Karte ablesbar."
    },
    {
      "id": "KA-BU",
      "name": "Bildunterschrift (3 Funktionen)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "31/40 Woerter. Identifikation (Karte 1905, Angriffspfeile). Kontextualisierung (neutrales Belgien, Umgehung). Erschliessungsimpuls in _meta."
    },
    {
      "id": "KA-LEG",
      "name": "Legende",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Farbzuordnung dokumentiert: rote Pfeile (deutscher Vormarsch), blaue Pfeile (Plan XVII)."
    },
    {
      "id": "TYP-01",
      "name": "Typographische Korrektheit (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute. Gedankenstriche U+2014."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**Sequenz-Kohaerenz:**

| ID | Stufe | Detail |
|---|---|---|
| SQ-1 | PASS | Referenziert nur k4-1 (aus mat-4-1 erarbeitet) + fuehrt k4-4 neu ein. |
| SQ-2 | PASS | Keine Nennung von Marne/Stellungskrieg. |
| SQ-3 | PASS | k4-1 visuell verstaerkt, k4-4 (Einmarschweg) direkt ablesbar. |
| SQ-4 | PASS | Baut auf mat-4-1 auf (DT erklaerte Plan → Karte visualisiert ihn). |

---

## D3: Material 3 — mat-4-3 tagebuch (Phase 2.1)

**Datum:** 2026-04-03
**Artefakt:** materialien/mat-4-3.json

```json
{
  "artefakt_id": "mat-4-3",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-03",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung (material-output-schema.json)",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder vorhanden. id-Pattern, typ-Enum (tagebuch), didaktische_funktion-Enum korrekt. sequenz_kontext vollstaendig."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Material personifiziert den Vormarsch durch Belgien (k4-4) — zeigt Erschoepfung als Vorbote des Scheiterns, direkt relevant zur Stundenfrage."
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A: Frage)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel: 'Wie erlebten die Soldaten den Vormarsch?' — perspektivisch, R7-zugaenglich."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Fakten korrekt: 4 Wochen Vormarsch, durch Belgien, 250 km, Nachschubprobleme, Annaeherung an Paris. Alle belegbar in SKRIPT §4 und INHALTSBASIS rolle-4-1."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "99 Woerter (≤120). Max Satzlaenge 15 Woerter. Einfache, direkte Sprache."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k4-4 (Einmarsch ueber Belgien): Explizit erlebbar — Marsch durch Belgien, Gefechte, 250 km, Erschoepfung."
    },
    {
      "id": "M5",
      "name": "Aktivierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Ich-Perspektive immersiv. Sensorische Details (staubige Strassen, brennende Gehoefte, wunde Fuesse, Tornister). Pointe: 'Aber niemand hatte an unsere Beine gedacht.'"
    },
    {
      "id": "TYP-01",
      "name": "Typographische Korrektheit (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute korrekt. Gedankenstriche als U+2014. Kein ASCII-Ersatz."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**TB-spezifische Kriterien:**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| Q1 | Wortanzahl ≤120 | PASS | 99 Woerter (ohne Orts-/Datumzeile). |
| Q2 | Satzlaenge ≤15 | PASS | Laengster Satz 15 W. |
| Q3 | Ich-Perspektive, Praeteritum | PASS | Durchgaengig. |
| Q4 | Historische Plausibilitaet | PASS | 250 km, 4 Wochen, Nachschub, Belgien — alle SKRIPT §4. |
| Q5 | Keine Rueckprojektion | PASS | Soldat zweifelt am Plan, aber ohne Vorauswissen. |
| Q6 | Ueberwaetigungsverbot | PASS | Erschoepfung sachlich, kein Trauma-Voyeurismus. |
| Q7 | Alltagsdetail (sensorisch) | PASS | Staubige Strassen, brennende Gehoefte, durchgelaufene Stiefel, wunde Fuesse, schwerer Tornister. |
| Q8 | Perspektivitaet | PASS | Friedrich kennt nur seinen Marsch. Keine Strategie-Einsicht. |
| Q9 | TB-Abdeckung k4-4 | PASS | Einmarsch ueber Belgien als konkrete Erfahrung erlebbar. |
| Q10 | Fiktions-Kennzeichnung | PASS | cite-Tag vorhanden. |
| Q11 | Name/Ort/Datum | PASS | Friedrich, 22, Nordfrankreich, 2. September 1914. |
| Q12 | Kein Stereotyp | PASS | Differenzierte Figur: anfangs stolz, dann zweifelnd. |

**Sequenz-Kohaerenz:**

| ID | Stufe | Detail |
|---|---|---|
| SQ-1 | PASS | Referenziert nur Belgien (mat-4-2) und Plan/40 Tage (mat-4-1). Alles vorher erarbeitet. |
| SQ-2 | PASS | Kein Stellungskrieg, keine Marne, kein Rueckzug als militaerisches Ereignis. |
| SQ-3 | PASS | k4-4 (Einmarsch ueber Belgien) aus Eintrag direkt erarbeitbar. |
| SQ-4 | PASS | Baut auf mat-4-2 auf (Karte zeigte geplanten Vormarsch → Tagebuch personifiziert ihn). |

---

## D4: Material 4 — mat-4-4 karte (Phase 2.1)

**Datum:** 2026-04-04
**Artefakt:** materialien/mat-4-4.json

```json
{
  "artefakt_id": "mat-4-4",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-04",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder inkl. bildunterschrift + lizenz. typ=bildquelle (karte→bildquelle Mapping korrekt). JSON valide."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Karte zeigt das Scheitern des Vormarschs an der Marne — direkte Antwort auf 'Warum scheiterte der Plan fuer einen schnellen Sieg?'"
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A: Frage)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel: 'Wo stoppten die Franzosen den deutschen Vormarsch?' — aktivierend, kartenbasiert, R7-zugaenglich."
    },
    {
      "id": "MQ4",
      "name": "Didaktische Bildunterschrift (v3.8 C4)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "BU enthaelt NUR didaktischen Beschreibungstext (Identifikation + Kontextualisierung). KEINE Quellenangabe. Quelle separat in quelle + lizenz."
    },
    {
      "id": "MQ-QH",
      "name": "Quellenangabe-Hygiene",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "quelle = 'Frederick Maurice, 1919, Wikimedia Commons'. Keine internen Artefakt-Namen."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Historische Karte (Maurice 1919) zeigt Marne-Schlacht korrekt. Frontlinien, Armeepositionen, Rueckzug belegbar in SKRIPT §5 und INHALTSBASIS."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "BU 28 Woerter (≤40). Einfache Sprache. Laengster Satz 20 W."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k4-5 (Schlacht an der Marne) raeumlich erschliessbar: Frontlinie Paris–Verdun, Gallieni-Flanke, 65 km Rueckzug."
    },
    {
      "id": "M5",
      "name": "Aktivierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Frage-Titel regt aktive Kartenarbeit an. Erschliessungsimpuls fordert Schlussfolgerung (Naehe Paris als strategischer Vorteil)."
    },
    {
      "id": "TYP-01",
      "name": "Typographische Korrektheit (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute korrekt. Gedankenstriche U+2014. Kein ASCII-Ersatz."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**KA-spezifische Kriterien:**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| KA-BU | Bildunterschrift (3 Funktionen) | PASS | 28/40 W. Identifikation (Karte/Marne/Sept. 1914, 9 W). Kontextualisierung (Armeepositionen + Rueckzug + Gallieni, 19 W). Erschliessungsimpuls in _meta (12 W). |
| KA-LEG | Legende | PASS | 3 Kategorien dokumentiert: Armeepositionen, Bewegungspfeile, Frontlinie. |
| KA-ORI | Orientierungshilfen | PASS | Paris und Verdun als bekannte geographische Ankerpunkte. Marne als Fluss. |
| KA-ALT | Altersgemaeessheit | PASS | 3 Legenden-Kategorien. Nicht ueberfrachtet (≤8 unterscheidbare Elemente). |
| KA-LIZ | Lizenz | PASS | Public Domain. |
| KA-ENG | Engine-Typ | PASS | typ=bildquelle (karte→bildquelle Mapping korrekt). |

**Sequenz-Kohaerenz:**

| ID | Stufe | Detail |
|---|---|---|
| SQ-1 | PASS | Referenziert nur bereits erarbeitetes Wissen: Vormarsch (k4-4), deutsche Armeen (mat-4-1/mat-4-2). Gallieni als neues Element gehoert zu k4-5 (wird hier eingefuehrt). |
| SQ-2 | PASS | Kein Stellungskrieg (k4-6) in BU oder Erschliessungsimpuls. |
| SQ-3 | PASS | k4-5 (Schlacht an der Marne) durch Karte raeumlich erarbeitbar: Frontlinie, Gegenoffensive, Rueckzug visuell nachvollziehbar. |
| SQ-4 | PASS | Baut auf mat-4-3 auf (Tagebuch zeigte Erschoepfung → Karte zeigt, wo die Gegenoffensive die erschoepften Truppen trifft). |

---

## D5: Material 5 — mat-4-5 bildquelle (Phase 2.1)

**Datum:** 2026-04-04
**Artefakt:** materialien/mat-4-5.json

```json
{
  "artefakt_id": "mat-4-5",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-04",
  "gesamt": "PASS",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "PASS",
      "detail": "Alle Pflichtfelder inkl. bildunterschrift + lizenz. typ=bildquelle (nativ). kernerkenntnisse[] vorhanden (sicherung). JSON valide."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Foto zeigt Ergebnis des gescheiterten Plans: Schuetzengraeben statt schnellem Sieg. Direkte Antwort auf Stundenfrage."
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ B: Statement)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Statement-Titel: 'Statt 40 Tagen — vier Jahre Schuetzengraeben'. Sicherungs-BQ, visueller Anker. Kontrastiert Plan (40 Tage) mit Realitaet (4 Jahre)."
    },
    {
      "id": "MQ4",
      "name": "Didaktische Bildunterschrift (v3.8 C4)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "BU enthaelt NUR didaktischen Beschreibungstext. KEINE Quellenangabe. Quelle separat in quelle + lizenz."
    },
    {
      "id": "MQ-QH",
      "name": "Quellenangabe-Hygiene",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "quelle = 'Imperial War Museums, Wikimedia Commons'. Keine internen Artefakt-Namen."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Historisches Foto (IWM Q53490, 1914). Franzoesische Soldaten, Stacheldrahtverhaue, Argonne. Zeitlich korrekt."
    },
    {
      "id": "M3c",
      "name": "Vom-Ende-her (Sicherung)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Titel transportiert KE 1+3 (40 Tage → Stellungskrieg). BU transportiert KE 2+3 (Scheitern → Eingraben). Alle 3 Kernerkenntnisse anschlussfaehig."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k4-6 (Stellungskrieg) visuell erschliessbar: Schuetzengraben + Stacheldraht als konkrete Realitaet des Grabenkriegs."
    },
    {
      "id": "M5",
      "name": "Aktivierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Kontrasttitel erzeugt kognitive Dissonanz. Erschliessungsimpuls fordert Vergleich Plan vs. Ergebnis."
    },
    {
      "id": "TYP-01",
      "name": "Typographische Korrektheit (v3.3)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "UTF-8 Umlaute korrekt. Gedankenstriche U+2014. Kein ASCII-Ersatz."
    }
  ],
  "nachbesserung": null,
  "finding": null
}
```

**BQ-spezifische Kriterien:**

| ID | Kriterium | Stufe | Detail |
|---|---|---|---|
| BQ-Q1 | Pfad | PASS | Lokaler Pfad (../../assets/img/...). download_url in _meta dokumentiert. |
| BQ-Q2 | Identifikation | PASS | "Franzoesische Soldaten bauen Stacheldrahtverhaue in einem Schuetzengraben in der Argonne, 1914." (11 W ≤20). |
| BQ-Q3 | Kontextualisierung | PASS | "Nach dem Scheitern des Schlieffen-Plans an der Marne gruben sich beide Seiten ein — der Stellungskrieg hatte begonnen." Verbindung k4-6. |
| BQ-Q4 | Lizenz | PASS | Public Domain (IWM). |
| BQ-Q5 | Quellenangabe | PASS | "Imperial War Museums, Wikimedia Commons". |
| BQ-Q6 | Thumbnail-Breite | PASS | 640px (Foto/Szene). |
| BQ-Q7 | Tafelbild-Abdeckung | PASS | k4-6 durch Foto + BU erschliessbar. |
| BQ-Q8 | Kein Interpretationsvorgriff | PASS | BU beschreibt (Soldaten bauen) und kontextualisiert (nach Marne), bewertet nicht. |
| BQ-Q9 | Engine-Typ | PASS | typ=bildquelle (nativ). |
| BQ-Q10 | Erschliessungsimpuls | PASS | "Was unterscheidet dieses Bild vom schnellen Sieg, den der Schlieffen-Plan versprach?" (11 W). |

**Sequenz-Kohaerenz:**

| ID | Stufe | Detail |
|---|---|---|
| SQ-1 | PASS | Referenziert Schlieffen-Plan (k4-1), Marne (k4-5) — beides vorher erarbeitet. k4-6 wird hier eingefuehrt. |
| SQ-2 | PASS | noch_nicht_eingefuehrt = leer (letzte Position). Keine gesperrten Begriffe. |
| SQ-3 | PASS | k4-6 (Stellungskrieg) durch Foto + BU erarbeitbar: visueller Kontrast zum Bewegungskrieg. |
| SQ-4 | PASS | Baut auf mat-4-4 auf (Karte zeigte Rueckzug → Foto zeigt, was danach kam: Grabenkrieg). |

---

## D6: Cross-Konsistenz + Ueberleitungen + Hefteintrag-Revision (Phase 2.1c)

**Datum:** 2026-04-04
**Vertrag:** VERTRAG_PHASE_2-1c_CROSS.md
**Katalog:** Q-GATE-MECHANIK.md §7.4

### Ergebnis: GESAMT-PASS

| # | ID | Kriterium | Klasse | Stufe | Detail |
|---|---|---|---|---|---|
| 1 | CROSS-1 | Sequenz-Kohaerenz | KONSISTENZ | PASS | Kein Material setzt nicht-eingefuehrten Fachbegriff voraus. 5/5 Materialien in korrekter Vorwissens-Progression. |
| 2 | CROSS-2 | Fachbegriff-Konsistenz | KONSISTENZ | PASS | 5 Fachbegriffe geprueft (Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung, Schlacht an der Marne, Stellungskrieg). Alle konsistent ueber Materialien und Hefteintrag. |
| 3 | CROSS-3 | Ueberleitung-Kohaerenz | KONSISTENZ | PASS | 4/4 GERUEST-Intentionen treffen auf tatsaechlichen Materialinhalt. Keine Diskrepanz Plan vs. Produkt. |
| 4 | CROSS-4 | TB-Knoten-Gesamtabdeckung | KONSISTENZ | PASS | 6/6 Knoten (k4-1 bis k4-6) durch mindestens 1 Material abgedeckt. |
| 5 | UE-1..5 | Ueberleitung-Qualitaet (Achse 5) | DIDAKTIK | PASS | 4 Ueberleitungen produziert. Alle UE-1 bis UE-5 PASS: Rueckwaerts-Vektor konkret, Vorwaerts-Vektor plausibilisierend, R7-Register, kein Spoiler, Sequenz-Passung. |
| 6 | HE-REV | Hefteintrag-Revision (Achse 6) | KONSISTENZ | PASS | STRUKTUR-FREEZE eingehalten. SCPL-Texte: 0 Aenderungen (bereits material-kongruent). zusammenfassung + ueberleitung erstmalig produziert. |
| 7 | HE-PROD | Hefteintrag-Produktqualitaet | DIDAKTIK | PASS | HE1-HE18: 10/10 MUSS PASS, 7/7 SOLL PASS. Stufe-2 Re-Evaluation (G3,G5,G10,G12,G14): 5/5 PASS. |
| 8 | TYP-01-C | Typographische Korrektheit | FORM | PASS | UTF-8 Umlaute, Gedankenstrich (—), dt. Anfuehrungszeichen korrekt in allen SuS-sichtbaren Texten. |
| 9 | REG-01-C | Sprachregister Ueberleitungen | FORM | PASS | Alle 4 Ueberleitungen R7-konform, max 2 Saetze, keine didaktischen Metakommentare. |

### Stufe-2 Re-Evaluation

| # | Kriterium | Stufe | Detail |
|---|---|---|---|
| G3 | Erarbeitbarkeit | PASS | Alle 5 SCPL-Schritte durch produzierte Materialien erarbeitbar. |
| G5 | Sprachliches Niveau | PASS | 4 Fachbegriffe identisch mit Material-Einfuehrung. |
| G10 | Rekapitulierbarkeit | PASS | SCPL-Bogen bildet Material-Sequenz 1:1 ab. |
| G12 | Sprachregister-Passung | PASS | Kein Register-Bruch zwischen Materialien und Hefteintrag. |
| G14 | SCPL-Kohaerenz | PASS | S→C1→C2→C3→P = kohaerenter inhaltlicher Bogen. |

### Achse-6-Aenderungsdokumentation

| Feld | Aenderung | Begruendung |
|---|---|---|
| scpl.* (alle Zonen) | Keine | Alle FORMULIERUNGS-OFFEN-Felder bereits material-kongruent. |
| sicherung.zusammenfassung | NEU (Placeholder ersetzt) | Prozess-Synthese: 39 W, 3 Handlungsverben, disjunkt zu Merksatz. |
| sicherung.ueberleitung | NEU (Placeholder ersetzt) | Letzte-Mappe-Reflexion mit Transfer-Frage. |
| hefteintrag.json | Keine Aenderung | SCPL-Texte unveraendert. |

### Nachbesserung

Keine. 0 FAIL, 0 WARN.

### Produzierte Dateien

- ueberleitungen.json (NEU)
- rahmen/sicherung.json (AKTUALISIERT: zusammenfassung + ueberleitung)
- rahmen/hefteintrag.json (UNVERAENDERT)

---

## D7: Progressionsplan (Phase 2.2a)

**Datum:** 2026-04-04
**Artefakt:** PROGRESSIONSPLAN_Mappe4.md
**Agent:** AGENT_RAETSEL (Orchestrator)

Kein formales Q-Gate fuer Progressionsplan. Orchestrator-interne Validierung:

| Pruefung | Ergebnis | Detail |
|----------|----------|--------|
| Aufgabenzahl-Ableitung | 7 | basis=5, knoten_faktor=1 (6>5), material_faktor=1 (5>4) |
| AFB-Progression | PASS | I→I→I-II→II→II→II→III monoton steigend |
| Typvielfalt (A10v2) | PASS | 5 Typen: LT, MC, RF, ZU, FT. MC×2 begr. (Fakten/Transfer), RF×2 begr. (Mikro/Makro) |
| SCPL-Zonen-Abdeckung (A17) | PASS | S(1), C1(1), C2(1), C3(1), P(1), L(2) — alle abgedeckt |
| TB-Knoten-Vollabdeckung (A9) | PASS | k4-1 bis k4-6 je min. 1× getestet |
| Material-Aktivierung (A18) | PASS | mat-4-1 bis mat-4-5 je 1× als Primaerquelle |
| Sachbezogen→Wertbezogen (A12) | PASS | S/C (Pos 1-4) sachbezogen → P/L (Pos 5-7) analytisch/wertbezogen |
| Erarbeitbarkeits-Gegenpruefung (B8) | PASS | Alle 7 Typ-Material-Kombinationen geprueft und begruendet |
| Freischalt-Code | MARNE | 5 Buchstaben, A-Z, thematisch passend (bereits in meta.json) |

---

## D8: Aufgabe 1 — Lueckentext (Phase 2.2b-1)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-1.json
**Typ:** lueckentext | AFB: I | Material: mat-4-1 (M1) | TB-Knoten: k4-2, k4-1, k4-3

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Fachbegriff-Luecken = AFB I Recall. Kongruent mit Progressionsplan. |
| A2 Fragestamm-Klarheit | PASS | „Ergaenze die fehlenden Fachbegriffe." — 5 Woerter, Operator operationalisiert. |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Generischer Lueckentext-Impuls (erlaubt). Kontext aus text_mit_luecken. |
| A3 Material-Kongruenz | PASS | Zweifrontenkrieg, Schlieffen-Plan, Mobilmachung — alle 3 in mat-4-1 mit Klammerdefinition. |
| A4-LT Luecken-Eindeutigkeit | PASS | Zweifrontenkrieg: einziger Fachbegriff fuer Krieg an zwei Fronten. Schlieffen-Plan: Eigenname. Mobilmachung: einziger Begriff fuer Kriegsvorbereitung im Material. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweis + Themenfeld. Stufe 2: 1 Luecke eingegrenzt + Distraktor-Ausschluss. Stufe 3: Alle Loesungen + Erklaerung. |
| A7 Operator-Praezision | PASS | „Ergaenze" = operationalisiert. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-1|Text ueber den Krieg an zwei Fronten]] (M1)`. |
| Antwortpool (N+1) | PASS | 4 Eintraege: 3 korrekt + Distraktor „Stellungskrieg" (thematisch plausibel, hier falsch). Alphabetisch. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D9: Aufgabe 2 — Multiple-Choice (Phase 2.2b-2)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-2.json
**Typ:** multiple-choice | AFB: I | Material: mat-4-2 (M2) | TB-Knoten: k4-1

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Fakten-MC, AFB I. Antwort direkt aus BU mat-4-2 ableitbar. |
| A2 Fragestamm-Klarheit | PASS | 8 Woerter, 1 impliziter Operator (erkenne Grund). |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „Deutschland", „Belgien". |
| A3 Material-Kongruenz | PASS | BU mat-4-2: „befestigte deutsch-franzoesische Grenze zu umgehen". |
| A4-MC Distractor-Qualitaet | PASS | D1 „Belgien verbuendet" Rang 1 (Fehlvorstellung: war neutral). D2 „kuerzester Weg" Rang 2 (Teilwahrheit). D3 „zuerst Russland" Rang 1 (Reihenfolge-Verwechslung). 3/3 Rang 1-2. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweis. Stufe 2: 2 Distraktoren ausgeschlossen. Stufe 3: Loesung + Erklaerung. |
| A7 Operator-Praezision | PASS | Implizit „erkenne" via „Warum...?" |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-2|Karte des Schlieffen-Plans]] (M2)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D10: Aufgabe 3 — Reihenfolge (Phase 2.2b-3)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-3.json
**Typ:** reihenfolge | AFB: I-II | Material: mat-4-3 (M3) | TB-Knoten: k4-4

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Mikro-Chronologie aus Tagebuch = AFB I (Recall Reihenfolge) mit II-Anteil (Zusammenhang erkennen). |
| A2 Fragestamm-Klarheit | PASS | „Bringe Friedrichs Erlebnisse in die richtige Reihenfolge." — Operator + Bezug klar. |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „Friedrichs Erlebnisse" (benannte Figur aus mat-4-3). |
| A3 Material-Kongruenz | PASS | Alle 4 Elemente direkt aus mat-4-3 Tagebuch ableitbar. Reihenfolge durch Tagebuch-Chronologie eindeutig. |
| A4-RF Reihenfolge-Eindeutigkeit | PASS | 4 Elemente mit klarer chronologischer Progression: Stolz → Belgien → Nachschub fehlt → Zweifel. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweis. Stufe 2: Erstes + letztes Element. Stufe 3: Vollstaendige Loesung + Begruendung. |
| A7 Operator-Praezision | PASS | „Bringe ... in die richtige Reihenfolge" = operationalisiert. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-3|Friedrichs Tagebuch]] (M3)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D11: Aufgabe 4 — Zuordnung (Phase 2.2b-4)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-4.json
**Typ:** zuordnung | AFB: II | Material: mat-4-4 (M4) | TB-Knoten: k4-5

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Plan vs. Wirklichkeit = Analyse (AFB II). Erfordert Kategorisierung, nicht nur Recall. |
| A2 Fragestamm-Klarheit | PASS | „Was war geplant, was geschah wirklich an der Marne?" — 2 Kategorien benannt. |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „Marne", 2 benannte Kategorien. |
| A3 Material-Kongruenz | PASS | 5 Elemente aus mat-4-4 (Marne-Karte) + Rueckgriff auf mat-4-1/4-2 (Schlieffen-Plan). Alle Fakten materialbelegbar. |
| A4-ZU Zuordnungs-Eindeutigkeit | PASS | 5 Elemente, 2 Pole. 3× Schlieffen-Plan (Zukunftsplanung), 2× Marne-Wirklichkeit (eingetretenes Ergebnis). Trennschaerfe eindeutig. |
| A6 Tipp-Progression | PASS | Stufe 1: 2 Materialverweise (Karte M2 + Karte M4). Stufe 2: 2 Elemente zugeordnet. Stufe 3: Vollstaendige Loesung. |
| A7 Operator-Praezision | PASS | Implizit „ordne zu" via Aufgabentyp + Fragestellung. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-2|Karte des Schlieffen-Plans]] (M2)` + `[[mat-4-4|Karte der Marne-Schlacht]] (M4)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D12: Aufgabe 5 — Multiple-Choice Transfer (Phase 2.2b-5)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-5.json
**Typ:** multiple-choice | AFB: II | Material: mat-4-5 (M5) | TB-Knoten: k4-6

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Transfer-MC, AFB II. Foto-Interpretation erfordert Transferleistung (Bild → historischer Kontext). |
| A2 Fragestamm-Klarheit | PASS | „Was zeigt das Foto ueber das Scheitern des Schlieffen-Plans?" — Operator implizit (erschliesse), Bezug klar. |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „das Foto", „Schlieffen-Plan". |
| A3 Material-Kongruenz | PASS | Foto mat-4-5 zeigt Schuetzengrabenbau → Stellungskrieg. Antwort aus BU + Bildinhalt ableitbar. |
| A4-MC Distractor-Qualitaet | PASS | D1 „neuer Angriff" Rang 2 (plausible Fehlinterpretation). D2 „Sieg gelungen — Lager" Rang 1 (Gegenteil). D3 „kurze Pause" Rang 2 (verharmlost). 3/3 Rang 1-2. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweis + Beobachtungsfokus. Stufe 2: 1 Distraktor ausgeschlossen. Stufe 3: Loesung + Erklaerung. |
| A7 Operator-Praezision | PASS | „Was zeigt..." = erschliesse/interpretiere. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-5|Foto aus dem Schuetzengraben]] (M5)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D12b: Aufgabe 6 — Reihenfolge Makro (Phase 2.2b-6)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-6.json
**Typ:** reihenfolge | AFB: II | Material: alle (mat-4-1 bis mat-4-5) | TB-Knoten: k4-1, k4-4, k4-5, k4-6

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Makro-Kausalsequenz ueber alle Materialien = AFB II (Zusammenhaenge ordnen, nicht nur Recall). |
| A2 Fragestamm-Klarheit | PASS | „Ordne den Weg vom Schlieffen-Plan bis zum Stellungskrieg." — Start + Ziel benannt. |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „Schlieffen-Plan", „Stellungskrieg". |
| A3 Material-Kongruenz | PASS | 5 Elemente aus allen 5 Materialien ableitbar. Kausallogik durch Material-Sequenz vorgegeben. |
| A4-RF Reihenfolge-Eindeutigkeit | PASS | 5 Elemente mit klarer kausaler Progression: Plan → Einmarsch → Marne → Rueckzug → Stellungskrieg. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweise (M1 bis M5). Stufe 2: Anfang + Ende benannt. Stufe 3: Vollstaendige Sequenz + Kausalbegruendung. |
| A7 Operator-Praezision | PASS | „Ordne" = operationalisiert. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-1|Text ueber den Schlieffen-Plan]] (M1)` bis `[[mat-4-5|Schuetzengraben-Foto]] (M5)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D12c: Aufgabe 7 — Freitext (Phase 2.2b-7)

**Datum:** 2026-04-04
**Artefakt:** aufgaben/aufgabe-4-7.json
**Typ:** freitext-code | AFB: III | Material: alle (mat-4-1 bis mat-4-5) | TB-Knoten: alle (k4-1 bis k4-6)

| Kriterium | Ergebnis | Detail |
|-----------|----------|--------|
| A1 AFB-Kongruenz | PASS | Stundenfrage als Freitext = AFB III (begruendetes Urteil). |
| A2 Fragestamm-Klarheit | PASS | „Warum musste der Plan fuer einen schnellen Sieg scheitern?" — Operator „begruende" implizit via „Warum musste". |
| A2b Inhaltliche Verankerung (v3.4) | PASS | Konkretes Element: „Plan fuer einen schnellen Sieg" (= Schlieffen-Plan). |
| A3 Material-Kongruenz | PASS | Antwort synthetisiert alle 5 Materialien. Musterantwort belegt jeden Satz mit Material-Fakten. |
| A4-FT Keyword-Check | PASS | loesung[]: 2 Keywords (Schlieffen-Plan, Stellungskrieg). ≤2 fuer AFB III. ALL-or-nothing Logik. erwartete_begriffe (5) nur in _meta. |
| A5-FT Teilfragen | PASS | 2 Teilfragen in _meta.teilfragen. Leiten SuS durch Antwortstruktur. |
| A6 Tipp-Progression | PASS | Stufe 1: Materialverweise + Denkimpuls. Stufe 2: Konkrete Hinweise zu Annahmen + Marne. Stufe 3: Vollstaendige Musterantwort (5 Saetze). |
| A7 Operator-Praezision | PASS | „Warum musste ... scheitern?" = begruende/erklaere. |
| MQ3 Material-Referenz-Verbot | PASS | frage enthaelt kein `[[` und kein `(M`. |
| MQ3b Display-Referenzen Tipps | PASS | Tipp 1: `[[mat-4-1|Text ueber den Schlieffen-Plan]] (M1)` bis `[[mat-4-5|Schuetzengraben-Foto]] (M5)`. |
| Encoding (v3.3) | PASS | UTF-8 Umlaute, Gedankenstrich —. |

**Gesamt: PASS (0 FAIL, 0 WARN). Keine Nachbesserung.**

---

## D13: Cross-Konsistenz — Orchestrator-Q-Gate (Phase 2.2c)

**Datum:** 2026-04-04
**Katalog:** DISPATCH_SKRIPT_MAPPE4.md §Phase 2.2 / D13
**Pruefgegenstand:** aufgabe-4-1 bis aufgabe-4-7 (gesamt)

| # | Kriterium | Ergebnis | Detail |
|---|-----------|----------|--------|
| 1 | A10 Typendiversitaet (min. 3 Typen) | PASS | 5 verschiedene Typen: lueckentext, multiple-choice, reihenfolge, zuordnung, freitext-code. MC×2 begr. (Fakten AFB I vs. Transfer AFB II). RF×2 begr. (Mikro-Chronologie vs. Makro-Kausalsequenz). |
| 2 | A5 AFB-Progression (monoton steigend) | PASS | I → I → I-II → II → II → II → III. Kein Rueckschritt. |
| 3 | A9 TB-Knoten-Vollabdeckung (6/6) | PASS | k4-1: Pos 1, 2. k4-2: Pos 1. k4-3: Pos 1. k4-4: Pos 3. k4-5: Pos 4. k4-6: Pos 5, 6. Alle 6 Knoten min. 1× getestet. |
| 4 | A16/A17 SCPL-Zonen-Abdeckung | PASS | S(Pos 1), C1(Pos 2), C2(Pos 3), C3(Pos 4), P(Pos 5), L(Pos 6, 7). Alle Zonen abgedeckt. Monotone Zonenfolge S→C→P→L. |
| 5 | A18 Material-Aktivierung (5/5) | PASS | mat-4-1: Pos 1. mat-4-2: Pos 2. mat-4-3: Pos 3. mat-4-4: Pos 4. mat-4-5: Pos 5. Jedes Material min. 1× als Primaerquelle. |
| 6 | MQ3 Material-Referenz-Verbot (frage) | PASS | 7/7 frage-Felder: kein `[[`, kein `(M`. |
| 7 | MQ3b Display-Referenzen (Tipp 1) | PASS | 7/7 Tipp-Stufe-1 enthalten `[[mat-id|Anzeigetext]] (M#)` Markup. |
| 8 | Freischalt-Code | PASS | meta.json: "MARNE". 5 Buchstaben, A-Z, thematisch (Schlacht an der Marne). Identisch mit meta.json.freischalt_code. |
| 9 | Punkte-Summe | INFO | 7 × 10 = 70 Gesamtpunkte. |
| 10 | Encoding (v3.3) | PASS | Alle 7 JSONs: UTF-8 Umlaute, typographische Anfuehrungszeichen, Gedankenstrich U+2014. |

**Gesamt: PASS (0 FAIL, 0 WARN). Phase 2.2 abgeschlossen.**
