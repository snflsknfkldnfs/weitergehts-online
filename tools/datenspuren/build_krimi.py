#!/usr/bin/env python3
"""Datenspuren-Krimi „E-Bike“ — falscher Verdacht aus Daten (Informatik 6, Inf6b 13.11.2026).

Drei Seiten mit DERSELBEN Geschichte, unterschiedlich schwer (Tipps, Rauschen, Falschspuren):
  unterricht/datenspuren/ebike-leicht/ · ebike-mittel/ · ebike-schwer/   (Seitencode: datenspuren.js, unverändert)

Was wirklich geschah (nur Lehrkraft; Di 29.09.2026, alles erfunden, Ortsnamen echt):
  21:36  Besitzerin 3390 am Busbahnhof Volkach, 21:40 E-Bike abgeschlossen, 21:44 Bus nach Würzburg.
  21:38  Täter 8471 (Schicht im Supermarkt bis 21:30) am Busbahnhof, danach Handy aus (kein Standort bis 22:31).
  21:42  E-Bike-App: Bewegung erkannt. 21:51 E-Bike in Sommerach. 21:56 8471 zahlt an der Tankstelle Sommerach.
  21:42  6143 (Pendler, Training in Kitzingen) sitzt noch im Bus bei Dettelbach, 21:52 am Busbahnhof Volkach.
  21:53–22:03  Schloss-App von 6143: dreimal „Öffnen fehlgeschlagen“ (Akku des Schlosses schwach); Suchen nach
         „fahrradschloss öffnen ohne schlüssel“. 22:11 geöffnet, 22:12 los, 22:19 zu Hause in Astheim — mit SEINEM Rad.
  Phase 1 (Daten der Polizei: Standort, Suche) führt Schritt für Schritt auf 6143. Phase 2 (dazu Einkauf, App) kippt es.

Jede belastende Spur von 6143 hat eine erklärende Gegenspur; main() prüft das (GEGENSPUREN), dazu Zählung im
Zeitfenster, Eindeutigkeit des Zahlers in Sommerach, Lücke im Standort von 8471, Lösbarkeit jeder Stufe in ihrer Phase
und alle Prüfeingaben (Python hier, Seiten-Code über test_seite.js).

Aufruf:  python3 tools/datenspuren/build_krimi.py [--loesung PFAD.md] [--auszug-dir ORDNER]
"""
import argparse
import base64
import json
import random
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_datensatz import (ANDERE, MAX_WOERTER, ROOT, Sammler, TAGE, VORLAGE, WEB, passt, rauschen, tag)  # noqa: E402

TATTAG = 8            # Di 29.09.2026
BB = 'Busbahnhof, Volkach'
FENSTER = ('21:40', '23:50')
BASIS_URL = 'https://weitergehts.online/unterricht/datenspuren/'

ZEITUNG = {
    'titel': 'Mainschleifen-Bote (erfunden)',
    'schlagzeile': 'Grünes E-Bike am Busbahnhof gestohlen',
    'text': ('Volkach. Am Dienstagabend, 29. September, hat eine Frau ihr grünes E-Bike um 21:40 Uhr am Busbahnhof '
             'abgeschlossen und ist um 21:44 Uhr mit dem Bus nach Würzburg gefahren. Als sie um 23:50 Uhr zurückkam, '
             'war das Rad weg. Ein Zeuge sah gegen 22:15 Uhr einen Jugendlichen mit einem Fahrrad über die Mainbrücke '
             'Richtung Astheim fahren. Die Farbe konnte er im Dunkeln nicht erkennen. Die Polizei hat die Standorte und '
             'Suchanfragen aller Handys aus der Gegend angefordert, nur Nummern, keine Namen.'),
}


# ══ Die Geschichte ══════════════════════════════════════════════════════════════════════════════════════════════
def besitzerin(s):          # 3390, Altstadt Volkach, fährt E-Bike
    nu, heim = '3390', 'Altstadt, Volkach'
    for n in range(TAGE):
        s.add(nu, n, '07:15', 'Standort', heim)
        s.add(nu, n, '22:50' if n != TATTAG else '23:58', 'Standort', heim)
        if tag(n).weekday() < 5 and n != TATTAG:
            s.add(nu, n, '07:42', 'Standort', 'Weingut, Nordheim')
            s.add(nu, n, '07:43', 'App', 'E-Bike-App: Fahrt 6,4 km, abgeschlossen in Nordheim')
            s.add(nu, n, '17:10', 'App', 'E-Bike-App: Fahrt 6,5 km, abgeschlossen in der Altstadt Volkach')
    s.add(nu, TATTAG, '07:42', 'Standort', 'Weingut, Nordheim')
    s.add(nu, TATTAG, '17:10', 'App', 'E-Bike-App: Fahrt 6,5 km, abgeschlossen in der Altstadt Volkach')
    s.add(nu, TATTAG, '19:05', 'Suche', 'kino würzburg heute abend')
    s.add(nu, TATTAG, '21:36', 'Standort', BB)
    s.add(nu, TATTAG, '21:40', 'App', 'E-Bike-App: abgeschlossen am Busbahnhof Volkach')
    s.add(nu, TATTAG, '21:42', 'App', 'E-Bike-App: Bewegung erkannt am Busbahnhof Volkach (Benachrichtigung aus)')
    s.add(nu, TATTAG, '21:44', 'Standort', BB)
    s.add(nu, TATTAG, '21:51', 'App', 'E-Bike-App: Standort Sommerach')
    s.add(nu, TATTAG, '21:58', 'App', 'E-Bike-App: Verbindung getrennt (Akku entfernt)')
    s.add(nu, TATTAG, '22:31', 'Standort', 'Kino, Würzburg')
    s.add(nu, TATTAG, '23:50', 'Standort', BB)
    s.add(nu, TATTAG, '23:52', 'Suche', 'fahrrad gestohlen was tun polizei')
    s.add(nu, TATTAG + 1, '07:30', 'Suche', 'e bike gestohlen versicherung')


