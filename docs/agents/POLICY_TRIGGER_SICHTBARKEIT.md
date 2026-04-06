# Policy — Trigger-Warnungen Sichtbarkeit (STR-12)

**Status:** FINAL (Phase IV Wave 0, K2 BLOCKING Katalog-Patch)
**Herkunft:** D15b STR-12 Optimierung + RA3 Code-Kopplung + RA6 Kontext + RA7 Datenschutz (Sichtbarkeits-Thema) + Konvergenz-Cluster Top-3 "Trigger-Warnungen Sichtbarkeit"
**Zweck:** Verbindliche Regel, dass Trigger-Warnungen ausschliesslich fuer Lehrkraefte sichtbar sind, und der technische Mechanismus, der das erzwingt.

---

## 1. Was ist eine Trigger-Warnung?

Eine Trigger-Warnung ist ein Metadatum zu einer Aufgabe, einem Material oder einer ganzen Mappe, das die Lehrkraft darauf hinweist, dass der Inhalt potentiell belastend sein kann (z.B. Gewaltdarstellung in Quellen zum 1. Weltkrieg, emotionale Reflexion zu Opfern, Kriegsursachen mit Bezug zu aktuellen Konflikten). Die Warnung enthaelt Empfehlungen fuer den Umgang, alternative Wege und Nachsorge-Hinweise.

Trigger-Warnungen sind **nicht** dazu gedacht, Schuelerinnen vor dem Inhalt zu warnen. Sie sind **paedagogisches Planungsmaterial** fuer die durchfuehrende Lehrkraft. Deshalb duerfen sie in der Schueler-View nicht erscheinen.

## 2. Das Problem

In vorherigen Versionen wurden Trigger-Warnungen im selben JSON-Feld wie andere Aufgabe-Metadaten gespeichert. Eine versehentliche CSS-Ausblendung oder ein Assembly-Fehler haette dazu gefuehrt, dass die Warnung im Schueler-DOM vorhanden, nur visuell versteckt, aber per View-Source einsehbar ist. RA3 hat das als Kopplungs-Risiko markiert, RA7 als datenschutz-angrenzendes Sichtbarkeits-Risiko.

## 3. Regel (verbindlich)

Trigger-Warnungen MUESSEN folgende Eigenschaften erfuellen:

1. **Nicht in Schueler-HTML.** Der Schueler-Assembly-Lauf (der `escape-games/*/mappe-*.html` erzeugt) darf keine Trigger-Warnungs-Felder in den finalen HTML einbauen — weder als Text, noch als `data-*`-Attribut, noch als JSON-Payload in `<script>`-Tags.

2. **Nicht in Schueler-JSON (laufzeitrelevant).** Die JSON-Dateien, die die Schueler-Engine zur Laufzeit laedt, duerfen keine Trigger-Felder enthalten. Falls Metadaten-Felder strukturell im Schema stehen, muessen sie in der Schueler-Fassung leer oder entfernt sein.

3. **Ausschliesslich in Lehrkraft-Route.** Trigger-Warnungen leben in `lehrkraft.html` und/oder einer dedizierten Lehrkraft-Assembly, die aus den vollstaendigen Produktions-JSONs (inklusive Lehrkraft-Metadaten) erzeugt wird.

4. **CSS-Ausblendung ist KEINE Implementierung dieser Regel.** `display: none` oder `visibility: hidden` sind fuer Layout, nicht fuer Sichtbarkeits-Kontrolle. Die Daten muessen physikalisch fehlen.

## 4. Technische Umsetzung

### 4.1 Produktions-JSON-Struktur

In `docs/agents/artefakte/produktion/*/aufgaben/*.json` und `materialien/*.json` darf es ein Feld `lehrkraft_meta.trigger_warnung` geben. Beispiel:

```json
{
  "id": "aufgabe-3",
  "typ": "freitext",
  "inhalt": { ... },
  "feedback": [ ... ],
  "lehrkraft_meta": {
    "trigger_warnung": {
      "schweregrad": "mittel",
      "kategorie": "kriegsfolgen",
      "hinweis": "Text mit Bezug auf Opfer-Zahlen. Empfehlung: vor der Stunde ueber Kontext sprechen.",
      "alternative": "Material mat-2 deckt den gleichen SCPL-Schritt ohne explizite Opferzahlen ab."
    },
    "didaktische_begruendung": "...",
    "bloom_ebene": "analyse"
  }
}
```

### 4.2 Assembly-Split

Die Python-Assembly in Phase 3 des Produktions-Workflows bekommt einen zweiten Ausgabepfad:

- **Schueler-Assembly** (bestehender Pfad): laedt alle JSONs, **loescht** bei jeder Aufgabe/Material das `lehrkraft_meta`-Feld, schreibt `data.json` und HTML.
- **Lehrkraft-Assembly** (neu): laedt alle JSONs, behaelt `lehrkraft_meta`, schreibt `lehrkraft-data.json` und `lehrkraft.html` (oder eine Mappe-spezifische Lehrkraft-HTML).

Der Loeschschritt in der Schueler-Assembly ist der **Enforcer** dieser Policy. Ohne ihn ist die Policy nicht wirksam.

### 4.3 Validator-Schritt

Nach der Schueler-Assembly laeuft ein Validator:
```python
def validate_no_lehrkraft_meta(mappe_json):
    for section in ["aufgaben", "materialien", "rahmen"]:
        for item in mappe_json.get(section, []):
            assert "lehrkraft_meta" not in item, \
                f"SCHUELER-ASSEMBLY ENTHAELT LEHRKRAFT-METADATEN in {item.get('id')}"
```

Scheitert der Validator, wird der Build abgebrochen und der Commit ist blockiert.

### 4.4 HTML-Ebene

Zusaetzlich pruefen: die Schueler-HTML-Templates in `escape-games/*/mappe-*.html` duerfen kein `{{ trigger_warnung }}` oder `{{ lehrkraft_meta }}` Template-Token enthalten. Eine einfache Grep-Regel im Pre-Commit-Hook:
```bash
if grep -rE 'trigger_warnung|lehrkraft_meta' escape-games/*/mappe-*.html; then
  echo "POLICY VERLETZT: Lehrkraft-Metadaten in Schueler-HTML"
  exit 1
fi
```

### 4.5 Verbindung zu _meta.trigger_flags (STR-12, Wave 3)

Ab Wave 3 setzen alle SUB_MATERIAL_*-Agenten ein `_meta.trigger_flags`-Array (erlaubte Werte: `gewalt`, `tod`, `krieg`, `diskriminierung`, `trauma`, `sexualisierte_gewalt`). Dies ist die **Produktions-Zeit-Markierung**. Die flags sind leichtgewichtig und automatisiert.

Im Assembly-Schritt werden `_meta.trigger_flags` in `lehrkraft_meta.trigger_warnung` angereichert (Schweregrad, Hinweis, Alternative). Die Schueler-Assembly loescht sowohl `lehrkraft_meta` als auch `_meta` vollstaendig — beide Ebenen sind somit durch den bestehenden §4.2 Assembly-Split abgesichert.

M-Katalog-Referenz: M15 (QUALITAETSKRITERIEN_MATERIALPRODUKTION.md).

## 5. Geltungsbereich

Ab Commit des Phase-IV-Wave-0-Bundles. Bestehende Mappen (Mappe 1-4 Erster Weltkrieg) enthalten derzeit keine Trigger-Warnungen — die Policy ist **vorwaerts wirksam** ab dem Moment, wo das erste STR-12-Trigger-Feld in einer Produktions-JSON auftaucht. Bis dahin ist der Validator-Schritt ein Safety-Net.

## 6. Beziehungen

- **Rollen-Katalog:** Diese Policy ist die harte technische Umsetzung der R1-Ausblendungs-Regeln fuer Trigger-Felder.
- **Verträge:** Ist Teil von AU-0 (Wave 0 Bootstrap) und ueberlappt mit AU-2 (Feedback-Schema) insoweit, als beide die Trennung zwischen Schueler- und Lehrkraft-sichtbaren Feldern voraussetzen.
- **Datenschutz (RA7 Nachkalibrierung):** Die technische Trennung reduziert gleichzeitig das Datenschutz-Risiko, dass sensible Inhalte unbeabsichtigt Schuelerinnen erreichen.

## 7. Audit-Verankerung

Diese Policy adressiert:
- STR-12 (D15B_OPTIMIERUNGS_STRATEGIEN.md)
- Konvergenz-Cluster Top-3 aus `D15B_PHASE_III_5_SYNTHESE.md`
- Phase-IV-Gate G-5 (`UEBERGABE_PHASE_III_5_5e.md`)
- RA7 nachkalibriertes Finding STR-12-Sichtbarkeit (P1 HIGH)

---

**Querverweise:** `ROLLEN_KATALOG.md`, `VERTRAG_ATOM_UNITS.md`, `UEBERGABE_PHASE_III_5_5e.md`.
