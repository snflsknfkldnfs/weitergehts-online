// LB-Matrix Sport MS Bayern · LP+-konform · zitierfähig · v1
//
// ARCHITEKTUR
// ────────────────────────────────────────────────────────────────────────
// Sport folgt einer SPIRALCURRICULAREN Logik (NICHT GPG-Lernbereich-Matrix):
// die sportlichen Handlungsfelder wiederholen sich mit wachsender Komplexität
// (Technik → Taktik → Anwendung) über Jgst. 5-10.
//
// BAYERN-SPEZIFIK (LehrplanPLUS MS Sport · ISB)
//   4 GEGENSTANDSBEREICHE
//     · Sportliche Handlungsfelder
//     · Gesundheit und Fitness
//     · Fairness, Kooperation, Selbstkompetenz
//     · Freizeit und Umwelt
//   6 SPORTLICHE HANDLUNGSFELDER
//     · Leichtathletik · Schwimmen · Kleine Spiele und Sportspiele ·
//       Turnen und Bewegungskünste · Gymnastik und Tanz · Wintersport
//   6 PROZESSBEZOGENE KOMPETENZEN
//     · Leisten · Gestalten · Spielen ·
//       Wahrnehmen, analysieren, bewerten ·
//       Entscheiden, handeln, verantworten ·
//       Kooperieren, kommunizieren, präsentieren
//
// SPALTEN-MAPPING in dieser Matrix
//   LA   Leichtathletik (Handlungsfeld)
//   SC   Schwimmen (Handlungsfeld)
//   SP   Kleine Spiele und Sportspiele (Handlungsfeld)
//   TU   Turnen und Bewegungskünste (Handlungsfeld)
//   GT   Gymnastik und Tanz (Handlungsfeld)
//   FAIR Fairness, Kooperation, Selbstkompetenz (Gegenstandsbereich · Querschnitt)
//   GES  Gesundheit und Fitness (Gegenstandsbereich · Querschnitt)
//
// ZEILEN: Jgst 5, 6, 7, 8, 9, 10 (M-Zug)
//
// PHASEN-STANDARD — KORRIGIERT 28.05.2026 nach Auswertung Bausteinskripte AG MS-Sem.-Unterfranken
//
//   VERBINDLICH BAYERN-UNTERFRANKEN = 3-PHASEN-MODELL nach HOFMANN, SR
//   (Bausteinskript SP GB Kap. 8 "Strukturmodell einer Sportstunde")
//   Bestätigt verbatim in SP B2 (Schwimmen) Kap. 1: "Schwimmen ist wie jeder andere
//   Sportunterricht in drei Phasen gegliedert."
//
//   3 HAUPTPHASEN:
//   1 AUFWÄRMPHASE      (8-10 min · Doppelstd. bis 15 min)
//     1.1 allgemeine Erwärmung (HK-Aktivierung, mobilisierend, abwechslungsreich)
//     1.2 spezielle Erwärmung  (auf thematischen Schwerpunkt ausgerichtet)
//   2 HAUPTPHASE/ERARBEITUNG (ca. 25 min · Doppelstd. 2 Schwerpunkte à 30 min)
//     Stundentypen Hofmann: Sammeln Bewegungserfahrung · Konditionsschulung ·
//     Neuerwerb Bewegungsfertigkeiten · Üben+Festigen · Gestalten+Anwenden
//   3 SCHLUSSTEIL/AUSKLANG (5 min · Doppelstd. 10 min)
//     Beruhigung, Fehlerbesprechung, Lernzielkontrolle, Hygiene
//
//   OPERATIVE 7-SUB-PHASEN-FEINGLIEDERUNG (sekundär · Verfeinerung der 3 Hofmann-Phasen
//   aus Aufwärm-Sub-Stufung + Meinel/Schnabel-Bewegungslernen-Logik + UV-Empirie):
//   ─────────────────────────────────────────────  ─────────────────────────
//   1 Begrüßung (Anwesenheit · Schmuck · Zielangabe)            HOFMANN 1 Stundeneröffnung
//   2 Allgemeines Aufwärmen (HK-Aktivierung · mobilisierend)    HOFMANN 1.1
//   3 Spezifisches Aufwärmen (sportartspezifisch)               HOFMANN 1.2
//   4 Erarbeitung (Bewegungslernen · Demo · Knotenpunkte)       HOFMANN 2 (Neuerwerb)
//   5 Übung / Stationsbetrieb (Festigung · MÜR)                 HOFMANN 2 (Üben+Festigen)
//   6 Anwendung / Spielform (variable Verfügbarkeit · MSR)      HOFMANN 2 (Gestalten+Anwenden)
//   7 Ausklang / Reflexion (Cool-down · Verbalisierung · Abbau) HOFMANN 3
//
//   Phasen-Slot-Mapping (7 Slots im Datenmodell · operative Feingliederung):
//     s1_begruessung       → Sub-Phase 1 (Hofmann 1 Eröffnung)
//     s2_aufwaermen_allg   → Sub-Phase 2 (Hofmann 1.1 allg. HK-Aktivierung)
//     s3_aufwaermen_spez   → Sub-Phase 3 (Hofmann 1.2 sportartspezifische Vorbereitung)
//     s4_erarbeitung       → Sub-Phase 4 (Hofmann 2 · Demo · Grobform)
//     s5_uebung            → Sub-Phase 5 (Hofmann 2 · Stationsbetrieb/MÜR)
//     s6_anwendung         → Sub-Phase 6 (Hofmann 2 · Spielform/MSR)
//     s7_ausklang          → Sub-Phase 7 (Hofmann 3)
//
//   Wichtige Bausteinskript-Warnung (HOFMANN GB Kap. 8, sinngemäss; Söll-äquivalent):
//   "Negatives Attraktivitätsgefälle" vermeiden — die SPEZIFISCHE Erwärmung (Sub-Phase 3)
//   ist NICHT als attraktives Spiel zu gestalten, sondern als sportartspezifische
//   Vorbereitung der Schwerpunkt-Bewegung. Sonst überstrahlt Aufwärmen den Schwerpunkt.
//
// WEITERE BAUSTEINSKRIPT-INHALTE (B6/B7/GB Kap. 5-7):
//   - GB Kap. 5: 4 Methoden-Grundkonzeptionen (deduktiv/induktiv × analytisch-synth/ganzheitlich)
//   - GB Kap. 6: 7 Intensivierungs-Wege (organisatorisch · Zusatzaufgaben · Circuit ·
//                rhythmische Reihen · vielfältige Lehrwege · methodische Spruenge · Leistung)
//   - GB Kap. 7: 6 Merkmale "guten" Sportunterrichts (AK Sport 2011)
//   - B6: Großtrampoline NICHT zulässig · Schmuck ablegen · schulsportgerechte Brille ·
//         LK als Erste:r/Letzte:r · Sicht-/Funktionsprüfung Geräte · Stop-Signal
//   - B7: 3-Achsen-Beurteilung (Können · Lernverhalten · Lernfortschritt) ·
//         LASPO "2 praktische + 1 nicht-praktischer LNW pro HJ" ·
//         DSU-Note-Formel (BSU×2 + DSU) : 3 ·
//         MSO § 15 Abs. 2 S. 2: Sport ist KEIN Vorrückungsfach!
//
// LERNZIELE 3-DIMENSIONAL (Mager-konform, Sport-spezifisch)
//   - motorisch  (konkrete Bewegungshandlung + Erfolgs-Kriterium)
//   - kognitiv   (Bewegungsverständnis: Phasenmerkmale, Biomechanik)
//   - sozial     (Kooperation, Fairplay, Helfen + Sichern)
//
// PILOT-SEQUENZ: LB 4.3 Sportspiele · Jgst. 7 · »Handball-Schlagwurf«
//   · 9-UE-Sequenz Realbezug GPG7c SJ 25/26 + idealtypische Erweiterung
//   · Schwerpunktstunde: UE 5 BUV »Jahrmarkt« Schlagwurf-Präzision (Stationsbetrieb)
//   · Hallenplan + Helfer-/Sicherungskonzept dokumentiert
//
// QUELLEN
//   PRIMÄR · BAYERN-UNTERFRANKEN-BAUSTEINSKRIPTE (Hofmann SR · AG MS-Sem.-Unterfranken)
//   · SP GB Grundsätze eines zeitgemäßen Sportunterrichts (8 Kap.)
//     PDF: Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/Sport Ressourcen/
//          Sport_Bausteinskripte/SP GB Grundsätze eines zeitgemäßen Sportunterrichts.pdf
//   · SP B1 Werfen/Springen/Laufen — Leichtathletik
//   · SP B2 Sich im Wasser bewegen — Schwimmen
//   · SP B3 Spielen und Wetteifern mit + ohne Ball (Kleine Spiele + 4 Sportspiele FB/HB/BB/VB)
//   · SP B4 Sich an + mit Geräten bewegen — Turnen + Bewegungskünste
//   · SP B5 Sich körperlich ausdrücken und Bewegung gestalten — Gymnastik + Tanz
//   · SP B6 Sicherheit im Sportunterricht (5 Kap.: Sportstätten/Geräte · Kleidung · Aufsicht · Inhalte · Lit.)
//   · SP B7 Leistungsmessung und Leistungsbeurteilung
//   · LehrplanPLUS Bayern Mittelschule Sport (ISB)
//   · User-eigene UV-Artikulation (19.12.2022 · Sport 7 Handball Sprungwurf · Lehrprobe Stud-Sem. Unterfranken)
//     PDF: Unterrichtseinwicklung/Repsitory Unterrichtsmaterial/Einzuordnen/
//          Schulmaterial_Neu_Strukturiert/Sport/Klasse_7/7. Klasse/Handball/Sprungwurf/
//          Artikulation Sport 7 Handball Sprungwurf (UV).pdf
//   · KMBek Sicherheits-Bestimmungen Schulsport (08.04.2003)
//   · KMBek Sicherheit in Schule + Schülerunfallversicherung (11.12.2002)
//   · KUVB Bayern (Helferkonzept · Helfergriffe · Sicherheits-Veröffentlichungen)
//   · MSO § 15 Abs. 2 S. 2 (Sport ist KEIN Vorrückungsfach)
//   · LASPO Bayer. Landesstelle Schulsport — Bewertungstabellen LA + Schwimmen
//   SEKUNDÄR (ergänzende fachdidaktische Anker · NICHT im Bayern-Unterfranken-Bausteinskript zentral)
//   · Söll, W. (2019): Sportunterricht — sportunterrichten. Schorndorf: Hofmann, 10. Aufl.
//     (NICHT im Bausteinskript Hofmann SR zitiert — nur als überregional verträgliche Theorie-Quelle)
//   · Kurz, Dietrich (1990 ff.): 6 Pädagogische Perspektiven (NRW-/Bundes-Tradition, im Bausteinskript NICHT zentral)
//   · Meinel, K. / Schnabel, G. (2018): Bewegungslehre — Sportmotorik. Aachen: Meyer & Meyer (Klassiker)
//   · Größing, S. (2007): Einführung in die Sportdidaktik. Wiebelsheim: Limpert.
//   · Roth, K. / Memmert, D. (Hg.): Ballschule Heidelberg — Spielerische Sportförderung.
//   · Garreis/Krug/Wolf (1997) Sportstunden mit Pfiff
//   · Dill et al. (2001) Die Fundgrube für den Sport-Unterricht
//   · Fetz (1996) · Erdmann (2007) · Miethling (1999) — Leistungsbeurteilungs-Klassiker
//   · Jahresplanung_Sport7_2025-26.md (eigene Praxis Sm7abc)
//   · Sequenzplan_Handball_7abc_2025-26.md (Pilot-Material verbatim)
//   · Sport_Anleitungen/Anleitung zur TUV-Erstellung Sport (Sm8ab).md
//   · Sport_BUV_Entwicklung/ROLE_Sport_BUV_Unterrichtsentwicklung_Berater.md

