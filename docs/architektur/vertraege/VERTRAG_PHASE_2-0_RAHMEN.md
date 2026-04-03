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
1. TAFELBILD_Mappe[N].md lesen → rahmen/hefteintrag.json schreiben (STRUKTUR-FREEZE).
   1-pre. S-Zone-Autonomie-Filter (v3.4, PFLICHT):
       situation.kontextsatz darf KEIN Vormappe-Wissen rekapitulieren. Er formuliert den
       thematischen Einstieg in die AKTUELLE Stundenfrage. Max 1 Satz, der direkt auf die
       Stundenfrage hinfuehrt, nicht zurueck auf vorherige Mappen.
       FAIL: "Buendnisse machen aus einem Mord einen Weltkrieg." (rekapituliert Mappe 1+2)
       PASS: "Im August 1914 brach der Erste Weltkrieg aus." (eigenstaendiger Einstieg)
   1-post. Knoten-Elaborierung pruefen (v3.5, PFLICHT):
       Jeder Knoten mit typ=kernbegriff oder typ=wirkung, dessen text einen Fachbegriff
       enthaelt, der NICHT im allgemeinen R7-Wortschatz liegt, MUSS ein merksatz-Feld haben
       (max 15 Woerter, erklaert den Begriff in schuelernaher Sprache).
       FAIL: k3-6 "Burgfrieden (SPD stimmt zu)" ohne merksatz — "Burgfrieden" kein R7-Wort.
       PASS: k3-6 mit merksatz: "Alle Parteien stellen Streit ein und stuetzen gemeinsam den Krieg."
       Pruefung: Jeden Knoten scannen → Fachbegriff ausserhalb R7? → merksatz vorhanden? Wenn nein → FAIL.
   1a. Schaubild-Integritaet pruefen (v2):
       - knoten[] ist PFLICHT und nicht leer. Jeder Knoten hat id, text (max 12 W.), typ.
       - verbindungen[] ist PFLICHT und nicht leer. Jede Verbindung hat von, nach, label (max 5 W.), typ.
       - ordnungsmuster ist eines der 6 empirischen Typen:
         parallel-kausal | sequenziell | kontrastierend | metaphorisch | relational | konzept-beispiel
       - Jeder SCPL-Complication-Schritt korrespondiert mit min. 1 Knoten.
   1a-post. Ordnungsmuster-Konsequenz (v3.4, PFLICHT):
       Das gewaehlte ordnungsmuster steuert die SCPL-Textstruktur:
       - parallel-kausal: Complication als parallele Ursachen. Problem/Loesung als gemeinsame Wirkung.
       - sequenziell: Complication als chronologische Schritte mit temporalen Verbindungen.
       - kontrastierend: Complication als Gegenueberstellung (Pol A vs. Pol B mit Wer/Warum).
         Problem als Synthese der Spannung. Loesung integriert beide Pole.
         Mindestens 1 Complication-Schritt MUSS als explizite Pol-Gegenueberstellung formuliert sein.
       - konzept-beispiel: Complication als Beispiel-Reihe unter Oberbegriff.
       - relational: Complication als Gruppen + Beziehungslinien.
       - metaphorisch: Complication als Metapher-Komponenten.
       FAIL wenn: ordnungsmuster="kontrastierend", aber Complication-Schritte sind linear/narrativ
       statt als Pol-Gegenueberstellung strukturiert.
   1b. Text-Dichte pruefen (v2 — Schaubild-Elaborierungs-Modell):
       - SCPL-Texte (situation.kontextsatz, complication[].schritt, problem.satz):
         Max 15 Woerter pro Einheit. Kompakt-Stil (Kurzphrase oder Kurzesatz), kein Fliesstext.
         Elaborierende Kurzesaetze nur wo sie eine Verbindung fuer R7-SuS explizieren,
         die ohne Explizierung nicht selbsttragend waere. Kein atmosphaerischer Prosa-Stil.
       - scpl.loesung[]: 1-3 Saetze, max 20 Woerter pro Satz.
         Darf elaborierter sein als TB-Kompaktform. Jeder Satz beantwortet einen Aspekt der Stundenfrage.
       - Knoten-Texte: Max 12 Woerter. Nominalstil oder Kurzphrase.
       - Verbindungs-Labels: Max 5 Woerter.
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
8. Q-Gate pruefen — Mechanik: docs/architektur/Q-GATE-MECHANIK.md (§3 Aggregation, §4 Nachbesserung, §6 Output-Format).
   Katalog: Q-GATE-MECHANIK.md §7.3 (Rahmen-Q-Gate).
   Zusaetzlich: HE14 (Schaubild-Charakter), HE15 (Ordnungsmuster-Treue), HE16 (Merksatz-Kalibrierung)
   aus GUETEKRITERIEN_HEFTEINTRAG_PRODUKT.md als Pre-Check.
9. Q-Gate-Ergebnis in Q-GATE-LOG.md schreiben (Format: Q-GATE-MECHANIK.md §8).
```

## Q-Gate

**Mechanik:** `docs/architektur/Q-GATE-MECHANIK.md` (Bewertungsstufen, Aggregation, Nachbesserung, Output-Format)
**Katalog:** Q-GATE-MECHANIK.md §7.3 — 6 Kriterien in 3 Klassen (SCHEMA, KONSISTENZ, FORM)

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

## JSON-Encoding-Regeln (v3.3)

**Umlaute:** Schreibe echte UTF-8-Umlaute (ä, ö, ü, ß). KEINE ASCII-Transliterationen (ae, oe, ue, ss).
**Typographische Zeichen:** Gedankenstrich als `—` (NICHT `--` oder `-`). Deutsche Anfuehrungszeichen als `„..."` oder `»...«`. Apostroph als `'` (NICHT `'`).
**Geltungsbereich:** Alle SuS-sichtbaren Textfelder in allen 4 Output-Dateien (hefteintrag.json, einstieg.json, sicherung.json, meta.json).

## Bekannte Limitationen

- quellenangaben[]: Engine hat keinen Renderer. Workaround: `<cite>` in Material-HTML (L6).
- Wenn kein separates TAFELBILD-Artefakt existiert (pre-v3 Games): SCPL-Daten aus MATERIAL_GERUEST + SKRIPT rekonstruieren.
