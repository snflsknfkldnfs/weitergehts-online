// LB-Matrix Mathematik MS Bayern · LP+-konform · zitierfähig
//
// QUELLEN-PRINZIP
// ────────────────────────────────────────────────────────────────────────
// 1. Spalten = KMK-Bildungsstandards Sek I Leitideen (L1-L5) +
//    eine Mittelschule-spezifische 6. Leitidee (Variable + Strukturen).
//    Cells mappen LP+-Bayern-Lernbereiche der jeweiligen Jgst auf diese
//    Leitidee.
// 2. KE-Wortlaute sind VERBATIM aus LP+ Bayern Mittelschule Mathematik
//    M7R, LIS_PDF Stand 09.09.2025 (lokale Quelle in
//    Unterrichtseinwicklung/Mathematik/M7_LehrplanPlus_Lehrplanverankerung).
//    Andere Jgst (M5, M6, M8, M9, M10) verwenden Inhalts-Anker auf
//    KMK-Bildungsstandards-Niveau, bis LP+-Quellen lokal vorliegen.
// 3. Didaktik-Bezüge zitieren Primärliteratur mit Jahr + ggf. Seite.
//
// LITERATUR-KÜRZEL (in bezuege[].quelle verwendet)
// ────────────────────────────────────────────────────────────────────────
// PHASEN-MODELL (UE-Verlaufsstruktur Mathematik MS Bayern-Unterfranken · PRIMÄRQUELLE):
// EngelkingB1       · A. Engelking, SR: Bausteinskript Fachdidaktik · AG der
//                     MS-Seminarleiter:innen Unterfranken · Baustein M B1
//                     „Der operative Lernprozess im Mathematikunterricht —
//                     Erarbeitung · Durchdringung · Übung · Anwendung". Lokale
//                     Quelle: Unterrichtseinwicklung/Mathematik/Bausteinskript_
//                     Mathematik/M B1 Der Lernprozess im Mathematikuntericht.pdf.
//                     VERBINDLICHES 4-Phasen-Modell des Mathematikunterrichts
//                     MS Bayern-Unterfranken.
// EngelkingGB       · A. Engelking, SR: Bausteinskript Fachdidaktik · Baustein
//                     M GB „Grundlagen und Prinzipien des Mathematikunterrichts".
//                     Lokale Quelle: Unterrichtseinwicklung/Mathematik/
//                     Bausteinskript_Mathematik/M GB Grundlagen und Prinzipien
//                     des Mathematikunterrichts.pdf.
//
// PHASEN-MODELL (sekundär, überregional · Aebli als theoretische Vorlage):
// Aebli1983         · H. Aebli: Zwölf Grundformen des Lehrens. Klett-Cotta 1983.
//                     Grundformen 9-12 als überregionales Artikulationsschema.
//                     Sekundärquelle — Engelking-B1 bleibt verbindlich für
//                     MS Bayern-Unterfranken.
// Aebli1980_81      · H. Aebli: Denken — das Ordnen des Tuns. 2 Bde. Klett-Cotta
//                     1980/81. Theoretische Grundlegung des operativen Prinzips.
//
// REPRÄSENTATIONS-MODELL (innerhalb der Erarbeitungsphase nach Engelking-B1):
// Bruner1966        · J. S. Bruner: Toward a Theory of Instruction. Harvard UP
//                     1966. EIS-Modell als REPRÄSENTATIONS-Modell (modes of
//                     representation: enactive/iconic/symbolic) — NICHT als
//                     UE-Phasenmodell. Wirkt innerhalb der Erarbeitungsphase
//                     (Engelking-B1 Kap. 3.1: konkretes Handeln · ikonisch/
//                     zeichnerisch · symbolisch bei fachgerechter Verbalisierung).
//
// PROBLEMLÖSEN + MODELLIEREN:
// Polya1949         · G. Polya: How to Solve It (1945) / Schule des Denkens (dt.
//                     1949). Vier Schritte: Verstehen · Plan · Ausführen ·
//                     Rückschau.
// BlumLeiss2005     · W. Blum / D. Leiß: Modellieren im Unterrichtsalltag. 2005.
//                     Modellierungskreislauf in 7 Schritten.
// BorromeoFerri2006 · R. Borromeo Ferri: Theoretical and empirical differentiations
//                     of phases in the modelling process. ZDM 38(2), 2006.
//
// MATHEMATIK-DIDAKTIK:
// Wittmann1985      · E. Ch. Wittmann: Operatives Prinzip. JMD 6, S. 7-40, 1985.
// Wittmann1992      · E. Ch. Wittmann: Wider die Flut der bunten Hunde und der
//                     grauen Päckchen — produktives Üben, substantielle Lern-
//                     umgebung. mathematik lehren 50, 1992.
// Wittmann2007      · E. Ch. Wittmann / G. N. Müller: Das Zahlenbuch. Klett
//                     2007 ff. (Anker für „handelnd-anschaulich-symbolisch").
// Freudenthal1973   · H. Freudenthal: Mathematik als pädagogische Aufgabe. Klett
//                     1973. Beziehungshaltigkeit.
// Winter1995        · H. Winter: Mathematikunterricht und Allgemeinbildung. MDMV
//                     2 (1995), S. 37-46. Drei Grunderfahrungen.
// Vergnaud1990      · G. Vergnaud: La théorie des champs conceptuels. RDM 10,
//                     S. 133-170, 1990.
// PiagetInhelder    · J. Piaget / B. Inhelder: Die Psychologie des Kindes (1969).
// SINUS2003         · BLK-Modellversuch SINUS: Aufgabenkultur. 1998-2003.
// WoodBruner1976    · D. Wood / J. Bruner / G. Ross: The role of tutoring.
//                     JCPP 17, S. 89-100, 1976. Scaffolding.
//
// LEHRPLAN + STANDARDS:
// LPplusM7R         · LehrplanPLUS Bayern · Mittelschule · Mathematik R7 ·
//                     LIS_PDF Stand 09.09.2025 (lokal Unterrichtseinwicklung/...).
//                     6 Prozesskompetenzen: Argumentieren · Probleme lösen ·
//                     Modellieren · Darstellungen verwenden · Mit symbolischen,
//                     formalen und technischen Elementen umgehen · Kommunizieren.
// KMK2003           · KMK Bildungsstandards Mathematik Mittlerer Schulabschluss.
//                     2003/04.

