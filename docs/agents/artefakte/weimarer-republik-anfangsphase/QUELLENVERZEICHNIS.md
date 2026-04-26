# QUELLENVERZEICHNIS — weimarer-republik-anfangsphase

**Game-ID:** weimarer-republik-anfangsphase
**Run-ID:** run-3-2026-04-26
**Erstellt:** 2026-04-26 (Phase 0.2, agent-inhalt)
**Vertrag:** VERTRAG_PHASE_0-2_INHALT
**Pruefung:** Quellen-Vorrang gemaess F-PB-28 (MCP-Wikipedia → WebFetch → LLM-Memory). Keine LLM-Memory-only-Fakten in dieser Phase.

---

## Daten-Quellen-Strategie (Run 3)

| Tier | Quelle | Anzahl genutzt | Status |
|---|---|---|---|
| 1 (verified) | MCP `mcp__wikipedia__*` | 14 Artikel | PRIMAER — eingesetzt |
| 2 (webfetch) | WebFetch (verfassungen.de, dhm.de/lemo, bpb.de, commons.wikimedia.org) | 8 Live-Aufrufe | FALLBACK — eingesetzt |
| 3 (degraded) | LLM-Memory | 0 | NICHT eingesetzt |

E-D3-DATA-DEGRADED-Status: **NICHT AKTIV** — keine Eskalation.

---

## Mappe 1 — November 1918: Eine neue Ordnung

### Wikipedia (MCP, verified)

| Artikel | Stable URL | Abruf-Datum | Quellen-Hash |
|---|---|---|---|
| Novemberrevolution / German Revolution 1918-1919 | https://en.wikipedia.org/wiki/German_revolution_of_1918%E2%80%931919 | 2026-04-26 | wiki-novemberrevolution-2026-04-26 |
| Philipp Scheidemann | https://en.wikipedia.org/wiki/Philipp_Scheidemann | 2026-04-26 | wiki-scheidemann-2026-04-26 |
| Karl Liebknecht | https://en.wikipedia.org/wiki/Karl_Liebknecht | 2026-04-26 | wiki-liebknecht-2026-04-26 |
| Friedrich Ebert | https://en.wikipedia.org/wiki/Friedrich_Ebert | 2026-04-26 | wiki-ebert-2026-04-26 |
| Wilhelm II, German Emperor | https://en.wikipedia.org/wiki/Wilhelm_II,_German_Emperor | 2026-04-26 | wiki-wilhelm2-2026-04-26 |
| Kiel mutiny (Kieler Matrosenaufstand) | https://en.wikipedia.org/wiki/Kiel_mutiny | 2026-04-26 | wiki-kielmutiny-2026-04-26 |
| Spartacist uprising | https://en.wikipedia.org/wiki/Spartacist_uprising | 2026-04-26 | wiki-spartakus-2026-04-26 |

### bpb / DHM-LeMO (webfetch)

| Quelle | URL | Abruf-Datum | Hinweis |
|---|---|---|---|
| DHM-LeMO Weimarer Republik (Hub) | https://www.dhm.de/lemo/kapitel/weimarer-republik | 2026-04-26 | Inhaltsverzeichnis verifiziert |
| DHM-LeMO Revolution 1918/19 | https://www.dhm.de/lemo/kapitel/weimarer-republik/revolution | 2026-04-26 | Per LeMO-Hub-Crawl bestaetigt |
| bpb Themen Weimarer Republik (Hub) | https://www.bpb.de/themen/weimarer-republik/ | 2026-04-26 | Hub bestaetigt; Sub-URLs zu Sub-Artikel "Vom Kaiserreich zur Republik 1918/19" lieferten 404 — als TODO Phase 0.2.M markieren |

### Bildkandidaten Wikimedia Commons (TODO Phase 0.2.M)

| Datei-Vermutung | Inhalt | Lizenz-Erwartung | Status |
|---|---|---|---|
| `Ausrufung Republik Scheidemann.jpg` | Scheidemann am Reichstagsfenster 9. Nov 1918 | gemeinfrei (PD-Germany, > 70 Jahre) | ZU VERIFIZIEREN |
| `Bundesarchiv_Bild_102-08214,_Berlin,_Hörsing_und_Scheidemann_vor_Schloss.jpg` | Scheidemann politisch unterwegs Berlin | CC-BY-SA-3.0 DE (Bundesarchiv) | ZU VERIFIZIEREN |
| `Wilhelm II flieht ins Exil` (Datei unbekannt) | Karikatur / Foto Abdankung | gemeinfrei erwartet | ZU SUCHEN |

---

## Mappe 2 — Eine Verfassung fuer eine Demokratie: Weimar 1919

### Wikipedia (MCP, verified)

| Artikel | Stable URL | Abruf-Datum | Quellen-Hash |
|---|---|---|---|
| Weimar Constitution / Weimarer Verfassung | https://en.wikipedia.org/wiki/Weimar_Constitution | 2026-04-26 | wiki-wrv-2026-04-26 |
| Weimar National Assembly | https://en.wikipedia.org/wiki/Weimar_National_Assembly | 2026-04-26 | wiki-weimarna-2026-04-26 |

