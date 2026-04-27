# Quellenverzeichnis — gpg-erster-weltkrieg-ursachen-run4-v050

**Phase:** 0.2 (agent-inhalt)
**Erstellt:** 2026-04-26
**Plugin-Version:** v0.5.0
**Game-ID:** gpg-erster-weltkrieg-ursachen-run4-v050

---

## Daten-Quellen-Strategie (eingehalten)

Vorrang-Ordnung gemaess F-PB-28-Fix-D / F0B-Priming:

1. **MCP-Wikipedia** (Pflicht-Primary) — alle 19 Artikel via mcp__wikipedia tools
2. **WebFetch-Sekundaer-Sicherung** — LeMO (dhm.de) erfolgreich, bpb 404 (siehe Hinweis unten)
3. **LLM-Memory** — NICHT verwendet (E-D3 NICHT_AKTIV)

**bpb-Hinweis:** Die zwei probierten bpb-URLs (`https://www.bpb.de/themen/erster-weltkrieg/` und `https://www.bpb.de/shop/zeitschriften/apuz/erster-weltkrieg-2014/`) lieferten 404. LeMO (Lebendiges Museum Online, Deutsches Historisches Museum) hat als deutscher Sekundaer-Quellen-Anker zuverlaessig geantwortet und ist gleichwertig kuratiert.

---

## Wikipedia-Artikel (MCP, EN-Sprachversion)

**Sprachraum-Hinweis:** Das wikipedia-MCP ist auf en.wikipedia.org konfiguriert (verifiziert via test_wikipedia_connectivity). Alle DE-Lemmata wurden auf EN-Aequivalente abgebildet. Inhaltliche Ueberpruefung der DE-spezifischen Aspekte (Burgfriedenspolitik, Augusterlebnis, Kriegsschuldfrage) ueber LeMO (s.u.) erfolgte als Quervergleich — beide Quellen konsistent.

| # | Lemma (EN) | Verwendet in | Abrufdatum | Vertrauensstufe | Inhaltlicher Hash |
|---|---|---|---|---|---|
| 1 | World War I | M1, M2, M4 | 2026-04-26 | wiki-verified | wiki-wwi-2026-04-26 |
| 2 | Causes of World War I | M1, M2, M3 | 2026-04-26 | wiki-verified | wiki-causes-wwi-2026-04-26 |
| 3 | July Crisis | M2 | 2026-04-26 | wiki-verified | wiki-july-crisis-2026-04-26 |
| 4 | Assassination of Archduke Franz Ferdinand | M2 | 2026-04-26 | wiki-verified | wiki-assassination-ff-2026-04-26 |
| 5 | Gavrilo Princip | M2 | 2026-04-26 | wiki-verified | wiki-princip-2026-04-26 |
| 6 | Archduke Franz Ferdinand of Austria | M2 | 2026-04-26 | wiki-verified | wiki-ff-2026-04-26 |
| 7 | Black Hand (Serbia) | M2 | 2026-04-26 | wiki-verified | wiki-black-hand-2026-04-26 |
| 8 | Triple Alliance (1882) | M1 | 2026-04-26 | wiki-verified | wiki-triple-alliance-2026-04-26 |
| 9 | Triple Entente | M1 | 2026-04-26 | wiki-verified | wiki-triple-entente-2026-04-26 |
| 10 | First Moroccan Crisis | M1 | 2026-04-26 | wiki-verified | wiki-first-morocco-2026-04-26 |
| 11 | Agadir Crisis | M1 | 2026-04-26 | wiki-verified | wiki-agadir-2026-04-26 |
| 12 | Anglo-German naval arms race | M1 | 2026-04-26 | wiki-verified | wiki-naval-race-2026-04-26 |
| 13 | HMS Dreadnought (1906) | M1 | 2026-04-26 | wiki-verified | wiki-dreadnought-2026-04-26 |
| 14 | Wilhelm II, German Emperor | M1, M3 | 2026-04-26 | wiki-verified | wiki-wilhelm-ii-2026-04-26 |
| 15 | Imperialism | M1 | 2026-04-26 | wiki-verified | wiki-imperialism-2026-04-26 |
| 16 | Scramble for Africa | M1 | 2026-04-26 | wiki-verified | wiki-scramble-2026-04-26 |
| 17 | Spirit of 1914 | M3 | 2026-04-26 | wiki-verified | wiki-spirit-1914-2026-04-26 |
| 18 | Burgfriedenspolitik | M3 | 2026-04-26 | wiki-verified | wiki-burgfrieden-2026-04-26 |
| 19 | War guilt question | M3 | 2026-04-26 | wiki-verified | wiki-kriegsschuld-2026-04-26 |
| 20 | Article 231 of the Treaty of Versailles | M3 | 2026-04-26 | wiki-verified | wiki-art231-2026-04-26 |
| 21 | Christopher Clark | M3 | 2026-04-26 | wiki-verified | wiki-clark-2026-04-26 |
| 22 | Schlieffen Plan | M4 | 2026-04-26 | wiki-verified | wiki-schlieffen-2026-04-26 |
| 23 | First Battle of the Marne | M4 | 2026-04-26 | wiki-verified | wiki-marne-2026-04-26 |
| 24 | German invasion of Belgium (1914) | M2, M4 | 2026-04-26 | wiki-verified | wiki-belgium-1914-2026-04-26 |
| 25 | Joseph Joffre | M4 | 2026-04-26 | wiki-verified | wiki-joffre-2026-04-26 |
| 26 | Helmuth von Moltke the Younger | M4 | 2026-04-26 | wiki-verified | wiki-moltke-younger-2026-04-26 |
| 27 | Mobilization | M2 | 2026-04-26 | wiki-verified | wiki-mobilization-2026-04-26 |
| 28 | Race to the Sea | M4 | 2026-04-26 | wiki-verified | wiki-race-sea-2026-04-26 |
| 29 | Trench warfare | M4 | 2026-04-26 | wiki-verified | wiki-trench-2026-04-26 |

