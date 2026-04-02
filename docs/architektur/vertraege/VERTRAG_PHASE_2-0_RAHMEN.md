# Vertrag Phase 2.0: Rahmen-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Dispatch, 4 Output-Dateien) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Dies ist 1 Dispatch. Alle 4 Dateien werden in derselben Nachricht produziert.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | TAFELBILD_Mappe[N].md (Phase 0.4) | Vollstaendig (TB-FREEZE) | → rahmen/tafelbild.json (1:1 Uebernahme) |
| 2 | MATERIAL_GERUEST (Einstieg-Sektion) | typ, narrativ, problemstellung | → rahmen/einstieg.json |
| 3 | MATERIAL_GERUEST (Sicherung-Sektion) | typ, zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis, zitat | → rahmen/sicherung.json (Basis) |
| 4 | rahmen/tafelbild.json (gerade geschrieben) | scpl.loesung[] (= Merksaetze/Merkbox-Inhalt) | → sicherung.kernerkenntnisse[] (M3b) |
| 5 | ORCHESTRATOR.md | Freischalt-Code-Regeln, data.json-Schema | → rahmen/meta.json |
| 6 | MATERIAL_GERUEST (Header) | titel, beschreibung | → rahmen/meta.json |

**NICHT lesen:** data.json (kein Goldstandard-Template), andere Mappen-Artefakte, WORKFLOW_v4.md (dieser Vertrag genuegt)

## Dispatch-Ablauf

```
1. TAFELBILD_Mappe[N].md lesen → rahmen/tafelbild.json schreiben (1:1, TB-FREEZE)
2. MATERIAL_GERUEST Einstieg-Sektion lesen → rahmen/einstieg.json schreiben
3. MATERIAL_GERUEST Sicherung-Sektion lesen
4. rahmen/tafelbild.json lesen → scpl.loesung[] extrahieren
5. sicherung.kernerkenntnisse[] := tafelbild.scpl.loesung[] (M3b-Constraint)
6. rahmen/sicherung.json schreiben (inkl. kernerkenntnisse aus Schritt 5)
7. ORCHESTRATOR + MATERIAL_GERUEST Header lesen → rahmen/meta.json schreiben
7b. NUR WENN SKRIPT-Chunk oder INHALTSBASIS ein historisches Schlusszitat enthaelt:
    sicherung.zitat-Objekt {text, urheber, kontext} in rahmen/sicherung.json ergaenzen.
8. C1b-Identitaetsregel pruefen:
   einstieg.problemstellung === tafelbild.stundenfrage
   Bei Abweichung: Stundenfrage aus tafelbild.json hat Vorrang.
9. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben.
```

## Q-Gate

- C1b: einstieg.problemstellung === tafelbild.stundenfrage
- M3b: sicherung.kernerkenntnisse[] === tafelbild.scpl.loesung[] (identisch, nicht paraphrasiert)
- Alle Engine-gerenderten Felder vorhanden: zusammenfassung, ueberleitung, kernerkenntnisse[], reflexionsimpuls, hefteintrag_verweis
- **Q-M2-09 Disjunktionsregel:** sicherung.reflexionsimpuls und sicherung.kernerkenntnisse[] muessen inhaltlich disjunkt sein. Der reflexionsimpuls darf KEINEN Text enthalten, der bereits in kernerkenntnisse[] vorkommt. Kernerkenntnisse = Was wurde gelernt (Fakten). Reflexionsimpuls = Weiterdenken/Transfer/Bewertung (Metakognition). Pruefung: Kein Satz aus reflexionsimpuls darf eine Paraphrase eines kernerkenntnisse-Eintrags sein.
- **Q-M2-08 Quellenangabe-Hygiene:** Alle SuS-sichtbaren Texte (zusammenfassung, ueberleitung, reflexionsimpuls, etc.) duerfen KEINE internen Artefakt-Namen enthalten (INHALTSBASIS, SKRIPT, TAFELBILD, MATERIAL_GERUEST, PROGRESSIONSPLAN, SUB_MATERIAL_*, AGENT_*).

## Output

```
rahmen/
  tafelbild.json   # knoten[], verbindungen[], voraussetzungen[], stundenfrage, ordnungsmuster, scpl{}, transfer{}
  einstieg.json    # narrativ (HTML), problemstellung
  sicherung.json   # kernerkenntnisse[], zusammenfassung, ueberleitung, reflexionsimpuls, hefteintrag_verweis, zitat{}
  meta.json        # id, titel, beschreibung, freischalt_code
```

## Bekannte Limitationen

- quellenangaben[]: Engine hat keinen Renderer. Workaround: `<cite>` in Material-HTML (L6).
- Wenn kein separates TAFELBILD-Artefakt existiert (pre-v3 Games): SCPL-Daten aus MATERIAL_GERUEST + SKRIPT rekonstruieren.
