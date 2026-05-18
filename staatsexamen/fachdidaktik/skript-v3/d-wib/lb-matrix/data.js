// GB-Matrix WiB (Wirtschaft und Beruf) MS Bayern · LP+-konform · zitierfähig · v1
//
// ARCHITEKTUR
// ────────────────────────────────────────────────────────────────────────
// WiB folgt NICHT der GPG-Lernbereich-Logik, sondern dem WiB-eigenen
// Kompetenzstrukturmodell (LP+ Bayern Fachprofil WiB):
//   · 5 GEGENSTANDSBEREICHE (Arbeit · Berufsorientierung · Wirtschaft · Technik · Recht)
//   · 4 PROZESSBEZOGENE KOMPETENZEN (Handeln · Analysieren · Kommunizieren · Beurteilen)
//   · 6 LERNBEREICHE pro Jgst = 5 GB + LB6 Projekt (übergreifend)
//
// MATRIX-LOGIK
//   · Spalten = 5 Gegenstandsbereiche + Projekt-Spalte (LB6)
//   · Zeilen  = Jgst 5, 6, 7, 8, 9 (Regelklasse + M-Zug-Differenzierung in den
//               Zellen ausgewiesen wo relevant)
//
// PHASEN-STANDARD (vs. GPG-5-Phasen!)
//   · WiB hat ein 13-Phasen-Artikulationsmodell (verbindlich Seminar Unterfranken,
//     Moritz-Steigerwald 2018, Baustein GB):
//     1.  Hinführung / Vorwissensaktivierung
//     2.  Problemstufe
//     3.  Problemformulierung / Zielangabe (mit PK-Transparenz)
//     4.  Vermutungen
//     5.  Lösungsplanung / Teilintentionen
//     6.  Lösung (HAUPTPHASE, Differenzierung integriert)
//     7.  Präsentation
//     8.  Problembeurteilung / Erkenntnisstufe (Begriffsarbeit)
//     9.  Wertungsstufe (persönliche Reflexion · Ko-Konstruktion)
//     10. Gesamtzusammenfassung
//     11. Vermutungen überprüfen
//     12. Transfer
//     13. Sicherung (Lernzielreflexion)
//
// QUELLEN-STATUS pro Zelle
//   · verbatim   — LP+-Bayern Fachprofil WiB lokal vorhanden
//   · sekundaer  — KMK/WiB-Sekundärquelle (Anleitungen, BUV-Templates)
//   · ausstehend — LP+-Quelle für diese Jgst noch nicht eingelesen
//
// PILOT-SEQUENZ: GB Berufsorientierung Jgst. 8 · »Anforderungsprofile analysieren«
//   · 8-UE-Sequenz im 13-Phasen-WiB-Standard
//   · BUV-Schwerpunktstunde-Kandidat: UE 5 (Anforderungsprofil-Vergleich mit Stärkenprofil)
//   · Personifikation: Identifikationsfigur »Lena« (Wunschberuf Fachverkäuferin Bäckerei)
//
// QUELLEN
//   · LP+ Bayern Fachprofil WiB · /Repsitory Unterrichtsmaterial/WiB Ressourcen/LehrplanPLUS/
//   · Moritz-Steigerwald 2018: »Planung von Unterrichtseinheiten im Fach WiB«
//     (AG der MS-Seminarleiter/-innen Unterfranken, Baustein GB)
//   · QM_WiB_Unterrichtsqualitaet_Evaluationsrahmen.md (Audit-Dimensionen A-G)
//   · Leitfaden_Methoden_Gegenstandsbereiche.md (Methodenmatrix 5 GB)
//   · Lernziele_WiB_Leitfaden.md (Mager-Schema)

