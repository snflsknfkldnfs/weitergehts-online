#!/usr/bin/env python3
"""Datenspuren — erzeugt den erfundenen Datensatz des Falls „Nutzer 4711“ (Informatik 6, Datenschutz).

Bauplan (nur für die Lehrkraft, im Spiel bewusst NICHT erwähnt — die Auflösung kommt in der Folgestunde):
der AOL-Fall 2006. Damals hatten Reporter nur Suchanfragen mit Nutzernummer und Uhrzeit und fanden trotzdem
eine Frau, über Suchen nach Dingen in ihrem Ort und nach Leuten mit ihrem Nachnamen. Das Spiel hat deshalb zwei
Phasen: Phase 1 (nur Suchanfragen, Stufen 1–4) und Phase 2 (zusätzlich Standort, Einkauf, App; Stufen 5–6
gehen dann sehr schnell).

Eine Quelle für drei Abnehmer:
  unterricht/datenspuren/alex/data.json   das Spiel (Einträge, Phasen, Stufen mit Schlüsselwörtern, Akten-Texte)
  --loesung <pfad.md>                     Lösungsschlüssel für die Lehrkraft (NICHT auf die Website)
  --auszug <pfad.json>                    Klartext-Auszug für Druckmaterial / Plan B (NICHT auf die Website)

ALLES ERFUNDEN: Personen und Daten. Echte Orte (Volkach und Umgebung) nur als Ortsnamen, Orte darin allgemein
(„Gewerbegebiet“, „Bäckerei“), keine echten Firmen, keine Hausnummern.
Zeitraum: Mo 21.09.2026 bis So 04.10.2026. Der Zufall (andere Nutzer) ist fest geseedet → gleicher Datensatz bei jedem Lauf.

Antwortprüfung: siehe passt() unten; dieselbe Logik steht in unterricht/datenspuren/datenspuren.js (passt()).
Beide ändern sich nur gemeinsam. main() prüft die Logik bei jedem Lauf gegen die Prüfeingaben (richtig/falsch).

Aufruf:  python3 tools/datenspuren/build_datensatz.py [--loesung PFAD.md] [--auszug PFAD.json]
"""
import argparse
import base64
import json
import random
import re
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ZIEL = ROOT / 'unterricht' / 'datenspuren' / 'alex' / 'data.json'
START = date(2026, 9, 21)  # Montag
TAGE = 14
ZIEL_NUTZER = '4711'


def tag(n):
    return START + timedelta(days=n)


E = []  # (nutzer, datum, 'HH:MM', quelle, eintrag)


def add(nutzer, n, zeit, quelle, eintrag):
    assert quelle in ('Standort', 'Suche', 'Einkauf', 'App'), quelle
    assert re.fullmatch(r'\d\d:\d\d', zeit), zeit
    E.append((nutzer, tag(n), zeit, quelle, eintrag))


# ── Nutzer 4711: Alex Krämer, 18 (Geburtstag Mi 30.09.), wohnt im Lindenweg in Volkach,
#    Ausbildung Kfz-Mechatronik in einer Werkstatt im Gewerbegebiet Volkach, Berufsschule donnerstags in Kitzingen,
#    klettert Di + Do in einer Kletterhalle in Würzburg, Opa wird 80, Theorieprüfung Fr 02.10. nicht bestanden.
A = ZIEL_NUTZER
HEIM = 'Lindenweg, Volkach'
ARBEIT = 'Autowerkstatt, Gewerbegebiet Volkach'
SCHULE = 'Berufsschule, Kitzingen'
HALLE = 'Kletterhalle, Würzburg'

for n in range(TAGE):
    wt = tag(n).weekday()  # 0 = Mo
    if wt < 5:
        add(A, n, '06:48', 'Standort', HEIM)
        if wt == 3:  # Donnerstag Berufsschule
            add(A, n, '07:52', 'Standort', SCHULE)
            add(A, n, '13:40', 'Standort', SCHULE)
        else:
            add(A, n, '07:21', 'Standort', ARBEIT)
            add(A, n, '12:05', 'Standort', ARBEIT)
            add(A, n, '16:34', 'Standort', ARBEIT)
        if wt in (1, 3):  # Di, Do Klettern
            add(A, n, '18:37', 'Standort', HALLE)
            add(A, n, '20:31', 'Standort', HALLE)
    add(A, n, '23:14' if n % 3 else '22:41', 'Standort', HEIM)
    add(A, n, '02:57', 'Standort', HEIM)

