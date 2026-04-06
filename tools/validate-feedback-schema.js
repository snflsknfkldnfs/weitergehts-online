#!/usr/bin/env node
/**
 * validate-feedback-schema.js — Phase IV Wave 1 AU-2a
 *
 * Validiert feedback-Felder in data.json gemaess VERTRAG_FEEDBACK_SCHEMA V2.
 *
 * Nutzung:
 *   node tools/validate-feedback-schema.js escape-games/gpg-erster-weltkrieg-ursachen/data.json
 *   node tools/validate-feedback-schema.js "escape-games/** /data.json"
 *
 * Akzeptierte Form (ab AU-2a):
 *   - Objekt { typ, text, ebene }
 *   - Array davon (Multi-Option-Typen)
 *   - null/undefined → WARN (toleriert)
 *   - String → FAIL (Legacy nicht mehr zulaessig seit AU-2a)
 *
 * Konsistenz-Checks pro Aufgabentyp (VERTRAG_FEEDBACK_SCHEMA §3):
 *   mc/zuordnung/reihenfolge: Array, Laenge = Anzahl Optionen/Paare/Positionen
 *   freitext: Array 2-3 Eintraege
 *   vergleich: Array 2-3 Eintraege, ebene fix "anwendung"
 *   begruendung: Array genau 3 Eintraege, ebene fix "analyse"
 *   lueckentext: Array (Sammelfeedback oder pro Luecke)
 *
 * Exit 0 = PASS, Exit 1 = FAIL.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { glob } = (() => {
  try { return { glob: require('glob').sync || require('glob').globSync }; } catch (_) { return { glob: null }; }
})();

const TYP_ALLOWED   = ['bestaetigung', 'korrektur', 'hinweis', 'verknuepfung'];
const EBENE_ALLOWED = ['wissen', 'verstaendnis', 'anwendung', 'analyse'];
const TEXT_MAX      = 400;

const fails = [];
const warns = [];
let passCount = 0;

function fail(ctx, msg) { fails.push(ctx + ': ' + msg); }
function warn(ctx, msg) { warns.push(ctx + ': ' + msg); }

function validateObj(obj, ctx) {
  let ok = true;
  if (!TYP_ALLOWED.includes(obj.typ)) {
    fail(ctx, 'typ="' + obj.typ + '" nicht in [' + TYP_ALLOWED.join(', ') + ']');
    ok = false;
  }
  if (typeof obj.text !== 'string' || obj.text.length === 0) {
    fail(ctx, 'text fehlt oder leer');
    ok = false;
  } else if (obj.text.length > TEXT_MAX) {
    fail(ctx, 'text ' + obj.text.length + ' Zeichen (max ' + TEXT_MAX + ')');
    ok = false;
  }
  if (!EBENE_ALLOWED.includes(obj.ebene)) {
    fail(ctx, 'ebene="' + obj.ebene + '" nicht in [' + EBENE_ALLOWED.join(', ') + ']');
    ok = false;
  }
  return ok;
}

function validateFeedback(raw, ctx) {
  if (raw == null) {
    warn(ctx, 'feedback ist null/undefined');
    return;
  }
  if (typeof raw === 'string') {
    fail(ctx, 'Legacy-String feedback nicht zulaessig seit AU-2a');
    return;
  }
  if (Array.isArray(raw)) {
    if (raw.length === 0) {
      fail(ctx, 'feedback Array ist leer');
      return;
    }
    let allOk = true;
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] == null || typeof raw[i] !== 'object' || Array.isArray(raw[i])) {
        fail(ctx + '[' + i + ']', 'Eintrag ist kein Objekt');
        allOk = false;
      } else {
        if (!validateObj(raw[i], ctx + '[' + i + ']')) allOk = false;
      }
    }
    if (allOk) passCount++;
    return;
  }
  if (typeof raw === 'object') {
    if (validateObj(raw, ctx)) passCount++;
    return;
  }
  fail(ctx, 'unerwarteter Typ: ' + typeof raw);
}

function countOptions(aufgabe) {
  if (aufgabe.optionen && Array.isArray(aufgabe.optionen)) return aufgabe.optionen.length;
  if (aufgabe.paare && Array.isArray(aufgabe.paare)) return aufgabe.paare.length;
  if (aufgabe.positionen && Array.isArray(aufgabe.positionen)) return aufgabe.positionen.length;
  if (aufgabe.loesung && Array.isArray(aufgabe.loesung)) return aufgabe.loesung.length;
  return null;
}

function validateTypKonsistenz(aufgabe, ctx) {
  var typ = aufgabe.typ;
  var fb = aufgabe.feedback;
  if (fb == null || typeof fb === 'string') return; // already handled

  if (typ === 'multiple-choice' || typ === 'mc' || typ === 'zuordnung' || typ === 'reihenfolge') {
    if (!Array.isArray(fb)) {
      fail(ctx, 'typ=' + typ + ' erwartet Array-Feedback');
      return;
    }
    var expected = countOptions(aufgabe);
    if (expected !== null && fb.length !== expected) {
      warn(ctx, 'typ=' + typ + ': Array-Laenge ' + fb.length + ', erwartet ' + expected + ' (Optionen/Paare/Positionen)');
    }
  }

  if (typ === 'freitext') {
    if (!Array.isArray(fb)) {
      fail(ctx, 'typ=freitext erwartet Array-Feedback');
      return;
    }
    if (fb.length < 2 || fb.length > 3) {
      warn(ctx, 'typ=freitext: Array-Laenge ' + fb.length + ', erwartet 2-3');
    }
  }

  if (typ === 'vergleich') {
    if (!Array.isArray(fb)) {
      fail(ctx, 'typ=vergleich erwartet Array-Feedback');
      return;
    }
    if (fb.length < 2 || fb.length > 3) {
      warn(ctx, 'typ=vergleich: Array-Laenge ' + fb.length + ', erwartet 2-3');
    }
    for (var i = 0; i < fb.length; i++) {
      if (fb[i] && fb[i].ebene && fb[i].ebene !== 'anwendung') {
        warn(ctx + '[' + i + ']', 'typ=vergleich: ebene="' + fb[i].ebene + '", erwartet "anwendung"');
      }
    }
  }

  if (typ === 'begruendung') {
    if (!Array.isArray(fb)) {
      fail(ctx, 'typ=begruendung erwartet Array-Feedback');
      return;
    }
    if (fb.length !== 3) {
      warn(ctx, 'typ=begruendung: Array-Laenge ' + fb.length + ', erwartet genau 3');
    }
    for (var j = 0; j < fb.length; j++) {
      if (fb[j] && fb[j].ebene && fb[j].ebene !== 'analyse') {
        warn(ctx + '[' + j + ']', 'typ=begruendung: ebene="' + fb[j].ebene + '", erwartet "analyse"');
      }
    }
  }

  if (typ === 'lueckentext') {
    if (!Array.isArray(fb)) {
      fail(ctx, 'typ=lueckentext erwartet Array-Feedback');
    }
  }
}

function resolveFiles(args) {
  var files = [];
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg.includes('*')) {
      if (glob) {
        files = files.concat(glob(arg));
      } else {
        // Fallback: simple glob for **/data.json
        var base = arg.split('*')[0] || '.';
        walkDir(base, function(p) { return p.endsWith('/data.json'); }, files);
      }
    } else if (fs.existsSync(arg)) {
      files.push(arg);
    } else {
      console.error('Datei nicht gefunden: ' + arg);
      process.exit(1);
    }
  }
  return files;
}

