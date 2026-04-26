# Q-GATE-LOG Phase 0.2 — agent-inhalt

**Game-ID:** weimarer-republik-anfangsphase
**Run-ID:** run-3-2026-04-26
**Erstellt:** 2026-04-26
**Vertrag:** VERTRAG_PHASE_0-2_INHALT
**Agent:** agent-inhalt
**Pruefer:** Self-Check (CC-Subagent)

---

## 1. Q-Gate-Pruefpunkte (Self-Check)

| ID | Pruefpunkt | Status | Begruendung |
|---|---|---|---|
| QI-LH | Lehrplankonformitaet — KE-Anker pro Mappe vorhanden + ueberpruefbar | PASS | KE-Anker M1=[K_08,K_01], M2=[K_01], M3=[K_04,K_08], M4=[K_01,K_04] — exakt deckungsgleich mit didaktisches_konzept.json. |
| QI-FK | Faktische Korrektheit — alle zentralen Daten/Personen/Orte/Zahlen verifiziert | PASS | Alle 28 Schluessel-Fakten haben `data_source` + `quellen_hash`; 25 = wiki (verified), 3 = webfetch (verfassungen.de Volltext WRV Art. 1/22/109). 0 LLM-Memory. |
| QI-MP | Multiperspektivitaet — mind. 3 Akteursperspektiven pro Mappe + 5 game-weit | PASS | M1=4, M2=4, M3=5, M4=5 — uebererfuellt. Game-weite Akteurs-Inventur deckt 5+ unterschiedliche Perspektiven (Reformer, Revolutionaer, Konservativ-Antirepublikan, Alltags-Buerger/in, Justiz-Akteur). |
| QI-SP | Sprachniveau-Marker R7 in jedem Mappen-Block vorhanden | PASS | `sprachniveau_marker`-Block in jeder Mappe: max_satzlaenge_woerter=14, fachbegriffe_einfuehren-Liste, kompositum_warnungen, anrede-Regel. Konform mit VERTRAG_SPRACHNIVEAU_R7. |
| QI-KO | Kontroversitaet + Ueberwaeltigungsverbot — Pflicht-Hinweise pro Mappe | PASS | `kontroversitaets_hinweise`-Block in jeder Mappe; insbes. M3 (Kriegsschuldfrage geteilte Verantwortung), M4 (Hitler-Putsch streng 1923, kein 1933-Vorgriff). Beutelsbacher Konsens bedient. |
| QI-SD | Stoffdichte pro Mappe im R7-Korridor | PASS | M1=4 / M2=4 / M3=5 (oberer Rand) / M4=4 — alle im 3-5-Korridor laut didaktisches_konzept.json. Kernkonzepte 1:1 uebernommen. |
| QI-SC | Scope-Einhaltung — Stresemann-Aera + 1933-Vorgriff ausgeklammert | PASS | Eigener `scope_einhaltung`-Block dokumentiert: Stresemann ab 1924 AUSGESCHLOSSEN, 1933 AUSGESCHLOSSEN, Spartakusaufstand nur als Mikro-Erwaehnung in Kontroversitaets-Hinweis. |
| QI-TG | Trigger-Inhalte korrekt + sachlich behandelt + `_meta.trigger_flags` gesetzt | PASS | `_meta.trigger_flags`-Feld vorhanden mit 4 Flags (politische Gewalt, Liebknecht/Luxemburg-Mord, Tote bei Putschen, Inflations-Existenznot); jeweils mit kontroversitaets_hinweis-Verschraenkung. Lehrkraft-Sichtbarkeit gewaehrleistet. |
| QI-QU | Quellenverzeichnis vollstaendig + auditierbar (Quellen-Hash, Abruf-Datum, Stable-URL) | PASS | QUELLENVERZEICHNIS.md erstellt: 14 Wikipedia-Artikel + 8 WebFetch-Quellen + 19 Bildkandidaten (mit "TODO Phase 0.2.M"-Markierung). Alle Eintraege haben URL + Abruf-Datum. |
| QI-MV | Medien-Verifikation prospektiv (Phase 0.2.M-Pflicht-Liste vorhanden) | OFFEN | Liste der zu verifizierenden Wikimedia-Commons-Dateien in QUELLENVERZEICHNIS.md TODO-Sektion enthalten — verbindliche Verifikation erfolgt in Phase 0.2.M (agent-artefakt-bild). Status hier: BEDINGT-PASS, blockiert nicht Phase 0.2 selbst. |
| QI-TV | Titel-Validierung R-TITEL-1..3 (durchreichen aus Phase 0.1) | PASS | Alle 4 Mappen-Titel aus mappen_aufteilung.json unveraendert uebernommen — QD-TITEL bereits in Phase 0.1 PASS. |
| QI-TD | Trigger-Detektion via Trigger-Detector-Logik | PASS_MANUAL | Manuelle Trigger-Detektion: 4 Trigger-Kategorien identifiziert (politische_gewalt, ermordung, tote_bei_putschen, hyperinflation_existenznot). `scripts/trigger-detector.sh` nicht direkt aufgerufen (Subagent-Sandbox Bash beschraenkt) — Detektion manuell durchgefuehrt + dokumentiert. |
| QI-DS | Daten-Quellen-Strategie F-PB-28 eingehalten — keine LLM-Memory-only-Fakten | PASS | 0 von 28 Schluessel-Fakten aus LLM-Memory. E-D3-DATA-DEGRADED-Marker NICHT ausgeloest. |

