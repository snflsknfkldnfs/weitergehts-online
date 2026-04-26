# INHALTSBASIS: Weimarer Republik — Anfangsphase (1918-1923)

**Game-ID:** `weimarer-republik-anfangsphase`
**Erstellt:** 2026-04-25 (Phase 0.2, AGENT_INHALT)
**Phase:** 0.2 (Inhaltsbasis + Artefakt-Sichtung)
**Vertragsbasis:** VERTRAG_PHASE_0-2_INHALT v1.6
**Validierungsstatus:** ENTWURF (User-Validierung + Phase-0.2.M Medienverifikation ausstehend)
**Vorgaenger-Game:** Keiner

---

## Header — Trigger-Kategorien (Pflicht F0b M7)

```yaml
trigger_categories:
  - Konflikt
  - Macht-Asymmetrie
  - Revolution
  - Gewalt
  - Trauma
  - Demokratie-Gefaehrdung
scanner_version: "manual-classification-v1 (trigger_keywords.json nicht vorhanden im Generator-Repo; manuelle Klassifikation gemaess F0b M7)"
detector_run: "manual-by-AGENT_INHALT 2026-04-25"
```

### Begruendung der Kategorien

| Kategorie | Begruendungs-Snippet |
|---|---|
| **Konflikt** | Das Game thematisiert die Konkurrenz zweier Lager (MSPD/sozialdemokratisch vs. USPD-Spartakus/raete) bei der Doppelausrufung 9.11.1918 sowie systematische Konflikte zwischen jungem Staat und seinen Gegnern (M1, M4). |
| **Macht-Asymmetrie** | Der Versailler Vertrag wurde unter Ausschluss der deutschen Verhandlungsdelegation diktiert (M3); der Ebert-Groener-Pakt zementiert die fortbestehende Macht des kaiserlichen Offizierskorps in der Republik (M1, M4). |
| **Revolution** | Novemberrevolution 1918/19 ist KE-Hauptanker (GPG7_LB2_K_02). Die Mappe M1 thematisiert explizit den nicht-linearen Revolutionsverlauf inklusive Doppelausrufung. |
| **Gewalt** | Niederschlagung des Spartakusaufstands (Jan 1919), Ermordung Liebknecht/Luxemburg (15.1.1919), Ermordung Eisners (21.2.1919), Niederschlagung der Muenchner Raeterepublik durch Freikorps mit Hunderten Toten, Hitler-Putsch mit Schiesserei (M4). |
| **Trauma** | Folgen des Ersten Weltkriegs (Hunger, Kriegstote, Versehrte) als Ausgangslage; Hyperinflation 1923 (Vermoegensvernichtung). Sensibel zu rahmen (Diktum aus DIDAKTIK_RAHMEN: keine Existenzangst-Trigger). |
| **Demokratie-Gefaehrdung** | Kernfrage der Synthese-Mappe M4 ("Republik ohne Republikaner"). Putschversuche von links und rechts, struktureller Konstruktionsfehler Art. 48 (M2). Direkter Aktualitaetsbezug zu wehrhafter Demokratie (Grundgesetz Art. 18/21). |

### Aktivierte F0b-Mechanismen (Downstream-Konsequenz)

- **MATERIAL-PERSPEKTIV-01 (M4):** AKTIV. Trigger `Konflikt`, `Macht-Asymmetrie`, `Revolution` erfuellen die Schwelle. Pro Mappe muessen ueber alle Materialien hinweg mind. 2 nicht-dominante Perspektiv-Tags vergeben werden.
- **TERMINOLOGIE-01 (M6) Kolonialterminologie-Screen:** NICHT AKTIV (Kategorie `Kolonisierung` fehlt — Game spielt im deutschen Innenraum).
- **MULTIPERSPEKTIV-SYNTHESE (M3) im SUB_TEMPLATE_MAPPENABSCHLUSS:** AKTIV (QG-06 Pflicht).
- **TRIGGER-WARNUNG (POLICY_TRIGGER_SICHTBARKEIT, STR-12):** Lehrkraft-sichtbarer Hinweis auf Gewalt-Inhalte (Liebknecht/Luxemburg-Mord, Niederschlagung Raeterepublik) — sachlich-nuechterne Darstellung pflichtig (siehe DIDAKTIK_RAHMEN Sensibilitaets-Anweisung).

---

## Transparenz-Notiz zur Recherche-Methodik

**Recherche-Modus:** LLM-Wissensbasis (Trainingsstand 2024, kein Live-MCP-Zugriff in dieser Runtime). Wikipedia-MCP, WebFetch und WebSearch sind in dieser Runtime nicht verfuegbar; daher dokumentiert AGENT_INHALT plausible/typische Wikipedia-DE-Pfade aus der eigenen Wissensbasis.

**Faktenangaben:** Nach bestem Stand 2024 verifiziert. Bei Zahlen mit historischer Schwankung wurde "ca." gesetzt oder die Standardquelle markiert. Zentrale Daten (Doppelausrufung 9.11.1918, Verfassung 11.8.1919, Versailles 28.6.1919, Liebknecht/Luxemburg 15.1.1919, Kapp-Putsch 13.-17.3.1920, Hitler-Putsch 8./9.11.1923) sind in der historischen Forschung gesichert.

**Empfehlung:** Vor Phase-3-Deploy ist eine punktuelle Lehrkraft-Stichprobe der Faktenangaben empfohlen, insbesondere zu (a) Reparationszahlen Versailles 132 Mrd. Goldmark (es gibt unterschiedliche Berechnungen je nach Tilgungsplan), (b) Hyperinflations-Spitzenwert 1 Dollar = 4,2 Billionen Mark (datiert auf 20.11.1923), (c) konkrete Toten-/Opferzahlen Spartakusaufstand und Muenchner Raeterepublik (in der Forschung Spannweiten).

**Wikimedia-Verifikation:** Alle in dieser INHALTSBASIS gelisteten Wikimedia-Dateinamen sind LLM-Kandidaten (`verified: false`). Die Live-Verifikation (Q-MEDIEN-PROSPEKTIV, BLOCKER QI-MV) wird in Phase 0.2.M durch `agent-medienrecherche` ausgefuehrt.

---

## Wikipedia-Quellen (Game-weite Artikelliste, OPT-2)

### Hauptartikel

| Artikel (Wikipedia DE) | Rolle | Bemerkung |
|---|---|---|
| `Weimarer Republik` | Hauptartikel Game | Uebergreifende Einordnung 1918-1933, fuer dieses Game v.a. Sektionen "Novemberrevolution", "Verfassung", "Krisenjahre 1920-1923" |

### Vertiefungsartikel mit Mappen-Zuordnung

| Artikel (Wikipedia DE) | Primaer-Mappe(n) | Sekundaer-Mappe(n) | Relevante Sektionen | Bemerkung |
|---|---|---|---|---|
| `Novemberrevolution` | M1 | M4 | Vorgeschichte, Kieler Matrosenaufstand, Verlauf in Berlin, Rat der Volksbeauftragten, Ebert-Groener-Pakt | Kernartikel M1 |
| `Kieler Matrosenaufstand` | M1 | — | Gesamt | Detail zum Ausloeser |
| `Philipp Scheidemann` | M1 | M2 | Ausrufung der Republik | Akteur |
| `Karl Liebknecht` | M1 | M4 | Ausrufung der Sozialistischen Republik, Spartakusaufstand, Tod | Akteur, mappenuebergreifend |
| `Friedrich Ebert` | M1 | M2, M4 | Reichskanzler 1918, Reichspraesident, Ebert-Groener-Pakt | Akteur, mappenuebergreifend |
| `Rat der Volksbeauftragten` | M1 | — | Gesamt | Uebergangsregierung |
| `Ebert-Groener-Pakt` | M1 | M4 | Gesamt | Schluesselereignis |
| `Stinnes-Legien-Abkommen` | M1 | — | Gesamt | Zentralarbeitsgemeinschaft, 8-Stunden-Tag |
| `Weimarer Verfassung` | M2 | — | Entstehung, Verfassungsorgane, Art. 1, 22, 41, 48, Grundrechtsteil | Kernartikel M2 |
| `Weimarer Nationalversammlung` | M2 | — | Wahl 19.1.1919, Tagungsort Weimar, Verabschiedung 11.8.1919 | Akteur (Versammlung) |
| `Hugo Preuss` | M2 | — | Verfassungsentwurf | Akteur |
| `Marie Juchacz` | M2 | — | Erste Rednerin Nationalversammlung 19.2.1919 | Akteur (Frauen-Perspektive) |
| `Frauenwahlrecht` (Sektion Deutschland 1918/19) | M2 | — | Reichswahlgesetz 30.11.1918 | Vorbereitende Norm |
| `Versailler Vertrag` | M3 | M4 | Verhandlungssituation, Bestimmungen militaerisch/territorial/wirtschaftlich, Art. 231 | Kernartikel M3 |
| `Pariser Friedenskonferenz 1919` | M3 | — | Akteure (Wilson, Clemenceau, Lloyd George), Diktatcharakter | Kontext |
| `Dolchstosslegende` | M3 | M4 | Entstehung 1919, Hindenburg-Aussage Nov. 1919 | Kontroverse, Wirkungsgeschichte |
| `Reparationen nach dem Ersten Weltkrieg` | M3 | M4 | Londoner Zahlungsplan 1921, 132 Mrd. Goldmark | Detail zur Wirtschaftsbelastung |
| `Spartakusaufstand` | M4 | M1 | Verlauf 5.-12.1.1919, Niederschlagung, Liebknecht/Luxemburg-Mord | Kernartikel M4 |
| `Rosa Luxemburg` | M4 | M1 | Sozialistische Republik, Spartakusprogramm, Tod 15.1.1919 | Akteurin |
| `Muenchner Raeterepublik` | M4 | — | Verlauf April 1919, Niederschlagung Mai 1919, Eisner | Innen-Bedrohung links |
| `Kurt Eisner` | M4 | — | Bayerische Raeterepublik-Vorgeschichte, Ermordung 21.2.1919 | Akteur |
| `Kapp-Luettwitz-Putsch` | M4 | — | Verlauf 13.-17.3.1920, Generalstreik | Kernereignis Bedrohung von rechts |
| `Generalstreik gegen den Kapp-Putsch` | M4 | — | Rolle Gewerkschaften (Legien-Aufruf) | Detail Buergerantwort |
| `Freikorps` | M4 | M1 | Rolle in Spartakus-Niederschlagung, Kapp-Putsch | Akteur (Gruppe) |
| `Deutsche Inflation 1914-1923` | M4 | — | Hyperinflations-Phase Sommer-Nov 1923, Rentenmark | Wirtschaftliche Bedrohung |
| `Hitlerputsch` | M4 | — | 8./9.11.1923 Muenchen | Ausblick |

### Mindest-Coverage-Pruefung

- Soll: `mappen_anzahl × 2 + 1` = `4 × 2 + 1` = **9 Artikel**
- Ist: **26 Artikel** (1 Hauptartikel + 25 Vertiefungsartikel)
- Quellen-Diversitaet pro Mappe: M1 = 8, M2 = 5, M3 = 5, M4 = 9 — jede Mappe hat ≥2 verschiedene Vertiefungsartikel als Faktenquellen. **PASS.**

---

## Quellen-Gesamtuebersicht (Artikel × Mappe)

| Artikel | M1 | M2 | M3 | M4 | Ergiebigkeit |
|---|:-:|:-:|:-:|:-:|---|
| Weimarer Republik (Hauptartikel) | x | x | x | x | hoch (Uebersicht) |
| Novemberrevolution | X | — | — | x | hoch |
| Kieler Matrosenaufstand | X | — | — | — | mittel (Spezialartikel) |
| Philipp Scheidemann | X | x | — | — | mittel |
| Karl Liebknecht | X | — | — | x | mittel |
| Friedrich Ebert | X | x | — | x | hoch |
| Rat der Volksbeauftragten | X | — | — | — | mittel |
| Ebert-Groener-Pakt | X | — | — | x | mittel |
| Stinnes-Legien-Abkommen | X | — | — | — | mittel |
| Weimarer Verfassung | — | X | — | — | hoch |
| Weimarer Nationalversammlung | — | X | — | — | mittel |
| Hugo Preuss | — | X | — | — | mittel |
| Marie Juchacz | — | X | — | — | mittel |
| Frauenwahlrecht | — | X | — | — | mittel |
| Versailler Vertrag | — | — | X | x | hoch |
| Pariser Friedenskonferenz 1919 | — | — | X | — | mittel |
| Dolchstosslegende | — | — | X | x | mittel |
| Reparationen nach dem Ersten Weltkrieg | — | — | X | x | mittel |
| Spartakusaufstand | x | — | — | X | hoch |
| Rosa Luxemburg | x | — | — | X | mittel |
| Muenchner Raeterepublik | — | — | — | X | mittel |
| Kurt Eisner | — | — | — | X | mittel |
| Kapp-Luettwitz-Putsch | — | — | — | X | hoch |
| Generalstreik gegen den Kapp-Putsch | — | — | — | X | mittel |
| Freikorps | x | — | — | X | mittel |
| Deutsche Inflation 1914-1923 | — | — | — | X | mittel |
| Hitlerputsch | — | — | — | X | mittel (nur Ausblick) |

