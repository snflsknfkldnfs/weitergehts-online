// MP_09 — Vertiefungs-Bodies
window.MODULE_BODIES = {

  A1: [
    { type: 'lead', text:
      '„Schülerunterlagen" ist ein **Oberbegriff** — Schülerakte ({{§ 41 BaySchO}}), Leistungsnachweise (§ 37 S. 2 Nr. 2 BaySchO) und Klassenbuch/digitales Tagebuch sind **drei** Sub-Begriffe mit jeweils eigenen Regeln. Das **Einsichtsrecht** in die Schülerakte ist in {{§ 41/1 BaySchO}} verbatim normiert — **drei** Personenkreise, keine zwei oder vier.'
    },

    { type: 'h', text: 'Begriffs-Trias' },
    { type: 'table',
      head: ['Begriff', 'Norm', 'Inhalt'],
      rows: [
        ['**Schülerakte**', '{{§ 41 BaySchO}}', 'Aufnahme · Personalien · Zeugnisse · Bescheide (Container; Vollzitat über § 41/1)'],
        ['**Leistungsnachweise**', '§ 37 S. 2 Nr. 2 BaySchO', 'Klassenarbeiten · Tests · Klausuren — eigener Einsichtspfad nach Abschluss-Feststellung'],
        ['**Klassenbuch / digitales Tagebuch**', '— (Verlaufs-Doku)', 'KEINE „Akte" iSd § 41 BaySchO; eigene Aufbewahrungs-Logik'],
      ],
    },

    { type: 'h', text: '{{§ 41/1 BaySchO}} — Einsichtsrecht (Wortlaut)' },
    { type: 'p', text:
      'verbatim: „Ein Recht auf Einsicht in die eigene Schülerakte nach § 37 Satz 2 Nr. 1 sowie – nach Abschluss des Aufnahmeverfahrens, der Abschlussprüfung oder anderer schulischer Leistungsfeststellungen – in die Leistungsnachweise nach § 37 Satz 2 Nr. 2 haben **(1)** die jeweiligen Schülerinnen und Schüler **ab Vollendung des 14. Lebensjahres**, auch wenn sie die Schule verlassen haben, **(2)** die Erziehungsberechtigten der jeweiligen Schülerinnen und Schüler und **(3)** die früheren Erziehungsberechtigten bei Schülerinnen und Schülern **bis zur Vollendung des 21. Lebensjahres**, soweit Vorschriften des BayEUG oder der Schulordnungen ihre Unterrichtung vorschreiben."'
    },

    { type: 'h', text: 'Personenkreis-Tabelle — DREI Berechtigte' },
    { type: 'table',
      head: ['Nr.', 'Berechtigte', 'Voraussetzung', 'Zeitliche Grenze'],
      rows: [
        ['1', '**SuS selbst**', '**ab Vollendung 14. Lj.**', 'auch nach Schulaustritt'],
        ['2', '**Aktuelle EB**', 'EB-Status', 'solange EB-Eigenschaft besteht'],
        ['3', '**Frühere EB**', 'BayEUG/Schulordnungen schreiben Unterrichtung vor', 'nur **bis Vollendung 21. Lj.** des SuS'],
      ],
    },

    { type: 'warn', titel: '⚠ Fallen Personenkreis', text:
      '**„ab 14 Lj." ≠ „ab Vollendung des 14. Lebensjahres"** — Wortlaut entscheidet (also AB dem Tag nach dem 14. Geburtstag). **„nach Vollendung" ≠ „ab Vollendung"** — Wortlaut sagt „AB Vollendung". **21-Lj.-Grenze** gilt NUR für **frühere** EB — nicht für aktuelle EB und nicht für SuS. **Drei** Personenkreise, NICHT zwei (SuS+EB) oder vier (zzgl. LK). Lehrkräfte sind KEINE Berechtigten iSd § 41/1 — sie haben Aktenzugang qua Funktion.',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche drei Personenkreise haben Akten-Einsicht nach {{§ 41/1 BaySchO}} — und welche Grenze gilt jeweils?',
        a: '(1) SuS **ab Vollendung 14. Lj.** — auch nach Schulaustritt. (2) **Aktuelle EB** — solange EB-Eigenschaft besteht. (3) **Frühere EB** — nur **bis Vollendung 21. Lj.** des SuS, soweit BayEUG/Schulordnungen Unterrichtung vorschreiben.' },
      { q: 'Sind Lehrkräfte „Berechtigte" iSd § 41/1 BaySchO?',
        a: 'NEIN. Lehrkräfte sind KEINE Berechtigten iSd § 41/1; sie haben Aktenzugang **qua Funktion** zur Aufgabenerfüllung. Drei Personenkreise — nicht vier.' },
      { q: 'Warum ist „ab 14 Lj." formal nicht dasselbe wie der Norm-Wortlaut?',
        a: 'Der Wortlaut ist **„ab Vollendung des 14. Lebensjahres"** — die Vollendung markiert das Erreichen des Lebensjahres (= ab dem Tag nach dem 14. Geburtstag wirksam, jur. „mit Vollendung"). Examensrelevant: präzise zitieren.' },
    ]},
  ],

  A2: [
    { type: 'lead', text:
      'Drei Pfade — drei Anspruchsgrundlagen. Wer **wer-was-wann** fragt, muss die drei Pfade getrennt halten: **{{§ 14/3 LDO}}** (Notenauskunft) · **{{§ 41/1 BaySchO}}** (Akten-Einsicht) · **{{Art. 15 DSGVO}}** (Daten-Auskunft). Sie ergänzen sich **kumulativ**, sie ersetzen sich nicht.'
    },

    { type: 'svg', titel: 'Auskunfts-Trias · 3 Anspruchsgrundlagen',
      caption: 'Noten · Akte · Daten — kumulativ, nicht alternativ',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" width="600" preserveAspectRatio="xMidYMid meet">
  <text x="300" y="18" text-anchor="middle" font-size="9.5" letter-spacing="1.8" class="muted">KUMULATIV · NICHT ALTERNATIV</text>
  <line x1="100" y1="26" x2="100" y2="42" class="rule-line"/>
  <line x1="300" y1="26" x2="300" y2="42" class="rule-line"/>
  <line x1="500" y1="26" x2="500" y2="42" class="rule-line"/>
  <g>
    <rect x="20" y="42" width="160" height="200" class="box"/>
    <text x="100" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">1 · NOTENAUSKUNFT</text>
    <line x1="30" y1="72" x2="170" y2="72" class="rule-line"/>
    <text x="100" y="92" text-anchor="middle" font-size="10">§ 14/3 LDO</text>
    <text x="100" y="116" text-anchor="middle" font-size="10">SuS + EB</text>
    <line x1="30" y1="132" x2="170" y2="132" class="rule-line"/>
    <text x="100" y="152" text-anchor="middle" font-size="9.5" class="muted">Vorrücken / Zeugnis-</text>
    <text x="100" y="166" text-anchor="middle" font-size="9.5" class="muted">noten</text>
    <line x1="30" y1="182" x2="170" y2="182" class="rule-line"/>
    <text x="100" y="204" text-anchor="middle" font-size="10" font-weight="600" data-accent="true">VOR Festlegung</text>
    <text x="100" y="220" text-anchor="middle" font-size="10" font-weight="600" data-accent="true">VERBOTEN</text>
  </g>
  <g>
    <rect x="220" y="42" width="160" height="200" class="box"/>
    <text x="300" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">2 · AKTEN-EINSICHT</text>
    <line x1="230" y1="72" x2="370" y2="72" class="rule-line"/>
    <text x="300" y="92" text-anchor="middle" font-size="10">§ 41/1 BaySchO</text>
    <text x="300" y="116" text-anchor="middle" font-size="10">SuS ab 14 · EB</text>
    <text x="300" y="130" text-anchor="middle" font-size="9.5" class="muted">frühere EB bis 21</text>
    <line x1="230" y1="142" x2="370" y2="142" class="rule-line"/>
    <text x="300" y="162" text-anchor="middle" font-size="9.5" class="muted">Schülerakte +</text>
    <text x="300" y="176" text-anchor="middle" font-size="9.5" class="muted">Leistungsnachweise</text>
    <line x1="230" y1="190" x2="370" y2="190" class="rule-line"/>
    <text x="300" y="212" text-anchor="middle" font-size="9.5">nach Abschluss</text>
    <text x="300" y="226" text-anchor="middle" font-size="9.5" class="muted">Verfahren / Prüfung</text>
  </g>
  <g>
    <rect x="420" y="42" width="160" height="200" class="box"/>
    <text x="500" y="62" text-anchor="middle" font-size="10.5" font-weight="600" data-accent="true">3 · DSGVO-AUSKUNFT</text>
    <line x1="430" y1="72" x2="570" y2="72" class="rule-line"/>
    <text x="500" y="92" text-anchor="middle" font-size="10">Art. 15 DSGVO</text>
    <text x="500" y="116" text-anchor="middle" font-size="10">Betroffene Person</text>
    <text x="500" y="130" text-anchor="middle" font-size="9.5" class="muted">(SuS / EB-Vertreter)</text>
    <line x1="430" y1="142" x2="570" y2="142" class="rule-line"/>
    <text x="500" y="162" text-anchor="middle" font-size="9.5" class="muted">Zwecke · Empfänger ·</text>
    <text x="500" y="176" text-anchor="middle" font-size="9.5" class="muted">Speicherdauer · Rechte</text>
    <line x1="430" y1="190" x2="570" y2="190" class="rule-line"/>
    <text x="500" y="212" text-anchor="middle" font-size="10" font-weight="600" data-accent="true">binnen 1 Monat</text>
    <text x="500" y="226" text-anchor="middle" font-size="9.5" class="muted">Art. 12/3 DSGVO</text>
  </g>
</svg>`
    },

    { type: 'h', text: 'Drei-Pfad-Vergleichstabelle' },
    { type: 'table',
      head: ['Pfad', 'Norm', 'Berechtigte', 'Inhalt', 'Verbot-Phase?'],
      rows: [
        ['**1 Notenauskunft**', '{{§ 14/3 LDO}}', 'SuS + EB', 'Vorrücken / Zeugnisnoten', '**VOR endgültiger Festlegung VERBOTEN**'],
        ['**2 Akten-/LN-Einsicht**', '{{§ 41/1 BaySchO}}', 'SuS ab 14, EB, frühere EB bis 21', 'Schülerakte + Leistungsnachweise', 'nach Abschluss Aufnahmeverfahren / Abschlussprüfung'],
        ['**3 DSGVO-Auskunft**', '{{Art. 15 DSGVO}}', 'Betroffene Person (SuS / EB als Vertreter)', 'Verarbeitungszwecke, Empfänger, Speicherdauer, Rechte', 'binnen **1 Monat** (Art. 12/3 DSGVO)'],
      ],
    },

    { type: 'h', text: '{{§ 14/3 LDO}} — Vor-Festlegungs-Verbot (Wortlaut)' },
    { type: 'p', text:
      'verbatim: „Bis zur **endgültigen Festlegung der Zeugnisnoten** nach den für die einzelnen Schularten geltenden Bestimmungen dürfen Schülerinnen und Schülern oder Erziehungsberechtigten **keine Auskünfte** über das Vorrücken oder über Zeugnisnoten erteilt werden. § 6 Abs. 3 bleibt unberührt."'
    },

    { type: 'h', text: '{{Art. 15 DSGVO}} — Sinngehalt' },
    { type: 'p', text:
      'Die betroffene Person hat das Recht, eine Bestätigung darüber zu erhalten, ob sie betreffende personenbezogene Daten verarbeitet werden, sowie Auskunft über diese Daten und die nach Art. 15/1 lit. a–h geforderten Informationen (Verarbeitungszwecke, Datenkategorien, Empfänger, geplante Speicherdauer, Rechte auf Berichtigung/Löschung, Beschwerderecht). Bearbeitungsfrist: **1 Monat** (Art. 12/3 DSGVO).'
    },

    { type: 'h', text: 'Trennschärfe-Merkhilfe' },
    { type: 'bullets', items: [
      '**{{§ 41/1 BaySchO}}** = **Akten-Einsicht** (das Papier-/Datei-Original anschauen).',
      '**{{Art. 15 DSGVO}}** = **Daten-Auskunft** (was wird über mich gespeichert / verarbeitet?).',
      'Beide bestehen **kumulativ** — Schule muss beide Anfragen bearbeiten.',
      'Bei **digitalen Aktensystemen** (z.B. ASV) gelten DSGVO-Pflichten **zusätzlich** zur BaySchO-Akteneinsicht.',
    ]},

    { type: 'warn', titel: '⚠ Fallen Auskunfts-Trias', text:
      '**VOR Festlegung der Zeugnisnoten KEINE Auskunft** — auch nicht an EB oder SuS ({{§ 14/3 LDO}}). „Notengeheimnis zwischen SuS" ist KEIN Begriff der LDO — es geht um (a) Zeitsperre vor Festlegung Abs. 3 + (b) Auskunfts-Verbot ggü. Dritten Abs. 4. DSGVO Art. 15 + § 41/1 BaySchO **nicht gegeneinander ausspielen** — sie ergänzen sich.',
    },

    { type: 'selfcheck', items: [
      { q: 'Drei Pfade der Auskunfts-Trias — was unterscheidet sie?',
        a: '**Pfad 1** {{§ 14/3 LDO}}: Notenauskunft NACH Festlegung. **Pfad 2** {{§ 41/1 BaySchO}}: Akten-/LN-Einsicht für 3 Personenkreise. **Pfad 3** {{Art. 15 DSGVO}}: Daten-Auskunft binnen 1 Monat — Verarbeitungszwecke, Empfänger, Speicherdauer. Kumulativ.' },
      { q: 'Eltern bitten am Tag vor der Zeugniskonferenz um Notenauskunft — was ist zu tun?',
        a: 'Auskunft **ablehnen** — {{§ 14/3 LDO}}: vor endgültiger Festlegung der Zeugnisnoten keine Auskunft an SuS oder EB. Hinweis auf reguläre Notenauskunft NACH Konferenz.' },
      { q: 'Sind § 41/1 BaySchO und Art. 15 DSGVO Alternativen?',
        a: 'NEIN — **kumulativ**. § 41/1 = Akten-Einsicht (Papier/Datei). Art. 15 DSGVO = Daten-Auskunft (Zwecke, Empfänger, Speicherdauer). Getrennte Anspruchsgrundlagen, beide gelten zeitgleich.' },
    ]},
  ],

  A3: [
    { type: 'lead', text:
      '**Cross-Ref MP_06 A.3** — {{§ 14 LDO}} Abs. 1 + 2 (Amtsverschwiegenheit + Presse-Auskunft nur durch SL) wird in MP_06 entwickelt. MP_09 fokussiert **Abs. 3** (Vor-Festlegungs-Verbot, siehe A.2) und **Abs. 4** (Drittauskunfts-Verbot — Datenschutz-KERN).'
    },

    { type: 'h', text: '{{§ 14/4 LDO}} — Wortlaut (KERN-Norm MP_09)' },
    { type: 'p', text:
      'verbatim: „Die Schule ist **nicht berechtigt**, **anderen Personen als den Erziehungsberechtigten Auskunft** über Schülerinnen und Schüler und ihre Leistungen zu geben. Von dieser Regel kann jedoch abgewichen werden, wenn die Erziehungsberechtigten **ausdrücklich zustimmen** oder wenn anzunehmen ist, dass sich die Auskunft für die Schülerinnen und Schüler und die Erziehungsberechtigten nur **günstig auswirkt** und die **Zustimmung erwartet werden kann**. Die Auskunftspflicht gegenüber den **Ausbildenden oder Arbeitgebern** nach den schulrechtlichen Bestimmungen für die Berufsschulen bleibt hiervon **unberührt**. Für Auskünfte an frühere Erziehungsberechtigte volljähriger Schüler gelten {{Art. 75/1 BayEUG}} und {{Art. 88/4 BayEUG}} Satz 1 Ziff. 3. Die Erteilung von Auskünften über Schülerinnen und Schüler an **Behörden außerhalb der Schulaufsicht** richtet sich nach den dafür ergangenen besonderen Bestimmungen."'
    },

    { type: 'h', text: 'Auflösungs-Tabelle Drittauskunfts-Anfragen' },
    { type: 'table',
      head: ['Anfragender', 'Auskunft?', 'Rechtsgrundlage'],
      rows: [
        ['**Aktuelle EB**', '**JA** (regulär)', '§ 14/4 S. 1 — keine „Dritten"'],
        ['Lehrkräfte derselben Schule', 'JA (dienstlich erforderlich)', '§ 14/1 LDO „dienstlicher Verkehr"'],
        ['**Dritte** (Verwandte, Nachbarn, Vereine)', '**NEIN — grundsätzlich verboten**', '§ 14/4 S. 1'],
        ['Dritte mit **ausdrücklicher EB-Zustimmung**', 'JA (Ausnahme 1)', '§ 14/4 S. 2'],
        ['Dritte bei „günstiger Auswirkung" + Zustimmungs-Vermutung', 'JA (Ausnahme 2)', '§ 14/4 S. 2'],
        ['Ausbildende / Arbeitgeber (Berufsschule)', '**JA** (gesonderte Auskunftspflicht)', '§ 14/4 S. 3'],
        ['Frühere EB volljähriger SuS', 'nach Maßgabe', '§ 14/4 S. 4 i.V.m. {{Art. 75/1 BayEUG}} + {{Art. 88/4 BayEUG}}'],
        ['Behörden außerhalb Schulaufsicht (Polizei, JA)', 'nach besonderen Bestimmungen', '§ 14/4 S. 5 (StPO, BayPAG, SGB VIII)'],
        ['Presse / Rundfunk / TV', 'NUR durch SL oder Beauftragte', '§ 14/2 LDO (siehe MP_06)'],
      ],
    },

    { type: 'h', text: 'Disziplinar-Konsequenz' },
    { type: 'bullets', items: [
      'Verstoß gegen § 14/4 LDO erfüllt {{§ 47 BeamtStG}}-Tatbestand → BayDG Art. 6 ff. Maßnahmen-Katalog (Cross-Ref MP_07 A.3).',
      'Ggf. zusätzlich § 353b StGB (Verletzung des Dienstgeheimnisses) bei reguläre LK.',
      'Bei Berufsgeheimnis-Träger:innen (Schulpsych./Schul-Ärzt:in) zusätzlich {{§ 203 StGB}} — siehe A.4.',
    ]},

    { type: 'warn', titel: '⚠ Fallen § 14/4 LDO', text:
      'Abs. 4 ist **Auskunfts-VERBOT-an-DRITTE** (Schule → Dritte) — populäre Charakterisierung als „Notengeheimnis / Vergleichsverbot zwischen SuS" ist verkürzt und falsch. Auskunft an Dritte NUR mit **ausdrücklicher** Zustimmung EB ODER „günstige Auswirkung" + Zustimmungs-Vermutung — beide Voraussetzungen kumulativ-konjunktiv prüfen. **Berufsschule-Sonderpfad S. 3**: Auskunftspflicht ggü. Ausbildenden/Arbeitgebern UNBERÜHRT (Sonder-Datenfluss). Bei Verstoß: {{§ 47 BeamtStG}} Tatbestand → BayDG Maßnahme.',
    },

    { type: 'selfcheck', items: [
      { q: 'Eine Oma fragt nach Noten ihrer Enkelin Lara — darf die KL Auskunft geben?',
        a: 'NEIN. Oma ist „andere Person als EB" → {{§ 14/4 LDO}} S. 1 Drittauskunfts-Verbot. Keine ausdrückliche EB-Zustimmung, keine günstige Auswirkung mit Zustimmungs-Vermutung → Auskunft ablehnen, Verweis an EB.' },
      { q: 'Was unterscheidet § 14/4 LDO Abs. 4 von einem „Notengeheimnis zwischen SuS"?',
        a: 'Abs. 4 regelt Auskunft Schule → **Dritte**. Vergleiche zwischen SuS sind durch § 14/4 NICHT verboten. Vor-Festlegungs-Verbot ist {{§ 14/3 LDO}}, nicht Abs. 4.' },
      { q: 'Ein:e Berufsschüler:in macht im Betrieb Probleme — darf der Ausbilder informiert werden?',
        a: 'JA — {{§ 14/4 LDO}} **S. 3**: Auskunftspflicht ggü. Ausbildenden/Arbeitgebern (Berufsschule) UNBERÜHRT. Sonder-Datenfluss zur dualen Ausbildung gesetzlich gewollt.' },
    ]},
  ],

  A4: [
    { type: 'lead', text:
      '{{§ 203 StGB}} ist **NICHT pauschal** für jede LK einschlägig. Strafrechtlich erfasst sind primär **Schulpsycholog:innen** (Abs. 1 Nr. 2 — Berufspsycholog:innen mit anerkannter Ausbildung) + **Schul-Ärzt:innen** (Abs. 1 Nr. 1 — Heilberuf). **Reguläre LK** + **reine Beratungs-LK** unterliegen statt dessen {{§ 14 LDO}} + Amtsverschwiegenheit + Disziplinar + ggf. § 353b StGB.'
    },

    { type: 'h', text: '{{§ 203 StGB}} — Sinngehalt' },
    { type: 'p', text:
      'Strafbar macht sich, wer **unbefugt** ein fremdes Geheimnis (insb. zum persönlichen Lebensbereich gehörend) offenbart, das ihm in seiner **Eigenschaft als Angehöriger eines bestimmten Berufs** (Heilberufe, Berufspsycholog:innen u.a.) anvertraut oder bekannt geworden ist. Strafdrohung idR Freiheitsstrafe bis 1 Jahr oder Geldstrafe.'
    },

    { type: 'h', text: 'Reichweiten-Tabelle (KRITISCH — NICHT pauschalisieren!)' },
    { type: 'table',
      head: ['Personenkreis', '§ 203 StGB?', 'Statt dessen / zusätzlich'],
      rows: [
        ['**Schulpsycholog:in**', '**JA** (Abs. 1 Nr. 2)', '+ {{§ 14 LDO}} + Disziplinar'],
        ['**Beratungslehrer:in**', '**JA**, soweit Doppel-Qualifikation als staatl. anerkannte Sozialpädagog:in/Berufspsycholog:in', '+ § 14 LDO + Disziplinar'],
        ['**Schul-Ärzt:in / Schulgesundheits-FK**', '**JA** (Heilberuf, Abs. 1 Nr. 1)', '+ § 14 LDO'],
        ['**Reguläre Klassenlehrkraft** (ohne Zusatzfunktion)', 'idR **NEIN**', '**{{§ 14 LDO}}** + Amtsverschwiegenheit + ggf. § 353b StGB + Disziplinar ({{§ 47 BeamtStG}} + BayDG)'],
      ],
    },

    { type: 'h', text: 'Schweigepflichts-Entbindung' },
    { type: 'bullets', items: [
      'Berufsgeheimnis-Träger:innen brauchen für **jede Übermittlung** Schweigepflichts-Entbindung der EB (bzw. SuS ab 14).',
      'Form: **schriftlich + ausdrücklich + zweckbestimmt** — keine Pauschal-Entbindungen.',
      'Cross-Ref MP_08: Datenaustausch MSD/Schulberatung/SBPS unterliegt KMBek Schulberatung 29.10.2001.',
      'Ausnahme Kindeswohl-Gefährdung: strukturiertes Verfahren § 8a SGB VIII / § 4 KKG (Datenübermittlung an JA bei gewichtigen Anhaltspunkten) — KEIN Lehrerzimmer-Plausch.',
    ]},

    { type: 'warn', titel: '⚠ Fallen § 203 StGB', text:
      '**Nicht jede LK** unterliegt § 203 StGB — § 203 ist berufsbezogen (Aufzählung Abs. 1). Reguläre LK → bei Geheimnisbruch **{{§ 14 LDO}}** + Amtsverschwiegenheit → Disziplinar; ggf. § 353b StGB. Schweigepflicht-Entbindung MUSS schriftlich + ausdrücklich erfolgen. Auch ohne § 203 StGB-Tatbestand kann die gleiche Tat **disziplinar- und zivilrechtlich** sanktioniert werden (Cross-Ref MP_07 A.2 Amtshaftung).',
    },

    { type: 'selfcheck', items: [
      { q: 'Welche Schul-Berufe fallen typischerweise unter {{§ 203 StGB}}?',
        a: 'Primär **Schulpsycholog:innen** (Abs. 1 Nr. 2 — Berufspsycholog:innen mit anerkannter Ausbildung) + **Schul-Ärzt:innen** (Abs. 1 Nr. 1 — Heilberuf). Beratungslehrer:innen NUR bei Doppel-Qualifikation. Reguläre LK NICHT pauschal — dort {{§ 14 LDO}} + Amtsverschwiegenheit + ggf. § 353b StGB.' },
      { q: 'Eine reguläre KL plaudert im Lehrerzimmer über die Diagnose einer SuS — strafbar?',
        a: 'NICHT direkt nach {{§ 203 StGB}} (reguläre LK ist kein Berufsgeheimnis-Träger:in iSd § 203). ABER: Verstoß gegen {{§ 14 LDO}} + Amtsverschwiegenheit → {{§ 47 BeamtStG}}-Dienstvergehen → BayDG-Disziplinarmaßnahme. Ggf. zusätzlich § 353b StGB.' },
      { q: 'Was sind die Form-Anforderungen an eine Schweigepflichts-Entbindung?',
        a: 'Schriftlich + ausdrücklich + zweckbestimmt. Keine Pauschal-Entbindungen. Bei Minderjährigen: EB (bzw. ab Vollendung 14. Lj. zusätzlich Co-Einwilligung SuS).' },
    ]},
  ],

  A5: [
    { type: 'lead', text:
      'Bildrechte stehen auf einem **doppelten Anker**: verfassungsrechtlich das **allgemeine Persönlichkeitsrecht** ({{Art. 2/1 GG}} i.V.m. {{Art. 1/1 GG}}, BVerfG Volkszählungsurteil 1983) — einfachgesetzlich **{{§ 22 KUG}}** + **{{§ 23 KUG}}**. Klassenfoto fällt **NICHT** unter die vier Ausnahmen.'
    },

    { type: 'h', text: 'Verfassungs-Anker: allgemeines Persönlichkeitsrecht' },
    { type: 'p', text:
      'Aus **{{Art. 2/1 GG}} i.V.m. {{Art. 1/1 GG}}** schützt das BVerfG (Volkszählungsurteil 1983) das Recht auf **informationelle Selbstbestimmung** — Schutz vor unbegrenzter Erhebung, Speicherung, Verwendung und Weitergabe persönlicher Daten. **Robuster Bundes-Anker**, NICHT BV Art. 100/101.'
    },

    { type: 'h', text: '{{§ 22 KUG}} — Recht am eigenen Bild (Wortlaut)' },
    { type: 'p', text:
      'verbatim (alte Rechtschreibung BEIBEHALTEN): „Bildnisse dürfen nur mit **Einwilligung** des Abgebildeten verbreitet oder öffentlich zur Schau gestellt werden. Die Einwilligung gilt im Zweifel als erteilt, wenn der Abgebildete dafür, **daß** er sich abbilden ließ, eine Entlohnung erhielt. Nach dem Tode des Abgebildeten bedarf es bis zum Ablaufe von **10 Jahren** der Einwilligung der Angehörigen des Abgebildeten." Konsequenz: Verbreitung / Schaustellung von Bildnissen → Einwilligung Pflicht.'
    },

    { type: 'h', text: '{{§ 23 KUG}} — vier Ausnahmen + Gegen-Ausnahme' },
    { type: 'numbered', items: [
      'Bildnisse aus dem Bereich der **Zeitgeschichte**.',
      'Bilder, auf denen Personen nur als **Beiwerk** neben einer Landschaft / Örtlichkeit erscheinen.',
      'Bilder von **Versammlungen**, Aufzügen und ähnlichen Vorgängen, an denen die Personen teilgenommen haben.',
      'Bildnisse, die nicht auf Bestellung angefertigt sind, sofern die Verbreitung einem **höheren Interesse der Kunst** dient.',
    ]},
    { type: 'p', text:
      '**Abs. 2 (Gegen-Ausnahme)**: Die Befugnis erstreckt sich **nicht** auf eine Verbreitung/Schaustellung, durch die ein **berechtigtes Interesse** des Abgebildeten oder seiner Angehörigen verletzt wird. → Auch in Ausnahme-Fällen ist die Gegen-Prüfung Pflicht.'
    },

    { type: 'h', text: 'Schul-Anwendungstabelle' },
    { type: 'table',
      head: ['Schul-Szenario', 'KUG § 22?', '§ 23-Ausnahme?', 'Praxis'],
      rows: [
        ['Klassenfoto Schul-Homepage', '**JA — Einwilligung nötig**', '**NEIN** (kein Beiwerk, keine Zeitgeschichte)', 'schriftliche Einwilligung aller abgebildeten SuS / EB'],
        ['Schulfest-Foto Lokalpresse', 'JA — Einwilligung', 'ggf. § 23 Nr. 3 (Versammlung) — Abs. 2 prüfen', 'im Zweifel: Einwilligung einholen'],
        ['Wandzeitung Klassenraum (intern)', 'str. — keine „Verbreitung" iSd § 22?', 'n/a', 'Sicherheits-Pfad: Einwilligung'],
        ['Yearbook / Jahrbuch', 'JA — Einwilligung', 'NEIN', 'schriftliche Einwilligung'],
        ['Foto im Hintergrund von Klassengebäude', 'ggf. § 23 Nr. 2 (Beiwerk)', 'JA, wenn klar Beiwerk', 'meist zulässig'],
      ],
    },

    { type: 'h', text: 'Einwilligungs-Anatomie (Schul-Praxis)' },
    { type: 'bullets', items: [
      '**Aufklärung**: was, wo, wie lange — präzise Zweckbestimmung.',
      '**Schriftform** empfohlen (ASV / DSGVO Art. 7 Nachweispflicht).',
      '**Widerrufbarkeit** jederzeit für die Zukunft (DSGVO Art. 7/3).',
      '**Bei Minderjährigen**: EB-Einwilligung; **ab Vollendung 14. Lj.** Ko-Einwilligung der SuS empfohlen (Persönlichkeitsrechts-Reife — i.V.m. {{§ 41/1 BaySchO}} Nr. 1).',
    ]},

    { type: 'warn', titel: '⚠ Fallen Bildrechte', text:
      '**Klassenfoto** ist **NICHT** „Beiwerk" oder „Zeitgeschichte" — {{§ 22 KUG}}-Einwilligung **erforderlich**. Original-Schreibweise **„daß"** im § 22 KUG (alte Rechtschreibung) **beibehalten** im Zitat. **10-Jahres-Frist** post mortem (NICHT 30 oder 70 Jahre wie bei UrhG). **Vier** Ausnahmen § 23 Abs. 1 — nicht drei oder fünf. **Abs. 2 ist Gegen-Ausnahme** — auch in Ausnahme-Fällen anwendbar. Persönlichkeitsrecht-Anker = **Art. 2/1 + 1/1 GG**, NICHT BV Art. 100/101.',
    },

    { type: 'selfcheck', items: [
      { q: 'Darf die Schule ein Klassenfoto auf die Homepage stellen, wenn 2 von 25 EB nicht zugestimmt haben?',
        a: 'NEIN — {{§ 22 KUG}} verlangt Einwilligung **aller** Abgebildeten; {{§ 23 KUG}}-Ausnahmen greifen nicht (kein Beiwerk, keine Zeitgeschichte). Optionen: ohne diese Kinder fotografieren / abschneiden / unkenntlich machen ODER nicht veröffentlichen, bis Einwilligungen vorliegen.' },
      { q: 'Was sind die vier Ausnahmen des {{§ 23 KUG}} — und wofür sorgt Abs. 2?',
        a: '(1) Zeitgeschichte, (2) Beiwerk, (3) Versammlung, (4) Kunst-Interesse. **Abs. 2 (Gegen-Ausnahme)**: Berechtigte Interessen des Abgebildeten können die Befugnis sperren — auch in Ausnahme-Fällen Pflicht-Prüfung.' },
      { q: 'Wo ist der Persönlichkeitsrecht-Anker für Datenschutz verfassungsrechtlich verortet?',
        a: '**{{Art. 2/1 GG}} i.V.m. {{Art. 1/1 GG}}** — allgemeines Persönlichkeitsrecht / informationelle Selbstbestimmung (BVerfG Volkszählungsurteil 1983). Bundes-Anker, NICHT BV Art. 100/101 (stale Sekundärquellen-Pfad).' },
    ]},
  ],

};
