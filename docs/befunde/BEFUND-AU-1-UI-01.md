# BEFUND-AU-1-UI-01: Vergleich-Input-Zellen im Notizbuch-Handschrift-Theme schneiden Text horizontal ab

**Datum:** 2026-04-06 (Session 13, erfasst aus Session 12 Claude-Code Smoke-Test)
**Quelle:** Claude-Code Browser-Smoke-Test nach AU-1 Code-Strang Merge (`5b470c5`)
**Gefunden in:** `aufgabe-4-8` (typ=vergleich, L4) in `escape-games/gpg-erster-weltkrieg-ursachen/` Mappe 4
**Severitaet:** P2 MEDIUM (nicht blockierend, kosmetisch, Lesbarkeit eingeschraenkt)
**Status:** OFFEN
**Zuweisung:** AU-2c (UI-Fix als eigene ATOM-UNIT, entkoppelt von AU-2a/AU-2b)

---

## 1. Beobachtung

Die neuen `vergleich`-Input-Zellen (`.vergleich__zelle` innerhalb `.vergleich__raster`) rendern im Notizbuch-Handschrift-Theme korrekt im Raster-Layout, aber die Zellenhoehe ist so gewaehlt, dass laengere Nutzer-Eingaben horizontal abgeschnitten werden. Der Text laeuft nicht in die naechste Zeile, sondern verschwindet hinter dem rechten Zellen-Rand bzw. wird vom Handschrift-Overlay ueberdeckt.

Die Rendering- und Validierungslogik selbst arbeitet korrekt (`_renderVergleich` + `_checkVergleich` in `escape-engine.js`). Der Befund betrifft ausschliesslich die Darstellungsebene im Notizbuch-Handschrift-Theme (`theme-gpg.css` oder `base.css`-Ebene, zu verifizieren).

## 2. Reproduktion

1. Navigiere zu `escape-games/gpg-erster-weltkrieg-ursachen/mappe-4.html` (v=4.0)
2. Starte Aufgabe `aufgabe-4-8` (Vergleich: Geplanter vs. tatsaechlicher Kriegsverlauf, Dimensionen Dauer / Hauptgegner / Ergebnis)
3. Tippe in eine beliebige Zelle eine mittellange Eingabe (ca. 20+ Zeichen)
4. Beobachte: Zeichen am Zeilenende werden nicht umgebrochen; die sichtbare Zellenhoehe reicht nicht fuer vollstaendige Darstellung

## 3. Auswirkungen

- **Didaktik:** SuS koennen ihre Eingabe waehrend des Tippens nicht vollstaendig lesen → erschwert Selbstkontrolle vor dem Pruefen.
- **Barrierefreiheit:** WCAG 1.4.4 (Resize Text) potenziell verletzt bei vergroesserter Textdarstellung.
- **Blockierung:** Keine. `aufgabe-4-9` (Begruendung, CER-Textareas) ist nicht betroffen, da 3 separate `textarea`-Felder mit eigener Hoehen-Auto-Grow-Logik.

## 4. Vermutete Ursache (noch zu verifizieren in AU-2c)

- `.vergleich__zelle` ist vermutlich als `input[type="text"]` (single-line) modelliert oder hat eine fixe `height` ohne `overflow: visible` bzw. ohne Umstellung auf `textarea`/`contenteditable`.
- Im Notizbuch-Handschrift-Theme koennte zusaetzlich ein `background-image` (liniiertes Papier) den sichtbaren Zellen-Raum visuell beschneiden.
- Zu pruefen: `assets/css/themes/theme-gpg.css` BEM-Selektoren `.aufgabe--vergleich .vergleich__raster .vergleich__zelle` und Interaktion mit `.theme--notizbuch-handschrift` bzw. aeuivalentem Theme-Modifier.

## 5. Loesungs-Richtung (Vorschlag, nicht verbindlich)

Option A: `.vergleich__zelle` auf `textarea` umstellen (single-line via CSS, aber mit Auto-Grow bei Overflow). Konsequenz: `_renderVergleich` erzeugt `<textarea>` statt `<input>`, `_checkVergleich` unberuehrt (`.value` identisch).

Option B: Input bleibt `<input>`, aber `min-height` erhoeht + Schriftgroesse reduziert fuer Notizbuch-Handschrift-Variante + horizontal-scroll innerhalb der Zelle erlaubt.

Option C: Responsive Zellen-Groessenanpassung mittels `container-queries` abhaengig vom verfuegbaren Raster-Raum.

Entscheidung erfolgt in AU-2c nach Theme-Analyse. **Anti-Kopplung:** Fix betrifft ausschliesslich `theme-gpg.css` + ggf. minimaler `escape-engine.js`-Renderer-Anpassung (falls Option A). Kein Touch auf Check-Funktionen, kein Schema-Change, kein data.json-Patch.

## 6. Verweise

- Commit `5b470c5` (AU-1 Code-Strang, Einfuehrung `vergleich`-Renderer)
- `docs/uebergabe/UEBERGABE_PHASE_IV_WAVE_1_AU_1.md` (Engine-Kontrakt)
- `SESSION_13_MASTERPLAN.md` §3 (AU-2c Begruendung)
- `docs/architektur/vertraege/VERTRAG_ATOM_UNITS.md` (AU-2c nach Split eintragen)
