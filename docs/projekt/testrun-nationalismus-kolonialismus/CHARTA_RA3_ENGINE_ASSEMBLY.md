# CHARTA RA3 — Engine / Assembly

**Ziel:** Beurteilung der technischen Produkt-Schicht im Testrun: data.json-Assembly-Korrektheit, Engine-Rendering-Defekte, Theme/CSS-Probleme, Cache-Bust-Hygiene, Typ-Registry-Abdeckung, Lueckentext-Reset-Bug.

---

## 1. Mandat

RA3 beantwortet: **Hat die technische Pipeline (Assembly → Deploy → Engine) robust funktioniert und welche Engine-Bugs blockieren die Zielgruppen-Nutzung?**

Unterfragen:
- PATCH-M3 Finding 1 (Umlaute Rahmen-JSONs): war der Defekt isoliert Mappe 3 oder auch Mappe 1+2 betroffen?
- PATCH-M3 Finding 2 (HTML-Entities Bildunterschriften): warum Entities statt UTF-8 nach Marechal-Ersatz?
- PATCH-M3 Finding 3 (M5 falsche Karte img-3-4.svg vs. img-3-5.svg): wo greifen Material-Dispatch-Quellen-Refs falsch durch?
- PATCH-M3 Finding 4 (Aufgabe 3 vergleich-Typ): ist das ein Engine-Problem oder ein Didaktik-Problem? (Grenzfall — als technische Interface-Komplexitaet einstufen)
- PATCH-M3 Finding 5 (Hefteintrag-Verschachtelung): V13-Patch angeblich gefixt — warum Regression?
- UX-1 Finding 2 (Lueckentext-Reset-Bug): Engine-Bug analysieren. Welche Engine-Zeilen, welcher Event-Flow, welcher Fix?
- Persistierte Umlauten-/Entity-Probleme nach Live-Patch (2026-04-16T18:44Z): Cache-Bust-Versaeumnis? Source-vs-Assembly-Synchronisation?
- Cache-Bust-Versionierung: wurde bei jedem JS/CSS-Update `?v=` hochgezaehlt? (vgl. Memory: Cache-Busting Pflicht)
- Git-Lock-Errors (6x Virtiofs-Unlink) — haben sie Assembly/Deploy-Schritte verzoegert oder verfaelscht?

---

## 2. Pflicht-Lektuere

1. `docs/projekt/testrun-nationalismus-kolonialismus/AUDIT_STATE.md`
2. `docs/projekt/testrun-nationalismus-kolonialismus/EVIDENZ_BUNDLE.md`
3. Technische Basis:
   - `assets/js/escape-engine.js` (insbesondere `_checkLueckentext`, `_renderLueckentext`, `_renderSicherung`, Routing-Logik fuer Hefteintrag um Z. 1199-1214)
   - `assets/js/core.js` (localStorage-Wrapper)
   - `assets/css/theme-gpg.css` (Sicherung-Rendering, Lueckentext-Styles)
   - `escape-games/deutscher-nationalismus-kolonialismus/data.json` (aktueller Stand)
   - `docs/architektur/vertraege/VERTRAG_PHASE_3_ASSEMBLY.md` (V13)
   - `docs/architektur/vertraege/VERTRAG_PHASE_3-1_DEPLOY.md` (DEPLOY-06)
4. Evidenz-Extrakte: `evidenz/tool_errors.jsonl`, `evidenz/assistant_text.jsonl` (Assembly-Debug-Fenster 2026-04-12T16:38Z-16:45Z + 2026-04-16T18:14Z-19:22Z), `evidenz/milestones.json` (Schluessel `assembly_bug`, `hefteintrag`)

---

## 3. Severitaets-Skala

- **P0:** Live-Blocker (Rendering-Defekt, der Lernziel verhindert; Datenverlust-Risiko).
- **P1:** UX-Blocker in der Hauptnutzung (Lueckentext-Reset-Bug).
- **P2:** Einzelner Format-/Encoding-Fehler ohne Live-Blocker.
- **P3:** Cache-Bust-Drift, Versions-Inkonsistenz, Cosmetic.

---

## 4. Pflicht-Sektionen im Bericht `BERICHT_RA3_ENGINE_ASSEMBLY.md`

1. Zusammenfassung + Gate-Urteil
2. Methodologie
3. Assembly-Chronologie (Mappe 1 bis 3: Assembly-Start, Fehler-Detektion, Patch, Verifikation)
4. Defekt-Analyse je PATCH-M3-Finding (Ursache, betroffene Dateien/Zeilen, Fix-Wirksamkeit)
5. V13-Patch-Regression (Hefteintrag-Verschachtelung): detaillierter Ursachen-Trace
6. Engine-Bug Lueckentext-Reset: Code-Analyse escape-engine.js, Fix-Vorschlag
7. Encoding-Pipeline-Analyse (Source-JSON → Assembly → data.json → Engine-Rendering): wo entstehen Umlauten- und Entity-Drifts?
8. Cache-Bust-Audit: `?v=`-Versionen in allen HTML-Refs konsistent?
9. Git-Infrastruktur-Einfluesse (Virtiofs-Locks, Auth-Fehler) auf Assembly-Zuverlaessigkeit
10. Findings (F-RA3-NN)
11. Konvergenz / Divergenz mit UPGRADE_PLAN (MV2 Komponente 3 Didaktische-Rueckkopplung, PATCH-M3 alle 5 Findings, UX-1 Finding 2)
12. Empfehlungen: konkrete Engine-Patches, Vertrags-Ergaenzungen, Deploy-Checks
13. Anhang: Code-Zitate + data.json-Snippets fuer alle P0/P1-Findings

---

## 5. Methodologie

- Engine-Code direkt lesen, nicht nur Beschreibungen.
- Bei Lueckentext-Bug: Event-Flow rekonstruieren (input-Event → Validator → disabled-Setzen → Reset-Pfad?).
- Bei Entity-Problem: Sampling data.json + Source-JSON vergleichen.
- Finding-IDs: F-RA3-01 ff.
- Code-Zitate mit Zeilennummer.

---

## 6. Deliverable

**Pfad:** `docs/projekt/testrun-nationalismus-kolonialismus/BERICHT_RA3_ENGINE_ASSEMBLY.md`
**Umfang-Richtwert:** 500-900 Zeilen.
**Persistenz-Pflicht:** wie RA1.

---

## 7. Out-of-Scope

- Didaktik-Inhalt (RA2)
- Pipeline-Reihenfolge (RA1)
- Medien-Content (RA4 — aber Bildpfad-Referenzierung in data.json ist RA3)
- PM-Meta (RA5)

---

## 8. Rollen-Isolation

Keine Code-Patches schreiben. Nur Diagnose + Fix-Vorschlag als Finding + Empfehlung.
