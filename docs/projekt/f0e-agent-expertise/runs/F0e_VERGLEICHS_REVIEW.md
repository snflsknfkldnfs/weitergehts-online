---
titel: F0e-AEF Vergleichs-Review — Quellentext mat-4-3 (4 generierte Texte)
stand: 2026-04-21
zweck: Rohtexte der 4 Subagent-Outputs lesbar nebeneinander fuer didaktisches Review durch Paul.
scope: Nicht committed. Paul entscheidet auf dieser Basis ueber PI-Item-Freigabe.
---

# F0e-AEF Vergleichs-Review — mat-4-3 "Trothas Vernichtungsbefehl"

Rohtexte der 4 Runs (HTML aufgeloest zu lesbarer Markdown-Form). Kein SELF-Scoring, keine Kommentierung des Inhalts — nur das, was der Subagent produziert hat, plus die `_meta`-Felder, die du zum Urteil brauchst.

Aufgabe: Du pruefst die 4 Texte auf reale Durchfuehrbarkeit in Jgst 7 Mittelschule.

---

## Kurz-Orientierung

| | I1 | I2-R1 | I2-R2 | I2-R3 |
|---|---|---|---|---|
| Agent-ID (kurz) | afa61d60 | a49b5e32 | a92663d3 | ae69e834 |
| Wortanzahl | 98 | 218 | 158 | **268** |
| Schema-Gate | PASS | PASS | PASS | **FAIL** (String statt Array bei `quellenkritische_impulse`) |

Alle 4 Runs haben denselben Input erhalten (identischer Dispatch-Prompt, identisches Bundle, identisches Tafelbild, identische Primaerquelle pq-4-1).

---

## RUN I1 — afa61d60d18c09a51

**Titel:** Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete

**Text (inhalt):**

> Generalleutnant Lothar von Trotha, Oberbefehlshaber der deutschen Truppen in der Kolonie Deutsch-Suedwestafrika, erliess im Oktober 1904 einen Befehl gegen die Herero. Die Herero hatten sich gegen Landraub und Unterdrueckung aufgelehnt.

> > "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen."

> *Lothar von Trotha, sogenannter Vernichtungsbefehl, Oktober 1904. Der Befehl richtete sich gegen die kolonisierte Bevoelkerung der Herero. Wissenschaftler sehen darin den ersten Voelkermord des 20. Jahrhunderts.*

> **Denk nach:** Was genau ordnet Trotha an? Welche Absicht steht hinter dem Wort "Schutzgebiet", wenn so ein Befehl darin moeglich war? Wie wuerden die Herero selbst diesen Befehl beschreiben?

**Quellenangabe (Feld `quelle`):** Lothar von Trotha, sogenannter Vernichtungsbefehl, Oktober 1904. Zitiert nach: Wikipedia DE, Artikel "Voelkermord an den Herero und Nama", Einleitung. Gekuerzt. Auslassungen mit [...] gekennzeichnet.

**Quellenkritische Impulse (`_meta.quellenkritische_impulse`):**
1. Was befiehlt Trotha konkret, und gegen wen richtet sich der Befehl?
2. Wie wuerden die Herero selbst diesen Befehl beschreiben — passt dazu das Wort 'Schutzgebiet'?

**Perspektive:** P1 Deutsche Reichsfuehrung (Trotha als Oberbefehlshaber) — parteiliche Taeter-Quelle; Gegen-Perspektive P3 Kolonisierte (Herero) im Impuls verankert.

**Trigger-Flags:** gewalt, tod, krieg, diskriminierung

**Erarbeitbarkeits-Check:** SuS koennen aus dem Wortlaut direkt ableiten, dass "Schutzgebiet" ein Euphemismus war und die Kolonialmacht vorsaetzliche Toetung anordnete (k4-3). Voraussetzungswissen aus mat-4-2 (Kolonialrivalitaet) und Mappe 3 (Berliner Konferenz) ist gegeben.

---

