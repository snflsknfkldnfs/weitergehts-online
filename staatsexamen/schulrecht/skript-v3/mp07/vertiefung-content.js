// MP_07 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Der/die **Klassenelternsprecher:in** ({{Art. 64 BayEUG}}) ist das Bindeglied zwischen EB einer Klasse, KL und Schule. Wahl zu SJ-Beginn; Vermittlungs-Funktion bei Konflikten. KEIN Beschluss-Organ.'
    },

    { type: 'h', text: 'Wahl + Amtszeit' },
    { type: 'bullets', items: [
      'Wahl zu Beginn des Schuljahres im **Klassenelternabend** durch die EB der Klasse.',
      'Wahlleitung: KL oder durch EB selbst organisiert.',
      'Amtszeit i.d.R. **1 Schuljahr**.',
      'Stellvertretung üblich (vor allem an größeren Schulen).',
      'Klassenelternsprecher:in ist gleichzeitig Mitglied im Klassenelternabend-Kreis.',
    ]},

    { type: 'h', text: 'Vermittlungs-Funktion' },
    { type: 'p', text:
      'Aufgabe: Information der EB der Klasse · Bündelung von Anliegen · Mitwirkung an Klassenelternabenden · **Vermittlung bei Konflikten** zwischen EB und LK. Klassenelternsprecher:in moderiert Gespräche zwischen EB und KL/Fach-LK, ohne selbst Beschlüsse zu fassen.'
    },

    { type: 'warn', titel: '⚠ Fallen Klassenelternsprecher', text:
      '**Kein Beschwerde-Empfänger** im juristischen Sinn — Beschwerden gehen den Weg {{Art. 56}}/5: LK → SL → Schulforum. **Kein Disziplinar-Organ** ggü. LK. **Keine Notenkonferenz-Mitgliedschaft** — das ist Lehrerkonferenz.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer wählt den/die Klassenelternsprecher:in?',
        a: 'Die EB der Klasse im Klassenelternabend. Wahlleitung KL oder EB-organisiert ({{Art. 64}}).' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Der **Elternbeirat** ({{Art. 65-67 BayEUG}}) ist die Schul-Ebene der EB-Vertretung. Wahl alle 2 Schuljahre. Beratungs-, Anhörungs- und Beschwerde-Anrufungs-Rechte. KEINE Entscheidungskompetenz über U./Noten.'
    },

    { type: 'h', text: 'Wahl + Konstituierung' },
    { type: 'bullets', items: [
      '**Wahl alle 2 Schuljahre** ({{Art. 65}}). Erste 6 Wochen nach SJ-Beginn.',
      'Wahlberechtigt + wählbar: alle EB der Schule (volljährig + Sorgerecht).',
      'Mitgliederzahl an MS: 5–12 (je nach Schulgröße).',
      'Aus der Mitte: **Vorsitzende:r** + Stellvertreter:in.',
      'Wahl geheim ({{Art. 66}}).',
    ]},

    { type: 'h', text: 'Aufgaben Art. 67' },
    { type: 'table',
      head: ['Aufgabe', 'Reichweite'],
      rows: [
        ['**Zusammenarbeit fördern**', 'Bindeglied EB ↔ Schule; Elternabende; Information'],
        ['**Beratungsrecht**', 'an wesentlichen Schulangelegenheiten teilnehmen + Stellungnahme'],
        ['**Anhörungsrecht**', 'vor Entscheidungen, die die Schule wesentlich betreffen (Schul-Vereinbarung, Stundenplan-Grundsätze, Schulprofil)'],
        ['**Beschwerde-Anrufung**', 'kann Schulforum + SL einschalten; bei Eskalation Schulaufsicht'],
        ['**Mitwirkung Schulpartner-Foren**', 'Mitglied im Schulforum ({{Art. 69}})'],
      ],
    },

    { type: 'h', text: 'Anhörungsrecht — was umfasst es?' },
    { type: 'bullets', items: [
      'Vor Entscheidung der SL/Lehrerkonferenz in wesentlichen Schulangelegenheiten.',
      'Vor Beschluss von Schul-Vereinbarungen.',
      'Bei wesentlichen Stundenplan-Änderungen.',
      'KEIN Vetorecht — Stellungnahme + Berücksichtigungs-Pflicht.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Elternbeirat', text:
      '**Beratungs-/Anhörungsrecht ≠ Entscheidung** — Elternbeirat kann nicht über U.-Inhalte, Noten, Personal entscheiden. **Wahl alle 2 Jahre** (nicht jährlich wie Klassenelternsprecher). **Vorsitz** vertritt nach außen, nicht jedes Mitglied.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wie oft wird der Elternbeirat gewählt?',
        a: 'Alle 2 Schuljahre, in den ersten 6 Wochen nach SJ-Beginn ({{Art. 65}}).' },
      { q: 'Hat der Elternbeirat ein Vetorecht?',
        a: 'NEIN. Beratungs- + Anhörungsrecht; Stellungnahme + Berücksichtigungs-Pflicht der SL/Lehrerkonferenz, aber kein Veto.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Das **Schulforum** ({{Art. 69 BayEUG}}) ist das Bindeglied zwischen allen Schulpartnern — EB, SuS, LK, SL, Schulträger. Beratungs-Gremium für Schulleben + Schulentwicklung + Bildungsangebot. KEIN Beschluss-Organ über Personal/Noten/U.-Inhalte.'
    },

    { type: 'h', text: 'Zusammensetzung (MS)' },
    { type: 'table',
      head: ['Vertretung', 'Anzahl'],
      rows: [
        ['**SL (Vorsitz)**', '1'],
        ['**Elternbeirat-Vertretung**', 'mind. 2'],
        ['**SMV-Vertretung**', 'mind. 1 (Schülersprecher:in)'],
        ['**Schulträger-Vertretung**', '1 (Gemeinde/Schulverband)'],
        ['**Lehrkräfte**', 'bis 2 (gewählt von Lehrerkonferenz)'],
      ],
    },

    { type: 'h', text: 'Aufgaben + Grenzen' },
    { type: 'bullets', items: [
      '**Beratung Schulleben**: Schulvereinbarung, Schulkultur, Schul-Konflikte.',
      '**Beratung Schulentwicklung**: Profil-Bildung, Programme, AGs.',
      '**Beratung Bildungsangebot**: Wahlfächer, Lernlandschaften.',
      'Bindeglied zwischen EB ↔ Schule ↔ SuS ↔ Aufwandsträger.',
      '**Beschwerde-Eskalations-Stufe** ({{Art. 56}}/5): EB-Beschwerden landen letztlich hier (nach LK und SL).',
      '**NICHT**: Personal-Entscheidungen, Noten-Festlegung, U.-Inhalte (gehört zu LK/SL/Lehrerkonferenz).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Schulforum', text:
      '**Beratungsorgan ≠ Beschluss-Organ** — Schulforum-Beschlüsse haben Empfehlungs-Charakter. **Nicht identisch mit Elternbeirat** — zwei verschiedene Gremien (Elternbeirat = nur EB; Schulforum = alle Partner). **Vorsitz SL** — Schulforum ist nicht „Elternsache".',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer hat den Vorsitz im Schulforum?',
        a: 'Die SL ({{Art. 69 BayEUG}}).' },
      { q: 'Was ist der Unterschied Schulforum vs. Elternbeirat?',
        a: 'Schulforum = alle Schulpartner (SL + EB + SMV + LK + Schulträger). Elternbeirat = nur EB.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      '**EB-Pflichten** {{Art. 76 BayEUG}}: zwei Pflichten wortlautgetreu — **„auf den regelmäßigen Schulbesuch zu achten"** + **„die Erziehungsarbeit der Schule zu unterstützen"**. Ergänzt durch {{§ 20 BaySchO}} Meldepflicht. Eskalation Art. 119 OWi → Art. 118 Schulzwang.'
    },

    { type: 'h', text: 'Art. 76 BayEUG — Wortlaut' },
    { type: 'p', text:
      '„Die Erziehungsberechtigten haben auf den regelmäßigen Schulbesuch des Kindes zu achten und die Erziehungsarbeit der Schule zu unterstützen."'
    },

    { type: 'h', text: 'Zwei Pflichten' },
    { type: 'table',
      head: ['Pflicht', 'Reichweite'],
      rows: [
        ['**„achten auf"**', 'Aktive Überwachung des Schulbesuchs. Sicherstellen, dass das Kind morgens zur Schule geht. Bei Absenz: Meldung.'],
        ['**„unterstützen"**', 'Positive Mitwirkung an der schulischen Erziehung. Hausaufgaben-Rahmenbedingungen schaffen. Schul-Entscheidungen mittragen, auch wenn schwierig.'],
      ],
    },

    { type: 'h', text: '§ 20 BaySchO — Meldepflicht' },
    { type: 'bullets', items: [
      'Verhinderung des Kindes (Krankheit, Notfall): **unverzüglich** melden (i.d.R. vor U.-Beginn am Krankheitstag).',
      'Schriftliche Mitteilung nachreichen (Entschuldigung).',
      'Bei längerer Krankheit (>3 Tage): SL kann **schulärztliches Zeugnis** verlangen.',
      'Bei Häufung unentschuldigter Fehlzeiten: KL → SL → ggf. OWi-Anzeige Art. 119.',
    ]},

    { type: 'h', text: 'Eskalations-Kette bei Pflichtverletzung' },
    { type: 'table',
      head: ['Stufe', 'Maßnahme', 'Anker'],
      rows: [
        ['1', 'Gespräch + Beratung', 'KL + SL + Beratungs-LK / Schulpsych'],
        ['2', 'Schriftliche Mahnung', '§ 20 BaySchO + Art. 76'],
        ['3', '**Ordnungswidrigkeits-Anzeige**', '{{Art. 119}} BayEUG → Kreisverwaltung Geldbuße'],
        ['4', '**Schulzwang**', '{{Art. 118}} BayEUG — Antrag SL bei Kreisverwaltung'],
        ['5', 'Grundrechtseinschränkung', 'Art. 120 BayEUG (selten — Freiheit/Wohnung)'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen EB-Pflichten', text:
      '**„achten" ≠ polizeiliche Überwachung** — keine Garantenstellung im strafrechtlichen Sinn, aber aktive Aufmerksamkeit. **„unterstützen" ≠ blinde Zustimmung** — Eltern dürfen Meinungs-Differenzen haben, müssen aber Verfassung des Bildungsauftrags akzeptieren. **OWi {{Art. 119}}** = Verfahren bei Kreisverwaltungsbehörde, nicht bei LK. Schulzwang {{Art. 118}} ist allerletzte Stufe.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zwei Pflichten formuliert Art. 76 BayEUG verbatim?',
        a: '„auf den regelmäßigen Schulbesuch zu achten" + „die Erziehungsarbeit der Schule zu unterstützen". Zwei Pflichten.' },
      { q: 'Welche Norm regelt die Meldepflicht bei Verhinderung?',
        a: '{{§ 20 BaySchO}}: EB müssen unverzüglich melden + schriftliche Mitteilung nachreichen.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'EB-Mitwirkung in **Beschwerdeweg** + **Anhörung** + **Sorgerecht**. Beschwerdeweg {{Art. 56/5}} gestuft. Anhörung {{Art. 88}} bei OM. Personensorge {{§§ 1626 BGB}}: gemeinsam/allein. Getrenntlebende: i.d.R. beide auskunftsberechtigt.'
    },

    { type: 'h', text: 'Beschwerdeweg Art. 56/5 — gestuft' },
    { type: 'p', text:
      'Verbatim: Beschwerden gehen **nacheinander** den Weg: **LK → SL → Schulforum**. NICHT parallel. EB können die Eskalation Schritt für Schritt anstoßen. Bei OM-Beschwerde: Widerspruch + ggf. Verwaltungsklage parallel.'
    },

    { type: 'h', text: 'Anhörungsrecht bei OM' },
    { type: 'bullets', items: [
      '{{Art. 88 BayEUG}}: vor jeder OM ist **SuS anzuhören**; **EB rechtzeitig zu informieren**.',
      'EB können an der Anhörung **teilnehmen** (Begleitung der minderjährigen SuS).',
      'Bei Versäumnis der Anhörung: OM-Anfechtung möglich (Verfahrensfehler).',
      'Nur bei Sicherungsmaßnahme {{Art. 87}}: Eilfall-Nachholung erlaubt.',
    ]},

    { type: 'h', text: 'Sorgerecht + Schul-Auskunft' },
    { type: 'table',
      head: ['Sorgerechts-Lage', 'Auskunfts-Berechtigung'],
      rows: [
        ['**Verheiratete EB**', 'gemeinsam — Schule informiert beide'],
        ['**Nicht verheirateteEB + Sorgerechts-Erklärung**', 'gemeinsam'],
        ['**Nicht verheiratete EB ohne Erklärung**', 'Mutter allein ({{§ 1626a BGB}})'],
        ['**Geschieden / Getrennt**', 'i.d.R. weiterhin gemeinsam, sofern nicht gerichtlich anders'],
        ['**Alleinige Sorge nach Beschluss**', 'nur sorgeberechtigte:r — andere:r Auskunft nur nach {{§ 1686 BGB}} (besondere Anfrage)'],
      ],
    },

    { type: 'h', text: 'Praxis-Hinweise' },
    { type: 'bullets', items: [
      'Bei unklarer Sorge: Beschluss/Sorgerechts-Erklärung vorlegen lassen.',
      'Schule ist KEINE Schiedsstelle in elterlichem Konflikt — neutrale Auskunft.',
      'Bei Eskalation: Schul-Sozial-Arbeit + Jugendamt {{§ 8a SGB VIII}} einbeziehen.',
      '**Erziehungsbeauftragte** (Klassenfahrt-Begleitung) ist KEINE Personensorgeberechtigte — keine Schul-Auskunft.',
    ]},

    { type: 'warn', titel: '⚠ Fallen EB-Mitwirkung + Sorgerecht', text:
      '**Beschwerdeweg gestuft, nicht parallel** — Eltern dürfen nicht erst SL überspringen. **Anhörung VORAB Pflicht** bei OM — Nachholung nur bei {{Art. 87}}. **Sorgerechts-Lage prüfen** — pauschale Auskunft an beide ist problematisch, wenn alleinige Sorge besteht. **Schule als Schiedsrichter elterlicher Konflikte** = unangemessen — neutral bleiben.',
    },

    { type: 'selfcheck', items: [
      { q: 'In welcher Reihenfolge geht der Beschwerdeweg nach Art. 56/5?',
        a: 'LK → SL → Schulforum. Gestuft, nacheinander, NICHT parallel.' },
      { q: 'Wer ist auskunftsberechtigt bei gemeinsamer Sorge nach Trennung?',
        a: 'Beide EB ({{§ 1626 BGB}}). Schule informiert beide, sofern nicht gerichtlich anders.' },
      { q: 'Ist die Erziehungsbeauftragte i.S.d. JuSchG eine Sorgeberechtigte?',
        a: 'NEIN. Erziehungsbeauftragte i.S.v. {{§ 1 JuSchG}} Nr. 4 übernimmt ad-hoc Aufsicht (Klassenfahrt-Begleitung), ist aber nicht sorgeberechtigt + erhält keine Schul-Auskunft.' },
    ]},
  ],

};
