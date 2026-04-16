# Q-Gate-Log: Mappe 2

## Phase 2.0 (Rahmen-Produktion)

**Datum:** 2026-04-10
**Vertrag:** VERTRAG_PHASE_2-0_RAHMEN.md
**Katalog:** Q-GATE-MECHANIK.md §7.3

### Einzelbewertung

| # | ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|---|
| 1 | SCHEMA-03 | Schema-Validierung | PASS | Alle 5 Rahmen-Dateien JSON-valide; hefteintrag/einstieg/sicherung-Schemata required-Felder vorhanden. |
| 2 | C1b | Stundenfrage-Identität | PASS | einstieg.problemstellung === hefteintrag.stundenfrage === "Was bedeutete der Krieg für die Menschen zuhause?" |
| 3 | M3b | Kernerkenntnisse-Identität | PASS | scpl.loesung[] 3/3 wörtlich identisch mit TAFELBILD_Mappe2 Kernerkenntnissen. |
| 4 | M8 | Kernerkenntnisse-Isolation | PASS | Kernerkenntnisse NUR in hefteintrag.scpl.loesung[]; kein kernerkenntnisse-Feld in sicherung.json. |
| 5 | Q-M2-09 | Disjunktionsregel | PASS | reflexionsimpuls (normative Transfer-Frage: "Pflicht oder Verrat?") ist keine Paraphrase eines loesung-Eintrags. |
| 6 | Q-M2-08 | Quellenangabe-Hygiene | PASS | Keine internen Artefaktnamen (SKRIPT, TAFELBILD, MATERIAL_GERUEST, SUB_*) in SuS-sichtbaren Texten. |
| 7 | Q-M2-DEFERRED | Deferred-Marker | PASS | sicherung.zusammenfassung und sicherung.ueberleitung exakt "[REVISION IN 2.1c]". |
| 8 | TYP-01-R | Typographische Korrektheit | PASS | UTF-8 Umlaute, Gedankenstriche (—), korrekte Ziffern. |
| 9 | REG-01 | Sprachregister R7 | PASS | Einstiegsnarrativ schülernah, keine didaktischen Metakommentare. |

### Pre-Checks (HE14–HE16)

| ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|
| HE14 | Schaubild-Charakter | PASS | 6 Knoten + 6 Verbindungen; Nominalstil/Kurzphrasen, kein Fließtext. |
| HE15 | Ordnungsmuster-Treue | PASS | parallel-kausal: Hauptkette k2-1→k2-2→k2-3 mit parallelem Strang k2-4 (Frauenarbeit), Konvergenz auf k2-5/k2-6. |
| HE16 | Merksatz-Kalibrierung | PASS | 6/6 Knoten mit Merksatz; jeder ≤14 Wörter, schülernahe Sprache. |

### Text-Dichte (Vertrag 1b)

| Feld | Wörter | Max | Ergebnis |
|---|---|---|---|
| kontextsatz | 13 | 15 | PASS |
| C1 schritt | 13 | 15 | PASS |
| C2 schritt | 11 | 15 | PASS |
| C3 schritt | 10 | 15 | PASS |
| problem.satz | 11 | 15 | PASS |
| L1 | 11 | 20 | PASS |
| L2 | 12 | 20 | PASS |
| L3 | 10 | 20 | PASS |
| Knoten-Texte max | 6 | 12 | PASS |
| Merksätze max | 14 | 15 | PASS |
| Verbindungs-Labels max | 3 | 5 | PASS |

**Gesamturteil Phase 2.0 Mappe 2: PASS**

---

## Phase 2.1 (Material-Produktion)

### mat-2-1 (quellentext, rekonstruiert)

**Datum:** 2026-04-10
**Subagent-Referenz:** SUB_MATERIAL_QUELLENTEXT.md v2.1 (rekonstruiert-Subtyp)
**Dispatch-Constraint:** UE-001 HIGH — `_meta.aufbereitung: "rekonstruiert"`, Fußnote "Rekonstruierter Text auf Basis historischer Quellen"
**Artefakt-Ref:** pq-2-1 (Brotkarten-Verordnung Januar 1915)
**SCPL-Zone:** S (primär), Hinführung auf C1
**Perspektive:** P2 (Regierung/Obrigkeit)

