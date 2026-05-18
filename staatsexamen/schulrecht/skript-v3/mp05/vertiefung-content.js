// skripts/vertiefung-content.js — echter Stoff aus _mkdocs/docs/mp05/index.md
// Strukturierte Body-Items, die VertiefungBlock generisch rendern kann.
// Marker {{Art. 56/2 BayEUG}} im Text wird zu klickbarem NormTag.

window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Schüler:innen tragen eine Rechts-Trias aus Information · Beteiligung · Beschwerde — alle drei aus {{Art. 56/2 BayEUG}}. Daneben Verfahrensrechte (Akte, Leistungsnachweis-Rückgabe) und die Notenauskunft als subjektives öffentliches Recht.'
    },
    { type: 'h', text: 'Rechts-Trias · Art. 56/2 BayEUG' },
    { type: 'bullets', items: [
      '**Informationsrechte** — wesentliche Schulangelegenheiten · Auskunft über Leistungsstand · Förderhinweise. Bei Minderjährigen gelten Info-Rechte AUCH für Erziehungsberechtigte.',
      '**Beteiligungsrechte** — Teilnahme am Schulleben, Mitwirkung an U.-Gestaltung im Rahmen Schulordnung + Lehrplan.',
      '**Beschwerderecht** — Wortlaut {{Art. 56/2 BayEUG}} Nr. 5: „bei als ungerecht empfundener Behandlung oder Beurteilung sich **nacheinander** an Lehrkräfte, an die Schulleiterin oder den Schulleiter und an das Schulforum zu wenden". Das Adverb „nacheinander" gibt eine gestufte Reihenfolge vor. Pragmatische Lockerung bei Befangenheit.',
      '**Freie Meinungsäußerung** — {{Art. 56/2 BayEUG}} Abs. 3: „im Unterricht ist der sachliche Zusammenhang zu wahren" — sachlicher Zusammenhang ist die EINZIGE unterrichtsbezogene Schranke (KEIN Alter/Reife-Vorbehalt).',
      '**Fürsorge-Rechte** — Schulgesundheit · Unfallverhütung · Lernmittelfreiheit · Kostenfreiheit Schulweg.',
    ]},

    { type: 'h', text: 'Verfahrensrechte' },
    { type: 'table',
      head: ['Recht', 'Norm', 'Detail'],
      rows: [
        ['**Schülerakte einsehen**', '§ 41/1 BaySchO', '**ab Vollendung des 14. Lebensjahres** (Wortlaut)'],
        ['**LNW-Rückgabe**', '{{§ 12 MSO}}',
          'LK → SuS: „angemessene Frist" (KEIN konkreter Wert!). SuS → Schule: „innerhalb einer Woche unverändert" zurück. Benotung + Besprechung + Eltern-Kenntnisnahme.'],
      ],
    },

    { type: 'h', text: 'Notenauskunft' },
    { type: 'bullets', items: [
      'Subjektives öffentliches Recht aus {{Art. 56/2 BayEUG}} + {{Art. 52/1 BayEUG}} + {{DSGVO Art. 15}} + {{Art. 128 BV}}.',
      'KEINE Einschränkung auf Notenarten — schriftlich, mündlich, praktisch alle.',
      '**4-Stufen-Verhältnismäßigkeitsprüfung**: legitimes Ziel · Geeignetheit · Erforderlichkeit · Angemessenheit → i.d.R. Auskunftspflicht.',
      'Vergleich mit Lara-Noten UNZULÄSSIG — personenbezogene Bindung. {{§ 14 LDO}} normiert Verschwiegenheit, KEIN explizites „Notengeheimnis"; § 14/4 LDO regelt nur, WEM die Schule Auskunft geben darf.',
    ]},

    { type: 'warn', titel: '⚠ Falle Beschwerderecht', text:
      'Wortlaut {{Art. 56/2 BayEUG}} Nr. 5 sagt „nacheinander" (LK → SL → Schulforum) — also eine vorgegebene Reihenfolge. Lockerung bei Befangenheit; die LK darf trotzdem nicht „erst zu mir, dann SL" als pauschale Bedingung vorschreiben.',
    },
    { type: 'selfcheck', items: [
      { q: 'Welche drei Klassen kennzeichnen die Rechts-Trias des {{Art. 56/2 BayEUG}}? Wie verhält sich das Wort „nacheinander" zur Beschwerde-Stufung?',
        a: 'Trias = Information · Beteiligung · Beschwerde. „Nacheinander" (Wortlaut Nr. 5) gibt eine gestufte Reihenfolge vor: LK → SL → Schulforum. Lockerung bei Befangenheit der LK; die LK darf keine pauschale „erst-zu-mir-dann-SL"-Pflicht aussprechen.' },
      { q: 'Welcher Normverbund trägt den Auskunftsanspruch zur Notenauskunft — und warum bleibt der Lara-Vergleich auch dann unzulässig, wenn beide einverstanden wären?',
        a: 'Verbund: {{Art. 56/2 BayEUG}} + {{Art. 52/1 BayEUG}} + {{DSGVO Art. 15}} + {{Art. 128 BV}}. Vergleich bleibt unzulässig, weil die Auskunftspflicht personenbezogen ist — {{§ 14 LDO}} normiert dienstliche Verschwiegenheit (kein „Notengeheimnis"), aber {{DSGVO Art. 15}} i.V.m. DSGVO 6/1 erfordert eigene Rechtsgrundlage für jede Datenweitergabe.' },
      { q: 'Ab welchem Alter steht der/dem Schüler:in die Akteneinsicht persönlich zu ({{§ 41 BaySchO}}) — und was bleibt davon unberührt?',
        a: 'Ab Vollendung des 14. Lebensjahres (Wortlaut). Davor: Eltern als gesetzliche Vertretung. Unberührt bleibt die altersunabhängige Notenauskunft nach {{Art. 56/2 BayEUG}} — eigenes Recht, jederzeit aktivierbar.' },
      { q: 'Welche zwei Direktionalitäten trägt {{§ 12 MSO}} bei der Klausur-Rückgabe — und wo liegt die rechtliche Schwäche der LK, wenn sie „angemessene Frist" überdehnt?',
        a: 'LK → SuS: „angemessene Frist" (KEIN konkreter Wert — Würdigung nach Klausur-Aufwand, Belastung, Krankheit). SuS → Schule: „innerhalb einer Woche unverändert" zurück. Schwäche der LK: Korrekturpflicht ist Dienstpflicht ({{§ 14 LDO}}) — bei extremer Verzögerung greift Dienstaufsicht, SL kann mahnen.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Verhaltensgrundnorm: SuS müssen sich so verhalten, dass „die Aufgabe der Schule erfüllt und das Bildungsziel erreicht werden kann" ({{Art. 56/4 BayEUG}} S. 1). Aus dieser Klausel leiten sich sechs konkrete Pflichten und eine Verbots-Tabelle ab.'
    },

    { type: 'h', text: 'Konkrete Pflichten · Art. 56/4 BayEUG' },
    { type: 'bullets', items: [
      '**Aktive Mitwirkungspflicht** — Anwesenheit allein genügt NICHT (Präzedenz Passive Verweigerung).',
      '**Verhüllungs-Verbot Gesicht** in Schule + schul. Veranstaltungen; schulbedingte Ausnahmen möglich (Schutzkleidung); SL-Härtefall.',
      'Regelmäßige Teilnahme U. + verbindliche Schulveranstaltungen.',
      '**Distanzunterricht** ({{Art. 56/4 BayEUG}} S. 3): Übertragung Bild + Ton bei Video, WENN LK aus päd. Gründen fordert + Technik vorhanden.',
      'Unterlassen aller Schulbetrieb-/Ordnungs-störenden Handlungen.',
      'Mitwirkungspflicht an sonderpäd. Gutachten (Art. 41/4 S. 2 + Abs. 6).',
    ]},

    { type: 'h', text: 'Spezielle Verbote' },
    { type: 'table',
      head: ['Bereich', 'Norm', 'Regelung'],
      rows: [
        ['**Handy / digitale Endgeräte**', '{{Art. 56/5 BayEUG}}',
          'Wortlaut Satz 1: zulässig nur 1. im U. mit Aufsicht-Erlaubnis, 2. im Übrigen mit SL/Schulforum oder Aufsicht im Einzelfall. Satz 3: gilt nicht für GS/GS-Stufe an FöS. Satz 4: bei unzulässiger Verwendung Einbehaltung. **KEIN absolutes Verbot.**'],
        ['**Rauchen**', 'Art. 3 GSG', 'in Schulen + auf Gelände VERBOTEN.'],
        ['**Alkohol / Rauschmittel**', '{{§ 23 BaySchO}}',
          'Konsum innerhalb Schulanlage + bei schul. Veranstaltungen untersagt.'],
        ['**Gefährliche / störende Gegenstände**', '{{§ 23 BaySchO}}',
          'Mitbringen untersagt; Wegnahme + Sicherstellung zulässig; Rückgabe bei Minderjährigen NUR an Erziehungsberechtigte.'],
        ['**Politik / Parteinahme**', 'Art. 84 BayEUG',
          'Abs. 2: Politische Werbung auf Schulgelände/Veranstaltungen unzulässig. Abs. 3 Abzeichen: zulässig nur, wenn die 5 Schutzgüter (Schulfrieden · Schulbetrieb · Bildungs-/Erziehungsauftrag · persönliche Ehre · Erziehung zur Toleranz) nicht gefährdet sind. Im Zweifel SL.'],
      ],
    },

    { type: 'h', text: 'Mitarbeitsnote ↔ Verhaltenssanktion' },
    { type: 'bullets', items: [
      '**Mitarbeitsnote** ({{Art. 52/3 BayEUG}}): NUR fachbezogen — NIE Verhaltenssanktion.',
      'Verweigerung = fehlende Leistung bewertbar; das **Verweigern selbst** ist KEIN Notenkriterium.',
      'Verhaltenssanktion separat über {{Art. 86 BayEUG}} (Erziehungs-/Ordnungsmaßnahme).',
      'Doppelsanktions-Prüfschema ({{Art. 103/3 GG}} analog, ne bis in idem): (1) identisches Verhalten? (2) zwei Sanktionen? (3) gleiches Rechtsgut? → unzulässig.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Pflichten', text:
      'Handy nicht absolut verboten — Aufsichts-/SL-Genehmigung möglich. Filmen einer LK = Persönlichkeitsrecht + {{KUG § 22}}-Verstoß → Beschlagnahme {{§ 23 BaySchO}} + EOM. Rückgabe gefährlicher Gegenstände bei Minderjährigen NUR an Eltern. Mitarbeitsnote als Verhaltens-Strafe = Fachfehler.',
    },
    { type: 'selfcheck', items: [
      { q: 'Zähle die sechs Pflichten aus {{Art. 56/4 BayEUG}} auf — welche ist eine Verweisung auf einen anderen BayEUG-Artikel?',
        a: '(1) aktive Mitwirkung, (2) Verhüllungs-Verbot, (3) regelmäßige Teilnahme, (4) Distanz-U. mit Bild+Ton, (5) Unterlassen schulbetrieb-/ordnungsstörender Handlungen, (6) Mitwirkung sonderpäd. Gutachten. Pflicht 6 verweist auf {{Art. 41 BayEUG}}.' },
      { q: 'Warum ist das Handy-Verbot KEIN absolutes Verbot — welche drei Erlaubniswege benennt {{Art. 56/5 BayEUG}}?',
        a: 'Erlaubniswege: (1) im U./Veranstaltungen mit Aufsichts-Erlaubnis, (2) im Übrigen SL-Genehmigung im Einvernehmen mit Schulforum, (3) Aufsicht im Einzelfall. Satz 3: Nr. 2 gilt nicht für Grundschule. Satz 4: bei unzulässiger Verwendung Einbehaltung.' },
      { q: 'Welche FÜNF Schutzgüter aus {{Art. 84 BayEUG}} Abs. 3 müssen UNGEFÄHRDET bleiben, damit politische Abzeichen zulässig sind?',
        a: 'Schulfrieden · Schulbetrieb · Bildungs- + Erziehungsauftrag · persönliche Ehre · Erziehung zur Toleranz. Im Zweifel SL. Politische Werbung (Abs. 2) bleibt grundsätzlich unzulässig.' },
      { q: 'Wie unterscheidet sich die Mitarbeitsnote ({{Art. 52/3 BayEUG}}) von einer Erziehungsmaßnahme ({{Art. 86 BayEUG}}) — welche drei Prüfschritte verlangt die Doppelsanktions-Analyse ({{Art. 103/3 GG}} analog)?',
        a: 'Mitarbeitsnote = fachbezogen, NIE Verhaltenssanktion. EOM nach {{Art. 86 BayEUG}} = verhaltensbezogen (Verweis, verschärfter Verweis, …). Doppelsanktions-Prüfung: (1) identisches Verhalten? (2) zwei Sanktionen? (3) gleiches Rechtsgut? → bei allen drei: ne bis in idem, unzulässig.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Schulpflicht-Universalität: alle K/J mit gewöhnlichem Aufenthalt Bayern — ohne Rücksicht auf Staatsangehörigkeit. Deutschklasse als Kernnorm. Jgst.-Einweisung NUR bei Bildungsstand-Defizit, NICHT bei sprachlichen Defiziten allein.'
    },

    { type: 'h', text: 'Deutschklasse · Kernnorm' },
    { type: 'bullets', items: [
      'SuS mit ndM + keinen/geringen Deutschkenntnissen besuchen ZUNÄCHST eine Deutschklasse, sofern Schulamt + Aufwandsträger eine gebildet haben (sonst Gastschulverhältnis). Norm: {{§ 10 MSO}} / {{§ 8 GrSO}} — identisch.',
      'Ziel: Vorbereitung Regelklasse altersgleicher Jgst.',
      'Inhalt: intensivierte Sprachförderung + Werteerziehung + kulturelle Bildung.',
      'Dauer: i.d.R. 1 Schuljahr, SPÄTESTENS 2 Schulbesuchsjahre.',
      'Auf Elternantrag: SL kann Regelklasse-Besuch gestatten, wenn Folgeerwartung.',
    ]},

    { type: 'h', text: 'Jgst.-Einweisung · Art. 36/3 BayEUG' },
    { type: 'bullets', items: [
      'SL stellt Jgst. fest auf Grundlage Art. 35 (Alter + bisherige Schullaufbahn).',
      'Entscheidung nach Leistungsstand über konkrete Klasse.',
      '**Tiefere Einstufung bis 2 Jgst.** zulässig NUR bei mangelndem Bildungsstand — NICHT wegen sprachlicher Probleme (Falle). Quelle: {{Art. 36/3 BayEUG}} S. 4.',
    ]},

    { type: 'h', text: 'Vier Fördermaßnahmen' },
    { type: 'numbered', items: [
      '**Vorkurs Deutsch 240** — 1,5 J. vor Einschulung, 240 WStd, KiGa + GS gemeinsam.',
      '**Deutschklassen** — siehe oben ({{§ 8 GrSO}} / {{§ 10 MSO}}).',
      '**DeutschPLUS-Differenzierung** — innerhalb Regel-U.',
      '**DeutschPLUS-Kurse** — additiv.',
    ]},

    { type: 'h', text: 'DaZ + Interkulturelle Erziehung' },
    { type: 'bullets', items: [
      '**DaZ** (Deutsch als Zweitsprache): LehrplanPLUS für alle weiterführenden Schularten; Noten kommen ins Zeugnis.',
      '**Interkulturelle Erziehung**: GG + {{Art. 131 BV}} („Geist der Demokratie", „Völkerversöhnung"). LehrplanPLUS MS = „interkultureller Begegnungsort".',
      'LK-Rolle: reversible Sprachhaltung · positive Konfliktlösung · repressionsfrei demokratisch.',
    ]},

    { type: 'warn', titel: '⚠ Falle ndM', text:
      'Tiefere Jgst.-Einstufung (bis 2 Jgst.) NUR bei mangelndem Bildungsstand, NICHT bei sprachlichen Defiziten allein. Wer „kein Deutsch" als Begründung für Tiefer-Einweisung nennt, verstößt gegen {{Art. 36/3 BayEUG}} S. 4.',
    },
    { type: 'selfcheck', items: [
      { q: 'Worauf stützt sich die Schulpflicht-Universalität ({{Art. 35 BayEUG}}) — und wie verhält sie sich zur Staatsangehörigkeit?',
        a: '{{Art. 35 BayEUG}} normiert die allgemeine Schulpflicht für alle K/J mit gewöhnlichem Aufenthalt oder Ausbildungs-/Arbeitsplatz in Bayern. Staatsangehörigkeit ist irrelevant. Basis für die Jgst.-Einweisung nach {{Art. 36/3 BayEUG}}.' },
      { q: 'Wie ist die korrekte Reihenfolge: Bildungsstand-Diagnostik → Deutschklasse → Jgst.-Einstufung? Wann ist Tiefer-Einstufung zulässig ({{Art. 36/3 BayEUG}}) — wann nicht?',
        a: 'Reihenfolge: erst Bildungsstand-Diagnostik (NICHT Deutsch-Test allein), dann altersgleiche Jgst.-Zuordnung, dann Deutschklasse. Tiefer-Einstufung bis 2 Jgst. ZULÄSSIG nur bei mangelndem Bildungsstand ({{Art. 36/3 BayEUG}} S. 4) — NICHT bei sprachlichen Defiziten allein.' },
      { q: 'Welche vier Fördermaßnahmen flankieren die Deutschklasse — und welcher Träger-Verbund kennzeichnet den {{Vorkurs Deutsch 240}}?',
        a: '(1) {{Vorkurs Deutsch 240}} (1,5 J. vor Einschulung, 240 WStd, KiGa+GS gemeinsam). (2) Deutschklassen {{§ 8 GrSO}} / {{§ 10 MSO}}. (3) {{DeutschPLUS}}-Differenzierung im Regel-U. (4) {{DeutschPLUS}}-Kurse additiv. Vorkurs-Träger: Kindertageseinrichtung + Grundschule gemeinsam.' },
      { q: 'Welche Lehrplan-Verankerung gilt für DaZ ({{LehrplanPLUS DaZ}}) — und welche LK-Haltung verlangt die Interkulturelle Erziehung als Verfassungsauftrag ({{Art. 131 BV}})?',
        a: '{{LehrplanPLUS DaZ}} = Bayerischer Lehrplan für alle weiterführenden Schularten mit DaZ-Bezug, Noten ins Zeugnis. Interkulturelle Erziehung nach {{Art. 131 BV}} („Geist der Demokratie", „Völkerversöhnung") verlangt: reversible Sprachhaltung, positive Konfliktlösung, repressionsfrei-demokratisches LK-Verhalten.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Schülermitverantwortung als verfasste Form von Demokratie-Einübung. Rechtsgrundlage {{Art. 62 BayEUG}} + 62a/63/73 + §§ 8/9/10/11 BaySchO. Legitimation aus {{Art. 131 BV}}.'
    },

    { type: 'h', text: 'Aufgaben · Art. 62/1' },
    { type: 'bullets', items: [
      'Gemeinsame Veranstaltungen.',
      'Übernahme von Ordnungsaufgaben.',
      'Wahrnehmung schulischer Interessen.',
      'Mithilfe bei Konfliktlösung.',
      'Unterstützung durch SL + LK + Elternbeirat.',
    ]},

    { type: 'h', text: '6 Rechte · Art. 62 Abs. 1 Satz 4 BayEUG' },
    { type: 'numbered', items: [
      '**Information** — „in allen sie betreffenden Angelegenheiten durch die Schule informiert zu werden".',
      '**Wünsche und Anregungen übermitteln** — an LK, SL und Elternbeirat.',
      '**Hilfe und Vermittlung auf Antrag** — wenn SuS glauben, es sei ihnen Unrecht geschehen.',
      '**Beschwerden allgemeiner Art** bei LK, SL und im Schulforum vorbringen.',
      '**Mitwirkung Hausordnung / besondere Veranstaltungen / Schulforum**.',
      '**Anregungen + Vorschläge zu Kursen / Schulveranstaltungen + Unterricht** im Rahmen der Lehrpläne.',
    ]},

    { type: 'h', text: 'Wahl-Modus' },
    { type: 'table',
      head: ['Organ', 'Wann'],
      rows: [
        ['**Klassensprecher** (§ 8 BaySchO + Art. 62/3 BayEUG)',
          '„innerhalb von vier Wochen nach Unterrichtsbeginn" (Wortlaut § 8/1 S. 3); ab Jgst. 5 PFLICHT (Art. 62/3 Wortlaut); in Jgst. 1–4 entscheidet SL im Einvernehmen mit dem EB.'],
        ['**Schülersprecher (3) + Schülerausschuss** (§ 9 BaySchO)',
          '„innerhalb von zwei Wochen nach der Wahl der Klassensprecher" (Wortlaut § 9/1 S. 2); Wahl durch Klassensprecher; Schulforum kann Wahlrecht auf alle SuS ausdehnen.'],
      ],
    },

    { type: 'h', text: 'Verbindungslehrkraft · Art. 62 Abs. 7 BayEUG' },
    { type: 'bullets', items: [
      '**Wählbar** ({{Art. 62/7 BayEUG}} S. 1 Wortlaut): „Lehrkräfte, die an der Schule mit mindestens der Hälfte der Unterrichtspflichtzeit unbefristet beschäftigt sind, sowie Förderlehrerinnen oder Förderlehrer unter entsprechenden Voraussetzungen".',
      '**NICHT wählbar: LAA** — Status „auf Widerruf" erfüllt das Unbefristet-Kriterium nicht.',
      '**Wahl** durch Klassensprecher:innen + Stellvertreter:innen. Schulforum kann beschließen, dass alle SuS wählen.',
      '**Amtszeit**: „für jeweils ein Schuljahr".',
      '**Aufgaben**: Verbindung SL/LK ↔ SuS pflegen · SMV-Einrichtungen beraten · bei Beschwerden vermitteln.',
    ]},

    { type: 'h', text: 'Schülerzeitung · Art. 63 BayEUG' },
    { type: 'table',
      head: ['Modus', 'Folge (Wortlaut Art. 63 BayEUG)'],
      rows: [
        ['**Einrichtung der Schule** (SMV-Rahmen)',
          'Abs. 5 Wortlaut: SL kann Verteilung auf Schulgelände UND die Herausgabe untersagen.'],
        ['**Druckwerk nach BayPrG** (Presserecht)',
          'Abs. 2: Eltern-Haftung bleibt unberührt. Abs. 5: SL kann NUR Verteilung auf Schulgelände untersagen, NICHT die Herausgabe.'],
      ],
    },
    { type: 'p', text:
      'Vorlauf-Pflicht (Abs. 4): Soll die Zeitung auf Schulgelände verteilt werden, ist der SL rechtzeitig vor Drucklegung ein Exemplar zur Kenntnis zu geben. Bei Einwendungen → Stellungnahme der Redaktion + Vorlage beim Schulforum. Scheitert die gütliche Einigung, kann das Schulforum die Verteilung auf Schulgelände untersagen.'
    },

    { type: 'h', text: 'Grenzen SMV' },
    { type: 'bullets', items: [
      'Kein politisches Mandat (keine Stellungnahmen zu allg. innen-/außenpolitischen Fragen).',
      'Kein Ort parteipolitischer Agitation.',
      'SMV-Veranstaltungen unter Schulaufsicht (§ 10 BaySchO) — Aufsichtspflicht + Versicherungsschutz.',
    ]},

    { type: 'warn', titel: '⚠ Fallen SMV', text:
      'Klassensprecher ab Jgst. 5 — in 1–4 keine Pflicht. LAA NICHT wählbar als Verbindungs-LK (Status auf Widerruf). Bei presserechtlicher Schülerzeitung: SL-Eingriff begrenzt; Eltern-Haftung bleibt.',
    },
    { type: 'selfcheck', items: [
      { q: 'Welche 6 Rechte normiert {{Art. 62 BayEUG}} Abs. 1 Satz 4?',
        a: '(1) Information in allen sie betreffenden Angelegenheiten · (2) Wünsche + Anregungen an LK/SL/EB · (3) Hilfe + Vermittlung auf Antrag bei empfundenem Unrecht · (4) Beschwerden allgemeiner Art · (5) Mitwirkung Hausordnung + Schulforum · (6) Anregungen + Vorschläge zu Kursen + Schulveranstaltungen + Unterricht im Lehrplan-Rahmen.' },
      { q: 'Wer ist als Verbindungslehrkraft wählbar ({{Art. 62/7 BayEUG}}) — und wer fällt klassisch durch das Unbefristet-Kriterium?',
        a: 'Wählbar: LK + Förderlehrkraft mit MIND. ½ Unterrichtspflichtzeit + UNBEFRISTET an der Schule. Wahl durch Klassensprecher:innen + Stellvertreter. Amtszeit 1 SJ. Klassischer Durchfaller: LAA — Status „auf Widerruf" erfüllt das Unbefristet-Kriterium nicht.' },
      { q: 'Welche zwei Erscheinungsformen kennt die Schülerzeitung ({{Art. 63 BayEUG}}) — und welche Eingriffe darf die SL in welchem Modus, welche das Schulforum?',
        a: 'Modus A (Schul-Einrichtung im SMV-Rahmen): SL kann Verteilung + Herausgabe untersagen. Modus B (Druckwerk nach {{BayPrG}}): Eltern-Haftung bleibt; SL nur Verteilung auf Schulgelände untersagen, NICHT Herausgabe. Bei Einwendungen (Modus A): Vorlauf-Pflicht Abs. 4 → Stellungnahme Redaktion → Schulforum-Befassung → bei Scheitern gütlicher Einigung: Schulforum-Untersagung.' },
      { q: 'Wo verläuft die Grenze der SMV gegenüber politischem Mandat — und welche Norm regelt die Aufsichtspflicht bei SMV-Veranstaltungen ({{§ 10 BaySchO}})?',
        a: 'Grenze: SMV hat KEIN politisches Mandat — keine Stellungnahmen zu allgemein-politischen Fragen, keine parteipolitische Agitation. SMV-Veranstaltungen unter schulischer Aufsicht ({{§ 10 BaySchO}}) — Aufsichtspflicht + gesetzlicher Versicherungsschutz greifen.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Erziehungs- und Ordnungsmaßnahmen sind die institutionalisierte Verhaltens-Reaktion der Schule — strikt **subsidiär nach Erziehungsmaßnahmen** ({{Art. 86 BayEUG}} Abs. 1), strikt **abgegrenzt von der Mitarbeitsnote** (Art. 52/3 — fachbezogen). Der **Stufen-Katalog Abs. 2** hat 6 Eskalationsstufen — die Anwendung verlangt Verhältnismäßigkeit + Anhörung ({{Art. 88 BayEUG}}).'
    },

    { type: 'svg', titel: 'EOM-Stufenmodell · Art. 86 Abs. 2 BayEUG',
      caption: '6 Eskalationsstufen · Verhältnismäßigkeit + Anhörung Art. 88',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 280" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="30" y="22" font-size="9.5" letter-spacing="1.4" class="muted">LEICHT</text>
  <text x="540" y="22" font-size="9.5" letter-spacing="1.4" class="muted" text-anchor="end">SCHWER</text>
  <line x1="60" y1="32" x2="560" y2="32" class="rule-line"/>

  <g>
    <rect x="40" y="48" width="80" height="50" class="box"/>
    <text x="80" y="68" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">1</text>
    <text x="80" y="86" text-anchor="middle" font-size="10" font-weight="500">Verweis</text>
  </g>
  <g>
    <rect x="125" y="60" width="90" height="60" class="box"/>
    <text x="170" y="80" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">2</text>
    <text x="170" y="98" text-anchor="middle" font-size="10" font-weight="500">verschärfter</text>
    <text x="170" y="110" text-anchor="middle" font-size="10" font-weight="500">Verweis</text>
  </g>
  <g>
    <rect x="220" y="80" width="100" height="70" class="box"/>
    <text x="270" y="100" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">3</text>
    <text x="270" y="118" text-anchor="middle" font-size="10" font-weight="500">Versetzung in</text>
    <text x="270" y="130" text-anchor="middle" font-size="10" font-weight="500">Parallelklasse</text>
  </g>
  <g>
    <rect x="325" y="100" width="100" height="80" class="box"/>
    <text x="375" y="120" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">4</text>
    <text x="375" y="138" text-anchor="middle" font-size="10" font-weight="500">Ausschluss</text>
    <text x="375" y="152" text-anchor="middle" font-size="9.5" class="muted">Veranstaltung</text>
    <text x="375" y="166" text-anchor="middle" font-size="9.5" class="muted">≤ 3 Mo</text>
  </g>
  <g>
    <rect x="430" y="120" width="65" height="90" class="box"/>
    <text x="462" y="140" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">5</text>
    <text x="462" y="158" text-anchor="middle" font-size="9.5" font-weight="500">Androhung</text>
    <text x="462" y="172" text-anchor="middle" font-size="9.5" font-weight="500">Entlassung</text>
  </g>
  <g>
    <rect x="500" y="140" width="65" height="100" class="box"/>
    <text x="532" y="160" text-anchor="middle" font-size="9.5" letter-spacing="1" data-accent="true" font-weight="600">6</text>
    <text x="532" y="178" text-anchor="middle" font-size="10" font-weight="500">Entlassung</text>
    <text x="532" y="194" text-anchor="middle" font-size="9" class="muted">ultima ratio</text>
  </g>

  <line x1="60" y1="248" x2="560" y2="248" class="rule-line"/>
  <text x="180" y="266" text-anchor="middle" font-size="9.5" class="muted">Erziehungsmaßnahmen subsidiär</text>
  <text x="420" y="266" text-anchor="middle" font-size="9.5" class="muted">Verfahrens-Trias Art. 88: Anhörung → Entscheidung → EB-Mitteilung</text>
</svg>`
    },

    { type: 'h', text: 'Erziehungsmaßnahmen vs. Ordnungsmaßnahmen' },
    { type: 'table',
      head: ['Aspekt', 'Erziehungsmaßnahme', 'Ordnungsmaßnahme'],
      rows: [
        ['**Norm**', 'KEINE Aufzählung — alle pädagogisch-zumutbaren', '{{Art. 86 BayEUG}} Abs. 2 — abschließender 6-Stufen-Katalog'],
        ['**Beispiele**', 'Tadel · Nacharbeit · Mündl. Klärung · Sitzplatzwechsel', 'Verweis · v. Verweis · Versetzung · Ausschluss · Entlassung'],
        ['**Verfahren**', 'formlos, KEINE Anhörungspflicht', '{{Art. 88 BayEUG}}: Anhörung + Begründung + EB-Mitteilung'],
        ['**Subsidiarität**', 'IMMER zuerst', 'NUR wenn Erziehungsmaßnahmen ausgeschöpft / aussichtslos'],
        ['**Ne-bis-in-idem**', '—', 'für IDENTISCHES Verhalten KEINE Doppel-OM ({{Art. 103/3 GG}} analog)'],
      ],
    },

    { type: 'h', text: 'Verfahrens-Trias {{Art. 88 BayEUG}}' },
    { type: 'numbered', items: [
      '**Anhörungspflicht**: SuS persönlich anhören VOR Entscheidung. Bei minderjährigen SuS: EB hinzuziehen.',
      '**Entscheidung + Begründung**: schriftliche Verfügung mit Tat-Schilderung + Subsumtion + Begründung der Verhältnismäßigkeit.',
      '**Mitteilung an EB**: bei minderjährigen SuS Pflicht.',
    ]},

    { type: 'h', text: 'Nachteilsausgleich vs. Notenschutz · BVerwG 2015' },
    { type: 'table',
      head: ['', 'Nachteilsausgleich', 'Notenschutz'],
      rows: [
        ['**Was wird verändert?**', 'Prüfungs-**Bedingungen** (Zeit, Hilfsmittel, Format)', 'Bewertung bestimmter **Teilleistungen** ausgesetzt (z.B. Rechtschreibung bei LRS)'],
        ['**Bewertungsmaßstab**', 'BLEIBT identisch', 'WIRD modifiziert'],
        ['**Zeugnis-Vermerk?**', 'NEIN', 'JA (BVerwG 2015) — sonst Vergleichbarkeits-Täuschung'],
        ['**Anspruchsgrundlage**', '{{§ 33/34 BaySchO}} + Art. 3/3 GG', '{{§ 33/34 BaySchO}} + Art. 52a BayEUG'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen EOM + Nachteilsausgleich', text:
      '**Mitarbeitsnote ≠ OM** — Verhalten nie in fachliche Note. **Subsidiarität**: erst EM, dann OM. **Anhörungspflicht Art. 88** — nicht überspringbar. **Nachteilsausgleich OHNE Zeugnis-Vermerk** — Notenschutz MIT (BVerwG 2015). Wer beide gleich behandelt, fällt in die Falle.',
    },

    { type: 'selfcheck', items: [
      { q: 'Nenne die sechs Stufen aus {{Art. 86 BayEUG}} Abs. 2 in aufsteigender Schwere.',
        a: '(1) Verweis · (2) verschärfter Verweis · (3) Versetzung in Parallelklasse · (4) Ausschluss von einer Schulveranstaltung (≤ 3 Mo) · (5) Androhung der Entlassung · (6) Entlassung. Verhältnismäßigkeit pro Stufe; Erziehungsmaßnahmen subsidiär VOR EOM.' },
      { q: 'Welche drei Verfahrensschritte verlangt {{Art. 88 BayEUG}}?',
        a: '(1) Anhörung der SuS persönlich (bei Minderjährigen EB hinzuziehen) · (2) schriftliche Entscheidung mit Begründung der Verhältnismäßigkeit · (3) Mitteilung an EB.' },
      { q: 'Lukas (8. Kl., LRS) — die Eltern wollen, dass Rechtschreibung in Deutsch nicht bewertet wird. Nachteilsausgleich oder Notenschutz? Zeugnis-Konsequenz?',
        a: 'Notenschutz (Aussetzung der Teilleistungs-Bewertung). Nach BVerwG 2015 muss das im Zeugnis vermerkt werden — sonst Diskriminierung der Mitschüler:innen ohne LRS. Reiner Nachteilsausgleich (z.B. Zeitverlängerung) wäre vermerkfrei.' },
    ]},
  ],
};