**Legende:** X = Primaer-Quelle in Mappe; x = Sekundaer-/Querbezug.

---

## Inhaltsluecken-Status

| Luecke | Mappe | Status | Quelle/Loesung |
|---|---|---|---|
| Konkrete Toten-Zahlen Spartakusaufstand (forschungsumstrittene Spannweiten) | M4 | WORKAROUND | Im Material-Output mit "ca. 150-200" plus Kontextualisierungssatz; Standardquelle Kluge / Winkler. |
| Konkrete Toten-Zahlen Niederschlagung Muenchner Raeterepublik (Forschung: ca. 600-1.200) | M4 | WORKAROUND | Im Material-Output mit "ueber 600 Tote" markieren, Quelle Mitchell. |
| Originalfoto Doppelausrufung 9.11.1918 (Scheidemann am Reichstagsfenster) | M1 | OFFEN-pending-0.2.M | Es existieren rekonstruierte Aufnahmen / Zeichnungen, aber kein klarer Originalmoment-Foto. Ggf. Bundesarchiv-Bild (Rekonstruktion oder Spaeteres) als Wikimedia-Kandidat — Verifikation in 0.2.M. |
| Wortlaut Marie Juchacz' Eroeffnungsrede 19.2.1919 (vollstaendig) | M2 | GESCHLOSSEN | Schluesselsatz "Meine Herren und Damen!" historisch belegt; Volltext in Reichstagsprotokollen, ueber Wikipedia-Artikel `Marie Juchacz` und Verlinkungen verfuegbar. |
| Genaue Stundenangabe der beiden Ausrufungen 9.11.1918 (ca. 14:00 Scheidemann, ca. 16:00 Liebknecht — Schwankungsbreite in Forschung) | M1 | WORKAROUND | "am fruehen Nachmittag" / "am spaeteren Nachmittag" verwenden; oder "ca."-Markierung. |
| Vollstaendiger Vertragstext Versailles Art. 231 in deutscher Uebersetzung | M3 | GESCHLOSSEN | Wortlaut etabliert: "Die alliierten und assoziierten Regierungen erklaeren, und Deutschland erkennt an, dass Deutschland und seine Verbuendeten als Urheber fuer alle Verluste und Schaeden verantwortlich sind ..." — siehe Wikipedia `Versailler Vertrag`, Sektion Art. 231 / Kriegsschuldartikel. |
| Wortlaut Art. 48 Weimarer Verfassung | M2 | GESCHLOSSEN | "Wenn im Deutschen Reiche die oeffentliche Sicherheit und Ordnung erheblich gestoert oder gefaehrdet wird, kann der Reichspraesident die zur Wiederherstellung ... noetigen Massnahmen treffen ..." (Wikipedia `Weimarer Verfassung`, Sektion Notverordnungsrecht). |
| Wortlaut Hindenburg "Dolchstoss" (Aussage vor Untersuchungsausschuss Nov 1919) | M3 | GESCHLOSSEN | Oft zitiert: "Wie ein englischer General mit Recht sagt: 'Die deutsche Armee wurde von hinten erdolcht.'" (Wikipedia `Dolchstosslegende`, Sektion Hindenburg-Aussage 18.11.1919). |
| Wikimedia-Live-Verifikation aller Bildkandidaten | alle | OFFEN-pending-0.2.M | Q-MEDIEN-PROSPEKTIV (BLOCKER QI-MV) — wird durch `agent-medienrecherche` in Phase 0.2.M durchgefuehrt. AGENT_INHALT liefert Kandidatenliste mit `verified: false`. |

---

# Mappe 1 — Vom Kaiserreich zur Republik (Novemberrevolution 1918)

**KE-Anker (Hauptzuordnung):** GPG7_LB2_K_02 (nicht-linearer Verlauf von Revolutionen).
**KE-Nebenzuordnung:** GPG7_LB2_K_01 (Vergleich Reg.formen — Bruch von Monarchie zu Republik), GPG7_LB2_K_08 (Folgen 1.WK als Ausgangslage).

## 1.1 Fakten und Chronologie

1. Im Oktober 1918 stand das Deutsche Reich militaerisch vor der Niederlage; die Oberste Heeresleitung (Hindenburg/Ludendorff) draengte auf einen Waffenstillstand und uebertrug die Verantwortung an eine zivile Regierung unter Prinz Max von Baden (Wikipedia DE: `Novemberrevolution`, Sektion Vorgeschichte / Oktoberreform).
2. Am 28. Oktober 1918 erteilte die Seekriegsleitung den Flottenbefehl, die Hochseeflotte zu einer letzten Schlacht gegen die britische Royal Navy auslaufen zu lassen — die Matrosen verweigerten den Befehl als sinnloses "Todeskommando" (Wikipedia DE: `Kieler Matrosenaufstand`, Sektion Auslaufbefehl).
3. Der Matrosenaufstand begann am 3. November 1918 in Kiel mit einer Demonstration entlassener Matrosen und Arbeiter, in deren Verlauf erste Tote zu beklagen waren; binnen Tagen breitete sich die Bewegung als Arbeiter- und Soldatenraete-Bewegung im Reich aus (Wikipedia DE: `Kieler Matrosenaufstand`, Sektion Verlauf).
4. Am 9. November 1918 verkuendete Reichskanzler Max von Baden eigenmaechtig die Abdankung Kaiser Wilhelms II.; der Kaiser ging am Folgetag ins Exil in die Niederlande (Wikipedia DE: `Novemberrevolution`, Sektion 9. November in Berlin).
5. Am Nachmittag des 9. November 1918 rief Philipp Scheidemann (MSPD) von einem Fenster des Reichstagsgebaeudes die "Deutsche Republik" aus; rund zwei Stunden spaeter rief Karl Liebknecht (Spartakusbund) vom Berliner Stadtschloss die "Freie Sozialistische Republik Deutschland" aus — Doppelausrufung (Wikipedia DE: `Novemberrevolution`, Sektion Doppelausrufung; `Philipp Scheidemann`; `Karl Liebknecht`).
6. Am Abend des 9. November 1918 uebergab Max von Baden das Amt des Reichskanzlers an Friedrich Ebert (MSPD) — verfassungsrechtlich umstritten, aber faktisch der Beginn der neuen Regierungspraxis (Wikipedia DE: `Friedrich Ebert`, Sektion Reichskanzler 9. November).
7. Am 10. November 1918 konstituierte sich der "Rat der Volksbeauftragten" als Uebergangsregierung mit drei MSPD-Mitgliedern (Ebert, Scheidemann, Landsberg) und drei USPD-Mitgliedern (Haase, Dittmann, Barth) — paritaetisch besetzt (Wikipedia DE: `Rat der Volksbeauftragten`, Sektion Zusammensetzung).
8. In der Nacht vom 9. zum 10. November 1918 schloss Ebert telefonisch ein geheimes Buendnis mit General Wilhelm Groener (Ebert-Groener-Pakt): Die Obersten Heeresleitung sicherte der Regierung Loyalitaet zu; im Gegenzug versprach Ebert, die Offiziersstrukturen zu erhalten und gegen "bolschewistische Bestrebungen" vorzugehen (Wikipedia DE: `Ebert-Groener-Pakt`, Sektion Inhalt).
9. Am 15. November 1918 unterzeichneten Hugo Stinnes (Schwerindustrie) und Carl Legien (Generalkommission der Gewerkschaften) das Stinnes-Legien-Abkommen: Anerkennung der Gewerkschaften, Einfuehrung des 8-Stunden-Tages, Bildung paritaetischer Schlichtungsausschuesse — wichtige Sozialpartnerschaft als Stabilisator (Wikipedia DE: `Stinnes-Legien-Abkommen`, Sektion Bestimmungen).
10. Auf dem Reichsraetekongress (16.-21. Dezember 1918) im Berliner Abgeordnetenhaus beschlossen die Arbeiter- und Soldatenraete mehrheitlich die Wahl einer verfassunggebenden Nationalversammlung — und damit gegen ein dauerhaftes Raetesystem; Termin: 19. Januar 1919 (Wikipedia DE: `Novemberrevolution`, Sektion Reichsraetekongress).

## 1.2 Akteure

| Akteur | Rolle | Wikipedia-Beleg |
|---|---|---|
| **Friedrich Ebert** (1871-1925) | Vorsitzender MSPD; uebernimmt 9.11.1918 das Reichskanzleramt; ab 1919 erster Reichspraesident der Weimarer Republik. Pragmatischer Sozialdemokrat, Anhaenger einer parlamentarischen Demokratie. | Wikipedia DE `Friedrich Ebert` |
| **Philipp Scheidemann** (1865-1939) | MSPD-Politiker; ruft am 9.11.1918 die "Deutsche Republik" vom Reichstag aus; spaeter erster Reichsministerpraesident der Weimarer Republik (Februar-Juni 1919). | Wikipedia DE `Philipp Scheidemann` |
| **Karl Liebknecht** (1871-1919) | Mitbegruender des Spartakusbundes / der KPD; ruft am 9.11.1918 die "Freie Sozialistische Republik" aus; wird im Zuge des Spartakusaufstands am 15.1.1919 ermordet. | Wikipedia DE `Karl Liebknecht` |
| **Wilhelm II.** (1859-1941) | Letzter Deutscher Kaiser und Koenig von Preussen; dankt am 9.11.1918 ab (offizielle Abdankungsurkunde unterzeichnet 28.11.1918), geht ins niederlaendische Exil (Doorn). | Wikipedia DE `Wilhelm II. (Deutsches Reich)` |
| **Wilhelm Groener** (1867-1939) | General, Nachfolger Ludendorffs als Erster Generalquartiermeister; Verhandlungspartner Eberts beim Ebert-Groener-Pakt. | Wikipedia DE `Wilhelm Groener` |

## 1.3 Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| **Doppelausrufung** | Die zeitlich kurz aufeinanderfolgende Ausrufung zweier konkurrierender Republikformen am 9.11.1918 in Berlin (parlamentarische Republik durch Scheidemann; sozialistische Raeterepublik durch Liebknecht). | Symbolisiert den nicht-linearen Verlauf der Novemberrevolution und die innere Zerrissenheit der Arbeiterbewegung. |
| **Rat der Volksbeauftragten** | Paritaetisch aus MSPD und USPD besetzte Uebergangsregierung (10.11.1918 — 13.2.1919); ueberbrueckte die Zeit bis zur Wahl der Nationalversammlung. | Form einer revolutionaeren Regierung, die aber bereits auf einen parlamentarischen Endzustand zustrebte. |
| **Arbeiter- und Soldatenraete** | Spontan entstandene basisdemokratische Versammlungen aus Vertretern der Belegschaften und Truppenteile; Vorbild war die Sowjet-Bewegung in Russland 1917. | Trugen die Revolution lokal; entschieden auf dem Reichsraetekongress mehrheitlich gegen ein dauerhaftes Raetesystem. |
| **Ebert-Groener-Pakt** | Telefonisches Abkommen vom 10.11.1918 zwischen Reichskanzler Ebert und General Groener: Loyalitaet des Militaers im Tausch gegen Erhalt der Offiziersstrukturen. | Ambivalent: kurzfristig stabilisierend, langfristig problematisch (Fortbestehen anti-republikanischer Strukturen im Heer). |
| **Stinnes-Legien-Abkommen** | Vertrag vom 15.11.1918 zwischen Schwerindustrie (Stinnes) und Gewerkschaften (Legien): Anerkennung der Gewerkschaften, 8-Stunden-Tag, paritaetische Schlichtung. | Sozialer Stabilisator der jungen Republik; "Zentralarbeitsgemeinschaft" (ZAG). |
| **Spartakusbund** | 1916 als linker Fluegel der SPD entstandene Gruppe um Liebknecht und Luxemburg; Ende Dezember 1918 Mitgruender der KPD. | Stand fuer eine Raeterepublik nach sowjetischem Vorbild; Gegenpol zur MSPD. |

## 1.4 Zahlen/Daten

