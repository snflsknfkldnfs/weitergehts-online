# EVIDENZ-BUNDLE RA7 — Datenschutz

**Zweck:** Kuratierte Datei-Liste fuer RA7-Auditor mit Such-Hinweisen und vorab recherchierten Schluessel-Fundstellen. Keine Interpretation, nur Navigation.

---

## A. Code — Storage und Datenerhebung

### A.1 `assets/js/core.js` (~120 Zeilen relevant)
- **Z. 20-86** `storage` Modul: localStorage-Wrapper (get/set/remove/clear).
- **Z. 74** Prefix-Konvention: nur Keys mit `escape-` werden verwaltet.
- **Befund vorab:** localStorage wird plaintext geschrieben. Keine Verschluesselung. Keine Quota-Limits ausser JS-Exception bei Voll.

### A.2 `assets/js/escape-engine.js` (~4000 Zeilen, relevante Ausschnitte)
- **Z. 46** `storageKey: null, // localStorage-Schluessel (escape-[thema])` — Schluessel-Schema.
- **Z. 71** `_state.storageKey = 'escape-' + thema;` — Schluessel-Konstruktion.
- **Z. 155-186** `saveProgress(mappeId, aufgabeIndex, solved)`: schreibt `{mappen: {...}, letzteAktivitaet: ISO-Timestamp}`.
- **Z. 179** `allProgress.letzteAktivitaet = new Date().toISOString();` — Timestamp in jedem Write.
- **Z. 229-239** `_saveFehlversuch`: schreibt `fehlversuche`-Counter.
- **Z. 263-301** `_saveAntwortState` / `_loadAntwortState`: speichert typ-spezifischen State (kann User-Eingaben enthalten).
- **Z. 343-345** `resetProgress()`: entfernt storageKey komplett.
- **Z. 371, 432-495** Weitere Progress-Writes (Tipp-Nutzung, Loesungswort-Position v3.5h).

### A.3 Persistierte Daten-Struktur (abgeleitet aus Code)
```
localStorage["escape-<thema>"] = {
  mappen: {
    "mappe-1": {
      abgeschlossen: boolean,
      fehlversuche: number,
      tipp_punkte: number,
      aufgaben: {
        "aufgabe-id": {
          geloest: boolean,
          tipps_genutzt: number,
          antwort_state: { /* typ-spezifisch, kann User-Text enthalten */ }
        }
      }
    }
  },
  letzteAktivitaet: "2026-04-05T12:34:56.789Z"
}
```

**Frage fuer RA7:** Ist `antwort_state` potentiell personenbezogen, wenn freie Textfelder involviert sind?

## B. HTML — Drittanbieter-Requests

### B.1 Production-Seiten (escape-games/gpg-erster-weltkrieg-ursachen/)
- `mappe-1.html` bis `mappe-5.html`, `index.html`, `lehrkraft.html`.
- **Befund vorab:** Keine externen Scripts/Fonts/CDNs. Alle Ressourcen lokal unter `assets/`.
- Pre-Check-Kommando fuer RA7: `grep -rn "http://\|https://\|//fonts\|//cdn" escape-games/gpg-erster-weltkrieg-ursachen/` — sollte leer sein.

### B.2 Template-Seiten (escape-games/template/)
- `index.html`, `mappe-template.html`, `lehrkraft.html`. Gleiche Struktur, keine externen Ressourcen.

### B.3 Root `index.html`
- Zeile 7: `<link rel="stylesheet" href="assets/css/base.css">`
- Zeile 23: `<script src="assets/js/core.js"></script>`
- Keine externen Ressourcen.

### B.4 Prototyp-Seiten (docs/analyse/)
- `PROTOTYP_v3-5_LAYOUT.html` laedt Google Fonts (`fonts.googleapis.com`).
- **Status:** Prototyp, NICHT live. Aber falls jemand es live ruft, waere es ein DSGVO-Drittanbieter.

## C. Hosting

### C.1 GitHub Pages
- Domain: weitergehts.online.
- Hosting-Anbieter: GitHub Inc., US-Firma (Microsoft-Tochter).
- **DSGVO-Relevanz:** Server-Logs (IP, Referer, User-Agent) werden von GitHub verarbeitet. Schrems-II-Drittland-Transfer.
- AVV: GitHub bietet DPA (Data Processing Addendum) — muss gezeichnet werden.

## D. STR-Impact — 20 aktive Strategien

**Quelle:** `docs/projekt/D15B_OPTIMIERUNGS_STRATEGIEN.md` (aktuell gueltige Fassung mit 20 STR).

