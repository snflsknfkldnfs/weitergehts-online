---
datum: 2026-04-23
auditor: architect-review agent (Opus 4.7)
scope: F0e PI-Items formal-strukturell
geprüfte_pi_items: 10
basis_input: F0e_PI_AUDIT_INPUT.md (Sign-Off Paul 2026-04-21)
bestandsregeln_konsultiert:
  - PROMPT_HARDENING_QUELLENTEXT.md (Overlay v1.0)
  - material_quellentext_partial_v3.10.2.json
  - VERTRAG_PHASE_2-1_MATERIAL.md
  - VERTRAG_PHASE_2-2b_AUFGABE.md
  - UPGRADE_PLAN_v3-12 (R0-R8, §19 noch leer)
  - F0e_VERGLEICHS_REVIEW.md (Roh-Runs + Paul-Feedback)
disziplin: Nur formal-strukturell. Paul-Feedback F1-F8 als Eingangs-Evidenz akzeptiert. Didaktische Bewertung out-of-scope.
---

# F0e-AEF PI-Item-Audit-Report

## 1. Executive Summary

Gesamt-Urteil: **ACCEPT_WITH_REVISIONS**.

Kernaussagen:
1. Keine der 10 PI-Items ist handwerklich so defekt, dass sie zurückgezogen werden muss; 7/10 sind mit konkreten Revisionen promotionsreif, 3/10 tragen in der aktuellen Formulierung **nicht**.
2. **Blocker: 1** — PI-PHASEN-TRENNUNG-01 kollidiert mit der bestehenden Vertragsarchitektur (VERTRAG_PHASE_2-2b hat bereits `SUB_AUFGABE_QUELLENKRITIK`). Die Formulierung "wenn Aufgaben-Generator bisher nicht existiert" ist faktisch falsch — die Phase existiert, aber der **Datenfluss** Material-`_meta.quellenkritische_impulse` → Aufgaben-Subagent ist nicht spezifiziert.
3. **Major: 2** — PI-CONTENT-LENGTH-01 (hartes 150W-Cap ohne Korridor/Ausnahme-Klausel setzt Informationsverlust-Risiko) und PI-QUELLE-SSOT-01 (Regex-Muster zu eng gefasst, False-Negatives durch Inline-Jahreszahlen).
4. **Minor: 3** — PI-MULTIPERSPEKTIVE-INHALT-01 (Redundanz-Risiko gegenüber PI-PHASEN-TRENNUNG-01), PI-TRIGGERFLAG-ENUM-01 (Enum-Werte fehlen als Ausformulierung), PI-META-BEZEICHNUNG-01 (ohne operationalen Test nicht durchsetzbar).
5. Coverage: F1-F8 durchgängig adressiert, aber **F7 nur schwach durchsetzbar**. Enforceability: 4/10 Items hängen an Priming-Empfehlung ohne Gate → schwache Durchsetzung.
6. Second-Order: PI-CONTENT-LENGTH-01 bei 150W-Hart-Cap trifft I2-R1 (didaktisch stark) — Qualitätsrückschritt möglich, wenn Cap ohne Content-Tiefe-Erhalts-Klausel.

Blocker-Count: **1**. Major: **2**. Minor: **3**. OK ohne Änderung: **4**.

---

## 2. Findings-Tabelle je PI-Item