| Datum | Ereignis |
|---|---|
| 28.10.1918 | Flottenbefehl der Seekriegsleitung |
| 3.-7.11.1918 | Kieler Matrosenaufstand, Ausweitung auf das Reich |
| 9.11.1918 | Abdankung Wilhelms II. (Verkuendung Max von Baden); Doppelausrufung der Republik in Berlin (Scheidemann ca. 14 Uhr, Liebknecht ca. 16 Uhr — Stundenangaben mit Forschungs-Schwankung) |
| 10.11.1918 | Konstituierung Rat der Volksbeauftragten; Ebert-Groener-Pakt |
| 11.11.1918 | Waffenstillstand von Compiegne — Ende der Kampfhandlungen 1.WK |
| 15.11.1918 | Stinnes-Legien-Abkommen |
| 16.-21.12.1918 | Reichsraetekongress in Berlin |
| 19.1.1919 | Wahl zur Nationalversammlung (Anschlussdatum, schon Mappe M2) |

## 1.5 Wikimedia-Artefakte (Kandidaten, `verified: false`)

| ID | Typ | Beschreibung | Wikimedia-Dateiname (Kandidat) | Lizenz (erwartet) | Kontext | Einbettungsvorschlag | _meta |
|---|---|---|---|---|---|---|---|
| img-1-1 | foto | Aufstaendische Matrosen in Kiel im November 1918 | `File:Bundesarchiv_Bild_183-R72520,_Novemberrevolution,_Matrosen-Aufstand.jpg` | gemeinfrei (Bundesarchiv-Vereinbarung) | DIREKT | M1 Einstieg (Aktivierung Matrosenaufstand) | `verified: false`; `_meta.fallback_begruendung: "Live-Verifikation in Phase 0.2.M durch agent-medienrecherche"` |
| img-1-2 | foto | Philipp Scheidemann bei der Ausrufung der Republik vom Reichstag (Rekonstruktion / spaetere Aufnahme) | `File:Philipp_Scheidemann_Ausrufung_Republik_1918.jpg` (Kandidat — exaktes Datei-ID kann variieren) | gemeinfrei | DIREKT | M1 Erarbeitung (Ausrufung Reichstag) | `verified: false`; falls Originalmoment-Foto fehlt: ANALOGIE-Status moeglich |
| img-1-3 | portrait | Friedrich Ebert (Portraitfoto, ca. 1918/19) | `File:Bundesarchiv_Bild_102-00015,_Friedrich_Ebert.jpg` | gemeinfrei (Bundesarchiv) | DIREKT | M1 Akteurs-Karte | `verified: false` |
| img-1-4 | portrait | Karl Liebknecht (Portraitfoto vor 1919) | `File:Karl_Liebknecht.jpg` | gemeinfrei | DIREKT | M1 Akteurs-Karte | `verified: false` |

## 1.6 Zitate

| ID | Sprecher | Wortlaut | Kontext | Quelle | Eignung |
|---|---|---|---|---|---|
| zit-1-1 | Philipp Scheidemann (9.11.1918, Reichstag) | "Das alte und morsche, die Monarchie ist zusammengebrochen. Es lebe das Neue, es lebe die deutsche Republik!" | Ausrufungsrede vom Westbalkon des Reichstagsgebaeudes; ueberliefert in Scheidemanns Memoiren und in zeitgenoessischen Pressequellen. | Wikipedia DE `Philipp Scheidemann`, Sektion Ausrufung | Kernzitat fuer Quellenarbeit; geeignet fuer Aufgabe "Was meinte Scheidemann mit 'morsch'?" (AFB II) |
| zit-1-2 | Karl Liebknecht (9.11.1918, Stadtschloss) | "Der Tag der Freiheit ist angebrochen. ... Ich proklamiere die freie sozialistische Republik Deutschland." | Ausrufungsrede vom Berliner Stadtschloss; Wortlaut nach zeitgenoessischen Quellen rekonstruiert. | Wikipedia DE `Karl Liebknecht`, Sektion Ausrufung der Sozialistischen Republik | Geeignet fuer Vergleichs-Aufgabe mit zit-1-1 (zwei Republik-Konzeptionen) |

## 1.7 Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung | Diversitaets-Hinweis |
|---|---|---|---|---|---|---|
| rolle-1-1 | Junger Matrose der Hochseeflotte in Wilhelmshaven, 22 Jahre, Heizer | Vgl. biografische Skizzen aus Sekundaerliteratur und Augenzeugenberichten der Matrosenraete-Bewegung | Erlebt die monatelange Stilllegung der Flotte, Hunger, willkuerliche Disziplin, dann den Befehl zum Selbstmordkommando 28.10.1918; verweigert den Befehl, beteiligt sich an Demonstrationen in Kiel, wird Mitglied eines Soldatenrates. | Wikipedia DE `Kieler Matrosenaufstand`, Sektion Soldatenraete | M1 Einstieg / Quellenarbeit (Brief-Format an Familie) | Maennlich-dominiert (historische Realitaet der Marine) — wird durch rolle-2-2 (Marie Juchacz) und rolle-4-3 (Berliner Arbeiterin) ausbalanciert. |
| rolle-1-2 | Berliner Arbeiterin in einer Munitionsfabrik, 35 Jahre, zwei Kinder, Witwe (Mann gefallen 1916) | Vgl. typische Lebenslagen weiblicher Industriearbeiterinnen 1918, dokumentiert u.a. in Sozialberichten der MSPD-Frauenorgan "Die Gleichheit" | Erlebt im November 1918 das Ende der Ruestungsproduktion, drohende Entlassung, gleichzeitig Hoffnung auf eine Republik mit Frauenwahlrecht; nimmt am 9.11. an Demonstrationen in Berlin-Mitte teil. | Wikipedia DE `Novemberrevolution`, Sektion Soziale Lage (Querverweise) | M1 Erarbeitung (Frauen-Perspektive auf Revolution) | **Diversitaets-Soft-Marker:** "bietet sich fuer Personifizierung an"; deckt weibliche Heimatfront-/Arbeiterperspektive ab und schliesst Bruecke zu M2 (Frauenwahlrecht). |

## 1.8 Recherche-Hinweise

- **Quellenqualitaet:** Hervorragend gut belegt; die Novemberrevolution gehoert zu den am besten erforschten Episoden der deutschen Geschichte. Standardwerke: Sebastian Haffner, Heinrich August Winkler ("Weimar 1918-1933"), Ulrich Kluge.
- **Duenne Bereiche:** Genaue Stundenangaben der Doppelausrufung (Scheidemann 14h vs. 14:30h vs. 15h — Forschung uneinig); Ebert-Groener-Pakt war ein telefonisches Geheimabkommen, daher kein Wortprotokoll.
- **Ergiebigste Artikel:** `Novemberrevolution` (Hauptartikel), `Kieler Matrosenaufstand` (Detail Vorgeschichte).
- **Ethik:** Ebert nicht heroisieren (Ebert-Groener-Pakt ambivalent — siehe DIDAKTIK_RAHMEN). Multiperspektivitaet MSPD vs. Spartakus saubernhalten.
- **F0b-Priming-Anwendung:** Sprachniveau-R7 fuer alle SuS-Texte; bei Zitaten Liebknecht/Scheidemann historisch-quellentreuer Wortlaut + Kontextualisierungssatz vorher/nachher (Primaerquellen-Ausnahme F0b §1).
- **Tiefenpruefung KE GPG7_LB2_K_02:** Substopic "nicht-linearer Verlauf" wird durch Doppelausrufung + Reichsraetekongress (Raete vs. Nationalversammlung) abgedeckt — beide als Vertiefungsartikel aufgenommen.

**KE-Abdeckung:** GPG7_LB2_K_02 (HAUPT) gestuetzt durch Fakt 5 (Doppelausrufung), Fakt 6 (Ebert-Uebernahme), Fakt 8 (Ebert-Groener-Pakt), Fakt 10 (Reichsraetekongress) — 4 Fakten, ≥3 erfuellt. Nebenanker GPG7_LB2_K_01 gestuetzt durch Fakt 4 (Abdankung Wilhelm) + Fakt 5; GPG7_LB2_K_08 gestuetzt durch Fakt 1-3 (Kriegsmuedigkeit, Hunger, Matrosen).

---

# Mappe 2 — Die Weimarer Verfassung (Eine Demokratie wird gebaut)

**KE-Anker (Hauptzuordnung):** GPG7_LB2_K_01 (Vergleich absolutistische vs. demokratische Regierungsform — angewandt auf Kaiserreich vs. Weimar).

## 2.1 Fakten und Chronologie

1. Bereits am 12. November 1918 erliess der Rat der Volksbeauftragten einen Aufruf "An das deutsche Volk", der u.a. die Einfuehrung des aktiven und passiven Wahlrechts fuer alle Maenner und Frauen ab 20 Jahren ankuendigte (Wikipedia DE: `Frauenwahlrecht`, Sektion Deutschland 1918).
2. Das Reichswahlgesetz vom 30. November 1918 setzte die Verhaeltniswahl ein und fuehrte erstmals das Frauenwahlrecht im Reich ein — eine grundlegende demokratische Neuerung gegenueber dem Kaiserreich (Wikipedia DE: `Reichswahlgesetz 1918` / `Frauenwahlrecht`).
3. Am 19. Januar 1919 fand die Wahl zur verfassunggebenden Deutschen Nationalversammlung statt; die Wahlbeteiligung lag bei ca. 83 Prozent; die MSPD wurde mit ca. 37,9 Prozent staerkste Kraft, gefolgt vom Zentrum und der DDP. Erstmals zogen 37 Frauen ins Parlament ein (ca. 9,6 Prozent der Mandate) (Wikipedia DE: `Weimarer Nationalversammlung`, Sektion Wahlergebnis).
4. Die Nationalversammlung tagte ab dem 6. Februar 1919 im Deutschen Nationaltheater Weimar — bewusste Symbolwahl: Weimar als Stadt der Klassik (Goethe, Schiller) und ruhige Provinz, weg vom unruhigen Berlin (Wikipedia DE: `Weimarer Nationalversammlung`, Sektion Tagungsort).
5. Am 11. Februar 1919 waehlte die Nationalversammlung Friedrich Ebert zum ersten Reichspraesidenten der Republik (vorlaeufig durch die Versammlung; Direktwahl durch das Volk wurde erst spaeter Verfassungspraxis) (Wikipedia DE: `Friedrich Ebert`, Sektion Wahl zum Reichspraesidenten).
6. Am 19. Februar 1919 hielt die SPD-Abgeordnete Marie Juchacz die erste Rede einer Frau in einem deutschen Parlament; sie begann mit der historischen Anrede "Meine Herren und Damen!" (Wikipedia DE: `Marie Juchacz`, Sektion Erste Rede).
7. Den Verfassungsentwurf erstellte der Staatsrechtler Hugo Preuss (DDP) im Auftrag der Reichsregierung; er orientierte sich an demokratischen Verfassungen anderer Staaten und am foederalen Prinzip (Wikipedia DE: `Hugo Preuss`, Sektion Verfassungsentwurf).
8. Die Weimarer Reichsverfassung wurde am 31. Juli 1919 in Weimar mit 262:75 Stimmen verabschiedet, am 11. August 1919 von Reichspraesident Ebert unterzeichnet und trat am 14. August 1919 in Kraft (Wikipedia DE: `Weimarer Verfassung`, Sektion Verabschiedung).
9. Artikel 1 der Verfassung legt fest: "Das Deutsche Reich ist eine Republik. Die Staatsgewalt geht vom Volke aus." — Volkssouveraenitaet als Grundprinzip; Bruch mit dem monarchischen Prinzip von 1871 (Wikipedia DE: `Weimarer Verfassung`, Art. 1).
10. Artikel 22 fuehrt die allgemeine, gleiche, unmittelbare und geheime Verhaeltniswahl ein; Artikel 41 sieht die Direktwahl des Reichspraesidenten durch das Volk vor; Artikel 48 raeumt dem Reichspraesidenten das Notverordnungsrecht ein — ein spaeter umstrittener "Konstruktionsfehler" (Wikipedia DE: `Weimarer Verfassung`, Sektionen Art. 22, Art. 41, Art. 48).
11. Die Reichsfarben wurden auf Schwarz-Rot-Gold festgelegt (Art. 3) — bewusste Anknuepfung an die Farben der buergerlich-demokratischen Bewegung von 1832/1848, gegen die kaiserlichen Farben Schwarz-Weiss-Rot (Wikipedia DE: `Weimarer Verfassung`, Art. 3).
12. Die Verfassung enthielt einen umfangreichen Grundrechtsteil (Art. 109 ff.): Gleichheit vor dem Gesetz, Meinungs-, Versammlungs- und Religionsfreiheit, Schutz der Familie, soziale Rechte (Recht auf Arbeit, Recht auf Bildung). Damit war sie eine der modernsten Verfassungen ihrer Zeit (Wikipedia DE: `Weimarer Verfassung`, Sektion Grundrechtsteil).

## 2.2 Akteure