**Anzahl Wikipedia-Artikel: 29** (Pflicht-Minimum gemaess Vertrag QI2: `4 × 2 + 1 = 9` → 322 Prozent erfuellt).

**Quellen-Diversitaets-Check pro Mappe (QI2):**
- M1: 8 verschiedene Artikel (Triple_Alliance + Triple_Entente + First_Moroccan_Crisis + Agadir_Crisis + Anglo-German_naval_arms_race + HMS_Dreadnought + Imperialism + Scramble_for_Africa + Wilhelm_II) = ERFUELLT (>=2)
- M2: 7 verschiedene Artikel (July_Crisis + Assassination + Princip + Franz_Ferdinand + Black_Hand + German_invasion_of_Belgium + Mobilization + World_War_I) = ERFUELLT
- M3: 6 verschiedene Artikel (Spirit_of_1914 + Burgfriedenspolitik + War_guilt_question + Article_231 + Christopher_Clark + Wilhelm_II) = ERFUELLT
- M4: 6 verschiedene Artikel (Schlieffen_Plan + First_Battle_of_the_Marne + German_invasion_of_Belgium + Joseph_Joffre + Moltke_younger + Race_to_the_Sea + Trench_warfare) = ERFUELLT

---

## WebFetch Live-Quellen (Sekundaer-Sicherung, DE-Kontext)

| URL | Verwendet in | Abrufdatum | Vertrauensstufe | Inhaltlicher Hash |
|---|---|---|---|---|
| https://www.dhm.de/lemo/kapitel/erster-weltkrieg | Quervergleich M1-M4 (DE-Sprachversion) | 2026-04-26 | webfetch-kuratiert (DHM staatlich) | lemo-wwi-2026-04-26 |

**LeMO-Inhalts-Sicherung (Auszug):**
- Bestaetigt: Maechte-Rivalitaet + Wettruesten als Ursache
- Bestaetigt: 28.06.1914 Sarajevo als Ausloeser
- Bestaetigt: 01.08.1914 Kriegserklaerungs-Reihenfolge
- Bestaetigt: Augusterlebnis differenziert ('in sich gekehrte Nachdenklichkeit und Sorge' neben Begeisterung) — Konsistenz mit wiki:Spirit_of_1914
- Bestaetigt: Marne-Stop fuehrt zum 'moerderischen Stellungskampf' — Konsistenz mit wiki:First_Battle_of_the_Marne

---

## Nicht-erreichbare Quellen (Transparenz)

| URL | Versuch | Status |
|---|---|---|
| https://www.bpb.de/themen/erster-weltkrieg/ | 2026-04-26 | 404 — bpb hat URL-Struktur veraendert |
| https://www.bpb.de/shop/zeitschriften/apuz/erster-weltkrieg-2014/ | 2026-04-26 | 404 |
| https://www.bpb.de/themen/deutsches-kaiserreich/ | 2026-04-26 | 404 |

**Bewertung:** Wikipedia + LeMO bilden eine ausreichende Quellen-Diversitaet. bpb wird in Phase 1 (AGENT_MATERIAL) erneut versucht (bpb-Suche statt Direktlink). Kein Block fuer Phase-0.2-Abschluss.

---

## Lehrplan-Anker (re-konsultiert in Phase 0.2)

| Pfad | Verwendet fuer |
|---|---|
| `Unterrichtseinwicklung/7c/Input_Artefake/Lehrplan/GPG_R7/Fachlehrplan_GPG_R7.md` (UEW_PATH) | KE-Verifikation `GPG7_LB2_K_05/06/07` + `GPG7_LB3_K_03` (Phase-0.1-Output uebernommen, Phase 0.2 nicht erneut gelesen — Konsistenz via DIDAKTIK_RAHMEN) |

---

## Vertrauenswuerdigkeitsstufen (Legende)

| Stufe | Bedeutung |
|---|---|
| **wiki-verified** | MCP-Wikipedia get_summary erfolgreich, Inhalt direkt aus API-Response zitierbar |
| **webfetch-kuratiert** | Live-WebFetch auf staatlich/akademisch kuratiertes Portal (DHM/LeMO, bpb, Bundesarchiv) |
| **webfetch-frei** | Live-WebFetch auf nicht-staatliches Portal — fuer Phase 0.2 NICHT verwendet |
| **legacy** | Nur LLM-Memory ohne Live-Verifikation — fuer Phase 0.2 NICHT verwendet |

**E-D3 Status:** NICHT_AKTIV — alle 29 Wikipedia-Artikel + 1 LeMO-Quelle wurden live verifiziert.

---

## Versions-Stand-Hinweis (Wikipedia)

Die MCP-Tools liefern jeweils den aktuellen Stand der EN-Wikipedia zum Abrufdatum. Versions-IDs (revid) wurden vom MCP-Tool nicht ausgegeben (nicht im Response-Schema enthalten). Fuer eine Re-Verifikation in Phase 1 oder spaeter genuegt der Lemma-Name + Abrufdatum als auditierbarer Anker. Bei Bedarf kann die Wikipedia-API direkt via WebFetch nach revid abgefragt werden.