## RUN I2-R1 — a49b5e3286b8fc83b

**Titel:** Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete

**Text (inhalt):**

> *Im Januar 1904 erhoben sich die Herero gegen die deutsche Kolonialmacht. Sie wehrten sich gegen Landraub und Unterdrueckung. General Lothar von Trotha schlug den Aufstand militaerisch nieder. Im Oktober 1904 erliess er den folgenden Befehl.*

> > "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen."
> > (Generalleutnant Lothar von Trotha, sogenannter "Vernichtungsbefehl", Oktober 1904)

> *Trotha befahl also die Ermordung aller Herero im deutschen Kolonialgebiet. Der Befehl richtete sich auch gegen Frauen und Kinder. Trotha begruendete sein Vorgehen mit den Worten: "Ich glaube, dass die Nation als solche vernichtet werden muss." Tausende Herero flohen in die wasserlose Omaheke-Wueste. Deutsche Soldaten riegelten die Wasserstellen ab. Viele Menschen verdursteten dort mit ihren Rinderherden. Von rund 80.000 Herero ueberlebten nur 15.000 bis 20.000. Auch etwa die Haelfte der Nama starb. Die Wissenschaft bezeichnet dieses Vorgehen als ersten Voelkermord des 20. Jahrhunderts. Der Begriff "Schutzgebiet" verbarg also die Wirklichkeit: Unterwerfung, Ausbeutung und systematische Vernichtung. Deutschland erkannte den Voelkermord erst im Mai 2021 offiziell an.*

**Quellenangabe (Feld `quelle`):** Trotha, Lothar von: Vernichtungsbefehl, Oktober 1904. Zitiert nach: Wikipedia (DE), Artikel "Voelkermord an den Herero und Nama", Einleitung (Artefakt pq-4-1).

**Quellenkritische Impulse:**
1. Wer spricht hier und in welcher Funktion? (Trotha als Oberbefehlshaber)
2. Gegen wen richtet sich der Befehl ausdruecklich? (alle Herero, auch Frauen und Kinder)
3. Was verraet die Sprache des Befehls ueber die Absicht der Kolonialmacht?
4. Warum ist der offizielle Begriff "Schutzgebiet" angesichts dieses Befehls ein zynischer Euphemismus?

**Perspektive:** multiperspektivisch — P1 Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung) kontrastiert mit P3 Kolonisierte Herero und Nama als Opfer und Traeger des Widerstands.

**Trigger-Flags:** Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung

**Erarbeitbarkeits-Check:** DIRECT — Quelle + Kontext erlauben direkte Erarbeitung von k4-3 (koloniale Ausbeutung und Gewalt); Ueberleitung von mat-4-2 (europaeische Rivalitaet) zu mat-4-4 (Bildquelle gefangene Herero) ist gesichert.

---

## RUN I2-R2 — a92663d39cfdc4614

**Titel:** Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete

**Text (inhalt):**

> *Nach der Niederlage der Herero im August 1904 verfolgte die deutsche Kolonialarmee die Ueberlebenden in die Omaheke-Wueste. Dort unterschrieb General Lothar von Trotha im Oktober 1904 einen Befehl. Historiker nennen ihn heute den "Vernichtungsbefehl".*

> > "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen."

> *Trotha ergaenzte: "Ich glaube, dass die Nation als solche vernichtet werden muss." Der Begriff "Schutzgebiet" bezeichnete offiziell die Kolonie. In Wahrheit stand er fuer Landraub, Unterwerfung und Gewalt. Die Wissenschaft bewertet dieses Vorgehen heute als den ersten Voelkermord des 20. Jahrhunderts. Von rund 80.000 Herero ueberlebten nur 15.000 bis 20.000. Quelle: Trotha, Lothar von: Proklamation vom 2. Oktober 1904, zitiert nach Wikipedia DE, "Voelkermord an den Herero und Nama" (Einleitung).*

