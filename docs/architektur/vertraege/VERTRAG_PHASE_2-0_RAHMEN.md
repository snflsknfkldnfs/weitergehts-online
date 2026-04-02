# Vertrag Phase 2.0: Rahmen-Produktion

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Dispatch, 4 Output-Dateien) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** Dies ist 1 Dispatch. Alle 4 Dateien werden in derselben Nachricht produziert.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | Zweck |
|---|---|---|---|
| 1 | TAFELBILD_Mappe[N].md (Phase 0.4) | Vollstaendig (STRUKTUR-FREEZE) | → rahmen/hefteintrag.json (1:1 Uebernahme) |
| 2 | MATERIAL_GERUEST (Einstieg-Sektion) | typ, narrativ, problemstellung | → rahmen/einstieg.json |
| 3 | MATERIAL_GERUEST (Sicherung-Sektion) | typ, reflexionsimpuls, hefteintrag_verweis, zitat | → rahmen/sicherung.json (Basis). **NICHT** zusammenfassung/ueberleitung — diese werden erst in Phase 2.1c Achse 6 produziert. |
| 4 | rahmen/hefteintrag.json (gerade geschrieben) | scpl.loesung[] (= Merksaetze/Merkbox-Inhalt) | Konsistenzpruefung: scpl.loesung[] muss mit Kernerkenntnissen des Tafelbilds uebereinstimmen |
| 5 | ORCHESTRATOR.md | Freischalt-Code-Regeln, data.json-Schema | → rahmen/meta.json |
| 6 | MATERIAL_GERUEST (Header) | titel, beschreibung | → rahmen/meta.json |

**NICHT lesen:** data.json (kein Goldstandard-Template), andere Mappen-Artefakte, WORKFLOW_v4.md (dieser Vertrag genuegt)

## Dispatch-Ablauf

```
1. TAFELBILD_Mappe[N].md lesen → rahmen/hefteintrag.json schreiben (1:1, STRUKTUR-FREEZE)
2. MATERIAL_GERUEST Einstieg-Sektion lesen → rahmen/einstieg.json schreiben
3. MATERIAL_GERUEST Sicherung-Sektion lesen
4. rahmen/hefteintrag.json lesen → scpl.loesung[] extrahieren (Konsistenzpruefung: stimmen Kernerkenntnisse?)
5. rahmen/sicherung.json schreiben (reflexionsimpuls, hefteintrag_verweis, zitat).
   zusammenfassung := "[REVISION IN 2.1c]" (Placeholder — finale Produktion in Phase 2.1c Achse 6).
   ueberleitung := "[REVISION IN 2.1c]" (Placeholder — finale Produktion in Phase 2.1c Achse 6).
   KEIN kernerkenntnisse[]-Feld — Kernerkenntnisse leben ausschliesslich in hefteintrag.scpl.loesung[] (M8).
6. ORCHESTRATOR + MATERIAL_GERUEST Header lesen → rahmen/meta.json schreiben
6b. NUR WENN SKRIPT-Chunk oder INHALTSBASIS ein historisches Schlusszitat enthaelt:
    sicherung.zitat-Objekt {text, urheber, kontext} in rahmen/sicherung.json ergaenzen.
7. C1b-Identitaetsregel pruefen:
   einstieg.problemstellung === hefteintrag.stundenfrage
   Bei Abweichung: Stundenfrage aus hefteintrag.json hat Vorrang.
8. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben.
```

## Q-Gate

- C1b: einstieg.problemstellung === hefteintrag.stundenfrage
- M3b: hefteintrag.scpl.loesung[] enthaelt die Kernerkenntnisse (identisch mit TAFELBILD-Entwurf, nicht paraphrasiert)
- Alle Engine-gerenderten Felder vorhanden: reflexionsimpuls, hefteintrag_verweis. zusammenfassung und ueberleitung als Placeholder "[REVISION IN 2.1c]" gesetzt (finale Produktion in Phase 2.1c Achse 6). Kernerkenntnisse werden via hefteintrag.scpl.loesung[] gerendert (NICHT als separates Feld in sicherung.json).
- **Q-M2-09 Disjunktionsregel:** sicherung.reflexionsimpuls und hefteintrag.scpl.loesung[] muessen inhaltlich disjunkt sein. Der reflexionsimpuls darf KEINEN Text enthalten, der bereits in scpl.loesung[] vorkommt. scpl.loesung[] = Was wurde gelernt (Fakten). Reflexionsimpuls = Weiterdenken/Transfer/Bewertung (Metakognition). Pruefung: Kein Satz aus reflexionsimpuls darf eine Paraphrase eines scpl.loesung[]-Eintrags sein.
- **Q-M2-08 Quellenangabe-Hygiene:** Alle SuS-sichtbaren Texte (zusammenfassung, ueberleitung, reflexionsimpuls, etc.) duerfen KEINE internen Artefakt-Namen enthalten (INHALTSBASIS, SKRIPT, TAFELBILD, MATERIAL_GERUEST, PROGRESSIONSPLAN, SUB_MATERIAL_*, AGENT_*).

## Output

**Schema-Referenzen:** Alle Output-Dateien MUESSEN gegen ihr jeweiliges Schema validieren.

```
rahmen/
  hefteintrag.json   → docs/architektur/schemata/hefteintrag-schema.json
  einstieg.json      → docs/architektur/schemata/rahmen-einstieg-schema.json
  sicherung.json     → docs/architektur/schemata/rahmen-sicherung-schema.json
  meta.json          # id, titel, beschreibung, freischalt_code (kein separates Schema)
```

**Validierung:** Nach Produktion aller 4 Dateien: Schema-Validierung durchfuehren BEVOR Q-Gate.

## Bekannte Limitationen

- quellenangaben[]: Engine hat keinen Renderer. Workaround: `<cite>` in Material-HTML (L6).
- Wenn kein separates TAFELBILD-Artefakt existiert (pre-v3 Games): SCPL-Daten aus MATERIAL_GERUEST + SKRIPT rekonstruieren.
