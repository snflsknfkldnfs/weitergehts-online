// MP_09 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Die staatliche Schulaufsicht ist verfassungsrechtlich verankert: **{{Art. 7/1 GG}}** + Spiegelung **{{Art. 130 BV}}**. Sie ist **hoheitliche** Funktion — nicht an private Träger delegierbar.'
    },

    { type: 'h', text: 'Art. 7 GG — Verbatim' },
    { type: 'p', text:
      'Abs. 1: „**Das gesamte Schulwesen steht unter der Aufsicht des Staates.**" Abs. 4: „Das Recht zur Errichtung von privaten Schulen wird gewährleistet. Private Schulen als Ersatz für öffentliche Schulen bedürfen der Genehmigung des Staates und unterstehen den Landesgesetzen."'
    },

    { type: 'h', text: 'Art. 130 BV + Privatschulen' },
    { type: 'bullets', items: [
      '{{Art. 130 BV}}: Spiegelung Art. 7/1 GG; bayer. Schulaufsicht.',
      '{{Art. 134 BV}}: Privatschulen sind genehmigungs-pflichtig + müssen Anforderungen öffentlicher Schulen entsprechen.',
      'Bayerische Privatschulen (z.B. konfessionelle Gymnasien, Waldorfschulen, Montessori-Schulen) unterstehen Reg + KM.',
      '**Aufsicht ≠ Trägerschaft**: Staat kann aufsichten, ohne Träger zu sein (Beispiel: kommunale Schulen).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Verfassungs-Anker', text:
      '**„Aufsicht des Staates" ist hoheitlich** — keine Delegation an Privatpersonen. **Privatschulen** sind nicht „außerhalb" der Aufsicht — sie unterliegen ihr genauso. **Schulaufsicht ≠ Sachaufwandsträgerschaft** — Aufsicht = Staat, Träger = Gemeinde/Landkreis (Schulgebäude).',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Verfassungsnorm verankert die staatliche Schulaufsicht?',
        a: '{{Art. 7/1 GG}} (Bund), gespiegelt in {{Art. 130 BV}} (Bayern).' },
      { q: 'Sind Privatschulen aufsichtsfrei?',
        a: 'NEIN. {{Art. 7/4 GG}} + {{Art. 134 BV}}: genehmigungspflichtig + Anforderungen öffentlicher Schulen erfüllen.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Die bayerische Schulverwaltung folgt einer **vierstufigen Pyramide**: KM (oberste) → 7 Bezirksregierungen (mittlere) → Staatliche Schulämter (untere) → Schule. Schularten sind unterschiedlich angesiedelt.'
    },

    { type: 'h', text: 'KM — oberste Schulaufsichtsbehörde' },
    { type: 'p', text:
      '**Bayer. Staatsministerium für Unterricht und Kultus** ({{Art. 111 BayEUG}}). Sitz München. Aufgaben: (1) Rechts-Setzung (Lehrpläne · Schulordnungen · KMBek · KMS). (2) Schulpolitik + Strategie. (3) Aufsicht über mittlere + untere Behörden. (4) Schul-Reform-Steuerung. (5) Anerkennung ausländischer Abschlüsse.'
    },

    { type: 'h', text: '7 Bezirksregierungen' },
    { type: 'bullets', items: [
      'Mittelfranken (Ansbach)',
      'Unterfranken (Würzburg)',
      'Oberfranken (Bayreuth)',
      'Schwaben (Augsburg)',
      'Niederbayern (Landshut)',
      'Oberbayern (München)',
      'Oberpfalz (Regensburg)',
    ]},
    { type: 'p', text:
      'Mittlere Schulaufsichtsbehörde ({{Art. 112}}). Direkt zuständig für **RS + Gym + FOS/BOS** im Bezirk. Für GS/MS/FöS mittelbar via Schulämter. Beförderungs-Personal (SL, Konrektor:in). Schulversuche. Externe Evaluation. Schulberatungsstelle.'
    },

    { type: 'h', text: 'Staatliche Schulämter — GS/MS/FöS' },
    { type: 'bullets', items: [
      'Eines pro **kreisfreie Stadt** (z.B. München, Nürnberg, Würzburg) bzw. pro **Landkreis** (z.B. Würzburg-Land, Aschaffenburg-Land).',
      'Untere Schulaufsichtsbehörde ({{Art. 112}}).',
      'Zuständig für **Grundschule + Mittelschule + Förderschule**.',
      'Leitung: **Schulrat:rätin** (i.d.R. ehemalige SL mit Beförderung).',
      'Aufgaben: Schulaufsicht, Personalverwaltung LK, Schulorganisation, Beratung, OWi-Verfahren.',
    ]},

    { type: 'h', text: 'Schule als Selbstverantwortungs-Einheit' },
    { type: 'p', text:
      'Die Schule selbst ist letzte Ebene — sie ist nicht „Behörde", aber Träger schulischer Eigenverantwortung. {{Art. 2}} BayEUG betont Eigenverantwortung im Rahmen der Aufsicht. SL ist Bindeglied zwischen Aufsicht und Schulalltag.'
    },

    { type: 'warn', titel: '⚠ Fallen Behörden-Pyramide', text:
      '**7 Bezirksregierungen** — nicht 6, nicht 8. **Staatl. Schulamt = GS+MS+FöS** — nicht RS oder Gym (die sind direkt unter Reg). **„Schulamt" verwechseln** mit Schulträger (Gemeinde) — zwei verschiedene Sachen. **Schulrat:rätin leitet das Schulamt** — die Behörde ist das Schulamt.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wie viele Bezirksregierungen gibt es in Bayern?',
        a: 'Sieben: Mittelfranken · Unterfranken · Oberfranken · Schwaben · Niederbayern · Oberbayern · Oberpfalz.' },
      { q: 'Welche Schularten betreut das Staatliche Schulamt?',
        a: 'Grundschule + Mittelschule + Förderschule. RS+Gym direkt unter Bezirksregierung.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      '{{Art. 113 BayEUG}} unterscheidet **drei Aufsichtsarten**, die jede Aufsichtsbehörde gegenüber den nachgeordneten Schulen ausübt: **Fachaufsicht · Dienstaufsicht · Rechtsaufsicht**. Die Reichweite ist verschieden, die Schwere ebenso.'
    },

    { type: 'h', text: 'Fachaufsicht' },
    { type: 'bullets', items: [
      '**Gegenstand**: Unterrichtsinhalte, Lehrpläne, pädagogische Qualität, Methodik.',
      'Eingriff in didaktische Entscheidungen ist möglich, aber **selten** (pädagogische Freiheit der LK Art. 59 BayEUG).',
      'Typischer Anlass: Externe Evaluation findet pädagogische Auffälligkeiten; Schulinspektion.',
      'Steuerung über KMBek + Lehrplan-Vorgaben.',
    ]},

    { type: 'h', text: 'Dienstaufsicht' },
    { type: 'bullets', items: [
      '**Gegenstand**: Personal-Angelegenheiten — Beurteilung, Einsatz, Beförderung, Disziplinar.',
      'SL übt Dienstaufsicht ggü. LK aus ({{§ 24 LDO}}). Schulamt/Reg übt sie ggü. SL aus.',
      'Anker: BayBG + BeamtStG + BayDG.',
      'Disziplinarmaßnahmen 5 Stufen ({{Art. 6}} BayDG): Verweis · Geldbuße · Kürzung · Zurückstufung · Entfernung.',
    ]},

    { type: 'h', text: 'Rechtsaufsicht' },
    { type: 'bullets', items: [
      '**Gegenstand**: Einhaltung von Gesetzen, Verfahren, Akten.',
      'Verbindlich für ALLE Schulen — auch Privatschulen ({{Art. 7/4 GG}} + {{Art. 134 BV}}).',
      'Prüfung formaler Korrektheit von OM-Verfahren, Beschluss-Protokollen, Notengebung.',
      'Anker: BayEUG + Schulordnungen + AGO.',
    ]},

    { type: 'h', text: 'Vergleich' },
    { type: 'table',
      head: ['Aufsichtsart', 'Gegenstand', 'Anker', 'Schwere'],
      rows: [
        ['Fachaufsicht', 'U.-Inhalte / Pädagogik', 'Lehrpläne, KMBek', 'mittel — pädagogische Freiheit'],
        ['Dienstaufsicht', 'Personal / Beurteilung', 'LDO, BayBG, BayDG', 'hoch — Disziplinar bis Entlassung'],
        ['Rechtsaufsicht', 'Gesetze / Verfahren', 'BayEUG, VO, AGO', 'absolut — Verfahrensfehler-Anfechtbarkeit'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen Aufsichtsarten', text:
      '**Fach ≠ Dienst** — wer Fachaufsicht ausübt, regelt didaktische Fragen; wer Dienstaufsicht ausübt, beurteilt Personal. **Rechtsaufsicht ist absolut** — Verfahrensfehler machen Schulmaßnahmen anfechtbar (z.B. OM ohne Anhörung Art. 88). **Pädagogische Freiheit** Art. 59 BayEUG ist Grenze der Fachaufsicht — keine Lehrplan-Verletzung, aber methodische Eigenständigkeit.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Aufsichtsarten unterscheidet Art. 113 BayEUG?',
        a: 'Fachaufsicht (U.-Inhalte) · Dienstaufsicht (Personal) · Rechtsaufsicht (Gesetze/Verfahren).' },
      { q: 'Welche Aufsichtsart wird bei Disziplinarverfahren genutzt?',
        a: 'Dienstaufsicht ({{Art. 113}} + BayDG + BeamtStG). 5 Stufen Disziplinarmaßnahmen.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Die **Personalverwaltung** der LK ist nach Geschäftsverteilung auf Reg + Schulamt verteilt. Einstellung + Beförderung = Reg. Versetzung intern = Schulamt. Personalvertretung {{Art. 75 BayPVG}} mitbestimmend.'
    },

    { type: 'h', text: 'Einstellung + Versetzung' },
    { type: 'table',
      head: ['Vorgang', 'Zuständigkeit', 'Anker'],
      rows: [
        ['**Einstellung MS-LK**', 'Bezirksregierung (Reg)', '{{BayLBG}} + LlbG'],
        ['Umsetzung der Einstellung', 'Staatl. Schulamt (Schulrat:rätin weist Schule zu)', 'Geschäftsverteilung Reg'],
        ['**Versetzung intern** (innerhalb Schulamt)', 'Staatl. Schulamt', 'LlbG'],
        ['**Versetzung übergreifend** (zwischen Schulämtern)', 'Reg', 'LlbG'],
        ['**Beförderung** (SL, Konrektor:in, Beratungs-LK)', 'Reg', 'LlbG + KMBek'],
      ],
    },

    { type: 'h', text: 'Beförderung im Detail' },
    { type: 'bullets', items: [
      '**SL-Beförderung**: aus dem Kollegium oder durch externe Bewerbung. Eignungsverfahren + Auswahlkommission.',
      '**Konrektor:in**: schulinterne Bewerbung; Reg-Zustimmung.',
      '**Beratungs-LK / Schulpsych**: zusätzliche Qualifikation; Reg.',
      '**Beurteilung**: Grundlage Beförderung. SL beurteilt LK ({{§ 24 LDO}}); Schulamt-Vertretung beurteilt SL.',
    ]},

    { type: 'h', text: 'Personalvertretung Art. 75 BayPVG' },
    { type: 'p', text:
      '**Mitbestimmungs-Recht** des Personalrats bei Einstellung, Versetzung, Beförderung. **Ohne Zustimmung** des Personalrats ist die Maßnahme **unwirksam**. Höchste Beteiligungsstufe (im Unterschied zur Mitwirkung Art. 76 BayPVG = Stellungnahme ohne Veto, → mp06 A.5).'
    },

    { type: 'warn', titel: '⚠ Fallen Personalverwaltung', text:
      '**Einstellung ist Reg-Sache** — nicht Schulamt allein (das setzt um). **Versetzung intern ≠ übergreifend** — zwei verschiedene Zuständigkeiten. **Personalrat-Mitbestimmung ist Pflicht** — ohne Zustimmung unwirksam. **Beurteilung der SL** kommt vom Schulamt (Schulrat:rätin), nicht von Kollegen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer ist für die Einstellung von MS-Lehrkräften zuständig?',
        a: 'Die Bezirksregierung (Reg). Umsetzung über das Staatl. Schulamt.' },
      { q: 'Was ist der Unterschied Mitbestimmung vs. Mitwirkung?',
        a: 'Mitbestimmung ({{Art. 75}} BayPVG) = Zustimmungspflicht; ohne Personalrats-Zustimmung Maßnahme unwirksam. Mitwirkung (Art. 76 BayPVG) = Stellungnahme ohne Vetorecht.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Schulentwicklung wird durch **externe Evaluation** + **KMBek-Steuerung** + **Beratung** begleitet. Aufsicht ist nicht Mikromanagement — Schulen haben Eigenverantwortung ({{Art. 2}} BayEUG) im Rahmen der Aufsicht.'
    },

    { type: 'h', text: 'Externe Evaluation' },
    { type: 'bullets', items: [
      '**Rhythmus**: i.d.R. 5-7-jährig pro Schule.',
      '**Trägerschaft**: Reg-Teams (qualifizierte SL + ext. Berater:innen).',
      '**Fokus**: U.-Qualität, Schulprogramm, Personalführung, Schulklima.',
      '**Methode**: Hospitation + Interviews + Fragebogen + Aktenanalyse.',
      '**Output**: Bericht + **Zielvereinbarung** SL ↔ Reg + **Folge-Evaluation** in 2-3 J.',
    ]},

    { type: 'h', text: 'KMBek-Steuerung' },
    { type: 'p', text:
      'KM gibt Schwerpunkte vor: **Digitalisierung** (Medienkonzepte, IT-Ausstattung) · **Inklusion** ({{Art. 30a}} BayEUG, Profil-Schulen) · **ndM-Förderung** (Deutschklassen, DaZ) · **Berufliche Orientierung** (BO-Konzepte). Konkretisierung über KMBek + KMS.'
    },

    { type: 'h', text: 'Schulinspektion (Sonderform)' },
    { type: 'bullets', items: [
      'Bei Auffälligkeiten (massive Beschwerden, Konflikt-Eskalation, Sicherheits-Vorfälle).',
      'Außerplanmäßiger Besuch durch Reg-Team.',
      'Akten-Prüfung + Personen-Befragung.',
      'Folge: Maßnahmen-Katalog, ggf. Personal-Konsequenzen.',
    ]},

    { type: 'h', text: 'Beratung Schulberatungsstelle' },
    { type: 'p', text:
      'Jede Reg hat eine **Staatliche Schulberatungsstelle** (z.B. SBOst in München, SBN in Nürnberg). Schulart-übergreifend. Aufgaben: SL-Coaching, KL-Konfliktberatung, Schulentwicklungs-Begleitung, Krisenintervention. (Cross-Ref MP_08 A.3.)'
    },

    { type: 'warn', titel: '⚠ Fallen Schulentwicklung + Aufsicht-Praxis', text:
      '**Externe Evaluation ist nicht jedes SJ** — 5-7-jährig. **Schulinspektion ≠ Externe Evaluation** — Sonderform bei Auffälligkeit. **KMBek-Steuerung** ist verbindlich; Schulversuche brauchen KM-Zustimmung. **Schulberatungsstelle** ist Beratungs-, nicht Aufsichts-Institution.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wie häufig findet eine externe Evaluation pro Schule statt?',
        a: 'In der Regel alle 5-7 Schuljahre. Bei Auffälligkeit: Schulinspektion (Sonderform).' },
      { q: 'Wer ist Träger der externen Evaluation?',
        a: 'Die Bezirksregierung (Reg) mit qualifizierten SL + externen Berater:innen.' },
    ]},
  ],

};
