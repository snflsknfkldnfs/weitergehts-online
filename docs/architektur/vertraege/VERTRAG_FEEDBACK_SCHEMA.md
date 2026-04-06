# VERTRAG — Feedback-Schema `{typ, text, ebene}`

**Status:** FINAL (Phase IV Wave 0, aktiviert 2026-04-05)
**Herkunft:** D15b Phase III.5 Konvergenz-Cluster STR-03 (RA1/RA3/RA4), V2 BLOCKING Vertrags-Patch
**Ersetzt:** Die bis Phase III verwendete String-Feedback-Konvention in Aufgaben-JSONs.

---

## 1. Problem

Bis Phase III verwendeten Aufgaben-JSONs Feedback als einfachen String: `"feedback": "Richtig! Die Antwort stimmt."`. RA3 hat identifiziert, dass damit (a) die paedagogische Ebene (Wissen, Verstaendnis, Anwendung) nicht unterscheidbar ist, (b) der Feedback-Typ (Bestaetigung, Korrektur, Hinweis, Verknuepfung) nicht typisiert ist, und (c) Subagenten-Qualitaetssicherung nicht prueffaehig war. RA4 hat die Inkonsistenz zwischen Engine-Erwartung und Subagenten-Output als BLOCKING markiert.

## 2. Neues Schema

Jedes Feedback-Feld in einer Aufgaben-JSON MUSS ab Aktivierung dieses Vertrags ein Objekt mit genau drei Pflichtfeldern sein:

```json
{
  "typ": "bestaetigung" | "korrektur" | "hinweis" | "verknuepfung",
  "text": "<String, 1-3 Saetze, direkte Anrede Schuelerinnen>",
  "ebene": "wissen" | "verstaendnis" | "anwendung" | "analyse"
}
```

### 2.1 Feld `typ`

| Wert | Verwendung |
|---|---|
| `bestaetigung` | Antwort war korrekt. Text bekraeftigt und verbindet zu naechstem Schritt. |
| `korrektur` | Antwort war falsch. Text benennt Fehler, verweist auf Material, gibt Re-Try-Impuls. |
| `hinweis` | Antwort ist teilweise korrekt oder Zwischen-Antwort. Text leitet weiter. |
| `verknuepfung` | Antwort ist korrekt, Text stellt explizite Verbindung zu anderem Mappen-Artefakt (Hefteintrag, Quelle, anderes Aufgaben-Resultat). |

### 2.2 Feld `text`

String, 1-3 Saetze. Direkte Anrede an Schuelerinnen und Schueler. Kein Lehrer-Deutsch ("die Schuelerin soll..."). Kein Meta-Kommentar ("Dieses Feedback dient dazu..."). Keine Emojis. Begrenzung auf 400 Zeichen.

### 2.3 Feld `ebene`

Ordnet das Feedback in die Bloom-Hierarchie ein, damit der Progressions-Agent die Aufgaben-Feedback-Qualitaet als Verteilung evaluieren kann.

| Wert | Bedeutung |
|---|---|
| `wissen` | Faktenerinnerung, Begriffsabruf |
| `verstaendnis` | Zusammenhaenge erklaeren, in eigenen Worten wiedergeben |
| `anwendung` | Bekanntes Wissen auf neue Situation uebertragen |
| `analyse` | Ursachen/Wirkungen unterscheiden, Quellen kritisch einordnen |

Die Ebenen `synthese` und `evaluation` sind ausserhalb des Geltungsbereichs der 7.-Klasse-Escape-Games und werden nicht verwendet.

## 3. Mehrfach-Feedback

Eine Aufgabe kann mehrere Feedback-Eintraege haben (z.B. je eines pro Antwort-Option). In diesem Fall ist `feedback` ein Array von Schema-Objekten:

```json
"feedback": [
  {"typ": "bestaetigung", "text": "...", "ebene": "verstaendnis"},
  {"typ": "korrektur", "text": "...", "ebene": "wissen"}
]
```