function walkDir(dir, matcher, out) {
  if (!fs.existsSync(dir)) return out;
  var entries = fs.readdirSync(dir);
  for (var i = 0; i < entries.length; i++) {
    var p = path.join(dir, entries[i]);
    var st = fs.statSync(p);
    if (st.isDirectory()) walkDir(p, matcher, out);
    else if (matcher(p)) out.push(p);
  }
  return out;
}

function main() {
  var args = process.argv.slice(2);

  if (args.length === 0) {
    // Default: alle data.json im Repo
    var cwd = process.cwd();
    args = ['escape-games/**/data.json'];
  }

  var files = resolveFiles(args);
  if (files.length === 0) {
    console.error('Keine Dateien gefunden.');
    process.exit(1);
  }

  var aufgabenTotal = 0;

  for (var f = 0; f < files.length; f++) {
    var file = files[f];
    var data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      fail(file, 'JSON parse error: ' + e.message);
      continue;
    }

    if (!data.mappen) { warn(file, 'kein mappen-Feld'); continue; }

    for (var m = 0; m < data.mappen.length; m++) {
      var mappe = data.mappen[m];
      if (!mappe.aufgaben) continue;
      for (var a = 0; a < mappe.aufgaben.length; a++) {
        var auf = mappe.aufgaben[a];
        var id = auf.id || (mappe.id || 'mappe-' + m) + '/aufgabe-' + a;
        var ctx = file + '::' + id;
        aufgabenTotal++;
        validateFeedback(auf.feedback, ctx);
        validateTypKonsistenz(auf, ctx);
      }
    }
  }

  // Report
  console.log('');
  console.log('[validate-feedback-schema] Dateien: ' + files.length + '  Aufgaben: ' + aufgabenTotal + '  PASS: ' + passCount + '  WARN: ' + warns.length + '  FAIL: ' + fails.length);

  if (warns.length > 0) {
    console.log('');
    console.log('--- WARN ---');
    for (var w = 0; w < warns.length; w++) console.log('  WARN ' + warns[w]);
  }

  if (fails.length > 0) {
    console.log('');
    console.log('--- FAIL ---');
    for (var e = 0; e < fails.length; e++) console.log('  FAIL ' + fails[e]);
    console.log('');
    console.log('ERGEBNIS: FAIL (' + fails.length + ' Fehler)');
    process.exit(1);
  }

  console.log('');
  console.log('ERGEBNIS: PASS');
  process.exit(0);
}

main();
