// MP_01 — Rechtliche Grundsätze für Bildung und Erziehung
// PDF-Abschnitt 1 (Skript zum Schulrecht 2024 — Stephan Bauer, Studienseminar MS II, SW V):
//   Hierarchie · Bildungs-/Erziehungsauftrag · christl. Bekenntnisse · Familien-/Sexualerziehung · JuSchG · Inklusion
window.MODULE = {
  id: 'mp01',
  zalgm: 'ZALGM § 16 Nr. 1',
  schwerpunkt: [
    '1.1 Hierarchie der Vorschriften',
    '1.2 Bildungs-/Erziehungsauftrag',
    '1.3 Religion + Ethik',
    '1.4 Familien-/Sexualerziehung',
    '1.5 JuSchG + Inklusion',
  ],
  titel: 'Rechtliche Grundsätze',
  titel2: 'für Bildung + Erziehung.',
  abriss:
    '9-stufige Normenhierarchie GG → Dienstanweisung SL. Verfassungs-Doppel ' +
    'BV Art. 131 (Herz + Charakter) + BayEUG Art. 1/2 (Aufgabenkatalog). ' +
    'ReliU = ordentliches Lehrfach (Art. 136 BV / Art. 46 BayEUG). ' +
    'JuSchG-Stufen Kind <14 / Jugendl. 14–18. Inklusion: Lernort = EB-Entscheidung (Art. 41).',

  kurz: [
    '9-stufige Hierarchie: GG · BV · BayEUG · BaySchO/BayMSO/LDO/AGO · KMBek · KMS · RS Regierung · RS Schulamt · Dienstanweisung SL. Höhere Stufe verdrängt niedrigere — KMS kann BayEUG nicht überschreiben.',
    'BV Art. 131/1: „Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch Herz und Charakter bilden." Doppel-Auftrag Wissensvermittlung + Persönlichkeitsbildung — verfassungsrechtlich verankert.',
    'ReliU ist **ordentliches Lehrfach** (Art. 136/2 BV + Art. 46 BayEUG). Bis Vollendung 18. Lj. entscheiden EB, danach SuS selbst (Art. 137/1 BV). Wer nicht teilnimmt → **Pflichtfach Ethik** (Art. 47 BayEUG).',
    'Familien-/Sexualerziehung ist **Aufgabe der Schule** — nicht „Sexualkunde". Verankerung BV + BayEUG; Information der Eltern PFLICHT vor entspr. Unterrichtseinheiten (KMS-Regelung).',
    'JuSchG §1: **Kind = unter 14 J.**, **Jugendlicher = 14 bis unter 18 J.**, **Erziehungsbeauftragte/r** = sorgeberechtigte Person ODER >18-Jährige/r im Auftrag der EB. Schutz-Bereiche Alkohol · Nikotin · Gaststätten · Veranstaltungen · Spielhallen.',
  ],

  deck: { cards: 8, normebenen: 5, hochprior: 8, fallen: 10 },

  kartografie: [
    { ebene: 'I', bez: 'Grundgesetz', kuerzel: 'GG', normen: ['Art. 4 GG', 'Art. 6/2 GG', 'Art. 7 GG'], sub: 'Religionsfreiheit · Elternrecht · Schulaufsicht des Staates' },
    { ebene: 'II', bez: 'Bayerische Verfassung', kuerzel: 'BV', normen: ['Art. 128 BV', 'Art. 131 BV', 'Art. 132 BV', 'Art. 135 BV', 'Art. 136 BV', 'Art. 137 BV'], sub: 'Bildungsanspruch · Oberste Bildungsziele · Anlage+Leistung · Volksschule · ReliU · Teilnahme' },
    { ebene: 'III', bez: 'BayEUG', kuerzel: 'BayEUG', normen: ['Art. 1 BayEUG', 'Art. 2 BayEUG', 'Art. 30a BayEUG', 'Art. 41 BayEUG', 'Art. 46 BayEUG', 'Art. 47 BayEUG', 'Art. 48 BayEUG'], sub: 'Aufgabenkatalog · Schulfähigkeit · Inklusion · Lernort · ReliU · Ethik · Familien-/Sexerz.' },
    { ebene: 'IV', bez: 'Schulordnungen', kuerzel: 'VO', normen: ['BaySchO', 'BayMSO', 'LDO', 'AGO'], sub: 'Allgemein · Mittelschule · Dienstordnung LK · Allgem. Geschäftsordnung' },
    { ebene: 'V', bez: 'Verwaltungsvorschriften + Bundesrecht', kuerzel: 'VV', normen: ['KMBek', 'KMS', '§ 1 JuSchG', '§ 8a SGB VIII'], sub: 'KM-Bekanntmachungen · KM-Schreiben · Jugendschutz · Kindeswohlgefährdung' },
  ],

  pflichtwissen: [
    {
      id: 'L01', titel: '9-stufige Normenhierarchie',
      frage: 'Nennen Sie die 9 Stufen der Hierarchie schulrechtlicher Vorschriften — von oben nach unten.',
      antwort: 'Verfassungsrecht: (1) GG · (2) BV. Gesetze: (3) BayEUG. Rechtsverordnungen: (4) BaySchO, BayMSO, LDO, AGO. Verwaltungsvorschriften: (5) KMBek (KM-Bekanntmachung, organisatorisch) · (6) KMS (KM-Schreiben, auslegend) · (7) RS Regierung · (8) RS Schulamt (Ermessensrichtlinien) · (9) Dienstanweisung des Schulleiters. Höherrangige Norm verdrängt niedrigere (lex superior).',
      norm: 'PDF S. 5 Stephan Bauer', status: 'open',
    },
    {
      id: 'L02', titel: 'BV Art. 131 — Doppelter Bildungsauftrag',
      frage: 'Welchen verfassungsrechtlichen Doppelauftrag formuliert Art. 131/1 BV?',
      antwort: 'Verbatim: „Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch Herz und Charakter bilden." → Wissensvermittlung UND Persönlichkeitsbildung. Konkretisiert in Art. 131/2-3 BV (oberste Bildungsziele: Ehrfurcht vor Gott · Achtung Würde des Menschen · Heimatliebe · Demokratie · Völkerversöhnung) und in Art. 1/2 BayEUG (Aufgabenkatalog).',
      norm: 'Art. 131 BV', status: 'open',
    },
    {
      id: 'L03', titel: 'Bildungsziele BV vs. BayEUG',
      frage: 'Welche zwei Anker-Kataloge nennen die obersten Bildungsziele — und worin liegt die Konkretisierungs-Logik?',
      antwort: 'BV Art. 131/2-3 = Grundwerte-Katalog (Ehrfurcht vor Gott · Achtung religiöser Überzeugung · Würde des Menschen · Aufgeschlossenheit für alles Wahre, Gute, Schöne · Heimatliebe · Hilfsbereitschaft · Verantwortungsgefühl · Selbstbeherrschung · Naturverantwortung · Demokratie · Völkerversöhnung). BayEUG Art. 1+2 = Aufgaben-Operationalisierung (Kenntnisse + Fertigkeiten · selbstständiges Urteil · europäisches Bewusstsein · Toleranz · Verantwortung für Umwelt · Berufswelt-Vorbereitung). Vom Grundwert zur Schulaufgabe.',
      norm: 'Art. 131 BV', status: 'open',
    },
    {
      id: 'L04', titel: 'ReliU als ordentliches Lehrfach',
      frage: 'Warum ist Religionsunterricht „ordentliches Lehrfach" — und welche Folgen hat das?',
      antwort: 'Art. 7/3 GG: „Religionsunterricht ist in den öffentlichen Schulen mit Ausnahme der bekenntnisfreien Schulen ordentliches Lehrfach." Spiegelung in Art. 136/2 BV + Art. 46 BayEUG. Folgen: (1) Pflichtfach mit Note + Vorrückungsrelevanz · (2) Getrennt nach Bekenntnissen · (3) LK bedarf religionspädagogischer Bevollmächtigung (Vocatio/Missio canonica) · (4) Bereitstellung Schulräume · (5) Kein Zwang zur Erteilung für LK (Art. 136/3 BV).',
      norm: 'Art. 7/3 GG', status: 'open',
    },
    {
      id: 'L05', titel: 'ReliU-Teilnahme: Altersgrenze',
      frage: 'Wer entscheidet über die Teilnahme am ReliU — und ab wann?',
      antwort: 'Art. 137/1 BV: „Über die Teilnahme am Religionsunterricht, kirchlichen Handlungen und Feierlichkeiten entscheiden bis zur Vollendung des 18. Lebensjahres die Erziehungsberechtigten des Schülers, danach er selbst." Bei Abmeldung: PFLICHT-Teilnahme am Ethikunterricht (Art. 47 BayEUG) — kein „Freistunden-Recht". Religionsmündigkeit nach RKEG: Wechsel ab 14, kein Zwang gegen Willen ab 12.',
      norm: 'Art. 137 BV', status: 'open',
    },
    {
      id: 'L06', titel: 'Familien- und Sexualerziehung — nicht „Sexualkunde"',
      frage: 'Welche schulrechtliche Verortung hat die Sexualerziehung — und welche EB-Pflicht?',
      antwort: 'Familien- + Sexualerziehung ist **Aufgabe der Schule** (Art. 48 BayEUG, BV-Bezug). Begriff bewusst NICHT „Sexualkunde" — Erziehungsauftrag, nicht reine Wissensvermittlung. Orientierung an sittlichen Grundsätzen der BV. **Information der Eltern PFLICHT** vor den entspr. Unterrichtseinheiten (KMS-Regelung) — EB-Beteiligung als Verfahrenspflicht, nicht als Vetorecht.',
      norm: 'Art. 48 BayEUG', status: 'open',
    },
    {
      id: 'L07', titel: 'JuSchG §1 — Drei Personen-Stufen',
      frage: 'Welche drei Stufen unterscheidet § 1 JuSchG — und warum ist die LK-Praxis relevant?',
      antwort: '§ 1/1 JuSchG: **Kind = unter 14 J.** · **Jugendlicher = 14 bis unter 18 J.** · **Erziehungsbeauftragte/r** = Person mit Sorgerecht ODER eine Person über 18 J., die im Auftrag der EB personensorgeberechtigte Aufgaben wahrnimmt. Schulische Relevanz: Schutz-Bereiche Alkohol/Nikotin/Gaststätten/Veranstaltungen/Spielhallen (§§ 4–13 JuSchG) — bei Schulfahrten/-veranstaltungen + Klassenfahrten zu beachten. Strafmündigkeit ab Vollendung 14. Lj. (§ 1 JGG) — andere Grenze als JuSchG!',
      norm: '§ 1 JuSchG', status: 'open',
    },
    {
      id: 'L08', titel: 'Inklusion: Lernort-Entscheidung',
      frage: 'Wer entscheidet bei sonderpädagogischem Förderbedarf über den Lernort — und welche Ausnahmen gelten?',
      antwort: 'Art. 41/1 BayEUG: **Eltern-Entscheidung** über Lernort (allgemeine Schule oder Förderschule). Sonderpädagogische Förderung als Verfassungs-Auftrag Art. 128/2 BV + Art. 2/2 BayEUG. **Ausnahme** Art. 30a/4 BayEUG: Bei Förderschwerpunkten **Sehen · Hören · körperlich-motorische Entwicklung** ZUSÄTZLICH **Zustimmung des Sachaufwandsträgers** erforderlich (technisch-bauliche Voraussetzungen). 7 Förderschwerpunkte gem. Art. 20/1: Sehen · Hören · k./m. Entwicklung · geistige Entw. · Sprache · Lernen · em./soz. Entw. (+ Praxis-Erweiterungen Autismus + ELECOK).',
      norm: 'Art. 41 BayEUG', status: 'open',
    },
  ],

  fallen: [
    { id: 'FA01', frage: 'KMS und BayEUG sind gleichwertig — beide Verwaltungsvorschriften?', antwort: 'NEIN. BayEUG = formelles Gesetz (Landtag). KMS = Verwaltungsvorschrift des KM (auslegend). KMS kann BayEUG NICHT verdrängen — höherrangige Norm verdrängt niedrigere (lex superior).' },
    { id: 'FA02', frage: 'BV Art. 131 verlangt nur Wissensvermittlung?', antwort: 'NEIN. „Nicht NUR Wissen und Können …, sondern AUCH Herz und Charakter." Doppelauftrag. Wer Erziehung gegen Bildung ausspielt, verfehlt den Verfassungsauftrag.' },
    { id: 'FA03', frage: 'ReliU ist nur Wahlfach?', antwort: 'NEIN. ReliU = **ordentliches Lehrfach** (Art. 7/3 GG + Art. 136/2 BV + Art. 46 BayEUG). Pflichtfach mit Note + Vorrückungsrelevanz. Abmeldung möglich, dann ABER Ethik-Pflicht.' },
    { id: 'FA04', frage: 'Bei Abmeldung vom ReliU hat man einfach eine Freistunde?', antwort: 'NEIN. Art. 47 BayEUG: Ethik ist **Pflichtfach** für alle, die nicht am ReliU teilnehmen. „Ersatz für nicht besuchten Religionsunterricht ist ein Unterricht über anerkannte Grundsätze der Sittlichkeit" (Art. 137/2 BV).' },
    { id: 'FA05', frage: 'EB können nach Vollendung des 18. Lj. ihre Kinder vom ReliU abmelden?', antwort: 'NEIN. Art. 137/1 BV: Ab Vollendung 18. Lj. entscheidet die volljährige SuS selbst. EB haben kein Abmelderecht mehr. Religionsmündigkeit nach RKEG ab 14 (Wechsel), ab 12 nicht gegen den eigenen Willen.' },
    { id: 'FA06', frage: 'Familien-/Sexualerziehung können EB komplett verweigern?', antwort: 'NEIN. Aufgabe der Schule (Art. 48 BayEUG). EB sind zu **informieren**, haben aber kein Vetorecht. Verfahrenspflicht ≠ Zustimmungsvorbehalt.' },
    { id: 'FA07', frage: 'JuSchG-Grenze 14 J. = auch Strafmündigkeitsgrenze?', antwort: 'TEILWEISE. § 1/1 JuSchG: Kind <14 / Jugendl. 14–18. § 1 JGG: Strafmündigkeit ab **Vollendung** 14. Lj. → Schwellen ähnlich, aber zwei verschiedene Anker (Jugendschutz vs. Strafrecht). Bei <14 SuS: § 8a SGB VIII Jugendamt parallel.' },
    { id: 'FA08', frage: 'Sonderpädagogische Förderung = nur Förderschule?', antwort: 'NEIN. Art. 41/1 BayEUG: Eltern entscheiden über Lernort (allg. Schule MÖGLICH). Inklusion ist Auftrag aller Schulen (Art. 30a BayEUG). Ausnahme nur bei Sehen/Hören/k.-m.: Sachaufwandsträger-Zustimmung (Art. 30a/4).' },
    { id: 'FA09', frage: 'Bildungsziele aus BayEUG und BV stehen in Konkurrenz?', antwort: 'NEIN. Sie ergänzen sich vertikal: BV Art. 131 = Grundwerte (Ehrfurcht · Würde · Heimatliebe · Demokratie). BayEUG Art. 1+2 = operationalisierte Aufgaben (Kenntnisse + Fertigkeiten · selbstständiges Urteil · Berufsvorbereitung). Vom Verfassungsgut zur Schulaufgabe.' },
    { id: 'FA10', frage: 'Bevollmächtigung der ReliU-LK kommt vom KM?', antwort: 'NEIN. Art. 136/3 BV + Art. 46/2 BayEUG: **Religionsgemeinschaft** erteilt die Bevollmächtigung (kath.: Missio canonica; ev.: Vocatio). Staat stellt nur Rahmen; inhaltliche Verantwortung liegt bei der Kirche.' },
  ],

  faelle: [
    {
      id: 'F1',
      titel: 'KMS widerspricht BayEUG-Wortlaut',
      sachverhalt: 'Ein neueres KMS legt eine Verfahrensfrist „spätestens 5 Werktage" fest, während eine BayEUG-Regelung (formelles Gesetz) eine längere Frist „2 Wochen" vorgibt. Welche Frist gilt?',
      knackpunkte: [
        'Lex superior: höherrangige Norm verdrängt niedrigere. BayEUG = formelles Gesetz (Landtag); KMS = Verwaltungsvorschrift des KM.',
        'KMS kann BayEUG **nicht** verkürzen — er kann nur konkretisieren oder auslegen, soweit dem Gesetz nicht widersprochen wird.',
        'Im Konflikt: BayEUG-Frist „2 Wochen" gilt; KMS-Frist wird insoweit ungültig.',
        'Pragmatisch: SL/Schulamt um Klärung bitten; im Zweifel Akten-Vermerk + gesetzeskonforme Frist anwenden.',
      ],
      antwortkette: 'Hierarchie BayEUG > KMS → KMS-Frist verkürzt unzulässig BayEUG → BayEUG-Frist „2 Wochen" gilt → KMS-Passage insoweit unwirksam → Klärung über Schulamt.',
    },
    {
      id: 'F2',
      titel: 'EB will Kind vom Ethikunterricht abmelden',
      sachverhalt: 'EB sagt: „Mein Sohn ist vom Religionsunterricht abgemeldet, dann muss er auch nicht zu Ethik — das ist doch dasselbe."',
      knackpunkte: [
        'Art. 47/1 BayEUG: Ethik = **Pflichtfach** für alle, die nicht am ReliU teilnehmen. Kein Abmelderecht.',
        'Verfassungs-Anker Art. 137/2 BV: „Ersatz für nicht besuchten Religionsunterricht ist ein Unterricht über anerkannte Grundsätze der Sittlichkeit."',
        'Keine „Freistunden-Lösung" — Ethik ist Pflicht mit Note + Vorrückungsrelevanz.',
        'Beratung Eltern: pädagogische Begründung + rechtliche Klarstellung; bei Verweigerung: Schulpflicht Art. 35 BayEUG + ggf. OM.',
      ],
      antwortkette: 'ReliU = ordentl. Lehrfach Art. 46 → Abmeldung möglich (Art. 137/1 BV) → ABER Ethik-Pflicht Art. 47 BayEUG → keine Freistunde → Schulpflicht Art. 35 gilt → bei Verstößen Erziehungs-/Ordnungsmaßnahmen.',
    },
    {
      id: 'F3',
      titel: 'Sexualerziehung — EB-Veto?',
      sachverhalt: 'Vor einer Unterrichtssequenz zur Sexualerziehung in Jgst. 8 meldet sich eine Elternvertretung: „Wir möchten, dass unser Kind dieser Sequenz fernbleibt — das gehört in den Familienkreis, nicht in die Schule."',
      knackpunkte: [
        'Art. 48 BayEUG: Familien- + Sexualerziehung = **Aufgabe der Schule**. Begriff bewusst nicht „Sexualkunde" — Erziehung, nicht Kunde.',
        'EB-Beteiligung: rechtzeitige **Information** PFLICHT (KMS-Regelung) — Verfahrenspflicht, nicht Zustimmungsvorbehalt.',
        'EB haben **kein Vetorecht** — Schulpflicht Art. 35 BayEUG gilt.',
        'Pädagogische Ebene: Inhalte transparent darstellen; Berücksichtigung kultureller/religiöser Sensibilitäten möglich, ohne Bildungsauftrag zu unterlaufen.',
      ],
      antwortkette: 'Schulischer Auftrag Art. 48 → EB-Information PFLICHT (KMS) → kein Vetorecht → Teilnahme = Schulpflicht Art. 35 → pädagogisches Gespräch + Transparenz statt Ausnahme.',
    },
    {
      id: 'F4',
      titel: 'Klassenfahrt — Alkoholregelung Jgst. 9',
      sachverhalt: 'Bei der Abschlussfahrt der Jgst. 9 fragen 15-jährige SuS: „Dürfen wir auf der Hütte Bier trinken?"',
      knackpunkte: [
        'JuSchG § 9: Bier/Wein/Sekt ab 16 J. mit EB-Begleitung ab 14 J. (in Gaststätten). Spirituosen erst ab 18 J.',
        'Bei Jgst. 9 i.d.R. **15-jährige Jugendliche** — Bier/Wein verboten ohne EB-Anwesenheit.',
        'Schulrechtlich strenger: LK/SL kann in der Schulveranstaltung **generelles Alkoholverbot** verfügen (Aufsichtspflicht + Erziehungsauftrag); KMBek + RS sehen dies regelmäßig vor.',
        'Verstoß: OM Art. 86 BayEUG möglich (Verweis bis Ausschluss von Schulveranstaltungen Art. 86/2 Nr. 6).',
      ],
      antwortkette: 'JuSchG § 9 (15-Jährige: kein Bier ohne EB) → Schulveranstaltung: strenger via Aufsichtspflicht → Verbot in Klassenfahrt-Regeln + EB-Info → bei Verstoß OM Art. 86 (Verweis/Ausschluss).',
    },
  ],

  vertiefung: [
    {
      id: 'A1', kuerzel: 'A.1', titel: 'Hierarchie der Vorschriften',
      anriss:
        '9-stufige Pyramide GG → Dienstanweisung SL. Verfassungsrecht (GG/BV) → Gesetze (BayEUG) → Rechtsverordnungen (BaySchO/MSO/LDO/AGO) → Verwaltungsvorschriften (KMBek/KMS/RS). Lex superior, lex posterior, lex specialis als Konflikt-Regeln.',
      norm: 'PDF S. 5', status: 'open', cards: 3,
      subblocks: [
        { label: '9-Stufen-Tabelle', cards: 1 },
        { label: 'Lex superior / posterior / specialis', cards: 1 },
        { label: 'Praxis: KMS-vs-BayEUG-Konflikt', cards: 1 },
      ],
    },
    {
      id: 'A2', kuerzel: 'A.2', titel: 'Bildungs- und Erziehungsauftrag',
      anriss:
        'BV Art. 131 „Herz und Charakter" als verfassungsrechtlicher Doppelauftrag. Oberste Bildungsziele BV vs. BayEUG (Grundwerte vs. operationalisierte Aufgaben). BayEUG Art. 1+2 als Schulpflicht-Konkretisierung.',
      norm: 'Art. 131 BV', status: 'open', cards: 3,
      subblocks: [
        { label: 'Art. 131 BV verbatim', cards: 1 },
        { label: 'Oberste Bildungsziele BV', cards: 1 },
        { label: 'BayEUG-Aufgabenkatalog Art. 1+2', cards: 1 },
      ],
    },
    {
      id: 'A3', kuerzel: 'A.3', titel: 'Religion + Ethik',
      anriss:
        'Art. 7/3 GG + Art. 136/137 BV + Art. 46/47 BayEUG. ReliU = ordentliches Lehrfach (Pflichtfach mit Note). 18-Lj-Schwelle Teilnahme. Ethik-Pflicht bei Abmeldung. Bevollmächtigung durch Religionsgemeinschaft (Vocatio/Missio).',
      norm: 'Art. 7/3 GG', status: 'open', cards: 3,
      subblocks: [
        { label: 'ReliU als ordentl. Lehrfach', cards: 1 },
        { label: '18-Lj-Schwelle Art. 137 BV', cards: 1 },
        { label: 'Ethik-Pflichtfach Art. 47 BayEUG', cards: 1 },
      ],
    },
    {
      id: 'A4', kuerzel: 'A.4', titel: 'Familien- und Sexualerziehung',
      anriss:
        'Art. 48 BayEUG: Aufgabe der Schule. Information der EB als Verfahrenspflicht (KMS), KEIN Vetorecht. Begriff bewusst nicht „Sexualkunde" — Erziehung, nicht Kunde. Verankerung in BV.',
      norm: 'Art. 48 BayEUG', status: 'open', cards: 2,
      subblocks: [
        { label: 'Aufgabe vs. Vetorecht', cards: 1 },
        { label: 'KMS-Informations-Pflicht', cards: 1 },
      ],
    },
    {
      id: 'A5', kuerzel: 'A.5', titel: 'JuSchG + Inklusion',
      anriss:
        '§ 1 JuSchG Drei Stufen Kind/Jugendl./EB. Schutz-Bereiche Alkohol/Nikotin/Gaststätten/Veranstaltungen. § 8a SGB VIII Kindeswohlgefährdung. Inklusion: Lernort = EB-Entscheidung Art. 41 BayEUG, mit Ausnahme Art. 30a/4 (Sehen/Hören/k.-m.: Sachaufwandsträger).',
      norm: '§ 1 JuSchG', status: 'open', cards: 3,
      subblocks: [
        { label: 'JuSchG Drei Stufen', cards: 1 },
        { label: 'Schutz-Bereiche §§ 4–13', cards: 1 },
        { label: 'Inklusion Art. 41 + 30a/4', cards: 1 },
      ],
    },
  ],

  glossar: {
    'Art. 4 GG': { titel: 'Art. 4 GG — Religionsfreiheit', wortlaut: 'Abs. 1: „Die Freiheit des Glaubens, des Gewissens und die Freiheit des religiösen und weltanschaulichen Bekenntnisses sind unverletzlich." Abs. 2: „Die ungestörte Religionsausübung wird gewährleistet." → Schranke für staatliche Einwirkung im ReliU-Kontext.', karten: [] },
    'Art. 6/2 GG': { titel: 'Art. 6 Abs. 2 GG — Elternrecht', wortlaut: '„Pflege und Erziehung der Kinder sind das natürliche Recht der Eltern und die zuvörderst ihnen obliegende Pflicht. Über ihre Betätigung wacht die staatliche Gemeinschaft." → Eltern-Vorrang, staatliches Wächteramt.', karten: [] },
    'Art. 7 GG': { titel: 'Art. 7 GG — Schulwesen', wortlaut: 'Abs. 1: „Das gesamte Schulwesen steht unter der Aufsicht des Staates." Abs. 3: „Religionsunterricht ist in den öffentlichen Schulen mit Ausnahme der bekenntnisfreien Schulen ordentliches Lehrfach." Abs. 4: Privatschulrecht.', karten: ['L04'] },
    'Art. 128 BV': { titel: 'Art. 128 BV — Bildungsanspruch', wortlaut: '„Jeder Bewohner Bayerns hat Anspruch darauf, eine seinen erkennbaren Fähigkeiten und seiner inneren Berufung entsprechende Ausbildung zu erhalten." Abs. 2: Begabte sind durch öffentliche Mittel zu fördern. → Verfassungs-Anker Inklusion + Förderung.', karten: ['L08'] },
    'Art. 131 BV': { titel: 'Art. 131 BV — Oberste Bildungsziele', wortlaut: 'Abs. 1: „Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch Herz und Charakter bilden." Abs. 2: Bildungsziele = Ehrfurcht vor Gott · Achtung religiöser Überzeugung · Würde des Menschen · Aufgeschlossenheit für Wahres+Gutes+Schönes · Verantwortungsbewusstsein Natur/Umwelt · Selbstbeherrschung · Verantwortungsgefühl · Hilfsbereitschaft · Heimatliebe · Völkerversöhnung · Demokratie. Abs. 3: Knaben und Mädchen sind in besonderem Maße im Geiste der Demokratie zu erziehen.', karten: ['L02', 'L03'] },
    'Art. 132 BV': { titel: 'Art. 132 BV — Anlagen- und Leistungs-Prinzip', wortlaut: '„Die Zulassung zu den verschiedenen Schulen und Hochschulen, die Erziehung und der Unterricht sind so zu regeln, dass ihre Inanspruchnahme für jeden Bewohner Bayerns nach Maßgabe seiner erkennbaren Anlagen und seiner inneren Berufung möglich ist." → Anker für Schulart-Wahl + Übertritt + M-Zug.', karten: [] },
    'Art. 135 BV': { titel: 'Art. 135 BV — Volksschule', wortlaut: 'Verfassungs-Anker der allgemeinen Schule. Gemeinsame Schule für alle volksschulpflichtigen Kinder. Hist. Anker der heutigen Grund- und Mittelschule.', karten: [] },
    'Art. 136 BV': { titel: 'Art. 136 BV — Religionsunterricht', wortlaut: 'Abs. 1: Bei Erziehung und Unterricht sind die religiösen Empfindungen aller zu achten. Abs. 2: Der Religionsunterricht ist ordentliches Lehrfach an allen Schulen. Bevollmächtigung der LK durch die Religionsgemeinschaften. Abs. 3: Niemand kann zur Erteilung von ReliU gezwungen werden. Schulräume sind bereitzustellen.', karten: ['L04', 'L05'] },
    'Art. 137 BV': { titel: 'Art. 137 BV — Teilnahme + Ethik', wortlaut: 'Abs. 1: „Über die Teilnahme am Religionsunterricht, kirchlichen Handlungen und Feierlichkeiten entscheiden bis zur Vollendung des 18. Lebensjahres die Erziehungsberechtigten des Schülers, danach er selbst." Abs. 2: „Ersatz für nicht besuchten Religionsunterricht ist ein Unterricht über anerkannte Grundsätze der Sittlichkeit." → Anker für Ethik-Pflichtfach.', karten: ['L05', 'FA04', 'FA05'] },
    'Art. 1 BayEUG': { titel: 'Art. 1 BayEUG — Bildungs- und Erziehungsauftrag', wortlaut: 'Abs. 1: Die Schulen haben den verfassungsmäßigen Auftrag, Wissen und Können zu vermitteln sowie Geist und Körper, Herz und Charakter zu bilden. Abs. 2: Oberste Bildungsziele (verfassungsverankert): Ehrfurcht vor Gott · Achtung religiöser Überzeugung · Würde des Menschen · Selbstbeherrschung · Verantwortungsgefühl + -bewusstsein · Hilfsbereitschaft · Aufgeschlossenheit für alles Wahre, Gute und Schöne · Verantwortungsbewusstsein für Natur und Umwelt. → Spiegelung BV Art. 131.', karten: ['L02', 'L03'] },
    'Art. 2 BayEUG': { titel: 'Art. 2 BayEUG — Aufgabenkatalog', wortlaut: 'Die Schulen haben insbesondere die Aufgabe: Kenntnisse + Fertigkeiten zu vermitteln · Fähigkeiten zu entwickeln · zu selbstständigem Urteil und eigenverantwortlichem Handeln zu befähigen · Kenntnisse von Geschichte/Kultur/Tradition Bayerns + Heimatliebe · überliefertes Bildungsgut · verantwortungsvoller Freiheitsgebrauch · Toleranz + friedliche Gesinnung · europäisches Bewusstsein · Völkerverständigung · freiheitlich-demokratischer + sozialer Rechtsstaat · Berufswelt-Vorbereitung · kulturelle + religiöse Werte · Rechte + Pflichten in Gesellschaft · Verantwortungsbewusstsein für Umwelt.', karten: ['L03'] },
    'Art. 30a BayEUG': { titel: 'Art. 30a BayEUG — Inklusiver Unterricht', wortlaut: 'Abs. 1: Inklusiver Unterricht ist Aufgabe aller Schulen. Abs. 3: Förderorte für SuS mit Förderbedarf — allgemeine Schule, Klassen mit festem LK-Tandem, FöS, sonstige Förderorte. Abs. 4: Lernort allgemeine Schule bei Förderschwerpunkten Sehen/Hören/körperlich-motorische Entwicklung — ZUSÄTZLICHE Zustimmung des Sachaufwandsträgers erforderlich (technisch-bauliche Voraussetzungen).', karten: ['L08'] },
    'Art. 41 BayEUG': { titel: 'Art. 41 BayEUG — Lernort + Schulwahl', wortlaut: 'Abs. 1: Eltern entscheiden über Lernort (allgemeine Schule oder Förderschule). Abs. 5: Bei einvernehmlichem Festlegen mit Schulen Empfehlung Förderschule, wenn dort der notwendige sonderpädagogische Förderbedarf gedeckt wird. Aktive Eltern-Entscheidung als Verfassungs-Spiegelung Art. 6/2 GG.', karten: ['L08', 'FA08'] },
    'Art. 46 BayEUG': { titel: 'Art. 46 BayEUG — Religionsunterricht', wortlaut: 'Abs. 1: ReliU = ordentliches Lehrfach (Spiegelung Art. 7/3 GG, Art. 136 BV). Abs. 2: LK bedarf religionspädagogischer Bevollmächtigung (kath.: Missio canonica; ev.: Vocatio). Konfessions-Bindung des Unterrichts.', karten: ['L04'] },
    'Art. 47 BayEUG': { titel: 'Art. 47 BayEUG — Ethikunterricht', wortlaut: '„Schülerinnen und Schüler, die nicht am Religionsunterricht teilnehmen, sind verpflichtet, am Unterricht im Fach Ethik teilzunehmen." Ethik = **Pflichtfach** für Nicht-ReliU-SuS. Inhalt: anerkannte Grundsätze der Sittlichkeit + werteinsichtiges Urteilen + Handeln.', karten: ['FA04'] },
    'Art. 48 BayEUG': { titel: 'Art. 48 BayEUG — Familien- + Sexualerziehung', wortlaut: 'Familien- und Sexualerziehung sind Aufgabe der Schule. Orientierung an den einschlägigen Vorgaben der BV. Information der Eltern erforderlich vor entspr. Unterrichtseinheiten — Verfahrenspflicht, kein Vetorecht. KMS regelt Details.', karten: ['L06', 'FA06'] },
    '§ 1 JuSchG': { titel: '§ 1 JuSchG — Begriffsbestimmungen', wortlaut: 'Abs. 1: (1) Kind ist, wer noch nicht 14 Jahre alt ist. (2) Jugendlicher ist, wer 14, aber noch nicht 18 Jahre alt ist. (3) Personensorgeberechtigte = Personen, denen allein oder gemeinsam Personensorge zusteht. (4) Erziehungsbeauftragte Person = jede über 18-Jährige, soweit ihr ein Personensorgeberechtigter Erziehungsaufgaben überträgt oder die sie im Rahmen einer Tätigkeit oder im Rahmen einer Gemeinschaft wahrnimmt.', karten: ['L07', 'FA07'] },
    '§ 8a SGB VIII': { titel: '§ 8a SGB VIII — Schutzauftrag bei Kindeswohlgefährdung', wortlaut: 'Werden dem Jugendamt gewichtige Anhaltspunkte für die Gefährdung des Wohls eines Kindes/Jugendlichen bekannt, so hat es das Gefährdungsrisiko im Zusammenwirken mehrerer Fachkräfte einzuschätzen. Bei Bedarf Hilfen anbieten. Bei Verdacht in der Schule: Meldepfad SL → Jugendamt.', karten: ['L07'] },
    'KMBek': { titel: 'KMBek — Bekanntmachung des Staatsministeriums für Unterricht und Kultus', wortlaut: 'Verwaltungsvorschrift; konkretisiert organisatorische Fragen. Bsp.: KMBek über Fahrten und Wanderungen, KMBek Lehrerfortbildung 09.08.2002 (Anpassung 08.2025). Rang: unter Rechtsverordnungen, kann diese nicht ändern.', karten: ['L01'] },
    'KMS': { titel: 'KMS — KM-Schreiben', wortlaut: 'Verwaltungsvorschrift, ranghöher als RS, aber unter KMBek; auslegend/Ermessen. Häufig zu Sexualerziehung, Datenschutz, aktuellen Konfliktfällen. Kann höherrangige Norm (BayEUG/VO) nicht verdrängen.', karten: ['L01', 'L06', 'FA01'] },
  },
};
