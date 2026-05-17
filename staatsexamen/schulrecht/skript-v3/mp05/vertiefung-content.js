// skripts/vertiefung-content.js — echter Stoff aus _mkdocs/docs/mp05/index.md
// Strukturierte Body-Items, die VertiefungBlock generisch rendern kann.
// Marker {{Art. 56/2 BayEUG}} im Text wird zu klickbarem NormTag.

window.MP05_BODIES = {

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
      'Welche drei Klassen kennzeichnen die Rechts-Trias des {{Art. 56/2 BayEUG}}? Wie verhält sich das Wort „nacheinander" zur Beschwerde-Stufung?',
      'Welcher Normverbund trägt den Auskunftsanspruch zur Notenauskunft — und warum bleibt der Lara-Vergleich auch dann unzulässig, wenn beide einverstanden wären?',
      'Ab welchem Alter steht der/dem Schüler:in die Akteneinsicht persönlich zu ({{§ 41 BaySchO}}) — und was bleibt davon unberührt?',
      'Welche zwei Direktionalitäten trägt {{§ 12 MSO}} bei der Klausur-Rückgabe — und wo liegt die rechtliche Schwäche der LK, wenn sie „angemessene Frist" überdehnt?',
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
      'Zähle die sechs Pflichten aus {{Art. 56/4 BayEUG}} auf — welche ist eine Verweisung auf einen anderen BayEUG-Artikel?',
      'Warum ist das Handy-Verbot KEIN absolutes Verbot — welche drei Erlaubniswege benennt {{Art. 56/5 BayEUG}}?',
      'Welche FÜNF Schutzgüter aus {{Art. 84 BayEUG}} Abs. 3 müssen UNGEFÄHRDET bleiben, damit politische Abzeichen zulässig sind?',
      'Wie unterscheidet sich die Mitarbeitsnote ({{Art. 52/3 BayEUG}}) von einer Erziehungsmaßnahme ({{Art. 86 BayEUG}}) — welche drei Prüfschritte verlangt die Doppelsanktions-Analyse ({{Art. 103/3 GG}} analog)?',
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
      'Worauf stützt sich die Schulpflicht-Universalität ({{Art. 35 BayEUG}}) — und wie verhält sie sich zur Staatsangehörigkeit?',
      'Wie ist die korrekte Reihenfolge: Bildungsstand-Diagnostik → Deutschklasse → Jgst.-Einstufung? Wann ist Tiefer-Einstufung zulässig ({{Art. 36/3 BayEUG}}) — wann nicht?',
      'Welche vier Fördermaßnahmen flankieren die Deutschklasse — und welcher Träger-Verbund kennzeichnet den {{Vorkurs Deutsch 240}}?',
      'Welche Lehrplan-Verankerung gilt für DaZ ({{LehrplanPLUS DaZ}}) — und welche LK-Haltung verlangt die Interkulturelle Erziehung als Verfassungsauftrag ({{Art. 131 BV}})?',
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
      'Welche 6 Rechte normiert {{Art. 62 BayEUG}} Abs. 1 Satz 4?',
      'Wer ist als Verbindungslehrkraft wählbar ({{Art. 62/7 BayEUG}}) — und wer fällt klassisch durch das Unbefristet-Kriterium?',
      'Welche zwei Erscheinungsformen kennt die Schülerzeitung ({{Art. 63 BayEUG}}) — und welche Eingriffe darf die SL in welchem Modus, welche das Schulforum?',
      'Wo verläuft die Grenze der SMV gegenüber politischem Mandat — und welche Norm regelt die Aufsichtspflicht bei SMV-Veranstaltungen ({{§ 10 BaySchO}})?',
    ]},
  ],
};
