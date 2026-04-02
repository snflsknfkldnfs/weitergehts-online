# Trockenlauf: Q-Gate-Mechanik auf mat-2-1 + mat-2-4

**Datum:** 2026-04-02
**Zweck:** Verifikation C+ Schritt 2 — Ist das formalisierte Q-Gate deterministisch anwendbar?
**Methode:** Manuelle Bewertung anhand Q-GATE-MECHANIK.md §7.1

---

## mat-2-1 (darstellungstext: "Warum schwelte es auf dem Balkan?")

```json
{
  "artefakt_id": "mat-2-1",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-02",
  "gesamt": "FAIL",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "FAIL",
      "detail": "5 Fehler: voraussetzung[0-2] nutzt TB-Knoten-IDs statt mat-IDs (Legacy-Format). sequenz_kontext ist Prosa-String statt {vorher, nachher}-Objekt. _meta als additionalProperty. Bekanntes Legacy-Format Mappe 2."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Stundenfrage 'Wie konnte ein einziger Mord einen Weltkrieg ausloesen?' — Material erklaert Attentat + Ausloeser-vs-Ursache-Unterscheidung. Direkter Beitrag."
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A/B)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel (Typ A). Korrekt fuer Erarbeitungs-Material."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Annexion 1908, Balkankriege 1912/13, Attentat 28.6.1914 korrekt. Ausloeser-vs-Ursache-Unterscheidung fachlich einwandfrei."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "148 Woerter. 3 Fachbegriffe (Annexion, Attentat, Ausloeser vs. Ursache). Alle beim ersten Auftreten erklaert. Kurze Saetze."
    },
    {
      "id": "M3",
      "name": "Elementarisierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Drei Kerngedanken: Balkankrise, Attentat, Ausloeser vs. Ursache. Keine Nebenstraenge."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k2-6 (Balkankrise): Annexion+Balkankriege. k2-1 (Attentat): Princip, Datum, Opfer. k2-2 (Ausloeser vs. Ursache): Explizit definiert."
    },
    {
      "id": "M5",
      "name": "Aktivierung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Rhetorische Frage 'Doch warum fuehrt ein Mord zu einem Weltkrieg?' als aktivierendes Element. Pulverfass-Metapher als Bruecke."
    },
    {
      "id": "C6/MQ6",
      "name": "Erarbeitbarkeits-Plausibilitaet",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "_meta.erarbeitbarkeits_check: PASS. Alle 3 TB-Knoten erarbeitbar (nicht nur erwaehnt)."
    },
    {
      "id": "M8",
      "name": "Quellenorientierung",
      "klasse": "INHALT",
      "stufe": "WARN",
      "detail": "cite-Element vorhanden ('Eigene Darstellung auf Basis der Sachanalyse'). Aber: Referenziert 'INHALTSBASIS' — internes Artefakt-Name in SuS-sichtbarem Text. Ueberschneidung mit Q-M2-08."
    },
    {
      "id": "M10",
      "name": "Sprachsensibilitaet",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Annexion kontextualisiert ('dem eigenen Staat einverleibt'). Attentat definiert ('ein politisch geplanter Mordanschlag')."
    },
    {
      "id": "DT-1",
      "name": "Narrative Kohaerenz",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Chronologischer Aufbau: Balkankrise → Attentat → Analyse (Ausloeser vs. Ursache). Roter Faden erkennbar."
    },
    {
      "id": "DT-2",
      "name": "Vergegenwaertigung",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "Personifizierung (Princip, 19-jaehrig). Lokalisierung (Sarajevo, Balkan). Dramatisierung ('erschiesst')."
    },
    {
      "id": "DT-4",
      "name": "Sprachregister R7",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Kurze Saetze, aktive Formulierungen, keine Schachtelsaetze."
    },
    {
      "id": "DT-5",
      "name": "Textlaenge",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "148 Woerter (Limit: 150). Innerhalb Grenze."
    }
  ],
  "nachbesserung": null,
  "finding": "SCHEMA-01 FAIL ist bekanntes Legacy-Format (Mappe 2). Kein Nachbesserungsbedarf — Schema definiert Zielformat fuer Mappe 3+. WARN M8: INHALTSBASIS in cite-Element — Q-M2-08-Verstoss."
}
```

**Gesamt nach §3:** FAIL (1 FAIL). Bei Korrektur der Legacy-Felder: WARN (1 WARN bei M8).

---

## mat-2-4 (quellentext: "Was forderte Oesterreich-Ungarn von Serbien?")