for n in (0, 1, 2, 4, 5, 7, 8, 9, 11, 12):
    add(A, n, '07:05', 'App', 'Musik-App: 23 min gehört')

# Ort (nur aus Suchanfragen ablesbar)
for n in (0, 3, 6, 9, 12):
    add(A, n, '06:50', 'Suche', 'wetter volkach heute')
add(A, 1, '21:10', 'Suche', 'fahrschule volkach theorie termine')
add(A, 4, '17:02', 'Suche', 'bus volkach kitzingen fahrplan')
add(A, 6, '19:40', 'Suche', 'pizza lieferdienst volkach sonntag')
add(A, 10, '21:10', 'Suche', 'kino in der nähe von volkach')

# Alter
add(A, 2, '22:05', 'Suche', 'party zum 18. geburtstag ideen zuhause')
add(A, 3, '21:58', 'Suche', 'wie viele leute einladen geburtstag')
add(A, 8, '17:20', 'Einkauf', 'Supermarkt, Volkach: Zahlenkerze „1“, Zahlenkerze „8“, 3x Chips')
add(A, 9, '00:01', 'App', 'Nachrichten-App: 14 neue Nachrichten')
add(A, 10, '19:02', 'Suche', 'ab 18 alleine auto fahren ohne begleitung')
add(A, 13, '14:20', 'Suche', 'handyvertrag ab 18 ohne eltern')

# Familie → Nachname (Suchen nach Leuten mit dem eigenen Nachnamen)
add(A, 4, '21:40', 'Suche', 'opa krämer 80. geburtstag gedicht')
add(A, 5, '19:15', 'Suche', 'geschenk für opa zum 80.')
add(A, 7, '20:05', 'Suche', 'tante gabi krämer volkach telefonnummer')
add(A, 12, '11:30', 'Standort', 'Gasthaus, Volkach')
add(A, 12, '15:05', 'Standort', 'Gasthaus, Volkach')

# Führerschein und die Sorge
add(A, 1, '22:40', 'App', 'Führerschein-Trainer: 40 Fragen, 31 richtig')
add(A, 3, '23:02', 'App', 'Führerschein-Trainer: 40 Fragen, 33 richtig')
add(A, 7, '17:31', 'Standort', 'Fahrschule, Volkach')
add(A, 8, '23:20', 'Suche', 'theorieprüfung wie viele fehlerpunkte erlaubt')
add(A, 10, '23:45', 'App', 'Führerschein-Trainer: 40 Fragen, 35 richtig')
add(A, 11, '14:48', 'Standort', 'Führerschein-Prüfstelle, Kitzingen')
add(A, 11, '15:41', 'Standort', 'Führerschein-Prüfstelle, Kitzingen')
add(A, 11, '22:48', 'Suche', 'theorieprüfung nicht bestanden wie oft wiederholen')
add(A, 11, '23:57', 'Suche', 'prüfungsangst was hilft')
add(A, 12, '00:31', 'Suche', 'theorieprüfung wiederholen kosten')
add(A, 12, '01:12', 'Suche', 'prüfungsangst herzrasen normal')
add(A, 13, '00:20', 'Suche', 'blackout in der prüfung was tun')

# Hobby Klettern
add(A, 0, '21:12', 'Suche', 'kletterschuhe zu eng normal')
add(A, 1, '20:44', 'App', 'Klettertagebuch: Route „Gelber Riss“ geschafft')
add(A, 2, '17:45', 'Einkauf', 'Sportgeschäft, Würzburg: Kletterschuhe, 89,90 €')
add(A, 3, '20:52', 'App', 'Klettertagebuch: 7 Boulder, 1 h 50 min')
add(A, 5, '09:12', 'Standort', HALLE)
add(A, 5, '15:58', 'Standort', HALLE)
add(A, 6, '11:03', 'Suche', 'unterarm schmerzen nach klettern')
add(A, 10, '20:39', 'App', 'Klettertagebuch: 9 Boulder, 2 h 05 min')

