// GB-Matrix WiB (Wirtschaft und Beruf) MS Bayern · LP+-konform · zitierfähig · v3
//
// ARCHITEKTUR
// ────────────────────────────────────────────────────────────────────────
// WiB folgt NICHT der GPG-Lernbereich-Logik, sondern dem WiB-eigenen
// Kompetenzstrukturmodell (LP+ Bayern Fachprofil WiB):
//   · 5 GEGENSTANDSBEREICHE (Arbeit · Berufsorientierung · Wirtschaft · Technik · Recht)
//   · 4 PROZESSBEZOGENE KOMPETENZEN (Analysieren · Kommunizieren · Beurteilen · Handeln)
//   · 4 PERSPEKTIVEN/ROLLEN (Konsumentinnen und Konsumenten · Arbeitnehmerinnen und
//       Arbeitnehmer · Unternehmerinnen und Unternehmer · Staatsbürgerinnen und Staatsbürger)
//     — Die ergänzte Rolle Berufswähler:in stammt aus Köck (2021) und ist NICHT
//       Teil der LP+-Diktion.
//   · 6 LERNBEREICHE pro Jgst = 5 GB + LB6 Projekt (übergreifend)
//
// MATRIX-LOGIK
//   · Spalten = 5 Gegenstandsbereiche + Projekt-Spalte (LB6)
//   · Zeilen  = Jgst 5, 6, 7, 8, 9 (Regelklasse + M-Zug-Differenzierung in den
//               Zellen ausgewiesen wo relevant)
//
// PHASEN-STANDARD (Primärquelle: Bausteinskript Moritz-Steigerwald, Unterfranken)
//   · Baustein GB »Planung von Unterrichtseinheiten im Fach Wirtschaft und
//     Beruf« von Nadine Moritz-Steigerwald, SRin (AG der MS-Seminarleiter:innen
//     Unterfranken). Verbindliche Diktion für Bayern-Unterfranken-MS-LAA.
//   · 13-Phasen-Strukturmodell (Moritz-Steigerwald, Kap. 4):
//     1.  Hinführung / Vorwissensaktivierung
//     2.  Problemstufe
//     3.  Problemformulierung / Zielangabe
//     4.  Vermutungen
//     5.  Lösungsplanung / Teilintentionen
//     6.  Lösung (HAUPTPHASE)
//     7.  Präsentation der Ergebnisse
//     8.  Problembeurteilung / Erkenntnisstufe
//     9.  Wertungsstufe
//     10. Gesamtzusammenfassung
//     11. Überprüfen der Vermutungen
//     12. Transfer
//     13. Sicherung
//   · Ergänzende fachdidaktische Bezüge (Sekundärliteratur · keine Quellen-Ersetzung):
//     Köck (2021) Methoden als Kompetenzen · Roth (1957) 6 Lernstufen ·
//     Meyer (2008) Drei-Phasen-Grundrhythmus · Frey Projektmethode ·
//     KMK Vollständige Handlung.
//
// QUELLEN-STATUS pro Zelle
//   · verbatim   — LP+-Bayern Fachprofil WiB lokal vorhanden
//   · sekundaer  — KMK/WiB-Sekundärquelle (Anleitungen, BUV-Templates)
//   · ausstehend — LP+-Quelle für diese Jgst noch nicht eingelesen
//
// PILOT-SEQUENZ: GB Berufsorientierung Jgst. 8 · »Anforderungsprofile analysieren«
//   · 8-UE-Sequenz im 13-Phasen-Standard (Moritz-Steigerwald Bausteinskript)
//   · BUV-Schwerpunktstunde-Kandidat: UE 5 (Anforderungsprofil-Vergleich mit Stärkenprofil)
//   · Personifikation: Identifikationsfigur »Lena« (Wunschberuf Fachverkäuferin Bäckerei)
//
// QUELLEN (fachdidaktische Standards)
//   · Moritz-Steigerwald, Nadine, SRin: Baustein GB »Planung von Unterrichtseinheiten
//     im Fach Wirtschaft und Beruf«. AG der MS-Seminarleiter:innen Unterfranken.
//     Lokal: /Repsitory Unterrichtsmaterial/WiB Ressourcen/WiB_BUV_Entwicklung/
//     WiB GB Plaung von Unterrichtseinheiten im Fach Wirtschaft und Beruf.pdf
//   · LP+ Bayern Fachprofil WiB · /Repsitory Unterrichtsmaterial/WiB Ressourcen/LehrplanPLUS/
//   · Köck, Michael (2021): »Methoden als Kompetenzen — Kompetenzorientierung im Fach
//     Wirtschaft und Beruf«, in: Dörfler/Kofler/Firmkäs (Hrsg.): Lehren und Lernen in
//     der bayerischen Mittelschule 7-10. Wolters Kluwer. ISBN 978-3-556-07354-4.
//   · Roth, Heinrich (1957/1963): Pädagogische Psychologie des Lehrens und Lernens
//     — 6 Lernstufen (Motivation · Schwierigkeiten · Lösung · Tun · Behalten/Üben ·
//     Bereitstellen/Übertragen).
//   · Meyer, Hilbert (2008): Unterrichtsmethoden II. Cornelsen — Drei-Phasen-
//     Grundrhythmus (Einstieg · Erarbeitung · Ergebnissicherung).
//   · QM_WiB_Unterrichtsqualitaet_Evaluationsrahmen.md (Audit-Dimensionen A-G)
//   · Leitfaden_Methoden_Gegenstandsbereiche.md (Methodenmatrix 5 GB)
//   · Lernziele_WiB_Leitfaden.md (Mager-Schema)

