# Vertrag Phase 2.2a: Progressionsplan (AGENT_RAETSEL)

**Extrahiert aus:** WORKFLOW_v4.md (Commit d627924, 2026-04-01)
**Prinzipien:** P1 (Read-from-Artifact) · P4 (1 Dispatch, 1 Output) · P5 (Q-Gate Pflicht) · P6 (Praezise Schnittstellen)
**Dispatch-Isolation:** 1 Dispatch. Liest Material-Metadaten, NICHT Material-Volltext.

---

## Schnittstellen-Vertrag (P6)

| Read-Schritt | Input-Datei | Gelesene Felder | NICHT lesen |
|---|---|---|---|
| 1 | AGENT_RAETSEL.md | Vollstaendig (Orchestrationsregeln) | — |
| 2 | materialien/mat-N-*.json | NUR: id, typ, titel, _meta.tafelbild_knoten_abgedeckt | NICHT: inhalt (Volltext) — Token-Effizienz |
| 3 | MATERIAL_GERUEST | NUR: didaktische_funktion pro mat-ID | — |
| 4 | rahmen/hefteintrag.json | knoten[], merksaetze[], stundenfrage | — |
| 5 | DIDAKTIK_RAHMEN | NUR: AFB-Profil + Schwierigkeitskurve dieser Mappe | Andere Mappen |

**Begruendung Volltext-Ausschluss (Schritt 2):** Der Orchestrator braucht Material-Volltext nicht. Er trifft 3 Entscheidungen: AFB-Zuweisung (braucht TB-Knoten + Schwierigkeitskurve), Typauswahl (braucht Materialtyp + didaktische_funktion), Operationalisierungsziel (braucht TB-Knoten-Merksatz + AFB-Operator). Material-Volltext wird erst vom Subagenten in Phase 2.2b gelesen (P1).

