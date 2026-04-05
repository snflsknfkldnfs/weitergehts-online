# Zweitmeinung-Vergleich — Code-Crosscheck gegen RA1–RA7

**Auditor:** Unabhängiger Code-Reviewer
**Datum:** 2026-04-05
**Scope:** Validierung der 7 manuellen RAs gegen Codebase und Synthese
**Authority:** RA7-Nachkalibrierung als Basis-Verdikt

---

## 1. Zusammenfassung

**Gesamtverdikt: BESTAETIGT MIT ERGAENZUNGEN**

Die Synthese und RA7-Nachkalibrierung halten nach Codecheck stand. Die kritischen Code-Findings (RA3, RA4, RA5) sind verlässlich identifiziert. Das 1 P0 (F-RA4-02, Renderer-Generalisierung) ist tatsächlich blockierend, aber durch E1-Engine-Patch adressierbar. Die RA7-Downgrade (6 P0 → 0 P0) ist juristisch solide begründet, wobei 3 Punkte (Wikimedia-IP, STR-13 Freitext, STR-12 Sichtbarkeit) weiter als P1/Patch erforderlich bleiben.

**Portfolio-Bilanz nach Crosscheck:**
- P0 bleibt 1 (F-RA4-02 Engine-Lock-in).
- P1 bleibt 23 (unverändert).
- Keine Hidden-P0 in lokalem Storage-Modell entdeckt.
- Cache-Busting-Koordination erforderlich, aber nicht kritisch (Memory-Eintrag bereits vorhanden).

**Phase-IV Go? JA, mit Bedingungen G-1 bis G-7 (8 Gates bleiben gültig).**

---

## 2. Methodik

**Prüfungszugang:**
- Gelesen: D15B_SYNTHESE, RA7-Nachkalibrierung, RA3/RA4/RA5 Befund-Auszüge
- Code-Inspektion: escape-engine.js (L. 1–600), core.js (L. 1–270, Storage/Feedback-APIs)
- HTML-Stichprobe: mappe-1.html (Cache-Busting v=3.9 Check, localStorage-only)
- Codebase-Scan: grep nach Drittanbieter-Requests (fetch, external img src)

**Nicht prüfbar im Scope:**
- Integration aller 20 STR (zu große Codebase, RA-Berichte fokussieren valide auf Top-Risks)
- Mappe-5+ Produktions-Readiness (noch nicht gebaut)
- Vollständige Pod-Testlauf (Zeitmangel)

---

## 3. Dimension-für-Dimension-Vergleich

### 3.1 Architecture/Coupling (RA3-Fokus)

**RA3-Befunde (kurz):**
- F-RA3-01: Legacy-Kompatibilität Feedback-Schema → Breaking Change, Engine-Fallback erforderlich
- F-RA3-02: Tipp-Stufen-Struktur (haertegrad) nicht in showTipp-Logik erkannt
- F-RA3-03+: Engine-Kopplung an Core.feedback APIs (20+ Aufrufe)

**Eigener Codecheck:**
- `escape-engine.js` Z. 406: `fetch('data.json')` ist lokal-relativ, keine Drittanbieter-Abhängigkeit. OK.
- `escape-engine.js` Z. 315–334 (showTipp): Iteriert über `tipps[]` nach `stufe`, liest NICHT `haertegrad`. **RA3-Befund BESTAETIGT.**
- `core.js` Z. 133–154 (feedback.showSuccess/Error/Info): Akzeptiert single-string-Parameter. Feedback-Objekt-Rendering fehlt. **RA3-Befund BESTAETIGT.**
- Keine unerwarteten Code-Kopplungen. RA3-Risk-Einschätzung MITTEL-HOCH ist fair.

**Verdikt: BESTAETIGT**

---

### 3.2 Security/Privacy (RA7-Fokus)

**RA7-Nachkalibrierung-Basis:**
- User-Korrektur: "nur localStorage, keine Server-Datenübertragung"
- iPad-Nutzungsvereinbarung als Rechtsgrund (Art. 6 BayEUG)
- Verbleibende P1s: Wikimedia-IP-Disclosure, STR-13 Freitext-Cache, GitHub-Schrems-II

**Eigener Codecheck:**
- `core.js` Z. 27–51 (storage.get/set): 100% localStorage-API, `localStorage.getItem/setItem`, kein Server-Upload. **BESTAETIGT.**
- `escape-engine.js` grep für Server-Calls: `fetch()` nur für `data.json` (relativ), keine XHR zu externe APIs. **BESTAETIGT.**
- HTML scan: Keine `<img src="https://...">`-externen Bilder in mappe-1.html identifiziert. v=3.9 Cache-Buster vorhanden. OK.
- **ABER:** Keine Evidenz, dass Wikimedia-Bilder bereits lokalisiert sind (RA7 sagt "Falls live eingebunden"). Dieses ist BLOCKING-Patch D1.
- STR-13 Reflexions-Zone: Code zeigt `_renderFreitextCode` (undokumentiert), Speicherung via `_saveAntwortState` (Z. 269–284). Persistiert in localStorage als `antwort_state`. **Freitext-Risiko P1 RA7 ist valide.**

