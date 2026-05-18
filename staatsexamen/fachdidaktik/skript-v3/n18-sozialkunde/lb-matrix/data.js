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
            "titel": "10-UE-Sequenz · Lebens- und Arbeitsverhältnisse + Soziale Frage",
            "praxis": "Eigene Praxis GPG7c SJ 24/25 + idealtypische Erweiterung",
            "gesamtzeit": "10 UEs à 45 min = 7,5 Zeitstunden",
            "lernzielraster": "Sach- + Methoden- + Urteilskompetenz · GPJE 2004",
            "phasenStandard": "GPG-Bayern · 5 Artikulationsstufen pro UE (GPG GB Kap. 5 + Seminarbuch Bd. 3 S. 10-12)",
            "phasenSchema": [
              { "id": "problemstellung",   "label": "1 Problemstellung",   "kurz": "Vorwissen · Zielangabe · Arbeitsplanung" },
              { "id": "problementfaltung", "label": "2 Problementfaltung", "kurz": "Erarbeitung am Material" },
              { "id": "problemloesung",    "label": "3 Problemlösung",     "kurz": "Antwort auf die Problemfrage" },
              { "id": "wertung",           "label": "4 Wertung",           "kurz": "Rationales Urteil (Sache · Wert · Position)" },
              { "id": "sicherung_lzk",     "label": "5 Sicherung + LZK",   "kurz": "Hefteintrag · Lernzielkontrolle" }
            ],
            "ues_detail": [
              {
                "nr": 1,
                "titel": "Standbilder · Was ist die Soziale Frage?",
                "minuten": 45,
                "lernziel": "SuS aktivieren Vorwissen zur Industrialisierung (LB2-Anknüpfung) und entwickeln eine Forschungsfrage zur sozialen Lage der Arbeiter:innen.",
                "problemstellung": "8' · Bildimpuls Adolph Menzel »Eisenwalzwerk« (1875) · stilles Schreib-Gespräch. Zielangabe: »Wir untersuchen, warum man von der SOZIALEN FRAGE spricht.« Arbeitsplanung: 4 Standbild-Gruppen mit Themen Fabrik · Wohnung · Familie · Straße.",
                "problementfaltung": "22' · Gruppenarbeit in 4er-Teams: SuS bilden Standbilder zu »typischen Szenen« der Industrialisierung. Foto-Dokumentation je Gruppe.",
                "problemloesung": "8' · Galerie-Rundgang + Mind-Map Tafel: »Welche Belastungen sind sichtbar?« — Sammlung gemeinsamer Kern-Aspekte.",
                "wertung": "5' · Hypothese: »Warum heißt das die Soziale FRAGE — und nicht Soziale Lage?« — erste Deutungen.",
                "sicherung_lzk": "2' · Hefteintrag-Vorlage »Die Soziale Frage entsteht durch …« · Lernzielklärung Sequenz.",
                "material": "Menzel-Druck (A2) · Sammelplakat · Smartphone-Kamera · Hefteintrag-Vorlage",
                "differenzierung": "Reduktiv: vorgegebene Standbild-Themen + Wortkärtchen. Erweitert: eigene Aspekte + Bildanalyse-Raster.",
                "lp_bezug": "KE 1 Anbahnung (Lebensverhältnisse) · KE 2 Anbahnung (Übergang Agrar→Industrie)",
                "prinzipien_b3": ["Schülerorientierung", "Problemorientierung", "Erfahrungsbezug"],
                "kompetenzstruktur": { "gegenstand": "Räume · Werte", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Wahrnehmen · Hinterfragen" },
                "didaktik": "Lebensweltbezug (Klafki) · Bildquellenarbeit · Performatives Lernen (Standbild als sozialwissenschaftliche Methode, Massing/Reinhardt)"
              },
              {
                "nr": 2,
                "titel": "Lebensverhältnisse der Arbeiter:innen-Familie",
                "minuten": 45,
                "lernziel": "SuS beschreiben die Lebens- und Wohnverhältnisse der Industriearbeiter:innen-Familien (KE 1) anhand multiperspektivischer Quellen.",
                "problemstellung": "6' · Foto »Mietskaserne Berlin 1900« — Sehimpuls + Vermutungen. Zielangabe: »Wie sah der Alltag aus?« Arbeitsplanung: 4 Stationen mit Rotation.",
                "problementfaltung": "22' · Stationenlernen: (1) Wohnsituation (Schlafgänger) · (2) Ernährung (Kartoffel-Statistik) · (3) Kindheit (Kinderarbeit-Bilder Zeche) · (4) Tagesablauf (12-Stunden-Schichtprotokoll). Notizen im AB.",
                "problemloesung": "10' · Plakat-Galerie: jede Gruppe stellt 1 Station vor + zentrale Aussage in 1 Satz. Tafel-Synthese: 4 Belastungs-Dimensionen.",
                "wertung": "4' · »Welche Belastung war für euch am überraschendsten — und warum?« Multiperspektivischer Austausch.",
                "sicherung_lzk": "3' · Hefteintrag-Skizze »4 Achsen der Belastung« · LZK-Karte »Nenne 3 Belastungen mit Beleg«.",
                "material": "4 Stationen-Mappen (mit AB + Bildquellen + Original-Texten) · Plakat-Pappen · Stifte · LZK-Karten",
                "differenzierung": "Texte 3 Niveaus pro Station (basic/mittel/anspruch) · Wortspeicher für DaZ.",
                "lp_bezug": "KE 1 Lebens-/Arbeitsverhältnisse Arbeiterinnen+Arbeiter",
                "prinzipien_b3": ["Multiperspektivität", "Erfahrungsbezug", "Schülerorientierung"],
                "kompetenzstruktur": { "gegenstand": "Räume · Werte · Kulturen", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Erfassen · Beurteilen" },
                "didaktik": "Multiperspektivität (Bergmann2000) · Quellenarbeit (Pandel2017) · Stationenlernen (Reinhardt2005) · sprachsensibler GPG-U."
              },
              {
                "nr": 3,
                "titel": "Arbeitsbedingungen in der Fabrik · Engels-Quelle",
                "minuten": 45,
                "lernziel": "SuS analysieren konkrete Arbeitsbedingungen in einer Fabrik des späten 19. Jh. und benennen drei zentrale Belastungen.",
                "problemstellung": "5' · Audio-Atmosphäre Fabrik 1900 — Wirkung notieren. Zielangabe: »Wir untersuchen, wie der Arbeitsalltag wirklich aussah.« Arbeitsplanung: Quellenarbeit + Vergleich.",
                "problementfaltung": "22' · Quellenarbeit Friedrich Engels »Lage der arbeitenden Klasse« (1845) — gekürzter Textauszug. Markieren: Arbeitszeit · Lohn · Unfälle · Kinderarbeit.",
                "problemloesung": "10' · Tabellen-Vergleich Plenum: heutige Arbeitszeit (35-40h) vs. 1880 (12-16h pro Tag). 3 Belastungen mit Beleg im Heft.",
                "wertung": "5' · Quellenkritisch: »Engels ist Sozialist — wie verändert das die Quellenaussage?« Reliabilitäts-Reflexion.",
                "sicherung_lzk": "3' · Hefteintrag »3 Belastungen + 1 Quellenkritik-Satz« · LZK-Frage: »Was würde Engels heute kritisieren?«",
                "material": "Engels-Auszug (gekürzt + bebildert) · AB Tabelle · Audio-Atmosphäre · Hefteintrag-Schablone",
                "differenzierung": "Engels-Text in 3 Niveau-Versionen (Original / vereinfacht / mit Wortspeicher).",
                "lp_bezug": "KE 1 Arbeitsverhältnisse",
                "prinzipien_b3": ["Multiperspektivität", "Problemorientierung"],
                "kompetenzstruktur": { "gegenstand": "Ordnungssysteme · Werte", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Erfassen · Hinterfragen" },
                "didaktik": "Quellenkritik (Pandel2017) · Vergleichsmethode · historische Empathie (Rüsen2002)"
              },
              {
                "nr": 4,
                "titel": "Die Soziale Frage als Begriff",
                "minuten": 45,
                "lernziel": "SuS definieren den Begriff „Soziale Frage\" sachlich präzise und ordnen ihn in den historischen Kontext ein.",
                "problemstellung": "6' · Begriffsaktivierung: »Was sind FRAGEN im Politik-Kontext heute?« (Klimafrage · Wohnungsfrage). Zielangabe: »Wir bauen eine eigene Definition.« Arbeitsplanung: Input + Partner-Schreibarbeit.",
                "problementfaltung": "22' · Lehrkraft-Input (10'): Pauperismus · Industrialisierung · fehlende Sozialgesetzgebung. Partner-Arbeit (12'): »Lexikon-Eintrag« in eigenen Worten.",
                "problemloesung": "8' · Lexikon-Einträge gegenseitig prüfen → 3 Best-Versionen vorlesen → gemeinsame Tafel-Definition.",
                "wertung": "5' · »Welche FRAGE unserer Gegenwart wäre vergleichbar — und warum genau diese?« Aktualitätsbezug.",
                "sicherung_lzk": "4' · Definition ins Heft + LZK-Mini: »Erkläre Soziale Frage in 2 Sätzen einem Mitschüler.«",
                "material": "Tafel-Vorlage Definition · Hefteintrag-Schablone · Wortspeicher",
                "differenzierung": "Wortspeicher (Pauperismus, Industrialisierung etc.) · Vorgabe-Schreibgerüst für schwache Lerner.",
                "lp_bezug": "KE 1 Konzept Soziale Frage",
                "prinzipien_b3": ["Problemorientierung", "Aktualität", "Schülerorientierung"],
                "kompetenzstruktur": { "gegenstand": "Werte · Ordnungssysteme", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Erfassen · Reflektieren" },
                "didaktik": "Begriffsbildung · Mündigkeit-Anbahnung (Detjen2007) durch eigenständige Begriffsdefinition · Aktualitätsprinzip (Klafki1996)"
              },
              {
                "nr": 5,
                "titel": "Lösungsansätze · Genossenschaften · Gewerkschaften · Staat",
                "minuten": 45,
                "lernziel": "SuS unterscheiden drei historische Lösungsansätze zur Sozialen Frage (Selbsthilfe · Gewerkschaft · Sozialstaat) und ordnen ihnen Akteure zu.",
                "problemstellung": "5' · Aktivierende Frage: »Wenn ihr Industriearbeiter 1880 wärt — was würdet ihr tun?« Brainstorming. Zielangabe: »3 historische Antworten kennenlernen.« Jigsaw-Plan.",
                "problementfaltung": "25' · Jigsaw: Gruppe A Genossenschaften (Schulze-Delitzsch/Raiffeisen) · Gruppe B Gewerkschaft+SPD (Bebel/Lassalle) · Gruppe C Bismarcks Sozialgesetzgebung (1883-89). Experten- → Stammgruppen.",
                "problemloesung": "8' · Tabelle gemeinsam füllen: Akteur · Strategie · Reichweite. 3 Antworten klar umrissen.",
                "wertung": "5' · »Welche Strategie war am wirksamsten — und nach welchem Maßstab?« Sache vs. Werte unterscheiden.",
                "sicherung_lzk": "2' · Tabelle ins Heft übernehmen · LZK-Mini: »Ordne 3 Akteure 3 Strategien zu.«",
                "material": "3 Expertentexte (à 1 Seite) · Tabelle-Schablone · Hefteintrag-Vorlage",
                "differenzierung": "Texte 3 Niveaus · Visualisierungs-Hilfen für DaZ (Symbol Gewerkschaft, Symbol Bismarck).",
                "lp_bezug": "KE 1 Lösungsansätze Soziale Frage",
                "prinzipien_b3": ["Multiperspektivität", "Handlungsorientierung", "Problemorientierung"],
                "kompetenzstruktur": { "gegenstand": "Ordnungssysteme · Interessen", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Erfassen · Beurteilen" },
                "didaktik": "Jigsaw-Methode · Multiperspektivität · Politische Urteilsbildung (GPJE2004) · Handlungsorientierung Simulationshandeln (Reinhardt2005)"
              },
              {
                "nr": 6,
                "titel": "Bismarcks Sozialgesetzgebung — Erfolg oder Beruhigung?",
                "minuten": 45,
                "lernziel": "SuS beurteilen Bismarcks Sozialgesetzgebung kritisch und entwickeln ein Sach-/Werturteil.",
                "problemstellung": "5' · Provokationsthese: »Bismarck war ein Sozialist.« Spontan zustimmen/ablehnen — Verortung an der Tafel. Zielangabe: »Wir prüfen die These mit Quellen.« Pro/Contra-Plan.",
                "problementfaltung": "22' · Pro-Contra-Vorbereitung in 2 Gruppen mit Materialgrundlage (Bismarcks Reden + Auszüge SPD-Reaktionen). 15' Vorbereitung, 7' Debatte mit fest verteilten Rollen.",
                "problemloesung": "5' · Beobachter:innen-Bilanz: stärkstes Pro- und stärkstes Contra-Argument festhalten.",
                "wertung": "10' · 3-Stufen-Urteil im Heft: Sachebene (was geschah?) · Werte-Ebene (Maßstab Gerechtigkeit/Stabilität?) · eigene Position (begründet).",
                "sicherung_lzk": "3' · Metakognitiv: »Welches Argument hat mich überzeugt — und warum?« · LZK-Karte mit AFB-III-Urteilsfrage.",
                "material": "Material-Mappen (Pro + Contra · Reden Bismarck · Bebel-Kritik) · Urteilsraster (Sach/Wert/Position) · Beobachter-Karten",
                "differenzierung": "Rollenkarten mit Argumenten für schwache Lerner · Frei-Argumentation für starke.",
                "lp_bezug": "KE 1 Lösungsansätze + Urteilsbildung",
                "prinzipien_b3": ["Kontroversitätsgebot", "Überwältigungsverbot", "Handlungsorientierung"],
                "kompetenzstruktur": { "gegenstand": "Werte · Interessen", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Beurteilen · Reflektieren · Handeln" },
                "didaktik": "Pro-Contra-Debatte (Massing) · Politische Urteilsbildung 3-Stufen (GPJE2004) · Beutelsbacher Konsens (Kontroversitätsgebot) · Mündigkeit (Detjen2007)"
              },
              {
                "nr": 7,
                "titel": "Übergang Agrar→Industriegesellschaft am Beispiel einer Stadt",
                "minuten": 45,
                "lernziel": "SuS beschreiben den Übergang am Beispiel einer Stadt (z.B. Würzburg, Augsburg) und identifizieren Veränderungs-Indikatoren (KE 2).",
                "problemstellung": "6' · Lokaler Bezug: »Wie war Würzburg/eure Stadt 1880?« Vermutungen sammeln. Zielangabe: »Wir messen den Wandel an Indikatoren.« Arbeitsplanung: 3 Quellen analysieren.",
                "problementfaltung": "22' · Quellenarbeit: Stadtplan 1850 vs. 1900 · Bevölkerungs-Statistik 1850/1880/1900 · Beruf-Verteilung-Diagramm. Indikatoren herausarbeiten.",
                "problemloesung": "10' · Tafelbild: 4 Veränderungs-Achsen (Wachstum · Wirtschaft · Wohnen · Verkehr) mit Quellenbeleg.",
                "wertung": "4' · »Welche Veränderung ist heute ähnlich — Migration? Energiewende? Digitalisierung?« Aktualisierungsfrage.",
                "sicherung_lzk": "3' · Hefteintrag »4 Achsen mit je 1 Quellenbeleg« · LZK-Karte »Nenne 2 Indikatoren mit Beleg«.",
                "material": "Lokale Stadtkarte 1850 + 1900 (digital wenn möglich) · Statistik-AB · Indikatoren-Raster · Hefteintrag-Vorlage",
                "differenzierung": "AB Karten-Vergleich 3 Niveaus (Markieren / Vergleichen / Argumentieren).",
                "lp_bezug": "KE 2 Übergang Agrar→Industriegesellschaft",
                "prinzipien_b3": ["Erfahrungsbezug", "Aktualität", "Schülerorientierung"],
                "kompetenzstruktur": { "gegenstand": "Räume · Ordnungssysteme", "perspektive": "historisch · geographisch", "prozesskompetenz": "Erfassen · Hinterfragen" },
                "didaktik": "Lokalgeschichte (LP+ GPG-Fachprofil) · Quellenkritik (Pandel2017) · Aktualitätsprinzip · Kompetenzstrukturmodell Gegenstandsbereich »Räume« + »Zeit«"
              },
              {
                "nr": 8,
                "titel": "Vergleich Soziale Frage 1880 vs. heute",
                "minuten": 45,
                "lernziel": "SuS vergleichen die Soziale Frage des 19. Jh. mit aktuellen sozialen Spannungen (z.B. Wohnungsmangel, Niedriglohn) und entwickeln ein begründetes Sachurteil.",
                "problemstellung": "5' · Foto-Impuls aktuell: Tafel-Schlange · Working-Poor-Statistik. Zielangabe: »Vergleichen 1880 vs. heute.« Arbeitsplanung: Vergleichsmatrix in 4er-Gruppen.",
                "problementfaltung": "22' · Vergleichsmatrix: Spalten 1880/heute · Zeilen Wohnungsfrage/Lohnfrage/Arbeitszeit/Sozialschutz. Gruppen befüllen + Belege markieren.",
                "problemloesung": "8' · Plenum: Strukturelle Gemeinsamkeiten + Unterschiede zusammentragen (Tafel-Synopsis).",
                "wertung": "7' · 2-Stufen-Urteil: Sache (Was ist gleich, was anders?) · Wert (Ist die SOZIALE FRAGE überhaupt gelöst?). Schreib-Phase im Heft.",
                "sicherung_lzk": "3' · LZK-Karte AFB II: »Vergleiche 1880 vs. heute in 1 Aspekt mit Beleg« · Hefteintrag Synopsis.",
                "material": "Aktuelle Bilder + Statistiken (BMSFSJ Sozialbericht) · Vergleichsmatrix-Vorlage · Hefteintrag-Schablone",
                "differenzierung": "Statistiken in 3 Niveaus aufbereitet · Wortspeicher Sozialpolitik-Begriffe.",
                "lp_bezug": "KE 1 + KE 2 verbinden · Aktualisierungs-Auftrag LP+",
                "prinzipien_b3": ["Aktualität", "Schülerorientierung", "Multiperspektivität", "Kontroversitätsgebot"],
                "kompetenzstruktur": { "gegenstand": "Werte · Interessen", "perspektive": "sozialwissenschaftlich · historisch", "prozesskompetenz": "Beurteilen · Reflektieren" },
                "didaktik": "Aktualitätsprinzip (Klafki1996) · Lebensweltbezug · Multiperspektivität · Politische Urteilsbildung"
              },
              {
                "nr": 9,
                "titel": "Lernzielkontrolle (LNW) · alle AFB-Stufen",
                "minuten": 45,
                "lernziel": "SuS dokumentieren ihre Lernerträge in einer Lernzielkontrolle (LNW) mit Aufgaben aller AFB-Stufen.",
                "problemstellung": "4' · Struktur-Hinweis: »LNW prüft Wissen (AFB I), Methoden (II), Urteilsfähigkeit (III).« Zielangabe + Arbeitsplanung mit Zeitvorgaben.",
                "problementfaltung": "28' · LNW schreiben: AFB I (Beschreiben Lebensverhältnisse) · AFB II (Vergleich 1880-heute) · AFB III (Urteil Bismarck — Erfolg oder Beruhigung?).",
                "problemloesung": "5' · Selbsteinschätzungsbogen ausfüllen (»Was kann ich? Wo brauche ich mehr Zeit?«).",
                "wertung": "4' · »Welche Aufgabe war für mich am anspruchsvollsten — und warum?« — metakognitives Mini-Urteil.",
                "sicherung_lzk": "4' · Aufgaben einsammeln · Plenum: Diagnose-Sammlung an Tafel (welche Aufgaben-Typen brauchen Wiederholung).",
                "material": "LNW-Aufgabenbogen · Selbsteinschätzungsbogen · Hefteintrag-Schablone",
                "differenzierung": "LNW in 2 Niveaus (Regel + erhöht) · Wortspeicher für DaZ.",
                "lp_bezug": "KE 1 + KE 2 + KE 3 (Kriegsschuld als Anknüpfung) — Sequenz-Sicherung",
                "prinzipien_b3": ["Kompetenzorientierung", "Schülerorientierung"],
                "kompetenzstruktur": { "gegenstand": "Werte · Ordnungssysteme", "perspektive": "historisch · sozialwissenschaftlich", "prozesskompetenz": "Erfassen · Beurteilen · Reflektieren" },
                "didaktik": "Veränderte Leistungsmessung · Kompetenzorientierung · AFB-Stufung KMK · Selbst-Regulation (Schraw)"
              },
              {
                "nr": 10,
                "titel": "Transfer · Handlungsplan zur Gegenwart",
                "minuten": 45,
                "lernziel": "SuS reflektieren das Sequenz-Lernen und entwickeln eigene Handlungsoptionen zur sozialen Frage heute.",
                "problemstellung": "5' · Sequenz-Rückblick: SuS nennen das wichtigste Wort. Zielangabe: »Wir entwickeln eigene Handlungsoptionen.« Plan: Stationen + Schreibphase.",
                "problementfaltung": "20' · Stationenrundgang: jede Station 1 Sequenz-Aspekt (Lebensverhältnisse / Lösungsansätze / Bismarck / Gegenwart). SuS schreiben spontane Reflexionen + sammeln Anhaltspunkte für eigenes Handeln.",
                "problemloesung": "8' · Handlungsplan-Schreiben: »Eine soziale Frage von heute — und 1 Schritt, den ICH gehen kann.« Schreibvorlage.",
                "wertung": "8' · Pinnwand-Galerie anonym: Welche Pläne wirken realistisch? Welche überzeugen — Position + Begründung.",
                "sicherung_lzk": "4' · Eigener Plan ins Heft · LZK-Mini: »Was kann ich heute, was ich vor der Sequenz nicht konnte?« (Lernzuwachs).",
                "material": "Stationen-Plakate · Reflexions-Sticker · Pinnwand · Handlungsplan-Vorlage",
                "differenzierung": "Handlungsplan in 3 Komplexitäts-Stufen (1 Satz / 1 Plan / 1 Aktion).",
                "lp_bezug": "KE 1+2 Sequenz-Abschluss · Aktualisierungs-Auftrag",
                "prinzipien_b3": ["Handlungsorientierung", "Schülerorientierung", "Aktualität"],
                "kompetenzstruktur": { "gegenstand": "Interessen · Werte", "perspektive": "sozialwissenschaftlich", "prozesskompetenz": "Beurteilen · Reflektieren · Handeln" },
                "didaktik": "Demokratie-Lernen (Himmelmann2001: Lebensform-Dimension) · Handlungsorientierung Realhandeln (Reinhardt2005) · Mündigkeit (Detjen2007) · SRL (Self-Regulated Learning, Schraw)"
              }
            ],
            "bezuege_global": [
              {
                "didaktik": "Beutelsbacher Konsens (Beutelsbach1976)",
                "verweis": "Überwältigungsverbot: keine eindeutige LK-Position zu Bismarck (UE 6). Kontroversitätsgebot: Pro-Contra-Debatte. Schülerorientierung: Anschluss an Lebenswelt (UE 8)."
              },
              {
                "didaktik": "Politische Urteilsbildung 3-Stufen (GPJE2004)",
                "verweis": "3-Stufen-Urteil (Sachebene · Werte-Ebene · eigene Position) in UE 6 + LNW UE 9. Politische Urteilskompetenz als Kern-Kompetenz GPJE-Standards."
              },
              {
                "didaktik": "Aktualitätsprinzip (Klafki1996)",
                "verweis": "Klafki kategoriale Bildung: historische Inhalte nur dann bildend, wenn sie zur Gegenwart sprechen. UE 8 (Vergleich heute) macht das explizit. UE 10 Transfer."
              },
              {
                "didaktik": "Multiperspektivität (Bergmann2000)",
                "verweis": "UE 2: 4 Stationen geben 4 Sichtweisen. UE 5: Jigsaw mit drei Akteur-Perspektiven (Genossenschaft · Gewerkschaft · Staat). UE 6: Pro-Contra-Rollen."
              },
              {
                "didaktik": "Demokratie-Lernen (Himmelmann2001)",
                "verweis": "UE 6 Pro-Contra-Debatte als Demokratie-Erfahrung (Lebensform-Dimension). UE 10 Handlungsplan als Mitwirkung-Anbahnung. Lernende als demokratische Bürger:innen."
              },
              {
                "didaktik": "Quellenkritik (Pandel2017)",
                "verweis": "UE 3 Engels-Auszug · UE 7 lokale Stadtkarte 1850/1900. Quellengattung benennen + Aussage prüfen + Bedeutung einordnen."
              },
              {
                "didaktik": "Lebensweltbezug (Klafki1996)",
                "verweis": "UE 1 Standbilder eigener Erfahrung · UE 7 lokale Stadt · UE 8 aktuelle soziale Fragen. Klafki: Inhalte über Schüler-Lebenswelt erschließen."
              },
              {
                "didaktik": "Sprachsensibler GPG (LPplusGPG)",
                "verweis": "Wortspeicher pro UE für DaZ + Niveau-Differenzierung. LP+ Bayern Fachprofil GPG: Sprachsensibilität als Querschnittsaufgabe."
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
