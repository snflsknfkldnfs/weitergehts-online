---
status: FINAL
datum: 2026-04-23
scope: F-A3 Implikations-Check Impulse-Ownership
entscheidungs-kontext: F0e_PI_AUDIT_DECISIONS.md §5
vorentscheidung: Aufgaben-Subagent = Impulse-Owner (Paul-Direktive)
ziel: §19-Entwurf nicht-blockierend machen
---

# F0e F-A3 — Impulse-Ownership Implikations-Check

## Kontext

Paul-Vorentscheidung: quellenkritische Impulse werden vom Aufgaben-Subagent (SUB_AUFGABE_QUELLENKRITIK) erzeugt, nicht vom Material-Subagent. Material liefert höchstens `_meta.quellenkritische_impulse` als Empfehlung. Dieser Check verifiziert die Entscheidung entlang fünf Implikationen.

## I1 — Material-Wortlaut-Zugriff

**Frage:** Kennt der Aufgaben-Subagent den Material-Wortlaut vollständig?

**Evidenz:**

- `VERTRAG_PHASE_2-2b_AUFGABE.md` Z. 30: `materialien/mat-N-X.json | Volltext (Ziel-Material)`
- `SUB_AUFGABE_QUELLENKRITIK.md` Z. 25: `material_volltext | Vollstaendiger Materialtext (HTML) | materialien/mat-N-M.json`

**Antwort:** **JA, bestätigt.** Aufgaben-Subagent erhält Material-Volltext als Eingabe. Voraussetzung für eigenständige Impuls-Formulierung erfüllt.

**Offene Unterfrage (I1.a):** Ist "Volltext" = ganzes JSON (inkl. `_meta`) oder nur `inhalt`-Feld? `VERTRAG_PHASE_2-2b` Z. 30-31 impliziert Ziel-Material-JSON, `SUB_AUFGABE_QUELLENKRITIK.md` Z. 25 spezifiziert HTML-Text. Formulierung inkonsistent. **Konsequenz für §19:** explizit klären, dass `_meta.trigger_flags` + `_meta.quellenkritische_impulse` Teil des Aufgaben-Subagent-Inputs sind (vgl. I4).

## I2 — Empfehlung vs. Pflicht

**Frage:** Wird `_meta.quellenkritische_impulse` als Aufgaben-Raw (vorformulierte W-Fragen) oder als neutrale Empfehlung verstanden?

**Evidenz:**

- `SUB_AUFGABE_QUELLENKRITIK.md` Z. 33: "Set von 4-6 W-Fragen, Auswahl nach didaktischer Passung. Nicht alle Fragen muessen in jeder Aufgabe verwendet werden."
- Z. 55-72: Auswahl-Heuristik nach Material-Konstellation — Subagent-Expertise-Aufgabe.
- Z. 201 (QK-1): "4-6 W-Fragen, Auswahl begruendet".

**Antwort:** **Empfehlung, nicht Pflicht.** Pflicht-Charakter würde Subagent-Auswahl-Expertise unterwandern. Material-Impulse sind Vorschlag-Signal, der Aufgaben-Subagent entscheidet final über Auswahl + Formulierung.

**Konkretisierung für §19:** Material-Subagent-Spezifikation formuliert `_meta.quellenkritische_impulse` explizit als "empfohlene Analyse-Richtungen", nicht als "zu übernehmende Fragen". Aufgaben-Subagent wählt, erweitert, streicht oder reformuliert.

## I3 — Impulse-Anzahl im Material-Schema

**Frage:** Kann `_meta.quellenkritische_impulse` im Material-Schema schrumpfen (aktuelle Fallstudie: 2-4 Items, Tendenz erschöpfend)?

**Evidenz:**

- Aufgaben-Subagent produziert 4-6 W-Fragen (QK-1).
- Mapping-Richtwert: 1 Material-Impuls → 1-2 W-Fragen.
- Erschöpfende Material-Listen (4+ Items, alle Perspektiven abdeckend) duplizieren Arbeit und verengen Aufgaben-Subagent-Spielraum.

**Antwort:** **JA, Schrumpfung sinnvoll.** Richtwert 2-3 Empfehlungs-Impulse pro Material, bewusst nicht-erschöpfend. Fokus: Signal-Funktion (welche Dimensionen sind im Material "didaktisch ergiebig"), nicht Inventarisierung.

**Konkretisierung für §19:** Material-Schema-Guideline ergänzt: "Richtwert 2-3 Impulse, die die didaktisch ergiebigsten Analyse-Richtungen signalisieren. Kein erschöpfender Katalog."

## I4 — Trigger-Flags-Zugriff

**Frage:** Muss Aufgaben-Subagent auch auf `_meta.trigger_flags` zugreifen?

**Evidenz:**

