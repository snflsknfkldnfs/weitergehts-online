# AUDIT C — INTERNE KONSISTENZ V3-SCHULRECHT-SKRIPTE

**Datum:** 2026-05-21
**Auditor:** C (Interne Konsistenz)
**Scope:** mp01..mp09/data.js + index.html (Hub) der V3-Schulrecht-Skripte
**Methode:** Grep-Sweep über kritische Normen (Art. 86, Art. 76, Art. 56, Art. 88, § 14 LDO, § 5 LDO, § 22 BaySchO, BayDG, Art. 33/5 GG, Cross-Refs, Hub-Abrisse)
**Prüfung gegen:** 7 Precedent-Klassen aus 17_Audit_Master + freie Inter-/Intra-Modul-Suche

---

## SUMMARY

| Kategorie | Count | Schwere |
|---|---|---|
| Inter-Modul-Widersprüche | **2** | 1× MITTEL, 1× NIEDRIG |
| Intra-Modul-Widersprüche | **1** | NIEDRIG (Terminologie) |
| Cross-Ref-Brüche (defekte interne Verweise) | **1** | MITTEL |
| Hub-Konsistenz-Befunde | **1 OK · 1 NIEDRIG** | NIEDRIG |
| Precedent-Klassen-Trefferquote | **0/7** (alle V2-Altfehler behoben) | OK |

**Gesamteinschätzung:** V3-Skripte sind intern weitgehend konsistent. Keine prüfungsgefährdenden Widersprüche bei Zahlen/Fristen/Stufen. 1 substantieller Begriffs-Widerspruch (6-Stufen vs. 12er-Katalog Art. 86/2) + 1 falscher Cross-Ref-Pfeil in MP_08. Die 7 Precedent-Klassen aus 17_Audit_Master (LNW 1J/2J, UrhG 12%/15%, Vorkurs 1,5/2 J., LK-Konf-Nrn., BayDG 5+2/8 Stufen, Schulforum Anhörung/Einvernehmen, EB-Quote) sind alle V3-bereinigt.

---

## INTER-MODUL-WIDERSPRÜCHE

| # | Stelle 1 | Aussage 1 | Stelle 2 | Aussage 2 | Verdict |
|---|---|---|---|---|---|
| **I-1** | mp03/data.js:26, 60-63, 186 | „**12-er OM-Katalog** Art. 86/2" mit explizitem **12-Nr.-Vollkatalog** (Verweis · verschärfter Verweis · Parallelklasse · Nacharbeit · 6-Tage-Ausschluss · 2-4-Wochen-Ausschluss · Androhung Entlassung · Entlassung · Klassenwechsel · andere Schule · Entlassung MS/FöS/BS · Ausschluss alle Schulen einer Art) | mp05/data.js:366 | „**6-Stufen-Katalog Art. 86 Abs. 2**" im A.4-Anriss | **MP_03 ist korrekt.** Art. 86/2 BayEUG enthält 12 Nrn. (MP_03 zählt sie verbatim auf). MP_05-Anriss „6-Stufen" ist eine Verkürzung, die aber falsch klingt — sollte zu „12-Nr.-OM-Katalog" oder „6 erste OM-Stufen (Nr. 1-6)" präzisiert werden. **Examensrisiko MITTEL**: wenn Prüfer „Wie viele OM gibt es?" fragt, ist nur 12 korrekt. |
| **I-2** | mp03/data.js:25 | „Schulforum **(Art. 69)**, **Schulpartner** (KL ↔ EB ↔ SMV) als gestaltende Elemente" — Schulforum als Bindeglied | mp07/data.js:24 | „Schulforum (Art. 69 BayEUG): Bindeglied **EB ↔ SL ↔ SMV ↔ Schulträger ↔ LK**. Beratung ... Vorsitz SL. Bei OM-Eskalation: **Anhörungs-/Stellungnahme-Funktion**" | **Beide Aussagen konsistent**, keine echte Kollision. MP_03 ist knapper, MP_07 tiefer. **ABER**: MP_07 fügt „bei OM-Eskalation Anhörung/Stellungnahme" hinzu — das ist im Wortlaut Art. 69 BayEUG nicht ausdrücklich verankert. Schwere NIEDRIG: könnte vom Prüfer als Überzeichnung beanstandet werden, aber nicht falsch (das Schulforum ist nach Art. 56/5 Beschwerdeinstanz). Empfehlung: in MP_07 explizit auf Art. 56/5 statt diffus „OM-Eskalation" verweisen. |

