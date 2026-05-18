// LB-Matrix Sozialkunde N18 · LP+-konform · zitierfähig
//
// QUELLEN-PRINZIP
// ────────────────────────────────────────────────────────────────────────
// 1. Spalten = die zwei für die Sozialkunde-Prüfung N18 relevanten
//    Lernbereiche des Fachs GPG (Geschichte/Politik/Geographie) der
//    Bayerischen Mittelschule: LB3 Politik und Gesellschaft + LB4
//    Wirtschaft und Recht.
// 2. KE-Wortlaute sind VERBATIM aus LehrplanPLUS Bayern Mittelschule GPG.
//    Quelle pro KE im `fundort`-Feld dokumentiert.
// 3. Umsetzungen entstammen Pauls eigener M7c-Praxis SJ 24/25 (13 real
//    durchgeführt) oder sind idealtypisch dokumentiert (14 KEs).
// 4. Didaktik-Bezüge zitieren Primärliteratur mit Jahr + ggf. Seite.
//
// LITERATUR-KÜRZEL
// ────────────────────────────────────────────────────────────────────────
// Beutelsbach1976  · Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.). 3
//                   Prinzipien: Überwältigungsverbot · Kontroversitätsgebot
//                   · Schülerorientierung.
// Detjen2007       · J. Detjen: Politische Bildung. Geschichte und Gegenwart
//                   in Deutschland. Oldenbourg 2007.
// Himmelmann2001   · G. Himmelmann: Demokratie-Lernen als Lebens-, Gesell-
//                   schafts- und Herrschaftsform. Wochenschau 2001.
// GPJE2004         · GPJE: Nationale Bildungsstandards politische Bildung 2004.
//                   3 Kompetenzdimensionen.
// Reinhardt2005    · S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen
//                   2005. Handlungsorientierung (Real- vs. Simulationshandeln).
// Massing          · P. Massing: Politische Bildung. Wochenschau-Verlag.
//                   Pro-Contra-Debatte · kasuistisches Verfahren.
// Massing2010      · P. Massing: Fallanalyse / Kasuistik. Wochenschau 2010.
// Bergmann2000     · K. Bergmann: Multiperspektivität · Geschichts- und Politik-
//                   didaktik. Wochenschau 2000.
// Pandel2017       · H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017.
//                   Quellenkritik als Kernkompetenz.
// Rüsen2002        · J. Rüsen: Geschichts-Theorie · Narrative Kompetenz.
// Klafki1996       · W. Klafki: Neue Studien zur Bildungstheorie und Didaktik
//                   (1996). Kategoriale Bildung · Aktualitätsprinzip.
// Petrik2013       · A. Petrik: Politische Bildung in der Sekundarstufe I.
// Lind2003         · G. Lind: Moralische Kompetenz (2003). Werterziehung
//                   über Diskurs, nicht Doktrin.
// LPplusGPG        · LehrplanPLUS Bayern Mittelschule GPG (Fachprofil + LBs).

