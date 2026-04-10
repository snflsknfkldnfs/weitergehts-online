# BEFUND: Live-Sichtung Game 2 Mappe 1 — 2026-04-10

**Game:** `verlauf-erster-weltkrieg-marne-ende` (Game 2)
**Mappe:** Mappe 1 — "Leben und Sterben im Schützengraben"
**Sichter:** User (Paul, Fachlehrer, Zielgruppe R7)
**Sichtungs-Modus:** Live-Durchgang auf weitergehts.online
**Sichtungs-Datum:** 2026-04-10
**Befund-Autor:** Cowork-Session, v3.11-Infrastruktur
**Zweck:** Qualifizierte Aufnahme der Findings fuer spaetere Infrastruktur-Upgrade-Runde. **Dieser Befund liefert Diagnose, nicht Korrektur.** Content-Fixes am Marne-Game und struktureller Upgrade-Plan sind separate, nachgelagerte Entscheidungen.

---

## 0. Kontext

Die Live-Sichtung erfolgte nach dem Deploy des Marne-Games (Commits `1a13fce` + `3fda51d`, vor Einfuehrung von v3.11). Das Game ist produktiv unter weitergehts.online erreichbar. Die folgenden Findings beschreiben **didaktische, formale und technische Defekte im ausgelieferten Artefakt**, gruppiert nach strukturellem Interventionsort. Ziel dieses Befundes: Infrastruktur-Upgrade-Runde `v3.12` (oder Nachfolger) mit belastbaren Diagnosen zu versorgen.

**Abgrenzung zu bestehenden Befunden:**
- `BEFUND_PHASE_2-2b_TESTRUN_M1.md`, `BEFUND_PHASE_2-1_MATERIAL_M1_TIEFENAUDIT.md` u. a. sind **Pre-Deploy-Testrun-Befunde** — sie beschreiben das Game im Generator-Zustand. Dieser Befund dagegen ist ein **Post-Deploy-Live-Sichtungs-Befund** — er bewertet das tatsaechlich produktive Artefakt aus der Nutzerperspektive und eroeffnet damit eine neue Klasse von Findings (u. a. Q-Gate-Enforcement-Gaps, die im Pre-Deploy-Testrun nicht gefangen wurden).

---

## 1. Evidenz-Snapshot (programmatisch verifiziert)

Vor Aufnahme der Findings wurden einzelne Aussagen gegen `escape-games/verlauf-erster-weltkrieg-marne-ende/data.json` geprueft:

| Pruefung | Ergebnis |
|---|---|
| `meta.titel` | "Der Erste Weltkrieg — Verlauf von der Marne bis zum Ende" |
| `mappen[0].titel` | "Leben und Sterben im Schützengraben" |
| `mappen[0].einstieg.problemstellung` | "Wer überlebt im Schützengraben?" |
| Materialien-Typen-Mix M1..M5 | `bildquelle, tagebuch, darstellungstext, quellentext, tagebuch` (1 Bild, 4 Text) |
| ASCII-Ersatzmuster in data.json (ueberleb/Schuetz/Generae/traeg/koerper/Ueberleb) | **20 Treffer, ausschliesslich in Aufgaben/Tipps/Feedback — nicht in Materialien/Rahmen** |
| Korrekte UTF-8-Umlaute in data.json (Schützen/überlebt/Generäle/Füße) | 44 Treffer, alle in Materialien/Rahmen |
| M2 Tagebuch "Karl" — Erzaehlerstimmen-Einschub | Bestaetigt: Paragraph "Was Karl nicht wissen konnte: ... Stellungskrieg" in `inhalt`, `wortanzahl_erzaehlerstimme: 37` |
| M5 Tagebuch "Friedrich" — Erzaehlerstimmen-Einschub | Bestaetigt: Paragraph "Fachleute nennen diese Art des Krieges Materialschlacht ..." in `inhalt`, `wortanzahl_erzaehlerstimme: 18` |
| M2/M5 `_meta.perspektivitaet` | "Systemisches Wissen ... steht in Erzählerstimme-Rahmen (v3.6)" — d. h. **der Erzaehler-Einschub ist v3.6-Policy-konform**, User markiert ihn trotzdem als didaktisches Fehl-Design |
| M4 Titel | "Wofür starben Hunderttausende bei Verdun und der Somme?" |
| M4 Inhalt | Zwei Stimmen (Falkenhayn + britischer Soldat), gemischt mit Erzaehler-Kontext, keine visuelle Sprecher-Trennung im HTML |
| Phase 2.2b Q-GATE-LOG `mappe-1/Q-GATE-LOG.md` Zeile 261-267 | **Alle 7 Aufgaben PASS in der Dispatch-Uebersicht**, incl. A6 "Typografie" — obwohl ASCII-Ersatz faktisch vorhanden |

**Erstes Meta-Finding (vor den Einzel-Findings):** Das Pre-Deploy-Q-Gate-Log markiert Zustaende als PASS, die nach Live-Sichtung offensichtliche FAIL-Kandidaten waren. Das betrifft mindestens Finding F-LS-M1-07/08 (Typografie) und **implizit alle didaktisch-qualitativen Findings**, die kein deterministisches Q-Gate haben. Siehe Querschnitts-Achse D.

---

## 2. Finding-Uebersicht