| # | PI-Item | Status | 1-Satz-Begründung | Problematische Dimension(en) |
|---|---|---|---|---|
| 3.1 | PI-SCHEMA-STRICT-01 + D6-Addition | OK | D6 ist Typ-Kontrakt-Verschärfung innerhalb bestehender Partial-Schema-Logik, vollständig konsistent. | — |
| 3.2 | PI-CONTENT-LENGTH-01 (150 W) | REVISE | Hart-Cap ohne Content-Tiefe-Erhalts-Klausel birgt Informationsverlust-Risiko bei komplexen Quellen wie mat-4-3. | Proportionalität, Second-Order |
| 3.3 | PI-MULTIPERSPEKTIVE-INHALT-01 | REVISE | Geht bei angenommener PI-PHASEN-TRENNUNG-01 auf; als eigenständiges Item redundant. | Coverage (Überlappung) |
| 3.4 | PI-TRIGGERFLAG-ENUM-01 | REVISE | Deferred-Status akzeptabel, aber Enum-Katalog nicht spezifiziert → in aktueller Form nicht promotionsfähig. | Enforceability |
| 3.5 | PI-ZIELGRUPPE-PROFIL-01 | OK | Input-Schema-Erweiterung ist kohärent mit VERTRAG_PHASE_2-1 Read-Step-Architektur. | — |
| 3.6 | PI-PHASEN-TRENNUNG-01 | BLOCK | Konflikt mit bestehender Architektur: Aufgaben-Generator-Phase (2.2b) existiert bereits mit SUB_AUFGABE_QUELLENKRITIK; die Formulierung im PI-Item ignoriert diese Tatsache. | Konsistenz, Enforceability |
| 3.7 | PI-QUELLE-SSOT-01 | REVISE | Regex-Vorschlag zu eng, fehlende Behandlung von Primärquellen-Inline-Attribution (I2-R1 Blockquote-Attribution). | Enforceability |
| 3.8 | PI-FACHWORT-ERKLAERUNG-01 | OK | Priming-Regel mit klarer R7-Referenzbasis, Abhängigkeit zu PI-ZIELGRUPPE-PROFIL-01 korrekt deklariert. | — |
| 3.9 | PI-NACHWEIS-DRAMATURGIE-01 | OK | 3-Schritt-Struktur sauber formuliert, als P3-Priming tragfähig; kein Gate nötig. | — |
| 3.10 | PI-META-BEZEICHNUNG-01 | REVISE | Ohne operationalen Accept/Reject-Test nicht durchsetzbar; Empfehlung-only trotz Priorisierung. | Enforceability |

---

## 3. Coverage-Matrix (5 Strukturursachen × 10 PI-Items)

Die Strukturursachen stammen aus F0e_VERGLEICHS_REVIEW.md §Strukturursachen. Zusätzlich wird F7 (positives Muster) und F8 (D6-Schema-Typ-Kontrakt) als eigene Zeilen geführt.

| Strukturursache | 3.1 Schema | 3.2 Length | 3.3 Multipersp | 3.4 Trigger | 3.5 Zielgruppe | 3.6 Phasen | 3.7 Quelle-SSOT | 3.8 Fachwort | 3.9 Dramaturgie | 3.10 MetaBezeich |
|---|---|---|---|---|---|---|---|---|---|---|
| U1 Kein Lerngruppen-Profil (F1) | | | | | PRIMARY | | | SECONDARY (dep.) | | |
| U2 Keine Phasen-Trennung (F3, F5) | | | SECONDARY | | | PRIMARY | | | | |
| U3 Kein SSOT Quellenangabe (F2) | | | | | | | PRIMARY | | | |
| U4 Keine harte Wortanzahl-Grenze (F4) | | PRIMARY | | | | | | | | |
| U5 Keine Nachweis-Dramaturgie (F6) | | | | | | | | | PRIMARY | |
| F7 Positives Muster (MetaBez.) | | | | | | | | | | PRIMARY |
| F8 Schema-Typ-Kontrakt D6 | PRIMARY | | | | | | | | | |

**Lücken-Analyse:**
- **Keine Lücke bei U1-U5 + F7 + F8:** Jede Strukturursache hat mindestens ein PRIMARY-PI-Item.
- **Redundanz U2:** PI-PHASEN-TRENNUNG-01 (PRIMARY) und PI-MULTIPERSPEKTIVE-INHALT-01 (SECONDARY) überlappen; letzteres ist Teilmenge. → Konsolidierung empfohlen (siehe 3.3).
- **Abhängigkeits-Korrektheit:** PI-FACHWORT-ERKLAERUNG-01 dependiert korrekt auf PI-ZIELGRUPPE-PROFIL-01 (F1 geht sonst im Leeren).
- **Unadressiert — potentielle sechste Ursache:** Kein PI-Item adressiert die von Paul beobachtete Dramaturgie-Überladung in I2-R3 (drei Layer: Nachweis + Fußnote + Denkanstoss). PI-NACHWEIS-DRAMATURGIE-01 trifft nur die Binnenstruktur eines Absatzes, nicht die Absatz-Anzahl oder Layer-Anzahl. **Offene Folgeprüfung F-A1:** Strukturlimit "max 3 Text-Elemente (Einleitung + Quellen-Block + Nachweis)" fehlt.

---

## 4. Konflikt-Matrix (PI-Items × Bestandsregeln)

Legende: **KOLLISION** (widerspricht), **KOMPATIBEL** (koexistiert ohne Änderung), **ERGÄNZUNG** (erweitert Bestandsregel konsistent), **OVERRIDE** (ersetzt Bestandsregel bewusst).

