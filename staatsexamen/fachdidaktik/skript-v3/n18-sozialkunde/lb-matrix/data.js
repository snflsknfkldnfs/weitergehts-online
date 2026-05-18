// LB-Matrix Sozialkunde N18 · LP+-konform · zitierfähig · v3 (5-Phasen-Standard)
//
// QUELLEN-PRINZIP v3
// ────────────────────────────────────────────────────────────────────────
// 1. Spalten = 3 für die N18-Sozialkunde-Prüfung relevante GPG-Lernbereiche:
//    LB2 Zeit und Wandel · LB3 Politik und Gesellschaft · LB4 Lebenswelt.
//    (LB1 Lebensraum Erde ist Geographie und hier ausgeblendet.)
//
// 2. KE-Wortlaute Quellen-Status pro Zelle:
//    · verbatim   — GPG5/6/7/10 aus LehrplanPLUS Bayern (Web 2026-05 +
//                   lokales Skript für GPG7). Wortlaut 1:1.
//    · sekundaer  — GPG8/9 aus aufbereiteter KE-Datenbank
//                   (/lerndecks/ke-umsetzungsmatrix-sk · Pauls Eigen-Quelle,
//                   LP+-Quelle für diese Jgst aktuell nicht verbatim verifiziert).
//    · ausstehend — GPG8 LB2 + GPG9 LB2: Geschichts-KEs ohne lokale/Web-Quelle.
//
// 3. Inhalte zu den Kompetenzen: verbatim aus LP+ pro Zelle dokumentiert
//    (Feld `inhalte_lp`).
//
// 4. **Ankerwörter statt Verbatim-Flut**: KE-Wortlaut zeigt Operator/Inhalts-
//    Kernbegriffe als `<mark>`-Hervorhebung an (Feld `ke_wortlaut_anker[]`),
//    Verbatim bleibt als zitierfähiger Text vorhanden — visuell entzerrt.
//
// 5. **Pilot-Sequenz GPG7_LB3 KE1 Soziale Frage** (v3): 10 idealtypische
//    45-min-UEs mit GPG-Bayern-Standard 5-Artikulationsstufen-Schema:
//    (1) Problemstellung mit Vorwissensaktivierung · Zielangabe · Arbeitsplanung
//    (2) Problementfaltung (Erarbeitungsphase: Material + Auseinandersetzung)
//    (3) Problemlösung (Antwort auf die Problemfrage)
//    (4) Wertung / rationales Urteil (Sach- + Werte-Ebene + eigene Position)
//    (5) Sicherung + Lernzielkontrolle (Hefteintrag + Übung/Diagnose)
//    Quelle: GPG GB Kap. 5 (Artikulationsstufen) + Seminarbuch Bd. 3 S. 10-12.
//    Pro UE zusätzlich: `prinzipien_b3[]` (Beutelsbach + GPG B3 Prinzipien)
//    und `kompetenzstruktur` (Gegenstandsbereich × Perspektive × Prozesskompetenz).
//
// LITERATUR (in bezuege[].didaktik verwendet, vollständige Refs in Kürzel-Index)
// ────────────────────────────────────────────────────────────────────────
// Beutelsbach1976 · Beutelsbacher Konsens 1976: Überwältigungsverbot ·
//                   Kontroversitätsgebot · Schülerorientierung.
// Detjen2007      · J. Detjen: Politische Bildung. Oldenbourg 2007. Mündigkeit.
// Himmelmann2001  · G. Himmelmann: Demokratie-Lernen 3-Formen-Modell.
//                   Wochenschau 2001.
// GPJE2004        · GPJE Bildungsstandards politische Bildung 2004.
// Reinhardt2005   · S. Reinhardt: Politik-Didaktik. Cornelsen 2005.
// Massing / 2010  · P. Massing: Pro-Contra-Debatte · Kasuistik. Wochenschau.
// Bergmann2000    · K. Bergmann: Multiperspektivität. Wochenschau 2000.
// Pandel2017      · H.-J. Pandel: Geschichtsdidaktik. Wochenschau 2017.
// Rüsen2002       · J. Rüsen: Narrative Kompetenz · Historische Sinnbildung.
// Klafki1996      · W. Klafki: Kategoriale Bildung · Aktualitätsprinzip.
// Petrik2013      · A. Petrik: Politische Bildung Sek I.
// Lind2003        · G. Lind: Moralische Kompetenz · Werterziehung über Diskurs.
// Schraw          · G. Schraw: Self-Regulated Learning · Metakognition.
// LPplusGPG       · LehrplanPLUS Bayern Mittelschule GPG (Fachprofil + LBs).