window.MATRIX = {
  fach: 'N18 Sozialkunde',
  fachKuerzel: 'Sozialkunde',
  schulart: 'Mittelschule Bayern · GPG (Sozialkunde-Anteil LB3+LB4)',

  meta: {
    spaltenLogik: 'Nur die für die N18-Sozialkunde-Prüfung relevanten Lernbereiche des Fachs GPG: LB3 Politik+Gesellschaft + LB4 Wirtschaft+Recht. LB1 Räume und Naturraum + LB2 Zeit und Wandel sind Geographie- bzw. Geschichts-LBs und hier ausgeblendet.',
    quellen_status: 'LP+ GPG vollständig zitierbar via `fundort`-Feld pro KE. 13/27 KEs mit real durchgeführter Umsetzung (Paul · M7c/GPG-Klassen SJ 24/25). 14/27 KEs idealtypisch dokumentiert.',
  },

  jgst: [
    { id: 'GPG5',  label: 'GPG 5' },
    { id: 'GPG6',  label: 'GPG 6' },
    { id: 'GPG7',  label: 'GPG 7' },
    { id: 'GPG8',  label: 'GPG 8' },
    { id: 'GPG9',  label: 'GPG 9' },
    { id: 'GPG10', label: 'GPG 10' },
  ],

  lernbereiche: [
    { id: 'LB3', titel: 'LB3 · Politik + Gesellschaft', kurz: 'Politik' },
    { id: 'LB4', titel: 'LB4 · Wirtschaft + Recht',     kurz: 'Wirt./Recht' },
  ],

  cells: {
    "GPG5_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG5",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG5-LB3-01",
          "ke_wortlaut": "stellen die unterschiedlichen Lebens- und Arbeitsbedingungen der Menschen im alten Ägypten dar und erklären anhand der hierarchisch aufgebauten Gesellschaftspyramide deren unterschiedliche Stellung und Macht in der Hochkultur.",
          "thema": "Antike Hochkultur — Gesellschaftsordnung Ägypten",
          "operator": "darstellen / erklären",
          "afb": "I–II",
          "inhalte": "ägyptische Hochkultur (Alltagsleben, hierarchische Gesellschaft); politisches und kulturelles Erbe der Griechen.",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Das alte Ägypten“ — Gesellschaft am Nil (Rollenspiel) + Götter/Pyramiden (Stationenlernen)",
          "umsetzung_klasse": "GPG5b (SJ 24/25, 20 SuS, ⅔ arab. Migrationshintergrund, 2 DaZ, 3× LRS-Verdacht)",
          "umsetzung_datum": "KW 2–5 / Januar–Februar 2025 (8 UZE)",
          "umsetzung_quelle": "GPG5b_Jahresplan_202425 Seq 3 · GPG5b_LB2_2_Ägypten früher und heute/",
          "ues": [
            {
              "nr": 1,
              "titel": "Steckbrief Ägypten",
              "inhalt": "UE Steckbrief Ägypten"
            },
            {
              "nr": 2,
              "titel": "„Der Nil — Lebensader Ägyptens“",
              "inhalt": "UE „Der Nil — Lebensader Ägyptens“ (Bildanalyse)"
            },
            {
              "nr": 3,
              "titel": "„Gesellschaft am Nil“",
              "inhalt": "UE „Gesellschaft am Nil“ (Rollenspiel zur Gesellschaftspyramide, KLN 2 Abfrage)"
            },
            {
              "nr": 4,
              "titel": "„Götter, Pyramiden, Hieroglyphen“",
              "inhalt": "UE „Götter, Pyramiden, Hieroglyphen“ (Stationenlernen, GLN 2)"
            },
            {
              "nr": 5,
              "titel": "Wiederholung und Vertiefung (Mind-Mapping).",
              "inhalt": "Wiederholung und Vertiefung (Mind-Mapping)."
            },
            {
              "nr": 6,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "LP+ verortet Ägypten in LB3 (Antike als Zugang); im Folderschema bei LB2 Zeit und Wandel + LB3 geführt. Operator „erklären anhand der hierarchisch aufgebauten Gesellschaftspyramide“ real über Rollenspiel + Stationenlernen operationalisiert.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: Gegenstandsbereich „Ordnungssysteme“ + sozialwissenschaftliche Perspektive: Herrschaft und soziale Schichtung als Strukturkategorie schon in Jgst. 5 angelegt."
            },
            {
              "didaktik": "Rollenspiel (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik · Rollenspiel als Form des Simulationshandelns. Empathie + Perspektivübernahme. — Anwendung hier: Schichten der Gesellschaftspyramide als Rollen — Empathie und Perspektivübernahme als methodischer Zugang zur Hierarchie."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: Lebensbedingungen je Schicht — Perspektivenvielfalt innerhalb einer Gesellschaft."
            }
          ]
        },
        {
          "ke_id": "GPG5-LB3-02",
          "ke_wortlaut": "beschreiben Zusammensetzung und Befugnisse der Volksversammlung im antiken Griechenland und beurteilen diese Form der Mitsprache für die Bürgerinnen und Bürger als ersten Ansatz von Demokratie.",
          "thema": "Antike Demokratie — Volksversammlung Griechenland",
          "operator": "beschreiben / beurteilen",
          "afb": "I + III",
          "inhalte": "politisches und kulturelles Erbe der Griechen; Volksversammlung als frühe Mitsprache-Form.",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Die griechische Demokratie“ — Volksversammlung als Rollenspiel + Pro-Contra Demokratie damals/heute",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "Planung KW 14–17 / März–April 2025, real durchgeführt KW 23–27 / Juni–Juli 2025 (6 UZE)",
          "umsetzung_quelle": "GPG5b_Jahresplan_202425 Seq 5 · Sequenzplan Die griechische Demokratie (GPG 5b).md · GPG5b_LB4_2_Antikes_Griechenland/",
          "ues": [
            {
              "nr": 1,
              "titel": "1 Geographie Griechenlands",
              "inhalt": "UE1 Geographie Griechenlands (Kartenarbeit)"
            },
            {
              "nr": 2,
              "titel": "2 Polis als Zentrum",
              "inhalt": "UE2 Polis als Zentrum (Modellanalyse, Schwerpunkt Athen)"
            },
            {
              "nr": 3,
              "titel": "3 Gesellschaft in Athen",
              "inhalt": "UE3 Gesellschaft in Athen (Vergleich zur ägyptischen Pyramide, Bevölkerungsgruppen nach Rechten/Pflichten einordnen)"
            },
            {
              "nr": 4,
              "titel": "4 Volksversammlung",
              "inhalt": "UE4 Volksversammlung (Rollenspiel zu Zusammensetzung und Befugnissen, historische Quellen)"
            },
            {
              "nr": 5,
              "titel": "5 Demokratie damals und heute",
              "inhalt": "UE5 Demokratie damals und heute (Pro-Contra-Diskussion, KLN 4 Kurzvortrag)"
            },
            {
              "nr": 6,
              "titel": "6 Klassenrat",
              "inhalt": "UE6 Klassenrat (Planspiel als Anwendung)."
            },
            {
              "nr": 7,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Bewusster didaktischer Kontrastpunkt zur Ägyptensequenz: nach hierarchischer Gesellschaft jetzt Demokratie. Operator „beurteilen“ (AFB III) real über UE3 (Gesellschaft analysieren) + UE5 Pro-Contra realisiert. Sequenz endet mit Klassenrat als Transfer auf die eigene Lebenswelt.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Demokratielernen / Schule als Polis (Himmelmann2001)",
              "verweis": "G. Himmelmann: Schule als Polis-Modell. Demokratie-Lernen 2001. SMV + Klassenrat = institutionelle Demokratie-Erfahrung in der Schule. — Anwendung hier: Demokratie als Herrschaftsform historisch zugänglich gemacht; Brücke zur eigenen Mitbestimmungserfahrung (Klassensprecherwahl)."
            },
            {
              "didaktik": "Politische Urteilsbildung / Pro-Contra (GPJE2004)",
              "verweis": "GPJE 2004 + Massing: politische Urteilsbildung als Kernkompetenz. Pro-Contra-Debatte als methodischer Zugang (Massing/Reinhardt). — Anwendung hier: Operator „beurteilen“ verlangt ein Werturteil mit Kriterium (Gerechtigkeit, Teilhabe) — AFB III in Jgst. 5."
            },
            {
              "didaktik": "Mündigkeit (Detjen) (Detjen2007)",
              "verweis": "J. Detjen: Politische Bildung. Geschichte und Gegenwart in Deutschland. Oldenbourg 2007. Mündigkeit als Bildungsziel (Kant-Anschluss). — Anwendung hier: Dimension 2 politisches Urteilen wird altersgemäß angebahnt."
            }
          ]
        }
      ]
    },
    "GPG5_LB4": {
      "ke_anzahl": 4,
      "jgst": "GPG5",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG5-LB4-01",
          "ke_wortlaut": "beschreiben Konfliktsituationen aus ihrem Alltag (z. B. Peergroup, Familie, Schule) und formulieren Regeln für ein friedliches und gewaltfreies Zusammenleben in ihrem sozialen Umfeld.",
          "thema": "Konflikte — Regeln für friedliches Zusammenleben",
          "operator": "beschreiben / formulieren",
          "afb": "I–II",
          "inhalte": "Grundregeln friedliches Zusammenleben; Konflikte (Prävention, Intervention); Gemeinschaft.",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE „Konflikte lösen“ — Rollenspiel zur Konfliktbearbeitung (Schluss-UE der Sequenz „Familie und Gesellschaft“)",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 26 / 23.–27.06.2025 (2 UZE)",
          "umsetzung_quelle": "GPG5b_Jahresplan_202425 Seq 7 (Familie und Gesellschaft) UE „Konflikte lösen“",
          "ues": [
            {
              "nr": 1,
              "titel": "Fallbeispiele aus Alltagskonflikten (Peergroup/Familie/Schul",
              "inhalt": "Fallbeispiele aus Alltagskonflikten (Peergroup/Familie/Schule)"
            },
            {
              "nr": 2,
              "titel": "Rollenspiel „Konflikt nachstellen und anders lösen“",
              "inhalt": "Rollenspiel „Konflikt nachstellen und anders lösen“"
            },
            {
              "nr": 3,
              "titel": "Entwicklung von Lösungsstrategien",
              "inhalt": "Entwicklung von Lösungsstrategien"
            },
            {
              "nr": 4,
              "titel": "Übertragung in Klassenregeln.",
              "inhalt": "Übertragung in Klassenregeln."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Eingebettet in größere LB4-Sequenz Familie und Gesellschaft (KW 23–26). Methodische Anlage entspricht der KE „beschreiben Konfliktsituationen … und formulieren Regeln“ direkt. Adjazenter Beleg in höherer Jgst.: Antigewalttraining GPG7c 10.11.2025.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: Regeln werden nicht vorgegeben, sondern von SuS formuliert und im Klassenraum real wirksam — Realhandeln im Nahbereich (Massing)."
            },
            {
              "didaktik": "Rollenspiel (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik · Rollenspiel als Form des Simulationshandelns. Empathie + Perspektivübernahme. — Anwendung hier: Konfliktnachstellung als freies/offenes Rollenspiel — Empathie, Rollendistanz, Ambiguitätstoleranz."
            },
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: Konflikte aus dem unmittelbaren Alltag der SuS (Peergroup, Familie, Schule) als Ausgangspunkt."
            }
          ]
        },
        {
          "ke_id": "GPG5-LB4-02",
          "ke_wortlaut": "wenden demokratische Verhaltensweisen (z. B. bei Klassensprecherwahl, Klassenrat) an, und gestalten ein friedliches und respektvolles Zusammenleben in Familie, Schule und Gesellschaft mit, indem sie z. B. aktiv zuhören, ihre Standpunkte artikulieren, Gesprächsregeln einhalten, argumentieren und verhandeln, Kompromisse finden, Entscheidungen treffen, Beschlüsse fassen und diese in sozialer Verantwortung umsetzen.",
          "thema": "Demokratische Verhaltensweisen — Klassenrat",
          "operator": "anwenden / mitgestalten",
          "afb": "III (Anwendung / Handlung)",
          "inhalte": "demokratische Verhaltensweisen; Klassensprecherwahl; Klassenrat als ritualisierte Praxis.",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt — wirkt als Schulleitprinzip in allen Jgst.",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Doppelanker: Klassenrat als ritualisierte Demokratiepraxis GPG7c + Sequenz „Demokratische Verhaltensweisen“ GPG5b",
          "umsetzung_klasse": "GPG7c SJ 25/26 (Hauptanker, 4×) + GPG5b SJ 24/25 (Einführung der Methode)",
          "umsetzung_datum": "GPG7c: 17.10.2025 · 01.12.2025 · 02.02.2026 · 27.04.2026 · GPG5b: KW 27 / Juli 2025 + LB4-Sequenz „Demokratische Verhaltensweisen“",
          "umsetzung_quelle": "Belegcluster E · Wochenpläne_Timeline_GPG7c · Verlauf_27.04.md · GPG5b_LB4_1_Demokratische_Verhaltensweisen · GPG5b Sequenzplan Griechenland UE6",
          "ues": [
            {
              "nr": 1,
              "titel": "GPG7c-Klassenrat (laufend ritualisiert): Themenspeicher von ",
              "inhalt": "GPG7c-Klassenrat (laufend ritualisiert): Themenspeicher von SuS"
            },
            {
              "nr": 2,
              "titel": "rotierende Sitzungsleitung",
              "inhalt": "rotierende Sitzungsleitung"
            },
            {
              "nr": 3,
              "titel": "Aussprache mit Gesprächsregeln",
              "inhalt": "Aussprache mit Gesprächsregeln"
            },
            {
              "nr": 4,
              "titel": "Mehrheitsbeschluss",
              "inhalt": "Mehrheitsbeschluss"
            },
            {
              "nr": 5,
              "titel": "Umsetzung. 27.04.2026: Mobbingvorfall als Konfliktbearbeitun",
              "inhalt": "Umsetzung. 27.04.2026: Mobbingvorfall als Konfliktbearbeitung in Doppelstunde. GPG5b-Einführung: UE „Was ist ein guter Klassensprecher?“"
            },
            {
              "nr": 6,
              "titel": "„Wann ist eine Wahl fair?“",
              "inhalt": "UE „Wann ist eine Wahl fair?“"
            },
            {
              "nr": 7,
              "titel": "Klassensprecherwahl als realer Akt",
              "inhalt": "Klassensprecherwahl als realer Akt"
            },
            {
              "nr": 8,
              "titel": "Klassenrat-Planspiel als Schluss-UE der Griechenland-Sequenz",
              "inhalt": "Klassenrat-Planspiel als Schluss-UE der Griechenland-Sequenz (KW 27)."
            },
            {
              "nr": 9,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Doppelt verankert über zwei Schuljahre: KE formal GPG5 LB4, real einmal als Klassen-Einführung GPG5b SJ 24/25 (Klassensprecherwahl + Wahl-Fairness + Klassenrat-Planspiel) und einmal als ritualisierte Schulleitprinzip-Praxis GPG7c SJ 25/26. Stärkster eigener Demokratielern-Beleg. Klassenrat-Status GPG7b: offen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Demokratielernen / Schule als Polis (Himmelmann2001)",
              "verweis": "G. Himmelmann: Schule als Polis-Modell. Demokratie-Lernen 2001. SMV + Klassenrat = institutionelle Demokratie-Erfahrung in der Schule. — Anwendung hier: Klassenrat operationalisiert die höchste Werterziehungsstufe „Schule als Polis“ — SuS gestalten Schule real mit (GPG B3 §1.2)."
            },
            {
              "didaktik": "Handlungsorientierung — Realhandeln (Petrik2013)",
              "verweis": "A. Petrik: Politische Bildung in der Sek I. Politisches Handeln statt nur Wissen. Pluralität der Handlungsformen. — Anwendung hier: Echte politische Partizipation, nicht Simulation (Massing). Beschlüsse sind real wirksam."
            },
            {
              "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
              "verweis": "Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.) · 3 Prinzipien: Überwältigungsverbot · Kontroversitätsgebot · Schülerorientierung. Maßstab politischer Bildung. — Anwendung hier: Lehrkraft als Moderation, nicht Vorsitz; Themen von SuS gesetzt; Mehrheitsentscheid — Schülerorientierung im Schulalltag."
            },
            {
              "didaktik": "Werterziehung (Lind2003)",
              "verweis": "G. Lind: Moralische Kompetenz (2003) + Beutelsbacher Konsens-Schülerorientierung. Werterziehung über Diskurs, nicht Doktrin. — Anwendung hier: 3-Stufen-Modell: Klassenrat ist Stufe 3 (Schule als Polis), über Dilemmadiskussion und Just-Community hinaus."
            }
          ]
        },
        {
          "ke_id": "GPG5-LB4-03",
          "ke_wortlaut": "stellen Ursachen für den aktuellen familiären Wandel in der Gesellschaft dar, indem sie die Entwicklung unterschiedlicher Formen des Zusammenlebens (z. B. Partnerschaft bzw. Ehe mit und ohne Kinder, Patchworkfamilie, gleichgeschlechtliche Partnerschaften) beschreiben und diskutieren.",
          "thema": "Familiärer Wandel — Formen des Zusammenlebens",
          "operator": "darstellen / beschreiben / diskutieren",
          "afb": "II–III",
          "inhalte": "Gemeinschaft (Familie, Schule, Lebensgemeinschaften, Trennung/Scheidung, Peergroup).",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Familie und Gesellschaft“ — Familien heute + Wandel der Familie",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 23–24 / 02.–13.06.2025 (4 UZE)",
          "umsetzung_quelle": "GPG5b_Jahresplan_202425 Seq 7 (Familie und Gesellschaft)",
          "ues": [
            {
              "nr": 1,
              "titel": "„Familien heute“",
              "inhalt": "UE „Familien heute“ (Interview-Methode, Beschreibung verschiedener Familienformen)"
            },
            {
              "nr": 2,
              "titel": "„Wandel der Familie“",
              "inhalt": "UE „Wandel der Familie“ (Zeitleiste, Erklärung gesellschaftlichen Wandels)"
            },
            {
              "nr": 3,
              "titel": "Portfolio-Präsentation als Leistungsnachweis (in UE „Leben m",
              "inhalt": "Portfolio-Präsentation als Leistungsnachweis (in UE „Leben mit Unterschieden“)."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Beutelsbach-sensibles Thema mit heterogener Lerngruppe (⅔ arab. Migrationshintergrund) — Schutz der SuS-Privatsphäre über Interview-Methodik mit Auswahlmöglichkeit der Befragungspersonen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
              "verweis": "Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.) · 3 Prinzipien: Überwältigungsverbot · Kontroversitätsgebot · Schülerorientierung. Maßstab politischer Bildung. — Anwendung hier: Kontroversitätsgebot bei wertgeladenem Thema; Überwältigungsverbot — die Lehrkraft trägt keine eigene Position vor."
            },
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: unmittelbar an der Lebenswirklichkeit der SuS — die eigene Familienform als Ausgangspunkt."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: verschiedene Lebensformen gleichberechtigt nebeneinander dargestellt."
            }
          ]
        },
        {
          "ke_id": "GPG5-LB4-04",
          "ke_wortlaut": "gehen wertschätzend mit Menschen mit Behinderung um und kooperieren bei gemeinsamen Vorhaben.",
          "thema": "Inklusion — Umgang mit Menschen mit Behinderung",
          "operator": "umgehen / kooperieren",
          "afb": "Anwendung / Haltung",
          "inhalte": "Inklusion; Gemeinschaft; Heterogenität.",
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE „Leben mit Unterschieden“ — wertschätzender Umgang, Portfolio-Präsentation",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 25 / 16.–20.06.2025 (2 UZE)",
          "umsetzung_quelle": "GPG5b_Jahresplan_202425 Seq 7 (Familie und Gesellschaft) UE „Leben mit Unterschieden“",
          "ues": [
            {
              "nr": 1,
              "titel": "Fallbeispiele zu Heterogenität und Behinderung",
              "inhalt": "Fallbeispiele zu Heterogenität und Behinderung"
            },
            {
              "nr": 2,
              "titel": "Reflexion „Was hilft beim Zusammenarbeiten?“",
              "inhalt": "Reflexion „Was hilft beim Zusammenarbeiten?“"
            },
            {
              "nr": 3,
              "titel": "kooperative Klassenaufgabe",
              "inhalt": "kooperative Klassenaufgabe"
            },
            {
              "nr": 4,
              "titel": "Portfolio-Präsentation als Leistungsnachweis (deckt zugleich",
              "inhalt": "Portfolio-Präsentation als Leistungsnachweis (deckt zugleich Familie/Wandel mit ab)."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "KE-Wortlaut „wertschätzender Umgang“ direkt im UE-Titel umgesetzt. Methodik Portfolio-Präsentation: Lernprodukt als Bewertungsgegenstand — passt zur KE „Haltung/Anwendung“ (statt kognitivem Operator). Heterogene Klasse (DaZ, LRS-Verdacht) als praktischer Lernkontext.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: Kooperation als Realhandeln; Haltung entsteht durch Tun, nicht durch Belehrung."
            },
            {
              "didaktik": "Werterziehung (Lind2003)",
              "verweis": "G. Lind: Moralische Kompetenz (2003) + Beutelsbacher Konsens-Schülerorientierung. Werterziehung über Diskurs, nicht Doktrin. — Anwendung hier: Wertschätzung als gemeinschaftstragender Wert — Wertorientierung als Sk-Unterrichtsprinzip."
            }
          ]
        }
      ]
    },
    "GPG6_LB4": {
      "ke_anzahl": 3,
      "jgst": "GPG6",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG6-LB4-01",
          "ke_wortlaut": "recherchieren in ihrem familiären Umfeld die Motive für die Wahl des eigenen Wohnortes (z. B. Freizeitwert, Verkehrsanbindungen) und beurteilen diese Entscheidung.",
          "thema": "Kommunalpolitik — Motive der Wohnortwahl",
          "operator": "recherchieren / beurteilen",
          "afb": "II–III",
          "inhalte": "Leben Stadt/Land; Mobilität; kommunale Selbstverwaltung.",
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Mini-Sozialstudie „Warum wohnen wir hier?“ — Befragung im familiären Umfeld",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG6-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "SuS entwickeln einen kurzen Fragebogen",
              "inhalt": "SuS entwickeln einen kurzen Fragebogen"
            },
            {
              "nr": 2,
              "titel": "Befragung im familiären Umfeld als Hausaufgabe",
              "inhalt": "Befragung im familiären Umfeld als Hausaufgabe"
            },
            {
              "nr": 3,
              "titel": "Auswertung und Clusterung der Motive im Plenum",
              "inhalt": "Auswertung und Clusterung der Motive im Plenum"
            },
            {
              "nr": 4,
              "titel": "Urteilsfrage „War die Wohnortwahl gut begründet?“.",
              "inhalt": "Urteilsfrage „War die Wohnortwahl gut begründet?“."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Befragung/Interview als Mikromethode; Vorform der Erkundung. Bei eigener Durchführung real nachtragen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Erkundung / Außerschulische Lernorte (Reinhardt2005)",
              "verweis": "Reinhardt Politik-Didaktik (2005) — Erkundung als handlungsorientiertes Methodenrepertoire. KMBek außerschul. Lernorte verlangt Realbegegnungen. — Anwendung hier: Befragung im familiären Umfeld ist Wirklichkeitsbegegnung „im Kleinen“ — Vorform der Erkundung."
            },
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: der eigene Wohnort als unmittelbarer Lerngegenstand."
            },
            {
              "didaktik": "Politische Urteilsbildung (GPJE2004)",
              "verweis": "GPJE 2004: Anforderungen an Nationale Bildungsstandards für den Fachunterricht politische Bildung. 3 Kompetenzdimensionen: politische Urteils- · Handlungs- · methodische Kompetenz. — Anwendung hier: Operator „beurteilen“ verlangt ein begründetes Werturteil über die Wohnortentscheidung."
            }
          ]
        },
        {
          "ke_id": "GPG6-LB4-02",
          "ke_wortlaut": "stellen den Aufbau und die Funktionszusammenhänge der kommunalen Selbstverwaltung sowie die Mitwirkungsmöglichkeiten der Bürgerinnen und Bürger in der Gemeinde dar.",
          "thema": "Kommunalpolitik — Aufbau der kommunalen Selbstverwaltung",
          "operator": "darstellen",
          "afb": "II",
          "inhalte": "kommunale Selbstverwaltung; Entscheidungsprozesse; Mitwirkungsmöglichkeiten (Wahl, Bürgerbegehren, -entscheid, Kinder- und Jugendforen).",
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Wer entscheidet in unserer Gemeinde?“ — Strukturmodell kommunale Selbstverwaltung",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG6-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Organigramm Gemeinderat / Bürgermeister / Verwaltung gemeins",
              "inhalt": "Organigramm Gemeinderat / Bürgermeister / Verwaltung gemeinsam aufbauen"
            },
            {
              "nr": 2,
              "titel": "Mitwirkungsmöglichkeiten als Beteiligungsleiter (Wahl bis Bü",
              "inhalt": "Mitwirkungsmöglichkeiten als Beteiligungsleiter (Wahl bis Bürgerentscheid)"
            },
            {
              "nr": 3,
              "titel": "Zuordnungsaufgabe konkreter Beteiligungsformen.",
              "inhalt": "Zuordnungsaufgabe konkreter Beteiligungsformen."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Strukturwissen als Voraussetzung für die anschließende Fallarbeit (GPG6-LB4-03).",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: Gegenstandsbereich „Ordnungssysteme“ — kommunale Selbstverwaltung als politisches Ordnungssystem im Nahraum."
            },
            {
              "didaktik": "Demokratielernen (Himmelmann2001)",
              "verweis": "G. Himmelmann: Demokratie-Lernen als Lebens-, Gesellschafts- und Herrschaftsform. Wochenschau 2001. — Anwendung hier: Mitwirkungsmöglichkeiten der Bürger als Demokratie-Strukturwissen auf der konkretesten Ebene."
            }
          ]
        },
        {
          "ke_id": "GPG6-LB4-03",
          "ke_wortlaut": "erläutern ausgehend von einem aktuellen Fallbeispiel aus ihrem Umfeld die kommunalpolitischen Entscheidungsprozesse und erproben ihre Mitwirkungsmöglichkeiten bei exemplarischen Fällen an ihrem Wohnort.",
          "thema": "Kommunalpolitik — Entscheidungsprozesse erproben",
          "operator": "erläutern / erproben",
          "afb": "II + Anwendung/Handlung",
          "inhalte": "kommunalpolitische Entscheidungsprozesse; Mitwirkungsmöglichkeiten erproben.",
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt — einziger MS-LB mit explizitem „erproben“ in der Kommunalpolitik",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Fallanalyse „Soll der Skatepark gebaut werden?“ — kommunalpolitischer Entscheidungsprozess am realen Ortsfall",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG6-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "aktueller Fall aus der Gemeinde (Skatepark, Bushaltestelle o",
              "inhalt": "aktueller Fall aus der Gemeinde (Skatepark, Bushaltestelle o. Ä.)"
            },
            {
              "nr": 2,
              "titel": "Rekonstruktion des Entscheidungswegs Antrag",
              "inhalt": "Rekonstruktion des Entscheidungswegs Antrag"
            },
            {
              "nr": 3,
              "titel": "Ausschuss",
              "inhalt": "Ausschuss"
            },
            {
              "nr": 4,
              "titel": "Gemeinderat",
              "inhalt": "Gemeinderat"
            },
            {
              "nr": 5,
              "titel": "Erproben: SuS formulieren eine reale Eingabe / einen Antrag ",
              "inhalt": "Erproben: SuS formulieren eine reale Eingabe / einen Antrag ans Kinder- und Jugendforum."
            },
            {
              "nr": 6,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "„erproben“ verlangt Realhandeln, nicht nur Simulation — die reale Eingabe ist der entscheidende Schritt. Lückenpunkt: bislang nicht selbst durchgeführt.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: aktuelles Fallbeispiel aus dem Umfeld als kasuistischer Zugang — KE fordert „aktuelles Fallbeispiel“ wörtlich."
            },
            {
              "didaktik": "Handlungsorientierung — Realhandeln (Petrik2013)",
              "verweis": "A. Petrik: Politische Bildung in der Sek I. Politisches Handeln statt nur Wissen. Pluralität der Handlungsformen. — Anwendung hier: „erproben … an ihrem Wohnort“ ist Realhandeln (Massing) — eine reale Eingabe statt Planspiel."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: der konkrete Ortsfall verschränkt Aktualitätsprinzip und Nahraumbezug."
            },
            {
              "didaktik": "Demokratielernen (Himmelmann2001)",
              "verweis": "G. Himmelmann: Demokratie-Lernen als Lebens-, Gesellschafts- und Herrschaftsform. Wochenschau 2001. — Anwendung hier: kommunale Mitwirkung als gelebte Demokratie auf der zugänglichsten politischen Ebene."
            }
          ]
        }
      ]
    },
    "GPG7_LB3": {
      "ke_anzahl": 4,
      "jgst": "GPG7",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG7-LB3-01",
          "ke_wortlaut": "beschreiben die Lebens- und Arbeitsverhältnisse von Arbeiterinnen bzw. Arbeitern und deren Familien sowie Lösungsansätze der Sozialen Frage während der Industrialisierung.",
          "thema": "Soziale Frage — Lebens- und Arbeitsverhältnisse der Industrialisierung",
          "operator": "beschreiben (R) / beschreiben + vergleichen (M)",
          "afb": "I (R) / II (M)",
          "inhalte": "Industrielle Revolution, Industriegesellschaft, Soziale Frage 19./20. Jh. + Lösungsansätze.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Industrialisierung / Soziale Frage“ — Identifikationsfiguren Johann und Anna",
          "umsetzung_klasse": "GPG7c und GPG7b (zeitversetzt)",
          "umsetzung_datum": "KW09–KW13 / Feb–März 2026",
          "umsetzung_quelle": "Belegcluster D · TUV_03_Landflucht.md · TUV_04_Leben_in_der_Stadt.md · TUV_05_Streik_und_Gewerkschaft.md",
          "ues": [
            {
              "nr": 1,
              "titel": "UZE1 Dampfmaschine verändert das Leben",
              "inhalt": "UZE1 Dampfmaschine verändert das Leben"
            },
            {
              "nr": 2,
              "titel": "UZE2 Erfindungen (arbeitsteilige PA mit Bildpaaren)",
              "inhalt": "UZE2 Erfindungen (arbeitsteilige PA mit Bildpaaren)"
            },
            {
              "nr": 3,
              "titel": "UZE3 Landflucht „Warum zieht Johann in die Stadt?“ (Push/Pul",
              "inhalt": "UZE3 Landflucht „Warum zieht Johann in die Stadt?“ (Push/Pull)"
            },
            {
              "nr": 4,
              "titel": "UZE4 „Warum ist Anna in der Stadt unzufrieden?“ (Bildanalyse",
              "inhalt": "UZE4 „Warum ist Anna in der Stadt unzufrieden?“ (Bildanalyse Lebensbedingungen)"
            },
            {
              "nr": 5,
              "titel": "UZE5 „Wie wehrten sich die Arbeiter?“ (Streik/Gewerkschaft)",
              "inhalt": "UZE5 „Wie wehrten sich die Arbeiter?“ (Streik/Gewerkschaft)"
            },
            {
              "nr": 6,
              "titel": "UZE6 Revolution 1848/49 (Stationenarbeit + Karikaturanalyse)",
              "inhalt": "UZE6 Revolution 1848/49 (Stationenarbeit + Karikaturanalyse)."
            },
            {
              "nr": 7,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "LP+-KE wörtlich realisiert. Identifikationsfiguren Johann (landloser Knecht) und Anna (in der Stadt unzufrieden) real in beiden Klassen verwendet.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Lebensweltbezug / Identifikationsfiguren (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung: Inhalte mit Bedeutung für die Lebenswelt der Lernenden. Identifikationsfiguren = personale Anker. — Anwendung hier: Johann und Anna machen abstrakte Strukturgeschichte erfahrbar — narrative Konkretisierung als Sk-Zugang."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: Identifikationsfiguren über soziale Schichten; Push/Pull-Faktoren aus Mehrperspektive."
            },
            {
              "didaktik": "Narrative Kompetenz (Rüsen2002)",
              "verweis": "J. Rüsen: Narrative Kompetenz. Historische Sinnbildung durch Erzählen (Rüsen Geschichts-Theorie). — Anwendung hier: reflektiertes historisches Erzählen über Identifikationsfiguren (LP+-explizit)."
            },
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: Tagebuch-Aufgabe als produktorientiertes Schreiben, Perspektivübernahme als kognitive Handlung."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB3-02",
          "ke_wortlaut": "analysieren unter ausgewählten Aspekten (z. B. Bevölkerungswachstum, Arbeitersiedlungen) die Entwicklung einer Stadt Ende des 19. Jahrhunderts in Deutschland, um den Übergang von der Agrar- zur Industriegesellschaft darzustellen.",
          "thema": "Übergang Agrar- zur Industriegesellschaft — Stadtentwicklung",
          "operator": "analysieren / darstellen",
          "afb": "II–III",
          "inhalte": "Bevölkerungswachstum, Arbeitersiedlungen, Stadtentwicklung, neue Berufsbilder.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UZE Landflucht und „Leben in der Stadt“ — Push/Pull und Lebensbedingungen",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "06.–09.03.2026",
          "umsetzung_quelle": "Belegcluster D · TUV_03-04_Landflucht_Leben_in_der_Stadt.md",
          "ues": [
            {
              "nr": 1,
              "titel": "Push/Pull-Faktoren-Tabelle zur Landflucht (Johann)",
              "inhalt": "Push/Pull-Faktoren-Tabelle zur Landflucht (Johann)"
            },
            {
              "nr": 2,
              "titel": "Bildanalyse städtischer Lebensbedingungen (Anna): Wohnen, Hy",
              "inhalt": "Bildanalyse städtischer Lebensbedingungen (Anna): Wohnen, Hygiene, Kinderarbeit"
            },
            {
              "nr": 3,
              "titel": "Vergleich Dorf/Stadt",
              "inhalt": "Vergleich Dorf/Stadt"
            },
            {
              "nr": 4,
              "titel": "Sicherung als Strukturschema Agrar",
              "inhalt": "Sicherung als Strukturschema Agrar"
            },
            {
              "nr": 5,
              "titel": "Industrie.",
              "inhalt": "Industrie."
            },
            {
              "nr": 6,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Operator „analysieren“ real über Push/Pull-Faktoren-Tabelle und Bildanalyse operationalisiert.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: historische Fotos, Statistiken, Stadtpläne als Analysegrundlage — fachspezifische Arbeitsweise „sich informieren / interpretieren“."
            },
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: Brücke Landflucht 19. Jh. zur heutigen Stadt-Land-Mobilität und Migration."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: Push- und Pull-Faktoren zwingen zur Mehrperspektivenbetrachtung der Wanderungsentscheidung."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB3-03",
          "ke_wortlaut": "erläutern die Ursachen des Ersten Weltkrieges und diskutieren die Kriegsschuldfrage unter Einbezug aktueller Forschungsergebnisse.",
          "thema": "Erster Weltkrieg — Ursachen und Kriegsschuldfrage",
          "operator": "erläutern / diskutieren",
          "afb": "II–III",
          "inhalte": "Kriegsschuldfrage, Bündnissystem, Imperialismus als Vorgeschichte.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Erster Weltkrieg“ — Pulverfass Europa und Attentat von Sarajewo",
          "umsetzung_klasse": "GPG7b",
          "umsetzung_datum": "ab 04.05.2026 (laufend, KW19–22 geplant)",
          "umsetzung_quelle": "Belegcluster J · 05_Erster_Weltkrieg/",
          "ues": [
            {
              "nr": 1,
              "titel": "01 „Pulverfass Europa“",
              "inhalt": "UE01 „Pulverfass Europa“ (Bündnissystem, Imperialismus als Vorgeschichte)"
            },
            {
              "nr": 2,
              "titel": "02 Attentat von Sarajewo",
              "inhalt": "UE02 Attentat von Sarajewo (Ereignis-Ketten-Analyse)"
            },
            {
              "nr": 3,
              "titel": "Kriegsschuldfrage als Pro-Contra geplant",
              "inhalt": "Kriegsschuldfrage als Pro-Contra geplant"
            },
            {
              "nr": 4,
              "titel": "weitere UEs bis 22.05.2026.",
              "inhalt": "weitere UEs bis 22.05.2026."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Sequenz läuft aktuell; die Kriegsschuldfrage-Diskussion ist für eine spätere UE geplant — Stand vor Prüfungsnutzung prüfen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: die Kriegsschuldfrage ist die klassische kontroverse Streitfrage — Operator „diskutieren“ verlangt AFB III."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: Kriegsschuld aus Sicht verschiedener Mächte; „aktuelle Forschungsergebnisse“ = Kontroversität auch der Wissenschaft."
            },
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: Forschungspositionen als Quellen — historisches Urteilen unter Quellenbezug."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB3-04",
          "ke_wortlaut": "erläutern die wesentlichen militärischen, territorialen und wirtschaftlichen Bestimmungen des Versailler Friedensvertrags, um die entstehende Unzufriedenheit der unterschiedlichen gesellschaftlichen Schichten im Deutschen Reich zu begründen.",
          "thema": "Versailler Friedensvertrag — Bestimmungen und Folgen",
          "operator": "erläutern / begründen (R) — selbständig darstellen / diskutieren (M)",
          "afb": "II (R) / III (M)",
          "inhalte": "militärische, territoriale, wirtschaftliche Bestimmungen; gesellschaftliche Folgen.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Der Vertrag von Versailles — Frieden oder Demütigung?“ — Fallanalyse eines Dokuments",
          "umsetzung_klasse": "GPG7",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — Sequenz Erster Weltkrieg GPG7b läuft, die Versailles-UE ist noch nicht durchgeführt",
          "ues": [
            {
              "nr": 1,
              "titel": "Kartenarbeit territoriale Verluste",
              "inhalt": "Kartenarbeit territoriale Verluste"
            },
            {
              "nr": 2,
              "titel": "arbeitsteilige Erschließung militärisch / territorial / wirt",
              "inhalt": "arbeitsteilige Erschließung militärisch / territorial / wirtschaftlich"
            },
            {
              "nr": 3,
              "titel": "Perspektivkarten verschiedener Schichten („Wie reagiert ein ",
              "inhalt": "Perspektivkarten verschiedener Schichten („Wie reagiert ein Arbeiter / ein Offizier / ein Unternehmer?“)"
            },
            {
              "nr": 4,
              "titel": "Urteilsfrage zur Folgenwirkung.",
              "inhalt": "Urteilsfrage zur Folgenwirkung."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Anschluss an die reale 1.-WK-Sequenz GPG7b möglich; bei Durchführung real nachtragen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: die Unzufriedenheit „unterschiedlicher gesellschaftlicher Schichten“ ist im KE-Wortlaut angelegt — Perspektivenvielfalt verpflichtend."
            },
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: Vertragsdokument und Karten als Primärquellen — fachspezifische Arbeitsweise Interpretieren."
            },
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: die M-Operatorenprogression „selbständig darstellen / diskutieren“ zeigt die AFB-Steigerung R → M."
            }
          ]
        }
      ]
    },
    "GPG7_LB4": {
      "ke_anzahl": 4,
      "jgst": "GPG7",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG7-LB4-01",
          "ke_wortlaut": "benennen die rechtsbedeutsamen Altersstufen für Jugendliche und übertragen die Bedeutung rechtlicher Regelungen auf das eigene Leben.",
          "thema": "Recht — rechtsbedeutsame Altersstufen",
          "operator": "benennen (R) / darstellen (M)",
          "afb": "I (R) / I–II (M)",
          "inhalte": "rechtsbedeutsame Altersstufen, Jugendschutzgesetz.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE2 „Rechtliche Altersstufen + Jugendschutzgesetz“ — Stationenlernen",
          "umsetzung_klasse": "GPG7c (90 min) und GPG7b",
          "umsetzung_datum": "12.01.2026 (7c) · 30.01.2026 (7b)",
          "umsetzung_quelle": "Belegcluster C · Sequenzplan Recht GPG7c",
          "ues": [
            {
              "nr": 1,
              "titel": "5 Stationen (Ausgehen / Alkohol / Strafmündigkeit / Einkaufe",
              "inhalt": "5 Stationen (Ausgehen / Alkohol / Strafmündigkeit / Einkaufen / Arbeiten) mit Fallkarten"
            },
            {
              "nr": 2,
              "titel": "Filmausschnitt „Gangsterläufer“",
              "inhalt": "Filmausschnitt „Gangsterläufer“"
            },
            {
              "nr": 3,
              "titel": "Transfer „Was darf ich mit 14 / 16 / 18?“ auf das eigene Leb",
              "inhalt": "Transfer „Was darf ich mit 14 / 16 / 18?“ auf das eigene Leben."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Operator „übertragen … auf das eigene Leben“ real über Transfer-Aufgaben operationalisiert — Lebensweltbezug im KE-Wortlaut verankert.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: der KE fordert wörtlich die Übertragung „auf das eigene Leben“ — rechtliche Regelungen werden an der Lebenswirklichkeit der 14-Jährigen verankert."
            },
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: Stationenlernen aktiviert selbsttätige Erarbeitung; Fallkarten als handlungsorientierter Zugang."
            },
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: Fallkarten pro Station — kasuistischer Zugang statt systematischer Gesetzesabhandlung."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB4-02",
          "ke_wortlaut": "fassen wesentliche Bestimmungen des Jugendschutzgesetzes und des Jugendstrafrechts zusammen und beurteilen die Bedeutsamkeit der Gesetze für den eigenen Lebensbereich.",
          "thema": "Recht — Jugendschutzgesetz und Jugendstrafrecht",
          "operator": "zusammenfassen + beurteilen (R) / erläutern + diskutieren (M)",
          "afb": "II–III",
          "inhalte": "JuSchG, JGG, Funktionen von Strafe, Rechtsverstöße + Konsequenzen.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE3 + UE4a „Jugendstrafrecht-Grundlagen + Sanktionsmöglichkeiten“",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "19.01.2026 (7c)",
          "umsetzung_quelle": "Belegcluster C · Sequenzplan Recht GPG7c",
          "ues": [
            {
              "nr": 1,
              "titel": "3: Diskussion Strafmündigkeit + Meinungslinie + Fallanalysen",
              "inhalt": "UE3: Diskussion Strafmündigkeit + Meinungslinie + Fallanalysen JuSchG"
            },
            {
              "nr": 2,
              "titel": "4a: Erarbeitung Erziehungsmaßregeln / Zuchtmittel / Jugendst",
              "inhalt": "UE4a: Erarbeitung Erziehungsmaßregeln / Zuchtmittel / Jugendstrafe als dreistufiger Sanktionskatalog"
            },
            {
              "nr": 3,
              "titel": "Beurteilung der Bedeutsamkeit für den eigenen Lebensbereich.",
              "inhalt": "Beurteilung der Bedeutsamkeit für den eigenen Lebensbereich."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Operator-Progression im KE sichtbar: R „beurteilen“, M „diskutieren“ — beide AFB III, M mit höherer Selbständigkeit.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Politische / rechtliche Urteilsbildung (GPJE2004)",
              "verweis": "GPJE 2004: politische Urteilsbildung (Sachurteil + Werturteil). Rechtliche Urteilsbildung als Subkompetenz (Recht-Didaktik Sander/Reinhardt). — Anwendung hier: Operator „beurteilen / diskutieren“ (AFB III) — die Bedeutsamkeit der Gesetze wird nicht referiert, sondern bewertet."
            },
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: Fallanalysen zum JuSchG als kasuistischer Zugang; die abstrakte Norm wird am konkreten Fall erschlossen."
            },
            {
              "didaktik": "Lebensweltbezug (Klafki1996)",
              "verweis": "W. Klafki: Neue Studien zur Bildungstheorie und Didaktik (1996). Kategoriale Bildung — Inhalte aus der Lebenswelt der Lernenden. — Anwendung hier: KE-Wortlaut „für den eigenen Lebensbereich“ / „für ihre Lebenswelt“ — Recht als Lebensweltthema der Jugendlichen."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB4-03",
          "ke_wortlaut": "diskutieren grundlegende Bestimmungen des Jugendstrafrechts sowie die präventiv und pädagogisch ausgerichtete Strafbemessung anhand einer öffentlichen Gerichtsverhandlung.",
          "thema": "Recht — Jugendstrafrecht und Strafbemessung",
          "operator": "diskutieren",
          "afb": "III",
          "inhalte": "Jugendstrafrecht, präventiv-pädagogische Strafbemessung, öffentliche Gerichtsverhandlung als Realisierungsform.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt — R und M wortgleich (stärkstes Pflichtzitat)",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE4b + UE5 ELP „Welche Strafe ist für Leon passend?“ — Fallanalyse als Erweiterte Lehrprobe",
          "umsetzung_klasse": "GPG7c (ELP-Format) · GPG7b (ohne ELP-Format)",
          "umsetzung_datum": "UE4b 23.01.2026 · UE5 ELP 26.01.2026",
          "umsetzung_quelle": "Belegcluster C · ELP_Artikulation_Tabelle_v7.2 · Sequenzplan Recht GPG7c",
          "ues": [
            {
              "nr": 1,
              "titel": "4b „Hilfe oder Strafe?“: Fallanalyse-Vorbereitung mit Modellfällen. 5 ELP",
              "inhalt": "UE4b „Hilfe oder Strafe?“: Fallanalyse-Vorbereitung mit Modellfällen. UE5 ELP (5-Phasen GPG GB §5.5): Phase 1 Schlagzeile + Audio + Stundenfrage"
            },
            {
              "nr": 2,
              "titel": "Phase 2 Think-Pair-Share mit Multiperspektivität (3 Perspekt",
              "inhalt": "Phase 2 Think-Pair-Share mit Multiperspektivität (3 Perspektiven Täter/Opfer/Gesellschaft × 8 Teams, Miro)"
            },
            {
              "nr": 3,
              "titel": "Phase 3 Merksatz „Strafe hängt von Information und Sichtweis",
              "inhalt": "Phase 3 Merksatz „Strafe hängt von Information und Sichtweise ab“"
            },
            {
              "nr": 4,
              "titel": "Phase 4 individuelles Urteil M11 Strafenkatalog + Meinungsli",
              "inhalt": "Phase 4 individuelles Urteil M11 Strafenkatalog + Meinungslinie iterativ"
            },
            {
              "nr": 5,
              "titel": "Phase 5 Sicherung + Ausblick Gerichtsverhandlung.",
              "inhalt": "Phase 5 Sicherung + Ausblick Gerichtsverhandlung."
            },
            {
              "nr": 6,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Der LP+-Wortlaut „anhand einer öffentlichen Gerichtsverhandlung“ wurde funktional durch die Fallanalyse mit Modellfällen substituiert — Begründung: § 48 JGG (Jugendverfahren regelmäßig nicht öffentlich), didaktische Steuerbarkeit, Schülerschutz. Siehe Antwortgerüst Erkundung / Außerschulische Lernorte.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Fallanalyse / kasuistisches Verfahren (Massing2010)",
              "verweis": "P. Massing: Kasuistisches Verfahren. Wochenschau 2010. Strukturelles Lernen durch exemplarische Einzelfälle. — Anwendung hier: realer aktueller Spiegel-Fall als „Ausschnitt der Wirklichkeit“; 5 Phasen Konfrontation–Information–Resolution–Disputation–Kollation (Ausblick Gerichtsverhandlung)."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: 3 Perspektiven Täter/Opfer/Gesellschaft × 8 Teams mit unterschiedlichem Material — das Kontroversitätsgebot strukturell operationalisiert."
            },
            {
              "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
              "verweis": "Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.) · 3 Prinzipien: Überwältigungsverbot · Kontroversitätsgebot · Schülerorientierung. Maßstab politischer Bildung. — Anwendung hier: Multiperspektivität = Kontroversitätsgebot; konstruktivistische Nicht-Explizierung der Gruppenperspektiven = Überwältigungsverbot; individuelles Urteil mit Begründungspflicht = Schülerorientierung."
            },
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: Think-Pair-Share als kognitive Handlung + Meinungslinie als physisches Realhandeln + individuelles Urteil als Werthandeln."
            },
            {
              "didaktik": "Werterziehung (Lind2003)",
              "verweis": "G. Lind: Moralische Kompetenz (2003) + Beutelsbacher Konsens-Schülerorientierung. Werterziehung über Diskurs, nicht Doktrin. — Anwendung hier: „Hilfe oder Strafe?“ als moralischer Urteilskonflikt; Begründungspflicht des Werturteils."
            },
            {
              "didaktik": "Erkundung / Außerschulische Lernorte (Reinhardt2005)",
              "verweis": "Reinhardt Politik-Didaktik (2005) — Erkundung als handlungsorientiertes Methodenrepertoire. KMBek außerschul. Lernorte verlangt Realbegegnungen. — Anwendung hier: der LP+-Auftrag „öffentliche Gerichtsverhandlung“ wurde bewusst durch die Fallanalyse substituiert (§ 48 JGG) — die Substitution ist didaktisch verantwortet."
            }
          ]
        },
        {
          "ke_id": "GPG7-LB4-04",
          "ke_wortlaut": "berichten über eine aktuelle kriminelle Tat (z. B. Jugendgewalt, Internetkriminalität) und diskutieren die möglichen Strafen für die Täterin bzw. den Täter.",
          "thema": "Recht — aktuelle kriminelle Tat und mögliche Strafen",
          "operator": "berichten + diskutieren (R) / selbständig recherchieren + berichten + diskutieren (M)",
          "afb": "II–III",
          "inhalte": "aktuelle kriminelle Tat (Jugendgewalt, Internetkriminalität), Funktionen von Strafe.",
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "ELP-Einstieg „Welche Strafe ist für Leon passend?“ — aktueller Spiegel-Fall als Identifikationsfigur",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "26.01.2026 (ELP) und Sequenzverlauf Januar 2026",
          "umsetzung_quelle": "Belegcluster C · ELP_Artikulation_Tabelle_v7.2",
          "ues": [
            {
              "nr": 1,
              "titel": "Schlagzeile „14-Jähriger verletzt 15-Jährigen mit Messer“ (a",
              "inhalt": "Schlagzeile „14-Jähriger verletzt 15-Jährigen mit Messer“ (anonymisiert aus Spiegel-Artikel Nürnberg-Messer 2024)"
            },
            {
              "nr": 2,
              "titel": "Audio Yerlin/Munus als Peergroup-Kontext",
              "inhalt": "Audio Yerlin/Munus als Peergroup-Kontext"
            },
            {
              "nr": 3,
              "titel": "Stundenfrage „Welche Strafe ist für Leon passend?“",
              "inhalt": "Stundenfrage „Welche Strafe ist für Leon passend?“"
            },
            {
              "nr": 4,
              "titel": "Recherche zu möglichen Strafen",
              "inhalt": "Recherche zu möglichen Strafen"
            },
            {
              "nr": 5,
              "titel": "Diskussion an der Meinungslinie.",
              "inhalt": "Diskussion an der Meinungslinie."
            },
            {
              "nr": 6,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Identifikationsfigur Leon = 14 Jahre = Klassenstufe der SuS. Aktualitätsprinzip und Lebensweltbezug verschränkt. Stereotypisierungsvermeidung im Sequenzhinweis explizit.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: der KE fordert wörtlich „aktuelle kriminelle Tat“; realer Spiegel-Artikel 2024 + Identifikationsfigur in der Klassenstufe der SuS."
            },
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: die aktuelle Tat als kasuistischer Ausgangspunkt — die Auswahlkriterien Aktualität, soziale und zeitliche Nähe sind erfüllt."
            },
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: Operator „diskutieren … mögliche Strafen“ = AFB III; die Meinungslinie als Mikromethode der Urteilsbildung."
            },
            {
              "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
              "verweis": "Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.) · 3 Prinzipien: Überwältigungsverbot · Kontroversitätsgebot · Schülerorientierung. Maßstab politischer Bildung. — Anwendung hier: Stereotypisierungsvermeidung; Leon als individueller Fall, nicht als Stereotyp — Überwältigungsverbot praktisch umgesetzt."
            }
          ]
        }
      ]
    },
    "GPG8_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG8",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG8-LB3-01",
          "ke_wortlaut": "beschreiben die Aufgaben wichtiger parlamentarischer Institutionen bei der Gesetzgebung anhand eines aktuellen Fallbeispiels und diskutieren den Sinn dieser Regelungen für die Zielsetzungen von Legitimität, Effizienz und Allgemeinwohl.",
          "thema": "Verfassung — parlamentarische Gesetzgebung",
          "operator": "beschreiben (R) / erklären (M) + diskutieren",
          "afb": "I→II (R→M) + III",
          "inhalte": "Verfassungsorgane (Bundestag, Bundesregierung, Bundesrat), Gesetzgebungsverfahren, freiheitliche demokratische Grundordnung.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Fallanalyse „Wie entsteht ein Gesetz?“ — Gesetzgebungsweg an einem aktuellen Gesetzentwurf",
          "umsetzung_klasse": "GPG8",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG8-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "aktueller Gesetzentwurf als Fall",
              "inhalt": "aktueller Gesetzentwurf als Fall"
            },
            {
              "nr": 2,
              "titel": "Rekonstruktion des Wegs Initiative",
              "inhalt": "Rekonstruktion des Wegs Initiative"
            },
            {
              "nr": 3,
              "titel": "Bundestag",
              "inhalt": "Bundestag"
            },
            {
              "nr": 4,
              "titel": "Bundesrat",
              "inhalt": "Bundesrat"
            },
            {
              "nr": 5,
              "titel": "Verkündung",
              "inhalt": "Verkündung"
            },
            {
              "nr": 6,
              "titel": "Pro-Contra „Ist dieses Verfahren sinnvoll?“ entlang der Krit",
              "inhalt": "Pro-Contra „Ist dieses Verfahren sinnvoll?“ entlang der Kriterien Legitimität / Effizienz / Allgemeinwohl."
            },
            {
              "nr": 7,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Operatorenwechsel R „beschreiben“ → M „erklären“ als klares R/M-Differenzierungsbeispiel verwendbar.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: der KE fordert wörtlich ein „aktuelles Fallbeispiel“ — kasuistischer Zugang zum abstrakten Gesetzgebungsverfahren."
            },
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: „diskutieren den Sinn … für Legitimität, Effizienz, Allgemeinwohl“ liefert die Bewertungskriterien direkt mit."
            },
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: Gegenstandsbereich „Ordnungssysteme“; R/M-Operatorenprogression beschreiben → erklären als AFB-Steigerung."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: ein realer Gesetzentwurf verankert das Verfahren in der politischen Gegenwart."
            }
          ]
        },
        {
          "ke_id": "GPG8-LB3-02",
          "ke_wortlaut": "erläutern Motive und Formen des Widerstands einzelner Gruppen unter dem Nationalsozialismus, diskutieren Möglichkeiten und Grenzen, Menschenrechte auch in einer Demokratie einzufordern und erkennen dabei Zivilcourage als eine zum Erhalt und zur Stabilisierung demokratischer Gesellschaftsstrukturen unverzichtbare Voraussetzung.",
          "thema": "Nationalsozialismus — Widerstand und Zivilcourage",
          "operator": "erläutern / diskutieren / erkennen",
          "afb": "II–III",
          "inhalte": "Widerstand im NS (Weiße Rose, 20. Juli, Bonhoeffer, Pater Mayer); Zivilcourage; Menschenrechte.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Warum riskierten sie ihr Leben?“ — Widerstandsgruppen und der Transfer auf Zivilcourage heute",
          "umsetzung_klasse": "GPG8",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG8-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "arbeitsteilige Erarbeitung von Widerstandsgruppen",
              "inhalt": "arbeitsteilige Erarbeitung von Widerstandsgruppen"
            },
            {
              "nr": 2,
              "titel": "Motiv-Analyse",
              "inhalt": "Motiv-Analyse"
            },
            {
              "nr": 3,
              "titel": "Dilemma-Diskussion „Hätte ich mich getraut?“",
              "inhalt": "Dilemma-Diskussion „Hätte ich mich getraut?“"
            },
            {
              "nr": 4,
              "titel": "Transfer: Zivilcourage-Situationen aus der Lebenswelt der Su",
              "inhalt": "Transfer: Zivilcourage-Situationen aus der Lebenswelt der SuS."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Werterziehung sensibel: Heroisierung vermeiden, Handlungsspielräume realistisch halten.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Werterziehung (Lind2003)",
              "verweis": "G. Lind: Moralische Kompetenz (2003) + Beutelsbacher Konsens-Schülerorientierung. Werterziehung über Diskurs, nicht Doktrin. — Anwendung hier: Zivilcourage als gemeinschaftstragender Wert; Dilemma-Diskussion als urteilsbildende Methode (Kohlberg-Stufe)."
            },
            {
              "didaktik": "Demokratielernen (Himmelmann2001)",
              "verweis": "G. Himmelmann: Demokratie-Lernen als Lebens-, Gesellschafts- und Herrschaftsform. Wochenschau 2001. — Anwendung hier: Zivilcourage explizit als „unverzichtbare Voraussetzung“ demokratischer Stabilität — Demokratie als Wert- und Lebensform."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: verschiedene Widerstandsgruppen mit unterschiedlichen Motiven und Milieus."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: der Transfer auf gegenwärtige Zivilcourage-Situationen verankert das historische Thema in der Lebenswelt."
            }
          ]
        }
      ]
    },
    "GPG8_LB4": {
      "ke_anzahl": 2,
      "jgst": "GPG8",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG8-LB4-01",
          "ke_wortlaut": "beschreiben die Möglichkeiten der politischen Teilhabe der Bürgerinnen und Bürger in der Demokratie, beurteilen deren Mitwirkungsmöglichkeiten und diskutieren sie als eigene zukünftige Handlungsmöglichkeiten.",
          "thema": "Politische Teilhabe — Mitwirkungsmöglichkeiten",
          "operator": "beschreiben (R) / erklären (M) + beurteilen + diskutieren",
          "afb": "I→II + III",
          "inhalte": "politische Teilhabe (Wahlen, Parteien, Bürgerinitiativen).",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Wie kann ich mitmischen?“ — Beteiligungsformen als eigene Handlungsoptionen",
          "umsetzung_klasse": "GPG8",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG8-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Sammlung von Beteiligungsformen",
              "inhalt": "Sammlung von Beteiligungsformen"
            },
            {
              "nr": 2,
              "titel": "Einordnung auf einer Beteiligungsleiter",
              "inhalt": "Einordnung auf einer Beteiligungsleiter"
            },
            {
              "nr": 3,
              "titel": "Bewertung nach Wirksamkeit/Aufwand",
              "inhalt": "Bewertung nach Wirksamkeit/Aufwand"
            },
            {
              "nr": 4,
              "titel": "Diskussion „Welche Form werde ich später nutzen?“.",
              "inhalt": "Diskussion „Welche Form werde ich später nutzen?“."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "KE-Wortlaut „als eigene zukünftige Handlungsmöglichkeiten“ — direkter Mündigkeits- und Handlungsbezug.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Mündigkeit (Detjen) (Detjen2007)",
              "verweis": "J. Detjen: Politische Bildung. Geschichte und Gegenwart in Deutschland. Oldenbourg 2007. Mündigkeit als Bildungsziel (Kant-Anschluss). — Anwendung hier: „eigene zukünftige Handlungsmöglichkeiten“ — Dimension 3 Handlungsfähigkeit + Dimension 2 Urteilen direkt im KE-Wortlaut."
            },
            {
              "didaktik": "Demokratielernen (Himmelmann2001)",
              "verweis": "G. Himmelmann: Demokratie-Lernen als Lebens-, Gesellschafts- und Herrschaftsform. Wochenschau 2001. — Anwendung hier: politische Teilhabe als Kern des Demokratielernens — Demokratie als Handlungsform."
            },
            {
              "didaktik": "Handlungsorientierung (Reinhardt2005)",
              "verweis": "S. Reinhardt: Politik-Didaktik. Praxishandbuch. Cornelsen 2005. Handlungsorientierung = Real-Handeln · Simulationshandeln · produktives Handeln. — Anwendung hier: der KE zielt auf zukünftiges Realhandeln; methodisch über Erprobung/Simulation anzubahnen."
            },
            {
              "didaktik": "Politische Urteilsbildung (GPJE2004)",
              "verweis": "GPJE 2004: Anforderungen an Nationale Bildungsstandards für den Fachunterricht politische Bildung. 3 Kompetenzdimensionen: politische Urteils- · Handlungs- · methodische Kompetenz. — Anwendung hier: Operator „beurteilen / diskutieren“ — Mitwirkungsmöglichkeiten werden bewertet, nicht nur aufgezählt."
            }
          ]
        },
        {
          "ke_id": "GPG8-LB4-02",
          "ke_wortlaut": "analysieren die Wahlbeteiligung einer aktuellen Bundes- oder Landtagswahl und diskutieren Gründe für die geringe Wahlbeteiligung von Erstwählerinnen und Erstwählern.",
          "thema": "Wahlen — Wahlbeteiligung von Erstwählern",
          "operator": "analysieren / diskutieren",
          "afb": "II–III",
          "inhalte": "Wahlen; Wahlbeteiligung; Erstwähler.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Aktualstunde „Warum gehen junge Leute nicht wählen?“ — Statistikanalyse einer aktuellen Wahl",
          "umsetzung_klasse": "GPG8",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG8-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Diagrammanalyse Wahlbeteiligung nach Altersgruppen",
              "inhalt": "Diagrammanalyse Wahlbeteiligung nach Altersgruppen"
            },
            {
              "nr": 2,
              "titel": "Hypothesen sammeln",
              "inhalt": "Hypothesen sammeln"
            },
            {
              "nr": 3,
              "titel": "Diskussion der Gründe",
              "inhalt": "Diskussion der Gründe"
            },
            {
              "nr": 4,
              "titel": "Transfer „Was würde euch zum Wählen bewegen?“.",
              "inhalt": "Transfer „Was würde euch zum Wählen bewegen?“."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Aktualitätsprinzip: nur mit einer tatsächlich aktuellen Wahl tragfähig — Material kurz vor Durchführung aktualisieren.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: KE-Wortlaut „aktuelle Bundes- oder Landtagswahl“ — Aktualitätsprinzip verbindlich; Erstwähler = nahe Lebensperspektive der SuS."
            },
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: Wahlstatistiken und Diagramme als Datenquellen — fachspezifische Arbeitsweise „sich informieren / interpretieren“."
            },
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: Operator „diskutieren Gründe“ — Urteilsbildung über ein gesellschaftliches Problem."
            }
          ]
        }
      ]
    },
    "GPG9_LB3": {
      "ke_anzahl": 1,
      "jgst": "GPG9",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG9-LB3-01",
          "ke_wortlaut": "stellen Organisationen der nationalen und internationalen Friedenssicherung dar und diskutieren deren Rolle in aktuellen humanitären und militärischen Einsätzen.",
          "thema": "Friedenssicherung — nationale und internationale Organisationen",
          "operator": "darstellen / diskutieren (R) — + begründen (M)",
          "afb": "II–III",
          "inhalte": "nationale + internationale Friedenssicherung (UNO, NATO, Bundeswehr); humanitäre und militärische Einsätze.",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Wer sichert den Frieden?“ — Organisationen und ein aktueller Einsatz",
          "umsetzung_klasse": "GPG9",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG9-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Organisationen-Steckbriefe (UNO, NATO, Bundeswehr)",
              "inhalt": "Organisationen-Steckbriefe (UNO, NATO, Bundeswehr)"
            },
            {
              "nr": 2,
              "titel": "Fallanalyse eines aktuellen Einsatzes",
              "inhalt": "Fallanalyse eines aktuellen Einsatzes"
            },
            {
              "nr": 3,
              "titel": "Pro-Contra „War dieser Einsatz gerechtfertigt?“.",
              "inhalt": "Pro-Contra „War dieser Einsatz gerechtfertigt?“."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "M-Zusatz „begründen deren Funktion“ als klare AFB-Steigerung gegenüber R.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: Operator „diskutieren deren Rolle“ — Bewertung internationaler Einsätze als kontroverse Streitfrage."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: KE-Wortlaut „aktuelle … Einsätze“ — Aktualitätsprinzip verpflichtend."
            },
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: humanitäre vs. militärische Sichtweise; Perspektiven der beteiligten Staaten."
            },
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: Gegenstandsbereich „Ordnungssysteme“ auf internationaler Ebene; M-Operatorenprogression."
            }
          ]
        }
      ]
    },
    "GPG9_LB4": {
      "ke_anzahl": 2,
      "jgst": "GPG9",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG9-LB4-01",
          "ke_wortlaut": "erklären Ursachen von Migrationsbewegungen, nennen politische Entscheidungen sowie getroffene Maßnahmen in ihrer Region und diskutieren Herausforderungen und Chancen der Migration für unsere Gesellschaft.",
          "thema": "Migration — Ursachen, Herausforderungen und Chancen",
          "operator": "erklären (R) / analysieren (M) + diskutieren",
          "afb": "II→III (R→M) + III",
          "inhalte": "Migration und Integration (Ursachen, gesellschaftliche Herausforderungen).",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB4 Lebenswelt — LB mit explizitem Multiperspektivitäts-Bezug",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Sequenz „Migration — Herausforderung und Chance“ — Push/Pull und regionale Maßnahmen",
          "umsetzung_klasse": "GPG9",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG9-Schriftwesen vorliegend; adjazenter realer Bezug: Brücke Landflucht 19. Jh. ↔ heutige Migration in der Industrialisierungs-Sequenz GPG7 (Belegcluster D).",
          "ues": [
            {
              "nr": 1,
              "titel": "Push/Pull-Faktoren-Analyse",
              "inhalt": "Push/Pull-Faktoren-Analyse"
            },
            {
              "nr": 2,
              "titel": "regionale Maßnahmen recherchieren",
              "inhalt": "regionale Maßnahmen recherchieren"
            },
            {
              "nr": 3,
              "titel": "Pro-Contra „Herausforderungen und Chancen“ aus mehreren gese",
              "inhalt": "Pro-Contra „Herausforderungen und Chancen“ aus mehreren gesellschaftlichen Perspektiven."
            },
            {
              "nr": 4,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Push/Pull-Methodik bereits real in GPG7-Landflucht erprobt — übertragbar. GPG9-Durchführung bei Gelegenheit real nachtragen.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: GPG9 LB4 nennt „aus unterschiedlichen Perspektiven“ explizit — Pflichtanker für die Multiperspektivitäts-Frage."
            },
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: „diskutieren Herausforderungen und Chancen“ ist die klassische kontroverse Streitfrage — AFB III."
            },
            {
              "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
              "verweis": "Beutelsbacher Konsens 1976 (Wehling/Schiele Hg.) · 3 Prinzipien: Überwältigungsverbot · Kontroversitätsgebot · Schülerorientierung. Maßstab politischer Bildung. — Anwendung hier: Migration ist hochkontrovers — Kontroversitätsgebot und Überwältigungsverbot sind hier besonders streng zu wahren."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: regionale Maßnahmen verankern das globale Thema im Nahraum der SuS."
            }
          ]
        },
        {
          "ke_id": "GPG9-LB4-02",
          "ke_wortlaut": "recherchieren Ursachen und Auswirkungen eines aktuellen gesellschaftlichen Konfliktes und bewerten diesen aus unterschiedlichen Perspektiven.",
          "thema": "Aktueller gesellschaftlicher Konflikt — Mehrperspektivenanalyse",
          "operator": "recherchieren + bewerten (R) / + präsentieren + erörtern (M)",
          "afb": "II–III",
          "inhalte": "Analyse eines aktuellen Konfliktes aus unterschiedlichen Perspektiven.",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Projekt „Konflikt im Fokus“ — selbst gewählter aktueller Konflikt, mehrperspektivisch",
          "umsetzung_klasse": "GPG9",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG9-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "SuS wählen einen aktuellen Konflikt",
              "inhalt": "SuS wählen einen aktuellen Konflikt"
            },
            {
              "nr": 2,
              "titel": "arbeitsteilige Recherche pro Perspektive",
              "inhalt": "arbeitsteilige Recherche pro Perspektive"
            },
            {
              "nr": 3,
              "titel": "Präsentation der Perspektiven",
              "inhalt": "Präsentation der Perspektiven"
            },
            {
              "nr": 4,
              "titel": "gemeinsame Bewertung/Erörterung an Kriterien.",
              "inhalt": "gemeinsame Bewertung/Erörterung an Kriterien."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "KE-Wortlaut „aus unterschiedlichen Perspektiven“ — Multiperspektivität ist hier nicht Methode, sondern Kompetenzerwartung.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Multiperspektivität (Bergmann2000)",
              "verweis": "K. Bergmann: Multiperspektivität · Geschichts- und Politikdidaktik. Wochenschau 2000. Mehrere Sichtweisen auf historisch-politische Ereignisse als didaktisches Pflicht-Prinzip. — Anwendung hier: „aus unterschiedlichen Perspektiven“ wörtlich im KE — Perspektivenvielfalt als verpflichtende Kompetenzerwartung."
            },
            {
              "didaktik": "Aktualität / Lebensweltbezug (Klafki1996)",
              "verweis": "Klafki kategoriale Bildung + Aktualitätsprinzip GPJE: politische Bildung knüpft an aktuelle Lebens- und Gesellschaftsfragen an. — Anwendung hier: ein „aktueller gesellschaftlicher Konflikt“ — Aktualitätsprinzip verbindlich, SuS-Auswahl stärkt den Lebensweltbezug."
            },
            {
              "didaktik": "Pro-Contra-Debatte / politische Urteilsbildung (Massing)",
              "verweis": "P. Massing: Politische Bildung. Wochenschau-Verlag. Pro-Contra-Debatte als kategoriale Methode politischer Urteilsbildung. — Anwendung hier: Operator „bewerten / erörtern“ — begründetes Urteil über einen Konflikt."
            },
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: selbstständige Recherche als fachspezifische Arbeitsweise; M zusätzlich „präsentieren“."
            }
          ]
        }
      ]
    },
    "GPG10_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG10",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG10-LB3-01",
          "ke_wortlaut": "definieren die Grund- und Menschenrechte als schützenswerte Basis gesellschaftlichen Zusammenlebens.",
          "thema": "Grund- und Menschenrechte — schützenswerte Basis",
          "operator": "definieren",
          "afb": "III (normativ)",
          "inhalte": "Garantie und Schutz der Grund- und Menschenrechte.",
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft (M-Zug)",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Was sind unsere Rechte wert?“ — Grundrechte als normative Basis",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG10-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Grundrechtskatalog erarbeiten",
              "inhalt": "Grundrechtskatalog erarbeiten"
            },
            {
              "nr": 2,
              "titel": "Fallbeispiele „Grundrecht in Gefahr“",
              "inhalt": "Fallbeispiele „Grundrecht in Gefahr“"
            },
            {
              "nr": 3,
              "titel": "SuS formulieren eine eigene Definition der Grund- und Mensch",
              "inhalt": "SuS formulieren eine eigene Definition der Grund- und Menschenrechte als „schützenswerte Basis“"
            },
            {
              "nr": 4,
              "titel": "Diskussion der Schutzbedürftigkeit.",
              "inhalt": "Diskussion der Schutzbedürftigkeit."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "Operator „definieren“ ist hier normativ gemeint (AFB III) — nicht bloße Begriffswiedergabe, sondern wertende Setzung.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Werterziehung (Lind2003)",
              "verweis": "G. Lind: Moralische Kompetenz (2003) + Beutelsbacher Konsens-Schülerorientierung. Werterziehung über Diskurs, nicht Doktrin. — Anwendung hier: Grund- und Menschenrechte als „schützenswerte Basis“ — Wertorientierung als Sk-Unterrichtsprinzip."
            },
            {
              "didaktik": "Mündigkeit (Detjen) (Detjen2007)",
              "verweis": "J. Detjen: Politische Bildung. Geschichte und Gegenwart in Deutschland. Oldenbourg 2007. Mündigkeit als Bildungsziel (Kant-Anschluss). — Anwendung hier: die normative Definition verlangt eigenständiges politisches Urteilen (Dimension 2)."
            },
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: „Grundrecht in Gefahr“-Fälle als kasuistischer Zugang zum abstrakten Normbestand."
            }
          ]
        },
        {
          "ke_id": "GPG10-LB3-02",
          "ke_wortlaut": "stellen die Rolle des Bundesverfassungsgerichts in unserem politischen System dar und erörtern seine Bedeutung für den Schutz der Grund- und Menschenrechte in Deutschland an einem selbst recherchierten Beispiel.",
          "thema": "Bundesverfassungsgericht — Rolle im politischen System",
          "operator": "darstellen / erörtern",
          "afb": "II–III",
          "inhalte": "Funktion und Aufgaben des Bundesverfassungsgerichts; Grundrechtsschutz.",
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft (M-Zug)",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Fallanalyse „Karlsruhe entscheidet“ — ein selbst recherchiertes BVerfG-Urteil",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG10-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Stellung des BVerfG im Verfassungsgefüge",
              "inhalt": "Stellung des BVerfG im Verfassungsgefüge"
            },
            {
              "nr": 2,
              "titel": "SuS recherchieren selbstständig ein BVerfG-Urteil",
              "inhalt": "SuS recherchieren selbstständig ein BVerfG-Urteil"
            },
            {
              "nr": 3,
              "titel": "Fallpräsentation",
              "inhalt": "Fallpräsentation"
            },
            {
              "nr": 4,
              "titel": "Erörterung „Wie schützt das Gericht hier Grundrechte?“.",
              "inhalt": "Erörterung „Wie schützt das Gericht hier Grundrechte?“."
            },
            {
              "nr": 5,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "KE-Wortlaut „an einem selbst recherchierten Beispiel“ — Selbstständigkeit als M-Anforderung explizit.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Fallanalyse (Massing2010)",
              "verweis": "P. Massing: Fallanalyse / Kasuistik. Wochenschau-Sammelband 2010. Konkrete Fälle als Zugang zu politischen Strukturen. — Anwendung hier: ein selbst recherchiertes BVerfG-Urteil als Fall — kasuistischer Zugang zur Institution."
            },
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: Gegenstandsbereich „Ordnungssysteme“; das BVerfG als Verfassungsorgan im Gewaltengefüge."
            },
            {
              "didaktik": "Quellenarbeit (Pandel2017)",
              "verweis": "H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017. Quellenkritik als Kernkompetenz historisch-politischen Lernens. — Anwendung hier: selbstständige Recherche eines Urteils — fachspezifische Arbeitsweise „sich informieren / interpretieren“."
            },
            {
              "didaktik": "Mündigkeit (Detjen) (Detjen2007)",
              "verweis": "J. Detjen: Politische Bildung. Geschichte und Gegenwart in Deutschland. Oldenbourg 2007. Mündigkeit als Bildungsziel (Kant-Anschluss). — Anwendung hier: Operator „erörtern“ + Selbstrecherche — eigenständiges politisches Urteilen."
            }
          ]
        }
      ]
    },
    "GPG10_LB4": {
      "ke_anzahl": 1,
      "jgst": "GPG10",
      "lb": "LB4",
      "lb_titel": "Wirtschaft und Recht",
      "status": "ausgearbeitet",
      "kes": [
        {
          "ke_id": "GPG10-LB4-01",
          "ke_wortlaut": "stellen den Prozess der politischen Willensbildung dar und erproben Einfluss- und Beteiligungsmöglichkeiten politischer Mitwirkung.",
          "thema": "Politische Willensbildung — Beteiligung erproben",
          "operator": "darstellen / erproben",
          "afb": "II + Anwendung/Handlung",
          "inhalte": "politische Willensbildung und Mitwirkung.",
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt (M-Zug) — einzige Stufe mit „erproben“ über den Nahraum hinaus",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Projekt „Mischen wir mit“ — politische Willensbildung darstellen und erproben",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
          "umsetzung_quelle": "idealtypisch — kein eigenes GPG10-Schriftwesen vorliegend",
          "ues": [
            {
              "nr": 1,
              "titel": "Prozessmodell der Willensbildung (Meinung",
              "inhalt": "Prozessmodell der Willensbildung (Meinung"
            },
            {
              "nr": 2,
              "titel": "Öffentlichkeit",
              "inhalt": "Öffentlichkeit"
            },
            {
              "nr": 3,
              "titel": "Parteien/Verbände",
              "inhalt": "Parteien/Verbände"
            },
            {
              "nr": 4,
              "titel": "Entscheidung)",
              "inhalt": "Entscheidung)"
            },
            {
              "nr": 5,
              "titel": "SuS erproben eine reale Beteiligungsform (Petition, Eingabe,",
              "inhalt": "SuS erproben eine reale Beteiligungsform (Petition, Eingabe, Leserbrief, Beteiligungsplattform)"
            },
            {
              "nr": 6,
              "titel": "Reflexion der Wirksamkeit.",
              "inhalt": "Reflexion der Wirksamkeit."
            },
            {
              "nr": 7,
              "titel": "Anmerkung / Reflexion",
              "inhalt": "„erproben“ verlangt Realhandeln, nicht Simulation — die reale Beteiligungsform ist der entscheidende Schritt.",
              "ebene": "meta"
            }
          ],
          "bezuege": [
            {
              "didaktik": "Handlungsorientierung — Realhandeln (Petrik2013)",
              "verweis": "A. Petrik: Politische Bildung in der Sek I. Politisches Handeln statt nur Wissen. Pluralität der Handlungsformen. — Anwendung hier: „erproben“ = Realhandeln (Massing); auf der überregionalen Ebene die anspruchsvollste Handlungsstufe der MS-Sk."
            },
            {
              "didaktik": "Demokratielernen (Himmelmann2001)",
              "verweis": "G. Himmelmann: Demokratie-Lernen als Lebens-, Gesellschafts- und Herrschaftsform. Wochenschau 2001. — Anwendung hier: politische Willensbildung als Kern der Demokratie als Herrschafts- und Handlungsform."
            },
            {
              "didaktik": "Mündigkeit (Detjen) (Detjen2007)",
              "verweis": "J. Detjen: Politische Bildung. Geschichte und Gegenwart in Deutschland. Oldenbourg 2007. Mündigkeit als Bildungsziel (Kant-Anschluss). — Anwendung hier: Dimension 3 Handlungsfähigkeit — das Ziel politischer Bildung wird operativ eingelöst."
            },
            {
              "didaktik": "Kompetenzstrukturmodell GPG (LPplusGPG)",
              "verweis": "LehrplanPLUS Bayern Mittelschule GPG-Fachprofil · 4 Gegenstandsbereiche × 6 prozessbezogene Kompetenzen · Doppeltagging-Prinzip. — Anwendung hier: prozessbezogene Kompetenz „Anwenden und handeln“ explizit adressiert."
            }
          ]
        }
      ]
    }
  },
};
