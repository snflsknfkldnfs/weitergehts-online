// D Mathematik — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Der Mathematikunterricht der Mittelschule steht auf drei Ankern: **{{BV Art. 131}}** als Bildungsauftrag · **{{LP+ Fachprofil M}}** als fachliche Konkretion · **{{Kompetenzstrukturmodell M}}** als Strukturierungslogik. Jede Kompetenzerwartung im LP+ trägt **mindestens eine prozessbezogene** und **eine gegenstandsbezogene** Komponente — Doppeltagging als didaktischer Steuerungs-Schlüssel.'
    },

    { type: 'h', text: 'Bildungsauftrag — drei Ebenen' },
    { type: 'bullets', items: [
      '**Verfassung**: {{BV Art. 131}} — Erziehungsziele Ehrfurcht / Achtung der Würde des Menschen / Verantwortungsbewusstsein.',
      '**KMK-Anker**: Bildungsstandards Mathematik MSA (2003/04) — länderübergreifender Output-Standard.',
      '**LP+ Bayern**: konkretisiert auf MS-Ebene mit Fachprofil + Lernbereichen pro Jgst.',
    ]},

    { type: 'h', text: 'Kompetenzstrukturmodell M — Doppeltagging-Logik' },
    { type: 'table',
      head: ['Prozessbezogen (6)', 'Gegenstandsbezogen (4–5)'],
      rows: [
        ['**modellieren** — Realsituation ↔ math. Modell', '**Zahlen und Operationen**'],
        ['**Probleme lösen** — Polya 4 Phasen', '**Größen und Messen**'],
        ['**argumentieren** — Beweisanfänge', '**Raum und Form** (Geometrie)'],
        ['**kommunizieren** — math. Sprache nutzen', '**Daten und Zufall** (Stochastik)'],
        ['**symbolische/formale/techn. Elemente** — Notation', '**Funktionaler Zusammenhang**'],
        ['**Darstellungen verwenden** — Bild/Tabelle/Graph', '—'],
      ],
    },
    { type: 'p', text:
      '**Doppeltagging**: Jede KE im LP+ trägt sowohl eine prozessbez. (z.B. „modellieren") als auch eine gegenstandsbez. (z.B. „Zahlen und Operationen") Markierung. Beispiel M7R-LB1 Prozent: prozessbez. modellieren + argumentieren + Darstellungen / gegenstandsbez. Zahlen und Operationen + Funktionaler Zusammenhang + Daten und Zufall.'
    },

    { type: 'warn', titel: '⚠ Falle Kompetenzmodell', text:
      'Das **Kompetenzstrukturmodell M** unterscheidet sich vom **Kompetenzstrukturmodell GPG/Sk**: andere Prozess- und Gegenstandsachsen. Wer beide Modelle vermischt (z.B. „Urteilsbildung" als prozessbez. Komp. im MU nennt), fällt in die Falle. **GPG/Sk hat eigene Achsen**: Methoden + politische Urteilsbildung + Handlungskompetenz × Inhaltsbereiche.',
    },

    { type: 'selfcheck', items: [
      { q: 'Was ist das **Kompetenzstrukturmodell** im LP+ Mathematik?',
        a: 'Zweidimensionale Struktur: **6 prozessbez. Kompetenzen** (modellieren · Probleme lösen · argumentieren · kommunizieren · mit symbolischen/formalen/techn. Elementen umgehen · Darstellungen verwenden) × **4–5 Gegenstandsbereiche** (Zahlen und Operationen · Größen und Messen · Raum und Form · Daten und Zufall · Funktionaler Zusammenhang). Jede KE wird **doppeltgetaggt**.' },
      { q: 'Wo steht der Bildungsauftrag verfassungsrechtlich?',
        a: '{{BV Art. 131}} — Ehrfurcht vor Gott, Achtung der Würde des Menschen + Selbstbeherrschung, Verantwortungsbewusstsein, Hilfsbereitschaft. Konkretisiert über KMK Bildungsstandards MSA + LP+ Fachprofil M.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Das **EIS-Prinzip** (Bruner 1966) ist das Rückgrat jeder MU-Begriffsbildung: Lernende durchlaufen **drei Repräsentationsebenen** — **e**naktiv (Handlung am Material) → **i**konisch (Bild/Visualisierung) → **s**ymbolisch (Notation/Zeichen). Konstruktivistisch verstanden: Wissen wird **aktiv konstruiert**, nicht passiv übernommen — daraus folgt der **Primat der Handlung** (Piaget, Montessori).'
    },

    { type: 'h', text: 'EIS-Stufen — Wortlaut + LP+-Auftrag' },
    { type: 'table',
      head: ['Stufe', 'Beschreibung', 'LP+-Wortlaut-Anker'],
      rows: [
        ['**E**naktiv', 'Handeln am konkreten Material — Reale Manipulation', '„**handelnd sichtbar machen**" (M7R-LB1)'],
        ['**I**konisch', 'Bild, Skizze, Diagramm — Anschauungsmittel', '„veranschaulichen", „darstellen"'],
        ['**S**ymbolisch', 'Mathematische Notation, formales Zeichen-System', '„bestimmen", „berechnen", „argumentieren"'],
      ],
    },
    { type: 'p', text:
      '**Wichtig**: alle drei Ebenen sollen **pro Begriff** durchlaufen werden — nicht: enaktiv nur Grundschule, symbolisch nur weiterführende Schule. EIS ist eine **Sequenz-Logik der Begriffsbildung**, keine Klassenstufen-Logik.'
    },

    { type: 'h', text: 'Konstruktivismus + Primat der Handlung' },
    { type: 'bullets', items: [
      '**Konstruktivismus** (Piaget): Wissen wird vom Lernenden **aktiv konstruiert**, in Auseinandersetzung mit der Umwelt — nicht „eingegossen" (Behaviorismus ≠ Konstruktivismus).',
      '**Primat der Handlung** (Montessori, Piaget): kognitive Entwicklung folgt sensomotorischen Stufen — Verstehen entsteht **im Tun**, nicht durch passives Zuhören.',
      '**Konsequenz für MU**: aktive SuS-Phase > LK-Vortrag · offene Aufgaben > geschlossene · produktives Üben > imitierendes Üben (Wittmann).',
      '**LK-Rolle**: Lernbegleiter, **Strukturgeber, Impulsgeber** — nicht „stiller Beobachter". Konstruktivismus heißt nicht „LK sagt nichts".',
    ]},

    { type: 'h', text: 'Praxis-Anker: M7R-Prozent UE1-7 EIS-Progression' },
    { type: 'table',
      head: ['UE', 'Stufe', 'Konkrete Realisierung'],
      rows: [
        ['UE 1', 'enaktiv', '**100er-Feld** — Anteile bildlich legen, Hundertstelquadrat'],
        ['UE 2', 'enaktiv → ikonisch', 'Hundertstelbrüche — Spiralbrücke zu M6'],
        ['UE 3', 'ikonisch', '**Prozentstreifen** einführen'],
        ['UE 4–5', 'ikonisch', 'Prozentstreifen für Anteilsvergleich + Sachsituationen'],
        ['UE 6', 'ikonisch → symbolisch', '**Hefteintrag GW/PW/PS** — Begriffe fixieren (Farbcodierung BLAU/ROT/GRÜN)'],
        ['UE 7', 'symbolisch', '**Dreisatz-Schema** mit Worked Example'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen EIS', text:
      '**EIS sind nicht drei Klassenstufen** — alle drei Stufen sollen pro Begriff durchlaufen werden. **EIS ≠ operatives Prinzip** — EIS regelt Repräsentation, operativ regelt Operations-Merkmale (siehe A.3). **Konstruktivismus ≠ stille Klasse ohne LK** — LK ist Strukturgeber, gerade in konstruktivistisch verstandenen Phasen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Stufen hat das EIS-Prinzip — und in welcher Reihenfolge sollten sie durchlaufen werden?',
        a: '**E**naktiv (Handlung am Material) → **I**konisch (Bild) → **S**ymbolisch (Notation). Pro Begriff alle drei Stufen, idealtypisch in dieser Reihenfolge. LP+-Wortlaut „handelnd sichtbar machen" fordert die enaktive Stufe explizit.' },
      { q: 'Wie unterscheidet sich Konstruktivismus vom Behaviorismus — und was bedeutet das für den MU?',
        a: '**Behaviorismus**: Wissen wird per Reiz-Reaktion „eingegossen". **Konstruktivismus** (Piaget): Wissen wird vom Lernenden **aktiv konstruiert**. Konsequenz: aktive SuS-Phasen, offene Aufgaben, Material-Arbeit. Aber: LK bleibt Strukturgeber und Impulsgeber.' },
      { q: 'Sie planen eine UE zur Einführung der Prozentrechnung. Wie würden Sie EIS realisieren?',
        a: 'Enaktiv: 100er-Feld zum Legen von Anteilen → Ikonisch: Prozentstreifen mit Farbcodierung → Symbolisch: Dreisatz GW/PW/PS mit Hefteintrag. Praxis: M7c UE1-7 (13.10.2025) mit Tafelfußball-Gamification in der Übungsphase.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Das **Operative Prinzip** (Aebli / Wittmann) ist der zweite Eckpfeiler der Mathematikdidaktik. Lernende durchdringen mathematische Begriffe nicht durch reine Wahrnehmung, sondern durch **Operationen mit ihnen** — sie variieren, kehren um, verketten, kommutieren. **Fünf Operationsmerkmale** strukturieren diese Tätigkeit.'
    },

    { type: 'h', text: '5 Operationsmerkmale verbatim' },
    { type: 'table',
      head: ['Merkmal', 'Bedeutung', 'Praxis-Beispiel Prozent'],
      rows: [
        ['**Reversibilität**', 'Umkehrbarkeit einer Operation', 'Umgekehrter Dreisatz GW: p% → 1% → 100%'],
        ['**Transitivität**', 'a → b → c → a → c', 'Entscheidungsbaum GW/PW/PS — eine Größe lässt auf die anderen schließen'],
        ['**Komposition**', 'Verkettung von Operationen', '**Doppelrabatt**: −20% dann −10% ≠ −30%'],
        ['**Assoziativität**', 'Klammerung beliebig', 'Beim Überschlag: (50 % von 80) = 50 % × 80 = 80 × 50 %'],
        ['**Distributivität**', 'Verteilung von Operationen', 'Mischung: 20 % von (a + b) = 20 % von a + 20 % von b'],
      ],
    },

    { type: 'h', text: 'Abgrenzung Operativ ↔ EIS (häufige Falle!)' },
    { type: 'bullets', items: [
      '**EIS-Prinzip** regelt die **Repräsentations-Ebene** (enaktiv / ikonisch / symbolisch).',
      '**Operatives Prinzip** regelt die **Operations-Struktur** (5 Merkmale).',
      'Beide Prinzipien sind **orthogonal** — sie können kombiniert werden. Beispiel: Reversibilität enaktiv (Material zurücklegen) ODER ikonisch (Pfeil umkehren) ODER symbolisch (Umkehrgleichung).',
      '**Falle**: „Operatives Prinzip = Material-Arbeit". NEIN — Material-Arbeit ist enaktive Stufe. Operatives Prinzip ist die Beziehungs-Operation auf jeder Ebene.',
    ]},

    { type: 'h', text: 'Praxis-Anker: Reversibilität Prozent (UE 10)' },
    { type: 'p', text:
      'In der UE „Grundwert berechnen" (M7c, 13.10.2025 UE2) wird die **Reversibilität** explizit thematisiert: aus Prozentwert und Prozentsatz den Grundwert zurückrechnen. **Methodisch**: umgekehrter Dreisatz p% → 1% → 100% mit Farbcodierung (GRÜN = PS, ROT = PW, BLAU = GW). **Erweitert** UE 19: Doppelrabatt-Problem demonstriert die **Komposition** (verkettete Operationen).'
    },

    { type: 'warn', titel: '⚠ Fallen Operatives Prinzip', text:
      '**Operatives Prinzip ≠ Material-Arbeit** (das ist EIS-enaktiv). **Operatives Prinzip ≠ schrittweises Vorgehen** — es geht um **Beziehungen zwischen Operationen** (umkehrbar, transitiv, …). Wer in der Prüfung „operativ" als Synonym für „aktiv-handelnd" nutzt, verkürzt das Prinzip massiv.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche 5 Operationsmerkmale gehören zum Operativen Prinzip?',
        a: '**Reversibilität** · **Transitivität** · **Komposition** · **Assoziativität** · **Distributivität**. Praxis-Anker Prozent: Reversibilität = umgekehrter Dreisatz GW; Komposition = Doppelrabatt; Transitivität = Entscheidungsbaum GW/PW/PS.' },
      { q: 'Was unterscheidet das Operative Prinzip vom EIS-Prinzip?',
        a: '**EIS** regelt die **Repräsentations-Ebene** (enaktiv/ikonisch/symbolisch). **Operativ** regelt die **Operations-Struktur** (5 Merkmale). Beide Prinzipien sind orthogonal — Reversibilität kann enaktiv ODER ikonisch ODER symbolisch realisiert werden.' },
      { q: 'Geben Sie ein Praxis-Beispiel für Reversibilität in der Prozentrechnung.',
        a: '**Umgekehrter Dreisatz** zur Grundwert-Berechnung: gegeben Prozentwert und Prozentsatz, gesucht Grundwert. Vorgehen: PW : PS = 1% → 1% × 100 = 100%. UE 10 der M7c-Sequenz mit Worked Example und Farbcodierung.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      '**Modellieren** ist im LP+ prozessbezogene Schlüssel-Kompetenz: Lernende übersetzen **realistische Sachsituationen ↔ mathematische Modelle** und validieren am Ende ihre Lösung. Verwechslungsfalle: Modellieren ≠ jede Sachaufgabe. Echte Modellierung verlangt **Übersetzungs- und Validierungs-Schritte**.'
    },

    { type: 'h', text: 'Modellierungskreislauf Blum/Leiß — 5 Schritte' },
    { type: 'numbered', items: [
      '**Situationsmodell konstruieren** — reale Situation verstehen (z.B. Brot-Rezept).',
      '**Vereinfachen + Strukturieren** — Wesentliches herausfiltern (nur Mehl-Anteile zählen).',
      '**Mathematisieren** — Übersetzung in math. Modell (Anteilsrechnung).',
      '**Mathematisch arbeiten** — Lösung berechnen (Dreisatz).',
      '**Interpretieren + Validieren** — Lösung in der realen Situation überprüfen (passt zu Brot-Rezept?).',
    ]},
    { type: 'p', text:
      'Der Kreislauf kann **mehrmals durchlaufen** werden, wenn die Validierung Anpassungen am Modell verlangt.'
    },

    { type: 'h', text: 'Modellieren ≠ Sachaufgabe — die kritische Unterscheidung' },
    { type: 'table',
      head: ['Echte Modellierung', 'Eingekleidete Sachaufgabe'],
      rows: [
        ['Realsituation OFFEN — SuS müssen Modell selbst konstruieren', 'Modell vorgegeben („Hans hat 5 Äpfel und gibt 2 weg")'],
        ['Vereinfachungs-Entscheidungen sind Teil der Aufgabe', 'Vereinfachung schon vorgenommen'],
        ['Validierung am Ende **gefordert**', 'Validierung entfällt, Lösung = Endpunkt'],
        ['Mehrere Lösungen + Wege möglich', 'In der Regel ein erwarteter Lösungsweg'],
        ['Beispiel: Mischungs-Aufgabe „Wie viel Roggen brauchst du für ein 5-kg-Brot?"', 'Beispiel: „Ein Pizza-Stück kostet 2,50 €. Wie viel kosten 4 Stücke?"'],
      ],
    },

    { type: 'h', text: 'Praxis-Anker: Mischungsverhältnisse Beruf (UE 20-22)' },
    { type: 'p', text:
      '**LP+-Wortlaut M7R-LB1**: „bestimmen Prozentwert und Prozentsatz bei Mischungsverhältnissen und bewältigen problemorientierte Aufgaben aus Alltag und Beruf." Drei Berufsfelder-Anker in der UE-Sequenz: **Bäckerei** (Mehl-Mischung), **Maler** (Farb-Mischung), **Apotheke** (Lösungs-Konzentration). SuS müssen Mischverhältnisse aus realen Rezept-Angaben extrahieren, math. modellieren, lösen und am Rezept validieren. Cross-Ref: WiB-Berufsorientierung.'
    },

    { type: 'h', text: 'Beziehungshaltigkeit / Lebensweltbezug (Freudenthal)' },
    { type: 'bullets', items: [
      '**Freudenthal-Prinzip**: Mathematik aus realer Tätigkeit heraus entwickeln, nicht als isoliertes Symbol-System lehren.',
      '**Beziehungshaltigkeit**: Begriffe in Sinnzusammenhängen (Rabatt, MwSt, Mischung, Beruf) verankern.',
      '**LP+ Bayern** spricht in M7R-LB1 explizit von „Sachsituationen", „Alltag und Beruf" — Beziehungshaltigkeit ist verbatim eingefordert.',
      '**Konsequenz**: Mathematik-Unterricht ohne Lebensweltbezug verfehlt den LP+-Auftrag.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Modellieren', text:
      '**Nicht jede Sachaufgabe ist Modellieren** — eingekleidete Standard-Aufgaben („Hans kauft 5 Äpfel") fehlt der Übersetzungs- und Validierungs-Schritt. Echte Modellierung verlangt **Offenheit + Validierung**. **Modellieren ≠ Anwenden** — Anwenden = Modell ist gegeben, Modellieren = Modell muss konstruiert werden.',
    },

    { type: 'selfcheck', items: [
      { q: 'Was sind die 5 Schritte des Modellierungskreislaufs Blum/Leiß?',
        a: '(1) **Situationsmodell konstruieren** · (2) **Vereinfachen + Strukturieren** · (3) **Mathematisieren** · (4) **Mathematisch arbeiten** · (5) **Interpretieren + Validieren**. Kann mehrmals durchlaufen werden, wenn Validierung Anpassungen verlangt.' },
      { q: 'Wieso ist eine eingekleidete Sachaufgabe wie „Hans hat 5 Äpfel" kein Modellieren?',
        a: 'Weil das **Modell vorgegeben** ist (Addition/Subtraktion). Echte Modellierung verlangt, dass die Lernenden das Modell selbst aus einer realen Situation **konstruieren** und am Ende **validieren**. Ohne Übersetzungs- und Validierungs-Schritt liegt nur Anwendung vor.' },
      { q: 'Geben Sie ein LP+-konformes Modellierungs-Beispiel aus der Prozentrechnung.',
        a: '**Mischungsverhältnisse Bäckerei** (UE20-21, M7c): aus realen Brot-Rezept-Angaben Roggen-/Weizen-Anteile extrahieren → Anteilsrechnung mathematisieren → Dreisatz lösen → am Original-Rezept validieren. LP+-Auftrag M7R-LB1: „Mischungsverhältnisse bestimmen + problemorient. Alltags-/Beruf-Aufgaben bewältigen".' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Eine MU-Sequenz wird auf drei Ebenen architekt: **vertikal** im 4-Phasen-Modell (Einführung/Sicherung/Übung/Anwendung), **kumulativ** durch das Spiralprinzip (LP+-LB-Querverweise), **horizontal** durch Differenzierung (3 Niveaustufen + Sprachsensibilität).'
    },

    { type: 'h', text: '4-Phasen-Modell (Bausteinskript B1/B2 Engelking)' },
    { type: 'table',
      head: ['Phase', 'Zweck', 'Beispiel Prozent-Sequenz'],
      rows: [
        ['**1 Einführung**', 'Problemkontext aufbauen · Vorwissen aktivieren · kognitiver Konflikt', 'UE 1 Anteile bildlich (100er-Feld); UE 2 Hundertstelbrüche-Brücke'],
        ['**2 Sicherung**', 'Begriff/Verfahren fixieren · Hefteintrag', 'UE 6 Begriffsklärung GW/PW/PS (Hefteintrag mit Farbcodierung)'],
        ['**3 Übung**', 'Automatisieren · Differenzieren · produktiv Üben', 'UE 7-16 Übungs-UEs mit Tafelfußball-Gamification (13.10.)'],
        ['**4 Anwendung**', 'Transfer · Sachkontexte · Mischung/Beruf', 'UE 20-26 Mischungsverhältnisse + Diagramme + Probearbeit'],
      ],
    },
    { type: 'p', text:
      '**Wichtig**: 4-Phasen-Modell ist **Sequenz-** nicht Stunden-bezogen. Eine einzelne UE kann komplett in Phase 3 (Übung) liegen. Die Phasen-Reihenfolge ist innerhalb einer Sequenz von 5–25 UEs realisiert.'
    },

    { type: 'h', text: 'Spiralprinzip + Kumulatives Lernen' },
    { type: 'p', text:
      '**Spiralprinzip** (Bruner): jedes Thema kehrt mit **steigender kognitiver Anforderung** wieder. Der LP+ markiert die Spirale selbst durch LB-Querverweise. **Praxis-Spirale für Prozent**:'
    },
    { type: 'bullets', items: [
      '**M6-LB1.1** Bruch ↔ Dezimal ↔ Prozent — Vor-Wissen Hundertstel.',
      '**M7R-LB1** Prozentrechnung + Diagramme — Hauptthema (eigene UE).',
      '**M9R-LB1** Zinsrechnung — Übertragung der Grundaufgaben Prozent auf Zins (LP+-Wortlaut!).',
      '**M9R-LB8** Funktionstypen — Prozent als linearer funktionaler Zusammenhang.',
    ]},
    { type: 'p', text:
      '**Kumulatives Lernen**: jedes Folge-LB greift auf das vorhergehende zurück. Spirale ≠ Wiederholung am Schuljahresanfang — Spirale heißt **Erweiterung mit höherer AFB**.'
    },

    { type: 'h', text: 'Differenzierung — 3 Niveaustufen' },
    { type: 'bullets', items: [
      '**Basis** — Standardaufgaben mit Tipp-/Hilfekarten, Worked Examples, Lückenaufgaben.',
      '**Regelstandard** — Sachaufgaben aus dem Schulbuch (FormelPLUS), Standard-Lösungswege.',
      '**Erhöht** — offene Aufgaben, Forscheraufgaben, mehrere Lösungswege, Reflexion explizit.',
      '**Selbst-Differenzierung** (SINUS): offene Aufgabe deckt alle Niveaus zugleich ab (z.B. Zahlenmauern, Rechendreieck).',
      '**Tafelfußball-Praxis** (M7c 13.10.): SuS wählen ihre Stufe; bei Punkten zählen alle gleich (Motivations-Anker).',
    ]},

    { type: 'h', text: 'Sprachsensibler MU (Leisen)' },
    { type: 'bullets', items: [
      '**Bildsprache → Symbolsprache → Fachsprache** schrittweise aufbauen.',
      '**Operatoren-Wortschatz** explizit machen: „vergleichen", „beschreiben", „begründen", „erläutern" je AFB-Stufe.',
      '**DaZ-Anker**: Begriffsklärungen **visualisieren + verbalisieren** (gemäß BIK-Konzept).',
      '**Farbcodierung BLAU/ROT/GRÜN** als visueller Sprachgerüst-Anker (M7c-Praxis).',
      'Cross-Ref Inklusion: sprachsensibles + inklusives Lernen oft an demselben Anker.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Sequenz', text:
      '**4-Phasen-Modell ≠ Stunden-Modell** — gilt für die Sequenz von 5–25 UEs, nicht für eine Einzelstunde. **Spiralprinzip ≠ Wiederholung** — Spirale heißt steigende AFB, nicht erneutes Durchlaufen. **Differenzierung ≠ nur Aufgabenmenge** — drei echte Niveaustufen mit qualitativ unterschiedlichen Anforderungen. **Sprachsensibel ≠ optionales DaZ-Add-on** — strukturell für alle SuS relevant, weil Aufgabenverständnis = Lösungsstart.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche 4 Phasen kennt der klassische MU-Sequenzaufbau B1/B2?',
        a: '(1) **Einführung** — Problemkontext, Vorwissen, kognitiver Konflikt · (2) **Sicherung** — Begriff/Verfahren fixieren, Hefteintrag · (3) **Übung** — automatisieren, differenzieren · (4) **Anwendung** — Transfer, Sachkontexte. Modell ist Sequenz- nicht Stunden-bezogen.' },
      { q: 'Wie zeigt sich das Spiralprinzip in der Prozent-Spirale des LP+?',
        a: 'M6-LB1.1 (Bruch ↔ Dezimal ↔ Prozent — Vor-Wissen) → M7R-LB1 (Prozentrechnung selbst) → M9R-LB1 (Zinsrechnung — LP+-Wortlaut: „Übertragung der Grundaufgaben Prozent auf Zins"). Jede Stufe steigert die AFB.' },
      { q: 'Wie haben Sie in der M7c Prozent-Sequenz differenziert?',
        a: '**3 Niveaustufen** in Tafelfußball-Gamification (Miro, 4 Teams, 13.10.): Basis (Standard + Tippkarten) · Regelstandard (Sachaufgaben) · Erhöht (Doppelrabatt, Mischung). SuS wählen Stufe selbst, alle Punkte zählen gleich. **Sprachsensibel** flankierend: Farbcodierung BLAU/ROT/GRÜN für GW/PW/PS durchgehend.' },
    ]},
  ],

  A6: [
    { type: 'lead', text:
      'In der mündlichen Prüfung haben Sie **10 Min pro Frage**, keine Vorbereitungszeit. Das **8-Punkte-Antwort-Schema** (Seminar SW V) ist der Standard-Rahmen. Bewertet wird auf drei Achsen: **Erfassen** der Aufgabe · **Fachkenntnisse** + Praxisorientierung · **Darlegung** (Begriffe, logischer Aufbau, selbstständige Entwicklung, kritische Argumentation).'
    },

    { type: 'h', text: '8-Punkte-Antwort-Schema (Seminar SW V)' },
    { type: 'numbered', items: [
      '**Thema im Gesamtzusammenhang** — wo gehört das Thema im LP+ und in der Fachdidaktik hin?',
      '**Vorgabe einer Grobgliederung** — Sie kündigen die Struktur Ihrer Antwort an (transparent für Prüfer).',
      '**Begriffsklärungen** — Schlüsselbegriffe definieren, bevor Sie sie weiter benutzen.',
      '**Aussagen des Lehrplans** — wörtlich zitieren (LP+-Anker zeigt sichere Verortung).',
      '**Realisierungsmöglichkeiten** — Theorie + **Praxisbeispiel(e)** aus eigener UE.',
      '**Probleme / Grenzen** — kritisch reflektieren, was schwierig ist oder wo das Prinzip an seine Grenze stößt.',
      '**Wertung / persönliche Stellungnahme** — eigene didaktische Position.',
      '**Zusammenfassung** — Bogen schließen.',
    ]},

    { type: 'h', text: 'Bewertungsachsen' },
    { type: 'table',
      head: ['Achse', 'Was geprüft wird'],
      rows: [
        ['**1 Erfassen**', 'Verstehen Sie die Frage präzise? Gehen Sie auf den Operator ein? Adressieren Sie die korrekte Ebene (Prinzip / KE / LB)?'],
        ['**2 Fachkenntnisse**', 'Umfang + **Praxisorientierung**. Sekundärliteratur (Weigand, Bruner, Polya) + LP+ + **eigene UE-Beispiele**.'],
        ['**3 Darlegung**', 'Begriffe sauber, logischer Aufbau, **selbstständige Entwicklung** (nicht nur reproduzieren), kritische Argumentation.'],
      ],
    },

    { type: 'h', text: 'Polya — 4 Phasen + 12 Heuristiken (Top-3 Examensthema)' },
    { type: 'p', text:
      '**Polya** (How to Solve It, 1945): Problemlöse-Methodik in **4 Phasen**: (1) Verstehen · (2) Plan · (3) Ausführen · (4) Rückschau. **12 Heuristiken** als methodische Werkzeuge:'
    },
    { type: 'bullets', items: [
      '**Skizze** anfertigen · **Tabelle** anlegen · **Rückwärtsarbeiten** · **Analogiebildung**.',
      '**Systematisches Probieren** · **Vereinfachen** · **Spezialisieren** · **Generalisieren**.',
      '**Symmetrie** nutzen · **Invariante** suchen · **Hilfsproblem** lösen · **Hilfsfigur** zeichnen.',
      'Im LP+ Bayern unter „Probleme lösen" verankert (prozessbez. Kompetenz).',
    ]},

    { type: 'h', text: 'SINUS-Aufgabenkultur + Produktives Üben (Wittmann)' },
    { type: 'bullets', items: [
      '**SINUS-Aufgabenkultur** (BLK-Modellversuch 1998–2003): offene Aufgaben mit mehreren Lösungswegen · Beziehungsreichtum · **Selbstdifferenzierung** · explizite Reflexion.',
      '**Produktives Üben** (Wittmann): Übung mit **gleichzeitiger Entdeckung neuer Zusammenhänge** — nicht imitierendes Wiederholen.',
      '**Beispiele**: Zahlenmauern (M4-M6), Rechendreieck (M5), 1×1-Forschermappe (M5), Doppelrabatt-Problem (M7R).',
      'Cross-Ref zu Operativem Prinzip: produktive Übungsformate **operationalisieren** die 5 Operationsmerkmale.',
    ]},

    { type: 'h', text: 'Veränderte Leistungsmessung + Fehlerkultur' },
    { type: 'bullets', items: [
      '**Erweiterte LNW-Formen**: Lerntagebücher · Portfolios · Rechen-Reflexionen · Projektarbeiten — über bloßes Probe-Schreiben hinaus.',
      '**Fehlerkultur**: Fehler als **Lernanlass** verstehen, nicht als Defekt. SuS analysieren eigene Fehlerketten.',
      '**LP+ Bayern**: prozessbez. Kompetenzen lassen sich nur teilweise schriftlich prüfen — mündliche und praktische Anteile nötig.',
      'Cross-Ref Schulrecht **{{Art. 52 BayEUG}}**: schriftliche, mündliche, praktische Leistungen — alle drei Erhebungsformen LP+-konform.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Prüfungsantwort', text:
      'Häufige Schwachstellen: **(a) kein LP+-Wortlaut** — Punkt 4 wird oft übersprungen. **(b) kein Praxisbeispiel** — Bewertungsachse 2 verlangt explizit Praxisorientierung. **(c) keine kritische Argumentation** — Punkt 6 (Probleme/Grenzen) wird oft umgangen. **(d) Sekundärliteratur fehlt** — Weigand/Bruner/Polya namentlich nennen.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche 8 Punkte hat das Antwort-Schema Seminar SW V?',
        a: '(1) Zusammenhang · (2) Grobgliederung · (3) Begriffsklärungen · (4) LP+-Wortlaut · (5) Realisierung mit Praxisbeispiel · (6) Probleme/Grenzen · (7) Wertung · (8) Zusammenfassung.' },
      { q: 'Welche drei Bewertungsachsen gibt es?',
        a: '**Erfassen** (Frage verstehen, Operator beachten) · **Fachkenntnisse** (Umfang + Praxisorientierung — Sekundärliteratur + LP+ + eigene UE) · **Darlegung** (Begriffe, Aufbau, selbstständige Entwicklung, kritische Argumentation).' },
      { q: 'Was sind die 4 Phasen von Polya, und welche Heuristiken kennen Sie?',
        a: '**4 Phasen**: Verstehen · Plan · Ausführen · Rückschau. **12 Heuristiken**: Skizze · Tabelle · Rückwärtsarbeiten · Analogiebildung · systematisches Probieren · Vereinfachen · Spezialisieren · Generalisieren · Symmetrie · Invariante · Hilfsproblem · Hilfsfigur. Im LP+ unter „Probleme lösen" verankert.' },
    ]},
  ],

};