Die Reihenfolge im Array entspricht der Reihenfolge der Antwort-Optionen bzw. Antwort-Stufen.

## 4. Legacy-Fallback

Aufgaben-JSONs, die vor Aktivierung dieses Vertrags erstellt wurden und einen String in `feedback` haben, werden von `escape-engine.js` beim Laden via Legacy-Fallback-Funktion in das neue Schema transformiert:

```js
function normalizeFeedback(raw) {
  if (typeof raw === "string") {
    return { typ: "hinweis", text: raw, ebene: "verstaendnis" };
  }
  return raw;
}
```

Dieser Fallback ist E2 in Phase IV Wave 0 und ist Teil derselben ATOM-UNIT wie dieser Vertrag (siehe `VERTRAG_ATOM_UNITS.md` AU-0).

## 5. Validierung

Phase IV Wave 0 liefert `tools/validate-feedback-schema.js`, das alle Aufgaben-JSONs im Repo durchlaeuft und fuer jede Aufgabe prueft:

1. Pflichtfelder `typ`, `text`, `ebene` vorhanden.
2. Werte innerhalb des jeweiligen Enum.
3. `text` <= 400 Zeichen.
4. Bei Array: alle Elemente entsprechen dem Schema.

Scheitert die Validierung, wird der Pfad der fehlerhaften Datei plus Begruendung ausgegeben. Skript wird in Claude-Code-Uebergabe implementiert.

## 6. Verpflichtungen Subagenten

Jeder SUB_AUFGABE_*.md Subagent-Prompt wird in **AU-2a** (Phase IV Wave 1, gesplittet aus Ur-AU-2) so angepasst, dass er `feedback` immer als Schema-Objekt bzw. Array davon ausgibt. Die Aenderung der Subagenten-Prompts ist Teil von AU-2a, nicht von Wave 0 selbst — Wave 0 etabliert nur den Vertrag plus Legacy-Fallback.

**Querverweis AU-2a Pflichtfelder:** Der Vertrag `VERTRAG_PHASE_2-2b_AUFGABE.md` wird in AU-2a um ein Pflichtfeld `feedback` auf Aufgaben-Ebene erweitert, mit normativem Verweis auf dieses Schema und auf die Guetekriterien `GUETEKRITERIEN_AUFGABEN.md` A25 (Schema-Vollstaendigkeit) + A26 (Didaktische Feedback-Validitaet).

## 7. Verpflichtungen Engine

`escape-engine.js` MUSS:
- Feedback immer via `normalizeFeedback()` einlesen.
- Bei Render den `typ` in visueller Kennzeichnung nutzen (Icon, Farbe, Position).
- `ebene` nicht dem Schueler anzeigen — es ist Metadatum fuer Lehrkraft-View und Progression.

## 8. Geltungsbereich

Ab Commit des Phase-IV-Wave-0-Bundles. Alle neu produzierten Aufgaben ab diesem Zeitpunkt MUESSEN das Schema erfuellen. Bestandsaufgaben werden durch Legacy-Fallback transformiert und in **AU-2a** per Backfill-Generator-Dispatch (Sektion 9) endgueltig migriert.

## 9. Backfill-Generator-Spec (AU-2a)

### 9.1 Zweck

Die 24 Bestandsaufgaben aus Mappen 1-4 (`escape-games/gpg-erster-weltkrieg-ursachen/data.json`) haben Feedback-Felder, die entweder als String vorliegen oder fehlen. Der Legacy-Fallback `normalizeFeedback()` rettet die Laufzeit, liefert aber didaktisch unzureichendes Einheits-Feedback (`typ: "hinweis"`, Text = Original-String, `ebene: "verstaendnis"`). AU-2a verlangt eine einmalige, aufgabenspezifische Backfill-Operation, die didaktisch sinnvolles, bloom-tiefen-adaequates Feedback generiert und in `data.json` persistiert.

### 9.2 Vorgehen (hybrider Ansatz, User-Entscheidung E1=B)

