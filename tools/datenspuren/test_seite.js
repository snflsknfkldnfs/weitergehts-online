#!/usr/bin/env node
/* Datenspuren — prüft den Antwort-Code der SEITE (unterricht/datenspuren/datenspuren.js) gegen die Prüfeingaben
 * aller Fälle. Gegenstück zur Selbstprüfung in build_datensatz.py (die prüft die Python-Kopie der Logik).
 * Beide müssen gleich entscheiden; build_datensatz.py ruft dieses Skript am Ende auf.
 *
 * Aufruf: node tools/datenspuren/test_seite.js <ordner mit <nummer>_auszug.json>
 * Exit 1, wenn eine richtige Eingabe abgelehnt, eine falsche angenommen oder ein Lösungstext falsch entschlüsselt wird.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const WEB = path.join(ROOT, 'unterricht', 'datenspuren');
const ausz = process.argv[2];
if (!ausz) { console.error('Ordner mit *_auszug.json fehlt'); process.exit(2); }

const src = fs.readFileSync(path.join(WEB, 'datenspuren.js'), 'utf8');
const code = src.slice(src.indexOf('function woerter'), src.indexOf('/* ── Tabelle ── */'));
const atob = (s) => Buffer.from(s, 'base64').toString('binary');
const { passt, anzeige } = new Function('daten', 'atob', 'TextDecoder', code + '; return { passt, anzeige };')(
  { max_woerter: 5 }, atob, TextDecoder);

let n = 0;
const fehler = [];
for (const datei of fs.readdirSync(ausz).filter((f) => f.endsWith('_auszug.json')).sort()) {
  const roh = JSON.parse(fs.readFileSync(path.join(ausz, datei), 'utf8'));
  const nu = roh.fall.nutzer;
  const web = JSON.parse(fs.readFileSync(path.join(WEB, nu, 'data.json'), 'utf8')).stufen;
  roh.stufen.forEach((s, i) => {
    n++;
    if (anzeige(web[i]) !== s.anzeige) fehler.push(`${nu}/${s.id}: Lösungstext „${anzeige(web[i])}“`);
    s.richtig.forEach((x) => { n++; if (passt(x, web[i]) !== true) fehler.push(`${nu}/${s.id}: „${x}“ abgelehnt`); });
    s.falsch.forEach((x) => { n++; if (passt(x, web[i]) === true) fehler.push(`${nu}/${s.id}: „${x}“ angenommen`); });
  });
}
console.log(`Seiten-Code: ${n} Prüfungen, ${fehler.length} Fehler`);
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1); }