### 4.1 PI × Bestandsregeln (extern)

| PI-Item | Overlay v1.0 | Partial-Schema | VERTRAG_2-1 | VERTRAG_2-2b | MATERIAL_PIPELINE (SUPERSEDED) |
|---|---|---|---|---|---|
| 3.1 Schema-Strict + D6 | ERGÄNZUNG (§1 um Typ-Hinweise) | KOMPATIBEL (D6-Regel ist bereits impliziter Partial-Schema-Kontrakt, Zeilen 65-68) | KOMPATIBEL | KOMPATIBEL | n/a |
| 3.2 Content-Length 150W | ERGÄNZUNG (neuer §6 Q-Gate) | KOMPATIBEL (wortanzahl-Feld existiert, derzeit nur ≥0, neue Obergrenze ist Q-Gate-Ebene) | ERGÄNZUNG (MQ-Katalog §7.1) | KOMPATIBEL | n/a |
| 3.3 Multiperspektive-Inhalt | KOMPATIBEL | KOMPATIBEL | KOMPATIBEL | KOMPATIBEL | n/a |
| 3.4 Triggerflag-Enum | ERGÄNZUNG (§1 um trigger_flags-Enum) | ERGÄNZUNG (items.enum einzuführen) | KOMPATIBEL | KOMPATIBEL | n/a |
| 3.5 Zielgruppen-Profil | KOMPATIBEL | KOMPATIBEL | ERGÄNZUNG (neuer Read-Step 0 für Lerngruppen-Profil, analog zu Step 1b Sequenzkontext) | KOMPATIBEL | n/a |
| 3.6 Phasen-Trennung | KOMPATIBEL mit §4 | KOMPATIBEL | **KOLLISION** (siehe Detail §7.6) | **KOLLISION** (SUB_AUFGABE_QUELLENKRITIK existiert bereits) | n/a |
| 3.7 Quelle-SSOT | ERGÄNZUNG (neue Verbots-Regel in Overlay §1) | KOMPATIBEL | ERGÄNZUNG (MQ-Katalog) | KOMPATIBEL | n/a |
| 3.8 Fachwort-Erklärung | ERGÄNZUNG (konditionale Priming-Regel) | KOMPATIBEL | KOMPATIBEL | KOMPATIBEL | n/a |
| 3.9 Nachweis-Dramaturgie | ERGÄNZUNG (Priming-Muster in §4) | KOMPATIBEL | KOMPATIBEL | KOMPATIBEL | n/a |
| 3.10 Meta-Bezeichnung | ERGÄNZUNG (Priming-Beispiel) | KOMPATIBEL | KOMPATIBEL | KOMPATIBEL | n/a |

### 4.2 PI × PI-Konflikte intern

| ↓ betroffen \ auslösend → | 3.1 | 3.2 | 3.3 | 3.6 | 3.7 | 3.8 |
|---|---|---|---|---|---|---|
| 3.2 Content-Length 150W | | | | **SPANNUNG** (3.6 streicht Impuls-Listen aus `inhalt` → weniger Inhalt → 150W wird leichter erreicht; bei I2-R1 Szenario führt 3.6+3.2 kombiniert aber zu Omaheke-/Mai-2021-Verlust) | | |
| 3.3 Multipersp-Inhalt | | | | **REDUNDANZ** (vollständig abgedeckt) | | |
| 3.6 Phasen-Trennung | | | | | **KOMPATIBEL** (ergänzend) | |
| 3.8 Fachwort-Erklärung | | **SPANNUNG** (3.8 verlangt Inline-Erklärungen "3-8 Wörter" → verbraucht Wortkontingent, steht gegen 3.2 Hart-Cap 150W, bes. bei hohem DaZ-Anteil) | | | | |

**Bewertung:** Die zwei SPANNUNGEN (3.6↔3.2 und 3.8↔3.2) sind beide auf das 150W-Hart-Cap zurückführbar. Lösbar über Revision von 3.2 zu abgestuftem Cap mit Ausnahme-Klausel (siehe §7.2).

---

## 5. Enforceability-Tabelle

| PI-Item | Durchsetzungs-Mechanismus | Trägt der Mechanismus? | Accept/Reject-Test-Vorschlag |
|---|---|---|---|
| 3.1 Schema-Strict + D6 | Schema-Validator (deterministisch) | Ja | JSON-Schema-Validation gegen Partial v3.10.2; bereits existierende `items.type:"string"` in `quellenkritische_impulse` (Zeile 65-68) triggert FAIL bei String statt Array |
| 3.2 Content-Length 150W | Q-Gate (deterministisch: Token-/Wortzählung) | Ja — technisch, aber fragil (siehe Revision) | `count_words(inhalt, strip_html=true) ≤ 150` → PASS, ≤ 130 WARN, > 150 FAIL |
| 3.3 Multipersp-Inhalt | Priming (Regex-Gate schwach möglich: Fragezeichen-Zählung in `inhalt`) | Teilweise — besser in 3.6 aufgehen lassen | Falls eigenständig: `count('?', inhalt) ≤ 1` |
| 3.4 Triggerflag-Enum | Schema-Enum (deterministisch) | Ja — sobald Enum-Katalog spezifiziert ist | `trigger_flags[i] in ENUM_SET` |
| 3.5 Zielgruppen-Profil | Input-Schema-Kontrakt + Priming | Ja | Dispatch-Input `lerngruppen_profil: {daz_anteil: enum, niveau: enum}` Pflichtfeld |
| 3.6 Phasen-Trennung | Overlay (Verbots-Regeln) + Q-Gate (Regex) + Pipeline-Kontrakt | Teilweise — siehe Detail | Regex `<p>.*\b(Denk nach|Denkanstoss|Überleg|Vergleiche dich)\b` im `inhalt` → FAIL |
| 3.7 Quelle-SSOT | Q-Gate (Regex) | Teilweise — Regex-Katalog muss sorgsam gewählt werden | siehe Revision §7.7 |
| 3.8 Fachwort-Erklärung | Priming + optional LLM-Judge | Nein direkt — nur über Priming durchsetzbar, Gate setzt Fachwort-Klassifikator voraus | Empfehlung: qualitatives Q-Gate mit LLM-Judge im Nachbesserungs-Modus |
| 3.9 Nachweis-Dramaturgie | Priming | Teilweise — qualitativ, nicht hart testbar | Empfehlung: Priming-Muster + Positiv-/Negativ-Beispiele in Overlay |
| 3.10 Meta-Bezeichnung | Priming | **Nein hart** — benötigt Positiv-Muster-Bibliothek | Empfehlung: Priming-Beispielkatalog "'Historiker nennen...', 'Die Wissenschaft spricht von...'" |

**Tragfähigkeit-Bewertung:** 4/10 (3.1, 3.2, 3.4, 3.5) sind **deterministisch** durchsetzbar. 3/10 (3.6, 3.7, 3.3) sind **teil-deterministisch** (Gate + Priming-Kombination nötig). 3/10 (3.8, 3.9, 3.10) sind **nur Priming** — ohne Positiv-Muster-Bibliothek + ggf. LLM-Judge bleiben sie Empfehlung.

---

## 6. Nicht verwendet

(Abschnitt bewusst leer — Dokumentstruktur sieht 8 Hauptabschnitte vor.)

---

## 7. Detail-Findings (nur problematische Items)

### 7.2 PI-CONTENT-LENGTH-01 — REVISE

**Befund:** Das PI-Item legt **150 W hart** fest (Zeile 70 Audit-Input). Paul-Feedback zu I2-R1 (218 W, inhaltlich stark) explizit: "Eine Kuerzung darf Content-Tiefe NICHT reduzieren — nur Textdichte/Redundanz verringern" (F0e_VERGLEICHS_REVIEW.md Zeile 157).

Problem: Hart-Cap 150 W für mat-4-3 erzwingt Streichung von (a) Omaheke-Wüsten-Kontext oder (b) Opferzahlen (80.000 → 15-20.000) oder (c) Mai-2021-Anerkennung. Alle drei sind laut Paul didaktisch substantiell. Ein Hart-Cap ohne Content-Tiefe-Erhalts-Klausel steht im Widerspruch zur Paul-Anweisung.

Zusätzlich: SPANNUNG mit 3.8 Fachwort-Erklärung (bei DaZ-Profil Inline-Glossierung "3-8 Wörter je Fachwort" verbraucht Wortkontingent).

