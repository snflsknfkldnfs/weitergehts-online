// MP_06 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Die LK-Pflichten sind eine **Doppelstruktur**: einerseits **beamtenrechtliche** Pflichten (BayBG/BeamtStG), andererseits **schul- und dienstrechtliche LK-Pflichten** ({{§ 9a LDO}} + {{Art. 59 BayEUG}}). Beide Säulen gelten kumulativ.'
    },

    { type: 'h', text: 'Zwei-Säulen-Tabelle' },
    { type: 'table',
      head: ['Beamten-Säule', 'Schul-Säule'],
      rows: [
        ['Dienstleistungspflicht', 'Unterricht + Erziehung ({{§ 2 LDO}} + {{Art. 59 BayEUG}})'],
        ['Politische Treuepflicht', 'Aufsicht ({{§ 5 LDO}}) — eigener Abschnitt'],
        ['Weisungsgebundenheit (§ 35 BeamtStG)', 'Beratungspflicht ({{§ 6 LDO}}/3 + {{§ 14 LDO}})'],
        ['Amtsverschwiegenheit (§ 37 BeamtStG)', 'Zusammenarbeit mit EB ({{§ 6 LDO}})'],
        ['Annahmeverbot von Geschenken', 'Teilnahme LK-Konferenz ({{Art. 58 BayEUG}})'],
        ['Verhalten im/außerhalb Dienst', 'Wandertage/Skikurse ({{§ 4 LDO}})'],
        ['—', 'Fortbildungspflicht ({{§ 9a LDO}}/2 + {{Art. 20 BayLBG}})'],
      ],
    },

    { type: 'h', text: '§ 9a LDO — Schlüssel-Punkte' },
    { type: 'bullets', items: [
      'Abs. 1: Arbeitskraft dem Dienst widmen + **erzieherischer Einsatz auch außerhalb U.**',
      'Abs. 2: **Selbst-Fortbildung + dienstliche Fortbildung** (Art. 66/2 LlbG + {{Art. 20 BayLBG}} + KMBek 09.08.2002).',
      'Abs. 3: U.-Zeiten einhalten + Vertretung **in zumutbarem Umfang** (NICHT schrankenlos) + frühzeitige Information.',
      'Abs. 4: **Fachfremder U. NICHT zum Nachteil** bei Beurteilung — explizit geschützt.',
      'Abs. 8: **Rauchverbot Schulgelände absolut** (außer Wohnungen); außerhalb „sollen verzichten".',
    ]},

    { type: 'h', text: 'Art. 59 BayEUG — Symbol-Verbot konditional' },
    { type: 'p', text:
      'Verbatim Abs. 2 S. 4: „Äußere Symbole und Kleidungsstücke, die eine religiöse oder weltanschauliche Überzeugung ausdrücken, dürfen von Lehrkräften im Unterricht nicht getragen werden, **sofern die Symbole oder Kleidungsstücke bei den SuS oder den Eltern auch als Ausdruck einer Haltung verstanden werden können, die mit den verfassungsrechtlichen Grundwerten und Bildungszielen der Verfassung einschließlich den christlich-abendländischen Bildungs- und Kulturwerten nicht vereinbar ist**." Konditional, KEIN absolutes Verbot.'
    },

    { type: 'warn', titel: '⚠ Fallen § 9a/9b + Art. 59', text:
      '**Verfügbarkeit „in zumutbarem Umfang"** — keine schrankenlose Verfügbarkeit. **Fachfremder U.** kann NICHT zum Nachteil bei Beurteilung herangezogen werden. **Rauchverbot absolut** auf Schulgelände. **Symbol-Verbot konditional** — Einzelfall-Prüfung. {{§ 9b LDO}} 10-Punkte-Katalog ist „insbesondere"-Liste (nicht abschließend); Verteilung „möglichst gleichmäßig unter Berücksichtigung der Belastung".',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zwei Säulen tragen die LK-Pflichten — und welche Pflicht steht in BEIDEN Säulen?',
        a: 'Beamten-Säule (BayBG/BeamtStG: Dienstleistung, Treue, Verschwiegenheit, Weisung). Schul-Säule ({{§ 9a LDO}}/{{Art. 59 BayEUG}}: U., Erziehung, Aufsicht, Beratung, KL, Fortbildung). Quer in beiden: Verschwiegenheit/Vertraulichkeit (§ 37 BeamtStG ↔ {{§ 14 LDO}}).' },
      { q: 'Ist das Symbol-Verbot in Art. 59/2 S. 4 BayEUG absolut?',
        a: 'NEIN. Konditional: „sofern auch als Haltung verstanden werden können", die verfassungsrechtlichen Grundwerten + christlich-abendländischen Bildungs-/Kulturwerten widerspricht. Einzelfall-Prüfung erforderlich. Ausnahmen für LK im Vorbereitungsdienst möglich.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Aufsichtspflicht ist Hochfrequenz-Thema. Der Normverbund: **{{§ 5 LDO}} + {{§ 22 BaySchO}} + {{Art. 57/2 BayEUG}} + {{Art. 56/4 BayEUG}}** (Spiegel auf SuS-Seite). Vier Leitfragen + Haftungsdreieck strukturieren die Antwort.'
    },

    { type: 'h', text: '§ 5 LDO — Schlüsselsatz Aufsicht' },
    { type: 'p', text:
      'Verbatim Abs. 1 S. 2-3: „Insbesondere hat die LK **spätestens von Beginn des Unterrichts an** im Unterrichtsraum anwesend zu sein und **von diesem Zeitpunkt an während der gesamten Dauer des von ihr erteilten Unterrichts, erforderlichenfalls bis zum Weggang der SuS, die Aufsicht zu führen**. Ist die LK gezwungen, den U.-Raum während dieser Zeit zu verlassen, so trifft sie, im Verhinderungsfall die SL, **aufgrund der gegebenen Umstände die notwendigen und möglichen Maßnahmen**."'
    },

    { type: 'h', text: 'Reichweite Zeit + Raum' },
    { type: 'table',
      head: ['Phase', 'Reichweite'],
      rows: [
        ['**15 Min vor U.-Beginn**', 'GS + GS-Stufe FöS (§ 22/1 S. 2 BaySchO). MS „angemessene Zeit".'],
        ['**Während U.**', 'LK spätestens ab Beginn im Raum + gesamte Dauer eigener U.'],
        ['**Nach U.**', '„angemessene Zeit nach U. bis Weggang aus Schulanlage" — erforderlichenfalls bis Weggang SuS (§ 5/1 LDO).'],
        ['**Pausen + Stundenwechsel**', 'nach SL-Einteilung (§ 5/2 LDO).'],
        ['**Mittagspause (60–90 Min)**', 'Beförderungspflicht (Heimtransport) ODER Beaufsichtigungspflicht (Aufwandsträger).'],
        ['**Außerschul. Veranstaltung**', 'Treff-/Endpunkt = Beginn/Ende. Jgst. 1–4 MUSS im Schulsprengel (§ 5/3 LDO).'],
      ],
    },

    { type: 'h', text: 'Räumliche Reichweite' },
    { type: 'bullets', items: [
      'Schulanlage (U. + Pausen + Freistunden).',
      'Sonstige Schulveranstaltungen innerhalb/außerhalb ({{§ 4 LDO}}).',
      'Freiwillige AGs, SMV, Schulgarten, genehmigte PC-Übung.',
      'Wandertage, Studienfahrten, Theaterbesuche (sofern als Schulveranstaltung erklärt).',
      'Betriebspraktika.',
      '**NICHT** Schulweg (Eltern); **ABER** Schulbus + Wartezeit = Gemeinde/Schulverband (Aufwandsträger).',
    ]},

    { type: 'h', text: 'Vier Leitfragen gerichtliche Nachprüfung' },
    { type: 'numbered', items: [
      'War die Gefahr **erkennbar**?',
      'Welche Verhaltensregeln waren **festgelegt**?',
      'Wurde die Einhaltung **kontrolliert**?',
      'Wurde Nichteinhaltung mit **konsequenten Maßnahmen** beantwortet?',
    ]},

    { type: 'h', text: 'Haftungsdreieck' },
    { type: 'table',
      head: ['Schiene', 'Anspruchsgrundlage', 'Wer haftet?'],
      rows: [
        ['**Zivil/Amtshaftung**', '{{§ 839 BGB}} i.V.m. {{Art. 34 GG}}', 'Freistaat (Außenhaftung); Rückgriff LK NUR bei Vorsatz + GROBER Fahrlässigkeit'],
        ['**Disziplinar**', '{{Art. 6 BayDG}} (i.V.m. {{§ 47 BeamtStG}})', 'LK persönlich — 5+2-Stufen-Katalog'],
        ['**Strafrecht**', 'StGB (KV, fahrl. Tötung, {{§ 203 StGB}})', 'LK persönlich'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen Aufsicht', text:
      'Aufsicht endet NICHT mit der letzten U.-Stunde — „erforderlichenfalls bis Weggang SuS". Schulweg ist Eltern-Verantwortung, ABER Schulbus + Wartezeit = Aufwandsträger. **Rückgriff auf LK** NUR bei Vorsatz + GROBER Fahrlässigkeit (NICHT bei einfacher). Vier Leitfragen sind das gerichtliche Prüfraster — bitte komplett nennen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zeitliche Reichweite hat die Aufsichtspflicht laut § 5 LDO + § 22 BaySchO?',
        a: 'GS + GS-Stufe FöS: 15 Min vor U.-Beginn + bis Verlassen des Schulgeländes nach U. (Bedarf 30 Min). Während: LK ab Beginn im Raum + gesamte Dauer eigener U. erforderlichenfalls bis Weggang SuS. Pausen nach SL-Einteilung. Außerschulisch: Treff-/Endpunkt = Beginn/Ende.' },
      { q: 'Wer haftet bei Aufsichtsversagen — und wann darf der Freistaat auf die LK Rückgriff nehmen?',
        a: 'Freistaat haftet nach außen ({{Art. 34 GG}}). Rückgriff auf LK NUR bei Vorsatz + GROBER Fahrlässigkeit. Disziplinar + Strafrecht treffen die LK persönlich — Schuldprinzip.' },
      { q: 'Welche vier Leitfragen prüft das Gericht bei einem Aufsichts-Vorfall?',
        a: 'Erkennbarkeit der Gefahr → festgelegte Verhaltensregeln → Kontrolle der Einhaltung → konsequente Maßnahmen bei Verstoß. Wer einen der vier Schritte unterlässt, schafft eine Haftungslücke.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      '{{§ 14 LDO}} bündelt drei Bereiche: (1) Verschwiegenheit (post-dienstlich) · (2) Presse-/Öffentlichkeitsauskunft NUR durch SL · (3) Drittauskunfts-Verbot. **KEIN „Notengeheimnis"** ggü. eigenen SuS/EB — aber kein vergleichender Bezug auf andere SuS.'
    },

    { type: 'h', text: 'Drei Bereiche § 14 LDO' },

    { type: 'svg', titel: 'Verschwiegenheits-Trias § 14 LDO',
      caption: 'Verschwiegenheit · Presse-Hoheit SL · Drittauskunfts-Verbot',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="300" y="18" text-anchor="middle" font-size="9.5" letter-spacing="1.8" class="muted">§ 14 LDO · DREI BEREICHE</text>
  <line x1="100" y1="26" x2="100" y2="42" class="rule-line"/>
  <line x1="300" y1="26" x2="300" y2="42" class="rule-line"/>
  <line x1="500" y1="26" x2="500" y2="42" class="rule-line"/>
  <g>
    <rect x="20" y="42" width="160" height="180" class="box"/>
    <text x="100" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">1 · VERSCHWIEGENHEIT</text>
    <line x1="30" y1="72" x2="170" y2="72" class="rule-line"/>
    <text x="100" y="92" text-anchor="middle" font-size="10">§ 14/1 LDO</text>
    <text x="100" y="106" text-anchor="middle" font-size="10" class="muted">§ 37 BeamtStG</text>
    <text x="100" y="132" text-anchor="middle" font-size="10" font-weight="500">über dienstlich</text>
    <text x="100" y="148" text-anchor="middle" font-size="10" font-weight="500">bekanntes</text>
    <line x1="30" y1="162" x2="170" y2="162" class="rule-line"/>
    <text x="100" y="184" text-anchor="middle" font-size="10" font-weight="600" data-accent="true">post-dienstlich</text>
    <text x="100" y="200" text-anchor="middle" font-size="9.5" class="muted">auch nach Ruhestand</text>
    <text x="100" y="214" text-anchor="middle" font-size="9.5" class="muted">fortwirkend</text>
  </g>
  <g>
    <rect x="220" y="42" width="160" height="180" class="box"/>
    <text x="300" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">2 · PRESSE-HOHEIT</text>
    <line x1="230" y1="72" x2="370" y2="72" class="rule-line"/>
    <text x="300" y="92" text-anchor="middle" font-size="10">§ 14/2 LDO</text>
    <text x="300" y="118" text-anchor="middle" font-size="10" font-weight="500">Medien · Behörden</text>
    <text x="300" y="134" text-anchor="middle" font-size="10" font-weight="500">NUR durch SL</text>
    <line x1="230" y1="148" x2="370" y2="148" class="rule-line"/>
    <text x="300" y="170" text-anchor="middle" font-size="9.5" class="muted">einzelne LK darf</text>
    <text x="300" y="184" text-anchor="middle" font-size="9.5" class="muted">nicht selbständig</text>
    <text x="300" y="198" text-anchor="middle" font-size="9.5" class="muted">Stellung nehmen</text>
  </g>
  <g>
    <rect x="420" y="42" width="160" height="180" class="box"/>
    <text x="500" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">3 · DRITTAUSKUNFT</text>
    <line x1="430" y1="72" x2="570" y2="72" class="rule-line"/>
    <text x="500" y="92" text-anchor="middle" font-size="10">§ 14/4 LDO</text>
    <text x="500" y="118" text-anchor="middle" font-size="10" font-weight="500">eigene SuS · EB ✓</text>
    <text x="500" y="134" text-anchor="middle" font-size="10" font-weight="500">Außenstehende ✗</text>
    <line x1="430" y1="148" x2="570" y2="148" class="rule-line"/>
    <text x="500" y="170" text-anchor="middle" font-size="9.5" class="muted">ohne Rechtsgrundl.</text>
    <text x="500" y="184" text-anchor="middle" font-size="9.5" class="muted">kein Bericht über</text>
    <text x="500" y="198" text-anchor="middle" font-size="9.5" class="muted">SuS an Dritte</text>
  </g>
  <text x="300" y="234" text-anchor="middle" font-size="9.5" letter-spacing="1.4" class="muted">KEIN „NOTENGEHEIMNIS" — Notenauskunft an SuS/EB regulär (Art. 56/2)</text>
</svg>`
    },

    { type: 'bullets', items: [
      '**Verschwiegenheit**: über dienstlich bekannt gewordene Angelegenheiten. **Post-dienstlich fortwirkend** — auch nach Ruhestand.',
      '**Presse-Hoheit SL**: Öffentlichkeitsauskunft ggü. Medien/Behörden NUR durch SL. Einzelne LK darf nicht selbständig Stellung nehmen.',
      '**Drittauskunfts-Verbot**: kein Bericht über SuS an Außenstehende ohne Rechtsgrundlage (§ 14/4 LDO).',
    ]},

    { type: 'h', text: 'Drittauskunfts-Logik' },
    { type: 'numbered', items: [
      'Frage: An wen wird Auskunft gegeben?',
      'Eigene SuS / deren EB: regulär ({{Art. 56/2 BayEUG}} Nr. 4 + Art. 75 EB-Auskunft).',
      'Andere SuS oder Personen ohne Schul-Beziehung: Auskunft nur mit Rechtsgrundlage (z.B. polizeiliches Auskunftsersuchen, gerichtliche Anordnung).',
      '**Verlangen nach Vergleich** (Lara-Note für Tim-EB): UNZULÄSSIG — auch wenn beide Eltern „einverstanden". Daten Dritter sind tabu.',
    ]},

    { type: 'h', text: 'Notenauskunfts-Falle' },
    { type: 'p', text:
      'Cross-Ref MP_05 Hannah-Fall: Notenauskunft ist subjektives öffentliches Recht ({{Art. 56/2 BayEUG}} + Art. 52/1 + DSGVO 15 + Art. 128 BV). § 14 LDO begründet KEIN „Notengeheimnis" ggü. den eigenen SuS/EB — aber das Drittauskunfts-Verbot greift gegen Vergleichs-Wünsche. Wer das Notengeheimnis als Begründung nennt, fällt in die Lieblingsfalle der Schulräte.'
    },

    { type: 'warn', titel: '⚠ Falle § 14 LDO', text:
      'KEIN „Notengeheimnis" ggü. eigenen SuS/EB — Auskunft regulär gewähren. Aber **kein VERGLEICHENDER Bezug auf andere SuS** namentlich. Lara-Note geht andere Eltern nichts an, auch nicht „kurz vergleichend". Pressekontakt NUR durch SL, nicht durch einzelne LK.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Bereiche bündelt § 14 LDO — und wer darf zur Presse sprechen?',
        a: '(1) Verschwiegenheit über dienstlich Bekanntes (post-dienstlich fortwirkend). (2) Presse-Hoheit der SL — einzelne LK darf nicht selbständig zu Schulthemen öffentlich Stellung nehmen. (3) Drittauskunfts-Verbot ggü. Außenstehenden ohne Rechtsgrundlage.' },
      { q: 'Wie reagiert die LK auf den Eltern-Wunsch „Wie hat Lara abgeschnitten?"',
        a: 'Höflich-bestimmt zurückweisen mit Verweis auf Daten Dritter (§ 14 LDO Drittauskunfts-Verbot, DSGVO 6/1 fehlende Rechtsgrundlage). Eigene Tim-Note bleibt regulär — Notenauskunft ist subjektives öff. Recht (Art. 56/2 Nr. 4). Cross-Ref MP_05 Hannah-Fall.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'LK-Fortbildung ist Pflicht: **{{§ 9a LDO}}/2 + {{Art. 20 BayLBG}} + KMBek 09.08.2002** (Anpassung 08.2025) — **12 Fortbildungstage / 4 Jahre** (≈ 60 h), davon **mindestens 1/3 SchiLF** (Schulinterne Lehrerfortbildung).'
    },

    { type: 'h', text: 'Fortbildungs-Pflicht-Architektur' },
    { type: 'bullets', items: [
      '**Selbst-Fortbildung**: Pflicht zur eigenständigen Weiterbildung.',
      '**Dienstliche Fortbildung**: Teilnahme an angeordneten Veranstaltungen.',
      '**Umfang KMBek 08.2025**: 12 Tage / 4 Jahre, ca. 60 h.',
      '**SchiLF-Anteil**: mindestens 1/3 Schulinterne Lehrerfortbildung — kollektive Schulentwicklung priorisiert.',
      'Pädagogischer Tag (KMBek 24.08.1999) als spezifisches SchiLF-Format.',
    ]},

    { type: 'h', text: 'KL-Aufgaben § 6 LDO' },
    { type: 'bullets', items: [
      'Pädagogische + organisatorische Koordination der Klasse.',
      'Kontakt zu Erziehungsberechtigten.',
      '**§ 6/2 LDO Koordinationspflicht**: KL koordiniert mit Fach-LK — Hebel im KL-Stufenplan bei Eltern-Beschwerden.',
      '§ 6/3 LDO Beratungspflicht (Eltern + SuS).',
      'Cross-Ref MP_02: KL-Stufenplan bei HA-Beschwerde.',
    ]},

    { type: 'warn', titel: '⚠ Falle Fortbildung', text:
      'Fortbildung ist NICHT mit beliebigen Veranstaltungen erfüllt — mindestens 1/3 muss SchiLF sein (kollektive Schulentwicklung priorisiert). 12 Tage / 4 Jahre — nicht 3/Jahr verbindlich, aber Mittelwert.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welcher Umfang + welcher Anteil SchiLF gelten für die LK-Fortbildung?',
        a: '{{Art. 20 BayLBG}} + {{§ 9a LDO}}/2 + KMBek 09.08.2002 (Anpassung 08.2025): 12 Fortbildungstage / 4 Jahre (≈ 60 h), davon mindestens 1/3 SchiLF. Selbst-Fortbildung + dienstliche Fortbildung kombiniert.' },
      { q: 'Welche zwei Hebel hat die KL bei Eltern-Beschwerden — und welche Norm trägt sie?',
        a: '{{§ 6 LDO}}/2 Koordinationspflicht mit Fach-LK (KL-Stufenplan Stufe 2) + § 6/3 Beratungspflicht (Eltern + SuS). Cross-Ref MP_02 HA-Beschwerde-Stufenplan.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Beamten-Lehrkräfte haben Vereinigungs-/Gewerkschaftsrecht ({{Art. 33/5 GG}} i.V.m. Art. 9/3 GG), aber **kein Streikrecht** — folgt aus „hergebrachten Grundsätzen des Berufsbeamtentums". Personalvertretung: **Mitbestimmung (Art. 75 BayPVG) ≠ Mitwirkung (Art. 76 BayPVG)**.'
    },

    { type: 'h', text: 'Mitbestimmung ↔ Mitwirkung' },
    { type: 'table',
      head: ['Stufe', 'Norm', 'Wirkung'],
      rows: [
        ['**Mitbestimmung**', '{{Art. 75 BayPVG}}', '**Zustimmungspflicht** der Personalvertretung — ohne Zustimmung Maßnahme unwirksam. Höchste Stufe. Bei Einstellung, Versetzung, Beförderung.'],
        ['**Mitwirkung**', '{{Art. 76 BayPVG}}', 'Geringere Stufe — Stellungnahme, aber Dienststelle entscheidet. Bei Auflösung/Verkleinerung.'],
      ],
    },

    { type: 'h', text: 'Streikverbot Beamte' },
    { type: 'bullets', items: [
      '**{{Art. 33/5 GG}}** „hergebrachte Grundsätze des Berufsbeamtentums" → Treuepflicht + Alimentationsprinzip kompensieren.',
      'BVerfG-Rechtsprechung bestätigt: Streikverbot greift auch bei Warnstreik.',
      '**Vereinigungs-/Gewerkschaftsrecht (Art. 9/3 GG)** bleibt — Mitgliedschaft + Demonstrationen in der Freizeit erlaubt.',
      '**Tarifbeschäftigte LK** (TVöD/TV-L) dürfen streiken — kein Beamtenstatus.',
      'Streik durch Beamten = Dienstvergehen ({{§ 47 BeamtStG}}) → Disziplinarmaßnahme ({{Art. 6 BayDG}}).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Personalvertretung + Streik', text:
      '**Mitbestimmung** verlangt **ZUSTIMMUNG** (Vetorecht). **Mitwirkung** = nur Stellungnahme. Beamte haben Gewerkschaftsrecht, aber KEIN Streikrecht — auch nicht bei Warnstreiks. Tarifbeschäftigte dürfen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wie unterscheiden sich Mitbestimmung und Mitwirkung im BayPVG?',
        a: 'Mitbestimmung ({{Art. 75 BayPVG}}): Zustimmungspflicht des Personalrats — ohne Zustimmung Maßnahme unwirksam. Mitwirkung ({{Art. 76 BayPVG}}): nur Stellungnahme, Dienststelle entscheidet. Zwei Beteiligungsstufen, nicht synonym.' },
      { q: 'Warum dürfen verbeamtete LK nicht streiken — und welche Rechte bleiben?',
        a: 'Streikverbot folgt aus {{Art. 33/5 GG}} (hergebrachte Grundsätze Berufsbeamtentum) — Treuepflicht + Alimentationsprinzip. BVerfG bestätigt. Gewerkschaftsmitgliedschaft (Art. 9/3 GG) bleibt + Demonstrationen in Freizeit. Tarifbeschäftigte dürfen streiken.' },
    ]},
  ],
};