| # | ID | Kriterium | Ergebnis | Detail |
|---|---|---|---|---|
| 1 | MQ1 | Schema-Konformität | PASS | material-output-schema.json: alle Required-Felder vorhanden; oneOf quellentext=string; bildunterschrift NICHT gesetzt. |
| 2 | MQ2 | Titel als Frage | PASS | "Was verrät diese Karte über den Krieg?" (7 W, Fragezeichen, aktivierend). |
| 3 | MQ3 | HTML-Validität | PASS | 3 `<p>`-Blöcke, `<em>`-Schachtelung konsistent, keine offenen Tags. |
| 4 | MQ4 | Fachbegriff-Konsistenz | PASS | Material führt keine neuen Fachbegriffe ein (Sequenzplan: `fachbegriffe_eingefuehrt: []`); "Brotkarte"/"Rationierung" bleiben mat-2-2 vorbehalten. |
| 5 | MQ5 | Dispatch-Respektierung | PASS | `_meta.aufbereitung: "rekonstruiert"` gesetzt; `quelle` enthält wörtlich "Rekonstruierter Text auf Basis historischer Quellen" + "Kein wörtliches Originalzitat". |
| 6 | Q1 | Wortanzahl QT | PASS | 81 Wörter (Limit: 100). |
| 7 | Q2 | Quellentyp gekennzeichnet | PASS | `_meta.quellentyp: "verordnung"`. |
| 8 | Q6 | Fiktionalitäts-Fußnote | PASS | Fußnote in `quelle`-Feld; zusätzlich Datierung "Januar 1915" und Urheber "Deutsches Reich" explizit. |
| 9 | Q9 | HTML-Format rekonstruiert | PASS | Kein `<blockquote>`; Struktur: Einleitung `<p><em>` → Rekonstruktion `<p><em>[sinngemäß]</em> <em>...</em></p>` → Nachweis `<p><em>`. |
| 10 | STR-14 | Fiktionalitäts-Kennzeichnung | PASS | `[sinngemäß]`-Marker im Rekonstruktions-Absatz; Quelle markiert keinen Wortlaut. |
| 11 | Q-M2-08 | Quellenangabe-Hygiene | PASS | Keine internen Artefaktnamen (SKRIPT/TAFELBILD/MATERIAL_GERUEST/SUB_*) in SuS-sichtbarem Text oder `quelle`. |
| 12 | Q-M2-DISJ | Keine Lösungs-Vorwegnahme | PASS | Weder `loesung[1]` (Seeblockade→Hunger), `loesung[2]` (Frauenarbeit) noch `loesung[3]` (Streiks/Widerstand) inhaltlich vorweggenommen — Brotkarte als Folge benannt, Seeblockade als Ursache NICHT genannt (bleibt mat-2-2 vorbehalten). |
| 13 | TYP-01-R | Typographische Korrektheit | PASS | Umlaute UTF-8, Gedankenstrich —, Ziffern korrekt. |
| 14 | REG-01 | Sprachregister R7 | PASS | Nominalstil der Verordnung kontrastiert mit schülernaher Rahmung; kein didaktischer Metakommentar. |
| 15 | ERB-01 | Erarbeitbarkeit k2-2 | PASS | k2-2 Brotkarte/Rationierung mit Datum + Mengen direkt belegbar. Provokations-Charakter: SuS fragen nach dem Warum → mat-2-2. |
| 16 | SEQ-01 | Sequenz-Kohärenz | PASS | `voraussetzung: []`, `ueberleitung_von: null`, `sequenz_kontext.vorher: null`, `sequenz_kontext.nachher` verweist auf mat-2-2 (DT Seeblockade). Erstes Material der Mappe. |
| 17 | PERSP-01 | Perspektiven-Abdeckung | PASS | P2 Regierung/Obrigkeit bedient (Mappe 2 konflikttyp=true). Trigger_flags leer — keine Sensibilitäten. |

**Gesamturteil mat-2-1: PASS**

---

### Nachtrag v3.10.3 Lemma-Check (UPGRADE_PLAN_v3-10 T3)

**Datum:** 2026-04-10
**Auslöser:** Einführung Vertrag 1b-lemma (Lemma-Duplikat-Check) via T3. Retro-Anwendung auf bestehende Rahmen-Artefakte gemäß T3-Akzeptanzkriterium 5.
**Prüfer:** `tools/lemma_duplicate_check.py` (Naive 8-Zeichen-Stemmer, Stop-Wort-Liste STOP_DEFAULT).
**Scope:** Nur `rahmen/hefteintrag.json` dieser Mappe.

**Ergebnis (nach Inline-Fix):**

| ID | Feld | Ergebnis | Detail |
|---|---|---|---|
| L-DUP | scpl.situation.kontextsatz | PASS | — |
| L-DUP | scpl.complication[0].schritt | PASS | — |
| L-DUP | scpl.complication[1].schritt | PASS (nach Fix v3.10.3) | Ursprünglich FAIL: Doppel-Lemma "Steckrübenwinter" (Satz-Innen + Fachbegriff-Label am Ende). Inline-Fix: "Im Steckrübenwinter 1916/17 ..." → "Im Winter 1916/17 ...". Wortzahl unverändert <15. |
| L-DUP | scpl.complication[2].schritt | PASS | — |
| L-DUP | scpl.problem.satz | PASS | — |
| L-DUP | scpl.loesung[0..n] | PASS | — |
| L-DUP | knoten[*].text / merksatz | PASS | — |
| L-DUP | verbindungen[*].label | PASS | — |

**Hinweis (historische Einordnung):** Der Lemma-Check wurde in v3.10.3 als Teil von Vertrag 1b eingeführt. Der Original-Q-Gate-Block Phase 2.0 oben hat diesen Check nicht enthalten (zeitlich vor T3). Die Nachtragung hier ist ausschließlich Dokumentation des Inline-Fix und des PASS-Status nach v3.10.3. Kein retroaktiver State-Advance — `Gesamturteil: PASS` des ursprünglichen Blocks bleibt unverändert.

---