**NICHT lesen:** data.json, WORKFLOW_v4.md, SKRIPT, INHALTSBASIS, aufgaben/*.json

## Dispatch-Ablauf

```
1. AGENT_RAETSEL.md lesen
2. Alle materialien/mat-N-*.json lesen (NUR id, typ, titel, _meta — NICHT inhalt)
3. MATERIAL_GERUEST lesen (didaktische_funktion pro mat-ID)
4. rahmen/hefteintrag.json lesen (knoten, merksaetze, stundenfrage)
5. DIDAKTIK_RAHMEN lesen (NUR AFB-Profil + Schwierigkeitskurve — P6)
6. Progressionsplan erstellen (5-8 Positionen inhaltsgesteuert, AFB-Zuweisung, SCPL-Zonen-Mapping, Typauswahl mit Begruendung)
7. Pro Aufgabe: Konstruktionskontext generieren
   (Ziel-Material-ID, TB-Knoten, AFB, Operationalisierungsziel)
8. Freischalt-Code generieren (thematisch, A-Z, 4-8 Zeichen)
9. PROGRESSIONSPLAN.md schreiben
```

## Typauswahl-Heuristik (AU-1, 2026-04-05)

Seit AU-3 (STR-11 Teil 2) stehen 8 Aufgabentypen zur Verfuegung: `mc`, `zuordnung`, `lueckentext`, `reihenfolge`, `freitext`, `vergleich`, `begruendung`, `quellenkritik`.

**Bloom-Ziel-Zonen pro Typ:**

| Typ | Bloom-Zone | Eignung |
|---|---|---|
| lueckentext | L1-L2 | Fachbegriffs-Recall, kontextgetriebener Begriffseinsatz |
| mc | L1-L3 | Fakt-Wiedererkennung, Sinn-Verstaendnis, Transfer-Anwendung |
| zuordnung | L1-L3 | Begriff-Paare, Symbol-Konzept, Beispiel-Kategorie |
| reihenfolge | L2-L3 | Chronologie, Ursache-Wirkung-Ordnung |
| **vergleich** | **L4 (Ziel)** | Analyse entlang Dimensionen, wenn min 2 Objekte + min 2 Dimensionen im Material |
| **begruendung** | **L5 (Ziel)** | Bewertung mit CER, wenn Streitfrage + belegfaehige Material-Stellen |
| **quellenkritik** | **L3-L5 (Ziel)** | Systematische Quellenanalyse via W-Fragen, wenn Primaerquelle + Perspektiv-Reflexion |
| freitext | L3-L6 | Synthese, Stellungnahme, Gegenentwurf (Standard letzte Aufgabe) |

**Entscheidungsfragen pro Aufgaben-Position:**
1. Welche Bloom-Stufe verlangt die Progression an dieser Position?
2. Welches Material liegt vor (Einzelfakt / Vergleichsobjekte / Streitfrage-Pool)?
3. Welcher Typ deckt BEIDE Anforderungen — Bloom-Stufe UND Material-Struktur — am praezisesten?

**Wann `vergleich` waehlen:**
- Material enthaelt min 2 benennbare Objekte derselben Kategorienebene.
- Aus Material sind min 2 trennscharfe Dimensionen ableitbar.
- Bloom-Ziel der Mappe verlangt L4-Anteil, der nicht anderweitig abgedeckt ist.
- Andernfalls: SUB_AUFGABE_FREITEXT (Vergleichs-Variante, L4) oder SUB_AUFGABE_ZUORDNUNG (L3).

**Wann `begruendung` waehlen:**
- Es existiert eine echte Streitfrage mit min 2 vertretbaren Positionen.
- Material enthaelt belegfaehige Einzelelemente (Zitat, Zahl, Ereignis).
- Bloom-Ziel der Mappe verlangt L5-Anteil strukturiert (CER-Gitter statt freier Stellungnahme).
- Andernfalls: SUB_AUFGABE_FREITEXT (Stellungnahme-Variante, L5 ohne CER-Pflicht).

**Wann `quellenkritik` waehlen (AU-3, STR-08):**
- Material ist eine Primaerquelle (Quellentext oder historische Bildquelle) mit erkennbarer Perspektive/Intention.
- Didaktisches Ziel der Mappe beinhaltet Quellen-Reflexion (Perspektivitaet, Intention, Glaubwuerdigkeit).
- Bloom-Ziel verlangt L3-L5-Anteil, der durch systematische Quellenanalyse abgedeckt werden kann.
- **Anti-Automatismus:** Quellenkritik wird NICHT automatisch bei jeder Primaerquelle eingesetzt. Entscheidung ist sinngerichtet — keine starre Pflicht, keine mechanische Quelltyp-Detektion. Neutrale Statistiken, rein informative Urkunden oder Quellen ohne erkennbare Perspektive erhalten keine Quellenkritik-Aufgabe.
- Andernfalls: SUB_AUFGABE_FREITEXT (mit quellenkritischem Impuls als Leitfrage) oder Quellenkritik weglassen.
- Max 1 Quellenkritik-Aufgabe pro Mappe (Monotonie-Vermeidung). Bei 2+ geeigneten Primaerquellen: die didaktisch ertragreichste waehlen.

**Anti-Quota-Klausel:** Kein Mappen-Mindest-Vorkommen von `vergleich`/`begruendung`/`quellenkritik`. Die Typen werden nur eingesetzt, wenn Material + Lernziel passen. Pseudo-Vergleiche (1 Dimension), Pseudo-Begruendungen (Claim ohne Evidence) oder Pseudo-Quellenkritik (W-Fragen ohne Perspektiv-Analyse) sind Q-Gate-FAIL und zaehlen nicht zur Bloom-Abdeckung.

**Bloom-Verteilungs-Policy (A19):** Pro Mappe: max 40 % L1-L2, min 30 % L3-L4, min 20 % L5-L6. Der Progressionsplan muss die voraussichtliche Bloom-Verteilung als `_meta.bloom_verteilung_ziel` dokumentieren, bevor Aufgaben-Dispatch startet.

## Output

```
PROGRESSIONSPLAN.md   # 5 Konstruktionskontexte + Dispatch-Anweisungen + Freischalt-Code
```

## Prompt-Datei

`docs/agents/AGENT_RAETSEL.md`
