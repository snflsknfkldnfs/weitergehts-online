// MP_04 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Die Schullaufbahn ist eine **Trias** aus SuS-Leistung, Eltern-Wahl und Schul-Beratung. **{{BV Art. 132}}** liefert den Verfassungs-Maßstab: **Anlagen + Neigungen + Leistung + innere Berufung**, NICHT wirtschaftliche/gesellschaftliche Stellung der Eltern. Eltern wählen ({{Art. 44 BayEUG}}, gebunden), Schule berät ({{Art. 78 BayEUG}}, strukturell), Lehrerkonferenz entscheidet ({{Art. 53 BayEUG}}).'
    },

    { type: 'h', text: 'Drei-Akteure-Tabelle' },
    { type: 'table',
      head: ['Akteur', 'Funktion', 'Norm-Anker'],
      rows: [
        ['**SuS**', 'Leistung erbringen · Mitwirkung an sonderpäd. Gutachten · regelm. Teilnahme', 'Art. 56/4 BayEUG (Cross-Ref MP_05 A.1)'],
        ['**Erziehungsberechtigte**', 'Anmeldung · Wahl der Schulart (Vorbehalt Eignung) · Mitwirkungspflicht · Lernort-Wahl bei FöS', '{{Art. 76 BayEUG}} + {{Art. 41 BayEUG}} + {{Art. 44 BayEUG}}'],
        ['**Schule**', 'LNW-Erhebung · Beratung · Vorrückens-/Wiederholens-Entscheidung · Förderplan · Schulartwechsel-Verfahren', '{{Art. 52 BayEUG}} + {{Art. 78 BayEUG}} + {{Art. 86 BayEUG}} + {{§ 12 MSO}} + {{§ 14 MSO}}'],
      ],
    },

    { type: 'h', text: 'Eltern-Mitwirkungspflicht {{Art. 76 BayEUG}} — Wortlaut' },
    { type: 'p', text:
      'verbatim Abs. 1: „Die Erziehungsberechtigten sind verpflichtet, auf die **gewissenhafte Erfüllung der schulischen Pflichten** einschließlich der Verpflichtung nach Art. 56 Abs. 4 Satz 5 und der von der Schule gestellten Anforderungen durch die Schülerinnen und Schüler zu achten und die **Erziehungsarbeit der Schule zu unterstützen**." Abs. 2: minderjährige Schulpflichtige am Unterricht regelmäßig teilnehmen lassen und verbindliche Schulveranstaltungen besuchen.'
    },

    { type: 'h', text: '{{Art. 44 BayEUG}} Elternwahlrecht — gebunden an Eignung' },
    { type: 'bullets', items: [
      'Eltern wählen Schulart / Ausbildungsrichtung / Fachrichtung — **gebunden an Eignung + Leistung**.',
      'Spezial-Aufnahmeprüfungen (z.B. Gym-Probeunterricht GS 4) zulässig.',
      '**Beratungs-Pflicht ({{Art. 78 BayEUG}}) ≠ Schulwahl-Entscheidung der LK** — Schule berät, Eltern wählen.',
      '**BV Art. 132** liefert den Maßstab: Anlagen + Leistung + innere Berufung, NICHT Elternstand.',
    ]},

    { type: 'h', text: '{{Art. 41 BayEUG}} Lernort bei sonderpäd. Förderbedarf — Wortlaut-Auszug' },
    { type: 'p', text:
      'Abs. 1: „Schulpflichtige mit sonderpädagogischem Förderbedarf erfüllen ihre Schulpflicht durch den Besuch der allgemeinen Schule oder der Förderschule. […] Die **Erziehungsberechtigten entscheiden**, an welchem der im Einzelfall rechtlich und tatsächlich zur Verfügung stehenden schulischen Lernorte ihr Kind unterrichtet werden soll […]." Abs. 6: „Kommt keine einvernehmliche Aufnahme zustande, entscheidet die zuständige **Schulaufsichtsbehörde** nach Anhörung der Erziehungsberechtigten und der betroffenen Schulen über den schulischen Lernort." Cross-Ref MP_08 Hertha-Falle.'
    },

    { type: 'warn', titel: '⚠ Fallen Trias', text:
      '**Eltern-Wahl Lernort ({{Art. 41 BayEUG}} Abs. 1)**: Erziehungsberechtigte (NICHT Schule) — bei Volljährigkeit + Einsichtsfähigkeit: SuS selbst. **Beratungs-Pflicht ≠ Schulwahl-Entscheidung der LK**: Schule berät; Eltern wählen ({{Art. 44 BayEUG}}). **Förderschul-Aufnahme** setzt sonderpäd. Gutachten voraus ({{Art. 41 BayEUG}} Abs. 4). **Elternwahlrecht ist NICHT absolut** — Vorbehalt Eignung/Leistung ({{BV Art. 132}} + Art. 44).',
    },

    { type: 'selfcheck', items: [
      { q: 'Was ist der Verfassungs-Maßstab für den Bildungsweg eines Kindes nach {{BV Art. 132}}?',
        a: '**Anlagen + Neigungen + Leistung + innere Berufung**. NICHT wirtschaftliche oder gesellschaftliche Stellung der Eltern. Konkretisierung über {{Art. 44 BayEUG}} — Elternwahlrecht ist an Eignung/Leistung gebunden.' },
      { q: 'Eltern wollen, dass die LK für ihr Kind eine Schulart-Entscheidung trifft. Darf die LK das?',
        a: 'NEIN. **{{Art. 78 BayEUG}}**: Schule berät — strukturell, keine Schulwahl-Entscheidung der LK. **{{Art. 44 BayEUG}}**: Eltern wählen, gebunden an Eignung/Leistung.' },
      { q: 'Bei sonderpäd. Förderbedarf — wer entscheidet den Lernort?',
        a: '**Eltern** ({{Art. 41 BayEUG}} Abs. 1). FöS-Aufnahme setzt sonderpäd. Gutachten voraus (Abs. 4). Bei Nicht-Einvernehmen entscheidet die **Schulaufsichtsbehörde** (Abs. 6).' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      '**{{Art. 53 BayEUG}}** ist die KERN-NORM für Vorrücken/Wiederholen — Detail-Regelungen in den Schulordnungen ({{§ 12 MSO}} + MSO §§ 19 ff.). **{{Art. 52 BayEUG}}** legt das LNW-Grundgerüst fest: Bekanntgabe vorher · Bewertung mit Notenstufe + Begründung eröffnen · **LNW dienen Bewertung UND Beratung**.'
    },

    { type: 'h', text: '{{Art. 52 BayEUG}} Abs. 1 LNW-Grundsatz — Wortlaut' },
    { type: 'p', text:
      'verbatim: „Zum Nachweis des Leistungsstands erbringen die Schülerinnen und Schüler in angemessenen Zeitabständen entsprechend der Art des Fachs schriftliche, mündliche und praktische Leistungen. Art, Zahl, Umfang, Schwierigkeit und Gewichtung der Leistungsnachweise richten sich nach den Erfordernissen der jeweiligen Schulart und Jahrgangsstufe sowie der einzelnen Fächer. Die **Art und Weise der Erhebung der Nachweise des Leistungsstandes ist den Schülerinnen und Schülern vorher bekannt zu geben**; die **Bewertung der Leistungen ist den Schülerinnen und Schülern mit Notenstufe und der Begründung für die Benotung zu eröffnen**. **Leistungsnachweise dienen der Leistungsbewertung und als Beratungsgrundlage**."'
    },

    { type: 'h', text: '{{Art. 52 BayEUG}} Abs. 2 Notenstufen — verbatim' },
    { type: 'table',
      head: ['Note', 'Bezeichnung', 'Definition (Wortlaut)'],
      rows: [
        ['1', 'sehr gut', '„Leistung entspricht den Anforderungen **in besonderem Maße**"'],
        ['2', 'gut', '„Leistung entspricht **voll** den Anforderungen"'],
        ['3', 'befriedigend', '„Leistung entspricht **im Allgemeinen** den Anforderungen"'],
        ['4', 'ausreichend', '„Leistung weist zwar Mängel auf, entspricht aber **im Ganzen noch** den Anforderungen"'],
        ['5', 'mangelhaft', '„Leistung entspricht nicht den Anforderungen, lässt jedoch erkennen, dass trotz deutlicher Verständnislücken die notwendigen **Grundkenntnisse vorhanden** sind"'],
        ['6', 'ungenügend', '„Leistung entspricht nicht den Anforderungen und lässt selbst die notwendigen Grundkenntnisse **nicht erkennen**"'],
      ],
    },

    { type: 'h', text: '{{Art. 52 BayEUG}} Abs. 3 Zeugnis — Wortlaut' },
    { type: 'p', text:
      'verbatim: „Unter Berücksichtigung der einzelnen schriftlichen, mündlichen und praktischen Leistungen werden Zeugnisse erteilt. Hierbei werden die **gesamten Leistungen** einer Schülerin oder eines Schülers unter Wahrung der Gleichbehandlung aller Schülerinnen und Schüler **in pädagogischer Verantwortung der Lehrkraft** bewertet. Daneben **sollen Bemerkungen oder Bewertungen** … über **Anlagen, Mitarbeit und Verhalten** der Schülerin oder des Schülers in das Zeugnis aufgenommen werden." → **Trias** Anlagen/Mitarbeit/Verhalten; KEINE eigenständige „Mitarbeitsnote".'
    },

    { type: 'h', text: '§ 12/1 MSO — Lehrerkonferenz-Festlegungen' },
    { type: 'p', text:
      'verbatim: „Die Lehrerkonferenz trifft **vor Unterrichtsbeginn des Schuljahres** grundsätzliche Festlegungen zur Erhebung von Leistungsnachweisen einschließlich prüfungsfreier Lernphasen. Die Festlegungen sind den Schülerinnen und Schülern sowie ihren Erziehungsberechtigten **bekannt zu geben**."'
    },

    { type: 'h', text: 'ESA-Bestehensformel (MSO §§ 19 ff.)' },
    { type: 'bullets', items: [
      'Vorrückungsfächer-Durchschnitt **≥ 4,00**.',
      'Max. **3 Fächer** schlechter als 4.',
      'Note 6 zählt wie **2× Note 5**.',
      '**Vorrücken auf Probe** bei knappem Notenbild — Lehrerkonferenz/SL-Entscheidung.',
      '**Überspringen**: Antrag mit Leistungsnachweis · SL-Genehmigung. Verkürzung der Vollzeitschulpflicht möglich; **keine Verlängerung durch Streckung** ({{Art. 35 BayEUG}} Abs. 2: „zwölf Jahre").',
    ]},

    { type: 'warn', titel: '⚠ Fallen Vorrücken / Wiederholung', text:
      '**{{Art. 53 BayEUG}} ist KERN-NORM** — Detail-Werte aus MSO §§ 19 ff. **Notenstufen-Definitionen exakt**: „in besonderem Maße" / „voll" / „im Allgemeinen" / „im Ganzen noch" — präzise zitieren. **„Mitarbeitsnote" gibt es nicht eigenständig** ({{Art. 52 BayEUG}} Abs. 3): Zeugnis-Bewertung der Gesamtleistungen + soll-Bemerkungen über Anlagen/Mitarbeit/Verhalten (Trias). **„Beratungsgrundlage"** ({{Art. 52 BayEUG}} Abs. 1 letzter Satz): LNW dienen Bewertung UND Beratung — beides nennen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zwei Pflichten formuliert {{Art. 52 BayEUG}} Abs. 1 für die Lehrkraft?',
        a: '(1) **Vorher bekannt geben**: Art und Weise der LNW-Erhebung. (2) **Eröffnen mit Notenstufe + Begründung**: Bewertung der Leistungen. Plus: LNW dienen **Bewertung UND Beratung** — beides nennen.' },
      { q: 'Welche Note hat welche Wortlaut-Definition (1 / 4 / 5)?',
        a: '**1 sehr gut**: „in besonderem Maße". **4 ausreichend**: „im Ganzen noch". **5 mangelhaft**: „Grundkenntnisse vorhanden" (trotz deutlicher Verständnislücken).' },
      { q: 'Eine Lehrkraft möchte eine „Mitarbeitsnote" eigenständig erteilen. Zulässig?',
        a: 'NEIN. {{Art. 52 BayEUG}} Abs. 3: Zeugnis-Bewertung der **Gesamtleistungen**; daneben **soll**-Bemerkungen über Anlagen/Mitarbeit/Verhalten (Trias) — keine eigenständige „Mitarbeitsnote".' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Übertritts-Schwellen folgen einem Stufen-System: **GS 4 → Sek I** (Mai-ÜZ, D/M/HSU) · **MS 5 Gelenkklasse** ({{§ 6 MSO}}, D+M) · **M-Zug** ({{§ 7 MSO}}, D+M+E). Verfassungs-/Gesetzes-Anker: {{BV Art. 132}} + {{Art. 44 BayEUG}} + {{Art. 43 BayEUG}}. Drei Schularten-Anker {{Art. 7 BayEUG}} (MS) / {{Art. 7a BayEUG}} (M-Zug) / {{Art. 7b BayEUG}} (besondere Art).'
    },

    { type: 'h', text: 'GS 4 → Sek I (Spiegel-Stoff MP_03 A.4)' },
    { type: 'table',
      head: ['Ziel', 'Schwelle (Mai-ÜZ Jgst. 4, D/M/HSU)', 'Probeunterricht'],
      rows: [
        ['**Gymnasium**', '≤ **2,33**', 'ab 2,34 PU 3 Tage D/M; bestanden = mind. 1×3 + 1×4'],
        ['**Realschule**', '≤ **2,66**', 'analog'],
        ['**Mittelschule**', 'alle übrigen', '—'],
      ],
    },
    { type: 'p', text:
      'Eltern-Antragsrecht PU unabhängig vom Schnitt. **Elternwillen-Regel**: bei 2× Note 4 NACH PU greift der Elternwille.'
    },

    { type: 'h', text: 'MS 5 → Gym/RS (Gelenkklasse · {{§ 6 MSO}})' },
    { type: 'table',
      head: ['Ziel', 'Schwelle (Jahreszeugnis Jgst. 5 MS)', 'Anmerkung'],
      rows: [
        ['**Gymnasium**', 'D+M ≤ **2,0**', 'uneingeschränkt; sonst Härtefall Lehrerkonferenz'],
        ['**Realschule**', 'D+M ≤ **2,5**', 'uneingeschränkt'],
      ],
    },

    { type: 'h', text: 'MS → M-Zug ({{§ 7 MSO}})' },
    { type: 'table',
      head: ['Ziel-Klasse', 'Schwelle D+M+E', 'Bedingung'],
      rows: [
        ['**M7**', '≤ **2,66**', 'uneingeschränkt aus Jgst. 6 Jahreszeugnis'],
        ['**M8 / M9**', '≤ **2,33**', 'analog'],
        ['**M10**', '≤ **2,33**', 'zusätzlich Quali-Voraussetzung aus 9. Klasse'],
      ],
    },
    { type: 'p', text: '**Rückkehr MS↔M-Zug jederzeit** ({{§ 8 MSO}}) als Sicherheitsnetz. Wirtschaftsschule (4-stufig, Jgst. 7): D+M+E ≤ 2,66 aus 6./7. Klasse Jahreszeugnis; alternativ M-Zug-Vorrückungserlaubnis aus 7.; sonst Probeunterricht.' },

    { type: 'h', text: 'Aufstiegswege MS → Hochschulreife' },
    { type: 'bullets', items: [
      '**Weg A (M-Zug)**: MS 5 → M7 (D+M+E ≤ 2,66) → M10 + MSA → FOS 11/12 → Fach-/Hochschulreife.',
      '**Weg B (Quali + BS + FOS)**: MS 5 → ESA Ende 9. → Quali (50/50 + Projekt) → Berufsausbildung + BS → Quabi {{§ 34 MSO}} → FOS 11/12 → Fach-/Hochschulreife.',
      '**Weg C (Wirtschaftsschule)**: MS 5 → WS 4-stufig (Jgst. 7) → mittlerer Abschluss → FOS 11/12 → Fach-/Hochschulreife.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Übertritt', text:
      '**GS-ÜZ-Schwellen ≠ Gelenkklassen-Schwellen**: GS 4 = Gym 2,33 / RS 2,66 (D/M/HSU); MS 5 = Gym 2,0 / RS 2,5 (D+M). **M-Zug-Schwellen NICHT alle gleich**: M7 ≤ 2,66 · M8/M9/M10 ≤ 2,33 (D+M+E). **Übertritts-Dokument nicht nur Jgst. 4**: Gelenkklasse Jgst. 5 MS + Jgst. 6 für M-Zug. **{{Art. 7a BayEUG}} (M-Zug) ≠ {{Art. 7b BayEUG}} (Schulen besonderer Art) ≠ Art. 30a/4 (Profil Inklusion, Cross-Ref MP_08)** — drei verschiedene Anker.',
    },

    { type: 'selfcheck', items: [
      { q: 'Aylin (MS 6, D+M+E = 2,33) will in M7 — Schwelle erfüllt?',
        a: '**JA**. {{§ 7 MSO}} M7-Schwelle ≤ **2,66** (D+M+E aus Jahreszeugnis Jgst. 6). Aylin 2,33 erfüllt uneingeschränkt. Sicherheitsnetz: {{§ 8 MSO}} Rückkehr MS↔M-Zug jederzeit möglich.' },
      { q: 'Welche Schwellen gelten in der Gelenkklasse Jgst. 5 MS für Gym / RS?',
        a: '**Gymnasium**: D+M ≤ **2,0**. **Realschule**: D+M ≤ **2,5** (Jahreszeugnis Jgst. 5). Uneingeschränkt; sonst Härtefall Lehrerkonferenz (für Gym).' },
      { q: 'Welche drei Aufstiegswege führen vom MS-Start zur Hochschulreife?',
        a: '**A** M-Zug → M10 + MSA → FOS. **B** Quali + Berufsausbildung → Quabi → FOS. **C** Wirtschaftsschule 4-stufig → mittlerer Abschluss → FOS. Alle drei Wege führen über die FOS 11/12 zur Fach-/Hochschulreife.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'MS-LNW sind in **{{§ 12 MSO}}** geregelt — der Container teilt sich in Abs. 1 (Lehrerkonferenz-Festlegungen), {{§ 12/2 MSO}} (Ankündigung), **{{§ 12/3 MSO}} (Rückgabe — KRITISCH!)** und § 12/4 (Projektprüfung Regelklasse). Hausaufgaben: **{{§ 28 BaySchO}}**. Individuelle Unterstützung: **{{§ 32 BaySchO}}** (Cross-Ref MP_05 Abgrenzung Nachteilsausgleich).'
    },

    { type: 'h', text: '{{§ 12/2 MSO}} Ankündigung — Werte verbatim' },
    { type: 'bullets', items: [
      '**Ankündigung 1 Woche vorher** (Pflicht bei größeren Lernabschnitten).',
      'Max. **1 angekündigte LNW / Tag**.',
      'Max. **2 angekündigte LNW / Woche**.',
      '**Nachtermin 1 Woche** vorher mitzuteilen.',
      '**Ersatzprüfung 2 Wochen** vorher mitzuteilen.',
      'Ersatzprüfung: **1× / Halbjahr**; kann **gesamten bisherigen Stoff** des Schuljahres umfassen.',
      'Mit dem Termin ist der **Prüfungsstoff bekannt zu geben**.',
    ]},

    { type: 'h', text: '{{§ 12/3 MSO}} Rückgabe — KRITISCH: zwei Direktionalitäten!' },
    { type: 'p', text:
      'verbatim: „Schriftliche und praktische Leistungsnachweise sind den Schülerinnen und Schülern **innerhalb einer angemessenen Frist** zurückzugeben und mit ihnen zu besprechen. Schriftliche Leistungsnachweise werden den Schülerinnen und Schülern **zur Kenntnisnahme durch die Erziehungsberechtigten mit nach Hause gegeben** … Die schriftlichen Leistungsnachweise sind **innerhalb einer Woche unverändert** an die Schule zurückzugeben. In begründeten Fällen kann die Herausgabe von Leistungsnachweisen unterbleiben."'
    },
    { type: 'table',
      head: ['Richtung', 'Frist (Wortlaut)', 'Anmerkung'],
      rows: [
        ['(a) **LK → SuS**', '**„angemessene Frist"** — KEIN konkreter Wert!', '„2 Wochen" wäre als Wortlaut **FALSCH**'],
        ['Zwischen­schritt', 'SuS → EB → Schule', 'Eltern-Kenntnisnahme als Zwischenschritt'],
        ['(b) **SuS → Schule**', '**„innerhalb einer Woche unverändert"**', '„Unverändert" = keine Manipulation der Korrektur'],
      ],
    },

    { type: 'h', text: '§ 12/4 MSO Projektprüfung Jgst. 9 Regelklasse' },
    { type: 'p', text:
      'Wortlaut-Auszug: „In der Jahrgangsstufe 9 findet für die Schülerinnen und Schüler einer **Regelklasse** eine Projektprüfung mit schriftlichen, mündlichen und praktischen Lerninhalten des Fachs **Wirtschaft und Beruf** sowie des jeweiligen … **berufsorientierenden Wahlpflichtfachs** statt." **Arbeitszeiten** (verbatim): Technik **240 Min.** · Wirtschaft + Kommunikation **120 Min.** · Ernährung + Soziales **150 Min.** · SL-**Zeitzuschlag bis 20 Min.** für Gruppen-Kommunikation. Aus erbrachten Leistungen wird **Gesamtnote** gebildet. **NICHT M-Zug** (M-Zug hat eigene MSA-Prüfung).'
    },

    { type: 'h', text: '{{§ 28 BaySchO}} Hausaufgaben + {{§ 32 BaySchO}} Differenzierung' },
    { type: 'bullets', items: [
      '**Maßstab § 28/1** (Wortlaut): „**durchschnittliches Leistungsvermögen**" + Berücksichtigung **Nachmittagsunterricht** + **berufliche Praktika**.',
      'Lehrerkonferenz legt vor Unterrichtsbeginn die **Grundsätze** fest.',
      '**Sonntage, Feiertage, Ferien** freizuhalten — DREI Kategorien.',
      'GS-Richtwert (§ 28/2): **bis zu einer Stunde** — Obergrenze, NICHT Mindestwert.',
      '**HA dürfen NICHT als LNW** genutzt werden (folgt aus Lehrplan/Grundsätzen).',
      'HA-Differenzierung steht in **{{§ 32 BaySchO}} Abs. 2 Nr. 6** (Individuelle Unterstützung), NICHT in § 28 selbst. § 32 gilt nur „soweit nicht die Leistungsfeststellung berührt wird" — Abgrenzung zu Nachteilsausgleich (Cross-Ref MP_05).',
    ]},

    { type: 'warn', titel: '⚠ Fallen LNW + HA', text:
      '**{{§ 12/3 MSO}} Direktionalitäts-Falle** (zwei Richtungen, „angemessene Frist" KEIN Wert!). **HA dürfen NICHT als LNW** genutzt werden. **HA-Differenzierung** steht in **{{§ 32 BaySchO}}**, nicht in § 28. **GS-Richtwert HA**: „bis zu einer Stunde" (Obergrenze, NICHT „eine Stunde" als Mindestwert). **Projektprüfung NUR Regelklasse Jgst. 9** — NICHT M-Zug.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche zwei Direktionalitäten regelt {{§ 12/3 MSO}}?',
        a: '**(a) LK→SuS** = **„angemessene Frist"** (KEIN konkreter Wert!). **(b) SuS→Schule** = **„innerhalb einer Woche unverändert"**. Eltern-Kenntnisnahme ist Zwischenschritt (SuS → EB → Schule). „Unverändert" = keine Manipulation der Korrektur.' },
      { q: 'Welche Werte gelten für angekündigte schriftliche LNW nach {{§ 12/2 MSO}}?',
        a: '**1 Woche** vorher angekündigt. Max. **1/Tag**, max. **2/Woche**. Nachtermin **1 Woche** vorher. Ersatzprüfung **2 Wochen** vorher, **1×/Halbjahr**, kann gesamten bisherigen Stoff umfassen.' },
      { q: 'Findet die Projektprüfung § 12/4 MSO auch im M-Zug statt?',
        a: 'NEIN. Wortlaut: **„Regelklasse Jgst. 9"**. M-Zug hat eigene MSA-Prüfung in M10. Werte: Technik 240 Min · W+K 120 Min · E+S 150 Min · SL-Zeitzuschlag bis 20 Min.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Die MS kennt **vier Abschlüsse + den Quabi**: **ESA** (Ende 9.) · **Quali** (freiwillig Ende 9., 50/50 + Projekt) · **MSA** (M10) · **Praxisklassen-Abschluss** ({{§ 22 MSO}}) · **Quabi** ({{§ 34 MSO}} — Quali + Berufsabschluss + Englisch). Förderplan bei Lernschwierigkeiten: **{{§ 14 MSO}}**.'
    },

    { type: 'h', text: 'Vier MS-Abschlüsse + Quabi — Übersicht' },
    { type: 'table',
      head: ['Abschluss', 'Norm', 'Bestehensformel / Voraussetzung'],
      rows: [
        ['**ESA** (Erfolgreicher MS-Abschluss) — Ende 9.', 'MSO §§ 19 ff.', 'Vorrückungsfächer-Schnitt ≥ **4,00** + max. **3 Fächer** schlechter als 4 (Note 6 = 2× Note 5)'],
        ['**Quali** (qualifizierender MS-Abschluss) — freiwillig Ende 9.', 'MSO §§ 26 ff. + KMBek QA-MS', '**50 % Jahresfortgang + 50 % Prüfung**; Fächer D / M / E + PCB / GSE / AWT + **Projektprüfung**'],
        ['**MSA** (Mittlerer Schulabschluss M10)', 'MSO §§ 30 ff. + KMBek MSA', 'schriftl. / mündl. / prakt. Prüfungen am Ende M10'],
        ['**Praxisklassen-Abschluss**', '**{{§ 22 MSO}}**', '9. Schulbesuchsjahr Praxis/Deutschklasse · theorieentlastete Prüfung · Bestehen Durchschnitt **≤ 4,0** · Projektnote **doppelt**'],
        ['**Quabi** (qualifizierter beruflicher Bildungsabschluss)', '**{{§ 34 MSO}}**', 'Quali + Berufsabschluss (mind. **3,0**) + Englisch **„ausreichend"**'],
      ],
    },

    { type: 'h', text: '{{§ 22 MSO}} Praxisklassen-Abschluss — Wortlaut' },
    { type: 'p', text:
      'verbatim Abs. 1: „Schüler **ab dem 9. Schulbesuchsjahr** in Praxisklassen oder Deutschklassen können den erfolgreichen Abschluss der Mittelschule mit dem Bestehen einer **theorieentlasteten Abschlussprüfung** erlangen."'
    },
    { type: 'p', text:
      'verbatim Abs. 2 (Auszug): „Die Prüfung besteht aus: 1. **Deutsch/DaZ** schriftlich (**75 Min.**) + mündlich (**15 Min.**); 2. **Mathematik** schriftlich (**60 Min.**); 3. **Fächerverbund** schriftlich (**45 Min.**); 4. **Projektprüfung**. Bestehen erfordert **Durchschnittsnote 4,0 oder besser**; **Projektprüfungsnote zählt doppelt**."'
    },

    { type: 'h', text: '{{§ 34 MSO}} Quabi — Wortlaut' },
    { type: 'p', text:
      'verbatim Abs. 1: „Für den qualifizierten beruflichen Bildungsabschluss [Quabi] ist ein **Berufsabschluss mit Notendurchschnitt von mindestens 3,0** erforderlich. Teilnoten werden gleich gewichtet, wenn im Zeugnis keine Gesamtnote festgesetzt ist."'
    },
    { type: 'p', text:
      'verbatim Abs. 2 (Auszug): „**Englischkenntnisse** werden durch die Note **„ausreichend"** nachgewiesen — über MS-Abschlusszeugnis, Jahreszeugnis Klasse 9/10 (Gym/RS/WS), nachgewiesene Englischkenntnisse für mittleren Schulabschluss oder BS/BFS-Zeugnis." Vorbedingung: **Quali**.'
    },

    { type: 'h', text: '{{§ 14 MSO}} Förderplan — Wortlaut' },
    { type: 'p', text:
      'verbatim: „¹Die Lernziele der Schülerinnen und Schüler, die auf Grund ihres sonderpädagogischen Förderbedarfs voraussichtlich die Lernziele der Mittelschule **nicht erreichen**, sind in einem **individuellen Förderplan festzuschreiben**; ansonsten kann ein Förderplan **bei Bedarf** erstellt werden. ²Der Förderplan enthält Aussagen über die **Ziele der Förderung, die wesentlichen Fördermaßnahmen und die vorgesehenen Leistungserhebungen**. ³Die Lernziele im Förderplan sind **mindestens jährlich fortzuschreiben**. ⁴Die Erstellung des Förderplans erfolgt **unter Einbeziehung der Mobilen Sonderpädagogischen Dienste**. ⁵Der Förderplan **soll** mit den Erziehungsberechtigten erörtert werden."'
    },

    { type: 'h', text: '{{§ 32 BaySchO}} Individuelle Unterstützung — 7-Maßnahmen-Katalog (Abs. 2)' },
    { type: 'numbered', items: [
      'Besondere Arbeitsmittel.',
      'Räumlichkeiten.',
      'Pausenregelungen.',
      'Hand-/Lautzeichen + Symbole.',
      'Individuelle Arbeitsanweisungen.',
      '**HA-Differenzierung**.',
      'Visualisierung + Verbalisierung.',
    ]},
    { type: 'p', text:
      '**KRITISCH**: Gilt nur **„soweit nicht die Leistungsfeststellung berührt wird"** — Abgrenzung zu Nachteilsausgleich (§ 33 BaySchO, Cross-Ref MP_05).'
    },

    { type: 'warn', titel: '⚠ Fallen Abschlüsse', text:
      '**Quali ≠ MSA ≠ Quabi**: Quali = freiwillige Ende-9-Prüfung (50/50 + Projekt); MSA = M10-Abschluss; Quabi = Quali + Berufsabschluss (≤ 3,0) + Englisch. **Praxisklassen-Abschluss: 9. Schulbesuchsjahr** (NICHT zwingend Jgst. 9). **{{§ 22 MSO}} Projektnote DOPPELT** in Praxisklassen-Bestehen. **{{§ 34 MSO}} Quabi „mindestens 3,0"** = ≤ 3,0 (NICHT besser als 3,0). **{{§ 14 MSO}} Förderplan**: Festschreibungs-Pflicht greift nur bei voraussichtl. Nicht-Erreichen MS-Lernziele. **{{Art. 84 BayEUG}}** ist Werbung/Vertrieb — NICHT Abschluss-Anker.',
    },

    { type: 'selfcheck', items: [
      { q: 'Tarek besucht das 9. Schulbesuchsjahr in einer Praxisklasse — wie ist die Prüfung strukturiert?',
        a: '{{§ 22 MSO}}: D/DaZ schriftl. **75 Min.** + mündl. **15 Min.** · M schriftl. **60 Min.** · Fächerverbund schriftl. **45 Min.** · Projektprüfung. Bestehen Durchschnitt **≤ 4,0** · **Projektnote zählt doppelt**.' },
      { q: 'Welche drei Voraussetzungen verlangt {{§ 34 MSO}} für den Quabi?',
        a: '(1) **Quali** als Vorbedingung. (2) **Berufsabschluss** mit Notendurchschnitt **mindestens 3,0**. (3) **Englisch „ausreichend"** (= mind. Note 4). Quabi ≠ Quali ≠ MSA.' },
      { q: 'Wann ist ein Förderplan nach {{§ 14 MSO}} verpflichtend, wann optional?',
        a: '**Pflicht** wenn SuS aufgrund sonderpäd. Förderbedarfs MS-Lernziele voraussichtlich **nicht erreichen**. **Optional („bei Bedarf")** in allen anderen Fällen. Drei Pflicht-Inhalte: Ziele · Fördermaßnahmen · Leistungserhebungen. MSD-Einbeziehung Pflicht; jährlich fortzuschreiben; Erörterung mit EB „soll".' },
    ]},
  ],

};