# Ausbildung, Geld, Freizeit
add(A, 0, '12:14', 'Suche', 'drehmomentschlüssel richtig einstellen')
add(A, 1, '12:09', 'Einkauf', 'Bäckerei, Volkach: Leberkäsweck, Spezi')
add(A, 2, '12:11', 'Suche', 'zwischenprüfung kfz mechatroniker termin bayern')
add(A, 8, '12:16', 'Suche', 'ausbildungsvergütung kfz 2. lehrjahr')
add(A, 9, '12:10', 'Einkauf', 'Bäckerei, Volkach: 2 Brezen, Eistee')
add(A, 4, '21:55', 'Suche', 'gebrauchtwagen bis 3000 euro')
add(A, 12, '19:48', 'Einkauf', 'Kino, Kitzingen: 2 Karten, 21,00 €')
add(A, 12, '19:55', 'Standort', 'Kino, Kitzingen')
add(A, 12, '22:05', 'Standort', 'Kino, Kitzingen')

# ── Andere Nutzer: Rauschen, damit man filtern MUSS. Fallen: 2093 sucht auch nach Volkach,
#    3307 sucht nach einem Kindergeburtstag, 8146 klettert auch.
rnd = random.Random(4711)
ANDERE = {
    '2093': {
        'heim': 'Wohngebiet Süd, Volkach',
        'orte': ['Arztpraxis, Volkach', 'Apotheke, Volkach', 'Friedhof, Volkach', 'Gärtnerei, Dettelbach'],
        'suchen': ['tomaten überwintern', 'blutdruck werte normal mit 70', 'arzt volkach notdienst',
                   'rosen schneiden wann', 'seniorentreff volkach'],
        'kaeufe': ['Supermarkt, Volkach: Milch, Brot, Kaffee', 'Apotheke, Volkach: Blutdruckmessgerät, 39,95 €'],
        'apps': ['Wetter-App: 3 Aufrufe', 'Nachrichten-App: 2 neue Nachrichten'],
    },
    '5520': {
        'heim': 'Ortsmitte, Dettelbach',
        'orte': ['Gymnasium, Kitzingen', 'Bushaltestelle, Dettelbach', 'Musikschule, Kitzingen'],
        'suchen': ['referat klimawandel gliederung', 'gitarre akkorde lernen', 'mathe brüche erklärung',
                   'lustige katzenvideos', 'wie lange hält ein handyakku'],
        'kaeufe': ['Kiosk, Dettelbach: Eistee, Kaugummi', 'Musikgeschäft, Kitzingen: Gitarrensaiten, 8,50 €'],
        'apps': ['Spiele-App: 1 h 12 min', 'Video-App: 48 min', 'Musik-App: 30 min'],
    },
    '8146': {
        'heim': 'Stadtteil Zellerau, Würzburg',
        'orte': ['Bürogebäude, Würzburg', HALLE, 'Tankstelle, Würzburg', 'Hauptbahnhof, Würzburg'],
        'suchen': ['kletterhalle würzburg öffnungszeiten', 'zug würzburg nürnberg verspätung',
                   'steuererklärung frist 2026', 'boulder technik heel hook'],
        'kaeufe': ['Tankstelle, Würzburg: Super E10, 61,20 €', 'Sportgeschäft, Würzburg: Kletterseil, 149,00 €'],
        'apps': ['Klettertagebuch: 6 Boulder, 1 h 30 min', 'Navi-App: Route Würzburg → Nürnberg'],
    },
    '3307': {
        'heim': 'Neubaugebiet, Kitzingen',
        'orte': ['Kita, Kitzingen', 'Supermarkt, Kitzingen', 'Kinderarztpraxis, Kitzingen', 'Spielplatz am Main, Kitzingen'],
        'suchen': ['kindergeburtstag 4 jahre ideen', 'fieber kind 3 jahre was tun', 'kita elternabend ideen',
                   'günstige kinderschuhe'],
        'kaeufe': ['Supermarkt, Kitzingen: Windeln, Bananen, Haferflocken', 'Drogerie, Kitzingen: Fiebersaft, Pflaster'],
        'apps': ['Kalender-App: Termin „Elternabend“', 'Foto-App: 23 neue Fotos'],
    },
    '6612': {
        'heim': 'Studentenwohnheim, Würzburg',
        'orte': ['Universität, Würzburg', 'Mensa, Würzburg', 'Bar, Würzburg', 'Hauptbahnhof, Würzburg'],
        'suchen': ['pizza lieferdienst würzburg nachts', 'hausarbeit zitieren regeln', 'nebenjob würzburg abends',
                   'wg zimmer würzburg'],
        'kaeufe': ['Lieferdienst: Pizza Salami, 9,50 €', 'Mensa, Würzburg: Tagesgericht, 3,20 €'],
        'apps': ['Video-App: 2 h 30 min', 'Lieferdienst-App: Bestellung'],
    },
}
for nutzer, p in ANDERE.items():
    for n in range(TAGE):
        add(nutzer, n, f'{rnd.randint(6, 8):02d}:{rnd.randint(0, 59):02d}', 'Standort', p['heim'])
        if rnd.random() < 0.6:
            add(nutzer, n, f'{rnd.randint(9, 17):02d}:{rnd.randint(0, 59):02d}', 'Standort', rnd.choice(p['orte']))
        if rnd.random() < 0.45:
            add(nutzer, n, f'{rnd.randint(8, 22):02d}:{rnd.randint(0, 59):02d}', 'Suche', rnd.choice(p['suchen']))
        if rnd.random() < 0.25:
            add(nutzer, n, f'{rnd.randint(9, 19):02d}:{rnd.randint(0, 59):02d}', 'Einkauf', rnd.choice(p['kaeufe']))
        if rnd.random() < 0.3:
            add(nutzer, n, f'{rnd.randint(15, 22):02d}:{rnd.randint(0, 59):02d}', 'App', rnd.choice(p['apps']))
        add(nutzer, n, f'{rnd.randint(22, 23):02d}:{rnd.randint(0, 59):02d}', 'Standort', p['heim'])
