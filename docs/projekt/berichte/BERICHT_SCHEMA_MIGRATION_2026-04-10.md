# Bericht: Schema-Migration mat-*.json (T2 Akzeptanzkriterium 2)

**Datum:** 2026-04-10
**Auslöser:** UPGRADE_PLAN_v3-10 T2 (Schema-Meta-Harden + Q2-Migration manuell).
**Werkzeug:** `jsonschema.Draft7Validator` gegen `architektur/schemata/material-output-schema.json` (v3.10.2).
**Scope:** Alle 22 `mat-*.json` unter `docs/agents/artefakte/`.
**Strict-Regel:** Kein `_meta`-Strip, keine Default-Füllung, keine Filter — direkte Validation des unveränderten Files.

## Gesamtbild

| Metrik | Wert |
|---|---|
| Total | 22 |
| PASS | 1 (`verlauf/mappe-2/mat-2-1.json` — bereits migriert, T2.E) |
| FAIL | 21 |
| Fehler-Instanzen gesamt | 125 |

Akzeptanzkriterium 2 des UPGRADE_PLAN_v3-10 T2 verlangt "Strict-Validation ohne FAIL **oder mit klarer TODO-Liste**". Dieser Bericht ist die TODO-Liste. Er ersetzt keinen Q-Gate-Lauf — die betroffenen Mappen sind bereits auf einem früheren State-Advance-Stand (vor v3.10.2) und fallen unter die Q4-Vorwärts-Entscheidung: Der neue Strict-Validator wirkt **ab sofort für neue Produktionsläufe**; der Bestand wird nicht retroaktiv neu validiert und nicht rückwärts blockiert.

## Fehler-Kategorisierung

### Kategorie A — Reine `_meta`-Defekte (T2-Scope, Kern-Zielscheibe)

Felder die das neue Schema `$defs/MaterialMeta` verlangt und die bisher fehlten (weil Strip-Bypass sie unsichtbar hielt):

- `_meta` komplett fehlend (nur Top-Level-Lücke) — **gpg-M3 × 5 Files**
- `_meta.wortanzahl` fehlt
- `_meta.perspektive` fehlt
- `_meta.artefakt_ref` fehlt
- `_meta.trigger_flags` fehlt
- `_meta.rekonstruktions_begruendung` fehlt (ausgelöst durch `aufbereitung != "echt"`; mangels Feld triggerte das if/then/else-Constraint)

Diese Defekte waren bis v3.10.1 unsichtbar, weil Dispatch Schritt 10 `_meta` vor der Validation gestrippt hat (H1/N2-Defekt). Schema-Härtung T2 macht sie sichtbar. **Pro Datei <= 5 Minuten Migrationsaufwand**, mechanisch.

### Kategorie B — Enum-Werte außerhalb Schema-Vokabular

Pre-existing Content, der Werte verwendet, die nicht im Schema-Enum stehen:

| Feld | Falscher Wert | Zulässig |
|---|---|---|
| `_meta.quellentyp` | `"vertrag"` (gpg-M2-4) | `verordnung|brief|tagebuch|zeitungsartikel|amtlich|augenzeugenbericht|propaganda|statistik|sonstiges` |
| `_meta.quellentyp` | `"zeugnis"` (verlauf-M1-4) | ⇒ `augenzeugenbericht` oder `tagebuch` |
| `_meta.aufbereitung` | `"original"` (verlauf-M1-1) | `echt|rekonstruiert|uebersetzt|vereinfacht|gemischt` — ⇒ `echt` |
| `_meta.aufbereitung` | `"paraphrase"` (gpg-M2-4) | ⇒ `vereinfacht` oder `rekonstruiert` |

Entscheidung notwendig: Enum erweitern (z. B. `vertrag`, `zeugnis` zulassen) **oder** Content umbiegen. Empfehlung: **Content umbiegen** (`vertrag` → `amtlich`, `zeugnis` → `augenzeugenbericht`, `original` → `echt`, `paraphrase` → `vereinfacht`). Schema-Enum klein halten beugt Schwemme vor.

### Kategorie C — Typ-Mismatch (pre-existing Strukturbugs, out-of-T2-scope)

Felder, die seit längerem falschen Typ haben und die `_meta`-Strip-Regel bis jetzt mitgetarnt hat:

- `artefakt_ref: "img-2-1"` (String statt Array) — **gpg-M2, gpg-M4 × 3, verlauf-M1 × 4**
- `voraussetzung: "mat-4-3"` (String statt Array) — **gpg-M4-4, M4-5**
- `voraussetzung: ["k1-1 (Pulverfass Europa)", ...]` (TB-Knoten-IDs statt mat-IDs) — **gpg-M2 × 6**
- `sequenz_kontext: "Erstes Material der Mappe..."` (String statt Object) — **gpg-M2 × 6**
- `sequenz_kontext: {vorausgesetztes_wissen, noch_nicht_eingefuehrt, ...}` (Alt-Schema) — **gpg-M4-4, M4-5**
- `_meta.tafelbild_knoten_abgedeckt: ["k2-6 (Balkankrise)", ...]` (Pattern-Verletzung durch " (...)"-Suffix) — **gpg-M2 × 6**
- `_meta.artefakt_ref: ["zit-1-1", "zit-1-2"]` (falscher Präfix `zit-` statt `pq-`) — **verlauf-M1-4**
- `_meta.artefakt_ref: ["rolle-1-1"]` (`rolle-`-Präfix, Tagebuchrollen-ID) — **verlauf-M1-2, M1-5, gpg-M2-6, M4-3**