Fuer RA7 besonders relevant (aus 5d Konvergenz-Top-6):
- **STR-03 Feedback-Schema `{typ, text, ebene}`** — enthaelt `text`-Feld. Ist das Feedback vom System (Template) oder vom User (Eingabe)? Pruefung erforderlich.
- **STR-12 Trigger-Warnungen** — ausschliesslich Lehrkraft-sichtbar (User-Zusage). Aber technisch: wo gespeichert? In Katalog oder Laufzeit-State?
- **STR-13 Reflexions-Zone** — Template mit 1-2 Reflexionsfragen. Hat die Zone Text-Input-Felder fuer Schuelerinnen und Schueler? Wenn ja: werden Eingaben persistiert?
- **STR-08 Quellenkritik, STR-11 Aufgabentypologie** — neue Aufgabentypen. Potentiell neue Input-Felder.
- **STR-24 Mappen-Q-Gate** — Admin-Checklist. Lokal-persistiert?

Weitere STR, weniger kritisch: STR-01/02/04/05/06/09-NEU/14-NEU/15/17/19/20/21/22/23/25.

## E. Lehrkraft-Seiten

`escape-games/template/lehrkraft.html` und `escape-games/gpg-erster-weltkrieg-ursachen/lehrkraft.html`.
- **Fragen fuer RA7:** Enthalten diese Seiten Zugriffsschutz? (vermutlich nein). Was ist die Risiko-Konsequenz, wenn Schuelerinnen und Schueler die URL aufrufen? (STR-12 Trigger-Warnungen fuer Lehrkraft waeren dann sichtbar).

## F. Evaluations-Transkripte

**Pfad:** `docs/analyse/Evaluiation Testrun Mappe 4/transcript-Session*/`
- 6 Sessions (Session1..Session6).
- Jeweils `metadata.json` und teilweise `.jsonl`.
- **Fragen fuer RA7:** Enthalten die Transkripte Klarnamen, Schueler-IDs, Klassen-Bezeichnungen, oder identifizierbare Aussagen? Sind die Transkripte oeffentlich (git-tracked)? → JA, da in docs/ verzeichnet und vom GitHub-Repository synchronisiert.
- **Pre-Check-Kommando:** `grep -i "name\|klasse\|schul\|schueler" "docs/analyse/Evaluiation Testrun Mappe 4/"` — RA7 soll metadata.json pruefen.

## G. Screenshots / Bildmaterial

- Pfade unter `docs/analyse/` und `assets/images/` (falls vorhanden).
- **Fragen fuer RA7:** Sind Personen auf Bildern erkennbar? (DSGVO Art. 9 besondere Kategorien).

## H. Phase-III-Artefakte (Kontext)

- `docs/projekt/phase-iii-5/BERICHT_RA1_SCOPE_DRIFT.md` bis `BERICHT_RA6_KONTEXT.md` (5 RAs abgeschlossen).
- `docs/projekt/phase-iii-5/VERIFIKATION_III_5d.md` (enthaelt Blindspot-Entscheidung B1 Datenschutz CRITICAL — RA7-Existenzgrund).
- `docs/projekt/D15B_PHASE_III_5_AUDIT_STATE.md` (Stand).

## I. Projekt-Kontext

- **Zielgruppe:** 7. Klasse, Alter ~12-13 Jahre (= Minderjaehrige, DSGVO Art. 8 "unter 16").
- **Einsatzkontext:** Schulunterricht, Fach GPG (Geschichte/Politik/Geographie).
- **Rechtsrahmen:** DSGVO + Bayerisches Schulrecht (BayEUG Art. 85), Schultraeger-Datenschutzerklaerung, evtl. KUMI-Vorgaben.
- **Aktueller Nutzungs-Status:** Projekt in Entwicklung. Mappen 1-4 bereits live eingesetzt? → User Paul zu klaeren. RA7 nimmt konservativ an: Live-Einsatz ab Phase IV Abschluss geplant.

## J. Bekannte Vorbefunde aus 5b/5c/5d zu Datenschutz

- **RA6 F-RA6-05** (Phase III.5b): STR-12 Trigger-Sensibilitaet Ethik-Luecke (tangiert Datenschutz, aber primaer ethisch).
- **RA3 F-RA3-06** (Phase III.5c): streift Sicherheit/Input-Sanitization (nicht Datenschutz).
- **5d Blindspot B1**: Datenschutz CRITICAL — KEIN der 6 RAs deckte DSGVO/Minderjaehrigen-Schutz systematisch ab. → RA7 existiert, um diese Luecke zu schliessen.

## K. Was RA7 NICHT tun soll

- Keine Rechtsberatung. RA7 liefert Einschaetzung, nicht verbindliches Gutachten.
- Keine Umsetzung. RA7 liefert Patch-Liste, nicht Code.
- Keine Kreuz-Referenz zu RA1-RA6 ausser in Sektion "Offene Fragen".
- Keine Streichungs-Vorschlaege fuer STR (Verdikt-Hoheit bei RA5/5e).