**Quellenangabe (Feld `quelle`):** Trotha, Lothar von: Proklamation an das Volk der Herero, 2. Oktober 1904. Zitiert nach: Wikipedia DE, "Voelkermord an den Herero und Nama", Einleitung (Artefakt-Ref pq-4-1).

**Quellenkritische Impulse:**
1. Wer spricht in dieser Quelle? Wen schliesst der Text ein, wen schliesst er aus?
2. Warum nennt die deutsche Kolonialverwaltung die Kolonie 'Schutzgebiet'? Was verschleiert dieser Begriff?
3. Welche Absicht zeigt Trothas Satz 'Ich glaube, dass die Nation als solche vernichtet werden muss.'?
4. Wie unterscheidet sich die Perspektive des Befehls von der Perspektive der Herero und Nama?

**Perspektive:** multiperspektivisch — P1 Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung) kontrastiert mit P3 Kolonisierte Herero und Nama als Opfer und Traeger des Widerstands.

**Trigger-Flags:** Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung, Ueberwaeltigungsverbot_sensibel

**Erarbeitbarkeits-Check:** DIRECT — Der Quellentext fuehrt direkt zu k4-3. SuS erarbeiten am Wortlaut des Befehls die Absicht der Kolonialmacht und die Dimension der Gewalt. Voraussetzung k4-1/k4-2/k4-4 ist aus mat-4-2 eingefuehrt.

---

## RUN I2-R3 — ae69e834614b71e43  (Schema-FAIL)

**Titel:** Vernichtungsbefehl — was „Schutzgebiet" wirklich bedeutete

**Text (inhalt):**

> *Im Januar 1904 erhoben sich die Herero gegen die deutsche Kolonialherrschaft. Sie wehrten sich gegen Landraub und Unterdrueckung. Das Deutsche Reich schickte etwa 15.000 Soldaten. General Lothar von Trotha uebernahm den Oberbefehl. Im Oktober 1904 gab er den folgenden Befehl heraus. Er ist heute als "Vernichtungsbefehl" bekannt. Das Wort "Schutzgebiet" war die offizielle deutsche Bezeichnung fuer die Kolonie. Der Befehl zeigt, was dieser Begriff wirklich bedeutete.*

> > "Die Herero sind nicht mehr Deutsche Untertanen. [...] Innerhalb der Deutschen Grenze wird jeder Herero mit oder ohne Gewehr, mit oder ohne Vieh erschossen, ich nehme keine Weiber und keine Kinder mehr auf, treibe sie zu ihrem Volke zurueck oder lasse auch auf sie schiessen."

> *Trotha erklaerte an anderer Stelle: "Ich glaube, dass die Nation als solche vernichtet werden muss." Der Befehl richtete sich gegen alle Herero — Maenner, Frauen und Kinder. Er war keine Kriegshandlung mehr. Er zielte auf die vollstaendige Vernichtung einer ganzen Bevoelkerung. Die deutschen Soldaten riegelten die Wasserstellen im Omaheke-Sandfeld ab. Tausende Herero verdursteten dort. Von etwa 80.000 Herero ueberlebten nur 15.000 bis 20.000. Auch etwa die Haelfte der Nama starb. Wissenschaftler bezeichnen dieses Vorgehen heute als den ersten Voelkermord des 20. Jahrhunderts. Im Mai 2021 erkannte Deutschland diesen Voelkermord offiziell an.¹*

> *Denkanstoss: Vergleiche den offiziellen Begriff "Schutzgebiet" mit dem, was Trotha in seinem Befehl anordnet. Wer wurde hier wovor "geschuetzt"? Welche Absicht zeigt Trothas Wortwahl ("vernichtet", "keine Weiber und keine Kinder mehr")?*

> ¹ Zitiert nach: Wikipedia (Hrsg.): Voelkermord an den Herero und Nama. Zugriff 2026. Originalbefehl Lothar von Trotha, Osombo-Windhimbe, 2. Oktober 1904.