window.MATRIX = {
  fach: 'N18 Sozialkunde',
  fachKuerzel: 'Sozialkunde',
  schulart: 'Mittelschule Bayern · GPG (Sozialkunde-Anteil LB2+LB3+LB4)',

  meta: {
    version: 'v3 · 2026-05-18 · 5-Phasen-Standard + Ankerwörter',
    spaltenLogik: 'Drei für die N18-Sozialkunde-Prüfung relevante GPG-Lernbereiche: LB2 Zeit und Wandel (Geschichte mit politik-historischer Sicht) · LB3 Politik und Gesellschaft (Sozialkunde-Kern) · LB4 Lebenswelt (Recht + Demokratie-Praxis + Lebenswelt-Themen). LB1 Lebensraum Erde ist Geographie und nicht enthalten.',
    quellenLogik: 'verbatim für GPG5/6/7/10 (Web + lokal). sekundaer für GPG8/9 LB3+LB4 (aus aufbereiteter KE-Datenbank). ausstehend für GPG8/9 LB2 (Geschichts-KEs ohne verfügbare Quelle).',
    pilotSequenzen: 'GPG7_LB3 KE1 Soziale Frage · 10 UEs à 45 min idealtypisch · GPG-Standard 5 Artikulationsstufen pro UE + GPG-B3-Prinzipien + Kompetenzstruktur (Gegenstand × Perspektive × Prozesskompetenz).',
    fachdidaktikStandard: 'GPG GB Kap. 5 (Artikulationsstufen) + Seminarbuch Bd. 3 S. 10-12 + Beutelsbacher Konsens 1976 + Kompetenzstrukturmodell LP+ Bayern GPG.',
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
    { id: 'LB2', titel: 'LB2 · Zeit und Wandel',       kurz: 'Geschichte' },
    { id: 'LB3', titel: 'LB3 · Politik + Gesellschaft', kurz: 'Politik' },
    { id: 'LB4', titel: 'LB4 · Lebenswelt',             kurz: 'Lebenswelt' },
  ],

  cells: {
    "GPG5_LB2": {
      "ke_anzahl": 4,
      "jgst": "GPG5",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG5-LB2-01",
          "ke_wortlaut": "erklären die sich verändernden Lebensweisen des Menschen in Alt- und Jungsteinzeit, indem sie die Entwicklung vom Jäger und Sammler zum Ackerbauern und Viehzüchter vergleichen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB2 Zeit und Wandel · verbatim",
          "thema": "erklären die sich verändernden Lebensweisen des Menschen in Alt- und Jungsteinze",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Vor- und Frühgeschichte: Lebensweise der Menschen, Sesshaftigkeit",
            "Bedeutung des Nils früher und heute: Transportweg, wissenschaftliche Leistungen",
            "Imperium Romanum",
            "historische Orte in der Region und Spuren römischen Lebens in Süddeutschland (z. B. Limes, Sprache)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG5-LB2-02",
          "ke_wortlaut": "erklären die Besonderheiten des Nils und begründen seine Bedeutung für die Infrastruktur und Kultur Ägyptens.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB2 Zeit und Wandel · verbatim",
          "thema": "erklären die Besonderheiten des Nils und begründen seine Bedeutung für die Infra",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Vor- und Frühgeschichte: Lebensweise der Menschen, Sesshaftigkeit",
            "Bedeutung des Nils früher und heute: Transportweg, wissenschaftliche Leistungen",
            "Imperium Romanum",
            "historische Orte in der Region und Spuren römischen Lebens in Süddeutschland (z. B. Limes, Sprache)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG5-LB2-03",
          "ke_wortlaut": "stellen die Ausdehnung des Römischen Weltreiches vereinfacht dar.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB2 Zeit und Wandel · verbatim",
          "thema": "stellen die Ausdehnung des Römischen Weltreiches vereinfacht dar.",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Vor- und Frühgeschichte: Lebensweise der Menschen, Sesshaftigkeit",
            "Bedeutung des Nils früher und heute: Transportweg, wissenschaftliche Leistungen",
            "Imperium Romanum",
            "historische Orte in der Region und Spuren römischen Lebens in Süddeutschland (z. B. Limes, Sprache)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG5-LB2-04",
          "ke_wortlaut": "lokalisieren und deuten unter Anleitung Überreste der römischen Kultur und Lebensweise in Süddeutschland.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB2 Zeit und Wandel · verbatim",
          "thema": "lokalisieren und deuten unter Anleitung Überreste der römischen Kultur und Leben",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Vor- und Frühgeschichte: Lebensweise der Menschen, Sesshaftigkeit",
            "Bedeutung des Nils früher und heute: Transportweg, wissenschaftliche Leistungen",
            "Imperium Romanum",
            "historische Orte in der Region und Spuren römischen Lebens in Süddeutschland (z. B. Limes, Sprache)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG5_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG5",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG5-LB3-01",
          "ke_wortlaut": "stellen die unterschiedlichen Lebens- und Arbeitsbedingungen der Menschen im alten Ägypten dar und erklären anhand der hierarchisch aufgebauten Gesellschaftspyramide deren unterschiedliche Stellung und Macht.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Antike Hochkultur — Gesellschaftsordnung Ägypten",
          "operator": "darstellen / erklären",
          "afb": "I–II",
          "inhalte_lp": [
            "ägyptische Hochkultur: Alltagsleben, hierarchische Gesellschaft",
            "politisches und kulturelles Erbe der Griechen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Das alte Ägypten“ — Gesellschaft am Nil (Rollenspiel) + Götter/Pyramiden (Stationenlernen)",
          "umsetzung_klasse": "GPG5b (SJ 24/25, 20 SuS, ⅔ arab. Migrationshintergrund, 2 DaZ, 3× LRS-Verdacht)",
          "umsetzung_datum": "KW 2–5 / Januar–Februar 2025 (8 UZE)",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Antike Demokratie — Volksversammlung Griechenland",
          "operator": "beschreiben / beurteilen",
          "afb": "I + III",
          "inhalte_lp": [
            "ägyptische Hochkultur: Alltagsleben, hierarchische Gesellschaft",
            "politisches und kulturelles Erbe der Griechen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Die griechische Demokratie“ — Volksversammlung als Rollenspiel + Pro-Contra Demokratie damals/heute",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "Planung KW 14–17 / März–April 2025, real durchgeführt KW 23–27 / Juni–Juli 2025 (6 UZE)",
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
      "lb_titel": "Lebenswelt",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG5-LB4-01",
          "ke_wortlaut": "beschreiben Konfliktsituationen aus ihrem Alltag (z. B. Peergroup, Familie, Schule) und formulieren Regeln für ein friedliches und gewaltfreies Zusammenleben.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB4 Lebenswelt · verbatim",
          "thema": "Konflikte — Regeln für friedliches Zusammenleben",
          "operator": "beschreiben / formulieren",
          "afb": "I–II",
          "inhalte_lp": [
            "Grundregeln für ein friedliches Zusammenleben",
            "Konflikte: Prävention, Intervention",
            "Gemeinschaft: gemeinsam leben in Familie und Schule, in verschiedenen Lebensgemeinschaften, nach Trennung und Scheidung, in der Peergroup, mit Menschen mit Behinderung (Inklusion)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE „Konflikte lösen“ — Rollenspiel zur Konfliktbearbeitung (Schluss-UE der Sequenz „Familie und Gesellschaft“)",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 26 / 23.–27.06.2025 (2 UZE)",
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
          "ke_wortlaut": "wenden demokratische Verhaltensweisen (z. B. bei Klassensprecherwahl, Klassenrat) an, und gestalten ein friedliches und respektvolles Zusammenleben in Familie, Schule und Gesellschaft mit.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB4 Lebenswelt · verbatim",
          "thema": "Demokratische Verhaltensweisen — Klassenrat",
          "operator": "anwenden / mitgestalten",
          "afb": "III (Anwendung / Handlung)",
          "inhalte_lp": [
            "Grundregeln für ein friedliches Zusammenleben",
            "Konflikte: Prävention, Intervention",
            "Gemeinschaft: gemeinsam leben in Familie und Schule, in verschiedenen Lebensgemeinschaften, nach Trennung und Scheidung, in der Peergroup, mit Menschen mit Behinderung (Inklusion)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Doppelanker: Klassenrat als ritualisierte Demokratiepraxis GPG7c + Sequenz „Demokratische Verhaltensweisen“ GPG5b",
          "umsetzung_klasse": "GPG7c SJ 25/26 (Hauptanker, 4×) + GPG5b SJ 24/25 (Einführung der Methode)",
          "umsetzung_datum": "GPG7c: 17.10.2025 · 01.12.2025 · 02.02.2026 · 27.04.2026 · GPG5b: KW 27 / Juli 2025 + LB4-Sequenz „Demokratische Verhaltensweisen“",
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
          "ke_wortlaut": "stellen Ursachen für den aktuellen familiären Wandel in der Gesellschaft dar, indem sie die Entwicklung unterschiedlicher Formen des Zusammenlebens beschreiben und diskutieren.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB4 Lebenswelt · verbatim",
          "thema": "Familiärer Wandel — Formen des Zusammenlebens",
          "operator": "darstellen / beschreiben / diskutieren",
          "afb": "II–III",
          "inhalte_lp": [
            "Grundregeln für ein friedliches Zusammenleben",
            "Konflikte: Prävention, Intervention",
            "Gemeinschaft: gemeinsam leben in Familie und Schule, in verschiedenen Lebensgemeinschaften, nach Trennung und Scheidung, in der Peergroup, mit Menschen mit Behinderung (Inklusion)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Familie und Gesellschaft“ — Familien heute + Wandel der Familie",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 23–24 / 02.–13.06.2025 (4 UZE)",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG5 · LB4 Lebenswelt · verbatim",
          "thema": "Inklusion — Umgang mit Menschen mit Behinderung",
          "operator": "umgehen / kooperieren",
          "afb": "Anwendung / Haltung",
          "inhalte_lp": [
            "Grundregeln für ein friedliches Zusammenleben",
            "Konflikte: Prävention, Intervention",
            "Gemeinschaft: gemeinsam leben in Familie und Schule, in verschiedenen Lebensgemeinschaften, nach Trennung und Scheidung, in der Peergroup, mit Menschen mit Behinderung (Inklusion)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG5 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE „Leben mit Unterschieden“ — wertschätzender Umgang, Portfolio-Präsentation",
          "umsetzung_klasse": "GPG5b (SJ 24/25)",
          "umsetzung_datum": "KW 25 / 16.–20.06.2025 (2 UZE)",
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
    "GPG6_LB2": {
      "ke_anzahl": 5,
      "jgst": "GPG6",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG6-LB2-01",
          "ke_wortlaut": "stellen die Lebens- und Arbeitsbedingungen der Menschen im Mittelalter auf dem Land und in der Stadt dar und vergleichen sie mit heute.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB2 Zeit und Wandel · verbatim",
          "thema": "stellen die Lebens- und Arbeitsbedingungen der Menschen im Mittelalter auf dem L",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Lebensräume und Lebensbedingungen im Mittelalter",
            "Politische und gesellschaftliche Herrschaftsformen im Mittelalter am Beispiel Karl des Großen",
            "Spuren des Mittelalters in einem heutigen Stadtbild",
            "Medizinische, technische und kulturelle Errungenschaften zu Beginn der Neuzeit",
            "Hochkulturen in Südamerika, Eroberungen aus Sicht der Europäer und der indigenen Völker Südamerikas",
            "Reformation: Martin Luther, Dreißigjähriger Krieg"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG6-LB2-02",
          "ke_wortlaut": "erkennen in einem heutigen Stadtbild historische Spuren einer mittelalterlichen Stadt und begründen deren Bedeutung für das gesellschaftliche Leben früher und heute.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB2 Zeit und Wandel · verbatim",
          "thema": "erkennen in einem heutigen Stadtbild historische Spuren einer mittelalterlichen ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Lebensräume und Lebensbedingungen im Mittelalter",
            "Politische und gesellschaftliche Herrschaftsformen im Mittelalter am Beispiel Karl des Großen",
            "Spuren des Mittelalters in einem heutigen Stadtbild",
            "Medizinische, technische und kulturelle Errungenschaften zu Beginn der Neuzeit",
            "Hochkulturen in Südamerika, Eroberungen aus Sicht der Europäer und der indigenen Völker Südamerikas",
            "Reformation: Martin Luther, Dreißigjähriger Krieg"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG6-LB2-03",
          "ke_wortlaut": "benennen wichtige medizinische, technische und kulturelle Errungenschaften des Islam, die auf vielfältige Weise vom Morgenland ins Abendland gelangten, und erklären so den Einfluss auf den Übergang in ein neues Zeitalter.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB2 Zeit und Wandel · verbatim",
          "thema": "benennen wichtige medizinische, technische und kulturelle Errungenschaften des I",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Lebensräume und Lebensbedingungen im Mittelalter",
            "Politische und gesellschaftliche Herrschaftsformen im Mittelalter am Beispiel Karl des Großen",
            "Spuren des Mittelalters in einem heutigen Stadtbild",
            "Medizinische, technische und kulturelle Errungenschaften zu Beginn der Neuzeit",
            "Hochkulturen in Südamerika, Eroberungen aus Sicht der Europäer und der indigenen Völker Südamerikas",
            "Reformation: Martin Luther, Dreißigjähriger Krieg"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG6-LB2-04",
          "ke_wortlaut": "beschreiben wichtige Erfindungen und Erkenntnisse zu Beginn der Neuzeit, begründen diese als Voraussetzung für zahlreiche von Europa ausgehende Entdeckungsreisen und belegen deren Auswirkungen bis in die Gegenwart.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben wichtige Erfindungen und Erkenntnisse zu Beginn der Neuzeit, begründ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Lebensräume und Lebensbedingungen im Mittelalter",
            "Politische und gesellschaftliche Herrschaftsformen im Mittelalter am Beispiel Karl des Großen",
            "Spuren des Mittelalters in einem heutigen Stadtbild",
            "Medizinische, technische und kulturelle Errungenschaften zu Beginn der Neuzeit",
            "Hochkulturen in Südamerika, Eroberungen aus Sicht der Europäer und der indigenen Völker Südamerikas",
            "Reformation: Martin Luther, Dreißigjähriger Krieg"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG6-LB2-05",
          "ke_wortlaut": "beschreiben Ursachen und Ablauf der Reformation und erläutern die politischen, religiösen und wirtschaftlichen Konsequenzen der Kirchenspaltung.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben Ursachen und Ablauf der Reformation und erläutern die politischen, r",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Lebensräume und Lebensbedingungen im Mittelalter",
            "Politische und gesellschaftliche Herrschaftsformen im Mittelalter am Beispiel Karl des Großen",
            "Spuren des Mittelalters in einem heutigen Stadtbild",
            "Medizinische, technische und kulturelle Errungenschaften zu Beginn der Neuzeit",
            "Hochkulturen in Südamerika, Eroberungen aus Sicht der Europäer und der indigenen Völker Südamerikas",
            "Reformation: Martin Luther, Dreißigjähriger Krieg"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG6_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG6",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG6-LB3-01",
          "ke_wortlaut": "erklären die unterschiedlichen Lebensformen im Kloster und auf der Burg, um geistliche und weltliche Machtstrukturen zu vergleichen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "erklären die unterschiedlichen Lebensformen im Kloster und auf der Burg, um geis",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Leben im Mittelalter (Erziehung und Bildung, Justiz und Strafwesen)",
            "Bedeutung der Klöster im Mittelalter",
            "Mittelalterliche Ständegesellschaft (Kaufleute, Handwerker, Bauern)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG6-LB3-02",
          "ke_wortlaut": "stellen den hierarchischen Aufbau der mittelalterlichen Ständegesellschaft dar, um die individuellen Freiheiten in unserer Gesellschaft heute zu bewerten.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "stellen den hierarchischen Aufbau der mittelalterlichen Ständegesellschaft dar, ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Leben im Mittelalter (Erziehung und Bildung, Justiz und Strafwesen)",
            "Bedeutung der Klöster im Mittelalter",
            "Mittelalterliche Ständegesellschaft (Kaufleute, Handwerker, Bauern)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG6_LB4": {
      "ke_anzahl": 3,
      "jgst": "GPG6",
      "lb": "LB4",
      "lb_titel": "Lebenswelt",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG6-LB4-01",
          "ke_wortlaut": "recherchieren in ihrem familiären Umfeld die Motive für die Wahl des eigenen Wohnortes (Freizeitwert, Verkehrsanbindungen) und beurteilen diese Entscheidung.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB4 Lebenswelt · verbatim",
          "thema": "Kommunalpolitik — Motive der Wohnortwahl",
          "operator": "recherchieren / beurteilen",
          "afb": "II–III",
          "inhalte_lp": [
            "Leben in der Stadt und auf dem Land",
            "Mobilität (Wohnortwechsel)",
            "Struktur und Funktionsweise der kommunalen Selbstverwaltung",
            "Entscheidungsprozesse und Mitwirkungsmöglichkeiten in der Gemeinde (Wahl, Bürgerbegehren und -entscheid, Kinder- und Jugendforen)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Mini-Sozialstudie „Warum wohnen wir hier?“ — Befragung im familiären Umfeld",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB4 Lebenswelt · verbatim",
          "thema": "Kommunalpolitik — Aufbau der kommunalen Selbstverwaltung",
          "operator": "darstellen",
          "afb": "II",
          "inhalte_lp": [
            "Leben in der Stadt und auf dem Land",
            "Mobilität (Wohnortwechsel)",
            "Struktur und Funktionsweise der kommunalen Selbstverwaltung",
            "Entscheidungsprozesse und Mitwirkungsmöglichkeiten in der Gemeinde (Wahl, Bürgerbegehren und -entscheid, Kinder- und Jugendforen)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Wer entscheidet in unserer Gemeinde?“ — Strukturmodell kommunale Selbstverwaltung",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
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
          "ke_wortlaut": "erläutern ausgehend von einem aktuellen Fallbeispiel aus ihrem Umfeld die kommunal-politischen Entscheidungsprozesse und erproben ihre Mitwirkungsmöglichkeiten bei exemplarischen Fällen an ihrem Wohnort.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG6 · LB4 Lebenswelt · verbatim",
          "thema": "Kommunalpolitik — Entscheidungsprozesse erproben",
          "operator": "erläutern / erproben",
          "afb": "II + Anwendung/Handlung",
          "inhalte_lp": [
            "Leben in der Stadt und auf dem Land",
            "Mobilität (Wohnortwechsel)",
            "Struktur und Funktionsweise der kommunalen Selbstverwaltung",
            "Entscheidungsprozesse und Mitwirkungsmöglichkeiten in der Gemeinde (Wahl, Bürgerbegehren und -entscheid, Kinder- und Jugendforen)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG6 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Fallanalyse „Soll der Skatepark gebaut werden?“ — kommunalpolitischer Entscheidungsprozess am realen Ortsfall",
          "umsetzung_klasse": "GPG6",
          "umsetzung_datum": "",
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
    "GPG7_LB2": {
      "ke_anzahl": 8,
      "jgst": "GPG7",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG7-LB2-01",
          "ke_wortlaut": "nutzen den Vergleich zwischen absolutistischer und demokratischer Regierungsform, um den Wert der politischen Mitbestimmungsmöglichkeiten in einer Demokratie (z. B. in der Bundesrepublik Deutschland) beurteilen zu können.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "nutzen den Vergleich zwischen absolutistischer und demokratischer Regierungsform",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-02",
          "ke_wortlaut": "übertragen ihre Kenntnisse über den nicht linearen Verlauf der Französischen Revolution auf Revolutionen der Gegenwart, um vergleichbare aktuelle Entwicklungen nachvollziehen zu können.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "übertragen ihre Kenntnisse über den nicht linearen Verlauf der Französischen Rev",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-03",
          "ke_wortlaut": "stellen in Grundzügen die Industrialisierung aus unterschiedlichen Perspektiven dar (z. B. technischer Wandel).",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "stellen in Grundzügen die Industrialisierung aus unterschiedlichen Perspektiven ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-04",
          "ke_wortlaut": "beschreiben die nationalstaatlichen Einigungsbestrebungen und die deutsche Reichsgründung.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben die nationalstaatlichen Einigungsbestrebungen und die deutsche Reich",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-05",
          "ke_wortlaut": "erklären, dass die traditionellen europäischen Mächterivalitäten und der imperialistische Wettlauf um Kolonien in den Ersten Weltkrieg mündeten.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "erklären, dass die traditionellen europäischen Mächterivalitäten und der imperia",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-06",
          "ke_wortlaut": "stellen die Ereignisse des Attentats von Sarajevo dar und diskutieren den Zusammenhang zwischen Ursachen und Auslöser eines Konfliktes anhand eines aktuellen Beispiels.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "stellen die Ereignisse des Attentats von Sarajevo dar und diskutieren den Zusamm",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-07",
          "ke_wortlaut": "beschreiben anhand von historischen Spuren den Verlauf des Ersten Weltkrieges für die Menschen an der Front und in der Heimat.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben anhand von historischen Spuren den Verlauf des Ersten Weltkrieges fü",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG7-LB2-08",
          "ke_wortlaut": "beschreiben die Auswirkungen des Ersten Weltkrieges auf den Alltag der Menschen in der Heimat sowie an der Front und diskutieren anhand aktueller Beispiele die unmittelbaren Folgen von Kriegen für die Menschen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben die Auswirkungen des Ersten Weltkrieges auf den Alltag der Menschen ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Selbstverständnis eines absolutistischen Herrschers am Beispiel Ludwig XIV., Selbstverständnis eines demokratischen Amtsinhabers",
            "Französische Revolution: wichtige Beweggründe, grober Verlauf einzelner Phasen (z. B. Napoleonische Ära)",
            "Industrialisierung: technische und wirtschaftliche Entwicklung",
            "deutsche Reichsgründung",
            "Imperialismus: Rivalität der europäischen Nationalstaaten, Kolonialisierung am Beispiel Afrikas",
            "Ursachen und Verlauf des Ersten Weltkrieges: Attentat von Sarajevo, Stellungskrieg, Technisierung des Krieges, Heimatfront"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG7_LB3": {
      "ke_anzahl": 4,
      "jgst": "GPG7",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG7-LB3-01",
          "ke_wortlaut": "beschreiben die Lebens- und Arbeitsverhältnisse von Arbeiterinnen bzw. Arbeitern und deren Familien sowie Lösungsansätze der Sozialen Frage während der Industrialisierung.",
          "ke_wortlaut_anker": ["beschreiben", "Lebens- und Arbeitsverhältnisse", "Lösungsansätze", "Sozialen Frage", "Industrialisierung"],
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Soziale Frage — Lebens- und Arbeitsverhältnisse der Industrialisierung",
          "operator": "beschreiben (R) / beschreiben + vergleichen (M)",
          "afb": "I (R) / II (M)",
          "inhalte_lp": [
            "Industrielle Revolution, Industriegesellschaft",
            "Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze",
            "Kriegsschuldfrage und Versailler Vertrag"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Industrialisierung / Soziale Frage“ — Identifikationsfiguren Johann und Anna",
          "umsetzung_klasse": "GPG7c und GPG7b (zeitversetzt)",
          "umsetzung_datum": "KW09–KW13 / Feb–März 2026",
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
          ],
          "pilot_sequenz": {
            "titel": "10-UE-Sequenz · Lebens- und Arbeitsverhaeltnisse + Soziale Frage",
            "praxis": "Eigene Praxis GPG7c SJ 24/25 + idealtypische Erweiterung",
            "gesamtzeit": "10 UEs à 45 min = 7,5 Zeitstunden",
            "lernzielraster": "Sach- + Methoden- + Urteilskompetenz · GPJE 2004 · Mager-3-K-Lernziele",
            "phasenStandard": "GPG-Bayern · 5 Artikulationsstufen pro UE · Sequenzplan-Standard nach BUV-Template v4",
            "qualitaetsstandards_quelle": "GPG_Anleitungen/Sequenzplanung + Unterrichtseinheiten + Lernziele formulieren + GPG_BUV_Entwicklung/BUV_Template_Schwerpunktstunde_v4.md",
            "sequenz_meta": {
              "lehrplanbezug": "GPG 7 · Lernbereich 3 'Politik und Gesellschaft' · KE 1+2",
              "kompetenzerwartungen_verbatim": [
                "Die Schülerinnen und Schüler beschreiben die Lebens- und Arbeitsverhältnisse von Arbeiterinnen bzw. Arbeitern und deren Familien sowie Lösungsansätze der Sozialen Frage während der Industrialisierung.",
                "Die Schülerinnen und Schüler beschreiben den Übergang von der Agrar- zur Industriegesellschaft am Beispiel ausgewählter Aspekte (z. B. Ende der Patrimonialherrschaft, Verstädterung)."
              ],
              "inhalte_lp_verbatim": [
                "Industrielle Revolution, Industriegesellschaft",
                "Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze",
                "Kriegsschuldfrage und Versailler Vertrag"
              ],
              "zielsetzung_uebergeordnet": "Die Sequenz erschließt am Identifikationsfiguren-Paar Johann (landloser Knecht) und Anna (Spinnerei-Arbeiterin) die Lebens- und Arbeitsverhältnisse der Industrialisierung und führt zur kritischen Beurteilung von Bismarcks Sozialgesetzgebung. Ziel ist die Bildung eines reflektierten Sach- und Werturteils zur Sozialen Frage — historisch und in aktualisierter Perspektive (Wohnungsfrage, Working-Poor heute).",
              "methodische_schwerpunkte": [
                "Personifikation (Johann/Anna) als sequenzdurchgaengige Identifikationsstrategie",
                "Bild-/Quellenarbeit (Menzel, Engels, Stadtkarten) gemaess Bildquellen- und Quellenkritik-Standard (Pandel 2017)",
                "Kooperative Methoden: Standbild · Stationenlernen · Jigsaw · Pro-Contra-Debatte · Vergleichsmatrix",
                "Differenzierung in 4 Spuren (DaZ, LRS, leistungsschwach, leistungsstark) pro UE",
                "Tafelbild-Zentrierung: handschriftlich, 3-Zonen-Schema, Sicherung im Heft (nicht Mappe)"
              ],
              "kompetenzerwerb_progression": "AFB-Progression I→III: UE 1-3 vorrangig AFB I (Beschreiben Lebensverhaeltnisse). UE 4-5 AFB II (Begriff Soziale Frage definieren, Loesungsansaetze unterscheiden). UE 6+8 AFB III (Urteil Bismarck, Vergleich heute). UE 9 LNW mit allen drei AFB-Stufen. UE 10 Transfer/Handlungsorientierung (Realhandeln im Sinne Reinhardts).",
              "personifikation_durchgaengig": "Identifikationsfiguren Johann (landloser Knecht aus Hessen, 17, wandert 1875 nach Berlin) und Anna (Spinnerei-Arbeiterin, 19, Tochter eines Webers, lebt in Mietskaserne) — wiederkehrend in UE 2 (Wohnen Annas), UE 3 (Johanns Schicht), UE 5 (Anna tritt SPD bei), UE 6 (Johann profitiert von Bismarck), UE 8 (Anna heute = Working-Poor-Mutter).",
              "schwerpunktstunde_kandidat": "UE 6 · Bismarcks Sozialgesetzgebung — Erfolg oder Beruhigung? (AFB-III, Pro-Contra)"
            },
            "sequenz_tabelle": [
              {
                "uze": 1,
                "datum": "KW09 · Mo",
                "stundenthema_frage": "Was sehen wir auf Menzels 'Eisenwalzwerk' — und warum nennen wir das die Soziale FRAGE?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Bilder interpretieren, Fragen entwickeln)",
                "gegenstand": "Raeume · Werte",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "Vorwissen aktivieren + Forschungsfrage entwickeln",
                "kommentar": "Sequenz-Einstieg · personifikative Anbahnung Johann/Anna",
                "schwerpunkt": false
              },
              {
                "uze": 2,
                "datum": "KW09 · Mi",
                "stundenthema_frage": "Wie lebte Annas Familie in der Mietskaserne 1880?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Quellen erschliessen) · Fachsprache anwenden",
                "gegenstand": "Raeume · Werte · Kulturen",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "Lebens-/Wohnverhaeltnisse multiperspektivisch beschreiben",
                "kommentar": "Stationenlernen · 4 Niveaus · DaZ-Wortspeicher",
                "schwerpunkt": false
              },
              {
                "uze": 3,
                "datum": "KW10 · Mo",
                "stundenthema_frage": "Wie sah Johanns Arbeitstag in der Fabrik 1880 wirklich aus?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Quellenkritik) · Beurteilen (Reliabilitaet)",
                "gegenstand": "Ordnungssysteme · Werte",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "3 Belastungen mit Beleg + Quellenkritik Engels",
                "kommentar": "Engels-Auszug 3 Niveaus · sprachsensibel",
                "schwerpunkt": false
              },
              {
                "uze": 4,
                "datum": "KW10 · Mi",
                "stundenthema_frage": "Warum nennt man das 'die Soziale FRAGE' — und nicht einfach 'Armut'?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Begriff bilden) · Anwenden und handeln (Fachsprache)",
                "gegenstand": "Werte · Ordnungssysteme",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "Begriff 'Soziale Frage' praezise definieren",
                "kommentar": "Begriffsbildung · Lexikon-Eintrag · Aktualitaetsbezug",
                "schwerpunkt": false
              },
              {
                "uze": 5,
                "datum": "KW11 · Mo",
                "stundenthema_frage": "Wer wollte die Soziale Frage loesen — und wie?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Quellen) · Beurteilen (Reichweite)",
                "gegenstand": "Ordnungssysteme · Interessen",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "3 Loesungsansaetze (Selbsthilfe/Gewerkschaft/Staat) unterscheiden",
                "kommentar": "Jigsaw · Experten-/Stammgruppen · Anna tritt SPD bei",
                "schwerpunkt": false
              },
              {
                "uze": 6,
                "datum": "KW11 · Mi",
                "stundenthema_frage": "War Bismarcks Sozialgesetzgebung ein Erfolg fuer Johann — oder nur Beruhigung der Arbeiter?",
                "prozesskompetenz": "Beurteilen und bewerten (Werturteil) · Anwenden und handeln (Position vertreten)",
                "gegenstand": "Werte · Interessen",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "Bismarcks Gesetzgebung kritisch beurteilen (3-Stufen-Urteil)",
                "kommentar": "**SCHWERPUNKTSTUNDE-KANDIDAT** · Pro-Contra-Debatte · AFB III",
                "schwerpunkt": true
              },
              {
                "uze": 7,
                "datum": "KW12 · Mo",
                "stundenthema_frage": "Wie veraenderte sich unsere Stadt zwischen 1850 und 1900?",
                "prozesskompetenz": "Erkenntnisse gewinnen (Karten/Statistik vergleichen) · Beurteilen (Indikatoren)",
                "gegenstand": "Raeume · Ordnungssysteme",
                "perspektive": "historisch · geographisch",
                "stundenziel_kurz": "4 Veraenderungs-Indikatoren am Stadtbeispiel herausarbeiten",
                "kommentar": "Lokalgeschichte · Wuerzburg/Augsburg · 3 Karten-Niveaus",
                "schwerpunkt": false
              },
              {
                "uze": 8,
                "datum": "KW12 · Mi",
                "stundenthema_frage": "Ist die Soziale Frage heute geloest — oder nur eine andere?",
                "prozesskompetenz": "Beurteilen (Vergleich 1880/heute) · Anwenden (Position begruenden)",
                "gegenstand": "Werte · Interessen",
                "perspektive": "sozialwissenschaftlich · historisch",
                "stundenziel_kurz": "1880 vs. heute strukturell vergleichen + Werturteil",
                "kommentar": "Anna heute = Working-Poor-Mutter · Aktualisierungs-Auftrag LP+",
                "schwerpunkt": false
              },
              {
                "uze": 9,
                "datum": "KW13 · Mo",
                "stundenthema_frage": "Was kann ich jetzt — und was nicht?",
                "prozesskompetenz": "Erkenntnisse gewinnen · Beurteilen · Anwenden (alle drei AFB-Stufen)",
                "gegenstand": "Werte · Ordnungssysteme",
                "perspektive": "historisch · sozialwissenschaftlich",
                "stundenziel_kurz": "Lernzielkontrolle: AFB I + II + III dokumentieren",
                "kommentar": "Schriftlicher LNW · 2 Niveaus · Selbsteinschaetzung",
                "schwerpunkt": false
              },
              {
                "uze": 10,
                "datum": "KW13 · Mi",
                "stundenthema_frage": "Welche Soziale Frage von heute waehle ich — und welchen Schritt gehe ich?",
                "prozesskompetenz": "Anwenden und handeln (Handlungsorientierung) · Beurteilen (Realisierbarkeit)",
                "gegenstand": "Interessen · Werte",
                "perspektive": "sozialwissenschaftlich",
                "stundenziel_kurz": "Eigene Handlungsoption zur Sozialen Frage heute entwickeln",
                "kommentar": "Sequenz-Abschluss · Pinnwand · Handlungsorientierung Realhandeln",
                "schwerpunkt": false
              }
            ],
            "phasenSchema": [
              {
                "id": "problemstellung",
                "label": "1 Problemstellung",
                "kurz": "Vorwissen · Zielangabe · Arbeitsplanung"
              },
              {
                "id": "problementfaltung",
                "label": "2 Problementfaltung",
                "kurz": "Erarbeitung am Material"
              },
              {
                "id": "problemloesung",
                "label": "3 Problemloesung",
                "kurz": "Antwort auf die Problemfrage"
              },
              {
                "id": "wertung",
                "label": "4 Wertung",
                "kurz": "Rationales Urteil (Sache · Wert · Position)"
              },
              {
                "id": "sicherung_lzk",
                "label": "5 Sicherung + LZK",
                "kurz": "Hefteintrag · Lernzielkontrolle"
              }
            ],
            "ues_detail": [
              {
                "nr": 1,
                "titel": "Standbilder · Was ist die Soziale Frage?",
                "stundenthema_frage": "Was sehen wir auf Menzels 'Eisenwalzwerk' — und warum nennen wir das die Soziale FRAGE?",
                "minuten": 45,
                "lernziel": "SuS aktivieren Vorwissen zur Industrialisierung (LB2-Anknuepfung) und entwickeln eine Forschungsfrage zur sozialen Lage der Arbeiter:innen.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler aktivieren ihr Vorwissen zur Industrialisierung und entwickeln eine begruendete Forschungsfrage zur Sozialen Frage,",
                  "bedingung": "indem sie zu Adolph Menzels Bildquelle 'Eisenwalzwerk' (1875) ein stilles Schreib-Gespraech fuehren und in 4er-Gruppen Standbilder zu typischen Industrialisierungs-Szenen (Fabrik · Wohnung · Familie · Strasse) entwickeln,",
                  "maszstab": "was daran erkennbar wird, dass die Forschungsfrage 'Warum heisst das die SOZIALE FRAGE?' im Heft mit mindestens einer begruendeten Vermutung steht."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS beschreiben Eindruecke der Menzel-Bildquelle,",
                    "indem": "indem sie in einem stillen Schreib-Gespraech mindestens drei Aspekte (z.B. Feuer, gebeugte Haltung, Hitze) notieren,",
                    "erkennbar": "was daran erkennbar wird, dass mindestens fuenf Wortassoziationen an der Tafel sichtbar werden.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS stellen typische Industrialisierungs-Szenen szenisch dar,",
                    "indem": "indem sie in 4er-Gruppen ein Standbild zu Fabrik/Wohnung/Familie/Strasse bauen und fotografieren,",
                    "erkennbar": "was daran erkennbar wird, dass das Foto den Aspekt mit drei koerperlichen Details (Haltung · Position · Mimik) zeigt.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS leiten aus den Standbildern eine Forschungsfrage fuer die Sequenz ab,",
                    "indem": "indem sie im Plenum die Kernfrage 'Warum heisst das die SOZIALE FRAGE?' formulieren,",
                    "erkennbar": "was daran erkennbar wird, dass die Frage mit mindestens einer Vermutung als Hefteintrag steht.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS verknuepfen die Bildquelle quellenkritisch mit der historischen Lage,",
                    "indem": "indem sie pruefen, welche Wirkung Menzel bei welchen Adressaten 1875 anstreben wollte,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum mindestens zwei Wirkungsabsichten benennen.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "8' · Bildimpuls Adolph Menzel »Eisenwalzwerk« (1875) · stilles Schreib-Gespraech. Zielangabe: »Wir untersuchen, warum man von der SOZIALEN FRAGE spricht.« Arbeitsplanung: 4 Standbild-Gruppen mit Themen Fabrik · Wohnung · Familie · Strasse.",
                "problementfaltung": "22' · Gruppenarbeit in 4er-Teams: SuS bilden Standbilder zu »typischen Szenen« der Industrialisierung. Foto-Dokumentation je Gruppe.",
                "problemloesung": "8' · Galerie-Rundgang + Mind-Map Tafel: »Welche Belastungen sind sichtbar?« — Sammlung gemeinsamer Kern-Aspekte.",
                "wertung": "5' · Hypothese: »Warum heisst das die Soziale FRAGE — und nicht Soziale Lage?« — erste Deutungen.",
                "sicherung_lzk": "2' · Hefteintrag-Vorlage »Die Soziale Frage entsteht durch …« · Lernzielklaerung Sequenz.",
                "sozialform_phasen": {
                  "problemstellung": "Plenum (stilles Schreibgespraech) · UG",
                  "problementfaltung": "GA (4er-Gruppen)",
                  "problemloesung": "Plenum (Galerie)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Themenkarten mit Wortspeicher (Fabrik, Mietskaserne, Schicht); Standbild als sprachreduzierte Methode (Koerper statt Sprache).",
                  "lrs": "Themenkarten 18 pt · A4 · Tafelnotizen werden vorgelesen · Hefteintrag-Vorlage mit Lueckenstruktur.",
                  "leistungsschwach": "Reduktiv: vorgegebene Standbild-Themen; einfache Stichpunkte; Tandem-Partnerwahl moeglich.",
                  "leistungsstark": "Erweitert: eigenes Standbild-Thema + Bildanalyse Menzel (Wirkungsabsicht des Malers) als AFB-III-Zusatzaufgabe."
                },
                "personifikation_anteil": "Anbahnung Johann + Anna (noch ohne Namensnennung) — als 'die Menschen auf dem Bild'.",
                "tafelbild_skizze": "3-Zonen: links Menzel-Druck (A2) · Mitte Mindmap 'Belastungen' (handschriftlich, 4 Aeste) · rechts Forschungsfrage + Hefteintrag-Vorlage.",
                "hausaufgabe": "—",
                "material": "Menzel-Druck (A2) · 4 Themenkarten · Smartphone-Kameras · Hefteintrag-Vorlage A5",
                "lp_bezug": "KE 1 Anbahnung (Lebensverhaeltnisse) · KE 2 Anbahnung (Uebergang Agrar→Industrie)",
                "prinzipien_b3": [
                  "Schuelerorientierung",
                  "Problemorientierung",
                  "Erfahrungsbezug",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Raeume · Werte",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Beobachten · Fragen entwickeln)"
                },
                "didaktik": "Lebensweltbezug (Klafki) · Bildquellenarbeit (Pandel 2017) · Performatives Lernen (Standbild als sozialwissenschaftliche Methode, Massing/Reinhardt)"
              },
              {
                "nr": 2,
                "titel": "Lebensverhaeltnisse der Arbeiter:innen-Familie",
                "stundenthema_frage": "Wie lebte Annas Familie in der Mietskaserne 1880?",
                "minuten": 45,
                "lernziel": "SuS beschreiben die Lebens- und Wohnverhaeltnisse der Industriearbeiter:innen-Familien (KE 1) anhand multiperspektivischer Quellen.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler beschreiben die Lebens- und Wohnverhaeltnisse einer Industriearbeiter:innen-Familie (Anna) anhand multiperspektivischer Quellen,",
                  "bedingung": "indem sie in einem 4-Stationen-Rundlauf je eine Quelle zu Wohnen, Ernaehrung, Kindheit und Tagesablauf erschliessen und im AB sichern,",
                  "maszstab": "was daran erkennbar wird, dass jede:r SuS im Hefteintrag vier Belastungs-Achsen mit je einem Quellenbeleg notiert."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS erschliessen je eine Quelle zu Wohnen/Ernaehrung/Kindheit/Tagesablauf,",
                    "indem": "indem sie an einer Station die Quelle gemeinsam lesen und die Leitfragen am AB beantworten,",
                    "erkennbar": "was daran erkennbar wird, dass das AB pro Station drei Stichpunkte zur Belastung enthaelt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS stellen ihre Stationsergebnisse in der Galerie vor,",
                    "indem": "indem sie pro Station in einem Plakat die zentrale Aussage in einem Satz formulieren,",
                    "erkennbar": "was daran erkennbar wird, dass alle vier Plakate eine vergleichbare Aussagestruktur (Belastung + Beleg) tragen.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS uebertragen die vier Belastungs-Achsen in einen strukturierten Hefteintrag,",
                    "indem": "indem sie eine Vier-Felder-Tafel uebertragen und je Feld einen Beleg notieren,",
                    "erkennbar": "was daran erkennbar wird, dass der Hefteintrag vier Felder mit je einem Beleg umfasst.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS gewichten die Belastungen begruendet,",
                    "indem": "indem sie eine Rangfolge der vier Achsen bilden und je begruendet,",
                    "erkennbar": "was daran erkennbar wird, dass sie die Top-Belastung mit zwei Argumenten im Plenum verteidigen.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "6' · Foto »Mietskaserne Berlin 1900« — Sehimpuls + Vermutungen. Zielangabe: »Wie sah Annas Alltag aus?« Arbeitsplanung: 4 Stationen mit Rotation.",
                "problementfaltung": "22' · Stationenlernen: (1) Wohnsituation (Schlafgaenger) · (2) Ernaehrung (Kartoffel-Statistik) · (3) Kindheit (Kinderarbeit-Bilder Zeche) · (4) Tagesablauf (12-Stunden-Schichtprotokoll). Notizen im AB.",
                "problemloesung": "10' · Plakat-Galerie: jede Gruppe stellt 1 Station vor + zentrale Aussage in 1 Satz. Tafel-Synthese: 4 Belastungs-Dimensionen.",
                "wertung": "4' · »Welche Belastung war fuer euch am ueberraschendsten — und warum?« Multiperspektivischer Austausch.",
                "sicherung_lzk": "3' · Hefteintrag-Skizze »4 Achsen der Belastung« · LZK-Karte »Nenne 3 Belastungen mit Beleg«.",
                "sozialform_phasen": {
                  "problemstellung": "Plenum · UG",
                  "problementfaltung": "GA (Stationen-Rotation in 4er-Teams)",
                  "problemloesung": "Plenum (Galerie)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Wortspeicher pro Station (Mietskaserne, Schlafgaenger, Kohlenstaub, Schicht) · Bildimpuls vor Text · Lese-Tandem.",
                  "lrs": "Quellen-Texte in 3 Niveaus (basic = 100W, mittel = 200W, anspruch = Original) · Schriftgroesse 14pt+.",
                  "leistungsschwach": "Vorgegebene AB-Stichpunkte zum Ankreuzen statt Schreiben · Reduzierte Stationen-Auswahl (3 statt 4).",
                  "leistungsstark": "Quellenkritik-Zusatz: 'Welche Aussage fehlt? Was wuerde Anna selbst sagen?' (AFB III)."
                },
                "personifikation_anteil": "Anna wird namentlich eingefuehrt — die 4 Stationen rekonstruieren ihren Alltag (Wohnen mit Eltern + 4 Geschwistern, Schichtarbeit Spinnerei).",
                "tafelbild_skizze": "Vier-Felder-Tafel: Wohnen | Ernaehrung | Kindheit | Tagesablauf. Pro Feld nach Galerie 1 Belastungs-Stichwort + Beleg.",
                "hausaufgabe": "—",
                "material": "4 Stationen-Mappen (mit AB + Bildquellen + Original-Texten) · Plakat-Pappen · Stifte · LZK-Karten · Wortspeicher",
                "lp_bezug": "KE 1 Lebens-/Arbeitsverhaeltnisse Arbeiterinnen+Arbeiter",
                "prinzipien_b3": [
                  "Multiperspektivitaet",
                  "Erfahrungsbezug",
                  "Schuelerorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Raeume · Werte · Kulturen",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Quellen erschliessen) · Beurteilen (gewichten)"
                },
                "didaktik": "Multiperspektivitaet (Bergmann 2000) · Quellenarbeit (Pandel 2017) · Stationenlernen (Reinhardt 2005) · sprachsensibler GPG-Unterricht"
              },
              {
                "nr": 3,
                "titel": "Arbeitsbedingungen in der Fabrik · Engels-Quelle",
                "stundenthema_frage": "Wie sah Johanns Arbeitstag in der Fabrik 1880 wirklich aus?",
                "minuten": 45,
                "lernziel": "SuS analysieren konkrete Arbeitsbedingungen in einer Fabrik des spaeten 19. Jh. und benennen drei zentrale Belastungen.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler analysieren konkrete Arbeitsbedingungen in einer Fabrik des spaeten 19. Jh. und benennen drei zentrale Belastungen,",
                  "bedingung": "indem sie einen gekuerzten Auszug aus Friedrich Engels' 'Lage der arbeitenden Klasse' (1845) markieren und tabellarisch sichern,",
                  "maszstab": "was daran erkennbar wird, dass im Heft eine Tabelle mit drei Belastungen + je einem Beleg + einer Quellenkritik-Notiz steht."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS extrahieren Belastungs-Aspekte aus dem Engels-Auszug,",
                    "indem": "indem sie die Kategorien Arbeitszeit/Lohn/Unfaelle/Kinderarbeit farbig markieren,",
                    "erkennbar": "was daran erkennbar wird, dass je Kategorie mindestens ein Textbeleg markiert ist.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS vergleichen 1880 mit der Gegenwart in einer Tabelle,",
                    "indem": "indem sie heutige Arbeitszeit (35-40h) der Schichtdauer 1880 (12-16h) gegenueberstellen,",
                    "erkennbar": "was daran erkennbar wird, dass eine zweispaltige Tabelle im Heft drei Kategorien vergleicht.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS reflektieren Engels' Standpunkt quellenkritisch,",
                    "indem": "indem sie im UG diskutieren: 'Engels ist Sozialist — wie veraendert das die Quellenaussage?',",
                    "erkennbar": "was daran erkennbar wird, dass im Heft ein Satz zur Quellenkritik steht.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS formulieren eine moderne Engels-Kritik,",
                    "indem": "indem sie ueberlegen, was Engels heute (Working-Poor, Plattform-Arbeit) kritisieren wuerde,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum ein begruendetes Beispiel nennen.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "5' · Audio-Atmosphaere Fabrik 1900 — Wirkung notieren. Zielangabe: »Wir untersuchen, wie der Arbeitsalltag wirklich aussah.« Arbeitsplanung: Quellenarbeit + Vergleich.",
                "problementfaltung": "22' · Quellenarbeit Friedrich Engels »Lage der arbeitenden Klasse« (1845) — gekuerzter Textauszug. Markieren: Arbeitszeit · Lohn · Unfaelle · Kinderarbeit.",
                "problemloesung": "10' · Tabellen-Vergleich Plenum: heutige Arbeitszeit (35-40h) vs. 1880 (12-16h pro Tag). 3 Belastungen mit Beleg im Heft.",
                "wertung": "5' · Quellenkritisch: »Engels ist Sozialist — wie veraendert das die Quellenaussage?« Reliabilitaets-Reflexion.",
                "sicherung_lzk": "3' · Hefteintrag »3 Belastungen + 1 Quellenkritik-Satz« · LZK-Frage: »Was wuerde Engels heute kritisieren?«",
                "sozialform_phasen": {
                  "problemstellung": "Plenum (Audio + UG)",
                  "problementfaltung": "EA · PA (Tandem-Markierung)",
                  "problemloesung": "Plenum (Tafeltabelle)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Engels-Text mit Wortspeicher (Schicht, Lohn, Unfall, Sozialist) · Bilder zum Text · Audio mehrfach.",
                  "lrs": "Engels-Text in 3 Niveaus (gekuerzt 80W · mittel 180W · Original 400W) · Schriftgroesse 14pt+ · Farbleitsystem.",
                  "leistungsschwach": "Markier-Aufgabe vorstrukturiert (Farben + Kategorien vorgegeben) · Tandem-Partner.",
                  "leistungsstark": "Original-Auszug + Quellenkritik-Sheet (Wer? Wann? Adressat? Absicht?) als AFB-III-Zusatz."
                },
                "personifikation_anteil": "Johann arbeitet 14 h Schicht in der Berliner Maschinenfabrik · Engels-Auszug wird als 'was Johann erlebt' kontextualisiert.",
                "tafelbild_skizze": "Zweispaltige Tabelle: 1880 (Engels) | heute (Daten). 3 Zeilen Arbeitszeit · Lohn · Unfaelle. Rechts: Quellenkritik-Frage.",
                "hausaufgabe": "Lesen: 'Was hat Johann gegen die Belastung getan?' (Vorbereitung UE 5)",
                "material": "Engels-Auszug (gekuerzt + bebildert) · AB Tabelle · Audio Fabrikatmosphaere · Hefteintrag-Schablone · Wortspeicher",
                "lp_bezug": "KE 1 Arbeitsverhaeltnisse",
                "prinzipien_b3": [
                  "Multiperspektivitaet",
                  "Problemorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Ordnungssysteme · Werte",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Quellenkritik) · Beurteilen (Reliabilitaet)"
                },
                "didaktik": "Quellenkritik (Pandel 2017) · Vergleichsmethode · historische Empathie (Ruesen 2002)"
              },
              {
                "nr": 4,
                "titel": "Die Soziale Frage als Begriff",
                "stundenthema_frage": "Warum nennt man das 'die Soziale FRAGE' — und nicht einfach 'Armut'?",
                "minuten": 45,
                "lernziel": "SuS definieren den Begriff »Soziale Frage« sachlich praezise und ordnen ihn in den historischen Kontext ein.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler definieren den Begriff 'Soziale Frage' sachlich praezise und ordnen ihn in den historischen Kontext ein,",
                  "bedingung": "indem sie nach kurzem L-Input einen eigenen Lexikon-Eintrag in Partnerarbeit verfassen und im Plenum auf eine gemeinsame Tafel-Definition synthetisieren,",
                  "maszstab": "was daran erkennbar wird, dass die Heft-Definition mindestens drei Kernbegriffe (Pauperismus · Industrialisierung · fehlende Sozialgesetzgebung) traegt."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS aktivieren das Begriffsfeld 'FRAGE im Politik-Kontext',",
                    "indem": "indem sie aktuelle Beispiele (Klimafrage, Wohnungsfrage) sammeln,",
                    "erkennbar": "was daran erkennbar wird, dass die Tafel mindestens drei aktuelle 'Fragen' enthaelt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS schreiben einen eigenen Lexikon-Eintrag 'Soziale Frage',",
                    "indem": "indem sie in Partnerarbeit den L-Input + Wortspeicher in einen 3-4-Saetze-Eintrag uebersetzen,",
                    "erkennbar": "was daran erkennbar wird, dass der Eintrag drei Kernbegriffe (Pauperismus, Industrialisierung, fehlende Sozialgesetzgebung) enthaelt.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS synthetisieren eine gemeinsame Tafel-Definition,",
                    "indem": "indem sie drei Best-Versionen vorlesen und Kernbegriffe konsensual sammeln,",
                    "erkennbar": "was daran erkennbar wird, dass die Tafel-Definition als Hefteintrag uebernommen wird.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS uebertragen den Begriff auf eine Gegenwartsfrage,",
                    "indem": "indem sie eine aktuelle 'Frage' (z.B. Wohnungsfrage) mit denselben drei Komponenten beschreiben,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum ihre Uebertragung begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "6' · Begriffsaktivierung: »Was sind FRAGEN im Politik-Kontext heute?« (Klimafrage · Wohnungsfrage). Zielangabe: »Wir bauen eine eigene Definition.« Arbeitsplanung: Input + Partner-Schreibarbeit.",
                "problementfaltung": "22' · Lehrkraft-Input (10'): Pauperismus · Industrialisierung · fehlende Sozialgesetzgebung. Partner-Arbeit (12'): »Lexikon-Eintrag« in eigenen Worten.",
                "problemloesung": "8' · Lexikon-Eintraege gegenseitig pruefen → 3 Best-Versionen vorlesen → gemeinsame Tafel-Definition.",
                "wertung": "5' · »Welche FRAGE unserer Gegenwart waere vergleichbar — und warum genau diese?« Aktualitaetsbezug.",
                "sicherung_lzk": "4' · Definition ins Heft + LZK-Mini: »Erklaere Soziale Frage in 2 Saetzen einem Mitschueler.«",
                "sozialform_phasen": {
                  "problemstellung": "UG (Tafelsammlung)",
                  "problementfaltung": "Plenum (L-Input) · PA (Lexikon-Eintrag)",
                  "problemloesung": "Plenum (Vorlesen + Konsens)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA · PA (LZK-Mini)"
                },
                "differenzierung_block": {
                  "daz": "Wortspeicher mit Definitionen (Pauperismus, Sozialgesetzgebung) · Lueckentext-Variante als Schreib-Geruest.",
                  "lrs": "Lexikon-Eintrag mit Satzanfaengen vorgegeben · Schriftgroesse 14pt+ · Wortkarten zum Anordnen.",
                  "leistungsschwach": "Schreibgeruest: 'Die Soziale Frage entstand durch ___ in der Zeit von ___. Die Menschen litten unter ___, weil ___.'",
                  "leistungsstark": "AFB-III-Aufgabe: 'Formuliere die Wohnungsfrage 2026 als drei-komponentige Frage analog zur Sozialen Frage'."
                },
                "personifikation_anteil": "Johann und Anna stehen exemplarisch fuer 'die Menschen, ueber die die Frage gestellt wird'.",
                "tafelbild_skizze": "Drei-Spalten-Tafel: links 'FRAGEN heute' (Klima/Wohnen/...) · Mitte L-Input-Struktur (3 Kernbegriffe) · rechts gemeinsame Definition.",
                "hausaufgabe": "Bringe ein Zeitungsfoto/Schlagzeile zu einer aktuellen 'Frage' mit (Vorbereitung UE 8).",
                "material": "Tafel-Vorlage Definition · Hefteintrag-Schablone · Wortspeicher · Schreib-Geruest-Karten",
                "lp_bezug": "KE 1 Konzept Soziale Frage",
                "prinzipien_b3": [
                  "Problemorientierung",
                  "Aktualitaet",
                  "Schuelerorientierung"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Werte · Ordnungssysteme",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Begriffsbildung) · Anwenden (Fachsprache)"
                },
                "didaktik": "Begriffsbildung · Muendigkeit-Anbahnung (Detjen 2007) durch eigenstaendige Begriffsdefinition · Aktualitaetsprinzip (Klafki 1996)"
              },
              {
                "nr": 5,
                "titel": "Loesungsansaetze · Genossenschaften · Gewerkschaften · Staat",
                "stundenthema_frage": "Wer wollte die Soziale Frage loesen — und wie?",
                "minuten": 45,
                "lernziel": "SuS unterscheiden drei historische Loesungsansaetze zur Sozialen Frage (Selbsthilfe · Gewerkschaft · Sozialstaat) und ordnen ihnen Akteure zu.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler unterscheiden drei historische Loesungsansaetze zur Sozialen Frage (Selbsthilfe · Gewerkschaft · Sozialstaat) und ordnen ihnen Akteure zu,",
                  "bedingung": "indem sie in einem Gruppenpuzzle (Jigsaw) je einen Ansatz erschliessen und im Stamm-Team weitergeben,",
                  "maszstab": "was daran erkennbar wird, dass im Heft eine Tabelle mit drei Akteur-Strategie-Reichweite-Eintraegen steht."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS erschliessen einen der drei Loesungsansaetze in der Expertengruppe,",
                    "indem": "indem sie den Expertentext gemeinsam lesen und drei Kern-Aussagen sammeln,",
                    "erkennbar": "was daran erkennbar wird, dass die Expertenkarte drei Kernaussagen + den Akteur traegt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS vermitteln den eigenen Ansatz in der Stammgruppe,",
                    "indem": "indem sie ihre Expertenkarte mit drei eigenen Saetzen praesentieren und Rueckfragen beantworten,",
                    "erkennbar": "was daran erkennbar wird, dass die uebrigen Stammgruppen-Mitglieder die Inhalte ins Heft uebertragen.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS strukturieren die drei Ansaetze in einer Akteur-Strategie-Tabelle,",
                    "indem": "indem sie gemeinsam die Tabelle (Akteur · Strategie · Reichweite) im Heft befuellen,",
                    "erkennbar": "was daran erkennbar wird, dass alle drei Zeilen mit konkreten Beispielen besetzt sind.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS bewerten die Reichweite der Ansaetze,",
                    "indem": "indem sie pruefen, welcher Ansatz fuer Anna (Spinnerei-Arbeiterin) am wirksamsten gewesen waere,",
                    "erkennbar": "was daran erkennbar wird, dass sie ihre Wahl im Plenum mit zwei Argumenten begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "5' · Aktivierende Frage: »Wenn ihr Industriearbeiter 1880 waert — was wuerdet ihr tun?« Brainstorming. Zielangabe: »3 historische Antworten kennenlernen.« Jigsaw-Plan.",
                "problementfaltung": "25' · Jigsaw: Gruppe A Genossenschaften (Schulze-Delitzsch/Raiffeisen) · Gruppe B Gewerkschaft+SPD (Bebel/Lassalle) · Gruppe C Bismarcks Sozialgesetzgebung (1883-89). Experten- → Stammgruppen.",
                "problemloesung": "8' · Tabelle gemeinsam fuellen: Akteur · Strategie · Reichweite. 3 Antworten klar umrissen.",
                "wertung": "5' · »Welche Strategie waere fuer Anna am wirksamsten gewesen — nach welchem Massstab?« Sache vs. Werte unterscheiden.",
                "sicherung_lzk": "2' · Tabelle ins Heft uebernehmen · LZK-Mini: »Ordne 3 Akteure 3 Strategien zu.«",
                "sozialform_phasen": {
                  "problemstellung": "UG (Brainstorming an der Tafel)",
                  "problementfaltung": "GA (Expertengruppen) → GA (Stammgruppen)",
                  "problemloesung": "Plenum (Tafeltabelle)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Expertentexte mit Wortspeicher (Genossenschaft, Gewerkschaft, Sozialgesetz) · Symbole je Akteur · Lese-Tandem in Expertenphase.",
                  "lrs": "Texte in 3 Niveaus (90W · 180W · 350W) · Schriftgroesse 14pt+ · Expertenkarte mit Schreib-Geruest.",
                  "leistungsschwach": "Expertenkarte mit Lueckenstruktur (Akteur: ___; Strategie: ___; Beispiel: ___).",
                  "leistungsstark": "AFB-III-Zusatz: 'Welcher Ansatz ist auch heute noch wirksam — Gewerkschaft? Genossenschaft? Sozialstaat?' (Brueckenfrage zu UE 8)."
                },
                "personifikation_anteil": "Anna tritt der Gewerkschaft bei (fiktiv) · Johann profitiert spaeter von Bismarcks Unfallversicherung — Brueckenstellen werden in den Expertengruppen gesetzt.",
                "tafelbild_skizze": "Drei-Spalten-Tafel: A Genossenschaft | B Gewerkschaft/SPD | C Bismarck-Staat. Pro Spalte: Akteur · Strategie · Reichweite. Mitte: Anna/Johann-Symbol fuer 'wer profitiert?'",
                "hausaufgabe": "—",
                "material": "3 Expertentexte (à 1 Seite, 3 Niveaus) · Tabelle-Schablone · Hefteintrag-Vorlage · Symbol-Karten (Gewerkschaft/Genossenschaft/Bismarck)",
                "lp_bezug": "KE 1 Loesungsansaetze Soziale Frage",
                "prinzipien_b3": [
                  "Multiperspektivitaet",
                  "Handlungsorientierung",
                  "Problemorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Ordnungssysteme · Interessen",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Quellen) · Beurteilen (Reichweite)"
                },
                "didaktik": "Jigsaw-Methode · Multiperspektivitaet · Politische Urteilsbildung (GPJE 2004) · Handlungsorientierung Simulationshandeln (Reinhardt 2005)"
              },
              {
                "nr": 6,
                "titel": "Bismarcks Sozialgesetzgebung — Erfolg oder Beruhigung? · SCHWERPUNKTSTUNDE-KANDIDAT",
                "stundenthema_frage": "War Bismarcks Sozialgesetzgebung ein Erfolg fuer Johann — oder nur Beruhigung der Arbeiter?",
                "minuten": 45,
                "lernziel": "SuS beurteilen Bismarcks Sozialgesetzgebung kritisch und entwickeln ein Sach-/Werturteil.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler beurteilen Bismarcks Sozialgesetzgebung kritisch und entwickeln ein begruendetes 3-Stufen-Urteil (Sache · Wert · Position),",
                  "bedingung": "indem sie in einer rollenfest verteilten Pro-Contra-Debatte auf Materialgrundlage (Bismarcks Reden + SPD-Reaktionen) argumentieren und das Urteil im Heft mit dem 3-Stufen-Raster sichern,",
                  "maszstab": "was daran erkennbar wird, dass im Heft alle drei Stufen mit je einem Argument + einer eigenen Position stehen und im Plenum mindestens zwei Mitschueler:innen-Argumente reflektiert werden."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS erschliessen Bismarcks Sozialgesetze (1883-89) in der Material-Phase,",
                    "indem": "indem sie in der Pro- oder Contra-Gruppe Material lesen und Argumente sammeln,",
                    "erkennbar": "was daran erkennbar wird, dass die Argumentationskarte mindestens drei Argumente mit Beleg traegt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS fuehren eine moderierte Pro-Contra-Debatte,",
                    "indem": "indem sie ihre Rollenposition rollenfest vertreten und auf Gegenargumente reagieren,",
                    "erkennbar": "was daran erkennbar wird, dass jede Rolle mindestens zwei Argumente vorbringt und auf eines reagiert.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS sichern ein 3-Stufen-Urteil im Heft,",
                    "indem": "indem sie auf dem Urteils-Raster Sachebene (was geschah?) · Werte-Ebene (Massstab) · eigene Position notieren,",
                    "erkennbar": "was daran erkennbar wird, dass alle drei Stufen schriftlich besetzt sind.",
                    "afb": "III",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS reflektieren metakognitiv ihren Urteilsprozess,",
                    "indem": "indem sie benennen, welches Mitschueler-Argument sie umgestimmt hat und warum,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum einen Perspektiven-Wechsel begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "5' · Provokationsthese: »Bismarck war ein Sozialist.« Spontan zustimmen/ablehnen — Verortung an der Tafel. Zielangabe: »Wir pruefen die These mit Quellen.« Pro/Contra-Plan.",
                "problementfaltung": "22' · Pro-Contra-Vorbereitung in 2 Gruppen mit Materialgrundlage (Bismarcks Reden + Auszuege SPD-Reaktionen). 15' Vorbereitung, 7' Debatte mit fest verteilten Rollen.",
                "problemloesung": "5' · Beobachter:innen-Bilanz: staerkstes Pro- und staerkstes Contra-Argument festhalten.",
                "wertung": "10' · 3-Stufen-Urteil im Heft: Sachebene (was geschah?) · Werte-Ebene (Massstab Gerechtigkeit/Stabilitaet?) · eigene Position (begruendet).",
                "sicherung_lzk": "3' · Metakognitiv: »Welches Argument hat mich ueberzeugt — und warum?« · LZK-Karte mit AFB-III-Urteilsfrage.",
                "sozialform_phasen": {
                  "problemstellung": "UG (Tafel-Verortung)",
                  "problementfaltung": "GA (Pro/Contra-Vorbereitung) · Plenum (Debatte)",
                  "problemloesung": "UG (Beobachter-Bilanz)",
                  "wertung": "EA (3-Stufen-Urteil schreiben)",
                  "sicherung_lzk": "Plenum · EA"
                },
                "differenzierung_block": {
                  "daz": "Rollenkarten mit Schluesselbegriffen (Unfallversicherung, Sozialdemokrat, Solidaritaet) · Argumente in Stichpunkten vorgegeben · Visualisierungs-Hilfen.",
                  "lrs": "Argumentationskarte mit Schreib-Geruest · Material-Texte 14pt+ · Audio-Mitschnitt der Debatte zur Nachbereitung.",
                  "leistungsschwach": "Rollenkarten mit 3 vorgegebenen Argumenten · 3-Stufen-Urteil mit Satzanfaengen ('Sachlich gilt: ___. Aus Sicht ___ bedeutet das: ___. Ich finde: ___.')",
                  "leistungsstark": "Frei-Argumentation ohne Rollenkarte · Zusatz: 'Bewerte das Urteil aus Sicht Annas vs. Johanns' (Perspektivenwechsel · AFB III)."
                },
                "personifikation_anteil": "Johann profitiert von der Unfallversicherung 1884 (positiv) · Anna sieht die Gesetze als Beruhigungs-Geschenk an die Bourgeoisie (kritisch) — beide Perspektiven in den Material-Mappen.",
                "tafelbild_skizze": "Drei-Felder-Tafel: links 'Bismarck war Sozialist' These mit Verortung · Mitte Pro/Contra-Argumente in 2 Spalten · rechts 3-Stufen-Urteilsraster (Sache · Wert · Position).",
                "hausaufgabe": "Heft: 3-Stufen-Urteil ueberarbeiten + 1 Satz Selbstkritik (Welches Argument war mein staerkstes? Welches schwaechstes?).",
                "material": "Material-Mappen (Pro + Contra · Reden Bismarck 1881 · Bebel-Kritik) · Urteilsraster (Sach/Wert/Position) · Beobachter-Karten · Audio-Aufnahmegeraet (optional)",
                "lp_bezug": "KE 1 Loesungsansaetze + Urteilsbildung",
                "prinzipien_b3": [
                  "Kontroversitaetsgebot",
                  "Ueberwaeltigungsverbot",
                  "Handlungsorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Werte · Interessen",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Beurteilen · Reflektieren · Handeln (Position vertreten)"
                },
                "didaktik": "Pro-Contra-Debatte (Massing) · Politische Urteilsbildung 3-Stufen (GPJE 2004) · Beutelsbacher Konsens (Kontroversitaetsgebot, Ueberwaeltigungsverbot) · Muendigkeit (Detjen 2007)"
              },
              {
                "nr": 7,
                "titel": "Uebergang Agrar→Industriegesellschaft am Beispiel einer Stadt",
                "stundenthema_frage": "Wie veraenderte sich unsere Stadt zwischen 1850 und 1900?",
                "minuten": 45,
                "lernziel": "SuS beschreiben den Uebergang am Beispiel einer Stadt (z.B. Wuerzburg, Augsburg) und identifizieren Veraenderungs-Indikatoren (KE 2).",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler beschreiben den Uebergang von der Agrar- zur Industriegesellschaft am Beispiel einer Stadt und identifizieren vier Veraenderungs-Indikatoren,",
                  "bedingung": "indem sie Stadtplaene 1850 und 1900, eine Bevoelkerungs-Statistik und ein Berufs-Diagramm vergleichen und Indikatoren herausarbeiten,",
                  "maszstab": "was daran erkennbar wird, dass im Heft vier Veraenderungs-Achsen (Wachstum · Wirtschaft · Wohnen · Verkehr) mit je einem Quellenbeleg notiert sind."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS lesen Stadtplaene 1850 und 1900 vergleichend,",
                    "indem": "indem sie in Partnerarbeit drei Unterschiede markieren und benennen,",
                    "erkennbar": "was daran erkennbar wird, dass im AB drei Karten-Vergleiche notiert sind.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS leiten Indikatoren aus Statistik + Diagramm ab,",
                    "indem": "indem sie Bevoelkerungs- und Berufszahlen 1850/1880/1900 vergleichen,",
                    "erkennbar": "was daran erkennbar wird, dass vier Indikator-Stichworte mit Datum-Bezug im Heft stehen.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS strukturieren die Indikatoren in vier Veraenderungs-Achsen,",
                    "indem": "indem sie die Tafelvorlage (Wachstum · Wirtschaft · Wohnen · Verkehr) in Plenum befuellen,",
                    "erkennbar": "was daran erkennbar wird, dass jede Achse einen Quellenbeleg traegt.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS uebertragen die Indikatoren auf eine Gegenwartsveraenderung,",
                    "indem": "indem sie ueberlegen, welche Achse heute (Migration, Digitalisierung, Energiewende) aehnlich wirkt,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum eine Analogie begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "6' · Lokaler Bezug: »Wie war Wuerzburg/eure Stadt 1880?« Vermutungen sammeln. Zielangabe: »Wir messen den Wandel an Indikatoren.« Arbeitsplanung: 3 Quellen analysieren.",
                "problementfaltung": "22' · Quellenarbeit: Stadtplan 1850 vs. 1900 · Bevoelkerungs-Statistik 1850/1880/1900 · Beruf-Verteilung-Diagramm. Indikatoren herausarbeiten.",
                "problemloesung": "10' · Tafelbild: 4 Veraenderungs-Achsen (Wachstum · Wirtschaft · Wohnen · Verkehr) mit Quellenbeleg.",
                "wertung": "4' · »Welche Veraenderung ist heute aehnlich — Migration? Energiewende? Digitalisierung?« Aktualisierungsfrage.",
                "sicherung_lzk": "3' · Hefteintrag »4 Achsen mit je 1 Quellenbeleg« · LZK-Karte »Nenne 2 Indikatoren mit Beleg«.",
                "sozialform_phasen": {
                  "problemstellung": "UG (Vermutungen sammeln)",
                  "problementfaltung": "PA (Kartenvergleich) · EA (Statistik/Diagramm)",
                  "problemloesung": "Plenum (Tafelbild)",
                  "wertung": "UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Karten mit Legenden in einfacher Sprache · Wortspeicher (Verstaedterung, Industrie, Bevoelkerungswachstum) · Lese-Tandem fuer Statistiken.",
                  "lrs": "AB-Niveau 1: Markieren in der Karte · Schriftgroesse 14pt+ · Statistik-Zahlen visualisiert (Balkenfarben).",
                  "leistungsschwach": "AB-Niveau 1: Markieren statt Schreiben · Tabellen-Schablone mit Lueckenstruktur.",
                  "leistungsstark": "AB-Niveau 3 (Argumentieren): 'Welche Achse hat den staerksten Wandel verursacht — und warum?' (AFB III)."
                },
                "personifikation_anteil": "Johann zieht 1875 aus Hessen nach Berlin (Verstaedterung) · Anna lebt seit Geburt in der Mietskaserne — beide werden als 'Indikator-Personen' in den Quellen benannt.",
                "tafelbild_skizze": "Vier-Quadranten-Tafel: Wachstum | Wirtschaft | Wohnen | Verkehr. Pro Quadrant: 1 Datum/Zahl + 1 Beleg. Mitte: Stadt-Logo + Karte 1850/1900-Mini.",
                "hausaufgabe": "Mitbringen: 1 Foto aus eurer Stadt 1900 + 1 Foto heute (Vorbereitung UE 10).",
                "material": "Lokale Stadtkarte 1850 + 1900 (digital wenn moeglich) · Statistik-AB · Indikatoren-Raster · Hefteintrag-Vorlage · Wortspeicher",
                "lp_bezug": "KE 2 Uebergang Agrar→Industriegesellschaft",
                "prinzipien_b3": [
                  "Erfahrungsbezug",
                  "Aktualitaet",
                  "Schuelerorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Raeume · Ordnungssysteme",
                  "perspektive": "historisch · geographisch",
                  "prozesskompetenz": "Erkenntnisse gewinnen (Karten/Statistik) · Beurteilen (Indikatoren)"
                },
                "didaktik": "Lokalgeschichte (LP+ GPG-Fachprofil) · Quellenkritik (Pandel 2017) · Aktualitaetsprinzip · Kompetenzstrukturmodell Gegenstandsbereich »Raeume« + »Zeit«"
              },
              {
                "nr": 8,
                "titel": "Vergleich Soziale Frage 1880 vs. heute",
                "stundenthema_frage": "Ist die Soziale Frage heute geloest — oder nur eine andere?",
                "minuten": 45,
                "lernziel": "SuS vergleichen die Soziale Frage des 19. Jh. mit aktuellen sozialen Spannungen (z.B. Wohnungsmangel, Niedriglohn) und entwickeln ein begruendetes Sachurteil.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler vergleichen die Soziale Frage des 19. Jh. mit aktuellen sozialen Spannungen und entwickeln ein begruendetes Sach-/Werturteil,",
                  "bedingung": "indem sie in 4er-Gruppen eine Vergleichsmatrix (Spalten 1880/heute · Zeilen Wohnen/Lohn/Arbeitszeit/Sozialschutz) befuellen und im Plenum auswerten,",
                  "maszstab": "was daran erkennbar wird, dass jede Gruppe je Zeile mindestens einen Beleg fuer 1880 und einen fuer heute notiert und im Plenum eine Werturteils-Position begruendet."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS sammeln aktuelle Beleg-Beispiele zu sozialen Spannungen,",
                    "indem": "indem sie mitgebrachte Zeitungsfotos/Schlagzeilen (aus HA UE 4) auf die Vergleichsmatrix uebertragen,",
                    "erkennbar": "was daran erkennbar wird, dass jede Zeile der heutigen Spalte einen Beleg traegt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS fuellen die Vergleichsmatrix systematisch,",
                    "indem": "indem sie in 4er-Gruppen 1880 und heute fuer alle vier Zeilen vergleichen,",
                    "erkennbar": "was daran erkennbar wird, dass alle 8 Matrix-Felder besetzt sind.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS identifizieren strukturelle Gemeinsamkeiten und Unterschiede,",
                    "indem": "indem sie im Plenum drei Gemeinsamkeiten und drei Unterschiede zusammentragen,",
                    "erkennbar": "was daran erkennbar wird, dass die Tafel beide Spalten mit drei Eintraegen fuellt.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS entwickeln ein 2-Stufen-Werturteil,",
                    "indem": "indem sie auf Sach- und Werte-Ebene begruenden, ob die Soziale Frage 'geloest' ist,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Heft beide Stufen schriftlich begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "5' · Foto-Impuls aktuell: Tafel-Schlange · Working-Poor-Statistik. Zielangabe: »Vergleichen 1880 vs. heute.« Arbeitsplanung: Vergleichsmatrix in 4er-Gruppen.",
                "problementfaltung": "22' · Vergleichsmatrix: Spalten 1880/heute · Zeilen Wohnungsfrage/Lohnfrage/Arbeitszeit/Sozialschutz. Gruppen befuellen + Belege markieren.",
                "problemloesung": "8' · Plenum: Strukturelle Gemeinsamkeiten + Unterschiede zusammentragen (Tafel-Synopsis).",
                "wertung": "7' · 2-Stufen-Urteil: Sache (Was ist gleich, was anders?) · Wert (Ist die SOZIALE FRAGE ueberhaupt geloest?). Schreib-Phase im Heft.",
                "sicherung_lzk": "3' · LZK-Karte AFB II: »Vergleiche 1880 vs. heute in 1 Aspekt mit Beleg« · Hefteintrag Synopsis.",
                "sozialform_phasen": {
                  "problemstellung": "Plenum (Foto-Impuls + UG)",
                  "problementfaltung": "GA (4er-Gruppen Vergleichsmatrix)",
                  "problemloesung": "Plenum (Tafel-Synopsis)",
                  "wertung": "EA · UG",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Vergleichsmatrix mit Wortspeicher (Niedriglohn, Tafel, Working-Poor, Wohngeld) · Foto-Belege statt Text · Lese-Tandem.",
                  "lrs": "Matrix in 14pt+ · Belege als Bild + 1-Satz · Schreib-Geruest fuer Urteil ('Gleich ist: ___. Anders ist: ___. Ich finde: ___.').",
                  "leistungsschwach": "Statistiken visualisiert · Matrix mit vorbefuellten Belegen 1880 · Heute selbst eintragen.",
                  "leistungsstark": "AFB-III-Aufgabe: 'Formuliere die Wohnungsfrage 2026 als drei-komponentige Frage analog zu UE 4 und vergleiche.'"
                },
                "personifikation_anteil": "Anna heute = Working-Poor-Mutter (alleinerziehend, 2 Kinder, Niedriglohn) · Johann heute = Plattform-Kurier (befristet, ohne Sozialschutz) — Aktualisierung der Identifikationsfiguren.",
                "tafelbild_skizze": "Vier-Zeilen-Matrix: Wohnen · Lohn · Arbeitszeit · Sozialschutz. Zwei Spalten 1880 | heute. Rechts: Werturteil 'Soziale Frage geloest?' mit zwei Positionen.",
                "hausaufgabe": "Vorbereitung LNW UE 9: 1-Seiten-Spickzettel zu allen UEs 1-8.",
                "material": "Aktuelle Bilder + Statistiken (BMSFSJ Sozialbericht) · Vergleichsmatrix-Vorlage · Hefteintrag-Schablone · Schreib-Geruest-Karten",
                "lp_bezug": "KE 1 + KE 2 verbinden · Aktualisierungs-Auftrag LP+",
                "prinzipien_b3": [
                  "Aktualitaet",
                  "Schuelerorientierung",
                  "Multiperspektivitaet",
                  "Kontroversitaetsgebot",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Werte · Interessen",
                  "perspektive": "sozialwissenschaftlich · historisch",
                  "prozesskompetenz": "Beurteilen · Reflektieren · Anwenden (Position begruenden)"
                },
                "didaktik": "Aktualitaetsprinzip (Klafki 1996) · Lebensweltbezug · Multiperspektivitaet · Politische Urteilsbildung"
              },
              {
                "nr": 9,
                "titel": "Lernzielkontrolle (LNW) · alle AFB-Stufen",
                "stundenthema_frage": "Was kann ich jetzt — und was nicht?",
                "minuten": 45,
                "lernziel": "SuS dokumentieren ihre Lernertraege in einer Lernzielkontrolle (LNW) mit Aufgaben aller AFB-Stufen.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler dokumentieren ihre Lernertraege in einer schriftlichen Lernzielkontrolle (LNW) mit Aufgaben aller drei AFB-Stufen,",
                  "bedingung": "indem sie nach kurzer Struktur-Klaerung eine LNW mit AFB-I-/-II-/-III-Aufgaben bearbeiten und einen Selbsteinschaetzungsbogen ausfuellen,",
                  "maszstab": "was daran erkennbar wird, dass jede:r SuS alle drei AFB-Stufen bearbeitet hat und im Selbsteinschaetzungsbogen pro Aufgabe eine Einschaetzung gibt."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS strukturieren ihre LNW-Bearbeitung zeitlich,",
                    "indem": "indem sie nach kurzer L-Klaerung der AFB-Stufen die Zeitvorgaben einhalten (AFB I 8' · II 12' · III 8'),",
                    "erkennbar": "was daran erkennbar wird, dass mindestens 80% der Klasse alle drei AFB-Stufen bearbeitet haben.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS reproduzieren Lebensverhaeltnisse (AFB I),",
                    "indem": "indem sie drei Belastungen aus UE 2/3 mit Beleg nennen,",
                    "erkennbar": "was daran erkennbar wird, dass die AFB-I-Aufgabe alle drei Belastungen + Belege traegt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS vergleichen 1880 mit heute (AFB II),",
                    "indem": "indem sie die Vergleichsmatrix-Logik aus UE 8 anwenden,",
                    "erkennbar": "was daran erkennbar wird, dass die AFB-II-Aufgabe einen Vergleich mit zwei strukturellen Gemeinsamkeiten enthaelt.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS urteilen ueber Bismarcks Sozialgesetzgebung (AFB III) — [Differenziert / leistungsstark mit Zusatzkriterien]",
                    "indem": "indem sie ein 3-Stufen-Urteil (Sache · Wert · Position) wie in UE 6 schreiben,",
                    "erkennbar": "was daran erkennbar wird, dass alle drei Stufen mit je einem Argument besetzt sind; im erhoehten Niveau zusaetzlich Perspektivenwechsel.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "4' · Struktur-Hinweis: »LNW prueft Wissen (AFB I), Methoden (II), Urteilsfaehigkeit (III).« Zielangabe + Arbeitsplanung mit Zeitvorgaben.",
                "problementfaltung": "28' · LNW schreiben: AFB I (Beschreiben Lebensverhaeltnisse) · AFB II (Vergleich 1880-heute) · AFB III (Urteil Bismarck — Erfolg oder Beruhigung?).",
                "problemloesung": "5' · Selbsteinschaetzungsbogen ausfuellen (»Was kann ich? Wo brauche ich mehr Zeit?«).",
                "wertung": "4' · »Welche Aufgabe war fuer mich am anspruchsvollsten — und warum?« — metakognitives Mini-Urteil.",
                "sicherung_lzk": "4' · Aufgaben einsammeln · Plenum: Diagnose-Sammlung an Tafel (welche Aufgaben-Typen brauchen Wiederholung).",
                "sozialform_phasen": {
                  "problemstellung": "Plenum (L-Klaerung)",
                  "problementfaltung": "EA (LNW)",
                  "problemloesung": "EA (Selbsteinschaetzung)",
                  "wertung": "UG (kurz)",
                  "sicherung_lzk": "Plenum (Diagnose)"
                },
                "differenzierung_block": {
                  "daz": "LNW-Aufgaben mit Wortspeicher · Visualisierungs-Hilfen · zusaetzliche Zeit (max +10').",
                  "lrs": "LNW in 14pt+ · Aufgaben akustisch vorlesen lassen (Kopfhoerer) · einzelne Wortklaerung erlaubt.",
                  "leistungsschwach": "LNW Niveau Regel: AFB-I-Aufgabe leicht erweitert · AFB-III-Aufgabe mit Satzanfaengen.",
                  "leistungsstark": "LNW Niveau erhoeht: AFB-III-Aufgabe mit Perspektivenwechsel · zusaetzliche Quellenkritik-Frage."
                },
                "personifikation_anteil": "LNW-Aufgaben nehmen Bezug auf Johann und Anna (z.B. 'Beschreibe Annas Wohnverhaeltnis' statt abstrakter Frage).",
                "tafelbild_skizze": "Drei-Spalten-Tafel: AFB I (8') · AFB II (12') · AFB III (8'). Daneben: Diagnose-Spalte fuer Diagnose-Sammlung nach LNW.",
                "hausaufgabe": "—",
                "material": "LNW-Aufgabenbogen (2 Niveaus) · Selbsteinschaetzungsbogen · Wortspeicher · Lese-Hilfe-Karten",
                "lp_bezug": "KE 1 + KE 2 + KE 3 (Kriegsschuld als Anknuepfung) — Sequenz-Sicherung",
                "prinzipien_b3": [
                  "Kompetenzorientierung",
                  "Schuelerorientierung",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Werte · Ordnungssysteme",
                  "perspektive": "historisch · sozialwissenschaftlich",
                  "prozesskompetenz": "Erkenntnisse gewinnen · Beurteilen · Anwenden"
                },
                "didaktik": "Veraenderte Leistungsmessung · Kompetenzorientierung · AFB-Stufung KMK · Selbst-Regulation (Schraw)"
              },
              {
                "nr": 10,
                "titel": "Transfer · Handlungsplan zur Gegenwart",
                "stundenthema_frage": "Welche Soziale Frage von heute waehle ich — und welchen Schritt gehe ich?",
                "minuten": 45,
                "lernziel": "SuS reflektieren das Sequenz-Lernen und entwickeln eigene Handlungsoptionen zur sozialen Frage heute.",
                "lernziel_stundenziel": {
                  "verhalten": "Die Schuelerinnen und Schueler reflektieren das Sequenz-Lernen und entwickeln eine eigene, realistische Handlungsoption zur Sozialen Frage heute,",
                  "bedingung": "indem sie nach einem Stationenrundgang einen Handlungsplan ('1 Frage von heute · 1 Schritt, den ICH gehen kann') schreiben und anonym an der Pinnwand teilen,",
                  "maszstab": "was daran erkennbar wird, dass jede:r SuS einen Handlungsplan mit konkreter Frage + konkretem Schritt + Begruendung an der Pinnwand befestigt."
                },
                "lernziel_teilziele": [
                  {
                    "tz": "SuS rekonstruieren die Kern-Aspekte der Sequenz,",
                    "indem": "indem sie an vier Stationen (Lebensverhaeltnisse · Loesungsansaetze · Bismarck · Gegenwart) je eine Reflexion notieren,",
                    "erkennbar": "was daran erkennbar wird, dass jede Station mindestens drei Reflexions-Notizen traegt.",
                    "afb": "I",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS waehlen eine aktuelle Soziale Frage,",
                    "indem": "indem sie aus den mitgebrachten Bildern/Schlagzeilen (HA UE 4 + UE 8) eine fuer sich relevante auswaehlen,",
                    "erkennbar": "was daran erkennbar wird, dass die Wahl im Handlungsplan benannt ist.",
                    "afb": "II",
                    "differenziert": false
                  },
                  {
                    "tz": "SuS formulieren einen realistischen Handlungsschritt,",
                    "indem": "indem sie ueberlegen, was sie selbst (allein oder mit anderen) konkret tun koennen,",
                    "erkennbar": "was daran erkennbar wird, dass der Schritt eine Zeit-Angabe + ein Aktions-Verb traegt.",
                    "afb": "III",
                    "differenziert": false
                  },
                  {
                    "tz": "[Differenziert / leistungsstark] SuS reflektieren die Wirksamkeit historischer Loesungsansaetze,",
                    "indem": "indem sie pruefen, welcher Ansatz (Selbsthilfe · Gewerkschaft · Staat) heute ihrem Schritt am naechsten kommt,",
                    "erkennbar": "was daran erkennbar wird, dass sie im Plenum eine Analogie zu UE 5 begruenden.",
                    "afb": "III",
                    "differenziert": true
                  }
                ],
                "problemstellung": "5' · Sequenz-Rueckblick: SuS nennen das wichtigste Wort. Zielangabe: »Wir entwickeln eigene Handlungsoptionen.« Plan: Stationen + Schreibphase.",
                "problementfaltung": "20' · Stationenrundgang: jede Station 1 Sequenz-Aspekt (Lebensverhaeltnisse / Loesungsansaetze / Bismarck / Gegenwart). SuS schreiben spontane Reflexionen + sammeln Anhaltspunkte fuer eigenes Handeln.",
                "problemloesung": "8' · Handlungsplan-Schreiben: »Eine soziale Frage von heute — und 1 Schritt, den ICH gehen kann.« Schreibvorlage.",
                "wertung": "8' · Pinnwand-Galerie anonym: Welche Plaene wirken realistisch? Welche ueberzeugen — Position + Begruendung.",
                "sicherung_lzk": "4' · Eigener Plan ins Heft · LZK-Mini: »Was kann ich heute, was ich vor der Sequenz nicht konnte?« (Lernzuwachs).",
                "sozialform_phasen": {
                  "problemstellung": "Plenum (Blitzlicht)",
                  "problementfaltung": "EA · GA (Stationenrundgang)",
                  "problemloesung": "EA (Handlungsplan-Schreiben)",
                  "wertung": "Plenum (Pinnwand-Galerie)",
                  "sicherung_lzk": "EA"
                },
                "differenzierung_block": {
                  "daz": "Schreibvorlage mit Satzanfaengen ('Meine Frage ist ___. Ich kann ___ tun.') · Wortspeicher (Buergerinitiative, ehrenamtlich, spenden, organisieren).",
                  "lrs": "Schreibvorlage 14pt+ · Diktier-Funktion erlaubt · Pinnwand-Karten gross.",
                  "leistungsschwach": "Handlungsplan in 1 Satz: 'Eine Frage von heute ist ___. Ich kann ___ tun.' (3-Niveaus-Stufung).",
                  "leistungsstark": "Handlungsplan + Verknuepfung zu UE 5 (Selbsthilfe/Gewerkschaft/Staat-Analogie) als AFB-III-Begruendung."
                },
                "personifikation_anteil": "Johann/Anna werden in den Stationen als historischer Spiegel verwendet: 'Was haetten Johann/Anna gemacht?' fuehrt zu 'Was kann ICH machen?'",
                "tafelbild_skizze": "Vier-Stationen-Karte links · Pinnwand 'Handlungsplaene heute' rechts · Mitte 'Lernzuwachs-Frage' fuer LZK.",
                "hausaufgabe": "—",
                "material": "Stationen-Plakate (4 Sequenz-Aspekte) · Reflexions-Sticker · Pinnwand · Handlungsplan-Vorlage · Schreib-Geruest · Wortspeicher",
                "lp_bezug": "KE 1+2 Sequenz-Abschluss · Aktualisierungs-Auftrag",
                "prinzipien_b3": [
                  "Handlungsorientierung",
                  "Schuelerorientierung",
                  "Aktualitaet",
                  "Personifikation"
                ],
                "kompetenzstruktur": {
                  "gegenstand": "Interessen · Werte",
                  "perspektive": "sozialwissenschaftlich",
                  "prozesskompetenz": "Beurteilen · Reflektieren · Handeln (Realhandeln)"
                },
                "didaktik": "Demokratie-Lernen (Himmelmann 2001: Lebensform-Dimension) · Handlungsorientierung Realhandeln (Reinhardt 2005) · Muendigkeit (Detjen 2007) · SRL (Self-Regulated Learning, Schraw)"
              }
            ],
            "bezuege_global": [
              {
                "didaktik": "Beutelsbacher Konsens (Beutelsbach 1976)",
                "verweis": "Ueberwaeltigungsverbot: keine eindeutige LK-Position zu Bismarck (UE 6). Kontroversitaetsgebot: Pro-Contra-Debatte UE 6. Schuelerorientierung: Anschluss an Lebenswelt (UE 8 + 10)."
              },
              {
                "didaktik": "Politische Urteilsbildung 3-Stufen (GPJE 2004)",
                "verweis": "3-Stufen-Urteil (Sachebene · Werte-Ebene · eigene Position) in UE 6 + LNW UE 9 + UE 8. Politische Urteilskompetenz als Kern-Kompetenz GPJE-Standards."
              },
              {
                "didaktik": "Aktualitaetsprinzip (Klafki 1996)",
                "verweis": "Klafki kategoriale Bildung: historische Inhalte nur dann bildend, wenn sie zur Gegenwart sprechen. UE 4 (Begriff heute) · UE 7 (lokale Stadt heute) · UE 8 (Vergleich heute) · UE 10 (Transfer Realhandeln)."
              },
              {
                "didaktik": "Multiperspektivitaet (Bergmann 2000)",
                "verweis": "UE 2: 4 Stationen geben 4 Sichtweisen · UE 3: Engels quellenkritisch · UE 5: Jigsaw mit drei Akteur-Perspektiven · UE 6: Pro-Contra-Rollen · UE 8: Vergleich-Matrix."
              },
              {
                "didaktik": "Demokratie-Lernen (Himmelmann 2001)",
                "verweis": "UE 6 Pro-Contra-Debatte als Demokratie-Erfahrung (Lebensform-Dimension). UE 10 Handlungsplan + Pinnwand-Galerie als Mitwirkung-Anbahnung. Lernende als demokratische Buerger:innen."
              },
              {
                "didaktik": "Quellenkritik (Pandel 2017)",
                "verweis": "UE 1 Bildquelle Menzel (Wirkungsabsicht) · UE 3 Engels-Auszug (Reliabilitaet Sozialist) · UE 7 Stadtkarte 1850/1900. Quellengattung benennen + Aussage pruefen + Bedeutung einordnen."
              },
              {
                "didaktik": "Personifikation als Identifikationsstrategie (Allgemeine GPG-Hinweise Seminar)",
                "verweis": "Johann + Anna durchziehen die Sequenz (UE 1 Anbahnung · UE 2 Anna Wohnen · UE 3 Johann Schicht · UE 5 Anna SPD · UE 6 Johann Unfallversicherung · UE 8 Anna heute Working-Poor · UE 9 LNW mit beiden Figuren · UE 10 Spiegelfrage 'Was haetten Johann/Anna getan?'). Identifikationsfiguren als personale Anker (Klafki) ermoeglichen schnellere Identifikation der Stundenfrage."
              },
              {
                "didaktik": "Sprachsensibler GPG-Unterricht (LP+ Fachprofil GPG)",
                "verweis": "Wortspeicher + Lese-Tandems + 3-Niveau-Texte in UE 2, 3, 4, 5. DaZ-Spalte im Differenzierungs-Block jeder UE. Sprachsensibilitaet als Querschnittsaufgabe (LP+ GPG-Fachprofil)."
              },
              {
                "didaktik": "Heterogenitaetsorientierung · 4-Spuren-Differenzierung (Seminar MS II SW)",
                "verweis": "Pro UE explizite Spuren: DaZ · LRS · leistungsschwach · leistungsstark. Verhindert Ueberforderung -> Unruhe (Hinweis Allgemeine GPG-Anleitung) und sichert Inklusion. Diff-Block in jeder UE."
              },
              {
                "didaktik": "Mager-Lernziele (Lernziele formulieren · Seminar-Standard)",
                "verweis": "Pro UE: Stundenziel + 3-4 Teilziele · davon eines differenziert fuer leistungsstark (AFB III). 3-Komponenten: Verhalten + Bedingung (indem) + Beurteilungsmassstab (was daran erkennbar wird, dass)."
              },
              {
                "didaktik": "Tafelbild-Zentrierung (Allgemeine GPG-Hinweise)",
                "verweis": "Pro UE eine kurze Tafelbild-Skizze (3-Zonen oder 4-Quadranten oder 3-Spalten). Handschriftlich, nicht kopiert. Sicherung im Heft (nicht Mappe) — letzteres zaehlt fuer Noten."
              }
            ]
          }
        },
        {
          "ke_id": "GPG7-LB3-02",
          "ke_wortlaut": "analysieren unter ausgewählten Aspekten (z. B. Bevölkerungswachstum, Arbeitsregelungen) die Entwicklung einer Stadt Ende des 19. Jahrhunderts in Deutschland, um den Übergang von der Agrar- zur Industriegesellschaft darzustellen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Übergang Agrar- zur Industriegesellschaft — Stadtentwicklung",
          "operator": "analysieren / darstellen",
          "afb": "II–III",
          "inhalte_lp": [
            "Industrielle Revolution, Industriegesellschaft",
            "Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze",
            "Kriegsschuldfrage und Versailler Vertrag"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UZE Landflucht und „Leben in der Stadt“ — Push/Pull und Lebensbedingungen",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "06.–09.03.2026",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Erster Weltkrieg — Ursachen und Kriegsschuldfrage",
          "operator": "erläutern / diskutieren",
          "afb": "II–III",
          "inhalte_lp": [
            "Industrielle Revolution, Industriegesellschaft",
            "Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze",
            "Kriegsschuldfrage und Versailler Vertrag"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "real",
          "umsetzung_titel": "Sequenz „Erster Weltkrieg“ — Pulverfass Europa und Attentat von Sarajewo",
          "umsetzung_klasse": "GPG7b",
          "umsetzung_datum": "ab 04.05.2026 (laufend, KW19–22 geplant)",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Versailler Friedensvertrag — Bestimmungen und Folgen",
          "operator": "erläutern / begründen (R) — selbständig darstellen / diskutieren (M)",
          "afb": "II (R) / III (M)",
          "inhalte_lp": [
            "Industrielle Revolution, Industriegesellschaft",
            "Soziale Frage zu Beginn des 20. Jahrhunderts und Lösungsansätze",
            "Kriegsschuldfrage und Versailler Vertrag"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Der Vertrag von Versailles — Frieden oder Demütigung?“ — Fallanalyse eines Dokuments",
          "umsetzung_klasse": "GPG7",
          "umsetzung_datum": "",
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
      ],
      "pilot_marker": true
    },
    "GPG7_LB4": {
      "ke_anzahl": 4,
      "jgst": "GPG7",
      "lb": "LB4",
      "lb_titel": "Lebenswelt",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG7-LB4-01",
          "ke_wortlaut": "benennen die rechtsbedeutsamen Altersstufen für Jugendliche und übertragen die Bedeutung rechtlicher Regelungen auf das eigene Leben.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB4 Lebenswelt · verbatim",
          "thema": "Recht — rechtsbedeutsame Altersstufen",
          "operator": "benennen (R) / darstellen (M)",
          "afb": "I (R) / I–II (M)",
          "inhalte_lp": [
            "rechtsbedeutsame Altersstufen für Jugendliche",
            "Jugendschutzgesetz",
            "Bestimmungen des Jugendstrafrechts, Funktionen von Strafe",
            "Rechtsverstöße und Konsequenzen an aktuellen Beispielen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE2 „Rechtliche Altersstufen + Jugendschutzgesetz“ — Stationenlernen",
          "umsetzung_klasse": "GPG7c (90 min) und GPG7b",
          "umsetzung_datum": "12.01.2026 (7c) · 30.01.2026 (7b)",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB4 Lebenswelt · verbatim",
          "thema": "Recht — Jugendschutzgesetz und Jugendstrafrecht",
          "operator": "zusammenfassen + beurteilen (R) / erläutern + diskutieren (M)",
          "afb": "II–III",
          "inhalte_lp": [
            "rechtsbedeutsame Altersstufen für Jugendliche",
            "Jugendschutzgesetz",
            "Bestimmungen des Jugendstrafrechts, Funktionen von Strafe",
            "Rechtsverstöße und Konsequenzen an aktuellen Beispielen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE3 + UE4a „Jugendstrafrecht-Grundlagen + Sanktionsmöglichkeiten“",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "19.01.2026 (7c)",
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
          "ke_wortlaut": "diskutieren grundlegende Bestimmungen des Jugendstrafrechts sowie die präventiv und pädagogisch ausgerichtete Strafzumessung anhand einer öffentlichen Gerichtsverhandlung.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB4 Lebenswelt · verbatim",
          "thema": "Recht — Jugendstrafrecht und Strafbemessung",
          "operator": "diskutieren",
          "afb": "III",
          "inhalte_lp": [
            "rechtsbedeutsame Altersstufen für Jugendliche",
            "Jugendschutzgesetz",
            "Bestimmungen des Jugendstrafrechts, Funktionen von Strafe",
            "Rechtsverstöße und Konsequenzen an aktuellen Beispielen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "UE4b + UE5 ELP „Welche Strafe ist für Leon passend?“ — Fallanalyse als Erweiterte Lehrprobe",
          "umsetzung_klasse": "GPG7c (ELP-Format) · GPG7b (ohne ELP-Format)",
          "umsetzung_datum": "UE4b 23.01.2026 · UE5 ELP 26.01.2026",
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
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG7 · LB4 Lebenswelt · verbatim",
          "thema": "Recht — aktuelle kriminelle Tat und mögliche Strafen",
          "operator": "berichten + diskutieren (R) / selbständig recherchieren + berichten + diskutieren (M)",
          "afb": "II–III",
          "inhalte_lp": [
            "rechtsbedeutsame Altersstufen für Jugendliche",
            "Jugendschutzgesetz",
            "Bestimmungen des Jugendstrafrechts, Funktionen von Strafe",
            "Rechtsverstöße und Konsequenzen an aktuellen Beispielen"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG7 · LB4 Lebenswelt",
          "umsetzung_typ": "real",
          "umsetzung_titel": "ELP-Einstieg „Welche Strafe ist für Leon passend?“ — aktueller Spiegel-Fall als Identifikationsfigur",
          "umsetzung_klasse": "GPG7c und GPG7b",
          "umsetzung_datum": "26.01.2026 (ELP) und Sequenzverlauf Januar 2026",
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
    "GPG8_LB2": {
      "ke_anzahl": 0,
      "jgst": "GPG8",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "ausstehend",
      "kes": [],
      "hinweis": "LP+ Bayern MS GPG GPG8 LB2 — Quelle steht aus. Bitte ergänzen."
    },
    "GPG8_LB3": {
      "ke_anzahl": 2,
      "jgst": "GPG8",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "sekundaer",
      "kes": [
        {
          "ke_id": "GPG8-LB3-01",
          "ke_wortlaut": "beschreiben die Aufgaben wichtiger parlamentarischer Institutionen bei der Gesetzgebung anhand eines aktuellen Fallbeispiels und diskutieren den Sinn dieser Regelungen für die Zielsetzungen von Legitimität, Effizienz und Allgemeinwohl.",
          "thema": "Verfassung — parlamentarische Gesetzgebung",
          "operator": "beschreiben (R) / erklären (M) + diskutieren",
          "afb": "I→II (R→M) + III",
          "inhalte": "Verfassungsorgane (Bundestag, Bundesregierung, Bundesrat), Gesetzgebungsverfahren, freiheitliche demokratische Grundordnung.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB3 Politik und Gesellschaft (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG8 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        },
        {
          "ke_id": "GPG8-LB3-02",
          "ke_wortlaut": "erläutern Motive und Formen des Widerstands einzelner Gruppen unter dem Nationalsozialismus, diskutieren Möglichkeiten und Grenzen, Menschenrechte auch in einer Demokratie einzufordern und erkennen dabei Zivilcourage als eine zum Erhalt und zur Stabilisierung demokratischer Gesellschaftsstrukturen unverzichtbare Voraussetzung.",
          "thema": "Nationalsozialismus — Widerstand und Zivilcourage",
          "operator": "erläutern / diskutieren / erkennen",
          "afb": "II–III",
          "inhalte": "Widerstand im NS (Weiße Rose, 20. Juli, Bonhoeffer, Pater Mayer); Zivilcourage; Menschenrechte.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB3 Politik und Gesellschaft (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG8 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        }
      ]
    },
    "GPG8_LB4": {
      "ke_anzahl": 2,
      "jgst": "GPG8",
      "lb": "LB4",
      "lb_titel": "Lebenswelt",
      "quelle_status": "sekundaer",
      "kes": [
        {
          "ke_id": "GPG8-LB4-01",
          "ke_wortlaut": "beschreiben die Möglichkeiten der politischen Teilhabe der Bürgerinnen und Bürger in der Demokratie, beurteilen deren Mitwirkungsmöglichkeiten und diskutieren sie als eigene zukünftige Handlungsmöglichkeiten.",
          "thema": "Politische Teilhabe — Mitwirkungsmöglichkeiten",
          "operator": "beschreiben (R) / erklären (M) + beurteilen + diskutieren",
          "afb": "I→II + III",
          "inhalte": "politische Teilhabe (Wahlen, Parteien, Bürgerinitiativen).",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB4 Lebenswelt (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG8 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        },
        {
          "ke_id": "GPG8-LB4-02",
          "ke_wortlaut": "analysieren die Wahlbeteiligung einer aktuellen Bundes- oder Landtagswahl und diskutieren Gründe für die geringe Wahlbeteiligung von Erstwählerinnen und Erstwählern.",
          "thema": "Wahlen — Wahlbeteiligung von Erstwählern",
          "operator": "analysieren / diskutieren",
          "afb": "II–III",
          "inhalte": "Wahlen; Wahlbeteiligung; Erstwähler.",
          "fundort": "LehrplanPLUS MS Bayern · GPG8 · LB4 Lebenswelt (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG8 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        }
      ]
    },
    "GPG9_LB2": {
      "ke_anzahl": 0,
      "jgst": "GPG9",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "ausstehend",
      "kes": [],
      "hinweis": "LP+ Bayern MS GPG GPG9 LB2 — Quelle steht aus. Bitte ergänzen."
    },
    "GPG9_LB3": {
      "ke_anzahl": 1,
      "jgst": "GPG9",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "sekundaer",
      "kes": [
        {
          "ke_id": "GPG9-LB3-01",
          "ke_wortlaut": "stellen Organisationen der nationalen und internationalen Friedenssicherung dar und diskutieren deren Rolle in aktuellen humanitären und militärischen Einsätzen.",
          "thema": "Friedenssicherung — nationale und internationale Organisationen",
          "operator": "darstellen / diskutieren (R) — + begründen (M)",
          "afb": "II–III",
          "inhalte": "nationale + internationale Friedenssicherung (UNO, NATO, Bundeswehr); humanitäre und militärische Einsätze.",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB3 Politik und Gesellschaft (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG9 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        }
      ]
    },
    "GPG9_LB4": {
      "ke_anzahl": 2,
      "jgst": "GPG9",
      "lb": "LB4",
      "lb_titel": "Lebenswelt",
      "quelle_status": "sekundaer",
      "kes": [
        {
          "ke_id": "GPG9-LB4-01",
          "ke_wortlaut": "erklären Ursachen von Migrationsbewegungen, nennen politische Entscheidungen sowie getroffene Maßnahmen in ihrer Region und diskutieren Herausforderungen und Chancen der Migration für unsere Gesellschaft.",
          "thema": "Migration — Ursachen, Herausforderungen und Chancen",
          "operator": "erklären (R) / analysieren (M) + diskutieren",
          "afb": "II→III (R→M) + III",
          "inhalte": "Migration und Integration (Ursachen, gesellschaftliche Herausforderungen).",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB4 Lebenswelt (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG9 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        },
        {
          "ke_id": "GPG9-LB4-02",
          "ke_wortlaut": "recherchieren Ursachen und Auswirkungen eines aktuellen gesellschaftlichen Konfliktes und bewerten diesen aus unterschiedlichen Perspektiven.",
          "thema": "Aktueller gesellschaftlicher Konflikt — Mehrperspektivenanalyse",
          "operator": "recherchieren + bewerten (R) / + präsentieren + erörtern (M)",
          "afb": "II–III",
          "inhalte": "Analyse eines aktuellen Konfliktes aus unterschiedlichen Perspektiven.",
          "fundort": "LehrplanPLUS MS Bayern · GPG9 · LB4 Lebenswelt (Wortlaut über Sekundärquelle)",
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
          ],
          "ke_wortlaut_quelle": "Sekundärquelle (KE-Datenbank · LP+-Quelle für GPG9 aktuell nicht verbatim verifiziert)",
          "inhalte_lp": []
        }
      ]
    },
    "GPG10_LB2": {
      "ke_anzahl": 4,
      "jgst": "GPG10",
      "lb": "LB2",
      "lb_titel": "Zeit und Wandel",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG10-LB2-01",
          "ke_wortlaut": "stellen wichtige Meilensteine der Entstehung der Menschenrechte dar und diskutieren ihre Bedeutung für ein Leben in Freiheit.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB2 Zeit und Wandel · verbatim",
          "thema": "stellen wichtige Meilensteine der Entstehung der Menschenrechte dar und diskutie",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Meilensteine der Menschenrechte: Magna Charta Libertatum, Unabhängigkeitserklärung in den USA, Ende des Absolutismus und Französische Revolution, Grundrechte in der deutschen Verfassung, Charta der Vereinten Nationen",
            "Ausgewähltes Land oder Raum (z. B. China, Russland, USA, Indien): politisches System, Gesellschaft",
            "Ursachen eines aktuellen, globalen Konfliktes und Einflussnahme der beteiligten Länder"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB2-02",
          "ke_wortlaut": "erläutern an einem ausgewählten Land oder Raum der Erde das gegenwärtige politische System und stellen dessen Entwicklungsstand dar.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB2 Zeit und Wandel · verbatim",
          "thema": "erläutern an einem ausgewählten Land oder Raum der Erde das gegenwärtige politis",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Meilensteine der Menschenrechte: Magna Charta Libertatum, Unabhängigkeitserklärung in den USA, Ende des Absolutismus und Französische Revolution, Grundrechte in der deutschen Verfassung, Charta der Vereinten Nationen",
            "Ausgewähltes Land oder Raum (z. B. China, Russland, USA, Indien): politisches System, Gesellschaft",
            "Ursachen eines aktuellen, globalen Konfliktes und Einflussnahme der beteiligten Länder"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB2-03",
          "ke_wortlaut": "erklären die Möglichkeiten gesellschaftlicher Teilhabe und politischer Mitwirkung einzelner Gruppen der Gesellschaft in einem ausgewählten Land.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB2 Zeit und Wandel · verbatim",
          "thema": "erklären die Möglichkeiten gesellschaftlicher Teilhabe und politischer Mitwirkun",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Meilensteine der Menschenrechte: Magna Charta Libertatum, Unabhängigkeitserklärung in den USA, Ende des Absolutismus und Französische Revolution, Grundrechte in der deutschen Verfassung, Charta der Vereinten Nationen",
            "Ausgewähltes Land oder Raum (z. B. China, Russland, USA, Indien): politisches System, Gesellschaft",
            "Ursachen eines aktuellen, globalen Konfliktes und Einflussnahme der beteiligten Länder"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB2-04",
          "ke_wortlaut": "beschreiben Ursachen und Verlauf eines aktuellen globalen Konfliktes und entwickeln mögliche Begründungen für die resultierende politische Rolle.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB2 Zeit und Wandel · verbatim",
          "thema": "beschreiben Ursachen und Verlauf eines aktuellen globalen Konfliktes und entwick",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Meilensteine der Menschenrechte: Magna Charta Libertatum, Unabhängigkeitserklärung in den USA, Ende des Absolutismus und Französische Revolution, Grundrechte in der deutschen Verfassung, Charta der Vereinten Nationen",
            "Ausgewähltes Land oder Raum (z. B. China, Russland, USA, Indien): politisches System, Gesellschaft",
            "Ursachen eines aktuellen, globalen Konfliktes und Einflussnahme der beteiligten Länder"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB2 Zeit und Wandel",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG10_LB3": {
      "ke_anzahl": 4,
      "jgst": "GPG10",
      "lb": "LB3",
      "lb_titel": "Politik und Gesellschaft",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG10-LB3-01",
          "ke_wortlaut": "definieren die Grund- und Menschenrechte als schützenswerte Basis gesellschaftlichen Zusammenlebens.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Grund- und Menschenrechte — schützenswerte Basis",
          "operator": "definieren",
          "afb": "III (normativ)",
          "inhalte_lp": [
            "Garantie und Schutz der Grund- und Menschenrechte",
            "Einsatz der UN bei Menschenrechtsverletzungen anhand eines aktuellen Beispiels",
            "Funktion und Aufgaben des Bundesverfassungsgerichts",
            "Formen des Extremismus (z. B. Links- und Rechtsextremismus, Dschihadismus)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "UE „Was sind unsere Rechte wert?“ — Grundrechte als normative Basis",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
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
          "ke_wortlaut": "erörtern Möglichkeiten der Intervention durch die Staatengemeinschaft bei anhaltenden Menschenrechtsverletzungen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "Bundesverfassungsgericht — Rolle im politischen System",
          "operator": "darstellen / erörtern",
          "afb": "II–III",
          "inhalte_lp": [
            "Garantie und Schutz der Grund- und Menschenrechte",
            "Einsatz der UN bei Menschenrechtsverletzungen anhand eines aktuellen Beispiels",
            "Funktion und Aufgaben des Bundesverfassungsgerichts",
            "Formen des Extremismus (z. B. Links- und Rechtsextremismus, Dschihadismus)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Fallanalyse „Karlsruhe entscheidet“ — ein selbst recherchiertes BVerfG-Urteil",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
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
        },
        {
          "ke_id": "GPG10-LB3-03",
          "ke_wortlaut": "stellen die Rolle des Bundesverfassungsgerichts in unserem politischen System dar und erörtern seine Bedeutung für den Schutz.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "stellen die Rolle des Bundesverfassungsgerichts in unserem politischen System da",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Garantie und Schutz der Grund- und Menschenrechte",
            "Einsatz der UN bei Menschenrechtsverletzungen anhand eines aktuellen Beispiels",
            "Funktion und Aufgaben des Bundesverfassungsgerichts",
            "Formen des Extremismus (z. B. Links- und Rechtsextremismus, Dschihadismus)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB3-04",
          "ke_wortlaut": "entwickeln Erklärungen für die Existenz unterschiedlicher Formen von Extremismus und Radikalisierung.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB3 Politik und Gesellschaft · verbatim",
          "thema": "entwickeln Erklärungen für die Existenz unterschiedlicher Formen von Extremismus",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "Garantie und Schutz der Grund- und Menschenrechte",
            "Einsatz der UN bei Menschenrechtsverletzungen anhand eines aktuellen Beispiels",
            "Funktion und Aufgaben des Bundesverfassungsgerichts",
            "Formen des Extremismus (z. B. Links- und Rechtsextremismus, Dschihadismus)"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB3 Politik und Gesellschaft",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    },
    "GPG10_LB4": {
      "ke_anzahl": 5,
      "jgst": "GPG10",
      "lb": "LB4",
      "lb_titel": "Lebenswelt",
      "quelle_status": "verbatim",
      "kes": [
        {
          "ke_id": "GPG10-LB4-01",
          "ke_wortlaut": "formulieren ihre grundlegenden politischen und gesellschaftlichen Rechte und begründen die Existenz von Interessenvertretungen.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB4 Lebenswelt · verbatim",
          "thema": "Politische Willensbildung — Beteiligung erproben",
          "operator": "darstellen / erproben",
          "afb": "II + Anwendung/Handlung",
          "inhalte_lp": [
            "UN-Kinderrechtskonvention, Umsetzung und Einhaltung der Kinderrechte",
            "Schutz von Kinder- und Jugendrechten (z. B. Leistungen der Kinder- und Jugendhilfe)",
            "Nationale und internationale Organisationen zum Schutz von Kinderrechten",
            "Geschlechterrollen früher und heute (Gender)",
            "Politische Willensbildung und Mitwirkung der Bürgerinnen und Bürger in der Demokratie"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt",
          "umsetzung_typ": "idealtypisch",
          "umsetzung_titel": "Projekt „Mischen wir mit“ — politische Willensbildung darstellen und erproben",
          "umsetzung_klasse": "GPG10 (M-Zug)",
          "umsetzung_datum": "",
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
        },
        {
          "ke_id": "GPG10-LB4-02",
          "ke_wortlaut": "vergleichen ihre gesellschaftliche Teilhabe und Rechte als Jugendliche in einem Rechtsstaat mit Kindern und Jugendlichen anderer Länder.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB4 Lebenswelt · verbatim",
          "thema": "vergleichen ihre gesellschaftliche Teilhabe und Rechte als Jugendliche in einem ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "UN-Kinderrechtskonvention, Umsetzung und Einhaltung der Kinderrechte",
            "Schutz von Kinder- und Jugendrechten (z. B. Leistungen der Kinder- und Jugendhilfe)",
            "Nationale und internationale Organisationen zum Schutz von Kinderrechten",
            "Geschlechterrollen früher und heute (Gender)",
            "Politische Willensbildung und Mitwirkung der Bürgerinnen und Bürger in der Demokratie"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB4-03",
          "ke_wortlaut": "erläutern Aufgaben und Leistungen von Familie und staatlichen Einrichtungen zum Schutz von Kinderrechten.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB4 Lebenswelt · verbatim",
          "thema": "erläutern Aufgaben und Leistungen von Familie und staatlichen Einrichtungen zum ",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "UN-Kinderrechtskonvention, Umsetzung und Einhaltung der Kinderrechte",
            "Schutz von Kinder- und Jugendrechten (z. B. Leistungen der Kinder- und Jugendhilfe)",
            "Nationale und internationale Organisationen zum Schutz von Kinderrechten",
            "Geschlechterrollen früher und heute (Gender)",
            "Politische Willensbildung und Mitwirkung der Bürgerinnen und Bürger in der Demokratie"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB4-04",
          "ke_wortlaut": "stellen die unterschiedlichen Rollenbilder von Frauen und Männern früher und heute in gesellschaftlichen Zusammenhängen gegenüber.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB4 Lebenswelt · verbatim",
          "thema": "stellen die unterschiedlichen Rollenbilder von Frauen und Männern früher und heu",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "UN-Kinderrechtskonvention, Umsetzung und Einhaltung der Kinderrechte",
            "Schutz von Kinder- und Jugendrechten (z. B. Leistungen der Kinder- und Jugendhilfe)",
            "Nationale und internationale Organisationen zum Schutz von Kinderrechten",
            "Geschlechterrollen früher und heute (Gender)",
            "Politische Willensbildung und Mitwirkung der Bürgerinnen und Bürger in der Demokratie"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        },
        {
          "ke_id": "GPG10-LB4-05",
          "ke_wortlaut": "stellen den Prozess der politischen Willensbildung dar und erproben Einfluss- und Beteiligungsmöglichkeiten.",
          "ke_wortlaut_quelle": "LP+ Bayern MS GPG · GPG10 · LB4 Lebenswelt · verbatim",
          "thema": "stellen den Prozess der politischen Willensbildung dar und erproben Einfluss- un",
          "operator": null,
          "afb": null,
          "inhalte_lp": [
            "UN-Kinderrechtskonvention, Umsetzung und Einhaltung der Kinderrechte",
            "Schutz von Kinder- und Jugendrechten (z. B. Leistungen der Kinder- und Jugendhilfe)",
            "Nationale und internationale Organisationen zum Schutz von Kinderrechten",
            "Geschlechterrollen früher und heute (Gender)",
            "Politische Willensbildung und Mitwirkung der Bürgerinnen und Bürger in der Demokratie"
          ],
          "fundort": "LehrplanPLUS MS Bayern · GPG10 · LB4 Lebenswelt",
          "umsetzung_typ": "planned",
          "ues": [],
          "bezuege": []
        }
      ]
    }
  },
};