def verdaechtiger(s):       # 6143, 15, Ortsteil Astheim, pendelt mit Bus nach Kitzingen, Rad bleibt am Busbahnhof
    nu, heim = '6143', 'Ortsteil Astheim, Volkach'
    for n in range(TAGE):
        wt = tag(n).weekday()
        s.add(nu, n, '06:40', 'Standort', heim)
        s.add(nu, n, '22:40' if wt != 4 else '23:30', 'Standort', heim)
        if wt >= 5:
            continue
        s.add(nu, n, '06:52', 'Standort', BB)
        s.add(nu, n, '06:53', 'App', 'Schloss-App: abgeschlossen')
        s.add(nu, n, '07:35', 'Standort', 'Schulzentrum, Kitzingen')
        if wt in (1, 3):    # Di, Do: Training, abends zurück
            s.add(nu, n, '17:30', 'Standort', 'Sporthalle, Kitzingen')
            s.add(nu, n, '21:30', 'Standort', 'Bushaltestelle, Kitzingen')
            s.add(nu, n, '21:42', 'Standort', 'Bus, Dettelbach')
            s.add(nu, n, '21:52', 'Standort', BB)
            if n != TATTAG:
                s.add(nu, n, '21:53', 'App', 'Schloss-App: geöffnet')
                s.add(nu, n, '21:54', 'Standort', BB)
                s.add(nu, n, '22:01', 'Standort', heim)
        else:
            s.add(nu, n, '16:04', 'Standort', BB)
            s.add(nu, n, '16:05', 'App', 'Schloss-App: geöffnet')
            s.add(nu, n, '16:12', 'Standort', heim)
    # Vorzeichen (Phase 1 sichtbar, für Genaue): der Akku des Schlosses ist schwach
    s.add(nu, 7, '20:14', 'Suche', 'schloss app akku schwach was tun')
    s.add(nu, 7, '20:16', 'App', 'Schloss-App: Akku 8 %')
    # Der Abend
    s.add(nu, TATTAG, '21:53', 'App', 'Schloss-App: Öffnen fehlgeschlagen')
    s.add(nu, TATTAG, '21:55', 'Suche', 'fahrradschloss öffnen ohne schlüssel')
    s.add(nu, TATTAG, '21:57', 'App', 'Schloss-App: Öffnen fehlgeschlagen')
    s.add(nu, TATTAG, '22:01', 'Suche', 'schloss app bluetooth geht nicht')
    s.add(nu, TATTAG, '22:03', 'App', 'Schloss-App: Öffnen fehlgeschlagen')
    s.add(nu, TATTAG, '22:06', 'Suche', 'handy taschenlampe an')
    s.add(nu, TATTAG, '22:11', 'App', 'Schloss-App: geöffnet (Akku 2 %)')
    s.add(nu, TATTAG, '22:12', 'Standort', BB)
    s.add(nu, TATTAG, '22:19', 'Standort', heim)
    s.add(nu, TATTAG + 1, '07:02', 'Suche', 'fahrradladen volkach öffnungszeiten')
    s.add(nu, TATTAG + 1, '16:25', 'Einkauf', 'Fahrradladen, Volkach: Akku für Fahrradschloss, 12,90 €')
    s.add(nu, TATTAG + 1, '16:27', 'App', 'Schloss-App: Akku 100 %')
    for n, z, q, t in [(2, '19:40', 'Suche', 'handball abwehr übungen'), (4, '18:05', 'App', 'Spiele-App: 1 h 05 min'),
                       (5, '15:10', 'Suche', 'fifa neue karten'), (10, '20:30', 'App', 'Video-App: 40 min'),
                       (12, '14:22', 'Einkauf', 'Kiosk, Volkach: Eistee, Chips')]:
        s.add(nu, n, z, q, t)


def taeter(s):              # 8471, Sommerach, Spätschicht im Supermarkt Volkach, fährt sonst mit dem Bus 21:44 heim
    nu, heim = '8471', 'Ortsmitte, Sommerach'
    for n in range(TAGE):
        wt = tag(n).weekday()
        s.add(nu, n, '09:10', 'Standort', heim)
        if wt < 6:
            s.add(nu, n, '13:20', 'Standort', 'Supermarkt, Volkach')
            s.add(nu, n, '21:38', 'Standort', BB)
            if n != TATTAG:
                s.add(nu, n, '21:58', 'Standort', 'Bushaltestelle, Sommerach')
        if n != TATTAG:
            s.add(nu, n, '23:40', 'Standort', heim)
    s.add(nu, TATTAG, '21:56', 'Einkauf', 'Tankstelle, Sommerach: Energydrink, Chips, 4,80 €')
    s.add(nu, TATTAG, '22:31', 'Standort', heim)
    s.add(nu, TATTAG + 1, '00:14', 'Suche', 'e bike akku ohne schlüssel entfernen')
    s.add(nu, TATTAG + 1, '17:40', 'Einkauf', 'Baumarkt, Kitzingen: Ladegerät für E-Bike-Akku 36 V, 29,99 €')
    s.add(nu, TATTAG + 2, '20:12', 'Suche', 'e bike gebraucht verkaufen schnell')
    for n, z, q, t in [(1, '22:30', 'App', 'Spiele-App: 2 h 10 min'), (3, '12:40', 'Suche', 'führerschein kosten bayern'),
                       (6, '15:00', 'Einkauf', 'Supermarkt, Volkach: Tiefkühlpizza, Cola'),
                       (11, '23:10', 'App', 'Video-App: 1 h 30 min')]:
        s.add(nu, n, z, q, t)


