# Vertrag Phase 2.1c: Material-Cross-Konsistenz + Ueberleitung-Produktion + Hefteintrag-Revision

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Erweitert:** 2026-04-02 (Q-M2-03 — Achse 5 Ueberleitungen, M2 — Achse 6 Hefteintrag-Revision)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (Subagenten-Isolation bleibt gewahrt) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Prueft Zusammenspiel, produziert Ueberleitungen, revidiert Hefteintrag.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Schema | Gelesene Felder | Zweck |
|---|---|---|---|---|
| 1 | materialien/mat-N-*.json (alle) | material-output-schema.json | titel, inhalt, ueberleitung_von, sequenz_kontext, _meta.tafelbild_knoten_abgedeckt | Cross-Pruefung + Ueberleitung-Kontext |
| 2 | rahmen/hefteintrag.json | hefteintrag-schema.json | knoten[], stundenfrage, scpl (alle Zonen) | TB-Gesamtabdeckung + SCPL-Kontext fuer Achse 6 |
| 3 | MATERIAL_GERUEST | — | Sequenzreihenfolge, didaktische_funktion pro mat-ID, Ueberleitungen-Sektion | Soll-Ist-Vergleich + Ueberleitung-Intention |
| 4 | rahmen/einstieg.json | rahmen-einstieg-schema.json | problemstellung | Leitfrage als Ueberleitung-Anker fuer mat-1 |
| 5 | rahmen/sicherung.json + rahmen/hefteintrag.json | rahmen-sicherung-schema.json + hefteintrag-schema.json | reflexionsimpuls, hefteintrag_verweis (aus sicherung) + scpl.loesung[] (aus hefteintrag, = Kernerkenntnisse) | Stufe-1-Felder fuer Achse 6 Kontext + Q-M2-09 Disjunktionspruefung |

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, SUB_MATERIAL_*.md, aufgaben/*.json

## 7 Achsen

### Achsen 1-5: Cross-Konsistenz

1. **Sequenz-Kohaerenz:** Bilden die Materialien in Reihenfolge einen logischen Erkenntnisweg zum Tafelbild? FAIL wenn: Ein Material setzt einen Fachbegriff als bekannt voraus, der erst in einem spaeteren Material eingefuehrt wird.

2. **Fachbegriff-Konsistenz:** Wird ein Begriff in allen Materialien identisch verwendet? FAIL wenn: Derselbe Fachbegriff wird in zwei Materialien unterschiedlich definiert oder verwendet.

3. **Ueberleitung-Kohaerenz:** Passt die Ueberleitung-Intention aus MATERIAL_GERUEST zum tatsaechlichen Inhalt der produzierten Materialien? FAIL wenn: Die im GERUEST skizzierte Ueberleitung referenziert Inhalte, die im konkreten Material nicht vorkommen.

4. **TB-Knoten-Gesamtabdeckung:** Decken alle Materialien zusammen alle TB-Knoten ab? FAIL wenn: Ein TB-Knoten wird von keinem Material abgedeckt (binaer pruefbar).

5. **Perspektiven-Diversitaet (STR-05, AU-4):** NUR bei `konflikttyp: true` im MATERIAL_GERUEST. Prueft: Sind mindestens 3 der in `perspektiven_policy` deklarierten Perspektiven ueber die Materialien der Mappe verteilt? Auswertung ueber `_meta.perspektive` der einzelnen Materialien. FAIL wenn: Weniger als 2 verschiedene Perspektiven. WARN wenn: Nur 2 von mindestens 3 deklarierten Perspektiven vertreten — Finding dokumentieren + Fallback-Option pruefen (Darstellungstext mit expliziter Perspektiv-Benennung als Ersatz). SKIP wenn: `konflikttyp: false` oder absent.

### Achse 6: Ueberleitung-Produktion (Q-M2-03, vormals Achse 5)

**Warum hier und nicht im SUB_MATERIAL:** Ueberleitungen erfordern Kontext ueber Material-Grenzen hinweg — der isolierte Subagent (P4) kennt nur sein eigenes Material. Phase 2.1c hat bereits ALLE Materialien + MATERIAL_GERUEST im Kontext. Das macht diesen Dispatch zum natuerlichen Ort fuer die Ueberleitung-Produktion.

**Didaktisches Modell — Zwei-Vektoren-Bruecke:**
Jede Ueberleitung hat zwei Vektoren:
- **Rueckwaerts:** Bisherigen Lernstand referenzieren — was haben die SuS gerade erfahren/erarbeitet? Kernerkenntnisgewinn des Vorgaenger-Materials benennen.
- **Vorwaerts:** Naechste Teilfragestellung plausibilisieren — warum ist das naechste Material jetzt relevant? Interesse wecken, Sinn der Erarbeitungsstruktur transparent machen.

Beide Vektoren muessen inhaltlich praezise auf die **konkreten produzierten Materialien** treffen (nicht auf die abstrakte GERUEST-Planung). Das GERUEST liefert die didaktische Intention, die fertigen mat-JSONs liefern den tatsaechlichen Referenzrahmen.

**Qualitaetskriterien pro Ueberleitung:**

| ID | Kriterium | Operationalisierung |
|---|---|---|
| UE-1 | Rueckwaerts-Vektor | Benennt konkret, was SuS aus dem Vorgaenger-Material gelernt/gesehen/erfahren haben. Kein generisches "Du hast viel gelernt". Direkte Du-Ansprache bevorzugt (siehe UE-6). |
| UE-2 | Vorwaerts-Vektor | Macht die Relevanz des naechsten Materials plausibel. Weckt Neugier oder benennt eine offene Frage, die das naechste Material aufgreift. Die Ueberleitung stellt die FRAGE — das Material liefert die ANTWORT. |
| UE-3 | Sprachregister R7 | Schuelernahe Sprache, max. 2 Saetze, keine Fachbegriffe die noch nicht eingefuehrt sind. Keine didaktischen Metakommentare ("macht die Perspektiven erlebbar", "vertieft das Verstaendnis"). Stattdessen: direkte Ankuendigung ("Wie hat sich das angefuehlt? Zwei Menschen erzaehlen."). Klingt wie Moderation, nicht wie Lehrerhandreichung. |
| UE-4 | Kein Spoiler | Ueberleitung nimmt NICHT die Kernerkenntnis des naechsten Materials vorweg. Keine Sachverhalte entfalten, die das Folge-Material selbst erarbeiten soll. Die Grenze: Rueckbezug auf bereits Erarbeitetes = erlaubt. Vorgriff auf noch nicht Erarbeitetes = verboten. |
| UE-5 | Sequenz-Passung | Ueberleitung passt zum tatsaechlichen Inhalt beider Materialien (nicht nur zum GERUEST-Plan). |
| UE-6 | Du-Ansprache (v3.9) | Ueberleitungen sprechen den Lernenden direkt an. Der Rueckwaerts-Vektor referenziert die Material-Erfahrung als persoenlichen Lernakt: "Im Tagebuch des Soldaten hast du erfahren, dass...", "Die Karte hat dir gezeigt, dass...", "Du hast gesehen, wie...". Vermeidet passive Nacherzaehlung ("Der Text beschrieb...") und abstrakte Dritte-Person-Formulierungen ("Die Schueler erarbeiten..."). Die Du-Ansprache macht den Lernprozess explizit und verbindet Material-Evidenz mit persoenlicher Erkenntnis. |
| UE-R1 | Funktions-Abgrenzung (v3.9) | Materialien stehen fuer sich — sie liefern Evidenz (Quellen, Bilder, Daten). Ueberleitungen operieren auf einer anderen Ebene: Sie leisten die didaktische Einbettung in den Gesamtzusammenhang. Je staerker Materialien nicht-textbasiert sind (Bildquellen, Karten, Statistiken), desto wichtiger wird die Ueberleitung als narratives Bindeglied. Die Ueberleitung darf daher NICHT gekuerzt werden, um Textvolumen zu sparen — ihre Funktion ist nicht redundant zum Material, sondern komplementaer. FAIL wenn: Ueberleitung entfaellt oder auf unter 1 Satz gekuerzt wird. |

**Sonderfall mat-N-1 (Position 1):** Keine Ueberleitung (kein Vorgaenger). Die Problemstellung aus `rahmen/einstieg.json` uebernimmt diese Funktion.

### Achse 7: Hefteintrag-Revision (M2, Audit Sicherungskette, vormals Achse 6)

**Warum hier:** Phase 2.1c hat bereits ALLE Materialien im Kontext. Die SCPL-Texte aus Phase 0.4 wurden vor Material-Produktion formuliert und koennen jetzt auf konkreten Material-Kontext angepasst werden. Zusaetzlich werden zusammenfassung und ueberleitung erstmalig produziert (in Phase 2.0 nur als Placeholder angelegt).

**Regelwerk: Erlaubt vs. Verboten (PF-8)**

**ERLAUBT (Formulierungs-Revision):**
- `situation.kontextsatz`: Formulierung anpassen, um auf konkretes Material-Erlebnis Bezug zu nehmen
- `complication[].schritt` (Saetze): Sprachliche Verfeinerung, Fachbegriffe im Material-Kontext verwenden
- `problem.satz`: Formulierung an Material-Erfahrung anpassen
- `zusammenfassung` (NEU): Erstmalige Produktion mit Material-Kontext. Synthese des Erarbeitungsprozesses, nicht abstrakte Inhaltswiedergabe. Soll G10 (Rekapitulierbarkeit) erfuellen.
- `ueberleitung` (Mappe-zu-Mappe, NEU): Erstmalige Produktion mit Material-Kontext

**VERBOTEN (Struktur-Aenderung — STRUKTUR-FREEZE):**
- SCPL-Zonen hinzufuegen oder entfernen
- Complication-Schritte hinzufuegen, entfernen oder umordnen
- Ordnungsmuster aendern
- Kernerkenntnisse / Merksaetze (scpl.loesung[]) inhaltlich aendern
- Fachbegriffe hinzufuegen oder entfernen
- Stundenfrage aendern

**Grenzfaelle:**
- Complication-Schritt von 2 Saetzen auf 1 kuerzen: ERLAUBT (Formulierung)
- Fachbegriff durch Synonym ersetzen: VERBOTEN (Fachbegriff-Aenderung)
- "Annexion" → "gewaltsame Eingliederung — Annexion": ERLAUBT (Erklaerungskontext, Fachbegriff bleibt)

**Dokumentationspflicht:** Pro Aenderung: "SCPL-Schritt X: Formulierung geaendert von [...] zu [...]. Begruendung: Material Y liefert konkreten Kontext."

**Stufe-2 Re-Evaluation (M1b):** Nach der Formulierungs-Revision werden G3, G5, G10, G12, G14 gegen die produzierten Materialien re-evaluiert (siehe GUETEKRITERIEN_HEFTEINTRAG_ENTWURF.md, Sektion 10). Bei FAIL: Nachbesserung der FORMULIERUNGS-OFFEN-Felder.

**Produktqualitaet-Pruefung (HE1-HE13):** Nach der Stufe-2 Re-Evaluation wird der revidierte Hefteintrag gegen HE1-HE13 geprueft (siehe GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md). Reihenfolge: Erst Stufe-2, dann HE-Pruefung — HE operiert auf dem revidierten Text.

**Q-M2-09 Disjunktionsregel** gilt weiterhin: reflexionsimpuls und hefteintrag.scpl.loesung[] muessen inhaltlich disjunkt bleiben.
**Q-M2-08 Quellenangabe-Hygiene** gilt weiterhin: Keine internen Artefakt-Namen in SuS-sichtbaren Texten.

## Dispatch-Ablauf

```
1. Alle materialien/mat-N-*.json lesen (P1)
2. rahmen/hefteintrag.json lesen (P1)
3. MATERIAL_GERUEST lesen (P1) — inkl. Ueberleitungen-Sektion als Intentionsvorlage
4. rahmen/einstieg.json lesen (P1) — problemstellung als Kontext fuer mat-1
5. rahmen/sicherung.json lesen (P1) — Stufe-1-Felder (reflexionsimpuls, hefteintrag_verweis). Kernerkenntnisse aus rahmen/hefteintrag.json → scpl.loesung[] (M8)
6. Achsen 1-4 durchfuehren (Cross-Konsistenz)
6b. Achse 5 (Perspektiven-Diversitaet): NUR bei konflikttyp: true.
    _meta.perspektive aller Materialien sammeln → gegen perspektiven_policy pruefen.
7. Achse 6: Pro Material-Uebergang (mat-N-1→mat-N-2, mat-N-2→mat-N-3, ...):
   a. GERUEST-Ueberleitung als Intention lesen
   b. Tatsaechlichen Inhalt beider Materialien analysieren
   c. Zwei-Vektoren-Bruecke formulieren (UE-1 bis UE-5 pruefen)
8. ueberleitungen.json schreiben (siehe Output)
9. Achse 7: Hefteintrag-Revision
   a. SCPL-Texte aus hefteintrag.json gegen Materialien abgleichen
   b. FORMULIERUNGS-OFFEN-Felder revidieren (Regelwerk beachten)
   c. zusammenfassung erstmalig produzieren (material-aware, G10)
   d. ueberleitung (Mappe-zu-Mappe) erstmalig produzieren
   e. Stufe-2 Re-Evaluation (G3, G5, G10, G12, G14)
   f. Aenderungs-Dokumentation erstellen
10. rahmen/sicherung.json aktualisieren (zusammenfassung, ueberleitung ergaenzen)
11. rahmen/hefteintrag.json SCPL-Text-Patches schreiben (NUR Formulierung, NICHT Struktur)
12. Q-Gate pruefen — Mechanik: docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format).
    Katalog: Q-GATE-MECHANIK.md §7.4 (Cross-Konsistenz-Q-Gate).
13. Bei GESAMT-PASS oder GESAMT-WARN + Achse 5 geprueft + Achse 6 produziert + Achse 7 revidiert: Ergebnis in Q-GATE-LOG.md
14. Bei GESAMT-FAIL (Achsen 1-4): Betroffene Materialien + Finding dokumentieren
    → User entscheidet ueber Nachbesserung oder Akzeptanz
```

## Output

**Q-GATE-LOG.md:** Ergebnisse Achsen 1-7 (Cross-Konsistenz + Perspektiven-Diversitaet + Ueberleitungen + Hefteintrag-Revision + Stufe-2 Re-Evaluation). Format: Q-GATE-MECHANIK.md §8.

**ueberleitungen.json:** (Schema: `docs/architektur/schemata/ueberleitungen-schema.json`)

```json
{
  "mappe": "N",
  "ueberleitungen": [
    {
      "von": "mat-N-1",
      "nach": "mat-N-2",
      "text": "[Zwei-Vektoren-Bruecke: Rueckwaerts + Vorwaerts]"
    },
    {
      "von": "mat-N-2",
      "nach": "mat-N-3",
      "text": "[Zwei-Vektoren-Bruecke: Rueckwaerts + Vorwaerts]"
    }
  ]
}
```

Ablage: `docs/agents/artefakte/produktion/[game-id]/mappe-[N]/ueberleitungen.json`

**Assembly-Integration:** Phase 3 (Claude Code) liest `ueberleitungen.json` und setzt `ueberleitung_von` in jedem Material-Objekt der data.json auf den zugehoerigen `text`-Wert (statt der bisherigen Material-ID). Fuer mat-N-1 (Position 1) bleibt `ueberleitung_von` leer/null.

**rahmen/sicherung.json (aktualisiert):** zusammenfassung und ueberleitung werden ergaenzt (waren in Phase 2.0 als Placeholder angelegt).

**rahmen/hefteintrag.json (SCPL-Text-Patches):** NUR FORMULIERUNGS-OFFEN-Felder werden aktualisiert (situation.kontextsatz, complication[].schritt, problem.satz). STRUKTUR-FREEZE-Felder bleiben unangetastet. Aenderungs-Dokumentation im Q-GATE-LOG.md.

## JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ä, ö, ü, ß). KEINE ASCII-Transliterationen (ae, oe, ue, ss).
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`).
**Geltungsbereich:** Alle SuS-sichtbaren Textfelder: Ueberleitungstexte, zusammenfassung, ueberleitung (Mappe-zu-Mappe), SCPL-Formulierungspatches.

## Session-Split

**CHECKPOINT nach Phase 2.1c** (Audit S2 — Token-Budget-Mitigation). Neuer Dispatch-Kontext fuer Phase 2.2.