| ID | Titel | Severity | Klasse | Interventions-Ebene(n) |
|---|---|---|---|---|
| F-LS-M1-01 | Stundenfrage nicht durch Merksatz beantwortbar + nicht aus Material erarbeitbar | HIGH | Didaktik | VERTRAG_PHASE_2-0_RAHMEN, AGENT_HEFTEINTRAG, Q-GATE §7.3 |
| F-LS-M1-02 | Medien-Monokultur: 4/5 Textmaterialien, keine Karte, kein Zeitstrahl | HIGH | Didaktik + Struktur | VERTRAG_PHASE_2-1_MATERIAL, AGENT_DIDAKTIK, AGENT_MATERIAL, Q-GATE (neu) |
| F-LS-M1-03 | Tagebuch-Titel haben Frage-Form statt Tagebuch-Form | MEDIUM | Form | SUB_MATERIAL_TAGEBUCH, material-output-schema (Titel-Pattern), Q-GATE Form-Integrity |
| F-LS-M1-04 | M2 "Karl": Erzaehlerstimmen-Einschub ist didaktisch fehlplatziert (keine Gegen-Information zum Richten, Form-Bruch) | HIGH | Form + Didaktik | SUB_MATERIAL_TAGEBUCH v3.6-Erzaehler-Policy, AGENT_MATERIAL Trigger-Logik |
| F-LS-M1-05 | M4: Sprecher-Attribution nicht visuell erkennbar, Titel didaktisch unklar | HIGH | Form + Didaktik | SUB_MATERIAL_QUELLENTEXT (Mehrstimmen-Struktur), Engine-Rendering (Sprecher-Markup), material-output-schema (Sprecher-Feld), AGENT_DIDAKTIK (Titel-Zweck-Check) |
| F-LS-M1-06 | M5 "Friedrich": Erzaehler-Einschub mittendrin im Tagebuch, nicht als Info-Box unten | MEDIUM | Form | SUB_MATERIAL_TAGEBUCH, material-output-schema (info_box-Sektion), Engine-Rendering |
| F-LS-M1-07 | Aufgabe 6: ASCII-Ersatz-Umlaute + Korrektheits-Pruefung zu streng (Frustrations-Risiko) | HIGH | Technik + Policy | **(a) Q-GATE TYP-01-A Enforcement-Gap**, **(b) Generator-Policy "Permissive Correctness" fehlt**, SUB_AUFGABE_BEGRUENDUNG |
| F-LS-M1-08 | Aufgabe 7: ASCII-Ersatz-Umlaute + Meta-Frage zu schwammig (sollte Meta-Operator wie "Zusammenfassung" sein) | MEDIUM | Technik + Didaktik | wie F-07 + SUB_AUFGABE_FREITEXT_CODE, VERTRAG_PHASE_2-2b Abschluss-Aufgabe-Muster |

Klassen-Legende: **Didaktik** = inhaltliche Aussagekraft/Erarbeitbarkeit. **Form** = Format-Integritaet (Tagebuch bleibt Tagebuch). **Struktur** = Materialtyp-/Medien-Mix. **Technik** = Generator-/Engine-Fehlverhalten. **Policy** = bewusste Regelaenderung durch User.

---

## 3. Detail-Findings

### F-LS-M1-01 — Stundenfrage nicht gegroundet

**Beobachtung (User-Worte):** *"Stundenfrage nicht gut gewaehlt. Der Merksatz des Hefteintrags kann diese semantisch nicht beantworten. Ausserdem ist sie auch nicht anhand des Materials plausibel erarbeitbar. Bessere Frage waere tendenziell gewesen 'Wie war das Leben im Schuetzengraben?' oder aehnliches."*

**Ist-Zustand:**
- `problemstellung = "Wer ueberlebt im Schuetzengraben?"` (mit Umlautfehler, siehe F-07)
- Mappen-Titel: "Leben und Sterben im Schuetzengraben" — steht semantisch naeher an der User-Alternative als an der aktuellen Stundenfrage
- Material-Mix (Foto, Karl-Tagebuch, Giftgas-Text, Verdun/Somme, Friedrich-Tagebuch) liefert breite Erfahrungs-Beschreibung des Graben-Alltags, aber kaum Evidenz fuer eine eindeutige "Ueberlebens-Bedingung" — die Stundenfrage suggeriert eine kausal-optimierbare Antwort, die weder Merksatz noch Material decken

**Ursache-Hypothesen (abgestufte Wahrscheinlichkeit):**
1. **SCPL-Generierung optimiert auf Dramatik statt Beantwortbarkeit.** Phase-2.0-Rahmen zieht `problem.satz` auf emotional verdichtete Formulierungen, ohne Rueckkopplung zur spaeteren Sicherung (`loesung[]`). "Wer ueberlebt" ist rhetorisch zugespitzt, fuer R7 aber nicht aus dem Material beantwortbar.
2. **Q-Gate C1b (Stundenfrage-Identitaet) prueft nur Text-Identitaet** zwischen `einstieg.problemstellung`, `hefteintrag.stundenfrage` und `scpl.problem`, NICHT semantische Beantwortbarkeit durch `scpl.loesung[]` oder die verfuegbaren Materialien.
3. **Kein Gate "Material-deckt-Stundenfrage-Check"**. Q-Gate M3b prueft Kernerkenntnisse-Identitaet (loesung == Tafelbild-Knoten), aber nicht, ob Stundenfrage aus Materialien erarbeitbar ist.

**Kandidat-Interventionsorte (nicht entschieden):**
- `VERTRAG_PHASE_2-0_RAHMEN` §X: Neue Vertragspflicht "Stundenfrage-Grounding-Test". Zweistufig: (a) semantische Beantwortbarkeit durch `scpl.loesung[]` (b) Erarbeitbarkeit aus Material-Korpus.
- `AGENT_HEFTEINTRAG` / `AGENT_DIDAKTIK` bei SCPL-Erstellung: Kandidaten-Stundenfrage muss gegen Material-Korpus-Skizze plausibilisiert werden, nicht nur gegen didaktisches Ziel.
- `Q-GATE-MECHANIK.md` §7.3: Neuer Gate `SF-GROUND` mit deterministischer (oder zumindest subagent-gepruefter) Beantwortbarkeits-Heuristik. Loose-Form: "Enthalten die SCPL-`loesung[]`-Eintraege zusammen mindestens ein Antwort-Lemma auf das Frage-Lemma?" Strict-Form: LLM-Judge mit Entscheidungsvorlage.

**Nicht entschieden:**
- Darf die Stundenfrage retrospektiv im Live-Game geaendert werden (data.json-Patch), oder bleibt sie als Artefakt-Zustand bis zur Re-Generierung?
- Wird F-01 zu einer **Policy** (z.B. "Stundenfragen muessen operationalisierbar sein, rhetorische Zuspitzungen sind verboten") oder zu einem **Review-Gate** (Mensch oder LLM-Judge)?

---

### F-LS-M1-02 — Medien-Monokultur in Mappe 1

