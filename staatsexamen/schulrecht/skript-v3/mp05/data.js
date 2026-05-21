// MP_05 — Rechte und Pflichten der Schüler:innen
// PDF-Abschnitt 5 (Skript zum Schulrecht 2024 — Stephan Bauer):
//   Organe der Schülermitverantwortung · Schülerzeitung
// (Schwerpunkte 5.4-5.5 ndM-Spezifika + Nachteilsausgleich aus Examens-Realität ergänzt)

window.MODULE = {
  id: 'mp05',
  zalgm: 'ZALGM § 16 Nr. 5',
  schwerpunkt: ['5.1 Doppelstruktur', '5.2 Erziehungs-/Ordnungsmaßnahmen', '5.3 Anhörungs- + Auskunftsrecht', '5.4 ndM-Spezifika', '5.5 Nachteilsausgleich vs. Notenschutz'],
  titel: 'Rechte und Pflichten',
  titel2: 'der Schüler:innen.',
  abriss:
    'Doppelprinzip aus Recht und Pflicht. Beschwerderecht ist gestuft, die ' +
    'Mitarbeitsnote nie Verhaltensstrafe. Sonderregeln bei nichtdeutscher ' +
    'Muttersprache und in der Schülermitverantwortung.',

  kurz: [
    'Schüler:innen tragen Rechte (Information · Beteiligung · Beschwerde) und korrespondierende Pflichten (Mitwirkung · Verhalten · Schulpflicht).',
    'Sanktionspfade sind strikt getrennt: Mitarbeitsnote bewertet fachliche Leistung, Erziehungs-/Ordnungsmaßnahme das Verhalten.',
    'Bei nichtdeutscher Muttersprache greift die Deutschklasse — sprachliche Defizite rechtfertigen keine Tiefer-Einstufung.',
    'Die Schülermitverantwortung ist verfasste Demokratie-Einübung und kein politisches Mandat.',
  ],

  deck: { cards: 9, normebenen: 5, hochprior: 9, fallen: 11 },

  kartografie: [
    {
      ebene: 'I',
      bez: 'Bayerische Verfassung',
      kuerzel: 'BV',
      normen: ['Art. 128 BV', 'Art. 131 BV'],
      sub: 'Bildungsanspruch · Demokratie-Auftrag',
    },
    {
      ebene: 'II',
      bez: 'BayEUG',
      kuerzel: 'BayEUG',
      normen: ['Art. 35', 'Art. 36/3', 'Art. 41', 'Art. 52', 'Art. 56', 'Art. 62', 'Art. 62a', 'Art. 63', 'Art. 73', 'Art. 78', 'Art. 84', 'Art. 86', 'Art. 118'],
      sub: 'Schulpflicht · Leistungsbewertung · Rechte/Pflichten · SMV · EOM',
    },
    {
      ebene: 'III',
      bez: 'Schulordnungen',
      kuerzel: 'VO',
      normen: ['§ 8 BaySchO', '§ 9 BaySchO', '§ 10 BaySchO', '§ 11 BaySchO', '§ 23 BaySchO', '§ 28 BaySchO', '§ 41 BaySchO', '§ 12 MSO', '§ 8 GrSO', '§ 10 MSO', '§ 14 LDO'],
      sub: 'SMV-Organe · Verbote · Schülerakte · Deutschklasse',
    },
    {
      ebene: 'IV',
      bez: 'KMBek',
      kuerzel: 'KMBek',
      normen: ['Vorkurs Deutsch 240', 'DeutschPLUS', 'LehrplanPLUS DaZ'],
      sub: 'Sprachförder-Programme',
    },
    {
      ebene: 'V',
      bez: 'Bundesrecht',
      kuerzel: 'BUND',
      normen: ['Art. 103/3 GG', 'DSGVO Art. 15', 'KUG § 22', 'BayPrG'],
      sub: 'Ne bis in idem · Auskunft · Persönlichkeitsrecht · Presserecht',
    },
  ],

  // Pflichtwissen — Reveal-Karten (Frage vorne, Auflösung hinten)
  pflichtwissen: [
    {
      id: 'K07',
      titel: 'Notenauskunft',
      frage: 'Welche Notenarten umfasst der Auskunftsanspruch — und welche Falle steckt im Lara-Vergleich?',
      antwort:
        'Subj. öff. Recht (Art. 56/2 + Art. 52/1 BayEUG + DSGVO 15 + BV 128) für ALLE Notenarten (schriftlich, mündlich, praktisch). 4-Stufen-Verhältnismäßigkeit → i.d.R. Auskunftspflicht. Vergleich mit anderen Schüler:innen unzulässig — personenbezogene Bindung.',
      norm: 'Art. 56/2 BayEUG',
      status: 'work',
    },
    {
      id: 'K10',
      titel: 'Pflichten Art. 56/4',
      frage: 'Welche sechs Pflichten formuliert Art. 56/4 BayEUG ausdrücklich?',
      antwort:
        'Aktive Mitwirkung (Aufgabe der Schule + Bildungsziel) · Verhüllungs-Verbot · regelmäßige Teilnahme · Distanz-U. mit Bild+Ton bei päd. Forderung · Unterlassen schulbetrieb-/ordnungsstörender Handlungen · Mitwirkung sonderpäd. Gutachten (Art. 41).',
      norm: 'Art. 56/4 BayEUG',
      status: 'repeat',
    },
    {
      id: 'K12',
      titel: 'Passive Verweigerung',
      frage: 'Was prüft das Doppelsanktions-Schema, wenn die Lehrkraft Note + Verweis verhängen will?',
      antwort:
        'Aktive Mitwirkung ist Pflicht — Anwesenheit genügt NICHT. Mitarbeitsnote ist NIE Verhaltenssanktion. Doppelsanktions-Prüfung (Art. 103/3 GG analog, ne bis in idem): identisches Verhalten · zwei Sanktionen · gleiches Rechtsgut → unzulässig.',
      norm: 'Art. 56/4 BayEUG',
      status: 'sit',
    },
    {
      id: 'K15',
      titel: 'Handy-Falle',
      frage: 'Ist das Handy in der Schule absolut verboten — und was passiert beim Filmen der Lehrkraft?',
      antwort:
        'KEIN absolutes Verbot — Aufsicht/SL kann gestatten (Art. 56/5). Filmen verletzt Persönlichkeitsrecht + KUG → Beschlagnahme § 23/2 BaySchO. Rückgabe bei Minderjährigen NUR an Eltern.',
      norm: 'Art. 56/5 BayEUG',
      status: 'work',
    },
    {
      id: 'K20',
      titel: 'Deutschklasse',
      frage: 'Welche Norm regelt die Deutschklasse — und welche Ziel- und Dauer-Vorgaben gelten?',
      antwort:
        'Kernnorm § 8 GrSO / § 10 MSO. Ziel: Vorbereitung Regelklasse altersgleich. Dauer: i.d.R. 1 SJ, spätestens 2 Schulbesuchsjahre. Auf Elternantrag: SL kann Regelklasse gestatten.',
      norm: '§ 10 MSO',
      status: 'open',
    },
    {
      id: 'K22',
      titel: 'Jgst.-Einweisung ndM',
      frage: 'Wann ist eine Tiefer-Einstufung bei zugewanderten Schüler:innen zulässig — und wie tief?',
      antwort:
        'Tiefer-Einstufung NUR bei mangelndem BILDUNGSSTAND — NICHT wegen sprachlicher Defizite. Max. 2 Jgst. tiefer (Art. 36/3 S. 4 BayEUG).',
      norm: 'Art. 36/3 BayEUG',
      status: 'work',
    },
    {
      id: 'K30',
      titel: 'Verbindungs-LK',
      frage: 'Welche Voraussetzungen muss eine Verbindungslehrkraft erfüllen — und wer fällt klassisch durch?',
      antwort:
        'Mind. ½ Regelstundenmaß + UNBEFRISTET an der Schule (Art. 62/7 BayEUG). Amtszeit 1 SJ. LAA NICHT wählbar — Status „auf Widerruf" erfüllt das Unbefristet-Kriterium nicht.',
      norm: 'Art. 62/7 BayEUG',
      status: 'sit',
    },
    {
      id: 'K33',
      titel: 'Schülerzeitung',
      frage: 'Welche zwei Erscheinungsformen gibt es — und was darf die SL bei jeder?',
      antwort:
        'Modus A: Schul-Einrichtung im SMV-Rahmen — SL kann Verteilung + Herausgabe untersagen. Modus B: Druckwerk nach BayPrG — Eltern-Haftung bleibt, SL kann NUR Verteilung auf Schulgelände untersagen (NICHT Herausgabe). Bei Einwendungen (Modus A): Vorlauf-Pflicht Abs. 4 → Stellungnahme Redaktion → Schulforum-Befassung → bei Scheitern gütlicher Einigung Schulforum-Untersagung (Art. 63 BayEUG).',
      norm: 'Art. 63 BayEUG',
      status: 'planned',
    },
    {
      id: 'K35',
      titel: 'Nachteilsausgleich vs. Notenschutz',
      frage: 'Worin unterscheiden sich Nachteilsausgleich und Notenschutz — und welche Konsequenz hat BVerwG 2015 für das Zeugnis?',
      antwort:
        '**Nachteilsausgleich** = Veränderung der **Prüfungsbedingungen** (Zeitverlängerung, Hilfsmittel, alternative Aufgabenformate) bei BEHALTENEN Bewertungsmaßstäben → KEIN Zeugnis-Vermerk. **Notenschutz** = Aussetzung der Bewertung bestimmter Teilleistungen (z.B. Rechtschreibung bei LRS) → MUSS im Zeugnis vermerkt werden ({{BVerwG 2015}}). Anspruchsgrundlage: {{Art. 52a BayEUG}} + {{§ 33/34 BaySchO}}.',
      norm: 'Art. 52a BayEUG',
      status: 'open',
    },
  ],

  // Falle-Atlas — alle 10 als Akkordeon
  fallen: [
    { id: 'FA01', frage: 'Pflichten-Katalog ignorierbar, weil Rechte überwiegen?', antwort: 'NEIN — Pflichten-Katalog Art. 56/4 ist EXPLIZIT (KMK-1973-Hintergrund).' },
    { id: 'FA02', frage: 'Ist das Handy-Verbot in der Schule absolut?', antwort: 'NEIN. Art. 56/5 BayEUG: zulässig im U. mit Aufsicht, sonst nach SL/Schulforum. Satz 3: Nr. 2 gilt nicht für GS. KEIN absolutes Verbot.' },
    { id: 'FA03', frage: 'Filmen einer LK durch SuS — folgenlos?', antwort: 'NEIN. Persönlichkeitsrecht + KUG-Verstoß → Beschlagnahme § 23/2 BaySchO + Ordnungsmaßnahme Art. 86 BayEUG.' },
    { id: 'FA04', frage: 'Notenauskunft nur für schriftliche Noten?', antwort: 'NEIN — alle Notenarten (schriftlich + mündlich + praktisch).' },
    { id: 'FA05', frage: 'Vergleich mit Lara auf Schüler-Anfrage?', antwort: 'NEIN — personenbezogene Auskunftspflicht. § 14 LDO normiert Verschwiegenheit, KEIN explizites „Notengeheimnis"; § 14/4 LDO regelt nur, WEM die Schule Auskunft geben darf.' },
    { id: 'FA06', frage: 'Mündliche Note für „Stören" zulässig?', antwort: 'NEIN — Mitarbeitsnote NUR fachbezogen (Art. 52/3). Verhalten separat über Art. 86 BayEUG.' },
    { id: 'FA07', frage: 'Mündliche Note + Verweis für identisches Verhalten?', antwort: 'UNZULÄSSIG. Doppelsanktion analog Art. 103/3 GG (ne bis in idem). Prüfung: identisches Verhalten · zwei Sanktionen · gleiches Rechtsgut?' },
    { id: 'FA08', frage: 'Tiefer-Einstufung bei ndM wegen schwacher Deutschkenntnisse?', antwort: 'UNZULÄSSIG. Art. 36/3 S. 4: Tiefer-Einstufung NUR bei mangelndem Bildungsstand. DaZ + Deutschklasse sind die richtigen Wege.' },
    { id: 'FA09', frage: 'Kann LAA Verbindungslehrkraft werden?', antwort: 'NEIN. Art. 62/7 BayEUG: nur LK/FL mit mind. ½ Regelstundenmaß + UNBEFRISTET. LAA „auf Widerruf" erfüllt das Kriterium nicht.' },
    { id: 'FA10', frage: 'SL kann presserechtliche Schülerzeitung herausgeben verbieten?', antwort: 'NEIN. Eltern-Haftung bleibt; SL nur Verteilung auf Schulgelände bei Rechtsverstoß. Herausgabe-Untersagung NUR bei Modus „Einrichtung der Schule" möglich.' },
    { id: 'FA11', frage: 'Nachteilsausgleich darf im Zeugnis erscheinen?', antwort: 'NEIN. **Nachteilsausgleich** (Zeitverlängerung, Hilfsmittel) verändert NUR die Prüfungsbedingungen — KEINE Zeugnis-Erwähnung. NUR der **Notenschutz** (Aussetzung Teilleistungs-Bewertung, z.B. Rechtschreibung) MUSS laut BVerwG 2015 zeugnis-vermerkt werden — sonst Diskriminierungs-Falle in der Gegen-Richtung.' },
  ],

  // Fallbeispiele — Sachverhalt offen, Knackpunkte + Antwortkette als Reveal
  faelle: [
    {
      id: 'F1',
      titel: 'Hannah — Notenauskunft + Vergleichsverbot',
      sachverhalt:
        'Hannah (13, 7. Kl. MS) verlangt im Sprechstundengespräch Auskunft über ALLE Mathe-Noten (schriftlich, mündlich, praktisch). Mathe-LK lehnt ab: „Das ist meine pädagogische Beurteilungsautonomie." Hannah fragt zusätzlich, was Lara für die letzte Probe hatte.',
      knackpunkte: [
        'Notenauskunft = subjektives öff. Recht (Art. 56/2 + Art. 52/1 + DSGVO 15 + BV 128). ALLE Notenarten.',
        '4-Stufen-Verhältnismäßigkeit ergibt regelmäßig Auskunftspflicht — LK-Autonomie betrifft Bewertung, nicht Auskunft.',
        'Vergleich mit Lara unzulässig — personenbezogene Bindung (§ 39 BaySchO i.V.m. DSGVO 6/1; § 14 LDO ≠ „Notengeheimnis").',
      ],
      antwortkette: 'Anspruch anerkennen → Termin → strukturiertes Einzelgespräch mit Belegen + Förderhinweisen → Doku Klassenbuch. Lara-Frage höflich-bestimmt zurückweisen mit Verweis auf Daten Dritter.',
    },
    {
      id: 'F2',
      titel: 'Tobias — Passive Verweigerung + Doppelsanktion',
      sachverhalt:
        'Tobias (8. Kl. MS) dreht sich seit zwei Wochen mit dem Rücken zur Tafel. Auf Ansprache: „Meine Schulpflicht erfülle ich durch Anwesenheit." Die LK vergibt eine schlechte mündliche Note in Mathe UND stellt einen schriftlichen Verweis aus.',
      knackpunkte: [
        'Aktive Mitwirkung ist Pflicht (Art. 56/4). Anwesenheit allein genügt nicht.',
        'Mitarbeitsnote NUR fachbezogen (Art. 52/3) — fachliches Verweigern als fehlende Leistung bewertbar; „Verweigern" selbst nicht.',
        'Doppelsanktion-Analyse (Art. 103/3 GG analog): identisches Verhalten + zwei Sanktionen + gleiches Rechtsgut → unzulässig.',
      ],
      antwortkette: 'Mündliche Note nur, soweit konkrete fachliche Mitarbeit fehlt → korrekt im Notenbuch begründen. Verweis als Erziehungsmaßnahme Art. 86 separat, mit anderem Begründungsfokus (Verhalten, nicht Leistung).',
    },
    {
      id: 'F3',
      titel: 'Uschi — Filmen der Lehrkraft',
      sachverhalt: 'Eine Schülerin filmt heimlich die LK im Unterricht und postet das Video auf TikTok.',
      knackpunkte: [
        'Persönlichkeitsrecht + KUG-Verstoß (Recht am eigenen Bild).',
        'Beschlagnahme § 23/2 BaySchO — Rückgabe bei Minderjährigen NUR an Erziehungsberechtigte.',
        'Ordnungsmaßnahme Art. 86 BayEUG wegen Schulbetrieb-Störung + Persönlichkeitsverletzung.',
        'Lösch-Anspruch: Eltern-Gespräch + Aufforderung zur Löschung; bei Verweigerung zivilrechtl. Ansprüche.',
      ],
      antwortkette: 'Sofort-Beschlagnahme im U. → SL informieren → Eltern-Gespräch (Rückgabe nur an Eltern) → Lösch-Aufforderung → EOM → ggf. zivil-/strafrechtliche Anzeige.',
    },
    {
      id: 'F4',
      titel: 'Aischa — Deutschklasse und Regelklasse',
      sachverhalt:
        'Aischa (10) zog vor 4 Wochen aus Syrien nach Bayern. Sie spricht KEIN Deutsch, hat in Syrien die 4. Klasse mit guten Noten abgeschlossen. SL möchte sie in eine 3. Klasse einweisen, „weil sie mit dem Stoff der 5. nicht mitkommt".',
      knackpunkte: [
        'Deutschklasse-Pflicht (§ 10 MSO) — Aischa kommt ZUNÄCHST in eine Deutschklasse, sofern verfügbar.',
        'Tiefer-Einstufung NUR bei mangelndem Bildungsstand (Art. 36/3 S. 4) — sprachliche Defizite reichen NICHT. Syrisches Zeugnis dokumentiert Bildungsstand.',
        'Altersgleichheit: Aischa (10) → Jgst. 5 analog zu dauer-in-Bayern-Kindern.',
        'Auf Elternantrag: SL kann Regelklasse gestatten, wenn Folgeerwartung.',
      ],
      antwortkette: 'Anmeldung → Bildungsstand-Diagnostik (NICHT Deutsch-Test allein) → Deutschklasse Jgst. 5 + DaZ + DeutschPLUS → bei nachweisbarem Folge-Erfolg Übergang Regelklasse.',
    },
    {
      id: 'F5',
      titel: 'Ben — Klassensprecher-Wahl in 3. Klasse',
      sachverhalt: 'An einer GS möchte die KL der 3. Klasse einen Klassensprecher wählen lassen, weil das den Klassenrat unterstützen soll.',
      knackpunkte: [
        'Klassensprecher-Pflicht ab Jgst. 5 (§ 8 BaySchO).',
        'In Jgst. 1–4: keine Pflicht — formelles SMV-Organ entfällt.',
        'Pädagogisch zulässig: informelle „Klassenchef"-/„Klassenrat"-Strukturen, aber keine offizielle Klassensprecher-Funktion mit § 8 BaySchO-Rechten.',
      ],
      antwortkette: 'Eltern + SL aufklären → informelle Mitwirkungs-Form etablieren (ohne Klassensprecher-Etikett) → bei Übergang Jgst. 5: offizielle Klassensprecher-Wahl 4 Wochen nach U.-Beginn.',
    },
    {
      id: 'F6',
      titel: 'Frau Becker (LAA) — Verbindungslehrkraft-Wahl',
      sachverhalt: 'Frau Becker (LAA, 1. Dienstjahr) wird von der Klassensprecher-Versammlung als Verbindungslehrkraft vorgeschlagen.',
      knackpunkte: [
        'NICHT wählbar: LAA — Status auf Widerruf, nicht unbefristet (Art. 62/7 BayEUG).',
        'Wählbar: jede LK + FL mit mind. ½ Regelstundenmaß + unbefristet.',
        'SL muss vor der Wahl die Wählbarkeit verifizieren.',
      ],
      antwortkette: 'Frau Becker freundlich aufklären → SL informiert Klassensprecher-Versammlung über Wählbarkeits-Voraussetzungen → Wahl muss wählbarem Kandidaten gelten → ggf. neue Vorschlagsrunde.',
    },
    {
      id: 'F7',
      titel: 'Frischluft — SL will Schülerzeitung stoppen',
      sachverhalt: 'Die Redaktion der Schülerzeitung „Frischluft" druckt einen kritischen Artikel über die Mensa-Qualität. Die SL möchte vor Erscheinen die Ausgabe stoppen.',
      knackpunkte: [
        'Erscheinungsform klären: Einrichtung der Schule (SMV-Rahmen) — SL kann bei Rechtsverstoß intervenieren, Verteilung untersagen. Druckwerk nach BayPrG — Eltern-Haftung; SL kann NICHT Herausgabe insgesamt verbieten, nur Verteilung auf Schulgelände bei Rechtsverstoß.',
        'Vorabprüfung: SL erhält Exemplar rechtzeitig vor Drucklegung.',
        'Bei Einwänden → Schulforum zur gütlichen Einigung; sonst Schulforum kann Verteilung untersagen (in Schul-Einrichtungs-Variante).',
        'Mensa-Kritik allein ist KEIN Rechtsverstoß — Meinungsfreiheit Art. 5 GG + Art. 110 BV greift.',
      ],
      antwortkette: 'Erscheinungsform feststellen → bei BayPrG-Druckwerk: kein SL-Vorabverbot möglich → Schulforum-Diskussion über Mensa-Qualität → faktische Lösung.',
    },
    {
      id: 'F8',
      titel: 'Yusra — Schülerakte-Einsicht mit 13',
      sachverhalt: 'Yusra (13, 7. Kl. MS) verlangt Einsicht in ihre Schülerakte, weil sie wegen einer Notenauseinandersetzung „alles wissen" möchte.',
      knackpunkte: [
        '§ 41/1 BaySchO: Einsicht ab Vollendung des 14. Lebensjahres (Wortlaut).',
        'Yusra ist 13 — Einsicht steht ihr noch NICHT direkt zu.',
        'Eltern-Recht als Vertretung Minderjähriger besteht weiterhin (Art. 76 BayEUG).',
        'Notenauskunft als getrenntes Recht (Art. 56/2): bleibt davon unberührt — Notengespräch jederzeit möglich.',
      ],
      antwortkette: 'Yusra erklären, dass Akte-Einsicht ab 14 ihr persönliches Recht wird; jetzt: Eltern können Einsicht beantragen. Parallel Notenauskunft-Recht direkt anbieten, das ist altersunabhängig.',
    },
    {
      id: 'F9',
      titel: 'Klausur-Rückgabe verzögert',
      sachverhalt: 'Eine Klausur in Mathematik wurde am 14.10. geschrieben. Bis zum 15.11. (4 Wochen später) hat die LK die Klausuren noch nicht zurückgegeben. Der EB fragt nach.',
      knackpunkte: [
        'MSO § 12/3 (zwei Direktionalitäten!): LK → SuS: „angemessene Frist" (KEIN konkreter Wert). SuS → Schule: „innerhalb einer Woche unverändert".',
        '4 Wochen LK-seitige Verzögerung überschreitet die „angemessene Frist" deutlich (Würdigung anhand Klausur-Aufwand, Belastung, Krankheit etc.).',
        'SL muss Mahnung an LK aussprechen → Korrektur-Pflicht ist Dienstpflicht (LDO).',
      ],
      antwortkette: 'KL/SL ansprechen → LK-Gespräch (Gründe? Belastung? Krankheit?) → Termin für Rückgabe binnen kurzer Frist fixieren → SL-Aufforderung bei extremer Verzögerung. Eltern-Antwort: Wortlaut-Direktionalität transparent kommunizieren.',
    },
    {
      id: 'F11',
      titel: 'Lukas — LRS und Notenschutz',
      sachverhalt:
        'Lukas (8. Kl. MS) hat ein fachärztlich attestiertes LRS-Gutachten. Die Eltern beantragen, dass Rechtschreibung in Deutsch und Englisch nicht in die Notengebung einfließt. Die Klassen-LK fragt: „Muss das ins Zeugnis?"',
      knackpunkte: [
        'Erst Trennung zwischen Nachteilsausgleich + Notenschutz prüfen.',
        'Beantragt sind hier konkret: Aussetzung der Rechtschreib-Bewertung → Notenschutz, nicht bloß Nachteilsausgleich.',
        '**BVerwG 2015**: Notenschutz MUSS im Zeugnis vermerkt werden — sonst Diskriminierung der Mitschüler:innen ohne LRS (irreführende Vergleichbarkeit).',
        'Anspruchsgrundlage: Art. 52a BayEUG + § 33/34 BaySchO (Förderbedarf).',
        'Verfahren: SL-Entscheidung auf Antrag + fachärztliches Gutachten + päd. Stellungnahme.',
      ],
      antwortkette: 'Antrag prüfen → Trennung Nachteilsausgleich (kein Vermerk) vs. Notenschutz (Vermerk-Pflicht) klären → Eltern aufklären, dass der gewünschte „Notenschutz Rechtschreibung" laut BVerwG 2015 zeugnisvermerkt werden MUSS → ggf. Wechsel auf reinen Nachteilsausgleich (Zeitverlängerung) erwägen, wenn kein Zeugnis-Vermerk gewünscht.',
    },
    {
      id: 'F10',
      titel: 'Tom — Politik-Plakat im Klassenzimmer',
      sachverhalt: 'Tom (9. Kl. MS) hängt im Klassenzimmer ein Wahlplakat einer Partei auf, mit der Begründung „Meinungsfreiheit Art. 5 GG".',
      knackpunkte: [
        'Art. 84 Abs. 2 BayEUG: „Politische Werbung im Rahmen von Schulveranstaltungen oder auf dem Schulgelände ist nicht zulässig" — gilt für beide Bezugsräume.',
        'Art. 56/3 BayEUG: Meinungsäußerung mit Grenze „Wahrung sachlichen Zusammenhangs".',
        'Schule als parteipolitisch neutraler Raum — verfassungsrechtlich begründet (Schulfrieden, Anvertrauten-Schutz).',
        'Diskussion politischer Themen im U. ist möglich (Beutelsbacher Konsens), aber keine Plakat-Kampagnen.',
      ],
      antwortkette: 'Plakat entfernen → Tom rechtliche Lage erklären (Art. 84) → Diskurs im GPG-U. anbieten → Beutelsbacher Konsens als Rahmen.',
    },
  ],

  // Sub-Block-Vertiefung (was bisher „Teil A" war)
  vertiefung: [
    {
      id: 'A1',
      kuerzel: 'A.1',
      titel: 'Rechte der Schüler:innen',
      anriss: 'Trias Information · Beteiligung · Beschwerde — gestuft. Verfahrensrechte: Schülerakte ab 14, LNW-Rückgabe nach angemessener Frist. Notenauskunft als subjektives öff. Recht.',
      norm: 'Art. 56 BayEUG',
      status: 'work',
      cards: 9,
      subblocks: [
        { label: 'Rechts-Trias', cards: 3 },
        { label: 'Verfahrensrechte', cards: 2 },
        { label: 'Notenauskunft', cards: 4 },
      ],
    },
    {
      id: 'A2',
      kuerzel: 'A.2',
      titel: 'Pflichten der Schüler:innen',
      anriss: 'Verhaltensgrundnorm — Mitwirkung aktiv, Verhüllungs-Verbot, Distanz-U. Spezielle Verbote: Handy nicht absolut, Alkohol/Rauschmittel, gefährliche Gegenstände. Mitarbeitsnote ≠ Verhaltensstrafe.',
      norm: 'Art. 56/4 BayEUG',
      status: 'repeat',
      cards: 11,
      subblocks: [
        { label: 'Konkrete Pflichten', cards: 3 },
        { label: 'Spezielle Verbote', cards: 5 },
        { label: 'Mitarbeitsnote ↔ Verhalten', cards: 3 },
      ],
    },
    {
      id: 'A3',
      kuerzel: 'A.3',
      titel: 'Schüler:innen mit ndM',
      anriss: 'Schulpflicht-Universalität. Deutschklasse als Kernnorm. Jgst.-Einweisung NUR bei Bildungsstand. Vier Förderpfade. Interkulturelle Erziehung als Verfassungsauftrag.',
      norm: '§ 10 MSO',
      status: 'open',
      cards: 10,
      subblocks: [
        { label: 'Deutschklasse', cards: 3 },
        { label: 'Jgst.-Einweisung', cards: 2 },
        { label: 'Fördermaßnahmen', cards: 3 },
        { label: 'DaZ + Interkultur', cards: 2 },
      ],
    },
    {
      id: 'A4',
      kuerzel: 'A.4',
      titel: 'Schülermitverantwortung',
      anriss: '6 Rechte aus Art. 62. Organe-Hierarchie Klassen → Schul → Bezirk → Land. Verbindungs-LK mit Unbefristet-Kriterium. Schülerzeitung in zwei Modi.',
      norm: 'Art. 62 BayEUG',
      status: 'work',
      cards: 12,
      subblocks: [
        { label: 'Aufgaben SMV', cards: 1 },
        { label: '6 Rechte SMV', cards: 2 },
        { label: 'Wahl-Modus', cards: 3 },
        { label: 'Verbindungs-LK', cards: 1 },
        { label: 'Schülerzeitung', cards: 2 },
        { label: 'Grenzen SMV', cards: 3 },
      ],
    },
    {
      id: 'A5',
      kuerzel: 'A.5',
      titel: 'Erziehungs- + Ordnungsmaßnahmen',
      anriss: 'EOM strikt subsidiär nach EM. 6-Stufen-Katalog Art. 86 Abs. 2. Verfahrens-Trias Art. 88 mit Anhörung. Mitarbeitsnote ≠ Verhaltensstrafe. Nachteilsausgleich vs. Notenschutz nach BVerwG 2015.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
      cards: 8,
      subblocks: [
        { label: 'EOM-Stufenmodell', cards: 2 },
        { label: 'EM vs. OM', cards: 2 },
        { label: 'Verfahrens-Trias Art. 88', cards: 1 },
        { label: 'Nachteilsausgleich/Notenschutz', cards: 3 },
      ],
    },
  ],

  // Glossar (Auszug — finale Quelle: includes/normen-glossar.md)
  glossar: {
    'Art. 56 BayEUG': {
      titel: 'Art. 56 BayEUG — Rechte und Pflichten der Schüler:innen',
      wortlaut: 'Abs. 1: Schülerinnen und Schüler im Sinn dieses Gesetzes sind Personen, die in den Schulen unterrichtet und erzogen werden. — Abs. 2: Recht zur Beteiligung am Schulleben · Mitwirkung an Unterricht (Schulordnung+Lehrplan) · Information über wesentliche Schulangelegenheiten · Auskunft über Leistungsstand+Förderhinweise · Beschwerde nacheinander an LK, SL, Schulforum. — Abs. 4: Verhaltensgrundnorm + Verhüllungs-Verbot. — Abs. 5: Digitale Endgeräte zulässig nur mit Erlaubnis.',
      karten: ['K07', 'K10', 'K15'],
    },
    'Art. 56/2 BayEUG': {
      titel: 'Art. 56 Abs. 2 BayEUG — Rechte-Trias',
      wortlaut: 'Recht zur Beteiligung am Schulleben · Mitwirkung an Unterrichtsgestaltung im Rahmen Schulordnung+Lehrplan · Information über wesentliche Schulangelegenheiten · Auskunft über Leistungsstand+Förderhinweise · Beschwerde „nacheinander" an LK → SL → Schulforum.',
      karten: ['K07'],
    },
    'Art. 56/4 BayEUG': {
      titel: 'Art. 56 Abs. 4 BayEUG — Verhaltensgrundnorm + 6 Pflichten',
      wortlaut: 'S. 1 (Verhaltensgrundnorm): „Alle Schülerinnen und Schüler haben sich so zu verhalten, dass die Aufgabe der Schule erfüllt und das Bildungsziel erreicht werden kann." S. 2 (Verhüllungs-Verbot): „Sie dürfen insbesondere in der Schule und bei Schulveranstaltungen ihr Gesicht nicht verhüllen, es sei denn, schulbedingte Gründe erfordern dies." S. 3 (Distanzunterricht): Bild + Ton bei päd. Forderung der LK + technischer Voraussetzung. 6 Pflichten: (1) aktive Mitwirkung, (2) Verhüllungs-Verbot, (3) regelmäßige Teilnahme U./Veranstaltungen, (4) Distanz-U. Bild+Ton, (5) Unterlassen schulbetrieb-/ordnungsstörender Handlungen, (6) Mitwirkung sonderpäd. Gutachten i.V.m. Art. 41.',
      karten: ['K10', 'K12'],
    },
    'Art. 56/5 BayEUG': {
      titel: 'Art. 56 Abs. 5 BayEUG — Digitale Endgeräte',
      wortlaut: 'Satz 1: Verwendung nur zulässig 1. im U./Veranstaltungen mit Erlaubnis der Aufsicht; 2. im Übrigen mit SL-Genehmigung (Einvernehmen Schulforum) bzw. Aufsicht im Einzelfall. Satz 3: Nr. 2 gilt nicht für GS/GS-Stufe an FöS. Satz 4: Bei unzulässiger Verwendung kann das Gerät vorübergehend einbehalten werden.',
      karten: ['K15'],
    },
    'Art. 36/3 BayEUG': {
      titel: 'Art. 36 Abs. 3 BayEUG — Jgst.-Einweisung',
      wortlaut: 'S. 1: „Für jeden aus dem Ausland zugezogenen Schulpflichtigen stellt die Schule fest, in welche Jahrgangsstufe der Pflichtschule er einzuweisen ist." S. 4: Tiefer-Einstufung bis zu 2 Jgst. zulässig NUR bei mangelndem Bildungsstand.',
      karten: ['K22'],
    },
    'Art. 52/1 BayEUG': {
      titel: 'Art. 52 Abs. 1 BayEUG — Leistungsfeststellung + Auskunft',
      wortlaut: 'Maßstab für die Bewertung in den einzelnen Fächern ist das Ergebnis der von den SuS erbrachten Leistungen — festgestellt durch fortlaufende Beobachtung im Unterricht, durch Befragungen oder durch Leistungsnachweise. Basis des Auskunftsanspruchs i.V.m. Art. 56/2 BayEUG.',
      karten: ['K07'],
    },
    'Art. 52/3 BayEUG': {
      titel: 'Art. 52 Abs. 3 BayEUG — Leistungsbewertung Zeugnis',
      wortlaut: 'Berücksichtigung schriftlicher, mündlicher und praktischer Leistungen. Mitarbeitsnote ist FACHbezogen — keine Verhaltenssanktion.',
      karten: ['K12'],
    },
    '§ 12 MSO': {
      titel: '§ 12 MSO — Leistungsnachweise (Rückgabe)',
      wortlaut: 'Abs. 3: Schriftliche Leistungsnachweise werden in „angemessener Frist" von der Lehrkraft korrigiert + benotet zurückgegeben (KEIN konkreter Wert). Die SuS geben die Arbeiten „innerhalb einer Woche unverändert" zurück. Benotung + Besprechung + Eltern-Kenntnisnahme.',
      karten: [],
    },
    'Art. 62 BayEUG': {
      titel: 'Art. 62 BayEUG — Schülermitverantwortung',
      wortlaut: 'Abs. 1: SMV-Auftrag (Mitgestaltung Schul- und Unterrichtsleben; Demokratie-Einübung). Abs. 1 S. 4: 6 Rechte — Information · Wünsche/Anregungen · Hilfe auf Antrag · Beschwerden · Mitwirkung Hausordnung/Schulforum · Anregungen Kurse+U. Abs. 7: Verbindungslehrkraft.',
      karten: ['K30'],
    },
    'Art. 62/7 BayEUG': {
      titel: 'Art. 62 Abs. 7 BayEUG — Verbindungslehrkraft',
      wortlaut: 'Wählbar Lehrkräfte (auch Förderlehrkräfte) mit MIND. ½ UNTERRICHTSPFLICHTZEIT + UNBEFRISTET an der Schule. Wahl durch Klassensprecher:innen + Stellvertreter. Amtszeit 1 Schuljahr.',
      karten: ['K30'],
    },
    'Art. 63 BayEUG': {
      titel: 'Art. 63 BayEUG — Schülerzeitung',
      wortlaut: 'Abs. 1 S. 4: Wahlrecht — Schul-Einrichtung im SMV-Rahmen ODER Druckwerk nach BayPrG. Abs. 2: Eltern-Haftung bleibt. Abs. 4: Vorlage vor Drucklegung bei Verteilung auf Schulgelände. Abs. 5: SL kann Verteilung untersagen — Herausgabe nur bei Modus „Einrichtung der Schule".',
      karten: ['K33'],
    },
    'Art. 86 BayEUG': {
      titel: 'Art. 86 BayEUG — Erziehungs- und Ordnungsmaßnahmen',
      wortlaut: 'Stufenmodell EOM. Verweis · Verschärfter Verweis · Versetzung · Ausschluss von Veranstaltungen · Androhung Entlassung · Entlassung. Begründung verhaltensbezogen — getrennt von Mitarbeitsnote.',
      karten: ['K12'],
    },
    'Art. 103/3 GG': {
      titel: 'Art. 103 Abs. 3 GG — Ne bis in idem',
      wortlaut: '„Niemand darf wegen derselben Tat auf Grund der allgemeinen Strafgesetze mehrmals bestraft werden." Analog im Schulrecht zur Doppelsanktions-Prüfung.',
      karten: ['K12'],
    },
    'DSGVO Art. 15': {
      titel: 'DSGVO Art. 15 — Auskunftsrecht',
      wortlaut: 'Recht der betroffenen Person auf Auskunft über die zu ihrer Person verarbeiteten Daten — im Schulkontext: Notenauskunft personenbezogen, nicht vergleichend.',
      karten: ['K07'],
    },
    '§ 23 BaySchO': {
      titel: '§ 23 BaySchO — Verbote / Wegnahme',
      wortlaut: 'Abs. 1: Konsum von Alkohol/Rauschmitteln untersagt. Abs. 2: Mitbringen gefährlicher / störender Gegenstände untersagt; Wegnahme + Sicherstellung; Rückgabe bei Minderjährigen NUR an Eltern.',
      karten: ['K15'],
    },
    '§ 10 MSO': {
      titel: '§ 10 MSO — Deutschklasse Mittelschule',
      wortlaut: 'Abs. 1: SuS mit ndM + geringen Deutschkenntnissen besuchen in Jgst. 7–9 zunächst eine Deutschklasse, soweit das Staatliche Schulamt eine gebildet hat. Ziel: Vorbereitung Regelklasse altersgleich. Dauer: i.d.R. 1 SJ, spätestens 2 SBJ.',
      karten: ['K20'],
    },
    '§ 8 GrSO': {
      titel: '§ 8 GrSO — Deutschklasse Grundschule',
      wortlaut: 'SuS mit ndM + geringen Deutschkenntnissen besuchen zunächst eine Deutschklasse, soweit das Staatliche Schulamt eine gebildet hat.',
      karten: ['K20'],
    },
    '§ 14 LDO': {
      titel: '§ 14 LDO — Verschwiegenheits- und Auskunftspflicht',
      wortlaut: 'Abs. 1: Verschwiegenheit über dienstlich bekannt gewordene Angelegenheiten. Abs. 4: Regelt, WEM die Schule Auskunft über SuS geben darf (primär Erziehungsberechtigte). NICHT explizites „Notengeheimnis".',
      karten: ['K07'],
    },
    'KUG § 22': {
      titel: 'KUG § 22 — Recht am eigenen Bild',
      wortlaut: 'Verbreitung von Bildnissen nur mit Einwilligung der abgebildeten Person.',
      karten: ['K15'],
    },
    'Art. 128 BV': {
      titel: 'Art. 128 Bayerische Verfassung — Bildungsanspruch',
      wortlaut: 'Abs. 1: Jeder Bewohner Bayerns hat Anspruch auf eine seinen Fähigkeiten + seiner inneren Berufung entsprechende Ausbildung.',
      karten: ['K07'],
    },
    'Art. 131 BV': {
      titel: 'Art. 131 Bayerische Verfassung — Bildungsziele',
      wortlaut: 'Bildungsziele: Ehrfurcht vor Gott, Achtung vor religiöser Überzeugung und Würde des Menschen, Selbstbeherrschung, Verantwortungsgefühl, Aufgeschlossenheit, Demokratie, Völkerversöhnung.',
      karten: ['K20'],
    },
    'Art. 35 BayEUG': {
      titel: 'Art. 35 BayEUG — Schulpflicht-Grundsatz',
      wortlaut: 'Allgemeine Schulpflicht für alle Kinder + Jugendlichen mit gewöhnlichem Aufenthalt oder Ausbildungs-/Arbeitsplatz in Bayern — OHNE Rücksicht auf Staatsangehörigkeit. Basis für Jgst.-Einweisung Art. 36/3 (Alter + bisherige Schullaufbahn).',
      karten: ['K22'],
    },
    'Art. 41 BayEUG': {
      titel: 'Art. 41 BayEUG — Sonderpädagogische Förderung',
      wortlaut: 'Abs. 4 S. 2 + Abs. 6: Mitwirkungspflicht von SuS + Eltern bei sonderpädagogischer Diagnostik / Gutachten. Rechtsgrundlage für 6. Pflicht in Art. 56/4: „Mitwirkung sonderpäd. Gutachten".',
      karten: ['K10'],
    },
    'Art. 84 BayEUG': {
      titel: 'Art. 84 BayEUG — Schulfrieden + politische Werbung',
      wortlaut: 'Abs. 2: „Politische Werbung im Rahmen von Schulveranstaltungen oder auf dem Schulgelände ist nicht zulässig." Abs. 3: Tragen von Abzeichen + Kleidungsstücken mit politischer Aussage zulässig nur, wenn 5 Schutzgüter NICHT gefährdet sind: (1) Schulfrieden, (2) Schulbetrieb, (3) Bildungs- + Erziehungsauftrag, (4) persönliche Ehre, (5) Erziehung zur Toleranz. Im Zweifel entscheidet SL.',
      karten: [],
    },
    '§ 41 BaySchO': {
      titel: '§ 41 BaySchO — Schülerakte (Einsicht)',
      wortlaut: 'Abs. 1: Einsicht in die Schülerakte „nach Vollendung des 14. Lebensjahres" durch die Schülerin / den Schüler. Eltern-Recht als Vertretung Minderjähriger besteht parallel (Art. 76 BayEUG). Notenauskunft (Art. 56/2) ist davon getrennt + altersunabhängig.',
      karten: [],
    },
    '§ 8 BaySchO': {
      titel: '§ 8 BaySchO — Klassensprecher:innen',
      wortlaut: 'Abs. 1 S. 3: Wahl „innerhalb von vier Wochen nach Unterrichtsbeginn". Ab Jgst. 5 PFLICHT (Art. 62/3 BayEUG). In Jgst. 1–4: SL entscheidet im Einvernehmen mit Elternbeirat. Mehrheitswahl in geheimer Abstimmung. Stellvertreter:in zwingend.',
      karten: [],
    },
    '§ 9 BaySchO': {
      titel: '§ 9 BaySchO — Schülersprecher:innen + Schülerausschuss',
      wortlaut: 'Abs. 1 S. 2: Wahl „innerhalb von zwei Wochen nach der Wahl der Klassensprecher". Drei Schülersprecher:innen, Wahl durch Klassensprecher:innen. Schulforum kann Wahlrecht auf alle SuS ausdehnen. Schülerausschuss = alle Klassensprecher:innen.',
      karten: [],
    },
    '§ 10 BaySchO': {
      titel: '§ 10 BaySchO — SMV-Veranstaltungen',
      wortlaut: 'SMV-Veranstaltungen finden unter schulischer Aufsicht statt — Aufsichtspflicht + gesetzlicher Versicherungsschutz greifen. Keine parteipolitische Agitation; kein politisches Mandat (Grenze SMV).',
      karten: [],
    },
    'BayPrG': {
      titel: 'BayPrG — Bayerisches Pressegesetz',
      wortlaut: 'Modus B Schülerzeitung (Art. 63 BayEUG Abs. 1 S. 4): Druckwerk mit verantwortlichem Redakteur i.S.d. BayPrG. Eltern-Haftung bleibt. SL kann NICHT Herausgabe insgesamt verbieten — nur Verteilung auf Schulgelände bei Rechtsverstoß.',
      karten: ['K33'],
    },
    'Vorkurs Deutsch 240': {
      titel: 'KMBek Vorkurs Deutsch 240',
      wortlaut: 'Sprachförderprogramm für K mit ndM 1,5 Jahre vor Einschulung. Umfang 240 Wochenstunden. Träger gemeinsam: Kindertageseinrichtung + Grundschule. Ziel: Deutschkenntnisse für erfolgreichen Übergang Regelklasse.',
      karten: [],
    },
    'DeutschPLUS': {
      titel: 'KMBek DeutschPLUS',
      wortlaut: 'Zwei Spielarten: (1) DeutschPLUS-Differenzierung — innerhalb des Regelunterrichts (binnendifferenzierte Sprachförderung). (2) DeutschPLUS-Kurse — additiv neben Regel-U. Beide Wege ergänzen die Deutschklasse (§ 10 MSO / § 8 GrSO).',
      karten: [],
    },
    'LehrplanPLUS DaZ': {
      titel: 'LehrplanPLUS DaZ — Deutsch als Zweitsprache',
      wortlaut: 'Bayerischer Lehrplan für alle weiterführenden Schularten mit DaZ-Bezug. Noten kommen in das Zeugnis. Stützt die Interkulturelle Erziehung (Verfassungsauftrag Art. 131 BV — „Geist der Demokratie", „Völkerversöhnung").',
      karten: [],
    },
  },
};
