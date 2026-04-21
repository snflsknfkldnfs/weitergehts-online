# Didaktik-Review Iteration-1 Run-1 (mat-4-3)

**Status:** SELF-REVIEW (Claude), pending Paul-Sign-Off / Revision.
**Protokoll-Ref:** `F0e_AGENT_EXPERTISE_SPIKE.md` §10 (5 Dimensionen, Skala 1-5, Schwelle M-E5 ≥ 4).
**Review-Objekt:** `runs/iteration-1/merged.json` (post Dispatcher-Merge).
**Reviewed against:** Baseline-`mat-4-3.json` (F0d-Produktion), `DIDAKTIK_RAHMEN_deutscher-nationalismus-kolonialismus.md`, VERTRAG_SPRACHNIVEAU_R7.

---

## Dimension 1 — Einsetzbarkeit 1:1 in Mappe 4

**Score: 4/5**

Material ist in Grundzuegen ohne weitere inhaltliche Redaktion einsetzbar. Die Dreischritt-Struktur (Einleitung / Zitat / Nachweis + Impulsblock) ist didaktisch sauber. Drei kosmetische Aenderungen vorgeschlagen:

1. `<p><strong>Denk nach:</strong> ...</p>` am Ende — didaktisch sinnvoll, aber Impuls-Text ueberschneidet sich teilweise mit dem `_meta.quellenkritische_impulse`-Array. Entweder im `inhalt` weglassen (Impulse nur ueber `_meta` rendern) oder im `_meta`-Array kuerzen. Redundanz-Frage, keine Korrektheit.
2. "Die Herero hatten sich gegen Landraub und Unterdrueckung aufgelehnt." — "Landraub" und "Unterdrueckung" als Nominalisierung, konkrete Szene fehlt. R7 vertraegt das noch, aber "Die Herero hatten sich gewehrt — gegen Landraub und Unterdrueckung." waere rhythmischer. Kein Blocker.
3. Nachweis-Satz "Wissenschaftler sehen darin den ersten Voelkermord des 20. Jahrhunderts." — Gueltig, aber interpretativ. Einleitung + Nachweis sollten laut Q5 nicht vorgreifen. Grenzfall: Hier steht der Satz im Nachweis-Block, wo Einordnung erlaubt ist. Als Kosmetik moeglicherweise in einen separaten "Historische Einordnung"-Absatz verschieben.

---

## Dimension 2 — Sprachniveau R7

**Score: 4/5**

- Durchschnittliche Satzlaenge (ohne Primaerquellen-Zitat): geschaetzt 12 W/Satz. Unter 15. OK.
- Max-Satzlaenge: "Generalleutnant Lothar von Trotha, Oberbefehlshaber der deutschen Truppen in der Kolonie Deutsch-Suedwestafrika, erliess im Oktober 1904 einen Befehl gegen die Herero." ≈ 21 Woerter. Unter 25. OK.
- Fachwort-Dichte: `Generalleutnant`, `Oberbefehlshaber`, `Kolonie`, `Deutsch-Suedwestafrika`, `Vernichtungsbefehl`, `Voelkermord`, `Kolonialmacht`, `Kolonisierte`, `Landraub`, `Unterdrueckung`, `Euphemismus` (im Impuls: "Schutzgebiet") — grenzwertig hoch. Bei ~120 SuS-Woertern gesamt landen wir bei ~9-10 % Fachwortquote. Unter 12 % Schwelle. OK.
- Komposita: `Oberbefehlshaber` (3), `Vernichtungsbefehl` (2), `Kolonialmacht` (2). Kein >= 4-Morphem-Kompositum ohne Aufloesung. OK.
- Konjunktiv: im Impulsblock 2 Mal ("wuerden", "wuerden"). ~5 % Impulsblock-Anteil, gesamt unter 5 % Schwelle. OK.
- Nominalstil: "Landraub und Unterdrueckung" einzige grenzwertige Nominalphrase. Sonst verbbasiert. OK.

Abzug 1 Punkt: Einleitungssatz 1 ist mit 21 Woertern dicht am Maximum, haette man auf 2 Saetze splitten koennen ("Generalleutnant Lothar von Trotha war Oberbefehlshaber der deutschen Truppen in Deutsch-Suedwestafrika. Im Oktober 1904 erliess er einen Befehl gegen die Herero.").

---

## Dimension 3 — Multiperspektivitaet (MATERIAL-PERSPEKTIV-01)

**Score: 4/5**

- P1 Deutsche Reichsfuehrung: in Einleitung + Zitat als Urheber explizit markiert. OK.
- P3 Kolonisierte Herero/Nama: in Einleitung benannt ("Die Herero hatten sich gegen Landraub und Unterdrueckung aufgelehnt"), und im Impuls 2 ("Wie wuerden die Herero selbst diesen Befehl beschreiben?") als Gegen-Perspektive adressiert.
- `_meta.perspektive` ist String-konform und benennt beide Poles: "P1 Deutsche Reichsfuehrung (Trotha als Oberbefehlshaber) — parteiliche Taeter-Quelle; Gegen-Perspektive P3 Kolonisierte (Herero) im Impuls verankert".