for n in (3, 10):
    add('8146', n, '19:05', 'Standort', HALLE)

# ── Phasen, Stufen, Akte (kurz halten: Klasse 6, wenig Text auf der Seite).
#    Kein Hinweis auf den echten Fall im Spiel: die Auflösung macht die Lehrkraft in der Folgestunde.
PHASEN = [
    {'id': 'suche', 'titel': 'Phase 1', 'quellen': ['Suche'],
     'text': 'Du siehst nur Suchanfragen.'},
    {'id': 'alle', 'titel': 'Phase 2', 'quellen': ['Standort', 'Suche', 'Einkauf', 'App'],
     'text': 'Neu freigeschaltet: Standort, Einkauf, App.'},
]

# Antwortprüfung (dieselbe Logik in datenspuren.js, Funktion passt()):
#   Eingabe → Großbuchstaben, Ä/Ö/Ü → AE/OE/UE, ß → SS, alles außer A–Z0–9 trennt Wörter.
#   Mehr als MAX_WOERTER Wörter → Hinweis „nur ein oder zwei Wörter“ (gegen Raten mit Listen).
#   modus 'zahl': ein Wort muss genau einem Schlüssel entsprechen (18 ja, 180 nein).
#   modus 'wort': ein Schlüssel steckt in der zusammengeschriebenen Eingabe (Führerscheinprüfung ⊃ FUEHRERSCHEIN)
#                 oder ein Wort ist höchstens 1 Tippfehler (Schlüssel ab 5 Buchstaben) bzw. 2 (ab 8) entfernt.
#   'richtig'/'falsch' sind Prüfeingaben: main() bricht ab, wenn eine davon falsch bewertet wird.
MAX_WOERTER = 5
STUFEN = [
    {'id': 'ort', 'phase': 0, 'steckbrief': 'Ort',
     'frage': 'In welchem Ort wohnt 4711?',
     'tipps': ['Filtere nach Nutzer 4711.', 'Welcher Ort kommt in den Suchen oft vor?'],
     'modus': 'wort', 'schluessel': ['VOLKACH'],
     'richtig': ['Volkach', 'volkach', 'VOLKACH!', 'in Volkach', 'Alex wohnt in Volkach', 'Volkah', 'Folkach',
                 'Volkach am Main'],
     'falsch': ['Kitzingen', 'Dettelbach', 'Würzburg', 'Volk', 'Lindenweg',
                'Volkach Kitzingen Dettelbach Würzburg Schwarzach Gerolzhofen'],
     'anzeige': 'Volkach',
     'erkenntnis': 'Der Ort steckt in ganz normalen Suchen.'},
    {'id': 'alter', 'phase': 0, 'steckbrief': 'Alter',
     'frage': 'Wie alt ist 4711 geworden?',
     'tipps': ['Plant da jemand eine Feier?', 'Suchwort: geburtstag'],
     'modus': 'zahl', 'schluessel': ['18', 'ACHTZEHN'],
     'richtig': ['18', '18 Jahre', '18.', 'achtzehn', 'Achtzehn Jahre alt', 'er ist 18', '18 jahre alt'],
     'falsch': ['17', '19', '80', '180', '81', '1 8', '4'],
     'anzeige': '18',
     'erkenntnis': 'Das Alter hat 4711 nirgends eingetragen.'},
    {'id': 'sorge', 'phase': 0, 'steckbrief': 'Sorge',
     'frage': 'Was macht 4711 gerade Sorgen?',
     'tipps': ['Was sucht 4711 nach Mitternacht?', 'Suchwort: prüfung'],
     'modus': 'wort', 'schluessel': ['PRUEFUNG', 'PRUFUNG', 'FUEHRERSCHEIN', 'FUHRERSCHEIN', 'THEORIE', 'ANGST', 'BLACKOUT'],
     'richtig': ['Prüfung', 'prüfungsangst', 'Prufung', 'Pruefung', 'Führerschein', 'Fuhrerschein', 'Führerscheinprüfung',
                 'Theorieprüfung', 'die Theorie', 'Angst vor der Prüfung', 'Prüfungsangst!', 'Fürerschein',
                 'Prüfung nicht bestanden'],
     'falsch': ['Geburtstag', 'Opa', 'Geld', 'Klettern', 'Auto', 'Schule', 'Arbeit'],
     'anzeige': 'Führerschein-Prüfung, Prüfungsangst',
     'erkenntnis': 'Das hat 4711 niemandem erzählt. Nur der Suchmaschine.'},
    {'id': 'name', 'phase': 0, 'steckbrief': 'Nachname',
     'frage': 'Wie heißt 4711 mit Nachnamen?',
     'tipps': ['Wonach sucht 4711, wenn es um die Familie geht?', 'Suchwort: opa'],
     'modus': 'wort', 'schluessel': ['KRAEMER', 'KRAMER'],
     'richtig': ['Krämer', 'krämer', 'Kraemer', 'Kramer', 'Alex Krämer', 'Kremer', 'Krämmer', 'Familie Krämer', 'KRÄMER'],
     'falsch': ['Gabi', 'Opa', 'Alex', 'Müller', 'Kraus', 'Volkach', 'Krä'],
     'anzeige': 'Krämer (Vorname: Alex)',
     'erkenntnis': 'Nur aus Suchanfragen: Ort, Alter, Sorge und Name.'},
    {'id': 'strasse', 'phase': 1, 'steckbrief': 'Straße',
     'frage': 'In welcher Straße schläft 4711?',
     'tipps': ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
     'modus': 'wort', 'schluessel': ['LINDENWEG', 'LINDEN'],
     'richtig': ['Lindenweg', 'lindenweg', 'Lindenweg, Volkach', 'im Lindenweg', 'Lindenstraße', 'Lindnweg', 'Lindeweg'],
     'falsch': ['Volkach', 'Gewerbegebiet', 'Kino', 'Hauptstraße', 'Weg'],
     'anzeige': 'Lindenweg',
     'erkenntnis': 'Ein Filter, zwei Sekunden. Mit mehr Daten geht es viel schneller.'},
    {'id': 'hobby', 'phase': 1, 'steckbrief': 'Hobby',
     'frage': 'Wohin geht 4711 dienstags und donnerstags am Abend?',
     'tipps': ['Tag: Di 22.09., Quelle: Standort.', 'Ist dein Nutzerfilter noch an?'],
     'modus': 'wort', 'schluessel': ['KLETTER', 'KLETTERN', 'KLETTERHALLE', 'BOULDER'],
     'richtig': ['Kletterhalle', 'klettern', 'Klettern gehen', 'in die Kletterhalle Würzburg', 'Bouldern', 'Kleterhalle',
                 'Kletern'],
     'falsch': ['Würzburg', 'Sport', 'Fitnessstudio', 'Kino', 'Berufsschule', 'Halle'],
     'anzeige': 'Kletterhalle in Würzburg',
     'erkenntnis': 'Jetzt weißt du auch, wann 4711 nicht zu Hause ist.'},
]


