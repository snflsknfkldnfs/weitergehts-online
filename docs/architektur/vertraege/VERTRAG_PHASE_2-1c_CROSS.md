# Vertrag Phase 2.1c: Material-Cross-Konsistenz + Ueberleitung-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Erweitert:** 2026-04-02 (Q-M2-03 — Ueberleitung-Produktion als Achse 5)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (Subagenten-Isolation bleibt gewahrt) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Prueft das Zusammenspiel UND produziert Ueberleitungen.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | materialien/mat-N-*.json (alle) | titel, inhalt, ueberleitung_von, fachbegriffe, _meta.tafelbild_knoten_abgedeckt | Cross-Pruefung + Ueberleitung-Kontext |
| 2 | rahmen/tafelbild.json | knoten[], stundenfrage | TB-Gesamtabdeckung |
| 3 | MATERIAL_GERUEST | Sequenzreihenfolge, didaktische_funktion pro mat-ID, Ueberleitungen-Sektion | Soll-Ist-Vergleich + Ueberleitung-Intention |
| 4 | rahmen/einstieg.json | problemstellung | Leitfrage als Ueberleitung-Anker fuer mat-1 |

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, SUB_MATERIAL_*.md, aufgaben/*.json

## 5 Pruefachsen

### Achsen 1-4: Cross-Konsistenz (unveraendert)

1. **Sequenz-Kohaerenz:** Bilden die Materialien in Reihenfolge einen logischen Erkenntnisweg zum Tafelbild? FAIL wenn: Ein Material setzt einen Fachbegriff als bekannt voraus, der erst in einem spaeteren Material eingefuehrt wird.

2. **Fachbegriff-Konsistenz:** Wird ein Begriff in allen Materialien identisch verwendet? FAIL wenn: Derselbe Fachbegriff wird in zwei Materialien unterschiedlich definiert oder verwendet.

3. **Ueberleitung-Kohaerenz:** Passt die Ueberleitung-Intention aus MATERIAL_GERUEST zum tatsaechlichen Inhalt der produzierten Materialien? FAIL wenn: Die im GERUEST skizzierte Ueberleitung referenziert Inhalte, die im konkreten Material nicht vorkommen.

4. **TB-Knoten-Gesamtabdeckung:** Decken alle Materialien zusammen alle TB-Knoten ab? FAIL wenn: Ein TB-Knoten wird von keinem Material abgedeckt (binaer pruefbar).

### Achse 5: Ueberleitung-Produktion (NEU — Q-M2-03)

**Warum hier und nicht im SUB_MATERIAL:** Ueberleitungen erfordern Kontext ueber Material-Grenzen hinweg — der isolierte Subagent (P4) kennt nur sein eigenes Material. Phase 2.1c hat bereits ALLE Materialien + MATERIAL_GERUEST im Kontext. Das macht diesen Dispatch zum natuerlichen Ort fuer die Ueberleitung-Produktion.

**Didaktisches Modell — Zwei-Vektoren-Bruecke:**
Jede Ueberleitung hat zwei Vektoren:
- **Rueckwaerts:** Bisherigen Lernstand referenzieren — was haben die SuS gerade erfahren/erarbeitet? Kernerkenntnisgewinn des Vorgaenger-Materials benennen.
- **Vorwaerts:** Naechste Teilfragestellung plausibilisieren — warum ist das naechste Material jetzt relevant? Interesse wecken, Sinn der Erarbeitungsstruktur transparent machen.

Beide Vektoren muessen inhaltlich praezise auf die **konkreten produzierten Materialien** treffen (nicht auf die abstrakte GERUEST-Planung). Das GERUEST liefert die didaktische Intention, die fertigen mat-JSONs liefern den tatsaechlichen Referenzrahmen.

**Qualitaetskriterien pro Ueberleitung:**

| ID | Kriterium | Operationalisierung |
|---|---|---|
| UE-1 | Rueckwaerts-Vektor | Benennt konkret, was SuS aus dem Vorgaenger-Material gelernt/gesehen/erfahren haben. Kein generisches "Du hast viel gelernt". |
| UE-2 | Vorwaerts-Vektor | Macht die Relevanz des naechsten Materials plausibel. Weckt Neugier oder benennt eine offene Frage, die das naechste Material beantwortet. |
| UE-3 | Sprachregister R7 | Schuelernahe Sprache, max. 2 Saetze, keine Fachbegriffe die noch nicht eingefuehrt sind. |
| UE-4 | Kein Spoiler | Ueberleitung nimmt NICHT die Kernerkenntnis des naechsten Materials vorweg. |
| UE-5 | Sequenz-Passung | Ueberleitung passt zum tatsaechlichen Inhalt beider Materialien (nicht nur zum GERUEST-Plan). |

**Sonderfall mat-N-1 (Position 1):** Keine Ueberleitung (kein Vorgaenger). Die Problemstellung aus `rahmen/einstieg.json` uebernimmt diese Funktion.

## Dispatch-Ablauf

```
1. Alle materialien/mat-N-*.json lesen (P1)
2. rahmen/tafelbild.json lesen (P1)
3. MATERIAL_GERUEST lesen (P1) — inkl. Ueberleitungen-Sektion als Intentionsvorlage
4. rahmen/einstieg.json lesen (P1) — problemstellung als Kontext fuer mat-1
5. Achsen 1-4 durchfuehren (Cross-Konsistenz)
6. Achse 5: Pro Material-Uebergang (mat-N-1→mat-N-2, mat-N-2→mat-N-3, ...):
   a. GERUEST-Ueberleitung als Intention lesen
   b. Tatsaechlichen Inhalt beider Materialien analysieren
   c. Zwei-Vektoren-Bruecke formulieren (UE-1 bis UE-5 pruefen)
7. ueberleitungen.json schreiben (siehe Output)
8. Bei Achsen 1-4 PASS + Achse 5 produziert: Ergebnis in Q-GATE-LOG.md
9. Bei FAIL (Achsen 1-4): Betroffene Materialien + Finding dokumentieren
   → User entscheidet ueber Nachbesserung oder Akzeptanz
```

## Output

**Q-GATE-LOG.md:** Ergebnisse Achsen 1-5 (wie bisher, plus Achse 5 Bestaetigungseintrag).

**ueberleitungen.json** (NEU):

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

## Session-Split

**CHECKPOINT nach Phase 2.1c** (Audit S2 — Token-Budget-Mitigation). Neuer Dispatch-Kontext fuer Phase 2.2.