**Revisions-Vorschlag:**
1. Zweistufiges Cap: **Ziel 120 W**, **Hart-Cap 150 W**, **Ausnahme-Cap 180 W** bei Dokumentation in `_meta.content_tiefe_begruendung` (Pflichtfeld nur im Ausnahme-Modus) mit Liste der nicht-kompressibler Kern-Aussagen.
2. Q-Gate-Staffel: ≤ 120 W PASS, ≤ 150 W PASS+WARN (weich), ≤ 180 W PASS nur bei gesetztem `content_tiefe_begruendung`, sonst FAIL, > 180 W FAIL immer.
3. Revised Priorität: bleibt P1, aber Revisions-Klausel ist Teil des §19-Eintrags.

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 68-70, F0e_VERGLEICHS_REVIEW.md Zeile 157.

### 7.3 PI-MULTIPERSPEKTIVE-INHALT-01 — REVISE

**Befund:** Audit-Input Zeile 75 sagt selbst: "Streichung als eigenes PI-Item erwogen, wenn Phasen-Trennung die Funktion abdeckt". Coverage-Matrix §3 bestätigt: PI-PHASEN-TRENNUNG-01 adressiert U2 als PRIMARY, PI-MULTIPERSPEKTIVE-INHALT-01 ist SECONDARY zur selben Ursache.

Konkret: Die Regel "P3 als Aussagesatz, nicht als Frage" ist Teilmenge der Verbots-Regel aus 3.6 "direkte Leserfragen mit Fragepronomen". Zwei PI-Items für dieselbe Regel erzeugen Regel-Dopplung und Gate-Konfiguration-Komplikation.

**Revisions-Vorschlag:**
- **Streichen** als eigenständiges PI-Item.
- Übernahme des Aussagesatz-Gedankens in 3.6 als zusätzliches Positiv-Muster: "Gegen-Perspektiven werden als Aussagesätze in erzählender Prosa verankert, nicht als rhetorische Frage an Leser".
- Priorisierung in §19: entfällt.

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 72-76, §3 Coverage-Matrix.

### 7.4 PI-TRIGGERFLAG-ENUM-01 — REVISE

**Befund:** Audit-Input Zeile 78-79: "optional, deferred ... bleibt wie im F0e-Befund". Die konkrete Enum-Wertemenge ist nirgends im Audit-Input spezifiziert. Im Overlay v1.0 erscheinen Beispiel-Flags (`Kolonisierung`, `Gewalt`, `Macht-Asymmetrie`, `Ueberwaeltigungsverbot-sensibel`, `Primaerquellen-Ausnahme-aktiv`), aber nicht als normative Enum.

Ohne Enum-Katalog ist das PI-Item nicht promotionsfähig. Deferred-Status ist akzeptabel, aber in aktueller Form nicht als §19-Eintrag formulierbar.

**Revisions-Vorschlag:**
- Scope des PI-Items erweitern: "Enum-Katalog-Spezifikation als Teil-Task des PI-Items". Kandidaten-Liste aus bisherigen Run-Outputs sammeln, Normalisierung (z.B. `Ueberwaeltigungsverbot-sensibel` vs `Ueberwaeltigungsverbot_sensibel` — Unterstrich vs. Bindestrich-Inkonsistenz in den Runs beobachtet), dann Schema-Enum + Migration-Mapping.
- Alternative: Item aus §19 herausnehmen und in eigenen Mikro-Spike verschieben. Begründung: in aktueller Rohform nicht auditierbar.

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 78, F0e_VERGLEICHS_REVIEW.md Zeile 50, 79, 107, 137 (Flag-Listen pro Run).

### 7.6 PI-PHASEN-TRENNUNG-01 — BLOCK

**Befund (Haupt-Blocker):**

Audit-Input Zeile 93 formuliert: "ggf. Pipeline-Architektur (wenn Aufgaben-Generator bisher nicht existiert)". Diese Formulierung ist **faktisch falsch**:

1. `VERTRAG_PHASE_2-2b_AUFGABE.md` Zeile 10-22 definiert 8 Aufgaben-Subagenten, darunter `SUB_AUFGABE_QUELLENKRITIK` (Bloom L3-L5, Kernexpertise: "W-Fragen-Systematik, Perspektiv-Reflexion").
2. `VERTRAG_PHASE_2-2b_AUFGABE.md` Zeile 138: `typ=quellenkritik` mit Output-Format `{<w-fragen-schluessel>: "<Musterantwort>"}`.
3. Die Aufgaben-Generator-Phase ist also NICHT neu aufzubauen — sie existiert mit Q-Gates A1-A7, A22-A26.