Der Backfill wird NICHT durch Regenerate der Aufgaben erzeugt und NICHT manuell pro Aufgabe gepflegt. Stattdessen liefert ein **Auto-Generator-Dispatch-Dokument** (`docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md`, analog zum Bloom-Dispatch `BLOOM_KLASSIFIKATION_MAPPEN_1_4.md`) fuer jede der 24 Aufgaben einen Vorschlag:

- **Input pro Aufgabe:** `aufgabe_id`, `typ`, `bloom_level` (aus bestehendem Metadatum nach AU-1), `loesung`, bisheriges String-Feedback (falls vorhanden), Material-Bezug.
- **Output pro Aufgabe:** Ein vollstaendiges Feedback-Objekt bzw. Array (bei MC/Zuordnung pro Option) im Schema `{typ, text, ebene}`.

### 9.3 Regeln fuer den Generator

1. **`typ`-Auswahl:**
   - Fuer Single-Feedback (Freitext, Begruendung, Vergleich, Lueckentext-Zusammenfassung): `typ = "bestaetigung"` bei korrekter Loesungskonstruktion, ergaenzt um 1 optionalen `typ = "korrektur"`-Eintrag als Fehler-Hinweis. Bei Bloom-Level ≥ 4 zusaetzlich 1 Eintrag `typ = "verknuepfung"` zu einem Material der Mappe.
   - Fuer Multi-Feedback (MC, Zuordnung, Reihenfolge): pro Option/Position genau ein Eintrag mit `typ = "bestaetigung"` (richtig) oder `typ = "korrektur"` (falsch).

2. **`text`-Formulierung:**
   - Direkte Anrede ("du"), 1-3 Saetze, max. 400 Zeichen.
   - Korrektur-Texte benennen den Fehler konkret und verweisen auf Material.
   - Bestaetigungs-Texte bekraeftigen ohne Floskeln ("Genau"), knuepfen an das Wissens-Ziel der Aufgabe an.
   - Verknuepfungs-Texte nennen Material-ID oder Aufgaben-ID explizit.

3. **`ebene`-Zuweisung (Bloom-Projektion):**
   | `bloom_level` | `ebene` |
   |---|---|
   | 1-2 | `wissen` |
   | 3 | `verstaendnis` |
   | 4 | `anwendung` |
   | 5-6 | `analyse` |

4. **Qualitaets-Check durch Aufgaben-Autor:** Der Generator produziert Vorschlaege, die vor dem Merge durch A26 geprueft werden. Kein Auto-Merge ohne Review-Block im Dispatch-Dokument.

### 9.4 Engine-Migrations-Pfad

1. `normalizeFeedback()` bleibt im Code als Safety-Net (Legacy-Fallback).
2. Nach erfolgtem Backfill liegt `data.json` vollstaendig im Schema vor, d.h. der Fallback wird in Mappen 1-4 nicht mehr ausgeloest.
3. Optional: Log-Warnung in `normalizeFeedback()`, wenn ein String-Feedback noch gesichtet wird (Signal fuer unvollstaendigen Backfill).

### 9.5 Cache-Bust

Da AU-2a das `data.json` + `normalizeFeedback()` + ggf. Renderer-Verhalten (typ-spezifische Icons) beruehrt, muss ein Cache-Bust-Schritt Bestandteil der Uebergabe sein: `v=4.0` → `v=4.1` in allen HTML-Referenzen der Unterseite `escape-games/gpg-erster-weltkrieg-ursachen/`.

---

**Querverweise:** `VERTRAG_ATOM_UNITS.md` (AU-0, AU-2a, AU-2b), `VERTRAG_PHASE_2-2b_AUFGABE.md` (wird in AU-2a erweitert), `GUETEKRITERIEN_AUFGABEN.md` (A25, A26), `docs/agents/dispatches/FEEDBACK_BACKFILL_MAPPEN_1_4.md` (AU-2a-Artefakt).