### Primaerquellen-Volltext (webfetch)

| Quelle | URL | Abruf-Datum | Quellen-Hash |
|---|---|---|---|
| WRV Art. 1 (Volltext) | http://www.verfassungen.de/de19-33/verf19.htm#1 | 2026-04-26 | wf-verfde-art1-2026-04-26 |
| WRV Art. 22 (Volltext Wahlrecht) | http://www.verfassungen.de/de19-33/verf19.htm#22 | 2026-04-26 | wf-verfde-art22-2026-04-26 |
| WRV Art. 109 (Volltext Gleichheit) | http://www.verfassungen.de/de19-33/verf19.htm#109 | 2026-04-26 | wf-verfde-art109-2026-04-26 |

**Hinweis:** dejure.org leitet auf verfassungen.de weiter (301-Redirect bestaetigt). verfassungen.de ist die akademisch etablierte Online-Sammelstelle deutscher Verfassungstexte und wurde als kanonische Volltext-Quelle akzeptiert.

### DHM-LeMO

| Quelle | URL | Abruf-Datum |
|---|---|---|
| DHM-LeMO Innenpolitik / Verfassung (Hub bestaetigt) | https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik | 2026-04-26 |

### Bildkandidaten Wikimedia Commons (TODO Phase 0.2.M)

| Datei-Vermutung | Inhalt | Lizenz-Erwartung | Status |
|---|---|---|---|
| `Eroeffnung_der_Nationalversammlung_Weimar_1919.jpg` (Vermutung) | Eroeffnung Deutsches Nationaltheater 6. Feb 1919 | gemeinfrei | ZU SUCHEN |
| `Weimarer Reichsverfassung Urkunde.jpg` (Vermutung) | Vertragsdokument | gemeinfrei | ZU SUCHEN |
| `Louis_XIV_of_France.jpg` o.ae. (fuer Vergleichsanker) | Portrait Ludwig XIV. | gemeinfrei | ZU VERIFIZIEREN |

---

## Mappe 3 — Versailles 1919: Wie reagieren die Menschen?

### Wikipedia (MCP, verified)

| Artikel | Stable URL | Abruf-Datum | Quellen-Hash |
|---|---|---|---|
| Treaty of Versailles | https://en.wikipedia.org/wiki/Treaty_of_Versailles | 2026-04-26 | wiki-treaty-2026-04-26 |
| Article 231 of the Treaty of Versailles | https://en.wikipedia.org/wiki/Article_231_of_the_Treaty_of_Versailles | 2026-04-26 | wiki-art231-2026-04-26 |
| World War I reparations | https://en.wikipedia.org/wiki/World_War_I_reparations | 2026-04-26 | wiki-wwireparations-2026-04-26 |

### DHM-LeMO

| Quelle | URL | Abruf-Datum |
|---|---|---|
| DHM-LeMO Aussenpolitik / Versailles (Hub bestaetigt) | https://www.dhm.de/lemo/kapitel/weimarer-republik/aussenpolitik/versailles | 2026-04-26 |

### Bildkandidaten Wikimedia Commons (TODO Phase 0.2.M)

| Datei-Vermutung | Inhalt | Lizenz-Erwartung | Status |
|---|---|---|---|
| `Karte Deutsche Gebietsverluste 1919.svg` (Vermutung) | Karte territorialer Verluste | i.d.R. CC-BY-SA | ZU SUCHEN |
| `Treaty_of_Versailles,_English_version.jpg` | Vertragsdokument englisch | gemeinfrei (Government Work) | bekannt — ZU VERIFIZIEREN |
| `Spiegelsaal_Versailles_28_Juni_1919.jpg` (Vermutung) | Unterzeichnungsszene | gemeinfrei | ZU SUCHEN — alternativ William-Orpen-Gemaelde |

---

## Mappe 4 — 1920-1923: Die Republik unter Druck

### Wikipedia (MCP, verified)

| Artikel | Stable URL | Abruf-Datum | Quellen-Hash |
|---|---|---|---|
| Kapp Putsch | https://en.wikipedia.org/wiki/Kapp_Putsch | 2026-04-26 | wiki-kapp-2026-04-26 |
| Wolfgang Kapp | https://en.wikipedia.org/wiki/Wolfgang_Kapp | 2026-04-26 | wiki-kappperson-2026-04-26 |
| Hyperinflation in the Weimar Republic | https://en.wikipedia.org/wiki/Hyperinflation_in_the_Weimar_Republic | 2026-04-26 | wiki-hyperinfl-2026-04-26 |
| Occupation of the Ruhr (Ruhrbesetzung) | https://en.wikipedia.org/wiki/Occupation_of_the_Ruhr | 2026-04-26 | wiki-ruhr-2026-04-26 |
| Beer Hall Putsch (Hitlerputsch) | https://en.wikipedia.org/wiki/Beer_Hall_Putsch | 2026-04-26 | wiki-beerhall-2026-04-26 |