**Quellenangabe (Feld `quelle`):** Lothar von Trotha: Proklamation ("Vernichtungsbefehl"), Osombo-Windhimbe, 2. Oktober 1904. Zitiert nach: Wikipedia (Hrsg.): Voelkermord an den Herero und Nama, Einleitung (Zugriff 2026).

**Quellenkritische Impulse (`_meta.quellenkritische_impulse` — hier als String, deshalb Schema-FAIL):**

> "Wer spricht hier (Absender/Adressat)? Welche Absicht steht hinter dem Wort 'vernichtet'? Warum steht 'Schutzgebiet' im Widerspruch zum Inhalt des Befehls? Welche Perspektive fehlt in dieser Quelle (Sicht der Herero)?"

**Perspektive:** multiperspektivisch — P1 Deutsche Reichsfuehrung (Trotha, Kolonialverwaltung) kontrastiert mit P3 Kolonisierte Herero und Nama als Opfer und Widerstand.

**Trigger-Flags:** Kolonisierung, Gewalt, Macht-Asymmetrie, Unterdrueckung, Ueberwaeltigungsverbot-sensibel, Primaerquellen-Ausnahme-aktiv

**Erarbeitbarkeits-Check:** DIRECT — Material fuehrt k4-3 (Koloniale Ausbeutung und Gewalt) direkt am Primaer-Befehl ein; Voraussetzung k3-6 und k4-1/k4-2/k4-4 sind bereits eingefuehrt; Brueckensatz aus ueberleitung_von_kontext ist in Einleitung integriert.

---

## Paul-Feedback (Sign-Off-Stand, 2026-04-21)

Sinngemaess qualifiziert und actionable formuliert. Basis: Chat-Feedback Paul.

### I1 (afa61d60)

- **Zielgruppen-Passung verletzt:** "Generalleutnant" (4-Morphem-Kompositum, militaerischer Rang), "Herero" (Ethnonym ohne Vorwissen-Anker) und "Landraub" (Nominalisierung) sind fuer DaZ-SuS zu komplex oder erklaerungsbeduerftig. Keine Inline-Erklaerung, keine niedrigschwellige Ersetzung.
- **Kursiv-Nachweis-Absatz redundant:** Dupliziert Bibliografie, die im `quelle`-Feld bereits vollstaendig ist. `inhalt` verletzt SSOT fuer Quellenangabe.
- **"Denk nach"-Block an falscher Pipeline-Position:** Direkte Schueler-Ansprache mit Fragesaetzen gehoert systemisch in die Aufgaben-Generator-Stufe (oder Arbeitsblatt), nicht in `inhalt`. Redundant zu `_meta.quellenkritische_impulse`.
- **Konsequenz:** Nicht direkt einsetzbar. Erfordert (a) Fachwort-Ersetzung/Inline-Glossierung, (b) Streichung der letzten beiden `<p>`-Bloecke.

### I2-R1 (a49b5e32)

- **Wortanzahl ueber Budget:** 218 W zu lang fuer durchschnittliches Niveau in Jgst 7 MS.
- **Inhaltsauswahl didaktisch stark:** Omaheke, Opferzahlen, Mai-2021-Anerkennung treffen die Drastik der Gewaltdimension angemessen. **Eine Kuerzung darf Content-Tiefe NICHT reduzieren** — nur Textdichte/Redundanz verringern.
- **Impuls-Position falsch:** `_meta.quellenkritische_impulse` inhaltlich tauglich, gehoert aber systemisch in die Aufgaben-Generator-Stufe, nicht in die Material-Output-Phase.
- **Konsequenz:** Nicht direkt einsetzbar; mit redaktioneller Verdichtung einsetzbar.

### I2-R2 (a92663d3)