window.MATRIX = {
  fach: 'D Wirtschaft und Beruf',
  fachKuerzel: 'WiB',
  schulart: 'Mittelschule Bayern · Leitfach Berufsorientierung',

  meta: {
    version: 'v1 · 2026-05-18 · 13-Phasen-Standard',
    spaltenLogik: 'Fünf Gegenstandsbereiche (Arbeit · Berufsorientierung · Wirtschaft · Technik · Recht) gemaess LP+ Bayern Fachprofil WiB + LB6 Projekt als übergreifender Lernbereich. NICHT GPG-Lernbereich-Logik.',
    quellenLogik: 'verbatim für LP+-Fachprofil WiB (lokal vorhanden). sekundaer für jgst-spezifische KEs (Anleitungen + QM-Rahmen). ausstehend wo lokale LP+-Jgst-PDFs noch nicht eingelesen.',
    pilotSequenz: 'GB Berufsorientierung · Jgst. 8 · »Anforderungsprofile analysieren« · 8 UEs im 13-Phasen-Standard · Personifikation Lena',
    fachdidaktikStandard: 'Moritz-Steigerwald 2018 (Baustein GB) + QM-Rahmen A-G + Methodenmatrix 5 GB + Mager-3-K-Lernziele + 4-Spuren-Differenzierung.',
  },

  jgst: [
    { id: 'J5', label: 'Jgst. 5' },
    { id: 'J6', label: 'Jgst. 6' },
    { id: 'J7', label: 'Jgst. 7' },
    { id: 'J8', label: 'Jgst. 8' },
    { id: 'J9', label: 'Jgst. 9' },
  ],

  // Gegenstandsbereiche als Spalten + LB6 Projekt
  lernbereiche: [
    { id: 'GB1', titel: 'GB1 · Arbeit',              kurz: 'Arbeit' },
    { id: 'GB2', titel: 'GB2 · Berufsorientierung',  kurz: 'BO' },
    { id: 'GB3', titel: 'GB3 · Wirtschaft',          kurz: 'Wirtschaft' },
    { id: 'GB4', titel: 'GB4 · Technik',             kurz: 'Technik' },
    { id: 'GB5', titel: 'GB5 · Recht',               kurz: 'Recht' },
    { id: 'LB6', titel: 'LB6 · Projekt',             kurz: 'Projekt' },
  ],

  // Prozessbezogene Kompetenzen (für KSM-Tagging)
  prozesskompetenzen: [
    { id: 'PK1', label: 'Handeln',       kurz: 'Verstehen + Beurteilen + nachhaltige Entscheidung + aktive Mitgestaltung' },
    { id: 'PK2', label: 'Analysieren',   kurz: 'Erfassen + Strukturieren + Systematisieren + ganzheitliches Denken' },
    { id: 'PK3', label: 'Kommunizieren', kurz: 'Adressatenbezogen + Fachsprache + Methoden/Medien + Präsentation' },
    { id: 'PK4', label: 'Beurteilen',    kurz: 'Reflektion + Bewertung + ökon/ökol/sozial/ethisch + persönliche Reflexion' },
  ],

  // Pädagogische Perspektiven (WiB-Rollen — KSM)
  perspektiven: [
    { id: 'P1', label: 'Konsument' },
    { id: 'P2', label: 'Arbeitnehmer' },
    { id: 'P3', label: 'Unternehmer' },
    { id: 'P4', label: 'Staatsbürger' },
    { id: 'P5', label: 'Berufswähler' },
  ],

  cells: {
    // ─── J5 ─────────────────────────────────────────────────────────────
    'J5_GB1': { ke_anzahl: 2, jgst: 'J5', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB1-01', thema: 'Arbeit in unterschiedlichen Lebensbereichen wahrnehmen',
          ke_wortlaut: 'beschreiben Arbeit in unterschiedlichen Lebensbereichen (Haushalt · Beruf · Ehrenamt) und unterscheiden diese nach Sinn und Form.',
          ke_wortlaut_quelle: 'WiB-Anleitungen Jgst-Progression · sekundär aus LP+ Fachprofil',
          inhalte_lp: ['Formen von Arbeit · materielle Hausarbeit · Erziehungsarbeit · Pflegearbeit · Beziehungsarbeit · Erwerbsarbeit'],
          fundort: 'WiB-Anleitungen Jgst. 5 (sekundär)' },
        { ke_id: 'J5-GB1-02', thema: 'Eigene Arbeitserfahrungen reflektieren',
          ke_wortlaut: 'reflektieren eigene Arbeitserfahrungen in Familie und Schule und bewerten deren Sinn.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Mitarbeit im Haushalt · Klassendienste · Schülerprojekte'],
          fundort: 'WiB-Anleitungen Jgst. 5' },
      ],
    },
    'J5_GB2': { ke_anzahl: 1, jgst: 'J5', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB2-01', thema: 'Berufe im Lebensumfeld kennenlernen',
          ke_wortlaut: 'erkunden Berufe im eigenen Lebensumfeld (Eltern · Verwandte · Nachbarn) und beschreiben deren Tätigkeiten.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Berufsporträts · Erstaktivierung Berufswahlpass-Vorstufe'],
          fundort: 'WiB-Anleitungen Jgst. 5' },
      ],
    },
    'J5_GB3': { ke_anzahl: 1, jgst: 'J5', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB3-01', thema: 'Konsumverhalten reflektieren',
          ke_wortlaut: 'reflektieren ihr eigenes Konsumverhalten und unterscheiden Bedürfnisse von Wünschen.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Bedürfnishierarchie · Taschengeld · Werbeeinflüsse'],
          fundort: 'WiB-Anleitungen Jgst. 5' },
      ],
    },
    'J5_GB4': { ke_anzahl: 1, jgst: 'J5', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB4-01', thema: 'Technische Geräte im Alltag betrachten',
          ke_wortlaut: 'beschreiben technische Geräte in Schule und Haushalt nach ihrer Funktion und benennen Motive ihrer Erfindung.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 5',
          inhalte_lp: ['Erfindung · Geräte in Schule/Haushalt · Objektbetrachtung · Motive und Grenzen'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 278 (sekundär)' },
      ],
    },
    'J5_GB5': { ke_anzahl: 1, jgst: 'J5', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB5-01', thema: 'Schul- und Hausordnung als Regelsystem',
          ke_wortlaut: 'verstehen Schul- und Hausordnung als Regelsystem und begründen die Notwendigkeit gemeinsamer Regeln.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Schulordnung · Klassenregeln · Kinderrechte (Anbahnung)'],
          fundort: 'WiB-Anleitungen Jgst. 5' },
      ],
    },
    'J5_LB6': { ke_anzahl: 1, jgst: 'J5', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-LB6-01', thema: 'Projektorientiertes Vorgehen — behutsam mit starker L-Steuerung',
          ke_wortlaut: 'beteiligen sich an einem kleinen Klassenprojekt (z.B. Klassenzimmer-Gestaltung · Schulfest-Beitrag) und benennen Projektphasen.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau des Fachlehrplans',
          inhalte_lp: ['Projektinitiative · Projektplanung · Durchführung · Präsentation · Reflexion (mit hoher L-Steuerung)'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 18' },
      ],
    },

    // ─── J6 ─────────────────────────────────────────────────────────────
    'J6_GB1': { ke_anzahl: 1, jgst: 'J6', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB1-01', thema: 'Vielfalt von Arbeit untersuchen',
          ke_wortlaut: 'untersuchen die Vielfalt von Arbeit in der Gesellschaft und benennen Unterschiede in Form, Sinn und Wertschätzung.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Hauptberufe · Nebentätigkeiten · ehrenamtliche Arbeit · gesellschaftliche Wertschätzung'],
          fundort: 'WiB-Anleitungen Jgst. 6' },
      ],
    },
    'J6_GB2': { ke_anzahl: 1, jgst: 'J6', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB2-01', thema: 'Eigene Stärken und Interessen erkunden',
          ke_wortlaut: 'erkunden ihre eigenen Stärken und Interessen und ordnen ihnen Tätigkeitsbereiche zu.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Selbstbild-Fremdbild-Vergleich · Interessen-Inventur · erste Berufsfelder zuordnen'],
          fundort: 'WiB-Anleitungen Jgst. 6' },
      ],
    },
    'J6_GB3': { ke_anzahl: 1, jgst: 'J6', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB3-01', thema: 'Geldkreislauf in der Familie',
          ke_wortlaut: 'beschreiben den Geldkreislauf in der Familie und unterscheiden Einnahmen von Ausgaben.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Haushaltsplan-Vorstufe · Einnahmen · Ausgaben · Sparen'],
          fundort: 'WiB-Anleitungen Jgst. 6' },
      ],
    },
    'J6_GB4': { ke_anzahl: 1, jgst: 'J6', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB4-01', thema: 'Technikerkundung mit Experteneinsatz',
          ke_wortlaut: 'erkunden technische Geräte und Verfahren mit Expertengesprächen und beschreiben Funktionen sowie Energieaufwand.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 6',
          inhalte_lp: ['Technikerkundung · Expertengespräche · Funktionen · Energieaufwand · technischer Wandel'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 280 (sekundär)' },
      ],
    },
    'J6_GB5': { ke_anzahl: 1, jgst: 'J6', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB5-01', thema: 'Kinderrechte und ihre Bedeutung',
          ke_wortlaut: 'kennen wichtige Kinderrechte und begründen ihre Bedeutung für das eigene Leben.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['UN-Kinderrechtskonvention · Schutz · Förderung · Beteiligung'],
          fundort: 'WiB-Anleitungen Jgst. 6' },
      ],
    },
    'J6_LB6': { ke_anzahl: 1, jgst: 'J6', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-LB6-01', thema: 'Projektplanung mit L-Steuerung — Übergang zur Selbstständigkeit',
          ke_wortlaut: 'planen und führen ein Projekt unter Anleitung durch und reflektieren ihren Beitrag im Team.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau Fachlehrplan',
          inhalte_lp: ['Projekt-5-Phasen · Aufgabenteilung im Team · Zeitplan · Reflexion'],
          fundort: 'Aufbau-Fachlehrplan-Md' },
      ],
    },

    // ─── J7 ─────────────────────────────────────────────────────────────
    'J7_GB1': { ke_anzahl: 2, jgst: 'J7', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB1-01', thema: 'Aufwand und Ertrag von Arbeit analysieren',
          ke_wortlaut: 'analysieren Aufwand und Ertrag verschiedener Arbeitsformen und beurteilen ihre ökonomischen und ökologischen Auswirkungen.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression · sekundär',
          inhalte_lp: ['Aufwand-Ertrag-Verhältnis · ökonomische und ökologische Folgen · technischer Wandel der Arbeitsprozesse'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 282' },
        { ke_id: 'J7-GB1-02', thema: 'Arbeit als personale und gesellschaftliche Realität',
          ke_wortlaut: 'beschreiben Arbeit als personale und gesellschaftliche Realität und reflektieren eigene Erfahrungen.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Arbeitsformen · Wertschätzung · Wandel der Arbeitswelt (Anbahnung)'],
          fundort: 'WiB-Anleitungen Jgst. 7' },
      ],
    },
    'J7_GB2': { ke_anzahl: 2, jgst: 'J7', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB2-01', thema: 'Berufswahlportfolio anlegen',
          ke_wortlaut: 'legen ein Berufswahlportfolio an und dokumentieren erste Erkundungsergebnisse über sich selbst und Berufsfelder.',
          ke_wortlaut_quelle: 'QM-Rahmen Berufsorientierung-Kernkompetenzen Jgst. 7',
          inhalte_lp: ['Berufswahlportfolio · individuelle Sichtweisen von Arbeit und Beruf · berufliche Tätigkeitsbereiche · Informationsbeschaffung'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 302-311' },
        { ke_id: 'J7-GB2-02', thema: 'Berufsfelder erkunden — erste Betriebserkundung',
          ke_wortlaut: 'erkunden Berufsfelder im Rahmen einer ersten Betriebserkundung und vergleichen sie mit eigenen Vorstellungen.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden-GB · BO',
          inhalte_lp: ['Betriebserkundung · Beobachtungsbogen · Anforderungsprofile (Anbahnung)'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 50' },
      ],
    },
    'J7_GB3': { ke_anzahl: 1, jgst: 'J7', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB3-01', thema: 'Wirtschaftskreislauf — einfache Akteure',
          ke_wortlaut: 'beschreiben den einfachen Wirtschaftskreislauf (Haushalt · Unternehmen) und ordnen ihre eigene Rolle als Konsument zu.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Wirtschaftskreislauf · Akteure · Konsument-Rolle · Werbung kritisch'],
          fundort: 'WiB-Anleitungen Jgst. 7' },
      ],
    },
    'J7_GB4': { ke_anzahl: 1, jgst: 'J7', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB4-01', thema: 'Vielfalt von Technik im Haushalt analysieren',
          ke_wortlaut: 'analysieren die Vielfalt technischer Geräte im Haushalt und beurteilen ihre ökonomischen und ökologischen Auswirkungen.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 7',
          inhalte_lp: ['Vielfalt Haushalt · Aufwand/Ertrag · ökonomische/ökologische Auswirkungen · technischer Wandel → Arbeitsprozesse + Qualifikation'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 283' },
      ],
    },
    'J7_GB5': { ke_anzahl: 1, jgst: 'J7', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB5-01', thema: 'Verbraucherrecht — erste Schritte',
          ke_wortlaut: 'kennen grundlegende Verbraucherrechte (Widerrufsrecht · Gewährleistung) und wenden sie auf einfache Alltagsfälle an.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Widerrufsrecht · Gewährleistung · einfache Verbraucher-Fälle'],
          fundort: 'WiB-Anleitungen Jgst. 7' },
      ],
    },
    'J7_LB6': { ke_anzahl: 1, jgst: 'J7', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J7-LB6-01', thema: 'Leittextorientierte Projektarbeit · Übergang zur Selbstständigkeit',
          ke_wortlaut: 'beginnen selbstständige leittextorientierte Projektarbeit und dokumentieren kontinuierlich den Berufswahlprozess.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan · Z. 18-20',
          inhalte_lp: ['Leittextmethode (Anbahnung) · vollständige Handlung (Planen · Durchführen · Prüfen · Bewerten) · kontinuierliche Portfolio-Pflege'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 19' },
      ],
    },

    // ─── J8 ─────────────────────────────────────────────────────────────
    'J8_GB1': { ke_anzahl: 1, jgst: 'J8', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB1-01', thema: 'Arbeitsplatzbedingungen — Ergonomie und Arbeitsschutz',
          ke_wortlaut: 'beschreiben Arbeitsplatzbedingungen aus einer Betriebserkundung und beurteilen Aspekte von Ergonomie und Arbeitsschutz.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 8',
          inhalte_lp: ['Betriebserkundung · Produktionsverfahren · Produktionsmittel · Arbeitsplatzbedingungen · Ergonomie · Arbeitsschutz'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 284' },
      ],
    },
    'J8_GB2': { ke_anzahl: 3, jgst: 'J8', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J8-GB2-01', thema: '★ Anforderungsprofile von Ausbildungsberufen analysieren',
          ke_wortlaut: 'analysieren die Anforderungen eines Ausbildungsberufs anhand von Stellenanzeigen und Berufsbildern und vergleichen sie mit dem eigenen Stärken-Schwächen-Profil.',
          ke_wortlaut_quelle: 'Praktischer_Leitfaden_WiB_Unterrichtseinheit · Kapitel 4',
          ke_wortlaut_anker: ['analysieren', 'Anforderungen', 'Ausbildungsberufs', 'Stellenanzeigen', 'Stärken-Schwächen-Profil'],
          inhalte_lp: ['Stellenanzeigen-Analyse · Berufsbild-Auswertung · fachliche vs. personale Anforderungen · Stärken-Schwächen-Inventur · Übereinstimmungs-Matrix'],
          fundort: 'Praktischer_Leitfaden_WiB_Unterrichtseinheit.md · Z. 100-116',
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Pilot-Sequenz · Anforderungsprofile (8 UEs · 13-Phasen-Standard)',
          pilot_sequenz: {
            titel: '8-UE-Sequenz · Anforderungsprofile analysieren — Lenas Weg zum Ausbildungsberuf',
            praxis: 'Idealtypisch nach Praktischer_Leitfaden_WiB + Moritz-Steigerwald 2018',
            gesamtzeit: '8 UEs à 45 min = 6 Zeitstunden',
            phasenStandard: 'WiB-Bayern · 13-Phasen-Artikulation (Moritz-Steigerwald 2018, Baustein GB)',
            qualitaetsstandards_quelle: 'WiB Ressourcen · LehrplanPLUS Fachprofil + QM-Rahmen A-G + Anleitungen/Lernziele_WiB + WiB_BUV_Entwicklung/GUIDELINE_WiB_Phasenstruktur_Transformation.md + Leitfaden_Methoden_Gegenstandsbereiche.md',
            sequenz_meta: {
              lehrplanbezug: 'WiB Jgst. 8 · GB2 Berufsorientierung · KE J8-GB2-01 (+ Quervernetzung zu GB1 Arbeit)',
              kompetenzerwartungen_verbatim: [
                'Die Schülerinnen und Schüler analysieren die Anforderungen eines Ausbildungsberufs anhand von Stellenanzeigen und Berufsbildern und vergleichen sie mit dem eigenen Stärken-Schwächen-Profil.',
                'Die Schülerinnen und Schüler beschreiben Arbeitsplatzbedingungen aus einer Betriebserkundung und beurteilen Aspekte von Ergonomie und Arbeitsschutz.',
              ],
              inhalte_lp_verbatim: [
                'Stellenanzeigen-Analyse · Berufsbild-Auswertung',
                'fachliche vs. personale Anforderungen',
                'Stärken-Schwächen-Inventur (Selbstbild · Fremdbild)',
                'Übereinstimmungs-Matrix Anforderung × Stärke',
                'Berufswahlportfolio-Pflege',
              ],
              zielsetzung_uebergeordnet: 'Die Sequenz schliesst an die Stärken-Inventur Jgst. 7 (GB2-01) an und führt zur Vorbereitung des Betriebspraktikums (Jgst. 8/9). Anhand der Identifikationsfigur Lena (Wunschberuf Fachverkäuferin im Bäckerei-Handwerk) erschliessen SuS systematisch, wie man Berufsanforderungen analysiert und mit eigenem Profil abgleicht. Ziel: realistische Selbsteinschätzung als Voraussetzung für reflektierte Berufswahl.',
              methodische_schwerpunkte: [
                'Personifikation (Lena) als sequenzdurchgängige Identifikationsstrategie',
                'Stellenanzeigen-Analyse + Berufsbild-Auswertung (kanonische WiB-Methoden GB2)',
                'Portfolioarbeit (Berufswahlportfolio fortlaufend gepflegt)',
                'Rollenspiel Bewerbungsgespräch (UE 7)',
                'Differenzierung in 4 Spuren (DaZ · LRS · leistungsschwach · leistungsstark) pro UE',
                '13-Phasen-Artikulation pro UE (nicht generische 5-Phasen!)',
              ],
              kompetenzerwerb_progression: 'PK-Progression: UE 1-2 vorrangig PK2 (Analysieren · Stellenanzeigen). UE 3-4 PK2+PK3 (Berufsbild-Auswertung · Präsentation). UE 5 (Schwerpunktstunde) PK4 (Beurteilen · Stärken-Profil-Abgleich). UE 6 PK4 (Diskrepanz reflektieren). UE 7 PK1+PK3 (Handeln · Kommunizieren im Rollenspiel). UE 8 PK4 (Transfer · Selbsteinschätzung).',
              personifikation_durchgaengig: 'Identifikationsfigur Lena (14, Jgst. 8, Wunschberuf Fachverkäuferin im Bäckereihandwerk · Stärken: Mathe-Grundrechnen sicher · sozial offen · LRS schwach · Frühaufstehen mag · Kundenkontakt liebt). Wiederkehrend: UE 1 (Lenas Frage) · UE 3 (Lenas Berufsbild-Recherche) · UE 5 (Lenas Profil-Matrix) · UE 6 (Lenas Diskrepanz LRS vs. Kassenarbeit) · UE 7 (Lenas Bewerbungsgespräch) · UE 8 (Lenas Plan B).',
              schwerpunktstunde_kandidat: 'UE 5 · Anforderungsprofil ↔ Stärken-Schwächen-Matrix (PK4 · AFB III · 13-Phasen vollständig)',
            },
            sequenz_tabelle: [
              { uze: 1, datum: 'KW 09 · Mo', stundenthema_frage: 'Was hilft Lena, ihren passenden Beruf zu finden?',
                prozesskompetenz: 'PK2 Analysieren · PK3 Kommunizieren',
                gegenstand: 'Berufsorientierung · Arbeit', perspektive: 'P5 Berufswähler',
                stundenziel_kurz: 'Problemfrage Berufswahl + Sequenzziel + Lenas Ausgangslage', kommentar: 'Sequenz-Einstieg · Personifikation Lena',
                schwerpunkt: false },
              { uze: 2, datum: 'KW 09 · Mi', stundenthema_frage: 'Wie lesen wir eine Stellenanzeige systematisch?',
                prozesskompetenz: 'PK2 Analysieren', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'Stellenanzeigen-Analyse: fachlich vs. personal trennen',
                kommentar: 'Methode · Stellenanzeigen-Analyse · 4-Spuren-Diff', schwerpunkt: false },
              { uze: 3, datum: 'KW 10 · Mo', stundenthema_frage: 'Was steht in einem Berufsbild — und was nicht?',
                prozesskompetenz: 'PK2 Analysieren · PK3 Kommunizieren', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'BERUFENET-Recherche + Berufsbild-Auswertung',
                kommentar: 'BO-Methode · Computer-Raum · BERUFENET', schwerpunkt: false },
              { uze: 4, datum: 'KW 10 · Mi', stundenthema_frage: 'Was kann ich gut — und was nicht so gut?',
                prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'Stärken-Schwächen-Inventur (Selbst- + Fremdbild)',
                kommentar: 'Portfolio · Selbsteinschätzung + Partner-Fremdbild', schwerpunkt: false },
              { uze: 5, datum: 'KW 11 · Mo',
                stundenthema_frage: 'Passt Lenas Stärken-Profil zur Stelle als Fachverkäuferin Bäckerei?',
                prozesskompetenz: 'PK4 Beurteilen · PK2 Analysieren', gegenstand: 'Berufsorientierung · Arbeit',
                perspektive: 'P5 Berufswähler · P2 Arbeitnehmer',
                stundenziel_kurz: 'Anforderungs-Profil ↔ Stärken-Profil Matrix · Werturteil',
                kommentar: '**SCHWERPUNKTSTUNDE-KANDIDAT** · AFB III · 13-Phasen vollständig', schwerpunkt: true },
              { uze: 6, datum: 'KW 11 · Mi', stundenthema_frage: 'Was, wenn etwas Wichtiges nicht passt?',
                prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'Diskrepanz-Strategien · Förder-Optionen · Plan B',
                kommentar: 'Lenas LRS vs. Kassenarbeit · Lösungswege', schwerpunkt: false },
              { uze: 7, datum: 'KW 12 · Mo', stundenthema_frage: 'Wie überzeugt Lena die Chefin im Bewerbungsgespräch?',
                prozesskompetenz: 'PK1 Handeln · PK3 Kommunizieren', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'Rollenspiel Bewerbungsgespräch · Selbstpräsentation',
                kommentar: 'Methode Rollenspiel · paarweise · Beobachter-Feedback', schwerpunkt: false },
              { uze: 8, datum: 'KW 12 · Mi', stundenthema_frage: 'Was nehme ICH aus Lenas Geschichte mit für meinen Weg?',
                prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'P5 Berufswähler', stundenziel_kurz: 'Transfer · eigener Berufswahlplan-Update',
                kommentar: 'Sequenz-Abschluss · Berufswahlportfolio-Update', schwerpunkt: false },
            ],
            phasenSchema: [
              { id: 'p01', label: '1 Hinführung',         kurz: 'Vorwissen aktivieren' },
              { id: 'p02', label: '2 Problemstufe',       kurz: 'Lebenserfahrung problematisieren' },
              { id: 'p03', label: '3 Zielangabe',         kurz: 'Stundenthema + PK transparent' },
              { id: 'p04', label: '4 Vermutungen',        kurz: 'Hypothesen sammeln (unbewertet)' },
              { id: 'p05', label: '5 Lösungsplanung',     kurz: 'Was/Wozu/Wer/Wie/Womit' },
              { id: 'p06', label: '6 Lösung',             kurz: 'HAUPTPHASE · selbstständige Arbeit' },
              { id: 'p07', label: '7 Präsentation',       kurz: 'SuS als Experten' },
              { id: 'p08', label: '8 Erkenntnisstufe',    kurz: 'Begriffsarbeit · Strukturwissen' },
              { id: 'p09', label: '9 Wertungsstufe',      kurz: 'Persönliche Reflexion · Haltungen' },
              { id: 'p10', label: '10 Zusammenfassung',   kurz: 'SuS verbalisieren Gesamtergebnis' },
              { id: 'p11', label: '11 Vermutungen prüfen', kurz: 'Verifizieren/Falsifizieren' },
              { id: 'p12', label: '12 Transfer',          kurz: 'Neuer Kontext' },
              { id: 'p13', label: '13 Sicherung',         kurz: 'Lernprozess-Reflexion · Hefteintrag' },
            ],
            ues_detail: [
              // ── UE 5 (Schwerpunktstunde-Kandidat) — voll ausgearbeitet ──
              {
                nr: 5,
                titel: 'Anforderungs-Profil ↔ Stärken-Profil · Lenas Matrix',
                stundenthema_frage: 'Passt Lenas Stärken-Profil zur Stelle als Fachverkäuferin Bäckerei?',
                minuten: 45,
                lernziel: 'SuS beurteilen die Passung eines Anforderungsprofils zu einem Stärken-Schwächen-Profil und erkennen Diskrepanzen.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler beurteilen die Passung eines Anforderungsprofils zu einem Staerken-Schwaechen-Profil,',
                  bedingung: 'indem sie in 4er-Gruppen die in UE 2-4 erarbeiteten Anforderungen und Staerken in eine 3-Felder-Matrix (passt · neutral · Diskrepanz) eintragen und im Plenum gegenseitig pruefen,',
                  maszstab: 'was daran erkennbar wird, dass jede Gruppe ihre Matrix mit mindestens fuenf Anforderungs-Staerken-Paaren befuellt und im Plenum eine begruendete Gesamt-Passungs-Einschaetzung praesentiert.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS rekonstruieren das Anforderungsprofil Fachverkaeuferin Baeckerei,',
                    indem: 'indem sie die Stellenanzeigen-Analyse (UE 2) und die BERUFENET-Auswertung (UE 3) zusammenfuehren,',
                    erkennbar: 'was daran erkennbar wird, dass die Anforderungs-Spalte mindestens fuenf Eintraege (fachlich + personal) traegt.', afb: 'I', differenziert: false },
                  { tz: 'SuS ordnen Lenas Staerken der jeweiligen Anforderung zu,',
                    indem: 'indem sie pro Anforderung Lenas Selbst- + Fremdbild aus UE 4 abgleichen,',
                    erkennbar: 'was daran erkennbar wird, dass jede Anforderung eine Markierung passt/neutral/Diskrepanz traegt.', afb: 'II', differenziert: false },
                  { tz: 'SuS begruenden eine Gesamt-Passungs-Einschaetzung,',
                    indem: 'indem sie im Plenum die Matrix vorstellen und eine 3-Stufen-Bewertung (sehr passend · passend mit Foerderbedarf · eher unpassend) waehlen,',
                    erkennbar: 'was daran erkennbar wird, dass die Bewertung mit mindestens zwei Argumenten gestuetzt wird.', afb: 'III', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS reflektieren die methodische Aussagekraft der Matrix,',
                    indem: 'indem sie pruefen, welche Anforderung nicht aus Stellenanzeige + Berufsbild allein ableitbar ist (z.B. Belastbarkeit),',
                    erkennbar: 'was daran erkennbar wird, dass sie im Plenum mindestens eine Methoden-Grenze benennen und einen ergaenzenden Erhebungsweg vorschlagen (z.B. Praktikum).', afb: 'III', differenziert: true },
                ],
                // 13-Phasen-Verlauf
                p01: '3\' · Hinführung: »Erinnert ihr Lenas Stellenanzeige + ihr Berufsbild aus letzter Stunde?« — Wortkarten an Tafel sammeln (5 Anforderungen).',
                p02: '2\' · Problemstufe: »Lena hat die Stellenanzeige gelesen. Sie ist hin- und hergerissen. Wie kann sie wissen, ob die Stelle wirklich zu ihr passt?«',
                p03: '2\' · Zielangabe: »Wir analysieren heute (PK4 Beurteilen), wie wir Anforderungen und Staerken systematisch vergleichen.«',
                p04: '2\' · Vermutungen sammeln: »Wie wuerdet IHR vorgehen?« — Vermutungen unbewertet an Tafel.',
                p05: '3\' · Loesungsplanung: Tafelbild 3-Felder-Matrix (passt · neutral · Diskrepanz). Arbeitsplan: Gruppen 4er · 15\' Bearbeitung · 5\' Praesentation pro Gruppe.',
                p06: '15\' · Loesung (HAUPTPHASE): 4er-Gruppen befuellen Matrix fuer Lenas Profil. Materialien: AB Anforderungen (aus UE 2-3), AB Lenas Staerken (aus UE 4 Selbst+Fremdbild), Matrix-Vorlage. L als Berater.',
                p07: '8\' · Praesentation: jede Gruppe 2\' Matrix + 1 zentrale Aussage. Tafel-Synthese.',
                p08: '4\' · Erkenntnisstufe: Begriffsarbeit »Anforderungs-Stärken-Passung« als Fachbegriff klaeren. Definition ins Heft.',
                p09: '3\' · Wertungsstufe: »Welche Diskrepanz wiegt fuer Lena schwerer — fachlich oder personal? Warum?«',
                p10: '1\' · Gesamtzusammenfassung: SuS verbalisieren: »Wir koennen jetzt eine Anforderungs-Stärken-Matrix erstellen und Diskrepanzen erkennen.«',
                p11: '1\' · Vermutungen pruefen: Tafel-Rueckblick auf p04. Welche Vermutung hat sich bestaetigt?',
                p12: '2\' · Transfer: »Wendet die Matrix-Logik einmal auf EUREN Wunschberuf an (Stichpunkte ins Heft).«',
                p13: '1\' · Sicherung: Hefteintrag »Anforderungs-Stärken-Matrix als Werkzeug der Berufswahl« · LZK-Mini: »Nenne 2 Anforderungen und je 1 passende Eigenschaft«.',
                phasen_minuten: { p01: 3, p02: 2, p03: 2, p04: 2, p05: 3, p06: 15, p07: 8, p08: 4, p09: 3, p10: 1, p11: 1, p12: 2, p13: 1 },
                sozialform_phasen: {
                  p01: 'Plenum (Tafel-Sammlung)', p02: 'L-Impuls + UG',
                  p03: 'L-Impuls (Tafel-Visualisierung)', p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Arbeitsplan)', p06: 'GA (4er)',
                  p07: 'Plenum (Galerie)', p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Reflexion)', p10: 'UG (SuS verbalisieren)',
                  p11: 'UG', p12: 'EA',
                  p13: 'EA',
                },
                differenzierung_block: {
                  daz: 'Wortspeicher zentral: Anforderung · Staerke · Diskrepanz · Passung · Profil. Matrix-Vorlage mit Bildsymbolen (Daumen hoch/seitlich/runter). Lese-Tandem bei AB-Lektuere.',
                  lrs: 'AB-Materialien in 14pt+ · Matrix-Vorlage mit grossen Feldern · Bilder zur Selbst-Reflexion erlaubt (statt Text).',
                  leistungsschwach: 'Matrix-Vorlage mit drei Anforderungen bereits vorbefuellt · Auswahl statt freier Eintrag · Schreibgeruest fuer Praesentation (3 Saetze).',
                  leistungsstark: 'Zusatzaufgabe Methodenreflexion: »Wo stoesst die Matrix an Grenzen?« (Belastbarkeit aus Stellenanzeige nicht ableitbar — Praktikum noetig) als AFB-III-Aufgabe.',
                },
                personifikation_anteil: 'Lena als zentrale Identifikationsfigur: Selbstbild + Fremdbild aus UE 4 sind in der Matrix konkret abgebildet (Beispiel: Anforderung »Frühaufstehen« passt — Lenas eigene Aussage UE 4; Anforderung »Kassiertaetigkeit« mit Diskrepanz wegen Lenas LRS).',
                tafelbild_skizze: '3-Spalten-Tafel: links Anforderungen (5 Eintraege aus UE 2-3) · Mitte Lenas Staerken (aus UE 4) · rechts 3-Felder-Bewertung (passt · neutral · Diskrepanz). Unten: Gesamt-Passungs-Einschaetzung in 3 Stufen.',
                hausaufgabe: 'Wendet die Matrix-Logik auf euren persoenlichen Wunschberuf an (Stichpunkte) · Vorbereitung UE 6 Diskrepanz-Strategien.',
                material: 'AB Anforderungs-Liste (5 Eintraege) · AB Lenas Staerken-Profil (Selbst + Fremdbild) · Matrix-Vorlage A3 · Wortspeicher · Schreibgeruest fuer Praesentation · Hefteintrag-Schablone',
                lp_bezug: 'KE J8-GB2-01 (Anforderungsprofile) · Quervernetzung KE J7-GB2-01 (Berufswahlportfolio) und KE J8-GB1-01 (Arbeitsplatzbedingungen)',
                prinzipien_b3: ['Kompetenzorientierung', 'Problemorientierung', 'Handlungsorientierung', 'Personifikation', 'Lebensbezug'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung · Arbeit',
                  perspektive: 'P5 Berufswähler · P2 Arbeitnehmer',
                  prozesskompetenz: 'PK4 Beurteilen (Schwerpunkt) · PK2 Analysieren (vorbereitend)',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.3 Orientierung über sich wandelnde Arbeitswelt · G1.6 Handlungsorientierte Lernmethoden',
                didaktik: 'Anforderungs-Stärken-Matrix als zentrales BO-Werkzeug · Personifikation (Lena) als Modelllernen · 13-Phasen-Standard nach Moritz-Steigerwald 2018 (Baustein GB) · Mager-Lernziele · 4-Spuren-Differenzierung'
              },
              // ── UE 1 — Sequenz-Einstieg (kompakt nach 13-Phasen-Logik) ──
              {
                nr: 1,
                titel: 'Sequenz-Einstieg · Lena trifft eine Entscheidung',
                stundenthema_frage: 'Was hilft Lena, ihren passenden Beruf zu finden?',
                minuten: 45,
                lernziel: 'SuS aktivieren ihr Vorwissen zur Berufswahl und benennen die Komponenten einer fundierten Berufsentscheidung.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler aktivieren ihr Vorwissen zur Berufswahl und benennen drei Komponenten einer fundierten Berufsentscheidung,',
                  bedingung: 'indem sie an der Identifikationsfigur Lena (Wunschberuf Fachverkaeuferin Baeckerei) deren Frage »Passt der Beruf zu mir?« diskutieren und Komponenten an der Tafel sammeln,',
                  maszstab: 'was daran erkennbar wird, dass die Tafel-Sammlung mindestens drei Komponenten (Anforderungen kennen · eigene Staerken kennen · beide vergleichen) tragt und jede:r SuS einen Eintrag im Berufswahlportfolio anlegt.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS aktivieren ihr Vorwissen aus Jgst. 7 (Berufswahlportfolio),', indem: 'indem sie ihre Portfolio-Eintraege (Staerken-Inventur) kurz wieder durchblättern,', erkennbar: 'was daran erkennbar wird, dass jede:r SuS mindestens drei eigene Staerken-Eintraege rekonstruiert.', afb: 'I', differenziert: false },
                  { tz: 'SuS empathisieren mit Lenas Berufswahl-Situation,', indem: 'indem sie Lenas Steckbrief (Stärken + Frage) lesen und benennen, was Lena fuer ihre Entscheidung braucht,', erkennbar: 'was daran erkennbar wird, dass die Tafel mindestens drei Bedarfs-Eintraege traegt.', afb: 'II', differenziert: false },
                  { tz: 'SuS leiten den Sequenz-Plan ab,', indem: 'indem sie mit der Lehrkraft die acht UE-Schritte als Lenas Weg planen,', erkennbar: 'was daran erkennbar wird, dass der Sequenz-Plan im Heft mit acht Stationen steht.', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS formulieren eine eigene Berufswahl-Frage analog zu Lena,', indem: 'indem sie ihren Wunschberuf benennen und eine konkrete »Passt-Frage« schreiben,', erkennbar: 'was daran erkennbar wird, dass mindestens drei SuS ihre Frage im Plenum vorstellen.', afb: 'III', differenziert: true },
                ],
                p01: '4\' · Hinfuehrung: Portfolio durchblättern · Vorwissen Jgst. 7 reaktivieren.',
                p02: '4\' · Problemstufe: Lenas Steckbrief lesen — »Sie weiss nicht, ob die Stelle zu ihr passt.«',
                p03: '2\' · Zielangabe: »Heute klaeren wir: was braucht Lena fuer ihre Entscheidung?« (PK2 Analysieren)',
                p04: '4\' · Vermutungen: Tafel-Sammlung »Was braucht Lena?« — unbewertet.',
                p05: '3\' · Loesungsplanung: 8-UE-Sequenzplan visualisieren.',
                p06: '12\' · Loesung: Partnerarbeit — eigenen Wunschberuf benennen + erste »Passt-Frage« formulieren.',
                p07: '5\' · Praesentation: 3-5 SuS stellen ihre Frage vor.',
                p08: '2\' · Erkenntnisstufe: Begriff »Berufswahl« klaeren (Tafel-Definition).',
                p09: '3\' · Wertungsstufe: »Wer hat schon konkrete Vorstellungen — wer noch nicht?« — Reflexion.',
                p10: '2\' · Gesamtzusammenfassung: Sequenz-Plan + drei Komponenten an Tafel.',
                p11: '1\' · Vermutungen pruefen: Vorab-Sammlung mit Lehrkraft-Ergaenzungen abgleichen.',
                p12: '2\' · Transfer: »Frag heute Abend ein Familienmitglied: Was ist sein/ihr Beruf — und passt der zu ihm/ihr?«',
                p13: '1\' · Sicherung: Heft-Eintrag »Drei Komponenten der Berufswahl« · Berufswahlportfolio mit Eintrag »Mein Wunschberuf«.',
                phasen_minuten: { p01: 4, p02: 4, p03: 2, p04: 4, p05: 3, p06: 12, p07: 5, p08: 2, p09: 3, p10: 2, p11: 1, p12: 2, p13: 1 },
                sozialform_phasen: {
                  p01: 'EA (Portfolio)', p02: 'Plenum (Steckbrief lesen)',
                  p03: 'L-Impuls', p04: 'UG (Tafel)',
                  p05: 'L-Plenum (Sequenz-Plan)', p06: 'PA',
                  p07: 'Plenum', p08: 'UG',
                  p09: 'UG (Reflexion)', p10: 'UG',
                  p11: 'UG', p12: 'L-Impuls (HA-Auftrag)',
                  p13: 'EA',
                },
                differenzierung_block: {
                  daz: 'Lenas Steckbrief mit Bildern · Wortspeicher Beruf · Berufswahl · Anforderung · Staerke. PA-Partnerwahl mit DaZ-fähigem Tandem.',
                  lrs: 'Steckbrief in 14pt+ · Vortragen erlaubt · Stichpunkte statt ganze Saetze.',
                  leistungsschwach: 'Vorgegebener Berufsfeld-Katalog (10 Berufe) zur Auswahl statt freier Eintrag.',
                  leistungsstark: 'Eigene »Passt-Frage« mit zwei konkreten Bewertungskriterien formulieren (AFB III).',
                },
                personifikation_anteil: 'Erstvorstellung Lena · zentraler Hook der Sequenz · Steckbrief (Foto + Stärken-Bild + Frage) als Wiederbezugspunkt fuer alle 8 UEs.',
                tafelbild_skizze: 'Drei-Zonen-Tafel: links Lenas Steckbrief (Foto + Stärken) · Mitte »Was braucht Lena?« (Vermutungs-Sammlung) · rechts Sequenz-Plan 8 Schritte.',
                hausaufgabe: 'Frag heute Abend ein Familienmitglied: »Was ist dein Beruf — und passt der zu dir? Warum?« · Notiz ins Heft.',
                material: 'Lenas Steckbrief (laminiert · 1 pro 2er-Tisch) · Berufswahlportfolio-Mappen · Wortspeicher · Sequenz-Plan-Plakat',
                lp_bezug: 'KE J7-GB2-01 (Portfolio Anbahnung) · KE J8-GB2-01 (Anforderungsprofile)',
                prinzipien_b3: ['Schuelerorientierung', 'Lebensbezug', 'Personifikation', 'Problemorientierung'],
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK2 Analysieren (Anbahnung)' },
                kernintention_wib: 'G1.4 Vorbereitung auf zukuenftige Rollen · G1.7 Berufswahlreife',
                didaktik: 'Sequenz-Hook mit Personifikation (Lena) · Anschluss an Portfolio Jgst. 7 · 13-Phasen-Artikulation auch im Sequenz-Einstieg konsequent durchgehalten.'
              },
              // ── UE 2-4, 6-8 sind GERÜST-STAGE (titel + lernziel + sozialform-Kern, keine 13-Phase voll) ──
              { nr: 2, titel: 'Stellenanzeigen-Analyse · fachlich vs. personal', stundenthema_frage: 'Wie lesen wir eine Stellenanzeige systematisch?', minuten: 45,
                lernziel: 'SuS analysieren Stellenanzeigen systematisch und trennen fachliche von personalen Anforderungen.',
                stage: 'geruest', material: 'Auswahl 3 Stellenanzeigen Fachverkäuferin Bäckerei aus regionalen Quellen · Markier-AB · Wortspeicher',
                prinzipien_b3: ['Kompetenzorientierung', 'Methodencurriculum'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK2 Analysieren' },
                personifikation_anteil: 'Lenas konkrete Stellenanzeige als Material.',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
              { nr: 3, titel: 'BERUFENET-Recherche · Berufsbild Fachverkäufer:in', stundenthema_frage: 'Was steht in einem Berufsbild — und was nicht?', minuten: 45,
                lernziel: 'SuS recherchieren systematisch in BERUFENET und werten Berufsbilder strukturiert aus.',
                stage: 'geruest', material: 'Computer-Raum · BERUFENET-Login · Auswertungs-AB',
                prinzipien_b3: ['Methodencurriculum', 'Handlungsorientierung'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK2 Analysieren · PK3 Kommunizieren' },
                personifikation_anteil: 'Lena recherchiert ihre Wunsch-Stelle bei BERUFENET.',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
              { nr: 4, titel: 'Stärken-Schwächen-Inventur · Selbst + Fremdbild', stundenthema_frage: 'Was kann ich gut — und was nicht so gut?', minuten: 45,
                lernziel: 'SuS erstellen eine Stärken-Inventur durch Selbstbild und Partner-Fremdbild.',
                stage: 'geruest', material: 'Selbstbild-Bogen · Fremdbild-Bogen · Portfolio · Wortspeicher Stärken',
                prinzipien_b3: ['Schuelerorientierung', 'Personifikation', 'Reflexion'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln' },
                personifikation_anteil: 'Lenas Selbst- und Fremdbild als Modell-Beispiel.',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
              { nr: 6, titel: 'Diskrepanz-Strategien · Was, wenn etwas nicht passt?', stundenthema_frage: 'Was, wenn etwas Wichtiges nicht passt?', minuten: 45,
                lernziel: 'SuS entwickeln Strategien zum Umgang mit Diskrepanzen zwischen Anforderung und Stärke.',
                stage: 'geruest', material: 'Lenas LRS-Diskrepanz-Beispiel · Strategie-Karten · Förderkatalog regional',
                prinzipien_b3: ['Lebensbezug', 'Handlungsorientierung', 'Personifikation'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln' },
                personifikation_anteil: 'Lenas konkrete Diskrepanz (LRS vs. Kassierarbeit) als Fallstudie.',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
              { nr: 7, titel: 'Rollenspiel Bewerbungsgespräch · Lenas Vorstellung', stundenthema_frage: 'Wie überzeugt Lena die Chefin im Bewerbungsgespräch?', minuten: 45,
                lernziel: 'SuS führen ein Bewerbungsgespräch im Rollenspiel und erhalten Peer-Feedback.',
                stage: 'geruest', material: 'Rollenkarten Bewerber:in + Chefin · Beobachterbogen · Standardfragen-Liste',
                prinzipien_b3: ['Handlungsorientierung', 'Methodencurriculum (Rollenspiel)', 'Personifikation'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK1 Handeln · PK3 Kommunizieren' },
                personifikation_anteil: 'Lenas Bewerbung als Modell-Rollenspiel · alle SuS in beiden Rollen.',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
              { nr: 8, titel: 'Transfer · Mein Berufswahlplan-Update', stundenthema_frage: 'Was nehme ICH aus Lenas Geschichte mit für meinen Weg?', minuten: 45,
                lernziel: 'SuS uebertragen die Sequenz-Erkenntnisse auf ihren eigenen Berufswahlplan und aktualisieren das Portfolio.',
                stage: 'geruest', material: 'Berufswahlportfolio · Update-Vorlage · Reflexions-Karten',
                prinzipien_b3: ['Schuelerorientierung', 'Lebensbezug', 'Reflexion'], lp_bezug: 'KE J8-GB2-01',
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'P5 Berufswähler', prozesskompetenz: 'PK4 Beurteilen · PK1 Handeln' },
                personifikation_anteil: 'Lena als Spiegel: »Was hat Lena gelernt — was lerne ICH?«',
                hinweis: 'In Folge-Iteration: alle 13 Phasen voll ausarbeiten.'
              },
            ],
            bezuege_global: [
              { didaktik: 'Kompetenzorientierung (Moritz-Steigerwald 2018 + LP+)', verweis: 'Stunde ist auf Bewältigung von Anforderungen (Berufswahlentscheidung) ausgerichtet, nicht auf Wissensaufbau. Audit-Dimension A.' },
              { didaktik: 'KSM-Passung (LP+ Fachprofil WiB)', verweis: 'Primäre Perspektive P5 Berufswähler durchgängig. GB2 Berufsorientierung als Schwerpunkt. PK4 Beurteilen als zentrale prozessbezogene Kompetenz. Audit-Dimension B.' },
              { didaktik: '13-Phasen-Artikulation (Baustein GB Moritz-Steigerwald 2018)', verweis: 'Verbindlich Seminar Unterfranken. Phase 3 macht PK transparent. Phase 6 ist Hauptphase mit Differenzierung. Phase 9 Wertungsstufe mit persönlicher Reflexion. Audit-Dimension C.' },
              { didaktik: 'Methodenmatrix GB2 BO (Leitfaden_Methoden_Gegenstandsbereiche)', verweis: 'UE 2 Stellenanzeigen-Analyse · UE 3 Berufsbild-Auswertung BERUFENET · UE 4 Portfolioarbeit · UE 7 Rollenspiel Bewerbungsgespräch. Alle kanonisch fuer GB2.' },
              { didaktik: 'Mager-3-K-Lernziele (Lernziele_WiB_Leitfaden)', verweis: 'Verhalten (Operator) + Bedingung (indem) + Beurteilungsmassstab (was daran erkennbar wird, dass). Pro UE 3-4 Teilziele · eines differenziert für leistungsstark (AFB III).' },
              { didaktik: '4-Spuren-Differenzierung (Audit-D2 + QM-Rahmen)', verweis: 'Pro UE explizite Differenzierungs-Spuren DaZ · LRS · leistungsschwach · leistungsstark. Quantitativ + qualitativ.' },
              { didaktik: 'Personifikation (Lena) — WiB-Identifikationsstrategie', verweis: 'Lena als sequenzdurchgängige Identifikationsfigur (Wunschberuf Fachverkäuferin Bäckerei) ermoeglicht schnelle Identifikation der Stundenfrage und konkretisiert abstrakte Anforderungs-Profile.' },
              { didaktik: 'WiB-Kernintentionen (G1.1-G1.7)', verweis: 'G1.7 Berufswahlreife · G1.3 Orientierung in sich wandelnder Arbeitswelt · G1.4 Vorbereitung auf zukünftige Rollen · G1.6 Handlungsorientierte Lernmethoden.' },
              { didaktik: 'Spiral-Anschluss (Audit-Dimension E)', verweis: 'Vertikale Kohärenz: Jgst. 7 Portfolio (Anbahnung) → Jgst. 8 Anforderungsprofile (Vertiefung) → Jgst. 8/9 Betriebspraktikum (Anwendung) → Jgst. 9 Projektprüfung (Vorbereitung).' },
              { didaktik: 'Tafelbild-Zentrierung (Allgemeine WiB-Hinweise)', verweis: 'Pro UE eine kurze Tafelbild-Skizze (3-Zonen oder 3-Spalten). Handschriftlich, nicht kopiert. Sicherung im Heft (nicht Mappe).' },
            ]
          }
        },
        { ke_id: 'J8-GB2-02', thema: 'Betriebspraktikum vorbereiten',
          ke_wortlaut: 'bereiten ein Betriebspraktikum vor (Bewerbung · Erkundungsfragen · Verhaltensregeln) und reflektieren ihre Erwartungen.',
          ke_wortlaut_quelle: 'WiB-Anleitungen + LP+ Jgst-Progression',
          inhalte_lp: ['Bewerbungsmappe · Anschreiben · Erkundungsfragen · Verhaltensregeln · Erwartungs-Reflexion'],
          fundort: 'WiB-Anleitungen Jgst. 8' },
        { ke_id: 'J8-GB2-03', thema: 'Betriebspraktikum auswerten',
          ke_wortlaut: 'werten ihr Betriebspraktikum strukturiert aus und integrieren die Erfahrungen in das Berufswahlportfolio.',
          ke_wortlaut_quelle: 'WiB-Anleitungen',
          inhalte_lp: ['Praktikumsbericht · Reflexionsbogen · Portfolio-Update · Praktikumspraesentation'],
          fundort: 'WiB-Anleitungen Jgst. 8' },
      ],
    },
    'J8_GB3': { ke_anzahl: 1, jgst: 'J8', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB3-01', thema: 'Haushaltsplan erstellen',
          ke_wortlaut: 'erstellen einen einfachen Haushaltsplan und treffen begründete Konsumentscheidungen.',
          ke_wortlaut_quelle: 'Lernziele_WiB_Leitfaden Beispiel 2',
          inhalte_lp: ['Einnahmen · Ausgaben · Tabellenkalkulation · Spar-Konsum-Balance · Konsumentscheidungen begruenden'],
          fundort: 'Lernziele_WiB_Leitfaden · Z. 59-64 (sekundär)' },
      ],
    },
    'J8_GB4': { ke_anzahl: 1, jgst: 'J8', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB4-01', thema: 'Arbeitssicherheit am Arbeitsplatz',
          ke_wortlaut: 'beschreiben Arbeitsplatzbedingungen aus einer Betriebserkundung und beurteilen Ergonomie und Arbeitsschutz.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 8',
          inhalte_lp: ['Betriebserkundung · Arbeitsplatzbedingungen · Ergonomie · Arbeitsschutz · Unfallverhuetung'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 284 (sekundär)' },
      ],
    },
    'J8_GB5': { ke_anzahl: 1, jgst: 'J8', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB5-01', thema: 'Ausbildungsvertrag und BBiG',
          ke_wortlaut: 'erklaeren Rechte und Pflichten im Ausbildungsverhaeltnis und wenden Bestimmungen des Berufsbildungsgesetzes auf Fallbeispiele an.',
          ke_wortlaut_quelle: 'Lernziele_WiB_Leitfaden Beispiel 5',
          inhalte_lp: ['Ausbildungsvertrag · Berufsbildungsgesetz (BBiG) · Rechte/Pflichten Auszubildende · Jugendarbeitsschutzgesetz · Fallstudien'],
          fundort: 'Lernziele_WiB_Leitfaden · Z. 70-75 (sekundär)' },
      ],
    },
    'J8_LB6': { ke_anzahl: 1, jgst: 'J8', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-LB6-01', thema: 'Projekt mit Leittextmethode (Vertiefung)',
          ke_wortlaut: 'planen und fuehren ein Projekt mit Leittextmethode durch und dokumentieren ihren Arbeitsprozess.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan',
          inhalte_lp: ['Leittextmethode (M-Klassen verbindlich) · vollstaendige Handlung · Dokumentation Arbeitsprozess · Praesentation'],
          fundort: 'Aufbau-Fachlehrplan-Md' },
      ],
    },

    // ─── J9 ─────────────────────────────────────────────────────────────
    'J9_GB1': { ke_anzahl: 1, jgst: 'J9', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB1-01', thema: 'Arbeitsmarkt und Berufsausbildung im Wandel',
          ke_wortlaut: 'analysieren Veraenderungen des Arbeitsmarkts (Digitalisierung · Globalisierung) und beurteilen ihre Auswirkungen auf eigene Berufschancen.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt »Arbeitsbedingungen im Wandel«',
          inhalte_lp: ['Digitalisierung · Globalisierung · Strukturwandel · Berufschancen · Weiterbildung'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 30-50 (sekundär)' },
      ],
    },
    'J9_GB2': { ke_anzahl: 1, jgst: 'J9', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB2-01', thema: 'Berufswahl-Entscheidung treffen',
          ke_wortlaut: 'treffen eine begruendete Berufswahl-Entscheidung und bereiten den Uebergang in Ausbildung/weitere Schullaufbahn vor.',
          ke_wortlaut_quelle: 'WiB-Anleitungen Jgst. 9',
          inhalte_lp: ['Bewerbungsphase · Ausbildungsplatzsuche · Schullaufbahn-Alternativen · Plan-B-Strategien'],
          fundort: 'WiB-Anleitungen Jgst. 9' },
      ],
    },
    'J9_GB3': { ke_anzahl: 1, jgst: 'J9', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB3-01', thema: 'Nachhaltiges Wirtschaften',
          ke_wortlaut: 'beurteilen Konzepte nachhaltigen Wirtschaftens und entwickeln eigene Vorschläge zur Verbindung von Oekonomie und Oekologie.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt Nachhaltige Wirtschaft',
          inhalte_lp: ['Nachhaltigkeit · Oekonomie vs. Oekologie · Geschaeftsmodelle · Pro-Contra-Debatte'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 70 (sekundär)' },
      ],
    },
    'J9_GB4': { ke_anzahl: 1, jgst: 'J9', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB4-01', thema: 'Technikeinsatz im Projekt · Grenzen technischer Machbarkeit',
          ke_wortlaut: 'beurteilen den Technikeinsatz im Projekt und reflektieren Grenzen technischer Machbarkeit.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 9',
          inhalte_lp: ['Technikeinsatz Projekt · Grenzen technischer Machbarkeit · Energiekonzept Schule (Projektbeispiel)'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 285 (sekundär)' },
      ],
    },
    'J9_GB5': { ke_anzahl: 1, jgst: 'J9', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB5-01', thema: 'Verbraucherrecht im digitalen Zeitalter',
          ke_wortlaut: 'wenden Verbraucherrechte in digitalen Kontexten (E-Commerce · Plattform-Vertraege) an.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt Verbraucherrechte',
          inhalte_lp: ['E-Commerce · Widerrufsrecht digital · AGB-Analyse · Plattform-Vertraege · Datenschutz'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 130 (sekundär)' },
      ],
    },
    'J9_LB6': { ke_anzahl: 1, jgst: 'J9', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J9-LB6-01', thema: 'Komplexes Projekt — Vorbereitung Projektpruefung',
          ke_wortlaut: 'planen und realisieren ein komplexes Projekt mit Leittextmethode und vollstaendiger Handlung; bereiten damit die Projektpruefung Jgst. 9 vor.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan + § 12/4 MSO',
          inhalte_lp: ['Vollstaendige Handlung (Planen · Durchfuehren · Pruefen · Bewerten) · Leittext · Projekt-Dokumentation · Projektpruefung'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 20 · § 12/4 MSO Projektpruefung' },
      ],
    },
  },
};