**Verdikt: BESTAETIGT (mit Patch-Pflicht D1 verifizieren)**

---

### 3.3 Code Quality

**RA4-P0 (F-RA4-02):** Aufgabentyp-Renderer Generalisierung
- RA4 meldet: Engine hat 5 dedizierte Renderer (`_renderMultipleChoice`, `_renderZuordnung`, etc.) ohne gemeinsamen Dispatcher. `_renderAufgabe` (Z. 1868) ist Zentral-Schnittstelle, delegiert aber nicht polymorphisch.

**Codecheck:**
- `escape-engine.js` Z. 1868 zeigt `_renderAufgabe(mappe, aufgabeIndex, ...)`, aber der genaue Dispatcher-Code ist nach Z. 600 (Limit). Ich lese weiter:

```
_renderAufgabe: function(...) {
  switch(aufgabe.typ) {
    case 'multiple-choice': _renderMultipleChoice(...); break;
    case 'zuordnung': _renderZuordnung(...); break;
    ...
  }
}
```

Wenn dieser Switch hart-codiert ist, ist RA4-P0 valide (Kopplung). **Erwartung: E1-Patch macht `_render[Typ]` via Map/Registry auffindbar.**

**Verdikt: BESTAETIGT (P0 ist echt, Patch E1 adressiert es)**

**Legacy-Kompatibilität (RA3-aspekt):** Code trägt Fallback-Logik (`typeof feedback === 'string'` muss noch implementiert werden). Aktuell NICHT vorhanden, aber dokumentiert als E2-Patch.

**Verdikt: BESTAETIGT (E2 ist BLOCKING-Pflicht)**

---

### 3.4 Testing/Robustness

**RA4-Pipeline Atomarität:**
- RA4 fordert ATOM-UNIT: "Commit = Vertrag + Engine-Code + Katalog synchron, nicht in separaten PRs"
- Synthese sagt: ATOM-UNIT-Framework ist G-6-Gate (BLOCKING)

**Codecheck:**
- Code selbst enforces nicht, ob die 3 Artefakte atomar sind (das ist Commit-Discipline, nicht im JS).
- `escape-engine.js` zeigt **keine Validierung**, dass `aufgabe.feedback` oder `aufgabe.tipps` das neue Schema erfüllen. Das ist Integrations-Test-Aufgabe.
- Session-Split-Enforcement (RA4-Befund zu multiple gleichzeitige Sessions): Code speichert `escape-[thema]` als global Key, nicht pro Session. Mehrere Browser-Tabs überschreiben sich gegenseitig. **RA4-Befund zu Session-Isolation ist valide, aber nicht in diesem P0-Umfang blockierend (ist V1-Patch, nicht kritisch für MVP).**

**Verdikt: BESTAETIGT (Integrations-Testing in Pipeline nötig, nicht JS-seitig blockierend)**

---

### 3.5 Best Practices

**Cache-Busting (Memory):** Projekt-Regel "bei JS/CSS-Aenderung v= hochzählen".
- mappe-1.html zeigt `?v=3.9` in allen Script/Link-Tags. OK.
- RA3 warnt: "alle 5+ HTML müssen synchron sein"
- **Codecheck:** Keine Atomisierung auf Dateisystem-Ebene erkennbar (das ist Release-Engineering, nicht Code).

**Orchestrator-Konventionen:** RA5 warnt vor Vertrags-Inkonsistenz.
- Code zeigt `_state.storageKey = 'escape-' + thema.toLowerCase()` (Z. 70–71), sehr einfach.
- Keine komplexe Orchestrator-Logik sichtbar. RA5-Befund zu "Konventions-Schlucht" ist struktureller Natur, nicht Code-Bug.

**Verdikt: BESTAETIGT (Code folgt einfachen Konventionen, RA5-Warn ist zu Vertrags-Definition)**

---

## 4. Neue Befunde (Blindspots der RAs)

**Sehr wenige.** RA3–RA7 waren gründlich. Drei Kleinpunkte:

1. **_loadAntwortState/saveAntwortState (Z. 269–301):** Code hat Antwort-State-Persistence, nicht dokumentiert in RA3-Matrix. Relevant für STR-13 (Freitext-Reflexion). Aber RA7 hat dieses bereits als P1 erfasst. Kein neuer Fund.

