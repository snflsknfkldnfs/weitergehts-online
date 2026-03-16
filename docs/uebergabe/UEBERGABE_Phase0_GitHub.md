# Übergabe-Prompt: Phase 0 -- GitHub-Repository Setup

**Ziel:** Repository `weitergehts-online` auf GitHub anlegen, Verzeichnisstruktur initialisieren, GitHub Pages aktivieren, Custom Domain `weitergehts.online` anbinden.

---

## Kontext

Projekt: Interaktive Unterrichtsmaterialien als statische Website (MVP: Escape-Games für GPG).
Hosting: GitHub Pages mit Custom Domain `weitergehts.online`.
Technologie: Statisches HTML/CSS/JS, Vanilla JS, kein Framework.
Projektverzeichnis lokal: `~/weitergehts.online/Projekt_Website/`

## Voraussetzung

Du brauchst einen GitHub-Account. Falls noch keiner vorhanden:
1. https://github.com/signup
2. Account erstellen
3. Danach hier weitermachen

## Schritt 1: Repository auf GitHub erstellen (manuell im Browser)

1. Gehe zu https://github.com/new
2. Repository name: `weitergehts-online`
3. Description: `Interaktive Unterrichtsmaterialien -- browserbasierte Escape-Games und mehr`
4. Visibility: **Public** (GitHub Pages Free benötigt Public)
5. Initialize: **NICHT** "Add a README" anklicken (wir pushen lokal)
6. Create repository

## Schritt 2: Lokales Repo initialisieren und Struktur pushen (Claude Code)

Diesen Block in Claude Code ausführen:

```
## Kontext
Ich baue eine statische Website für interaktive Unterrichtsmaterialien (Escape-Games).
Das GitHub-Repository heißt `weitergehts-online` und ist unter https://github.com/snflsknfkldnfs/weitergehts-online erreichbar.

## Aufgabe
1. Initialisiere ein Git-Repository im Verzeichnis `~/weitergehts-online/repo/` (oder einem passenden Ort)
2. Erstelle folgende Verzeichnisstruktur mit Platzhalter-Dateien:

```
weitergehts-online/
├── CNAME                               # Custom Domain (Inhalt: weitergehts.online)
├── index.html                          # Landing Page (Platzhalter)
├── assets/
│   ├── css/
│   │   ├── base.css                    # Gemeinsame Styles (leer)
│   │   └── themes/
│   │       └── .gitkeep
│   ├── js/
│   │   ├── core.js                     # Shared Logic (leer)
│   │   └── escape-engine.js            # Escape-Game-Engine (leer)
│   ├── img/
│   │   └── .gitkeep
│   └── audio/
│       └── .gitkeep
├── escape-games/
│   └── template/
│       ├── index.html                  # Startseite-Template (Platzhalter)
│       ├── mappe-template.html         # Mappe-Template (Platzhalter)
│       ├── data.json                   # Daten-Schema (leeres Objekt)
│       └── lehrkraft.html              # Lehrkraft-Zugang-Template (Platzhalter)
├── docs/
│   └── agenten-rollen.md              # Übersicht Subagent-Architektur (Platzhalter)
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Pages Deployment (Platzhalter)
└── README.md                           # Projektbeschreibung
```

3. Für `index.html` einen minimalen HTML5-Boilerplate mit:
   - Titel: "weitergehts.online -- Interaktive Unterrichtsmaterialien"
   - Ein `<main>` mit Platzhaltertext: "Materialien werden hier erscheinen."
   - Verweis auf `assets/css/base.css`
   - Verweis auf `assets/js/core.js`

4. Für `README.md`:
   - Projekttitel
   - Einzeiler-Beschreibung
   - Hinweis: "In Entwicklung"

5. Für `data.json` im Template-Verzeichnis ein Schema-Beispiel:
```json
{
  "meta": {
    "titel": "",
    "fach": "",
    "jahrgangsstufe": "",
    "lehrplanbezug": "",
    "schwierigkeit": "",
    "geschaetzte_dauer_min": 0
  },
  "mappen": []
}
```

6. Initial Commit: "Phase 0: Repository-Struktur initialisiert"
7. Remote hinzufügen: `git remote add origin https://github.com/snflsknfkldnfs/weitergehts-online.git`
8. Push: `git push -u origin main`

## Erfolgskriterium
- Repository auf GitHub sichtbar mit korrekter Verzeichnisstruktur
- Alle Platzhalter-Dateien vorhanden
- `index.html` zeigt minimale Seite

## Nach Abschluss
Melde in Cowork: "Update: GitHub-Repo angelegt. URL: https://github.com/snflsknfkldnfs/weitergehts-online"
```

## Schritt 3: GitHub Pages aktivieren (manuell im Browser)

1. Repository-Seite öffnen → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Save
5. Warte 1-2 Minuten, dann prüfe: `https://snflsknfkldnfs.github.io/weitergehts-online/`

## Schritt 4: Custom Domain anbinden

### 4a: DNS beim Domain-Registrar konfigurieren

Logge dich bei deinem Domain-Anbieter ein (dort wo du `weitergehts.online` gekauft hast) und setze diese DNS-Einträge:

**Option A -- Apex Domain (weitergehts.online direkt):**

| Typ | Name | Wert |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Optional zusätzlich -- www-Subdomain:**

| Typ | Name | Wert |
|---|---|---|
| CNAME | www | snflsknfkldnfs.github.io |

### 4b: Custom Domain in GitHub Pages eintragen

1. Repository → Settings → Pages
2. Unter "Custom domain": `weitergehts.online` eintragen
3. Save
4. Warte bis DNS-Check grün ist (kann bis zu 24h dauern, meist <30 min)
5. Checkbox **"Enforce HTTPS"** aktivieren (erst möglich nach DNS-Propagierung)

### 4c: Verifikation

- `https://weitergehts.online` zeigt die `index.html`
- HTTPS-Schloss im Browser sichtbar
- `https://snflsknfkldnfs.github.io/weitergehts-online/` leitet auf `weitergehts.online` um

**Hinweis:** Die CNAME-Datei im Repo-Root (Inhalt: `weitergehts.online`) wurde bereits in Schritt 2 mit der Verzeichnisstruktur erstellt. Sie sorgt dafür, dass GitHub Pages die Custom Domain kennt.

## Schritt 5: Rückmeldung an Cowork

Wenn alles steht, in Cowork melden:

```
Update: Phase 0 abgeschlossen.
- GitHub-Repo: [URL]
- GitHub Pages: [URL]
- Custom Domain: weitergehts.online [funktioniert / DNS pending]
- GitHub-Username: [Username]
```

---

**Geschätzter Aufwand:** 20-30 Minuten (davon ~10 min manuell inkl. DNS, Rest Claude Code. DNS-Propagierung danach unabhängig.)
