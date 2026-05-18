// MP_01 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      'Bedrohung mit Messer im Unterricht ist ein **Drei-Pfad-Vorfall** in drei Zeitfenstern. Gefahrenabwehr · Schulrecht · Strafrecht laufen **parallel und kumulativ** — keine Verdrängung. Die richtige Antwort denkt in Zeitfenstern, nicht in „alles auf einmal".'
    },

    { type: 'svg', titel: 'Drei-Pfad-Struktur · Messer im Unterricht',
      caption: '3 Pfade · 3 Zeitfenster · parallel + kumulativ',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 250" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="300" y="14" text-anchor="middle" font-size="9.5" letter-spacing="1.8" class="muted">PARALLEL · KUMULATIV</text>
  <line x1="100" y1="22" x2="100" y2="38" class="rule-line"/>
  <line x1="300" y1="22" x2="300" y2="38" class="rule-line"/>
  <line x1="500" y1="22" x2="500" y2="38" class="rule-line"/>
  <g>
    <rect x="20" y="38" width="160" height="200" class="box"/>
    <text x="100" y="58" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">GEFAHRENABWEHR</text>
    <line x1="30" y1="68" x2="170" y2="68" class="rule-line"/>
    <text x="100" y="88" text-anchor="middle" font-size="10">§ 5 LDO</text>
    <text x="100" y="103" text-anchor="middle" font-size="10">§ 23/2 BaySchO</text>
    <text x="100" y="118" text-anchor="middle" font-size="10">BayPolG</text>
    <line x1="30" y1="138" x2="170" y2="138" class="rule-line"/>
    <text x="100" y="160" text-anchor="middle" font-size="11" font-weight="600">Min 1–5</text>
    <line x1="30" y1="178" x2="170" y2="178" class="rule-line"/>
    <text x="100" y="200" text-anchor="middle" font-size="9.5" class="muted">LK · SL · Polizei</text>
    <text x="100" y="216" text-anchor="middle" font-size="9.5" class="muted">Deeskalation +</text>
    <text x="100" y="231" text-anchor="middle" font-size="9.5" class="muted">Sicherstellung</text>
  </g>
  <g>
    <rect x="220" y="38" width="160" height="200" class="box"/>
    <text x="300" y="58" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">SCHULRECHT</text>
    <line x1="230" y1="68" x2="370" y2="68" class="rule-line"/>
    <text x="300" y="88" text-anchor="middle" font-size="10">Art. 86–88 BayEUG</text>
    <text x="300" y="103" text-anchor="middle" font-size="10">Art. 87 (Person)</text>
    <text x="300" y="118" text-anchor="middle" font-size="10" class="muted">EM · OM · Anhörung</text>
    <line x1="230" y1="138" x2="370" y2="138" class="rule-line"/>
    <text x="300" y="160" text-anchor="middle" font-size="11" font-weight="600">Min 5 → Tag 14</text>
    <line x1="230" y1="178" x2="370" y2="178" class="rule-line"/>
    <text x="300" y="200" text-anchor="middle" font-size="9.5" class="muted">LK · SL · Konferenz</text>
    <text x="300" y="216" text-anchor="middle" font-size="9.5" class="muted">Verfahrens-Trias:</text>
    <text x="300" y="231" text-anchor="middle" font-size="9.5" class="muted">Anhörung → OM → Vollzug</text>
  </g>
  <g>
    <rect x="420" y="38" width="160" height="200" class="box"/>
    <text x="500" y="58" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">STRAFRECHT</text>
    <line x1="430" y1="68" x2="570" y2="68" class="rule-line"/>
    <text x="500" y="88" text-anchor="middle" font-size="10">§ 241 StGB</text>
    <text x="500" y="103" text-anchor="middle" font-size="10">§ 224 StGB</text>
    <text x="500" y="118" text-anchor="middle" font-size="10" class="muted">ab 14 J. JGG</text>
    <line x1="430" y1="138" x2="570" y2="138" class="rule-line"/>
    <text x="500" y="160" text-anchor="middle" font-size="11" font-weight="600">Wochen → Monate</text>
    <line x1="430" y1="178" x2="570" y2="178" class="rule-line"/>
    <text x="500" y="200" text-anchor="middle" font-size="9.5" class="muted">StA · Gericht</text>
    <text x="500" y="216" text-anchor="middle" font-size="9.5" class="muted">LK = berechtigt</text>
    <text x="500" y="231" text-anchor="middle" font-size="9.5" class="muted">(NICHT pflichtig § 138)</text>
  </g>
</svg>`
    },

    { type: 'h', text: 'Drei-Pfad-Tabelle' },
    { type: 'table',
      head: ['Pfad', 'Rechtsgrundlage', 'Zeit', 'Adressat'],
      rows: [
        ['**Gefahrenabwehr**', '{{§ 5 LDO}} + {{§ 23/2 BaySchO}} + {{BayPolG}}', 'Min 1–5', 'LK / SL / ggf. Polizei'],
        ['**Schulrecht**', '{{Art. 86 BayEUG}} – {{Art. 88 BayEUG}}', 'Min 5 → Tag 14', 'LK / SL / LK-Konferenz'],
        ['**Strafrecht**', '{{§ 241 StGB}} + {{§ 224 StGB}}; ab 14 J. JGG', 'Wochen → Monate', 'StA (LK = berechtigt)'],
      ],
    },

    { type: 'h', text: 'Bund-Land-Trennschärfe' },
    { type: 'bullets', items: [
      '**Strafrecht** (StGB-Bund) trifft den **Täter persönlich** (Schuldprinzip) — NICHT den Freistaat.',
      '**Schulrecht** (BayEUG/BaySchO/LDO) löst Erziehungs-/Ordnungsmaßnahmen über Land/Schule aus.',
      '**Anzeige ≠ Ordnungsmaßnahme** — zwei verschiedene Verfahren auf zwei Rechtsebenen (Bund vs. Land).',
      'Haftungsdreieck (Zivil/Disziplinar/Strafrecht) bei evtl. LK-Aufsichtsversagen → Cross-Ref MP_07 A.1.',
    ]},

    { type: 'warn', titel: '⚠ Drei-Pfad-Logik — Fallen', text:
      'Die drei Pfade laufen PARALLEL/KUMULATIV — keine Verdrängung. **Strafrecht trifft den Täter persönlich**, NICHT den Freistaat. **Anzeige ≠ Ordnungsmaßnahme**. LK-Reaktion in DREI ZEITFENSTERN denken, nicht „alles auf einmal".',
    },

    { type: 'selfcheck', items: [
      { q: 'Nenne die drei Pfade mit jeweils einer Rechtsgrundlage und einem Adressaten.',
        a: 'Gefahrenabwehr ({{§ 5 LDO}} + {{§ 23/2 BaySchO}}) → LK/SL/Polizei. Schulrecht ({{Art. 86 BayEUG}} – {{Art. 88 BayEUG}}) → LK/SL/LK-Konferenz. Strafrecht ({{§ 241 StGB}} + {{§ 224 StGB}}) → StA, LK ist berechtigt zur Anzeige.' },
      { q: 'Warum trifft die strafrechtliche Sanktion nicht den Freistaat?',
        a: 'Schuldprinzip Art. 103 GG — Strafe folgt persönlicher Schuld. Anders als Amtshaftung Art. 34 GG (Cross-Ref MP_07), bei der der Freistaat zivilrechtlich nach außen haftet.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Die Sicherstellung des Messers folgt aus {{§ 23/2 BaySchO}} — drei Sätze mit drei verschiedenen Direktionalitäten. Der „Sicherstellungs-Akt" ist NICHT identisch mit der „Sicherungsmaßnahme" nach {{Art. 87 BayEUG}} — Homonym-Falle.'
    },

    { type: 'h', text: '§ 23 BaySchO Wortlaut (kondensiert)' },
    { type: 'bullets', items: [
      'Abs. 1: Konsum alkoholischer Getränke + sonstiger Rauschmittel UNTERSAGT (Schulanlage + Veranstaltungen).',
      'Abs. 2 S. 1: Mitbringen + Mitführen **gefährlicher Gegenstände** + **sonstiger ordnungsstörender** Gegenstände UNTERSAGT.',
      'Abs. 2 S. 2: „**können** weggenommen und sichergestellt werden" — Ermessen, im Gefahrenfall **auf Null reduziert** (faktische Pflicht).',
      'Abs. 2 S. 3: Rückgabe gefährlicher Gegenstände bei Minderj. **NUR an Erziehungsberechtigte** — gilt NICHT für „sonstige" Gegenstände.',
    ]},

    { type: 'h', text: 'Drei-Sätze-Falle' },
    { type: 'table',
      head: ['Satz', 'Inhalt', 'Falle'],
      rows: [
        ['**S. 1**', 'Verbot: gefährlich UND ordnungsstörend', 'Beide Kategorien getrennt prüfen — Messer fällt in beide'],
        ['**S. 2**', 'Ermessen-„können"', 'Im Gefahrenfall Ermessen auf Null reduziert'],
        ['**S. 3**', 'Rückgabe NUR an EB (bei minderj.)', 'gilt NICHT für „sonstige ordnungsstörende"'],
      ],
    },

    { type: 'h', text: '§ 5 LDO Aufsichts-Anker' },
    { type: 'p', text:
      '{{§ 5 LDO}} verlangt physische Präsenz der LK ab Unterrichtsbeginn + kontinuierliche Aufsicht. Vollzitat + räumlich-zeitliche Reichweite in MP_06 A.2. Im akuten Bedrohungsfall: physische Präsenz + Deeskalation + ggf. Hausmeister/SL/Polizei verständigen.'
    },

    { type: 'warn', titel: '⚠ Fallen Sicherstellung', text:
      '{{§ 23 BaySchO}} = Sicherstellung **GEGENSTAND**. {{Art. 87 BayEUG}} = Sicherungs-Ausschluss **PERSON**. **Homonym-Falle „Sicherung"**. „Können" weggenommen werden — im Gefahrenfall Ermessen auf Null reduziert. Rückgabe NUR an EB (Minderj.) gilt nur für „gefährliche", nicht „sonstige".',
    },

    { type: 'selfcheck', items: [
      { q: 'Warum ist die Wegnahme des Messers im Akut-Fall keine bloße Ermessens-Entscheidung mehr?',
        a: 'Bei akuter Gefahr (Bedrohung) reduziert sich das in {{§ 23/2 BaySchO}} S. 2 angelegte Ermessen auf Null — faktische Pflicht zur Sicherstellung. Aufsichtspflicht {{§ 5 LDO}} verstärkt die Pflichtenstellung.' },
      { q: 'An wen wird das sichergestellte Messer zurückgegeben?',
        a: 'Bei minderjährigen SuS NUR an Erziehungsberechtigte ({{§ 23 BaySchO}} S. 3). Bei volljährigen SuS Rückgabe an SuS möglich, ABER bei Waffen i.S.d. WaffG ggf. Polizei-Verwahrung.' },
      { q: 'Wo verläuft die Linie zwischen § 23 BaySchO und {{Art. 87 BayEUG}}?',
        a: '§ 23 BaySchO = Gegenstand-Sicherstellung (Messer). Art. 87 BayEUG = Person-Sicherungs-Ausschluss (Max). Zwei Institute, parallel anwendbar. Wer sie zusammenwirft, zeigt Oberflächen-Verständnis.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      'Das schulrechtliche Maßnahmen-System steht in {{Art. 86 BayEUG}} – {{Art. 88 BayEUG}}: Art. 86 zentral mit 12-Punkte-Katalog Abs. 2, Art. 87 Sicherung-Person, Art. 88 Verfahren mit Anhörung.'
    },

    { type: 'h', text: 'Art. 86/1 + /3 (Schlüsselsätze)' },
    { type: 'bullets', items: [
      'Abs. 1: Erziehungsmaßnahmen vorrangig. Ordnungs-/Sicherungsmaßnahmen NUR, wenn andere nicht ausreichen (SUBSIDIARITÄT). Hausrecht bleibt UNBERÜHRT. Auswahl nach VERHÄLTNISMÄßIGKEIT.',
      'Abs. 3 Unzulässig: (1) körperliche Züchtigung · (2) Kollektivstrafen gegen Gruppen/Klassen als solche · (3-4) Pflichtschulen-Schutz vor Ausschluss-Stufen 6-7 + 9-12 · (5) Außerschulisches Verhalten (außer wenn Schul-Aufgabe gefährdet) · (6) andere als die Abs. 2-Maßnahmen.',
    ]},

    { type: 'h', text: '12-Punkte-Katalog Art. 86/2 (Auswahl)' },
    { type: 'table',
      head: ['Stufe', 'Maßnahme', 'Zuständigkeit'],
      rows: [
        ['1', 'Schriftlicher Verweis', 'LK'],
        ['2', 'Verschärfter Verweis', 'SL'],
        ['5', 'Ausschluss bis 6 Unterrichtstage', 'SL'],
        ['6', 'Ausschluss 2–4 Wo. bei schul. Gefährdung', '**Lehrerkonferenz**'],
        ['9', 'Androhung der Entlassung', 'LK-Konferenz'],
        ['10', 'Entlassung', 'LK-Konferenz'],
      ],
    },

    { type: 'h', text: 'Art. 87 — Sicherungs-Ausschluss (Person)' },
    { type: 'p', text:
      'Bei **akuter Gefahr für Leib oder Leben** oder **erheblicher Störung des Schulbetriebs** kann die SL den vorläufigen Ausschluss aussprechen. Endet, sobald die Ordnungsmaßnahme bestandskräftig entschieden wurde. **Anhörung nachholbar im Eilfall.**'
    },

    { type: 'h', text: 'Art. 88 — Verfahren mit Anhörung' },
    { type: 'numbered', items: [
      'Anhörung SuS + EB (Verfahrensrechte). Bei Sicherungsmaßnahme {{Art. 87 BayEUG}} im Eilfall nachholbar.',
      'Verhältnismäßigkeitsprüfung ({{Art. 86 BayEUG}} Abs. 1 verbatim).',
      'Schriftliche Mitteilung an EB rechtzeitig vor Vollzug ({{Art. 75 BayEUG}}-Anker).',
      'Zuständigkeit je Stufe LK / SL / LK-Konferenz (Art. 86/2).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Art. 86 BayEUG', text:
      '**12 Stufen** im Katalog Abs. 2. **Subsidiarität**: erst Erziehungs-, dann Ordnungsmaßnahme. **Kollektivstrafe verboten** (Abs. 3 Nr. 2) — Klasse rausschicken ist Gefahrenabwehr-Maßnahme, KEINE Ordnungsmaßnahme. **Außerschulisches Verhalten** nur, wenn Schul-Aufgabe gefährdet. **Hausrecht** bleibt unberührt — separate Rechtsgrundlage.',
    },

    { type: 'selfcheck', items: [
      { q: 'Wer ist zuständig für einen Ausschluss von 6 Unterrichtstagen — wer für 2–4 Wochen?',
        a: '6 Tage = SL ({{Art. 86 BayEUG}} Abs. 2 Nr. 5). 2–4 Wochen bei schulischer Gefährdung = LEHRERKONFERENZ (Nr. 6). Klassische Examens-Falle, bei der die Zuständigkeit oft falsch zugeordnet wird.' },
      { q: 'Wann ist die Anhörung nachholbar?',
        a: 'Nur bei Sicherungsmaßnahme {{Art. 87 BayEUG}} im Eilfall — bei regulärer Ordnungsmaßnahme {{Art. 88 BayEUG}} ist die Anhörung VORAB Pflicht. Vermischung = Verfahrensfehler.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      'Die strafrechtliche Schiene ist Bundesrecht und trifft den Täter persönlich. Drei Kernparagraphen: {{§ 241 StGB}} Bedrohung · {{§ 224 StGB}} gef. KV · {{§ 138 StGB}} Anzeigepflicht (taxativ). Bei < 14 J. greift {{§ 8a SGB VIII}} statt Strafanzeige.'
    },

    { type: 'h', text: '§ 241 StGB Bedrohung' },
    { type: 'p', text:
      'Bedrohung mit Begehung einer rechtswidrigen Tat → Freiheitsstrafe bis 1 Jahr / Geldstrafe. Bei Bedrohung mit einem Verbrechen erhöhter Strafrahmen. **Schul-Relevanz**: „Wenn du noch mal was sagst, stech ich dich!" trifft regelmäßig {{§ 241 StGB}}.'
    },

    { type: 'h', text: '§ 224 StGB Gefährliche KV' },
    { type: 'p', text:
      'KV mittels eines gefährlichen Werkzeugs → Freiheitsstrafe 6 Monate bis 10 Jahre. Versuch strafbar. **Messer = klassisches gefährliches Werkzeug.** Mitführen OHNE konkrete Drohung verwirklicht {{§ 224 StGB}} NICHT — aber {{§ 23/2 BaySchO}} + ggf. {{WaffG}}.'
    },

    { type: 'h', text: '§ 138 StGB — Anzeigepflicht (taxativ)' },
    { type: 'p', text:
      '{{§ 138 StGB}} löst Anzeigepflicht NUR bei taxativ aufgeführten schweren GEPLANTEN Straftaten aus (Mord, Totschlag, Geiselnahme, schwere Raubtaten …). Eine **spontane Bedrohung mit Messer im Streit** fällt regelmäßig NICHT unter § 138.'
    },

    { type: 'h', text: 'Anzeigen-berechtigt vs. -pflichtig' },
    { type: 'table',
      head: ['Frage', 'Antwort', 'Norm'],
      rows: [
        ['Ist die LK generell anzeigen-pflichtig?', '**NEIN**', '—'],
        ['Wann pflichtig?', 'NUR {{§ 138 StGB}} (taxativ)', '§ 138 StGB'],
        ['Was regulär?', '**Anzeigen-berechtigt** aus Fürsorge', 'Praxis'],
        ['Wer entscheidet operativ?', '**SL nach Abstimmung mit EB**', '{{Art. 57 BayEUG}}'],
        ['Bei akuter Gefahr?', 'Polizei verständigen', '{{BayPolG}}'],
      ],
    },

    { type: 'h', text: '§ 8a SGB VIII + § 1 JGG' },
    { type: 'bullets', items: [
      '{{§ 1 JGG}}: Strafmündigkeit ab **vollendetem 14. Lebensjahr**. < 14 = strafunmündig — Anzeige ist rechtsfolgenlos.',
      '{{§ 8a SGB VIII}}: bei gewichtigen Anhaltspunkten für Kindeswohlgefährdung → Jugendamt + Kooperation Schule. Greift bei < 14 J. **parallel zum Schulrecht** statt der Strafanzeige.',
      'Schuldprinzip: Strafe trifft Täter persönlich — anders als Amtshaftung Art. 34 GG (Freistaat-Außenhaftung).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Strafrechts-Schnittstelle', text:
      '**Strafe trifft Täter persönlich** (Schuldprinzip), NICHT Freistaat. **Strafmündigkeit ab vollendetem 14. Lj.** ({{§ 1 JGG}}). „Ich rufe sofort die Polizei!" ist rechtlich falsch framed — erst Deeskalation + SL + EB; Polizei nur bei akuter Gefahr/schwerer Tat. {{§ 138 StGB}} ist KEINE allgemeine Anzeigepflicht. Eltern haben KEIN Vetorecht gegen Strafanzeige.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Strafnorm trifft die Bedrohung mit Messer, welche den Einsatz?',
        a: 'Bedrohung = {{§ 241 StGB}}. Einsatz (auch im Versuch) = {{§ 224 StGB}} (gefährliches Werkzeug). Mitführen ohne Drohung NICHT § 224 — aber {{§ 23/2 BaySchO}}.' },
      { q: 'Wie ändert sich die rechtliche Bewertung bei einem 13- gegenüber einem 14-jährigen?',
        a: '13 J. = strafunmündig ({{§ 1 JGG}}) → {{§ 8a SGB VIII}} Jugendamt + Schulrecht. 14 J. = strafmündig → § 241 / § 224 StGB persönlich + LK anzeigen-berechtigt + Schulrecht parallel.' },
      { q: 'Wann hat die LK eine Strafanzeige-Pflicht?',
        a: 'NUR bei {{§ 138 StGB}} taxativer Liste schwerer GEPLANTER Straftaten. Spontane Bedrohung fällt regelmäßig NICHT darunter. Sonst ist die LK anzeigen-berechtigt, SL entscheidet operativ.' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Die Praxis-Choreographie folgt drei Zeitfenstern. Phase 1 (Min 1–5) Gefahrenabwehr · Phase 2 (Min 5–30) SL + EB + Art. 87-Abwägung · Phase 3 (Tag 1–14) Anhörung + Ordnungsmaßnahme.'
    },

    { type: 'h', text: 'Drei-Zeitfenster-Tabelle' },
    { type: 'table',
      head: ['Phase', 'Zeit', 'Rechtsgrundlage', 'Was tun?'],
      rows: [
        ['**Phase 1**', 'Min 1–5', '{{§ 5 LDO}} + {{§ 23/2 BaySchO}} + {{BayPolG}}', 'Deeskalation · physisch dazwischen · Klasse ggf. raus · Messer sicherstellen · SL/Polizei alarmieren'],
        ['**Phase 2**', 'Min 5–30', '{{Art. 57 BayEUG}} + {{Art. 75 BayEUG}} + {{Art. 87 BayEUG}}', 'SL informieren · EB benachrichtigen · Dokumentation · Art. 87 Abwägung'],
        ['**Phase 3**', 'Tag 1–14', '{{Art. 86 BayEUG}} + {{Art. 88 BayEUG}}', 'Anhörung · Verhältnismäßigkeit · Ordnungsmaßnahme · Strafanzeige (Abstimmung) · Sozialtraining'],
      ],
    },

    { type: 'h', text: 'Antwort-Schema (für mündliche Prüfung)' },
    { type: 'numbered', items: [
      'Sachverhalt kurz benennen (drei Problemdimensionen markieren).',
      'Phase 1 (Min 1–5): {{§ 5 LDO}} + {{§ 23/2 BaySchO}} + ggf. Polizei.',
      'Phase 2 (Min 5–30): SL + EB + Art. 87-Abwägung.',
      'Phase 3 (Tag 1–14): {{Art. 88 BayEUG}} Anhörung → {{Art. 86 BayEUG}} Abs. 2 Maßnahme nach Verhältnismäßigkeit.',
      'Strafrecht parallel ({{§ 241 StGB}} + {{§ 224 StGB}}; LK = berechtigt, nicht pflichtig).',
      'Pädagogische Stellungnahme: Verhältnismäßigkeit + Opferbetreuung + Sozialtraining.',
    ]},

    { type: 'warn', titel: '⚠ Choreographie-Falle', text:
      'Wer „alles auf einmal" antwortet, verliert die Klarheit. **In drei Zeitfenstern denken** — und in jedem Fenster die zuständige Rechtsgrundlage benennen. Strafrecht NICHT zuerst nennen — es ist die LETZTE der drei Schienen in der Zeit-Reihenfolge.',
    },

    { type: 'selfcheck', items: [
      { q: 'In welcher Reihenfolge nennst du die Pfade in der mündlichen Antwort?',
        a: 'Erst Phase 1 Gefahrenabwehr (LK-Sofortreaktion), dann Phase 2 SL+EB (Schulleitungs-Pfad), dann Phase 3 Schulrecht-Maßnahme + Strafrecht parallel. Zeit-Reihenfolge spiegelt Rechts-Reihenfolge.' },
      { q: 'Welche zwei Cross-Refs gehören in eine vollständige MP_01-Antwort?',
        a: 'MP_06 A.2 für {{§ 5 LDO}} Aufsichtspflicht-Vollzitat. MP_07 A.1+A.2 für Haftungsdreieck (Zivil/Disziplinar/Strafrecht) bei evtl. Aufsichtsversagen.' },
    ]},
  ],
};
