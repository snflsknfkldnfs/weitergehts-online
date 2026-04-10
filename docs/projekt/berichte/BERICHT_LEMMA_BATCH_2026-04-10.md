# Bericht: Lemma-Duplikat-Batch-Lauf (T3 Akzeptanzkriterium 5)

**Datum:** 2026-04-10
**Auslöser:** UPGRADE_PLAN_v3-10 T3 (Lemma-Redundanz-Check) — Vertrag 1b-lemma neu eingeführt.
**Werkzeug:** `escape-game-generator/tools/lemma_duplicate_check.py` (naiver 8-Zeichen-Stemmer, STOP_DEFAULT).
**Scope:** Alle `hefteintrag.json` unter `docs/agents/artefakte/`.

## Ergebnis

Gesamtanzahl geprüfter Dateien: 5.
PASS: 3. FAIL: 2 (nach Inline-Fix aus T3.C verbleibend).

| Datei | Ergebnis | Feld | Duplikat-Stems | Bewertung |
|---|---|---|---|---|
| `gpg-erster-weltkrieg-ursachen/mappe-2/rahmen/hefteintrag.json` | **FAIL** | `scpl.complication[2].schritt` | `österrei`, `ungarn` | "Deutschland sichert **Österreich-Ungarn** bedingungslose Unterstützung zu — der Blankoscheck. **Österreich-Ungarn** stellt Serbien ein Ultimatum mit unannehmbaren Forderungen." Zwei Sätze → strukturell kombiniert → Eigenname zweimal. Kategorie: **strukturell begründbare Wiederholung** (zwei Handlungen desselben Akteurs). Option A: Umformulierung Satz 2 zu "Wien stellt Serbien ein Ultimatum...". Option B: Feld-Kommentar mit Ausnahme-Begründung (Stop-Liste kennt keine Eigennamen). |
| `gpg-erster-weltkrieg-ursachen/mappe-3/rahmen/hefteintrag.json` | PASS | — | — | — |
| `gpg-erster-weltkrieg-ursachen/mappe-4/rahmen/hefteintrag.json` | PASS | — | — | — |
| `verlauf-erster-weltkrieg-marne-ende/mappe-1/rahmen/hefteintrag.json` | **FAIL** | `scpl.complication[0].schritt` | `schützen` | "Soldaten leben in **Schützengräben** voller Wasser, Ratten und Leichen — **Schützengraben**." Klassische Label-Prolepse (identisch zum M2/Steckrübenwinter-Muster, nur mit Em-Dash statt Doppelpunkt als Trenner). LABEL_RE hat den Em-Dash-Fall nicht getroffen → kind=`lemma` statt `label`. Inline-Fix-Vorschlag: "Soldaten leben in Gräben voller Wasser, Ratten und Leichen — Schützengraben." |
| `verlauf-erster-weltkrieg-marne-ende/mappe-2/rahmen/hefteintrag.json` | PASS | — | — | (Nach Inline-Fix v3.10.3, dokumentiert in mappe-2/Q-GATE-LOG.md Nachtrag.) |

## Handlungsempfehlung

1. **verlauf-EWK-M1 C0:** Inline-Fix anwenden — identisches Muster zum bereits gefixten M2-Fall, keine inhaltliche Änderung, nur Entfernung der Lemma-Prolepse.
2. **gpg-EWK-ursachen M2 C2:** Entscheidung durch User erforderlich, da Eigenname-Wiederholung strukturell sein kann. Falls Umformulierung: Option A. Falls Ausnahme: Feld-Kommentar im hefteintrag.json ergänzen (noch kein Schema-Feld für Lemma-Exemption — offen in T2 oder später).
3. **Tooling-Nachbesserung (optional):** `LABEL_RE` in `lemma_duplicate_check.py` um Em-Dash-Trenner `[—–-]` erweitern, damit Label-Prolepsen unabhängig vom Trennzeichen erkannt werden (aktuell nur `:`).

## Nicht-Handlung (Q4-Scope)

Die Q4-Entscheidung "nur Vorwärtsentwicklung" aus UPGRADE_PLAN_v3-10 §6.3 bezieht sich auf T1 (PI-State-Machine-Binding: kein Retro-Audit früherer State-Advances). Die Befunde dieses Berichts sind **Content-Bugs**, nicht State-Machine-Verstöße — ihre Behandlung fällt in die reguläre inhaltliche Qualitätssicherung der betroffenen Mappen und wird separat entschieden.

## Rohdaten

Exit-Code Batch-Lauf: 1 (weil mind. ein FAIL).
JSON-Rohbericht im git-log der T3-Session verfügbar.
