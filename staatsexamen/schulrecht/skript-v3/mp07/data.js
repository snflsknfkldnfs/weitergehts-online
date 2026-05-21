// MP_07 — Kooperation Schule + Erziehungsberechtigte
// PDF-Abschnitt 7 (Skript zum Schulrecht 2024 — Stephan Bauer):
//   Einrichtungen der Elternvertretung · Schulforum · Pflichten der Erziehungsbeauftragten
window.MODULE = {
  id: 'mp07',
  zalgm: 'ZALGM § 16 Nr. 7',
  schwerpunkt: [
    '7.1 Klassenelternsprecher',
    '7.2 Elternbeirat (Wahl + Aufgaben)',
    '7.3 Schulforum',
    '7.4 EB-Pflichten (Art. 76)',
    '7.5 EB-Mitwirkung im Beschwerdeweg',
  ],
  titel: 'Kooperation Schule',
  titel2: '+ Erziehungsberechtigte.',
  abriss:
    'Drei-Ebenen-Verbund: Klasse (Klassenelternsprecher · Art. 64) → Schule ' +
    '(Elternbeirat · Art. 65-67) → Schul-Gesamt-Forum (Art. 69). EB-Pflichten ' +
    '"achten auf" + "unterstützen" (Art. 76). Mitwirkung in Beschwerdeweg Art. 56/5.',

  kurz: [
    '**Klassenelternsprecher** ({{Art. 64 BayEUG}}): wird zu Beginn des SJ von den EB der Klasse gewählt. Bindeglied EB ↔ KL. Beratung in klasseninternen Angelegenheiten.',
    '**Elternbeirat** ({{Art. 65-67 BayEUG}}): Vertreter aller EB der Schule. Wahl alle 2 Jahre. Vorsitzende:r vertritt nach außen. Beratendes Organ + Anhörungsrecht in wesentlichen Schulangelegenheiten.',
    '**Schulforum** ({{Art. 69 BayEUG}}): Bindeglied EB ↔ SL ↔ SMV ↔ Schulträger ↔ LK. Vorsitz SL. **Abs. 4 Einvernehmens-Befugnis** für Hausordnung + Pausenordnung + Grundsätze schul. Veranstaltungen. Im Übrigen Beratung Schulleben + Schulentwicklung. Bei OM-Beschwerde: Eskalations-Stufe nach Art. 56/5.',
    '**EB-Pflichten** {{Art. 76 BayEUG}}: zwei Pflichten — „**auf den regelmäßigen Schulbesuch zu achten**" + „**die Erziehungsarbeit der Schule zu unterstützen**". Ergänzt von § 20 BaySchO Meldepflicht bei Verhinderung.',
    'EB-Mitwirkung in Beschwerdeweg {{Art. 56}}/5: nacheinander LK → SL → Schulforum. Bei Unzufriedenheit mit OM: Widerspruch + Anrufung Schulaufsicht. Eltern haben Anhörungsrecht ({{Art. 88}}).',
  ],

  deck: { cards: 8, normebenen: 5, hochprior: 8, fallen: 10 },

  kartografie: [
    { ebene: 'I', bez: 'Grundgesetz + Verfassung', kuerzel: 'GG/BV', normen: ['Art. 6/2 GG', 'Art. 7 GG', 'Art. 126 BV'], sub: 'Elternrecht · Staatliche Schulaufsicht · Familie' },
    { ebene: 'II', bez: 'BayEUG — Elternvertretung', kuerzel: 'BayEUG', normen: ['Art. 64', 'Art. 65', 'Art. 66', 'Art. 67', 'Art. 69', 'Art. 76', 'Art. 88'], sub: 'Klassenelternsprecher · Elternbeirat · Schulforum · EB-Pflichten · Anhörung' },
    { ebene: 'III', bez: 'BayEUG — Beschwerde + Berufungswege', kuerzel: 'BayEUG', normen: ['Art. 56/5', 'Art. 75', 'Art. 78', 'Art. 113', 'Art. 119'], sub: 'Beschwerdeweg · EB-Auskunft · Beratung · Schulaufsichtsbeschwerde · OWi' },
    { ebene: 'IV', bez: 'Schulordnungen', kuerzel: 'VO', normen: ['§ 20 BaySchO', '§ 25 BaySchO', '§ 26 BaySchO', '§ 6 LDO'], sub: 'Meldepflicht · Elternbriefe · Sprechstunden · KL-Aufgaben' },
    { ebene: 'V', bez: 'Bürgerliches Recht', kuerzel: 'BGB', normen: ['§§ 1626 BGB', '§ 1631 BGB', '§ 1684 BGB'], sub: 'Personensorge · Erziehung · Umgangsrecht (bei Getrenntlebenden)' },
  ],

  pflichtwissen: [
    {
      id: 'E01', titel: 'Klassenelternsprecher — Wahl + Funktion',
      frage: 'Wie wird der/die Klassenelternsprecher:in gewählt — und welche Funktion hat sie/er?',
      antwort: '{{Art. 64 BayEUG}}: Wahl zu Beginn des SJ durch die **EB der Klasse**. **Bindeglied** EB ↔ KL ↔ SL. Aufgaben: Information der EB der Klasse · Bündelung von Anliegen · Mitwirkung an Klassenelternabenden · Vermittlung bei Konflikten zwischen EB und LK. KEIN Beschluss-Organ — Beratungs- und Vermittlungs-Funktion.',
      norm: 'Art. 64 BayEUG', status: 'open',
    },
    {
      id: 'E02', titel: 'Elternbeirat — Wahl + Amtszeit',
      frage: 'Wie ist der Elternbeirat konstituiert?',
      antwort: '{{Art. 65 BayEUG}}: Vertreter aller EB der Schule. **Wahl alle 2 Schuljahre** (in den ersten 6 Wochen). Wahlberechtigt: alle EB der Schule. **Schulart-spezifischer Schlüssel** der Mitgliederzahl: **GS/MS/FöS = 1 EB-Mitglied pro 15 SuS-Eltern**, **RS/Gym/FOS/BOS = 1 pro 50**. An MS typisch 5–12 Mitglieder (je nach Schulgröße). **Vorsitzende:r** wird aus der Mitte gewählt; vertritt EB nach außen.',
      norm: 'Art. 65 BayEUG', status: 'open',
    },
    {
      id: 'E03', titel: 'Elternbeirat — Aufgaben Art. 67',
      frage: 'Welche Aufgaben hat der Elternbeirat?',
      antwort: '{{Art. 67 BayEUG}}: (1) **Förderung der Zusammenarbeit** Schule ↔ EB. (2) **Beratungsrecht** bei wesentlichen Schulangelegenheiten. (3) **Anhörungsrecht** vor Entscheidungen, die die Schule wesentlich betreffen (Schul-Vereinbarung, Stundenplan-Grundsätze). (4) **Beschwerde-Anrufung**: kann Schulforum und SL einschalten. (5) Mitwirkung in Schulpartner-Foren. Keine eigene Entscheidungskompetenz über U.-Inhalte.',
      norm: 'Art. 67 BayEUG', status: 'open',
    },
    {
      id: 'E04', titel: 'Schulforum — Zusammensetzung',
      frage: 'Wer sitzt im Schulforum — und welche Funktion hat es?',
      antwort: '{{Art. 69 BayEUG}}: an MS Mitglieder = **SL (Vorsitz)** + **Elternbeirat-Vertretung** (mind. 2) + **SMV-Vertretung** (mind. 1, je nach Schule) + **Schulträger-Vertretung** + **bis 2 LK** (gewählt von der Lehrerkonferenz). **Funktion**: (1) **Einvernehmens-Befugnis Abs. 4**: Hausordnung + Pausenordnung + Grundsätze schulischer Veranstaltungen — Schule kann diese Akte nicht gegen Schulforum-Veto erlassen. (2) Beratung Schulleben + Schulentwicklung + Bildungsangebot. (3) Anhörung bei wesentlichen Veränderungen. **KEIN** Beschluss-Organ über Personal/Noten/U.-Inhalte.',
      norm: 'Art. 69 BayEUG', status: 'open',
    },
    {
      id: 'E05', titel: 'EB-Pflichten Art. 76 — Zwei Pflichten',
      frage: 'Welche zwei Pflichten hat das EB-Elternpaar nach Art. 76 BayEUG — wortlautgetreu?',
      antwort: 'Verbatim {{Art. 76 BayEUG}}: EB haben **(1) „auf den regelmäßigen Schulbesuch des Kindes zu achten"** + **(2) „die Erziehungsarbeit der Schule zu unterstützen"**. Achten ≠ erzwingen (keine Polizei-Pflicht), aber aktive Überwachung. Unterstützen = positive Mitarbeit, nicht nur Nicht-Stören.',
      norm: 'Art. 76 BayEUG', status: 'open',
    },
    {
      id: 'E06', titel: '§ 20 BaySchO — Meldepflicht',
      frage: 'Welche Meldepflicht haben EB bei Schulversäumnis?',
      antwort: '{{§ 20 BaySchO}}: EB müssen die Schule bei Verhinderung des Kindes **unverzüglich** (Krankheit, Notfall) informieren — i.d.R. **vor Unterrichtsbeginn am Krankheitstag**. **Schriftliche Mitteilung** nachreichen. Bei längerer Krankheit (>3 Tage): **schulärztliches Zeugnis** kann verlangt werden (SL-Ermessen). Nicht-Meldung = OWi-fähig nach {{Art. 119}} BayEUG.',
      norm: '§ 20 BaySchO', status: 'open',
    },
    {
      id: 'E07', titel: 'Beschwerdeweg + EB-Mitwirkung',
      frage: 'Welche EB-Rolle hat der Beschwerdeweg nach Art. 56/5 BayEUG?',
      antwort: '{{Art. 56}}/5 verbatim: **nacheinander** LK → SL → Schulforum (nicht parallel). EB wirken auf der dritten Stufe (Schulforum) mit. Bei OM-Anhörung {{Art. 88}}: EB sind rechtzeitig zu informieren + können teilnehmen. Bei OM-Widerspruch: Verwaltungsgerichtlicher Weg möglich (Schulaufsicht → Verwaltungsklage).',
      norm: 'Art. 56/5 BayEUG', status: 'open',
    },
    {
      id: 'E08', titel: 'Personensorge + Schule (BGB)',
      frage: 'Wie verhalten sich Personensorge nach BGB und schulrechtliche EB-Stellung?',
      antwort: '{{§ 1626 BGB}}: Personensorge = elterliches Recht + Pflicht. Bei verheirateten EB: **beide** sorgeberechtigt — Schule darf an beide Auskunft erteilen. Bei getrenntlebenden: i.d.R. weiterhin **gemeinsam**, sofern nicht gerichtlich anders geregelt. Bei alleiniger Sorge: Auskunft nur an Sorgeberechtigte:n. **Erziehungsbeauftragte** ({{§ 1 JuSchG}} Nr. 4) können nicht entscheiden, nur ad-hoc-Aufsicht übernehmen.',
      norm: '§§ 1626 BGB', status: 'open',
    },
  ],

  fallen: [
    { id: 'FA01', frage: 'Elternbeirat hat Entscheidungs-Kompetenz über Stundenpläne?', antwort: 'NEIN. {{Art. 67}}: nur **Beratungs-** + **Anhörungsrecht**. Entscheidung bleibt bei SL/Lehrerkonferenz/Schulaufsicht.' },
    { id: 'FA02', frage: 'Schulforum entscheidet über OM?', antwort: 'NEIN. {{Art. 69}}: primär beratendes Gremium. OM-Entscheidung bei SL ({{Art. 86/2}} Nr. 5) oder Lehrerkonferenz (Nr. 6, 9, 10, 11). ABER: Schulforum hat **Einvernehmens-Befugnis Art. 69 Abs. 4** bei Hausordnung + Pausenordnung — das ist mehr als Beratung.' },
    { id: 'FA03', frage: 'Klassenelternsprecher wählt die SMV?', antwort: 'NEIN. Klassenelternsprecher = EB-Wahl. SMV (Schülersprecher, Schülerrat) wird von SuS gewählt — getrennte Systeme.' },
    { id: 'FA04', frage: 'EB dürfen jederzeit U. besuchen?', antwort: 'NEIN. Nur mit Zustimmung der LK (und i.d.R. SL-Information). Hausrecht {{§ 27 LDO}} liegt bei SL.' },
    { id: 'FA05', frage: 'Art. 76 verlangt Erziehung im Sinne der Schule?', antwort: 'TEILWEISE. „Unterstützen der Erziehungsarbeit" — Eltern bleiben primär Erzieher (Art. 6/2 GG); Schule hat eigenen Bildungs-/Erziehungsauftrag. Subsidiäre Unterstützung, keine Vorherrschaft Schule.' },
    { id: 'FA06', frage: '„Achten auf" = "polizeilich überwachen"?', antwort: 'NEIN. {{Art. 76}}: aktive Überwachung, kein Polizeirecht. Bei Schulpflicht-Verstößen: Art. 119 OWi durch Schule.' },
    { id: 'FA07', frage: 'Elternbeirats-Wahl jedes Jahr?', antwort: 'NEIN. **Alle 2 Schuljahre** ({{Art. 65}}). Klassenelternsprecher dagegen: jährlich.' },
    { id: 'FA08', frage: 'Verteilung der Schülerzeitung muss vom Elternbeirat genehmigt werden?', antwort: 'NEIN. Schülerzeitung: bei SMV-Modus SL-Untersagung möglich; bei Druckwerk-Modus Eltern-Haftung (Art. 63 BayEUG, → mp05).' },
    { id: 'FA09', frage: 'EB dürfen vor OM-Beschluss in den Klassenrat?', antwort: 'NEIN. EB sind bei {{Art. 88}}-Anhörung beteiligt (Anhörungsrecht), nicht im LK-Beschluss-Gremium. Klassenkonferenz = nur LK.' },
    { id: 'FA10', frage: 'Allein bei alleiniger Personensorge muss Schule beide EB informieren?', antwort: 'NEIN. {{§ 1626 BGB}}: bei alleiniger Sorge nur Sorgeberechtigte:r. Andere Elternteil kann nach {{§ 1686 BGB}} Auskunft verlangen — aber Schule beachtet die Sorgerechts-Lage.' },
    { id: 'FA11', frage: 'Elternbeirats-Mitglieder-Zahl ist überall gleich?', antwort: 'NEIN. **Schulart-spezifischer Schlüssel**: GS/MS/FöS = 1 EB pro 15 SuS-Eltern (engerer Schlüssel — kleinere Schulen, stärkere EB-Präsenz). RS/Gym/FOS/BOS = 1 pro 50. An MS i.d.R. 5-12 Mitglieder.' },
    { id: 'FA12', frage: 'Erziehungsberechtigte und Erziehungsbeauftragte sind synonym?', antwort: 'NEIN. **Erziehungsberechtigte** ({{Art. 76 BayEUG}}) = Eltern bzw. sorgeberechtigte Personen (Personensorge nach {{§ 1626 BGB}}) — dauerhafte schulrechtliche Stellung. **Erziehungsbeauftragte** ({{§ 1 JuSchG}} Nr. 4) = über-18-Jährige, denen sorgeberechtigte Personen ad-hoc Erziehungsaufgaben übertragen (Klassenfahrt-Begleitung, Geschwister bei Veranstaltung). Zwei verschiedene Institute — Mp07 = Erziehungsberechtigte; Erziehungsbeauftragte siehe MP_01 L07 + MP_03 F4 (Klassenfahrt-Alkohol).' },
  ],

  faelle: [
    {
      id: 'F1',
      titel: 'Klassen-Konflikt — Klassenelternsprecher als Mediator',
      sachverhalt: 'Eine Klasse hat seit Wochen Konflikt mit der Mathe-LK. Eltern beschweren sich beim Klassenelternsprecher.',
      knackpunkte: [
        '{{Art. 64}}: Klassenelternsprecher = Bindeglied + Vermittler, KEIN Beschwerde-Empfänger.',
        'Beschwerdeweg {{Art. 56}}/5: nacheinander LK → SL → Schulforum. Klassenelternsprecher kann moderieren, nicht entscheiden.',
        'Erste Stufe: KL-Gespräch + Mathe-LK-Gespräch (Klassenelternsprecher als Begleitung).',
        'Eskalation: SL einschalten; bei systemischen Konflikt Schulforum.',
      ],
      antwortkette: 'Klassenelternsprecher moderiert KL-Mathe-LK-Gespräch → LK-Stellungnahme → bei Fortbestehen SL → bei systemischem Konflikt Schulforum.',
    },
    {
      id: 'F2',
      titel: 'EB-Schulverweigerung — Eskalations-Kette',
      sachverhalt: 'EB melden ihren Sohn (Jgst. 7 MS) wiederholt nicht ab; er fehlt mehrfach pro Woche. KL ruft an, EB ignorieren.',
      knackpunkte: [
        '{{Art. 76}} BayEUG: „auf den regelmäßigen Schulbesuch zu achten" — Pflicht verletzt.',
        '{{§ 20 BaySchO}}: Meldepflicht bei Verhinderung — Verstoß.',
        '{{Art. 119 BayEUG}}: Ordnungswidrigkeit + Geldbuße bei Vereitelung Schulpflicht.',
        'Eskalation: KL-Brief → SL-Brief → Beratung Schulpsych → OWi-Anzeige durch SL → bei Beharrlichkeit Art. 118 Schulzwang.',
      ],
      antwortkette: 'Gespräch + Beratung anbieten → SL-Brief mit Hinweis auf {{Art. 76}} + § 20 → bei Fortsetzung OWi-Anzeige Art. 119 → schließlich Art. 118 Schulzwang via Kreisverwaltungsbehörde.',
    },
    {
      id: 'F3',
      titel: 'Getrenntlebende EB — Wer bekommt Auskunft?',
      sachverhalt: 'Die Eltern von Tom sind seit einem Jahr getrennt; das Sorgerecht ist „gemeinsam". Der Vater fragt nach Toms Noten, die Mutter widerspricht.',
      knackpunkte: [
        '{{§ 1626 BGB}}: gemeinsame Sorge → beide auskunftsberechtigt, auch nach Trennung.',
        'Schule darf an beide Auskunft geben — keine Schiedsrolle in elterlichem Konflikt.',
        'Ausnahme: gerichtliche Beschränkung oder alleinige Sorge (Nachweis durch Sorgerechts-Erklärung/Beschluss).',
        '§ 14 LDO Drittauskunfts-Verbot greift NICHT — auskunftsberechtigte EB sind keine Dritten.',
      ],
      antwortkette: 'Sorgerechts-Lage prüfen (Vorlage Beschluss/Erklärung wenn unklar) → bei gemeinsamer Sorge beide gleichberechtigt → Schule erteilt Auskunft an beide.',
    },
    {
      id: 'F4',
      titel: 'Elternbeirat fordert Stundenplan-Änderung',
      sachverhalt: 'Der Elternbeirat beantragt bei der SL, die erste Stunde generell um 30 Minuten nach hinten zu verschieben.',
      knackpunkte: [
        '{{Art. 67}}: Elternbeirat hat Beratungs- + Anhörungsrecht, KEINE Entscheidung über U.-Zeiten.',
        'Entscheidung Stundenplan: SL ({{Art. 57}}/2) + Aufwandsträger (Schulbus-Koordination).',
        'Schulforum {{Art. 69}}: Beratungsforum für Schulleben — kann mitwirken.',
        'Prozedural: Elternbeirats-Anhörung + Schulforum-Beratung + SL-Entscheidung in Abstimmung mit Aufwandsträger.',
      ],
      antwortkette: 'Anliegen Elternbeirat anhören → Schulforum-Beratung → Aufwandsträger einbinden (Schulbus) → SL-Entscheidung mit Begründung → ggf. Vorlage Schulaufsicht.',
    },
  ],

  vertiefung: [
    {
      id: 'A1', kuerzel: 'A.1', titel: 'Klassenelternsprecher',
      anriss: '{{Art. 64 BayEUG}}: Wahl zu SJ-Beginn durch EB der Klasse. Bindeglied EB ↔ KL. Vermittlungs-Funktion bei Klassen-Konflikten. KEIN Beschluss-Organ.',
      norm: 'Art. 64 BayEUG', status: 'open', cards: 2,
      subblocks: [
        { label: 'Wahl + Amtszeit', cards: 1 },
        { label: 'Vermittlungs-Funktion', cards: 1 },
      ],
    },
    {
      id: 'A2', kuerzel: 'A.2', titel: 'Elternbeirat',
      anriss: '{{Art. 65-67 BayEUG}}: Wahl alle 2 SJ; Aufgaben Beratung + Anhörung + Beschwerde-Anrufung. Vorsitz im Elternbeirat. Anhörung bei wesentlichen Schulangelegenheiten.',
      norm: 'Art. 65 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: 'Wahl + Konstituierung', cards: 1 },
        { label: 'Aufgaben Art. 67', cards: 1 },
        { label: 'Anhörungsrecht', cards: 1 },
      ],
    },
    {
      id: 'A3', kuerzel: 'A.3', titel: 'Schulforum',
      anriss: '{{Art. 69 BayEUG}}: Bindeglied EB ↔ SL ↔ SMV ↔ Schulträger ↔ LK. **Abs. 4 Einvernehmen** bei Hausordnung + Pausenordnung. Im Übrigen Beratung Schulleben + Schulentwicklung + Bildungsangebot. KEIN Beschluss-Organ über Personal/Noten/U.-Inhalte.',
      norm: 'Art. 69 BayEUG', status: 'open', cards: 2,
      subblocks: [
        { label: 'Zusammensetzung', cards: 1 },
        { label: 'Aufgaben + Grenzen', cards: 1 },
      ],
    },
    {
      id: 'A4', kuerzel: 'A.4', titel: 'EB-Pflichten Art. 76 + § 20 BaySchO',
      anriss: 'Zwei Pflichten {{Art. 76 BayEUG}}: „achten auf" + „unterstützen". Meldepflicht {{§ 20 BaySchO}} bei Verhinderung. Bei Verstoß: OWi {{Art. 119}} bis Schulzwang {{Art. 118}}.',
      norm: 'Art. 76 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: '„achten" + „unterstützen"', cards: 1 },
        { label: '§ 20 BaySchO Meldung', cards: 1 },
        { label: 'Eskalation Art. 119/118', cards: 1 },
      ],
    },
    {
      id: 'A5', kuerzel: 'A.5', titel: 'EB-Mitwirkung + Sorgerecht',
      anriss: 'Beschwerdeweg {{Art. 56/5}}: LK → SL → Schulforum. Anhörung {{Art. 88}}. Personensorge {{§§ 1626 BGB}} (gemeinsam / allein). Getrenntlebende: i.d.R. beide auskunftsberechtigt.',
      norm: 'Art. 56/5 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: 'Beschwerdeweg gestuft', cards: 1 },
        { label: 'Anhörungsrecht bei OM', cards: 1 },
        { label: 'Sorgerecht + Auskunft', cards: 1 },
      ],
    },
  ],

  glossar: {
    'Art. 6/2 GG': { titel: 'Art. 6/2 GG — Elternrecht', wortlaut: '„Pflege und Erziehung der Kinder sind das natürliche Recht der Eltern und die zuvörderst ihnen obliegende Pflicht. Über ihre Betätigung wacht die staatliche Gemeinschaft." Verfassungsrechtlicher Anker EB-Stellung.', karten: [] },
    'Art. 7 GG': { titel: 'Art. 7 GG — Staatliche Schulaufsicht', wortlaut: 'Abs. 1: „Das gesamte Schulwesen steht unter der Aufsicht des Staates." Spannungsfeld zu Art. 6/2 GG → Schulrecht reguliert dieses Verhältnis.', karten: [] },
    'Art. 126 BV': { titel: 'Art. 126 BV — Familie', wortlaut: 'Verfassungs-Anker Familie als Erziehungseinheit. Vorrang elterlicher Erziehung; Staat schützt Familie.', karten: [] },
    'Art. 56 BayEUG': { titel: 'Art. 56 BayEUG — SuS-Rechte + Beschwerdeweg', wortlaut: 'Abs. 5: Beschwerdeweg nacheinander LK → SL → Schulforum. EB wirken auf Schulforum-Ebene mit.', karten: ['E07'] },
    'Art. 64 BayEUG': { titel: 'Art. 64 BayEUG — Klassenelternsprecher', wortlaut: 'Wahl zu SJ-Beginn durch EB der Klasse. Aufgaben: Information + Bündelung von Anliegen + Vermittlung KL ↔ EB. Amtszeit i.d.R. 1 Schuljahr.', karten: ['E01'] },
    'Art. 65 BayEUG': { titel: 'Art. 65 BayEUG — Elternbeirat-Konstituierung', wortlaut: 'Elternbeirat = Vertreter aller EB der Schule. Wahl alle 2 Schuljahre in den ersten 6 Wochen. **Schulart-spezifischer Schlüssel**: GS/MS/FöS = 1 EB-Mitglied pro 15 SuS-Eltern · RS/Gym/FOS/BOS = 1 pro 50. An MS typisch 5–12 Mitglieder je nach Schulgröße. Vorsitzende:r aus der Mitte gewählt.', karten: ['E02'] },
    'Art. 66 BayEUG': { titel: 'Art. 66 BayEUG — Wahl Elternbeirat', wortlaut: 'Wahlverfahren: alle EB wahlberechtigt + wählbar. Geheime Wahl. Wahlleitung durch SL oder beauftragte Person.', karten: [] },
    'Art. 67 BayEUG': { titel: 'Art. 67 BayEUG — Aufgaben Elternbeirat', wortlaut: '(1) Förderung Zusammenarbeit Schule ↔ EB. (2) Beratungsrecht. (3) Anhörungsrecht bei wesentlichen Schulangelegenheiten. (4) Beschwerde-Anrufung (Schulforum, SL). (5) Mitwirkung Schulpartner-Foren. KEINE Entscheidungskompetenz U./Noten.', karten: ['E03'] },
    'Art. 69 BayEUG': { titel: 'Art. 69 BayEUG — Schulforum', wortlaut: 'an MS: SL (Vorsitz) + Elternbeirat-Vertretung + SMV-Vertretung + Schulträger-Vertretung + bis 2 LK. **Abs. 4: Einvernehmens-Befugnis** bei Hausordnung + Pausenordnung + Grundsätzen schulischer Veranstaltungen (Schule kann diese Akte nicht gegen Schulforum-Veto erlassen). Im Übrigen: Beratung Schulleben + Schulentwicklung + Bildungsangebot. KEIN Beschluss-Organ über Personal/Noten/U.-Inhalte.', karten: ['E04'] },
    'Art. 75 BayEUG': { titel: 'Art. 75 BayEUG — EB-Auskunft', wortlaut: 'EB sind über wesentliche, ihr Kind betreffende Vorgänge zu unterrichten. Bei OM: schriftlich + rechtzeitig vor Vollzug.', karten: [] },
    'Art. 76 BayEUG': { titel: 'Art. 76 BayEUG — EB-Pflichten', wortlaut: 'EB haben „auf den regelmäßigen Schulbesuch des Kindes zu achten" und „die Erziehungsarbeit der Schule zu unterstützen". Zwei Pflichten.', karten: ['E05', 'FA05', 'FA06'] },
    'Art. 78 BayEUG': { titel: 'Art. 78 BayEUG — Schulberatung', wortlaut: 'Schule + jede LK beraten EB + SuS in Schullaufbahn-Fragen. Strukturelle Beratungspflicht.', karten: [] },
    'Art. 88 BayEUG': { titel: 'Art. 88 BayEUG — Anhörungspflicht', wortlaut: 'Vor jeder OM ist SuS anzuhören; EB rechtzeitig zu informieren und können teilnehmen. Verfahrensfehler → OM-Anfechtung.', karten: ['E07'] },
    'Art. 113 BayEUG': { titel: 'Art. 113 BayEUG — Schulaufsichtsbeschwerde', wortlaut: 'Beschwerde-Anrufung Schulaufsichtsbehörde (Staatliches Schulamt / Regierung). Verfahrensanspruch der EB.', karten: [] },
    'Art. 118 BayEUG': { titel: 'Art. 118 BayEUG — Schulzwang', wortlaut: 'Auf Antrag der Schule kann die Kreisverwaltungsbehörde durch Beauftragte den/die Schulpflichtige(n) zwangsweise der Schule zuführen.', karten: [] },
    'Art. 119 BayEUG': { titel: 'Art. 119 BayEUG — Ordnungswidrigkeit', wortlaut: 'OWi + Geldbuße bei Unterlassung Schul-Anmeldung oder Vereitelung der Schulpflicht durch EB.', karten: [] },
    '§ 20 BaySchO': { titel: '§ 20 BaySchO — Eltern-Meldepflicht', wortlaut: 'EB müssen die Schule bei Verhinderung des Kindes unverzüglich melden. Schriftliche Mitteilung nachreichen. Bei längerer Krankheit: schulärztliches Zeugnis möglich.', karten: ['E06'] },
    '§ 25 BaySchO': { titel: '§ 25 BaySchO — Elternsprechtage', wortlaut: 'Schule richtet Elternsprechtage ein; LK haben Sprechstunden anzubieten. Regelmäßige Information der EB.', karten: [] },
    '§ 26 BaySchO': { titel: '§ 26 BaySchO — Elternbriefe', wortlaut: 'Schule informiert EB schriftlich über wesentliche Vorgänge (Zeugnisse, OM, Schulveranstaltungen). Schriftform für Verbindlichkeit.', karten: [] },
    '§ 6 LDO': { titel: '§ 6 LDO — Klassenleitung', wortlaut: 'KL-Aufgaben: pädagogische + organisatorische Koordination + Kontakt EB. § 6/2: Koordinationspflicht mit Fach-LK. Kernrolle im EB-Kontakt.', karten: [] },
    '§§ 1626 BGB': { titel: '§ 1626 BGB — Elterliche Sorge', wortlaut: 'Personensorge = elterliches Recht + Pflicht. Bei verheirateten EB gemeinsam; bei nicht verheirateten + Sorgerechts-Erklärung gemeinsam; sonst Mutter allein.', karten: ['E08', 'FA10'] },
    '§ 1631 BGB': { titel: '§ 1631 BGB — Inhalt + Grenzen Personensorge', wortlaut: 'Recht + Pflicht der EB zur Pflege, Erziehung, Beaufsichtigung. Verbot entwürdigender Erziehungsmaßnahmen.', karten: [] },
    '§ 1684 BGB': { titel: '§ 1684 BGB — Umgangsrecht', wortlaut: 'Kind hat Anspruch auf Umgang mit beiden Eltern. Schule berücksichtigt familiengerichtliche Regelungen.', karten: [] },
  },
};