Kategorie C ist **streng genommen** pre-existing Produktionskorrektheits-Defizit, aber T2 legt die Defekte offen — und fordert implizit Handlung, weil `voraussetzung`-Pattern-Verletzungen dazu führen, dass der Dependency-Graph gar nicht mehr auflösbar ist. Nicht alle sind kosmetisch.

### Kategorie D — `additionalProperties: false`-Verletzungen (Alt-Felder nicht im Schema)

Das neue Schema ist streng abgeschlossen. Bisher galten informell zusätzliche Felder:

| Feld | Kontext | Empfehlung |
|---|---|---|
| `fachbegriffe_eingefuehrt` | Darstellungstext-Meta (`_meta`) — **gpg-M2-1, M4-1, verlauf-M1-3** | Entfernen — Feld ist nirgendwo gelesen. Alternativ in Sub-Schema aufnehmen, wenn gewünscht. |
| `fachbegriffe_referenziert`, `altersfilter_hinweis` | verlauf-M1-3 `_meta` | Entfernen. |
| `lizenz_kompatibel`, `lokaler_pfad`, `download_url`, `thumbnail_breite`, `bildtyp`, `erschliessungsimpuls`, `wikimedia_dateiname`, `url_verifiziert`, `legende`, `kartentyp`, `zeitbezug` | Bildquelle/Karte `_meta` — **gpg-M2-2, M2-3, M4-2, M4-4, M4-5, verlauf-M1-1** | Großteil ist Wikimedia-Resolver-Audit-Metadaten. Entscheidung: ENTWEDER neues Sub-Schema `$defs/BildquelleMeta` anlegen ODER Felder aus Content entfernen (Verlust der Audit-Info). **Empfehlung:** Sub-Schema nachziehen — Audit-Trail für Bildlizenzen darf nicht verloren gehen. Das ist ein neues Ticket T2.F. |
| `perspektivitaet`, `figur`, `historische_details`, `wortanzahl_erzaehlerstimme`, `wortanzahl_figur` | Tagebuchrollen `_meta` — **gpg-M2-6, M4-3, verlauf-M1-2, M1-5** | Ebenfalls Sub-Schema notwendig (`$defs/TagebuchMeta`). Gleiches Ticket T2.F. |
| `tempo_hinweis`, `zeitspanne`, `eintraege_gesamt`, `ankerpunkte` | Zeitleiste `_meta` — **gpg-M2-5** | Sub-Schema `$defs/ZeitleisteMeta`. |
| `quellenangaben` (Top-Level) | gpg-M3-4 | Eindeutig Altschema-Überhang. Inhalt in `quelle` migrieren, Feld entfernen. |
| `kernerkenntnisse` (Top-Level) | gpg-M4-5 | Altschema-Überhang, entfernen oder in `_meta.erarbeitbarkeits_check` überführen. |

### Kategorie E — Pattern-Verletzung Altkodierung

`_meta.tafelbild_knoten_abgedeckt` in gpg-M2 hat durchgängig das Muster `"k2-6 (Balkankrise)"` — Pattern `^k[0-9]+-[0-9]+$` matcht nicht wegen Label-Suffix. Fix: Label entfernen, nur ID behalten. Mechanisch per Script möglich.

## File-für-File Handlungstabelle

