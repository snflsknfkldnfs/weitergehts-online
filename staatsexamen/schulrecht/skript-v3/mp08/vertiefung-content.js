// MP_08 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Der **Mobile Sonderpädagogische Dienst (MSD)** ist **präventiv-integrativ**: ein **Dienst an der allgemeinen Schule** ({{Art. 21 BayEUG}}), KEINE eigene Schulart ({{Art. 19 BayEUG}}). Ziel: negative Entwicklung aufhalten, **Verbleib an der allgemeinen Schule** sichern, FöS-Überweisung **vermeiden**.'
    },

    { type: 'h', text: 'Träger + 5 Aufgaben — Wortlaut Art. 21/1' },
    { type: 'p', text:
      '**Träger** ({{Art. 21 BayEUG}} S. 3 verbatim): „Mobile Sonderpädagogische Dienste werden von den **nächstgelegenen Förderschulen mit entsprechendem Förderschwerpunkt** geleistet." Personal: Förderschullehrkräfte.'
    },
    { type: 'p', text:
      '**5 Aufgaben** ({{Art. 21 BayEUG}} S. 2 verbatim): „Sie **diagnostizieren** und **fördern** die Schülerinnen und Schüler, sie **beraten** Lehrkräfte, Erziehungsberechtigte und Schülerinnen und Schüler, **koordinieren** sonderpädagogische Förderung und führen **Fortbildungen** für Lehrkräfte durch."'
    },

    { type: 'h', text: '7 (+2) Förderbereiche' },
    { type: 'bullets', items: [
      '**7 Förderschwerpunkte** aus {{Art. 20/1 BayEUG}}: Sehen · Hören · k./m. Entwicklung · gE · Sprache · Lernen · em./soz. Entwicklung.',
      'Praxis-Erweiterung in MSD: + **Autismus** + **ELECOK** (Elektronische Hilfen + Computer für Körperbehinderte) → **9 Bereiche**.',
    ]},

    { type: 'h', text: 'Anfrage-Indikatoren + Maßstab' },
    { type: 'table',
      head: ['Feld', 'Indikator (Beispiele)'],
      rows: [
        ['Lern / Leistung', 'Verweigerung, Schwänzen, U.-Störung, Schul-/Prüfungsangst, Konzentration'],
        ['Sozial', 'Aggression, Außenseiter, Verwahrlosung, Delinquenz, sex. Auffälligkeit'],
        ['Emotional', 'aggressiv, Beziehungsstörung, psychosomatisch, zwanghaft'],
        ['Psychomotorisch', 'Wahrnehmung, Aufmerksamkeit, Hyperaktivität, Motorik'],
      ],
    },
    { type: 'p', text:
      '**Maßstab**: Einzelsymptom ≠ Auffälligkeit. Ausschlag = **Ausprägung + Dauer + Intensität + Häufigkeit + Kombination**.'
    },

    { type: 'h', text: 'Erweiterungen MSD' },
    { type: 'bullets', items: [
      '**Förderdiagnostischer Bericht** — MSD verantwortet; **Eltern-Info-Pflicht** vor standardisierten Tests.',
      'Unterstützung **inklusiver Schulentwicklung** an allgem. Schule.',
      'Übergangsbegleitung **schulischer Lernorte** (z.B. Wechsel allgem. ↔ FöS).',
    ]},

    { type: 'warn', titel: '⚠ Fallen MSD', text:
      '**MSD ≠ FöS** — Dienst ({{Art. 21 BayEUG}}) vs. Schulart ({{Art. 19 BayEUG}}). **MSD ≠ MSH** — schulisch (Art. 21) vs. **vorschulisch** ({{Art. 19/2 BayEUG}}). **Eltern-Info-Pflicht** vor standardisierten Tests. Schülerunterlagen-Weitergabe nur mit Einwilligung (Cross-Ref MP_05 BaySchO § 39).',
    },

    { type: 'selfcheck', items: [
      { q: 'Was unterscheidet MSD von FöS — und wer ist der Träger des MSD?',
        a: 'MSD = **Dienst** an der allgem. Schule ({{Art. 21 BayEUG}}). FöS = **Schulart** ({{Art. 19 BayEUG}}). Träger des MSD: **nächstgelegene Förderschule mit entsprechendem Förderschwerpunkt** (Art. 21 S. 3). MSD wird VON der FöS geleistet, ist aber selbst keine Schulart.' },
      { q: 'Welche 5 Aufgaben hat der MSD nach Wortlaut Art. 21?',
        a: '„diagnostizieren und fördern" + „beraten" (LK, Eltern, SuS) + „koordinieren" sonderpäd. Förderung + „Fortbildungen für Lehrkräfte". Zusätzlich: **Förderdiagn. Bericht** mit Eltern-Info-Pflicht.' },
      { q: 'Was ist der Maßstab für „Auffälligkeit" bei der MSD-Anfrage?',
        a: 'Einzelsymptom ≠ Auffälligkeit. Ausschlag = **Ausprägung + Dauer + Intensität + Häufigkeit + Kombination**. Vier Anfrage-Felder: Lern/Leistung, Sozial, Emotional, Psychomotorisch.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Das **Förderzentrum (FöS)** ist die **Schulart** für sonderpäd. Förderung ({{Art. 19 BayEUG}}). Über den **Lernort entscheiden Eltern** ({{Art. 41/1 BayEUG}}). Inklusion an allgem. Schule ist nach {{Art. 30a BayEUG}} ausdrücklich möglich — die **Hertha-Falle** liegt in Abs. 4.'
    },

    { type: 'h', text: 'Aufgaben + 7 Schwerpunkte' },
    { type: 'p', text:
      '**Aufgaben** ({{Art. 19 BayEUG}} Abs. 1–3): diagnostizieren · erziehen · unterrichten · beraten · fördern. **Adressaten**: K/J mit Bedarf, an allgem. Schule nicht ausreichend förderbar. **Leistungsspektrum**: Klassen-U. + SVE (Schulvorbereitende Einrichtung, vorschulisch) + MSH + MSD.'
    },
    { type: 'p', text:
      '**7 Förderschwerpunkte** ({{Art. 20/1 BayEUG}}): Sehen · Hören · k./m. Entwicklung · gE · Sprache · Lernen · em./soz. Entwicklung. **Aufbau** ({{Art. 20 BayEUG}} Abs. 2): GS-Stufe 1–4 · MS-Stufe 5–9 (ggf. 10 MR) · **Berufsschulstufe 10–12** bei FS gE (ersetzt BS).'
    },

    { type: 'h', text: 'Lernort-Tabelle {{Art. 41 BayEUG}}' },
    { type: 'table',
      head: ['Abs.', 'Inhalt (Wortlaut-Auszug)'],
      rows: [
        ['1', '**Eltern entscheiden** den schulischen Lernort — allgem. Schule oder FöS'],
        ['2', 'Längerfristig Kranke → Schule für Kranke'],
        ['3', 'Eltern *sollen* Beratungsstelle aufsuchen'],
        ['4', '„melden ihr Kind … an der Sprengelschule, einer Schule mit dem Schulprofil »Inklusion« oder an der Förderschule an. Die Aufnahme an der Förderschule setzt die Erstellung eines **sonderpädagogischen Gutachtens** voraus."'],
        ['5', 'Bedarf nicht deckbar → geeignete FöS'],
        ['6', 'Kein Einvernehmen → **Schulaufsichtsbehörde** entscheidet nach Anhörung'],
      ],
    },

    { type: 'h', text: 'Überweisungsverfahren {{GrSO § 5}} (6 Schritte)' },
    { type: 'numbered', items: [
      'KL erörtert mit Eltern (Anlass + Förder-Idee).',
      'Schriftliche Meldung an SL.',
      'SL benachrichtigt Eltern.',
      'Hinweis auf BL / SPych.',
      'Sonderpäd. Gutachten (Pflicht nach Art. 41/4 für FöS-Aufnahme).',
      'Eltern-Stellungnahme → Festlegung Förderort.',
    ]},

    { type: 'h', text: 'Förderplanpflicht {{MSO § 14}}' },
    { type: 'bullets', items: [
      'Pflicht für SuS mit **voraussichtlich nicht erreichten Lernzielen** — Individueller Förderplan + Nachteilsausgleich.',
      'Inhalt: Ziele + Maßnahmen + Leistungserhebungen.',
      '**Jährlich fortschreiben**.',
      '**MSD-Einbeziehung Pflicht**, mit Eltern erörtern.',
      'Sonderpäd. Bedarf ≠ Schulart-Zugehörigkeit ({{Art. 30a/5 BayEUG}}).',
    ]},

    { type: 'h', text: 'Inklusion {{Art. 30a BayEUG}} + Hertha-Falle' },
    { type: 'bullets', items: [
      'Abs. 1: Pflicht aller Schularten zur Zusammenarbeit.',
      'Abs. 3: Gemeinsamer Unterricht mit/ohne sonderpäd. Bedarf möglich; FöS unterstützt.',
      '**Abs. 4**: FS **Sehen / Hören / k.-m.** an allgem. Schule **NUR mit Sachaufwandsträger-Zustimmung**.',
      'Abs. 5: Sonderpäd. Bedarf ≠ Schulart-Zugehörigkeit.',
      '**4 Kooperationsformen** (KMBek): Kooperationsklasse (gemeinsam + MSD) · Partnerklasse (FöS↔allgem., lernzieldifferent) · Offene Klasse FöS · Tandemklasse.',
    ]},

    { type: 'warn', titel: '⚠ Falle FöS — Hertha-Konfiguration', text:
      '**Hertha (FS gE) → Regelschule**: rechtlich möglich ({{Art. 41/1 BayEUG}} + {{Art. 30a/3 BayEUG}}). **ABER**: Sachaufwandsträger-Zustimmung ({{Art. 30a/4 BayEUG}}) gilt **NUR** für **Sehen / Hören / k.-m.** — bei FS **gE NICHT erforderlich**. Wer gE in den Abs.-4-Katalog zählt, fällt in die Falle.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer entscheidet über den schulischen Lernort eines Kindes mit Förderbedarf — und was passiert bei Dissens?',
        a: '**Eltern** ({{Art. 41/1 BayEUG}}). Bei Nicht-Einvernehmen entscheidet die **Schulaufsichtsbehörde** nach Anhörung ({{Art. 41/6 BayEUG}}). FöS-Aufnahme: sonderpäd. Gutachten Pflicht ({{Art. 41 BayEUG}} Abs. 4).' },
      { q: 'Hertha (FS gE) soll an die Regelschule wechseln — braucht das die Zustimmung des Sachaufwandsträgers?',
        a: 'NEIN. {{Art. 30a/4 BayEUG}} betrifft **nur** Sehen / Hören / k.-m. — gE NICHT. Rechtsgrundlage Lernort: {{Art. 41/1 BayEUG}} + {{Art. 30a/3 BayEUG}}. Förderplan {{MSO § 14}} verbindlich; Schulprofil Inklusion oder Kooperations-/Partnerklasse prüfen.' },
      { q: 'Wann besteht Förderplanpflicht — und was muss der Plan enthalten?',
        a: 'Pflicht bei **voraussichtlich nicht erreichten Lernzielen** ({{MSO § 14}}). Inhalt: Ziele + Maßnahmen + Leistungserhebungen. **Jährlich fortschreiben**. **MSD einbeziehen** + mit Eltern erörtern.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      '**Schulberatung** ist nach {{Art. 78 BayEUG}} Aufgabe jeder Schule und jeder Lehrkraft. **Freiwilligkeitsgrundsatz**: Eltern können Beratung in Anspruch nehmen, aber nicht erzwungen werden. Eskalation läuft in **5 Stufen** vom KL bis zur außerschulischen Stelle.'
    },

    { type: 'h', text: 'Beratungsweg — 5 Eskalationsstufen' },
    { type: 'numbered', items: [
      '**Klassenleitung (KL)** — wöchentliche Sprechstunde, erste Anlaufstelle.',
      '**Schul-intern**: BL · SPych · MSD — je nach Frage.',
      '**Beratungsrektor:in** (Staatl. Schulamt) — Koordination, Eskalation.',
      '**Staatl. Schulberatungsstelle** (9 in Bayern; KIBBS) — überregional.',
      '**Außerschulisch** — Erziehungsberatung · Jugendamt · Therapie.',
    ]},

    { type: 'h', text: 'Beratungsebenen — BL vs. SPych vs. MSD' },
    { type: 'table',
      head: ['Ebene', 'Wer', 'Qualifikation / Zuständigkeit'],
      rows: [
        ['1', '**KL**', 'wöchentliche Sprechstunde; erste Anlaufstelle'],
        ['2a', '**Beratungslehrkraft (BL)**', 'Lehrkraft + **Erweiterungsstudium Univ.** ODER 2-J-Weiterbildung'],
        ['2b', '**Schulpsycholog:in (SPych)**', 'Psychologie-Studium mit schulpsych. Schwerpunkt; mehrere Schulen'],
        ['2c', '**MSD**', 'Förderschullehrkraft ({{Art. 21 BayEUG}})'],
        ['3', '**Beratungsrektor:in**', 'Staatl. SchA, Koordination, Eskalation'],
        ['4', '**Staatl. Schulberatungsstelle**', '9 in Bayern; KIBBS Kriseninterventions-Team'],
        ['5', '**Außerschulisch**', 'Erziehungsberatung, Jugendamt, Therapie'],
      ],
    },

    { type: 'h', text: 'Themen + SPych-Spezial-Felder' },
    { type: 'bullets', items: [
      '**Themen**: Schullaufbahn / Übertritt · Bildungsmöglichkeiten · Lern-/Leistungsstörung · Verhaltensauffälligkeit.',
      '**SPych-Aufgaben**: Diagnostik · Gruppenuntersuchungen · Krisenintervention · Test-/Diagnoseverfahren (LRS, Rechenschwäche) · Supervision · kollegiale Fallbesprechung.',
      '**SPych-Spezial-Felder**: Inklusion · Lehrergesundheit · Coaching · Mobbing · Demokratie/Toleranz · **KIBBS**.',
    ]},

    { type: 'h', text: 'LK ≠ Therapie' },
    { type: 'bullets', items: [
      '**Weiterleitungs-Pflicht** an BL/SPych/Erziehungsberatung.',
      '**Verschwiegenheit + Eltern-Einverständnis** Voraussetzung für Erziehungsberatung.',
      '**Freiwilligkeitsgrundsatz** Schulberatung — Eltern können ablehnen.',
      'Außerschul. Schnittstellen: vorschulisch (Einschulungsberatung) · Berufsberatung MS 8/9 · Gesundheitsamt / Logopäd:innen · Jugendamt · Erziehungsberatung.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Schulberatung', text:
      '**BL ≠ SPych** — Lehrkraft mit Zusatz-Qualifikation vs. Psychologe; unterschiedlicher Aufgabenkatalog. **LK darf NICHT selbst therapieren** — Pflicht zur Weiterleitung. **Freiwilligkeitsgrundsatz**: Eltern können Beratung selbst beantragen, aber auch ablehnen — keine Veto-Position der Schule.',
    },

    { type: 'selfcheck', items: [
      { q: 'Worin liegt der Unterschied BL ↔ SPych — Qualifikation + Aufgabenkatalog?',
        a: '**BL** = Lehrkraft + Erweiterungsstudium Univ. ODER 2-J-Weiterbildung; im Schul-Kollegium. **SPych** = Psychologie-Studium mit schulpsych. Schwerpunkt; meist für mehrere Schulen zuständig. SPych verantwortet Tests/Diagnose (LRS, Rechenschwäche), Krisenintervention, KIBBS.' },
      { q: 'Eine Schülerin zeigt therapiebedürftige Symptome — was darf die LK, was nicht?',
        a: 'LK darf **NICHT** selbst therapieren — **Weiterleitungs-Pflicht** an BL / SPych / Erziehungsberatung. **Verschwiegenheit + Eltern-Einverständnis** Voraussetzung. **Freiwilligkeitsgrundsatz** — Eltern können ablehnen.' },
      { q: 'Wie ist der Eskalationsweg der Schulberatung?',
        a: '5 Stufen: KL → BL/SPych/MSD → Beratungsrektor:in → Staatl. Schulberatungsstelle (KIBBS) → Außerschulisch (Erziehungsberatung, Jugendamt, Therapie). Wechsel jederzeit möglich; Freiwilligkeitsgrundsatz.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Vier Säulen Betreuung — **drei Rechtsregime**: schulisch (Halbtags-GS, GTS) · kommunal (Mittagsbetreuung) · jugendhilferechtlich (Hort). Jede Säule hat eigene Norm, eigenen Träger und eigene Aufsichtspflicht-Sphäre.'
    },

    { type: 'h', text: 'Übersicht 4 Säulen' },
    { type: 'table',
      head: ['Form', 'Norm', 'Träger', 'Zeit / Charakter'],
      rows: [
        ['**Mittagsbetreuung**', '{{Art. 31/3 BayEUG}}', 'Gemeinde / gemeinnützig', 'bis ~14 Uhr; verlängert bis 15:30/16:00 mit HA'],
        ['**Halbtags-GS**', 'KMBek seit 1999/2000', 'staatl.', '7:30 – 13:00 Uhr; rhythmisierter Vormittag'],
        ['**Ganztagsschule (oGTS/gGTS)**', '{{Art. 6/4 BayEUG}} + KMBek 08.07.2013 / 10.02.2020', 'staatl.', 'mind. 4 Tage à 7 Std.'],
        ['**Hort**', '{{§ 22 SGB VIII}} + KMBek 12.06.1991', 'freier/kirchl./kommunal. JuHi-Träger', 'außerschulisch; eigene Bildungs-/Erziehungseinrichtung'],
      ],
    },

    { type: 'h', text: 'oGTS vs. gGTS — der zentrale Unterschied' },
    { type: 'table',
      head: ['', 'oGTS (offen)', 'gGTS (gebunden)'],
      rows: [
        ['Norm-Anker', 'KMBek 08.07.2013', 'KMBek 10.02.2020'],
        ['Vormittag', 'Klassenverband regulär', 'Ganztagszug'],
        ['Nachmittag', '**freiwillig** mit Anmeldung', '**verpflichtend** ab Anmeldung'],
        ['Rhythmus', 'separater Nachmittag', '**rhythmisiert** über den ganzen Tag'],
        ['Anmeldung', 'freiwillig (durch Eltern)', 'freiwillig (durch Eltern)'],
        ['Teilnahme', 'pro Tag wählbar', 'ab Anmeldung verpflichtend'],
      ],
    },
    { type: 'p', text:
      '**Beide GTS-Formen**: Mittagsverpflegung + HA-Betreuung + Förder-U. + AGs. **gGTS** zusätzlich: 45-Min-Regel-Abweichung möglich, Sprachförderung, Gewaltprävention. **Kein Rechtsanspruch** auf GTS-Platz — Wahlfreiheit Halbtag↔Ganztag.'
    },

    { type: 'h', text: 'Aufsichtspflicht-Übergänge (Cross-Ref MP_06 + MP_07)' },
    { type: 'bullets', items: [
      '**Halbtags-GS**: Aufsicht Schule bis Ende U.; **Mittagspause** = **Schulverband / Gemeinde**, NICHT Schule.',
      '**Mittagsbetreuung**: Gemeinde / gemeinnützig (Art. 31/3) — Aufsicht beim Träger.',
      '**GTS**: Aufsicht Schule für den gesamten gebundenen/offenen Nachmittag.',
      '**Hort**: außerschulisch (§ 22 SGB VIII) — Aufsicht beim JuHi-Träger; KMBek 12.06.1991 regelt Kooperation Schule↔Hort, nicht Aufsichtsübergang.',
      '**Wegzeit zwischen den Säulen**: Eltern-/Trägerverantwortung, NICHT Schule (außer organisierter Transport durch Schule).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Betreuung', text:
      '**Mittagsbetreuung ≠ Hort ≠ GTS** — drei verschiedene Rechtsregime. **gGTS-Anmeldung freiwillig**, danach **Teilnahme verpflichtend**. **Aufsichtspflicht Mittagspause Halbtags-GS** = Schulverband / Gemeinde, NICHT Schule (Cross-Ref MP_06). **Kein Rechtsanspruch** auf GTS-Platz — Wahlfreiheit, Schulaufwandsträger entscheidet Ausbau.',
    },

    { type: 'selfcheck', items: [
      { q: 'Mittagsbetreuung, Hort und GTS — sind das drei Begriffe für dasselbe?',
        a: 'NEIN — drei verschiedene Rechtsträger: Gemeinde (Mittagsbetreuung, {{Art. 31/3 BayEUG}}) · freier/kirchl./kommunaler JuHi-Träger (Hort, {{§ 22 SGB VIII}}) · staatl. Schule (GTS, {{Art. 6/4 BayEUG}}). Drei Rechtsregime, drei Haftungsachsen.' },
      { q: 'oGTS vs. gGTS — was unterscheidet sie zentral?',
        a: '**oGTS**: Vormittag im Klassenverband, Nachmittag **freiwillig** mit Anmeldung. **gGTS**: **Ganztagszug**, **verpflichtend** ab Anmeldung; rhythmisierter U.; mind. 4 Tage à 7 Std. **Anmeldung in beiden Fällen freiwillig — Teilnahme bei gGTS verpflichtend.**' },
      { q: 'Niklas (Halbtags-GS) verletzt sich um 13:15 Uhr auf dem Weg zum Hort. Wer haftet?',
        a: 'Schule haftet NICHT — die Mittagspause Halbtags-GS liegt beim **Schulverband / Gemeinde**, die Wegzeit zum Hort beim Hort-Träger / Eltern. Cross-Ref MP_06 (Aufsichtspflicht-Sphären) + MP_07 (Haftungsdreieck).' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Zwei Anker mit Examensrelevanz: **GTS-Antragsprinzip** (Trägerebene, Wahlfreiheit, kein Anspruch) und **Förderlehrkraft (FL)** mit ihrer **28-UE-Arbeitszeit-Aufteilung** und der **5-WStd-Vertretungs-Cap**.'
    },

    { type: 'h', text: 'GTS-Antragsprinzip' },
    { type: 'bullets', items: [
      '**Antragsberechtigt**: **Schulaufwandsträger** (Gemeinde / Landkreis), NICHT Eltern direkt.',
      'Antrag an GS / MS / RS / WS / Gym + entspr. FöS möglich.',
      '**Im Benehmen mit Trägern öff. Jugendhilfe** — Planung erfordert Abstimmung.',
      '**Wahlfreiheit Halbtag↔Ganztag** — Eltern entscheiden über Anmeldung.',
      '**Kein Rechtsanspruch** auf GTS-Platz — Ausbau abhängig von Träger-Entscheidung.',
      '**Teilnahmepflicht ab Anmeldung** (gGTS-Spezifikum).',
    ]},

    { type: 'h', text: 'Förderlehrkraft (FL) {{Art. 60 BayEUG}}' },
    { type: 'p', text:
      '**Rechtsgrund** {{Art. 60 BayEUG}} Abs. 1 S. 2 (Wortlaut): „selbstständig und eigenverantwortlich". **Begleit-Normen** (Sekundärliteratur): VSO-F § 25, MSO §§ 9/10.'
    },
    { type: 'p', text:
      '**Aufgaben**: AG-Leitung · LRS-Förder-U. · Intensiv-/Förder-U. · diff. Sport/Schwimmen · EH/Verkehr · Aufsicht.'
    },
    { type: 'h', text: 'Arbeitszeit-Aufteilung GS/MS — 28 UE' },
    { type: 'table',
      head: ['Anteil', 'Stunden (45 Min)', 'Charakter'],
      rows: [
        ['Eigenverantwortlich (AGs)', '**8 UE**', 'AG-Leitung, LRS-Förder-U.'],
        ['Kooperations-U.', '**20 UE**', 'mit Kooperations-LK (Klasseneinsatz)'],
        ['Verwaltung (60 Min)', '**5 Std**', 'Vorbereitung, Dokumentation'],
        ['**Gesamt**', '**28 UE**', 'GS / MS Standardrahmen'],
      ],
    },
    { type: 'p', text:
      '**FöS / Schulen für Kranke**: 27 UE. **SL** bestellt Einsatzplan; **Kooperations-LK** verantwortet Klasseneinsatz.'
    },

    { type: 'h', text: 'FL-Vertretungs-Cap' },
    { type: 'bullets', items: [
      'FL-Vertretungsunterricht **NUR kurzfristig** in unabweisbaren Fällen.',
      '**Max. 5 WStd** Vertretung.',
      '**NICHT permanent** — Dauer-Vertretung wäre Verstoß gegen FL-Aufgabenbindung.',
      'Alternativen bei Dauer-Vertretungsbedarf: mobile Reserve, befristete Vertretungsregelung über SchA.',
    ]},

    { type: 'warn', titel: '⚠ Falle FL — Dauer-Vertretung', text:
      'FL als **permanente Vertretung** ist **rechtswidrig** — schützt die 8 eigenverantwortlichen AG-Stunden + 20 Kooperations-U. Bei wiederholter Praxis: Eskalation an Schulaufsichtsbehörde / Beratungsrektor:in. Personalrat hat Mitbestimmungsrecht (Cross-Ref MP_06 Personalvertretung).',
    },

    { type: 'selfcheck', items: [
      { q: 'Eltern fordern bei der Schule die Einrichtung einer gGTS — wer ist der richtige Adressat?',
        a: 'NICHT die SL direkt — Antrag läuft über **Schulaufwandsträger** (Gemeinde / Landkreis) im Benehmen mit Trägern öff. Jugendhilfe. Eltern haben **kein** direktes Antragsrecht; auch **kein Rechtsanspruch** auf GTS-Platz. Eltern-Initiative kann politisch wirken, aber nicht rechtlich erzwungen.' },
      { q: 'SL setzt FL Becker 6 Wochen täglich als Klassenleitungs-Vertretung ein. Rechtmäßig?',
        a: 'NEIN. FL-Vertretungsunterricht NUR **kurzfristig** in unabweisbaren Fällen, **max. 5 WStd**, NICHT permanent. Dauer-Vertretung verletzt FL-Aufgabenbindung ({{Art. 60 BayEUG}}: 8 + 20 + 5). Eskalation: Beratungsrektor:in / Schulaufsichtsbehörde; Personalrat-Mitbestimmungsrecht.' },
      { q: 'Wie ist die Arbeitszeit einer FL an GS/MS aufgeteilt?',
        a: '**28 UE (45 Min)** = **8 eigenverantwortlich** (AGs / LRS-Förder-U.) + **20 Kooperations-U.** (mit Kooperations-LK) + **5 Verwaltungsstunden (60 Min)**. FöS/Kranke: 27 UE. SL bestellt Einsatzplan; Kooperations-LK verantwortet Klasseneinsatz.' },
    ]},
  ],

};