def spaetschicht(s):        # 2207: Pflegekraft, Spätdienst Kitzingen, kommt 23:05 an, geht zu Fuß (in jeder Stufe)
    nu, heim = '2207', 'Weinstraße, Volkach'
    for n in range(TAGE):
        s.add(nu, n, '10:30', 'Standort', heim)
        if tag(n).weekday() in (0, 1, 2, 5):
            s.add(nu, n, '13:40', 'Standort', 'Klinik, Kitzingen')
            s.add(nu, n, '23:05', 'Standort', BB)
            s.add(nu, n, '23:31', 'Standort', heim)
    s.add(nu, TATTAG, '23:07', 'Suche', 'taxi volkach nachts')
    s.add(nu, TATTAG, '23:12', 'Standort', BB)
    s.add(nu, TATTAG, '23:20', 'Einkauf', 'Tankstelle, Volkach: Brezel, Wasser, 3,10 €')
    s.add(nu, 3, '16:00', 'Suche', 'dienstplan app')


# ══ Falschspuren je Stufe (präzise: jede sieht nach etwas aus und scheitert an genau einem Detail) ══════════════
def fs_1188(s):   # sucht ein gebrauchtes Rad am Busbahnhof — aber VOR dem Zeitfenster und fährt 21:35 weg
    s.add('1188', TATTAG, '21:20', 'Standort', BB)
    s.add('1188', TATTAG, '21:30', 'Suche', 'fahrrad gebraucht kaufen volkach')
    s.add('1188', TATTAG, '21:35', 'Standort', BB)
    s.add('1188', TATTAG, '21:52', 'Standort', 'Bushaltestelle, Gerolzhofen')
    for n in range(TAGE):
        s.add('1188', n, '22:30', 'Standort', 'Marktplatz, Gerolzhofen')


def fs_1166(s):   # tankt in Sommerach — aber erst 22:20, als das E-Bike schon ohne Akku war
    s.add('1166', TATTAG, '22:20', 'Einkauf', 'Tankstelle, Sommerach: Super E10, 48,30 €')
    s.add('1166', TATTAG, '22:18', 'Standort', 'Tankstelle, Sommerach')
    for n in range(TAGE):
        s.add('1166', n, '07:20', 'Standort', 'Gewerbegebiet, Kitzingen')
        s.add('1166', n, '19:30', 'Standort', 'Neubaugebiet, Sommerach')


def fs_7720(s):   # sucht auch nach einem Fahrradschloss — aber eine Woche vorher, Textsuche allein reicht nicht
    s.add('7720', 0, '21:12', 'Suche', 'fahrradschloss zahlencode vergessen')
    for n in (3, 10):
        s.add('7720', n, '21:50', 'Standort', BB)
        s.add('7720', n, '22:05', 'Standort', 'Hauptstraße, Volkach')
    for n in range(TAGE):
        s.add('7720', n, '08:00', 'Standort', 'Hauptstraße, Volkach')


def fs_4419(s):   # im Zeitfenster am Busbahnhof (Zählung 4!) — aber 22:40, das E-Bike ist da schon in Sommerach
    s.add('4419', TATTAG, '22:40', 'Standort', BB)
    s.add('4419', TATTAG, '22:41', 'Suche', 'letzter bus würzburg')
    s.add('4419', TATTAG, '22:44', 'Standort', BB)
    s.add('4419', TATTAG, '23:15', 'Standort', 'Busbahnhof, Würzburg')
    for n in range(TAGE):
        s.add('4419', n, '09:00', 'Standort', 'Studentenwohnheim, Würzburg')


def fs_9024(s):   # zahlt in Sommerach — aber 21:49, BEVOR das E-Bike dort ist (21:51), und ist zu Hause
    s.add('9024', TATTAG, '21:49', 'Einkauf', 'Getränkeautomat, Sommerach: Wasser, 1,50 €')
    for n in range(TAGE):
        s.add('9024', n, '21:45', 'Standort', 'Ortsmitte, Sommerach')
        s.add('9024', n, '07:10', 'Standort', 'Weinberg, Sommerach')


def fs_5520(s):   # zahlt um 21:57 an einer Tankstelle — aber in Dettelbach (Rausch-Nutzer 5520)
    s.add('5520', TATTAG, '21:57', 'Einkauf', 'Tankstelle, Dettelbach: Eistee, 1,90 €')


# ══ Rauschen: Pendler am Busbahnhof (früh und nachmittags jeden Tag, abends an ANDEREN Tagen) ═══════════════════
ZIELE = ['Schulzentrum, Kitzingen', 'Berufsschule, Kitzingen', 'Gewerbegebiet, Kitzingen', 'Büro, Würzburg',
         'Gymnasium, Gerolzhofen', 'Klinik, Kitzingen', 'Universität, Würzburg']