| Akteur | Rolle | Wikipedia-Beleg |
|---|---|---|
| **Hugo Preuss** (1860-1925) | Linksliberaler Staatsrechtler (DDP); Verfasser des Verfassungsentwurfs; spaeter Reichsinnenminister. | Wikipedia DE `Hugo Preuss` |
| **Marie Juchacz** (1879-1956) | SPD-Politikerin und Frauenrechtlerin; haelt am 19.2.1919 die erste Rede einer Frau in einem deutschen Parlament; Gruenderin der Arbeiterwohlfahrt (AWO) 1919. | Wikipedia DE `Marie Juchacz` |
| **Friedrich Ebert** (1871-1925) | Erster Reichspraesident der Weimarer Republik (Wahl 11.2.1919, Amtszeit bis 1925). | Wikipedia DE `Friedrich Ebert` |
| **Philipp Scheidemann** (1865-1939) | Erster Reichsministerpraesident der Weimarer Republik (Februar — Juni 1919); Ruecktritt aus Protest gegen Versailles. | Wikipedia DE `Philipp Scheidemann` |

## 2.3 Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| **Volkssouveraenitaet** | Grundsatz, dass alle Staatsgewalt vom Volk ausgeht (Art. 1 WRV). | Bruch mit dem monarchischen Prinzip; Anknuepfung an die franzoesische Revolution. |
| **Parlamentarische Demokratie** | Regierungsform, in der das Parlament die Regierung kontrolliert und der Regierungschef vom Parlament getragen wird. | Weimarer Variante: Reichskanzler braucht Vertrauen des Reichstags (Art. 54), wird aber vom Reichspraesidenten ernannt. |
| **Verhaeltniswahlrecht** | Wahlsystem, bei dem Mandate proportional zu den abgegebenen Stimmen verteilt werden (Art. 22 WRV). | Foerdert Vielparteiensystem; Weimar hatte zeitweise mehr als 10 Reichstagsfraktionen. |
| **Notverordnungsrecht (Art. 48)** | Recht des Reichspraesidenten, bei oeffentlicher Gefahr Massnahmen ohne parlamentarische Zustimmung zu erlassen, ggf. unter Aussetzung von Grundrechten. | Spaeter (1930-1933) systematisch zur Aushoehlung des Parlamentarismus eingesetzt — "Praesidialkabinette". |
| **Frauenwahlrecht** | Aktives und passives Wahlrecht fuer Frauen; im Reich erstmals 30.11.1918 / 19.1.1919. | Eine der wichtigsten demokratischen Neuerungen 1918/19. |
| **Reichspraesident** | Vom Volk direkt gewaehltes Staatsoberhaupt (Art. 41 WRV); Amtszeit 7 Jahre; Oberbefehl ueber Wehrmacht (Art. 47), Notverordnungsrecht (Art. 48) — wegen weitreichender Befugnisse oft als "Ersatzkaiser" bezeichnet. | Ambivalente Rolle: stabilisierend (Ebert) oder destabilisierend (Hindenburg ab 1930). |

## 2.4 Zahlen/Daten

| Datum | Ereignis |
|---|---|
| 30.11.1918 | Reichswahlgesetz: Frauenwahlrecht, Verhaeltniswahl |
| 19.1.1919 | Wahl zur Nationalversammlung (Wahlbeteiligung ca. 83 %, MSPD ca. 37,9 %) |
| 6.2.1919 | Beginn der Tagung in Weimar (Deutsches Nationaltheater) |
| 11.2.1919 | Wahl Eberts zum Reichspraesidenten |
| 19.2.1919 | Marie Juchacz' erste Rede einer Frau im Parlament |
| 31.7.1919 | Verabschiedung der Verfassung (262:75 Stimmen) |
| 11.8.1919 | Unterzeichnung durch Reichspraesident Ebert |
| 14.8.1919 | Inkrafttreten |
| Anteil Frauen NV | 37 Frauen / ca. 9,6 % der Mandate (erstmals) |

## 2.5 Wikimedia-Artefakte (Kandidaten, `verified: false`)

| ID | Typ | Beschreibung | Wikimedia-Dateiname (Kandidat) | Lizenz (erwartet) | Kontext | Einbettungsvorschlag | _meta |
|---|---|---|---|---|---|---|---|
| img-2-1 | foto | Innenansicht Deutsches Nationaltheater Weimar waehrend der Nationalversammlung | `File:Bundesarchiv_Bild_183-R24023,_Weimar,_Nationalversammlung.jpg` (Kandidat) | gemeinfrei (Bundesarchiv) | DIREKT | M2 Einstieg (Tagungsort Weimar) | `verified: false`; `_meta.fallback_begruendung: "Verifikation in Phase 0.2.M"` |
| img-2-2 | foto | Portrait Marie Juchacz | `File:Marie_Juchacz_um_1920.jpg` (Kandidat) | gemeinfrei | DIREKT | M2 Akteurs-Karte (Frauenwahlrecht) | `verified: false` |
| img-2-3 | dokument | Faksimile Titelblatt Reichsgesetzblatt 1919 mit Verfassung | `File:Reichsgesetzblatt_1919_152_S0383.jpg` (Kandidat) | gemeinfrei | DIREKT | M2 Erarbeitung (Verfassungstext) | `verified: false` |
| img-2-4 | wahlplakat | Wahlplakat zur Nationalversammlungswahl 19.1.1919 (z.B. SPD oder DDP) | `File:Wahlplakat_Nationalversammlung_1919_SPD.jpg` (Kandidat) | gemeinfrei | DIREKT | M2 Erarbeitung (erste freie Wahl) | `verified: false`; ggf. mehrere Plakate als Vergleich |

## 2.6 Zitate

| ID | Sprecher | Wortlaut | Kontext | Quelle | Eignung |
|---|---|---|---|---|---|
| zit-2-1 | Weimarer Verfassung Art. 1 (11.8.1919) | "Das Deutsche Reich ist eine Republik. Die Staatsgewalt geht vom Volke aus." | Praeambelnaher Grundlagenartikel; markiert den Bruch mit dem monarchischen Prinzip. | Wikipedia DE `Weimarer Verfassung`, Art. 1 | Kernzitat fuer Begriffsarbeit "Volkssouveraenitaet"; geeignet AFB II (erklaeren) |
| zit-2-2 | Marie Juchacz (19.2.1919, Nationalversammlung Weimar) | "Meine Herren und Damen! ... Es ist das erste Mal, dass in Deutschland die Frau als Freie und Gleiche zum Volke sprechen darf." (sinngemaess; Kernsatz "Meine Herren und Damen" historisch belegt) | Erste Rede einer Frau in einem deutschen Parlament. | Wikipedia DE `Marie Juchacz`, Sektion Erste Rede / Reichstagsprotokoll | Geeignet fuer Quellenarbeit zum Frauenwahlrecht; AFB II-III |

## 2.7 Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung | Diversitaets-Hinweis |
|---|---|---|---|---|---|---|
| rolle-2-1 | Buerger in Weimar, Stadtangestellter, 45 Jahre, vorher kaiserlich-konservativ | Vgl. typische Lebenslagen kleiner Beamter / mittleren Buergertums 1919 | Erlebt die Ankunft der Nationalversammlung in seiner Stadt; ambivalent zwischen Stolz auf den Symbolort und Misstrauen gegenueber der "neuen Zeit"; bemerkt die Umstellung der Beamtenstruktur. | Wikipedia DE `Weimarer Nationalversammlung`, Sektion Tagungsort Weimar | M2 Einstieg (Aussenperspektive auf Verfassungsgebung) | maennlich-buergerlich; ergaenzt durch rolle-2-2 |
| rolle-2-2 | Marie Juchacz (historische Person, real) | siehe Akteur-Tabelle | Abgeordnete der MSPD, organisiert die Frauenarbeit der Partei, formuliert mit Marianne Weber gemeinsam Frauenrechtsforderungen, gruendet im Dezember 1919 die Arbeiterwohlfahrt (AWO). | Wikipedia DE `Marie Juchacz` | M2 Quellenarbeit, Eroeffnungsrede | **Diversitaets-Soft-Marker:** "bietet sich fuer Personifizierung an"; deckt weibliche Verfassungsgeschichte ab; historisch verifiziert. |

## 2.8 Recherche-Hinweise

- **Quellenqualitaet:** Sehr gut. Verfassungstext im Reichsgesetzblatt 1919 Nr. 152 vollstaendig digital verfuegbar.
- **Duenne Bereiche:** Wahlplakate-Auswahl ist umfangreich — fuer Phase 1 ist Kuration noetig (Multiperspektivitaet: nicht nur SPD-Plakate; auch DDP, Zentrum, DNVP zur Vergleichbarkeit).
- **Ergiebigste Artikel:** `Weimarer Verfassung`, `Marie Juchacz`.
- **Ethik:** Verfassung weder als "ideal" noch als "von Anfang an gescheitert" praesentieren; Art. 48 als Konstruktionsfehler erklaeren, ohne Geschichte teleologisch auf 1933 hinzuschreiben.
- **F0b-Priming-Anwendung:** Sprachniveau-R7 — Kompositum "Notverordnungsrecht" muss bei Erstverwendung kurz erklaert werden (max. 12 Woerter Erklaerung).
- **Tiefenpruefung KE GPG7_LB2_K_01:** Vergleich Kaiserreich vs. Weimar wird durch Fakten 9 (Volkssouveraenitaet vs. monarchisches Prinzip), 10 (Wahlrecht), 11 (Reichsfarben) abgedeckt.

**KE-Abdeckung:** GPG7_LB2_K_01 (HAUPT) gestuetzt durch Fakt 9 (Volkssouveraenitaet vs. monarchisches Prinzip), Fakt 10 (Verhaeltniswahl, Direktwahl Reichspraesident), Fakt 11 (Reichsfarben Schwarz-Rot-Gold), Fakt 12 (Grundrechtsteil) — 4 Fakten, ≥3 erfuellt.

---

# Mappe 3 — Versailles und seine Folgen (Vertrag und Wahrnehmungen)

**Hinweis zur Titel-Validierung (Phase 0.2.M):** Der DIDAKTIK_RAHMEN-Titel "Versailles — 'Der Schandfrieden'" verletzt R-TITEL-3 (Perspektiv-Neutralitaet), weil "Schandfrieden" eine spezifische rechtsgerichtete Diskursperspektive vorwegnimmt, die im Material erst multiperspektivisch aufgeloest werden soll. **Korrektur-Vorschlag:** "Versailles 1919 — Vertrag und Wahrnehmungen" (oder "Der Versailler Vertrag und seine Folgen"). Die Anfuehrungszeichen koennen das Problem mildern, aber nicht aufloesen, weil der Titel ohne weitere Kontextualisierung den Diskurs uebernimmt. **PM-Entscheidung erforderlich.**

**KE-Anker (Hauptzuordnung):** GPG7_LB3_K_04 (Versailler Vertrag → Unzufriedenheit der Schichten).
**Nebenanker:** GPG7_LB2_K_08 (Folgen 1.WK).

## 3.1 Fakten und Chronologie

