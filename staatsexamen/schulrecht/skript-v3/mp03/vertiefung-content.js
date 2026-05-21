// MP_03 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Die Schulleitung trägt **Gesamtverantwortung** für ordnungsgemäßen Unterrichts- und Erziehungsbetrieb ({{Art. 57 BayEUG}}/2). LDO §§ 23-27 konkretisieren: SL = Vorgesetzter aller LK · Dienstaufsicht · Hausrecht · Stellvertretung.'
    },

    { type: 'h', text: 'Art. 57/2 BayEUG — verbatim' },
    { type: 'p', text:
      '„Die Schulleiterin oder der Schulleiter trägt die Gesamtverantwortung für die ordnungsgemäße Durchführung des Unterrichts und der Erziehungsarbeit an der Schule." → umfassende Letztverantwortung, nicht delegierbar.'
    },

    { type: 'h', text: 'LDO §§ 23-27 — Aufgabenkatalog' },
    { type: 'table',
      head: ['Norm', 'Funktion'],
      rows: [
        ['{{§ 23 LDO}}', 'Allgemeine Stellung — Vorgesetzter aller LK an der Schule; Gesamtverantwortung.'],
        ['{{§ 24 LDO}}', 'Dienstaufsicht — U.-Besuche, Beurteilung, Personalführung, Beratungs-/Förder-Pflicht.'],
        ['{{§ 25 LDO}}', 'SL-Konferenz — Einberufung, Vorsitz, Tagesordnung, Beschlussfähigkeit.'],
        ['{{§ 26 LDO}}', 'Stellvertretung — im Verhinderungsfall + Vakanz.'],
        ['{{§ 27 LDO}}', 'Hausrecht — Zutrittsverweigerung + Verweis schulfremder Personen.'],
      ],
    },

    { type: 'h', text: 'Hausrecht + Notfälle' },
    { type: 'bullets', items: [
      'Hausrecht **innerhalb der Schulanlage** ({{§ 27 LDO}}) — auch ggü. EB und Externen.',
      'Bei akuter Gefährdung: SL kann polizeiliche Hilfe anfordern (Hausfriedensbruch § 123 StGB).',
      'Schule **außerhalb Schulanlage**: Aufsichtspflicht der LK (§ 5 LDO) gilt; Hausrecht des Veranstalters.',
      'Bei Verhinderung SL: Vertretung greift automatisch ({{§ 26 LDO}}).',
    ]},

    { type: 'warn', titel: '⚠ Fallen SL', text:
      '**SL ist nicht „Chef" aller LK im Sinne eines Konzerns** — er ist Vorgesetzter, aber Lehrerkonferenz hat eigene Beschluss-Bereiche (Art. 58). **Dienstaufsicht** bedeutet nicht „jederzeit unangekündigt im U." — Verhältnismäßigkeit gilt. **Hausrecht** endet an der Schulanlage; auf Schulweg + Wanderungen greift Aufsichtspflicht.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Norm verankert die Gesamtverantwortung der SL?',
        a: '{{Art. 57 BayEUG}}/2. Konkretisierung in {{§ 23 LDO}}-§ 27 LDO.' },
      { q: 'Wer übt das Hausrecht an der Schule aus?',
        a: 'Die SL ({{§ 27 LDO}}). Bei Verhinderung: Stellvertretung ({{§ 26 LDO}}).' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Die **Lehrerkonferenz** ({{Art. 58 BayEUG}} + {{§ 12 LDO}}) ist das kollegiale Beschluss-Organ der Schule. Mitglieder = alle LK. Vorsitz SL. Mehrheitsbeschluss; SL Stichentscheid bei Stimmgleichheit.'
    },

    { type: 'h', text: 'Zuständigkeiten + Beschluss-Form' },
    { type: 'table',
      head: ['Bereich', 'Anker'],
      rows: [
        ['**Grundsätze Hausaufgaben**', '{{Art. 58}} i.V.m. § 28/1 BaySchO — vor SJ-Beginn festlegen'],
        ['**Grundsätze Probearbeiten**', '{{Art. 58}} i.V.m. § 10/1 GrSO — Verteilung + Maßstab'],
        ['**Notenkonferenzen**', 'Vorrücken, Zeugnisse, Jgst.-Wiederholung'],
        ['**OM-Eskalation**', '{{Art. 86/2}} Nr. 6 (2-4 Wochen) · Nr. 9 (Klassenwechsel) · Nr. 11 (Entlassung)'],
        ['**Schulentwicklung**', 'Grundsätze schulinterner Fortbildung, Schulprofil'],
      ],
    },

    { type: 'h', text: 'OM-Zuständigkeit: SL vs. Lehrerkonferenz' },
    { type: 'bullets', items: [
      '**Bis 6 U.-Tage Ausschluss** (Art. 86/2 Nr. 5): SL allein.',
      '**2-4 Wochen Ausschluss** (Nr. 6): Lehrerkonferenz.',
      '**Klassenwechsel** (Nr. 9): Lehrerkonferenz.',
      '**Entlassung** (Nr. 11): Lehrerkonferenz.',
      '**Verweis + verschärfter Verweis** (Nr. 1+2): SL oder beauftragte LK.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Lehrerkonferenz', text:
      '**Mehrheitsbeschluss ≠ Einstimmigkeit** — Lehrerkonferenz entscheidet mit einfacher Mehrheit. **SL kann nicht überstimmen** — Stichentscheid nur bei Stimmgleichheit. **Vertraulichkeit** der Beratungen — Diskussions-Inhalte gehen nicht nach außen ({{§ 14 LDO}} Verschwiegenheit). **Klassenkonferenz** (= Kreis der in einer Klasse unterrichtenden LK) ist eigenes Beratungsorgan und nicht identisch mit Lehrerkonferenz.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer beschließt einen Ausschluss von 3 Wochen?',
        a: 'Die Lehrerkonferenz ({{Art. 86/2}} Nr. 6 BayEUG i.V.m. {{Art. 58}}).' },
      { q: 'Wer beschließt die Grundsätze für Hausaufgaben?',
        a: 'Die Lehrerkonferenz vor SJ-Beginn ({{Art. 58}} + § 28/1 BaySchO).' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Schulleben ist mehr als U. — SuS-Beteiligung, Schulvereinbarung, Schulforum als Bindeglied EB ↔ Schule ↔ Aufwandsträger. Anker {{Art. 56 BayEUG}} (SuS-Rechte) + {{Art. 69 BayEUG}} (Schulforum).'
    },

    { type: 'h', text: 'SuS-Beteiligung + Schulvereinbarung' },
    { type: 'bullets', items: [
      '**Mitwirkung der SuS** ({{Art. 56}}/1): Aktive Gestaltung des Schullebens.',
      '**Rechte SuS** ({{Art. 56}}/2): Information · Beratung · Beschwerde · Mitwirkung.',
      '**Pflichten SuS** ({{Art. 56}}/4): Schulpflicht-Teilnahme + Verhaltenspflicht.',
      '**Schulvereinbarung**: schulinterne Selbst-Bindung (Werte, Regeln, Konfliktlösung) — keine RV; aber praxisrelevante Orientierung.',
      '**Beschwerdeweg** ({{Art. 56}}/5): nacheinander LK → SL → Schulforum (NICHT parallel).',
    ]},

    { type: 'h', text: 'Schulforum Art. 69 BayEUG' },
    { type: 'p', text:
      'Beratendes Gremium an Mittelschule. Mitglieder: **SL** + **Elternbeirat-Vertretung** + **SMV-Vertretung** + **Schulträger-Vertretung** + **bis 2 LK**. Aufgabe: Beratung des Schullebens, der Schulentwicklung, des Bildungsangebots. Bindeglied EB ↔ Schule ↔ Aufwandsträger.'
    },

    { type: 'h', text: 'Schulpartner-Verbund' },
    { type: 'table',
      head: ['Partner', 'Pflicht', 'Anker'],
      rows: [
        ['**SuS**', 'Mitwirkung + Schulbesuch + Verhalten', '{{Art. 56}} BayEUG'],
        ['**LK**', 'U., Erziehung, Aufsicht, Beratung', '{{Art. 59}} BayEUG + LDO'],
        ['**KL**', 'Pädagogische + organisator. Koordination', '§ 6 LDO'],
        ['**EB**', 'Achten auf + Unterstützen', '{{Art. 76}} BayEUG'],
        ['**SL**', 'Gesamtverantwortung', '{{Art. 57}}/2 BayEUG'],
        ['**Schulforum**', 'Beratung schulinterner Themen', '{{Art. 69}} BayEUG'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen Schulleben', text:
      '**Beschwerdeweg ist GESTUFT**, nicht parallel — Eltern dürfen nicht direkt zur Pressestelle des KM gehen. **Schulvereinbarung** ist keine Rechtsverordnung — sie verpflichtet schulintern, ist aber kein vor Gericht einklagbares Recht. **Schulforum ≠ Elternbeirat**: zwei verschiedene Gremien.',
    },

    { type: 'selfcheck', items: [
      { q: 'In welcher Reihenfolge geht die Beschwerde nach Art. 56/5?',
        a: 'LK → SL → Schulforum. Gestuft, NICHT parallel.' },
      { q: 'Wer ist Mitglied im Schulforum?',
        a: 'SL + Elternbeirat-Vertretung + SMV-Vertretung + Schulträger-Vertretung + bis 2 LK ({{Art. 69}} BayEUG).' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      '**Drei-Stufen-Logik** {{Art. 86/1}} BayEUG: Erziehungsmaßnahmen → Ordnungsmaßnahmen → Sicherungsmaßnahmen. Subsidiarität + Verhältnismäßigkeit. Anhörung Art. 88 PFLICHT vorab.'
    },

    { type: 'h', text: 'Art. 86/1 — Eingangssatz (verbatim)' },
    { type: 'p', text:
      '„Zur Sicherung des Bildungs- und Erziehungsauftrags oder zum Schutz von Personen und Sachen können Erziehungsmaßnahmen gegenüber Schülerinnen und Schülern getroffen werden. ²Dazu zählt bei nicht hinreichender Beteiligung der Schülerin oder des Schülers am Unterricht auch eine Nacharbeit unter Aufsicht einer Lehrkraft. ³Soweit andere Erziehungsmaßnahmen nicht ausreichen, können Ordnungs- und Sicherungsmaßnahmen ergriffen werden." → **Subsidiarität**: erst Erziehung, dann OM.'
    },

    { type: 'h', text: '12-er OM-Katalog Art. 86/2' },
    { type: 'table',
      head: ['Nr.', 'Maßnahme', 'Zuständigkeit'],
      rows: [
        ['1', 'Schriftlicher Verweis', 'SL oder beauftragte LK'],
        ['2', 'Verschärfter Verweis', 'SL'],
        ['3', 'Versetzung in eine Parallelklasse', 'SL'],
        ['4', 'Nacharbeit unter Aufsicht', 'LK (Erziehungsmaßnahme nach 86/1 S. 2)'],
        ['5', '**Ausschluss vom U. bis 6 U.-Tage**', '**SL**'],
        ['6', '**Ausschluss 2-4 Wochen** (bei schul. Gefährdung)', '**Lehrerkonferenz**'],
        ['7', 'Androhung der Entlassung', 'Lehrerkonferenz'],
        ['8', 'Entlassung von der Schule', 'Lehrerkonferenz'],
        ['9', 'Zuweisung zu anderer Klasse derselben Schule', 'Lehrerkonferenz'],
        ['10', 'Zuweisung an andere gleichartige Schule', 'Schulaufsichtsbehörde'],
        ['11', 'Entlassung an der Mittel-/Förder-/Berufsschule', 'Lehrerkonferenz'],
        ['12', 'Ausschluss von allen Schulen der Schulart', 'Staatsministerium'],
      ],
    },

    { type: 'h', text: 'Art. 87 Sicherungs-PERSON ≠ § 23 BaySchO Sicherstellung-GEGENSTAND' },
    { type: 'bullets', items: [
      '{{Art. 87 BayEUG}}: **vorläufiger U.-Ausschluss einer PERSON** zur Gefahrenabwehr — bis zur endgültigen OM-Entscheidung.',
      '{{§ 23 BaySchO}}: **Sicherstellung eines GEGENSTANDS**, der U. stört oder Sicherheit gefährdet.',
      'Zwei separate Institute — Verwechslung = Examens-Hauptfalle.',
      'Anhörung bei Art. 87 im Eilfall NACH-holbar; bei Art. 86 OM = vorab PFLICHT.',
    ]},

    { type: 'h', text: 'Art. 88 Anhörungsverfahren' },
    { type: 'p', text:
      'Vor jeder OM ist die/der SuS **anzuhören**. Bei minderjähriger SuS sind **EB rechtzeitig zu informieren** und können an der Anhörung teilnehmen. Bei Klassenkonferenz: Protokollierung der Anhörung. **Verfahrensfehler** (Anhörung fehlt) → Anfechtungsmöglichkeit gegen OM.'
    },

    { type: 'h', text: 'Verbote Art. 86/3' },
    { type: 'bullets', items: [
      'Körperliche Züchtigung verboten.',
      '**Kollektivstrafen** verboten (Nr. 2) — gegen Gruppen als solche.',
      '„**Strafarbeiten**" verboten (Nr. 3) — zusätzliche Aufgaben als reine Sanktion.',
      '**Entwürdigende** Strafen verboten.',
      'Vollzeit-Pflichtschüler:innen sind vor OM Nr. 9–12 geschützt (Nr. 4 — Ausnahme Nr. 11 bei MS/FöS/BS).',
    ]},

    { type: 'warn', titel: '⚠ Fallen OM', text:
      '**Klasse rausschicken bei Gefahr** ist GEFAHRENABWEHR (§ 5 LDO), keine OM — Art. 86/3 Nr. 2 Kollektivstrafen-Verbot greift NICHT. **Ausschluss 3 Wochen** ≠ SL allein — das ist Lehrerkonferenz (Nr. 6). **Anhörung** ist VORAB Pflicht — nur Art. 87 erlaubt Nachholen. **Strafarbeit** = zusätzliche Aufgabe als Sanktion (verboten). **Nacharbeit** ist Erziehungsmaßnahme (erlaubt, 86/1 S. 2) — die Begriffsabgrenzung ist entscheidend.',
    },

    { type: 'selfcheck', items: [
      { q: 'Was ist der Unterschied Art. 87 BayEUG vs. § 23 BaySchO?',
        a: 'Art. 87 = PERSON-Sicherungsausschluss (vorläufig). § 23 BaySchO = GEGENSTAND-Sicherstellung. Zwei Institute.' },
      { q: 'Wer beschließt die OM Nr. 6 (2-4 Wochen Ausschluss)?',
        a: 'Die Lehrerkonferenz ({{Art. 86/2}} Nr. 6 i.V.m. {{Art. 58}}). SL allein nur bis 6 U.-Tage (Nr. 5).' },
      { q: 'Welche OM darf bei einer pflichtschulpflichtigen SuS NICHT angewendet werden?',
        a: 'OM Nr. 9–12 (Art. 86/3 Nr. 4) — Ausnahme Nr. 11 bei MS/FöS/BS mit qualifiziertem Sachverhalt.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Sonstige Regelungen des Schulbetriebs: **Werbeverbot** {{Art. 84 BayEUG}} (4 Kategorien + 5-Schutzgüter-Schranke). **Datenerhebung** Art. 85 + § 41 BaySchO. **Fahrten/Wanderungen** + **Pausenverkauf** KMBek. **Spenden** Art. 84/4.'
    },

    { type: 'h', text: 'Werbeverbot — 4 Kategorien' },
    { type: 'table',
      head: ['Kategorie', 'Norm', 'Inhalt'],
      rows: [
        ['**Gewerbliche** Werbung', '{{Art. 84}}/1', 'auf Schulgelände untersagt; Ausnahme: pädagogisch begründete Information'],
        ['**Politische** Werbung', '{{Art. 84}}/2', 'auf Schulgelände + bei Schulveranstaltungen untersagt'],
        ['**Religiöse** Werbung', '{{Art. 84}}/2', 'untersagt (ReliU-Pflicht-Fach bleibt davon unberührt)'],
        ['**Weltanschauliche** Werbung', '{{Art. 84}}/2', 'untersagt'],
      ],
    },

    { type: 'h', text: 'Politische Abzeichen (Art. 84/3) — 5-Schutzgüter-Schranke' },
    { type: 'p', text:
      'Politische Abzeichen sind zulässig **nur**, wenn folgende 5 Schutzgüter NICHT gefährdet sind: (1) **Schulfrieden** · (2) **Schulbetrieb** · (3) **Bildungs-/Erziehungsauftrag** · (4) **persönliche Ehre** · (5) **Erziehung zur Toleranz**. Einzelfall-Bewertung.'
    },

    { type: 'h', text: 'Datenerhebung Art. 85 + § 41 BaySchO' },
    { type: 'bullets', items: [
      '**Art. 85**: Datenerhebung nur, soweit zur Aufgaben-Erfüllung erforderlich.',
      '**§ 41 BaySchO**: Schülerakte — Einsichts-Berechtigte SuS ab Vollendung 14. Lj. + aktuelle EB + frühere EB bis Vollendung 21. Lj.',
      '**DSGVO Art. 15**: Auskunfts-Recht der Betroffenen + Berichtigungs-Recht.',
      'Werbung Art. 84 + Datenerhebung Art. 85 als Begrenzungs-Anker schulischer Außenkommunikation.',
    ]},

    { type: 'h', text: 'Fahrten + Wanderungen — KMBek' },
    { type: 'table',
      head: ['Veranstaltung', 'Charakteristikum'],
      rows: [
        ['Wandertage', '1–2 / SJ; pädagogische Begründung; Aufsichtskonzept; EB-Zustimmung'],
        ['Schullandheim', 'Mehrtägig (i.d.R. 3–5 Tage); Min. 2 Begleitpersonen; Notfallkonzept'],
        ['Studienfahrten', 'Höhere Jgst.; fachlich-pädagogisch begründet; mehrtägig'],
        ['Skikurse', 'Spezielle Sicherheits-Anforderungen; ausgebildete Begleitung'],
      ],
    },

    { type: 'h', text: 'Pausenverkauf + Spenden + Sammlungen' },
    { type: 'bullets', items: [
      '**Pausenverkauf** KMBek Schulverein: SMV oder Schulverein als Träger; Hygiene + Lebensmittelrecht; zweckgebundene Erlöse.',
      '**Sammlungen + Spenden** {{Art. 84}}/4: nur mit **SL-Genehmigung** + Zweckbindung + EB-Information.',
      'Träger: anerkannter humanitärer Verband oder Schulverein — KEINE LK-Privatkonten.',
      'Freiwilligkeit + Anti-Druck-Klausel.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Werbung + Sonstiges', text:
      '**Werbeverbot greift NUR auf Schulgelände** — außerhalb (Wahlkampfstand vor Schule) ist es Sache des öffentlichen Rechts/Polizei. **Politische Abzeichen** sind nicht absolut verboten — Einzelfall-Schranke. **Beförderung Klassenfahrt**: gewerblicher Reisebus mit Konzession + Versicherung; privater „Freund" ist unzulässig. **Spenden** ohne SL-Genehmigung sind unzulässig — auch wenn die Sache moralisch zwingend wirkt.',
    },

    { type: 'selfcheck', items: [
      { q: 'Sind politische Abzeichen in der Schule absolut verboten?',
        a: 'NEIN. {{Art. 84}}/3: zulässig, wenn 5 Schutzgüter nicht gefährdet (Schulfrieden · Schulbetrieb · Bildungsauftrag · pers. Ehre · Erziehung zur Toleranz).' },
      { q: 'Wer darf in die Schülerakte Einsicht nehmen?',
        a: 'SuS ab Vollendung 14. Lj. + aktuelle EB + frühere EB bis Vollendung 21. Lj. der SuS ({{§ 41 BaySchO}}).' },
      { q: 'Wer genehmigt eine Spendenaktion in der Schule?',
        a: 'Die Schulleitung ({{Art. 84}}/4). Zusätzlich Zweckbindung + EB-Information.' },
    ]},
  ],

};