HEIME = ['Hauptstraße, Volkach', 'Ortsteil Astheim, Volkach', 'Weinstraße, Volkach', 'Altstadt, Volkach',
         'Ortsteil Fahr, Volkach', 'Neubaugebiet, Volkach', 'Ortsmitte, Nordheim', 'Ortsmitte, Escherndorf']
SUCHEN = ['busfahrplan volkach kitzingen', 'wetter volkach morgen', 'hausaufgaben englisch simple past',
          'pizza volkach lieferung', 'regenjacke günstig', 'wann fährt der letzte bus', 'handy akku schnell leer',
          'fahrrad reifen flicken', 'konzert würzburg tickets', 'mathe prozentrechnung', 'weinfest volkach termine',
          'fußball ergebnisse heute', 'bewerbung praktikum', 'e bike oder normales fahrrad']
KAEUFE = ['Bäckerei, Volkach: Brezel, 0,95 €', 'Kiosk, Volkach: Kaugummi, Eistee', 'Supermarkt, Volkach: Brot, Käse',
          'Drogerie, Kitzingen: Duschgel', 'Tankstelle, Volkach: Kaffee, 2,20 €', 'Fahrradladen, Volkach: Schlauch, 6,50 €']
APPS = ['Musik-App: 35 min', 'Video-App: 1 h 10 min', 'Spiele-App: 45 min', 'Bus-App: Fahrplan geöffnet',
        'Wetter-App: 2 Aufrufe', 'Nachrichten-App: 4 neue Nachrichten', 'Schloss-App: geöffnet']


def pendler(s, anzahl, seed, belegt):
    rnd = random.Random(seed)
    nummern = []
    while len(nummern) < anzahl:
        x = str(rnd.randint(1000, 9899))
        if x not in belegt and x not in nummern:
            nummern.append(x)
    for nu in nummern:
        heim, ziel = rnd.choice(HEIME), rnd.choice(ZIELE)
        abend_tag = rnd.choice([n for n in range(TAGE) if n != TATTAG])
        for n in range(TAGE):
            wt = tag(n).weekday()
            s.add(nu, n, f'06:{rnd.randint(30, 50):02d}', 'Standort', heim)
            if wt < 5:
                s.add(nu, n, f'06:{rnd.randint(51, 59):02d}', 'Standort', BB)
                s.add(nu, n, f'07:{rnd.randint(30, 59):02d}', 'Standort', ziel)
                s.add(nu, n, f'{rnd.randint(15, 17)}:{rnd.randint(0, 59):02d}', 'Standort', BB)
            if n == abend_tag:   # abends am Busbahnhof — an einem anderen Tag als dem Tattag
                s.add(nu, n, f'{rnd.randint(21, 23)}:{rnd.randint(0, 59):02d}', 'Standort', BB)
            if rnd.random() < 0.5:
                s.add(nu, n, f'{rnd.randint(8, 22):02d}:{rnd.randint(0, 59):02d}', 'Suche', rnd.choice(SUCHEN))
            if rnd.random() < 0.3:
                s.add(nu, n, f'{rnd.randint(9, 19):02d}:{rnd.randint(0, 59):02d}', 'Einkauf', rnd.choice(KAEUFE))
            if rnd.random() < 0.4:
                s.add(nu, n, f'{rnd.randint(14, 22):02d}:{rnd.randint(0, 59):02d}', 'App', rnd.choice(APPS))
            s.add(nu, n, f'{rnd.randint(22, 23)}:{rnd.randint(0, 59):02d}', 'Standort', heim)
    return nummern


# ══ Stufen ══════════════════════════════════════════════════════════════════════════════════════════════════════
def stufe(sid, phase, steckbrief, frage, tipps, modus, schluessel, richtig, falsch, anzeige, erkenntnis, belege,
          beleg_lehrkraft, material=None):
    d = dict(id=sid, phase=phase, steckbrief=steckbrief, frage=frage, tipps=tipps, modus=modus, schluessel=schluessel,
             richtig=richtig, falsch=falsch, anzeige=anzeige, erkenntnis=erkenntnis, belege=belege,
             beleg_lehrkraft=beleg_lehrkraft)
    if material:
        d['material'] = material
    return d


