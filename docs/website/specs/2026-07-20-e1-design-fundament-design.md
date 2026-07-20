# E1 Design-Fundament — Design (schlanker Zuschnitt)

**Ziel:** Die Site bekommt ihr Design-Fundament in `assets/`: ein Token-Vokabular
(`tokens.css`, destilliert aus dem Syrien-Redesign-Overlay), self-gehostete Webfonts
(DSGVO-Sanierung), eine entmischte `base.css` und geschlossene `?v=`-Lücken.
**Die Games bleiben visuell unverändert.** Die Übertragung des Akten-Looks auf die
geteilte Game-Schicht (Theme + Engine) wird als eigener Folgeschritt **E5** definiert.

## Befund (Ist-Analyse 2026-07-20)

- **Overlay:** `escape-games/syrische-revolution-2011/vendor/` = `redesign.css` (835 Z.),
  `redesign-uebersicht.css` (297 Z.), `rd-inject.js` (53 Z., DOM-additiv per
  MutationObserver), `media-placeholder.css` (9 Z.), `fonts/` (9 × .woff2, ≈ 213 KB).
  Zwei getrennte Token-Namensräume (`--rd-*` Mappen, `--op-*` Übersicht) mit teils
  wertgleichen Doppel-Deklarationen; 397 × `!important` als Durchsetzungsstrategie gegen
  `theme-gpg.css`; **0** Referenzen auf das bestehende `--color-*`-System; Spacing
  hartcodiert. Hartcodierte CSS-Content-Strings („AKTE 04 · PULVERFASS EUROPA" — ein
  WW1-Artefakt im Syrien-Game — vs. „AKTE 14" auf der Übersicht) und ein toter
  `.rd-tweaks`-Block ohne Erzeuger.
- **Site-CSS:** `base.css` (776 Z.) ist zu ~56 % toter „wg.lernraum"-Block (Abschnitte
  9–21, von keiner Live-Seite genutzt), der die präfix-freien Token-Namen `--bg`, `--ink`,
  `--paper`, `--accent`, `--muted` belegt. `theme-gpg.css` (2778 Z.) lädt in Zeile 1 per
  `@import` Google-Fonts-CDN (Architects Daughter, Caveat, Patrick Hand) — bei **jedem
  Schüler-Aufruf aller GPG-Games** gehen IPs an Google (DSGVO-Risiko, vgl. LG München
  2022); im Syrien-Game läuft Architects Daughter dadurch doppelt (CDN + vendored).
- **Governance-Lücken:** die komplette `vendor/`-Gruppe läuft ohne `?v=` außerhalb
  von `make bump`; Root-`index.html` lädt `base.css` ungebustet (Sync-Regex greift nur
  bei vorhandenem `?v=`).
- **Klärung Design-Herkunft:** Der Look eines Games kommt aus der Website-Schicht
  (`base.css` + `theme-gpg.css` + `escape-engine.js`), nicht aus dem Generator — der
  liefert nur `data.json`. Ein zukünftiges Game käme heute im Alt-Look an. Der Akten-Look
  erreicht neue Games nur über die geteilte Schicht (→ E5); ein `vendor/`-Overlay ist per
  Konstruktion ein Unikat.

## Entscheidungen

1. **E1-schlank: nur Fundament, kein Game-Rollout.** Die drei Alt-Games sind teils
   Wegwerf-Material und in E3 (URL-Bruch) Triage-Kandidaten — Absorptions-Aufwand vor der
   Triage wäre teils für Sterbekandidaten. Syrien behält sein Overlay unverändert (außer
   `fonts/`, s. E2 unten). *(Verworfen: sofortige Theme/Engine-Absorption samt Rollout —
   richtig, aber zur falschen Zeit; als E5 terminiert.)*
2. **Webfonts self-hosted:** neues `assets/fonts/` (.woff2, latin + latin-ext) + neues
   `assets/css/fonts.css` (alle `@font-face`, `font-display: swap`) unter `?v=`-Governance.
   Familien: Spectral 400/600, IM Fell English, Special Elite, Architects Daughter (aus
   `vendor/fonts/` übernommen) sowie Caveat 400/600/700 und Patrick Hand (neu beschafft —
   das sind die Gewichte des bisherigen CDN-Imports). Der `@import` fliegt aus
   `theme-gpg.css`; alle Game-Seiten laden `fonts.css` per `<link>`; die Syrien-HTMLs
   wechseln von `vendor/fonts/fonts.css` auf das geteilte File, `vendor/fonts/` wird
   gelöscht. Begründung: DSGVO (Schüler-IPs), Schulnetz-Robustheit, Doppel-Ladeweg endet.
   *(Verworfen: CDN behalten — Rechtsrisiko; Font-Frage vertagen — muss für E5 ohnehin
   zentral liegen.)*
