# F0e-AEF Varianz-Report (I1 + I2, n=4)

**Zweck:** R-E8 Modell-Varianz-Einschaetzung. Vergleich der 4 independenten Subagent-Dispatches gegen identischen Prompt-Stack + identisches Input-Bundle (SHA `419c6440`).

## Rohdaten

| Run | Agent-ID | Tokens | Dauer ms | Wortanzahl | Schema-Pass | Didaktik-Mittel |
|---|---|---|---|---|---|---|
| I1-1 | `afa61d60d18c09a51` | 24642 | 19691 | 98 | PASS | 4.4 |
| I2-1 | `a49b5e3286b8fc83b` | 42608 | 31511 | 218 | PASS | 4.0 |
| I2-2 | `a92663d39cfdc4614` | 42576 | 36228 | 158 | PASS | 4.4 |
| I2-3 | `ae69e834614b71e43` | 42939 | 37852 | 268 | **FAIL** | 3.8 |

**Hinweis:** I1 hatte 0 Tool-Uses (Prompt inline im Task-Call), I2 hatte je 1 Tool-Use (Read auf shared dispatch-prompt.md). Das erklaert Token-Differenz (~24k vs ~42k) teilweise.

## Kernmetriken

| Metrik | Wert |
|---|---|
| Schema-Pass-Rate (n=4) | 3/4 = 75 % |
| Overlay-D1-D5-Compliance (n=4) | 4/4 = 100 % |
| Didaktik-Mittel (alle 4) | (4.4+4.0+4.4+3.8)/4 = **4.15** |
| Didaktik-Pass ≥ 4 (n=4) | 3/4 = 75 % |
| Wortanzahl-Bereich | 98..268, Faktor 2.7 |
| Dauer-Bereich (ms) | 19691..37852, Faktor 1.9 |

## Varianz-Klassifikation

### Niedrig (stabil ueber alle 4 Runs)

- **D1-D5 Overlay-Compliance:** 100 %. Keine Regress auf F0d-Failure-Muster.
- **quellentyp-Wert:** 4/4 `"amtlich"`. Korrekte Enum-Zuordnung fuer Erlass/Verordnung.
- **aufbereitung-Wert:** 4/4 `"gemischt"` (Primaerquellen-Vorrang + R7-Kontextualisierung).
- **perspektive-Struktur:** 4/4 `"multiperspektivisch: P1 ... kontrastiert mit P3 ..."` oder aequivalente Einzel-Perspektiven-Form.

### Mittel

- **artefakt_ref / tafelbild_knoten_abgedeckt:** 4/4 exakt `["pq-4-1"]` / `["k4-3"]`. Formal stabil, aber trivial weil aus Input-Bundle direkt ableitbar.
- **trigger_flags:**
  - I1 + I2-R1: `["gewalt", "tod", "krieg", "diskriminierung"]` (I1) vs `["Kolonisierung", "Gewalt", "Macht-Asymmetrie", "Unterdrueckung"]` (I2-R1). **Unterschiedliche Taxonomie zwischen I1 und I2.** I1 nutzt eine globale Flag-Liste, I2 nutzt die trigger_categories aus dem Bundle 1:1. Schema akzeptiert beide, aber Downstream-Systeme (Suche, Filter, MAT-Coverage) wuerden unterschiedlich matchen.
  - I2-R2 + R3 ergaenzen Eigen-Tags (`Ueberwaeltigungsverbot_sensibel`, `Primaerquellen-Ausnahme-aktiv`).

### Hoch

- **wortanzahl:** 98..268 Faktor 2.7. Keine strukturelle Begrenzung im Prompt.
- **inhalt-Aufbau-Varianz:**
  - I1: 1 Einleitung + 1 Zitat + 1 Nachweis + 1 `<strong>Denk nach:</strong>`-Block
  - I2-R1: wie I1 aber ohne Denk-nach-Block, Erlaeuterungsabsatz laenger
  - I2-R2: wie I1 aber ohne Denk-nach-Block, Nachweis im Text mit Quellen-Doppelung
  - I2-R3: 2 Einleitungssaetze, Zitat, 2 Erlaeuterungs-Absaetze, Denkanstoss-Block, `<sup>1</sup>`-Fussnote