def stufen(v):
    n_fenster = v['n_fenster']
    t = v['tipps']   # 2 = alle Tipps, 1 = nur der erste, 0 = keine
    T = (lambda *xs: list(xs[:t]))
    return [
        stufe('fenster', 0, 'Zeitfenster',
              'Wie viele Handys waren in der Tatzeit am Busbahnhof? Die Tatzeit steht in der Zeitung.',
              T('Tag: Di 29.09., Uhrzeit von 21 bis 23, Suchwort: Busbahnhof.',
                'Lies die Minuten genau: Wer war vor 21:40 schon wieder weg?'),
              'zahl', [str(n_fenster)], [str(n_fenster), f'{n_fenster} Handys', f'es waren {n_fenster}'],
              [x for x in ('2', '3', '4', '5', '6') if x != str(n_fenster)],
              f'{n_fenster} Handys zwischen 21:40 und 23:50',
              'Wer kurz vor 21:40 da war, fällt durch dein Raster. Merk dir das.',
              [('Standort', 'Busbahnhof')], f'Im Fenster 21:40–23:50: {v["im_fenster"]}; knapp davor: {v["davor"]}',
              material='zeitung'),
        stufe('besitzerin', 0, 'Besitzerin',
              'Eine der Nummern gehört der Besitzerin. Welche?',
              T('Die Zeitung sagt, wohin sie um 21:44 gefahren ist.', 'Wer ist um 22:31 in Würzburg?'),
              'zahl', ['3390'], ['3390', 'Nummer 3390', 'Nutzer 3390', 'die 3390'],
              ['6143', '2207', '8471', '4419', '339', '33900'],
              '3390 (Bus nach Würzburg, um 23:52 Suche „fahrrad gestohlen“)',
              'Eine Nummer weniger. Bleiben die anderen.',
              [('Standort', 'Würzburg')], '3390: 21:44 Busbahnhof, 22:31 Kino Würzburg, 23:52 „fahrrad gestohlen was tun polizei“',
              material='zeitung'),
        stufe('suche', 0, 'Suche am Tatort',
              'Wonach hat jemand gesucht, während er in der Tatzeit am Busbahnhof stand?',
              T('Quelle: Suche, Di 29.09., ab 21 Uhr.', 'Es geht um etwas, das man an einem Fahrrad hat.'),
              'wort', ['SCHLOSS'],
              ['Fahrradschloss öffnen', 'fahrradschloss öffnen ohne schlüssel', 'Schloss knacken', 'ein Schloss',
               'Fahrradschloss', 'schlos öffnen'],
              ['Taxi', 'Bus', 'letzter Bus', 'Fahrrad kaufen', 'Kino', 'Fahrrad gestohlen'],
              '6143 um 21:55: „fahrradschloss öffnen ohne schlüssel“',
              'Wer ein Schloss ohne Schlüssel öffnen will … verdächtig.',
              [('Suche', 'fahrradschloss öffnen')],
              '6143 21:55 „fahrradschloss öffnen ohne schlüssel“, 22:01 „schloss app bluetooth geht nicht“ (Gegenspur für Genaue); '
              'Falle: 1188 21:30 „fahrrad gebraucht kaufen“ (vor dem Fenster), 7720 „fahrradschloss zahlencode“ (Mo 21.09.)'),
        stufe('heimweg', 0, 'Heimweg',
              'Wie ist 6143 nach Hause gekommen?',
              T('Vergleiche die Uhrzeiten 22:12 und 22:19. Zum Ortsteil Astheim sind es gut 2 km.',
                'Lies die Zeitungsmeldung noch einmal.'),
              'wort', ['FAHRRAD', 'RAD', 'EBIKE', 'BIKE'],
              ['mit dem Fahrrad', 'Fahrrad', 'mit dem Rad', 'E-Bike', 'mit dem E-Bike', 'Rad', 'Farrad'],
              ['zu Fuß', 'Bus', 'mit dem Auto', 'Taxi', 'gelaufen', 'Roller'],
              '22:12 los, 22:19 in Astheim: 2 km in 7 Minuten, mit einem Rad; der Zeuge sah um 22:15 einen Jugendlichen auf einem Rad',
              'Zu Fuß schafft das niemand. Und der Zeuge hat ein Rad gesehen.',
              [('Standort', 'Astheim')], '6143: 22:12 Busbahnhof, 22:19 Ortsteil Astheim; Zeitung: Zeuge 22:15 Mainbrücke',
              material='zeitung'),
        stufe('verdacht', 0, 'Verdacht',
              'Wen verdächtigt die Polizei nach diesen Daten?',
              T('Wer war da, hat nach dem Schloss gesucht und ist mit einem Rad weg?'),
              'zahl', ['6143'], ['6143', 'Nutzer 6143', 'die Nummer 6143'],
              ['8471', '2207', '3390', '1188', '4419', '614'],
              '6143',
              'Am Tatort, Schloss ohne Schlüssel, schnell weg mit einem Rad. Die Polizei ist sich sicher. Du auch?',
              [('Standort', 'Busbahnhof')], 'Ergebnis von Phase 1 (falsch, aber aus den Daten der Polizei gut begründet)'),
        stufe('schloss', 1, 'Neue Spur 1',
              'Neue Daten. Wie oft ging das Schloss von 6143 am Dienstagabend nicht auf?',
              T('Quelle: App, Nutzer 6143, Di 29.09.', 'Schau auch auf Montagabend: Was war mit dem Akku?'),
              'zahl', ['3', 'DREI', 'DREIMAL'], ['3', 'dreimal', '3 mal', 'drei'], ['1', '2', '4', '5', '13'],
              '3× „Öffnen fehlgeschlagen“, 22:11 geöffnet (Akku 2 %): sein eigenes Schloss',
              'Er hat mit seinem eigenen Schloss gekämpft. Jeden Dienstag und Donnerstag holt er hier sein Rad.',
              [('App', 'fehlgeschlagen')], '6143 App 21:53, 21:57, 22:03 fehlgeschlagen, 22:11 geöffnet; Mo 28.09. Akku 8 %; Mi 30.09. Akku gekauft'),
        stufe('wende', 1, 'Neue Spur 2',
              'Wann bewegte sich das E-Bike zum ersten Mal? Wo war 6143 in diesem Moment?',
              T('Such in den App-Daten nach „E-Bike“.', 'Vergleiche die Uhrzeit mit dem Standort von 6143.'),
              'wort', ['DETTELBACH'], ['Dettelbach', 'im Bus bei Dettelbach', 'in Dettelbach', 'Detelbach', 'im Bus, Dettelbach'],
              ['Busbahnhof', 'Volkach', 'Astheim', 'Kitzingen', 'Sommerach', 'im Bus'],
              '21:42 bewegt sich das E-Bike, 6143 sitzt da im Bus bei Dettelbach',
              'Er kann es nicht gewesen sein. Der Verdacht ist falsch.',
              [('App', 'Bewegung erkannt'), ('Standort', 'Dettelbach')],
              '3390 App 21:42 „Bewegung erkannt“; 6143 Standort 21:42 „Bus, Dettelbach“, 21:52 Busbahnhof'),
        stufe('wohin', 1, 'Neue Spur 3',
              'Wohin ist das E-Bike gefahren?',
              T('Quelle: App, Nutzer 3390.'),
              'wort', ['SOMMERACH'], ['Sommerach', 'nach Sommerach', 'Somerach', 'in Sommerach'],
              ['Würzburg', 'Volkach', 'Astheim', 'Dettelbach', 'Nordheim'],
              'Sommerach, 21:51; um 21:58 wird der Akku entfernt',
              'Jetzt weißt du, wo du suchen musst.',
              [('App', 'Sommerach')], '3390 App 21:51 Standort Sommerach, 21:58 Verbindung getrennt'),
        stufe('taeter', 1, 'Neue Spur 4',
              'Wer war in Sommerach, als das E-Bike ankam, obwohl sein Handy dort keinen Standort zeigt?',
              T('Quelle: Einkauf. Wer hat kurz nach 21:51 in Sommerach bezahlt?',
                'Prüf seinen Standort: Wo war er um 21:38, wann taucht er wieder auf?'),
              'zahl', ['8471'], ['8471', 'Nutzer 8471', 'die 8471'], v['taeter_falsch'],
              '8471: 21:38 am Busbahnhof, dann Handy aus, 21:56 Kartenzahlung Tankstelle Sommerach',
              'Kein Standort ist auch eine Spur. Die Karte hat ihn verraten.',
              [('Einkauf', 'Sommerach')],
              '8471: Standort 21:38 Busbahnhof (sonst 21:58 im Bus, am Di nicht), Lücke bis 22:31; Einkauf 21:56 Tankstelle Sommerach; '
              'Mi 00:14 „e bike akku ohne schlüssel entfernen“, Mi Ladegerät 36 V, Do „e bike gebraucht verkaufen“; '
              'Fallen: 9024 21:49 (vor dem E-Bike), 1166 22:20 (zu spät), 5520 21:57 (Dettelbach)'),
    ]