window.MATRIX = {
  fach: 'D Sport',
  fachKuerzel: 'Sport',
  schulart: 'Mittelschule Bayern · Erziehung im + durch Sport',

  meta: {
    version: 'v1.3 · 2026-05-28 · Sport-Spiral · KORRIGIERT auf 3-Phasen-Hofmann (Bausteinskript Bayern-Unterfranken) als VERBINDLICHEN Rahmen + 7-Sub-Phasen-Feingliederung als operative Verfeinerung · Primärquelle: Bausteinskripte AG MS-Sem.-Unterfranken (Hofmann SR) GB+B6+B7 + User-eigene UV-Artikulation (19.12.2022, Sprungwurf)',
    spaltenLogik: 'Sportliche Handlungsfelder (Leichtathletik · Schwimmen · Kleine Spiele und Sportspiele · Turnen und Bewegungskünste · Gymnastik und Tanz) + Gegenstandsbereiche Fairness/Kooperation/Selbstkompetenz und Gesundheit/Fitness als Querschnitt. LehrplanPLUS Bayern MS Sport.',
    quellenLogik: 'verbatim für LehrplanPLUS Jgst. 7 (Jahresplanung_Sport7_2025-26 · eigene Quelle) + Pilot Handball (Sequenzplan-MD verbatim). Phasenstruktur primaer aus Bausteinskript Hofmann SR GB Kap. 8 (3-Phasen-Modell verbindlich Bayern-Unterfranken) · UV-Artikulation Sprungwurf als empirischer Praxis-Beleg. Sekundaer für andere Jgst (Anleitungen + KMK-Anker).',
    pilotSequenz: 'Handlungsfeld Kleine Spiele und Sportspiele · Jgst. 7 · Handball-Sequenz · 9 UEs · Schwerpunktstunde UE 5 Schlagwurf-Präzision (BUV »Jahrmarkt«) mit Hallenplan + Helferkonzept · 3-Phasen-Hofmann mit 7-Sub-Stufung.',
    fachdidaktikStandard: 'VERBINDLICH Bayern-Unterfranken-MS-LAA: Bausteinskripte AG MS-Sem.-Unterfranken Hofmann SR (SP GB + B1-B7). 3-Phasen-Hauptmodell (Aufwärm/Haupt/Ausklang) verbindlich; 7-Sub-Phasen-Feingliederung operativ aus Aufwärm-Sub-Stufung + Meinel/Schnabel + UV-Empirie. Söll 2019 + Kurz-6-Perspektiven sind SEKUNDÄR (NICHT im Bausteinskript zentral!). Praxis-Anker: User-eigene UV-Artikulation (19.12.2022, Sport 7 Handball Sprungwurf, Lehrprobe Studienseminar Unterfranken). Erganzend: LehrplanPLUS Bayern MS Sport (ISB) + Meinel/Schnabel Bewegungslehre + Anleitung TUV Sm8ab + ROLE_Sport_BUV (Qualitätskriterien: Sachanalyse + Didaktische Reduktion + Methodische Analyse + Stundenskizze + Hallenplan + Helferkonzept + Sicherheit/KUVB).',
    bayernKanon: {
      gegenstandsbereiche: [
        'Sportliche Handlungsfelder',
        'Gesundheit und Fitness',
        'Fairness, Kooperation, Selbstkompetenz',
        'Freizeit und Umwelt',
      ],
      sportliche_handlungsfelder: [
        'Leichtathletik',
        'Schwimmen',
        'Kleine Spiele und Sportspiele',
        'Turnen und Bewegungskünste',
        'Gymnastik und Tanz',
        'Wintersport',
      ],
      prozessbezogene_kompetenzen: [
        'Leisten',
        'Gestalten',
        'Spielen',
        'Wahrnehmen, analysieren, bewerten',
        'Entscheiden, handeln, verantworten',
        'Kooperieren, kommunizieren, präsentieren',
      ],
      warnung_nrw_diktion: 'Bayern hat KEINE »Pädagogischen Perspektiven P1-P6« (das ist NRW). Bayern arbeitet mit prozessbezogenen Kompetenzen + Gegenstandsbereichen + sportlichen Handlungsfeldern.',
    },
  },

  jgst: [
    { id: 'J5',  label: 'Jgst. 5' },
    { id: 'J6',  label: 'Jgst. 6' },
    { id: 'J7',  label: 'Jgst. 7' },
    { id: 'J8',  label: 'Jgst. 8' },
    { id: 'J9',  label: 'Jgst. 9' },
    { id: 'J10', label: 'Jgst. 10 (M)' },
  ],

  // Sportliche Handlungsfelder + Querschnitts-LB
  lernbereiche: [
    { id: 'LA',  titel: 'LA · Leichtathletik',  kurz: 'Laufen · Springen · Werfen' },
    { id: 'SC',  titel: 'SC · Schwimmen',        kurz: 'Sich im Wasser bewegen' },
    { id: 'SP',  titel: 'SP · Sportspiele',      kurz: 'Spielen + Wetteifern' },
    { id: 'TU',  titel: 'TU · Turnen',           kurz: 'An + mit Geräten bewegen' },
    { id: 'GT',  titel: 'GT · Gymnastik + Tanz', kurz: 'Körperlich ausdrücken' },
    { id: 'FAIR',titel: 'FAIR · Fairness',       kurz: 'Querschnitt: Kooperation · Selbst' },
    { id: 'GES', titel: 'GES · Gesundheit',      kurz: 'Querschnitt: Fitness · Wohlbefinden' },
  ],

  // Gegenstandsbereiche LehrplanPLUS Bayern MS Sport (4 Bereiche)
  // Lösen die NRW-»Pädagogischen Perspektiven P1-P6« ab — Bayern hat diese nicht.
  gegenstandsbereiche: [
    { label: 'Sportliche Handlungsfelder',            kurz: 'Leichtathletik · Schwimmen · Kleine Spiele und Sportspiele · Turnen und Bewegungskünste · Gymnastik und Tanz · Wintersport' },
    { label: 'Gesundheit und Fitness',                kurz: 'Körperbewusstsein · Belastung · Lebensführung · Aufwärmen · Ernährung' },
    { label: 'Fairness, Kooperation, Selbstkompetenz', kurz: 'Fairplay · Teamrollen · Konfliktlösung · Helfen und Sichern · Verantwortung' },
    { label: 'Freizeit und Umwelt',                   kurz: 'Sport im Verein · in der Natur · lebenslang · Bewegung in der Lebenswelt' },
  ],

  // Prozessbezogene Kompetenzen (LehrplanPLUS Bayern MS Sport · 6er-Modell · verbatim)
  prozesskompetenzen: [
    { label: 'Leisten',                                 kurz: 'Sportliches Handeln zu Gütekriterien setzen · Erfolg/Misserfolg verarbeiten' },
    { label: 'Gestalten',                               kurz: 'Bewegungen variantenreich · kreativ · individuell einsetzen' },
    { label: 'Spielen',                                 kurz: 'Mit Ungewissheit umgehen · Spielregeln anpassen' },
    { label: 'Wahrnehmen, analysieren, bewerten',       kurz: 'Körper · Bewegung · Umgebung differenziert wahrnehmen und beurteilen' },
    { label: 'Entscheiden, handeln, verantworten',      kurz: 'Sach- und situationsgerechte Entscheidungen treffen und verantworten' },
    { label: 'Kooperieren, kommunizieren, präsentieren', kurz: 'Fair verhalten · zielgerichtet kommunizieren · sportliche Ergebnisse präsentieren' },
  ],

  cells: {
    // ─── J5 ─────────────────────────────────────────────────────────────
    'J5_LA': { ke_anzahl: 1, jgst: 'J5', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-LA-01', thema: 'Grundbewegungen Laufen + Springen + Werfen',
          ke_wortlaut: 'erfahren Grundbewegungen Laufen, Springen und Werfen spielerisch und in vereinfachten Wettkampfformen.',
          ke_wortlaut_quelle: 'LP+ Bayern MS Sport · Jgst. 5 · sekundaer (Sport-Anleitungen)',
          inhalte_lp: ['Sprintspiele · Schlagball-Weitwurf · Weitsprung Zonenmessung · einfache Staffeln'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_SC': { ke_anzahl: 1, jgst: 'J5', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-SC-01', thema: 'Wassersicherheit + erste Schwimmart',
          ke_wortlaut: 'bewegen sich sicher im Wasser und erlernen eine erste Schwimmart in der Grobform.',
          ke_wortlaut_quelle: 'LP+ Bayern MS Sport · Jgst. 5 · sekundaer',
          inhalte_lp: ['Baderegeln · Wassergewöhnung · Auftrieb · 1. Schwimmart Grobform · Schwimmabzeichen-Anbahnung'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_SP': { ke_anzahl: 1, jgst: 'J5', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-SP-01', thema: 'Kleine Spiele · Fang- und Wurfspiele',
          ke_wortlaut: 'spielen Kleine Spiele mit einfachen Regeln und entwickeln Grundtechniken Fangen + Werfen.',
          ke_wortlaut_quelle: 'LP+ Sport · Jgst. 5 · sekundaer',
          inhalte_lp: ['Kleine Spiele · Fangspiele · Ballspiele mit reduzierten Regeln · Goalchaball-Anbahnung'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_TU': { ke_anzahl: 1, jgst: 'J5', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-TU-01', thema: 'Bewegungslandschaften + Grundfertigkeiten',
          ke_wortlaut: 'bewegen sich vielfältig in Bewegungslandschaften und entwickeln Grundfertigkeiten an Geräten.',
          ke_wortlaut_quelle: 'LP+ Sport · Jgst. 5 · sekundaer',
          inhalte_lp: ['Bewegungslandschaften (Kletterstangen · Matten · Reck) · Rolle vorwärts · Sprung in den Stütz · Helfen + Sichern (Anbahnung)'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_GT': { ke_anzahl: 1, jgst: 'J5', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GT-01', thema: 'Rhythmische Bewegungsformen',
          ke_wortlaut: 'bewegen sich rhythmisch zu Musik und gestalten kurze Bewegungsfolgen.',
          ke_wortlaut_quelle: 'LP+ Sport · Jgst. 5 · sekundaer',
          inhalte_lp: ['Grundrhythmen · einfache Bewegungsfolgen · Kreistänze · Rope Skipping (Anbahnung)'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_FAIR': { ke_anzahl: 1, jgst: 'J5', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-FAIR-01', thema: 'Spielregeln einhalten + erste Selbstreflexion',
          ke_wortlaut: 'akzeptieren Spielregeln und reflektieren Sieg + Niederlage in einfachen Spielformen.',
          ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
          inhalte_lp: ['Regelverständnis · Konfliktlösung erste Schritte · Sieg/Niederlage'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },
    'J5_GES': { ke_anzahl: 1, jgst: 'J5', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GES-01', thema: 'Sportkleidung + Aufwärmen',
          ke_wortlaut: 'kennen die Bedeutung von Sportkleidung und Aufwärmen für Sicherheit und Leistung.',
          ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
          inhalte_lp: ['Sportkleidung · Hygiene · Aufwärmen · einfache Dehnübungen'],
          fundort: 'Sport-Anleitungen Jgst. 5' },
      ],
    },

    // ─── J6 ─────────────────────────────────────────────────────────────
    'J6_LA': { ke_anzahl: 1, jgst: 'J6', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-LA-01', thema: 'Technikgrundlagen LA', ke_wortlaut: 'entwickeln Techniken im Sprint (50 m), Weitwurf und Weitsprung weiter.', ke_wortlaut_quelle: 'LP+ Sport · sekundaer', inhalte_lp: ['Sprint mit Tiefstart-Anbahnung · Weitwurf · Weitsprung Zonenmessung'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_SC': { ke_anzahl: 1, jgst: 'J6', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-SC-01', thema: 'Schwimmart vertiefen', ke_wortlaut: 'schwimmen die erste Schwimmart sicher und bewältigen Distanzen bis 25 m.', ke_wortlaut_quelle: 'LP+ Sport · sekundaer', inhalte_lp: ['Brust- oder Kraulschwimmen sicher · 25 m am Stück · Schwimmabzeichen Bronze'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_SP': { ke_anzahl: 1, jgst: 'J6', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-SP-01', thema: 'Mannschaftsspiele Hinführung', ke_wortlaut: 'spielen Mannschaftsspiele mit grundlegenden taktischen Elementen.', ke_wortlaut_quelle: 'LP+ Sport · sekundaer', inhalte_lp: ['Goalchaball · Brennball · einfache Ballhandlungs-Techniken · Abwehr/Angriff (Anbahnung)'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_TU': { ke_anzahl: 1, jgst: 'J6', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-TU-01', thema: 'Erste Geräte-Elemente', ke_wortlaut: 'turnen an Geräten erste Elemente und wenden Hilfestellung selbstständig an.', ke_wortlaut_quelle: 'LP+ Sport · sekundaer', inhalte_lp: ['Rolle rückwärts · Sprung (Bock/Kasten) · Hüftaufschwung Reck (Anbahnung) · Helfen + Sichern fest'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_GT': { ke_anzahl: 1, jgst: 'J6', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-GT-01', thema: 'Bewegungsgestaltung mit Handgerät', ke_wortlaut: 'gestalten Bewegungen mit einem Handgerät zu Musik.', ke_wortlaut_quelle: 'LP+ Sport · sekundaer', inhalte_lp: ['Reifen · Ball · Seil · einfache Choreografien'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_FAIR': { ke_anzahl: 1, jgst: 'J6', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-FAIR-01', thema: 'Konfliktlösung im Spiel', ke_wortlaut: 'lösen Konflikte im Spiel konstruktiv und übernehmen Verantwortung im Team.', ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB', inhalte_lp: ['Konfliktmoderation · Teamrollen · Verantwortung für Mitspielende'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },
    'J6_GES': { ke_anzahl: 1, jgst: 'J6', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J6-GES-01', thema: 'Ausdauer-Anbahnung', ke_wortlaut: 'führen ausdauernde Belastungen über mindestens 8 min durch.', ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB', inhalte_lp: ['Laufen 8 min · Ausdauer-Erfahrung · Pulsmessen (Anbahnung)'], fundort: 'Sport-Anleitungen Jgst. 6' }],
    },

    // ─── J7 (Realbezug Sm7abc · verbatim aus Jahresplanung) ─────────────
    'J7_LA': { ke_anzahl: 1, jgst: 'J7', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-LA-01', thema: 'LA-Techniken erweitern + Wettkampf',
        ke_wortlaut: 'erweitern Erfahrungen im Sprint, Weitwurf, Hoch- und Weitsprung mit Anlauf und wenden Grundregeln der LA-Wettkämpfe an.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        inhalte_lp: ['Sprint 50/75 m · Schlagballwurf · Hochsprung (Flop) · Weitsprung · Staffel'],
        fundort: 'Jahresplanung_Sport7_2025-26.md' }],
    },
    'J7_SC': { ke_anzahl: 1, jgst: 'J7', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-SC-01', thema: 'Zweite Schwimmart + Gesundheit',
        ke_wortlaut: 'schwimmen unter gesundheitlichen Aspekten, bewältigen Strecken bis 50 m in hohem Tempo, bewältigen die Gesamtkoordination einer zweiten Schwimmart in der Grobform und erfüllen Bedingungen für ein Schwimmabzeichen.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        ke_wortlaut_anker: ['gesundheitlichen Aspekten', '50 m in hohem Tempo', 'zweiten Schwimmart', 'Grobform', 'Schwimmabzeichen'],
        inhalte_lp: ['Gesundheitsaspekte (Auftrieb · Rückenlage · Aqua-Jogging) · Schnelligkeit · 2. Schwimmart · Synchronschwimmen · Abzeichen'],
        fundort: 'Jahresplanung_Sport7_2025-26.md · KW 43-11' }],
    },
    'J7_SP': { ke_anzahl: 2, jgst: 'J7', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J7-SP-01', thema: '★ Sportspiel-Techniken Handball/Fußball + Individualtaktik',
          ke_wortlaut: 'verwenden sportartspezifische Techniken im Handball und Fußball zur Lösung spielnaher Situationsaufgaben, wenden individualtaktische Verhaltensweisen gezielt an und fügen diese zu gruppentaktischen Grundstrukturen zusammen.',
          ke_wortlaut_quelle: 'Sequenzplan_Handball_7abc_2025-26 · verbatim LP+',
          ke_wortlaut_anker: ['sportartspezifische Techniken', 'Handball', 'spielnaher Situationsaufgaben', 'individualtaktische Verhaltensweisen', 'gruppentaktischen Grundstrukturen'],
          inhalte_lp: ['Handball: Stoppen (Sternschritt) · Prellen · Passen · Schlagwurf · Sprungwurf · Anbieten · Freilaufen · Decken · Goalchaball', 'Fußball: Dribbling · An-/Mitnahme · Kurzpass · Torschuss', 'Badminton · Tchoukball (Querverweis)'],
          fundort: 'Sequenzplan_Handball_7abc_2025-26.md',
          umsetzung_typ: 'real',
          umsetzung_titel: 'Sequenz Handball Sm7abc (KW 39/2025 - KW 10/2026 · 8 UEs + BUV + LP)',
          umsetzung_klasse: 'GPG7c Sm7abc',
          umsetzung_datum: 'KW 39/2025 - KW 10/2026',
          pilot_sequenz: {
            titel: '9-UE-Sequenz Handball · Schwerpunkt Schlagwurf-Präzision',
            praxis: 'Eigene Praxis Sm7abc SJ 25/26 verbatim + BUV-Standard',
            gesamtzeit: '9 UEs à 45 min = 6,75 Zeitstunden',
            phasenStandard: '3-Phasen-Modell nach HOFMANN (Bausteinskript SP GB Kap. 8, AG MS-Sem.-Unterfranken — VERBINDLICH Bayern-Unterfranken-MS-LAA): Aufwärmphase (mit Sub-Stufung 1.1 allg + 1.2 spez. Erwärmung) · Hauptphase/Erarbeitungsphase (Stundentypen: Sammeln · Konditionsschulung · Neuerwerb · Üben+Festigen · Gestalten+Anwenden) · Schlussteil/Ausklang. Operative 7-Sub-Phasen-Feingliederung (Begrüßung · allg. Aufwärmen · spez. Aufwärmen · Erarbeitung · Übung/Stationsbetrieb · Anwendung/Spielform · Ausklang) als Verfeinerung aus Aufwärm-Sub-Stufung + Meinel/Schnabel-Bewegungslernen + UV-Empirie. Söll 2019 verträglich, aber NICHT im Bausteinskript zitiert.',
            qualitaetsstandards_quelle: 'Primärquelle: User-eigene UV-Artikulation (19.12.2022, Sport 7 Handball Sprungwurf, Lehrprobe Studienseminar Unterfranken) · Söll, W. (2019) Sportunterricht — sportunterrichten (Hofmann, 10. Aufl.) · Meinel/Schnabel Bewegungslehre · LehrplanPLUS Bayern MS Sport (ISB)',
            sequenz_meta: {
              lehrplanbezug: 'Sport Jgst. 7 · Handlungsfeld Kleine Spiele und Sportspiele (Handball) · Querverweise Gegenstandsbereiche Fairness, Kooperation, Selbstkompetenz + Gesundheit und Fitness',
              kompetenzerwartungen_verbatim: [
                'Die Schülerinnen und Schüler verwenden sportartspezifische Techniken im Handball zur Lösung spielnaher Situationsaufgaben.',
                'Die Schülerinnen und Schüler wenden individualtaktische Verhaltensweisen im Handball gezielt an und fügen diese zu gruppentaktischen Grundstrukturen zusammen.',
                'Die Schülerinnen und Schüler beschreiben einfache sportartspezifische Bewegungsmerkmale fachgerecht und setzen diese bei ihrer sportlichen Betätigung um.',
                'Die Schülerinnen und Schüler würdigen den Fairplay-Gedanken als übergeordnetes Ziel.',
              ],
              inhalte_lp_verbatim: [
                'Passen · Fangen · Prellen · Stoppen (Sternschritt) · Schlagwurf · Sprungwurf',
                'Anbieten · Freilaufen · Decken · Positionswechsel',
                'Goalchaball als Hinführungs-Spielform',
                'Handball 7v7 als Anwendungs-Spielform',
              ],
              zielsetzung_uebergeordnet: 'Die Sequenz baut Handball-Grundtechniken systematisch von der Hinführung über Goalchaball (UE 1-4) zur Technikvertiefung Schlagwurf (UE 5 BUV-Schwerpunktstunde) und Sprungwurf (UE 7 LP) bis zum Anwendungsturnier (UE 8) auf. Schwerpunkt-Stunde UE 5 demonstriert Stationsbetrieb-Methode + Differenzierung in 4 Spuren + dokumentierten Hallenplan mit Helferkonzept.',
              methodische_schwerpunkte: [
                'Stationsbetrieb (UE 5) als zentrale Methode der Schwerpunktstunde · 3 parallele Stationen + Rotation',
                'Methodische Spielreihe (MSR): Vom Kleinen Spiel (Goalchaball 3v3 mit vereinfachten Regeln) zum Zielspiel Handball 7v7 (Regelform) · Taktik vor Technik (Roth/Memmert)',
                'Methodische Übungsreihe (MÜR) Schlagwurf: vom Grobform-Erwerb (UE 5) über Feinkoordination zur variablen Verfügbarkeit (Meinel/Schnabel)',
                'Differenzierung in 4 Spuren (DaZ · LRS · leistungsschwach · leistungsstark) operationalisiert pro Station',
                'Helfen und Sichern als Pflicht (Gegenstandsbereich Fairness, Kooperation, Selbstkompetenz integriert · KMBek Sicherheit · KUVB)',
                '3-Phasen-Hofmann-Hauptmodell (Aufwärm/Haupt/Ausklang · VERBINDLICH Bausteinskript Bayern-Unterfranken) mit operativer 7-Sub-Phasen-Feingliederung (Begrüßung · allg. Aufwärmen · spez. Aufwärmen · Erarbeitung · Übung/Stationsbetrieb · Anwendung/Spielform · Ausklang) als Verfeinerung — spezifische Erwärmung als sportartspezifische Vorbereitung der Schwerpunkt-Bewegung (Bausteinskript-Warnung: NICHT als attraktives Spiel gestalten)',
              ],
              kompetenzerwerb_progression: 'Progression der prozessbezogenen Kompetenzen: UE 1-3 vorrangig Spielen + Kooperieren, kommunizieren, präsentieren (Goalchaball-Hinführung als Methodische Spielreihe). UE 4 Entscheiden, handeln, verantworten in Überzahlspielen 3v2/4v3 (erste Handball-Spielsituationen). UE 5 BUV Schlagwurf: Leisten + Wahrnehmen, analysieren, bewerten (AFB II-III · Grobform-Erwerb). UE 6 LNW Drehwurf: Leisten (AFB III-Bewertung). UE 7 LP Sprungwurf: Leisten + Wahrnehmen, analysieren, bewerten (komplexere Technik mit Spiral-Anschluss). UE 8 Miniturnier: Spielen + Kooperieren, kommunizieren, präsentieren + Entscheiden, handeln, verantworten (integrierte Anwendung · Fairplay als Querschnitt).',
              personifikation_durchgaengig: 'Anders als bei GPG/WiB nutzt Sport KEINE Identifikationsfigur, sondern operiert über die SuS selbst als Akteure. Stattdessen: konsequente Verwendung von "ich kann X" (Selbstwirksamkeits-Sprache LP+ Sport) und individuelle Trefferquoten-Ziele.',
              schwerpunktstunde_kandidat: 'UE 5 · BUV-Schlagwurf-Präzision (Stationsbetrieb · Hallenplan · Helferkonzept · 4-Spuren-Differenzierung · AFB I-III)',
            },
            sequenz_tabelle: [
              { uze: 1, datum: 'KW 39', stundenthema_frage: 'Wie spielen wir gemeinsam — auch wenn wir uns noch nicht kennen?',
                prozesskompetenz: 'Kooperieren, kommunizieren, präsentieren',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Goalchaball als Hinführung)',
                leitkompetenz: 'Kooperieren, kommunizieren, präsentieren',
                stundenziel_kurz: 'Kleine Spiele · Goalchaball-Einführung · Bedürfnisse Mitschüler:innen',
                kommentar: 'Sequenz-Einstieg · Kennenlernen · Partnerübungen Passen/Fangen', schwerpunkt: false },
              { uze: 2, datum: 'KW 40', stundenthema_frage: 'Was sind die Spielideen von Goalchaball?',
                prozesskompetenz: 'Spielen',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Goalchaball)',
                leitkompetenz: 'Spielen',
                stundenziel_kurz: 'Goalchaball-Spielidee + erste Spielformen',
                kommentar: 'Wiederholung Passen/Fangen · Vertiefung', schwerpunkt: false },
              { uze: 3, datum: 'KW 41', stundenthema_frage: 'Wie wenden wir Passen + Fangen in Spielformen an?',
                prozesskompetenz: 'Spielen · Leisten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Goalchaball 3v3)',
                leitkompetenz: 'Spielen · Leisten',
                stundenziel_kurz: 'Passen/Fangen in Spielform · Stationsbetrieb · Spielformen 3v3',
                kommentar: 'Stationsbetrieb · Spielformen 3v3', schwerpunkt: false },
              { uze: 4, datum: 'KW 44', stundenthema_frage: 'Wie führen Überzahl-Spiele zu Handball?',
                prozesskompetenz: 'Spielen · Entscheiden, handeln, verantworten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball-Hinführung)',
                leitkompetenz: 'Spielen · Entscheiden, handeln, verantworten',
                stundenziel_kurz: 'Individualtaktik · Überzahlspiele 3v2 + 4v3',
                kommentar: 'Handball-Hinführung über Überzahlspiele', schwerpunkt: false },
              { uze: 5, datum: 'KW 49', stundenthema_frage: 'Wie werfe ich gezielt mit Schlagwurf zum Tor?',
                prozesskompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Schlagwurf)',
                leitkompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                stundenziel_kurz: 'Schlagwurf-Präzision spielnah · Stationsbetrieb',
                kommentar: '**BUV-SCHWERPUNKTSTUNDE** · Stationsbetrieb · Hallenplan · 4-Spuren-Diff', schwerpunkt: true },
              { uze: 6, datum: 'KW 03', stundenthema_frage: 'Beherrsche ich den Drehwurf — und passt mein Spielverständnis Goalchaball?',
                prozesskompetenz: 'Leisten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Drehwurf)',
                leitkompetenz: 'Leisten',
                stundenziel_kurz: 'LNW Drehwurf + Spielnote Goalchaball',
                kommentar: 'Prüfungsformat · Leistungserhebung', schwerpunkt: false },
              { uze: 7, datum: 'Mo 02.03., KW 10', stundenthema_frage: 'Wie schließe ich spielnah mit Sprungwurf ab?',
                prozesskompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Sprungwurf)',
                leitkompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                stundenziel_kurz: 'Sprungwurf-Technik · spielnah anwenden',
                kommentar: 'LP-Stunde (Lehrprobe) · Sondertermin · Erweiterung Wurfkompetenz', schwerpunkt: false },
              { uze: 8, datum: 'Mi 04.03., KW 10', stundenthema_frage: 'Wie integrieren wir Technik + Taktik + Fairplay im Turnier?',
                prozesskompetenz: 'Spielen · Kooperieren, kommunizieren, präsentieren · Entscheiden, handeln, verantworten',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball 7v7) + Fairness, Kooperation, Selbstkompetenz',
                leitkompetenz: 'Spielen · Kooperieren, kommunizieren, präsentieren',
                stundenziel_kurz: 'Miniturnier Handball 7v7 · Fairplay-Reflexion',
                kommentar: 'Sequenzabschluss · Turnierform · Anwendung', schwerpunkt: false },
              { uze: 9, datum: 'KW 11', stundenthema_frage: 'Was nehme ich mit aus der Handball-Sequenz?',
                prozesskompetenz: 'Wahrnehmen, analysieren, bewerten · Kooperieren, kommunizieren, präsentieren',
                gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Reflexion) + Gesundheit und Fitness',
                leitkompetenz: 'Wahrnehmen, analysieren, bewerten',
                stundenziel_kurz: 'Reflexion · Selbsteinschätzung · Transfer',
                kommentar: 'Sequenz-Reflexion · Heft + Selbsteinschätzungsbogen', schwerpunkt: false },
            ],
            phasenSchema: [
              { id: 's1_begruessung',     label: '1 Begrüßung',                  kurz: 'Anwesenheit · Schmuckkontrolle · Stundenüberblick · Zielangabe (Söll: Einstimmung)' },
              { id: 's2_aufwaermen_allg', label: '2 Allgemeines Aufwärmen',      kurz: 'Herz-Kreislauf-Aktivierung · mobilisierend · Verletzungsprophylaxe (Söll: Einstimmung)' },
              { id: 's3_aufwaermen_spez', label: '3 Spezifisches Aufwärmen',     kurz: 'sportartspezifische Vorbereitung · vorbereitende Übungen (Söll: hier kein attraktives Aufwärmspiel — »negatives Attraktivitätsgefälle« vermeiden)' },
              { id: 's4_erarbeitung',     label: '4 Erarbeitung',                kurz: 'Bewegungslernen · Demonstration · Knotenpunkte · erste Versuche · Grobform (Meinel/Schnabel · Söll: Schwerpunkt)' },
              { id: 's5_uebung',          label: '5 Übung / Stationsbetrieb',    kurz: 'Hauptphase · Festigung · Methodische Übungsreihe (MÜR) · Feinform (Söll: Schwerpunkt)' },
              { id: 's6_anwendung',       label: '6 Anwendung / Spielform',      kurz: 'variable Verfügbarkeit · spielnahe Situation · Methodische Spielreihe (MSR Roth/Memmert · Söll: Schwerpunkt)' },
              { id: 's7_ausklang',        label: '7 Ausklang / Reflexion',       kurz: 'Cool-down · Verbalisierung der Knotenpunkte · Geräteabbau (Söll: Ausklang)' },
            ],
            ues_detail: [
              // UE 5 (BUV-Schwerpunktstunde — voll ausgearbeitet)
              {
                nr: 5,
                titel: 'BUV »Jahrmarkt« · Schlagwurf-Präzision Stationsbetrieb',
                stundenthema_frage: 'Wie werfe ich gezielt mit Schlagwurf zum Tor?',
                minuten: 45,
                lernziel: 'SuS wenden den Schlagwurf zielgenau in Stationsformen an und reflektieren ihre Treffquote.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler fuehren den Schlagwurf mit korrekter Schrittfolge, Armfuehrung und Koerperspannung aus und treffen mit ihm gezielt,',
                  bedingung: 'indem sie an drei rotierenden Stationen (Zielwurf · Wurfschule · Wandwurf) den Schlagwurf isoliert und im Anschluss in einer Goalchaball-Spielform anwenden,',
                  maszstab: 'was daran erkennbar wird, dass jede:r SuS bei Station 1 (Zielwurf 5 m) mindestens drei von fuenf Wuerfen das Huetchen-Tor trifft und im Spiel mindestens zweimal einen Schlagwurf einsetzt.'
                },
                lernziel_teilziele: [
                  { tz: 'MOTORISCH · SuS fuehren den Schlagwurf phasengerecht aus,',
                    indem: 'indem sie die drei Phasen (Aushol · Beschleunigung · Release) am Leitbild beobachten und an der Station Wurfschule isoliert üben,',
                    erkennbar: 'was daran erkennbar wird, dass sie mindestens drei Bewegungsmerkmale (Schrittfolge · Schulterdrehung · Handgelenk-Schnipp) in ihrer Ausfuehrung zeigen.', afb: 'II', differenziert: false },
                  { tz: 'KOGNITIV · SuS benennen die drei Phasen des Schlagwurfs fachgerecht,',
                    indem: 'indem sie nach der Lehrkraft-Demo die Bewegungsmerkmale am Plakat zuordnen,',
                    erkennbar: 'was daran erkennbar wird, dass sie im Ausklang die Begriffe Aushol/Beschleunigung/Release den richtigen Bewegungsbildern zuordnen.', afb: 'I', differenziert: false },
                  { tz: 'SOZIAL · SuS korrigieren Partner respektvoll und konstruktiv,',
                    indem: 'indem sie an den Stationen mindestens einen Hinweis pro Partner geben (z.B. "Dreh deine Schulter mit"),',
                    erkennbar: 'was daran erkennbar wird, dass die Beobachter-Karten von jeder Person mindestens einen konstruktiven Hinweis enthalten.', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS bewerten ihre Wurftechnik selbstkritisch,',
                    indem: 'indem sie aus den drei Bewegungsmerkmalen das eigene Verbesserungs-Schwerpunkt-Merkmal benennen,',
                    erkennbar: 'was daran erkennbar wird, dass sie im Ausklang ihren konkreten Trainingsfokus formulieren (z.B. "Naechste Stunde achte ich auf die Schulterdrehung").', afb: 'III', differenziert: true },
                ],
                s1_begruessung: '3\' · Anwesenheit am Halleneingang · Sportkleidung + Schmuckkontrolle · Stundenuebersicht an Tafel: "Heute Schlagwurf in 3 Stationen + Spielform Goalchaball." · Zielangabe: "Ich werfe gezielt mit Schlagwurf zum Tor — 3 von 5 Wuerfen treffen."',
                s2_aufwaermen_allg: '4\' · Allgemeines Aufwaermen · Laufschule mit Huetchen-Parcours (Anfersen · Knie-Heben · Skipping) im Hallenrund · Herz-Kreislauf-Aktivierung · Beweglichkeits-Mobilisation Sprunggelenk/Knie.',
                s3_aufwaermen_spez: '3\' · Spezifisches Aufwaermen Schlagwurf · sportartspezifische Vorbereitung: dynamische Mobilisation Schulterguertel (Armkreisen vor/zurueck · Halten 5 sek) · Trocken-Wurfbewegung am Halbkreis ohne Ball · kurze Ballgewoehnung im Stand (Werfen-Fangen mit Partner aus 3 m).',
                s4_erarbeitung: '8\' · Lehrkraft-Demo Schlagwurf am Halbkreis (3\' · 3 Phasen Aushol/Beschleunigung/Release zeigen · Plakat mit Foto-Sequenz aufhaengen) · SuS-Verbalisierung der 3 Phasen am Plakat (2\') · erste Versuche im Partner-Tandem aus 3 m (3\') · Knotenpunkte: Schrittfolge · Schulterdrehung · Handgelenk-Schnipp.',
                s5_uebung: '12\' · Stationsbetrieb 3 Stationen (12\' · 4\' pro Station + Rotation): St.1 Zielwurf 5m auf Huetchen-Tor (3 Wuerfe · Partner zaehlt Treffer) · St.2 Wurfschule Schrittfolge auf Becken-Seite (ohne dann mit Ball · Methodische Uebungsreihe Groessing) · St.3 Wandwurf gegen Wand + Reaktion-Fangen. Beobachter-Karten in Hand · Selbstkontroll-Kriterien am Plakat sichtbar. Lehrkraft rotiert + korrigiert anhand der 3 Knotenpunkte.',
                s6_anwendung: '10\' · Spielform Goalchaball 3v3 auf 2 parallelen Feldern (Huetchen-Tore) · Fokus: Schlagwurf-Einsatz in Spielsituation · variable Verfuegbarkeit unter Spielanforderungen · 2 mal 4\' mit Wechsel · Bonus-Regel: Schlagwurf-Tor zaehlt doppelt.',
                s7_ausklang: '5\' · Sitzkreis · Reflexion: "Welches Bewegungsmerkmal gelang? Welches nicht?" · Begriffs-Zuordnung Aushol/Beschleunigung/Release am Plakat · Selbstwirksamkeits-Aussage: "Naechste Stunde achte ich auf ___" · Geraeteabbau koordiniert.',
                phasen_minuten: { s1_begruessung: 3, s2_aufwaermen_allg: 4, s3_aufwaermen_spez: 3, s4_erarbeitung: 8, s5_uebung: 12, s6_anwendung: 10, s7_ausklang: 5 },
                sozialform_phasen: {
                  s1_begruessung: 'Halbkreis (Halleneingang)',
                  s2_aufwaermen_allg: 'Plenum · Laufwege markiert',
                  s3_aufwaermen_spez: 'Partner-Tandem · Halbkreis',
                  s4_erarbeitung: 'Plenum (Demo) · Partner-Tandem (Versuche)',
                  s5_uebung: 'GA (3er-Gruppen Stationen-Rotation)',
                  s6_anwendung: '2 parallele Spielfelder · GA 3v3',
                  s7_ausklang: 'Sitzkreis Plenum',
                },
                differenzierung_block: {
                  daz: 'Bewegungsmerkmale als Bilder (Stationen-Karten mit Foto-Schritten). Wortspeicher Aushol · Beschleunigung · Release · Schlagwurf. Demonstrieren statt erklaeren. Partner-Tandem mit Deutsch-Buddy.',
                  lrs: 'Stationen-Karten in 18pt+ Schrift · Foto-Sequenzen statt Lesetexten · Beobachterkarte mit Symbolen (Daumen hoch / seitlich / runter).',
                  leistungsschwach: 'Station 1 Distanz 3 m statt 5 m · weicherer Ball · Wurfschule ohne Ball (nur Schrittfolge) · vorgegebene Beobachtungs-Punkte ankreuzen.',
                  leistungsstark: 'Station 1 Distanz 7 m + Sprungwurf-Vorbereitung · Beobachter-Rolle uebernehmen + Partner kompetent korrigieren · AFB III Selbst-Verbesserungsfokus benennen (Zusatz-Lernziel TZ4).',
                },
                personifikation_anteil: 'Sport nutzt KEINE Identifikationsfigur sondern SELBSTWIRKSAMKEITSSPRACHE: "Ich kann den Schlagwurf gezielt einsetzen — heute werfe ich 3 von 5 ins Tor."',
                tafelbild_skizze: 'Tafel: 3 Phasen Schlagwurf mit Foto-Sequenz (Aushol · Beschleunigung · Release) + Stations-Karte (3 Stationen + Rotation-Reihenfolge) · Selbstwirksamkeits-Slogan.',
                hallenplan: 'Halle 20 x 12 m. St.1 Zielwurf (5m Wurflinie · Huetchen-Tor an Wand) NORDseite. St.2 Wurfschule (Becken-Seite SUEDOST · Matten unter Beckenrand). St.3 Wandwurf (WESTwand · 1 m Sicherheitsabstand). Spielfelder fuer Anwendung: 2 parallele 8x6 m im Hallenzentrum (Hütchen-Tore). Eingang OSTseite (Sicherheitszone).',
                helferkonzept: 'St.2 Wurfschule: Matten unter Beckenrand (Absturzsicherung). St.3 Wandwurf: 1 m Mindestabstand zur Wand markiert. Stationen-Rotation: zuegig · keine Warteschlangen · Lehrkraft positioniert sich rotierend zwischen Stationen.',
                sicherheit: 'Aufwaermen Pflicht (Verletzungsprophylaxe Schulterguertel) · Sportkleidung kontrolliert · Ball-Groesse altersgerecht · St.3 Wandwurf-Mindestabstand · St.2 Matten · Kollisionszone Spielfelder durch Huetchen markiert.',
                hausaufgabe: '—',
                material: '20 Handbälle (Größe 1) · 8 Hütchen · 4 Markierungshemden · Beobachter-Karten (1 pro SuS) · Stations-Karten A4 (3 Stationen, laminiert) · Audio-Aufnahmegerät optional fuer Reflexion · Hallenplan-Skizze A3 sichtbar',
                lp_bezug: 'KE J7-SP-01 (Schlagwurf · Individualtaktik) · KE J7-FAIR-01 (Helfen + Sichern) · KE J7-GES-01 (Aufwaermen + Verletzungsprophylaxe)',
                prinzipien_b3: ['Kompetenzvielfalt', 'Differenzierung', 'Sicherheit', 'Fairplay-Erziehung', 'Selbstwirksamkeit'],
                kompetenzstruktur: {
                  gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Schlagwurf) + Gegenstandsbereich Fairness, Kooperation, Selbstkompetenz',
                  leitkompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                  prozesskompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten · Kooperieren, kommunizieren, präsentieren',
                },
                sachanalyse: {
                  bewegungsphasen: 'Schlagwurf 3 Phasen: (1) AUSHOL (Arm auf Schulterhoehe, Ellbogen >= 90 Grad Flexion, Oberarm 45 Grad Abduktion) · (2) BESCHLEUNIGUNG (schnelle Armextension, Schulter-Hueft-Rotation, Schrittfolge stabilisiert Rumpfspannung) · (3) RELEASE (Handgelenk-Schnipp fuer Drall, Zeige-/Mittelfinger letzte Kontaktpunkte).',
                  biomechanik: 'Kettenbildung Beine -> Rumpf -> Arm -> Hand. Energie-Uebertragung von gross zu klein. Beschleunigungsprinzip (schnelle Kurzbewegungen Arm > Wurfgeschwindigkeit).',
                  fehlerbilder: 'Fehler 1: Nur Arm arbeitet (keine Koerperdrehung) -> schwache Wurfkraft + Ellbogen-Belastung. Korrektur: "Drehe Schultern mit". Fehler 2: Schrittfolge unzureichend -> instabile Basis. Korrektur: "Schritt-Wurf gleichzeitig".',
                  lernvoraussetzungen: 'Grundwurfkoordination aus Grundschule vorhanden. Schlagwurf neuer Bewegungsablauf. Koerperliche Voraussetzung: Schulterguertelkraft nach pubertaerer Entwicklung Jgst. 7 ausreichend. Vorerfahrung: Goalchaball-Spiel in UE 1-4 trainiert Wurfsituationen.',
                },
                didaktische_reduktion: 'Schlagwurf-Grobform vor Feinform: Schrittfolge zunaechst ohne Ball geuebt (St.2). Goalchaball 3v3 statt Handball 7v7 reduziert Komplexitaet (kleineres Feld · weniger Gegner · vereinfachte Regeln). Sprungwurf wird absichtlich erst in UE 7 LP eingefuehrt um Schlagwurf zu festigen.',
                didaktik: 'Stationsbetrieb (TUV-Anleitung Sm8ab) · 3-Phasen-Modell der Bewegungsanalyse (Meinel/Schnabel) · Differenzierung in 4 Spuren · Selbstwirksamkeits-Sprache LP+ · Hallenplan + Helferkonzept als BUV-Pflicht (ROLE_Sport_BUV)'
              },
              // Restliche UEs als Geruest
              { nr: 1, titel: 'Kleine Spiele/Goalchaball-Hinfuehrung', stundenthema_frage: 'Wie spielen wir gemeinsam — auch wenn wir uns noch nicht kennen?', minuten: 45,
                lernziel: 'SuS spielen Goalchaball als kooperative Hinfuehrung zum Sportspiel und entwickeln Passen+Fangen.',
                stage: 'geruest', material: 'Goalchaball-Bälle · Hütchen · Markierungshemden',
                prinzipien_b3: ['Fairplay-Erziehung', 'Kennenlernen'], lp_bezug: 'KE J7-SP-01 · KE J7-FAIR-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele', leitkompetenz: 'Kooperieren, kommunizieren, präsentieren · Spielen', prozesskompetenz: 'Kooperieren, kommunizieren, präsentieren · Spielen' },
                hinweis: 'In Folge-Iteration alle 7 Phasen voll ausarbeiten.' },
              { nr: 2, titel: 'Goalchaball Vertiefung', stundenthema_frage: 'Was sind die Spielideen von Goalchaball?', minuten: 45,
                lernziel: 'SuS verstehen die Spielidee Goalchaball und wenden Passen+Fangen in Spielformen an.',
                stage: 'geruest', material: 'Goalchaball-Bälle · Tore · Hütchen',
                prinzipien_b3: ['Kompetenzvielfalt'], lp_bezug: 'KE J7-SP-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele', leitkompetenz: 'Spielen', prozesskompetenz: 'Spielen' },
                hinweis: 'In Folge-Iteration alle 7 Phasen voll ausarbeiten.' },
              { nr: 3, titel: 'Goalchaball Festigung · Stationsbetrieb', stundenthema_frage: 'Wie wenden wir Passen + Fangen in Spielformen an?', minuten: 45,
                lernziel: 'SuS wenden Passen+Fangen in Stationsformen an und spielen 3v3 selbststaendig.',
                stage: 'geruest', material: 'Stations-Karten · Bälle · Hütchen',
                prinzipien_b3: ['Differenzierung', 'Selbsttaetigkeit'], lp_bezug: 'KE J7-SP-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele', leitkompetenz: 'Spielen · Leisten', prozesskompetenz: 'Spielen · Leisten' },
                hinweis: 'Probe-UE fuer Stationsbetrieb der BUV (UE 5).' },
              { nr: 4, titel: 'Handball Hinfuehrung · Ueberzahlspiele', stundenthema_frage: 'Wie führen Überzahl-Spiele zu Handball?', minuten: 45,
                lernziel: 'SuS wenden Individualtaktik in Überzahlsituationen 3v2 und 4v3 an.',
                stage: 'geruest', material: 'Handbälle · Hütchen · Markierungshemden',
                prinzipien_b3: ['Kompetenzvielfalt', 'Spiel-Progression'], lp_bezug: 'KE J7-SP-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball-Hinführung)', leitkompetenz: 'Spielen · Entscheiden, handeln, verantworten', prozesskompetenz: 'Spielen · Entscheiden, handeln, verantworten' },
                hinweis: 'In Folge-Iteration alle 7 Phasen voll ausarbeiten.' },
              { nr: 6, titel: 'LNW Drehwurf + Spielnote Goalchaball', stundenthema_frage: 'Beherrsche ich den Drehwurf — und passt mein Spielverständnis Goalchaball?', minuten: 45,
                lernziel: 'SuS weisen Drehwurf-Technik in LNW nach und zeigen Spielverstaendnis Goalchaball.',
                stage: 'geruest', material: 'LNW-Bogen · Bälle · Bewertungsraster',
                prinzipien_b3: ['Veraenderte Leistungsmessung', 'AFB-Stufung'], lp_bezug: 'KE J7-SP-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Drehwurf)', leitkompetenz: 'Leisten', prozesskompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten' },
                hinweis: 'Pruefungsformat · LNW-Stunde.' },
              // UE 7 (LP-Schwerpunktstunde Sprungwurf — voll ausgearbeitet · Spiral-Anschluss UE 5 Schlagwurf)
              {
                nr: 7,
                titel: 'LP Sprungwurf · spielnaher Torabschluss · Stationsbetrieb',
                stundenthema_frage: 'Wie schließe ich spielnah mit Sprungwurf ab?',
                minuten: 45,
                lernziel: 'SuS fuehren den Sprungwurf einbeinig aus dem 3-Schritt-Rhythmus aus und schliessen damit spielnah ueber den gegnerischen Block ab.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler fuehren den Sprungwurf mit einbeinigem Stemmschritt, gegenseitigem Wurfarm-Sprungbein-Verhaeltnis und Release in der Flugphase aus,',
                  bedingung: 'indem sie an drei rotierenden Stationen (Anlauf-Absprung-Rhythmus ohne Ball · Sprungwurf vom kleinen Kasten · Sprungwurf aus Anlauf auf Tor) den Bewegungsablauf isoliert ueben und im Anschluss in einer reduzierten Goalchaball-Spielform 3v3 einsetzen,',
                  maszstab: 'was daran erkennbar wird, dass jede:r SuS bei Station 3 mindestens drei von fuenf Sprungwuerfen einbeinig abspringt und ueber dem Block hinweg ins Tor wirft und im Spiel mindestens einmal einen Sprungwurf als Torabschluss waehlt.'
                },
                lernziel_teilziele: [
                  { tz: 'MOTORISCH · SuS fuehren den Sprungwurf aus dem 3-Schritt-Anlauf einbeinig aus,',
                    indem: 'indem sie an Station 1 den Anlauf-Absprung-Rhythmus ohne Ball automatisieren und an Station 2 vom kleinen Kasten in die Flugphase abdruecken,',
                    erkennbar: 'was daran erkennbar wird, dass sie das gegenseitige Stemmbein zum Wurfarm einsetzen (rechte Wurfhand · linkes Stemmbein) und die Wurfauslage in der Luft erreichen.', afb: 'II', differenziert: false },
                  { tz: 'KOGNITIV · SuS analysieren typische Fehlerbilder des Sprungwurfs fachgerecht,',
                    indem: 'indem sie nach der Lehrkraft-Demo + Partner-Beobachtung an der Fehlerbild-Karte die drei Hauptfehler (beidbeiniger Absprung · gleichseitiges Stemmbein · zu spaeter Release) zuordnen,',
                    erkennbar: 'was daran erkennbar wird, dass sie im Ausklang einen beobachteten Fehler beim Partner benennen und einen Korrekturvorschlag formulieren.', afb: 'II', differenziert: false },
                  { tz: 'SOZIAL · SuS sichern den Mitspielenden bei Sprungwurf-Stationen aktiv ab,',
                    indem: 'indem sie an Station 2 Kasten-Abbau-Pflicht uebernehmen und an Station 3 die Anlaufzone fuer den Werfenden freihalten,',
                    erkennbar: 'was daran erkennbar wird, dass keine Kollision in Anlaufzonen entsteht und die Stationsuebergaenge ohne Wartezeit ablaufen.', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS vergleichen Schlagwurf (UE 5) und Sprungwurf taktisch,',
                    indem: 'indem sie aus der Spielform 3v3 begruenden, in welcher Spielsituation der Sprungwurf dem Schlagwurf taktisch ueberlegen ist (z.B. Block-Ueberwindung · hoehere Trefferzone),',
                    erkennbar: 'was daran erkennbar wird, dass sie im Ausklang mindestens eine konkrete Spielsituation aus dem 3v3 benennen, in der sie den Sprungwurf bewusst gewaehlt haben.', afb: 'III', differenziert: true },
                ],
                s1_begruessung: '3\' · Anwesenheit am Halleneingang · Sportkleidung + Schmuckkontrolle · feste Hallenschuhe Pflicht · Stundenuebersicht an Tafel: "Heute Sprungwurf in 3 Stationen + Anwendung Goalchaball — wir bauen auf dem Schlagwurf aus UE 5 auf." · Kurzer Rueckbezug Schlagwurf (Frage in Plenum: "Welche drei Phasen hatte der Schlagwurf?") · Zielangabe: "Ich werfe ueber den Block ins Tor."',
                s2_aufwaermen_allg: '4\' · Allgemeines Aufwaermen · Laufschule mit Sprungelementen (Anfersen · Knie-Heben · Skipping mit Armzug) im Hallenrund · Herz-Kreislauf-Aktivierung mit Sprungvorbereitung.',
                s3_aufwaermen_spez: '3\' · Spezifisches Aufwaermen Sprungwurf · sportartspezifische Vorbereitung (Söll: KEIN attraktives Aufwaermspiel · negatives Attraktivitaetsgefaelle vermeiden): einbeinige Hopser links/rechts (4 x 8 m) + dynamische Mobilisation Schulterguertel + Sprunggelenk-Mobilisation (Fussgelenkkreisen · Wadenheben) + Trocken-3-Schritt-Anlauf ohne Ball. Pflicht-Erweiterung gegenueber UE 5: Sprungvorbereitung explizit (Sprunggelenk + Knie · Verletzungsprophylaxe Stemmbein).',
                s4_erarbeitung: '10\' · Lehrkraft-Demo Sprungwurf am Halbkreis (3\' · 3-Schritt-Anlauf · einbeiniger Stemmschritt · Wurfauslage in der Luft · Release · Plakat 4-Phasen-Sprungwurf + Fehlerbild-Karte mit 3 Hauptfehlern aufhaengen) · SuS-Verbalisierung der 4 Phasen + Vergleich Schlagwurf/Sprungwurf am Plakat (3\') · erste Versuche im Trocken-Anlauf am Hallenrand mit Schrittfolge-Huetchen (4\') · Knotenpunkte: einbeiniger Absprung · gegenseitiges Stemmbein zum Wurfarm · Release am hoechsten Punkt.',
                s5_uebung: '12\' · Stationsbetrieb 3 Stationen (12\' · 4\' pro Station + Rotation): St.1 Anlauf-Absprung-Rhythmus ohne Ball (3 Schritte links-rechts-links bei Rechtshaendern · Markierungs-Huetchen als Schrittfolge) · St.2 Sprungwurf vom kleinen Kasten 40 cm + Weichbodenmatte (Ball auf festes Ziel an Wand 4 m · Hoehengewinn spueren) · St.3 Sprungwurf aus 3-Schritt-Anlauf vom Boden auf Tor (5 m Distanz · Partner an Tor als Block-Attrappe mit Schaumstoff-Stange). Beobachter-Karten mit Fehlerbild-Symbolen in Hand. Methodische Uebungsreihe (MÜR Groessing): Vereinfachungs-/Erschwerungs-Strategien pro Station differenziert.',
                s6_anwendung: '8\' · Spielform Goalchaball 3v3 auf 2 parallelen Feldern (Huetchen-Tore + 1 passiver Block-Spieler pro Team vor dem Tor mit Schaumstoff-Stange) · Fokus: Sprungwurf als Torabschluss ueber den Block · variable Verfuegbarkeit unter Spielanforderungen · 2 mal 3\' mit Wechsel · taktischer Auftrag leistungsstark: bewusst Sprungwurf statt Schlagwurf bei Block waehlen.',
                s7_ausklang: '5\' · Sitzkreis · Reflexion: "Welches Fehlerbild hast du bei dir/beim Partner gesehen? Welche Korrektur hilft?" · Verbalisierung der Knotenpunkte am Plakat · Vergleich Schlagwurf-Sprungwurf in Spielform 3v3 (leistungsstark: konkrete Situation benennen) · Selbstwirksamkeits-Aussage: "Ich werfe ueber den Block ins Tor." · Geraeteabbau (Kaesten · Matten · Huetchen · Schaumstoff-Stangen) koordiniert.',
                phasen_minuten: { s1_begruessung: 3, s2_aufwaermen_allg: 4, s3_aufwaermen_spez: 3, s4_erarbeitung: 10, s5_uebung: 12, s6_anwendung: 8, s7_ausklang: 5 },
                sozialform_phasen: {
                  s1_begruessung: 'Halbkreis (Halleneingang)',
                  s2_aufwaermen_allg: 'Plenum · Laufwege markiert',
                  s3_aufwaermen_spez: 'Plenum · Paar-Hopser · Trocken-Anlauf',
                  s4_erarbeitung: 'Plenum (Demo) · Hallenrand-Trocken-Anlauf',
                  s5_uebung: 'GA (3er-Gruppen Stationen-Rotation)',
                  s6_anwendung: '2 parallele Spielfelder · GA 3v3 + 1 Block-Spieler pro Team',
                  s7_ausklang: 'Sitzkreis Plenum',
                },
                differenzierung_block: {
                  daz: 'Bewegungsmerkmale Sprungwurf als Foto-Sequenz (Anlauf · Absprung · Flug · Release) auf Stations-Karten. Wortspeicher Stemmschritt · Wurfauslage · Block. Demonstrieren statt erklaeren · Partner-Tandem mit Deutsch-Buddy. Fehlerbild-Karte mit Symbolen statt Text.',
                  lrs: 'Stations-Karten in 18pt+ Schrift · Foto-Sequenzen statt Lesetexten · Fehlerbild-Karte mit Piktogrammen (Fuesse beidbeinig · Fuesse einbeinig · Pfeil rauf/runter fuer Release-Timing).',
                  leistungsschwach: 'St.1 nur 2-Schritt-Anlauf statt 3-Schritt · St.2 Kasten 30 cm statt 40 cm + ohne Block-Attrappe an St.3 · weicherer Ball · Lehrkraft gibt Schrittfolge per Klatschen vor.',
                  leistungsstark: 'St.3 Sprungwurf gegen aktive (nicht passive) Block-Attrappe · TZ4 Schlagwurf-Sprungwurf-Vergleich · Beobachter-Rolle uebernehmen + Partner mit Fehlerbild-Karte korrigieren · in Anwendungsphase taktische Wahl begruenden.',
                },
                personifikation_anteil: 'Sport nutzt KEINE Identifikationsfigur sondern SELBSTWIRKSAMKEITSSPRACHE: "Ich werfe ueber den Block ins Tor — ich springe einbeinig ab und treffe drei von fuenf."',
                tafelbild_skizze: 'Tafel: 4-Phasen-Sprungwurf mit Foto-Sequenz (Anlauf 3 Schritte · einbeiniger Absprung · Flugphase mit Wurfauslage · Release mit Handgelenk-Schnipp) + Fehlerbild-Karte (3 Hauptfehler mit roten Kreuzen) + Stations-Karte (3 Stationen + Rotation-Reihenfolge) · Selbstwirksamkeits-Slogan "Ich werfe ueber den Block ins Tor" · Vergleichs-Spalte Schlagwurf | Sprungwurf (rechts).',
                hallenplan: 'Halle 20 x 12 m. St.1 Anlauf-Absprung-Rhythmus (NORDseite · 4 Huetchen-Reihen je 3 Schritt-Markierungen · 8 m Lauflinie · KEIN Ball) · St.2 Sprungwurf vom kleinen Kasten (SUEDOSTecke · kleiner Kasten 40 cm + Weichbodenmatte 200x100x10 cm dahinter als Landungszone · Ziel an Wand markiert · 4 m Distanz Kasten-Wand · Sicherheitsabstand 2 m zu Nachbarstation) · St.3 Sprungwurf aus Anlauf auf Tor (WESTseite · Handballtor oder Huetchen-Tor · 3-Schritt-Anlaufzone 6 m markiert · 5 m Wurfdistanz · 1 Partner als passive Block-Attrappe mit Schaumstoff-Stange · 1 Partner Ball-Rueckgabe hinter Tor) · Spielfelder fuer Anwendung: 2 parallele 8x6 m im Hallenzentrum (Huetchen-Tore + 1 Block-Position pro Tor) · Eingang OSTseite (Sicherheitszone) · Sicherheitsabstand zwischen St.2 und St.3 mind. 3 m (Anlaufzonen kreuzen sich NICHT).',
                helferkonzept: 'St.2 Sprungwurf vom Kasten: Weichbodenmatte als Landungssicherung Pflicht (Sturz auf Hartboden ausgeschlossen) · Lehrkraft positioniert sich initial an St.2 fuer Absprung-Korrektur · Kasten-Aufbau zu Beginn durch 4 SuS gemeinsam (Helfen+Sichern als Pflicht) · St.3 Block-Attrappe-Partner: Schaumstoff-Stange waagerecht vor dem Koerper · NIEMALS aktiv ins Anlaufgebiet treten · klare Trennung Anlaufzone | Wurfposition durch Bodenmarkierung · Stationen-Rotation zuegig · keine Warteschlangen · Lehrkraft rotiert zwischen Stationen mit Fokus St.2 (Sicherheit Hoehengewinn) und St.3 (Anlauf-Konflikte).',
                sicherheit: 'Aufwaermen Pflicht inkl. Sprunggelenk-Mobilisation (Sprunggelenk-Verstauchung Hauptrisiko · Sprungwurf belastet Stemmbein einseitig hoch) · Sportkleidung kontrolliert (feste Hallenschuhe Pflicht · keine Socken-Rutschgefahr beim Absprung) · St.2 Weichbodenmatte als Landungssicherung Pflicht · St.3 Anlaufzone und Wurfposition durch Bodenmarkierung getrennt · Block-Attrappe-Partner mit Schaumstoff-Stange (kein Koerperkontakt) · Ballgroesse 1 (handlich · altersgerecht) · in Anwendung 3v3 KEIN aktives Blocken mit Koerper (nur passive Block-Stange) · Lehrkraft positioniert sich an Sicht-Achse beider Wurfstationen · Sprungwurf-Belastung im Hauptteil begrenzt auf 5-6 Wuerfe pro Station (Ueberlastungs-Prophylaxe Stemmbein).',
                hausaufgabe: '—',
                material: '15 Handbaelle (Groesse 1) · 1 kleiner Kasten (40 cm Hoehe) · 1 Weichbodenmatte (200x100x10 cm) · 1 Handballtor oder 4 Huetchen fuer Tor · 16 Huetchen fuer Anlauf-Markierung + Spielfeld-Begrenzung · 4 Markierungshemden · 2 Schaumstoff-Stangen (1,5 m · fuer Block-Attrappen) · Beobachter-Karten mit Fehlerbild-Symbolen (1 pro SuS) · Stations-Karten A4 (3 Stationen · laminiert · mit Foto-Sequenz) · Fehlerbild-Karte A3 zum Aufhaengen · Hallenplan-Skizze A3 sichtbar · Tafel-Skizze 4-Phasen-Sprungwurf vorbereitet',
                lp_bezug: 'KE J7-SP-01 (Wurftechniken Handball · Sprungwurf · Individualtaktik) · KE J7-FAIR-01 (Helfen + Sichern Kasten + Anlaufzonen) · KE J7-GES-01 (Aufwaermen Sprunggelenk-Mobilisation · Verletzungsprophylaxe einseitige Belastung)',
                prinzipien_b3: ['Kompetenzvielfalt (Leisten + Wahrnehmen, analysieren, bewerten)', 'Differenzierung', 'Sicherheit', 'Spiral-Anschluss (Schlagwurf UE 5 -> Sprungwurf UE 7)', 'Selbstwirksamkeit'],
                kompetenzstruktur: {
                  gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball · Sprungwurf) + Gegenstandsbereich Fairness, Kooperation, Selbstkompetenz',
                  leitkompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten',
                  prozesskompetenz: 'Leisten · Wahrnehmen, analysieren, bewerten · Kooperieren, kommunizieren, präsentieren',
                },
                sachanalyse: {
                  bewegungsphasen: 'Sprungwurf 3 Phasen (4 Teilbewegungen): (1) ANLAUF (2-3 Schritte Rhythmus · bei Rechtshaendern Schrittfolge links-rechts-links · Schritt 3 Stemmschritt) · (2) ABSPRUNG (einbeinig vom Stemmbein · GEGENSEITIG zum Wurfarm · Knie-Anwinkel-Vorbereitung des Schwungbeins · Schulterachse zum Tor) · (3) FLUGPHASE + RELEASE (Wurfauslage in der Luft auf Schulterhoehe · Wurfarm im Ellbogen ueber 90 Grad Flexion · Handgelenk-Schnipp fuer Drall · Release am hoechsten Punkt vor Bodenkontakt).',
                  biomechanik: 'Geschwindigkeits-Uebertragung horizontaler Anlauf-Impuls -> vertikaler Sprung-Impuls. Energie-Kettenbildung Anlaufgeschwindigkeit -> Stemmbein-Streckung -> Rumpfrotation -> Wurfarm-Beschleunigung -> Handgelenk-Schnipp. Hoehere Release-Position als Schlagwurf (Vorteil: hoehere Wurfbahn ueber gegnerischen Block · steilerer Einfallswinkel ins Tor moeglich · Tor-Eckenpraezision oben erreichbar).',
                  fehlerbilder: 'Fehler 1: Beidbeiniger Absprung statt einbeinig -> geringere Sprunghoehe + verlorene horizontale Geschwindigkeit. Korrektur: "Spring nur vom Stemmbein ab" + St.1 Trockenuebung. Fehler 2: Gleichseitiges Stemmbein zum Wurfarm (rechte Hand · rechtes Bein) -> kein Hueft-Schulter-Gegenzug · unausgeglichene Flugphase. Korrektur: "Links abspringen wenn du rechts wirfst" + Demo + Markierungs-Huetchen Schrittfolge. Fehler 3: Zu spaeter Release (Wurf erst nach Landung) -> Hoehenvorteil verloren · keine Block-Ueberwindung. Korrektur: "Werfen wenn du am hoechsten bist · NICHT erst beim Landen" + St.2 Kasten-Uebung (Hoehengewinn spueren). Fehler 4: Knie-Anwinkel-Vorbereitung fehlt -> Sprunghoehe nicht ausgeschoepft. Korrektur: "Schwungbein-Knie anziehen beim Absprung".',
                  lernvoraussetzungen: 'Schlagwurf-Technik aus UE 5 sitzt (Aushol · Beschleunigung · Release-Phase bekannt · Wurfarm-Schulter-Hueft-Rotation automatisiert) · 3er-Schrittfolge aus Anlauf-Uebungen Leichtathletik (J5-J7) verankert · Goalchaball-Spielmechanik aus UE 1-4 gefestigt (Spielform 3v3 bekannt · Passspiel + Torschuss-Situationen vertraut) · koerperliche Voraussetzung Jgst. 7: Stemmbein-Belastbarkeit nach pubertaerer Knochenfestigung ausreichend · Koordination einbeiniger Absprung aus Leichtathletik Weitsprung (J6) angebahnt.',
                },
                didaktische_reduktion: 'Sprungwurf-Grobform vor Feinform: Anlauf zunaechst ohne Ball (St.1 Trockenuebung) · Absprung vom Kasten (St.2) zur Hoehenwahrnehmung BEVOR Bodenabsprung gefordert wird · St.3 erst nach St.1+St.2 (Pflicht-Rotation in dieser Reihenfolge fuer leistungsschwache · freier fuer leistungsstarke). Goalchaball 3v3 statt Handball 7v7 reduziert taktische Komplexitaet (kleines Feld · wenige Gegner) · Block-Attrappe mit Schaumstoff-Stange statt aktiver Verteidiger reduziert Verletzungsrisiko + Konzentrationsfokus auf Wurfauslage. Sprungwurf hier nur als Torabschluss (KEIN Pass-Sprungwurf · keine Sprungwurf-Varianten wie Heber/Dreher).',
                didaktik: 'Stationsbetrieb (TUV-Anleitung Sm8ab) · 3-Phasen-Modell der Bewegungsanalyse (Meinel/Schnabel) erweitert um Vergleichs-Achse Schlagwurf|Sprungwurf · Differenzierung in 4 Spuren · Spiral-Anschluss UE 5 (Schlagwurf-Vorwissen aktiviert · taktischer Vergleich als AFB III-Element) · Selbstwirksamkeits-Sprache LP+ · Hallenplan + Helferkonzept als BUV-Pflicht (ROLE_Sport_BUV) · Block-Attrappe-Methode mit Schaumstoff-Stange zur Komplexitaets-Reduktion bei gleichzeitig spielnaher Situation.'
              },
              { nr: 8, titel: 'Miniturnier Handball 7v7 · Fairplay-Anwendung', stundenthema_frage: 'Wie integrieren wir Technik + Taktik + Fairplay im Turnier?', minuten: 45,
                lernziel: 'SuS wenden Technik+Taktik im Handball-Miniturnier an und reflektieren Fairplay als Querschnitt.',
                stage: 'geruest', material: 'Handbälle · Tore · Spielplan · Schiedsrichter-Karten',
                prinzipien_b3: ['Fairplay-Erziehung', 'Kompetenzvielfalt (Spielen + Kooperieren + Entscheiden + Leisten)'], lp_bezug: 'KE J7-SP-01 · KE J7-FAIR-01',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Handball 7v7) + Gegenstandsbereich Fairness, Kooperation, Selbstkompetenz', leitkompetenz: 'Spielen · Kooperieren, kommunizieren, präsentieren', prozesskompetenz: 'Spielen · Kooperieren, kommunizieren, präsentieren · Entscheiden, handeln, verantworten' },
                hinweis: 'Sequenz-Abschluss · Turnierform.' },
              { nr: 9, titel: 'Sequenz-Reflexion · Heft + Selbsteinschätzung', stundenthema_frage: 'Was nehme ich mit aus der Handball-Sequenz?', minuten: 45,
                lernziel: 'SuS reflektieren ihre Lernertraege schriftlich und benennen einen Transferbereich (Freizeit/Verein).',
                stage: 'geruest', material: 'Heft · Selbsteinschätzungsbogen · Reflexions-Karten',
                prinzipien_b3: ['Selbst-Regulation', 'Veraenderte Leistungsmessung'], lp_bezug: 'KE J7-SP-01 + Querschnitt',
                kompetenzstruktur: { gegenstand: 'Sportliche Handlungsfelder · Kleine Spiele und Sportspiele (Reflexion) + Gegenstandsbereich Gesundheit und Fitness', leitkompetenz: 'Wahrnehmen, analysieren, bewerten', prozesskompetenz: 'Wahrnehmen, analysieren, bewerten · Kooperieren, kommunizieren, präsentieren' },
                hinweis: 'Sequenz-Reflexion · Heft-LZK.' },
            ],
            bezuege_global: [
              { didaktik: '3-Phasen-Modell nach Hofmann (Bausteinskript SP GB Kap. 8, AG MS-Sem.-Unterfranken)', verweis: 'VERBINDLICHE Grobstruktur Bayern-Unterfranken-MS-LAA: Aufwärmphase (mit Sub-Stufung 1.1 allg + 1.2 spez. Erwärmung) — Hauptphase/Erarbeitungsphase — Schlussteil/Ausklang. Bestätigt verbatim auch in Bausteinskript B2 (Schwimmen) Kap. 1. Operative 7-Sub-Phasen-Feingliederung (Begrüßung · allgemeines Aufwärmen · spezifisches Aufwärmen · Erarbeitung · Übung/Stationsbetrieb · Anwendung/Spielform · Ausklang) als didaktische Verfeinerung aus Aufwärm-Sub-Stufung + Meinel/Schnabel-Bewegungslernen + UV-Empirie. Spezifisches Aufwärmen als eigenständige Sub-Phase mit sportartspezifischer Funktion. Bausteinskript-Warnung: »negatives Attraktivitätsgefälle« vermeiden — das spezifische Aufwärmen ist KEIN attraktives Spiel.' },
              { didaktik: 'BUV-Qualitätskriterien (ROLE_Sport_BUV)', verweis: 'UE 5 BUV-Schwerpunktstunde: Mager-3D-Lernziele (motorisch + kognitiv + sozial) · Sachanalyse mit Phasenmodell + Biomechanik + Fehlerbilder · Didaktische Reduktion · Methodische Analyse · Stundenskizze · Hallenplan + Helferkonzept · Sicherheitsmaßnahmen explizit.' },
              { didaktik: 'Prozessbezogene Kompetenzen (LehrplanPLUS Bayern MS Sport)', verweis: 'Sequenz aktiviert alle 6 prozessbezogenen Kompetenzen: Leisten (Schlagwurf-Trefferquote · LNW Drehwurf) · Gestalten (Bewegungsausführung Sprungwurf) · Spielen (Goalchaball + Handball-Turnier) · Wahrnehmen, analysieren, bewerten (Bewegungsmerkmale · Partner-Korrektur) · Entscheiden, handeln, verantworten (Überzahlspiele · Turniersituation) · Kooperieren, kommunizieren, präsentieren (Partnerarbeit · Helfen und Sichern · Fairplay).' },
              { didaktik: 'Sicherheitserziehung (KMBek + KUVB Bayern)', verweis: 'Pro UE Sicherheitsmaßnahmen dokumentiert. UE 5 BUV: Hallenplan mit Gefahrenstellen (Wand · Beckenrand) markiert · Helferkonzept (Matten unter Beckenrand · Sicherheitsabstand Wand) · Helfergriff-Kanon Klammergriff/Stützgriff/Drehgriff/Drehstützgriff bei Turnsequenzen · Aufwärmen als Verletzungsprophylaxe · altersgerechte Bälle. Helferkonzept-Stufung: Doppelhelfer → Einzelhelfer → Sicherheitssteller.' },
              { didaktik: 'Differenzierung in 4 Spuren', verweis: 'DaZ (Bewegungsmerkmale als Bilder · Wortspeicher) · LRS (Stations-Karten 18pt+) · leistungsschwach (Distanz 3m statt 5m · weicherer Ball) · leistungsstark (Distanz 7m · Beobachter-Rolle · AFB III Selbst-Verbesserungsfokus).' },
              { didaktik: 'Bewegungsanalyse 3-Phasen-Modell (Meinel/Schnabel)', verweis: 'Vorbereitungs- · Haupt- · Endphase. Schlagwurf: Aushol · Beschleunigung · Release. Biomechanische Kette Beine→Rumpf→Arm→Hand. Beschleunigungsprinzip. Lernphasen-Progression: Grobkoordination (UE 5 Einführung) → Feinkoordination (UE 7 LP) → variable Verfügbarkeit (UE 8 Turnier). Sachanalyse-Standard für BUV.' },
              { didaktik: 'Methodische Übungsreihe (MÜR) und Methodische Spielreihe (MSR)', verweis: 'MÜR Schlagwurf (Söll/Größing): Übungen mit steigendem Schwierigkeitsgrad · Vereinfachungsstrategien (Distanz · Ballgröße · Festigkeit) · Komplexitätsstufung. MSR (Roth/Memmert · Ballschule Heidelberg): Vom Kleinen Spiel (Goalchaball 3v3 · vereinfachte Regeln) zur Zielspielform Handball 7v7. Taktik vor Technik.' },
              { didaktik: 'Spiral-Progression Sport (LehrplanPLUS Bayern MS Sport)', verweis: 'Vertikale Progression: Jgst. 5/6 Kleine Spiele + Goalchaball-Anbahnung → Jgst. 7 Handball-Techniken (DIESE Sequenz) → Jgst. 8/9 Handball-Gruppentaktik + Turnierform. Spiralcurricular nicht linear.' },
              { didaktik: 'Selbstwirksamkeit (LehrplanPLUS Bayern Sport)', verweis: 'Sport nutzt SELBSTWIRKSAMKEITSSPRACHE statt Personifikation: SuS formulieren "ich kann · ich erreiche · ich verbessere". Verankert im Doppelauftrag »Erziehung IM Sport« und »Erziehung DURCH Sport«.' },
              { didaktik: 'Aufgabenkultur differenziert + Leistungsmessung', verweis: 'UE 6 LNW Drehwurf mit AFB-Stufung. Kompetenzorientiertes Beurteilen LehrplanPLUS Sport. Veränderte Leistungsmessung.' },
              { didaktik: 'Fairplay-Erziehung als Querschnitt (Gegenstandsbereich Fairness, Kooperation, Selbstkompetenz)', verweis: 'In jeder UE explizit (Partnerkorrektur respektvoll · Helfen und Sichern · Turnier-Fairplay-Reflexion UE 8). Fairplay als übergeordnetes Ziel (KE J7-FAIR-01).' },
            ]
          }
        },
        { ke_id: 'J7-SP-02', thema: 'Rückschlagspiele + alternative Spiele',
          ke_wortlaut: 'erweitern Erfahrungen in Rückschlagspielen und alternativen Spielen.',
          ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26',
          inhalte_lp: ['Badminton-Grundtechniken · Tchoukball · alternative Spiele Tag-Rugby (optional)'],
          fundort: 'Jahresplanung_Sport7_2025-26.md' },
      ],
    },
    'J7_TU': { ke_anzahl: 1, jgst: 'J7', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-TU-01', thema: 'Geräteturnen + Elementverbindung',
        ke_wortlaut: 'turnen an Geräten und verbinden Elemente, wenden Sicherheits- und Hilfestellungsregeln an.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        inhalte_lp: ['Grundfertigkeiten an 2 Geraeten (Boden · Reck/Barren) · Partner-Akrobatik · Helfen + Sichern'],
        fundort: 'Jahresplanung_Sport7_2025-26.md' }],
    },
    'J7_GT': { ke_anzahl: 1, jgst: 'J7', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-GT-01', thema: 'Gestalten mit Rhythmus + Gruppenchoreografie',
        ke_wortlaut: 'gestalten Bewegungen mit und ohne Handgerät zu verschiedenen Rhythmen und präsentieren Gruppenchoreografien.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        inhalte_lp: ['Rope Skipping · rhythmische Bewegungsformen · Gruppenchoreografien'],
        fundort: 'Jahresplanung_Sport7_2025-26.md' }],
    },
    'J7_FAIR': { ke_anzahl: 1, jgst: 'J7', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-FAIR-01', thema: 'Fairplay + Kooperation + Selbstreflexion',
        ke_wortlaut: 'hinterfragen Spielregeln, bewerten Verstöße und schätzen Fairplay; respektieren Mitschüler:innen-Bedürfnisse auch unter Wettbewerbsbedingungen.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        ke_wortlaut_anker: ['Spielregeln', 'Fairplay', 'Mitschüler:innen-Bedürfnisse', 'Wettbewerbsbedingungen'],
        inhalte_lp: ['Spielsituationsanalyse · Kooperationsaufgaben · gegenseitige Korrektur · Konflikte konstruktiv loesen'],
        fundort: 'Jahresplanung_Sport7_2025-26.md (LB 2 Querschnitt)' }],
    },
    'J7_GES': { ke_anzahl: 1, jgst: 'J7', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'verbatim',
      kes: [{ ke_id: 'J7-GES-01', thema: 'Ausdauer + Ernährung + Funktionsuebungen',
        ke_wortlaut: 'achten auf gesunde Ernährung, setzen sich kritisch mit Gewichtsregulation auseinander und führen abwechslungsreiche aerobe Belastungsformen durch.',
        ke_wortlaut_quelle: 'Jahresplanung_Sport7_2025-26 · verbatim LP+',
        inhalte_lp: ['Ausdauertraining (Schwimmen · Walking) · funktionelle Uebungen (Bauch + Ruecken) · Ernaehrung · Fluessigkeitshaushalt'],
        fundort: 'Jahresplanung_Sport7_2025-26.md (LB 3 Querschnitt)' }],
    },

    // ─── J8/J9/J10 — alle als kompakte KE-Zellen (Stubs) ──────────────
    'J8_LA': { ke_anzahl: 1, jgst: 'J8', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-LA-01', thema: 'LA-Mehrkampf + Bundesjugendspiele',
        ke_wortlaut: 'absolvieren einen leichtathletischen Mehrkampf und bewerten ihre Leistung anhand von Bundesjugendspiel-Tabellen.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 8 · sekundaer',
        inhalte_lp: ['Sprint · Weitwurf · Hochsprung · Weitsprung · Ausdauerlauf · Mehrkampf-Wertung'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_SC': { ke_anzahl: 1, jgst: 'J8', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-SC-01', thema: '2 Schwimmarten + Streckenschwimmen',
        ke_wortlaut: 'schwimmen zwei Schwimmarten sicher und bewältigen eine Strecke von 100 m.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 8 · sekundaer',
        inhalte_lp: ['Brust + Kraul (oder Brust + Rücken) · 100 m am Stück · Schwimmabzeichen Silber'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_SP': { ke_anzahl: 1, jgst: 'J8', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-SP-01', thema: 'Handball/Fußball Gruppentaktik vertieft',
        ke_wortlaut: 'wenden gruppentaktische Verhaltensweisen im Handball/Fussball gezielt an und uebernehmen Spielpositionen verantwortungsbewusst.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 8 · sekundaer',
        inhalte_lp: ['Positionsspiel · Raumdeckung · Spielzuege · 6:0/3:2:1-Abwehr (Handball-Anbahnung)'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_TU': { ke_anzahl: 1, jgst: 'J8', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-TU-01', thema: 'Komplexere Geräte-Verbindungen',
        ke_wortlaut: 'turnen komplexere Geräte-Verbindungen mit eigener Choreografie und uebernehmen Helferfunktionen kompetent.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 8 · sekundaer',
        inhalte_lp: ['Boden-Choreografie · Reck-Hueftaufschwung · Sprung · Partner-Akrobatik · Helfen verantwortlich'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_GT': { ke_anzahl: 1, jgst: 'J8', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-GT-01', thema: 'Tanzformen + Choreografien selbst gestalten',
        ke_wortlaut: 'gestalten eigene Tanzchoreografien in Gruppen und praesentieren diese im Plenum.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 8 · sekundaer',
        inhalte_lp: ['Aktuelle Tanzformen · HipHop / Modern · Gruppenchoreografie · Praesentation'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_FAIR': { ke_anzahl: 1, jgst: 'J8', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-FAIR-01', thema: 'Selbstkonzept + Stärken-Schwächen reflektieren',
        ke_wortlaut: 'reflektieren ihre eigene sportliche Entwicklung und akzeptieren Staerken sowie Schwaechen im Team.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['Selbstkonzept · Staerken-Schwaechen-Profil · Teamrollen'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },
    'J8_GES': { ke_anzahl: 1, jgst: 'J8', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J8-GES-01', thema: 'Cooper-Test + Fitness-Diagnostik',
        ke_wortlaut: 'absolvieren einen Cooper-Test und entwickeln ein persoenliches Fitness-Programm.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['12-Minuten-Lauf · Pulsmessung · Trainingsplanung · Trainingsbereiche aerob/anaerob'],
        fundort: 'Sport-Anleitungen Jgst. 8' }],
    },

    // ─── J9 ─────────────────────────────────────────────────────────────
    'J9_LA': { ke_anzahl: 1, jgst: 'J9', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-LA-01', thema: 'LA-Wettkampf + Trainingsplanung',
        ke_wortlaut: 'planen einen leichtathletischen Trainingsprozess und absolvieren einen Wettkampf.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 9 · sekundaer',
        inhalte_lp: ['Trainingsplanung 4 Wochen · Wettkampf-Vorbereitung · Reflexion Leistungsentwicklung'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_SC': { ke_anzahl: 1, jgst: 'J9', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-SC-01', thema: '3 Schwimmarten + Rettungsschwimmen',
        ke_wortlaut: 'schwimmen drei Schwimmarten und kennen Grundlagen des Rettungsschwimmens.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 9 · sekundaer',
        inhalte_lp: ['Brust + Kraul + Rueckenschwimmen · 200 m am Stueck · Rettungsschwimm-Grundlagen · Schwimmabzeichen Gold'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_SP': { ke_anzahl: 1, jgst: 'J9', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-SP-01', thema: 'Sportspiele Wettkampf + Schiedsrichtertaetigkeit',
        ke_wortlaut: 'fuehren Sportspiele in Wettkampfform durch und uebernehmen Schiedsrichter- und Organisationsaufgaben.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 9 · sekundaer',
        inhalte_lp: ['Handball-Turnier · Schiedsrichter-Zeichen · Spielprotokoll · Tabellenfuehrung'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_TU': { ke_anzahl: 1, jgst: 'J9', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-TU-01', thema: 'Kreative Boden- und Gerätechoreografie',
        ke_wortlaut: 'gestalten eigene Choreografien an Boden und Geraet und praesentieren diese.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 9 · sekundaer',
        inhalte_lp: ['Choreografie · Boden + 1 Geraet · Gruppenpraesentation'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_GT': { ke_anzahl: 1, jgst: 'J9', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-GT-01', thema: 'Choreografische Eigenproduktion',
        ke_wortlaut: 'entwickeln und praesentieren eine eigene tänzerische Komposition in der Gruppe.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 9 · sekundaer',
        inhalte_lp: ['Choreografische Eigenproduktion · Musikauswahl · Praesentation · Bewertungsraster'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_FAIR': { ke_anzahl: 1, jgst: 'J9', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-FAIR-01', thema: 'Vereinssport + Engagement',
        ke_wortlaut: 'reflektieren das eigene Sportengagement im Verein/Freizeit und planen langfristige Sport-Routinen.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['Vereinssport · Ehrenamt · Sport als Lebenslang-Aufgabe'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },
    'J9_GES': { ke_anzahl: 1, jgst: 'J9', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J9-GES-01', thema: 'Trainingsplanung + Doping-Reflexion',
        ke_wortlaut: 'planen ein persoenliches Fitness-Programm und reflektieren kritisch Doping und Risikoverhalten.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['Trainingsplanung 6 Wochen · Doping-Praevention · Risikoverhalten Sportlehrer-Begleitung'],
        fundort: 'Sport-Anleitungen Jgst. 9' }],
    },

    // ─── J10 (M-Zug) ────────────────────────────────────────────────────
    'J10_LA': { ke_anzahl: 1, jgst: 'J10', lb: 'LA', lb_titel: 'Leichtathletik', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-LA-01', thema: 'LA-Wettkampf höheres Niveau',
        ke_wortlaut: 'absolvieren einen leichtathletischen Wettkampf auf Mittlerer-Reife-Niveau.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 10 M · sekundaer',
        inhalte_lp: ['Wettkampf · Mehrkampf · Reflexion · Vorbereitung Berufseinstieg'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_SC': { ke_anzahl: 1, jgst: 'J10', lb: 'SC', lb_titel: 'Schwimmen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-SC-01', thema: 'Schwimmen Anwendung + Rettung',
        ke_wortlaut: 'wenden Schwimmtechniken in Rettungssituationen an und uebernehmen Verantwortung in Aufsichtssituationen.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 10 M · sekundaer',
        inhalte_lp: ['Rettungsschwimmen · Tauch-Bergen · Aufsicht (Anbahnung)'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_SP': { ke_anzahl: 1, jgst: 'J10', lb: 'SP', lb_titel: 'Sportspiele', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-SP-01', thema: 'Sportspiele - Verein-Anschluss',
        ke_wortlaut: 'spielen Sportspiele auf vereinsnahem Niveau und reflektieren Anschlussmoeglichkeiten im Verein.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 10 M · sekundaer',
        inhalte_lp: ['Vereinsanschluss · Trainerausbildung-Anbahnung · ehrenamtliche Tätigkeit'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_TU': { ke_anzahl: 1, jgst: 'J10', lb: 'TU', lb_titel: 'Turnen', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-TU-01', thema: 'Geräteturnen Wettkampf',
        ke_wortlaut: 'turnen vollständige Übungsverbindungen an Geräten auf Wettkampf-Niveau.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 10 M · sekundaer',
        inhalte_lp: ['Verbundenes Turnen Wettkampf · Bewertung · Helferqualifikation'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_GT': { ke_anzahl: 1, jgst: 'J10', lb: 'GT', lb_titel: 'Gymnastik + Tanz', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-GT-01', thema: 'Choreografie Wettkampf-Niveau',
        ke_wortlaut: 'praesentieren eine choreografische Wettkampfproduktion auf Mittlerer-Reife-Niveau.',
        ke_wortlaut_quelle: 'LP+ Sport · Jgst. 10 M · sekundaer',
        inhalte_lp: ['Choreografie Wettkampf · Musikauswahl · Bewertungsraster · Praesentation'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_FAIR': { ke_anzahl: 1, jgst: 'J10', lb: 'FAIR', lb_titel: 'Fairness', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-FAIR-01', thema: 'Sport als Lebenslang-Aufgabe',
        ke_wortlaut: 'reflektieren Sport als Lebenslang-Aufgabe und planen den Übergang in Beruf/Freizeit.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['Beruf + Sport · Vereinsanschluss · ehrenamtliches Engagement'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
    'J10_GES': { ke_anzahl: 1, jgst: 'J10', lb: 'GES', lb_titel: 'Gesundheit', quelle_status: 'sekundaer',
      kes: [{ ke_id: 'J10-GES-01', thema: 'Persönliches Gesundheitskonzept',
        ke_wortlaut: 'entwickeln ein persoenliches Gesundheitskonzept fuer Beruf und Freizeit.',
        ke_wortlaut_quelle: 'LP+ Sport · Querschnitts-LB',
        inhalte_lp: ['Gesundheitskonzept · Beruf-Sport-Balance · Stressmanagement · Rückenfreundlich Arbeiten'],
        fundort: 'Sport-Anleitungen Jgst. 10' }],
    },
  },
};