### DHM-LeMO

| Quelle | URL | Abruf-Datum |
|---|---|---|
| DHM-LeMO Kapp-Putsch | https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/luettwitz-kapp-putsch-1920 | 2026-04-26 |
| DHM-LeMO Inflation 1923 | https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation | 2026-04-26 |
| DHM-LeMO Hitler-Putsch | https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/hitler | 2026-04-26 |

### Bildkandidaten Wikimedia Commons (TODO Phase 0.2.M)

| Datei-Vermutung | Inhalt | Lizenz-Erwartung | Status |
|---|---|---|---|
| `100-Billionen-Geldschein.jpg` | 100-Billionen-Mark-Reichsbanknote | gemeinfrei | bekannt — ZU VERIFIZIEREN |
| `Reichsbanknote_5000000_Mark.png` | 5-Millionen-Mark-Schein 1923 | gemeinfrei | bekannt — ZU VERIFIZIEREN |
| `1_Milliarde_Mark_1923.jpg` | 1-Milliarden-Mark-Schein | gemeinfrei | bekannt — ZU VERIFIZIEREN |
| `Inflatie_in_Duitsland_mensen_staan_met_handenvol_bankbiljetten...` | Bevoelkerung mit Banknotenstapeln nach Brot | gemeinfrei | bekannt — ZU VERIFIZIEREN |
| `Bundesarchiv_Bild_146-1971-088-50,_Hitler-Putsch.jpg` (Vermutung) | Hitler-Putsch Bilddokument | CC-BY-SA-3.0 DE Bundesarchiv | ZU SUCHEN |
| `Bundesarchiv Kapp-Putsch Brandenburger Tor.jpg` (Vermutung) | Truppen am Brandenburger Tor 13. Maerz 1920 | CC-BY-SA-3.0 DE Bundesarchiv | ZU SUCHEN |

---

## Lizenz-Hinweise (Sammelregel)

- **Bundesarchiv-Bilder** auf Commons: i.d.R. CC-BY-SA-3.0 DE — Namensnennung "Bundesarchiv, Bild XYZ / Fotograf / CC-BY-SA 3.0".
- **Vor-1955-Aufnahmen ohne Bundesarchiv-Vertrag**: meist gemeinfrei in Deutschland (PD-old-70 oder PD-amtliches Werk).
- **WRV-Volltext (verfassungen.de)**: Verfassungstext gemeinfrei (amtliches Werk).
- **Wikipedia-Texte**: CC-BY-SA-4.0 — Bezuege erfolgen ueber Quellen-Hash + URL, KEIN direkter Wortlaut-Uebernahme im Schuelermaterial (alle Inhalte werden in Phase 0.3+ paraphrasiert + R7-konform umformuliert).
- **bpb-Texte**: Standard-bpb-Lizenz (Schulnutzung erlaubt, Quellenangabe Pflicht).

---

## TODO-Liste fuer Phase 0.2.M Medien-Verifikation (kanonische Eingabe fuer agent-artefakt-bild)

Pro Mappe ZU VERIFIZIERENDE Wikimedia-Commons-Dateinamen:

**M1:**
- File:`Ausrufung_Republik_Scheidemann.jpg` (oder aequivalente kanonische Bilddatei zur Reichstagsausrufung)
- File:`Bundesarchiv_Bild_102-08214,_Berlin,_Hörsing_und_Scheidemann_vor_Schloss.jpg`
- File-Suche: "Wilhelm II Abdankung 1918"

**M2:**
- File-Suche: "Eroeffnung Nationalversammlung Weimar 1919" (Deutsches Nationaltheater)
- File-Suche: "Weimarer Reichsverfassung Urkunde 1919"
- File:`Hyacinthe_Rigaud_-_Louis_XIV_in_Coronation_Robes_-_WGA19453.jpg` o.ae. (Vergleichsanker Absolutismus)

**M3:**
- File-Suche: "Karte Deutsches Reich Gebietsverluste Versailler Vertrag" (idealerweise SVG mit Legende DE)
- File:`Treaty_of_Versailles,_English_version.jpg`
- File-Suche: "Spiegelsaal Versailles 28 Juni 1919" oder Orpen-Gemaelde "The Signing of Peace in the Hall of Mirrors"

**M4:**
- File:`100-Billionen-Geldschein.jpg`
- File:`Reichsbanknote_5000000_Mark.png`
- File:`1_Milliarde_Mark_1923.jpg`
- File-Suche: "Brot kaufen Inflation 1923 Banknoten"
- File-Suche: "Bundesarchiv Kapp-Putsch Brandenburger Tor 1920"
- File-Suche: "Bundesarchiv Hitler-Putsch Buergerbraeukeller 1923"

Alle Vermutungen sind in Phase 0.2.M durch agent-artefakt-bild zu verifizieren (Existenzpruefung + Lizenz + Aufloesung).
