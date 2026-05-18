// MP_07 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Die LK-Verantwortung im Schuldienst ist eine **Drei-Pfad-Haftung**: Zivil/Amtshaftung · Disziplinarrecht · Strafrecht — drei Schienen, drei Anspruchsgrundlagen, drei Adressaten der Außenhaftung. Sie laufen **kumulativ**, ohne {{Art. 103/3 GG}} ne-bis-in-idem-Verstoß.'
    },

    { type: 'svg', titel: 'Haftungsdreieck im Schuldienst',
      caption: '3 Schienen · kumulativ · ne bis in idem nur Strafrecht',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" preserveAspectRatio="xMidYMid meet">
  <polygon points="300,40 80,280 520,280" class="rule-line" stroke-width="1.5" fill="none"/>
  <g>
    <text x="300" y="32" text-anchor="middle" font-size="11" font-weight="600" data-accent="true">ZIVIL / AMTSHAFTUNG</text>
    <text x="300" y="50" text-anchor="middle" font-size="10">§ 839 BGB · Art. 34 GG</text>
    <text x="300" y="66" text-anchor="middle" font-size="9.5" class="muted">außen: Freistaat haftet</text>
    <text x="300" y="80" text-anchor="middle" font-size="9.5" class="muted">Rückgriff nur Vorsatz +</text>
    <text x="300" y="94" text-anchor="middle" font-size="9.5" class="muted">grobe Fahrlässigkeit</text>
  </g>
  <g>
    <text x="80" y="298" text-anchor="middle" font-size="11" font-weight="600" data-accent="true">DISZIPLINAR</text>
    <text x="80" y="313" text-anchor="middle" font-size="10">§ 47 BeamtStG</text>
    <text x="100" y="226" text-anchor="middle" font-size="10">Art. 6 BayDG</text>
    <text x="100" y="244" text-anchor="middle" font-size="9.5" class="muted">5 Stufen Lebenszeit</text>
    <text x="100" y="258" text-anchor="middle" font-size="9.5" class="muted">+ 2 Stufen Ruhestand</text>
  </g>
  <g>
    <text x="520" y="298" text-anchor="middle" font-size="11" font-weight="600" data-accent="true">STRAFRECHT</text>
    <text x="520" y="313" text-anchor="middle" font-size="10">StGB</text>
    <text x="510" y="226" text-anchor="middle" font-size="10">§ 229 · § 203 · § 174</text>
    <text x="510" y="244" text-anchor="middle" font-size="9.5" class="muted">LK persönlich</text>
    <text x="510" y="258" text-anchor="middle" font-size="9.5" class="muted">Schuldprinzip</text>
  </g>
  <text x="300" y="180" text-anchor="middle" font-size="9" letter-spacing="2" class="muted">KUMULATIV</text>
  <text x="300" y="196" text-anchor="middle" font-size="9" letter-spacing="1.5" class="muted">Art. 103/3 GG nur „allgemeine Strafgesetze"</text>
  <text x="300" y="210" text-anchor="middle" font-size="9" letter-spacing="1.5" class="muted">Disziplinar = Sonderrecht ≠ ne bis in idem</text>
</svg>`
    },

    { type: 'h', text: 'Drei-Pfad-Tabelle' },
    { type: 'table',
      head: ['Schiene', 'Anspruchsgrundlage', 'Außenhaftung', 'Rückgriff/persönlich'],
      rows: [
        ['**Zivil/Amtshaftung**', '{{§ 839 BGB}} + {{Art. 34 GG}}', '**Freistaat Bayern**', 'Rückgriff auf LK NUR bei Vorsatz + grober Fahrlässigkeit'],
        ['**Disziplinarrecht**', '{{§ 47 BeamtStG}} + {{Art. 6 BayDG}}', 'LK persönlich (Dienstherr → LK)', '5 Stufen Lebenszeit + 2 Ruhestand'],
        ['**Strafrecht**', 'StGB ({{§ 229 StGB}} · {{§ 203 StGB}} · {{§ 174 StGB}})', 'LK persönlich (Schuld)', 'Kumulativ neben Disziplinar zulässig'],
      ],
    },

    { type: 'h', text: 'ne bis in idem — Wortlaut zählt' },
    { type: 'p', text:
      'Verbatim {{Art. 103/3 GG}}: „Niemand darf wegen derselben Tat auf Grund der **allgemeinen Strafgesetze** mehrmals bestraft werden." Disziplinarrecht ist **Sonderrecht** für Beamte, **kein „allgemeines Strafrecht"** — Strafverfahren + Disziplinarverfahren laufen daher **kumulativ**. Schulrechtliche Erziehungs-/Ordnungsmaßnahmen unterliegen Art. 103/3 GG nur analog über den Verhältnismäßigkeitsgrundsatz.'
    },

    { type: 'h', text: 'Bund-Land-Trennschärfe' },
    { type: 'bullets', items: [
      '**Bund**: {{§ 47 BeamtStG}} (Dienstvergehen-Tatbestand) · {{Art. 34 GG}} (Staatshaftung) · {{§ 839 BGB}} (Amtspflichtverletzung) · StGB (Strafrecht) · {{Art. 33/5 GG}} (Berufsbeamtentum-Anker).',
      '**Land Bayern**: {{Art. 6 BayDG}} ff. (Maßnahmen-Katalog) · BayBG · LDO · BaySchO · BayEUG.',
      '**Falle**: Berufsbeamtentum-Anker = {{Art. 33/5 GG}}, NICHT BV Art. 130 (stale Sekundärquellen-Pfad).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Haftungsdreieck', text:
      'Außenhaftung trifft **Freistaat** ({{Art. 34 GG}}) — Eltern verklagen Staat, nicht LK. **Rückgriff Freistaat → LK NUR bei Vorsatz oder grober Fahrlässigkeit** (Art. 34 S. 2 GG). Strafrecht + Disziplinarrecht + Zivilrecht laufen **parallel** — KEINE Doppelbestrafung i.S.d. {{Art. 103/3 GG}} (gilt nur „allgemeine Strafgesetze"). **Tatbestand** des Dienstvergehens steht in {{§ 47 BeamtStG}} (Bund), nicht in BayDG. Aufsichtspflicht-Substrat → Cross-Ref MP_06 A.2.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Schienen umfasst das Haftungsdreieck — und wer haftet jeweils nach außen?',
        a: 'Zivil/Amtshaftung ({{§ 839 BGB}} + {{Art. 34 GG}}): Freistaat haftet außen. Disziplinar ({{§ 47 BeamtStG}} + {{Art. 6 BayDG}}): LK persönlich. Strafrecht (StGB): LK persönlich (Schuldprinzip). Alle drei laufen kumulativ.' },
      { q: 'Warum verstößt die parallele Strafe + Disziplinarmaßnahme NICHT gegen ne bis in idem?',
        a: '{{Art. 103/3 GG}} Wortlaut: „allgemeine Strafgesetze". Disziplinarrecht ist Sonderrecht für Beamte, kein „allgemeines Strafrecht" — beide Verfahren laufen kumulativ. Auch schulrechtliche EOM unterliegen Art. 103/3 nur analog über Verhältnismäßigkeit.' },
      { q: 'Wo steht der Tatbestand des Dienstvergehens — und wo der Maßnahmen-Katalog?',
        a: 'Tatbestand: {{§ 47 BeamtStG}} (Bund). Maßnahmen: {{Art. 6 BayDG}} (Bayern). 5-Stufen Lebenszeit + 2 Ruhestand. Wer beide vermischt, fällt in die Bund-Land-Trennschärfe-Falle.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      '{{§ 839 BGB}} formt den Anspruch gegen den Beamten persönlich. {{Art. 34 GG}} **leitet die Haftung an den Staat um** — Außenhaftung trifft den Freistaat. **Rückgriff** auf die LK **nur bei Vorsatz oder grober Fahrlässigkeit** (Art. 34 S. 2 GG).'
    },

    { type: 'h', text: 'Konstruktion (Vier Schritte)' },
    { type: 'numbered', items: [
      'Tatbestandsprüfung: {{§ 839 BGB}} → Schadensersatzanspruch des Dritten gegen Beamten persönlich.',
      'Haftungsverlagerung: {{Art. 34 GG}} S. 1 → Anspruch trifft den STAAT (Freistaat Bayern), nicht die LK.',
      'Rückgriff: {{Art. 34 GG}} S. 2 → Staat kann auf LK NUR bei Vorsatz oder grober Fahrlässigkeit zurückgreifen.',
      'Beweislast: Staat trägt die Beweislast für Vorsatz/grobe Fahrlässigkeit (Rspr.).',
    ]},

    { type: 'h', text: 'Faustregel Verschuldensformen' },
    { type: 'bullets', items: [
      '**Einfache Fahrlässigkeit** = „Das kann vorkommen" → KEIN Rückgriff.',
      '**Grobe Fahrlässigkeit** = „Das DARF NICHT vorkommen" → Rückgriff möglich.',
      '**Vorsatz** = wissentlich + willentlich → Rückgriff sicher.',
    ]},

    { type: 'h', text: 'Antwort-Schema Amtshaftung' },
    { type: 'numbered', items: [
      'Pflichtverletzung benennen (z.B. Aufsichtspflichtverletzung {{§ 5 LDO}}).',
      'Schaden + Kausalität feststellen.',
      'Anspruchsgrundlage {{§ 839 BGB}} i.V.m. {{Art. 34 GG}}.',
      'Außenhaftung Freistaat erläutern.',
      'Verschulden bewerten (einfach / grob / Vorsatz) → Rückgriff-Frage.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Amtshaftung', text:
      'Außenhaftung trifft **Freistaat**, nicht LK. Bei **einfacher Fahrlässigkeit** kein Rückgriff — Berufsausübung sonst gelähmt. **Beweislast** für Vorsatz/grobe F. liegt beim Staat. Im privaten Bereich greift Art. 34 NICHT — Privat-Haftpflicht.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wann darf der Freistaat auf die LK Regress nehmen — und wer trägt die Beweislast?',
        a: '{{Art. 34 GG}} S. 2: NUR bei Vorsatz oder grober Fahrlässigkeit. Bei einfacher Fahrlässigkeit kein Rückgriff. Beweislast: Freistaat. Faustregel: einfach = „kann vorkommen"; grob = „darf nicht vorkommen"; Vorsatz = wissentlich + willentlich.' },
      { q: 'Welche vier Schritte gehören in das Amtshaftungs-Antwortschema?',
        a: 'Pflichtverletzung → Schaden + Kausalität → {{§ 839 BGB}} + {{Art. 34 GG}} → Außenhaftung Freistaat + Verschulden bewerten (Rückgriff). Privatbereich: {{Art. 34 GG}} greift nicht.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Das bayerische Disziplinarrecht kennt **5 Stufen Lebenszeit + 2 Stufen Ruhestand** ({{Art. 6 BayDG}}). Tatbestand „Dienstvergehen" steht in **{{§ 47 BeamtStG}}** (Bund-Land-Trennschärfe). Subsidiaritäts- und Verhältnismäßigkeits-Prinzipien gelten parallel.'
    },

    { type: 'h', text: '5 Stufen Lebenszeit-Beamte (Abs. 1)' },
    { type: 'table',
      head: ['Stufe', 'Maßnahme', 'Norm', 'Wirkung'],
      rows: [
        ['1', 'Verweis', '{{Art. 7 BayDG}}', 'Schriftlicher Tadel; bleibt in Personalakte'],
        ['2', 'Geldbuße', '{{Art. 8 BayDG}}', 'Bis Höhe monatlicher Dienstbezüge'],
        ['3', 'Kürzung Dienstbezüge', '{{Art. 9 BayDG}}', 'Max. 1/5 für längstens 3 Jahre'],
        ['4', 'Zurückstufung', '{{Art. 10 BayDG}}', 'In niedrigere Besoldungsgruppe'],
        ['5', 'Entfernung aus Beamtenverhältnis', '{{Art. 11 BayDG}}', 'Beendigung — höchste Stufe'],
      ],
    },

    { type: 'h', text: '2 Stufen Ruhestand (Abs. 2)' },
    { type: 'table',
      head: ['Stufe', 'Maßnahme', 'Norm', 'Wirkung'],
      rows: [
        ['1', 'Kürzung Ruhegehalt', '{{Art. 12 BayDG}}', 'Max. 1/5 für längstens 3 Jahre'],
        ['2', 'Aberkennung Ruhegehalt', '{{Art. 13 BayDG}}', 'Verlust Ruhegehalt-Anspruch (Härtefall möglich)'],
      ],
    },

    { type: 'h', text: '§ 47 BeamtStG — Tatbestand' },
    { type: 'p', text:
      'Verbatim Abs. 1: „Beamte begehen ein Dienstvergehen, wenn sie schuldhaft die ihnen obliegenden Pflichten verletzen. Verhalten außerhalb des Dienstes ist nur dann ein Dienstvergehen, wenn es nach den Umständen des Einzelfalls in besonderem Maße geeignet ist, das Vertrauen in einer für ihr Amt bedeutsamen Weise zu beeinträchtigen." Hohe Schwelle für außerdienstliches Verhalten — Einzelfall-Bewertung.'
    },

    { type: 'warn', titel: '⚠ Fallen BayDG-Katalog', text:
      'BayDG kennt **5 + 2 Stufen** — nicht „7 ohne Trennung". **Tatbestand in {{§ 47 BeamtStG}}** (Bund), NICHT BayDG Art. 6. Außerdienstliches Verhalten erfasst nur bei „bedeutsamer" Amts-Beeinträchtigung — hohe Schwelle.',
    },

    { type: 'selfcheck', items: [
      { q: 'Nenne die fünf Stufen der BayDG-Maßnahmen bei Lebenszeit-Beamten in aufsteigender Schwere.',
        a: '(1) Verweis ({{Art. 7 BayDG}}) · (2) Geldbuße ({{Art. 8 BayDG}}) · (3) Kürzung Dienstbezüge ({{Art. 9 BayDG}}) · (4) Zurückstufung ({{Art. 10 BayDG}}) · (5) Entfernung aus Beamtenverhältnis ({{Art. 11 BayDG}}). Plus 2 Ruhestands-Stufen ({{Art. 12 BayDG}} + {{Art. 13 BayDG}}).' },
      { q: 'Wann erfasst § 47 BeamtStG außerdienstliches Verhalten?',
        a: 'Hohe Schwelle: nur, wenn „nach den Umständen des Einzelfalls in besonderem Maße geeignet, das Vertrauen in einer für ihr Amt bedeutsamen Weise zu beeinträchtigen". Bei LK sind Straftaten gegen K/J wegen Vorbildfunktion regelmäßig amtsbezogen.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Die strafrechtliche Schiene trifft die LK persönlich (Schuldprinzip). Drei Tatbestände sind besonders relevant: {{§ 229 StGB}} fahrl. KV (Aufsichtsfall) · {{§ 203 StGB}} Berufsgeheimnis (Schulpsych. zwingend, LK i.d.R. nicht) · {{§ 174 StGB}} sex. Missbrauch Schutzbefohlener (gravierend).'
    },

    { type: 'h', text: 'StGB-Tatbestände in der Schul-Praxis' },
    { type: 'table',
      head: ['Norm', 'Tatbestand', 'Schul-Relevanz'],
      rows: [
        ['{{§ 229 StGB}}', 'Fahrlässige Körperverletzung', 'Aufsichtsversagen mit KV-Folge (Kausalität + Vorhersehbarkeit erforderlich)'],
        ['{{§ 203 StGB}}', 'Verletzung Privatgeheimnisse durch geschützte Berufsgruppen', 'Schulpsych. zwingend erfasst; LK i.d.R. NICHT — aber {{§ 14 LDO}} greift'],
        ['{{§ 174 StGB}}', 'Sex. Missbrauch Schutzbefohlener (Erziehungs-/Ausbildungsverhältnis)', 'Hohe Strafe + Disziplinarmaßnahme bis Entfernung; LK in besonderem Vertrauensverhältnis'],
      ],
    },

    { type: 'h', text: '§ 203 StGB ≠ § 14 LDO' },
    { type: 'bullets', items: [
      '**{{§ 203 StGB}}** erfasst spezifische Berufsgruppen mit „geschütztem Privatgeheimnis": Ärzte, Anwälte, Schulpsychologen, Beratungslehrkräfte mit psychotherapeutischer Approbation. **LK regulär NICHT direkt erfasst.**',
      '**{{§ 14 LDO}}** Verschwiegenheits-Pflicht greift FÜR ALLE LK. Verstoß = Dienstvergehen iSd {{§ 47 BeamtStG}}.',
      'Bei LK-Verschwiegenheitsbruch: Disziplinar-Schiene + ggf. zivile Schadensersatz-Haftung — meist KEINE Strafbarkeit nach § 203 StGB.',
    ]},

    { type: 'h', text: 'Schuldprinzip — Strafe trifft persönlich' },
    { type: 'p', text:
      'Anders als bei {{Art. 34 GG}} Amtshaftung trifft die strafrechtliche Sanktion die LK PERSÖNLICH. Der Freistaat haftet nicht für Strafen. Schuldprinzip Art. 1/1 + Art. 2/1 GG i.V.m. Art. 103/2 GG. Schuld als Höchstmaß-Grenze der Strafe.'
    },

    { type: 'warn', titel: '⚠ Fallen Strafrechts-Schnittstelle', text:
      '**Strafe trifft Täter persönlich** — Freistaat haftet NICHT. {{§ 203 StGB}} erfasst LK i.d.R. NICHT direkt; § 14 LDO greift dagegen für alle LK. Aufsichtsversagen ohne KV-Folge ist KEINE {{§ 229 StGB}}. Bei {{§ 174 StGB}} sex. Missbrauch: Strafe + Disziplinar regelmäßig bis Entfernung kumulativ.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei StGB-Tatbestände sind im Schul-Kontext am häufigsten?',
        a: '{{§ 229 StGB}} fahrl. KV (Aufsichtsversagen mit Folge), {{§ 203 StGB}} Berufsgeheimnis (Schulpsych. zwingend, LK nicht direkt), {{§ 174 StGB}} sex. Missbrauch Schutzbefohlener (gravierend, regelmäßig Entfernung).' },
      { q: 'Warum greift § 203 StGB nicht direkt bei jeder LK — und was greift stattdessen?',
        a: '§ 203 erfasst spezifische Berufsgruppen mit geschütztem Privatgeheimnis (Ärzte, Schulpsych.). LK regulär NICHT direkt. Stattdessen {{§ 14 LDO}} Verschwiegenheits-Pflicht für ALLE LK — Verstoß ist Dienstvergehen iSd {{§ 47 BeamtStG}}.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Die drei Verschuldensformen entscheiden über Rückgriff und Strafmaß. **Einfache Fahrlässigkeit** („kann vorkommen") · **grobe Fahrlässigkeit** („darf nicht vorkommen") · **Vorsatz** (wissentlich + willentlich). Die Einstufung trägt die Beweislast des Freistaats.'
    },

    { type: 'h', text: 'Drei Stufen — Faustregel' },
    { type: 'table',
      head: ['Stufe', 'Definition', 'Rückgriff'],
      rows: [
        ['**Einfache Fahrlässigkeit**', '„Das kann vorkommen" — durchschnittliche Sorgfaltsverletzung', '**Kein Rückgriff** ({{Art. 34 GG}} S. 2)'],
        ['**Grobe Fahrlässigkeit**', '„Das darf nicht vorkommen" — gravierende Sorgfaltsverletzung, einfachste Erwägungen außer Acht', 'Rückgriff **möglich** (Ermessen Freistaat)'],
        ['**Vorsatz**', 'Wissentlich + willentlich — Pflichtverletzung gewollt', 'Rückgriff **sicher**'],
      ],
    },

    { type: 'h', text: 'Wirkung auf Schienen' },
    { type: 'bullets', items: [
      '**Zivil/Amtshaftung**: Verschulden-Form entscheidet über Rückgriff.',
      '**Disziplinar**: Verschulden ist Tatbestandselement ({{§ 47 BeamtStG}} „schuldhaft"); Stufe der Maßnahme richtet sich auch nach Verschulden.',
      '**Strafrecht**: bei {{§ 229 StGB}} reicht Fahrlässigkeit; bei vorsätzlichen Tatbeständen ({{§ 174 StGB}}) Vorsatz erforderlich.',
    ]},

    { type: 'warn', titel: '⚠ Falle Verschulden', text:
      '**Einfache Fahrlässigkeit** = kein Rückgriff. Berufsausübung wäre sonst gelähmt. **Grobe Fahrlässigkeit**-Schwelle ist hoch — nicht jede Fehlleistung ist grob. **Beweislast** trägt der Freistaat. Gericht prüft Einzelfall.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Verschuldensformen unterscheidet die Rechtsprechung — und wann gibt es Rückgriff?',
        a: 'Einfache Fahrlässigkeit („kann vorkommen") → KEIN Rückgriff. Grobe Fahrlässigkeit („darf nicht vorkommen") → Rückgriff möglich. Vorsatz (wissentlich + willentlich) → Rückgriff sicher. Beweislast trägt der Freistaat ({{Art. 34 GG}} S. 2).' },
      { q: 'Wo greift Verschulden in den drei Haftungsschienen?',
        a: 'Zivil: Rückgriff-Schwelle ({{Art. 34 GG}}). Disziplinar: Tatbestand „schuldhaft" ({{§ 47 BeamtStG}}); Stufenwahl. Strafrecht: bei {{§ 229 StGB}} Fahrlässigkeit ausreichend; bei {{§ 174 StGB}} Vorsatz erforderlich.' },
    ]},
  ],
};