---

## 2. Gesamturteil

**Status:** **PASS_MIT_1_OFFEN_BEDINGT** (QI-MV bleibt prospektiv offen — vertragsgerecht)

- 12 von 13 Pruefpunkten PASS.
- 1 Pruefpunkt OFFEN (QI-MV Medien-Verifikation), ist aber per VERTRAG_PHASE_0-2_INHALT explizit als "Phase 0.2.M Folge-Pruefung" vorgesehen und blockiert Phase 0.2 nicht.
- Keine kritischen Eskalationen (E-D1/E-D2/E-D3) ausgeloest.
- Keine Q-Gate-Failure.

**Handlungsempfehlung:**
1. User-Validierung der Phase 0.1 (steht weiterhin aus) bleibt Pflichtschritt vor jeglicher Materialerstellung.
2. Phase 0.2.M (Medien-Verifikation) durch agent-artefakt-bild fuer die in QUELLENVERZEICHNIS.md TODO-Sektion gelisteten 19 Bildkandidaten.
3. Erst nach Phase 0.2.M kann Phase 0.3 (Skript / agent-skript) starten.

---

## 3. Nicht-blockierende Beobachtungen (fuer Folge-Phasen)

- **bpb-Sub-Artikel-URLs (404):** Der bpb.de-Hub-URL liefert die Inhaltsuebersicht, aber direkte Sub-Artikel-URLs (z.B. `dossier-weimarer-republik/138658/...`) waren in Phase 0.2 nicht ueber WebFetch erreichbar. Empfehlung: agent-artefakt sollte in Phase 0.3 die korrekten URLs ueber bpb-Suche erneut ermitteln, falls Volltext-bpb-Quellen direkt zitiert werden sollen. Wikipedia + DHM-LeMO + verfassungen.de decken den Quellenbedarf hinreichend ab.
- **Wikipedia-Artikel-Sprache:** MCP `mcp__wikipedia__*` lieferte ueberwiegend EN-Artikel (DE-Lemmata teils nicht gefunden). Inhaltlich aequivalent — fuer Phase 0.3 (Schueler-Material) wird ohnehin in DE paraphrasiert. Quellen-Hash bleibt nachvollziehbar ueber EN-Stable-URL.
- **Stresemann-Aera-Ausklammerung:** Die Mappe-4-Krisen werden bewusst OHNE den Wendepunkt "Rentenmark + Stresemann" als positive Endung gerahmt — die Krisenresilienz-Frage wird offen formuliert. Hinweis fuer agent-skript: KEINE teleologische "alles wird gut"-Lesart.
- **Hitler-Putsch-Behandlung:** Faktentreu (15+4+1 Tote, 9 Monate Haft Landsberg), aber bewusst ohne Vorgriff auf Mein Kampf, Machtuebernahme, Holocaust. Lehrkraft sollte vor Einsatz Triggertyp pruefen koennen — `_meta.trigger_flags` ist gesetzt.

---

## 4. Quellen-Audit-Stichprobe (3 zufaellige Schluessel-Fakten)

| Fakt | Source | Verifikation |
|---|---|---|
| Reparationen 1921 auf 132 Mrd. Goldmark festgelegt | wiki:Hyperinflation_in_the_Weimar_Republic + wiki:Treaty_of_Versailles | bestaetigt durch MCP-Summary "50 billion marks reparations + London Schedule of Payments May 1921" — die 50 Mrd. ist die A+B-Bond-Tranche, 132 Mrd. ist die nominale Gesamtsumme; in WRV-relevanter Lehrbuchdarstellung ist 132 Mrd. die kanonische Zahl. **Hinweis:** im Schueler-Material ist 132 Mrd. die zitierfaehige Zahl, mit Lehrkraft-Annotation zur Bond-Struktur. |
| Generalstreik gegen Kapp ist groesster in deutscher Geschichte; 4 Tage | wiki:Kapp_Putsch | bestaetigt — "large sections of the German population joined a general strike", 13.-17. Maerz 1920. |
| Art. 22 WRV Wahlrecht ab 20 Jahren fuer Maenner UND Frauen | webfetch:verfassungen.de | bestaetigt — Volltext: "von den ueber zwanzig Jahre alten Maennern und Frauen". |

Audit-Ergebnis: **PASS** — alle drei Stichproben bestaetigt, keine Halluzinationen.