1. Die Pariser Friedenskonferenz begann am 18. Januar 1919; die deutsche Delegation wurde nicht zu den Verhandlungen zugelassen, sondern erhielt nur den fertigen Vertragsentwurf zur schriftlichen Stellungnahme — daher die deutsche Bezeichnung "Diktatfrieden" (Wikipedia DE: `Pariser Friedenskonferenz 1919`, Sektion Deutsche Beteiligung).
2. Die wichtigsten Verhandlungsfuehrer waren US-Praesident Woodrow Wilson, der franzoesische Ministerpraesident Georges Clemenceau und der britische Premierminister David Lloyd George ("Rat der Vier" mit Italiens Vittorio Orlando) (Wikipedia DE: `Pariser Friedenskonferenz 1919`, Sektion Akteure).
3. Reichsministerpraesident Scheidemann lehnte den Vertrag mit den Worten "Welche Hand muesste nicht verdorren, die sich und uns in solche Fesseln legt?" ab und trat am 20. Juni 1919 zurueck; sein Nachfolger Gustav Bauer setzte die Unterzeichnung schliesslich durch (Wikipedia DE: `Philipp Scheidemann`, Sektion Ruecktritt; `Versailler Vertrag`, Sektion Annahme in Deutschland).
4. Am 28. Juni 1919, exakt fuenf Jahre nach dem Attentat von Sarajevo, unterzeichneten die deutschen Aussenminister Hermann Mueller (SPD) und Verkehrsminister Johannes Bell (Zentrum) den Versailler Vertrag im Spiegelsaal von Schloss Versailles (Wikipedia DE: `Versailler Vertrag`, Sektion Unterzeichnung).
5. Artikel 231 (Kriegsschuldartikel) erklaerte Deutschland und seine Verbuendeten zu den Urhebern des Krieges und damit fuer alle Schaeden verantwortlich — die juristische Grundlage fuer die Reparationsforderungen (Wikipedia DE: `Versailler Vertrag`, Sektion Art. 231).
6. Militaerische Bestimmungen: Reduzierung der Reichswehr auf 100.000 Mann (Berufsarmee, kein Wehrdienst), Verbot von schweren Waffen (Panzer, U-Boote, Kampfflugzeuge), Beschraenkung der Marine, Aufloesung des Generalstabs, Entmilitarisierung des Rheinlands, Besetzung des Rheinlands fuer 15 Jahre (Wikipedia DE: `Versailler Vertrag`, Sektion Militaerische Bestimmungen).
7. Territoriale Bestimmungen: Verlust von Elsass-Lothringen an Frankreich, Westpreussen und Posen an Polen ("Polnischer Korridor"), Nordschleswig an Daenemark (nach Plebiszit), Eupen-Malmedy an Belgien, Memelland (spaeter an Litauen), Saargebiet 15 Jahre unter Voelkerbundsverwaltung, Danzig "Freie Stadt", Oberschlesien-Plebiszit 1921 (Teilung), Verlust aller deutschen Kolonien (als Voelkerbund-Mandate verteilt) — insgesamt ca. 13 Prozent des Reichsgebiets und ca. 10 Prozent der Bevoelkerung (Wikipedia DE: `Versailler Vertrag`, Sektion Territoriale Bestimmungen).
8. Reparationen: Die genaue Summe wurde erst am 5. Mai 1921 im Londoner Zahlungsplan auf 132 Milliarden Goldmark festgesetzt (davon ca. 50 Milliarden als A- und B-Bonds tatsaechlich faellig); Deutschland sollte zudem Sachleistungen (Kohle, Eisenbahnmaterial, Vieh) liefern (Wikipedia DE: `Reparationen nach dem Ersten Weltkrieg`, Sektion Londoner Zahlungsplan).
9. Die Reaktionen in Deutschland waren ueberwiegend ablehnend ueber alle politischen Lager hinweg: Konservative und Militaer sprachen vom "Diktatfrieden"; die Sozialdemokratie kritisierte die Belastungen, akzeptierte den Vertrag aber als Notwendigkeit; die Spartakisten lehnten den Vertrag als imperialistisch ab — eine seltene parteiuebergreifende Einigkeit (Wikipedia DE: `Versailler Vertrag`, Sektion Wahrnehmung in Deutschland).
10. Die Dolchstosslegende, die behauptete, das deutsche Heer sei nicht militaerisch besiegt, sondern von revolutionaeren Kraeften "von hinten erdolcht" worden, wurde im Laufe des Jahres 1919 in nationalistischen Kreisen popularisiert und am 18. November 1919 von Generalfeldmarschall Paul von Hindenburg vor einem Untersuchungsausschuss bekraeftigt — sie diente der Entlastung des Militaers und der Belastung der Republik (Wikipedia DE: `Dolchstosslegende`, Sektion Hindenburg-Aussage).
11. Internationale Bewertung: In den USA verweigerte der Senat die Ratifizierung (Isolationismus); der britische Oekonom John Maynard Keynes kritisierte die wirtschaftlichen Bestimmungen 1919 in "The Economic Consequences of the Peace" als ueberzogen — auch in den Siegerstaaten war der Vertrag nicht unumstritten (Wikipedia DE: `Versailler Vertrag`, Sektion Internationale Bewertung).

## 3.2 Akteure

| Akteur | Rolle | Wikipedia-Beleg |
|---|---|---|
| **Georges Clemenceau** (1841-1929) | Franzoesischer Ministerpraesident; treibende Kraft fuer harte Bestimmungen aus Sicherheitsinteresse Frankreichs ("Le Tigre"). | Wikipedia DE `Georges Clemenceau` |
| **Woodrow Wilson** (1856-1924) | US-Praesident; Initiator der "14 Punkte" mit liberal-multilateralem Friedensprogramm; konnte sich gegenueber Clemenceau und Lloyd George nur teilweise durchsetzen. | Wikipedia DE `Woodrow Wilson` |
| **David Lloyd George** (1863-1945) | Britischer Premierminister; vermittelnde Position zwischen Wilson und Clemenceau. | Wikipedia DE `David Lloyd George` |
| **Hermann Mueller** (1876-1931) | Deutscher Aussenminister, unterzeichnet als Mitglied der zweiten Delegation den Vertrag am 28.6.1919. | Wikipedia DE `Hermann Mueller (Reichskanzler)` |
| **Paul von Hindenburg** (1847-1934) | Generalfeldmarschall a.D.; bekraeftigt am 18.11.1919 die Dolchstosslegende vor dem parlamentarischen Untersuchungsausschuss. | Wikipedia DE `Paul von Hindenburg` |

## 3.3 Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| **Diktatfrieden** | Deutsche zeitgenoessische Bezeichnung des Versailler Vertrags, weil die deutsche Delegation an den Verhandlungen nicht beteiligt war und nur den fertigen Text zur Unterzeichnung erhielt. | Eigenbezeichnung; in der Forschung wird die Bezeichnung kritisch kontextualisiert (auch andere Friedensvertraege jener Zeit waren Diktate). |
| **Kriegsschuldartikel (Art. 231)** | Vertragsartikel, der Deutschland und seinen Verbuendeten die alleinige Kriegsschuld zuschreibt — juristische Grundlage fuer die Reparationen. | Politisch-emotional zentral fuer die Ablehnung in Deutschland; historiographisch ist die Zuschreibung "alleinige" Kriegsschuld umstritten (Fischer-Kontroverse). |
| **Reparationen** | Wiedergutmachungs-Zahlungen Deutschlands an die Siegermaechte zur Begleichung von Kriegsschaeden, festgelegt nach dem Versailler Vertrag, konkretisiert im Londoner Zahlungsplan 1921 (132 Mrd. Goldmark). | Zentraler wirtschaftlicher Belastungsfaktor; Mitursache der Hyperinflation 1923 und der Ruhrkrise. |
| **Dolchstosslegende** | Politische Legende, das deutsche Heer sei im 1.Weltkrieg militaerisch unbesiegt geblieben und nur durch revolutionaere Kraefte "von hinten erdolcht" worden. | Historisch falsch (das Heer war militaerisch geschlagen); diente der Entlastung des Militaers und der Diffamierung der Republik. **Kontroverse — als Legende kennzeichnen!** |
| **Reichswehr** | Berufsarmee des Deutschen Reichs nach dem Versailler Vertrag, beschraenkt auf 100.000 Mann; Kernteil des Sicherheitsdispositivs der Weimarer Republik. | Politisch ambivalent: oft als "Staat im Staate" kritisch beurteilt (vgl. M4 Kapp-Putsch). |
| **Spiegelsaal von Versailles** | Repraesentativer Saal im Schloss Versailles, in dem 1871 die Reichsgruendung des Deutschen Reichs proklamiert wurde — bewusste symbolische Rueckkehr 1919, um die deutsche Demuetigung zu inszenieren. | Symbolort par excellence; wichtig fuer das Verstaendnis der franzoesischen Symbolpolitik. |

## 3.4 Zahlen/Daten

| Datum | Ereignis |
|---|---|
| 18.1.1919 | Beginn der Pariser Friedenskonferenz |
| 7.5.1919 | Uebergabe des Vertragsentwurfs an die deutsche Delegation in Versailles |
| 16.6.1919 | Ultimatum der Alliierten: Annahme oder Wiederaufnahme der Kampfhandlungen |
| 20.6.1919 | Ruecktritt Reichsministerpraesident Scheidemann |
| 22.6.1919 | Nationalversammlung stimmt Annahme zu |
| 28.6.1919 | Unterzeichnung im Spiegelsaal Versailles |
| 10.1.1920 | Inkrafttreten |
| 5.5.1921 | Londoner Zahlungsplan: 132 Mrd. Goldmark Reparationen |
| 18.11.1919 | Hindenburg bekraeftigt Dolchstosslegende vor Untersuchungsausschuss |
| Gebietsverlust | ca. 13 % Reichsgebiet, ca. 10 % Bevoelkerung |
| Reichswehrobergrenze | 100.000 Mann |

## 3.5 Wikimedia-Artefakte (Kandidaten, `verified: false`)

| ID | Typ | Beschreibung | Wikimedia-Dateiname (Kandidat) | Lizenz (erwartet) | Kontext | Einbettungsvorschlag | _meta |
|---|---|---|---|---|---|---|---|
| img-3-1 | foto | Unterzeichnung des Versailler Vertrags im Spiegelsaal, 28.6.1919 (Gemaelde-Reproduktion oder zeitgenoessisches Foto) | `File:William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg` (Gemaelde von William Orpen, Imperial War Museum) | gemeinfrei (Urheber 1931 verstorben — abhaengig von Lizenzland) | DIREKT | M3 Einstieg (Symbolort) | `verified: false`; Lizenz-Pruefung in 0.2.M kritisch |
| img-3-2 | karte | Karte der deutschen Gebietsverluste 1919 | `File:German_losses_after_WWI.svg` (Kandidat — Suche nach DE-Variante) | CC-BY-SA (typisch fuer Karten-Bearbeitungen) | DIREKT | M3 Erarbeitung (territoriale Bestimmungen) | `verified: false`; ggf. mehrere Karten zur Auswahl |
| img-3-3 | karikatur | Zeitgenoessische deutsche oder britische Karikatur zum Versailler Vertrag (z.B. Tiger Clemenceau) | `File:Versailles_Treaty_Caricature_1919.jpg` (Kandidat — Auswahl in 0.2.M) | gemeinfrei | DIREKT | M3 Erarbeitung (Multiperspektivitaet) | `verified: false`; ANALOGIE moeglich (britische Karikatur fuer deutsche Wahrnehmung) |
| img-3-4 | dokument | Faksimile Erste Seite des Versailler Vertrags (deutsche oder franzoesische Ausgabe) | `File:Treaty_of_Versailles_first_page.jpg` (Kandidat) | gemeinfrei | DIREKT | M3 Vertragsbestimmungen (Quellenarbeit) | `verified: false` |

## 3.6 Zitate

| ID | Sprecher | Wortlaut | Kontext | Quelle | Eignung |
|---|---|---|---|---|---|
| zit-3-1 | Versailler Vertrag Art. 231 | "Die alliierten und assoziierten Regierungen erklaeren, und Deutschland erkennt an, dass Deutschland und seine Verbuendeten als Urheber fuer alle Verluste und Schaeden verantwortlich sind, welche die alliierten und assoziierten Regierungen und ihre Staatsangehoerigen infolge des ihnen durch den Angriff Deutschlands und seiner Verbuendeten aufgezwungenen Krieges erlitten haben." | Kriegsschuldartikel — juristische Grundlage der Reparationen. | Wikipedia DE `Versailler Vertrag`, Sektion Art. 231 | Kernquelle Quellenarbeit M3; AFB II-III; F0b-Sprachregister (lange Saetze!) → Vorschalt-Erklaersatz pflichtig |
| zit-3-2 | Philipp Scheidemann (12.5.1919, vor Nationalversammlung in Berlin) | "Welche Hand muesste nicht verdorren, die sich und uns in solche Fesseln legt?" | Empoerte Reaktion auf den Vertragsentwurf; fuehrt zum Ruecktritt 20.6.1919. | Wikipedia DE `Philipp Scheidemann`, Sektion Ruecktritt | Geeignet AFB II (deutsche Reaktion analysieren) |
| zit-3-3 | Paul von Hindenburg (18.11.1919, Untersuchungsausschuss Berlin) | "Wie ein englischer General mit Recht sagt: 'Die deutsche Armee wurde von hinten erdolcht.'" | Bekraeftigung der Dolchstosslegende vor dem parlamentarischen Untersuchungsausschuss. | Wikipedia DE `Dolchstosslegende`, Sektion Hindenburg-Aussage | **Pflicht-Kontroverse-Markierung:** Legende, nicht Fakt; mit Kontextualisierungssatz versehen (F0b-Primaerquellen-Ausnahme) |

## 3.7 Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung | Diversitaets-Hinweis |
|---|---|---|---|---|---|---|
| rolle-3-1 | Schueler in Strassburg, 14 Jahre, Sohn eines deutschen Beamten, der das Elsass nach 1918 verlassen muss | Vgl. Erinnerungsliteratur Optanten Elsass-Lothringen 1918/19 | Erlebt im November 1918 die Rueckkehr Strassburgs zu Frankreich, den Wechsel der Schulsprache, schliesslich die "Optanten"-Entscheidung der Familie und die Uebersiedlung nach Baden. | Wikipedia DE `Versailler Vertrag`, Sektion Elsass-Lothringen | M3 (Personifizierung Gebietsverluste) | maennlich-buergerlich-deutsch — wird durch rolle-3-2 ergaenzt |
| rolle-3-2 | Junge polnische Lehrerin in Posen, 28 Jahre, hofft auf das neue Polen | Vgl. lokal-historische Studien zur Wojewodschaft Posen 1919 | Erlebt die Rueckkehr Posens zum neugegruendeten Polen als Befreiung, beginnt polnischsprachigen Unterricht, beobachtet die Auswanderung deutschsprachiger Familien. | Wikipedia DE `Provinz Posen`, Sektion Wiedergeburt Polens / Wikipedia DE `Versailler Vertrag` Sektion Polen | M3 (Multiperspektivitaet, Sieger-Sicht) | **Diversitaets-Soft-Marker:** "bietet sich fuer Personifizierung an"; weiblich, polnisch — bricht die einseitig deutsche Opferperspektive auf, wichtig fuer Beutelsbacher Konsens. |

