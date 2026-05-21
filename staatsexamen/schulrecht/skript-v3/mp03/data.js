// MP_03 — Rechtliche Ordnung des Schulbetriebs
// PDF-Abschnitt 3 (Skript zum Schulrecht 2024 — Stephan Bauer):
//   SL · Lehrerkonferenz · Schulleben · Ordnungsmaßnahmen · Sonstiges (Werbung, Datenerhebung, Fahrten, Pausenverkauf, Sammlungen, Spenden)
window.MODULE = {
  id: 'mp03',
  zalgm: 'ZALGM § 16 Nr. 3',
  schwerpunkt: [
    '3.1 Schulleiter:in',
    '3.2 Lehrerkonferenz',
    '3.3 Schulleben',
    '3.4 Ordnungsmaßnahmen (12-Katalog)',
    '3.5 Werbung · Datenerh. · Fahrten · Pausenverkauf',
  ],
  titel: 'Rechtl. Ordnung',
  titel2: 'des Schulbetriebs.',
  abriss:
    'SL trägt Gesamtverantwortung (Art. 57 BayEUG + LDO §§ 23-27). ' +
    'Lehrerkonferenz = kollegiales Beschlussorgan (Art. 58 + § 12 LDO). ' +
    'Erziehungs-/Ordnungs-/Sicherungsmaßnahmen Art. 86-88 als Drei-Stufen-Logik. ' +
    'Werbeverbot Art. 84 / Datenerhebung Art. 85 / Fahrten KMBek.',

  kurz: [
    'SL ist „Vorgesetzter aller LK an der Schule" + trägt **Gesamtverantwortung** für ordnungsgemäßen Ablauf von U. und Erziehung (Art. 57/2 BayEUG). Konkretisierung LDO §§ 23-27. Dienstaufsicht über LK, Hausrecht, Notenkonferenzen.',
    '**Lehrerkonferenz** (Art. 58 BayEUG + § 12 LDO): kollegiales Beschluss-Organ. Zuständig u.a. für Grundsätze HA, Probearbeiten, OM-Eskalation Art. 86/2 Nr. 6 (Ausschluss 2-4 Wochen / Klassenwechsel / Entlassung). Mehrheitsbeschluss; SL Stichentscheid.',
    'Schulleben Art. 56 BayEUG: SuS-Beteiligung + Mitwirkung. Schulvereinbarung, Schulforum (Art. 69), Schulpartner (KL ↔ EB ↔ SMV) als gestaltende Elemente. Schulkultur ist Bildungsauftrags-Träger.',
    '**Drei-Stufen-Logik OM** Art. 86: Erziehungsmaßnahmen (§ 86/1) → Ordnungsmaßnahmen (§ 86/2 = 12-er Katalog) → Sicherungsmaßnahmen (Art. 87). Subsidiarität + Verhältnismäßigkeit. Anhörung Art. 88 PFLICHT vorab.',
    '**Sonst. Regelungen**: Werbeverbot Art. 84 (politisch · religiös · weltanschaulich · gewerblich, mit 5 Schutzgüter-Schranke). Datenerhebung Art. 85 + § 41 BaySchO. Fahrten/Wanderungen KMBek (Wandertage, Schullandheim, Studienfahrten). Spenden/Sammlungen Art. 84/4 (zweckgebunden + EB-Information).',
  ],

  deck: { cards: 8, normebenen: 5, hochprior: 8, fallen: 10 },

  kartografie: [
    { ebene: 'I', bez: 'Bayerische Verfassung', kuerzel: 'BV', normen: ['Art. 89 BV', 'Art. 130 BV'], sub: 'Dienstherr · Staatliche Schulaufsicht' },
    { ebene: 'II', bez: 'BayEUG', kuerzel: 'BayEUG', normen: ['Art. 56', 'Art. 57', 'Art. 58', 'Art. 69', 'Art. 75', 'Art. 84', 'Art. 85', 'Art. 86', 'Art. 87', 'Art. 88'], sub: 'Schulleben · SL · LK-Konferenz · Schulforum · EB-Auskunft · Werbung · Datenerh. · OM' },
    { ebene: 'III', bez: 'BaySchO + BayMSO', kuerzel: 'VO', normen: ['§ 22 BaySchO', '§ 23 BaySchO', '§ 41 BaySchO'], sub: 'Aufsicht · Sicherstellung Gegenstand · Schülerakte' },
    { ebene: 'IV', bez: 'LDO', kuerzel: 'LDO', normen: ['§ 5 LDO', '§ 12 LDO', '§ 14 LDO', '§ 23 LDO', '§ 24 LDO', '§ 25 LDO', '§ 26 LDO', '§ 27 LDO'], sub: 'Aufsicht · LK-Konferenz · Verschwiegenheit · SL-Aufgaben' },
    { ebene: 'V', bez: 'Verwaltungsvorschriften', kuerzel: 'VV', normen: ['KMBek Fahrten', 'KMBek Schulverein'], sub: 'Wandertage · Pausenverkauf · Spenden + Sammlungen' },
  ],

  pflichtwissen: [
    {
      id: 'B01', titel: 'SL — Gesamtverantwortung',
      frage: 'Welche Norm verankert die Gesamtverantwortung der Schulleitung — und welche LDO-Pflichten konkretisieren sie?',
      antwort: 'Art. 57/2 BayEUG: „Die Schulleiterin oder der Schulleiter trägt die Gesamtverantwortung für die ordnungsgemäße Durchführung des Unterrichts und der Erziehungsarbeit an der Schule." Konkretisierung **LDO §§ 23-27**: § 23 Allgemeine Stellung (Vorgesetzter aller LK) · § 24 Dienstaufsicht (Unterrichtsbesuche, Beurteilung) · § 25 SL-Konferenz · § 26 Vertretung · § 27 Hausrecht.',
      norm: 'Art. 57 BayEUG', status: 'open',
    },
    {
      id: 'B02', titel: 'Lehrerkonferenz — Kernzuständigkeiten',
      frage: 'Welche Beschluss-Bereiche fallen in die Zuständigkeit der Lehrerkonferenz (Art. 58 BayEUG)?',
      antwort: 'Kollegiales Beschluss-Organ. Zentrale Zuständigkeiten: (1) **Grundsätze Hausaufgaben** (vor SJ-Beginn, BaySchO § 28/1 i.V.m. Art. 58). (2) **Grundsätze Probearbeiten** (vor SJ-Beginn, GrSO § 10/1). (3) **Ordnungsmaßnahmen-Eskalation** Art. 86/2 Nr. 6 (Ausschluss 2-4 Wochen) + Nr. 9 (Klassenwechsel) + Nr. 11 (Entlassung). (4) Notenkonferenzen für Zeugnisse + Vorrücken. Mehrheitsbeschluss; SL Stichentscheid.',
      norm: 'Art. 58 BayEUG', status: 'open',
    },
    {
      id: 'B03', titel: 'Art. 86/1 — Drei-Stufen-Logik',
      frage: 'Wie verhalten sich Erziehungs-, Ordnungs- und Sicherungsmaßnahmen zueinander?',
      antwort: 'Art. 86/1 BayEUG Eingangssatz: „Zur Sicherung des Bildungs- und Erziehungsauftrags oder zum Schutz von Personen und Sachen können Erziehungsmaßnahmen … getroffen werden. … Soweit andere Erziehungsmaßnahmen nicht ausreichen, können Ordnungs- und Sicherungsmaßnahmen ergriffen werden." **Subsidiarität**: Erziehung VOR OM. **Verhältnismäßigkeit** + **Eignung** + **Erforderlichkeit** + **Angemessenheit**.',
      norm: 'Art. 86 BayEUG', status: 'open',
    },
    {
      id: 'B04', titel: 'Art. 86/2 — 12-er OM-Katalog',
      frage: 'Welche 12 Ordnungsmaßnahmen kennt der Katalog des Art. 86/2 BayEUG?',
      antwort: '(1) schriftlicher Verweis · (2) verschärfter Verweis · (3) Versetzung in eine Parallelklasse · (4) Nacharbeit unter Aufsicht · (5) Ausschluss vom Unterricht **bis 6 U.-Tage** (SL) · (6) Ausschluss **2-4 Wochen** (Lehrerkonferenz, bei schul. Gefährdung) · (7) Androhung der Entlassung · (8) Entlassung von der Schule · (9) Zuweisung zu einer anderen Klasse derselben Schule · (10) Zuweisung an eine andere gleichartige Schule · (11) Entlassung an der Mittel-/Förder-/Berufsschule · (12) Ausschluss von allen Schulen der jeweiligen Schulart. Verfahren: Anhörung Art. 88 vorab.',
      norm: 'Art. 86/2 BayEUG', status: 'open',
    },
    {
      id: 'B05', titel: 'Art. 87 — Sicherungsmaßnahme PERSON',
      frage: 'Welche Funktion hat Art. 87 BayEUG — und worin unterscheidet sie sich von § 23 BaySchO?',
      antwort: 'Art. 87 BayEUG = **vorläufiger Unterrichts-Ausschluss einer PERSON** zur Gefahrenabwehr (bis zur endgültigen Entscheidung über OM). § 23 BaySchO = **Sicherstellung eines GEGENSTANDS**. Zwei separate Institute, parallel anwendbar. Verwechslung = Examens-Hauptfalle.',
      norm: 'Art. 87 BayEUG', status: 'open',
    },
    {
      id: 'B06', titel: 'Art. 88 — Anhörungspflicht',
      frage: 'Welche Verfahrenspflicht greift vor jeder Ordnungsmaßnahme?',
      antwort: 'Art. 88 BayEUG: Vor OM ist **SuS anzuhören**. Bei minderjährigen SuS sind **EB rechtzeitig zu informieren**. Bei Klassenkonferenz: protokollierte Anhörung. Nur bei Sicherungsmaßnahme Art. 87 darf Anhörung im Eilfall nachgeholt werden. Verfahrensfehler bei Vermischung → OM-Anfechtung.',
      norm: 'Art. 88 BayEUG', status: 'open',
    },
    {
      id: 'B07', titel: 'Art. 84 — Werbeverbot',
      frage: 'Welche vier Werbe-Kategorien sind in der Schule untersagt — und welche Ausnahme-Schranke gilt?',
      antwort: 'Art. 84 BayEUG: untersagt sind (1) **politische Werbung** (Abs. 2) · (2) **religiöse Werbung** · (3) **weltanschauliche Werbung** · (4) **gewerbliche Werbung** (Abs. 1). Ausnahme **politische Abzeichen** (Abs. 3): zulässig nur, wenn 5 Schutzgüter NICHT gefährdet — **Schulfrieden · Schulbetrieb · Bildungs-/Erziehungsauftrag · persönliche Ehre · Erziehung zur Toleranz**.',
      norm: 'Art. 84 BayEUG', status: 'open',
    },
    {
      id: 'B08', titel: 'Fahrten + Wanderungen + Pausenverkauf',
      frage: 'Welche normative Verortung haben schulische Fahrten und der Pausenverkauf?',
      antwort: '**Fahrten/Wanderungen**: KMBek Fahrten (Wandertage, Studienfahrten, Schullandheim, Skikurse) — pädagogische Begründung + EB-Zustimmung + Aufsichtskonzept. § 4 LDO regelt Teilnahmepflicht der LK. **Pausenverkauf**: KMBek über Pausenverkauf — Anbieter SMV oder Schulverein; Auflagen Hygiene + Lebensmittelrecht; Erlöse zweckgebunden. **Sammlungen/Spenden**: Art. 84/4 — zulässig nur mit SL-Genehmigung + Zweckbindung + EB-Information.',
      norm: 'KMBek Fahrten', status: 'open',
    },
  ],

  fallen: [
    { id: 'FA01', frage: 'SL kann allein einen 3-Wochen-Ausschluss verhängen?', antwort: 'NEIN. Art. 86/2 Nr. 5 (bis 6 U.-Tage) = SL. Nr. 6 (2-4 Wochen) = **Lehrerkonferenz** bei schul. Gefährdung. SL allein = max. 6 U.-Tage.' },
    { id: 'FA02', frage: 'Art. 87 BayEUG und § 23 BaySchO sind dasselbe?', antwort: 'NEIN. Art. 87 = PERSON-Sicherungsausschluss. § 23 BaySchO = GEGENSTAND-Sicherstellung. Zwei Institute, parallel.' },
    { id: 'FA03', frage: 'Anhörung der SuS kann immer nachgeholt werden?', antwort: 'NEIN. Bei **OM** Art. 86/2 = VORAB Pflicht (Art. 88). Nur bei **Sicherungsmaßnahme** Art. 87 darf im Eilfall nachgeholt werden.' },
    { id: 'FA04', frage: 'Klasse rausschicken bei Gefahr = Kollektivstrafe?', antwort: 'NEIN. Gefahrenabwehr nach § 5 LDO — KEINE OM. Art. 86/3 Nr. 2 verbietet nur ORDNUNGSMAßNAHMEN gegen Gruppe als solche.' },
    { id: 'FA05', frage: 'Politische Abzeichen sind in der Schule absolut verboten?', antwort: 'NEIN. Art. 84/3: zulässig, **wenn 5 Schutzgüter nicht gefährdet** (Schulfrieden · Schulbetrieb · Bildungsauftrag · pers. Ehre · Erziehung zur Toleranz). Einzelfall-Bewertung.' },
    { id: 'FA06', frage: 'Lehrerkonferenz braucht immer einstimmigen Beschluss?', antwort: 'NEIN. **Mehrheitsbeschluss** ist Regel (§ 12 LDO). Bei Stimmgleichheit: SL Stichentscheid.' },
    { id: 'FA07', frage: 'SL kann jede LK jederzeit zum U.-Besuch erscheinen?', antwort: 'JA. § 24 LDO Dienstaufsicht: SL hat Recht (+Pflicht) zur Unterrichtsbeobachtung; **Ankündigung üblich** (Verhältnismäßigkeit + Vertrauen), aber rechtlich nicht zwingend.' },
    { id: 'FA08', frage: 'Pausenverkauf ist freie Sache der SuS?', antwort: 'TEILWEISE. Wenn SMV betreibt: KMBek Pausenverkauf + Hygiene-Auflagen + zweckgebundene Erlöse. SL-Aufsicht + Lebensmittelrecht zu beachten.' },
    { id: 'FA09', frage: 'Ordnungswidrigkeiten der EB löst LK direkt aus?', antwort: 'NEIN. Art. 119 BayEUG OWi-Anzeige geht über SL an Kreisverwaltungsbehörde. LK informiert SL, nicht selbst Ordnungsbehörde.' },
    { id: 'FA10', frage: 'Entlassung von der Schule trifft Pflichtschüler:innen?', antwort: 'EINGESCHRÄNKT. Art. 86/3 Nr. 4: SuS in Vollzeit-Schulpflicht sind vor OM Nr. 9–12 geschützt (Ausnahme Nr. 11 bei MS/FöS/BS mit qualifiziertem Sachverhalt).' },
  ],

  faelle: [
    {
      id: 'F1',
      titel: 'Wiederholtes Stören — Eskalation',
      sachverhalt: 'Ein Schüler stört seit Wochen massiv den Unterricht. LK hat bereits zwei Einzelgespräche und einen Eintrag ins Klassenbuch dokumentiert. Wie geht es weiter?',
      knackpunkte: [
        '**Subsidiarität** Art. 86/1: erst Erziehungsmaßnahmen (Gespräch, Nacharbeit, Schul-Sozialarbeit), dann OM.',
        'OM-Stufung: Verweis Art. 86/2 Nr. 1 → verschärfter Verweis Nr. 2 → Versetzung Parallelklasse Nr. 3 → Nacharbeit Nr. 4 → Ausschluss 6 Tage Nr. 5 (SL) → 2-4 Wochen Nr. 6 (Lehrerkonferenz).',
        '**Anhörung** Art. 88 PFLICHT vor jeder OM. EB rechtzeitig informieren.',
        'Bei akuter Gefährdung: parallel Art. 87 Sicherungs-Ausschluss möglich.',
      ],
      antwortkette: 'Erziehungsmaßn. dokumentiert → Verhältnismäßigkeit prüfen → SL/Lehrerkonferenz einbinden → Anhörung Art. 88 → OM-Stufung wählen → schriftliche Begründung → ggf. Art. 87 bei Gefährdung.',
    },
    {
      id: 'F2',
      titel: 'AfD-Stand vor der Schule (Wahlkampf)',
      sachverhalt: 'Im Wahlkampf-Vorfeld baut die AfD vor dem Schulgelände einen Info-Stand auf. SuS gehen vorbei. Auf dem Schulhof bilden sich Diskussionen.',
      knackpunkte: [
        'Art. 84/2 BayEUG: politische Werbung **auf Schulgelände** untersagt.',
        '**Vor** dem Schulgelände = öffentlicher Raum — kein Werbeverbot über Schulrecht.',
        'Schulleitung kann Schutz des Bildungsbetriebs anmahnen: kein Verteilen auf Schulhof, kein Eintritt von Wahlkämpfern in Klassenräume.',
        'Verhältnis Art. 5 GG (Meinungsfreiheit): außerhalb Schule = freie politische Betätigung.',
      ],
      antwortkette: 'Verortung außerhalb/innerhalb Schulgelände → Werbeverbot Art. 84/2 nur innerhalb → Hausrecht SL § 27 LDO → bei Übertritt SL Anweisung + Polizei bei Bedarf → SuS-Beratung: Diskurs in Sozialkunde-Stunde.',
    },
    {
      id: 'F3',
      titel: 'Klassenfahrt mit Beförderungsrisiko',
      sachverhalt: 'Eine LK plant eine Klassenfahrt nach Berlin. Beförderung: privater Reisebus mit befreundetem Busunternehmer. SL fragt nach.',
      knackpunkte: [
        'KMBek Fahrten: pädagogische Begründung + EB-Zustimmung + Aufsichtskonzept (Min. 2 Begleitpersonen, Notfallkontakte, Krankheitsregeln).',
        '**Beförderung**: gewerblicher Reisebus mit gültiger Konzession + TÜV + Versicherung. Privater „Freund" + Bus ohne Personenbeförderungsschein = unzulässig.',
        'SL muss Fahrt genehmigen (§ 4 LDO + KMBek).',
        'Versicherungs-Lage: Schüler-Unfallversicherung (KUVB) deckt Schulveranstaltungen; Bus-Versicherung getrennt.',
      ],
      antwortkette: 'Pädagogische Begründung + Konzept → SL-Genehmigung beantragen → Beförderer mit Konzession (nicht „Freund") → EB-Zustimmung + Notfallinformation → Versicherungs-Lage prüfen.',
    },
    {
      id: 'F4',
      titel: 'Spenden-Aufruf nach Erdbeben',
      sachverhalt: 'Nach einem Erdbeben in der Türkei fragt eine LK: „Können wir in der KL-Stunde Geld sammeln und an eine Hilfsorganisation überweisen?"',
      knackpunkte: [
        'Art. 84/4 BayEUG: Sammlungen + Spenden in der Schule **nur mit SL-Genehmigung** + Zweckbindung + EB-Information.',
        'Träger: Schulverein oder anerkannter humanitärer Verband — KEINE LK-Privatkonten.',
        'EB-Information vorab + Freiwilligkeit (kein Sozial-Druck).',
        'Schule kann thematisch sensibilisieren (Sozialkunde, Religion, Ethik) — Spende kompetenz-bewusst, nicht emotional inszeniert.',
      ],
      antwortkette: 'SL-Genehmigung beantragen → seriöser Hilfsorganisations-Partner → EB-Information + Freiwilligkeits-Klausel → Dokumentation Erlöse + Verwendungsnachweis → fachliche Einbettung (Geographie/Sozialkunde).',
    },
  ],

  vertiefung: [
    {
      id: 'A1', kuerzel: 'A.1', titel: 'Schulleitung — Gesamtverantwortung',
      anriss: 'Art. 57 BayEUG + LDO §§ 23-27. Vorgesetzter aller LK · Dienstaufsicht · Hausrecht · SL-Konferenz. Vertretung im Verhinderungsfall.',
      norm: 'Art. 57 BayEUG', status: 'open', cards: 3,
      subblocks: [
        { label: 'Art. 57/2 BayEUG Wortlaut', cards: 1 },
        { label: 'LDO §§ 23-27 Aufgabenkatalog', cards: 1 },
        { label: 'Hausrecht + Notfälle', cards: 1 },
      ],
    },
    {
      id: 'A2', kuerzel: 'A.2', titel: 'Lehrerkonferenz',
      anriss: 'Art. 58 BayEUG + § 12 LDO. Kollegiales Beschlussorgan. Grundsätze HA + Probearbeiten + Notenkonferenzen + OM-Eskalation. Mehrheitsbeschluss · SL Stichentscheid.',
      norm: 'Art. 58 BayEUG', status: 'open', cards: 2,
      subblocks: [
        { label: 'Zuständigkeiten + Beschluss-Form', cards: 1 },
        { label: 'OM-Eskalation Nr. 6/9/11', cards: 1 },
      ],
    },
    {
      id: 'A3', kuerzel: 'A.3', titel: 'Schulleben',
      anriss: 'Art. 56 BayEUG: SuS-Mitwirkung + Schulvereinbarung. Schulforum (Art. 69) als Bindeglied EB ↔ Schule ↔ Aufwandsträger. Schulpartner-Verbund KL ↔ EB ↔ SMV.',
      norm: 'Art. 56 BayEUG', status: 'open', cards: 2,
      subblocks: [
        { label: 'SuS-Beteiligung + Schulvereinbarung', cards: 1 },
        { label: 'Schulforum Art. 69', cards: 1 },
      ],
    },
    {
      id: 'A4', kuerzel: 'A.4', titel: 'Erziehungs-, Ordnungs- und Sicherungsmaßnahmen',
      anriss: 'Drei-Stufen-Logik Art. 86/1 (Subsidiarität). 12-er OM-Katalog Art. 86/2. Sicherungs-Ausschluss Art. 87 (PERSON) ≠ § 23 BaySchO (GEGENSTAND). Anhörung Art. 88 PFLICHT vorab.',
      norm: 'Art. 86 BayEUG', status: 'open', cards: 5,
      subblocks: [
        { label: 'Drei-Stufen-Logik 86/1', cards: 1 },
        { label: '12-er OM-Katalog Wortlaut', cards: 1 },
        { label: 'Zuständigkeit SL vs. Lehrerkonferenz', cards: 1 },
        { label: 'Art. 87 Sicherung PERSON ≠ § 23 BaySchO', cards: 1 },
        { label: 'Anhörung Art. 88 Verfahren', cards: 1 },
      ],
    },
    {
      id: 'A5', kuerzel: 'A.5', titel: 'Werbung · Datenerhebung · Fahrten · Spenden',
      anriss: 'Art. 84 Werbeverbot (4 Kategorien + 5-Schutzgüter-Schranke). Art. 85 Datenerhebung + § 41 BaySchO Schülerakte. KMBek Fahrten + Pausenverkauf. Spenden Art. 84/4.',
      norm: 'Art. 84 BayEUG', status: 'open', cards: 4,
      subblocks: [
        { label: 'Werbeverbot 4 Kategorien', cards: 1 },
        { label: 'Datenerhebung Art. 85', cards: 1 },
        { label: 'Fahrten + Wanderungen KMBek', cards: 1 },
        { label: 'Spenden + Pausenverkauf', cards: 1 },
      ],
    },
  ],

  glossar: {
    'Art. 89 BV': { titel: 'Art. 89 BV — Dienstherr-Verfassungsanker', wortlaut: 'Verfassungsrechtliche Verankerung der staatlichen Schulaufsicht in Bayern. I.V.m. {{Art. 130 BV}}.', karten: [] },
    'Art. 130 BV': { titel: 'Art. 130 BV — Staatliche Schulaufsicht', wortlaut: '„Das gesamte Schul- und Bildungswesen steht unter der Aufsicht des Staates" (Verfassungs-Spiegelung Art. 7/1 GG).', karten: [] },
    'Art. 56 BayEUG': { titel: 'Art. 56 BayEUG — Schulleben + SuS-Beteiligung', wortlaut: 'Abs. 1: SuS gestalten das Schulleben aktiv mit. Abs. 2: Rechte (Information · Beratung · Beschwerde · Mitwirkung). Abs. 4: U.-Pflicht + Verhaltenspflicht. Abs. 5: Beschwerdeweg LK → SL → Schulforum.', karten: [] },
    'Art. 57 BayEUG': { titel: 'Art. 57 BayEUG — Schulleitung', wortlaut: 'Abs. 1: SL leitet die Schule. Abs. 2: „Die Schulleiterin oder der Schulleiter trägt die Gesamtverantwortung für die ordnungsgemäße Durchführung des Unterrichts und der Erziehungsarbeit an der Schule." Vorgesetzter aller LK an der Schule.', karten: ['B01'] },
    'Art. 58 BayEUG': { titel: 'Art. 58 BayEUG — Lehrerkonferenz', wortlaut: 'Kollegiales Beschluss-Organ. Mitglieder = alle LK der Schule. Vorsitz SL. Zuständig u.a. für Grundsätze HA, Probearbeiten, OM-Eskalation (Art. 86/2 Nr. 6/9/11), Notenkonferenzen. Mehrheitsbeschluss; SL Stichentscheid.', karten: ['B02'] },
    'Art. 69 BayEUG': { titel: 'Art. 69 BayEUG — Schulforum', wortlaut: 'Beratendes Gremium an Mittelschule: SL + Elternbeirat-Vertretung + SMV-Vertretung + Schulträger-Vertretung + bis 2 LK. Aufgabe: Beratung des Schullebens, der Schulentwicklung, des Bildungsangebots.', karten: [] },
    'Art. 75 BayEUG': { titel: 'Art. 75 BayEUG — EB-Auskunft', wortlaut: 'EB sind über wesentliche, ihr Kind betreffende Vorgänge zu unterrichten. Bei OM: schriftlich, rechtzeitig vor Vollzug.', karten: ['B06'] },
    'Art. 84 BayEUG': { titel: 'Art. 84 BayEUG — Werbeverbot', wortlaut: 'Abs. 1: gewerbliche Werbung auf Schulgelände untersagt. Abs. 2: politische, religiöse, weltanschauliche Werbung untersagt. Abs. 3: politische Abzeichen zulässig, wenn 5 Schutzgüter nicht gefährdet (Schulfrieden · Schulbetrieb · Bildungs-/Erziehungsauftrag · persönliche Ehre · Erziehung zur Toleranz). Abs. 4: Sammlungen + Spenden nur mit SL-Genehmigung + Zweckbindung + EB-Information.', karten: ['B07'] },
    'Art. 85 BayEUG': { titel: 'Art. 85 BayEUG — Datenerhebung', wortlaut: 'Datenerhebung in der Schule nur, soweit zur Aufgaben-Erfüllung erforderlich. Konkretisierung BaySchO § 41 (Schülerakte) + DSGVO. Einwilligungsbedürftige Datenkategorien.', karten: [] },
    'Art. 86 BayEUG': { titel: 'Art. 86 BayEUG — Erziehungs- + Ordnungsmaßnahmen', wortlaut: 'Abs. 1: „Zur Sicherung des Bildungs- und Erziehungsauftrags oder zum Schutz von Personen und Sachen können Erziehungsmaßnahmen … getroffen werden. … Soweit andere Erziehungsmaßnahmen nicht ausreichen, können Ordnungs- und Sicherungsmaßnahmen ergriffen werden." Abs. 2: 12er-OM-Katalog (Verweis · verschärfter Verweis · Parallelklasse · Nacharbeit · Ausschluss 6 Tage · Ausschluss 2–4 Wochen · Entlassungsandrohung · Entlassung · Klassenwechsel · andere Schule · Entlassung MS/FöS/BS · Ausschluss alle Schulen einer Art). Abs. 3 Verbote: körperl. Züchtigung · Kollektivstrafen · Strafarbeiten · entwürdigende Strafen. Abs. 3 Nr. 4 Schutz Pflichtschüler vor Nr. 9–12.', karten: ['B03', 'B04'] },
    'Art. 87 BayEUG': { titel: 'Art. 87 BayEUG — Sicherungsmaßnahme', wortlaut: 'Vorläufiger U.-Ausschluss einer **PERSON** zur Gefahrenabwehr, bis zur endgültigen Entscheidung über OM. Anhörung im Eilfall nachholbar. Abgrenzung: § 23 BaySchO = Sicherstellung GEGENSTAND (zwei Institute).', karten: ['B05'] },
    'Art. 88 BayEUG': { titel: 'Art. 88 BayEUG — Anhörungspflicht', wortlaut: 'Vor jeder OM ist SuS anzuhören. EB sind zu informieren. Bei minderjähriger SuS: rechtzeitige EB-Information. Protokollierung empfohlen. Nur Art. 87 erlaubt Eilfall-Nachholung.', karten: ['B06'] },
    '§ 5 LDO': { titel: '§ 5 LDO — Aufsichtspflicht', wortlaut: 'LK wirkt bei Aufsicht mit; auch außerhalb eigenen U. Bei Notfall „die notwendigen und möglichen Maßnahmen". SL-Einteilung. Wandertage/Schullandheim mit eingeschlossen.', karten: [] },
    '§ 12 LDO': { titel: '§ 12 LDO — Lehrerkonferenz', wortlaut: 'Konkretisierung Art. 58 BayEUG. Sitzungs-Form, Beschluss-Mehrheit, Vorsitz SL. Protokollierung. Vertraulichkeit.', karten: ['B02'] },
    '§ 23 LDO': { titel: '§ 23 LDO — Allgemeine Stellung SL', wortlaut: 'SL ist Vorgesetzter aller LK an der Schule. Trägt Gesamtverantwortung (Art. 57/2 BayEUG). Verantwortung für ordnungsgemäßen Schulbetrieb.', karten: ['B01'] },
    '§ 24 LDO': { titel: '§ 24 LDO — Dienstaufsicht', wortlaut: 'SL übt Dienstaufsicht über LK aus. U.-Besuche, Beurteilung, Personalführung. Beratungs- + Förder-Pflicht.', karten: [] },
    '§ 25 LDO': { titel: '§ 25 LDO — SL-Konferenz', wortlaut: 'SL beruft die Lehrerkonferenz ein, leitet sie. Tagesordnung. Beschlussfähigkeit.', karten: [] },
    '§ 26 LDO': { titel: '§ 26 LDO — Stellvertretung', wortlaut: 'Stellvertretende SL übernimmt im Verhinderungsfall + bei Vakanz. Hierarchie Stellvertretung.', karten: [] },
    '§ 27 LDO': { titel: '§ 27 LDO — Hausrecht', wortlaut: 'SL übt das Hausrecht in den Schulanlagen aus. Zutrittsverweigerung + Verweis schulfremder Personen.', karten: [] },
    '§ 23 BaySchO': { titel: '§ 23 BaySchO — Sicherstellung GEGENSTAND', wortlaut: 'Abs. 2: Gegenstände, die den U. stören oder die Sicherheit gefährden, können sichergestellt werden. Rückgabe nach U.-Ende oder an EB. UNTERSCHIED zu Art. 87 BayEUG (PERSON-Ausschluss) — zwei Institute, parallel.', karten: ['B05'] },
    '§ 41 BaySchO': { titel: '§ 41 BaySchO — Schülerakte', wortlaut: 'Abs. 1: Einsichts-Berechtigte: SuS ab Vollendung 14. Lj. + aktuelle EB + frühere EB bis Vollendung 21. Lj. der SuS. Aufbewahrungs-Fristen.', karten: [] },
    'KMBek Fahrten': { titel: 'KMBek Fahrten und Wanderungen', wortlaut: 'Regelung schulischer Veranstaltungen außerhalb der Schulanlage: Wandertage (1-2 / SJ), Schullandheim, Studienfahrten, Skikurse. Pädagogische Begründung + EB-Zustimmung + Aufsichtskonzept + SL-Genehmigung.', karten: ['B08'] },
    'KMBek Schulverein': { titel: 'KMBek Schulverein + Pausenverkauf', wortlaut: 'Regelungen zu schulischen Vereinen (Förderverein), Pausenverkauf, Verkaufsständen. SMV-Mitwirkung. Hygiene + Lebensmittelrecht. Zweckbindung der Erlöse.', karten: ['B08'] },
  },
};