---

## INTRA-MODUL-WIDERSPRÜCHE

### MP_03 (Schulbetrieb)
- **NIEDRIG / Terminologie:** Z.26 nennt Drei-Stufen-Logik als „Erziehungs- → Ordnungs- → **Sicherungsmaßnahmen** (Art. 87)". Z.110-111 ordnet „6-Tage-Ausschluss" + „2-4-Wochen-Ausschluss" beide unter „OM-Stufung" ein. Beides ist korrekt (OM sind alle 12 Nrn. des Abs. 2, Sicherung ist Art. 87) — aber die Phrase „§ 86/1" in Z.26 ist ein **Mini-Tippfehler**: Art. 86 BayEUG, nicht §. Konsequent ansonsten „Art. 86" geschrieben. Nur dieser eine Vorfall. **Fix:** „§ 86/1" → „Art. 86/1".

### MP_01, MP_02, MP_04, MP_05, MP_06, MP_07, MP_08, MP_09
- Keine intra-modularen Widersprüche gefunden (Grep-Sweep über Altersgrenzen, BayDG-Stufen, Aufsichtspflicht 15 Min, Auskunfts-Trias, EB-Pflichten ergibt durchgängig konsistente Zahlen).

---

## CROSS-REF-BRÜCHE

| # | Quelle | Verweis-Text | Tatsächliche Lokation | Befund |
|---|---|---|---|---|
| **X-1** | mp08/data.js:80, 130 | „Cross-Ref MP_06 A.2 + **MP_07 Haftungsachsen**" (FA09) bzw. „Cross-Ref MP_06 A.2 + **MP_07 Haftungsdreieck**" (F5/Niklas) | Das Haftungsdreieck (Zivil/Disziplinar/Strafrecht) liegt in **MP_06** (Lehrkraft, A.1 + A.2 + A.3, vgl. mp06/data.js:18, 48, 91, 148). **MP_07** behandelt **Elternvertretung** (Klassenelternsprecher, Elternbeirat, Schulforum, EB-Pflichten Art. 76 — keine Haftungsachsen!) | **MITTEL**: Defekter Verweis. Wer in der Prüfung MP_07 aufschlägt, findet kein Haftungsdreieck. **Fix:** Beide Verweise → „Cross-Ref MP_06 A.1+A.2" (Haftungsdreieck + Aufsichtspflicht). |

**Alle anderen Cross-Refs validiert:**
- MP_02→MP_01/MP_05 (Erziehungs-/Ordnungsmaßnahmen): OK — MP_05 enthält OM-Block (A.4 in MP_05)
- MP_04→MP_03 A.4 (GS-Probearbeiten 18-Gesamt): OK — MP_03 enthält LK-Konferenz/Probearbeits-Grundsätze
- MP_04→MP_09 (§ 41/1 BaySchO Vollzitat): OK — MP_09 ist Schulaufsicht-Modul, Schülerakte-Hauptlokation; auch in MP_03 + MP_05 vorhanden
- MP_04→MP_05 (Nachteilsausgleich § 32/33 BaySchO): OK
- MP_04→MP_08 (Lernort FöS Art. 41): OK
- MP_06→MP_05 (Hannah-Fall Notenauskunft): OK
- MP_06→MP_03 A.2 (LK-Konferenz-Detail): OK — explizit als Header-Kommentar in mp06/data.js:3
- MP_08→MP_05 (BaySchO § 39 Schülerunterlagen, § 36 Nachteilsausgleich): OK
- MP_09→MP_08 A.3 (Schulberatung 5 Eskalationsstufen): OK

---

## HUB-KONSISTENZ (index.html ↔ Modul-Inhalte)