- **Multiperspektivitaet im `inhalt`:** Alle 4 Runs lagern P3-Perspektive primaer in Impuls-Fragen aus. Run-3 macht es am explizitesten ("Welche Perspektive fehlt?"), Run-1/I1/R2 am knappsten.
- **Quellen-Dopplung im inhalt:** I1 nicht. I2-R1 nicht. I2-R2 ja (ganzer Nachweis-Absatz). I2-R3 als Fussnoten-Apparat.

## Neu beobachteter Defekt D6

**Defekt:** `_meta.quellenkritische_impulse` String statt Array (I2-R3).
**Nicht im F0d-Baseline-Defekt-Pool.** F0d-Runs lieferten dieses Feld meist gar nicht.
**Overlay-Scope:** Die aktuelle Overlay §1 deckt D1-D5 ab, nicht D6.
**Konsequenz:** Gate-Chain faengt den Defekt ab — kein Leak. Aber das Overlay koennte den Defekt praeventiv adressieren durch einen expliziten Typ-Hinweis im Whitelist-Abschnitt.

## R-E8-Bewertung

| Teilfrage | Antwort |
|---|---|
| Bleibt die strukturelle Overlay-Haertung (D1-D5) stabil? | **Ja.** 4/4 Runs halten D1-D5 ein. |
| Ist Schema-Gate-Chain wirksam gegen unaddressierte Defekte? | **Ja.** D6 wurde von der Gate-Chain gefangen. |
| Ist die didaktische Qualitaet reproduzierbar ≥ 4? | **Nein.** 3/4 Runs ≥ 4, 1/4 Run 3.8. |
| Ist die Laengen-Varianz kontrolliert? | **Nein.** Faktor 2.7 zwischen Min und Max. |

## Empfehlungen

1. **F0e-Spike-Ergebnis:** Shadow-Overlay + zweistufiges Gate ist ein arbeitsfaehiger Mechanismus. Schema-Pass-Rate 75 % + Didaktik-Pass 75 % bei n=4 ist **nicht** 100 %, aber deutlich besser als F0d-Baseline (Schema 0/6).
2. **PI-SCHEMA-STRICT-01 (Promotion-Kandidat):** Overlay in `agents/SUB_MATERIAL_QUELLENTEXT.md` einarbeiten. D6-Addition: im Whitelist-Abschnitt §1-D1 Typ-Angabe pro Feld ergaenzen (`quellenkritische_impulse: array of string`).
3. **PI-CONTENT-LENGTH-01 (neu):** `wortanzahl` didaktisches Cap (z.B. 150) als Q-Gate nach dem Schema-Gate, vor Didaktik-Review.
4. **PI-MULTIPERSPEKTIVE-INHALT-01 (neu, schwach):** Q-Gate, das pruefen koennte, ob P3 im `inhalt`-String substanziell vertreten ist (nicht nur in Impulsen).
5. **PI-TRIGGERFLAG-ENUM-01 (optional):** `trigger_flags`-Enum-Verengung fuer Cross-Run-Konsistenz.
6. **I3-Anschluss (optional, nicht jetzt):** Zweiter Case (z.B. mat-1-2 oder mat-3-4) mit n=3, um zu pruefen ob die Muster Case-unabhaengig sind.

## Offene Restfragen

- Ist die I1-vs-I2 Token-Differenz (24k vs 42k) rein durch +1 Tool-Use erklaerbar, oder fliessen zusaetzliche Reasoning-Pfade mit ein? Fuer Produktions-Dispatcher: Inline-Prompt deutlich guenstiger.
- Koennte ein **strikter Output-Formatvorlage-Block** im Overlay (z.B. "Genau diese Struktur: EINLEITUNG max 2 Saetze, ZITAT, NACHWEIS max 2 Saetze") die wortanzahl- und inhalt-Aufbau-Varianz reduzieren? Hypothese zu testen in einer moeglichen I3.
