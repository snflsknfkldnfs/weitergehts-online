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