window.MATRIX = {
  fach: 'D Wirtschaft und Beruf',
  fachKuerzel: 'WiB',
  schulart: 'Mittelschule Bayern · Leitfach Berufsorientierung',

  meta: {
    version: 'v3 · 2026-05-19 · 13-Phasen-Strukturmodell (Moritz-Steigerwald · Bausteinskript GB WiB · AG MS-Seminarleiter:innen Unterfranken)',
    spaltenLogik: 'Fünf Gegenstandsbereiche (Arbeit · Berufsorientierung · Wirtschaft · Technik · Recht) gemaess LP+ Bayern Fachprofil WiB + LB6 Projekt als übergreifender Lernbereich. NICHT GPG-Lernbereich-Logik.',
    quellenLogik: 'verbatim für LP+-Fachprofil WiB (lokal vorhanden). sekundaer für jgst-spezifische KEs (Anleitungen + QM-Rahmen). ausstehend wo lokale LP+-Jgst-PDFs noch nicht eingelesen.',
    pilotSequenz: 'GB Berufsorientierung · Jgst. 8 · »Anforderungsprofile analysieren« · 8 UEs im 13-Phasen-Standard (Moritz-Steigerwald) · Personifikation Lena',
    fachdidaktikStandard: 'Primärquelle: Bausteinskript Moritz-Steigerwald (13 Phasen + 6 Qualitätskriterien). Ergänzend: Köck (2021) · Roth (1957) · Meyer (2008) · QM-Rahmen A-G · Methodenmatrix 5 GB · Mager-3-K-Lernziele · 4-Spuren-Differenzierung.',
  },

  jgst: [
    { id: 'J5', label: 'Jgst. 5' },
    { id: 'J6', label: 'Jgst. 6' },
    { id: 'J7', label: 'Jgst. 7' },
    { id: 'J8', label: 'Jgst. 8' },
    { id: 'J9', label: 'Jgst. 9' },
  ],

  // Gegenstandsbereiche LP+ Bayern WiB (ausformuliert · id nur als Cell-Key) + Projekt
  lernbereiche: [
    { id: 'GB1', titel: 'Arbeit',              kurz: 'Arbeit' },
    { id: 'GB2', titel: 'Berufsorientierung',  kurz: 'BO' },
    { id: 'GB3', titel: 'Wirtschaft',          kurz: 'Wirtschaft' },
    { id: 'GB4', titel: 'Technik',             kurz: 'Technik' },
    { id: 'GB5', titel: 'Recht',               kurz: 'Recht' },
    { id: 'LB6', titel: 'Projekt (übergreifend)', kurz: 'Projekt' },
  ],

  // Prozessbezogene Kompetenzen LP+ Bayern WiB (ohne PK-Codes — LP+ kennt keine!)
  prozesskompetenzen: [
    { label: 'Analysieren',   kurz: 'Erfassen + Strukturieren + Systematisieren + ganzheitliches Denken' },
    { label: 'Kommunizieren', kurz: 'Adressatenbezogen + Fachsprache + Methoden/Medien + Präsentation' },
    { label: 'Beurteilen',    kurz: 'Reflektion + Bewertung + ökon/ökol/sozial/ethisch + persönliche Reflexion' },
    { label: 'Handeln',       kurz: 'Verstehen + Beurteilen + nachhaltige Entscheidung + aktive Mitgestaltung' },
  ],

  // Perspektiven/Rollen LP+ Bayern WiB (ausformuliert · ohne P-Codes)
  // Die ergänzte Rolle Berufswähler:in stammt aus Köck (2021) und ist NICHT LP+.
  perspektiven: [
    { label: 'Konsumentinnen und Konsumenten' },
    { label: 'Arbeitnehmerinnen und Arbeitnehmer' },
    { label: 'Unternehmerinnen und Unternehmer' },
    { label: 'Staatsbürgerinnen und Staatsbürger' },
    { label: 'Berufswähler:in (ergänzte Rolle nach Köck 2021 · nicht LP+)' },
  ],

  cells: {
    // ─── J5 ─────────────────────────────────────────────────────────────
    'J5_GB1': { ke_anzahl: 2, jgst: 'J5', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB1-01', thema: 'Arbeit in unterschiedlichen Lebensbereichen wahrnehmen',
          ke_wortlaut: 'beschreiben Arbeit in unterschiedlichen Lebensbereichen (Haushalt · Beruf · Ehrenamt) und unterscheiden diese nach Sinn und Form.',
          ke_wortlaut_quelle: 'WiB-Anleitungen Jgst-Progression · sekundär aus LP+ Fachprofil',
          inhalte_lp: ['Formen von Arbeit · materielle Hausarbeit · Erziehungsarbeit · Pflegearbeit · Beziehungsarbeit · Erwerbsarbeit'],
          fundort: 'WiB-Anleitungen Jgst. 5 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Arbeitsformen-Plakat (4 UEs · Vorerfahrung-Aktivierung J5)',
          ues: [
            { nr: 1, titel: 'Was ist Arbeit? — Sammlung', inhalt: 'Bildimpuls: 5 Fotos (Bauarbeiter · Mutter im Haushalt · Lehrerin · Krankenpfleger · Ehrenamt Feuerwehr). SuS sortieren spontan + benennen, was sie als Arbeit erkennen. Sprachsensibel: Wortspeicher Arbeit · Aufgabe · Tätigkeit.' },
            { nr: 2, titel: 'Hausarbeit · Erwerbsarbeit · Ehrenamt unterscheiden', inhalt: 'Drei-Spalten-Plakat anlegen. SuS ordnen 15 vorbereitete Tätigkeits-Karten zu (Wäsche waschen · Briefe austragen · Pakete im Sportverein-Stand verkaufen). Diskussion strittiger Fälle.' },
            { nr: 3, titel: 'Familien-Interview als Hausaufgabe', inhalt: "SuS interviewen ein Familienmitglied: 'Welche Arbeit machst du an einem Tag? Wofür wirst du bezahlt, wofür nicht?' Ergebnis in 5 Sätzen in Mappe." },
            { nr: 4, titel: 'Sicherung + Auswertung', inhalt: 'Klassen-Auswertung: was haben wir gemeinsam, was unterscheidet uns? Reflexion: Hausarbeit ist auch Arbeit, auch ohne Lohn. Hefteintrag mit Definition + Beispielen.' }
          ],
          bezuege: [
            { didaktik: 'Beziehungshaltigkeit (Freudenthal)', verweis: 'UE 3 Familieninterview holt WiB aus der Lebenswelt der SuS in den Unterricht.' },
            { didaktik: 'Sprachsensibler Fachunterricht', verweis: 'UE 1 Wortspeicher als Vorlauf zur Begriffsbildung — anschlussfähig bei DaZ-SuS.' },
            { didaktik: '13-Phasen-Strukturmodell (Moritz-Steigerwald)', verweis: 'UE 1 = Hinführung + Problemstufe · UE 2 = Lösungsphase · UE 4 = Sicherung.' }
          ]
        },
        { ke_id: 'J5-GB1-02', thema: 'Eigene Arbeitserfahrungen reflektieren',
          ke_wortlaut: 'reflektieren eigene Arbeitserfahrungen in Familie und Schule und bewerten deren Sinn.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Mitarbeit im Haushalt · Klassendienste · Schülerprojekte'],
          fundort: 'WiB-Anleitungen Jgst. 5' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Klassendienst-Reflexion (3 UEs · Selbstreflexion J5)',
          ues: [
            { nr: 1, titel: 'Klassendienst-Tagebuch', inhalt: 'SuS führen 1 Woche lang einen Klassendienst aus (Tafel · Mülldienst · Materialwart). Jeden Tag 3 Sätze ins Tagebuch: was habe ich gemacht, wie ist es mir dabei gegangen.' },
            { nr: 2, titel: 'Auswertung im Sitzkreis', inhalt: 'Reflexionsrunde: Was war leicht/schwer? Wer hat mich gebraucht? Was hätte ich besser machen können? Satzanfänge an der Tafel (Mir fiel leicht … / Schwer war für mich …).' },
            { nr: 3, titel: 'Mein Klassenbeitrag · Sicherung', inhalt: 'Jede:r SuS formuliert in 3 Sätzen: Mein wertvollster Klassenbeitrag war … · Das nehme ich mir für nächste Woche vor … . Im Berufswahlpass abgeheftet (Erstbefüllung).' }
          ],
          bezuege: [
            { didaktik: 'Selbstwirksamkeit (Bandura)', verweis: 'Klassendienst als selbstwirksame Erfahrung — sehr früh in der Berufsorientierungs-Spirale.' },
            { didaktik: 'Roth 6 Lernstufen', verweis: 'UE 1 Motivation+Tun · UE 2 Behalten · UE 3 Bereitstellen für späteren Transfer.' },
            { didaktik: 'Berufswahlpass (KMK 2008)', verweis: 'UE 3 Erstbefüllung als Auftakt der portfolio-gestützten Berufsorientierung.' }
          ]
        },
      ],
    },
    'J5_GB2': { ke_anzahl: 1, jgst: 'J5', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB2-01', thema: 'Berufe im Lebensumfeld kennenlernen',
          ke_wortlaut: 'erkunden Berufe im eigenen Lebensumfeld (Eltern · Verwandte · Nachbarn) und beschreiben deren Tätigkeiten.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Berufsporträts · Erstaktivierung Berufswahlpass-Vorstufe'],
          fundort: 'WiB-Anleitungen Jgst. 5' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Berufekartei Lebensumfeld (4 UEs · Erstaktivierung BO J5)',
          ues: [
            { nr: 1, titel: 'Berufe-Bingo im Sitzkreis', inhalt: 'Spielimpuls: SuS nennen reihum einen Beruf, den sie kennen — keine Wiederholung erlaubt. An die Tafel: 25-30 Berufe. Sammlung als Klassenleistung.' },
            { nr: 2, titel: 'Berufeporträt Familie', inhalt: 'Hausaufgabe: Steckbrief 1 Person aus dem Umfeld (Mutter · Vater · Onkel · Nachbar). Fragen: Was machst du? Was gefällt dir? Was ist anstrengend? Foto oder Zeichnung.' },
            { nr: 3, titel: 'Vorstellung in Kleingruppen', inhalt: 'Je 4 SuS · 3 Min pro Steckbrief. Plakat-Sammlung der ganzen Klasse: 25 echte Berufeporträts mit Foto/Zeichnung + 3-Punkte-Beschreibung.' },
            { nr: 4, titel: 'Berufekartei anlegen + Sicherung', inhalt: 'Karteikarten DIN-A6 mit Vorlage: Beruf · Tätigkeit · 1 Foto · 1 Satz von mir. Klassen-Karteikasten wird über alle 5 Jahrgangsstufen weitergeführt.' }
          ],
          bezuege: [
            { didaktik: 'Realbegegnung (LP+ WiB-Methode)', verweis: 'UE 2 Familien-Interview = niederschwelligste Form der Realbegegnung — vor Erkundung + Praktikum.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'Berufekartei wächst über alle 5 Jgst — Anker für spätere Berufswahl-Auseinandersetzung.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Lösungsplanung+Lösung (HA) · UE 3 Präsentation · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J5_GB3': { ke_anzahl: 1, jgst: 'J5', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB3-01', thema: 'Konsumverhalten reflektieren',
          ke_wortlaut: 'reflektieren ihr eigenes Konsumverhalten und unterscheiden Bedürfnisse von Wünschen.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Bedürfnishierarchie · Taschengeld · Werbeeinflüsse'],
          fundort: 'WiB-Anleitungen Jgst. 5' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Bedürfnis vs. Wunsch (4 UEs · Konsumreflexion J5)',
          ues: [
            { nr: 1, titel: 'Wunschzettel-Analyse', inhalt: 'Stiller Impuls: SuS schreiben anonym 5 Wünsche auf einen Zettel. Sortierung in 3 Spalten an der Tafel: brauche ich · hätte ich gern · ist mir egal.' },
            { nr: 2, titel: 'Bedürfnishierarchie kindgerecht', inhalt: 'Vereinfachtes Maslow-Modell: Essen+Trinken · Schlaf · Schutz/Wohnung · Gemeinschaft · Lernen · Wünsche+Träume. Karten-Pyramide legen.' },
            { nr: 3, titel: 'Taschengeld-Tagebuch (1 Woche)', inhalt: 'Hausaufgabe: jede Ausgabe notieren mit Kategorie (Essen · Spaß · Geschenk · Sparen). Auswertung mit Strichliste.' },
            { nr: 4, titel: 'Werbe-Aufklärung + Sicherung', inhalt: 'Kurz-Werbung (max. 30 Sek) analysieren: Was verspricht sie? Brauche ich das? Werbe-Tricks erkennen — Verbraucherbildungs-Anker.' }
          ],
          bezuege: [
            { didaktik: 'Verbraucherbildung (LP+ Querschnitt)', verweis: 'UE 4 als erste Stufe der Verbraucherbildung. Spiral-Anker zu J8-GB5 Verbraucherrechte.' },
            { didaktik: 'Konsumenten-Rolle (LP+ WiB)', verweis: 'Sequenz aktiviert die Konsumenten-Rolle erstmalig + lebensweltnah.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Erkenntnis · UE 3 Transfer (HA) · UE 4 Wertung+Sicherung.' }
          ]
        },
      ],
    },
    'J5_GB4': { ke_anzahl: 1, jgst: 'J5', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB4-01', thema: 'Technische Geräte im Alltag betrachten',
          ke_wortlaut: 'beschreiben technische Geräte in Schule und Haushalt nach ihrer Funktion und benennen Motive ihrer Erfindung.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 5',
          inhalte_lp: ['Erfindung · Geräte in Schule/Haushalt · Objektbetrachtung · Motive und Grenzen'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 278 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Objektbetrachtung Wasserkocher (3 UEs · Technik-Einstieg J5)',
          ues: [
            { nr: 1, titel: 'Was tut ein Wasserkocher?', inhalt: 'Realobjekt im Klassenzimmer. SuS beschreiben Aufbau (Kanne · Deckel · Kabel · Schalter · Heizspirale). Funktion: Wasser erhitzen — wozu? Tee · Suppe · Reinigen.' },
            { nr: 2, titel: 'Erfindungs-Geschichte', inhalt: 'Kurzimpuls: Vor 100 Jahren — wie hat man Wasser erhitzt? Holzofen · Gasflamme · Topf auf Herd. Vorteil des Wasserkochers? Schneller · sauberer · ungefährlicher.' },
            { nr: 3, titel: 'Eigenes Gerät vorstellen + Sicherung', inhalt: 'Jede:r SuS stellt 1 technisches Gerät aus dem Haushalt vor (1 Min): Was macht es? Wozu? Wie hat man das früher gemacht? Hefteintrag: 5 Geräte mit Funktion + früher.' }
          ],
          bezuege: [
            { didaktik: 'Objektbetrachtung (WiB-Methode Gegenstandsbereich Technik)', verweis: 'Methodisch standardisiert: Aufbau · Funktion · Wozu · Wie früher · Was wäre, wenn nicht?' },
            { didaktik: 'Beziehungshaltigkeit (Freudenthal)', verweis: 'UE 1 startet am realen Gerät im Klassenraum.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung+Problemstufe · UE 2 Lösung · UE 3 Transfer+Sicherung.' }
          ]
        },
      ],
    },
    'J5_GB5': { ke_anzahl: 1, jgst: 'J5', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-GB5-01', thema: 'Schul- und Hausordnung als Regelsystem',
          ke_wortlaut: 'verstehen Schul- und Hausordnung als Regelsystem und begründen die Notwendigkeit gemeinsamer Regeln.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Schulordnung · Klassenregeln · Kinderrechte (Anbahnung)'],
          fundort: 'WiB-Anleitungen Jgst. 5' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Klassenregeln demokratisch (4 UEs · Recht J5)',
          ues: [
            { nr: 1, titel: 'Wozu Regeln?', inhalt: 'Gedankenexperiment: Stell dir vor, in unserer Klasse gäbe es keine Regeln. Was würde passieren? SuS sammeln Konsequenzen in Kleingruppen. Plenum: warum braucht eine Gemeinschaft Regeln?' },
            { nr: 2, titel: 'Vorhandene Klassenregeln durchgehen', inhalt: 'Klassenregelplakat (existiert schon) wird Punkt für Punkt durchgegangen. Welche kennen SuS? Welche nicht? Welche werden eingehalten, welche nicht?' },
            { nr: 3, titel: 'Demokratische Regel-Anpassung', inhalt: 'Vorschläge: Welche Regel würden wir gerne ändern, ergänzen, streichen? Diskussion + Klassenwahl (Mehrheitsentscheid). Neue Regel wird ausgehängt.' },
            { nr: 4, titel: 'Sicherung + Reflexion Demokratie', inhalt: 'Hefteintrag: Wir haben eine Regel selbst beschlossen — das nennt man Demokratie. Spiralanker zu GPG-Demokratielernen.' }
          ],
          bezuege: [
            { didaktik: 'Realhandeln (Petrik, GPG-Didaktik)', verweis: 'UE 3 demokratische Entscheidung in der Klasse = Realhandeln, nicht Simulation.' },
            { didaktik: 'Beutelsbacher Konsens (Kontroversität)', verweis: 'UE 3 wahrt Kontroversitätsgebot: SuS dürfen unterschiedliche Positionen vertreten.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Problemstufe · UE 2 Vermutungen · UE 3 Lösung+Wertung · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J5_LB6': { ke_anzahl: 1, jgst: 'J5', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J5-LB6-01', thema: 'Projektorientiertes Vorgehen — behutsam mit starker L-Steuerung',
          ke_wortlaut: 'beteiligen sich an einem kleinen Klassenprojekt (z.B. Klassenzimmer-Gestaltung · Schulfest-Beitrag) und benennen Projektphasen.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau des Fachlehrplans',
          inhalte_lp: ['Projektinitiative · Projektplanung · Durchführung · Präsentation · Reflexion (mit hoher L-Steuerung)'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 18' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Klassenfest organisieren (5 UEs · erstes Projekt J5)',
          ues: [
            { nr: 1, titel: 'Wir planen ein Klassenfest', inhalt: 'Brainstorming: Was wollen wir feiern? Wann? Wer kommt? Klassen-Mind-Map. Lehrkraft sammelt + ordnet.' },
            { nr: 2, titel: 'Aufgaben verteilen', inhalt: 'Vier Teams: Essen · Deko · Programm · Einladungen. Jedes Team plant für sich: Was brauchen wir? Wer macht was? Wann?' },
            { nr: 3, titel: 'Vorbereitung in den Teams', inhalt: 'Materialbeschaffung, Einladungen schreiben, Spiele aussuchen, Deko basteln. Lehrkraft als Berater. Zwischenstand-Treffen.' },
            { nr: 4, titel: 'Das Fest', inhalt: 'Durchführung. SuS sind Gastgeber. Lehrkraft im Hintergrund.' },
            { nr: 5, titel: 'Reflexion + Sicherung', inhalt: 'Was hat funktioniert? Was nicht? Was nehmen wir mit für das nächste Projekt? Hefteintrag mit 3 Stichpunkten pro Person.' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung 6 Schritte (Hacker/Aebli)', verweis: 'Klassenfest = idealtypisches erstes Projekt mit allen 6 Schritten: Informieren · Planen · Entscheiden · Ausführen · Kontrollieren · Bewerten.' },
            { didaktik: 'Projektmethode (Frey 1982)', verweis: 'Niederschwelliges erstes Projekt, anschlussfähig für höhere Jgst (Schülerfirma J7, Praktikum J8/9).' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Planung · UE 3 Lösung · UE 4 Präsentation · UE 5 Wertung+Sicherung+Transfer.' }
          ]
        },
      ],
    },

    // ─── J6 ─────────────────────────────────────────────────────────────
    'J6_GB1': { ke_anzahl: 1, jgst: 'J6', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB1-01', thema: 'Vielfalt von Arbeit untersuchen',
          ke_wortlaut: 'untersuchen die Vielfalt von Arbeit in der Gesellschaft und benennen Unterschiede in Form, Sinn und Wertschätzung.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Hauptberufe · Nebentätigkeiten · ehrenamtliche Arbeit · gesellschaftliche Wertschätzung'],
          fundort: 'WiB-Anleitungen Jgst. 6' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Arbeitsmittel-Rallye (4 UEs · Arbeit J6)',
          ues: [
            { nr: 1, titel: 'Was ist ein Arbeitsmittel?', inhalt: 'Realobjekte mitbringen: Hammer · Kuli · Mikroskop · Taschenrechner · Bohrmaschine. SuS ordnen: Was nutzt man wofür? Welcher Beruf?' },
            { nr: 2, titel: 'Werkzeuge in 5 Berufen', inhalt: 'Plakate: Frisör · Maurer · Köchin · Mechaniker · Programmiererin. Welches Arbeitsmittel passt zu welchem Beruf? Bildkarten zuordnen.' },
            { nr: 3, titel: 'Arbeitsmittel-Geschichte', inhalt: 'Wie war das früher? Schreibmaschine vs Computer · Pferd vs Bagger · Brief vs E-Mail. Wandel der Arbeitsmittel.' },
            { nr: 4, titel: 'Sicherung + Hefteintrag', inhalt: 'Tabelle: 10 Arbeitsmittel · Beruf · Funktion. Reflexion: Arbeitsmittel verändern sich — Berufe auch.' }
          ],
          bezuege: [
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'J5 Berufeporträts → J6 Arbeitsmittel-Vertiefung → J7+ Berufsfeld-Erkundung.' },
            { didaktik: 'Objektbetrachtung-Methode', verweis: 'UE 1+2 nutzen Realobjekte als Lern-Anker.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung+Problem · UE 2-3 Lösung · UE 4 Sicherung+Transfer.' }
          ]
        },
      ],
    },
    'J6_GB2': { ke_anzahl: 1, jgst: 'J6', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB2-01', thema: 'Eigene Stärken und Interessen erkunden',
          ke_wortlaut: 'erkunden ihre eigenen Stärken und Interessen und ordnen ihnen Tätigkeitsbereiche zu.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Selbstbild-Fremdbild-Vergleich · Interessen-Inventur · erste Berufsfelder zuordnen'],
          fundort: 'WiB-Anleitungen Jgst. 6' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Berufsfeld-Erkundung erste (5 UEs · BO J6)',
          ues: [
            { nr: 1, titel: 'Was ist ein Berufsfeld?', inhalt: 'Klärung: Berufsfeld vs. Einzelberuf (z.B. Gesundheit → Krankenpfleger · Arzt · MFA · Apothekerin · Physiotherapeut). 5 Berufsfelder vorstellen.' },
            { nr: 2, titel: 'Berufsfeld-Wahl in Kleingruppen', inhalt: 'Jede 3er-Gruppe wählt 1 Berufsfeld. Aufgabe: 4 Berufe darin finden + recherchieren (BERUFENET-Bilder · Berufebuch).' },
            { nr: 3, titel: 'Berufefeld-Plakat', inhalt: 'Gruppen erstellen DIN-A2-Plakat: Berufsfeld-Name · 4 Berufe · je 1 Foto · je 1 Tätigkeit. Sehr visuell.' },
            { nr: 4, titel: 'Galerie-Rundgang', inhalt: 'Plakate an Wände. Galerie-Rundgang mit Beobachtungsbogen: Welches Berufsfeld interessiert mich? Warum?' },
            { nr: 5, titel: 'Sicherung + Berufswahlpass', inhalt: 'Eintrag in den Berufswahlpass: 2 Berufsfelder, die mich interessieren + Begründung. Spiralanker zur Stärken-Inventur in J7.' }
          ],
          bezuege: [
            { didaktik: 'Berufswahlpass (KMK 2008)', verweis: 'UE 5 Erst-Eintrag — Portfolioarbeit als Spiral-Anker.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'J6 erste Berufsfeld-Erkundung → J7 Stärken-Inventur → J8 Anforderungsprofile → J9 Bewerbung.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2-3 Lösung · UE 4 Präsentation · UE 5 Sicherung+Transfer.' }
          ]
        },
      ],
    },
    'J6_GB3': { ke_anzahl: 1, jgst: 'J6', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB3-01', thema: 'Geldkreislauf in der Familie',
          ke_wortlaut: 'beschreiben den Geldkreislauf in der Familie und unterscheiden Einnahmen von Ausgaben.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Haushaltsplan-Vorstufe · Einnahmen · Ausgaben · Sparen'],
          fundort: 'WiB-Anleitungen Jgst. 6' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Anbieter und Nachfrager (4 UEs · Markt-Einstieg J6)',
          ues: [
            { nr: 1, titel: 'Klassen-Tauschmarkt simulieren', inhalt: 'SuS bringen 1 Tausch-Objekt mit (Sticker · Stift). Tauschbörse 10 Min frei. Reflexion: Wer hat was bekommen? War es ein guter Tausch?' },
            { nr: 2, titel: 'Anbieter + Nachfrager als Rollen', inhalt: 'Begriffsklärung: jede:r war beides. Übung mit Karten: Wer bietet was an, wer fragt was nach — Bäcker · Schüler · Bäuerin · Käufer.' },
            { nr: 3, titel: 'Preis als Tausch-Verhältnis', inhalt: 'Wie viele Sticker = 1 Stift? Übersetzung in Geld: Preis als Tausch-Maßstab. Klassenmarkt mit Spielgeld.' },
            { nr: 4, titel: 'Sicherung + Beruf-Bezug', inhalt: 'Hefteintrag: Anbieter-Nachfrager-Modell. Bezug: Berufe sind Anbieter von Arbeitskraft, Unternehmen sind Nachfrager.' }
          ],
          bezuege: [
            { didaktik: 'Beziehungshaltigkeit (Freudenthal)', verweis: 'UE 1 echter Klassen-Tauschmarkt als enaktiver Einstieg.' },
            { didaktik: 'Konsumenten-Rolle + Unternehmer-Rolle', verweis: 'Sequenz aktiviert zwei LP+-Rollen gleichzeitig + spiralig.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2-3 Erkenntnis · UE 4 Sicherung+Transfer.' }
          ]
        },
      ],
    },
    'J6_GB4': { ke_anzahl: 1, jgst: 'J6', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB4-01', thema: 'Technikerkundung mit Experteneinsatz',
          ke_wortlaut: 'erkunden technische Geräte und Verfahren mit Expertengesprächen und beschreiben Funktionen sowie Energieaufwand.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 6',
          inhalte_lp: ['Technikerkundung · Expertengespräche · Funktionen · Energieaufwand · technischer Wandel'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 280 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Werkstoff Holz (5 UEs · Technik J6)',
          ues: [
            { nr: 1, titel: 'Holz-Erkundung im Klassenzimmer', inhalt: 'Wo überall ist Holz? Stühle · Tische · Bleistift · Fenster · Tafel. Holzarten unterscheiden: Buche · Eiche · Kiefer (Realstücke betrachten).' },
            { nr: 2, titel: 'Holzbearbeitung Werkstattregeln', inhalt: 'Werkstattraum-Einführung: Sicherheitsregeln · Werkzeug-Vorstellung (Säge · Hammer · Schleifpapier · Bohrer). Erste Übungen: gerade sägen.' },
            { nr: 3, titel: 'Werkstück planen', inhalt: 'Einfaches Werkstück: Schlüsselanhänger aus Holz. Skizze + Maße + Materialliste + Arbeitsplan.' },
            { nr: 4, titel: 'Werkstück fertigen', inhalt: 'Sägen · Schleifen · Bohren · Lackieren. In Gruppen oder Einzel mit Anleitung. Lehrkraft als Sicherheits- + Lernberater.' },
            { nr: 5, titel: 'Bewertung + Sicherung', inhalt: 'Werkstück präsentieren · Selbsteinschätzung Qualität · Lernfortschritt im Werkstücktagebuch eintragen.' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'UE 3-5 zeigen 6 Schritte: Informieren · Planen · Entscheiden · Ausführen · Kontrollieren · Bewerten.' },
            { didaktik: 'Werkstattprinzip (LP+ Technik)', verweis: 'Sicherheitsregeln + Werkzeugkunde in UE 2 als Basisinventar.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Erkenntnis Werkstatt · UE 3 Planung · UE 4 Lösung · UE 5 Bewertung+Sicherung.' }
          ]
        },
      ],
    },
    'J6_GB5': { ke_anzahl: 1, jgst: 'J6', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-GB5-01', thema: 'Kinderrechte und ihre Bedeutung',
          ke_wortlaut: 'kennen wichtige Kinderrechte und begründen ihre Bedeutung für das eigene Leben.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['UN-Kinderrechtskonvention · Schutz · Förderung · Beteiligung'],
          fundort: 'WiB-Anleitungen Jgst. 6' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Kinderrechte UN-Konvention (4 UEs · Recht J6)',
          ues: [
            { nr: 1, titel: 'Was sind Kinderrechte?', inhalt: 'Bildimpuls: Foto Kinder in Schule · Krankenhaus · Spielplatz vs Kinder bei Arbeit (historisch · global). Frage: Was steht Kindern zu?' },
            { nr: 2, titel: 'UN-Kinderrechts-Konvention', inhalt: 'Vereinfachte Fassung der 10 wichtigsten Kinderrechte. SuS lesen + ordnen Bildkarten zu. Diskussion: Welches Recht ist mir besonders wichtig?' },
            { nr: 3, titel: 'Realisierung in Bayern + global', inhalt: 'Wo sind Kinderrechte verwirklicht? Wo nicht? UNICEF-Materialien. Vergleich Bayern · Deutschland · andere Länder.' },
            { nr: 4, titel: 'Sicherung + Handlungs-Auftrag', inhalt: 'Klassenplakat Unsere Kinderrechte. Reflexion: Was kann ICH tun für Kinderrechte? (z.B. UNICEF-Aktion in Schule unterstützen).' }
          ],
          bezuege: [
            { didaktik: 'Realhandlungsorientierung', verweis: 'UE 4 Handlungsauftrag — Politische Bildung als Mündigkeit (Klafki Schlüsselproblem).' },
            { didaktik: 'Beutelsbacher Konsens', verweis: 'UE 3 zeigt Kontroversität auf (verschiedene Realisierungs-Niveaus).' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung+Problem · UE 2 Lösung · UE 3 Wertung · UE 4 Handlung+Sicherung.' }
          ]
        },
      ],
    },
    'J6_LB6': { ke_anzahl: 1, jgst: 'J6', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J6-LB6-01', thema: 'Projektplanung mit L-Steuerung — Übergang zur Selbstständigkeit',
          ke_wortlaut: 'planen und führen ein Projekt unter Anleitung durch und reflektieren ihren Beitrag im Team.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau Fachlehrplan',
          inhalte_lp: ['Projekt-5-Phasen · Aufgabenteilung im Team · Zeitplan · Reflexion'],
          fundort: 'Aufbau-Fachlehrplan-Md' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Schul-Brotbox-Projekt (5 UEs · Projekt J6)',
          ues: [
            { nr: 1, titel: 'Projektidee + Auftrag', inhalt: 'Auftrag: Wir entwerfen eine Brotbox für jüngere Kinder. Zielgruppe + Anforderungen sammeln: leicht · spülmaschinenfest · attraktiv · sicher.' },
            { nr: 2, titel: 'Recherche + Skizze', inhalt: 'Recherche: Welche Brotboxen gibt es? Was ist gut, was schlecht? Erste Skizzen in 2er-Teams.' },
            { nr: 3, titel: 'Modellbau', inhalt: 'Aus Karton + Klebeband Modell anfertigen. Anpassungen nach Test (passt 2 Brote rein? Lässt sich tragen?).' },
            { nr: 4, titel: 'Präsentation + Bewertung', inhalt: 'Jedes Team präsentiert sein Modell der Klasse 5 (Zielgruppe). Feedback einholen. Welches Modell wäre vermarktbar?' },
            { nr: 5, titel: 'Reflexion + Sicherung', inhalt: 'Hefteintrag: 6 Schritte der Vollständigen Handlung. Was haben wir gelernt? Was war anstrengend?' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'Sequenz illustriert alle 6 Schritte ideal.' },
            { didaktik: 'Projektmethode (Frey 1982)', verweis: 'Sehr erprobtes Schul-Projektformat.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung+Problem · UE 2 Planung · UE 3 Lösung · UE 4 Präsentation+Wertung · UE 5 Sicherung.' }
          ]
        },
      ],
    },

    // ─── J7 ─────────────────────────────────────────────────────────────
    'J7_GB1': { ke_anzahl: 2, jgst: 'J7', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB1-01', thema: 'Aufwand und Ertrag von Arbeit analysieren',
          ke_wortlaut: 'analysieren Aufwand und Ertrag verschiedener Arbeitsformen und beurteilen ihre ökonomischen und ökologischen Auswirkungen.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression · sekundär',
          inhalte_lp: ['Aufwand-Ertrag-Verhältnis · ökonomische und ökologische Folgen · technischer Wandel der Arbeitsprozesse'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 282' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Arbeitsteilung in der Pizzaproduktion (4 UEs · Arbeit J7)',
          ues: [
            { nr: 1, titel: 'Selbst eine Pizza machen', inhalt: 'Wir machen eine Pizza in Einzelarbeit (theoretisch). SuS notieren alle 12 Schritte. Reflexion: dauert lang!' },
            { nr: 2, titel: 'Pizza in der Fabrik', inhalt: 'Industrielle Pizza-Produktion: Video oder Bildfolge. Arbeitsteilung sichtbar: Teigling · Sauce · Belag · Verpackung · Tiefkühlung. Jeder macht nur 1 Schritt.' },
            { nr: 3, titel: 'Vor- und Nachteile', inhalt: 'Tabelle: Einzel-Pizza vs. Fabrik-Pizza. Schnell? Lecker? Eintönig? Effizient? Diskussion.' },
            { nr: 4, titel: 'Sicherung Arbeitsteilung', inhalt: 'Begriffs-Klärung: Arbeitsteilung als ökonomisches Prinzip. Smith-Stecknadel-Beispiel als Klassik. Hefteintrag mit Mindmap.' }
          ],
          bezuege: [
            { didaktik: 'Smith (1776) Stecknadel-Manufaktur', verweis: 'Klassisches Beispiel der Arbeitsteilung — bildungstragend.' },
            { didaktik: 'Beziehungshaltigkeit (Freudenthal)', verweis: 'UE 1-2 vom Eigenerleben zur Industrieerfahrung.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Erkenntnis · UE 3 Wertung · UE 4 Sicherung.' }
          ]
        },
        { ke_id: 'J7-GB1-02', thema: 'Arbeit als personale und gesellschaftliche Realität',
          ke_wortlaut: 'beschreiben Arbeit als personale und gesellschaftliche Realität und reflektieren eigene Erfahrungen.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Arbeitsformen · Wertschätzung · Wandel der Arbeitswelt (Anbahnung)'],
          fundort: 'WiB-Anleitungen Jgst. 7' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Arbeit als personale + gesellschaftliche Realitaet (4 UEs · Arbeit J7)',
          ues: [
            { nr: 1, titel: 'Was bedeutet mir meine Arbeit?', inhalt: 'SuS interviewen 2 Erwachsene zu ihrer Arbeit: Was gibt sie dir? Was nimmt sie dir? Stolz · Frust · Sinn · Anerkennung. Sammlung im Plenum.' },
            { nr: 2, titel: 'Sinn und Wert von Arbeit', inhalt: 'Klassen-Diskussion: Warum arbeiten Menschen? Geld · Identitaet · Anerkennung · Sinn · Gemeinschaft. Pyramide nach Wichtigkeit.' },
            { nr: 3, titel: 'Wandel der Arbeitswelt (Anbahnung)', inhalt: 'Vergleich: Eltern · Grosseltern. Was war anders? Was bleibt? Anbahnung J9 Arbeitsmarkt-Wandel.' },
            { nr: 4, titel: 'Sicherung + Selbstreflexion', inhalt: 'Hefteintrag mit Stichpunkten. Reflexion: Welche Bedeutung wird Arbeit fuer mich haben?' }
          ],
          bezuege: [
            { didaktik: 'Arbeitnehmer-Rolle (LP+ WiB)', verweis: 'Personalisiert + reflektiert.' },
            { didaktik: 'Spiralprinzip', verweis: 'J7 personal/gesellschaftlich → J9 Arbeitsmarkt-Wandel.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinfuehrung+Problem · UE 2 Wertung · UE 3 Erkenntnis · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J7_GB2': { ke_anzahl: 2, jgst: 'J7', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB2-01', thema: 'Berufswahlportfolio anlegen',
          ke_wortlaut: 'legen ein Berufswahlportfolio an und dokumentieren erste Erkundungsergebnisse über sich selbst und Berufsfelder.',
          ke_wortlaut_quelle: 'QM-Rahmen Berufsorientierung-Kernkompetenzen Jgst. 7',
          inhalte_lp: ['Berufswahlportfolio · individuelle Sichtweisen von Arbeit und Beruf · berufliche Tätigkeitsbereiche · Informationsbeschaffung'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 302-311' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Erste Stärken-Inventur (5 UEs · BO J7)',
          ues: [
            { nr: 1, titel: 'Was kann ich gut?', inhalt: 'Anonyme Stärken-Sammlung: jede:r schreibt 3 Stärken auf einen Zettel. Klassen-Wortwolke.' },
            { nr: 2, titel: 'Selbstbild vs Fremdbild', inhalt: 'Übung in 3er-Teams: jede:r benennt 3 Stärken einer Mitschülerin. Vergleich mit eigener Liste.' },
            { nr: 3, titel: 'Stärken-Karte mit Beispielen', inhalt: 'Jede:r SuS füllt Stärken-Karte: Stärke · ein konkretes Beispiel · ein Bezug zum Beruf.' },
            { nr: 4, titel: 'Berufe-Anker', inhalt: 'Zu jeder Stärke: welche Berufe brauchen das? Wortspeicher + Beispiele aus der Klasse-J6-Berufekartei.' },
            { nr: 5, titel: 'Berufswahlpass-Eintrag + Sicherung', inhalt: 'Stärken-Profil in Berufswahlpass übertragen. Reflexion: Was nehme ich aus dieser Stunde mit?' }
          ],
          bezuege: [
            { didaktik: 'Berufswahlpass (KMK 2008)', verweis: 'Portfolio-Spiral-Anker.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'J7 Stärken-Inventur ist Vorlauf für J8-GB2-01 Anforderungsprofile (DEM Pilot-Sequenz-Anker).' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2-3 Erkenntnis · UE 4 Transfer · UE 5 Sicherung.' }
          ]
        },
        { ke_id: 'J7-GB2-02', thema: 'Berufsfelder erkunden — erste Betriebserkundung',
          ke_wortlaut: 'erkunden Berufsfelder im Rahmen einer ersten Betriebserkundung und vergleichen sie mit eigenen Vorstellungen.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden-GB · BO',
          inhalte_lp: ['Betriebserkundung · Beobachtungsbogen · Anforderungsprofile (Anbahnung)'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 50' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Erste Betriebserkundung (5 UEs · BO J7)',
          ues: [
            { nr: 1, titel: 'Was ist eine Betriebserkundung?', inhalt: 'Unterschied Erkundung vs Praktikum klaeren. Erwartungen sammeln.' },
            { nr: 2, titel: 'Beobachtungsauftraege formulieren', inhalt: 'Was wollen wir wissen? 5 Forschungsfragen pro Gruppe. Beobachtungsbogen anlegen.' },
            { nr: 3, titel: 'Im Betrieb', inhalt: '2-3-Stunden-Besuch. Strukturierte Beobachtung. Foto-Erlaubnis vorab klaeren.' },
            { nr: 4, titel: 'Auswertung im Plenum', inhalt: 'Plakat-Auswertung pro Gruppe. Vergleich mit Vorerwartungen aus UE 1.' },
            { nr: 5, titel: 'Sicherung + Anschluss J8', inhalt: 'Hefteintrag Betriebserkundung. Spiralanker: in J8 vertiefen wir mit Anforderungsprofilen.' }
          ],
          bezuege: [
            { didaktik: 'Realbegegnung (LP+ WiB-Methode)', verweis: 'Erkundung als Vorstufe zum Praktikum.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'J6 Berufsfelder → J7 Erkundung → J8 Anforderungsprofile + Praktikum.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinfuehrung · UE 2 Planung · UE 3 Loesung · UE 4 Praesentation · UE 5 Sicherung.' }
          ]
        },
      ],
    },
    'J7_GB3': { ke_anzahl: 1, jgst: 'J7', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB3-01', thema: 'Wirtschaftskreislauf — einfache Akteure',
          ke_wortlaut: 'beschreiben den einfachen Wirtschaftskreislauf (Haushalt · Unternehmen) und ordnen ihre eigene Rolle als Konsument zu.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Wirtschaftskreislauf · Akteure · Konsument-Rolle · Werbung kritisch'],
          fundort: 'WiB-Anleitungen Jgst. 7' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Geld im Wirtschaftskreislauf (4 UEs · Wirtschaft J7)',
          ues: [
            { nr: 1, titel: 'Wie kommt das Geld in meine Hosentasche?', inhalt: 'SuS zeichnen ihren persönlichen Geldfluss: Eltern → SuS → Geschäft → Verkäuferin. Erkenntnis: Geld zirkuliert.' },
            { nr: 2, titel: 'Vereinfachter Wirtschaftskreislauf', inhalt: 'Modell: Haushalte · Unternehmen. Pfeile: Arbeit · Geld · Waren · Konsum. Tafelbild durchgehen.' },
            { nr: 3, titel: 'Rollenspiel Marktszene', inhalt: '5 Stationen mit Spielgeld: Bauernhof · Mühle · Bäckerei · Supermarkt · Konsument. SuS wechseln Rollen, Geld fließt im Kreis.' },
            { nr: 4, titel: 'Sicherung Tafelbild', inhalt: 'Hefteintrag Wirtschaftskreislauf-Modell. Reflexion: Wo bin ICH im Kreislauf? (mehrere Rollen!).' }
          ],
          bezuege: [
            { didaktik: 'Modell-Methode (WiB-Methodik GB Wirtschaft)', verweis: 'UE 2 Modell ist klassischer GB-Wirtschaft-Zugang.' },
            { didaktik: 'Konsumenten-/Arbeitnehmer-Rolle', verweis: 'Sequenz aktiviert beide LP+-Rollen kontrastiert.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Lösung · UE 3 Lösung+Handeln · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J7_GB4': { ke_anzahl: 1, jgst: 'J7', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB4-01', thema: 'Vielfalt von Technik im Haushalt analysieren',
          ke_wortlaut: 'analysieren die Vielfalt technischer Geräte im Haushalt und beurteilen ihre ökonomischen und ökologischen Auswirkungen.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 7',
          inhalte_lp: ['Vielfalt Haushalt · Aufwand/Ertrag · ökonomische/ökologische Auswirkungen · technischer Wandel → Arbeitsprozesse + Qualifikation'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 283' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Werkstoff Metall (5 UEs · Technik J7)',
          ues: [
            { nr: 1, titel: 'Metall im Alltag erkunden', inhalt: 'Wo ist überall Metall? Stahl in Brücken · Aluminium in Dosen · Kupfer in Kabeln · Eisen in Schrauben. Eigenschaften-Tabelle.' },
            { nr: 2, titel: 'Werkstattregeln Metallbearbeitung', inhalt: 'Sicherheitsregeln (Schutzbrille · Handschuhe) · Werkzeuge (Feile · Säge · Bohrer für Metall · Schraubstock). Erste Übungen.' },
            { nr: 3, titel: 'Werkstück planen', inhalt: 'Schlüsselanhänger aus Aluminium-Blech. Skizze · Maße · Arbeitsplan.' },
            { nr: 4, titel: 'Werkstück fertigen', inhalt: 'Anreißen · Sägen · Feilen · Bohren · Prägen oder Punzen. Sicherheitskontrollen durch Lehrkraft.' },
            { nr: 5, titel: 'Bewertung + Sicherung', inhalt: 'Selbsteinschätzung Qualität. Vergleich Holz J6 vs. Metall J7. Hefteintrag mit Vor-/Nachteilen.' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'Wieder alle 6 Schritte — spiral-vertiefend zu J6 Holz.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'Werkstoff-Spirale: Holz J6 → Metall J7 → Kunststoff J8 → komplexe Fertigung J9.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'Standard-Verlauf für Technik-Werkstücke.' }
          ]
        },
      ],
    },
    'J7_GB5': { ke_anzahl: 1, jgst: 'J7', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J7-GB5-01', thema: 'Verbraucherrecht — erste Schritte',
          ke_wortlaut: 'kennen grundlegende Verbraucherrechte (Widerrufsrecht · Gewährleistung) und wenden sie auf einfache Alltagsfälle an.',
          ke_wortlaut_quelle: 'WiB-Anleitungen · sekundär',
          inhalte_lp: ['Widerrufsrecht · Gewährleistung · einfache Verbraucher-Fälle'],
          fundort: 'WiB-Anleitungen Jgst. 7' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Jugendarbeitsschutzgesetz (4 UEs · Recht J7)',
          ues: [
            { nr: 1, titel: 'Darf ich arbeiten? Wann? Wie viel?', inhalt: 'Provokationsfrage: SuS schätzen, ab wann/wie lange Jugendliche arbeiten dürfen. Sammlung Schätzungen.' },
            { nr: 2, titel: 'JArbSchG-Eckpunkte', inhalt: 'Vereinfachte Übersicht: Mindestalter 15 · Höchstarbeitszeit 8h · Verbot Nacht/Sonntag · Schutz vor gefährlichen Tätigkeiten. Karten-Übung.' },
            { nr: 3, titel: 'Fallbeispiele beurteilen', inhalt: '5 Fälle (Lina 14 · Tom 15 · Anna 17): Was darf der/die? Was nicht? Begründung mit JArbSchG-Paragraphen.' },
            { nr: 4, titel: 'Sicherung + Berufswahl-Bezug', inhalt: 'Was bedeutet das für mein Praktikum? Wo darf ich überhaupt rein? Hefteintrag mit 5 wichtigsten Regeln.' }
          ],
          bezuege: [
            { didaktik: 'Fallarbeit (Recht-Didaktik)', verweis: 'UE 3 Fallbeispiele = klassische Methode der Rechtskunde.' },
            { didaktik: 'Realitätsbezug Praktikum', verweis: 'UE 4 schlägt Brücke zum Betriebspraktikum J8/9.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Problem · UE 2 Erkenntnis · UE 3 Wertung · UE 4 Sicherung+Transfer.' }
          ]
        },
      ],
    },
    'J7_LB6': { ke_anzahl: 1, jgst: 'J7', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J7-LB6-01', thema: 'Leittextorientierte Projektarbeit · Übergang zur Selbstständigkeit',
          ke_wortlaut: 'beginnen selbstständige leittextorientierte Projektarbeit und dokumentieren kontinuierlich den Berufswahlprozess.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan · Z. 18-20',
          inhalte_lp: ['Leittextmethode (Anbahnung) · vollständige Handlung (Planen · Durchführen · Prüfen · Bewerten) · kontinuierliche Portfolio-Pflege'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 19' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Mini-Schülerfirma vorbereiten (5 UEs · Projekt J7)',
          ues: [
            { nr: 1, titel: 'Was ist eine Schülerfirma?', inhalt: 'Beispiele zeigen (Bilder · Videos). Klassen-Diskussion: Was würden WIR anbieten können?' },
            { nr: 2, titel: 'Produktidee + Markt', inhalt: 'Brainstorming 5 Ideen. Markttest: Wer würde das kaufen? Zu welchem Preis? 2 SuS interviewen je 5 Personen.' },
            { nr: 3, titel: 'Geschäftsplan einfach', inhalt: 'Geschäftsplan-Mini: Produkt · Zielgruppe · Preis · Kosten · Gewinn. Excel-Tabelle oder Papier.' },
            { nr: 4, titel: 'Rollen verteilen', inhalt: 'Geschäftsleitung · Produktion · Marketing · Buchhaltung. SuS bewerben sich · Klasse wählt.' },
            { nr: 5, titel: 'Sicherung + Ausblick J8', inhalt: 'Sicherung Wirtschaftsprinzipien. Ausblick: in J8 setzen wir die Schülerfirma um (Aufgaben über Schuljahr verteilt).' }
          ],
          bezuege: [
            { didaktik: 'Schülerfirma (LP+ WiB-Methode GB Wirtschaft)', verweis: 'Kanonische Methode für Wirtschaft + BO-Integration.' },
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'Projektplanung deckt 4 erste Schritte ab — Ausführung folgt J8.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2-3 Planung · UE 4 Lösungsorganisation · UE 5 Sicherung+Transfer.' }
          ]
        },
      ],
    },

    // ─── J8 ─────────────────────────────────────────────────────────────
    'J8_GB1': { ke_anzahl: 1, jgst: 'J8', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB1-01', thema: 'Arbeitsplatzbedingungen — Ergonomie und Arbeitsschutz',
          ke_wortlaut: 'beschreiben Arbeitsplatzbedingungen aus einer Betriebserkundung und beurteilen Aspekte von Ergonomie und Arbeitsschutz.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 8',
          inhalte_lp: ['Betriebserkundung · Produktionsverfahren · Produktionsmittel · Arbeitsplatzbedingungen · Ergonomie · Arbeitsschutz'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 284' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Betriebserkundung Ergonomie (5 UEs · Arbeit J8)',
          ues: [
            { nr: 1, titel: 'Betriebserkundung vorbereiten', inhalt: 'Klassen-Wahl Betrieb (z.B. Druckerei · Lebensmittel-Produktion · Werkstatt). Beobachtungsaufträge formulieren: Was wollen wir wissen? Sicherheits- und Verhaltensregeln.' },
            { nr: 2, titel: 'Erkundung im Betrieb', inhalt: '3-Stunden-Besuch. Beobachtung mit Bogen: Arbeitsplätze · Werkzeuge · Schutzkleidung · Pausenregelung. Foto-Erlaubnis vorher klären.' },
            { nr: 3, titel: 'Auswertung Ergonomie', inhalt: 'Plakat-Auswertung: Welche Arbeitsplätze sind ergonomisch gut? Welche schlecht? (Sitzhöhe · Lichtverhältnisse · Lärmschutz · Pausen).' },
            { nr: 4, titel: 'Arbeitsschutz-Recherche', inhalt: 'Was sind Arbeitsschutz-Vorschriften? UVV · BG · Schutzkleidung · Ersthelfer. Kurz-Recherche im Internet (Berufsgenossenschaften).' },
            { nr: 5, titel: 'Sicherung + Bewertung', inhalt: 'Klassen-Plakat Was macht einen guten Arbeitsplatz aus. Hefteintrag mit Ergonomie-Checkliste 10 Punkte. Spiralanker Praktikum.' }
          ],
          bezuege: [
            { didaktik: 'Realbegegnung (LP+ WiB)', verweis: 'Betriebserkundung als kanonische Methode der Berufsorientierung.' },
            { didaktik: 'Arbeitnehmer-Rolle (LP+)', verweis: 'Sequenz aktiviert Arbeitnehmer-Perspektive konkret.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Lösungsplanung · UE 2 Lösung · UE 3-4 Erkenntnis · UE 5 Wertung+Sicherung.' }
          ]
        },
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
          umsetzung_titel: 'Pilot-Sequenz · Anforderungsprofile (8 UEs · 13-Phasen-Standard nach Moritz-Steigerwald)',
          pilot_sequenz: {
            titel: '8-UE-Sequenz · Anforderungsprofile analysieren — Lenas Weg zum Ausbildungsberuf',
            praxis: 'Idealtypisch nach Bausteinskript Moritz-Steigerwald (13 Phasen) + Praktischer_Leitfaden_WiB + LP+ Bayern',
            gesamtzeit: '8 UEs à 45 min = 6 Zeitstunden',
            phasenStandard: 'Primärquelle: 13-Phasen-Strukturmodell nach Moritz-Steigerwald, SRin (Baustein GB »Planung von Unterrichtseinheiten im Fach WiB«, AG der MS-Seminarleiter:innen Unterfranken). Ergänzende fachdidaktische Bezüge: Köck (2021) · Roth (1957) · Meyer (2008).',
            qualitaetsstandards_quelle: 'WiB Ressourcen · Bausteinskript Moritz-Steigerwald (Primärquelle: 13 Phasen + 6 Qualitätskriterien) + LehrplanPLUS Bayern Fachprofil WiB + Köck (2021) + Roth (1957) + Meyer (2008) + QM-Rahmen A-G + Lernziele_WiB_Leitfaden + WiB_BUV_Entwicklung/GUIDELINE_WiB_Phasenstruktur_Transformation.md + Leitfaden_Methoden_Gegenstandsbereiche.md',
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
                'Stellenanzeigen-Analyse + Berufsbild-Auswertung (kanonische WiB-Methoden Gegenstandsbereich Berufsorientierung)',
                'Portfolioarbeit (Berufswahlportfolio fortlaufend gepflegt)',
                'Rollenspiel Bewerbungsgespräch (UE 7)',
                'Differenzierung in 4 Spuren (DaZ · LRS · leistungsschwach · leistungsstark) pro UE',
                '13-Phasen-Artikulation pro UE (Moritz-Steigerwald · Bausteinskript GB WiB Unterfranken)',
              ],
              kompetenzerwerb_progression: 'Prozesskompetenz-Progression: UE 1-2 vorrangig Analysieren (Stellenanzeigen). UE 3-4 Analysieren + Kommunizieren (Berufsbild-Auswertung · Präsentation). UE 5 (Schwerpunktstunde) Beurteilen (Stärken-Profil-Abgleich). UE 6 Beurteilen (Diskrepanz reflektieren). UE 7 Handeln + Kommunizieren (Rollenspiel). UE 8 Beurteilen (Transfer · Selbsteinschätzung).',
              personifikation_durchgaengig: 'Identifikationsfigur Lena (14, Jgst. 8, Wunschberuf Fachverkäuferin im Bäckereihandwerk · Stärken: Mathe-Grundrechnen sicher · sozial offen · LRS schwach · Frühaufstehen mag · Kundenkontakt liebt). Wiederkehrend: UE 1 (Lenas Frage) · UE 3 (Lenas Berufsbild-Recherche) · UE 5 (Lenas Profil-Matrix) · UE 6 (Lenas Diskrepanz LRS vs. Kassenarbeit) · UE 7 (Lenas Bewerbungsgespräch) · UE 8 (Lenas Plan B).',
              schwerpunktstunde_kandidat: 'UE 5 · Anforderungsprofil ↔ Stärken-Schwächen-Matrix (Beurteilen · AFB III · 13-Phasen vollständig)',
            },
            sequenz_tabelle: [
              { uze: 1, datum: 'KW 09 · Mo', stundenthema_frage: 'Was hilft Lena, ihren passenden Beruf zu finden?',
                prozesskompetenz: 'Analysieren · Kommunizieren',
                gegenstand: 'Berufsorientierung · Arbeit',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Problemfrage Berufswahl + Sequenzziel + Lenas Ausgangslage',
                kommentar: 'Sequenz-Einstieg · Personifikation Lena',
                schwerpunkt: false },
              { uze: 2, datum: 'KW 09 · Mi', stundenthema_frage: 'Wie lesen wir eine Stellenanzeige systematisch?',
                prozesskompetenz: 'Analysieren', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Stellenanzeigen-Analyse: fachlich vs. personal trennen',
                kommentar: 'Methode · Stellenanzeigen-Analyse · 4-Spuren-Diff', schwerpunkt: false },
              { uze: 3, datum: 'KW 10 · Mo', stundenthema_frage: 'Was steht in einem Berufsbild — und was nicht?',
                prozesskompetenz: 'Analysieren · Kommunizieren', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'BERUFENET-Recherche + Berufsbild-Auswertung',
                kommentar: 'BO-Methode · Computer-Raum · BERUFENET', schwerpunkt: false },
              { uze: 4, datum: 'KW 10 · Mi', stundenthema_frage: 'Was kann ich gut — und was nicht so gut?',
                prozesskompetenz: 'Beurteilen · Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Stärken-Schwächen-Inventur (Selbst- + Fremdbild)',
                kommentar: 'Portfolio · Selbsteinschätzung + Partner-Fremdbild', schwerpunkt: false },
              { uze: 5, datum: 'KW 11 · Mo',
                stundenthema_frage: 'Passt Lenas Stärken-Profil zur Stelle als Fachverkäuferin Bäckerei?',
                prozesskompetenz: 'Beurteilen · Analysieren', gegenstand: 'Berufsorientierung · Arbeit',
                perspektive: 'Berufswähler:in (Köck 2021) · Arbeitnehmerinnen und Arbeitnehmer',
                stundenziel_kurz: 'Anforderungs-Profil ↔ Stärken-Profil Matrix · Werturteil',
                kommentar: '**SCHWERPUNKTSTUNDE-KANDIDAT** · AFB III · 13-Phasen vollständig', schwerpunkt: true },
              { uze: 6, datum: 'KW 11 · Mi', stundenthema_frage: 'Was, wenn etwas Wichtiges nicht passt?',
                prozesskompetenz: 'Beurteilen · Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Diskrepanz-Strategien · Förder-Optionen · Plan B',
                kommentar: 'Lenas LRS vs. Kassenarbeit · Lösungswege', schwerpunkt: false },
              { uze: 7, datum: 'KW 12 · Mo', stundenthema_frage: 'Wie überzeugt Lena die Chefin im Bewerbungsgespräch?',
                prozesskompetenz: 'Handeln · Kommunizieren', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Rollenspiel Bewerbungsgespräch · Selbstpräsentation',
                kommentar: 'Methode Rollenspiel · paarweise · Beobachter-Feedback', schwerpunkt: false },
              { uze: 8, datum: 'KW 12 · Mi', stundenthema_frage: 'Was nehme ICH aus Lenas Geschichte mit für meinen Weg?',
                prozesskompetenz: 'Beurteilen · Handeln', gegenstand: 'Berufsorientierung',
                perspektive: 'Berufswähler:in (Köck 2021)',
                stundenziel_kurz: 'Transfer · eigener Berufswahlplan-Update',
                kommentar: 'Sequenz-Abschluss · Berufswahlportfolio-Update', schwerpunkt: false },
            ],
            phasenSchema: [
              { id: 'p01', label: '1 Hinführung / Vorwissensaktivierung', kurz: 'Gelerntes und Neuzulernendes verbinden · Lernmotivation' },
              { id: 'p02', label: '2 Problemstufe',                       kurz: 'Lebenserfahrungen problematisieren · Erfahrungen abrufen' },
              { id: 'p03', label: '3 Problemformulierung / Zielangabe',   kurz: 'Transparenz Stundenthema + prozessbez. Kompetenz' },
              { id: 'p04', label: '4 Vermutungen',                        kurz: 'Vorwissen aktivieren · Hypothesen sammeln (unbewertet)' },
              { id: 'p05', label: '5 Lösungsplanung / Teilintentionen',   kurz: 'Was · Wozu · Wer · Wie · Womit' },
              { id: 'p06', label: '6 Lösung (Hauptphase)',                kurz: 'Selbstständige Informationsgewinnung · L als Berater · Differenzierung' },
              { id: 'p07', label: '7 Präsentation',                       kurz: 'SuS als Experten · Ergebnisse vortragen + begründen' },
              { id: 'p08', label: '8 Erkenntnisstufe / Problembeurteilung', kurz: 'Faktenwissen → Strukturwissen · Begriffsarbeit · Fachsprache' },
              { id: 'p09', label: '9 Wertungsstufe',                      kurz: 'Persönliche Stellungnahme · Vergleich mit eigenen Erfahrungen' },
              { id: 'p10', label: '10 Gesamtzusammenfassung',             kurz: 'SuS verbalisieren Kernerkenntnisse' },
              { id: 'p11', label: '11 Vermutungen prüfen',                kurz: 'Verifizieren / Falsifizieren der Eingangsvermutungen' },
              { id: 'p12', label: '12 Transfer',                          kurz: 'Anwendung in verschiedenen Zusammenhängen / Fallbeispiele' },
              { id: 'p13', label: '13 Sicherung',                         kurz: 'Reflexion des Lernprozesses · individueller Lernzuwachs' },
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
                // 13-Phasen-Verlauf (Bausteinskript Moritz-Steigerwald · Unterfranken)
                p01: '3\' · Hinführung / Vorwissensaktivierung: »Erinnert ihr Lenas Stellenanzeige + ihr Berufsbild aus letzter Stunde?« — Wortkarten an Tafel sammeln (5 Anforderungen). Vorwissen Jgst. 7-Portfolio (Staerken-Inventur) kurz reaktivieren.',
                p02: '2\' · Problemstufe: »Lena hat die Stellenanzeige gelesen — sie ist hin- und hergerissen. Sie weiss nicht, ob die Stelle wirklich zu ihr passt. Wie kann ein Mensch eigentlich pruefen, ob ein Beruf zu einem passt — ohne ihn auszuprobieren?« Lebenserfahrung problematisieren.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute lernt ihr beurteilend, wie wir Anforderungen und Staerken systematisch vergleichen.« Prozessbezogene Kompetenz BEURTEILEN an Tafel visualisieren.',
                p04: '2\' · Vermutungen: »Wie wuerdet IHR vorgehen, um Lena zu helfen?« — Vermutungen unbewertet an Tafel sammeln (4-5 SuS-Ideen).',
                p05: '3\' · Lösungsplanung / Teilintentionen: Tafelbild 3-Felder-Matrix (passt · neutral · Diskrepanz). WAS · WOZU · WER · WIE · WOMIT klären. Arbeitsplan: Gruppen 4er · 15\' Bearbeitung · 5\' Praesentation pro Gruppe.',
                p06: '15\' · Lösung (Hauptphase): 4er-Gruppen befuellen Matrix fuer Lenas Profil. Materialien: AB Anforderungen (aus UE 2-3), AB Lenas Staerken (aus UE 4 Selbst+Fremdbild), Matrix-Vorlage. L als Berater. Differenzierung (DaZ-Wortspeicher · LRS-14pt · Auswahlhilfe leistungsschwach · Methodenreflexion leistungsstark) in Material integriert.',
                p07: '5\' · Präsentation: jede Gruppe 90s Matrix + 1 zentrale Aussage. SuS als Experten — sie tragen Befunde + Begruendung vor. Tafel-Synthese mit drei Markern.',
                p08: '3\' · Erkenntnisstufe / Problembeurteilung: Faktenwissen → Strukturwissen. Begriffsarbeit »Anforderungs-Stärken-Passung« als Fachbegriff klaeren · Differenzierung fachlich vs. personal vs. methodisch. Definition ins Heft.',
                p09: '2\' · Wertungsstufe: »Welche Diskrepanz wiegt fuer Lena schwerer — fachlich oder personal? Warum?« Persönliche Stellungnahme · Vergleich mit eigenen Erfahrungen (Wer hat schon mal etwas nicht gekonnt und es trotzdem gewollt?).',
                p10: '1\' · Gesamtzusammenfassung: SuS verbalisieren: »Wir koennen jetzt eine Anforderungs-Stärken-Matrix erstellen und Diskrepanzen erkennen.« — L sammelt 2-3 SuS-Statements.',
                p11: '1\' · Vermutungen prüfen: Tafel-Rueckblick auf die Vermutungen aus Phase 4: Welche hat sich bestaetigt? Welche hat sich als zu eng erwiesen?',
                p12: '4\' · Transfer: »Wendet die Matrix-Logik auf EUREN Wunschberuf an (Stichpunkte ins Heft).« Anwendung in neuem Kontext · Fallbeispiel persoenlicher Beruf.',
                p13: '3\' · Sicherung: Hefteintrag »Anforderungs-Stärken-Matrix als Werkzeug der Berufswahl« · LZK-Mini: »Nenne 2 Anforderungen und je 1 passende Eigenschaft«. Reflexion: »Was habe ICH heute fuer meine eigene Berufswahl gelernt?«',
                phasen_minuten: { p01: 3, p02: 2, p03: 1, p04: 2, p05: 3, p06: 15, p07: 5, p08: 3, p09: 2, p10: 1, p11: 1, p12: 4, p13: 3 },
                sozialform_phasen: {
                  p01: 'Plenum (Tafel-Sammlung) + UG',
                  p02: 'L-Erzählung + UG',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Arbeitsplan)',
                  p06: 'GA (4er)',
                  p07: 'Plenum (Galerie)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Wertung · Ko-Konstruktion)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA (Transfer · Heft)',
                  p13: 'EA (Hefteintrag) + LZK',
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
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021) · Arbeitnehmerinnen und Arbeitnehmer',
                  prozesskompetenz: 'Beurteilen (Schwerpunkt) · Analysieren (vorbereitend)',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.3 Orientierung über sich wandelnde Arbeitswelt · G1.6 Handlungsorientierte Lernmethoden',
                didaktik: 'Anforderungs-Stärken-Matrix als zentrales BO-Werkzeug · Personifikation (Lena) als Modelllernen · 13-Phasen-Standard nach Moritz-Steigerwald (Bausteinskript GB WiB Unterfranken) · Mager-Lernziele · 4-Spuren-Differenzierung'
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
                p01: '4\' · Hinführung / Vorwissensaktivierung: Portfolio durchblättern · Vorwissen Jgst. 7 reaktivieren (Staerken-Inventur). »Ich kann schon etwas zu meinen Staerken sagen — das nehmen wir heute mit.«',
                p02: '3\' · Problemstufe: Lenas Steckbrief lesen — »Sie weiss nicht, ob die Stelle zu ihr passt.« Lebenserfahrung problematisieren: 1000+ Ausbildungsberufe existieren — wer trifft die Entscheidung? Wie kann Lena (und ich) ueberhaupt entscheiden?',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute klaeren wir analysierend: was braucht Lena fuer ihre Entscheidung?« Prozessbezogene Kompetenz ANALYSIEREN an Tafel visualisieren.',
                p04: '2\' · Vermutungen: Tafel-Sammlung »Was braucht Lena?« unbewertet (5-6 SuS-Ideen sammeln · Hypothesen).',
                p05: '2\' · Lösungsplanung / Teilintentionen: WAS · WOZU · WER · WIE · WOMIT für die 8-UE-Sequenz · 8-UE-Sequenzplan visualisieren.',
                p06: '12\' · Lösung (Hauptphase): Partnerarbeit — eigenen Wunschberuf benennen + erste »Passt-Frage« formulieren. L als Berater · Differenzierung über Berufsfeld-Katalog (leistungsschwach) bzw. zwei Bewertungskriterien (leistungsstark).',
                p07: '4\' · Präsentation: 3-5 SuS stellen ihre »Passt-Frage« vor. SuS als Experten ihrer eigenen Berufswahl.',
                p08: '3\' · Erkenntnisstufe / Problembeurteilung: Begriff »Berufswahl« klaeren (Tafel-Definition) — Trias: Anforderungen kennen · Staerken kennen · vergleichen. Faktenwissen → Strukturwissen.',
                p09: '2\' · Wertungsstufe: »Wer hat schon konkrete Vorstellungen — wer noch nicht?« Persoenliche Stellungnahme — beides ist okay. Ko-Konstruktion mit Lehrkraft.',
                p10: '1\' · Gesamtzusammenfassung: SuS verbalisieren: »Berufswahl braucht drei Komponenten — wir starten heute mit Lena, in 8 Stunden haben wir die Methodik.«',
                p11: '2\' · Vermutungen prüfen: Vermutungen aus Phase 4 mit Lehrkraft-Ergaenzungen abgleichen — was passt, was fehlt?',
                p12: '6\' · Transfer: Eintrag »Mein Wunschberuf« ins Berufswahlportfolio · ggf. zweite Passt-Frage notieren. Anwendung der Lenas-Logik auf eigenen Weg.',
                p13: '3\' · Sicherung: Sequenz-Plan + drei Komponenten an Tafel · Hefteintrag »Drei Komponenten der Berufswahl« · Reflexion Lernzuwachs · Transfer-HA: »Frag heute Abend ein Familienmitglied: Was ist sein/ihr Beruf — und passt der zu ihm/ihr?«',
                phasen_minuten: { p01: 4, p02: 3, p03: 1, p04: 2, p05: 2, p06: 12, p07: 4, p08: 3, p09: 2, p10: 1, p11: 2, p12: 6, p13: 3 },
                sozialform_phasen: {
                  p01: 'EA (Portfolio)',
                  p02: 'Plenum (Steckbrief) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Sequenz-Plan)',
                  p06: 'PA',
                  p07: 'Plenum (Vorstellung)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Reflexion)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA (Portfolio)',
                  p13: 'EA + L-Impuls (HA)',
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
                kompetenzstruktur: { gegenstand: 'Berufsorientierung', perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)', prozesskompetenz: 'Analysieren (Anbahnung)' },
                kernintention_wib: 'G1.4 Vorbereitung auf zukuenftige Rollen · G1.7 Berufswahlreife',
                didaktik: 'Sequenz-Hook mit Personifikation (Lena) · Anschluss an Portfolio Jgst. 7 · 13-Phasen-Standard nach Moritz-Steigerwald auch im Sequenz-Einstieg konsequent durchgehalten (Phase 1 Hinführung-Reaktivierung Portfolio · Phase 2 Lebenserfahrung problematisieren · Phase 6 Hauptphase PA-Wunschberuf · Phase 13 Sicherung HA Familiengespräch).'
              },
              // ── UE 2-4, 6-8 sind voll ausgearbeitet · 13-Phasen-Standard (Moritz-Steigerwald) ──
              // ── UE 2 — Stellenanzeigen-Analyse (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 2,
                titel: 'Stellenanzeigen-Analyse · fachlich vs. personal',
                stundenthema_frage: 'Wie lesen wir eine Stellenanzeige systematisch?',
                minuten: 45,
                lernziel: 'SuS analysieren Stellenanzeigen systematisch und trennen fachliche von personalen Anforderungen.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler analysieren eine Stellenanzeige systematisch und trennen fachliche von personalen Anforderungen,',
                  bedingung: 'indem sie Lenas reale Stellenanzeige einer Baeckerei aus Unterfranken mit zwei Farben (gelb = fachlich · gruen = personal) markieren und die Eintraege in eine 2-Spalten-Tabelle uebertragen,',
                  maszstab: 'was daran erkennbar wird, dass die Tabelle pro Spalte mindestens drei korrekt zugeordnete Anforderungen aus der Anzeige traegt und im Plenum die Trennlogik begruendet wird.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS identifizieren die Bestandteile einer Stellenanzeige,',
                    indem: 'indem sie an Lenas Anzeige die fuenf Standardteile (Betrieb · Stelle · Aufgaben · Anforderungen · Kontakt) zeigen,',
                    erkennbar: 'was daran erkennbar wird, dass alle fuenf Teile markiert und beschriftet sind.', afb: 'I', differenziert: false },
                  { tz: 'SuS unterscheiden fachliche von personalen Anforderungen,',
                    indem: 'indem sie zu jeder Anforderung pruefen: »Was muss ich KOENNEN/WISSEN?« (fachlich) oder »Wie muss ich SEIN?« (personal),',
                    erkennbar: 'was daran erkennbar wird, dass mindestens drei Anforderungen pro Spalte korrekt zugeordnet sind.', afb: 'II', differenziert: false },
                  { tz: 'SuS begruenden ihre Zuordnung an einem Beispiel,',
                    indem: 'indem sie im Plenum eine strittige Anforderung (z.B. »Teamfaehigkeit«) der Spalte »personal« zuordnen und das Kriterium benennen,',
                    erkennbar: 'was daran erkennbar wird, dass die Begruendung mit dem Frage-Test (Koennen vs. Sein) operiert.', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS erkennen implizite Anforderungen,',
                    indem: 'indem sie Anforderungen benennen, die NICHT explizit in der Anzeige stehen, aber im Beruf vorausgesetzt werden (z.B. Frueh-Aufstehen vor 5 Uhr · Hygienestandards),',
                    erkennbar: 'was daran erkennbar wird, dass mindestens zwei implizite Anforderungen mit Begruendung notiert sind.', afb: 'III', differenziert: true },
                ],
                p01: '3\' · Hinführung / Vorwissensaktivierung: Rueckblick UE 1 — »Wir haben gestern Lenas Frage gehoert. Sie braucht drei Komponenten — heute starten wir mit Anforderungen.« Wortkarten-Reaktivierung.',
                p02: '3\' · Problemstufe: »Lena hat in der Tageszeitung eine Stellenanzeige der Baeckerei Schmitt aus Hassfurt entdeckt.« Anzeige auf Tafel projizieren. »Lena liest die Anzeige zum dritten Mal — und sie versteht trotzdem nicht: Was muss sie KOENNEN, und was muss sie als PERSON sein? Alles steht gemischt durcheinander.« Lebenserfahrung problematisieren.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute lernt ihr analysierend, wie wir eine Stellenanzeige in zwei Spalten zerlegen — fachlich und personal getrennt.« Prozessbezogene Kompetenz ANALYSIEREN an Tafel.',
                p04: '2\' · Vermutungen: »Wie wuerdet IHR sortieren, was zur Stelle gehoert?« — Tafel-Sammlung unbewertet (4-5 SuS-Hypothesen).',
                p05: '3\' · Lösungsplanung / Teilintentionen: Tafelbild 2-Spalten-Tabelle (fachlich · personal) · Markier-Methode mit zwei Farben · Frage-Test einfuehren: »Koennen/Wissen?« vs. »Sein?« WAS-WOZU-WIE-WOMIT klären.',
                p06: '13\' · Lösung (Hauptphase): PA — jedes Paar erhaelt eine Original-Stellenanzeige (Lenas Anzeige Baeckerei Schmitt + zwei weitere regionale Anzeigen). Schritt 1: Anzeige markieren (gelb/gruen). Schritt 2: Eintraege in 2-Spalten-Tabelle. L als Lese-Beratung bei LRS-SuS · Wortspeicher mit Bildsymbolen (DaZ) · Tabellen-Vorgabe (leistungsschwach) · implizite Anforderungen (leistungsstark).',
                p07: '4\' · Präsentation: Drei Paare stellen ihre Tabelle vor (je 1\') · SuS als Experten ihrer Anzeige.',
                p08: '3\' · Erkenntnisstufe / Problembeurteilung: L synthetisiert auf Tafel-Tabelle Lenas Anzeige. Begriffsarbeit »fachliche Anforderung« (Wissen + Koennen + Abschluss) vs. »personale Anforderung« (Eigenschaften + Verhalten + Haltung). Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Welche Spalte ist fuer den Berufserfolg wichtiger — fachlich oder personal? Was meint ihr?« Persoenliche Stellungnahme · Vergleich mit eigenen Vorerfahrungen aus Familie/Bekanntenkreis.',
                p10: '1\' · Gesamtzusammenfassung: »Wir koennen jetzt jede Stellenanzeige in fachlich und personal zerlegen.« SuS verbalisieren.',
                p11: '1\' · Vermutungen prüfen: Rueckblick Vermutungen Phase 4 — welche hat sich bestaetigt? Welche war zu eng?',
                p12: '6\' · Transfer: Zweite Anzeige aus Material kurz markieren · Anwendung der 2-Spalten-Logik auf einen weiteren Beruf (Fallbeispiel).',
                p13: '2\' · Sicherung: Hefteintrag »Stellenanzeige = fachlich + personal« · Wortspeicher-Eintrag · Reflexion Lernzuwachs · HA: »Schaut bis Mittwoch in eine Zeitung — findet eine Stellenanzeige aus eurem Wunschberuf.«',
                phasen_minuten: { p01: 3, p02: 3, p03: 1, p04: 2, p05: 3, p06: 13, p07: 4, p08: 3, p09: 3, p10: 1, p11: 1, p12: 6, p13: 2 },
                sozialform_phasen: {
                  p01: 'Plenum (Reaktivierung) + UG',
                  p02: 'Plenum (Tafelprojektion) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Tafelbild)',
                  p06: 'PA',
                  p07: 'Plenum (Galerie)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Wertung)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'PA (Transfer auf weitere Anzeigen)',
                  p13: 'EA + L-Impuls (HA)',
                },
                differenzierung_block: {
                  daz: 'Anzeige in 16pt+ · Wortspeicher mit Bildsymbolen (fachlich = Werkzeug · personal = Gesicht) · Lese-Tandem · Markier-Aufgabe vor Tabellen-Aufgabe (Stufung).',
                  lrs: 'Anzeige in 14pt+ · Foto-Sequenz von Baeckerei-Taetigkeiten erlaubt als Zusatz · Stichworte statt ganzer Saetze in die Tabelle · L-Vorlesehilfe.',
                  leistungsschwach: 'Tabelle mit drei Zeilen pro Spalte vorgegeben · Auswahl aus 8 Wortkarten zum Eintragen statt freier Markierung.',
                  leistungsstark: 'Zusatzaufgabe: Implizite Anforderungen (was steht NICHT in der Anzeige aber muss man koennen?) mit zwei Beispielen + Begruendung (AFB III).',
                },
                personifikation_anteil: 'Lena bringt ihre konkrete Wunsch-Stellenanzeige (Baeckerei Schmitt Hassfurt · regional verankert) mit. SuS arbeiten am gleichen Material wie Lena — dadurch wird der Lese-Prozess als gemeinsame Hilfe fuer Lena erlebbar.',
                tafelbild_skizze: '2-Spalten-Tabelle: links »fachlich« (Werkzeug-Symbol · gelb) · rechts »personal« (Gesicht-Symbol · gruen). Oben: Auszug aus Lenas Stellenanzeige Baeckerei Schmitt. Unten: Frage-Test »Koennen/Wissen?« vs. »Sein?«.',
                hausaufgabe: 'Sucht bis Mittwoch eine Stellenanzeige aus EUREM Wunschberuf (Zeitung · Internet · Aushang) und bringt sie mit. Markiert sie schon zu Hause in zwei Farben.',
                material: 'Lenas Original-Stellenanzeige Baeckerei Schmitt (Hassfurt) als A4-Druck pro Tisch · zwei weitere Anzeigen zur Auswahl · 2-Farben-Markerset · AB Tabelle 2-Spalten · Wortspeicher (fachlich · personal · Anforderung · Eigenschaft) · Hefteintrag-Schablone',
                lp_bezug: 'KE J8-GB2-01 (Anforderungsprofile · Stellenanzeigen-Analyse) · vorbereitend fuer UE 5 (Matrix)',
                prinzipien_b3: ['Kompetenzorientierung', 'Methodencurriculum', 'Praxisorientierung', 'Lebensbezug', 'Personifikation'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Analysieren (Schwerpunkt)',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.6 Handlungsorientierte Lernmethoden',
                didaktik: 'Stellenanzeigen-Analyse als kanonische BO-Methode (Leitfaden_Methoden_GB) · regional verankertes Authentikmaterial (Baeckerei Hassfurt) · 13-Phasen-Standard nach Moritz-Steigerwald · 4-Spuren-Differenzierung mit besonderem Augenmerk auf LRS (Lese-Tandem · 14pt+ · Foto-Sequenz).'
              },
              // ── UE 3 — BERUFENET-Recherche (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 3,
                titel: 'BERUFENET-Recherche · Berufsbild Fachverkaeufer:in',
                stundenthema_frage: 'Was steht in einem Berufsbild — und was nicht?',
                minuten: 45,
                lernziel: 'SuS recherchieren systematisch in BERUFENET und werten Berufsbilder strukturiert aus.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler recherchieren das Berufsbild »Fachverkaeufer:in im Lebensmittelhandwerk · Schwerpunkt Baeckerei« in BERUFENET und werten es strukturiert aus,',
                  bedingung: 'indem sie in PA am PC die fuenf BERUFENET-Rubriken (Taetigkeiten · Voraussetzungen · Verdienst · Ausbildung · Perspektive) ansteuern und in einen Auswertungsbogen uebertragen,',
                  maszstab: 'was daran erkennbar wird, dass alle fuenf Rubriken mit je mindestens zwei Stichpunkten ausgefuellt sind und drei dieser Eintraege im Plenum vorgestellt werden.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS navigieren in BERUFENET zum gesuchten Berufsbild,',
                    indem: 'indem sie ueber die Suchfunktion »Fachverkaeufer:in Baeckerei« eingeben und die richtige Berufsseite aufrufen,',
                    erkennbar: 'was daran erkennbar wird, dass die korrekte Seite (Ausbildungsberuf · 3 Jahre) geoeffnet ist.', afb: 'I', differenziert: false },
                  { tz: 'SuS extrahieren Informationen aus den fuenf Rubriken,',
                    indem: 'indem sie pro Rubrik mindestens zwei Stichpunkte in den Auswertungsbogen uebertragen,',
                    erkennbar: 'was daran erkennbar wird, dass alle fuenf Rubriken Eintraege tragen.', afb: 'II', differenziert: false },
                  { tz: 'SuS vergleichen Berufsbild mit Stellenanzeige aus UE 2,',
                    indem: 'indem sie pruefen, welche Anforderungen aus Lenas Stellenanzeige im Berufsbild wiederkehren — und welche dort fehlen,',
                    erkennbar: 'was daran erkennbar wird, dass mindestens drei Schnittmengen und eine Differenz benannt sind.', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS bewerten die Aussagekraft von BERUFENET,',
                    indem: 'indem sie pruefen, welche fuer Lena relevanten Aspekte (z.B. konkreter Arbeitsalltag · Atmosphaere · Chef:in) NICHT in BERUFENET stehen und benennen ergaenzende Informationsquellen,',
                    erkennbar: 'was daran erkennbar wird, dass mindestens zwei Leerstellen mit ergaenzenden Quellen (Praktikum · Berufsmesse · Eltern-Netzwerk) benannt sind.', afb: 'III', differenziert: true },
                ],
                p01: '3\' · Hinführung / Vorwissensaktivierung: Rueckblick UE 2 — »Lena hat ihre Stellenanzeige analysiert. Aber was steckt noch dahinter?« Wortkarten »fachlich · personal« reaktivieren.',
                p02: '3\' · Problemstufe: »Lena will jetzt WISSEN: Was macht eine Fachverkaeuferin den ganzen Tag — und was bringt der Beruf langfristig? Aber wem kann sie ehrliche Antworten zutrauen — der Baeckerei selbst? Eine Anzeige ist auch Werbung.« Problematisierung Vertrauensquelle.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute lernen wir die wichtigste Berufs-Datenbank Deutschlands kennen: BERUFENET der Bundesagentur fuer Arbeit (Prozesskompetenz Analysieren + Kommunizieren).«',
                p04: '2\' · Vermutungen: »Was glaubt ihr, welche Themen muss eine Berufs-Datenbank zeigen, damit Lena entscheiden kann?« — Tafel-Sammlung.',
                p05: '3\' · Lösungsplanung / Teilintentionen: L stellt fuenf BERUFENET-Rubriken vor (Taetigkeiten · Voraussetzungen · Verdienst · Ausbildung · Perspektive) · Auswertungsbogen ausgeben · WAS-WOZU-WIE klären. Arbeitsauftrag: PA am PC · 13\' Recherche.',
                p06: '13\' · Lösung (Hauptphase): PA im Computerraum. Schritt 1: berufenet.arbeitsagentur.de aufrufen. Schritt 2: »Fachverkaeufer:in Baeckerei« suchen. Schritt 3: fuenf Rubriken durcharbeiten · Stichpunkte in Bogen. L als Technik- und Inhalts-Berater · Differenzierung Vorlese-Funktion (LRS) · drei statt fuenf Rubriken (leistungsschwach) · Leerstellen-Reflexion (leistungsstark).',
                p07: '5\' · Präsentation: Drei Paare stellen je eine Rubrik vor (je 1.5\') · SuS als Recherche-Experten · Tafel-Synthese mit Schlagworten.',
                p08: '4\' · Erkenntnisstufe / Problembeurteilung: Begriffsarbeit »Berufsbild« als systematische Beschreibung mit fuenf Standardrubriken vs. »Stellenanzeige« als konkrete Einzelstelle. Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Welche Rubrik ist fuer EUCH bei einer Berufswahl-Entscheidung am wichtigsten — Verdienst? Taetigkeiten? Aufstieg? Warum?« Persoenliche Stellungnahme.',
                p10: '1\' · Gesamtzusammenfassung: »BERUFENET zeigt das allgemeine Berufsbild, Stellenanzeige zeigt die konkrete Stelle.« SuS verbalisieren.',
                p11: '1\' · Vermutungen prüfen: »Welche Rubrik hattet ihr richtig vermutet? Was war anders als gedacht?«',
                p12: '4\' · Transfer: Vergleich »Was steht in Lenas Stellenanzeige, das NICHT in BERUFENET steht — und umgekehrt? Was sagt das ueber die zwei Quellen?« Anwendung auf andere Berufe.',
                p13: '2\' · Sicherung: Hefteintrag »Berufsbild = 5 Rubriken aus BERUFENET« · Auswertungsbogen in Berufswahlportfolio einheften · Reflexion · HA: »Sucht bis Montag euer eigenes Berufsbild in BERUFENET — drei Stichpunkte pro Rubrik.«',
                phasen_minuten: { p01: 3, p02: 3, p03: 1, p04: 2, p05: 3, p06: 13, p07: 5, p08: 4, p09: 3, p10: 1, p11: 1, p12: 4, p13: 2 },
                sozialform_phasen: {
                  p01: 'Plenum (Reaktivierung)',
                  p02: 'Plenum (L-Vorstellung) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Rubriken-Erklaerung)',
                  p06: 'PA (am PC)',
                  p07: 'Plenum (Galerie)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Wertung)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'UG + EA (Vergleich)',
                  p13: 'EA (Portfolio) + L-Impuls (HA)',
                },
                differenzierung_block: {
                  daz: 'Auswertungsbogen mit Bild-Icons pro Rubrik · Wortspeicher Recherche · Datenbank · Rubrik · Voraussetzung · DaZ-faehiges Tandem · Lese-Tandem bei BERUFENET-Texten.',
                  lrs: 'Bildschirm-Zoom auf 125% · Vorlese-Funktion am PC aktivieren (BERUFENET hat Audio-Funktion) · Stichworte statt Saetze · Foto-Funktion der Berufsbild-Galerie nutzen.',
                  leistungsschwach: 'Nur drei Rubriken (Taetigkeiten · Voraussetzungen · Ausbildung) bearbeiten · Auswertungsbogen mit Schreibgeruest (Halbsaetze) · Partner uebernimmt Tastatur.',
                  leistungsstark: 'Zusatzaufgabe: »Was steht NICHT in BERUFENET — aber waere fuer Lena wichtig zu wissen?« mit zwei Beispielen + Quellenvorschlaegen (Praktikum · Berufsmesse · Eltern-Gespraech) als AFB III.',
                },
                personifikation_anteil: 'Lena recherchiert ihren Wunschberuf in BERUFENET — die SuS arbeiten parallel und vergleichen ihre Befunde mit Lenas (im Auswertungsbogen ist eine Lena-Spalte vorgegeben).',
                tafelbild_skizze: '5-Rubriken-Tafel: Taetigkeiten · Voraussetzungen · Verdienst · Ausbildung · Perspektive. Pro Rubrik 2-3 Schlagworte aus den SuS-Rechercheergebnissen. Unten: Vergleich »BERUFENET vs. Stellenanzeige« (Schnittmenge · Differenz).',
                hausaufgabe: 'Sucht in BERUFENET euer EIGENES Wunsch-Berufsbild und uebertragt fuer drei Rubrik je drei Stichpunkte in euer Berufswahlportfolio. Vorbereitung UE 4.',
                material: 'Computerraum (1 PC pro 2er-Tisch) · BERUFENET-Link berufenet.arbeitsagentur.de (kein Login noetig · oeffentlich) · Auswertungsbogen 5-Rubriken · Wortspeicher · Reserve-AB fuer Technik-Ausfall (BERUFENET-Print Lenas Beruf)',
                lp_bezug: 'KE J8-GB2-01 (Berufsbild-Auswertung) · vorbereitend fuer UE 5 (Matrix mit Anforderungen aus UE 2 + UE 3)',
                prinzipien_b3: ['Methodencurriculum', 'Handlungsorientierung', 'Medienbildung', 'Praxisorientierung', 'Personifikation'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Analysieren (Schwerpunkt) · Kommunizieren',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.6 Handlungsorientierte Lernmethoden · G1.3 Orientierung in sich wandelnder Arbeitswelt',
                didaktik: 'BERUFENET-Recherche als kanonische BO-Methode (Leitfaden_Methoden_GB · Bundesagentur fuer Arbeit) · Medienbildung im Fach WiB · Vergleichs-Methodik (BERUFENET vs. Stellenanzeige) als Vorbereitung der Matrix in UE 5.'
              },
              // ── UE 4 — Staerken-Schwaechen-Inventur (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 4,
                titel: 'Staerken-Schwaechen-Inventur · Selbst- + Fremdbild',
                stundenthema_frage: 'Was kann ich gut — und was nicht so gut?',
                minuten: 45,
                lernziel: 'SuS erstellen eine Staerken-Inventur durch Selbstbild und Partner-Fremdbild.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler erstellen eine Staerken-Schwaechen-Inventur ueber sich selbst und vergleichen Selbstbild mit Fremdbild,',
                  bedingung: 'indem sie zuerst alleine einen Selbstbild-Bogen (sechs Staerken-Felder + drei Schwaechen-Felder) ausfuellen und anschliessend mit einem Partner-Fremdbild abgleichen,',
                  maszstab: 'was daran erkennbar wird, dass jede:r SuS mindestens vier Staerken im Selbstbild und mindestens drei Staerken im Fremdbild dokumentiert und mindestens eine Schnittmenge sowie eine Differenz benennt.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS benennen eigene Staerken systematisch,',
                    indem: 'indem sie aus einem Staerken-Wortspeicher (24 Begriffe · z.B. geduldig · zuverlaessig · handgeschickt · kontaktfreudig) mindestens vier passende fuer sich auswaehlen und begruenden,',
                    erkennbar: 'was daran erkennbar wird, dass jede Staerke mit einem konkreten Alltagsbeispiel (»Ich helfe meiner Oma jede Woche im Garten«) belegt ist.', afb: 'II', differenziert: false },
                  { tz: 'SuS benennen eigene Schwaechen sachlich,',
                    indem: 'indem sie drei Felder ankreuzen, in denen sie noch Lernbedarf sehen (z.B. Geduld · Rechnen · Vor Gruppen sprechen),',
                    erkennbar: 'was daran erkennbar wird, dass keine Selbstabwertung (»doof« · »bloed«) sondern lernbezogene Formulierung verwendet wird.', afb: 'II', differenziert: false },
                  { tz: 'SuS holen Fremdbild eines Partners ein,',
                    indem: 'indem sie sich gegenseitig mit demselben Wortspeicher beschreiben — der Partner darf nichts vom Selbstbild wissen,',
                    erkennbar: 'was daran erkennbar wird, dass jede:r SuS ein vollstaendig ausgefuelltes Fremdbild von seinem Partner besitzt.', afb: 'I', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS reflektieren Selbst-Fremd-Differenzen,',
                    indem: 'indem sie eine Differenz benennen (z.B. »Partnerin sieht mich als geduldig — ich selbst nicht«) und ueberlegen, welcher Hinweis das fuer die Berufswahl ist,',
                    erkennbar: 'was daran erkennbar wird, dass die Reflexion eine konkrete berufswahl-relevante Konsequenz (Praktikum testen) benennt.', afb: 'III', differenziert: true },
                ],
                p01: '3\' · Hinführung / Vorwissensaktivierung: Rueckblick UE 2+3 — »Lena hat ihre Stellenanzeige und ihr Berufsbild.« Wortspeicher-Karten Anforderungen reaktivieren.',
                p02: '3\' · Problemstufe: »Jetzt fehlt noch eine Information: WAS KANN LENA EIGENTLICH? Ohne das geht keine Berufswahl.« L zeigt Lenas Selbstbild-Beispiel. »Lena sagt, sie kann gut mit Menschen umgehen. Aber stimmt das? Wie kann sie sicher sein?« Lebenserfahrung problematisieren.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute machen wir eine Staerken-Inventur (Prozesskompetenz Beurteilen + Handeln) — und holen uns das Fremdbild von einem Partner dazu.«',
                p04: '2\' · Vermutungen: »Warum braucht man ZWEI Sichtweisen (Selbst + Fremd) — reicht nicht eine?« — Tafel-Sammlung unbewertet.',
                p05: '2\' · Lösungsplanung / Teilintentionen: L stellt Selbstbild-Bogen + Fremdbild-Bogen vor. Wortspeicher mit 24 Staerken-Begriffen austeilen. Ablauf transparent: Schritt 1 EA Selbstbild (5\') · Schritt 2 PA Fremdbild (5\') · Schritt 3 Vergleich (3\').',
                p06: '13\' · Lösung (Hauptphase): Drei-Schritt-Phase. (a) 5\' EA: Selbstbild-Bogen ausfuellen — 4 Staerken + 3 Schwaechen + Alltagsbeispiele. (b) 5\' PA: Gegenseitig Fremdbild (Partner kennt Selbstbild NICHT). (c) 3\' EA: Beide Boegen nebeneinander legen · Schnittmenge + Differenz markieren. Differenzierung Wortspeicher mit Bildern (DaZ) · Audio-Aufnahme (LRS) · reduzierter Wortspeicher (leistungsschwach) · Differenz-Interpretation (leistungsstark).',
                p07: '4\' · Präsentation: Drei freiwillige SuS stellen ihre Selbst-Fremd-Differenz vor (kein Zwang!) · Lena-Beispiel parallel auf Tafel: Lena sieht sich als »manchmal langsam« · Partnerin sieht sie als »gruendlich«. SuS als Experten ihres Selbstbilds.',
                p08: '4\' · Erkenntnisstufe / Problembeurteilung: Begriffsarbeit »Selbstbild« (wie ich mich sehe) vs. »Fremdbild« (wie andere mich sehen) · Differenz oft hilfreich · nicht falsch. Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Welcher Bogen war fuer euch schwieriger — und warum?« Persoenliche Stellungnahme · Reflexion eigener Haltung zur Selbst-/Fremdwahrnehmung.',
                p10: '1\' · Gesamtzusammenfassung: »Wir kennen jetzt unsere Staerken nicht nur aus eigener Sicht — wir haben sie geprueft.« SuS verbalisieren.',
                p11: '1\' · Vermutungen prüfen: »Hat sich bestaetigt, warum man ZWEI Sichtweisen braucht?« Rueckblick Vermutungen Phase 4.',
                p12: '5\' · Transfer: »Welche Staerke aus eurem Profil koennte zu welchem Beruf passen? Was sagt euer Wunschberuf aus UE 1 dazu?« Anwendung Staerken → Wunschberuf-Logik.',
                p13: '3\' · Sicherung: Beide Boegen ins Berufswahlportfolio · Hefteintrag »Staerken: aus Selbst- UND Fremdbild« · Reflexion Lernzuwachs · HA: »Holt euch bis Montag ein DRITTES Fremdbild von einem Familienmitglied oder einem Lehrer.«',
                phasen_minuten: { p01: 3, p02: 3, p03: 1, p04: 2, p05: 2, p06: 13, p07: 4, p08: 4, p09: 3, p10: 1, p11: 1, p12: 5, p13: 3 },
                sozialform_phasen: {
                  p01: 'Plenum (Reaktivierung)',
                  p02: 'Plenum (Lena-Beispiel) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Ablauf)',
                  p06: 'EA + PA + EA (Drei-Schritt)',
                  p07: 'Plenum (freiwillig)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Reflexion)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA (Transfer)',
                  p13: 'EA (Portfolio) + L-Impuls (HA)',
                },
                differenzierung_block: {
                  daz: 'Wortspeicher mit Bild-Symbol pro Staerke (z.B. Hand-Symbol fuer »handgeschickt« · Sprechblase fuer »kontaktfreudig«) · Selbstbild-Bogen in einfacher Sprache · DaZ-faehiges Partner-Tandem fuer Fremdbild.',
                  lrs: 'Boegen in 14pt+ · Wortspeicher mit Bildern · Ankreuzen statt frei schreiben erlaubt · Audio-Aufnahme des Selbstbild-Berichts statt Schreiben moeglich.',
                  leistungsschwach: 'Wortspeicher auf 12 Begriffe reduziert · Boegen mit Beispiel-Eintrag (Mustersaetze) · Lehrkraft begleitet beim Schwaechen-Bogen einzeln.',
                  leistungsstark: 'Zusatzaufgabe: Selbst-Fremd-Differenz interpretieren — »Welche Differenz koennte fuer meine Berufswahl wichtig sein?« mit zwei konkreten beruflichen Konsequenzen (z.B. Praktikum testen · Beratungsgespraech) als AFB III.',
                },
                personifikation_anteil: 'Lenas Selbstbild und Fremdbild dienen als Modell. Lenas konkrete Eintrage werden in UE 5 fuer die Matrix gebraucht: »Frueh-Aufstehen« (Staerke · Selbstbild + Fremdbild) und »Lesen unter Stress« (Schwaeche · Selbstbild · wegen LRS). Beides muss vorbereitet sein, damit UE 5 funktioniert.',
                tafelbild_skizze: 'Zwei-Spalten-Tafel: links »Selbstbild« (Spiegel-Symbol) · rechts »Fremdbild« (Brille-Symbol). Mitte: Lenas Beispiel-Eintraege als Modell. Unten: »Schnittmenge = sicher« · »Differenz = wertvoller Hinweis«.',
                hausaufgabe: 'Holt euch bis Montag ein DRITTES Fremdbild von einem Familienmitglied oder einer Lehrkraft. Notiert die drei wichtigsten Staerken in euer Portfolio. Vorbereitung UE 5 (Matrix-Stunde).',
                material: 'Selbstbild-Bogen · Fremdbild-Bogen · Wortspeicher 24 Staerken (laminiert) · Berufswahlportfolio · Lenas Modell-Boegen (auf A3 als Tafel-Beispiel) · Wortspeicher Schwaechen (sachlich · 8 Begriffe)',
                lp_bezug: 'KE J8-GB2-01 (Staerken-Schwaechen-Inventur · Selbstbild · Fremdbild) · Anschluss an KE J7-GB2-01 (Portfolio) · vorbereitend fuer UE 5 (Matrix)',
                prinzipien_b3: ['Schuelerorientierung', 'Personifikation', 'Reflexion', 'Lebensbezug', 'Differenzierung'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Beurteilen (Schwerpunkt) · Handeln',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.4 Vorbereitung auf zukuenftige Rollen',
                didaktik: 'Staerken-Inventur als kanonische BO-Methode (LP+ J7-GB2-01 Anbahnung · J8-GB2-01 Vertiefung) · Selbstbild-Fremdbild-Vergleich als Modelllernen (Lena als Modell-Subjekt) · 13-Phasen-Standard nach Moritz-Steigerwald mit Drei-Schritt-Hauptphase (EA + PA + EA in Phase 6) · sensitive Differenzierung fuer LRS (Audio-Option · Bildsymbole · Ankreuzen).'
              },
              // ── UE 6 — Diskrepanz-Strategien (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 6,
                titel: 'Diskrepanz-Strategien · Was, wenn etwas nicht passt?',
                stundenthema_frage: 'Was, wenn etwas Wichtiges nicht passt?',
                minuten: 45,
                lernziel: 'SuS entwickeln Strategien zum Umgang mit Diskrepanzen zwischen Anforderung und Staerke.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler entwickeln drei Strategien zum Umgang mit einer konkreten Diskrepanz zwischen Berufsanforderung und eigener Schwaeche,',
                  bedingung: 'indem sie ausgehend von Lenas Diskrepanz (LRS vs. Kassieren mit schnellem Lesen) in 3er-Gruppen einen Strategie-Faecher (Foerdern · Anpassen · Wechseln) erarbeiten und auf ein eigenes Beispiel uebertragen,',
                  maszstab: 'was daran erkennbar wird, dass jede Gruppe pro Faecher-Feld mindestens einen konkreten Loesungsschritt benennt und im Plenum begruendet, welche Strategie fuer Lena realistisch ist.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS rekonstruieren Lenas LRS-Diskrepanz konkret,',
                    indem: 'indem sie aus der Matrix-Stunde (UE 5) den Diskrepanz-Eintrag »Kassieren mit schnellem Lesen« heraussuchen und die Anforderung beschreiben,',
                    erkennbar: 'was daran erkennbar wird, dass die Anforderung (Preisetiketten schnell lesen · Bestellungen aufnehmen) korrekt benannt ist.', afb: 'I', differenziert: false },
                  { tz: 'SuS unterscheiden drei Strategie-Typen,',
                    indem: 'indem sie die Strategie-Faecher (Foerdern · Anpassen · Wechseln) anhand von Beispielen voneinander abgrenzen,',
                    erkennbar: 'was daran erkennbar wird, dass jede Strategie mit einem Beispiel klar zugeordnet werden kann.', afb: 'II', differenziert: false },
                  { tz: 'SuS entwickeln drei konkrete Loesungsschritte fuer Lena,',
                    indem: 'indem sie pro Faecher-Feld mindestens einen Schritt formulieren (Foerdern: LRS-Training · Anpassen: digitale Kasse mit Sprachfunktion · Wechseln: Backstube statt Verkauf),',
                    erkennbar: 'was daran erkennbar wird, dass die Loesungsschritte realistisch und konkret sind (keine Phantasie-Loesungen).', afb: 'III', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS bewerten die Strategien gegeneinander,',
                    indem: 'indem sie eine Vor-Nachteile-Tabelle pro Strategie anlegen und eine begruendete Empfehlung fuer Lena geben,',
                    erkennbar: 'was daran erkennbar wird, dass die Empfehlung mit mindestens zwei Argumenten gestuetzt wird (z.B. Aufwand · Erfolgswahrscheinlichkeit · Lenas Interesse).', afb: 'III', differenziert: true },
                ],
                p01: '3\' · Hinführung / Vorwissensaktivierung: »Letzte Stunde (UE 5) habt ihr Lenas Matrix erstellt.« Wortkarten »Anforderung · Staerke · Diskrepanz« reaktivieren.',
                p02: '3\' · Problemstufe: »Eine Diskrepanz war besonders schwer: Lena hat LRS — aber im Verkauf muss man schnell Preise lesen und Bestellungen aufnehmen.« Tafel: Lenas Diskrepanz-Karte hochhalten. »Heisst das, Lena kann den Beruf NICHT machen? Muss sie ihren Wunschberuf aufgeben?« Lebenserfahrung problematisieren.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute lernt ihr DREI Strategien fuer den Umgang mit Diskrepanzen: Foerdern · Anpassen · Wechseln (Prozesskompetenz Beurteilen + Handeln).«',
                p04: '2\' · Vermutungen: »Was wuerdet IHR Lena raten?« — Tafel-Sammlung der SuS-Ideen unbewertet.',
                p05: '3\' · Lösungsplanung / Teilintentionen: Tafel »Strategie-Faecher« mit drei Feldern. Beispiele kurz vorstellen (Foerdern · Anpassen · Wechseln). Arbeitsplan: 3er-Gruppen · 12\' Bearbeitung · Strategie-Karten als Material.',
                p06: '12\' · Lösung (Hauptphase): 3er-Gruppen entwickeln pro Strategie mindestens einen Loesungsschritt fuer Lena. Strategie-Karten geben Anregungen (z.B. »LRS-Foerderung in der Berufsschule« · »Sprach-Kasse« · »Backstube«). Foerderkatalog Unterfranken (regional) liegt aus. L als Berater · Differenzierung Bild-Symbole (DaZ) · 14pt + Audio (LRS) · Vorgabe-Schritte (leistungsschwach) · Vor-Nachteile-Tabelle (leistungsstark).',
                p07: '4\' · Präsentation: Jede Gruppe stellt einen Loesungsschritt vor (je 2\') · L baut den Strategie-Faecher an der Tafel auf. SuS als Experten ihrer Strategie.',
                p08: '4\' · Erkenntnisstufe / Problembeurteilung: Begriffsarbeit »Strategie-Faecher« — drei grundsaetzliche Wege: (1) ICH passe mich an = Foerdern · (2) Die Anforderung passt sich an = Anpassen · (3) Anderer Beruf-Schwerpunkt = Wechseln. Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Welche Strategie waere fuer EUCH die schwierigste — welche die leichteste? Warum?« Persoenliche Stellungnahme · Reflexion eigener Lernbiografie (»Wo musste ich schon mal foerdern · anpassen · wechseln?«).',
                p10: '1\' · Gesamtzusammenfassung: »Diskrepanz ist nicht das Ende — sie ist der Anfang einer Strategie.« SuS verbalisieren.',
                p11: '1\' · Vermutungen prüfen: Rueckblick — welche SuS-Idee aus Phase 4 passt in welches Faecher-Feld? Was war vorher schon richtig?',
                p12: '5\' · Transfer: »Welche Strategie ist fuer Lena am realistischsten? Welche waere ein Plan B?« Begruendete Empfehlung. Anschliessend Anwendung auf zweite Diskrepanz (eigenes Profil).',
                p13: '3\' · Sicherung: Hefteintrag »Strategie-Faecher: Foerdern · Anpassen · Wechseln« · Strategie-Karten in Berufswahlportfolio · Reflexion · HA: »Schaut bis Montag in EURE Matrix aus UE 5: Welche Diskrepanz koenntet IHR mit einer Strategie loesen?«',
                phasen_minuten: { p01: 3, p02: 3, p03: 1, p04: 2, p05: 3, p06: 12, p07: 4, p08: 4, p09: 3, p10: 1, p11: 1, p12: 5, p13: 3 },
                sozialform_phasen: {
                  p01: 'Plenum (Reaktivierung)',
                  p02: 'Plenum (Tafel · Lena-Karte) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Tafel-Faecher)',
                  p06: 'GA (3er)',
                  p07: 'Plenum (Galerie)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Wertung)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA (Transfer Plan B)',
                  p13: 'EA (Portfolio) + L-Impuls (HA)',
                },
                differenzierung_block: {
                  daz: 'Strategie-Karten mit Bild-Symbol (Hantel = Foerdern · Schraubenschluessel = Anpassen · Pfeil-Wechsel = Wechseln) · Wortspeicher Diskrepanz · Strategie · Foerderung · Anpassung · 3er-Gruppe DaZ-gemischt.',
                  lrs: 'Lenas eigene LRS-Erfahrung ist Modell — LRS wird hier nicht stigmatisiert sondern bearbeitet · Strategie-Karten in 14pt+ · Foerderkatalog mit Foto-Beispielen · Audio-Aufnahme der Praesentation erlaubt.',
                  leistungsschwach: 'Strategie-Karten mit Vorgabe-Schritten · Auswahl aus drei Strategien je Faecher-Feld · Schreibgeruest fuer Praesentation (Halbsaetze).',
                  leistungsstark: 'Vor-Nachteile-Tabelle pro Strategie anlegen · begruendete Empfehlung fuer Lena mit zwei Argumenten (z.B. Aufwand vs. Erfolgswahrscheinlichkeit) als AFB III · ggf. zweite Diskrepanz aus Lenas Matrix bearbeiten.',
                },
                personifikation_anteil: 'Lenas LRS-Diskrepanz ist Modell-Fall — Lena selbst hat LRS, die SuS arbeiten an ihrem realen Problem. WICHTIG: LRS wird hier nicht als Defizit gerahmt, sondern als loesbare Diskrepanz mit konkreten Strategie-Wegen. Damit wird die Methodik gleichzeitig zur Mut-Botschaft fuer LRS-SuS in der Klasse.',
                tafelbild_skizze: 'Tafel-Faecher mit drei Feldern: links »FOERDERN« (Hantel-Symbol · ich werde besser) · Mitte »ANPASSEN« (Schraubenschluessel-Symbol · Bedingungen aendern) · rechts »WECHSELN« (Pfeil-Symbol · Beruf-Schwerpunkt wechseln). Oben: Lenas Diskrepanz-Karte. Unten: SuS-Loesungsschritte pro Faecher-Feld.',
                hausaufgabe: 'Schaut in eure persoenliche Matrix aus UE 5: Welche Diskrepanz koennt IHR mit einer Strategie loesen? Notiert in eurem Portfolio: »Meine Diskrepanz X · Meine Strategie Y«. Vorbereitung UE 7 (Bewerbungsgespraech).',
                material: 'Lenas Diskrepanz-Karte aus UE 5 · Strategie-Karten (3 Strategien · 8 Beispiel-Karten) · Foerderkatalog Unterfranken (LRS-Trainings · Berufsschule · BvB) · Wortspeicher · Hefteintrag-Schablone Strategie-Faecher',
                lp_bezug: 'KE J8-GB2-01 (Stärken-Schwächen-Profil · Diskrepanz) · Quervernetzung KE J9-GB2-01 (Plan-B-Strategien · Anbahnung)',
                prinzipien_b3: ['Lebensbezug', 'Handlungsorientierung', 'Personifikation', 'Inklusion', 'Lebenslanges Lernen'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Beurteilen (Schwerpunkt) · Handeln',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.4 Vorbereitung auf zukuenftige Rollen · G1.3 Orientierung in sich wandelnder Arbeitswelt',
                didaktik: 'Diskrepanz-Strategien als Anbahnung der Plan-B-Logik (J9-GB2-01 verbatim) · Lena-Modell macht LRS bearbeitbar und nimmt Stigma · Strategie-Faecher (Foerdern · Anpassen · Wechseln) als kanonisches BO-Werkzeug · 13-Phasen-Standard nach Moritz-Steigerwald · besonders sensitive Differenzierung (LRS in Lenas Geschichte ist ZUMUTBAR — nicht entmutigend).'
              },
              // ── UE 7 — Rollenspiel Bewerbungsgespraech (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 7,
                titel: 'Rollenspiel Bewerbungsgespraech · Lenas Vorstellung',
                stundenthema_frage: 'Wie ueberzeugt Lena die Chefin im Bewerbungsgespraech?',
                minuten: 45,
                lernziel: 'SuS fuehren ein Bewerbungsgespraech im Rollenspiel und erhalten Peer-Feedback.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler fuehren ein Bewerbungsgespraech als Rollenspiel in der Rolle Bewerber:in und Chefin und erhalten strukturiertes Peer-Feedback,',
                  bedingung: 'indem sie in 3er-Gruppen (Bewerber:in · Chefin · Beobachter:in) ein 5-Minuten-Gespraech nach drei Standardfragen durchspielen und anschliessend mit einem Beobachterbogen Rueckmeldung geben,',
                  maszstab: 'was daran erkennbar wird, dass jede:r SuS einmal die Bewerber-Rolle uebernommen hat, mindestens drei Standardfragen beantwortet wurden und der Beobachterbogen drei konkrete Beobachtungen (Inhalt · Koerper · Sprache) enthaelt.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS bereiten drei zentrale Antworten vor,',
                    indem: 'indem sie auf die Standardfragen (»Wer bist du?« · »Warum dieser Beruf?« · »Was sind deine Staerken?«) je drei Stichpunkte aus Portfolio (UE 4) und Matrix (UE 5) auswaehlen,',
                    erkennbar: 'was daran erkennbar wird, dass jede der drei Fragen mit Stichpunkten vorbereitet ist.', afb: 'II', differenziert: false },
                  { tz: 'SuS fuehren das Bewerbungsgespraech im Rollenspiel,',
                    indem: 'indem sie als Bewerber:in 5 Minuten auf die drei Standardfragen antworten und als Chefin/Beobachter:in die jeweilige Rolle ausfuellen,',
                    erkennbar: 'was daran erkennbar wird, dass jede der drei Rollen einmal von jede:m SuS uebernommen wurde.', afb: 'III', differenziert: false },
                  { tz: 'SuS geben strukturiertes Peer-Feedback,',
                    indem: 'indem sie mit dem Beobachterbogen (Inhalt · Koerper · Sprache) drei konkrete Beobachtungen formulieren und eine wertschaetzende Rueckmeldung geben,',
                    erkennbar: 'was daran erkennbar wird, dass das Feedback in »ich-Botschaft + Beobachtung + Tipp« formuliert ist (kein pauschales »war gut«).', afb: 'II', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS reagieren auf eine kritische Nachfrage,',
                    indem: 'indem sie als Bewerber:in auf eine kritische Chefin-Frage (z.B. »Sie haben LRS — ist das ein Problem fuer den Kassendienst?«) eine konstruktive Antwort mit Strategie aus UE 6 geben,',
                    erkennbar: 'was daran erkennbar wird, dass die Antwort eine konkrete Strategie (Foerdern/Anpassen) benennt statt zu blocken.', afb: 'III', differenziert: true },
                ],
                p01: '2\' · Hinführung / Vorwissensaktivierung: »Lena hat ihre Strategien aus UE 6. Was hat sie schon — was fehlt noch?« Wortspeicher-Reaktivierung (Anforderung · Staerke · Strategie).',
                p02: '3\' · Problemstufe: »Jetzt kommt der Moment der Wahrheit: Lena sitzt der Baeckerei-Chefin Frau Schmitt gegenueber. Erste Frage: ›Erzaehlen Sie mal, wer Sie sind und warum Baeckerei.‹ Lena hat alles vorbereitet — aber im Gespraech ist alles weg. Worte fehlen. Was kann man dagegen tun?« Lebenserfahrung problematisieren.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute UEBT ihr das Bewerbungsgespraech handelnd — jede:r in jede Rolle: Bewerber:in · Chefin · Beobachter:in (Prozesskompetenz Handeln + Kommunizieren).«',
                p04: '2\' · Vermutungen: »Welche drei Fragen koennen in keinem Bewerbungsgespraech fehlen?« — Tafel-Sammlung der SuS-Vermutungen.',
                p05: '4\' · Lösungsplanung / Teilintentionen: L stellt drei Standardfragen vor (»Wer bist du?« · »Warum dieser Beruf?« · »Staerken/Schwaechen?«) · Rollenkarten ausgeben (Bewerber:in · Chefin · Beobachter:in) · Beobachterbogen erklaeren (3 Felder: Inhalt · Koerper · Sprache) · 3er-Gruppen bilden · jede:r spielt jede Rolle.',
                p06: '15\' · Lösung (Hauptphase): Drei-Runden-Rollenspiel in 3er-Gruppen. Pro Runde 5 Minuten: 5\' Gespraech + Rotation. Bewerber:in beantwortet die drei Standardfragen mit Stichpunkten aus UE 4/5/6. Chefin fragt. Beobachter:in notiert auf Bogen. Differenzierung Antwort-Schablone (DaZ) · Karteikarte als Spickzettel (LRS) · zwei statt drei Fragen (leistungsschwach) · kritische Nachfrage (leistungsstark).',
                p07: '4\' · Präsentation: Eine Gruppe spielt ihr Gespraech vor (freiwillig · 2\') · Lena-Beispiel auf Tafel als Modell-Antwort visualisieren. SuS als Experten ihrer Selbstpraesentation.',
                p08: '3\' · Erkenntnisstufe / Problembeurteilung: Begriffsarbeit »Selbstpraesentation« — strukturierte Antwort (3 Saetze pro Frage: Aussage + Beispiel + Bezug zum Beruf). Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Welche Rolle war fuer euch am schwersten — und warum?« Persoenliche Stellungnahme · Reflexion eigener Sprech-/Auftritts-Erfahrungen.',
                p10: '1\' · Gesamtzusammenfassung: »Ein Bewerbungsgespraech ist kein Verhoer — es ist ein gegenseitiges Kennenlernen, das man UEBEN kann.« SuS verbalisieren.',
                p11: '1\' · Vermutungen prüfen: Rueckblick — kamen die drei Standardfragen aus Phase 4 in eurem Rollenspiel vor? Welche fehlten noch?',
                p12: '4\' · Transfer: »Was waere die zweite Frage, die ihr in EUREM eigenen Wunschberuf-Bewerbungsgespraech vorbereiten muesstet?« Anwendung auf eigenen Beruf · Stichpunkte ins Portfolio.',
                p13: '2\' · Sicherung: Hefteintrag »Bewerbungsgespraech: 3 Fragen · 3 Saetze pro Antwort« · Beobachterbogen ins Portfolio · Reflexion · HA: »Probiert das Rollenspiel zu Hause mit Familie oder Freund:in — eine Runde reicht.«',
                phasen_minuten: { p01: 2, p02: 3, p03: 1, p04: 2, p05: 4, p06: 15, p07: 4, p08: 3, p09: 3, p10: 1, p11: 1, p12: 4, p13: 2 },
                sozialform_phasen: {
                  p01: 'Plenum (Reaktivierung)',
                  p02: 'Plenum (Lena-Szene) + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Rollen-Briefing)',
                  p06: 'GA (3er · Rollenspiel · 3 Rotationen)',
                  p07: 'Plenum (freiwillig)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Wertung)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA (Transfer)',
                  p13: 'EA (Portfolio) + L-Impuls (HA)',
                },
                differenzierung_block: {
                  daz: 'Antwort-Schablone (»Ich heisse ... · Ich will Baecker:in werden, weil ... · Meine Staerken sind ...«) · Wortspeicher Selbstpraesentation · DaZ-faehiges 3er-Tandem · Antwort vorab auf Karteikarte schreiben.',
                  lrs: 'Antwort-Stichpunkte in 14pt+ · Karteikarte als Spickzettel erlaubt · Audio-Aufnahme der eigenen Antwort vorab moeglich · Lena hat selbst LRS — sie zeigt: das geht.',
                  leistungsschwach: 'Nur zwei statt drei Fragen · Antwort-Schablone mit Halbsaetzen · Rollenkarten mit Mustersaetzen · Beobachterbogen mit Ankreuz-Feldern statt Freitext.',
                  leistungsstark: 'Kritische Chefin-Nachfrage einbauen (»Sie haben LRS — wie schaffen Sie das Kassieren?«) · Bewerber:in muss mit Strategie aus UE 6 (Foerdern · Anpassen) reagieren (AFB III).',
                },
                personifikation_anteil: 'Lena als Modell-Bewerberin (Tafel-Szene). Wichtig: Lenas LRS wird in der kritischen Nachfrage aufgegriffen — aber als loesbare Diskrepanz mit Strategie (Anschluss UE 6). Die SuS koennen sich selbst hineinversetzen, da Lenas Lage realistisch ist (nicht idealisiert).',
                tafelbild_skizze: 'Drei-Zonen-Tafel: links Standardfragen (3 Fragen · Karten-Format) · Mitte Lenas Modell-Antwort (3 Saetze pro Frage) · rechts Beobachter-Kriterien (Inhalt · Koerper · Sprache). Oben: Foto-Symbol Baeckerei-Theke.',
                hausaufgabe: 'Probiert das Rollenspiel zu Hause mit Familie oder einem Freund: eine Runde der drei Standardfragen. Notiert eure Erfahrung in 3 Saetzen ins Portfolio.',
                material: 'Rollenkarten Bewerber:in + Chefin + Beobachter:in (3 Saetze pro Karte) · Beobachterbogen (Inhalt · Koerper · Sprache) · Standardfragen-Liste · Lenas Modell-Antwort als Tafel-Vorlage · Karteikarten fuer eigene Stichpunkte · Wortspeicher Selbstpraesentation',
                lp_bezug: 'KE J8-GB2-02 (Betriebspraktikum-Vorbereitung · Bewerbung) · Quervernetzung J9-GB2-01 (Bewerbungsphase)',
                prinzipien_b3: ['Handlungsorientierung', 'Methodencurriculum (Rollenspiel)', 'Personifikation', 'Praxisorientierung', 'Lebensbezug'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Handeln (Schwerpunkt) · Kommunizieren (Schwerpunkt)',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.6 Handlungsorientierte Lernmethoden · G1.4 Vorbereitung auf zukuenftige Rollen',
                didaktik: 'Rollenspiel als kanonische BO-Methode (Leitfaden_Methoden_GB) · Drei-Rotations-Prinzip sichert dass jede:r SuS in jede Rolle kommt · Lena-Modell schafft Identifikation auch fuer Bewerbungsangst-Faelle · LRS-Nachfrage als AFB-III-Differenzierung greift den Lena-Faden aus UE 6 auf · 13-Phasen-Standard nach Moritz-Steigerwald.'
              },
              // ── UE 8 — Transfer Mein Berufswahlplan-Update (voll ausgearbeitet · 13 Phasen) ──
              {
                nr: 8,
                titel: 'Transfer · Mein Berufswahlplan-Update',
                stundenthema_frage: 'Was nehme ICH aus Lenas Geschichte mit fuer meinen Weg?',
                minuten: 45,
                lernziel: 'SuS uebertragen die Sequenz-Erkenntnisse auf ihren eigenen Berufswahlplan und aktualisieren das Portfolio.',
                lernziel_stundenziel: {
                  verhalten: 'Die Schuelerinnen und Schueler uebertragen die Sequenz-Schritte von Lena auf den eigenen Berufswahlweg und aktualisieren ihren Berufswahlplan im Portfolio,',
                  bedingung: 'indem sie analog zu Lena ein Update-Blatt mit fuenf Feldern (Wunschberuf · Anforderungen · Staerken · Diskrepanz · Naechster Schritt) ausfuellen und im Sitzkreis ihren Plan vorstellen,',
                  maszstab: 'was daran erkennbar wird, dass alle fuenf Felder mit eigenen Stichpunkten gefuellt sind und der naechste konkrete Schritt mit Zeitangabe (z.B. »Praktikumssuche bis Herbstferien«) benannt wird.'
                },
                lernziel_teilziele: [
                  { tz: 'SuS rekapitulieren Lenas Sequenz-Weg,',
                    indem: 'indem sie an einer Tafel-Zeitleiste die sieben Stationen UE 1-7 benennen,',
                    erkennbar: 'was daran erkennbar wird, dass alle sieben Stationen mit einem Lena-Befund (z.B. UE5 Matrix · LRS-Diskrepanz) verknuepft sind.', afb: 'I', differenziert: false },
                  { tz: 'SuS uebertragen die Sequenz-Logik auf den eigenen Berufswahlweg,',
                    indem: 'indem sie das Update-Blatt mit eigenem Wunschberuf · eigenen Anforderungen · eigenen Staerken · eigener Diskrepanz fuellen,',
                    erkennbar: 'was daran erkennbar wird, dass alle fuenf Felder mit eigenen Stichpunkten (kein Lena-Eintrag) gefuellt sind.', afb: 'III', differenziert: false },
                  { tz: 'SuS formulieren einen konkreten naechsten Schritt,',
                    indem: 'indem sie eine konkrete Handlung mit Zeit-Anker benennen (»Praktikumssuche bis 30.10.« · »Eltern-Gespraech am Wochenende« · »BERUFENET-Recherche am Freitag«),',
                    erkennbar: 'was daran erkennbar wird, dass der Schritt mit Datum/Zeitfenster versehen ist.', afb: 'III', differenziert: false },
                  { tz: '[Differenziert / leistungsstark] SuS reflektieren die Sequenz-Methodik kritisch,',
                    indem: 'indem sie eine Frage formulieren, die Lenas Methodik fuer ihren Weg NICHT loest (z.B. »Was, wenn ich noch keinen Wunschberuf habe?«) und eine ergaenzende Strategie vorschlagen,',
                    erkennbar: 'was daran erkennbar wird, dass die Kritik konstruktiv ist und einen Loesungsweg (z.B. Berufsfeld-Inventur · Praktikum-Schnupperwoche) benennt.', afb: 'III', differenziert: true },
                ],
                p01: '3\' · Hinführung / Vorwissensaktivierung: »Wir kommen am Ende der Lena-Sequenz an. Acht Stunden lang haben wir Lena begleitet — Stellenanzeige · Berufsbild · Staerken · Matrix · Diskrepanz · Bewerbung.« Tafel-Zeitleiste der sieben UEs visualisieren.',
                p02: '3\' · Problemstufe: »Lena hat ihren Weg gefunden. Aber ihr seid nicht Lena. Wie uebertragt IHR diese Schritte auf EUREN eigenen Beruf — wenn ihr noch nicht so sicher seid wie sie?« Lebenserfahrung problematisieren — der eigene Plan ist nicht Lenas Plan.',
                p03: '1\' · Problemformulierung / Zielangabe: »Heute aktualisiert jede:r SEIN Berufswahlportfolio nach Lenas Logik — mit eigenen Eintraegen (Prozesskompetenz Beurteilen + Handeln).«',
                p04: '2\' · Vermutungen: »Was muss am Ende einer guten Berufswahl-Stunde-Reihe in EUREM Portfolio stehen?« — Tafel-Sammlung unbewertet.',
                p05: '2\' · Lösungsplanung / Teilintentionen: L stellt das Update-Blatt mit fuenf Feldern vor (Wunschberuf · Anforderungen · Staerken · Diskrepanz · Naechster Schritt). Lenas Modell-Update als Vorlage hochhalten. WAS-WOZU-WIE klären. Arbeitsauftrag: EA · 13\' · dann Sitzkreis-Vorstellung.',
                p06: '13\' · Lösung (Hauptphase): EA — jede:r SuS fuellt das Update-Blatt aus. Quellen liegen vor: eigenes Portfolio (Eintraege aus UE 1-7) · BERUFENET-Recherche aus UE 3 HA · Selbst-Fremd-Bilder aus UE 4 · Matrix-Logik aus UE 5 · Strategien aus UE 6. L als individueller Berater · Differenzierung Bild-Symbole (DaZ) · Foto-Sequenz (LRS) · Schreibgeruest (leistungsschwach) · Methoden-Reflexion (leistungsstark).',
                p07: '5\' · Präsentation: Sitzkreis — jede:r SuS stellt in 30 Sekunden den eigenen naechsten Schritt vor (Reihum · keine Diskussion · nur wertschaetzendes Hoeren). SuS als Experten ihres Berufswahlplans.',
                p08: '4\' · Erkenntnisstufe / Problembeurteilung: Begriffsarbeit »Berufswahlplan« als persoenliche Roadmap mit Selbst-Wissen + Anforderungs-Wissen + naechstem konkretem Schritt. Definition ins Heft. Fachsprache.',
                p09: '3\' · Wertungsstufe: »Was ist anders in eurem Plan als in Lenas? Wo seid ihr weiter — wo noch nicht? Das ist okay.« Persoenliche Stellungnahme · Reflexion eigener Stand.',
                p10: '1\' · Gesamtzusammenfassung: »Berufswahl ist ein Prozess mit konkreten Schritten — wir kennen jetzt die Methodik.« SuS verbalisieren.',
                p11: '2\' · Vermutungen prüfen: Rueckblick UE 1 (»Was braucht Lena?«) — kommt eure jetzige Antwort zur damaligen Vermutung dazu? Was hat sich verschoben?',
                p12: '5\' · Transfer: »Der naechste Schritt ist KEIN Schul-Ding — er ist EUER Schritt. Wann setzt ihr ihn um?« Konkretisierung der HA mit Datum. Anwendung Lenas-Methodik im Alltag.',
                p13: '1\' · Sicherung: Update-Blatt unterzeichnen + ins Portfolio · Hefteintrag »Mein Berufswahlplan: 5 Felder + konkreter Schritt« · Reflexion Lernzuwachs der gesamten Sequenz.',
                phasen_minuten: { p01: 3, p02: 3, p03: 1, p04: 2, p05: 2, p06: 13, p07: 5, p08: 4, p09: 3, p10: 1, p11: 2, p12: 5, p13: 1 },
                sozialform_phasen: {
                  p01: 'Plenum (Tafel-Zeitleiste)',
                  p02: 'Plenum + L-Erzählung',
                  p03: 'L-Plenum (Tafel)',
                  p04: 'UG (Tafel-Sammlung)',
                  p05: 'L-Plenum (Update-Blatt-Vorstellung)',
                  p06: 'EA',
                  p07: 'Sitzkreis (reihum)',
                  p08: 'UG (Begriffsarbeit)',
                  p09: 'UG (Reflexion)',
                  p10: 'UG (Sammlung)',
                  p11: 'UG (Vermutungs-Check)',
                  p12: 'EA + L-Impuls (Transfer)',
                  p13: 'EA (Portfolio · Unterschrift)',
                },
                differenzierung_block: {
                  daz: 'Update-Blatt mit Bildsymbol pro Feld · Wortspeicher Wunschberuf · Anforderung · Staerke · Diskrepanz · Schritt · Sitzkreis mit Karten-Optionen.',
                  lrs: 'Update-Blatt in 14pt+ · Stichworte statt Saetze · Foto-Sequenz erlaubt · Sitzkreis-Vorstellung kann auf Karte vorbereitet werden.',
                  leistungsschwach: 'Update-Blatt mit Schreibgeruest (Halbsaetze) · Auswahl aus 5 vorgegebenen naechsten Schritten · Sitzkreis-Beitrag auf 2 Saetze reduziert.',
                  leistungsstark: 'Methoden-Reflexion: Welche Frage loest Lenas Methodik fuer EUREN Weg NICHT? Ergaenzende Strategie vorschlagen (AFB III).',
                },
                personifikation_anteil: 'Lena als Spiegel — nicht als Vorlage. Wichtig: SuS sollen sich NICHT mit Lena identifizieren, sondern Lenas METHODIK adaptieren. Lena ist Modell-Subjekt, nicht Vorbild. Lenas Plan steht als Vorlage da · die SuS schreiben IHREN eigenen Plan.',
                tafelbild_skizze: 'Tafel-Zeitleiste mit 7 Stationen UE 1-7 (Symbole: Anzeige · BERUFENET · Staerken-Spiegel · Matrix · Faecher · Bewerbung). Unten: Update-Blatt mit fuenf Feldern als Vorlage. Rechts: Lenas Modell-Eintrag als Beispiel · daneben Platz fuer SuS-Eintrag.',
                hausaufgabe: 'Setzt euren konkreten naechsten Schritt um — und notiert in 3 Saetzen ins Portfolio, wie es gelaufen ist. Naechste UE (KW 13): Praktikumsvorbereitung Teil 1.',
                material: 'Update-Blatt mit fuenf Feldern (DIN A4) · Lenas Modell-Update als Tafel-Vorlage · Berufswahlportfolio · Sitzkreis-Vorbereitung · Wortspeicher · Hefteintrag-Schablone',
                lp_bezug: 'KE J8-GB2-01 (Berufswahlportfolio-Pflege · Anforderungsprofile) · Anschluss J7-GB2-01 (Portfolio Anbahnung) · Vorbereitung J8-GB2-02 (Betriebspraktikum)',
                prinzipien_b3: ['Schuelerorientierung', 'Lebensbezug', 'Reflexion', 'Selbststeuerung', 'Personifikation'],
                kompetenzstruktur: {
                  gegenstand: 'Berufsorientierung',
                  perspektive: 'Berufswähler:in (ergänzte Rolle nach Köck 2021)',
                  prozesskompetenz: 'Beurteilen (Schwerpunkt) · Handeln',
                },
                kernintention_wib: 'G1.7 Berufswahlreife · G1.4 Vorbereitung auf zukuenftige Rollen · G1.6 Handlungsorientierte Lernmethoden',
                didaktik: 'Transfer-Stunde als Sequenz-Abschluss · Update-Blatt mit fuenf Feldern als kanonisches Portfolio-Werkzeug · Sitzkreis als wertschaetzende Vorstellungsform (kein Beurteilungs-Druck) · Lena als Spiegel-Funktion (Methodik adaptieren, nicht kopieren) · 13-Phasen-Standard nach Moritz-Steigerwald · Anschluss zur Betriebspraktikums-Sequenz J8-GB2-02.'
              },
            ],
            bezuege_global: [
              { didaktik: 'Kompetenzorientierung (Köck 2021 + LP+ Bayern WiB)', verweis: 'Stunde ist auf Bewältigung von Anforderungen (Berufswahlentscheidung) ausgerichtet, nicht auf Wissensaufbau. Audit-Dimension A.' },
              { didaktik: 'KSM-Passung (LP+ Fachprofil WiB)', verweis: 'Primäre Perspektive Berufswähler:in (ergänzt nach Köck 2021) durchgängig. Gegenstandsbereich Berufsorientierung als Schwerpunkt. Beurteilen als zentrale prozessbezogene Kompetenz. Audit-Dimension B.' },
              { didaktik: '13-Phasen-Artikulation (Bausteinskript Moritz-Steigerwald · Unterfranken)', verweis: 'Primärquelle: Baustein GB »Planung von Unterrichtseinheiten im Fach WiB« (Moritz-Steigerwald, SRin · AG der MS-Seminarleiter:innen Unterfranken). Phase 3 macht prozessbezogene Kompetenz transparent. Phase 6 ist Hauptphase mit Differenzierung. Phase 9 Wertungsstufe mit persönlicher Reflexion. Phasen 10-13 sichern Lernerfolg + Transfer. Audit-Dimension C.' },
              { didaktik: 'Methodenmatrix Berufsorientierung (Leitfaden_Methoden_Gegenstandsbereiche)', verweis: 'UE 2 Stellenanzeigen-Analyse · UE 3 Berufsbild-Auswertung BERUFENET · UE 4 Portfolioarbeit · UE 7 Rollenspiel Bewerbungsgespräch. Alle kanonisch fuer den Gegenstandsbereich Berufsorientierung.' },
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
          fundort: 'WiB-Anleitungen Jgst. 8' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Praktikum vorbereiten (5 UEs · BO J8)',
          ues: [
            { nr: 1, titel: 'Praktikum verstehen', inhalt: 'Was unterscheidet Praktikum von Erkundung J7? Berichte ehemaliger SuS · Foto · Video. Erwartungen sammeln.' },
            { nr: 2, titel: 'Praktikumsplatz finden + bewerben', inhalt: 'BERUFENET · Eltern-Netzwerk · Initiativbewerbung. Anschreiben + Lebenslauf entwickeln (Vorlage).' },
            { nr: 3, titel: 'Erkundungsfragen + Beobachtungsplan', inhalt: 'Was moechte ICH herausfinden? 3 Forschungsfragen + Praktikumstagebuch-Vorlage.' },
            { nr: 4, titel: 'Verhaltensregeln + Sicherheit', inhalt: 'JArbSchG-Wiederholung J7. Praktikums-Knigge: Puenktlichkeit · Schutzkleidung · Fragen stellen.' },
            { nr: 5, titel: 'Sicherung + Notfall-Plan', inhalt: 'Was bei Problemen? Praktikumsbeauftragte · Eltern · Lehrkraft. Vorbereitungs-Sicherung.' }
          ],
          bezuege: [
            { didaktik: 'Realbegegnung Praktikum (LP+ WiB)', verweis: 'Praktikum als Hoehepunkt MS-Berufsorientierung.' },
            { didaktik: 'Berufswahlpass (KMK 2008)', verweis: 'Vorbereitete Materialien fliessen ins Portfolio.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinfuehrung · UE 2-3 Planung · UE 4 Erkenntnis · UE 5 Sicherung.' }
          ]
        },
        { ke_id: 'J8-GB2-03', thema: 'Betriebspraktikum auswerten',
          ke_wortlaut: 'werten ihr Betriebspraktikum strukturiert aus und integrieren die Erfahrungen in das Berufswahlportfolio.',
          ke_wortlaut_quelle: 'WiB-Anleitungen',
          inhalte_lp: ['Praktikumsbericht · Reflexionsbogen · Portfolio-Update · Praktikumspraesentation'],
          fundort: 'WiB-Anleitungen Jgst. 8' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Praktikum auswerten (4 UEs · BO J8 Reflexion)',
          ues: [
            { nr: 1, titel: 'Praktikums-Erfahrungen sammeln', inhalt: 'Sitzkreis: Jede:r SuS erzaehlt 3 Eindruecke vom Praktikum. Sammlung auf Plakat: positive/negative/ueberraschende.' },
            { nr: 2, titel: 'Praktikumsbericht schreiben', inhalt: 'Strukturvorlage: Betrieb · Taetigkeiten · Anforderungen · Stimmung · Eigene Bewertung. 2-3 Seiten.' },
            { nr: 3, titel: 'Praesentation in der Klasse', inhalt: 'Jede:r praesentiert 3 Min: Mein Praktikum. Mit Foto/Skizze/Material. Klassen-Resonanz.' },
            { nr: 4, titel: 'Sicherung + Portfolio-Update', inhalt: 'Reflexionsbogen: Was nehme ich fuer meine Berufswahl mit? Berufswahlpass-Eintrag aktualisieren.' }
          ],
          bezuege: [
            { didaktik: 'Reflexion + Transfer (Roth-Lernstufen)', verweis: 'Roth-Stufe 6 Bereitstellen fuer kuenftige Berufswahl.' },
            { didaktik: 'Berufswahlpass-Synthese', verweis: 'Praktikum als zentraler Portfolio-Beitrag J8.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinfuehrung · UE 2-3 Wertung+Praesentation · UE 4 Sicherung+Transfer.' }
          ]
        },
      ],
    },
    'J8_GB3': { ke_anzahl: 1, jgst: 'J8', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB3-01', thema: 'Haushaltsplan erstellen',
          ke_wortlaut: 'erstellen einen einfachen Haushaltsplan und treffen begründete Konsumentscheidungen.',
          ke_wortlaut_quelle: 'Lernziele_WiB_Leitfaden Beispiel 2',
          inhalte_lp: ['Einnahmen · Ausgaben · Tabellenkalkulation · Spar-Konsum-Balance · Konsumentscheidungen begruenden'],
          fundort: 'Lernziele_WiB_Leitfaden · Z. 59-64 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Markt und Preisbildung (4 UEs · Wirtschaft J8)',
          ues: [
            { nr: 1, titel: 'Klassen-Markt simulieren', inhalt: 'Rollenspiel: 5 Anbieter und 5 Nachfrager handeln Spielwaren. Preise bilden sich frei. Beobachtung: Wo entstehen die Preise?' },
            { nr: 2, titel: 'Angebot + Nachfrage', inhalt: 'Diagramm zeichnen: Preis hoch → Angebot hoch · Preis niedrig → Nachfrage hoch. Schnittpunkt = Gleichgewichtspreis.' },
            { nr: 3, titel: 'Realbeispiele Preisbildung', inhalt: 'Erdbeeren im Sommer billig, im Winter teuer — warum? Benzinpreis schwankt — warum? SuS analysieren in Gruppen.' },
            { nr: 4, titel: 'Sicherung Marktmodell', inhalt: 'Hefteintrag Angebot-Nachfrage-Diagramm. Reflexion: Welche Faktoren beeinflussen den Preis? Konsumenten-Tipps.' }
          ],
          bezuege: [
            { didaktik: 'Modell-Methode (WiB GB Wirtschaft)', verweis: 'Angebot-Nachfrage-Modell als zentrales Werkzeug.' },
            { didaktik: 'Konsumenten-Rolle (LP+)', verweis: 'UE 3-4 Konsumenten-Anker.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Hinführung · UE 2 Erkenntnis · UE 3 Wertung · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J8_GB4': { ke_anzahl: 1, jgst: 'J8', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB4-01', thema: 'Arbeitssicherheit am Arbeitsplatz',
          ke_wortlaut: 'beschreiben Arbeitsplatzbedingungen aus einer Betriebserkundung und beurteilen Ergonomie und Arbeitsschutz.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 8',
          inhalte_lp: ['Betriebserkundung · Arbeitsplatzbedingungen · Ergonomie · Arbeitsschutz · Unfallverhuetung'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 284 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Werkstoff Kunststoff (5 UEs · Technik J8)',
          ues: [
            { nr: 1, titel: 'Kunststoff im Alltag', inhalt: 'Wo ist Kunststoff? Welche Sorten? PET-Flasche · PVC-Rohr · PE-Tüte. Eigenschaften vs Metall/Holz.' },
            { nr: 2, titel: 'Bearbeitungstechniken', inhalt: 'Sägen · Bohren · Biegen mit Wärme. Werkstattregeln (Schmelzdämpfe).' },
            { nr: 3, titel: 'Werkstück planen', inhalt: 'Acrylglas-Bilderrahmen oder PET-Vase. Skizze · Plan.' },
            { nr: 4, titel: 'Werkstück fertigen', inhalt: 'Bearbeitungsschritte umsetzen. Sicherheitskontrollen.' },
            { nr: 5, titel: 'Bewertung + Umweltbezug', inhalt: 'Selbstreflexion Qualität. Diskussion Kunststoff + Umwelt: Recycling, Vermeidung, Mikroplastik. Verbraucherbildungs-Anker.' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'Werkstück-Sequenz als Standard.' },
            { didaktik: 'Spiralprinzip (Bruner)', verweis: 'Holz J6 → Metall J7 → Kunststoff J8 → komplex J9.' },
            { didaktik: 'Nachhaltigkeit (LP+ Querschnitt)', verweis: 'UE 5 Umwelt-Bezug = Mündigkeit (Klafki Schlüsselproblem Umwelt).' }
          ]
        },
      ],
    },
    'J8_GB5': { ke_anzahl: 1, jgst: 'J8', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-GB5-01', thema: 'Ausbildungsvertrag und BBiG',
          ke_wortlaut: 'erklaeren Rechte und Pflichten im Ausbildungsverhaeltnis und wenden Bestimmungen des Berufsbildungsgesetzes auf Fallbeispiele an.',
          ke_wortlaut_quelle: 'Lernziele_WiB_Leitfaden Beispiel 5',
          inhalte_lp: ['Ausbildungsvertrag · Berufsbildungsgesetz (BBiG) · Rechte/Pflichten Auszubildende · Jugendarbeitsschutzgesetz · Fallstudien'],
          fundort: 'Lernziele_WiB_Leitfaden · Z. 70-75 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Verbraucherrechte (4 UEs · Recht J8)',
          ues: [
            { nr: 1, titel: 'Mein Recht beim Kauf', inhalt: 'Fallimpuls: SuS kaufen ein Handy, es geht nach 3 Wochen kaputt. Was tun? Klassen-Vermutungen.' },
            { nr: 2, titel: 'Gewährleistung + Garantie', inhalt: 'Unterschied klären: Gewährleistung (gesetzlich · 2 Jahre) vs. Garantie (freiwillig · Hersteller). Verbraucherzentrale-Materialien.' },
            { nr: 3, titel: 'Reklamation üben', inhalt: 'Rollenspiel Reklamation: SuS gehen ins Geschäft, Lehrkraft = Verkäuferin. SuS argumentieren mit Gewährleistung.' },
            { nr: 4, titel: 'Sicherung + Beratungsstellen', inhalt: 'Wo bekomme ich Hilfe? Verbraucherzentrale · Schiedsstellen · Schlichtungsstellen. Hefteintrag mit Anlaufstellen-Liste.' }
          ],
          bezuege: [
            { didaktik: 'Verbraucherbildung (LP+ Querschnitt)', verweis: 'Sequenz direkt aus Verbraucherbildungs-Strang.' },
            { didaktik: 'Beutelsbacher Konsens', verweis: 'Realsituation + Rechte aus Verbrauchersicht.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Problem · UE 2 Erkenntnis · UE 3 Handlung · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J8_LB6': { ke_anzahl: 1, jgst: 'J8', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J8-LB6-01', thema: 'Projekt mit Leittextmethode (Vertiefung)',
          ke_wortlaut: 'planen und fuehren ein Projekt mit Leittextmethode durch und dokumentieren ihren Arbeitsprozess.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan',
          inhalte_lp: ['Leittextmethode (M-Klassen verbindlich) · vollstaendige Handlung · Dokumentation Arbeitsprozess · Praesentation'],
          fundort: 'Aufbau-Fachlehrplan-Md' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Praktikumsvorbereitung (5 UEs · Projekt J8)',
          ues: [
            { nr: 1, titel: 'Was erwartet mich im Praktikum?', inhalt: 'Berichte ehemaliger SuS (Foto · Video · Interviews). Was war gut? Was schwierig? Erwartungen sammeln.' },
            { nr: 2, titel: 'Praktikumsplatz finden', inhalt: 'Recherche-Strategie: Eltern · Verwandte · BERUFENET · Initiativbewerbung. SuS arbeiten an konkreten Anschreiben.' },
            { nr: 3, titel: 'Beobachtungsaufträge formulieren', inhalt: 'Was möchte ICH herausfinden? 3 Forschungsfragen pro SuS. Strukturierung als Praktikumstagebuch-Vorlage.' },
            { nr: 4, titel: 'Rechte+Pflichten + Sicherheit', inhalt: 'JArbSchG-Wiederholung J7. Praktikumsrechte (Arbeitszeit, Pausen) + Praktikumspflichten (Pünktlichkeit, Sorgfalt).' },
            { nr: 5, titel: 'Sicherung + Notfallplan', inhalt: 'Was tun bei Problemen? Lehrkraft anrufen, Eltern, Verbraucherzentrale. Praktikumstagebuch wird abgegeben + bewertet.' }
          ],
          bezuege: [
            { didaktik: 'Realbegegnung Praktikum (LP+ WiB-Methode)', verweis: 'Praktikum als Höhepunkt der MS-Berufsorientierung.' },
            { didaktik: 'Berufswahlpass (KMK 2008)', verweis: 'Praktikum dokumentiert + reflektiert im Portfolio.' },
            { didaktik: 'Vollständige Handlung', verweis: 'UE 1-5 decken Schritte Informieren · Planen · Entscheiden ab — Praktikum = Ausführung+Bewerten.' }
          ]
        },
      ],
    },

    // ─── J9 ─────────────────────────────────────────────────────────────
    'J9_GB1': { ke_anzahl: 1, jgst: 'J9', gb: 'GB1', gb_titel: 'Arbeit', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB1-01', thema: 'Arbeitsmarkt und Berufsausbildung im Wandel',
          ke_wortlaut: 'analysieren Veraenderungen des Arbeitsmarkts (Digitalisierung · Globalisierung) und beurteilen ihre Auswirkungen auf eigene Berufschancen.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt »Arbeitsbedingungen im Wandel«',
          inhalte_lp: ['Digitalisierung · Globalisierung · Strukturwandel · Berufschancen · Weiterbildung'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 30-50 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Arbeitsmarkt im Wandel (4 UEs · Arbeit J9)',
          ues: [
            { nr: 1, titel: 'Berufe verschwinden, Berufe entstehen', inhalt: 'Zeitleiste 1900-2025: Welche Berufe gab es früher, gibt es heute nicht mehr (Pferdekutscher · Schreibmaschinist · Setzer)? Welche sind neu (App-Entwicklerin · Drohnen-Pilotin)?' },
            { nr: 2, titel: 'Treiber des Wandels', inhalt: 'Technisierung · Digitalisierung · Globalisierung · demographischer Wandel · Nachhaltigkeit. Karten-Übung: Welcher Treiber führt zu welchem Wandel?' },
            { nr: 3, titel: 'Folgen für meine Berufswahl', inhalt: 'Welche Berufe sind in 10 Jahren noch da? Recherche BERUFENET + IHK-Prognosen. Diskussion: lebenslanges Lernen als Antwort.' },
            { nr: 4, titel: 'Sicherung + Berufswahl-Bezug', inhalt: 'Hefteintrag: 5 Lehren aus dem Wandel für meine Berufswahl. Eintrag in Berufswahlpass.' }
          ],
          bezuege: [
            { didaktik: 'Lebenslange Berufsorientierung', verweis: 'UE 3-4 schlagen Brücke zum Erwachsenenleben.' },
            { didaktik: 'Mündigkeit (Klafki)', verweis: 'Wandel der Arbeitswelt als Schlüsselproblem.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Problem · UE 2 Erkenntnis · UE 3 Wertung · UE 4 Sicherung.' }
          ]
        },
      ],
    },
    'J9_GB2': { ke_anzahl: 1, jgst: 'J9', gb: 'GB2', gb_titel: 'Berufsorientierung', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB2-01', thema: 'Berufswahl-Entscheidung treffen',
          ke_wortlaut: 'treffen eine begruendete Berufswahl-Entscheidung und bereiten den Uebergang in Ausbildung/weitere Schullaufbahn vor.',
          ke_wortlaut_quelle: 'WiB-Anleitungen Jgst. 9',
          inhalte_lp: ['Bewerbungsphase · Ausbildungsplatzsuche · Schullaufbahn-Alternativen · Plan-B-Strategien'],
          fundort: 'WiB-Anleitungen Jgst. 9' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Berufswahl-Entscheidung treffen (5 UEs · BO J9 + Bewerbung)',
          ues: [
            { nr: 1, titel: 'Entscheidungs-Inventur', inhalt: 'Was weiß ich über mich (Stärken J7, Praktikum J8)? Was weiß ich über Berufe (Berufsfelder J6, Anforderungsprofile J8)? Sichten + abgleichen.' },
            { nr: 2, titel: 'Top-3 Berufe begründen', inhalt: 'Jede:r SuS wählt 3 Wunschberufe + begründet schriftlich mit Stärken-Anker. Partner-Feedback.' },
            { nr: 3, titel: 'Bewerbungsmappe', inhalt: 'Anschreiben · Lebenslauf · Zeugnisse · Berufswahlpass-Auszüge. Word-Vorlage am Computer.' },
            { nr: 4, titel: 'Bewerbungsgespräch üben', inhalt: 'Rollenspiel: SuS bewerben sich, Klasse + Lehrkraft als Personalauswahl. Feedback-Bogen.' },
            { nr: 5, titel: 'Sicherung + Versandbereit', inhalt: 'Bewerbungen werden tatsächlich verschickt (Praktikum/Ausbildung). Realhandeln.' }
          ],
          bezuege: [
            { didaktik: 'Realhandeln (Petrik)', verweis: 'UE 5 echte Bewerbung verschicken.' },
            { didaktik: 'Berufswahlpass-Synthese', verweis: 'UE 1 nutzt 5 Jahre Portfolio-Material.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Inventur · UE 2 Wertung · UE 3-4 Lösung · UE 5 Handlung+Sicherung.' }
          ]
        },
      ],
    },
    'J9_GB3': { ke_anzahl: 1, jgst: 'J9', gb: 'GB3', gb_titel: 'Wirtschaft', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB3-01', thema: 'Nachhaltiges Wirtschaften',
          ke_wortlaut: 'beurteilen Konzepte nachhaltigen Wirtschaftens und entwickeln eigene Vorschläge zur Verbindung von Oekonomie und Oekologie.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt Nachhaltige Wirtschaft',
          inhalte_lp: ['Nachhaltigkeit · Oekonomie vs. Oekologie · Geschaeftsmodelle · Pro-Contra-Debatte'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 70 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Nachhaltiges Wirtschaften (4 UEs · Wirtschaft J9)',
          ues: [
            { nr: 1, titel: 'Was heißt nachhaltig?', inhalt: 'Drei-Säulen-Modell: ökologisch · ökonomisch · sozial. Beispiele suchen: nachhaltige Produkte, nachhaltige Unternehmen.' },
            { nr: 2, titel: 'Mein Konsum unter der Lupe', inhalt: 'Tagebuch 1 Woche: Was kaufe ich? Woher kommt es? Wie viel CO2? Apps wie Codecheck nutzen.' },
            { nr: 3, titel: 'Unternehmensverantwortung', inhalt: 'Beispiele: Patagonia · Fairphone · regionale Bäckerei. Was machen die anders? Klassendiskussion.' },
            { nr: 4, titel: 'Sicherung + Handlungs-Ideen', inhalt: 'Hefteintrag Drei-Säulen-Modell. Klassen-Aktion: konkreter Schritt zum nachhaltigen Konsum (z.B. Schul-Müll-Reduktion).' }
          ],
          bezuege: [
            { didaktik: 'Nachhaltigkeit (LP+ Querschnitt + BNE)', verweis: 'Bildung für nachhaltige Entwicklung als Querschnittsaufgabe.' },
            { didaktik: 'Mündigkeit (Klafki Schlüsselproblem)', verweis: 'Nachhaltigkeit als Klafki-Schlüsselproblem ersten Rangs.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Erkenntnis · UE 2 Lösungsplanung+Lösung · UE 3 Wertung · UE 4 Sicherung+Handeln.' }
          ]
        },
      ],
    },
    'J9_GB4': { ke_anzahl: 1, jgst: 'J9', gb: 'GB4', gb_titel: 'Technik', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB4-01', thema: 'Technikeinsatz im Projekt · Grenzen technischer Machbarkeit',
          ke_wortlaut: 'beurteilen den Technikeinsatz im Projekt und reflektieren Grenzen technischer Machbarkeit.',
          ke_wortlaut_quelle: 'QM-Rahmen Technik-Progression Jgst. 9',
          inhalte_lp: ['Technikeinsatz Projekt · Grenzen technischer Machbarkeit · Energiekonzept Schule (Projektbeispiel)'],
          fundort: 'QM_WiB_Evaluationsrahmen · Z. 285 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Technikeinsatz im Projekt + Grenzen (5 UEs · Technik J9)',
          ues: [
            { nr: 1, titel: 'Technik-Auftrag analysieren', inhalt: 'Klassen-Auftrag: technisches Produkt entwickeln (z.B. Solar-Lampe). Anforderungen + Grenzen sammeln.' },
            { nr: 2, titel: 'Materialwahl + Planung', inhalt: 'Welche Werkstoffe (Holz J6 · Metall J7 · Kunststoff J8 · Elektronik)? Skizze + technische Zeichnung.' },
            { nr: 3, titel: 'Fertigung mit Werkstoffwechsel', inhalt: 'Mehrere Werkstoffe kombinieren. Sicherheitskontrollen pro Werkstoff.' },
            { nr: 4, titel: 'Grenzen technischer Machbarkeit', inhalt: 'Was funktioniert? Was nicht? Warum? Vermeidungs- und Anpassungsstrategien.' },
            { nr: 5, titel: 'Bewertung + Reflexion', inhalt: 'Selbsteinschätzung + Klassen-Bewertung. Reflexion: Wo sind technische Grenzen? Lehrjahre-Synthese.' }
          ],
          bezuege: [
            { didaktik: 'Vollständige Handlung (Hacker/Aebli)', verweis: 'Vollumfänglich alle 6 Schritte.' },
            { didaktik: 'Spiralprinzip Werkstoffe', verweis: 'Synthese aus J6-J8.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'Standard-Verlauf erweitert auf 5 UE.' }
          ]
        },
      ],
    },
    'J9_GB5': { ke_anzahl: 1, jgst: 'J9', gb: 'GB5', gb_titel: 'Recht', quelle_status: 'sekundaer',
      kes: [
        { ke_id: 'J9-GB5-01', thema: 'Verbraucherrecht im digitalen Zeitalter',
          ke_wortlaut: 'wenden Verbraucherrechte in digitalen Kontexten (E-Commerce · Plattform-Vertraege) an.',
          ke_wortlaut_quelle: 'Leitfaden-Methoden Projekt Verbraucherrechte',
          inhalte_lp: ['E-Commerce · Widerrufsrecht digital · AGB-Analyse · Plattform-Vertraege · Datenschutz'],
          fundort: 'Leitfaden_Methoden_Gegenstandsbereiche · Z. 130 (sekundär)' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Verbraucherrecht digital (4 UEs · Recht J9)',
          ues: [
            { nr: 1, titel: 'Online kaufen + Datenrecht', inhalt: 'Fallimpuls: SuS bestellt Schuhe online, passen nicht. Was tun? 14 Tage Widerrufsrecht erklärt.' },
            { nr: 2, titel: 'DSGVO + persönliche Daten', inhalt: 'Was sind persönliche Daten? Wer darf was speichern? DSGVO-Eckpunkte. Social-Media-Checks.' },
            { nr: 3, titel: 'Abofallen + Schein-Gewinnspiele', inhalt: 'Beispiele aus dem Internet. Wie erkenne ich Betrug? Verbraucherzentrale-Materialien.' },
            { nr: 4, titel: 'Sicherung + Hilfestellen', inhalt: 'Hefteintrag: 5 Regeln für sicheres Online-Konsumieren. Hilfeangebot Verbraucherzentrale.' }
          ],
          bezuege: [
            { didaktik: 'Verbraucherbildung digital (LP+ Querschnitt)', verweis: 'Aktualisierte Form der Verbraucherbildung.' },
            { didaktik: 'Medienkompetenz (LP+ Querschnitt)', verweis: 'Sequenz aktiviert Medienkompetenz.' },
            { didaktik: '13-Phasen Moritz-Steigerwald', verweis: 'UE 1 Problem · UE 2-3 Erkenntnis · UE 4 Sicherung+Handlung.' }
          ]
        },
      ],
    },
    'J9_LB6': { ke_anzahl: 1, jgst: 'J9', gb: 'LB6', gb_titel: 'Projekt', quelle_status: 'verbatim',
      kes: [
        { ke_id: 'J9-LB6-01', thema: 'Komplexes Projekt — Vorbereitung Projektpruefung',
          ke_wortlaut: 'planen und realisieren ein komplexes Projekt mit Leittextmethode und vollstaendiger Handlung; bereiten damit die Projektpruefung Jgst. 9 vor.',
          ke_wortlaut_quelle: 'LP+ Fachprofil · Aufbau-Fachlehrplan + § 12/4 MSO',
          inhalte_lp: ['Vollstaendige Handlung (Planen · Durchfuehren · Pruefen · Bewerten) · Leittext · Projekt-Dokumentation · Projektpruefung'],
          fundort: 'Aufbau-Fachlehrplan-Md · Z. 20 · § 12/4 MSO Projektpruefung' ,
          umsetzung_typ: 'idealtypisch',
          umsetzung_titel: 'Skizze · Projektpruefung-Vorbereitung (6 UEs · Abschluss-Projekt J9)',
          ues: [
            { nr: 1, titel: 'Projektthema-Auswahl', inhalt: 'Klasse wählt aus 3-5 Themen das Projekt. Themen kommen aus dem WiB-Kontext + Praxisbezug.' },
            { nr: 2, titel: 'Leittext-Methode anwenden', inhalt: 'Leittext mit 6 Schritten: Informieren · Planen · Entscheiden · Ausführen · Kontrollieren · Bewerten. Jede:r SuS bekommt Leittext.' },
            { nr: 3, titel: 'Planung + Materialliste', inhalt: 'Was brauchen wir? Wer macht was? Wann? Was kostet das?' },
            { nr: 4, titel: 'Durchführung in Teams', inhalt: 'Praxisphase mit Lehrkraft als Berater.' },
            { nr: 5, titel: 'Präsentation + Dokumentation', inhalt: 'Klasse präsentiert. Projektdokumentation = Prüfungsleistung.' },
            { nr: 6, titel: 'Sicherung + Reflexion', inhalt: 'Welche Kompetenzen habe ich gezeigt? Lernzielkontrolle. Vorbereitung auf reale Projektprüfung § 12/4 MSO.' }
          ],
          bezuege: [
            { didaktik: 'Projektprüfung § 12/4 MSO', verweis: 'Direkte Vorbereitung auf die qualifizierende Abschlussprüfung.' },
            { didaktik: 'Vollständige Handlung 6 Schritte (Hacker/Aebli)', verweis: 'Idealtypische Realisierung aller 6 Schritte.' },
            { didaktik: 'Leittextmethode (Klippert · WiB-Methodik)', verweis: 'Methodisch standardisiertes Vorgehen.' }
          ]
        },
      ],
    },
  },
};