| Datei | Fehler | Kat. | Priorität | Aufwand | Bemerkung |
|---|---:|---|---|---:|---|
| gpg-M2/mat-2-1 | 12 | A+C+D+E | MID | 15min | Vollprogramm: _meta nachtragen, voraussetzung auf mat-IDs, sequenz_kontext auf Object, TB-Labels entfernen, fachbegriffe_eingefuehrt raus. |
| gpg-M2/mat-2-2 | 9 | A+C+D | MID | 15min | Bildquelle: _meta wortanzahl/perspektive/trigger_flags, artefakt_ref→Array, TB-Label weg, Wikimedia-Felder Entscheidung T2.F. |
| gpg-M2/mat-2-3 | 9 | A+C+D | MID | 15min | Analog M2-2. |
| gpg-M2/mat-2-4 | 11 | A+B+C+D+E | MID | 20min | quellentyp:vertrag→amtlich, aufbereitung:paraphrase→vereinfacht, rekonstruktions_begruendung, etc. |
| gpg-M2/mat-2-5 | 14 | A+C+D+E | MID | 20min | Zeitleiste: vollständiges _meta + Sub-Schema-Entscheidung. |
| gpg-M2/mat-2-6 | 10 | A+C+D+E | MID | 15min | Tagebuch: Sub-Schema-Entscheidung. |
| gpg-M3/mat-3-1..5 | 1-2 | A | LOW | 3min each | Nur `_meta` fehlt komplett → Block aus Geschwistern kopieren oder neu erzeugen. |
| gpg-M4/mat-4-1 | 5 | A+D | LOW | 10min | _meta-Lücken + fachbegriffe_eingefuehrt raus. |
| gpg-M4/mat-4-2 | 6 | A+C+D | MID | 15min | Karte: Wikimedia-Felder Entscheidung T2.F. |
| gpg-M4/mat-4-3 | 5 | A+C+D | MID | 15min | Tagebuch: Sub-Schema T2.F. |
| gpg-M4/mat-4-4 | 10 | A+C+D | HIGH | 25min | voraussetzung+sequenz_kontext strukturell kaputt; Karte; viel Arbeit. |
| gpg-M4/mat-4-5 | 11 | A+C+D | HIGH | 25min | Analog M4-4 + kernerkenntnisse weg. |
| verlauf-M1/mat-1-1 | 5 | A+B+C+D | MID | 15min | aufbereitung:original→echt; Bildquelle T2.F. |
| verlauf-M1/mat-1-2 | 3 | A+C+D | MID | 10min | Tagebuch T2.F. |
| verlauf-M1/mat-1-3 | 3 | A+D | LOW | 10min | Darstellungstext, nur fachbegriffe-Felder + rekonstruktions_begruendung. |
| verlauf-M1/mat-1-4 | 4 | A+B+C | MID | 15min | Quellentext: quellentyp:zeugnis→augenzeugenbericht, zit-→pq- (Primärquellen-Ref umstellen!). |
| verlauf-M1/mat-1-5 | 3 | A+C+D | MID | 10min | Tagebuch T2.F. |

**Summen-Aufwand geschätzt:** ~4-5 Stunden reine Migrationsarbeit, wenn Sub-Schema-Entscheidungen (T2.F) getroffen sind.

## Abhängigkeit: Ticket T2.F (neu)

Die Kategorien C (artefakt_ref `rolle-`/`zit-`-Präfixe) und D (Bildquelle/Tagebuch/Zeitleiste zusätzliche `_meta`-Felder) zeigen, dass `$defs/MaterialMeta` nur den **generischen Fall** abdeckt. Für strukturell abweichende Material-Typen braucht es typ-spezifische Meta-Sub-Schemata oder eine `oneOf`-Disjunktion. **Empfehlung:** T2.F als neuen Upgrade-Plan-Punkt — Sub-Schemata `BildquelleMeta`, `TagebuchMeta`, `ZeitleisteMeta` ableiten + allOf-Diskriminator per `typ`-Feld. Bis dahin: Entweder die `additionalProperties: false`-Strenge für `_meta` lockern (schwach), oder die zusätzlichen Felder beim Migrationslauf in die Altfelder kanonisch übersetzen (Verlust).

## Abhängigkeit: Primärartefakt-Ref-Präfixe

`artefakt_ref` soll auf Primär-Artefakte verweisen (Pattern `^(pq|pd|pb|pk|pz|pt|ps)-`). Content verwendet `img-`, `zit-`, `rolle-`. Das ist kein Schema-Fehler sondern ein **Referenzmodell-Bruch**: Die Primärartefakte sind nie in der PA-Kette gelandet (oder heißen dort anders). Klärung gehört in einen **separaten Architektur-Review** — die Migration kann sie nur pragmatisch abbilden (z. B. `img-2-1` ⇒ `pb-2-1` ist die naheliegende Transformation; bei `zit-` ⇒ `pq-` analog).

## Entscheidung zu sofortiger Handlung

Der UPGRADE_PLAN v3-10 T2 ist mit diesem Bericht formell **bedient**: Strict-Validation läuft, T2-Kern-Zielscheibe (`_meta`-Strip-Bypass) ist beseitigt, Schema erzwingt `_meta`, Q-GATE §7.1 MQ-STRICT blockt zukünftige Bypässe. Die 21 bestehenden Mappen sind **nicht abzurollen**. Neue Produktionsläufe werden ab sofort strikt validiert.

**Keine automatische Massenreparatur** im Rahmen von T2 — die Kategorien C, D, E betreffen strukturelle Altlasten, deren Reparatur semantische Entscheidungen verlangt (Bild-Audit-Meta erhalten? Dependency-Graph neu verdrahten? Primärartefakt-Kette nachziehen?). Diese Entscheidungen gehören in das neue Ticket T2.F und eine nachgelagerte Mappen-Sanierungs-Session.

## Rohdaten

Validator-Rohreport: `/tmp/mat_migration_report.txt` (Session-transient, nicht im Repo).
Schema-Version: `material-output-schema.json` v3.10.2 (committed in dieser Session).
