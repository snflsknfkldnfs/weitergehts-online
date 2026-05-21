// MP_02 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Das bayerische Schulwesen ist **gegliedert und durchlässig zugleich**: Jede Schulart hat ein eigenes Bildungsprofil entsprechend Anlage und Neigung der SuS, **Wechsel an allen Schnittstellen möglich**. Verfassungsanker: {{Art. 128 BV}} + {{Art. 132 BV}} + {{Art. 133 BV}}.'
    },

    { type: 'h', text: 'Verfassungsrahmen' },
    { type: 'bullets', items: [
      '**{{Art. 128 BV}}**: Bildungsanspruch jedes Bewohners entsprechend Anlagen + innerer Berufung.',
      '**{{Art. 132 BV}}**: Maßstab = Anlagen + Neigungen + Leistung + innere Berufung. NICHT wirtschaftlich-gesellschaftliche Stellung der Eltern.',
      '**{{Art. 133 BV}} Abs. 1**: Staat + Gemeinde wirken zusammen. Religions-/Weltanschauungsgemeinschaften sind Bildungsträger.',
      '**{{Art. 134 BV}}**: Privatschulen bedürfen staatlicher Genehmigung.',
    ]},

    { type: 'h', text: 'Schularten-Katalog ({{Art. 6 BayEUG}})' },

    { type: 'svg', titel: 'Schularten-Treppe nach Jahrgangsstufen',
      caption: 'allgemein-bildend · beruflich · sonderpäd.',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="30" y="20" font-size="9.5" letter-spacing="1.4" class="muted">JGST.</text>
  <text x="30" y="44" font-size="10" font-weight="500">1</text>
  <text x="30" y="64" font-size="10" font-weight="500">4</text>
  <text x="30" y="100" font-size="10" font-weight="500">5</text>
  <text x="30" y="160" font-size="10" font-weight="500">9</text>
  <text x="30" y="180" font-size="10" font-weight="500">10</text>
  <text x="30" y="220" font-size="10" font-weight="500">11</text>
  <text x="30" y="266" font-size="10" font-weight="500">13</text>
  <line x1="55" y1="34" x2="55" y2="280" class="rule-line"/>

  <text x="115" y="20" text-anchor="middle" font-size="9.5" letter-spacing="1.4" data-accent="true" font-weight="600">GS</text>
  <rect x="70" y="32" width="90" height="50" class="box"/>
  <text x="115" y="58" text-anchor="middle" font-size="11" font-weight="600">Grundschule</text>
  <text x="115" y="74" text-anchor="middle" font-size="9" class="muted">Art. 7 BayEUG</text>

  <text x="200" y="92" text-anchor="middle" font-size="9.5" letter-spacing="1.2" data-accent="true" font-weight="600">MS</text>
  <rect x="170" y="100" width="100" height="80" class="box"/>
  <text x="220" y="122" text-anchor="middle" font-size="10.5" font-weight="600">Mittelschule</text>
  <text x="220" y="138" text-anchor="middle" font-size="9" class="muted">Art. 7a BayEUG</text>
  <text x="220" y="154" text-anchor="middle" font-size="9" class="muted">5–9 / M-Zug</text>
  <text x="220" y="168" text-anchor="middle" font-size="9" class="muted">5–10</text>

  <text x="310" y="92" text-anchor="middle" font-size="9.5" letter-spacing="1.2" data-accent="true" font-weight="600">RS</text>
  <rect x="280" y="100" width="80" height="80" class="box"/>
  <text x="320" y="124" text-anchor="middle" font-size="10.5" font-weight="600">Realschule</text>
  <text x="320" y="140" text-anchor="middle" font-size="9" class="muted">Art. 8 BayEUG</text>
  <text x="320" y="156" text-anchor="middle" font-size="9" class="muted">5–10</text>

  <text x="410" y="92" text-anchor="middle" font-size="9.5" letter-spacing="1.2" data-accent="true" font-weight="600">GYM</text>
  <rect x="370" y="100" width="100" height="180" class="box"/>
  <text x="420" y="122" text-anchor="middle" font-size="10.5" font-weight="600">Gymnasium</text>
  <text x="420" y="138" text-anchor="middle" font-size="9" class="muted">Art. 9 BayEUG</text>
  <text x="420" y="154" text-anchor="middle" font-size="9" class="muted">G9</text>
  <text x="420" y="172" text-anchor="middle" font-size="9" class="muted">5–13</text>

  <text x="525" y="212" text-anchor="middle" font-size="9.5" letter-spacing="1.2" data-accent="true" font-weight="600">BERUFL.</text>
  <rect x="485" y="220" width="80" height="60" class="box"/>
  <text x="525" y="240" text-anchor="middle" font-size="10" font-weight="600">FOS · BOS</text>
  <text x="525" y="256" text-anchor="middle" font-size="9" class="muted">Art. 16 + 17</text>
  <text x="525" y="270" text-anchor="middle" font-size="9" class="muted">11–13</text>

  <line x1="55" y1="298" x2="565" y2="298" class="rule-line"/>
  <text x="115" y="316" text-anchor="middle" font-size="9" class="muted">+ Förderschulen Art. 19–24 (7 Schwerpunkte) · BS Art. 11 · WS Art. 13 · Schulen f. Kranke Art. 41/2</text>
  <text x="430" y="316" text-anchor="middle" font-size="9" class="muted">parallel</text>
</svg>`
    },

    { type: 'bullets', items: [
      '**Allgemein bildend**: GS (Art. 7, Jgst. 1–4) · MS (Art. 7a, 5–9/M-Zug 5–10) · RS (Art. 8, 5–10) · Gym (Art. 9, 5–13 G9).',
      '**Beruflich** (Art. 11–18): BS · BFS · WS · FS · FOS · BOS · FA.',
      '**Förderschulen** (Art. 19–24): 7 Förderschwerpunkte; Grund-/Mittel-/Berufsschulstufe.',
      'Schulen für Kranke (Art. 41/2).',
    ]},

    { type: 'h', text: 'Privatschulen' },
    { type: 'table',
      head: ['Typ', 'Rechtsgrund', 'Schulpflicht-Erfüllung'],
      rows: [
        ['**Staatl. genehmigte Ersatzschule**', 'Art. 91–101 — eigenes päd. Konzept (Montessori, Waldorf)', 'erfüllt; Zeugnis NICHT identisch'],
        ['**Staatl. anerkannte Ersatzschule**', 'dauerhafte öff.-Standard-Konformität', 'erfüllt; Zeugnis identisch'],
        ['**Ergänzungsschule**', 'Art. 102–104 (z.B. Dolmetscherschule)', 'i.d.R. NICHT erfüllt'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen Schulwesen', text:
      '„Die GS ist die erste und gemeinsame Schule" ist NICHT absolut — Ausnahmen Förderschule ab Jgst. 1 + SVE. **Genehmigte ≠ anerkannte** Ersatzschule. {{Art. 44 BayEUG}} Elternwahlrecht ist NICHT absolut — gebunden an Eignung/Leistung.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zwei Bedingungen knüpft {{Art. 44 BayEUG}} an das Elternwahlrecht?',
        a: 'Eignung + Leistung. Eltern dürfen Schulart wählen — aber gebunden an die nachgewiesene Eignung des Kindes ({{Art. 132 BV}} Anlagen-/Leistungs-Prinzip).' },
      { q: 'Welche Privatschulen erfüllen die Schulpflicht — und welche vergeben anerkannte Zeugnisse?',
        a: 'Genehmigte UND anerkannte Ersatzschulen erfüllen die Schulpflicht. Nur ANERKANNTE Ersatzschulen vergeben selbständig anerkannte Zeugnisse. Ergänzungsschulen erfüllen die Schulpflicht i.d.R. NICHT.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Übergang KiGa → GS lebt von Kooperations-Strukturen + Sprachförderung. **{{Vorkurs Deutsch 240}}** als KMBek-Programm: 240 h über 1,5 Schuljahre, vorletztes + letztes KiTa-Jahr, Träger gemeinsam KiTa + GS.'
    },

    { type: 'h', text: 'Kooperation KiGa ↔ GS' },
    { type: 'bullets', items: [
      'Gemeinsame Konferenzen + Hospitationen.',
      'KiTa-Kinder besuchen GS (Schnuppertage).',
      'Elternabend zur Einschulung.',
      'Gemeinsame Feste + Infobriefe.',
    ]},

    { type: 'h', text: 'Vorkurs Deutsch 240 + SVE' },
    { type: 'bullets', items: [
      '{{Vorkurs Deutsch 240}}: **240 Stunden über 1,5 Schuljahre** — NICHT 1 J., NICHT 2 J.',
      'Träger gemeinsam KiTa + GS (je Hälfte).',
      '**SVE** (Schulvorbereitende Einrichtung) — Teil der Förderschule, sonderpäd. Anbahnung vor Jgst. 1.',
    ]},

    { type: 'warn', titel: '⚠ Falle Vorkurs', text:
      '{{Vorkurs Deutsch 240}} = **240 h über 1,5 Schuljahre**. „Lieblings-Falle" der Schulräte — exakte Dauer + Träger-Verbund (KiTa + GS gemeinsam) müssen sitzen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wie lange dauert der Vorkurs Deutsch 240 — und wer trägt ihn?',
        a: '240 Stunden über 1,5 Schuljahre (vorletztes + letztes KiTa-Jahr). Träger gemeinsam Kindergarten + Grundschule (je Hälfte). KMBek KWMBl 2011 S. 240.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Schulpflicht entsteht kraft Gesetz ({{Art. 35 BayEUG}}) und dauert 12 Jahre (9 Vollzeit + 3 BS). Stichtag 30.09. + Einschulungskorridor 01.07.–30.09. Wichtigste Begriffs-Falle: **Schulpflicht ≠ Schulzwang** — Pflicht vs. Sanktion.'
    },

    { type: 'h', text: 'Schulpflicht-Norm-Kette' },
    { type: 'bullets', items: [
      '**{{Art. 129 BV}}/1**: „Alle Kinder zum Besuch der Volksschule und Berufsschule verpflichtet."',
      '**{{Art. 129 BV}}/2**: Unterricht unentgeltlich.',
      '**{{Art. 35 BayEUG}}**: Schulpflicht bei altersmäßiger Voraussetzung + gewöhnlichem Aufenthalt Bayern. Dauer 12 J. = 9 Vollzeit + 3 BS.',
    ]},

    { type: 'h', text: 'Stichtag + Einschulungskorridor' },
    { type: 'table',
      head: ['Geburtsdatum', 'Regelung'],
      rows: [
        ['**bis 30.09.**', 'regulär schulpflichtig im Folgesommer'],
        ['**01.07.–30.09.**', 'Einschulungskorridor seit SJ 2019/2020: Eltern entscheiden'],
        ['**01.10.–31.12.**', '„Kann-Kinder" — freiwillig auf Eltern-Antrag'],
        ['**nach 31.12.**', 'freiwillig NUR mit schulpsychologischem Gutachten'],
      ],
    },

    { type: 'h', text: 'Migration' },
    { type: 'bullets', items: [
      'Beginn der Schulpflicht: **3 Monate nach Zuzug** (bei Aufenthaltsgestattung/-erlaubnis/Duldung/Ausreisepflicht).',
      'Einweisung: **Altersgleichheits-Prinzip** — Jgst. wie altersgleiche Dauer-in-Bayern-SuS.',
      '**Tiefer-Einweisung bis 2 Jgst.** zulässig NUR bei allgemein mangelndem Bildungsstand ({{Art. 36/3 BayEUG}} S. 4) — NICHT sprachlich. Falle!',
      'Keine Verlängerung der Schulpflicht durch tiefere Einweisung.',
    ]},

    { type: 'h', text: 'Schulpflicht ≠ Schulzwang — Eskalations-Kette' },
    { type: 'numbered', items: [
      '{{Art. 76 BayEUG}} + {{§ 20 BaySchO}}: Eltern + Schule überwachen gemeinsam.',
      '{{Art. 119 BayEUG}}: Ordnungswidrigkeit + Geldbuße bei Unterlassung Anmeldung.',
      '{{Art. 118 BayEUG}}: Schulzwang — „auf Antrag der Schule" von der Kreisverwaltungsbehörde durch Beauftragte zwangsweise der Schule zugeführt.',
      'Art. 120 BayEUG: Grundrechtseinschränkung Freiheit/Wohnung zugunsten Schulpflicht.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Schulpflicht', text:
      '**Schulpflicht ≠ Schulzwang**: Pflicht = Grundpflicht ({{Art. 35 BayEUG}} + {{Art. 76 BayEUG}} + § 20). Schulzwang = Sanktion (Art. 118/119/120). KEIN Synonym! **Migration**: Tiefer-Einweisung NUR bei allgemeinem Bildungsstand-Defizit, NICHT sprachlich. **BS-Pflicht-Ende**: SJ in dem 21. Lj. vollendet — NICHT „bis 18. Lj." oder „4 Jahre".',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Stufen kennt die Schulzwang-Eskalation in Bayern?',
        a: '{{Art. 119 BayEUG}} OWi + Geldbuße → {{Art. 118 BayEUG}} Schulzwang auf Antrag der Schule bei Kreisverwaltungsbehörde → Art. 120 Grundrechtseinschränkung Freiheit/Wohnung. Vorgelagert: {{Art. 76 BayEUG}} + {{§ 20 BaySchO}} gemeinsame Überwachung.' },
      { q: 'Wann genau beginnt die Schulpflicht bei aus dem Ausland zugezogenen Kindern?',
        a: '3 Monate nach Zuzug (bei Aufenthaltsgestattung/-erlaubnis/Duldung/Ausreisepflicht). Altersgleichheits-Prinzip. Tiefer-Einweisung bis 2 Jgst. NUR bei allgemeinem Bildungsstand-Defizit ({{Art. 36/3 BayEUG}} S. 4), NICHT sprachlich.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Übertritts-Schwellen sind die Examens-Klassiker. **{{§ 6 GrSO}}**: Mai-ÜZ Jgst. 4, nur **D/M/HSU**, Gym ≤ 2,33 / RS ≤ 2,66. **{{§ 6 MSO}}** Gelenkklasse: Jgst. 5 MS-Jahreszeugnis, D+M ≤ 2,0 / ≤ 2,5. **{{§ 7 MSO}}** M-Zug-Schwellen.'
    },

    { type: 'h', text: 'GS 4 → Sek I (Mai-ÜZ D/M/HSU)' },
    { type: 'table',
      head: ['Ziel', 'Schwelle', 'Probeunterricht'],
      rows: [
        ['**Gymnasium**', '≤ **2,33**', 'ab 2,34: PU 3 Tage D/M; bestanden = mind. 1×3 + 1×4; Elternwille bei 2× Note 4'],
        ['**Realschule**', '≤ **2,66**', 'analog'],
        ['**Mittelschule**', 'alle übrigen', '—'],
      ],
    },
    { type: 'p', text:
      'Eltern können **unabhängig vom Schnitt** Probeunterricht beantragen. **{{§ 10 GrSO}}**: 18 Probearbeiten bis ÜZ in D/M/HSU (Wortlaut Abs. 3 S. 2). Mindestens 4 U.-Wochen probearbeitenfrei „jeweils" pro Fach (Auslegung uneinheitlich — im Zweifel LK-Konferenz-Festlegung der konkreten Schule).'
    },

    { type: 'h', text: 'MS 5 → Gym/RS (Gelenkklasse, Jahreszeugnis)' },
    { type: 'table',
      head: ['Ziel', 'Schwelle', 'Anmerkung'],
      rows: [
        ['**Gymnasium**', 'D+M ≤ **2,0**', 'uneingeschränkt; sonst Härtefall'],
        ['**Realschule**', 'D+M ≤ **2,5**', 'uneingeschränkt'],
      ],
    },

    { type: 'h', text: 'MS → M-Zug ({{§ 7 MSO}})' },
    { type: 'table',
      head: ['Ziel', 'Schwelle D+M+E', 'Bedingung'],
      rows: [
        ['**M7**', '≤ **2,66**', 'aus 6. Kl. Jahreszeugnis'],
        ['**M8 / M9**', '≤ **2,33**', 'analog'],
        ['**M10**', 'Quali + ≤ **2,33**', '+ Quali-Zeugnis aus 9. Klasse'],
      ],
    },
    { type: 'p', text:
      'Sonst Antrag + Aufnahmeprüfung. **Rückkehr MS ↔ M-Zug jederzeit** ({{§ 8 MSO}}/3).'
    },

    { type: 'h', text: 'MS → Wirtschaftsschule (4-stufig, Jgst. 7)' },
    { type: 'bullets', items: [
      'Aus 6./7. Kl. MS: Zwischen-/Jahreszeugnis D+M+E ≤ 2,66 uneingeschränkt.',
      'Alternativ M-Zug-Vorrückungserlaubnis aus 7.',
      'Sonst Probeunterricht 3 Tage.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Übertritt', text:
      '**Schwellen**: Gym ≤ 2,33 (NICHT 2,5/3,0); RS ≤ 2,66; NUR D/M/HSU, NICHT alle Fächer. **Elternwillen-Regel** gilt NACH Probeunterricht bei 2× Note 4, NICHT vorab. **Übertritts-Dokument** nicht nur Jgst. 4 ÜZ — auch Gelenkklasse Jgst. 5 MS. **Probearbeiten-Festlegung** durch LK-Konferenz (nicht einzelne LK).',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Schwellen entscheiden den Übertritt GS Jgst. 4 → Sek I — und welche Fächer zählen?',
        a: 'Mai-ÜZ, nur D/M/HSU: Gym ≤ 2,33 · RS ≤ 2,66 · MS alle übrigen. Bei knapper Verfehlung Probeunterricht 3 Tage D/M (bestanden = mind. 1×3 + 1×4). Bei 2× Note 4: Elternwille entscheidet.' },
      { q: 'Was unterscheidet die Gelenkklasse Jgst. 5 vom Übertritt aus Jgst. 4?',
        a: 'Gelenkklasse {{§ 6 MSO}} nutzt JAHRESZEUGNIS (nicht ÜZ). Schwellen: D+M ≤ 2,0 Gym / ≤ 2,5 RS — KEINE D/M/HSU-Logik wie in Jgst. 4. Zweite reguläre Schnittstelle, die viele übersehen.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Die MS bietet vier Abschlüsse und drei Aufstiegswege zur Fachhochschulreife. Kerne: **ESA** (Vorrückung ≥ 4,00), **Quali** (50/50 + Projekt), **MSA** (M10), **Praxisklasse-Abschluss** ({{§ 22 MSO}}), **Quabi** ({{§ 34 MSO}}).'
    },

    { type: 'h', text: 'Vier MS-Abschlüsse' },
    { type: 'table',
      head: ['Abschluss', 'Norm', 'Bestehensformel'],
      rows: [
        ['**ESA** (Ende 9.)', 'MSO §§ 19 ff.', 'Vorrückungsfächer ≥ **4,00** + max. **3 Fächer schlechter als 4** (Note 6 = 2× Note 5)'],
        ['**Quali** (freiwillig Ende 9.)', 'MSO §§ 26 ff.', '50 % Jahresfortgang + 50 % Prüfung; Fächer D/M/E/PCB/GSE/AWT + Projektprüfung'],
        ['**MSA** (M10)', 'MSO §§ 30 ff.', 'schriftl./mündl./prakt. Prüfungen'],
        ['**Praxisklasse**', '{{§ 22 MSO}}', 'D/DaZ 90 Min + M 60 Min + Fächerverbund 45 Min + Projekt AWT (zählt doppelt); Bestehen ≤ 4,0'],
        ['**Quabi**', '{{§ 34 MSO}}', 'Quali + Berufsausbildungsabschluss → gleichwertig mittlerer Schulabschluss'],
      ],
    },

    { type: 'h', text: 'Drei Aufstiegswege MS → Fachabi' },
    { type: 'numbered', items: [
      '**Weg A — M-Zug**: MS 5 → M7 → M10 + MSA → FOS 11/12 → Fachabi.',
      '**Weg B — Quali + BS + FOS**: ESA + Quali → Berufsausbildung + BS → Quabi → FOS 11/12 → Fachabi.',
      '**Weg C — Wirtschaftsschule**: MS 6./7. → 4-stufige WS → mittlerer Abschluss → FOS.',
    ]},

    { type: 'h', text: 'Beratungspflicht {{Art. 78 BayEUG}}' },
    { type: 'p', text:
      'Schule + jede LK haben Eltern + SuS in Schullaufbahn-Fragen zu beraten + Hilfe bei Bildungsmöglichkeitswahl entsprechend Anlagen/Fähigkeiten. Die Durchlässigkeits-Perspektive (drei Aufstiegswege) gehört in jede ÜZ-Beratungs-Antwort.'
    },

    { type: 'warn', titel: '⚠ Falle Abschlüsse', text:
      '**Quali ≠ MSA**: Quali = freiwillige externe Prüfung Ende 9. (50/50). MSA = M10-Abschluss mit eigenen Prüfungsformaten. Genauigkeit der Benennung wird bewertet.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Bestehensformel hat der ESA — und was unterscheidet ihn vom Quali?',
        a: 'ESA: Vorrückungsfächer ≥ 4,00 + max. 3 Fächer schlechter als 4 (Note 6 = 2× Note 5). Quali: freiwillige externe Prüfung Ende 9., 50 % Jahresfortgang + 50 % Prüfung + Projektprüfung. ESA ist Abschluss-Voraussetzung; Quali zusätzliche Qualifikation.' },
      { q: 'Nenne die drei Aufstiegswege MS → Fachabi mit jeweils einem Anker.',
        a: 'A: M-Zug — M10 + MSA → FOS. B: Quali + BS → Quabi ({{§ 34 MSO}}) → FOS. C: Wirtschaftsschule → mittlerer Abschluss → FOS. Alle drei münden über FOS in die Fachhochschulreife.' },
    ]},
  ],
};