## 3.8 Recherche-Hinweise

- **Quellenqualitaet:** Sehr gut, sowohl Vertragstext als auch zeitgenoessische Reaktionen sind umfassend dokumentiert.
- **Duenne Bereiche:** Originaltexte der Verhandlungsprotokolle sind komplex und nicht R7-tauglich — fuer Materialien Auszuege/Paraphrasen verwenden.
- **Ergiebigste Artikel:** `Versailler Vertrag` (Hauptartikel), `Dolchstosslegende`.
- **Ethik:** **Pflicht-Multiperspektivitaet:** Franzoesische Sicherheitsinteressen (zwei deutsche Invasionen 1870 + 1914), polnische Befreiungsperspektive, deutsche Opferperspektive parallel darstellen. Versailles NICHT als "Schandfrieden" einseitig praesentieren (siehe DIDAKTIK_RAHMEN). Dolchstosslegende KLAR als Legende kennzeichnen.
- **F0b-Priming-Anwendung:** Sprachniveau-R7 — Art. 231 ist 51 Woerter lang; muss durch Lehrtext zerlegt werden (Kontextsatz vor + Strukturierungs-Hinweis nach Originaltext, Primaerquellen-Ausnahme greift).
- **Tiefenpruefung KE GPG7_LB3_K_04:** Substopic "wesentliche Bestimmungen" militaerisch (Fakt 6), territorial (Fakt 7), wirtschaftlich (Fakt 8) abgedeckt. Substopic "Unzufriedenheit der Schichten" durch Fakt 9 (parteiuebergreifende Ablehnung) abgedeckt; vertieft in M4.

**KE-Abdeckung:** GPG7_LB3_K_04 (HAUPT) gestuetzt durch Fakt 5 (Art. 231), Fakt 6 (Militaer), Fakt 7 (Territorium), Fakt 8 (Reparationen), Fakt 9 (Reaktion Schichten) — 5 Fakten, ≥3 erfuellt. Nebenanker GPG7_LB2_K_08 gestuetzt durch Fakt 1 (Folgen 1.WK).

---

# Mappe 4 — Republik unter Druck (Bedrohungen 1919-1923)

**KE-Anker (Hauptzuordnung):** GPG7_LB3_K_04 (Anwendung — wie sich die Versailles-Unzufriedenheit in konkrete Putschversuche und Krisen entlaedt).
**Nebenanker:** GPG7_LB2_K_02 (nicht-linearer Verlauf — die Demokratie wird gleichzeitig von links und rechts angegriffen), GPG7_LB2_K_01 (Anwendung Demokratie-Wert).

## 4.1 Fakten und Chronologie

1. Am 1. Januar 1919 gruendete sich auf dem Parteitag in Berlin die Kommunistische Partei Deutschlands (KPD) aus dem Spartakusbund und Teilen der USPD-Linken; Karl Liebknecht und Rosa Luxemburg gehoerten zur Fuehrung (Wikipedia DE: `Kommunistische Partei Deutschlands`, Sektion Gruendungsparteitag).
2. Vom 5. bis 12. Januar 1919 fand in Berlin der "Spartakusaufstand" (Januaraufstand) statt: Auseinandersetzung um die Absetzung des linken Berliner Polizeipraesidenten Eichhorn eskalierte zu Strassenkaempfen; Reichswehr und Freikorps schlugen den Aufstand mit ca. 150-200 Toten nieder (Wikipedia DE: `Spartakusaufstand`, Sektion Verlauf).
3. Am 15. Januar 1919 wurden Rosa Luxemburg und Karl Liebknecht von Freikorps-Offizieren der Garde-Kavallerie-Schuetzen-Division im Berliner Tiergarten ermordet; Luxemburgs Leiche wurde in den Landwehrkanal geworfen und erst am 31. Mai 1919 geborgen (Wikipedia DE: `Karl Liebknecht`, Sektion Tod; `Rosa Luxemburg`, Sektion Ermordung).
4. Am 21. Februar 1919 wurde der bayerische Ministerpraesident Kurt Eisner (USPD) auf dem Weg zum Landtag in Muenchen vom Grafen Anton von Arco-Valley erschossen — eine politische Ermordung, die die Eskalation in Bayern verschaerfte (Wikipedia DE: `Kurt Eisner`, Sektion Ermordung).
5. Im April 1919 wurde in Muenchen die Raeterepublik ausgerufen (zunaechst MSPD-Beteiligung unter Hoffmann, dann ab 7.4. eine "Erste Raeterepublik" um Ernst Toller, Erich Muehsam und Gustav Landauer, ab 13.4. eine "Kommunistische Raeterepublik" unter Eugen Levine); die Reichsregierung schickte Reichswehr und Freikorps, die die Raeterepublik bis zum 2. Mai 1919 mit ueber 600 Toten brutal niederschlugen (Wikipedia DE: `Muenchner Raeterepublik`, Sektion Verlauf und Niederschlagung).
6. Vom 13. bis 17. Maerz 1920 versuchten der ostpreussische Generallandschaftsdirektor Wolfgang Kapp und General Walther von Luettwitz mit der Marine-Brigade Ehrhardt einen Staatsstreich gegen die Reichsregierung (Kapp-Luettwitz-Putsch); die Putschisten besetzten das Berliner Regierungsviertel, die Regierung floh nach Stuttgart (Wikipedia DE: `Kapp-Luettwitz-Putsch`, Sektion Verlauf).
7. Der Generalstreikaufruf der ADGB-Gewerkschaften unter Carl Legien sowie die Loyalitaetsverweigerung weiter Teile der Beamtenschaft brachten den Putsch nach nur vier Tagen zum Scheitern; ca. 12 Millionen Beschaeftigte beteiligten sich am Generalstreik — die "Buergerantwort" rettete die Republik (Wikipedia DE: `Generalstreik gegen den Kapp-Putsch`, Sektion Beteiligung).
8. Im Anschluss an den Kapp-Putsch kam es im Ruhrgebiet zum Aufstand der "Roten Ruhrarmee" (ca. 50.000-80.000 Bewaffnete); Reichswehr und Freikorps schlugen auch diesen Aufstand mit hohen Opferzahlen nieder (Maerz/April 1920) (Wikipedia DE: `Maerzaufstand 1920`, Sektion Niederschlagung).
9. Am 11. Januar 1923 besetzten franzoesische und belgische Truppen das Ruhrgebiet als Reaktion auf angebliche deutsche Saeumigkeit bei Reparationszahlungen (Ruhrkampf); die Reichsregierung Cuno rief zum "passiven Widerstand" auf, was die ohnehin angeschlagene Wirtschaft endgueltig in die Hyperinflation trieb (Wikipedia DE: `Ruhrbesetzung`, Sektion Verlauf).
10. Die Hyperinflation erreichte im November 1923 ihren Hoehepunkt: Am 20. November 1923 entsprach 1 US-Dollar ca. 4,2 Billionen Mark; das Vermoegen breiter Mittelschichten (Sparer, Rentner) war vernichtet (Wikipedia DE: `Deutsche Inflation 1914-1923`, Sektion Hoehepunkt November 1923).
11. Am 8. und 9. November 1923 versuchten Adolf Hitler und General Erich Ludendorff in Muenchen einen Staatsstreich (Hitler-Putsch / Buergerbraeu-Putsch); die Bayerische Landespolizei stoppte den Marsch zur Feldherrnhalle mit Schuessen — 14 Putschisten und 4 Polizisten kamen ums Leben; Hitler wurde verhaftet (Wikipedia DE: `Hitlerputsch`, Sektion Verlauf 8./9.11.1923) — Ausblick fuer R8-Stoff.
12. Am 15. November 1923 wurde die Rentenmark als Uebergangswaehrung eingefuehrt (Umtauschverhaeltnis 1 Rentenmark = 1 Billion alte Mark); damit endete die Hyperinflation; die Aera der Stabilisierung begann (Wikipedia DE: `Rentenmark`, Sektion Einfuehrung 15.11.1923).

## 4.2 Akteure

| Akteur | Rolle | Wikipedia-Beleg |
|---|---|---|
| **Rosa Luxemburg** (1871-1919) | Marxistische Theoretikerin polnisch-juedischer Herkunft; Mitbegruenderin der KPD; ermordet 15.1.1919. Kritisierte sowohl Reformismus der MSPD als auch Diktaturtendenzen Lenins ("Freiheit ist immer Freiheit der Andersdenkenden"). | Wikipedia DE `Rosa Luxemburg` |
| **Karl Liebknecht** (1871-1919) | siehe M1 — wird im Spartakusaufstand ermordet 15.1.1919. | Wikipedia DE `Karl Liebknecht` |
| **Kurt Eisner** (1867-1919) | USPD-Politiker, juedischer Herkunft; bayerischer Ministerpraesident 1918/19; ermordet 21.2.1919 in Muenchen. | Wikipedia DE `Kurt Eisner` |
| **Wolfgang Kapp** (1858-1922) | Konservativ-deutschnationaler Beamter, Gruender der Deutschen Vaterlandspartei (1917); Anfuehrer des Kapp-Luettwitz-Putschs. | Wikipedia DE `Wolfgang Kapp` |
| **Walther von Luettwitz** (1859-1942) | General, Kommandeur des Reichswehr-Gruppenkommandos I in Berlin; militaerischer Anfuehrer des Putschs; Konflikt mit Reichsregierung um Aufloesung der Marine-Brigaden. | Wikipedia DE `Walther von Luettwitz` |
| **Carl Legien** (1861-1920) | Vorsitzender der ADGB-Gewerkschaften; ruft am 13.3.1920 zum Generalstreik gegen den Kapp-Putsch auf — entscheidende Buergerantwort. | Wikipedia DE `Carl Legien` |
| **Hjalmar Schacht** (1877-1970) | Reichswaehrungskommissar ab November 1923; konzipiert die Rentenmark-Einfuehrung. | Wikipedia DE `Hjalmar Schacht` |

## 4.3 Fachbegriffe

| Begriff | Definition | Kontext |
|---|---|---|
| **Spartakusaufstand / Januaraufstand** | Bewaffnete Auseinandersetzung in Berlin (5.-12.1.1919) zwischen revolutionaeren linken Gruppen und Regierungstruppen / Freikorps; mit Niederlage der Aufstaendischen und der Ermordung Liebknecht/Luxemburg. | Markiert den endgueltigen Bruch zwischen MSPD und KPD; "blutige Geburtsstunde" der jungen Republik. |
| **Freikorps** | Paramilitaerische Formationen aus ehemaligen Soldaten und Offizieren, die nach 1918 von der Regierung Ebert/Noske zur Niederschlagung von Aufstaenden eingesetzt wurden, aber zunehmend gegen die Republik agierten. | Strukturelles Problem: vom Staat finanziert, aber anti-republikanisch — Kapp-Putsch 1920 wesentlich von Freikorps-Verbaenden getragen. |
| **Raeterepublik** | Form einer revolutionaeren Regierung auf Basis von Arbeiter-, Soldaten- und Bauernraeten (vgl. Sowjet-Modell); in Bayern April 1919 ausgerufen, nach drei Wochen blutig niedergeschlagen. | Innerlinker Konflikt: Befuerworter wollten direkte Demokratie, Gegner sahen darin Diktaturgefahr. |
| **Kapp-Luettwitz-Putsch** | Rechtsgerichteter Staatsstreich-Versuch 13.-17.3.1920 gegen die Reichsregierung; gescheitert am Generalstreik der Gewerkschaften. | Erstes ernsthaftes Versagen der Reichswehr als Loyalitaetstraeger der Republik (Hans von Seeckt: "Reichswehr schiesst nicht auf Reichswehr"). |
| **Generalstreik** | Reichsweiter Arbeitsausstand der Gewerkschaften vom 13.3.1920 zur Verteidigung der Republik gegen den Kapp-Putsch; ca. 12 Millionen Teilnehmer. | Beleg fuer demokratische Tragfaehigkeit der Buergergesellschaft (Gewerkschaften als "Republikretter"). |
| **Hyperinflation** | Oekonomisches Phaenomen extrem rascher Geldentwertung; in Deutschland erreichte sie im November 1923 ihren Hoehepunkt (1 USD = 4,2 Billionen Mark am 20.11.1923). | Politische Konsequenz: Verarmung breiter Mittelschichten, Vertrauensverlust in die Republik, sozialer Naehrboden fuer Radikalisierung. |
| **Ruhrkampf / Ruhrbesetzung** | Franzoesisch-belgische Besetzung des Ruhrgebiets ab 11.1.1923 wegen Reparationsrueckstaenden; Antwort: deutscher "passiver Widerstand"; Folge: Inflations-Beschleunigung. | Kollision Versailles-Bestimmungen mit deutscher Realpolitik. |
| **Rentenmark** | Uebergangswaehrung ab 15.11.1923 (1 Rentenmark = 1 Billion alte Mark); gedeckt durch Grundpfandrechte auf Industrie- und Landwirtschaftsbesitz. | Beendet die Hyperinflation; Beginn der Stabilisierungsphase ("Goldene Zwanziger"). |
| **"Republik ohne Republikaner"** | Wissenschaftliche These (Sontheimer 1962): Die Weimarer Republik wurde von zu wenigen ihrer Funktionstraeger und Buerger aktiv unterstuetzt, was sie strukturell verwundbar machte. | **Pflicht-Kontroverse-Markierung:** als wissenschaftliche These, nicht als Selbstverstaendlichkeit kennzeichnen (siehe DIDAKTIK_RAHMEN). |

