#!/usr/bin/env python3
"""Datenspuren — erzeugt die erfundenen Fälle des Werkzeugs „Datenspuren“ (Informatik 6, Datenschutz).

Sechs Fälle, ein Bauplan (nur für die Lehrkraft, im Spiel bewusst NICHT erwähnt — Auflösung in der Folgestunde):
der AOL-Fall 2006. Damals hatten Reporter nur EINE Datenart (Suchanfragen) mit Nutzernummer und Uhrzeit und fanden
trotzdem eine Frau. Jeder Fall hat deshalb zwei Phasen: Phase 1 zeigt nur eine Datenart (je Fall eine andere:
Suche, Lauf-App, Bonuskarte, Foto-App, Lieferdienst, Smartwatch), Stufen 1–4 enden mit dem Nachnamen;
Phase 2 schaltet alle Datenarten frei, Stufen 5–6 gehen dann sehr schnell.

Eine Quelle für alle Abnehmer:
  unterricht/datenspuren/<fall>/data.json + index.html   das Spiel je Fall
  unterricht/datenspuren/index.html                       Übersicht der Fälle
  --loesung <pfad.md>                                     Lösungsschlüssel aller Fälle (NICHT auf die Website)
  --auszug-dir <ordner>                                   je Fall <fall>_auszug.json für Druckmaterial (NICHT auf die Website)

ALLES ERFUNDEN: Personen und Daten. Echte Orte (Volkach und Umgebung) nur als Ortsnamen, Orte darin allgemein
(„Gewerbegebiet“, „Bäckerei“), keine echten Firmen, keine Hausnummern. Zeitraum Mo 21.09. bis So 04.10.2026.
Zufall (andere Nutzer) fest geseedet je Fall → gleicher Datensatz bei jedem Lauf.

Antwortprüfung: passt() unten; dieselbe Logik steht in unterricht/datenspuren/datenspuren.js (passt()).
Beide ändern sich nur gemeinsam. main() prüft bei jedem Lauf je Fall: Lösbarkeit jeder Stufe in ihrer Phase,
alle Prüfeingaben (richtig/falsch), Nachname nicht bei anderen Nutzern, kein Hinweis auf den echten Fall.

Aufruf:  python3 tools/datenspuren/build_datensatz.py [--loesung PFAD.md] [--auszug-dir ORDNER]
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
WEB = ROOT / 'unterricht' / 'datenspuren'
VORLAGE = WEB / 'alex' / 'index.html'   # Seitenvorlage, für alle Fälle identisch (Inhalt kommt aus data.json)
BASIS_URL = 'https://weitergehts.online/unterricht/datenspuren/'
START = date(2026, 9, 21)  # Montag
TAGE = 14
QUELLEN = ['Standort', 'Suche', 'Einkauf', 'App']
MAX_WOERTER = 5


def tag(n):
    return START + timedelta(days=n)


class Sammler:
    def __init__(self):
        self.e = []  # (nutzer, datum, 'HH:MM', quelle, eintrag)

    def add(self, nutzer, n, zeit, quelle, eintrag):
        assert quelle in QUELLEN, quelle
        assert re.fullmatch(r'\d\d:\d\d', zeit), zeit
        assert 0 <= n < TAGE, n
        self.e.append((nutzer, tag(n), zeit, quelle, eintrag))


# ── Rauschen: andere Nutzer, damit man filtern MUSS (für alle Fälle gleich, Zufall je Fall geseedet)
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
        'orte': ['Bürogebäude, Würzburg', 'Kletterhalle, Würzburg', 'Tankstelle, Würzburg', 'Hauptbahnhof, Würzburg'],
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


def rauschen(s, seed):
    rnd = random.Random(seed)
    for nutzer, p in ANDERE.items():
        for n in range(TAGE):
            s.add(nutzer, n, f'{rnd.randint(6, 8):02d}:{rnd.randint(0, 59):02d}', 'Standort', p['heim'])
            if rnd.random() < 0.6:
                s.add(nutzer, n, f'{rnd.randint(9, 17):02d}:{rnd.randint(0, 59):02d}', 'Standort', rnd.choice(p['orte']))
            if rnd.random() < 0.45:
                s.add(nutzer, n, f'{rnd.randint(8, 22):02d}:{rnd.randint(0, 59):02d}', 'Suche', rnd.choice(p['suchen']))
            if rnd.random() < 0.25:
                s.add(nutzer, n, f'{rnd.randint(9, 19):02d}:{rnd.randint(0, 59):02d}', 'Einkauf', rnd.choice(p['kaeufe']))
            if rnd.random() < 0.3:
                s.add(nutzer, n, f'{rnd.randint(15, 22):02d}:{rnd.randint(0, 59):02d}', 'App', rnd.choice(p['apps']))
            s.add(nutzer, n, f'{rnd.randint(22, 23):02d}:{rnd.randint(0, 59):02d}', 'Standort', p['heim'])


def alltag(s, nu, heim, werktag=(), wochentag=None, nacht=('23:10', '02:55'), morgen='06:40'):
    """Grundgerüst: jede Nacht zu Hause, werktags (Mo–Fr) feste Orte, dazu Orte an bestimmten Wochentagen."""
    wochentag = wochentag or {}
    for n in range(TAGE):
        wt = tag(n).weekday()
        if wt < 5:
            s.add(nu, n, morgen, 'Standort', heim)
            for zeit, ort in werktag:
                s.add(nu, n, zeit, 'Standort', ort)
        for zeit, ort in wochentag.get(wt, []):
            s.add(nu, n, zeit, 'Standort', ort)
        s.add(nu, n, nacht[0], 'Standort', heim)
        s.add(nu, n, nacht[1], 'Standort', heim)


# ══ Fall 4711 · Alex Krämer, 18, Volkach · Phase 1: Suche (unverändert seit der Veröffentlichung 08.10.) ══
def fall_alex(s):
    A = '4711'
    HEIM = 'Lindenweg, Volkach'
    ARBEIT = 'Autowerkstatt, Gewerbegebiet Volkach'
    SCHULE = 'Berufsschule, Kitzingen'
    HALLE = 'Kletterhalle, Würzburg'
    add = s.add
    for n in range(TAGE):
        wt = tag(n).weekday()
        if wt < 5:
            add(A, n, '06:48', 'Standort', HEIM)
            if wt == 3:
                add(A, n, '07:52', 'Standort', SCHULE)
                add(A, n, '13:40', 'Standort', SCHULE)
            else:
                add(A, n, '07:21', 'Standort', ARBEIT)
                add(A, n, '12:05', 'Standort', ARBEIT)
                add(A, n, '16:34', 'Standort', ARBEIT)
            if wt in (1, 3):
                add(A, n, '18:37', 'Standort', HALLE)
                add(A, n, '20:31', 'Standort', HALLE)
        add(A, n, '23:14' if n % 3 else '22:41', 'Standort', HEIM)
        add(A, n, '02:57', 'Standort', HEIM)
    for n in (0, 1, 2, 4, 5, 7, 8, 9, 11, 12):
        add(A, n, '07:05', 'App', 'Musik-App: 23 min gehört')
    for n in (0, 3, 6, 9, 12):
        add(A, n, '06:50', 'Suche', 'wetter volkach heute')
    add(A, 1, '21:10', 'Suche', 'fahrschule volkach theorie termine')
    add(A, 4, '17:02', 'Suche', 'bus volkach kitzingen fahrplan')
    add(A, 6, '19:40', 'Suche', 'pizza lieferdienst volkach sonntag')
    add(A, 10, '21:10', 'Suche', 'kino in der nähe von volkach')
    add(A, 2, '22:05', 'Suche', 'party zum 18. geburtstag ideen zuhause')
    add(A, 3, '21:58', 'Suche', 'wie viele leute einladen geburtstag')
    add(A, 8, '17:20', 'Einkauf', 'Supermarkt, Volkach: Zahlenkerze „1“, Zahlenkerze „8“, 3x Chips')
    add(A, 9, '00:01', 'App', 'Nachrichten-App: 14 neue Nachrichten')
    add(A, 10, '19:02', 'Suche', 'ab 18 alleine auto fahren ohne begleitung')
    add(A, 13, '14:20', 'Suche', 'handyvertrag ab 18 ohne eltern')
    add(A, 4, '21:40', 'Suche', 'opa krämer 80. geburtstag gedicht')
    add(A, 5, '19:15', 'Suche', 'geschenk für opa zum 80.')
    add(A, 7, '20:05', 'Suche', 'tante gabi krämer volkach telefonnummer')
    add(A, 12, '11:30', 'Standort', 'Gasthaus, Volkach')
    add(A, 12, '15:05', 'Standort', 'Gasthaus, Volkach')
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
    add(A, 0, '21:12', 'Suche', 'kletterschuhe zu eng normal')
    add(A, 1, '20:44', 'App', 'Klettertagebuch: Route „Gelber Riss“ geschafft')
    add(A, 2, '17:45', 'Einkauf', 'Sportgeschäft, Würzburg: Kletterschuhe, 89,90 €')
    add(A, 3, '20:52', 'App', 'Klettertagebuch: 7 Boulder, 1 h 50 min')
    add(A, 5, '09:12', 'Standort', HALLE)
    add(A, 5, '15:58', 'Standort', HALLE)
    add(A, 6, '11:03', 'Suche', 'unterarm schmerzen nach klettern')
    add(A, 10, '20:39', 'App', 'Klettertagebuch: 9 Boulder, 2 h 05 min')
    add(A, 0, '12:14', 'Suche', 'drehmomentschlüssel richtig einstellen')
    add(A, 1, '12:09', 'Einkauf', 'Bäckerei, Volkach: Leberkäsweck, Spezi')
    add(A, 2, '12:11', 'Suche', 'zwischenprüfung kfz mechatroniker termin bayern')
    add(A, 8, '12:16', 'Suche', 'ausbildungsvergütung kfz 2. lehrjahr')
    add(A, 9, '12:10', 'Einkauf', 'Bäckerei, Volkach: 2 Brezen, Eistee')
    add(A, 4, '21:55', 'Suche', 'gebrauchtwagen bis 3000 euro')
    add(A, 12, '19:48', 'Einkauf', 'Kino, Kitzingen: 2 Karten, 21,00 €')
    add(A, 12, '19:55', 'Standort', 'Kino, Kitzingen')
    add(A, 12, '22:05', 'Standort', 'Kino, Kitzingen')


def extra_alex(s):
    for n in (3, 10):
        s.add('8146', n, '19:05', 'Standort', 'Kletterhalle, Würzburg')


# ══ Fall 3150 · Kim Hofmann, 34, Dettelbach · Phase 1: Lauf-App (App) ══
def fall_kim(s):
    K = '3150'
    HEIM = 'Rosengasse, Dettelbach'
    alltag(s, K, HEIM, werktag=[('06:02', 'Pflegeheim, Kitzingen'), ('13:55', 'Pflegeheim, Kitzingen')],
           wochentag={0: [('16:28', 'Mainufer, Dettelbach')], 2: [('16:31', 'Mainufer, Dettelbach')],
                      5: [('08:05', 'Mainufer, Dettelbach')]},
           nacht=('22:20', '03:05'), morgen='05:38')
    add = s.add
    runden = {0: '7,1 km, 38 min', 2: '8,0 km, 43 min', 4: '6,5 km, 35 min', 5: '16,2 km, 1 h 31 min',
              7: '7,3 km, 39 min'}
    for n, w in runden.items():
        zeit = '09:40' if tag(n).weekday() >= 5 else '17:15'
        add(K, n, zeit, 'App', f'Lauf-App: Runde Mainufer Dettelbach, {w}')
    add(K, 0, '17:20', 'App', 'Lauf-App: Trainingsplan Halbmarathon, Woche 6 von 10')
    add(K, 3, '20:10', 'App', 'Lauf-App: Anmeldung bestätigt: Halbmarathon Würzburg')
    add(K, 5, '09:45', 'App', 'Lauf-App: 3 Kudos, u. a. von Papa Hofmann')
    add(K, 6, '18:02', 'App', 'Lauf-App: Nachricht von Tante Gerda Hofmann: „Weiter so!“')
    add(K, 8, '16:44', 'App', 'Lauf-App: Lauf abgebrochen nach 2,1 km. Notiz: Knie tut weh')
    add(K, 9, '21:30', 'App', 'Gesundheits-App: Schmerztagebuch Knie, Stärke 6 von 10')
    add(K, 11, '21:05', 'App', 'Gesundheits-App: Schmerztagebuch Knie, Stärke 7 von 10')
    add(K, 12, '10:15', 'App', 'Lauf-App: Trainingsplan pausiert')
    for n in (1, 3, 6, 10, 13):
        add(K, n, '21:40', 'App', 'Musik-App: Hörbuch, 35 min')
    add(K, 9, '17:10', 'Standort', 'Apotheke, Dettelbach')
    add(K, 9, '17:12', 'Einkauf', 'Apotheke, Dettelbach: Kniebandage, Schmerzgel')
    add(K, 10, '15:20', 'Standort', 'Orthopädische Praxis, Kitzingen')
    add(K, 2, '19:30', 'Suche', 'laufschuhe pronation test')
    add(K, 10, '22:15', 'Suche', 'knie schmerzen außen beim laufen')
    add(K, 4, '14:30', 'Einkauf', 'Supermarkt, Dettelbach: Haferflocken, Bananen, Isogetränk')


# ══ Fall 5208 · Jo Weber, 41, Schwarzach · Phase 1: Bonuskarte (Einkauf) ══
def fall_jo(s):
    J = '5208'
    HEIM = 'Am Kirchberg, Schwarzach'
    alltag(s, J, HEIM, werktag=[('07:42', 'Bankfiliale, Volkach'), ('12:30', 'Bankfiliale, Volkach'),
                                ('16:50', 'Bankfiliale, Volkach')],
           wochentag={5: [('09:30', 'Supermarkt, Schwarzach')], 6: [('10:15', 'Spielplatz, Schwarzach')]},
           nacht=('23:30', '03:40'), morgen='06:55')
    add = s.add
    K = 'Bonuskarte · Supermarkt, Schwarzach: '
    add(J, 0, '17:20', 'Einkauf', K + 'Windeln Gr. 1, Feuchttücher, Kaffee')
    add(J, 1, '17:35', 'Einkauf', K + 'Hundefutter 12 kg, Kauknochen')
    add(J, 2, '17:15', 'Einkauf', K + 'Pre-Milch, Fläschchen-Sauger, Brot')
    add(J, 3, '17:40', 'Einkauf', 'Bonuskarte · Schreibwaren, Schwarzach: Glückwunschkarte „Zur Geburt“')
    add(J, 4, '17:25', 'Einkauf', 'Bonuskarte · Schreibwaren, Schwarzach: Namensaufkleber „Weber“, 50 Stück')
    add(J, 5, '09:35', 'Einkauf', K + 'Windeln Gr. 1, Babybrei, Hundeleckerli, Wein')
    add(J, 7, '17:22', 'Einkauf', K + 'Feuchttücher, Wundschutzcreme, Kaffee')
    add(J, 8, '17:30', 'Einkauf', 'Bonuskarte · Drogerie, Volkach: Babybadewanne, Schnuller')
    add(J, 9, '17:18', 'Einkauf', K + 'Hundefutter 12 kg, Kotbeutel')
    add(J, 10, '17:45', 'Einkauf', 'Bonuskarte · Blumenladen, Schwarzach: Blumen, Karte „Für Oma Weber“')
    add(J, 12, '09:40', 'Einkauf', K + 'Pre-Milch, Windeln Gr. 1, Pizza')
    add(J, 13, '10:20', 'Einkauf', 'Bonuskarte · Bäckerei, Schwarzach: 6 Brötchen')
    for n in (0, 2, 7, 9, 11):
        add(J, n, '06:58', 'Standort', 'Hundewiese, Schwarzach')
    for n in (1, 4, 8, 11):
        add(J, n, '02:10', 'App', 'Baby-App: Fläschchen 120 ml')
    add(J, 3, '22:05', 'Suche', 'baby schläft nachts nicht durch 3 wochen')
    add(J, 6, '20:30', 'Suche', 'hund an baby gewöhnen tipps')
    add(J, 9, '12:35', 'Suche', 'elterngeld antrag bayern')


# ══ Fall 6620 · Sam Lehmann, 16, Gerolzhofen · Phase 1: Foto-App (App) ══
def fall_sam(s):
    S = '6620'
    HEIM = 'Ahornweg, Gerolzhofen'
    alltag(s, S, HEIM, werktag=[('07:38', 'Realschule, Gerolzhofen'), ('13:05', 'Realschule, Gerolzhofen')],
           wochentag={1: [('15:30', 'Reitstall, Dingolshausen'), ('18:10', 'Reitstall, Dingolshausen')],
                      4: [('15:25', 'Reitstall, Dingolshausen'), ('18:00', 'Reitstall, Dingolshausen')],
                      5: [('06:50', 'Bäckerei, Gerolzhofen'), ('12:05', 'Bäckerei, Gerolzhofen')]},
           nacht=('22:45', '03:20'), morgen='07:05')
    add = s.add
    F = 'Foto-App: '
    add(S, 0, '10:12', 'App', F + '3 Fotos, Ort: Pausenhof, Realschule Gerolzhofen')
    add(S, 1, '16:40', 'App', F + '14 Fotos, Ort: Reitstall, Dingolshausen')
    add(S, 2, '17:30', 'App', F + '2 Fotos, Ort: Eisdiele, Marktplatz Gerolzhofen')
    add(S, 3, '10:15', 'App', F + '1 Foto, Ort: Klassenzimmer 10b, Realschule Gerolzhofen')
    add(S, 4, '16:55', 'App', F + '9 Fotos, Ort: Reitplatz, Dingolshausen. Erkannt: Pferd')
    add(S, 5, '19:20', 'App', F + 'Album „Sommer“ geteilt mit Gruppe „Familie Lehmann“')
    add(S, 6, '15:10', 'App', F + '22 Fotos, Ort: Stadtfest, Gerolzhofen')
    add(S, 8, '16:30', 'App', F + '11 Fotos, Ort: Reitstall, Dingolshausen. Erkannt: Pferd')
    add(S, 9, '18:45', 'App', F + 'Geburtstagsfoto gesendet an „Oma Lehmann“')
    add(S, 10, '10:20', 'App', F + '2 Fotos, Ort: Sporthalle, Realschule Gerolzhofen')
    add(S, 11, '17:05', 'App', F + '7 Fotos, Ort: Reitstall, Dingolshausen')
    add(S, 13, '14:00', 'App', F + '5 Fotos, Ort: Badesee, Gerolzhofen')
    for n in (0, 2, 3, 7, 9, 10):
        add(S, n, '20:15', 'App', 'Video-App: 1 h 05 min')
    add(S, 5, '12:10', 'Einkauf', 'Bäckerei, Gerolzhofen: Lohn Samstag, 36,00 €')
    add(S, 7, '19:40', 'Suche', 'reithelm größe 56 test')
    add(S, 9, '21:00', 'Suche', 'ausbildung pferdewirt bayern')


# ══ Fall 7734 · Robin Schmitt, 24, Kitzingen · Phase 1: Lieferdienst (Einkauf) ══
def fall_robin(s):
    R = '7734'
    HEIM = 'Mühlenweg, Kitzingen'
    alltag(s, R, HEIM, werktag=[('13:52', 'Tankstelle, Kitzingen'), ('18:00', 'Tankstelle, Kitzingen'),
                                ('21:58', 'Tankstelle, Kitzingen')],
           wochentag={5: [('11:00', 'Fitnessstudio, Kitzingen')]},
           nacht=('23:05', '03:30'), morgen='10:20')
    add = s.add
    L = 'Lieferdienst: '
    add(R, 0, '23:15', 'Einkauf', L + 'Pizza Margherita, glutenfrei · Lieferung nach Kitzingen')
    add(R, 1, '23:20', 'Einkauf', L + 'Pizza Funghi, glutenfrei · Lieferung nach Kitzingen')
    add(R, 2, '23:10', 'Einkauf', L + 'Salat, Pommes · Lieferung nach Kitzingen, Klingel „Schmitt“')
    add(R, 3, '23:25', 'Einkauf', L + 'Pizza Salami, glutenfrei · Lieferung nach Kitzingen')
    add(R, 5, '19:30', 'Einkauf', L + 'Pizza Margherita, glutenfrei. Notiz: „Bitte wirklich ohne Gluten, Zöliakie!“')
    add(R, 6, '18:45', 'Einkauf', L + 'Pizza Tonno, glutenfrei · Lieferung nach Kitzingen')
    add(R, 7, '23:12', 'Einkauf', L + 'Pizza Margherita, glutenfrei · Lieferung nach Kitzingen')
    add(R, 9, '23:30', 'Einkauf', L + 'Pizza Hawaii, glutenfrei · Klingel „Schmitt“')
    add(R, 10, '23:18', 'Einkauf', L + 'Burger ohne Brötchen · Lieferung nach Kitzingen')
    add(R, 12, '20:05', 'Einkauf', L + 'Pizza Margherita, glutenfrei · Lieferung nach Kitzingen')
    add(R, 13, '19:40', 'Einkauf', L + 'Pizza Funghi, glutenfrei · Lieferung nach Kitzingen')
    for n in (2, 6, 11):
        add(R, n, '11:15', 'Suche', 'glutenfreies brot kitzingen')
    add(R, 4, '12:30', 'Suche', 'zöliakie was darf ich essen')
    add(R, 8, '10:45', 'App', 'Fitness-App: Training Oberkörper, 55 min')


# ══ Fall 8892 · Luca Bauer, 52, Wiesentheid · Phase 1: Smartwatch (App) ══
def fall_luca(s):
    L = '8892'
    HEIM = 'Birkenweg, Wiesentheid'
    alltag(s, L, HEIM, werktag=[('07:45', 'Büro, Wiesentheid'), ('16:30', 'Büro, Wiesentheid')],
           wochentag={5: [('09:00', 'Radweg am Main, Volkach')], 6: [('09:15', 'Radweg, Steigerwald')]},
           nacht=('22:50', '03:15'), morgen='06:45')
    add = s.add
    W = 'Smartwatch: '
    for n in (0, 3, 6, 9, 12):
        add(L, n, '06:30', 'App', W + 'Wetter für Wiesentheid, 11 °C')
    add(L, 1, '18:40', 'App', W + 'Training Radfahren, 28 km, Puls Ø 131')
    add(L, 5, '11:30', 'App', W + 'Training Radfahren, 64 km, Puls Ø 138')
    add(L, 6, '12:05', 'App', W + 'Training Radfahren, 52 km, Puls Ø 135')
    add(L, 7, '14:12', 'App', W + 'Warnung: unregelmäßiger Herzrhythmus erkannt')
    add(L, 8, '03:40', 'App', W + 'Puls in Ruhe 112, ungewöhnlich hoch')
    add(L, 8, '07:10', 'App', W + 'Nachricht von „Tim Bauer“: Gute Besserung!')
    add(L, 9, '20:30', 'App', W + 'Notfallkontakt geändert: „Eva Bauer“')
    add(L, 11, '13:20', 'App', W + 'Warnung: unregelmäßiger Herzrhythmus erkannt')
    for n in range(TAGE):
        add(L, n, '06:44', 'App', W + f'Schlaf {6 + n % 2} h {(10 + 7 * n) % 50 + 5} min')
    add(L, 9, '09:00', 'Standort', 'Kardiologische Praxis, Würzburg')
    add(L, 9, '10:35', 'Standort', 'Kardiologische Praxis, Würzburg')
    add(L, 9, '10:50', 'Einkauf', 'Apotheke, Würzburg: Medikament nach Rezept')
    add(L, 8, '21:15', 'Suche', 'herzrhythmusstörung gefährlich')


def stufe(sid, phase, steckbrief, frage, tipps, modus, schluessel, richtig, falsch, anzeige, erkenntnis, belegwort,
          beleg, beleg_lehrkraft):
    return dict(id=sid, phase=phase, steckbrief=steckbrief, frage=frage, tipps=tipps, modus=modus,
                schluessel=schluessel, richtig=richtig, falsch=falsch, anzeige=anzeige, erkenntnis=erkenntnis,
                belegwort=belegwort, beleg=beleg, beleg_lehrkraft=beleg_lehrkraft)


ERK_NAME = 'Nur aus einer einzigen Datenart: ein Name.'
ERK_P2 = 'Ein Filter, zwei Sekunden. Mit mehr Daten geht es viel schneller.'

FAELLE = [
    {'id': 'alex', 'nutzer': '4711', 'person': 'Alex Krämer, 18, Volkach, Azubi Kfz', 'quelle1': 'Suche',
     'baue': fall_alex, 'extra': extra_alex, 'seed': 4711, 'nachname': 'krämer',
     'stufen': [
         stufe('ort', 0, 'Ort', 'In welchem Ort wohnt 4711?',
               ['Filtere nach Nutzer 4711.', 'Welcher Ort kommt in den Suchen oft vor?'],
               'wort', ['VOLKACH'],
               ['Volkach', 'volkach', 'VOLKACH!', 'in Volkach', 'Alex wohnt in Volkach', 'Volkah', 'Folkach', 'Volkach am Main'],
               ['Kitzingen', 'Dettelbach', 'Würzburg', 'Volk', 'Lindenweg',
                'Volkach Kitzingen Dettelbach Würzburg Schwarzach Gerolzhofen'],
               'Volkach', 'Der Ort steckt in ganz normalen Suchen.', 'volkach',
               'Suche: „wetter volkach heute“, „fahrschule volkach …“',
               'Suchen „wetter volkach heute“ (5x), „fahrschule volkach“, „bus volkach kitzingen“; Falle: 2093 sucht auch „arzt volkach“'),
         stufe('alter', 0, 'Alter', 'Wie alt ist 4711 geworden?', ['Plant da jemand eine Feier?', 'Suchwort: geburtstag'],
               'zahl', ['18', 'ACHTZEHN'],
               ['18', '18 Jahre', '18.', 'achtzehn', 'Achtzehn Jahre alt', 'er ist 18', '18 jahre alt'],
               ['17', '19', '80', '180', '81', '1 8', '4'],
               '18', 'Das Alter hat 4711 nirgends eingetragen.', '18.',
               'Suche 23.09. 22:05: „party zum 18. geburtstag …“',
               'Suche 23.09. 22:05 „party zum 18. geburtstag“, 01.10. „ab 18 alleine auto fahren“, 04.10. „handyvertrag ab 18“; Falle: 3307 „kindergeburtstag 4 jahre“'),
         stufe('sorge', 0, 'Sorge', 'Was macht 4711 gerade Sorgen?', ['Was sucht 4711 nach Mitternacht?', 'Suchwort: prüfung'],
               'wort', ['PRUEFUNG', 'PRUFUNG', 'FUEHRERSCHEIN', 'FUHRERSCHEIN', 'THEORIE', 'ANGST', 'BLACKOUT'],
               ['Prüfung', 'prüfungsangst', 'Prufung', 'Pruefung', 'Führerschein', 'Fuhrerschein', 'Führerscheinprüfung',
                'Theorieprüfung', 'die Theorie', 'Angst vor der Prüfung', 'Prüfungsangst!', 'Fürerschein', 'Prüfung nicht bestanden'],
               ['Geburtstag', 'Opa', 'Geld', 'Klettern', 'Auto', 'Schule', 'Arbeit'],
               'Führerschein-Prüfung, Prüfungsangst', 'Das hat 4711 niemandem erzählt. Nur der Suchmaschine.', 'prüfungsangst',
               'Suche nach Mitternacht: „prüfungsangst was hilft“',
               'Fr 02.10. ab 22:48 bis So 00:20: „nicht bestanden“, „prüfungsangst“, „blackout in der prüfung“'),
         stufe('name', 0, 'Nachname', 'Wie heißt 4711 mit Nachnamen?',
               ['Wonach sucht 4711, wenn es um die Familie geht?', 'Suchwort: opa'],
               'wort', ['KRAEMER', 'KRAMER'],
               ['Krämer', 'krämer', 'Kraemer', 'Kramer', 'Alex Krämer', 'Kremer', 'Krämmer', 'Familie Krämer', 'KRÄMER'],
               ['Gabi', 'Opa', 'Alex', 'Müller', 'Kraus', 'Volkach', 'Krä'],
               'Krämer (Vorname: Alex)', 'Nur aus Suchanfragen: Ort, Alter, Sorge und Name.', 'krämer',
               'Suche: „opa krämer 80. geburtstag …“, „tante gabi krämer volkach …“',
               'Suchen 25.09. „opa krämer 80. geburtstag“, 28.09. „tante gabi krämer volkach“ (AOL-Muster: Leute mit dem eigenen Nachnamen)'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 4711?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['LINDENWEG', 'LINDEN'],
               ['Lindenweg', 'lindenweg', 'Lindenweg, Volkach', 'im Lindenweg', 'Lindenstraße', 'Lindnweg', 'Lindeweg'],
               ['Volkach', 'Gewerbegebiet', 'Kino', 'Hauptstraße', 'Weg'],
               'Lindenweg', ERK_P2, 'Lindenweg',
               'Standort nachts (z. B. 02:57)', 'Phase 2: Standort jede Nacht 22:41/23:14 und 02:57 → Lindenweg'),
         stufe('hobby', 1, 'Hobby', 'Wohin geht 4711 dienstags und donnerstags am Abend?',
               ['Tag: Di 22.09., Quelle: Standort.', 'Ist dein Nutzerfilter noch an?'],
               'wort', ['KLETTER', 'KLETTERN', 'KLETTERHALLE', 'BOULDER'],
               ['Kletterhalle', 'klettern', 'Klettern gehen', 'in die Kletterhalle Würzburg', 'Bouldern', 'Kleterhalle', 'Kletern'],
               ['Würzburg', 'Sport', 'Fitnessstudio', 'Kino', 'Berufsschule', 'Halle'],
               'Kletterhalle in Würzburg', 'Jetzt weißt du auch, wann 4711 nicht zu Hause ist.', 'Kletterhalle',
               'Standort Di und Do 18:37 bis 20:31',
               'Phase 2: Standort Di/Do 18:37–20:31 Kletterhalle Würzburg; Falle: 8146 klettert auch'),
     ]},
    {'id': 'kim', 'nutzer': '3150', 'person': 'Kim Hofmann, 34, Dettelbach, Pflegekraft, Läuferin', 'quelle1': 'App',
     'baue': fall_kim, 'seed': 3150, 'nachname': 'hofmann',
     'stufen': [
         stufe('ort', 0, 'Ort', 'In welchem Ort läuft 3150 fast immer?',
               ['Filtere nach Nutzer 3150.', 'Lies die Einträge der Lauf-App.'],
               'wort', ['DETTELBACH'],
               ['Dettelbach', 'dettelbach', 'in Dettelbach', 'am Mainufer in Dettelbach', 'Dettelbch', 'Detelbach'],
               ['Kitzingen', 'Volkach', 'Würzburg', 'Mainufer', 'Main'],
               'Dettelbach', 'Die Lauf-App kennt jede Runde, auch den Ort.', 'dettelbach',
               'Lauf-App: „Runde Mainufer Dettelbach …“',
               'Lauf-App Mo/Mi/Fr/Sa „Runde Mainufer Dettelbach“; Falle: 5520 wohnt auch in Dettelbach'),
         stufe('ziel', 0, 'Ziel', 'Für welchen Wettkampf trainiert 3150?',
               ['Gibt es einen Trainingsplan?', 'Suchwort: halb'],
               'wort', ['HALBMARATHON', 'MARATHON'],
               ['Halbmarathon', 'halbmarathon', 'Halbmarathon Würzburg', 'Marathon', 'den Halbmarathon', 'Halbmaraton'],
               ['Würzburg', 'Laufen', '10 km', 'Triathlon', 'Wettkampf'],
               'Halbmarathon in Würzburg', 'Die App weiß, worauf 3150 hinarbeitet.', 'halbmarathon',
               'Lauf-App: „Trainingsplan Halbmarathon …“, „Anmeldung bestätigt …“',
               'Lauf-App 21.09. „Trainingsplan Halbmarathon, Woche 6 von 10“, 24.09. „Anmeldung bestätigt: Halbmarathon Würzburg“'),
         stufe('sorge', 0, 'Gesundheit', 'Was tut 3150 gerade weh?',
               ['Was passiert am Di 29.09.?', 'Suchwort: knie'],
               'wort', ['KNIE'],
               ['Knie', 'das Knie', 'Knieschmerzen', 'knie tut weh', 'Kniee', 'Knie!'],
               ['Rücken', 'Fuß', 'Bein', 'Kopf', 'Arm', 'Kinn'],
               'Knie (Lauf abgebrochen, Schmerztagebuch)', 'Gesundheitsdaten sind besonders privat.', 'knie',
               'Lauf-App 29.09.: „Lauf abgebrochen … Knie tut weh“',
               'Lauf-App 29.09. „Lauf abgebrochen nach 2,1 km. Notiz: Knie tut weh“, Gesundheits-App 30.09./02.10. Schmerztagebuch Knie'),
         stufe('name', 0, 'Nachname', 'Wie heißt 3150 mit Nachnamen?',
               ['Wer schickt 3150 Kudos und Nachrichten?', 'Suchwort: papa'],
               'wort', ['HOFMANN', 'HOFFMANN'],
               ['Hofmann', 'hofmann', 'Hoffmann', 'Kim Hofmann', 'Familie Hofmann', 'Hofman'],
               ['Kim', 'Gerda', 'Papa', 'Weber', 'Huber', 'Hof'],
               'Hofmann (Vorname: Kim)', ERK_NAME, 'hofmann',
               'Lauf-App: „Kudos von Papa Hofmann“, „Nachricht von Tante Gerda Hofmann“',
               'Lauf-App 26.09. „3 Kudos, u. a. von Papa Hofmann“, 27.09. „Nachricht von Tante Gerda Hofmann“'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 3150?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['ROSENGASSE', 'ROSENGASS'],
               ['Rosengasse', 'rosengasse', 'Rosengasse, Dettelbach', 'in der Rosengasse', 'Rosengase', 'Rosen Gasse'],
               ['Dettelbach', 'Mainufer', 'Rosen', 'Gasse', 'Lindenweg'],
               'Rosengasse', ERK_P2, 'Rosengasse',
               'Standort nachts (z. B. 03:05)', 'Phase 2: Standort jede Nacht 22:20 und 03:05 → Rosengasse'),
         stufe('arbeit', 1, 'Arbeit', 'Wo arbeitet 3150 werktags ab 6 Uhr früh?',
               ['Tag: Mo 21.09., Quelle: Standort.', 'Uhrzeit von 6 bis 14.'],
               'wort', ['PFLEGEHEIM', 'PFLEGE', 'ALTENHEIM', 'SENIORENHEIM', 'ALTERSHEIM'],
               ['Pflegeheim', 'im Pflegeheim', 'Pflegeheim Kitzingen', 'Altenheim', 'Pflegheim', 'in der Pflege'],
               ['Kitzingen', 'Krankenhaus', 'Arztpraxis', 'Büro', 'Heim'],
               'Pflegeheim in Kitzingen (Frühschicht)', 'Jetzt weißt du auch, wann 3150 nicht zu Hause ist.', 'Pflegeheim',
               'Standort Mo bis Fr 06:02 bis 13:55', 'Phase 2: Standort Mo–Fr 06:02 und 13:55 Pflegeheim Kitzingen'),
     ]},
    {'id': 'jo', 'nutzer': '5208', 'person': 'Jo Weber, 41, Schwarzach, Bank, Baby 3 Wochen, Hund', 'quelle1': 'Einkauf',
     'baue': fall_jo, 'seed': 5208, 'nachname': 'weber',
     'stufen': [
         stufe('ort', 0, 'Ort', 'In welchem Ort kauft 5208 fast immer ein?',
               ['Filtere nach Nutzer 5208.', 'Lies, wo die Bonuskarte benutzt wird.'],
               'wort', ['SCHWARZACH'],
               ['Schwarzach', 'schwarzach', 'in Schwarzach', 'Schwarzach am Main', 'Schwarzbach', 'Schwarzah'],
               ['Volkach', 'Kitzingen', 'Dettelbach', 'Supermarkt', 'Schwarz'],
               'Schwarzach', 'Die Bonuskarte zeigt, wo jemand einkauft.', 'schwarzach',
               'Bonuskarte: „Supermarkt, Schwarzach …“', 'Bonuskarte fast immer „Supermarkt/Schreibwaren/Blumenladen, Schwarzach“'),
         stufe('familie', 0, 'Familie', 'Wer ist neu in der Familie von 5208?',
               ['Was wird ganz neu gekauft?', 'Suchwort: windeln'],
               'wort', ['BABY', 'SAEUGLING', 'NEUGEBOREN', 'KIND'],
               ['ein Baby', 'Baby', 'baby', 'Säugling', 'ein Kind', 'Neugeborenes', 'Babby'],
               ['Hund', 'Oma', 'Katze', 'Opa', 'Mann', 'Frau'],
               'ein Baby (wenige Wochen alt)', 'Einkäufe verraten, was sich in einer Familie ändert.', 'windeln',
               'Bonuskarte: „Windeln Gr. 1“, „Pre-Milch“, Karte „Zur Geburt“',
               'Bonuskarte ab 21.09. Windeln Gr. 1, Pre-Milch, Fläschchen-Sauger, 24.09. Karte „Zur Geburt“, 29.09. Babybadewanne'),
         stufe('tier', 0, 'Haustier', 'Welches Tier lebt bei 5208?',
               ['Welches Futter wird gekauft?', 'Suchwort: futter'],
               'wort', ['HUND'],
               ['Hund', 'ein Hund', 'hund', 'Hunde', 'einen Hund', 'Hundt'],
               ['Katze', 'Pferd', 'Hamster', 'Vogel', 'Fisch'],
               'ein Hund', 'Auch Haustiere hinterlassen Datenspuren.', 'hundefutter',
               'Bonuskarte: „Hundefutter 12 kg, Kauknochen“', 'Bonuskarte 22.09./30.09. Hundefutter 12 kg, Kauknochen, Kotbeutel'),
         stufe('name', 0, 'Nachname', 'Wie heißt 5208 mit Nachnamen?',
               ['Welche Aufkleber und Karten werden gekauft?', 'Suchwort: aufkleber'],
               'wort', ['WEBER'],
               ['Weber', 'weber', 'Familie Weber', 'Jo Weber', 'Webber', 'Wever'],
               ['Oma', 'Jo', 'Schmitt', 'Bauer', 'Web'],
               'Weber (Vorname: Jo)', ERK_NAME, 'weber',
               'Bonuskarte: „Namensaufkleber ‚Weber‘“, Karte „Für Oma Weber“',
               'Bonuskarte 25.09. „Namensaufkleber ‚Weber‘, 50 Stück“, 01.10. Karte „Für Oma Weber“'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 5208?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['KIRCHBERG'],
               ['Am Kirchberg', 'Kirchberg', 'kirchberg', 'am kirchberg, schwarzach', 'Kirchberk', 'Kirchenberg'],
               ['Schwarzach', 'Kirche', 'Berg', 'Hundewiese', 'Spielplatz'],
               'Am Kirchberg', ERK_P2, 'Am Kirchberg',
               'Standort nachts (z. B. 03:40)', 'Phase 2: Standort jede Nacht 23:30 und 03:40 → Am Kirchberg'),
         stufe('arbeit', 1, 'Arbeit', 'Wo arbeitet 5208 werktags?',
               ['Tag: Mo 21.09., Quelle: Standort.', 'Uhrzeit von 8 bis 16.'],
               'wort', ['BANK', 'BANKFILIALE'],
               ['Bank', 'Bankfiliale', 'in der Bank', 'Bank in Volkach', 'Banck', 'bei der Bank'],
               ['Volkach', 'Supermarkt', 'Büro', 'Schule', 'Spielplatz'],
               'Bankfiliale in Volkach', 'Jetzt weißt du auch, wann 5208 nicht zu Hause ist.', 'Bankfiliale',
               'Standort Mo bis Fr 07:42 bis 16:50', 'Phase 2: Standort Mo–Fr 07:42, 12:30, 16:50 Bankfiliale Volkach'),
     ]},
    {'id': 'sam', 'nutzer': '6620', 'person': 'Sam Lehmann, 16, Gerolzhofen, Realschule, reitet, Samstagsjob', 'quelle1': 'App',
     'baue': fall_sam, 'seed': 6620, 'nachname': 'lehmann',
     'stufen': [
         stufe('ort', 0, 'Ort', 'In welchem Ort macht 6620 die meisten Fotos?',
               ['Filtere nach Nutzer 6620.', 'Die Foto-App speichert den Ort jedes Fotos.'],
               'wort', ['GEROLZHOFEN'],
               ['Gerolzhofen', 'gerolzhofen', 'in Gerolzhofen', 'Gerolzhofn', 'Gerolshofen', 'Geroltzhofen'],
               ['Dingolshausen', 'Volkach', 'Schweinfurt', 'Marktplatz', 'Gerol'],
               'Gerolzhofen', 'Fotos speichern oft heimlich den Ort.', 'gerolzhofen',
               'Foto-App: „Ort: … Gerolzhofen“', 'Foto-App: Pausenhof, Eisdiele, Stadtfest, Badesee – alle Gerolzhofen'),
         stufe('schule', 0, 'Schule', 'Auf welche Schulart geht 6620?',
               ['Wo entstehen vormittags Fotos?', 'Suchwort: schule'],
               'wort', ['REALSCHULE'],
               ['Realschule', 'realschule', 'auf die Realschule', 'Realschule Gerolzhofen', 'Realschul', 'Reahlschule'],
               ['Gymnasium', 'Mittelschule', 'Grundschule', 'Schule', 'Berufsschule'],
               'Realschule in Gerolzhofen (Klasse 10b)', 'Sogar die Klasse steht in den Foto-Orten.', 'realschule',
               'Foto-App: „Pausenhof, Realschule Gerolzhofen“, „Klassenzimmer 10b“',
               'Foto-App 21.09. „Pausenhof, Realschule Gerolzhofen“, 24.09. „Klassenzimmer 10b“, 01.10. „Sporthalle“'),
         stufe('hobby', 0, 'Hobby', 'Was ist das Hobby von 6620?',
               ['Wo entstehen dienstags und freitags viele Fotos?', 'Suchwort: reit'],
               'wort', ['REIT', 'PFERD'],
               ['Reiten', 'reiten', 'Pferde', 'Reitstall', 'Pferd reiten', 'Reitn'],
               ['Fotografieren', 'Schwimmen', 'Eis essen', 'Fußball', 'Tiere'],
               'Reiten (Reitstall in Dingolshausen)', 'Die App erkennt sogar, was auf den Fotos ist.', 'reitstall',
               'Foto-App: „Ort: Reitstall, Dingolshausen“, „Erkannt: Pferd“',
               'Foto-App Di/Fr „Reitstall/Reitplatz, Dingolshausen“, „Erkannt: Pferd“'),
         stufe('name', 0, 'Nachname', 'Wie heißt 6620 mit Nachnamen?',
               ['Mit wem werden Fotos geteilt?', 'Suchwort: familie'],
               'wort', ['LEHMANN', 'LEMANN'],
               ['Lehmann', 'lehmann', 'Lehman', 'Familie Lehmann', 'Sam Lehmann', 'Leman'],
               ['Oma', 'Sam', 'Lehrer', 'Hofmann', 'Lehm'],
               'Lehmann (Vorname: Sam)', ERK_NAME, 'lehmann',
               'Foto-App: „geteilt mit Gruppe ‚Familie Lehmann‘“, „an ‚Oma Lehmann‘“',
               'Foto-App 26.09. „Album geteilt mit Gruppe ‚Familie Lehmann‘“, 30.09. „Geburtstagsfoto an ‚Oma Lehmann‘“'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 6620?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['AHORNWEG', 'AHORN'],
               ['Ahornweg', 'ahornweg', 'im Ahornweg', 'Ahornweg, Gerolzhofen', 'Ahornwek', 'Ahorn Weg'],
               ['Gerolzhofen', 'Reitstall', 'Marktplatz', 'Weg', 'Birkenweg'],
               'Ahornweg', ERK_P2, 'Ahornweg',
               'Standort nachts (z. B. 03:20)', 'Phase 2: Standort jede Nacht 22:45 und 03:20 → Ahornweg'),
         stufe('job', 1, 'Samstags', 'Wo ist 6620 samstags am Vormittag?',
               ['Tag: Sa 26.09., Quelle: Standort.', 'Uhrzeit von 6 bis 12.'],
               'wort', ['BAECKEREI', 'BACKEREI', 'BAECKER', 'BACKER'],
               ['Bäckerei', 'baeckerei', 'Backerei', 'in der Bäckerei', 'beim Bäcker', 'Bäckrei'],
               ['Gerolzhofen', 'Reitstall', 'Schule', 'Supermarkt', 'Markt'],
               'Bäckerei in Gerolzhofen (Samstagsjob)', 'Sogar der Lohn steht in den Daten.', 'Bäckerei',
               'Standort Sa 06:50 bis 12:05', 'Phase 2: Standort Sa 06:50–12:05 Bäckerei Gerolzhofen, Einkauf „Lohn Samstag“'),
     ]},
    {'id': 'robin', 'nutzer': '7734', 'person': 'Robin Schmitt, 24, Kitzingen, Spätschicht Tankstelle, Zöliakie', 'quelle1': 'Einkauf',
     'baue': fall_robin, 'seed': 7734, 'nachname': 'schmitt',
     'stufen': [
         stufe('ort', 0, 'Ort', 'In welchen Ort liefert der Lieferdienst an 7734?',
               ['Filtere nach Nutzer 7734.', 'Lies die Lieferadressen.'],
               'wort', ['KITZINGEN'],
               ['Kitzingen', 'kitzingen', 'nach Kitzingen', 'in Kitzingen', 'Kitzingn', 'Kizingen'],
               ['Würzburg', 'Volkach', 'Dettelbach', 'Lieferdienst', 'Kitz'],
               'Kitzingen', 'Jede Lieferung braucht eine Adresse.', 'kitzingen',
               'Lieferdienst: „Lieferung nach Kitzingen“', 'Lieferdienst fast täglich „Lieferung nach Kitzingen“; Falle: 6612 bestellt in Würzburg'),
         stufe('essen', 0, 'Lieblingsessen', 'Was bestellt 7734 fast immer?',
               ['Zähle, was am häufigsten bestellt wird.', 'Suchwort: pizza'],
               'wort', ['PIZZA', 'PIZZEN'],
               ['Pizza', 'pizza', 'Pizza Margherita', 'immer Pizza', 'Piza', 'Pizzen'],
               ['Burger', 'Salat', 'Pommes', 'Döner', 'Nudeln'],
               'Pizza', 'Gewohnheiten werden zu Daten.', 'pizza',
               'Lieferdienst: 9-mal Pizza in zwei Wochen', 'Lieferdienst: 9 von 11 Bestellungen Pizza'),
         stufe('gesundheit', 0, 'Gesundheit', 'Was darf 7734 nicht essen?',
               ['Was steht bei fast jeder Pizza dabei?', 'Suchwort: notiz'],
               'wort', ['GLUTEN', 'ZOELIAKIE', 'ZOLIAKIE', 'WEIZEN', 'MEHL'],
               ['Gluten', 'gluten', 'nichts mit Gluten', 'Zöliakie', 'Weizen', 'Glutten', 'kein Gluten'],
               ['Pizza', 'Fleisch', 'Zucker', 'Käse', 'Salat'],
               'Gluten (Krankheit Zöliakie)', 'Aus Bestellungen wird eine Krankheit.', 'zöliakie',
               'Lieferdienst: „glutenfrei“, Notiz „Zöliakie!“', 'Lieferdienst „glutenfrei“ bei jeder Pizza, 26.09. Notiz „Bitte wirklich ohne Gluten, Zöliakie!“'),
         stufe('name', 0, 'Nachname', 'Wie heißt 7734 mit Nachnamen?',
               ['Was muss der Fahrer an der Tür wissen?', 'Suchwort: klingel'],
               'wort', ['SCHMITT', 'SCHMIDT', 'SCHMIT'],
               ['Schmitt', 'schmitt', 'Schmidt', 'Robin Schmitt', 'Schmit', 'Familie Schmitt'],
               ['Robin', 'Klingel', 'Weber', 'Schmied', 'Schm'],
               'Schmitt (Vorname: Robin)', ERK_NAME, 'schmitt',
               'Lieferdienst: „Klingel ‚Schmitt‘“', 'Lieferdienst 23.09. und 30.09. „Klingel ‚Schmitt‘“'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 7734?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['MUEHLENWEG', 'MUHLENWEG'],
               ['Mühlenweg', 'muehlenweg', 'Muhlenweg', 'im Mühlenweg', 'Mülenweg', 'Mühlenweg, Kitzingen'],
               ['Kitzingen', 'Tankstelle', 'Mühle', 'Weg', 'Ahornweg'],
               'Mühlenweg', ERK_P2, 'Mühlenweg',
               'Standort nachts (z. B. 03:30)', 'Phase 2: Standort jede Nacht 23:05 und 03:30 → Mühlenweg'),
         stufe('arbeit', 1, 'Arbeit', 'Wo ist 7734 werktags von 14 bis 22 Uhr?',
               ['Tag: Mo 21.09., Quelle: Standort.', 'Uhrzeit von 14 bis 22.'],
               'wort', ['TANKSTELLE'],
               ['Tankstelle', 'tankstelle', 'an der Tankstelle', 'Tanktelle', 'Tankstele', 'Tankstelle Kitzingen'],
               ['Kitzingen', 'Fitnessstudio', 'Pizzeria', 'Supermarkt', 'Tank'],
               'Tankstelle in Kitzingen (Spätschicht)', 'Jetzt weißt du auch, wann 7734 nicht zu Hause ist.', 'Tankstelle',
               'Standort Mo bis Fr 13:52 bis 21:58', 'Phase 2: Standort Mo–Fr 13:52, 18:00, 21:58 Tankstelle Kitzingen'),
     ]},
    {'id': 'luca', 'nutzer': '8892', 'person': 'Luca Bauer, 52, Wiesentheid, Radfahren, Herzrhythmus', 'quelle1': 'App',
     'baue': fall_luca, 'seed': 8892, 'nachname': 'bauer',
     'stufen': [
         stufe('ort', 0, 'Ort', 'Für welchen Ort zeigt die Smartwatch von 8892 das Wetter?',
               ['Filtere nach Nutzer 8892.', 'Suchwort: wetter'],
               'wort', ['WIESENTHEID'],
               ['Wiesentheid', 'wiesentheid', 'in Wiesentheid', 'Wiesentheit', 'Wiesenheid', 'Wisentheid'],
               ['Volkach', 'Würzburg', 'Steigerwald', 'Kitzingen', 'Wiese'],
               'Wiesentheid', 'Die Uhr weiß, wo sie morgens ist.', 'wiesentheid',
               'Smartwatch: „Wetter für Wiesentheid“', 'Smartwatch 06:30 „Wetter für Wiesentheid“ (5x)'),
         stufe('hobby', 0, 'Hobby', 'Welchen Sport macht 8892?',
               ['Welche Trainings zeichnet die Uhr auf?', 'Suchwort: training'],
               'wort', ['RADFAHR', 'FAHRRAD', 'RADELN', 'RADTOUR', 'RENNRAD', 'RAD'],
               ['Radfahren', 'radfahren', 'Fahrrad fahren', 'Rad', 'Radeln', 'Fahradfahren', 'Rennrad'],
               ['Laufen', 'Schwimmen', 'Wandern', 'Klettern', 'Fußball'],
               'Radfahren (bis zu 64 km)', 'Trainingsdaten zeigen Hobby und Fitness.', 'radfahren',
               'Smartwatch: „Training Radfahren, 64 km …“', 'Smartwatch 22.09., 26.09., 27.09. „Training Radfahren“'),
         stufe('gesundheit', 0, 'Gesundheit', 'Was meldet die Smartwatch von 8892 als Problem?',
               ['Gibt es Warnungen?', 'Suchwort: warnung'],
               'wort', ['HERZ', 'PULS', 'RHYTHMUS', 'HERZRHYTHMUS'],
               ['Herz', 'das Herz', 'Herzrhythmus', 'Puls zu hoch', 'Herzprobleme', 'Hertz', 'unregelmäßiger Herzrhythmus'],
               ['Schlaf', 'Wetter', 'Knie', 'Radfahren', 'Lunge'],
               'Herz: unregelmäßiger Herzrhythmus, Puls zu hoch', 'Gesundheitsdaten sind besonders privat.', 'herzrhythmus',
               'Smartwatch: „Warnung: unregelmäßiger Herzrhythmus“',
               'Smartwatch 28.09. und 02.10. „Warnung: unregelmäßiger Herzrhythmus“, 29.09. 03:40 „Puls in Ruhe 112“'),
         stufe('name', 0, 'Nachname', 'Wie heißt 8892 mit Nachnamen?',
               ['Wer schreibt 8892, wer ist Notfallkontakt?', 'Suchwort: nachricht'],
               'wort', ['BAUER'],
               ['Bauer', 'bauer', 'Familie Bauer', 'Luca Bauer', 'Baur', 'Bauerr'],
               ['Tim', 'Eva', 'Notfall', 'Weber', 'Bau'],
               'Bauer (Vorname: Luca)', ERK_NAME, 'bauer',
               'Smartwatch: Nachricht von „Tim Bauer“, Notfallkontakt „Eva Bauer“',
               'Smartwatch 29.09. „Nachricht von ‚Tim Bauer‘“, 30.09. „Notfallkontakt geändert: ‚Eva Bauer‘“'),
         stufe('strasse', 1, 'Straße', 'In welcher Straße schläft 8892?', ['Quelle: Standort.', 'Uhrzeit von 22 bis 6.'],
               'wort', ['BIRKENWEG', 'BIRKEN'],
               ['Birkenweg', 'birkenweg', 'im Birkenweg', 'Birkenweg, Wiesentheid', 'Birkenwek', 'Birken Weg'],
               ['Wiesentheid', 'Büro', 'Weg', 'Ahornweg', 'Radweg'],
               'Birkenweg', ERK_P2, 'Birkenweg',
               'Standort nachts (z. B. 03:15)', 'Phase 2: Standort jede Nacht 22:50 und 03:15 → Birkenweg'),
         stufe('arzt', 1, 'Termin', 'Wo war 8892 am Mittwoch, 30.09., von 9 bis 10:35 Uhr?',
               ['Tag: Mi 30.09., Quelle: Standort.', 'Uhrzeit von 9 bis 11.'],
               'wort', ['KARDIO', 'ARZT', 'PRAXIS', 'HERZARZT', 'AERZTIN'],
               ['Arzt', 'beim Arzt', 'Kardiologische Praxis', 'Herzarzt', 'Praxis in Würzburg', 'Kardiologe', 'Artzt'],
               ['Würzburg', 'Apotheke', 'Büro', 'Krankenhaus', 'Radweg'],
               'Kardiologische Praxis (Herzarzt) in Würzburg', 'Ein Standort reicht, um auf eine Krankheit zu schließen.',
               'Kardiologische Praxis', 'Standort Mi 30.09. 09:00 bis 10:35',
               'Phase 2: Standort Mi 30.09. 09:00 und 10:35 Kardiologische Praxis Würzburg, danach Apotheke'),
     ]},
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
        grenze = 2 if len(k) >= 8 else (1 if len(k) >= 4 else 0)
        if grenze and any(abs(len(x) - len(k)) <= grenze and abstand(x, k) <= grenze for x in w):
            return True
    return False


QUELLE_TEXT = {'Suche': 'Suchanfragen', 'App': 'App-Daten', 'Einkauf': 'Einkäufe'}


def akte(f):
    nu = f['nutzer']
    return {
        'titel': f'Fall {nu}',
        'absender': 'Agentur NEBEL · Ausbildungsfall',
        'briefing': ['Datenpaket aus unserer Gegend. „Alles anonym, nur Nummern.“',
                     f'Finde heraus, wer Nutzer {nu} ist.'],
        'hinweis_fiktion': 'Personen und Daten sind erfunden.',
        'abschluss': {
            'titel': 'Akte geschlossen. War das in Ordnung?',
            'text': ['Aus einer Nummer ist ein Mensch geworden: '
                     + ', '.join(s['steckbrief'] for s in f['stufen']) + '.'],
            'fragen': [f'Was würde {nu} nicht wollen, dass Fremde es wissen?',
                       'Wer könnte so ein Profil kaufen wollen?'],
        },
    }


def phasen(f):
    return [{'id': 'eine', 'titel': 'Phase 1', 'quellen': [f['quelle1']],
             'text': f'Du siehst nur {QUELLE_TEXT[f["quelle1"]]}.'},
            {'id': 'alle', 'titel': 'Phase 2', 'quellen': QUELLEN,
             'text': 'Neu freigeschaltet: alle Datenarten.'}]


def baue(f):
    s = Sammler()
    f['baue'](s)
    rauschen(s, f['seed'])
    if f.get('extra'):
        f['extra'](s)
    s.e.sort(key=lambda e: (e[1], e[2], e[0]))
    wt = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    return [{'nutzer': nu, 'datum': d.isoformat(), 'tag': wt[d.weekday()], 'zeit': z, 'quelle': q, 'eintrag': t}
            for nu, d, z, q, t in s.e]


def pruefe(f, eintraege, ph, ak):
    nu = f['nutzer']
    fehler = []
    if nu in ANDERE:
        fehler.append(f"{f['id']}: Nutzernummer {nu} gehört schon einem Rausch-Nutzer")
    for s in f['stufen']:
        erlaubt = ph[s['phase']]['quellen']
        if not any(s['belegwort'].lower() in e['eintrag'].lower() for e in eintraege
                   if e['nutzer'] == nu and e['quelle'] in erlaubt):
            fehler.append(f"{f['id']}/{s['id']}: in Phase {s['phase'] + 1} nicht lösbar (Beleg „{s['belegwort']}“ fehlt)")
        fehler += [f"{f['id']}/{s['id']}: '{x}' abgelehnt" for x in s['richtig'] if passt(x, s) is not True]
        fehler += [f"{f['id']}/{s['id']}: '{x}' angenommen" for x in s['falsch'] if passt(x, s) is True]
    fremd = [e for e in eintraege if e['nutzer'] != nu and f['nachname'] in e['eintrag'].lower()]
    if fremd:
        fehler.append(f"{f['id']}: Nachname auch bei anderen Nutzern: {fremd[:2]}")
    sichtbar_text = json.dumps([ak, ph, [{k: s[k] for k in ('frage', 'tipps', 'erkenntnis', 'anzeige')}
                                         for s in f['stufen']]], ensure_ascii=False)
    for verboten in ('2006', 'AOL', 'Reporter', 'echte', 'wirklich'):
        if verboten in sichtbar_text:
            fehler.append(f"{f['id']}: Hinweis auf den echten Fall: {verboten}")
    return fehler


def uebersicht(faelle):
    punkte = '\n'.join(
        f'    <li><a href="{f["id"]}/">\n      <strong>Fall {f["nutzer"]}</strong>\n'
        f'      <span>Informatik 6 · Wer steckt hinter Nutzer {f["nutzer"]}?</span>\n    </a></li>' for f in faelle)
    alt = (WEB / 'index.html').read_text(encoding='utf-8')
    a, b = alt.index('<ul class="d-wahl">'), alt.index('</ul>')
    return alt[:a] + '<ul class="d-wahl">\n' + punkte + '\n  ' + alt[b:]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--loesung')
    ap.add_argument('--auszug-dir')
    a = ap.parse_args()

    assert len({f['nutzer'] for f in FAELLE}) == len(FAELLE) and len({f['id'] for f in FAELLE}) == len(FAELLE)
    vorlage = VORLAGE.read_text(encoding='utf-8')
    alle_fehler, ausgaben = [], []
    loesung = ['# Datenspuren — Lösungsschlüssel aller Fälle (Lehrkraft, nicht für die Klasse)', '',
               'Erzeugt von `tools/datenspuren/build_datensatz.py` im Website-Repo; nie von Hand pflegen.',
               'Bauplan AOL 2006 (im Spiel nicht erwähnt): Phase 1 zeigt je Fall nur eine Datenart (Stufen 1–4, '
               'Stufe 4 = Nachname), Phase 2 alle Datenarten (Stufen 5–6).',
               'Angenommen wird, wenn ein Schlüsselwort in der Eingabe steckt: Groß/klein, Umlaute, Satzzeichen egal, '
               'ganze Sätze erlaubt, kleine Tippfehler erlaubt, Zahlen exakt, höchstens 5 Wörter.', '']
    pruefungen = 0
    for f in FAELLE:
        eintraege = baue(f)
        ph, ak = phasen(f), akte(f)
        alle_fehler += pruefe(f, eintraege, ph, ak)
        pruefungen += sum(len(s['richtig']) + len(s['falsch']) for s in f['stufen'])
        stufen_web = [{**{k: v for k, v in s.items()
                          if k not in ('schluessel', 'richtig', 'falsch', 'beleg', 'beleg_lehrkraft', 'belegwort')},
                       'k': base64.b64encode(json.dumps(s['schluessel']).encode()).decode()} for s in f['stufen']]
        daten = {'version': 3, 'akte': ak, 'phasen': ph, 'max_woerter': MAX_WOERTER, 'stufen': stufen_web,
                 'eintraege': eintraege}
        fall_kopf = {'id': f['id'], 'titel': ak['titel'], 'nutzer': f['nutzer'], 'url': BASIS_URL + f['id'] + '/',
                     'kurz_url': 'weitergehts.online/unterricht/datenspuren/' + f['id']}
        ausgaben.append((f, daten, fall_kopf, ak, ph, eintraege))
        n_ziel = sum(1 for e in eintraege if e['nutzer'] == f['nutzer'])
        print(f'{f["id"]:6} Fall {f["nutzer"]}: {len(eintraege)} Einträge, davon Nutzer {f["nutzer"]}: {n_ziel}, '
              f'Phase 1 = {f["quelle1"]}')
        loesung += [f'## Fall {f["nutzer"]} · {f["person"]} · Phase 1: {QUELLE_TEXT[f["quelle1"]]} · {fall_kopf["url"]}', '',
                    '| Stufe | Phase | Frage | Lösung | Schlüssel | Beispiele, die angenommen werden | Belege im Datensatz |',
                    '|---|---|---|---|---|---|---|']
        for i, s in enumerate(f['stufen'], 1):
            loesung.append(f"| {i} | {s['phase'] + 1} | {s['frage']} | **{s['anzeige']}** | {' · '.join(s['schluessel'])} | "
                           f"{' · '.join(s['richtig'][:5])} | {s['beleg_lehrkraft']} |")
        loesung.append('')
    # Erst schreiben, wenn ALLE Fälle die Selbstprüfung bestehen
    assert not alle_fehler, '\n'.join(alle_fehler)
    for f, daten, fall_kopf, ak, ph, eintraege in ausgaben:
        ordner = WEB / f['id']
        ordner.mkdir(exist_ok=True)
        (ordner / 'data.json').write_text(json.dumps(daten, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
        if f['id'] != 'alex':
            seite = (vorlage.replace('<title>Fall 4711 · Datenspuren</title>', f'<title>Fall {f["nutzer"]} · Datenspuren</title>')
                     .replace('<h1 id="d-titel">Fall 4711</h1>', f'<h1 id="d-titel">Fall {f["nutzer"]}</h1>'))
            (ordner / 'index.html').write_text(seite, encoding='utf-8')
        if a.auszug_dir:
            Path(a.auszug_dir).mkdir(parents=True, exist_ok=True)
            (Path(a.auszug_dir) / f'{f["id"]}_auszug.json').write_text(
                json.dumps({'fall': fall_kopf, 'akte': ak, 'phasen': ph, 'stufen': f['stufen'], 'eintraege': eintraege},
                           ensure_ascii=False, indent=1), encoding='utf-8')
    (WEB / 'index.html').write_text(uebersicht(FAELLE), encoding='utf-8')
    print(f'Selbstprüfung: {len(FAELLE)} Fälle, {pruefungen} Prüfeingaben korrekt, alle Stufen in ihrer Phase lösbar, '
          'Nachnamen eindeutig, kein Hinweis auf den echten Fall')
    if a.loesung:
        Path(a.loesung).write_text('\n'.join(loesung) + '\n', encoding='utf-8')
        print('Lösung:', a.loesung)
    if a.auszug_dir:
        print('Auszüge:', a.auszug_dir)
    return 0


if __name__ == '__main__':
    sys.exit(main())
