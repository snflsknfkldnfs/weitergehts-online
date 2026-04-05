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

Jeder SUB_AUFGABE_*.md Subagent-Prompt wird in AU-2 (Phase IV Wave 1) so angepasst, dass er `feedback` immer als Schema-Objekt bzw. Array davon ausgibt. Die Aenderung der Subagenten-Prompts ist Teil von AU-2, nicht von Wave 0 selbst — Wave 0 etabliert nur den Vertrag plus Legacy-Fallback.

## 7. Verpflichtungen Engine

`escape-engine.js` MUSS:
- Feedback immer via `normalizeFeedback()` einlesen.
- Bei Render den `typ` in visueller Kennzeichnung nutzen (Icon, Farbe, Position).
- `ebene` nicht dem Schueler anzeigen — es ist Metadatum fuer Lehrkraft-View und Progression.

## 8. Geltungsbereich

Ab Commit des Phase-IV-Wave-0-Bundles. Alle neu produzierten Aufgaben ab diesem Zeitpunkt MUESSEN das Schema erfuellen. Bestandsaufgaben werden durch Legacy-Fallback transformiert und koennen optional via Claude-Code-Run nach AU-2 endgueltig migriert werden.

---

**Querverweise:** `VERTRAG_ATOM_UNITS.md` (AU-0, AU-2), `VERTRAG_PHASE_2-2b_AUFGABE.md` (wird in AU-2 erweitert).