**Beobachtung:** *"Zu viele text-based Materialien. Zu wenige Bilder/Karten o.A. Esp. in der ersten Mappe sollte eine Karte der Lage eingebunden werden, eventuell ein Zeitstrahl verwendet werden. Warum wurden diese Materialien so ausgewaehlt? Wie koennten wir eine Integration von Medien besser sicherstellen?"*

**Ist-Zustand:**
- Materialien-Typen: `bildquelle, tagebuch, darstellungstext, quellentext, tagebuch` → 1x visuell (1 Foto), 4x Text
- Keine Karte, kein Zeitstrahl, keine Statistik, keine Skizze
- Position 1 (bildquelle) ist ein historisches Schuetzengraben-Foto — liefert atmosphaerischen Einstieg, aber keine Lage-Orientierung
- Mappen-Kontext ("Verlauf Marne bis Ende") schreit strukturell nach einer Karte (Frontlinien 1914 vs. 1918) und einem Zeitstrahl (Marne → Verdun → Somme → 1918), beides fehlt

**Ursache-Hypothesen:**
1. **Dispatch-Bias Richtung Text.** `AGENT_MATERIAL` und die Sub-Agenten `SUB_MATERIAL_TAGEBUCH/QUELLENTEXT/DARSTELLUNGSTEXT` sind in der Implementierungsreife weiter als `SUB_MATERIAL_KARTE/ZEITLEISTE/STATISTIK/BILDQUELLE` — Text-Materialien sind "billiger" zu produzieren, Karten/Zeitstrahlen erfordern strukturelle Datenmodelle und Asset-Anbindung.
2. **Keine Diversitaets-Pflicht im VERTRAG_PHASE_2-1_MATERIAL.** Vertraglich ist ein `3-5`-Materialien-Slot mit Typ-Freiheit vorgesehen, aber KEIN Minimum-Mix-Constraint ("mindestens ein nicht-textuelles Material pro Mappe" oder "mindestens eine Karte in Einstiegs-Mappe einer sequentiellen Sequenz").
3. **Phase-2.0-Rahmen (DIDAKTIK_RAHMEN) spezifiziert keine Medien-Diversitaet** als didaktische Anforderung. Der Rahmen denkt in Inhalt und SCPL, nicht in Repraesentationsformen.
4. **Kein Q-Gate "Medien-Diversitaet"** existiert. `A17 SCPL-Zonen-Abdeckung` und `A18 Material-Aktivierung` pruefen nur, ob Materialien zu SCPL-Zonen passen, nicht welche Repraesentationsform.
5. **Zielgruppen-Eignungs-Luecke.** Fuer R7 (mittlere Schulform, ca. 12-13 Jahre) ist Text-Dichte bei 5 Materialien ueberhoeht; ein Medien-Mix waere alters- und konzentrations-angemessener.

**Kandidat-Interventionsorte:**
- `VERTRAG_PHASE_2-1_MATERIAL`: Neue §X "Medien-Diversitaet-Constraint". Minimum-Matrix pro Mappe (z.B.: mindestens 1 nicht-textuell, bei geographischen Themen zwingend 1 Karte, bei Prozess-Themen zwingend 1 Zeitstrahl).
- `DIDAKTIK_RAHMEN` Template: Neue Sektion "Repraesentationsform-Planung" pro Mappe.
- `AGENT_MATERIAL`-Dispatch: Vorwort-Check "Ist die geplante Typ-Verteilung diversitaets-konform?" als Hard-Block vor Dispatch.
- **Sub-Agent-Reife-Programm**: `SUB_MATERIAL_KARTE` und `SUB_MATERIAL_ZEITLEISTE` brauchen Hebung auf gleiche Produktionsreife wie die Text-Sub-Agenten (mit Asset-Anbindung, Rendering-Test).
- `Q-GATE-MECHANIK` neuer Gate `MED-DIV` als Post-Check auf Materialien-Typ-Menge.

**Nicht entschieden:**
- Hart (Blocking) vs. weich (Warning mit Abweichung-Begruendung)?
- Definiert der User die Diversitaets-Matrix normativ, oder schlaegt der Generator pro Mappe einen Mix vor und der User bestaetigt?

---

### F-LS-M1-03 — Tagebuch-Titel haben Frage-Form

**Beobachtung:** *"Tagebucheintraege sollten keine Frage als Ueberschrift haben, sondern die Form eines Tagebucheintrags wahren. Ueberschrift eventuell sowas wie 'Tagebucheintrag von NAME, einem ROLLENBESCHREIBUNG'."*

**Ist-Zustand:**
- M2 Titel: "Was erlebte ein Soldat Tag fuer Tag im Schuetzengraben?" (Frage)
- M5 Titel: "Was machte der Krieg mit den Soldaten?" (Frage)
- In `_meta.figur` stehen Name, Alter, Rolle, Ort (z.B. "Karl Meissner, 22, Gefreiter, Infanterie, Schuetzengraben bei Arras, Westfront") — diese Daten waeren zur Ueberschrift-Konstruktion verfuegbar, werden aber nicht genutzt

**Ursache-Hypothesen:**
1. **Generischer Titel-Heuristik "Material = Antwort auf Frage"**. Das durchgaengige Muster fuer alle Material-Titel in beiden Games ist eine Frage-Form. Das passt zu Materialtypen wie `darstellungstext` (diskursive Antwort) oder `quellentext` (Quelle als Antwort-Evidenz), verletzt aber die Form-Integritaet von `tagebuch`.
2. **SUB_MATERIAL_TAGEBUCH fehlt ein Titel-Pattern-Constraint.** Kein Feld oder Regel "Titel muss als Tagebucheintrag formuliert sein".
3. **Schema `TagebuchMeta` (v3.10 T2.F offen)** haette Raum fuer ein `titel_pattern`-Feld mit Enum `{"eintrag_name_rolle", "ort_datum"}`.
4. **Keine Q-Gate-Regel "Titel-Form-Integritaet pro Materialtyp".** Existierende Titel-Pruefungen pruefen Laenge und Eindeutigkeit, nicht Form.

**Kandidat-Interventionsorte:**
- `SUB_MATERIAL_TAGEBUCH`: Titel-Template explizit einfuegen. Beispiele: `"Tagebucheintrag von {figur.name}, {figur.rolle}"` oder `"Aus dem Tagebuch des {figur.rolle} {figur.name}"`.
- `material-output-schema.json` → `TagebuchMeta` (v3.10 T2.F Ticket): `titel_pattern`-Enum.
- `Q-GATE-MECHANIK` neuer Form-Integrity-Gate `MAT-TITEL-FORM` mit typ-spezifischen Regexen/Checks.