def woerter(eingabe):
    s = eingabe.upper().replace('Ä', 'AE').replace('Ö', 'OE').replace('Ü', 'UE')
    return [w for w in re.split(r'[^A-Z0-9]+', s) if w]


def abstand(a, b):
    zeile = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        neu = [i]
        for j, cb in enumerate(b, 1):
            neu.append(min(zeile[j] + 1, neu[j - 1] + 1, zeile[j - 1] + (ca != cb)))
        zeile = neu
    return zeile[-1]


def passt(eingabe, stufe):
    """True / False / 'zuviel' — Spiegel von passt() in datenspuren.js."""
    w = woerter(eingabe)
    if not w:
        return False
    if len(w) > MAX_WOERTER:
        return 'zuviel'
    if stufe['modus'] == 'zahl':
        return any(x in stufe['schluessel'] for x in w)
    zusammen = ''.join(w)
    for k in stufe['schluessel']:
        if k in zusammen:
            return True
        grenze = 2 if len(k) >= 8 else (1 if len(k) >= 5 else 0)
        if grenze and any(abs(len(x) - len(k)) <= grenze and abstand(x, k) <= grenze for x in w):
            return True
    return False


AKTE = {
    'titel': 'Fall 4711',
    'absender': 'Agentur NEBEL · Ausbildungsfall',
    'briefing': ['Datenpaket aus unserer Gegend. „Alles anonym, nur Nummern.“',
                 'Finde heraus, wer Nutzer 4711 ist.'],
    'hinweis_fiktion': 'Personen und Daten sind erfunden.',
    'abschluss': {
        'titel': 'Akte geschlossen. War das in Ordnung?',
        'text': ['Aus einer Nummer ist ein Mensch geworden: Ort, Straße, Alter, Name, Hobby und eine Sorge.'],
        'fragen': ['Was würde 4711 nicht wollen, dass Fremde es wissen?',
                   'Wer könnte so ein Profil kaufen wollen?'],
    },
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--loesung')
    ap.add_argument('--auszug')
    a = ap.parse_args()

    E.sort(key=lambda e: (e[1], e[2], e[0]))
    wt = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    eintraege = [{'nutzer': nu, 'datum': d.isoformat(), 'tag': wt[d.weekday()], 'zeit': z, 'quelle': q, 'eintrag': t}
                 for nu, d, z, q, t in E]

    # Selbstprüfung 1: jede Stufe ist in ihrer Phase lösbar (ein Beleg-Wort steht in einem erlaubten Eintrag von 4711)
    belegwort = {'ort': 'volkach', 'alter': '18.', 'sorge': 'prüfungsangst', 'name': 'krämer',
                 'strasse': 'Lindenweg', 'hobby': 'Kletterhalle'}
    for s in STUFEN:
        erlaubt = PHASEN[s['phase']]['quellen']
        assert any(belegwort[s['id']].lower() in e['eintrag'].lower() for e in eintraege
                   if e['nutzer'] == ZIEL_NUTZER and e['quelle'] in erlaubt), s['id']
    # Selbstprüfung 2: Antwortlogik trennscharf (alle richtig-Eingaben True, alle falsch-Eingaben nicht True)
    fehler = []
    for s in STUFEN:
        fehler += [f"{s['id']}: '{x}' abgelehnt" for x in s['richtig'] if passt(x, s) is not True]
        fehler += [f"{s['id']}: '{x}' angenommen" for x in s['falsch'] if passt(x, s) is True]
    assert not fehler, fehler
    pruefungen = sum(len(s['richtig']) + len(s['falsch']) for s in STUFEN)
    # Selbstprüfung 3: kein Hinweis auf den echten Fall in sichtbaren Texten
    sichtbar_text = json.dumps([AKTE, PHASEN, [{k: s[k] for k in ('frage', 'tipps', 'erkenntnis', 'anzeige')} for s in STUFEN]],
                               ensure_ascii=False)
    for verboten in ('2006', 'AOL', 'Reporter', 'echte', 'wirklich'):
        assert verboten not in sichtbar_text, verboten

    # Schlüssel nur leicht verschleiert (Base64), damit sie beim Überfliegen der Datei nicht auffallen; kein Schutz.
    stufen_web = [{**{k: v for k, v in s.items() if k not in ('schluessel', 'richtig', 'falsch')},
                   'k': base64.b64encode(json.dumps(s['schluessel']).encode()).decode()} for s in STUFEN]
    daten = {'version': 3, 'akte': AKTE, 'phasen': PHASEN, 'max_woerter': MAX_WOERTER, 'stufen': stufen_web,
             'eintraege': eintraege}
    ZIEL.write_text(json.dumps(daten, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    n4711 = sum(1 for e in eintraege if e['nutzer'] == ZIEL_NUTZER)
    nsuche = sum(1 for e in eintraege if e['quelle'] == 'Suche')
    print(f'{ZIEL.relative_to(ROOT)}: {len(eintraege)} Einträge (Suche: {nsuche}), davon Nutzer 4711: {n4711}, '
          f'Nutzer gesamt: {len({e["nutzer"] for e in eintraege})}, Stufen: {len(STUFEN)}, '
          f'Antwortprüfung: {pruefungen} Prüfeingaben korrekt bewertet')

    if a.loesung:
        belege = {
            'ort': 'Suchen „wetter volkach heute“ (5x), „fahrschule volkach“, „bus volkach kitzingen“; Falle: 2093 sucht auch „arzt volkach“',
            'alter': 'Suche 23.09. 22:05 „party zum 18. geburtstag“, 01.10. „ab 18 alleine auto fahren“, 04.10. „handyvertrag ab 18“; Falle: 3307 „kindergeburtstag 4 jahre“',
            'sorge': 'Fr 02.10. ab 22:48 bis So 00:20: „nicht bestanden“, „prüfungsangst“, „blackout in der prüfung“',
            'name': 'Suchen 25.09. „opa krämer 80. geburtstag“, 28.09. „tante gabi krämer volkach“ (AOL-Muster: Leute mit dem eigenen Nachnamen)',
            'strasse': 'Phase 2: Standort jede Nacht 22:41/23:14 und 02:57 → Lindenweg',
            'hobby': 'Phase 2: Standort Di/Do 18:37–20:31 Kletterhalle Würzburg; Falle: 8146 klettert auch',
        }
        z = ['# Fall 4711 — Lösungsschlüssel (Lehrkraft, nicht für die Klasse)', '',
             'Erzeugt von `tools/datenspuren/build_datensatz.py` im Website-Repo; nie von Hand pflegen.',
             'Phase 1 = nur Suchanfragen (Stufen 1–4, Bauplan AOL 2006, im Spiel nicht erwähnt), Phase 2 = alle Quellen (Stufen 5–6).',
             'Angenommen wird, wenn ein Schlüsselwort in der Eingabe steckt: Groß/klein, Umlaute, Satzzeichen egal, '
             'ganze Sätze erlaubt, kleine Tippfehler erlaubt, Zahlen exakt, höchstens 5 Wörter.', '',
             '| Stufe | Phase | Frage | Lösung | Schlüssel | Beispiele, die angenommen werden | Belege im Datensatz |',
             '|---|---|---|---|---|---|---|']
        for i, s in enumerate(STUFEN, 1):
            z.append(f"| {i} | {s['phase'] + 1} | {s['frage']} | **{s['anzeige']}** | {' · '.join(s['schluessel'])} | "
                     f"{' · '.join(s['richtig'][:5])} | {belege[s['id']]} |")
        Path(a.loesung).write_text('\n'.join(z) + '\n', encoding='utf-8')
        print('Lösung:', a.loesung)
    if a.auszug:
        Path(a.auszug).write_text(json.dumps({'akte': AKTE, 'phasen': PHASEN, 'stufen': STUFEN, 'eintraege': eintraege},
                                             ensure_ascii=False, indent=1), encoding='utf-8')
        print('Auszug:', a.auszug)
    return 0


if __name__ == '__main__':
    sys.exit(main())