VARIANTEN = [
    {'id': 'leicht', 'titel': 'Fall E-Bike · leicht', 'seed': 2909, 'tipps': 2, 'pendler': 6,
     'falsch': [], 'n_fenster': 3, 'im_fenster': '6143, 2207, 3390', 'davor': '8471 (21:38)',
     'taeter_falsch': ['6143', '3390', '2207', '847', '84710']},
    {'id': 'mittel', 'titel': 'Fall E-Bike · mittel', 'seed': 2910, 'tipps': 1, 'pendler': 10,
     'falsch': [fs_1188, fs_1166, fs_7720], 'n_fenster': 3, 'im_fenster': '6143, 2207, 3390',
     'davor': '8471 (21:38), 1188 (21:20–21:35)', 'taeter_falsch': ['6143', '1166', '3390', '2207', '847']},
    {'id': 'schwer', 'titel': 'Fall E-Bike · schwer', 'seed': 2911, 'tipps': 0, 'pendler': 14,
     'falsch': [fs_1188, fs_1166, fs_7720, fs_4419, fs_9024, fs_5520], 'n_fenster': 4,
     'im_fenster': '6143, 2207, 3390, 4419', 'davor': '8471 (21:38), 1188 (21:20–21:35)',
     'taeter_falsch': ['6143', '1166', '9024', '5520', '3390', '4419']},
]
PHASEN = [
    {'id': 'eine', 'titel': 'Daten der Polizei', 'quellen': ['Standort', 'Suche'],
     'text': 'Du siehst Standorte und Suchanfragen, so wie die Polizei.'},
    {'id': 'alle', 'titel': 'Neue Daten', 'quellen': ['Standort', 'Suche', 'Einkauf', 'App'],
     'text': 'Neu dazu: Einkäufe und App-Daten. Prüf, ob der Verdacht hält.'},
]
AKTE = {
    'absender': 'Ermittlungsakte · Fahrraddiebstahl Volkach',
    'briefing': ['Am Dienstag, 29.09., ist am Busbahnhof Volkach ein grünes E-Bike verschwunden.',
                 'Du ermittelst mit den Daten der Polizei: nur Nummern, keine Namen. Lies zuerst die Zeitungsmeldung.'],
    'hinweis_fiktion': 'Personen, Daten und Zeitung sind erfunden. Die Orte gibt es.',
    'abschluss': {
        'titel': 'Fall gelöst. Und 6143?',
        'text': ['21:42 fuhr 8471 mit dem E-Bike los, Handy aus. 6143 saß da noch im Bus und kämpfte ab 21:53 mit '
                 'dem leeren Akku seines eigenen Schlosses. Um 22:12 fuhr er mit seinem eigenen Rad heim.',
                 'Die Polizei hatte richtige Daten und lag trotzdem falsch.'],
        'fragen': ['Warum lag die Polizei falsch? Nenne die Daten, die ihr fehlten.',
                   'Zeigt ein Standort, wo ein Mensch war, oder wo sein Handy war?',
                   'Welche Spur von 6143 hatte eine harmlose Erklärung?'],
    },
}

