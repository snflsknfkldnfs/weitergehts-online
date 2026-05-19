# Wiedereinstieg · V3-Skript-Status per 2026-05-19

**Sage Claude einfach `weiter` oder `lies WIEDEREINSTIEG.md` — der Rest steht hier.**

## Was steht · live auf main · committed

Alle 4 Prüfungs-Fächer (mündliche Prüfung 26.-28. Mai 2026) haben jetzt eine funktionierende lb-matrix:

| Fach | Pfad | Zellen | KEs | BUV-Piloten |
|---|---|---|---|---|
| GPG/Sozialkunde | `n18-sozialkunde/lb-matrix/` | 18 (LB×Jgst) | 56 · 12 verbatim | **1 v4** (Soziale Frage GPG7-LB3, 10 UEs, 5-Phasen-GPG-Standard) |
| Mathematik | `d-mathematik/lb-matrix/` | 36 (Leitidee×Jgst) | (v2) | 4 Sequenzen v2-Niveau (Körper M5, Prozent M7, Proportionalität M7, lin Fkt M8) |
| WiB | `d-wib/lb-matrix/` | 30 (5 GB × Jgst) | 35 | **1** (Anforderungsprofile J8, 8 UEs, 13-Phasen-WiB-Standard, Personifikation Lena) |
| Sport | `d-sport/lb-matrix/` | 42 (7 LB × 6 Jgst) | 43 | **1** (Handball Schlagwurf J7, 9 UEs, 5-Phasen-Sport-Standard + Hallenplan + Sachanalyse) |

Live: `https://weitergehts.online/staatsexamen/fachdidaktik/skript-v3/{n18-sozialkunde|d-mathematik|d-wib|d-sport}/lb-matrix/`

## Fach-spezifische Phasen-Schemata (NICHT austauschbar)

- **GPG**: 5 Phasen — Problemstellung / Problementfaltung / Problemlösung / Wertung / Sicherung+LZK
- **Mathe**: 4 Phasen EIS — enaktiv / ikonisch / symbolisch (Bruner+Aebli)
- **WiB**: **13 Phasen** — Hinführung / Problemstufe / Zielangabe / Vermutungen / Lösungsplanung / Lösung (Haupt) / Präsentation / Erkenntnis / Wertung / Zusammenfassung / Vermutungen prüfen / Transfer / Sicherung (Moritz-Steigerwald 2018, Baustein GB)
- **Sport**: 5 Phasen — Begrüßung / Aufwärmen / Hauptteil / Anwendung / Ausklang

## Offene Tasks (siehe TaskList)

- **#131 GPG**: 17 von 18 KE-Zellen haben nur kompakte UE-Listen. v4-BUV-Pilot fehlt für 17 Zellen. Nächster sinnvoller Pilot: GPG10-LB3 Politik (Demokratie · prüfungsrelevant für mündliche).
- **#132 Mathe**: 4 Sequenzen sind v2-Niveau. Für v4-Parität fehlt: Sequenz-Tabelle, Mager-3-K-Lernziele, Teilziele mit AFB, 4-Spuren-Diff, Tafelbild-Skizze. **Renderer muss zuerst v4-fähig gemacht werden** (aktuell rendert nur ues[] mit ebene/kompetenz/begruendung). M9-Status ist gerüst/stub — Pythagoras/Trig + quadr Fkt sind D9M-prüfungsrelevant!
- **#133 WiB**: UE 1 + 5 sind voll im 13-Phasen-Standard. UEs 2-4, 6-8 sind Gerüst (`stage: 'geruest'`). Pro UE 13 Phasen + sozialform_phasen + differenzierung_block + Mager-Stundenziel + 3-4 Teilziele.
- **#134 Sport**: UE 5 ist voll (BUV-Schwerpunktstunde mit Hallenplan + Sachanalyse + Helferkonzept). UEs 1-4, 6-9 sind Gerüst. UE 7 wäre die LP-Sprungwurf-Stunde — sollte 2. voll-BUV werden.

## Renderer-Status

- **GPG-Renderer** (`n18-sozialkunde/lb-matrix/matrix.js`): v4-ready — Mager-3-K, Teilziele mit AFB-Tags + diff-Marker, Sequenz-Übersichtstabelle, Sozialform-Tags, 4-Spuren-Diff-Grid, Personifikations- + Tafelbild-Callouts, Anker-Wörter-Highlight.
- **WiB-Renderer** (`d-wib/lb-matrix/matrix.js`): v4-Pattern adaptiert auf 13-Phasen (`mx-ue-phasen--multi`, 130px Label-Breite, gb_titel-Fallback).
- **Sport-Renderer** (`d-sport/lb-matrix/matrix.js`): v4 + Sport-spezifische Boxen `.mx-sport-buv` (Hallenplan/Helferkonzept/Sicherheit), `.mx-sport-sachanalyse` (Phasen/Biomechanik/Fehler), `.mx-sport-redu` (Didaktische Reduktion).
- **Mathe-Renderer** (`d-mathematik/lb-matrix/matrix.js`): noch v1 — rendert ues[] mit ebene/kompetenz/begruendung. Für v4 muss er neu (Vorlage: Sozialkunde-Renderer).

## Werkzeuge / Snippets

- Python-Generator + Splice für GPG-Pilot: `/tmp/sk-v4/build_pilot_v4.py` + `/tmp/sk-v4/splice.py` (nach Neustart weg — bei Bedarf neu schreiben analog WiB-data.js Struktur)
- Backup v3 vor v4-Splice: `/tmp/sk-v4/data.v3.bak.js` (auch weg nach Neustart — Git-History hat es: commit 1cd7acb..9b1a073)

## Ressourcen-Quellen (extern · bleiben nach Neustart)

- GPG: `/Users/paulad/weitergehts.online/Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/GPG Ressourcen/`
- Mathe: `/Users/paulad/weitergehts.online/Unterrichtseinwicklung/Mathematik/`
- WiB: `/Users/paulad/weitergehts.online/Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/WiB Ressourcen/`
- Sport: `/Users/paulad/weitergehts.online/Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/Sport Ressourcen/`

## Letzte Commits (Git)

```
7ea0b86 feat(sport-matrix): Sport LB-Matrix v1 spiralcurricular + BUV-Pilot Handball
(intermediate: WiB)  feat(wib-matrix): WiB GB-Matrix v1 mit 13-Phasen-Standard
85c833f feat(sk-matrix): BUV-Template-v4-Standard (v4)
9b1a073 feat(sk-matrix): GPG-5-Phasen-Standard + Ankerwörter (v3)
```

## Standard-Verfahren für Pilot-Ausweitung

1. Ressourcen-Ordner für betroffenes Fach kurz prüfen (Explore-Agent dispatch)
2. Bestehende Pilot-Sequenz als Template lesen
3. Bei vielen UEs: Python-Generator schreiben → JS-Fragment → Splice via Edit
4. Bei einzelnen UEs: direkt via Edit-Tool die UE-Objekte ergänzen (stage: 'geruest' → voll)
5. Browser-Verify via Playwright (Sozialkunde/WiB/Sport laufen auf http://localhost:8765/)
6. Commit + push pro Fach

## Was NACH dem Neustart wegfällt

- `/tmp/sk-v4/` (Python-Helper) — bei Bedarf neu schreiben
- Playwright-Session — neu öffnen mit `mcp__plugin_playwright_playwright__browser_navigate`
- Lokaler Webserver auf Port 8765 — wieder starten (`python3 -m http.server 8765` aus Repo-Root)
- Diese Conversation — du sagst einfach `weiter` und Claude liest diese Datei