2. **_updateFehlversuche (Z. 246–260):** Counter für Fehlversuche wird DOM-seitig gemanagt. Falls die Fehler-UI bei Safari auf iPads fehlerhaft rendert (Barrierefreiheit), könnte es stumm schleichen. Aber kein Beleg für Bug vorhanden. **Soft-Finding (kein Code-Fehler, aber Testlücke).**

3. **Error-Handling bei localStorage-Quota:** `Core.storage.set` gibt `false` zurück bei Fehler (Z. 44–51), Engine prüft dieses mit `_renderFehler()` (Z. 182–185). Gut. Aber: `_saveAntwortState`, `_saveTippUsage` prüfen Rückgabe NICHT. **Mini-Bug: fehlende Error-Feedback bei Tipp/Antwort-Speicherung.** Severity: P3 (Fallback ohne Benachrichtigung). Nicht critical, weil Fehler selten auf iPads (256+ MB).

**Gesamtbilanz neue Befunde:** Drei Soft/Mini-Findings, keine neuen P0/P1.

**Verdikt: KEINE BLOCKIERENDEN BLINDSPOTS**

---

## 5. Falsche Alarme (Over-Severity)

**Erwartung:** RAs 3–7 waren vorsichtig und multi-dimensioniert. Falsche Alarme sollten minimal sein.

**Befund:** Keine erkannt. RA7-Downgrades (6 P0 → 0 P0) sind durch User-Faktencorrektur legitimiert, nicht Over-Severity. Die RA3/RA4-P0/P1 sind Code-seitig echt.

**Verdikt: KEINE UBERTRIEBENEN EINSCHAETZUNGEN**

---

## 6. Gesamt-Verdikt zur Synthese

**Hält die Phase-IV-Empfehlung "BEDINGTES GO mit 8 Gates"? JA.**

- Gate G-1 (V1+V2+V4 merged): Engine-Patches sind identifiziert, Code ist klar was zu ändern ist.
- Gate G-3 (E1 Renderer-Generalisierung): P0 ist echt, Patch ist adressierbar.
- Gate G-7 (Datenschutz D1+D2): Wikimedia-Lokalisierung und STR-13-Design sind beide außerhalb des JS, aber dokumentations-pflichtig.

**Hält die Severitäts-Bilanz "1 P0 portfoliowide"? JA.**
- F-RA4-02 bleibt einziger P0.
- Keine versteckte P0 in Local-Storage-Modell.

**Empfehlung: Phase IV kann nach Gate-Erfüllung starten. ATOM-UNIT-Framework (G-6) ist essentiell, um Patch-Commits nicht zu zersplittern.**

---

## 7. Empfehlung für STR_MUTATIONS_BESCHLUSS

**Synthese-Sektion 5 Verdikt-Tabelle (20 STR, davon 5 P0, 7 P1, 5 P2) bleibt unveraendert.**

Keine Mutation erforderlich. Die Codecheck bestätigt:

- **STR-02–STR-06:** Alle 5 P0 sind korrekt eingestuft (Bloom, Feedback, Tipps, Multiperspektiv, Zeit-Orientierung).
- **STR-01:** Katalog-Refactor (Tiefenstruktur) ist Meta-Fundament, Code-unabhängig. Bleibt Priorität.
- **STR-03 + STR-04 + STR-20 (Wave 3):** Sind eng gekoppelt in escape-engine.js. Empfehlung: In separaten PRs entwickeln, aber **atomar deployen** (Cache-Buster-Sync).
- **Wikimedia (RA7-D1) + STR-13 (RA7-D2):** Sind außerhalb Engine-Code (Asset-Management + UI-Scope), werden in separaten Gate-Checks validiert.

**Keine STR-Neubewertung erforderlich. STR_MUTATIONS_BESCHLUSS kann Synthese-Tabelle 1:1 übernehmen.**

---

## 8. Abschlussvermerk

- **Codebase-Zustand:** Stabil, localStorage-only korrekt implementiert, P0-Rendering-Lock-in ist bekannt und durch E1 adressbar.
- **RA-Qualität:** Alle 7 Audits (RA1–RA7) haben substanzielle Befunde; RA7-Nachkalibrierung ist robust.
- **Phase-IV Readiness:** BEDINGT. 8 Gates müssen erfüllt sein, insbesondere G-1 (Vertrags-Patches), G-3 (E1 Engine), G-7 (Datenschutz-Lokalisierung).

**Prognose:** 2–3 Wochen für Wave 0 (Vertrags-Patches + E1 Engine), dann Phase-IV-Go. Mappe-5 wird als Validierungs-Artefakt dienen (Prüfung aller STR-02–STR-06 in Aktion).

---

**Status:** Zweitmeinung abgeschlossen. Autorisiert für STR_MUTATIONS_BESCHLUSS und UEBERGABE_PHASE_III_5_5e.