## 4.4 Zahlen/Daten

| Datum | Ereignis |
|---|---|
| 1.1.1919 | KPD-Gruendung Berlin |
| 5.-12.1.1919 | Spartakusaufstand Berlin (ca. 150-200 Tote) |
| 15.1.1919 | Ermordung Liebknecht/Luxemburg |
| 21.2.1919 | Ermordung Kurt Eisner Muenchen |
| 7.4.-2.5.1919 | Muenchner Raeterepublik (>600 Tote bei Niederschlagung) |
| 13.-17.3.1920 | Kapp-Luettwitz-Putsch + Generalstreik (ca. 12 Mio. Teilnehmer) |
| 15.3.-2.4.1920 | Maerzaufstand Ruhrgebiet (Rote Ruhrarmee) |
| 11.1.1923 | Ruhrbesetzung beginnt |
| 20.11.1923 | Hyperinflations-Hoehepunkt: 1 USD = 4,2 Billionen Mark |
| 8./9.11.1923 | Hitler-Putsch Muenchen (Ausblick) |
| 15.11.1923 | Rentenmark (Stabilisierung) |
| Reichswehr | 100.000 Mann (Versailles-Limit) |

## 4.5 Wikimedia-Artefakte (Kandidaten, `verified: false`)

| ID | Typ | Beschreibung | Wikimedia-Dateiname (Kandidat) | Lizenz (erwartet) | Kontext | Einbettungsvorschlag | _meta |
|---|---|---|---|---|---|---|---|
| img-4-1 | foto | Strassenbarrikade in Berlin waehrend des Spartakusaufstands Januar 1919 | `File:Bundesarchiv_Bild_183-J0908-0600-002,_Berlin,_Spartakusaufstand,_Barrikade.jpg` (Kandidat) | gemeinfrei (Bundesarchiv) | DIREKT | M4 Einstieg (Januaraufstand) | `verified: false` |
| img-4-2 | portrait | Rosa Luxemburg | `File:Rosa_Luxemburg.jpg` | gemeinfrei | DIREKT | M4 Akteurs-Karte (Diversitaets-Marker) | `verified: false` |
| img-4-3 | foto | Marine-Brigade Ehrhardt mit Hakenkreuz-Helm-Symbol beim Einmarsch in Berlin am 13.3.1920 | `File:Bundesarchiv_Bild_183-J0305-0600-003,_Kapp-Putsch,_Marinebrigade_Ehrhardt.jpg` (Kandidat) | gemeinfrei (Bundesarchiv) | DIREKT | M4 Erarbeitung (Kapp-Putsch — sichtbares Hakenkreuz als Vorausweis NS) | `verified: false`; sensibel — paedagogische Kontextualisierung pflichtig |
| img-4-4 | foto | Generalstreik 1920 — Plakat oder Strassenszene | `File:Generalstreik_1920_Aufruf.jpg` (Kandidat) | gemeinfrei | DIREKT | M4 Erarbeitung (Buergerantwort) | `verified: false` |
| img-4-5 | foto | Hyperinflation 1923 — Banknotenstapel oder Brotkauf mit Geldbergen | `File:Bundesarchiv_Bild_102-00193,_Inflation,_Tapezieren_mit_Banknoten.jpg` (Kandidat) | gemeinfrei (Bundesarchiv) | DIREKT | M4 Erarbeitung (Hyperinflation konkret) | `verified: false` |

## 4.6 Zitate

| ID | Sprecher | Wortlaut | Kontext | Quelle | Eignung |
|---|---|---|---|---|---|
| zit-4-1 | Rosa Luxemburg (Schrift "Die Russische Revolution", 1918, postum 1922) | "Freiheit ist immer die Freiheit des Andersdenkenden." | Kritik an der bolschewistischen Diktatur — zentrale Aussage zur demokratischen Verantwortung. | Wikipedia DE `Rosa Luxemburg`, Sektion Schriften / Zitate | Kernzitat fuer Demokratiebildung; AFB III; F0b-Sprachregister: kurz und R7-tauglich |
| zit-4-2 | Hans von Seeckt (sinngemaess, 13.3.1920 zu Reichswehrminister Noske) | "Reichswehr schiesst nicht auf Reichswehr." | Begruendung, warum die Reichswehr den Kapp-Putsch nicht gewaltsam niederschlug — strukturelles Loyalitaetsproblem der Republik. | Wikipedia DE `Kapp-Luettwitz-Putsch`, Sektion Reichswehr-Haltung | Geeignet fuer Aufgabe "Welche Schwaeche der Republik wird hier sichtbar?" AFB III |
| zit-4-3 | Carl Legien (Generalstreikaufruf, 13.3.1920) | "Arbeiter! Parteigenossen! Die militaerische Diktatur ist da. ... Legt die Arbeit nieder! Streikt! Wuergt diese Reaktion mit allen Mitteln ab! Kaempft mit jedem Mittel fuer die Erhaltung der Republik!" | Aufruf der ADGB-Gewerkschaften zum Generalstreik gegen den Kapp-Putsch. | Wikipedia DE `Generalstreik gegen den Kapp-Putsch`, Sektion Aufruf | Kernquelle Buergerantwort; AFB II-III |

## 4.7 Rollenprofile

| ID | Rolle | Historische Basis | Typische Erfahrung | Wikipedia-Beleg | Mappe-Eignung | Diversitaets-Hinweis |
|---|---|---|---|---|---|---|
| rolle-4-1 | Berliner Strassenbahnschaffner, 38 Jahre, Mitglied der ADGB-Gewerkschaft | Vgl. Lebenslagen der Berliner Verkehrsarbeiter 1920 | Erlebt am 13.3.1920 den Einmarsch der Marine-Brigade Ehrhardt, beteiligt sich am Generalstreik, erlebt das Scheitern des Putschs als persoenlichen Sieg der Buergergesellschaft. | Wikipedia DE `Generalstreik gegen den Kapp-Putsch` | M4 Kapp-Putsch + Generalstreik | maennlich-arbeiterlich; Generalstreik wird durch rolle-4-3 weiblich ergaenzt |
| rolle-4-2 | Junger Reichswehrsoldat in einer Berliner Garde-Einheit, 23 Jahre, ehemaliger Frontkaempfer | Vgl. typische Sozialisierung Frontgeneration / Freikorps-Mentalitaet | Erlebt im Januar 1919 den Spartakusaufstand und die Niederschlagung; ist hin- und hergerissen zwischen Loyalitaet zur Reichsregierung und Sympathie fuer das alte Offizierskorps; nimmt 1920 am Kapp-Putsch teil oder distanziert sich. | Wikipedia DE `Reichswehr`, Sektion Loyalitaetsproblem | M4 Spartakusaufstand und Kapp-Putsch (innerseelisch ambivalente Figur) | maennlich-militaerisch; deckt die kontroverse "Reichswehr-Mentalitaet" ab |
| rolle-4-3 | Berliner Hausfrau, 42 Jahre, Mutter dreier Kinder, Witwe oder Frau eines Arbeiters | Vgl. Hyperinflations-Erfahrungsberichte 1923 (z.B. Tagebuch Bella Fromm o.ae.) | Erlebt im Sommer/Herbst 1923 den taeglichen Wertverfall des Geldes (Lohn morgens — Brot kaufen mittags), die Verzweiflung der Sparer-Familie, die Erleichterung bei der Rentenmark-Einfuehrung im November 1923. | Wikipedia DE `Deutsche Inflation 1914-1923`, Sektion Soziale Folgen | M4 Hyperinflation | **Diversitaets-Soft-Marker:** "bietet sich fuer Personifizierung an"; weibliche Alltagsperspektive auf die oekonomische Bedrohung — entgegen einseitig politischer Akteursfokus. |

## 4.8 Recherche-Hinweise

- **Quellenqualitaet:** Sehr gut. Spartakusaufstand und Kapp-Putsch sind dicht erforscht; Hyperinflation 1923 hat reichhaltige Tagebuch-, Zeitungs- und statistische Belege.
- **Duenne Bereiche:** Genaue Toten-Zahlen Spartakusaufstand und Muenchner Raeterepublik forschungsumstritten (Spannweiten); im Material mit "ca." markieren.
- **Ergiebigste Artikel:** `Spartakusaufstand`, `Kapp-Luettwitz-Putsch`, `Deutsche Inflation 1914-1923`.
- **Ethik:** **Pflicht-Multiperspektivitaet** — links (Spartakus, Raete) UND rechts (Kapp, Hitler) als Bedrohungen darstellen, KEINE Aequidistanz aber auch KEINE Daemonisierung der einen Seite. Liebknecht/Luxemburg-Mord sachlich-nuechtern, Opferperspektive wuerdigen (DIDAKTIK_RAHMEN-Sensibilitaet). Hyperinflation konkret machen, ohne SuS-Existenzaengste zu triggern.
- **F0b-Priming-Anwendung:** Sprachniveau-R7; Trigger-Sensibilitaet auf Gewalt (Liebknecht/Luxemburg-Mord, Kampfhandlungen) — POLICY_TRIGGER_SICHTBARKEIT (STR-12) Hinweis fuer Lehrkraft im Hefteintrag-Lehrerteil. Multiperspektiv-Pflicht (M4 ist die Schluesselmappe — mind. 2 nicht-dominante Perspektiv-Tags pro Material-Set).
- **Tiefenpruefung KE GPG7_LB3_K_04 (Anwendung):** Substopic "Unzufriedenheit" entlaedt sich konkret in Spartakusaufstand (links, Fakt 2-3), Kapp-Putsch (rechts, Fakt 6-7), Hitler-Putsch (Fakt 11). Bezug zu Versailles direkt durch Ruhrbesetzung (Fakt 9) — Versailles-Reparationen als Ausloeser.

**KE-Abdeckung:** GPG7_LB3_K_04 (HAUPT, Anwendung) gestuetzt durch Fakt 2 (Spartakus), Fakt 6 (Kapp-Putsch), Fakt 9 (Ruhrkampf — direkter Versailles-Bezug), Fakt 10 (Hyperinflation als Reparations-Folge), Fakt 11 (Hitler-Putsch) — 5 Fakten, ≥3 erfuellt. Nebenanker GPG7_LB2_K_02 gestuetzt durch Fakten 2, 5, 6 (gleichzeitige Bedrohung links/rechts = nicht-linearer Verlauf); GPG7_LB2_K_01 gestuetzt durch Fakt 7 (Generalstreik als demokratische Buergerantwort).

---

## Primaerquellen (game-weit, ≥2 Pflicht)