| Hub-Card | Anriss | Modul-Inhalt | Bewertung |
|---|---|---|---|
| **MP_01 Rechtl. Grundsätze** | „9-stufige Normenhierarchie · BV Art. 131 Herz+Charakter · ReliU+Ethik · Familien-/Sexualerz. · JuSchG-Stufen · Inklusion Art. 41" | MP_01 deckt alle 6 Sub-Elemente ab | OK |
| **MP_02 Bildungssystem** | „Schulwesen + Schularten · Schulpflicht 12 J. (Art. 35) · Übertritt 2,33/2,66 · M-Zug-Schwellen · drei MS-Aufstiegswege zu Fachabi" | „Schulpflicht 12 J." stimmt mit mp02/data.js:17 überein. M-Zug + MS-Aufstiegswege in MP_04 (nicht MP_02!) | **NIEDRIG**: M-Zug-Schwellen + drei MS-Aufstiegswege liegen primär in **MP_04** (Unterricht+Abschlüsse), nicht in MP_02 (Schulpflicht/Übertritt). MP_02 enthält nur Übertritt. **Fix:** Anriss MP_02 kürzen oder klarstellen, dass M-Zug eine MP_04-Vertiefung ist. |
| **MP_03 Schulbetrieb** | „SL-Gesamtverantwortung Art. 57 + LDO §§ 23-27 · Lehrerkonferenz Art. 58 · Schulleben Art. 56 · OM **12-er Katalog** Art. 86-88 · Werbung Art. 84" | Stimmt mit Modul überein. Hub schreibt explizit **„12-er Katalog"** — bestätigt Verdict bei I-1 zugunsten MP_03 | OK + bestätigt I-1-Verdict |
| **MP_04 Unterricht** | „Trias SuS/EB/Schule · LNW Art. 52 + § 12 MSO · Vorrücken Art. 53 · § 12/3 zwei Direktionalitäten · M-Zug + vier MS-Abschlüsse + Quabi" | OK | OK |
| **MP_05 SuS** | „Doppelstruktur SuS-Rechte/Pflichten · SMV Art. 62-63 (Klassensprecher · Schülerrat) · Schülerzeitung · ndM + Nachteilsausgleich" | Hub-Anriss erwähnt **kein** OM-Kapitel — aber MP_05 enthält A.4 EOM mit Art. 86 (mp05/data.js:366). Inhaltlich konsistent, Anriss-Coverage knapp | NIEDRIG: Hub-Card MP_05 verschweigt OM-Anteil, der inhaltlich aber drin ist. Nicht widersprüchlich, nur unvollständig. |
| **MP_06 Lehrkräfte** | „Doppelstruktur Beamten- + Lehrer-Pflichten. Aufsichtspflicht § 5 LDO + § 22 BaySchO. Auskunfts-Trias § 14 LDO. Streikverbot Art. 33/5 GG" | OK — alle vier Anker im Modul | OK |
| **MP_07 EB** | „Klassenelternsprecher Art. 64 · Elternbeirat Art. 65-67 · Schulforum Art. 69 · EB-Pflichten ‚achten + unterstützen' Art. 76 · Beschwerdeweg gestuft" | OK | OK |
| **MP_08 Koop. Bildung+Betreuung** | „MSD ≠ FöS · Lernort Art. 41 (Eltern!) · Schulberatung Art. 78 · vier Säulen Betreuung (3 Rechtsregime) · GTS-Antragsprinzip · FL Art. 60" | OK | OK |
| **MP_09 Schulaufsicht** | „Verfassungs-Anker Art. 7/1 GG + Art. 130 BV · Pyramide KM → 7 Reg → Schulamt (GS+MS+FöS) → Schule · drei Aufsichtsarten Fach/Dienst/Recht · Personal + Evaluation" | OK | OK |

---

## PRECEDENT-KLASSEN-CHECK (gegen V2-Altfehler aus 17_Audit_Master)