window.MATRIX = {
  fach: 'D Mathematik',
  fachKuerzel: 'Mathematik',
  schulart: 'Mittelschule Bayern',

  meta: {
    spaltenLogik: 'KMK-Leitideen (L1-L5) + L6 Variable/Strukturen — als Brücken-Taxonomie, weil LP+ Bayern Mittelschule pro Jgst unterschiedlich viele und benannte LBs verwendet (M7R z.B. hat 8 LBs). Cells verweisen explizit auf LP+-Quellen.',
    quellen_status: 'M7R: vollständig zitierbar aus lokalem LIS-PDF 09.09.2025. Andere Jgst: KMK-Bildungsstandards + meine Lehrplan-Kenntnis, bis lokale LP+-Quellen ergänzt sind.',
  },

  jgst: [
    { id: 'M5',  label: 'Jgst. 5' },
    { id: 'M6',  label: 'Jgst. 6' },
    { id: 'M7',  label: 'M7R' },
    { id: 'M8',  label: 'Jgst. 8' },
    { id: 'M9',  label: 'M9R' },
    { id: 'M10', label: 'M10' },
  ],

  // Leitideen-Spalten — KMK Bildungsstandards Sek I + L6 für MS-Spezifika.
  lernbereiche: [
    { id: 'LB1', titel: 'L1 · Zahl',                       kurz: 'Zahl + Op' },
    { id: 'LB2', titel: 'L2 · Messen',                     kurz: 'Größen' },
    { id: 'LB3', titel: 'L3 · Raum + Form',                kurz: 'Geometrie' },
    { id: 'LB4', titel: 'L4 · Funktionaler Zusammenhang',  kurz: 'FZ' },
    { id: 'LB5', titel: 'L5 · Daten + Zufall',             kurz: 'D+Z' },
    { id: 'LB6', titel: 'L6 · Variable + Strukturen',      kurz: 'Var' },
  ],

  // ─────────────────────────────────────────────────────────────────────
  cells: {

    // ─── M5 ──────────────────────────────────────────────────────────────
    'M5_LB1': { ke: 'M5 LB1', titel: 'Natürliche Zahlen', kurz: 'Stellenwertsystem · Bündeln · große Zahlen darstellen + ordnen', status: 'stub' },
    'M5_LB2': { ke: 'M5 LB2', titel: 'Größen', kurz: 'Länge · Geld · Zeit · Masse · Umwandeln + Größen-Größenvorstellung', status: 'stub' },

    'M5_LB3': {
      ke: 'M5 LB3', titel: 'Geometrische Körper',
      kurz: 'Würfel · Quader · Kugel · Pyramide · Kegel · Zylinder handelnd unterscheiden',
      status: 'ausgearbeitet',
      sequenz: {
        ke_id: 'M5_LB3_KE1 (analog zu LP+ Bayern MS · GS-Anschluss)',
        ke_wortlaut: 'Die Schülerinnen und Schüler unterscheiden geometrische Körper (Würfel, Quader, Pyramide, Kegel, Zylinder, Kugel) an Modellen und Bildern, benennen Eckpunkte, Kanten und Flächen und beschreiben deren Eigenschaften.',
        ke_quelle: 'LP+ Bayern MS Mathematik · Jgst. 5 · Inhalts-Cluster Raum und Form. KE-Wortlaut ist sinngemäße Rekonstruktion gemäß KMK-Bildungsstandards Primarstufe-Anschluss + MS-Curriculum-Logik (lokales LP+-PDF für M5 nicht vorhanden). Wird ergänzt sobald LP+-M5-Quelle eingelesen.',
        ueberblick: '6-UE-Einführungssequenz für die geometrischen Körper. Bruner-EIS-Progression vom realen Material (UE 1-2) über ikonische Skizzen + Netze (UE 3) zur symbolischen Notation (UE 4-6). Klassische Einstiegssequenz für Jgst. 5; didaktisch begründet im Primat der Handlung (Piaget) und im operativen Prinzip (Wittmann 1985).',
        ues: [
          { nr: 1, titel: 'Sammlung Alltagsobjekte', ebene: 'enaktiv', kompetenz: 'Erfahren',
            inhalt: 'Lernende bringen Verpackungen, Bauklötze, Spielwürfel mit. Klassengemeinschaft sortiert die Sammlung nach „wie der Körper aussieht" — ohne vorgegebene Begriffe. Ergebnis: spontane Gruppen.',
            begruendung: 'Enaktive Repräsentation (Bruner 1966 EIS-Modell als REPRÄSENTATION, nicht als UE-Phase): Lernende handeln mit konkretem Material, bevor ikonische oder symbolische Repräsentationen verlangt werden. Konstruktivistisches Wissens-Konstruieren (Piaget/Inhelder): die Lernenden bilden die Begriffe selbst, bevor Termini vorgegeben werden. Vorerfahrungen aktivieren als Einstiegsphase (Aebli 1983, Grundform „Anschauen").' },
          { nr: 2, titel: 'Begriffsklärung Eckpunkte · Kanten · Flächen', ebene: 'enaktiv→ikonisch', kompetenz: 'Begreifen',
            inhalt: 'Mit den Materialien werden Eckpunkte (Spitzen), Kanten (Verbindungslinien) und Flächen (Außenseiten) benannt und am Körper gezeigt. Jede:r markiert auf einem eigenen Würfel mit Klebepunkten.',
            begruendung: 'Übergang von der enaktiven zur ikonischen Repräsentation (Bruner 1966 EIS) innerhalb der Erarbeitungsphase. Operatives Prinzip (Wittmann 1985): die Operation „Eckpunkte markieren" erschließt den Begriff. Sprachsensibler Mathematik-Unterricht: Lehrwortschatz präzise einführen (Eckpunkt ≠ Spitze, Kante ≠ Linie).' },
          { nr: 3, titel: 'Schrägbilder + Netze (ikonisch)', ebene: 'ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Skizzen-Übungen: Schrägbild Würfel + Quader. Bastel-Netze ausschneiden + falten. Aha-Effekt: das Netz „wird" zum Körper.',
            begruendung: 'Ikonische Repräsentation (Bruner 1966 EIS) als Schritt im Erarbeitungs-EIS-Wechsel: Repräsentation auf Papier. Spatial-Reasoning-Aufbau (Piaget/Inhelder). Operatives Prinzip (Wittmann 1985): das Falten ist eine Operation, die die Beziehung Netz↔Körper sichtbar macht — geometrische Strukturen werden durch Tun erschlossen.' },
          { nr: 4, titel: 'Eulerformel (Anbahnung)', ebene: 'ikonisch→symbolisch', kompetenz: 'Argumentieren',
            inhalt: 'Tabelle: Würfel hat E=8, K=12, F=6. Quader auch. Pyramide: E=5, K=8, F=5. Lernende sollen Muster entdecken — Lehrkraft lenkt zur Beobachtung E − K + F = 2.',
            begruendung: 'Entdeckendes Lernen (Wittmann2007): Lernende ENTDECKEN die Beziehung, statt sie erklärt zu bekommen. Spiralprinzip (Bruner1966): die Eulerformel wird hier nur angebahnt, eine fundierte Begründung folgt in Sekundarstufe II. Mustererkennen als prozessbezogene Kompetenz (KMK2003 Argumentieren + Probleme lösen).' },
          { nr: 5, titel: 'Anwendungs-Übung — Real-Bezug', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Beispiele aus dem Alltag: „Wie viel Karton braucht Lina für ihre Geschenkbox?" (Quader-Oberfläche aus Flächenanzahl × Maße).',
            begruendung: 'Beziehungshaltigkeit (Freudenthal1973): Mathematik aus der Realität konstruieren, statt sie nachträglich anzuwenden. Modellierungs-Vorstufe nach BlumLeiss2005. Verbindung zur Größen-Welt L2 (Spiralprinzip Bruner1966).' },
          { nr: 6, titel: 'Sicherung + Lernzielkontrolle', ebene: 'symbolisch', kompetenz: 'Reflektieren',
            inhalt: 'Hefteintrag: Tabelle der 6 Körper-Typen mit Eckpunkten/Kanten/Flächen. Kurz-LNW mit 5 Aufgaben (Identifizieren, Skizzieren, Zählen, Anwenden).',
            begruendung: 'Operative Durchdringung + Übung und Schulung im Engelking-B1 4-Phasen-Verlauf (Bausteinskript MS Bayern-Unterfranken). LNW kompetenzorientiert — alle drei AFB-Stufen (KMK2003: Reproduktion · Anwendung · Transfer) abdecken. Hefteintrag systematisiert das selbst Konstruierte und schließt den Lernzyklus.' },
        ],
        bezuege: [
          { didaktik: 'EIS-Repräsentations-Wechsel (Bruner 1966)', verweis: 'Vertikale Sequenz-Logik der Erarbeitungs-EIS-Stufen über mehrere UEs: enaktiv (UE1-2) → ikonisch (UE3) → symbolisch (UE4-6). EIS ist ein Repräsentationsmodell (modes of representation, Bruner: Toward a Theory of Instruction, Kap. III), KEIN UE-Phasenmodell. Die UE-Phasenstruktur folgt Engelking-B1 (Bausteinskript MS Bayern-Unterfranken · 4-Phasen-Modell Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung).' },
          { didaktik: 'Operatives Prinzip (Wittmann1985)', verweis: 'UE 2-3: Eckpunkte zählen, Netze falten — Begriffe durch Operationen erschließen. Wittmann JMD 6 (1985): „Mathematische Begriffe sind Ergebnis geistiger Operationen am mathematischen Material."' },
          { didaktik: 'Spiralprinzip (Bruner1966)', verweis: 'Anbahnung Eulerformel UE4 → systematisches Argumentieren in M7/M8. Volumen-Brücke zu L2 Messen. Bruner: „Any subject can be taught effectively in some intellectually honest form to any child at any stage of development."' },
          { didaktik: 'Entdeckendes Lernen (Wittmann2007)', verweis: 'UE 4: Lernende entdecken die Eulerformel selbst — Das Zahlenbuch-Konzept der „produktiven Übung".' },
          { didaktik: 'Sprachsensibler MU', verweis: 'UE 2: Begriffs-Präzision Eckpunkt/Kante/Fläche. Anbindung an Bayerisches MS-Profil: sprachsensibler MU als Querschnittsaufgabe (LP+ Bayern Fachprofil Mathematik).' },
        ],
      },
    },

    'M5_LB4': { ke: 'M5 LB4', titel: 'Daten erheben', kurz: 'Strichliste · einfache Säulen- und Streifendiagramme', status: 'stub' },
    'M5_LB5': { ke: '—',     titel: '(L4 erst ab M6)', kurz: 'erste funktionale Anbahnung in M6', status: 'stub' },
    'M5_LB6': { ke: 'M5 LB6', titel: 'Zahlenfolgen', kurz: 'Muster erkennen + fortsetzen — Anbahnung Variable', status: 'stub' },

    // ─── M6 ──────────────────────────────────────────────────────────────
    'M6_LB1': { ke: 'M6 LB1', titel: 'Brüche', kurz: 'Anteilsvorstellung · Hälften, Drittel, Viertel · Bruch-Brücke zu M7R Prozent', status: 'gerüst' },
    'M6_LB2': { ke: 'M6 LB2', titel: 'Größen', kurz: 'Flächen · Volumen · Zeitberechnung · Maßstab', status: 'stub' },
    'M6_LB3': { ke: 'M6 LB3', titel: 'Vielecke + Kreis', kurz: 'Konstruktion · Symmetrie · Winkelmessung', status: 'stub' },
    'M6_LB4': { ke: 'M6 LB4', titel: 'Säulendiagramm', kurz: 'Daten darstellen + lesen + interpretieren', status: 'stub' },
    'M6_LB5': { ke: 'M6 LB5', titel: 'Proportionalität (Anbahnung)', kurz: 'Wertepaare · Tabellen · Anbahnung Dreisatz', status: 'stub' },
    'M6_LB6': { ke: 'M6 LB6', titel: 'Muster + Strukturen', kurz: 'Geometrische Folgen + Zahlenmuster', status: 'stub' },

    // ─── M7R ─────────────────────────────────────────────────────────────
    'M7_LB1': {
      ke: 'LP+ M7R LB1 · 7 KEs',
      titel: 'Prozentrechnung',
      kurz: '*** Prozent als Hundertstelbrüche · Grundwert · Prozentwert · Prozentsatz · funktionale Zusammenhänge',
      status: 'ausgearbeitet',
      sequenz: {
        ke_id: 'mathematik_m7_prozentrechnung_1..7 (LP+M7R)',
        ke_wortlaut: 'KE 1: „Schülerinnen und Schüler fassen Prozentsätze als vergleichbare Anteile auf, interpretieren sie als Hundertstelbrüche und machen sie handelnd sichtbar." KE 3: „... ordnen Zahlenmaterial Grundwert, Prozentwert und Prozentsatz zu, formulieren eigene Sachverhalte und berechnen fehlende Größen (auch im Überschlag) vorteilhaft." KE 5: „... bestimmen Prozentwert und Prozentsatz bei Mischungsverhältnissen und bewältigen problemorientierte Aufgaben aus Alltag und Beruf."',
        ke_wortlaut_anker: [
          'Prozentsätze',
          'vergleichbare Anteile',
          'Hundertstelbrüche',
          'handelnd sichtbar',
          'Grundwert',
          'Prozentwert',
          'Prozentsatz',
          'Überschlag',
          'Mischungsverhältnissen',
          'Alltag und Beruf',
        ],
        ke_quelle: 'LPplusM7R · Lernbereich 1 Prozentrechnung · KEs 1-7 verbatim · LIS_PDF Stand 09.09.2025 · Seite 1.',
        ueberblick: '6-UE-Pilot-Sequenz Prozentrechnung nach BUV-Template v5 — Bayer. Mittelschule M7R, Realisation eigene Praxis M7c SJ 25/26 (3 UEs real durchgeführt, „Goldcluster"). EIS-Progression nach Engelking-B1 / Bruner 1966 vom enaktiven 100er-Feld zur symbolischen Prozentformel und zur Anwendung am realen Beleg (Quittung mit MwSt). Spiral-Anker: M6-Bruch-Vorstellung aktivieren (KE 1: „Hundertstelbrüche") und auf Prozent-Begriff erweitern. Querverweis: LP+M7R explizit prozentrechnung_4 ↔ proportionalitaet_2.',
        pilot_sequenz: {
          titel: '6-UE-Pilot-Sequenz · Prozentrechnung als handelnd-sichtbare Anteilsbildung',
          praxis: '6 UEs · Frühjahr 2026',
          gesamtzeit: '6 UEs à 45 min = 4,5 Zeitstunden',
          phasenStandard: 'UE-Phasenstruktur nach Bausteinskript B1 (Engelking, SR · AG MS-Seminarleiter:innen Unterfranken) · 4 Phasen pro UE: Erarbeitung des mathematischen Problems · Operative Durchdringung · Übung und Schulung · Anwendung. Der EIS-Wechsel (Bruner 1966 als Repräsentationsmodell) findet INNERHALB der Erarbeitungsphase statt (Engelking-B1 Kap. 3.1: konkretes Handeln → ikonisch/zeichnerisch → symbolisch bei fachgerechter Verbalisierung) und operationalisiert die LP+-Prozesskompetenz Darstellungen verwenden.',
          qualitaetsstandards_quelle: 'BUV_Template_Schwerpunktstunde_v5.md + LP+M7R LIS_PDF 09.09.2025 + Bausteinskript M B1 (Engelking, SR · AG MS-Seminarleiter:innen Unterfranken) + Wittmann/Müller Zahlenbuch-Tradition + KMK 2003 Bildungsstandards Mathematik MSA',
          sequenz_meta: {
            lehrplanbezug: 'M7R · Lernbereich 1 „Prozentrechnung" · KE 1, 3, 5 (Schwerpunkt) · KE 4, 7 (Anwendung)',
            kompetenzerwartungen_verbatim: [
              'KE 1: Die Schülerinnen und Schüler fassen Prozentsätze als vergleichbare Anteile auf, interpretieren sie als Hundertstelbrüche und machen sie handelnd sichtbar.',
              'KE 3: Die Schülerinnen und Schüler ordnen Zahlenmaterial Grundwert, Prozentwert und Prozentsatz zu, formulieren eigene Sachverhalte und berechnen fehlende Größen (auch im Überschlag) vorteilhaft.',
              'KE 5: Die Schülerinnen und Schüler bestimmen Prozentwert und Prozentsatz bei Mischungsverhältnissen und bewältigen problemorientierte Aufgaben aus Alltag und Beruf.',
            ],
            inhalte_lp_verbatim: [
              'Prozent als Hundertstelbruch (1 % = 1/100)',
              'Grundwert · Prozentwert · Prozentsatz',
              'Prozentstreifen und 100er-Feld als Modell-Werkzeuge',
              'Dreisatz und Prozentformel P = G · p % / 100',
              'Anwendungsaufgaben aus Alltag und Beruf (Rabatt, MwSt, Mischungen)',
            ],
            zielsetzung_uebergeordnet: 'Die Sequenz erschließt den Prozentbegriff handelnd am 100er-Feld (UE 1, enaktiv), führt über den Prozentstreifen als ikonische Repräsentation (UE 2) zur symbolischen Notation und zum Dreisatz (UE 3) und endet in zwei Anwendungs-UEs (UE 4 Quittung-MwSt als Schwerpunktstunde-Kandidat, UE 5 Rabatt-Schnäppchen) und einer Sicherung mit LZK-Vorbereitung (UE 6). Ziel ist eine tragfähige Grundvorstellung „Prozent = standardisierter Anteil von 100", die SuS in eigene Alltagskontexte übertragen können.',
            methodische_schwerpunkte: [
              'Entdeckendes Lernen (Engelking-B1 Kap. 3.2 induktive Methode)',
              'Engelking-4-Phasen-Verlauf (Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung)',
              'EIS-Repräsentations-Wechsel innerhalb der Erarbeitung (Bruner 1966)',
              'Operatives Prinzip + produktives Üben (Aebli, Wittmann 1992)',
              'Differenzierung in 4 Spuren (DaZ · LRS · leistungsschwach · leistungsstark)',
              'Modellierungskreislauf nach Blum/Leiß 2005',
            ],
            kompetenzerwerb_progression: 'AFB-Progression I→III: UE 1-2 vorrangig AFB I (Anteile erkennen, beschreiben). UE 3 AFB II (Dreisatz / Formel sicher anwenden). UE 4-5 AFB II→III (modellieren reale Situationen, Werte interpretieren). UE 6 alle drei AFB-Stufen in LZK-Vorbereitung.',
            personifikation_durchgaengig: 'Praxis-Anker statt Identifikationsfigur: durchgängige reale Belege („Auf einer Quittung steht 7 % MwSt", „Im Schulshop 20 % Rabatt", „Saftschorle 30 % Apfelsaft"). Selbstwirksamkeitssprache („Du kannst Prozent jetzt am Streifen ablesen — und am Kassenbon wiederfinden."). Realbeleg-Sammlung als wachsende Tafelseite über die Sequenz.',
            schwerpunktstunde_kandidat: 'UE 4 · MwSt-Rechnung an realer Quittung — Anwendung der Prozentformel im Modellierungskreislauf (AFB II→III)',
          },
          sequenz_tabelle: [
            {
              uze: 1,
              datum: 'KW10 · Mo',
              stundenthema_frage: 'Wie viele Plättchen sind 25 von 100 — und wie nenne ich das?',
              prozesskompetenz: 'Darstellungen verwenden (handelnd am 100er-Feld) · Argumentieren (Anteile vergleichen)',
              gegenstand: 'Anteile · Hundertstelbrüche',
              perspektive: 'operativ · anwendungsorientiert',
              stundenziel_kurz: 'Anteile am 100er-Feld handelnd legen + benennen',
              kommentar: 'Sequenz-Einstieg · enaktiv · Begriff „Prozent" noch nicht eingeführt',
              schwerpunkt: false,
            },
            {
              uze: 2,
              datum: 'KW10 · Mi',
              stundenthema_frage: 'Wie sieht 30 % auf dem Prozentstreifen aus — und auf dem Kreis?',
              prozesskompetenz: 'Darstellungen verwenden (ikonisch wechseln) · mit symbolisch-formal-technischen Elementen arbeiten',
              gegenstand: 'Prozentstreifen · Kreisdiagramm',
              perspektive: 'ikonisch · innermathematisch',
              stundenziel_kurz: '1 % · 10 % · 25 % · 50 % am Streifen + Kreis markieren',
              kommentar: 'Übergang enaktiv → ikonisch · Brücke zu M6-Bruch',
              schwerpunkt: false,
            },
            {
              uze: 3,
              datum: 'KW11 · Mo',
              stundenthema_frage: 'Wie rechne ich den Prozentwert aus — mit Dreisatz oder Formel?',
              prozesskompetenz: 'Probleme lösen · mit symbolisch-formal-technischen Elementen arbeiten',
              gegenstand: 'Grundwert · Prozentwert · Prozentsatz · Dreisatz',
              perspektive: 'symbolisch · operativ',
              stundenziel_kurz: 'Prozentwert mit Dreisatz UND Formel berechnen',
              kommentar: 'EIS-Wechsel zur symbolischen Repräsentation in der Erarbeitung · Formel-Notation einführen',
              schwerpunkt: false,
            },
            {
              uze: 4,
              datum: 'KW11 · Mi',
              stundenthema_frage: 'Auf einer Quittung steht 7 % MwSt — wie viel Steuer wurde gezahlt?',
              prozesskompetenz: 'Modellieren · Probleme lösen · Kommunizieren (Beleg interpretieren)',
              gegenstand: 'Mehrwertsteuer · realer Beleg · Brutto/Netto',
              perspektive: 'anwendungsorientiert · operativ',
              stundenziel_kurz: 'MwSt-Betrag aus echter Quittung berechnen + Bedeutung erklären',
              kommentar: '**SCHWERPUNKTSTUNDE-KANDIDAT** · Modellierungskreislauf vollständig · AFB II→III',
              schwerpunkt: true,
            },
            {
              uze: 5,
              datum: 'KW12 · Mo',
              stundenthema_frage: 'Welches Schnäppchen lohnt sich wirklich — 20 % Rabatt auf 50 € oder 10 € weniger?',
              prozesskompetenz: 'Modellieren · Argumentieren · Beurteilen (rationale Entscheidung)',
              gegenstand: 'Rabatt · Vergleich · Prozent vs. absolute Differenz',
              perspektive: 'anwendungsorientiert · sozialkundlich (Verbraucherbildung)',
              stundenziel_kurz: 'Zwei Rabatt-Angebote rechnerisch und argumentativ vergleichen',
              kommentar: 'Anwendung · AFB III · Querbezug Verbraucherbildung',
              schwerpunkt: false,
            },
            {
              uze: 6,
              datum: 'KW12 · Mi',
              stundenthema_frage: 'Was kann ich jetzt sicher rechnen — und wo brauche ich noch eine Hilfe?',
              prozesskompetenz: 'Reflektieren · alle Prozesskompetenzen in der LZK-Vorbereitung',
              gegenstand: 'Vermischte Aufgaben · Hefteintrag-Synthese',
              perspektive: 'innermathematisch · reflexiv',
              stundenziel_kurz: 'Vermischte Aufgaben lösen + Hefteintrag synthetisieren',
              kommentar: 'LZK-Vorbereitung · Selbsteinschätzung · Hilfekarten-System',
              schwerpunkt: false,
            },
          ],
          phasenSchema: [
            { id: 'erarbeitung',   label: '1 Erarbeitung des mathematischen Problems', kurz: 'EIS-Wechsel (Engelking-B1 Kap. 3.1): konkretes Handeln (100er-Feld, Plättchen) → ikonisch/zeichnerisch (Prozentstreifen, Kreisdiagramm) → symbolisch (Dreisatz, Formel P = G · p % / 100) bei fachgerechter Verbalisierung.' },
            { id: 'durchdringung', label: '2 Operative Durchdringung',                kurz: 'Schulung der mathematischen Fähigkeiten durch Reversibilität · Variabilität · Verbalisierung · Hefteintrag (Engelking-B1 Kap. 4). Merksatz „Prozent = Anteil von 100".' },
            { id: 'uebung',        label: '3 Übung und Schulung',                     kurz: 'Schulung der rechnerischen Fähigkeiten · Mechanisierung und Automatisierung · operatives + produktives Üben (Wittmann 1992) · Hilfekarten-Scaffolding (Wood/Bruner/Ross 1976) bei Beachtung der Übungsgrundsätze.' },
            { id: 'anwendung',     label: '4 Anwendung',                              kurz: 'Übertragung auf neue Sachsituationen · Integration in vorhandenes Wissen · Modellierungskreislauf (Blum/Leiß 2005).' },
          ],
          ues_detail: [
            {
              nr: 1,
              titel: 'Anteile am 100er-Feld handelnd legen',
              stundenthema_frage: 'Wie viele Plättchen sind 25 von 100 — und wie nenne ich das?',
              minuten: 45,
              lernziel: 'SuS legen Anteile am 100er-Feld mit Plättchen und benennen sie als „X von 100" — als Vorbereitung auf den Prozentbegriff.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler legen vorgegebene Anteile am 100er-Feld mit Plättchen und benennen sie als „X von 100",',
                bedingung: 'indem sie zu fünf Anteils-Aufträgen (10, 25, 50, 75, 99 Plättchen) handelnd am 100er-Quadrat arbeiten und das Ergebnis in eine Tabelle „gelegt / als Anteil / als Bruch" eintragen,',
                maszstab: 'was daran erkennbar wird, dass alle fünf Zeilen der Tabelle korrekt ausgefüllt sind und dass die SuS im Heft den Satz „25 von 100 heißt 25 Hundertstel" notieren können.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du legst Anteile am 100er-Feld korrekt,',
                  indem: 'indem du zu jedem Auftrag genau die vorgegebene Anzahl Plättchen auf das Feld legst,',
                  erkennbar: 'was daran erkennbar wird, dass dein Tisch-Partner die Anzahl ohne Nachzählen bestätigen kann.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du beschreibst den gelegten Anteil als „X von 100",',
                  indem: 'indem du in die Tabellenspalte „als Anteil" die Schreibweise „25 von 100" einträgst,',
                  erkennbar: 'was daran erkennbar wird, dass alle fünf Tabellenzeilen die Schreibweise enthalten.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du überträgst den Anteil in die Bruchschreibweise,',
                  indem: 'indem du in der Tabellenspalte „als Bruch" den Hundertstelbruch (z. B. 25/100) notierst,',
                  erkennbar: 'was daran erkennbar wird, dass alle fünf Zeilen einen Hundertstelbruch zeigen.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du vergleichst zwei Anteile begründet,',
                  indem: 'indem du zwei Felder nebeneinander legst (z. B. 25 und 75) und im Heft begründest, welcher Anteil größer ist und warum,',
                  erkennbar: 'was daran erkennbar wird, dass deine Begründung den Bezug zur 100 als gemeinsamem Ganzem enthält.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '22\' · Erarbeitung des mathematischen Problems (Engelking-B1 Kap. 3) durch EIS-Wechsel bei fachgerechter Verbalisierung. (a) ZIELORIENTIERUNG (4\'): Stiller Impuls — 100er-Feld als Folie an der Tafel, einige Plättchen lose daneben. Lehrkraft-Frage: „Wenn ich 25 Plättchen drauflege — von wie vielen sind das 25?" Vorwissen aus M6-Bruch wird aktiviert (Hundertstel). Kognitiver Konflikt: „Wie könnten wir Anteile so aufschreiben, dass jeder sie sofort vergleichen kann?" Lernziel transparent: „Heute legst du Anteile am 100er-Feld und lernst, sie als ‚X von 100‘ zu benennen." (b) KONKRETES HANDELN (10\'): 100er-Feld auf Folie + Plättchen pro Tisch. Auftrag 1: „Lege 25 Plättchen." Auftrag 2: „Lege 50." Auftrag 3: „Lege 10." Direkte Sichtkontrolle durch Tisch-Partner. Begriff „Prozent" NOCH NICHT eingeführt — bewusste Verzögerung. (c) IKONISCH/ZEICHNERISCH → SYMBOLISCH (8\'): Tabelle „gelegt / als Anteil / als Bruch" an der Tafel + im Heft. Drei-Spalten-Vergleich „25 Plättchen" → „25 von 100" → „25/100". SuS füllen die Tabelle für fünf Aufträge (10, 25, 50, 75, 99) aus.',
              durchdringung: '10\' · Operative Durchdringung (Engelking-B1 Kap. 4): Schulung der mathematischen Fähigkeiten durch Verbalisierung + symbolische Konsolidierung. Mini-Lehrkraft-Impuls: „Die Schreibweise 25/100 hat einen kürzeren Namen: 25 %. % heißt: pro Hundert." Erste symbolische Notation an der Tafel. Reversibilität-Anbahnung: aus Bruch wird Prozent, aus Prozent wird Bruch. Hefteintrag: „Prozent ist ein Anteil von 100. 1 % = 1/100." Der Satz „25 von 100 heißt 25 Hundertstel" wird gemeinsam formuliert und ins Heft übernommen.',
              uebung: '8\' · Übung und Schulung (Engelking-B1 Kap. 5): Mechanisierung der Hundertstel-Schreibweise — drei Schnell-Aufträge im Heft („Skizziere 10 % am Quadrat", „Welcher Bruch entspricht 50 %?", „Wie viele Plättchen sind 75 %?"). Tisch-Partner-Check. Bewusst kurz (operative Durcharbeitung steht noch im Vordergrund, Fertigkeitsübung wächst über UE 2-3 mit).',
              anwendung: '5\' · Anwendung in neuer Sachsituation (Engelking-B1 Kap. 6): Reflexionsfrage „Wo hast du heute Prozente schon gesehen?" (mündliche Sammlung — fließt in UE 4). Realbeleg-Plakat „Prozent in unserer Welt" wird gestartet mit ersten Wortmeldungen (Akku, Werbung, Quittung). Integration in vorhandenes Alltagswissen.',
              sozialform_phasen: {
                erarbeitung: 'Plenum (UG · Zielorientierung) → PA (Tisch-Partner, Plättchen) → EA + UG (Tabelle)',
                durchdringung: 'Plenum (Lehrervortrag, kurz) + EA (Hefteintrag)',
                uebung: 'EA + PA',
                anwendung: 'Plenum (Sammlung)',
              },
              prinzipien_mathe: [
                'Engelking-4-Phasen (Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung)',
                'EIS-Wechsel als Repräsentations-Modell in der Erarbeitung (Bruner 1966)',
                'Operatives Prinzip (Aebli, Wittmann 1985)',
                'Induktive Methode / Entdeckendes Lernen (Engelking-B1 Kap. 3.2)',
                'Spiralprinzip (M6-Bruch-Anschluss)',
              ],
              kompetenzstruktur: {
                gegenstand: 'Anteile · Hundertstelbrüche',
                perspektive: 'operativ · anwendungsorientiert',
                prozesskompetenz: 'Darstellungen verwenden · Argumentieren',
              },
              didaktik: 'Engelking-B1 (Bausteinskript MS Bayern-Unterfranken · 4-Phasen-Modell: Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung) als verbindliche UE-Verlaufsstruktur · Bruner 1966 EIS ALS REPRÄSENTATIONS-WECHSEL innerhalb der Erarbeitung (konkretes Handeln → ikonisch → symbolisch bei fachgerechter Verbalisierung, Engelking-B1 Kap. 3.1) · Aebli/Wittmann 1985 operatives Prinzip (Anteile durch Handeln erschließen) · LP+M7R KE 1 verbatim („handelnd sichtbar")',
              differenzierung_block: {
                daz: 'Wortspeicher an der Tafel: Anteil · Hundertstel · von 100 · pro Hundert. Plättchen als sprachreduzierte Methode (Handeln statt Sprechen).',
                lrs: 'Tabellen-Vorlage mit Spaltenüberschriften gedruckt · Schriftgröße 14 pt · ausreichend Zeit für Schreibphase.',
                leistungsschwach: 'Reduziert auf drei Aufträge (10, 25, 50) statt fünf. Bruchschreibweise vorgegeben, nur Anteilszahl ergänzen.',
                leistungsstark: 'Zusatzaufgabe AFB III (siehe TZ4): zwei Anteile vergleichen und Begründung formulieren.',
              },
              personifikation_anteil: 'Praxis-Anker: „Du legst gleich selbst — und in zwei Stunden findest du die gleiche Zahl auf einer echten Quittung wieder."',
              tafelbild_skizze: '3-Zonen: links 100er-Feld (Folie, sichtbar dauerhaft) · Mitte Drei-Spalten-Tabelle (gelegt / als Anteil / als Bruch) · rechts Hefteintrag-Vorlage „Prozent = Anteil von 100".',
              hausaufgabe: '—',
              material: '100er-Feld auf Folie (oder gedruckt A3) · Plättchen 100 Stück pro Tisch · Tabellen-Vorlage A5 · Wortspeicher-Karten',
              lp_bezug: 'KE 1 (handelnd sichtbar machen) · Anbahnung KE 3 (Begriffe Grundwert/Prozentwert/Prozentsatz)',
            },
            {
              nr: 2,
              titel: 'Prozentstreifen + Kreisdiagramm — Anteile bildlich darstellen',
              stundenthema_frage: 'Wie sieht 30 % auf dem Prozentstreifen aus — und auf dem Kreis?',
              minuten: 45,
              lernziel: 'SuS übertragen Prozentanteile auf den Prozentstreifen und auf das Kreisdiagramm und nutzen beide Darstellungen für Schätz- und Vergleichsaufgaben.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler markieren vorgegebene Prozentanteile (1 %, 10 %, 25 %, 50 %, 75 %) auf einem Prozentstreifen und in einem Kreisdiagramm,',
                bedingung: 'indem sie einen Streifen 0 % bis 100 % mit Zwischenmarkierungen und ein Kreisdiagramm zu vier Anteilen beschriften,',
                maszstab: 'was daran erkennbar wird, dass alle fünf Anteile lagerichtig auf dem Streifen erscheinen und das Kreisdiagramm vier farbige Sektoren mit Prozentangaben zeigt.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du markierst 25 %, 50 %, 75 % am Prozentstreifen,',
                  indem: 'indem du den Streifen 0 % bis 100 % an den richtigen Stellen senkrecht teilst und beschriftest,',
                  erkennbar: 'was daran erkennbar wird, dass die drei Markierungen die Streifenlänge in vier gleich große Stücke teilen.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du überträgst die gleichen Anteile in ein Kreisdiagramm,',
                  indem: 'indem du den Kreis in vier gleich große Sektoren teilst und diese mit 25 %, 25 %, 25 %, 25 % beschriftest,',
                  erkennbar: 'was daran erkennbar wird, dass die vier Sektoren erkennbar gleich groß sind und die Summe 100 % ergibt.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du schätzt einen unbekannten Anteil mit dem Streifen,',
                  indem: 'indem du am Streifen einen markierten Punkt als ungefähren Prozentwert ablesen kannst,',
                  erkennbar: 'was daran erkennbar wird, dass deine Schätzung um höchstens 5 % vom realen Wert abweicht.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du erklärst, warum 50 % auf dem Streifen genauso aussehen wie der halbe Kreis,',
                  indem: 'indem du den Bezug zwischen beiden Darstellungen mit dem Begriff „Anteil am Ganzen" sprachlich begründest,',
                  erkennbar: 'was daran erkennbar wird, dass deine Erklärung den Begriff „Hundertstel" oder „halb von Hundert" verwendet.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '22\' · Erarbeitung des mathematischen Problems (Engelking-B1 Kap. 3) durch EIS-Wechsel mit Schwerpunkt ikonische Repräsentation. (a) ZIELORIENTIERUNG (5\'): Rückgriff auf UE 1, 100er-Feld noch sichtbar. Lehrkraft-Impuls: „25 Prozent — wie könntest du das in einem Bild zeigen, ohne 100 Plättchen zu legen?" Kognitiver Konflikt: das 100er-Feld ist sperrig, ein einfacheres Bild ist gesucht. Lernziel transparent: „Heute lernst du Prozentstreifen und Kreisdiagramm — die beiden klassischen Prozent-Bilder." (b) KONKRETES HANDELN (5\'): Papierstreifen 20 cm + Faltübung — einmal falten = 50 %, zweimal falten = 25 %. Brücke zum Hand-Tun aus UE 1. (c) IKONISCH/ZEICHNERISCH (12\'): Prozentstreifen-AB mit 1 %-Skala bis 100 %; SuS markieren 1, 10, 25, 30, 50, 75, 99. Kreisdiagramm-AB: vier Sektoren in 25 %-Schritten beschriften. Drei-Darstellungen-Vergleich an der Tafel: Plättchen-Bild aus UE 1 + Streifen + Kreis.',
              durchdringung: '8\' · Operative Durchdringung (Engelking-B1 Kap. 4): Variabilität durch Zwischenmarkierungen — 10 % auf dem Streifen, 12,5 % als Marke „zwischen 10 und 25". Erste Begegnung mit nicht-runden Prozenten. Verbalisierung + Hefteintrag: „Der Prozentstreifen zeigt alle Anteile zwischen 0 % und 100 % auf einer Linie. Der Kreis zeigt das Ganze und seine Sektoren." Transitivität-Anbahnung: gleiche Struktur (Anteil von 100) in drei Darstellungen.',
              uebung: '10\' · Übung und Schulung (Engelking-B1 Kap. 5): Mechanisierung der Streifen-Markierungen — Mini-Aufgaben im Heft („Markiere 40 % am Streifen", „Färbe einen Kreis-Sektor mit 75 %", „Welcher Anteil liegt zwischen 30 % und 50 % am Streifen?"). Operatives Üben mit operativer Variation (Wittmann 1992). Tisch-Partner-Check.',
              anwendung: '5\' · Anwendung in neuer Sachsituation (Engelking-B1 Kap. 6): Schätzaufgabe „Auf einem Bild ist ein Glas zu wie viel % voll?" Drei Fotos werden gezeigt — SuS schätzen mit Streifen-Vorstellung. Anker für UE 4: „Wenn dein Akku 30 % anzeigt — wo wäre das auf dem Streifen?" Integration in alltägliche Wahrnehmungen.',
              sozialform_phasen: {
                erarbeitung: 'Plenum (UG · Zielorientierung) → EA (Falten) → EA + Tisch-Vergleich',
                durchdringung: 'Plenum + EA (Hefteintrag)',
                uebung: 'EA + PA',
                anwendung: 'Plenum (Schätz-UG)',
              },
              differenzierung_block: {
                daz: 'Bild-Bezug aus UE 1 sichtbar lassen · Wortspeicher: Streifen, Sektor, Kreis, ablesen, markieren · Schritt-für-Schritt-Vorgabe.',
                lrs: 'Vorgedruckte Streifen + Kreise (statt selber zeichnen) · Lineal-Hilfe · 18 pt Beschriftung.',
                leistungsschwach: 'Reduziert auf 25 %, 50 %, 75 %. Kreis bereits in vier Sektoren geteilt — nur Beschriften.',
                leistungsstark: 'Zusatz AFB III: 12,5 % am Streifen UND am Kreis darstellen + sprachlich erklären, warum dies einem Achtel entspricht.',
              },
              personifikation_anteil: 'Praxis-Anker: „Wenn dein Akku 30 % anzeigt — wo wäre das auf dem Streifen? Und wie viel Glück hast du noch?"',
              tafelbild_skizze: '3-Zonen: links Folie 100er-Feld aus UE 1 (Wiederholung) · Mitte Prozentstreifen 0%-100% mit Markierungen · rechts Kreisdiagramm 4-Sektoren. Alle drei nebeneinander sichtbar.',
              hausaufgabe: 'Drei Anteile (10 %, 40 %, 90 %) zu Hause am Streifen markieren — Vorlage liegt bei.',
              material: 'Papierstreifen 20 cm · Prozentstreifen-AB · Kreisdiagramm-AB · Lineal · Buntstifte · Akku-Vergleichsfoto',
              lp_bezug: 'KE 1 (Hundertstelbrüche) · Anbahnung KE 3 (Darstellungswechsel)',
              prinzipien_mathe: [
                'Engelking-4-Phasen (Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung)',
                'EIS-Wechsel in der Erarbeitung (Schwerpunkt: ikonische Repräsentation, Bruner 1966)',
                'Mehrfache Darstellungen (Wittmann/Müller Zahlenbuch)',
                'Spiralprinzip (Zahlenstrahl aus M5/M6)',
                'Differenzierung 4 Spuren',
              ],
              kompetenzstruktur: {
                gegenstand: 'Prozentstreifen · Kreisdiagramm',
                perspektive: 'ikonisch · innermathematisch',
                prozesskompetenz: 'Darstellungen verwenden · Kommunizieren',
              },
              didaktik: 'Engelking-B1 4-Phasen-Modell als UE-Verlauf · Bruner 1966 EIS als Repräsentations-Wechsel (Schwerpunkt ikonisch in der Erarbeitung) · Wittmann/Müller Zahlenbuch (Prozentstreifen als MS-Standardwerkzeug) · KMK 2003 prozessbezogene Kompetenz Darstellungen verwenden',
            },
            {
              nr: 3,
              titel: 'Dreisatz und Prozentformel — den Prozentwert berechnen',
              stundenthema_frage: 'Wie rechne ich den Prozentwert aus — mit Dreisatz oder Formel?',
              minuten: 45,
              lernziel: 'SuS berechnen den Prozentwert zu gegebenem Grundwert und Prozentsatz mit Dreisatz und mit der Prozentformel und prüfen das Ergebnis am Prozentstreifen.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler berechnen den Prozentwert zu gegebenem Grundwert und Prozentsatz,',
                bedingung: 'indem sie sechs Aufgaben jeweils mit Dreisatz UND mit der Prozentformel P = G · p % / 100 lösen und das Ergebnis am Prozentstreifen prüfen,',
                maszstab: 'was daran erkennbar wird, dass alle sechs Aufgaben mit beiden Verfahren im Heft stehen und die Ergebnisse übereinstimmen.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du benennst die drei Größen Grundwert · Prozentwert · Prozentsatz in einer Aufgabe,',
                  indem: 'indem du in jeder Aufgabe die drei Größen mit drei verschiedenen Farben unterstreichst,',
                  erkennbar: 'was daran erkennbar wird, dass alle drei Größen in allen sechs Aufgaben markiert sind.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du berechnest den Prozentwert mit dem Dreisatz,',
                  indem: 'indem du den Weg „100 % → 1 % → p %" sauber im Heft notierst,',
                  erkennbar: 'was daran erkennbar wird, dass alle Zwischenschritte sichtbar sind und das Ergebnis korrekt ist.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du berechnest denselben Prozentwert mit der Formel P = G · p % / 100,',
                  indem: 'indem du die Formel hinschreibst, die Werte einsetzt und ausrechnest,',
                  erkennbar: 'was daran erkennbar wird, dass beide Verfahren denselben Wert liefern.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du entscheidest, welches Verfahren in welcher Aufgabe vorteilhafter ist,',
                  indem: 'indem du bei zwei Zusatzaufgaben begründest, warum du Dreisatz oder Formel wählst,',
                  erkennbar: 'was daran erkennbar wird, dass deine Begründung den Bezug zu „glatte / krumme Prozentzahl" oder „Kopfrechnen möglich" enthält.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '20\' · Erarbeitung des mathematischen Problems (Engelking-B1 Kap. 3) durch EIS-Wechsel mit Schwerpunkt symbolische Repräsentation. (a) ZIELORIENTIERUNG (5\'): Aufgreif-Impuls aus UE 2: „Akku 30 % von 5000 mAh — wie viel mAh sind das?" SuS schätzen am Streifen (≈ 1500 mAh), bevor gerechnet wird. Kognitiver Konflikt: Schätzen reicht für die Quittung morgen nicht — wir brauchen ein zuverlässiges Rechen-Werkzeug. Lernziel transparent: „Heute lernst du zwei Wege, den Prozentwert exakt zu berechnen: Dreisatz und Formel." (b) IKONISCH/ZEICHNERISCH (7\'): Tafelbild „Dreisatz-Treppe" — 100 % entspricht 5000 mAh, durch 100 teilen → 1 % entspricht 50 mAh, mal 30 → 30 % entspricht 1500 mAh. Erst gemeinsam im Plenum, dann an zweiter Aufgabe selbst. (c) SYMBOLISCH (8\'): Formel-Einführung P = G · p % / 100, jede Variable farbig markiert (Grundwert/Prozentwert/Prozentsatz). Reversibilität-Anbahnung: aus Dreisatz wird die Formel.',
              durchdringung: '8\' · Operative Durchdringung (Engelking-B1 Kap. 4): Schulung der mathematischen Fähigkeiten durch Reversibilität (Formel vs. Dreisatz · zwei Wege zum gleichen Ergebnis) und fachgerechte Verbalisierung. Hefteintrag „Den Prozentwert berechnest du auf zwei Wegen: (1) Dreisatz-Treppe 100 % → 1 % → p %. (2) Formel P = G · p % / 100." Beispielrechnung 30 % von 5000 mAh wird vollständig im Heft notiert (beide Verfahren parallel).',
              uebung: '12\' · Übung und Schulung (Engelking-B1 Kap. 5): Schulung der rechnerischen Fähigkeiten — operatives + Fertigkeits-Üben (Engelking-B1 Kap. 5.7) parallel. Sechs Aufgaben aus dem Schulalltag (Rabatt, Bevölkerung, Zutaten) — alle SuS lösen mit BEIDEN Verfahren. Mechanisierung und Automatisierung der Formel-Anwendung. Hilfekarten-System nach Wood/Bruner/Ross 1976 (Karte 1: Streifen-Skizze, Karte 2: Dreisatz-Schema, Karte 3: Formel-Vorlage). Scaffolding mit Fading.',
              anwendung: '5\' · Anwendung (Engelking-B1 Kap. 6): Plenum-Vergleich „Bei welcher Aufgabe ging Dreisatz schneller, bei welcher die Formel?" Erstes Reflektieren über Verfahrenswahl. Ausblick auf UE 4: „Genau diese Rechnung brauchst du morgen an einer echten Quittung." Integration in vorhandenes Wissen + Vorbereitung der Anwendung im Realkontext.',
              sozialform_phasen: {
                erarbeitung: 'UG (Schätzimpuls) → Plenum (Lehrervortrag + gemeinsames Rechnen)',
                durchdringung: 'Plenum + EA (Hefteintrag)',
                uebung: 'EA mit Hilfekarten',
                anwendung: 'UG (Verfahrensvergleich)',
              },
              differenzierung_block: {
                daz: 'Wortspeicher: Grundwert · Prozentwert · Prozentsatz · entspricht · pro Hundert · Dreisatz. Farbige Markierung der drei Größen visualisiert Begriff statt Definition.',
                lrs: 'Tafelbild als A4-Abschrift austeilen · Hefteintrag-Vorlage mit Lücken-Struktur · Schriftgröße 14 pt für Aufgaben.',
                leistungsschwach: 'Reduziert auf vier Aufgaben mit glatten Prozentzahlen (10, 25, 50, 75 %). Dreisatz-Schema vorgedruckt — SuS füllen nur Zahlen ein.',
                leistungsstark: 'Zwei Zusatz-AFB-III-Aufgaben mit krummen Prozentwerten (12,5 % und 37,5 %) und Begründung der Verfahrenswahl (TZ4).',
              },
              personifikation_anteil: 'Praxis-Anker: „Du brauchst nicht beide Wege gleichzeitig — aber du sollst beide kennen, damit du in der nächsten Stunde die MwSt-Quittung sicher rechnen kannst."',
              tafelbild_skizze: '3-Zonen: links Dreisatz-Treppe (100 % → 1 % → p %) · Mitte Prozentformel P = G · p % / 100 mit farbiger Markierung der drei Größen · rechts Beispiel-Rechnung 30 % von 5000 mAh.',
              hausaufgabe: 'Zwei Aufgaben aus dem Buch (Aufgabe 3a + 3c, S. 14): Prozentwert mit Verfahren deiner Wahl berechnen.',
              material: 'Aufgaben-AB sechs Aufgaben · Hilfekarten-Set (3 Niveaus) · Hefteintrag-Vorlage · Tafelkreide drei Farben · Buntstifte',
              lp_bezug: 'KE 3 verbatim („berechnen fehlende Größen vorteilhaft") · KE 4 (Sachverhalte zuordnen)',
              prinzipien_mathe: [
                'Engelking-4-Phasen (Erarbeitung · Operative Durchdringung · Übung und Schulung · Anwendung)',
                'EIS-Wechsel in der Erarbeitung (Schwerpunkt: symbolische Notation, Bruner 1966)',
                'Operatives Prinzip (Dreisatz als 3-Schritt-Operationskette, Aebli/Wittmann 1985)',
                'Scaffolding (Wood/Bruner/Ross 1976)',
                'Differenzierung 4 Spuren',
              ],
              kompetenzstruktur: {
                gegenstand: 'Grundwert · Prozentwert · Prozentsatz · Dreisatz · Formel',
                perspektive: 'symbolisch · operativ',
                prozesskompetenz: 'Probleme lösen · mit symbolischen, formalen und technischen Elementen umgehen',
              },
              didaktik: 'Engelking-B1 4-Phasen-Modell als UE-Verlauf · Bruner 1966 EIS als Repräsentations-Wechsel (Schwerpunkt symbolisch in der Erarbeitung) · Aebli/Wittmann 1985 operatives Prinzip (Dreisatz als 3-Schritt-Operation, Reversibilität Dreisatz↔Formel) · Polya 1949 (Verfahrenswahl als Reflexion „Look back") · Wood/Bruner/Ross 1976 Scaffolding (Hilfekarten)',
            },
            {
              nr: 4,
              titel: 'MwSt-Rechnung an realer Quittung — SCHWERPUNKTSTUNDE',
              stundenthema_frage: 'Auf einer Quittung steht 7 % MwSt — wie viel Steuer wurde gezahlt?',
              minuten: 45,
              lernziel: 'SuS modellieren die MwSt-Berechnung am realen Kassenbon und berechnen den auf Lebensmittel entfallenden Steueranteil mit der Prozentformel.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler ermitteln den MwSt-Betrag auf einem realen Kassenbon und erklären, was die Angabe „inkl. 7 % MwSt" auf der Quittung bedeutet,',
                bedingung: 'indem sie an einem echten Lebensmittel-Kassenbon den Brutto-Betrag identifizieren, die enthaltene 7 %-MwSt berechnen und in einer kurzen schriftlichen Erklärung den Sinn der Angabe darlegen,',
                maszstab: 'was daran erkennbar wird, dass der berechnete MwSt-Betrag korrekt ist und die schriftliche Erklärung die Begriffe „Anteil von 100", „Brutto" und „Steuer" sinngemäß enthält.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du findest auf einer echten Quittung die Angabe „MwSt 7 %",',
                  indem: 'indem du den Kassenbon strukturiert liest und die MwSt-Zeile markierst,',
                  erkennbar: 'was daran erkennbar wird, dass die Zeile farbig markiert und kopiert ins Heft eingetragen ist.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du berechnest die MwSt aus dem Bruttowert mit der Prozentformel,',
                  indem: 'indem du den Bruttowert als G einsetzt, 7 als p % wählst und P berechnest (vereinfachte Berechnung im Mittelstufen-Niveau),',
                  erkennbar: 'was daran erkennbar wird, dass die Rechnung im Heft mit Formel + Einsetzen + Ergebnis sichtbar ist.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du erklärst die Bedeutung der MwSt-Angabe in zwei Sätzen,',
                  indem: 'indem du im Heft notierst, was „7 % MwSt" für den Käufer und den Staat bedeutet,',
                  erkennbar: 'was daran erkennbar wird, dass deine Erklärung den Begriff „Steueranteil" und „pro 100 Euro" verwendet.',
                  afb: 'III',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du unterscheidest 7 % (Lebensmittel) von 19 % (Konsumgüter) an zwei Quittungen,',
                  indem: 'indem du eine zweite Quittung (Drogerie / Elektronik) vergleichst und den MwSt-Unterschied begründest,',
                  erkennbar: 'was daran erkennbar wird, dass deine Begründung den staatlichen Lenkungsgedanken (Grundnahrungsmittel günstiger besteuert) erwähnt.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '20\' · Erarbeitung des mathematischen Problems im Modellierungskreislauf (Engelking-B1 Kap. 3 + Blum/Leiß 2005: Verstehen → Vereinfachen → Mathematisieren → Mathematisch arbeiten). EIS-Wechsel mit Schwerpunkt symbolische Repräsentation am Realbeleg. (a) ZIELORIENTIERUNG + KONKRETES HANDELN (6\'): SuS halten reale Quittungen in der Hand (mitgebracht oder von Lehrkraft kopiert für alle, A4 vergrößert). Markier-Auftrag: „Such die MwSt-Zeile, kreis sie rot ein." Stilles Suchen + Tisch-Partner-Check. Lernziel transparent: „Heute berechnest du an einer echten Quittung, wie viel Steuer du gezahlt hast — und erklärst, was das bedeutet." (SCHWERPUNKTSTUNDE: Modellierungskreislauf vollständig.) (b) IKONISCH/ZEICHNERISCH (6\'): Tafelbild — vergrößerte Beispiel-Quittung; Brutto-Wert + MwSt-Zeile farbig markiert. Modellierungs-Skizze „Brutto = Netto + Steuer" am Prozentstreifen mit 7 %-Markierung. (c) SYMBOLISCH (8\'): Berechnung MwSt = 7 % vom Brutto-Wert (im MS-Niveau gerechnet als P = G · 7 / 100, didaktisch korrekt für die Sequenz, ohne Brutto/Netto-Trennschärfe der Sek II). Hilfekarten verfügbar.',
              durchdringung: '10\' · Operative Durchdringung (Engelking-B1 Kap. 4) + Modellierungs-Validierung. Verbalisierung + Hefteintrag: Schreib-Auftrag „Erkläre in zwei Sätzen, was 7 % MwSt bedeutet." Hefteintrag „MwSt = Anteil vom Preis, den der Staat als Steuer bekommt." Beispielrechnung wird vollständig notiert. Reversibilität-Anwendung: aus Brutto die Steuer · aus Steuer und Satz den Brutto-Wert anbahnen. Plenum-Validierung: passt das Ergebnis zur realen Quittung?',
              uebung: '8\' · Übung und Schulung (Engelking-B1 Kap. 5): Mechanisierung der MwSt-Rechnung — zweite Quittung im Heft selbstständig durchrechnen. Für leistungsstarke SuS: zweite Quittung mit 19 % MwSt (Drogerie/Elektronik) — Vergleich der beiden Steuersätze. Operatives Üben mit produktiver Variation (Wittmann 1992).',
              anwendung: '7\' · Anwendung in neuer Sachsituation + Integration ins Alltagswissen (Engelking-B1 Kap. 6 · Blum/Leiß 2005 „Interpretieren / Validieren / Darlegen"): Plenum-Sammlung „Welche Quittungen habt ihr mitgebracht?" Realbeleg-Sammelplakat „Prozent-Welt" wächst um diese UE. SuS erklären in eigenen Worten, was sie aus dem Kassenbon herausgelesen haben (LP+-Prozesskompetenz Kommunizieren).',
              sozialform_phasen: {
                erarbeitung: 'EA + PA (Quittung lesen, Tisch-Partner-Check) → Plenum (Tafelbild gemeinsam) → EA mit Hilfekarten',
                durchdringung: 'EA (Hefteintrag) + Plenum (Validierung)',
                uebung: 'EA mit Hilfekarten',
                anwendung: 'Plenum (Sammelplakat + Vermittlung)',
              },
              differenzierung_block: {
                daz: 'Wortspeicher: Quittung · Kassenbon · MwSt · Brutto · Steuer · Anteil. Quittungs-Symbol als Bild zum Wort. Erklär-Auftrag in Lückentext umgewandelt.',
                lrs: 'Quittung A4 vergrößert + Markier-Schablone · Hefteintrag mit Lücken · Erklärungs-Satz als Wahl-Multiple-Choice (drei Optionen).',
                leistungsschwach: 'Quittung mit bereits markierter MwSt-Zeile · Glatter Brutto-Wert (100 € / 200 € / 50 €) · Vereinfachte Aufgabe ohne Brutto-/Nettotrennung.',
                leistungsstark: 'Zweite Quittung (Drogerie/Elektronik mit 19 %) zum Vergleich. AFB-III-Begründung (TZ4) zum Lenkungsgedanken der zwei Steuersätze.',
              },
              personifikation_anteil: 'Praxis-Anker: „Diese Quittung war heute Morgen noch beim Bäcker — und jetzt rechnest du selbst aus, wie viel davon der Staat bekommen hat."',
              tafelbild_skizze: '3-Zonen: links vergrößerte Beispiel-Quittung (A3) mit farbiger MwSt-Markierung · Mitte Prozentstreifen 0%-100% mit 7 %-Marke + Formel P = G · 7 / 100 · rechts Sammelplakat „Prozent in unserer Welt" mit Quittungs-Kopien.',
              hausaufgabe: 'Eine eigene Quittung mitbringen für UE 5. Berechne zu Hause die MwSt selbstständig (Hilfekarte 1 darf benutzt werden).',
              material: 'Reale Quittungen 1 pro Tisch (Lebensmittel) · A3-Vergrößerung Beispiel-Quittung · Markier-Stifte · Hilfekarten 3 Niveaus · Sammelplakat „Prozent-Welt"',
              lp_bezug: 'KE 3 verbatim („berechnen fehlende Größen vorteilhaft") · KE 5 verbatim („problemorientierte Aufgaben aus Alltag und Beruf")',
              prinzipien_mathe: [
                'Engelking-4-Phasen mit Schwerpunkt Erarbeitung + Anwendung',
                'Modellierungskreislauf 7 Schritte (Blum/Leiß 2005, Borromeo Ferri 2006)',
                'Beziehungshaltigkeit (Freudenthal 1973)',
                'Berufsorientierung (LP+ Bayern MS-Prinzip)',
                'Schwerpunktstunde',
              ],
              kompetenzstruktur: {
                gegenstand: 'Mehrwertsteuer · realer Beleg · Brutto/MwSt',
                perspektive: 'anwendungsorientiert · operativ',
                prozesskompetenz: 'Modellieren · Probleme lösen · Kommunizieren',
              },
              didaktik: 'Engelking-B1 4-Phasen-Modell als UE-Verlauf · Blum/Leiß 2005 Modellierungskreislauf (7 Schritte) als Erarbeitungs-Architektur dieser Schwerpunktstunde · Freudenthal 1973 Beziehungshaltigkeit („Mathematik AUS der Realität konstruieren") · Winter 1995 (Allgemeinbildungsaufsatz, Grunderfahrung „Erscheinungen unserer Welt mathematisch erfahren") · LP+ Bayern Berufsorientierung als Querbezug',
            },
            {
              nr: 5,
              titel: 'Rabatt-Berechnungen + Schnäppchen-Aufgabe',
              stundenthema_frage: 'Welches Schnäppchen lohnt sich wirklich — 20 % Rabatt auf 50 € oder 10 € weniger?',
              minuten: 45,
              lernziel: 'SuS berechnen Rabatte als Prozentwert und vergleichen prozentuale mit absoluten Rabatten in begründeten Verbraucher-Entscheidungen.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler vergleichen ein prozentuales Rabatt-Angebot mit einem absoluten Rabatt-Angebot und treffen eine begründete Verbraucher-Entscheidung,',
                bedingung: 'indem sie zu drei Angebots-Paaren jeweils den End-Preis berechnen und die Vorteilhaftigkeit schriftlich begründen,',
                maszstab: 'was daran erkennbar wird, dass alle drei Vergleiche im Heft mit Rechnung + End-Preis + 1-Satz-Begründung dokumentiert sind und die Entscheidung mathematisch korrekt ist.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du berechnest den Rabatt zu einem prozentualen Angebot,',
                  indem: 'indem du den Rabatt mit der Prozentformel (P = G · p % / 100) aus dem ursprünglichen Preis ermittelst,',
                  erkennbar: 'was daran erkennbar wird, dass die Rechnung im Heft sichtbar ist und das Ergebnis korrekt ist.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du berechnest den End-Preis,',
                  indem: 'indem du den Rabatt vom ursprünglichen Preis subtrahierst,',
                  erkennbar: 'was daran erkennbar wird, dass im Heft die Subtraktion und der End-Preis stehen.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du vergleichst zwei Angebote begründet,',
                  indem: 'indem du beide End-Preise berechnest und in einem Satz schreibst, welches Angebot günstiger ist und warum,',
                  erkennbar: 'was daran erkennbar wird, dass der Satz den Begriff „End-Preis" oder „du sparst" enthält und mathematisch belegt ist.',
                  afb: 'III',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du erkennst, ab welchem Grundpreis ein prozentualer Rabatt günstiger wird,',
                  indem: 'indem du an einem Vergleich „20 % vs. 10 € weniger" die Umschlag-Schwelle (50 €) bestimmst,',
                  erkennbar: 'was daran erkennbar wird, dass du die Schwelle nennst und begründest, wann welches Angebot günstiger ist.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '20\' · Erarbeitung des mathematischen Problems (Engelking-B1 Kap. 3) durch EIS-Wechsel im Modellierungskontext. (a) ZIELORIENTIERUNG (5\'): Foto-Impuls zwei Schaufenster-Schilder „20 % auf alles" vs. „10 € sofort weniger". Plenum-Frage: „Welches würdest du wählen — ohne zu rechnen?" Schnelles Voting (Handzeichen), dann erste Reflexion. Kognitiver Konflikt: ohne Rechnen ist die Entscheidung nicht verlässlich. Lernziel transparent: „Heute prüfst du rechnerisch, welches Angebot wirklich günstiger ist." (b) IKONISCH/ZEICHNERISCH (8\'): Drei Angebots-Paare an der Tafel als Tabelle: Grundpreis · prozentualer Rabatt · End-Preis · absoluter Rabatt · End-Preis · Differenz · günstiger. Erstes Paar gemeinsam ausgefüllt. (c) SYMBOLISCH (7\'): Vorgehen verbalisieren — Rabatt mit Formel P = G · p % / 100 berechnen, End-Preis durch Subtraktion. Modellierungs-Anker (Blum/Leiß 2005): Vereinfachen + Mathematisieren der Schaufenster-Frage.',
              durchdringung: '8\' · Operative Durchdringung (Engelking-B1 Kap. 4): Variabilität (verschiedene Grundpreise) + Verbalisierung. Hefteintrag „Prozentualer Rabatt lohnt sich, wenn der Grundpreis hoch ist; absoluter Rabatt bei kleinem Grundpreis." Verbalisierungs-Impuls: jeder formuliert in einem Satz, wann er welches Angebot wählen würde. Komposition + Reversibilität: Rabatt → End-Preis und umgekehrt End-Preis → erschließbarer Rabatt.',
              uebung: '10\' · Übung und Schulung (Engelking-B1 Kap. 5): Mechanisierung des Vergleich-Verfahrens — EA, SuS füllen die Tabelle für drei Beispiele aus (Schuhe 80 €, Jacke 50 €, T-Shirt 20 €) jeweils mit 20 % vs. 10 € Vergleich. Produktives Üben mit operativer Variation (Wittmann 1992). Hilfekarten verfügbar (Scaffolding mit Fading). Tisch-Partner-Check pro Beispiel.',
              anwendung: '7\' · Anwendung in neuer Sachsituation (Engelking-B1 Kap. 6): Plenum-Auswertung — Tabelle wird gemeinsam gefüllt. AFB-III-Schwellen-Frage (TZ4) als Auftrag für leistungsstarke Lernende — ab welchem Grundpreis kippt das günstigere Angebot? Übertragung auf reale Verbraucher-Entscheidungen + Querbezug Verbraucherbildung (LP+ Bayern). Integration in vorhandenes Alltagswissen.',
              sozialform_phasen: {
                erarbeitung: 'Plenum (Voting + UG) → Plenum (Tafel-Tabelle gemeinsam)',
                durchdringung: 'EA (Hefteintrag) + Plenum (Verbalisierung)',
                uebung: 'EA mit Hilfekarten + PA-Check',
                anwendung: 'UG + EA (Schwellen-Aufgabe)',
              },
              differenzierung_block: {
                daz: 'Wortspeicher: Rabatt · Schnäppchen · End-Preis · sparen · günstiger. Tabelle mit Spalten-Bildern für nicht-text-affine SuS.',
                lrs: 'Tabelle als A4-Vorlage · Beispiel-Rechnung vorgedruckt für erstes Paar · Schriftgröße 14 pt.',
                leistungsschwach: 'Reduziert auf zwei Angebots-Paare statt drei · Glatte Werte (50 € und 100 €) · Begründungs-Satz als Lückentext.',
                leistungsstark: 'Schwellen-Frage (TZ4) · Zusatzaufgabe „20 % vs. 15 € weniger — ab welchem Preis?"',
              },
              personifikation_anteil: 'Praxis-Anker: „Jeder hat schon mal ein „Schnäppchen" gekauft — heute prüfst du selbst, wann sich das wirklich lohnt."',
              tafelbild_skizze: '3-Zonen: links Foto-Impuls Schaufenster-Schilder · Mitte Vergleichstabelle 6 Spalten (Grundpreis · % Rabatt · End-Preis · € Rabatt · End-Preis · Differenz) · rechts Hefteintrag-Vorlage „Prozent vs. absolut".',
              hausaufgabe: 'Zwei eigene Beispiele aus Werbung / Internet finden und Rabatt-Vergleich rechnen.',
              material: 'Foto-Impuls Schaufenster · Vergleichstabelle A4 · Hilfekarten · Werbe-Beispiele (Prospekt-Ausriss)',
              lp_bezug: 'KE 3 (Sachverhalte zuordnen + Größen berechnen) · KE 5 verbatim („Alltag und Beruf") · Querbezug Verbraucherbildung',
              prinzipien_mathe: [
                'Engelking-4-Phasen mit Schwerpunkt Übung + Anwendung',
                'Modellierungskreislauf (Blum/Leiß 2005)',
                'Argumentieren als LP+-Prozesskompetenz',
                'Verbraucherbildung (LP+-Querbezug)',
              ],
              kompetenzstruktur: {
                gegenstand: 'Rabatt · Vergleich · prozentual vs. absolut',
                perspektive: 'anwendungsorientiert · sozialkundlich (Verbraucherbildung)',
                prozesskompetenz: 'Modellieren · Argumentieren · Kommunizieren',
              },
              didaktik: 'Engelking-B1 4-Phasen-Modell als UE-Verlauf · Blum/Leiß 2005 Modellierungskreislauf · LP+ Bayern MS Mathematik Prozesskompetenz Argumentieren · SINUS 2003 Aufgabenkultur · LP+ Bayern Verbraucherbildung als Querbezug',
            },
            {
              nr: 6,
              titel: 'Vermischte Aufgaben + Hefteintrag-Synthese + LZK-Vorbereitung',
              stundenthema_frage: 'Was kann ich jetzt sicher rechnen — und wo brauche ich noch eine Hilfe?',
              minuten: 45,
              lernziel: 'SuS lösen vermischte Prozentaufgaben mit selbstgewählten Verfahren, synthetisieren das Sequenz-Wissen in einem strukturierten Hefteintrag und schätzen ihren eigenen Lernstand begründet ein.',
              lernziel_stundenziel: {
                verhalten: 'Die Schülerinnen und Schüler lösen vermischte Prozentaufgaben aus den Themen Anteil · Dreisatz · Formel · MwSt · Rabatt und schätzen ihren Lernstand begründet ein,',
                bedingung: 'indem sie zu acht vermischten Aufgaben jeweils ein Verfahren wählen, die Aufgabe lösen und am Ende eine Selbsteinschätzung „sicher / mit Hilfe / unsicher" mit kurzer Begründung notieren,',
                maszstab: 'was daran erkennbar wird, dass alle acht Aufgaben mit Verfahren und Ergebnis im Heft stehen und die Selbsteinschätzung mindestens drei Bereiche differenziert benennt.',
              },
              lernziel_teilziele: [
                {
                  tz: 'Du wählst zu jeder Aufgabe ein passendes Verfahren,',
                  indem: 'indem du vor der Rechnung notierst „Dreisatz" oder „Formel" oder „Streifen",',
                  erkennbar: 'was daran erkennbar wird, dass jede Aufgabe im Heft ein Verfahrens-Etikett trägt.',
                  afb: 'I',
                  differenziert: false,
                },
                {
                  tz: 'Du löst die Aufgabe korrekt mit gewähltem Verfahren,',
                  indem: 'indem du Zwischenschritte sichtbar machst und das Ergebnis prüfst,',
                  erkennbar: 'was daran erkennbar wird, dass mindestens sechs der acht Aufgaben mathematisch korrekt sind.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: 'Du erstellst einen Hefteintrag „Prozent-Sequenz im Überblick",',
                  indem: 'indem du die fünf Lernschritte Anteil → Streifen → Formel → MwSt → Rabatt in einer Übersicht zusammenstellst,',
                  erkennbar: 'was daran erkennbar wird, dass deine Übersicht alle fünf Schritte mit einem Beispiel enthält.',
                  afb: 'II',
                  differenziert: false,
                },
                {
                  tz: '[Differenziert / leistungsstark] Du formulierst eine eigene Anwendungs-Aufgabe und löst sie,',
                  indem: 'indem du eine Aufgabe aus deinem eigenen Alltag (z. B. Akku · Quittung · Rabatt) entwickelst, sie aufschreibst und vorrechnest,',
                  erkennbar: 'was daran erkennbar wird, dass deine Aufgabe vollständig formuliert ist und die Musterlösung am Streifen geprüft werden kann.',
                  afb: 'III',
                  differenziert: true,
                },
              ],
              erarbeitung: '10\' · Erarbeitung als Vernetzungs-Wiederholung (Engelking-B1 Kap. 5.8.4 integrierende Wiederholung). (a) ZIELORIENTIERUNG (4\'): Sammelplakat „Prozent-Welt" aus UE 4 + 5 vor der Klasse aufhängen. Plenum-Sammlung „Wo habt ihr seit UE 1 Prozent gesehen?" Realbeleg-Erinnerung als diagnostischer Einstieg. Lernziel transparent: „Heute prüfst du selbst, wo du sicher bist und wo wir vor der LZK noch eine Hilfe brauchen." (b) STRUKTURIERENDE WIEDERHOLUNG (6\'): Mind-Map an der Tafel mit den fünf Lernschritten Anteil → Streifen → Formel → MwSt → Rabatt; Pfeile zeigen Verknüpfungen. Jeder Schritt wird kurz mit einer Schlüsselaufgabe wiederholt. Operativ-strukturelles Sichtbarmachen der Sequenz-Architektur.',
              durchdringung: '6\' · Operative Durchdringung (Engelking-B1 Kap. 4 · integrierende Wiederholung Kap. 5.8.4): Hefteintrag „Prozent-Sequenz im Überblick" wird gemeinsam strukturiert — alle fünf Schritte mit je einem Mini-Beispiel. Verbalisierung des roten Fadens: „Vom 100er-Feld zum Kassenbon." Transitivität sichtbar: gleiche Struktur „Anteil von 100" in fünf Repräsentationen.',
              uebung: '20\' · Übung und Schulung (Engelking-B1 Kap. 5) als zentrale Phase dieser Wiederholungsstunde: produktives Üben + Diagnose (Wittmann 1992) — acht vermischte Aufgaben (zwei je Schritt: Anteil-Identifikation, Streifen-Schätzung, Formel-Anwendung, MwSt, Rabatt). Hilfekarten verfügbar. SuS markieren am Rand die eigene Sicherheit (✓ / ? / ✗). Differenzierte Üb-Spuren nach Selbsteinschätzung. Schulung der rechnerischen Fähigkeiten + integrierende Wiederholung.',
              anwendung: '9\' · Anwendung + metakognitive Selbsteinschätzung (Engelking-B1 Kap. 6 · Polya 1949 „Look back"): SuS notieren auf vorgedruckter Selbsteinschätzungs-Karte „sicher / mit Hilfe / unsicher" für die fünf Themen. Plenum-Sammlung der Unsicherheiten als LZK-Vorbereitung. Übertragung der eigenen Lernstands-Diagnose in konkretes Nacharbeits-Vorhaben (HA). Integration des Gelernten in das eigene Lern-Selbstbild.',
              sozialform_phasen: {
                erarbeitung: 'Plenum (Sammelplakat-Erinnerung) → Plenum (Mind-Map gemeinsam)',
                durchdringung: 'Plenum + EA (Hefteintrag)',
                uebung: 'EA mit Hilfekarten',
                anwendung: 'EA (Karte) + Plenum (Sammlung)',
              },
              differenzierung_block: {
                daz: 'Mind-Map mit Symbolen statt Wörtern · Selbsteinschätzungs-Karte mit Smileys statt Wörtern · acht Aufgaben mit Bild-Bezug zum Realbeleg.',
                lrs: 'Aufgaben-AB mit großzügigem Schreibraum · Selbsteinschätzungs-Karte als Multiple-Choice · Hefteintrag-Vorlage mit Lücken.',
                leistungsschwach: 'Reduziert auf sechs Aufgaben (statt acht) · Verfahrens-Wahl auf Dreisatz ODER Streifen begrenzt · Selbsteinschätzung auf drei Themen reduziert.',
                leistungsstark: 'Eigene Anwendungs-Aufgabe formulieren (TZ4) · Zusatz-Reflexion: „Welches Verfahren hat dir am besten geholfen — und warum?"',
              },
              personifikation_anteil: 'Praxis-Anker: „Du hast in fünf Stunden ein ganzes Werkzeug gelernt — heute prüfst du selbst, wo du sicher bist und wo wir noch eine Hilfe brauchen, bevor die LZK kommt."',
              tafelbild_skizze: '3-Zonen: links Sammelplakat „Prozent-Welt" mit allen Realbelegen · Mitte Mind-Map fünf Lernschritte mit Pfeilen · rechts Hefteintrag-Synthese „Prozent-Sequenz im Überblick".',
              hausaufgabe: 'Schwächste Selbsteinschätzungs-Bereich nacharbeiten (Hilfekarten + Buch-Aufgaben S. 16-17).',
              material: 'Acht-Aufgaben-AB · Selbsteinschätzungs-Karte vorgedruckt · Hilfekarten 3 Niveaus · Sammelplakat (aus UE 4) · Hefteintrag-Vorlage „Prozent-Sequenz im Überblick"',
              lp_bezug: 'Alle KE 1-5 gemeinsam (Synthese) · LZK-Vorbereitung verbindet kompetenzorientierte Leistungsmessung mit Sequenz-Reflexion',
              prinzipien_mathe: [
                'Engelking-4-Phasen als Wiederholungs-/Vernetzungsstunde (Schwerpunkt Übung + Anwendung)',
                'Integrierende Wiederholung (Engelking-B1 Kap. 5.8.4)',
                'Produktives Üben (Wittmann 1992)',
                'Metakognition + „Look back" (Polya 1949)',
                'Veränderte Leistungsmessung (LP+ Bayern)',
              ],
              kompetenzstruktur: {
                gegenstand: 'Vermischte Aufgaben · Hefteintrag-Synthese · Selbsteinschätzung',
                perspektive: 'innermathematisch · reflexiv',
                prozesskompetenz: 'Kommunizieren + alle weiteren prozessbezogenen Kompetenzen in der LZK-Vorbereitung',
              },
              didaktik: 'Engelking-B1 4-Phasen-Modell + integrierende Wiederholung (Engelking-B1 Kap. 5.8.4) als Stundentyp Wiederholungs-/Vernetzungsstunde · Wittmann 1992 produktives Üben (substantielle Lernumgebung, gegen „graue Päckchen") · Polya 1949 Metakognition („Look back") · LP+ Bayern MS Mathematik veränderte Leistungsmessung',
            },
          ],
          bezuege_global: [
            { didaktik: 'Engelking-4-Phasen-Verlauf (Bausteinskript B1, AG MS-Seminarleiter:innen Unterfranken)', verweis: 'Jede UE der Sequenz folgt dem verbindlichen 4-Phasen-Modell nach Engelking-B1: Erarbeitung des mathematischen Problems → Operative Durchdringung → Übung und Schulung → Anwendung. Engelking-B1 betont (Kap. 2.3): „Aber nicht alle Phasen sind immer sinnvoll und realisierbar, vor allem nicht in einer 45-minütigen Einheit." — Stundentyp-spezifische Gewichtung: UE 1-3 Einführungsstunden mit langer Erarbeitung; UE 4 Anwendungs-/Modellierungsstunde (Schwerpunktstunde); UE 5 Modellierungs-/Übungsstunde; UE 6 Wiederholungs-/Vernetzungsstunde mit integrierender Wiederholung (Engelking-B1 Kap. 5.8.4).' },
            { didaktik: 'EIS-Repräsentations-Wechsel innerhalb der Erarbeitung (Engelking-B1 Kap. 3.1 · Bruner 1966)', verweis: 'Bruners EIS-Modell ist KEIN UE-Phasenschema, sondern ein Repräsentationsmodell (modes of representation). Engelking-B1 Kap. 3.1 verankert es ausdrücklich INNERHALB der Erarbeitungsphase („konkretes Handeln · ikonisch/zeichnerisch · symbolisch bei fachgerechter Verbalisierung"): vom 100er-Feld + Plättchen (konkretes Handeln, UE 1) über Prozentstreifen + Kreisdiagramm (ikonisch, UE 2) zur Formel P = G · p % / 100 (symbolisch, UE 3). Operationalisiert die LP+-Prozesskompetenz „Darstellungen verwenden".' },
            { didaktik: 'Spiralprinzip (Bruner 1960/1966)', verweis: 'M6 Brüche → M7R Prozent → M8 Zins → M9R exponentielles Wachstum. Vier Stufen derselben Anteils-/Verhältnis-Logik in zunehmender Abstraktion (Bruner: „spiral curriculum").' },
            { didaktik: 'Operatives Prinzip (Engelking-B1 Kap. 2.2 · Aebli 1980/81 · Wittmann 1985)', verweis: 'Engelking-B1 Kap. 4 strukturiert die operative Durchdringung über fünf Merkmale: Reversibilität · Assoziation · Variabilität · Transitivität · Komposition. UE 3 Dreisatz als 3-Schritt-Operationskette (Komposition) · UE 2 Darstellungswechsel als Variabilität · UE 5 Komposition + Reversibilität in der Rabatt-Schwellen-Frage. Aebli: „Denken — das Ordnen des Tuns." Wittmann JMD 6 (1985): mathematische Begriffe entstehen durch geistige Operationen am mathematischen Material.' },
            { didaktik: 'Produktives Üben (Wittmann 1992)', verweis: 'Übungsphasen pro UE sind nicht „graue Päckchen", sondern operativ variierte Mini-Aufgabenfelder. UE 6 als Synthese-Übung mit Selbsteinschätzung. Wittmann „Wider die Flut der bunten Hunde und der grauen Päckchen": substantielle Lernumgebung statt isoliertem Drill.' },
            { didaktik: 'Modellierungskreislauf (Blum/Leiß 2005, Borromeo Ferri 2006)', verweis: 'UE 4 (MwSt-Quittung, Schwerpunktstunde) und UE 5 (Rabatt-Vergleich) durchlaufen den vollständigen Modellierungskreislauf in 7 Schritten: Verstehen → Vereinfachen/Strukturieren → Mathematisieren → Mathematisch arbeiten → Interpretieren → Validieren → Vermitteln/Darlegen.' },
            { didaktik: 'Drei Grunderfahrungen (Winter 1995)', verweis: 'Die Sequenz adressiert die drei Grunderfahrungen nach Winter (Allgemeinbildungsaufsatz): (1) Erscheinungen der Welt mathematisch wahrnehmen (Quittung, Schaufenster), (2) mathematische Objekte als geistige Schöpfungen erleben (Formel, Streifen), (3) Problemlösefähigkeiten erwerben (Verfahrenswahl, Rabatt-Schwelle).' },
            { didaktik: 'Beziehungshaltigkeit (Freudenthal 1973)', verweis: 'Sequenz wird AUS der Lebenswelt entwickelt (Quittung, Akku, Schaufenster), nicht NACHTRÄGLICH angewendet. Realbeleg-Sammelplakat wächst über die Sequenz und bildet den durchgängigen Anker.' },
            { didaktik: 'Conceptual Field (Vergnaud 1990)', verweis: 'Prozent gehört zum Begriffsfeld „proportionale Strukturen" (champ multiplicatif) — verbunden mit Brüchen (UE 1-2), Verhältnissen (UE 3) und linearen Anwendungen (UE 4-5). Sequenz aktiviert diese Konzeptfeld-Verbindungen über Darstellungswechsel.' },
            { didaktik: 'LP+-Bayern 6 Prozesskompetenzen', verweis: 'Argumentieren · Probleme lösen · Modellieren · Darstellungen verwenden · Mit symbolischen, formalen und technischen Elementen umgehen · Kommunizieren. Alle sechs werden in der Sequenz adressiert; pro UE Schwerpunkte gesetzt (siehe sequenz_tabelle Spalte „Prozesskompetenz").' },
            { didaktik: 'Differenzierung 4 Spuren (LP+ Bayern Pflicht)', verweis: 'Pro UE differenziert in DaZ · LRS · leistungsschwach · leistungsstark. Hilfekarten-System nach Wood/Bruner/Ross 1976 (Scaffolding mit Fading). Pro UE eine AFB-III-Zusatzaufgabe für leistungsstarke SuS.' },
            { didaktik: 'Eigene Praxis (M7c SJ 25/26)', verweis: 'Diese Sequenz basiert auf 3 real durchgeführten UEs im „Goldcluster" der eigenen Klasse + Seminarübung Würzburg Nov 2025 (Beispiel-Sequenz Prozent v2/v3) als didaktische Vorlage.' },
            { didaktik: 'LP+M7R Cross-LB-Vernetzung', verweis: 'Explizite KE-Beziehung prozentrechnung_4 ↔ proportionalitaet_2 (vgl. M7_LB4-Sequenz UE 5). Cross-LB-Anker im LP+ Bayern dokumentiert.' },
          ],
        },
      },
    },

    'M7_LB2': {
      ke: 'LP+ M7R LB4+LB5 · 6 KEs',
      titel: 'Flächeninhalt + Rauminhalt',
      kurz: 'Parallelogramm · Dreieck · zusammengesetzte Figuren · gerade Prismen',
      status: 'gerüst',
    },
    'M7_LB3': {
      ke: 'LP+ M7R LB3 · 7 KEs',
      titel: 'Geometrische Figuren + Körper',
      kurz: 'Konstruktion sss/sws/wsw · Innenwinkelsumme · Prismen-Netze + Schrägbilder',
      status: 'gerüst',
    },
    'M7_LB4': {
      ke: 'LP+ M7R LB8 · 4 KEs',
      titel: 'Proportionalität',
      kurz: '*** Zuordnungen · Dreisatz · linear vs. nicht-linear',
      status: 'ausgearbeitet',
      sequenz: {
        ke_id: 'mathematik_m7_proportionalitaet_1..4 (LP+M7R)',
        ke_wortlaut: 'KE 1: „Schülerinnen und Schüler erkennen und beschreiben Alltagszuordnungen, stellen diese mit Je-desto-Sätzen sowie in Tabellen, Diagrammen und Graphen dar." KE 3: „... ergänzen bei proportionalen Zuordnungen Wertepaare in Tabellen (z. B. mit dem Dreisatz) und vergleichen rechnerische mit zeichnerischen Lösungen zur Ergebniskontrolle." KE 4: „... erkennen in Sachzusammenhängen Eigenschaften proportionaler Zuordnungen, ermitteln Wertepaare rechnerisch und prüfen/interpretieren Ergebnisse innerhalb der Situation."',
        ke_quelle: 'LPplusM7R · Lernbereich 8 Proportionalität · KEs 1-4 verbatim · LIS_PDF Stand 09.09.2025 · Seite 4.',
        ueberblick: '7-UE-Sequenz Proportionalität — funktionales Denken als Grundlage späterer linearer Funktionen (Spiral-Anker zu M8R LB5). Einstieg über Je-desto-Sätze (sprachsensibel) → Wertetabellen (ikonisch) → Dreisatz (symbolisch) → Modellierung. LP+M7R verknüpft Proportionalität explizit mit Prozent (KE-Beziehung zu prozentrechnung_4).',
        ues: [
          { nr: 1, titel: 'Je-desto-Sätze sammeln', ebene: 'enaktiv→ikonisch', kompetenz: 'Erkennen',
            inhalt: 'SuS sammeln Alltagsbeispiele: „Je mehr Brötchen, desto mehr Geld." „Je mehr Personen, desto schneller fertig." Klasseneinteilung in proportional / antiproportional / nicht eindeutig.',
            begruendung: 'LP+M7R KE 1 verlangt Je-desto-Sätze explizit. Sprachsensibler MU: erst sprachlich erfassen, bevor mathematisiert wird (Vergnaud1990: Begriffe haben sprachliche, situative und symbolische Repräsentationen — alle drei aktivieren). Beziehungshaltigkeit (Freudenthal1973).' },
          { nr: 2, titel: 'Wertetabellen + Graphen', ebene: 'ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Beispiel Bäcker: 1 Brötchen = 0,40 €. Wertetabelle füllen 1, 2, 3, …, 10. Punkte ins Koordinatensystem eintragen — alle auf einer Linie durch den Ursprung!',
            begruendung: 'Ikonische Repräsentation (Bruner 1966 EIS) im Erarbeitungs-EIS-Wechsel. Operatives Prinzip (Wittmann 1985): die Operation „Wert eintragen + verbinden" zeigt die proportionale Struktur. Vorbereitung Spirale → M8R lineare Funktionen, M9R quadratische Funktionen.' },
          { nr: 3, titel: 'Dreisatz als Werkzeug', ebene: 'ikonisch→symbolisch', kompetenz: 'Anwenden',
            inhalt: 'Vom Wert auf 1 Einheit → auf andere Anzahl. „4 Brötchen kosten 1,60 €. Was kosten 7?" Lösung: 4 → 1 → 7.',
            begruendung: 'LP+M7R KE 3 explizit: „Dreisatz". Operatives Prinzip (Wittmann1985): Dreisatz IST eine Operationskette (Zerlegen → Vereinheitlichen → Verkomponieren). Reversibilität als Operationsmerkmal: aus Preis-Menge auch Menge-Preis berechnen.' },
          { nr: 4, titel: 'Linear vs. nicht-linear unterscheiden', ebene: 'symbolisch', kompetenz: 'Argumentieren',
            inhalt: 'Kontrast-Aufgaben: Tarif mit Grundgebühr (NICHT proportional, aber linear) vs. Tarif ohne Grundgebühr (proportional). SuS begründen.',
            begruendung: 'LP+M7R KE 2 verlangt explizit: „lineare und nicht lineare Zusammenhänge unterscheiden". KMK2003 prozessbezogene Kompetenz „Argumentieren". Wichtige Spiral-Vorbereitung — der Unterschied „proportional vs. linear" wird in M8R LB5 (lineare Funktionen) entscheidend.' },
          { nr: 5, titel: 'Cross-Verbindung Prozent', ebene: 'symbolisch', kompetenz: 'Vernetzen',
            inhalt: 'Rückbezug zur Prozent-Sequenz (LB1): Prozentrechnung ist ein Spezialfall proportionaler Zuordnung (immer Bezug auf 100). Beispiele zeigen.',
            begruendung: 'LP+M7R KE-Beziehungen: prozentrechnung_4 ↔ proportionalitaet_2 sind explizit verknüpft. Spiralprinzip (Bruner1966) als horizontaler Spiral-Schritt — bekanntes Thema (Prozent) wird unter neuer Perspektive (Proportionalität) gesehen. Conceptual Field (Vergnaud1990): champ multiplicatif.' },
          { nr: 6, titel: 'Differenzierte Übung', ebene: 'symbolisch', kompetenz: 'Üben',
            inhalt: '3-Niveau-AB. Beispiele aus Alltag + Beruf.',
            begruendung: 'LP+ Bayern Differenzierungs-Pflicht. Produktives Üben (Wittmann2007). Drei AFB-Stufen.' },
          { nr: 7, titel: 'LNW + Reflexion', ebene: 'symbolisch', kompetenz: 'Reflektieren',
            inhalt: 'LNW: Je-desto-Sätze + Tabelle ergänzen + Dreisatz + Lin/nichtlin-Unterscheidung.',
            begruendung: 'Veränderte LM (LP+): alle Darstellungsformen prüfen (sprachlich, tabellarisch, grafisch, symbolisch).' },
        ],
        bezuege: [
          { didaktik: 'EIS-Repräsentations-Wechsel (Bruner 1966)', verweis: 'Innerhalb der Erarbeitungsphasen vollzieht sich der EIS-Wechsel: Je-desto-Sätze (sprachlich-enaktiv) → Wertetabelle + Graph (ikonisch) → Dreisatz-Notation (symbolisch). EIS als Repräsentationsmodell — UE-Phasen folgen Engelking-B1 (Bausteinskript MS Bayern-Unterfranken · 4-Phasen-Modell).' },
          { didaktik: 'Spiralprinzip (Bruner1966)', verweis: 'M6 Wertepaare → M7R Proportionalität (DIESE Sequenz) → M8R lineare Funktionen → M9R quadratische Funktionen. Funktionales Denken über 4 Jgst-Stufen.' },
          { didaktik: 'Conceptual Field (Vergnaud1990)', verweis: '„Champ multiplicatif" verbindet Brüche · Verhältnisse · Proportionalität · lineare Funktionen. UE 5 macht diese Vernetzung explizit.' },
          { didaktik: 'Operatives Prinzip (Wittmann1985)', verweis: 'Dreisatz als 3-Schritt-Operationskette (Zerlegen → Einheit → Komponieren). Reversibilität zwischen Menge↔Preis.' },
          { didaktik: 'Beziehungshaltigkeit (Freudenthal1973)', verweis: 'Sequenz startet mit Realbeispielen (UE 1) und kehrt in der Anwendung (UE 5+6) wieder dorthin zurück.' },
          { didaktik: 'LP+-Vernetzungen', verweis: 'LP+M7R KE-Beziehung prozentrechnung_4 ↔ proportionalitaet_2: explizit dokumentierte Cross-LB-Verbindung im Lehrplan. Diese Sequenz nutzt sie in UE 5.' },
        ],
      },
    },
    'M7_LB5': {
      ke: 'LP+ M7R LB6 · 3 KEs',
      titel: 'Diagramme + Statistik',
      kurz: 'Daten darstellen + bewerten · Spannweite · Zentralwert · arith. Mittel',
      status: 'gerüst',
    },
    'M7_LB6': {
      ke: 'LP+ M7R LB7 · 5 KEs',
      titel: 'Gleichungen + Terme',
      kurz: 'Variable einführen · Äquivalenzumformungen · ax + b = c',
      status: 'gerüst',
    },

    // ─── M8 ──────────────────────────────────────────────────────────────
    'M8_LB1': { ke: 'M8 LB1', titel: 'Zinsrechnung', kurz: 'Spiral-Anschluss Prozent · Sparen + Kredit', status: 'gerüst' },
    'M8_LB2': { ke: 'M8 LB2', titel: 'Körper-Volumen', kurz: 'Prisma · Zylinder · Anwendungen', status: 'stub' },
    'M8_LB3': { ke: 'M8 LB3', titel: 'Ähnlichkeit + Strahlensätze', kurz: 'Maßstab · Kartografie · indirekte Längenmessung', status: 'stub' },
    'M8_LB4': {
      ke: 'M8 LB4',
      titel: 'Lineare Funktionen',
      kurz: '*** y = m·x + b · Steigung + y-Achsen-Abschnitt · Modellieren',
      status: 'ausgearbeitet',
      sequenz: {
        ke_id: 'M8_LB4_KE1ff (KMK-Bildungsstandards-Anker; lokale LP+-M8R-Quelle steht noch aus)',
        ke_wortlaut: 'Inhalts-Anker gemäß KMK-Bildungsstandards Mittlerer Schulabschluss 2003/04, Leitidee „Funktionaler Zusammenhang": Schülerinnen und Schüler stellen lineare Zusammenhänge in Wertetabellen, Diagrammen und Termen dar, bestimmen Steigung und y-Achsen-Abschnitt einer linearen Funktion und nutzen sie zur Beschreibung von Realsituationen. — KE-Wortlaut wird auf LP+ Bayern M8R präzisiert sobald lokale Quelle vorhanden.',
        ke_quelle: 'KMK2003 Bildungsstandards Mathematik MSA, Leitidee L4 + KMK 2003/04 Sek I. Lokale LP+-Bayern-M8R-Quelle noch nicht eingelesen — KE-Wortlaut hier als KMK-Anker.',
        ueberblick: '8-UE-Sequenz Lineare Funktionen — funktionales Denken als zentrale algebraische Kompetenz der MS-Oberstufe. EIS-Progression von Wertetabellen (enaktiv-listenhaft, UE 1-2) über grafische Darstellung (ikonisch, UE 3-4) zur Funktionsgleichung (symbolisch, UE 5-7). Anknüpfung an M7R Proportionalität als Spiral-Anker (lineare Funktion = proportionale Funktion mit y-Achsen-Verschiebung).',
        ues: [
          { nr: 1, titel: 'Einstieg Kerze-Experiment', ebene: 'enaktiv', kompetenz: 'Erfahren',
            inhalt: 'Brennende Kerze in der Klasse. Alle 2 Minuten Höhe in cm messen. Wertetabelle anlegen. Vorhersage-Aufgabe: Wie hoch ist die Kerze nach 12 Minuten?',
            begruendung: 'Einstiegsphase + enaktive Repräsentation (Bruner 1966 EIS) als Auftakt der Erarbeitung. Beziehungshaltigkeit (Freudenthal 1973): mathematischer Begriff entsteht aus realer Erfahrung. Modellierungs-Anker (Blum/Leiß 2005) — die Sequenz beginnt mit einer authentischen Modellierungs-Situation, nicht mit der abstrakten Funktion.' },
          { nr: 2, titel: 'Wertetabelle → Diagramm', ebene: 'enaktiv→ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Werte aus Tabelle in Koordinatensystem übertragen. Punkt-Plot. Auffallend: alle Punkte liegen auf einer Linie.',
            begruendung: 'Darstellungs-Wechsel als LP+-Prozesskompetenz „Darstellungen verwenden". Ikonische Repräsentation (Bruner 1966 EIS) im Erarbeitungs-EIS-Wechsel — das Diagramm IST das Bild der Funktion. Sprachsensibler MU: die Linie als „die Funktion" benennen.' },
          { nr: 3, titel: 'Steigung als Verhältnis', ebene: 'ikonisch', kompetenz: 'Begreifen',
            inhalt: 'Steigungsdreieck am Graphen einzeichnen: m = Δy/Δx. Mehrere Funktionen vergleichen — welche steigt stärker? Steile vs. flache Geraden visuell und numerisch.',
            begruendung: 'Operatives Prinzip (Wittmann1985): Steigung als OPERATION (Δy pro Δx). Reversibilität: aus m und einem Punkt die Funktion rekonstruieren. Spiral-Anschluss zu M7R-Proportionalität (m als Proportionalitätsfaktor).' },
          { nr: 4, titel: 'y-Achsen-Abschnitt', ebene: 'ikonisch→symbolisch', kompetenz: 'Argumentieren',
            inhalt: 'Was bedeutet b? Was passiert, wenn die Linie nicht im Ursprung startet? Real-Bezug: Anfangsstand der Kerze, Grundgebühr beim Tarif.',
            begruendung: 'Argumentieren (KMK2003). Mehrperspektivität: b als algebraischer Parameter + als realer Anfangswert. Hier wird der wichtige Unterschied „proportional vs. linear" sichtbar (Spiral-Anker zu M7R Proportionalitäts-Sequenz, UE 4).' },
          { nr: 5, titel: 'Funktionsgleichung y = m·x + b', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Formale Notation: y = m · x + b. Aus 2 Punkten Funktion bestimmen. Praxis-Übung an gegebenen Tabellen.',
            begruendung: 'Symbolische Repräsentation (Bruner 1966 EIS) als Abschluss des Erarbeitungs-EIS-Wechsels — Notation als Verdichtung der grafischen Erkenntnis. Komprimierung des Verständnisses in einen Term. LP+-Prozesskompetenz „Mit symbolischen, formalen und technischen Elementen umgehen".' },
          { nr: 6, titel: 'Real-Modellierung', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Aufgaben: Tarif-Vergleich (Grundgebühr + Verbrauchspreis), Tankfüllung-Verbrauch, Sparplan. Modellierungs-Kreislauf vollständig durchlaufen.',
            begruendung: 'Modellierungskreislauf (BlumLeiss2005): 5 Schritte Konstruieren · Vereinfachen · Mathematisieren · Mathem. Arbeiten · Interpretieren · Validieren. SINUS2003-Aufgabenkultur. Bezug zu WiB (Tarif-Vergleich → Berufsorientierung, Verbraucherbildung).' },
          { nr: 7, titel: 'Übung + Differenzierung', ebene: 'symbolisch', kompetenz: 'Üben',
            inhalt: '3-Niveau-AB: bestimmen / darstellen / modellieren.',
            begruendung: 'Produktives Üben (Wittmann2007). Differenzierung nach AFB-Stufen (KMK2003: Reproduktion I · Anwendung II · Transfer III).' },
          { nr: 8, titel: 'Schulaufgabe + Reflexion', ebene: 'symbolisch', kompetenz: 'Reflektieren',
            inhalt: 'LNW: alle 3 Darstellungen abprüfen (Tabelle, Graph, Term).',
            begruendung: 'Veränderte Leistungsmessung — alle Repräsentations-Ebenen prüfen, nicht nur Term. Kompetenz-orientierte LNW (LP+ Bayern Fachprofil).' },
        ],
        bezuege: [
          { didaktik: 'EIS-Repräsentations-Wechsel (Bruner 1966)', verweis: 'EIS als Repräsentationsmodell (nicht als UE-Phasenmodell!) — vertikal über die Sequenz hinweg: Experiment (enaktiv, UE 1) → Diagramm (ikonisch, UE 2-4) → Formel (symbolisch, UE 5-6). UE-Phasenstruktur folgt Engelking-B1 (Bausteinskript MS Bayern-Unterfranken · 4-Phasen-Modell).' },
          { didaktik: 'Spiralprinzip (Bruner1966)', verweis: 'M7R Proportionalität → M8R lineare Funktion (= proportionale Funktion mit b ≠ 0) → M9R quadratische Funktionen. Funktionales Denken über 3 Jgst.' },
          { didaktik: 'Operatives Prinzip (Wittmann1985)', verweis: 'UE 3 Steigung als Operation, UE 5 Reversibilität (Funktion → Punkt → Funktion).' },
          { didaktik: 'Modellieren (BlumLeiss2005)', verweis: 'UE 1+6: vollständiger Modellierungskreislauf 5 Schritte. Sequenz beginnt UND endet in Realsituation.' },
          { didaktik: 'Beziehungshaltigkeit (Freudenthal1973)', verweis: 'Sachsituationen als Ausgangspunkt — kein algebraischer Selbstzweck.' },
          { didaktik: 'Conceptual Field (Vergnaud1990)', verweis: 'Lineare Funktion gehört zum Begriffsfeld „proportionale Strukturen" + erweitert es um konstanten Summanden b. Vernetzung Proportionalität · Prozent · linear.' },
        ],
      },
    },
    'M8_LB5': { ke: 'M8 LB5', titel: 'Statistik', kurz: 'Mittelwert · Median · Boxplot · Streuung', status: 'stub' },
    'M8_LB6': { ke: 'M8 LB6', titel: 'Gleichungen lösen', kurz: 'Äquivalenz-Umformung · komplexere lineare Gleichungen', status: 'stub' },

    // ─── M9R ─────────────────────────────────────────────────────────────
    'M9_LB1': { ke: 'M9R LB1', titel: 'Zinseszins + Geld', kurz: 'Exponentielles Wachstum (Anbahnung) · Kredite · Sparen', status: 'stub' },
    'M9_LB2': { ke: 'M9R LB2', titel: 'Körper-Volumen', kurz: 'Pyramide · Kegel · Kugel', status: 'stub' },
    'M9_LB3': { ke: 'M9R LB3', titel: 'Pythagoras + Trigonometrie', kurz: 'a² + b² = c² · Sinus · Cosinus · Tangens', status: 'gerüst' },
    'M9_LB4': { ke: 'M9R LB4', titel: 'Quadratische Funktion', kurz: 'Parabel · Scheitelpunkt · Normalform', status: 'gerüst' },
    'M9_LB5': { ke: 'M9R LB5', titel: 'Datenanalyse', kurz: 'Streuung · Quartile · Vergleich Datensätze', status: 'stub' },
    'M9_LB6': { ke: 'M9R LB6', titel: 'Gleichungssysteme', kurz: '2 Variablen · grafisch + rechnerisch (Einsetz/Additionsverfahren)', status: 'stub' },

    // ─── M10 ─────────────────────────────────────────────────────────────
    'M10_LB1': { ke: 'M10 LB1', titel: 'Geldmathematik', kurz: 'Kredit · Sparen · Zinseszins · Finanzkompetenz', status: 'stub' },
    'M10_LB2': { ke: 'M10 LB2', titel: 'Volumen Kegel/Pyramide', kurz: 'Räumliches Vorstellungsvermögen + Berechnungen', status: 'stub' },
    'M10_LB3': { ke: 'M10 LB3', titel: 'Geometrische Beweise', kurz: 'Argumentieren · Beweisführung mit Pythagoras + Strahlensätzen', status: 'stub' },
    'M10_LB4': { ke: 'M10 LB4', titel: 'Funktionen-Vertiefung', kurz: 'lin · quad · exp im Vergleich · Eigenschaften', status: 'stub' },
    'M10_LB5': { ke: 'M10 LB5', titel: 'Mehrstufige Zufallsversuche', kurz: 'Pfadregel · Baumdiagramm · bedingte W.', status: 'stub' },
    'M10_LB6': { ke: 'M10 LB6', titel: 'Bruchgleichungen + Termumformung', kurz: 'Definitionsbereich · Lösungsverfahren', status: 'stub' },
  },
};
