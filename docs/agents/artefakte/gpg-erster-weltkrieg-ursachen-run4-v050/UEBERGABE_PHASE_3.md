# UEBERGABE — Phase 3 Assembly

**Game:** gpg-erster-weltkrieg-ursachen-run4-v050
**Plugin:** v0.5.0 (Hardening Release)
**Run-Datum:** 2026-04-26
**Phase 0+1+2 Status:** DONE (alle Q-Gates PASS / PASS_MIT_WARN)

---

## 1. Was Phase 3 zu tun hat

Phase 3 ist **mechanisch** (Assembly + Deploy):

1. **Top-Level data.json Assembly:** 4 Mappen-`data.json` zu einem Game-`data.json` zusammenführen (kanonisches Schema gemaess `escape-game-schema`-Skill).
2. **HTML-Templates kopieren** aus `escape-games/template/` (data.json + index.html + lehrkraft.html + mappe-template.html).
3. **mappe-1.html bis mappe-4.html erzeugen** (Template-Copy mit Mappe-Index).
4. **Game-Verzeichnis anlegen:** `/Users/paulad/weitergehts.online/weitergehts-online/escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/`
5. **sub-assembly-verify (Phase 3.4):** V13-Hefteintrag-Dualstruktur-Check + V14-Entity-Encoding-Pruefung als MUST_VERIFY-Pflicht-Gate vor Deploy.
6. **Browser-Smoke-Test** (agent-qualitaet) post-Assembly.
7. **Deploy** (Git-Commit + Push falls bestaetigt).

---

## 2. Input-Inventar fuer Phase 3 Assembly

**Pfad-Wurzel:** `/Users/paulad/weitergehts.online/weitergehts-online/docs/agents/artefakte/gpg-erster-weltkrieg-ursachen-run4-v050/`

### Pro Mappe (M1-M4)

| Pfad | Beschreibung |
|---|---|
| `mappe-N/data.json` | Mappe-Assembly mit `$ref`-Komposition (Materialien + Aufgaben + Rahmen + Mappenabschluss) |
| `mappe-N/materialien/` | Material-JSONs (Legacy-Flat + v3.11.0+ Pro-Material-Verzeichnis fuer quellentext) |
| `mappe-N/aufgaben/aufgabe-N-{1..7}.json` | 7 Aufgaben pro Mappe = 28 total |
| `mappe-N/rahmen/{hefteintrag,einstieg,sicherung,meta}.json` | Rahmen-Files (4 pro Mappe) |
| `mappe-N/mappenabschluss.json` | STR-13 Mappenabschluss-Zone |

### Game-weit

| Pfad | Beschreibung |
|---|---|
| `DIDAKTIK_RAHMEN.md` | Lehrplan-Bezug (KE-Matrix) |
| `didaktisches_konzept.json` | Schema-Foundation A2 |
| `mappen_aufteilung.json` | Schema-Foundation A2 |
| `inhalts_briefing.json` | Phase 0.2 (Quellen + event_date + material_kandidaten) |
| `Quellenverzeichnis.md` | 29 Wikipedia-Quellen + 1 LeMO-WebFetch |
| `medien_katalog_game.json` | 13 dual-kanal-verifizierte Wikimedia-Bilder |
| `SKRIPT.md` + `skript_struktur.json` | Phase 0.3 |
| `artefakt_inventar.json` | Phase 0.3 (game-weite Material-Qualifizierung) |
| `HEFTEINTRAG_M{1..4}.md` + `hefteintrag_struktur.json` | Phase 0.4 (SCPL-Tafelbild + Sicherung) |
| `BLUEPRINT_M{1..4}.md` + `material_geruest_m{1..4}.json` | Phase 1 |
| `PROGRESSIONSPLAN_Mappe_{1..4}.md` | Phase 2.2a |

### Q-GATE-LOG-Dateien

**ACHTUNG:** Concurrent-Write hat 9 separate Append-Dateien erzeugt. Konsolidierung in eine kanonische `Q-GATE-LOG.md` als administrative Aufgabe vor Deploy:

- `Q-GATE-LOG.md` (Pre-Flight + 0.1 + 0.2 + 0.2.M + 0.3 SKRIPT + 0.3 ARTEFAKT + 0.4 HEFTEINTRAG)
- `Q-GATE-LOG_phase-1-m1-append.md` (Phase 1 M1)
- `Q-GATE-LOG_M2_APPEND.md` (Phase 1 M2)
- `Q-GATE-LOG_PHASE-1_M3.md` (Phase 1 M3, M4 ist in Q-GATE-LOG.md)
- `Q-GATE-LOG_PHASE-2-1_M1.md` bis `_M4.md` (Phase 2.1 pro Mappe)
- `Q-GATE-LOG_PHASE-2-2_M1.md` bis `_M4.md` (Phase 2.2 pro Mappe)

---

## 3. Game-Architektur (4 Mappen)

| Mappe | Titel | KE | AFB | Materialien | Aufgaben | Freischalt-Code |
|---|---|---|---|---|---|---|
| M1 | Pulverfass Europa | GPG7_LB2_K_05 | I-II | 6 | 7 | PULVER |
| M2 | Sarajevo 1914 | GPG7_LB2_K_06 | II | 5 | 7 | 28-06-1914 |
| M3 | Augustfieber | GPG7_LB3_K_03 | II-III (Hoehepunkt!) | 5 (+1 RESERVE) | 7 | SCHULD |
| M4 | Marne 1914 | GPG7_LB2_K_07 | II (Sicherung) | 6 | 7 | STELLUNGSKRIEG |
| **Summe** | | **3 KE + 1 Bonus** | | **22 Materialien** | **28 Aufgaben** | |

**Game-Abschluss-Code:** `PULVERFASS — AUSLOESER — AUGUSTBEGEISTERUNG — STELLUNGSKRIEG`

**Rahmenhandlung:** "Spurensucher im Archiv 1914" — Detektiv-/Recherche-Format altersgerecht 7c.

---

## 4. Didaktische Kernstuecke (User-Validierungs-Fokus)

### M2 — Multiperspektivitaet Princip Held-vs-Terrorist (Kalibrierungs-Mappe)
- mat-2-4 (Princip-Bildquelle) + aufgabe-2-6 (Zuordnung): beide Erinnerungs-Perspektiven gleichberechtigt, KEIN Held-/Terrorist-Antwort-Vorgriff
- aufgabe-2-7 (Freitext): Ursache-vs-Ausloeser-Synthese mit Pulverfass-Bezug aus M1

### M3 — Beutelsbach-Kontroversitaet Versailles 1919 vs. Clark 2013
- mat-3-3 (quellentext Versailles Art. 231) + mat-3-4 (darstellungstext Clark Schlafwandler)
- aufgabe-3-5 (vergleich, L4) + aufgabe-3-6 (begruendung CER, L5): Kontroversitaets-Doppel ohne Antwort-Vorgriff
- mat-3-5 (rekonstruiertes Tagebuch, STR-14-NEU) als Anti-Bias-Stimme gegen Augusterlebnis-Idealisierung

### M4 — Schlieffen-Plan-Mythos-Korrektur (Zuber-Forschung)
- mat-4-1 (Schlieffen-Plan-Karte mythos_korrektur) + aufgabe-4-1 (MC)
- aufgabe-4-4 (Zuordnung F-PB-37): Quellenkritik DT-Inszenierung vs. FR-Pre-Manoever 1913
- mat-4-6 (Stellungskrieg-Bruecke) + aufgabe-4-7 (Game-Abschluss-Reflexion + Folge-Game-Bruecke)

---

## 5. Bekannte Befunde + WARNs (zu User-Bewertung)