3. **`assets/css/tokens.css` (neu) = Site-Identitäts-Vokabular,** destilliert aus dem
   Overlay: Akten-Palette als semantische Tokens (`--color-primary` Navy `#1B2A4A`,
   `--color-secondary` Gold `#C9A84C`, neu `--color-paper`/`--color-cream`/`--color-desk`
   u. a., Status-Farben, Dark-Töne) und die vier Font-Rollen (`--font-body` Spectral,
   `--font-display` IM Fell English, `--font-hand` Architects Daughter,
   `--font-mono-display` Special Elite). **Dark ist der `:root`-Default,**
   `[data-bg="white"]` bleibt als dokumentierter Light-Schalter. Eine semantische
   Token-Ebene, keine Primitive-Zwischenschicht (YAGNI für eine Ein-Personen-Site).
   In E1 lädt **keine Live-Seite** das File — es liegt versioniert bereit; erste
   Konsumenten sind E3 (Root/Profil) und E5 (Games). Lade-Konvention ab E3:
   `fonts.css → base.css → tokens.css → theme-*.css` (Tokens überschreiben die neutralen
   base-Fallbacks, Themes die Tokens).
4. **`base.css`-Entmischung:** der „wg.lernraum"-Block (Abschnitte 9–21, ~435 Z.) zieht
   1:1 in ein neues, ungeladenes `assets/css/lernraum.css`. `base.css` behält Reset,
   neutrale `:root`-Fallbacks, Skalen (`--space-*`, `--text-*`, `--radius-*`, …), Layout
   und Utilities. Der präfix-freie Namensraum wird frei. *(Verworfen: löschen —
   ARCHITEKTUR hält Lernraum-Konsumseiten offen; liegen lassen — 9 KB toter Ballast auf
   jeder Seite + Namenskollision mit dem Fundament.)*
5. **Governance:** `assets/versions.json` + `bump-assets.py` bekommen die Einträge/Aliase
   `fonts` (`fonts.css`) und `tokens` (`tokens.css`); Root-`index.html` erhält `?v=` auf
   `base.css`. `lernraum.css`/`tokens.css` sind ungeladen und brauchen keine Live-Links.
6. **Vorentscheidungen für E5 (hier festgehalten, nicht E1-Arbeit):** Absorption
   in `theme-gpg.css` **in-place** (kein v2-Parallelbau; Überschreiben → Ersetzen,
   `!important`-Ziel ≈ 0); rd-inject-Logik wandert in die Engine (kein MutationObserver);
   Akten-Beschriftung datengetrieben über neue optionale `data.json`-Meta-Felder mit
   Titel-Fallback; Dark-Default für alle Games; `data-fontset` entfällt (Spectral fest);
   `.rd-tweaks` entfällt ersatzlos; `--rd-*`/`--op-*` werden auf das `tokens.css`-Vokabular
   gemappt. **Fälligkeit: nach der E3-Game-Triage, spätestens vor der Produktion des
   nächsten neuen Games.**
7. **Prozess:** Nach Umsetzung wird E1 in `PROZESS.md` als Fundament-Schritt geführt und
   E5 „Akten-Look-Absorption (Theme + Engine)" als neuer Schritt mit obiger
   Fälligkeits-Bedingung eingetragen; `ARCHITEKTUR.md` erhält den Log-Eintrag zum
   Zuschnitt, `SITE_MAP.md` die neuen Dateien.

## Abnahme

`make check` BLOCKING-grün · `make smoke` grün · Sichtprüfung: eine Syrien-Mappe
(Fonts unverändert gerendert), ein Alt-Game inkl. Hefteintrag-Widget/Fragebogen
(Caveat/Patrick Hand lokal korrekt), Root optisch unverändert · Netzwerk-Beweis:
**kein Request mehr an `fonts.googleapis.com`/`fonts.gstatic.com`** · Push nur auf Ansage.

## Risiken

Font-Rendering CDN → lokal (gleiche Google-Quelldateien, statische .woff2 je Gewicht via
Subset latin + latin-ext — im Plan wird die Beschaffung festgelegt und per Sichtprüfung
abgenommen). Sonst keine sichtbare Fläche: Alle übrigen Änderungen sind ungeladen
(`tokens.css`, `lernraum.css`) oder wertneutral (Link-Edits, `@import`-Entfernung).

## Nicht-Ziele

Kein visueller Rollout auf Games (E5) · keine Theme-/Engine-Änderung über die
`@import`-Entfernung hinaus · keine Root-/`sections/wib/`-Gestaltung (E3) · keine
Berührung der Tafelbild-HTMLs (eigene Pipeline) · kein Generator-Apparat-Touch ·
`redesign*.css`, `rd-inject.js`, `media-placeholder.css` bleiben unverändert vendored.