| Precedent-Klasse | V2-Fehler | V3-Befund | Status |
|---|---|---|---|
| LNW-Aufbewahrung 1J vs. 2J | War in V2 widersprüchlich | mp04/data.js:40, 182: einheitlich „1 Woche Ankündigung, 2 Wochen Ersatzprüfung" — KEIN Aufbewahrungs-Konflikt mehr | **OK V3** |
| UrhG 12% vs. 15% | War in V2 widersprüchlich | Kein UrhG-12%/15%-Treffer in V3 — Thema entweder ausgelagert oder geklärt | **OK V3** (kein Konflikt) |
| Vorkurs Deutsch 1,5J vs. 2J | War in V2 widersprüchlich | mp02/data.js:29, 75, 142-144 + mp05/data.js:526-528: einheitlich „**240 h × 1,5 Schuljahre**" — FA07 hebt explizit hervor „NICHT 1 J., NICHT 2 J." | **OK V3** |
| LK-Konf-OM Nrn. 6-9 vs. 6-10 | War in V2 widersprüchlich | mp03/data.js:50, 92, 172, 214 + mp07/data.js:92: einheitlich **„Nr. 6, 9, 11"** (bzw. Nr. 6/9/11) | **OK V3** |
| BayDG 5+2 vs. 8 Stufen | War in V2 widersprüchlich | mp06/data.js:18, 48, 148, 173 + mp09/data.js:224: einheitlich **„5 Stufen Lebenszeit + 2 Stufen Ruhestand"** | **OK V3** |
| Schulforum Anhörung vs. Einvernehmen Art. 69/4 | War in V2 widersprüchlich | Art. 69 wird konsequent als **„beratendes Gremium"** geführt (mp03:215, mp07:24, 92). Einvernehmen-Formulierung taucht nur an Art. 56/5 (Handy/Digitale Endgeräte, mp05:398) auf — dort ist „Einvernehmen Schulforum" jedoch wortlautrichtig | **OK V3** |
| EB-Quote pauschal vs. schulart-spezifisch | War in V2 widersprüchlich | Keine EB-Quote-Aussage in V3-Skripten — Thema offenbar entweder ausgelagert oder bewusst weggelassen | **OK V3** (nicht widersprüchlich, weil nicht behandelt) |

**Bilanz Precedent-Check:** **0/7** Altfehler in V3 reproduziert. V3 ist gegenüber V2-Audit eine substantielle Bereinigung.

---

## EMPFEHLUNGEN (priorisiert nach Examensrisiko)

1. **MITTEL** — **MP_05 A.4-Anriss korrigieren** (mp05/data.js:366): „6-Stufen-Katalog" → „**12-Nr.-OM-Katalog (Schwerpunkt Nr. 1-6 = niedrigschwellige Stufen)**" oder analog zur Hub-Card und MP_03 schlicht „12-er Katalog Art. 86/2 BayEUG". Sonst Risiko, dass in der Prüfung „Wie viele OM gibt es?" → „6" geantwortet wird.

2. **MITTEL** — **MP_08 Cross-Ref-Pfeile reparieren** (mp08/data.js:80 + 130): „Cross-Ref MP_07 Haftungsachsen/Haftungsdreieck" → „**Cross-Ref MP_06 A.1+A.2**". MP_07 enthält kein Haftungsdreieck.

3. **NIEDRIG** — **MP_03 Tippfehler** (mp03/data.js:26): „§ 86/1" → „Art. 86/1" (kosmetisch).

4. **NIEDRIG** — **Hub-Card MP_02 Anriss präzisieren**: M-Zug-Schwellen + drei MS-Aufstiegswege gehören inhaltlich zu MP_04, nicht MP_02. Entweder Hub-Anriss MP_02 kürzen oder explizit „(→ Vertiefung MP_04)" anhängen.

5. **NIEDRIG** — **Hub-Card MP_05 Anriss erweitern**: OM-Anteil aus A.4 nennen, sonst wirkt das Modul im Hub unvollständig.

---

## TECHNISCHE NOTIZ

Audit-Methode: 13 Grep-Calls statt 18 Reads → Token-effizient innerhalb 20-Call-Budget abgeschlossen. Volle Verifikation der Norm-Ankerstellen war möglich (Wortlaut-Vergleich von Art. 86, Art. 88, Art. 76, § 14 LDO, § 5 LDO, § 22 BaySchO, Art. 33/5 GG zwischen Modulen).

**Limitierungen:**
- vertiefung-content.js wurde nicht systematisch geprüft (zeitökonomisch ausgeklammert; ist nach Aufgabenstellung optional).
- Cross-Ref-Validierung erfolgte über Verweis-String-Match, nicht über tatsächliches Lookup der Anker-IDs im Ziel-Modul. Sektions-IDs (A.1/A.2/A.3/A.4) wurden punktuell verifiziert, aber nicht erschöpfend.

— Ende Audit C —