Abzug 1 Punkt: Die P3-Perspektive ist auf Impuls-Frage ausgelagert. Eine kurze eigene Formulierung im Einleitungsblock ("Fuer die Herero war 'Schutzgebiet' kein Schutz, sondern Landraub.") wuerde die Parteilichkeit der Quelle direkter kontrastieren. M4-konform, aber nicht optimal.

---

## Dimension 4 — Trigger-Behandlung (TERMINOLOGIE-01)

**Score: 5/5**

- `trigger_flags: ["gewalt", "tod", "krieg", "diskriminierung"]` — inhaltlich korrekt und vollstaendig. `sexualisierte_gewalt` nicht gesetzt (korrekt, da nicht thematisiert). `trauma` nicht gesetzt (vertretbar — Flag waere bei Opfer-Perspektive naheliegender).
- Kolonialterminologie: `"Schutzgebiet"` wird nur innerhalb Anfuehrungszeichen und im Kontext kritischer Hinterfragung verwendet ("Welche Absicht steht hinter dem Wort 'Schutzgebiet'?"). OK.
- `Landraub` / `Unterdrueckung` — R7-konforme Alternativen aus F0B-§3-Whitelist. OK.
- `kolonisierte Bevoelkerung` statt `Eingeborene` — OK.
- Ueberwaeltigungsverbot: sachlich, keine Schockrhetorik, Fakten-Tonalitaet. OK.
- Voelkermord-Begriff ist einmal im Nachweis genannt — korrekte Einordnung, nicht sensationalistisch.

---

## Dimension 5 — Quellen-Integritaet

**Score: 5/5**

`quelle`-Feld: "Lothar von Trotha, sogenannter Vernichtungsbefehl, Oktober 1904. Zitiert nach: Wikipedia DE, Artikel 'Voelkermord an den Herero und Nama', Einleitung. Gekuerzt. Auslassungen mit [...] gekennzeichnet."

Komponenten vollstaendig:
- Autor: Trotha — ja
- Titel/Anlass: "sogenannter Vernichtungsbefehl" — ja, mit kritischer Distanz
- Datum: Oktober 1904 — ja
- Fundort: Wikipedia DE Artikel + Sektion — ja
- Fiktionalitaets-/Aufbereitungs-Kennzeichnung: "Gekuerzt. Auslassungen mit [...]" — ja

Passt zu `_meta.aufbereitung: "gemischt"` (Ausschnitt plus R7-Einleitung + Nachweis-Kontextualisierung). Die `rekonstruktions_begruendung` (>30 Zeichen) dokumentiert korrekt, dass der Wortlaut aus pq-4-1 kommt und nur gekuerzt wurde.

---

## Gesamt-Score

| Dim | Score |
|---|---|
| 1 Einsetzbarkeit | 4 |
| 2 Sprachniveau R7 | 4 |
| 3 Multiperspektivitaet | 4 |
| 4 Trigger-Behandlung | 5 |
| 5 Quellen-Integritaet | 5 |

**Mittel:** (4+4+4+5+5) / 5 = 4.4 → gerundet **4**.

**M-E5-Schwelle:** ≥ 4. **PASS.**

---

## Kommentar zum Spike-Ziel

Die Iteration zeigt, dass Schema-Compliance (Partial + Full PASS) UND Didaktik-Qualitaet (4/5) **gleichzeitig** erreichbar sind, ohne die authoritative Agent-Datei zu aendern. Der Shadow-Overlay funktioniert strukturell, ohne die inhaltliche Substanz zu beschneiden.

Baseline-Vergleich zu F0d-A/B-Runs: Dort produzierten 6/6 Runs schemawidrige Felder (insbesondere `perspektiv_tags` aus F0B-Priming §2). Hier greift der explizite D1-Hinweis im Priming-§2 ("Overlay gewinnt") sauber.

**Offene Restfragen fuer Befund / Iteration-2:**

1. Varianz: Reproduziert sich das Ergebnis ueber n=3 Runs? → P4 falls Budget.
2. `<strong>Denk nach:</strong>`-Block im `inhalt` vs. `_meta.quellenkritische_impulse`-Array: doppelte Erfassung. Design-Frage, nicht FAIL.
3. `_meta.erarbeitbarkeits_check` als freier Prosa-Text — sinnvoll zu versteifen (PASS|FAIL-Enum + Begruendung-Slot) in PI-SCHEMA-STRICT-01?

## Paul-Sign-Off

- [ ] Scores bestaetigt / revidiert:
- [ ] PASS vs. FAIL:
- [ ] Kommentare:
