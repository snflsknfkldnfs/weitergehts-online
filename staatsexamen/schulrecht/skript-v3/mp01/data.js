// MP_01 — Messer im Unterricht · Beschlagnahme + Strafrechts-Schnittstelle
// Quelle: _mkdocs/docs/mp01/index.md

window.MODULE = {
  id: 'mp01',
  zalgm: 'ZALGM § 16 Nr. 1',
  schwerpunkt: ['1.1 Gefahrenabwehr', '1.2 § 23/2', '1.3 Art. 86–88', '1.4 § 241/§ 224', '1.5 Anzeige'],
  titel: 'Messer im Unterricht.',
  titel2: 'Beschlagnahme + Strafrecht.',
  abriss:
    'Drei-Pfad-Vorfall in drei Zeitfenstern. Gefahrenabwehr · Schulrecht · ' +
    'Strafrecht laufen parallel. Homonym-Fallen „Sicherung" und „Anzeige" ' +
    'sind die Examens-Stolpersteine.',

  kurz: [
    'Drei Pfade parallel: Gefahrenabwehr (§ 5 LDO + § 23/2 BaySchO) · Schulrecht (Art. 86–88 BayEUG) · Strafrecht (§ 241 / § 224 StGB).',
    'Drei Zeitfenster: Min 1–5 Deeskalation + Sicherstellung · Min 5–30 SL + EB + Art. 87 · Tag 1–14 Anhörung + Ordnungsmaßnahme.',
    'Homonym „Sicherung": § 23/2 BaySchO = Gegenstand · Art. 87 BayEUG = Person. Zwei Institute, parallel.',
    'LK = anzeigen-BERECHTIGT (Fürsorge), NICHT generell anzeigen-PFLICHTIG. Ausnahme § 138 StGB taxativ.',
    'Strafmündigkeit ab vollendetem 14. Lebensjahr (§ 1 JGG). Bei < 14: § 8a SGB VIII Jugendamt + Schulrecht parallel.',
  ],

  deck: { cards: 8, normebenen: 5, hochprior: 8, fallen: 10 },

  kartografie: [
    {
      ebene: 'I',
      bez: 'Bayerische Verfassung',
      kuerzel: 'BV',
      normen: ['Art. 131 BV'],
      sub: 'Bildungs-/Erziehungsauftrag',
    },
    {
      ebene: 'II',
      bez: 'BayEUG',
      kuerzel: 'BayEUG',
      normen: ['Art. 56/4', 'Art. 57', 'Art. 75', 'Art. 86', 'Art. 87', 'Art. 88'],
      sub: 'Verhaltenspflicht · EOM-Kaskade · Sicherungs-Ausschluss · Verfahren',
    },
    {
      ebene: 'III',
      bez: 'Schulordnung + LDO',
      kuerzel: 'VO',
      normen: ['§ 23/1 BaySchO', '§ 23/2 BaySchO', '§ 5 LDO'],
      sub: 'Konsumverbot · Wegnahme/Sicherstellung · Aufsichtspflicht',
    },
    {
      ebene: 'IV',
      bez: 'Bundesrecht',
      kuerzel: 'BUND',
      normen: ['§ 241 StGB', '§ 224 StGB', '§ 138 StGB', '§ 8a SGB VIII', '§ 1 JGG'],
      sub: 'Bedrohung · gef. KV · Anzeigepflicht · KWG · Strafmündigkeit',
    },
    {
      ebene: 'V',
      bez: 'Nebenrecht',
      kuerzel: 'NEB',
      normen: ['WaffG', 'BayPolG'],
      sub: 'Waffenrechtl. Mitführungsverbote · Polizei-Verständigung',
    },
  ],

  pflichtwissen: [
    {
      id: 'M01',
      titel: 'Drei-Pfad-Logik',
      frage: 'Welche drei Rechtspfade laufen bei Bedrohung mit Messer im Unterricht parallel — und können sie sich verdrängen?',
      antwort:
        'Pfad 1 Gefahrenabwehr (§ 5 LDO + § 23/2 BaySchO + BayPolG-Anker) · Pfad 2 Schulrecht (Art. 86–88 BayEUG) · Pfad 3 Strafrecht (§ 241 + § 224 StGB; ab 14 J. JGG). Alle drei KUMULATIV — keine Verdrängung. Strafrecht trifft Täter persönlich (Schuldprinzip), NICHT den Freistaat.',
      norm: '§ 23/2 BaySchO',
      status: 'open',
    },
    {
      id: 'M02',
      titel: '§ 23/2 BaySchO Drei-Sätze',
      frage: 'Welche drei Sätze gliedern § 23 Abs. 2 BaySchO — und wo steckt die Falle bei der Rückgabe?',
      antwort:
        'S. 1 Verbot Mitbringen/Mitführen (zwei Kategorien: gefährlich UND ordnungsstörend). S. 2 „können weggenommen und sichergestellt werden" — Ermessen, im Gefahrenfall auf Null reduziert. S. 3 Rückgabe NUR an Erziehungsberechtigte — gilt NUR für „gefährliche" Gegenstände, NICHT für „sonstige ordnungsstörende".',
      norm: '§ 23/2 BaySchO',
      status: 'open',
    },
    {
      id: 'M03',
      titel: 'Homonym „Sicherung"',
      frage: 'Wie unterscheiden sich § 23 BaySchO und Art. 87 BayEUG begrifflich — und warum ist das examensrelevant?',
      antwort:
        '§ 23 BaySchO = Sicherstellung eines GEGENSTANDS. Art. 87 BayEUG = Sicherungs-Ausschluss einer PERSON (vorläufig). Zwei separate Institute, parallel anwendbar. Wer die zwei Institute zusammenwirft, zeigt Oberflächen-Verständnis — Hauptfalle im Examen.',
      norm: 'Art. 87 BayEUG',
      status: 'open',
    },
    {
      id: 'M04',
      titel: 'Art. 86/2 12-Stufen',
      frage: 'Welche 12 Ordnungsmaßnahmen kennt der Katalog des Art. 86 Abs. 2 BayEUG?',
      antwort:
        '(1) schriftlicher Verweis · (2) verschärfter Verweis · (3) Versetzung in Parallelklasse · (4) Ausschluss bis 4 Wochen U./Veranstaltungen / Halbtags · (5) Ausschluss bis 6 Unterrichtstage · (6) 2–4 Wo. bei schul. Gefährdung (Lehrerkonferenz) · (7) bis Schuljahresende · (8) Zuweisung andere Schule · (9) Androhung Entlassung · (10) Entlassung · (11) Schulart-Ausschluss · (12) Mehr-Schularten-Ausschluss nach Verurteilung.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
    },
    {
      id: 'M05',
      titel: 'Subsidiarität + Verhältnismäßigkeit',
      frage: 'Welcher Grundsatz steuert die Auswahl zwischen Erziehungs- und Ordnungsmaßnahme?',
      antwort:
        'Art. 86/1 BayEUG: Erst Erziehungsmaßnahmen, dann (subsidiär) Ordnungs-/Sicherungsmaßnahmen. Auswahl nach Grundsatz der Verhältnismäßigkeit. Hausrecht bleibt UNBERÜHRT — separate Rechtsgrundlage, nicht in Verhältnismäßigkeit eingebunden.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
    },
    {
      id: 'M06',
      titel: 'Kollektivstrafverbot',
      frage: 'Warum ist „Klasse aus dem Raum schicken" KEINE verbotene Kollektivstrafe?',
      antwort:
        'Art. 86/3 Nr. 2 verbietet ORDNUNGSMAßNAHMEN gegen Klassen/Gruppen als solche. Klasse-rausschicken in akuter Gefahr ist GEFAHRENABWEHR-Maßnahme nach § 5 LDO, KEINE Ordnungsmaßnahme — fällt also nicht unter das Verbot.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
    },
    {
      id: 'M07',
      titel: 'Anzeigen-berechtigt vs. -pflichtig',
      frage: 'Wann ist die LK strafanzeigen-pflichtig — und wann nur berechtigt?',
      antwort:
        'Regulär: nur ANZEIGEN-BERECHTIGT aus Fürsorgepflicht. PFLICHT NUR bei § 138 StGB — taxative Liste schwerer GEPLANTER Straftaten (Mord, Totschlag, Geiselnahme …). Eine spontane Messerbedrohung im Streit fällt regelmäßig NICHT unter § 138. SL trifft Operativ-Entscheidung in Abstimmung mit EB (Art. 57). Eltern haben KEIN Vetorecht.',
      norm: '§ 138 StGB',
      status: 'open',
    },
    {
      id: 'M08',
      titel: 'Strafmündigkeit + § 8a SGB VIII',
      frage: 'Was passiert strafrechtlich bei einem 13-jährigen, was bei einem 14-jährigen Bedroher?',
      antwort:
        '< 14 J. (§ 1 JGG) = strafunmündig → Strafanzeige nutzlos; stattdessen § 8a SGB VIII Jugendamt-Meldung über SL + Schulrecht parallel. ≥ 14 J. = strafmündig (JGG) → § 241 StGB Bedrohung persönlich, ggf. § 224 StGB bei Versuchsbeginn. Schuldprinzip → Strafe trifft Täter persönlich, NICHT Freistaat (anders als Amtshaftung Art. 34 GG).',
      norm: '§ 1 JGG',
      status: 'open',
    },
  ],

  fallen: [
    { id: 'FA01', frage: '§ 23 BaySchO und Art. 87 BayEUG sind beide Sicherungsmaßnahmen?', antwort: 'NEIN. § 23 BaySchO sichert Gegenstand · Art. 87 BayEUG schließt Person vorläufig vom Unterricht aus. Zwei separate Institute, parallel anwendbar.' },
    { id: 'FA02', frage: 'LK ist anzeigen-pflichtig bei Bedrohung?', antwort: 'NEIN. LK ist regulär anzeigen-BERECHTIGT (Fürsorge). § 138 StGB greift nur bei taxativ aufgeführten schweren GEPLANTEN Straftaten.' },
    { id: 'FA03', frage: 'Klasse aus dem Raum schicken ist Kollektivstrafe?', antwort: 'NEIN. Gefahrenabwehr-Maßnahme nach § 5 LDO — keine Ordnungsmaßnahme iSd Art. 86. Art. 86/3 Nr. 2 verbietet nur ORDNUNGSMAßNAHMEN gegen die Gruppe als solche.' },
    { id: 'FA04', frage: 'Ausschluss 2–4 Wochen entscheidet die Schulleitung?', antwort: 'NEIN. Art. 86/2 Nr. 6 bei schulischer Gefährdung = LEHRERKONFERENZ. SL allein nur bis 6 Unterrichtstage (Nr. 5).' },
    { id: 'FA05', frage: 'Bei Strafunmündigen reicht Strafanzeige?', antwort: 'NEIN. Unter 14 J. ist die Anzeige nutzlos (§ 1 JGG). Stattdessen § 8a SGB VIII Jugendamt-Meldung (über SL) + Schulrecht-Maßnahmen parallel.' },
    { id: 'FA06', frage: 'Rückgabe des Messers an SuS, wenn EB einverstanden?', antwort: 'NEIN für minderjährige SuS. § 23/2 S. 3: Rückgabe „NUR AN Erziehungsberechtigte". Direktion an SuS verboten — kein Einverständnis kann das ersetzen.' },
    { id: 'FA07', frage: '§ 23/2 BaySchO ist eine Beschlagnahme?', antwort: 'VORSICHT Begriffsverwirrung. § 23 BaySchO spricht von „Wegnahme + Sicherstellung" (verwaltungsrechtlich). „Beschlagnahme" ist strafprozessualer Begriff (§§ 94 ff. StPO) — separate Rechtsgrundlage durch Polizei/StA.' },
    { id: 'FA08', frage: 'Strafe trifft den Freistaat?', antwort: 'NEIN. Schuldprinzip — Strafe trifft Täter persönlich. Anders als Amtshaftung (Art. 34 GG → Freistaat-Außenhaftung; Cross-Ref MP_07).' },
    { id: 'FA09', frage: 'Anhörung kann vollständig nachgeholt werden?', antwort: 'VORSICHT. Bei Ordnungsmaßnahme (Art. 86/2 + Art. 88) ist Anhörung VORAB Pflicht. NUR bei Sicherungsmaßnahme (Art. 87) im Eilfall nachholbar. Verfahrensfehler bei Vermischung.' },
    { id: 'FA10', frage: 'Bei volljährigen SuS gibt es keine Ordnungsmaßnahmen?', antwort: 'NEIN. Art. 86 gilt unabhängig vom Alter. Aber Art. 86/3 Nr. 4 schützt Pflichtschulen-SuS vor Ausschlüssen Nr. 9–12.' },
  ],

  faelle: [
    {
      id: 'F1',
      titel: 'Max (13) — Messer-Bedrohung im Streit',
      sachverhalt:
        'Max (7. Klasse, 13 J.) bringt ein feststehendes Messer mit. Bei Streit mit Mitschüler Tim hält er Tim das Messer vor: „Wenn du noch mal so was sagst, stech ich dich!".',
      knackpunkte: [
        'Phase 1 (Min 1–5): § 5 LDO + § 23/2 BaySchO Sicherstellung (Ermessen auf Null reduziert wegen akuter Gefahr). Klasse rausschicken = Gefahrenabwehr, keine Kollektivstrafe.',
        'Phase 2 (Min 5–30): SL informieren (Art. 57) · EB benachrichtigen (Art. 75) · Dokumentation · Art. 87 Sicherungs-Ausschluss bei Wiederholungsgefahr.',
        'Phase 3 (Tag 1–14): Anhörung Art. 88 → Verhältnismäßigkeit Art. 86/1 → Ordnungsmaßnahme Art. 86/2 Nr. 5 (SL) oder Nr. 6 (Lehrerkonferenz bei schul. Gefährdung).',
        'Strafrecht: Max ist 13 → strafunmündig (§ 1 JGG). Statt Strafanzeige § 8a SGB VIII Jugendamt-Meldung über SL.',
      ],
      antwortkette: '§ 5 LDO + § 23/2 BaySchO Sicherstellung → Art. 87 Abwägung Sicherungs-Ausschluss → Art. 88 Anhörung → Art. 86/2 Nr. 5/6 Maßnahme → § 8a SGB VIII Jugendamt (wegen Strafunmündigkeit) → Sozialtraining + Opferbetreuung Tim.',
    },
    {
      id: 'F2',
      titel: 'Variante: Max ist 14 (Wiederholer)',
      sachverhalt:
        'Wie Fall 1, aber Max ist 14 (Jahrgangsstufen-Wiederholer).',
      knackpunkte: [
        'Strafrecht aktiv: § 1 JGG Strafmündigkeit greift. § 241 StGB Bedrohung trifft Max persönlich; bei Versuchsbeginn § 224 StGB.',
        'LK = anzeigen-BERECHTIGT (NICHT pflichtig — § 138 StGB nicht einschlägig). SL trifft Entscheidung in Abstimmung mit EB.',
        '§ 8a SGB VIII kann parallel greifen (Jugendhilfe + Strafrecht schließen sich nicht aus).',
        'Schulrecht identisch (Art. 86/2 Stufe nach Schwere/Wiederholung).',
      ],
      antwortkette: 'Strafmündigkeit § 1 JGG → § 241 StGB Bedrohung → LK anzeigen-berechtigt → SL/EB-Abstimmung → Schulrecht-Maßnahme parallel (Art. 86/2 Nr. 5/6).',
    },
    {
      id: 'F3',
      titel: 'Sicherungsmaßnahme-Homonym',
      sachverhalt:
        'SL ordnet nach dem Vorfall die „Sicherungsmaßnahme" an, dass Max nicht zurück in den Unterricht darf, bis das Verfahren abgeschlossen ist.',
      knackpunkte: [
        'Zwei Institute trennen: § 23/2 BaySchO = Sicherstellung des Messers (Gegenstand). Art. 87 BayEUG = Sicherungs-Ausschluss der Person Max (vorläufig).',
        'Art. 87 Voraussetzung: akute Gefahr für Leib/Leben ODER erhebliche Schulbetriebsstörung. Bei Messer-Bedrohung mit Wiederholungsgefahr regelmäßig erfüllt.',
        'Anhörung kann nachgeholt werden (Eilfall — Art. 88).',
        'Endpunkt: Sicherungsmaßnahme endet, sobald Ordnungsmaßnahme bestandskräftig ist.',
      ],
      antwortkette: '§ 23/2 BaySchO (Gegenstand) ≠ Art. 87 BayEUG (Person) → akute Gefahr als Voraussetzung → Anhörung nachholbar → Endpunkt: Bestandskraft Ordnungsmaßnahme.',
    },
    {
      id: 'F4',
      titel: 'Anzeigepflicht-Fehlframing',
      sachverhalt:
        'Eine Kollegin sagt sofort: „Wir müssen Strafanzeige erstatten, sonst machen wir uns selbst strafbar!".',
      knackpunkte: [
        '§ 138 StGB löst Anzeigepflicht NUR bei taxativ aufgeführten schweren GEPLANTEN Straftaten aus (Mord, Totschlag, Geiselnahme …). Spontane Messerbedrohung fällt regelmäßig NICHT darunter.',
        'LK ist regulär anzeigen-BERECHTIGT aus Fürsorgepflicht — NICHT anzeigen-pflichtig.',
        'Operative Entscheidung: SL nach Abstimmung mit EB (Art. 57).',
        'Bei strafunmündigem SuS (< 14 J.): Anzeige nutzlos → § 8a SGB VIII Jugendamt-Meldung.',
      ],
      antwortkette: '§ 138 StGB (taxative Liste, hier nicht einschlägig) → LK anzeigen-berechtigt (NICHT pflichtig) → SL/EB-Abstimmung → Bei < 14 J. § 8a SGB VIII statt Strafanzeige.',
    },
  ],

  vertiefung: [
    {
      id: 'A1',
      kuerzel: 'A.1',
      titel: 'Drei-Pfad-Struktur',
      anriss: 'Gefahrenabwehr · Schulrecht · Strafrecht parallel und kumulativ. Keine Verdrängung. Drei Zeitfenster: Min 1–5 / Min 5–30 / Tag 1–14.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
      cards: 3,
      subblocks: [
        { label: 'Drei-Pfad-Logik', cards: 1 },
        { label: 'Zeitfenster-Choreographie', cards: 1 },
        { label: 'Bund-Land-Trennschärfe', cards: 1 },
      ],
    },
    {
      id: 'A2',
      kuerzel: 'A.2',
      titel: 'Sicherstellung — § 23/2 BaySchO',
      anriss: 'Drei-Sätze-Logik: Verbot · Ermessen-Wegnahme · EB-Rückgabe. Homonym-Falle „Sicherung" gegen Art. 87. Aufsichtspflicht § 5 LDO als Substrat.',
      norm: '§ 23/2 BaySchO',
      status: 'open',
      cards: 4,
      subblocks: [
        { label: '§ 23/2 Drei-Sätze', cards: 2 },
        { label: '§ 5 LDO Aufsicht (Kurzform)', cards: 1 },
        { label: 'Homonym-Falle Sicherung', cards: 1 },
      ],
    },
    {
      id: 'A3',
      kuerzel: 'A.3',
      titel: 'Schulrechtliche Maßnahmen — Art. 86–88',
      anriss: 'Art. 86 Erziehungs- + Ordnungsmaßnahmen mit 12-Punkte-Katalog. Art. 87 vorläufiger Ausschluss. Art. 88 Anhörungs-Verfahren.',
      norm: 'Art. 86 BayEUG',
      status: 'open',
      cards: 6,
      subblocks: [
        { label: 'Art. 86 Kaskade', cards: 3 },
        { label: 'Art. 87 Sicherung-Person', cards: 1 },
        { label: 'Art. 88 Verfahren', cards: 2 },
      ],
    },
    {
      id: 'A4',
      kuerzel: 'A.4',
      titel: 'Strafrechts-Schnittstelle',
      anriss: '§ 241 Bedrohung · § 224 gef. KV · § 138 Anzeigepflicht (taxativ) · § 8a SGB VIII · § 1 JGG. LK berechtigt, nicht generell pflichtig.',
      norm: '§ 241 StGB',
      status: 'open',
      cards: 5,
      subblocks: [
        { label: '§ 241/§ 224 StGB', cards: 2 },
        { label: '§ 138 Anzeigepflicht', cards: 1 },
        { label: '§ 8a + § 1 JGG', cards: 2 },
      ],
    },
    {
      id: 'A5',
      kuerzel: 'A.5',
      titel: 'Drei Zeitfenster — Praxis-Choreographie',
      anriss: 'Phase 1 Min 1–5: Deeskalation + Sicherstellung. Phase 2 Min 5–30: SL + EB + Art. 87. Phase 3 Tag 1–14: Anhörung + Ordnungsmaßnahme.',
      norm: 'Art. 88 BayEUG',
      status: 'open',
      cards: 3,
      subblocks: [
        { label: 'Phase 1 Gefahrenabwehr', cards: 1 },
        { label: 'Phase 2 SL + EB', cards: 1 },
        { label: 'Phase 3 Anhörung + EOM', cards: 1 },
      ],
    },
  ],

  glossar: {
    'Art. 56/4 BayEUG': {
      titel: 'Art. 56 Abs. 4 BayEUG — SuS-Verhaltenspflicht',
      wortlaut: 'Verhaltensgrundnorm: „Alle SuS haben sich so zu verhalten, dass die Aufgabe der Schule erfüllt und das Bildungsziel erreicht werden kann." + Verhüllungs-Verbot + 6 Pflichten (siehe MP_05).',
      karten: ['M01'],
    },
    'Art. 57 BayEUG': {
      titel: 'Art. 57 BayEUG — Schulleitung (Gesamtverantwortung)',
      wortlaut: 'SL trägt Gesamtverantwortung für die Schule. Bei Bedrohungs-Vorfällen: SL ist Adressat für unverzügliche Information durch LK (Phase 2) + entscheidet operativ über Sicherungsmaßnahme nach Art. 87 + Anzeige-Entscheidung in Abstimmung mit EB.',
      karten: ['M07'],
    },
    'Art. 75 BayEUG': {
      titel: 'Art. 75 BayEUG — Unterrichtungspflicht ggü. EB',
      wortlaut: 'Eltern sind über wesentliche Vorgänge zu unterrichten, die ihr Kind betreffen — schriftlich, rechtzeitig vor Vollzug einer Ordnungsmaßnahme (i.V.m. Art. 88).',
      karten: [],
    },
    'Art. 86 BayEUG': {
      titel: 'Art. 86 BayEUG — Erziehungs- und Ordnungsmaßnahmen',
      wortlaut: 'Abs. 1: „Zur Sicherung des Bildungs- und Erziehungsauftrags oder zum Schutz von Personen und Sachen können Erziehungsmaßnahmen ... getroffen werden. Soweit andere Erziehungsmaßnahmen nicht ausreichen, können Ordnungs- und Sicherungsmaßnahmen ergriffen werden. Maßnahmen des Hausrechts bleiben stets unberührt. Alle Maßnahmen werden nach dem Grundsatz der Verhältnismäßigkeit ausgewählt." Abs. 2: 12-Punkte-Katalog Ordnungsmaßnahmen (Verweis bis Mehr-Schularten-Ausschluss). Abs. 3: Unzulässig u.a. körperliche Züchtigung, Kollektivstrafen, Maßnahmen außerschulischen Verhaltens (außer wenn Schul-Aufgabe gefährdet).',
      karten: ['M04', 'M05', 'M06'],
    },
    'Art. 87 BayEUG': {
      titel: 'Art. 87 BayEUG — Sicherungsmaßnahme (vorläufiger Ausschluss)',
      wortlaut: 'Bei akuter Gefahr für Leib oder Leben oder erheblicher Störung des Schulbetriebs kann die SL den vorläufigen Ausschluss eines SuS vom Unterricht aussprechen. Endet, sobald über die Ordnungsmaßnahme bestandskräftig entschieden wurde. NICHT zu verwechseln mit § 23/2 BaySchO (Sicherstellung Gegenstand).',
      karten: ['M03'],
    },
    'Art. 88 BayEUG': {
      titel: 'Art. 88 BayEUG — Verfahren bei Ordnungsmaßnahmen',
      wortlaut: 'Vor Verhängung von Ordnungsmaßnahmen sind SuS und EB zu hören. Die Maßnahme ist den EB schriftlich rechtzeitig vor Vollzug mitzuteilen. Bei Sicherungsmaßnahme (Art. 87) kann Anhörung im Eilfall nachgeholt werden.',
      karten: ['M05'],
    },
    '§ 23 BaySchO': {
      titel: '§ 23 BaySchO — Verbote / Wegnahme / Sicherstellung',
      wortlaut: 'Abs. 1: Konsum alkoholischer Getränke + sonstiger Rauschmittel in Schulanlage / bei schul. Veranstaltungen UNTERSAGT. Abs. 2 S. 1: Mitbringen + Mitführen gefährlicher Gegenstände + sonstiger Gegenstände, die Unterricht/Ordnung stören, untersagt. S. 2: „können weggenommen und sichergestellt werden" — Ermessen. S. 3: Rückgabe gefährlicher Gegenstände bei Minderj. NUR an Erziehungsberechtigte.',
      karten: ['M02'],
    },
    '§ 23/2 BaySchO': {
      titel: '§ 23 Abs. 2 BaySchO — Drei-Sätze-Logik',
      wortlaut: 'S. 1 Verbot (zwei Kategorien: gefährlich + ordnungsstörend) · S. 2 „können" Wegnahme (Ermessen, im Gefahrenfall auf Null reduziert) · S. 3 Rückgabe NUR an EB bei minderj. SuS — gilt NUR für „gefährliche", nicht „sonstige".',
      karten: ['M01', 'M02'],
    },
    '§ 5 LDO': {
      titel: '§ 5 LDO — Aufsichtspflicht (Schlüsselsatz)',
      wortlaut: 'Insbesondere hat die LK spätestens von Beginn des Unterrichts an im Unterrichtsraum anwesend zu sein und von diesem Zeitpunkt an während der gesamten Dauer des von ihr erteilten Unterrichts, erforderlichenfalls bis zum Weggang der SuS, die Aufsicht zu führen. Vollzitat siehe MP_06 A.2.',
      karten: [],
    },
    '§ 241 StGB': {
      titel: '§ 241 StGB — Bedrohung',
      wortlaut: 'Wer einen Menschen mit der Begehung einer gegen ihn oder eine ihm nahestehende Person gerichteten rechtswidrigen Tat bedroht, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. Bei Bedrohung mit einem Verbrechen erhöhter Strafrahmen.',
      karten: [],
    },
    '§ 224 StGB': {
      titel: '§ 224 StGB — Gefährliche Körperverletzung',
      wortlaut: 'Wer die Körperverletzung u. a. mittels eines gefährlichen Werkzeugs begeht, wird mit Freiheitsstrafe von 6 Monaten bis 10 Jahren bestraft. Versuch strafbar. Messer = klassisches „gefährliches Werkzeug".',
      karten: [],
    },
    '§ 138 StGB': {
      titel: '§ 138 StGB — Nichtanzeige geplanter Straftaten',
      wortlaut: 'Anzeigepflicht NUR bei taxativ aufgeführten schweren GEPLANTEN Straftaten (Mord, Totschlag, Geiselnahme, schwere Raubtaten …). Spontane Bedrohung mit Messer im Streit fällt regelmäßig NICHT unter § 138.',
      karten: ['M07'],
    },
    '§ 8a SGB VIII': {
      titel: '§ 8a SGB VIII — Schutzauftrag bei Kindeswohlgefährdung',
      wortlaut: 'Bei gewichtigen Anhaltspunkten für die Gefährdung des Kindeswohls schätzt das Jugendamt unter Hinzuziehung einer insoweit erfahrenen Fachkraft das Gefährdungsrisiko ab — Kooperation mit Schule. Greift bei strafunmündigen SuS (< 14 J., § 1 JGG) parallel zum Schulrecht statt der Strafanzeige.',
      karten: ['M08'],
    },
    '§ 1 JGG': {
      titel: '§ 1 JGG — Strafmündigkeit',
      wortlaut: 'Strafmündigkeit ab vollendetem 14. Lebensjahr. Unter 14 J. = strafunmündig — Strafanzeige bleibt rechtsfolgenlos. Schulrechtliche EOM + § 8a SGB VIII greifen parallel.',
      karten: ['M08'],
    },
    'Art. 131 BV': {
      titel: 'Art. 131 BV — Bildungsziele',
      wortlaut: 'Bildungsziele Bayern: Ehrfurcht vor Gott, Achtung vor religiöser Überzeugung und Würde des Menschen, Selbstbeherrschung, Verantwortungsgefühl, Demokratie, Völkerversöhnung. Verfassungsanker für Bildungs-/Erziehungsauftrag des Art. 86/1.',
      karten: [],
    },
    'WaffG': {
      titel: 'WaffG — Waffengesetz (Bund)',
      wortlaut: 'Bundesrecht: Mitführungsverbote bestimmter Waffen/Waffen-ähnliche Gegenstände. Bei Messer-Vorfällen meist subsidiär zu § 23/2 BaySchO. Polizei-Beschlagnahme nach § 94 StPO bei strafrechtlich relevanten Gegenständen.',
      karten: [],
    },
    'BayPolG': {
      titel: 'BayPolG — Bayerisches Polizeiaufgabengesetz',
      wortlaut: 'Rechtsgrundlage für Polizei-Verständigung in Eilfällen + polizeiliche Sicherstellung gefährlicher Gegenstände. Akut: 110.',
      karten: [],
    },
  },
};
