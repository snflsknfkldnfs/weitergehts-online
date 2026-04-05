#!/usr/bin/env node
/**
 * validate-feedback-schema.js — Phase IV Wave 0
 *
 * Validiert alle Aufgaben-feedback-Felder in
 *   - docs/agents/artefakte/produktion/** /aufgaben/*.json
 *   - escape-games/* /data.json
 *
 * Akzeptierte Formen:
 *   A) Legacy-String (Bestand Mappe 1-4) — wird von
 *      EscapeEngine.normalizeFeedback zur Laufzeit gewrappt. OK mit Hinweis.
 *   B) Schema-Objekt nach VERTRAG_FEEDBACK_SCHEMA V2:
 *        { typ, text, ebene }
 *      - typ  ∈ {bestaetigung, korrektur, hinweis, verknuepfung}
 *      - text String, max 400 Zeichen
 *      - ebene ∈ {wissen, verstaendnis, anwendung, analyse}
 *   C) Array aus A/B/C (rekursiv).
 *
 * Exit: 0 bei Erfolg, 1 bei Fehler.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const TYP_ALLOWED   = ['bestaetigung', 'korrektur', 'hinweis', 'verknuepfung'];
const EBENE_ALLOWED = ['wissen', 'verstaendnis', 'anwendung', 'analyse'];
const TEXT_MAX      = 400;

let errors   = 0;
let legacy   = 0;
let schemaOk = 0;

function walkDir(dir, matcher, out) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walkDir(p, matcher, out);
    } else if (matcher(p)) {
      out.push(p);
    }
  }
  return out;
}

function validateFeedback(raw, context) {
  if (raw == null) return;
  if (typeof raw === 'string') {
    legacy++;
    return;
  }
  if (Array.isArray(raw)) {
    raw.forEach((item, i) => validateFeedback(item, `${context}[${i}]`));
    return;
  }
  if (typeof raw !== 'object') {
    console.error(`FEHLER ${context}: feedback hat unerwarteten Typ ${typeof raw}`);
    errors++;
    return;
  }
  // Schema-Objekt
  if (!TYP_ALLOWED.includes(raw.typ)) {
    console.error(`FEHLER ${context}: typ="${raw.typ}" nicht in ${TYP_ALLOWED.join(',')}`);
    errors++;
  }
  if (typeof raw.text !== 'string') {
    console.error(`FEHLER ${context}: text fehlt oder ist kein String`);
    errors++;
  } else if (raw.text.length > TEXT_MAX) {
    console.error(`FEHLER ${context}: text ist ${raw.text.length} Zeichen (max ${TEXT_MAX})`);
    errors++;
  }
  if (!EBENE_ALLOWED.includes(raw.ebene)) {
    console.error(`FEHLER ${context}: ebene="${raw.ebene}" nicht in ${EBENE_ALLOWED.join(',')}`);
    errors++;
  }
  if (errors === 0) schemaOk++;
}

function validateAufgabe(aufgabe, file) {
  const id = aufgabe.id || '?';
  if (aufgabe.feedback !== undefined) {
    validateFeedback(aufgabe.feedback, `${file}::${id}.feedback`);
  }
}

function validateDataJson(file) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`FEHLER ${file}: JSON parse error — ${e.message}`);
    errors++;
    return;
  }
  if (!data.mappen) return;
  for (const mappe of data.mappen) {
    if (!mappe.aufgaben) continue;
    for (const auf of mappe.aufgaben) validateAufgabe(auf, file);
  }
}

function validateAufgabenProduktion(file) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error(`FEHLER ${file}: JSON parse error — ${e.message}`);
    errors++;
    return;
  }
  // Pro Datei ist entweder eine einzelne Aufgabe oder ein Array.
  if (Array.isArray(data)) {
    data.forEach((a) => validateAufgabe(a, file));
  } else if (data && typeof data === 'object') {
    validateAufgabe(data, file);
  }
}

function main() {
  const cwd = process.cwd();

  // data.json (Schueler-Bundles)
  const dataJsons = walkDir(path.join(cwd, 'escape-games'), (p) => p.endsWith('/data.json') && !p.includes('/_archive/'), []);
  dataJsons.forEach(validateDataJson);

  // Produktions-Aufgaben-JSONs
  const prodRoot = path.join(cwd, 'docs/agents/artefakte/produktion');
  const prodJsons = walkDir(prodRoot, (p) => p.includes('/aufgaben/') && p.endsWith('.json'), []);
  prodJsons.forEach(validateAufgabenProduktion);

  console.log(`[validate-feedback-schema] schema-ok=${schemaOk}  legacy-strings=${legacy}  errors=${errors}`);
  if (legacy > 0) {
    console.log('[validate-feedback-schema] Hinweis: Legacy-Strings werden von EscapeEngine.normalizeFeedback gewrappt — okay fuer Bestand, V2-Schema fuer Neubau.');
  }
  process.exit(errors === 0 ? 0 : 1);
}

main();
