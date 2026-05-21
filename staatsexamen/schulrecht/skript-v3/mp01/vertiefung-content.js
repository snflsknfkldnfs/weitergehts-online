// MP_01 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Schulrechtliche Normen folgen einer **9-stufigen Hierarchie** vom GG bis zur Dienstanweisung des Schulleiters. Höherrangige Norm verdrängt niedrigere (**lex superior**). Bei gleicher Stufe gilt **lex specialis** (Spezialregelung) und **lex posterior** (jüngere Norm).'
    },

    { type: 'h', text: '9-Stufen-Hierarchie (Stephan Bauer S. 5)' },
    { type: 'table',
      head: ['Stufe', 'Kategorie', 'Beispiele'],
      rows: [
        ['1', 'Verfassungsrecht — Bund', '{{Art. 7 GG}} (Schulwesen) · {{Art. 4 GG}} (Religionsfreiheit) · {{Art. 6/2 GG}} (Elternrecht)'],
        ['2', 'Verfassungsrecht — Bayern', '{{Art. 128 BV}} (Bildungsanspruch) · {{Art. 131 BV}} (Oberste Bildungsziele) · {{Art. 132 BV}} (Anlage+Leistung) · {{Art. 136 BV}} (ReliU) · {{Art. 137 BV}} (Teilnahme)'],
        ['3', 'Gesetze', '**BayEUG** — Bayerisches Gesetz über das Erziehungs- und Unterrichtswesen'],
        ['4', 'Rechtsverordnungen', '**BaySchO** (Allgemein) · **BayMSO** (Mittelschule) · **LDO** (Dienstordnung LK) · **AGO** (Allgemeine Geschäftsordnung)'],
        ['5', 'KMBek', 'KM-Bekanntmachungen — organisatorische Konkretisierungen'],
        ['6', 'KMS', 'KM-Schreiben — auslegend, Ermessensrichtlinien'],
        ['7', 'RS Regierung', 'Rundschreiben Bezirksregierung'],
        ['8', 'RS Schulamt', 'Rundschreiben Staatl. Schulamt'],
        ['9', 'Dienstanweisung SL', 'Schulinterne Konkretisierung'],
      ],
    },

    { type: 'h', text: 'Konflikt-Regeln' },
    { type: 'bullets', items: [
      '**Lex superior derogat legi inferiori**: höherrangige Norm verdrängt niedrigere. KMS kann BayEUG NICHT überschreiben.',
      '**Lex specialis derogat legi generali**: speziellere Norm verdrängt allgemeine. BayMSO (MS-spezifisch) > BaySchO (allgemein).',
      '**Lex posterior derogat legi priori**: jüngere Norm verdrängt ältere — bei gleicher Stufe.',
      'EU-Recht hat Anwendungsvorrang vor nationalem Recht (nicht im Schema, aber im Hintergrund relevant).',
    ]},

    { type: 'h', text: 'Praxis: KMS-vs-BayEUG-Konflikt' },
    { type: 'p', text:
      'KMS sind häufig der Versuch, gesetzliche Lücken auszufüllen oder zu konkretisieren. Solange sie BayEUG nicht widersprechen, sind sie verbindlich. **Widerspricht ein KMS dem BayEUG-Wortlaut, ist das KMS insoweit ungültig** — die gesetzliche Regelung gilt. Praxis: bei Konflikt SL/Schulamt einschalten, Akten-Vermerk anlegen, gesetzeskonforme Anwendung.'
    },

    { type: 'warn', titel: '⚠ Fallen Hierarchie', text:
      '**KMBek ≠ KMS** — Bekanntmachung (organisatorisch, ranghöher) vs. Schreiben (auslegend). **Dienstanweisung SL** ist verbindlich für LK, aber nur insoweit, wie sie höherrangige Normen nicht verletzt. **RS Schulamt** (Stufe 8) ist nicht der „Schulamt-Brief" einer Schule, sondern Rundschreiben des Staatlichen Schulamts. **Verwaltungsvorschriften wirken nur intern** (Behörden) — Außenwirkung nur, wenn durch Selbstbindung der Verwaltung.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Stufe steht ZWISCHEN BayEUG und KMS?',
        a: '**Rechtsverordnungen** (BaySchO, BayMSO, LDO, AGO) — Stufe 4. KMS = Stufe 6. Dazwischen liegen Rechtsverordnungen und KMBek (Stufe 5).' },
      { q: 'Ein KMS schreibt eine kürzere Frist als BayEUG — was gilt?',
        a: 'BayEUG gilt. KMS kann formelles Gesetz nicht verkürzen (lex superior). KMS-Passage ist insoweit unwirksam.' },
      { q: 'Was unterscheidet BayMSO und BaySchO?',
        a: 'BayMSO = Schulordnung speziell für die Mittelschule (lex specialis). BaySchO = allgemeine Schulordnung für alle Schularten. Bei MS-spezifischen Fragen: BayMSO vorrangig.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Der Bildungs- und Erziehungsauftrag der Schule ist **verfassungsrechtlich verankert**: {{Art. 131 BV}} formuliert den Grundwerte-Kompass, {{Art. 1 BayEUG}} + {{Art. 2 BayEUG}} operationalisieren ihn zu Schulaufgaben. Der Doppelauftrag „Wissen + Charakter" ist nicht trennbar.'
    },

    { type: 'h', text: 'Art. 131 BV — Verbatim' },
    { type: 'p', text:
      'Abs. 1: „**Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch Herz und Charakter bilden.**"'
    },
    { type: 'p', text:
      'Abs. 2 (Auswahl): Oberste Bildungsziele sind: **Ehrfurcht vor Gott** · Achtung vor religiöser Überzeugung · **Achtung vor der Würde des Menschen** · Selbstbeherrschung · Verantwortungsgefühl + -bewusstsein · Hilfsbereitschaft · **Aufgeschlossenheit für alles Wahre, Gute und Schöne** · Verantwortungsbewusstsein für Natur und Umwelt · **Liebe zur Bayerischen Heimat** · **Erziehung im Geiste der Demokratie** · **Erziehung im Sinne der Völkerversöhnung**.'
    },
    { type: 'p', text:
      'Abs. 3: Knaben und Mädchen sind in besonderem Maße im Geiste der Demokratie zu erziehen.'
    },

    { type: 'h', text: 'BayEUG Art. 1 + 2 — Aufgabenkatalog' },
    { type: 'table',
      head: ['Anker', 'Inhalt'],
      rows: [
        ['{{Art. 1 BayEUG}}/1', 'Verfassungsmäßiger Auftrag — Wissen und Können vermitteln + Geist und Körper, Herz und Charakter bilden.'],
        ['{{Art. 1 BayEUG}}/2', 'Oberste Bildungsziele = wortgleiche Spiegelung BV Art. 131 (Ehrfurcht vor Gott · Achtung religiöser Überzeugung · Würde des Menschen · Selbstbeherrschung · Verantwortungsgefühl · Hilfsbereitschaft · Aufgeschlossenheit für Wahres+Gutes+Schönes · Natur+Umwelt).'],
        ['{{Art. 2 BayEUG}}', 'Operationalisierter Aufgabenkatalog (insbesondere): Kenntnisse + Fertigkeiten · Fähigkeiten entwickeln · selbstständiges Urteil · Geschichte/Kultur Bayerns + Heimatliebe · überliefertes Bildungsgut · Toleranz + friedliche Gesinnung · europäisches Bewusstsein · Völkerverständigung · fdGO + sozialer Rechtsstaat · Berufswelt-Vorbereitung · kulturelle + religiöse Werte · Rechte + Pflichten · Umwelt-Verantwortung.'],
      ],
    },

    { type: 'h', text: 'Konkretisierungs-Logik: vom Grundwert zur Schulaufgabe' },
    { type: 'bullets', items: [
      '**BV** = Verfassungs-Verankerung der Grundwerte (Ehrfurcht · Würde · Heimat · Demokratie · Völkerversöhnung).',
      '**BayEUG Art. 1** = Spiegelung der Verfassungswerte als gesetzlicher Bildungsauftrag.',
      '**BayEUG Art. 2** = Operationalisierung zu „Aufgaben der Schule" (was die Schule TUT, nicht nur woran sie sich orientiert).',
      'Diese Vertikale ist im Examen häufig die Eröffnung der Antwort: erst BV, dann BayEUG, dann konkrete Schulpraxis.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Bildungsauftrag', text:
      'Verfassungs-Bezug **nicht überspringen** — eine Antwort, die mit „Art. 1 BayEUG sagt…" beginnt, lässt den Schritt von BV → BayEUG aus. **„Sollen…"** (Art. 131) ist normativ (kein Programmsatz), das BVerfG erkennt darin Verfassungsauftrag mit subjektiver Komponente. **Bildungsziele BV vs. BayEUG**: nicht identisch — BV hat „Ehrfurcht vor Gott" + Heimatliebe explizit; BayEUG operationalisiert auf Schul-Ebene.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Norm formuliert den Verfassungssatz „Wissen + Herz und Charakter"?',
        a: '{{Art. 131 BV}}/1 verbatim: „Die Schulen sollen nicht nur Wissen und Können vermitteln, sondern auch Herz und Charakter bilden."' },
      { q: 'Wodurch unterscheiden sich Art. 131 BV und Art. 1+2 BayEUG inhaltlich?',
        a: 'BV = Grundwerte-Kompass (Verfassungsverankerung). BayEUG Art. 1 = Spiegelung. BayEUG Art. 2 = operationalisierter Aufgabenkatalog der Schule (was sie TUT).' },
      { q: 'Ist „Erziehung im Geiste der Demokratie" Bildungsziel der BV?',
        a: 'Ja. {{Art. 131 BV}}/3: „Knaben und Mädchen sind in besonderem Maße im Geiste der Demokratie … zu erziehen." Verfassungsexpliziter Auftrag.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Religionsunterricht ist **verfassungsrechtlich „ordentliches Lehrfach"** ({{Art. 7 GG}}/3 + {{Art. 136 BV}}/2 + {{Art. 46 BayEUG}}). Folge: Pflichtfach mit Note + Vorrückungsrelevanz. Wer sich abmeldet, muss **Ethik** belegen ({{Art. 47 BayEUG}}). Verfassungs-Schwelle für die Teilnahme: **Vollendung 18. Lebensjahr** ({{Art. 137 BV}}/1).'
    },

    { type: 'h', text: 'Art. 7/3 GG + Art. 136 BV — Verbatim' },
    { type: 'p', text:
      '{{Art. 7 GG}}/3 S. 1: „**Der Religionsunterricht ist in den öffentlichen Schulen mit Ausnahme der bekenntnisfreien Schulen ordentliches Lehrfach.**" S. 2: „Unbeschadet des staatlichen Aufsichtsrechtes wird der Religionsunterricht in Übereinstimmung mit den Grundsätzen der Religionsgemeinschaften erteilt." S. 3: „Kein Lehrer darf gegen seinen Willen verpflichtet werden, Religionsunterricht zu erteilen."'
    },
    { type: 'p', text:
      '{{Art. 136 BV}}/2: „Der Religionsunterricht ist ordentliches Lehrfach an allen Schulen. … Die Lehrkräfte bedürfen der Bevollmächtigung durch die Religionsgemeinschaften."'
    },

    { type: 'h', text: 'Folgen „ordentliches Lehrfach"' },
    { type: 'bullets', items: [
      '**Pflichtfach** für alle SuS, die nicht abgemeldet sind — Note + Vorrückungsrelevanz.',
      '**Getrennt nach Bekenntnissen** (kath./ev./isr./alt.-kath./orth.); konfessionelle Bindung des Unterrichts.',
      '**Bevollmächtigung der LK** durch die Religionsgemeinschaft (kath.: Missio canonica; ev.: Vocatio) — keine reine staatliche Stellungs-Ernennung.',
      '**Schulräume** sind bereitzustellen ({{Art. 136 BV}}/3).',
      '**Kein Zwang für LK**, ReliU zu erteilen ({{Art. 7 GG}}/3 S. 3 + {{Art. 136 BV}}/3).',
    ]},

    { type: 'h', text: '18-Lj-Schwelle Art. 137 BV' },
    { type: 'p', text:
      'Verbatim {{Art. 137 BV}}/1: „**Über die Teilnahme am Religionsunterricht, kirchlichen Handlungen und Feierlichkeiten entscheiden bis zur Vollendung des 18. Lebensjahres die Erziehungsberechtigten des Schülers, danach er selbst.**"'
    },
    { type: 'bullets', items: [
      '**Bis 18.** Lj.: EB entscheiden über Teilnahme.',
      '**Ab Vollendung 18. Lj.**: SuS entscheidet selbst.',
      'Religionsmündigkeit nach RKEG: **Wechsel** der Konfession ab 14 möglich. Ab 12 nicht gegen den eigenen Willen.',
      'Abmelde-Form: schriftlich gegenüber der Schule, i.d.R. zum Schulhalbjahr/-jahr.',
    ]},

    { type: 'h', text: 'Ethik-Pflichtfach Art. 47 BayEUG' },
    { type: 'p', text:
      'Verbatim {{Art. 47 BayEUG}}: „Schülerinnen und Schüler, die nicht am Religionsunterricht teilnehmen, sind verpflichtet, am Unterricht im Fach Ethik teilzunehmen." Verfassungs-Anker {{Art. 137 BV}}/2: „**Ersatz für nicht besuchten Religionsunterricht ist ein Unterricht über anerkannte Grundsätze der Sittlichkeit.**"'
    },
    { type: 'bullets', items: [
      'Ethik ist **kein Wahlfach** — Pflichtfach bei ReliU-Abmeldung.',
      'Note + Vorrückungsrelevanz wie ReliU.',
      'Inhalt: anerkannte Grundsätze der Sittlichkeit · werteinsichtiges Urteilen + Handeln · sittliche Orientierung.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Religion + Ethik', text:
      '**„Ordentliches Lehrfach" ≠ Wahlfach** — Pflichtfach mit Note. **18 Lj. = Vollendung**, nicht „im 18. Lebensjahr". **Religionsmündigkeit** (RKEG) ist separater Anker — Wechsel ab 14, kein Zwang ab 12; nicht zu verwechseln mit der Teilnahme-Entscheidung Art. 137 BV (18). **Bevollmächtigung** kommt von der Religionsgemeinschaft, nicht vom KM — staatliche Aufsicht bleibt aber. **Abmeldung vom ReliU** ≠ Befreiung vom Ethik-Unterricht.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer entscheidet im Schulalter (vor 18) über die Teilnahme am ReliU?',
        a: 'Die EB. {{Art. 137 BV}}/1: „bis zur Vollendung des 18. Lebensjahres die Erziehungsberechtigten des Schülers".' },
      { q: 'Was passiert mit einer SuS, die vom ReliU abgemeldet ist?',
        a: 'Pflicht-Teilnahme am Ethikunterricht ({{Art. 47 BayEUG}} + {{Art. 137 BV}}/2). Keine Freistunde.' },
      { q: 'Welche Bevollmächtigung braucht eine kath. ReliU-LK?',
        a: '**Missio canonica** (kath.) — verliehen vom zuständigen Bischof. Ohne Missio keine ReliU-Lehrbefugnis. Bei ev. LK: **Vocatio** der Landeskirche.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Familien- und Sexualerziehung ist **Aufgabe der Schule** ({{Art. 48 BayEUG}}), nicht „Sexualkunde". Information der Eltern ist Verfahrenspflicht (KMS), KEIN Vetorecht. Verankerung in BV.'
    },

    { type: 'h', text: 'Art. 48 BayEUG' },
    { type: 'p', text:
      'Familien- + Sexualerziehung sind **Aufgabe der Schule**, in Erfüllung ihres Bildungs- und Erziehungsauftrags. Orientierung an einschlägigen Vorgaben der BV. Information der Eltern erforderlich (KMS-Regelung — Eltern sind vor Unterrichtseinheiten zu informieren).'
    },

    { type: 'h', text: 'Aufgabe vs. Vetorecht' },
    { type: 'bullets', items: [
      '**Aufgabe** = Schule MUSS die Erziehung leisten (verfassungs-/gesetzlicher Auftrag).',
      '**Information** EB = Verfahrenspflicht **vor** Unterricht — transparente Kommunikation der Inhalte.',
      '**Kein Vetorecht** der EB — kein Recht, das Kind vom Unterricht abzumelden.',
      'Schulpflicht {{Art. 35 BayEUG}} gilt — auch für diese Sequenzen.',
    ]},

    { type: 'h', text: 'KMS-Informations-Pflicht' },
    { type: 'p', text:
      'KMS regelt typischerweise: (1) Eltern sind vor entspr. Sequenzen schriftlich oder im Elternabend zu informieren · (2) Inhalte transparent darstellen · (3) bei begründeten Bedenken kann das pädagogische Gespräch gesucht werden — keine Befreiung vom Unterricht, aber Berücksichtigung in der Methodik. (4) Religiöse + kulturelle Sensibilitäten dürfen Bildungsauftrag nicht unterlaufen.'
    },

    { type: 'h', text: 'Begriffs-Schärfung: nicht „Sexualkunde"' },
    { type: 'bullets', items: [
      '**Familien- und Sexualerziehung** ist Erziehungsauftrag — Werte, Beziehung, Verantwortung.',
      '**Sexualkunde** (alter Begriff) reduziert auf biologische Aufklärung — wird gerade NICHT damit gemeint.',
      'Anknüpfungsfelder: Biologie, Religion, Ethik, Sozialkunde, KL-Stunde — fächerverbindend.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Familien-/Sexualerziehung', text:
      '**Vetorecht ≠ Informationsrecht** — EB können informiert werden müssen, ohne Vetorecht zu haben. **„Sexualkunde"** ist der falsche Begriff — Erziehungsauftrag, nicht reine Wissensvermittlung. **Schulpflicht** gilt — keine Befreiung. **KMS** ist die einschlägige Konkretisierungs-Ebene (auch wenn Details variieren).',
    },

    { type: 'selfcheck', items: [
      { q: 'Können EB ihr Kind von der Sexualerziehung abmelden?',
        a: 'NEIN. Aufgabe der Schule ({{Art. 48 BayEUG}}) + Schulpflicht ({{Art. 35 BayEUG}}). EB-Information ist Verfahrenspflicht, kein Vetorecht.' },
      { q: 'Warum heißt es „Familien- und Sexualerziehung" und nicht „Sexualkunde"?',
        a: 'Erziehungsauftrag (Werte/Beziehung/Verantwortung), nicht nur biologische Wissensvermittlung. Bewusste Begriffswahl.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      '**§ 1 JuSchG** definiert die drei Personenstufen Kind/Jugendl./Erziehungsbeauftragte — relevant für Klassenfahrten, Schulveranstaltungen, Aufsicht. **Inklusion**: Lernort = Eltern-Entscheidung ({{Art. 41 BayEUG}}/1), Ausnahme nur bei Sehen/Hören/k.-m. ({{Art. 30a BayEUG}}/4).'
    },

    { type: 'h', text: '§ 1 JuSchG — Drei Stufen' },
    { type: 'table',
      head: ['Stufe', 'Definition', 'Schul-Relevanz'],
      rows: [
        ['**Kind**', 'wer noch nicht 14 Jahre alt ist ({{§ 1 JuSchG}}/1 Nr. 1)', 'GS + Jgst. 5–7 MS überwiegend Kinder. Strafmündigkeit greift noch nicht (§ 1 JGG). Bei Gefährdung: § 8a SGB VIII Jugendamt.'],
        ['**Jugendliche/r**', 'wer 14, aber noch nicht 18 Jahre alt ist ({{§ 1 JuSchG}}/1 Nr. 2)', 'Jgst. 8–10 MS i.d.R. Jugendliche. Strafmündigkeit ab Vollendung 14. JuSchG §§ 4–10 Schutz Alkohol/Nikotin/Veranstaltungen.'],
        ['**Erziehungsbeauftragte/r**', 'jede über 18-Jährige, soweit Personensorgeberechtigte/r Erziehungsaufgaben überträgt ({{§ 1 JuSchG}}/1 Nr. 4)', 'Klassenfahrten: LK übernimmt regelmäßig die EB-Rolle. Begleitperson volljähriger Geschwister bei Veranstaltungen.'],
      ],
    },

    { type: 'h', text: 'JuSchG-Schutz-Bereiche (§§ 4–13)' },
    { type: 'bullets', items: [
      '**Gaststätten** § 4: bis 16 nur mit EB, ab 16 bis 23 Uhr, ab 18 ohne Beschränkung.',
      '**Veranstaltungen** § 5: ab 16 bis 24 Uhr (mit EB länger). Tanzveranstaltungen ab 16 bis 24, mit EB länger.',
      '**Filmveranstaltungen + Bildträger** § 11+12: FSK-Stufen 0/6/12/16/18 verbindlich.',
      '**Alkohol** § 9: Bier/Wein ab 16, mit EB ab 14; Spirituosen ab 18.',
      '**Nikotin** § 10: ab 18 (Tabak + E-Zigaretten + Shisha).',
      '**Spielhallen** § 6: Aufenthalt ab 18.',
    ]},

    { type: 'h', text: 'Inklusion — Art. 41 + 30a BayEUG' },
    { type: 'p', text:
      '{{Art. 41 BayEUG}}/1: Bei sonderpädagogischem Förderbedarf **entscheiden die Eltern über den Lernort** — allgemeine Schule oder Förderschule. Verfassungs-Spiegelung {{Art. 6/2 GG}} (Eltern-Vorrang).'
    },
    { type: 'p', text:
      '{{Art. 30a BayEUG}}/4 Ausnahme: Bei Förderschwerpunkten **Sehen · Hören · körperlich-motorische Entwicklung** ist **ZUSÄTZLICH die Zustimmung des Sachaufwandsträgers** (Gemeinde/Schulverband) erforderlich — technisch-bauliche Voraussetzungen (Lift, Akustik, Brailledrucker).'
    },
    { type: 'bullets', items: [
      '**7 Förderschwerpunkte** ({{Art. 20/1}}): Sehen · Hören · körperlich-motorische Entwicklung · geistige Entwicklung · Sprache · Lernen · emotionale + soziale Entwicklung.',
      'Praxis-Erweiterung: **Autismus + ELECOK** (Elektronische Kommunikation).',
      '**MSD** (Mobiler Sonderpädagogischer Dienst) — schulart-übergreifender Dienst ({{Art. 21 BayEUG}}), kein FöS.',
      'Lernort allgemeine Schule + FöS = inklusive UND separative Strukturen koexistieren.',
    ]},

    { type: 'h', text: 'Kindeswohlgefährdung § 8a SGB VIII' },
    { type: 'p', text:
      'Bei Anhaltspunkten für Gefährdung ist die Schule kein Ermittlungsorgan. Meldepfad: **LK → KL → SL → Jugendamt** (bei akuter Gefahr: SL direkt). Jugendamt schätzt im Zusammenwirken mehrerer Fachkräfte ein. Schweigepflicht der LK ({{§ 14 LDO}}) wird durch § 4 KKG (Kooperationsgesetz Kinderschutz) im konkreten Fall durchbrochen.'
    },

    { type: 'warn', titel: '⚠ Fallen JuSchG + Inklusion', text:
      '**Strafmündigkeit ≠ Jugendschutz-Grenze** — beides ist „ab 14", aber verschiedene Anker (JGG vs. JuSchG). Bei <14: § 8a SGB VIII. **„Erziehungsbeauftragte/r"** ist juristischer Begriff (§ 1 Nr. 4 JuSchG) — bei Klassenfahrten übernimmt LK regelmäßig diese Rolle für die jeweilige SuS, im Einzelfall mit EB-Schriftlich-Auftrag. **Lernort-Entscheidung** Art. 41/1 ist Eltern-Recht — Schule darf NICHT alleine entscheiden, nur beraten + empfehlen. **Sachaufwandsträger-Zustimmung** Art. 30a/4 nur bei Sehen/Hören/k.-m. — bei geistiger Entwicklung NICHT erforderlich.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wann ist eine SuS „Kind" i.S.d. JuSchG?',
        a: '{{§ 1 JuSchG}}/1 Nr. 1: wer noch nicht 14 Jahre alt ist (bis Vollendung 14. Lj.).' },
      { q: 'Wer entscheidet über den Lernort eines SuS mit Förderbedarf gE?',
        a: 'Eltern ({{Art. 41 BayEUG}}/1). KEINE Sachaufwandsträger-Zustimmung erforderlich (Art. 30a/4 gilt nur Sehen/Hören/k.-m.).' },
      { q: 'Welche zwei Anker greifen bei einem Kind <14, das Gewalt erlebt?',
        a: '{{§ 8a SGB VIII}} (Jugendamt-Einschaltung über SL) + Schulrechtliche Erziehungs-/Schutzmaßnahmen. Strafmündigkeit greift bei <14 nicht.' },
    ]},
  ],

};