```json
{
  "artefakt_id": "mat-2-4",
  "artefakt_typ": "material",
  "phase": "2.1",
  "datum": "2026-04-02",
  "gesamt": "FAIL",
  "kriterien": [
    {
      "id": "SCHEMA-01",
      "name": "Schema-Validierung",
      "klasse": "SCHEMA",
      "stufe": "FAIL",
      "detail": "4 Fehler: voraussetzung[0-1] nutzt TB-Knoten-IDs + Annotationen statt mat-IDs. sequenz_kontext ist Prosa-String statt {vorher, nachher}-Objekt. _meta als additionalProperty."
    },
    {
      "id": "MQ1",
      "name": "Stundenfrage-Bezug",
      "klasse": "KONSISTENZ",
      "stufe": "PASS",
      "detail": "Stundenfrage 'Wie konnte ein einziger Mord einen Weltkrieg ausloesen?' — Material zeigt den Eskalationsmechanismus (Blankoscheck, Ultimatum). Direkter Beitrag."
    },
    {
      "id": "MQ2",
      "name": "Titel (Typ A/B)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "Frage-Titel (Typ A). Korrekt."
    },
    {
      "id": "M1",
      "name": "Sachgemaessheit",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Blankoscheck, Ultimatum 23.7.1914, 48-Stunden-Frist korrekt. Forderungen vereinfacht aber nicht verfaelscht."
    },
    {
      "id": "M2",
      "name": "Adressatengemaessheit (R7)",
      "klasse": "FORM",
      "stufe": "PASS",
      "detail": "82 Woerter. 2 Fachbegriffe (Blankoscheck, Ultimatum). Beide kontextuell erklaert."
    },
    {
      "id": "M4",
      "name": "Zielklarheit (TB-Knoten-Kongruenz)",
      "klasse": "DIDAKTIK",
      "stufe": "PASS",
      "detail": "k2-3 (Julikrise): Ultimatum als Eskalation. k2-4 (Blankoscheck): Explizit in Einleitung."
    },
    {
      "id": "QT-4",
      "name": "Dreischritt",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Einleitung (quellentext__einleitung) → Wortlaut (blockquote) → Nachweis (quellentext__nachweis). Alle 3 Teile vorhanden."
    },
    {
      "id": "QT-5",
      "name": "Quellenkritische Rahmung",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "Verfasser (Oesterreich-Ungarn), Adressat (Serbien), Zeit (23.7.1914), Gattung (Ultimatum). 4/4 Minimum-Felder."
    },
    {
      "id": "QT-6",
      "name": "Bearbeitungshilfen",
      "klasse": "INHALT",
      "stufe": "PASS",
      "detail": "_meta.quellenkritische_impulse enthaelt 2 Erschliessungsfragen."
    }
  ],
  "nachbesserung": null,
  "finding": "SCHEMA-01 FAIL ist bekanntes Legacy-Format (Mappe 2). Bei Korrektur der Legacy-Felder: GESAMT-PASS (0 FAIL, 0 WARN)."
}
```

**Gesamt nach §3:** FAIL (1 FAIL). Bei Korrektur der Legacy-Felder: PASS.

---

## Trockenlauf-Fazit

1. **Q-Gate-Mechanik ist deterministisch anwendbar.** Jedes Kriterium produziert eine eindeutige Stufe (PASS/WARN/FAIL). Aggregationsregel liefert eindeutiges Gesamturteil.
2. **SCHEMA-Klasse faengt Legacy-Probleme zuverlaessig ab.** Die 3 bekannten Legacy-Abweichungen (voraussetzung, sequenz_kontext, _meta) sind Schema-FAIL — werden bei Mappe 3 durch korrekte Produktion vermieden.
3. **WARN-Stufe funktioniert.** mat-2-1/M8 ist ein echter Grenzfall: cite-Element mit internem Artefakt-Namen. WARN (nicht FAIL) weil Quellenangabe funktional vorhanden, aber Q-M2-08-Verstoss als Nebeneffekt.
4. **Kriterien-Abdeckung ausreichend.** Keine Situation wo die Bewertung unklar blieb. Alle FAIL-Bedingungen aus §7.1 Stufe-Semantik waren operationalisierbar.
5. **Konsistenz mit bestehendem Q-GATE-LOG.md:** Die Mappe-2-Produktion hatte PASS (6/6). Unser Trockenlauf findet ebenfalls keine Inhalts-FAILs — nur Schema-FAILs (Legacy-Format, damals kein Schema vorhanden). Konsistent.