# Jede belastende Spur von 6143 (Phase 1) → eine erklärende Gegenspur (Phase 2 oder Muster), alle müssen existieren
GEGENSPUREN = [
    (('6143', TATTAG, 'Suche', 'fahrradschloss öffnen ohne schlüssel'), ('6143', TATTAG, 'App', 'Öffnen fehlgeschlagen')),
    (('6143', TATTAG, 'Standort', 'Ortsteil Astheim'), ('6143', 3, 'Standort', 'Ortsteil Astheim')),       # immer so heim
    (('6143', TATTAG + 1, 'Suche', 'fahrradladen'), ('6143', TATTAG + 1, 'Einkauf', 'Akku für Fahrradschloss')),
    (('6143', TATTAG, 'Standort', BB), ('6143', TATTAG, 'Standort', 'Bus, Dettelbach')),
]


def minuten(z):
    h, m = z.split(':')
    return int(h) * 60 + int(m)


def baue(v):
    s = Sammler()
    besitzerin(s)
    verdaechtiger(s)
    taeter(s)
    spaetschicht(s)
    for f in v['falsch']:
        f(s)
    rauschen(s, v['seed'])
    belegt = set(ANDERE) | {'3390', '6143', '8471', '2207', '1188', '1166', '7720', '4419', '9024'}
    pendler(s, v['pendler'], v['seed'], belegt)
    s.e.sort(key=lambda e: (e[1], e[2], e[0]))
    wt = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    return [{'nutzer': nu, 'datum': d.isoformat(), 'tag': wt[d.weekday()], 'zeit': z, 'quelle': q, 'eintrag': t}
            for nu, d, z, q, t in s.e]