- Trigger-Flags steuern Sensitivitäts-Handling (Überwältigungsverbot, Opferperspektive-Sorgfalt).
- Quellenkritische W-Fragen zu Quellen wie Trothas Vernichtungsbefehl müssen sprachlich anders formuliert sein als zu neutralen Verwaltungsakten.
- Aktuell kein expliziter Verweis in `SUB_AUFGABE_QUELLENKRITIK.md` auf `trigger_flags`-Konsum.

**Antwort:** **JA, erforderlich.** Flags prägen Aufgaben-Formulierung bei sensitiven Materialien. Konsum-Pfad muss im Vertrag explizit gemacht werden.

**Konkretisierung für §19:** `VERTRAG_PHASE_2-2b` Eingabe-Definition erweitern: `_meta.trigger_flags` ist Teil des Aufgaben-Subagent-Inputs. Eigene Prüfregel in SUB_AUFGABE_QUELLENKRITIK: "Bei nicht-leeren trigger_flags Priming-Hinweis zur sensiblen Formulierung aktivieren."

## I5 — Kompatibilität mit W-Fragen-Schema

**Frage:** Kollidiert die Impulse-Empfehlung mit dem bestehenden W-Fragen-Schema in SUB_AUFGABE_QUELLENKRITIK?

**Evidenz:**

- Schema: 4-6 W-Fragen, strukturiert nach W-Frage-Kategorie (Wer, Was, Warum, Wozu, Wie, Welche Perspektive, Was fehlt).
- Auswahl-Heuristik: Material-Konstellations-Matrix (Z. 55-72).
- F0e-Fallstudie-Impulse (I2-R1): "Wer spricht hier?", "Gegen wen?", "Welche Sprache?", "Was verschleiert der Begriff?" — ENTSPRECHEN bereits dem W-Fragen-Muster.

**Antwort:** **Kompatibel, sogar förderlich.** Material-Impulse sind W-Fragen-artig formuliert und dienen direkt der Aufgaben-Subagent-Auswahl-Heuristik. Keine Kollision.

**Konkretisierung für §19:** Material-Subagent-Spezifikation "empfohlene Analyse-Richtungen" kann W-Fragen-ähnliche Formulierung nutzen. Aufgaben-Subagent akzeptiert diese als Vorschlag für Auswahl-Matrix.

## Gesamt-Bewertung

Die Paul-Vorentscheidung (Aufgaben-Subagent = Impulse-Owner) ist tragfähig. Alle fünf Implikationen sind adressierbar. Kein Blocker identifiziert.

**Kritische Voraussetzungen für PI-DATENFLUSS-IMPULSE-AUFGABE-01 (3.6b):**

1. **I1.a klären:** Volltext-Definition in VERTRAG_PHASE_2-2b erweitern: "`materialien/mat-N-X.json` vollständig inkl. `_meta.trigger_flags` und `_meta.quellenkritische_impulse`".
2. **I2 explizit:** Material-Impulse als Empfehlung-Vorschlag deklarieren, nicht als Pflicht-Raw.
3. **I3 Richtwert:** 2-3 Impulse, nicht-erschöpfend.
4. **I4 Trigger-Flags-Konsum:** Aufgaben-Subagent-Spezifikation erweitern.
5. **I5 W-Fragen-Kompatibilität:** Empfohlenes Format fürMaterial-Impulse = W-Fragen-artig.

**Blocker-Status:** KEINER. §19-Entwurf kann starten.

## Revidierte PI-DATENFLUSS-IMPULSE-AUFGABE-01

**Titel:** PI-DATENFLUSS-IMPULSE-AUFGABE-01

**Prio:** P2

**Änderungs-Scope:**

- `VERTRAG_PHASE_2-2b_AUFGABE.md` Z. 30: Eingabe-Definition "Volltext" = gesamtes Material-JSON inkl. `_meta.trigger_flags` + `_meta.quellenkritische_impulse`.
- `SUB_AUFGABE_QUELLENKRITIK.md`: Abschnitt "Auswahl-Heuristik" erweitern um Nutzung von `_meta.quellenkritische_impulse` als Vorschlag-Input; Trigger-Flag-Priming bei sensitiven Materialien.
- Material-Subagent-Spezifikation (`SUB_MATERIAL_QUELLENTEXT.md`): `_meta.quellenkritische_impulse` als "2-3 empfohlene Analyse-Richtungen (W-Fragen-artig formuliert, nicht erschöpfend)" deklarieren.

**Wirkung:** Material-Impulse werden Signal, nicht Pflicht. Aufgaben-Subagent behält Expertise-Hoheit. Daten-Flow explizit, testbar.

**Nicht-Kollision:** Keine Überschneidung mit bestehender W-Fragen-Struktur. Ergänzt statt ersetzt.

## Sign-Off

Paul — vor §19-Entwurf zu bestätigen.