| ID | Typ | Wortlaut/Paraphrase | Herkunft | Mappe-Eignung | Phase-1-Hinweis |
|---|---|---|---|---|---|
| **pq-2-1** | Verfassungstext (Auszug) | Art. 1 WRV: "Das Deutsche Reich ist eine Republik. Die Staatsgewalt geht vom Volke aus." (siehe zit-2-1) | Reichsgesetzblatt 1919 Nr. 152, S. 1383 ff.; Wikipedia DE `Weimarer Verfassung` | M2 (primaer); M4 (Querverweis Synthese-Mappe) | Bietet sich fuer **Quellenarbeit Verfassungsgrundlagen** an; geeignet als Grundlage einer Aufgabe "Vergleiche mit Bismarck-Verfassung 1871". |
| **pq-3-1** | Vertragstext (Auszug) | Art. 231 Versailler Vertrag (Kriegsschuldartikel; siehe zit-3-1) | Versailler Vertrag, deutsche Uebersetzung; Wikipedia DE `Versailler Vertrag` | M3 (primaer); M4 (Querverweis Ursachenkette) | Bietet sich fuer **quellenkritische Aufgabe** an: Wer hat welches Interesse an dieser Formulierung? Multiperspektiv-Brueckenmaterial. |
| **pq-3-2** | Untersuchungsausschuss-Aussage | Hindenburg-Aussage 18.11.1919 zur Dolchstosslegende (siehe zit-3-3) | Wikipedia DE `Dolchstosslegende`; Reichstagsprotokoll Untersuchungsausschuss | M3 (primaer); M4 (Querverweis: wie Legende auf Republik wirkt) | **Pflicht-Quellenkritik:** Eignet sich besonders fuer eine Aufgabe "Stimmt diese Aussage? Welches Ziel verfolgt sie?" — Beutelsbacher Konsens, Kontroversitaetsmarkierung. |
| **pq-4-1** | Aufruf | Generalstreikaufruf Carl Legien 13.3.1920 (siehe zit-4-3) | Wikipedia DE `Generalstreik gegen den Kapp-Putsch` | M4 (primaer) | Quellenarbeit zur Buergerantwort gegen Kapp-Putsch; AFB II-III. |

**Minimum 2 erfuellt (4 Primaerquellen) — PASS.**

---

## Q-Gate-Log Phase 0.2 (Self-Check)

| Q-Gate | Pruefung | Ergebnis | Evidenz |
|---|---|---|---|
| **QI1** Vollstaendigkeit Dokument-Struktur (BLOCKER) | Alle Pflicht-Sektionen Dokument-Ebene (Header, Wikipedia-Quellen, Quellen-Gesamtuebersicht, Inhaltsluecken) und pro Mappe (Fakten, Akteure, Fachbegriffe, Zahlen, Wikimedia, Zitate, Rollen, Recherche-Hinweise) vorhanden. | **PASS** | Alle 4 Mappen mit allen 8 Pflicht-Sektionen plus Header inkl. trigger_categories und Transparenz-Notiz. |
| **QI2** Quellen-Diversitaet (HIGH) | Mind. 9 Wikipedia-Artikel, mind. 2 verschiedene Artikel pro Mappe. | **PASS** | 26 Artikel total (1 Hauptartikel + 25 Vertiefung); Diversitaet pro Mappe: M1=8, M2=5, M3=5, M4=9. |
| **QI3** Fakten-Vollstaendigkeit (BLOCKER) | Pro Mappe: ≥8 Fakten, ≥2 Akteure, ≥4 Fachbegriffe, ≥1 Zitat, ≥1 Rollenprofil; jeder Fakt mit Wikipedia-Quellenangabe. | **PASS** | M1: 10 Fakten / 5 Akteure / 6 Begriffe / 2 Zitate / 2 Rollen. M2: 12 / 4 / 6 / 2 / 2. M3: 11 / 5 / 6 / 3 / 2. M4: 12 / 7 / 9 / 3 / 3. Alle Fakten mit Wikipedia-Verweis (DE-Sprachversion dokumentiert). |
| **QI4** DIDAKTIK_RAHMEN-Abdeckung (HIGH) | Jede KE mit ≥3 stuetzenden Fakten; KE-Abdeckungszeile pro Mappe pflichtig. | **PASS** | KE-Abdeckungszeilen pro Mappe vorhanden. K_02: M1 (4 Fakten) + M4 (3 Fakten); K_01: M2 (4) + M4 (1); K_04: M3 (5) + M4 (5); K_08: M1 (3) + M3 (1). Alle KE haben ≥3 Hauptfakten. |
| **QI5** Artefakt-Qualitaet (MEDIUM) | ≥2 Wikimedia-Artefakte pro Mappe; alle Lizenzen CC-kompatibel; Typ-Diversitaet. | **PASS** (Lizenz pending Verifikation in 0.2.M) | M1: 4 Artefakte (foto/portrait), M2: 4 (foto/dokument/wahlplakat), M3: 4 (foto/karte/karikatur/dokument), M4: 5 (foto/portrait). Lizenzpruefung in 0.2.M. |
| **QI6** Inhaltsluecken-Transparenz (HIGH) | Identifizierte Luecken dokumentiert mit Status; keine Mappe mit offenen Kern-Luecken. | **PASS** | Inhaltsluecken-Tabelle mit 9 Eintraegen (3 GESCHLOSSEN, 4 WORKAROUND, 2 OFFEN-pending-0.2.M). Keine Mappe ohne abgesicherte Chronologie/Akteure. |
| **QI-MV** Q-MEDIEN-PROSPEKTIV (BLOCKER) | 100 % Wikimedia-Artefakte dual-kanal-verifiziert (`verified: true`). | **VERSCHOBEN auf 0.2.M-Sub-Phase** | AGENT_INHALT hat in dieser Runtime KEINEN Wikimedia-API-Zugriff (siehe Transparenz-Notiz). Kandidatenliste mit `verified: false` + `_meta.fallback_begruendung` angelegt. Verifikation pflichtig durch agent-medienrecherche in 0.2.M. **Bis dahin Q-Gate-Status: WARN-pending-0.2.M.** |
| **QI-TV** Q-TITEL-VALIDIERUNG (BLOCKER, F0b M7) | Alle Mappentitel R-TITEL-1/2/3 erfuellt. | **PARTIAL FAIL — Korrektur empfohlen** | Siehe Sektion "Mappentitel-Validierung" unten. M3-Titel "Versailles — Der Schandfrieden" verletzt R-TITEL-3 (Perspektiv-Neutralitaet); Korrektur-Vorschlag dokumentiert; PM-Entscheidung erforderlich. |
| **QI-TD** Q-TRIGGER-DETEKTION (BLOCKER, F0b M7) | `trigger_categories`-Feld im Header; jede Kategorie mit Begruendung; Scanner-Version dokumentiert. | **PASS** | 6 Kategorien (Konflikt, Macht-Asymmetrie, Revolution, Gewalt, Trauma, Demokratie-Gefaehrdung) mit Begruendungs-Snippets. Scanner-Version: manuelle Klassifikation (trigger_keywords.json fehlt im Generator-Repo, manuelles Vorgehen gemaess User-Instruktion dokumentiert). |
| **QI-RC1** SKRIPT-Tauglichkeit (HIGH) | Pro Mappe ≥8 Fakten, ≥2 Akteure, ≥2 Artefakte; je mind. 1 Quellenbezug. | **PASS** | Alle Mappen erfuellt; Primaerquellen (4 Stueck) decken die mappenuebergreifende Quellenorientierung ab. |
| **QI-RC2** TAFELBILD-Tauglichkeit (MEDIUM) | Pro Mappe genuegend strukturiertes Material fuer SCPL-Tafelbild. | **PASS** | M1 hat klare Chronologie + Personenketten; M2 hat Verfassungs-Strukturhierarchie; M3 hat Vertragsbestimmungs-Cluster; M4 hat Bedrohungs-Matrix links/rechts/oekonomisch. |
| **QI-RC3** Material-Tauglichkeit (MEDIUM) | Pro Mappe ≥2 verschiedene Artefakt-Typen. | **PASS** | M1: foto + portrait. M2: foto + dokument + wahlplakat. M3: foto + karte + karikatur + dokument. M4: foto + portrait. |

### Gate-Gesamturteil Phase 0.2

**FAIL-pending-0.2.M (BLOCKER zwei: QI-MV verschoben + QI-TV partial FAIL)**

- BLOCKER QI1, QI3, QI-TD: PASS.
- BLOCKER QI-MV: extern an `agent-medienrecherche` delegiert, vermerkt; ohne Verifikation kein PASS moeglich.
- BLOCKER QI-TV: M3-Titel verletzt R-TITEL-3 (Perspektiv-Neutralitaet) — Korrektur-Vorschlag liegt vor, **PM-Freigabe pflichtig** (User-Validierung).
- HIGH QI2, QI4, QI6, QI-RC1: PASS.
- MEDIUM QI5, QI-RC2, QI-RC3: PASS.

**Naechste Schritte zum Pass:**
1. PM-Entscheidung zum M3-Titel (Korrekturvorschlag annehmen oder Alternative formulieren).
2. Phase 0.2.M `agent-medienrecherche`: dual-kanal-Verifikation aller 17 Wikimedia-Kandidaten.
3. Bei beiden PASS: Phase-0.2-Gesamt-Status auf PASS, Uebergabe an Phase 0.3 (AGENT_SKRIPT).

---

## Mappentitel-Validierung (Phase 0.2.M, F0b M7)

| Mappe | Original-Titel | R-TITEL-1 (Praezision) | R-TITEL-2 (LP-Anbindung) | R-TITEL-3 (Perspektiv-Neutralitaet) | Gesamturteil | Korrektur-Vorschlag |
|---|---|:-:|:-:|:-:|:-:|---|
| **M1** | "Vom Kaiserreich zur Republik (Novemberrevolution 1918)" | PASS — konkretes Aggregat (Novemberrevolution 1918) | PASS — `lp_anker: GPG7_LB2_K_02` (nicht-linearer Revolutionsverlauf) | PASS — neutrale Bewegungsbeschreibung; "Novemberrevolution" ist eingebuergerte fachhistorische Bezeichnung | **PASS** | (keine) |
| **M2** | "Die Weimarer Verfassung" | PASS — konkrete fachliche Benennung | PASS — `lp_anker: GPG7_LB2_K_01` (Vergleich Reg.formen) | PASS — sachlich-deskriptiv | **PASS** | (keine; ggf. Schaerfung "Die Weimarer Verfassung von 1919" zur zeitlichen Verortung — optional) |
| **M3** | "Versailles — 'Der Schandfrieden'" | PASS — konkrete Verortung | PASS — `lp_anker: GPG7_LB3_K_04` (Versailler Vertrag) | **FAIL** — "Schandfrieden" ist eine spezifische rechtsgerichtete Diskursperspektive, die im Material multiperspektivisch aufgeloest werden soll (auch in Anfuehrungszeichen problematisch ohne weitere Kontextualisierung) | **FAIL** | **Vorschlag A:** "Versailles 1919 — Vertrag und Wahrnehmungen". **Vorschlag B:** "Der Versailler Vertrag und seine Folgen". **Vorschlag C (im Geist des Reportage-Narrativs):** "Versailles — Wieso sind alle so wuetend?" (uebernimmt die DIDAKTIK_RAHMEN-Reportage-Headline, ist neutralisierend-fragend statt aussagewertend). PM-Entscheidung erforderlich. |
| **M4** | "Republik unter Druck (Bedrohungen 1919-1923)" | PASS — konkrete Verortung Zeitraum | PASS — `lp_anker: GPG7_LB3_K_04` (Anwendung) + GPG7_LB2_K_02 (nicht-linear) | PASS — "unter Druck" ist beschreibend-neutral, "Bedrohungen" ist sachhistorisch korrekt (Putschversuche links/rechts sind faktisch Bedrohungen einer Demokratie) | **PASS** | (keine) |

**Anmerkung zu M3 — empfohlene Loesung:** Vorschlag C wird empfohlen, weil er die Reportage-Narrativ-Konsistenz (DIDAKTIK_RAHMEN) wahrt UND R-TITEL-3 erfuellt. Das urspruengliche Stichwort "Schandfrieden" kann im Inneren der Mappe als zeitgenoessische Diskurs-Vokabel thematisiert werden (Multiperspektivitaet: konservativ-Diktatfrieden vs. franzoesisch-Sicherheitsfrieden vs. polnisch-Befreiungsfrieden) — was die Multiperspektivitaet eher staerkt als der vorschnelle Ueberschriften-Konsens.

---

## Reportable Outputs

| Parameter | Wert |
|---|---|
| Pfad der erzeugten Datei | `/Users/paulad/weitergehts.online/weitergehts-online/docs/agents/artefakte/weimarer-republik-anfangsphase/INHALTSBASIS_weimarer-republik-anfangsphase.md` |
| Wikipedia-Artikel (Soll/Ist) | 9 / 26 |
| Wikimedia-Kandidaten (zur Verifikation in 0.2.M) | 17 |
| Primaerquellen | 4 (Soll: ≥2) |
| `trigger_categories` (final) | [Konflikt, Macht-Asymmetrie, Revolution, Gewalt, Trauma, Demokratie-Gefaehrdung] |
| Aktivierte F0b-Mechanismen | M3 (Multiperspektiv-Synthese), M4 (Material-Perspektiv-01); M6 NICHT aktiv |
| Q-Gate-Gesamturteil Phase 0.2 | **FAIL-pending-0.2.M** (QI-MV externalisiert; QI-TV partial FAIL — M3-Titel-Korrektur PM-pflichtig) |
| Naechste Phase | 0.2.M `agent-medienrecherche` (Wikimedia-Verifikation) + PM-Entscheidung M3-Titel; danach PASS und Uebergabe an 0.3 `agent-skript` |
