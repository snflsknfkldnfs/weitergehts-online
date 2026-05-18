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
// Bruner1966     · J. S. Bruner: Toward a Theory of Instruction. Harvard UP 1966.
// Aebli1985      · H. Aebli: Zwölf Grundformen des Lehrens. Klett-Cotta 1985.
// Wittmann1985   · E. Ch. Wittmann: Operatives Prinzip. JMD 6, S. 7-40, 1985.
// Wittmann2007   · E. Ch. Wittmann / G. N. Müller: Das Zahlenbuch. Klett 2007 ff.
// Polya1945      · G. Polya: How to Solve It. Princeton 1945 (dt. 1949).
// Freudenthal1973 · H. Freudenthal: Mathematik als pädagogische Aufgabe. Klett 1973.
// BlumLeiss2005  · W. Blum / D. Leiß: Modellieren im U.-Alltag. Beispiele + Erfahrungen. 2005.
// PiagetInhelder · J. Piaget / B. Inhelder: Die Psychologie des Kindes (1969).
// Vergnaud1990   · G. Vergnaud: La théorie des champs conceptuels. RDM 10, S. 133-170, 1990.
// SINUS2003      · BLK-Modellversuch SINUS: Aufgabenkultur. 1998-2003.
// WoodBruner1976 · D. Wood / J. Bruner / G. Ross: The role of tutoring. JCPP 17, S. 89-100, 1976.
// LPplusM7R      · LehrplanPLUS Bayern · Mittelschule · Mathematik R7 ·
//                  LIS_PDF Stand 09.09.2025 (lokal Unterrichtseinwicklung/...).
// KMK2003        · KMK Bildungsstandards Mathematik Mittlerer Schulabschluss. 2003/04.

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
            begruendung: 'Enaktive Stufe (Bruner1966): Lernende handeln mit konkretem Material, bevor Repräsentationen oder Symbole verlangt werden. Konstruktivistisches Wissens-Konstruieren (PiagetInhelder): die Lernenden bilden die Begriffe selbst, bevor Termini vorgegeben werden. Vorerfahrungen aktivieren (Aebli1985, Grundform „Anschauen").' },
          { nr: 2, titel: 'Begriffsklärung Eckpunkte · Kanten · Flächen', ebene: 'enaktiv→ikonisch', kompetenz: 'Begreifen',
            inhalt: 'Mit den Materialien werden Eckpunkte (Spitzen), Kanten (Verbindungslinien) und Flächen (Außenseiten) benannt und am Körper gezeigt. Jede:r markiert auf einem eigenen Würfel mit Klebepunkten.',
            begruendung: 'Übergang von der enaktiven zur ikonischen Stufe (Bruner1966) durch das Markieren. Operatives Prinzip (Wittmann1985): die Operation „Eckpunkte markieren" erschließt den Begriff. Sprachsensibler Mathematik-Unterricht: Lehrwortschatz präzise einführen (Eckpunkt ≠ Spitze, Kante ≠ Linie).' },
          { nr: 3, titel: 'Schrägbilder + Netze (ikonisch)', ebene: 'ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Skizzen-Übungen: Schrägbild Würfel + Quader. Bastel-Netze ausschneiden + falten. Aha-Effekt: das Netz „wird" zum Körper.',
            begruendung: 'Ikonische Stufe (Bruner1966): Repräsentation auf Papier. Spatial-Reasoning-Aufbau (PiagetInhelder). Operatives Prinzip (Wittmann1985): das Falten ist eine Operation, die die Beziehung Netz↔Körper sichtbar macht — geometrische Strukturen werden durch Tun erschlossen.' },
          { nr: 4, titel: 'Eulerformel (Anbahnung)', ebene: 'ikonisch→symbolisch', kompetenz: 'Argumentieren',
            inhalt: 'Tabelle: Würfel hat E=8, K=12, F=6. Quader auch. Pyramide: E=5, K=8, F=5. Lernende sollen Muster entdecken — Lehrkraft lenkt zur Beobachtung E − K + F = 2.',
            begruendung: 'Entdeckendes Lernen (Wittmann2007): Lernende ENTDECKEN die Beziehung, statt sie erklärt zu bekommen. Spiralprinzip (Bruner1966): die Eulerformel wird hier nur angebahnt, eine fundierte Begründung folgt in Sekundarstufe II. Mustererkennen als prozessbezogene Kompetenz (KMK2003 Argumentieren + Probleme lösen).' },
          { nr: 5, titel: 'Anwendungs-Übung — Real-Bezug', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Beispiele aus dem Alltag: „Wie viel Karton braucht Lina für ihre Geschenkbox?" (Quader-Oberfläche aus Flächenanzahl × Maße).',
            begruendung: 'Beziehungshaltigkeit (Freudenthal1973): Mathematik aus der Realität konstruieren, statt sie nachträglich anzuwenden. Modellierungs-Vorstufe nach BlumLeiss2005. Verbindung zur Größen-Welt L2 (Spiralprinzip Bruner1966).' },
          { nr: 6, titel: 'Sicherung + Lernzielkontrolle', ebene: 'symbolisch', kompetenz: 'Reflektieren',
            inhalt: 'Hefteintrag: Tabelle der 6 Körper-Typen mit Eckpunkten/Kanten/Flächen. Kurz-LNW mit 5 Aufgaben (Identifizieren, Skizzieren, Zählen, Anwenden).',
            begruendung: 'Sicherung als 4. Phase im 4-Phasen-Modell (Aebli1985). LNW kompetenzorientiert — alle drei AFB-Stufen (KMK2003: Reproduktion · Anwendung · Transfer) abdecken. Hefteintrag systematisiert das selbst Konstruierte und schließt den Lernzyklus.' },
        ],
        bezuege: [
          { didaktik: 'EIS-Prinzip (Bruner1966)', verweis: 'Vertikale Sequenz-Logik: enaktiv (UE1-2) → ikonisch (UE3) → symbolisch (UE4-6). Drei Repräsentationsebenen entsprechen Bruners Theorie der Begriffsbildung in Toward a Theory of Instruction, Kap. III.' },
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
        ke_quelle: 'LPplusM7R · Lernbereich 1 Prozentrechnung · KEs 1-7 verbatim · LIS_PDF Stand 09.09.2025 · Seite 1.',
        ueberblick: '8-UE-Sequenz Prozentrechnung — Realisation der eigenen Praxis M7c SJ 25/26 (3 UEs real durchgeführt, „Goldcluster") + Seminarübung Würzburg Nov 2025 (Beispiel-Sequenz Prozent v2/v3). EIS-Progression vom enaktiven 100er-Feld zur symbolischen Prozentformel. Spiral-Anker: M6-Bruch-Vorstellung aktivieren (KE 1: „Hundertstelbrüche") und auf Prozent-Begriff erweitern.',
        ues: [
          { nr: 1, titel: 'Einstieg 100er-Feld — Anteile sichtbar machen', ebene: 'enaktiv', kompetenz: 'Erfahren',
            inhalt: '100er-Feld auf Folie. SuS legen Anteile mit Plättchen: „Lege 25 Anteile von 100." Klare visuelle 1/4-Verbindung. Real-Manipulation am Hundertstelquadrat. Begriff „Prozent" wird NOCH NICHT eingeführt.',
            begruendung: 'Enaktive Stufe (Bruner1966). Operative Vorerfahrung (Wittmann1985) — Anteile werden HANDELND erfahren, bevor Notation einsteigt. LP+M7R KE 1 verlangt explizit „handelnd sichtbar" → Wortlaut wird direkt umgesetzt. Aebli1985, 1. Grundform Anschauen.' },
          { nr: 2, titel: 'Hundertstelbrüche — Spiral-Brücke zu M6', ebene: 'enaktiv→ikonisch', kompetenz: 'Begreifen',
            inhalt: 'Übersetzung: 25/100 = 25 von 100 = 25 %. Notation parallel: Bruch · Prozent · sprachlicher Ausdruck („ein Viertel"). Drei-Darstellungen-Vergleich.',
            begruendung: 'Spiralprinzip (Bruner1966): Bruch-Wissen aus M6 reaktiviert und auf Prozent erweitert. Operatives Prinzip (Wittmann1985): durch Darstellungswechsel wird die Äquivalenz erfahren. Vergnaud1990 Conceptual Field: Prozent gehört zum Bruchteils-/Verhältnis-Konzeptfeld — Aufbau erfolgt über mehrere Darstellungen. Sprachsensibler MU: Brücken-Vokabular „von Hundert" aufbauen.' },
          { nr: 3, titel: 'Prozentstreifen — neue ikonische Repräsentation', ebene: 'ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Prozentstreifen 0 % – 100 % mit Zwischenmarkierungen. Aufgaben: „Markiere 30 %, 75 %, 12,5 %." Streifen als Werkzeug für Schätzaufgaben.',
            begruendung: 'Ikonische Stufe (Bruner1966). Prozentstreifen ist DAS Modell-Werkzeug für Prozentrechnung in der MS (Wittmann2007 Zahlenbuch-Tradition). Bezug zum Zahlenstrahl aus M5/M6 — mathematische Vernetzung als Bildungsziel (KMK2003 Darstellungen verwenden).' },
          { nr: 4, titel: 'Prozentwert berechnen — Modellieren', ebene: 'ikonisch→symbolisch', kompetenz: 'Modellieren',
            inhalt: '„Im Schulshop 20 % Rabatt auf 50 €. Wie viel ist der Rabatt?" Lösung über Prozentstreifen UND Notation P = G · p % / 100.',
            begruendung: 'LP+M7R KE 3 verlangt explizit: „berechnen fehlende Größen vorteilhaft". Modellierungskreislauf (BlumLeiss2005): Realsituation → mathematisches Modell → Rechnung → Interpretation. SINUS2003-Aufgabenkultur: alltagsnah + kompetenzorientiert. Beziehungshaltigkeit (Freudenthal1973) — mathematische Strukturen IN der echten Welt erfahren, nicht NACHHEINEINANDER.' },
          { nr: 5, titel: 'Grundwert + Prozentsatz — die andere Richtung', ebene: 'symbolisch', kompetenz: 'Argumentieren',
            inhalt: '„Rabatt 10 € entspricht 20 %. Was war der Grundpreis?" Reversibilität als Operationsmerkmal trainieren.',
            begruendung: 'Operatives Prinzip (Wittmann1985) — Reversibilität ist eines der 5 Operationsmerkmale. SuS müssen erkennen: G = P · 100 / p % ist die Umkehrung. Argumentieren als prozessbezogene Kompetenz (KMK2003).' },
          { nr: 6, titel: 'Reale Anwendungen — Praktikum M7c', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Aufgaben aus dem Alltag der SuS: Rabatt-Aktionen, Steuersätze, MwSt., Trinkgeld, Mischungsverhältnisse Saftschorle (KE 5).',
            begruendung: 'LP+M7R KE 5: „Mischungsverhältnisse + problemorientierte Aufgaben aus Alltag und Beruf" + KE 7: „berufsbezogene Aufgaben". Berufsorientierung als Querbezug (LP+ Bayer. MS-Pflicht-Prinzip). SINUS2003 produktives Üben. Alltagsbezug erhöht Motivation + Behaltensleistung (Polya1945, How to Solve It — kontextualisierte Probleme).' },
          { nr: 7, titel: 'Übung + Differenzierung', ebene: 'symbolisch', kompetenz: 'Üben',
            inhalt: 'AB mit 3 Niveaus (basic / mittel / herausfordernd). Differenzierung nach Schwierigkeitsgrad. Hilfekarten verfügbar.',
            begruendung: 'Differenzierung als verbindliches LP+-Prinzip Mittelschule (LP+ Bayern Fachprofil). Drei Niveaustufen reduzieren Über- und Unterforderung. Hilfekarten-System als Scaffolding (WoodBruner1976: vom Lehrer-Support zur Selbst-Hilfe — fading).' },
          { nr: 8, titel: 'Lernzielkontrolle + Reflexion', ebene: 'symbolisch', kompetenz: 'Reflektieren',
            inhalt: 'Schulaufgabe Prozentrechnung. Reflexionsrunde: „Wo nutzt ihr Prozent außerhalb der Schule?"',
            begruendung: 'Veränderte Leistungsmessung (LP+) — Fehlerkultur etablieren. Reflexionsphase macht Bildungsziel-Bezug sichtbar (Freudenthal1973: Mathematik als pädagogische Aufgabe — Sinn der Mathematik im Alltag der Lernenden erkennbar machen).' },
        ],
        bezuege: [
          { didaktik: 'EIS-Prinzip (Bruner1966)', verweis: 'Komplette Sequenz folgt der EIS-Treppe — vom 100er-Feld (enaktiv UE1) bis zur Formel (symbolisch UE5+). Drei Repräsentationsebenen pro Begriff, nicht pro Klassenstufe.' },
          { didaktik: 'Spiralprinzip (Bruner1966)', verweis: 'M6 Brüche → M7R Prozent → M8 Zins → M9R exponentielles Wachstum. Vier Stufen derselben Anteils-/Verhältnis-Logik in zunehmender Abstraktion (Bruner: „spiral curriculum").' },
          { didaktik: 'Operatives Prinzip (Wittmann1985)', verweis: 'UE 5 Reversibilität (Grundwert-Bestimmung als Umkehr-Operation). UE 2 Darstellungs-Wechsel als Operation. Wittmann JMD 6 (1985): Mathematische Begriffe entstehen durch geistige Operationen, deren Wirkung untersucht wird.' },
          { didaktik: 'Modellieren (BlumLeiss2005)', verweis: 'UE 4 + 6: alltagsnahe Real-Situationen → mathematisches Modell → Lösung → Interpretation (Modellierungskreislauf 5 Schritte: Konstruieren · Vereinfachen · Mathematisieren · Mathem. Arbeiten · Interpretieren · Validieren).' },
          { didaktik: 'Beziehungshaltigkeit (Freudenthal1973)', verweis: 'Mathematik wird AUS der Lebenswelt entwickelt, nicht NACHTRÄGLICH angewendet. UE 1: 100er-Feld + UE 6: Trinkgeld-Aufgaben verkörpern dieses Prinzip.' },
          { didaktik: 'Conceptual Field (Vergnaud1990)', verweis: 'Prozent gehört zum Begriffsfeld „proportionale Strukturen" (champ multiplicatif) — verbunden mit Brüchen, Verhältnissen, linearen Funktionen. Sequenz aktiviert diese Konzeptfeld-Verbindungen über Darstellungswechsel UE 2 + 3.' },
          { didaktik: 'Differenzierung 3-Niveau', verweis: 'UE 7: AB-Differenzierung als verbindliches LP+-Prinzip Mittelschule. Niveau-Stufen entsprechen den AFB-Stufen (KMK2003: Reproduktion · Anwendung · Transfer).' },
          { didaktik: 'Eigene Praxis (M7c SJ 25/26)', verweis: 'Diese Sequenz wurde 3 UEs real getestet (Goldcluster). Seminarübung Würzburg Nov 2025 Beispiel-Sequenz Prozent v2/v3 als didaktische Vorlage.' },
        ],
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
            begruendung: 'Ikonische Stufe (Bruner1966). Operatives Prinzip (Wittmann1985): die Operation „Wert eintragen + verbinden" zeigt die proportionale Struktur. Vorbereitung Spirale → M8R lineare Funktionen, M9R quadratische Funktionen.' },
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
          { didaktik: 'EIS-Prinzip (Bruner1966)', verweis: 'Je-desto-Sätze (sprachlich-enaktiv) → Wertetabelle + Graph (ikonisch) → Dreisatz-Notation (symbolisch).' },
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
            begruendung: 'Enaktive Stufe (Bruner1966). Beziehungshaltigkeit (Freudenthal1973): mathematischer Begriff entsteht aus realer Erfahrung. Modellierungs-Anker (BlumLeiss2005) — die Sequenz beginnt mit einer authentischen Modellierungs-Situation, nicht mit der abstrakten Funktion.' },
          { nr: 2, titel: 'Wertetabelle → Diagramm', ebene: 'enaktiv→ikonisch', kompetenz: 'Darstellen',
            inhalt: 'Werte aus Tabelle in Koordinatensystem übertragen. Punkt-Plot. Auffallend: alle Punkte liegen auf einer Linie.',
            begruendung: 'Darstellungs-Wechsel als prozessbezogene Kompetenz (KMK2003). Ikonische Stufe (Bruner1966) — das Diagramm IST das Bild der Funktion. Sprachsensibler MU: die Linie als „die Funktion" benennen.' },
          { nr: 3, titel: 'Steigung als Verhältnis', ebene: 'ikonisch', kompetenz: 'Begreifen',
            inhalt: 'Steigungsdreieck am Graphen einzeichnen: m = Δy/Δx. Mehrere Funktionen vergleichen — welche steigt stärker? Steile vs. flache Geraden visuell und numerisch.',
            begruendung: 'Operatives Prinzip (Wittmann1985): Steigung als OPERATION (Δy pro Δx). Reversibilität: aus m und einem Punkt die Funktion rekonstruieren. Spiral-Anschluss zu M7R-Proportionalität (m als Proportionalitätsfaktor).' },
          { nr: 4, titel: 'y-Achsen-Abschnitt', ebene: 'ikonisch→symbolisch', kompetenz: 'Argumentieren',
            inhalt: 'Was bedeutet b? Was passiert, wenn die Linie nicht im Ursprung startet? Real-Bezug: Anfangsstand der Kerze, Grundgebühr beim Tarif.',
            begruendung: 'Argumentieren (KMK2003). Mehrperspektivität: b als algebraischer Parameter + als realer Anfangswert. Hier wird der wichtige Unterschied „proportional vs. linear" sichtbar (Spiral-Anker zu M7R Proportionalitäts-Sequenz, UE 4).' },
          { nr: 5, titel: 'Funktionsgleichung y = m·x + b', ebene: 'symbolisch', kompetenz: 'Modellieren',
            inhalt: 'Formale Notation: y = m · x + b. Aus 2 Punkten Funktion bestimmen. Praxis-Übung an gegebenen Tabellen.',
            begruendung: 'Symbolische Stufe (Bruner1966) — Notation als Verdichtung der grafischen Erkenntnis. Komprimierung des Verständnisses in einen Term. KMK2003 prozessbezogene Kompetenz „symbolisch-formal-technische Elemente verwenden".' },
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
          { didaktik: 'EIS-Prinzip (Bruner1966)', verweis: 'Sequenz folgt der EIS-Treppe: Experiment (UE1) → Diagramm (UE2-4) → Formel (UE5-6).' },
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