Problem: Das PI-Item setzt voraus, dass `_meta.quellenkritische_impulse` → Aufgaben-Subagent fließt. Aber dieser Datenfluss ist in VERTRAG_PHASE_2-2b Read-Schritt 2 ("Ziel-Material .json lesen (Volltext)") zwar technisch möglich, aber **nirgends als verbindlicher Datenpfad** spezifiziert. Die Impulse werden bisher nicht als Input für SUB_AUFGABE_QUELLENKRITIK konsumiert — das ist die reale Lücke, nicht das Fehlen einer Phase.

Zusätzlich: Konflikt mit VERTRAG_PHASE_2-1_MATERIAL Zeile 179-184 — der Dispatcher ergänzt Struktur-Felder NACH der Subagenten-Rückgabe. Wenn PI-PHASEN-TRENNUNG-01 verlangt, dass Impulse "in der Aufgaben-Generator-Stufe erzeugt" werden, wirft das die Frage auf: **Erzeugt SUB_AUFGABE_QUELLENKRITIK die Impulse selbst (eigene W-Fragen) oder konsumiert es die im Material deklarierten `quellenkritische_impulse`?** Die Audit-Input-Formulierung beantwortet dies nicht.

Weiterer Konsistenz-Bruch: Partial-Schema Zeile 65-68 deklariert `quellenkritische_impulse` als optionales Array-Feld. Wenn das Feld vollständig in die Aufgaben-Phase verschoben wird, wäre es aus dem Material-Schema zu entfernen. Wenn es erhalten bleibt aber "nicht im `inhalt`" lauten soll, dann ist die tatsächliche Regel `inhalt` enthält keine direkten Leserfragen — und das ist semantisch identisch mit Teilen von 3.3.

**Blocker-Begründung:** PI-Item in aktueller Form ist nicht als §19-Eintrag übernehmbar, weil:
- es einen "Aufgaben-Generator" als nicht-existent behauptet, der existiert,
- es den Datenfluss Material→Aufgabe nicht spezifiziert,
- es die Frage "wer erzeugt die Impulse — Material oder Aufgabe" offen lässt,
- es keine Migrations-Strategie für das bestehende Material-Schema-Feld `_meta.quellenkritische_impulse` enthält.

**Lösungsweg (Vorschlag, pflichtig vor Promotion):**

Das PI-Item in zwei separate Items aufteilen:

**PI-INHALT-PROSA-ONLY-01** (Overlay-Regel, P1):
- `inhalt` enthält AUSSCHLIESSLICH Einleitung + Zitat/Rekonstruktion + Nachweis-Absatz als erzählende Prosa.
- Verbot: Leserfragen mit Fragepronomen am Satzanfang; Verbots-Regex `^<p>.*\b(Denk nach|Denkanstoss|Überleg dir|Wie würdest|Was denkst|Vergleiche)\b` → FAIL.
- `_meta.quellenkritische_impulse` bleibt im Material-Schema (Array-Struktur), wird aber als Upstream-Input für `SUB_AUFGABE_QUELLENKRITIK` genutzt, nicht im `inhalt` gerendert.
- Durchsetzung: Overlay + Q-Gate Regex.

**PI-DATENFLUSS-IMPULSE-AUFGABE-01** (Vertrags-Regel, P2):
- Erweiterung VERTRAG_PHASE_2-2b Read-Schritt 2: Bei `typ=quellenkritik` Aufgaben-Subagent liest zusätzlich `_meta.quellenkritische_impulse` aus dem referenzierten Material-JSON.
- Klärung: SUB_AUFGABE_QUELLENKRITIK darf Impulse **adaptieren/ergänzen**, aber die Material-Seite liefert die Primär-Impulse.
- Durchsetzung: Read-Step-Erweiterung im Vertrag + Accept-Test "Aufgabe referenziert mindestens N Impulse".

Dies löst den Blocker; nach der Aufteilung ist der ursprüngliche Scope sauber auditierbar.

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 88-93, VERTRAG_PHASE_2-2b_AUFGABE.md Zeile 10-22, 138, VERTRAG_PHASE_2-1_MATERIAL.md Zeile 178-184, Partial-Schema Zeile 65-68.

### 7.7 PI-QUELLE-SSOT-01 — REVISE

**Befund:** Audit-Input Zeile 98 schlägt Regex vor: `"Zitiert nach|Quelle:|Wikipedia|Autor-Nachname gefolgt von Datum"`.