**Nicht entschieden:**
- Gilt Form-Integritaet fuer alle Materialtypen, oder nur fuer narrative Typen (`tagebuch`, `brief`, `zeugnis`)?
- Wird der Titel Teil des visuellen Rendering-Headers, oder rein metadatisch?

---

### F-LS-M1-04 — M2 Erzaehlerstimmen-Einschub fehlplatziert

**Beobachtung:** *"Der Einschub in M2 ('Was Karl nicht wissen konnte: Die Grabenlinie erstreckte sich bereits ueber 700 Kilometer von der Nordsee bis zur Schweiz. Fachleute nennen diese Lage Stellungskrieg — keine Seite konnte vorruecken.') ist voellig fehl am Platz — es ist ein Tagebucheintrag, die Perspektivitaet ist dadurch schon klargestellt und ausserdem wurde im Text nichts inhaltlich gegenteiliges behauptet, was Klarstellung gebraucht haette."*

**Ist-Zustand:**
- M2 `inhalt` enthaelt einen `<p><em>Was Karl nicht wissen konnte: ...</em></p>`-Block mitten zwischen Karls Ich-Erzaehlung
- M2 `_meta.perspektivitaet` sagt: *"Systemisches Wissen (700 km, Stellungskrieg) steht in Erzaehlerstimme-Rahmen (v3.6)"*
- `_meta.wortanzahl_erzaehlerstimme = 37` → der Einschub ist strukturell als "Erzaehlerstimmen-Rahmen" metadatisch markiert
- `_meta.erarbeitbarkeits_check` sagt *"PASS — k1-1: Stellungskrieg + 700 km Front in Erzaehlerstimme-Rahmen (v3.6)"*

**Ursache-Hypothese (kritisch):**
**Die v3.6-"Erzaehlerstimmen-Rahmen"-Policy ist selbst der Defekt.** Diese Policy wurde eingefuehrt, um das Problem zu loesen, dass Figuren-Perspektiven keine systemischen Fakten (Zahlen, Fachbegriffe) enthalten koennen. Die Policy loest das Problem durch Meta-Einschuebe im Material-`inhalt`. Aus didaktisch-formaler Sicht ist die Loesung schlechter als das Problem:

1. **Sie bricht Form-Integritaet** — der Tagebucheintrag ist kein Tagebucheintrag mehr, sondern ein Hybrid-Text.
2. **Sie verwischt Perspektivitaet** — SuS koennen nicht mehr einfach "was wusste Karl" vs "was wissen wir heute" trennen, weil beides visuell gleich wirkt.
3. **Sie adressiert ein Problem, das in M2 gar nicht existiert** — Karls Text behauptet nichts Falsches, das korrigiert werden muesste. Die Policy feuert unspezifisch.
4. **Sie wird vom Q-Gate als "PASS" markiert** (Erarbeitbarkeits-Check), weil das Gate die Existenz des Einschubs prueft, nicht seine didaktische Notwendigkeit.

**Kandidat-Interventionsorte:**
- **v3.6-Policy-Revision:** Erzaehlerstimmen-Rahmen entweder (a) abschaffen und systemisches Wissen in ein separates Material (Info-Box, Darstellungstext) auslagern, oder (b) stark einschraenken auf Faelle, in denen die Figuren-Perspektive aktiv fehlleiten wuerde — mit deterministischem Trigger-Kriterium.
- `SUB_MATERIAL_TAGEBUCH`: Explizite Regel, dass Erzaehlerstimmen-Einschuebe nur zulaessig sind, wenn eine dokumentierte Fehl-Interpretation durch SuS droht (Trigger-Bedingung).
- `Q-GATE-MECHANIK`: Neuer Gate `NARRATIVE-INTEGRITY`, der pro Tagebuch-Material prueft, ob Figuren- und Erzaehlerstimme visuell unterscheidbar bleiben und ob der Erzaehler-Einschub notwendig war (Trigger-gerechtfertigt).
- **Alternative Architektur:** Statt Meta-Einschub im Tagebuch-`inhalt`: separates Material "Fach-Kontext" (bildquelle/karte/darstellungstext) als Schwester-Material, das den systemischen Kontext liefert.

**Nicht entschieden:**
- Ist v3.6 als Policy prinzipiell zu verwerfen, oder nur seine aktuelle Umsetzung?
- Welche Alternativ-Architektur (separates Kontext-Material vs. visuell getrennte Info-Box vs. Lehrerhinweis in `lehrkraft.html`) hat die hoechste didaktische Qualitaet?

---

### F-LS-M1-05 — M4 Sprecher-Attribution + schwammiger Titel

**Beobachtung:** *"M4 ist extrem schlecht formatiert. Man kann nicht gut erkennen, welche Aussage zu welcher Person/Rolle gehoert. Ausserdem: Die Ueberschrift von M4 ist schwammig, der didaktische Sinn erschliesst sich mir nicht ganz."*

**Ist-Zustand:**
- M4 Titel: "Wofuer starben Hunderttausende bei Verdun und der Somme?" (Frage, thematisch, aber operationell unscharf fuer SuS)
- M4 `inhalt` enthaelt zwei Stimmen — Falkenhayn und anonymer britischer Soldat — in abwechselnden `<p><em>[sinngemaess]</em>`-Bloecken, ohne visuelle Sprecher-Trennung
- `_meta.perspektive = "P2: Britische/Franzoesische Soldaten + P3: Militaerfuehrung (Falkenhayn)"` — metadatisch existiert die Mehrperspektivitaet, visuell wird sie nicht abgebildet
- `_meta.aufbereitung = "rekonstruiert"` — beide Stimmen sind rekonstruiert, nicht Primaerquellen

