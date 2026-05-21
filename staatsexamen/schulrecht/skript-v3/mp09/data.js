// MP_09 — Schulaufsicht und Schulverwaltung
// PDF-Abschnitt 9 (Skript zum Schulrecht 2024 — Stephan Bauer):
//   Gliederung der Schulverwaltung · Aufgaben
window.MODULE = {
  id: 'mp09',
  zalgm: 'ZALGM § 16 Nr. 9',
  schwerpunkt: [
    '9.1 Verfassungs-Anker (Art. 7 GG + Art. 130 BV)',
    '9.2 Behörden-Pyramide (KM → Reg → SchA → Schule)',
    '9.3 Drei Aufsichtsarten (Fach/Dienst/Recht)',
    '9.4 Personalverwaltung',
    '9.5 Schulentwicklung + Aufsicht-Praxis',
  ],
  titel: 'Schulaufsicht',
  titel2: '+ Schulverwaltung.',
  abriss:
    'Staatliche Schulaufsicht (Art. 7/1 GG + Art. 130 BV). Bayern: ' +
    'KM (oberste) → Reg. v. Mfr/Ufr/Ofr/Schwaben/Nbay/Obay/Opf (mittlere) → ' +
    'Staatl. Schulämter (untere) → Schule. Drei Aufsichtsarten: ' +
    'Fach- / Dienst- / Rechtsaufsicht.',

  kurz: [
    'Verfassungs-Anker {{Art. 7/1 GG}} + {{Art. 130 BV}}: „Das gesamte Schulwesen steht unter der Aufsicht des Staates." Schulaufsicht = hoheitliche Funktion; nicht delegierbar an private Träger.',
    'Behörden-Pyramide Bayern: **(1)** Bayer. Staatsministerium für Unterricht und Kultus (**KM** = oberste Schulaufsichtsbehörde, {{Art. 111 BayEUG}}). **(2)** 7 Bezirksregierungen ({{Art. 112}}, mittlere Behörde, zuständig für GS/MS/RS/Gym/FöS auf Bezirksebene). **(3)** Staatliche Schulämter (untere Behörde, zuständig für **GS + MS + FöS** auf Landkreis-/kreisfreie-Stadt-Ebene). **(4)** Schule.',
    '**Drei Aufsichtsarten** ({{Art. 113 BayEUG}}): **Fachaufsicht** (Lehrpläne, U.-Inhalte, Pädagogik) · **Dienstaufsicht** (Personal, Beurteilung, Disziplinar) · **Rechtsaufsicht** (Gesetze, Verfahren, Akten). Jede Schulart hat ihre eigene Aufsichtskette.',
    '**Personalverwaltung**: LK-Einstellung + Versetzung + Beförderung durch Schulaufsichtsbehörden. An MS: i.d.R. **Staatl. Schulamt** (Klassen-LK + FL) bzw. Reg. (bei Beförderungs-Ämtern). BayLBG + LlbG als Anker.',
    '**Schulentwicklung**: KMBek-gesteuert; Externe Evaluation; Beratung durch Schulberatung der Reg. Aufsicht ≠ Mikromanagement — Selbstverantwortung der Schule wird betont ({{Art. 2}}).',
  ],

  deck: { cards: 8, normebenen: 5, hochprior: 8, fallen: 10 },

  kartografie: [
    { ebene: 'I', bez: 'Grundgesetz + Verfassung', kuerzel: 'GG/BV', normen: ['Art. 7/1 GG', 'Art. 130 BV'], sub: 'Staatliche Schulaufsicht — Bundes- + Landes-Anker' },
    { ebene: 'II', bez: 'BayEUG — Schulaufsicht', kuerzel: 'BayEUG', normen: ['Art. 111', 'Art. 112', 'Art. 113', 'Art. 114', 'Art. 115', 'Art. 116', 'Art. 117'], sub: 'KM (oberste) · Reg (mittlere) · Schulamt (untere) · Aufsichts-Arten · Aufsichts-Inhalte' },
    { ebene: 'III', bez: 'LDO + Geschäftsordnungen', kuerzel: 'VO', normen: ['LDO § 23', 'AGO'], sub: 'Schulleiter-Stellung · Allgemeine Geschäftsordnung' },
    { ebene: 'IV', bez: 'Beamten-/Personalrecht', kuerzel: 'BB', normen: ['BayBG', 'BayLBG', 'LlbG', 'BayDG'], sub: 'Beamtenstatus · Lehrerbildung · Laufbahn · Disziplinar' },
    { ebene: 'V', bez: 'Verwaltungsvorschriften', kuerzel: 'VV', normen: ['KMBek Schulaufsicht', 'KMBek Externe Evaluation'], sub: 'Steuerung + Qualitätssicherung' },
  ],

  pflichtwissen: [
    {
      id: 'V01', titel: 'Verfassungs-Anker Schulaufsicht',
      frage: 'Wo ist die staatliche Schulaufsicht verfassungsrechtlich verankert?',
      antwort: '**{{Art. 7/1 GG}}**: „Das gesamte Schulwesen steht unter der Aufsicht des Staates." Spiegelung **{{Art. 130 BV}}**. Folge: Schulaufsicht = **hoheitliche** Funktion; sie ist NICHT delegierbar an private Träger. Privatschulen dürfen errichtet werden (Art. 7/4 GG + Art. 134 BV), bleiben aber unter staatlicher Aufsicht.',
      norm: 'Art. 7/1 GG', status: 'open',
    },
    {
      id: 'V02', titel: 'Behörden-Pyramide Bayern',
      frage: 'Welche 3+1 Stufen hat die bayerische Schulverwaltung — und welche Schulart wird wo betreut?',
      antwort: '**(1) Oberste Behörde**: Bayer. Staatsministerium für Unterricht und Kultus (**KM** in München). **(2) Mittlere Behörden**: 7 **Bezirksregierungen** (Mfr · Ufr · Ofr · Schwaben · Niederbayern · Oberbayern · Oberpfalz) — zuständig für GS/MS/RS/Gym/FöS auf Bezirksebene. **(3) Untere Behörden**: **Staatliche Schulämter** (kreisfreie Stadt / Landkreis) — zuständig für **GS + MS + FöS**. RS/Gym werden i.d.R. direkt von der Reg. betreut. **(4) Schule**: Selbstverantwortung im Rahmen der Aufsicht.',
      norm: 'Art. 111 BayEUG', status: 'open',
    },
    {
      id: 'V03', titel: 'Drei Aufsichtsarten',
      frage: 'Welche drei Aufsichtsarten unterscheidet das Schulrecht — und welche Reichweite hat jede?',
      antwort: '**Fachaufsicht**: U.-Inhalte, Lehrpläne, pädagogische Qualität. Eingriffs-Recht in didaktische Entscheidungen (selten). **Dienstaufsicht**: Personal-Angelegenheiten, Beurteilung, Disziplinar. SL übt sie ggü. LK aus (§ 24 LDO); Reg./Schulamt ggü. SL. **Rechtsaufsicht**: Einhaltung von Gesetzen + Verfahren + Akten. Prüfung formaler Korrektheit. Verbindlich für alle Schulen.',
      norm: 'Art. 113 BayEUG', status: 'open',
    },
    {
      id: 'V04', titel: 'Staatliches Schulamt — Aufgaben',
      frage: 'Welche Aufgaben hat das Staatliche Schulamt?',
      antwort: 'Untere Schulaufsichtsbehörde für **GS + MS + FöS** im Landkreis / in der kreisfreien Stadt. Aufgaben: (1) **Schulaufsicht** über die nachgeordneten Schulen. (2) **Personalverwaltung** der LK (Einstellung, Versetzung, Vertretung, Beurteilung-Mitwirkung). (3) **Schulorganisation** (Klasseneinrichtung, Schulwege). (4) **Beratung** der Schulen. (5) **OWi-Verfahren** Schulpflicht (Art. 119). Leitung: **Schulrat:rätin** (i.d.R. ehemalige SL).',
      norm: 'Art. 112 BayEUG', status: 'open',
    },
    {
      id: 'V05', titel: 'Bezirksregierung — Aufgaben',
      frage: 'Welche Aufgaben hat die Bezirksregierung im Schulwesen?',
      antwort: 'Mittlere Schulaufsichtsbehörde. Zuständig auf Bezirks-Ebene für alle Schularten (GS/MS/RS/Gym/FöS), wobei GS/MS/FöS i.d.R. an Schulämter delegiert sind. Aufgaben: (1) **Fach-/Dienst-/Rechtsaufsicht** über RS + Gym direkt; über GS/MS/FöS mittelbar via Schulämter. (2) **Beförderungs-Personal** (SL, Konrektor:in, Beratungs-LK). (3) **Schulberatung** (Staatliche Schulberatungsstelle). (4) **Schulversuche + Modellprojekte**. (5) **Externe Evaluation** koordinieren.',
      norm: 'Art. 112 BayEUG', status: 'open',
    },
    {
      id: 'V06', titel: 'Kultusministerium — Aufgaben',
      frage: 'Welche Aufgaben hat das Staatsministerium für Unterricht und Kultus (KM)?',
      antwort: 'Oberste Schulaufsichtsbehörde. Aufgaben: (1) **Rechts-Setzung**: Lehrpläne · Schulordnungen · KMBek · KMS. (2) **Schulpolitik + Strategie**: Schulentwicklung, Personalpolitik, Investitionen. (3) **Aufsicht über mittlere + untere Behörden**. (4) **Bayerische Schul-Reform-Steuerung**. (5) **Internationale Bildungs-Beziehungen** (Anerkennung ausländischer Abschlüsse).',
      norm: 'Art. 111 BayEUG', status: 'open',
    },
    {
      id: 'V07', titel: 'Personalverwaltung LK — Wer macht was?',
      frage: 'Wer ist für Einstellung, Versetzung, Beförderung von MS-LK zuständig?',
      antwort: '**Einstellung MS-LK**: Bezirksregierung (Reg) → durch Schulamt vor Ort umgesetzt. **Versetzung**: Schulamt (innerhalb Schulamtsbezirks) oder Reg (zwischen Schulamtsbezirken). **Beförderung** (z.B. SL, Konrektor:in): Reg. **Disziplinar**: Reg bzw. KM je nach Schwere. Rechtsanker: **{{BayLBG}} + {{LlbG}}** + Geschäftsverteilung der Reg.',
      norm: 'BayLBG', status: 'open',
    },
    {
      id: 'V08', titel: 'Schulentwicklung + Externe Evaluation',
      frage: 'Wie wird Schulentwicklung von außen begleitet und gesteuert?',
      antwort: '**Externe Evaluation**: regelmäßige (i.d.R. 5-7-jährige) Besuche durch Reg.-Teams. Fokus auf U.-Qualität, Schulprogramm, Personalführung. Ergebnis: Bericht + Zielvereinbarung. **KMBek-Steuerung**: KM gibt Schwerpunkte vor (Digitalisierung, Inklusion, ndM-Förderung). **Schulinspektion**: Sonderform bei Auffälligkeiten. **Beratung Schulberatungsstelle der Reg.**: schulart-übergreifend (Cross-Ref MP_08 A.3).',
      norm: 'KMBek Externe Evaluation', status: 'open',
    },
  ],

  fallen: [
    { id: 'FA01', frage: 'Das Schulamt ist für RS + Gym zuständig?', antwort: 'NEIN. Staatliches Schulamt = **GS + MS + FöS**. RS + Gym direkt unter Bezirksregierung.' },
    { id: 'FA02', frage: 'Schulaufsicht kann an Privatträger delegiert werden?', antwort: 'NEIN. {{Art. 7/1 GG}}: hoheitliche Funktion. Privatschulen werden vom Staat aufsichtlich begleitet, nicht ersetzt.' },
    { id: 'FA03', frage: 'Es gibt 6 Bezirksregierungen in Bayern?', antwort: 'NEIN. **7 Bezirke**: Mittelfranken · Unterfranken · Oberfranken · Schwaben · Niederbayern · Oberbayern · Oberpfalz.' },
    { id: 'FA04', frage: 'Fachaufsicht und Dienstaufsicht sind identisch?', antwort: 'NEIN. **Fach** = U.-Inhalte/Pädagogik. **Dienst** = Personal/Beurteilung. **Recht** = Gesetze/Verfahren. Drei Arten.' },
    { id: 'FA05', frage: 'Schulrat:rätin ist Behörde?', antwort: 'TEILWEISE. Schulrat:rätin **leitet** das Staatliche Schulamt; das Schulamt ist die Behörde.' },
    { id: 'FA06', frage: 'KM trifft alle Personal-Entscheidungen direkt?', antwort: 'NEIN. KM rechtssetzt; **Personalverwaltung** läuft über Reg + Schulamt (Geschäftsverteilung).' },
    { id: 'FA07', frage: 'Externe Evaluation ist jedes SJ Pflicht?', antwort: 'NEIN. **5-7-jährig** in der Regel. Sonderform Schulinspektion bei Auffälligkeit.' },
    { id: 'FA08', frage: 'OM-Antrag Schulzwang stellt die LK direkt bei der Kreisverwaltung?', antwort: 'NEIN. {{Art. 118}}: Antrag der **Schule** (i.d.R. über SL). LK informiert SL, nicht Behörde direkt.' },
    { id: 'FA09', frage: 'Schulaufsicht ist auch Schulträgerschaft?', antwort: 'NEIN. **Schulaufsicht** = hoheitliche Aufsicht (Staat). **Sachaufwandsträgerschaft** = Bau + Sachmittel (i.d.R. Gemeinde/Landkreis). Zwei verschiedene Hüte.' },
    { id: 'FA10', frage: 'Lehrpläne werden von der Schule selbst beschlossen?', antwort: 'NEIN. Lehrpläne sind **KMBek** (KM-Verwaltungsvorschrift). Schule konkretisiert in **schulinternem Curriculum** + Stoffverteilungsplan, aber nicht abweichend.' },
  ],

  faelle: [
    {
      id: 'F1',
      titel: 'OWi-Anzeige nach 4 Wochen Schul-Schwänzen',
      sachverhalt: 'Eine Schülerin (Jgst. 8 MS) fehlt seit 4 Wochen ohne Entschuldigung. Eltern reagieren nicht auf Briefe. SL fragt: „Was jetzt?"',
      knackpunkte: [
        '{{Art. 76 BayEUG}}: EB-Pflichten verletzt. § 20 BaySchO Meldepflicht ebenfalls.',
        '**OWi-Anzeige** {{Art. 119}}: durch SL an Kreisverwaltungsbehörde — Geldbuße bis 1.000 €.',
        'Parallel **Schulamt** informieren: untere Aufsichtsbehörde unterstützt + dokumentiert.',
        'Bei Beharrlichkeit: **Schulzwang** {{Art. 118}} — Antrag durch SL bei Kreisverwaltung; polizeiliche Zuführung.',
        '§ 8a SGB VIII Kindeswohl: Jugendamt einbeziehen (gleichzeitig mit OWi).',
      ],
      antwortkette: 'Eltern-Anhörung + Mahnung + Schulpsych → bei Nicht-Reaktion OWi-Anzeige Art. 119 → Schulamt-Information → Jugendamt § 8a SGB VIII → bei Fortsetzung Schulzwang Art. 118.',
    },
    {
      id: 'F2',
      titel: 'Schulinspektion meldet pädagogische Auffälligkeit',
      sachverhalt: 'Die externe Evaluation hat in einer 6. Klasse häufige U.-Ausfälle + Disziplin-Probleme festgestellt. Die Reg. will weitere Maßnahmen.',
      knackpunkte: [
        '**Fachaufsicht** {{Art. 113}}: Reg. kann pädagogische Vorgaben machen (Stundenpläne, Methodik-Beratung).',
        'Externe Evaluations-Bericht → **Zielvereinbarung** SL ↔ Reg.',
        'Schulamt unterstützt operativ (Schulrat:rätin-Besuche, KL-Konferenzen, MSD).',
        'Personal-Konsequenzen (Versetzung, Disziplinar) nur bei nachgewiesenem Personal-Defizit.',
        'Schulberatungsstelle der Reg.: Coaching der SL + KL.',
      ],
      antwortkette: 'Evaluations-Bericht analysieren → Zielvereinbarung erarbeiten → operative Schritte SL + Schulamt → Beratung Schulberatungsstelle → ggf. MSD-Einsatz für Schüler-Förderung → Folge-Evaluation in 2 J.',
    },
    {
      id: 'F3',
      titel: 'LK-Versetzung gegen den Willen',
      sachverhalt: 'Eine LK wird vom Schulamt zur Versetzung an eine andere MS aufgefordert (Schul-Strukturmaßnahme). Sie widerspricht.',
      knackpunkte: [
        '**Dienstaufsicht** {{Art. 113}}: Schulamt ist Dienstvorgesetzte → Versetzungs-Befugnis innerhalb Schulamtsbezirk.',
        'Rechts-Anker: {{BayLBG}} + {{LlbG}} + Beamtenstatus (Treuepflicht).',
        '**Personalvertretung** ({{Art. 75 BayPVG}}): Mitbestimmungs-Recht — Versetzung ohne Personalrats-Zustimmung unwirksam.',
        '**Widerspruchs-Weg**: Widerspruch beim Schulamt → bei Ablehnung Verwaltungsklage VG.',
        'Bei sozialen Härtegründen: einzelfallbezogene Berücksichtigung; ggf. Kompromiss-Lösungen.',
      ],
      antwortkette: 'LK-Widerspruch beim Schulamt einlegen → Personalrats-Anhörung prüfen → soziale Härtegründe darlegen → bei Ablehnung Verwaltungsklage VG → Mediation durch Schulberatung.',
    },
    {
      id: 'F4',
      titel: 'KMBek-Konflikt — Lehrplan vs. Schul-Profil',
      sachverhalt: 'Eine MS möchte ein Schul-Profil „MINT+" einführen, das vom KMBek-Stundenplan abweicht. Wer entscheidet?',
      knackpunkte: [
        '**Lehrplan = KMBek**: bindend, nicht abweichbar im Pflicht-Bereich.',
        '**Wahl-Bereich**: Schule kann Schul-Profil setzen (AGs, Wahlpflichtfächer) — im Rahmen der Stundentafel.',
        '**Schulversuch**: bei größerer Abweichung — Antrag bei KM über Reg.',
        '**Schulforum** {{Art. 69}}: Beratungs-Mitwirkung bei Profilbildung.',
        'Entscheidung: SL + Lehrerkonferenz + Schulforum + Reg-Zustimmung bei Schulversuch.',
      ],
      antwortkette: 'Lehrplan-Vorgabe prüfen → im Wahl-Bereich Profil-Setzung möglich → Schulforum-Beratung → bei größerer Abweichung Schulversuchs-Antrag bei KM via Reg → Entscheidung.',
    },
  ],

  vertiefung: [
    {
      id: 'A1', kuerzel: 'A.1', titel: 'Verfassungs-Anker Schulaufsicht',
      anriss: '{{Art. 7/1 GG}}: „Das gesamte Schulwesen steht unter der Aufsicht des Staates." Spiegelung {{Art. 130 BV}}. Schulaufsicht = hoheitliche Funktion; nicht delegierbar. Privatschulen Art. 7/4 GG + Art. 134 BV bleiben unter Aufsicht.',
      norm: 'Art. 7/1 GG', status: 'open', cards: 2,
      subblocks: [
        { label: 'Art. 7 GG verbatim', cards: 1 },
        { label: 'Art. 130 BV + Privatschulen', cards: 1 },
      ],
    },
    {
      id: 'A2', kuerzel: 'A.2', titel: 'Behörden-Pyramide Bayern',
      anriss: 'Vier Stufen: **(1) KM** (oberste) → **(2) 7 Bezirksregierungen** (mittlere) → **(3) Staatl. Schulämter** (untere, für GS/MS/FöS) → **(4) Schule**. RS+Gym direkt unter Reg. Schulamts-Leitung = Schulrat:rätin.',
      norm: 'Art. 111 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: 'KM = oberste Behörde', cards: 1 },
        { label: '7 Bezirksregierungen', cards: 1 },
        { label: 'Staatl. Schulamt — GS/MS/FöS', cards: 1 },
      ],
    },
    {
      id: 'A3', kuerzel: 'A.3', titel: 'Drei Aufsichtsarten',
      anriss: '{{Art. 113}}: **Fachaufsicht** (U.-Inhalte, Lehrpläne) · **Dienstaufsicht** (Personal, Beurteilung, Disziplinar) · **Rechtsaufsicht** (Gesetze, Verfahren, Akten). Jede Aufsichtsbehörde übt alle drei Arten aus.',
      norm: 'Art. 113 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: 'Fachaufsicht', cards: 1 },
        { label: 'Dienstaufsicht', cards: 1 },
        { label: 'Rechtsaufsicht', cards: 1 },
      ],
    },
    {
      id: 'A4', kuerzel: 'A.4', titel: 'Personalverwaltung',
      anriss: 'Einstellung LK = Reg (durch Schulamt umgesetzt). Versetzung = Schulamt (intern) / Reg (übergreifend). Beförderung (SL, Konrektor:in) = Reg. Anker {{BayLBG}} + {{LlbG}}. Personalvertretung {{Art. 75 BayPVG}} mitbestimmend.',
      norm: 'BayLBG', status: 'open', cards: 3,
      subblocks: [
        { label: 'Einstellung + Versetzung', cards: 1 },
        { label: 'Beförderung', cards: 1 },
        { label: 'Personalvertretung', cards: 1 },
      ],
    },
    {
      id: 'A5', kuerzel: 'A.5', titel: 'Schulentwicklung + Aufsicht-Praxis',
      anriss: 'Externe Evaluation 5-7-jährig durch Reg-Teams. Zielvereinbarungen + Folge-Evaluation. Schulinspektion bei Auffälligkeit. KMBek-Steuerung Schwerpunkte (Digitalisierung, Inklusion). Beratung Schulberatungsstelle Reg.',
      norm: 'KMBek Externe Evaluation', status: 'open', cards: 2,
      subblocks: [
        { label: 'Externe Evaluation', cards: 1 },
        { label: 'KMBek-Steuerung + Beratung', cards: 1 },
      ],
    },
  ],

  glossar: {
    'Art. 7/1 GG': { titel: 'Art. 7/1 GG — Staatliche Schulaufsicht', wortlaut: '„Das gesamte Schulwesen steht unter der Aufsicht des Staates." Verfassungs-Bundes-Anker; hoheitliche Funktion; nicht delegierbar.', karten: ['V01'] },
    'Art. 130 BV': { titel: 'Art. 130 BV — Schulaufsicht Bayern', wortlaut: 'Bayerische Spiegelung Art. 7/1 GG. Schulaufsicht durch bayerische Behörden — Staatsministerium für Unterricht und Kultus + nachgeordnete Behörden.', karten: ['V01'] },
    'Art. 111 BayEUG': { titel: 'Art. 111 BayEUG — KM (oberste Behörde)', wortlaut: 'Bayer. Staatsministerium für Unterricht und Kultus ist oberste Schulaufsichtsbehörde. Rechts-Setzung (Lehrpläne, Schulordnungen, KMBek, KMS). Strategische Schulpolitik.', karten: ['V02', 'V06'] },
    'Art. 112 BayEUG': { titel: 'Art. 112 BayEUG — Mittlere + untere Behörden', wortlaut: '**Mittlere Behörden**: 7 Bezirksregierungen (Mittelfranken · Unterfranken · Oberfranken · Schwaben · Niederbayern · Oberbayern · Oberpfalz). **Untere Behörden**: Staatliche Schulämter (kreisfreie Stadt / Landkreis) für GS + MS + FöS. RS+Gym direkt unter Reg.', karten: ['V02', 'V04', 'V05'] },
    'Art. 113 BayEUG': { titel: 'Art. 113 BayEUG — Aufgaben Schulaufsicht', wortlaut: 'Drei Aufsichtsarten: **Fachaufsicht** (U.-Inhalte, Lehrpläne, pädagogische Qualität) · **Dienstaufsicht** (Personal, Beurteilung, Disziplinar) · **Rechtsaufsicht** (Gesetze, Verfahren, Akten).', karten: ['V03'] },
    'Art. 114 BayEUG': { titel: 'Art. 114 BayEUG — Schulträgerschaft', wortlaut: 'Schulträgerschaft (Sachaufwand): Gemeinde / Landkreis / Schulverband. Abgrenzung zur Schulaufsicht: Sachaufwand ≠ Aufsicht. Gemeinde stellt Schulgebäude + Sachmittel, Staat stellt LK.', karten: ['FA09'] },
    'Art. 115 BayEUG': { titel: 'Art. 115 BayEUG — Schulleitung', wortlaut: 'Schulleitung als Bindeglied Aufsichtsbehörde ↔ Schule. SL untersteht Dienstaufsicht des Schulamts (MS) bzw. der Reg (RS/Gym). Spiegelung Art. 57.', karten: [] },
    'Art. 116 BayEUG': { titel: 'Art. 116 BayEUG — Verfahren bei Aufsicht', wortlaut: 'Verfahrensgrundsätze bei Aufsichtsmaßnahmen. Anhörungspflicht der Schule. Schriftform für förmliche Maßnahmen. Widerspruchs-Möglichkeit.', karten: [] },
    'Art. 117 BayEUG': { titel: 'Art. 117 BayEUG — Berichtspflicht', wortlaut: 'Schulen sind verpflichtet, der Schulaufsicht über wesentliche Vorgänge zu berichten (Zwischenfälle, Statistik, Schul-Entwicklung).', karten: [] },
    'Art. 75 BayPVG': { titel: 'Art. 75 BayPVG — Mitbestimmung Personalvertretung', wortlaut: 'Personalrat hat Mitbestimmungsrecht bei Einstellung, Versetzung, Beförderung. Zustimmung erforderlich — sonst Maßnahme unwirksam.', karten: [] },
    'BayLBG': { titel: 'BayLBG — Bayerisches Lehrerbildungsgesetz', wortlaut: 'Regelt die Ausbildung der LK an bayerischen Schulen. 1. + 2. Staatsexamen. Lehramt-Studium + Vorbereitungsdienst (Referendariat). LK-Fortbildungspflicht Art. 20.', karten: ['V07'] },
    'LlbG': { titel: 'LlbG — Leistungslaufbahngesetz', wortlaut: 'Bayerisches Gesetz über die Leistungslaufbahn. Regelt Beförderung, Beurteilung, Wechsel der Laufbahn. Anker für LK-Karriere (z.B. Beförderung zu SL).', karten: ['V07'] },
    'BayBG': { titel: 'BayBG — Bayerisches Beamtengesetz', wortlaut: 'Anker für Beamtenstatus der LK in Bayern. Rechte + Pflichten ergänzend zum BeamtStG (Bund). Treuepflicht, Versorgung.', karten: [] },
    'BayDG': { titel: 'BayDG — Bayerisches Disziplinargesetz', wortlaut: 'Regelt das Disziplinarverfahren bei Dienstvergehen. 5 Stufen Lebenszeitbeamte: Verweis · Geldbuße · Kürzung Dienstbezüge · Zurückstufung · Entfernung. 2 Stufen Ruhestand: Kürzung Ruhegehalt · Aberkennung.', karten: [] },
    'AGO': { titel: 'AGO — Allgemeine Geschäftsordnung', wortlaut: 'Regelt die Geschäftsbearbeitung in der bayerischen Verwaltung — auch Schulverwaltung. Akten-Führung, Schriftverkehr, Fristen.', karten: [] },
    'KMBek Schulaufsicht': { titel: 'KMBek Schulaufsicht', wortlaut: 'Verwaltungsvorschriften des KM zur Konkretisierung der Aufsichtsarbeit. Inspektions-Verfahren, Berichtspflichten, Personal-Verwaltung.', karten: [] },
    'KMBek Externe Evaluation': { titel: 'KMBek Externe Evaluation', wortlaut: 'KMBek zur regelmäßigen externen Evaluation an bayerischen Schulen. 5-7-jähriger Rhythmus. Reg-Teams. Bericht + Zielvereinbarung + Folge-Evaluation.', karten: ['V08'] },
  },
};