Problem 1: Zu eng. I2-R2 hat Inline-Verweis `"Quelle: Trotha, Lothar von: Proklamation vom 2. Oktober 1904, zitiert nach Wikipedia DE..."` direkt im `inhalt`-Nachweis-Absatz — das würde das Regex treffen. Aber I2-R1 hat `(Generalleutnant Lothar von Trotha, sogenannter "Vernichtungsbefehl", Oktober 1904)` als Blockquote-Attribution — das ist historiografisch korrekt und NICHT dieselbe SSOT-Verletzung; es ist Primärquellen-Anker.

Problem 2: "Autor-Nachname gefolgt von Datum" ist ein False-Positive-Generator. Jeder Fließtext mit "Trotha im Oktober 1904" (narrative Nennung, nicht Bibliografie-Angabe) würde fälschen.

Problem 3: I2-R3 hat zusätzlich Fußnote `¹ Zitiert nach: Wikipedia...` — das ist struktureller Overhead, nicht reine SSOT-Verletzung, sondern eine **dritte Layer-Ebene** (siehe auch offene Folgeprüfung F-A1 in §3).

**Revisions-Vorschlag:**
1. Regex präzisieren, Scope eingrenzen:
   - FAIL nur bei Auftreten innerhalb `<p>`-Elementen (Nachweis-Absatz), NICHT innerhalb `<blockquote>` (Blockquote-Attribution als Primärquellen-Anker erlaubt).
   - Regex-Liste: `\bZitiert nach\b`, `\bQuelle:\s`, `\bWikipedia\b` (im `<p>`-Kontext), `\bvgl\.\s`, `\bebd\.\b`.
   - Kein "Nachname+Datum"-Pattern (zu unpräzise).
2. Zusätzlich: Verbots-Regel gegen Fußnoten im `inhalt` (Unicode-Hochgestellt-Ziffern: `[¹²³⁴⁵⁶⁷⁸⁹⁰]` ODER `<sup>`-Tag) → dadurch wird I2-R3-Layer-Überladung mit-adressiert.
3. Positivliste: In `<blockquote>`-Element ist Attribution in Klammern erlaubt (Primärquellen-Nachweis-Konvention).

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 98, F0e_VERGLEICHS_REVIEW.md Zeile 65-66 (I2-R1 Blockquote-Attribution), Zeile 95 (I2-R2 Inline-Quelle im Nachweis), Zeile 127 (I2-R3 Fußnote).

### 7.10 PI-META-BEZEICHNUNG-01 — REVISE

**Befund:** Audit-Input Zeile 115-119: "Historische Begriffe mit sprachlicher Autoritaets-Markierung einfuehren". Priorisierung P3, "weak".

Enforceability-Problem: Das Muster ist qualitativ ("Historiker nennen...", "Die Wissenschaft spricht von..."). Ohne operationalen Test bleibt es Priming-Empfehlung ohne Gate. Bei P3 wäre das akzeptabel — aber auch Priming braucht konkrete Positiv-Beispiel-Bibliothek, sonst wird das Muster im Priming nur emergent reproduziert (genau wie in I2-R2, wo es bereits emergent auftrat).

**Revisions-Vorschlag:**
- Priming-Erweiterung in Overlay (§4 "Was UNVERÄNDERT gilt") um Abschnitt: "Positiv-Muster Begriffs-Rahmung" mit 3-5 Beispielen aus Fachhistoriografie ("Historiker nennen X heute...", "Die Forschung bezeichnet Y als...", "Seit Z-Jahr spricht die Wissenschaft von...").
- Konkreter Accept-Test (soft): Bei Begriffen aus `trigger_flags` mit Kontext-Bezug `Ueberwaeltigungsverbot*` SOLL (nicht MUSS) mindestens eine Autoritäts-Markierung vorhanden sein. LLM-Judge als optionales Q-Gate (nicht blockierend).
- Priorität bleibt P3. Streichen nicht nötig, aber ohne Beispiel-Bibliothek nicht wirkungsvoll.

**Quelle:** F0e_PI_AUDIT_INPUT.md Zeile 115-119, F0e_VERGLEICHS_REVIEW.md Zeile 91 (I2-R2 emergent).

---

## 8. Finale Empfehlung

### 8.1 Ohne Änderung übernehmbar (4 Items)

Diese können unverändert in UPGRADE_PLAN v3-12 §19 promotiert werden:

| PI-Item | Priorität | Durchsetzung |
|---|---|---|
| PI-SCHEMA-STRICT-01 + D6-Addition | P1 | Schema-Gate (deterministisch) |
| PI-ZIELGRUPPE-PROFIL-01 | P2 | Input-Schema + Priming |
| PI-FACHWORT-ERKLAERUNG-01 | P2 (deps 3.5) | Priming (mit R7-Referenz) |
| PI-NACHWEIS-DRAMATURGIE-01 | P3 | Priming |

### 8.2 Mit Pflicht-Revision übernehmbar (4 Items)

| PI-Item | Revision | Detail |
|---|---|---|
| PI-CONTENT-LENGTH-01 | Zweistufiger Cap + Content-Tiefe-Begründung | §7.2 |
| PI-QUELLE-SSOT-01 | Regex präzisieren, Scope auf `<p>` eingrenzen, Fußnoten-Verbot ergänzen | §7.7 |
| PI-TRIGGERFLAG-ENUM-01 | Enum-Katalog spezifizieren oder aus §19 nach Mikro-Spike vertagen | §7.4 |
| PI-META-BEZEICHNUNG-01 | Positiv-Beispiel-Bibliothek im Overlay ergänzen | §7.10 |

### 8.3 Grundlegende Überarbeitung erforderlich (2 Items)

| PI-Item | Aktion | Begründung |
|---|---|---|
| PI-PHASEN-TRENNUNG-01 | **BLOCK**: vor §19-Update Aufteilung in PI-INHALT-PROSA-ONLY-01 + PI-DATENFLUSS-IMPULSE-AUFGABE-01 | §7.6; Kollision mit VERTRAG_PHASE_2-2b (existierendem SUB_AUFGABE_QUELLENKRITIK) muss vor Promotion aufgelöst werden |
| PI-MULTIPERSPEKTIVE-INHALT-01 | **STREICHEN** als eigenständiges Item | §7.3; redundant zu PI-PHASEN-TRENNUNG-01 (bzw. dessen Revision PI-INHALT-PROSA-ONLY-01) |

### 8.4 Offene Folgeprüfungen

- **F-A1** (aus §3 Coverage-Lücke): Prüfen, ob ein **Struktur-Layer-Limit** nötig ist (max Anzahl Text-Elemente / Layer im `inhalt`). I2-R3 zeigt drei Layer (Nachweis + Fußnote + Denkanstoss), die einzeln Regeln umgehen, aber in Summe strukturell überladen. Nicht in den 10 PI-Items adressiert. → PI-Kandidat für Folge-Iteration oder ergänzendes Mikro-Item in §19.
- **F-A2** (aus §7.4): Trigger-Flag-Inkonsistenz (`Ueberwaeltigungsverbot-sensibel` vs `Ueberwaeltigungsverbot_sensibel`) — Normalisierungs-Entscheidung vor Enum-Katalog-Festlegung nötig.
- **F-A3** (aus §7.6): Klärung vor Aufteilung von 3.6 — wer ist **primärer Erzeuger** der Impulse (Material-Subagent oder Aufgaben-Subagent)? Entscheidung hat Folge für Material-Schema (Feld behalten oder entfernen).
- **F-A4** (aus §4.2): Nach Revision von 3.2 (zweistufiger Cap) prüfen, ob SPANNUNG mit 3.8 ausreichend entschärft ist. Eventuell Ausnahme-Cap 180 W bei DaZ-Profil=high pauschal setzen.

### 8.5 Disposition §19-Update

Vor §19-Eintragung in UPGRADE_PLAN v3-12 sind folgende Schritte in Reihenfolge nötig:

1. Entscheidung **F-A3** durch Paul / Architekt: Wer erzeugt quellenkritische Impulse primär.
2. **Aufteilung** PI-PHASEN-TRENNUNG-01 in zwei nachfolge-PI-Items (siehe §7.6).
3. **Streichung** PI-MULTIPERSPEKTIVE-INHALT-01 aus PI-Liste.
4. **Revision-Einarbeitung** in 3.2, 3.4, 3.7, 3.10 (siehe §8.2).
5. Erst danach §19-Textblock formulieren.

Erwartete finale PI-Anzahl im §19-Block: **10 → 10** (1 gestrichen, 1 aufgeteilt in 2) oder **10 → 9** falls 3.4 in Mikro-Spike wandert.

---

**Audit-Abschluss:** 2026-04-23, architect-review agent.