**Ursache-Hypothesen:**
1. **SUB_MATERIAL_QUELLENTEXT erlaubt Mehrstimmen-Quellen, aber ohne Sprecher-Attribution-Struktur.** Das Schema behandelt `inhalt` als Einzel-HTML-Block, nicht als Array von Sprecher-Bloecken.
2. **Engine-Rendering hat keine Sprecher-Box-Komponente.** Sprecher-Trennung muesste im `inhalt` manuell via `<strong>` oder `<blockquote>` gestaltet werden, was fehlt.
3. **Titel-Zweck-Check fehlt.** Frage-Titel sind fuer SuS nur dann hilfreich, wenn sie den didaktischen Fokus kennzeichnen. "Wofuer starben..." ist wertend-rhetorisch statt operational ("Was entschieden die Generaele vs. was erlebten die Soldaten?").
4. **Q-Gate MQ2 (Ambiguitaets-Sperre, v3.10)** wurde fuer Quellentext-Titel implementiert, aber zielt auf Begriff-Mehrdeutigkeit, nicht auf didaktische Operationalitaet.

**Kandidat-Interventionsorte:**
- `SUB_MATERIAL_QUELLENTEXT`: Neues Feld `stimmen: [{sprecher, rolle, text, quelle}]` statt Freitext-`inhalt` bei Mehr-Sprecher-Materialien. Schema-Migration notwendig.
- `material-output-schema.json`: Neuer Subtyp `QuellentextMehrstimmen` mit `stimmen[]`-Struktur.
- `escape-engine.js`: Neues Rendering fuer `stimmen[]` mit visueller Sprecher-Box (`<figure class="stimme" data-sprecher="..."><blockquote>...</blockquote><figcaption>...</figcaption></figure>`).
- `AGENT_DIDAKTIK` Titel-Generierung: Neuer Check "Titel muss operationales SuS-Kommando oder klare didaktische Fokussierung sein, nicht rhetorisches Aufwerfen einer unbeantwortbaren Frage".
- `Q-GATE-MECHANIK` neuer Gate `TITEL-ZWECK` (pro Material): enthaelt der Titel einen operationalen Fokus oder ist er rein rhetorisch?

**Nicht entschieden:**
- Ist Sprecher-Attribution (Engine-Rendering) ein Infrastruktur-Upgrade oder ein quellentext-lokaler HTML-Patch?
- Gilt die Titel-Zweck-Regel ueberall oder nur fuer `quellentext` und `darstellungstext`?

---

### F-LS-M1-06 — M5 Erzaehler-Einschub mittendrin statt Info-Box

**Beobachtung:** *"Der Einschub in M5 macht inhaltlich Sinn, passt aber formatiert nicht zur Form Tagebucheintrag, weil er mittendrin steht. Eventuell als 'Info-Box' unten im Material anfuegen?"*

**Ist-Zustand:**
- M5 `inhalt`: Paragraph "Fachleute nennen diese Art des Krieges Materialschlacht: Nicht mehr Mut oder Taktik entschieden, sondern Maschinen, Munition und Nachschub." steht zwischen Friedrichs Ich-Erzaehlung
- `_meta.wortanzahl_erzaehlerstimme = 18` → erneut Erzaehlerstimmen-Policy v3.6
- **Abgrenzung zu F-04:** In F-04 ist der Einschub **inhaltlich unnoetig** (User will ihn loeschen). In F-06 ist der Einschub **inhaltlich sinnvoll** (User will ihn **behalten, aber umplatzieren** — als Info-Box nach dem Tagebuch). F-06 ist damit ein **Architektur-Finding**, F-04 ein **Policy-Finding**.

**Ursache-Hypothesen:**
1. **v3.6-Policy kennt nur "inline im Inhalt"-Position.** Es gibt keine Alternative-Positionierung wie "Info-Box am Ende".
2. **`material-output-schema.json` hat kein `info_box`-Feld** als optionale Sekundaer-Sektion pro Material.
3. **Engine rendert `inhalt` als monolithisches HTML, ohne Sekundaer-Container.**

**Kandidat-Interventionsorte:**
- `material-output-schema.json`: Neues optionales Feld `info_box: {titel, inhalt, zweck: "fachlicher_kontext" | "begriffsklaerung" | "weiterfuehrend"}` pro Material.
- `SUB_MATERIAL_TAGEBUCH` + SUB_MATERIAL_* allgemein: Erzaehlerstimmen-Einschuebe von `inhalt` in `info_box` migrieren. Constraint: Tagebuch-`inhalt` darf nur Figuren-Stimme enthalten.
- `escape-engine.js`: Rendering der `info_box` als visuell distinktes Element unter dem Haupt-`inhalt` (z.B. `<aside class="info-box" data-zweck="fachlicher_kontext">`).
- `theme-gpg.css`: Neue Klasse `.info-box` mit klarer Abgrenzung.

**Nicht entschieden:**
- Info-Box **pro Material** oder **pro Mappe** (letzteres waere eine Sammlung am Ende der Mappe)?
- Wie verhaelt sich diese Loesung zum "separaten Kontext-Material" aus F-04 (Redundanz?).

---

### F-LS-M1-07 — Aufgabe 6: Umlaute + zu strenge Korrektheits-Pruefung

**Beobachtung:** *"Frage 6: Umlaut-Problem. Ausserdem: Pruefkonditionen fuer Korrektheit muessen entfernt werden, hauptsache Eingaben nicht leer. Pruefkonditionen sind zu streng und wir sollten die Huerden bis auf Weiteres maximal herabsetzen, um Frustration zu vermeiden."*

**Ist-Zustand — Umlauten (Technik):**
- `aufgabe-1-6.frage` = `"Wer traegt mehr Schuld am Massensterben — Generaele oder Waffen? Begruende."` — 4 ASCII-Ersatzmuster
- `loesung.claim` = `"Die Generaele tragen mehr Schuld, weil sie die Entscheidungen trafen."` — ae-Fehler
- `loesung.evidence[]` und `loesung.reasoning` enthalten "toeteten", "Generaele", "waere" — weitere ASCII-Ersatzmuster
- Alle `tipps[].text` enthalten "stuetzen", "waehlen", "erklaere" — flaechendeckend ASCII-Ersatz
- **Projekt-weit in `data.json`: 20 ASCII-Ersatzmuster, alle in Aufgaben/Tipps/Feedback, null in Materialien/Rahmen**
- `Q-GATE-MECHANIK.md` Zeile 179 definiert explizit `TYP-01-A "Typografische Korrektheit Aufgaben (v3.3)"` — FAIL-Kriterium: "ASCII-Ersatzzeichen in frage, optionen, loesung, tipps"
- Phase-2.2b Q-GATE-LOG markiert aufgabe-1-6 als `A6 PASS` → **Der Gate TYP-01-A wurde entweder uebersehen, nicht automatisiert oder fuer A6 pauschal als PASS zusammengefasst.**