| Phase | Befund | Bewertung |
|---|---|---|
| 0.2.M | 4/5 material_kandidaten Wikimedia-Hallus | **POSITIV:** Plugin-Dual-Kanal-Schutz hat funktioniert, Ersatzbilder dual-verifiziert |
| 0.3 ARTEFAKT | mat-3-6 (Burgfriedens-Medaille) PARTIAL-Verifikation | RESERVE_NICHT_AKTIVIERT in Phase 2.1 dokumentiert |
| 0.3 ARTEFAKT | M4 Marne-Taxi-Bild VERWORFEN_AUS_STOFFDICHTE | Reaktivierung in Phase 1 nicht erfolgt |
| 1 DESIGN | M2 MD4-WARN Darstellungstext-Mindestvorgabe | bewusste Designentscheidung (Zeitleiste + HE als DT-Substitut) |
| 1 DESIGN | M4 MD4-WARN Personifizierung | bewusst (M3 hatte rolle-M3-1) |
| 2.1 M1 | mat-1-4 156W (Cap 150W) | +4% durch Synthese-Funktion gerechtfertigt |
| 2.1 M3 | Wortbudget 610W (Soft-Cap 500W) | AFB II-III Hoehepunkt + Beutelsbach-Doppelpol |
| 2.1 M4 | Wortbudget 710W | Doppel-BU bei mat-4-3+mat-4-4 + Zeitleisten-Daten |
| Q-GATE-LOG | 9 separate Append-Dateien (concurrent-write) | Konsolidierung als administrative Aufgabe vor Deploy |

---

## 6. Naechste konkrete Aktionen

1. **Q-GATE-LOG-Konsolidierung** (manuell oder via Tooling) — alle 9 Append-Dateien chronologisch in `Q-GATE-LOG.md` mergen.
2. **Phase 3 Assembly** starten:
   - Game-Verzeichnis `escape-games/gpg-erster-weltkrieg-ursachen-run4-v050/` aus `escape-games/template/` kopieren
   - Mappen-`data.json`-Files konsolidieren zu Top-Level-`data.json`
   - HTML-Templates pro Mappe kopieren
3. **sub-assembly-verify** (Phase 3.4 MUST_VERIFY-Pflicht-Gate)
4. **Browser-Smoke-Test** via agent-qualitaet
5. **Vergleichs-Eval** Plugin-v0.5.0-Output vs. altes Pre-Plugin-Game `gpg-erster-weltkrieg-ursachen` (Goldstandard)
6. **Run-4-Empirie-Auswertung** (Hardening-Spec §7, 14 testbare F-PB-Items) gegen die jetzt produzierten Outputs

---

## 7. Run-4-Empirie (Erstbefunde)

**Erfolgs-Indikatoren:**
- Plugin v0.5.0 Self-Sustained-Run ist durchgelaufen Phase 0.1 → 2.2c **ohne User-Eingriff** (1 Re-Dispatch wegen falscher Pfad-Annahme M3-Phase-2.1, durch State-Update geloest)
- Dual-Kanal-Wikimedia-Verifikation hat 4 Hallus pre-emptiv erkannt (F-PB-37+39+48+49 funktionieren)
- Beutelsbach-Kontroversitaet-Operationalisierung in M3 (vergleich + begruendung) ist plugin-generiert ohne Antwort-Vorgriff
- F-PB-44 Komposita-Erstgebrauch in allen Materialien dokumentiert
- POLICY_TRIGGER_SICHTBARKEIT V13 strikt durchgehalten (NSDAP-Sprengkraft + Versailles-Sensibilitaet ausschliesslich Lehrkraft-Sektion)

**Bekannte Plugin-Schwaechen (fuer v0.5.1 / Run-5):**
- agent-inhalt material_kandidaten: Wikimedia-Dateinamen halluziniert ohne Pre-Verifikation (4/5 Hallus). **Empfehlung:** Frontmatter-Patch — material_kandidaten Wikimedia-Dateinamen MUESSEN via mcp__wikipedia get_article images[]-Cross-Reference verifiziert werden bevor persistiert.
- Concurrent-Write am Q-GATE-LOG.md: parallele Phase-1-Subagenten erzeugten 3 separate Append-Dateien. **Empfehlung:** Phase-1 sequenziell (statt parallel) ODER Q-GATE-LOG-Anker pro Phase-Block (Lock-File / Append-Only-Konvention).
- Subagent agent-material-dispatcher hat in Re-Dispatch (M3) game_state.json-Status mit Pfad-Fehlinterpretation kombiniert. **Empfehlung:** Pfad-Verifikation via Bash-ls vor Abbruch-Entscheidung im Frontmatter dokumentieren.

---

**Ende UEBERGABE.** Phase 3 kann starten.
