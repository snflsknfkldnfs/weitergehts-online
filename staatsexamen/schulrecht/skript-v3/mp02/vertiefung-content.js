// MP_02 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Hausaufgaben sind nach {{§ 28 BaySchO}} ein **notwendiger und verbindlicher** Teil der Unterrichts- und Erziehungsarbeit — Stellpflicht der LK. Der Examens-Kern: drei Sätze in Abs. 1 (Maßstab + LK-Konferenz + Pause) + GS-Spezifik in Abs. 2.'
    },

    { type: 'h', text: 'Drei-Sätze-Logik § 28 Abs. 1' },
    { type: 'table',
      head: ['Satz', 'Inhalt', 'Falle'],
      rows: [
        ['**S. 1**', 'Zweck (Einübung + Eigentätigkeit) + Maßstab „durchschnittliches Leistungsvermögen + angemessene Zeit + NM-U./prakt. Ausbildung"', 'Wortlaut: „durchschnittliches", NICHT „individuelles" Leistungsvermögen'],
        ['**S. 2**', '**LK-Konferenz** legt vor Schuljahresbeginn die Grundsätze fest', 'Pflicht, nicht optional'],
        ['**S. 3**', '**Sonntage UND Feiertage UND Ferien** freihalten', 'Drei Kategorien (Wortlaut!) — kein Spielraum'],
      ],
    },

    { type: 'h', text: 'Verbindlichkeitsgrad' },
    { type: 'bullets', items: [
      '**Müssen HA gestellt werden?** JA — Stellpflicht aus {{§ 28 BaySchO}} Abs. 1 S. 1.',
      '**Sind HA ein LNW?** NEIN — folgt aus LNW-Definition ({{Art. 52 BayEUG}}) + Lehrplan, NICHT aus § 28 selbst.',
      '**Müssen HA benotet werden?** NEIN — Benotungs-VERBOT mittelbar aus LNW-Definition. HA dienen Einübung.',
      '**Welche Zeitobergrenze?** GS + GS-Stufe FöS: bis zu 1 Stunde (§ 28/2 S. 1). MS: keine feste Obergrenze.',
    ]},

    { type: 'h', text: 'GS+FöS-Sonderregel bei NM-Unterricht' },
    { type: 'p', text:
      '§ 28 Abs. 2 S. 3 BaySchO: An Tagen mit verpflichtendem Nachmittagsunterricht dürfen an Grundschulen + Förderschulen KEINE schriftlichen HA für den nächsten Tag gestellt werden. Abweichung nur im Einvernehmen mit dem Elternbeirat. Schul-Adressat ausschließlich GS + GS-Stufe FöS (NICHT Mittelschule).'
    },

    { type: 'warn', titel: '⚠ Fallen § 28 BaySchO', text:
      'Maßstab im Wortlaut: „**durchschnittliches Leistungsvermögen**" — NICHT „individuelle Bearbeitbarkeit". LK-Konferenz-Grundsätze sind PFLICHT (§ 28/1 S. 2). DREI Kategorien Pause (S. 3) — Sonntag, Feiertag, Ferien.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Pflichten formuliert § 28 Abs. 1 BaySchO — und welcher Satz schützt die Erholung?',
        a: 'S. 1 Stellpflicht + Maßstab durchschnittlich-bearbeitbar. S. 2 LK-Konferenz-Grundsätze vor Schuljahresbeginn. S. 3 Sonntage, Feiertage UND Ferien freihalten — DREI Kategorien.' },
      { q: 'Warum sind HA in der Regel kein LNW — und woher kommt das Benotungs-Verbot?',
        a: 'Nicht aus § 28 BaySchO selbst (Drift-Falle!), sondern aus der LNW-Definition {{Art. 52 BayEUG}} + Lehrplan-Vorgaben. HA dienen Einübung, nicht Leistungsbewertung.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Die Frage „wieviel HA?" beantwortet sich schulart-spezifisch. Das **1-Stunde-Limit gilt NUR für Grundschule + Förderschulen-Grundschulstufe** — in der Mittelschule existiert KEINE feste Obergrenze. HA-Differenzierung ist in {{§ 32 BaySchO}} Abs. 2 Nr. 6 verankert, NICHT in § 28.'
    },

    { type: 'h', text: 'Maßstab-Tabelle „angemessene Zeit"' },
    { type: 'table',
      head: ['Schulart', 'Zeitobergrenze', 'Norm'],
      rows: [
        ['**Grundschule + GS-Stufe FöS**', '„bis zu einer Stunde" als angemessen', '§ 28/2 S. 1 BaySchO'],
        ['**Mittelschule**', 'KEINE feste Obergrenze; Maßstab „angemessen" + LK-Konferenz', '§ 28/1 S. 1+2 BaySchO'],
        ['**Förderschulen (sonst)**', 'individuelle Leistungsfähigkeit', '§ 28/2 S. 2 BaySchO'],
        ['**Mit verpflichtendem NM-U. (GS+FöS)**', 'KEINE schriftlichen HA für nächsten Tag', '§ 28/2 S. 3 BaySchO'],
      ],
    },

    { type: 'h', text: '§ 32 BaySchO — Individuelle Unterstützung' },
    { type: 'bullets', items: [
      'Abs. 1 S. 1: Maßnahmen „**soweit nicht die Leistungsfeststellung berührt wird**" (Abgrenzung Nachteilsausgleich § 33).',
      'Abs. 2 — 7-Maßnahmen-Katalog: besondere Arbeitsmittel · Räume · individuelle Pausen · Hand-/Lautzeichen · Arbeitsanweisungen · **Nr. 6 HA-Differenzierung** schulartspezifisch · Visualisierung/Verbalisierung.',
      '**Schlüssel-Insight**: HA-Differenzierung lebt in {{§ 32 BaySchO}}, NICHT in {{§ 28 BaySchO}}!',
    ]},

    { type: 'h', text: 'Drei-Stunden-Fall MS — Diagnose-Pfad' },
    { type: 'numbered', items: [
      '**Individuelles Problem**: SuS braucht mehr Zeit (Förderbedarf · Konzentration · LRS · ADHS). → § 32/2 Nr. 6 Differenzierung.',
      '**Systemisches Problem**: HA-Gestaltung zu umfangreich / didaktisch ungeeignet. → LK-Konferenz-Grundsätze § 28/1 S. 2 überprüfen.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Zeit + Differenzierung', text:
      '**MS hat KEINE 1-Stunde-Obergrenze.** Wer das aus § 28/2 S. 1 ableitet, verwechselt Schularten. **§ 28 ≠ § 32**: HA-Differenzierung in {{§ 32 BaySchO}}/2 Nr. 6. **Schranke § 32/1 S. 1**: Differenzierung NUR, „soweit nicht Leistungsfeststellung berührt" — bei LNW kein Differenzierungs-Spielraum (sondern Nachteilsausgleich § 33).',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Norm regelt die HA-Differenzierung — und wo verläuft die Schranke?',
        a: '{{§ 32 BaySchO}} Abs. 2 Nr. 6 (NICHT § 28!). Schranke § 32/1 S. 1: „soweit nicht die Leistungsfeststellung berührt wird". Bei LNW = Nachteilsausgleich § 33 statt Differenzierung.' },
      { q: 'Was unterscheidet GS-Maßstab und MS-Maßstab in § 28 BaySchO?',
        a: 'GS + GS-Stufe FöS: feste „bis zu 1 Stunde"-Obergrenze (§ 28/2 S. 1). MS: KEINE feste Obergrenze — nur Maßstab „angemessen" (S. 1) + LK-Konferenz-Grundsätze (S. 2).' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      '{{Art. 56/2 BayEUG}} listet **5 SuS-Rechte** — Nr. 5 ist die Beschwerde-Eskalations-Kette: „**nacheinander** an Lehrkräfte, Schulleitung und Schulforum". Wortlaut „nacheinander" = sequenziell, NICHT parallel. Eltern-Beschwerde läuft separat über Art. 76 BayEUG + Elternbeirat.'
    },

    { type: 'h', text: '5 SuS-Rechte aus Art. 56/2' },
    { type: 'numbered', items: [
      'Sich am Schulleben beteiligen.',
      'Im Rahmen Schulordnung + Lehrpläne mitwirken.',
      'Hinreichend unterrichtet werden über wesentliche Angelegenheiten.',
      'Auskunft über Leistungsstand UND Hinweise auf Förderung.',
      '**Bei ungerechter Behandlung/Beurteilung nacheinander LK → SL → Schulforum.**',
    ]},

    { type: 'h', text: 'Drei-Stufen-Beschwerde-Kette' },

    { type: 'svg', titel: 'Beschwerde-Kette · Art. 56/2 Nr. 5 BayEUG',
      caption: 'nacheinander — sequenziell, nicht parallel',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="300" y="18" text-anchor="middle" font-size="9.5" letter-spacing="1.8" class="muted">SEQUENZIELL · NICHT PARALLEL</text>
  <g>
    <rect x="40" y="40" width="150" height="80" class="box"/>
    <text x="115" y="60" text-anchor="middle" font-size="10.5" letter-spacing="1.2" data-accent="true" font-weight="600">STUFE 1</text>
    <line x1="50" y1="68" x2="180" y2="68" class="rule-line"/>
    <text x="115" y="88" text-anchor="middle" font-size="11" font-weight="600">Lehrkraft</text>
    <text x="115" y="104" text-anchor="middle" font-size="9.5" class="muted">KL bei Querthemen</text>
    <text x="115" y="116" text-anchor="middle" font-size="9.5" class="muted">Erstadressat</text>
  </g>
  <path d="M 200 80 L 230 80" class="rule-line" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="215" y="72" text-anchor="middle" font-size="8.5" class="muted">scheitert</text>
  <g>
    <rect x="225" y="40" width="150" height="80" class="box"/>
    <text x="300" y="60" text-anchor="middle" font-size="10.5" letter-spacing="1.2" data-accent="true" font-weight="600">STUFE 2</text>
    <line x1="235" y1="68" x2="365" y2="68" class="rule-line"/>
    <text x="300" y="88" text-anchor="middle" font-size="11" font-weight="600">Schulleitung</text>
    <text x="300" y="104" text-anchor="middle" font-size="9.5" class="muted">Art. 57 BayEUG</text>
    <text x="300" y="116" text-anchor="middle" font-size="9.5" class="muted">systemische Klärung</text>
  </g>
  <path d="M 385 80 L 415 80" class="rule-line" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="400" y="72" text-anchor="middle" font-size="8.5" class="muted">scheitert</text>
  <g>
    <rect x="410" y="40" width="150" height="80" class="box"/>
    <text x="485" y="60" text-anchor="middle" font-size="10.5" letter-spacing="1.2" data-accent="true" font-weight="600">STUFE 3</text>
    <line x1="420" y1="68" x2="550" y2="68" class="rule-line"/>
    <text x="485" y="88" text-anchor="middle" font-size="11" font-weight="600">Schulforum</text>
    <text x="485" y="104" text-anchor="middle" font-size="9.5" class="muted">Art. 69 BayEUG</text>
    <text x="485" y="116" text-anchor="middle" font-size="9.5" class="muted">letzte schul-int. Instanz</text>
  </g>
  <line x1="40" y1="155" x2="560" y2="155" class="rule-line"/>
  <text x="300" y="178" text-anchor="middle" font-size="10" font-weight="600" data-accent="true">Eltern-Beschwerde getrennt</text>
  <text x="300" y="195" text-anchor="middle" font-size="9.5" class="muted">Art. 76 BayEUG · Elternbeirat Art. 64/65</text>
  <text x="300" y="210" text-anchor="middle" font-size="9.5" class="muted">Lockerung bei Befangenheit zulässig</text>
  <defs>
    <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
</svg>`
    },

    { type: 'table',
      head: ['Stufe', 'Adressat', 'Hinweis'],
      rows: [
        ['1', 'Lehrkraft (KL bei Querthemen)', 'Erstadressat'],
        ['2', 'Schulleitung', 'Wenn LK-Klärung scheitert'],
        ['3', 'Schulforum', 'Letzte schulinterne Instanz'],
      ],
    },

    { type: 'h', text: 'KL-Stufenplan (Praxis-Choreographie)' },
    { type: 'numbered', items: [
      '**Sondierungsgespräch Eltern** (Arbeitsplatz, Ablenkungen, Block-Arbeit, Lernbeeinträchtigungen, Zeit-pro-Fach) — {{Art. 76 BayEUG}} + {{§ 14 LDO}} Verschwiegenheit.',
      '**Austausch Fach-LK** (welche Aufgaben? Koordination? Häufung?) — {{§ 6/2 LDO}} KL-Koordinationspflicht + {{§ 22 BaySchO}} LK-Konferenz-Forum.',
      '**LK-Konferenz** — Grundsätze {{§ 28 BaySchO}}/1 S. 2 prüfen + ggf. neu beschließen.',
      '**Elternbeirat** ({{Art. 64 BayEUG}}/{{Art. 65 BayEUG}}) bei Klassen-/Schul-Klima-Berührung.',
      '**Schulleitung** ({{Art. 57 BayEUG}}) bei systemischer Klärung.',
    ]},

    { type: 'warn', titel: '⚠ Falle Beschwerde-Kette', text:
      '„**Nacheinander**" ist Wortlaut — NICHT „parallel an alle drei Stellen". Maßstab „**entsprechend Alter und Stellung im Schulverhältnis**" — kein 1:1-Rechte-Übertrag von Erwachsenen. Nr. 4 = Auskunft Leistungsstand UND Förderhinweise (beides!). Mutter-Beschwerde ist kein Art. 56/2 Nr. 5, sondern {{Art. 76 BayEUG}} Eltern-Mitwirkung.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer ist Adressat einer Beschwerde nach Art. 56/2 Nr. 5 BayEUG — und in welcher Reihenfolge?',
        a: '„Nacheinander" Lehrkraft → Schulleitung → Schulforum. Sequenziell, NICHT parallel. Lockerung bei Befangenheit. Eltern-Beschwerde läuft separat über {{Art. 76 BayEUG}} + Elternbeirat.' },
      { q: 'Welche zwei Pflichten ergeben sich aus Art. 76 BayEUG für Eltern?',
        a: '„Achten auf" regelmäßige Schul-Teilnahme + Erfüllung der Schulpflicht; und „unterstützen" die Erziehungsarbeit der Schule. Zwei unterschiedliche Pflichten — bei Boykott SL-Mitteilung + {{Art. 75 BayEUG}} EB-Unterrichtung + ggf. Jugendamt.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Bei systematisch nicht erledigten HA greift {{Art. 86/1 BayEUG}}: „**Nacharbeit unter Aufsicht einer Lehrkraft**" — als Erziehungsmaßnahme. Subsidiarität: erst Erziehungs-, dann ggf. Ordnungsmaßnahme. Aufsicht für die Nacharbeit greift {{§ 5 LDO}}.'
    },

    { type: 'h', text: 'Art. 86/1 Wortlaut (kondensiert)' },
    { type: 'p', text:
      'Verbatim: „Zur Sicherung des Bildungs- und Erziehungsauftrags oder zum Schutz von Personen und Sachen können Erziehungsmaßnahmen gegenüber SuS getroffen werden. Dazu zählt bei nicht hinreichender Beteiligung am Unterricht **auch eine Nacharbeit unter Aufsicht einer Lehrkraft**. Soweit andere Erziehungsmaßnahmen nicht ausreichen, können Ordnungs- und Sicherungsmaßnahmen ergriffen werden. Maßnahmen des Hausrechts bleiben stets unberührt. Alle Maßnahmen werden nach dem Grundsatz der Verhältnismäßigkeit ausgewählt."'
    },

    { type: 'h', text: 'Eskalations-Pfad bei HA-Verstoß' },
    { type: 'numbered', items: [
      'LK-Gespräch + Eltern-Information (informell).',
      '**Erziehungsmaßnahme**: Nacharbeit unter Aufsicht — {{Art. 86/1 BayEUG}} + {{§ 5 LDO}}.',
      'EB-Mitteilung schriftlich ({{Art. 75 BayEUG}}-Anker).',
      'LK-Konferenz-Grundsätze prüfen ({{§ 28 BaySchO}}/1 S. 2).',
      'Bei fortgesetzter Pflichtverletzung: **Ordnungsmaßnahme** aus Art. 86/2-Katalog mit Verhältnismäßigkeit + Anhörung ({{Art. 88 BayEUG}}). Cross-Ref MP_01 + MP_05.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Erziehungsmaßnahme bei HA', text:
      '**Nacharbeit** = Erziehungsmaßnahme, NICHT Ordnungsmaßnahme. „Unter Aufsicht einer Lehrkraft" → {{§ 5 LDO}} greift. **Subsidiarität**: erst Erziehungs-, dann Ordnungsmaßnahme. Bei Eskalation: Verfahren {{Art. 88 BayEUG}} (Anhörung + EB-Mitteilung). Eltern-Boykott der HA = {{Art. 76 BayEUG}}-Verstoß; bei Verfestigung SL + ggf. Jugendamt.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Erziehungsmaßnahme nennt Art. 86/1 BayEUG ausdrücklich — und was greift bei der Aufsicht?',
        a: '„Nacharbeit unter Aufsicht einer Lehrkraft" bei nicht hinreichender Beteiligung am Unterricht. Aufsicht greift {{§ 5 LDO}} — auch außerhalb des regulären Unterrichts. Subsidiarität: Erziehungs- vor Ordnungsmaßnahme.' },
      { q: 'Wie eskaliert das Verfahren von Nacharbeit zur Ordnungsmaßnahme?',
        a: 'Bei fortgesetzter Pflichtverletzung: Subsidiarität-Test (haben Erziehungsmaßnahmen nicht ausgereicht?). Dann Anhörung SuS + EB ({{Art. 88 BayEUG}}), Verhältnismäßigkeit ({{Art. 86 BayEUG}}/1 letzter Satz), Auswahl aus 12-Punkte-Katalog Art. 86/2. EB-Mitteilung schriftlich vor Vollzug.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Die häufigste Drift-Falle der Schulräte: „§ 28 BaySchO verbietet HA-Benotung." **Falsch.** § 28 sagt zur Benotung NICHTS. Das Verbot folgt mittelbar aus der LNW-Definition ({{Art. 52 BayEUG}}) und den Lehrplan-Vorgaben.'
    },

    { type: 'h', text: 'Drift-Aufklärung' },
    { type: 'table',
      head: ['Aussage', 'Wahr/Falsch', 'Begründung'],
      rows: [
        ['„§ 28 verbietet HA-Benotung"', '**FALSCH** (Drift)', '§ 28 enthält keine Benotungs-Norm. Wortlaut: nur Stellpflicht + Maßstab + Konferenz + Pause.'],
        ['„HA dürfen nicht benotet werden"', '**WAHR**', 'Folgt aus LNW-Definition {{Art. 52 BayEUG}} + Lehrplan. HA dienen Einübung.'],
        ['„Schlechte HA-Note als Sanktion"', '**FALSCH**', 'Verstoß gegen LNW-Definitions-Pfad. Stattdessen Nacharbeit {{Art. 86/1 BayEUG}}.'],
        ['„Bei dauerhaftem HA-Fehlen Ordnungsmaßnahme"', '**WAHR**', '{{Art. 86 BayEUG}} Abs. 2 Katalog mit Subsidiarität + Verhältnismäßigkeit + Anhörung {{Art. 88 BayEUG}}.'],
      ],
    },

    { type: 'h', text: 'Notenauskunfts-Falle (Cross-Ref MP_06)' },
    { type: 'p', text:
      'Bei Eltern-Gespräch mit Notenbezug („Die anderen Kinder schaffen das doch auch!"): {{§ 14 LDO}}/4 Drittauskunfts-Schranke greift. KEIN „Notengeheimnis" ggü. den eigenen SuS/EB, ABER kein **vergleichender** Bezug auf andere SuS namentlich. Lara-Note geht andere Eltern nichts an. Cross-Ref MP_06 A.3 + MP_05.'
    },

    { type: 'warn', titel: '⚠ Drift-Falle HA ≠ LNW', text:
      '**§ 28 BaySchO sagt zur Benotung NICHTS** — Verbot mittelbar über {{Art. 52 BayEUG}} + Lehrplan. „HA dürfen nicht benotet werden" ist KORREKT, aber Begründung MUSS über LNW-Definitions-Pfad laufen. Lieblingsfalle der Schulräte — verdeckt im Fallcover (Mutter-beschwert-sich, Häufung vor Zwischenzeugnis …). Nacharbeit {{Art. 86/1 BayEUG}} ist erlaubt; HA-Benotung als Sanktion NICHT.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wo steht das Benotungs-Verbot für HA wirklich — und warum NICHT in § 28 BaySchO?',
        a: 'Nicht in § 28 (Drift!), sondern mittelbar aus der LNW-Definition {{Art. 52 BayEUG}} + Lehrplan-Vorgaben. HA sind Einübung, kein LNW. Wer § 28 als Quelle nennt, fällt in die Schulrats-Falle.' },
      { q: 'Was darf die LK bei systematisch nicht erledigten HA — und was darf sie nicht?',
        a: 'DARF: Nacharbeit unter Aufsicht ({{Art. 86/1 BayEUG}}), EB-Mitteilung, bei Fortsetzung Ordnungsmaßnahme nach Verhältnismäßigkeit. DARF NICHT: schlechte Note als Sanktion (Drift-Falle HA ≠ LNW).' },
    ]},
  ],
};