- **Dramaturgie-Bruch im Nachweis:** Nachweis-Absatz springt ohne kohaerente Logik: Trotha-Zweitzitat → Schutzgebiet-Kritik → Wissenschafts-Einordnung → Zahlen → Inline-Quellenverweis. Keine 3-Schritt-Stringenz (Einordnung → Konsequenz → Bewertung).
- **Wortanzahl ueber Budget:** 158 W trotz Kompaktheit zu lang fuer durchschnittliches Niveau.
- **Positiv (reproduzierbar wertvoll):** Meta-sprachliche Rahmung "Historiker nennen ihn heute den 'Vernichtungsbefehl'" markiert den Begriff korrekt als historiografisches Urteil, nicht als Taeter-Eigenbezeichnung. Dieses Muster sollte systematisch generierbar sein.
- **Konsequenz:** Nicht direkt einsetzbar; erfordert Stringenz-Umbau + Kuerzung.

### I2-R3 (ae69e834) — Schema-FAIL

- **Strukturelle Ueberladung:** 268 W weit ueber didaktischem Budget; zwei Nachweis-Absaetze plus Fussnotenapparat plus separater Denkanstoss-Block — drei Layer, die einzeln Phasen-Regeln verletzen.
- **Schema-FAIL (D6)** blockiert Einsatz technisch zusaetzlich zur didaktischen Ueberlaenge.
- **Konsequenz:** Nicht einsetzbar.

---

## Favorit und geplante Aenderung

**Favorit:** offen — keine direkt einsetzbare Variante. Inhaltlich am staerksten: **I2-R1** (Drastik + Content-Tiefe). Didaktisch kontrolliertster Einstieg: **I2-R2** (Intro-Meta-Rahmung).

**Konkrete Aenderung am Favorit-Kandidaten I2-R1:** (a) Kuerzen auf max. 150 W unter Erhalt Omaheke/Zahlen/Mai-2021, (b) Inline-Bibliografie im Blockquote entfernen, (c) Fachwoerter fuer DaZ-Passung auf R7-Alltag pruefen.

---

## Urteils-Raster (befuellt aus Paul-Feedback)

| Run   | Direkt einsetzbar? | Mit Kosmetik einsetzbar? | Nicht einsetzbar? | Kurz-Begruendung |
| ----- | ------------------ | ------------------------ | ----------------- | ---------------- |
| I1    | [ ]                | [x]                      | [ ]               | Fachwort-/DaZ-Problem, letzte zwei `<p>`-Bloecke streichen |
| I2-R1 | [ ]                | [x]                      | [ ]               | Zu lang, inhaltlich stark — Content-Tiefe beim Kuerzen halten |
| I2-R2 | [ ]                | [x]                      | [ ]               | Keine Stringenz + zu lang; Intro-Meta-Rahmung reproduzierbar wertvoll |
| I2-R3 | [ ]                | [ ]                      | [x]               | Schema-FAIL + strukturell ueberladen |

---

## Strukturursachen (von Paul-Feedback abgeleitet)

Fuenf Leerstellen im Generator-Prozess, als Input fuer PI-Item-Audit:

1. **Kein Lerngruppen-Profil im Dispatch** (DaZ-Anteil, Niveau-Stufe) → Fachwort-/Eigennamen-Dichte nicht geeicht.
2. **Keine Phasen-Trennung Material vs. Aufgaben** → Impulse/Denk-nach-Bloecke landen faelschlich im `inhalt`.
3. **Kein SSOT-Kontrakt fuer Quellenangabe** → Bibliografie im `inhalt` zu `quelle`-Feld dupliziert.
4. **Keine Wortanzahl-Obergrenze (hart)** → unkontrollierte Content-Expansion.
5. **Keine Dramaturgie-Vorgabe fuer Nachweis-Absatz** → Baustein-Akkumulation statt 3-Schritt.

Zusaetzlich ein **positives Muster** identifiziert: Meta-sprachliche Begriffs-Rahmung ("Historiker nennen..."), bisher nicht systematisch generiert — als PI-Kandidat festzuhalten.

---

**Sign-Off:** Paul, 2026-04-21. Feedback freigegeben als Audit-Input fuer PI-Item-Validierung.