def pruefe(v, ein, st):
    f = []
    d0 = tag(TATTAG).isoformat()
    am_tag = [e for e in ein if e['datum'] == d0]
    lo, hi = minuten(FENSTER[0]), minuten(FENSTER[1])
    im = sorted({e['nutzer'] for e in am_tag if e['quelle'] == 'Standort' and e['eintrag'] == BB
                 and lo <= minuten(e['zeit']) <= hi})
    if len(im) != v['n_fenster'] or ', '.join(im) != ', '.join(sorted(v['im_fenster'].split(', '))):
        f.append(f'{v["id"]}: im Fenster {im}, erwartet {v["im_fenster"]}')
    if '8471' in im:
        f.append(f'{v["id"]}: 8471 darf nicht im Fenster stehen')
    # Phase 1: nur 6143 sucht am Tatabend nach einem Schloss
    schloss = {e['nutzer'] for e in am_tag if e['quelle'] == 'Suche' and 'schloss' in e['eintrag']
               and minuten(e['zeit']) >= minuten('21:00')}
    if schloss != {'6143'}:
        f.append(f'{v["id"]}: Schloss-Suche am Tatabend bei {schloss}')
    # Sommerach: genau ein Zahler zwischen 21:51 und 22:10
    zahler = {e['nutzer'] for e in am_tag if e['quelle'] == 'Einkauf' and 'Sommerach' in e['eintrag']
              and minuten('21:51') <= minuten(e['zeit']) <= minuten('22:10')}
    if zahler != {'8471'}:
        f.append(f'{v["id"]}: Zahler in Sommerach 21:51–22:10: {zahler}')
    # 8471 ohne Standort zwischen 21:39 und 22:30
    luecke = [e for e in am_tag if e['nutzer'] == '8471' and e['quelle'] == 'Standort'
              and minuten('21:39') <= minuten(e['zeit']) <= minuten('22:30')]
    if luecke:
        f.append(f'{v["id"]}: 8471 hat Standort in der Lücke: {luecke}')
    # 6143 bei Bewegung des E-Bikes woanders
    if not any(e['nutzer'] == '6143' and e['zeit'] == '21:42' and 'Dettelbach' in e['eintrag'] for e in am_tag):
        f.append(f'{v["id"]}: 6143 um 21:42 nicht in Dettelbach')
    # keine fremde Bewegung des E-Bikes, kein anderes Handy auf der Mainbrücke
    for (a, b) in GEGENSPUREN:
        for nu, n, q, txt in (a, b):
            if not any(e['nutzer'] == nu and e['datum'] == tag(n).isoformat() and e['quelle'] == q and txt in e['eintrag']
                       for e in ein):
                f.append(f'{v["id"]}: Spur fehlt: {nu} {tag(n)} {q} „{txt}“')
    # Stufen: Belege in ihrer Phase sichtbar, Prüfeingaben
    zt = json.dumps(ZEITUNG, ensure_ascii=False).lower()
    for s in st:
        erlaubt = PHASEN[s['phase']]['quellen']
        for q, wort in s['belege']:
            if not any(e['quelle'] == q and q in erlaubt and wort.lower() in e['eintrag'].lower() for e in ein):
                f.append(f'{v["id"]}/{s["id"]}: Beleg „{wort}“ ({q}) in Phase {s["phase"] + 1} nicht sichtbar')
        f += [f"{v['id']}/{s['id']}: '{x}' abgelehnt" for x in s['richtig'] if passt(x, s) is not True]
        f += [f"{v['id']}/{s['id']}: '{x}' angenommen" for x in s['falsch'] if passt(x, s) is True]
    if '21:44' not in zt or '23:50' not in zt or '21:40' not in zt:
        f.append('Zeitung: Zeitfenster fehlt')
    return f


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--loesung')
    ap.add_argument('--auszug-dir')
    a = ap.parse_args()
    vorlage = VORLAGE.read_text(encoding='utf-8')
    versionen = json.loads((ROOT / 'assets' / 'versions.json').read_text(encoding='utf-8'))['assets']
    for datei in ('datenspuren.js', 'datenspuren.css', 'material.css'):
        vorlage = re.sub(re.escape(datei) + r'\?v=[0-9.]+', f'{datei}?v={versionen[datei]}', vorlage)
    alt = 'Steckbrief · {{TITEL}}'
    assert alt in vorlage, 'Vorlage geändert: Steckbrief-Überschrift fehlt'
    vorlage = vorlage.replace(alt, 'Ermittlungsakte')
    fehler, aus = [], []
    loesung = ['# Datenspuren-Krimi „E-Bike“ — Lösung (Lehrkraft, nicht für die Klasse)', '',
               'Erzeugt von `tools/datenspuren/build_krimi.py` im Website-Repo; nie von Hand pflegen.', '',
               '**Was wirklich geschah (Di 29.09.):** 21:40 E-Bike von 3390 am Busbahnhof abgeschlossen, 21:44 Bus nach Würzburg. '
               '21:38 ist 8471 am Busbahnhof, dann Handy aus; 21:42 fährt das E-Bike los, 21:51 Sommerach, 21:56 zahlt 8471 an der '
               'Tankstelle Sommerach, 21:58 Akku entfernt. 6143 sitzt um 21:42 im Bus bei Dettelbach, kommt 21:52 an, sein '
               'Schloss-Akku ist leer (3× fehlgeschlagen), 22:11 auf, 22:12 mit seinem Rad heim (22:19 Astheim).', '']
    for v in VARIANTEN:
        ein = baue(v)
        st = stufen(v)
        fehler += pruefe(v, ein, st)
        ak = {'titel': v['titel'], **AKTE}
        web = [{**{k: x for k, x in s.items() if k not in ('schluessel', 'richtig', 'falsch', 'belege', 'beleg_lehrkraft', 'anzeige')},
                'k': base64.b64encode(json.dumps(s['schluessel']).encode()).decode(),
                'a': base64.b64encode(s['anzeige'].encode('utf-8')).decode()} for s in st]
        daten = {'version': 3, 'akte': ak, 'phasen': PHASEN, 'max_woerter': MAX_WOERTER, 'stufen': web,
                 'zeitung': ZEITUNG, 'eintraege': ein}
        od = 'ebike-' + v['id']
        kopf = {'id': od, 'ordner': od, 'titel': v['titel'], 'nutzer': od, 'url': BASIS_URL + od + '/',
                'kurz_url': 'weitergehts.online/unterricht/datenspuren/' + od}
        aus.append((v, daten, kopf, ak, st, ein))
        print(f'{od}: {len(ein)} Einträge, {len({e["nutzer"] for e in ein})} Nummern, {len(st)} Stufen, Tipps {v["tipps"]}')
        loesung += [f'## {v["titel"]} · {kopf["url"]}', '', '| Stufe | Phase | Frage | Lösung | Belege und Fallen |', '|---|---|---|---|---|']
        for i, s in enumerate(st, 1):
            loesung.append(f"| {i} | {s['phase'] + 1} | {s['frage']} | **{s['anzeige']}** | {s['beleg_lehrkraft']} |")
        loesung.append('')
    assert not fehler, '\n'.join(fehler)
    for v, daten, kopf, ak, st, ein in aus:
        ordner = WEB / kopf['ordner']
        ordner.mkdir(exist_ok=True)
        (ordner / 'data.json').write_text(json.dumps(daten, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
        (ordner / 'index.html').write_text(vorlage.replace('{{TITEL}}', ak['titel']), encoding='utf-8')
        if a.auszug_dir:
            Path(a.auszug_dir).mkdir(parents=True, exist_ok=True)
            (Path(a.auszug_dir) / f'{kopf["ordner"]}_auszug.json').write_text(
                json.dumps({'fall': kopf, 'akte': ak, 'phasen': PHASEN,
                            'stufen': [{k: x for k, x in s.items() if k != 'belege'} for s in st],
                            'zeitung': ZEITUNG, 'eintraege': ein}, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'Selbstprüfung: {len(VARIANTEN)} Stufen-Seiten, Zeitfenster, Schloss-Suche, Zahler Sommerach, Lücke 8471, '
          f'{len(GEGENSPUREN)} Gegenspuren, alle Prüfeingaben korrekt')
    if a.loesung:
        Path(a.loesung).write_text('\n'.join(loesung) + '\n', encoding='utf-8')
        print('Lösung:', a.loesung)
    if a.auszug_dir:
        r = subprocess.run(['node', str(ROOT / 'tools' / 'datenspuren' / 'test_seite.js'), a.auszug_dir])
        return r.returncode
    return 0


if __name__ == '__main__':
    sys.exit(main())