**Ist-Zustand — Pruefkonditionen (Policy):**
- Aufgaben-Typ `begruendung` erwartet CER-Struktur (claim, evidence, reasoning)
- Engine-Matching gegen `loesung.claim` + `loesung.evidence[]` als akzeptable Rueckgabewerte (vermutlich Lemma- oder Substring-Vergleich)
- Drei Tipps mit eskalierender Strenge
- **Kein Feature-Flag fuer "Permissive-Correctness-Modus" = lediglich Nicht-Leer-Pruefung**

**Ursache-Hypothesen:**

*Technik-Dimension (Umlaute):*
1. **Q-GATE TYP-01-A existiert im Katalog, wird aber in der 2.2b-Produktion nicht deterministisch durchgesetzt.** Das ist ein **Q-Gate-Enforcement-Gap**: ein Gate mit Text im Katalog, aber ohne Script-/Subagent-Pruefung im Dispatch-Zyklus.
2. **Der produzierende Subagent (SUB_AUFGABE_*)** schreibt ASCII-Ersatz, vermutlich weil das LLM-Output ohne explizite UTF-8-Forcierung generiert wurde oder weil im Prompt eine ASCII-Normalisierung steckt (z.B. zur JSON-Safety).
3. **Kein Post-Dispatch-Normalisierungs-Schritt** im AGENT_AUFGABE, der ASCII-Ersatz durch Umlaute ersetzt.
4. **Diskrepanz zwischen Material- und Aufgaben-Erzeugung:** Materialien kommen offensichtlich UTF-8-rein durch (0 Ersatzmuster), Aufgaben nicht — d.h. der Defekt ist lokalisiert auf SUB_AUFGABE_* / AGENT_AUFGABE.

*Policy-Dimension (Pruefkonditionen):*
1. **Das Projekt hat keine "Schwierigkeits-Tuning"-Policy.** Aufgaben-Typen pruefen mit einer Strenge, die vom didaktischen Zweck bestimmt ist, nicht von der aktuellen Einsatzphase (Testlauf vs. Pilot vs. Produktiv).
2. **Kein Engine-Feature-Flag `permissive_mode`** oder aehnliches, das global Pruef-Strenge reduziert.
3. **Kein pro-Aufgabe `pruef_modus`** im Schema.

**Kandidat-Interventionsorte:**

*Technik (Umlaut-Defekt):*
- **Automatisierter TYP-01-A Checker** als Script `tools/typ-check-aufgaben.sh` (analog deploy-check.sh). Greift auf ASCII-Ersatz-Muster per Regex, nicht nur auf "PASS"-Annotation im Dispatch-Log. Blocking-Gate.
- **Subagent-Prompt-Patch**: SUB_AUFGABE_*-Prompts explizit um UTF-8-Umlaut-Pflicht mit Beispiel-Listen erweitern.
- **Post-Dispatch-Normalisierung** in AGENT_AUFGABE: ASCII-Ersatz → Umlaute-Mapping automatisch, aber mit Warn-Log.
- **Pre-Commit-Check im escape-game-generator-Repo**: Kein Aufgaben-JSON mit ASCII-Ersatz darf committet werden.

*Policy (Pruefstrenge):*
- **Neue Engine-Feature-Flag `PERMISSIVE_CHECK_MODE`** (global oder pro Game), die Korrektheits-Pruefung auf "Nicht-Leer" reduziert.
- **Schema-Erweiterung `pruef_modus`** pro Aufgabe: Enum `{"streng", "nur_nicht_leer", "lehrer_eval"}`.
- **v3.11-analog ein `v3.12`-Upgrade: "Feedback-First-Aufgaben"**, bei dem die Aufgabe inhaltlich stimmt, aber technische Strenge maximal tolerant ist und stattdessen Feedback-Varianten die Korrektur uebernehmen.
- **Uebergreifende Policy-Entscheidung** (explizit vom User): "Bis auf Weiteres: niedrigste Hurde, maximale Feedback-Toleranz". Diese Policy muss in `PROJECT_INSTRUCTIONS.md` (als Meta-Policy) oder `VERTRAG_PHASE_2-2b_AUFGABE.md` (als Aufgaben-Vertrag) kodifiziert werden.

**Nicht entschieden:**
- Gilt Permissive-Check-Modus **retroaktiv fuer alle bestehenden Games** oder nur fuer neu generierte?
- Wird Permissive-Modus als **Engine-Flag** (data.json `meta.pruef_modus`) oder als **Aufgaben-Schema-Feld** implementiert?

---

### F-LS-M1-08 — Aufgabe 7: Umlaute + Meta-Frage zu schwammig

**Beobachtung:** *"Frage 7: Auch Umlaut-Problem. Uebergreifende Fragestellung zu schwammig. Vielleicht eher etwas auf Meta-Ebene, was zu den drei Unterfragen passt, wie bspw. 'Schreibe eine kurze Zusammenfassung'."*

**Ist-Zustand — Umlauten:** Identisch zu F-07 (siehe dort). `"Wer ueberlebt im Schuetzengraben — und um welchen Preis?"` + ASCII-Ersatz in Tipps/Feedback/`_meta.teilfragen`.

**Ist-Zustand — Frage-Design:**
- `frage` = `"Wer ueberlebt im Schuetzengraben — und um welchen Preis?"` — wiederholt die Stundenfrage (wortgleich zu F-01 problemstellung), erweitert um "um welchen Preis"
- `_meta.teilfragen` = `["Was erlebten die Soldaten im Schuetzengraben?", "Warum konnten neue Waffen wie Giftgas den Krieg nicht entscheiden?", "Welchen Preis zahlten die Ueberlebenden — koerperlich und seelisch?"]`
- `_meta.erwartete_begriffe` = `["Stellungskrieg", "Schuetzengraben", "Giftgas", "Materialschlacht", "Hoffnungslosigkeit"]`
- `typ = "freitext-code"`, `bloom_level = 6`, AFB III — hoechste Synthese-Stufe
- User-Vorschlag: Meta-Frage wie "Schreibe eine kurze Zusammenfassung" — d.h. die Frage soll als **Operator** formuliert sein, nicht als rhetorische Verdichtung

**Ursache-Hypothesen:**
1. **SUB_AUFGABE_FREITEXT_CODE (oder der entsprechende Dispatch-Subagent) versucht eine "synthetisierende Frage" zu bauen**, erbt dabei die rhetorische Form der Stundenfrage, statt einen neutralen Synthese-Operator zu waehlen.
2. **VERTRAG_PHASE_2-2b kennt Aufgabe 7 (Abschluss-Aufgabe) als "Synthese-Stellungnahme Bloom L6"**, aber ohne Frage-Form-Katalog mit operationalen Mustern ("Zusammenfassung schreiben", "Kernerkenntnis formulieren", "Argumentation aufbauen").
3. **F-08 haengt direkt mit F-01 zusammen** — wenn die Stundenfrage unscharf ist, erbt die Abschlussfrage diese Unschaerfe.
4. **Kein didaktisches Mapping "Operator -> Aufgabentyp"** — freitext-code akzeptiert beliebig formulierte Fragen, ohne dass der Operator ("Zusammenfassen", "Beurteilen", "Erklaeren") verbindlich aus einem Katalog gewaehlt wird.

**Kandidat-Interventionsorte:**
- `SUB_AUFGABE_FREITEXT_CODE.md`: Neuer Abschnitt "Operator-Katalog fuer Abschluss-Fragen" mit Enum `{"Zusammenfassung", "Stellungnahme", "Vergleich", "Erklaerung", "Bewertung"}` + Verwendungsregel.
- `VERTRAG_PHASE_2-2b_AUFGABE.md`: Aufgabe-7-Muster muss verbindlich einen Operator wählen, nicht eine rhetorische Frage formulieren.
- `AGENT_DIDAKTIK` bei Progressionsplan-Erstellung (Phase 2.2a): Fuer Position 7 wird der Operator bereits im Plan fixiert, Sub-Agent uebernimmt nur Ausformulierung.
- **Kopplung mit F-01**: Wenn Stundenfrage-Grounding-Gate greift, muss Aufgabe 7 entweder (a) den selben Fragemodus wie die Stundenfrage haben (dann ist der Form-Defekt hier Upstream-verursacht) oder (b) explizit zur Meta-Ebene wechseln.

**Nicht entschieden:**
- Soll Aufgabe 7 **immer** Meta-Operator sein, oder nur wenn die Stundenfrage rhetorisch unscharf ist?
- Wie verhaelt sich der Operator-Katalog zu bestehenden Bloom-L6-Definitionen?

---

## 4. Querschnitts-Achsen (Upgrade-Seed)

Die 8 Findings lassen sich auf 4 strukturelle Achsen zuruecktragen, die je einen potenziellen Upgrade-Track bilden:

### Achse A — Stundenfrage-Grounding + Frage-Form-Integritaet
**Umfasst:** F-LS-M1-01, F-LS-M1-08
**Kern:** Fragen (Stundenfrage, Abschlussfrage, Material-Titelfragen) muessen operational sein, aus Material-Korpus erarbeitbar und semantisch durch die Kernerkenntnisse beantwortbar. **Betroffene Infrastruktur:** VERTRAG_PHASE_2-0_RAHMEN, AGENT_HEFTEINTRAG, AGENT_DIDAKTIK, Q-GATE neue Gates `SF-GROUND` + `TITEL-ZWECK`.

### Achse B — Medien-Diversitaet + Sub-Agent-Reife
**Umfasst:** F-LS-M1-02
**Kern:** Der Generator produziert Text-Monokultur, weil Text-Sub-Agenten implementativ ausgereift und Nicht-Text-Sub-Agenten (Karte, Zeitleiste) unterentwickelt sind. **Betroffene Infrastruktur:** VERTRAG_PHASE_2-1_MATERIAL (Diversitaets-Constraint), Sub-Agent-Reife-Programm fuer SUB_MATERIAL_KARTE/ZEITLEISTE/STATISTIK, Q-GATE `MED-DIV`, DIDAKTIK_RAHMEN Repraesentationsform-Sektion.

### Achse C — Material-Form-Integritaet + v3.6-Erzaehlerstimmen-Revision
**Umfasst:** F-LS-M1-03, F-LS-M1-04, F-LS-M1-05, F-LS-M1-06
**Kern:** Materialien verletzen ihre formale Identitaet — Tagebuch hat Frage-Titel, Erzaehler-Einschuebe brechen Perspektivitaet, Mehrstimmen-Quellen ohne Sprecher-Attribution, Kontext als Inline-Einschub statt Info-Box. Die v3.6-Erzaehlerstimmen-Policy ist der zentrale strukturelle Verursacher fuer F-04 und F-06. **Betroffene Infrastruktur:** SUB_MATERIAL_TAGEBUCH + SUB_MATERIAL_QUELLENTEXT (Form-Constraints), material-output-schema (TagebuchMeta/QuellentextMeta + info_box-Feld, deckt v3.10 T2.F-Ticket ab), escape-engine.js (Sprecher-Rendering, info_box-Rendering), Q-GATE neuer Gate `MAT-FORM-INTEGRITY`, **v3.6-Policy-Revision** als eigenstaendige Entscheidung.

### Achse D — Q-Gate-Enforcement-Gap + Schwierigkeits-Policy
**Umfasst:** F-LS-M1-07, F-LS-M1-08 (technik-dimension)
**Kern:** Q-Gates existieren im Katalog, werden aber in der Produktion nicht deterministisch durchgesetzt (TYP-01-A wurde als PASS markiert, obwohl 20 ASCII-Ersatzmuster in data.json vorhanden sind). Paralleles Policy-Thema: Pruefstrenge fuer Korrektheit muss auf "permissive" herabsetzbar sein, um SuS-Frustration zu reduzieren. **Betroffene Infrastruktur:** **Neues Q-Gate-Enforcement-Framework** (analog zu `deploy-check.sh` aus v3.11, aber fuer Phase-2.2b-Aufgaben), globale **Permissive-Check-Policy** in PROJECT_INSTRUCTIONS oder VERTRAG_PHASE_2-2b, Engine-Feature-Flag + Schema-Erweiterung `pruef_modus`.

---

## 5. Uebergeordnete Meta-Findings

1. **Post-Deploy-Sichtung ist eine eigene Befund-Klasse.** Pre-Deploy-Testrun-Befunde (BEFUND_PHASE_2-2b_TESTRUN_M1 u.a.) sind strukturell **blind fuer SuS-Perspektiv-Defekte**, weil sie gegen die Generator-Artefakte pruefen, nicht gegen die gelebte Nutzererfahrung. **Vorschlag:** Post-Deploy-Sichtung als reglementierte Phase `3.3 Sichtung` zwischen `3.2 Live-Go` und `4.x Nachbereitung` in PI-State-Machine aufnehmen, mit eigenem Q-Gate-Katalog SICHT-01..n. (Dieser Vorschlag ist selbst Teil der Diagnose, nicht des v3.11-Scopes.)
2. **Q-Gate-Enforcement-Gap ist eine strukturelle Fehlerklasse.** Findings F-07/F-08 zeigen, dass der Katalog-Eintrag fuer TYP-01-A nicht deterministisch durchgesetzt wird. Dies ist analog zum v3.11-Befund, dass DEPLOY-Gates nur als Intentions-Text existierten, bis `deploy-check.sh` sie operationalisierte. **Vermutung:** Es gibt weitere Q-Gates im Katalog, deren Enforcement vergleichbar schwach ist. Ein **Gate-Enforcement-Audit** ueber den gesamten Q-GATE-MECHANIK-Katalog waere eine eigenstaendige Upgrade-Aktion.
3. **v3.6-Erzaehlerstimmen-Policy ist ein strukturelles Finding, kein Content-Finding.** F-04 wurde vom Q-Gate als PASS markiert, weil der Gate die Policy-Existenz prueft, nicht ihre didaktische Wirkung. Eine Policy, die Materialien in Hybrid-Form drueckt, kann nicht gleichzeitig Form-Integritaet garantieren. Diese Spannung muss architektonisch aufgeloest werden.
4. **Titel-Heuristik "Material = Antwort auf Frage" ist flaechendeckend und flaechendeckend fragwuerdig.** F-03, F-05, F-08 zeigen alle dasselbe Muster: Titel als Frage, unabhaengig vom Materialtyp. Die Heuristik ist an einer zentralen Stelle (wahrscheinlich AGENT_DIDAKTIK oder AGENT_MATERIAL Titel-Generierung) hart kodiert und muss typ-sensitiv differenziert werden.

---

## 6. Abgrenzung: Was dieser Befund NICHT leistet

- **Keine Content-Fixes am Live-Artefakt.** Ob Marne-Game data.json retrospektiv korrigiert wird (Umlaute, Titel, Erzaehler-Einschuebe), ist eine separate Entscheidung ausserhalb dieses Befundes.
- **Keine Priorisierung der Upgrade-Tracks.** Achsen A/B/C/D sind nicht nach Reihenfolge sortiert; das obliegt der Upgrade-Runden-Planung.
- **Keine Time-Estimates.** Der Umfang jeder Achse kann nur nach Scope-Klaerung geschaetzt werden (v3.6-Policy-Revision ist z.B. potenziell sehr viel groesser als Q-Gate-Enforcement-Framework-Bau).
- **Keine Stellungnahme zur v3.6-Policy-Debatte.** Der Befund beschreibt den Defekt, nicht die Loesung.
- **Keine Pruefung von Game 1 / Ursachen-Game.** Dieser Befund bezieht sich ausschliesslich auf Marne/Mappe 1. Paralleles Game 1 (Ursachen) wurde nicht live-gesichtet. Mehrere Findings (besonders F-03/F-07) sind mit hoher Wahrscheinlichkeit auch dort praesent — bestaetigende Sichtung offen.

---

## 7. Nachfolge-Artefakte (nicht Teil dieses Befundes)

Bei Entscheidung zu Upgrade-Runde `v3.12` waeren die folgenden Artefakte zu erwarten:

- `docs/architektur/UPGRADE_PLAN_v3-12_POST_DEPLOY_LESSONS.md` (oder aehnlich) mit klarem Scope je Achse
- Pro Achse ein Q-Entscheidungs-Set analog v3.10/v3.11
- Evtl. Rueckbau oder Revision der v3.6-Erzaehlerstimmen-Policy als eigener Track
- Evtl. Retroaktiver Content-Fix fuer Marne (data.json-Patch) als separater Operativ-Schritt

---

## 8. Referenzen

- `escape-games/verlauf-erster-weltkrieg-marne-ende/data.json` — Primaer-Evidenz
- `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/mappe-1/Q-GATE-LOG.md` (Phase 2.2b + 2.2c + 3) — Pre-Deploy-Q-Gate-Status
- `docs/agents/artefakte/verlauf-erster-weltkrieg-marne-ende/Q-GATE-LOG_PHASE_3.md` — v3.11 Retro-Log (keine Ueberlappung mit diesen Findings)
- `architektur/Q-GATE-MECHANIK.md` §7.2 TYP-01-A, §7.1 MQ2 (Ambiguitaets-Sperre), §7.6 (v3.10 Assembly-Gates) — im escape-game-generator-Repo
- `agents/SUB_MATERIAL_TAGEBUCH.md`, `agents/SUB_MATERIAL_QUELLENTEXT.md`, `agents/SUB_AUFGABE_BEGRUENDUNG.md`, `agents/SUB_AUFGABE_FREITEXT.md` — im escape-game-generator-Repo (betroffene Sub-Agenten)
- `docs/projekt/CHANGELOG.md` v3.6-Eintraege — Erzaehlerstimmen-Rahmen-Policy-Einfuehrung (fuer Policy-Archaeologie)
- `tools/deploy-check.sh` (v3.11) — Referenz-Implementation fuer zukuenftigen `tools/gate-check-aufgaben.sh`

---

**Befund-Status:** AUFGENOMMEN — wartet auf Upgrade-Runden-Entscheidung.
