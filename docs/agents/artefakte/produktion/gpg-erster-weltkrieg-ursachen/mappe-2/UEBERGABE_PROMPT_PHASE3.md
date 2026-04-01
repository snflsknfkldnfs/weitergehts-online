# Übergabe-Prompt: Phase 3 (Assembly) — Mappe 2

**Game-ID:** gpg-erster-weltkrieg-ursachen
**Mappe:** 2
**Titel:** Das Attentat von Sarajevo
**Freischalt-Code:** FUNKE
**Produktionsverzeichnis:** `docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/`
**Phase-2-Status:** PASS (Q-GATE-LOG.md vollständig)

---

## Auftrag

Rein mechanische Assembly von Mappe 2 in die bestehende data.json. KEINE didaktischen Entscheidungen. Nur Datei-I/O und Assembly.

**Kanonische Referenz:** `docs/architektur/WORKFLOW_v4.md`, Sektion 8 (Phase 3).

---

## Pre-Flight (Phase 3.0)

```
1. git pull
2. escape-games/gpg-erster-weltkrieg-ursachen/data.json lesen
   → Bestehende Mappen prüfen (Mappe 1 sollte vorhanden sein)
3. Integritätsprüfung Produktionsverzeichnis:
   a. docs/agents/artefakte/produktion/gpg-erster-weltkrieg-ursachen/mappe-2/ existiert?
   b. rahmen/: tafelbild.json, einstieg.json, sicherung.json, meta.json (4 Dateien)
   c. materialien/: mat-2-1.json bis mat-2-6.json (6 Dateien)
   d. aufgaben/: aufgabe-2-1.json bis aufgabe-2-5.json (5 Dateien)
   e. Jede .json ist valides JSON: python3 -c "import json; json.load(open(f))"
4. Engine-Patch prüfen (Audit BLOCKER B2-#1):
   escape-engine.js Zeile 2279 — Lückentext-Schema-Mismatch
   ALT:  var text = aufgabe.frage || '';
   NEU:  var text = aufgabe.text_mit_luecken || aufgabe.frage || '';
   Falls noch nicht gepatcht → patchen.
```

---

## Bild-Download (Phase 3.1)

Bildquellen aus materialien/mat-2-2.json und mat-2-3.json:

| Bild-ID | Wikimedia-Dateiname | Thumbnail-URL (aus _meta) | Lokaler Pfad |
|---------|--------------------|-----------------------------|-------------|
| img-2-1 | DC-1914-27-d-Sarajevo-cropped.jpg | (aus mat-2-2.json _meta.download_url) | assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg |
| img-2-2 | Postcard_for_the_assassination_of_Archduke_Franz_Ferdinand_in_Sarajevo.jpg | (aus mat-2-3.json _meta.download_url) | assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg |

**Download-Methode:** Python urllib mit Bot-User-Agent (WORKFLOW_v4.md Phase 3.1). KEIN curl. Bei 404: Fallback via resolve_url_via_api(). 2 Sekunden Pause zwischen Downloads. Dateigröße > 10 KB prüfen.

**Inhalt-Pfad-Update:** Nach Download die `inhalt`-Felder in mat-2-2 und mat-2-3 auf die relativen Pfade setzen (falls Assembly dies erfordert).

---

## Assembly (Phase 3.2)

```
1. Alle rahmen/*.json lesen
2. Alle materialien/mat-2-*.json lesen (sortiert nach position: 1-6)
3. Alle aufgaben/aufgabe-2-*.json lesen (sortiert: 1-5)
4. Mappe-Objekt assemblieren:
   meta.json       → Mappe-Header (id, titel, beschreibung, freischalt_code)
   einstieg.json   → mappe.einstieg
   materialien/*   → mappe.materialien[] (sortiert nach position)
   aufgaben/*      → mappe.aufgaben[] (sortiert nach ID)
   sicherung.json + tafelbild.json → mappe.sicherung
5. data.json lesen (aktuell aus Repo, NICHT aus diesem Prompt)
6. mappen[1] anfügen (Mappe 2 = Index 1)
7. meta{} NICHT modifizieren
8. mappen[0] (Mappe 1) NICHT anfassen
   AUSNAHME: Falls Mappe 1 eine generische Überleitung hat
   ("nächste Mappe"), darf sie auf "Das Attentat von Sarajevo" spezifiziert werden
```

---

## JSON-Validierung (Phase 3.4)

```
1. python3 -c "import json; json.load(open('data.json'))"
2. Alle mat-IDs in materialien[] vorhanden? (mat-2-1 bis mat-2-6)
3. Alle aufgabe-IDs in aufgaben[] vorhanden? (aufgabe-2-1 bis aufgabe-2-5)
4. Alle Bild-Pfade in assets/img/ existent und > 10 KB?
5. freischalt_code === "FUNKE"?
6. C1b: einstieg.problemstellung === tafelbild.stundenfrage?
   ("Wie konnte ein einziger Mord einen Weltkrieg auslösen?")
```

---

## Git (Phase 3.5)

```
git add escape-games/gpg-erster-weltkrieg-ursachen/data.json
git add escape-games/gpg-erster-weltkrieg-ursachen/mappe-2.html
git add assets/img/gpg-erster-weltkrieg-ursachen/img-2-1.jpg
git add assets/img/gpg-erster-weltkrieg-ursachen/img-2-2.jpg
git commit -m "v3.8: Mappe 2 — Das Attentat von Sarajevo"
git push
```

---

## NICHT tun

- KEINE Dateiinhalte aus diesem Prompt übernehmen — selbst aus dem Produktionsverzeichnis lesen
- KEINE didaktischen Entscheidungen treffen
- KEINE bestehenden Mappen modifizieren (außer generische Überleitung spezifizieren)
- KEINE data.json aus dem Prompt kopieren — aktuelle Version aus Repo lesen
